// Castle: shares its position with the other castles over castle talk (canonical x+1 on turn 1, y+1 on turn 2),
// plans and sends church pioneers, calls attacks, and runs the structure loop.
// Enemy castles are exactly the mirrors of ours (canonical frame: (x, n-1-y)).
import { CFG } from './config.js';
import { PILGRIM, CRUSADER } from './specs.js';
import { SIG, encXY, CT, FAR } from './comms.js';
import { bfs } from './mapinfo.js';
import { offsets } from './util.js';
import { structInit, structTurn, buildToward } from './struct.js';

const KING = offsets(2);

export function castleTurn(B) {
  const w = B.w, me = w.me, st = B.st;
  B.round = me.turn;
  if (me.turn === 1) {
    structInit(B);
    st.castles = new Map([[me.id, { x: me.x, y: me.y }]]);
    st.partial = new Map();
    st.churched = new Set();
    st.lost = new Map();   // cluster -> round a pioneer for it died
    st.attackUntil = 0;
    st.deadE = new Set();   // indices (into st.order) of enemy castles reported destroyed
    st.lastT = -1;
  }
  if (me.turn === 1) w.talk(me.x + 1);
  else if (me.turn === 2) w.talk(me.y + 1);
  const allIds = new Set();
  st.count = [1, 0, 0, 0, 0, 0];   // our robots by type, from their status bytes (castles: self + talkers)
  const all = w.robots.concat(w.unplaced);
  for (const r of all) {
    if (r.team !== me.team) continue;
    allIds.add(r.id);
    if (r.id === me.id) continue;
    if (r.castle_talk >= CT.UNIT && r.castle_talk < CT.CHURCH) st.count[r.castle_talk - CT.UNIT]++;
    if (me.turn <= 3 && r.castle_talk > 0 && r.castle_talk <= 64) {
      const p = st.partial.get(r.id) || {};
      if (r.turn === 1) p.x = r.castle_talk - 1; else if (r.turn === 2) p.y = r.castle_talk - 1;
      st.partial.set(r.id, p);
      if (p.x !== undefined && p.y !== undefined) st.castles.set(r.id, { x: p.x, y: p.y });
    } else if (me.turn > 3 && r.castle_talk >= CT.CHURCH) st.churched.add(r.castle_talk - CT.CHURCH);
    else if (me.turn > 3 && r.castle_talk >= CT.DEAD && r.castle_talk < CT.DEAD + 4) st.deadE.add(r.castle_talk - CT.DEAD);
  }
  // Our castles in canonical order (fixed at turn 3): enemy castle i is the mirror of st.order[i].
  if (me.turn === 3) st.order = [...st.castles.values()].sort((a, b) => (a.y * w.n + a.x) - (b.y * w.n + b.x));
  if (me.turn === 3) planClusters(B);
  // A castle that disappeared from the id list is dead.
  if (me.turn > 3) for (const id of [...st.castles.keys()]) if (id !== me.id && !allIds.has(id)) st.castles.delete(id);
  // Pioneers: one that disappeared frees its cluster for a later retry; one that built its church or is overdue is done.
  st.pioneers = st.pioneers.filter(p => {
    if (p.id > 0 && !allIds.has(p.id)) { st.lost.set(p.cluster, me.turn); return false; }
    return !st.churched.has(p.cluster) && me.turn - p.since <= 80;
  });
  st.nStructs = () => st.castles.size + st.churched.size;
  callAttack(B);
  st.pioneerDue = !!nextPioneer(B);   // CFG.PIONEER_RESERVE: the peacetime army leaves the pioneer's karbonite alone
  return structTurn(B, allIds, () => pioneer(B));
}

// Remote clusters (no depot served by any of our castles) that this castle should church, nearest first.
function planClusters(B) {
  const w = B.w, st = B.st, n = w.n, me = w.me;
  const own = [...st.castles.values()].sort((a, b) => (a.y * n + a.x) - (b.y * n + b.x));
  const ownF = own.map(c => bfs(w, [[c.x, c.y]], KING));
  const enemyF = own.map(c => bfs(w, [w.mirror(c.x, c.y)], KING));
  const myIdx = own.findIndex(c => c.x === me.x && c.y === me.y);
  st.plan = [];
  for (const c of B.clusters) {
    const [sx, sy] = c.site, k = sy * n + sx;
    const dOwn = ownF.map(f => f[k] < 0 ? 999 : f[k]);
    const dUs = Math.min(...dOwn), dThem = Math.min(...enemyF.map(f => f[k] < 0 ? 999 : f[k]));
    const served = c.depots.some(d => ownF.some(f => { const v = f[d.y * n + d.x]; return v >= 0 && v <= CFG.SERVE_MOVES * 2; }));
    if (served || dUs > dThem + CFG.CLAIM_MARGIN) continue;
    let owner = 0; for (let i = 1; i < own.length; i++) if (dOwn[i] < dOwn[owner]) owner = i;
    if (owner === myIdx) st.plan.push({ cluster: c.i, d: dUs, value: c.nk * 2 + c.nf });
  }
  st.plan.sort((a, b) => a.d - b.d || b.value - a.value || a.cluster - b.cluster);
}

// The next cluster this castle should send a pioneer to now, if any.
function nextPioneer(B) {
  const w = B.w, st = B.st;
  if (!st.plan || st.pioneers.length >= CFG.MAX_PIONEERS || w.me.turn < CFG.PIONEER_MIN_ROUND) return null;
  return st.plan.find(p => !st.churched.has(p.cluster) && !st.pioneers.some(q => q.cluster === p.cluster) &&
    !(st.lost.has(p.cluster) && w.me.turn - st.lost.get(p.cluster) < 100)) || null;
}

function pioneer(B) {
  const w = B.w, st = B.st;
  const next = nextPioneer(B);
  if (!next) return null;
  if (!w.canAfford(PILGRIM, 50, 200)) return null;
  const c = B.clusters[next.cluster];
  const b = buildToward(B, PILGRIM, c.site[0], c.site[1], encXY(SIG.CHURCH, c.site[0], c.site[1]));
  if (!b) return null;
  st.pending = { x: b.x, y: b.y, unit: PILGRIM, kind: 'pioneer', ref: next.cluster };
  st.pioneers.push({ id: -1, cluster: next.cluster, since: w.me.turn });
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
  if (B.round % 5 !== 0) return;
  const targets = [...st.castles.values()].map(c => w.mirror(c.x, c.y));
  targets.sort((a, b) => ((a[0] - me.x) ** 2 + (a[1] - me.y) ** 2) - ((b[0] - me.x) ** 2 + (b[1] - me.y) ** 2) || a[0] - b[0]);
  const t = targets[0];
  if (w.fuel >= 20 + 20) w.signal(encXY(0, t[0], t[1]), FAR.ATTACK);
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
  if (st.deadE.size > 0 && st.lastT !== t && first && w.fuel >= 90 + 40) { st.lastT = t; return w.signal(msg, FAR.WIDE); }
  if (B.round % 5 === 0 && w.fuel >= 20 + 20) w.signal(msg, FAR.ATTACK);
}
