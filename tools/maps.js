#!/usr/bin/env node
// Map corpus for Battlecode 2019. The engine generates every map from a seed (game.js makeMap); some seeds give a
// broken map (no castles). This tool enumerates seeds and records each map's features.
//
//   node tools/maps.js corpus --from 1 --count 3000 > maps/corpus.tsv   # one row per seed (valid or not)
//   node tools/maps.js show --seed N                                   # ASCII map: # wall, K karbonite, F fuel,
//                                                                      #   R/B castles, . open
// Features: seed, valid, size, castles (per team), sym (H = mirror across the horizontal midline, y -> h-1-y;
// V = across the vertical midline, x -> w-1-x), karb, fuel (depot tiles), open (passable share), cdist (BFS steps,
// king moves, between the nearest red and blue castles), kn/fn (karbonite / fuel depots within 6 king-steps of our
// nearest castle, averaged over teams).
'use strict';
const path = require('path');
const Game = require(path.join(__dirname, '..', 'engine', 'node_modules', 'bc19', 'game'));

function makeGame(seed) { return new Game(seed, 100, 20, false, false); }

function symmetry(map) {
  const n = map.length;
  let h = true, v = true;
  for (let y = 0; y < n && (h || v); y++) for (let x = 0; x < n; x++) {
    if (map[y][x] !== map[n - 1 - y][x]) h = false;
    if (map[y][x] !== map[y][n - 1 - x]) v = false;
  }
  return h && v ? 'HV' : h ? 'H' : v ? 'V' : '?';
}

function bfs(map, sx, sy) {
  const n = map.length, d = new Int32Array(n * n).fill(-1), q = [sy * n + sx];
  d[sy * n + sx] = 0;
  for (let i = 0; i < q.length; i++) {
    const c = q[i], x = c % n, y = (c / n) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if ((dx || dy) && nx >= 0 && ny >= 0 && nx < n && ny < n && map[ny][nx] && d[ny * n + nx] < 0) {
        d[ny * n + nx] = d[c] + 1; q.push(ny * n + nx);
      }
    }
  }
  return d;
}

function features(seed) {
  const g = makeGame(seed);
  const n = g.map.length;
  const red = g.robots.filter(r => r.team === 0), blue = g.robots.filter(r => r.team === 1);
  const row = { seed, valid: red.length > 0 && red.length === blue.length ? 1 : 0, size: n, castles: red.length };
  let karb = 0, fuel = 0, open = 0;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (g.map[y][x]) open++;
    if (g.karbonite_map[y][x]) karb++;
    if (g.fuel_map[y][x]) fuel++;
  }
  Object.assign(row, { sym: symmetry(g.map), karb, fuel, open: +(open / (n * n)).toFixed(3) });
  if (row.valid) {
    let best = Infinity, kn = 0, fn = 0;
    for (const team of [red, blue]) {
      const other = team === red ? blue : red;
      let near = Infinity, nk = 0, nf = 0;
      for (const c of team) {
        const d = bfs(g.map, c.x, c.y);
        for (const o of other) { const v = d[o.y * n + o.x]; if (v >= 0 && v < best) best = v; }
        let ck = 0, cf = 0;
        for (let i = 0; i < n * n; i++) if (d[i] >= 0 && d[i] <= 6) {
          const x = i % n, y = (i / n) | 0;
          if (g.karbonite_map[y][x]) ck++;
          if (g.fuel_map[y][x]) cf++;
        }
        nk += ck; nf += cf;
      }
      kn += nk / team.length; fn += nf / team.length; void near;
    }
    row.cdist = best === Infinity ? -1 : best;
    row.kn = +(kn / 2).toFixed(1); row.fn = +(fn / 2).toFixed(1);
  } else { row.cdist = -1; row.kn = 0; row.fn = 0; }
  return row;
}

function show(seed) {
  const g = makeGame(seed);
  const n = g.map.length, out = [];
  for (let y = 0; y < n; y++) {
    let s = '';
    for (let x = 0; x < n; x++) {
      const r = g.robots.find(r => r.x === x && r.y === y);
      s += r ? (r.team === 0 ? 'R' : 'B') : !g.map[y][x] ? '#' : g.karbonite_map[y][x] ? 'K' : g.fuel_map[y][x] ? 'F' : '.';
    }
    out.push(s);
  }
  return out.join('\n');
}

const COLS = ['seed', 'valid', 'size', 'castles', 'sym', 'karb', 'fuel', 'open', 'cdist', 'kn', 'fn'];
if (require.main === module) {
  const argv = process.argv.slice(2), cmd = argv[0];
  const opt = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
  if (cmd === 'corpus') {
    const from = parseInt(opt('--from') || '1', 10), count = parseInt(opt('--count') || '1000', 10);
    console.log(COLS.join('\t'));
    for (let s = from; s < from + count; s++) { const r = features(s); console.log(COLS.map(c => r[c]).join('\t')); }
  } else if (cmd === 'show') {
    console.log(show(parseInt(opt('--seed'), 10)));
    console.log(JSON.stringify(features(parseInt(opt('--seed'), 10))));
  } else { console.error('usage: maps.js corpus|show ...'); process.exit(1); }
}
module.exports = { features, symmetry, bfs, show, COLS };
