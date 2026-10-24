#!/usr/bin/env node
// Side-symmetry check (owner prompt 4: "make sure that all moves are symmetric when switching sides").
// Plays the bot against itself with a *simultaneous* stepper: every round, all robots compute their actions from the
// same pre-round state, then the actions are applied. The engine's own turn order (red first) and its shuffle of the
// visible list are the only sources of side asymmetry in a real game; here each side's visible list is shuffled
// independently, and the clock is not enforced. The stepper takes the engine's order out of the result:
//   - attacks resolve first and together: every shot hits the pre-round board, and the dead are removed only after
//     all have fired (the engine's order lets the first of two duelling twins kill the other before it shoots);
//   - the other actions follow in twin pairs, red then its blue twin, so same-team conflicts resolve alike on both
//     sides; twins that aim at one tile (a tile on the mirror axis is its own mirror) both stay put, keeping their
//     signal and castle talk (the engine would give the tile to the first to act).
// A side-symmetric bot then keeps the whole game an exact mirror image: every robot has a twin at the mirrored tile
// with the same unit, health, cargo, signal and castle talk, and the team stores are equal. Any difference fails, at
// any round; it reports the first, with the twin pair after whose actions the board stopped mirroring.
//   node tools/symcheck.js --bot bots/v8 --seeds 1,2,3,2321 --rounds 1000
'use strict';
const fs = require('fs');
const path = require('path');
const ENGINE = path.join(__dirname, '..', 'engine', 'node_modules', 'bc19');
const Game = require(path.join(ENGINE, 'game'));
const CrossVM = require(path.join(ENGINE, 'vm'));
const ActionRecord = require(path.join(ENGINE, 'action_record'));
const SPECS = require(path.join(ENGINE, 'specs'));
const { symmetry } = require('./maps');
// The check is about decisions, not time: vm2's per-run wall-clock cut (TURN_MAX_TIME, read when a sandbox is made)
// would otherwise end it on a loaded host (the driver tripped it creating robots at round 171).
SPECS.TURN_MAX_TIME = 10000;

function compile(dir) {
  return new Promise((res, rej) => {
    const Compiler = require(path.join(ENGINE, 'compiler'));
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
    Compiler.JS(files.map(f => ({ filename: f, source: fs.readFileSync(path.join(dir, f), 'utf8') })), res, e => rej(new Error(String(e))));
  });
}

function mirrorFn(g) {
  const n = g.map.length, sym = symmetry(g.map);
  return sym === 'H' ? (x, y) => [x, n - 1 - y] : (x, y) => [n - 1 - x, y];
}

// First difference between the red half and the mirrored blue half, or null.
function diff(g, mir) {
  const blue = new Map(g.robots.filter(r => r.team === 1).map(r => [r.x + ',' + r.y, r]));
  const red = g.robots.filter(r => r.team === 0);
  for (const r of red) {
    const [x, y] = mir(r.x, r.y), b = blue.get(x + ',' + y);
    // A tile on the mirror axis is its own mirror: both twins may want it and only one can stand there. That
    // contest is decided by the engine's turn order, not by the bot (reported, not counted as a failure).
    if (!b && x === r.x && y === r.y) return 'CONTEST ' + `red ${r.unit}#${r.id} took axis tile (${x},${y})`;
    if (!b) return `red ${r.unit}#${r.id} at (${r.x},${r.y}) has no blue twin at (${x},${y})`;
    for (const f of ['unit', 'health', 'karbonite', 'fuel', 'signal', 'signal_radius', 'castle_talk'])
      if (r[f] !== b[f]) return `red #${r.id} (${r.x},${r.y}) vs blue #${b.id}: ${f} ${r[f]} vs ${b[f]}`;
  }
  if (red.length !== blue.size) {
    const redAt = new Set(red.map(r => mir(r.x, r.y).join(',')));
    const b = g.robots.find(q => q.team === 1 && !redAt.has(q.x + ',' + q.y));
    return `robot count red ${red.length} vs blue ${blue.size}` + (b ? `; blue ${b.unit}#${b.id} at (${b.x},${b.y}) has no red twin` : '');
  }
  if (g.karbonite[0] !== g.karbonite[1] || g.fuel[0] !== g.fuel[1]) return `stores red K${g.karbonite[0]} F${g.fuel[0]} vs blue K${g.karbonite[1]} F${g.fuel[1]}`;
  return null;
}

// The tile an action claims (move, build), or null.
const claim = (r, a) => a && (a.action === 'move' || a.action === 'build') ? (r.x + a.dx) + ',' + (r.y + a.dy) : null;

async function check(code, seed, rounds) {
  const g = new Game(seed, 1e9, 1e9, false, false);
  const mir = mirrorFn(g);
  const vms = new Map();
  const ensure = () => { for (const r of g.robots) if (!vms.has(r.id)) { vms.set(r.id, new CrossVM(code)); r.initialized = true; r.hook = true; } g.init_queue = 0; };
  ensure();
  const realRandom = Math.random, realDelete = g._deleteRobot;
  let firstAttack = 0;
  for (let round = 1; round <= rounds; round++) {
    g.round = round; g.fuel[0] += SPECS.TRICKLE_FUEL; g.fuel[1] += SPECS.TRICKLE_FUEL;
    const actors = g.robots.slice();
    for (const r of actors) r.turn++;
    // All dumps from the same pre-round state; each team's visible list shuffled by its own stream.
    const dumps = actors.map(r => { Math.random = realRandom; return g.getGameStateDump(r); });
    const acts = [];
    const errors = [];
    actors.forEach((r, i) => {
      let a = null;
      try { a = vms.get(r.id).turn(dumps[i]); } catch (e) { errors.push(`#${r.id}: ${String(e).slice(0, 200)}`); }
      if (a && a.logs) for (const l of a.logs) if (String(l).startsWith('"EXC')) errors.push(`#${r.id} unit ${r.unit}: ${String(l).slice(0, 300)}`);
      acts.push(a);
    });
    if (errors.length) return { seed, ok: false, round, why: 'exception: ' + errors[0] };
    // Apply in mirrored pairs: red robots in board order, each followed by its blue twin (the robot at the mirrored
    // tile), so conflicts between same-team actions computed from one state resolve identically on both sides.
    // Moves/attacks resolve against the state as it is applied, as in the engine.
    const n = g.map.length, key = r => { const [x, y] = r.team === 0 ? [r.x, r.y] : mir(r.x, r.y); return y * n + x; };
    const key0 = actors.map(key), order = actors.map((r, i) => i).sort((a, b) => key0[a] - key0[b] || actors[a].team - actors[b].team);
    const errs = [];
    const pre = actors.map(r => [r.x, r.y]), spent = [];
    if (!firstAttack && acts.some(a => a && a.action === 'attack')) firstAttack = round;
    const apply = (i, a) => { const r = actors[i];
      const rec = new ActionRecord(g, r), k0 = g.karbonite.slice(), f0 = g.fuel.slice();
      try { g.processAction(r, a, 0, rec); rec.enact(g, r); } catch (e) { errs[i] = String(e); /* invalid: does nothing */ }
      spent[i] = `K${g.karbonite[r.team] - k0[r.team]} F${g.fuel[r.team] - f0[r.team]}` + (g.karbonite[1 - r.team] !== k0[1 - r.team] || g.fuel[1 - r.team] !== f0[1 - r.team] ? ' +other' : '');
    };
    const pairOf = i => order.filter(q => key0[q] === key0[i]);
    const describe = (why, is) => ({ why, pair: is.map(q => ({ id: actors[q].id, unit: actors[q].unit, at: pre[q], spent: spent[q], err: errs[q], act: acts[q] && { ...acts[q], logs: undefined } })) });
    // mid: the first twin pair (one key) after whose actions the board stops being a mirror image.
    let mid = null;
    // Attacks, together: the dead stay on the board (and keep taking hits) until every shot has landed.
    const dead = new Set();
    g._deleteRobot = r => dead.add(r);
    try { for (const i of order) if (acts[i] && acts[i].action === 'attack') apply(i, acts[i]); }
    finally { g._deleteRobot = realDelete; }
    for (const r of dead) realDelete.call(g, r);
    if (dead.size || firstAttack === round) { const d = diff(g, mir); if (d) mid = describe('after the attacks: ' + d, order.filter(i => acts[i] && acts[i].action === 'attack')); }
    // The rest, in twin pairs; the killed do not act. Twins claiming one tile both stay put (signal and talk kept).
    order.forEach((i, idx) => { const r = actors[i], a = acts[i];
      if (a && a.action === 'attack' || !g.robots.includes(r)) return;
      const c = claim(r, a), twin = c && pairOf(i).find(q => q !== i && actors[q].team !== r.team);
      if (twin !== undefined && twin !== null && claim(actors[twin], acts[twin]) === c) { const { action, ...rest } = a; apply(i, rest); errs[i] = 'contested ' + c; }
      else apply(i, a);
      const nx = order[idx + 1];
      if (!mid && (nx === undefined || key0[nx] !== key0[i])) { const d = diff(g, mir); if (d) mid = describe(d, pairOf(i)); }
    });
    ensure();
    for (const id of vms.keys()) if (!g.robots.some(r => r.id === id)) vms.delete(id);   // a dead robot's sandbox
    const d = diff(g, mir);
    if (d) {
      const st = ` [stores K${g.karbonite[0]}/${g.karbonite[1]} F${g.fuel[0]}/${g.fuel[1]}]`;
      const ids = (d.match(/#(\d+)/g) || []).map(t => +t.slice(1));
      const detail = {}; for (const id of ids) { const i = actors.findIndex(r => r.id === id); if (i >= 0) detail[id] = { unit: actors[i].unit, at: pre[i], spent: spent[i], act: acts[i] && { ...acts[i], logs: undefined }, logs: acts[i] && acts[i].logs, err: errs[i] }; }
      return { seed, ok: false, round, why: d + st, firstAttack, detail, mid };
    }
  }
  return { seed, ok: true, round: rounds, robots: g.robots.length };
}

async function main() {
  const argv = process.argv.slice(2), opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
  const code = await compile(opt('--bot', 'src/bot'));
  const seeds = opt('--seeds', '2,5,8').split(',').map(Number), rounds = +opt('--rounds', '150');
  let bad = 0;
  for (const s of seeds) { const r = await check(code, s, rounds); if (r.ok === false) bad++; console.log(JSON.stringify(r)); }
  process.exit(bad ? 1 : 0);
}
module.exports = { check, compile, claim };
if (require.main === module) main().catch(e => { console.error(e.stack || e); process.exit(2); });
