'use strict';
// Unit tests for the tools: map corpus features, replay reader. Run by tools/unit-tests.sh.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const maps = require('../tools/maps');
const replay = require('../tools/replay');
const FIX = path.join(__dirname, 'fixtures');

test('maps: symmetry detection', () => {
  assert.strictEqual(maps.symmetry([[1, 0], [1, 0]]), 'H');
  assert.strictEqual(maps.symmetry([[1, 1], [0, 0]]), 'V');
  assert.strictEqual(maps.symmetry([[1, 1], [1, 1]]), 'HV');
  assert.strictEqual(maps.symmetry([[1, 0, 0], [0, 0, 0], [0, 0, 0]]), '?');
});

test('maps: bfs king moves around a wall', () => {
  const m = [[true, false, true], [true, false, true], [true, true, true]];
  const d = maps.bfs(m, 0, 0);
  assert.strictEqual(d[0 * 3 + 2], 4); // (0,0)->(0,1)->(1,2)->(2,1)->(2,0)
  assert.strictEqual(d[1], -1);       // wall
});

test('maps: seed features agree with the committed corpus', () => {
  const rows = fs.readFileSync(path.join(__dirname, '..', 'maps', 'corpus.tsv'), 'utf8').trim().split('\n');
  const cols = rows[0].split('\t');
  for (const line of [rows[1], rows[2], rows[7], rows[100]]) {
    const v = line.split('\t'), f = maps.features(+v[0]);
    cols.forEach((c, i) => assert.strictEqual(String(f[c]), v[i], `seed ${v[0]} column ${c}`));
  }
});

test('maps: seed 7 has no castles and is invalid', () => {
  assert.strictEqual(maps.features(7).valid, 0);
});

test('replay: header', () => {
  const h = replay.parseHeader(fs.readFileSync(path.join(FIX, 'example_s2.bc19')));
  assert.deepStrictEqual([h.seed, h.winner, h.reason], [2, 1, 'health']);
  assert.throws(() => replay.parseHeader(Buffer.alloc(7)));
});

test('replay: re-simulation reproduces the live final state', () => {
  const live = JSON.parse(fs.readFileSync(path.join(FIX, 'example_s2.json'), 'utf8'));
  const an = replay.analyze(fs.readFileSync(path.join(FIX, 'example_s2.bc19')));
  assert.strictEqual(an.rounds, live.rounds);
  for (const team of [0, 1]) {
    const L = live.teams[team], F = an.final[team];
    assert.deepStrictEqual(F.units, [0, 1, 2, 3, 4, 5].map(u => L.units[u]), 'units team ' + team);
    assert.strictEqual(F.hp, L.health);
    assert.strictEqual(F.karbonite, L.karbonite);
    assert.strictEqual(F.fuel, L.fuel);
    assert.deepStrictEqual(an.tally[team].built, [0, 1, 2, 3, 4, 5].map(u => L.built[u] - (u === 0 ? live.map.castles : 0)));
  }
});

test('replay: fuel accounting closes', () => {
  // start 500 + 25 per round = spent + final (no trades, no deposits in this fixture)
  const an = replay.analyze(fs.readFileSync(path.join(FIX, 'example_s2.bc19')));
  for (const team of [0, 1]) {
    const T = an.tally[team];
    const spent = T.fuel_move + T.fuel_attack + T.fuel_signal + T.fuel_mine + T.fuel_build;
    assert.strictEqual(500 + 25 * an.rounds + T.deposited_f - spent, an.final[team].fuel, 'team ' + team);
  }
});

test('replay: rounds csv, board, unit life, nav', () => {
  const buf = fs.readFileSync(path.join(FIX, 'example_s2.bc19'));
  const csv = replay.roundsCsv(buf, 100).split('\n');
  assert.strictEqual(csv.length, 1 + 2 * 11); // round 1, 100..1000
  const b = replay.boardAt(buf, 1).split('\n');
  assert.strictEqual(b.length, 2 + 46);
  assert.strictEqual(b.slice(2).join('').split('C').length - 1, 2);
  assert.match(replay.nav(buf), /blue\tcrusader\t6\t/);
  const ev = replay.events(buf, 0, 50, ['build']).split('\n').filter(Boolean);
  const id = +ev[0].match(/builds crusader#(\d+)/)[1];
  assert.match(replay.unitLife(buf, id), /^robot \d+: blue crusader/);
});

test('paired: discordant cells, net and t; mismatched cells ignored', () => {
  const { pairedRead } = require('../tools/paired');
  const row = (a, seed, side, w, b = 'o') => ({ a_hash: a, b_hash: b, seed, a_side: side, winner_is_a: w });
  const rows = [row('c', 1, 'red', 1), row('k', 1, 'red', 0), row('c', 2, 'red', 1), row('k', 2, 'red', 1),
    row('c', 3, 'red', 0), row('k', 3, 'red', 1), row('c', 4, 'red', 1), row('k', 4, 'red', 0), row('c', 5, 'blue', 1)];
  const r = pairedRead(rows, 'c', 'k');
  assert.deepStrictEqual([r.cells, r.gained, r.lost, r.D, r.net], [4, 2, 1, 3, 1]);
  assert.ok(Math.abs(r.t - 1 / Math.sqrt(3)) < 1e-9);
  assert.strictEqual(pairedRead(rows, 'c', 'zz').cells, 0);
});

test('progress: renders one series per opponent', () => {
  const { render } = require('../tools/progress.js');
  const svg = render([{ version: 'v1', opponent: 'example', games: 4, wins: 3 }, { version: 'v2', opponent: 'example', games: 4, wins: 4 }, { version: 'v2', opponent: 'v1', games: 2, wins: 1 }]);
  assert.ok(svg.startsWith('<svg')); assert.strictEqual((svg.match(/<polyline/g) || []).length, 1);
  assert.strictEqual((svg.match(/<circle/g) || []).length, 3);
});
