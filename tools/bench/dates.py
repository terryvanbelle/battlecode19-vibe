#!/usr/bin/env python3
"""Last-commit date of each bot path, from GitHub commit METADATA only (commits API with path=; no source is read).

    python3 -I tools/bench/dates.py        -> $BENCH_ROOT/dates.tsv: repo_dir  rel_path  last_commit_iso
Incremental (keeps rows already dated). Skips example/official-path bots. Non-GitHub hosts get the clone's HEAD date.
"""
import json, os, subprocess, sys, time
from pathlib import Path

ROOT = Path(os.environ.get('BENCH_ROOT', Path.home() / 'projects/vibe/bc19-benchmarks'))


def gh(path, params):
    args = ['gh', 'api', '-X', 'GET', path] + sum([['-f', f'{k}={v}'] for k, v in params.items()], [])
    for _ in range(5):
        r = subprocess.run(args, capture_output=True, text=True)
        if r.returncode == 0:
            return json.loads(r.stdout)
        if 'rate limit' in (r.stderr + r.stdout).lower():
            time.sleep(60); continue
        return None


def main():
    fetch = {}
    for l in (ROOT / '_fetch.tsv').read_text().splitlines()[1:]:
        f = l.split('\t'); fetch[f[0]] = f
    out_p = ROOT / 'dates.tsv'
    done = {}
    if out_p.exists():
        for l in out_p.read_text().splitlines()[1:]:
            f = l.split('\t'); done[(f[0], f[1])] = l
    out = ['repo_dir\trel_path\tlast_commit']
    for l in (ROOT / 'bots.tsv').read_text().splitlines()[1:]:
        f = l.split('\t')
        key = (f[0], f[1])
        if key in done and done[key].split('\t')[2]:
            out.append(done[key]); continue
        if f[7] or f[8]:            # example / official path: not needed
            continue
        _, full, host, *_r, commit = fetch[f[0]]
        date = ''
        if host == 'github':
            d = gh(f'repos/{full}/commits', {'path': f[1], 'per_page': 1}); time.sleep(0.25)
            if d:
                date = d[0]['commit']['committer']['date']
        if not date and '_' in commit:
            date = commit.split('_')[1]
        out.append(f'{f[0]}\t{f[1]}\t{date}')
        if len(out) % 50 == 0:
            out_p.write_text('\n'.join(out) + '\n')
    out_p.write_text('\n'.join(out) + '\n')
    print(f'{len(out) - 1} bots dated -> {out_p}')


if __name__ == '__main__':
    main()
