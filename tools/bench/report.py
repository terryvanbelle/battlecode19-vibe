#!/usr/bin/env python3
"""Join field.tsv + compile.tsv + smoke.jsonl into the benchmark roster (no source is read).

    python3 -I tools/bench/report.py [--md BENCHMARK.md]   -> tools/bench/roster.tsv, summary on stdout; with --md the
        roster table between the <!-- roster:begin --> / <!-- roster:end --> markers of that file is regenerated

roster.tsv: name  repo  commit  language  kind  path  last_commit  compile  smoke  wins  init_fail  exceptions
            timeouts(+clock-frozen)  note
exceptions: errors in the bot's errlog sample (first 200 errors per game) that are not refusals of illegal actions.
smoke: ok (2 games, no init failure / exception / timeout), errors (game finished but the bot threw, timed out or
failed init), crash (the game itself did not finish), or '-' (not run).
"""
import json, os, re
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
TOOLS = Path(__file__).resolve().parent


def tsv(p):
    if not Path(p).exists(): return []
    ls = Path(p).read_text().splitlines()
    h = ls[0].split('\t')
    return [dict(zip(h, l.split('\t'))) for l in ls[1:] if l.strip()]


def main():
    fetch = {r['dir']: r for r in tsv(ROOT / '_fetch.tsv')}
    comp = {r['name']: r for r in tsv(ROOT / 'compile.tsv')}
    games = {}
    sm = ROOT / 'smoke.jsonl'
    if sm.exists():
        for l in sm.read_text().splitlines():
            if not l.strip(): continue
            g = json.loads(l)
            games.setdefault(g['name'], {})[(g['seed'], g['side'])] = g   # last row per cell wins
    rows = []
    for e in tsv(TOOLS / 'field.tsv'):
        n = e['name']; repo_dir = e['path'].split('/')[1]; f = fetch.get(repo_dir, {})
        c = comp.get(n, {})
        gs = list(games.get(n, {}).values()) if c.get('status') == 'ok' else []
        wins = sum(1 for g in gs if g.get('bot_won'))
        tot = lambda k: sum((g.get('bot') or {}).get(k, 0) for g in gs)
        inif, exc, to = tot('init_fail'), sum(g.get('exc_sample', 0) for g in gs), tot('timeouts') + tot('frozen')
        crash = [g for g in gs if 'error' in g]
        if not gs: smoke = '-'
        elif crash: smoke = 'crash'
        elif inif or exc or to: smoke = 'errors'
        else: smoke = 'ok'
        note = c.get('error', '') if c.get('status') == 'fail' else ''
        if crash: note = re.sub(r'\s+', ' ', crash[0]['error'])[-160:]
        elif gs and (inif or exc or to):
            fe = next((g.get('first_errors') for g in gs if g.get('first_errors')), '')
            note = re.sub(r'\s+', ' ', fe)[:160]
        rows.append([n, f.get('full_name', ''), f.get('commit', ''), e['language'], e['kind'], e['path'], e['last_commit'],
                     c.get('status', '-'), smoke, f'{wins}/{len(gs)}' if gs else '-', str(inif), str(exc), str(to), note])
    cols = ['name', 'repo', 'commit', 'language', 'kind', 'path', 'last_commit', 'compile', 'smoke', 'wins_vs_example',
            'init_fail', 'exceptions', 'timeouts', 'note']
    (TOOLS / 'roster.tsv').write_text('\t'.join(cols) + '\n' + ''.join('\t'.join(r).replace('\n', ' ') + '\n' for r in rows))
    import sys
    if '--md' in sys.argv:
        md = Path(sys.argv[sys.argv.index('--md') + 1])
        t = ['| # | name | repo @ commit | lang | kind | compile | smoke | wins vs starter | init fail | exc | timeouts | note |',
             '|---|---|---|---|---|---|---|---|---|---|---|---|']
        for i, r in enumerate(rows, 1):
            note = r[13].replace('|', '/')[:90]
            t.append(f'| {i} | {r[0]} | {r[1]} @ {r[2].split("_")[0]} | {r[3]} | {r[4]} | {r[7]} | {r[8]} | {r[9]} | '
                     f'{r[10]} | {r[11]} | {r[12]} | {note} |')
        txt = md.read_text()
        a, b = txt.index('<!-- roster:begin -->'), txt.index('<!-- roster:end -->')
        md.write_text(txt[:a] + '<!-- roster:begin -->\n' + '\n'.join(t) + '\n' + txt[b:])
    from collections import Counter
    print(f'entrants {len(rows)}; compile {dict(Counter(r[7] for r in rows))}; smoke {dict(Counter(r[8] for r in rows))}; '
          f'by language {dict(Counter(r[3] for r in rows))}')


if __name__ == '__main__':
    main()
