#!/usr/bin/env node
// Headless Battlecode 2019 game runner on the pinned engine (engine/node_modules/bc19, 0.4.7).
// Drives Game + Coldbrew synchronously (no setInterval, no update-notifier, no network).
//
//   node tools/run_game.js --red <bot dir | bundle.js> --blue <bot dir | bundle.js> [--seed N]
//        [--replay out.bc19] [--logs out.jsonl] [--json out.json] [--det] [--chi 100] [--che 20]
//        [--max-rounds N] [--timescale K] [--init-ms MS] [--fast-turn] [--fast-init] [--no-kill] [--fast-view]
//
// --det        deterministic mode: seeds Math.random in the engine (the per-turn shuffle of visible robots) from
//              the game seed. Bots that use their own seeded PRNG then replay identically except for clock effects.
// --timescale  multiplies both chess-clock numbers and vm2's hard limit (200 ms wall clock to load the code and for
//              every turn), for a slow or loaded machine (strategy batches on the shared VM use 2; the contest clock is
//              100 ms + 20 ms/turn, and time robustness is measured at 1).
// --init-ms    wall-clock limit for creating a robot's sandbox (the engine uses the clock's initial value, which
//              VM load alone overruns; LEARNINGS 3), and for vm2's run of the bundle inside it (see loadLimit). The
//              robot's clock still starts at the scaled initial value; its turns keep vm2's per-turn kill.
// --fast-turn  hand each turn to the sandbox through one precompiled script instead of fresh source text (see
//              fastTurn): same view, same vm2 kill. Turns then cost less than in the official engine, so time audits
//              run without it (owner approval, PROMPTS 14).
// --fast-init  compile each bundle once and run that compiled script in every new robot sandbox (see fastInit)
//              instead of the engine's fresh transform and compile of the bundle text per robot: the same code in the
//              same fresh vm2 VM under the same kill. Like --fast-turn it makes the harness cheaper than the engine.
// --no-kill    no vm2 kill on a turn (sandbox creation keeps --init-ms's bound): vm2 starts a watchdog thread for every
//              timed call, the largest cost of a game on the loaded VM. The chess clock still charges each turn, so a
//              slow robot still freezes; a turn that never returns hangs the game, so batch.js caps each game's wall
//              time. Only for batches of our own builds (strategy gates); time audits and the replica keep the kill.
// --fast-view  the engine's per-turn view of the map, computed over the robot's vision square instead of the whole map
//              (see fastView), and the turn message written without the engine's JSON copies (see fastDump): the same
//              view and the same text (with --fast-turn, rows out of sight travel as null and the turn script rebuilds
//              them: the same object).
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
    else if (k === '--init-ms') a.initMs = parseFloat(v());
    else if (k === '--fast-turn') a.fastTurn = true;
    else if (k === '--fast-init') a.fastInit = true;
    else if (k === '--no-kill') a.noKill = true;
    else if (k === '--fast-view') a.fastView = true;
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
  if (a.fastView) { fastView(Game); fastDump(Game, !!a.fastTurn); }
  const [red, blue] = await Promise.all([loadBot(a.red), loadBot(a.blue)]);

  const seed = a.seed === 0 ? Math.floor(Math.random() * Math.pow(2, 31)) : a.seed;
  const g = new Game(seed, a.chi * a.timescale, a.che * a.timescale, false, !!a.replay);
  const limits = setLimits(g, a);
  // Warm-up: the first vm2 sandbox in a process costs 50-150 ms (cold JIT), which can push a castle past the 100 ms
  // initialisation limit and lose the game for a harness reason. Create and discard sandboxes for both bundles first.
  const CrossVM = require(path.join(ENGINE, 'vm'));
  if (a.fastTurn) fastTurn(CrossVM);
  if (a.fastInit) fastInit([red, blue]);
  const create = a.initMs ? loadLimit(CrossVM, a.initMs) : fn => fn();
  // A bundle that throws (or times out) while loading is the engine's business (initializeRobot catches it and the
  // robot fails to initialise), so the warm-up must not let it crash the whole game.
  for (let i = 0; i < 3; i++) for (const code of [red, blue]) { try { create(() => new CrossVM(code)); } catch (e) { /* engine decides */ } }
  const c = new Coldbrew(g, null, null, null);
  c.player_one = red; c.player_two = blue; c.round = 0;
  const initMs = [0, 0], origInit = c.initializeRobot.bind(c);
  c.initializeRobot = function () {
    const s = process.hrtime.bigint(); const before = new Set(g.robots.filter(r => r.initialized).map(r => r.id));
    create(origInit);
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
    const kinds = new Map(), failed = new Set();   // error kinds (first line, numbers as #); robots whose init failed
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
        else if (m.includes('initialize')) { init_fail++; failed.add(e.robot); }
        else exceptions++;
        const k = m.split('\n')[0].slice(0, 90).replace(/[0-9]+(\.[0-9]+)?/g, '#');
        kinds.set(k, (kinds.get(k) || 0) + 1);
      }
    }
    // The five commonest error kinds: engine messages (frozen, not initialized, invalid actions) or a thrown error's
    // first line. Replica health: a robot whose sandbox failed to start repeats "not initialized" every turn.
    const err_kinds = Object.fromEntries([...kinds].sort((a, b) => b[1] - a[1]).slice(0, 5));
    return { logs, errors, frozen, timeouts, init_fail, init_robots: failed.size, exceptions, exc_caught, slow_logged, err_kinds };
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
    map: { w: mapW, castles: castleCount }, wall_s: wall, det: a.det, timescale: a.timescale, ...limits, fast_turn: !!a.fastTurn, fast_init: !!a.fastInit, no_kill: !!a.noKill, fast_view: !!a.fastView, net_isolated: netIsolated(),
    red: a.red, blue: a.blue,
    teams: [0, 1].map(i => ({ team: i === 0 ? 'red' : 'blue', ...counts[i], ...alive[i],
      turns: teams[i].turns, ms_mean: teams[i].turns ? +(teams[i].ms_total / teams[i].turns).toFixed(3) : 0,
      ms_max: +teams[i].ms_max.toFixed(2), init_ms_max: +initMs[i].toFixed(1), slow_turns: teams[i].slow_turns, built: teams[i].robots_built })),
  };
  const line = JSON.stringify(result);
  if (a.json) fs.writeFileSync(a.json, line + '\n');
  console.log(line);
}

// Time limits for game g (see --timescale, --init-ms). Returns them for the result line.
const TURN_MAX_TIME = SPECS.TURN_MAX_TIME;
function setLimits(g, a) {
  SPECS.TURN_MAX_TIME = a.noKill ? 0 : TURN_MAX_TIME * a.timescale;   // read by each new CrossVM (engine vm.js); 0: none
  const clock0 = g.chess_initial;
  if (a.initMs) {
    g.chess_initial = a.initMs;   // runtime.js initializeRobot compares sandbox creation time with this
    const gi = g.initializeRobot.bind(g);
    g.initializeRobot = function () { const r = gi(); if (r) r.time = clock0; return r; };
  }
  return { init_ms: g.chess_initial, turn_kill_ms: SPECS.TURN_MAX_TIME };
}

// --init-ms also bounds vm2's run of the bundle while a sandbox is created: the engine runs it under the per-turn kill
// (200 ms x timescale, vm.js), which a loaded VM overruns for a big bundle (replica match 306, 2026-10-22: StoneT2000
// lost 16 robots to "Failed to initialize: Error: Script execution timed out"). Each sandbox goes back to the per-turn
// kill at its first turn. Returns create(fn), which runs fn (a sandbox creation) under the limit of ms.
function loadLimit(CrossVM, ms) {
  const turn = CrossVM.prototype.turn;
  CrossVM.prototype.turn = function (message) {
    if (this.vm.timeout !== SPECS.TURN_MAX_TIME) this.vm.timeout = SPECS.TURN_MAX_TIME;
    return turn.call(this, message);
  };
  return fn => {
    const kill = SPECS.TURN_MAX_TIME;
    SPECS.TURN_MAX_TIME = Math.max(kill, ms);
    try { return fn(); } finally { SPECS.TURN_MAX_TIME = kill; }
  };
}

// The engine hands a robot its turn as source text, 'robot._do_turn(' + JSON of its view + ');', which vm2 parses
// (acorn) and V8 compiles anew on every turn: about half of a game's wall time (profile of a 200-round h19 self-play
// game: vm.Script 23%, runInContext 20%, acorn 7%; our bot's own functions a few percent each). fastTurn makes every
// CrossVM run one precompiled script, robot._do_turn(JSON.parse(view)), with the JSON text as a sandbox global: the
// bot gets an equal object under the same vm2 timeout; any other message still runs as source. With fastDump's
// compact view (--fast-view with --fast-turn) a row of the view out of sight comes as null and is rebuilt here as a
// copy of one row of -1s, which spares the sandbox parsing most of the view (vm2 micro-benchmark, a 64-tile map:
// 0.125 ms a turn -> 0.061; a push loop per row instead took 0.19).
const TURN_SCRIPT = '(function () { var v = JSON.parse(__bc19_view), s = v && v.shadow, w = 0, i, j, t;' +
  ' if (s && s.length) { for (i = 0; i < s.length; i++) if (s[i] !== null) { w = s[i].length; break; }' +
  ' for (i = 0; i < s.length; i++) if (s[i] === null) { if (!t) { t = []; for (j = 0; j < w; j++) t.push(-1); }' +
  ' s[i] = t.slice(); } }' +
  ' return robot._do_turn(v); })();';
function fastTurn(CrossVM) {
  const { VMScript } = require(path.join(ENGINE, '..', 'vm2'));
  const PRE = 'robot._do_turn(', POST = ');';
  const script = new VMScript(TURN_SCRIPT, 'turn.js');
  CrossVM.prototype.turn = function (message) {
    if (this.dead) throw 'Robot exceeded memory limits.';
    if (typeof message !== 'string' || !message.startsWith(PRE) || !message.endsWith(POST)) return this.vm.run(message);
    this.vm.setGlobal('__bc19_view', message.slice(PRE.length, -POST.length));
    return this.vm.run(script);
  };
}

// Every robot's sandbox runs its team's whole bundle (new CrossVM(code): vm2 VM.run of the text), and vm2 transforms
// (acorn) and V8 compiles that text anew each time: 43 ms per robot for our 50 KB bundle on the driver, 3.4 ms with
// the script compiled once (2026-10-22; a 300-round self-play game builds ~280 robots a team). fastInit gives vm2 one
// VMScript per bundle, compiled on first use with the engine's file name, and VM.run uses it whenever it is handed
// that bundle's text; any other code runs as before. Returns the scripts by bundle text.
function fastInit(bundles) {
  const { VM, VMScript } = require(path.join(ENGINE, '..', 'vm2'));
  const scripts = new Map(), run = VM.prototype.run;
  for (const code of bundles) if (!scripts.has(code)) scripts.set(code, new VMScript(code, 'vm.js'));
  VM.prototype.run = function (code, options) {
    const script = typeof code === 'string' && options === undefined ? scripts.get(code) : undefined;
    return script ? run.call(this, script) : run.call(this, code, options);
  };
  return scripts;
}

// The engine builds each turn's view by testing every tile of the map against the robot's vision radius (game.js
// getVisible: n*n Math.pow pairs per turn). fastView tests only the tiles of the square around the robot that holds
// its vision disc; every other tile stays -1, as the engine leaves it.
function fastView(Game) {
  Game.prototype.getVisible = function (robot) {
    const h = this.shadow.length, w = this.shadow[0].length, R = SPECS.UNITS[robot.unit]['VISION_RADIUS'];
    const view = Array(h);
    for (let i = 0; i < h; i++) view[i] = Array(w).fill(-1);
    const k = Math.floor(Math.sqrt(R));
    for (let r = Math.max(0, robot.y - k); r <= Math.min(h - 1, robot.y + k); r++) {
      const dy = robot.y - r;
      for (let c = Math.max(0, robot.x - k); c <= Math.min(w - 1, robot.x + k); c++) {
        const dx = robot.x - c;
        if (dx * dx + dy * dy <= R) view[r][c] = this.shadow[r][c];
      }
    }
    return view;
  };
}

// The engine's turn message (game.js getGameStateDump) copies every robot it shows by a JSON round trip (a castle shows
// every robot, every turn), then stringifies a fresh map-sized view with the rest. fastDump writes the same text
// directly: each shown robot's fields in their own order less the engine's deletions, and the view's rows straight
// from the shadow (a row out of sight is one cached string of -1s). The shuffle draws Math.random as the engine does.
// compact (only with fastTurn, whose turn script rebuilds them): a row out of sight is written as null.
function fastDump(Game, compact) {
  const quoted = new Map(), blank = new Map();
  const q = k => { let s = quoted.get(k); if (s === undefined) quoted.set(k, s = JSON.stringify(k)); return s; };
  const json = v => typeof v === 'number' ? (isFinite(v) ? String(v) : 'null') : JSON.stringify(v);
  const put = (out, k, v) => { const s = json(v); if (s !== undefined) out.push(q(k) + ':' + s); };
  const DROP = new Set(['initialized', 'hook', 'start_time', 'doing']), PRIVATE = new Set(['health', 'karbonite', 'fuel', 'time']);
  Game.prototype.getGameStateDump = function (robot) {
    const R = SPECS.UNITS[robot.unit]['VISION_RADIUS'], is_castle = robot.unit === SPECS.CASTLE;
    const shown = [];
    for (let i = 0; i < this.robots.length; i++) {
      const o = this.robots[i], dx = robot.x - o.x, dy = robot.y - o.y, d = dx * dx + dy * dy;
      const visible = d <= R, radioable = d <= o.signal_radius;
      if (!visible && !radioable && (!is_castle || robot.team !== o.team)) continue;
      const out = [];
      let signal = false, radius = false;
      for (const k of Object.keys(o)) {
        if (DROP.has(k) || (robot.id !== o.id && PRIVATE.has(k))) continue;
        if (!visible && (k === 'unit' || (!radioable && (k === 'x' || k === 'y')) || (!is_castle && k === 'team'))) continue;
        if (k === 'castle_talk' && (!is_castle || robot.team !== o.team)) continue;
        if (!radioable && k === 'signal') { signal = true; out.push('"signal":-1'); continue; }
        if (!radioable && k === 'signal_radius') { radius = true; out.push('"signal_radius":-1'); continue; }
        put(out, k, o[k]);
      }
      if (!radioable && !signal) out.push('"signal":-1');
      if (!radioable && !radius) out.push('"signal_radius":-1');
      shown.push('{' + out.join(',') + '}');
    }
    for (let i = shown.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)), x = shown[i];
      shown[i] = shown[j]; shown[j] = x;
    }
    const h = this.shadow.length, w = this.shadow[0].length, k = Math.floor(Math.sqrt(R)), rows = Array(h);
    let none = blank.get(w);
    if (none === undefined) blank.set(w, none = '[' + Array(w).fill(-1).join(',') + ']');
    for (let r = 0; r < h; r++) {
      if (r < robot.y - k || r > robot.y + k) { rows[r] = compact ? 'null' : none; continue; }
      const dy = robot.y - r, row = this.shadow[r], cells = Array(w);
      for (let c = 0; c < w; c++) {
        const dx = robot.x - c;
        const s = dx * dx + dy * dy <= R ? json(row[c]) : '-1';
        cells[c] = s === undefined ? 'null' : s;
      }
      rows[r] = '[' + cells.join(',') + ']';
    }
    const out = [];
    put(out, 'id', robot.id);
    out.push('"shadow":[' + rows.join(',') + ']', '"visible":[' + shown.join(',') + ']');
    put(out, 'map', robot.turn === 1 ? this.map : [[0], [0]]);
    put(out, 'karbonite_map', robot.turn === 1 ? this.karbonite_map : [[0], [0]]);
    put(out, 'fuel_map', robot.turn === 1 ? this.fuel_map : [[0], [0]]);
    put(out, 'fuel', this.fuel[robot.team]);
    put(out, 'karbonite', this.karbonite[robot.team]);
    put(out, 'last_offer', robot.unit === SPECS.CASTLE ? this.last_offer : null);
    return 'robot._do_turn({' + out.join(',') + '});';
  };
}

// Bot code runs only without network (CLAUDE.md rule 6). batch.js starts every game inside `unshare -rn`; a direct
// call outside a network namespace re-runs itself there, and refuses to run if it cannot.
// A sandbox that forbids netlink sockets cannot list addresses (systemd RestrictAddressFamilies, the replica's saturn
// unit: EAFNOSUPPORT); /proc/net/dev names the interfaces of this process's network namespace instead.
function netIsolated() {
  let ifs;
  try { ifs = require('os').networkInterfaces(); } catch (e) {
    try { return fs.readFileSync('/proc/net/dev', 'utf8').split('\n').slice(2).every(l => !l.trim() || l.trim().startsWith('lo:')); }
    catch (e2) { return false; }
  }
  return Object.keys(ifs).every(k => ifs[k].every(x => x.internal));
}

if (require.main === module) {
  if (!netIsolated()) {
    const r = require('child_process').spawnSync('unshare', ['-rn', process.execPath, ...process.argv.slice(1)], { stdio: 'inherit' });
    if (r.error || r.status === null) { console.error('unshare -rn failed: refusing to run bot code with network access'); process.exit(3); }
    process.exit(r.status);
  }
  main().catch(e => { console.error(String(e && e.stack || e)); process.exit(2); });
}
module.exports = { setLimits, parseArgs, fastTurn, fastInit, fastView, fastDump, loadLimit, netIsolated, TURN_SCRIPT };
