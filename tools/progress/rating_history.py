#!/usr/bin/env python3
"""The replica's Rating History of our team, with each submission's first rated match marked -> progress/
rating-history.md and progress/rating-history.png (a concise port of battlecode23-vibe's tools/rating_history.py).

  tools/progress/rating_history.py

The curve is the Team page's: GET /api/compete/bc19/match/historical_rating/ (cached by tools/progress/replica.py):
our displayed rating after every ranked, non-tournament match. The markers come from our scrimmage list: for each of
our submissions, the first completed (OK!) ranked match whose participant row for us carries it. Builds are named as
in progress/games.csv (tools/progress/games.py), and each label carries the build's Bradley-Terry rating from
progress/ELO.md's fit. Times are Pacific; galaxy's own chart draws UTC.
"""
import collections
import datetime as dt
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import elolib  # noqa: E402
import games as gamesmod  # noqa: E402

CURVE, MARK, INK2 = '#2a78d6', '#eb6834', '#52514e'


def parse(s):
    t = dt.datetime.fromisoformat(s.replace('Z', '+00:00'))
    return (t if t.tzinfo else t.replace(tzinfo=dt.timezone.utc)).astimezone(dt.timezone.utc)


def pacific(t):
    from zoneinfo import ZoneInfo
    return t.astimezone(ZoneInfo('America/Los_Angeles'))


def points(history):
    """historical_rating response -> [(UTC time, rating)] in time order ([] for none)."""
    rh = (((history or {}).get('team_rating') or {}).get('rating_history')) or []
    return sorted((parse(p['timestamp']), float(p['rating'])) for p in rh if p.get('rating') is not None)


def first_rated(ours, team):
    """{submission: {match, created, rating, old_rating, matches}} from our scrimmage list: the first completed ranked
    non-tournament match of each submission ('matches' counts all its rated matches, completed or not)."""
    out, n = {}, collections.Counter()
    for m in sorted(ours, key=lambda m: (parse(m['created']), m['id'])):
        p = next((p for p in m.get('participants') or [] if p.get('teamname') == team), None)
        if (p is None or not m.get('is_ranked') or m.get('tournament_round') is not None or p.get('rating') is None
                or p.get('submission') is None):
            continue
        s = p['submission']
        n[s] += 1
        if m.get('status') == 'OK!' and s not in out:
            out[s] = {'match': m['id'], 'created': parse(m['created']), 'rating': float(p['rating']),
                      'old_rating': None if p.get('old_rating') is None else float(p['old_rating'])}
    for s, d in out.items():
        d['matches'] = n[s]
    return out


def table(bundle, fit):
    """One row per submission with a rated match, in first-use order."""
    R, SE, games = fit[0], fit[1], fit[2]
    names = gamesmod.submission_players(bundle.get('submissions') or [], gamesmod.load_overrides(),
                                        {n for n, _ in elolib.roster()})
    out = []
    for s, d in sorted(first_rated(bundle.get('ours') or [], bundle.get('team') or elolib.OUR_TEAM).items(),
                       key=lambda kv: (kv[1]['created'], kv[0])):
        p = names.get(s, f'us:sub{s}')
        out.append(dict(d, sub=s, player=p, bt=(R[p], SE[p]) if games.get(p) else None))
    return out


def render_md(pts, rows, bundle):
    team = bundle.get('team') or elolib.OUR_TEAM
    lines = ['# Rating history (replica)', '',
             f"The replica's Team page Rating History for {team}: the displayed rating (siarnaq's penalized Elo) after "
             "each rated (ranked, non-tournament) match, with each submission's first completed rated match marked. "
             f"Written by `tools/progress/rating_history.py` from data fetched {pacific(parse(bundle['fetched_at'])):%Y-%m-%d %H:%M %Z}"
             "; regenerate, do not edit.", '', '![rating history](rating-history.png)', '']
    if pts:
        lines.append(f"{len(pts)} rated matches; latest rating {pts[-1][1]:,.0f} "
                     f"({pacific(pts[-1][0]):%Y-%m-%d %H:%M %Z}). Times are Pacific; the replica's chart shows UTC.")
    else:
        lines.append('No rated match yet.')
    lines += ['', 'BT = the build\'s Bradley-Terry rating in `progress/ELO.md` (± 95%), the same for every submission '
              'of a build.', '',
              '| Submission | Build | First rated match | Time | Rating before | Rating after | Rated matches | BT |',
              '|---:|---|---:|---|---:|---:|---:|---:|']
    for r in rows:
        before = '–' if r['old_rating'] is None else f"{r['old_rating']:,.0f}"
        bt = f"{r['bt'][0]:.0f} ± {1.96 * r['bt'][1]:.0f}" if r['bt'] else '–'
        lines.append(f"| #{r['sub']} | {elolib.build_of(r['player'])} | {r['match']} | "
                     f"{pacific(r['created']):%Y-%m-%d %H:%M %Z} | {before} | {r['rating']:,.0f} | {r['matches']} | {bt} |")
    return '\n'.join(lines) + '\n'


def render_png(pts, rows, team, path):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.dates as mdates
    import matplotlib.pyplot as plt
    from zoneinfo import ZoneInfo
    tz = ZoneInfo('America/Los_Angeles')
    fig, ax = plt.subplots(figsize=(10, 5.2))
    if pts:
        ax.plot([t for t, _ in pts], [r for _, r in pts], '-o', color=CURVE, ms=3, lw=1.6,
                label='rating after each rated match')
    ys = [v for _, v in pts] + [r['rating'] for r in rows]
    mid = (min(ys) + max(ys)) / 2 if ys else 0
    for i, r in enumerate(rows):
        ax.axvline(r['created'], color=MARK, lw=0.8, ls=':', zorder=1)
        ax.plot([r['created']], [r['rating']], 'o', color=MARK, ms=8, zorder=3,
                label='first rated match of a submission' if i == 0 else None)
        bt = f"\nBT {r['bt'][0]:,.0f} ±{1.96 * r['bt'][1]:.0f}" if r['bt'] else ''
        ax.annotate(f"#{r['sub']} {elolib.build_of(r['player'])}{bt}", (r['created'], r['rating']),
                    textcoords='offset points', xytext=(6, 8 if r['rating'] < mid else -26), fontsize=8, color=INK2)
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d %H:%M', tz=tz))
    ax.set_xlabel('time (Pacific)')
    ax.set_ylabel('rating (replica, as on the Team page)')
    ax.grid(alpha=.3)
    ax.set_title(f'Rating History - {team} (replica), with each submission\'s first rated match', loc='left',
                 fontsize=11, fontweight='bold')
    if pts or rows:
        ax.legend(fontsize=8, loc='lower right')
    fig.autofmt_xdate()
    fig.text(0.01, 0.01, 'Rating = siarnaq\'s penalized Elo (mean - 1500·0.85^n after n rated matches): it climbs from 0. '
             'BT = our Bradley-Terry fit (progress/ELO.md), a different scale.', fontsize=7.5, color=INK2)
    fig.tight_layout(rect=(0, 0.03, 1, 1))
    fig.savefig(path + '.tmp.png', dpi=120)
    plt.close(fig)
    os.replace(path + '.tmp.png', path)


def main():
    elolib.use_venv(__file__)
    try:
        with open(elolib.REPLICA_JSON) as fh:
            bundle = json.load(fh)
    except (OSError, ValueError):
        sys.exit(f'rating_history.py: no replica bundle at {elolib.REPLICA_JSON} (run tools/progress/replica.py fetch)')
    pts = points(bundle.get('history'))
    rows = table(bundle, elolib.fit(elolib.load()))
    md = os.path.join(elolib.PROGRESS, 'rating-history.md')
    with open(md + '.tmp', 'w') as fh:
        fh.write(render_md(pts, rows, bundle))
    os.replace(md + '.tmp', md)
    render_png(pts, rows, bundle.get('team') or elolib.OUR_TEAM, os.path.join(elolib.PROGRESS, 'rating-history.png'))
    print(f'rating history: {len(pts)} rated matches, {len(rows)} submissions marked; wrote rating-history.md/.png')
    return 0


if __name__ == '__main__':
    sys.exit(main())
