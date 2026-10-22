// Church plan and depot service of one team's castles on a map, as the bot computes them by turn 3 (castle.js
// planClusters, struct.js structInit): per castle the depots it staffs (SERVE_MOVES pilgrim moves) and the clusters
// it plans to church; then the depots on our side of the map (nearer our castles than their mirrors, king steps)
// that no castle staffs and no plan churches: orphans, which only EXPAND_ROUND or a church nearby can reach.
// Each planned cluster: c<index>@(site) d<king steps from us> m<their steps minus ours> n<depots>.
// Canonical frame (our castles on top). Usage: node tools/plan.mjs <seed> [--team 0|1] [--cfg KEY=JSON ...]
import { createRequire } from 'node:module';
import { CFG } from '../src/bot/config.js';
import { World } from '../src/bot/world.js';
import { castleTurn } from '../src/bot/castle.js';
import { bfs } from '../src/bot/mapinfo.js';
import { rng, offsets } from '../src/bot/util.js';
const require = createRequire(import.meta.url);
const Game = require('../engine/node_modules/bc19/game.js');
const KING = offsets(2), PILGRIM = offsets(4);

function worldFor(g, r) {
  const n = g.map.length, shadow = Array.from({ length: n }, () => Array(n).fill(0));
  for (const q of g.robots) shadow[q.y][q.x] = q.id;
  const api = { map: g.map, karbonite_map: g.karbonite_map, fuel_map: g.fuel_map, me: r, karbonite: 0, fuel: 0,
    getVisibleRobotMap: () => shadow, getVisibleRobots: () => g.robots.map(q => ({ ...q })), log() {},
    move: () => null, attack: () => null, buildUnit: () => null, give: () => null, mine: () => null, signal() {}, castleTalk() {} };
  const w = new World(api); w.update(); return w;
}

// The castles' state after turn 3: [{B, x, y}] in canonical order.
export function planOf(seed, team) {
  const g = new Game(seed, 100, 20, false, false);
  const cs = g.robots.filter(r => r.team === team && r.unit === 0);
  const Bs = cs.map(() => ({ st: {}, deps: null, clusters: null, rnd: rng(1), round: 1, birthRound: 1 }));
  for (const t of [1, 2, 3]) cs.forEach((c, i) => {
    c.turn = t; const w = worldFor(g, c), B = Bs[i]; B.w = w; B.api = w.api;
    if (t === 3) cs.forEach((o, j) => { if (j !== i) { o.turn = 1; const wo = worldFor(g, o); o.turn = t; B.st.castles.set(o.id, { x: wo.me.x, y: wo.me.y }); } });
    castleTurn(B);
  });
  return Bs.map(B => ({ B, x: B.w.me.x, y: B.w.me.y })).sort((a, b) => a.y - b.y || a.x - b.x);
}

export function report(seed, team) {
  const cs = planOf(seed, team), B0 = cs[0].B, w = B0.w, n = w.n, deps = B0.deps, clusters = B0.clusters;
  const ours = bfs(w, cs.map(c => [c.x, c.y]), KING), theirs = bfs(w, cs.map(c => w.mirror(c.x, c.y)), KING);
  const pf = bfs(w, cs.map(c => [c.x, c.y]), PILGRIM);
  const served = new Set(), planned = new Set(), out = [];
  out.push(`seed ${seed} team ${team}  map ${n}x${n}  ${cs.length} castles  ${deps.length} depots in ${clusters.length} clusters`);
  for (const { B, x, y } of cs) {
    for (const d of B.st.served) served.add(d.i);
    for (const p of B.st.plan) planned.add(p.cluster);
    const k = B.st.served.filter(d => d.k).length;
    out.push(`castle (${x},${y}): staffs ${B.st.served.length} depots (K ${k} F ${B.st.served.length - k}); plans ` +
      (B.st.plan.map(p => `c${p.cluster}@(${clusters[p.cluster].site})d${p.d}` + (p.m !== undefined ? `m${p.m}` : '') +
        `n${clusters[p.cluster].depots.length}`).join(' ') || 'none'));
  }
  const side = deps.filter(d => { const a = ours[d.y * n + d.x], b = theirs[d.y * n + d.x]; return a >= 0 && (b < 0 || a <= b); });
  const orphans = side.filter(d => !served.has(d.i) && !clusters.some(c => planned.has(c.i) && c.depots.includes(d)));
  const kOf = l => l.filter(d => d.k).length;
  out.push(`our side: ${side.length} depots (K ${kOf(side)}); staffed ${side.filter(d => served.has(d.i)).length}, ` +
    `in planned clusters ${side.filter(d => clusters.some(c => planned.has(c.i) && c.depots.includes(d))).length}, ` +
    `orphans ${orphans.length} (K ${kOf(orphans)})`);
  for (const d of orphans) {
    const c = clusters.find(c => c.depots.includes(d)), i = d.y * n + d.x;
    out.push(`  orphan ${d.k ? 'K' : 'F'} (${d.x},${d.y}) cluster c${c.i} (${c.depots.length} depots, ${c.depots.filter(e => served.has(e.i)).length} staffed)` +
      `  king us ${ours[i]} them ${theirs[i]}  pilgrim moves ${pf[i]}`);
  }
  return { side: side.length, orphans: orphans.length, text: out.join('\n') };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2), seed = +argv[0];
  let team = 0;
  for (let i = 1; i < argv.length; i++) {
    if (argv[i] === '--team') team = +argv[++i];
    else if (argv[i] === '--cfg') { const [k, v] = argv[++i].split(/=(.*)/s); if (!(k in CFG)) throw new Error('unknown CFG key ' + k); CFG[k] = JSON.parse(v); }
  }
  if (!(seed >= 0)) { console.error('usage: plan.mjs <seed> [--team 0|1] [--cfg KEY=JSON ...]'); process.exit(2); }
  console.log(report(seed, team).text);
}
