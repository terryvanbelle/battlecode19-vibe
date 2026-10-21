// Combat evaluation: threat ranges, target choice, preacher splash, retreat steps. Pure functions over robot lists
// ({id, team, unit, x, y}) as the engine reports them.
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2 } from './util.js';

// How dangerous a unit type is, and how much we want to kill it (higher first).
export const PRIORITY = [2, 1, 3, 5, 5, 6];
// r2 within which an enemy of this type can hit us next turn (attack range grown by one move).
export const THREAT_R2 = [64, 0, 0, 49, 64, 36];

export function isAttacker(u) { return u === CASTLE || u === CRUSADER || u === PROPHET || u === PREACHER; }

// Best single target in the attack band of a unit at (x, y). Ties: closer, then lower id (so allies focus).
export function pickTarget(unit, x, y, enemies) {
  const s = STATS[unit]; let best = null, bp = -1, bd = 1e9;
  for (const e of enemies) {
    const r = d2(x, y, e.x, e.y); if (r < s.atkMin || r > s.atkMax) continue;
    const p = PRIORITY[e.unit];
    if (p > bp || (p === bp && (r < bd || (r === bd && e.id < best.id)))) { best = e; bp = p; bd = r; }
  }
  return best;
}

// Preacher: the tile in the attack band (visible) with the best splash value. Friendly hits weigh 1.5x an enemy hit,
// structures of ours 3x. Returns {dx, dy, value} or null when nothing is worth hitting.
export function preacherTarget(x, y, robots, myTeam, visibleTile) {
  const s = STATS[PREACHER]; let best = null, bv = 0;
  const near = robots.filter(r => r.x !== undefined && r.unit !== undefined && d2(x, y, r.x, r.y) <= 36);
  for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
    const r2 = dx * dx + dy * dy; if (r2 < s.atkMin || r2 > s.atkMax) continue;
    const tx = x + dx, ty = y + dy; if (!visibleTile(tx, ty)) continue;
    let v = 0, hitsEnemy = false;
    for (const r of near) {
      if (d2(tx, ty, r.x, r.y) > s.splash) continue;
      if (r.team === myTeam) v -= (r.unit === CASTLE || r.unit === CHURCH) ? 3 : 1.5;
      else { v += PRIORITY[r.unit] >= 5 ? 2 : 1; hitsEnemy = true; }
    }
    if (hitsEnemy && v > bv) { bv = v; best = { dx, dy, value: v }; }
  }
  return best;
}

// Choose the move (from offs, within maxR2) that best increases the margin to every threat. Returns [dx,dy] or null
// if staying is at least as good.
export function retreatStep(x, y, threats, offs, maxR2, free) {
  const margin = (px, py) => { let m = 1e9; for (const t of threats) { const v = d2(px, py, t.x, t.y) - THREAT_R2[t.unit]; if (v < m) m = v; } return m; };
  let best = null, bm = margin(x, y);
  for (const o of offs) {
    if (o[2] > maxR2) continue;
    const nx = x + o[0], ny = y + o[1]; if (!free(nx, ny)) continue;
    const m = margin(nx, ny); if (m > bm) { bm = m; best = [o[0], o[1]]; }
  }
  return best;
}
export { PILGRIM };
