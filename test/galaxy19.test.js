'use strict';
// The bc19 galaxy replica's tests (tools/galaxy19): the Python suites under test/galaxy19/ plus the viewer build's
// import rewrite. Run by tools/unit-tests.sh.
const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { spawnSync } = require('child_process');
const { transform } = require('../tools/galaxy19/viewer/build_official');

for (const suite of ['test_galaxy19.py', 'test_galaxy19_tools.py']) {
  test(`galaxy19: ${suite}`, () => {
    const r = spawnSync('python3', [path.join(__dirname, 'galaxy19', suite)], { encoding: 'utf8', timeout: 600000 });
    assert.strictEqual(r.status, 0, (r.stderr || '') + (r.stdout || ''));
  });
}

test('galaxy19: viewer build rewrites the official imports to globals', () => {
  const src = "import Game from 'bc19/game';\nimport * as PIXI from \"pixi.js\";\nclass Visualizer {}\nexport default Visualizer;\n";
  const out = transform(src);
  assert.match(out, /var Game = window\.BC19Engine\.Game;/);
  assert.match(out, /var PIXI = window\.PIXI;/);
  assert.match(out, /window\.BC19Visualizer = Visualizer;/);
  assert.doesNotMatch(out, /^\s*(import|export)\s/m);
  assert.throws(() => transform('class Visualizer {}'));
  assert.throws(() => transform(src + "import x from 'y';\n"));
});

test('galaxy19: engine19.js (viewer engine bundle) parses as a browser script and exposes the Game class', (t) => {
  const fs = require('fs');
  const os = require('os');
  const vm = require('vm');
  const nm = path.join(__dirname, '..', 'engine', 'node_modules');
  if (!fs.existsSync(path.join(nm, 'bc19', 'game.js'))) return t.skip('engine not installed');
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'engine19-')), 'engine19.js');
  const r = spawnSync(process.execPath, [path.join(__dirname, '..', 'tools', 'galaxy19', 'viewer', 'build_engine.js'), nm, out],
    { encoding: 'utf8' });
  assert.strictEqual(r.status, 0, r.stderr);
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(out, 'utf8'), ctx, { filename: 'engine19.js' });   // a browser loads it as a classic script
  assert.strictEqual(typeof ctx.window.BC19Engine.Game, 'function');
  assert.ok(ctx.window.BC19Engine.SPECS.UNITS);
  fs.rmSync(path.dirname(out), { recursive: true, force: true });
});

test('galaxy19: run_game.js finishes a game when a bundle throws while loading (the engine scores it, no crash)', (t) => {
  const fs = require('fs');
  const os = require('os');
  if (!fs.existsSync(path.join(__dirname, '..', 'engine', 'node_modules', 'bc19', 'game.js'))) return t.skip('engine not installed');
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'rg-throw-'));
  fs.writeFileSync(path.join(d, 'bad.js'), "throw new Error('load failure');\n");
  const r = spawnSync(process.execPath, [path.join(__dirname, '..', 'tools', 'run_game.js'), '--red', path.join(d, 'bad.js'),
    '--blue', path.join(d, 'bad.js'), '--seed', '7', '--json', path.join(d, 'o.json')], { encoding: 'utf8', timeout: 120000 });
  assert.strictEqual(r.status, 0, r.stderr);
  const res = JSON.parse(fs.readFileSync(path.join(d, 'o.json'), 'utf8'));
  assert.ok(res.winner === 'red' || res.winner === 'blue');
  assert.strictEqual(typeof res.reason, 'string');
  fs.rmSync(d, { recursive: true, force: true });
});
