// Unit tests for the bot's pure modules (src/bot). Run by tools/unit-tests.sh.
import test from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';
import * as S from '../src/bot/specs.js';
import { offsets, rng, d2, king } from '../src/bot/util.js';
import { depots, clusters, bfs, costField } from '../src/bot/mapinfo.js';
import { Nav, fuelStep } from '../src/bot/nav.js';
import { encXY, encNum, dec, SIG, FAR, CT, decFarRobot } from '../src/bot/comms.js';
import { nextTarget, isChoke } from '../src/bot/military.js';
import { callDue } from '../src/bot/castle.js';
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
  // castle talk ranges never overlap: unit status 64..69, kill reports 72..75, churches 128+
  assert.ok(CT.UNIT + 5 < CT.DEAD && CT.DEAD + 3 < CT.CHURCH);
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
