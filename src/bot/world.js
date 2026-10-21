// The canonical frame. Every robot of a team sees the board transformed so that its own team's starting half is the
// TOP (small y) and the mirror axis is horizontal (y -> n-1-y). Bot logic never touches engine coordinates: it reads
// this World and acts through it, and the World converts every action back. Because the two teams' canonical worlds
// are identical at the start of a game, every decision is mirror-symmetric by construction (owner, PROMPTS 4 and 6),
// provided the logic never depends on robot ids, team colour or the order of the engine's visible list.
//
// Why the frame can be fixed by team colour: the generator places team 0's (red) castles in the half it generates
// first and mirrors it (game.js:166-170, 293-327): the top half on horizontally mirrored maps ('H', y -> h-1-y), the
// left half on transposed maps ('V', x -> w-1-x). So red keeps the engine frame (transposed on V maps) and blue
// flips across the axis.
//   H, red:  c = (x, y)          H, blue: c = (x, n-1-y)
//   V, red:  c = (y, x)          V, blue: c = (y, n-1-x)
import { STATS } from './specs.js';

// 'H' if the map is mirror-symmetric across the horizontal midline (y -> n-1-y), else 'V' if across the vertical one;
// 'H' when both hold (both images are then identical boards; castles follow the generator's choice, see castle.js).
export function detectSymmetry(pass, karb, fuel) {
  const n = pass.length; let h = true, v = true;
  for (let y = 0; y < n && (h || v); y++) {
    const ry = n - 1 - y;
    for (let x = 0; x < n; x++) {
      if (h && (pass[y][x] !== pass[ry][x] || karb[y][x] !== karb[ry][x] || fuel[y][x] !== fuel[ry][x])) h = false;
      const rx = n - 1 - x;
      if (v && (pass[y][x] !== pass[y][rx] || karb[y][x] !== karb[y][rx] || fuel[y][x] !== fuel[y][rx])) v = false;
    }
  }
  return h ? 'H' : v ? 'V' : 'H';
}

// Pure coordinate transforms (exported for tests). Return [x, y] in the target frame.
export function makeTransform(sym, team, n) {
  const m = n - 1;
  if (sym === 'H') {
    if (team === 0) return { toC: (x, y) => [x, y], toE: (x, y) => [x, y], dirE: (dx, dy) => [dx, dy] };
    return { toC: (x, y) => [x, m - y], toE: (x, y) => [x, m - y], dirE: (dx, dy) => [dx, 0 - dy] };
  }
  if (team === 0) return { toC: (x, y) => [y, x], toE: (x, y) => [y, x], dirE: (dx, dy) => [dy, dx] };
  // c = (y, m - x)  =>  x = m - cy, y = cx
  return { toC: (x, y) => [y, m - x], toE: (cx, cy) => [m - cy, cx], dirE: (dx, dy) => [0 - dy, dx] };
}

export class World {
  // api: the BCAbstractRobot instance (engine frame). Called on the robot's first turn, when the maps are present.
  constructor(api) {
    this.api = api;
    const pass = api.map, karb = api.karbonite_map, fuel = api.fuel_map, n = pass.length;
    this.n = n; this.N = n * n;
    this.team = api.me.team;
    this.sym = detectSymmetry(pass, karb, fuel);
    const T = makeTransform(this.sym, this.team, n);
    this.T = T;
    this.pass = new Uint8Array(n * n); this.karb = new Uint8Array(n * n); this.fuelD = new Uint8Array(n * n);
    this.EX = new Uint8Array(n * n); this.EY = new Uint8Array(n * n);
    for (let cy = 0; cy < n; cy++) for (let cx = 0; cx < n; cx++) {
      const [ex, ey] = T.toE(cx, cy), i = cy * n + cx;
      this.EX[i] = ex; this.EY[i] = ey;
      this.pass[i] = pass[ey][ex] ? 1 : 0; this.karb[i] = karb[ey][ex] ? 1 : 0; this.fuelD[i] = fuel[ey][ex] ? 1 : 0;
    }
  }

  // Refresh per-turn state: me (canonical copy), stores, visible robots (canonical copies, position order).
  update() {
    const api = this.api, n = this.n, T = this.T, e = api.me;
    const [mx, my] = T.toC(e.x, e.y);
    this.me = { id: e.id, team: e.team, unit: e.unit, x: mx, y: my, health: e.health, karbonite: e.karbonite, fuel: e.fuel, turn: e.turn };
    this.karbonite = api.karbonite; this.fuel = api.fuel; this.sentR2 = 0;
    this.shadow = api.getVisibleRobotMap();
    const vis = api.getVisibleRobots(), placed = [], unplaced = [];
    for (const r of vis) {
      const c = { id: r.id, team: r.team, unit: r.unit, turn: r.turn, signal: r.signal, signal_radius: r.signal_radius, castle_talk: r.castle_talk, x: -1, y: -1, seen: r.unit !== undefined && r.x !== undefined };
      if (r.x !== undefined) { const [cx, cy] = T.toC(r.x, r.y); c.x = cx; c.y = cy; placed.push(c); }
      else unplaced.push(c);
    }
    placed.sort((a, b) => (a.y * n + a.x) - (b.y * n + b.x));
    this.robots = placed; this.unplaced = unplaced;
    this.enemies = []; this.friends = [];
    for (const r of placed) {
      if (!r.seen) continue;
      if (r.team === this.team) { if (r.id !== e.id) this.friends.push(r); } else this.enemies.push(r);
    }
  }

  inb(x, y) { return x >= 0 && y >= 0 && x < this.n && y < this.n; }
  // Robot id at a canonical tile: >0 robot, 0 empty, -1 out of vision. Off-board: -2.
  occ(x, y) { if (x < 0 || y < 0 || x >= this.n || y >= this.n) return -2; const i = y * this.n + x; return this.shadow[this.EY[i]][this.EX[i]]; }
  passable(x, y) { return x >= 0 && y >= 0 && x < this.n && y < this.n && this.pass[y * this.n + x] === 1; }
  free(x, y) { return this.passable(x, y) && this.occ(x, y) === 0; }
  isDepot(x, y) { const i = y * this.n + x; return this.karb[i] === 1 || this.fuelD[i] === 1; }
  // The mirror image (enemy's view of the same tile) in the canonical frame.
  mirror(x, y) { return [x, this.n - 1 - y]; }

  // Actions, canonical offsets in, engine actions out.
  move(dx, dy) { const [a, b] = this.T.dirE(dx, dy); return this.api.move(a, b); }
  attack(dx, dy) { const [a, b] = this.T.dirE(dx, dy); return this.api.attack(a, b); }
  build(unit, dx, dy) { const [a, b] = this.T.dirE(dx, dy); return this.api.buildUnit(unit, a, b); }
  give(dx, dy, k, f) { const [a, b] = this.T.dirE(dx, dy); return this.api.give(a, b, k, f); }
  mine() { return this.api.mine(); }
  signal(v, r2) { this.api.signal(v, r2); this.sentR2 = r2; }
  talk(v) { this.api.castleTalk(v); }
  log(s) { this.api.log(s); }

  canAfford(unit, reserveK = 0, reserveF = 0) {
    return this.karbonite >= STATS[unit].costK + reserveK && this.fuel >= STATS[unit].costF + reserveF;
  }
}
