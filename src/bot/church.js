// Church: learns the round from its builder's radio, then runs the structure loop on its own cluster.
import { SIG, dec } from './comms.js';
import { structInit, structTurn } from './struct.js';

export function churchTurn(B) {
  const w = B.w, me = w.me;
  if (me.turn === 1) {
    structInit(B);
    for (const r of w.robots) {
      if (r.signal > 0 && Math.abs(r.x - me.x) <= 1 && Math.abs(r.y - me.y) <= 1) {
        const m = dec(r.signal); if (m.type === SIG.ROUND) B.birthRound = m.v;
      }
    }
    if (B.birthRound) B.round = B.birthRound;
  }
  return structTurn(B, null, null);
}
