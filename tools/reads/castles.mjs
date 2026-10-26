// castles.mjs TEAM REPLAY: where TEAM's army stood when each of its castles fell. Prints one JSON line: lost (castles
// lost), and byLoss: per castle lost, {r: round, at: [x, y], hit: rounds from its first hit within the last 40 rounds
// to its death, foes: enemy attackers within r2 100 of it then, near / mid / far: TEAM's military units (crusaders,
// prophets, preachers) alive within r2 100, r2 100-400, beyond, and nearFired / midFired / farFired: of those, the
// ones that attacked in the castle's last 20 rounds}.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/castles.mjs TEAM REPLAY'); process.exit(2); }
const d2 = (a, b, x, y) => (a - x) ** 2 + (b - y) ** 2;
const fired = new Map(), hits = new Map(), c = { lost: 0, byLoss: [] };
simulate(fs.readFileSync(f), {
  onTurn({ round, robot, rec, died, damage, error, game }) {
    if (!error && rec.action === 2 && robot.team === team) fired.set(robot.id, round);
    for (const d of damage) if (d.team === team && d.unit === 0 && !d.killed) (hits.get(d.id) || hits.set(d.id, []).get(d.id)).push(round);
    for (const d of died) {
      if (d.team !== team || d.unit !== 0) continue;
      const h = (hits.get(d.id) || []).filter(r => r >= round - 40);
      const o = { r: round, at: [d.x, d.y], hit: h.length ? round - h[0] : 0, foes: 0, near: 0, mid: 0, far: 0, nearFired: 0, midFired: 0, farFired: 0 };
      for (const u of game.robots) {
        if (u.unit < 3) continue;
        const q = d2(u.x, u.y, d.x, d.y);
        if (u.team !== team) { if (q <= 100) o.foes++; continue; }
        const band = q <= 100 ? 'near' : q <= 400 ? 'mid' : 'far';
        o[band]++;
        if ((fired.get(u.id) || -1e9) >= round - 20) o[band + 'Fired']++;
      }
      c.lost++; c.byLoss.push(o);
    }
  },
});
console.log(JSON.stringify(c));
