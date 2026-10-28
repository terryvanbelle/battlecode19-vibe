#!/usr/bin/env python3
"""Monte Carlo of the replica panel's decision rules when a build plays most cells the same way every time
(TRAINING_ALGORITHM §4: simulate a design's false-accept rate and its power before relying on it).

Model of a block's 36 cells (opponent, map, side): a share ETA is opponent noise, where every game, either build's,
is a fresh coin; on the rest the champion's result is fixed (won with probability WIN) and the candidate plays it
the same way unless its change acts there (probability RHO), in which case the cell goes our way with probability PI
(0.5: a neutral candidate; a cell can only go our way where the champion lost, so the acted cells' champion results
are drawn to match).
  paired (the rule since 2026-10-26): every block on fresh cells, the champion's one reference game per cell; each
    cell once, d = candidate - champion, t = net / sqrt(sum d^2), D = cells with d != 0. Block 1 rejects at t <= 0;
    any block accepts at t >= 2 with D >= 4; block 2 rejects at t <= 1, block 3 at t <= 1.5; block 4 accepts at t >= 2.
  pooled (the rule until 2026-10-26): the same 36 cells every block, scored by contest19.pool_score against a pool of
    POOL champion games a cell (the side-aware z over every game); block 1 rejects at z < 0.5, block 2 accepts at
    z >= 2 and rejects below 1, block 3 accepts at z >= 2.
  python3 -I tools/galaxy19/panelsim.py [--rho 0.05,0.1,0.2,0.3] [--pi 0.5,0.65,0.75,0.85] [--eta 0.2]
                                        [--trials 4000] [--rule paired,pooled] [--cells 36]
  --cells: cells a block (36 on the general panel's six opponents; a targeted panel has its own count).
"""
import argparse
import math
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import contest19  # noqa: E402

CELLS = 36   # cells a block (--cells)


def block(rho, pi, eta, rnd, win=0.67):
    """CELLS cells: (noisy, champion's fixed result or None, candidate's fixed result or None)."""
    out = []
    for _ in range(CELLS):
        if rnd.random() < eta:
            out.append((True, None, None))
        elif rnd.random() < rho:
            up = rnd.random() < pi
            out.append((False, 0 if up else 1, 1 if up else 0))
        else:
            b = int(rnd.random() < win)
            out.append((False, b, b))
    return out


def coin(rnd):
    return int(rnd.random() < 0.5)


def paired_trial(rho, pi, eta, rnd, win=0.67):
    """One candidate under the paired fresh-cell rule: ('accept' or 'reject', blocks)."""
    net = s2 = 0.0
    D = 0
    for b in (1, 2, 3, 4):
        for noisy, champ, cand in block(rho, pi, eta, rnd, win):
            d = (coin(rnd) - coin(rnd)) if noisy else cand - champ
            net += d
            s2 += d * d
            D += d != 0
        t = net / math.sqrt(s2) if s2 else 0.0
        if D >= 4 and t >= 2:
            return 'accept', b
        if b == 4 or t <= (0, 1, 1.5)[b - 1]:
            return 'reject', b


def pooled_trial(rho, pi, eta, rnd, win=0.67, pool=6):
    """One candidate under the pooled rule on one fixed set of cells: ('accept' or 'reject', blocks)."""
    cells = block(rho, pi, eta, rnd, win)
    prior = []
    for i, (noisy, champ, _) in enumerate(cells):
        prior += [('o', f'm{i}', 'red', coin(rnd) if noisy else champ) for _ in range(pool)]
    games = []
    for b in (1, 2, 3):
        games += [('o', f'm{i}', 'red', coin(rnd) if noisy else cand) for i, (noisy, _, cand) in enumerate(cells)]
        z = contest19.pool_score(prior, games)[1]['side'][3]
        if b == 1 and z < 0.5:
            return 'reject', 1
        if b == 2 and (z >= 2 or z < 1):
            return ('accept' if z >= 2 else 'reject'), 2
        if b == 3:
            return ('accept' if z >= 2 else 'reject'), 3


def simulate(rule, rho, pi, eta, trials, seed=1):
    """(accept rate, mean blocks)."""
    rnd = random.Random(seed)
    f = paired_trial if rule == 'paired' else pooled_trial
    res = [f(rho, pi, eta, rnd) for _ in range(trials)]
    return sum(r == 'accept' for r, _ in res) / trials, sum(b for _, b in res) / trials


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--rho', default='0.05,0.1,0.2,0.3')
    ap.add_argument('--pi', default='0.5,0.65,0.75,0.85')
    ap.add_argument('--eta', type=float, default=0.2)
    ap.add_argument('--trials', type=int, default=4000)
    ap.add_argument('--rule', default='paired,pooled')
    ap.add_argument('--seed', type=int, default=1)
    ap.add_argument('--cells', type=int, default=36)
    a = ap.parse_args(argv)
    global CELLS
    CELLS = a.cells
    for rule in a.rule.split(','):
        for rho in (float(x) for x in a.rho.split(',')):
            row = [f'pi {pi}: {100 * acc:4.1f}% ({blk:.2f} blocks)'
                   for pi in (float(x) for x in a.pi.split(','))
                   for acc, blk in [simulate(rule, rho, pi, a.eta, a.trials, a.seed)]]
            print(f'{rule:6} eta {a.eta} rho {rho}: ' + ' | '.join(row))
    return 0


if __name__ == '__main__':
    sys.exit(main())
