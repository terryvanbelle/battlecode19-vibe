#!/usr/bin/env python3
"""The field on the bc19 replica: the starter bot and the external 2019 bots as ordinary contestant teams, and their
scrimmages in spare VM capacity. Every action goes through the site's public API as the team's own user
(tools/galaxy19/client.py). Standard library only. Re-runnable: a step already done is skipped. Our own team (vibe19)
is not handled here: tools/galaxy19/contest19.py submits and plays for it.

  python3 tools/galaxy19/field.py plan                 the entrants seed would register (no network)
  python3 tools/galaxy19/field.py seed [--only NAME]   register + upload: team "bc19-starter" (bots/example) and one
                                                       team per compiled external bot (below). A team whose uploaded
                                                       bot is unchanged (content hash) is not re-uploaded.
  python3 tools/galaxy19/field.py status               one line per team: rating, latest submission status
  python3 tools/galaxy19/field.py activity [--once] [--poll 60] [--low 2]
        spare-cycle play (bc19-galaxy-activity.service): while fewer than --low matches wait in the queue, a random
        field team challenges a team near its rating: one of the 3 active teams rated closest at or above it, as a
        RANKED request (galaxy's rule: ranked only upward; 3 random maps chosen by galaxy, alternating order); the top
        team instead challenges one of the 3 closest below it, unranked, on 3 random maps. Any team can be the
        opponent, ours included. A 429 (hourly limit) rests the challenger for an hour, a 409 for 10 minutes.
        saturn runs at most GALAXY_EXECUTE_SLOTS (4) games at once whatever the queue holds.

External bots: compiled by tools/bench/compile_field.py into $BENCH_ROOT/compiled/<name>/bot.js (one JavaScript
bundle each; Java/Python were transpiled locally). The roster is tools/bench/roster.tsv (compile == ok and smoke not
'crash'), else $BENCH_ROOT/compile.tsv (status == ok). Their source is never opened here; a bundle is only zipped.
"""
import argparse
import csv
import os
import random
import signal
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.environ.get('GALAXY19_REPO') or os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import client as cl  # noqa: E402

BENCH_ROOT = os.environ.get('BENCH_ROOT', os.path.expanduser('~/projects/vibe/bc19-benchmarks'))
STARTER_TEAM = 'bc19-starter'
OUR_TEAMS = ('vibe19',)            # never a challenger here (contest19.py plays for it)


def log(*a):
    print(time.strftime('%Y-%m-%d %H:%M:%S'), *a, flush=True)


def _tsv(path):
    if not os.path.exists(path):
        return None
    with open(path) as fh:
        return list(csv.DictReader(fh, delimiter='\t'))


def read_field(repo=REPO, bench=BENCH_ROOT):
    """External entrants: [{'team', 'entrant', 'path', 'note'}]; path None when not usable."""
    roster = _tsv(os.path.join(repo, 'tools', 'bench', 'roster.tsv'))
    rows = []
    if roster is not None:
        for r in roster:
            name = (r.get('name') or '').strip()
            if not name:
                continue
            bad = (r.get('compile') or '').strip() != 'ok' and 'compile ' + (r.get('compile') or '-')
            bad = bad or ((r.get('smoke') or '').strip() == 'crash' and 'smoke crash')
            rows.append((name, bad or ''))
    else:
        for r in _tsv(os.path.join(bench, 'compile.tsv')) or []:
            name = (r.get('name') or '').strip()
            if name:
                rows.append((name, '' if (r.get('status') or '').strip() == 'ok' else 'compile ' + (r.get('status') or '-')))
    out = []
    root = os.path.abspath(os.path.join(bench, 'compiled'))
    for name, bad in rows:
        p = os.path.normpath(os.path.join(root, name, 'bot.js'))
        note = bad
        if not note and not (p.startswith(root + os.sep) and os.path.isfile(p)):
            note = 'no compiled bundle'
        out.append({'team': cl.team_name(name), 'entrant': name, 'path': None if note else p, 'note': note})
    return out


def entrants(only=None, repo=REPO, bench=BENCH_ROOT):
    rows = [{'team': STARTER_TEAM, 'entrant': 'example', 'path': os.path.join(repo, 'bots', 'example'), 'note': ''}]
    rows += [r for r in read_field(repo, bench) if r['team'] not in OUR_TEAMS and r['team'] != STARTER_TEAM]
    if only:
        rows = [r for r in rows if r['team'] == only or r['entrant'] == only]
    return rows


def seed(c, acc, rows):
    save = lambda: cl.save_accounts(acc)  # noqa: E731
    done = 0
    for r in rows:
        if not r['path']:
            log(f'skip {r["entrant"]}: {r["note"]}')
            continue
        try:
            about = 'The Battlecode 2019 starter bot.' if r['team'] == STARTER_TEAM else f'{r["entrant"]}: a Battlecode 2019 bot.'
            s = cl.ensure_team(c, acc, r['team'], about, save)
            _, digest = cl.bot_zip(r['path'])
            a = acc[r['team']]
            subs = s.pages(f'/api/compete/{c.episode}/submission/', limit=1)
            pending = any(x['status'] not in cl.TERMINAL for x in subs)
            if a.get('digest') == digest and (pending or any(x['accepted'] for x in subs)):
                continue
            x = cl.submit(s, r['path'], r['entrant'], c.episode)
            a['digest'], a['entrant'] = digest, r['entrant']
            a.setdefault('submissions', []).append(x['id'])
            save()
            done += 1
            log(f'{r["team"]}: uploaded submission {x["id"]} ({r["entrant"]}, {digest})')
        except cl.ApiError as e:
            log(f'{r["team"]}: API error {e}')
    return done


def status(c, acc):
    ladder = {t['id']: t for t in cl.rankings(c)}
    for team, a in sorted(acc.items()):
        if not a.get('team_id'):
            continue
        t = ladder.get(a['team_id'], {})
        try:
            subs = cl.Session(c, a['user'], a['password']).pages(f'/api/compete/{c.episode}/submission/', limit=1)
        except cl.ApiError as e:
            subs = []
            log(f'{team}: {e}')
        last = subs[0] if subs else {}
        r = t.get('rating')
        print(f'{team:32} id {a["team_id"]:>4} rating {"-" if r is None else f"{r:.0f}":>6} '
              f'latest submission {last.get("id", "-")} {last.get("status", "-")} accepted={last.get("accepted", "-")}')


# ---------------------------------------------------------------- spare-cycle play
def queue_backlog(c, pages=5):
    """Matches not started yet or retrying (the public match list, newest first)."""
    n = 0
    for page in range(1, pages + 1):
        r = c.request('GET', f'/api/compete/{c.episode}/match/?page={page}')
        ms = r.get('results', [])
        n += sum(1 for m in ms if m['status'] in cl.WAITING)
        if not r.get('next'):
            break
    return n


def pick_challenge(ladder, ids, rnd, band=3):
    """(challenger name, opponent team dict, ranked) or None. ids: {name: team id} of the teams that may challenge
    now. The challenger is uniform over them; the opponent is one of the `band` active teams rated closest at or above
    it (ranked), or, for a team with nobody above, one of the `band` closest below (unranked)."""
    active = {t['id'] for t in ladder if t['active'] and t['status'] == 'R'}
    pool = sorted(n for n, i in ids.items() if i in active)
    if not pool:
        return None
    ch = rnd.choice(pool)
    above, below = cl.neighbours(ladder, ids[ch], band)
    if above:
        return ch, rnd.choice(above), True
    if below:
        return ch, rnd.choice(below), False
    return None


def activity(c, acc, poll=60, once=False, seed_=None, n_maps=3, low=2):
    rnd = random.Random(seed_)
    ids = {t: a['team_id'] for t, a in acc.items() if a.get('team_id') and t not in OUR_TEAMS}
    sess = {t: cl.Session(c, acc[t]['user'], acc[t]['password']) for t in ids}
    rest, stop = {}, {'now': False}

    def on_signal(signum, frame):
        stop['now'] = True
    signal.signal(signal.SIGTERM, on_signal)
    signal.signal(signal.SIGINT, on_signal)
    maps = cl.public_maps(c)
    made = 0
    log(f'activity: {len(ids)} field teams, keep {low} match(es) waiting, poll {poll}s')
    while not stop['now']:
        try:
            want = low - queue_backlog(c)
            if want > 0:
                ladder = cl.rankings(c)
                for _ in range(want):
                    now = time.time()
                    choice = pick_challenge(ladder, {n: i for n, i in ids.items() if rest.get(n, 0) <= now}, rnd)
                    if not choice:
                        break
                    name, opp, ranked = choice
                    try:
                        r = cl.request(sess[name], opp['id'], ranked, [] if ranked else rnd.sample(maps, n_maps), '?',
                                       c.episode)
                        made += 1
                        log(f'request {r["id"]}: {name} -> {opp["name"]} ({"ranked" if ranked else "unranked"})')
                    except cl.ApiError as e:
                        rest[name] = time.time() + (3600 if e.code == 429 else 600)
                        log(f'refused: {name} -> {opp["name"]}: {e}')
        except cl.ApiError as e:
            log(f'API error: {e}')
        except Exception as e:                  # a transient failure must not end the loop
            log(f'error: {type(e).__name__}: {e}')
            if once:
                raise
        if once:
            break
        for _ in range(poll):
            if stop['now']:
                break
            time.sleep(1)
    return made


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--site', default=None)
    sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('plan')
    p = sub.add_parser('seed'); p.add_argument('--only')
    sub.add_parser('status')
    p = sub.add_parser('activity'); p.add_argument('--once', action='store_true')
    p.add_argument('--poll', type=int, default=60); p.add_argument('--low', type=int, default=2)
    a = ap.parse_args(argv)
    if a.cmd == 'plan':
        rows = entrants()
        for r in rows:
            print(f'{r["team"]:32} {r["entrant"]:40} {r["path"] or "-"} {r["note"]}')
        print(f'{len(rows)} entrants ({sum(1 for r in rows if r["path"])} uploadable)')
        return 0
    c = cl.Client(a.site)
    acc = cl.load_accounts()
    if a.cmd == 'seed':
        n = seed(c, acc, entrants(a.only))
        log(f'seed: {n} upload(s)')
    elif a.cmd == 'status':
        status(c, acc)
    elif a.cmd == 'activity':
        activity(c, acc, a.poll, a.once, low=a.low)
    return 0


if __name__ == '__main__':
    sys.exit(main())
