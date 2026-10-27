// trade.mjs TEAM REPLAY: what each team spent its karbonite on and what it lost, at rounds 100, 200, 400 and the game's
// end. Prints one JSON line per checkpoint: round, us and them (TEAM and the enemy: karbonite spent on pilgrims, churches
// and military units, the same lost at build cost as lostPil / lostCh / lostMil, castles lost, military units built and
// lost, army alive), trade (enemy karbonite destroyed / ours) and milTrade (military only). The question: are losses
// decided by the economy (spend) or by the exchange (trade)? v12's 36 panel losses: 29 spent less than the enemy by
// r100 with trade 0.85; on uvafan 2046 the church lines lost all 17-19 churches after r200 (TRAINING_LOG 2026-10-27).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const COST = [0, 50, 10, 15, 25, 30], AT = [100, 200, 400];
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/trade.mjs TEAM REPLAY'); process.exit(2); }

const zero = () => ({ pil: 0, ch: 0, mil: 0, lostPil: 0, lostCh: 0, lostMil: 0, lostCastle: 0, milBuilt: 0, milLost: 0 });
const s = [zero(), zero()], out = [];
let last = 0;
const lost = a => a.lostPil + a.lostCh + a.lostMil;
function snap(round, g) {
  const alive = t => g.robots.filter(r => r.team === t && r.unit >= 3).length, us = s[team], th = s[1 - team];
  out.push({ round, us: { ...us, army: alive(team) }, them: { ...th, army: alive(1 - team) },
    trade: +(lost(th) / Math.max(1, lost(us))).toFixed(2), milTrade: +(th.lostMil / Math.max(1, us.lostMil)).toFixed(2) });
}
const { game } = simulate(fs.readFileSync(f), {
  onTurn(ev) {
    if (ev.rec.action === 3 && !ev.error) for (const b of ev.born) {
      const a = s[b.team];
      if (b.unit === 2) a.pil += COST[2]; else if (b.unit === 1) a.ch += COST[1]; else if (b.unit >= 3) { a.mil += COST[b.unit]; a.milBuilt++; }
    }
    for (const d of ev.died) {
      const a = s[d.team];
      if (d.unit === 0) a.lostCastle++; else if (d.unit === 1) a.lostCh += COST[1]; else if (d.unit === 2) a.lostPil += COST[2];
      else { a.lostMil += COST[d.unit]; a.milLost++; }
    }
  },
  onRoundEnd(round, g) { last = round; if (AT.includes(round)) snap(round, g); },
});
if (!AT.includes(last)) snap(last, game);
for (const o of out) console.log(JSON.stringify(o));
