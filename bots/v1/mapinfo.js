// Map analysis: symmetry, mirroring, depots, clusters and church sites. Pure functions on [y][x] boolean grids.
import { d2, king } from './util.js';

// 'H': mirror across the horizontal midline (y -> n-1-y); 'V': across the vertical midline (x -> n-1-x).
// Both when the terrain and resources cannot tell them apart.
export function symmetry(pass, karb, fuel) {
  const n = pass.length; let h = true, v = true;
  for (let y = 0; y < n && (h || v); y++) for (let x = 0; x < n; x++) {
    const a = pass[y][x], ak = karb[y][x], af = fuel[y][x];
    if (h && (a !== pass[n - 1 - y][x] || ak !== karb[n - 1 - y][x] || af !== fuel[n - 1 - y][x])) h = false;
    if (v && (a !== pass[y][n - 1 - x] || ak !== karb[y][n - 1 - x] || af !== fuel[y][n - 1 - x])) v = false;
  }
  return h && v ? 'HV' : h ? 'H' : v ? 'V' : 'HV';
}
export function mirror(x, y, sym, n) { return sym === 'H' ? [x, n - 1 - y] : [n - 1 - x, y]; }

export function depots(karb, fuel) {
  const n = karb.length, out = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (karb[y][x]) out.push({ x, y, k: true, i: out.length });
    else if (fuel[y][x]) out.push({ x, y, k: false, i: out.length });
  }
  return out;
}

// Group depots into clusters (single-link, r2 <= link). Each cluster gets a church site: the passable non-depot
// tile minimising the largest r2 to its depots, ties by the sum, then by a fixed scan order.
export function clusters(pass, karb, fuel, deps, link) {
  const n = pass.length, parent = deps.map((_, i) => i);
  const find = i => { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
  for (let i = 0; i < deps.length; i++) for (let j = i + 1; j < deps.length; j++)
    if (d2(deps[i].x, deps[i].y, deps[j].x, deps[j].y) <= link) parent[find(i)] = find(j);
  const groups = new Map();
  for (let i = 0; i < deps.length; i++) { const r = find(i); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(deps[i]); }
  const out = [];
  for (const members of groups.values()) {
    let x0 = n, x1 = 0, y0 = n, y1 = 0;
    for (const d of members) { x0 = Math.min(x0, d.x); x1 = Math.max(x1, d.x); y0 = Math.min(y0, d.y); y1 = Math.max(y1, d.y); }
    let best = null, bm = Infinity, bs = Infinity;
    for (let y = Math.max(0, y0 - 2); y <= Math.min(n - 1, y1 + 2); y++) for (let x = Math.max(0, x0 - 2); x <= Math.min(n - 1, x1 + 2); x++) {
      if (!pass[y][x] || karb[y][x] || fuel[y][x]) continue;
      let m = 0, s = 0;
      for (const d of members) { const r = d2(x, y, d.x, d.y); if (r > m) m = r; s += r; }
      if (m < bm || (m === bm && s < bs)) { bm = m; bs = s; best = [x, y]; }
    }
    if (!best) continue;
    out.push({ i: out.length, depots: members, site: best, nk: members.filter(d => d.k).length, nf: members.filter(d => !d.k).length });
  }
  // A fixed order (by site position) so every robot computes the same indices.
  out.sort((a, b) => a.site[1] - b.site[1] || a.site[0] - b.site[0]);
  out.forEach((c, i) => { c.i = i; });
  return out;
}

// King-step distance field (8-neighbour BFS) over passable tiles from (sx, sy); -1 where unreachable.
export function kingField(pass, sx, sy) {
  const n = pass.length, d = new Int16Array(n * n).fill(-1), q = new Int16Array(n * n);
  let h = 0, t = 0; d[sy * n + sx] = 0; q[t++] = sy * n + sx;
  while (h < t) {
    const c = q[h++], x = c % n, y = (c - x) / n, nd = d[c] + 1;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= n || ny >= n || !pass[ny][nx]) continue;
      const k = ny * n + nx; if (d[k] < 0) { d[k] = nd; q[t++] = k; }
    }
  }
  return d;
}
export { king };
