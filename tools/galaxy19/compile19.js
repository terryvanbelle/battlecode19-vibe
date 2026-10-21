#!/usr/bin/env node
// Bundle a JavaScript Battlecode 2019 bot directory (robot.js + its modules) with the engine's own compiler (rollup,
// local; compiler.js Compiler.JS, exactly what bc19compile does for JS). Never contacts any service: the engine's
// Java/Python path (which posts to an external compile service) is not used here.
//   node compile19.js <bot dir> <out bundle.js>
// Engine: $BC19_ENGINE, else ../engine/node_modules/bc19 (installed runtime) or ../../engine/... (repo checkout).
'use strict';
const fs = require('fs');
const path = require('path');

function engineDir() {
  const c = [process.env.BC19_ENGINE, path.join(__dirname, '..', 'engine', 'node_modules', 'bc19'),
    path.join(__dirname, '..', '..', 'engine', 'node_modules', 'bc19')].filter(Boolean);
  for (const d of c) if (fs.existsSync(path.join(d, 'compiler.js'))) return d;
  throw new Error('bc19 engine not found');
}

const [dir, out] = process.argv.slice(2);
if (!dir || !out) { console.error('usage: compile19.js <bot dir> <out bundle.js>'); process.exit(2); }
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.startsWith('.') && fs.statSync(path.join(dir, f)).isFile());
if (!files.includes('robot.js')) { console.error('no robot.js in ' + dir); process.exit(1); }
const code = files.map(f => ({ filename: f, source: fs.readFileSync(path.join(dir, f), 'utf8') }));
const Compiler = require(path.join(engineDir(), 'compiler'));
Compiler.JS(code, bundle => {
  fs.writeFileSync(out, bundle);
  console.log(`bundled ${files.length} file(s) into ${bundle.length} bytes`);
}, err => { console.error('compile error: ' + err); process.exit(1); });
