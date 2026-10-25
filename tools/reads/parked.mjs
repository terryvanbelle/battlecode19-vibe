// parked.mjs TEAM REPLAY: TEAM's pioneers (castle builds radioing SIG.CHURCH; h170's mechanism read). Prints one JSON
// line: sent; how each ended: church (built one), mine (mined first), died, alive (parked: alive at the end without
// any of those); gaveup (a pioneer's castle talk CT.TAKEN 88-127: CFG.PIONEER_STALL_ANY / _GIVEUP); toTaken (sent to
// a site where the enemy already had a church/castle within 3 king steps and we had none); churches (TEAM's churches
// built, any builder).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { makeTransform, detectSymmetry } from '../../src/bot/world.js';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/parked.mjs TEAM REPLAY'); process.exit(2); }
const P = new Map(), structs = []; let T = null;
const c = { sent: 0, church: 0, mine: 0, died: 0, alive: 0, gaveup: 0, toTaken: 0, churches: 0 };
simulate(fs.readFileSync(f), {
  onStart(s) { T = makeTransform(detectSymmetry(s.map, s.karbonite_map, s.fuel_map), team, s.map.length); },
  onTurn({ robot, rec, born, died, error }) {
    for (const d of died) { const p = P.get(d.id); if (p && !p.how) p.how = 'died'; }
    for (const b of born) if (b.unit <= 1) { structs.push({ team: b.team, x: b.x, y: b.y }); if (b.team === team && b.unit === 1) c.churches++; }
    const p = P.get(robot.id);
    if (p && !p.how && !error) {
      if (rec.castle_talk >= 88 && rec.castle_talk < 128 && !p.gave) { p.gave = true; c.gaveup++; }
      if (rec.action === 3 && rec.build_unit === 1) p.how = 'church'; else if (rec.action === 4) p.how = 'mine';
    }
    if (error || robot.team !== team || robot.unit !== 0 || rec.action !== 3 || rec.build_unit !== 2 || !(rec.signal_radius > 0) || rec.signal >> 12 !== 2) return;
    for (const b of born) if (b.unit === 2) {
      const [x, y] = T.toE((rec.signal >> 6) & 63, rec.signal & 63);
      const taken = structs.some(s => s.team !== team && king(s.x, s.y, x, y) <= 3) && !structs.some(s => s.team === team && king(s.x, s.y, x, y) <= 3);
      P.set(b.id, { taken }); c.sent++; if (taken) c.toTaken++;
    }
  },
});
for (const p of P.values()) c[p.how || 'alive']++;
console.log(JSON.stringify(c));
