// Combat evaluation: threat ranges, target choice, preacher splash, retreat steps. Pure functions over canonical
// robot lists ({team, unit, x, y}). Ties break by canonical position (never id): allies converge on one target and
// mirror twins choose mirror targets.
import { STATS, CASTLE, CHURCH, PILGRIM, CRUSADER, PROPHET, PREACHER } from './specs.js';
import { d2 } from './util.js';

// How much we want to kill each unit type (higher first).
export const PRIORITY = [2, 1, 3, 5, 6, 6];
// r2 within which an enemy of this type can hit a tile next turn (attack range grown by one move); 0 = harmless.
export const THREAT_R2 = [64, 0, 0, 49, 64, 36];

export function isAttacker(u) { return u === CASTLE || u === CRUSADER || u === PROPHET || u === PREACHER; }

// Best single target in the attack band of a unit at (x, y). n: board size, for the positional tie-break.
// friends (CFG.FOCUS): our robots in sight; among targets of the best priority, the one most of our attackers there
// can also hit comes first (they choose by the same rule, so fire converges: enemy HP is never visible), then nearer.
export function pickTarget(unit, x, y, enemies, n, friends) {
  const s = STATS[unit]; let best = null, bp = -1, bc = -1, bd = 1e9, bk = 1e9;
  for (const e of enemies) {
    const r = d2(x, y, e.x, e.y); if (r < s.atkMin || r > s.atkMax) continue;
    const p = PRIORITY[e.unit], k = e.y * n + e.x;
    if (p < bp) continue;
    const c = friends ? cover(e, friends) : 0;
    if (p > bp || c > bc || (c === bc && (r < bd || (r === bd && k < bk)))) { best = e; bp = p; bc = c; bd = r; bk = k; }
  }
  return best;
}
// How many of these robots can hit e where they stand.
export function cover(e, robots) {
  let c = 0;
  for (const f of robots) { const S = STATS[f.unit], r = d2(f.x, f.y, e.x, e.y); if (S.damage && r >= S.atkMin && r <= S.atkMax) c++; }
  return c;
}

// Preacher: the visible tile in the attack band with the best splash value. Friendly hits weigh 1.5x an enemy hit,
// our structures 3x. robots: all placed robots (canonical). Returns {dx, dy, value} or null.
export function preacherTarget(x, y, robots, myTeam, visible) {
  const s = STATS[PREACHER]; let best = null, bv = 0;
  const near = robots.filter(r => r.seen && d2(x, y, r.x, r.y) <= 36);
  for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
    const r2 = dx * dx + dy * dy; if (r2 < s.atkMin || r2 > s.atkMax) continue;
    const tx = x + dx, ty = y + dy; if (!visible(tx, ty)) continue;
    let v = 0, hits = false;
    for (const r of near) {
      if (d2(tx, ty, r.x, r.y) > s.splash) continue;
      if (r.team === myTeam) v -= (r.unit === CASTLE || r.unit === CHURCH) ? 3 : 1.5;
      else { v += PRIORITY[r.unit] >= 5 ? 2 : r.unit === CASTLE ? 1.5 : 1; hits = true; }
    }
    if (hits && v > bv) { bv = v; best = { dx, dy, value: v }; }
  }
  return best;
}

// The move (offsets within maxR2) that most increases the margin to every threat; null if staying is at least as good.
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
