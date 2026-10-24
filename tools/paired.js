#!/usr/bin/env node
// Paired read (TRAINING_ALGORITHM.md §4): candidate vs control on the same cells (opponent hash, seed, side).
//   node tools/paired.js results.jsonl --cand <a_hash> --ctrl <a_hash> [--opp <b_hash>]
//   node tools/paired.js results.jsonl --h2h      # a direct batch (A = candidate, B = control), one seed = one pair
//   node tools/paired.js results.jsonl --h2h --replays DIR   # ...and count cells whose two replays are byte-identical
// Only cells both builds played count. Discordant cells: one won, the other lost. net = gained - lost, t = net/sqrt(D).
// In --h2h mode a seed played from both sides is a pair: both won = gained, both lost = lost, a split says nothing.
// identical (--replays): cells whose two games are the same game (the switch changed no decision on that map: a
// split by construction); D is what sizes a look (TRAINING_ALGORITHM.md §4), so a look waits for D, not games.
// Rows lost to machine load are skipped: errors, round-0 init failures, and any robot init failure (our own builds
// never fail to load on an idle machine; LEARNINGS 8). Refuses when no cells match.
// Screen verdict (TRAINING_ALGORITHM.md step 6; the screen only rejects): t <= -1.5, castles lost by the candidate
// beyond the control's at a one-sided sign-flip p < 0.05 (--h2h: per seed, both sides summed), or more exceptions
// (thrown or caught) than the control. Frozen turns and timeouts are printed per million turns, not judged: the
// machine causes most of them (LEARNINGS 31).
'use strict';
const fs = require('fs');

const unusable = r => r.error || (r.rounds === 0 && /init_failure/.test(r.reason)) ||
  ((r.a_team && r.a_team.init_fail > 0) || (r.b_team && r.b_team.init_fail > 0));

// Castles a team lost: the map's castles minus those alive at the end; null for rows without unit counts.
const castlesLost = (r, t) => r.map && r[t] && r[t].units ? r.map.castles - (r[t].units['0'] || 0) : null;

// One-sided sign-flip test on per-cell differences d (candidate minus control): the chance that random signs on |d|
// sum to at least the observed sum. Exact, from the distribution of the sums.
function signFlip(ds) {
  const nz = ds.filter(d => d !== 0), sum = nz.reduce((s, d) => s + d, 0);
  let dist = new Map([[0, 1]]);
  for (const d of nz) {
    const next = new Map();
    for (const [s, c] of dist) for (const v of [s + Math.abs(d), s - Math.abs(d)]) next.set(v, (next.get(v) || 0) + c / 2);
    dist = next;
  }
  let p = 0;
  for (const [s, c] of dist) if (s >= sum) p += c;
  return { cells: ds.length, nonzero: nz.length, sum, p: +p.toFixed(4) };
}

const BASICS = ['exceptions', 'exc_caught', 'frozen', 'timeouts', 'turns'];
function addBasics(acc, team) { for (const k of BASICS) acc[k] = (acc[k] || 0) + ((team && team[k]) || 0); return acc; }
const perM = b => ({ frozen_per_M: b.turns ? +(b.frozen * 1e6 / b.turns).toFixed(1) : 0,
  timeouts_per_M: b.turns ? +(b.timeouts * 1e6 / b.turns).toFixed(1) : 0 });

function verdict(r) {
  const why = [];
  if (r.t <= -1.5) why.push(`t ${r.t.toFixed(2)}`);
  if (r.castles && r.castles.p < 0.05) why.push(`castles lost +${r.castles.sum} (sign-flip p ${r.castles.p})`);
  for (const k of ['exceptions', 'exc_caught']) if (r.basics.cand[k] > r.basics.ctrl[k]) why.push(`${k} ${r.basics.cand[k]} vs ${r.basics.ctrl[k]}`);
  return why.length ? 'REJECT: ' + why.join('; ') : 'pass to the panel';
}

// same(a_hash, b_hash, seed): true when the cell's two replays are byte-identical, null when unknown.
function h2hRead(rows, same) {
  const bySeed = new Map(); let skipped = 0;
  for (const r of rows) {
    if (unusable(r)) { skipped++; continue; }
    const k = `${r.a_hash}:${r.b_hash}:${r.seed}`, p = bySeed.get(k) || { rows: [] };
    p[r.a_side] = r.winner_is_a ? 1 : 0; p.rows.push(r); bySeed.set(k, p);
  }
  let cells = 0, gained = 0, lost = 0, split = 0, wins = 0, games = 0, identical = same ? 0 : undefined;
  const ds = [], cand = {}, ctrl = {};
  let lostA = 0, lostB = 0;
  for (const [k, p] of bySeed) {
    for (const s of ['red', 'blue']) if (s in p) { games++; wins += p[s]; }
    if (!('red' in p) || !('blue' in p)) continue;
    cells++; const w = p.red + p.blue; if (w === 2) gained++; else if (w === 0) lost++; else split++;
    if (same) { const [a, b, seed] = k.split(':'); if (same(a, b, +seed)) identical++; }
    for (const r of p.rows) { addBasics(cand, r.a_team); addBasics(ctrl, r.b_team); }
    const la = p.rows.map(r => castlesLost(r, 'a_team')), lb = p.rows.map(r => castlesLost(r, 'b_team'));
    if (la.concat(lb).every(x => x !== null)) {
      const a = la.reduce((s, x) => s + x, 0), b = lb.reduce((s, x) => s + x, 0);
      lostA += a; lostB += b; ds.push(a - b);
    }
  }
  const D = gained + lost, net = gained - lost;
  const castles = ds.length ? { cand_lost: lostA, ctrl_lost: lostB, ...signFlip(ds) } : null;
  const r = { cells, games, wins, gained, lost, split, D, net, t: D ? net / Math.sqrt(D) : 0, skipped, identical, castles,
    basics: { cand: { ...cand, ...perM(cand) }, ctrl: { ...ctrl, ...perM(ctrl) } } };
  r.verdict = verdict(r);
  return r;
}

function pairedRead(rows, cand, ctrl, opp) {
  const key = r => `${r.b_hash}:${r.seed}:${r.a_side}`;
  const A = new Map(), C = new Map();
  for (const r of rows) {
    if (unusable(r) || (opp && r.b_hash !== opp)) continue;
    if (r.a_hash === cand) A.set(key(r), r); else if (r.a_hash === ctrl) C.set(key(r), r);
  }
  let n = 0, gained = 0, lost = 0, aw = 0, cw = 0;
  const byOpp = {}, cb = {}, kb = {};
  for (const [k, a] of A) {
    const c = C.get(k); if (!c) continue;
    n++; aw += a.winner_is_a; cw += c.winner_is_a; addBasics(cb, a.a_team); addBasics(kb, c.a_team);
    const o = byOpp[a.b_hash] || (byOpp[a.b_hash] = { n: 0, gained: 0, lost: 0 }); o.n++;
    if (a.winner_is_a && !c.winner_is_a) { gained++; o.gained++; }
    if (!a.winner_is_a && c.winner_is_a) { lost++; o.lost++; }
  }
  const D = gained + lost, net = gained - lost;
  return { cells: n, cand_wins: aw, ctrl_wins: cw, gained, lost, D, net, t: D ? net / Math.sqrt(D) : 0, byOpp,
    basics: { cand: { ...cb, ...perM(cb) }, ctrl: { ...kb, ...perM(kb) } }, get verdict() { return verdict(this); } };
}

if (require.main === module) {
  const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
  const rows = fs.readFileSync(argv[0], 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
  const dir = opt('--replays'), path = require('path');
  // Batch replays are named <a_hash>_<b_hash>_<seed>_<a_side>.bc19 (tools/xbatch.js, jobq gates).
  const same = dir && ((a, b, seed) => {
    const f = s => path.join(dir, `${a}_${b}_${seed}_${s}.bc19`);
    if (!fs.existsSync(f('red')) || !fs.existsSync(f('blue'))) return null;
    return fs.readFileSync(f('red')).equals(fs.readFileSync(f('blue')));
  });
  const r = argv.includes('--h2h') ? h2hRead(rows, same) : pairedRead(rows, opt('--cand'), opt('--ctrl'), opt('--opp'));
  if (!r.cells) { console.error('no matching cells: refusing to read'); process.exit(4); }
  console.log(JSON.stringify(r));
}
module.exports = { pairedRead, h2hRead, signFlip };
