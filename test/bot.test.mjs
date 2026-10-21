// Unit tests for the bot's pure modules (src/bot). Run by tools/unit-tests.sh.
import test from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';
import * as S from '../src/bot/specs.js';
import { offsets, rng, d2, king } from '../src/bot/util.js';
import { symmetry, mirror, depots, clusters, kingField } from '../src/bot/mapinfo.js';
import { moveField, step } from '../src/bot/nav.js';
import { encXY, encNum, dec, SIG } from '../src/bot/comms.js';
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

test('mapinfo: symmetry and mirror agree with engine maps', () => {
  for (const seed of [1, 2, 3, 5, 8, 13]) {
    const g = new Game(seed, 100, 20, false, false);
    const sym = symmetry(g.map, g.karbonite_map, g.fuel_map), n = g.map.length;
    assert.ok(sym === 'H' || sym === 'V', 'seed ' + seed + ' ' + sym);
    // Every red castle mirrors onto a blue castle.
    for (const r of g.robots.filter(r => r.team === 0)) {
      const [x, y] = mirror(r.x, r.y, sym, n);
      assert.ok(g.robots.some(b => b.team === 1 && b.x === x && b.y === y), 'seed ' + seed);
    }
  }
});

test('mapinfo: clusters partition depots and sites are free tiles', () => {
  const g = new Game(2, 100, 20, false, false);
  const deps = depots(g.karbonite_map, g.fuel_map), cs = clusters(g.map, g.karbonite_map, g.fuel_map, deps, 18);
  assert.strictEqual(cs.reduce((s, c) => s + c.depots.length, 0), deps.length);
  for (const c of cs) { const [x, y] = c.site; assert.ok(g.map[y][x] && !g.karbonite_map[y][x] && !g.fuel_map[y][x]); }
  cs.forEach((c, i) => assert.strictEqual(c.i, i));
});

test('mapinfo: kingField', () => {
  const p = [[true, false, true], [true, false, true], [true, true, true]];
  const f = kingField(p, 0, 0);
  assert.strictEqual(f[2], 4); assert.strictEqual(f[1], -1);
});

test('nav: moveField and step descend toward the target', () => {
  const n = 8, pass = Array.from({ length: n }, () => Array(n).fill(true));
  for (let y = 0; y < 7; y++) pass[y][4] = false; // a wall with a gap at the bottom
  const offs = offsets(4), f = moveField(pass, [[7, 0]], offs);
  assert.ok(f[0] > 0);
  const empty = Array.from({ length: n }, () => Array(n).fill(0));
  let x = 0, y = 0, steps = 0;
  const r = rng(1);
  while ((x !== 7 || y !== 0) && steps < 30) { const s = step(f, n, x, y, offs, empty, 4, r); assert.ok(s, 'stuck at ' + x + ',' + y); x += s[0]; y += s[1]; assert.ok(pass[y][x]); steps++; }
  assert.strictEqual(steps, f[0]);
  // Occupied tiles are not entered; unseen tiles (-1) are not entered.
  const block = empty.map(row => row.slice()); block[1][1] = 7;
  const s = step(moveField(pass, [[1, 1]], offs), n, 0, 0, offs, block, 4, r);
  assert.ok(!(s && s[0] === 1 && s[1] === 1));
});

test('comms: encode/decode', () => {
  const m = dec(encXY(SIG.CHURCH, 63, 5)); assert.deepStrictEqual([m.type, m.x, m.y], [SIG.CHURCH, 63, 5]);
  assert.strictEqual(dec(encNum(SIG.ROUND, 999)).v, 999);
  assert.ok(encXY(15, 63, 63) < 65536);
});

test('combat: target choice, preacher splash avoids friends, retreat', () => {
  const es = [{ id: 9, unit: 2, x: 5, y: 0, team: 1 }, { id: 4, unit: 5, x: 0, y: 3, team: 1 }, { id: 3, unit: 5, x: 3, y: 0, team: 1 }];
  assert.strictEqual(pickTarget(3, 0, 0, es).id, 3); // preachers first, then closer
  assert.strictEqual(pickTarget(4, 0, 0, es).id, 9); // prophet min range 16 excludes the preachers
  const robots = [{ id: 1, unit: 5, x: 0, y: 0, team: 0 }, { id: 2, unit: 3, x: 3, y: 0, team: 1 }, { id: 5, unit: 2, x: 2, y: 1, team: 0 }];
  const t = preacherTarget(0, 0, robots, 0, () => true);
  assert.ok(t); assert.ok(d2(t.dx, t.dy, 3, 0) <= 3); assert.ok(d2(t.dx, t.dy, 2, 1) > 3);
  const s = retreatStep(5, 5, [{ unit: 3, x: 7, y: 5 }], offsets(4), 4, () => true);
  assert.ok(s && s[0] < 0);
});
