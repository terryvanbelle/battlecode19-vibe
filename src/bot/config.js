// Behaviour switches. Every candidate change goes behind a switch here whose default is the incumbent behaviour.
export const CFG = {
  CASTLE_SERVE_KING: 6,      // a depot within this many king steps of a castle is mined from the castle
  CHURCH_SERVE_KING: 6,      // ... of a church
  CLUSTER_LINK_R2: 18,       // depots closer than this (r2) belong to the same cluster
  CLAIM_MARGIN: 2,           // claim a remote cluster if our king distance <= enemy's + margin
  PIONEER_MIN_ROUND: 3,      // castles start sending church pioneers from this round
  KARB_PER_FUEL_MINER: 2,    // karbonite miners per fuel miner when both are available
  RESERVE_K: 0,              // karbonite kept back from military builds in peace
  DEFENDERS_PER_STRUCT: 6,   // (v0 production) peacetime prophet target per structure, scaled by round
  PROD_V1: true,             // v1 production: prophet guard grows with the round; surplus karbonite -> crusaders
  GUARD_MAX: 14,             // v1: prophets kept within r2 100 of each structure
  GUARD_ROUNDS: 40,          // v1: one more guard prophet per this many rounds (from 2)
  SURPLUS_KEEP_K: 30,        // v1: karbonite left in the bank after a surplus crusader
  ADAPT_MINERS: true,        // choose karbonite vs fuel depots from the stores, not a fixed ratio
  ENDGAME_ROUND: 930,        // churches (which cannot count structures) dump karbonite into crusaders from here
  ENDGAME_MARGIN: 8,         // castles start the dump when the bank needs this many rounds more than remain
  ATTACK_MIN_ARMY: 20,       // a castle launches a wave when this many military units are within r2 144
  ATTACK_MIN_ROUND: 150,
  ATTACK_SIGNAL_R2: 144,
  MAX_PIONEERS: 2,           // church pioneers in flight per castle
  LATTICE_MIN_R2: 5,         // lattice tiles at least this far (r2) from the structure
  TIME_SLOW_MS: 15,          // log a TIME line when a turn takes longer than this
};
