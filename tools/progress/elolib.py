"""Shared bookkeeping for progress/ (ported from battlecode23-vibe's tools/elolib.py, read through the readroom copy).

progress/games.csv holds one row per game, written by tools/progress/games.py:
  run,seq,teamA,teamB,map,winner,rounds,reason,seed,a_side,time
run 'batch-<dir>/<file>' is a local batch on the VM (tools/batch.js rows; seq = line number), run 'galaxy-<id>' a
replica match (seq = game number). winner is A or B; a_side is teamA's colour (red moves first), blank when unknown;
time is when the game was recorded (UTC; a replica game carries its match's creation time).
A replica match whose archive we cannot download (field vs field: galaxy gives replays only to participants) yields
its games from the participants' scores: map, rounds and seed blank, reason 'score'.

Players: 'us:<name>' an accepted build (bots/ROSTER.tsv names v0, v1, ...), 'cand:<name>' a candidate bundle
(dist/<name>) whose hash is not in the roster, 'spar:<name>' a sparring partner (any other roster entry, e.g. rush),
anything else a field bot under its replica team name (the starter bot is 'bc19-starter' locally too: same code).

Ratings: a batch Bradley-Terry fit over every game at once, on the Elo scale (400 points = 10:1 odds); each build is
its own player. PRIOR virtual wins and as many losses against a 1500 anchor per player keep perfect records finite
and set the level (compare ratings within one fit only). Each pair counts at most PAIR_CAP games (its games and wins
scaled down in proportion; records shown stay raw). In 2019 every game counts: a pairing on the same seed and side
is not reproducible (the engine shuffles robot order without a seed), so no deduplication by map or seed.
"""
import collections
import csv
import math
import operator
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PROGRESS = os.path.join(REPO, 'progress')
GAMES = os.path.join(PROGRESS, 'games.csv')
ROSTER = os.path.join(REPO, 'bots', 'ROSTER.tsv')
CACHE = os.path.expanduser(os.environ.get('PROGRESS_CACHE', '~/projects/vibe/bc19-progress-cache'))
REPLICA_JSON = os.path.join(CACHE, 'replica.json')
VENV_PY = os.path.join(REPO, '.venv-progress', 'bin', 'python')
HDR = ['run', 'seq', 'teamA', 'teamB', 'map', 'winner', 'rounds', 'reason', 'seed', 'a_side', 'time']
SCALE = 400 / math.log(10)
PAIR_CAP = 200
PRIOR = 0.1
OUR_TEAM = 'vibe19'
STARTER = 'bc19-starter'
ACCEPTED = re.compile(r'^v\d+$')


def use_venv(module_file):
    """Re-exec the running script in .venv-progress when matplotlib is missing here and the venv exists."""
    try:
        import matplotlib  # noqa: F401
        return
    except ImportError:
        pass
    if os.path.exists(VENV_PY) and os.path.realpath(sys.prefix) != os.path.realpath(os.path.dirname(os.path.dirname(VENV_PY))):
        os.execv(VENV_PY, [VENV_PY, os.path.abspath(module_file)] + sys.argv[1:])


# ---------------------------------------------------------------- players
def kind(name):
    """'ours' (accepted build), 'cand', 'spar' or 'field'."""
    return {'us': 'ours', 'cand': 'cand', 'spar': 'spar'}.get(name.split(':', 1)[0], 'field') if ':' in name else 'field'


def is_ours(name): return kind(name) == 'ours'
def is_field(name): return kind(name) == 'field'
def build_of(name): return name.split(':', 1)[1] if ':' in name else name


def roster(path=None):
    """[(name, hash)] in roster order ([] when missing)."""
    path = path or ROSTER
    if not os.path.exists(path):
        return []
    with open(path) as fh:
        return [(r['name'], r['hash']) for r in csv.DictReader(fh, delimiter='\t') if r.get('name')]


def roster_player(name):
    return ('us:' if ACCEPTED.match(name) else 'spar:') + name


def accepted_builds(path=None):
    """Accepted builds in acceptance (roster) order, as player names."""
    return [roster_player(n) for n, _ in roster(path) if ACCEPTED.match(n)]


def accepted_via(path=None):
    """{accepted build: the candidate it was accepted as} from roster notes that start with the candidate's name
    ('h167 = v8 + ...'), as player names."""
    path = path or ROSTER
    if not os.path.exists(path):
        return {}
    with open(path) as fh:
        rows = list(csv.DictReader(fh, delimiter='\t'))
    out = {}
    for r in rows:
        m = re.match(r'(h\d+)\b', r.get('note') or '')
        if r.get('name') and ACCEPTED.match(r['name']) and m:
            out[roster_player(r['name'])] = 'cand:' + m.group(1)
    return out


# ---------------------------------------------------------------- games.csv
def load(path=GAMES):
    """Rows of games.csv ([] when missing); rows whose winner is not A or B are skipped with a count on stderr."""
    if not os.path.exists(path):
        return []
    with open(path, newline='') as fh:
        rows = list(csv.DictReader(fh))
    ok = [r for r in rows if r.get('winner') in ('A', 'B')]
    if len(ok) < len(rows):
        print(f'elolib.load: skipped {len(rows) - len(ok)} rows with winner not A|B', file=sys.stderr)
    return ok


def write(rows, path=GAMES):
    tmp = path + '.tmp'
    with open(tmp, 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=HDR, lineterminator='\n')
        w.writeheader()
        for r in rows:
            w.writerow({k: r.get(k, '') for k in HDR})
    os.replace(tmp, path)


def is_local(r): return r['run'].startswith('batch-')
def is_replica(r): return r['run'].startswith('galaxy-')


# ---------------------------------------------------------------- Bradley-Terry
def expected(ra, rb): return 1 / (1 + 10 ** ((rb - ra) / 400))
def _sig(x): return 1 / (1 + math.exp(-x)) if x >= 0 else math.exp(x) / (1 + math.exp(x))
def _logsig(x): return -math.log1p(math.exp(-x)) if x >= 0 else x - math.log1p(math.exp(x))


def _cholesky(A):
    m = len(A); L = [[0.0] * m for _ in range(m)]
    for i in range(m):
        Li = L[i]
        for j in range(i + 1):
            s = A[i][j] - sum(map(operator.mul, Li[:j], L[j][:j]))
            if i == j: Li[i] = math.sqrt(s)
            else: Li[j] = s / L[j][j]
    return L


def _forward(L, b, j0=0):
    y = [0.0] * len(L)
    for i in range(j0, len(L)):
        y[i] = (b[i] - sum(map(operator.mul, L[i][j0:i], y[j0:i]))) / L[i][i]
    return y


def _backward(L, y):
    m = len(L); x = [0.0] * m
    for i in reversed(range(m)):
        x[i] = (y[i] - sum(L[k][i] * x[k] for k in range(i + 1, m))) / L[i][i]
    return x


def fit(rows, prior=PRIOR, iters=100, tol=1e-10, pair_cap=PAIR_CAP):
    """Bradley-Terry MAP fit by Newton's method -> (R, SE, games, wins) keyed by player. SE (Elo points) is the
    standard error of the rating minus the mean rating of all players, from the centred inverse of the penalised
    information matrix. Self-play rows carry no likelihood and are dropped with a warning."""
    if not prior > 0:
        raise ValueError(f'fit: prior must be > 0, got {prior!r}')
    nself = sum(1 for r in rows if r['teamA'] == r['teamB'])
    if nself:
        print(f'elolib.fit: dropped {nself} self-play rows', file=sys.stderr)
        rows = [r for r in rows if r['teamA'] != r['teamB']]
    W = collections.Counter(); games = collections.Counter(); N = collections.defaultdict(collections.Counter)
    Wp = collections.defaultdict(collections.Counter)
    for r in rows:
        a, b = r['teamA'], r['teamB']; win, lose = (a, b) if r['winner'] == 'A' else (b, a)
        W[win] += 1; games[a] += 1; games[b] += 1; N[a][b] += 1; N[b][a] += 1; Wp[win][lose] += 1
    f = lambda n: min(1.0, pair_cap / n) if pair_cap else 1.0
    R = collections.defaultdict(lambda: 1500.0); SE = collections.defaultdict(lambda: float('inf'))
    P = sorted(games); ix = {p: i for i, p in enumerate(P)}; m = len(P)
    if not m:
        return R, SE, games, W
    E = [(ix[p], ix[q], n * f(n), Wp[p][q] * f(n)) for p in P for q, n in N[p].items() if ix[p] < ix[q]]
    w = [0.0] * m
    for i, j, n, wi in E: w[i] += wi; w[j] += n - wi

    def objective(th):
        return (sum(wi * _logsig(th[i] - th[j]) + (n - wi) * _logsig(th[j] - th[i]) for i, j, n, wi in E)
                + prior * sum(_logsig(t) + _logsig(-t) for t in th))

    def info_grad(th):
        g = [w[i] + prior * (1 - 2 * _sig(th[i])) for i in range(m)]
        I = [[0.0] * m for _ in range(m)]
        for i in range(m): s = _sig(th[i]); I[i][i] = 2 * prior * s * (1 - s)
        for i, j, n, wi in E:
            p = _sig(th[i] - th[j]); c = n * p * (1 - p)
            g[i] -= n * p; g[j] -= n * (1 - p); I[i][i] += c; I[j][j] += c; I[i][j] -= c; I[j][i] -= c
        return I, g

    th = [0.0] * m; step = 0.0; done = False
    for _ in range(iters):
        I, g = info_grad(th); L = _cholesky(I); d = _backward(L, _forward(L, g))
        step = max(abs(x) for x in d)
        t, L0 = 1.0, objective(th)
        while t > 1e-9:   # the objective is concave: a short enough step rises
            new = [a + t * b for a, b in zip(th, d)]
            if objective(new) >= L0 - 1e-12 * (1 + abs(L0)): break
            t /= 2
        th = new
        if step < tol: done = True; break
    if not done:
        print(f'elolib.fit: not converged after {iters} iterations (step {step:.2e})', file=sys.stderr)
    L = _cholesky(info_grad(th)[0]); u = _backward(L, _forward(L, [1.0] * m)); tot = sum(u)
    for i, p in enumerate(P):
        e = [0.0] * m; e[i] = 1.0; col = _forward(L, e, i)
        var = sum(x * x for x in col[i:]) - 2 * u[i] / m + tot / (m * m)
        R[p] = 1500 + SCALE * th[i]; SE[p] = SCALE * math.sqrt(max(var, 0.0))
    return R, SE, games, W


def field_score(R, player, field):
    """Expected score of `player` against every bot of `field` (rated bots only), one game each."""
    return sum(expected(R[player], R[b]) for b in field) / len(field) if field else float('nan')


def wilson(w, n, z=1.96):
    if n == 0: return (0.0, 0.0, 0.0)
    p = w / n; d = 1 + z * z / n; c = p + z * z / (2 * n); m = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))
    return (p, (c - m) / d, (c + m) / d)


def records(rows):
    """{(p, q): [wins of p, games]} for every ordered pair that met (both orders present)."""
    out = collections.defaultdict(lambda: [0, 0])
    for r in rows:
        a, b = r['teamA'], r['teamB']
        if a == b: continue
        aw = r['winner'] == 'A'
        out[a, b][0] += aw; out[a, b][1] += 1
        out[b, a][0] += not aw; out[b, a][1] += 1
    return out
