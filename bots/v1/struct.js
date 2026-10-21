// Shared logic of castles and churches: depot service, pilgrim assignment, defence and endgame builds.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, ADJ } from './util.js';
import { kingField } from './mapinfo.js';
import { SIG, encXY } from './comms.js';
import { isAttacker, pickTarget } from './combat.js';

// Called on the structure's first turn.
export function structInit(bot, serveKing) {
  const me = bot.me, st = bot.state;
  st.kf = kingField(bot.map, me.x, me.y);
  const n = bot.n;
  st.served = bot.deps.filter(d => { const k = st.kf[d.y * n + d.x]; return k >= 0 && k <= serveKing; })
    .sort((a, b) => st.kf[a.y * n + a.x] - st.kf[b.y * n + b.x] || (a.k === b.k ? 0 : a.k ? -1 : 1));
  st.assign = new Map();   // depot index -> {id, seen}
  st.pending = null;       // {x, y, kind, ref, round}: a unit built last turn whose id we still need
  st.pioneers = [];        // [{id, cluster, since}]
  st.built = 0;
}

// Robots we can see that are ours and new (turn 1) near the tile we built on.
function resolvePending(bot) {
  const st = bot.state, p = st.pending; if (!p) return;
  let best = null, bd = 1e9;
  for (const r of bot.friends) {
    if (r.turn !== 1 || r.unit === undefined) continue;
    const dd = d2(r.x, r.y, p.x, p.y); if (dd <= 8 && dd < bd) { bd = dd; best = r; }
  }
  if (best) {
    if (p.kind === 'mine') st.assign.set(p.ref, { id: best.id, seen: bot.me.turn });
    else if (p.kind === 'pioneer') { const q = st.pioneers.find(q => q.cluster === p.ref); if (q) q.id = best.id; }
  }
  st.pending = null;
}

// Drop assignments whose pilgrim is gone. Castles see all friendly ids; churches only what is in vision, so a church
// drops an assignment after a pilgrim has been out of sight for a while.
function refreshAssign(bot, allIds) {
  const st = bot.state, t = bot.me.turn;
  const seen = new Set(bot.friends.map(r => r.id));
  for (const [k, a] of st.assign) {
    if (allIds) { if (!allIds.has(a.id)) st.assign.delete(k); }
    else if (seen.has(a.id)) a.seen = t;
    else if (t - a.seen > 25) st.assign.delete(k);
  }
  // A depot occupied by any friendly pilgrim counts as served.
  for (const r of bot.friends) if (r.unit === PILGRIM) {
    const d = st.served.find(q => q.x === r.x && q.y === r.y);
    if (d && !st.assign.has(d.i)) st.assign.set(d.i, { id: r.id, seen: t });
  }
}

export function nextDepot(bot) {
  const st = bot.state;
  let nk = 0, nf = 0;
  for (const [i] of st.assign) { if (bot.deps[i].k) nk++; else nf++; }
  const free = st.served.filter(d => !st.assign.has(d.i) && !enemyNear(bot, d.x, d.y));
  if (!free.length) return null;
  let wantK = nk < CFG.KARB_PER_FUEL_MINER * (nf + 1);
  if (CFG.ADAPT_MINERS) { if (bot.fuel > 1500 + 100 * nk) wantK = true; else if (bot.fuel < 300) wantK = false; }
  return free.find(d => d.k === wantK) || free[0];
}

function enemyNear(bot, x, y) {
  for (const e of bot.enemies) if (isAttacker(e.unit) && d2(x, y, e.x, e.y) <= 64) return true;
  return false;
}

export function canAfford(bot, unit, reserveK = 0, reserveF = 0) {
  return bot.karbonite >= STATS[unit].costK + reserveK && bot.fuel >= STATS[unit].costF + reserveF;
}

// Build `unit` on the free adjacent tile closest to (tx, ty). Returns the action or null.
export function buildToward(bot, unit, tx, ty, signal) {
  const me = bot.me; let best = null, bd = 1e9;
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy; if (!bot.freeTile(x, y)) continue;
    const dd = d2(x, y, tx, ty) * 64 + (bot.karbonite_map[y][x] || bot.fuel_map[y][x] ? 1 : 0);
    if (dd < bd) { bd = dd; best = [dx, dy]; }
  }
  if (!best) return null;
  if (signal !== undefined && bot.fuel >= STATS[unit].costF + 2) bot.signal(signal, 2);
  return { act: bot.buildUnit(unit, best[0], best[1]), x: me.x + best[0], y: me.y + best[1] };
}

function peacetimeV1(bot) {
  const st = bot.state, me = bot.me;
  const reserveK = CFG.RESERVE_K + 50 * st.pioneers.filter(p => p.id === -1 || p.id > 0).length;
  const guard = bot.friends.filter(r => r.unit === PROPHET && d2(me.x, me.y, r.x, r.y) <= 100).length;
  const want = Math.min(CFG.GUARD_MAX, 2 + Math.floor(bot.round / CFG.GUARD_ROUNDS));
  const [ex, ey] = bot.mirror(me.x, me.y);
  if (guard < want && canAfford(bot, PROPHET, reserveK, 100)) { const b = buildToward(bot, PROPHET, ex, ey); if (b) return b.act; }
  if (bot.round > 30 && canAfford(bot, CRUSADER, reserveK + CFG.SURPLUS_KEEP_K, 150)) { const b = buildToward(bot, CRUSADER, ex, ey); if (b) return b.act; }
  return null;
}

// Dump time: castles know how many structures share the bank; churches use a fixed round.
export function endgame(bot) {
  const st = bot.state;
  if (!bot.round) return false;
  if (st.nStructs) {
    const need = Math.ceil(bot.karbonite / (15 * st.nStructs()));
    return bot.round >= 1000 - need - CFG.ENDGAME_MARGIN;
  }
  return bot.round >= CFG.ENDGAME_ROUND;
}

// The structure's turn after role-specific bookkeeping. extra(): role hook for castle-only builds (pioneers).
export function structTurn(bot, allIds, extra) {
  const st = bot.state, me = bot.me;
  resolvePending(bot);
  refreshAssign(bot, allIds);
  const threats = bot.enemies.filter(e => isAttacker(e.unit) || e.unit === PILGRIM);
  const attackers = bot.enemies.filter(e => isAttacker(e.unit));

  // 1. Defence: build a defender against visible attackers; else shoot.
  if (attackers.length) {
    const closest = attackers.reduce((a, b) => d2(me.x, me.y, a.x, a.y) <= d2(me.x, me.y, b.x, b.y) ? a : b);
    const r = d2(me.x, me.y, closest.x, closest.y);
    const unit = r <= 25 ? PREACHER : PROPHET;
    if (canAfford(bot, unit)) { const b = buildToward(bot, unit, closest.x, closest.y); if (b) return b.act; }
    if (unit === PREACHER && canAfford(bot, CRUSADER)) { const b = buildToward(bot, CRUSADER, closest.x, closest.y); if (b) return b.act; }
  }
  if (me.unit === CASTLE && threats.length && bot.fuel >= STATS[CASTLE].atkFuel) {
    const t = pickTarget(CASTLE, me.x, me.y, threats);
    if (t) return bot.attack(t.x - me.x, t.y - me.y);
  }

  // 2. Endgame: health is the tiebreak; crusaders give the most HP per karbonite.
  if (endgame(bot) && canAfford(bot, CRUSADER)) {
    const [ex, ey] = bot.mirror(me.x, me.y);
    const b = buildToward(bot, CRUSADER, ex, ey); if (b) return b.act;
  }

  // 3. Economy: a pilgrim for every served depot.
  const dep = nextDepot(bot);
  if (dep && canAfford(bot, PILGRIM, 0, 2)) {
    const b = buildToward(bot, PILGRIM, dep.x, dep.y, encXY(SIG.MINE, dep.x, dep.y));
    if (b) { st.pending = { x: b.x, y: b.y, kind: 'mine', ref: dep.i }; st.assign.set(dep.i, { id: -1, seen: me.turn }); return b.act; }
  }
  if (extra) { const a = extra(); if (a) return a; }

  // 4. Peacetime army.
  if (CFG.PROD_V1) return peacetimeV1(bot);
  const defenders = bot.friends.filter(r => r.unit >= CRUSADER && d2(me.x, me.y, r.x, r.y) <= 100).length;
  const target = Math.min(CFG.DEFENDERS_PER_STRUCT * 4, Math.floor(bot.round / 40) + (bot.round > 20 ? 1 : 0));
  const reserveK = CFG.RESERVE_K + 50 * st.pioneers.filter(p => p.id === -1 || p.id > 0).length;
  if (defenders < target && canAfford(bot, PROPHET, reserveK, 100)) {
    const [ex, ey] = bot.mirror(me.x, me.y);
    const b = buildToward(bot, PROPHET, ex, ey); if (b) return b.act;
  }
  return null;
}
export { CHURCH };
