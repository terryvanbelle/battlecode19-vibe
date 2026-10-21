// Crusaders, prophets, preachers: shoot the best target; keep prophets out of reach of melee; otherwise hold a
// checkerboard lattice around the home structure.
import { CFG } from './config.js';
import { STATS, CASTLE, CHURCH, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2, king } from './util.js';
import { moveField, step } from './nav.js';
import { SIG, dec } from './comms.js';
import { isAttacker, pickTarget, preacherTarget, retreatStep } from './combat.js';

function init(bot) {
  const me = bot.me, st = bot.state;
  st.home = null;
  for (const r of bot.friends) if ((r.unit === CASTLE || r.unit === CHURCH) && king(r.x, r.y, me.x, me.y) <= 1) {
    st.home = { x: r.x, y: r.y }; st.homeId = r.id;
    if (r.unit === CASTLE) bot.round = r.turn;
  }
  if (!st.home) st.home = { x: me.x, y: me.y };
  st.fields = new Map();
  st.targets = [];   // enemy castle positions heard in ATTACK orders
}

// ATTACK orders come from our castles: accept a radio only from a robot we can see is ours, or from home.
function listen(bot) {
  const st = bot.state, me = bot.me;
  for (const r of bot.visible) {
    if (!(r.signal > 0) || r.id === me.id) continue;
    if (r.team !== me.team && r.id !== st.homeId) continue;
    const m = dec(r.signal);
    if (m.type === SIG.ATTACK && !st.targets.some(t => t[0] === m.x && t[1] === m.y)) st.targets.push([m.x, m.y]);
  }
  // Drop targets seen to be gone.
  st.targets = st.targets.filter(([x, y]) => {
    if (!bot.visibleTile(x, y)) return true;
    const id = bot.robotMap[y][x];
    return id > 0 && bot.enemies.some(e => e.id === id && e.unit === CASTLE);
  });
}

function bandSources(bot, tx, ty) {
  const S = STATS[bot.me.unit], out = [], m = Math.floor(Math.sqrt(S.atkMax));
  for (let dy = -m; dy <= m; dy++) for (let dx = -m; dx <= m; dx++) {
    const r = dx * dx + dy * dy; if (r >= Math.max(1, S.atkMin) && r <= S.atkMax) out.push([tx + dx, ty + dy]);
  }
  return out;
}

function moveTo(bot, key, sources, maxR2) {
  const st = bot.state, me = bot.me;
  let f = st.fields.get(key);
  if (!f) { f = moveField(bot.map, sources, bot.moveOffs); st.fields.set(key, f); if (st.fields.size > 4) st.fields.delete(st.fields.keys().next().value); }
  const s = step(f, bot.n, me.x, me.y, bot.moveOffs, bot.robotMap, maxR2, bot.rnd);
  return s ? bot.move(s[0], s[1]) : null;
}

function fuelR2(bot, maxR2) {
  const fpm = STATS[bot.me.unit].fuelPerMove; let r = maxR2;
  while (r > 0 && bot.fuel < r * fpm + 50) r--;
  return r;
}

// A lattice tile: (x + y) even, passable, not a depot, not adjacent to the home structure.
function latticeOk(bot, x, y) {
  const h = bot.state.home;
  return ((x + y) & 1) === 0 && bot.map[y][x] && !bot.karbonite_map[y][x] && !bot.fuel_map[y][x] && d2(x, y, h.x, h.y) >= CFG.LATTICE_MIN_R2;
}

function latticeTarget(bot) {
  const me = bot.me, h = bot.state.home, n = bot.n;
  let best = null, bd = 1e9;
  for (let dy = -9; dy <= 9; dy++) for (let dx = -9; dx <= 9; dx++) {
    const x = h.x + dx, y = h.y + dy;
    if (x < 0 || y < 0 || x >= n || y >= n || !latticeOk(bot, x, y)) continue;
    const occ = bot.robotMap[y][x];
    if (occ > 0 && occ !== me.id) continue;
    const v = d2(x, y, h.x, h.y) * 4 + d2(x, y, me.x, me.y);
    if (v < bd) { bd = v; best = [x, y]; }
  }
  return best;
}

export function militaryTurn(bot) {
  const me = bot.me, st = bot.state, u = me.unit, S = STATS[u];
  if (me.turn === 1) init(bot);
  listen(bot);
  const enemies = bot.enemies;
  const canShoot = bot.fuel >= S.atkFuel;

  // Prophets: step away from melee threats that are inside our minimum range.
  if (u === PROPHET) {
    const melee = enemies.filter(e => (e.unit === CRUSADER || e.unit === PREACHER) && d2(me.x, me.y, e.x, e.y) < S.atkMin + 9);
    if (melee.length && bot.fuel >= 8) {
      const s = retreatStep(me.x, me.y, melee, bot.moveOffs, 4, (x, y) => bot.freeTile(x, y));
      if (s && !(canShoot && pickTarget(u, me.x, me.y, enemies) && melee.every(e => d2(me.x, me.y, e.x, e.y) >= S.atkMin))) return bot.move(s[0], s[1]);
    }
  }

  if (canShoot) {
    if (u === PREACHER) {
      const t = preacherTarget(me.x, me.y, bot.visible, me.team, (x, y) => bot.visibleTile(x, y));
      if (t) return bot.attack(t.dx, t.dy);
    } else {
      const t = pickTarget(u, me.x, me.y, enemies);
      if (t) return bot.attack(t.x - me.x, t.y - me.y);
    }
  }

  // Engage visible enemies near home (or near us when marching); ignore the rest.
  const h = st.home, marching = st.targets.length > 0;
  const near = enemies.filter(e => marching ? d2(e.x, e.y, me.x, me.y) <= 64 : d2(e.x, e.y, h.x, h.y) <= 196);
  if (near.length && u !== PROPHET) {
    const e = near.reduce((a, b) => d2(me.x, me.y, a.x, a.y) <= d2(me.x, me.y, b.x, b.y) ? a : b);
    const r = fuelR2(bot, S.speed);
    if (r > 0) return moveTo(bot, 'e' + e.x + ',' + e.y, [[e.x, e.y], ...[[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [e.x + dx, e.y + dy])], r);
    return null;
  }

  // March on the nearest known enemy castle.
  if (marching) {
    const t = st.targets.reduce((a, b) => d2(me.x, me.y, a[0], a[1]) <= d2(me.x, me.y, b[0], b[1]) ? a : b);
    const r = fuelR2(bot, S.speed);
    return r > 0 ? moveTo(bot, 'A' + t[0] + ',' + t[1], bandSources(bot, t[0], t[1]), r) : null;
  }

  // Hold the lattice.
  if (latticeOk(bot, me.x, me.y) && d2(me.x, me.y, h.x, h.y) <= 100) return null;
  const t = latticeTarget(bot);
  if (!t) return null;
  const r = fuelR2(bot, Math.min(S.speed, 4));
  return r > 0 ? moveTo(bot, 'l' + t[0] + ',' + t[1], [t], r) : null;
}
export { isAttacker };
