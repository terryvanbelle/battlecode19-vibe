#!/usr/bin/env node
// Delivery numbers: per replay and team, the counts pre-registered delivery items are written in (TRAINING_LOG).
// Batch replays are named <ahash>_<bhash>_<seed>_<aside>.bc19 and their teams labelled a / b (the --a / --b bots);
// other replays keep red / blue. Two-team games: one team's kills are the other's losses.
//
//   node tools/dlv.js [--from R --to R] [--seeds 905,2855] <replay...>   # TSV per file and label, then SUM per label
//
// Columns: milBuilt, milLost, milLostUnfired (never fired an attack), meleeLost / meleeLostUnfired (crusaders and
// preachers), deathsOn3 (military deaths on tiles where the same team lost 3 or more), killsByMelee / killsByProphet
// (enemy military killed by our crusaders and preachers / prophets), shots, atkFuel, dmgDealt (to the other team),
// shotsW / moveW / moveMilW (shots, all move fuel, military move fuel in rounds from..to), castlesLost, churchesBuilt,
// spots (prophet radio at r2 99), recalls (castle radio at r2 2501), fuel500 / fuelTo (bank at round 500 / to),
// karbEnd / fuelEnd, win; idleContact / idleContactP (military / prophet turns in from..to with no action while an
// enemy attacker within r2 196, out of the unit's own attack range, has a friend of the unit in its attack range);
// atCastle450 (military units whose nearest own structure, in king steps, is a castle within 6, at round 450),
// churchesLost, churchesLost100 (by round 100), mines450 (pilgrim mine actions to round 450), stillborn (military units
// that died before their first turn: built in reach of enemies that act later in the round).
'use strict';
const fs = require('fs'), path = require('path');
const R = require('./replay');

const ATK = [10, 0, 0, 10, 25, 15], MOVE = [0, 0, 1, 1, 2, 3];
const RNG = [[1, 64], null, null, [1, 16], [16, 64], [1, 16]];
const d2 = (ax, ay, b) => (ax - b.x) ** 2 + (ay - b.y) ** 2;

// Military units of team t whose nearest own structure (king steps; castle first on ties) is a castle within k.
function atCastle(g, t, k) {
  const st = g.robots.filter(r => r.team === t && r.unit <= 1);
  let c = 0;
  for (const u of g.robots) {
    if (u.team !== t || u.unit < 3) continue;
    let bd = 1e9, bu = -1;
    for (const s of st) { const d = Math.max(Math.abs(s.x - u.x), Math.abs(s.y - u.y)); if (d < bd || (d === bd && s.unit < bu)) { bd = d; bu = s.unit; } }
    if (bd <= k && bu === 0) c++;
  }
  return c;
}

// A fight this unit (at its tile before the turn) could join but cannot reach: see idleContact above.
function contact(g, r) {
  for (const e of g.robots) {
    if (e.team === r.team || !RNG[e.unit]) continue;
    const q = d2(r.x0, r.y0, e);
    if (q > 196 || (q >= RNG[r.unit][0] && q <= RNG[r.unit][1])) continue;
    for (const f of g.robots) {
      if (f.team !== r.team || f.id === r.id) continue;
      const k = d2(f.x, f.y, e); if (k >= RNG[e.unit][0] && k <= RNG[e.unit][1]) return true;
    }
  }
  return false;
}
const COLS = ['milBuilt', 'milLost', 'milLostUnfired', 'meleeLost', 'meleeLostUnfired', 'deathsOn3', 'killsByMelee',
  'killsByProphet', 'shots', 'atkFuel', 'dmgDealt', 'shotsW', 'moveW', 'moveMilW', 'castlesLost', 'churchesBuilt', 'spots',
  'recalls', 'fuel500', 'fuelTo', 'karbEnd', 'fuelEnd', 'win', 'idleContact', 'idleContactP', 'atCastle450', 'churchesLost',
  'churchesLost100', 'mines450', 'stillborn'];

function stats(buf, { from = 0, to = 1000 } = {}) {
  const s = [0, 1].map(() => Object.fromEntries(COLS.map(c => [c, 0])));
  const fired = new Set(), acted = new Set(), tiles = [new Map(), new Map()];
  const res = R.simulate(buf, {
    onTurn({ round, robot, rec, born, died, damage, error, game }) {
      acted.add(robot.id);
      if (robot.unit >= 3 && round >= from && round <= to && (error || !rec.action) && contact(game, robot)) {
        s[robot.team].idleContact++; if (robot.unit === 4) s[robot.team].idleContactP++;
      }
      for (const b of born) { if (b.unit >= 3) s[b.team].milBuilt++; if (b.unit === 1) s[b.team].churchesBuilt++; }
      if (!error && rec.action === 2) {
        fired.add(robot.id);
        const T = s[robot.team];
        T.shots++; T.atkFuel += ATK[robot.unit];
        if (round >= from && round <= to) T.shotsW++;
        for (const d of damage) if (d.team !== robot.team) T.dmgDealt += d.dmg;
      }
      if (!error && rec.action === 1 && round >= from && round <= to) {
        const f = (rec.dx * rec.dx + rec.dy * rec.dy) * MOVE[robot.unit];
        s[robot.team].moveW += f; if (robot.unit >= 3) s[robot.team].moveMilW += f;
      }
      if (!error && rec.action === 4 && round <= 450) s[robot.team].mines450++;
      if (rec.signal_radius === 99 && robot.unit === 4) s[robot.team].spots++;
      if (rec.signal_radius === 2501 && robot.unit === 0) s[robot.team].recalls++;
      for (const d of died) {
        const T = s[d.team];
        if (d.unit === 0) T.castlesLost++;
        if (d.unit === 1) { T.churchesLost++; if (round <= 100) T.churchesLost100++; }
        if (d.unit < 3) continue;
        T.milLost++;
        if (!fired.has(d.id)) T.milLostUnfired++;
        if (!acted.has(d.id)) T.stillborn++;
        if (d.unit !== 4) { T.meleeLost++; if (!fired.has(d.id)) T.meleeLostUnfired++; }
        const k = d.y * 64 + d.x; tiles[d.team].set(k, (tiles[d.team].get(k) || 0) + 1);
        if (d.team !== robot.team) {
          if (d.by_unit === 3 || d.by_unit === 5) s[robot.team].killsByMelee++;
          else if (d.by_unit === 4) s[robot.team].killsByProphet++;
        }
      }
    },
    onRoundEnd(round, g) {
      if (round === 500) for (const t of [0, 1]) s[t].fuel500 = g.fuel[t];
      if (round === 450) for (const t of [0, 1]) s[t].atCastle450 = atCastle(g, t, 6);
      if (round === to) for (const t of [0, 1]) s[t].fuelTo = g.fuel[t];
    },
  });
  for (const t of [0, 1]) {
    for (const c of tiles[t].values()) if (c >= 3) s[t].deathsOn3 += c;
    s[t].karbEnd = res.game.karbonite[t]; s[t].fuelEnd = res.game.fuel[t];
    s[t].win = res.header.winner === t ? 1 : 0;
  }
  return { seed: res.header.seed, teams: s };
}

// Labels of the red and blue teams from a replay's file name.
function labels(file) {
  const m = path.basename(file).match(/_(\d+)_(red|blue)\.bc19$/);
  return m ? (m[2] === 'red' ? ['a', 'b'] : ['b', 'a']) : ['red', 'blue'];
}

function main(argv) {
  const opt = { from: 0, to: 1000, seeds: null }, files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--from') opt.from = +argv[++i];
    else if (argv[i] === '--to') opt.to = +argv[++i];
    else if (argv[i] === '--seeds') opt.seeds = new Set(argv[++i].split(',').map(Number));
    else files.push(argv[i]);
  }
  const sum = {}, out = [['file', 'seed', 'label', ...COLS].join('\t')];
  for (const f of files) {
    const r = stats(fs.readFileSync(f), opt);
    if (opt.seeds && !opt.seeds.has(r.seed)) continue;
    const lab = labels(f);
    for (const t of [0, 1]) {
      out.push([path.basename(f), r.seed, lab[t], ...COLS.map(c => r.teams[t][c])].join('\t'));
      const S = sum[lab[t]] || (sum[lab[t]] = Object.fromEntries(COLS.map(c => [c, 0])));
      for (const c of COLS) S[c] += r.teams[t][c];
    }
  }
  for (const l of Object.keys(sum).sort()) out.push(['SUM', '', l, ...COLS.map(c => sum[l][c])].join('\t'));
  return out.join('\n');
}

if (require.main === module) console.log(main(process.argv.slice(2)));
module.exports = { stats, labels, main, contact, atCastle, COLS };
