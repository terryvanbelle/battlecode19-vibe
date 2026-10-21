#!/usr/bin/env node
// Summarize batch results: per (a_hash, b_hash): games, A wins, by reason; A's exceptions, timeouts, init failures.
//   node tools/summarize.js results.jsonl [--tag t]
'use strict';
const fs = require('fs');
const argv = process.argv.slice(2), file = argv[0];
const tag = argv.includes('--tag') ? argv[argv.indexOf('--tag') + 1] : null;
const rows = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)).filter(r => !tag || r.tag === tag);
const g = new Map();
for (const r of rows) {
  const k = `${r.tag || ''}\t${r.a_hash}\t${r.b_hash}`;
  const s = g.get(k) || { n: 0, w: 0, err: 0, reasons: {}, exc: 0, to: 0, init: 0, frz: 0, slow: 0, msmax: 0, rounds: 0 };
  if (r.error || (r.rounds === 0 && /init_failure/.test(r.reason))) { s.err++; g.set(k, s); continue; } // round-0 init failure: machine load, not bots
  s.n++; s.w += r.winner_is_a; s.rounds += r.rounds;
  const why = (r.winner_is_a ? 'W-' : 'L-') + r.reason; s.reasons[why] = (s.reasons[why] || 0) + 1;
  const t = r.a_team; s.exc += t.exceptions + (t.exc_caught || 0); s.to += t.timeouts; s.init += t.init_fail; s.frz += t.frozen; s.slow += t.slow_turns;
  s.msmax = Math.max(s.msmax, t.ms_max);
  g.set(k, s);
}
console.log('tag\ta\tb\tgames\tA_wins\tpct\tmean_rounds\treasons\tA_exc\tA_timeouts\tA_initfail\tA_frozen\tA_slow\tA_ms_max\terrors');
for (const [k, s] of g) console.log([k, s.n, s.w, s.n ? (100 * s.w / s.n).toFixed(0) + '%' : '-', s.n ? Math.round(s.rounds / s.n) : 0,
  JSON.stringify(s.reasons), s.exc, s.to, s.init, s.frz, s.slow, s.msmax.toFixed(0), s.err].join('\t'));
