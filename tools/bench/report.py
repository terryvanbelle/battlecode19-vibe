#!/usr/bin/env python3
"""Join field.tsv + compile.tsv + smoke.jsonl + replica-health.tsv into the benchmark roster (no source is read).

    python3 -I tools/bench/report.py [--md BENCHMARK.md]   -> tools/bench/roster.tsv, summary on stdout; with --md the
        roster table between the <!-- roster:begin --> / <!-- roster:end --> markers of that file is regenerated

roster.tsv columns:
  name repo commit language kind path last_commit compile
  smoke            ok: the smoke games vs the starter (smoke.sh) showed no init failure / exception / timeout;
                   inconclusive: problems, but only in games run while the VM's 1-minute load average was above 8 (or
                   not logged), where contention alone makes big bundles miss the vm2 load budget; errors / crash
                   (the game did not finish): the same at load <= 8; '-': no smoke game
  wins_vs_example init_fail exceptions timeouts     over the smoke games (exceptions: errors in the bot's errlog
                   sample, first 200 per game, that are not refusals of illegal actions; timeouts include
                   clock-frozen turns)
  max_load         highest load average logged around the smoke games
  replica_games replica_wins replica_init_fail replica_exceptions replica_timeouts      the entrant's games on the
                   bc19 replica ladder (tools/bench/replica_health.py; exceptions there are all thrown exceptions)
  health           ok (smoke clean), else from the replica games when there are any (ok (replica) / errors
                   (replica)), else the smoke verdict; 'untested' when neither ran, 'compile fail'
  note             compile error, the first crash / error messages, replica init-failure share
Only smoke rows of the current bundle (hash in the row key) count.
"""
import hashlib, json, os, re
from collections import Counter
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
TOOLS = Path(__file__).resolve().parent
LOAD_MAX = 8


def tsv(p):
    if not Path(p).exists(): return []
    ls = Path(p).read_text().splitlines()
    h = ls[0].split('\t')
    return [dict(zip(h, l.split('\t'))) for l in ls[1:] if l.strip()]


_hash = {}


def bundle_hash(name):
    if name not in _hash:
        b = ROOT / 'compiled' / name / 'bot.js'
        _hash[name] = hashlib.sha256(b.read_bytes()).hexdigest()[:16] if b.exists() else None
    return _hash[name]


def loaded(g):
    return not g.get('load') or max(g['load']) > LOAD_MAX


def error_kinds(fe):
    """The kinds of the sampled bot errors (engine messages and JavaScript error classes only: a bot's own message
    text is not repeated)."""
    out = []
    if 'robot.hook is not a function' in fe: out.append('robot.hook is not a function (engine, after an init failure)')
    if 'Script execution timed out' in fe: out.append('script timeout')
    fe = re.sub(r'(TypeError: )?robot\.hook is not a function|(Error: )?Script execution timed out', '', fe)
    out += sorted(set(re.findall(r'\b([A-Z][A-Za-z]*Error)\b', fe)) - {'Error'})
    if not out and fe.strip(): out.append('other bot errors')
    return '; '.join(out)


def main():
    import sys
    fetch = {r['dir']: r for r in tsv(ROOT / '_fetch.tsv')}
    comp = {r['name']: r for r in tsv(ROOT / 'compile.tsv')}
    rep = {r['entrant']: r for r in tsv(ROOT / 'replica-health.tsv')}
    games = {}
    sm = ROOT / 'smoke.jsonl'
    if sm.exists():
        for l in sm.read_text().splitlines():
            if not l.strip(): continue
            g = json.loads(l)
            if g['key'].split(':')[1] != bundle_hash(g['name']): continue        # an earlier bundle of the entrant
            games.setdefault(g['name'], {})[(g['seed'], g['side'])] = g   # last row per cell wins
    rows = []
    for e in tsv(TOOLS / 'field.tsv'):
        n = e['name']; repo_dir = e['path'].split('/')[1]; f = fetch.get(repo_dir, {})
        c = comp.get(n, {})
        gs = list(games.get(n, {}).values()) if c.get('status') == 'ok' else []
        wins = sum(1 for g in gs if g.get('bot_won'))
        tot = lambda k: sum((g.get('bot') or {}).get(k, 0) for g in gs)
        inif, exc, to = tot('init_fail'), sum(g.get('exc_sample', 0) for g in gs), tot('timeouts') + tot('frozen')
        bad = [g for g in gs if 'error' in g or (g.get('bot') or {}).get('init_fail') or g.get('exc_sample')
               or (g.get('bot') or {}).get('timeouts') or (g.get('bot') or {}).get('frozen')]
        crash = [g for g in gs if 'error' in g]
        if not gs: smoke = '-'
        elif not bad: smoke = 'ok'
        elif all(loaded(g) for g in bad): smoke = 'inconclusive'
        else: smoke = 'crash' if any('error' in g and not loaded(g) for g in bad) else 'errors'
        r = rep.get(n, {})
        rg = int(r.get('games') or 0)
        rbad = rg and any(int(r.get(k) or 0) for k in ('init_fail', 'exceptions', 'timeouts'))
        if c.get('status') != 'ok': health = 'compile fail'
        elif smoke == 'ok': health = 'ok'
        elif rg: health = 'errors (replica)' if rbad else 'ok (replica)'
        elif smoke == '-': health = 'untested'
        else: health = smoke
        note = c.get('error', '') if c.get('status') == 'fail' else ''
        if crash: note = re.sub(r'\s+', ' ', crash[0]['error'])[-160:]
        elif bad:
            note = error_kinds(' '.join(g.get('first_errors') or '' for g in gs))
        if rg and int(r.get('games_init_fail') or 0):
            note = (f'replica: init failures in {r["games_init_fail"]}/{rg} games; ' + note).strip('; ')
        load = max((x for g in gs for x in g.get('load') or []), default=None)
        rows.append(dict(name=n, repo=f.get('full_name', ''), commit=f.get('commit', ''), language=e['language'],
                         kind=e['kind'], path=e['path'], last_commit=e['last_commit'], compile=c.get('status', '-'),
                         smoke=smoke, wins_vs_example=f'{wins}/{len(gs)}' if gs else '-', init_fail=str(inif),
                         exceptions=str(exc), timeouts=str(to), max_load='' if load is None else f'{load:g}',
                         replica_games=str(rg), replica_wins=r.get('wins', '0'), replica_init_fail=r.get('init_fail', '0'),
                         replica_exceptions=r.get('exceptions', '0'), replica_timeouts=r.get('timeouts', '0'),
                         health=health, note=note))
    cols = list(rows[0])
    (TOOLS / 'roster.tsv').write_text('\t'.join(cols) + '\n' + ''.join(
        '\t'.join(r[k].replace('\t', ' ').replace('\n', ' ') for k in cols) + '\n' for r in rows))
    if '--md' in sys.argv:
        md = Path(sys.argv[sys.argv.index('--md') + 1])
        t = ['| # | name | repo @ commit | lang | kind | compile | smoke (wins/games) | smoke init/exc/timeouts | '
             'replica wins/games | replica init/exc/timeouts | health | note |',
             '|---|---|---|---|---|---|---|---|---|---|---|---|']
        for i, r in enumerate(rows, 1):
            note = r['note'].replace('|', '/')[:90]
            sm_ = '-' if r['smoke'] == '-' else f'{r["smoke"]} {r["wins_vs_example"]}'
            ite = f'{r["init_fail"]}/{r["exceptions"]}/{r["timeouts"]}' if r['smoke'] != '-' else ''
            rp = f'{r["replica_wins"]}/{r["replica_games"]}' if r['replica_games'] != '0' else '-'
            rite = (f'{r["replica_init_fail"]}/{r["replica_exceptions"]}/{r["replica_timeouts"]}'
                    if r['replica_games'] != '0' else '')
            t.append(f'| {i} | {r["name"]} | {r["repo"]} @ {r["commit"].split("_")[0]} | {r["language"]} | '
                     f'{r["kind"]} | {r["compile"]} | {sm_} | {ite} | {rp} | {rite} | {r["health"]} | {note} |')
        txt = md.read_text()
        a, b = txt.index('<!-- roster:begin -->'), txt.index('<!-- roster:end -->')
        md.write_text(txt[:a] + '<!-- roster:begin -->\n' + '\n'.join(t) + '\n' + txt[b:])
    print(f'entrants {len(rows)}; by language {dict(Counter(r["language"] for r in rows))}; '
          f'compile {dict(Counter(r["compile"] for r in rows))}; smoke {dict(Counter(r["smoke"] for r in rows))}; '
          f'health {dict(Counter(r["health"] for r in rows))}')


if __name__ == '__main__':
    main()
