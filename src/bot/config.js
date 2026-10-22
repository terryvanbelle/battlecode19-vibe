// Behaviour switches. Every candidate change goes behind a switch here whose default is the incumbent behaviour.
export const CFG = {
  // economy
  SERVE_MOVES: 2,            // a depot within this many pilgrim moves (speed r2 4) of a structure is mined from it
  CLUSTER_LINK_R2: 10,       // depots within this r2 of each other form one cluster
  CLAIM_MARGIN: 1,           // church a remote cluster if our distance <= enemy's + margin (moves)
  MAX_PIONEERS: 2,           // church pioneers in flight per castle
  PLAN_CONTEST_FIRST: 6,     // >0: planned clusters the enemy reaches within this many moves of us are pioneered first
  PIONEER_MIN_ROUND: 2,
  EXPAND_ROUND: 0,           // >0: from this round castles re-plan every 50 rounds, adding remote clusters on either half
                             // more than EXPAND_KEEP king steps from every enemy castle (castle.js expandPlan; h19's
                             // turn-3 plan is used up by round ~200 in self-play, while StoneT2000's bot1v43 churched
                             // 30 clusters on replica seed 2924, three on our half)
  EXPAND_KEEP: 12,
  EXPAND_SEEN: 5,            // ...and a pioneer that sees an enemy structure this near its site reports it taken (CT.TAKEN)
  PIONEER_GIVEUP: 0,         // >0: a pioneer that goes this many turns with an enemy attacker in sight and no nearer its site
                             // (king steps) than its best gives the site up: reports it taken (CT.TAKEN: castles rest it 200
                             // rounds and free its pioneer slot) and mines (replica seed 1325 self-play: pioneers waited
                             // 105-375 turns beside contested sites; castles re-sent one every ~100 rounds)
  PIONEER_LOST_REST: 100,    // rounds a castle waits before re-sending a pioneer to a cluster where the last one died
  PIONEER_LOST_DOUBLE: 0,    // 1: ...doubled per pioneer lost there (replica scrims vs StoneT2000: 25 of 46 pioneers killed,
                             // castles re-sent one into the same prophets every ~105 rounds)
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
  PIONEER_FAST: 0,           // 1: pioneers take full r2 4 steps whatever the fuel (replica 407-2, seed 1706: our pioneer
                             // to the contested five-karbonite cluster crawled one tile a turn from round 4 and was
                             // killed at 29, 5 king steps short; botfinalsafe held the cluster all game; 2 tiles a turn
                             // costs ~1 more fuel a tile)
  PILGRIM_SAFE_STEP: 1,      // 1: pilgrims never step into a visible enemy attacker's threat range (pilgrim.js stepAvoid)
  PILGRIM_HOT: 0,            // >0: a pilgrim whose target depot sat in a visible attacker's threat range this many turns
  PILGRIM_HOT_MEM: 50,       // in a row retargets to a free depot not threatened and not given up in this many turns
  PILGRIM_HERE: 0,           // 1: a pilgrim whose target depot is taken or hot takes the depot it stands on, else the
                             // nearest free one not hot (pilgrim.js hereRetarget)
  PILGRIM_ORPHAN: 0,         // 1: a pilgrim that knows no living structure of ours walks to our half's unseen cluster
                             // sites (every castle seeds one) until it sees one, instead of standing still
  NAV_FIT: 1,                // 1: steps capped below full speed (cruise r2 2, slow pilgrims) follow a field counted in
                             // such steps; 0: the full-speed field, on which they lose a turn every other tile
  SWITCH_FUEL_LOW: 150,      // an empty-handed karbonite miner moves to fuel when fuel < this and karbonite >= ...
  SWITCH_KARB_HIGH: 200,
  SWITCH_KARB_LOW: 30,       // ...and a fuel miner moves to karbonite when karbonite < this and fuel >= ...
  SWITCH_FUEL_HIGH: 3000,
  SWITCH_KING: 8,            // only to depots within this many king steps
  RELAY: 1,                  // 1: a full pilgrim not next to our structure hands its cargo to a friend next to one (a
                             // military unit, or a pilgrim mining the other resource), and military units deposit
                             // cargo at an adjacent structure (seed 2202: a fuel miner boxed in by a parked crusader
                             // sat full for 824 turns, a quarter of that map's fuel depots)
  KARB_STOP: 0,              // >0: karbonite miners stop mining while the team holds this much karbonite
  SHOOT_FLOOR: 30,           // military units do not shoot the team's fuel below this
  PROPHET_FLOOR: 30,         // ...prophets below this (they deal 0.4 damage per fuel, castles and crusaders 1.0,
                             // preachers 1.33: when fuel is short it goes to the efficient shooters first)
  PREACHER_EVERY: 4,         // every Nth peacetime defender is a preacher (when MIL_ROTATION is null)
  PREACHER_SELF: 1.5,        // a preacher target whose splash includes the shooter counts this against it, as any
                             // friend (diagnostic 1915: a newborn preacher splashed itself for 20 of its 60 HP to add a
                             // church and a pilgrim, and lost the duel with the enemy's preacher by one shot)
  PREACHER_MIL: 2,           // ...and an enemy crusader, prophet or preacher in the splash counts this (a pilgrim or a
                             // church 1): above 2, one enemy preacher outweighs a church and a pilgrim (the same duel:
                             // the first shot has to land on the other preacher)
  STRIKE_R2: 0,              // >0: a structure that sees an enemy church within this r2 and no enemy attacker builds a
                             // preacher toward it first (struct.js strike; seeds 1915, 2030, 2924: mirror churches 1-5
                             // tiles apart, won by whichever side's preacher acted first)
  CHAIN_ROUND: 0,            // >0: from this round castles build church chains at their mirror castles (chain.js: a
                             // pilgrim waits CHAIN_STAGE king steps out until the bank holds CHAIN_K and CHAIN_F, then
                             // church, pilgrim, church... one tile nearer each, all in one round, up to CHAIN_END_R2 of
                             // the castle; each church builds CHAIN_MIX units aimed at it for CHAIN_BURST turns.
                             // Replica scrim 200, seed 2924: StoneT2000's bot1v43 took all three of our castles so)
  CHAIN_STAGE: 12,
  CHAIN_K: 300,              // ...and from CHAIN_ROUND the peacetime army leaves this much karbonite in the bank
  CHAIN_F: 1200,
  CHAIN_END_R2: 49,
  CHAIN_MIX: [5, 3],
  CHAIN_BURST: 40,
  CHAIN_FUEL_KEEP: 100,      // ...burst builds leave this much fuel
  CHAIN_EVERY: 100,          // a castle sends its next chainer this many rounds after the last (none while one waits)
  CHAIN_STAGGER: 30,         // castle i (canonical order) starts at CHAIN_ROUND + i * this
  CHAIN_PATIENCE: 10,        // a chainer that got no nearer for this many turns counts as staged within
  CHAIN_SLACK: 6,            // ...CHAIN_STAGE + this king steps of the target; farther out it quits after
  CHAIN_GIVEUP: 30,          // ...this many such turns
  CHAIN_FIRE_NEAR: 0,        // 1: a threatened chainer starts its line early only within that band too (else it flees)
  CHURCH_FIRST_R2: 0,        // >0: an enemy church within this r2 of a unit's home structure is its first target
  CHURCH_FIRST_V: 3,         // (military.js churchFirst); preachers count it this much in the splash
  HUNT: 0,                   // >0: a pilgrim radios an enemy pilgrim that has stood this many turns on one tile in
                             // our half off any depot (a church-chain builder waiting for its bank; pilgrim.js
                             // huntSpot), every HUNT_EVERY turns while it sees it and the bank holds HUNT_FUEL; idle
  HUNT_EVERY: 3,             // crusaders and preachers within r2 HUNT_R2 of it go for it
  HUNT_FUEL: 150,
  HUNT_R2: 400,
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
  PIONEER_RESERVE: 2,        // 1: ...and pilgrim + church karbonite (60) while a castle has a pioneer due (on poor
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
  LATTICE_STICKY: 2,         // 1: an idle unit keeps walking to its chosen lattice tile until it sees it taken (choosing
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
  MARCH_MASK: 8,             // unit types (bit 3 crusader, 4 prophet, 5 preacher) that obey attack orders before round
                             // 900; the others hold the lattice (replica 616: 160 marching prophets burned 8,700 fuel in
                             // 40 rounds and the team sat at fuel 10-257 from 500 to the end, K 3,800 unspent)
  EDGE: 0,                   // >0: a marching unit that sees enemy attackers does not step into their reach (combat
                             // THREAT_R2) unless our military in its sight, itself included, outnumber them EDGE to 1
                             // (replica 2965: 131 of 132 prophets lost walking into a held line, 106 kills)
  FOCUS: 0,                  // 1: shooters pick, among targets of the best priority, the one most of our attackers in
                             // sight can also hit (enemy HP is never visible; nearest-first spreads fire: a prophet
                             // dies to 2 shots, 4 shots on 4 prophets kill none)
  SPOT: 0,                   // >0: a prophet firing at a non-pilgrim radios its target (FAR.ENEMY, ~10 tiles, 10 fuel)
                             // at most every SPOT turns while a crusader or preacher of ours is in its sight; melee
                             // units that hear it engage it as if seen (gate 2924: 79 of 115 crusaders and 65 of 83
                             // preachers lost never fired; they see 7 and 4 tiles, prophets reach 8)
  SPOT_MASK: 40,             // unit types (bit 3 crusader, 4 prophet, 5 preacher) that hear spots; prophets radio
                             // while one of them is in sight. A prophet that hears one steps to its firing band (r2
                             // 16-64) and holds (replica 2924 r240-272: bot1v43's preachers and prophets took a castle
                             // from 6 churches built in a row 7-12 tiles off it; ours held lattice tiles r2 72-100
                             // from the fight, unseen)
  WAVE: 0,                   // >0: after the first attack call, call again only once this many military units are
  WAVE_GAP: 15,              // idle (units report marching over castle talk), on 3 rounds, then wait this many rounds
  ATTACK_EVERY: 5,           // castles repeat the attack call (20 fuel) every this many rounds (5: ~4,400 fuel a game)
  ATTACK_PERSIST: 0,         // 1: units report destroyed enemy castles (CT.DEAD), castles drop them and radio the next
                             // target map-wide (FAR.WIDE); units without orders wait where they are, not at home
  ATTACK_WAIT: 40,           // ...for this many rounds
  RECALL: 0,                 // >0: a castle whose visible attackers outnumber half its defenders (r2 100) radios a
                             // recall (FAR.RECALL, 50 tiles, 51 fuel) at most every 10 rounds; units that hear it drop
                             // attack orders and go to 2-3 king steps from that castle for this many rounds (gate seed
                             // 2855: 89 of h35's 92 units guarded far churches while 8 attackers killed its lone castle)
  CASTLE_POST: 0,            // >0: castles radio their position (FAR.POST, 61 fuel) every CASTLE_POST_EVERY rounds; a
                             // military unit born at a church holds, with this probability, the lattice of the
                             // nearest castle it hears instead (h43 delivery: every castle that fell had 0-2 of its
                             // own units within 10 tiles; 2299 at round 300: 3 near the castle, 67 near churches)
  CASTLE_POST_EVERY: 20,
  CASTLE_POST_R: 6,          // ...and holds lattice tiles within this many king steps of it (LATTICE_R 12 left units
                             // by churches within 12 of the castle where they stood: diagnostic 2299, 11 by the castle)
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
