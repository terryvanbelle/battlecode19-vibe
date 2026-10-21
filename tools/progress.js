#!/usr/bin/env node
// Progress chart: results/progress.tsv (date, version, opponent, games, wins; one row per accepted build and
// reference opponent) -> results/progress.svg, one line per opponent, win % by version in acceptance order.
//   node tools/progress.js [tsv] [svg]
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function load(file) {
  const rows = fs.readFileSync(file, 'utf8').trim().split('\n').slice(1).filter(Boolean).map(l => l.split('\t'));
  return rows.map(([date, version, opponent, games, wins]) => ({ date, version, opponent, games: +games, wins: +wins }));
}

function render(rows) {
  const versions = [...new Set(rows.map(r => r.version))], opps = [...new Set(rows.map(r => r.opponent))];
  const W = 720, H = 360, L = 50, R = 150, T = 30, B = 40, pw = W - L - R, ph = H - T - B;
  const X = i => L + (versions.length < 2 ? pw / 2 : i * pw / (versions.length - 1)), Y = p => T + ph * (1 - p);
  const colors = ['#2a6fdb', '#d9822b', '#3a9e5c', '#c23b3b', '#7a52c7', '#8a8a8a', '#0f9aa8', '#b8860b'];
  const out = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="sans-serif" font-size="12">`,
    `<rect width="${W}" height="${H}" fill="#fff"/>`, `<text x="${L}" y="18" font-size="14">Win rate of each accepted build</text>`];
  for (const p of [0, 0.25, 0.5, 0.75, 1]) out.push(`<line x1="${L}" x2="${L + pw}" y1="${Y(p)}" y2="${Y(p)}" stroke="#ddd"/>`,
    `<text x="${L - 6}" y="${Y(p) + 4}" text-anchor="end">${p * 100}%</text>`);
  versions.forEach((v, i) => out.push(`<text x="${X(i)}" y="${H - B + 18}" text-anchor="middle">${v}</text>`));
  opps.forEach((o, k) => {
    const c = colors[k % colors.length];
    const pts = versions.map((v, i) => { const r = rows.find(q => q.version === v && q.opponent === o); return r && r.games ? [X(i), Y(r.wins / r.games), r] : null; }).filter(Boolean);
    if (pts.length > 1) out.push(`<polyline fill="none" stroke="${c}" stroke-width="2" points="${pts.map(p => p[0] + ',' + p[1]).join(' ')}"/>`);
    for (const [x, y, r] of pts) out.push(`<circle cx="${x}" cy="${y}" r="3.5" fill="${c}"><title>${o}: ${r.wins}/${r.games}</title></circle>`);
    out.push(`<rect x="${L + pw + 14}" y="${T + k * 18}" width="10" height="10" fill="${c}"/>`, `<text x="${L + pw + 30}" y="${T + k * 18 + 9}">${o}</text>`);
  });
  out.push('</svg>');
  return out.join('\n') + '\n';
}

module.exports = { load, render };
if (require.main === module) {
  const tsv = process.argv[2] || path.join(ROOT, 'results', 'progress.tsv'), svg = process.argv[3] || path.join(ROOT, 'results', 'progress.svg');
  fs.writeFileSync(svg, render(load(tsv)));
  console.log('wrote ' + svg);
}
