// Crusaders, prophets, preachers: shoot the best target; prophets keep melee out of their dead zone; engage enemies
// near home; march on ATTACK orders; otherwise hold a checkerboard lattice that grows from home toward the enemy.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, king, rng } from './util.js';
import { fuelStep } from './nav.js';
import { SIG, CT, dec, decFarRobot } from './comms.js';
import { isAttacker, pickTarget, preacherTarget, retreatStep } from './combat.js';

function init(B) {
  const w = B.w, me = w.me, st = B.st;
  st.home = null;
  for (const r of w.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && king(r.x, r.y, me.x, me.y) <= 1) {
    st.home = { x: r.x, y: r.y };
    if (r.unit === CASTLE) B.birthRound = r.turn;
    if (r.signal > 0) { const m = dec(r.signal); if (m.type === SIG.ROUND) B.birthRound = m.v; }
  }
  if (B.birthRound) B.round = B.birthRound;
  if (!st.home) st.home = { x: me.x, y: me.y };
  st.target = null;   // [x, y] enemy structure to attack
  st.tIdx = -1;       // its enemy castle index from the ATTACK message (-1: unknown)
  st.known = [];      // ATTACK_PERSIST: enemy castle index -> [x, y] heard so far
  st.dead = new Set();   // indices seen destroyed
  st.reports = [];    // indices still to report over castle talk
  st.waitUntil = 0;   // no orders after a kill: hold position until this round
  // Reseed with the birth round: units born on the same tile must not share one random stream.
  B.rnd = rng(((B.birthRound || 0) * 4096 + me.y * 64 + me.x) * 8 + me.unit); B.nav.rnd = B.rnd;
  st.guard = B.rnd() < CFG.HOME_GUARD_FRAC;   // stays home through general attacks (until the last rounds)
  if (CFG.RUSH) st.target = w.mirror(st.home.x, st.home.y);   // sparring mode: march at once
}

// ATTACK orders: far messages (comms.decFarRobot authenticates them by radius); targets must lie in the enemy half.
function listen(B) {
  const w = B.w, st = B.st, me = w.me, n = w.n;
  for (const r of w.robots) {
    if (r.id === me.id || (r.seen && r.team !== me.team)) continue;
    const m = decFarRobot(r);
    if (!m || m.type !== SIG.ATTACK || m.y < n / 2 || !w.passable(m.x, m.y) || (st.guard && B.round < 900)) continue;
    const i = CFG.ATTACK_PERSIST && m.extra >= 1 && m.extra <= 4 ? m.extra - 1 : -1;
    if (i >= 0) { st.known[i] = [m.x, m.y]; if (st.dead.has(i)) continue; }
    st.target = [m.x, m.y]; st.tIdx = i;
  }
  // Drop a target seen to be gone.
  if (st.target) {
    const [x, y] = st.target, id = w.occ(x, y);
    if (id === 0 || (id > 0 && !w.enemies.some(e => e.x === x && e.y === y && (e.unit === CASTLE || e.unit === CHURCH)))) {
      st.target = null;
      if (CFG.ATTACK_PERSIST) nextTarget(B);
    }
  }
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

function bandSources(B, tx, ty) {
  const S = STATS[B.w.me.unit], out = [], m = Math.floor(Math.sqrt(S.atkMax));
  for (let dy = -m; dy <= m; dy++) for (let dx = -m; dx <= m; dx++) {
    const r = dx * dx + dy * dy; if (r >= Math.max(1, S.atkMin) && r <= S.atkMax) out.push([tx + dx, ty + dy]);
  }
  return out;
}

function go(B, key, sources, cap) {
  const w = B.w, S = STATS[w.me.unit];
  const r = fuelStep(w.fuel, Math.min(S.speed, cap || S.speed), S.fuelPerMove, 60);
  const s = B.nav.step(key, sources, r);
  return s ? w.move(s[0], s[1]) : null;
}

// A lattice tile: (x + y) even, passable, not a depot, not adjacent to the home structure.
function latticeOk(B, x, y) {
  const w = B.w, h = B.st.home;
  return ((x + y) & 1) === 0 && w.passable(x, y) && !w.isDepot(x, y) && d2(x, y, h.x, h.y) >= CFG.LATTICE_MIN_R2;
}

// The free lattice tile nearest an anchor ahead of home (toward the enemy), within LATTICE_R king steps of home.
const LATTICE_R = 12;
function latticeTarget(B) {
  const w = B.w, me = w.me, h = B.st.home, n = w.n;
  const ay = h.y + (h.y < n / 2 ? 2 : 0);
  let best = null, bd = 1e9;
  for (let dy = -LATTICE_R; dy <= LATTICE_R; dy++) for (let dx = -LATTICE_R; dx <= LATTICE_R; dx++) {
    const x = h.x + dx, y = h.y + dy;
    if (x < 0 || y < 0 || x >= n || y >= n || !latticeOk(B, x, y)) continue;
    const occ = w.occ(x, y);
    if (occ > 0 && occ !== me.id) continue;
    const v = d2(x, y, h.x, ay) * 8 + d2(x, y, me.x, me.y);
    if (v < bd) { bd = v; best = [x, y]; }
  }
  return best;
}

export function militaryTurn(B) {
  const w = B.w, me = w.me, st = B.st, u = me.unit, S = STATS[u];
  if (me.turn === 1) init(B);
  listen(B);
  const enemies = w.enemies;
  const canShoot = w.fuel >= S.atkFuel + CFG.SHOOT_FLOOR;   // keep a little fuel so pilgrims can still mine

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
      const t = preacherTarget(me.x, me.y, w.robots, me.team, (x, y) => w.occ(x, y) >= 0);
      if (t) return w.attack(t.dx, t.dy);
    } else {
      const t = pickTarget(u, me.x, me.y, enemies, w.n);
      if (t) return w.attack(t.x - me.x, t.y - me.y);
    }
  }

  // Engage visible enemies near home (or anywhere when marching): melee closes in; prophets hold.
  const h = st.home, waiting = !st.target && B.round < st.waitUntil, marching = !!st.target || waiting;
  if (u !== PROPHET) {
    let e = null, ed = 1e9;
    for (const x of enemies) {
      const near = marching ? d2(x.x, x.y, me.x, me.y) <= 64 : d2(x.x, x.y, h.x, h.y) <= 196;
      if (!near) continue;
      const r = d2(me.x, me.y, x.x, x.y); if (r < ed) { ed = r; e = x; }
    }
    if (e) return go(B, 'e' + e.x + ',' + e.y, [[e.x + 1, e.y], [e.x - 1, e.y], [e.x, e.y + 1], [e.x, e.y - 1]]);
  }

  // Fuel per move is proportional to r2, so short steps cover distance cheapest: unhurried moves use r2 <= 2.
  if (waiting) return null;
  if (marching) return go(B, 'A' + st.target[0] + ',' + st.target[1], () => bandSources(B, st.target[0], st.target[1]), CFG.CRUISE_R2);

  // Hold the lattice.
  if (latticeOk(B, me.x, me.y) && king(me.x, me.y, h.x, h.y) <= LATTICE_R) return null;
  const t = latticeTarget(B);
  if (!t) return null;
  return go(B, 'l' + t[0] + ',' + t[1], [t], CFG.CRUISE_R2);
}
export { isAttacker, PROPHET, PREACHER, nextTarget };
