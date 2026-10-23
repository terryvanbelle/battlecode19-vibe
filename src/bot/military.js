// Crusaders, prophets, preachers: shoot the best target; prophets keep melee out of their dead zone; engage enemies
// near home; march on ATTACK orders; otherwise hold a checkerboard lattice that grows from home toward the enemy.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, king, rng } from './util.js';
import { fuelStep } from './nav.js';
import { SIG, CT, FAR, dec, encXY, decFarRobot } from './comms.js';
import { isAttacker, pickTarget, preacherTarget, retreatStep, THREAT_R2, PRIORITY, churchFirst } from './combat.js';
import { learnRound } from './chain.js';

function init(B) {
  const w = B.w, me = w.me, st = B.st;
  st.home = null;
  let church = false;
  for (const r of w.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && king(r.x, r.y, me.x, me.y) <= 1) {
    st.home = { x: r.x, y: r.y }; church = r.unit === CHURCH;
    if (r.unit === CASTLE) B.birthRound = r.turn - me.turn + 1;
    if (r.signal > 0 && me.turn === 1) {
      const m = dec(r.signal);
      if (m.type === SIG.ROUND) B.birthRound = m.v;
      else if (m.type === SIG.CHAIN && CFG.CHAIN_ROUND) st.chainT = [m.x, m.y];   // born in a church chain (chain.js)
      else if (m.type === SIG.GUARD && CFG.ESCORT) st.guardAt = { x: m.x, y: m.y };   // escort: a pioneer's site
    }
  }
  if (st.chainT) learnRound(B);
  if (B.birthRound) B.round = B.birthRound + me.turn - 1;
  if (st.guardAt) st.home = st.guardAt;   // CFG.ESCORT: hold the lattice around the pioneer's site
  if (!st.home) st.home = { x: me.x, y: me.y };
  st.target = st.chainT || null;   // [x, y] enemy structure to attack
  st.tIdx = -1;       // its enemy castle index from the ATTACK message (-1: unknown)
  st.known = [];      // ATTACK_PERSIST: enemy castle index -> [x, y] heard so far
  st.dead = new Set();   // indices seen destroyed
  st.reports = [];    // indices still to report over castle talk
  st.waitUntil = 0;   // no orders after a kill: hold position until this round
  // Reseed with the birth round: units born on the same tile must not share one random stream.
  B.rnd = rng(((B.birthRound || 0) * 4096 + me.y * 64 + me.x) * 8 + me.unit); B.nav.rnd = B.rnd;
  st.guard = B.rnd() < CFG.HOME_GUARD_FRAC;   // stays home through general attacks (until the last rounds)
  st.toCastle = CFG.CASTLE_POST && church && B.rnd() < CFG.CASTLE_POST;   // CFG.CASTLE_POST: guard a castle instead
  st.home0 = st.home; st.post = null;
  if (CFG.RUSH) st.target = w.mirror(st.home.x, st.home.y);   // sparring mode: march at once
  st.ready = true;
}

// ATTACK orders: far messages (comms.decFarRobot authenticates them by radius); targets must lie in the enemy half.
function listen(B) {
  const w = B.w, st = B.st, me = w.me, n = w.n;
  if (CFG.KILL_ZONE) hearZones(B);
  for (const r of w.robots) {
    if (r.id === me.id || (r.seen && r.team !== me.team)) continue;
    const m = decFarRobot(r);
    if (m && m.type === SIG.RECALL && CFG.RECALL && w.passable(m.x, m.y)) { st.recall = { x: m.x, y: m.y, until: me.turn + CFG.RECALL }; st.target = null; continue; }
    if (m && m.type === SIG.POST) { if (st.toCastle && w.passable(m.x, m.y)) hearPost(B, m.x, m.y); continue; }
    if (m && m.type === SIG.ENEMY) { if (CFG.SPOT && (CFG.SPOT_MASK >> me.unit & 1)) hearSpot(B, m.x, m.y); continue; }
    if (m && m.type === SIG.HUNT) { if (CFG.HUNT && me.unit !== PROPHET) hearHunt(B, m.x, m.y); continue; }
    if (CFG.RECALL && st.recall && me.turn <= st.recall.until) continue;   // recalled: attack orders wait
    if (!m || m.type !== SIG.ATTACK || m.y < n / 2 || !w.passable(m.x, m.y) || ((st.guard || !(CFG.MARCH_MASK >> me.unit & 1)) && B.round < CFG.ATTACK_LATE)) continue;
    const i = CFG.ATTACK_PERSIST && m.extra >= 1 && m.extra <= 4 ? m.extra - 1 : -1;
    if (i >= 0) { st.known[i] = [m.x, m.y]; if (st.dead.has(i)) continue; }
    st.target = [m.x, m.y]; st.tIdx = i;
  }
  // CFG.CASTLE_POST: a castle seen gone is forgotten; the next castle heard becomes home.
  if (st.post && w.occ(st.post.x, st.post.y) === 0) st.post = null;
  // Drop a target seen to be gone.
  if (st.target) {
    const [x, y] = st.target, id = w.occ(x, y);
    if (id === 0 || (id > 0 && !w.enemies.some(e => e.x === x && e.y === y && (e.unit === CASTLE || e.unit === CHURCH)))) {
      st.target = null;
      if (CFG.ATTACK_PERSIST) nextTarget(B);
    }
  }
  if (CFG.WAVE && (st.target || (st.guard && B.round < CFG.ATTACK_LATE))) w.talk(CT.MARCH + me.unit);   // not free for a wave
  if (st.reports.length) { w.talk(CT.DEAD + st.reports[0]); st.reports.push(st.reports.shift()); if (--st.reportTurns <= 0) st.reports = []; }
}

// After a kill: report it to our castles for a few turns, then march on the nearest other known enemy castle, or
// wait where we stand for new orders (castles radio the next target map-wide).
function nextTarget(B) {
  const w = B.w, st = B.st, me = w.me;
  if (st.tIdx >= 0 && !st.dead.has(st.tIdx)) { st.dead.add(st.tIdx); st.reports.push(st.tIdx); st.reportTurns = 3 * st.reports.length; }
  st.tIdx = -1;
  let bd = 1e9;
  st.known.forEach((p, i) => {
    if (!p || st.dead.has(i)) return;
    const d = d2(p[0], p[1], me.x, me.y);
    if (d < bd) { bd = d; st.target = p; st.tIdx = i; }
  });
  if (!st.target) st.waitUntil = B.round + CFG.ATTACK_WAIT;
}

// CFG.CASTLE_POST: the castle nearest the unit's birth church (ties: canonical order) becomes home; its lattice is held.
function hearPost(B, x, y) {
  const st = B.st, h = st.home0, n = B.w.n, d = d2(x, y, h.x, h.y);
  if (st.post && (st.post.x !== x || st.post.y !== y)) {
    const pd = d2(st.post.x, st.post.y, h.x, h.y);
    if (pd < d || (pd === d && st.post.y * n + st.post.x < y * n + x)) return;
  }
  if (!st.post || st.home.x !== x || st.home.y !== y) { st.home = { x, y }; st.lt = null; }
  st.post = { x, y };
}

// CFG.SPOT. The nearest spotted enemy heard this turn (prophets radio their targets for the CFG.SPOT_MASK types).
function hearSpot(B, x, y) {
  const st = B.st, me = B.w.me, d = d2(x, y, me.x, me.y);
  if (!st.spot || st.spot.t !== me.turn || d < st.spot.d) st.spot = { x, y, t: me.turn, d };
}
// CFG.HUNT: the nearest loitering enemy pilgrim a pilgrim of ours radioed this turn (pilgrim.js huntSpot).
function hearHunt(B, x, y) {
  const st = B.st, me = B.w.me, d = d2(x, y, me.x, me.y);
  if (!st.hunt || st.hunt.t !== me.turn || d < st.hunt.d) st.hunt = { x, y, t: me.turn, d };
}
function spot(B, t) {
  const w = B.w, st = B.st, me = w.me;
  if (t.unit === PILGRIM || w.sentR2 || me.turn - (st.spotAt || -99) < CFG.SPOT) return;
  if (w.fuel < STATS[PROPHET].atkFuel + CFG.PROPHET_FLOOR + 10) return;
  if (!w.friends.some(r => r.unit >= CRUSADER && (CFG.SPOT_MASK >> r.unit & 1))) return;
  st.spotAt = me.turn; w.signal(encXY(0, t.x, t.y), FAR.ENEMY);
}

function bandSources(B, tx, ty) {
  const S = STATS[B.w.me.unit], out = [], m = Math.floor(Math.sqrt(S.atkMax));
  for (let dy = -m; dy <= m; dy++) for (let dx = -m; dx <= m; dx++) {
    const r = dx * dx + dy * dy; if (r >= Math.max(1, S.atkMin) && r <= S.atkMax) out.push([tx + dx, ty + dy]);
  }
  return out;
}

function recallRing(x, y) {
  const out = [];
  for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (Math.max(Math.abs(dx), Math.abs(dy)) >= 2) out.push([x + dx, y + dy]);
  return out;
}

function go(B, key, sources, cap, avoid) {
  const w = B.w, S = STATS[w.me.unit];
  const r = fuelStep(w.fuel, Math.min(S.speed, cap || S.speed), S.fuelPerMove, cap ? CFG.CRUISE_FUEL_RESERVE : 60);
  // Unhurried (cruise) moves wait longer in a jam before sliding sideways or stepping back: each costs fuel.
  const s = B.nav.step(key, sources, r, avoid, cap ? [CFG.CRUISE_SLIDE_AFTER, CFG.CRUISE_ESCAPE_AFTER, !!CFG.CRUISE_RESET] : undefined,
    cap && CFG.DETOUR ? [CFG.DETOUR_AFTER, CFG.DETOUR, CFG.DETOUR_EVERY, CFG.DETOUR_MEMORY] : null);
  return s ? w.move(s[0], s[1]) : null;
}

// CFG.EDGE: tiles in reach of the enemy attackers in sight, while ours in sight (and this unit) do not outnumber them
// EDGE to 1 and this unit is not in reach already; undefined when nothing is to be avoided. The army gathers at the
// edge of a held line and steps in together instead of one by one.
function edgeAvoid(B) {
  const w = B.w, me = w.me, th = w.enemies.filter(e => THREAT_R2[e.unit] > 0);
  if (!th.length) return undefined;
  let f = 1;
  for (const r of w.friends) if (r.unit >= CRUSADER) f++;
  if (f >= CFG.EDGE * th.length) return undefined;
  const hot = (x, y) => th.some(e => d2(x, y, e.x, e.y) <= THREAT_R2[e.unit]);
  return hot(me.x, me.y) ? undefined : hot;
}

// A lattice tile: (x + y) even (CFG.LATTICE_SPARSE: x + 2y a multiple of 5), passable, not a depot, not adjacent to
// the home structure (CFG.KEEP_CLEAR: and not kept clear; CFG.KILL_ZONE: and not in a kill zone).
function latticeOk(B, x, y) {
  const w = B.w, h = B.st.home;
  return latticeTile(x, y) && w.passable(x, y) && !w.isDepot(x, y) && d2(x, y, h.x, h.y) >= CFG.LATTICE_MIN_R2 &&
    !(CFG.KEEP_CLEAR && keepClear(B, x, y)) && !(CFG.KILL_ZONE && inZone(B, x, y));
}

// The pattern alone. A preacher's 3x3 splash covers up to 5 tiles of the (x + y) even one (4 prophets of a lattice
// killed by one shot: replica 407, seed 1706, round 306, from a chain line's newborn preacher) and at most 2 of the
// sparse one, which holds a fifth of the tiles instead of half.
export function latticeTile(x, y) { return CFG.LATTICE_SPARSE ? (x + 2 * y) % 5 === 0 : ((x + y) & 1) === 0; }

// CFG.KILL_ZONE. A military unit of ours seen last turn that is gone now, from where it could not have walked out of
// sight (3 tiles: the fastest unit's move), died there: a kill zone, kept KILL_ZONE turns of this robot's clock.
// Structures and military units watch (struct.js passes zones on to newborns, SIG.ZONE).
export function watchDeaths(B) {
  const w = B.w, me = w.me, st = B.st, R = Math.sqrt(STATS[me.unit].vision) - 3, now = new Map();
  for (const r of w.friends) if (r.unit >= CRUSADER) now.set(r.id, r.y * 64 + r.x);
  if (st.seenMil && R > 0) for (const [id, p] of st.seenMil) {
    const x = p & 63, y = p >> 6;
    if (!now.has(id) && d2(x, y, me.x, me.y) <= R * R) addZone(B, x, y);
  }
  st.seenMil = now;
}
export function addZone(B, x, y) {
  const st = B.st, t = B.w.me.turn, z = st.zones || (st.zones = []);
  for (let i = z.length - 1; i >= 0; i--) if (t - z[i].t > CFG.KILL_ZONE || (z[i].x === x && z[i].y === y)) z.splice(i, 1);
  z.push({ x, y, t });
}
// Zones radioed by structures of ours in sight (SIG.ZONE, short range).
export function hearZones(B) {
  const w = B.w, me = w.me;
  for (const r of w.robots) if (r.seen && r.team === me.team && r.id !== me.id && r.signal > 0 && r.signal_radius <= 25) {
    const m = dec(r.signal); if (m.type === SIG.ZONE) addZone(B, m.x, m.y);
  }
}
// Tiles near a fresh zone, except those well inside its distance from home (the enemy is beyond it, unseen).
export function inZone(B, x, y) {
  const st = B.st, h = st.home, t = B.w.me.turn;
  if (!st.zones) return false;
  for (const z of st.zones) {
    if (t - z.t > CFG.KILL_ZONE || d2(x, y, z.x, z.y) > CFG.KZ_R2) continue;
    const r = Math.sqrt(d2(z.x, z.y, h.x, h.y)) - 2;
    if (r <= 0 || d2(x, y, h.x, h.y) >= r * r) return true;
  }
  return false;
}

// Tiles idle units keep clear (CFG.KEEP_CLEAR): depots, tiles next to our structures (pilgrims deliver and new units
// appear there) and chokepoints (tiles whose passable neighbours fall apart without them, like a 1-wide corridor).
const RING = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
function isChoke(w, x, y) {
  const p = RING.map(([dx, dy]) => w.passable(x + dx, y + dy)), seen = new Array(8).fill(false);
  let parts = 0;
  for (let i = 0; i < 8; i++) {
    if (!p[i] || seen[i]) continue;
    parts++; const q = [i]; seen[i] = true;
    while (q.length) {
      const j = q.pop();
      // King-adjacent ring cells: neighbours on the ring, and orthogonal cells two apart (N and E touch diagonally).
      for (const k of (j & 1) ? [j + 1, j + 7, j + 2, j + 6] : [j + 1, j + 7]) {
        const m = k % 8; if (p[m] && !seen[m]) { seen[m] = true; q.push(m); }
      }
    }
  }
  return parts > 1;
}
function keepClear(B, x, y) {
  const w = B.w, st = B.st;
  if (!st.choke) {
    const c = new Uint8Array(w.n * w.n);
    for (let yy = 0; yy < w.n; yy++) for (let xx = 0; xx < w.n; xx++) if (w.passable(xx, yy) && isChoke(w, xx, yy)) c[yy * w.n + xx] = 1;
    st.choke = c;
  }
  if (st.structsAt !== w.me.turn) {
    st.structsAt = w.me.turn; st.structs = [st.home];
    for (const r of w.friends) if (r.unit === CASTLE || r.unit === CHURCH) st.structs.push(r);
  }
  return w.isDepot(x, y) || st.choke[y * w.n + x] === 1 || st.structs.some(s => king(s.x, s.y, x, y) <= 1);
}

// Step off a kept-clear tile to a free one that is not, farthest from home (ties: first in RING order).
function stepClear(B) {
  const w = B.w, me = w.me, h = B.st.home;
  if (!keepClear(B, me.x, me.y) || w.fuel < STATS[me.unit].fuelPerMove * 2) return null;
  let best = null, bd = -1;
  for (const [dx, dy] of RING) {
    const x = me.x + dx, y = me.y + dy;
    if (!w.free(x, y) || keepClear(B, x, y)) continue;
    const d = d2(x, y, h.x, h.y); if (d > bd) { bd = d; best = [dx, dy]; }
  }
  return best ? w.move(best[0], best[1]) : null;
}

// The centre of the lattice a unit holds: its home, or with CFG.CREEP_ROUND, from that round, a point that moves one
// tile toward the enemy (canonical +y) every CREEP_EVERY rounds, so the army advances as a formation at a few fuel a
// round instead of marching (home guards stay).
function latticeCentre(B) {
  const h = B.st.home;
  if (!CFG.CREEP_ROUND || !(B.round >= CFG.CREEP_ROUND) || B.st.guard) return h;
  return { x: h.x, y: Math.min(B.w.n - 1, h.y + Math.floor((B.round - CFG.CREEP_ROUND) / CFG.CREEP_EVERY)) };
}

// King steps from the lattice centre within which a unit holds the lattice (CFG.CASTLE_POST: a castle post is tighter).
function latticeR(B) { return B.st.post ? CFG.CASTLE_POST_R : CFG.LATTICE_R; }

// The free lattice tile nearest an anchor ahead of the lattice centre (toward the enemy), within CFG.LATTICE_R king
// steps of the centre (home, unless CFG.CREEP_ROUND).
// CFG.LATTICE_STICKY >= 2: a tile out of sight that this unit saw taken in the last LATTICE_MEMORY turns is not free.
function latticeTarget(B) {
  const w = B.w, me = w.me, h = latticeCentre(B), n = w.n, LATTICE_R = latticeR(B);
  const ay = h.y + (B.st.home.y < n / 2 ? 2 : 0);
  const mem = CFG.LATTICE_STICKY >= 2 ? (B.st.ltSeen || (B.st.ltSeen = new Int16Array(n * n))) : null;
  let best = null, bd = 1e9;
  for (let dy = -LATTICE_R; dy <= LATTICE_R; dy++) for (let dx = -LATTICE_R; dx <= LATTICE_R; dx++) {
    const x = h.x + dx, y = h.y + dy;
    if (x < 0 || y < 0 || x >= n || y >= n || !latticeOk(B, x, y)) continue;
    const occ = w.occ(x, y), i = y * n + x;
    if (mem) { if (occ > 0 && occ !== me.id) mem[i] = me.turn; else if (occ === 0) mem[i] = 0; }
    if (occ > 0 && occ !== me.id) continue;
    if (mem && occ < 0 && mem[i] && me.turn - mem[i] <= CFG.LATTICE_MEMORY) continue;
    const v = d2(x, y, h.x, ay) * 8 + d2(x, y, me.x, me.y);
    if (v < bd) { bd = v; best = [x, y]; }
  }
  return best;
}

// The lattice tile an idle unit walks to. Tiles out of sight count as free, so choosing afresh every turn can flip
// between tiles out of sight from where the other was chosen. CFG.LATTICE_STICKY keeps the previous choice while it
// is still a lattice tile in range and not seen taken. That does not cover two tiles that are both taken, each seen
// only from the other's side (seed 2202, preacher, vision r2 16: from (15,4) it sees (18,2) taken and picks (11,3),
// from (14,5) the reverse, 36-74 turns in a row): LATTICE_STICKY 2 also remembers tiles seen taken (latticeTarget).
function holdTarget(B) {
  const w = B.w, st = B.st, h = latticeCentre(B), me = w.me;
  if (CFG.LATTICE_STICKY && st.lt) {
    const [x, y] = st.lt, occ = w.occ(x, y);
    if (latticeOk(B, x, y) && king(x, y, h.x, h.y) <= latticeR(B) && !(occ > 0 && occ !== me.id)) return st.lt;
  }
  return (st.lt = latticeTarget(B));
}

export function militaryTurn(B) {
  const w = B.w, me = w.me, st = B.st, u = me.unit, S = STATS[u];
  if (!st.ready) init(B);   // until it completes: a turn killed mid-init (200 ms) leaves it half done
  if (CFG.KILL_ZONE) watchDeaths(B);
  listen(B);
  const enemies = w.enemies;
  const canShoot = w.fuel >= S.atkFuel + (u === PROPHET ? CFG.PROPHET_FLOOR : CFG.SHOOT_FLOOR);   // pilgrims must still mine
  const cf = churchFirst(st.home, CFG.CHURCH_FIRST_R2);

  // Prophets: step away from melee attackers that are (or will be) inside the dead zone.
  if (u === PROPHET) {
    const melee = enemies.filter(e => (e.unit === CRUSADER || e.unit === PREACHER) && d2(me.x, me.y, e.x, e.y) < 36);
    if (melee.length && w.fuel >= 8) {
      const inDead = melee.some(e => d2(me.x, me.y, e.x, e.y) < S.atkMin);
      const t = canShoot ? pickTarget(u, me.x, me.y, enemies, w.n) : null;
      if (inDead || !t) {
        const s = retreatStep(me.x, me.y, melee, B.offs, 4, (x, y) => w.free(x, y));
        if (s) return w.move(s[0], s[1]);
      }
    }
  }

  if (canShoot) {
    if (u === PREACHER) {
      const t = preacherTarget(me.x, me.y, w.robots, me.team, (x, y) => w.occ(x, y) >= 0, CFG.PREACHER_SELF, CFG.PREACHER_MIL,
        cf && (r => cf(r) ? CFG.CHURCH_FIRST_V : undefined));
      if (t) return w.attack(t.dx, t.dy);
    } else {
      const t = pickTarget(u, me.x, me.y, enemies, w.n, CFG.FOCUS ? w.friends : null, cf && (e => cf(e) ? 7 : PRIORITY[e.unit]));
      if (t) { if (CFG.SPOT && u === PROPHET) spot(B, t); return w.attack(t.x - me.x, t.y - me.y); }
    }
  }

  // Engage visible enemies near home (or anywhere when marching): melee closes in; prophets hold.
  const h = st.home, c = latticeCentre(B), waiting = !st.target && B.round < st.waitUntil;
  const rc = CFG.RECALL && st.recall && me.turn <= st.recall.until ? st.recall : null, marching = !!st.target || waiting || !!rc;
  if (u !== PROPHET) {
    let e = null, ed = 1e9;
    for (const x of enemies) {
      const near = marching ? d2(x.x, x.y, me.x, me.y) <= 64 : d2(x.x, x.y, c.x, c.y) <= 196;
      if (!near) continue;
      const r = d2(me.x, me.y, x.x, x.y) - (cf && cf(x) ? 1e6 : 0); if (r < ed) { ed = r; e = x; }
    }
    const sp = CFG.SPOT && st.spot;
    if (!e && sp && me.turn - sp.t <= 1 && d2(sp.x, sp.y, marching ? me.x : c.x, marching ? me.y : c.y) <= 196) e = sp;
    const hu = CFG.HUNT && st.hunt;
    if (!e && hu && !marching && me.turn - hu.t <= CFG.HUNT_EVERY && d2(hu.x, hu.y, me.x, me.y) <= CFG.HUNT_R2) e = hu;
    if (e) return go(B, 'e' + e.x + ',' + e.y, [[e.x + 1, e.y], [e.x - 1, e.y], [e.x, e.y + 1], [e.x, e.y - 1]]);
  } else if (CFG.SPOT && (CFG.SPOT_MASK >> PROPHET & 1)) {
    // A prophet that heard a spot near its post (or itself, marching) walks into the band it can fire from, then holds.
    const sp = st.spot;
    if (sp && me.turn - sp.t <= 1 && d2(sp.x, sp.y, marching ? me.x : c.x, marching ? me.y : c.y) <= 196)
      return go(B, 'S' + sp.x + ',' + sp.y, () => bandSources(B, sp.x, sp.y));
  }

  // Cargo (reclaimed from kills, or relayed by a pilgrim, CFG.RELAY) goes into an adjacent structure of ours.
  if (CFG.RELAY && (me.karbonite || me.fuel)) {
    for (const r of w.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && king(r.x, r.y, me.x, me.y) === 1)
      return w.give(r.x - me.x, r.y - me.y, me.karbonite, me.fuel);
  }

  // CFG.RECALL: hurry to 2-3 king steps from the castle that called (off its build tiles) and hold there.
  if (rc) {
    const k = king(me.x, me.y, rc.x, rc.y);
    if (k === 2 || k === 3) return null;
    return go(B, 'R' + rc.x + ',' + rc.y, () => recallRing(rc.x, rc.y));
  }
  // Fuel per move is proportional to r2, so short steps cover distance cheapest: unhurried moves use r2 <= 2.
  if (waiting) return null;
  // Endgame fuel: units away from home stand still so the fuel goes into preachers (newborns still clear the exits).
  if (CFG.ENDGAME_FUEL && B.round >= CFG.ENDGAME_FUEL && king(me.x, me.y, h.x, h.y) > 3) return null;
  if (marching) return go(B, 'A' + st.target[0] + ',' + st.target[1], () => bandSources(B, st.target[0], st.target[1]), CFG.CRUISE_R2,
    CFG.EDGE ? edgeAvoid(B) : undefined);

  // Hold the lattice.
  if (latticeOk(B, me.x, me.y) && king(me.x, me.y, c.x, c.y) <= latticeR(B)) return null;
  const t = holdTarget(B);
  if (!t) return CFG.KEEP_CLEAR ? stepClear(B) : null;
  const a = go(B, 'l' + t[0] + ',' + t[1], [t], CFG.CRUISE_R2);
  return a || (CFG.KEEP_CLEAR ? stepClear(B) : null);
}
export { isAttacker, PROPHET, PREACHER, nextTarget, isChoke, holdTarget, latticeOk, edgeAvoid, spot, hearPost };
