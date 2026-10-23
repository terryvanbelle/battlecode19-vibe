// Castle: shares its position with the other castles over castle talk (canonical x+1 on turn 1, y+1 on turn 2),
// plans and sends church pioneers, calls attacks, and runs the structure loop.
// Enemy castles are exactly the mirrors of ours (canonical frame: (x, n-1-y)).
import { CFG, defReserveK } from './config.js';
import { PILGRIM, CRUSADER } from './specs.js';
import { SIG, encXY, CT, FAR } from './comms.js';
import { bfs } from './mapinfo.js';
import { offsets, d2 } from './util.js';
import { structInit, structTurn, buildToward } from './struct.js';
import { chainLaunch } from './chain.js';

const KING = offsets(2), PILGRIM_OFFS = offsets(4);

export { callDue, planClusters, expandPlan, nextPioneer, pioneerDue };

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
    st.attackUntil = 0;
    st.deadE = new Set();   // indices (into st.order) of enemy castles reported destroyed
    st.lastT = -1;
    st.ready = true;
  }
  if (me.turn === 1) w.talk(me.x + 1);
  else if (me.turn === 2) w.talk(me.y + 1);
  const allIds = new Set();
  st.count = [1, 0, 0, 0, 0, 0];   // our robots by type, from their status bytes (castles: self + talkers)
  st.march = 0;                    // ...of which military units not free for a wave (CFG.WAVE)
  const all = w.robots.concat(w.unplaced);
  st.chainLive = false;            // CFG.CHAIN_ROUND: our chainer still walks or waits
  for (const r of all) {
    if (r.team !== me.team) continue;
    allIds.add(r.id);
    if (r.id === me.id) continue;
    const ct = r.castle_talk;
    if (CFG.CHAIN_ROUND && r.id === st.chainId) { if (ct === CT.CHAINER) st.chainLive = true; else if (ct === CT.CHAINGONE) st.chainOff = true; }
    if (ct >= CT.UNIT && ct < CT.UNIT + 6) st.count[ct - CT.UNIT]++;
    else if (ct >= CT.MARCH && ct < CT.MARCH + 6) { st.count[ct - CT.MARCH]++; st.march++; }
    if (me.turn <= 3 && r.castle_talk > 0 && r.castle_talk <= 64) {
      const p = st.partial.get(r.id) || {};
      if (r.turn === 1) p.x = r.castle_talk - 1; else if (r.turn === 2) p.y = r.castle_talk - 1;
      st.partial.set(r.id, p);
      if (p.x !== undefined && p.y !== undefined) st.castles.set(r.id, { x: p.x, y: p.y });
    } else if (me.turn > 3 && r.castle_talk >= CT.CHURCH) st.churched.add(r.castle_talk - CT.CHURCH);
    else if (me.turn > 3 && r.castle_talk >= CT.DEAD && r.castle_talk < CT.DEAD + 4) st.deadE.add(r.castle_talk - CT.DEAD);
    else if (me.turn > 3 && ct >= CT.TAKEN && ct < CT.TAKEN + 40) st.taken.set(ct - CT.TAKEN, me.turn);
  }
  // Our castles in canonical order (fixed at turn 3): enemy castle i is the mirror of st.order[i].
  if (me.turn === 3) st.order = [...st.castles.values()].sort((a, b) => (a.y * w.n + a.x) - (b.y * w.n + b.x));
  if (me.turn === 3) planClusters(B);
  // A castle that disappeared from the id list is dead.
  if (me.turn > 3) for (const id of [...st.castles.keys()]) if (id !== me.id && !allIds.has(id)) st.castles.delete(id);
  if (CFG.EXPAND_ROUND && st.plan && me.turn >= CFG.EXPAND_ROUND && (me.turn - CFG.EXPAND_ROUND) % 50 === 0) expandPlan(B);
  // Pioneers: one that disappeared frees its cluster for a later retry; one that built its church or is overdue is done.
  st.pioneers = st.pioneers.filter(p => {
    if (p.id > 0 && !allIds.has(p.id)) {
      st.lost.set(p.cluster, me.turn); st.lostN.set(p.cluster, (st.lostN.get(p.cluster) || 0) + 1);
      if (CFG.ESCORT) openEscort(B, p.cluster);
      return false;
    }
    if (CFG.ESCORT && !p.esc && me.turn - p.since > p.d + CFG.ESCORT_SLACK) { p.esc = true; openEscort(B, p.cluster); }
    if ((CFG.PIONEER_GIVEUP || CFG.PIONEER_STALL_ANY) && st.taken.has(p.cluster) && st.taken.get(p.cluster) >= p.since) return false;   // it gave up
    return !st.churched.has(p.cluster) && me.turn - p.since <= 80;
  });
  st.nStructs = () => st.castles.size + st.churched.size;
  if (CFG.RECALL) callRecall(B);
  callAttack(B);
  st.pioneerDue = pioneerDue(B);   // CFG.PIONEER_RESERVE: the peacetime army leaves the pioneer's karbonite alone
  const act = structTurn(B, allIds, () => pioneer(B) || (CFG.ESCORT ? escort(B) : null) ||
    (CFG.CHAIN_ROUND ? (chainLaunch(B, buildToward) || {}).act : null));
  if (CFG.CASTLE_POST) callPost(B);   // after the build, so a newborn's radio comes first
  return act;
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
  st.plan = []; st.planAll = 0;   // planAll: clusters planned by any of our castles
  for (const c of B.clusters) {
    const [sx, sy] = c.site, k = sy * n + sx;
    const dOwn = ownF.map(f => f[k] < 0 ? 999 : f[k]);
    const dUs = Math.min(...dOwn), dThem = Math.min(...enemyF.map(f => f[k] < 0 ? 999 : f[k]));
    const unserved = ownP ? c.depots.filter(d => !reach(d)).length : 0;
    const served = ownP ? unserved < Math.min(2, c.depots.length)
      : c.depots.some(d => ownF.some(f => { const v = f[d.y * n + d.x]; return v >= 0 && v <= CFG.SERVE_MOVES * 2; }));
    if (served || dUs > dThem + CFG.CLAIM_MARGIN) continue;
    st.planAll++;
    let owner = 0; for (let i = 1; i < own.length; i++) if (dOwn[i] < dOwn[owner]) owner = i;
    if (owner === myIdx) st.plan.push({ cluster: c.i, d: dUs, m: dThem - dUs, value: c.nk * 2 + c.nf });
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

// The next cluster this castle should send a pioneer to now, if any.
function nextPioneer(B) {
  const w = B.w, st = B.st;
  if (!st.plan || st.pioneers.length >= maxPioneers(st) || w.me.turn < CFG.PIONEER_MIN_ROUND) return null;
  return st.plan.find(p => !st.churched.has(p.cluster) && !st.pioneers.some(q => q.cluster === p.cluster) &&
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
  const w = B.w, st = B.st;
  const next = nextPioneer(B);
  if (!next) return null;
  if (!w.canAfford(PILGRIM, 50 + defReserveK(B), 200)) return null;
  const c = B.clusters[next.cluster];
  const b = buildToward(B, PILGRIM, c.site[0], c.site[1], encXY(SIG.CHURCH, c.site[0], c.site[1]));
  if (!b) return null;
  st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'pioneer', ref: next.cluster };
  st.pioneers.push({ id: -1, cluster: next.cluster, since: w.me.turn, d: next.d });
  return b.act;
}

// CFG.ESCORT: owe ESCORT units to a cluster's site (once per cluster while any are still owed).
export function openEscort(B, cluster) {
  const st = B.st, c = B.clusters[cluster];
  if (!c || st.churched.has(cluster) || st.escorts.some(e => e.cluster === cluster)) return;
  st.escorts.push({ cluster, x: c.site[0], y: c.site[1], left: CFG.ESCORT });
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

// General attack: from ATTACK_ROUND, when enough military stands near this castle, radio the nearest enemy castle
// (mirror of one of ours) every few rounds as a far message (radius FAR.ATTACK, about 20 tiles).
function callAttack(B) {
  const w = B.w, st = B.st, me = w.me;
  if (B.round < CFG.ATTACK_ROUND) return;
  const army = st.count[3] + st.count[4] + st.count[5];
  if (army < CFG.ATTACK_MIN_ARMY && B.round < 950) return;
  // An army without fuel cannot shoot: attack only with fuel for a few volleys per unit (except at the very end).
  if (w.fuel < CFG.ATTACK_FUEL_PER_UNIT * army && B.round < 950) return;
  if (CFG.ATTACK_PERSIST && st.order) return callAttackPersist(B);
  if (!callDue(B)) return;
  const targets = [...st.castles.values()].map(c => w.mirror(c.x, c.y));
  targets.sort((a, b) => ((a[0] - me.x) ** 2 + (a[1] - me.y) ** 2) - ((b[0] - me.x) ** 2 + (b[1] - me.y) ** 2) || a[0] - b[0]);
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
