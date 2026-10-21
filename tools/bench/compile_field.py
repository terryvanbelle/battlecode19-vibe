#!/usr/bin/env python3
"""Compile every entrant of tools/bench/field.tsv to a JS bundle (no source is read or shown; only exit status).

    python3 -I tools/bench/compile_field.py [--only NAME] [--redo]   -> $BENCH_ROOT/compiled/<name>/bot.js + compile.tsv

kind dir    -> tools/compile_bot.js <dir> (JS: engine rollup; Java: JSweet; Python: Transcrypt, both in the no-network
               compile sandbox)
kind file   -> the single file is copied into a temp dir as robot.js / robot.py, then as above
kind bundle -> already the output of the bc19 compiler: copied as is
On the VM set BENCH_LOCK=~/.bc-extra.lock: each compile then holds the shared lock (one extra process at a time).
Incremental: entrants already 'ok' in compile.tsv with an existing bundle are kept unless --redo.
compile.tsv: name  language  kind  path  status(ok|fail)  bytes  ms  mode(engine|lenient|copy)  error (trimmed)
A failed entrant makes tools/bench/roster.py add the repo's next-best bot (rule compile-fallback) on its next run.
"""
import json, os, shutil, subprocess, sys, tempfile, time
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))
TOOLS = Path(__file__).resolve().parent
REPO = TOOLS.parent.parent
OUT = ROOT / 'compiled'


def tsv(p):
    ls = Path(p).read_text().splitlines()
    h = ls[0].split('\t')
    return [dict(zip(h, l.split('\t'))) for l in ls[1:] if l.strip()]


def compile_one(e):
    src = ROOT / e['path']
    dst = OUT / e['name'] / 'bot.js'
    dst.parent.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    if e['kind'] == 'bundle':
        shutil.copyfile(src, dst)
        return 'ok', dst.stat().st_size, 0, '', 'copy'
    tmp = None
    d = src
    if e['kind'] == 'file':
        tmp = Path(tempfile.mkdtemp(prefix='bc19-field-'))
        shutil.copyfile(src, tmp / ('robot.py' if e['language'] == 'py' else 'robot.js'))
        d = tmp
    try:
        lock = ['flock', os.environ['BENCH_LOCK']] if os.environ.get('BENCH_LOCK') else []   # VM: ~/.bc-extra.lock
        r = subprocess.run(lock + ['nice', 'node', str(REPO / 'tools/compile_bot.js'), str(d), '-o', str(dst)],
                           capture_output=True, text=True, timeout=900)
        ms = int((time.time() - t0) * 1000)
        if r.returncode == 0 and dst.exists():
            try: mode = json.loads(r.stdout.strip().splitlines()[-1]).get('mode', 'engine')
            except Exception: mode = '?'
            return 'ok', dst.stat().st_size, ms, '', mode
        err = (r.stderr or r.stdout).strip().splitlines()
        msg = ' | '.join(l.strip() for l in err[:3])[:300]
        if dst.exists(): dst.unlink()
        return 'fail', 0, ms, msg.replace('\t', ' '), ''
    except subprocess.TimeoutExpired:
        return 'fail', 0, 900000, 'compile timeout', ''
    finally:
        if tmp: shutil.rmtree(tmp, ignore_errors=True)


def main():
    a = sys.argv[1:]
    only = a[a.index('--only') + 1] if '--only' in a else None
    field = tsv(TOOLS / 'field.tsv')
    cf = ROOT / 'compile.tsv'
    prev = {r['name']: r for r in tsv(cf)} if cf.exists() else {}
    names = {e['name'] for e in field}
    for e in field:
        n = e['name']
        if only and n != only: continue
        if '--redo' not in a and prev.get(n, {}).get('status') == 'ok' and prev[n].get('path') == e['path'] \
                and (OUT / n / 'bot.js').exists(): continue
        st, size, ms, err, mode = compile_one(e)
        prev[n] = dict(name=n, language=e['language'], kind=e['kind'], path=e['path'], status=st, bytes=str(size), ms=str(ms), mode=mode, error=err)
        (OUT / n / 'meta.json').write_text(json.dumps({k: e[k] for k in ('name', 'language', 'path', 'kind', 'sha256')}) + '\n')
        print(f'{n}\t{e["language"]}\t{st}\t{err[:120]}', flush=True)
        cols = ['name', 'language', 'kind', 'path', 'status', 'bytes', 'ms', 'mode', 'error']
        cf.write_text('\t'.join(cols) + '\n' + ''.join('\t'.join(r.get(c, '') for c in cols) + '\n'
                                                     for k, r in sorted(prev.items()) if k in names))
    # bundles of entrants that left the field are removed (nothing stale stays)
    for p in OUT.iterdir() if OUT.exists() else []:
        if p.is_dir() and p.name not in names: shutil.rmtree(p)
    rows = [r for r in prev.values() if r['name'] in names]
    print(f'compiled ok {sum(r["status"] == "ok" for r in rows)} / {len(rows)}')


if __name__ == '__main__':
    main()
