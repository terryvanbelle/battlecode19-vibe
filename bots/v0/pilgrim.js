// Pilgrim: mines its assigned depot and deposits at the nearest friendly structure; a pioneer first builds a church
// at its cluster's site. Flees attackers.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, PILGRIM, KARB_CAP, FUEL_CAP } from './specs.js';
import { d2, king, ADJ } from './util.js';
import { SIG, dec, encNum, CT_CHURCH } from './comms.js';
import { moveField, step } from './nav.js';
import { isAttacker, retreatStep, THREAT_R2 } from './combat.js';

function init(bot) {
  const me = bot.me, st = bot.state;
  st.structs = [];  // {x, y} of friendly castles/churches we know
  st.fields = new Map();
  for (const r of bot.visible) {
    if (r.x === undefined || king(r.x, r.y, me.x, me.y) > 1 || r.team !== me.team) continue;
    if (r.unit === CASTLE || r.unit === CHURCH) {
      if (r.unit === CASTLE) bot.round = r.turn; // castles act every round from round 1 and have acted this round
      if (r.signal > 0) {
        const m = dec(r.signal);
        if (m.type === SIG.MINE) st.target = depotAt(bot, m.x, m.y);
        else if (m.type === SIG.CHURCH) { st.site = [m.x, m.y]; st.cluster = bot.clusters.findIndex(c => c.site[0] === m.x && c.site[1] === m.y); }
      }
    }
  }
  if (!st.target && !st.site) st.target = freeDepotNear(bot, me.x, me.y, null);
}

function depotAt(bot, x, y) { return bot.deps.find(d => d.x === x && d.y === y) || null; }

// Nearest depot (king distance) that no robot stands on, optionally restricted to a cluster.
function freeDepotNear(bot, x, y, cluster) {
  const list = cluster ? cluster.depots : bot.deps; let best = null, bd = 1e9;
  for (const d of list) {
    const occ = bot.robotMap[d.y][d.x];
    if (occ > 0 && occ !== bot.me.id) continue;
    const k = king(x, y, d.x, d.y) * 2 + (d.k ? 0 : 1);
    if (k < bd) { bd = k; best = d; }
  }
  return best;
}

function field(bot, key, sources) {
  const st = bot.state;
  let f = st.fields.get(key);
  if (!f) { f = moveField(bot.map, sources, bot.moveOffs); st.fields.set(key, f); if (st.fields.size > 6) st.fields.delete(st.fields.keys().next().value); }
  return f;
}

function moveTo(bot, key, sources) {
  const f = field(bot, key, sources), me = bot.me;
  const maxR2 = bot.fuel > 200 ? 4 : bot.fuel > 30 ? 2 : 0;
  if (!maxR2) return null;
  let s = step(f, bot.n, me.x, me.y, bot.moveOffs, bot.robotMap, maxR2, bot.rnd);
  if (!s) { bot.state.stuck = (bot.state.stuck || 0) + 1; if (bot.state.stuck > 2) s = step(f, bot.n, me.x, me.y, bot.moveOffs, bot.robotMap, maxR2, bot.rnd, true); }
  else bot.state.stuck = 0;
  return s ? bot.move(s[0], s[1]) : null;
}

function adjSources(x, y) { return ADJ.map(([dx, dy]) => [x + dx, y + dy]); }

export function pilgrimTurn(bot) {
  const me = bot.me, st = bot.state;
  if (me.turn === 1) init(bot);
  // Learn structures in sight; forget ones whose tile we see empty.
  for (const r of bot.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && !st.structs.some(s => s.x === r.x && s.y === r.y)) { st.structs.push({ x: r.x, y: r.y }); st.depKey = null; }
  st.structs = st.structs.filter(s => { const v = bot.robotMap[s.y][s.x]; if (v === 0) { st.depKey = null; return false; } return true; });

  // Flee attackers that can reach us next turn.
  const threats = bot.enemies.filter(e => isAttacker(e.unit) && d2(me.x, me.y, e.x, e.y) <= THREAT_R2[e.unit]);
  if (threats.length) {
    const s = retreatStep(me.x, me.y, threats, bot.moveOffs, 4, (x, y) => bot.freeTile(x, y));
    if (s && bot.fuel >= 4) return bot.move(s[0], s[1]);
  }

  // Pioneer: build the church at the site.
  if (st.site) {
    const [sx, sy] = st.site;
    if (king(me.x, me.y, sx, sy) === 1) {
      const occ = bot.robotMap[sy][sx];
      if (occ === 0 && bot.karbonite >= STATS[CHURCH].costK && bot.fuel >= STATS[CHURCH].costF + 2) {
        bot.signal(encNum(SIG.ROUND, bot.round), 2);
        if (st.cluster >= 0) bot.castleTalk(CT_CHURCH + st.cluster);
        const act = bot.buildUnit(CHURCH, sx - me.x, sy - me.y);
        st.structs.push({ x: sx, y: sy }); st.depKey = null;
        st.target = freeDepotNear(bot, sx, sy, bot.clusters[st.cluster] || null);
        st.site = null;
        return act;
      }
      if (occ > 0) { // something stands on the site: settle for mining here
        st.target = freeDepotNear(bot, sx, sy, bot.clusters[st.cluster] || null); st.site = null;
      } else {
        // Wait for resources; mine if standing on a depot.
        if ((bot.karbonite_map[me.y][me.x] && me.karbonite < KARB_CAP) || (bot.fuel_map[me.y][me.x] && me.fuel < FUEL_CAP)) return bot.fuel >= 1 ? bot.mine() : null;
        return null;
      }
    } else return moveTo(bot, 'site', adjSources(sx, sy));
  }

  // Deposit when full.
  if (me.karbonite >= KARB_CAP || me.fuel >= FUEL_CAP) {
    for (const s of st.structs) if (king(me.x, me.y, s.x, s.y) === 1) return bot.give(s.x - me.x, s.y - me.y, me.karbonite, me.fuel);
    if (!st.structs.length) return null;
    if (!st.depKey) st.depKey = 'dep:' + st.structs.map(s => s.x + ',' + s.y).join(';');
    const src = []; for (const s of st.structs) src.push(...adjSources(s.x, s.y));
    return moveTo(bot, st.depKey, src);
  }

  // Mine.
  if (!st.target) st.target = freeDepotNear(bot, me.x, me.y, null);
  const t = st.target; if (!t) return null;
  if (me.x === t.x && me.y === t.y) return bot.fuel >= 1 ? bot.mine() : null;
  const occ = bot.robotMap[t.y][t.x];
  if (occ > 0) { // taken: choose the nearest free depot
    const alt = freeDepotNear(bot, t.x, t.y, null);
    if (alt && alt !== t) { st.target = alt; }
  }
  return moveTo(bot, 'd' + st.target.i, [[st.target.x, st.target.y]]);
}
export { PILGRIM };
