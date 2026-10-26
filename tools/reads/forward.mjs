// forward.mjs TEAM REPLAY (wololo 836's siege, TRAINING_LOG 2026-10-26 04:57): enemy churches near TEAM's castles.
// Prints one JSON line: half (enemy churches built on a tile nearer TEAM's starting castles than the enemy's), near
// (enemy churches, in either half, within r2 400 of a living TEAM castle when built), first (round the first near one
// was built, -1 if none), r2 (its r2 to the nearest TEAM castle), lived (rounds it stood, to the game's end if never
// killed), killed (near churches TEAM destroyed), mil (military units the near churches built), lost (TEAM castles
// destroyed).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
const d2 = (a, b, x, y) => (a - x) ** 2 + (b - y) ** 2;
const c = { half: 0, near: 0, first: -1, r2: -1, lived: -1, killed: 0, mil: 0, lost: 0 };
const near = new Map();
let ourHalf = null, last = 0;
simulate(fs.readFileSync(f), {
  onStart(g) {
    const k = t => g.robots.filter(r => r.team === t && r.unit === 0);
    const us = k(team), them = k(1 - team);
    const m = (ks, x, y) => Math.min(...ks.map(r => d2(r.x, r.y, x, y)));
    ourHalf = (x, y) => m(us, x, y) < m(them, x, y);
  },
  onTurn({ round, robot, rec, born, died, game, error }) {
    last = round;
    if (!error && rec.action === 3) for (const b of born) {
      if (b.team !== team && b.unit === 1) {
        if (ourHalf(b.x, b.y)) c.half++;
        const ks = game.robots.filter(s => s.team === team && s.unit === 0);
        const r2 = ks.length ? Math.min(...ks.map(s => d2(s.x, s.y, b.x, b.y))) : Infinity;
        if (r2 <= 400) {
          c.near++;
          near.set(b.id, { round, died: -1 });
          if (c.first < 0) { c.first = round; c.r2 = r2; }
        }
      }
      if (b.unit >= 3 && near.has(robot.id)) c.mil++;
    }
    for (const d of died) {
      if (d.team === team && d.unit === 0) c.lost++;
      const s = near.get(d.id);
      if (s && s.died < 0) { s.died = round; if (robot.team === team) c.killed++; }
    }
  },
});
if (c.first >= 0) { const s = [...near.values()][0]; c.lived = (s.died < 0 ? last : s.died) - s.round; }
console.log(JSON.stringify(c));
