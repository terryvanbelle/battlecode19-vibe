#!/usr/bin/env node
// Census over a set of replays, for pre-registered delivery checks on a gate's replays (TRAINING_ALGORITHM: a
// candidate's delivery is measured on its own games). Per replay and team, to round --to:
//   pioneers     pilgrims a castle built while radioing SIG.CHURCH (type 2); a pioneer's phase ends when it builds a
//                church (phase = born to build), first mines, or dies; stuck = phase >= --stuck turns, none of those;
//                first_pioneer: the round the first was built, pioneer_fuel: the team's fuel after that build
//                (CFG.FUEL_DEFER's bars, ECONOMICS.md); summed over games as *_mean of the games that have one
//   churches     church builds (any builder); churches_by.R for each round R of --by; first_church: its round
//   depot_idle   pilgrim turns that start on a depot tile with room for its resource (K < 20 on karbonite, F < 100 on
//                fuel) and neither mine, give nor build; mines = mine actions
//   escorts      castle and church builds radioing SIG.GUARD (type 12, CFG.ESCORT)
//   attack_calls rounds in which the team's castles radioed the general attack (FAR.ATTACK, r2 398); attack_split:
//                those with 2+ different targets (CFG.ATTACK_ONE, ECONOMICS.md)
//   chainers     castle builds radioing SIG.CHAIN (type 10, CFG.CHAIN_ROUND); recalls: castle radios at FAR.RECALL
//                (r2 2501, CFG.RECALL); late_preachers: preachers built from round --late (default 900, CFG.ENDGAME_FUEL)
//   guard_first  churches whose first build is a crusader, prophet or preacher (CFG.CHURCH_GUARD_D, or a threat response)
//   mil_born     crusaders, prophets and preachers built; mil_dead: those that died; newborn_dead, newborn_dead_k: those
//                that died within 2 rounds of their build round, and their karbonite (a structure feeding newborns to an
//                enemy it cannot see: replica m651-1, 192 of 281 military deaths)
//   chains       rounds in which the team built >= --chain-min churches (a one-round church line, chain.js; StoneT2000's
//                castle killer, LEARNINGS 22); chain_near: those whose nearest church stands within --chain-near king
//                steps of a living enemy castle; chain_kills: enemy castles that died within 25 rounds after a near one
// --castles N keeps only the games where each team started with N castles.
// Gate replays are named <a>_<b>_<seed>_<side>.bc19 with <side> the colour of build A (the candidate): the TOTAL
// line then sums by role, cand and ctrl; other names sum by colour.
//
//   node tools/census.js [--to 450] [--stuck 30] [--by 150,300] [--late 900] [--chain-min 3] [--chain-near 4]
//                        [--castles N] [--json] <replay...>
'use strict';
const fs = require('fs');
const path = require('path');
const { simulate } = require('./replay');

const SIG_CHURCH = 2, SIG_CHAIN = 10, SIG_GUARD = 12, FAR_RECALL = 2501, FAR_ATTACK = 398, COST_K = [0, 50, 10, 15, 25, 30];

function newTeam(by) {
  return { castles: 0, pioneers: 0, pioneer_churches: 0, phase_sum: 0, pioneers_died: 0, stuck: 0, churches: 0,
    churches_by: Object.fromEntries(by.map(r => [r, 0])), depot_idle: 0, mines: 0, escorts: 0, chainers: 0, recalls: 0, late_preachers: 0,
    guard_first: 0, chains: 0, chain_churches: 0, chain_near: 0, chain_kills: 0, mil_born: 0, mil_dead: 0, newborn_dead: 0,
    newborn_dead_k: 0, attack_calls: 0, attack_split: 0, first_pioneer: null, pioneer_fuel: null, first_church: null };
}
const FIRST = ['first_pioneer', 'pioneer_fuel', 'first_church'];

// One replay: [red, blue] tallies.
function census(buf, { to = 1000, stuck = 30, by = [], late = 900, chainMin = 3, chainNear = 4 } = {}) {
  const T = [newTeam(by), newTeam(by)], P = new Map(), lines = new Map(), falls = [], built = new Set(), M = new Map();
  const calls = [new Map(), new Map()];   // round -> targets radioed
  let last = 0;
  simulate(buf, { onStart(g) { for (const r of g.robots) if (r.unit === 0) T[r.team].castles++; },
  onTurn({ round, robot, rec, error, born, died, game }) {
    last = Math.max(last, round);
    if (round > to) return;
    const t = T[robot.team], a = error ? 0 : rec.action;
    for (const d of died) {
      const p = P.get(d.id); if (p && !p.end) { p.end = round; p.how = 'died'; }
      if (d.unit === 0) falls.push({ round, team: d.team });
      const b = M.get(d.id);
      if (b !== undefined) { const td = T[d.team]; td.mil_dead++; if (round - b <= 2) { td.newborn_dead++; td.newborn_dead_k += COST_K[d.unit]; } }
    }
    for (const b of born) if (b.unit >= 3) { M.set(b.id, round); t.mil_born++; }
    const sig = rec.signal_radius > 0 ? rec.signal >> 12 : -1;
    if (a === 3 && robot.unit === 0 && rec.build_unit === 2 && sig === SIG_CHURCH) {
      for (const b of born) P.set(b.id, { team: robot.team, born: round, end: 0, how: '' });
      if (t.first_pioneer === null) { t.first_pioneer = round; t.pioneer_fuel = game.fuel[robot.team]; }
    }
    if (a === 3 && robot.unit <= 1 && sig === SIG_GUARD) t.escorts++;
    if (a === 3 && robot.unit === 0 && sig === SIG_CHAIN) t.chainers++;
    if (robot.unit === 0 && rec.signal_radius === FAR_RECALL) t.recalls++;
    if (robot.unit === 0 && rec.signal_radius === FAR_ATTACK) {
      const c = calls[robot.team]; if (!c.has(round)) c.set(round, new Set());
      c.get(round).add(rec.signal & 4095);
    }
    if (a === 3 && rec.build_unit === 5 && round >= late) t.late_preachers++;
    if (a === 3 && robot.unit === 1 && !built.has(robot.id)) { built.add(robot.id); if (rec.build_unit >= 3) t.guard_first++; }
    if (a === 3 && rec.build_unit === 1) {
      t.churches++; for (const r of by) if (round <= r) t.churches_by[r]++;
      if (t.first_church === null) t.first_church = round;
      for (const b of born) {
        let k = 1e9;
        for (const c of game.robots) if (c.unit === 0 && c.team !== robot.team) k = Math.min(k, Math.max(Math.abs(c.x - b.x), Math.abs(c.y - b.y)));
        const key = robot.team * 4096 + round, l = lines.get(key);
        if (l) { l.n++; l.near = Math.min(l.near, k); } else lines.set(key, { team: robot.team, round, n: 1, near: k });
      }
    }
    if (robot.unit !== 2) return;
    const p = P.get(robot.id);
    if (p && !p.end && (a === 3 && rec.build_unit === 1 || a === 4)) { p.end = round; p.how = a === 4 ? 'mine' : 'church'; }
    if (a === 4) { t.mines++; return; }
    if (a === 3 || a === 6) return;
    const k = game.karbonite_map[robot.y0][robot.x0], f = game.fuel_map[robot.y0][robot.x0];
    if ((k && robot.karbonite < 20) || (f && robot.fuel < 100)) t.depot_idle++;
  } });
  for (const l of lines.values()) {
    if (l.n < chainMin) continue;
    const t = T[l.team]; t.chains++; t.chain_churches += l.n;
    if (l.near > chainNear) continue;
    t.chain_near++;
    t.chain_kills += falls.filter(f => f.team !== l.team && f.round >= l.round && f.round <= l.round + 25).length;
  }
  calls.forEach((c, team) => { T[team].attack_calls = c.size; T[team].attack_split = [...c.values()].filter(v => v.size > 1).length; });
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
    else if (FIRST.includes(k)) { if (t[k] !== null) { sum[k] = (sum[k] || 0) + t[k]; sum[k + '_n'] = (sum[k + '_n'] || 0) + 1; } }
    else sum[k] = (sum[k] || 0) + t[k];
  }
  sum.games = (sum.games || 0) + 1;
  for (const k of ['escorts', 'chainers', 'recalls', 'guard_first', 'chain_near']) if (t[k]) sum['games_' + k] = (sum['games_' + k] || 0) + 1;
  if (t.stuck) sum.games_stuck = (sum.games_stuck || 0) + 1;
  return sum;
}

function summarize(rows) {
  const roles = rows.every(r => r.cand !== null) ? ['cand', 'ctrl'] : ['red', 'blue'], tot = {};
  for (const role of roles) tot[role] = { churches_by: {} };
  for (const r of rows) r.teams.forEach((t, team) =>
    add(tot[roles[0] === 'cand' ? (team === r.cand ? 'cand' : 'ctrl') : roles[team]], t));
  for (const s of Object.values(tot)) {
    s.phase_mean = s.pioneer_churches ? +(s.phase_sum / s.pioneer_churches).toFixed(1) : null;
    for (const k of FIRST) s[k + '_mean'] = s[k + '_n'] ? +(s[k] / s[k + '_n']).toFixed(1) : null;
  }
  return tot;
}

function line(t) {
  const by = Object.entries(t.churches_by).map(([r, n]) => ` by${r} ${n}`).join('');
  return `castles ${t.castles} pioneers ${t.pioneers} (church ${t.pioneer_churches}, phase ${t.pioneer_churches ? (t.phase_sum / t.pioneer_churches).toFixed(1) : '-'}, ` +
    `died ${t.pioneers_died}, stuck ${t.stuck}) churches ${t.churches}${by} depot-idle ${t.depot_idle} mines ${t.mines} escorts ${t.escorts} chainers ${t.chainers} recalls ${t.recalls}` +
    ` late-preachers ${t.late_preachers} guard-first ${t.guard_first} chains ${t.chains} (churches ${t.chain_churches}, near ${t.chain_near}, kills ${t.chain_kills})` +
    ` military ${t.mil_born} died ${t.mil_dead} (newborn ${t.newborn_dead}, ${t.newborn_dead_k} K) attack-calls ${t.attack_calls} (split ${t.attack_split})` +
    ` first-pioneer ${t.first_pioneer ?? '-'} (F ${t.pioneer_fuel ?? '-'}) first-church ${t.first_church ?? '-'}`;
}

module.exports = { census, candSide, summarize };

if (require.main === module) {
  let argv = process.argv.slice(2);
  const opt = (k, d) => { const i = argv.indexOf(k); if (i < 0) return d; const v = argv[i + 1]; argv.splice(i, 2); return v; };
  const to = +opt('--to', '1000'), stuck = +opt('--stuck', '30'), late = +opt('--late', '900');
  const chainMin = +opt('--chain-min', '3'), chainNear = +opt('--chain-near', '4');
  const by = opt('--by', '').split(',').filter(Boolean).map(Number);
  const nc = opt('--castles', null), json = argv.includes('--json'); argv = argv.filter(a => a !== '--json');
  if (!argv.length) { console.error(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 28).join('\n')); process.exit(1); }
  const rows = argv.map(f => ({ file: path.basename(f), cand: candSide(f), teams: census(fs.readFileSync(f), { to, stuck, by, late, chainMin, chainNear }) }))
    .filter(r => nc === null || r.teams.every(t => t.castles === +nc));
  if (!json) for (const r of rows) console.log(r.file, '| red', line(r.teams[0]), '| blue', line(r.teams[1]));
  const tot = summarize(rows);
  console.log(json ? JSON.stringify({ to, stuck, by, late, chainMin, chainNear, rows, total: tot }) : 'TOTAL ' + JSON.stringify(tot));
}
