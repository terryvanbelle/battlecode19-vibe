// escorts.mjs TEAM REPLAY: TEAM's guards (structure builds radioing SIG.GUARD; h171's mechanism read), one JSON line
// each: id, round built, site (radioed, absolute), at (first round within 2 king steps of the site), hit (first round
// an enemy prophet or castle damages it) and by, k0 / k6 (king steps from the site at the hit and 6 rounds after),
// dead (round) and by (killer's unit), hit6 (1: dead within 6 rounds of the first hit, 0: not, null: never hit), kills
// ([round, unit letter] of enemy units it killed) and pc60 (enemy pilgrims and churches it killed before r60).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { makeTransform, detectSymmetry } from '../../src/bot/world.js';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const U = 'XhPCRE';
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/escorts.mjs TEAM REPLAY'); process.exit(2); }
const G = new Map(); let T = null;
simulate(fs.readFileSync(f), {
  onStart(g) { const sym = detectSymmetry(g.map, g.karbonite_map, g.fuel_map), n = g.map.length; T = [0, 1].map(t => makeTransform(sym, t, n)); },
  onTurn({ round, robot, rec, born, died, damage, error }) {
    const me = G.get(robot.id);
    if (me && !me.dead) for (const d of died) if (d.team !== team) me.kills.push([round, U[d.unit]]);
    for (const d of damage) { const e = G.get(d.id); if (e && !e.hit && (robot.unit === 4 || robot.unit === 0) && robot.team !== team) { e.hit = round; e.hitBy = U[robot.unit]; } }
    for (const d of died) { const e = G.get(d.id); if (e && !e.dead) { e.dead = round; e.by = U[d.by_unit] ?? '?'; } }
    if (error || rec.action !== 3 || robot.team !== team || robot.unit > 1 || !(rec.signal_radius > 0) || rec.signal >> 12 !== 12) return;
    for (const b of born) { const [x, y] = T[b.team].toE((rec.signal >> 6) & 63, rec.signal & 63); G.set(b.id, { id: b.id, round, site: [x, y], kills: [] }); }
  },
  onRoundEnd(round, g) {
    for (const e of G.values()) {
      if (e.dead) continue;
      const r = g.robots.find(q => q.id === e.id); if (!r) continue;
      const k = Math.max(Math.abs(r.x - e.site[0]), Math.abs(r.y - e.site[1]));
      if (e.at === undefined && k <= 2) e.at = round;
      if (e.hit && e.k0 === undefined) e.k0 = k;
      if (e.hit && round === e.hit + 6) e.k6 = k;
    }
  },
});
for (const e of G.values()) {
  const hit6 = e.hit ? (e.dead && e.dead - e.hit <= 6 ? 1 : 0) : null;
  const pc60 = e.kills.filter(([r, u]) => r < 60 && (u === 'P' || u === 'h')).length;
  console.log(JSON.stringify({ id: e.id, round: e.round, site: e.site, at: e.at ?? null, hit: e.hit ?? null, hitBy: e.hitBy ?? null,
    k0: e.k0 ?? null, k6: e.k6 ?? null, dead: e.dead ?? null, by: e.by ?? null, hit6, kills: e.kills, pc60 }));
}
