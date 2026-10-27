// Castle: shares its position with the other castles over castle talk (canonical x+1 on turn 1, y+1 on turn 2),
// plans and sends church pioneers, calls attacks, and runs the structure loop.
// Enemy castles are exactly the mirrors of ours (canonical frame: (x, n-1-y)).
import { CFG, defReserveK } from './config.js';
import { STATS, CHURCH, PILGRIM, CRUSADER } from './specs.js';
import { SIG, encXY, encNum, CT, FAR, decFarRobot, GUARD_STRIKE, CLAIM_R2 } from './comms.js';
import { bfs } from './mapinfo.js';
import { offsets, d2, king } from './util.js';
import { structInit, structTurn, buildToward } from './struct.js';
import { chainLaunch, hoarding } from './chain.js';
import { latticeTile } from './military.js';

const KING = offsets(2), PILGRIM_OFFS = offsets(4);

export { callAttack, callDue, planClusters, expandPlan, nextPioneer, pioneerDue, pioneer, hearStrike, strikeFar, claimTile, claim };

export function castleTurn(B) {
  const w = B.w, me = w.me, st = B.st;
  B.round = me.turn;
  if (!st.ready) {   // until it completes: a turn killed mid-init (200 ms) leaves it half done
    structInit(B);
    st.castles = new Map([[me.id, { x: me.x, y: me.y }]]);
    st.partial = new Map();
    st.churched = new Set();
    st.lost = new Map();   // cluster -> round a pioneer for it died
    st.lostN = new Map();  // cluster -> pioneers lost there (CFG.PIONEER_LOST_DOUBLE)
    st.taken = new Map();  // cluster -> round a pioneer saw an enemy structure there (CFG.EXPAND_ROUND) or gave up (PIONEER_GIVEUP, _STALL_ANY)
    st.escorts = [];       // CFG.ESCORT: [{cluster, x, y, left}] pioneer sites still owed escort units
    st.escorted = new Set();   // CFG.ESCORT_EACH: clusters an escort was opened for at a pioneer's send (once each)
    st.attackUntil = 0;
    st.deadE = new Set();   // indices (into st.order) of enemy castles reported destroyed
    st.lastT = -1;
    st.churchIds = new Map();   // CFG.HOP_GAIN: cluster -> id of our living church at its site
    st.hopF = new Map();        // ...cluster -> king steps from its site (bfs), for the church nearest it
    st.hopFail = new Map();     // ...church cluster -> turn a request to it lapsed
    st.ready = true;
  }
  if (me.turn === 1) w.talk(me.x + 1);
  else if (me.turn === 2) w.talk(me.y + 1);
  const allIds = new Set();
  st.count = [1, 0, 0, 0, 0, 0];   // our robots by type, from their status bytes (castles: self + talkers)
  st.march = 0;                    // ...of which military units not free for a wave (CFG.WAVE)
  st.waitN = 0;                    // pioneers waiting at their sites for the church's karbonite (CFG.PIONEER_HOLD)
  st.claimOpen = false;            // the claim's pioneer is out (CFG.CLAIM_FUND)
  const all = w.robots.concat(w.unplaced);
  st.chainLive = false;            // CFG.CHAIN_ROUND: our chainer still walks or waits
  st.chainAny = false;             // CFG.CHAIN_LIVE: any castle's chainer walks or waits (1), or waits staged (2)
  for (const r of all) {
    if (r.team !== me.team) continue;
    allIds.add(r.id);
    if (r.id === me.id) continue;
    const ct = r.castle_talk;
    if (CFG.CHAIN_ROUND && r.id === st.chainId) { if (ct === CT.CHAINER || ct === CT.STAGED) st.chainLive = true; else if (ct === CT.CHAINGONE) st.chainOff = true; }
    if (ct === CT.STAGED || (ct === CT.CHAINER && CFG.CHAIN_LIVE === 1)) st.chainAny = true;
    if (ct >= CT.UNIT && ct < CT.UNIT + 6) st.count[ct - CT.UNIT]++;
    else if (ct === CT.CHAINFIRE && CFG.CHAIN_FAILS) { st.count[PILGRIM]++; st.chainMiss = (st.chainMiss || 0) + 1; }
    else if (ct === CT.WALL && CFG.CHAIN_WALL) { st.count[CHURCH]++; st.wallAt = B.round; }
    else if (ct >= CT.MARCH && ct < CT.MARCH + 6) { st.count[ct - CT.MARCH]++; st.march++; }
    else if (ct === CT.WAIT && CFG.PIONEER_HOLD) { st.count[PILGRIM]++; st.waitN++; }
    else if (CFG.CLAIM_FUND && ct === CT.CLAIM) { st.count[PILGRIM]++; st.claimOpen = true; }
    else if (ct === CT.BLOCKED && CFG.PIONEER_CALL) {
      st.count[PILGRIM]++;
      const p = CFG.ESCORT && st.pioneers.find(q => q.id === r.id);
      if (p && !p.esc) { p.esc = true; openEscort(B, p.cluster); }
    }
    else if (CFG.HOP_GAIN && me.turn > 3 && ct >= CT.HOP && ct < CT.HOP + 63) {   // a pioneer a church built for us
      st.count[PILGRIM]++;
      const q = r.turn === 1 && st.pioneers.find(q => q.hop >= 0 && q.id === 0 && q.cluster === ct - CT.HOP);
      if (q) q.id = r.id;
    }
    if (me.turn <= 3 && r.castle_talk > 0 && r.castle_talk <= 64) {
      const p = st.partial.get(r.id) || {};
      if (r.turn === 1) p.x = r.castle_talk - 1; else if (r.turn === 2) p.y = r.castle_talk - 1;
      st.partial.set(r.id, p);
      if (p.x !== undefined && p.y !== undefined) st.castles.set(r.id, { x: p.x, y: p.y });
    } else if (me.turn > 3 && r.castle_talk >= CT.CHURCH) {
      st.churched.add(r.castle_talk - CT.CHURCH);
      if (CFG.HOP_GAIN && r.turn === 1) st.churchIds.set(r.castle_talk - CT.CHURCH, r.id);   // the church's own first turn
    }
    else if (me.turn > 3 && r.castle_talk >= CT.DEAD && r.castle_talk < CT.DEAD + 4) st.deadE.add(r.castle_talk - CT.DEAD);
    else if (me.turn > 3 && ct >= CT.TAKEN && ct < CT.TAKEN + 40) st.taken.set(ct - CT.TAKEN, me.turn);
  }
  if (CFG.CHAIN_FAILS && st.deadE.size > (st.killsSeen || 0)) { st.killsSeen = st.deadE.size; st.chainMiss = 0; }
  // Our castles in canonical order (fixed at turn 3): enemy castle i is the mirror of st.order[i].
  if (me.turn === 3) st.order = [...st.castles.values()].sort((a, b) => (a.y * w.n + a.x) - (b.y * w.n + b.x));
  if (me.turn === 3) { planClusters(B); if (CFG.ESCORT_FIRST) escortFirst(B); }
  // A castle that disappeared from the id list is dead.
  if (me.turn > 3) for (const id of [...st.castles.keys()]) if (id !== me.id && !allIds.has(id)) st.castles.delete(id);
  if (CFG.HOP_GAIN) for (const [c, id] of [...st.churchIds]) if (!allIds.has(id)) st.churchIds.delete(c);
  if (CFG.EXPAND_ROUND && st.plan && me.turn >= CFG.EXPAND_ROUND && (me.turn - CFG.EXPAND_ROUND) % 50 === 0) expandPlan(B);
  // Pioneers: one that disappeared frees its cluster for a later retry; one that built its church or is overdue is done.
  st.pioneers = st.pioneers.filter(p => {
    if (p.id > 0 && !allIds.has(p.id)) {
      st.lost.set(p.cluster, me.turn); st.lostN.set(p.cluster, (st.lostN.get(p.cluster) || 0) + 1);
      if (CFG.ESCORT) openEscort(B, p.cluster);
      return false;
    }
    // CFG.HOP_GAIN: no newborn answered for it (the church could not build in the round it was asked): the castle may
    // send it itself next, and asks that church nothing for HOP_REST turns.
    if (p.hop >= 0 && p.id === 0 && me.turn - p.since > 2) { st.hopFail.set(p.hop, me.turn); return false; }
    if (CFG.ESCORT && !p.esc && me.turn - p.since > p.d + CFG.ESCORT_SLACK) { p.esc = true; openEscort(B, p.cluster); }
    if ((CFG.PIONEER_GIVEUP || CFG.PIONEER_STALL_ANY || CFG.TAKEN_SEEN) && st.taken.has(p.cluster) && st.taken.get(p.cluster) >= p.since) return false;   // it gave up
    const late = me.turn - p.since > 80;
    if (late && CFG.PIONEER_TIMEOUT_REST && !st.churched.has(p.cluster)) {
      st.lost.set(p.cluster, me.turn);
      // 2: it also counts as a pioneer lost there, so PIONEER_LOST_DOUBLE lengthens the rest (v11's panel games: 242
      // of 304 repeat sends to a site the enemy held followed a pioneer still out 80 turns, re-sent at once).
      if (CFG.PIONEER_TIMEOUT_REST >= 2) st.lostN.set(p.cluster, (st.lostN.get(p.cluster) || 0) + 1);
    }
    return !st.churched.has(p.cluster) && !late;
  });
  st.nStructs = () => st.castles.size + st.churched.size;
  if (CFG.RECALL) callRecall(B);
  callAttack(B);
  st.pioneerDue = pioneerDue(B);   // CFG.PIONEER_RESERVE: the peacetime army leaves the pioneer's karbonite alone
  if (CFG.STRIKE_FAR && st.order) hearStrike(B);
  const act = structTurn(B, allIds, () => (CFG.ESCORT_FIRST ? escort(B) : null) || pioneer(B) || (CFG.ESCORT ? escort(B) : null) ||
    (CFG.CHAIN_ROUND ? (chainLaunch(B, buildToward) || {}).act : null),
    CFG.CLAIM || CFG.PIONEER_EARLY || CFG.ESCORT_EARLY || CFG.STRIKE_FAR ? () => (CFG.CLAIM ? claim(B) : null) ||
      (CFG.STRIKE_FAR ? strikeFar(B) : null) ||
      (CFG.ESCORT_EARLY ? escort(B) : null) || (CFG.PIONEER_EARLY ? earlyPioneer(B) : null) : null);
  if (CFG.CASTLE_POST) callPost(B);   // after the build, so a newborn's radio comes first
  return act === HOPPED ? null : act;
}

// CFG.CASTLE_POST: radio this castle's position far (FAR.POST, 60 tiles) every CASTLE_POST_EVERY rounds when the turn's
// radio is free; military units born at churches that drew a castle post hold the lattice of the nearest castle heard.
function callPost(B) {
  const w = B.w, st = B.st, me = w.me;
  if (w.sentR2 || B.round - (st.postAt || -999) < CFG.CASTLE_POST_EVERY || w.fuel < Math.ceil(Math.sqrt(FAR.POST)) + 50) return;
  st.postAt = B.round;
  w.signal(encXY(0, me.x, me.y), FAR.POST);
}

// Remote clusters (no depot served by any of our castles) that this castle should church, nearest first.
function planClusters(B) {
  const w = B.w, st = B.st, n = w.n, me = w.me;
  const own = [...st.castles.values()].sort((a, b) => (a.y * n + a.x) - (b.y * n + b.x));
  const ownF = own.map(c => bfs(w, [[c.x, c.y]], KING));
  // PLAN_SERVE_PILGRIM: "served" as struct.js staffs depots (pilgrim moves); king steps over-counted diagonal reach.
  const ownP = CFG.PLAN_SERVE_PILGRIM ? own.map(c => bfs(w, [[c.x, c.y]], PILGRIM_OFFS)) : null;
  const reach = d => ownP.some(f => { const v = f[d.y * n + d.x]; return v >= 0 && v <= CFG.SERVE_MOVES; });
  const enemyF = own.map(c => bfs(w, [w.mirror(c.x, c.y)], KING));
  const myIdx = own.findIndex(c => c.x === me.x && c.y === me.y);
  st.plan = []; st.planAll = 0; st.safeAll = 0;   // planAll: clusters planned by any of our castles; safeAll: those
                                                  // with m >= CFG.PIONEER_OPEN
  let claimC = null;                              // CFG.CLAIM: the team's claim, the same in every castle
  for (const c of B.clusters) {
    const [sx, sy] = c.site, k = sy * n + sx;
    const dOwn = ownF.map(f => f[k] < 0 ? 999 : f[k]);
    const dUs = Math.min(...dOwn), dThem = Math.min(...enemyF.map(f => f[k] < 0 ? 999 : f[k]));
    const unserved = ownP ? c.depots.filter(d => !reach(d)).length : 0;
    const served = ownP ? unserved < Math.min(2, c.depots.length)
      : c.depots.some(d => ownF.some(f => { const v = f[d.y * n + d.x]; return v >= 0 && v <= CFG.SERVE_MOVES * 2; }));
    if (served || dUs > dThem + CFG.CLAIM_MARGIN) continue;
    st.planAll++; if (CFG.PIONEER_OPEN && dThem - dUs >= CFG.PIONEER_OPEN) st.safeAll++;
    let owner = 0; for (let i = 1; i < own.length; i++) if (dOwn[i] < dOwn[owner]) owner = i;
    if (owner === myIdx) st.plan.push({ cluster: c.i, d: dUs, m: dThem - dUs, value: c.nk * 2 + c.nf });
    if (CFG.CLAIM && dThem - dUs >= CFG.CLAIM_MIN_M && dThem - dUs <= CFG.PLAN_CONTEST_FIRST && (!claimC || dUs < claimC.d))
      claimC = { cluster: c.i, d: dUs, m: dThem - dUs, owner };
  }
  st.claim = null;
  if (CFG.CLAIM && claimC && claimC.owner === myIdx) {
    const tile = claimTile(w, B.clusters[claimC.cluster].site, own[myIdx], own.map(c => w.mirror(c.x, c.y)));
    if (tile) st.claim = { cluster: claimC.cluster, d: claimC.d, m: claimC.m, x: tile[0], y: tile[1], built: 0, sent: false };
  }
  // CFG.PLAN_CONTEST_FIRST: clusters the enemy reaches within that many moves of us go first; the middle is a race
  // (seed 1828 with SERVE_MOVES 2: the near clusters delayed the centre pioneers from round 27 to 48-67 and h19 won it).
  const cf = CFG.PLAN_CONTEST_FIRST, hot = p => (cf && p.m <= cf ? 0 : 1);
  // CFG.PLAN_VALUE: steps per depot, (d + PLAN_VALUE) / n, compared as cross products (integers, both teams alike).
  const pv = CFG.PLAN_VALUE, nd = p => B.clusters[p.cluster].depots.length;
  const byValue = (a, b) => pv ? (a.d + pv) * nd(b) - (b.d + pv) * nd(a) : 0;
  st.plan.sort((a, b) => hot(a) - hot(b) || byValue(a, b) || a.d - b.d || b.value - a.value || a.cluster - b.cluster);
}

// CFG.EXPAND_ROUND: append to the plan the clusters it left out (nearer the enemy, or owned by a castle since lost),
// nearest first, unless an enemy castle stands within EXPAND_KEEP king steps of the site or a depot lies within
// 2*SERVE_MOVES of one of our castles or churched sites. Pioneers that find an enemy structure there report it
// (CT.TAKEN) and the cluster rests for 200 rounds.
function expandPlan(B) {
  const w = B.w, st = B.st, n = w.n, me = w.me;
  const own = [...st.castles.values()].sort((a, b) => (a.y * n + a.x) - (b.y * n + b.x));
  const ownF = own.map(c => bfs(w, [[c.x, c.y]], KING));
  const servedF = bfs(w, own.map(c => [c.x, c.y]).concat([...st.churched].map(i => B.clusters[i].site)), KING);
  const enemyF = st.order.filter((c, i) => !st.deadE.has(i)).map(c => bfs(w, [w.mirror(c.x, c.y)], KING));
  const myIdx = own.findIndex(c => c.x === me.x && c.y === me.y), add = [];
  for (const c of B.clusters) {
    if (st.plan.some(p => p.cluster === c.i)) continue;
    const k = c.site[1] * n + c.site[0];
    const dOwn = ownF.map(f => f[k] < 0 ? 999 : f[k]), dUs = Math.min(...dOwn);
    const dThem = Math.min(999, ...enemyF.map(f => f[k] < 0 ? 999 : f[k]));
    if (dUs >= 999 || dThem <= CFG.EXPAND_KEEP) continue;
    if (c.depots.some(d => { const v = servedF[d.y * n + d.x]; return v >= 0 && v <= CFG.SERVE_MOVES * 2; })) continue;
    let owner = 0; for (let i = 1; i < own.length; i++) if (dOwn[i] < dOwn[owner]) owner = i;
    if (owner === myIdx) add.push({ cluster: c.i, d: dUs, value: c.nk * 2 + c.nf });
  }
  add.sort((a, b) => a.d - b.d || b.value - a.value || a.cluster - b.cluster);
  st.plan.push(...add);
}

// The next cluster this castle should send a pioneer to now, if any (and, given `ok`, the first that passes it).
function nextPioneer(B, ok) {
  const w = B.w, st = B.st;
  if (!st.plan || st.pioneers.length >= maxPioneers(st) || w.me.turn < CFG.PIONEER_MIN_ROUND) return null;
  return st.plan.find(p => (!ok || ok(p)) && !st.churched.has(p.cluster) && !st.pioneers.some(q => q.cluster === p.cluster) &&
    !(CFG.CLAIM && st.claim && !st.claim.sent && st.claim.cluster === p.cluster) &&   // CFG.CLAIM: its own pioneer goes first
    !(st.lost.has(p.cluster) && w.me.turn - st.lost.get(p.cluster) < lostRest(st, p.cluster)) &&
    !(st.taken.has(p.cluster) && w.me.turn - st.taken.get(p.cluster) < 200)) || null;
}

// Pioneers this castle keeps in flight: MAX_PIONEERS, or a share of CFG.PIONEERS_TEAM among our living castles.
export function maxPioneers(st) {
  return CFG.PIONEERS_TEAM ? Math.max(CFG.MAX_PIONEERS, Math.ceil(CFG.PIONEERS_TEAM / st.castles.size)) : CFG.MAX_PIONEERS;
}

// Rounds to wait before re-sending a pioneer to a cluster where one died (CFG.PIONEER_LOST_REST, _DOUBLE).
export function lostRest(st, cluster) {
  return CFG.PIONEER_LOST_DOUBLE ? CFG.PIONEER_LOST_REST << Math.min(4, (st.lostN.get(cluster) || 1) - 1) : CFG.PIONEER_LOST_REST;
}

// Whether this castle's peacetime army should leave a pioneer's karbonite in the bank (CFG.PIONEER_RESERVE): 1 while
// this castle has a pioneer due; 2 also while no church stands yet and any castle planned one, before
// PIONEER_RESERVE_UNTIL (the bank is shared: replica seed 2965, the other castle's guard spent it and the centre church
// came at round 30-41; StoneT2000's at 12).
function pioneerDue(B) {
  const st = B.st;
  if (nextPioneer(B)) return true;
  return CFG.PIONEER_RESERVE >= 2 && st.planAll > 0 && !st.churched.size && B.round < CFG.PIONEER_RESERVE_UNTIL;
}

function pioneer(B) {
  const w = B.w;
  const next = nextPioneer(B);
  if (!next) return null;
  // CFG.PIONEER_IDLE: a castle with no home depot left to staff this turn has nothing else to buy before its first
  // PIONEER_IDLE pioneers in flight.
  const departK = B.st.noDepot && B.st.pioneers.length < CFG.PIONEER_IDLE ? 0 : CFG.PIONEER_DEPART_K;
  if (!w.canAfford(PILGRIM, departK + defReserveK(B), 200)) return null;
  if (CFG.HOP_GAIN) { const h = hopPioneer(B, next); if (h) return h; }
  return sendPioneer(B, next);
}

// CFG.HOP_GAIN: the pioneer for `next` is built by the living church of ours nearest its site (king steps over passable
// tiles; ties to the lower cluster index) when that church is at least HOP_GAIN steps nearer than this castle. The
// castle radios SIG.HOP (target cluster << 6 | church cluster) far enough to reach every tile beside the church: the
// church builds that round (church.js hopBuild) and its newborn reads the target from this radio (pilgrim.js). The
// castle builds nothing this turn, so no newborn's radio of its own replaces the request. The pioneer is tracked as one
// of the castle's own, its id taken from its first turn's CT.HOP talk. Returns HOPPED, or null to build it here.
const HOPPED = { hopped: true };
function hopPioneer(B, next) {
  const w = B.w, st = B.st, me = w.me, n = w.n, t = next.cluster;
  if (w.sentR2 || !st.churchIds.size || t >= 63) return null;
  if (!st.hopF.has(t)) st.hopF.set(t, bfs(w, [B.clusters[t].site], KING));
  const f = st.hopF.get(t);
  let best = -1, bd = next.d - CFG.HOP_GAIN + 1;
  for (const j of [...st.churchIds.keys()].sort((a, b) => a - b)) {
    if (j >= 64 || (st.hopFail.has(j) && me.turn - st.hopFail.get(j) < CFG.HOP_REST)) continue;
    const [sx, sy] = B.clusters[j].site, v = f[sy * n + sx];
    if (v >= 0 && v < bd) { bd = v; best = j; }
  }
  if (best < 0) return null;
  const [hx, hy] = B.clusters[best].site;
  let r2 = Math.ceil((Math.sqrt(d2(me.x, me.y, hx, hy)) + 1.5) ** 2);
  while (Object.values(FAR).includes(r2)) r2++;   // never one of the far messages' radii
  r2 = Math.min(2 * 63 * 63, r2);
  if (w.fuel < Math.ceil(Math.sqrt(r2)) + STATS[PILGRIM].costF + 2) return null;
  w.signal(encNum(SIG.HOP, (t << 6) | best), r2);
  st.pioneers.push({ id: 0, cluster: t, since: me.turn, d: bd, hop: best });
  return HOPPED;
}

// CFG.PIONEER_EARLY: through its turn PIONEER_EARLY a castle whose plan opens with a contested cluster sends that one
// pioneer ahead of the economy pilgrims, on the pilgrim's cost alone (replica 420-425: the field's first pilgrims
// reached the centre clusters at r11-23 and churched them by r14-53; ours left at r12-16, waiting for the bank to
// hold PIONEER_DEPART_K + DEF_RESERVE_K after the economy pilgrims of turns 1-5). CFG.PIONEER_OPEN: it goes instead
// to the first planned cluster we reach PIONEER_OPEN king steps before the enemy (safe land, no race).
// CFG.PIONEER_RACE: when no castle of ours has such a cluster, it races for its plan's first cluster if that one is
// a race (m < PIONEER_RACE): v9's first pioneers to m-0 sites left at r23-44 and churched 0 of 24; the enemy churched
// 2518's at r14 and 2591's at r23 (TRAINING_LOG 2026-10-25 17:05).
function earlyPioneer(B) {
  const w = B.w, st = B.st;
  if (st.earlySent || w.me.turn > CFG.PIONEER_EARLY) return null;
  const race = CFG.PIONEER_OPEN && CFG.PIONEER_RACE && !st.safeAll;
  const next = CFG.PIONEER_OPEN && !race ? nextPioneer(B, p => p.m >= CFG.PIONEER_OPEN) : nextPioneer(B);
  if (!next || !(CFG.PIONEER_OPEN ? !race || next.m < CFG.PIONEER_RACE : next.m <= CFG.PLAN_CONTEST_FIRST) ||
    !w.canAfford(PILGRIM, 0, 200)) return null;
  const a = sendPioneer(B, next);
  if (a) st.earlySent = true;
  return a;
}

// CFG.CLAIM: where the claimant stands for the site (x, y) of a cluster the castle `o` owns: a passable lattice tile, no
// depot and not the site, within 2 king steps of it, no farther from the castle than the site and beyond r2 144 of
// every enemy castle (`mirrors`); nearest the site, then canonical order. Null: no claim.
function claimTile(w, [sx, sy], o, mirrors) {
  let best = null, bd = 1e9;
  for (let y = sy - 2; y <= sy + 2; y++) for (let x = sx - 2; x <= sx + 2; x++) {
    if ((x === sx && y === sy) || !w.passable(x, y) || w.isDepot(x, y) || !latticeTile(x, y)) continue;
    if (king(x, y, o.x, o.y) > king(sx, sy, o.x, o.y) || mirrors.some(([mx, my]) => d2(x, y, mx, my) <= 144)) continue;
    const v = d2(x, y, sx, sy) * 4096 + y * 64 + x;
    if (v < bd) { bd = v; best = [x, y]; }
  }
  return best;
}

// CFG.CLAIM: the claim's owner builds the claimant (radioing SIG.GUARD at its tile at r2 CLAIM_R2) as soon as it can,
// then, CLAIM_LEAD turns later, the claim's pioneer on a pilgrim's cost (SIG.CHURCH at r2 CLAIM_R2: CFG.CLAIM_FUND).
// A turn whose radio is taken waits: each newborn must hear it.
function claim(B) {
  const w = B.w, st = B.st, c = st.claim;
  if (!c || c.sent || w.sentR2) return null;
  if (!c.built) {
    if (!w.canAfford(CFG.CLAIM_UNIT, 0, 2)) return null;
    const b = buildToward(B, CFG.CLAIM_UNIT, c.x, c.y, encXY(SIG.GUARD, c.x, c.y), CLAIM_R2);
    if (!b) return null;
    c.built = w.me.turn;
    return b.act;
  }
  if (w.me.turn < c.built + CFG.CLAIM_LEAD || st.churched.has(c.cluster) || st.pioneers.length >= maxPioneers(st) ||
    !w.canAfford(PILGRIM, 0, 200)) return null;
  const a = sendPioneer(B, c, CLAIM_R2);
  if (a) c.sent = true;
  return a;
}

function sendPioneer(B, next, sigR2 = 2) {
  const w = B.w, st = B.st;
  if (CFG.RADIO_WAIT && w.sentR2) return null;   // the attack call took the radio: build next turn, not deaf
  const c = B.clusters[next.cluster];
  const b = buildToward(B, PILGRIM, c.site[0], c.site[1], encXY(SIG.CHURCH, c.site[0], c.site[1]), sigR2);
  if (!b) return null;
  st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'pioneer', ref: next.cluster };
  st.pioneers.push({ id: -1, cluster: next.cluster, since: w.me.turn, d: next.d });
  if (CFG.ESCORT_EACH && next.m <= CFG.PLAN_CONTEST_FIRST) escortEach(B, next.cluster);
  return b.act;
}

// CFG.ESCORT_EACH: a pioneer sent to a contested cluster other than ESCORT_FIRST's opens ESCORT_EACH units to it, once
// per cluster, built after it (escort before pioneer only for the first: ECONOMICS.md row 7).
function escortEach(B, cluster) {
  const st = B.st;
  if (st.escorted.has(cluster)) return;
  st.escorted.add(cluster);
  openEscort(B, cluster, CFG.ESCORT_EACH);
  mirrorEscort(B, cluster);
}

// CFG.ESCORT: owe `left` units (ESCORT) to a cluster's site (once per cluster while any are still owed).
export function openEscort(B, cluster, left = CFG.ESCORT) {
  const st = B.st, c = B.clusters[cluster];
  if (!c || st.churched.has(cluster) || st.escorts.some(e => e.cluster === cluster)) return;
  st.escorts.push({ cluster, x: c.site[0], y: c.site[1], left });
}

// CFG.ESCORT_FIRST: owe ESCORT_FIRST units to the first contested cluster of this castle's plan, so they are built
// (escort before pioneer in the castle's build order) and walk out ahead of its pioneer.
export function escortFirst(B) {
  const p = B.st.plan.find(q => q.m <= CFG.PLAN_CONTEST_FIRST);
  if (!p) return;
  openEscort(B, p.cluster, CFG.ESCORT_FIRST);
  B.st.escorted.add(p.cluster);
  mirrorEscort(B, p.cluster);
}

// CFG.ESCORT_MIRROR (on in v8): the escort holds the mirror image of the site, the enemy's own site
// for that cluster pair, as bot1v43's round-3 prophet does (replica 410-1, 416-1, 416-3).
function mirrorEscort(B, cluster) {
  const e = CFG.ESCORT_MIRROR && B.st.escorts.find(q => q.cluster === cluster);
  if (e) [e.x, e.y] = B.w.mirror(e.x, e.y);
}

// Build the next escort unit owed, radioing it the site (a turn whose radio is taken waits: the unit must hear it).
export function escort(B) {
  const w = B.w, st = B.st;
  st.escorts = st.escorts.filter(e => e.left > 0 && !st.churched.has(e.cluster));
  const e = st.escorts[0];
  if (!e || w.sentR2) return null;
  const reserveK = defReserveK(B) + (st.pioneers.length ? CFG.RESERVE_CHURCH_K : 0);
  if (!w.canAfford(CFG.ESCORT_UNIT, reserveK, CFG.MIL_FUEL_RESERVE)) return null;
  const b = buildToward(B, CFG.ESCORT_UNIT, e.x, e.y, encXY(SIG.GUARD, e.x, e.y));
  if (!b) return null;
  e.left--;
  return b.act;
}

// CFG.STRIKE_FAR: enemy churches radioed by our pilgrims (FAR.STRIKE) or in this castle's sight. This castle owes
// STRIKE_FAR crusaders to each (once per tile) that lies within r2 STRIKE_FAR_R2 of it, no nearer another castle of ours
// (ties: canonical order) and beyond r2 STRIKE_SAFE_R2 of every enemy castle (mirrors of ours); a debt ends when the
// castle sees the tile without an enemy church.
function hearStrike(B) {
  const w = B.w, st = B.st, me = w.me, n = w.n;
  const seen = st.strikeSeen || (st.strikeSeen = new Set());
  st.strikes = (st.strikes || []).filter(s => {
    const o = w.occ(s.x, s.y);
    return s.left > 0 && (o < 0 || w.enemies.some(e => e.unit === CHURCH && e.x === s.x && e.y === s.y));
  });
  const heard = [];
  for (const r of w.robots) {
    if (r.id === me.id || (r.seen && r.team !== me.team)) continue;
    const m = decFarRobot(r);
    if (m && m.type === SIG.STRIKE) heard.push(m);
  }
  for (const e of w.enemies) if (e.unit === CHURCH) heard.push(e);
  const ci = c => c.y * n + c.x, own = [...st.castles.values()], mine = d => d2(me.x, me.y, d.x, d.y);
  for (const c of heard) {
    const k = ci(c), dm = mine(c);
    if (seen.has(k) || dm > CFG.STRIKE_FAR_R2) continue;
    if (own.some(o => { const q = d2(o.x, o.y, c.x, c.y); return q < dm || (q === dm && ci(o) < ci(me)); })) continue;
    if (st.order.some(o => { const [x, y] = w.mirror(o.x, o.y); return d2(x, y, c.x, c.y) <= CFG.STRIKE_SAFE_R2; })) continue;
    seen.add(k);
    st.strikes.push({ x: c.x, y: c.y, left: CFG.STRIKE_FAR });
  }
}

// Build the next striker owed, radioing it the church at r2 GUARD_STRIKE (a turn whose radio is taken waits).
function strikeFar(B) {
  const w = B.w, st = B.st, s = st.strikes && st.strikes.find(q => q.left > 0);
  if (!s || w.sentR2 || !w.canAfford(CRUSADER, defReserveK(B), CFG.MIL_FUEL_RESERVE)) return null;
  const b = buildToward(B, CRUSADER, s.x, s.y, encXY(SIG.GUARD, s.x, s.y), GUARD_STRIKE);
  if (!b) return null;
  s.left--;
  return b.act;
}

// General attack: from ATTACK_ROUND, when enough military stands near this castle, radio the nearest enemy castle
// (mirror of one of ours) every few rounds as a far message (radius FAR.ATTACK, about 20 tiles). CFG.ATTACK_ONE: every
// castle radios the same one, the mirror nearest our living castles in summed r2 (ties: canonical order).
function callAttack(B) {
  const w = B.w, st = B.st, me = w.me;
  if (B.round < CFG.ATTACK_ROUND || hoarding(B)) return;   // CFG.HOARD_ROUND: no attack while hoarding
  const army = st.count[3] + st.count[4] + st.count[5];
  if (army < CFG.ATTACK_MIN_ARMY && B.round < 950) return;
  // An army without fuel cannot shoot: attack only with fuel for a few volleys per unit (except at the very end).
  if (w.fuel < CFG.ATTACK_FUEL_PER_UNIT * army && B.round < 950) return;
  if (CFG.ATTACK_PERSIST && st.order) return callAttackPersist(B);
  if (!callDue(B)) return;
  const own = [...st.castles.values()], targets = own.map(c => w.mirror(c.x, c.y));
  if (CFG.ATTACK_ONE) {
    const cost = t => own.reduce((s, c) => s + (t[0] - c.x) ** 2 + (t[1] - c.y) ** 2, 0);
    targets.sort((a, b) => cost(a) - cost(b) || (a[1] * w.n + a[0]) - (b[1] * w.n + b[0]));
  } else targets.sort((a, b) => ((a[0] - me.x) ** 2 + (a[1] - me.y) ** 2) - ((b[0] - me.x) ** 2 + (b[1] - me.y) ** 2) || a[0] - b[0]);
  const t = targets[0];
  if (w.fuel >= 20 + 20 && !w.sentR2) w.signal(encXY(0, t[0], t[1]), FAR.ATTACK);
}

// CFG.RECALL: mobile attackers in sight outnumber half our military within r2 100 -> radio this castle's position
// (FAR.RECALL) at most every 10 rounds, so units guarding far churches come home before it falls.
function callRecall(B) {
  const w = B.w, st = B.st, me = w.me, a = w.enemies.filter(e => e.unit >= CRUSADER).length;
  if (!a || B.round - (st.recallAt || -99) < 10 || w.fuel < Math.ceil(Math.sqrt(FAR.RECALL)) + 50) return;
  let ours = 0;
  for (const r of w.friends) if (r.unit >= CRUSADER && d2(me.x, me.y, r.x, r.y) <= 100) ours++;
  if (ours >= a * 2 + 1) return;
  st.recallAt = B.round;
  w.signal(encXY(0, me.x, me.y), FAR.RECALL);
}

// ATTACK_PERSIST: target the nearest enemy castle not reported destroyed (whether or not our own mirror castle lives);
// the message carries its index. After a kill the first of our living castles (canonical order) radios the next
// target map-wide, since the army may stand far beyond FAR.ATTACK's 20 tiles.
function callAttackPersist(B) {
  const w = B.w, st = B.st, me = w.me;
  let t = -1, td = 1e9;
  st.order.forEach((c, i) => {
    if (st.deadE.has(i)) return;
    const [x, y] = w.mirror(c.x, c.y), d = (x - me.x) ** 2 + (y - me.y) ** 2;
    if (d < td) { td = d; t = i; }
  });
  if (t < 0) return;
  const [x, y] = w.mirror(st.order[t].x, st.order[t].y), msg = encXY(t + 1, x, y);
  const living = [...st.castles.values()].sort((a, b) => (a.y * w.n + a.x) - (b.y * w.n + b.x));
  const first = living[0].x === me.x && living[0].y === me.y;
  if (w.sentR2) return;
  if (st.deadE.size > 0 && st.lastT !== t && first && w.fuel >= 90 + 40) { st.lastT = t; return w.signal(msg, FAR.WIDE); }
  if (callDue(B) && w.fuel >= 20 + 20) w.signal(msg, FAR.ATTACK);
}

// Whether to radio the attack call this round: every ATTACK_EVERY rounds, or (CFG.WAVE) on 3 consecutive rounds once
// WAVE free military units (neither marching nor home guard) have gathered, then not again for WAVE_GAP rounds, so
// reinforcements go out together instead of one by one into the enemy's guns.
function callDue(B) {
  const st = B.st;
  if (!CFG.WAVE) return B.round % CFG.ATTACK_EVERY === 0;
  if (st.waveUntil && B.round < st.waveUntil) return true;
  const idle = st.count[3] + st.count[4] + st.count[5] - st.march;
  if (B.round < (st.waveNext || 0) || (idle < CFG.WAVE && B.round < 950)) return false;
  st.waveUntil = B.round + 3; st.waveNext = B.round + 3 + CFG.WAVE_GAP;
  return true;
}
