// Pilgrim: mines its assigned depot and deposits at the nearest friendly structure; a pioneer first builds a church at
// its cluster's site. Flees attackers that could hit it next turn.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, KARB_CAP, FUEL_CAP } from './specs.js';
import { d2, king, ADJ, rng } from './util.js';
import { SIG, dec, encNum, CT } from './comms.js';
import { econ } from './mapinfo.js';
import { fuelStep } from './nav.js';
import { isAttacker, retreatStep, THREAT_R2 } from './combat.js';

function init(B) {
  econ(B);
  const w = B.w, me = w.me, st = B.st;
  st.structs = [];  // known friendly castles/churches {x, y}
  for (const r of w.friends) {
    if (king(r.x, r.y, me.x, me.y) > 1 || (r.unit !== CASTLE && r.unit !== CHURCH)) continue;
    if (r.unit === CASTLE) B.birthRound = r.turn; // castles act every round from round 1 and have acted this round
    if (r.signal > 0) {
      const m = dec(r.signal);
      if (m.type === SIG.MINE) st.target = depotAt(B, m.x, m.y);
      else if (m.type === SIG.CHURCH) { st.site = [m.x, m.y]; st.cluster = B.clusters.findIndex(c => c.site[0] === m.x && c.site[1] === m.y); }
      else if (m.type === SIG.ROUND) B.birthRound = m.v;
    }
  }
  if (B.birthRound) B.round = B.birthRound;
  B.rnd = rng(((B.birthRound || 0) * 4096 + me.y * 64 + me.x) * 8 + me.unit); B.nav.rnd = B.rnd;
  if (!st.target && !st.site) st.target = freeDepotNear(B, me.x, me.y, null);
}

function depotAt(B, x, y) { for (const d of B.deps) if (d.x === x && d.y === y) return d; return null; }

// Nearest depot (king distance) that no robot is seen on, optionally restricted to a cluster; karbonite first on ties.
function freeDepotNear(B, x, y, cluster) {
  const w = B.w, list = cluster ? cluster.depots : B.deps; let best = null, bd = 1e9;
  for (const d of list) {
    const occ = w.occ(d.x, d.y);
    if (occ > 0 && occ !== w.me.id) continue;
    const k = king(x, y, d.x, d.y) * 2 + (d.k ? 0 : 1);
    if (k < bd) { bd = k; best = d; }
  }
  return best;
}

function adjSources(x, y) { return ADJ.map(([dx, dy]) => [x + dx, y + dy]); }

function go(B, key, sources) {
  const w = B.w;
  const r = fuelStep(w.fuel, 4, 1, w.fuel > 300 ? 0 : 40);
  const s = B.nav.step(key, sources, w.fuel > CFG.PILGRIM_FAST_FUEL ? r : Math.min(r, 2));
  return s ? w.move(s[0], s[1]) : null;
}

export function pilgrimTurn(B) {
  const w = B.w, me = w.me, st = B.st;
  if (me.turn === 1) init(B);
  // Learn structures in sight; forget ones whose tile we see empty.
  for (const r of w.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && !st.structs.some(s => s.x === r.x && s.y === r.y)) { st.structs.push({ x: r.x, y: r.y }); st.depKey = null; }
  st.structs = st.structs.filter(s => { if (w.occ(s.x, s.y) === 0) { st.depKey = null; return false; } return true; });

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
      if (occ === 0 && w.karbonite >= STATS[CHURCH].costK && w.fuel >= STATS[CHURCH].costF + 2) {
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
        const i = me.y * w.n + me.x;
        if ((w.karb[i] && me.karbonite < KARB_CAP) || (w.fuelD[i] && me.fuel < FUEL_CAP)) return w.fuel >= 1 ? w.mine() : null;
        return null;
      }
    } else return go(B, 'site', adjSources(sx, sy));
  }

  // Deposit when full.
  if (me.karbonite >= KARB_CAP || me.fuel >= FUEL_CAP) {
    for (const s of st.structs) if (king(me.x, me.y, s.x, s.y) === 1) return w.give(s.x - me.x, s.y - me.y, me.karbonite, me.fuel);
    if (!st.structs.length) return null;
    if (!st.depKey) st.depKey = 'dep:' + st.structs.map(s => s.x + ',' + s.y).join(';');
    const src = []; for (const s of st.structs) src.push(...adjSources(s.x, s.y));
    return go(B, st.depKey, src);
  }

  // Mine.
  if (!st.target) st.target = freeDepotNear(B, me.x, me.y, null);
  const t = st.target; if (!t) return null;
  if (me.x === t.x && me.y === t.y) return w.fuel >= 1 ? w.mine() : null;
  const occ = w.occ(t.x, t.y);
  if (occ > 0) { // taken: choose the nearest free depot
    const alt = freeDepotNear(B, t.x, t.y, null);
    if (alt && alt !== t) st.target = alt;
  }
  return go(B, 'd' + st.target.i, [[st.target.x, st.target.y]]);
}
