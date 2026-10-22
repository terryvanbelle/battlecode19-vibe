// Behaviour switches. Every candidate change goes behind a switch here whose default is the incumbent behaviour.
export const CFG = {
  // economy
  SERVE_MOVES: 4,            // a depot within this many pilgrim moves (speed r2 4) of a structure is mined from it
  CLUSTER_LINK_R2: 10,       // depots within this r2 of each other form one cluster
  CLAIM_MARGIN: 1,           // church a remote cluster if our distance <= enemy's + margin (moves)
  MAX_PIONEERS: 2,           // church pioneers in flight per castle
  PLAN_CONTEST_FIRST: 0,     // >0: planned clusters the enemy reaches within this many moves of us are pioneered first
  PIONEER_MIN_ROUND: 2,
  EXPAND_ROUND: 0,           // >0: from this round castles re-plan every 50 rounds, adding remote clusters on either half
                             // more than EXPAND_KEEP king steps from every enemy castle (castle.js expandPlan; h19's
                             // turn-3 plan is used up by round ~200 in self-play, while StoneT2000's bot1v43 churched
                             // 30 clusters on replica seed 2924, three on our half)
  EXPAND_KEEP: 12,
  EXPAND_SEEN: 5,            // ...and a pioneer that sees an enemy structure this near its site reports it taken (CT.TAKEN)
  DEPOT_COOL: 30,            // turns before re-staffing a depot whose pilgrim died, per death there
  DEPOT_COOL_MAX: 150,
  KARB_FIRST: 2,             // karbonite depots assigned per fuel depot while fuel is not short
  FUEL_LOW: 400,             // below this fuel the next pilgrim takes a fuel depot (if any is free)
  FUEL_HIGH: 2000,           // above this fuel the next pilgrim takes karbonite (if any is free)
  // military production
  GUARD_BASE: 2,             // peacetime prophets wanted per structure at round 0
  GUARD_ROUNDS: 40,          // one more wanted per this many rounds
  GUARD_MAX: 25,
  ECON_UNTIL: 0,             // >0: no peacetime army before this round (threat responses still build), so karbonite goes
                             // to pilgrims and church pioneers (replica seed 826 vs CometsTech, round 100: eigthbot 8
                             // churches, 47 pilgrims, no military; v3 3 churches, 21 pilgrims, 19 military)
  MIL_FUEL_RESERVE: 300,     // peacetime military builds keep this much fuel back (movement and mining need it)
  MIL_FUEL_PER_UNIT: 10,     // ...plus this much per military unit we have (each needs fuel to shoot and move)
  FUEL_PER_KARB: 2.5,        // staff fuel depots while fuel < this x karbonite (and below FUEL_HIGH)
  CRUISE_R2: 2,              // largest step for unhurried military moves (fuel cost is r2 x fuel/move)
  CRUISE_FUEL_RESERVE: 60,   // unhurried military moves leave this much team fuel (shots need it; seed 2202: a
                             // marching army burned 10,100 fuel in 50 rounds, then nothing could shoot or mine)
  CRUISE_SLIDE_AFTER: 2,     // unhurried moves: blocked turns before a sideways slide / a step back (seed 2202:
  CRUISE_ESCAPE_AFTER: 4,    // slides and step-backs were 11,500 of 19,400 move fuel, an army jammed in a corridor)
  CRUISE_RESET: 0,           // 1: a slide or step back restarts that count (0: a long-blocked robot slides every turn)
  DETOUR: 0,                 // >0: once a cruise move is blocked DETOUR_AFTER turns, it routes (rebuilt every
  DETOUR_AFTER: 3,           // DETOUR_EVERY turns) with each tile a friend stood on in the last DETOUR_MEMORY turns
  DETOUR_EVERY: 10,          // costing this many extra moves: traffic spills onto other routes instead of queueing
  DETOUR_MEMORY: 30,         // in one corridor
  PILGRIM_FAST_FUEL: 1000,  // pilgrims take full r2 4 steps only above this fuel
  PILGRIM_SAFE_STEP: 0,      // 1: pilgrims never step into a visible enemy attacker's threat range (pilgrim.js stepAvoid)
  NAV_FIT: 0,                // 1: steps capped below full speed (cruise r2 2, slow pilgrims) follow a field counted in
                             // such steps; 0: the full-speed field, on which they lose a turn every other tile
  SWITCH_FUEL_LOW: 150,      // an empty-handed karbonite miner moves to fuel when fuel < this and karbonite >= ...
  SWITCH_KARB_HIGH: 200,
  SWITCH_KARB_LOW: 30,       // ...and a fuel miner moves to karbonite when karbonite < this and fuel >= ...
  SWITCH_FUEL_HIGH: 3000,
  SWITCH_KING: 8,            // only to depots within this many king steps
  RELAY: 0,                  // 1: a full pilgrim not next to our structure hands its cargo to a friend next to one (a
                             // military unit, or a pilgrim mining the other resource), and military units deposit
                             // cargo at an adjacent structure (seed 2202: a fuel miner boxed in by a parked crusader
                             // sat full for 824 turns, a quarter of that map's fuel depots)
  KARB_STOP: 0,              // >0: karbonite miners stop mining while the team holds this much karbonite
  SHOOT_FLOOR: 30,           // military units do not shoot the team's fuel below this
  PROPHET_FLOOR: 30,         // ...prophets below this (they deal 0.4 damage per fuel, castles and crusaders 1.0,
                             // preachers 1.33: when fuel is short it goes to the efficient shooters first)
  PREACHER_EVERY: 4,         // every Nth peacetime defender is a preacher (when MIL_ROTATION is null)
  // Damage per fuel: crusader 1.0, prophet 0.4, preacher 1.33 plus splash; HP per karbonite 2.7, 0.8, 2.0.
  MIL_ROTATION: [4, 3, 4, 3, 5],   // peacetime build order by unit type (prophet 4, crusader 3, preacher 5)
  MIX_BY_STOCK: null,        // [hi, lo]: a peacetime unit is a crusader while fuel / karbonite in the bank >= hi
                             // (karbonite binds: most HP per K) and a preacher while <= lo (fuel binds: most damage
                             // per fuel); the rotation between (h35 lost gate seeds 905 and 2855 with K 0 and F
                             // 12,540 / 13,916 unspent; it won 2202, 241, 357 with K 3,000-8,700 and F ~60)
  RESERVE_CHURCH_K: 50,      // karbonite kept back while a pioneer is out
  DEF_RESERVE_K: 0,          // >0: every karbonite spend but a threat response (pilgrims, pioneers, churches, the
                             // peacetime army) leaves this much in the bank, so a structure that sees attackers can
                             // build a preacher (30 K) at once (replica seed 1915: the castle had spent its karbonite
                             // on a church and fell to five crusaders at round 29)
  PLAN_SERVE_PILGRIM: 0,     // 1: church planning counts a depot as served by pilgrim moves (as staffing does), and
                             // churches a cluster with >= 2 unserved depots (or all, if smaller); 0: any depot within
                             // 2*SERVE_MOVES king steps marks the whole cluster served (seed 1755: never staffed)
  PIONEER_RESERVE: 0,        // 1: ...and pilgrim + church karbonite (60) while a castle has a pioneer due (on poor
                             // maps the peacetime army spent every 25 K and no church was ever built: seed 1755);
                             // 2: every castle, while no church stands and any castle planned one (castle.js pioneerDue)
  PIONEER_RESERVE_UNTIL: 100,  // ...mode 2 only before this round
  FRONT_ROUND: 0,            // >0: from this round a structure with none of ours ahead in sight sends a pilgrim to build
                             // a church FRONT_STEP rows toward the enemy (struct.js frontPioneer), at most every
  FRONT_EVERY: 50,           // ...this many rounds (replica seed 2924: StoneT2000's church lines took our castles)
  FRONT_STEP: 8,
  // lattice
  LATTICE_MIN_R2: 5,         // lattice tiles at least this far (r2) from the home structure
  KEEP_CLEAR: 0,             // 1: idle military units keep off depots, tiles next to our structures and chokepoints
  LATTICE_R: 12,             // idle military units hold lattice tiles within this many king steps of their home
                             // structure (replica: eigthbot's lattice grows from every structure toward the middle,
                             // round 460 of seed 1036, and its front reaches the enemy castles)
  LATTICE_STICKY: 0,         // 1: an idle unit keeps walking to its chosen lattice tile until it sees it taken (choosing
                             // afresh each turn flips between tiles out of sight, seed 2202: military.js holdTarget);
                             // 2: ...and a tile it saw taken in the last LATTICE_MEMORY turns does not count as free
  LATTICE_MEMORY: 20,
  KILL_ZONE: 0,              // >0: a military unit of ours that vanishes where it could not have walked out of sight died
                             // there; for this many turns idle units hold no lattice tile within KZ_R2 of that tile
                             // beyond 2 tiles short of its distance from home (military.js inZone; replica scrim 199
                             // seed 1915: 40 prophets walked one by one onto a tile an unseen prophet covered)
  KZ_R2: 64,
  CREEP_ROUND: 0,            // >0: from this round each unit's lattice moves 1 tile toward the enemy every CREEP_EVERY
  CREEP_EVERY: 8,            // rounds (military.js latticeCentre): the army advances as a formation
  // attack
  ATTACK_ROUND: 450,         // castles call a general attack from this round when the army is big
  ATTACK_MIN_ARMY: 20,
  ATTACK_FUEL_PER_UNIT: 0,   // attack orders need this much fuel per military unit (30 in h2: rejected, 17/40 vs h1)
  HOME_GUARD_FRAC: 0,        // military units that ignore attack orders before round 900 (0.3 in h2: rejected)
  WAVE: 0,                   // >0: after the first attack call, call again only once this many military units are
  WAVE_GAP: 15,              // idle (units report marching over castle talk), on 3 rounds, then wait this many rounds
  ATTACK_EVERY: 5,           // castles repeat the attack call (20 fuel) every this many rounds (5: ~4,400 fuel a game)
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
