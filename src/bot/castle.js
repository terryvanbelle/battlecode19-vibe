// Castle: shares positions with the other castles over castle talk, sends church pioneers, runs the structure loop.
import { CFG } from './config.js';
import { CASTLE, PILGRIM } from './specs.js';
import { SIG, encXY, CT_CHURCH } from './comms.js';
import { kingField } from './mapinfo.js';
import { structInit, structTurn, buildToward, canAfford } from './struct.js';

export function castleTurn(bot) {
  const me = bot.me, st = bot.state, n = bot.n;
  bot.round = me.turn; // castles exist from round 1 and act every round
  if (me.turn === 1) {
    structInit(bot, CFG.CASTLE_SERVE_KING);
    st.castles = new Map([[me.id, { x: me.x, y: me.y }]]);
    st.partial = new Map();
    st.churched = new Set();
  }
  // Castle talk: x+1 in round 1, y+1 in round 2.
  if (me.turn === 1) bot.castleTalk(me.x + 1);
  else if (me.turn === 2) bot.castleTalk(me.y + 1);
  const allIds = new Set();
  for (const r of bot.visible) {
    if (r.team !== me.team) continue; // castles see every friendly robot, with team set
    allIds.add(r.id);
    if (r.id === me.id) continue;
    if (me.turn <= 3 && r.castle_talk > 0) {
      // The talk value belongs to the robot's latest turn: round r.turn.
      const p = st.partial.get(r.id) || {};
      if (r.turn === 1) p.x = r.castle_talk - 1; else if (r.turn === 2) p.y = r.castle_talk - 1;
      st.partial.set(r.id, p);
      if (p.x !== undefined && p.y !== undefined) st.castles.set(r.id, { x: p.x, y: p.y });
    } else if (me.turn > 3 && r.castle_talk >= CT_CHURCH) st.churched.add(r.castle_talk - CT_CHURCH);
  }
  if (me.turn === 3) planClusters(bot);
  // A pioneer that disappeared frees its cluster; one that built its church or is overdue is done.
  st.pioneers = st.pioneers.filter(p => {
    if (p.id > 0 && !allIds.has(p.id)) { (st.lost = st.lost || new Set()).add(p.cluster); return false; }
    return !st.churched.has(p.cluster) && me.turn - p.since <= 60;
  });
  st.nStructs = () => st.castles.size + st.churched.size;
  const act = structTurn(bot, allIds, () => pioneer(bot));
  wave(bot);
  return act;
}

// Attack waves: when enough military stands around this castle, radio the enemy castles' positions (one per turn,
// rotating) to everything within ATTACK_SIGNAL_R2. Units that hear it march.
function wave(bot) {
  const st = bot.state, me = bot.me;
  if (me.turn <= 3 || bot._bc_signal_radius > 0) return;
  const army = bot.friends.filter(r => r.unit >= 3 && (r.x - me.x) ** 2 + (r.y - me.y) ** 2 <= CFG.ATTACK_SIGNAL_R2).length;
  if (!st.waving && army >= CFG.ATTACK_MIN_ARMY && me.turn >= CFG.ATTACK_MIN_ROUND) st.waving = 6;
  if (!st.waving) return;
  const targets = [...st.castles.values()].map(c => bot.mirror(c.x, c.y));
  const t = targets[me.turn % targets.length];
  const cost = Math.ceil(Math.sqrt(CFG.ATTACK_SIGNAL_R2));
  if (bot.fuel >= cost + 50) bot.signal(encXY(SIG.ATTACK, t[0], t[1]), CFG.ATTACK_SIGNAL_R2);
  st.waving--;
}

// Remote clusters (not served by any of our castles) that this castle should church, nearest first.
function planClusters(bot) {
  const st = bot.state, n = bot.n, me = bot.me;
  const own = [...st.castles.values()];
  const ownF = own.map(c => kingField(bot.map, c.x, c.y));
  const enemyF = own.map(c => { const [x, y] = bot.mirror(c.x, c.y); return kingField(bot.map, x, y); });
  const myIdx = own.findIndex(c => c.x === me.x && c.y === me.y);
  st.plan = [];
  for (const c of bot.clusters) {
    const [sx, sy] = c.site, k = sy * n + sx;
    const dOwn = ownF.map(f => f[k] < 0 ? 999 : f[k]);
    const dUs = Math.min(...dOwn), dThem = Math.min(...enemyF.map(f => f[k] < 0 ? 999 : f[k]));
    const served = c.depots.some(d => ownF.some(f => { const v = f[d.y * n + d.x]; return v >= 0 && v <= CFG.CASTLE_SERVE_KING; }));
    if (served || dUs > dThem + CFG.CLAIM_MARGIN) continue;
    // Owner: the nearest of our castles; ties by castle position (castles list each other in different orders).
    let owner = -1, bd = 1e9;
    own.forEach((o, i) => { if (dOwn[i] < bd || (dOwn[i] === bd && (o.y * n + o.x) < (own[owner].y * n + own[owner].x))) { bd = dOwn[i]; owner = i; } });
    if (owner === myIdx) st.plan.push({ cluster: c.i, d: dUs, value: c.nk * 2 + c.nf });
  }
  st.plan.sort((a, b) => a.d - b.d || b.value - a.value);
}

function pioneer(bot) {
  const st = bot.state;
  if (!st.plan || st.pioneers.length >= CFG.MAX_PIONEERS || bot.me.turn < CFG.PIONEER_MIN_ROUND) return null;
  const next = st.plan.find(p => !st.churched.has(p.cluster) && !st.pioneers.some(q => q.cluster === p.cluster) &&
    !(st.lost && st.lost.has(p.cluster) && bot.me.turn % 100 !== 0));
  if (!next) return null;
  if (!canAfford(bot, PILGRIM, 50, 200)) return null;
  const c = bot.clusters[next.cluster];
  const b = buildToward(bot, PILGRIM, c.site[0], c.site[1], encXY(SIG.CHURCH, c.site[0], c.site[1]));
  if (!b) return null;
  st.pending = { x: b.x, y: b.y, kind: 'pioneer', ref: next.cluster };
  st.pioneers.push({ id: -1, cluster: next.cluster, since: bot.me.turn });
  return b.act;
}
export { CASTLE };
