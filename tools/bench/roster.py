#!/usr/bin/env python3
"""Build the 2019 benchmark field from bots.tsv by NAME, DATE and HASH only (no source is read).

    python3 -I tools/bench/roster.py      -> tools/bench/field.tsv, tools/bench/candidates.tsv, funnel on stdout

Per repo (after dropping example bots, bots at official monorepo paths, junk names and field-exclude.txt entries):
  rule 'name': highest name score (final > submission > latest > main/current > postqual > qual > seeding > sprint;
               higher version numbers break ties; bundles of a dir bot rank just below it)
  rule 'last-commit': newest last commit touching the bot path (dates.py), name score breaks ties
Both picks enter when they differ. Identical sources (same sha256) across repos are merged, keeping the team's own
repo (non-fork, earliest created) as the name. Entrant name: <owner>.<repo>, or <owner>.<repo>-<bot leaf> when a repo
contributes two entrants.
"""
import os, re
from collections import defaultdict
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
TOOLS = Path(__file__).resolve().parent
JUNK = re.compile(r'(^|[^a-z])(test|tests|testing|tester|template|example|examples|exampy|sample|starter|old|archive|archived|'
                  r'backup|deprecated|scratch|dummy|donothing|nothing|tutorial|lecture|copy|tmp|temp|playground|'
                  r'examplefuncsplayer|node_modules|dist|build)([^a-z]|$)', re.I)


def tsv(p):
    ls = Path(p).read_text().splitlines()
    h = ls[0].split('\t')
    return [dict(zip(h, l.split('\t'))) for l in ls[1:] if l.strip()]


def name_score(rel):
    n = rel.lower()
    leaf = n.rstrip('/').split('/')[-1]
    s = 0
    for word, v in [('final', 1000), ('submi', 950), ('latest', 900), ('current', 850), ('main', 840), ('postqual', 800),
                    ('qual', 700), ('seed', 650), ('sprint', 500), ('newbie', 400), ('hs', 0)]:
        if word in leaf: s = max(s, v)
        elif word in n: s = max(s, v - 100)
    nums = [int(x) for x in re.findall(r'\d+', leaf) if len(x) < 5]
    s += min(90, nums[-1]) if nums else 0
    if leaf in ('bot', 'robot', 'player', 'mybot', 'src', '.', 'bots'): s += 50
    s -= 10 * n.count('/')
    if re.search(r'(^|[^a-z])(safe|mini|min|minified|compiled|bundle|out)([^a-z]|$)', leaf): s -= 20
    return s


def main():
    fetch = {r['dir']: r for r in tsv(ROOT / '_fetch.tsv')}
    disc = {r['full_name']: r for r in tsv(ROOT / '_discovery.tsv')}
    bots = tsv(ROOT / 'bots.tsv')
    dates = {(r['repo_dir'], r['rel_path']): r['last_commit'] for r in tsv(ROOT / 'dates.tsv')} if (ROOT / 'dates.tsv').exists() else {}
    excl = {}
    ef = TOOLS / 'field-exclude.txt'
    if ef.exists():
        for l in ef.read_text().splitlines():
            if l.strip() and not l.startswith('#'):
                k, _, why = l.partition(' ')
                excl[k] = why.strip()
    by_repo = defaultdict(list)
    stat = defaultdict(lambda: defaultdict(int))
    for b in bots:
        r = b['repo_dir']
        stat[r]['bots'] += 1
        if b['example']: stat[r]['example'] += 1; continue
        if b['official_path']: stat[r]['official'] += 1; continue
        if r in excl or f"{r}/{b['rel_path']}" in excl: stat[r]['excluded'] += 1; continue
        if JUNK.search(b['rel_path']) and 'final' not in b['rel_path'].lower(): stat[r]['junk'] += 1; continue
        b['date'] = dates.get((r, b['rel_path']), '')
        by_repo[r].append(b)
    picks = defaultdict(set)                       # sha -> {(repo, rel, rule)}
    for r, bs in by_repo.items():
        a = max(bs, key=lambda b: (name_score(b['rel_path']), b['date'], b['kind'] == 'dir'))
        c = max(bs, key=lambda b: (b['date'], name_score(b['rel_path']), b['kind'] == 'dir'))
        for b, rule in ((a, 'name'), (c, 'last-commit')):
            picks[b['sha256']].add((r, b['rel_path'], rule))
    allsha = defaultdict(set)
    for b in bots:
        allsha[b['sha256']].add(b['repo_dir'])
    bot_by = {(b['repo_dir'], b['rel_path']): b for b in bots}

    def own_key(r):
        d = disc.get(fetch[r]['full_name'], {})
        return (d.get('fork') == 'True', d.get('created_at') or '9999', r)
    entr = []
    for sha, ms in picks.items():
        holders = sorted({m[0] for m in ms} | allsha[sha], key=own_key)
        repo = holders[0]
        cand = [m for m in ms if m[0] == repo] or sorted(ms)
        rel = cand[0][1]
        b = bot_by.get((repo, rel)) or next(x for x in bots if x['repo_dir'] == repo and x['sha256'] == sha)
        rules = sorted({m[2] for m in ms if m[0] == cand[0][0]})
        entr.append(dict(b=b, repo=repo, rel=b['rel_path'], rule='+'.join(rules), aka=[h for h in holders[1:]]))
    per_repo = defaultdict(list)
    for e in entr: per_repo[e['repo']].append(e)
    rows = []
    for e in entr:
        owner, _, repo = fetch[e['repo']]['full_name'].partition('/')
        nm = f'{owner}.{repo}'
        if len(per_repo[e['repo']]) > 1:
            leaf = e['rel'].rstrip('/').split('/')[-1]
            nm += '-' + re.sub(r'\.(js|py)$', '', leaf if leaf != '.' else 'root')
        nm = re.sub(r'[^A-Za-z0-9._-]', '_', nm)
        b = e['b']
        rows.append([nm, b['lang'], f"repos/{e['repo']}/{b['rel_path']}".rstrip('/.'), b['files'], b['lines'],
                     b.get('date') or dates.get((e['repo'], b['rel_path']), ''), e['rule'], b['sha256'], b['kind'],
                     ','.join(fetch[a]['full_name'] for a in e['aka'])])
    rows.sort()
    (TOOLS / 'field.tsv').write_text('name\tlanguage\tpath\tfiles\tlines\tlast_commit\tpick_rule\tsha256\tkind\tsame_bot_also_in\n' +
                                     ''.join('\t'.join(r) + '\n' for r in rows))
    entr_repos = defaultdict(list)
    for r in rows: entr_repos[r[2].split('/')[1]].append(r[0])
    merged_into = {}
    for e in entr:
        for a in e['aka']: merged_into.setdefault(a, e['repo'])
    cl = ['full_name\thost\tsources\tfetch_verdict\tbots\texample_bots\tofficial_path_bots\tjunk_bots\tfate']
    for fn, d in sorted(disc.items()):
        dr = re.sub('/', '__', fn)
        fv = fetch.get(dr, {}).get('verdict', 'not-fetched')
        st = stat.get(dr, {})
        if dr in entr_repos: fate = 'entrant: ' + ','.join(entr_repos[dr])
        elif fv != 'bc19': fate = {'no-bot-files': 'no 2019 bot entry file (path list)', 'not-2019': 'no 2019 API names in sources',
                                   'official': 'official monorepo (excluded)', 'too-big': 'sources over 200 MB (aborted)'}.get(fv, fv)
        elif dr in excl: fate = 'excluded: ' + excl[dr]
        elif not st.get('bots'): fate = '2019 code but no bot entry/bundle (library or tooling only)'
        elif st.get('bots', 0) == st.get('example', 0) + st.get('official', 0): fate = 'only example/official bots'
        elif dr in by_repo: fate = 'duplicate of ' + fetch[merged_into.get(dr, '')]['full_name'] if dr in merged_into else 'picks are duplicates of another repo'
        else: fate = 'only junk-named bots (test/old/example...)'
        cl.append('\t'.join([fn, d['host'], d['sources'], fv, str(st.get('bots', 0)), str(st.get('example', 0)),
                             str(st.get('official', 0)), str(st.get('junk', 0)), fate]))
    (TOOLS / 'candidates.tsv').write_text('\n'.join(cl) + '\n')
    nrep19 = sum(1 for r in fetch.values() if r['verdict'] == 'bc19')
    langs = defaultdict(int)
    for r in rows: langs[r[1]] += 1
    print(f'candidates {len(disc)}; repos with 2019 code {nrep19}; bots {len(bots)}; '
          f'non-example bots {sum(len(v) for v in by_repo.values())} in {len(by_repo)} repos; '
          f'distinct {len({b["sha256"] for v in by_repo.values() for b in v})}; entrants {len(rows)} {dict(langs)}')


if __name__ == '__main__':
    main()
