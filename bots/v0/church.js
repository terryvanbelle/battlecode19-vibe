// Church: learns the round from its builder, then runs the structure loop on its own cluster.
import { CFG } from './config.js';
import { PILGRIM } from './specs.js';
import { SIG, dec } from './comms.js';
import { structInit, structTurn } from './struct.js';

export function churchTurn(bot) {
  const me = bot.me;
  if (me.turn === 1) {
    structInit(bot, CFG.CHURCH_SERVE_KING);
    for (const r of bot.visible) {
      if (r.signal > 0 && r.x !== undefined && Math.abs(r.x - me.x) <= 1 && Math.abs(r.y - me.y) <= 1) {
        const m = dec(r.signal); if (m.type === SIG.ROUND) bot.round = m.v;
      }
    }
  }
  return structTurn(bot, null, null);
}
export { PILGRIM };
