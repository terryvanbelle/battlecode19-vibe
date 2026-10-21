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

test('paired: round-0 init failures (machine load) are skipped', () => {
  const { pairedRead } = require('../tools/paired.js');
  const row = (a, seed, w, extra = {}) => ({ a_hash: a, b_hash: 'o', seed, a_side: 'red', winner_is_a: w, reason: 'castles', rounds: 400, ...extra });
  const rows = [row('c', 1, 1), row('k', 1, 0), row('c', 2, 1, { rounds: 0, reason: 'init_failure' }), row('k', 2, 0)];
  const r = pairedRead(rows, 'c', 'k');
  assert.strictEqual(r.cells, 1);
});

test('jobq: add and status list pending jobs in order', () => {
  const { execFileSync } = require('child_process');
  const os = require('os');
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'jobq-'));
  const run = (...a) => execFileSync('bash', [path.join(__dirname, '..', 'tools', 'jobq.sh'), ...a], { env: { ...process.env, HOME: home }, encoding: 'utf8' });
  run('add', 'echo one'); run('add', 'echo two');
  const s = run('status');
  assert.ok(s.indexOf('echo one') >= 0 && s.indexOf('echo one') < s.indexOf('echo two'));
  assert.ok(/runner: DOWN/.test(s));
  fs.rmSync(home, { recursive: true, force: true });
});

test('build_bot: --cfg overrides land in the bundle; unknown keys are refused', async () => {
  const { build } = require('../tools/build_bot.js');
  const os = require('os');
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'bb-'));
  await build(path.join(__dirname, '..', 'src', 'bot'), out, { cfg: { RUSH: 7 } });
  assert.ok(/Object\.assign\(CFG,\s*\{\s*RUSH:\s*7\s*\}\)/.test(fs.readFileSync(path.join(out, 'robot.js'), 'utf8')));
  await assert.rejects(build(path.join(__dirname, '..', 'src', 'bot'), out, { cfg: { NO_SUCH_KEY: 1 } }), /unknown CFG key/);
  fs.rmSync(out, { recursive: true, force: true });
});

test('basics: --team auto reads team A side from a batch replay name', () => {
  const { teamOf } = require('../tools/basics.js');
  assert.strictEqual(teamOf('auto', 'out/rp/aaa_bbb_1154_blue.bc19'), 1);
  assert.strictEqual(teamOf('auto', 'aaa_bbb_7_red.bc19'), 0);
  assert.strictEqual(teamOf('blue', 'x.bc19'), 1);
  assert.strictEqual(teamOf('red', 'x_blue.bc19'), 0);
  assert.throws(() => teamOf('auto', 'game.bc19'));
});
