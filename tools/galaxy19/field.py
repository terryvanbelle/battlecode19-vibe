#!/usr/bin/env python3
"""The field on the bc19 replica: our builds and the external 2019 bots as ordinary contestant teams, and their
scrimmages in spare VM capacity. Every action goes through the site's public API as the team's own user
(tools/galaxy19/client.py). Standard library only. Re-runnable: a step already done is skipped.

  python3 tools/galaxy19/field.py plan                 the entrants seed would register (no network)
  python3 tools/galaxy19/field.py seed [--only NAME]   register + upload: teams "vibe" (bots/<VIBE_BOT>, default the
                                                       newest build in bots/ROSTER.tsv, else bots/v0), "example"
                                                       (bots/example), and one team per external bot in
                                                       tools/bench/field.tsv (none yet: nothing to do). A team whose
                                                       uploaded bot is unchanged (content hash) is not re-uploaded.
  python3 tools/galaxy19/field.py status               one line per team: rating, latest submission status
  python3 tools/galaxy19/field.py activity [--once] [--poll 60]
        idle play: when no match waits in the queue (queued/new/retrying), make ONE request: if our team has no match
        waiting or running, it challenges a team rated just above (ranked) or just below (unranked; ranked requests
        to lower-rated teams are refused by galaxy); otherwise a random field team challenges a random other team
        (ranked when the opponent is rated at least as high, else unranked on 3 random maps). Saturn runs at most 2
        games at once, so this never adds load beyond that cap.

External bots: tools/bench/field.tsv (columns name, language, path relative to $BENCH_ROOT, kind dir|bundle ...),
written by tools/bench/roster.py after the security scan. JavaScript entries are uploaded as their directory's .js
files or as the single bundle; Java/Python entries need a prebuilt bundle at $BENCH_ROOT/bundles/<name>.js (made by
our local transpiler) and are skipped until it exists. Their source is never opened here except to zip it.
"""
import argparse
import csv
import os
import random
import signal
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import client as cl  # noqa: E402

BENCH_ROOT = os.environ.get('BENCH_ROOT', os.path.expanduser('~/projects/vibe/bc19-benchmarks'))
FIELD_TSV = os.environ.get('GALAXY19_FIELD_TSV', os.path.join(REPO, 'tools', 'bench', 'field.tsv'))
OUR_TEAM = 'vibe'


def log(*a):
    print(time.strftime('%Y-%m-%d %H:%M:%S'), *a, flush=True)


def newest_build(repo=REPO):
    """The newest build named in bots/ROSTER.tsv that exists as a directory, else 'v0'."""
    best = 'v0'
    try:
        with open(os.path.join(repo, 'bots', 'ROSTER.tsv')) as fh:
            for row in csv.DictReader(fh, delimiter='\t'):
                if row.get('name') and os.path.isdir(os.path.join(repo, 'bots', row['name'])):
                    best = row['name']
    except OSError:
        pass
    return best


def read_field(path=FIELD_TSV, bench=BENCH_ROOT):
    """External entrants: [{'team', 'entrant', 'path', 'language', 'note'}]; path None when not uploadable yet."""
    if not os.path.exists(path):
        return []
    out = []
    with open(path) as fh:
        for row in csv.DictReader(fh, delimiter='\t'):
            name = (row.get('name') or '').strip()
            if not name:
                continue
            lang = (row.get('language') or '').strip().lower()
            p, note = None, ''
            if lang in ('js', 'javascript'):
                cand = os.path.normpath(os.path.join(bench, row.get('path') or ''))
                if os.path.exists(cand) and cand.startswith(os.path.abspath(bench) + os.sep):
                    p = cand
                else:
                    note = 'path missing'
            else:
                b = os.path.join(bench, 'bundles', f'{name}.js')
                if os.path.isfile(b):
                    p = b
                else:
                    note = f'{lang or "?"}: no transpiled bundle yet'
            out.append({'team': cl.team_name(name), 'entrant': name, 'path': p, 'language': lang, 'note': note})
    return out


def entrants(only=None):
    ours = os.environ.get('VIBE_BOT') or newest_build()
    rows = [{'team': OUR_TEAM, 'entrant': f'us:{ours}', 'path': os.path.join(REPO, 'bots', ours), 'language': 'js', 'note': ''},
            {'team': 'example', 'entrant': 'example', 'path': os.path.join(REPO, 'bots', 'example'), 'language': 'js',
             'note': ''}]
    rows += read_field()
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
            about = 'Our team (battlecode19-vibe).' if r['team'] == OUR_TEAM else f'{r["entrant"]}: Battlecode 2019 bot.'
            s = cl.ensure_team(c, acc, r['team'], about, save)
            _, digest = cl.bot_zip(r['path'])
            a = acc[r['team']]
            subs = s.pages(f'/api/compete/{c.episode}/submission/', limit=1)
            pending = any(x['status'] not in cl.TERMINAL for x in subs)
            if a.get('digest') == digest and (pending or any(x['accepted'] for x in subs)):
                log(f'{r["team"]}: up to date ({digest})')
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


# ---------------------------------------------------------------- idle play
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


def team_busy(c, team_id):
    r = c.request('GET', f'/api/compete/{c.episode}/match/scrimmage/?team_id={team_id}')
    return sum(1 for m in r.get('results', []) if m['status'] in cl.WAITING + ('RUN',))


def plan_request(ladder, challenger_id, opponent_id):
    """(is_ranked) for a pair: ranked only when the opponent is rated at least as high (galaxy's rule)."""
    rate = {t['id']: t['rating'] for t in ladder}
    a, b = rate.get(challenger_id), rate.get(opponent_id)
    return a is not None and b is not None and b >= a


def pick_pair(ladder, ids, rnd, exclude=()):
    """A random challenger among our field accounts and a random other active team."""
    active = {t['id'] for t in ladder if t['active'] and t['status'] == 'R'}
    pool = [n for n, i in ids.items() if i in active and n not in exclude]
    if len(pool) < 1:
        return None
    ch = rnd.choice(pool)
    opps = [t for t in ladder if t['id'] in active and t['id'] != ids[ch]]
    if not opps:
        return None
    return ch, rnd.choice(opps)


def activity(c, acc, poll=60, once=False, seed_=None, n_maps=3):
    rnd = random.Random(seed_)
    ids = {t: a['team_id'] for t, a in acc.items() if a.get('team_id')}
    sess = {t: cl.Session(c, acc[t]['user'], acc[t]['password']) for t in ids}
    rest, stop = {}, {'now': False}

    def on_signal(signum, frame):
        stop['now'] = True
    signal.signal(signal.SIGTERM, on_signal)
    signal.signal(signal.SIGINT, on_signal)
    maps = cl.public_maps(c)
    made = 0
    while not stop['now']:
        try:
            if queue_backlog(c) == 0:
                ladder = cl.rankings(c)
                now = time.time()
                choice = None
                if OUR_TEAM in ids and rest.get(OUR_TEAM, 0) <= now and team_busy(c, ids[OUR_TEAM]) == 0:
                    above, below = cl.neighbours(ladder, ids[OUR_TEAM], 3)
                    pool = [(t, True) for t in above] + [(t, False) for t in below]
                    if pool:
                        t, ranked = rnd.choice(pool)
                        choice = (OUR_TEAM, t, ranked)
                if choice is None:
                    p = pick_pair(ladder, {n: i for n, i in ids.items() if rest.get(n, 0) <= now}, rnd, exclude=(OUR_TEAM,))
                    if p:
                        choice = (p[0], p[1], plan_request(ladder, ids[p[0]], p[1]['id']))
                if choice:
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
    p = sub.add_parser('activity'); p.add_argument('--once', action='store_true'); p.add_argument('--poll', type=int, default=60)
    a = ap.parse_args(argv)
    if a.cmd == 'plan':
        rows = entrants()
        for r in rows:
            print(f'{r["team"]:32} {r["entrant"]:40} {r["path"] or "-"} {r["note"]}')
        print(f'{len(rows)} entrants ({sum(1 for r in rows if r["path"])} uploadable); field file: '
              f'{FIELD_TSV if os.path.exists(FIELD_TSV) else "none yet"}')
        return 0
    c = cl.Client(a.site)
    acc = cl.load_accounts()
    if a.cmd == 'seed':
        n = seed(c, acc, entrants(a.only))
        log(f'seed: {n} upload(s)')
    elif a.cmd == 'status':
        status(c, acc)
    elif a.cmd == 'activity':
        activity(c, acc, a.poll, a.once)
    return 0


if __name__ == '__main__':
    sys.exit(main())
