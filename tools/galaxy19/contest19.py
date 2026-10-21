#!/usr/bin/env python3
"""Our team (vibe19) as a contestant on the bc19 replica, through the site's public API only (tools/galaxy19/client.py),
as a team on the official site would act. Standard library only; run on the driver (or the VM).

  python3 tools/galaxy19/contest19.py register              sign up user vibe19 + team vibe19 (auto-accept on); writes
                                                           ~/.bc19-galaxy-team (line 1 user, line 2 password; mode 600)
  python3 tools/galaxy19/contest19.py submit [BOT] [-m TEXT] [--no-wait]
        bundle BOT (default src/bot) with tools/compile_bot.js (local, offline) and upload the bundle; waits for the
        replica's compile (accepted / rejected) unless --no-wait
  python3 tools/galaxy19/contest19.py ladder               rankings, our team marked
  python3 tools/galaxy19/contest19.py scrim [--n 1] [--band 3] [--maps 3] [--dry-run]
        request N scrimmages against teams rated just above us (ranked: galaxy picks 3 random maps, alternating
        order) and just below us (unranked on --maps random maps: galaxy refuses ranked requests downward),
        alternating above/below, nearest first; skips opponents we already have a match waiting against
  python3 tools/galaxy19/contest19.py matches [--pages 1] [--all]   our scrimmages (or everyone's), newest first
  python3 tools/galaxy19/contest19.py fetch [ID ...] [--new] [--out DIR]
        download match archives and unpack their .bc19 replays + match.json into DIR/<id>/ (default
        ~/projects/vibe/bc19-galaxy-replays); --new = every finished match of ours not downloaded yet
  python3 tools/galaxy19/contest19.py results [--pages 3]  per-opponent W-L over our finished matches (games)
"""
import argparse
import json
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
    p = sub.add_parser('matches'); p.add_argument('--pages', type=int, default=1); p.add_argument('--all', action='store_true')
    p = sub.add_parser('fetch'); p.add_argument('ids', type=int, nargs='*'); p.add_argument('--new', action='store_true')
    p.add_argument('--out', default=REPLAYS); p.add_argument('--pages', type=int, default=3)
    p = sub.add_parser('results'); p.add_argument('--pages', type=int, default=3)
    a = ap.parse_args(argv)
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
        plan = plan_scrims(cl.rankings(c), my_id, a.n, a.band, waiting)
        if not plan:
            print('no rated opponent near us (or all have a match waiting)')
            return 1
        maps = cl.public_maps(c)
        import random
        rnd = random.Random()
        for t, ranked in plan:
            mp = [] if ranked else rnd.sample(maps, a.maps)
            if a.dry_run:
                print(f'would request {"ranked" if ranked else "unranked"} vs {t["name"]} (rated {t["rating"]:.0f}) {mp}')
                continue
            try:
                r = cl.request(s, t['id'], ranked, mp, '?', ep)
                print(f'request {r["id"]}: vs {t["name"]} ({"ranked" if ranked else "unranked"}, rated {t["rating"]:.0f})')
            except cl.ApiError as e:
                print(f'refused: vs {t["name"]}: {e}')
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
