// Behaviour switches. Every candidate change goes behind a switch here whose default is the incumbent behaviour.
export const CFG = {
  // economy
  SERVE_MOVES: 4,            // a depot within this many pilgrim moves (speed r2 4) of a structure is mined from it
  CLUSTER_LINK_R2: 10,       // depots within this r2 of each other form one cluster
  CLAIM_MARGIN: 1,           // church a remote cluster if our distance <= enemy's + margin (moves)
  MAX_PIONEERS: 2,           // church pioneers in flight per castle
  PIONEER_MIN_ROUND: 2,
  DEPOT_COOL: 30,            // turns before re-staffing a depot whose pilgrim died, per death there
  DEPOT_COOL_MAX: 150,
  KARB_FIRST: 2,             // karbonite depots assigned per fuel depot while fuel is not short
  FUEL_LOW: 400,             // below this fuel the next pilgrim takes a fuel depot (if any is free)
  FUEL_HIGH: 2000,           // above this fuel the next pilgrim takes karbonite (if any is free)
  // military production
  GUARD_BASE: 2,             // peacetime prophets wanted per structure at round 0
  GUARD_ROUNDS: 40,          // one more wanted per this many rounds
  GUARD_MAX: 25,
  MIL_FUEL_RESERVE: 300,     // peacetime military builds keep this much fuel back (movement and mining need it)
  MIL_FUEL_PER_UNIT: 10,     // ...plus this much per military unit we have (each needs fuel to shoot and move)
  FUEL_PER_KARB: 2.5,        // staff fuel depots while fuel < this x karbonite (and below FUEL_HIGH)
  CRUISE_R2: 2,              // largest step for unhurried military moves (fuel cost is r2 x fuel/move)
  PILGRIM_FAST_FUEL: 1000,  // pilgrims take full r2 4 steps only above this fuel
  SWITCH_FUEL_LOW: 150,      // an empty-handed karbonite miner moves to fuel when fuel < this and karbonite >= ...
  SWITCH_KARB_HIGH: 200,
  SWITCH_KARB_LOW: 30,       // ...and a fuel miner moves to karbonite when karbonite < this and fuel >= ...
  SWITCH_FUEL_HIGH: 3000,
  SWITCH_KING: 8,            // only to depots within this many king steps
  SHOOT_FLOOR: 30,           // military units do not shoot the team's fuel below this
  PREACHER_EVERY: 4,         // every Nth peacetime defender is a preacher (when MIL_ROTATION is null)
  // Damage per fuel: crusader 1.0, prophet 0.4, preacher 1.33 plus splash; HP per karbonite 2.7, 0.8, 2.0.
  MIL_ROTATION: [4, 3, 4, 3, 5],   // peacetime build order by unit type (prophet 4, crusader 3, preacher 5)
  RESERVE_CHURCH_K: 50,      // karbonite kept back while a pioneer is out
  PIONEER_RESERVE: 0,        // 1: ...and pilgrim + church karbonite (60) while a castle has a pioneer due (on poor
                             // maps the peacetime army spent every 25 K and no church was ever built: seed 1755)
  // lattice
  LATTICE_MIN_R2: 5,         // lattice tiles at least this far (r2) from any structure
  LATTICE_ADVANCE: 0.35,     // weight of advancing toward the enemy in lattice tile choice
  // attack
  ATTACK_ROUND: 450,         // castles call a general attack from this round when the army is big
  ATTACK_MIN_ARMY: 20,
  ATTACK_FUEL_PER_UNIT: 0,   // attack orders need this much fuel per military unit (30 in h2: rejected, 17/40 vs h1)
  HOME_GUARD_FRAC: 0,        // military units that ignore attack orders before round 900 (0.3 in h2: rejected)
  ATTACK_PERSIST: 0,         // 1: units report destroyed enemy castles (CT.DEAD), castles drop them and radio the next
                             // target map-wide (FAR.WIDE); units without orders wait where they are, not at home
  ATTACK_WAIT: 40,           // ...for this many rounds
  // endgame
  ENDGAME_MARGIN: 6,
  ENDGAME_FUEL: 0,           // >0: from this round all fuel goes into preachers (health breaks round-1000 ties; a
                             // preacher is 60 HP per 50 fuel, crusader 40, prophet 20): no pilgrims, churches or
                             // reserves, and military units more than 3 king steps from home stop cruising
  // sparring
  RUSH: 0,                   // >0: crusader rush from this round (a sparring partner build, see tools/build_bot.js --cfg)
  // time
  TIME_SLOW_MS: 30,
};
