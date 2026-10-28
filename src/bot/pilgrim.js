// Pilgrim: mines its assigned depot and deposits at the nearest friendly structure; a pioneer first builds a church at
// its cluster's site. Flees attackers that could hit it next turn.
import { CFG, defReserveK } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, KARB_CAP, FUEL_CAP } from './specs.js';
import { d2, king, ADJ, rng } from './util.js';
import { SIG, FAR, dec, decFarRobot, encNum, encXY, CT, CLAIM_R2 } from './comms.js';
import { econ, bfs } from './mapinfo.js';
import { fuelStep } from './nav.js';
import { isAttacker, retreatStep, THREAT_R2 } from './combat.js';
import { frontSite } from './struct.js';
import { chainStart, learnRound, pilgrimChain } from './chain.js';

function init(B) {
  econ(B);
  const w = B.w, me = w.me, st = B.st;
  st.structs = [];  // known friendly castles/churches {x, y}
  for (const r of w.friends) {
    if (king(r.x, r.y, me.x, me.y) > 1 || (r.unit !== CASTLE && r.unit !== CHURCH)) continue;
    if (r.unit === CASTLE) B.birthRound = r.turn - me.turn + 1; // castles act every round from round 1 and have acted this round
    if (r.signal > 0 && me.turn === 1) {   // the builder's radio is fresh only on our first turn
      const m = dec(r.signal);
      if (m.type === SIG.MINE) st.target = depotAt(B, m.x, m.y);
      else if (m.type === SIG.CHURCH) {
        st.site = [m.x, m.y]; st.cluster = B.clusters.findIndex(c => c.site[0] === m.x && c.site[1] === m.y);
        if (CFG.CLAIM_FUND && r.signal_radius === CLAIM_R2) st.claimed = true;   // the claim's pioneer (castle.js claim)
      }
      else if (m.type === SIG.ROUND) B.birthRound = m.v;
      else if (m.type === SIG.FRONT) { B.birthRound = m.v; st.site = frontSite(w, r.x, r.y); st.cluster = -1; }
      else if (m.type === SIG.CHAIN && CFG.CHAIN_ROUND) { chainStart(B, [m.x, m.y]); st.chainer = r.unit === CASTLE; }
    }
  }
  if (st.chain) learnRound(B);
  if (CFG.HOP_GAIN && me.turn === 1 && !st.target && !st.chain) hopHeard(B);
  if (B.birthRound) B.round = B.birthRound + me.turn - 1;
  B.rnd = rng(((B.birthRound || 0) * 4096 + me.y * 64 + me.x) * 8 + me.unit); B.nav.rnd = B.rnd;
  if (!st.target && !st.site) st.target = freeDepotNear(B, me.x, me.y, null);
  st.ready = true;
}

// CFG.HOP_GAIN: born beside a church that a castle's SIG.HOP (target cluster << 6 | church cluster) names, with no depot
// of its own: the pioneer that castle asked the church for (castle.js hopPioneer). It takes the target's site and tells
// the castles its id (CT.HOP + target) on this first turn.
function hopHeard(B) {
  const w = B.w, me = w.me, st = B.st;
  for (const r of w.robots) {
    if (!(r.signal > 0) || (r.signal >> 12) !== SIG.HOP) continue;
    const t = (r.signal >> 6) & 63, c = B.clusters[r.signal & 63], tc = B.clusters[t];
    if (!c || !tc || t >= 63 || (st.site && st.cluster !== t)) continue;
    const [cx, cy] = c.site;
    if (king(cx, cy, me.x, me.y) > 1 || !w.friends.some(f => f.unit === CHURCH && f.x === cx && f.y === cy)) continue;
    st.site = [tc.site[0], tc.site[1]]; st.cluster = t;
    w.talk(CT.HOP + t);
    return;
  }
}

function depotAt(B, x, y) { for (const d of B.deps) if (d.x === x && d.y === y) return d; return null; }

// Nearest depot (king distance) that no robot is seen on, optionally restricted to a cluster; karbonite first on ties.
// skip(d): true for depots to leave out (CFG.PILGRIM_HOT). Depots given up by CFG.PILGRIM_STALL are always left out.
function freeDepotNear(B, x, y, cluster, kind, maxKing, skip) {
  const w = B.w, list = cluster ? cluster.depots : B.deps, gave = CFG.PILGRIM_STALL && B.st.stallGave; let best = null, bd = 1e9;
  for (const d of list) {
    if (kind !== undefined && d.k !== kind) continue;
    if (skip && skip(d)) continue;
    if (gave && gave.has(d.i) && w.me.turn - gave.get(d.i) <= CFG.PILGRIM_HOT_MEM) continue;
    if (maxKing && king(x, y, d.x, d.y) > maxKing) continue;
    const occ = w.occ(d.x, d.y);
    if (occ > 0 && occ !== w.me.id) continue;
    const k = king(x, y, d.x, d.y) * 2 + (d.k ? 0 : 1);
    if (k < bd) { bd = k; best = d; }
  }
  return best;
}

function adjSources(x, y) { return ADJ.map(([dx, dy]) => [x + dx, y + dy]); }

// fast: full r2 4 steps whatever the bank (CFG.PIONEER_FAST); otherwise only above PILGRIM_FAST_FUEL.
function go(B, key, sources, fast, costed = null) {
  const w = B.w;
  const r = fuelStep(w.fuel, 4, 1, w.fuel > 300 ? 0 : 40);
  const s = B.nav.step(key, sources, fast || w.fuel > CFG.PILGRIM_FAST_FUEL ? r : Math.min(r, 2), stepAvoid(w), undefined, null, costed);
  return s ? w.move(s[0], s[1]) : null;
}

// CFG.PIONEER_DETOUR: a pioneer remembers each enemy attacker it sees for this many turns (forgotten sooner once its
// tile is in sight without it) and, while it remembers any, walks to its site over a field in which every tile in a
// remembered attacker's THREAT_R2 costs DETOUR_PEN extra moves: it takes the way round a choke the enemy holds instead
// of waiting at its edge (replica 416-1, seed 2591: bot1v43's prophet held the 2-wide centre corridor at (16,14) from
// round 29 to 55, our pioneer stood off its range at (15,22) all that time; no church, 3 pilgrims, castle lost r165).
// Returns the nav's costed option, or null while it remembers none.
export function detourCost(B) {
  const w = B.w, me = w.me, st = B.st, n = w.n;
  const mem = st.tmem || (st.tmem = new Map());
  for (const e of w.enemies) if (isAttacker(e.unit)) mem.set(e.id, { x: e.x, y: e.y, u: e.unit, t: me.turn });
  for (const [id, m] of mem) {
    if (me.turn - m.t >= CFG.PIONEER_DETOUR || (m.t !== me.turn && d2(me.x, me.y, m.x, m.y) <= STATS[PILGRIM].vision)) mem.delete(id);
  }
  if (!mem.size) return null;
  const list = [...mem.values()].sort((a, b) => (a.y * n + a.x) - (b.y * n + b.x) || a.u - b.u);
  const sig = list.map(m => `${m.x},${m.y},${m.u}`).join(';');
  if (st.tsig !== sig) {
    const zone = new Uint8Array(w.N);
    for (const m of list) {
      const R2 = THREAT_R2[m.u], R = Math.floor(Math.sqrt(R2));
      for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
        const x = m.x + dx, y = m.y + dy;
        if (x >= 0 && y >= 0 && x < n && y < n && dx * dx + dy * dy <= R2) zone[y * n + x] = 1;
      }
    }
    st.tsig = sig; st.tzone = zone;
  }
  const zone = st.tzone, pen = 1 + CFG.DETOUR_PEN;
  return { sig, cost: i => (zone[i] ? pen : 1) };
}

// CFG.PILGRIM_SAFE_STEP: never step into the threat range of a visible enemy attacker. Fleeing starts only inside
// that range, and a robot that steps in itself is shot before its next turn (replica scrim 199, seed 1915: a pioneer
// moved from r2 65 to 61 of a prophet at round 12 and died at 13).
export function stepAvoid(w) {
  if (!CFG.PILGRIM_SAFE_STEP) return null;
  const threats = w.enemies.filter(e => isAttacker(e.unit));
  return threats.length ? (x, y) => threats.some(e => d2(x, y, e.x, e.y) <= THREAT_R2[e.unit]) : null;
}

// CFG.HUNT: an enemy pilgrim that has stood HUNT turns on one tile in our half (canonical y < n/2, plus CFG.HUNT_SLACK
// rows past it: v11 on 1706 blue, botfinalsafe's chainer stood 66 rounds 3 rows past the midline), off any depot and
// more than 2 king steps from every enemy structure in sight (not one waiting to deposit), is radioed to our melee units (FAR.HUNT, 20 tiles, 21 fuel) every HUNT_EVERY turns while in sight. Replica scrim 200,
// seed 2924: bot1v43's chain builders stood 29-253 turns 9-14 king steps from our castles, seen only by our pilgrims.
export function huntSpot(B) {
  const w = B.w, me = w.me, st = B.st, n = w.n, now = new Map();
  let best = null, bd = 1e9;
  for (const e of w.enemies) {
    if (e.unit !== PILGRIM) continue;
    const p = st.loit && st.loit.get(e.id), t0 = p && p.x === e.x && p.y === e.y ? p.t : me.turn;
    now.set(e.id, { x: e.x, y: e.y, t: t0 });
    if (me.turn - t0 < CFG.HUNT || e.y >= n / 2 + CFG.HUNT_SLACK || w.isDepot(e.x, e.y)) continue;
    if (w.enemies.some(s => (s.unit === CASTLE || s.unit === CHURCH) && king(s.x, s.y, e.x, e.y) <= 2)) continue;
    const d = d2(e.x, e.y, me.x, me.y);
    if (d < bd || (d === bd && e.y * n + e.x < best.y * n + best.x)) { bd = d; best = e; }
  }
  st.loit = now;
  if (!best || w.sentR2 || me.turn - (st.huntAt || -99) < CFG.HUNT_EVERY || w.fuel < CFG.HUNT_FUEL) return;
  st.huntAt = me.turn;
  w.signal(encXY(0, best.x, best.y), FAR.HUNT);
}

// CFG.STRIKE_FAR: the nearest enemy church in sight that no pilgrim of ours radioed in this one's hearing is radioed
// once (FAR.STRIKE, 30 tiles, 31 fuel) while the bank holds STRIKE_FUEL; castles choose whether to strike it
// (castle.js hearStrike).
export function strikeSpot(B) {
  const w = B.w, me = w.me, st = B.st, n = w.n, done = st.struck || (st.struck = new Set());
  for (const r of w.robots) {
    if (r.id === me.id || (r.seen && r.team !== me.team)) continue;
    const m = decFarRobot(r);
    if (m && m.type === SIG.STRIKE) done.add(m.y * n + m.x);
  }
  if (w.sentR2 || w.fuel < CFG.STRIKE_FUEL) return;
  let best = null, bd = 1e9;
  for (const e of w.enemies) {
    if (e.unit !== CHURCH || done.has(e.y * n + e.x)) continue;
    const d = d2(e.x, e.y, me.x, me.y);
    if (d < bd || (d === bd && e.y * n + e.x < best.y * n + best.x)) { bd = d; best = e; }
  }
  if (!best) return;
  done.add(best.y * n + best.x);
  w.signal(encXY(0, best.x, best.y), FAR.STRIKE);
}

export function pilgrimTurn(B) {
  const a = pilgrimAct(B);
  // CFG.PIONEER_CALL: a pioneer that sees a mobile enemy attacker by its site calls its castle's escort (CT.BLOCKED).
  const s = B.st.site;
  if (CFG.PIONEER_CALL && s && B.w.enemies.some(e => isAttacker(e.unit) && e.unit !== CASTLE && d2(e.x, e.y, s[0], s[1]) <= CFG.PIONEER_CALL))
    B.w.talk(CT.BLOCKED);
  if (CFG.HUNT) huntSpot(B);
  if (CFG.STRIKE_FAR) strikeSpot(B);
  return a;
}

function pilgrimAct(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!st.ready) init(B);   // until it completes (see militaryTurn)
  // Learn structures in sight; forget ones whose tile we see empty.
  for (const r of w.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && !st.structs.some(s => s.x === r.x && s.y === r.y)) { st.structs.push({ x: r.x, y: r.y }); st.depKey = null; }
  st.structs = st.structs.filter(s => { if (w.occ(s.x, s.y) === 0) { st.depKey = null; return false; } return true; });

  siteTaken(B);
  siteTimeout(B);
  // CFG.CLAIM_FUND: the claim's pioneer tells castles it is out until it builds (CT.CHURCH overwrites) or gives up (2: only
  // once it stands beside its site).
  if (CFG.CLAIM_FUND && st.claimed) {
    if (!st.site) st.claimed = false;
    else if (CFG.CLAIM_FUND < 2 || king(me.x, me.y, st.site[0], st.site[1]) <= 1) w.talk(CT.CLAIM);
  }

  // CFG.CHAIN_ROUND: a chainer walks, waits and builds the first church; a link pilgrim builds the next one.
  if (st.chain) { const a = pilgrimChain(B, go); if (a !== undefined) return a; }

  // Flee attackers that can reach us next turn.
  const threats = w.enemies.filter(e => isAttacker(e.unit) && d2(me.x, me.y, e.x, e.y) <= THREAT_R2[e.unit]);
  if (threats.length && w.fuel >= 4) {
    const s = retreatStep(me.x, me.y, threats, B.offs, 4, (x, y) => w.free(x, y));
    if (s) return w.move(s[0], s[1]);
  }

  // Pioneer: build the church at the site.
  if (st.site) {
    const [sx, sy] = st.site;
    if (king(me.x, me.y, sx, sy) <= 1 && !(me.x === sx && me.y === sy)) {
      const occ = w.occ(sx, sy);
      const lean = CFG.PIONEER_LEAN && st.siteIdle >= CFG.PIONEER_LEAN;   // waited long enough: the reserve goes too
      if (occ === 0 && w.karbonite >= STATS[CHURCH].costK + (lean ? 0 : defReserveK(B)) && w.fuel >= STATS[CHURCH].costF + 2) {
        if (B.round) w.signal(encNum(SIG.ROUND, B.round), 2);
        if (st.cluster >= 0) w.talk(CT.CHURCH + st.cluster);
        const act = w.build(CHURCH, sx - me.x, sy - me.y);
        st.structs.push({ x: sx, y: sy }); st.depKey = null;
        st.target = freeDepotNear(B, sx, sy, B.clusters[st.cluster] || null);
        st.site = null;
        return act;
      }
      if (occ > 0) { // something stands on the site: wait a little, then settle for mining here
        st.siteWait = (st.siteWait || 0) + 1;
        if (st.siteWait > 5) { st.target = freeDepotNear(B, sx, sy, B.clusters[st.cluster] || null); st.site = null; }
      }
      // Wait for resources; mine meanwhile if standing on a depot.
      if (st.site) {
        if (CFG.PIONEER_HOLD && occ === 0) w.talk(CT.WAIT);
        if (occ === 0) st.siteIdle = (st.siteIdle || 0) + 1;
        const i = me.y * w.n + me.x;
        if ((w.karb[i] && me.karbonite < KARB_CAP) || (w.fuelD[i] && me.fuel < FUEL_CAP)) return w.fuel >= 1 ? w.mine() : null;
        return null;
      }
    } else if (!((CFG.PIONEER_GIVEUP || CFG.PIONEER_STALL_ANY) && siteStalled(B))) {
      return go(B, 'site', adjSources(sx, sy), CFG.PIONEER_FAST, CFG.PIONEER_DETOUR ? detourCost(B) : null);
    }
  }

  if (CFG.PILGRIM_ORPHAN && !st.structs.length && !st.site) { const a = orphanStep(B); if (a !== undefined) return a; }
  else if (st.orphan) { st.orphan = false; st.target = null; }   // home found: mine near it

  // Deposit when full.
  if (me.karbonite >= KARB_CAP || me.fuel >= FUEL_CAP) {
    for (const s of st.structs) if (king(me.x, me.y, s.x, s.y) === 1) return w.give(s.x - me.x, s.y - me.y, me.karbonite, me.fuel);
    if (CFG.RELAY) { const r = relayTo(B); if (r) return w.give(r.x - me.x, r.y - me.y, me.karbonite, me.fuel); }
    if (!st.structs.length) return null;
    if (!st.depKey) st.depKey = 'dep:' + st.structs.map(s => s.x + ',' + s.y).join(';');
    const src = []; for (const s of st.structs) src.push(...adjSources(s.x, s.y));
    return go(B, st.depKey, src);
  }

  // Mine. Out of fuel nothing moves, mines or shoots: karbonite miners switch to a nearby free fuel depot while
  // fuel is short and karbonite piles up (and back when the shortage reverses).
  if (st.target && me.karbonite === 0 && me.fuel === 0) {
    const short = st.target.k ? (w.fuel < CFG.SWITCH_FUEL_LOW && w.karbonite >= CFG.SWITCH_KARB_HIGH)
      : (w.karbonite < CFG.SWITCH_KARB_LOW && w.fuel >= CFG.SWITCH_FUEL_HIGH);
    if (short) { const alt = freeDepotNear(B, me.x, me.y, null, !st.target.k, CFG.SWITCH_KING); if (alt) st.target = alt; }
  }
  if (!st.target) st.target = freeDepotNear(B, me.x, me.y, null);
  if (CFG.PILGRIM_HOT && st.target) hotRetarget(B);
  if (CFG.PILGRIM_HERE && st.target) hereRetarget(B);
  if (CFG.PILGRIM_STALL && st.target) stallRetarget(B);
  const t = st.target; if (!t) return null;
  if (me.x === t.x && me.y === t.y) return w.fuel >= 1 && minesNow(w, t) ? w.mine() : null;
  const occ = w.occ(t.x, t.y);
  if (occ > 0) { // taken: choose the nearest free depot
    const alt = freeDepotNear(B, t.x, t.y, null);
    if (alt && alt !== t) st.target = alt;
  }
  return go(B, 'd' + st.target.i, [[st.target.x, st.target.y]]);
}

// CFG.PIONEER_GIVEUP: count the turns a pioneer spends no nearer its site than its best while an enemy attacker is in
// sight; at PIONEER_GIVEUP it reports the cluster taken, drops the site and takes the nearest free depot (true: the
// caller falls through to mining). CFG.PIONEER_STALL_ANY: the same at that many turns no nearer, with or without enemies.
// A pioneer that sees an enemy church or castle within EXPAND_SEEN king steps of its site reports the cluster taken
// (CT.TAKEN; the castle rests it 200 rounds) and mines near home instead: CFG.EXPAND_ROUND, from that round;
// CFG.TAKEN_SEEN, always (replica 1421, v10 red vs uvafan on 1712: pioneers sent at r34-35 to two sites uvafan churched
// at r22 lived to r222 without arriving, holding two of the castle's three slots; the castle re-sent to the same sites
// at r115-116, and its two safe clusters, m17 and m19, never got a pioneer). True when it gave the site up.
export function siteTaken(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!st.site || !((CFG.EXPAND_ROUND && B.round >= CFG.EXPAND_ROUND) || CFG.TAKEN_SEEN)) return false;
  if (!w.enemies.some(e => (e.unit === CASTLE || e.unit === CHURCH) && king(e.x, e.y, st.site[0], st.site[1]) <= CFG.EXPAND_SEEN)) return false;
  if (st.cluster >= 0 && st.cluster < 40) w.talk(CT.TAKEN + st.cluster);
  const h = st.structs[0] || me;
  st.site = null; st.target = freeDepotNear(B, h.x, h.y, null);
  return true;
}

// CFG.PIONEER_TIMEOUT_HOME: a castle's pioneer (a planned cluster's site) that many turns old and still more than one
// king step from its site gives it up and mines on ground we hold (homeDepot). Its castle stopped counting it at 80
// turns (castle.js); v11's panel games left such pioneers out, never arriving, 242 times, each followed by another to
// the same site. True when it gave the site up.
export function siteTimeout(B) {
  const w = B.w, me = w.me, st = B.st;
  if (!CFG.PIONEER_TIMEOUT_HOME || !st.site || st.cluster < 0 || me.turn < CFG.PIONEER_TIMEOUT_HOME) return false;
  if (king(me.x, me.y, st.site[0], st.site[1]) <= 1) return false;   // beside it, waiting for the church's price
  st.site = null; st.target = homeDepot(B);
  return true;
}

export function siteStalled(B) {
  const w = B.w, me = w.me, st = B.st, k = king(me.x, me.y, st.site[0], st.site[1]);
  if (st.siteBest === undefined || k < st.siteBest) { st.siteBest = k; st.siteStall = 0; st.siteIdle = 0; return false; }
  if (!(CFG.PIONEER_STALL_ANY && ++st.siteIdle >= CFG.PIONEER_STALL_ANY)) {
    if (!CFG.PIONEER_GIVEUP || !w.enemies.some(e => isAttacker(e.unit))) return false;
    if (++st.siteStall < CFG.PIONEER_GIVEUP) return false;
  }
  if (st.cluster >= 0 && st.cluster < 40) w.talk(CT.TAKEN + st.cluster);
  st.site = null; st.target = CFG.PIONEER_HOME ? homeDepot(B) : freeDepotNear(B, me.x, me.y, null);
  return true;
}

// The free depot (none seen on it, not given up by CFG.PILGRIM_STALL) on ground we hold: fewest of 4 x king steps to
// the nearest structure we know plus king steps from us; karbonite first on ties. Seed 418 (h78 driver game): with
// the home cluster's depots all taken, the depot nearest the nearest structure lay under the enemy's army.
function homeDepot(B) {
  const w = B.w, me = w.me, st = B.st, gave = CFG.PILGRIM_STALL && st.stallGave; let best = null, bv = 1e9;
  for (const d of B.deps) {
    const occ = w.occ(d.x, d.y);
    if (occ > 0 && occ !== me.id) continue;
    if (gave && gave.has(d.i) && me.turn - gave.get(d.i) <= CFG.PILGRIM_HOT_MEM) continue;
    let h = st.structs.length ? 1e9 : 0;
    for (const s of st.structs) h = Math.min(h, king(s.x, s.y, d.x, d.y));
    const v = (4 * h + king(me.x, me.y, d.x, d.y)) * 2 + (d.k ? 0 : 1);
    if (v < bv) { bv = v; best = d; }
  }
  return best;
}

// CFG.PILGRIM_STALL: a pilgrim off its target depot that has gone PILGRIM_STALL turns (flight included) no nearer it
// (king steps) than its best since taking it gives it up for PILGRIM_HOT_MEM turns, for homeDepot. h68 on seed 418:
// #1936 hovered 11 king steps short of a depot under the enemy's guards for 140 turns, then the fuel-to-karbonite
// switch sent it back to the same ground; it never mined.
export function stallRetarget(B) {
  const w = B.w, me = w.me, st = B.st, t = st.target;
  if (me.x === t.x && me.y === t.y) { st.stallFor = null; return; }
  const k = king(me.x, me.y, t.x, t.y);
  if (st.stallFor !== t || k < st.stallBest) { st.stallFor = t; st.stallBest = k; st.stallT = me.turn; return; }
  if (me.turn - st.stallT < CFG.PILGRIM_STALL) return;
  (st.stallGave || (st.stallGave = new Map())).set(t.i, me.turn); st.stallFor = null;
  const alt = homeDepot(B);
  if (alt) st.target = alt;
}

// CFG.PILGRIM_HOT: a pilgrim stuck PILGRIM_HOT turns in a row gives its target depot up for PILGRIM_HOT_MEM turns,
// for the nearest free depot neither threatened now nor given up. Stuck: off the target, and the target lies in a
// visible enemy attacker's threat range, or an enemy attacker is in sight and we are no nearer the target (king
// steps) than our best since we took it. PILGRIM_SAFE_STEP keeps pilgrims off threatened tiles, so before this they
// waited at the edge of the range for good (h50's gate to round 450: 17 streaks of 50-435 turns on 7 of 20 maps,
// each with an enemy attacker in sight at r2 53-100; seed 1250: h35's church at (11,31) fell by round 60 and four
// pilgrims of its cluster stood by its depots under two enemy prophets; that side mined 37% of the other's).
export function hotRetarget(B) {
  const w = B.w, me = w.me, st = B.st, t = st.target;
  if (me.x === t.x && me.y === t.y) { st.hotN = 0; return; }
  const threats = w.enemies.filter(e => isAttacker(e.unit));
  const hot = (x, y) => threats.some(e => d2(x, y, e.x, e.y) <= THREAT_R2[e.unit]);
  const k = king(me.x, me.y, t.x, t.y);
  if (st.hotFor !== t) { st.hotFor = t; st.hotBest = k; st.hotN = 0; }
  const stuck = hot(t.x, t.y) || (threats.length > 0 && k >= st.hotBest);
  if (k < st.hotBest) st.hotBest = k;
  if (!stuck) { st.hotN = 0; return; }
  st.hotN = (st.hotN || 0) + 1; if (st.hotN < CFG.PILGRIM_HOT) return;
  const gave = st.gaveUp || (st.gaveUp = new Map());
  gave.set(t.i, me.turn); st.hotN = 0;
  const alt = freeDepotNear(B, me.x, me.y, null, undefined, 0, d => hot(d.x, d.y) || (gave.has(d.i) && me.turn - gave.get(d.i) <= CFG.PILGRIM_HOT_MEM));
  if (alt) st.target = alt;
}

// CFG.PILGRIM_HERE: a pilgrim whose target depot is taken (a robot stands on it) or hot (in a visible enemy attacker's
// threat range) takes the depot it stands on, if any, else the nearest free depot that is not hot; with none, it keeps
// its target. Before this, pilgrims stood on safe depots without mining while their targets were the cluster's hot
// ones (replica 206-3, seed 1884, castle (0,14): its five depots were mined 54% of rounds 1-99 and 0% of 100-300
// while seven pilgrims shuffled among them, two depots in reach of enemy prophets; StoneT2000 mined 5,004 karbonite
// to our 2,080).
export function hereRetarget(B) {
  const w = B.w, me = w.me, st = B.st, t = st.target;
  if (me.x === t.x && me.y === t.y) return;
  const threats = w.enemies.filter(e => isAttacker(e.unit));
  const hot = (x, y) => threats.some(e => d2(x, y, e.x, e.y) <= THREAT_R2[e.unit]);
  const occ = w.occ(t.x, t.y);
  if (!(occ > 0 && occ !== me.id) && !hot(t.x, t.y)) return;
  const here = depotAt(B, me.x, me.y);
  if (here && !hot(me.x, me.y)) { st.target = here; return; }
  const alt = freeDepotNear(B, me.x, me.y, null, undefined, 0, d => hot(d.x, d.y));
  if (alt) st.target = alt;
}

// CFG.PILGRIM_ORPHAN: a pilgrim that knows no living structure of ours (line "forget ones whose tile we see empty":
// its church fell) walks to the nearest site of a cluster in our half (canonical top) that it has not yet seen from
// ORPHAN_SEEN_R2, until a castle or church comes into sight (vision r2 100); every castle seeds a resource cluster
// (engine game.js:195) and ours lie in our half. All seen: start over. Before this an orphan mined until full and
// then returned null for good (h50's gate, seed 1250: pilgrim #3228 stood 430 turns with F100 after its church at
// (11,31) fell at round 25; stall census of h50/h54/h55's gates: 41 of 165 long streaks carried a full load).
const ORPHAN_SEEN_R2 = 36;
export function orphanStep(B) {
  const w = B.w, me = w.me, st = B.st, n = w.n, cs = B.clusters;
  if (!st.orphan) { st.orphan = true; st.target = null; st.orphanSeen = new Set(); }
  const seen = st.orphanSeen;
  cs.forEach((c, i) => { if (d2(me.x, me.y, c.site[0], c.site[1]) <= ORPHAN_SEEN_R2) seen.add(i); });
  const ours = cs.filter((c, i) => c.site[1] < n / 2 && !seen.has(i));
  if (!ours.length) { seen.clear(); return null; }
  const dist = bfs(w, [[me.x, me.y]], B.offs);
  let best = null, bd = 1e9;
  for (const c of ours) { const d = dist[c.site[1] * n + c.site[0]]; if (d >= 0 && d < bd) { bd = d; best = c; } }
  if (!best) { for (const c of ours) seen.add(c.i); return null; }
  return go(B, 'orph' + best.i, [best.site, ...adjSources(best.site[0], best.site[1])]);
}

// Relay (CFG.RELAY): a friend next to us that stands next to one of our structures and will deposit what we give it:
// a military unit, or a pilgrim on a depot of the resource we do not carry (its own cargo is the other kind, so ours
// fits). Two full pilgrims next to the same friend: the first in canonical (y, x) order relays, so the friend is
// not handed two loads (cargo past its capacity is lost).
function relayTo(B) {
  const w = B.w, me = w.me, st = B.st;
  const nextToStruct = r => st.structs.some(s => king(r.x, r.y, s.x, s.y) === 1);
  for (const r of w.friends) {
    if (r.unit === CASTLE || r.unit === CHURCH || king(r.x, r.y, me.x, me.y) !== 1 || !nextToStruct(r)) continue;
    if (r.unit === PILGRIM) {
      const i = r.y * w.n + r.x;
      if (!(me.karbonite === 0 ? w.karb[i] : me.fuel === 0 ? w.fuelD[i] : 0)) continue;
    }
    const rival = w.friends.some(o => o !== r && o.unit === PILGRIM && king(o.x, o.y, r.x, r.y) === 1 && !nextToStruct(o) &&
      (o.y < me.y || (o.y === me.y && o.x < me.x)));
    if (!rival) return r;
  }
  return null;
}

// Karbonite nobody will spend (CFG.KARB_STOP): while the team holds that much, a karbonite miner on its depot waits
// instead of mining (each mine costs a fuel, the resource that binds).
function minesNow(w, t) { return !(CFG.KARB_STOP && t.k && w.karbonite >= CFG.KARB_STOP); }
export { minesNow };
