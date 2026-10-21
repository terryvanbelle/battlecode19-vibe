// Entry point. One MyRobot lives in each robot's sandbox for its whole life. All logic runs in the canonical frame
// (world.js) through a context object `B`:
//   B.w      World (canonical map, robots, actions)      B.round  current round (exact once known; 0 = unknown)
//   B.rnd    per-robot RNG (seeded by birth tile+round)   B.nav    Nav (movers only)
//   B.st     role state                                   B.deps / B.clusters  map analysis (lazy, see econ())
// The engine increments a robot's turn counter every round, frozen or not (game.js:756), so a robot that learns its
// birth round knows the round exactly for life.
import { BCAbstractRobot } from 'battlecode';
import { CFG } from './config.js';
import { rng, offsets } from './util.js';
import { World } from './world.js';
import { STATS, CASTLE, CHURCH, PILGRIM } from './specs.js';
import { Nav } from './nav.js';
import { CT } from './comms.js';
import { castleTurn } from './castle.js';
import { churchTurn } from './church.js';
import { pilgrimTurn } from './pilgrim.js';
import { militaryTurn } from './military.js';

class MyRobot extends BCAbstractRobot {
  turn() {
    const t0 = Date.now();
    let action = null;
    try {
      if (!this.B) this.B = born(this);
      const B = this.B;
      B.w.update();
      if (B.birthRound) B.round = B.birthRound + B.w.me.turn - 1;
      const u = B.w.me.unit;
      if (B.round > 3 || (B.round === 0 && B.w.me.turn > 3) || u === 1) B.w.talk(CT.UNIT + u); // overwritten by any special talk
      action = u === CASTLE ? castleTurn(B) : u === CHURCH ? churchTurn(B) : u === PILGRIM ? pilgrimTurn(B) : militaryTurn(B);
    } catch (e) {
      this.log('EXC ' + (e && e.stack ? e.stack : e));
      action = null;
    }
    const ms = Date.now() - t0;
    if (ms > CFG.TIME_SLOW_MS) this.log('TIME ' + ms + ' unit ' + this.me.unit + ' turn ' + this.me.turn);
    return action;
  }
}

function born(api) {
  const w = new World(api);
  w.update();
  const me = w.me, S = STATS[me.unit];
  const B = { api, w, round: 0, birthRound: 0, st: {}, deps: null, clusters: null };
  if (me.unit === CASTLE) B.birthRound = 1;
  B.rnd = rng((me.y * 64 + me.x + 1) * 1000 + me.unit);
  if (S.speed) { B.offs = offsets(S.speed); B.nav = new Nav(w, B.offs, B.rnd); }
  return B;
}
