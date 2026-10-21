#!/usr/bin/env node
// Parallel game batches. Every game runs in its own process inside `unshare -rn` (no network), on the VM.
//
//   node tools/batch.js --a <bot dir> --b <bot dir> --seeds 1,2,3 | --seed-file f | --random N [--seed0 S]
//        [--sides both|a-red] [--par 6] --out results.jsonl [--replays dir] [--tag name]
//
// One JSON row per game: {tag, a, b, a_hash, b_hash, seed, a_side, winner_is_a, reason, rounds, ...runner fields}.
// Rows are keyed by (a_hash, b_hash, seed, a_side): the same cell is never played twice into one file.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn, execSync } = require('child_process');
const ROOT = path.join(__dirname, '..');

function codeHash(p) {
  const h = crypto.createHash('sha256');
  const st = fs.statSync(p);
  const files = st.isFile() ? [p] : fs.readdirSync(p).filter(f => f.endsWith('.js')).sort().map(f => path.join(p, f));
  for (const f of files) { h.update(path.basename(f)); h.update(fs.readFileSync(f)); }
  return h.digest('hex').slice(0, 12);
}

function validSeeds() {
  const rows = fs.readFileSync(path.join(ROOT, 'maps', 'corpus.tsv'), 'utf8').trim().split('\n').slice(1);
  return rows.map(r => r.split('\t')).filter(v => v[1] === '1').map(v => +v[0]);
}

function parse(argv) {
  const a = { sides: 'both', par: 6, tag: '' };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i], v = () => argv[++i];
    if (k === '--a') a.a = v(); else if (k === '--b') a.b = v();
    else if (k === '--seeds') a.seeds = v().split(',').map(Number);
    else if (k === '--seed-file') a.seeds = fs.readFileSync(v(), 'utf8').trim().split(/\s+/).map(Number);
    else if (k === '--random') a.random = +v(); else if (k === '--seed0') a.seed0 = +v();
    else if (k === '--sides') a.sides = v(); else if (k === '--par') a.par = +v();
    else if (k === '--out') a.out = v(); else if (k === '--replays') a.replays = v(); else if (k === '--tag') a.tag = v();
    else if (k === '--timescale') a.timescale = v();
    else throw new Error('unknown ' + k);
  }
  if (!a.a || !a.b || !a.out) throw new Error('need --a --b --out');
  if (!a.seeds) {
    const all = validSeeds(); let s = (a.seed0 || Date.now()) >>> 0; a.seeds = [];
    const n = a.random || 10;
    while (a.seeds.length < n) { s = (s * 1103515245 + 12345) >>> 0; const v = all[s % all.length]; if (!a.seeds.includes(v)) a.seeds.push(v); }
  }
  return a;
}

function sandboxed() {
  try { execSync('unshare -rn true', { stdio: 'ignore' }); return true; } catch (e) { return false; }
}

async function main() {
  const o = parse(process.argv);
  if (!sandboxed()) { console.error('unshare -rn unavailable: refusing to run bot code without a network sandbox'); process.exit(3); }
  const ah = codeHash(o.a), bh = codeHash(o.b);
  const done = new Set();
  if (fs.existsSync(o.out)) for (const l of fs.readFileSync(o.out, 'utf8').split('\n')) if (l) { const r = JSON.parse(l); done.add([r.a_hash, r.b_hash, r.seed, r.a_side].join(':')); }
  const jobs = [];
  for (const seed of o.seeds) for (const side of (o.sides === 'both' ? ['red', 'blue'] : ['red'])) {
    if (!done.has([ah, bh, seed, side].join(':'))) jobs.push({ seed, side });
  }
  if (o.replays) fs.mkdirSync(o.replays, { recursive: true });
  const node = process.execPath;
  let next = 0, finished = 0;
  const out = fs.openSync(o.out, 'a');
  console.error(`batch ${o.tag || ''}: ${jobs.length} games, a=${ah} b=${bh}, par ${o.par}`);
  await new Promise(resolve => {
    const launch = () => {
      if (next >= jobs.length) { if (finished === jobs.length) resolve(); return; }
      const j = jobs[next++];
      const red = j.side === 'red' ? o.a : o.b, blue = j.side === 'red' ? o.b : o.a;
      const args = ['-rn', node, path.join(ROOT, 'tools', 'run_game.js'), '--red', red, '--blue', blue, '--seed', String(j.seed)];
      if (o.replays) args.push('--replay', path.join(o.replays, `${ah}_${bh}_${j.seed}_${j.side}.bc19`),
        '--errlog', path.join(o.replays, `${ah}_${bh}_${j.seed}_${j.side}.err.jsonl`));
      if (o.timescale) args.push('--timescale', o.timescale);
      const p = spawn('unshare', args, { stdio: ['ignore', 'pipe', 'pipe'] });
      let so = '', se = '';
      p.stdout.on('data', d => { so += d; }); p.stderr.on('data', d => { se += d; });
      p.on('close', code => {
        let row;
        try {
          const r = JSON.parse(so.trim().split('\n').pop());
          const ai = j.side === 'red' ? 0 : 1;
          row = { tag: o.tag, a: o.a, b: o.b, a_hash: ah, b_hash: bh, seed: j.seed, a_side: j.side,
            winner_is_a: r.winner === j.side ? 1 : 0, reason: r.reason, rounds: r.rounds, wall_s: r.wall_s,
            a_team: r.teams[ai], b_team: r.teams[1 - ai], map: r.map, t: new Date().toISOString() };
        } catch (e) { row = { tag: o.tag, a_hash: ah, b_hash: bh, seed: j.seed, a_side: j.side, error: (se || so).slice(-500), code }; }
        fs.writeSync(out, JSON.stringify(row) + '\n');
        finished++; launch();
        if (finished === jobs.length) resolve();
      });
    };
    for (let i = 0; i < o.par; i++) launch();
    if (!jobs.length) resolve();
  });
  fs.closeSync(out);
  console.error('batch done');
}
module.exports = { codeHash };
if (require.main === module) main().catch(e => { console.error(e.stack || e); process.exit(2); });
