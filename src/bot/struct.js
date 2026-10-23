// Shared logic of castles and churches: depot service, pilgrim assignment, defence, peacetime army, endgame dump.
import { CFG, defReserveK } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, ADJ, offsets } from './util.js';
import { bfs, econ } from './mapinfo.js';
import { SIG, encXY, encNum } from './comms.js';
import { isAttacker, pickTarget, canHit, THREAT_R2, PRIORITY, churchFirst } from './combat.js';
import { watchDeaths } from './military.js';

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
  if (me.unit === CHURCH && CFG.CHURCH_GUARD_D) {   // a contested site: guard first (CFG.CHURCH_GUARD_D)
    const [mx, my] = w.mirror(me.x, me.y);
    st.guardDue = Math.max(Math.abs(mx - me.x), Math.abs(my - me.y)) <= CFG.CHURCH_GUARD_D;
  }
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
    else if (p.kind === 'chain') st.chainId = best.id;
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

// CFG.SAFE_BUILD: the damage the visible enemy attackers can deal to a robot on (x, y) with one shot each: prophets and
// castles in their band, crusaders within r2 16, preachers whose 3x3 splash reaches it. A newborn acts after every
// robot already in the round's queue (replica 414-3, seed 836: in r66-69 a church built four prophets on one tile and
// each died before its first turn; 414-1, seed 2013: nine on our castle's build tile in r169-180).
// only (CFG.SAFE_BUILD 2): count only attackers that can hit no mobile robot of ours in sight, whose one target the
// newborn would be (414's campers; in a contest the enemy has other targets, and one prophet in reach of every tile
// stopped h109's chain launches on 2013).
export function exposure(w, x, y, only) {
  let dmg = 0;
  for (const e of w.enemies) {
    const S = STATS[e.unit]; if (!S.damage) continue;
    if (only && w.friends.some(f => f.unit >= PILGRIM && canHit(e, f.x, f.y))) continue;
    let hit = false;
    if (e.unit === PREACHER) {
      for (let dy = -1; dy <= 1 && !hit; dy++) for (let dx = -1; dx <= 1; dx++) if (d2(x + dx, y + dy, e.x, e.y) <= S.atkMax) { hit = true; break; }
    } else { const r = d2(x, y, e.x, e.y); hit = r >= S.atkMin && r <= S.atkMax; }
    if (hit) dmg += S.damage;
  }
  return dmg;
}

// Build `unit` on the free adjacent tile closest to (tx, ty); avoid depots when possible. Returns the action or null.
// CFG.SAFE_BUILD: never on a tile whose exposure would kill the newborn before its first turn (null if every tile would).
export function buildToward(B, unit, tx, ty, signal) {
  const w = B.w, me = w.me; let best = null, bd = 1e9;
  const safe = CFG.SAFE_BUILD && w.enemies.some(e => STATS[e.unit].damage > 0);
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy; if (!w.free(x, y)) continue;
    if (safe && exposure(w, x, y, CFG.SAFE_BUILD >= 2) >= STATS[unit].hp) continue;
    const dd = d2(x, y, tx, ty) * 4 + (w.isDepot(x, y) ? 3 : 0);
    if (dd < bd) { bd = dd; best = [dx, dy]; }
  }
  if (!best) return null;
  if (signal !== undefined && !w.sentR2 && w.fuel >= STATS[unit].costF + 2) w.signal(signal, 2);
  B.st.pending = null; B.st.built = unit;
  return { act: w.build(unit, best[0], best[1]), x: me.x + best[0], y: me.y + best[1] };
}

// CFG.FRONT_ROUND: the site of a structure's front church: the tile nearest FRONT_STEP rows toward the enemy
// (canonical +y) that is passable, not a depot and off the lattice ((x + y) odd, where our units do not stand), within
// 3 king steps; from the map only, so the pilgrim finds the same site from its builder's position.
export function frontSite(w, bx, by) {
  const n = w.n, tx = bx, ty = Math.min(n - 1, by + CFG.FRONT_STEP); let best = null, bd = 1e9;
  for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
    const x = tx + dx, y = ty + dy;
    if (x < 0 || y <= by || x >= n || y >= n || !((x + y) & 1) || !w.passable(x, y) || w.isDepot(x, y)) continue;
    const v = d2(x, y, tx, ty) * 4096 + y * 64 + x;
    if (v < bd) { bd = v; best = [x, y]; }
  }
  return best;
}

// From FRONT_ROUND, a structure with no structure of ours ahead of it in sight sends a pilgrim to build a church at
// its front site, at most every FRONT_EVERY rounds; units born there hold the lattice around it, so the front
// advances by building instead of marching (replica scrim 200, seed 2924: StoneT2000 built lines of churches 5-13
// tiles from each of our castles at rounds 235, 341 and 541 and killed each castle from there).
export function frontPioneer(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!CFG.FRONT_ROUND || !(B.round >= CFG.FRONT_ROUND)) return null;
  if (st.frontAt !== undefined && B.round - st.frontAt < CFG.FRONT_EVERY) return null;
  if (w.friends.some(r => (r.unit === CASTLE || r.unit === CHURCH) && r.y > me.y + 2)) return null;
  const site = frontSite(w, me.x, me.y);
  if (!site || !(st.pf[site[1] * w.n + site[0]] >= 0)) return null;
  // A mobile attacker in sight, or a site in an enemy castle's range: the pioneer would walk into fire.
  if (w.enemies.some(e => isAttacker(e.unit) && (e.unit !== CASTLE || d2(site[0], site[1], e.x, e.y) <= THREAT_R2[CASTLE]))) return null;
  if (!w.canAfford(PILGRIM, STATS[CHURCH].costK + defReserveK(B), STATS[CHURCH].costF + 2)) return null;
  const b = buildToward(B, PILGRIM, site[0], site[1], encNum(SIG.FRONT, B.round));
  if (!b) return null;
  st.frontAt = B.round;
  return b.act;
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
// CFG.DEF_SEEN: our military that see enemy e (and so engage it).
function seers(B, e) {
  let c = 0;
  for (const r of B.w.friends) if (r.unit >= CRUSADER && d2(e.x, e.y, r.x, r.y) <= STATS[r.unit].vision) c++;
  return c;
}

// The structure's turn after role bookkeeping. extra(): castle-only builds (pioneers); first(): castle-only builds
// ahead of the economy pilgrims (CFG.PIONEER_EARLY). Returns an action or null.
export function structTurn(B, allIds, extra, first) {
  if (!CFG.KILL_ZONE) return structAct(B, allIds, extra, first);
  watchDeaths(B);
  B.st.built = -1;
  const a = structAct(B, allIds, extra, first);
  sayZone(B);
  return a;
}

// CFG.KILL_ZONE: the turn after building a military unit (that turn's radio carries its birth round), tell it, and
// whoever else is near, the latest fresh kill zone; within 3 turns, on a turn with the radio free.
export function sayZone(B) {
  const st = B.st, w = B.w, t = w.me.turn;
  if (st.built >= CRUSADER) { st.zoneSay = 3; return; }
  if (!(st.zoneSay > 0)) return;
  st.zoneSay--;
  const z = (st.zones || []).filter(q => t - q.t <= CFG.KILL_ZONE).pop();
  if (!z || w.sentR2 || w.fuel < 10) return;
  w.signal(encXY(SIG.ZONE, z.x, z.y), 25); st.zoneSay = 0;
}

function structAct(B, allIds, extra, first) {
  const st = B.st, w = B.w, me = w.me;
  resolvePending(B);
  refreshAssign(B, allIds);
  const attackers = w.enemies.filter(e => isAttacker(e.unit));
  // Past CHAIN_ROUND, or (CFG.CHAIN_KEEP) a church that never learned the round: a line church, or one whose builder
  // was shot before the church's first turn. Its army spent the bank the next line needs (seed 799: church #505, its
  // chainer killed in between, built 136 units in r246-450 and no line fired).
  const chainOn = CFG.CHAIN_ROUND && (B.round >= CFG.CHAIN_ROUND || (CFG.CHAIN_KEEP && me.unit === CHURCH && !B.round));
  const reserveK = defReserveK(B) + CFG.PEACE_RESERVE_K + (st.pioneers.length ? CFG.RESERVE_CHURCH_K : 0) +
    (CFG.FRONT_ROUND && st.frontAt !== undefined && B.round - st.frontAt < 40 ? STATS[CHURCH].costK : 0) +
    (CFG.PIONEER_RESERVE && st.pioneerDue ? STATS[PILGRIM].costK + STATS[CHURCH].costK : 0) +
    (chainOn ? CFG.CHAIN_K : 0);   // peacetime army only
  // CFG.PIONEER_HOLD: a castle that hears a pioneer waiting at its site leaves the church's karbonite in the bank.
  const waitK = CFG.PIONEER_HOLD && st.waitN ? STATS[CHURCH].costK + defReserveK(B) : 0;

  // 1. Defence: answer visible attackers with a defender while they outnumber ours; otherwise shoot.
  if (attackers.length) {
    let closest = attackers[0], cd = 1e9;
    for (const e of attackers) { const r = d2(me.x, me.y, e.x, e.y); if (r < cd) { cd = r; closest = e; } }
    const ours = CFG.DEF_SEEN ? seers(B, closest) : defenders(B, 100);
    // CFG.CHAIN_HOLD_R2: from CHAIN_ROUND a church answers attackers farther than this out of what exceeds the chain's
    // bank (seed 799: a front church's answers took 136 of 211 military builds in r200-400 and no line ever fired).
    const hold = Math.max(CFG.CHAIN_HOLD_R2 && me.unit === CHURCH && chainOn && cd > CFG.CHAIN_HOLD_R2 ? CFG.CHAIN_K : 0,
      waitK && cd > CFG.PIONEER_HOLD ? waitK : 0);
    if (ours < attackers.length * 2 + 1) {
      const unit = cd <= 36 || closest.unit === CRUSADER ? PREACHER : (CFG.DEF_FAR_UNIT || PROPHET);
      if (w.canAfford(unit, hold)) { const b = buildToward(B, unit, closest.x, closest.y); if (b) return b.act; }
      if (unit === PREACHER && w.canAfford(PROPHET, hold)) { const b = buildToward(B, PROPHET, closest.x, closest.y); if (b) return b.act; }
    }
  }
  if (me.unit === CASTLE && w.enemies.length && w.fuel >= STATS[CASTLE].atkFuel) {
    const cf = churchFirst(me, CFG.CHURCH_FIRST_R2);
    const t = pickTarget(CASTLE, me.x, me.y, w.enemies, w.n, CFG.FOCUS ? w.friends : null, cf && (e => cf(e) ? 7 : PRIORITY[e.unit]));
    if (t) return w.attack(t.x - me.x, t.y - me.y);
  }
  if (CFG.STRIKE_R2 && !attackers.length) { const a = strike(B); if (a) return a; }

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

  // A contested church's first unit is a guard (CFG.CHURCH_GUARD_D); until the bank affords it, the economy goes on.
  if (st.guardDue && w.canAfford(CFG.CHURCH_GUARD_UNIT, 0, 2)) {
    const [ex, ey] = w.mirror(me.x, me.y);
    const b = buildToward(B, CFG.CHURCH_GUARD_UNIT, ex, ey, B.round ? encNum(SIG.ROUND, B.round) : undefined);
    if (b) { st.guardDue = false; return b.act; }
  }

  // 2. Endgame dump.
  if (endgame(B) && w.canAfford(CRUSADER)) {
    const [ex, ey] = w.mirror(me.x, me.y);
    const b = buildToward(B, CRUSADER, ex, ey); if (b) return b.act;
  }

  // 3. Economy: a pilgrim for every served depot.
  if (first) { const a = first(); if (a) return a; }
  // CFG.CHURCH_SAVE: before that round (a church that never learned it counts its own turns) a church's economy
  // pilgrims leave a church's karbonite in the bank for pioneers waiting at their sites, whom only castles hear.
  const saveK = CFG.CHURCH_SAVE && me.unit === CHURCH && (B.round || me.turn) < CFG.CHURCH_SAVE ? STATS[CHURCH].costK : 0;
  const dep = nextDepot(B);
  if (dep && w.canAfford(PILGRIM, Math.max(defReserveK(B), waitK) + saveK, 2)) {
    const b = buildToward(B, PILGRIM, dep.x, dep.y, encXY(SIG.MINE, dep.x, dep.y));
    if (b) { st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'mine', ref: dep.i }; st.assign.set(dep.i, { id: -1, seen: me.turn }); return b.act; }
  }
  if (extra) { const a = extra(); if (a) return a; }
  { const a = frontPioneer(B); if (a) return a; }

  // 4. Peacetime army: a growing guard (prophets, every Nth a preacher), spending what the economy leaves.
  // CFG.ECON_RICH: before ECON_UNTIL only the bank past ECON_RICH + reserveK builds it (the economy had nothing to buy).
  const early = (B.round || 0) < CFG.ECON_UNTIL;
  if (early && !(CFG.ECON_RICH && w.karbonite > CFG.ECON_RICH + reserveK)) return null;
  const want = Math.min(CFG.GUARD_MAX, CFG.GUARD_BASE + Math.floor((B.round || 0) / CFG.GUARD_ROUNDS));
  const have = defenders(B, 100);
  if (early || have < want || w.karbonite > CFG.RICH_K + reserveK) {
    const unit = mixByStock(w) || (CFG.MIL_ROTATION ? CFG.MIL_ROTATION[st.nDef % CFG.MIL_ROTATION.length]
      : (st.nDef % CFG.PREACHER_EVERY === CFG.PREACHER_EVERY - 1) ? PREACHER : PROPHET);
    const army = st.count ? st.count[3] + st.count[4] + st.count[5] : have;
    // CFG.CHAIN_GUARD: the guard quota does not wait for the chain's bank; only the army past it does.
    const resK = CFG.CHAIN_GUARD && chainOn && have < want ? reserveK - CFG.CHAIN_K : reserveK;
    if (w.canAfford(unit, resK, CFG.MIL_FUEL_RESERVE + CFG.MIL_FUEL_PER_UNIT * army)) {
      const [ex, ey] = w.mirror(me.x, me.y);
      const sig = B.round ? encNum(SIG.ROUND, B.round) : undefined;
      const b = buildToward(B, unit, ex, ey, sig); if (b) { st.nDef++; return b.act; }
    }
  }
  return null;
}

// CFG.STRIKE_R2: an enemy church this near, with no enemy attacker in sight, gets a preacher built toward it unless
// two military units of ours already stand that near it. A newborn acts in the round it is built, and a preacher
// hits from 4 tiles: the side that builds first strikes first (seeds 1915, 2030, 2924: mirror churches 1-5 tiles
// apart; the side the engine moves first built a peacetime prophet, the other side's church saw it and answered
// with a preacher that killed it, then the church, and took the cluster).
function strike(B) {
  const w = B.w, me = w.me, n = w.n;
  let c = null, cd = 1e9;
  for (const e of w.enemies) {
    if (e.unit !== CHURCH) continue;
    const r = d2(me.x, me.y, e.x, e.y);
    if (r <= CFG.STRIKE_R2 && (r < cd || (r === cd && e.y * n + e.x < c.y * n + c.x))) { cd = r; c = e; }
  }
  if (!c || !w.canAfford(PREACHER)) return null;
  let near = 0;
  for (const r of w.friends) if (r.unit >= CRUSADER && d2(r.x, r.y, c.x, c.y) <= CFG.STRIKE_R2) near++;
  if (near >= 2) return null;
  const b = buildToward(B, PREACHER, c.x, c.y);
  return b ? b.act : null;
}

// CFG.MIX_BY_STOCK: the unit the binding resource asks for, or 0 (use the rotation).
export function mixByStock(w) {
  if (!CFG.MIX_BY_STOCK) return 0;
  const r = w.fuel / Math.max(1, w.karbonite);
  return r >= CFG.MIX_BY_STOCK[0] ? CRUSADER : r <= CFG.MIX_BY_STOCK[1] ? PREACHER : 0;
}

export { CASTLE, CHURCH };
