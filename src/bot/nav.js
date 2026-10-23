// Navigation: per-robot BFS move fields over static terrain (cached by destination key), descended greedily around
// robots. Stuck ladder: a blocked robot waits one turn, then may slide (equal field value), then may step back
// (+1) to get round a jam; it never returns to one of its last few tiles while sliding or escaping. Detour (optional):
// a robot blocked long enough replans with a field that charges extra for every tile a robot it sees stands on.
import { bfs, costField } from './mapinfo.js';
import { CFG } from './config.js';

const LADDER = [2, 4, false];

export class Nav {
  constructor(w, offs, rnd, cacheSize = 6) {
    this.w = w; this.offs = offs; this.rnd = rnd; this.cache = new Map(); this.cacheSize = cacheSize;
    this.blocked = 0; this.recent = []; this.lastKey = null; this.stats = { moves: 0, blocked: 0, slides: 0, escapes: 0 };
  }

  field(key, sources, offs = this.offs) {
    let f = this.cache.get(key);
    if (f) { this.cache.delete(key); this.cache.set(key, f); return f; } // LRU touch
    f = bfs(this.w, typeof sources === 'function' ? sources() : sources, offs);
    this.cache.set(key, f);
    if (this.cache.size > this.cacheSize) this.cache.delete(this.cache.keys().next().value);
    return f;
  }

  // A field in which entering tile i costs cost(i) moves, cached like field() under its own key.
  costed(key, sources, offs, cost) {
    let f = this.cache.get(key);
    if (f) { this.cache.delete(key); this.cache.set(key, f); return f; }
    f = costField(this.w, typeof sources === 'function' ? sources() : sources, offs, cost);
    this.cache.set(key, f);
    if (this.cache.size > this.cacheSize) this.cache.delete(this.cache.keys().next().value);
    return f;
  }

  // Distance (moves) from the robot's tile to the key's sources, -1 if unreachable.
  dist(key, sources) { const w = this.w; return this.field(key, sources)[w.me.y * w.n + w.me.x]; }

  // Choose a step toward the key's sources. maxR2: largest step allowed (fuel). avoid(x,y): tiles to never enter.
  // ladder: [slide after, step back after] this many blocked turns, and whether a slide or step back restarts the
  // count (otherwise a long-blocked robot slides every turn). detour: [after, penalty, every, memory]: once blocked
  // `after` turns, follow (for the rest of this key, rebuilt every `every` turns) a field in which each tile a friend
  // was seen on within the last `memory` turns costs `penalty` extra moves, so a jam out of sight still repels.
  // costed: {sig, cost(i)}: follow a field in which entering tile i costs cost(i) moves (cached per sig).
  // Returns [dx, dy] or null (arrived, unreachable, or waiting).
  step(key, sources, maxR2, avoid, ladder = LADDER, detour = null, costed = null) {
    const w = this.w, n = w.n, me = w.me;
    // CFG.NAV_FIT: a step capped below full speed follows a field counted in such steps. In full-speed moves a short
    // step lowers the distance only every other tile (every third for a crusader), and the robot counted itself
    // blocked and waited before sliding on: a third of cruise and slow-pilgrim turns were lost that way.
    let offs = this.offs, fkey = key;
    if (CFG.NAV_FIT && maxR2 > 0 && maxR2 < offs[offs.length - 1][2]) {
      offs = offs.filter(o => o[2] <= maxR2); fkey = key + '#' + offs[offs.length - 1][2];
    }
    let f = costed ? this.costed(fkey + '!' + costed.sig, sources, offs, costed.cost) : this.field(fkey, sources, offs);
    if (key !== this.lastKey) { this.blocked = 0; this.lastKey = key; this.det = null; }
    if (detour) {
      const seen = this.seenBusy || (this.seenBusy = new Int16Array(w.N));
      for (const r of w.friends) seen[r.y * n + r.x] = me.turn;
      if (this.det || this.blocked >= detour[0]) {
        if (!this.det || me.turn >= this.det.until) {
          const src = typeof sources === 'function' ? sources() : sources, mi = me.y * n + me.x, t0 = me.turn - detour[3];
          const cost = i => (seen[i] > 0 && seen[i] >= t0 && i !== mi ? 1 + detour[1] : 1);
          this.det = { until: me.turn + detour[2], f: costField(w, src, offs, cost) };
          this.stats.detours = (this.stats.detours || 0) + 1;
        }
        f = this.det.f;
      }
    }
    const cur = f[me.y * n + me.x];
    if (cur === 0 || maxR2 <= 0) return null;
    const pick = (limit) => {
      let best = null, bv = 1e9, br = 99, bt = 2;
      for (const o of this.offs) {
        if (o[2] > maxR2) continue;
        const nx = me.x + o[0], ny = me.y + o[1];
        if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
        const v = f[ny * n + nx];
        if (v < 0 || v > limit) continue;
        if (w.occ(nx, ny) !== 0) continue;
        if (avoid && avoid(nx, ny)) continue;
        if (limit >= cur && this.recent.indexOf(ny * n + nx) >= 0) continue;
        const t = this.rnd();
        if (v < bv || (v === bv && (o[2] < br || (o[2] === br && t < bt)))) { best = o; bv = v; br = o[2]; bt = t; }
      }
      return best;
    };
    let s = cur < 0 ? pick(1e9 - 1) : pick(cur - 1);
    if (!s && cur > 0) {
      this.blocked++; this.stats.blocked++;
      if (this.blocked >= ladder[0]) { s = pick(cur); if (s) this.stats.slides++; }
      if (!s && this.blocked >= ladder[1]) { s = pick(cur + 1); if (s) this.stats.escapes++; }
      if (s && ladder[2]) this.blocked = 0;
    } else this.blocked = 0;
    if (!s) return null;
    this.recent.push(me.y * n + me.x); if (this.recent.length > 4) this.recent.shift();
    this.stats.moves++;
    return [s[0], s[1]];
  }
}

// Largest step r2 the team's fuel allows while keeping `reserve` fuel, for a unit paying fpm fuel per r2.
export function fuelStep(fuel, speed, fpm, reserve) {
  let r = speed;
  while (r > 0 && fuel < r * fpm + reserve) r--;
  return r;
}
