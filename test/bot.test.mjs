// Unit tests for the bot's pure modules (src/bot). Run by tools/unit-tests.sh.
import test from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';
import * as S from '../src/bot/specs.js';
import { offsets, rng, d2, king } from '../src/bot/util.js';
import { depots, clusters, bfs, costField, econ } from '../src/bot/mapinfo.js';
import { Nav, fuelStep } from '../src/bot/nav.js';
import { encXY, encNum, dec, SIG, FAR, CT, decFarRobot, GUARD_STRIKE } from '../src/bot/comms.js';
import { nextTarget, isChoke, militaryTurn, holdTarget, watchDeaths, inZone, hearZones, edgeAvoid, spot, hearPost, latticeTile, watchThreats, threatHot } from '../src/bot/military.js';
import { callAttack, callDue, castleTurn, lostRest, nextPioneer, pioneerDue, pioneer, openEscort, escort, maxPioneers, hearStrike, strikeFar } from '../src/bot/castle.js';
import { churchTurn } from '../src/bot/church.js';
import { structInit, buildToward, frontSite, frontPioneer, sayZone, sayThreat, sayWatch, watchKids, feeding, nextDepot, musterCase, musterTrack, musterAct, musterArmy, hitTrack, sayRescue } from '../src/bot/struct.js';
import { report as planReport } from '../tools/plan.mjs';
import { minesNow, pilgrimTurn, stepAvoid, detourCost, huntSpot, strikeSpot, hotRetarget, hereRetarget, siteStalled, siteTaken, siteTimeout, stallRetarget } from '../src/bot/pilgrim.js';
import { CFG } from '../src/bot/config.js';
import { World, makeTransform, detectSymmetry } from '../src/bot/world.js';
import { pickTarget, preacherTarget, retreatStep, cover, churchFirst, canHit, PRIORITY } from '../src/bot/combat.js';
import { pilgrimChain, chainStart, chainStep, learnRound, chainLaunch, chainsFailed, chainsWalled } from '../src/bot/chain.js';
const require = createRequire(import.meta.url);
const SPECS = require('../engine/node_modules/bc19/specs.json');
const Game = require('../engine/node_modules/bc19/game.js');
// v7 (2026-10-23) turned on h82's economy switches and h76's chain. Tests written against v6's defaults for other
// switches pin those v6 values (the peacetime army builds from round 1, no reserves, no chain) and restore everything.
const PRE_V7 = { ECON_UNTIL: 0, PIONEERS_TEAM: 0, PEACE_RESERVE_K: 0, PLAN_VALUE: 0, DEF_RESERVE_K: 0, CHAIN_ROUND: 0,
  CHAIN_STAGE: 12, CHAIN_K: 300, CHAIN_F: 1200, CHAIN_END_R2: 49, CHAIN_MIX: [5, 3], CHAIN_KEEP: 0, CHAIN_SAFE: 0 };
const testPreV7 = (name, fn) => test(name, () => {
  const saved = { ...CFG };
  Object.assign(CFG, PRE_V7);
  try { fn(); } finally { Object.assign(CFG, saved); }
});
// v8 (2026-10-24) turned on h128's mirror escort; tests of the escort switches written against v7 pin v7's values.
const PRE_V8 = { ESCORT_FIRST: 0, ESCORT_UNIT: 4, ESCORT_MIRROR: 0 };
const testPreV8 = (name, fn) => test(name, () => {
  const saved = { ...CFG };
  Object.assign(CFG, PRE_V8);
  try { fn(); } finally { Object.assign(CFG, saved); }
});
// v9 (2026-10-25) turned on h167's hold-only muster; tests of MUSTER 1's release written against v8 pin v8's values.
const PRE_V9 = { MUSTER: 0 };
const testPreV9 = (name, fn) => test(name, () => {
  const saved = { ...CFG };
  Object.assign(CFG, PRE_V9);
  try { fn(); } finally { Object.assign(CFG, saved); }
});
// v10 (2026-10-25) turned on h175's rescue radio; tests of MUSTER 2's hold written against v9 pin v9's values.
const PRE_V10 = { MUSTER_RESCUE: 0 };
const testPreV10 = (name, fn) => test(name, () => {
  const saved = { ...CFG };
  Object.assign(CFG, PRE_V10);
  try { fn(); } finally { Object.assign(CFG, saved); }
});
// v11 (2026-10-25) turned on h178's safe newborn tiles; tests of build placement written against v10 pin v10's values.
const PRE_V11 = { DEF_SAFE: 0 };
const testPreV11 = (name, fn) => test(name, () => {
  const saved = { ...CFG };
  Object.assign(CFG, PRE_V11);
  try { fn(); } finally { Object.assign(CFG, saved); }
});

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

// The pre-2026-10-22 forms of detectSymmetry, World's per-tile transform and bfs, kept as references.
function refSymmetry(pass, karb, fuel) {
  const n = pass.length; let h = true, v = true;
  for (let y = 0; y < n && (h || v); y++) {
    const ry = n - 1 - y;
    for (let x = 0; x < n; x++) {
      if (h && (pass[y][x] !== pass[ry][x] || karb[y][x] !== karb[ry][x] || fuel[y][x] !== fuel[ry][x])) h = false;
      const rx = n - 1 - x;
      if (v && (pass[y][x] !== pass[y][rx] || karb[y][x] !== karb[y][rx] || fuel[y][x] !== fuel[y][rx])) v = false;
    }
  }
  return h ? 'H' : v ? 'V' : 'H';
}
function refBfs(w, sources, offs) {
  const n = w.n, d = new Int16Array(w.N).fill(-1), q = new Int16Array(w.N);
  let h = 0, t = 0;
  for (const [x, y] of sources) { if (x < 0 || y < 0 || x >= n || y >= n) continue; const i = y * n + x; if (w.pass[i] && d[i] < 0) { d[i] = 0; q[t++] = i; } }
  while (h < t) {
    const c = q[h++], x = c % n, y = (c - x) / n, nd = d[c] + 1;
    for (const o of offs) {
      const nx = x + o[0], ny = y + o[1];
      if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
      const k = ny * n + nx; if (d[k] < 0 && w.pass[k]) { d[k] = nd; q[t++] = k; }
    }
  }
  return d;
}

test('world: the unrolled symmetry test, per-tile transform and bfs equal their reference forms', () => {
  let maps = 0, fields = 0;
  for (let seed = 1; seed <= 40; seed++) {
    let g; try { g = new Game(seed, 100, 20, false, false); } catch (e) { continue; }
    if (!g.robots.length) continue;
    maps++;
    assert.strictEqual(detectSymmetry(g.map, g.karbonite_map, g.fuel_map), refSymmetry(g.map, g.karbonite_map, g.fuel_map), 'seed ' + seed);
    for (const team of [0, 1]) {
      const r = g.robots.find(q => q.team === team), w = worldFor(g, r), n = w.n, T = makeTransform(w.sym, team, n);
      for (let cy = 0; cy < n; cy++) for (let cx = 0; cx < n; cx++) {
        const [ex, ey] = T.toE(cx, cy), i = cy * n + cx;
        if (w.EX[i] !== ex || w.EY[i] !== ey || w.pass[i] !== (g.map[ey][ex] ? 1 : 0) || w.karb[i] !== (g.karbonite_map[ey][ex] ? 1 : 0) ||
            w.fuelD[i] !== (g.fuel_map[ey][ex] ? 1 : 0)) assert.fail('seed ' + seed + ' team ' + team + ' tile ' + cx + ',' + cy);
      }
      for (const offs of [offsets(2), offsets(4), offsets(9)]) {
        const src = [[w.me.x, w.me.y], [n - 1 - w.me.x, w.me.y], [-1, 3]];
        assert.deepStrictEqual(bfs(w, src, offs), refBfs(w, src, offs)); fields++;
        assert.deepStrictEqual(bfs(w, src, offs), refBfs(w, src, offs));   // the cached flat offsets give the same field
      }
    }
  }
  // Boards symmetric both ways, neither way, and odd sizes.
  const rnd = rng(9);
  for (let k = 0; k < 400; k++) {
    const n = 3 + Math.floor(rnd() * 8), mk = () => Array.from({ length: n }, () => Array(n).fill(false));
    const P = mk(), K = mk(), F = mk(), kind = k % 4;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const yy = kind & 1 ? Math.min(y, n - 1 - y) : y, xx = kind & 2 ? Math.min(x, n - 1 - x) : x;
      const v = ((yy * 31 + xx * 17 + k) % 5);
      P[y][x] = v !== 0; K[y][x] = v === 1; F[y][x] = v === 2;
    }
    if (rnd() < 0.3) { const y = Math.floor(rnd() * n), x = Math.floor(rnd() * n); P[y][x] = !P[y][x]; }
    assert.strictEqual(detectSymmetry(P, K, F), refSymmetry(P, K, F), 'board ' + k);
  }
  assert.ok(maps >= 30 && fields >= 180, maps + ' maps ' + fields + ' fields');
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
  // castle talk ranges never overlap: unit status 64..69, chainer 70..71, kill reports 72..75, a waiting pioneer 76,
  // a blocked one 77, march 80..85, taken 88..127, churches 128+
  assert.ok(CT.UNIT + 5 < CT.CHAINER && CT.CHAINGONE < CT.DEAD && CT.DEAD + 3 < CT.WAIT && CT.WAIT < CT.BLOCKED && CT.BLOCKED < CT.MARCH &&
    CT.MARCH + 5 < CT.TAKEN && CT.TAKEN + 39 < CT.CHURCH);
});

test('world: a signal lowers the fuel that later affordability checks see', () => {
  const sent = [], w = Object.assign(Object.create(World.prototype), { api: { signal: (v, r) => sent.push([v, r]) }, karbonite: 100, fuel: 70 });
  assert.ok(w.canAfford(S.PROPHET)); w.signal(1, 398);
  assert.deepStrictEqual(sent, [[1, 398]]); assert.strictEqual(w.fuel, 50); assert.ok(w.canAfford(S.PROPHET));
  w.signal(1, 2); assert.strictEqual(w.fuel, 48); assert.ok(!w.canAfford(S.PROPHET));
});

test('world: a build lowers the karbonite and fuel that a later signal this turn sees (no "Cannot afford")', () => {
  // h177 against v10 on 836 (det): v10's castle, hit at r479 with 50-59 fuel, built a preacher (50 fuel) and then
  // radioed MUSTER_RESCUE's spot (10); the engine takes the signal's fuel first and refused the build.
  const built = [], sent = [];
  const w = Object.assign(Object.create(World.prototype), { T: { dirE: (dx, dy) => [dx, dy] }, karbonite: 100, fuel: 55,
    api: { buildUnit: (u, a, b) => (built.push([u, a, b]), { action: 'build' }), signal: (v, r) => sent.push([v, r]) } });
  assert.deepStrictEqual(w.build(S.PROPHET, 1, 0), { action: 'build' });
  assert.deepStrictEqual([built, w.karbonite, w.fuel], [[[S.PROPHET, 1, 0]], 75, 5]);
  const st = { hitAt: 40 }, B = { w, st };
  w.me = { x: 5, y: 5, turn: 41, unit: S.CASTLE, health: 190 }; w.sentR2 = 0; w.enemies = [{ x: 12, y: 5, unit: S.PROPHET }];
  sayRescue(B); assert.deepStrictEqual(sent, []);                                           // 5 fuel left: no spot
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

test('castle: ATTACK_ONE: every castle calls the same enemy castle, the mirror nearest ours in summed r2', () => {
  const saved = CFG.ATTACK_ONE;
  try {
    // Canonical n 40, enemy castle = (x, 39 - y): A's own mirror is nearer A, B's nearer B; summed r2 2390 vs 1662
    const castles = new Map([[1, { x: 5, y: 3 }], [2, { x: 30, y: 10 }]]);
    const call = (x, y) => {
      const sent = [];
      const B = { round: 500, st: { count: [2, 0, 5, 10, 6, 4], castles },
        w: { me: { x, y }, n: 40, fuel: 1000, sentR2: false, mirror: (a, b) => [a, 39 - b], signal: (m, r) => sent.push([m, r]) } };
      callAttack(B);
      return sent;
    };
    CFG.ATTACK_ONE = 0;
    assert.deepStrictEqual([call(5, 3), call(30, 10)], [[[encXY(0, 5, 36), FAR.ATTACK]], [[encXY(0, 30, 29), FAR.ATTACK]]]);
    CFG.ATTACK_ONE = 1;
    assert.deepStrictEqual([call(5, 3), call(30, 10)], [[[encXY(0, 30, 29), FAR.ATTACK]], [[encXY(0, 30, 29), FAR.ATTACK]]]);
    castles.delete(2);                                  // B fell: the call follows the living castles
    assert.deepStrictEqual(call(5, 3), [[encXY(0, 5, 36), FAR.ATTACK]]);
  } finally { CFG.ATTACK_ONE = saved; }
});

// A castle that launches a chainer on an attack-call round: the call holds the radio, so v8 builds the chainer deaf and
// counts the launch; RADIO_WAIT launches the next turn, with its message.
test('chain: RADIO_WAIT: a launch waits a turn while the attack call holds the radio', () => {
  const saved = CFG.RADIO_WAIT;
  try {
    const run = (wait, sentR2) => {
      CFG.RADIO_WAIT = wait;
      const B = { w: { me: { x: 3, y: 4 }, sentR2, canAfford: () => true, mirror: (x, y) => [x, 60 - y] },
        st: { order: [{ x: 3, y: 4 }] }, round: 500 };
      const built = [];
      const b = chainLaunch(B, (B2, unit, tx, ty, signal) => { built.push([unit, signal]); return { act: 'build', x: 3, y: 5 }; });
      return { b, built, chainAt: B.st.chainAt };
    };
    const v8 = run(0, true);
    assert.deepStrictEqual([v8.built, v8.chainAt], [[[S.PILGRIM, encXY(SIG.CHAIN, 3, 56)]], 500], 'v8: built (deaf) and counted');
    const wait = run(1, true);
    assert.deepStrictEqual([wait.b, wait.built, wait.chainAt], [null, [], undefined], 'radio taken: no launch, not counted');
    const free = run(1, false);
    assert.deepStrictEqual([free.built, free.chainAt], [[[S.PILGRIM, encXY(SIG.CHAIN, 3, 56)]], 500], 'radio free: launched');
  } finally { CFG.RADIO_WAIT = saved; }
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

test('struct: DEF_FAR_UNIT answers a prophet beyond r2 36 with a crusader; nearer, or a crusader, still a preacher', () => {
  const saved = CFG.DEF_FAR_UNIT;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const turn1 = (far, unit, dy) => {
      CFG.DEF_FAR_UNIT = far; castle.turn = 1;
      const extra = [{ id: 4999, team: 1, unit, x: castle.x, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }];
      const all = g.robots;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat(extra);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 500;
      return (castleTurn(B) || {}).u;
    };
    assert.strictEqual(turn1(0, S.PROPHET, 7), S.PROPHET);     // default: a prophet against a prophet 7 tiles out
    assert.strictEqual(turn1(3, S.PROPHET, 7), S.CRUSADER);
    assert.strictEqual(turn1(3, S.PROPHET, 5), S.PREACHER);    // r2 25 <= 36: a preacher either way
    assert.strictEqual(turn1(3, S.CRUSADER, 7), S.PREACHER);
  } finally { CFG.DEF_FAR_UNIT = saved; }
});

test('struct: DEF_SEEN counts as defenders only our military that see the attacker', () => {
  const saved = CFG.DEF_SEEN;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0), n = g.map.length;
    const dy = castle.y + 7 < n ? 7 : -7, sx = castle.x + 9 < n ? 1 : -1;
    const foe = { id: 4990, team: 1, unit: S.PROPHET, x: castle.x, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 };
    const pro = (id, x, y) => ({ id, team: 0, unit: S.PROPHET, x, y, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 });
    // three prophets of ours 7-9 tiles to the side: within r2 100 of the castle, r2 98-130 from the foe (vision 64)
    const side = [7, 8, 9].map((k, i) => pro(4991 + i, castle.x + sx * k, castle.y));
    // three between: r2 16-25 from the foe
    const near = [-1, 0, 1].map((ox, i) => pro(4995 + i, castle.x + ox, castle.y + dy - Math.sign(dy) * 4));
    assert.ok(side.every(r => d2(r.x, r.y, castle.x, castle.y) <= 100 && d2(r.x, r.y, foe.x, foe.y) > 64));
    const turn1 = (seen, ours) => {
      CFG.DEF_SEEN = seen; castle.turn = 1;
      const all = g.robots;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat([foe], ours);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 500;
      return castleTurn(B);
    };
    assert.strictEqual(turn1(0, side).action, 'attack');   // default: three defenders counted, the castle shoots
    assert.strictEqual(turn1(1, side).u, S.PROPHET);       // none of them sees the foe: a prophet toward it
    assert.strictEqual(turn1(1, near).action, 'attack');   // three that see it
  } finally { CFG.DEF_SEEN = saved; }
});

testPreV11('struct: SAFE_BUILD never builds onto a tile where the enemies in sight would kill the newborn before it acts', () => {
  const saved = CFG.SAFE_BUILD;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const dy = castle.y + 7 < g.map.length ? 7 : -7;   // two prophets 7 rows out: r2 37-64 to the near tiles
    const foes = [-1, 1].map((ox, i) => ({ id: 4990 + i, team: 1, unit: S.PROPHET, x: castle.x + ox, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }));
    const hits = (x, y) => foes.filter(e => { const r = d2(x, y, e.x, e.y); return r >= 16 && r <= 64; }).length * 10;
    const turn1 = (safe, wall, extra = []) => {
      CFG.SAFE_BUILD = safe; castle.turn = 1;
      const all = g.robots, map = g.map;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat(foes, extra);
      if (wall) g.map = map.map((row, y) => row.map((v, x) => (Math.abs(x - castle.x) <= 1 && Math.abs(y - castle.y) <= 1 && hits(x, y) < 20) ? false : v));
      const w = worldFor(g, castle); g.robots = all; g.map = map;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 500;
      return castleTurn(B);
    };
    const a0 = turn1(0), a1 = turn1(1);
    assert.strictEqual(a0.u, S.PROPHET); assert.strictEqual(hits(castle.x + a0.dx, castle.y + a0.dy), 20);   // default: toward them
    assert.strictEqual(a1.u, S.PROPHET); assert.ok(hits(castle.x + a1.dx, castle.y + a1.dy) < 20, 'a tile the pair cannot both reach');
    const a2 = turn1(1, true);   // only deadly tiles left: no prophet (the castle shoots instead)
    assert.strictEqual(a2.action, 'attack', JSON.stringify(a2));
    // SAFE_BUILD 2 counts only attackers with no other target of ours: alone, the pair is counted (as 1)...
    const b1 = turn1(2), b2 = turn1(2, true);
    assert.deepStrictEqual([b1.u, b1.dx, b1.dy], [a1.u, a1.dx, a1.dy]); assert.strictEqual(b2.action, 'attack');
    // ...but with a crusader of ours in both prophets' band they have another target: the default tile again.
    const cru = { id: 4995, team: 0, unit: S.CRUSADER, x: castle.x, y: castle.y + dy - Math.sign(dy) * 4, turn: 5, health: 40, signal: 0, signal_radius: 0, castle_talk: 0 };
    assert.ok(foes.every(e => { const r = d2(cru.x, cru.y, e.x, e.y); return r >= 16 && r <= 64; }));
    const b3 = turn1(2, false, [cru]);
    assert.strictEqual(b3.u, S.PROPHET); assert.strictEqual(hits(castle.x + b3.dx, castle.y + b3.dy), 20);
  } finally { CFG.SAFE_BUILD = saved; }
});

test('struct: DEF_SAFE builds a military newborn on a tile the enemies in sight cannot kill it on, while one is free', () => {
  const saved = CFG.DEF_SAFE;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const dy = castle.y + 7 < g.map.length ? 7 : -7;   // two prophets 7 rows out, as in the SAFE_BUILD test
    const foes = [-1, 1].map((ox, i) => ({ id: 4990 + i, team: 1, unit: S.PROPHET, x: castle.x + ox, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }));
    const hits = (x, y) => foes.filter(e => { const r = d2(x, y, e.x, e.y); return r >= 16 && r <= 64; }).length * 10;
    const turn1 = (on, wall) => {
      CFG.DEF_SAFE = on; castle.turn = 1;
      const all = g.robots, map = g.map;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat(foes);
      if (wall) g.map = map.map((row, y) => row.map((v, x) => (Math.abs(x - castle.x) <= 1 && Math.abs(y - castle.y) <= 1 && hits(x, y) < 20) ? false : v));
      const w = worldFor(g, castle); g.robots = all; g.map = map;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 500;
      return castleTurn(B);
    };
    const a0 = turn1(0), a1 = turn1(1), a2 = turn1(1, true);
    assert.strictEqual(a0.u, S.PROPHET); assert.strictEqual(hits(castle.x + a0.dx, castle.y + a0.dy), 20);   // default: toward them
    assert.strictEqual(a1.u, S.PROPHET); assert.ok(hits(castle.x + a1.dx, castle.y + a1.dy) < 20, 'a tile the pair cannot both reach');
    // only deadly tiles left: unlike SAFE_BUILD it still builds, nearest the target
    assert.strictEqual(a2.u, S.PROPHET, JSON.stringify(a2)); assert.strictEqual(hits(castle.x + a2.dx, castle.y + a2.dy), 20);
  } finally { CFG.DEF_SAFE = saved; }
});

test('struct: DEF_SAFE 2 builds a pilgrim only on a tile the enemies in sight cannot kill it on', () => {
  const saved = CFG.DEF_SAFE;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const dy = castle.y + 7 < g.map.length ? 7 : -7;
    const foes = [-1, 1].map((ox, i) => ({ id: 4990 + i, team: 1, unit: S.PROPHET, x: castle.x + ox, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }));
    const hits = (x, y) => foes.filter(e => { const r = d2(x, y, e.x, e.y); return r >= 16 && r <= 64; }).length * 10;
    const build = (on, unit, wall) => {
      CFG.DEF_SAFE = on;
      const all = g.robots, map = g.map;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat(foes);
      if (wall) g.map = map.map((row, y) => row.map((v, x) => (Math.abs(x - castle.x) <= 1 && Math.abs(y - castle.y) <= 1 && hits(x, y) < 10) ? false : v));
      const w = worldFor(g, castle); g.robots = all; g.map = map;
      return buildToward({ w, st: {} }, unit, castle.x, castle.y + dy);
    };
    const at = b => hits(b.x, b.y);
    const p1 = build(1, S.PILGRIM), p2 = build(2, S.PILGRIM);
    assert.ok(at(p1) >= 10, 'v11: the pilgrim goes toward the target, into reach');
    assert.strictEqual(at(p2), 0, 'DEF_SAFE 2: a tile neither prophet reaches');
    assert.strictEqual(build(2, S.PILGRIM, true), null, 'every free tile in reach: no pilgrim');
    assert.ok(build(1, S.PILGRIM, true) !== null);
    const m = build(2, S.PROPHET, true);   // the military still builds when every tile is deadly (DEF_SAFE 1's rule)
    assert.ok(m !== null && at(m) >= 10);
  } finally { CFG.DEF_SAFE = saved; }
});

testPreV7('struct: ECON_UNTIL keeps the peacetime army out before that round, not a threat response', () => {
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

test('struct: CHAIN_GUARD lets the guard quota past the chain reserve, not the army beyond it', () => {
  const saved = [CFG.CHAIN_GUARD, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const turn1 = (guard, guards) => {
      CFG.CHAIN_GUARD = guard; castle.turn = 300;   // a castle's round is its turn
      const all = g.robots;
      const mine = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100);
      const free = [];   // our prophets on free tiles in sight: the guard we have
      for (let r2 = 4; r2 <= 100 && free.length < guards; r2++) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++)
        if (free.length < guards && d2(x, y, castle.x, castle.y) === r2 && g.map[y][x] && !mine.some(q => q.x === x && q.y === y))
          free.push({ id: 4900 + free.length, team: 0, unit: S.PROPHET, x, y, turn: 9, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 });
      g.robots = mine.concat(free);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 300, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 200; w.fuel = 2000;   // past CHAIN_ROUND, far below CHAIN_K
      return castleTurn(B);
    };
    const want = Math.min(CFG.GUARD_MAX, CFG.GUARD_BASE + Math.floor(300 / CFG.GUARD_ROUNDS));
    assert.ok(CFG.CHAIN_ROUND && CFG.CHAIN_ROUND <= 300 && 200 < CFG.CHAIN_K, 'v7 values');
    assert.strictEqual(turn1(0, 0), null);                                         // default: the chain's bank waits
    assert.ok([S.CRUSADER, S.PROPHET, S.PREACHER].includes((turn1(1, 0) || {}).u)); // below the quota: the guard
    assert.strictEqual(turn1(1, want), null);                                      // the quota met: waits again
  } finally { [CFG.CHAIN_GUARD, CFG.SERVE_MOVES] = saved; }
});

test('struct: CHAIN_FKEEP: from CHAIN_ROUND the peacetime army leaves the chain\'s fuel in the bank too', () => {
  const saved = [CFG.CHAIN_FKEEP, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const turn1 = (keep, round, fuel) => {
      CFG.CHAIN_FKEEP = keep; castle.turn = round;   // a castle's round is its turn
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 2000; w.fuel = fuel;   // past CHAIN_K, RICH_K and every other reserve
      return castleTurn(B);
    };
    const mil = a => [S.CRUSADER, S.PROPHET, S.PREACHER].includes((a || {}).u);
    assert.ok(CFG.CHAIN_ROUND > CFG.ECON_UNTIL && CFG.CHAIN_ROUND <= 300 && CFG.CHAIN_K + 300 < 2000 && !CFG.CHAIN_LIVE, 'v12 values');
    const r = CFG.CHAIN_ROUND;
    assert.ok(mil(turn1(0, r + 100, 2000)));                       // default: the army spends the chain's fuel
    assert.strictEqual(turn1(1, r + 100, 2000), null);              // kept: below CHAIN_F and the army's reserve it waits
    assert.ok(mil(turn1(1, r + 100, CFG.CHAIN_F + 2000)));         // past both: builds
    assert.ok(mil(turn1(1, r - 50, 2000)));                        // before CHAIN_ROUND nothing is kept
  } finally { [CFG.CHAIN_FKEEP, CFG.SERVE_MOVES] = saved; }
});

test('struct: ECON_RICH builds the peacetime army before ECON_UNTIL from the bank past it and the reserves only', () => {
  const saved = [CFG.ECON_RICH, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const turn1 = (rich, k) => {
      CFG.ECON_RICH = rich; castle.turn = 50;   // a castle's round is its turn: before ECON_UNTIL
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 50, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = k; w.fuel = 2000;
      return castleTurn(B);
    };
    assert.ok(CFG.ECON_UNTIL > 50, 'v7 values');
    const reserve = CFG.DEF_RESERVE_K + CFG.PEACE_RESERVE_K;   // no pioneer out or due, no chain yet
    assert.strictEqual(turn1(0, 600), null);                                                  // default: no army before ECON_UNTIL
    assert.ok([S.CRUSADER, S.PROPHET, S.PREACHER].includes((turn1(100, 600) || {}).u));       // a rich bank builds one
    assert.strictEqual(turn1(100, 100 + reserve), null);                                      // at the threshold: waits
  } finally { [CFG.ECON_RICH, CFG.SERVE_MOVES] = saved; }
});

test('struct: ECON_NOPLAN: before ECON_UNTIL a castle whose team planned no church builds its army; one with a plan waits', () => {
  const saved = [CFG.ECON_NOPLAN, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const turn1 = (noplan, planAll) => {
      CFG.ECON_NOPLAN = noplan; castle.turn = 50;   // a castle's round is its turn: before ECON_UNTIL
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 50, birthRound: 1, st: { planAll }, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 600; w.fuel = 2000;
      return castleTurn(B);
    };
    assert.ok(CFG.ECON_UNTIL > 50 && !CFG.ECON_RICH, 'v8 values');
    const mil = a => [S.CRUSADER, S.PROPHET, S.PREACHER].includes((a || {}).u);
    assert.strictEqual(turn1(0, 0), null);           // default: no army before ECON_UNTIL
    assert.ok(mil(turn1(1, 0)));                      // nothing planned: the bank builds the army
    assert.strictEqual(turn1(1, 2), null);           // churches planned: the bank waits for their pioneers
    assert.strictEqual(turn1(1, undefined), null);   // no plan yet (castles plan on turn 3)
  } finally { [CFG.ECON_NOPLAN, CFG.SERVE_MOVES] = saved; }
});

test('struct: FUEL_DEFER staffs only karbonite depots in the opening while fuel lasts, no attacker was seen and a church may be planned', () => {
  const saved = [CFG.FUEL_DEFER, CFG.FUEL_DEFER_MIN];
  try {
    CFG.FUEL_DEFER = 0;
    const g = new Game(2013, 100, 20, false, false);   // one castle a side, serving one karbonite and two fuel depots
    g.robots = g.robots.filter(r => r.team === 0);
    const castle = g.robots[0];
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    castle.turn = 1; let w = worldFor(g, castle); B.w = w; B.api = w.api;
    const a = castleTurn(B);
    assert.strictEqual(a.u, S.PILGRIM);
    assert.deepStrictEqual([...B.st.assign.keys()].map(i => B.deps[i].k), [true]);   // the karbonite miner first
    assert.deepStrictEqual(B.st.served.map(d => d.k).sort(), [false, false, true]);
    castle.turn = 2; w = worldFor(g, castle); B.w = w; B.api = w.api;   // its newborn is still pending
    const next = (fd, set = {}) => {
      CFG.FUEL_DEFER = fd; CFG.FUEL_DEFER_MIN = 300;
      w.fuel = 'fuel' in set ? set.fuel : 500; B.round = set.round || 2;
      B.st.planAll = set.planAll; B.st.threatAt = set.threatAt;
      return nextDepot(B);
    };
    assert.strictEqual(next(0).k, false);                                 // default (v8): a fuel miner next
    assert.strictEqual(next(60), null);                                   // before planning (turn 3): only karbonite
    assert.strictEqual(next(60, { planAll: 6 }), null);                   // a church planned: the fuel miners wait
    assert.strictEqual(next(60, { planAll: 0 }).k, false);                // nothing to church: v8's mix
    assert.strictEqual(next(60, { planAll: 6, fuel: 299 }).k, false);     // short of fuel: v8's mix
    assert.strictEqual(next(60, { planAll: 6, round: 60 }).k, false);     // the opening is over
    assert.strictEqual(next(60, { planAll: 6, round: 59 }), null);
    assert.strictEqual(next(60, { planAll: 6, threatAt: 2 }).k, false);   // an attacker was seen
  } finally { [CFG.FUEL_DEFER, CFG.FUEL_DEFER_MIN] = saved; }
});

test('struct: PIONEER_HOLD keeps the church in the bank from pilgrims and far threat responses while a pioneer waits', () => {
  const saved = CFG.PIONEER_HOLD;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null;   // the waiting pioneer, somewhere in the castle's sight
    for (let r = 3; r <= 6 && !P; r++) for (let dx = -r; dx <= r && !P; dx++) if (free(castle.x + dx, castle.y + r)) P = [castle.x + dx, castle.y + r];
    if (!P) for (let r = 3; r <= 6 && !P; r++) for (let dx = -r; dx <= r && !P; dx++) if (free(castle.x + dx, castle.y - r)) P = [castle.x + dx, castle.y - r];
    const pio = { id: 4100, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 30, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    const dy = castle.y + 9 < n ? 9 : -9, dy8 = Math.sign(dy) * 8;   // an enemy prophet at r2 81 / 64
    const foe = y => ({ id: 4990, team: 1, unit: S.PROPHET, x: castle.x, y: castle.y + y, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 });
    const turn1 = (hold, k, wait, enemy) => {
      CFG.PIONEER_HOLD = hold; castle.turn = 50; pio.castle_talk = wait ? CT.WAIT : CT.UNIT + S.PILGRIM;
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100).concat([pio], enemy ? [foe(enemy)] : []);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 50, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = k; w.fuel = 2000;
      const a = castleTurn(B);
      return a && a.action === 'build' ? a.u : a ? a.action : null;
    };
    const church = S.STATS[S.CHURCH].costK + CFG.DEF_RESERVE_K, pil = S.STATS[S.PILGRIM].costK, pro = S.STATS[S.PROPHET].costK;
    assert.strictEqual(turn1(0, 50, true), S.PILGRIM);                 // default: the depot gets its pilgrim
    assert.strictEqual(turn1(64, 50, false), S.PILGRIM);               // no pioneer waits: as before
    assert.strictEqual(turn1(64, pil + church - 1, true), null);        // one waits: the bank keeps its church
    assert.strictEqual(turn1(64, pil + church, true), S.PILGRIM);
    let ran = 0;
    if (g.map[castle.y + dy] && g.map[castle.y + dy][castle.x] && free(castle.x, castle.y + dy)) {
      ran++;
      assert.strictEqual(turn1(0, pro + 10, true, dy), S.PROPHET);     // a far attacker: answered by default
      assert.notStrictEqual(turn1(64, pro + church - 1, true, dy), S.PROPHET);   // held while a pioneer waits
      assert.strictEqual(turn1(64, pro + church, true, dy), S.PROPHET);
    }
    if (g.map[castle.y + dy8] && g.map[castle.y + dy8][castle.x] && free(castle.x, castle.y + dy8)) {
      ran++;
      assert.strictEqual(turn1(64, pro + 10, true, dy8), S.PROPHET);   // one in reach of the castle (r2 64): answered
    }
    assert.strictEqual(ran, 2, 'both attacker tiles open on this map');
  } finally { CFG.PIONEER_HOLD = saved; }
});

test('pilgrim: PIONEER_HOLD a pioneer beside its free site that cannot afford the church says it waits', () => {
  const saved = CFG.PIONEER_HOLD;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    g.robots = g.robots.filter(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null, site = null;   // a pilgrim on plain ground next to a free plain tile, out of every castle's way
    for (let y = Math.floor(n / 2) - 3; y <= Math.floor(n / 2) + 3 && !P; y++) for (let x = 1; x < n - 1 && !P; x++)
      if (free(x, y) && free(x + 1, y) && g.robots.every(q => d2(q.x, q.y, x, y) > 9)) { P = [x, y]; site = [x + 1, y]; }
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 30, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil);
    const run = (hold, k) => {
      CFG.PIONEER_HOLD = hold;
      const w = worldFor(g, pil); let talked = 0; w.api.castleTalk = v => { talked = v; };
      const B = { api: w.api, w, round: 40, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
      pilgrimTurn(B);                                            // setup
      B.st.site = site.slice(); B.st.cluster = 0; talked = 0;
      w.karbonite = k; w.fuel = 1000;
      return { a: pilgrimTurn(B), talked };
    };
    const church = S.STATS[S.CHURCH].costK + CFG.DEF_RESERVE_K;
    assert.deepStrictEqual(run(0, church - 1), { a: null, talked: 0 });       // default: waits in silence
    assert.deepStrictEqual(run(64, church - 1), { a: null, talked: CT.WAIT });
    const b = run(64, church);                                                // affordable: builds and reports it
    assert.strictEqual(b.a.action, 'build'); assert.strictEqual(b.a.u, S.CHURCH); assert.strictEqual(b.talked, CT.CHURCH + 0);
  } finally { CFG.PIONEER_HOLD = saved; }
});

test('pilgrim: PIONEER_LEAN a pioneer that has waited beside its free site builds the church without the reserve', () => {
  const saved = CFG.PIONEER_LEAN;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    g.robots = g.robots.filter(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null, site = null;
    for (let y = Math.floor(n / 2) - 3; y <= Math.floor(n / 2) + 3 && !P; y++) for (let x = 1; x < n - 1 && !P; x++)
      if (free(x, y) && free(x + 1, y) && g.robots.every(q => d2(q.x, q.y, x, y) > 9)) { P = [x, y]; site = [x + 1, y]; }
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 30, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil);
    const church = S.STATS[S.CHURCH].costK;
    assert.ok(CFG.DEF_RESERVE_K > 0, 'v7 values');
    const run = (lean, waits) => {      // `waits` turns short of the church and its reserve, then one at the church's cost
      CFG.PIONEER_LEAN = lean;
      const w = worldFor(g, pil);
      const B = { api: w.api, w, round: 40, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
      pilgrimTurn(B);                                            // setup
      B.st.site = site.slice(); B.st.cluster = 0; w.fuel = 1000;
      const as = [];
      for (let i = 0; i < waits; i++) { w.karbonite = church - 1; as.push(pilgrimTurn(B)); }
      w.karbonite = church; as.push(pilgrimTurn(B));
      return as.map(a => a ? a.u || a.action : null);
    };
    assert.deepStrictEqual(run(0, 5), [null, null, null, null, null, null]);   // default: the reserve too, always
    assert.deepStrictEqual(run(3, 2), [null, null, null]);                     // waited 2 of 3 turns: not yet
    assert.deepStrictEqual(run(3, 3), [null, null, null, S.CHURCH]);           // waited 3: builds on 50 K
  } finally { CFG.PIONEER_LEAN = saved; }
});

testPreV7('struct: PEACE_RESERVE_K holds karbonite back from the peacetime army, not from pilgrims or a threat response', () => {
  const saved = [CFG.PEACE_RESERVE_K, CFG.SERVE_MOVES];
  try {
    const turn1 = (g, castle, reserve, k, enemy) => {
      CFG.PEACE_RESERVE_K = reserve; castle.turn = 1;
      const extra = enemy ? [{ id: 4999, team: 1, unit: S.CRUSADER, x: castle.x, y: castle.y + 3, turn: 5, health: 40, signal: 0, signal_radius: 0, castle_talk: 0 }] : [];
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100).concat(extra);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = k;
      return castleTurn(B);
    };
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    assert.strictEqual((turn1(g, castle, 30, 35) || {}).u, S.PILGRIM);   // the economy still builds below the reserve
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    assert.ok([S.CRUSADER, S.PROPHET, S.PREACHER].includes((turn1(g, castle, 0, 100) || {}).u));   // the peacetime guard
    assert.strictEqual(turn1(g, castle, 90, 100), null);                       // any unit would leave less than 90
    assert.strictEqual((turn1(g, castle, 90, 100, true) || {}).u, S.PREACHER);  // a crusader 3 tiles away: answered
  } finally { [CFG.PEACE_RESERVE_K, CFG.SERVE_MOVES] = saved; }
});

testPreV7('struct: MIX_BY_STOCK builds crusaders when karbonite binds, preachers when fuel binds, else the rotation', () => {
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

test('castle: RECALL radios its position when attackers outnumber half its defenders, at most every 10 rounds', () => {
  const saved = CFG.RECALL;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    let ex = null;
    for (let dy = -4; dy <= 4 && !ex; dy++) for (let dx = -4; dx <= 4 && !ex; dx++) {
      const x = castle.x + dx, y = castle.y + dy;
      if (dx * dx + dy * dy >= 9 && dx * dx + dy * dy <= 16 && x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y)) ex = [x, y];
    }
    g.robots.push({ id: 4999, team: 1, unit: S.CRUSADER, x: ex[0], y: ex[1], turn: 5, health: 40, signal: 0, signal_radius: 0, castle_talk: 0 });
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    const turn = t => {
      castle.turn = t; const w = worldFor(g, castle), sent = [];
      w.api.signal = (v, r2) => sent.push([v, r2]);
      B.w = w; B.api = w.api; castleTurn(B);
      return { sent: sent.filter(([, r2]) => r2 === FAR.RECALL), me: w.me };
    };
    CFG.RECALL = 0;
    assert.strictEqual(turn(1).sent.length, 0);
    CFG.RECALL = 30;
    for (let t = 2; t <= 4; t++) turn(t);   // past setup (turns 1-3)
    const a = turn(20);
    assert.deepStrictEqual(a.sent, [[encXY(0, a.me.x, a.me.y), FAR.RECALL]]);
    assert.strictEqual(turn(25).sent.length, 0);   // within 10 rounds
    assert.strictEqual(turn(30).sent.length, 1);
  } finally { CFG.RECALL = saved; }
});

test('castle: CASTLE_POST radios its position far every CASTLE_POST_EVERY rounds when the radio is free', () => {
  const saved = [CFG.CASTLE_POST, CFG.CASTLE_POST_EVERY];
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    const turn = t => {
      castle.turn = t; const w = worldFor(g, castle), sent = [];
      w.api.signal = (v, r2) => sent.push([v, r2]);
      w.karbonite = 0;   // no builds: their birth radio would take the turn's signal first
      B.w = w; B.api = w.api; castleTurn(B);
      return { sent: sent.filter(([, r2]) => r2 === FAR.POST), me: w.me };
    };
    CFG.CASTLE_POST = 0;
    for (let t = 1; t <= 4; t++) assert.strictEqual(turn(t).sent.length, 0);
    CFG.CASTLE_POST = 0.5; CFG.CASTLE_POST_EVERY = 20;
    const rounds = [];
    for (let t = 5; t <= 60; t++) { const a = turn(t); if (a.sent.length) { rounds.push(t); assert.deepStrictEqual(a.sent, [[encXY(0, a.me.x, a.me.y), FAR.POST]]); } }
    assert.deepStrictEqual(rounds, [5, 25, 45]);
    assert.deepStrictEqual(decFarRobot({ signal: encXY(0, 3, 4), signal_radius: FAR.POST }), { type: SIG.POST, x: 3, y: 4, extra: 0 });
  } finally { [CFG.CASTLE_POST, CFG.CASTLE_POST_EVERY] = saved; }
});

test('military: CASTLE_POST: a church-born unit that drew a post takes the nearest castle heard as home; off, it keeps its church', () => {
  // the rule: nearest to the birth church, ties by canonical order; a castle seen gone is replaced by the next heard
  const B = { w: { n: 64 }, st: { home0: { x: 10, y: 10 }, home: { x: 10, y: 10 }, post: null, lt: [1, 1] } };
  hearPost(B, 10, 20); assert.deepStrictEqual(B.st.home, { x: 10, y: 20 }); assert.strictEqual(B.st.lt, null);
  hearPost(B, 10, 15); assert.deepStrictEqual(B.st.home, { x: 10, y: 15 });
  hearPost(B, 10, 20); assert.deepStrictEqual(B.st.home, { x: 10, y: 15 });
  hearPost(B, 10, 5); assert.deepStrictEqual(B.st.home, { x: 10, y: 5 });    // tie at r2 25: the earlier in canonical order
  hearPost(B, 10, 15); assert.deepStrictEqual(B.st.home, { x: 10, y: 5 });
  B.st.post = null; hearPost(B, 10, 20); assert.deepStrictEqual(B.st.home, { x: 10, y: 20 });

  const saved = CFG.CASTLE_POST;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let ch = null, at = null;
    for (let r = 14; r >= 9 && !at; r--) for (let dy = -r; dy <= r && !at; dy++) for (let dx = -r; dx <= r && !at; dx++) {
      const x = castle.x + dx, y = castle.y + dy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== r || !free(x, y)) continue;
      for (const [ax, ay] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!at && free(x + ax, y + ay)) { ch = [x, y]; at = [x + ax, y + ay]; }
    }
    assert.ok(at);
    const church = { id: 4100, team: 0, unit: S.CHURCH, x: ch[0], y: ch[1], turn: 50, health: 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(church);
    const cw = worldFor(g, castle);
    castle.signal = encXY(0, cw.me.x, cw.me.y); castle.signal_radius = FAR.POST;
    const run = (on) => {
      CFG.CASTLE_POST = on;
      const pro = { id: 4101, team: 0, unit: S.PROPHET, x: at[0], y: at[1], turn: 1, health: 20, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(pro);
      try {
        const w = worldFor(g, pro), B = { api: w.api, w, round: 60, st: {}, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.PROPHET].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return { a: militaryTurn(B), B, w };
      } finally { g.robots.pop(); }
    };
    const on = run(1), off = run(0);
    assert.deepStrictEqual(on.B.st.home, { x: cw.me.x, y: cw.me.y });
    assert.ok(on.a && on.a.action === 'move' && on.B.st.lt && king(on.B.st.lt[0], on.B.st.lt[1], cw.me.x, cw.me.y) <= CFG.CASTLE_POST_R);
    assert.notDeepStrictEqual(off.B.st.home, { x: cw.me.x, y: cw.me.y });
    assert.strictEqual(off.B.st.toCastle, 0);
  } finally { CFG.CASTLE_POST = saved; }
});

test('military: RECALL sends a unit that hears it toward the castle, holding 2-3 king steps out, and nothing changes when off', () => {
  const saved = CFG.RECALL;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const spot = (lo, hi) => { for (let r = lo; r <= hi; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && free(castle.x + dx, castle.y + dy)) return [castle.x + dx, castle.y + dy]; return null; };
    const far = spot(8, 12), near = spot(2, 2);
    assert.ok(far && near);
    const cw = worldFor(g, castle);
    castle.signal = encXY(0, cw.me.x, cw.me.y); castle.signal_radius = FAR.RECALL;
    const run = ([x, y], on, st = {}) => {
      CFG.RECALL = on;
      const cru = { id: 4002, team: 0, unit: S.CRUSADER, x, y, turn: 3, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(cru);
      try {
        const w = worldFor(g, cru), B = { api: w.api, w, round: 20, birthRound: 18, st, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        const a = militaryTurn(B);
        return { a, B, w };
      } finally { g.robots.pop(); }
    };
    const k0 = king(far[0], far[1], castle.x, castle.y);
    const on = run(far, 30);
    assert.ok(on.B.st.recall && on.a && on.a.action === 'move');
    assert.ok(king(far[0] + on.a.dx, far[1] + on.a.dy, castle.x, castle.y) < k0);
    assert.strictEqual(run(near, 30).a, null);       // already 2 king steps out: holds
    assert.strictEqual(run(far, 0).B.st.recall, undefined);
    assert.strictEqual(on.B.st.target, null);
    // A chain-born unit keeps its line's target through the recall, and still walks to the ring first.
    const ec = cw.enemies.find(e => e.unit === S.CASTLE), ct = [ec.x, ec.y];
    const ch = run(far, 30, { chainT: ct });
    assert.ok(ch.B.st.recall && ch.a && ch.a.action === 'move');
    assert.deepStrictEqual(ch.B.st.target, ct);
    assert.ok(king(far[0] + ch.a.dx, far[1] + ch.a.dy, castle.x, castle.y) < k0);
  } finally { CFG.RECALL = saved; }
});

test('military: SPOT: a firing prophet radios its target for melee units in sight, which engage what they hear', () => {
  const saved = CFG.SPOT;
  try {
    CFG.SPOT = 3;
    const sent = [];
    const pw = (friends, fuel = 1000) => ({ me: { x: 10, y: 10, turn: 20, unit: S.PROPHET }, friends, fuel, sentR2: 0,
      signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; } });
    const B = { w: pw([{ x: 9, y: 9, unit: S.CRUSADER }]), st: {} };
    spot(B, { x: 12, y: 17, unit: S.PROPHET });
    assert.deepStrictEqual(sent, [[encXY(0, 12, 17), FAR.ENEMY]]);
    B.w.sentR2 = 0; B.w.me.turn = 22; spot(B, { x: 12, y: 17, unit: S.PROPHET });   // within SPOT turns
    B.w.me.turn = 23; spot(B, { x: 12, y: 17, unit: S.PILGRIM });                    // pilgrims are not worth it
    spot({ w: pw([{ x: 9, y: 9, unit: S.PROPHET }]), st: {} }, { x: 12, y: 17, unit: S.CRUSADER });   // no melee in sight
    spot({ w: pw([{ x: 9, y: 9, unit: S.PREACHER }], 60), st: {} }, { x: 12, y: 17, unit: S.CRUSADER });   // fuel
    assert.strictEqual(sent.length, 1);
    B.w.me.turn = 23; spot(B, { x: 12, y: 18, unit: S.CASTLE });
    assert.deepStrictEqual(sent[1], [encXY(0, 12, 18), FAR.ENEMY]);

    // A crusader that hears a spot (sent here by the castle, a seen friend) walks toward it; off, it does not hear.
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const ring = (cx, cy, lo, hi) => { for (let r = lo; r <= hi; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && free(cx + dx, cy + dy)) return [cx + dx, cy + dy]; return null; };
    const at = ring(castle.x, castle.y, 4, 5), tgt = at && ring(at[0], at[1], 5, 6);
    assert.ok(at && tgt);
    const run = (on) => {
      CFG.SPOT = on;
      const cru = { id: 4004, team: 0, unit: S.CRUSADER, x: at[0], y: at[1], turn: 3, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(cru);
      try {
        const cw = worldFor(g, castle), [sx, sy] = cw.T.toC(tgt[0], tgt[1]);
        castle.signal = encXY(0, sx, sy); castle.signal_radius = FAR.ENEMY;
        const w = worldFor(g, cru), B = { api: w.api, w, round: 20, birthRound: 18, st: {}, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return { a: militaryTurn(B), B };
      } finally { g.robots.pop(); castle.signal = 0; castle.signal_radius = 0; }
    };
    const on = run(3), e2 = (x, y) => (x - tgt[0]) ** 2 + (y - tgt[1]) ** 2;
    assert.ok(on.B.st.spot && on.a && on.a.action === 'move');
    assert.ok(e2(at[0] + on.a.dx, at[1] + on.a.dy) < e2(at[0], at[1]));
    assert.strictEqual(run(0).B.st.spot, undefined);
    CFG.WATCH = 2; const wa = run(0);   // WATCH alone: the crusader hears a structure's spot and walks to it
    assert.ok(wa.B.st.spot && wa.a && wa.a.action === 'move' && e2(at[0] + wa.a.dx, at[1] + wa.a.dy) < e2(at[0], at[1]));
  } finally { CFG.SPOT = saved; CFG.WATCH = 0; }
});

test('hunt: a pilgrim radios an enemy pilgrim that stood HUNT turns still in our half off depots; melee units go for it', () => {
  const saved = [CFG.HUNT, CFG.HUNT_EVERY, CFG.HUNT_SLACK];
  try {
    CFG.HUNT = 5; CFG.HUNT_EVERY = 3;
    const sent = [], st = {};
    const look = (turn, enemies, fuel = 1000) => {
      const w = { me: { x: 10, y: 10, turn, unit: S.PILGRIM }, n: 32, enemies, fuel, sentR2: 0, isDepot: (x, y) => x === 14 && y === 9,
        signal(v, r2) { sent.push([turn, v, r2]); this.sentR2 = r2; } };
      huntSpot({ w, st });
    };
    const P = (x, y, id = 77) => ({ id, unit: S.PILGRIM, x, y });
    for (let t = 10; t <= 19; t++) look(t, [P(13, 12)]);
    // first seen at 10: radioed at 15 and every 3 turns after, as canonical (x, y)
    assert.deepStrictEqual(sent, [[15, encXY(0, 13, 12), FAR.HUNT], [18, encXY(0, 13, 12), FAR.HUNT]]);
    look(20, [P(13, 13)]); look(24, [P(13, 13)]);   // it moved: the count restarts
    assert.strictEqual(sent.length, 2);
    look(25, [P(13, 13)]);
    assert.strictEqual(sent.length, 3);
    sent.length = 0;
    const quiet = (enemies, fuel) => { const s0 = {}; for (let t = 1; t <= 12; t++) { const w = { me: { x: 10, y: 14, turn: t }, n: 32, enemies, fuel, sentR2: 0,
      isDepot: (x, y) => x === 14 && y === 9, signal(v, r2) { sent.push([t, v, r2]); } }; huntSpot({ w, st: s0 }); } };
    quiet([P(12, 16)], 1000);                          // the enemy half (y >= n/2)
    quiet([P(14, 9)], 1000);                           // on a depot: a miner
    quiet([{ id: 5, unit: S.CRUSADER, x: 12, y: 12 }], 1000);   // not a pilgrim
    quiet([P(12, 12)], 100);                           // bank under HUNT_FUEL
    quiet([P(12, 12), { id: 6, unit: S.CHURCH, x: 13, y: 10 }], 1000);   // next to its church: depositing
    assert.strictEqual(sent.length, 0);
    CFG.HUNT_SLACK = 4; quiet([P(12, 19)], 1000);       // HUNT_SLACK: 3 rows past the midline counts as ours
    assert.deepStrictEqual(sent.map(s => s[0] + ':' + s[1]), [6, 9, 12].map(t => t + ':' + encXY(0, 12, 19)));
    quiet([P(12, 20)], 1000); CFG.HUNT_SLACK = 0;      // ...4 rows past it does not
    assert.strictEqual(sent.length, 3); sent.length = 0;

    // A crusader that hears the hunt radio (sent here by the castle, a seen friend) walks toward it; off, it does not.
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const ring = (cx, cy, lo, hi) => { for (let r = lo; r <= hi; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && free(cx + dx, cy + dy)) return [cx + dx, cy + dy]; return null; };
    const at = ring(castle.x, castle.y, 4, 5), tgt = at && ring(at[0], at[1], 8, 9);
    assert.ok(at && tgt);
    const run = (on) => {
      CFG.HUNT = on;
      const cru = { id: 4004, team: 0, unit: S.CRUSADER, x: at[0], y: at[1], turn: 3, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(cru);
      try {
        const cw = worldFor(g, castle), [sx, sy] = cw.T.toC(tgt[0], tgt[1]);
        castle.signal = encXY(0, sx, sy); castle.signal_radius = FAR.HUNT;
        const w = worldFor(g, cru), B = { api: w.api, w, round: 20, birthRound: 18, st: {}, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return { a: militaryTurn(B), B };
      } finally { g.robots.pop(); castle.signal = 0; castle.signal_radius = 0; }
    };
    const on = run(5), e2 = (x, y) => (x - tgt[0]) ** 2 + (y - tgt[1]) ** 2;
    assert.ok(on.B.st.hunt && on.a && on.a.action === 'move');
    assert.ok(e2(at[0] + on.a.dx, at[1] + on.a.dy) < e2(at[0], at[1]));
    const off = run(0);
    assert.strictEqual(off.B.st.hunt, undefined);
    assert.ok(!off.a || off.a.action !== 'move' || e2(at[0] + off.a.dx, at[1] + off.a.dy) >= e2(at[0], at[1]) || off.a.dx !== on.a.dx || off.a.dy !== on.a.dy,
      'off, the crusader goes about its own business');
  } finally { [CFG.HUNT, CFG.HUNT_EVERY, CFG.HUNT_SLACK] = saved; }
});

test('military: SPOT_MASK 16: prophets radio with only prophets in sight and walk into the band of a heard spot', () => {
  const saved = [CFG.SPOT, CFG.SPOT_MASK];
  try {
    CFG.SPOT = 3; CFG.SPOT_MASK = 16;
    const sent = [];
    const w0 = { me: { x: 10, y: 10, turn: 20, unit: S.PROPHET }, friends: [{ x: 9, y: 9, unit: S.PROPHET }], fuel: 1000, sentR2: 0,
      signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; } };
    spot({ w: w0, st: {} }, { x: 12, y: 17, unit: S.CRUSADER });
    assert.deepStrictEqual(sent, [[encXY(0, 12, 17), FAR.ENEMY]]);

    // A prophet out of reach of the spot (r2 > 64) and near home steps toward its firing band; off, it does not hear.
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const d2 = (a, b, x, y) => (a - x) ** 2 + (b - y) ** 2;
    let at = null, tgt = null;
    for (let r = 3; r <= 5 && !tgt; r++) for (let dy = -r; dy <= r && !tgt; dy++) for (let dx = -r; dx <= r && !tgt; dx++) {
      const ax = castle.x + dx, ay = castle.y + dy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== r || !free(ax, ay)) continue;
      for (let ty = 0; ty < n && !tgt; ty++) for (let tx = 0; tx < n && !tgt; tx++)
        if (free(tx, ty) && d2(tx, ty, ax, ay) > 100 && d2(tx, ty, ax, ay) <= 144 && d2(tx, ty, castle.x, castle.y) <= 150) { at = [ax, ay]; tgt = [tx, ty]; }
    }
    assert.ok(at && tgt);
    const run = (on) => {
      CFG.SPOT_MASK = on;
      const pro = { id: 4005, team: 0, unit: S.PROPHET, x: at[0], y: at[1], turn: 3, health: 20, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(pro);
      try {
        const cw = worldFor(g, castle), [sx, sy] = cw.T.toC(tgt[0], tgt[1]);
        castle.signal = encXY(0, sx, sy); castle.signal_radius = FAR.ENEMY;
        const w = worldFor(g, pro), B = { api: w.api, w, round: 20, birthRound: 18, st: {}, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.PROPHET].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return { a: militaryTurn(B), B };
      } finally { g.robots.pop(); castle.signal = 0; castle.signal_radius = 0; }
    };
    const on = run(16), e2 = (x, y) => d2(x, y, tgt[0], tgt[1]);
    assert.ok(on.B.st.spot && on.a && on.a.action === 'move' && on.B.nav.lastKey.startsWith('S'));
    assert.ok(e2(at[0] + on.a.dx, at[1] + on.a.dy) < e2(at[0], at[1]));
    const off = run(40);
    assert.strictEqual(off.B.st.spot, undefined);
    assert.ok(!(off.B.nav.lastKey || '').startsWith('S'));
  } finally { [CFG.SPOT, CFG.SPOT_MASK] = saved; }
});

test('military: EDGE keeps a marching unit out of reach of enemy attackers until ours outnumber them', () => {
  const saved = CFG.EDGE;
  try {
    const B = (enemies, friends) => ({ w: { me: { x: 10, y: 10, unit: S.PROPHET }, enemies, friends } });
    const P = (x, y, unit = S.PROPHET) => ({ x, y, unit });
    CFG.EDGE = 1.5;
    const hot = edgeAvoid(B([P(10, 19)], []));
    assert.strictEqual(hot(10, 11), true);    // r2 64 from the enemy prophet
    assert.strictEqual(hot(11, 11), false);   // r2 65
    assert.strictEqual(hot(10, 9), false);
    assert.strictEqual(edgeAvoid(B([P(10, 19)], [P(9, 9, S.CRUSADER)])), undefined);           // 2 to 1
    assert.strictEqual(typeof edgeAvoid(B([P(10, 19), P(12, 19)], [P(9, 9, S.CRUSADER)])), 'function');   // 2 to 2
    assert.strictEqual(typeof edgeAvoid(B([P(10, 19)], [P(9, 9, S.PILGRIM)])), 'function');    // pilgrims do not count
    assert.strictEqual(edgeAvoid(B([P(10, 17)], [])), undefined);           // already in reach (r2 49): no edge to keep
    assert.strictEqual(edgeAvoid(B([P(10, 19, S.PILGRIM)], [])), undefined);   // harmless enemies
    CFG.EDGE = 2;
    assert.strictEqual(edgeAvoid(B([P(10, 19)], [P(9, 9, S.PREACHER)])), undefined);
  } finally { CFG.EDGE = saved; }
});

test('military: MARCH_MASK lets only the masked unit types take attack orders before ATTACK_LATE', () => {
  const saved = CFG.MARCH_MASK, late = CFG.ATTACK_LATE;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let at = null;
    for (let r = 3; r <= 6 && !at; r++) for (let dy = -r; dy <= r && !at; dy++) for (let dx = -r; dx <= r && !at; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && free(castle.x + dx, castle.y + dy)) at = [castle.x + dx, castle.y + dy];
    const cw = worldFor(g, castle), [tx, ty] = cw.mirror(cw.me.x, cw.me.y);
    castle.signal = encXY(0, tx, ty); castle.signal_radius = FAR.ATTACK;
    const target = (unit, mask, round) => {
      CFG.MARCH_MASK = mask;
      const u = { id: 4003, team: 0, unit, x: at[0], y: at[1], turn: 3, health: S.STATS[unit].hp, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(u);
      try {
        const w = worldFor(g, u), B = { api: w.api, w, round, birthRound: round - 2, st: {}, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[unit].speed); B.nav = new Nav(w, B.offs, B.rnd);
        militaryTurn(B);
        return B.st.target;
      } finally { g.robots.pop(); }
    };
    assert.deepStrictEqual(target(S.PROPHET, 56, 460), [tx, ty]);   // default: every type marches
    assert.strictEqual(target(S.PROPHET, 8, 460), null);            // crusaders only
    assert.deepStrictEqual(target(S.CRUSADER, 8, 460), [tx, ty]);
    assert.deepStrictEqual(target(S.PROPHET, 8, 950), [tx, ty]);    // the last rounds: everyone
    CFG.ATTACK_LATE = 1001;
    assert.strictEqual(target(S.PROPHET, 8, 950), null);            // ATTACK_LATE past the game: the mask holds
    assert.deepStrictEqual(target(S.CRUSADER, 8, 950), [tx, ty]);
    CFG.ATTACK_LATE = 700;
    assert.deepStrictEqual(target(S.PROPHET, 8, 710), [tx, ty]);
  } finally { CFG.MARCH_MASK = saved; CFG.ATTACK_LATE = late; }
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

test('pilgrim: PILGRIM_ORPHAN walks a full pilgrim that knows no living structure toward our half until it sees one', () => {
  const saved = CFG.PILGRIM_ORPHAN;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const ours = g.robots.filter(r => r.team === 0);
    g.robots = g.robots.filter(r => r.team === 1);              // every red structure has fallen
    const T = makeTransform(detectSymmetry(g.map, g.karbonite_map, g.fuel_map), 0, n);
    let P = null;                                               // a free tile deep in red's canonical bottom half
    for (let cy = n - 2; cy >= n / 2 && !P; cy--) for (let cx = 0; cx < n && !P; cx++) {
      const [x, y] = T.toE(cx, cy);
      if (g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x] && !g.robots.some(q => q.x === x && q.y === y)) P = [x, y];
    }
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 30, health: 10, karbonite: 0, fuel: 100, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil);
    const run = (on) => {
      CFG.PILGRIM_ORPHAN = on;
      const w = worldFor(g, pil), B = { api: w.api, w, round: 40, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
      return { B, w, a: pilgrimTurn(B) };
    };
    assert.strictEqual(run(0).a, null);                         // the incumbent stands still for good
    const { B, w, a } = run(1);
    assert.strictEqual(a.action, 'move'); assert.strictEqual(B.st.orphan, true); assert.strictEqual(B.st.target, null);
    // It heads for the nearest cluster site of our half (canonical top) by moves: one step nearer.
    const field = bfs(w, [[w.me.x, w.me.y]], B.offs);
    const top = B.clusters.filter(c => c.site[1] < n / 2 && field[c.site[1] * n + c.site[0]] >= 0)
      .sort((p, q) => field[p.site[1] * n + p.site[0]] - field[q.site[1] * n + q.site[0]])[0];
    const toSite = bfs(w, [top.site], offsets(2)), [cx, cy] = T.toC(pil.x + a.dx, pil.y + a.dy);   // steps capped at r2 2
    assert.ok(toSite[cy * n + cx] < toSite[w.me.y * n + w.me.x], JSON.stringify({ me: [w.me.x, w.me.y], to: [cx, cy], site: top.site, d: [toSite[w.me.y * n + w.me.x], toSite[cy * n + cx]] }));
    // A castle in sight ends it: the pilgrim learns it and heads home to deposit.
    g.robots.push(ours[0]);
    const w2 = worldFor(g, pil); B.w = w2; B.api = w2.api; B.nav = new Nav(w2, B.offs, B.rnd);
    const a2 = pilgrimTurn(B);
    assert.strictEqual(B.st.orphan, false); assert.strictEqual(B.st.structs.length, 1); assert.ok(a2 && a2.action === 'move');
  } finally { CFG.PILGRIM_ORPHAN = saved; }
});

test('pilgrim: PIONEER_FAST pioneers take full r2 4 steps on a short bank', () => {
  const saved = CFG.PIONEER_FAST;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    g.robots = g.robots.filter(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) if (!P && free(castle.x + dx, castle.y + dy)) P = [castle.x + dx, castle.y + dy];
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 20, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil);
    const step = on => {
      CFG.PIONEER_FAST = on;
      const w = worldFor(g, pil), B = { api: w.api, w, round: 30, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
      w.fuel = 500;                                             // below PILGRIM_FAST_FUEL
      pilgrimTurn(B);                                           // setup
      // the site most off the diagonal: full steps there cover 2 tiles a move (on a diagonal, (1,1) steps tie them)
      const skew = c => Math.abs(Math.abs(c.site[0] - w.me.x) - Math.abs(c.site[1] - w.me.y));
      const far = B.clusters.map((c, i) => [skew(c), i]).sort((a, b) => b[0] - a[0])[0][1];
      B.st.site = B.clusters[far].site.slice(); B.st.cluster = far; B.st.target = null;
      const a = pilgrimTurn(B);
      return { r2: a && a.action === 'move' ? a.dx * a.dx + a.dy * a.dy : 0, info: JSON.stringify({ a, me: [w.me.x, w.me.y], site: B.st.site, fuel: w.fuel }) };
    };
    const off = step(0), on = step(1);
    assert.ok(off.r2 > 0 && off.r2 <= 2, off.info);
    assert.strictEqual(on.r2, 4, on.info);
  } finally { CFG.PIONEER_FAST = saved; }
});

test('pilgrim: PIONEER_TIMEOUT_HOME gives up a far site at that many turns and mines at home; not beside it, not FRONT', () => {
  const saved = CFG.PIONEER_TIMEOUT_HOME;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) if (!P && free(castle.x + dx, castle.y + dy)) P = [castle.x + dx, castle.y + dy];
    const pil = { id: 4011, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 1, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil);
    const w0 = worldFor(g, pil);
    const B0 = { api: w0.api, w: w0, round: 90, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
    B0.offs = offsets(4); B0.nav = new Nav(w0, B0.offs, B0.rnd);
    econ(B0);
    const ci = B0.clusters.findIndex(c => king(c.site[0], c.site[1], w0.me.x, w0.me.y) > 1);
    assert.ok(ci >= 0, 'a far cluster site');
    const far = B0.clusters[ci].site.slice(), near = [w0.me.x + (w0.me.x + 1 < n ? 1 : -1), w0.me.y];
    const run = (T, turn, site, cluster) => {
      CFG.PIONEER_TIMEOUT_HOME = T; pil.turn = turn;
      const w = worldFor(g, pil), B = { ...B0, api: w.api, w, st: { site: site.slice(), cluster, structs: [{ x: castle.x, y: castle.y }] } };
      return { gave: siteTimeout(B), site: B.st.site, target: B.st.target };
    };
    const off = run(0, 100, far, ci), on = run(80, 80, far, ci), early = run(80, 79, far, ci);
    assert.deepStrictEqual([off.gave, off.site], [false, far]);
    assert.deepStrictEqual([on.gave, on.site], [true, null]); assert.ok(on.target && on.target.x !== undefined);
    assert.deepStrictEqual([early.gave, early.site], [false, far]);
    assert.deepStrictEqual([run(80, 100, near, ci).gave, run(80, 100, far, -1).gave], [false, false]);
  } finally { CFG.PIONEER_TIMEOUT_HOME = saved; }
});

test('pilgrim: TAKEN_SEEN gives up a site with an enemy church beside it in sight, reports it taken, and mines', () => {
  const saved = CFG.TAKEN_SEEN, savedER = CFG.EXPAND_ROUND;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) if (!P && free(castle.x + dx, castle.y + dy)) P = [castle.x + dx, castle.y + dy];
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 20, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil);
    const w0 = worldFor(g, pil);
    const B0 = { api: w0.api, w: w0, round: 30, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
    B0.offs = offsets(4); B0.nav = new Nav(w0, B0.offs, B0.rnd);
    econ(B0);
    // A cluster whose site has a free tile within EXPAND_SEEN king steps that the pilgrim sees: an enemy church there.
    // Canonical coordinates are the engine's for red on this map, so the church goes in at the same tile.
    let site = null, E = null, ci = -1;
    for (const [i, c] of B0.clusters.entries()) {
      if (E) break;
      for (let dy = -2; dy <= 2 && !E; dy++) for (let dx = -2; dx <= 2 && !E; dx++) {
        const [ex, ey] = [c.site[0] + dx, c.site[1] + dy], [gx, gy] = w0.T.toE(ex, ey);
        if (free(gx, gy) && d2(ex, ey, w0.me.x, w0.me.y) <= 100 && king(ex, ey, w0.me.x, w0.me.y) > 1) { E = [gx, gy]; site = c.site.slice(); ci = i; }
      }
    }
    assert.ok(E, 'a cluster site in sight');
    g.robots.push({ id: 4002, team: 1, unit: S.CHURCH, x: E[0], y: E[1], turn: 5, health: 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const run = (seen, er) => {
      CFG.TAKEN_SEEN = seen; CFG.EXPAND_ROUND = er;
      const w = worldFor(g, pil); let talked = 0; w.api.castleTalk = v => { talked = v; };
      const B = { ...B0, api: w.api, w, st: { site: site.slice(), cluster: ci, structs: [] } };
      w.update();
      return { gave: siteTaken(B), talked, site: B.st.site, target: B.st.target };
    };
    const off = run(0, 0), on = run(1, 0), late = run(0, 50), early = run(0, 31);
    assert.deepStrictEqual([off.gave, off.talked, off.site], [false, 0, site]);
    assert.deepStrictEqual([on.gave, on.talked, on.site], [true, CT.TAKEN + ci, null]); assert.ok(on.target);
    assert.strictEqual(late.gave, false);                     // EXPAND_ROUND alone: only from its round (B.round 30)
    assert.deepStrictEqual([early.gave, early.talked], [false, 0]);
    const er = run(0, 20); assert.deepStrictEqual([er.gave, er.talked], [true, CT.TAKEN + ci]);
  } finally { CFG.TAKEN_SEEN = saved; CFG.EXPAND_ROUND = savedER; }
});

test('pilgrim: PIONEER_GIVEUP drops a site it gets no nearer to under enemy eyes, reports it taken, and mines', () => {
  const saved = CFG.PIONEER_GIVEUP, savedAny = CFG.PIONEER_STALL_ANY;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null, E = null;                                   // a pilgrim next to the castle, an enemy prophet in its sight
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) if (!P && free(castle.x + dx, castle.y + dy)) P = [castle.x + dx, castle.y + dy];
    for (let r = 6; r <= 9 && !E; r++) for (let dy = -r; dy <= r && !E; dy++) for (let dx = -r; dx <= r && !E; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && d2(0, 0, dx, dy) <= 100 && free(P[0] + dx, P[1] + dy)) E = [P[0] + dx, P[1] + dy];
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 20, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    const pro = { id: 4002, team: 1, unit: S.PROPHET, x: E[0], y: E[1], turn: 5, health: 20, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(pil, pro);
    const w = worldFor(g, pil); let talked = 0; w.api.castleTalk = v => { talked = v; };
    const B = { api: w.api, w, round: 30, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
    B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
    econ(B);
    const far = B.clusters.map((c, i) => [king(w.me.x, w.me.y, c.site[0], c.site[1]), i]).sort((a, b) => b[0] - a[0])[0][1];
    B.st.site = B.clusters[far].site.slice(); B.st.cluster = far;
    CFG.PIONEER_GIVEUP = 3;
    const calls = [1, 2, 3, 4].map(() => siteStalled(B));    // the first sets its best; three more turns no nearer
    assert.deepStrictEqual(calls, [false, false, false, true]);
    assert.strictEqual(B.st.site, null); assert.strictEqual(talked, CT.TAKEN + far); assert.ok(B.st.target);
    // Without an enemy attacker in sight the count does not run.
    g.robots = g.robots.filter(r => r.team === 0); talked = 0;   // (an enemy castle in sight counts too)
    const w2 = worldFor(g, pil), B2 = { ...B, w: w2, api: w2.api, st: { site: B.clusters[far].site.slice(), cluster: far } };
    assert.deepStrictEqual([1, 2, 3, 4, 5].map(() => siteStalled(B2)), [false, false, false, false, false]);
    assert.ok(B2.st.site);
    // CFG.PIONEER_STALL_ANY counts those turns too, and alone gives the site up just the same.
    CFG.PIONEER_GIVEUP = 0; CFG.PIONEER_STALL_ANY = 4;
    w2.api.castleTalk = v => { talked = v; };
    const B3 = { ...B2, st: { site: B.clusters[far].site.slice(), cluster: far } };
    assert.deepStrictEqual([1, 2, 3, 4, 5].map(() => siteStalled(B3)), [false, false, false, false, true]);
    assert.strictEqual(B3.st.site, null); assert.strictEqual(talked, CT.TAKEN + far); assert.ok(B3.st.target);
    // CFG.PIONEER_HOME: the depot it then takes is one by a structure of ours, not the one nearest itself (a
    // structure known at the far site, the castle beside us left out of the list).
    const [hx, hy] = B.clusters[far].site, kh = d => king(d.x, d.y, hx, hy);
    const best = Math.min(...B.deps.filter(d => w2.occ(d.x, d.y) <= 0).map(kh));
    for (const ph of [0, 1]) {
      CFG.PIONEER_HOME = ph;
      const B4 = { ...B2, st: { site: B.clusters[far].site.slice(), cluster: far, structs: [{ x: hx, y: hy }] } };
      assert.deepStrictEqual([1, 2, 3, 4, 5].map(() => siteStalled(B4)), [false, false, false, false, true]);
      if (ph) assert.ok(kh(B4.st.target) <= best + 1); else assert.ok(kh(B4.st.target) > best + 3);
    }
  } finally { CFG.PIONEER_GIVEUP = saved; CFG.PIONEER_STALL_ANY = savedAny; CFG.PIONEER_HOME = 0; }
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

test('military: MELEE_BACK keeps crusaders and preachers off lattice tiles ahead of home, prophets unchanged', () => {
  // Open 24x24 board, home (10,6); the enemy is toward +y. Default: every type anchors 2 rows ahead.
  const saved = { ...CFG };
  try {
    CFG.LATTICE_STICKY = 0;
    const w = { n: 24, me: null, friends: [], passable: () => true, isDepot: () => false, occ: () => 0 };
    const pick = (unit, back) => {
      CFG.MELEE_BACK = back; w.me = { id: 5, unit, x: 10, y: 8, turn: 1 };
      return holdTarget({ w, st: { home: { x: 10, y: 6 } } });
    };
    for (const u of [S.CRUSADER, S.PREACHER, S.PROPHET]) assert.ok(pick(u, 0)[1] > 6, 'default ahead: ' + u);
    for (const u of [S.CRUSADER, S.PREACHER]) { const t = pick(u, 2); assert.ok(t[1] <= 6, 'melee behind: ' + t); }
    assert.deepStrictEqual(pick(S.PROPHET, 2), pick(S.PROPHET, 0));
    // A crusader standing on a tile ahead of home moves; one on a tile behind holds.
    CFG.MELEE_BACK = 2;
    const turnAt = (x, y) => {
      const ww = { ...w, me: { id: 5, unit: S.CRUSADER, x, y, turn: 1 } };
      return holdTarget({ w: ww, st: { home: { x: 10, y: 6 } } });
    };
    assert.ok(turnAt(10, 10)[1] <= 6);
  } finally { Object.assign(CFG, saved); }
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

test('combat: CHURCH_FIRST: an enemy church near home outranks units for every shooter; off, nothing changes', () => {
  const home = { x: 10, y: 5 };
  assert.strictEqual(churchFirst(home, 0), null);
  const cf = churchFirst(home, 100);
  assert.ok(cf({ unit: S.CHURCH, x: 16, y: 12 }));            // r2 85
  assert.ok(!cf({ unit: S.CHURCH, x: 18, y: 12 }));           // r2 113
  assert.ok(!cf({ unit: S.PROPHET, x: 12, y: 6 }));
  const prio = e => cf(e) ? 7 : PRIORITY[e.unit];
  const enemies = [{ unit: S.PROPHET, x: 12, y: 10, team: 1 }, { unit: S.CHURCH, x: 14, y: 11, team: 1 }];
  assert.strictEqual(pickTarget(S.PROPHET, 10, 6, enemies, 32).unit, S.PROPHET);
  assert.strictEqual(pickTarget(S.PROPHET, 10, 6, enemies, 32, null, prio).unit, S.CHURCH);
  assert.strictEqual(pickTarget(S.CASTLE, 10, 5, enemies, 32, null, prio).unit, S.CHURCH);
  const far = [{ unit: S.PROPHET, x: 12, y: 10, team: 1 }, { unit: S.CHURCH, x: 18, y: 12, team: 1 }];   // r2 113 to home: outside
  assert.strictEqual(pickTarget(S.PROPHET, 13, 6, far, 32, null, prio).unit, S.PROPHET);
  // A preacher at (10, 8): a crusader 3 below, a church 3 to the right; the church counts CHURCH_FIRST_V instead of 1.
  const robots = [{ team: 0, unit: S.PREACHER, x: 10, y: 8, seen: 1 }, { team: 1, unit: S.CRUSADER, x: 10, y: 11, seen: 1 },
    { team: 1, unit: S.CHURCH, x: 13, y: 8, seen: 1 }];
  const hits = (t, r) => Math.abs(10 + t.dx - r.x) <= 1 && Math.abs(8 + t.dy - r.y) <= 1;
  const t0 = preacherTarget(10, 8, robots, 0, () => true, 4, 2.5);
  assert.ok(hits(t0, robots[1]) && !hits(t0, robots[2]));
  assert.deepStrictEqual(preacherTarget(10, 8, robots, 0, () => true, 4, 2.5, null), t0);   // off: military passes null
  const t1 = preacherTarget(10, 8, robots, 0, () => true, 4, 2.5, r => cf(r) ? 3 : undefined);
  assert.ok(hits(t1, robots[2]) && !hits(t1, robots[1]));
});

test('combat: FOCUS prefers the target more of our attackers can hit; priority still comes first', () => {
  const A = { id: 21, unit: 4, x: 0, y: 5, team: 1 }, Bp = { id: 22, unit: 4, x: 0, y: 7, team: 1 }, C = { id: 23, unit: 3, x: 5, y: 0, team: 1 };
  const friends = [{ unit: 4, x: 0, y: 14 }, { unit: 3, x: 1, y: 9 }, { unit: 2, x: 0, y: 8 }];   // 2 attackers reach B, none A (the pilgrim cannot shoot)
  assert.strictEqual(pickTarget(4, 0, 0, [A, Bp], 64).id, 21);            // nearest without FOCUS
  assert.strictEqual(pickTarget(4, 0, 0, [A, Bp], 64, friends).id, 22);
  assert.strictEqual(pickTarget(4, 0, 0, [A, Bp], 64, []).id, 21);        // nobody else: nearest
  const many = [{ unit: 4, x: 5, y: 8 }, { unit: 4, x: 9, y: 0 }, { unit: 3, x: 6, y: 1 }];
  assert.strictEqual(pickTarget(4, 0, 0, [C, Bp], 64, many).id, 22);      // a prophet before a crusader however covered
  assert.strictEqual(cover(Bp, friends), 2);
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

test('castle: PIONEER_LOST_DOUBLE doubles the rest before re-sending a pioneer where one died', () => {
  const saved = { ...CFG };
  try {
    const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
    const castle = g.robots.find(r => r.team === 0);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
    const st = B.st, c = st.plan[0].cluster;
    st.pioneers = [];
    const next = t => { B.w.me.turn = t; return (nextPioneer(B) || {}).cluster; };
    st.lost.set(c, 10); st.lostN.set(c, 2);
    assert.strictEqual(lostRest(st, c), 100);                      // default: 100 rounds whatever the losses
    assert.notStrictEqual(next(109), c);
    assert.strictEqual(next(110), c);
    CFG.PIONEER_LOST_DOUBLE = 1;
    assert.strictEqual(lostRest(st, c), 200);
    assert.notStrictEqual(next(209), c);
    assert.strictEqual(next(210), c);
    st.lostN.set(c, 1);
    assert.strictEqual(lostRest(st, c), 100);
    st.lostN.set(c, 40);
    assert.strictEqual(lostRest(st, c), 1600);                     // capped at 16x
  } finally { Object.assign(CFG, saved); }
});

test('castle: PIONEER_TIMEOUT_REST rests the cluster of a pioneer 80 turns out without its church', () => {
  const saved = { ...CFG };
  try {
    const run = on => {
      CFG.PIONEER_TIMEOUT_REST = on;
      const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
      const castle = g.robots.find(r => r.team === 0);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      const at = t => { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; w.karbonite = 0; castleTurn(B); };
      for (const t of [1, 2, 3]) at(t);
      const st = B.st, c = st.plan[0].cluster, [sx, sy] = B.clusters[c].site;
      // The pioneer is alive (castles see every robot's id) and still out at round 91.
      g.robots.push({ id: 4400, team: 0, unit: S.PILGRIM, x: sx, y: sy, turn: 81, health: 10, karbonite: 0, fuel: 0,
        signal: 0, signal_radius: 0, castle_talk: 0 });
      st.pioneers = [{ id: 4400, cluster: c, since: 10, d: 5 }];
      at(90);
      const kept = st.pioneers.length;
      at(91);
      return { kept, st, c, next: (nextPioneer(B) || {}).cluster };
    };
    const off = run(0), on = run(1), two = run(2);
    assert.strictEqual(on.st.lostN.has(on.c), false);                    // 1: rested, not counted as lost
    assert.strictEqual(two.st.lost.get(two.c), 91);
    assert.strictEqual(two.st.lostN.get(two.c), 1);                      // 2: counted, so PIONEER_LOST_DOUBLE doubles it
    assert.notStrictEqual(two.next, two.c);
    assert.deepStrictEqual([off.kept, on.kept], [1, 1]);                 // within 80 turns: still in flight
    assert.strictEqual(off.st.pioneers.length, 0);
    assert.strictEqual(off.st.lost.has(off.c), false);
    assert.strictEqual(off.next, off.c);                                // v8: the same site goes out again at once
    assert.strictEqual(on.st.lost.get(on.c), 91);
    assert.notStrictEqual(on.next, on.c);                               // rested PIONEER_LOST_REST rounds
  } finally { Object.assign(CFG, saved); }
});

test('castle: HOP_GAIN asks the church nearest the next site, adopts the pioneer by its CT.HOP talk, lapses unanswered asks', () => {
  const saved = { ...CFG };
  try {
    const run = (gain, answer) => {
      CFG.HOP_GAIN = gain;
      const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
      const castle = g.robots.find(r => r.team === 0);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      const sent = [];
      const world = t => { castle.turn = t; const w = worldFor(g, castle); w.api.signal = (v, r2) => sent.push([t, v, r2]); B.w = w; B.api = w.api; return w; };
      const at = t => { world(t).karbonite = 0; return castleTurn(B); };
      for (const t of [1, 2, 3]) at(t);
      const st = B.st, n = B.w.n;
      // A planned cluster and another cluster whose site is at least 4 king steps nearer it than the castle.
      let pick = null;
      for (const p of st.plan) {
        const f = bfs(B.w, [B.clusters[p.cluster].site], offsets(2));
        for (const c of B.clusters) {
          const v = f[c.site[1] * n + c.site[0]];
          if (c.i !== p.cluster && v >= 0 && v + 4 <= p.d && (!pick || v < pick.v)) pick = { p, j: c.i, v };
        }
        if (pick) break;
      }
      assert.ok(pick, 'no cluster pair for the test');
      const [hx, hy] = B.clusters[pick.j].site, t = pick.p.cluster;
      const mk = (id, unit, x, y, turn, talk) => ({ id, team: 0, unit, x, y, turn, health: 10, karbonite: 0, fuel: 0, signal: -1, signal_radius: 0, castle_talk: talk });
      const church = mk(4500, S.CHURCH, hx, hy, 1, CT.CHURCH + pick.j);
      g.robots.push(church);
      st.plan = [pick.p];
      at(4);                                    // the church's first-turn talk: castles learn its id
      church.turn = 2; church.castle_talk = CT.UNIT + S.CHURCH;
      world(5);
      const act = pioneer(B);
      const out = { act, sent: sent.slice(), pioneers: st.pioneers.map(p => ({ ...p })), t, j: pick.j, hx, hy, castle };
      if (answer) g.robots.push(mk(4600, S.PILGRIM, hx, hy + 1, 1, CT.HOP + t));
      for (const u of [6, 7, 8]) at(u);
      return { ...out, after: st.pioneers.map(p => ({ ...p })), fail: st.hopFail.get(pick.j) };
    };
    const off = run(0, false), on = run(4, true), lapse = run(4, false);
    assert.strictEqual(off.act.u, S.PILGRIM);                                         // v8: the castle builds it
    assert.ok(!off.sent.some(([t, v]) => t === 5 && (v >> 12) === SIG.HOP));
    assert.ok(on.act && on.act.hopped && !on.act.u);                                 // asked, and nothing built here
    const [ask] = on.sent.filter(([t, v]) => t === 5);
    assert.strictEqual(ask[1], encNum(SIG.HOP, (on.t << 6) | on.j));
    const dist = Math.sqrt(d2(on.castle.x, on.castle.y, on.hx, on.hy));
    assert.ok(ask[2] >= (dist + Math.SQRT2) ** 2 && !Object.values(FAR).includes(ask[2]), 'reaches beside the church: ' + ask[2]);
    assert.deepStrictEqual(on.pioneers.map(p => [p.id, p.cluster, p.hop]), [[0, on.t, on.j]]);
    assert.deepStrictEqual(on.after.map(p => [p.id, p.cluster]), [[4600, on.t]]);   // adopted by its CT.HOP talk
    assert.strictEqual(on.fail, undefined);
    assert.strictEqual(lapse.after.length, 0);                                       // nobody answered: dropped
    assert.strictEqual(lapse.fail, 8);                                               // that church rests HOP_REST turns
  } finally { Object.assign(CFG, saved); }
});

// A church at cluster `c`'s site of seed 1205 (one castle a side), the castle radioing SIG.HOP for target `t`.
function hopScene() {
  const g = new Game(1205, 100, 20, false, false), n = g.map.length;
  g.robots = g.robots.filter(r => r.team === 0);
  const castle = g.robots[0], B0 = { w: worldFor(g, castle) }; econ(B0);
  const plain = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
  const c = B0.clusters.find(c => king(c.site[0], c.site[1], castle.x, castle.y) > 8 &&
    offsets(2).filter(([dx, dy]) => plain(c.site[0] + dx, c.site[1] + dy)).length >= 2);
  const t = B0.clusters.find(q => q.i !== c.i && q.i < 63).i;
  const mk = (id, unit, x, y, turn, extra = {}) => ({ id, team: 0, unit, x, y, turn, health: 10, karbonite: 0, fuel: 0, signal: -1, signal_radius: 0, castle_talk: 0, ...extra });
  const ask = named => ({ ...castle, signal: encNum(SIG.HOP, (t << 6) | named), signal_radius: 7000 });
  const beside = offsets(2).map(([dx, dy]) => [c.site[0] + dx, c.site[1] + dy]).find(([x, y]) => plain(x, y));
  return { g, castle, c, t, mk, ask, beside, clusters: B0.clusters };
}

test('church: HOP_GAIN: a SIG.HOP naming this church builds the pioneer that round, with the round; others are ignored', () => {
  const saved = { ...CFG };
  try {
    CFG.HOP_GAIN = 4;
    const { g, c, t, mk, ask, clusters } = hopScene();
    const run = (named, birthRound = 46, turn = 5, enemy = false) => {
      const church = mk(4500, S.CHURCH, c.site[0], c.site[1], turn);
      const all = g.robots;
      g.robots = [ask(named), church].concat(enemy ? [{ ...mk(4700, S.CRUSADER, c.site[0] + 3, c.site[1], 9), team: 1 }] : []);
      const w = worldFor(g, church); g.robots = all;
      const sent = [], talk = []; w.api.signal = (v, r2) => sent.push([v, r2]); w.api.castleTalk = v => talk.push(v);
      const B = { api: w.api, w, birthRound, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 1000;
      return { act: churchTurn(B) || {}, sent, talk };
    };
    const yes = run(c.i);
    assert.strictEqual(yes.act.u, S.PILGRIM);
    assert.deepStrictEqual(yes.sent, [[encNum(SIG.ROUND, 50), 2]]);               // the newborn learns the round from us
    const noRound = run(c.i, 0);
    assert.deepStrictEqual(noRound.sent, [[encXY(SIG.CHURCH, clusters[t].site[0], clusters[t].site[1]), 2]]);   // or the site
    const other = run((c.i + 1) % 63);
    assert.ok(!other.sent.some(([v]) => (v >> 12) === SIG.ROUND || (v >> 12) === SIG.CHURCH));   // not ours to answer
    assert.notStrictEqual(run(c.i, 46, 5, true).act.u, S.PILGRIM);              // an attacker in sight comes first
    assert.ok(run(c.i, 46, 1).talk.includes(CT.CHURCH + c.i));                    // first turn: castles learn its id
    CFG.HOP_GAIN = 0;
    assert.ok(!run(c.i).sent.some(([v]) => v === encNum(SIG.ROUND, 50)));          // v8: no answer
  } finally { Object.assign(CFG, saved); }
});

test('pilgrim: HOP_GAIN: a newborn beside a church a castle\'s SIG.HOP names takes the target and talks CT.HOP', () => {
  const saved = { ...CFG };
  try {
    const { g, c, t, mk, ask, beside, clusters } = hopScene();
    const run = (gain, named) => {
      CFG.HOP_GAIN = gain;
      const church = mk(4500, S.CHURCH, c.site[0], c.site[1], 5, { signal: encNum(SIG.ROUND, 50), signal_radius: 2 });
      const pil = mk(4501, S.PILGRIM, beside[0], beside[1], 1);
      const all = g.robots;
      g.robots = [ask(named), church, pil];
      const w = worldFor(g, pil); g.robots = all;
      const talk = []; w.api.castleTalk = v => talk.push(v);
      const B = { api: w.api, w, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
      w.karbonite = 100; w.fuel = 1000;
      pilgrimTurn(B);
      return { st: B.st, talk, round: B.round };
    };
    const yes = run(4, c.i);
    assert.deepStrictEqual(yes.st.site, clusters[t].site);
    assert.strictEqual(yes.st.cluster, t);
    assert.ok(yes.talk.includes(CT.HOP + t));
    assert.strictEqual(yes.round, 50);
    const other = run(4, (c.i + 1) % 63);                                          // another church's pioneer
    assert.ok(!other.st.site && other.st.target && !other.talk.includes(CT.HOP + t));
    const off = run(0, c.i);                                                       // v8: a miner
    assert.ok(!off.st.site && off.st.target);
  } finally { Object.assign(CFG, saved); }
});

testPreV7('castle: PIONEERS_TEAM lets a lone castle keep more pioneers in flight; off, MAX_PIONEERS per castle', () => {
  const saved = { ...CFG };
  try {
    const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
    const castle = g.robots.find(r => r.team === 0);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
    const st = B.st;
    assert.ok(st.plan.length >= 4, 'plan too short for the test');
    st.pioneers = st.plan.slice(0, 2).map((p, i) => ({ id: 900 + i, cluster: p.cluster, since: 3, d: p.d }));
    assert.strictEqual(maxPioneers(st), 2);
    assert.strictEqual(nextPioneer(B), null);                       // default: two in flight is the cap
    CFG.PIONEERS_TEAM = 4;
    assert.strictEqual(maxPioneers(st), 4);
    assert.strictEqual(nextPioneer(B).cluster, st.plan[2].cluster);  // the next planned cluster goes out now
    st.castles.set(7001, { x: 0, y: 0 }); st.castles.set(7002, { x: 1, y: 1 });
    assert.strictEqual(maxPioneers(st), 2);                         // three castles: ceil(4 / 3) = 2, MAX_PIONEERS is the floor
    CFG.PIONEERS_TEAM = 6;
    assert.strictEqual(maxPioneers(st), 2);
    st.castles.delete(7002);
    assert.strictEqual(maxPioneers(st), 3);
  } finally { Object.assign(CFG, saved); }
});

test('castle: PIONEER_DEPART_K 0 sends a pioneer on the pilgrim and the reserve; the default waits for the church too', () => {
  const saved = { ...CFG };
  try {
    const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
    const castle = g.robots.find(r => r.team === 0);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
    const st = B.st, w = B.w;
    st.pioneers = []; st.pending = null; B.round = 3; w.fuel = 500;
    CFG.DEF_RESERVE_K = 30;
    w.karbonite = 89;
    assert.strictEqual(pioneer(B), null);                 // default: pilgrim 10 + church 50 + reserve 30
    CFG.PIONEER_DEPART_K = 0;
    w.karbonite = 39;
    assert.strictEqual(pioneer(B), null);                 // the reserve still holds
    w.karbonite = 40;
    const act = pioneer(B);
    assert.ok(act, 'a pioneer leaves on 40 K');
    assert.strictEqual(st.pioneers.length, 1);
    assert.strictEqual(st.pioneers[0].cluster, st.plan[0].cluster);
    assert.strictEqual(st.pending.kind, 'pioneer');
  } finally { Object.assign(CFG, saved); }
});

test('castle: PIONEER_CALL opens the escort when its pioneer talks BLOCKED, before it is overdue', () => {
  const saved = { ...CFG };
  try {
    CFG.ESCORT = 2;
    const g = new Game(1205, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
    const st = B.st, c = st.plan[0].cluster, site = B.clusters[c].site;
    let P = null;   // the pioneer, alive somewhere on the map
    for (let y = 0; y < n && !P; y++) for (let x = 0; x < n && !P; x++) if (g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y)) P = [x, y];
    const pio = { id: 4321, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 5, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: CT.BLOCKED };
    g.robots.push(pio);
    const turn = (call, t) => {
      CFG.PIONEER_CALL = call; st.escorts = []; st.pioneers = [{ id: pio.id, cluster: c, since: t - 2, d: 30 }];   // not overdue
      castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; w.karbonite = 0; castleTurn(B);
      return st.escorts.map(e => e.cluster);
    };
    assert.deepStrictEqual(turn(0, 10), []);                // default: the talk is not heard
    assert.deepStrictEqual(turn(100, 11), [c]);             // heard: the escort is owed at once
    pio.castle_talk = CT.UNIT + S.PILGRIM;
    assert.deepStrictEqual(turn(100, 12), []);              // a pioneer that sees nothing calls nothing
  } finally { Object.assign(CFG, saved); }
});

test('castle: PIONEER_EARLY sends a contested first pioneer at the plan ahead of the economy, once', () => {
  const saved = { ...CFG };
  try {
    // A map whose red castle plans a contested cluster first (m <= PLAN_CONTEST_FIRST); the enemy is out of sight.
    let g = null, castle = null, B = null;
    for (let seed = 1; seed < 80 && !B; seed++) {
      g = new Game(seed, 100, 20, false, false); castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
      if (!castle) continue;
      g.robots = g.robots.filter(r => r.team === 0);
      const b = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      CFG.PIONEER_EARLY = 0;
      for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); b.w = w; b.api = w.api; b.round = t; castleTurn(b); }
      if (b.st.plan && b.st.plan.length && b.st.plan[0].m <= CFG.PLAN_CONTEST_FIRST) B = b;
    }
    assert.ok(B, 'a map with a contested first cluster');
    const st = B.st, turn = (early, t, k) => {
      CFG.PIONEER_EARLY = early; st.pending = null; st.pioneers = []; st.earlySent = undefined;
      castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; B.round = t; w.karbonite = k; castleTurn(B);
      return st.pending && st.pending.kind;
    };
    assert.notStrictEqual(turn(0, 4, 60), 'pioneer');  // v7: the pioneer waits for DEPART_K + reserve (90 K)
    assert.strictEqual(turn(6, 4, 60), 'pioneer');     // early: the contested pioneer goes first
    assert.strictEqual(st.earlySent, true);
    assert.strictEqual(turn(6, 4, 10), 'pioneer');     // ...on the pilgrim's cost alone
    assert.notStrictEqual(turn(0, 4, 10), 'pioneer');  // (which the v7 rule never sends on)
    assert.notStrictEqual(turn(6, 7, 10), 'pioneer');  // past its turn, the v7 rule again
    assert.strictEqual(turn(6, 4, 10), 'pioneer');
    st.pending = null; st.pioneers = []; castle.turn = 5; B.w = worldFor(g, castle); B.api = B.w.api; B.w.karbonite = 10;
    castleTurn(B);                                      // st.earlySent stays: one early pioneer per castle
    assert.notStrictEqual(st.pending && st.pending.kind, 'pioneer');
  } finally { Object.assign(CFG, saved); }
});

test('castle: PIONEER_OPEN sends the early pioneer to the first planned cluster we reach that far ahead, or none', () => {
  const saved = { ...CFG };
  try {
    // seed 1706 plans c2 (m 2, contested) then c1 (m 14); seed 2518 plans only c1 (m 0) (tools/plan.mjs).
    const run = (seed, open) => {
      const g = new Game(seed, 100, 20, false, false), castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
      g.robots = g.robots.filter(r => r.team === 0);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      Object.assign(CFG, saved, { PIONEER_EARLY: 6, PIONEER_OPEN: open });
      for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; B.round = t; castleTurn(B); }
      B.st.pending = null; B.st.pioneers = []; B.st.earlySent = undefined;
      castle.turn = 4; const w = worldFor(g, castle); B.w = w; B.api = w.api; B.round = 4; w.karbonite = 10; castleTurn(B);
      const p = B.st.pending && B.st.pending.kind === 'pioneer' ? B.st.plan.find(q => q.cluster === B.st.pending.ref) : null;
      return { p, plan: B.st.plan };
    };
    const contested = run(1706, 0), open = run(1706, 7);
    assert.ok(contested.p && contested.p.m <= CFG.PLAN_CONTEST_FIRST, 'PIONEER_EARLY alone: the contested cluster');
    assert.ok(open.p && open.p.m >= 7, 'PIONEER_OPEN 7: a cluster 7+ steps ahead');
    assert.strictEqual(open.p.cluster, open.plan.find(q => q.m >= 7).cluster);   // the first such in plan order
    assert.strictEqual(run(2518, 7).p, null);                                     // no such cluster: none early
    assert.ok(run(2518, 0).p, 'PIONEER_EARLY alone sends the contested one');
    // PIONEER_RACE 2: with no such cluster in the team's plan, 2518's only site (m 0) goes early; 1706 has one: unchanged;
    // 2644 plans m 3 and m 6 (no race): none early.
    saved.PIONEER_RACE = 2;
    try {
      const race = run(2518, 7).p; assert.ok(race && race.m === 0, 'PIONEER_RACE: the race site');
      assert.strictEqual(run(1706, 7).p.cluster, open.p.cluster);
      assert.strictEqual(run(2644, 7).p, null);
    } finally { saved.PIONEER_RACE = 0; }
  } finally { Object.assign(CFG, saved); }
});

test('pilgrim: PIONEER_CALL a pioneer that sees a mobile enemy attacker by its site talks BLOCKED', () => {
  const saved = CFG.PIONEER_CALL;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    g.robots = g.robots.filter(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let P = null;   // a pilgrim in open ground away from the castles, its site 6 tiles off, an enemy beside the site
    for (let y = 2; y < n - 2 && !P; y++) for (let x = 2; x < n - 8 && !P; x++)
      if (free(x, y) && free(x + 6, y) && free(x + 7, y) && g.robots.every(q => d2(q.x, q.y, x, y) > 64)) P = [x, y];
    const pil = { id: 4001, team: 0, unit: S.PILGRIM, x: P[0], y: P[1], turn: 30, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    const foe = u => ({ id: 4990, team: 1, unit: u, x: P[0] + 7, y: P[1], turn: 5, health: 40, signal: 0, signal_radius: 0, castle_talk: 0 });
    const run = (call, u) => {
      CFG.PIONEER_CALL = call;
      const all = g.robots; g.robots = all.concat([pil], u === undefined ? [] : [foe(u)]);
      const w = worldFor(g, pil); g.robots = all;
      let talked = 0; w.api.castleTalk = v => { talked = v; };
      const B = { api: w.api, w, round: 40, birthRound: 11, st: {}, deps: null, clusters: null, rnd: rng(2) };
      B.offs = offsets(4); B.nav = new Nav(w, B.offs, B.rnd);
      B.st.site = [P[0] + 6, P[1]]; B.st.cluster = 0;
      pilgrimTurn(B);
      return talked;
    };
    assert.notStrictEqual(run(0, S.CRUSADER), CT.BLOCKED);   // default: silent
    assert.strictEqual(run(100, S.CRUSADER), CT.BLOCKED);    // a crusader beside the site
    assert.strictEqual(run(100, S.PROPHET), CT.BLOCKED);
    assert.notStrictEqual(run(100, S.PILGRIM), CT.BLOCKED);  // no attacker
    assert.notStrictEqual(run(100), CT.BLOCKED);             // nothing in sight
    assert.notStrictEqual(run(100, S.CASTLE), CT.BLOCKED);   // a castle does not walk away: no call
  } finally { CFG.PIONEER_CALL = saved; }
});

testPreV8('castle: ESCORT owes escorts to an overdue or lost pioneer and builds them radioing SIG.GUARD at the site', () => {
  const saved = { ...CFG };
  try {
    CFG.ESCORT = 2;
    const g = new Game(1205, 100, 20, false, false);   // one castle a side, 12 clusters
    const castle = g.robots.find(r => r.team === 0);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
    const st = B.st, c = st.plan[0].cluster, site = B.clusters[c].site;
    // Overdue: alive (its id is in the id list) and ESCORT_SLACK turns past its distance.
    const turn = t => { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; w.karbonite = 0; castleTurn(B); };
    st.pioneers = [{ id: castle.id, cluster: c, since: 3, d: 5 }];
    turn(3 + 5 + CFG.ESCORT_SLACK);
    assert.strictEqual(st.escorts.length, 0);
    turn(3 + 5 + CFG.ESCORT_SLACK + 1);
    assert.deepStrictEqual(st.escorts, [{ cluster: c, x: site[0], y: site[1], left: 2 }]);
    openEscort(B, c);                                    // owed once per cluster
    assert.strictEqual(st.escorts.length, 1);
    // Build: a prophet that hears the site; nothing on a turn whose radio is taken or when the bank is short.
    const sent = [], w = worldFor(g, castle); B.w = w; B.api = w.api; w.api.signal = (v, r2) => sent.push([v, r2]);
    st.pioneers = [];
    w.karbonite = 20; assert.strictEqual(escort(B), null);
    w.karbonite = 100; w.sentR2 = 2; assert.strictEqual(escort(B), null);
    w.sentR2 = 0;
    const a = escort(B);
    assert.strictEqual(a.action, 'build'); assert.strictEqual(a.u, S.PROPHET);
    assert.deepStrictEqual(sent, [[encXY(SIG.GUARD, site[0], site[1]), 2]]);
    assert.strictEqual(st.escorts[0].left, 1);
    // Lost on the way: a pioneer whose id is gone owes escorts to its cluster too; a churched cluster owes none.
    const c2 = st.plan[1].cluster;
    st.pioneers = [{ id: 987654, cluster: c2, since: 3, d: 5 }];
    turn(30);
    assert.ok(st.escorts.some(e => e.cluster === c2));
    st.churched.add(c2); w.sentR2 = 0; w.karbonite = 100;
    st.escorts = st.escorts.filter(e => e.cluster === c2); escort(B);
    assert.strictEqual(st.escorts.length, 0);
  } finally { Object.assign(CFG, saved); }
});

testPreV8('castle: ESCORT_FIRST owes escorts to the first contested cluster at planning and builds them before its pioneer', () => {
  const saved = { ...CFG };
  try {
    CFG.ESCORT_FIRST = 1;
    const g = new Game(1915, 100, 20, false, false);   // one castle a side; the centre cluster straddles the axis
    const castle = g.robots.find(r => r.team === 0);
    const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
    const st = B.st, hot = st.plan.find(p => p.m <= CFG.PLAN_CONTEST_FIRST);
    assert.ok(hot, 'seed 1915 has a contested cluster');
    const site = B.clusters[hot.cluster].site;
    assert.deepStrictEqual(st.escorts, [{ cluster: hot.cluster, x: site[0], y: site[1], left: 1 }]);
    // Turn 4, no depot due and no enemy in view (the helper shows every robot): the escort (a prophet radioing its
    // site) comes before the pioneer.
    st.served = []; st.pending = null; st.pioneers = [];
    g.robots = g.robots.filter(r => r.team === 0);
    const sent = []; castle.turn = 4;
    const w = worldFor(g, castle); B.w = w; B.api = w.api; w.api.signal = (v, r2) => sent.push([v, r2]);
    w.karbonite = 100; w.fuel = 500;
    const a = castleTurn(B);
    assert.strictEqual(a.action, 'build'); assert.strictEqual(a.u, S.PROPHET);
    assert.deepStrictEqual(sent, [[encXY(SIG.GUARD, site[0], site[1]), 2]]);
    assert.strictEqual(st.pioneers.length, 0);
    assert.strictEqual(st.escorts.length, 1); assert.strictEqual(st.escorts[0].left, 0);
    // Off (v7's value, pinned): no escort owed at planning.
    CFG.ESCORT_FIRST = 0;
    const g2 = new Game(1915, 100, 20, false, false), castle2 = g2.robots.find(r => r.team === 0);
    const B2 = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle2.turn = t; const w2 = worldFor(g2, castle2); B2.w = w2; B2.api = w2.api; castleTurn(B2); }
    assert.deepStrictEqual(B2.st.escorts, []);
    // ESCORT_MIRROR (v8): the same escort holds the mirror image of the site.
    Object.assign(CFG, { ESCORT_FIRST: 1, ESCORT_MIRROR: 1 });
    const g3 = new Game(1915, 100, 20, false, false), castle3 = g3.robots.find(r => r.team === 0);
    const B3 = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
    for (const t of [1, 2, 3]) { castle3.turn = t; const w3 = worldFor(g3, castle3); B3.w = w3; B3.api = w3.api; castleTurn(B3); }
    const [mx, my] = B3.w.mirror(site[0], site[1]);
    assert.ok(mx !== site[0] || my !== site[1]);
    assert.deepStrictEqual(B3.st.escorts, [{ cluster: hot.cluster, x: mx, y: my, left: 1 }]);
  } finally { Object.assign(CFG, saved); }
});

test('castle: ESCORT_EACH opens an escort, once, for a pioneer sent to a later contested cluster; off: none', () => {
  const saved = { ...CFG };
  try {
    const run = each => {
      CFG.ESCORT_EACH = each;
      const g = new Game(2013, 100, 20, false, false);   // one castle a side; three contested clusters planned
      const castle = g.robots.find(r => r.team === 0);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 };
      for (const t of [1, 2, 3]) { castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; castleTurn(B); }
      const st = B.st, w = B.w, hot = st.plan.filter(p => p.m <= CFG.PLAN_CONTEST_FIRST);
      assert.ok(hot.length >= 2, 'seed 2013 plans 2+ contested clusters');
      assert.deepStrictEqual(st.escorts.map(e => e.cluster), [hot[0].cluster]);   // ESCORT_FIRST's, at planning
      assert.ok(st.escorted.has(hot[0].cluster));
      // The first pioneer goes to ESCORT_FIRST's cluster: nothing more is opened.
      st.escorts = []; st.pioneers = []; st.pending = null; B.round = 3; w.fuel = 500; w.karbonite = 300;
      assert.ok(pioneer(B)); assert.strictEqual(st.pioneers[0].cluster, hot[0].cluster);
      assert.deepStrictEqual(st.escorts, []);
      // The next contested cluster's pioneer opens ESCORT_EACH units at its mirror site (ESCORT_MIRROR, v8).
      st.churched.add(hot[0].cluster); st.pioneers = []; st.pending = null; w.karbonite = 300;
      assert.ok(pioneer(B)); assert.strictEqual(st.pioneers[0].cluster, hot[1].cluster);
      return { B, hot };
    };
    const { B, hot } = run(2), st = B.st, site = B.clusters[hot[1].cluster].site, [mx, my] = B.w.mirror(site[0], site[1]);
    assert.deepStrictEqual(st.escorts, [{ cluster: hot[1].cluster, x: mx, y: my, left: 2 }]);
    // Once per cluster: a second pioneer there (the first died) opens nothing.
    st.escorts = []; st.pioneers = []; st.pending = null; B.w.karbonite = 300;
    assert.ok(pioneer(B)); assert.strictEqual(st.pioneers[0].cluster, hot[1].cluster);
    assert.deepStrictEqual(st.escorts, []);
    // Off (v8): the later pioneer goes alone.
    assert.deepStrictEqual(run(0).B.st.escorts, []);
  } finally { Object.assign(CFG, saved); }
});

test('military: ESCORT_HOLD_R: an escort holds within that many king steps of its site, other units within LATTICE_R', () => {
  const saved = { ...CFG };
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const cru = { id: 4002, team: 0, unit: S.CRUSADER, x: 0, y: 0, turn: 3, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(cru);
    const world = () => { const w = worldFor(g, cru); w.fuel = 1000; return w; };
    let site = null;   // a passable, even (canonical frame), non-depot tile with no enemy near, 6 rows from the site
    for (let k = 1; k < n * n && !site; k++) {
      const x = k % n, y = Math.floor(k / n);
      if (!free(x, y) || d2(x, y, castle.x, castle.y) > 400) continue;
      cru.x = x; cru.y = y;
      const w = world(), m = w.me;
      if (((m.x + m.y) & 1) || w.isDepot(m.x, m.y) || w.enemies.some(e => d2(e.x, e.y, m.x, m.y) <= 196)) continue;
      const sy = m.y + 6 < n ? m.y + 6 : m.y - 6;
      if (sy >= 0 && sy < n) site = { x: m.x, y: sy };
    }
    assert.ok(site);
    const turns = (holdR, escort, fast = 0) => {   // the first action in three turns (a cruise step may wait a turn or two first)
      CFG.ESCORT_HOLD_R = holdR; CFG.ESCORT_FAST_R2 = fast;
      const w = world(), B = { api: w.api, w, round: 20, birthRound: 18, rnd: rng(2), deps: null, clusters: null,
        st: { ready: true, home: site, guardAt: escort ? site : undefined, target: null, tIdx: -1, known: [], dead: new Set(),
          reports: [], waitUntil: 0, guard: false } };
      B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
      for (let i = 0; i < 3; i++) { const a = militaryTurn(B); if (a) return a; }
      return null;
    };
    assert.strictEqual(turns(0, true), null);                     // v8: 6 king steps out, inside LATTICE_R 12: holds
    assert.strictEqual((turns(3, true) || {}).action, 'move');   // an escort 6 steps out heads for its site
    assert.strictEqual(turns(3, false), null);                    // a unit that heard no SIG.GUARD holds as before
    // ESCORT_FAST_R2: the escort reaches its site in fewer turns (steps up to r2 9, not CRUISE_R2 2) and then holds.
    const walk = fast => {   // turns until it holds, moving the crusader on the board
      const x0 = cru.x, y0 = cru.y, t0 = cru.turn;
      CFG.ESCORT_HOLD_R = 3; CFG.ESCORT_FAST_R2 = fast;
      const st = { ready: true, home: site, guardAt: site, target: null, tIdx: -1, known: [], dead: new Set(), reports: [], waitUntil: 0, guard: false };
      let k = 0, maxR2 = 0;
      for (; k < 20; k++, cru.turn++) {
        const w = world(), B = { api: w.api, w, round: 20 + k, birthRound: 18, rnd: rng(2), deps: null, clusters: null, st };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        const a = militaryTurn(B);
        if (!a) { if (st.held) break; continue; }
        assert.strictEqual(a.action, 'move');
        maxR2 = Math.max(maxR2, a.dx * a.dx + a.dy * a.dy); cru.x += a.dx; cru.y += a.dy;
      }
      cru.x = x0; cru.y = y0; cru.turn = t0;
      return { k, maxR2 };
    };
    const slow = walk(0), fast = walk(9);
    assert.ok(slow.maxR2 <= 2 && fast.maxR2 > 2 && fast.maxR2 <= 9 && fast.k < slow.k, JSON.stringify([slow, fast]));
  } finally { Object.assign(CFG, saved); }
});

test('military: ESCORT_BACK: an escort hit with no enemy melee near goes back to its base lattice fast; otherwise it keeps its site', () => {
  const saved = { ...CFG };
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const cru = { id: 4003, team: 0, unit: S.CRUSADER, x: 0, y: 0, turn: 30, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    g.robots.push(cru);
    const world = () => { const w = worldFor(g, cru); w.fuel = 1000; return w; };
    let site = null, base = null;   // the escort stands on its site: a lattice tile 7-10 king steps from the castle, no enemy near
    for (let k = 1; k < n * n && !site; k++) {
      const x = k % n, y = Math.floor(k / n);
      if (!free(x, y)) continue;
      cru.x = x; cru.y = y;
      const w = world(), m = w.me, c = w.friends.find(r => r.unit === S.CASTLE);
      if (!c || ((m.x + m.y) & 1) || w.isDepot(m.x, m.y) || w.enemies.some(e => d2(e.x, e.y, m.x, m.y) <= 196)) continue;
      const k2 = king(m.x, m.y, c.x, c.y);
      if (k2 >= 7 && k2 <= 10) { site = { x: m.x, y: m.y }; base = { x: c.x, y: c.y }; }
    }
    assert.ok(site);
    const fresh = () => ({ ready: true, home: site, home0: site, base, guardAt: site, held: true, hp: 40, target: null, tIdx: -1,
      known: [], dead: new Set(), reports: [], waitUntil: 0, guard: false });
    const turn = (st, round = 40) => {
      const w = world(), B = { api: w.api, w, round, birthRound: 10, rnd: rng(2), deps: null, clusters: null, st };
      B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
      return militaryTurn(B);
    };
    CFG.ESCORT_HOLD_R = 2; CFG.ESCORT_FAST_R2 = 9; CFG.ESCORT_BACK = 1;
    let st = fresh(); st.held = false;   // first it takes its post, within 2 king steps of the site (not on it: LATTICE_MIN_R2)
    for (let k = 0; k < 6 && !st.held; k++, cru.turn++) { const a = turn(st); if (a) { cru.x += a.dx; cru.y += a.dy; } }
    assert.ok(st.held);
    const [x0, y0] = [cru.x, cru.y];
    // Unhit, it holds its post; ESCORT_BACK changes nothing.
    st = fresh();
    assert.strictEqual(turn(st), null); assert.deepStrictEqual(st.guardAt, site); assert.strictEqual(st.hp, 40);
    // Off (h157): hit, it still holds its site.
    CFG.ESCORT_BACK = 0; st = fresh(); cru.health = 30;
    assert.strictEqual(turn(st), null); assert.deepStrictEqual(st.guardAt, site);
    // On: hit with no enemy crusader or preacher within r2 25, it gives up the site and walks home at steps up to r2 9.
    CFG.ESCORT_BACK = 1; st = fresh();
    let k = 0, maxR2 = 0;
    for (; k < 12; k++, cru.turn++) {
      const a = turn(st, 40 + k);
      if (k === 0) { assert.strictEqual(st.guardAt, null); assert.deepStrictEqual(st.home, base); assert.ok(st.back); }
      if (!a) { if (st.held) break; continue; }
      assert.strictEqual(a.action, 'move');
      maxR2 = Math.max(maxR2, a.dx * a.dx + a.dy * a.dy); cru.x += a.dx; cru.y += a.dy;
    }
    const w = world();
    assert.ok(st.held && maxR2 > 2 && maxR2 <= 9, JSON.stringify({ k, maxR2 }));
    assert.ok(king(w.me.x, w.me.y, base.x, base.y) < 7, JSON.stringify([w.me, base]));
    // On, hit beside an enemy crusader: a melee hit, so it keeps its site (and strikes back).
    cru.x = x0; cru.y = y0; cru.health = 30;
    const spots = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].map(([dx, dy]) => [x0 + dx, y0 + dy]).filter(([x, y]) => free(x, y));
    g.robots.push({ id: 4004, team: 1, unit: S.CRUSADER, x: spots[0][0], y: spots[0][1], turn: 5, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    st = fresh();
    const a = turn(st);
    assert.deepStrictEqual(st.guardAt, site); assert.strictEqual(a.action, 'attack');
    g.robots.pop();
    // ESCORT_BACK 2, hit by the one prophet in sight (r2 36-49 away): it keeps its site and steps toward the prophet; at
    // 10 health, or with a second prophet in sight, it goes home as at 1.
    let pr = null;
    for (const [dx, dy] of [[6, 0], [-6, 0], [0, 6], [0, -6], [5, 4], [-5, 4], [5, -4], [-5, -4], [4, 5], [-4, 5], [4, -5], [-4, -5]])
      if (free(x0 + dx, y0 + dy) && !pr) pr = { id: 4005, team: 1, unit: S.PROPHET, x: x0 + dx, y: y0 + dy, turn: 5, health: 20,
        karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    assert.ok(pr);
    g.robots.push(pr);
    CFG.ESCORT_BACK = 2; st = fresh(); cru.health = 30;
    const c = turn(st), dc = d2(x0, y0, pr.x, pr.y);
    assert.deepStrictEqual(st.guardAt, site); assert.ok(st.duel && st.duel.id === 4005);
    assert.strictEqual(c.action, 'move'); assert.ok(d2(x0 + c.dx, y0 + c.dy, pr.x, pr.y) < dc, JSON.stringify([c, pr]));
    st = fresh(); cru.health = 10; turn(st);
    assert.strictEqual(st.guardAt, null); assert.ok(st.back);
    const pr2 = { ...pr, id: 4006, x: x0 - (pr.x - x0), y: y0 - (pr.y - y0) };
    if (free(pr2.x, pr2.y)) {
      g.robots.push(pr2); st = fresh(); cru.health = 30; turn(st);
      assert.strictEqual(st.guardAt, null); assert.ok(st.back && !st.duel);
      g.robots.pop();
    }
    // ESCORT_BACK 1, the same lone prophet: it goes home.
    CFG.ESCORT_BACK = 1; st = fresh(); cru.health = 30; turn(st);
    assert.strictEqual(st.guardAt, null);
  } finally { Object.assign(CFG, saved); }
});

test('castle: ESCORT_EARLY builds the owed escorts ahead of the economy pilgrims', () => {
  const saved = { ...CFG };
  try {
    const run = (early) => {   // the castle's builds on turns 1-5 of seed 1915 (one castle a side, a contested centre)
      CFG.ESCORT_EARLY = early;
      const g = new Game(1915, 100, 20, false, false), castle = g.robots.find(r => r.team === 0);
      g.robots = g.robots.filter(r => r.team === 0);
      const B = { st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 }, out = [];
      for (const t of [1, 2, 3, 4, 5]) {
        castle.turn = t; const w = worldFor(g, castle); B.w = w; B.api = w.api; w.karbonite = 100; w.fuel = 500;
        const a = castleTurn(B); out.push(a && a.action === 'build' ? a.u : null);
      }
      return out;
    };
    // Off (v8): pilgrims while depots are due; on: v8's two crusaders on turns 3 and 4, once the plan owes them.
    assert.deepStrictEqual(run(0), [S.PILGRIM, S.PILGRIM, S.PILGRIM, S.PILGRIM, S.PILGRIM]);
    assert.deepStrictEqual(run(1), [S.PILGRIM, S.PILGRIM, S.CRUSADER, S.CRUSADER, S.PILGRIM]);
  } finally { Object.assign(CFG, saved); }
});

testPreV8('military: ESCORT a unit born hearing SIG.GUARD holds the lattice around that site, not home', () => {
  const saved = { ...CFG };
  try {
    const g = new Game(1205, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let at = null; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) if (!at && free(castle.x + dx, castle.y + dy)) at = [castle.x + dx, castle.y + dy];
    const cw = worldFor(g, castle), site = [cw.me.x + 6, cw.me.y + 8];
    const born = on => {
      CFG.ESCORT = on;
      castle.signal = encXY(SIG.GUARD, site[0], site[1]); castle.signal_radius = 2;
      const p = { id: 4004, team: 0, unit: S.PROPHET, x: at[0], y: at[1], turn: 1, health: 20, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(p);
      try {
        const w = worldFor(g, p), B = { api: w.api, w, round: 0, birthRound: 0, st: {}, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.PROPHET].speed); B.nav = new Nav(w, B.offs, B.rnd);
        militaryTurn(B);
        return { home: [B.st.home.x, B.st.home.y], me: [w.me.x, w.me.y], round: B.birthRound };
      } finally { g.robots.pop(); castle.signal = 0; castle.signal_radius = 0; }
    };
    const off = born(0), on = born(2);
    assert.deepStrictEqual(on.home, site);
    assert.notDeepStrictEqual(off.home, site);
    assert.strictEqual(on.round, off.round);   // castle-born: the round still comes from the castle's turn
  } finally { Object.assign(CFG, saved); }
});

testPreV7('castle: PLAN_CONTEST_FIRST plans the clusters the enemy nearly reaches before nearer safe ones, mirror-identical', () => {
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

test('tools/plan.mjs: both teams get the same plan; seed 2924 orphans no own-side depot (v5), 3 with v4\'s SERVE_MOVES 4 + PLAN_CONTEST_FIRST 0', () => {
  const saved = [CFG.SERVE_MOVES, CFG.PLAN_CONTEST_FIRST];
  try {
    const a = planReport(2924, 0), b = planReport(2924, 1);
    assert.strictEqual(a.text.replace(/team \d/, ''), b.text.replace(/team \d/, ''));
    assert.strictEqual(a.side, 23); assert.strictEqual(a.orphans, 0);
    CFG.SERVE_MOVES = 4; CFG.PLAN_CONTEST_FIRST = 0;
    assert.strictEqual(planReport(2924, 0).orphans, 3);
  } finally { [CFG.SERVE_MOVES, CFG.PLAN_CONTEST_FIRST] = saved; }
});

test('castle: PLAN_VALUE orders each class by steps per depot (seed 1375: the 7-depot clusters at 42 steps come sooner)', () => {
  const saved = CFG.PLAN_VALUE;
  const order = (team) => planReport(1375, team).text.split('\n')[1].match(/c\d+@/g).join(' ');
  try {
    CFG.PLAN_VALUE = 0;
    assert.ok(order(1).startsWith('c8@ c9@ c5@ c4@ c13@ c7@ c10@ c3@'), order(1));
    CFG.PLAN_VALUE = 10;
    assert.ok(order(1).startsWith('c8@ c9@ c7@ c10@ c4@ c13@ c5@ c1@'), order(1));
    CFG.PLAN_VALUE = 20;
    assert.ok(order(1).startsWith('c7@ c10@ c8@ c9@'), order(1));
    assert.strictEqual(planReport(1375, 0).text.replace(/team \d/, ''), planReport(1375, 1).text.replace(/team \d/, ''));
  } finally { CFG.PLAN_VALUE = saved; }
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

test('pilgrim: PIONEER_DETOUR walks round a remembered attacker that holds the short gap (replica 416-1, seed 2591)', () => {
  const saved = { ...CFG };
  try {
    // 24x24, a wall 3 rows deep (y = 7..9, too deep to step over) with gaps at x = 8 (the short way) and x = 23 (the
    // long way); an enemy prophet holds (8,11), r2 64 over the short gap; the pioneer starts at (8,21) for (8,1).
    const n = 24, walls = [];
    for (let x = 0; x < n; x++) for (let y = 7; y <= 9; y++) if (x !== 8 && x !== 23) walls.push([x, y]);
    const run = detour => {
      Object.assign(CFG, { PILGRIM_SAFE_STEP: 1, PIONEER_DETOUR: detour });
      const w = stubWorld(n, walls, [[8, 11]]); w.me = { x: 8, y: 21, turn: 0 };
      const B = { w, st: {}, nav: new Nav(w, offsets(4), rng(3)) }, seen = [];
      for (let t = 1; t <= 60; t++) {
        w.me = { ...w.me, turn: t };
        w.enemies = d2(w.me.x, w.me.y, 8, 11) <= 100 ? [{ id: 77, unit: S.PROPHET, x: 8, y: 11 }] : [];
        const c = detour ? detourCost(B) : null; seen.push(c ? 1 : 0);
        const s = B.nav.step('site', [[8, 1]], 4, stepAvoid(w), undefined, null, c);
        if (s) w.me = { ...w.me, x: w.me.x + s[0], y: w.me.y + s[1] };
        assert.ok(d2(w.me.x, w.me.y, 8, 11) > 64, 'stepped into range at ' + [w.me.x, w.me.y]);
        if (w.me.y < 7) return { t, x: w.me.x, seen };
      }
      return null;
    };
    assert.strictEqual(run(0), null);   // the default waits at the edge of the prophet's range
    const r = run(50);
    assert.ok(r && r.x >= 21, 'crossed by the far gap: ' + JSON.stringify(r && [r.t, r.x]));
    assert.ok(r.seen.every(v => v === 1), 'remembered while out of sight');
    // Forgotten after PIONEER_DETOUR turns out of sight, or at once when its tile is in sight without it.
    const w = stubWorld(n, [], []), B = { w, st: {} };
    w.me = { x: 0, y: 0, turn: 1 }; w.enemies = [{ id: 5, unit: S.CRUSADER, x: 9, y: 9 }];
    assert.ok(detourCost(B)); w.enemies = [];
    w.me = { x: 0, y: 0, turn: 50 }; assert.ok(detourCost(B));
    w.me = { x: 0, y: 0, turn: 51 }; assert.strictEqual(detourCost(B), null);
    w.me = { x: 0, y: 0, turn: 60 }; w.enemies = [{ id: 5, unit: S.CRUSADER, x: 9, y: 9 }]; assert.ok(detourCost(B));
    w.enemies = []; w.me = { x: 5, y: 5, turn: 61 }; assert.strictEqual(detourCost(B), null);
    w.me = { x: 0, y: 0, turn: 62 }; w.enemies = [{ id: 6, unit: S.PILGRIM, x: 3, y: 3 }]; assert.strictEqual(detourCost(B), null);
  } finally { Object.assign(CFG, saved); }
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

test('military: SIEGE: units remember enemy prophets seen or radioed, forget them seen gone or stale, and hold no lattice tile in their reach', () => {
  const saved = CFG.SIEGE;
  try {
    CFG.SIEGE = 30;
    const w = { n: 24, me: { id: 5, team: 0, unit: S.PROPHET, x: 10, y: 6, turn: 2 }, passable: () => true, isDepot: () => false, occ: () => 0,
      friends: [], enemies: [{ id: 40, team: 1, unit: S.CRUSADER, x: 10, y: 9 }],
      robots: [{ id: 3, team: 0, unit: S.CASTLE, x: 10, y: 5, seen: true, signal: encXY(SIG.THREAT, 10, 16), signal_radius: 25 },
        { id: 4, team: 1, unit: S.CASTLE, x: 3, y: 3, seen: true, signal: encXY(SIG.THREAT, 2, 2), signal_radius: 25 },
        { id: 6, team: 0, unit: S.PILGRIM, x: 9, y: 5, seen: true, signal: encXY(SIG.THREAT, 20, 2), signal_radius: 25 }] };
    const B = { w, st: { home: { x: 10, y: 2 } } };
    watchThreats(B);   // our structure's radio only; crusaders are not remembered
    assert.deepStrictEqual([...B.st.threats.keys()], [16 * 64 + 10]);
    assert.ok(threatHot(B, 10, 8) && threatHot(B, 18, 16) && !threatHot(B, 10, 7) && !threatHot(B, 19, 16));
    const t = holdTarget(B); assert.ok(t && !threatHot(B, t[0], t[1]), 'holds ' + t);
    // Seen: remembered at its new tile too; the old tile in sight and empty is forgotten.
    w.robots = []; w.enemies = [{ id: 41, team: 1, unit: S.PROPHET, x: 12, y: 13 }]; w.me = { ...w.me, turn: 3 };
    watchThreats(B); assert.deepStrictEqual([...B.st.threats.keys()].sort(), [13 * 64 + 12, 16 * 64 + 10].sort());   // (10,16) r2 100: out of sight
    w.me = { ...w.me, x: 16, y: 9, turn: 4 }; w.enemies = [];
    watchThreats(B); assert.deepStrictEqual([...B.st.threats.keys()], [16 * 64 + 10]);   // (12,13) in sight, empty
    w.me = { ...w.me, x: 10, y: 6, turn: 2 + 31 }; watchThreats(B); assert.strictEqual(B.st.threats.size, 0);   // stale
    CFG.SIEGE = 0; const H = { w, st: { home: { x: 10, y: 2 }, threats: new Map([[16 * 64 + 10, 33]]) } };
    assert.deepStrictEqual(holdTarget(H), holdTarget({ w, st: { home: { x: 10, y: 2 } } }));   // off: as before
  } finally { CFG.SIEGE = saved; }
});

test('struct: SIEGE: the turn after a military build the structure radios the nearest enemy prophet (r2 25), once', () => {
  const saved = CFG.SIEGE, now = CFG.SIEGE_NOW;
  try {
    CFG.SIEGE = 30;
    const sent = [], w = { me: { x: 5, y: 5, turn: 30 }, sentR2: 0, fuel: 500, signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; },
      enemies: [{ unit: S.PROPHET, x: 5, y: 14 }, { unit: S.CRUSADER, x: 6, y: 7 }, { unit: S.PROPHET, x: 9, y: 11 }] };
    const B = { w, st: { built: S.PROPHET } };
    sayThreat(B); assert.deepStrictEqual(sent, []);                    // the build turn: the radio carries the round
    w.me = { ...w.me, turn: 31 }; B.st.built = -1; w.sentR2 = 2;
    sayThreat(B); assert.deepStrictEqual(sent, []);                    // radio busy
    w.me = { ...w.me, turn: 32 }; w.sentR2 = 0;
    sayThreat(B); assert.deepStrictEqual(sent, [[encXY(SIG.THREAT, 9, 11), 25]]);   // r2 52 beats r2 81; crusaders do not count
    w.me = { ...w.me, turn: 33 }; w.sentR2 = 0; sayThreat(B); assert.strictEqual(sent.length, 1);   // once
    B.st.built = S.PILGRIM; sayThreat(B); w.sentR2 = 0; B.st.built = -1; sayThreat(B); assert.strictEqual(sent.length, 1);   // pilgrims: no
    // SIEGE_NOW: a military build with the radio free (a threat response) radios at once; one whose radio carries the
    // round still waits.
    CFG.SIEGE_NOW = 1;
    w.me = { ...w.me, turn: 40 }; w.sentR2 = 0; B.st.built = S.PROPHET; sayThreat(B);
    assert.deepStrictEqual(sent.slice(1), [[encXY(SIG.THREAT, 9, 11), 25]]);
    w.me = { ...w.me, turn: 41 }; w.sentR2 = 2; B.st.built = S.PROPHET; sayThreat(B); assert.strictEqual(sent.length, 2);
    w.me = { ...w.me, turn: 42 }; w.sentR2 = 0; B.st.built = -1; sayThreat(B); assert.strictEqual(sent.length, 3, 'the next free turn');
  } finally { CFG.SIEGE = saved; CFG.SIEGE_NOW = now; }
});

test('struct: FEED_STOP: newborns gone young near the structure, or never seen, count; enough of them stop military builds', () => {
  const saved = [CFG.FEED_STOP, CFG.FEED_AGE, CFG.FEED_WINDOW, CFG.FEED_REST];
  try {
    Object.assign(CFG, { FEED_STOP: 3, FEED_AGE: 3, FEED_WINDOW: 20, FEED_REST: 50 });
    const P = (id, x, y, turn) => ({ id, team: 0, unit: S.PROPHET, x, y, turn });
    const w = { me: { id: 1, team: 0, unit: S.CHURCH, x: 10, y: 10, turn: 100 }, friends: [] };
    const B = { w, st: {} };
    const step = (turn, friends) => { w.me = { ...w.me, turn }; w.friends = friends; watchKids(B); };
    // Turn 100 built a prophet at (11,11); on 101 it stands at (12,11) on its first turn: tracked.
    B.st.kidPending = { x: 11, y: 11, unit: S.PROPHET };
    step(101, [P(7, 12, 11, 1), P(8, 10, 13, 9)]);
    assert.deepStrictEqual([...B.st.kids.keys()], [7]); assert.strictEqual(B.st.quick.length, 0);
    step(102, [P(8, 10, 13, 10)]);                       // gone at r2 5 from the church (vision r2 100, 7 tiles of margin): dead
    assert.deepStrictEqual(B.st.quick, [102]); assert.strictEqual(B.st.kids.size, 0);
    B.st.kidPending = { x: 11, y: 11, unit: S.PROPHET };
    step(103, []);                                       // never seen alive: dead
    B.st.kidPending = { x: 11, y: 11, unit: S.PROPHET };
    step(104, [P(9, 11, 12, 1)]);
    step(105, [P(9, 16, 16, 2)]);                        // r2 72: could have walked out of sight
    step(106, []);
    assert.deepStrictEqual(B.st.quick, [102, 103]); assert.ok(!(B.st.feedOff > 0));
    B.st.kidPending = { x: 11, y: 11, unit: S.PROPHET };
    step(107, [P(10, 11, 11, 1)]); step(110, [P(10, 11, 12, 4)]);   // lived FEED_AGE turns: no longer followed
    assert.strictEqual(B.st.kids.size, 0);
    B.st.kidPending = { x: 9, y: 9, unit: S.CRUSADER };
    step(111, [P(11, 9, 9, 1)]);                         // a prophet, not the crusader built: never seen alive
    assert.strictEqual(B.st.feedOff, 161); assert.deepStrictEqual(B.st.quick, []);
    // feeding: off while feedOff lasts, except against an attacker that can hit the structure.
    w.me = { ...w.me, turn: 120 };
    assert.ok(!feeding(B, null, 0));
    assert.ok(!feeding(B, { unit: S.PROPHET }, 98) && feeding(B, { unit: S.PROPHET }, 64) && feeding(B, { unit: S.CRUSADER }, 16));
    w.me = { ...w.me, turn: 161 }; assert.ok(feeding(B, null, 0));
    // Three within FEED_WINDOW stop it; one older than that has left the window.
    const C = { w, st: { quick: [135, 140] } };
    w.me = { ...w.me, turn: 150 }; w.friends = []; C.st.kidPending = { x: 11, y: 11, unit: S.PROPHET }; watchKids(C);
    assert.deepStrictEqual(C.st.quick, []);
    assert.strictEqual(C.st.feedOff, 200);
    const D = { w, st: { quick: [125, 140] } };
    D.st.kidPending = { x: 11, y: 11, unit: S.PROPHET }; watchKids(D);
    assert.deepStrictEqual(D.st.quick, [140, 150]); assert.ok(!(D.st.feedOff > 0));   // 125 is 25 turns back
    CFG.FEED_STOP = 0; assert.ok(feeding({ w, st: { feedOff: 999 } }, null, 0));      // off: always
  } finally { [CFG.FEED_STOP, CFG.FEED_AGE, CFG.FEED_WINDOW, CFG.FEED_REST] = saved; }
});

test('struct: FEED_STOP: a castle resting from feeding answers no prophet out of its reach, one in reach as before', () => {
  const saved = CFG.FEED_STOP;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const turn1 = (stop, dy) => {
      CFG.FEED_STOP = stop; castle.turn = 1;
      const extra = [{ id: 4999, team: 1, unit: S.PROPHET, x: castle.x, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }];
      const all = g.robots;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat(extra);
      const w = worldFor(g, castle); g.robots = all;
      const B = { api: w.api, w, round: 1, birthRound: 1, st: { feedOff: 60 }, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 500;
      return (castleTurn(B) || {}).u;
    };
    assert.strictEqual(turn1(0, 9), S.PROPHET);          // r2 81: answered by default
    assert.notStrictEqual(turn1(3, 9), S.PROPHET);       // resting: not answered
    assert.strictEqual(turn1(3, 7), S.PROPHET);          // r2 49: it can hit the castle
  } finally { CFG.FEED_STOP = saved; }
});

test('struct: MUSTER: a castle answers a camper out of its reach with a crusader on the far side, told the prophet\'s tile', () => {
  const saved = CFG.MUSTER;
  try {
    const g = new Game(3, 100, 20, false, false);
    const castle = g.robots.find(r => r.team === 0);
    const turn1 = (muster, unit, dy, since = -5) => {
      CFG.MUSTER = muster; castle.turn = 1;
      const extra = [{ id: 4999, team: 1, unit, x: castle.x, y: castle.y + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }];
      const all = g.robots;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100).concat(extra);
      const w = worldFor(g, castle); g.robots = all;
      const sent = []; w.api.signal = (v, r2) => sent.push([v, r2]);
      const e = w.T.toC(castle.x, castle.y + dy);   // seen on its tile since turn `since`
      const st = { mus: { ids: new Set(), pend: null, rel: -1, seen: new Map([[4999, { x: e[0], y: e[1], t: since }]]) } };
      const B = { api: w.api, w, round: 1, birthRound: 1, st, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 500;
      return { a: castleTurn(B) || {}, sent, e, st: B.st };
    };
    const off = turn1(0, S.PROPHET, 9);
    assert.strictEqual(off.a.u, S.PROPHET);                 // v8: a prophet against a prophet at r2 81
    const on = turn1(1, S.PROPHET, 9);
    assert.strictEqual(on.a.u, S.CRUSADER);
    assert.ok(d2(castle.x + on.a.dx, castle.y + on.a.dy, castle.x, castle.y + 9) > 81);   // the far side
    assert.deepStrictEqual(on.sent, [[encXY(SIG.THREAT, on.e[0], on.e[1]), 2]]);
    assert.ok(on.st.mus.pend);
    assert.strictEqual(turn1(1, S.PROPHET, 7).a.u, S.PROPHET);     // r2 49: in the castle's reach, v8's answer
    assert.strictEqual(turn1(1, S.CRUSADER, 9).a.u, S.PREACHER);   // a crusader: v8's answer
    assert.strictEqual(turn1(1, S.PREACHER, 9).a.u, S.PROPHET);    // a preacher: v8's answer
    assert.strictEqual(turn1(1, S.PROPHET, 9, -1).a.u, S.PROPHET);  // 2 turns on its tile, not 3: v8's answer
  } finally { CFG.MUSTER = saved; }
});

testPreV9('struct: MUSTER: the attackers out of reach, the held set, and the release at 2A + 1', () => {
  let id = 100;
  const P = (x, y, unit = S.PROPHET) => ({ id: id++, x, y, unit });
  // musterCase with every enemy seen on its tile since turn `since` (the structure's turn is 10); the nearest first.
  const mc = (unit, enemies, since = 0) => {
    const seen = new Map(enemies.map(e => [e.id, { x: e.x, y: e.y, t: since }]));
    return musterCase({ w: { me: { x: 5, y: 5, unit, turn: 10 }, enemies }, st: { mus: { seen } } }, enemies, enemies[0], d2(5, 5, enemies[0].x, enemies[0].y));
  };
  let a = P(5, 12), b = P(5, 16);
  assert.deepStrictEqual(mc(S.CHURCH, [a, b]), [a, b]);              // a church reaches nothing
  assert.strictEqual(mc(S.CHURCH, [a, b], 8), null);                  // 2 turns on the tile, not MUSTER_DWELL 3
  assert.strictEqual(mc(S.CHURCH, [P(5, 10), b]), null);              // r2 25 <= 36: v8's preacher
  assert.strictEqual(mc(S.CHURCH, [a, P(15, 15, S.CRUSADER)]), null); // enemy melee in sight: an army
  assert.strictEqual(mc(S.CHURCH, [a, P(5, 20, S.PREACHER)]), null);
  assert.strictEqual(mc(S.CHURCH, [P(5, 12, S.CASTLE), b]), null);    // the nearest is no prophet
  a = P(5, 14); b = P(14, 5);
  assert.deepStrictEqual(mc(S.CASTLE, [a, b]), [a, b]);               // beyond r2 64: the castle's reach
  assert.strictEqual(mc(S.CASTLE, [P(5, 13), a]), null);

  // Tracking: an enemy prophet keeps the turn it came to its tile; last turn's newborn crusader joins; a member out of
  // sight leaves; a release ends after MUSTER_WAIT turns or when no attacker is in sight.
  const e1 = P(5, 14), e2 = P(9, 14);
  const w = { me: { x: 5, y: 5, turn: 31 }, enemies: [e1, e2],
    friends: [{ id: 7, unit: S.CRUSADER, turn: 1, x: 4, y: 4 }, { id: 8, unit: S.CRUSADER, turn: 6, x: 6, y: 6 }, { id: 10, unit: S.PROPHET, turn: 1, x: 6, y: 4 }] };
  const st = { mus: { ids: new Set([8, 9]), pend: { x: 4, y: 4 }, rel: -1,
    seen: new Map([[e1.id, { x: 5, y: 14, t: 20 }], [e2.id, { x: 9, y: 13, t: 20 }], [999, { x: 1, y: 1, t: 3 }]]) } };
  musterTrack({ w, st });
  assert.deepStrictEqual([[...st.mus.ids].sort(), st.mus.pend, st.mus.rel], [[7, 8], null, -1]);
  assert.deepStrictEqual([...st.mus.seen], [[e1.id, { x: 5, y: 14, t: 20 }], [e2.id, { x: 9, y: 14, t: 31 }]]);   // e2 moved
  st.mus.rel = 7; musterTrack({ w, st }); assert.strictEqual(st.mus.rel, 7);    // 24 turns
  st.mus.rel = 6; musterTrack({ w, st }); assert.strictEqual(st.mus.rel, -1);   // 25
  st.mus.rel = 30; w.enemies = [P(5, 14, S.PILGRIM)]; musterTrack({ w, st }); assert.strictEqual(st.mus.rel, -1);

  // The release: 2A + 1 held (5 against two) radio the nearest as a spot and clear the set; the radio repeats.
  const sent = [], fw = { me: { x: 5, y: 5, turn: 40, unit: S.CHURCH }, sentR2: 0, fuel: 500, canAfford: () => false,
    signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; } };
  const fst = { mus: { ids: new Set([1, 2, 3]), pend: null, rel: -1 } };
  assert.strictEqual(musterAct({ w: fw, st: fst }, [P(5, 16), P(6, 13)], 0, true), null);   // 3 < 2 * 2 + 1: builds (if it can)
  assert.deepStrictEqual([sent, fst.mus.rel], [[], -1]);
  fst.mus.ids.add(4); fst.mus.ids.add(5);
  assert.strictEqual(musterAct({ w: fw, st: fst }, [P(5, 16), P(6, 13)], 0, true), null);
  assert.deepStrictEqual([sent, fst.mus.rel, fst.mus.ids.size], [[[encXY(0, 6, 13), FAR.ENEMY]], 40, 0]);
  fw.sentR2 = 0; fw.me.turn = 41;
  musterAct({ w: fw, st: fst }, [P(5, 16), P(6, 13)], 0, true);
  assert.strictEqual(sent.length, 2);
  // Ours already outnumber them (the gate is shut): A + 1 held suffice.
  const gst = { mus: { ids: new Set([1, 2]), pend: null, rel: -1 } };
  fw.sentR2 = 0; fw.me.turn = 50; sent.length = 0;
  musterAct({ w: fw, st: gst }, [P(5, 16), P(6, 13)], 0, false);
  assert.deepStrictEqual([sent, gst.mus.rel], [[], -1]);              // 2 < 2 + 1
  gst.mus.ids.add(3);
  musterAct({ w: fw, st: gst }, [P(5, 16), P(6, 13)], 0, true);
  assert.deepStrictEqual([sent, gst.mus.rel], [[], -1]);              // gate open: 3 < 2 * 2 + 1
  musterAct({ w: fw, st: gst }, [P(5, 16), P(6, 13)], 0, false);
  assert.deepStrictEqual([sent, gst.mus.rel], [[[encXY(0, 6, 13), FAR.ENEMY]], 50]);
});

test('struct: MUSTER 2 (hold only): no release at 2A + 1; the peacetime army builds held crusaders while the case holds', () => {
  const saved = CFG.MUSTER;
  try {
    let id = 100;
    const P = (x, y) => ({ id: id++, x, y, unit: S.PROPHET });
    const sent = [], built = [];
    const fw = { me: { x: 5, y: 5, turn: 40, unit: S.CHURCH }, sentR2: 0, fuel: 500, enemies: [], afford: true,
      canAfford() { return this.afford; }, free: () => true, isDepot: () => false,
      signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; }, build(unit, dx, dy) { built.push([unit, dx, dy]); return { u: unit, dx, dy }; } };
    const st = { mus: { ids: new Set([1, 2, 3, 4, 5]), pend: null, rel: -1 }, nDef: 0 };
    CFG.MUSTER = 2;
    assert.strictEqual(musterAct({ w: fw, st }, [P(5, 16), P(6, 13)], 0, false), null);   // 5 held >= 2 * 2 + 1
    assert.deepStrictEqual([sent, st.mus.rel, st.camp], [[], -1, { t: 40, x: 6, y: 13 }]);   // no release; the case noted
    const a = musterArmy({ w: fw, st }, 0, 0);
    assert.strictEqual(a.u, S.CRUSADER);
    assert.ok(d2(5 + a.dx, 5 + a.dy, 6, 13) > d2(5, 5, 6, 13));                     // the far side
    assert.deepStrictEqual([sent, st.mus.pend, st.nDef], [[[encXY(SIG.THREAT, 6, 13), 2]], { x: 5 + a.dx, y: 5 + a.dy }, 1]);
    fw.afford = false; assert.strictEqual(musterArmy({ w: fw, st }, 0, 0), null);     // the case holds: nothing else
    fw.afford = true; fw.me.turn = 41; assert.strictEqual(musterArmy({ w: fw, st }, 0, 0), undefined);   // not this turn
    CFG.MUSTER = 1; fw.me.turn = 40; assert.strictEqual(musterArmy({ w: fw, st }, 0, 0), undefined);     // mode 1: v8's army
    CFG.MUSTER = 2; st.mus.rel = -1; st.mus.ids = new Set([1, 2, 3]); sent.length = 0;
    musterAct({ w: fw, st }, [P(5, 16)], 0, false);
    assert.deepStrictEqual([sent, st.mus.rel], [[], -1]);
  } finally { CFG.MUSTER = saved; }
});

testPreV10('military: MUSTER 2: a held crusader holds rings 2-4 king steps from home until an enemy melee unit is in sight; the spot does not release it', () => {
  const saved = CFG.MUSTER;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let at = null, tgt = null;
    for (let dy = -1; dy <= 1 && !tgt; dy++) for (let dx = -1; dx <= 1 && !tgt; dx++) {
      const ax = castle.x + dx, ay = castle.y + dy; if ((!dx && !dy) || !free(ax, ay)) continue;
      for (let ty = 0; ty < n && !tgt; ty++) for (let tx = 0; tx < n && !tgt; tx++) {
        if (!free(tx, ty) || d2(tx, ty, castle.x, castle.y) < 81 || d2(tx, ty, castle.x, castle.y) > 100 || d2(tx, ty, ax, ay) <= 49) continue;
        let ok = false;
        for (let y = ay - 3; y <= ay + 3; y++) for (let x = ax - 3; x <= ax + 3; x++)
          if (free(x, y) && d2(x, y, ax, ay) <= 9 && king(x, y, castle.x, castle.y) === 2 && d2(x, y, tx, ty) > 64) ok = true;
        if (ok) { at = [ax, ay]; tgt = [tx, ty]; }
      }
    }
    assert.ok(at && tgt);
    const own = g.robots.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100);
    const crus = { id: 4005, team: 0, unit: S.CRUSADER, x: at[0], y: at[1], turn: 1, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    const all = g.robots;
    const step = (st, sig, radius, extra = []) => {
      castle.signal = sig; castle.signal_radius = radius;
      g.robots = own.concat([crus], extra);
      try {
        const w = worldFor(g, crus), B = { api: w.api, w, round: 20, birthRound: 20, st, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return militaryTurn(B);
      } finally { g.robots = all; castle.signal = 0; castle.signal_radius = 0; }
    };
    const cw = worldFor(g, castle), [ex, ey] = cw.T.toC(tgt[0], tgt[1]);
    CFG.MUSTER = 2;
    const st = {}, a = step(st, encXY(SIG.THREAT, ex, ey), 2);
    assert.deepStrictEqual([st.muster.x, st.muster.y, st.muster.until], [ex, ey, Infinity]);
    assert.ok(a && a.action === 'move');
    const to = [at[0] + a.dx, at[1] + a.dy], k = king(to[0], to[1], castle.x, castle.y);
    assert.ok(k >= 2 && k <= 4 && d2(to[0], to[1], tgt[0], tgt[1]) > 64);
    crus.x = to[0]; crus.y = to[1];
    crus.turn = 2 + 5 * CFG.MUSTER_WAIT; assert.strictEqual(step(st, 0, 0), null);   // still held long after MUSTER_WAIT
    crus.turn++; step(st, encXY(0, ex, ey), FAR.ENEMY);                               // a spot: no release
    assert.ok(st.muster && !st.mustered);
    // Three king steps from home and out of reach: it stays (rings 2-4; mode 1 would walk back to ring 2).
    let r3 = null;
    for (let y = castle.y - 3; y <= castle.y + 3 && !r3; y++) for (let x = castle.x - 3; x <= castle.x + 3 && !r3; x++)
      if (free(x, y) && king(x, y, castle.x, castle.y) === 3 && d2(x, y, tgt[0], tgt[1]) > 64) r3 = [x, y];
    assert.ok(r3);
    crus.x = r3[0]; crus.y = r3[1]; crus.turn = 50; assert.strictEqual(step(st, 0, 0), null);
    crus.x = to[0]; crus.y = to[1]; crus.turn = 60;
    step(st, 0, 0, [{ id: 4006, team: 1, unit: S.CRUSADER, x: tgt[0], y: tgt[1], turn: 9, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 }]);
    assert.strictEqual(st.muster, null);                                              // an enemy crusader in sight
  } finally { CFG.MUSTER = saved; }
});

test('struct: MUSTER_RESCUE: a structure hit in its last 3 turns radios the nearest attacker in sight as a spot', () => {
  const sent = [];
  const w = { me: { x: 5, y: 5, turn: 40, unit: S.CASTLE, health: 200 }, sentR2: 0, fuel: 500,
    enemies: [{ x: 5, y: 13, unit: S.PROPHET }, { x: 5, y: 8, unit: S.PILGRIM }, { x: 12, y: 5, unit: S.PROPHET }],
    signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; } };
  const st = {}, B = { w, st };
  hitTrack(B); sayRescue(B); assert.deepStrictEqual([st.hitAt, sent], [undefined, []]);   // never hit
  w.me = { ...w.me, turn: 41, health: 190 }; hitTrack(B); assert.strictEqual(st.hitAt, 41);
  sayRescue(B); assert.deepStrictEqual(sent, [[encXY(0, 12, 5), FAR.ENEMY]]);              // nearest attacker, not the pilgrim
  w.me = { ...w.me, turn: 43 }; w.sentR2 = 0; hitTrack(B); sayRescue(B); assert.strictEqual(sent.length, 2);   // 2 turns on
  w.me = { ...w.me, turn: 44 }; w.sentR2 = 0; hitTrack(B); sayRescue(B); assert.strictEqual(sent.length, 2);   // 3: over
  w.me = { ...w.me, turn: 45, health: 180 }; w.sentR2 = 2; hitTrack(B); sayRescue(B); assert.strictEqual(sent.length, 2);   // radio taken
  w.sentR2 = 0; w.fuel = 9; sayRescue(B); assert.strictEqual(sent.length, 2);                                     // no fuel
  w.fuel = 500; w.enemies = [w.enemies[1]]; sayRescue(B); assert.strictEqual(sent.length, 2);                    // no attacker
});

test('military: MUSTER_RESCUE: a held crusader released by a spot within r2 MUSTER_RESCUE of home engages it; a farther one does not', () => {
  const saved = { MUSTER: CFG.MUSTER, MUSTER_RESCUE: CFG.MUSTER_RESCUE };
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let at = null, tgt = null, far = null;
    for (let dy = -1; dy <= 1 && !tgt; dy++) for (let dx = -1; dx <= 1 && !tgt; dx++) {
      const ax = castle.x + dx, ay = castle.y + dy; if ((!dx && !dy) || !free(ax, ay)) continue;
      for (let ty = 0; ty < n && !tgt; ty++) for (let tx = 0; tx < n && !tgt; tx++)
        if (free(tx, ty) && d2(tx, ty, castle.x, castle.y) >= 49 && d2(tx, ty, castle.x, castle.y) <= 64 && d2(tx, ty, ax, ay) > 49) { at = [ax, ay]; tgt = [tx, ty]; }
    }
    for (let ty = 0; ty < n && !far; ty++) for (let tx = 0; tx < n && !far; tx++)
      if (free(tx, ty) && d2(tx, ty, castle.x, castle.y) > 100 && d2(tx, ty, castle.x, castle.y) <= 196) far = [tx, ty];
    assert.ok(at && tgt && far);
    const own = g.robots.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100);
    const crus = { id: 4005, team: 0, unit: S.CRUSADER, x: at[0], y: at[1], turn: 1, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    const all = g.robots;
    const step = (st, sig, radius) => {
      castle.signal = sig; castle.signal_radius = radius;
      g.robots = own.concat([crus]);
      try {
        const w = worldFor(g, crus), B = { api: w.api, w, round: 20, birthRound: 20, st, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return militaryTurn(B);
      } finally { g.robots = all; castle.signal = 0; castle.signal_radius = 0; }
    };
    const cw = worldFor(g, castle), C = ([x, y]) => cw.T.toC(x, y);
    CFG.MUSTER = 2; CFG.MUSTER_RESCUE = 100;
    const st = {};
    step(st, encXY(SIG.THREAT, ...C(tgt)), 2);
    assert.ok(st.muster);
    crus.turn = 2; step(st, encXY(0, ...C(far)), FAR.ENEMY);                     // beyond r2 100 of home: still held
    assert.ok(st.muster && !st.mustered);
    crus.turn = 3; const a = step(st, encXY(0, ...C(tgt)), FAR.ENEMY);         // within: released, it closes in
    assert.ok(st.muster === null && st.mustered);
    assert.ok(a && a.action === 'move' && d2(crus.x + a.dx, crus.y + a.dy, tgt[0], tgt[1]) < d2(crus.x, crus.y, tgt[0], tgt[1]));
    CFG.MUSTER_RESCUE = 0; const st2 = {}; crus.turn = 1;
    step(st2, encXY(SIG.THREAT, ...C(tgt)), 2); crus.turn = 2; step(st2, encXY(0, ...C(tgt)), FAR.ENEMY);
    assert.ok(st2.muster && !st2.mustered);                                    // v9: the spot does not release it
  } finally { Object.assign(CFG, saved); }
});

test('military: MUSTER: a crusader told of a prophet holds two king steps from home out of its reach, then charges on the release', () => {
  const saved = CFG.MUSTER;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    let at = null, tgt = null;
    for (let dy = -1; dy <= 1 && !tgt; dy++) for (let dx = -1; dx <= 1 && !tgt; dx++) {
      const ax = castle.x + dx, ay = castle.y + dy; if ((!dx && !dy) || !free(ax, ay)) continue;
      for (let ty = 0; ty < n && !tgt; ty++) for (let tx = 0; tx < n && !tgt; tx++) {
        if (!free(tx, ty) || d2(tx, ty, castle.x, castle.y) < 81 || d2(tx, ty, castle.x, castle.y) > 100 || d2(tx, ty, ax, ay) <= 49) continue;
        let ok = false;   // a free tile two king steps from the castle, out of the prophet's reach, one move away
        for (let y = ay - 3; y <= ay + 3; y++) for (let x = ax - 3; x <= ax + 3; x++)
          if (free(x, y) && d2(x, y, ax, ay) <= 9 && king(x, y, castle.x, castle.y) === 2 && d2(x, y, tx, ty) > 64) ok = true;
        if (ok) { at = [ax, ay]; tgt = [tx, ty]; }
      }
    }
    assert.ok(at && tgt);
    const own = g.robots.filter(r => r.team === 0 && d2(r.x, r.y, castle.x, castle.y) <= 100);
    const crus = { id: 4005, team: 0, unit: S.CRUSADER, x: at[0], y: at[1], turn: 1, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
    const all = g.robots;
    const step = (st, sig, radius) => {
      castle.signal = sig; castle.signal_radius = radius;
      g.robots = own.concat([crus]);
      try {
        const w = worldFor(g, crus), B = { api: w.api, w, round: 20, birthRound: 20, st, deps: null, clusters: null, rnd: rng(2) };
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return militaryTurn(B);
      } finally { g.robots = all; castle.signal = 0; castle.signal_radius = 0; }
    };
    const cw = worldFor(g, castle), [ex, ey] = cw.T.toC(tgt[0], tgt[1]);
    CFG.MUSTER = 0;
    const st0 = {}; step(st0, encXY(SIG.THREAT, ex, ey), 2);
    assert.strictEqual(st0.muster, undefined);                    // off: v8
    CFG.MUSTER = 1;
    const st = {}, a = step(st, encXY(SIG.THREAT, ex, ey), 2);
    assert.deepStrictEqual([st.muster.x, st.muster.y, st.muster.until], [ex, ey, 1 + CFG.MUSTER_WAIT]);
    assert.ok(a && a.action === 'move');
    const to = [at[0] + a.dx, at[1] + a.dy];
    assert.strictEqual(king(to[0], to[1], castle.x, castle.y), 2);
    assert.ok(d2(to[0], to[1], tgt[0], tgt[1]) > 64);
    // Held there: it stays.
    crus.x = to[0]; crus.y = to[1]; crus.turn = 2;
    assert.strictEqual(step(st, 0, 0), null);
    // The release (the castle radios the spot): it charges.
    crus.turn = 3;
    const b = step(st, encXY(0, ex, ey), FAR.ENEMY);
    assert.deepStrictEqual([st.muster, st.mustered], [null, true]);
    assert.ok(b && b.action === 'move' && d2(to[0] + b.dx, to[1] + b.dy, tgt[0], tgt[1]) < d2(to[0], to[1], tgt[0], tgt[1]));
    // No release: it holds MUSTER_WAIT turns, then goes on as v8.
    const st2 = {}; crus.x = at[0]; crus.y = at[1]; crus.turn = 1;
    step(st2, encXY(SIG.THREAT, ex, ey), 2);
    crus.turn = 2 + CFG.MUSTER_WAIT; step(st2, 0, 0);
    assert.strictEqual(st2.muster, null);
    // An enemy preacher in sight ends the hold at once.
    const st3 = {}; crus.turn = 1;
    step(st3, encXY(SIG.THREAT, ex, ey), 2);
    assert.ok(st3.muster);
    own.push({ id: 4006, team: 1, unit: S.PREACHER, x: tgt[0], y: tgt[1], turn: 9, health: 60, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    crus.turn = 2; step(st3, 0, 0); own.pop();
    assert.strictEqual(st3.muster, null);
  } finally { CFG.MUSTER = saved; }
});

test('struct: WATCH: a structure radios the nearest enemy attacker within r2 100 that no military unit of ours sees', () => {
  const saved = CFG.WATCH;
  try {
    CFG.WATCH = 2;
    const sent = [], w = { me: { x: 5, y: 5, turn: 30, unit: S.CASTLE }, sentR2: 0, fuel: 500, signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; },
      enemies: [{ unit: S.PROPHET, x: 5, y: 14 }, { unit: S.PILGRIM, x: 6, y: 6 }, { unit: S.CRUSADER, x: 9, y: 11 }, { unit: S.PREACHER, x: 15, y: 6 }],
      friends: [{ unit: S.PROPHET, x: 13, y: 11 }, { unit: S.PILGRIM, x: 5, y: 12 }] };
    const B = { w, st: {} };
    sayWatch(B);   // the crusader (r2 52) is in our prophet's sight; pilgrims are no one's concern; the prophet (r2 81) beats r2 101
    assert.deepStrictEqual(sent, [[encXY(0, 5, 14), FAR.ENEMY]]);
    w.me = { ...w.me, turn: 31 }; w.sentR2 = 0; sayWatch(B); assert.strictEqual(sent.length, 1);   // within WATCH turns
    w.me = { ...w.me, turn: 32 }; w.sentR2 = 2; sayWatch(B); assert.strictEqual(sent.length, 1);   // radio busy (a build)
    w.sentR2 = 0; w.fuel = 59; sayWatch(B); assert.strictEqual(sent.length, 1);                       // fuel
    w.fuel = 500; w.friends.push({ unit: S.CRUSADER, x: 6, y: 13 }); sayWatch(B);                     // all seen: the preacher r2 101 is out
    assert.strictEqual(sent.length, 1);
    w.friends = []; sayWatch(B); assert.deepStrictEqual(sent[1], [encXY(0, 9, 11), FAR.ENEMY]);
  } finally { CFG.WATCH = saved; }
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

test('STRIKE_FAR: pilgrims radio an enemy church once; the nearest castle owes crusaders that walk to it', () => {
  const saved = [CFG.STRIKE_FAR, CFG.STRIKE_FAR_R2, CFG.STRIKE_SAFE_R2, CFG.STRIKE_FUEL];
  try {
    CFG.STRIKE_FAR = 3; CFG.STRIKE_FAR_R2 = 400; CFG.STRIKE_SAFE_R2 = 100; CFG.STRIKE_FUEL = 150;
    const C = (id, x, y, team = 1) => ({ id, team, unit: S.CHURCH, x, y, seen: true });
    // Pilgrim: the nearest church in sight, once; quiet after hearing another pilgrim radio it, or on a thin bank.
    const sent = [], st = {};
    const look = (enemies, robots = [], fuel = 1000) => {
      const w = { me: { id: 1, x: 10, y: 10 }, n: 40, enemies, robots, fuel, sentR2: 0, signal(v, r2) { sent.push([v, r2]); this.sentR2 = r2; } };
      strikeSpot({ w, st });
    };
    look([C(50, 14, 14), C(51, 12, 11)]);
    assert.deepStrictEqual(sent, [[encXY(0, 12, 11), FAR.STRIKE]]);
    look([C(50, 14, 14), C(51, 12, 11)]);
    assert.deepStrictEqual(sent[1], [encXY(0, 14, 14), FAR.STRIKE]);
    look([C(50, 14, 14), C(51, 12, 11)]);
    assert.strictEqual(sent.length, 2);
    const heard = { id: 9, team: 0, seen: false, signal: encXY(0, 20, 20), signal_radius: FAR.STRIKE };
    look([C(52, 20, 20)], [heard]); look([C(53, 21, 21)], [], 100);
    assert.strictEqual(sent.length, 2, 'heard, or a thin bank: quiet');
    assert.deepStrictEqual(decFarRobot(heard), { type: SIG.STRIKE, x: 20, y: 20, extra: 0 });

    // Castle: it owes STRIKE_FAR crusaders to a radioed church within r2 400 of it when no castle of ours is nearer and
    // the church stands beyond r2 100 of every enemy castle (mirror (x, n-1-y)); each tile once.
    const castleB = (me, castles, robots, enemies = [], occ = () => -1) => {
      const w = { me, n: 40, robots, enemies, occ, mirror: (x, y) => [x, 39 - y] };
      return { w, st: { castles: new Map(castles.map((c, i) => [i + 1, c])), order: castles } };
    };
    const radio = (x, y) => ({ id: 70, team: 0, seen: false, signal: encXY(0, x, y), signal_radius: FAR.STRIKE });
    const me = { id: 1, x: 10, y: 5 };
    let B = castleB(me, [me, { x: 30, y: 5 }], [radio(12, 20)]);
    hearStrike(B);
    assert.deepStrictEqual(B.st.strikes, [{ x: 12, y: 20, left: 3 }]);
    hearStrike(B);
    assert.strictEqual(B.st.strikes.length, 1, 'once per tile');
    for (const [why, castles, at] of [['beyond r2 400', [me], [10, 26]], ['another castle nearer', [me, { x: 16, y: 18 }], [12, 20]],
      ['within r2 100 of an enemy castle', [me, { x: 30, y: 30 }], [25, 9]]]) {
      B = castleB(me, castles, [radio(at[0], at[1])]);
      hearStrike(B);
      assert.deepStrictEqual(B.st.strikes, [], why);
    }
    // A church the castle itself sees counts too; a debt ends when the castle sees the tile without the church.
    B = castleB(me, [me], [], [C(60, 13, 12)]);
    hearStrike(B);
    assert.deepStrictEqual(B.st.strikes, [{ x: 13, y: 12, left: 3 }]);
    B.w.enemies = []; B.w.occ = () => 0;
    hearStrike(B);
    assert.deepStrictEqual(B.st.strikes, []);
    // strikeFar builds a crusader toward it, radioing SIG.GUARD at r2 GUARD_STRIKE; a turn whose radio is taken waits.
    const sigs = [];
    const bw = { me: { x: 10, y: 5, turn: 30 }, n: 40, enemies: [], fuel: 1000, karbonite: 200, sentR2: 0, free: () => true, isDepot: () => false,
      canAfford: () => true, signal(v, r2) { sigs.push([v, r2]); this.sentR2 = r2; }, build: (u, dx, dy) => ({ action: 'build', u, dx, dy }) };
    const SB = { w: bw, st: { strikes: [{ x: 13, y: 12, left: 1 }] }, round: 30 };
    bw.sentR2 = 4; assert.strictEqual(strikeFar(SB), null); bw.sentR2 = 0;
    const a = strikeFar(SB);
    assert.strictEqual(a.u, S.CRUSADER);
    assert.deepStrictEqual(sigs, [[encXY(SIG.GUARD, 13, 12), GUARD_STRIKE]]);
    assert.ok(d2(10 + a.dx, 5 + a.dy, 13, 12) < d2(10, 5, 13, 12), 'toward it');
    assert.strictEqual(strikeFar(SB), null, 'paid off');

    // Military: a crusader born to a GUARD at r2 GUARD_STRIKE walks toward the church tile (out of sight);
    // born to the same GUARD at r2 2 (an escort), it is no striker.
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0 && r.unit === S.CASTLE);
    const free = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.robots.some(q => q.x === x && q.y === y);
    const ring = (cx, cy, lo, hi) => { for (let r = lo; r <= hi; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++)
      if (Math.max(Math.abs(dx), Math.abs(dy)) === r && free(cx + dx, cy + dy)) return [cx + dx, cy + dy]; return null; };
    const at = ring(castle.x, castle.y, 1, 1), tgt = at && ring(castle.x, castle.y, 13, 15);
    assert.ok(at && tgt);
    const run = (r2) => {
      const cru = { id: 4004, team: 0, unit: S.CRUSADER, x: at[0], y: at[1], turn: 1, health: 40, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      g.robots.push(cru);
      try {
        const cw = worldFor(g, castle), [sx, sy] = cw.T.toC(tgt[0], tgt[1]);
        castle.signal = encXY(SIG.GUARD, sx, sy); castle.signal_radius = r2;
        const w = worldFor(g, cru), B = { api: w.api, w, round: 20, st: {}, deps: null, clusters: null, rnd: rng(2) };
        w.shadow[tgt[1]][tgt[0]] = -1;   // the church tile out of sight (worldFor's robot sees the whole map)
        B.offs = offsets(S.STATS[S.CRUSADER].speed); B.nav = new Nav(w, B.offs, B.rnd);
        return { a: militaryTurn(B), B };
      } finally { g.robots.pop(); castle.signal = 0; castle.signal_radius = 0; }
    };
    const e2 = (x, y) => (x - tgt[0]) ** 2 + (y - tgt[1]) ** 2;
    const on = run(GUARD_STRIKE);
    assert.ok(on.B.st.strike && on.a && on.a.action === 'move', 'a striker walks');
    assert.ok(e2(at[0] + on.a.dx, at[1] + on.a.dy) < e2(at[0], at[1]));
    const esc = run(2);
    assert.ok(esc.B.st.guardAt && !esc.B.st.strike, 'an escort is no striker');
    CFG.STRIKE_FAR = 0;
    assert.ok(!run(GUARD_STRIKE).B.st.strike, 'off: no striker');
  } finally { [CFG.STRIKE_FAR, CFG.STRIKE_FAR_R2, CFG.STRIKE_SAFE_R2, CFG.STRIKE_FUEL] = saved; }
});

test('struct: STRIKE_R2: a church that sees an enemy church 4 tiles off and no attacker builds a preacher toward it', () => {
  const saved = CFG.STRIKE_R2;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
    let ours = null;   // a passable tile with a free ring, 4 rows from another passable tile, away from the castles
    for (let y = 2; y < n - 6 && !ours; y++) for (let x = 2; x < n - 2 && !ours; x++)
      if (pass(x, y) && pass(x, y + 4) && offsets(2).every(([dx, dy]) => pass(x + dx, y + dy)) && g.robots.every(r => king(r.x, r.y, x, y) > 12)) ours = [x, y];
    assert.ok(ours, 'site');
    const mk = (id, team, unit, x, y) => ({ id, team, unit, x, y, turn: 5, health: S.STATS[unit].hp || 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const run = (r2, theirs, extra = []) => {
      CFG.STRIKE_R2 = r2;
      const church = mk(4100, 0, S.CHURCH, ours[0], ours[1]);
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, church.x, church.y) <= 100).concat([church, mk(4101, 1, S.CHURCH, theirs[0], theirs[1]), ...extra]);
      const w = worldFor(g, church); g.robots = all;
      const B = { api: w.api, w, round: 50, birthRound: 46, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 1000;
      return { act: churchTurn(B), w };
    };
    const t4 = [ours[0], ours[1] + 4];
    const on = run(36, t4), off = run(0, t4);
    assert.strictEqual((on.act || {}).u, S.PREACHER);
    const [bx, by] = [ours[0] + on.act.dx, ours[1] + on.act.dy];
    assert.ok(d2(bx, by, t4[0], t4[1]) < d2(ours[0], ours[1], t4[0], t4[1]), 'toward it');
    assert.notStrictEqual((off.act || {}).u, S.PREACHER);
    // Two military units of ours already next to it: no strike.
    const guards = [mk(4102, 0, S.CRUSADER, t4[0] - 1, t4[1]), mk(4103, 0, S.CRUSADER, t4[0] + 1, t4[1])].filter(r => pass(r.x, r.y));
    if (guards.length === 2) assert.notStrictEqual((run(36, t4, guards).act || {}).u, S.PREACHER);
  } finally { CFG.STRIKE_R2 = saved; }
});

test('struct: INTERCEPT_R2 / INTERCEPT_DWELL: a structure builds a unit that hits an enemy pilgrim in its birth round', () => {
  const saved = [CFG.INTERCEPT_R2, CFG.INTERCEPT_DWELL];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
    let ours = null;   // a passable tile with a free ring, 9 rows of map ahead, away from the castles
    for (let y = 2; y < n - 10 && !ours; y++) for (let x = 2; x < n - 2 && !ours; x++)
      if (pass(x, y) && offsets(2).every(([dx, dy]) => pass(x + dx, y + dy)) && g.robots.every(r => king(r.x, r.y, x, y) > 12)) ours = [x, y];
    assert.ok(ours, 'site');
    const mk = (id, team, unit, x, y) => ({ id, team, unit, x, y, turn: 5, health: S.STATS[unit].hp || 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const st = {};
    const run = (r2, dwell, dy, extra = [], turn = 5, keep = false) => {
      CFG.INTERCEPT_R2 = r2; CFG.INTERCEPT_DWELL = dwell;
      const church = { ...mk(4100, 0, S.CHURCH, ours[0], ours[1]), turn };
      const all = g.robots;
      g.robots = all.filter(r => d2(r.x, r.y, church.x, church.y) <= 100).concat([church, mk(4101, 1, S.PILGRIM, ours[0], ours[1] + dy), ...extra]);
      const w = worldFor(g, church); g.robots = all;
      const B = { api: w.api, w, round: 50, birthRound: 46, st: keep ? st : {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 1000;
      const act = churchTurn(B);
      return { act, at: act && act.u ? [ours[0] + act.dx, ours[1] + act.dy] : null };
    };
    const p4 = [ours[0], ours[1] + 4], p7 = [ours[0], ours[1] + 7];
    const c = run(64, 0, 4);                                  // r2 16: a crusader within r2 16 of it
    assert.strictEqual((c.act || {}).u, S.CRUSADER);
    assert.ok(d2(c.at[0], c.at[1], p4[0], p4[1]) <= 16);
    const pr = run(64, 0, 7);                                 // r2 49: no adjacent tile is within 16, so a prophet in its band
    assert.strictEqual((pr.act || {}).u, S.PROPHET);
    const r = d2(pr.at[0], pr.at[1], p7[0], p7[1]); assert.ok(r >= 16 && r <= 64, 'band ' + r);
    assert.ok(![S.CRUSADER, S.PROPHET].includes((run(0, 0, 4).act || {}).u));          // off
    assert.ok(![S.CRUSADER, S.PROPHET].includes((run(36, 0, 7).act || {}).u));         // r2 49 > 36
    // A miner at its own church, or one our crusader already reaches: left alone.
    const theirs = mk(4102, 1, S.CHURCH, p4[0] + 1, p4[1] + 2);
    if (pass(theirs.x, theirs.y)) assert.ok(![S.CRUSADER, S.PROPHET].includes((run(64, 0, 4, [theirs]).act || {}).u));
    const guard = mk(4103, 0, S.CRUSADER, p4[0] + 1, p4[1] - 1);
    if (pass(guard.x, guard.y)) assert.ok(![S.CRUSADER, S.PROPHET].includes((run(64, 0, 4, [guard]).act || {}).u));
    // DWELL: a pilgrim r2 81 off, out of INTERCEPT_R2, is answered once it has stood 3 turns on its tile.
    const seq = [5, 6, 7, 8].map(t => (run(16, 3, 9, [], t, true).act || {}).u);
    assert.ok(!seq.slice(0, 3).includes(S.PROPHET) && !seq.slice(0, 3).includes(S.CRUSADER), 'early ' + seq);
    assert.strictEqual(seq[3], S.PROPHET);
  } finally { [CFG.INTERCEPT_R2, CFG.INTERCEPT_DWELL] = saved; }
});

test('struct: CHURCH_GUARD_D: a church near its mirror image builds the guard unit first, one far from it does not', () => {
  const saved = [CFG.CHURCH_GUARD_D, CFG.CHURCH_GUARD_UNIT, CFG.ECON_UNTIL];
  try {
    CFG.ECON_UNTIL = 1000;   // no peacetime army: what a church builds first is the guard or the economy
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const sym = detectSymmetry(g.map, g.karbonite_map, g.fuel_map);
    const gap = (x, y) => sym === 'H' ? Math.abs(2 * y - (n - 1)) : Math.abs(2 * x - (n - 1));   // king steps to the mirror
    const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
    const site = want => {   // a passable tile with a free ring, away from the castles, with gap(x, y) in want
      for (let y = 2; y < n - 2; y++) for (let x = 2; x < n - 2; x++)
        if (pass(x, y) && want(gap(x, y)) && offsets(2).every(([dx, dy]) => pass(x + dx, y + dy)) && g.robots.every(r => king(r.x, r.y, x, y) > 6)) return [x, y];
      return null;
    };
    const run = (at, d, unit = S.PROPHET) => {
      CFG.CHURCH_GUARD_D = d; CFG.CHURCH_GUARD_UNIT = unit;
      const church = { id: 4100, team: 0, unit: S.CHURCH, x: at[0], y: at[1], turn: 1, health: 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      const all = g.robots;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, church.x, church.y) <= 100).concat([church]);
      const w = worldFor(g, church); g.robots = all;
      const B = { api: w.api, w, round: 20, birthRound: 20, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 100; w.fuel = 1000;
      return churchTurn(B) || {};
    };
    const near = site(k => k <= 3), far = site(k => k >= 12);
    assert.ok(near && far, 'sites');
    assert.strictEqual(run(near, 8).u, S.PROPHET);
    assert.strictEqual(run(near, 8, S.PREACHER).u, S.PREACHER);
    assert.notStrictEqual(run(near, 0).u, S.PROPHET);   // off: the economy (or nothing) first
    assert.notStrictEqual(run(far, 8).u, S.PROPHET);    // not contested
  } finally { [CFG.CHURCH_GUARD_D, CFG.CHURCH_GUARD_UNIT, CFG.ECON_UNTIL] = saved; }
});

testPreV7('struct: RICH_K: past its guard quota a church builds army only while the bank exceeds the reserves by RICH_K', () => {
  const saved = CFG.RICH_K;
  try {
    let done = false;
    for (let seed = 1; seed <= 12 && !done; seed++) {
      const g = new Game(seed, 100, 20, false, false), n = g.map.length;
      const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
      let at = null;   // a passable tile with a free ring, no depot within 8 king steps, far from every robot
      for (let y = 2; y < n - 2 && !at; y++) for (let x = 2; x < n - 2 && !at; x++) {
        if (!pass(x, y) || !offsets(2).every(([dx, dy]) => pass(x + dx, y + dy)) || g.robots.some(r => king(r.x, r.y, x, y) <= 10)) continue;
        let dep = false;
        for (let yy = Math.max(0, y - 8); yy <= Math.min(n - 1, y + 8) && !dep; yy++)
          for (let xx = Math.max(0, x - 8); xx <= Math.min(n - 1, x + 8); xx++) if (g.karbonite_map[yy][xx] || g.fuel_map[yy][xx]) { dep = true; break; }
        if (!dep && pass(x + 3, y) && pass(x - 3, y)) at = [x, y];
      }
      if (!at) continue;
      done = true;
      const run = (rich, k) => {
        CFG.RICH_K = rich;
        const church = { id: 4100, team: 0, unit: S.CHURCH, x: at[0], y: at[1], turn: 5, health: 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
        const guard = (id, x) => ({ id, team: 0, unit: S.PROPHET, x, y: at[1], turn: 3, health: 20, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
        const all = g.robots;
        g.robots = [church, guard(4101, at[0] + 3), guard(4102, at[0] - 3)];   // round 20: want 2, have 2
        const w = worldFor(g, church); g.robots = all;
        const B = { api: w.api, w, round: 20, birthRound: 15, st: {}, deps: null, clusters: null, rnd: rng(1) };
        w.karbonite = k; w.fuel = 2000;
        return churchTurn(B) || {};
      };
      assert.ok(![S.PROPHET, S.PREACHER, S.CRUSADER].includes(run(200, 150).u), 'RICH_K 200, bank 150: guard full, nothing');
      assert.ok([S.PROPHET, S.PREACHER, S.CRUSADER].includes(run(100, 150).u), 'RICH_K 100, bank 150: a unit');
      assert.ok(![S.PROPHET, S.PREACHER, S.CRUSADER].includes(run(100, 90).u), 'RICH_K 100, bank 90: nothing');
    }
    assert.ok(done, 'a site with no depot near');
  } finally { CFG.RICH_K = saved; }
});

test('struct: CHURCH_SAVE a church leaves a church\'s karbonite in the bank before that round (or that many turns of its own)', () => {
  const saved = CFG.CHURCH_SAVE;
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
    let at = null;   // a church tile beside a depot, with a free ring, far from every robot
    for (let y = 2; y < n - 2 && !at; y++) for (let x = 2; x < n - 2 && !at; x++)
      if (pass(x, y) && offsets(2).some(([dx, dy]) => g.karbonite_map[y + dy][x + dx]) && g.robots.every(r => king(r.x, r.y, x, y) > 10)) at = [x, y];
    assert.ok(at, 'site');
    const run = (save, round, k, turn = 5) => {
      CFG.CHURCH_SAVE = save;
      const church = { id: 4100, team: 0, unit: S.CHURCH, x: at[0], y: at[1], turn, health: 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      const all = g.robots; g.robots = [church];
      const w = worldFor(g, church); g.robots = all;
      const B = { api: w.api, w, round, birthRound: round && round - turn + 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = k; w.fuel = 2000;
      return (churchTurn(B) || {}).u;
    };
    assert.strictEqual(run(0, 50, 60), S.PILGRIM, 'off: a pilgrim from 40 K');
    assert.notStrictEqual(run(150, 50, 60), S.PILGRIM, 'save: not from 60 K at round 50');
    assert.strictEqual(run(150, 50, 90), S.PILGRIM, 'save: from 90 K');
    assert.strictEqual(run(150, 160, 60), S.PILGRIM, 'save: not past its round');
    assert.notStrictEqual(run(150, 0, 60, 5), S.PILGRIM, 'save: a church without the round counts its own turns');
    assert.strictEqual(run(150, 0, 60, 160), S.PILGRIM, '...and stops past them');
  } finally { CFG.CHURCH_SAVE = saved; }
});

test('struct: CHAIN_HOLD_R2: from CHAIN_ROUND a church answers a far attacker only above the chain bank, a near one always', () => {
  const saved = [CFG.CHAIN_HOLD_R2, CFG.CHAIN_ROUND, CFG.CHAIN_K, CFG.ECON_UNTIL, CFG.CHAIN_KEEP, CFG.SERVE_MOVES];
  try {
    CFG.ECON_UNTIL = 1000; CFG.CHAIN_K = 1000;
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
    let at = null;   // a church tile with free tiles 2 and 7 rows toward the enemy (canonical +y), away from the castles
    for (let y = 2; y < n - 9 && !at; y++) for (let x = 2; x < n - 2 && !at; x++)
      if (pass(x, y) && pass(x, y + 2) && pass(x, y + 7) && offsets(2).every(([dx, dy]) => pass(x + dx, y + dy)) &&
        g.robots.every(r => king(r.x, r.y, x, y) > 10)) at = [x, y];
    assert.ok(at, 'site');
    const run = (hold, chainRound, round, dy, k, st = {}) => {
      CFG.CHAIN_HOLD_R2 = hold; CFG.CHAIN_ROUND = chainRound;
      const church = { id: 4100, team: 0, unit: S.CHURCH, x: at[0], y: at[1], turn: 5, health: 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 };
      const enemy = dy ? [{ id: 4999, team: 1, unit: S.PROPHET, x: at[0], y: at[1] + dy, turn: 5, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 }] : [];
      const all = g.robots;
      g.robots = all.filter(r => r.team === 0 && d2(r.x, r.y, church.x, church.y) <= 100).concat([church], enemy);
      const w = worldFor(g, church); g.robots = all;
      const B = { api: w.api, w, round, birthRound: round && round - 4, st, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = k; w.fuel = 5000;
      return (churchTurn(B) || {}).u;
    };
    const mil = u => [S.CRUSADER, S.PROPHET, S.PREACHER].includes(u);
    assert.ok(mil(run(0, 200, 300, 7, 500)), 'off: a far prophet is answered');
    assert.ok(!mil(run(16, 200, 300, 7, 500)), 'hold: a far prophet below the chain bank is not');
    assert.ok(mil(run(16, 200, 300, 7, 1100)), 'hold: above the bank it is');
    assert.ok(mil(run(16, 200, 300, 2, 500)), 'hold: a near prophet always is');
    assert.ok(mil(run(16, 200, 150, 7, 500)), 'hold: before CHAIN_ROUND it is');
    assert.ok(mil(run(16, 0, 300, 7, 500)), 'hold: without chains it is');
    // CHAIN_KEEP: a church that never learned the round (a line church, or its builder shot before its first turn)
    CFG.CHAIN_KEEP = 0;
    assert.ok(mil(run(16, 200, undefined, 7, 500)), 'keep off: a church without the round answers from any bank');
    CFG.CHAIN_KEEP = 1;
    assert.ok(!mil(run(16, 200, undefined, 7, 500)), 'keep: a church without the round holds the bank');
    assert.ok(mil(run(16, 200, 150, 7, 500)), 'keep: one that knows it is before CHAIN_ROUND answers');
    assert.ok(mil(run(16, 0, undefined, 7, 500)), 'keep: without chains it answers');
    CFG.ECON_UNTIL = 0; CFG.SERVE_MOVES = 0;   // the peacetime army decides: no depots to staff
    assert.ok(!mil(run(0, 200, undefined, 0, 500)), 'keep: no peacetime unit below the bank');
    assert.ok(mil(run(0, 200, undefined, 0, 1300)), 'keep: above it, one');
    CFG.CHAIN_KEEP = 0;
    assert.ok(mil(run(0, 200, undefined, 0, 500)), 'keep off: one at 500');
  } finally { [CFG.CHAIN_HOLD_R2, CFG.CHAIN_ROUND, CFG.CHAIN_K, CFG.ECON_UNTIL, CFG.CHAIN_KEEP, CFG.SERVE_MOVES] = saved; }
});

test('combat: canHit: the tiles an enemy can damage this turn without moving (CFG.CHAIN_SAFE)', () => {
  const e = (unit, dx, dy) => canHit({ unit, x: 20 + dx, y: 20 + dy }, 20, 20);
  assert.ok(e(S.PROPHET, 8, 0) && e(S.PROPHET, 4, 0) && !e(S.PROPHET, 3, 0) && !e(S.PROPHET, 8, 1), 'prophet r2 16-64');
  assert.ok(e(S.CRUSADER, 4, 0) && !e(S.CRUSADER, 4, 1), 'crusader r2 16');
  assert.ok(e(S.PREACHER, 5, 1) && e(S.PREACHER, 1, 0) && !e(S.PREACHER, 5, 2), 'preacher r2 16 plus its splash');
  assert.ok(e(S.CASTLE, 8, 0) && !e(S.CASTLE, 8, 1) && !e(S.PILGRIM, 1, 0) && !e(S.CHURCH, 1, 0));
});

test('combat: preacherTarget selfCost (PREACHER_SELF): the 1915 duel, a splash on the shooter is taken only when worth it', () => {
  // Shooter at (33,26); enemy preacher (33,27), enemy church (32,26)... seen in canonical coordinates as in the replay.
  const R = (team, unit, x, y) => ({ team, unit, x, y, seen: true });
  const robots = [R(0, S.PREACHER, 33, 26), R(1, S.PREACHER, 33, 27), R(1, S.CHURCH, 32, 26), R(1, S.PILGRIM, 31, 26), R(0, S.CHURCH, 32, 25)];
  const hitsSelf = t => (t.dx * t.dx + t.dy * t.dy) <= S.STATS[S.PREACHER].splash;
  const d = (t, r) => (33 + t.dx - r.x) ** 2 + (26 + t.dy - r.y) ** 2;
  const old = preacherTarget(33, 26, robots, 0, () => true);
  assert.ok(old && hitsSelf(old), 'default counts the shooter as any friend: ' + JSON.stringify(old));
  assert.ok(!(d((t => t)(preacherTarget(33, 26, robots, 0, () => true, 4)), robots[1]) <= 2), 'self cost alone: church and pilgrim');
  const fixed = preacherTarget(33, 26, robots, 0, () => true, 4, 2.5);
  assert.ok(fixed && !hitsSelf(fixed), JSON.stringify(fixed));
  assert.ok(d(fixed, robots[1]) <= S.STATS[S.PREACHER].splash, 'still hits the enemy preacher');
  // Three enemy military units around the shooter that only a splash on itself reaches together: worth the 20 HP.
  const crowd = [R(0, S.PREACHER, 10, 10), R(1, S.CRUSADER, 9, 10), R(1, S.CRUSADER, 11, 10), R(1, S.PROPHET, 10, 11)];
  const c = preacherTarget(10, 10, crowd, 0, () => true, 4, 2.5);
  assert.ok(c && hitsSelf(c) && c.value === 3.5, JSON.stringify(c));
});

// CFG.CHAIN_ROUND fixtures: a site with a free ring on seed 3, away from the castles, and tiles 9 and 4 king steps
// from it (canonical frame) as chain targets.
function chainFixture() {
  const g = new Game(3, 100, 20, false, false), n = g.map.length;
  const pass = (x, y) => x >= 0 && y >= 0 && x < n && y < n && g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x];
  let ours = null;
  for (let y = 2; y < n - 2 && !ours; y++) for (let x = 2; x < n - 2 && !ours; x++)
    if (pass(x, y) && offsets(2).every(([dx, dy]) => pass(x + dx, y + dy)) && g.robots.every(r => king(r.x, r.y, x, y) > 12)) ours = [x, y];
  const mk = (id, team, unit, x, y, turn = 5) => ({ id, team, unit, x, y, turn, health: S.STATS[unit].hp || 100, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
  const all = g.robots;
  const world = (robots, me) => {
    g.robots = all.filter(r => d2(r.x, r.y, me.x, me.y) <= 100).concat(robots);
    const w = worldFor(g, me); g.robots = all;
    const log = { sent: [], talk: [] };
    w.api.signal = (v, r) => log.sent.push([v, r]); w.api.castleTalk = v => log.talk.push(v);
    return { w, log };
  };
  const w0 = world([mk(4100, 0, S.CHURCH, ours[0], ours[1])], mk(4100, 0, S.CHURCH, ours[0], ours[1])).w;
  const F = bfs(w0, [[w0.me.x, w0.me.y]], offsets(2));
  const at = (k, ok) => { for (let i = 0; i < w0.N; i++) { const x = i % n, y = (i - x) / n; if (F[i] === k && w0.passable(x, y) && ok(x, y)) return [x, y]; } return null; };
  const far = at(9, () => true), near = at(4, (x, y) => d2(x, y, w0.me.x, w0.me.y) <= CFG.CHAIN_END_R2), farther = at(20, () => true);
  const mid = at(15, () => true);
  const mine = (B, act) => B.w.T.toC(ours[0] + act.dx, ours[1] + act.dy);   // canonical tile of a build or move
  // The enemy castle standing on a target (a chain whose target tile is seen empty stops: the castle is gone).
  const castleAt = t => { const [x, y] = w0.T.toE(t[0], t[1]); return mk(4109, 1, S.CASTLE, x, y, 200); };
  return { g, n, ours, mk, world, me: w0.me, far, near, farther, mid, mine, castleAt };
}

testPreV7('chain: a church born in a chain builds the next pilgrim one step nearer, or military aimed at the castle when near', () => {
  const saved = CFG.CHAIN_ROUND;
  try {
    const X = chainFixture();
    assert.ok(X.ours && X.far && X.near, 'fixture');
    const adj = offsets(2).map(([dx, dy]) => [X.ours[0] + dx, X.ours[1] + dy]).find(([x, y]) => X.g.map[y][x]);
    const run = (t, k = 400) => {
      const church = X.mk(4100, 0, S.CHURCH, X.ours[0], X.ours[1], 1), pil = X.mk(4101, 0, S.PILGRIM, adj[0], adj[1]);
      pil.signal = t ? encXY(SIG.CHAIN, t[0], t[1]) : 0; pil.signal_radius = 2;
      const { w, log } = X.world([church, pil].concat(t ? [X.castleAt(t)] : []), church);
      w.karbonite = k; w.fuel = 3000;
      const B = { api: w.api, w, round: 0, birthRound: 0, st: {}, deps: null, clusters: null, rnd: rng(1) };
      return { act: churchTurn(B), B, log };
    };
    CFG.CHAIN_ROUND = 150;
    const a = run(X.far), here = a.B.st.chainF[X.me.y * X.n + X.me.x];
    assert.strictEqual(a.act.u, S.PILGRIM);
    const [px, py] = X.mine(a.B, a.act);
    assert.ok(a.B.st.chainF[py * X.n + px] < here, 'the pilgrim stands nearer');
    assert.deepStrictEqual(a.log.sent, [[encXY(SIG.CHAIN, X.far[0], X.far[1]), 2]]);
    const b = run(X.near);
    assert.strictEqual(b.act.u, CFG.CHAIN_MIX[0]);
    const [ux, uy] = X.mine(b.B, b.act);
    assert.ok(d2(ux, uy, X.near[0], X.near[1]) < d2(X.me.x, X.me.y, X.near[0], X.near[1]), 'toward the castle');
    assert.deepStrictEqual(b.log.sent, [[encXY(SIG.CHAIN, X.near[0], X.near[1]), 2]]);
    assert.strictEqual(run(X.far, 55).act.u, CFG.CHAIN_MIX[0], 'no karbonite for another link: the line ends here');
    CFG.CHAIN_ROUND = 0;
    assert.strictEqual(run(X.far).B.st.chain, undefined, 'switch off: the radio is ignored');
  } finally { CFG.CHAIN_ROUND = saved; }
});

testPreV7('chain: a staged chainer waits for CHAIN_K and CHAIN_F, then builds the first church; it fires early when threatened', () => {
  const saved = CFG.CHAIN_ROUND;
  try {
    CFG.CHAIN_ROUND = 150;
    const X = chainFixture();
    assert.ok(X.farther, 'fixture');
    const run = (t, k, f, extra = []) => {
      const pil = X.mk(4101, 0, S.PILGRIM, X.ours[0], X.ours[1]);
      const { w, log } = X.world([pil, X.castleAt(t), ...extra], pil);
      w.karbonite = k; w.fuel = f;
      const B = { api: w.api, w, round: 200, birthRound: 150, st: { chainer: true }, deps: null, clusters: null, rnd: rng(1) };
      chainStart(B, t);
      const act = pilgrimChain(B, () => 'walk');
      return { act, B, log };
    };
    const wait = run(X.far, 299, 3000);
    assert.strictEqual(wait.act, null, 'staged (9 <= CHAIN_STAGE): holds');
    assert.deepStrictEqual(wait.log.talk, [CT.CHAINER]);
    assert.strictEqual(run(X.far, 300, CFG.CHAIN_F - 1).act, null, 'fuel short: holds');
    const go = run(X.far, 300, CFG.CHAIN_F);
    assert.strictEqual(go.act.u, S.CHURCH);
    const [cx, cy] = X.mine(go.B, go.act);
    assert.ok(go.B.st.chainF[cy * X.n + cx] < go.B.st.chainF[X.me.y * X.n + X.me.x]);
    assert.deepStrictEqual(go.log.sent, [[encXY(SIG.CHAIN, X.far[0], X.far[1]), 2]]);
    assert.strictEqual(go.B.st.chain, null, 'an ordinary pilgrim from now on');
    assert.deepStrictEqual(go.log.talk, [CT.CHAINER, CT.UNIT + S.PILGRIM], 'CHAIN_FAILS off: no fire report');
    const savedFails = CFG.CHAIN_FAILS;
    try { CFG.CHAIN_FAILS = 2; assert.deepStrictEqual(run(X.far, 300, CFG.CHAIN_F).log.talk, [CT.CHAINER, CT.CHAINFIRE]); }
    finally { CFG.CHAIN_FAILS = savedFails; }
    assert.strictEqual(run(X.farther, 300, 3000).act, 'walk', '20 steps out: walks on');
    // An enemy prophet that can shoot it: the line starts now, from here, if a church is affordable.
    const [ex, ey] = X.g.robots.length ? [X.ours[0] + 5, X.ours[1]] : [0, 0];
    const threat = [X.mk(4102, 1, S.PROPHET, ex, ey)];
    if (X.g.map[ey] && X.g.map[ey][ex]) {
      assert.strictEqual(run(X.farther, 60, 300, threat).act.u, S.CHURCH);
      assert.strictEqual(run(X.farther, 40, 300, threat).act, undefined, 'no church affordable: flee as a pilgrim');
      const savedNear = CFG.CHAIN_FIRE_NEAR;
      try {
        CFG.CHAIN_FIRE_NEAR = 1;
        assert.strictEqual(run(X.farther, 60, 300, threat).act, undefined, 'CHAIN_FIRE_NEAR: 20 steps out it flees instead');
        assert.strictEqual(run(X.far, 60, 300, threat).act.u, S.CHURCH, 'CHAIN_FIRE_NEAR: near the line it still fires early');
      } finally { CFG.CHAIN_FIRE_NEAR = savedNear; }
      // CHAIN_SAFE: a prophet 5 tiles off can shoot it before the church acts: no line, staged and ready or early;
      // a crusader there threatens (r2 49) but cannot hit (r2 16): the line starts.
      const savedSafe = CFG.CHAIN_SAFE;
      try {
        CFG.CHAIN_SAFE = 1;
        assert.strictEqual(run(X.far, 1000, CFG.CHAIN_F, threat).act, undefined, 'CHAIN_SAFE: in reach and ready, it flees');
        assert.strictEqual(run(X.farther, 60, 300, threat).act, undefined, 'CHAIN_SAFE: no early line in reach');
        const crus = [X.mk(4102, 1, S.CRUSADER, ex, ey)];
        assert.strictEqual(run(X.far, 1000, CFG.CHAIN_F, crus).act.u, S.CHURCH, 'CHAIN_SAFE: out of reach, the line starts');
        assert.strictEqual(run(X.farther, 60, 300, crus).act.u, S.CHURCH, 'CHAIN_SAFE: threatened out of reach, early');
        CFG.CHAIN_SAFE = 0;
        assert.strictEqual(run(X.far, 1000, CFG.CHAIN_F, threat).act.u, S.CHURCH, 'off: in reach and ready, it fires');
      } finally { CFG.CHAIN_SAFE = savedSafe; }
      // CHAIN_CLEAR 2: two attackers in sight (out of reach) and no line, staged and ready or early; one, the line starts.
      const [fx, fy] = [ex + 1, ey], savedClear = CFG.CHAIN_CLEAR;
      if (X.g.map[fy] && X.g.map[fy][fx]) {
        try {
          CFG.CHAIN_SAFE = 1; CFG.CHAIN_CLEAR = 2;
          const two = [X.mk(4102, 1, S.CRUSADER, ex, ey), X.mk(4103, 1, S.CRUSADER, fx, fy)];
          assert.strictEqual(run(X.far, 1000, CFG.CHAIN_F, two).act, undefined, 'CHAIN_CLEAR: two in sight, it flees');
          assert.strictEqual(run(X.farther, 60, 300, two).act, undefined, 'CHAIN_CLEAR: no early line either');
          assert.strictEqual(run(X.far, 1000, CFG.CHAIN_F, two.slice(0, 1)).act.u, S.CHURCH, 'CHAIN_CLEAR: one, the line starts');
          CFG.CHAIN_CLEAR = 0;
          assert.strictEqual(run(X.far, 1000, CFG.CHAIN_F, two).act.u, S.CHURCH, 'CHAIN_CLEAR off: two, the line starts');
        } finally { CFG.CHAIN_SAFE = savedSafe; CFG.CHAIN_CLEAR = savedClear; }
      } else assert.fail('fixture: the second crusader tile is a wall');
    }
  } finally { CFG.CHAIN_ROUND = saved; }
});

testPreV7('chain: a chainer that gets no nearer stages near the line, and quits far from it', () => {
  const saved = CFG.CHAIN_ROUND;
  try {
    CFG.CHAIN_ROUND = 150;
    const X = chainFixture();
    assert.ok(X.mid && X.farther && 15 <= CFG.CHAIN_STAGE + CFG.CHAIN_SLACK && 20 > CFG.CHAIN_STAGE + CFG.CHAIN_SLACK, 'fixture');
    // still: turns it has already stood without getting nearer; the walk is blocked (go returns null).
    const run = (t, still, k = 0) => {
      const pil = X.mk(4101, 0, S.PILGRIM, X.ours[0], X.ours[1]);
      const { w, log } = X.world([pil, X.castleAt(t)], pil);
      w.karbonite = k; w.fuel = 3000;
      const B = { api: w.api, w, round: 200, birthRound: 150, st: { chainer: true }, deps: null, clusters: null, rnd: rng(1) };
      chainStart(B, t);
      B.st.chainBest = B.st.chainF[X.me.y * X.n + X.me.x]; B.st.chainStill = still;
      return { act: pilgrimChain(B, () => null), B, log };
    };
    assert.strictEqual(run(X.mid, CFG.CHAIN_PATIENCE - 2, 300).act, null, '15 out, not yet patient: walks (blocked)');
    assert.strictEqual(run(X.mid, CFG.CHAIN_PATIENCE - 1, 300).act.u, S.CHURCH, '15 out, patience spent: staged, fires');
    const far = run(X.farther, CFG.CHAIN_PATIENCE - 1, 300);
    assert.strictEqual(far.act, null, '20 out: never staged by patience');
    assert.strictEqual(far.B.st.chain.length, 2);
    const quit = run(X.farther, CFG.CHAIN_GIVEUP - 1, 300);
    assert.strictEqual(quit.act, undefined, 'stuck far CHAIN_GIVEUP turns: an ordinary pilgrim turn');
    assert.strictEqual(quit.B.st.chain, null);
    assert.strictEqual(quit.B.st.chainer, false);
    assert.deepStrictEqual(quit.log.talk, [CT.CHAINER, CT.UNIT + S.PILGRIM], 'the castle hears it is no longer chaining');
  } finally { CFG.CHAIN_ROUND = saved; }
});

testPreV7('chain: a unit born with the chain radio targets the castle and learns the round from a castle in sight', () => {
  const saved = CFG.CHAIN_ROUND;
  try {
    CFG.CHAIN_ROUND = 150;
    const X = chainFixture();
    const adj = offsets(2).map(([dx, dy]) => [X.ours[0] + dx, X.ours[1] + dy]).find(([x, y]) => X.g.map[y][x]);
    const church = X.mk(4100, 0, S.CHURCH, X.ours[0], X.ours[1], 3);
    church.signal = encXY(SIG.CHAIN, X.near[0], X.near[1]); church.signal_radius = 2;
    const pro = X.mk(4101, 0, S.PROPHET, adj[0], adj[1], 1);
    const castle = X.mk(4102, 1, S.CASTLE, X.ours[0] + 1, X.ours[1] + 1 === adj[1] && X.ours[0] + 1 === adj[0] ? X.ours[1] - 1 : X.ours[1] + 1, 237);
    const { w } = X.world([church, pro, castle], pro);
    const B = { api: w.api, w, round: 0, st: {}, deps: null, clusters: null, rnd: rng(2) };
    B.offs = offsets(S.STATS[S.PROPHET].speed); B.nav = new Nav(w, B.offs, B.rnd);
    militaryTurn(B);
    assert.deepStrictEqual(B.st.chainT, X.near);
    assert.strictEqual(B.round, 237);
    // learnRound: a robot on its 4th turn that sees a castle on turn 240 was born in round 237.
    const R = { w: { me: { turn: 4 }, robots: [{ seen: true, unit: S.CASTLE, turn: 240 }] } };
    learnRound(R);
    assert.deepStrictEqual([R.birthRound, R.round], [237, 240]);
  } finally { CFG.CHAIN_ROUND = saved; }
});

test('chain: CHAIN_FAILS holds the lines after that many fired with no enemy castle destroyed since', () => {
  const saved = [CFG.CHAIN_ROUND, CFG.CHAIN_FAILS];
  try {
    CFG.CHAIN_ROUND = 200;
    const st = { order: [{ x: 0, y: 0 }], chainMiss: 2 };
    const B = { w: { me: { x: 0, y: 0 } }, st, round: 500 };
    CFG.CHAIN_FAILS = 0; assert.strictEqual(chainsFailed(st), false, 'off');
    CFG.CHAIN_FAILS = 3; assert.strictEqual(chainsFailed(st), false, '2 misses of 3');
    CFG.CHAIN_FAILS = 2; assert.strictEqual(chainsFailed(st), true);
    assert.strictEqual(chainLaunch(B, () => { throw new Error('built'); }), null, 'no chainer');
    st.chainMiss = 0; assert.strictEqual(chainsFailed(st), false, 'a kill reset the count');
  } finally { [CFG.CHAIN_ROUND, CFG.CHAIN_FAILS] = saved; }
});

test('struct: CHAIN_LIVE holds the chain reserve only while a chainer walks or waits (1), or waits staged (2)', () => {
  const saved = [CFG.CHAIN_LIVE, CFG.SERVE_MOVES];
  try {
    const g = new Game(3, 100, 20, false, false), n = g.map.length;
    const castle = g.robots.find(r => r.team === 0);
    CFG.SERVE_MOVES = 1;   // every served depot is in sight and staffed below: the economy has nothing to build
    let id = 4100;
    for (let y = castle.y - 2; y <= castle.y + 2; y++) for (let x = castle.x - 2; x <= castle.x + 2; x++)
      if (x >= 0 && y >= 0 && x < n && y < n && (g.karbonite_map[y][x] || g.fuel_map[y][x]) && !g.robots.some(q => q.x === x && q.y === y))
        g.robots.push({ id: id++, team: 0, unit: S.PILGRIM, x, y, turn: 3, health: 10, karbonite: 0, fuel: 0, signal: 0, signal_radius: 0, castle_talk: 0 });
    const want = Math.min(CFG.GUARD_MAX, CFG.GUARD_BASE + Math.floor(300 / CFG.GUARD_ROUNDS));
    const turn1 = (live, talk) => {
      CFG.CHAIN_LIVE = live; castle.turn = 300;   // a castle's round is its turn
      const all = g.robots;
      const mine = all.filter(r => d2(r.x, r.y, castle.x, castle.y) <= 100);
      const free = [];   // the guard quota met by our prophets on free tiles in sight
      for (let r2 = 4; r2 <= 100 && free.length < want; r2++) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++)
        if (free.length < want && d2(x, y, castle.x, castle.y) === r2 && g.map[y][x] && !mine.some(q => q.x === x && q.y === y))
          free.push({ id: 4900 + free.length, team: 0, unit: S.PROPHET, x, y, turn: 9, health: 20, signal: 0, signal_radius: 0, castle_talk: 0 });
      // a chainer of another castle's, out of sight (castles hear every robot's status byte)
      const chainer = talk ? [{ id: 4990, team: 0, unit: S.PILGRIM, castle_talk: talk, turn: 30 }] : [];
      g.robots = mine.concat(free);
      const w = worldFor(g, castle); g.robots = all;
      for (const c of chainer) w.unplaced.push({ ...c, x: -1, y: -1, seen: false });
      const B = { api: w.api, w, round: 300, birthRound: 1, st: {}, deps: null, clusters: null, rnd: rng(1) };
      w.karbonite = 600; w.fuel = 2000;   // past CHAIN_ROUND, below CHAIN_K, above RICH_K and the other reserves
      return castleTurn(B);
    };
    assert.ok(CFG.CHAIN_ROUND && CFG.CHAIN_ROUND <= 300 && 600 < CFG.CHAIN_K && 600 > CFG.RICH_K + CFG.DEF_RESERVE_K + 60, 'v8 values');
    const army = a => [S.CRUSADER, S.PROPHET, S.PREACHER].includes((a || {}).u);
    assert.strictEqual(turn1(0, 0), null);                    // default: the chain's bank waits, chainer or none
    assert.ok(army(turn1(1, 0)));                             // 1: no chainer anywhere: the army spends it
    assert.strictEqual(turn1(1, CT.CHAINER), null);           // ...one walks or waits: the bank waits
    assert.strictEqual(turn1(1, CT.STAGED), null);
    assert.ok(army(turn1(2, CT.CHAINER)));                    // 2: one still walking: the army spends it
    assert.strictEqual(turn1(2, CT.STAGED), null);            // ...staged: the bank waits
  } finally { [CFG.CHAIN_LIVE, CFG.SERVE_MOVES] = saved; }
});

test('chain: CHAIN_LIVE 2: a staged chainer reports CT.STAGED, a walking one CT.CHAINER', () => {
  const saved = [CFG.CHAIN_ROUND, CFG.CHAIN_LIVE];
  try {
    CFG.CHAIN_ROUND = 150;
    const X = chainFixture();
    const run = (t, live) => {
      CFG.CHAIN_LIVE = live;
      const pil = X.mk(4101, 0, S.PILGRIM, X.ours[0], X.ours[1]);
      const { w, log } = X.world([pil, X.castleAt(t)], pil);
      w.karbonite = 0; w.fuel = 0;
      const B = { api: w.api, w, round: 200, birthRound: 150, st: { chainer: true }, deps: null, clusters: null, rnd: rng(1) };
      chainStart(B, t);
      return { act: pilgrimChain(B, () => 'walk'), log };
    };
    assert.deepStrictEqual(run(X.far, 0).log.talk, [CT.CHAINER], 'off');
    const staged = run(X.far, 2);
    assert.strictEqual(staged.act, null);
    assert.deepStrictEqual(staged.log.talk, [CT.CHAINER, CT.STAGED]);
    const walk = run(X.farther, 2);
    assert.strictEqual(walk.act, 'walk');
    assert.deepStrictEqual(walk.log.talk, [CT.CHAINER]);
  } finally { [CFG.CHAIN_ROUND, CFG.CHAIN_LIVE] = saved; }
});

test('chain: CHAIN_WALL ends a line church\'s chain at a wall (radio + CT.WALL) or on the radio; castles rest', () => {
  const saved = [CFG.CHAIN_ROUND, CFG.CHAIN_WALL, CFG.CHAIN_WALL_REST, CFG.CHAIN_END_R2];
  try {
    // A line end 4 steps out (r2 49, as v7 had it), so the castle and the wall stand in the church's sight.
    CFG.CHAIN_ROUND = 150; CFG.CHAIN_WALL_REST = 300; CFG.CHAIN_END_R2 = 49;
    const X = chainFixture();
    const adj = offsets(2).map(([dx, dy]) => [X.ours[0] + dx, X.ours[1] + dy]).find(([x, y]) => X.g.map[y][x]);
    // Enemy prophets on free passable tiles r2 9-100 from the church (in its sight), the first k of them.
    const spots = [];
    for (let y = 0; y < X.n; y++) for (let x = 0; x < X.n; x++) {
      const r2 = d2(x, y, X.ours[0], X.ours[1]);
      if (r2 >= 9 && r2 <= 100 && X.g.map[y][x] && !X.g.robots.some(r => r.x === x && r.y === y)) spots.push([x, y]);
    }
    const run = (wall, k, radio) => {
      CFG.CHAIN_WALL = wall;
      const church = X.mk(4100, 0, S.CHURCH, X.ours[0], X.ours[1], 1), pil = X.mk(4101, 0, S.PILGRIM, adj[0], adj[1]);
      pil.signal = encXY(SIG.CHAIN, X.near[0], X.near[1]); pil.signal_radius = 2;
      const foes = spots.filter(([x, y]) => !(x === X.near[0] && y === X.near[1])).slice(0, k).map(([x, y], i) => X.mk(4200 + i, 1, S.PROPHET, x, y));
      const { w, log } = X.world([church, pil, X.castleAt(X.near)].concat(foes), church);
      // A line church out of sight radioing FAR.WALL (the engine keeps x, y and team of a robot in radio range).
      if (radio) w.robots.push({ id: 4300, team: 0, unit: undefined, signal: encXY(0, 3, 3), signal_radius: FAR.WALL, castle_talk: 0, x: 3, y: 3, seen: false });
      w.karbonite = 1000; w.fuel = 3000;
      const B = { api: w.api, w, round: 0, birthRound: 0, st: {}, deps: null, clusters: null, rnd: rng(1) };
      const act = churchTurn(B);
      return { act, B, log };
    };
    assert.ok(X.near && spots.length >= 6, 'fixture');
    const off = run(0, 5, true);
    assert.strictEqual(off.act.u, CFG.CHAIN_MIX[0], 'off: the burst goes on');
    assert.ok(off.B.st.chain, 'off: still in the chain');
    const below = run(6, 5, false);
    assert.strictEqual(below.act.u, CFG.CHAIN_MIX[0], '5 of 6 in sight: the burst goes on');
    assert.ok(below.B.st.chain && !below.log.talk.includes(CT.WALL), '5 of 6: still in the chain, castles not told');
    const at = run(5, 5, false);
    assert.strictEqual(at.B.st.chain, null, '5 of 5: the line ends');
    assert.ok(at.log.talk.includes(CT.WALL), 'castles told');
    assert.ok(at.log.sent.some(([, r]) => r === FAR.WALL), 'the line told');
    const heard = run(6, 0, true);
    assert.strictEqual(heard.B.st.chain, null, 'heard the radio: the line ends');
    assert.ok(!heard.log.talk.includes(CT.WALL) && !heard.log.sent.some(([, r]) => r === FAR.WALL), 'a hearer does not repeat it');
    // Castles: no launch and no chain bank for CHAIN_WALL_REST rounds after a CT.WALL.
    const B = { w: { me: { x: 0, y: 0 } }, st: { order: [{ x: 0, y: 0 }], wallAt: 400 }, round: 500 };
    CFG.CHAIN_WALL = 0; assert.strictEqual(chainsWalled(B), false, 'off');
    CFG.CHAIN_WALL = 28; assert.strictEqual(chainsWalled(B), true);
    assert.strictEqual(chainLaunch(B, () => { throw new Error('built'); }), null, 'resting: no chainer');
    B.round = 700; assert.strictEqual(chainsWalled(B), false, 'rested');
    delete B.st.wallAt; assert.strictEqual(chainsWalled(B), false, 'never walled');
  } finally { [CFG.CHAIN_ROUND, CFG.CHAIN_WALL, CFG.CHAIN_WALL_REST, CFG.CHAIN_END_R2] = saved; }
});

test('chain: with CHAIN_ROUND 0 castles never launch a chainer and the peacetime reserve is unchanged', () => {
  const saved = CFG.CHAIN_ROUND;
  try {
    CFG.CHAIN_ROUND = 0;
    const B = { w: { me: { x: 0, y: 0 } }, st: { order: [{ x: 0, y: 0 }] }, round: 500 };
    assert.strictEqual(chainLaunch(B, () => { throw new Error('built'); }), null);
  } finally { CFG.CHAIN_ROUND = saved; }
});

test('pilgrim: PILGRIM_HERE takes the depot it stands on when its target is taken or hot, else a cold free one', () => {
  const deps = [{ i: 0, x: 2, y: 15, k: true }, { i: 1, x: 2, y: 13, k: false }, { i: 2, x: 1, y: 12, k: true }, { i: 3, x: 9, y: 9, k: false }];
  const B = { deps, st: {} };
  const occAt = taken => (x, y) => { const r = taken.find(([tx, ty]) => tx === x && ty === y); return r ? r[2] : 0; };
  const turn = (target, x, y, enemies, taken = []) => {
    B.st.target = deps[target]; B.w = { me: { id: 9, x, y, turn: 1 }, enemies, occ: occAt([[x, y, 9], ...taken]) };
    hereRetarget(B); return B.st.target.i;
  };
  const prophet = [{ unit: S.PROPHET, x: 1, y: 22 }];   // covers (2,15) (r2 50), not (2,13) (82) or (1,12) (100)
  assert.strictEqual(turn(0, 2, 13, prophet), 1);                  // hot target, standing on a cold depot: mine it
  assert.strictEqual(turn(0, 3, 13, prophet), 1);                  // off any depot: the nearest cold free one
  assert.strictEqual(turn(0, 3, 13, prophet, [[2, 13, 7]]), 2);    // ...not one a robot stands on
  assert.strictEqual(turn(2, 2, 13, [], [[1, 12, 7]]), 1);         // target taken: the depot it stands on
  assert.strictEqual(turn(2, 3, 13, []), 2);                       // free and cold: kept
  assert.strictEqual(turn(2, 2, 13, [{ unit: S.PILGRIM, x: 1, y: 13 }]), 2);   // a pilgrim threatens nothing
  assert.strictEqual(turn(1, 2, 13, prophet), 1);                  // on its target: kept
  const everywhere = [{ unit: S.PREACHER, x: 2, y: 13 }, { unit: S.PROPHET, x: 9, y: 15 }];
  assert.strictEqual(turn(0, 3, 13, everywhere), 0);               // every free depot hot: kept
});

test('pilgrim: PILGRIM_STALL gives up a depot it gets no nearer to, for the free one nearest home, and remembers it', () => {
  const saved = [CFG.PILGRIM_STALL, CFG.PILGRIM_HOT_MEM];
  try {
    CFG.PILGRIM_STALL = 3; CFG.PILGRIM_HOT_MEM = 50;
    const deps = [{ i: 0, x: 20, y: 20, k: true }, { i: 1, x: 3, y: 3, k: true }, { i: 2, x: 9, y: 9, k: false }];
    const B = { deps, st: { target: deps[0], structs: [{ x: 2, y: 2 }] } };
    const turn = (t, x = 10, y = 10) => { B.w = { me: { id: 9, x, y, turn: t }, occ: () => -1 }; stallRetarget(B); return B.st.target.i; };
    // Best set at turn 1; no nearer through turn 4: given up for depot 1, by the structure (depot 2 is nearer us).
    assert.deepStrictEqual([1, 2, 3, 4].map(t => turn(t)), [0, 0, 0, 1]);
    // Getting nearer resets the count; standing on the target is not a stall.
    assert.deepStrictEqual([5, 6, 7, 8, 9].map(t => turn(t, 10 - (t - 5), 10 - (t - 5))), [1, 1, 1, 1, 1]);
    assert.deepStrictEqual([10, 11, 12, 13, 14].map(t => turn(t, 3, 3)), [1, 1, 1, 1, 1]);
    // Depot 0 stays given up for PILGRIM_HOT_MEM turns: the next stall takes depot 2; past the memory, 0 counts again.
    assert.deepStrictEqual([20, 21, 22, 23].map(t => turn(t, 30, 30)), [1, 1, 1, 2]);
    B.st.target = deps[2]; B.st.stallFor = null;
    assert.deepStrictEqual([60, 61, 62, 63].map(t => turn(t, 30, 30)), [2, 2, 2, 0]);
    // Every free depot given up: it keeps its target.
    B.st.target = deps[0]; B.st.stallFor = null; B.st.stallGave = new Map([[1, 70], [2, 70]]);
    assert.deepStrictEqual([70, 71, 72, 73, 74].map(t => turn(t, 30, 30)), [0, 0, 0, 0, 0]);
    // Ground we hold beats a depot near us: with a second structure by depot 3, a pilgrim at (12,12) takes depot 3
    // (2 king steps from a structure, 9 from us) over depot 2 (7 from the nearest structure, 3 from us).
    const deps2 = [...deps, { i: 3, x: 20, y: 3, k: true }];
    const B2 = { deps: deps2, st: { target: deps2[0], structs: [{ x: 2, y: 2 }, { x: 22, y: 3 }], stallGave: new Map([[1, 100]]) } };
    const turn2 = t => { B2.w = { me: { id: 9, x: 12, y: 12, turn: t }, occ: () => -1 }; stallRetarget(B2); return B2.st.target.i; };
    assert.deepStrictEqual([100, 101, 102, 103].map(turn2), [0, 0, 0, 3]);
  } finally { [CFG.PILGRIM_STALL, CFG.PILGRIM_HOT_MEM] = saved; }
});

test('pilgrim: PILGRIM_HOT gives up a depot under a visible attacker for one that is not, and remembers it', () => {
  const saved = [CFG.PILGRIM_HOT, CFG.PILGRIM_HOT_MEM];
  try {
    CFG.PILGRIM_HOT = 3; CFG.PILGRIM_HOT_MEM = 50;
    const deps = [{ i: 0, x: 5, y: 5, k: true }, { i: 1, x: 20, y: 20, k: false }, { i: 2, x: 6, y: 5, k: true }];
    const B = { deps, st: { target: deps[0] } };
    const turn = (t, enemies, x = 5, y = 9) => { B.w = { me: { id: 9, x, y, turn: t }, enemies, occ: () => -1 }; hotRetarget(B); return B.st.target.i; };
    const prophetAt = (x, y) => [{ unit: S.PROPHET, x, y }];
    // (5,12) covers both karbonite depots (r2 49, 50), not the fuel one.
    assert.deepStrictEqual([1, 2, 3].map(t => turn(t, prophetAt(5, 12))), [0, 0, 1]);
    assert.strictEqual(turn(4, []), 1);
    // Now the fuel depot is threatened: depot 0 was given up at turn 3, depot 2 is free and cold.
    assert.deepStrictEqual([5, 6, 7].map(t => turn(t, prophetAt(20, 26))), [1, 1, 2]);
    // A pilgrim (no threat) and a streak broken by a quiet turn do not count.
    B.st.target = deps[2]; B.st.hotN = 0;
    assert.deepStrictEqual([8, 9, 10, 11].map(t => turn(t, t === 9 ? [] : t === 10 ? [{ unit: S.PILGRIM, x: 6, y: 6 }] : prophetAt(5, 12))), [2, 2, 2, 2]);
    // Past PILGRIM_HOT_MEM, a given-up depot counts again.
    B.st.target = deps[1]; B.st.hotN = 0;
    assert.deepStrictEqual([60, 61, 62].map(t => turn(t, [...prophetAt(20, 26), { unit: S.PREACHER, x: 12, y: 5 }])), [1, 1, 0]);
    // An attacker in sight that threatens no depot: getting nearer the target is fine, standing still is stuck.
    const far = prophetAt(0, 15);
    B.st.target = deps[1];
    assert.deepStrictEqual([70, 71, 72, 73].map(t => turn(t, far, 5 + (t - 70), 9 + (t - 70))), [1, 1, 1, 1]);
    assert.deepStrictEqual([74, 75, 76].map(t => turn(t, far, 8, 12)), [1, 1, 0]);
  } finally { [CFG.PILGRIM_HOT, CFG.PILGRIM_HOT_MEM] = saved; }
});

test('military: LATTICE_SPARSE puts at most 2 lattice tiles under any 3x3 preacher splash, a fifth of the tiles', () => {
  const saved = CFG.LATTICE_SPARSE;
  try {
    const scan = () => {
      let worst = 0, tiles = 0;
      for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) {
        if (latticeTile(x, y)) tiles++;
        let k = 0;
        for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) if (latticeTile(x + dx, y + dy)) k++;
        worst = Math.max(worst, k);
      }
      return [worst, tiles];
    };
    CFG.LATTICE_SPARSE = 0; assert.deepStrictEqual(scan(), [5, 200]);
    CFG.LATTICE_SPARSE = 1; assert.deepStrictEqual(scan(), [2, 80]);
  } finally { CFG.LATTICE_SPARSE = saved; }
});
