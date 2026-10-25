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

test('replay: moves per 100 rounds add up to the move fuel; back-and-forth fuel is part of it', () => {
  const buf = fs.readFileSync(path.join(FIX, 'example_s2.bc19'));
  const rows = replay.moves(buf, 100), tl = replay.timeline(buf, []);
  for (const team of [0, 1]) {
    const mine = rows.filter(a => a.team === team), total = mine.reduce((s, a) => s + a.fuel.reduce((x, y) => x + y, 0), 0);
    assert.strictEqual(total, tl.find(r => r.team === team).move_fuel);
    assert.ok(mine.every(a => a.back >= 0 && a.back <= a.fuel.reduce((x, y) => x + y, 0)));
  }
  assert.ok(/\tback$/.test(replay.movesText(rows).split('\n')[0]));
});

test('replay: young deaths: built matches the summary; with no age limit every military loss counts', () => {
  const buf = fs.readFileSync(path.join(FIX, 'chain_s2013_407-3.bc19'));
  const an = replay.analyze(buf), all = replay.young(buf, 1e9), y3 = replay.young(buf), y0 = replay.young(buf, 0);
  for (const team of [0, 1]) for (const unit of [3, 4, 5]) {
    const pick = rows => rows.find(a => a.team === team && a.unit === unit) || { built: 0, young: 0, young_k: 0 };
    assert.strictEqual(pick(all).built, an.tally[team].built[unit]);
    assert.strictEqual(pick(all).young, an.tally[team].lost[unit]);
    assert.ok(pick(y0).young <= pick(y3).young && pick(y3).young <= pick(all).young);
  }
  assert.strictEqual(replay.youngText(y3).split('\n')[0].split('\t')[4], 'dead_within_3');
  assert.match(replay.youngText(y3), /^red\tall\t88\t2260\t7\t190\t0\.08$/m);
});

test('replay: diverge finds the first robot-turn that acts differently; identical replays give null', () => {
  const buf = fs.readFileSync(path.join(FIX, 'example_s2.bc19'));
  assert.strictEqual(replay.diverge(buf, buf), null);
  const acts = []; replay.simulate(buf, { onTurn(ev) { acts.push(ev.rec.action); } });
  const k = acts.findIndex((a, i) => i > 200 && a === 1), b2 = Buffer.from(buf);
  b2.fill(0, 6 + 8 * k, 14 + 8 * k);
  const d = replay.diverge(buf, b2);
  assert.strictEqual(d.turn, k);
  assert.strictEqual(d.a.id, d.b.id);
  assert.match(d.a.act, /^1,/);
  assert.match(d.b.act, /^0,/);
  assert.match(replay.divergeText(d), /^first difference at robot-turn \d+, round \d+\n  A: (red|blue) \w+ #\d+ action 1,/);
  const short = buf.subarray(0, 6 + 8 * 100), e = replay.diverge(buf, short);
  assert.strictEqual(e.turn, 100);
  assert.strictEqual(e.b, null);
  // --team: only that team's turns count; the other team's change is invisible to it.
  const t = d.a.team, mine = replay.diverge(buf, b2, { team: t }), other = replay.diverge(buf, b2, { team: 1 - t });
  assert.strictEqual(mine.a.id, d.a.id);
  assert.strictEqual(mine.round, d.round);
  assert.ok(mine.turn <= d.turn);
  assert.ok(!other || other.round >= d.round);
  // --board: a turn that differs only in its castle talk (or radio) is not a difference.
  const j = 60, b3 = Buffer.from(buf);
  b3[6 + 8 * j + 4] ^= 2;   // castle talk's low bit is bit 1 of the record's fifth byte (engine action_record.js)
  const r = replay.diverge(buf, b3), rb = replay.diverge(buf, b3, { board: true });
  assert.strictEqual(r.turn, j);
  assert.strictEqual(rb, null);
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
  // --replays: cells whose two games are one game; unknown (no replays) counts as not identical.
  assert.strictEqual(r.identical, undefined);
  assert.strictEqual(h2hRead(rows, (a, b, seed) => a === 'c' && b === 'k' && seed === 2 ? true : seed === 3 ? null : false).identical, 1);
  const os = require('os'), dir = fs.mkdtempSync(path.join(os.tmpdir(), 'paired-'));
  for (const [seed, red, blue] of [[1, 'x', 'y'], [2, 'same', 'same']]) {
    fs.writeFileSync(path.join(dir, `c_k_${seed}_red.bc19`), red); fs.writeFileSync(path.join(dir, `c_k_${seed}_blue.bc19`), blue);
  }
  const f = path.join(dir, 'rows.jsonl'); fs.writeFileSync(f, rows.map(x => JSON.stringify(x)).join('\n') + '\n');
  const out = JSON.parse(require('child_process').execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'paired.js'), f, '--h2h', '--replays', dir], { encoding: 'utf8' }));
  assert.deepStrictEqual([out.identical, out.cells, out.D], [1, 4, 3]);
  fs.rmSync(dir, { recursive: true });
});

test('paired: screen verdict: castles lost by sign-flip, exceptions against the control, t <= -1.5', () => {
  const { h2hRead, signFlip } = require('../tools/paired.js');
  // [2, -1, 0, 3]: of the 8 sign patterns on 2, 1, 3, two reach the observed sum 4.
  assert.deepStrictEqual(signFlip([2, -1, 0, 3]), { cells: 4, nonzero: 3, sum: 4, p: 0.25 });
  assert.strictEqual(signFlip([]).p, 1);
  const team = (alive, extra = {}) => ({ init_fail: 0, units: { 0: alive }, turns: 1000, ...extra });
  // Five seeds, both sides; the candidate (a) loses one castle more than the control in every seed's red game.
  const row = (seed, side, w, a, b) => ({ a_hash: 'c', b_hash: 'k', seed, a_side: side, winner_is_a: w, reason: 'castles',
    rounds: 400, map: { castles: 3 }, a_team: a, b_team: b });
  const rows = [];
  for (let s = 1; s <= 5; s++) rows.push(row(s, 'red', 1, team(2), team(3)), row(s, 'blue', 0, team(3), team(3)));
  let r = h2hRead(rows);
  assert.deepStrictEqual([r.castles.cand_lost, r.castles.ctrl_lost, r.castles.nonzero, r.castles.p], [5, 0, 5, 0.0313]);
  assert.strictEqual(r.verdict, 'REJECT: castles lost +5 (sign-flip p 0.0313)');
  // A caught exception the control does not have rejects; frozen turns are reported per million turns, not judged.
  rows[0].a_team = team(3, { exc_caught: 1 }); rows[1].b_team = team(3, { frozen: 4 });
  for (const x of rows) if (x.a_side === 'red') x.a_team = { ...x.a_team, units: { 0: 3 } };
  r = h2hRead(rows);
  assert.strictEqual(r.verdict, 'REJECT: exc_caught 1 vs 0');
  assert.strictEqual(r.basics.ctrl.frozen_per_M, 400);
  rows[0].a_team.exc_caught = 0;
  assert.strictEqual(h2hRead(rows).verdict, 'pass to the panel');
  // Rows without unit counts: no castles test.
  assert.strictEqual(h2hRead(rows.map(x => ({ ...x, a_team: { init_fail: 0 } }))).castles, null);
  // t <= -1.5: three seeds lost from both sides, none gained.
  for (let s = 1; s <= 3; s++) for (const x of rows) if (x.seed === s) x.winner_is_a = 0;
  assert.ok(/^REJECT: t -1\.73/.test(h2hRead(rows).verdict));
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

test('run_game: --init-ms bounds the bundle\'s load under vm2; turns keep the per-turn kill', () => {
  const SPECS = require('../engine/node_modules/bc19/specs.json'), { loadLimit } = require('../tools/run_game.js');
  const base = SPECS.TURN_MAX_TIME;
  function Stub() { this.vm = { timeout: SPECS.TURN_MAX_TIME, run: () => this.vm.timeout }; }
  Stub.prototype.turn = function () { return this.vm.run(); };
  const create = loadLimit(Stub, 1000);
  const s = create(() => new Stub());
  assert.deepStrictEqual([s.vm.timeout, SPECS.TURN_MAX_TIME], [1000, base]);
  assert.strictEqual(s.turn(), base);
  assert.throws(() => create(() => { throw new Error('load'); }), /load/);
  assert.strictEqual(SPECS.TURN_MAX_TIME, base);
  // A bundle that spends 300 ms loading: killed by vm2's 200 ms without --init-ms, alive with --init-ms.
  const { execFileSync } = require('child_process'), os = require('os');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'slow-'));
  try {
    fs.writeFileSync(path.join(dir, 'robot.js'), "import {BCAbstractRobot} from 'battlecode';\n" +
      'class MyRobot extends BCAbstractRobot {\n' +
      '  constructor() { super(); const t0 = Date.now(); this.n = 0; while (Date.now() - t0 < 300) this.n++; }\n' +
      '  turn() { return null; }\n}\n');
    const play = (...x) => JSON.parse(execFileSync(process.execPath, ['tools/run_game.js', '--red', dir, '--blue', 'bots/v6',
      '--seed', '2202', '--max-rounds', '3', ...x], { cwd: path.join(__dirname, '..'), encoding: 'utf8' }).trim().split('\n').pop());
    const slow = play('--init-ms', '5000'), killed = play('--chi', '5000');   // 5000: the suite runs files in parallel
    const initErr = t => Object.keys(t.err_kinds).some(k => /^Failed to initialize: .*timed out/.test(k));
    assert.deepStrictEqual([initErr(slow.teams[0]), slow.teams[0].turns > 0, slow.turn_kill_ms], [false, true, base]);
    assert.strictEqual(killed.reason, 'init_failure');   // the 200 ms kill applies without --init-ms
    assert.ok(initErr(killed.teams[0]));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('run_game: --turnlog lists each turn over --turnlog-ms with its robot and clock bank', () => {
  const { execFileSync } = require('child_process'), os = require('os');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tlog-'));
  try {
    fs.writeFileSync(path.join(dir, 'robot.js'), "import {BCAbstractRobot} from 'battlecode';\n" +
      'class MyRobot extends BCAbstractRobot {\n' +
      '  turn() { let x = 0; for (let i = 0; i < 2e7; i++) x += i % 7; this.x = x; return null; }\n}\n');   // ~60 ms
    const log = path.join(dir, 'turns.jsonl');
    execFileSync(process.execPath, ['tools/run_game.js', '--red', dir, '--blue', 'bots/v6', '--seed', '2202',
      '--max-rounds', '3', '--chi', '5000', '--turnlog', log, '--turnlog-ms', '20'],
      { cwd: path.join(__dirname, '..'), encoding: 'utf8' });
    const all = fs.readFileSync(log, 'utf8').trim().split('\n').map(l => JSON.parse(l));
    const rows = all.filter(r => r.team === 0);   // blue's v6 has slow turns of its own
    assert.ok(all.every(r => r.ms > 20 && [0, 1].includes(r.team)));
    assert.ok(rows.length >= 6 && rows.every(r => r.unit === 0 && r.ms < 1000));   // two castles, rounds 1-4
    assert.ok(rows.every(r => r.bank > r.ms && r.bank <= 5000 + 20 * r.turn));   // the clock before the turn's charge
    assert.ok(rows.some(r => r.round >= 2));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
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
  const src = path.join(__dirname, '..', 'src', 'bot'), read = () => fs.readFileSync(path.join(out, 'robot.js'), 'utf8');
  await build(src, out, { cfg: { RUSH: 7 }, noMinify: true });
  assert.ok(/"RUSH":7[,}]/.test(read()), 'override written into the CFG literal');
  await assert.rejects(build(src, out, { cfg: { NO_SUCH_KEY: 1 } }), /unknown CFG key/);
  // An override equal to the default builds the plain bundle byte for byte (CFG stays a constant, so terser drops
  // the code of switches that are off), and the bundle stays under the size that failed init (LEARNINGS 3).
  await build(src, out); const plain = read();
  await build(src, out, { cfg: { PIONEER_TIMEOUT_REST: 0 } });
  assert.strictEqual(read(), plain);
  assert.ok(plain.length < 48000, `bundle ${plain.length} bytes`);
  fs.rmSync(out, { recursive: true, force: true });
});

test('batch: --max-rounds passes through to the runner; absent, games run to the engine limit', () => {
  const { parse } = require('../tools/batch.js');
  const base = ['node', 'batch.js', '--a', 'x', '--b', 'y', '--out', 'o.jsonl', '--seeds', '1706,53'];
  assert.strictEqual(parse([...base, '--max-rounds', '150']).maxRounds, '150');
  assert.strictEqual(parse(base).maxRounds, undefined);
  assert.deepStrictEqual(parse(base).seeds, [1706, 53]);
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

test('replay: timeline snapshots match the tally and the final state', () => {
  const buf = fs.readFileSync(path.join(FIX, 'rush_s2908_r80.bc19'));
  const rows = replay.timeline(buf, [25, 50]), an = replay.analyze(buf);
  assert.deepStrictEqual(rows.map(r => r.round), [25, 25, 50, 50, 80, 80]);   // checkpoints, then the last round
  for (const team of [0, 1]) {
    const last = rows.filter(r => r.team === team).pop(), T = an.tally[team], F = an.final[team];
    assert.strictEqual(last.mined_k, T.mined_k); assert.strictEqual(last.mined_f, T.mined_f);
    assert.strictEqual(last.move_fuel, T.fuel_move);
    assert.deepStrictEqual([last.castle, last.church, last.pilgrim, last.army, last.karbonite, last.fuel],
      [F.units[0], F.units[1], F.units[2], F.units[3] + F.units[4] + F.units[5], F.karbonite, F.fuel]);
    assert.deepStrictEqual([last.crusader, last.prophet, last.preacher], [F.units[3], F.units[4], F.units[5]]);
    const r25 = rows.find(r => r.team === team && r.round === 25);
    assert.ok(r25.mined_k <= last.mined_k && r25.mined_f <= last.mined_f);
  }
  assert.match(replay.timelineText(rows), /^== RED\nround\tcastle\tchurch\tpilgrim\tarmy\tcrusader\tprophet\tpreacher\tmined_k/);
});

// A generous clock (timescale 20): on a throttled machine a frozen robot would part the two games for clock reasons.
test('run_game: bot code runs only without network; a direct call re-runs itself inside unshare -rn', () => {
  const { execFileSync } = require('child_process');
  const probe = 'process.stdout.write(String(require("./tools/run_game.js").netIsolated()))';
  const cwd = path.join(__dirname, '..');
  assert.strictEqual(execFileSync('unshare', ['-rn', process.execPath, '-e', probe], { cwd, encoding: 'utf8' }), 'true');
  // Where netlink is forbidden (the replica's saturn unit), the check reads /proc/net/dev: lo alone inside unshare -rn.
  const noNetlink = 'require("os").networkInterfaces = () => { throw new Error("EAFNOSUPPORT"); };' + probe;
  assert.strictEqual(execFileSync('unshare', ['-rn', process.execPath, '-e', noNetlink], { cwd, encoding: 'utf8' }), 'true');
  assert.strictEqual(execFileSync(process.execPath, ['-e', noNetlink], { cwd, encoding: 'utf8' }), 'false');
  // A 2-round game started without unshare reports that it ran isolated.
  const line = execFileSync(process.execPath, ['tools/run_game.js', '--red', 'bots/v3', '--blue', 'bots/v2', '--seed', '2202',
    '--max-rounds', '2', '--timescale', '20', '--init-ms', '10000'], { cwd, encoding: 'utf8' });
  const r = JSON.parse(line.trim().split('\n').pop());
  assert.deepStrictEqual([r.net_isolated, r.rounds >= 2], [true, true]);
});

test('run_game: --fast-turn replays byte for byte the game the engine path plays (--det, 40 rounds)', () => {
  const { execFileSync } = require('child_process'), os = require('os');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastturn-'));
  try {
    const play = (...x) => {
      const out = path.join(dir, (x.length ? 'fast' : 'slow') + '.bc19');
      const line = execFileSync('unshare', ['-rn', process.execPath, path.join(__dirname, '..', 'tools', 'run_game.js'),
        '--red', 'bots/v3', '--blue', 'bots/v2', '--seed', '2202', '--max-rounds', '40', '--det', '--timescale', '20',
        '--init-ms', '10000', '--replay', out, ...x], { cwd: path.join(__dirname, '..'), encoding: 'utf8' });
      return [JSON.parse(line), fs.readFileSync(out)];
    };
    const { fastTurn } = require('../tools/run_game.js'), calls = [];
    function Stub() { this.vm = { setGlobal: (k, v) => calls.push(['set', k, v]), run: s => (calls.push(['run', typeof s]), 7) }; }
    fastTurn(Stub);
    assert.strictEqual(new Stub().turn('robot._do_turn({"id":1});'), 7);
    new Stub().turn('robot.other();');
    assert.deepStrictEqual(calls, [['set', '__bc19_view', '{"id":1}'], ['run', 'object'], ['run', 'string']]);
    const [rs, bs] = play(), [rf, bf] = play('--fast-turn');
    assert.deepStrictEqual([rs.fast_turn, rf.fast_turn], [false, true]);
    assert.ok(rs.teams.every(t => t.errors === 0 && t.turns > 100), 'clean games');
    assert.ok(bs.equals(bf), 'same replay');
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('run_game: --fast-init compiles a bundle once, runs it in fresh sandboxes, and replays the engine path\'s game', () => {
  const { execFileSync } = require('child_process'), os = require('os');
  const root = path.join(__dirname, '..');
  const probe = `const { fastInit } = require('./tools/run_game.js'), { VM } = require('./engine/node_modules/vm2');
    const code = 'var n = (typeof n === "number" ? n : 0) + 1; n', s = fastInit([code]).get(code);
    const r = [new VM().run(code), new VM({ timeout: 1000 }).run(code), new VM().run(code + ' ')];   // 50 ms timed out under load
    console.log(JSON.stringify([r, !!s._compiledVM]));`;
  assert.deepStrictEqual(JSON.parse(execFileSync(process.execPath, ['-e', probe], { cwd: root, encoding: 'utf8' })),
    [[1, 1, 1], true]);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastinit-'));
  try {
    const play = (...x) => {
      const out = path.join(dir, (x.length ? 'fast' : 'slow') + '.bc19');
      const line = execFileSync('unshare', ['-rn', process.execPath, path.join(root, 'tools', 'run_game.js'),
        '--red', 'bots/v3', '--blue', 'bots/v2', '--seed', '2202', '--max-rounds', '40', '--det', '--timescale', '20',
        '--init-ms', '10000', '--replay', out, ...x], { cwd: root, encoding: 'utf8' });
      return [JSON.parse(line), fs.readFileSync(out)];
    };
    const [rs, bs] = play(), [rf, bf] = play('--fast-init');
    assert.deepStrictEqual([rs.fast_init, rf.fast_init], [false, true]);
    assert.ok(rf.teams.every(t => t.errors === 0 && t.turns > 100), 'clean games');
    assert.ok(bs.equals(bf), 'same replay');
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('run_game --no-kill replays the killed path\'s game; batch.js caps a game whose turn never returns', () => {
  const { execFileSync } = require('child_process'), os = require('os');
  const root = path.join(__dirname, '..');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nokill-'));
  try {
    const play = (...x) => {
      const out = path.join(dir, (x.length ? 'nokill' : 'kill') + '.bc19');
      const line = execFileSync('unshare', ['-rn', process.execPath, path.join(root, 'tools', 'run_game.js'),
        '--red', 'bots/v3', '--blue', 'bots/v2', '--seed', '2202', '--max-rounds', '40', '--det', '--timescale', '20',
        '--init-ms', '10000', '--fast-turn', '--replay', out, ...x], { cwd: root, encoding: 'utf8' });
      return [JSON.parse(line), fs.readFileSync(out)];
    };
    const [rk, bk] = play(), [rn, bn] = play('--no-kill');
    assert.deepStrictEqual([rk.no_kill, rk.turn_kill_ms, rn.no_kill, rn.turn_kill_ms], [false, 4000, true, 0]);
    assert.ok(rn.teams.every(t => t.errors === 0 && t.turns > 100), 'clean games');
    assert.ok(bk.equals(bn), 'same replay');
    const res = path.join(dir, 'cap.jsonl'), t0 = Date.now();
    execFileSync(process.execPath, [path.join(root, 'tools', 'batch.js'), '--a', 'test/fixtures/loopbot', '--b', 'bots/v2',
      '--seeds', '2202', '--sides', 'a-red', '--par', '1', '--no-kill', '--game-cap', '3', '--out', res], { cwd: root, stdio: 'ignore' });
    const row = JSON.parse(fs.readFileSync(res, 'utf8').trim());
    assert.match(row.error, /over the game cap of 3 s/);
    assert.ok(Date.now() - t0 < 30000, 'capped promptly');
    // An error row is not a result: a rerun plays the game again. A result row carries the game's conditions.
    execFileSync(process.execPath, [path.join(root, 'tools', 'batch.js'), '--a', 'test/fixtures/loopbot', '--b', 'bots/v2',
      '--seeds', '2202', '--sides', 'a-red', '--par', '1', '--no-kill', '--game-cap', '3', '--out', res], { cwd: root, stdio: 'ignore' });
    assert.strictEqual(fs.readFileSync(res, 'utf8').trim().split('\n').length, 2);
    const ok = path.join(dir, 'ok.jsonl');
    execFileSync(process.execPath, [path.join(root, 'tools', 'batch.js'), '--a', 'bots/v3', '--b', 'bots/v2', '--seeds', '2202',
      '--sides', 'a-red', '--par', '1', '--max-rounds', '5', '--timescale', '20', '--init-ms', '10000', '--out', ok], { cwd: root, stdio: 'ignore' });
    const r5 = JSON.parse(fs.readFileSync(ok, 'utf8').trim());
    assert.deepStrictEqual([r5.timescale, r5.init_ms, r5.turn_kill_ms, r5.net_isolated], [20, 10000, 4000, true]);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('run_game --fast-view: the engine\'s view of every unit at every tile, and its game byte for byte', () => {
  const { execFileSync } = require('child_process'), os = require('os');
  const root = path.join(__dirname, '..');
  const probe = `const Game = require('./engine/node_modules/bc19/game'), SPECS = require('./engine/node_modules/bc19/specs');
    const slow = Game.prototype.getVisible; require('./tools/run_game.js').fastView(Game); const fast = Game.prototype.getVisible;
    let n = 0, bad = 0;
    for (const seed of [2202, 826]) { const g = new Game(seed, 100, 20, false, false), m = g.shadow.length;
      for (let y = 0; y < m; y++) for (let x = 0; x < m; x++) g.shadow[y][x] = (x * 7 + y * 13) % 5 ? 0 : y * m + x + 1;
      for (let unit = 0; unit < 6; unit++) for (let y = 0; y < m; y += 3) for (let x = 0; x < m; x += 3) {
        const r = { unit, x, y }; n++; if (JSON.stringify(slow.call(g, r)) !== JSON.stringify(fast.call(g, r))) bad++; } }
    console.log(JSON.stringify([n > 1000, bad]));`;
  assert.deepStrictEqual(JSON.parse(execFileSync(process.execPath, ['-e', probe], { cwd: root, encoding: 'utf8' })), [true, 0]);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastview-'));
  try {
    const play = (...x) => {
      const out = path.join(dir, (x.length ? 'fast' : 'slow') + '.bc19');
      const line = execFileSync('unshare', ['-rn', process.execPath, path.join(root, 'tools', 'run_game.js'),
        '--red', 'bots/v3', '--blue', 'bots/v2', '--seed', '2202', '--max-rounds', '40', '--det', '--timescale', '20',
        '--init-ms', '10000', '--fast-turn', '--replay', out, ...x], { cwd: root, encoding: 'utf8' });
      return [JSON.parse(line), fs.readFileSync(out)];
    };
    const [rs, bs] = play(), [rf, bf] = play('--fast-view');
    assert.deepStrictEqual([rs.fast_view, rf.fast_view], [false, true]);
    assert.ok(rf.teams.every(t => t.errors === 0 && t.turns > 100), 'clean games');
    assert.ok(bs.equals(bf), 'same replay');
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('run_game --fast-view: fastDump writes the engine\'s turn message for every robot, byte for byte (compact: the same object)', () => {
  const { execFileSync } = require('child_process');
  const probe = `const Game = require('./engine/node_modules/bc19/game');
    const rg = require('./tools/run_game.js'), vm = require('vm'), slow = Game.prototype.getGameStateDump;
    rg.fastDump(Game); const fast = Game.prototype.getGameStateDump; rg.fastDump(Game, true); const compact = Game.prototype.getGameStateDump;
    const ctx = vm.createContext({ robot: { _do_turn: v => JSON.stringify(v) } }), turn = new vm.Script(rg.TURN_SCRIPT);
    let n = 0, bad = 0, castles = 0, signals = 0, maps = 0, full = 0, short = 0;
    for (const seed of [2202, 826]) { const g = new Game(seed, 100, 20, false, false), m = g.shadow.length;
      let s = seed; const rnd = () => (s = (s * 1103515245 + 12345) >>> 0) / 4294967296;
      g.last_offer = [[3, -5], [0, 7]];
      for (let i = 0; i < 400; i++) { const x = Math.floor(rnd() * m), y = Math.floor(rnd() * m);
        if (!g.map[y][x] || g.shadow[y][x] > 0) continue;
        const r = g.createItem(x, y, i % 2, i % 6); r.signal = i * 37 % 65536; r.signal_radius = [0, 4, 100, 2000, 8000][i % 5];
        r.castle_talk = i % 256; r.turn = i % 7 ? 9 : 1; r.health = 1 + i % 50; r.karbonite = i % 20; r.fuel = i % 100; }
      for (const r of g.robots) { let t = 7; const save = Math.random; Math.random = () => (t = (t * 69069 + 1) >>> 0) / 4294967296;
        const a = slow.call(g, r); t = 7; const b = fast.call(g, r); t = 7; const c = compact.call(g, r); Math.random = save;
        ctx.__bc19_view = c.slice(15, -2); const rebuilt = turn.runInContext(ctx);
        n++; if (a !== b || rebuilt !== a.slice(15, -2) || !c.startsWith('robot._do_turn(')) bad++; full += a.length; short += c.length; if (r.unit === 0) castles++; if (a.includes('"signal_radius":8000')) signals++; if (r.turn === 1) maps++; } }
    console.log(JSON.stringify([n > 300, castles > 10, signals > 100, maps > 20, short < full * 0.8, bad]));`;
  assert.deepStrictEqual(JSON.parse(execFileSync(process.execPath, ['-e', probe], { cwd: path.join(__dirname, '..'), encoding: 'utf8' })),
    [true, true, true, true, true, 0]);
});

test('run_game --fast-view: fastOver answers as the engine\'s isOver (castles killed, robots not initialized, last rounds)', () => {
  const { execFileSync } = require('child_process');
  const probe = `const Game = require('./engine/node_modules/bc19/game');
    const rg = require('./tools/run_game.js'), slow = Game.prototype.isOver; rg.fastOver(Game); const fast = Game.prototype.isOver;
    let n = 0, bad = 0, over = 0, short = 0, s = 1;
    const rnd = () => (s = (s * 1103515245 + 12345) >>> 0) / 4294967296;
    for (const seed of [2202, 826, 2591, 1822]) for (let trial = 0; trial < 150; trial++) {
      const g = new Game(seed, 100, 20, false, false), m = g.shadow.length;
      for (let i = 0; i < 12; i++) { const x = Math.floor(rnd() * m), y = Math.floor(rnd() * m);
        if (g.map[y][x] && !g.shadow[y][x]) g.createItem(x, y, i % 2, i % 6); }
      for (const r of g.robots) { r.initialized = rnd() < 0.85; r.hook = r.initialized && rnd() < 0.9 ? () => null : null; r.health = 1 + Math.floor(rnd() * 200); }
      for (let step = 0; step < 6; step++) {
        g.round = [1, 300, 998, 999, 1000, 1001][Math.floor(rnd() * 6)];
        const f = fast.call(g); if (g.__live && f === false) short++; g.win_condition = undefined;
        const e = slow.call(g); g.win_condition = undefined; g.winner = undefined;
        n++; if (f !== e) bad++; if (e) over++;
        if (g.robots.length && rnd() < 0.6) { const cs = g.robots.filter(r => r.unit === 0), pool = cs.length && rnd() < 0.7 ? cs : g.robots;
          g._deleteRobot(pool[Math.floor(rnd() * pool.length)]); }
      } }
    console.log(JSON.stringify([n > 3000, over > 300, short > 300, bad]));`;
  assert.deepStrictEqual(JSON.parse(execFileSync(process.execPath, ['-e', probe], { cwd: path.join(__dirname, '..'), encoding: 'utf8' })),
    [true, true, true, 0]);
});

test('dlv: delivery numbers agree with the replay analysis and with each other', () => {
  const dlv = require('../tools/dlv');
  const buf = fs.readFileSync(path.join(FIX, 'rush_s2908_r80.bc19'));
  const an = replay.analyze(buf), r = dlv.stats(buf, { from: 20, to: 60 });
  for (const t of [0, 1]) {
    const T = r.teams[t], A = an.tally[t], o = r.teams[1 - t];
    assert.strictEqual(T.milBuilt, A.built[3] + A.built[4] + A.built[5]);
    assert.strictEqual(T.milLost, A.lost[3] + A.lost[4] + A.lost[5]);
    assert.strictEqual(T.castlesLost, A.lost[0]);
    assert.strictEqual(T.churchesLost100, A.lost[1]);    // an 80-round game: every loss is by round 100
    assert.strictEqual(T.mines450, A.fuel_mine);         // one fuel a mine action
    assert.strictEqual(T.shots, A.attacks);
    assert.strictEqual(T.atkFuel, A.fuel_attack);
    assert.strictEqual(T.dmgDealt, A.dmg_dealt);
    assert.ok(T.milLostUnfired <= T.milLost && T.meleeLostUnfired <= T.meleeLost && T.meleeLost <= T.milLost);
    assert.ok(T.stillborn <= T.milLostUnfired);          // a unit that never took a turn never fired
    assert.ok(T.killsByMelee + T.killsByProphet <= o.milLost);
    assert.ok(T.shotsW <= T.shots && T.moveMilW <= T.moveW);
  }
  assert.ok(r.teams[0].shots + r.teams[1].shots > 0);
  assert.deepStrictEqual(dlv.labels('/x/ab_cd_905_blue.bc19'), ['b', 'a']);
  assert.deepStrictEqual(dlv.labels('game-01-seed616.bc19'), ['red', 'blue']);
  assert.match(dlv.main([path.join(FIX, 'rush_s2908_r80.bc19')]), /\nSUM\t\tblue\t/);
  for (const t of [0, 1]) assert.ok(r.teams[t].idleContactP <= r.teams[t].idleContact);

  // contact: an enemy attacker near the unit but out of its reach has a friend of the unit in its own reach.
  const me = { id: 1, team: 0, unit: 4, x0: 10, y0: 10 };
  const R = (id, team, unit, x, y) => ({ id, team, unit, x, y });
  assert.strictEqual(dlv.contact({ robots: [R(2, 1, 4, 10, 20), R(3, 0, 2, 10, 25)] }, me), true);    // r2 100; friend r2 25
  assert.strictEqual(dlv.contact({ robots: [R(2, 1, 4, 10, 20), R(3, 0, 2, 10, 22)] }, me), false);   // friend in the dead zone
  assert.strictEqual(dlv.contact({ robots: [R(2, 1, 4, 10, 20)] }, me), false);                       // nobody of ours in reach
  assert.strictEqual(dlv.contact({ robots: [R(2, 1, 4, 10, 17), R(3, 0, 2, 10, 23)] }, me), false);   // the unit can fire itself
  assert.strictEqual(dlv.contact({ robots: [R(2, 1, 2, 10, 20), R(3, 0, 2, 10, 21)] }, me), false);   // pilgrims do not attack
  assert.strictEqual(dlv.contact({ robots: [R(2, 1, 5, 10, 25), R(3, 0, 2, 10, 23)] }, me), false);   // r2 225: too far

  // atCastle: nearest own structure a castle within k (a church as near loses the tie to the castle)
  const g = { robots: [R(1, 0, 0, 10, 10), R(2, 0, 1, 20, 10), R(3, 0, 4, 13, 10), R(4, 0, 4, 15, 10), R(5, 0, 3, 18, 10),
    R(6, 0, 5, 10, 17), R(7, 1, 4, 11, 11), R(8, 0, 2, 11, 10)] };
  assert.strictEqual(dlv.atCastle(g, 0, 6), 2);   // ids 3 and 4 (5 is nearer the church, 6 is 7 steps out)
  assert.strictEqual(dlv.atCastle(g, 0, 3), 1);
  assert.strictEqual(dlv.atCastle(g, 1, 6), 0);
});

test('symcheck: claimed tiles; v5 stays a mirror image for 12 rounds (run without network)', () => {
  const { claim } = require('../tools/symcheck');
  assert.strictEqual(claim({ x: 3, y: 4 }, { action: 'move', dx: 1, dy: -1 }), '4,3');
  assert.strictEqual(claim({ x: 3, y: 4 }, { action: 'build', dx: 0, dy: 1, build_unit: 2 }), '3,5');
  assert.strictEqual(claim({ x: 3, y: 4 }, { action: 'attack', dx: 2, dy: 0 }), null);
  assert.strictEqual(claim({ x: 3, y: 4 }, null), null);
  // Twins at key 5 both claim the axis tile 3,4; at key 7 they claim mirrored tiles (no contest); the red at key 9
  // claims the tile its blue twin left (pre-round claims only, so no contest either).
  const { contested } = require('../tools/symcheck');
  const T = t => ({ team: t });
  assert.deepStrictEqual([...contested([T(0), T(1), T(0), T(1), T(0), T(1)], ['3,4', '3,4', '1,1', '5,1', '2,2', null], [5, 5, 7, 7, 9, 9])].sort(), [0, 1]);
  const r = require('child_process').spawnSync('unshare', ['-rn', process.execPath, path.join(__dirname, '..', 'tools', 'symcheck.js'),
    '--bot', path.join(__dirname, '..', 'bots', 'v5'), '--seeds', '2', '--rounds', '12'], { encoding: 'utf8', timeout: 120000 });
  assert.strictEqual(r.status, 0, r.stderr);
  assert.deepStrictEqual(JSON.parse(r.stdout.trim()), { seed: 2, ok: true, round: 12, robots: JSON.parse(r.stdout.trim()).robots });
});

test('symcheck: phase reclaim credits every hitter of the dead from cargo before the phase, alike for twins', () => {
  const { phaseReclaim } = require('../tools/symcheck');
  // Seed 3, r504 in miniature: twin preachers R (red) and B (blue) each splash the other's preacher; each victim
  // reclaimed 4 K earlier in the phase in the engine's order, which must not count. Preacher cost 30: half 15.
  const R = { id: 1, unit: 5, x: 5, y: 26 }, B = { id: 2, unit: 5, x: 5, y: 23 }, P = { id: 3, unit: 2, x: 4, y: 26 };
  const cargo0 = new Map([[1, { k: 0, f: 0 }], [2, { k: 0, f: 0 }], [3, { k: 20, f: 40 }]]);
  const g = phaseReclaim([{ a: R, victims: [B] }, { a: B, victims: [R, P] }], new Set([R, B, P]), cargo0);
  assert.deepStrictEqual(g.get(R), { k: 1, f: 0 });                      // floor(15 / 9)
  assert.deepStrictEqual(g.get(B), { k: 1 + Math.floor(25 / 10), f: 4 }); // R at r2 9, the pilgrim at r2 10: (20 + 5) / 10, 40 / 10
  // A survivor yields nothing; structures yield nothing.
  const C = { id: 4, unit: 1, x: 5, y: 24 };
  cargo0.set(4, { k: 0, f: 0 });
  assert.strictEqual(phaseReclaim([{ a: R, victims: [B, C] }], new Set([C]), cargo0).size, 0);
});

test('gatesim: certain outcomes decide at the first look; no discordance stays open; p 0.5 rarely accepts', () => {
  const { simulate, gate, rng } = require('../tools/gatesim');
  const o = { looks: [12, 24, 48], block: 20, maxCells: 200, accept: 2, reject: 0 };
  assert.deepStrictEqual(gate({ ...o, q: 1, p: 1 }, rng(1)), { result: 'accept', cells: 20, D: 20, t: 20 / Math.sqrt(20) });
  assert.strictEqual(gate({ ...o, q: 1, p: 0 }, rng(1)).result, 'reject');
  assert.deepStrictEqual(gate({ ...o, q: 0, p: 1 }, rng(1)), { result: 'open', cells: 200, D: 0, t: 0 });
  // q 0.5: D reaches 12 within one block about half the time; a look only on block boundaries
  const x = gate({ ...o, q: 0.5, p: 0.5 }, rng(7));
  assert.strictEqual(x.cells % 20, 0);
  // The screen (one look at 20 cells, reject only): a neutral candidate is rejected 3-13% of the time.
  const sc = simulate({ q: 0.3, p: 0.5, looks: [0], maxCells: 20, accept: Infinity, reject: -1.5, trials: 4000, seed: 5 });
  assert.strictEqual(sc.accept, 0);
  assert.ok(sc.reject > 0.03 && sc.reject < 0.13, String(sc.reject));
  const s = simulate({ q: 0.5, p: 0.5, trials: 4000, seed: 3 });
  assert.ok(s.accept > 0.01 && s.accept < 0.08, JSON.stringify(s));
  assert.ok(Math.abs(s.accept + s.reject + s.open - 1) < 1e-9);
  assert.deepStrictEqual(simulate({ q: 0.3, p: 0.7, trials: 500, seed: 9 }), simulate({ q: 0.3, p: 0.7, trials: 500, seed: 9 }));
});

test('census: pioneers, churches by round, mines; gate replay names sum by role', () => {
  const { census, candSide, summarize } = require('../tools/census');
  const buf = fs.readFileSync(path.join(FIX, 'rush_s2908_r80.bc19'));   // h6 (red) vs bots/rush, first 80 rounds
  const T = census(buf, { by: [40, 80] }), an = replay.analyze(buf);
  for (const team of [0, 1]) {
    assert.strictEqual(T[team].churches, an.tally[team].built[1]);
    assert.strictEqual(T[team].mines, an.tally[team].mined_k / 2 + an.tally[team].mined_f / 10);
    assert.strictEqual(T[team].churches_by[80], T[team].churches);
  }
  assert.deepStrictEqual([T[0].pioneers, T[0].pioneer_churches, T[0].phase_sum, T[0].churches_by[40], T[0].depot_idle],
    [3, 2, 35, 1, 13]);
  assert.strictEqual(T[1].pioneers, 0);                     // the rush sends no pioneers
  assert.deepStrictEqual([T[0].castles, T[1].castles], [an.final[0].units[0] + an.tally[1].killed[0], 2]);
  const all = census(buf, { late: 0 });                       // every preacher is a late one from round 0
  for (const team of [0, 1]) assert.strictEqual(all[team].late_preachers, an.tally[team].built[5]);
  assert.ok(an.tally[0].built[5] > 0 && T[0].late_preachers === 0);
  const short = census(buf, { to: 40, stuck: 10 });
  assert.strictEqual(short[0].churches, 1);
  assert.ok(short[0].mines < T[0].mines);
  assert.deepStrictEqual([candSide('a_b_1205_red.bc19'), candSide('x/a_b_1205_blue.bc19'), candSide('g.bc19')], [0, 1, null]);
  const tot = summarize([{ cand: 1, teams: T }, { cand: 0, teams: T }]);
  assert.deepStrictEqual([tot.cand.pioneers, tot.ctrl.pioneers, tot.cand.games, tot.cand.phase_mean], [3, 3, 2, 17.5]);
  assert.deepStrictEqual(Object.keys(summarize([{ cand: null, teams: T }])), ['red', 'blue']);
  // First pioneer (round, team fuel after the build) and first church; means skip the games without one
  assert.deepStrictEqual(T.map(t => [t.first_pioneer, t.pioneer_fuel, t.first_church]), [[12, 258, 26], [null, null, null]]);
  assert.deepStrictEqual([tot.cand.first_church_mean, tot.cand.first_church_n, tot.cand.pioneer_fuel_mean], [26, 1, 258]);
  // h50 (red) vs h71 (blue, CHURCH_GUARD_D 8, preacher), seed 2591 to round 25: both church the centre at round 18;
  // red's church builds a pilgrim first, blue's a preacher
  const g = census(fs.readFileSync(path.join(FIX, 'guard_s2591_r25.bc19')));
  assert.deepStrictEqual([g[0].churches, g[0].guard_first, g[1].churches, g[1].guard_first], [1, 0, 1, 1]);
  // replica 407-3 (StoneT2000 red vs vibe19 v6, seed 2013, the whole game): a 12-church line at r274 ends near our
  // castle, which dies at r282 (LEARNINGS 22); red's other line has 4 churches
  const cb = fs.readFileSync(path.join(FIX, 'chain_s2013_407-3.bc19'));
  const chains = o => census(cb, o).map(t => [t.chains, t.chain_churches, t.chain_near, t.chain_kills]);
  assert.deepStrictEqual(chains({}), [[2, 16, 1, 1], [0, 0, 0, 0]]);
  assert.deepStrictEqual(chains({ chainMin: 12 }), [[1, 12, 1, 1], [0, 0, 0, 0]]);
  assert.deepStrictEqual(chains({ chainMin: 13 })[0], [0, 0, 0, 0]);
  assert.deepStrictEqual(chains({ chainNear: 1 })[0], [2, 16, 0, 0]);
  assert.deepStrictEqual(chains({ to: 270 })[0], [0, 0, 0, 0]);
  // Military built, died, and died within 2 rounds of the build (count, karbonite); pinned from an independent count
  const mil = census(cb).map(t => [t.mil_born, t.mil_dead, t.newborn_dead, t.newborn_dead_k]);
  assert.deepStrictEqual(mil, [[88, 18, 5, 130], [135, 26, 5, 150]]);
  assert.deepStrictEqual(census(cb, { to: 100 }).map(t => t.newborn_dead <= t.mil_dead && t.mil_dead <= t.mil_born), [true, true]);
  // h162 (red, ATTACK_ONE 1) vs v8 on 2046 to r586: red's two castles call one target at r580 and r585; v8's call two
  // at r585 (its castles' own mirrors)
  const ab = fs.readFileSync(path.join(FIX, 'attack_s2046_r586.bc19'));
  assert.deepStrictEqual(census(ab).map(t => [t.castles, t.attack_calls, t.attack_split]), [[2, 2, 0], [2, 1, 1]]);
  assert.deepStrictEqual(census(ab, { to: 584 }).map(t => [t.attack_calls, t.attack_split]), [[1, 0], [0, 0]]);
});

test('move_stale.sh: moves only named pending jobs to superseded and back; refuses names that are not plain', () => {
  const { spawnSync } = require('child_process'), os = require('os');
  const q = fs.mkdtempSync(path.join(os.tmpdir(), 'jobq-'));
  try {
    for (const d of ['pending', 'running', 'done']) fs.mkdirSync(path.join(q, d));
    for (const [d, j] of [['pending', 'a1'], ['pending', 'b2'], ['running', 'c3']]) fs.writeFileSync(path.join(q, d, j + '.sh'), j);
    const run = (...a) => spawnSync('bash', [path.join(__dirname, '..', 'tools', 'move_stale.sh'), ...a],
      { env: { ...process.env, MOVE_STALE_JOBQ: q }, encoding: 'utf8' });
    const ls = d => fs.readdirSync(path.join(q, d)).sort();
    let r = run('a1.sh', 'c3', 'zz');
    assert.strictEqual(r.status, 0, r.stderr);
    assert.match(r.stdout, /moved a1: pending -> superseded/);
    assert.match(r.stdout, /skipped c3/); assert.match(r.stdout, /skipped zz/);
    assert.deepStrictEqual([ls('pending'), ls('superseded'), ls('running')], [['b2.sh'], ['a1.sh'], ['c3.sh']]);
    r = run('--back', 'a1');
    assert.strictEqual(r.status, 0, r.stderr);
    assert.deepStrictEqual([ls('pending'), ls('superseded')], [['a1.sh', 'b2.sh'], []]);
    for (const bad of ['../running/c3', 'a1;touch x', 'A1', '-r', '']) {
      r = run(bad);
      assert.strictEqual(r.status, 2, bad);
    }
    assert.strictEqual(run().status, 2);
    assert.deepStrictEqual([ls('pending'), ls('running')], [['a1.sh', 'b2.sh'], ['c3.sh']]);
  } finally { fs.rmSync(q, { recursive: true, force: true }); }
});

test('bump_ours.sh: reorders only, by digit ids or our team; refuses anything else', () => {
  const { spawnSync } = require('child_process');
  const run = (...a) => spawnSync('bash', [path.join(__dirname, '..', 'tools', 'bump_ours.sh'), ...a],
    { env: { ...process.env, BUMP_OURS_ECHO: '1' }, encoding: 'utf8' });
  const SB = 'sudo -n python3 -I /opt/bc19-galaxy/galaxy19/spool_bump.py';
  let r = run('616', '617', '553');
  assert.strictEqual(r.status, 0, r.stderr);
  assert.strictEqual(r.stdout.trim(), `${SB} --match 616,617,553`);
  r = run('--ours', '--dry-run');
  assert.strictEqual(r.stdout.trim(), `${SB} --team vibe19 --dry-run`);
  r = run('--dry-run', '490', '--ours');
  assert.strictEqual(r.stdout.trim(), `${SB} --team vibe19 --match 490 --dry-run`);
  for (const bad of [['--drop', '616'], ['616;rm'], ['--team', 'x'], ['-1'], [''], ['12345678'], []]) {
    r = run(...bad);
    assert.strictEqual(r.status, 2, JSON.stringify(bad));
    assert.strictEqual(r.stdout, '', JSON.stringify(bad));
  }
});

// tools/reads: the panel's mechanism reads (h170 parked pioneers, h171 escorts, h174 idle miners, held crusaders). Values pinned from
// the session scripts they replace (identical output on these replays).
test('reads: idle, parked and escort reads on replica games', () => {
  const { execFileSync } = require('child_process');
  const run = (read, ...a) => execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'reads', read), ...a], { encoding: 'utf8' })
    .trim().split('\n').map(l => JSON.parse(l));
  const g = path.join(FIX, 'escort_s2591_1124-1.bc19'), chain = path.join(FIX, 'chain_s2013_407-3.bc19');
  assert.deepStrictEqual(run('idle.mjs', '0', '300', chain), [{ waste: 1174, rounds: 232, S: 1502, L: 2051, H: 6, stuckP: 0, stuckM: 955, nM: 13 }]);
  assert.deepStrictEqual(run('idle.mjs', '0', '300', g), [{ waste: 26, rounds: 25, S: 33, L: 118, H: 16, stuckP: 23, stuckM: 0, nM: 0 }]);
  assert.deepStrictEqual(run('parked.mjs', '0', g), [{ sent: 2, church: 0, mine: 0, died: 0, alive: 2, gaveup: 0, toTaken: 2, churches: 0 }]);
  const e = run('escorts.mjs', '0', g);
  assert.deepStrictEqual(e.map(x => [x.id, x.round, x.hit, x.hitBy, x.k0, x.dead, x.hit6, x.pc60]),
    [[2967, 3, 41, 'R', 10, 43, 1, 0], [851, 4, 34, 'R', 10, 40, 1, 0]]);
  assert.throws(() => execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'reads', 'idle.mjs'), '2', '300', g], { stdio: 'pipe' }));
  // 1180 game 1 (wololo 2013, v9 red): the castle fell at r204 with three held crusaders within 10 steps, none shooting.
  assert.deepStrictEqual(run('held.mjs', '0', path.join(FIX, 'held_s2013_1180-1.bc19')),
    [{ held: 5, heldShot: 0, lost: 2, lostCastles: 1, byLoss: [[175, 1, 5, 0, 0], [204, 0, 3, 3, 0]] }]);
  assert.deepStrictEqual(run('held.mjs', '0', g), [{ held: 0, heldShot: 0, lost: 1, lostCastles: 1, byLoss: [[120, 0, 0, 0, 0]] }]);
  // The same game: 17 of v9's 57 military newborns died within 2 rounds, 13 on a tile exposed to their hp beside a
  // free one that was not; wololo's (team 1) lost 2 of 54.
  assert.deepStrictEqual(run('stillborn.mjs', '0', path.join(FIX, 'held_s2013_1180-1.bc19')),
    [{ built: 57, stillborn: 17, K: 430, byCastle: 13, shootable: 9, exposed: 13, safer: 13, byRound: { 100: 14, 200: 3 } }]);
  assert.deepStrictEqual(run('stillborn.mjs', '1', path.join(FIX, 'held_s2013_1180-1.bc19')),
    [{ built: 54, stillborn: 2, K: 60, byCastle: 0, shootable: 0, exposed: 0, safer: 0, byRound: { 100: 2 } }]);
  assert.throws(() => execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'reads', 'stillborn.mjs'), '2', g], { stdio: 'pipe' }));
  // pioneers.mjs, the same game: v9's first pioneer (r34, contested site (5,25)) never reached it and wololo churched
  // beside it at r46; the r46 pioneer to (26,0) arrived at r56 with 20 K banked and built at r99; the r132 retry of
  // (5,25) counts wololo's r46 church, built before it left. wololo's pilgrims carry no SIG.CHURCH radio.
  const [pv] = run('pioneers.mjs', '0', path.join(FIX, 'held_s2013_1180-1.bc19'));
  assert.deepStrictEqual([pv.church1, pv.theirs1, pv.pilgrims100, pv.pioneers.length], [49, 46, 17, 7]);
  assert.deepStrictEqual(pv.pioneers[0], { r: 34, sx: 5, sy: 25, k: 11, bank: 90, arrive: -1, bankArr: -1, church: -1, by: 0,
    died: -1, mined: 0, mine1: -1, theirs: 46, defK: 85 });
  assert.deepStrictEqual([pv.pioneers[3].r, pv.pioneers[3].sx, pv.pioneers[3].sy, pv.pioneers[3].arrive, pv.pioneers[3].bankArr,
    pv.pioneers[3].church, pv.pioneers[3].by], [46, 26, 0, 56, 20, 99, 1]);
  assert.deepStrictEqual([pv.pioneers[6].r, pv.pioneers[6].theirs, pv.pioneers[6].died], [132, 46, 196]);
  assert.deepStrictEqual(run('pioneers.mjs', '1', path.join(FIX, 'held_s2013_1180-1.bc19'))[0].pioneers, []);
});

test('reads: sum.py means per field, wins/losses and opponents; nulls left out; --ge counts', () => {
  const { execFileSync } = require('child_process');
  const lines = ['1 a.x seed-1 0 W 300 {"s":10,"h":null}', '1 a.x seed-2 0 L 200 {"s":60,"h":1}', '2 b.y seed-1 1 L 999 {"s":2,"h":0}', 'noise'];
  const out = execFileSync('python3', ['-I', path.join(__dirname, '..', 'tools', 'reads', 'sum.py'), 's,h', '--ge', '50'], { input: lines.join('\n'), encoding: 'utf8' }).split('\n');
  assert.strictEqual(out[0], 'all: 3; s mean 24.00 median 10 (n 3); h mean 0.50 median 0.5 (n 2); s >= 50: 1');
  assert.strictEqual(out[1], 'W: 1; s mean 10.00 median 10 (n 1); h -; s >= 50: 0');
  assert.strictEqual(out[2], 'L: 2; s mean 31.00 median 31 (n 2); h mean 0.50 median 0.5 (n 2); s >= 50: 1');
  assert.strictEqual(out[3], '  a.x: 2; s mean 35.00 median 35 (n 2); h mean 1.00 median 1 (n 1); s >= 50: 1');
});

test('reads: games.sh refuses a bad match id and a missing --', () => {
  const { spawnSync } = require('child_process'), sh = path.join(__dirname, '..', 'tools', 'reads', 'games.sh');
  assert.strictEqual(spawnSync('bash', [sh, 'idle.mjs', '300', '--', '11x']).status, 2);
  assert.strictEqual(spawnSync('bash', [sh, 'idle.mjs', '300', '1180']).status, 2);
  const none = spawnSync('bash', [sh, 'idle.mjs', '300', '--', '9999999'], { env: { ...process.env, REPLAYS: FIX } });
  assert.strictEqual(none.status, 1);
});
