// Map analysis on canonical flat arrays (index y*n+x): depots, clusters with church sites, distance fields.
import { d2 } from './util.js';
import { CFG } from './config.js';

export function depots(w) {
  const n = w.n, out = [];
  for (let i = 0; i < w.N; i++) if (w.karb[i] || w.fuelD[i]) out.push({ i: out.length, x: i % n, y: (i - i % n) / n, k: w.karb[i] === 1 });
  return out;
}

// Group depots into clusters (single link, r2 <= link). Each cluster gets a church site: the passable non-depot tile
// that is adjacent (king step) to the most of its depots, then minimises the largest r2 to its depots, then the sum,
// then scan order. Clusters are ordered by site position: every robot computes the same indices.
export function clusters(w, deps, link) {
  const n = w.n, parent = deps.map((_, i) => i);
  const find = i => { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
  for (let i = 0; i < deps.length; i++) for (let j = i + 1; j < deps.length; j++)
    if (d2(deps[i].x, deps[i].y, deps[j].x, deps[j].y) <= link) parent[find(i)] = find(j);
  const groups = new Map();
  for (let i = 0; i < deps.length; i++) { const r = find(i); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(deps[i]); }
  const out = [];
  for (const members of groups.values()) {
    let x0 = n, x1 = 0, y0 = n, y1 = 0;
    for (const d of members) { if (d.x < x0) x0 = d.x; if (d.x > x1) x1 = d.x; if (d.y < y0) y0 = d.y; if (d.y > y1) y1 = d.y; }
    let best = null, ba = -1, bm = Infinity, bs = Infinity;
    for (let y = Math.max(0, y0 - 2); y <= Math.min(n - 1, y1 + 2); y++) for (let x = Math.max(0, x0 - 2); x <= Math.min(n - 1, x1 + 2); x++) {
      const i = y * n + x;
      if (!w.pass[i] || w.karb[i] || w.fuelD[i]) continue;
      let m = 0, s = 0, adj = 0;
      for (const d of members) { const r = d2(x, y, d.x, d.y); if (r > m) m = r; s += r; if (r <= 2) adj++; }
      if (adj > ba || (adj === ba && (m < bm || (m === bm && s < bs)))) { ba = adj; bm = m; bs = s; best = [x, y]; }
    }
    if (!best) continue;
    out.push({ i: 0, depots: members, site: best, nk: members.filter(d => d.k).length, nf: members.filter(d => !d.k).length });
  }
  out.sort((a, b) => a.site[1] - b.site[1] || a.site[0] - b.site[0]);
  out.forEach((c, i) => { c.i = i; for (const d of c.depots) d.cluster = i; });
  return out;
}

// BFS over passable tiles with a move set (offsets [dx,dy,r2]) from source tiles; counts moves. -1 = unreachable.
export function bfs(w, sources, offs) {
  const n = w.n, d = new Int16Array(w.N).fill(-1), q = new Int16Array(w.N);
  let h = 0, t = 0;
  for (const [x, y] of sources) { if (x < 0 || y < 0 || x >= n || y >= n) continue; const i = y * n + x; if (w.pass[i] && d[i] < 0) { d[i] = 0; q[t++] = i; } }
  const L = offs.length;
  while (h < t) {
    const c = q[h++], x = c % n, y = (c - x) / n, nd = d[c] + 1;
    for (let j = 0; j < L; j++) {
      const nx = x + offs[j][0], ny = y + offs[j][1];
      if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
      const k = ny * n + nx; if (d[k] < 0 && w.pass[k]) { d[k] = nd; q[t++] = k; }
    }
  }
  return d;
}

// Like bfs, but entering tile i costs cost(i) >= 1 moves (integer): a bucket-queue Dijkstra. Int32 distances.
export function costField(w, sources, offs, cost) {
  const n = w.n, d = new Int32Array(w.N).fill(-1), buckets = [[]];
  for (const [x, y] of sources) { if (x < 0 || y < 0 || x >= n || y >= n) continue; const i = y * n + x; if (w.pass[i] && d[i] < 0) { d[i] = 0; buckets[0].push(i); } }
  const L = offs.length;
  for (let b = 0; b < buckets.length; b++) {
    const q = buckets[b]; if (!q) continue;
    for (let h = 0; h < q.length; h++) {
      const c = q[h]; if (d[c] !== b) continue;   // stale entry
      const x = c % n, y = (c - x) / n;
      for (let j = 0; j < L; j++) {
        const nx = x + offs[j][0], ny = y + offs[j][1];
        if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
        const k = ny * n + nx; if (!w.pass[k]) continue;
        const nd = b + cost(k);
        if (d[k] >= 0 && d[k] <= nd) continue;
        d[k] = nd; (buckets[nd] || (buckets[nd] = [])).push(k);
      }
    }
    buckets[b] = null;
  }
  return d;
}

// Map analysis shared by economic roles, computed once per robot when first needed. Both results are assigned at
// once: the engine can kill a turn at any point (200 ms), and the next turn must then start over, not crash.
export function econ(B) {
  if (!B.deps || !B.clusters) { const d = depots(B.w), c = clusters(B.w, d, CFG.CLUSTER_LINK_R2); B.deps = d; B.clusters = c; }
  return B;
}
