// Church chains (CFG.CHAIN_ROUND). A castle sends a pilgrim (the chainer) toward the enemy castle that mirrors it; it
// stops CHAIN_STAGE king steps from it (or where a step would enter a visible attacker's reach) and waits until the
// bank holds CHAIN_K karbonite and CHAIN_F fuel. Then it builds a church on the adjacent tile nearest the castle, the
// church a pilgrim one tile nearer, that pilgrim a church, and so on: a robot built in a round acts in that round
// (game.js enactTurn appends it; the runner initialises it first), so the whole line appears in one round, before
// the enemy can shoot a link. The church within CHAIN_END_R2 of the castle ends the line; every church of it builds
// military aimed at the castle (radio SIG.CHAIN) for CHAIN_BURST turns, units born at the front instead of marching
// there (replica scrim 200, seed 2924: StoneT2000's bot1v43 built such lines 5-13 tiles from each of our castles at
// rounds 235, 341 and 541, then a preacher from each church each round, and took the three castles).
import { CFG, defReserveK } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER } from './specs.js';
import { d2, ADJ, offsets } from './util.js';
import { bfs } from './mapinfo.js';
import { SIG, CT, FAR, encXY, dec, decFarRobot } from './comms.js';
import { isAttacker, canHit, THREAT_R2 } from './combat.js';

const KING = offsets(2);

// On a robot's first turn: the chain target radioed by an adjacent builder, as [x, y], or null.
export function heardChain(w) {
  if (w.me.turn !== 1) return null;
  for (const r of w.friends) {
    if (!(r.signal > 0) || Math.abs(r.x - w.me.x) > 1 || Math.abs(r.y - w.me.y) > 1) continue;
    const m = dec(r.signal);
    if (m.type === SIG.CHAIN) return [m.x, m.y];
  }
  return null;
}

// The round from any castle in sight: castles act first in every round (the engine's robot list starts with them),
// so a castle's turn count is the current round whenever another robot acts.
export function learnRound(B) {
  if (B.birthRound) return;
  for (const r of B.w.robots) if (r.seen && r.unit === CASTLE && r.turn > 0) { B.birthRound = r.turn - B.w.me.turn + 1; break; }
  if (B.birthRound) B.round = B.birthRound + B.w.me.turn - 1;
}

export function chainStart(B, t) {
  const st = B.st;
  st.chain = t;
  st.chainF = bfs(B.w, [t], KING);
}

// The adjacent free tile the line extends to: fewest king steps to the target (strictly fewer than ours), then off
// depots, then nearest by r2, then canonical scan order. Null when no tile gets nearer.
export function chainStep(B) {
  const w = B.w, me = w.me, st = B.st, n = w.n, [tx, ty] = st.chain, F = st.chainF;
  const here = F[me.y * n + me.x];
  let best = null, bv = 1e18;
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy;
    if (!w.free(x, y)) continue;
    const f = F[y * n + x];
    if (f < 0 || (here >= 0 && f >= here)) continue;
    const v = ((f * 2 + (w.isDepot(x, y) ? 1 : 0)) * 8192 + d2(x, y, tx, ty)) * 4096 + y * n + x;
    if (v < bv) { bv = v; best = [x, y]; }
  }
  return best;
}

function gone(B) {
  const [tx, ty] = B.st.chain;
  return B.w.occ(tx, ty) === 0;
}

// Build the next link (church from a pilgrim, pilgrim from a church) and pass the target on.
function link(B, unit) {
  const w = B.w, me = w.me, st = B.st, s = chainStep(B);
  if (!s) return null;
  w.signal(encXY(SIG.CHAIN, st.chain[0], st.chain[1]), 2);
  return w.build(unit, s[0] - me.x, s[1] - me.y);
}

// Pilgrim turn. Returns an action, null (hold), or undefined (not, or no longer, chaining: the normal pilgrim turn).
export function pilgrimChain(B, go) {
  const w = B.w, me = w.me, st = B.st, n = w.n;
  if (!st.chain) return undefined;
  const church = STATS[CHURCH];
  // A link pilgrim (born from a chain church): one church toward the target, then an ordinary pilgrim.
  if (!st.chainer) {
    const a = w.karbonite >= church.costK && w.fuel >= church.costF + 2 ? link(B, CHURCH) : null;
    st.chain = null;
    return a || undefined;
  }
  if (gone(B) || st.chainF[me.y * n + me.x] < 0) { w.talk(CT.CHAINGONE); st.chain = null; return undefined; }
  w.talk(CT.CHAINER);
  const threatened = w.enemies.some(e => isAttacker(e.unit) && d2(me.x, me.y, e.x, e.y) <= THREAT_R2[e.unit]);
  const f = st.chainF[me.y * n + me.x];
  if (st.chainBest === undefined || f < st.chainBest) { st.chainBest = f; st.chainStill = 0; } else st.chainStill++;
  // A chainer that stops getting nearer stages where it is only within CHAIN_SLACK steps of the stage line. Farther
  // out it quits after CHAIN_GIVEUP turns and mines; the castle sends another CHAIN_EVERY rounds after this one (seed
  // 2924: one stood beside its corner castle, boxed in by our own units, for 250 turns).
  const near = f <= CFG.CHAIN_STAGE + CFG.CHAIN_SLACK;
  if (!near && st.chainStill >= CFG.CHAIN_GIVEUP) { st.chain = null; st.chainer = false; w.talk(CT.UNIT + PILGRIM); return undefined; }
  const staged = f <= CFG.CHAIN_STAGE || (near && st.chainStill >= CFG.CHAIN_PATIENCE);
  if (staged && CFG.CHAIN_LIVE === 2) w.talk(CT.STAGED);
  const ready = w.karbonite >= CFG.CHAIN_K && w.fuel >= CFG.CHAIN_F;
  // CFG.CHAIN_FIRE_NEAR: a threatened chainer fires early only near the stage line (h55's delivery, 2924: one born
  // beside its castle under attack built four churches at home three turns later, 26 steps from any enemy castle).
  const early = threatened && (!CFG.CHAIN_FIRE_NEAR || near) && w.karbonite >= church.costK && w.fuel >= church.costF + 2;
  // CFG.CHAIN_SAFE: the first church acts after every robot already in the round (game.js appends newborns), so a
  // chainer shot in between leaves it without the target: a one-church line in the enemy half that spends the bank
  // (seed 799 r246, #1453 and #505; h72's delivery, 3 of 8 games). Exposed, it flees and the chain resumes later.
  const exposed = CFG.CHAIN_SAFE && w.enemies.some(e => canHit(e, me.x, me.y));
  const crowded = CFG.CHAIN_CLEAR && w.enemies.filter(e => e.unit >= CRUSADER).length >= CFG.CHAIN_CLEAR;   // castles not counted
  if (!exposed && !crowded && ((staged && ready) || early)) {
    const a = link(B, CHURCH);
    if (a) { st.chain = null; st.chainer = false; w.talk(CFG.CHAIN_FAILS ? CT.CHAINFIRE : CT.UNIT + PILGRIM); return a; }
  }
  if (threatened) return undefined;   // flee as any pilgrim; the chain resumes from wherever it gets to
  if (staged) return null;
  return go(B, 'chain', [st.chain]) || null;
}

// Church turn. Returns an action, or null for the normal structure turn.
export function churchChain(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!st.chain) return null;
  if (me.turn > CFG.CHAIN_BURST || gone(B)) { st.chain = null; return null; }
  if (CFG.CHAIN_WALL && wallEnd(B)) return null;
  if (CFG.CHAIN_STOPLOSS && burstLosses(B) >= CFG.CHAIN_STOPLOSS) { st.chain = null; return null; }
  const [tx, ty] = st.chain;
  if (me.turn === 1 && d2(me.x, me.y, tx, ty) > CFG.CHAIN_END_R2 &&
      w.karbonite >= STATS[PILGRIM].costK + STATS[CHURCH].costK && w.fuel >= STATS[PILGRIM].costF + STATS[CHURCH].costF + 4) {
    const a = link(B, PILGRIM);
    if (a) return a;
  }
  const mix = CFG.CHAIN_MIX, unit = mix[(st.nChain || 0) % mix.length];
  if (!w.canAfford(unit, 0, CFG.CHAIN_FUEL_KEEP)) return null;
  let best = null, bd = 1e9;
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy;
    if (!w.free(x, y)) continue;
    const v = d2(x, y, tx, ty) * 4 + (w.isDepot(x, y) ? 3 : 0);
    if (v < bd) { bd = v; best = [dx, dy]; }
  }
  if (!best) return null;
  w.signal(encXY(SIG.CHAIN, tx, ty), 2);
  st.nChain = (st.nChain || 0) + 1;
  if (CFG.CHAIN_STOPLOSS) st.burstPending = { unit, x: me.x + best[0], y: me.y + best[1] };
  return w.build(unit, best[0], best[1]);
}

// CFG.CHAIN_STOPLOSS: the burst units this church has seen die young. Its newborn of last turn is the friend on its
// first turn of that type within r2 9 of the build tile (none: killed before the church could see it); one gone from
// sight within CHAIN_STOPLOSS_AGE turns of birth, last seen within r2 49 (no step leaves a church's sight from there),
// died.
function burstLosses(B) {
  const w = B.w, st = B.st, t = w.me.turn, kids = st.burstKids || (st.burstKids = new Map());
  const p = st.burstPending;
  if (p) {
    st.burstPending = null;
    let best = null, bd = 1e9;
    for (const r of w.friends) {
      if (r.turn !== 1 || r.unit !== p.unit || kids.has(r.id)) continue;
      const dd = d2(r.x, r.y, p.x, p.y);
      if (dd <= 9 && dd < bd) { bd = dd; best = r; }
    }
    if (best) kids.set(best.id, { t: t - 1, x: best.x, y: best.y }); else st.burstLost = (st.burstLost || 0) + 1;
  }
  for (const [id, k] of [...kids]) {
    const r = w.friends.find(f => f.id === id);
    if (r) { if (t - k.t >= CFG.CHAIN_STOPLOSS_AGE) kids.delete(id); else { k.x = r.x; k.y = r.y; } continue; }
    kids.delete(id);
    if (d2(k.x, k.y, w.me.x, w.me.y) <= 49) st.burstLost = (st.burstLost || 0) + 1;
  }
  return st.burstLost || 0;
}

// CFG.CHAIN_WALL: a line church that sees CHAIN_WALL enemy crusaders, prophets and preachers, or hears another line
// church's FAR.WALL, ends its line (true). The one that saw the wall radios it to the line and tells our castles.
function wallEnd(B) {
  const w = B.w, me = w.me, st = B.st;
  const seen = w.enemies.filter(e => e.unit >= CRUSADER).length >= CFG.CHAIN_WALL;
  if (!seen && !w.robots.some(r => r.id !== me.id && (decFarRobot(r) || {}).type === SIG.WALL)) return false;
  st.chain = null;
  if (seen) {
    w.talk(CT.WALL);
    if (!w.sentR2 && w.fuel >= Math.ceil(Math.sqrt(FAR.WALL))) w.signal(encXY(0, me.x, me.y), FAR.WALL);
  }
  return true;
}

// CFG.CHAIN_WALL: a castle that heard CT.WALL rests its chains (no launch, no chain bank) for CHAIN_WALL_REST rounds.
export function chainsWalled(B) {
  return CFG.CHAIN_WALL > 0 && B.st.wallAt !== undefined && B.round - B.st.wallAt < CFG.CHAIN_WALL_REST;
}

// CFG.CHAIN_FAILS: castles hold their lines after that many fired with no enemy castle destroyed since (castle.js).
export function chainsFailed(st) {
  return CFG.CHAIN_FAILS > 0 && (st.chainMiss || 0) >= CFG.CHAIN_FAILS;
}

// CFG.HOARD_ROUND: a castle from that round while its team is not behind on castles (ours alive >= the enemy's, less
// those our units reported destroyed).
export function hoarding(B) {
  const st = B.st;
  return CFG.HOARD_ROUND > 0 && B.round >= CFG.HOARD_ROUND && B.w.me.unit === CASTLE && !!st.order &&
    st.castles.size >= st.order.length - st.deadE.size;
}

// Castle: send a chainer at the mirror castle from CHAIN_ROUND (staggered by castle order), again CHAIN_EVERY rounds
// after the last one left unless it still walks or waits (it reports CT.CHAINER); never again once one reported the
// target gone (CT.CHAINGONE). Returns {act, x, y} like buildToward, or null.
export function chainLaunch(B, buildToward) {
  const w = B.w, me = w.me, st = B.st;
  if (!CFG.CHAIN_ROUND || !st.order || st.chainOff || st.chainLive || chainsFailed(st) || chainsWalled(B) || hoarding(B)) return null;
  const idx = Math.max(0, st.order.findIndex(c => c.x === me.x && c.y === me.y));
  if (B.round < CFG.CHAIN_ROUND + idx * CFG.CHAIN_STAGGER) return null;
  if (st.chainAt !== undefined && B.round - st.chainAt < CFG.CHAIN_EVERY) return null;
  if (!w.canAfford(PILGRIM, defReserveK(B), 2)) return null;
  if (CFG.RADIO_WAIT && w.sentR2) return null;   // the attack call took the radio: launch next turn, not deaf
  const [tx, ty] = w.mirror(me.x, me.y);
  const b = buildToward(B, PILGRIM, tx, ty, encXY(SIG.CHAIN, tx, ty));
  if (!b) return null;
  st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'chain', ref: 0 };
  st.chainAt = B.round;
  return b;
}
