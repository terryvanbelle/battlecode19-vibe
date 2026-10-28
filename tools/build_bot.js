#!/usr/bin/env node
// Build our bot into the single minified robot.js we would submit:  node tools/build_bot.js <src dir> <out dir>
// 1. rollup (the engine's own copy) bundles <src dir>/robot.js and its modules, keeping `import ... from 'battlecode'`.
// 2. Every CFG.KEY read becomes its value (inlineCfg), so the switches that are off fold away.
// 3. terser (build/node_modules, pinned) minifies it as a module at top level, so unused functions go too; the class
//    MyRobot keeps its name (the engine appends `var robot = new MyRobot();`, compiler.js:95).
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
  // --cfg KEY=JSON overrides (candidates, sparring partners, ablations): written into the CFG literal itself, so CFG
  // stays a constant and terser drops the code of every switch that is off, as in a plain build (a runtime
  // Object.assign kept it all: v8's bundle 56.6 KB against 40.4 KB for the same values as literals; LEARNINGS 3, 17).
  if (opts.cfg && Object.keys(opts.cfg).length) {
    const src = input['config.js'] || '', m = /export const CFG = (\{[\s\S]*?\n\});/.exec(src);
    if (!m) throw new Error('--cfg needs config.js with CFG');
    const cfg = Function('return (' + m[1] + ');')();
    for (const k of Object.keys(opts.cfg)) if (!(k in cfg)) throw new Error('unknown CFG key ' + k);
    input['config.js'] = src.replace(m[0], 'export const CFG = ' + JSON.stringify({ ...cfg, ...opts.cfg }) + ';');
  }
  const bundle = await rollup.rollup({ input: { robot: 'robot.js' }, external: ['battlecode'], plugins: [virtual(input)] });
  const out = await bundle.generate({ format: 'es' });
  let code = out.output[0].code;
  const before = code.length;
  if (!opts.noMinify) {
    const terser = require(path.join(ROOT, 'build', 'node_modules', 'terser'));
    // The export keeps MyRobot alive through top-level dead-code removal; it goes after.
    const r = await terser.minify(inlineCfg(code), {
      module: true, toplevel: true, ecma: 2017,
      compress: { passes: 2, drop_console: false },
      mangle: { reserved: ['MyRobot'] },
      keep_classnames: /^MyRobot$/,
      format: { comments: false },
    });
    code = r.code;
  }
  code = code.replace(/\n?export ?\{ ?MyRobot ?\};?\s*$/, '\n');
  if (/\bexport\b/.test(code.slice(-40))) throw new Error('export left at the end of the bundle');
  if (!/class MyRobot\b/.test(code)) throw new Error('MyRobot class name lost in build');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (f.endsWith('.js')) fs.unlinkSync(path.join(outDir, f));
  fs.writeFileSync(path.join(outDir, 'robot.js'), code);
  return { before, after: code.length };
}

// The bundle's CFG literal is a constant: the bot never writes it or reads it by a computed key. Each CFG.KEY becomes
// its value (an array or object: one top-level const), and the literal goes; terser then drops the code of every switch
// that is off (terser keeps a top-level object's properties as live reads: the defaults bundle of 2026-10-27, 47,767
// bytes before, 37,433 after; LEARNINGS 3). A KEY not in CFG, or CFG left anywhere else, is an error.
function inlineCfg(code) {
  const m = /^const CFG = (\{[\s\S]*?\});[ \t]*\n/m.exec(code);   // config.js's literal, or --cfg's one-line JSON
  if (!m) throw new Error('inlineCfg: no `const CFG = {...};` in the bundle');
  const cfg = Function('return (' + m[1] + ');')(), hoisted = [];
  code = code.replace(m[0], '').replace(/\bCFG\.([A-Za-z_$][\w$]*)/g, (_, k) => {
    if (!(k in cfg)) throw new Error('inlineCfg: unknown CFG key ' + k);
    const v = cfg[k];
    if (v === null || typeof v !== 'object') return '(' + JSON.stringify(v) + ')';
    if (!hoisted.includes(k)) hoisted.push(k);
    return 'CFG$' + k;
  });
  if (/\bCFG\b(?!\$)/.test(code)) throw new Error('inlineCfg: CFG used other than as CFG.KEY');
  const decl = hoisted.map(k => `const CFG$${k} = ${JSON.stringify(cfg[k])};\n`).join('');
  return code.replace(/^((?:import [^\n]*\n)*)/, (_, imports) => imports + decl);
}

module.exports = { build };

if (require.main === module) {
  const argv = process.argv.slice(2), [src, out] = argv, cfg = {};
  if (!src || !out) { console.error('usage: build_bot.js <src dir> <out dir> [--no-minify] [--cfg KEY=JSON ...]'); process.exit(2); }
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--cfg') { const [k, v] = argv[++i].split(/=(.*)/s); cfg[k] = JSON.parse(v); }
    else if (argv[i] !== '--no-minify') { console.error(`unexpected argument ${argv[i]} (one --cfg per KEY=JSON)`); process.exit(2); }
  }
  build(src, out, { noMinify: argv.includes('--no-minify'), cfg })
    .then(r => console.log(`${out}/robot.js: ${r.before} -> ${r.after} bytes`))
    .catch(e => { console.error(String(e && e.stack || e)); process.exit(1); });
}
