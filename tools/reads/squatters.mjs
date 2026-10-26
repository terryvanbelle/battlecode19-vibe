// squatters.mjs TEAM REPLAY (ECONOMICS row 12's evidence): enemy pilgrims mining TEAM's half. Prints one JSON line:
// turns (enemy mine actions on a tile nearer TEAM's starting castles than the enemy's), far (those with no enemy castle
// or church within two king steps of the tile then), pilgrims (distinct enemy pilgrims with a far turn), hunted (those
// later killed by TEAM), first (round of the first far turn, -1 if none), ours (TEAM's own mine actions in its half).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
const d2 = (a, b, x, y) => (a - x) ** 2 + (b - y) ** 2;
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const c = { turns: 0, far: 0, pilgrims: 0, hunted: 0, first: -1, ours: 0 };
const squat = new Set();
let ourHalf = null;
simulate(fs.readFileSync(f), {
  onStart(g) {
    const k = t => g.robots.filter(r => r.team === t && r.unit === 0);
    const us = k(team), them = k(1 - team);
    const near = (ks, x, y) => Math.min(...ks.map(r => d2(r.x, r.y, x, y)));
    ourHalf = (x, y) => near(us, x, y) < near(them, x, y);
  },
  onTurn({ round, robot, rec, died, game, error }) {
    if (!error && rec.action === 4 && robot.unit === 2 && ourHalf(robot.x, robot.y)) {
      if (robot.team === team) c.ours++;
      else {
        c.turns++;
        if (!game.robots.some(s => s.team !== team && (s.unit === 0 || s.unit === 1) && king(s.x, s.y, robot.x, robot.y) <= 2)) {
          c.far++;
          if (c.first < 0) c.first = round;
          if (!squat.has(robot.id)) { squat.add(robot.id); c.pilgrims++; }
        }
      }
    }
    for (const d of died) if (d.team !== team && squat.has(d.id) && robot.team === team) c.hunted++;
  },
});
console.log(JSON.stringify(c));
