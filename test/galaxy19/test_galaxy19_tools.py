#!/usr/bin/env python3
"""Tests of the bc19-specific replica logic: saturn's submission classifier, archive extraction, map names, game
sides and tallies, the replay archive; the field roster and challenge picker (field.py); contest19's scrimmage plan;
client neighbours/team names; the map picker (maps.py). Standard library only, no network, no game.
Run: python3 test/galaxy19/test_galaxy19_tools.py (also run by test/galaxy19.test.js in tools/unit-tests.sh)
"""
import io
import json
import math
import os
import random
import subprocess
import sys
import tempfile
import unittest
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
GALAXY = os.path.join(REPO, 'tools', 'galaxy19')
for p in (os.path.join(GALAXY, 'standins'), GALAXY):
    if p not in sys.path:
        sys.path.insert(0, p)
TMP = tempfile.mkdtemp(prefix='galaxy19-tools-test-')
os.environ.setdefault('GALAXY_HOME', os.path.join(TMP, 'home'))
os.environ.setdefault('GALAXY_STORAGE_ROOT', os.path.join(TMP, 'storage'))
os.environ.setdefault('GALAXY_BASE_HOST', '1-2-3-4.sslip.io')

import client as cl  # noqa: E402
import contest19  # noqa: E402
import field  # noqa: E402
import maps as mp  # noqa: E402
import panelsim  # noqa: E402
import saturn  # noqa: E402


def zbytes(entries):
    b = io.BytesIO()
    with zipfile.ZipFile(b, 'w') as z:
        for name, data in entries.items():
            z.writestr(name, data)
    return b.getvalue()


def touch(root, rel, text='x'):
    p = os.path.join(root, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w') as fh:
        fh.write(text)
    return p


def team(i, rating, active=True, status='R'):
    return {'id': i, 'name': f't{i}', 'rating': rating, 'active': active, 'status': status}


class Classify(unittest.TestCase):
    def test_kinds(self):
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'a/robot.js'), touch(d, 'a/util.js'), touch(d, 'a/deep/robot.js')
            self.assertEqual(saturn.classify_source(d), ('js', os.path.join(d, 'a')))
        with tempfile.TemporaryDirectory() as d:
            p = touch(d, 'bot.js')
            touch(d, '.hidden.js'), touch(d, '__MACOSX/x.js'), touch(d, 'node_modules/y.js')
            self.assertEqual(saturn.classify_source(d), ('bundle', p))
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'a.js'), touch(d, 'b.js')
            kind, why = saturn.classify_source(d)
            self.assertIsNone(kind)
            self.assertIn('no robot.js', why)
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'src/Helper.java'), touch(d, 'src/bot/MyRobot.java')
            self.assertEqual(saturn.classify_source(d), ('java', os.path.join(d, 'src', 'bot')))
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'p/robot.py'), touch(d, 'p/x.py')
            self.assertEqual(saturn.classify_source(d), ('python', os.path.join(d, 'p')))
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'README')
            self.assertIsNone(saturn.classify_source(d)[0])


class Extract(unittest.TestCase):
    def test_ok(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertIsNone(saturn.safe_extract(zbytes({'x/robot.js': 'a', 'y.txt': 'b'}), d))
            with open(os.path.join(d, 'x', 'robot.js')) as fh:
                self.assertEqual(fh.read(), 'a')

    def test_rejects(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertIn('malformed', saturn.safe_extract(b'not a zip', d))
            self.assertIn('illegal path', saturn.safe_extract(zbytes({'../evil': 'a'}), d))
            self.assertIn('limit', saturn.safe_extract(zbytes({'big': 'x' * 100}), d, limit=10))
            b = io.BytesIO()
            with zipfile.ZipFile(b, 'w') as z:
                info = zipfile.ZipInfo('link')
                info.external_attr = (0o120777 << 16)
                z.writestr(info, '/etc/passwd')
            self.assertIn('symbolic link', saturn.safe_extract(b.getvalue(), d))
            self.assertFalse(os.path.exists(os.path.join(os.path.dirname(d), 'evil')))


class Games(unittest.TestCase):
    def test_parse_maps(self):
        self.assertEqual(saturn.parse_maps(['seed-1', 'seed-2822']), [1, 2822])
        for bad in ([], 'seed-1', ['seed-0'], ['seed-01'], ['maptestsmall'], [3], ['seed-12345678901']):
            with self.assertRaises(ValueError):
                saturn.parse_maps(bad)

    def test_sides_and_tally(self):
        self.assertEqual([saturn.sides(i, True) for i in range(3)], [('A', 'B'), ('B', 'A'), ('A', 'B')])
        self.assertEqual([saturn.sides(i, False) for i in range(2)], [('A', 'B'), ('A', 'B')])
        self.assertEqual(saturn.tally([{'winner_label': 'A'}, {'winner_label': 'B'}, {'winner_label': 'A'}]), [2, 1])
        with self.assertRaises(RuntimeError):
            saturn.tally([{'winner_label': None}])

    def test_game_row_keeps_our_caught_exceptions(self):
        res = {'winner': 'blue', 'reason': 'castles', 'rounds': 400,
               'teams': [{'team': 'red', 'exceptions': 0, 'exc_caught': 3, 'slow_logged': 7, 'logs': 12},
                         {'team': 'blue', 'exceptions': 1, 'exc_caught': 0, 'slow_logged': 0, 'logs': 0}]}
        row = saturn.game_row(0, 203, 'A', 'B', {'A': 'vibe19', 'B': 'X'}, res, 12.34)
        self.assertEqual((row['winner_team'], row['map'], row['wall_s']), ('X', 'seed-203', 12.3))
        self.assertEqual(row['teams'][0], {'team': 'red', 'exceptions': 0, 'exc_caught': 3, 'slow_logged': 7})

    def test_archive(self):
        with tempfile.TemporaryDirectory() as d:
            g = touch(d, 'g.bc19', 'replay')
            out = os.path.join(d, 'm.zip')
            saturn.write_replay_archive(out, [('game-01-seed5.bc19', g)], {'winner': 'A'})
            with zipfile.ZipFile(out) as z:
                self.assertEqual(sorted(z.namelist()), ['game-01-seed5.bc19', 'match.json'])
                self.assertTrue(all(i.compress_type == zipfile.ZIP_STORED for i in z.infolist()))
                self.assertEqual(json.loads(z.read('match.json')), {'winner': 'A'})

    def test_runtime_cmd(self):
        rt = saturn.Runtime(root='/r', sandbox=['/bin/sh', 'sb.sh'])
        self.assertEqual(rt.cmd('/w', ['node', 'x']), ['/bin/sh', 'sb.sh', '/w', 'node', 'x'])
        self.assertEqual(saturn.Runtime(root='/r', sandbox=[]).cmd('/w', ['node']), ['node'])
        self.assertTrue(saturn.Runtime(root='/r').sandbox[-1].endswith('sandbox.sh'))
        self.assertLessEqual(saturn.MAX_EXECUTE_SLOTS, 8)   # the VM's vCPUs
        argv = rt.game_argv('/w/a.js', '/w/b.js', 7, '/w/r.bc19', '/w/o.json')
        self.assertEqual(argv[0], '/r/bin/node')
        self.assertEqual(argv[1], f'--max-old-space-size={saturn.GAME_HEAP_MB}')   # bounded memory per game
        self.assertLessEqual(saturn.GAME_HEAP_MB * saturn.MAX_EXECUTE_SLOTS, 26 * 1024)  # within the unit's MemoryMax (27G)
        semi = [f'--max-semi-space-size={saturn.GAME_SEMI_MB}'] if saturn.GAME_SEMI_MB else []
        self.assertEqual(argv[2:2 + len(semi)], semi)
        self.assertEqual(argv[2 + len(semi):], ['/r/tools/run_game.js', '--red', '/w/a.js', '--blue', '/w/b.js', '--seed', '7',
                                    '--replay', '/w/r.bc19', '--json', '/w/o.json', '--init-ms', str(saturn.INIT_MS)] +
                         (['--fast-init'] if saturn.FAST_INIT else []) + (['--fast-view'] if saturn.FAST_VIEW else []))
        self.assertTrue(saturn.FAST_INIT)   # the default: compile each bundle once per game
        self.assertTrue(saturn.FAST_VIEW)   # the default: the same turn message, built before the clock starts
        self.assertGreaterEqual(saturn.INIT_MS, 100)   # never stricter than the engine's own rule


FAKE_GAME = """import json, os, sys
red, blue, seed, replay, out, logf, failf = sys.argv[1:]
with open(logf, 'a') as fh:
    fh.write(seed + '\\n')
if os.path.exists(failf) and open(failf).read().strip() == seed:
    os.remove(failf)
    sys.exit(3)
open(replay, 'w').write('replay of seed ' + seed)
json.dump({'winner': 'red' if int(seed) % 2 else 'blue', 'reason': 'castles', 'rounds': 100 + int(seed), 'teams': []},
          open(out, 'w'))
"""


class FakeRuntime(saturn.Runtime):
    """run_game.js stand-in: a python script that logs each seed it plays and fails once on the seed in failf."""

    def __init__(self, d):
        super().__init__(root=d, sandbox=[])
        self.script, self.logf, self.failf = touch(d, 'fake_game.py', FAKE_GAME), os.path.join(d, 'played'), \
            os.path.join(d, 'fail')

    def game_argv(self, red, blue, seed, replay, out_json):
        return [sys.executable, '-I', self.script, red, blue, str(seed), replay, out_json, self.logf, self.failf]

    def played(self):
        if not os.path.exists(self.logf):
            return []
        with open(self.logf) as fh:
            return fh.read().split()


class Resume(unittest.TestCase):
    def payload(self, match):
        b = 'bc19-replica-secure'
        for key in ('a', 'b'):
            saturn.storage.write_bytes(b, f'm{match}/{key}.zip', zbytes({'bundle.js': f'// {key}'}))
        return {'metadata': {'report-url': f'https://x/api/compete/bc19/match/{match}/report/', 'task-type': 'execute'},
                'details': {'maps': ['seed-1', 'seed-2', 'seed-3'], 'alternate-order': True,
                            'replay': {'bucket': b, 'name': f'm{match}/replay.bc19'},
                            'a': {'team-name': 'ta', 'binary': {'bucket': b, 'name': f'm{match}/a.zip'}},
                            'b': {'team-name': 'tb', 'binary': {'bucket': b, 'name': f'm{match}/b.zip'}}}}

    def test_a_retry_plays_only_the_missing_games(self):
        from test_galaxy19 import FakeReporter
        with tempfile.TemporaryDirectory() as d:
            rt, rep = FakeRuntime(d), FakeReporter()
            ex, p, w = saturn.Executor(runtime=rt, reporter=rep), self.payload(31), os.path.join(d, 'w')
            touch(d, 'fail', '2')
            self.assertFalse(ex.handle(p, w))                   # game 2 crashes: TRY, nack
            self.assertEqual(rep.reports[-1]['invocation']['status'], 'TRY')
            self.assertEqual(rt.played(), ['1', '2'])
            self.assertTrue(ex.handle(p, w))                    # the retry keeps game 1
            self.assertEqual(rt.played(), ['1', '2', '2', '3'])
            self.assertEqual(rep.reports[-1]['scores'], [3, 0])  # odd seeds: red wins (A red on 1, 3); even: blue (A)
            self.assertIn('Game 1/3: seed 1, finished by an earlier attempt -> ta (red) by castles in 101 rounds',
                          rep.reports[-1]['invocation']['logs'])
            with zipfile.ZipFile(io.BytesIO(saturn.storage.read_bytes('bc19-replica-secure', 'm31/replay.bc19'))) as z:
                self.assertEqual(z.read('game-01-seed1.bc19'), b'replay of seed 1')
                games = json.loads(z.read('match.json'))['games']
                self.assertEqual([g['winner_team'] for g in games], ['ta', 'ta', 'ta'])
            self.assertTrue(os.path.isdir(saturn.resume_dir(p)))
            other = self.payload(32)                            # another match never reuses these games
            self.assertNotEqual(saturn.resume_dir(other), saturn.resume_dir(p))
            saturn.forget_games(p)                              # on ack
            self.assertFalse(os.path.exists(saturn.resume_dir(p)))
            self.assertTrue(ex.handle(p, w))                    # nothing kept: all three play again
            self.assertEqual(rt.played()[4:], ['1', '2', '3'])
            saturn.forget_games(p)

    def test_kept_game_checks_seed_and_sides_and_prune_drops_old_dirs(self):
        with tempfile.TemporaryDirectory() as d:
            replay = touch(d, 'r.bc19', 'r')
            g = os.path.join(d, 'k', 'game-01')
            os.makedirs(os.path.dirname(g))
            saturn.keep_game(g, {'seed': 5, 'red': 'A', 'blue': 'B'}, replay)
            self.assertEqual(saturn.kept_game(g, 5, 'A', 'B')['seed'], 5)
            self.assertIsNone(saturn.kept_game(g, 6, 'A', 'B'))
            self.assertIsNone(saturn.kept_game(g, 5, 'B', 'A'))
            os.remove(os.path.join(g, 'replay.bc19'))
            self.assertIsNone(saturn.kept_game(g, 5, 'A', 'B'))
        root = saturn.config.galaxy_home('saturn', 'resume')
        os.makedirs(os.path.join(root, 'old'), exist_ok=True)
        os.makedirs(os.path.join(root, 'new'), exist_ok=True)
        os.utime(os.path.join(root, 'old'), (1, 1))
        self.assertEqual(saturn.prune_resume(), 1)
        self.assertEqual(sorted(os.listdir(root)), ['new'])


class Field(unittest.TestCase):
    def test_roster(self):
        with tempfile.TemporaryDirectory() as repo, tempfile.TemporaryDirectory() as bench:
            touch(repo, 'tools/bench/roster.tsv',
                  'name\tcompile\tsmoke\ngood\tok\tok\ncrashy\tok\tcrash\nbroken\tfail\t-\nmissing\tok\tok\n'
                  + 'x' * 40 + '\tok\tok\n')
            touch(bench, 'compiled/good/bot.js'), touch(bench, 'compiled/crashy/bot.js')
            touch(bench, 'compiled/' + 'x' * 40 + '/bot.js')
            rows = {r['entrant']: r for r in field.read_field(repo, bench)}
            self.assertEqual(rows['good']['path'], os.path.join(bench, 'compiled', 'good', 'bot.js'))
            self.assertEqual(rows['crashy']['note'], 'smoke crash')
            self.assertEqual(rows['broken']['note'], 'compile fail')
            self.assertEqual(rows['missing']['note'], 'no compiled bundle')
            self.assertLessEqual(len(rows['x' * 40]['team']), 32)
            ent = field.entrants(repo=repo, bench=bench)
            self.assertEqual(ent[0]['team'], field.STARTER_TEAM)
            self.assertEqual([r['entrant'] for r in field.entrants('good', repo, bench)], ['good'])

    def test_compile_tsv_fallback(self):
        with tempfile.TemporaryDirectory() as repo, tempfile.TemporaryDirectory() as bench:
            touch(bench, 'compile.tsv', 'name\tstatus\na\tok\nb\terror\n../../etc\tok\n')
            touch(bench, 'compiled/a/bot.js')
            rows = {r['entrant']: r for r in field.read_field(repo, bench)}
            self.assertIsNotNone(rows['a']['path'])
            self.assertEqual(rows['b']['note'], 'compile error')
            self.assertIsNone(rows['../../etc']['path'])

    def test_pick_challenge(self):
        ladder = [team(1, 100), team(2, 110), team(3, 120), team(4, 130), team(5, 90, active=False), team(6, 140)]
        rnd = random.Random(1)
        for _ in range(50):
            ch, opp, ranked = field.pick_challenge(ladder, {'a': 1, 'b': 2, 'f': 6}, rnd)
            me = {'a': 1, 'b': 2, 'f': 6}[ch]
            mine = next(t for t in ladder if t['id'] == me)['rating']
            self.assertNotEqual(opp['id'], me)
            self.assertTrue(opp['active'])
            self.assertEqual(ranked, opp['rating'] >= mine)
            if ch == 'f':
                self.assertFalse(ranked)       # top team: nobody above, so unranked downward
        self.assertIsNone(field.pick_challenge(ladder, {'z': 5}, rnd))
        self.assertIsNone(field.pick_challenge(ladder, {}, rnd))

    def test_boost_opponents(self):
        ladder = [team(1, 1700), team(2, 1500), team(3, 900), team(4, 700), team(5, 0), team(6, 0),
                  team(7, 1200, active=False), team(8, 600)]
        ids = lambda xs: [t['id'] for t in xs]  # noqa: E731
        # Unrated team: anyone who has played, spread from the top; never itself, an inactive team or an unrated one.
        self.assertEqual(ids(field.boost_opponents(ladder, 5, 2)), [1, 3])
        self.assertEqual(ids(field.boost_opponents(ladder, 5, 5)), [1, 2, 3, 4, 8])
        self.assertEqual(ids(field.boost_opponents(ladder, 5, 7)), [1, 2, 3, 4, 8, 1, 2])
        # Rated team: only at or above it (galaxy's ranked rule).
        self.assertEqual(ids(field.boost_opponents(ladder, 4, 4)), [1, 2, 3, 1])
        self.assertEqual(field.boost_opponents(ladder, 1, 3), [])
        self.assertEqual(field.boost_opponents(ladder, 99, 3), [])

    def test_queue_census(self):
        m = lambda i, st, ranked=True: {'id': i, 'status': st, 'is_ranked': ranked,  # noqa: E731
                                        'participants': [{'teamname': f'a{i}'}, {'teamname': f'b{i}'}]}
        q = field.queue_census([m(1, 'OK!'), m(2, 'QUE'), m(3, 'QUE', False), m(4, 'NEW'), m(5, 'TRY'), m(6, 'RUN'),
                                m(7, 'ERR')])
        self.assertEqual(q['by_status'], {'OK!': 1, 'QUE': 2, 'NEW': 1, 'TRY': 1, 'RUN': 1, 'ERR': 1})
        self.assertEqual((q['waiting'], q['ranked']), (4, 3))
        self.assertEqual(q['live'], [(5, 'TRY', ['a5', 'b5']), (6, 'RUN', ['a6', 'b6'])])

    def test_trickle_order(self):
        with tempfile.TemporaryDirectory() as bench:
            g = lambda n, side, reason='castles', init=0: json.dumps(  # noqa: E731
                {'name': n, 'side': side, 'reason': reason, 'bot': {'init_fail': init}})
            touch(bench, 'smoke.jsonl', '\n'.join([
                g('clean', 'red'), g('clean', 'blue'), g('half', 'red'), g('half', 'blue', 'init_failure', 3),
                g('loady', 'red', 'health', 40), g('loady', 'blue', 'health', 9), 'not json',
                g('dead', 'red', 'init_failure', 3), json.dumps({'name': 'dead', 'side': 'blue', 'error': 'x'})]))
            tier = field.smoke_tier(bench)
            self.assertEqual(tier, {'clean': 0, 'half': 1, 'loady': 1, 'dead': 3})
            self.assertEqual(field.smoke_tier(os.path.join(bench, 'nowhere')), {})
        rows = [{'team': n, 'entrant': n, 'path': None if n == 'nobundle' else '/b/' + n, 'note': ''}
                for n in ('dead', 'fresh', 'half', 'nobundle', 'clean', 'up', 'loady', 'later')]
        acc = {'up': {'team_id': 7, 'digest': 'abc'}, 'half': {'team_id': 8}}   # half: registered, upload failed
        nx = lambda a, k: [r['team'] for r in field.next_entrants(a, rows, k, tier, lambda p: 'h' + p)]  # noqa: E731
        self.assertEqual(nx(acc, 4), ['clean', 'half', 'loady', 'fresh'])
        self.assertEqual(nx(acc, 99)[4:], ['later', 'dead'])
        self.assertEqual(nx(acc, 0), [])
        renamed = dict(acc, old={'team_id': 9, 'digest': 'h/b/clean'})          # clean's bundle, seeded under another name
        self.assertEqual(nx(renamed, 2), ['half', 'loady'])
        twins = [r['team'] for r in field.next_entrants(acc, rows, 3, tier, lambda p: 'same')]
        self.assertEqual(twins, ['clean'])                                  # identical bundles: the first one only

    def test_our_team_never_challenges(self):
        self.assertIn('vibe19', field.OUR_TEAMS)


class Sandbox(unittest.TestCase):
    """tools/galaxy19/sandbox.sh on this machine: only lo, everything read-only but the work directory, and a refusal
    when a mount stays writable."""
    SB = os.path.join(GALAXY, 'sandbox.sh')

    def run_sb(self, work, script, **env):
        return subprocess.run(['/bin/sh', self.SB, work, 'sh', '-c', script], capture_output=True, text=True, timeout=60,
                              env={**os.environ, **env})

    def test_sandbox(self):
        with tempfile.TemporaryDirectory() as work:
            probe = os.path.join(os.path.expanduser('~'), '.sandbox_test_probe')
            r = self.run_sb(work, f'touch ok; touch {probe} 2>&1; tail -n +3 /proc/net/dev | cut -d: -f1 | tr -d " "; pwd')
            if 'unshare' in r.stderr and r.returncode != 0:
                self.skipTest('no user namespaces here: ' + r.stderr.strip())
            self.assertEqual(r.returncode, 0, r.stderr)
            self.assertIn('Read-only file system', r.stdout)
            self.assertFalse(os.path.exists(probe))
            self.assertTrue(os.path.exists(os.path.join(work, 'ok')))
            self.assertEqual(r.stdout.strip().splitlines()[-2:], ['lo', os.path.realpath(work)])
            r = self.run_sb(work, 'touch ran', SANDBOX_TEST_SKIP='/')
            self.assertEqual(r.returncode, 3)
            self.assertIn('still writable', r.stderr)
            self.assertFalse(os.path.exists(os.path.join(work, 'ran')))


class Contest(unittest.TestCase):
    def test_panel_maps(self):
        import random
        panel, maps = {}, ['m%d' % i for i in range(10)]
        a = contest19.panel_maps(panel, 'X', maps, 3, random.Random(1))
        self.assertEqual(len(set(a)), 3)
        self.assertTrue(set(a) <= set(maps))
        self.assertEqual(contest19.panel_maps(panel, 'X', maps, 3, random.Random(2)), a)   # the control replays the draw
        self.assertEqual(panel, {'X': a})
        contest19.panel_maps(panel, 'Y', maps, 3, random.Random(3))
        self.assertEqual(sorted(panel), ['X', 'Y'])

    def test_plan(self):
        ladder = [team(i, 100 + 10 * i) for i in range(1, 8)]
        plan = contest19.plan_scrims(ladder, 4, 4, 3)
        self.assertEqual([(t['id'], r) for t, r in plan], [(5, True), (3, False), (6, True), (2, False)])
        plan = contest19.plan_scrims(ladder, 4, 6, 3, waiting_ids={5})
        self.assertEqual([(t['id'], r) for t, r in plan], [(6, True), (3, False), (7, True), (2, False), (1, False)])
        self.assertEqual([t['id'] for t, r in contest19.plan_scrims(ladder, 7, 2, 3)], [6, 5])
        self.assertEqual(contest19.plan_scrims(ladder, 99, 3, 3), [])

    def test_named(self):
        ladder = [team(i, 100 + 10 * i) for i in range(1, 8)]
        ladder[0]['rating'] = None   # never played
        got = contest19.named(ladder, 4, [ladder[5]['name'], ladder[0]['name']])
        self.assertEqual([(t['id'], r) for t, r in got], [(6, True), (1, False)])   # ranked only upward
        with self.assertRaises(SystemExit):
            contest19.named(ladder, 4, ['no such team'])

    def test_panelsim(self):
        prior = [('o', 'm1', 'red', 1), ('o', 'm1', 'red', 0), ('o', 'm1', 'blue', 0), ('o', 'm2', 'red', 1)]
        cells = panelsim.truth(prior)
        # Both sides of every (opponent, map), with the pool's games on that side; m2 blue has none.
        self.assertEqual(sorted((c, n) for c, (q, n) in cells.items()),
                         [(('o', 'm1', 'blue'), 1), (('o', 'm1', 'red'), 2), (('o', 'm2', 'blue'), 0), (('o', 'm2', 'red'), 1)])
        rates = [.2, .5, .8]
        s = panelsim.shift_for(rates, 0.3)
        self.assertAlmostEqual(sum(1 / (1 + math.exp(-(math.log(p / (1 - p)) + s))) for p in rates) - sum(rates), 0.3, 6)
        rnd = random.Random(1)
        self.assertEqual(panelsim.trial(cells, -12, 'both', rnd), ('reject', 1))   # loses everything: block 1
        self.assertEqual(panelsim.trial(cells, 12, 'both', rnd), ('accept', 3))    # wins all: 8 games stay below z 2
        (d, acc, blocks), = panelsim.simulate(prior, [0], 50, 'mixed')
        self.assertTrue(0 <= acc <= 1 and 1 <= blocks <= 3)

    def test_split_order(self):
        self.assertEqual([contest19.split_order(s) for s in ('a~b@+', 'a~b@-', 'a~b', 'x@')],
                         [('a~b', '+'), ('a~b', '-'), ('a~b', '?'), ('x@', '?')])

    def test_opponent(self):
        m = {'participants': [{'team': 1, 'score': 2}, {'team': 2, 'score': 1}]}
        self.assertEqual(contest19.opponent(m, 2), ({'team': 2, 'score': 1}, {'team': 1, 'score': 2}))
        self.assertEqual(contest19.opponent({}, 1), (None, None))


class Compare(unittest.TestCase):
    def test_blocks_cell_by_cell(self):
        root = tempfile.mkdtemp(dir=TMP)
        def match(i, games):
            os.makedirs(os.path.join(root, str(i)))
            with open(os.path.join(root, str(i), 'match.json'), 'w') as f:
                json.dump({'games': [{'red_team': r, 'blue_team': b, 'map': m, 'winner_team': w, 'rounds': 1000,
                                      'reason': 'health'} for r, b, m, w in games]}, f)
        us = contest19.TEAM
        match(10, [(us, 'X', 'seed-1', us), ('X', us, 'seed-2', 'X'), (us, 'X', 'seed-3', 'X')])
        match(11, [(us, 'Y', 'seed-4', us)])
        match(20, [('X', us, 'seed-1', 'X'), (us, 'X', 'seed-2', us), ('X', us, 'seed-3', us)])
        self.assertEqual(contest19.block_ids('10-11,13'), [10, 11, 13])
        ctrl, miss = contest19.block_cells([10, 11], root)
        cand, miss2 = contest19.block_cells([20, 21], root)
        self.assertEqual((miss, miss2), ([], [21]))
        self.assertEqual(ctrl[('X', 'seed-2')][:2], (False, 'blue'))
        rows, g, l, t = contest19.compare_blocks(ctrl, cand)
        self.assertEqual([r[3] for r in rows], ['-', '+', '+', ''])
        self.assertEqual((g, l), (2, 1))
        self.assertAlmostEqual(t, 1 / 3 ** 0.5)
        self.assertEqual(rows[3][2], None)                      # seed-4 only in the control
        self.assertEqual(contest19.compare_blocks({}, {})[1:], (0, 0, 0.0))

    def test_pool_side_blind_and_side_aware_z(self):
        root = tempfile.mkdtemp(dir=TMP)
        us = contest19.TEAM
        def match(i, games):                  # games: (map, our side, won)
            os.makedirs(os.path.join(root, str(i)))
            with open(os.path.join(root, str(i), 'match.json'), 'w') as f:
                json.dump({'games': [{'red_team': us if s == 'red' else 'X', 'blue_team': 'X' if s == 'red' else us,
                                      'map': m, 'rounds': 1000, 'reason': 'health', 'winner_team': us if w else 'X'}
                                     for m, s, w in games]}, f)
        match(10, [('seed-1', 'red', 1), ('seed-2', 'blue', 0), ('seed-3', 'red', 0)])     # control
        match(30, [('seed-1', 'blue', 1), ('seed-2', 'red', 1), ('seed-3', 'blue', 0)])    # pool
        match(20, [('seed-1', 'red', 1), ('seed-2', 'blue', 1), ('seed-3', 'red', 1)])     # candidate
        match(21, [('seed-1', 'red', 1), ('seed-2', 'blue', 1)])                           # candidate; 22 still playing
        pool = os.path.join(root, 'pool')
        with open(pool, 'w') as f:
            f.write('30\n# 40 left out\n20  # a candidate never scores against itself\n')
        run = lambda *a: subprocess.run([os.path.join(REPO, 'tools', 'panel_pool.sh'), *a], capture_output=True,
                                        text=True, env=dict(os.environ, GALAXY19_REPLAYS=root))
        # side-blind p = (w + .5) / 3: 5/6, 1/2, 1/6; E 1.5, z = 1.5 / sqrt(.5278). Side-aware, each side 1 game:
        # (w_s + 2p) / 3 = 8/9, 1/3, 1/9; E 1.33, z = 1.67 / sqrt(.4198)
        r = run('10', pool, '20')
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn('~ cand wins 3 of 3, pooled expectation 1.5, z 2.06', r.stdout)
        self.assertIn('~ side-aware (k 2): expectation 1.3, z 2.57', r.stdout)
        self.assertRegex(r.stdout, r'X +seed-3 +red +pool  0/2  red  0/1   cand 1/1  <- won a rarely-won cell')
        # --studied: seed-3 (q 1/9) apart from seed-1 red (8/9) and seed-2 blue (1/3)
        r = run('--studied', 'X:seed-3', '10', pool, '20')
        self.assertIn('~ studied cells: wins 1 of 1, side-aware expectation 0.1, z 2.83', r.stdout)
        self.assertIn('~ other cells: wins 2 of 2, side-aware expectation 1.2, z 1.37', r.stdout)
        r = run('10', pool, '21-22')
        self.assertEqual(r.returncode, 3)
        self.assertIn('PARTIAL: matches not finished or not downloaded: [22]', r.stdout)
        self.assertNotIn('z ', r.stdout)
        r = run('--partial', '10', pool, '21-22')     # block 20 now pools: p 3.5/4, 2.5/4; red 2/2, blue 1/2
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn('~ cand wins 2 of 2, pooled expectation 1.5, z 0.85', r.stdout)
        self.assertIn('~ side-aware (k 2): expectation 1.5, z 0.91', r.stdout)
        rows, s = contest19.pool_score([], [('X', 'seed-9', 'red', 1)])
        self.assertEqual((rows[0][-2:], s['side'][2]), ((0.5, 0.5), 0.5))       # no history: p = q = .5
        self.assertIn('~ side-aware effect: +inf Elo (95% -335 to +inf)', r.stdout)   # 2 of 2: no upper end
        # effect: two cells at q .5, one win of two: no shift, a symmetric interval where (1 - 2s) / sqrt(2s(1 - s))
        # = 1.96 (s = sigma(d)); a single loss at q .5: the estimate is -inf.
        rows = [('X', 'm1', 'red', 0, 0, 0, 0, 1, 1, .5, .5), ('X', 'm2', 'red', 0, 0, 0, 0, 0, 1, .5, .5)]
        d, lo, hi = contest19.effect(rows)
        self.assertAlmostEqual(d, 0, places=6)
        self.assertAlmostEqual(lo, -hi, places=6)
        s = 1 / (1 + math.exp(hi / (400 / math.log(10))))
        self.assertAlmostEqual((1 - 2 * s) / math.sqrt(2 * s * (1 - s)), 1.96, places=6)
        self.assertEqual(contest19.effect(rows[1:])[0], -math.inf)


class Client(unittest.TestCase):
    def test_neighbours(self):
        ladder = [team(1, 100), team(2, 100), team(3, 105), team(4, 95), team(5, None), team(6, 200, status='S')]
        above, below = cl.neighbours(ladder, 1, 3)
        self.assertEqual([t['id'] for t in above], [2, 3])
        self.assertEqual([t['id'] for t in below], [4])
        self.assertEqual(cl.neighbours(ladder, 5, 3), ([], []))

    def test_team_name(self):
        self.assertEqual(cl.team_name('abc'), 'abc')
        self.assertEqual(cl.team_name('a bé'), 'a_b_')
        long_a, long_b = cl.team_name('y' * 50), cl.team_name('y' * 49 + 'z')
        self.assertEqual(len(long_a), 32)
        self.assertNotEqual(long_a, long_b)


class Maps(unittest.TestCase):
    def test_pick_stratified_and_stable(self):
        rows = []
        for s in range(1, 200):
            rows.append({'seed': str(s), 'valid': '1' if s % 7 else '0', 'size': str(32 + s % 33),
                         'castles': str(1 + s % 3), 'sym': 'H' if s % 2 else 'V'})
        a, b = mp.pick(rows, 20), mp.pick(list(reversed(rows)), 20)
        self.assertEqual(a, b)
        self.assertEqual(len(set(a)), 20)
        self.assertTrue(all(s % 7 for s in a))
        self.assertEqual(len({(r['sym'], r['castles']) for r in rows if int(r['seed']) in a[:6]}), 6)

    def test_maps_txt(self):
        with open(os.path.join(GALAXY, 'maps.txt')) as fh:
            names = [l.split('#')[0].strip() for l in fh]
        names = [n for n in names if n]
        self.assertGreaterEqual(len(names), 10)
        saturn.parse_maps(names)


if __name__ == '__main__':
    unittest.main()
