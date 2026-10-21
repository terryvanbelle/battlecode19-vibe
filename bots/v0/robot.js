// Entry point. One MyRobot instance lives in each robot's sandbox for the robot's whole life; module state is
// per robot. The engine appends `var robot = new MyRobot();`.
import { BCAbstractRobot, SPECS } from 'battlecode';
import { CFG } from './config.js';
import { rng, offsets } from './util.js';
import { symmetry, mirror, depots, clusters } from './mapinfo.js';
import { STATS, CASTLE, CHURCH, PILGRIM } from './specs.js';
import { castleTurn } from './castle.js';
import { churchTurn } from './church.js';
import { pilgrimTurn } from './pilgrim.js';
import { militaryTurn } from './military.js';

class MyRobot extends BCAbstractRobot {
  init() {
    const me = this.me;
    this.n = this.map.length;
    this.rnd = rng(me.id);
    this.sym = symmetry(this.map, this.karbonite_map, this.fuel_map);
    if (this.sym === 'HV') this.sym = 'V'; // indistinguishable maps are mirror-symmetric both ways; either works
    this.deps = depots(this.karbonite_map, this.fuel_map);
    this.clusters = me.unit === CASTLE || me.unit === CHURCH || me.unit === PILGRIM ? clusters(this.map, this.karbonite_map, this.fuel_map, this.deps, CFG.CLUSTER_LINK_R2) : [];
    this.moveOffs = STATS[me.unit].speed ? offsets(STATS[me.unit].speed) : [];
    this.round = 0;      // current round, when known (0 = unknown)
    this.birthRound = 0;
    this.state = {};
    this.mirror = (x, y) => mirror(x, y, this.sym, this.n);
  }

  // Robots of either team with known position; enemies are those with a team different from ours.
  scan() {
    const vis = this.getVisibleRobots(), myTeam = this.me.team;
    this.visible = vis;
    this.enemies = []; this.friends = [];
    for (const r of vis) {
      if (r.unit === undefined || r.x === undefined) continue;
      if (r.team === myTeam) { if (r.id !== this.me.id) this.friends.push(r); } else this.enemies.push(r);
    }
    this.robotMap = this.getVisibleRobotMap();
  }

  visibleTile(x, y) { return x >= 0 && y >= 0 && x < this.n && y < this.n && this.robotMap[y][x] >= 0; }
  freeTile(x, y) { return x >= 0 && y >= 0 && x < this.n && y < this.n && this.map[y][x] && this.robotMap[y][x] === 0; }

  turn() {
    const t0 = Date.now();
    let action = null;
    try {
      if (this.me.turn === 1) this.init();
      if (this.round) this.round++;
      this.scan();
      const u = this.me.unit;
      action = u === CASTLE ? castleTurn(this) : u === CHURCH ? churchTurn(this) : u === PILGRIM ? pilgrimTurn(this) : militaryTurn(this);
    } catch (e) {
      this.log('EXC ' + (e && e.stack ? e.stack : e));
      action = null;
    }
    const ms = Date.now() - t0;
    if (ms > CFG.TIME_SLOW_MS) this.log('TIME ' + ms + ' unit ' + this.me.unit + ' turn ' + this.me.turn);
    return action;
  }
}
