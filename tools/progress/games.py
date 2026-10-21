#!/usr/bin/env python3
"""Rebuild progress/games.csv (tools/progress/elolib.py) from every recorded game:

  1. local batches: the VM's tools/batch.js result files (~/runs/*.jsonl, ~/projects/vibe/2019/out/*.jsonl), mirrored
     by tools/progress-refresh.sh into <cache>/batches/{runs,out}/ (never deleted there, so a file removed on the VM
     keeps its games). Skipped: rows with an `error`, round-0 init failures (machine load, not bots: tools/batch.js
     retries them), unparseable lines (a batch still writing).
  2. the galaxy replica (<cache>/replica.json, tools/progress/replica.py): every finished match. Ours come game by
     game from the archives that `contest19.py fetch --new` downloads (~/projects/vibe/bc19-galaxy-replays/<id>/
     match.json); other matches (and ours not yet downloaded) from the participants' scores.

Players are named by code hash through bots/ROSTER.tsv (elolib's docstring); a candidate bundle dist/<x> not in the
roster is cand:<x> (cand:<x>@<hash> when one name had several bundles). Our replica submissions are named by
tools/progress/submissions.tsv, else the first word of the submission's description when it is a roster name, else
us:sub<id>. The file is rebuilt from scratch on every run (rows sorted by play time).

  python3 tools/progress/games.py [--cache DIR] [--replays DIR]
"""
import argparse
import collections
import datetime as dt
import csv
import glob
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import elolib  # noqa: E402

REPLAYS = os.path.expanduser(os.environ.get('GALAXY19_REPLAYS', '~/projects/vibe/bc19-galaxy-replays'))
SUBMISSIONS = os.path.join(HERE, 'submissions.tsv')
FIELD_ALIASES = {'bots/example': elolib.STARTER}   # the replica's bc19-starter is bots/example


def init_failure(rounds, reason):
    return str(rounds) == '0' and 'init_failure' in (reason or '')


# ---------------------------------------------------------------- local batches
def read_jsonl(path):
    """(rows, bad line count) of one batch file."""
    rows, bad = [], 0
    with open(path, errors='replace') as fh:
        for i, line in enumerate(fh, 1):
            line = line.strip()
            if not line:
                continue
            try:
                r = json.loads(line)
            except ValueError:
                bad += 1
                continue
            if isinstance(r, dict):
                r['_line'] = i
                rows.append(r)
    return rows, bad


def local_namer(rows, by_hash):
    """name(path, hash) for the batch rows: roster hash first, then FIELD_ALIASES, then cand:/spar: by directory."""
    hashes = collections.defaultdict(set)
    for r in rows:
        for p, h in ((r.get('a'), r.get('a_hash')), (r.get('b'), r.get('b_hash'))):
            if p and h not in by_hash:
                hashes[os.path.basename(os.path.normpath(p))].add(h)

    def name(path, h):
        if h in by_hash:
            return elolib.roster_player(by_hash[h])
        path = os.path.normpath(path or '?')
        if path in FIELD_ALIASES:
            return FIELD_ALIASES[path]
        base = os.path.basename(path)
        prefix = 'spar:' if path.startswith('bots' + os.sep) else 'cand:'
        return prefix + base + (f'@{(h or "")[:6]}' if len(hashes[base]) > 1 else '')
    return name


def local_rows(sources, by_hash):
    """sources: [(run, [batch rows])] -> (games.csv rows, skip counts)."""
    skipped = collections.Counter()
    name = local_namer([r for _, rs in sources for r in rs], by_hash)
    out = []
    for run, rs in sources:
        for r in rs:
            if r.get('error'):
                skipped['error'] += 1; continue
            if init_failure(r.get('rounds'), r.get('reason')):
                skipped['init failure'] += 1; continue
            if r.get('winner_is_a') not in (0, 1, True, False) or not r.get('a_hash') or not r.get('b_hash'):
                skipped['malformed'] += 1; continue
            seed = r.get('seed', '')
            out.append({'run': run, 'seq': r['_line'], 'teamA': name(r.get('a'), r['a_hash']),
                        'teamB': name(r.get('b'), r['b_hash']), 'map': f'seed-{seed}' if seed != '' else '',
                        'winner': 'A' if r['winner_is_a'] else 'B', 'rounds': r.get('rounds', ''),
                        'reason': r.get('reason', ''), 'seed': seed, 'a_side': r.get('a_side', ''),
                        'time': utc_key(r.get('t') or '')})
    return out, skipped


def batch_sources(cache):
    """[(run, rows)] for <cache>/batches/<dir>/*.jsonl, and the count of unparseable lines."""
    out, bad = [], 0
    for f in sorted(glob.glob(os.path.join(cache, 'batches', '*', '*.jsonl'))):
        rows, b = read_jsonl(f)
        bad += b
        d = os.path.basename(os.path.dirname(f))
        out.append((f'batch-{d}/{os.path.basename(f)[:-6]}', rows))
    return out, bad


# ---------------------------------------------------------------- replica
def load_overrides(path=None):
    """{submission id: build name} from submissions.tsv (columns submission, build, note)."""
    path = path or SUBMISSIONS
    if not os.path.exists(path):
        return {}
    with open(path) as fh:
        return {int(r['submission']): r['build'].strip()
                for r in csv.DictReader((l for l in fh if not l.startswith('#')), delimiter='\t')
                if (r.get('submission') or '').strip().isdigit() and (r.get('build') or '').strip()}


def submission_players(submissions, overrides, roster_names):
    """{submission id: player} for our submissions."""
    out = {}
    for s in submissions:
        sid = s['id']
        if sid in overrides:
            n = overrides[sid]
        else:
            first = ((s.get('description') or '').split() or [''])[0].rstrip(':,;')
            n = first if first in roster_names else None
        out[sid] = elolib.roster_player(n) if n in roster_names else (f'us:{n}' if n else f'us:sub{sid}')
    return out


def replica_rows(bundle, replays, sub_player):
    """games.csv rows for every finished replica match; -> (rows, counts)."""
    team = bundle.get('team') or elolib.OUR_TEAM
    our_sub = {}
    for m in bundle.get('ours') or []:
        for p in m.get('participants') or []:
            if p.get('teamname') == team and p.get('submission') is not None:
                our_sub[m['id']] = p['submission']
    n = collections.Counter()
    out = []
    for m in bundle.get('matches') or []:
        if m.get('status') != 'OK!':
            continue
        ps = sorted(m.get('participants') or [], key=lambda p: p.get('player_index', 0))
        if len(ps) != 2 or any(p.get('score') is None for p in ps):
            n['no score'] += 1; continue

        def player(tname):
            if tname != team:
                return tname
            s = our_sub.get(m['id'])
            return sub_player.get(s, f'us:sub{s}') if s is not None else 'us:?'
        run, t = f"galaxy-{m['id']}", utc_key(m.get('created') or '')
        arch = os.path.join(replays, str(m['id']), 'match.json')
        games = None
        if os.path.exists(arch):
            try:
                with open(arch) as fh:
                    mj = json.load(fh)
                games = [(g, mj['teams']) for g in mj.get('games') or []]
            except (OSError, ValueError, KeyError):
                n['bad archive'] += 1
        if games is not None:
            n['matches from archives'] += 1
            for g, teams in games:
                if init_failure(g.get('rounds'), g.get('reason')) or g.get('winner_label') not in ('A', 'B'):
                    n['archive games skipped'] += 1; continue
                out.append({'run': run, 'seq': g.get('game', ''), 'teamA': player(teams['A']),
                            'teamB': player(teams['B']), 'map': g.get('map', ''), 'winner': g['winner_label'],
                            'rounds': g.get('rounds', ''), 'reason': g.get('reason', ''), 'seed': g.get('seed', ''),
                            'a_side': 'red' if g.get('red') == 'A' else 'blue' if g.get('red') == 'B' else '',
                            'time': t})
            continue
        n['matches from scores'] += 1
        a, b = player(ps[0]['teamname']), player(ps[1]['teamname'])
        k = 0
        for winner, cnt in (('A', ps[0]['score']), ('B', ps[1]['score'])):
            for _ in range(int(cnt)):
                k += 1
                out.append({'run': run, 'seq': k, 'teamA': a, 'teamB': b, 'map': '', 'winner': winner, 'rounds': '',
                            'reason': 'score', 'seed': '', 'a_side': '', 'time': t})
    return out, n


def utc_key(t):
    """An ISO time with any offset -> 'YYYY-MM-DDTHH:MM:SSZ' (UTC, sortable); '' when missing or unparseable."""
    try:
        x = dt.datetime.fromisoformat(t.replace('Z', '+00:00'))
    except (ValueError, AttributeError):
        return ''
    return (x if x.tzinfo else x.replace(tzinfo=dt.timezone.utc)).astimezone(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')


def build(cache=None, replays=None, roster_path=None, overrides_path=None):
    """-> (rows sorted by play time, summary lines)."""
    cache, replays = cache or elolib.CACHE, replays or REPLAYS
    ros = elolib.roster(roster_path)
    by_hash = {h: n for n, h in ros}
    sources, bad = batch_sources(cache)
    loc, skipped = local_rows(sources, by_hash)
    summary = [f'local: {len(loc)} games from {len(sources)} batch files'
               + (f" (skipped: {', '.join(f'{v} {k}' for k, v in sorted(skipped.items()))}"
                  f"{f', {bad} unparseable lines' if bad else ''})" if skipped or bad else '')]
    rep = []
    try:
        with open(os.path.join(cache, 'replica.json')) as fh:
            bundle = json.load(fh)
    except (OSError, ValueError):
        bundle = None
        summary.append('replica: no cached bundle (run tools/progress/replica.py fetch)')
    if bundle:
        subs = submission_players(bundle.get('submissions') or [], load_overrides(overrides_path), {n for n, _ in ros})
        rep, cnt = replica_rows(bundle, replays, subs)
        summary.append(f"replica: {len(rep)} games ({', '.join(f'{v} {k}' for k, v in sorted(cnt.items()))}), "
                       f"fetched {bundle.get('fetched_at')}")
    rows = sorted(loc + rep, key=lambda r: (r['time'], r['run'], int(r['seq']) if str(r['seq']).isdigit() else 0))
    return rows, summary


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--cache', default=elolib.CACHE)
    ap.add_argument('--replays', default=REPLAYS)
    ap.add_argument('--out', default=elolib.GAMES)
    a = ap.parse_args(argv)
    rows, summary = build(a.cache, a.replays)
    elolib.write(rows, a.out)
    os.makedirs(a.cache, exist_ok=True)
    with open(os.path.join(a.cache, 'games-summary.txt'), 'w') as fh:   # quoted in ELO.md
        fh.write('\n'.join(summary) + '\n')
    for s in summary:
        print(s)
    print(f'wrote {os.path.relpath(a.out, elolib.REPO)}: {len(rows)} games')
    return 0


if __name__ == '__main__':
    sys.exit(main())
