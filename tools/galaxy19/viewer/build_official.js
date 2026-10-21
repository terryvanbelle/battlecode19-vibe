#!/usr/bin/env node
// Assemble the official Battlecode 2019 replay viewer for the replica's /viewer/ page from pinned inputs:
//   * the official visualizer class, app/src/views/visualizer.js of github.com/battlecode/battlecode19 (GPL-3.0),
//     unchanged except that its two ES imports become globals (window.BC19Engine.Game, window.PIXI) and its default
//     export becomes window.BC19Visualizer;
//   * its unit images, app/public/assets/img/*.png (copied to <out>/assets/img/, where the class loads them);
//   * pixi.js 4.8.9 (dist/pixi.min.js; the official app pinned ^4.8.4), fetched once on the driver from
//     cdn.jsdelivr.net and unpkg.com (identical) into ~/projects/vibe/pixi-4.8.9.
// Every input is checked against PINS below; a mismatch aborts. No network access here.
//   node build_official.js <official repo dir> <pixi.min.js> <out dir>
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const pins = JSON.parse(fs.readFileSync(path.join(__dirname, 'PINS.json'), 'utf8'));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
function pinned(file, key) {
  const b = fs.readFileSync(file);
  if (!pins[key]) throw new Error('no pin for ' + key);
  if (sha(b) !== pins[key]) throw new Error(`${key}: sha256 ${sha(b)} != pinned ${pins[key]}`);
  return b;
}

function transform(src) {
  const imports = [
    ["import Game from 'bc19/game';", 'var Game = window.BC19Engine.Game;'],
    ['import * as PIXI from "pixi.js";', 'var PIXI = window.PIXI;'],
    ['export default Visualizer;', 'window.BC19Visualizer = Visualizer;'],
  ];
  for (const [a, b] of imports) {
    const n = src.split(a).length - 1;
    if (n !== 1) throw new Error(`visualizer.js: ${JSON.stringify(a)} found ${n} times (expected 1)`);
    src = src.replace(a, b);
  }
  if (/^\s*(import|export)\s/m.test(src)) throw new Error('visualizer.js: unexpected import/export left');
  return '// The official Battlecode 2019 visualizer (github.com/battlecode/battlecode19 app/src/views/visualizer.js,\n' +
    '// GPL-3.0), imports replaced by globals by tools/galaxy19/viewer/build_official.js.\n(function () {\n' + src + '\n})();\n';
}

function main() {
  const [repo, pixi, out] = process.argv.slice(2);
  if (!repo || !pixi || !out) { console.error('usage: build_official.js <official repo dir> <pixi.min.js> <out dir>'); process.exit(2); }
  fs.mkdirSync(path.join(out, 'assets', 'img'), { recursive: true });
  const vis = pinned(path.join(repo, 'app/src/views/visualizer.js'), 'app/src/views/visualizer.js').toString('utf8');
  fs.writeFileSync(path.join(out, 'visualizer-official.js'), transform(vis));
  fs.writeFileSync(path.join(out, 'pixi.min.js'), pinned(pixi, 'pixi.js@4.8.9/dist/pixi.min.js'));
  let n = 0;
  for (const key of Object.keys(pins)) {
    if (!key.startsWith('app/public/assets/img/')) continue;
    fs.writeFileSync(path.join(out, 'assets', 'img', path.basename(key)), pinned(path.join(repo, key), key));
    n++;
  }
  console.log(`viewer: visualizer-official.js, pixi.min.js, ${n} images -> ${out}`);
}

if (require.main === module) main();
module.exports = { transform };
