#!/usr/bin/env node
// Headless Battlecode 2019 game runner on the pinned engine (engine/node_modules/bc19, 0.4.7).
// Drives Game + Coldbrew synchronously (no setInterval, no update-notifier, no network).
//
//   node tools/run_game.js --red <bot dir | bundle.js> --blue <bot dir | bundle.js> [--seed N]
//        [--replay out.bc19] [--logs out.jsonl] [--json out.json] [--det] [--chi 100] [--che 20]
//        [--max-rounds N] [--timescale K]
//
// --det        deterministic mode: seeds Math.random in the engine (the per-turn shuffle of visible robots) from
//              the game seed. Bots that use their own seeded PRNG then replay identically except for clock effects.
// --timescale  multiplies both chess-clock numbers (e.g. 4 on a slow or loaded machine for diagnostics; never in
//              evaluations: the contest clock is 100 ms + 20 ms/turn).
// Prints one JSON line: {winner:"red"|"blue", win_condition, reason, rounds, seed, map:{w,castles}, teams:[...]}.
'use strict';
const fs = require('fs');
const path = require('path');
const ENGINE = path.join(__dirname, '..', 'engine', 'node_modules', 'bc19');
const SPECS = require(path.join(ENGINE, 'specs'));

const REASONS = ['castles', 'health', 'coinflip', 'init_failure', 'both_init_failure'];

function parseArgs(argv) {
  const a = { seed: 0, chi: SPECS.CHESS_INITIAL, che: SPECS.CHESS_EXTRA, det: false, timescale: 1 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const v = () => argv[++i];
    if (k === '--red' || k === '-r') a.red = v();
    else if (k === '--blue' || k === '-b') a.blue = v();
    else if (k === '--seed' || k === '-s') a.seed = parseInt(v(), 10);
    else if (k === '--replay') a.replay = v();
    else if (k === '--logs') a.logs = v();
    else if (k === '--errlog') a.errlog = v();
    else if (k === '--json') a.json = v();
    else if (k === '--det') a.det = true;
    else if (k === '--chi') a.chi = parseFloat(v());
    else if (k === '--che') a.che = parseFloat(v());
    else if (k === '--max-rounds') a.maxRounds = parseInt(v(), 10);
    else if (k === '--timescale') a.timescale = parseFloat(v());
    else throw new Error('unknown argument ' + k);
  }
  if (!a.red || !a.blue) throw new Error('need --red and --blue');
  return a;
}

// xorshift128+-style PRNG for deterministic mode (engine-side Math.random only).
function seededRandom(seed) {
  let s0 = (seed ^ 0x9e3779b9) >>> 0 || 1, s1 = (seed * 2654435761) >>> 0 || 2;
  return function () {
    let x = s0, y = s1;
    s0 = y; x ^= x << 23; x ^= x >>> 17; x ^= y ^ (y >>> 26); s1 = x >>> 0;
    return ((s0 + s1) >>> 0) / 4294967296;
  };
}

// Compile a bot directory with the engine's own JS compiler (rollup; local, no network). Java/Python dirs must be
// transpiled beforehand by our local transpiler into a bundle (tools/compile_bot.js); the engine's Java/Python path
// posts to battlecode.org and is refused here.
function loadBot(p) {
  return new Promise((resolve, reject) => {
    const st = fs.statSync(p);
    if (st.isFile()) return resolve(fs.readFileSync(p, 'utf8'));
    const files = fs.readdirSync(p).filter(f => f.endsWith('.js') && !f.startsWith('.') && !fs.statSync(path.join(p, f)).isDirectory());
    if (!files.includes('robot.js')) return reject(new Error(p + ': no robot.js (Java/Python bots need a precompiled bundle)'));
    const Compiler = require(path.join(ENGINE, 'compiler'));
    const code = files.map(f => ({ filename: f, source: fs.readFileSync(path.join(p, f), 'utf8') }));
    Compiler.JS(code, resolve, e => reject(new Error(p + ': compile error: ' + e)));
  });
}

async function main() {
  const a = parseArgs(process.argv);
  if (a.det) Math.random = seededRandom(a.seed || 1);
  const Game = require(path.join(ENGINE, 'game'));
  const Coldbrew = require(path.join(ENGINE, 'runtime'));
  const [red, blue] = await Promise.all([loadBot(a.red), loadBot(a.blue)]);

  const seed = a.seed === 0 ? Math.floor(Math.random() * Math.pow(2, 31)) : a.seed;
  const g = new Game(seed, a.chi * a.timescale, a.che * a.timescale, false, !!a.replay);
  // Warm-up: the first vm2 sandbox in a process costs 50-150 ms (cold JIT), which can push a castle past the 100 ms
  // initialisation limit and lose the game for a harness reason. Create and discard sandboxes for both bundles first.
  const CrossVM = require(path.join(ENGINE, 'vm'));
  for (let i = 0; i < 3; i++) { new CrossVM(red); new CrossVM(blue); }
  const c = new Coldbrew(g, null, null, null);
  c.player_one = red; c.player_two = blue; c.round = 0;
  const initMs = [0, 0], origInit = c.initializeRobot.bind(c);
  c.initializeRobot = function () {
    const s = process.hrtime.bigint(); const before = new Set(g.robots.filter(r => r.initialized).map(r => r.id));
    origInit();
    const ms = Number(process.hrtime.bigint() - s) / 1e6;
    const r = g.robots.find(r => r.initialized && !before.has(r.id));
    if (r && ms > initMs[r.team]) initMs[r.team] = ms;
  };

  // Per-team instrumentation: wrap each robot's hook as it registers, to time turns as the engine does.
  const teams = [0, 1].map(() => ({ turns: 0, ms_total: 0, ms_max: 0, slow_turns: 0, robots_built: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }));
  const origRegister = g.registerHook.bind(g);
  g.registerHook = function (hook, id) {
    const robot = g.getItem(id);
    const t = teams[robot.team];
    t.robots_built[robot.unit]++;
    origRegister(function (dump) {
      const s = process.hrtime.bigint();
      try { return hook(dump); } finally {
        const ms = Number(process.hrtime.bigint() - s) / 1e6;
        t.turns++; t.ms_total += ms; if (ms > t.ms_max) t.ms_max = ms; if (ms > SPECS.CHESS_EXTRA) t.slow_turns++;
      }
    }, id);
  };

  const maxRounds = a.maxRounds || Infinity;
  const t0 = Date.now();
  const castleCount = g.robots.length / 2;
  const mapW = g.map.length;
  for (;;) {
    c.emptyQueue();
    if (g.isOver() || g.round > maxRounds) break;
    g.enactTurn();
  }
  const wall = (Date.now() - t0) / 1000;

  // Logs: g.logs[team] = [{type:'log'|'error', message, robot, timestamp}]
  const counts = [0, 1].map(team => {
    let logs = 0, errors = 0, frozen = 0, init_fail = 0, exceptions = 0, timeouts = 0, exc_caught = 0, slow_logged = 0;
    for (const e of g.logs[team]) {
      if (e.type === 'log') {
        logs++;
        // Our bots catch their own exceptions and log "EXC ..."; slow turns log "TIME ...".
        const m = String(e.message);
        if (m.startsWith('"EXC')) exc_caught++; else if (m.startsWith('"TIME')) slow_logged++;
      }
      else {
        errors++;
        const m = String(e.message);
        if (m.includes('frozen due to clock')) frozen++;
        else if (m.includes('Script execution timed out')) timeouts++;
        else if (m.includes('initialize')) init_fail++;
        else exceptions++;
      }
    }
    return { logs, errors, frozen, timeouts, init_fail, exceptions, exc_caught, slow_logged };
  });
  if (a.logs) {
    const out = [];
    for (const team of [0, 1]) for (const e of g.logs[team]) out.push(JSON.stringify({ team, ...e }));
    fs.writeFileSync(a.logs, out.join('\n') + '\n');
  }
  if (a.errlog) {
    // Errors plus our own EXC/TIME lines only, first 200 per team: small enough to keep for every batch game.
    const out = [];
    for (const team of [0, 1]) {
      let k = 0;
      for (const e of g.logs[team]) {
        const m = String(e.message);
        if (e.type === 'log' && !m.startsWith('"EXC') && !m.startsWith('"TIME')) continue;
        if (k++ >= 200) break;
        out.push(JSON.stringify({ team, type: e.type, robot: e.robot, message: m.slice(0, 600) }));
      }
    }
    fs.writeFileSync(a.errlog, out.join('\n') + '\n');
  }
  if (a.replay) fs.writeFileSync(a.replay, Buffer.from(new Uint8Array(g.replay)));

  const alive = [0, 1].map(team => {
    const u = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; let hp = 0;
    for (const r of g.robots) if (r.team === team) { u[r.unit]++; hp += r.health; }
    return { units: u, health: hp, karbonite: g.karbonite[team], fuel: g.fuel[team] };
  });
  const result = {
    winner: g.winner === 0 ? 'red' : g.winner === 1 ? 'blue' : null,
    win_condition: g.win_condition, reason: REASONS[g.win_condition], rounds: g.round, seed,
    map: { w: mapW, castles: castleCount }, wall_s: wall, det: a.det, timescale: a.timescale,
    red: a.red, blue: a.blue,
    teams: [0, 1].map(i => ({ team: i === 0 ? 'red' : 'blue', ...counts[i], ...alive[i],
      turns: teams[i].turns, ms_mean: teams[i].turns ? +(teams[i].ms_total / teams[i].turns).toFixed(3) : 0,
      ms_max: +teams[i].ms_max.toFixed(2), init_ms_max: +initMs[i].toFixed(1), slow_turns: teams[i].slow_turns, built: teams[i].robots_built })),
  };
  const line = JSON.stringify(result);
  if (a.json) fs.writeFileSync(a.json, line + '\n');
  console.log(line);
}

main().catch(e => { console.error(String(e && e.stack || e)); process.exit(2); });
