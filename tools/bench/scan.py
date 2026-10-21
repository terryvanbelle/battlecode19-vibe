#!/usr/bin/env python3
"""Security scan of external 2019 bots by pattern COUNTS (owner rule: source is never read; a hit may be ruled in or
out from the single matching line only).

    python3 -I tools/bench/scan.py                         -> $BENCH_ROOT/scan.tsv + summary of bots with hits
    python3 -I tools/bench/scan.py --show <repo_dir> <rel>  -> only the matching lines of that bot, trimmed to 160 chars
    python3 -I tools/bench/scan.py --show-pattern <pat>     -> per bot, matching lines for one pattern name

Patterns per language (JS also covers compiled bundles, which embed the official runtime library).
"""
import os, re, sys
from collections import Counter
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
PAT = {
    'js': {'require(': r'\brequire\s*\(', 'import(': r'\bimport\s*\(', 'process.': r'\bprocess\.', 'child_process': r'child_process',
           'global.': r'\bglobal\.', 'globalThis': r'globalThis', 'Function(': r'\bFunction\s*\(', 'eval(': r'\beval\s*\(',
           'constructor.constructor': r'constructor\s*\.\s*constructor|constructor\s*\[', '__proto__': r'__proto__',
           'Proxy': r'\bProxy\b', 'Reflect': r'\bReflect\.', 'fs.': r'\bfs\.', 'net.': r'\bnet\.', 'http': r'\bhttps?\b',
           'fetch(': r'\bfetch\s*\(', 'XMLHttpRequest': r'XMLHttpRequest', 'WebSocket': r'WebSocket',
           'WebAssembly': r'WebAssembly', 'setTimeout': r'\bset(Timeout|Interval|Immediate)\b', 'this.constructor': r'this\s*\.\s*constructor'},
    'java': {'Runtime': r'\bRuntime\b', 'ProcessBuilder': r'ProcessBuilder', 'java.io.File': r'java\.io\.(File|\*)',
             'java.nio.file': r'java\.nio\.file', 'java.net': r'java\.net', 'reflect': r'reflect', 'ClassLoader': r'ClassLoader',
             'System.exit': r'System\.exit', 'Thread': r'\bThread\b', 'native': r'\bnative\b', 'Class.forName': r'Class\.forName'},
    'py': {'import os': r'^\s*(import\s+os\b|from\s+os\b)', 'subprocess': r'subprocess', 'socket': r'socket', '__import__': r'__import__',
           'eval(': r'\beval\s*\(', 'exec(': r'\bexec\s*\(', 'open(': r'\bopen\s*\(', 'import sys': r'^\s*(import\s+sys\b|from\s+sys\b)',
           '__builtins__': r'__builtins__', 'getattr': r'\bgetattr\s*\('},
}
EXT = {'js': ('.js',), 'java': ('.java',), 'py': ('.py',)}
SKIP = re.compile(r'(^|/)(node_modules|\.git)(/|$)')


def bots():
    for l in (ROOT / 'bots.tsv').read_text().splitlines()[1:]:
        f = l.split('\t')
        yield dict(repo=f[0], rel=f[1], kind=f[2], lang=f[3], sha=f[9])


def bot_files(b):
    base = ROOT / 'repos' / b['repo'] / b['rel']
    if b['kind'] != 'dir':
        return [base]
    # same file set as classify.py (minus nested bot dirs, approximated: files of this language under the dir)
    return [p for p in base.rglob('*') if p.is_file() and p.suffix.lower() in EXT[b['lang']] and not SKIP.search(str(p))]


def scan(b, show=None):
    c = Counter()
    lines = []
    for p in bot_files(b):
        for ln in p.read_text(errors='replace').splitlines():
            for name, rx in PAT[b['lang']].items():
                if re.search(rx, ln, re.M):
                    c[name] += 1
                    if show is not None and (show == '*' or show == name):
                        lines.append(f'{p.relative_to(ROOT / "repos")}: [{name}] {ln.strip()[:160]}')
    return c, lines


def main():
    a = sys.argv[1:]
    if a[:1] == ['--show']:
        for b in bots():
            if b['repo'] == a[1] and b['rel'] == a[2]:
                print('\n'.join(scan(b, '*')[1][:200]))
        return
    if a[:1] == ['--show-pattern']:
        seen = set()
        for b in bots():
            if b['sha'] in seen: continue
            seen.add(b['sha'])
            for l in scan(b, a[1])[1][:40]:
                print(l)
        return
    out = ['repo_dir\trel_path\tlang\tsha256\thits\tpatterns']
    tot = Counter()
    for b in bots():
        c, _ = scan(b)
        tot.update({k: 1 for k in c})
        out.append('\t'.join([b['repo'], b['rel'], b['lang'], b['sha'], str(sum(c.values())),
                              ' '.join(f'{k}:{v}' for k, v in sorted(c.items()))]))
    (ROOT / 'scan.tsv').write_text('\n'.join(out) + '\n')
    print(f'scanned {len(out) - 1} bots; bots with hits: {sum(1 for l in out[1:] if l.split(chr(9))[4] != "0")}')
    for k, v in tot.most_common():
        print(f'  {k:24s} in {v} bots')


if __name__ == '__main__':
    main()
