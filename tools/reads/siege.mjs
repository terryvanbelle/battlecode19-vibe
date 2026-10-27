// siege.mjs TEAM REPLAY: home karbonite depots that an enemy attacker covers from outside every castle's reach.
// A home K depot is a karbonite depot within 3 king steps of a living castle or church of TEAM. At each round's end it
// is besieged when an enemy crusader, prophet or preacher can attack it from where it stands (crusader and preacher
// r2 <= 16, prophet 16 <= r2 <= 64) and no castle of TEAM can attack that unit (r2 > 64 from every one; churches do
// not attack). Prints one JSON line: covered (rounds with a besieged home K depot), denied (rounds with one that no
// pilgrim of TEAM mined that round), longest (the longest run of denied rounds) and from (the round it began).
// The case (TRAINING_LOG 2026-10-26 21:42): replica 1467-1, seed 1915, one blue prophet at r2 64 of our depot and 82 of
// our castle kept both home miners off it for 895 rounds.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const ATTACK = [null, null, null, [1, 16], [16, 64], [1, 16]];   // [min r2, max r2] by unit
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/siege.mjs TEAM REPLAY'); process.exit(2); }
let deps = null, mined = new Set(), run = 0, runFrom = 0;
const c = { covered: 0, denied: 0, longest: 0, from: null };
simulate(fs.readFileSync(f), {
  onStart(g) {
    deps = [];
    const n = g.map.length;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (g.karbonite_map[y][x]) deps.push([x, y]);
  },
  onTurn({ robot, rec, error }) {
    if (!error && robot.team === team && robot.unit === 2 && rec.action === 4) mined.add(robot.x + ',' + robot.y);
  },
  onRoundEnd(round, g) {
    const mn = mined; mined = new Set();
    const ours = g.robots.filter(r => r.team === team), structs = ours.filter(r => r.unit <= 1);
    const castles = ours.filter(r => r.unit === 0);
    const atk = g.robots.filter(r => r.team !== team && ATTACK[r.unit] &&
      castles.every(s => (s.x - r.x) ** 2 + (s.y - r.y) ** 2 > 64));
    let cov = false, den = false;
    for (const [x, y] of deps) {
      if (!structs.some(s => king(s.x, s.y, x, y) <= 3)) continue;
      if (!atk.some(e => { const d = (e.x - x) ** 2 + (e.y - y) ** 2, [lo, hi] = ATTACK[e.unit]; return d >= lo && d <= hi; })) continue;
      cov = true;
      if (!mn.has(x + ',' + y)) den = true;
    }
    if (cov) c.covered++;
    if (den) { c.denied++; if (!run) runFrom = round; run++; if (run > c.longest) { c.longest = run; c.from = runFrom; } }
    else run = 0;
  },
});
console.log(JSON.stringify(c));
