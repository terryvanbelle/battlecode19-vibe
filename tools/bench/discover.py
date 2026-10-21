#!/usr/bin/env python3
"""Discover public Battlecode 2019 (Crusade) bot repositories, by search METADATA only (no contents are read).

    tools/bench/discover.py [--no-code] [--forks-of FILE] [--out FILE]

Sources (each candidate keeps every source that found it):
  repo:<q>      GitHub repository search (names, descriptions, topics, README), incl. fork:true variants
  win:<q>       every repo matching "battlecode" / "battle code", split by creation date until each window < 1000
  code:<q>      GitHub code search for 2019-only API names (repository identity only)
  fork:<root>   forks (recursive) of battlecode/battlecode19 and, with --forks-of, of every repo listed in FILE
  star:/forker: repos of users who starred or forked battlecode/battlecode19, kept if name/description looks relevant
  gitlab:<q>    gitlab.com public project search (metadata)
  web           URLs listed in tools/bench/web-candidates.txt (found by a web sweep; URLs only)
Writes $BENCH_ROOT/_discovery.tsv: full_name host sources created_at pushed_at size_kb fork forks_count
Classification (does the repo really hold 2019 bot code?) is done by tools/bench/fetch.sh, by counting only.
"""
import json, os, re, subprocess, sys, time, urllib.parse, urllib.request
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
TOOLS = Path(__file__).resolve().parent
OUT = Path(sys.argv[sys.argv.index('--out') + 1]) if '--out' in sys.argv else ROOT / '_discovery.tsv'
OFFICIAL = 'battlecode/battlecode19'

TERMS = ['battlecode2019', 'battlecode19', 'battlecode 2019', 'battlecode-2019', 'battlecode_2019', 'bc19', 'bc2019',
         'bc-19', 'bc_19', 'battlecode crusade', 'crusade karbonite', 'battlecode 19', 'battle code 2019',
         'mit battlecode 2019', 'battlecode19-bot', 'karbonite pilgrim', 'pilgrim crusader prophet preacher',
         'battlecode castle pilgrim', 'battlecode in:readme 2019', 'crusade in:readme battlecode',
         'bc19 in:readme', 'battlecode19 in:readme', 'topic:battlecode2019', 'topic:battlecode-2019',
         'topic:battlecode19', 'topic:bc19', 'topic:battlecode']
REPO_QUERIES = TERMS + [t + ' fork:true' for t in TERMS if not t.startswith('topic:')]
WIN_TERMS = ['battlecode', '"battle code"', 'battlecode fork:only']
CODE_QUERIES = [
    '"SPECS.PILGRIM" filename:robot.js', '"SPECS.CRUSADER" filename:robot.js', '"SPECS.PROPHET"', '"SPECS.PREACHER"',
    '"SPECS.CASTLE" language:javascript', '"SPECS.CHURCH"', 'karbonite_map filename:robot.py', 'karbonite_map',
    'karboniteMap', 'castleTalk', 'castle_talk', 'proposeTrade', 'propose_trade', 'fuel_map', 'fuelMap language:java',
    'BCAbstractRobot karbonite', 'extends BCAbstractRobot', 'filename:MyRobot.java karbonite',
    'filename:MyRobot.java BCAbstractRobot', 'filename:robot.py BCAbstractRobot', '"from battlecode import"',
    'filename:robot.js BCAbstractRobot', '"package bc19"', 'getVisibleRobotMap', 'get_visible_robot_map',
    'getPassableMap', 'get_passable_map', 'signal castleTalk', 'buildUnit SPECS', 'build_unit SPECS',
]
RELEVANT = re.compile(r'battle|bc|19|crusade|karbonite|pilgrim|robot|bot|mit', re.I)


def gh(path, params=None, paginate=False):
    args = ['gh', 'api', '-X', 'GET', path] + sum([['-f', f'{k}={v}'] for k, v in (params or {}).items()], [])
    for _ in range(8):
        r = subprocess.run(args, capture_output=True, text=True)
        if r.returncode == 0:
            return json.loads(r.stdout)
        msg = (r.stderr + r.stdout).lower()
        if 'rate limit' in msg or '403' in msg or '429' in msg or 'secondary' in msg:
            time.sleep(61); continue
        if '50' in r.stderr[:40] or 'timeout' in msg:
            time.sleep(10); continue
        sys.stderr.write(f'!! {path} {params}: {r.stderr.strip()[:200]}\n'); ERRORS.append(f'{path} {params}: {r.stderr.strip()[:120]}')
        return None
    ERRORS.append(f'{path} {params}: gave up'); return None


ERRORS = []
rows = {}


def add(fn, src, created='', pushed='', size='', fork='', forks='', host='github'):
    if fn not in rows:
        rows[fn] = dict(host=host, sources=[], created=created, pushed=pushed, size=str(size), fork=str(fork),
                        forks=str(forks))
    if src not in rows[fn]['sources']:
        rows[fn]['sources'].append(src)


def add_item(it, src):
    add(it['full_name'], src, it.get('created_at', ''), it.get('pushed_at', ''), it.get('size', ''),
        it.get('fork', ''), it.get('forks_count', ''))


def search_repos(q, src):
    total = None
    for page in range(1, 11):
        d = gh('search/repositories', {'q': q, 'per_page': 100, 'page': page}); time.sleep(2.2)
        if not d: break
        total = d.get('total_count', 0)
        for it in d.get('items', []): add_item(it, src)
        if len(d.get('items', [])) < 100: break
    return total or 0


def window(term, a, b):
    q = f'{term} created:{a}..{b}'
    d = gh('search/repositories', {'q': q, 'per_page': 1}); time.sleep(2.2)
    n = (d or {}).get('total_count', 0)
    if n == 0: return
    if n > 900 and a != b:
        da, db = date.fromisoformat(a), date.fromisoformat(b)
        mid = da + (db - da) / 2
        window(term, a, mid.isoformat()); window(term, (mid + timedelta(days=1)).isoformat(), b); return
    search_repos(q, 'win:' + term)


def forks(root, depth=1):
    for page in range(1, 60):
        d = gh(f'repos/{root}/forks', {'per_page': 100, 'page': page}); time.sleep(0.5)
        if not d: break
        for it in d:
            add_item(it, 'fork:' + root)
            if depth < 4 and it.get('forks_count', 0) > 0: forks(it['full_name'], depth + 1)
        if len(d) < 100: break


def users_of_official():
    users = {}
    for kind in ('stargazers', 'forks'):
        for page in range(1, 40):
            d = gh(f'repos/{OFFICIAL}/{kind}', {'per_page': 100, 'page': page}); time.sleep(0.5)
            if not d: break
            for it in d:
                login = (it.get('owner') or it).get('login')
                users.setdefault(login, 'star' if kind == 'stargazers' else 'forker')
            if len(d) < 100: break
    for login, how in sorted(users.items()):
        for page in range(1, 20):
            d = gh(f'users/{login}/repos', {'per_page': 100, 'page': page, 'type': 'owner'}); time.sleep(0.3)
            if not d: break
            for it in d:
                text = f"{it['name']} {it.get('description') or ''}"
                if it['full_name'] != OFFICIAL and RELEVANT.search(text) and re.search(r'battle|bc|crusade|karbonite|pilgrim', text, re.I):
                    add_item(it, f'{how}:{login}')
            if len(d) < 100: break
    return len(users)


def gitlab(q):
    url = 'https://gitlab.com/api/v4/projects?' + urllib.parse.urlencode({'search': q, 'per_page': 100})
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            for p in json.load(r):
                add(p['path_with_namespace'], 'gitlab:' + q, p.get('created_at', ''), p.get('last_activity_at', ''),
                    '', '', p.get('forks_count', ''), host='gitlab')
    except Exception as e:
        ERRORS.append(f'gitlab {q}: {e}')


def main():
    if OUT.exists():                     # incremental: keep earlier rows/sources
        for l in OUT.read_text().splitlines()[1:]:
            f = l.split('\t')
            rows[f[0]] = dict(host=f[1], sources=f[2].split(';'), created=f[3], pushed=f[4], size=f[5], fork=f[6], forks=f[7])
    if '--forks-of' in sys.argv:
        for fn in Path(sys.argv[sys.argv.index('--forks-of') + 1]).read_text().split():
            forks(fn)
        print(f'forks pass: total {len(rows)}', file=sys.stderr)
    else:
        for q in REPO_QUERIES:
            n = search_repos(q, 'repo:' + q); print(f'repo {q!r}: {n} hits, total {len(rows)}', file=sys.stderr)
        for t in WIN_TERMS:
            window(t, '2008-01-01', date.today().isoformat()); print(f'win {t}: total {len(rows)}', file=sys.stderr)
        forks(OFFICIAL); print(f'forks official: total {len(rows)}', file=sys.stderr)
        n = users_of_official(); print(f'{n} stargazers/forkers: total {len(rows)}', file=sys.stderr)
        for q in ['battlecode', 'bc19', 'battlecode2019', 'battlecode19', 'battlecode-2019', 'crusade']:
            gitlab(q)
        wc = TOOLS / 'web-candidates.txt'
        if wc.exists():
            for l in wc.read_text().splitlines():
                m = re.match(r'https?://(github\.com|gitlab\.com|bitbucket\.org)/([^/\s]+/[^/\s#?]+)', l.strip())
                if m: add(m.group(2).removesuffix('.git'), 'web', host=m.group(1).split('.')[0])
        if '--no-code' not in sys.argv:
            for q in CODE_QUERIES:
                for page in range(1, 11):
                    d = gh('search/code', {'q': q, 'per_page': 100, 'page': page}); time.sleep(6.5)
                    if not d or not d.get('items'): break
                    for it in d['items']: add_item(it['repository'], 'code:' + q)
                    if len(d['items']) < 100: break
                print(f'code {q!r}: total {len(rows)}', file=sys.stderr)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, 'w') as f:
        f.write('full_name\thost\tsources\tcreated_at\tpushed_at\tsize_kb\tfork\tforks_count\n')
        for fn in sorted(rows):
            r = rows[fn]
            f.write('\t'.join([fn, r['host'], ';'.join(r['sources']), r['created'], r['pushed'], r['size'], r['fork'], r['forks']]) + '\n')
    (ROOT / '_discovery-errors.txt').open('a').write(''.join(e + '\n' for e in ERRORS))
    print(f'{len(rows)} candidates -> {OUT}; {len(ERRORS)} API errors')


if __name__ == '__main__':
    main()
