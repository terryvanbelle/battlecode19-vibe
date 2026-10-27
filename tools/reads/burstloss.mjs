// burstloss.mjs TEAM REPLAY [N T]: TEAM's chain-line bursts (churches built in a round in which TEAM builds 3+, from
// r150; the military each builds in its first 40 rounds). Prints one JSON line: churches, built, k (karbonite of the
// built units), young (died within T rounds of birth, default 10), youngNil (of those, dealt no damage), dmg and kills
// (damage dealt and units killed by them, castles in killsC), foes (per church, the most enemy crusaders, prophets
// and preachers within r2 100 of it, its vision, at the end of a round of its burst), and stop: a church that ends its
// burst once N (default 3) of its units have died within T rounds of birth: units it would not build, their k, dmg,
// kills and killsC.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
const N = +(process.argv[4] || 3), T = +(process.argv[5] || 10);
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/burstloss.mjs TEAM REPLAY [N T]'); process.exit(2); }
const COST = [0, 0, 10, 15, 25, 30];
const d2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
const churchRound = new Map(), lineChurch = new Map(), units = new Map();   // church id -> {r, foes}; unit id -> record
simulate(fs.readFileSync(f), {
  onTurn({ round, robot, rec, born, died, damage }) {
    if (robot.team === team && rec.action === 3 && round >= 150) for (const b of born) {
      if (b.unit === 1) {
        if (!churchRound.has(round)) churchRound.set(round, []);
        churchRound.get(round).push(b.id);
        if (churchRound.get(round).length === 3) for (const id of churchRound.get(round)) lineChurch.set(id, { r: round, foes: 0, n: [] });
        else if (churchRound.get(round).length > 3) lineChurch.set(b.id, { r: round, foes: 0, n: [] });
      } else if (b.unit >= 3 && lineChurch.has(robot.id) && round < lineChurch.get(robot.id).r + 40) {
        const u = { church: robot.id, r: round, unit: b.unit, dead: null, dmg: 0, kills: 0, killsC: 0 };
        units.set(b.id, u); lineChurch.get(robot.id).n.push(u);
      }
    }
    const u = units.get(robot.id);
    if (u) {
      for (const d of damage) if (d.team !== team) u.dmg += d.dmg;
      for (const d of died) if (d.team !== team) { u.kills++; if (d.unit === 0) u.killsC++; }
    }
    for (const d of died) if (units.has(d.id)) units.get(d.id).dead = round;
  },
  onRoundEnd(round, g) {
    for (const [id, c] of lineChurch) {
      if (round >= c.r + 40) continue;
      const me = g.robots.find(q => q.id === id);
      if (!me) continue;
      const foes = g.robots.filter(q => q.team !== team && q.unit >= 3 && d2(q, me) <= 100).length;
      if (foes > c.foes) c.foes = foes;
    }
  },
});
const all = [...units.values()];
const young = all.filter(u => u.dead !== null && u.dead - u.r <= T);
const out = { churches: lineChurch.size, built: all.length, k: all.reduce((s, u) => s + COST[u.unit], 0),
  young: young.length, youngNil: young.filter(u => u.dmg === 0).length, dmg: all.reduce((s, u) => s + u.dmg, 0),
  kills: all.reduce((s, u) => s + u.kills, 0), killsC: all.reduce((s, u) => s + u.killsC, 0),
  foes: [...lineChurch.values()].map(c => c.foes), stop: { units: 0, k: 0, dmg: 0, kills: 0, killsC: 0 } };
for (const c of lineChurch.values()) {
  // the round at which the church has seen N of its units die young: it builds nothing after it
  const deaths = c.n.filter(u => u.dead !== null && u.dead - u.r <= T).map(u => u.dead).sort((a, b) => a - b);
  if (deaths.length < N) continue;
  const at = deaths[N - 1];
  for (const u of c.n) if (u.r > at) {
    out.stop.units++; out.stop.k += COST[u.unit]; out.stop.dmg += u.dmg; out.stop.kills += u.kills; out.stop.killsC += u.killsC;
  }
}
console.log(JSON.stringify(out));
