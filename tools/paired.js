#!/usr/bin/env node
// Paired read (TRAINING_ALGORITHM.md §4): candidate vs control on the same cells (opponent hash, seed, side).
//   node tools/paired.js results.jsonl --cand <a_hash> --ctrl <a_hash> [--opp <b_hash>]
// Only cells both builds played count. Discordant cells: one won, the other lost. net = gained - lost, t = net/sqrt(D).
// Refuses when no cells match (mismatched cells cannot be read).
'use strict';
const fs = require('fs');

function pairedRead(rows, cand, ctrl, opp) {
  const key = r => `${r.b_hash}:${r.seed}:${r.a_side}`;
  const A = new Map(), C = new Map();
  for (const r of rows) {
    if (r.error || (opp && r.b_hash !== opp)) continue;
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
  const r = pairedRead(rows, opt('--cand'), opt('--ctrl'), opt('--opp'));
  if (!r.cells) { console.error('no matching cells: refusing to read'); process.exit(4); }
  console.log(JSON.stringify(r));
}
module.exports = { pairedRead };
