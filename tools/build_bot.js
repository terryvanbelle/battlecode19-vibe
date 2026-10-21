#!/usr/bin/env node
// Build our bot into the single minified robot.js we would submit:  node tools/build_bot.js <src dir> <out dir>
// 1. rollup (the engine's own copy) bundles <src dir>/robot.js and its modules, keeping `import ... from 'battlecode'`.
// 2. terser (build/node_modules, pinned) minifies it; the class MyRobot keeps its name (the engine appends
//    `var robot = new MyRobot();`, compiler.js:95).
// Why: sandbox initialisation time grows with bundle size and must fit the 100 ms initial clock (LEARNINGS 1, 3).
// Prints bytes before/after. Exits non-zero on any error.
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const rollup = require(path.join(ROOT, 'engine', 'node_modules', 'rollup'));
const virtual = require(path.join(ROOT, 'engine', 'node_modules', 'rollup-plugin-virtual'));

async function build(srcDir, outDir, opts = {}) {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js'));
  if (!files.includes('robot.js')) throw new Error(srcDir + ': no robot.js');
  const input = {};
  for (const f of files) input[f] = fs.readFileSync(path.join(srcDir, f), 'utf8');
  input['robot.js'] += '\nexport { MyRobot };\n';
  // --cfg KEY=JSON overrides (sparring partners, ablations): applied to CFG when config.js loads.
  if (opts.cfg && Object.keys(opts.cfg).length) {
    if (!input['config.js'] || !/export const CFG = \{/.test(input['config.js'])) throw new Error('--cfg needs config.js with CFG');
    for (const k of Object.keys(opts.cfg)) if (!new RegExp('\\b' + k + ':').test(input['config.js'])) throw new Error('unknown CFG key ' + k);
    input['config.js'] += '\nObject.assign(CFG, ' + JSON.stringify(opts.cfg) + ');\n';
  }
  const bundle = await rollup.rollup({ input: { robot: 'robot.js' }, external: ['battlecode'], plugins: [virtual(input)] });
  const out = await bundle.generate({ format: 'es' });
  let code = out.output[0].code.replace(/\nexport \{ MyRobot \};\s*$/, '\n');
  const before = code.length;
  if (!opts.noMinify) {
    const terser = require(path.join(ROOT, 'build', 'node_modules', 'terser'));
    const r = await terser.minify(code, {
      module: false, toplevel: false, ecma: 2017, parse: { module: true },
      compress: { passes: 2, drop_console: false },
      mangle: { reserved: ['MyRobot'] },
      keep_classnames: /^MyRobot$/,
      format: { comments: false },
    });
    code = r.code;
  }
  if (!/class MyRobot\b/.test(code)) throw new Error('MyRobot class name lost in build');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (f.endsWith('.js')) fs.unlinkSync(path.join(outDir, f));
  fs.writeFileSync(path.join(outDir, 'robot.js'), code);
  return { before, after: code.length };
}

module.exports = { build };

if (require.main === module) {
  const argv = process.argv.slice(2), [src, out] = argv, cfg = {};
  if (!src || !out) { console.error('usage: build_bot.js <src dir> <out dir> [--no-minify] [--cfg KEY=JSON ...]'); process.exit(2); }
  for (let i = 2; i < argv.length; i++) if (argv[i] === '--cfg') { const [k, v] = argv[++i].split(/=(.*)/s); cfg[k] = JSON.parse(v); }
  build(src, out, { noMinify: argv.includes('--no-minify'), cfg })
    .then(r => console.log(`${out}/robot.js: ${r.before} -> ${r.after} bytes`))
    .catch(e => { console.error(String(e && e.stack || e)); process.exit(1); });
}
