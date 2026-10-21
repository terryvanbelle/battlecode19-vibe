#!/usr/bin/env python3
"""Pick the bc19 replica's map pool from maps/corpus.tsv: a Battlecode 2019 map is its seed, so a map is `seed-<n>`.

    python3 tools/galaxy19/maps.py [--n 40] [--out tools/galaxy19/maps.txt]

Deterministic and stratified: valid seeds are grouped by (size band, castles, symmetry), 3 size bands (32-42, 43-53,
54-64) x 1-3 castles x H/V = 18 cells; the pool takes seeds round-robin over the cells (cell order fixed, seeds in a
cell ordered by a hash of the seed), so every cell is represented and no cell gets two more than another.
"""
import argparse
import hashlib
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
BANDS = ((32, 42, 'S'), (43, 53, 'M'), (54, 64, 'L'))


def read_corpus(path):
    with open(path) as fh:
        head = fh.readline().rstrip('\n').split('\t')
        rows = [dict(zip(head, l.rstrip('\n').split('\t'))) for l in fh if l.strip()]
    return rows


def band(size):
    for lo, hi, name in BANDS:
        if lo <= size <= hi:
            return name
    return None


def pick(rows, n):
    cells = {}
    for r in rows:
        if r.get('valid') != '1':
            continue
        b = band(int(r['size']))
        if b is None:
            continue
        cells.setdefault((b, int(r['castles']), r['sym']), []).append(int(r['seed']))
    for k in cells:
        cells[k].sort(key=lambda s: hashlib.sha256(f'bc19-replica:{s}'.encode()).hexdigest())
    order = sorted(cells)
    out, depth = [], 0
    while len(out) < n and any(len(cells[k]) > depth for k in order):
        for k in order:
            if len(out) < n and len(cells[k]) > depth:
                out.append(cells[k][depth])
        depth += 1
    return out


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument('--n', type=int, default=40)
    ap.add_argument('--corpus', default=os.path.join(REPO, 'maps', 'corpus.tsv'))
    ap.add_argument('--out', default=os.path.join(HERE, 'maps.txt'))
    a = ap.parse_args(argv)
    rows = read_corpus(a.corpus)
    by_seed = {int(r['seed']): r for r in rows}
    seeds = pick(rows, a.n)
    with open(a.out, 'w') as fh:
        fh.write('# bc19 replica map pool (tools/galaxy19/maps.py): seed-<n>  # size castles symmetry\n')
        for s in seeds:
            r = by_seed[s]
            fh.write(f'seed-{s}  # {r["size"]} {r["castles"]} {r["sym"]}\n')
    print(f'{len(seeds)} maps -> {a.out}')


if __name__ == '__main__':
    main()
