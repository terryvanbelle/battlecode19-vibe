#!/usr/bin/env node
// Replay reader for Battlecode 2019 replays (.bc19). A replay holds only the seed and one 8-byte action record per
// robot-turn, so the reader re-simulates the game with the pinned engine (Game(seed) + enactTurn(record)) and
// observes every turn. No bot code runs.
//
//   node tools/replay.js summary  <replay>                 # result, per-team economy, production, losses, fuel use
//   node tools/replay.js rounds   <replay> [--every N]     # CSV: per round and team, units, stores, HP, income
//   node tools/replay.js unit     <replay> --id N          # one robot's whole life, one line per turn
//   node tools/replay.js board    <replay> --round R       # ASCII board at the end of round R
//   node tools/replay.js events   <replay> [--from R --to R] [--kind build,death,attack,signal,talk]
//   node tools/replay.js nav      <replay>                 # per team and unit type: moves, idle, oscillation
//   node tools/replay.js talk     <replay> [--team T]      # castle-talk and radio telemetry per turn
//   node tools/replay.js threat   <replay> [--json]        # each structure's first enemy combat unit in view: stores, response
//   node tools/replay.js fire     <replay> [--from R --to R]  # per team and shooter type: shots, fuel, damage per fuel
//   node tools/replay.js timeline <replay> [--at 25,50,...]   # per team at checkpoints: structures, pilgrims, army (and by type), mined, bank
//   node tools/replay.js moves    <replay> [--every N]     # per team and window of rounds: movement fuel by unit type
// Teams: 0 red, 1 blue. Unit codes: 0 castle, 1 church, 2 pilgrim, 3 crusader, 4 prophet, 5 preacher.
'use strict';
const fs = require('fs');
const path = require('path');
const ENGINE = path.join(__dirname, '..', 'engine', 'node_modules', 'bc19');
const Game = require(path.join(ENGINE, 'game'));
const SPECS = require(path.join(ENGINE, 'specs'));
const ActionRecord = require(path.join(ENGINE, 'action_record'));

const UNIT = ['castle', 'church', 'pilgrim', 'crusader', 'prophet', 'preacher'];
const ACTION = ['none', 'move', 'attack', 'build', 'mine', 'trade', 'give', 'timeout'];
const REASON = ['castles', 'health', 'coinflip', 'init_failure', 'both_init_failure'];

function parseHeader(buf) {
  if (buf.length < 6 || (buf.length - 6) % 8 !== 0) throw new Error('not a bc19 replay: length ' + buf.length);
  const seed = ((buf[2] << 24) | (buf[3] << 16) | (buf[4] << 8) | buf[5]) >>> 0;
  return { winner: buf[0], win_condition: buf[1], reason: REASON[buf[1]], seed, turns: (buf.length - 6) / 8 };
}

// Re-simulate. onTurn(ev) is called after each robot-turn with
//   { i, round, robot: {id, team, unit, x0, y0, x, y, hp, karbonite, fuel, turn}, rec: ActionRecord,
//     born: [robot...], died: [{id, team, unit, x, y, by}], damage: [{id, team, unit, dmg}], error: string|null, game }
// onRoundEnd(round, game) is called when a round finishes (before the next round's fuel trickle).
function simulate(buf, { onTurn, onRoundEnd, onStart } = {}) {
  const h = parseHeader(buf);
  const g = new Game(h.seed, SPECS.CHESS_INITIAL, SPECS.CHESS_EXTRA, false, false);
  if (onStart) onStart(g, h);
  let born = [], died = [], damage = [], error = null, actor = null;
  const createItem = g.createItem.bind(g);
  g.createItem = function (x, y, team, unit) { const r = createItem(x, y, team, unit); born.push(r); return r; };
  const del = g._deleteRobot.bind(g);
  g._deleteRobot = function (r) {
    died.push({ id: r.id, team: r.team, unit: r.unit, x: r.x, y: r.y, by: actor ? actor.id : null, by_unit: actor ? actor.unit : null });
    del(r);
  };
  g.robotError = function (message) { error = String(message); };
  g.robotLog = function () {};
  let lastRound = 0;
  for (let i = 0; i < h.turns; i++) {
    const bytes = buf.subarray(6 + 8 * i, 14 + 8 * i);
    // enactTurn advances the round when the robin passes the end of the queue.
    if (g.robin >= g.robots.length && lastRound > 0 && onRoundEnd) onRoundEnd(lastRound, g);
    const roundBefore = g.robin >= g.robots.length ? g.round + 1 : g.round;
    const r = g.robots[g.robin >= g.robots.length ? 0 : g.robin];
    const pre = { id: r.id, team: r.team, unit: r.unit, x0: r.x, y0: r.y };
    const hpBefore = new Map(g.robots.map(o => [o.id, o.health]));
    born = []; died = []; damage = []; error = null; actor = r;
    const rec = ActionRecord.FromBytes(bytes);
    g.enactTurn(bytes);
    for (const o of g.robots) { const hb = hpBefore.get(o.id); if (hb !== undefined && o.health < hb) damage.push({ id: o.id, team: o.team, unit: o.unit, dmg: hb - o.health }); }
    for (const d of died) damage.push({ id: d.id, team: d.team, unit: d.unit, dmg: hpBefore.get(d.id), killed: true });
    lastRound = g.round;
    if (onTurn) onTurn({ i, round: roundBefore, robot: Object.assign(pre, { x: r.x, y: r.y, hp: r.health, karbonite: r.karbonite, fuel: r.fuel, turn: r.turn }),
      rec, born, died, damage, error, game: g });
  }
  if (onRoundEnd && lastRound > 0) onRoundEnd(lastRound, g);
  return { header: h, game: g };
}

function teamState(g, team) {
  const units = [0, 0, 0, 0, 0, 0]; let hp = 0, carriedK = 0, carriedF = 0;
  for (const r of g.robots) if (r.team === team) { units[r.unit]++; hp += r.health; carriedK += r.karbonite; carriedF += r.fuel; }
  return { units, hp, karbonite: g.karbonite[team], fuel: g.fuel[team], carriedK, carriedF };
}

function newTally() {
  return { built: [0, 0, 0, 0, 0, 0], lost: [0, 0, 0, 0, 0, 0], killed: [0, 0, 0, 0, 0, 0], friendly_dmg: 0, dmg_dealt: 0,
    mined_k: 0, mined_f: 0, deposited_k: 0, deposited_f: 0, gifted_enemy_k: 0, gifted_enemy_f: 0,
    fuel_move: 0, fuel_attack: 0, fuel_signal: 0, fuel_mine: 0, fuel_build: 0, karb_build: 0,
    attacks: 0, attacks_empty: 0, errors: 0, turns: [0, 0, 0, 0, 0, 0], idle: [0, 0, 0, 0, 0, 0], signals: 0, talk_nonzero: 0 };
}

// One pass that gathers everything the summary needs.
function analyze(buf) {
  const t = [newTally(), newTally()];
  let firstContact = null, firstKill = null, firstChurch = [null, null];
  const res = simulate(buf, {
    onTurn(ev) {
      const { robot, rec, game } = ev, T = t[robot.team];
      T.turns[robot.unit]++;
      if (ev.error) T.errors++;
      if (rec.signal_radius > 0) { T.signals++; T.fuel_signal += Math.ceil(Math.sqrt(rec.signal_radius)); }
      if (rec.castle_talk) T.talk_nonzero++;
      const a = rec.action;
      if (a === 0 && robot.unit >= 2) T.idle[robot.unit]++;
      if (a === 1 && !ev.error) T.fuel_move += (rec.dx * rec.dx + rec.dy * rec.dy) * SPECS.UNITS[robot.unit].FUEL_PER_MOVE;
      if (a === 2 && !ev.error) {
        T.attacks++; T.fuel_attack += SPECS.UNITS[robot.unit].ATTACK_FUEL_COST;
        if (ev.damage.length === 0) T.attacks_empty++;
        for (const d of ev.damage) { if (d.team === robot.team) T.friendly_dmg += d.dmg; else T.dmg_dealt += d.dmg; }
        if (firstContact === null && ev.damage.some(d => d.team !== robot.team)) firstContact = ev.round;
      }
      if (a === 3 && !ev.error) for (const b of ev.born) {
        T.built[b.unit]++; T.fuel_build += SPECS.UNITS[b.unit].CONSTRUCTION_FUEL; T.karb_build += SPECS.UNITS[b.unit].CONSTRUCTION_KARBONITE;
        if (b.unit === 1 && firstChurch[robot.team] === null) firstChurch[robot.team] = ev.round;
      }
      if (a === 4 && !ev.error) {
        T.fuel_mine += SPECS.MINE_FUEL_COST;
        if (game.karbonite_map[robot.y][robot.x]) T.mined_k += SPECS.KARBONITE_YIELD; else T.mined_f += SPECS.FUEL_YIELD;
      }
      if (a === 6 && !ev.error) {
        const tid = game.shadow[robot.y + rec.dy][robot.x + rec.dx];
        const tgt = tid ? game.getItem(tid) : null;
        if (tgt && tgt.unit <= 1) {
          if (tgt.team === robot.team) { T.deposited_k += rec.give_karbonite; T.deposited_f += rec.give_fuel; }
          else { T.gifted_enemy_k += rec.give_karbonite; T.gifted_enemy_f += rec.give_fuel; }
        }
      }
      for (const d of ev.died) {
        t[d.team].lost[d.unit]++;
        if (d.team !== robot.team) T.killed[d.unit]++;
        if (firstKill === null && d.team !== robot.team) firstKill = ev.round;
      }
    },
  });
  const g = res.game;
  return { header: res.header, rounds: g.round, tally: t, final: [teamState(g, 0), teamState(g, 1)], firstContact, firstKill, firstChurch, seed: res.header.seed, mapSize: g.map.length };
}

function fmtUnits(a) { return a.map((n, i) => n ? UNIT[i].slice(0, 4) + ' ' + n : null).filter(Boolean).join(', ') || '-'; }

function summaryText(an) {
  const h = an.header, out = [];
  out.push(`seed ${an.seed}  map ${an.mapSize}x${an.mapSize}  rounds ${an.rounds}  winner ${h.winner === 0 ? 'red' : 'blue'} by ${h.reason}`);
  out.push(`first damage to an enemy: round ${an.firstContact}  first kill: round ${an.firstKill}`);
  for (const team of [0, 1]) {
    const T = an.tally[team], F = an.final[team];
    out.push(`\n== ${team === 0 ? 'RED' : 'BLUE'} ==`);
    out.push(`  alive:   ${fmtUnits(F.units)}  (hp ${F.hp})   stores K ${F.karbonite} F ${F.fuel}   carried K ${F.carriedK} F ${F.carriedF}`);
    out.push(`  built:   ${fmtUnits(T.built)}   first church round ${an.firstChurch[team]}`);
    out.push(`  lost:    ${fmtUnits(T.lost)}`);
    out.push(`  killed:  ${fmtUnits(T.killed)}   damage dealt ${T.dmg_dealt}   friendly damage ${T.friendly_dmg}`);
    out.push(`  mined:   K ${T.mined_k} F ${T.mined_f}   deposited K ${T.deposited_k} F ${T.deposited_f}` +
      (T.gifted_enemy_k || T.gifted_enemy_f ? `   GIFTED TO ENEMY K ${T.gifted_enemy_k} F ${T.gifted_enemy_f}` : ''));
    out.push(`  fuel:    move ${T.fuel_move}  attack ${T.fuel_attack}  signal ${T.fuel_signal}  mine ${T.fuel_mine}  build ${T.fuel_build}   karb build ${T.karb_build}`);
    out.push(`  attacks: ${T.attacks} (${T.attacks_empty} hit nothing)   radio ${T.signals}   castle-talk turns ${T.talk_nonzero}   invalid actions ${T.errors}`);
    out.push(`  idle turns (no action) by type: ` + T.idle.map((n, i) => i >= 2 && T.turns[i] ? `${UNIT[i]} ${n}/${T.turns[i]}` : null).filter(Boolean).join(', '));
  }
  return out.join('\n');
}

function roundsCsv(buf, every = 1) {
  const rows = ['round,team,castle,church,pilgrim,crusader,prophet,preacher,hp,karbonite,fuel,carried_k,carried_f'];
  simulate(buf, { onRoundEnd(round, g) {
    if (round % every && round !== 1) return;
    for (const team of [0, 1]) { const s = teamState(g, team); rows.push([round, team, ...s.units, s.hp, s.karbonite, s.fuel, s.carriedK, s.carriedF].join(',')); }
  } });
  return rows.join('\n');
}

function describe(rec) {
  const a = ACTION[rec.action];
  if (rec.action === 1 || rec.action === 2) return `${a} ${rec.dx},${rec.dy}`;
  if (rec.action === 3) return `build ${UNIT[rec.build_unit]} ${rec.dx},${rec.dy}`;
  if (rec.action === 6) return `give ${rec.dx},${rec.dy} K${rec.give_karbonite} F${rec.give_fuel}`;
  if (rec.action === 5) return `trade K${rec.trade_karbonite} F${rec.trade_fuel}`;
  return a;
}

function unitLife(buf, id) {
  const out = [];
  let head = null;
  simulate(buf, { onTurn(ev) {
    if (ev.robot.id === id) {
      const r = ev.robot, rec = ev.rec;
      if (!head) head = `robot ${id}: ${['red', 'blue'][r.team]} ${UNIT[r.unit]}`;
      out.push(`r${ev.round} t${r.turn} (${r.x0},${r.y0}) ${describe(rec)}${ev.error ? ' [ERR ' + ev.error + ']' : ''}  hp ${r.hp} K${r.karbonite} F${r.fuel}` +
        (rec.signal_radius ? `  radio ${rec.signal}@${rec.signal_radius}` : '') + (rec.castle_talk ? `  talk ${rec.castle_talk}` : ''));
    }
    for (const d of ev.died) if (d.id === id) out.push(`r${ev.round} DIED at (${d.x},${d.y}), killed by ${d.by} (${UNIT[d.by_unit]})`);
    for (const b of ev.born) if (b.id === id) out.push(`r${ev.round} born at (${b.x},${b.y}) built by ${ev.robot.id}`);
  } });
  return [head || `robot ${id}: never acted`, ...out].join('\n');
}

function boardAt(buf, round) {
  let text = null;
  simulate(buf, { onRoundEnd(r, g) {
    if (r !== round) return;
    const n = g.map.length, rows = [];
    const ch = ['C', 'H', 'P', 'X', 'R', 'E'];
    for (let y = 0; y < n; y++) {
      let s = '';
      for (let x = 0; x < n; x++) {
        const id = g.shadow[y][x];
        if (id) { const o = g.getItem(id); s += o.team === 0 ? ch[o.unit] : ch[o.unit].toLowerCase(); }
        else s += !g.map[y][x] ? '#' : g.karbonite_map[y][x] ? 'K' : g.fuel_map[y][x] ? 'F' : '.';
      }
      rows.push(s);
    }
    text = `round ${round}\n` +
      'legend: castle C, church H, pilgrim P, crusader X, prophet R, preacher E (red upper, blue lower); # wall, K/F depots\n' + rows.join('\n');
  } });
  return text;
}

function events(buf, from = 0, to = Infinity, kinds = ['build', 'death', 'attack']) {
  const out = [];
  simulate(buf, { onTurn(ev) {
    if (ev.round < from || ev.round > to) return;
    const r = ev.robot, who = `${['R', 'B'][r.team]}${UNIT[r.unit]}#${r.id}(${r.x0},${r.y0})`;
    if (kinds.includes('build') && ev.rec.action === 3) for (const b of ev.born) out.push(`r${ev.round} ${who} builds ${UNIT[b.unit]}#${b.id} at (${b.x},${b.y})`);
    if (kinds.includes('attack') && ev.rec.action === 2 && !ev.error)
      out.push(`r${ev.round} ${who} attacks ${r.x0 + ev.rec.dx},${r.y0 + ev.rec.dy}: ` + (ev.damage.map(d => `${['R', 'B'][d.team]}${UNIT[d.unit]}#${d.id} -${d.dmg}${d.killed ? ' KILLED' : ''}`).join(' ') || 'nothing'));
    if (kinds.includes('death')) for (const d of ev.died) out.push(`r${ev.round} DEATH ${['R', 'B'][d.team]}${UNIT[d.unit]}#${d.id} at (${d.x},${d.y}) by #${d.by}`);
    if (kinds.includes('signal') && ev.rec.signal_radius) out.push(`r${ev.round} ${who} radio ${ev.rec.signal} r2=${ev.rec.signal_radius}`);
    if (kinds.includes('talk') && ev.rec.castle_talk) out.push(`r${ev.round} ${who} talk ${ev.rec.castle_talk}`);
    if (kinds.includes('error') && ev.error) out.push(`r${ev.round} ${who} invalid: ${ev.error}`);
  } });
  return out.join('\n');
}

// Navigation statistics per team and mobile unit type: moves, no-action turns, A-B-A oscillations, distinct tiles.
function nav(buf) {
  const per = new Map(); // id -> {team, unit, moves, still, osc, tiles:Set, hist:[]}
  simulate(buf, { onTurn(ev) {
    const r = ev.robot; if (r.unit < 2) return;
    let s = per.get(r.id);
    if (!s) { s = { team: r.team, unit: r.unit, turns: 0, moves: 0, still: 0, osc: 0, tiles: new Set([r.x0 + ',' + r.y0]), hist: [] }; per.set(r.id, s); }
    s.turns++;
    if (ev.rec.action === 1 && !ev.error) {
      s.moves++; s.tiles.add(r.x + ',' + r.y);
      const h = s.hist; h.push(r.x + ',' + r.y);
      if (h.length >= 3 && h[h.length - 1] === h[h.length - 3]) s.osc++;
      if (h.length > 3) h.shift();
    } else if (ev.rec.action === 0) s.still++;
  } });
  const agg = {};
  for (const s of per.values()) {
    const k = `${['red', 'blue'][s.team]}\t${UNIT[s.unit]}`;
    const a = agg[k] || (agg[k] = { n: 0, turns: 0, moves: 0, still: 0, osc: 0, tiles: 0 });
    a.n++; a.turns += s.turns; a.moves += s.moves; a.still += s.still; a.osc += s.osc; a.tiles += s.tiles.size;
  }
  const rows = ['team\tunit\tn\tturns\tmoves\tno_action\toscillations\tmean_tiles'];
  for (const k of Object.keys(agg).sort()) { const a = agg[k]; rows.push([k, a.n, a.turns, a.moves, a.still, a.osc, (a.tiles / a.n).toFixed(1)].join('\t')); }
  return rows.join('\n');
}

// Each castle and church's first round-end with an enemy combat unit within its vision (r2 100): the team's stores
// then, what that structure built in the next `window` rounds, and when (if) it died.
function threats(buf, window = 10) {
  const seen = new Map(); // structure id -> record
  const out = [];
  simulate(buf, {
    onTurn(ev) {
      for (const b of ev.born) { const s = seen.get(ev.robot.id); if (s && s.round !== null && ev.round <= s.round + window) s.built[b.unit]++; }
      for (const d of ev.died) { const s = seen.get(d.id); if (s && s.died === null) s.died = ev.round; }
    },
    onRoundEnd(round, g) {
      for (const st of g.robots) {
        if (st.unit > 1) continue;
        let s = seen.get(st.id);
        if (!s) { s = { id: st.id, team: st.team, unit: st.unit, x: st.x, y: st.y, round: null, built: [0, 0, 0, 0, 0, 0], died: null }; seen.set(st.id, s); out.push(s); }
        if (s.round !== null) continue;
        const near = [0, 0, 0, 0, 0, 0];
        for (const o of g.robots) if (o.team !== st.team && o.unit > 2 && (o.x - st.x) ** 2 + (o.y - st.y) ** 2 <= 100) near[o.unit]++;
        if (near[3] + near[4] + near[5]) Object.assign(s, { round, near, karbonite: g.karbonite[st.team], fuel: g.fuel[st.team] });
      }
    },
  });
  return out;
}

function threatText(rows) {
  return rows.map(s => `${['red', 'blue'][s.team]} ${UNIT[s.unit]}#${s.id} (${s.x},${s.y}): ` + (s.round === null ? 'never threatened' :
    `first threat r${s.round} (${fmtUnits(s.near)}) K ${s.karbonite} F ${s.fuel}; built next 10 rounds: ${fmtUnits(s.built)}`) +
    (s.died !== null ? `; died r${s.died}` : '')).join('\n');
}

// Fire efficiency per team and shooter type over rounds [from, to]: shots, fuel spent on them, damage to enemies
// and to friends, kills, and enemy damage per fuel (crusader and castle 1.0, prophet 0.4, preacher up to 1.33 x splash).
function fire(buf, from = 0, to = Infinity) {
  const rows = {};
  simulate(buf, { onTurn(ev) {
    if (ev.rec.action !== 2 || ev.error || ev.round < from || ev.round > to) return;
    const r = ev.robot, k = r.team + ':' + r.unit;
    const a = rows[k] || (rows[k] = { team: r.team, unit: r.unit, shots: 0, fuel: 0, enemy: 0, friendly: 0, kills: 0 });
    a.shots++; a.fuel += SPECS.UNITS[r.unit].ATTACK_FUEL_COST;
    for (const d of ev.damage) { if (d.team === r.team) a.friendly += d.dmg; else { a.enemy += d.dmg; if (d.killed) a.kills++; } }
  } });
  return Object.values(rows).sort((a, b) => a.team - b.team || a.unit - b.unit);
}

function fireText(rows) {
  return ['team\tshooter\tshots\tfuel\tenemy_dmg\tfriendly_dmg\tkills\tdmg_per_fuel',
    ...rows.map(a => [['red', 'blue'][a.team], UNIT[a.unit], a.shots, a.fuel, a.enemy, a.friendly, a.kills, (a.enemy / a.fuel).toFixed(2)].join('\t'))].join('\n');
}

// Movement fuel per team, window of rounds and unit type: where the fuel goes.
// back: fuel of moves that return a robot to the tile its previous move left (A -> B -> A: oscillation).
function moves(buf, every = 100) {
  const rows = new Map(), prev = new Map();
  simulate(buf, { onTurn(ev) {
    if (ev.rec.action !== 1 || ev.error) return;
    const r = ev.robot, from = Math.floor((ev.round - 1) / every) * every + 1, k = r.team + ':' + from;
    const a = rows.get(k) || rows.set(k, { team: r.team, from, fuel: [0, 0, 0, 0, 0, 0], n: [0, 0, 0, 0, 0, 0], back: 0 }).get(k);
    const f = (ev.rec.dx * ev.rec.dx + ev.rec.dy * ev.rec.dy) * SPECS.UNITS[r.unit].FUEL_PER_MOVE, p = prev.get(r.id);
    a.fuel[r.unit] += f; a.n[r.unit]++;
    if (p && p[0] === r.x && p[1] === r.y) a.back += f;
    prev.set(r.id, [r.x0, r.y0]);
  } });
  return [...rows.values()].sort((a, b) => a.team - b.team || a.from - b.from);
}

function movesText(rows) {
  const out = ['team\tfrom\ttotal\tpilgrim\tcrusader\tprophet\tpreacher\tmoves\tback'];
  for (const a of rows) out.push([['red', 'blue'][a.team], a.from, a.fuel.reduce((x, y) => x + y, 0), ...a.fuel.slice(2),
    a.n.reduce((x, y) => x + y, 0), a.back].join('\t'));
  return out.join('\n');
}

// Economy and army at checkpoint rounds (and the last round): what to compare between two bots' openings.
function timeline(buf, at = [25, 50, 75, 100, 150, 200, 300, 500, 700, 1000]) {
  const mined = [[0, 0], [0, 0]], moveF = [0, 0], rows = [];
  const snap = (round, g) => {
    for (const team of [0, 1]) {
      const s = teamState(g, team), u = s.units;
      rows.push({ round, team, castle: u[0], church: u[1], pilgrim: u[2], army: u[3] + u[4] + u[5], crusader: u[3],
        prophet: u[4], preacher: u[5], mined_k: mined[team][0],
        mined_f: mined[team][1], karbonite: s.karbonite, fuel: s.fuel, move_fuel: moveF[team] });
    }
  };
  let last = 0;
  const res = simulate(buf, {
    onTurn({ robot, rec, game, error }) {
      if (error) return;
      if (rec.action === 4) mined[robot.team][game.karbonite_map[robot.y][robot.x] ? 0 : 1] += game.karbonite_map[robot.y][robot.x] ? SPECS.KARBONITE_YIELD : SPECS.FUEL_YIELD;
      if (rec.action === 1) moveF[robot.team] += (rec.dx * rec.dx + rec.dy * rec.dy) * SPECS.UNITS[robot.unit].FUEL_PER_MOVE;
    },
    onRoundEnd(round, g) { if (at.includes(round)) { snap(round, g); last = round; } },
  });
  if (last !== res.game.round) snap(res.game.round, res.game);
  return rows;
}

function timelineText(rows) {
  const cols = ['round', 'castle', 'church', 'pilgrim', 'army', 'crusader', 'prophet', 'preacher', 'mined_k', 'mined_f',
    'karbonite', 'fuel', 'move_fuel'];
  const out = [];
  for (const team of [0, 1]) {
    out.push(`== ${['RED', 'BLUE'][team]}`, cols.join('\t'));
    for (const r of rows) if (r.team === team) out.push(cols.map(c => r[c]).join('\t'));
  }
  return out.join('\n');
}

module.exports = { timeline, timelineText, fire, fireText, moves, movesText, threats, threatText, parseHeader, simulate, analyze, summaryText, roundsCsv, unitLife, boardAt, events, nav, teamState, UNIT, ACTION };

if (require.main === module) {
  const argv = process.argv.slice(2), cmd = argv[0], file = argv[1];
  const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
  if (!cmd || !file) { console.error(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 19).join('\n')); process.exit(1); }
  const buf = fs.readFileSync(file);
  if (cmd === 'summary') console.log(summaryText(analyze(buf)));
  else if (cmd === 'json') console.log(JSON.stringify(analyze(buf)));
  else if (cmd === 'rounds') console.log(roundsCsv(buf, parseInt(opt('--every', '1'), 10)));
  else if (cmd === 'unit') console.log(unitLife(buf, parseInt(opt('--id'), 10)));
  else if (cmd === 'board') console.log(boardAt(buf, parseInt(opt('--round'), 10)));
  else if (cmd === 'events') console.log(events(buf, parseInt(opt('--from', '0'), 10), parseFloat(opt('--to', 'Infinity')), opt('--kind', 'build,death,attack').split(',')));
  else if (cmd === 'nav') console.log(nav(buf));
  else if (cmd === 'talk') console.log(events(buf, 0, Infinity, ['signal', 'talk']).split('\n').filter(l => !opt('--team') || l.includes(' ' + 'RB'[+opt('--team')])).join('\n'));
  else if (cmd === 'fire') console.log(fireText(fire(buf, parseInt(opt('--from', '0'), 10), parseFloat(opt('--to', 'Infinity')))));
  else if (cmd === 'moves') console.log(movesText(moves(buf, parseInt(opt('--every', '100'), 10))));
  else if (cmd === 'timeline') { const at = opt('--at'); console.log(timelineText(at ? timeline(buf, at.split(',').map(Number)) : timeline(buf))); }
  else if (cmd === 'threat') { const t = threats(buf); console.log(argv.includes('--json') ? JSON.stringify(t) : threatText(t)); }
  else { console.error('unknown command ' + cmd); process.exit(1); }
}
