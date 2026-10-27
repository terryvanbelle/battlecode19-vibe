// Shared logic of castles and churches: depot service, pilgrim assignment, defence, peacetime army, endgame dump.
import { CFG, defReserveK } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, king, ADJ, offsets } from './util.js';
import { bfs, econ } from './mapinfo.js';
import { SIG, FAR, encXY, encNum, HOARD_R2, MUSTER_R2 } from './comms.js';
import { isAttacker, pickTarget, canHit, THREAT_R2, PRIORITY, churchFirst, exposure, doomed } from './combat.js';
import { watchDeaths, hoardTile, latticeTile } from './military.js';
import { chainsFailed, chainsWalled, hoarding } from './chain.js';

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
  // CFG.FUEL_DEFER: in the opening the fuel trickle pays for everything, and each fuel miner's 10 K delays the pioneer.
  if (CFG.FUEL_DEFER && (B.round || w.me.turn) < CFG.FUEL_DEFER && w.fuel >= CFG.FUEL_DEFER_MIN &&
    st.threatAt === undefined && !(w.me.unit === CASTLE && st.planAll === 0)) return free.find(d => d.k) || null;
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
// CFG.SAFE_BUILD: never on a tile whose exposure would kill the newborn before its first turn (null if every tile would).
// CFG.DEF_SAFE: a military newborn goes on such a tile only when every free tile is one (replica 1373, seed 1884:
// castle (0,14) built a prophet a round on (0,15), the tile nearest two enemy prophets, from r247; each died that
// round, 162 of v9's 222 military newborns in the game, while a free tile out of one prophet's reach stood beside it).
// CFG.DEF_SAFE 2: pilgrims too, and a pilgrim is not built while every free tile is one (replica 1446, seed 2321: the
// castle built 17 pioneers on (32,10), in reach of a prophet camping at r2 61; each died before its first turn, so the
// castle never learned of it and resent 80 turns later).
export function buildToward(B, unit, tx, ty, signal, sigR2 = 2) {
  const w = B.w, me = w.me; let best = null, bd = 1e9;
  if (CFG.DOOM_HOLD && unit >= CRUSADER && doomed(w, unit)) return null;
  const safe = CFG.SAFE_BUILD && w.enemies.some(e => STATS[e.unit].damage > 0);
  const shun = CFG.DEF_SAFE && (unit >= CRUSADER || (CFG.DEF_SAFE >= 2 && unit === PILGRIM)) && w.enemies.some(e => STATS[e.unit].damage > 0);
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy; if (!w.free(x, y)) continue;
    if (safe && exposure(w, x, y, CFG.SAFE_BUILD >= 2) >= STATS[unit].hp) continue;
    const dd = d2(x, y, tx, ty) * 4 + (w.isDepot(x, y) ? 3 : 0) + (shun && exposure(w, x, y) >= STATS[unit].hp ? 1e6 : 0);
    if (dd < bd) { bd = dd; best = [dx, dy]; }
  }
  if (!best || (unit === PILGRIM && bd >= 1e6)) return null;
  if (signal !== undefined && !w.sentR2 && w.fuel >= STATS[unit].costF + 2) w.signal(signal, sigR2);
  B.st.pending = null; B.st.built = unit;
  if (CFG.FEED_STOP && unit >= CRUSADER) B.st.kidPending = { x: me.x + best[0], y: me.y + best[1], unit };
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
  if (CFG.FEED_STOP) watchKids(B);
  if (CFG.MUSTER_RESCUE) hitTrack(B);
  if (!CFG.KILL_ZONE && !CFG.SIEGE && !CFG.WATCH && !CFG.MUSTER_RESCUE) return structAct(B, allIds, extra, first);
  if (CFG.KILL_ZONE) watchDeaths(B);
  B.st.built = -1;
  const a = structAct(B, allIds, extra, first);
  if (CFG.KILL_ZONE) sayZone(B); else if (CFG.SIEGE) sayThreat(B);
  if (CFG.WATCH) sayWatch(B);
  if (CFG.MUSTER_RESCUE) sayRescue(B);
  return a;
}

// CFG.MUSTER_RESCUE: the turn this structure last lost health (st.hitAt).
export function hitTrack(B) {
  const st = B.st, me = B.w.me;
  if (me.health < st.hp) st.hitAt = me.turn;
  st.hp = me.health;
}
// CFG.MUSTER_RESCUE: a structure hit within its last 3 turns radios, as a spot, the nearest enemy attacker in sight,
// when its radio is free after its build; the held crusaders near it drop their hold and engage it (military.js listen).
export function sayRescue(B) {
  const st = B.st, w = B.w, me = w.me;
  if (!(me.turn - st.hitAt <= 2) || w.sentR2 || w.fuel < 10) return;
  let e = null, ed = 1e9;
  for (const x of w.enemies) if (isAttacker(x.unit)) { const q = d2(x.x, x.y, me.x, me.y); if (q < ed) { ed = q; e = x; } }
  if (e) w.signal(encXY(0, e.x, e.y), FAR.ENEMY);
}

// CFG.FEED_STOP: follow this structure's military newborns through their first FEED_AGE turns. One that vanishes from
// sight within 3 tiles less than the structure's vision radius died (no newborn walks out that far that fast), and so
// did one never seen alive on the turn after its build; FEED_STOP such deaths within FEED_WINDOW turns stop military
// builds until st.feedOff (struct.js feeding).
export function watchKids(B) {
  const st = B.st, w = B.w, me = w.me, t = me.turn, R = Math.sqrt(STATS[me.unit].vision) - 3;
  const kids = st.kids || (st.kids = new Map()), quick = st.quick || (st.quick = []);
  const p = st.kidPending;
  if (p) {
    st.kidPending = null;
    let best = null, bd = 1e9;
    for (const r of w.friends) {
      if (r.turn !== 1 || r.unit !== p.unit) continue;
      const dd = d2(r.x, r.y, p.x, p.y); if (dd <= 9 && dd < bd) { bd = dd; best = r; }
    }
    if (best) kids.set(best.id, { t: t - 1, x: best.x, y: best.y }); else quick.push(t);
  }
  for (const [id, k] of [...kids]) {
    const r = w.friends.find(f => f.id === id);
    if (r) { if (t - k.t >= CFG.FEED_AGE) kids.delete(id); else { k.x = r.x; k.y = r.y; } continue; }
    kids.delete(id);
    if (d2(k.x, k.y, me.x, me.y) <= R * R) quick.push(t);
  }
  while (quick.length && t - quick[0] >= CFG.FEED_WINDOW) quick.shift();
  if (quick.length >= CFG.FEED_STOP) { st.feedOff = t + CFG.FEED_REST; quick.length = 0; }
}
// Whether this structure may build a military unit now (CFG.FEED_STOP): always against an attacker that can hit it.
export function feeding(B, e, ed) {
  if (!CFG.FEED_STOP || !(B.st.feedOff > B.w.me.turn)) return true;
  return !!e && ed <= STATS[e.unit].atkMax;
}

// CFG.MUSTER: campers, the enemy prophets this structure cannot hit, when the nearest attacker is one of them beyond
// r2 36 (nearer, v8 answers with a preacher) that has stood on its tile MUSTER_DWELL turns and no enemy crusader or
// preacher is in sight (an army, not a siege: h163's first form mustered against advancing preachers and lost to
// v8 on 1712 and 2797); else null (v8's answer).
export function musterCase(B, attackers, e, ed) {
  const w = B.w, me = w.me, reach = me.unit === CASTLE ? STATS[CASTLE].atkMax : 0;
  if (e.unit !== PROPHET || ed <= Math.max(reach, 36)) return null;
  if (w.enemies.some(x => x.unit === CRUSADER || x.unit === PREACHER)) return null;
  const s = B.st.mus && B.st.mus.seen.get(e.id);
  if (!s || me.turn - s.t < CFG.MUSTER_DWELL) return null;
  return attackers.filter(x => x.unit === PROPHET && d2(x.x, x.y, me.x, me.y) > reach);
}
// Every turn: each enemy prophet in sight keeps the turn it came to its tile; the crusader built last turn joins the
// held set (found as watchKids finds newborns), units gone from sight leave it, and a release ends after MUSTER_WAIT
// turns or when no attacker is in sight.
export function musterTrack(B) {
  const st = B.st, w = B.w, me = w.me, m = st.mus || (st.mus = { ids: new Set(), pend: null, rel: -1, seen: new Map() });
  const seen = new Map();
  for (const e of w.enemies) if (e.unit === PROPHET) {
    const p = m.seen.get(e.id); seen.set(e.id, { x: e.x, y: e.y, t: p && p.x === e.x && p.y === e.y ? p.t : me.turn });
  }
  m.seen = seen;
  if (m.pend) {
    let best = null, bd = 1e9;
    for (const r of w.friends) {
      if (r.turn !== 1 || r.unit !== CRUSADER) continue;
      const dd = d2(r.x, r.y, m.pend.x, m.pend.y); if (dd <= 9 && dd < bd) { bd = dd; best = r; }
    }
    if (best) m.ids.add(best.id);
    m.pend = null;
  }
  for (const id of [...m.ids]) if (!w.friends.some(f => f.id === id)) m.ids.delete(id);
  if (CFG.MUSTER_TILE && m.given) for (const [k, t] of m.given) {
    const x = k & 63, y = k >> 6, f = w.friends.find(r => r.x === x && r.y === y && r.unit === CRUSADER);
    if (f) { t.id = f.id; continue; }
    if (t.id !== undefined) {   // its holder left: banned if it died (a crusader walks at most 3 tiles out of sight r2 100)
      if (!w.friends.some(r => r.id === t.id)) t.ban = me.turn + CFG.MUSTER_TILE_BAN;
      t.id = undefined; t.at = -1e9;
    }
    if (t.ban <= me.turn && me.turn - t.at >= CFG.MUSTER_TILE_TTL) m.given.delete(k);
  }
  if (m.rel >= 0 && (me.turn - m.rel >= CFG.MUSTER_WAIT || !w.enemies.some(e => isAttacker(e.unit)))) m.rel = -1;
}
// Against campers (out = musterCase): hold crusaders, built while ours do not outnumber the attackers 2A + 1 (v8's
// gate) on the tile farthest from the nearest and told its position (SIG.THREAT), until 2A + 1 of them stand ready,
// or A + 1 once ours outnumber them (held crusaders count among ours: on 1712 against dist/turtle the gate closed at 6
// held of 7 and the hold timed out); then radio it as a spot (FAR.ENEMY) every turn of the release, and they engage
// it together (military.js). Returns a build or null (no build this turn).
// CFG.MUSTER 2 (hold only): no release; the held crusaders are health kept for the round-1000 tiebreak, and while the
// case holds the peacetime army builds held crusaders too (st.camp, musterArmy).
export function musterAct(B, out, hold, short) {
  const st = B.st, w = B.w, me = w.me, m = st.mus;
  let e = out[0], ed = 1e9;
  for (const x of out) { const r = d2(me.x, me.y, x.x, x.y); if (r < ed) { ed = r; e = x; } }
  st.camp = { t: me.turn, x: e.x, y: e.y };
  if (CFG.MUSTER !== 2 && m.rel < 0 && m.ids.size >= (short ? 2 * out.length + 1 : out.length + 1)) { m.rel = me.turn; m.ids.clear(); }
  if (m.rel >= 0) {
    if (!w.sentR2 && w.fuel >= 10) w.signal(encXY(0, e.x, e.y), FAR.ENEMY);
    return null;
  }
  if (!short || !w.canAfford(CRUSADER, hold, 2)) return null;
  const b = CFG.MUSTER_TILE ? tileBuild(B, e) : buildToward(B, CRUSADER, 2 * me.x - e.x, 2 * me.y - e.y, encXY(SIG.THREAT, e.x, e.y));
  if (!b) return null;
  m.pend = { x: b.x, y: b.y };
  return b.act;
}
// CFG.MUSTER 2: the peacetime army's unit, while this turn's camper case holds, is a held crusader on the far side.
export function musterArmy(B, resK, fuelK) {
  const st = B.st, w = B.w, me = w.me, c = st.camp;
  if (!(CFG.MUSTER === 2 && c && c.t === me.turn)) return undefined;
  if (!w.canAfford(CRUSADER, resK, fuelK)) return null;
  const b = CFG.MUSTER_TILE ? tileBuild(B, c) : buildToward(B, CRUSADER, 2 * me.x - c.x, 2 * me.y - c.y, encXY(SIG.THREAT, c.x, c.y));
  if (!b) return null;
  st.mus.pend = { x: b.x, y: b.y }; st.nDef++;
  return b.act;
}
// CFG.MUSTER_TILE: tiles in reach (THREAT_R2) of an enemy attacker this structure sees.
function hotFor(w) {
  const th = w.enemies.filter(e => THREAT_R2[e.unit] > 0);
  return (x, y) => th.some(e => d2(x, y, e.x, e.y) <= THREAT_R2[e.unit]);
}
// CFG.MUSTER_TILE: the hold tile for a held crusader against the camper at (cx, cy): a free lattice tile 2-4 king steps
// out (r2 LATTICE_MIN_R2 from here, no depot), no nearer the camper than this structure, in reach of no enemy attacker
// in sight, not given in the last MUSTER_TILE_TTL turns nor banned; the nearest ring first, then the farthest from the
// camper. Null if none.
export function musterTile(B, cx, cy) {
  const w = B.w, me = w.me, m = B.st.mus, g = m.given || (m.given = new Map()), hot = hotFor(w), home = d2(me.x, me.y, cx, cy);
  let best = null, bs = Infinity;
  for (let y = me.y - 4; y <= me.y + 4; y++) for (let x = me.x - 4; x <= me.x + 4; x++) {
    const k = king(x, y, me.x, me.y);
    if (k < 2 || !latticeTile(x, y) || !w.free(x, y) || w.isDepot(x, y) || d2(x, y, me.x, me.y) < CFG.LATTICE_MIN_R2) continue;
    if (d2(x, y, cx, cy) < home || hot(x, y)) continue;
    const t = g.get(y * 64 + x);
    if (t && (t.ban > me.turn || me.turn - t.at < CFG.MUSTER_TILE_TTL)) continue;
    const s = k * 1e4 - d2(x, y, cx, cy);
    if (s < bs) { bs = s; best = [x, y]; }
  }
  return best;
}
// CFG.MUSTER_TILE: build a held crusader on the free adjacent tile in reach of no enemy attacker in sight nearest its
// hold tile (musterTile), radioed to it at r2 MUSTER_R2; null (no build) when either is lacking or the radio is taken.
function tileBuild(B, c) {
  const w = B.w, me = w.me;
  if (w.sentR2) return null;
  const t = musterTile(B, c.x, c.y);
  if (!t) return null;
  const hot = hotFor(w); let bt = null, bd = 1e9;
  for (const [dx, dy] of ADJ) {
    const x = me.x + dx, y = me.y + dy; if (!w.free(x, y) || hot(x, y)) continue;
    const dd = d2(x, y, t[0], t[1]) * 4 + (w.isDepot(x, y) ? 3 : 0);
    if (dd < bd) { bd = dd; bt = [x, y]; }
  }
  if (!bt) return null;
  const b = buildToward(B, CRUSADER, bt[0], bt[1], encXY(SIG.THREAT, t[0], t[1]), MUSTER_R2);
  if (b) B.st.mus.given.set(t[1] * 64 + t[0], { at: me.turn, ban: 0, id: undefined });
  return b;
}

// CFG.WATCH: radio, as a spot, the nearest enemy attacker within r2 100 that no military unit of ours sees.
export function sayWatch(B) {
  const st = B.st, w = B.w, me = w.me;
  if (w.sentR2 || w.fuel < 60 || me.turn - (st.watchAt || -99) < CFG.WATCH) return;
  let e = null, ed = 101;
  for (const x of w.enemies) {
    if (x.unit < CRUSADER) continue;
    const q = d2(x.x, x.y, me.x, me.y);
    if (q >= ed || w.friends.some(f => f.unit >= CRUSADER && d2(f.x, f.y, x.x, x.y) <= STATS[f.unit].vision)) continue;
    ed = q; e = x;
  }
  if (!e) return;
  st.watchAt = me.turn; w.signal(encXY(0, e.x, e.y), FAR.ENEMY);
}

// CFG.SIEGE: the turn after building a military unit (that turn's radio carries its birth round), tell it, and
// whoever else is near, where the enemy prophet in sight nearest this structure stands; within 3 turns, radio free.
export function sayThreat(B) {
  const st = B.st, w = B.w, me = w.me;
  // CFG.SIEGE_NOW: a military build whose radio is free (a threat response carries no message) warns its newborn at once.
  const now = CFG.SIEGE_NOW && st.built >= CRUSADER && !w.sentR2;
  if (st.built >= CRUSADER && !now) { st.threatSay = 3; return; }
  if (!now && !(st.threatSay > 0)) return;
  if (!now) st.threatSay--;
  let e = null, ed = 1e9;
  for (const x of w.enemies) if (x.unit === PROPHET) { const q = d2(x.x, x.y, me.x, me.y); if (q < ed) { ed = q; e = x; } }
  if (!e || w.sentR2 || w.fuel < 10) return;
  w.signal(encXY(SIG.THREAT, e.x, e.y), 25); st.threatSay = 0;
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
  if (attackers.length && st.threatAt === undefined) st.threatAt = me.turn;   // CFG.FUEL_DEFER ends at the first threat
  if (CFG.MUSTER) musterTrack(B);
  // Past CHAIN_ROUND, or (CFG.CHAIN_KEEP) a church that never learned the round: a line church, or one whose builder
  // was shot before the church's first turn. Its army spent the bank the next line needs (seed 799: church #505, its
  // chainer killed in between, built 136 units in r246-450 and no line fired).
  const chainOn = CFG.CHAIN_ROUND && (B.round >= CFG.CHAIN_ROUND || (CFG.CHAIN_KEEP && me.unit === CHURCH && !B.round)) &&
    !(me.unit === CASTLE && (chainsFailed(st) || chainsWalled(B))) &&   // CFG.CHAIN_FAILS, CFG.CHAIN_WALL
    !(CFG.CHAIN_LIVE && me.unit === CASTLE && !st.chainAny) && !hoarding(B) &&   // CFG.HOARD_ROUND
    !(CFG.HOARD_CHURCH === 2 && me.unit === CHURCH && CFG.HOARD_ROUND > 0 && B.round >= CFG.HOARD_ROUND);
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
    const out = CFG.MUSTER ? musterCase(B, attackers, closest, cd) : null;
    if (out) { const a = musterAct(B, out, hold, ours < attackers.length * 2 + 1); if (a) return a; }
    else if (ours < attackers.length * 2 + 1 && feeding(B, closest, cd)) {
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
  if (CFG.INTERCEPT_R2 || CFG.INTERCEPT_DWELL) { const a = intercept(B); if (a) return a; }
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
  // CFG.CLAIM_FUND: while the claim's pioneer is out (castle talk: castles only) the church's karbonite stays too.
  const claimK = CFG.CLAIM_FUND && st.claimOpen ? STATS[CHURCH].costK : 0;
  const dep = nextDepot(B);
  if (dep && w.canAfford(PILGRIM, Math.max(defReserveK(B), waitK) + saveK + claimK, 2)) {
    const b = buildToward(B, PILGRIM, dep.x, dep.y, encXY(SIG.MINE, dep.x, dep.y));
    if (b) { st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'mine', ref: dep.i }; st.assign.set(dep.i, { id: -1, seen: me.turn }); return b.act; }
  }
  st.noDepot = !dep;   // CFG.PIONEER_IDLE: no depot left to staff this turn (castle.js pioneer)
  if (extra) { const a = extra(); if (a) return a; }
  { const a = frontPioneer(B); if (a) return a; }

  // 4. Peacetime army: a growing guard (prophets, every Nth a preacher), spending what the economy leaves.
  // CFG.HOARD_ROUND: a hoarding castle builds held crusaders whenever its reserves allow (hoardBuild).
  if (hoarding(B)) {
    const army = st.count[3] + st.count[4] + st.count[5];
    if (!feeding(B, null, 0)) return null;
    return hoardBuild(B, reserveK, CFG.MIL_FUEL_RESERVE + CFG.MIL_FUEL_PER_UNIT * army);
  }
  // CFG.ECON_RICH: before ECON_UNTIL only the bank past ECON_RICH + reserveK builds it (the economy had nothing to buy).
  // CFG.ECON_NOPLAN: a castle whose team planned no church has nothing to save for.
  const early = (B.round || 0) < CFG.ECON_UNTIL && !(CFG.ECON_NOPLAN && me.unit === CASTLE && st.planAll === 0);
  if (early && !(CFG.ECON_RICH && w.karbonite > CFG.ECON_RICH + reserveK)) return null;
  const want = Math.min(CFG.GUARD_MAX, CFG.GUARD_BASE + Math.floor((B.round || 0) / CFG.GUARD_ROUNDS));
  const have = defenders(B, 100);
  if ((early || have < want || w.karbonite > CFG.RICH_K + reserveK) && feeding(B, null, 0)) {
    const unit = mixByStock(w) || (CFG.MIL_ROTATION ? CFG.MIL_ROTATION[st.nDef % CFG.MIL_ROTATION.length]
      : (st.nDef % CFG.PREACHER_EVERY === CFG.PREACHER_EVERY - 1) ? PREACHER : PROPHET);
    const army = st.count ? st.count[3] + st.count[4] + st.count[5] : have;
    // CFG.CHAIN_GUARD: the guard quota does not wait for the chain's bank; only the army past it does.
    const resK = CFG.CHAIN_GUARD && chainOn && have < want ? reserveK - CFG.CHAIN_K : reserveK;
    // CFG.CHAIN_FKEEP: the chain's fuel waits in the bank as its karbonite does.
    const resF = CFG.MIL_FUEL_RESERVE + CFG.MIL_FUEL_PER_UNIT * army + (CFG.CHAIN_FKEEP && chainOn ? CFG.CHAIN_F : 0);
    const held = musterArmy(B, resK, resF);
    if (held !== undefined) return held;
    // CFG.HOARD_CHURCH: from HOARD_ROUND a church's army is held crusaders too, on the same quota and reserves.
    if (CFG.HOARD_CHURCH && me.unit === CHURCH && CFG.HOARD_ROUND > 0 && B.round >= CFG.HOARD_ROUND) return hoardBuild(B, resK, resF);
    if (w.canAfford(unit, resK, resF)) {
      const [ex, ey] = w.mirror(me.x, me.y);
      const sig = B.round ? encNum(SIG.ROUND, B.round) : undefined;
      const b = buildToward(B, unit, ex, ey, sig); if (b) { st.nDef++; return b.act; }
    }
  }
  return null;
}

// CFG.HOARD_ROUND: a crusader built toward the side away from the enemy, told (SIG.ROUND at r2 HOARD_R2) to hold a
// hoard tile (military.js hoardTile), when the reserves allow and the structure sees a free hoard tile for each crusader
// of ours in sight not yet on one; else null (it banks).
function hoardBuild(B, resK, resF) {
  const w = B.w, me = w.me, st = B.st;
  if (!w.canAfford(CRUSADER, resK, resF)) return null;
  const [ex, ey] = w.mirror(me.x, me.y), F = CFG.HOARD_FAR;
  const hold = (x, y) => hoardTile(w, me.x, me.y, ex, ey, x, y);
  let room = 0;
  for (let y = me.y - F; y <= me.y + F; y++) for (let x = me.x - F; x <= me.x + F; x++) if (hold(x, y) && w.free(x, y)) room++;
  for (const r of w.friends) if (r.unit === CRUSADER && king(r.x, r.y, me.x, me.y) <= F && !hold(r.x, r.y)) room--;
  if (room <= 0) return null;
  const b = buildToward(B, CRUSADER, 2 * me.x - ex, 2 * me.y - ey, encNum(SIG.ROUND, B.round), HOARD_R2);
  if (!b) return null;
  st.nDef++;
  return b.act;
}

// CFG.INTERCEPT_R2 / INTERCEPT_DWELL: the nearest enemy pilgrim within INTERCEPT_R2, or standing INTERCEPT_DWELL turns on
// one tile in sight, that is more than 2 king steps from every enemy structure in sight (not a miner at its own church)
// and that no military unit of ours can hit, gets a unit that hits it in its birth round (newborns act in the round they
// are built): a crusader on a free adjacent tile within r2 16 of it, else a prophet at r2 16-64. Pilgrims have 10 HP.
function intercept(B) {
  const w = B.w, me = w.me, st = B.st, n = w.n, now = new Map();
  let best = null, bd = 1e9;
  for (const e of w.enemies) {
    if (e.unit !== PILGRIM) continue;
    const p = st.icpt && st.icpt.get(e.id), t0 = p && p.x === e.x && p.y === e.y ? p.t : me.turn;
    now.set(e.id, { x: e.x, y: e.y, t: t0 });
    const d = d2(e.x, e.y, me.x, me.y);
    if (d > CFG.INTERCEPT_R2 && !(CFG.INTERCEPT_DWELL && me.turn - t0 >= CFG.INTERCEPT_DWELL)) continue;
    if (w.enemies.some(s => (s.unit === CASTLE || s.unit === CHURCH) && king(s.x, s.y, e.x, e.y) <= 2)) continue;
    if (w.friends.some(f => f.unit >= CRUSADER && canHit(f, e.x, e.y))) continue;
    if (d < bd || (d === bd && e.y * n + e.x < best.y * n + best.x)) { bd = d; best = e; }
  }
  st.icpt = now;
  if (!best) return null;
  for (const unit of [CRUSADER, PROPHET]) {
    if (!w.canAfford(unit)) continue;
    let tile = null, td = 1e9;
    for (const [dx, dy] of ADJ) {
      const x = me.x + dx, y = me.y + dy;
      if (!w.free(x, y) || !canHit({ unit, x, y }, best.x, best.y)) continue;
      if (CFG.SAFE_BUILD && exposure(w, x, y, CFG.SAFE_BUILD >= 2) >= STATS[unit].hp) continue;
      const dd = d2(x, y, best.x, best.y) * 4 + (w.isDepot(x, y) ? 3 : 0);
      if (dd < td) { td = dd; tile = [dx, dy]; }
    }
    if (tile) { st.pending = null; st.built = unit; return w.build(unit, tile[0], tile[1]); }
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
