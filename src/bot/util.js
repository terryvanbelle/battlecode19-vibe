// Small pure helpers: RNG, geometry, offsets. All geometry is in the canonical frame (world.js).
// Seeded from a robot's canonical birth tile and birth round, never its id: mirror twins share a sequence.
export function rng(seed) {
  let s = (seed * 2654435761) >>> 0 || 0x9e3779b9;
  return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}
export function d2(ax, ay, bx, by) { const dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; }
export function king(ax, ay, bx, by) { return Math.max(Math.abs(ax - bx), Math.abs(ay - by)); }
// All offsets with min <= r2 <= max, sorted by r2, then by a fixed geometric order (canonical frame: symmetric).
export function offsets(max, min = 1) {
  const out = [], m = Math.floor(Math.sqrt(max));
  for (let dy = -m; dy <= m; dy++) for (let dx = -m; dx <= m; dx++) {
    const r = dx * dx + dy * dy;
    if (r >= min && r <= max) out.push([dx, dy, r]);
  }
  out.sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0]);
  return out;
}
export const ADJ = offsets(2);
