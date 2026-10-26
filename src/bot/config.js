// Behaviour switches. Every candidate change goes behind a switch here whose default is the incumbent behaviour.
export const CFG = {
  // economy
  SERVE_MOVES: 2,            // a depot within this many pilgrim moves (speed r2 4) of a structure is mined from it
  CLUSTER_LINK_R2: 10,       // depots within this r2 of each other form one cluster
  CLAIM_MARGIN: 1,           // church a remote cluster if our distance <= enemy's + margin (moves)
  MAX_PIONEERS: 2,           // church pioneers in flight per castle
  PIONEERS_TEAM: 6,          // >0: ...at least ceil(this / our castles) per castle (replica 406-3, seed 53, one castle a side:
                             // our 2 pioneers went to contested sites 34 and 47 steps out and the castle built nothing
                             // from round 5 to 67 with 90 karbonite reserved; StoneT2000 had 8 churches at 80 to our 3)
  PLAN_CONTEST_FIRST: 6,     // >0: planned clusters the enemy reaches within this many moves of us are pioneered first
  PLAN_VALUE: 10,            // >0: within those classes, fewest (king steps + this) per depot first, not nearest first
                             // (replica 403, seed 1375: wololo churched the two 7-depot clusters at 42 steps at r32
                             // and r49; we planned them 6th and 7th behind 3-depot ones)
  PIONEER_MIN_ROUND: 2,
  EXPAND_ROUND: 0,           // >0: from this round castles re-plan every 50 rounds, adding remote clusters on either half
                             // more than EXPAND_KEEP king steps from every enemy castle (castle.js expandPlan; h19's
                             // turn-3 plan is used up by round ~200 in self-play, while StoneT2000's bot1v43 churched
                             // 30 clusters on replica seed 2924, three on our half)
  EXPAND_KEEP: 12,
  EXPAND_SEEN: 5,            // ...and a pioneer that sees an enemy structure this near its site reports it taken (CT.TAKEN)
  TAKEN_SEEN: 0,             // 1: ...from round 1 whatever EXPAND_ROUND, and its castle frees the pioneer's slot
                             // (pilgrim.js siteTaken; replica 1421, 1712: two of a castle's three slots held to r115 by
                             // pioneers to sites uvafan churched at r22, its m17 and m19 clusters never sent one)
  PIONEER_GIVEUP: 0,         // >0: a pioneer that goes this many turns with an enemy attacker in sight and no nearer its site
                             // (king steps) than its best gives the site up: reports it taken (CT.TAKEN: castles rest it 200
                             // rounds and free its pioneer slot) and mines (replica seed 1325 self-play: pioneers waited
                             // 105-375 turns beside contested sites; castles re-sent one every ~100 rounds)
  PIONEER_STALL_ANY: 0,      // >0: ...and one that goes this many turns no nearer its site than its best gives it up the
                             // same way whatever it sees (h68: never fired before PIONEER_GIVEUP 20 in its delivery)
  PIONEER_HOME: 0,           // 1: a pioneer that gives its site up (_GIVEUP, _STALL_ANY) takes a free depot on ground we
                             // hold (pilgrim.js homeDepot), not the one nearest itself (h68, seed 418: #1936 gave its site
                             // up at round 79, took a depot 11 king steps on under the enemy's guards, never mined to 300)
  PIONEER_LOST_REST: 100,    // rounds a castle waits before re-sending a pioneer to a cluster where the last one died
  PIONEER_LOST_DOUBLE: 0,    // 1: ...doubled per pioneer lost there (replica scrims vs StoneT2000: 25 of 46 pioneers killed,
                             // castles re-sent one into the same prophets every ~105 rounds)
  PIONEER_TIMEOUT_REST: 0,   // 1: a pioneer still alive but 80 turns out without its church rests its cluster as a lost one
                             // does (0: the castle forgets it and may send another to the same site at once, while the
                             // first stays out as a zombie; audit 2026-10-24); 2: ...and counts as one lost there
                             // (PIONEER_LOST_DOUBLE)
  HOP_GAIN: 0,               // >0: a castle's next pioneer is built by the living church of ours whose site is at least
                             // this many king steps nearer the cluster's site than the castle (castle.js hopPioneer,
                             // church.js hopBuild). wololo churches its next cluster from its last church: replica 853-1,
                             // seed 2797, its church at (1,20) r30 built the pilgrim that churched (1,32) on our half at
                             // r41, whose prophet killed our castle's pioneer 7 tiles short (r24 start, 19 king steps).
                             // In v8's 51 replica games: ahead in pilgrims at r100 won 13 of 15, 1.5x behind 4 of 21
  HOP_REST: 50,              // turns a castle asks a church nothing after a request to it lapsed unanswered
  ESCORT: 0,                // >0: a pioneer overdue at its site (ESCORT_SLACK turns past its king-step distance) or lost
                             // on the way gets this many military units built with SIG.GUARD at its site; they hold the
                             // lattice there instead of home (replica 206-2, seed 2321: our pioneer waited 137 turns at
                             // the edge of two StoneT2000 prophets' range beside its site and died; vs StoneT2000 46 of
                             // our 114 pioneers died or stalled 30+ turns)
  ESCORT_SLACK: 10,
  PIONEER_CALL: 0,           // >0 (with ESCORT): a pioneer that sees a mobile enemy attacker within r2 PIONEER_CALL of its
                             // site talks CT.BLOCKED and its castle opens the escort at once, not ESCORT_SLACK turns late
                             // (replica 425-2 / 443-2, seed 2644: IanCoolidge0's lone crusader stood on the centre site
                             // from r20; our r14 pioneer circled at r2 50-68 for 100 turns, Ian churched it at r44)
  ESCORT_FIRST: 2,           // >0: this many ESCORT_UNITs go ahead of the castle's first contested pioneer (its first
                             // planned cluster the enemy reaches within PLAN_CONTEST_FIRST moves of us), built before it
                             // (replica 410-1, seed 2591: StoneT2000's round-3 prophet killed our centre pioneer at r25,
                             // took the centre with 3 churches and we mined 218 K to its 732 by r161; uvafan and wololo
                             // guard contested sites with prophets too)
  ESCORT_UNIT: 3,            // crusader (v8; 4 prophet)
  ESCORT_MIRROR: 1,          // 1: ESCORT_FIRST's units hold the enemy's mirror site (v8 = h128: two crusaders there; replica
                             // panel, three blocks 23 of 54 against the pooled 16.1, z 2.54: wololo 2644 3/3, never won before)
  ESCORT_HOLD_R: 0,          // >0: a unit that heard SIG.GUARD holds lattice tiles within this many king steps of the
                             // site, not LATTICE_R (replica 726, seed 2013: v8's escorts stopped on the first lattice tile
                             // within 12 steps of the site, 2 steps from home, and stood there r6-r48 out of sight of
                             // wololo's crusader on the site; they reach it only when diagonal steps miss every lattice
                             // tile, as on 2644)
  ESCORT_EARLY: 0,           // 1: the castle builds ESCORT_FIRST's units ahead of its economy pilgrims (turns 3-4, not 4-5:
                             // replica 758, seed 2644: a blue crusader built r5 acts after red's r5 prophet and lost the
                             // duel by one shot, r14-18; as red the same crusader acts first and won, 634, 646, 726)
  ESCORT_EACH: 0,            // >0 (with ESCORT_FIRST): a pioneer sent to a contested cluster (m <= PLAN_CONTEST_FIRST) other
                             // than ESCORT_FIRST's opens this many ESCORT_UNITs to it, built after it (ECONOMICS.md row 7:
                             // a pioneer and its guard are Leontief complements on contested land; on 6 of the 15 panel
                             // maps a castle plans 2+ contested clusters, 12 escorts in all; scratchpad contested.mjs)
  ESCORT_FAST_R2: 0,         // >0: a unit that heard SIG.GUARD walks to its site with steps up to this r2, not CRUISE_R2,
                             // until it first holds there (replica 778, seed 1706: v8's escorts walked one tile a turn
                             // from r4 and stood 10 steps short from r27; botfinalsafe churched the site at r29)
  ESCORT_BACK: 0,            // 1: an escort hit with no enemy crusader or preacher within r2 25 (a prophet's or a castle's shot)
                             // gives up its site and goes back to its birth structure's lattice (h157's block 1035-1046: the
                             // escorts at their site won 1712, 2518, 836 with kills before any prophet hit, and died 3-7
                             // rounds after a prophet's first shot on 388, 2740, 2644; TRAINING_LOG 2026-10-25 00:37)
  DEPOT_COOL: 30,            // turns before re-staffing a depot whose pilgrim died, per death there
  DEPOT_COOL_MAX: 150,
  KARB_FIRST: 2,             // karbonite depots assigned per fuel depot while fuel is not short
  FUEL_LOW: 400,             // below this fuel the next pilgrim takes a fuel depot (if any is free)
  FUEL_HIGH: 2000,           // above this fuel the next pilgrim takes karbonite (if any is free)
  FUEL_DEFER: 0,             // >0: before this round (a church that never learned it counts its own turns) a structure
                             // staffs only karbonite depots while fuel >= FUEL_DEFER_MIN and it has seen no enemy attacker;
                             // a castle whose team planned no church keeps v8's mix (ECONOMICS.md: 500 F + 25 a round pays
                             // the opening; replica 727-3, seed 2740: the castle hired 2 fuel miners and sat at 60-80 K
                             // with 1,100-1,500 F until its first pioneer left at r44, the gate being 90 K)
  FUEL_DEFER_MIN: 400,       // above the escorts' 350 F and the pioneer's 250 F gates: two- and three-castle teams, whose
                             // fuel falls under it by turn 2-3, keep v8's mix (driver, 16 maps: at 300 fuel fell to 17-226
                             // after the first church on 826, 836, 1712; 600 never opens, the game starts at 500)
  // military production
  GUARD_BASE: 2,             // peacetime prophets wanted per structure at round 0
  GUARD_ROUNDS: 40,          // one more wanted per this many rounds
  GUARD_MAX: 25,
  RICH_K: 200,               // past its guard quota a structure's peacetime army still builds while the bank holds more
                             // than this above the reserves (replica 409-2, seed 1706: h82's castle sat on 225-285 K
                             // from r100 to r300, its guard full, army 2-9; botfinalsafe built 40-49 units, chained
                             // churches to our castle and took it at r347)
  ECON_UNTIL: 100,           // >0: no peacetime army before this round (threat responses still build), so karbonite goes
                             // to pilgrims and church pioneers (replica seed 826 vs CometsTech, round 100: eigthbot 8
                             // churches, 47 pilgrims, no military; v3 3 churches, 21 pilgrims, 19 military)
  ECON_RICH: 0,              // >0: ...except the bank past this much above the reserves, which builds the peacetime army
                             // anyway (replica, v7's 18 games in 420-425: the bank held 245-658 K at r75 in 10 and
                             // 315-863 at r100 in 10, army 0-3, while 1-2 enemy prophets by the centre held 4-8 of our
                             // pioneers short of their sites; seed 2321: 535 K at r100, castle lost r214)
  ECON_NOPLAN: 0,            // 1: ECON_UNTIL does not hold a castle whose team planned no church (castle.js planAll 0:
                             // every cluster is staffed from a castle or nearer the enemy): there is no pioneer to save for
                             // (v8's field games on such maps, 2330 2046 1653 1884 1626: the bank held 386-863 K at r100,
                             // our army 2-4 against 6-37; won 1 of 5)
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
  PIONEER_DETOUR: 0,         // >0: a pioneer remembers enemy attackers it saw for this many turns and walks round their
                             // threat range to its site (pilgrim.js detourCost; replica 416-1, seed 2591: bot1v43's
                             // prophet held the centre corridor 26 rounds while our pioneer waited at its edge)
  DETOUR_PEN: 20,            // ...extra moves charged per remembered-threat tile entered
  PILGRIM_HOT: 0,            // >0: a pilgrim whose target depot sat in a visible attacker's threat range this many turns
  PILGRIM_HOT_MEM: 50,       // in a row retargets to a free depot not threatened and not given up in this many turns
  PILGRIM_STALL: 0,          // >0: a pilgrim this many turns no nearer its target depot (king steps) than its best, whatever
                             // it sees, gives it up for PILGRIM_HOT_MEM turns (no depot search returns it) for a free depot
                             // on ground we hold (pilgrim.js stallRetarget, homeDepot)
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
  CHURCH_GUARD_D: 0,         // >0: a church within this many king steps of its own mirror image (a contested site) builds
                             // a CHURCH_GUARD_UNIT before its first pilgrim (replica 391-1, seed 2591: uvafan's centre
                             // church built a prophet the round it stood and held 10 of 14 depots all game; in self-play
                             // the mirror churches stand adjacent, ours built 7 pilgrims first and one preacher killed 4
                             // of them and the church)
  CHURCH_GUARD_UNIT: 4,      // ...4 prophet, 5 preacher, 3 crusader
  STRIKE_R2: 0,              // >0: a structure that sees an enemy church within this r2 and no enemy attacker builds a
                             // preacher toward it first (struct.js strike; seeds 1915, 2030, 2924: mirror churches 1-5
                             // tiles apart, won by whichever side's preacher acted first)
  INTERCEPT_R2: 0,           // >0: an enemy pilgrim within this r2 of a structure (or one that has stood INTERCEPT_DWELL
  INTERCEPT_DWELL: 0,        // turns on one tile in its sight), more than 2 king steps from every enemy structure in
                             // sight and out of reach of our military, gets a unit built that hits it in its birth round:
                             // a crusader within r2 16 of it, else a prophet at r2 16-64 (struct.js intercept; replica
                             // 726, 758: each of four wololo strike churches checked was built by a pilgrim our structure
                             // saw first; seed 836: #3961 stood 16 turns at r2 80 from a castle, then built the church
                             // whose prophets killed it)
  CHAIN_ROUND: 200,          // >0: from this round castles build church chains at their mirror castles (chain.js: a
                             // pilgrim waits CHAIN_STAGE king steps out until the bank holds CHAIN_K and CHAIN_F, then
                             // church, pilgrim, church... one tile nearer each, all in one round, up to CHAIN_END_R2 of
                             // the castle; each church builds CHAIN_MIX units aimed at it for CHAIN_BURST turns.
                             // Replica scrim 200, seed 2924: StoneT2000's bot1v43 took all three of our castles so)
  CHAIN_STAGE: 15,
  CHAIN_K: 1000,             // ...and from CHAIN_ROUND the peacetime army leaves this much karbonite in the bank
  CHAIN_GUARD: 0,            // 1: ...except a structure's guard quota (GUARD_BASE + round / GUARD_ROUNDS within r2 100,
                             // at most GUARD_MAX), which only the other reserves hold back (replica, v7: our army stood
                             // still from r200 to r400 in 5 of 9 games, the bank under CHAIN_K; seed 1706: 6-7 units to
                             // r585 against botfinalsafe's 124, the chain never fired)
  CHAIN_F: 3500,
  CHAIN_END_R2: 2,
  CHAIN_MIX: [5],
  CHAIN_BURST: 40,
  CHAIN_FUEL_KEEP: 100,      // ...burst builds leave this much fuel
  CHAIN_EVERY: 100,          // a castle sends its next chainer this many rounds after the last (none while one waits)
  CHAIN_STAGGER: 30,         // castle i (canonical order) starts at CHAIN_ROUND + i * this
  CHAIN_PATIENCE: 10,        // a chainer that got no nearer for this many turns counts as staged within
  CHAIN_SLACK: 6,            // ...CHAIN_STAGE + this king steps of the target; farther out it quits after
  CHAIN_GIVEUP: 30,          // ...this many such turns
  CHAIN_FAILS: 0,            // >0: after this many lines fired (CT.CHAINFIRE, any castle's) with no enemy castle seen
                             // destroyed since (CT.DEAD), castles launch no more chains and their peacetime army stops
                             // leaving CHAIN_K in the bank; a later kill resumes them (replica, v7's 21 games: 34
                             // lines made 10 of our 14 castle kills, but uvafan's 9 made none and took 2,085-5,420 K
                             // a game, 3,410 of 4,670 spent on 2046)
  CHAIN_FIRE_NEAR: 0,        // 1: a threatened chainer starts its line early only within that band too (else it flees)
  CHAIN_HOLD_R2: 0,          // >0: from CHAIN_ROUND a church's threat response leaves CHAIN_K in the bank unless the
                             // nearest attacker is within this r2 (struct.js; castles always answer)
  CHAIN_KEEP: 1,             // 1: a church that never learned the round (a line church; one whose builder died before
                             // its first turn) counts as past CHAIN_ROUND: its peacetime army (and CHAIN_HOLD_R2)
                             // leaves CHAIN_K in the bank
  CHAIN_SAFE: 1,             // 1: a chainer within a visible attacker's reach this turn neither starts its line nor
                             // waits: it flees (chain.js; a church acts after every robot already in the round)
  CHAIN_CLEAR: 0,            // >0: a chainer that sees this many enemy crusaders, prophets and preachers or more starts
                             // no line, staged or early: it flees if threatened, else holds (replica, v7's 9 games in
                             // 421/422/425: lines started with 2-6 of them in the chainer's sight kept 4 of 44 churches
                             // 20 rounds later, with 0-1, 27 of 35; seed 1036: 13 churches gone in rounds 311-320)
  CHAIN_LIVE: 0,             // 1: a castle's peacetime army leaves CHAIN_K in the bank only while a chainer of ours
                             // walks or waits (CT.CHAINER); 2: only while one waits staged (CT.STAGED). Replica, v8:
                             // bot1v43 2321, three chainers shot on their build tile at birth, the castle held 586-1,330
                             // K for 200 rounds and fell with 1,330 banked; botfinalsafe 2740, chainers walled off by
                             // our own church on the edge corridor, 1,200 K held from r300 to r600
  CHAIN_WALL: 0,             // >0: a line church that sees this many enemy crusaders, prophets and preachers or more, or
  CHAIN_WALL_REST: 300,      // hears that another did (FAR.WALL), ends its line: no link, no burst; the first radios it
                             // (17 tiles, 18 fuel) and tells our castles (CT.WALL), which then launch no chain and keep no
                             // chain bank for CHAIN_WALL_REST rounds (replica, v7-v8 lines within 6 king steps of an enemy
                             // castle: the 7 whose nearest church saw 28 or more killed none and lost 8,020 K of units
                             // there within 60 rounds, uvafan 2046, 1653 and IanCoolidge0 1036; the 9 that saw 10-25
                             // killed 9 castles)
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
  PEACE_RESERVE_K: 60,       // >0: every structure's peacetime army leaves this much karbonite in the bank (castles act
                             // first in a round, so the churches' army had spent it before a castle's turn: replica
                             // 394-2, seed 70: after round 24 neither castle afforded a pioneer (60 K), bank 0-40, 2 of 4
                             // planned sites never churched, 2.7x fewer mines than awesomelemonade by round 450)
  DEF_RESERVE_K: 30,         // >0: every karbonite spend but a threat response (pilgrims, pioneers, churches, the
                             // peacetime army) leaves this much in the bank, so a structure that sees attackers can
                             // build a preacher (30 K) at once (replica seed 1915: the castle had spent its karbonite
                             // on a church and fell to five crusaders at round 29)
  DEF_RESERVE_FROM: 0,       // >0: ...held only from this round on (a unit that does not know the round holds it), so the
                             // opening race is run on the whole bank (h82 self-play, seed 2591: with 80 K the castle
                             // waited r3-r13 for 90 K, its pioneer left at r14 and churched the centre at r26;
                             // uvafan's pioneer left at r4 and churched it at r13, replica 391-1)
  DEF_FAR_UNIT: 0,           // >0: the unit a threat response builds against a closest attacker beyond r2 36 that is no
                             // crusader (0: a prophet); 3: a crusader, 40 HP for 15 K against a prophet's 20 for 25 K,
                             // and inside a prophet's dead zone (r2 < 16) once it closes (replica 414-1, seed 2013:
                             // wololo's prophets just outside our castle's reach shot 9 newborn prophets on its build
                             // tile in rounds 169-180, then the castle)
  DEF_SEEN: 0,               // 1: a threat response counts as defenders only our military that see the closest attacker
                             // (0: all within r2 100 of the structure; replica 422-3, seed 2321: bot1v43's prophets
                             // one at a time at r2 61 shot our castle to death in r112-214 while 42 units of a church
                             // 11 tiles behind it, out of their sight, counted as its defenders: it built pilgrims)
  SIEGE: 0,                  // >0: military units remember the enemy prophets they see, or that a structure of ours in
                             // sight radios after building them (SIG.THREAT), for this many turns; idle units hold no
                             // lattice tile in a remembered prophet's reach (r2 64) and do not step into it on the way
                             // (military.js threatHot; v7's 18 replica control games: 235 prophets died unfired on their
                             // first steps toward the lattice, into prophets they could not yet see; 2046 vs uvafan)
  SIEGE_NOW: 0,              // 1: a military build whose radio is free (threat responses send none) radios the prophet
                             // that turn, so the newborn hears it on its first turn (0: only on a turn with no military
                             // build, so a structure building every turn into a parked prophet never warns: replica
                             // m651-1, a church built 176 prophets and 163 units died on one tile to one prophet at
                             // r2 65, out of the newborns' sight; audit 2026-10-24)
  SAFE_BUILD: 0,             // 1: structures never build a robot on a tile where the enemy attackers in sight could kill it
                             // before its first turn (struct.js exposure; replica 414-3, seed 836: four prophets in a row
                             // died unborn on one church tile); 2: counting only attackers with no other target of ours
  DEF_SAFE: 1,               // 1: a structure's military newborn goes on a free tile where the enemy attackers in sight
                             // could kill it before its first turn only when every free tile is one (struct.js buildToward).
                             // 1 is v11's (h178, TRAINING_LOG 2026-10-25 20:50); 0 was v10's.
  PLAN_SERVE_PILGRIM: 0,     // 1: church planning counts a depot as served by pilgrim moves (as staffing does), and
                             // churches a cluster with >= 2 unserved depots (or all, if smaller); 0: any depot within
                             // 2*SERVE_MOVES king steps marks the whole cluster served (seed 1755: never staffed)
  PIONEER_RESERVE: 2,        // 1: ...and pilgrim + church karbonite (60) while a castle has a pioneer due (on poor
                             // maps the peacetime army spent every 25 K and no church was ever built: seed 1755);
                             // 2: every castle, while no church stands and any castle planned one (castle.js pioneerDue)
  PIONEER_RESERVE_UNTIL: 100,  // ...mode 2 only before this round
  PIONEER_HOLD: 0,           // >0: a pioneer at its free site that cannot afford the church says so (CT.WAIT); while one
                             // does, castles leave the church and DEF_RESERVE_K in the bank when they build pilgrims or
                             // answer an attacker farther than r2 PIONEER_HOLD (replica 420-3, seed 836: four pioneers
                             // stood at their sites r24-r121+ while the bank averaged 26 K: castles answered wololo's
                             // harassers with 20 prophets and staffed depots at 40 K; 356 such turns to r150, 420-1 138)
  PIONEER_LEAN: 0,           // >0: a pioneer that has waited this many turns beside its free site builds the church on its
                             // cost alone, without DEF_RESERVE_K (420-3: in 401 waiting turns the bank held 80 K 8 times
                             // and 50-79 K 74 times; churches, which hear no castle talk, spent half of it)
  PIONEER_EARLY: 0,          // >0: through its turn PIONEER_EARLY a castle whose plan opens with a contested cluster (m <=
                             // PLAN_CONTEST_FIRST) sends that pioneer first, ahead of the economy pilgrims and without
                             // PIONEER_DEPART_K (replica 420-425: our first pioneers left at r12-16, the field's first
                             // pilgrims reached the centre clusters at r11-23; castle.js earlyPioneer)
  PIONEER_OPEN: 0,           // >0 (with PIONEER_EARLY): that early pioneer goes to the first planned cluster we reach at least
                             // this many king steps before the enemy (m >= PIONEER_OPEN), contested or not, and castles
                             // without one send none early (v9's 108 panel games: its first pioneer left at r23-45 and
                             // founded its church in 1 of 48 losses and 31 of 48 wins; sent to a cluster with m <= 1,
                             // 0 of 24; with m >= 7, 12 of 12; TRAINING_LOG 2026-10-25 15:45)
  PIONEER_RACE: 0,           // >0 (with PIONEER_OPEN): in a team none of whose castles has such a cluster, a castle whose
                             // plan opens with a race (m < PIONEER_RACE) sends that early pioneer there (2518, 2591:
                             // one site, m 0; v9's first pioneers to m-0 sites churched 0 of 24; TRAINING_LOG
                             // 2026-10-25 17:05)
  CHURCH_SAVE: 0,            // >0: before this round a church's economy pilgrims leave a church's karbonite (50) in the
                             // bank: a waiting pioneer's CT.WAIT reaches castles only (replica 420-1, seed 2013: churches
                             // built 11 pilgrims in r40-100 while three pioneers waited 35-55 turns at free sites, the
                             // bank at 10-77 K)
  PIONEER_DEPART_K: 50,      // a castle sends a pioneer once the bank holds a pilgrim, DEF_RESERVE_K and this much more;
                             // the pioneer builds its church only when the bank holds the church and DEF_RESERVE_K (it
                             // waits at the site), so 0 starts the walk on the reserve's surplus and the mining on the way
                             // pays the church (replica 411-3, seed 1712: castle (21,3) built nothing r5-22 waiting for
                             // 90 K, our centre church came at r50, uvafan's at r27; h89's open bank lost castles to rush4)
  FRONT_ROUND: 0,            // >0: from this round a structure with none of ours ahead in sight sends a pilgrim to build
                             // a church FRONT_STEP rows toward the enemy (struct.js frontPioneer), at most every
  FRONT_EVERY: 50,           // ...this many rounds (replica seed 2924: StoneT2000's church lines took our castles)
  FRONT_STEP: 8,
  // lattice
  MELEE_BACK: 0,             // >0: crusaders and preachers hold no lattice tile ahead of the lattice centre's row, and
                             // fill tiles nearest a point this many rows behind it; prophets hold the front (replica
                             // census 02:15: 1,018 of our melee units in 12 losses died without firing, 950 of them in
                             // our half; crusader vision r2 49, preacher 16, a prophet hits from r2 64)
  LATTICE_MIN_R2: 5,         // lattice tiles at least this far (r2) from the home structure
  KEEP_CLEAR: 0,             // 1: idle military units keep off depots, tiles next to our structures and chokepoints
  LATTICE_SPARSE: 0,         // 1: lattice tiles are those with x + 2y a multiple of 5 (any 3x3 preacher splash covers at
                             // most 2), not (x + y) even (up to 5; military.js latticeTile)
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
  ATTACK_LATE: 900,          // from this round every military unit obeys attack orders, home guards and unmasked types
                             // too (replica 411 seed 2046 vs uvafan: 66 of our units died from round 900 on)
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
  WATCH: 0,                  // >0: a structure that sees an enemy crusader, prophet or preacher within r2 100 that no
                             // military unit of ours sees radios it as a spot (FAR.ENEMY, 10 fuel) at most every WATCH
                             // turns, when its radio is free after its build; the SPOT_MASK types that hear it engage
                             // it (replica, v8 on bot1v43 2321: red prophet #953 stood at r2 65 from our castle, out of
                             // its reach, and shot our chainers on their build tile at r200, r300 and r400; our 40
                             // units stood 7-11 tiles east of the castle and never saw it; the castle fell at r444)
  SPOT_MASK: 40,             // unit types (bit 3 crusader, 4 prophet, 5 preacher) that hear spots; prophets radio
                             // while one of them is in sight. A prophet that hears one steps to its firing band (r2
                             // 16-64) and holds (replica 2924 r240-272: bot1v43's preachers and prophets took a castle
                             // from 6 churches built in a row 7-12 tiles off it; ours held lattice tiles r2 72-100
                             // from the fight, unseen)
  WAVE: 0,                   // >0: after the first attack call, call again only once this many military units are
  WAVE_GAP: 15,              // idle (units report marching over castle talk), on 3 rounds, then wait this many rounds
  ATTACK_EVERY: 5,           // castles repeat the attack call (20 fuel) every this many rounds (5: ~4,400 fuel a game)
  RADIO_WAIT: 0,             // 1: a castle's chain launch or pioneer waits a turn while the attack call holds the radio,
                             // as escort() does (0: built deaf, it wanders all game and the castle counts the launch:
                             // CHAIN_ROUND, CHAIN_STAGGER, CHAIN_EVERY and ATTACK_EVERY are multiples of 5, so every
                             // later launch of that castle falls on a call round; audit 2026-10-24, replica 731 game 3:
                             // 5 of 5 chain launches after r450 and 3 pioneer re-sends went out deaf)
  ATTACK_ONE: 0,             // 1: every castle calls the general attack on the same enemy castle, the mirror nearest our
                             // living castles in summed r2 (ECONOMICS.md, Blotto: 16 of v8's 29 replica losses reached
                             // r1000, 11 at equal castles, decided on health; on 11 of the 16 the castles called 2-3
                             // targets)
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
  FEED_STOP: 0,              // >0: a structure that saw this many of its military newborns die within FEED_AGE turns of
                             // their birth (gone from sight while near enough that they could not have walked out of it,
                             // or never seen alive) within FEED_WINDOW turns builds no military unit for FEED_REST turns,
                             // except against an attacker in reach of the structure itself (struct.js watchKids; replica
                             // 770, seed 2330 vs mvpatel2000: church (20,14) answered an enemy prophet standing at r2 98,
                             // out of its reach, with a prophet a turn; each stepped into that prophet's band before it
                             // could see it and died there on its first or second turn: 262 of 271 prophets lost, the
                             // army flat at 40 r500-900, the game lost at r1000 on health 1,200 vs 6,640)
  FEED_AGE: 3,
  MUSTER: 2,                 // v9 (h167, 2026-10-25): 2. 1: against campers, enemy prophets a structure cannot hit (the nearest beyond r2 36, still
                             // MUSTER_DWELL turns, no enemy crusader or preacher in sight; a castle's beyond its r2 64),
                             // it builds crusaders on the adjacent tile farthest from the nearest, which hold out of its
                             // reach (SIG.THREAT) until 2A + 1 of them stand ready, then radios it as a spot (FAR.ENEMY)
                             // and they charge together (ECONOMICS.md, Lanchester: v8 fed one unit a turn into a
                             // prophet's band, 46% of its military karbonite lost died within 3 turns of birth;
                             // struct.js musterAct, military.js musterHold). 2: hold only, no release: the held crusaders
                             // stand 2-4 king steps from home until an enemy crusader or preacher is in sight, and while
                             // the case holds the peacetime army builds held crusaders too (health kept for the r1000
                             // tiebreak: in v8's 11 health losses 85% of the military K spent r500-899 died, 98% within
                             // r2 100 of our structures, 62% within 3 turns of birth; TRAINING_LOG 2026-10-24 23:32).
                             // 0 was v8's.
  MUSTER_WAIT: 25,           // turns a held crusader waits for the release, and a release's spot radio lasts
  MUSTER_DWELL: 3,           // turns an enemy prophet must have stood on its tile to count as a camper
  MUSTER_RESCUE: 100,        // >0 (with MUSTER 2): a structure hit in its last 3 turns radios the nearest enemy attacker
                             // in sight as a spot (FAR.ENEMY, 10 fuel) when its radio is free after its build; a held
                             // crusader whose home lies within this r2 of the spot drops its hold and engages it (replica
                             // 1180, seed 2013: wololo's prophets shot castle (15,14) dead in r177-204, r2 61 from it,
                             // while three held crusaders stood 2-4 tiles from it, out of the prophets' sight). 100 is
                             // v10's (h175, TRAINING_LOG 2026-10-25 15:26); 0 was v9's.
  FEED_WINDOW: 20,
  FEED_REST: 50,
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

// The karbonite every spend but a threat response leaves in the bank now (CFG.DEF_RESERVE_K, _FROM).
export function defReserveK(B) {
  return CFG.DEF_RESERVE_FROM && B.round > 0 && B.round < CFG.DEF_RESERVE_FROM ? 0 : CFG.DEF_RESERVE_K;
}
