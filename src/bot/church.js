// Church: learns the round from its builder's radio, then runs the structure loop on its own cluster.
import { SIG, dec } from './comms.js';
import { structInit, structTurn } from './struct.js';

export function churchTurn(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!st.ready) {   // until it completes: a turn killed mid-init (200 ms) leaves it half done
    structInit(B);
    for (const r of w.robots) {   // the builder's radio is fresh only on our first turn
      if (me.turn === 1 && r.signal > 0 && Math.abs(r.x - me.x) <= 1 && Math.abs(r.y - me.y) <= 1) {
        const m = dec(r.signal); if (m.type === SIG.ROUND) B.birthRound = m.v;
      }
    }
    if (B.birthRound) B.round = B.birthRound + me.turn - 1;
    st.ready = true;
  }
  return structTurn(B, null, null);
}
