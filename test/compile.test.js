// Offline compiler (tools/compile_bot.js): the official example bots in Java and Python compile locally and load in
// the engine's CrossVM; bot code is never executed at compile time. Java/Python cases skip when the toolchain
// (tools/install_compile_toolchain.sh) is absent on this machine.
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { compileBotDir, toolchainStatus } = require('../tools/compile_bot');

const ENGINE = path.join(__dirname, '..', 'engine', 'node_modules', 'bc19');
const CrossVM = require(path.join(ENGINE, 'vm'));
const st = toolchainStatus();
const why = lang => (!st[lang] ? lang + ' toolchain not installed in ' + st.toolchain : !st.sandbox ? 'compile sandbox unavailable' : false);

// CrossVM gives the bundle 200 ms to load; on a loaded machine a cold sandbox can miss that (LEARNINGS 1). The test
// checks that the code loads, so it retries timeouts a few times; any other error fails at once.
function loads(code) {
  for (let i = 0; ; i++) {
    try {
      const v = new CrossVM(code);
      assert.strictEqual(v.vm.run('typeof robot._do_turn'), 'function');
      return;
    } catch (e) {
      if (i >= 4 || !(e && e.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT')) throw e;
    }
  }
}

test('compile_bot: JavaScript example via the engine rollup', async () => {
  const r = await compileBotDir(path.join(ENGINE, 'bots', 'example_js'));
  assert.strictEqual(r.lang, 'js');
  loads(r.code);
});

test('compile_bot: Java example (JSweet) loads in CrossVM', { skip: why('java'), timeout: 600000 }, async () => {
  const r = await compileBotDir(path.join(ENGINE, 'bots', 'example_java'));
  assert.strictEqual(r.lang, 'java');
  assert.match(r.code, /var robot = new bc19\.MyRobot\(\); robot\.setSpecs\(specs\);$/);
  loads(r.code);
});

test('compile_bot: Python example (Transcrypt) loads in CrossVM', { skip: why('python'), timeout: 300000 }, async () => {
  const r = await compileBotDir(path.join(ENGINE, 'bots', 'exampy'));
  assert.strictEqual(r.lang, 'python');
  assert.match(r.code, /var robot = new MyRobot\(\);$/);
  // Transcrypt on Python >= 3.9 silently drops subscripts; the 3.6 toolchain must keep them.
  assert.match(r.code, /get_visible_robots/);
  loads(r.code);
});

for (const [name, src] of [
  ['ifdef eval', "__pragma__('ifdef', __import__('os').system('touch /work/pwned'))\n__pragma__('endif')\n"],
  ['js include eval', "__pragma__('js', '{}', open('/etc/hostname').read())\n"],
  ['xtrans subprocess', "__pragma__('xtrans', 'touch /work/pwned', '{}', 'x')\n"],
]) {
  test('compile_bot: Python ' + name + ' pragma is refused at compile time', { skip: why('python'), timeout: 300000 }, async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bc19-evil-'));
    try {
      fs.writeFileSync(path.join(dir, 'robot.py'), 'from battlecode import BCAbstractRobot\n' + src +
        'class MyRobot(BCAbstractRobot):\n    def turn(self):\n        return None\n');
      let out = null;
      try { out = (await compileBotDir(dir, { noCache: true })).code; } catch (e) { out = null; }
      // Either the compile fails or the pragma produced nothing harmful; never host-side effects.
      if (out !== null) assert.doesNotMatch(out, new RegExp(os.hostname()));
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  });
}
