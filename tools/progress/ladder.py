#!/usr/bin/env python3
"""Snapshot of the galaxy replica's Rankings page -> progress/ladder.md (tables) and progress/ladder.png (bars), from
the bundle tools/progress/replica.py cached (ported from battlecode23-vibe's tools/galaxy/snapshot.py).

  tools/progress/ladder.py

Rating is the replica's displayed rating: siarnaq's penalized Elo (mean - 1500 * 0.85^n after n rated matches), so a
new team climbs from 0 over its first ~20 ranked matches. Games W-L counts each team's replica games in
progress/games.csv (our builds us:* summed into our team); BT is the Bradley-Terry rating of progress/ELO.md (for our
team: the build of our latest submission).
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

C = {'surface': '#fcfcfb', 'ink': '#0b0b0b', 'ink2': '#52514e', 'muted': '#898781', 'grid': '#e1e0d9',
     'bar': '#c3c2b7', 'ours': '#2a78d6'}


def fmt_time(iso):
    from zoneinfo import ZoneInfo
    t = dt.datetime.fromisoformat(iso.replace('Z', '+00:00')).astimezone(ZoneInfo('America/Los_Angeles'))
    return t.strftime('%b %-d %H:%M %Z')


def md_escape(s):
    return ''.join('\\' + ch if ch in '\\`*_{}[]<>()#+!|~' else ch for ch in str(s))


def team_records(rows, ours):
    """{team: [won, lost]} over the replica games of games.csv."""
    rec = collections.defaultdict(lambda: [0, 0])
    for r in rows:
        if not elolib.is_replica(r):
            continue
        for side, name in (('A', r['teamA']), ('B', r['teamB'])):
            t = name if elolib.is_field(name) else ours
            rec[t][0 if r['winner'] == side else 1] += 1
    return rec


def our_build(bundle):
    """The player name of our latest accepted submission, or None."""
    subs = [s for s in bundle.get('submissions') or [] if s.get('accepted')]
    if not subs:
        return None
    names = gamesmod.submission_players(subs, gamesmod.load_overrides(), {n for n, _ in elolib.roster()})
    return names[max(subs, key=lambda s: s['id'])['id']]


def collect(bundle, rows, recent=20):
    ours = bundle.get('team') or elolib.OUR_TEAM
    rec = team_records(rows, ours)
    R, SE, games, _ = elolib.fit(rows)
    build = our_build(bundle)
    lad = []
    for i, t in enumerate(bundle.get('rankings') or [], 1):
        p = build if t['name'] == ours else t['name']
        lad.append({'rank': i, 'name': t['name'], 'rating': t.get('rating'), 'active': t.get('active'),
                    'ours': t['name'] == ours, 'games': rec.get(t['name'], [0, 0]),
                    'bt': (R[p], SE[p]) if p and games.get(p) else None, 'build': build if t['name'] == ours else None})
    ms = [m for m in bundle.get('matches') or []][:recent]
    return {'generated': bundle.get('fetched_at'), 'site': bundle.get('site'), 'episode': bundle.get('episode'),
            'ours': ours, 'ladder': lad, 'recent': ms}


def render_md(d, image='ladder.png'):
    lad = d['ladder']
    lines = [
        '# Galaxy replica ladder', '',
        f"Snapshot of the Rankings page of our private galaxy replica ({d['site']}/{d['episode']}/rankings), taken "
        f"{fmt_time(d['generated'])}. Written by `tools/progress/ladder.py` (`tools/progress-refresh.sh`): regenerate "
        "it, do not edit it. How to open the live site, with replays: `ACCESS.md`.", '',
        "**Rating is the replica's displayed rating**: siarnaq's penalized Elo, mean − 1500·0.85^n after n rated "
        "matches, so every team starts at 0 and climbs over its first ~20 ranked matches. **BT** is the Bradley-Terry "
        "rating of `progress/ELO.md` (± 95%; for our team, the build of our latest submission). Games W-L counts the "
        f"replica games in `progress/games.csv`. {len(lad)} teams; our team is **{md_escape(d['ours'])}**. The field "
        "of public 2019 bots is entered (BENCHMARK.md); the replica plays a few matches an hour, so most teams have "
        "played few games yet and their ratings are still rising toward their level.", '',
        f'![Galaxy replica ladder]({image})', '',
        '| # | Team | Rating | BT | Games W-L | Submission |', '|---:|---|---:|---:|---|---|']
    for t in lad:
        name = md_escape(t['name'])
        if t['ours']:
            name = f"**{name}**" + (f" ({md_escape(elolib.build_of(t['build']))})" if t['build'] else '')
        r = '–' if t['rating'] is None else f"{t['rating']:.1f}"
        bt = f"{t['bt'][0]:.0f} ± {1.96 * t['bt'][1]:.0f}" if t['bt'] else '–'
        lines.append(f"| {t['rank']} | {name} | {r} | {bt} | {t['games'][0]}-{t['games'][1]} | "
                     f"{'accepted' if t['active'] else 'none'} |")
    if not lad:
        lines.append('| | (no teams yet) | | | | |')
    lines += ['', '## Latest matches', '', '| Match | Created | Player 0 | Score | Player 1 | Maps | Type | Status |',
              '|---:|---|---|---|---|---|---|---|']
    for m in d['recent']:
        ps = sorted(m.get('participants') or [], key=lambda p: p.get('player_index', 0)) + [None, None]

        def team(p):
            if p is None:
                return ''
            n = md_escape(p['teamname'])
            return f'**{n}**' if p['teamname'] == d['ours'] else n
        sc = '–'.join('?' if p is None or p.get('score') is None else str(p['score']) for p in ps[:2])
        lines.append(f"| {m['id']} | {fmt_time(m['created'])} | {team(ps[0])} | {sc} | {team(ps[1])} | "
                     f"{md_escape(', '.join(m.get('maps') or []))} | {'ranked' if m.get('is_ranked') else 'unranked'} | "
                     f"{m.get('status')} |")
    if not d['recent']:
        lines.append('| | (none yet) | | | | | | |')
    return '\n'.join(lines) + '\n'


def render_png(d, path):
    """Ranked horizontal bars of the displayed rating; our team in the accent, the rest gray."""
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import matplotlib.ticker
    lad = d['ladder'] or [{'name': '(no teams yet)', 'rating': 0, 'ours': False, 'rank': 1}]
    n = len(lad)
    fig_h = 1.3 + 0.32 * n
    fig, ax = plt.subplots(figsize=(8.6, fig_h), dpi=120)
    fig.patch.set_facecolor(C['surface'])
    ax.set_facecolor(C['surface'])
    vals = [t['rating'] or 0 for t in lad]
    ys = list(range(n))
    ax.barh(ys, vals, height=0.72, color=[C['ours'] if t['ours'] else C['bar'] for t in lad], edgecolor='none',
            zorder=2)
    ax.set_yticks(ys)
    ax.set_yticklabels([f"{t['rank']}. {t['name']}" for t in lad], fontsize=8, color=C['ink2'])
    for lab, t in zip(ax.get_yticklabels(), lad):
        if t['ours']:
            lab.set_color(C['ink'])
            lab.set_fontweight('bold')
    ax.set_ylim(n - 0.5, -0.5)
    top = max(vals + [100])
    ax.set_xlim(0, top * 1.12)
    ax.xaxis.set_major_formatter(matplotlib.ticker.StrMethodFormatter('{x:,.0f}'))
    for y, t, v in zip(ys, lad, vals):
        ax.text(v + top * 0.01, y, f'{v:.0f}', va='center', ha='left', fontsize=8,
                color=C['ink'] if t['ours'] else C['ink2'], fontweight='bold' if t['ours'] else 'normal')
    ax.grid(axis='x', color=C['grid'], linewidth=0.8, zorder=0)
    ax.tick_params(axis='x', colors=C['muted'], labelsize=7.5, length=0)
    ax.tick_params(axis='y', length=0)
    ax.xaxis.set_ticks_position('top')
    for s in ('top', 'right', 'bottom'):
        ax.spines[s].set_visible(False)
    ax.spines['left'].set_color(C['bar'])
    fig.text(0.015, 1 - 0.32 / fig_h, 'Galaxy replica ladder: displayed rating (penalized Elo)', fontsize=11,
             fontweight='bold', color=C['ink'], ha='left')
    fig.text(0.015, 1 - 0.55 / fig_h, f"{fmt_time(d['generated'])} · {len(d['ladder'])} teams · our team {d['ours']} "
             'in blue · rating = mean − 1500·0.85^n, from 0', fontsize=7.8, color=C['ink2'], ha='left')
    fig.subplots_adjust(left=0.36, right=0.97, top=1 - 1.0 / fig_h, bottom=0.25 / fig_h)
    fig.savefig(path + '.tmp.png', dpi=120, facecolor=C['surface'])
    plt.close(fig)
    os.replace(path + '.tmp.png', path)


def main():
    elolib.use_venv(__file__)
    try:
        with open(elolib.REPLICA_JSON) as fh:
            bundle = json.load(fh)
    except (OSError, ValueError):
        sys.exit(f'ladder.py: no replica bundle at {elolib.REPLICA_JSON} (run tools/progress/replica.py fetch)')
    d = collect(bundle, elolib.load())
    md = os.path.join(elolib.PROGRESS, 'ladder.md')
    with open(md + '.tmp', 'w') as fh:
        fh.write(render_md(d))
    os.replace(md + '.tmp', md)
    render_png(d, os.path.join(elolib.PROGRESS, 'ladder.png'))
    print(f"ladder: {len(d['ladder'])} teams, snapshot {fmt_time(d['generated'])}; wrote ladder.md, ladder.png")
    return 0


if __name__ == '__main__':
    sys.exit(main())
