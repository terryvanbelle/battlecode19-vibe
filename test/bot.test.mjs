// Unit tests for the bot's pure modules (src/bot). Run by tools/unit-tests.sh.
import test from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';
import * as S from '../src/bot/specs.js';
import { offsets, rng, d2, king } from '../src/bot/util.js';
import { depots, clusters, bfs, costField } from '../src/bot/mapinfo.js';
import { Nav, fuelStep } from '../src/bot/nav.js';
import { encXY, encNum, dec, SIG, FAR, CT, decFarRobot } from '../src/bot/comms.js';
import { nextTarget, isChoke, militaryTurn, holdTarget, watchDeaths, inZone, hearZones } from '../src/bot/military.js';
import { callDue, castleTurn, nextPioneer, pioneerDue } from '../src/bot/castle.js';
import { churchTurn } from '../src/bot/church.js';
import { structInit, frontSite, frontPioneer, sayZone } from '../src/bot/struct.js';
import { report as planReport } from '../tools/plan.mjs';
import { minesNow, pilgrimTurn, stepAvoid } from '../src/bot/pilgrim.js';
import { CFG } from '../src/bot/config.js';
import { World, makeTransform, detectSymmetry } from '../src/bot/world.js';
import { pickTarget, preacherTarget, retreatStep } from '../src/bot/combat.js';
const require = createRequire(import.meta.url);
const SPECS = require('../engine/node_modules/bc19/specs.json');
const Game = require('../engine/node_modules/bc19/game.js');

test('specs.js matches the engine', () => {
  for (let u = 0; u < 6; u++) {
    const E = SPECS.UNITS[u], M = S.STATS[u];
    assert.strictEqual(M.costK, E.CONSTRUCTION_KARBONITE || 0, 'costK ' + u);
    assert.strictEqual(M.costF, E.CONSTRUCTION_FUEL || 0, 'costF ' + u);
    assert.strictEqual(M.hp, E.STARTING_HP);
    assert.strictEqual(M.vision, E.VISION_RADIUS);
    assert.strictEqual(M.speed, E.SPEED || 0);
    assert.strictEqual(M.fuelPerMove, E.FUEL_PER_MOVE || 0);
    assert.strictEqual(M.damage, E.ATTACK_DAMAGE || 0);
    assert.strictEqual(M.atkFuel, E.ATTACK_FUEL_COST || 0);
    assert.strictEqual(M.splash, E.DAMAGE_SPREAD || 0);
    if (E.ATTACK_RADIUS) assert.deepStrictEqual([M.atkMin, M.atkMax], E.ATTACK_RADIUS);
  }
  assert.strictEqual(S.KARB_CAP, SPECS.UNITS[2].KARBONITE_CAPACITY);
  assert.strictEqual(S.FUEL_CAP, SPECS.UNITS[2].FUEL_CAPACITY);
  assert.strictEqual(S.KARB_YIELD, SPECS.KARBONITE_YIELD);
  assert.strictEqual(S.FUEL_YIELD, SPECS.FUEL_YIELD);
});

test('util: offsets, rng, distances', () => {
  assert.strictEqual(offsets(4).length, 12);
  assert.strictEqual(offsets(9).length, 28);
  assert.strictEqual(offsets(64, 16).every(o => o[2] >= 16 && o[2] <= 64), true);
  const a = rng(5), b = rng(5); for (let i = 0; i < 10; i++) { const v = a(); assert.strictEqual(v, b()); assert.ok(v >= 0 && v < 1); }
  assert.strictEqual(d2(0, 0, 3, 4), 25); assert.strictEqual(king(0, 0, 3, 4), 4);
});

// A World over a generated game, seen by robot r (engine frame). occ() uses the game's robot positions.
function worldFor(g, r) {
  const n = g.map.length, shadow = Array.from({ length: n }, () => Array(n).fill(0));
  for (const q of g.robots) shadow[q.y][q.x] = q.id;
  const api = { map: g.map, karbonite_map: g.karbonite_map, fuel_map: g.fuel_map, me: r, karbonite: 100, fuel: 500,
    getVisibleRobotMap: () => shadow, getVisibleRobots: () => g.robots.map(q => ({ ...q })), log() {},
    move: (dx, dy) => ({ action: 'move', dx, dy }), attack: (dx, dy) => ({ action: 'attack', dx, dy }),
    buildUnit: (u, dx, dy) => ({ action: 'build', u, dx, dy }), give: (dx, dy) => ({ action: 'give', dx, dy }),
    mine: () => ({ action: 'mine' }), signal() {}, castleTalk() {} };
  const w = new World(api); w.update(); return w;
}

test('world: transforms round-trip and directions agree', () => {
  for (const sym of ['H', 'V']) for (const team of [0, 1]) {
    const n = 7, T = makeTransform(sym, team, n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const [cx, cy] = T.toC(x, y); assert.deepStrictEqual(T.toE(cx, cy), [x, y]);
      for (const [dx, dy] of [[1, 0], [0, 1], [-1, 2]]) {
        const e2 = T.toE(cx + dx, cy + dy), d = T.dirE(dx, dy);
        assert.deepStrictEqual([e2[0] - x, e2[1] - y], d, sym + team);
      }
    }
  }
});

test('world: both teams see the same canonical board, own castles on top, enemies at the mirror', () => {
  for (const seed of [1, 2, 3, 5, 8, 13, 21, 34]) {
    const g = new Game(seed, 100, 20, false, false);
    const red = g.robots.find(r => r.team === 0), blue = g.robots.find(r => r.team === 1);
    const wr = worldFor(g, red), wb = worldFor(g, blue), n = wr.n;
    assert.strictEqual(detectSymmetry(g.map, g.karbonite_map, g.fuel_map), wr.sym);
    assert.deepStrictEqual(wr.pass, wb.pass, 'seed ' + seed); assert.deepStrictEqual(wr.karb, wb.karb); assert.deepStrictEqual(wr.fuelD, wb.fuelD);
    for (const w of [wr, wb]) {
      const own = w.robots.filter(r => r.team === w.team), them = w.robots.filter(r => r.team !== w.team);
      assert.ok(own.length && own.length === them.length);
      for (const c of own) {
        assert.ok(c.y < n / 2, 'seed ' + seed + ' castle not on top');
        const [mx, my] = w.mirror(c.x, c.y); assert.ok(them.some(e => e.x === mx && e.y === my));
      }
      // Canonical occupancy agrees with canonical robot positions; the list is in position order.
      for (const r of w.robots) assert.strictEqual(w.occ(r.x, r.y), r.id);
      for (let i = 1; i < w.robots.length; i++) assert.ok(w.robots[i].y * n + w.robots[i].x > w.robots[i - 1].y * n + w.robots[i - 1].x);
    }
    // The twin castles of the two teams sit on the same canonical tiles.
    const key = w => w.robots.filter(r => r.team === w.team).map(r => r.x + ',' + r.y).join(' ');
    assert.strictEqual(key(wr), key(wb));
  }
});

test('mapinfo: clusters partition depots, sites are free tiles, bfs counts moves', () => {
  const g = new Game(2, 100, 20, false, false), w = worldFor(g, g.robots[0]), n = w.n;
  const deps = depots(w), cs = clusters(w, deps, 10);
  assert.strictEqual(cs.reduce((s, c) => s + c.depots.length, 0), deps.length);
  for (const c of cs) { const i = c.site[1] * n + c.site[0]; assert.ok(w.pass[i] && !w.karb[i] && !w.fuelD[i]); }
  cs.forEach((c, i) => assert.strictEqual(c.i, i));
  const me = w.me, f = bfs(w, [[me.x, me.y]], offsets(2));
  assert.strictEqual(f[me.y * n + me.x], 0);
  for (let i = 0; i < w.N; i++) if (!w.pass[i]) assert.strictEqual(f[i], -1);
});

// A tiny open World stub for nav tests.
function stubWorld(n, walls, robots) {
  const pass = new Uint8Array(n * n).fill(1); for (const [x, y] of walls) pass[y * n + x] = 0;
  const w = { n, N: n * n, pass, me: { x: 0, y: 0 }, occ: (x, y) => (robots.some(r => r[0] === x && r[1] === y) ? 9 : 0) };
  return w;
}

test('nav: steps descend to the goal around a wall, and never enter occupied tiles', () => {
  const n = 8, walls = []; for (let y = 0; y < 7; y++) walls.push([4, y]);
  const w = stubWorld(n, walls, []), nav = new Nav(w, offsets(4), rng(1));
  let steps = 0;
  while ((w.me.x !== 7 || w.me.y !== 0) && steps < 30) {
    const s = nav.step('g', [[7, 0]], 4); assert.ok(s, 'stuck at ' + w.me.x + ',' + w.me.y);
    w.me = { x: w.me.x + s[0], y: w.me.y + s[1] }; assert.ok(w.pass[w.me.y * n + w.me.x]); steps++;
  }
  assert.ok(steps <= 10);
  const w2 = stubWorld(n, [], [[1, 1]]), nav2 = new Nav(w2, offsets(2), rng(2));
  const s = nav2.step('t', [[1, 1]], 2); assert.ok(!s || !(s[0] === 1 && s[1] === 1));
  assert.strictEqual(fuelStep(100, 4, 1, 98), 2); assert.strictEqual(fuelStep(10, 9, 2, 0), 5);
});

test('nav: NAV_FIT: a step capped below full speed makes progress every turn on open ground', () => {
  const saved = CFG.NAV_FIT;
  try {
    const run = fit => {
      CFG.NAV_FIT = fit;
      const n = 12, w = stubWorld(n, [], []), nav = new Nav(w, offsets(4), rng(4)), out = [];
      for (let t = 0; t < 20 && (w.me.x !== 0 || w.me.y !== 11); t++) {
        const s = nav.step('g', [[0, 11]], 2); out.push(s ? 'm' : '-');
        if (s) w.me = { x: w.me.x + s[0], y: w.me.y + s[1] };
      }
      return out.join('');
    };
    assert.strictEqual(run(1), 'm'.repeat(11));   // 11 tiles, 11 turns
    assert.ok(run(0).includes('-'));              // the full-speed field: waits on the way
  } finally { CFG.NAV_FIT = saved; }
});

test('nav: a blocked robot waits ladder[0] turns before sliding and ladder[1] before stepping back', () => {
  // Corridor y = 1 between walls; the goal (5,1) lies behind a friend at (2,1); the robot stands at (1,1).
  const n = 7, walls = []; for (let x = 0; x < n; x++) { walls.push([x, 0]); walls.push([x, 2]); }
  for (let y = 3; y < n; y++) for (let x = 0; x < n; x++) walls.push([x, y]);
  const run = ladder => {
    const w = stubWorld(n, walls, [[2, 1]]); w.me = { x: 1, y: 1 };
    const nav = new Nav(w, offsets(2), rng(3)), out = [];
    for (let t = 0; t < 8; t++) { const s = nav.step('g', [[5, 1]], 2, undefined, ladder); out.push(s ? s.join(',') : '-'); }
    return out;
  };
  // no equal-distance tile exists in a corridor, so the first move is the step back at ladder[1] blocked turns
  assert.deepStrictEqual(run([2, 4]).slice(0, 4), ['-', '-', '-', '-1,0']);
  assert.deepStrictEqual(run([6, 7]).slice(0, 7), ['-', '-', '-', '-', '-', '-', '-1,0']);
  // Once over the threshold a robot keeps moving every turn unless the count restarts after each move.
  const moves = l => run(l).filter(m => m !== '-').length;
  assert.ok(moves([2, 4]) >= 4); assert.strictEqual(moves([2, 4, true]), 2);
});

test('nav: detour: a robot facing a jammed corridor replans around it (and is stuck without detour)', () => {
  // 9x9: open rows y = 0, 4, 8 and columns x = 0, 8; row 4 is a 1-wide corridor that friends block at x = 2..4.
  const n = 9, walls = [], jam = [[2, 4], [3, 4], [4, 4]];
  for (let x = 1; x <= 7; x++) for (const y of [1, 2, 3, 5, 6, 7]) walls.push([x, y]);
  const w0 = stubWorld(n, walls, jam);
  assert.deepStrictEqual([...costField(w0, [[8, 4]], offsets(2), () => 1)], [...bfs(w0, [[8, 4]], offsets(2))]);
  const run = detour => {
    const w = stubWorld(n, walls, jam); w.friends = jam.map(([x, y]) => ({ x, y })); w.me = { x: 1, y: 4, turn: 0 };
    const nav = new Nav(w, offsets(2), rng(5));
    for (let t = 1; t <= 40; t++) {
      w.me.turn = t;
      const s = nav.step('g', [[8, 4]], 2, undefined, [2, 4, false], detour);
      if (s) w.me = { x: w.me.x + s[0], y: w.me.y + s[1], turn: t };
      if (w.me.x === 8 && w.me.y === 4) return t;
    }
    return null;
  };
  assert.strictEqual(run(null), null);
  const t = run([3, 5, 10, 30]); assert.ok(t !== null && t <= 25, 'arrived at turn ' + t);
});

test('pilgrim: KARB_STOP pauses karbonite (not fuel) mining while the stockpile is high', () => {
  const saved = CFG.KARB_STOP;
  try {
    CFG.KARB_STOP = 0; assert.ok(minesNow({ karbonite: 5000 }, { k: true }));
    CFG.KARB_STOP = 500;
    assert.ok(!minesNow({ karbonite: 500 }, { k: true })); assert.ok(minesNow({ karbonite: 499 }, { k: true }));
    assert.ok(minesNow({ karbonite: 5000 }, { k: false }));
  } finally { CFG.KARB_STOP = saved; }
});

test('comms: encode/decode', () => {
  const m = dec(encXY(SIG.CHURCH, 63, 5)); assert.deepStrictEqual([m.type, m.x, m.y], [SIG.CHURCH, 63, 5]);
  assert.strictEqual(dec(encNum(SIG.ROUND, 999)).v, 999);
  assert.ok(encXY(15, 63, 63) < 65536);
  const f = decFarRobot({ signal: encXY(0, 12, 40), signal_radius: FAR.ATTACK });
  assert.deepStrictEqual([f.type, f.x, f.y], [SIG.ATTACK, 12, 40]);
  assert.strictEqual(decFarRobot({ signal: 5, signal_radius: 400 }), null);
  const g = decFarRobot({ signal: encXY(3, 7, 50), signal_radius: FAR.WIDE });   // map-wide ATTACK, castle index 2
  assert.deepStrictEqual([g.type, g.x, g.y, g.extra], [SIG.ATTACK, 7, 50, 3]);
  assert.ok(FAR.WIDE <= 2 * 63 * 63 && Math.ceil(Math.sqrt(FAR.WIDE)) === 90);
  // castle talk ranges never overlap: unit status 64..69, kill reports 72..75, march 80..85, taken 88..127, churches 128+
  assert.ok(CT.UNIT + 5 < CT.DEAD && CT.DEAD + 3 < CT.MARCH && CT.MARCH + 5 < CT.TAKEN && CT.TAKEN + 39 < CT.CHURCH);
});

test('world: a signal lowers the fuel that later affordability checks see', () => {
  const sent = [], w = Object.assign(Object.create(World.prototype), { api: { signal: (v, r) => sent.push([v, r]) }, karbonite: 100, fuel: 70 });
  assert.ok(w.canAfford(S.PROPHET)); w.signal(1, 398);
  assert.deepStrictEqual(sent, [[1, 398]]); assert.strictEqual(w.fuel, 50); assert.ok(w.canAfford(S.PROPHET));
  w.signal(1, 2); assert.strictEqual(w.fuel, 48); assert.ok(!w.canAfford(S.PROPHET));
});

test('military: after a kill, report it and march on the nearest other known enemy castle, else wait', () => {
  const B = { round: 500, w: { me: { x: 10, y: 40 } },
    st: { tIdx: 1, known: [[30, 50], [10, 45], [12, 60]], dead: new Set(), reports: [], waitUntil: 0, target: null } };
  nextTarget(B);
  assert.deepStrictEqual([...B.st.dead], [1]); assert.deepStrictEqual(B.st.reports, [1]);
  assert.deepStrictEqual(B.st.target, [12, 60]); assert.strictEqual(B.st.tIdx, 2);
  B.st.target = null; nextTarget(B); B.st.target = null; nextTarget(B);
  assert.deepStrictEqual([...B.st.dead].sort(), [0, 1, 2]); assert.strictEqual(B.st.target, null);
  assert.ok(B.st.waitUntil > B.round);
});

test('castle: attack calls every ATTACK_EVERY rounds, or (WAVE) 3 rounds once enough units are free, then a gap', () => {
  const saved = { WAVE: CFG.WAVE, WAVE_GAP: CFG.WAVE_GAP };
  try {
    const B = { round: 500, st: { count: [2, 0, 5, 10, 6, 4], march: 12 } };
    CFG.WAVE = 0;
    assert.strictEqual(callDue(B), B.round % CFG.ATTACK_EVERY === 0);
    CFG.WAVE = 10; CFG.WAVE_GAP = 15;
    const calls = [];
    for (B.round = 500; B.round < 540; B.round++) {
      if (B.round === 510) B.st.march = 0;   // 20 military, 12 then 0 marching: free 8 < 10, then 20
      if (callDue(B)) calls.push(B.round);
    }
    assert.deepStrictEqual(calls, [510, 511, 512, 528, 529, 530]);
    B.st = { count: [2, 0, 5, 10, 6, 4], march: 20 }; B.round = 960;   // last rounds: call regardless
    assert.ok(callDue(B));
  } finally { Object.assign(CFG, saved); }
});

test('military: chokepoints are tiles whose passable neighbours fall apart without them', () => {
  const rows = ['#########',
                '#.......#',
                '#######.#',
                '........#',
                '........#'];
  const w = { passable: (x, y) => y >= 0 && y < rows.length && x >= 0 && x < 9 && rows[y][x] === '.' };
  assert.ok(isChoke(w, 3, 1));    // 1-wide corridor
  assert.ok(isChoke(w, 7, 2));    // its 1-wide turn
  assert.ok(!isChoke(w, 1, 1));   // its dead end
  assert.ok(!isChoke(w, 3, 3));   // 2-wide open edge
  assert.ok(!isChoke(w, 3, 4));   // map edge with open ground above
});

// The engine kills a turn that runs past 200 ms wherever it is (a GC pause can do it on a light turn), keeping whatever
// the robot wrote so far. Kill each role's first turn after its k-th write to B or B.st, for every k: the next turns
// must not throw and must finish the setup, with the birth round still right.
test('roles: a first turn killed at any point is recovered on the next turn', () => {
  const g = new Game(3, 100, 20, false, false), n = g.map.length;
  const castle = g.robots.find(r => r.team === 0);
  const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
  const near = () => { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) if (free(castle.x + dx, castle.y + dy)) return [castle.x + dx, castle.y + dy]; };
  const play = (unit, turnFn) => {
    let writes = 0;
    for (let k = 1; ; k++) {
      castle.turn = 10;
      let me = castle;
      if (unit !== S.CASTLE) {
        const [x, y] = near();
        me = { id: 4000 + unit, team: 0, unit, x, y, turn: 1, health: S.STATS[unit].hp, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
        g.robots.push(me);
      } else me.turn = 1;
      const w = worldFor(g, me), raw = { api: w.api, w, round: 0, birthRound: unit === S.CASTLE ? 1 : 0, st: {}, deps: null, clusters: null };
      raw.rnd = rng(7); if (S.STATS[unit].speed) { raw.offs = offsets(S.STATS[unit].speed); raw.nav = new Nav(w, raw.offs, raw.rnd); }
      let count = 0, killed = false;
      const trap = o => new Proxy(o, { set(t, p, v) { if (++count === k) throw new Error('killed'); t[p] = v; return true; } });
      const st = raw.st; raw.st = trap(st); const B = trap(raw);
      try { turnFn(B); } catch (e) { if (e.message !== 'killed') throw e; killed = true; }
      raw.st = st;
      if (!killed) { writes = count; break; }
      for (let t = 2; t <= 4; t++) {
        me.turn = t; castle.turn = 9 + t; w.update();
        if (raw.birthRound) raw.round = raw.birthRound + t - 1;
        assert.doesNotThrow(() => turnFn(raw), 'unit ' + unit + ' killed after write ' + k + ', turn ' + t);
      }
      assert.ok(st.ready, 'unit ' + unit + ' k ' + k);
      if (unit !== S.CASTLE && unit !== S.CHURCH) assert.strictEqual(raw.birthRound, 10, 'unit ' + unit + ' k ' + k);
      if (me !== castle) g.robots.pop();
    }
    assert.ok(writes >= 3, 'unit ' + unit + ' setup writes ' + writes);
  };
  play(S.CASTLE, castleTurn); play(S.CHURCH, churchTurn); play(S.PILGRIM, pilgrimTurn);
  for (const u of [S.CRUSADER, S.PROPHET, S.PREACHER]) play(u, militaryTurn);
});

test('struct: DEF_RESERVE_K holds karbonite back from pilgrims and the guard, not from a threat response', () => {
  const saved = CFG.DEF_RESERVE_K;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const turn1 = (reserve, enemy) => {
      CFG.DEF_RESERVE_K = reserve; castle.turn = 1;
      const extra = enemy ? [{ id: 4999, team: 1, unit: S.CRUSADER, x: castle.x, y: castle.y + 3, turn: 5, health: 40, signal: 0, signal_radius: 0, castle_talk: 0 }] : [];
      const all = g.robots;   // the castle sees only robots within its vision (r2 100)
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100).concat(extra);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 35;
      return castleTurn(B);
    };
    assert.ok([S.PILGRIM, S.PROPHET].includes((turn1(0) || {}).u));   // economy or peacetime guard
    assert.strictEqual(turn1(30), null);                          // either would leave less than 30
    assert.strictEqual((turn1(30, true) || {}).u, S.PREACHER);    // a crusader 3 tiles away: the reserve is spent
  } finally { CFG.DEF_RESERVE_K = saved; }
});

test('struct: ECON_UNTIL keeps the peacetime army out before that round, not a threat response', () => {
  const saved = [CFG.ECON_UNTIL, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const turn1 = (until, enemy) => {
      CFG.ECON_UNTIL = until; castle.turn = 1;
      const extra = enemy ? [{ id: 4999, team: 1, unit: S.CRUSADER, x: castle.x, y: castle.y + 3, turn: 5, health: 40, signal: 0, signal_radius: 0, castle_talk: 0 }] : [];
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100).concat(extra);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100;
      return castleTurn(B);
    };
    assert.ok([S.CRUSADER, S.PROPHET, S.PREACHER].includes((turn1(0) || {}).u));   // the peacetime guard
    assert.strictEqual(turn1(100), null);                                          // round 1 < 100: nothing
    assert.strictEqual((turn1(100, true) || {}).u, S.PREACHER);                    // a crusader 3 tiles away: answered
  } finally { [CFG.ECON_UNTIL, CFG.SERVE_MOVES] = saved; }
});

test('struct: MIX_BY_STOCK builds crusaders when karbonite binds, preachers when fuel binds, else the rotation', () => {
  const saved = [CFG.MIX_BY_STOCK, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // as above: the economy has nothing to build, so the peacetime guard decides
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const build = (mix, k, f) => {
      CFG.MIX_BY_STOCK = mix; castle.turn = 1;
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = k; w.fuel = f;
      return (castleTurn(B) || {}).u;
    };
    const first = CFG.MIL_ROTATION[0];
    assert.strictEqual(build([10, 1], 100, 2000), S.CRUSADER);    // fuel / K = 20
    assert.strictEqual(build([10, 1], 3000, 1000), S.PREACHER);   // 0.33
    assert.strictEqual(build([10, 1], 100, 500), first);          // 5: the rotation
    assert.strictEqual(build(null, 100, 2000), first);            // off
    assert.strictEqual(build(null, 3000, 1000), first);
  } finally { [CFG.MIX_BY_STOCK, CFG.SERVE_MOVES] = saved; }
});

test('relay: a full pilgrim not next to a structure hands its load to a unit next to one, which deposits it', () => {
  const saved = CFG.RELAY;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null, R = null;   // P two king steps from the castle, R next to both
    for (let dy = -2; dy <= 2 && !P; dy++) for (let dx = -2; dx <= 2 && !P; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== 2 || !free(castle.x + dx, castle.y + dy)) continue;
      const px = castle.x + dx, py = castle.y + dy;
      for (const [ex, ey] of [[Math.sign(dx), Math.sign(dy)], [Math.sign(dx), 0], [0, Math.sign(dy)]])
        if (!R && free(castle.x + ex, castle.y + ey) && king(px, py, castle.x + ex, castle.y + ey) === 1) { R = [castle.x + ex, castle.y + ey]; P = [px, py]; }
    }
    assert.ok(P && R);
    const unit = (id, u, [x, y], fuel) => ({ id, team: 0, unit: u, x, y, turn: 3, health: S.STATS[u].hp, karbonite: 0, fuel, signal: 0, signal_radius: 0, castle_talk: 0 });
    const pil = unit(4001, S.PILGRIM, P, 100), cru = unit(4002, S.CRUSADER, R, 100);
    g.robots.push(pil, cru);
    const turn = (me, fn) => {
      const w = worldFor(g, me), B = { api: w.api, w, round: 20, birthRound: 18, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(S.STATS[me.unit].speed); B.nav = new Nav(w, B.offs, B.rnd);
      return fn(B);
    };
    CFG.RELAY = 1;
    assert.deepStrictEqual(turn(pil, pilgrimTurn), { action: 'give', dx: R[0] - P[0], dy: R[1] - P[1] });
    assert.deepStrictEqual(turn(cru, militaryTurn), { action: 'give', dx: castle.x - R[0], dy: castle.y - R[1] });
    CFG.RELAY = 0;
    assert.notStrictEqual((turn(pil, pilgrimTurn) || {}).action, 'give');
    assert.notStrictEqual((turn(cru, militaryTurn) || {}).action, 'give');
  } finally { CFG.RELAY = saved; }
});

test('military: PROPHET_FLOOR keeps prophets from shooting a short bank that other shooters can use', () => {
  const saved = CFG.PROPHET_FLOOR;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null, E = null;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const px = castle.x + dx, py = castle.y + dy; if (P || !free(px, py)) continue;
      for (const [ex, ey] of [[5, 0], [-5, 0], [0, 5], [0, -5], [4, 3], [-4, -3], [3, -4], [-3, 4]])
        if (!E && free(px + ex, py + ey)) { P = [px, py]; E = [px + ex, py + ey]; }
    }
    assert.ok(P && E);
    const mk = (id, team, u, [x, y]) => ({ id, team, unit: u, x, y, turn: 3, health: S.STATS[u].hp, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const pro = mk(4001, 0, S.PROPHET, P);
    g.robots.push(pro, mk(4002, 1, S.PROPHET, E));
    const turn = (fuel) => {
      const w = worldFor(g, pro), B = { api: w.api, w, round: 20, birthRound: 18, st: {}, deps: null, clusters: null, rnd: rng(2) };
      w.fuel = fuel; B.offs = offsets(S.STATS[S.PROPHET].speed); B.nav = new Nav(w, B.offs, B.rnd);
      return militaryTurn(B) || {};
    };
    CFG.PROPHET_FLOOR = 30;
    assert.strictEqual(turn(100).action, 'attack');
    CFG.PROPHET_FLOOR = 200;
    assert.notStrictEqual(turn(100).action, 'attack');
    assert.strictEqual(turn(300).action, 'attack');
  } finally { CFG.PROPHET_FLOOR = saved; }
});

test('military: LATTICE_R bounds how far from home an idle unit holds a lattice tile', () => {
  const saved = CFG.LATTICE_R;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const pro = { id: 4001, team: 0, unit: S.PROPHET, x: 0, y: 0, turn: 3, health: 20, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pro);
    const world = () => { const w = worldFor(g, pro); w.fuel = 1000; return w; };
    let home = null;   // a passable, even (canonical frame), non-depot tile with no enemy near, 14 rows from "home"
    for (let k = 1; k < n * n && !home; k++) {
      const x = k % n, y = Math.floor(k / n);
      if (!free(x, y) || d2(x, y, castle.x, castle.y) > 400) continue;
      pro.x = x; pro.y = y;
      const w = world(), m = w.me;
      if (((m.x + m.y) & 1) || w.isDepot(m.x, m.y) || w.enemies.some(e => d2(e.x, e.y, m.x, m.y) <= 196)) continue;
      const hy = m.y + 14 < n ? m.y + 14 : m.y - 14;
      if (hy >= 0 && hy < n) home = { x: m.x, y: hy };
    }
    assert.ok(home);
    const turns = (r) => {   // the first action in three turns (a cruise step may wait a turn or two first)
      CFG.LATTICE_R = r;
      const w = world(), B = { api: w.api, w, round: 20, birthRound: 18, rnd: rng(2), deps: null, clusters: null,
        st: { ready: true, home, target: null, tIdx: -1, known: [], dead: new Set(), reports: [], waitUntil: 0, guard: false } };
      B.offs = offsets(S.STATS[S.PROPHET].speed); B.nav = new Nav(w, B.offs, B.rnd);
      for (let i = 0; i < 3; i++) { const a = militaryTurn(B); if (a) return a; }
      return null;
    };
    assert.strictEqual(turns(16), null);                    // 14 king steps out, inside 16: holds
    assert.strictEqual((turns(12) || {}).action, 'move');   // outside 12: heads back toward home
  } finally { CFG.LATTICE_R = saved; }
});

test('military: LATTICE_STICKY keeps a lattice target that only looked worse from where it was chosen', () => {
  // Two lattice tiles: A (12,2) next to the anchor (10,2), B (4,2) far. Row 4 is a depot corridor (no lattice).
  // A preacher (vision r2 16) at (9,4) sees A taken and picks B; at (8,4) A is out of sight and counts as free.
  const saved = CFG.LATTICE_STICKY, A = [12, 2], Bt = [4, 2];
  try {
    const w = { n: 24, me: { id: 5, x: 9, y: 4 },
      passable: (x, y) => y === 4 || (x === A[0] && y === A[1]) || (x === Bt[0] && y === Bt[1]),
      isDepot: (x, y) => y === 4,
      occ(x, y) { return d2(x, y, this.me.x, this.me.y) > 16 ? -1 : x === A[0] && y === A[1] ? 77 : 0; } };
    const run = sticky => {
      CFG.LATTICE_STICKY = sticky; w.me = { id: 5, x: 9, y: 4 };
      const B = { w, st: { home: { x: 10, y: 0 } } }, out = [holdTarget(B)];
      w.me = { id: 5, x: 8, y: 4 }; out.push(holdTarget(B));
      return out;
    };
    assert.deepStrictEqual(run(0), [Bt, A]);    // flips to A, which is taken
    assert.deepStrictEqual(run(1), [Bt, Bt]);   // keeps B
  } finally { CFG.LATTICE_STICKY = saved; }
});

test('military: LATTICE_STICKY 2 remembers lattice tiles seen taken, so two taken tiles do not trade places', () => {
  // A (12,2) and B (6,2) are both taken, C (2,2) is free. A preacher (vision r2 16) at (11,4) sees A taken, not B;
  // at (8,4) it sees B taken, not A. Row 4 is a depot corridor (no lattice).
  const saved = CFG.LATTICE_STICKY, A = [12, 2], Bt = [6, 2], C = [2, 2];
  try {
    const at = (t, p) => (t[0] === p[0] && t[1] === p[1]);
    const w = { n: 24, me: null, friends: [],
      passable: (x, y) => y === 4 || at([x, y], A) || at([x, y], Bt) || at([x, y], C),
      isDepot: (x, y) => y === 4,
      occ(x, y) { return d2(x, y, this.me.x, this.me.y) > 16 ? -1 : at([x, y], A) ? 77 : at([x, y], Bt) ? 78 : 0; } };
    const run = sticky => {
      CFG.LATTICE_STICKY = sticky; w.me = { id: 5, x: 11, y: 4, turn: 10 };
      const B = { w, st: { home: { x: 10, y: 0 } } }, out = [holdTarget(B)];
      w.me = { id: 5, x: 8, y: 4, turn: 11 }; out.push(holdTarget(B));
      return out;
    };
    assert.deepStrictEqual(run(1), [Bt, A]);   // B seen taken: back to A, which it saw taken a turn ago
    assert.deepStrictEqual(run(2), [Bt, C]);   // remembers A
  } finally { CFG.LATTICE_STICKY = saved; }
});

test('combat: target choice, preacher splash avoids friends, retreat', () => {
  const es = [{ id: 9, unit: 2, x: 5, y: 0, team: 1 }, { id: 4, unit: 5, x: 0, y: 3, team: 1 }, { id: 3, unit: 5, x: 3, y: 0, team: 1 }];
  assert.strictEqual(pickTarget(3, 0, 0, es, 64).id, 3); // preachers first, then closer
  assert.strictEqual(pickTarget(4, 0, 0, es, 64).id, 9); // prophet min range 16 excludes the preachers
  const robots = [{ id: 1, unit: 5, x: 0, y: 0, team: 0 }, { id: 2, unit: 3, x: 3, y: 0, team: 1 }, { id: 5, unit: 2, x: 2, y: 1, team: 0 }].map(r => ({ ...r, seen: true }));
  const t = preacherTarget(0, 0, robots, 0, () => true);
  assert.ok(t); assert.ok(d2(t.dx, t.dy, 3, 0) <= 3); assert.ok(d2(t.dx, t.dy, 2, 1) > 3);
  const s = retreatStep(5, 5, [{ unit: 3, x: 7, y: 5 }], offsets(4), 4, () => true);
  assert.ok(s && s[0] < 0);
});

test('castle: EXPAND_ROUND adds remote clusters on either half away from enemy castles, mirror-identical; CT.TAKEN rests one', () => {
  const saved = CFG.EXPAND_ROUND, KING = offsets(2);
  try {
    const run = (team, er) => {
      CFG.EXPAND_ROUND = er;
      const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
      const castle = g.robots.find(r => r.team === team);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      const at = t => { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; w.karbonite = 0; castleTurn(B); };
      for (const t of [1, 2, 3]) at(t);
      const before = B.st.plan.length;
      at(100);
      return { g, castle, B, at, before, sites: B.st.plan.map(p => B.clusters[p.cluster].site.join(',')) };
    };
    const off = run(0, 0), on = run(0, 100), on1 = run(1, 100);
    assert.strictEqual(off.sites.length, off.before);                   // default: the turn-3 plan only
    assert.ok(on.sites.length > on.before, 'nothing added');
    assert.deepStrictEqual(on1.sites, on.sites);                       // both teams plan the same canonical clusters
    const { B, at, g, castle } = on, w = B.w, n = w.n;
    const usF = bfs(w, [[w.me.x, w.me.y]], KING), themF = bfs(w, [w.mirror(w.me.x, w.me.y)], KING);
    const added = B.st.plan.slice(on.before), d = (f, p) => f[B.clusters[p.cluster].site[1] * n + B.clusters[p.cluster].site[0]];
    for (const p of added) assert.ok(d(themF, p) > CFG.EXPAND_KEEP, 'too near the enemy castle');
    assert.ok(added.some(p => d(usF, p) > d(themF, p)), 'none on the enemy half');
    // With the turn-3 plan churched, the first added cluster is next; reported taken, the one after it.
    for (const p of B.st.plan.slice(0, on.before)) B.st.churched.add(p.cluster);
    assert.strictEqual(nextPioneer(B).cluster, added[0].cluster);
    g.robots.push({ id: 4300, team: 0, unit: S.PILGRIM, x: castle.x + 1, y: castle.y, turn: 50, health: 10, karbonite: 0, fuel: 0,
      signal: 0, signal_radius: 0, castle_talk: CT.TAKEN + added[0].cluster });
    at(101);
    assert.strictEqual((nextPioneer(B) || {}).cluster, added[1] ? added[1].cluster : undefined);
  } finally { CFG.EXPAND_ROUND = saved; }
});

test('castle: PLAN_CONTEST_FIRST plans the clusters the enemy nearly reaches before nearer safe ones, mirror-identical', () => {
  const saved = CFG.PLAN_CONTEST_FIRST;
  try {
    const plan = (team, cf) => {
      CFG.PLAN_CONTEST_FIRST = cf;
      const g = new Game(1915, 100, 20, false, false);   // one castle a side; the centre cluster straddles the axis
      const castle = g.robots.find(r => r.team === team);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; w.karbonite = 0; castleTurn(B); }
      return B.st.plan.map(p => ({ site: B.clusters[p.cluster].site.join(','), d: p.d, m: p.m }));
    };
    const off = plan(0, 0), on = plan(0, 6);
    assert.deepStrictEqual(on.map(p => p.site).sort(), off.map(p => p.site).sort());   // same clusters
    for (let i = 1; i < off.length; i++) assert.ok(off[i - 1].d <= off[i].d);         // default: nearest first
    const hot = on.map(p => p.m <= 6), firstCold = hot.indexOf(false);
    assert.ok(firstCold > 0 && hot.slice(firstCold).every(h => !h), 'contested clusters first');
    assert.notDeepStrictEqual(on.map(p => p.site), off.map(p => p.site));             // and it changes the order here
    assert.deepStrictEqual(plan(1, 6), on);                                           // both teams alike
  } finally { CFG.PLAN_CONTEST_FIRST = saved; }
});

test('castle: PIONEER_RESERVE 2 holds the pioneer karbonite at every castle until a church stands (seed 2965)', () => {
  const saved = CFG.PIONEER_RESERVE;
  try {
    const run = team => {
      const g = new Game(2965, 100, 20, false, false);   // two castles a side, one remote cluster (the centre)
      const cs = g.robots.filter(r => r.team === team && r.unit === S.CASTLE);
      const Bs = cs.map(() => ({ st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 }));
      for (const t of [1, 2, 3]) cs.forEach((c, i) => {
        c.turn = t; const w = worldFor(g, c), B = Bs[i]; B.w = w; B.api = w.api; w.karbonite = 0;
        if (t === 3) cs.forEach((o, j) => { if (j !== i) { o.turn = 1; const wo = worldFor(g, o); o.turn = t; B.st.castles.set(o.id, { x: wo.me.x, y: wo.me.y }); } });
        castleTurn(B);
      });
      return Bs;
    };
    const Bs = run(0), owner = Bs.find(B => B.st.plan.length), other = Bs.find(B => !B.st.plan.length);
    assert.ok(owner && other, 'one castle owns the centre cluster');
    assert.strictEqual(owner.st.planAll, 1); assert.strictEqual(other.st.planAll, 1);
    CFG.PIONEER_RESERVE = 1;
    assert.ok(pioneerDue(owner) && !pioneerDue(other));   // mode 1: the other castle's guard spends the shared bank
    CFG.PIONEER_RESERVE = 2;
    assert.ok(pioneerDue(owner) && pioneerDue(other));
    other.round = CFG.PIONEER_RESERVE_UNTIL; assert.ok(!pioneerDue(other)); other.round = 3;
    for (const B of Bs) B.st.churched.add(owner.st.plan[0].cluster);
    assert.ok(!pioneerDue(owner) && !pioneerDue(other));   // the church stands
    const mirror = run(1);
    assert.deepStrictEqual(mirror.map(B => [B.st.plan.length, B.st.planAll]), run(0).map(B => [B.st.plan.length, B.st.planAll]));
  } finally { CFG.PIONEER_RESERVE = saved; }
});

test('tools/plan.mjs: both teams get the same plan; seed 2924 orphans 3 own-side depots, none with SERVE_MOVES 2 + PLAN_CONTEST_FIRST 6', () => {
  const saved = [CFG.SERVE_MOVES, CFG.PLAN_CONTEST_FIRST];
  try {
    const a = planReport(2924, 0), b = planReport(2924, 1);
    assert.strictEqual(a.text.replace(/team \d/, ''), b.text.replace(/team \d/, ''));
    assert.strictEqual(a.side, 23); assert.strictEqual(a.orphans, 3);
    CFG.SERVE_MOVES = 2; CFG.PLAN_CONTEST_FIRST = 6;
    assert.strictEqual(planReport(2924, 0).orphans, 0);
  } finally { [CFG.SERVE_MOVES, CFG.PLAN_CONTEST_FIRST] = saved; }
});

test('struct: FRONT_ROUND sends a pilgrim to build a church FRONT_STEP rows ahead, which finds the same site; mirror-identical', () => {
  const saved = CFG.FRONT_ROUND;
  try {
    const setup = team => {
      const g = new Game(2965, 100, 20, false, false), n = g.map.length;
      const cs = g.robots.filter(r => r.team === team && r.unit === S.CASTLE);
      const ws = cs.map(c => { c.turn = 1; return worldFor(g, c); });
      const i = ws[0].me.y * n + ws[0].me.x < ws[1].me.y * n + ws[1].me.x ? 0 : 1;   // first castle, canonical order
      const castle = cs[i], w = ws[i], sigs = [];
      w.api.signal = (v, r2) => sigs.push(v);
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      structInit(B); w.karbonite = 500; w.fuel = 2000;
      return { g, castle, w, B, sigs };
    };
    const a = setup(0), { B, w } = a;
    CFG.FRONT_ROUND = 0; B.round = 300;
    assert.strictEqual(frontPioneer(B), null);                       // default: off
    CFG.FRONT_ROUND = 200; B.round = 150;
    assert.strictEqual(frontPioneer(B), null);                       // too early
    B.round = 300;
    const site = frontSite(w, w.me.x, w.me.y);
    assert.ok(site && ((site[0] + site[1]) & 1) && w.passable(site[0], site[1]) && !w.isDepot(site[0], site[1]));
    assert.ok(site[1] > w.me.y && Math.abs(site[1] - (w.me.y + CFG.FRONT_STEP)) <= 3, 'ahead: ' + site);
    const act = frontPioneer(B);
    assert.strictEqual((act || {}).u, S.PILGRIM);
    assert.deepStrictEqual(a.sigs, [encNum(SIG.FRONT, 300)]);
    B.round = 320; assert.strictEqual(frontPioneer(B), null);        // FRONT_EVERY
    // The pilgrim, born next to the castle, reads the order: the same site, and the round.
    const [ex, ey] = [a.castle.x + act.dx, a.castle.y + act.dy];
    const p = { id: 4200, team: 0, unit: S.PILGRIM, x: ex, y: ey, turn: 1, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    a.castle.signal = encNum(SIG.FRONT, 300); a.g.robots.push(p);
    const pw = worldFor(a.g, p), PB = { api: pw.api, w: pw, st: {}, deps: B.deps || depots(pw), clusters: B.clusters || [], rnd: rng(2) };
    PB.nav = new Nav(pw, offsets(4), PB.rnd);
    pilgrimTurn(PB);
    assert.deepStrictEqual(PB.st.site, site); assert.strictEqual(PB.round, 300);
    // A structure of ours ahead in sight: this one is not the front.
    const b2 = setup(0);
    b2.g.robots.push({ id: 4300, team: 0, unit: S.CHURCH, x: b2.castle.x, y: b2.castle.y, turn: 9, health: 100, signal: 0, signal_radius: 0, castle_talk: 0 });
    const ch = b2.g.robots[b2.g.robots.length - 1];
    [ch.x, ch.y] = b2.w.T.toE(site[0], site[1]);   // on the front site, in engine coordinates
    const w2 = worldFor(b2.g, b2.castle); Object.assign(b2.B, { w: w2, api: w2.api, round: 300 }); w2.karbonite = 500; w2.fuel = 2000;
    assert.strictEqual(frontPioneer(b2.B), null);
    // An enemy attacker in sight: no pioneer.
    const b3 = setup(0), [qx, qy] = b3.w.T.toE(b3.w.me.x, b3.w.me.y + 6);
    b3.g.robots.push({ id: 4400, team: 1, unit: S.PROPHET, x: qx, y: qy, turn: 9, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 });
    const w3 = worldFor(b3.g, b3.castle); Object.assign(b3.B, { w: w3, api: w3.api, round: 300 }); w3.karbonite = 500; w3.fuel = 2000;
    assert.strictEqual(frontPioneer(b3.B), null);
    // Both teams choose the same canonical site.
    const c = setup(1); assert.deepStrictEqual(frontSite(c.w, c.w.me.x, c.w.me.y), site);
  } finally { CFG.FRONT_ROUND = saved; }
});

test('pilgrim: PILGRIM_SAFE_STEP keeps steps out of a visible attacker\'s threat range (scrim 199, seed 1915)', () => {
  const saved = CFG.PILGRIM_SAFE_STEP;
  try {
    // The replica case: pioneer at (34,32) heading for (31,29); an enemy prophet at (38,25) (r2 65, out of range).
    const run = safe => {
      CFG.PILGRIM_SAFE_STEP = safe;
      const w = stubWorld(64, [], []); w.me = { x: 34, y: 32 };
      w.enemies = [{ unit: S.PROPHET, x: 38, y: 25 }, { unit: S.PILGRIM, x: 33, y: 33 }];
      const nav = new Nav(w, offsets(4), rng(7)), avoid = stepAvoid(w);
      const s = nav.step('site', [[31, 29]], 4, avoid);
      return { avoid, to: [34 + s[0], 32 + s[1]] };
    };
    const off = run(0);
    assert.strictEqual(off.avoid, null);
    assert.ok((off.to[0] - 38) ** 2 + (off.to[1] - 25) ** 2 <= 64, 'the default step walks into range: ' + off.to);
    const on = run(1);
    assert.ok(on.avoid(33, 31) && !on.avoid(34, 32) && !on.avoid(33, 33));   // r2 61 in, r2 65 out; pilgrims harmless
    assert.ok((on.to[0] - 38) ** 2 + (on.to[1] - 25) ** 2 > 64, 'safe step stays out: ' + on.to);
    CFG.PILGRIM_SAFE_STEP = 1;
    assert.strictEqual(stepAvoid({ enemies: [{ unit: S.PILGRIM, x: 1, y: 1 }, { unit: S.CHURCH, x: 2, y: 2 }] }), null);
  } finally { CFG.PILGRIM_SAFE_STEP = saved; }
});

test('military: KILL_ZONE: a unit of ours gone from where it could not walk out of sight marks a zone; idle units hold no lattice tile in it', () => {
  const saved = CFG.KILL_ZONE;
  try {
    CFG.KILL_ZONE = 50;
    const P = (id, x, y) => ({ id, team: 0, unit: S.PROPHET, x, y, seen: true });
    const w = { n: 24, me: { id: 5, team: 0, unit: S.PROPHET, x: 10, y: 6, turn: 10 }, robots: [], passable: () => true, isDepot: () => false, occ: () => 0,
      friends: [P(7, 10, 9), P(8, 10, 13)] };
    const B = { w, st: { home: { x: 10, y: 2 } } };
    watchDeaths(B);
    w.me = { ...w.me, turn: 11 }; w.friends = [];
    watchDeaths(B);   // 7 (r2 9) could not have left our sight (r2 64, 3 tiles of margin): dead; 8 (r2 49) could have
    assert.deepStrictEqual(B.st.zones.map(z => [z.x, z.y]), [[10, 9]]);
    // Beyond 2 tiles short of the zone's distance from home (7), within r2 64 of it.
    assert.ok(inZone(B, 10, 8) && inZone(B, 14, 9) && !inZone(B, 10, 6) && !inZone(B, 10, 18));
    w.me = { ...w.me, turn: 11 + 51 }; assert.ok(!inZone(B, 10, 8));   // expired
    // A zone next to the lattice anchor: the unit holds a tile out of it.
    const H = { w: { ...w, me: { ...w.me, turn: 20 } }, st: { home: { x: 10, y: 2 }, zones: [{ x: 10, y: 6, t: 20 }] } };
    const near = holdTarget({ w: H.w, st: { home: { x: 10, y: 2 } } });
    assert.ok(inZone(H, near[0], near[1]), 'without the zone the unit would hold ' + near);
    const t = holdTarget(H); assert.ok(t && !inZone(H, t[0], t[1]), 'holds ' + t);
    CFG.KILL_ZONE = 0; assert.deepStrictEqual(holdTarget({ w: H.w, st: { home: { x: 10, y: 2 }, zones: H.st.zones } }), near);   // off: as before
  } finally { CFG.KILL_ZONE = saved; }
});

test('struct/military: KILL_ZONE: the turn after a military build the structure radios the zone (r2 25), and units in reach take it', () => {
  const saved = CFG.KILL_ZONE;
  try {
    CFG.KILL_ZONE = 50;
    const sent = [], w = { me: { turn: 30 }, sentR2: 0, fuel: 500, signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; } };
    const B = { w, st: { zones: [{ x: 4, y: 9, t: 28 }], built: S.PROPHET } };
    sayZone(B); assert.deepStrictEqual(sent, []);                      // the build turn: the radio carries the round
    w.me = { turn: 31 }; B.st.built = -1; w.sentR2 = 2;
    sayZone(B); assert.deepStrictEqual(sent, []);                      // radio busy
    w.me = { turn: 32 }; w.sentR2 = 0;
    sayZone(B); assert.deepStrictEqual(sent, [[encXY(SIG.ZONE, 4, 9), 25]]);
    w.me = { turn: 33 }; w.sentR2 = 0; sayZone(B); assert.strictEqual(sent.length, 1);   // once
    const U = { w: { me: { id: 9, team: 0, turn: 2 }, robots: [{ id: 3, team: 0, seen: true, signal: encXY(SIG.ZONE, 4, 9), signal_radius: 25 },
      { id: 4, team: 1, seen: true, signal: encXY(SIG.ZONE, 7, 7), signal_radius: 25 }] }, st: {} };
    hearZones(U); assert.deepStrictEqual(U.st.zones.map(z => [z.x, z.y, z.t]), [[4, 9, 2]]);   // ours only, on our clock
  } finally { CFG.KILL_ZONE = saved; }
});

test('military: CREEP_ROUND moves the lattice a unit holds toward the enemy over time; guards and the default stay', () => {
  const saved = { R: CFG.CREEP_ROUND, E: CFG.CREEP_EVERY };
  try {
    const w = { n: 40, me: { id: 5, x: 20, y: 6, turn: 50 }, friends: [], passable: () => true, isDepot: () => false, occ: () => 0 };
    const target = (round, guard) => holdTarget({ w, round, st: { home: { x: 20, y: 2 }, guard } });
    CFG.CREEP_ROUND = 450; CFG.CREEP_EVERY = 8;
    const before = target(449, false), after = target(530, false);   // 80 rounds in: centre 10 tiles ahead
    assert.ok(before[1] <= 6, 'before the creep: ' + before);
    assert.deepStrictEqual(after, [20, 14]);                        // anchor = centre (20,12) + 2
    assert.ok(target(530, true)[1] <= 6);                           // a home guard keeps its lattice
    assert.ok(target(5000, false)[1] <= 39);                        // the centre stops at the board edge
    CFG.CREEP_ROUND = 0;
    assert.deepStrictEqual(target(530, false), before);             // off: as before
  } finally { CFG.CREEP_ROUND = saved.R; CFG.CREEP_EVERY = saved.E; }
});
