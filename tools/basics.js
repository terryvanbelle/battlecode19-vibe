#!/usr/bin/env node
// Basics battery over replays: absolute bars, not trade-offs (TRAINING_ALGORITHM.md §1.11).
//   node tools/basics.js --team red|blue|auto <replay.bc19>... [--results results.jsonl --hash <a_hash>]
// With --results, rows for a_hash give exceptions/timeouts/init failures, and each row's replay
// (<replays>/<a_hash>_<b_hash>_<seed>_<side>.bc19) is analysed for team A.
// Checks per game: exceptions 0, timeouts 0, init failures 0, friendly damage 0, gifts to the enemy 0;
// karbonite floating (share of rounds 100-900 with stores > 400), pilgrim idle share, military no-action share,
// first church round, pilgrims built.
'use strict';
const fs = require('fs');
const path = require('path');
const R = require('./replay');

function floatShare(buf, team) {
  let n = 0, hi = 0;
  R.simulate(buf, { onRoundEnd(r, g) { if (r >= 100 && r <= 900) { n++; if (g.karbonite[team] > 400) hi++; } } });
  return n ? hi / n : 0;
}

function check(buf, team) {
  const an = R.analyze(buf), T = an.tally[team];
  const sum = a => a.reduce((x, y) => x + y, 0);
  return {
    seed: an.seed, won: an.header.winner === team ? 1 : 0, reason: an.header.reason, rounds: an.rounds,
    friendly_dmg: T.friendly_dmg, gifted_enemy: T.gifted_enemy_k + T.gifted_enemy_f, invalid_actions: T.errors,
    k_float: +floatShare(buf, team).toFixed(2),
    pilgrim_idle: T.turns[2] ? +(T.idle[2] / T.turns[2]).toFixed(2) : 0,
    pilgrims: T.built[2], churches: T.built[1], first_church: an.firstChurch[team],
    military_built: T.built[3] + T.built[4] + T.built[5], lost: sum(T.lost), killed: sum(T.killed),
  };
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const opt = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
  const rows = [];
  if (opt('--results')) {
    const hash = opt('--hash'), dir = opt('--replays') || path.join(path.dirname(opt('--results')), 'replays');
    for (const l of fs.readFileSync(opt('--results'), 'utf8').split('\n')) {
      if (!l) continue; const r = JSON.parse(l); if (r.error || (hash && r.a_hash !== hash)) continue;
      const f = path.join(dir, `${r.a_hash}_${r.b_hash}_${r.seed}_${r.a_side}.bc19`);
      if (!fs.existsSync(f)) continue;
      const c = check(fs.readFileSync(f), r.a_side === 'red' ? 0 : 1);
      Object.assign(c, { side: r.a_side, b: r.b, exc: r.a_team.exceptions + (r.a_team.exc_caught || 0), timeouts: r.a_team.timeouts, init_fail: r.a_team.init_fail, ms_max: r.a_team.ms_max });
      rows.push(c);
    }
  } else {
    const team = opt('--team') === 'blue' ? 1 : 0;
    for (const f of argv.filter(a => a.endsWith('.bc19'))) rows.push(Object.assign({ file: path.basename(f) }, check(fs.readFileSync(f), team)));
  }
  if (!rows.length) { console.log('no games'); process.exit(0); }
  const cols = Object.keys(rows[0]);
  console.log(cols.join('\t'));
  for (const r of rows) console.log(cols.map(c => r[c]).join('\t'));
  const bad = rows.filter(r => r.friendly_dmg || r.gifted_enemy || r.exc || r.timeouts || r.init_fail);
  console.log(`\n${rows.length} games; basics failures (exceptions, timeouts, init, friendly damage, gifts): ${bad.length}`);
}
module.exports = { check };
