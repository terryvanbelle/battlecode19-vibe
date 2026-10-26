#!/usr/bin/env python3
"""The replica's Rating History of our team, with each submission's first rated match marked -> progress/
rating-history.md and progress/rating-history.png (a concise port of battlecode23-vibe's tools/rating_history.py).

  tools/progress/rating_history.py

The curve is the Team page's: GET /api/compete/bc19/match/historical_rating/ (cached by tools/progress/replica.py):
our displayed rating after every ranked, non-tournament match. The markers come from our scrimmage list: for each of
our submissions, the first completed (OK!) ranked match whose participant row for us carries it. Builds are named as
in progress/games.csv (tools/progress/games.py). A second panel on the same time axis draws the Bradley-Terry rating
(progress/ELO.md's fit, +-95%) of the build behind each rated match: a separate axis, because over the field teams both
rate the replica's rating has a small fraction of BT's spread (scale(): an Elo mean that moves under 24 points a ranked
match, after a few dozen ranked matches, against BT over every game). Times are Pacific; galaxy's own chart draws UTC.
"""
import collections
import datetime as dt
import json
import os
import statistics
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import elolib  # noqa: E402
import games as gamesmod  # noqa: E402

CURVE, MARK, BTC, INK2 = '#2a78d6', '#eb6834', '#1baf7a', '#52514e'
ELO_INITIAL, ELO_PENALTY = 1500.0, 0.85  # siarnaq settings TEAMS_ELO_*: value = mean - 1500 * 0.85**n


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


def rated(ours, team):
    """(match, our participant row) for each ranked non-tournament match of ours that carries our rating and
    submission, in time order (completed or not)."""
    for m in sorted(ours, key=lambda m: (parse(m['created']), m['id'])):
        p = next((p for p in m.get('participants') or [] if p.get('teamname') == team), None)
        if (p is not None and m.get('is_ranked') and m.get('tournament_round') is None and p.get('rating') is not None
                and p.get('submission') is not None):
            yield m, p


def first_rated(ours, team):
    """{submission: {match, created, rating, old_rating, matches}} from our scrimmage list: the first completed ranked
    non-tournament match of each submission ('matches' counts all its rated matches, completed or not)."""
    out, n = {}, collections.Counter()
    for m, p in rated(ours, team):
        s = p['submission']
        n[s] += 1
        if m.get('status') == 'OK!' and s not in out:
            out[s] = {'match': m['id'], 'created': parse(m['created']), 'rating': float(p['rating']),
                      'old_rating': None if p.get('old_rating') is None else float(p['old_rating'])}
    for s, d in out.items():
        d['matches'] = n[s]
    return out


def players(bundle):
    """{submission: player name in the fit} (games.py's naming)."""
    return gamesmod.submission_players(bundle.get('submissions') or [], gamesmod.load_overrides(),
                                       {n for n, _ in elolib.roster()})


def table(bundle, fit, names=None):
    """One row per submission with a rated match, in first-use order."""
    R, SE, games = fit[0], fit[1], fit[2]
    names = players(bundle) if names is None else names
    out = []
    for s, d in sorted(first_rated(bundle.get('ours') or [], bundle.get('team') or elolib.OUR_TEAM).items(),
                       key=lambda kv: (kv[1]['created'], kv[0])):
        p = names.get(s, f'us:sub{s}')
        out.append(dict(d, sub=s, player=p, bt=(R[p], SE[p]) if games.get(p) else None))
    return out


def bt_steps(bundle, fit, names=None):
    """[(UTC time, player, BT or None, SE or None)]: the fit's rating of the build behind each completed rated match of
    ours, in time order (None: a build the fit has no games for)."""
    R, SE, games = fit[0], fit[1], fit[2]
    names = players(bundle) if names is None else names
    out = []
    for m, p in rated(bundle.get('ours') or [], bundle.get('team') or elolib.OUR_TEAM):
        if m.get('status') != 'OK!':
            continue
        q = names.get(p['submission'], f"us:sub{p['submission']}")
        out.append((parse(m['created']), q, R[q] if games.get(q) else None, SE[q] if games.get(q) else None))
    return out


def scale(bundle, fit, min_n=20):
    """(teams, slope, r): the replica's unpenalized mean rating against BT over the field teams with at least min_n
    completed rated replica matches and BT games; None for fewer than 3 such teams."""
    R, games = fit[0], fit[2]
    n = collections.Counter()
    for m in bundle.get('matches') or []:
        if m.get('status') == 'OK!' and m.get('is_ranked') and m.get('tournament_round') is None:
            for p in m.get('participants') or []:
                if p.get('rating') is not None:
                    n[p.get('teamname')] += 1
    team = bundle.get('team') or elolib.OUR_TEAM
    xy = [(R[t['name']], t['rating'] + ELO_INITIAL * ELO_PENALTY ** n[t['name']])
          for t in bundle.get('rankings') or []
          if t.get('name') != team and t.get('rating') is not None and n[t.get('name')] >= min_n and games.get(t.get('name'))]
    if len(xy) < 3 or len({x for x, _ in xy}) < 2 or len({y for _, y in xy}) < 2:
        return None
    xs, ys = [x for x, _ in xy], [y for _, y in xy]
    return len(xy), statistics.linear_regression(xs, ys).slope, statistics.correlation(xs, ys)


def render_md(pts, rows, bundle, sc=None):
    team = bundle.get('team') or elolib.OUR_TEAM
    lines = ['# Rating history (replica)', '',
             f"The replica's Team page Rating History for {team}: the displayed rating (siarnaq's penalized Elo) after "
             "each rated (ranked, non-tournament) match, with each submission's first completed rated match marked; "
             "below it, on its own axis, the Bradley-Terry rating of the build behind each rated match. "
             f"Written by `tools/progress/rating_history.py` from data fetched {pacific(parse(bundle['fetched_at'])):%Y-%m-%d %H:%M %Z}"
             "; regenerate, do not edit.", '', '![rating history](rating-history.png)', '']
    if pts:
        lines.append(f"{len(pts)} rated matches; latest rating {pts[-1][1]:,.0f} "
                     f"({pacific(pts[-1][0]):%Y-%m-%d %H:%M %Z}). Times are Pacific; the replica's chart shows UTC.")
    else:
        lines.append('No rated match yet.')
    lines += ['', 'BT = the build\'s Bradley-Terry rating in `progress/ELO.md` (± 95%), the same for every submission '
              'of a build: a fit over every game (local, replica scrimmages and ranked matches), where the replica\'s '
              'Elo mean (displayed rating + 1500·0.85^n) moves at most 24 points per ranked match. The BT panel draws '
              'each build from its first to its last rated match only, so a build that never played a rated match '
              'does not appear.']
    if sc:
        lines[-1] += (f" The two agree on order but not on spread: over the {sc[0]} field teams with 20+ rated replica "
                      f"matches, the replica's unpenalized mean rises {sc[1]:.2f} points per BT point (r {sc[2]:.2f}), "
                      "so they are drawn on separate axes and a gap between them is not a gap in strength.")
    lines += ['', '| Submission | Build | First rated match | Time | Rating before | Rating after | Rated matches | BT |',
              '|---:|---|---:|---|---:|---:|---:|---:|']
    for r in rows:
        before = '–' if r['old_rating'] is None else f"{r['old_rating']:,.0f}"
        bt = f"{r['bt'][0]:.0f} ± {1.96 * r['bt'][1]:.0f}" if r['bt'] else '–'
        lines.append(f"| #{r['sub']} | {elolib.build_of(r['player'])} | {r['match']} | "
                     f"{pacific(r['created']):%Y-%m-%d %H:%M %Z} | {before} | {r['rating']:,.0f} | {r['matches']} | {bt} |")
    return '\n'.join(lines) + '\n'


def render_png(pts, rows, steps, team, path, sc=None):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.dates as mdates
    import matplotlib.pyplot as plt
    from zoneinfo import ZoneInfo
    tz = ZoneInfo('America/Los_Angeles')
    fig, (ax, bx) = plt.subplots(2, 1, sharex=True, figsize=(10, 7.8), gridspec_kw={'height_ratios': [3, 2]})
    if pts:
        ax.plot([t for t, _ in pts], [r for _, r in pts], '-o', color=CURVE, ms=3, lw=1.6,
                label='rating after each rated match')
    ys = [v for _, v in pts] + [r['rating'] for r in rows]
    mid = (min(ys) + max(ys)) / 2 if ys else 0
    xs = [t for t, _ in pts] + [r['created'] for r in rows] + [t for t, _, _, _ in steps]
    span = (max(xs) - min(xs)) if xs else dt.timedelta(0)

    def place(t, dy, last):
        """Label offset and alignment: to the left near the right edge, one line further out when the previous label
        is close (submissions minutes apart)."""
        near = last is not None and bool(span) and t - last < span * 0.06
        right = bool(span) and max(xs) - t < span * 0.08
        return dict(xytext=(-6 if right else 6, dy + (11 if dy > 0 else -11) * near), ha='right' if right else 'left')
    last = None
    for i, r in enumerate(rows):
        for a in (ax, bx):
            a.axvline(r['created'], color=MARK, lw=0.8, ls=':', zorder=1)
        ax.plot([r['created']], [r['rating']], 'o', color=MARK, ms=8, zorder=3,
                label='first rated match of a submission' if i == 0 else None)
        ax.annotate(f"#{r['sub']} {elolib.build_of(r['player'])}", (r['created'], r['rating']), textcoords='offset points',
                    fontsize=8, color=INK2, **place(r['created'], 8 if r['rating'] < mid else -18, last))
        last = r['created']
    # BT panel: each run of rated matches by one build, from its first to its last, at the build's rating with its 95%
    # band; nothing between runs (another build may have been live with no rated match) or where the fit has no games.
    runs = []
    for t, q, b, e in steps:
        if b is None:
            continue
        if runs and runs[-1]['q'] == q:
            runs[-1]['t1'] = t
        else:
            runs.append({'q': q, 'b': b, 'e': e, 't0': t, 't1': t})
    last = None
    for j, u in enumerate(runs):
        t, b, e = u['t0'], u['b'], 1.96 * u['e']
        bx.fill_between([t, u['t1']], [b - e] * 2, [b + e] * 2, color=BTC, alpha=.18, lw=0,
                        label='95% interval' if j == 0 else None)
        bx.plot([t, u['t1']], [b, b], color=BTC, lw=2,
                label='BT of the build, first to last rated match' if j == 0 else None)
        # The interval as a bar too: a run of rated matches at one moment has no band width. A label goes below its
        # point when the next run starts close by.
        bx.errorbar([t], [b], yerr=[e], fmt='o', color=BTC, ms=6, lw=1, capsize=3, zorder=3)
        soon = j + 1 < len(runs) and bool(span) and runs[j + 1]['t0'] - t < span * 0.06
        bx.annotate(f"{elolib.build_of(u['q'])} {b:,.0f} ±{e:.0f}", (t, b), textcoords='offset points',
                    fontsize=8, color=INK2, **place(t, -14 if soon else 6, last))
        last = t
    if runs:
        bx.legend(fontsize=8, loc='lower right')
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d %H:%M', tz=tz))
    bx.set_xlabel('time (Pacific)')
    ax.set_ylabel('rating (replica, as on the Team page)')
    bx.set_ylabel('BT rating (progress/ELO.md)')
    for a in (ax, bx):
        a.grid(alpha=.3)
    ax.set_title(f'Rating History - {team} (replica), with each submission\'s first rated match', loc='left',
                 fontsize=11, fontweight='bold')
    bx.set_title('Bradley-Terry rating of the build behind each rated match (own axis: a different scale)', loc='left',
                 fontsize=10)
    if pts or rows:
        ax.legend(fontsize=8, loc='lower right')
    fig.autofmt_xdate()
    note = ('Rating = siarnaq\'s penalized Elo: mean - 1500·0.85^n after n rated matches (the mean moves at most 24 a '
            'match), so it climbs from 0.\nBT = our Bradley-Terry fit over every game (progress/ELO.md).')
    if sc:
        note += (f'\nOver the {sc[0]} field teams with 20+ rated replica matches the replica\'s mean rises {sc[1]:.2f} per '
                 f'BT point (r {sc[2]:.2f}): same order, a fraction of the spread, so the levels are not comparable.')
    fig.text(0.01, 0.01, note, fontsize=7.5, color=INK2)
    fig.tight_layout(rect=(0, 0.065 if sc else 0.045, 1, 1))
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
    fit, names = elolib.fit(elolib.load()), players(bundle)
    rows, steps, sc = table(bundle, fit, names), bt_steps(bundle, fit, names), scale(bundle, fit)
    md = os.path.join(elolib.PROGRESS, 'rating-history.md')
    with open(md + '.tmp', 'w') as fh:
        fh.write(render_md(pts, rows, bundle, sc))
    os.replace(md + '.tmp', md)
    render_png(pts, rows, steps, bundle.get('team') or elolib.OUR_TEAM,
               os.path.join(elolib.PROGRESS, 'rating-history.png'), sc)
    print(f'rating history: {len(pts)} rated matches, {len(rows)} submissions marked, {len(steps)} BT steps; '
          'wrote rating-history.md/.png')
    return 0


if __name__ == '__main__':
    sys.exit(main())
