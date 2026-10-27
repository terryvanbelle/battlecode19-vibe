// land.mjs TEAM REPLAY: who holds the map's resource clusters at rounds 100, 200, 300, 500 and the game's end.
// Clusters as the bot forms them (mapinfo.js clusters, CLUSTER_LINK_R2): a cluster is held by a team when one of its
// living castles or churches stands within HOLD king steps of a depot. Each cluster is TEAM's half or theirs by
// king-step BFS from the starting castles (ties to neither). Prints one JSON line per checkpoint: round, our and their
// churches, clusters ours / theirs / both / free, the free ones on our half and their depots, theirs on our half
// (theirsOurHalf), ours on theirs (oursTheirHalf), our bank (karbonite, fuel) and pilgrims. The question (ECONOMICS
// section 3): the church gap opens after r100 (in v8's losses we built 5 churches r100-200, they built 45).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { clusters } from '../../src/bot/mapinfo.js';
import { CFG } from '../../src/bot/config.js';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const HOLD = 4, AT = [100, 200, 300, 500];
const king = (a, b, x, y) => Math.max(Math.abs(a - x), Math.abs(b - y));
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/land.mjs TEAM REPLAY'); process.exit(2); }

// King-step BFS from sources over passable tiles.
function field(pass, n, src) {
  const d = new Int32Array(n * n).fill(-1), q = [];
  for (const [x, y] of src) { d[y * n + x] = 0; q.push(y * n + x); }
  for (let h = 0; h < q.length; h++) {
    const i = q[h], x = i % n, y = (i - x) / n;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const X = x + dx, Y = y + dy, j = Y * n + X;
      if (X < 0 || Y < 0 || X >= n || Y >= n || !pass[j] || d[j] >= 0) continue;
      d[j] = d[i] + 1; q.push(j);
    }
  }
  return d;
}

let cl = null, half = null, last = 0, out = [];
function snap(round, g) {
  const s = g.robots.filter(r => r.unit <= 1), mine = s.filter(r => r.team === team), them = s.filter(r => r.team !== team);
  const holds = (set, c) => set.some(r => c.depots.some(d => king(r.x, r.y, d.x, d.y) <= HOLD));
  const o = { round, churches: mine.filter(r => r.unit === 1).length, theirChurches: them.filter(r => r.unit === 1).length,
    ours: 0, theirs: 0, both: 0, free: 0, freeOurs: 0, freeOursDepots: 0, freeTheirs: 0, theirsOurHalf: 0, oursTheirHalf: 0,
    karbonite: g.karbonite[team], fuel: g.fuel[team], pilgrims: g.robots.filter(r => r.team === team && r.unit === 2).length };
  cl.forEach((c, i) => {
    const a = holds(mine, c), b = holds(them, c);
    if (a && b) o.both++; else if (a) { o.ours++; if (half[i] < 0) o.oursTheirHalf++; } else if (b) { o.theirs++; if (half[i] > 0) o.theirsOurHalf++; }
    else { o.free++; if (half[i] > 0) { o.freeOurs++; o.freeOursDepots += c.depots.length; } else if (half[i] < 0) o.freeTheirs++; }
  });
  out.push(o);
}
const { game } = simulate(fs.readFileSync(f), {
  onStart(g) {
    const n = g.map.length, N = n * n, pass = new Uint8Array(N), karb = new Uint8Array(N), fuelD = new Uint8Array(N);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x; pass[i] = g.map[y][x] ? 1 : 0; karb[i] = g.karbonite_map[y][x] ? 1 : 0; fuelD[i] = g.fuel_map[y][x] ? 1 : 0;
    }
    const w = { n, N, pass, karb, fuelD }, deps = [];
    for (let i = 0; i < N; i++) if (karb[i] || fuelD[i]) deps.push({ i: deps.length, x: i % n, y: (i - i % n) / n, k: karb[i] === 1 });
    cl = clusters(w, deps, CFG.CLUSTER_LINK_R2);
    const cs = g.robots.filter(r => r.unit === 0);
    const fu = field(pass, n, cs.filter(r => r.team === team).map(r => [r.x, r.y]));
    const ft = field(pass, n, cs.filter(r => r.team !== team).map(r => [r.x, r.y]));
    half = cl.map(c => { const k = c.site[1] * n + c.site[0], a = fu[k] < 0 ? 999 : fu[k], b = ft[k] < 0 ? 999 : ft[k]; return Math.sign(b - a); });
  },
  onRoundEnd(round, g) {
    last = round;
    if (AT.includes(round)) snap(round, g);
  },
});
if (!AT.includes(last)) snap(last, game);
for (const o of out) console.log(JSON.stringify(o));
