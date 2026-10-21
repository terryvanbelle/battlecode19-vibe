#!/usr/bin/env python3
"""Find every Battlecode 2019 bot in the fetched repos, by script only (source is hashed and counted, never shown).

    python3 -I tools/bench/classify.py        -> $BENCH_ROOT/bots.tsv

A bot is (a) a directory holding an entry file robot.js / MyRobot.java / robot.py (any case), whose source files of
that language (recursively, minus nested bot dirs) use 2019-only API names; or (b) a single-file JS/Python bot: a file
outside any bot dir that extends BCAbstractRobot and uses 2019 API names but does not define BCAbstractRobot itself
(that would be the runtime library); or (c) a compiled bundle: a .js file outside bot dirs that defines BCAbstractRobot
AND has a class extending it (the output of the bc19 compiler, e.g. a submitted 'botfinal.js'). Kinds: dir/file/bundle.
Per bot: language, files, lines, files using 2019 names, sha256 over sorted (path relative to bot, bytes), and flags:
  example   entry file byte-identical (whitespace-normalised) to an official example bot, or difflib ratio >= 0.85 on
            normalised lines with a total size within 1.5x of that example (near-identical starter)
  official  the bot dir sits at a path that exists in the official battlecode/battlecode19 tree (monorepo forks/copies)
"""
import difflib, hashlib, os, re, subprocess
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
OFF = Path.home() / 'projects/vibe/bc19-official/battlecode19'
API19 = re.compile(rb'SPECS\.(PILGRIM|CRUSADER|PROPHET|PREACHER)|SPECS\[.(PILGRIM|CRUSADER|PROPHET|PREACHER)|karbonite_map|'
                   rb'karboniteMap|castleTalk|castle_talk|proposeTrade|propose_trade')
ENTRY = {'robot.js': 'js', 'myrobot.java': 'java', 'robot.py': 'py'}
EXT = {'js': ('.js',), 'java': ('.java',), 'py': ('.py',)}
EXAMPLES = {'js': [OFF / 'coldbrew/bots/example_js/robot.js'], 'java': [OFF / 'coldbrew/bots/example_java/MyRobot.java',
            OFF / 'transpiler/java/src/main/java/MyRobot.java'], 'py': [OFF / 'coldbrew/bots/exampy/robot.py']}
# staff example player (npfoss = Battlecode dev, "Example player for MIT 6.147 Battlecode 2019"), used as extra reference
STAFF = ROOT / 'repos/npfoss__examplefuncsplayer2019/bots'
for lang, rel in [('js', 'example_js/robot.js'), ('java', 'example_java/MyRobot.java'), ('py', 'exampy/robot.py')]:
    if (STAFF / rel).exists():
        EXAMPLES[lang].append(STAFF / rel)
SKIP = re.compile(r'(^|/)(node_modules|\.git)(/|$)')


def norm_lines(b):
    return [l for l in (re.sub(rb'\s+', b'', x) for x in b.splitlines()) if l]


EX = {lang: [(p, norm_lines(p.read_bytes()), p.stat().st_size) for p in ps] for lang, ps in EXAMPLES.items()}
OFFICIAL_DIRS = set()
for l in subprocess.run(['git', '-C', str(OFF), 'ls-files'], capture_output=True, text=True).stdout.splitlines():
    OFFICIAL_DIRS.add(os.path.dirname(l))


def is_2019(b):
    return bool(API19.search(b)) or (b'BCAbstractRobot' in b and b'karbonite' in b)


def example_flag(lang, entry_bytes, total_size):
    nl = norm_lines(entry_bytes)
    for p, el, sz in EX[lang]:
        if nl == el:
            return 'identical'
        if total_size <= 1.5 * sz + 200 and difflib.SequenceMatcher(None, nl, el, autojunk=False).ratio() >= 0.85:
            return 'near'
    return ''


def main():
    out = ['repo_dir\trel_path\tkind\tlang\tfiles\tlines\tfiles_2019\texample\tofficial_path\tsha256']
    for repo in sorted(p for p in (ROOT / 'repos').iterdir() if p.is_dir()):
        files = [p for p in repo.rglob('*') if p.is_file() and not SKIP.search(str(p.relative_to(repo)))]
        entries = sorted((p for p in files if p.name.lower() in ENTRY), key=lambda p: str(p))
        botdirs = {}
        for e in entries:
            botdirs.setdefault(e.parent, (ENTRY[e.name.lower()], e))
        covered = set()
        bots = []
        for d, (lang, e) in sorted(botdirs.items(), key=lambda kv: str(kv[0])):
            nested = [o for o in botdirs if o != d and d in o.parents]
            src = [p for p in files if d in p.parents and p.suffix.lower() in EXT[lang]
                   and not any(o in p.parents or o == p.parent for o in nested)]
            covered.update(src)
            bots.append(('dir', d, lang, e, src))
        for p in files:
            if p in covered or p.suffix.lower() not in ('.js', '.py'):
                continue
            b = p.read_bytes()
            if b'BCAbstractRobot' in b and re.search(rb'(extends\s+BCAbstractRobot|\(\s*BCAbstractRobot\s*\))', b) and is_2019(b):
                if not re.search(rb'class\s+BCAbstractRobot\b', b):
                    bots.append(('file', p, 'js' if p.suffix.lower() == '.js' else 'py', p, [p]))
                elif p.suffix.lower() == '.js':
                    bots.append(('bundle', p, 'js', p, [p]))
        for kind, d, lang, e, src in bots:
            blobs = sorted((str(p.relative_to(d)) if kind == 'dir' else 'bot', p.read_bytes()) for p in src)  # single files: content only
            n19 = sum(is_2019(b) for _, b in blobs)
            if n19 == 0:
                continue
            h = hashlib.sha256()
            for rp, b in blobs:
                h.update(rp.encode() + b'\0' + hashlib.sha256(b).digest())
            lines = sum(b.count(b'\n') for _, b in blobs)
            total = sum(len(b) for _, b in blobs)
            rel = str(d.relative_to(repo)) if d != repo else '.'
            ex = example_flag(lang, e.read_bytes(), total)
            off = 'yes' if kind == 'dir' and rel in OFFICIAL_DIRS and (rel.startswith('coldbrew') or rel.startswith('transpiler')) else ''
            out.append('\t'.join([repo.name, rel, kind, lang, str(len(blobs)), str(lines), str(n19), ex, off, h.hexdigest()]))
    (ROOT / 'bots.tsv').write_text('\n'.join(out) + '\n')
    print(f'{len(out) - 1} bots -> {ROOT / "bots.tsv"}')


if __name__ == '__main__':
    main()
