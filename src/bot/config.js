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
  MIL_FUEL_RESERVE: 300,
  MIL_FUEL_PER_UNIT: 10,     // ...plus this much per military unit we have (each needs fuel to shoot and move)
  FUEL_PER_KARB: 2.5,        // staff fuel depots while fuel < this x karbonite (and below FUEL_HIGH)
  CRUISE_R2: 2,              // largest step for unhurried military moves (fuel cost is r2 x fuel/move)
  PILGRIM_FAST_FUEL: 1000,   // pilgrims take full r2 4 steps only above this fuel     // peacetime military builds keep this much fuel back (movement and mining need it)
  PREACHER_EVERY: 4,         // every Nth peacetime defender is a preacher
  RESERVE_CHURCH_K: 50,      // karbonite kept back while a pioneer is out
  // lattice
  LATTICE_MIN_R2: 5,         // lattice tiles at least this far (r2) from any structure
  LATTICE_ADVANCE: 0.35,     // weight of advancing toward the enemy in lattice tile choice
  // attack
  ATTACK_ROUND: 450,         // castles call a general attack from this round when the army is big
  ATTACK_MIN_ARMY: 20,
  ATTACK_FUEL_PER_UNIT: 30,  // attack orders need this much fuel per military unit
  HOME_GUARD_FRAC: 0.3,      // military units that ignore attack orders before round 900
  // endgame
  ENDGAME_MARGIN: 6,
  // time
  TIME_SLOW_MS: 30,
};
