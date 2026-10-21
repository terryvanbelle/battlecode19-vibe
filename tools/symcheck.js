#!/usr/bin/env node
// Side-symmetry check (owner prompt 4: "make sure that all moves are symmetric when switching sides").
// Plays the bot against itself with a *simultaneous* stepper: every round, all robots compute their actions from the
// same pre-round state, then the actions are applied. The engine's own turn order (red first) and its shuffle of the
// visible list are the only sources of side asymmetry in a real game; here each side's visible list is shuffled
// independently, and the clock is not enforced. A side-symmetric bot keeps the game an exact mirror image:
// every robot has a twin at the mirrored tile with the same unit, health, cargo, signal and castle talk, and the
// team stores are equal. Reports the first round and robot where that fails.
//   node tools/symcheck.js --bot src/bot --seeds 2,5,8 --rounds 150
'use strict';
const fs = require('fs');
const path = require('path');
const ENGINE = path.join(__dirname, '..', 'engine', 'node_modules', 'bc19');
const Game = require(path.join(ENGINE, 'game'));
const CrossVM = require(path.join(ENGINE, 'vm'));
const ActionRecord = require(path.join(ENGINE, 'action_record'));
const SPECS = require(path.join(ENGINE, 'specs'));
const { symmetry } = require('./maps');

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
  if (g.karbonite[0] !== g.karbonite[1] || g.fuel[0] !== g.fuel[1]) return `stores red K${g.karbonite[0]} F${g.fuel[0]} vs blue K${g.karbonite[1]} F${g.fuel[1]}`;
  const blue = new Map(g.robots.filter(r => r.team === 1).map(r => [r.x + ',' + r.y, r]));
  const red = g.robots.filter(r => r.team === 0);
  if (red.length !== blue.size) return `robot count red ${red.length} vs blue ${blue.size}`;
  for (const r of red) {
    const [x, y] = mir(r.x, r.y), b = blue.get(x + ',' + y);
    if (!b) return `red ${r.unit}#${r.id} at (${r.x},${r.y}) has no blue twin at (${x},${y})`;
    for (const f of ['unit', 'health', 'karbonite', 'fuel', 'signal', 'signal_radius', 'castle_talk'])
      if (r[f] !== b[f]) return `red #${r.id} (${r.x},${r.y}) vs blue #${b.id}: ${f} ${r[f]} vs ${b[f]}`;
  }
  return null;
}

async function check(code, seed, rounds) {
  const g = new Game(seed, 1e9, 1e9, false, false);
  const mir = mirrorFn(g);
  const vms = new Map();
  const ensure = () => { for (const r of g.robots) if (!vms.has(r.id)) { vms.set(r.id, new CrossVM(code)); r.initialized = true; r.hook = true; } g.init_queue = 0; };
  ensure();
  const realRandom = Math.random;
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
    // Apply: red and blue interleaved in mirrored pairs so stores move identically. Moves/attacks resolve against
    // the state as it is applied, as in the engine.
    actors.forEach((r, i) => {
      if (!g.robots.includes(r)) return; // killed earlier this round
      const rec = new ActionRecord(g, r);
      try { g.processAction(r, acts[i], 0, rec); rec.enact(g, r); } catch (e) { /* invalid: does nothing */ }
    });
    ensure();
    const d = diff(g, mir);
    if (d) return { seed, ok: false, round, why: d };
  }
  return { seed, ok: true, round: rounds, robots: g.robots.length };
}

async function main() {
  const argv = process.argv.slice(2), opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
  const code = await compile(opt('--bot', 'src/bot'));
  const seeds = opt('--seeds', '2,5,8').split(',').map(Number), rounds = +opt('--rounds', '150');
  let bad = 0;
  for (const s of seeds) { const r = await check(code, s, rounds); if (!r.ok) bad++; console.log(JSON.stringify(r)); }
  process.exit(bad ? 1 : 0);
}
module.exports = { check, compile };
if (require.main === module) main().catch(e => { console.error(e.stack || e); process.exit(2); });
