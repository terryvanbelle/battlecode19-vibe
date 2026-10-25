// stillborn.mjs TEAM REPLAY: TEAM's military newborns (crusader, prophet, preacher) and the ones killed within 2 rounds
// of their build (stillborn), with what the builder could have done instead. Exposure of a tile = the damage the
// enemy attackers standing at the build could deal it without moving (castle and prophet 10 in r2 1-64 and 16-64,
// crusader 10 in r2 1-16, preacher 20 when a tile within one king step of it lies in r2 1-16). Prints one JSON line:
//   built, stillborn, K (their karbonite), byCastle (stillborn a castle built),
//   shootable (a castle built it while an enemy unit stood in its own reach, r2 <= 64),
//   exposed (the newborn's tile was exposed to at least its hp), safer (exposed while another free adjacent tile
//   was not), byRound (stillborn per 100 rounds of build).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
if (process.argv.length !== 4 || !/^[01]$/.test(process.argv[2])) {
  console.error('usage: node tools/reads/stillborn.mjs TEAM REPLAY');
  process.exit(2);
}
const team = +process.argv[2];
const COST = [0, 50, 10, 15, 25, 30], HP = [200, 100, 10, 40, 20, 60];
const d2 = (a, b, x, y) => (a - x) ** 2 + (b - y) ** 2;
function exposure(enemies, x, y) {
  let dmg = 0;
  for (const e of enemies) {
    if (e.unit === 0 || e.unit === 4) { const r = d2(x, y, e.x, e.y); if (r >= (e.unit === 4 ? 16 : 1) && r <= 64) dmg += 10; }
    else if (e.unit === 3) { const r = d2(x, y, e.x, e.y); if (r >= 1 && r <= 16) dmg += 10; }
    else if (e.unit === 5) {
      let hit = false;
      for (let dy = -1; dy <= 1 && !hit; dy++) for (let dx = -1; dx <= 1; dx++) {
        const r = d2(x + dx, y + dy, e.x, e.y); if (r >= 1 && r <= 16) { hit = true; break; }
      }
      if (hit) dmg += 20;
    }
  }
  return dmg;
}
const c = { built: 0, stillborn: 0, K: 0, byCastle: 0, shootable: 0, exposed: 0, safer: 0, byRound: {} };
const kids = new Map();
let round = 0;
simulate(fs.readFileSync(process.argv[3]), {
  onTurn({ robot, rec, error, born, game }) {
    if (error || robot.team !== team || rec.action !== 3 || rec.build_unit < 3) return;
    const kid = born.find(b => b.unit >= 3);
    if (!kid) return;
    c.built++;
    const enemies = game.robots.filter(r => r.team !== team && r.unit !== 1 && r.unit !== 2);
    const n = game.map.length, taken = new Set(game.robots.map(r => r.x + ',' + r.y));
    const exp = exposure(enemies, kid.x, kid.y), hp = HP[kid.unit];
    let safe = false;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const x = robot.x + dx, y = robot.y + dy;
      if ((!dx && !dy) || x < 0 || y < 0 || x >= n || y >= n || !game.map[y][x] || taken.has(x + ',' + y)) continue;
      if (exposure(enemies, x, y) < hp) safe = true;
    }
    kids.set(kid.id, { r: round, unit: kid.unit, castle: robot.unit === 0,
      shoot: robot.unit === 0 && enemies.concat(game.robots.filter(r => r.team !== team && r.unit <= 2))
        .some(e => d2(e.x, e.y, robot.x, robot.y) <= 64),
      exposed: exp >= hp, safer: exp >= hp && safe });
  },
  onRoundEnd(r, g) {
    round = r + 1;
    const alive = new Set(g.robots.map(q => q.id));
    for (const [id, k] of kids) {
      if (alive.has(id)) { if (round - k.r > 2) kids.delete(id); continue; }
      kids.delete(id);
      if (round - k.r > 2) continue;
      c.stillborn++; c.K += COST[k.unit];
      if (k.castle) c.byCastle++;
      if (k.shoot) c.shootable++;
      if (k.exposed) c.exposed++;
      if (k.safer) c.safer++;
      const b = Math.floor(k.r / 100) * 100; c.byRound[b] = (c.byRound[b] || 0) + 1;
    }
  },
});
console.log(JSON.stringify(c));
