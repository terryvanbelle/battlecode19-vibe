// idle.mjs TEAM MAXROUND REPLAY: idle miners beside free safe home depots (h174's mechanism read), TEAM's side,
// rounds 1..MAXROUND. At each round's end:
//   S = unmined safe home depots: a K/F depot within 3 king steps of a living castle/church of TEAM, not mined this
//       round, outside every enemy attacker's threat radius (THREAT_R2: castle 64, crusader 49, prophet 64,
//       preacher 36) and not occupied by an enemy robot;
//   H = hot home depots: home depots inside some enemy attacker's threat radius;
//   L = TEAM's idle pilgrims: no mine, give or build this round and carrying nothing (not on the way to deposit).
// Prints one JSON line: waste = sum over rounds of min(S, L), rounds = rounds with min(S, L) > 0, S, L, H summed over
// rounds; stuckM = sum over rounds of min(S, miners idle 20+ rounds in a row), stuckP = the same for pioneers (castle
// builds radioing SIG.CHURCH) on the depots the miners leave; chainers and links (built radioing SIG.CHAIN) wait for
// the bank by design and are left out; nM = distinct miners ever counted in stuckM.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const THREAT_R2 = [64, 0, 0, 49, 64, 36];
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const [team, maxRound, f] = [+process.argv[2], +process.argv[3], process.argv[4]];
if (!(team === 0 || team === 1) || !(maxRound > 0) || !f) { console.error('usage: node tools/reads/idle.mjs TEAM MAXROUND REPLAY'); process.exit(2); }
let deps = null; const c = { waste: 0, rounds: 0, S: 0, L: 0, H: 0, stuckP: 0, stuckM: 0, nM: 0 };
let mined = new Set(), active = new Set(); const pion = new Set(), chain = new Set(), streak = new Map(), seenM = new Set();
const STOP = {};
try { simulate(fs.readFileSync(f), {
  onTurn({ robot, rec, error, born }) {
    if (!error && robot.team === team && rec.action === 3 && rec.build_unit === 2 && rec.signal_radius > 0) {
      const kind = rec.signal >> 12;
      for (const b of born) if (b.unit === 2) { if (kind === 2 && robot.unit === 0) pion.add(b.id); if (kind === 10) chain.add(b.id); }
    }
    if (error || robot.team !== team || robot.unit !== 2) return;
    if (rec.action === 4) { mined.add(robot.x + ',' + robot.y); active.add(robot.id); }
    else if (rec.action === 3 || rec.action === 6) active.add(robot.id);
  },
  onStart(g) {
    deps = [];
    const n = g.map.length;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (g.karbonite_map[y][x] || g.fuel_map[y][x]) deps.push([x, y]);
  },
  onRoundEnd(round, g) {
    const mn = mined, ac = active; mined = new Set(); active = new Set();
    if (round > maxRound) throw STOP;
    const ours = g.robots.filter(r => r.team === team), theirs = g.robots.filter(r => r.team !== team);
    const structs = ours.filter(r => r.unit <= 1), atk = theirs.filter(r => THREAT_R2[r.unit] > 0);
    const occ = new Set(theirs.map(r => r.x + ',' + r.y));
    let S = 0, H = 0;
    for (const [x, y] of deps) {
      if (!structs.some(s => king(s.x, s.y, x, y) <= 3)) continue;
      if (atk.some(e => (e.x - x) ** 2 + (e.y - y) ** 2 <= THREAT_R2[e.unit])) { H++; continue; }
      if (!occ.has(x + ',' + y) && !mn.has(x + ',' + y)) S++;
    }
    const idle = ours.filter(r => r.unit === 2 && !ac.has(r.id) && !r.karbonite && !r.fuel);
    const now = new Map(); for (const r of idle) now.set(r.id, (streak.get(r.id) || 0) + 1);
    streak.clear(); for (const [k, v] of now) streak.set(k, v);
    const longP = idle.filter(r => now.get(r.id) >= 20 && pion.has(r.id));
    const longM = idle.filter(r => now.get(r.id) >= 20 && !pion.has(r.id) && !chain.has(r.id));
    const sm = Math.min(S, longM.length); c.stuckM += sm; c.stuckP += Math.min(S - sm, longP.length);
    if (sm) for (const r of longM) seenM.add(r.id);
    c.nM = seenM.size;
    const m = Math.min(S, idle.length);
    c.waste += m; c.S += S; c.L += idle.length; c.H += H; if (m > 0) c.rounds++;
  },
}); } catch (e) { if (e !== STOP) throw e; }
console.log(JSON.stringify(c));
