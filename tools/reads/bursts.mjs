// bursts.mjs TEAM REPLAY (h192's mechanism read): church chains against TEAM. Prints one JSON line: bursts (rounds in
// which the enemy built 3+ churches), near (those with a church within r2 144 of a living TEAM castle), kills (TEAM
// castles that died within 100 rounds after a near burst at them), castles (TEAM castles lost in all), stagers (enemy
// pilgrims that stood 20+ rounds on one tile off depots within r2 400 of a living TEAM castle), hunted (stagers killed
// by a TEAM crusader or preacher).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
const d2 = (a, b, x, y) => (a - x) ** 2 + (b - y) ** 2;
const c = { bursts: 0, near: 0, kills: 0, castles: 0, stagers: 0, hunted: 0 };
const perRound = new Map(), stay = new Map(), stager = new Set();
let castles = [], dep = null, recent = [];   // recent: {r, x, y} nearest burst church to each castle
simulate(fs.readFileSync(f), {
  onStart(g) {
    castles = g.robots.filter(r => r.team === team && r.unit === 0).map(r => ({ id: r.id, x: r.x, y: r.y }));
    dep = (x, y) => g.karbonite_map[y][x] || g.fuel_map[y][x];
  },
  onTurn({ round, robot, rec, born, died }) {
    if (robot.team !== team && rec.action === 3 && rec.build_unit === 1) for (const b of born) if (b.unit === 1) {
      if (!perRound.has(round)) perRound.set(round, []);
      perRound.get(round).push({ x: b.x, y: b.y });
    }
    for (const d of died) {
      if (d.team === team && d.unit === 0) {
        c.castles++;
        if (recent.some(q => q.id === d.id && round - q.r <= 100)) c.kills++;
        castles = castles.filter(k => k.id !== d.id);
      }
      if (d.team !== team && d.unit === 2 && stager.has(d.id) && (d.by_unit === 3 || d.by_unit === 5) && robot.team === team) c.hunted++;
    }
  },
  onRoundEnd(round, g) {
    const bs = perRound.get(round);
    if (bs && bs.length >= 3) {
      c.bursts++;
      const at = castles.filter(k => bs.some(b => d2(b.x, b.y, k.x, k.y) <= 144));
      if (at.length) c.near++;
      for (const k of at) recent.push({ id: k.id, r: round });
    }
    for (const p of g.robots) {
      if (p.team === team || p.unit !== 2) continue;
      const s = stay.get(p.id);
      if (s && s.x === p.x && s.y === p.y) {
        if (round - s.r >= 20 && !stager.has(p.id) && !dep(p.x, p.y) && castles.some(k => d2(k.x, k.y, p.x, p.y) <= 400)) { stager.add(p.id); c.stagers++; }
      } else stay.set(p.id, { x: p.x, y: p.y, r: round });
    }
  },
});
console.log(JSON.stringify(c));
