// held.mjs TEAM REPLAY: TEAM's held crusaders (CFG.MUSTER: built by a structure radioing SIG.THREAT) and the
// structures TEAM lost while held crusaders stood by. Prints one JSON line: held (built), heldShot (of them, ever
// attacked), lost (castles and churches lost), lostCastles, and byLoss: per structure lost, [round, unit (0 castle,
// 1 church), held crusaders alive then, those within 10 king steps of it, those of them that attacked in its last
// 20 rounds].
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/held.mjs TEAM REPLAY'); process.exit(2); }
const H = new Map(), pos = new Map(); const c = { held: 0, heldShot: 0, lost: 0, lostCastles: 0, byLoss: [] };
simulate(fs.readFileSync(f), {
  onTurn({ round, robot, rec, born, died, error }) {
    for (const d of died) {
      if (d.team !== team) continue;
      const h = H.get(d.id); if (h) h.dead = round;
      if (d.unit <= 1) {
        const at = pos.get(d.id) || [d.x, d.y];
        const alive = [...H.values()].filter(h => !h.dead && pos.has(h.id));
        const near = alive.filter(h => king(...pos.get(h.id), ...at) <= 10);
        c.lost++; if (d.unit === 0) c.lostCastles++;
        c.byLoss.push([round, d.unit, alive.length, near.length, near.filter(h => h.lastShot >= round - 20).length]);
      }
    }
    if (error || robot.team !== team) return;
    pos.set(robot.id, [robot.x, robot.y]);
    const h = H.get(robot.id);
    if (h && rec.action === 2) { if (!h.shot) { h.shot = true; c.heldShot++; } h.lastShot = round; }
    if (robot.unit <= 1 && rec.action === 3 && rec.build_unit === 3 && rec.signal_radius > 0 && rec.signal >> 12 === 13)
      for (const b of born) if (b.unit === 3) { H.set(b.id, { id: b.id, lastShot: -1 }); pos.set(b.id, [b.x, b.y]); c.held++; }
  },
});
console.log(JSON.stringify(c));
