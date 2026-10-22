#!/usr/bin/env node
// Census over a set of replays, for pre-registered delivery checks on a gate's replays (TRAINING_ALGORITHM: a
// candidate's delivery is measured on its own games). Per replay and team, to round --to:
//   pioneers     pilgrims a castle built while radioing SIG.CHURCH (type 2); a pioneer's phase ends when it builds a
//                church (phase = born to build), first mines, or dies; stuck = phase >= --stuck turns, none of those
//   churches     church builds (any builder); churches_by.R for each round R of --by
//   depot_idle   pilgrim turns that start on a depot tile with room for its resource (K < 20 on karbonite, F < 100 on
//                fuel) and neither mine, give nor build; mines = mine actions
//   escorts      castle and church builds radioing SIG.GUARD (type 12, CFG.ESCORT)
//   chainers     castle builds radioing SIG.CHAIN (type 10, CFG.CHAIN_ROUND); recalls: castle radios at FAR.RECALL
//                (r2 2501, CFG.RECALL); late_preachers: preachers built from round --late (default 900, CFG.ENDGAME_FUEL)
// Gate replays are named <a>_<b>_<seed>_<side>.bc19 with <side> the colour of build A (the candidate): the TOTAL
// line then sums by role, cand and ctrl; other names sum by colour.
//
//   node tools/census.js [--to 450] [--stuck 30] [--by 150,300] [--late 900] [--json] <replay...>
'use strict';
const fs = require('fs');
const path = require('path');
const { simulate } = require('./replay');

const SIG_CHURCH = 2, SIG_CHAIN = 10, SIG_GUARD = 12, FAR_RECALL = 2501;

function newTeam(by) {
  return { pioneers: 0, pioneer_churches: 0, phase_sum: 0, pioneers_died: 0, stuck: 0, churches: 0,
    churches_by: Object.fromEntries(by.map(r => [r, 0])), depot_idle: 0, mines: 0, escorts: 0, chainers: 0, recalls: 0, late_preachers: 0 };
}

// One replay: [red, blue] tallies.
function census(buf, { to = 1000, stuck = 30, by = [], late = 900 } = {}) {
  const T = [newTeam(by), newTeam(by)], P = new Map();
  let last = 0;
  simulate(buf, { onTurn({ round, robot, rec, error, born, died, game }) {
    last = Math.max(last, round);
    if (round > to) return;
    const t = T[robot.team], a = error ? 0 : rec.action;
    for (const d of died) { const p = P.get(d.id); if (p && !p.end) { p.end = round; p.how = 'died'; } }
    const sig = rec.signal_radius > 0 ? rec.signal >> 12 : -1;
    if (a === 3 && robot.unit === 0 && rec.build_unit === 2 && sig === SIG_CHURCH)
      for (const b of born) P.set(b.id, { team: robot.team, born: round, end: 0, how: '' });
    if (a === 3 && robot.unit <= 1 && sig === SIG_GUARD) t.escorts++;
    if (a === 3 && robot.unit === 0 && sig === SIG_CHAIN) t.chainers++;
    if (robot.unit === 0 && rec.signal_radius === FAR_RECALL) t.recalls++;
    if (a === 3 && rec.build_unit === 5 && round >= late) t.late_preachers++;
    if (a === 3 && rec.build_unit === 1) { t.churches++; for (const r of by) if (round <= r) t.churches_by[r]++; }
    if (robot.unit !== 2) return;
    const p = P.get(robot.id);
    if (p && !p.end && (a === 3 && rec.build_unit === 1 || a === 4)) { p.end = round; p.how = a === 4 ? 'mine' : 'church'; }
    if (a === 4) { t.mines++; return; }
    if (a === 3 || a === 6) return;
    const k = game.karbonite_map[robot.y0][robot.x0], f = game.fuel_map[robot.y0][robot.x0];
    if ((k && robot.karbonite < 20) || (f && robot.fuel < 100)) t.depot_idle++;
  } });
  const end = Math.min(to, last);
  for (const p of P.values()) {
    const t = T[p.team], len = (p.end || end) - p.born;
    t.pioneers++;
    if (p.how === 'church') { t.pioneer_churches++; t.phase_sum += len; }
    else if (p.how === 'died') t.pioneers_died++;
    else if (len >= stuck) t.stuck++;
  }
  return T;
}

// The colour of build A from a gate replay's name, or null.
function candSide(file) {
  const m = /_(red|blue)\.bc19$/.exec(path.basename(file));
  return m ? (m[1] === 'red' ? 0 : 1) : null;
}

function add(sum, t) {
  for (const k of Object.keys(t)) {
    if (k === 'churches_by') for (const r of Object.keys(t[k])) sum[k][r] = (sum[k][r] || 0) + t[k][r];
    else sum[k] = (sum[k] || 0) + t[k];
  }
  sum.games = (sum.games || 0) + 1;
  for (const k of ['escorts', 'chainers', 'recalls']) if (t[k]) sum['games_' + k] = (sum['games_' + k] || 0) + 1;
  if (t.stuck) sum.games_stuck = (sum.games_stuck || 0) + 1;
  return sum;
}

function summarize(rows) {
  const roles = rows.every(r => r.cand !== null) ? ['cand', 'ctrl'] : ['red', 'blue'], tot = {};
  for (const role of roles) tot[role] = { churches_by: {} };
  for (const r of rows) r.teams.forEach((t, team) =>
    add(tot[roles[0] === 'cand' ? (team === r.cand ? 'cand' : 'ctrl') : roles[team]], t));
  for (const s of Object.values(tot)) s.phase_mean = s.pioneer_churches ? +(s.phase_sum / s.pioneer_churches).toFixed(1) : null;
  return tot;
}

function line(t) {
  const by = Object.entries(t.churches_by).map(([r, n]) => ` by${r} ${n}`).join('');
  return `pioneers ${t.pioneers} (church ${t.pioneer_churches}, phase ${t.pioneer_churches ? (t.phase_sum / t.pioneer_churches).toFixed(1) : '-'}, ` +
    `died ${t.pioneers_died}, stuck ${t.stuck}) churches ${t.churches}${by} depot-idle ${t.depot_idle} mines ${t.mines} escorts ${t.escorts} chainers ${t.chainers} recalls ${t.recalls}` +
    ` late-preachers ${t.late_preachers}`;
}

module.exports = { census, candSide, summarize };

if (require.main === module) {
  let argv = process.argv.slice(2);
  const opt = (k, d) => { const i = argv.indexOf(k); if (i < 0) return d; const v = argv[i + 1]; argv.splice(i, 2); return v; };
  const to = +opt('--to', '1000'), stuck = +opt('--stuck', '30'), late = +opt('--late', '900');
  const by = opt('--by', '').split(',').filter(Boolean).map(Number);
  const json = argv.includes('--json'); argv = argv.filter(a => a !== '--json');
  if (!argv.length) { console.error(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 15).join('\n')); process.exit(1); }
  const rows = argv.map(f => ({ file: path.basename(f), cand: candSide(f), teams: census(fs.readFileSync(f), { to, stuck, by, late }) }));
  if (!json) for (const r of rows) console.log(r.file, '| red', line(r.teams[0]), '| blue', line(r.teams[1]));
  const tot = summarize(rows);
  console.log(json ? JSON.stringify({ to, stuck, by, late, rows, total: tot }) : 'TOTAL ' + JSON.stringify(tot));
}
