// Shared logic of castles and churches: depot service, pilgrim assignment, defence, peacetime army, endgame dump.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, ADJ, offsets } from './util.js';
import { bfs, econ } from './mapinfo.js';
import { SIG, encXY, encNum } from './comms.js';
import { isAttacker, pickTarget } from './combat.js';

const PILGRIM_OFFS = offsets(4);

// Called on the structure's first turn.
export function structInit(B) {
  econ(B);
  const w = B.w, me = w.me, st = B.st, n = w.n;
  st.pf = bfs(w, [[me.x, me.y]], PILGRIM_OFFS);   // pilgrim moves from this structure
  st.served = B.deps.filter(d => { const k = st.pf[d.y * n + d.x]; return k >= 0 && k <= CFG.SERVE_MOVES; })
    .sort((a, b) => st.pf[a.y * n + a.x] - st.pf[b.y * n + b.x] || (a.y * n + a.x) - (b.y * n + b.x));
  st.assign = new Map();   // depot index -> {id, seen}; id -1 = just built, not yet identified
  st.pending = null;       // {x, y, kind, ref}: a unit built last turn whose id we still need
  st.pioneers = [];        // castles: [{id, cluster, since}]
  st.nDef = 0;             // peacetime defenders built (for the preacher rotation)
  st.deaths = new Map();   // depot index -> pilgrims lost there (castles: seen through the id list)
  st.cool = new Map();     // depot index -> structure turn before which no pilgrim is sent there
}

// The robot we built last turn: a friend on its first turn near the build tile.
function resolvePending(B) {
  const st = B.st, p = st.pending; if (!p) return;
  let best = null, bd = 1e9;
  for (const r of B.w.friends) {
    if (r.turn !== 1 || r.unit !== p.unit) continue;
    const dd = d2(r.x, r.y, p.x, p.y); if (dd <= 9 && dd < bd) { bd = dd; best = r; }
  }
  if (best) {
    if (p.kind === 'mine') st.assign.set(p.ref, { id: best.id, seen: B.w.me.turn });
    else if (p.kind === 'pioneer') { const q = st.pioneers.find(q => q.cluster === p.ref); if (q) q.id = best.id; }
  } else if (p.kind === 'mine') st.assign.delete(p.ref);
  st.pending = null;
}

// Drop assignments whose pilgrim is gone. Castles see every friendly id (allIds); churches only vision, so a
// church drops an assignment once its depot is visibly empty for a while.
function refreshAssign(B, allIds) {
  const st = B.st, t = B.w.me.turn, w = B.w;
  for (const [k, a] of st.assign) {
    const d = B.deps[k], on = w.occ(d.x, d.y);
    if (on > 0) a.seen = t;
    const dead = allIds && a.id > 0 && !allIds.has(a.id);
    if (dead || (t - a.seen > (allIds ? 40 : 25) && on === 0)) {
      st.assign.delete(k);
      // A pilgrim lost at this depot: wait before sending another, longer after each loss.
      if (dead) { const c = (st.deaths.get(k) || 0) + 1; st.deaths.set(k, c); st.cool.set(k, t + Math.min(CFG.DEPOT_COOL_MAX, CFG.DEPOT_COOL * c)); }
    }
  }
  for (const r of w.friends) if (r.unit === PILGRIM) {
    const d = st.served.find(q => q.x === r.x && q.y === r.y);
    if (d && !st.assign.has(d.i)) st.assign.set(d.i, { id: r.id, seen: t });
  }
}

// Next served depot to staff: karbonite first, fuel by need.
export function nextDepot(B) {
  const st = B.st, w = B.w;
  let nk = 0, nf = 0;
  for (const [i] of st.assign) { if (B.deps[i].k) nk++; else nf++; }
  const free = st.served.filter(d => !st.assign.has(d.i) && w.occ(d.x, d.y) <= 0 && !enemyNear(B, d.x, d.y) &&
    !(st.cool.get(d.i) > w.me.turn));
  if (!free.length) return null;
  let wantK = nk < CFG.KARB_FIRST * (nf + 1);
  if (w.fuel < CFG.FUEL_LOW || (w.fuel < CFG.FUEL_HIGH && w.fuel < w.karbonite * CFG.FUEL_PER_KARB)) wantK = false;
  else if (w.fuel > CFG.FUEL_HIGH) wantK = true;
  return free.find(d => d.k === wantK) || free[0];
}

function enemyNear(B, x, y) {
  for (const e of B.w.enemies) if (isAttacker(e.unit) && d2(x, y, e.x, e.y) <= 64) return true;
  return false;
}

// Build `unit` on the free adjacent tile closest to (tx, ty); avoid depots when possible. Returns the action or null.
export function buildToward(B, unit, tx, ty, signal) {
  const w = B.w, me = w.me; let best = null, bd = 1e9;
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy; if (!w.free(x, y)) continue;
    const dd = d2(x, y, tx, ty) * 4 + (w.isDepot(x, y) ? 3 : 0);
    if (dd < bd) { bd = dd; best = [dx, dy]; }
  }
  if (!best) return null;
  if (signal !== undefined && !w.sentR2 && w.fuel >= STATS[unit].costF + 2) w.signal(signal, 2);
  B.st.pending = null;
  return { act: w.build(unit, best[0], best[1]), x: me.x + best[0], y: me.y + best[1] };
}

// Endgame: health is the tiebreak at round 1000; crusaders give the most HP per karbonite. Castles know how many
// structures share the bank; churches use a fixed lead.
export function endgame(B) {
  const st = B.st;
  if (!B.round) return false;
  if (st.nStructs) {
    const need = Math.ceil(B.w.karbonite / (STATS[CRUSADER].costK * st.nStructs()));
    return B.round >= 1000 - need - CFG.ENDGAME_MARGIN;
  }
  return B.round >= 965;
}

function defenders(B, r2) {
  const me = B.w.me; let c = 0;
  for (const r of B.w.friends) if (r.unit >= CRUSADER && d2(me.x, me.y, r.x, r.y) <= r2) c++;
  return c;
}

// The structure's turn after role bookkeeping. extra(): castle-only builds (pioneers). Returns an action or null.
export function structTurn(B, allIds, extra) {
  const st = B.st, w = B.w, me = w.me;
  resolvePending(B);
  refreshAssign(B, allIds);
  const attackers = w.enemies.filter(e => isAttacker(e.unit));
  const reserveK = CFG.DEF_RESERVE_K + (st.pioneers.length ? CFG.RESERVE_CHURCH_K : 0) +
    (CFG.PIONEER_RESERVE && st.pioneerDue ? STATS[PILGRIM].costK + STATS[CHURCH].costK : 0);

  // 1. Defence: answer visible attackers with a defender while they outnumber ours; otherwise shoot.
  if (attackers.length) {
    let closest = attackers[0], cd = 1e9;
    for (const e of attackers) { const r = d2(me.x, me.y, e.x, e.y); if (r < cd) { cd = r; closest = e; } }
    const ours = defenders(B, 100);
    if (ours < attackers.length * 2 + 1) {
      const unit = cd <= 36 || closest.unit === CRUSADER ? PREACHER : PROPHET;
      if (w.canAfford(unit)) { const b = buildToward(B, unit, closest.x, closest.y); if (b) return b.act; }
      if (unit === PREACHER && w.canAfford(PROPHET)) { const b = buildToward(B, PROPHET, closest.x, closest.y); if (b) return b.act; }
    }
  }
  if (me.unit === CASTLE && w.enemies.length && w.fuel >= STATS[CASTLE].atkFuel) {
    const t = pickTarget(CASTLE, me.x, me.y, w.enemies, w.n);
    if (t) return w.attack(t.x - me.x, t.y - me.y);
  }

  // Endgame fuel (CFG.ENDGAME_FUEL): fuel is the binding resource late (karbonite floats), so it all becomes HP.
  if (CFG.ENDGAME_FUEL && B.round >= CFG.ENDGAME_FUEL) {
    const unit = w.karbonite >= STATS[PREACHER].costK ? PREACHER : CRUSADER;
    if (!w.canAfford(unit)) return null;
    const [ex, ey] = w.mirror(me.x, me.y);
    const b = buildToward(B, unit, ex, ey, encNum(SIG.ROUND, B.round));
    return b ? b.act : null;
  }

  // Sparring mode (CFG.RUSH, never in our submitted bot): after a few pilgrims, crusaders toward the enemy forever.
  if (CFG.RUSH && (B.round || 0) > CFG.RUSH && w.canAfford(CRUSADER)) {
    const [ex, ey] = w.mirror(me.x, me.y);
    const b = buildToward(B, CRUSADER, ex, ey); if (b) return b.act;
  }

  // 2. Endgame dump.
  if (endgame(B) && w.canAfford(CRUSADER)) {
    const [ex, ey] = w.mirror(me.x, me.y);
    const b = buildToward(B, CRUSADER, ex, ey); if (b) return b.act;
  }

  // 3. Economy: a pilgrim for every served depot.
  const dep = nextDepot(B);
  if (dep && w.canAfford(PILGRIM, CFG.DEF_RESERVE_K, 2)) {
    const b = buildToward(B, PILGRIM, dep.x, dep.y, encXY(SIG.MINE, dep.x, dep.y));
    if (b) { st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'mine', ref: dep.i }; st.assign.set(dep.i, { id: -1, seen: me.turn }); return b.act; }
  }
  if (extra) { const a = extra(); if (a) return a; }

  // 4. Peacetime army: a growing guard (prophets, every Nth a preacher), spending what the economy leaves.
  const want = Math.min(CFG.GUARD_MAX, CFG.GUARD_BASE + Math.floor((B.round || 0) / CFG.GUARD_ROUNDS));
  const have = defenders(B, 100);
  if (have < want || w.karbonite > 200 + reserveK) {
    const unit = CFG.MIL_ROTATION ? CFG.MIL_ROTATION[st.nDef % CFG.MIL_ROTATION.length]
      : (st.nDef % CFG.PREACHER_EVERY === CFG.PREACHER_EVERY - 1) ? PREACHER : PROPHET;
    const army = st.count ? st.count[3] + st.count[4] + st.count[5] : have;
    if (w.canAfford(unit, reserveK, CFG.MIL_FUEL_RESERVE + CFG.MIL_FUEL_PER_UNIT * army)) {
      const [ex, ey] = w.mirror(me.x, me.y);
      const sig = B.round ? encNum(SIG.ROUND, B.round) : undefined;
      const b = buildToward(B, unit, ex, ey, sig); if (b) { st.nDef++; return b.act; }
    }
  }
  return null;
}

export { CASTLE, CHURCH };
