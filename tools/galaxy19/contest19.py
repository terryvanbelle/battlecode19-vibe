#!/usr/bin/env python3
"""Our team (vibe19) as a contestant on the bc19 replica, through the site's public API only (tools/galaxy19/client.py),
as a team on the official site would act. Standard library only; run on the driver (or the VM).

  python3 tools/galaxy19/contest19.py register              sign up user vibe19 + team vibe19 (auto-accept on); writes
                                                           ~/.bc19-galaxy-team (line 1 user, line 2 password; mode 600)
  python3 tools/galaxy19/contest19.py submit [BOT] [-m TEXT] [--no-wait]
        bundle BOT (default src/bot) with tools/compile_bot.js (local, offline) and upload the bundle; waits for the
        replica's compile (accepted / rejected) unless --no-wait
  python3 tools/galaxy19/contest19.py ladder               rankings, our team marked
  python3 tools/galaxy19/contest19.py scrim [--n 1] [--band 3] [--maps 3] [--vs NAME,...] [--dry-run]
        request N scrimmages against teams rated just above us (ranked: galaxy picks 3 random maps, alternating
        order) and just below us (unranked on --maps random maps: galaxy refuses ranked requests downward),
        alternating above/below, nearest first; skips opponents we already have a match waiting against.
        --vs: one scrimmage against each named team instead (exact name or a unique substring); NAME@+ plays us red
        in every game of it, NAME@- blue (galaxy's player order; otherwise '?': sides alternate from a random start)
        --panel FILE: unranked, on the maps FILE holds for that opponent; an opponent not in FILE gets a random draw
        that is written there, so a candidate's panel and the incumbent's control play the same maps in the same order
  python3 tools/galaxy19/contest19.py matches [--pages 1] [--all]   our scrimmages (or everyone's), newest first
  python3 tools/galaxy19/contest19.py fetch [ID ...] [--new] [--out DIR]
        download match archives and unpack their .bc19 replays + match.json into DIR/<id>/ (default
        ~/projects/vibe/bc19-galaxy-replays); --new = every finished match of ours not downloaded yet
  python3 tools/galaxy19/contest19.py results [--pages 3]  per-opponent W-L over our finished matches (games)
  python3 tools/galaxy19/contest19.py compare CTRL CAND [--dir DIR]
        two downloaded panel blocks (match ids, e.g. 420-425 and 432-437) cell by cell (opponent, map): our result,
        side, rounds, reason in each; gained / lost / net and t = net / sqrt(D). Local files only
  python3 tools/galaxy19/contest19.py pool [--partial] [--k 2] CONTROL POOLFILE BLOCK [BLOCK...]   (tools/panel_pool.sh)
        candidate blocks scored against the pooled history of v8-family blocks (CONTROL + POOLFILE's blocks, one per
        line, '#' comments; a block also named as a candidate is left out of the pool): wins - E over sqrt(V), side-
        blind (cell = opponent, map) and side-aware (cell = opponent, map, our side). A candidate block with a match
        not downloaded (finished) is refused (exit 3) unless --partial. Local files only
"""
import argparse
import json
import math
import os
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import client as cl  # noqa: E402

TEAM = os.environ.get('GALAXY19_TEAM', 'vibe19')
TEAM_FILE = os.path.expanduser(os.environ.get('GALAXY19_TEAM_FILE', '~/.bc19-galaxy-team'))
REPLAYS = os.path.expanduser(os.environ.get('GALAXY19_REPLAYS', '~/projects/vibe/bc19-galaxy-replays'))
ABOUT = 'battlecode19-vibe (our team).'


def write_team_file(acc, path=TEAM_FILE):
    a = acc[TEAM]
    fd = os.open(path + '.tmp', os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, 'w') as fh:
        fh.write(f'{a["user"]}\n{a["password"]}\n')
    os.replace(path + '.tmp', path)


def bundle(bot, out):
    r = subprocess.run(['node', os.path.join(REPO, 'tools', 'compile_bot.js'), bot, '-o', out, '--quiet'],
                       capture_output=True, text=True, timeout=900)
    if r.returncode != 0 or not os.path.isfile(out):
        raise SystemExit(f'compile_bot.js failed for {bot}:\n{(r.stderr or r.stdout)[-2000:]}')


def plan_scrims(ladder, my_id, n, band, waiting_ids=()):
    """[(team, ranked)] for n requests: above (ranked) and below (unranked) alternating, nearest first, skipping
    teams in waiting_ids; when one side runs out the other continues."""
    above, below = cl.neighbours(ladder, my_id, band)
    above = [t for t in above if t['id'] not in waiting_ids]
    below = [t for t in below if t['id'] not in waiting_ids]
    out, i = [], 0
    while len(out) < n and (above or below):
        side = above if (i % 2 == 0 and above) or not below else below
        t = side.pop(0)
        out.append((t, side is above))
        i += 1
    return out


def named(ladder, my_id, names):
    """[(team, ranked)] for the teams named (exact name, else a unique substring); ranked only when rated above us."""
    me = next(t for t in ladder if t['id'] == my_id)
    mine = me['rating'] or 0
    out = []
    for n in names:
        hits = [t for t in ladder if t['name'] == n] or [t for t in ladder if n in t['name'] and t['id'] != my_id]
        if len(hits) != 1:
            raise SystemExit(f'--vs {n!r}: {len(hits)} teams match')
        t = hits[0]
        out.append((t, (t['rating'] or 0) > mine))
    return out


def split_order(spec):
    """'NAME@+' -> ('NAME', '+'), 'NAME@-' -> ('NAME', '-'), 'NAME' -> ('NAME', '?')."""
    return (spec[:-2], spec[-1]) if spec[-2:] in ('@+', '@-') else (spec, '?')


def panel_maps(panel, name, maps, n, rnd):
    """The maps a panel plays against `name`: the recorded draw, else a random draw of n, recorded."""
    if name not in panel:
        panel[name] = rnd.sample(maps, n)
    return panel[name]


def block_ids(spec):
    """'420-425' or '420,421,430-431' -> [420, ..., 425]."""
    out = []
    for part in spec.split(','):
        a, _, b = part.partition('-')
        out += range(int(a), int(b or a) + 1)
    return out


def block_cells(ids, root=REPLAYS, team=TEAM):
    """({(opponent, map): (won, side, rounds, reason, match id)}, [ids not downloaded]) over the matches' games."""
    cells, missing = {}, []
    for i in ids:
        f = os.path.join(root, str(i), 'match.json')
        if not os.path.exists(f):
            missing.append(i)
            continue
        with open(f) as fh:
            games = json.load(fh)['games']
        for g in games:
            side = 'red' if g['red_team'] == team else 'blue'
            opp = g['blue_team'] if side == 'red' else g['red_team']
            cells[(opp, g['map'])] = (g['winner_team'] == team, side, g['rounds'], g['reason'], i)
    return cells, missing


def block_cells_all(ids, root=REPLAYS, team=TEAM):
    """Every game of the matches as a cell (opponent, map, our side, won), so a block that plays a map on both sides
    keeps both."""
    out = []
    for i in ids:
        f = os.path.join(root, str(i), 'match.json')
        if os.path.exists(f):
            with open(f) as fh:
                gs = json.load(fh)['games']
            for g in gs:
                side = 'red' if g['red_team'] == team else 'blue'
                out.append((g['blue_team'] if side == 'red' else g['red_team'], g['map'], side, int(g['winner_team'] == team)))
    return out


def compare_blocks(ctrl, cand):
    """Cells of both blocks in order, each (key, ctrl cell or None, cand cell or None, '+' / '-' / ''); then gained,
    lost and t = net / sqrt(gained + lost) (0 when no cell differs)."""
    rows, gained, lost = [], 0, 0
    for k in sorted(set(ctrl) | set(cand)):
        a, b = ctrl.get(k), cand.get(k)
        mark = ''
        if a and b and a[0] != b[0]:
            mark = '+' if b[0] else '-'
            gained += b[0]
            lost += a[0]
        rows.append((k, a, b, mark))
    d = gained + lost
    return rows, gained, lost, (gained - lost) / d ** 0.5 if d else 0.0


def compare_cmd(a):
    ctrl, m1 = block_cells(block_ids(a.ctrl), a.dir)
    cand, m2 = block_cells(block_ids(a.cand), a.dir)
    if m1 or m2:
        print(f'not downloaded (contest19.py fetch): {m1 + m2}')
    cell = lambda c: f"{'W' if c[0] else 'L'} {c[1]:4} {c[2]:4} {c[3]:7} m{c[4]}" if c else '-'
    rows, g, l, t = compare_blocks(ctrl, cand)
    for (opp, mp), x, y, mark in rows:
        print(f'{opp[:32]:32} {mp:10} ctrl {cell(x):27} cand {cell(y):27} {mark}')
    print(f'gained {g} lost {l} D {g + l} net {g - l} t {t:.2f}; ctrl wins {sum(c[0] for c in ctrl.values())}/{len(ctrl)}, '
          f'cand wins {sum(c[0] for c in cand.values())}/{len(cand)}')
    return 0


def pool_score(prior, cand, k=2.0):
    """Candidate cells scored against prior blocks' cells; each cell (opponent, map, side, won). Side-blind p per
    (opponent, map) = (w + .5) / (n + 1); side-aware p per (opponent, map, side) = (w_s + k p) / (n_s + k), the side's
    own record shrunk toward the side-blind p while it is thin (red moves first: in v8's blocks it wins about 13 points
    more often within a cell, and '?' scrims drew each block's sides at random). Returns rows (opponent, map, side, w, n, w_s, n_s,
    cand wins, cand games, p, p_s) and {'blind': (W, N, E, z), 'side': (W, N, E, z)}."""
    def tally(cells, key):
        t = {}
        for c in cells:
            x = t.setdefault(key(c), [0, 0])
            x[0] += c[3]
            x[1] += 1
        return t
    cell, side = (lambda c: c[:2]), (lambda c: c[:3])
    pb, ps, cs = tally(prior, cell), tally(prior, side), tally(cand, side)
    rows, acc = [], {'blind': [0, 0, 0.0, 0.0], 'side': [0, 0, 0.0, 0.0]}
    for key in sorted(cs):
        cw, cn = cs[key]
        w, n = pb.get(key[:2], (0, 0))
        ws, ns = ps.get(key, (0, 0))
        p = (w + 0.5) / (n + 1)
        q = (ws + k * p) / (ns + k)
        rows.append((*key, w, n, ws, ns, cw, cn, p, q))
        for name, x in (('blind', p), ('side', q)):
            a = acc[name]
            a[0] += cw; a[1] += cn; a[2] += cn * x; a[3] += cn * x * (1 - x)
    out = {name: (W, N, E, (W - E) / V ** 0.5 if V > 0 else 0.0) for name, (W, N, E, V) in acc.items()}
    return rows, out


def effect(rows, zc=1.96):
    """The candidate's effect as one logit shift d over the pool's side-aware cell rates q (logit p = logit q + d: a
    Bradley-Terry gain with every (opponent, map, side) cell its own opponent), on the Elo scale (400 / ln 10 a logit).
    The estimate solves sum cn p = wins; the 95% interval inverts the side-aware score z at +-zc (that z is this
    model's score test at d = 0). Returns (elo, lo, hi); an end is +-inf when the wins sit at 0 or N."""
    cells = [(cw, cn, math.log(min(max(q, 1e-9), 1 - 1e-9) / (1 - min(max(q, 1e-9), 1 - 1e-9))))
             for *_, cw, cn, p, q in rows if cn]
    W, N = sum(c[0] for c in cells), sum(c[1] for c in cells)

    def score(d):   # (wins - expected) / sd at shift d
        ps = [(cn, 1 / (1 + math.exp(-(l + d)))) for _, cn, l in cells]
        v = sum(cn * x * (1 - x) for cn, x in ps)
        return (W - sum(cn * x for cn, x in ps)) / v ** 0.5 if v > 0 else 0.0

    def solve(t, lim=12.0):   # the shift where score = t (score falls as d grows); +-inf past +-lim
        if score(-lim) < t:
            return -math.inf
        if score(lim) > t:
            return math.inf
        lo, hi = -lim, lim
        for _ in range(60):
            mid = (lo + hi) / 2
            lo, hi = (mid, hi) if score(mid) > t else (lo, mid)
        return (lo + hi) / 2
    if not N:
        return 0.0, -math.inf, math.inf
    elo = 400 / math.log(10)
    return tuple(x * elo for x in (solve(0.0), solve(zc), solve(-zc)))


def pool_cmd(a):
    games = lambda spec: block_cells_all(block_ids(spec), a.dir)
    missing = lambda spec: [i for i in block_ids(spec) if not os.path.exists(os.path.join(a.dir, str(i), 'match.json'))]
    prior, miss = games(a.ctrl), missing(a.ctrl)
    with open(a.poolfile) as f:
        lines = f.read().splitlines()
    for line in lines:
        b = line.split('#')[0].strip()
        if b and b not in a.blocks:
            prior += games(b)
            miss += missing(b)
    if miss:
        print(f'~ pool matches not downloaded: {miss}')
    todo = [i for b in a.blocks for i in missing(b)]
    if todo and not a.partial:
        print(f'~ PARTIAL: matches not finished or not downloaded: {todo}; refused (--partial scores the rest)')
        return 3
    cand = [g for b in a.blocks for g in games(b)]
    rows, s = pool_score(prior, cand, a.k)
    for opp, mp, sd, w, n, ws, ns, cw, cn, p, q in rows:
        flag = '  <- won a rarely-won cell' if cw and q < 0.25 else '  <- lost a usually-won cell' if cw < cn and q > 0.75 else ''
        print(f'{opp[:40]:40} {mp:10} {sd:4}  pool {w:2}/{n:<2} {sd} {ws:2}/{ns:<2}  cand {cw}/{cn}{flag}')
    W, N, E, z = s['blind']
    print(f'~ cand wins {W} of {N}, pooled expectation {E:.1f}, z {z:.2f}')
    W, N, E, z = s['side']
    print(f'~ side-aware (k {a.k:g}): expectation {E:.1f}, z {z:.2f}')
    d, lo, hi = effect(rows)
    print(f'~ side-aware effect: {d:+.0f} Elo (95% {lo:+.0f} to {hi:+.0f}): one logit shift over the pool\'s cell rates')
    if a.studied:
        # TRAINING_ALGORITHM §4: a candidate designed from some cells must also hold its own (z >= 0) on the others.
        marks = [x.split(':', 1) for x in a.studied.split(',')]
        hit = lambda g: any(g[0].startswith(o) and g[1] == m for o, m in marks)
        for name, part in (('studied', [g for g in cand if hit(g)]), ('other', [g for g in cand if not hit(g)])):
            W, N, E, z = pool_score(prior, part, a.k)[1]['side']
            print(f'~ {name} cells: wins {W} of {N}, side-aware expectation {E:.1f}, z {z:.2f}')
    return 0


def opponent(m, my_id):
    ps = m.get('participants') or []
    me = next((p for p in ps if p.get('team') == my_id), None)
    other = next((p for p in ps if p.get('team') != my_id), None)
    return me, other


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--site', default=None)
    sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('register')
    p = sub.add_parser('submit'); p.add_argument('bot', nargs='?', default=os.path.join(REPO, 'src', 'bot'))
    p.add_argument('-m', default=''); p.add_argument('--no-wait', action='store_true')
    sub.add_parser('ladder')
    p = sub.add_parser('scrim'); p.add_argument('--n', type=int, default=1); p.add_argument('--band', type=int, default=3)
    p.add_argument('--maps', type=int, default=3); p.add_argument('--dry-run', action='store_true')
    p.add_argument('--vs', default=''); p.add_argument('--panel', default='')
    p = sub.add_parser('matches'); p.add_argument('--pages', type=int, default=1); p.add_argument('--all', action='store_true')
    p = sub.add_parser('fetch'); p.add_argument('ids', type=int, nargs='*'); p.add_argument('--new', action='store_true')
    p.add_argument('--out', default=REPLAYS); p.add_argument('--pages', type=int, default=3)
    p = sub.add_parser('results'); p.add_argument('--pages', type=int, default=3)
    p = sub.add_parser('compare'); p.add_argument('ctrl'); p.add_argument('cand'); p.add_argument('--dir', default=REPLAYS)
    p = sub.add_parser('pool'); p.add_argument('ctrl'); p.add_argument('poolfile'); p.add_argument('blocks', nargs='+')
    p.add_argument('--partial', action='store_true'); p.add_argument('--k', type=float, default=2.0)
    p.add_argument('--dir', default=REPLAYS)
    p.add_argument('--studied', help='OPPONENT_PREFIX:MAP,... the cells the candidate was designed from')
    a = ap.parse_args(argv)
    if a.cmd == 'compare':
        return compare_cmd(a)
    if a.cmd == 'pool':
        return pool_cmd(a)
    c = cl.Client(a.site)
    acc = cl.load_accounts()
    ep = c.episode
    if a.cmd == 'register':
        cl.ensure_team(c, acc, TEAM, ABOUT)
        write_team_file(acc)
        print(f'team {TEAM}: id {acc[TEAM]["team_id"]}, user {acc[TEAM]["user"]} (password in {TEAM_FILE}, line 2)')
        return 0
    s = cl.session(c, acc, TEAM)
    my_id = acc[TEAM]['team_id']
    if a.cmd == 'submit':
        with tempfile.TemporaryDirectory(prefix='bc19-submit-') as d:
            out = os.path.join(d, 'bundle.js')
            if os.path.isdir(a.bot):
                bundle(a.bot, out)
            else:
                out = a.bot
            desc = a.m or os.path.basename(os.path.normpath(a.bot))
            x = cl.submit(s, out, desc, ep)
        print(f'submission {x["id"]} ({x["_digest"]}): {x["status"]}')
        if not a.no_wait:
            x = cl.wait_submission(s, x['id'], ep)
            print(f'submission {x["id"]}: {x["status"]} accepted={x["accepted"]}')
            if not x['accepted']:
                print('\n'.join((x.get('logs') or '').splitlines()[-20:]))
                return 1
    elif a.cmd == 'ladder':
        for i, t in enumerate(cl.rankings(c), 1):
            r = '-' if t['rating'] is None else f'{t["rating"]:.0f}'
            print(f'{i:>3} {r:>6} {t["name"]}{"   <== us" if t["id"] == my_id else ""}'
                  f'{"" if t["active"] else "  (no accepted submission)"}')
    elif a.cmd == 'scrim':
        waiting = set()
        for m in cl.matches(c, my_id, 2):
            if m['status'] in cl.WAITING + ('RUN',):
                _, o = opponent(m, my_id)
                if o:
                    waiting.add(o.get('team'))
        ladder = cl.rankings(c)
        specs = [split_order(v) for v in a.vs.split(',')] if a.vs else []
        plan = named(ladder, my_id, [n for n, _ in specs]) if a.vs else plan_scrims(ladder, my_id, a.n, a.band, waiting)
        orders = [o for _, o in specs] or ['?'] * len(plan)
        if not plan:
            print('no rated opponent near us (or all have a match waiting)')
            return 1
        maps = cl.public_maps(c)
        import random
        rnd = random.Random()
        panel = {}
        if a.panel and os.path.exists(a.panel):
            with open(a.panel) as fh:
                panel = json.load(fh)
        for (t, ranked), order in zip(plan, orders):
            tag = t['name'] + ('' if order == '?' else '@' + order)
            if a.panel:
                ranked, mp = False, panel_maps(panel, t['name'], maps, a.maps, rnd)
            else:
                mp = [] if ranked else rnd.sample(maps, a.maps)
            if a.dry_run:
                print(f'would request {"ranked" if ranked else "unranked"} vs {tag} (rated {t["rating"] or 0:.0f}) {mp}')
                continue
            try:
                r = cl.request(s, t['id'], ranked, mp, order, ep)
                print(f'request {r["id"]}: vs {tag} ({"ranked" if ranked else "unranked"}, rated {t["rating"] or 0:.0f})')
            except cl.ApiError as e:
                print(f'refused: vs {tag}: {e}')
        if a.panel and not a.dry_run:
            with open(a.panel, 'w') as f:
                json.dump(panel, f, indent=1)
    elif a.cmd == 'matches':
        for m in cl.matches(c, None if a.all else my_id, a.pages):
            print(cl.fmt_match(m))
    elif a.cmd == 'fetch':
        # as our team: galaxy shows a match's replay_url only to its participants (and staff)
        ms = [s.api('GET', f'/api/compete/{ep}/match/{i}/') for i in a.ids]
        if a.new:
            ms += [m for m in s.pages(f'/api/compete/{ep}/match/scrimmage/?team_id={my_id}', limit=a.pages)
                   if m['status'] == 'OK!' and not os.path.isdir(os.path.join(a.out, str(m['id'])))]
        for m in ms:
            p = cl.fetch(c, m, a.out, extract=True)
            if p:
                zp = os.path.join(a.out, f'{m["id"]}.zip')
                if os.path.exists(zp):
                    os.unlink(zp)            # the unpacked copy is kept
            print(f'{m["id"]}: {p or "no replay (status " + str(m.get("status")) + ")"}')
    elif a.cmd == 'results':
        rec = {}
        for m in cl.matches(c, my_id, a.pages):
            if m['status'] != 'OK!':
                continue
            me, o = opponent(m, my_id)
            if not me or not o or me.get('score') is None:
                continue
            r = rec.setdefault(o.get('teamname'), [0, 0, 0])
            r[0] += me['score']; r[1] += o['score']; r[2] += 1
        for name, (w, l, n) in sorted(rec.items(), key=lambda kv: -(kv[1][0] - kv[1][1])):
            print(f'{name:32} games {w:>3}-{l:<3} in {n} match(es)')
        print(json.dumps({'opponents': len(rec), 'games_won': sum(r[0] for r in rec.values()),
                          'games_lost': sum(r[1] for r in rec.values())}))
    return 0


if __name__ == '__main__':
    sys.exit(main())
