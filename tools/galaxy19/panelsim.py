#!/usr/bin/env python3
"""Monte Carlo of the replica panel's decision rule (TRAINING_ALGORITHM.md §4: simulate a design's false-accept rate
and its power before relying on it).

Truth: every (opponent, map, side) cell of the pool wins at its side-aware pooled rate (contest19.pool_score). Each
trial redraws the pool's games at their real counts (so the estimate's own noise is in the result), then plays
candidate blocks whose cells win at the truth shifted on the logit scale by one constant, chosen so that a block
gains DELTA wins per 18 games on average, and applies the pooled rule on the side-aware z: block 1 reject below
0.5; block 2 accept at cumulative z >= 2, reject below 1; otherwise block 3, accept at >= 2.
Designs: 'both' plays every (opponent, map) cell once from each side (36 games a block); 'mixed' once from a random
side (18 games: the '?' scrims up to match 972).
  python3 -I tools/galaxy19/panelsim.py 726-731 progress/panels/v8-m1.pool [--delta 0,1,1.5,2] [--trials 4000]
"""
import argparse
import math
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import contest19  # noqa: E402


def truth(prior, k=2.0):
    """{(opponent, map, side): (pooled side-aware rate, games in the pool on that side)} for every cell of the prior,
    both sides of each (opponent, map) included."""
    both = sorted({(o, m, s) for o, m, _, _ in prior for s in ('red', 'blue')})
    rows, _ = contest19.pool_score(prior, [(o, m, s, 0) for o, m, s in both], k)
    return {(o, m, s): (q, ns) for o, m, s, w, n, ws, ns, cw, cn, p, q in rows}


def shift_for(rates, gain):
    """The logit shift that adds `gain` expected wins over one game at each rate (bisection)."""
    lo, hi = -10.0, 10.0
    logit = [math.log(p / (1 - p)) for p in rates]
    for _ in range(60):
        mid = (lo + hi) / 2
        if sum(1 / (1 + math.exp(-(x + mid))) for x in logit) - sum(rates) < gain:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def trial(cells, s, design, rnd, k=2.0):
    """One candidate: 'accept' or 'reject', and the blocks it took."""
    prior = []
    for (o, m, sd), (q, ns) in cells.items():
        prior += [(o, m, sd, int(rnd.random() < q)) for _ in range(ns)]
    pairs = sorted({(o, m) for o, m, _ in cells})
    cand = []
    for block in (1, 2, 3):
        for o, m in pairs:
            for sd in (('red', 'blue') if design == 'both' else (rnd.choice(('red', 'blue')),)):
                q = cells[(o, m, sd)][0]
                p = 1 / (1 + math.exp(-(math.log(q / (1 - q)) + s)))
                cand.append((o, m, sd, int(rnd.random() < p)))
        z = contest19.pool_score(prior, cand, k)[1]['side'][3]
        if block == 1 and z < 0.5:
            return 'reject', 1
        if block == 2 and (z >= 2 or z < 1):
            return ('accept' if z >= 2 else 'reject'), 2
        if block == 3:
            return ('accept' if z >= 2 else 'reject'), 3


def simulate(prior, deltas, trials, design, seed=1, k=2.0):
    """[(delta, accept rate, mean blocks)]; delta in wins per 18 games."""
    cells = truth(prior, k)
    rates = [q for q, _ in cells.values()]
    rnd = random.Random(seed)
    out = []
    for d in deltas:
        # Either design's game is an average cell (a random side in 'mixed'), so d per 18 games is d / 18 per cell.
        s = shift_for(rates, d * len(rates) / 18) if d else 0.0
        res = [trial(cells, s, design, rnd, k) for _ in range(trials)]
        out.append((d, sum(r == 'accept' for r, _ in res) / trials, sum(b for _, b in res) / trials))
    return out


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('ctrl')
    ap.add_argument('poolfile')
    ap.add_argument('--delta', default='0,1,1.5,2')
    ap.add_argument('--trials', type=int, default=4000)
    ap.add_argument('--design', choices=('both', 'mixed'), default='both')
    ap.add_argument('--seed', type=int, default=1)
    ap.add_argument('--dir', default=contest19.REPLAYS)
    a = ap.parse_args(argv)
    prior = contest19.block_cells_all(contest19.block_ids(a.ctrl), a.dir)
    with open(a.poolfile) as f:
        for line in f.read().splitlines():
            b = line.split('#')[0].strip()
            if b:
                prior += contest19.block_cells_all(contest19.block_ids(b), a.dir)
    print(f'pool: {len(prior)} games; design {a.design}; {a.trials} trials per effect')
    for d, acc, blocks in simulate(prior, [float(x) for x in a.delta.split(',')], a.trials, a.design, a.seed):
        print(f'gain {d:+.1f} wins per 18 games: accept {acc:.3f}, mean blocks {blocks:.2f}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
