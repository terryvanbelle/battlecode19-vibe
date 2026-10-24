#!/usr/bin/env node
// Monte Carlo of a local paired read (TRAINING_ALGORITHM.md §4: simulate every bar's false-reject rate, and a gate's
// false-accept rate and power, before relying on it). The command line defaults to the screen of step 6: one look at
// 20 cells, reject at t <= -1.5, no accept (--accept 2 --reject 0 --looks 12,24,48 --max 200: the old local gate).
// The replica panel has its own simulator (tools/galaxy19/panelsim.py). A cell (one seed, both sides) is discordant with probability q
// (h2h: the candidate won both games or lost both); a discordant cell is a gain with probability p. Cells come in
// blocks (one queued job); a look happens at the first block boundary where D (discordant cells) reaches the next
// target in `looks`: accept at t >= accept, reject at t <= reject, otherwise continue. At the last target, or when
// maxCells is reached, an in-between t ends "open" (logged below resolution). t = (gained - lost) / sqrt(D).
//   node tools/gatesim.js [--q 0.15,0.55] [--p 0.4,0.5,0.6,0.7] [--looks 0] [--block 20] [--max 20] [--accept Infinity] [--reject -1.5]
'use strict';

function rng(seed) {   // mulberry32
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// One gate: {result: 'accept' | 'reject' | 'open', cells, D, t}.
function gate(o, r) {
  let cells = 0, g = 0, l = 0, li = 0;
  for (;;) {
    for (let i = 0; i < o.block; i++) { cells++; if (r() < o.q) { if (r() < o.p) g++; else l++; } }
    const D = g + l, last = cells >= o.maxCells;
    if (D < o.looks[li] && !last) continue;
    const t = D ? (g - l) / Math.sqrt(D) : 0;
    if (D && t >= o.accept) return { result: 'accept', cells, D, t };
    if (D && t <= o.reject) return { result: 'reject', cells, D, t };
    while (li < o.looks.length && D >= o.looks[li]) li++;
    if (li >= o.looks.length || last) return { result: 'open', cells, D, t };
  }
}

function simulate(opts = {}) {
  const o = { q: 0.5, p: 0.5, looks: [12, 24, 48], block: 20, maxCells: 200, accept: 2, reject: 0, trials: 20000, seed: 1, ...opts };
  const r = rng(o.seed), n = { accept: 0, reject: 0, open: 0 }; let cells = 0;
  for (let i = 0; i < o.trials; i++) { const x = gate(o, r); n[x.result]++; cells += x.cells; }
  return { accept: n.accept / o.trials, reject: n.reject / o.trials, open: n.open / o.trials, meanCells: cells / o.trials };
}

if (require.main === module) {
  const argv = process.argv.slice(2), opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
  const list = s => s.split(',').map(Number);
  const qs = list(opt('--q', '0.15,0.55')), ps = list(opt('--p', '0.4,0.5,0.6,0.7'));
  const base = { looks: list(opt('--looks', '0')), block: +opt('--block', 20), maxCells: +opt('--max', 20),
    accept: +opt('--accept', 'Infinity'), reject: +opt('--reject', '-1.5') };
  console.log(`looks at D >= ${base.looks.join(', ')}; blocks of ${base.block} cells; at most ${base.maxCells} cells; accept t >= ${base.accept}, reject t <= ${base.reject}`);
  console.log('q (discordant)  p (gain | discordant)  accept  reject  open  mean cells');
  for (const q of qs) for (const p of ps) {
    const s = simulate({ ...base, q, p });
    console.log(`${q.toFixed(2).padStart(6)}  ${p.toFixed(2).padStart(16)}  ${(100 * s.accept).toFixed(1).padStart(13)}%  ${(100 * s.reject).toFixed(1).padStart(5)}%  ${(100 * s.open).toFixed(1).padStart(4)}%  ${s.meanCells.toFixed(0).padStart(6)}`);
  }
}
module.exports = { simulate, gate, rng };
