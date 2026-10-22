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

test('paired: --h2h pairs the two sides of a seed; load-contaminated rows are skipped', () => {
  const { h2hRead, pairedRead } = require('../tools/paired.js');
  const row = (seed, side, w, extra = {}) => ({ a_hash: 'c', b_hash: 'k', seed, a_side: side, winner_is_a: w, reason: 'castles', rounds: 400, a_team: { init_fail: 0 }, b_team: { init_fail: 0 }, ...extra });
  const rows = [row(1, 'red', 1), row(1, 'blue', 1), row(2, 'red', 0), row(2, 'blue', 1), row(3, 'red', 0), row(3, 'blue', 0),
    row(4, 'red', 1), row(4, 'blue', 1), row(5, 'red', 1), row(5, 'blue', 1, { b_team: { init_fail: 40 } })];
  const r = h2hRead(rows);
  assert.deepStrictEqual([r.cells, r.gained, r.lost, r.split, r.net, r.D, r.skipped, r.games, r.wins], [4, 2, 1, 1, 1, 3, 1, 9, 6]);
  const p = [{ a_hash: 'c', b_hash: 'o', seed: 1, a_side: 'red', winner_is_a: 1, rounds: 400, a_team: { init_fail: 2 } },
    { a_hash: 'k', b_hash: 'o', seed: 1, a_side: 'red', winner_is_a: 0, rounds: 400 }];
  assert.strictEqual(pairedRead(p, 'c', 'k').cells, 0);
});

test('run_game: --timescale stretches the vm2 kill, --init-ms only the sandbox-creation limit', () => {
  const Game = require('../engine/node_modules/bc19/game.js'), SPECS = require('../engine/node_modules/bc19/specs.json');
  const { setLimits, parseArgs } = require('../tools/run_game.js');
  const base = SPECS.TURN_MAX_TIME;
  try {
    const a = parseArgs(['node', 'run_game.js', '-r', 'x', '-b', 'y', '--timescale', '2', '--init-ms', '1000']);
    const g = new Game(3, a.chi * a.timescale, a.che * a.timescale, false, false);
    assert.deepStrictEqual(setLimits(g, a), { init_ms: 1000, turn_kill_ms: base * 2 });
    assert.strictEqual(g.chess_initial, 1000);
    const r = g.initializeRobot();
    assert.strictEqual(r.time, SPECS.CHESS_INITIAL * 2);   // the robot's own clock is unchanged
    const b = parseArgs(['node', 'run_game.js', '-r', 'x', '-b', 'y']), h = new Game(3, b.chi, b.che, false, false);
    assert.deepStrictEqual(setLimits(h, b), { init_ms: SPECS.CHESS_INITIAL, turn_kill_ms: base });
  } finally { SPECS.TURN_MAX_TIME = base; }
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

test('replay: threat report finds each structure\'s first enemy combat unit in view', () => {
  const rows = replay.threats(fs.readFileSync(path.join(FIX, 'example_s2.bc19')));
  assert.equal(rows.length, 4);
  const hit = rows.filter(s => s.round !== null);
  assert.equal(hit.length, 1);
  const s = hit[0];
  assert.deepEqual([s.id, s.team, s.round, s.near[3], s.karbonite], [812, 0, 603, 1, 100]);
  assert.match(replay.threatText(rows), /castle#812 \(3,39\): first threat r603 \(crus 1\) K 100/);
});

test('replay: fire efficiency per shooter type adds up to the fuel tally', () => {
  const buf = fs.readFileSync(path.join(FIX, 'rush_s2908_r80.bc19'));   // h6 (red) vs bots/rush, first 80 rounds
  const rows = replay.fire(buf), an = replay.analyze(buf);
  for (const team of [0, 1]) assert.strictEqual(rows.filter(a => a.team === team).reduce((s, a) => s + a.fuel, 0), an.tally[team].fuel_attack);
  const pro = rows.find(a => a.team === 0 && a.unit === 4);
  assert.deepStrictEqual([pro.shots, pro.fuel, pro.enemy, pro.kills], [43, 1075, 430, 10]);   // prophets: 0.40 damage per fuel
  assert.match(replay.fireText(rows), /red\tpreacher\t3\t45\t50\t0\t2\t1\.11/);
  assert.strictEqual(replay.fire(buf, 0, 20).length, 0);   // the rush arrives at round 30
});
