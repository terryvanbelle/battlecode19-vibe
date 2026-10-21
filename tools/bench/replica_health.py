#!/usr/bin/env python3
"""Per-team bot health from the bc19 replica's finished matches (the ladder games are the smoke test of entrants that
smoke.sh did not reach). Reads only the public match list and the match archives' match.json (per-game, per-team
stats copied from tools/run_game.js by tools/galaxy19/saturn.py), through tools/galaxy19/client.py. Galaxy shows a
match's archive only to its participants, so each match is read as one of its teams (the field's own replica accounts
in ~/.bc19-galaxy/accounts.json, which also map team -> entrant). No replay or bot code is opened. Run where
accounts.json is current (the VM: the trickle registers teams there).

    python3 -I tools/bench/replica_health.py [--pages 50]   -> $BENCH_ROOT/replica-health.tsv, summary on stdout

match.json files are cached in $BENCH_ROOT/replica-matches/<id>.json (a finished match never changes).
replica-health.tsv: entrant  team  matches  games  wins  init_fail  exceptions  timeouts(+clock-frozen)
                    games_init_fail (games in which the team had any init failure)
"""
import hashlib, io, json, os, sys, zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS.parent / 'galaxy19'))
import client as cl  # noqa: E402

CACHE = ROOT / 'replica-matches'


def match_meta(c, m, s):
    p = CACHE / f'{m["id"]}.json'
    if p.exists():
        return json.loads(p.read_text())
    url = s.api('GET', f'/api/compete/{c.episode}/match/{m["id"]}/').get('replay_url')
    if not url:
        return None
    data = c.request('GET', url, raw=True, timeout=600)
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        meta = json.loads(z.read('match.json'))
    CACHE.mkdir(parents=True, exist_ok=True)
    p.with_suffix('.tmp').write_text(json.dumps(meta))
    p.with_suffix('.tmp').replace(p)
    return meta


def main():
    a = sys.argv[1:]
    pages = int(a[a.index('--pages') + 1]) if '--pages' in a else 50
    field = {l.split('\t')[0] for l in (TOOLS / 'field.tsv').read_text().splitlines()[1:] if l.strip()}
    acc = cl.load_accounts()
    # team -> entrant: the account's entrant (a team can carry another entrant's identical bundle), else the name rule
    entrant = {cl.team_name(n): n for n in field}
    entrant.update({t: a['entrant'] for t, a in acc.items() if a.get('entrant') in field})
    # a team registered under an older entrant name: matched by its uploaded bundle's digest (client.bot_zip's rule)
    dig = {}
    for n in sorted(field):
        f = ROOT / 'compiled' / n / 'bot.js'
        if f.exists():
            dig.setdefault(hashlib.sha256(b'bundle\0' + f.read_bytes()).hexdigest()[:16], n)
    entrant.update({t: dig[a['digest']] for t, a in acc.items() if t not in entrant and a.get('digest') in dig})
    c = cl.Client()
    sess = {}
    st = defaultdict(lambda: defaultdict(int))
    n_ok = 0
    for m in c.pages(f'/api/compete/{c.episode}/match/', limit=pages):
        if m.get('status') != 'OK!':
            continue
        names = {p.get('teamname') for p in m.get('participants') or []}
        if not names & set(entrant):
            continue
        who = next((t for t in sorted(names) if t in acc), None)
        if who is None:
            continue
        meta = match_meta(c, m, sess.setdefault(who, cl.session(c, acc, who)))
        if not meta:
            continue
        n_ok += 1
        for t in set(meta.get('teams', {}).values()):
            st[t]['matches'] += 1
        for g in meta.get('games', []):
            for tm in g.get('teams') or []:
                t = g.get(f'{tm.get("team")}_team')
                if t not in entrant:
                    continue
                s = st[t]
                s['games'] += 1
                s['wins'] += g.get('winner_team') == t
                s['init_fail'] += tm.get('init_fail', 0)
                s['games_init_fail'] += bool(tm.get('init_fail'))
                s['exceptions'] += tm.get('exceptions', 0)
                s['timeouts'] += tm.get('timeouts', 0) + tm.get('frozen', 0)
    cols = ['matches', 'games', 'wins', 'init_fail', 'exceptions', 'timeouts', 'games_init_fail']
    rows = sorted((entrant[t], t, s) for t, s in st.items() if t in entrant)
    (ROOT / 'replica-health.tsv').write_text('\t'.join(['entrant', 'team'] + cols) + '\n' + ''.join(
        '\t'.join([e, t] + [str(s[k]) for k in cols]) + '\n' for e, t, s in rows))
    clean = sum(1 for _, _, s in rows if s['games'] and not (s['init_fail'] or s['exceptions'] or s['timeouts']))
    print(f'replica: {n_ok} finished matches with field teams; {len(rows)} entrants played, {clean} without init '
          f'failure / exception / timeout')


if __name__ == '__main__':
    main()
