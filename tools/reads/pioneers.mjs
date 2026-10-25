// pioneers.mjs TEAM REPLAY: TEAM's pioneers (pilgrims a castle built with SIG.CHURCH, the church site on the radio)
// and how each one's trip went. Prints one JSON line:
//   pioneers: [{ r (built), k (king steps castle -> site), bank (TEAM's karbonite after the build), arrive (first
//     round beside the site, -1 never), bankArr (karbonite then), church (round TEAM's church stood on the site, -1
//     never), by (1: this pioneer built it), died (round, -1 alive or gone otherwise), mined (turns spent mining),
//     mine1 (round of its first mining turn, -1 never; all of these within 300 rounds of its build),
//     theirs (round an enemy church first stood within 3 king steps of the site, -1 never), defK (karbonite TEAM's
//     castles spent on crusaders, prophets and preachers between this build and its church or death or r+60) }],
//   church1 (round of TEAM's first church, -1 none), theirs1 (the enemy's), pilgrims100 (TEAM's pilgrims alive at r100).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
import { detectSymmetry, makeTransform } from '../../src/bot/world.js';
if (process.argv.length !== 4 || !/^[01]$/.test(process.argv[2])) {
  console.error('usage: node tools/reads/pioneers.mjs TEAM REPLAY');
  process.exit(2);
}
const team = +process.argv[2];
const COST = [0, 50, 10, 15, 25, 30];
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const out = { pioneers: [], church1: -1, theirs1: -1, pilgrims100: 0 };
const live = new Map();   // pioneer id -> record (until its church, death or r+300)
const spends = [];        // [round, K] castle military builds
const theirCh = [];       // [round, x, y] enemy churches as built
let round = 0, T = null;   // T: TEAM's canonical frame (the radio's coordinates) -> engine
simulate(fs.readFileSync(process.argv[3]), {
  onStart(g) { T = makeTransform(detectSymmetry(g.map, g.karbonite_map, g.fuel_map), team, g.map.length); },
  onTurn({ round: rr, robot, rec, born, died, error, game }) {
    round = rr;
    if (error) return;
    for (const b of born) {
      if (b.unit !== 1) continue;
      const kb = b.team === team ? 'church1' : 'theirs1';
      if (out[kb] < 0) out[kb] = round;
      if (b.team !== team) theirCh.push([round, b.x, b.y]);
      for (const p of out.pioneers) {
        if (b.team === team && p.church < 0 && b.x === p.sx && b.y === p.sy) { p.church = round; p.by = +(robot.id === p.id); }
        if (b.team !== team && p.theirs < 0 && king(b.x, b.y, p.sx, p.sy) <= 3) p.theirs = round;
      }
    }
    for (const d of died) { const p = live.get(d.id); if (p) { p.died = round; live.delete(d.id); } }
    if (robot.team !== team) return;
    if (robot.unit === 0 && rec.action === 3 && rec.build_unit >= 3) spends.push([round, COST[rec.build_unit]]);
    if (robot.unit === 0 && rec.action === 3 && rec.build_unit === 2 && (rec.signal >> 12) === 2) {
      const kid = born.find(b => b.unit === 2);
      if (!kid) return;
      const [sx, sy] = T.toE((rec.signal >> 6) & 63, rec.signal & 63);
      const near = theirCh.find(([, x, y]) => king(x, y, sx, sy) <= 3);   // one already built counts from its round
      const p = { id: kid.id, r: round, sx, sy, k: king(robot.x, robot.y, sx, sy), bank: game.karbonite[team],
        arrive: -1, bankArr: -1, church: -1, by: 0, died: -1, mined: 0, mine1: -1, theirs: near ? near[0] : -1, defK: 0 };
      out.pioneers.push(p); live.set(kid.id, p);
      return;
    }
    const p = live.get(robot.id);
    if (!p) return;
    if (rec.action === 4) { p.mined++; if (p.mine1 < 0) p.mine1 = round; }
    if (p.arrive < 0 && king(robot.x, robot.y, p.sx, p.sy) <= 1) { p.arrive = round; p.bankArr = game.karbonite[team]; }
  },
  onRoundEnd(r, g) {
    if (r === 100) out.pilgrims100 = g.robots.filter(q => q.team === team && q.unit === 2).length;
    for (const [id, p] of live) if (p.church >= 0 || r > p.r + 300) live.delete(id);
  },
});
for (const p of out.pioneers) {
  const end = [p.church, p.died, p.r + 60].filter(x => x >= 0).reduce((a, b) => Math.min(a, b));
  p.defK = spends.filter(([r]) => r >= p.r && r <= end).reduce((a, [, k]) => a + k, 0);
  delete p.id;
}
console.log(JSON.stringify(out));
