// strike.mjs TEAM REPLAY (CFG.STRIKE_FAR, h193): TEAM's far church strikes. Prints one JSON line: radios (FAR.STRIKE
// radios by TEAM pilgrims), radio1 (round of the first, -1 if none), strikers (crusaders TEAM castles built with the
// r2-3 SIG.GUARD), striker1 (round of the first), lost (strikers dead by the game's end), hits (strikers' attacks on
// enemy churches), killed (enemy churches TEAM destroyed), byStriker (of those, the killing blow a striker's).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
const STRIKE = 902, GUARD_STRIKE = 3;
const c = { radios: 0, radio1: -1, strikers: 0, striker1: -1, lost: 0, hits: 0, killed: 0, byStriker: 0 };
const strikers = new Set();
simulate(fs.readFileSync(f), {
  onTurn({ round, robot, rec, born, died, damage, error }) {
    if (robot.team === team && rec.signal_radius === STRIKE && robot.unit === 2) { c.radios++; if (c.radio1 < 0) c.radio1 = round; }
    if (!error && robot.team === team && robot.unit === 0 && rec.action === 3 && rec.signal_radius === GUARD_STRIKE)
      for (const b of born) if (b.unit === 3) { strikers.add(b.id); c.strikers++; if (c.striker1 < 0) c.striker1 = round; }
    if (!error && rec.action === 2 && strikers.has(robot.id) && damage.some(d => d.team !== team && d.unit === 1)) c.hits++;
    for (const d of died) {
      if (strikers.has(d.id)) c.lost++;
      if (d.team !== team && d.unit === 1 && robot.team === team) { c.killed++; if (strikers.has(robot.id)) c.byStriker++; }
    }
  },
});
console.log(JSON.stringify(c));
