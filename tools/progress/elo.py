#!/usr/bin/env python3
"""Ratings of every player in progress/games.csv by a batch Bradley-Terry fit (tools/progress/elolib.py) ->
progress/ELO.md (tables), progress/elo.png (every player, rating and 95% interval) and progress/progress.png (the
accepted builds in acceptance order: rating, and expected score against the rated field).

  tools/progress/elo.py                 # writes the three files, prints our builds
  tools/progress/elo.py --build v3      # one build: record (Wilson 95%), rating, rank, field score

The field is every rated player that is not ours (no us:/cand:/spar: prefix): the replica's teams, the starter bot
included. "Field score" = expected score against every rated field bot, one game each; "vs higher" = the same against
only the field bots rated above. Charts need matplotlib (.venv-progress): without it the script re-runs itself there,
and when the venv is missing it writes ELO.md and says the charts were skipped (exit 1).
"""
import argparse
import collections
import datetime as dt
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import elolib  # noqa: E402

RED, RED_LIGHT, BLUE, GRAY = '#d62728', '#f0948f', '#1f77b4', '#8c8c8c'
COLOR = {'ours': RED, 'cand': RED_LIGHT, 'spar': GRAY, 'field': BLUE}
KIND_TEXT = {'ours': 'accepted', 'cand': 'candidate', 'spar': 'sparring', 'field': 'field'}


def pdt(t):
    """An ISO time -> 'YYYY-MM-DD HH:MM PDT' (America/Los_Angeles)."""
    from zoneinfo import ZoneInfo
    x = dt.datetime.fromisoformat(t.replace('Z', '+00:00'))
    x = (x if x.tzinfo else x.replace(tzinfo=dt.timezone.utc)).astimezone(ZoneInfo('America/Los_Angeles'))
    return x.strftime('%Y-%m-%d %H:%M %Z')


def ladder_teams(bundle):
    """Replica team names other than ours, in ranking order ([] without a bundle)."""
    if not bundle:
        return []
    return [t['name'] for t in bundle.get('rankings') or [] if t['name'] != (bundle.get('team') or elolib.OUR_TEAM)]


def analyse(rows, bundle=None):
    """Everything the outputs need, as a dict (pure: tested)."""
    R, SE, games, wins = elolib.fit(rows)
    players = sorted(games, key=lambda p: (-R[p], p))
    field = [p for p in players if elolib.is_field(p)]
    rank = {p: i + 1 for i, p in enumerate(players)}
    accepted = elolib.accepted_builds()
    ours = [p for p in players if not elolib.is_field(p)]
    order = {p: i for i, p in enumerate(accepted)}
    ours.sort(key=lambda p: (elolib.kind(p) != 'ours', order.get(p, 99), elolib.build_of(p)))
    played = [p for p in accepted if games[p]]
    via = {p: c for p, c in elolib.accepted_via().items() if p in order and games.get(c)}
    rec = elolib.records(rows)
    src = collections.defaultdict(set)
    for r in rows:
        src[frozenset((r['teamA'], r['teamB']))].add('local' if elolib.is_local(r) else 'replica')
    return {'R': R, 'SE': SE, 'games': games, 'wins': wins, 'players': players, 'field': field, 'rank': rank,
            'ours': ours, 'accepted': accepted, 'played': played, 'via': via, 'rec': rec,
            'src': src,
            'unmet': [t for t in ladder_teams(bundle) if not games[t]]}


def higher(a, p):
    up = [b for b in a['field'] if a['R'][b] > a['R'][p]]
    return f"{elolib.field_score(a['R'], p, up):.1%} (vs {len(up)})" if up else '-'


def our_record(a, bot):
    """W-L against a field bot of the latest accepted build with games of its own that met it, as text."""
    for p in a['played'][::-1]:
        w, n = a['rec'].get((p, bot), (0, 0))
        if n:
            return f"{w / n:.0%} ({elolib.build_of(p)} {w}-{n - w})"
    return ''


def render_md(rows, a, bundle=None, summary=()):
    R, SE, games, wins = a['R'], a['SE'], a['games'], a['wins']
    loc = sum(1 for r in rows if elolib.is_local(r))
    rep = [r for r in rows if elolib.is_replica(r)]
    rep_ours = sum(1 for r in rep if not (elolib.is_field(r['teamA']) and elolib.is_field(r['teamB'])))
    scores = sum(1 for r in rep if r['reason'] == 'score')
    last = max((r.get('time') or '' for r in rows), default='')
    nteams = len(ladder_teams(bundle)) + 1 if bundle else None
    fld = a['field']
    lines = [
        '# Ratings (Bradley-Terry)', '',
        f"Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do "
        f"not edit.{f' Latest game {pdt(last)}.' if last else ''}", '',
        f"{len(rows)} games: {loc} local (VM batches between our builds, candidates, sparring partners and the starter "
        f"bot), {rep_ours} of ours on the galaxy replica and {len(rep) - rep_ours} between field bots there"
        f"{f' ({scores} replica games known only from match scores: no map, side or rounds)' if scores else ''}. "
        f"Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each "
        f"pair of players at most {elolib.PAIR_CAP} games, each build its own player, prior {elolib.PRIOR} virtual "
        f"win and loss against 1500. Ratings are relative to the mean of all {len(games)} players; compare them only "
        f"within this fit.", '',
        f"**Thin field.** {len(fld)} rated field bots ({', '.join(fld) or 'none'})"
        + (f" out of the replica's {nteams} teams" if nteams else '')
        + ": the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only "
        "these have rated games against our builds and the field score below is an expected score against them "
        "alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the "
        "replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a "
        "broken bot) are not games and are left out.", '',
        f"Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). "
        f"Field score = expected score against every rated field bot ({len(fld)}), one game each; vs higher = the "
        f"same against only the field bots rated above, with their count.", '',
        '| build | kind | rating | rank | games | record | field score | vs higher |', '|---|---|---|---|---|---|---|---|']
    # An accepted build with no games of its own yet (the champion before its control block) keeps its row, at the
    # rating of the candidate it was accepted as where that played (its accepting blocks: biased up).
    order = {p: i for i, p in enumerate(a['accepted'])}
    for p in sorted(set(a['ours']) | set(a['accepted']),
                    key=lambda p: (elolib.kind(p) != 'ours', order.get(p, 99), elolib.build_of(p))):
        c = p if games.get(p) else a['via'].get(p)
        if not c:
            lines.append(f"| {elolib.build_of(p)} | accepted, no games yet | – | – | 0 | – | – | – |")
            continue
        lines.append(f"| {elolib.build_of(p)} | {KIND_TEXT[elolib.kind(p)]}"
                     f"{'' if c == p else f', no games yet: as {elolib.build_of(c)}'} | {R[c]:.0f} ± {1.96 * SE[c]:.0f} | "
                     f"{a['rank'][c]} of {len(a['players'])} | {games[c]} | {wins[c]}-{games[c] - wins[c]} | "
                     f"{elolib.field_score(R, c, fld):.1%} | {higher(a, c)} |")
    if summary:
        lines += ['', 'Sources (`tools/progress/games.py`):', ''] + [f'- {l}' for l in summary]
    missing = [elolib.build_of(p) for p in a['accepted'] if not games[p]]
    if missing:
        lines += ['', f"Accepted builds with no recorded game: {', '.join(missing)}."]
    if a['via']:
        lines += ['', "Accepted builds whose code also played as a candidate: " + ', '.join(
            f"{elolib.build_of(p)} = {elolib.build_of(c)} ({games[c]} games, {wins[c]}-{games[c] - wins[c]})"
            for p, c in a['via'].items()) + ". Those games stay under the candidate's name: where they are the "
            "panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). "
            "progress.png shows them beside the build's own games as hollow grey points."]
    lines += ['', '![ratings](elo.png)', '', '![accepted builds](progress.png)', '',
              "No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds "
              "spread over several days and a field larger than a handful of bots.", '',
              "All players. Our record = the win rate and W-L against the bot of the latest accepted build with "
              "games of its own that met it.", '',
              '| rank | player | kind | rating | ± 95% | games | W-L | our record |', '|---|---|---|---|---|---|---|---|']
    for p in a['players']:
        name = f'**{p}**' if not elolib.is_field(p) else p
        lines.append(f"| {a['rank'][p]} | {name} | {KIND_TEXT[elolib.kind(p)]} | {R[p]:.0f} | {1.96 * SE[p]:.0f} | "
                     f"{games[p]} | {wins[p]}-{games[p] - wins[p]} | "
                     f"{our_record(a, p) if elolib.is_field(p) else ''} |")
    if a['unmet']:
        lines += ['', 'Replica teams with no recorded game: ' + ', '.join(a['unmet']) + '.']
    lines += ['', 'Every pairing (W-L of the first player; where the games were played):', '',
              '| player | opponent | games | W-L | win % | where |', '|---|---|---|---|---|---|']
    pairs = sorted(((p, q) for p, q in a['rec'] if a['rank'][p] < a['rank'][q]),
                   key=lambda pq: (a['rank'][pq[0]], a['rank'][pq[1]]))
    for p, q in pairs:
        w, n = a['rec'][p, q]
        lines.append(f"| {p} | {q} | {n} | {w}-{n - w} | {w / n:.0%} | {', '.join(sorted(a['src'][frozenset((p, q))]))} |")
    return '\n'.join(lines) + '\n'


def render_elo_png(a, path, ngames):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.lines import Line2D
    P = a['players']
    fig, ax = plt.subplots(figsize=(8, max(3.2, 1.2 + 0.32 * len(P))))
    ys = list(range(len(P)))[::-1]
    for y, p in zip(ys, P):
        c = COLOR[elolib.kind(p)]
        ax.errorbar(a['R'][p], y, xerr=1.96 * a['SE'][p], fmt='o', ms=4, color=c, ecolor=c, elinewidth=1, capsize=0,
                    mfc='white' if elolib.kind(p) == 'cand' else c)
    ax.set_yticks(ys)
    ax.set_yticklabels(P, fontsize=8)
    for t, p in zip(ax.get_yticklabels(), P):
        k = elolib.kind(p)
        t.set_color(COLOR[k] if k != 'field' else 'black')
        if k == 'ours': t.set_fontweight('bold')
    ax.set_xlabel('rating (Bradley-Terry, Elo scale), 95% interval relative to the mean rating')
    ax.grid(axis='x', alpha=.3)
    ax.set_title(f"Ratings: {ngames} games; our builds in red")
    ax.set_ylim(-1, len(P))
    handles = [Line2D([], [], marker='o', ls='', color=COLOR[k], mfc='white' if k == 'cand' else COLOR[k], label=lab)
               for k, lab in (('ours', 'accepted build'), ('cand', 'candidate'), ('spar', 'sparring partner'),
                              ('field', 'field bot'))
               if any(elolib.kind(p) == k for p in P)]
    ax.legend(handles=handles, fontsize=7, loc='lower right')
    fig.tight_layout()
    fig.savefig(path + '.tmp.png', dpi=120)
    plt.close(fig)
    os.replace(path + '.tmp.png', path)


def render_progress_png(a, path, ngames):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    via = a.get('via') or {}
    subs = [p for p in a['accepted'] if p in a['played'] or p in via]
    R, SE, fld = a['R'], a['SE'], a['field']
    own = [i for i, p in enumerate(subs) if p in a['played']]
    fs = [100 * elolib.field_score(R, subs[i], fld) for i in own]
    x = list(range(len(subs)))
    fig, (a1, a2) = plt.subplots(2, 1, figsize=(8, 6), sharex=True)
    a1.errorbar(own, [R[subs[i]] for i in own], yerr=[1.96 * SE[subs[i]] for i in own], fmt='o-', color='#c0392b',
                capsize=4, label="the build's own games")
    vx = [i for i, p in enumerate(subs) if p in via]
    if vx:
        a1.errorbar([i + 0.2 for i in vx], [R[via[subs[i]]] for i in vx], yerr=[1.96 * SE[via[subs[i]]] for i in vx],
                    fmt='o', mfc='white', color='0.55', capsize=3,
                    label="its games as the candidate before acceptance (accepting blocks: biased up)")
        a1.legend(fontsize=7, loc='upper center')
        for i in vx:
            if subs[i] not in a['played']:
                a1.annotate(f'as {elolib.build_of(via[subs[i]])}', (i + 0.2, R[via[subs[i]]]), textcoords='offset points',
                            xytext=(6, -3), fontsize=8, color='0.4')
    a1.set_ylabel('rating (BT, Elo scale)')
    a1.grid(alpha=.3)
    a1.set_title(f'Accepted builds ({ngames} games; {len(fld)} rated field bots)')
    a2.plot(own, fs, 'o-', color='#2471a3')
    a2.set_ylabel('expected field score %')
    a2.set_ylim(0, 100)
    a2.grid(alpha=.3)
    a2.set_xticks(x)
    a2.set_xticklabels([elolib.build_of(p) for p in subs], fontsize=9)
    a2.set_xlim(-0.5, max(len(subs) - 0.5, 0.5))
    for i, v in zip(own, fs):
        a2.annotate(f'{v:.0f}%', (i, v), textcoords='offset points', xytext=(0, 6), ha='center', fontsize=8)
    for i in [i for i in vx if subs[i] not in a['played']]:
        v = 100 * elolib.field_score(R, via[subs[i]], fld)
        a2.plot([i], [v], 'o', mfc='white', color='0.55')
        a2.annotate(f'{v:.0f}% (as {elolib.build_of(via[subs[i]])})', (i, v), textcoords='offset points', xytext=(0, 6),
                    ha='center', fontsize=8, color='0.4')
    missing = [p for p in a['accepted'] if p not in a['played']]
    if missing:
        a2.annotate(f"no games of its own yet: {', '.join(elolib.build_of(p) for p in missing)}"
                    + (' (hollow: its games as the candidate)' if any(p in via for p in missing) else ''),
                    (0.01, 0.03), xycoords='axes fraction', fontsize=8, color='0.4')
    fig.tight_layout()
    fig.savefig(path + '.tmp.png', dpi=110)
    plt.close(fig)
    os.replace(path + '.tmp.png', path)


def read_summary():
    try:
        with open(os.path.join(elolib.CACHE, 'games-summary.txt')) as fh:
            return [l.strip() for l in fh if l.strip()]
    except OSError:
        return []


def main(argv=None):
    elolib.use_venv(__file__)
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--build', default='')
    ap.add_argument('--out-dir', default=elolib.PROGRESS)
    o = ap.parse_args(argv)
    rows = elolib.load()
    try:
        with open(elolib.REPLICA_JSON) as fh:
            bundle = json.load(fh)
    except (OSError, ValueError):
        bundle = None
    a = analyse(rows, bundle)
    R, SE, games, wins = a['R'], a['SE'], a['games'], a['wins']
    if o.build:
        p = next((q for q in games if elolib.build_of(q) == o.build or q == o.build), None)
        if not p:
            sys.exit(f'elo.py: {o.build} has no recorded games')
        w, lo, hi = elolib.wilson(wins[p], games[p])
        print(f"{p}: {wins[p]}/{games[p]} = {w:.1%} [{lo:.1%}, {hi:.1%}]; rating {R[p]:.0f} ± {1.96 * SE[p]:.0f}, "
              f"rank {a['rank'][p]} of {len(a['players'])}; field score {elolib.field_score(R, p, a['field']):.1%} "
              f"vs {len(a['field'])} rated field bots")
        return 0
    md = os.path.join(o.out_dir, 'ELO.md')
    with open(md + '.tmp', 'w') as fh:
        fh.write(render_md(rows, a, bundle, read_summary()))
    os.replace(md + '.tmp', md)
    for p in a['ours']:
        print(f"{elolib.build_of(p):8} {KIND_TEXT[elolib.kind(p)]:9} {R[p]:5.0f} ± {1.96 * SE[p]:3.0f}  "
              f"{wins[p]}-{games[p] - wins[p]}  field score {elolib.field_score(R, p, a['field']):.1%}")
    try:
        import matplotlib  # noqa: F401
    except ImportError:
        print('charts skipped: no matplotlib (create .venv-progress: see tools/progress/requirements.txt)')
        return 1
    render_elo_png(a, os.path.join(o.out_dir, 'elo.png'), len(rows))
    render_progress_png(a, os.path.join(o.out_dir, 'progress.png'), len(rows))
    print(f"wrote ELO.md, elo.png, progress.png ({len(rows)} games, {len(a['players'])} players)")
    return 0


if __name__ == '__main__':
    sys.exit(main())
