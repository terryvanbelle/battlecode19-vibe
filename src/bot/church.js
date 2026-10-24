// Church: learns the round from its builder's radio, then runs the structure loop on its own cluster.
import { SIG, CT, dec, encNum, encXY } from './comms.js';
import { structInit, structTurn, buildToward } from './struct.js';
import { CFG } from './config.js';
import { PILGRIM } from './specs.js';
import { isAttacker } from './combat.js';
import { heardChain, chainStart, learnRound, churchChain } from './chain.js';

export function churchTurn(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!st.ready) {   // until it completes: a turn killed mid-init (200 ms) leaves it half done
    structInit(B);
    for (const r of w.robots) {   // the builder's radio is fresh only on our first turn
      if (me.turn === 1 && r.signal > 0 && Math.abs(r.x - me.x) <= 1 && Math.abs(r.y - me.y) <= 1) {
        const m = dec(r.signal); if (m.type === SIG.ROUND) B.birthRound = m.v;
      }
    }
    if (CFG.CHAIN_ROUND) { const t = heardChain(w); if (t) { chainStart(B, t); learnRound(B); } }
    if (B.birthRound) B.round = B.birthRound + me.turn - 1;
    st.ready = true;
  }
  if (CFG.HOP_GAIN) {
    if (st.myCluster === undefined) st.myCluster = B.clusters.findIndex(c => c.site[0] === me.x && c.site[1] === me.y);
    if (me.turn === 1 && st.myCluster >= 0) w.talk(CT.CHURCH + st.myCluster);   // castles learn this church's id
  }
  if (st.chain) { const a = churchChain(B); if (a) return a; }
  if (CFG.HOP_GAIN) { const a = hopBuild(B); if (a) return a; }
  return structTurn(B, null, null);
}

// CFG.HOP_GAIN: a castle's SIG.HOP naming this church's cluster asks it to build the pioneer for the target cluster
// (castle.js hopPioneer). Only in the round it is asked, with no enemy attacker in sight (the structure loop answers
// that first) and the bank's pilgrim there: otherwise the request lapses and the castle sends the pioneer itself. The
// newborn reads the target from the castle's radio; ours gives it the round (or, not knowing the round, the site).
function hopBuild(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!(st.myCluster >= 0) || w.enemies.some(e => isAttacker(e.unit))) return null;
  for (const r of w.robots) {
    if (!(r.signal > 0) || (r.signal >> 12) !== SIG.HOP || (r.signal & 63) !== st.myCluster) continue;
    if (r.seen && r.team !== me.team) continue;
    const c = B.clusters[(r.signal >> 6) & 63];
    if (!c || !w.canAfford(PILGRIM, 0, 2)) return null;
    const b = buildToward(B, PILGRIM, c.site[0], c.site[1], B.round ? encNum(SIG.ROUND, B.round) : encXY(SIG.CHURCH, c.site[0], c.site[1]));
    return b ? b.act : null;
  }
  return null;
}
