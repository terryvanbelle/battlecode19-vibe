#!/usr/bin/env python3
"""The bc19 replica's saturn: compiles submissions and runs matches for siarnaq, with saturn's message and report
formats, around the pinned Battlecode 2019 engine (bc19 0.4.7) and tools/run_game.js.

Runs as bc19replica in bc19-galaxy-saturn.service, inside a private network namespace (PrivateNetwork=yes: only `lo`).
Its only way out is the relay's unix socket ($GALAXY_HOME/run/relay.sock); the relay (relay.py) forwards the reports to
siarnaq on 127.0.0.1:8019 with an ID token. Every compile and every game additionally runs under `unshare -rnm`: a new
user, network and mount namespace in which everything except the task's own work directory is remounted read-only.

  python3 tools/galaxy19/saturn.py run [--compile-slots 1] [--execute-slots 4]     (the service)
  python3 tools/galaxy19/saturn.py status                                          (queue counts)

Pub/Sub, the task protocol and the step logs are the 2023 replica's (galaxy saturn pkg/saturn): a slot leases the
oldest spooled message; invalid JSON -> ack (dropped); finished OK!/aborted -> ack; errored or interrupted -> nack.

Compile recipe: Hello world; Prepare scaffold; Download source code (zip, zip-slip check, 64 MiB expansion limit);
Build source code; Upload binary (binary.zip holding bundle.js); Compile succeeded. What the archive may hold:
  * a JavaScript bot: robot.js (at the root or in one directory) plus its modules -> bundled with the engine's own
    compiler (rollup, as bc19compile / the official site did);
  * a prebuilt bundle: exactly one .js file and no robot.js (e.g. a Java/Python bot transpiled beforehand);
  * Java or Python sources: transpiled only by the LOCAL transpiler named by $GALAXY_TRANSPILER (a node script
    `<script> <src dir> <out bundle.js>`); when none is installed the submission is rejected (accepted=false).
    The stock bc19 compiler posts these to the official compile server: that path is never used.
Failures of the user's code are OK! with accepted=false; infrastructure failures are TRY.

Execute recipe: Hello world; Prepare scaffold; Download binary (A and B); Run match (one run_game.js process per map,
sequentially, the 2019 contest clock: 100 ms initial + 20 ms per turn, no timescale; with alternate order, the odd
games swap sides: A is red on games 1, 3, ... and blue on 2, 4, ...); Upload replay (a ZIP_STORED archive holding
game-NN-seed<seed>.bc19 per game plus match.json, at siarnaq's replay path <uuid>.bc19); Determine scores
([games A won, games B won]).

Map names are `seed-<n>`: a Battlecode 2019 map is generated from its seed.
"""
import argparse
import base64
import http.client
import io
import json
import logging
import os
import re
import shutil
import signal
import socket
import subprocess
import sys
import threading
import time
import traceback
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

from replica_gcp import config, spool, storage  # noqa: E402

MAX_EXTRACTED = 64 * 1024 * 1024
MAX_BUNDLE = 16 * 1024 * 1024
MAX_EXECUTE_SLOTS = 5
# V8 heap cap per game process (both bots share it: the engine's own memory check is disabled). A runaway bot then
# ends its game (the match retries, then errors) instead of driving the VM into reclaim thrash.
GAME_HEAP_MB = int(os.environ.get('GALAXY_GAME_HEAP_MB', '2048'))
# Wall-clock limit for creating a robot's sandbox (run_game.js --init-ms; 0 = the engine's rule, the 100 ms clock
# bank). This shared VM is slower and busier than the official servers: under the batches' load most field bots lost
# robots to init failures (replica-health 2026-10-21: 11 of 14 entrants, IvanGeffner eigthbot in 3 of 3 games). With
# 5 slots the p90 sandbox time rose to about 1000 ms (match 306, StoneT2000 vs StoneT2000: 16 robots failed at 1000
# ms, 2026-10-22), hence 2000. The per-turn clock keeps the contest rule.
INIT_MS = int(os.environ.get('GALAXY_INIT_MS', '2000'))
# per-team stats copied from run_game.js into match.json: errors and clock health (timeouts = vm2 script timeouts,
# frozen = out of chess-clock time, slow_turns = turns over 20 ms of wall time) to watch CPU contention; init_robots
# (robots whose sandbox failed to start) and err_kinds (the five commonest error kinds) tell a replica fault from a bot's
TEAM_KEYS = ('team', 'errors', 'frozen', 'timeouts', 'init_fail', 'init_robots', 'exceptions', 'err_kinds', 'units',
             'health', 'turns', 'ms_mean', 'ms_max', 'init_ms_max', 'slow_turns')
REVISION = 'bc19-replica tools/galaxy19/saturn.py'
MAP_RE = re.compile(r'^seed-([1-9][0-9]{0,9})$')

log = logging.getLogger('saturn')

RUNNING, COMPLETED, ABORTED, ERRORED, INTERRUPTED = range(5)
STATUS_STRING = {RUNNING: 'RUN', COMPLETED: 'OK!', ERRORED: 'TRY', INTERRUPTED: 'TRY', ABORTED: 'ABT'}


def game_timeout():
    return int(os.environ.get('GALAXY_GAME_TIMEOUT') or 1800)


def nack_delay():
    return float(os.environ.get('GALAXY_NACK_DELAY') or 10)


class TaskFinished(Exception):
    """saturn's panic(taskFinished{}): unwinds the recipe once the task has its final status."""


class ReportError(Exception):
    pass


class Interrupted(Exception):
    pass


# ---------------------------------------------------------------- the relay client (HTTP over a unix socket)
class _UnixHTTPConnection(http.client.HTTPConnection):
    def __init__(self, path, timeout):
        super().__init__('relay', timeout=timeout)
        self._path = path

    def connect(self):
        s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        s.settimeout(self.timeout)
        s.connect(self._path)
        self.sock = s


def relay_post(path, obj, sock_path=None, timeout=150):
    conn = _UnixHTTPConnection(sock_path or config.relay_socket(), timeout)
    try:
        conn.request('POST', path, body=json.dumps(obj).encode(), headers={'Content-Type': 'application/json'})
        resp = conn.getresponse()
        body = resp.read()
        try:
            return resp.status, json.loads(body or b'{}')
        except ValueError:
            return resp.status, {'raw': body[:500].decode('utf-8', 'replace')}
    finally:
        conn.close()


class RelayReporter:
    def __init__(self, sock_path=None, post=relay_post):
        self.sock_path, self.post = sock_path, post

    def report(self, task):
        payload = build_report(task)
        meta = task.payload.get('metadata') or {}
        req = {'url': meta.get('report-url'), 'task_type': meta.get('task-type'), 'payload': payload}
        try:
            status, body = self.post('/v1/report', req, self.sock_path)
        except (OSError, http.client.HTTPException) as e:
            raise ReportError(f'relay unreachable: {e}') from None
        if status != 200:
            raise ReportError(f'relay refused the report: {status} {body}')
        code = int(body.get('status', 0))
        if code == 409:
            task.finish(ABORTED)
        if not 200 <= code < 300:
            raise ReportError(f'bad status code: {code}')


def build_report(task):
    payload = dict(task.details or {})
    logs, task.logs = ''.join(task.logs), []
    payload['invocation'] = {'status': STATUS_STRING[task.status], 'logs': logs,
                             'interrupted': task.status == INTERRUPTED}
    return payload


# ---------------------------------------------------------------- tasks and recipes
class Task:
    def __init__(self, payload, reporter, stop=None):
        self.payload, self.reporter = payload, reporter
        self.stop = stop or threading.Event()
        self.status, self.details, self.logs = RUNNING, None, []

    def debug(self, msg):
        self.logs.append(f'{msg}\n')
        log.debug('%s', msg.rstrip()[:300])

    def finish(self, status, details=None):
        if self.status != RUNNING:
            return
        self.status, self.details = status, details
        raise TaskFinished()

    def run(self, runner):
        """True = acknowledge the message, False = nack it for redelivery."""
        err = None
        try:
            self.reporter.report(self)
            runner(self)
        except TaskFinished:
            pass
        except Exception as e:
            err = e
            log.error('task error: %s\n%s', e, traceback.format_exc())
        if self.status == RUNNING:
            self.status = ERRORED
        try:
            self.finalize_report()
        except TaskFinished:
            pass
        except Exception as e:
            err = e if err is None else Exception(f'{err}, t.FinalizeReport: {e}')
            log.error('final report failed: %s', e)
        if self.status in (ERRORED, INTERRUPTED):
            return False
        return err is None

    def finalize_report(self):
        if self.status == ABORTED:
            return
        if self.stop.is_set() and self.status != COMPLETED:
            self.status = INTERRUPTED
        self.reporter.report(self)


def run_recipe(task, steps):
    n = len(steps)
    for i, (name, fn) in enumerate(steps, 1):
        task.debug(f'>>> Starting step {i}/{n}: {name}')
        try:
            fn(task)
        except (TaskFinished, Interrupted):
            raise
        except Exception as e:
            task.debug(f'Step returned with an error: {e}.')
            raise
        finally:
            task.debug(f'>>> Ending step {i}/{n}\n')


def step_hello(task):
    task.debug('Welcome to Saturn!')
    task.debug(f'Node: {socket.gethostname()}')
    task.debug(f'Revision: {REVISION}')


def run_cmd(task, cmd, timeout, cwd=None, env=None):
    """Run a command in its own process group; stop() kills the group. Returns (exit code, stdout, stderr)."""
    task.debug('Running command: ' + ' '.join(os.path.basename(c) if c.startswith('/') and i == 0 else c
                                              for i, c in enumerate(cmd)))
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.DEVNULL,
                            text=True, errors='replace', cwd=cwd, env=env, start_new_session=True)
    deadline = time.time() + timeout
    while True:
        try:
            out, err = proc.communicate(timeout=1)
            return proc.returncode, out or '', err or ''
        except subprocess.TimeoutExpired:
            if task.stop.is_set() or time.time() > deadline:
                _kill_group(proc)
                out, err = proc.communicate()
                if task.stop.is_set():
                    raise Interrupted('stopped while running ' + os.path.basename(cmd[0]))
                return 124, out or '', err or ''


def _kill_group(proc):
    try:
        os.killpg(proc.pid, signal.SIGTERM)
    except ProcessLookupError:
        return
    try:
        proc.wait(timeout=15)
    except subprocess.TimeoutExpired:
        try:
            os.killpg(proc.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass


# ---------------------------------------------------------------- storage
def file_spec(d, what):
    if not isinstance(d, dict) or not isinstance(d.get('bucket'), str) or not isinstance(d.get('name'), str):
        raise ValueError(f'bad file specification for {what}: {d!r}')
    storage.object_path(d['bucket'], d['name'])
    return d['bucket'], d['name']


def safe_extract(data, root, limit=MAX_EXTRACTED):
    """Extract zip bytes under root. Returns None on success or an error message (malformed, illegal path, too big,
    symlink)."""
    root = os.path.abspath(root)
    try:
        zf = zipfile.ZipFile(io.BytesIO(data))
        infos = zf.infolist()
    except (zipfile.BadZipFile, ValueError, OSError) as e:
        return f'Archive is malformed: {e}'
    total = 0
    for info in infos:
        local = os.path.abspath(os.path.join(root, info.filename))
        if not local.startswith(root + os.sep):
            return f'Archive contains illegal path: {info.filename}'
        if (info.external_attr >> 16) & 0o170000 == 0o120000:
            return f'Archive contains a symbolic link: {info.filename}'
        total += info.file_size
    if total > limit:
        return f'Archive expands to {total} bytes (limit {limit}).'
    os.makedirs(root, exist_ok=True)
    try:
        with zf:
            for info in infos:
                local = os.path.abspath(os.path.join(root, info.filename))
                if info.is_dir():
                    os.makedirs(local, exist_ok=True)
                    continue
                os.makedirs(os.path.dirname(local), exist_ok=True)
                with zf.open(info) as r, open(local, 'wb') as w:
                    shutil.copyfileobj(r, w)
    except (zipfile.BadZipFile, ValueError, OSError, EOFError) as e:
        return f'Archive is malformed: {e}'
    return None


def classify_source(root):
    """What a submission archive holds. Returns (kind, path):
    ('js', dir with robot.js) | ('bundle', the single .js file) | ('java'|'python', source dir) | (None, reason)."""
    found = {'robot': [], 'js': [], 'java': [], 'py': []}
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = sorted(d for d in dirnames if not d.startswith('.') and d not in ('node_modules', '__MACOSX'))
        for f in filenames:
            if f.startswith('.'):
                continue
            p = os.path.join(dirpath, f)
            if f == 'robot.js':
                found['robot'].append(p)
            if f.endswith('.js'):
                found['js'].append(p)
            elif f.endswith('.java'):
                found['java'].append(p)
            elif f.endswith('.py'):
                found['py'].append(p)
    if found['robot']:
        best = min(found['robot'], key=lambda p: (p.count(os.sep), p))
        return 'js', os.path.dirname(best)
    if len(found['js']) == 1:
        return 'bundle', found['js'][0]
    if found['js']:
        return None, f'{len(found["js"])} .js files but no robot.js'
    for kind, key, entry in (('java', 'java', 'MyRobot.java'), ('python', 'py', 'robot.py')):
        if found[key]:
            hits = [p for p in found[key] if os.path.basename(p) == entry]
            base = min(hits or found[key], key=lambda p: (p.count(os.sep), p))
            return kind, os.path.dirname(base)
    return None, 'no robot.js, no single .js bundle, no Java or Python sources'


# ---------------------------------------------------------------- the runtime (node, the engine, run_game.js)
class Runtime:
    """Where the pinned engine lives: $GALAXY_RUNTIME (default /opt/bc19-galaxy/runtime) holds bin/node,
    tools/run_game.js, tools/compile19.js and engine/node_modules/bc19 (installed by galaxy-setup.sh runtime)."""

    def __init__(self, root=None, sandbox=None):
        self.root = root or os.environ.get('GALAXY_RUNTIME') or '/opt/bc19-galaxy/runtime'
        self.node = os.path.join(self.root, 'bin', 'node')
        self.run_game = os.path.join(self.root, 'tools', 'run_game.js')
        self.compile = os.path.join(self.root, 'tools', 'compile19.js')
        self.transpiler = os.environ.get('GALAXY_TRANSPILER') or ''
        # sandbox: the wrapper that puts a command in its own user + network + mount namespace with a read-only view
        # of everything but the work directory (sandbox.sh). Tests pass [] to run without it.
        self.sandbox = ['/bin/sh', os.path.join(HERE, 'sandbox.sh')] if sandbox is None else sandbox

    def describe(self):
        eng = os.path.join(self.root, 'engine', 'node_modules', 'bc19', 'package.json')
        try:
            ver = json.load(open(eng)).get('version')
        except (OSError, ValueError):
            ver = '?'
        return f'bc19 engine {ver}, node {self.node}, sandbox {"on" if self.sandbox else "OFF"}'

    def game_argv(self, red, blue, seed, replay, out_json):
        return [self.node, f'--max-old-space-size={GAME_HEAP_MB}', self.run_game, '--red', red, '--blue', blue,
                '--seed', str(seed), '--replay', replay, '--json', out_json] + (['--init-ms', str(INIT_MS)] if INIT_MS else [])

    def cmd(self, workdir, argv):
        return [*self.sandbox, workdir, *argv] if self.sandbox else list(argv)


def game_env():
    return {'PATH': '/usr/bin:/bin', 'LANG': 'C.UTF-8', 'HOME': '/nonexistent'}


def sides(i, alternate):
    """(red, blue) labels of game i (0-based): A is red unless alternate order and i is odd."""
    return ('B', 'A') if alternate and i % 2 == 1 else ('A', 'B')


def parse_maps(maps):
    if not isinstance(maps, list) or not maps:
        raise ValueError(f'bad map list {maps!r}')
    seeds = []
    for m in maps:
        mm = MAP_RE.match(m) if isinstance(m, str) else None
        if not mm:
            raise ValueError(f'bad map name {m!r} (expected seed-<n>)')
        seeds.append(int(mm.group(1)))
    return seeds


def tally(results):
    """results: [{'winner_label': 'A'|'B'}] -> [A wins, B wins]."""
    s = [0, 0]
    for r in results:
        if r.get('winner_label') == 'A':
            s[0] += 1
        elif r.get('winner_label') == 'B':
            s[1] += 1
        else:
            raise RuntimeError(f'game without a winner: {r!r}')
    return s


def write_replay_archive(path, games, meta):
    """ZIP_STORED archive: game files (name, path) plus match.json."""
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_STORED) as z:
        for name, p in games:
            z.write(p, name)
        z.writestr('match.json', json.dumps(meta, indent=1, sort_keys=True))


class Runners:
    def __init__(self, workdir, runtime, game_timeout_s=None):
        self.workdir, self.rt = workdir, runtime
        self.game_timeout = game_timeout_s or game_timeout()

    def _prepare(self, task):
        task.debug('Flushing build directory.')
        shutil.rmtree(self.workdir, ignore_errors=True)
        os.makedirs(self.workdir)
        task.debug(f'Using {self.rt.describe()}.')

    # ---- compile
    def compile(self, task):
        d = task.payload.get('details') or {}
        src_root = os.path.join(self.workdir, 'src')
        out_dir = os.path.join(self.workdir, 'build')
        bundle = os.path.join(out_dir, 'bundle.js')

        def download(t):
            bucket, name = file_spec(d.get('source'), 'source')
            data = storage.read_bytes(bucket, name)
            t.debug(f'File retrieved, total {len(data)} bytes.')
            err = safe_extract(data, src_root)
            if err:
                t.debug(err)
                t.finish(COMPLETED, {'accepted': False})

        def build(t):
            os.makedirs(out_dir, exist_ok=True)
            kind, where = classify_source(src_root)
            if kind is None:
                t.debug(f'Submission rejected: {where}.')
                t.finish(COMPLETED, {'accepted': False})
            rel = os.path.relpath(where, src_root)
            t.debug(f'Detected a {kind} submission at {rel}.')
            if kind == 'bundle':
                if os.path.getsize(where) > MAX_BUNDLE:
                    t.debug('Bundle too large.')
                    t.finish(COMPLETED, {'accepted': False})
                shutil.copyfile(where, bundle)
            else:
                if kind == 'js':
                    argv = [self.rt.node, self.rt.compile, where, bundle]
                elif self.rt.transpiler and os.path.isfile(self.rt.transpiler):
                    argv = [self.rt.node, self.rt.transpiler, where, bundle]
                else:
                    t.debug(f'{kind} sources need the local transpiler, which is not installed on this replica '
                            '(GALAXY_TRANSPILER). Submit a prebuilt JavaScript bundle instead. Sources are never '
                            'sent to an external compile service.')
                    t.finish(COMPLETED, {'accepted': False})
                rc, out, err = run_cmd(t, self.rt.cmd(self.workdir, argv), timeout=300, env=game_env())
                t.debug((out + err)[-4000:])
                if rc != 0 or not os.path.isfile(bundle) or os.path.getsize(bundle) == 0:
                    t.debug(f'Build failed (exit {rc}).')
                    t.finish(COMPLETED, {'accepted': False})

        def upload(t):
            bucket, name = file_spec(d.get('binary'), 'binary')
            tmp = os.path.join(self.workdir, 'binary.zip')
            with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as z:
                z.write(bundle, 'bundle.js')
            storage.write_file(bucket, name, tmp, 'application/zip', 'projectPrivate')

        def succeeded(t):
            t.finish(COMPLETED, {'accepted': True})

        run_recipe(task, [('Hello world', step_hello), ('Prepare scaffold', self._prepare),
                          ('Download source code', download), ('Build source code', build),
                          ('Upload binary', upload), ('Compile succeeded', succeeded)])

    # ---- execute
    def execute(self, task):
        d = task.payload.get('details') or {}
        data = os.path.join(self.workdir, 'data')
        a, b = d.get('a') or {}, d.get('b') or {}
        seeds = parse_maps(d.get('maps'))
        alternate = bool(d.get('alternate-order'))
        bundles, results = {}, []
        names = {'A': str(a.get('team-name')), 'B': str(b.get('team-name'))}

        def download(t):
            for key, sub in (('A', a), ('B', b)):
                bucket, name = file_spec(sub.get('binary'), f'binary {key}')
                err = safe_extract(storage.read_bytes(bucket, name), os.path.join(data, key))
                p = os.path.join(data, key, 'bundle.js')
                if err or not os.path.isfile(p):
                    raise RuntimeError(f'binary {key} unusable: {err or "no bundle.js"}')
                bundles[key] = p

        def run_match(t):
            for i, seed in enumerate(seeds):
                red, blue = sides(i, alternate)
                gdir = os.path.join(data, f'game-{i + 1:02d}')
                os.makedirs(gdir)
                replay = os.path.join(gdir, 'replay.bc19')
                out_json = os.path.join(gdir, 'result.json')
                argv = self.rt.game_argv(bundles[red], bundles[blue], seed, replay, out_json)
                t.debug(f'Game {i + 1}/{len(seeds)}: seed {seed}, red {names[red]} ({red}), blue {names[blue]} ({blue})')
                t0 = time.time()
                rc, out, err = run_cmd(t, self.rt.cmd(gdir, argv), timeout=self.game_timeout, env=game_env())
                if rc != 0 or not os.path.isfile(out_json) or not os.path.isfile(replay):
                    t.debug(err[-2000:])
                    raise RuntimeError(f'game {i + 1} failed: exit status {rc}' + (' (time limit)' if rc == 124 else ''))
                res = json.load(open(out_json))
                win = {'red': red, 'blue': blue}.get(res.get('winner'))
                row = {'game': i + 1, 'seed': seed, 'map': f'seed-{seed}', 'red': red, 'blue': blue,
                       'red_team': names[red], 'blue_team': names[blue], 'winner_color': res.get('winner'),
                       'winner_label': win, 'winner_team': names.get(win), 'reason': res.get('reason'),
                       'rounds': res.get('rounds'), 'wall_s': round(time.time() - t0, 1),
                       'file': f'game-{i + 1:02d}-seed{seed}.bc19',
                       'teams': [{k: v for k, v in tm.items() if k in TEAM_KEYS}
                                 for tm in res.get('teams') or []]}
                results.append((row, replay))
                t.debug(f'  -> {row["winner_team"]} ({row["winner_color"]}) by {row["reason"]} in {row["rounds"]} '
                        f'rounds, {row["wall_s"]} s')

        def upload_replay(t):
            bucket, name = file_spec(d.get('replay'), 'replay')
            arc = os.path.join(self.workdir, 'replay.zip')
            meta = {'format': 'bc19-replica match archive v1', 'teams': names, 'alternate_order': alternate,
                    'games': [r for r, _ in results]}
            write_replay_archive(arc, [(r['file'], p) for r, p in results], meta)
            storage.write_file(bucket, name, arc, 'application/zip', 'publicRead')

        def scores(t):
            s = tally([r for r, _ in results])
            if sum(s) != len(seeds):
                raise RuntimeError(f'{sum(s)} winners for {len(seeds)} maps')
            t.finish(COMPLETED, {'scores': s})

        run_recipe(task, [('Hello world', step_hello), ('Prepare scaffold', self._prepare),
                          ('Download binary', download), ('Run match', run_match), ('Upload replay', upload_replay),
                          ('Determine scores', scores)])


# ---------------------------------------------------------------- the subscriber
def parse_message(msg):
    try:
        payload = json.loads(base64.b64decode(msg['data'], validate=True))
    except (KeyError, TypeError, ValueError):
        return None
    if not isinstance(payload, dict):
        return None
    for k, t in (('episode', dict), ('metadata', dict), ('details', dict)):
        if k in payload and not isinstance(payload[k], t):
            return None
    return payload


class Executor:
    def __init__(self, compile_slots=1, execute_slots=4, runtime=None, reporter=None, poll=1.0):
        self.compile_slots, self.execute_slots = compile_slots, execute_slots
        self.runtime = runtime or Runtime()
        self.reporter = reporter or RelayReporter()
        self.poll = poll
        self.stop = threading.Event()

    def handle(self, payload, workdir):
        runners = Runners(workdir, self.runtime)
        kind = (payload.get('metadata') or {}).get('task-type')
        runner = {'compile': runners.compile, 'execute': runners.execute}.get(kind)
        if runner is None:
            log.error('no such task type: %r', kind)
            return False
        return Task(payload, self.reporter, self.stop).run(runner)

    def slot(self, topic, k):
        q = spool.topic_queue(topic).ensure()
        workdir = config.galaxy_home('saturn', f'{topic}-{k}')
        while not self.stop.is_set():
            item = q.lease()
            if item is None:
                self.stop.wait(self.poll)
                continue
            msg_id, msg = item
            payload = parse_message(msg)
            if payload is None:
                log.error('slot %s-%d: invalid message %s; dropped', topic, k, msg_id)
                q.ack(msg_id)
                continue
            meta = payload.get('metadata') or {}
            log.info('slot %s-%d: starting %s %s', topic, k, meta.get('task-type'), meta.get('report-url'))
            t0 = time.time()
            try:
                ok = self.handle(payload, workdir)
            except Exception:
                log.exception('slot %s-%d: handler crashed', topic, k)
                ok = False
            if ok:
                q.ack(msg_id)
                shutil.rmtree(workdir, ignore_errors=True)     # disk is scarce: keep nothing once reported
            else:
                msg = dict(msg, delivery_attempt=int(msg.get('delivery_attempt') or 0) + 1)
                q.nack(msg_id, msg, delay=0 if self.stop.is_set() else nack_delay())
            log.info('slot %s-%d: %s %s in %.0fs', topic, k, 'acked' if ok else 'nacked', msg_id, time.time() - t0)

    def run(self):
        for topic in (config.TOPIC_COMPILE, config.TOPIC_EXECUTE):
            n = spool.topic_queue(topic).ensure().recover()
            if n:
                log.info('returned %d unacknowledged %s message(s) to the queue', n, topic)
        log.info('saturn: %d compile + %d execute slots; %s; relay %s', self.compile_slots, self.execute_slots,
                 self.runtime.describe(), config.relay_socket())
        threads = [threading.Thread(target=self.slot, args=(config.TOPIC_COMPILE, k), daemon=True)
                   for k in range(self.compile_slots)]
        threads += [threading.Thread(target=self.slot, args=(config.TOPIC_EXECUTE, k), daemon=True)
                    for k in range(self.execute_slots)]
        for t in threads:
            t.start()
        while any(t.is_alive() for t in threads):
            time.sleep(0.5)
        log.info('saturn stopped')


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    sub = ap.add_subparsers(dest='cmd', required=True)
    r = sub.add_parser('run')
    r.add_argument('--compile-slots', type=int, default=int(os.environ.get('GALAXY_COMPILE_SLOTS') or 1))
    r.add_argument('--execute-slots', type=int, default=int(os.environ.get('GALAXY_EXECUTE_SLOTS') or 4))
    sub.add_parser('status')
    a = ap.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(message)s')
    if a.cmd == 'status':
        for topic in (config.TOPIC_COMPILE, config.TOPIC_EXECUTE):
            print(topic, spool.topic_queue(topic).counts())
        return 0
    # the owner's cap: at most 4 replica games at once on the shared VM (one game per execute slot), so the
    # 2019 chess clock (100 ms + 20 ms per turn, wall time) is not eaten by CPU contention
    if not (0 <= a.compile_slots <= 1 and 0 <= a.execute_slots <= MAX_EXECUTE_SLOTS):
        ap.error(f'slots: compile 0..1, execute 0..{MAX_EXECUTE_SLOTS} (at most {MAX_EXECUTE_SLOTS} games at once on the shared VM)')
    ex = Executor(a.compile_slots, a.execute_slots)

    def on_signal(signum, frame):
        log.info('signal %d: stopping (running tasks are reported as interrupted)', signum)
        ex.stop.set()
    signal.signal(signal.SIGTERM, on_signal)
    signal.signal(signal.SIGINT, on_signal)
    ex.run()
    return 0


if __name__ == '__main__':
    sys.exit(main())
