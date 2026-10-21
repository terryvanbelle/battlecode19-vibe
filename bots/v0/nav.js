// Navigation: BFS move fields over a unit's move set, and greedy steps that descend them.
// A field counts moves (turns) to the nearest source tile; sources are the destination tiles.
export function moveField(pass, sources, offs) {
  const n = pass.length, d = new Int16Array(n * n).fill(-1), q = new Int16Array(n * n);
  let h = 0, t = 0;
  for (const [x, y] of sources) if (x >= 0 && y >= 0 && x < n && y < n && pass[y][x] && d[y * n + x] < 0) { d[y * n + x] = 0; q[t++] = y * n + x; }
  while (h < t) {
    const c = q[h++], x = c % n, y = (c - x) / n, nd = d[c] + 1;
    for (let i = 0; i < offs.length; i++) {
      const nx = x + offs[i][0], ny = y + offs[i][1];
      if (nx < 0 || ny < 0 || nx >= n || ny >= n || !pass[ny][nx]) continue;
      const k = ny * n + nx; if (d[k] < 0) { d[k] = nd; q[t++] = k; }
    }
  }
  return d;
}

// Pick the move that most reduces the field value. robotMap: [y][x] ids, 0 empty (visible), -1 unseen.
// maxR2 limits step size (fuel saving). Returns [dx, dy] or null. Ties: smaller r2, then rnd.
// allowSide: also accept moves that keep the same field value (to slide around a blocker).
export function step(field, n, x, y, offs, robotMap, maxR2, rnd, allowSide = false, avoid = null) {
  const cur = field[y * n + x];
  let best = null, bv = cur < 0 ? 32767 : (allowSide ? cur + 1 : cur), br = 99, bt = 2;
  for (let i = 0; i < offs.length; i++) {
    const o = offs[i]; if (o[2] > maxR2) continue;
    const nx = x + o[0], ny = y + o[1];
    if (nx < 0 || ny < 0 || nx >= n || ny >= n || robotMap[ny][nx] !== 0) continue;
    const v = field[ny * n + nx]; if (v < 0) continue;
    if (avoid && avoid(nx, ny)) continue;
    const t = rnd();
    if (v < bv || (v === bv && (o[2] < br || (o[2] === br && t < bt)))) { best = o; bv = v; br = o[2]; bt = t; }
  }
  return best ? [best[0], best[1]] : null;
}
