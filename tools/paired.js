#!/usr/bin/env node
// Paired read (TRAINING_ALGORITHM.md §4): candidate vs control on the same cells (opponent hash, seed, side).
//   node tools/paired.js results.jsonl --cand <a_hash> --ctrl <a_hash> [--opp <b_hash>]
//   node tools/paired.js results.jsonl --h2h      # a direct batch (A = candidate, B = control), one seed = one pair
// Only cells both builds played count. Discordant cells: one won, the other lost. net = gained - lost, t = net/sqrt(D).
// In --h2h mode a seed played from both sides is a pair: both won = gained, both lost = lost, a split says nothing.
// Rows lost to machine load are skipped: errors, round-0 init failures, and any robot init failure (our own builds
// never fail to load on an idle machine; LEARNINGS 8). Refuses when no cells match.
'use strict';
const fs = require('fs');

const unusable = r => r.error || (r.rounds === 0 && /init_failure/.test(r.reason)) ||
  ((r.a_team && r.a_team.init_fail > 0) || (r.b_team && r.b_team.init_fail > 0));

function h2hRead(rows) {
  const bySeed = new Map(); let skipped = 0;
  for (const r of rows) {
    if (unusable(r)) { skipped++; continue; }
    const k = `${r.a_hash}:${r.b_hash}:${r.seed}`, p = bySeed.get(k) || {};
    p[r.a_side] = r.winner_is_a ? 1 : 0; bySeed.set(k, p);
  }
  let cells = 0, gained = 0, lost = 0, split = 0, wins = 0, games = 0;
  for (const p of bySeed.values()) {
    for (const s of ['red', 'blue']) if (s in p) { games++; wins += p[s]; }
    if (!('red' in p) || !('blue' in p)) continue;
    cells++; const w = p.red + p.blue; if (w === 2) gained++; else if (w === 0) lost++; else split++;
  }
  const D = gained + lost, net = gained - lost;
  return { cells, games, wins, gained, lost, split, D, net, t: D ? net / Math.sqrt(D) : 0, skipped };
}

function pairedRead(rows, cand, ctrl, opp) {
  const key = r => `${r.b_hash}:${r.seed}:${r.a_side}`;
  const A = new Map(), C = new Map();
  for (const r of rows) {
    if (unusable(r) || (opp && r.b_hash !== opp)) continue;
    if (r.a_hash === cand) A.set(key(r), r); else if (r.a_hash === ctrl) C.set(key(r), r);
  }
  let n = 0, gained = 0, lost = 0, aw = 0, cw = 0;
  const byOpp = {};
  for (const [k, a] of A) {
    const c = C.get(k); if (!c) continue;
    n++; aw += a.winner_is_a; cw += c.winner_is_a;
    const o = byOpp[a.b_hash] || (byOpp[a.b_hash] = { n: 0, gained: 0, lost: 0 }); o.n++;
    if (a.winner_is_a && !c.winner_is_a) { gained++; o.gained++; }
    if (!a.winner_is_a && c.winner_is_a) { lost++; o.lost++; }
  }
  const D = gained + lost, net = gained - lost;
  return { cells: n, cand_wins: aw, ctrl_wins: cw, gained, lost, D, net, t: D ? net / Math.sqrt(D) : 0, byOpp };
}

if (require.main === module) {
  const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
  const rows = fs.readFileSync(argv[0], 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
  const r = argv.includes('--h2h') ? h2hRead(rows) : pairedRead(rows, opt('--cand'), opt('--ctrl'), opt('--opp'));
  if (!r.cells) { console.error('no matching cells: refusing to read'); process.exit(4); }
  console.log(JSON.stringify(r));
}
module.exports = { pairedRead, h2hRead };
