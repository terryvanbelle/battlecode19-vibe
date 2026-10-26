#!/usr/bin/env python3
"""The replica's Rating History of our team, with each submission's first rated match marked -> progress/
rating-history.md and progress/rating-history.png (a concise port of battlecode23-vibe's tools/rating_history.py).

  tools/progress/rating_history.py

The curve is the Team page's: GET /api/compete/bc19/match/historical_rating/ (cached by tools/progress/replica.py):
our displayed rating after every ranked, non-tournament match. The markers come from our scrimmage list: for each of
our submissions, the first completed (OK!) ranked match whose participant row for us carries it. Builds are named as
in progress/games.csv (tools/progress/games.py). A second panel on the same time axis draws each champion's reign as
the incumbent (bots/ROSTER.tsv: from its acceptance to the next) at its Bradley-Terry rating (progress/ELO.md's fit,
+-95%), with its count of rated matches: every champion appears, rated matches or not (a build replaced between two
daily autoscrims plays none: v10, PROMPTS 44). A separate axis, because over the field teams both rate the replica's
rating has a small fraction of BT's spread (scale(): an Elo mean that moves under 24 points a ranked match, after a few
dozen ranked matches, against BT over every game). Times are Pacific; galaxy's own chart draws UTC.
"""
import collections
import csv
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


def champions(path=None):
    """[(player, UTC time accepted)] for the accepted builds of bots/ROSTER.tsv (date_pdt is Pacific), in roster
    order."""
    from zoneinfo import ZoneInfo
    tz, path = ZoneInfo('America/Los_Angeles'), path or elolib.ROSTER
    if not os.path.exists(path):
        return []
    with open(path) as fh:
        rows = list(csv.DictReader(fh, delimiter='\t'))
    return [(elolib.roster_player(r['name']),
             dt.datetime.strptime(r['date_pdt'], '%Y-%m-%d %H:%M').replace(tzinfo=tz).astimezone(dt.timezone.utc))
            for r in rows if r.get('name') and elolib.ACCEPTED.match(r['name']) and r.get('date_pdt')]


def reigns(bundle, fit, champs, via, names=None, now=None):
    """One dict per champion: t0..t1, its reign as the incumbent (from its acceptance to the next, the last to `now`,
    default the bundle's fetch time); rated, its rated matches as the curve and first_rated() count them (an errored
    one included: galaxy's history carries it, unchanged), whenever played (a match requested before a switch plays
    the older build); bt = (rating, SE, games) from its own games, else from those of the candidate it
    was accepted as (`via`, named in 'as'; its accepting blocks, biased up), else None."""
    R, SE, games = fit[0], fit[1], fit[2]
    names = players(bundle) if names is None else names
    now = now or parse(bundle['fetched_at'])
    n = collections.Counter(names.get(p['submission'], f"us:sub{p['submission']}")
                            for _, p in rated(bundle.get('ours') or [], bundle.get('team') or elolib.OUR_TEAM))
    out = []
    for i, (q, t0) in enumerate(champs):
        t1 = max(t0, champs[i + 1][1] if i + 1 < len(champs) else now)
        c = q if games.get(q) else via.get(q) if games.get(via.get(q)) else None
        out.append({'player': q, 't0': t0, 't1': t1, 'rated': n[q], 'as': None if c in (None, q) else c,
                    'bt': (R[c], SE[c], games[c]) if c else None})
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


def render_md(pts, rows, bundle, sc=None, rg=()):
    team = bundle.get('team') or elolib.OUR_TEAM
    lines = ['# Rating history (replica)', '',
             f"The replica's Team page Rating History for {team}: the displayed rating (siarnaq's penalized Elo) after "
             "each rated (ranked, non-tournament) match, with each submission's first completed rated match marked; "
             "below it, on its own axis, each champion's Bradley-Terry rating over its reign as the incumbent. "
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
              'each champion (bots/ROSTER.tsv) from its acceptance to the next; a champion with no games of its own '
              'yet is drawn dashed at the rating of the candidate it was accepted as (its accepting blocks: biased up). '
              'Rated matches come from the daily autoscrim (about 4 a day for us), the field\'s spare-cycle ranked '
              'challenges (`field.py activity`: only while fewer than 2 matches wait, and only the 3 teams just below us '
              'pick us, so rare while our blocks play), `field.py boost` when used, and, from v11 on, the field '
              'challenges `tools/rate_ours.sh` asks for after a champion\'s control block (galaxy takes ranked requests '
              'only upward and we play at the top, so our team cannot ask): a champion can reign without one.']
    if sc:
        lines[-1] += (f" The two agree on order but not on spread: over the {sc[0]} field teams with 20+ rated replica "
                      f"matches, the replica's unpenalized mean rises {sc[1]:.2f} points per BT point (r {sc[2]:.2f}), "
                      "so they are drawn on separate axes and a gap between them is not a gap in strength.")
    if rg:
        lines += ['', '| Champion | Accepted | Until | Rated matches | BT ± 95% | BT games |', '|---|---|---|---:|---:|---:|']
        for i, g in enumerate(rg):
            bt = '–' if not g['bt'] else f"{g['bt'][0]:,.0f} ± {1.96 * g['bt'][1]:.0f}"
            src = '0' if not g['bt'] else f"{g['bt'][2]}" + (f" (as {elolib.build_of(g['as'])}: accepting blocks)"
                                                            if g['as'] else '')
            until = 'now' if i == len(rg) - 1 else f"{pacific(g['t1']):%Y-%m-%d %H:%M}"
            lines.append(f"| {elolib.build_of(g['player'])} | {pacific(g['t0']):%Y-%m-%d %H:%M} | {until} | "
                         f"{g['rated']} | {bt} | {src} |")
    lines += ['', '| Submission | Build | First rated match | Time | Rating before | Rating after | Rated matches | BT |',
              '|---:|---|---:|---|---:|---:|---:|---:|']
    for r in rows:
        before = '–' if r['old_rating'] is None else f"{r['old_rating']:,.0f}"
        bt = f"{r['bt'][0]:.0f} ± {1.96 * r['bt'][1]:.0f}" if r['bt'] else '–'
        lines.append(f"| #{r['sub']} | {elolib.build_of(r['player'])} | {r['match']} | "
                     f"{pacific(r['created']):%Y-%m-%d %H:%M %Z} | {before} | {r['rating']:,.0f} | {r['matches']} | {bt} |")
    return '\n'.join(lines) + '\n'


def render_png(pts, rows, rg, team, path, sc=None, now=None):
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
        if now and now > pts[-1][0]:
            # The rating holds until the next rated match: drawn dashed to the data's time, so a gap reads as one.
            # Named in the legend: a note beside the line reaches back over the last submissions' markers.
            ax.plot([pts[-1][0], now], [pts[-1][1]] * 2, '--', color=CURVE, lw=1, alpha=.6,
                    label=f'no rated match since {pacific(pts[-1][0]):%b %d %H:%M}')
    ys = [v for _, v in pts] + [r['rating'] for r in rows]
    mid = (min(ys) + max(ys)) / 2 if ys else 0
    xs = ([t for t, _ in pts] + [r['created'] for r in rows] + [g['t0'] for g in rg] + [g['t1'] for g in rg]
          + ([now] if now else []))
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
    # BT panel: each champion from its acceptance to the next at its rating with its 95% band: solid from its own
    # games, dashed and hollow at its accepting candidate's rating when it has none yet; labelled with the rated
    # matches it played (0: none while it reigned), alternately above and below its interval's ends (reigns can be
    # minutes apart). The numbers are in rating-history.md's champion table.
    keys = set()
    for j, g in enumerate(rg):
        if not g['bt']:
            continue
        b, e, own = g['bt'][0], 1.96 * g['bt'][1], g['as'] is None
        col, key = (BTC, "BT from the build's own games, ±95%") if own else (
            '0.5', 'no games of its own yet: its games as the candidate (accepting blocks, biased up)')
        bx.fill_between([g['t0'], g['t1']], [b - e] * 2, [b + e] * 2, color=col, alpha=.18 if own else .1, lw=0)
        bx.plot([g['t0'], g['t1']], [b, b], color=col, lw=2, ls='-' if own else '--',
                label=None if key in keys else key)
        keys.add(key)
        # The interval as a bar too: a reign of minutes has no band width.
        bx.errorbar([g['t0']], [b], yerr=[e], fmt='o', color=col, mfc=col if own else 'white', ms=6, lw=1, capsize=3,
                    zorder=3)
        up, right = j % 2 == 0, bool(span) and max(xs) - g['t0'] < span * 0.04
        bx.annotate(f"{elolib.build_of(g['player'])} · {g['rated']} rated", (g['t0'], b + e if up else b - e),
                    textcoords='offset points', xytext=(0, 4 if up else -4), va='bottom' if up else 'top',
                    ha='right' if right else 'center', fontsize=7.5, color=INK2,
                    bbox=dict(boxstyle='round,pad=0.1', fc='white', ec='none', alpha=.75))
    if keys:
        bx.legend(fontsize=7.5, loc='lower right')
        lo, hi = bx.get_ylim()
        bx.set_ylim(lo - (hi - lo) * .08, hi + (hi - lo) * .1)  # room for the labels past the outermost intervals
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d %H:%M', tz=tz))
    bx.set_xlabel('time (Pacific)')
    ax.set_ylabel('rating (replica, as on the Team page)')
    bx.set_ylabel('BT rating (progress/ELO.md)')
    for a in (ax, bx):
        a.grid(alpha=.3)
    ax.set_title(f'Rating History - {team} (replica), with each submission\'s first rated match', loc='left',
                 fontsize=11, fontweight='bold')
    bx.set_title('Bradley-Terry rating of each champion over its reign, with the rated matches it played (own axis: a '
                 'different scale)', loc='left', fontsize=10)
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
    rows, sc = table(bundle, fit, names), scale(bundle, fit)
    rg = reigns(bundle, fit, champions(), elolib.accepted_via(), names)
    md = os.path.join(elolib.PROGRESS, 'rating-history.md')
    with open(md + '.tmp', 'w') as fh:
        fh.write(render_md(pts, rows, bundle, sc, rg))
    os.replace(md + '.tmp', md)
    render_png(pts, rows, rg, bundle.get('team') or elolib.OUR_TEAM,
               os.path.join(elolib.PROGRESS, 'rating-history.png'), sc, parse(bundle['fetched_at']))
    print(f'rating history: {len(pts)} rated matches, {len(rows)} submissions marked, {len(rg)} champions drawn; '
          'wrote rating-history.md/.png')
    return 0


if __name__ == '__main__':
    sys.exit(main())
