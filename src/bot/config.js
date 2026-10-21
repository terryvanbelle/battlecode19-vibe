// Behaviour switches. Every candidate change goes behind a switch here whose default is the incumbent behaviour.
export const CFG = {
  // economy
  SERVE_MOVES: 4,            // a depot within this many pilgrim moves (speed r2 4) of a structure is mined from it
  CLUSTER_LINK_R2: 10,       // depots within this r2 of each other form one cluster
  CLAIM_MARGIN: 1,           // church a remote cluster if our distance <= enemy's + margin (moves)
  MAX_PIONEERS: 2,           // church pioneers in flight per castle
  PIONEER_MIN_ROUND: 2,
  KARB_FIRST: 2,             // karbonite depots assigned per fuel depot while fuel is not short
  FUEL_LOW: 400,             // below this fuel the next pilgrim takes a fuel depot (if any is free)
  FUEL_HIGH: 2000,           // above this fuel the next pilgrim takes karbonite (if any is free)
  // military production
  GUARD_BASE: 2,             // peacetime prophets wanted per structure at round 0
  GUARD_ROUNDS: 40,          // one more wanted per this many rounds
  GUARD_MAX: 25,
  MIL_FUEL_RESERVE: 300,     // peacetime military builds keep this much fuel back (movement and mining need it)
  PREACHER_EVERY: 4,         // every Nth peacetime defender is a preacher
  RESERVE_CHURCH_K: 50,      // karbonite kept back while a pioneer is out
  // lattice
  LATTICE_MIN_R2: 5,         // lattice tiles at least this far (r2) from any structure
  LATTICE_ADVANCE: 0.35,     // weight of advancing toward the enemy in lattice tile choice
  // attack
  ATTACK_ROUND: 450,         // castles call a general attack from this round when the army is big
  ATTACK_MIN_ARMY: 20,
  // endgame
  ENDGAME_MARGIN: 6,
  // time
  TIME_SLOW_MS: 30,
};
