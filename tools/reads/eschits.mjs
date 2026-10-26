// eschits.mjs TEAM REPLAY: TEAM's guards (SIG.GUARD newborns, as escorts.mjs), one JSON line each, at the first hit
// by an enemy prophet or castle: by (C castle, P prophet), r2 from the shooter, seen (1: r2 <= 49, the guard's vision),
// foes / foeP (enemy attackers / prophets within r2 49 of the guard), castle (1: an enemy castle within r2 64), ours
// (our military within r2 49), hp after the hit; dead (round) and shDead12 (1: the shooter died within 12 rounds of the
// hit). h203's mechanism read (ESCORT_BACK 2): seen 1, foes 1, foeP 1, castle 0 is the lone prophet it charges.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/eschits.mjs TEAM REPLAY'); process.exit(2); }
const G = new Map(); let game = null;
const d2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
simulate(fs.readFileSync(f), {
  onStart(g) { game = g; },
  onTurn({ round, robot, rec, born, died, damage, error }) {
    for (const d of died) { const e = G.get(d.id); if (e && !e.dead) e.dead = round; }
    for (const d of died) for (const e of G.values()) if (e.hit && e.shooter === d.id && !e.shDead) e.shDead = round;
    for (const d of damage) {
      const e = G.get(d.id);
      if (!e || e.hit || robot.team === team || !(robot.unit === 4 || robot.unit === 0)) continue;
      const me = game.robots.find(q => q.id === d.id) || e.last;
      if (!me) continue;
      const foes = game.robots.filter(q => q.team !== team && q.unit >= 3 && d2(q, me) <= 49);
      const castle = game.robots.some(q => q.team !== team && q.unit === 0 && d2(q, me) <= 64);
      const ours = game.robots.filter(q => q.team === team && q.unit >= 3 && q.id !== d.id && d2(q, me) <= 49).length;
      Object.assign(e, { hit: round, shooter: robot.id, by: robot.unit === 0 ? 'C' : 'P', r2: d2(robot, me),
        foes: foes.length, foeP: foes.filter(q => q.unit === 4).length, castle, ours, hp: d.killed ? 0 : me.health });
    }
    if (error || rec.action !== 3 || robot.team !== team || robot.unit > 1 || !(rec.signal_radius > 0)
        || rec.signal >> 12 !== 12) return;
    for (const b of born) G.set(b.id, { id: b.id, round });
  },
  onRoundEnd(round, g) {
    for (const e of G.values()) if (!e.dead) {
      const r = g.robots.find(q => q.id === e.id);
      if (r) e.last = { x: r.x, y: r.y, health: r.health };
    }
  },
});
for (const e of G.values()) {
  if (!e.hit) { console.log(JSON.stringify({ id: e.id, round: e.round, hit: null, dead: e.dead ?? null })); continue; }
  console.log(JSON.stringify({ id: e.id, round: e.round, hit: e.hit, by: e.by, r2: e.r2, seen: e.r2 <= 49 ? 1 : 0,
    foes: e.foes, foeP: e.foeP, castle: e.castle ? 1 : 0, ours: e.ours, hp: e.hp, dead: e.dead ?? null,
    shDead12: e.shDead && e.shDead - e.hit <= 12 ? 1 : 0 }));
}
