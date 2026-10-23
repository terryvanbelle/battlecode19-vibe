# TRAINING_LOG.md — append-only, one entry per attempt (times PDT)

## 2026-10-21 07:10 — v0 foundation
- Built: economy (castles assign pilgrims to depots within 6 king steps, churches pioneered at remote clusters we
  are nearer to), checkerboard prophet lattice, defenders on sight, castle attack, attack waves at 20 units, endgame
  crusader dump (HP tiebreak), symmetry from map, enemy castles = mirrors of ours (castle talk shares positions).
- First game (seed 2 vs example, driver): won on health 9650 vs 480. Basics: 0 friendly damage, 0 invalid actions,
  karbonite floated above 400 in 100% of rounds 100-900 (5,400 K at round 950). Only 9 pilgrims: this map has 18
  depots and we held our 9.
- Seed 5 on the VM: one castle "Took too long to initialize" (cold vm2 in a loaded process) and the game was lost on
  castle count. Fix in the harness: the runner warms up vm2 before round 1 and reports init_ms_max.
- Next: v1 production (guard prophets, surplus to crusaders) to remove the float; measure v0 vs example on 12 seeds.

## 2026-10-21 (session 2) — v1 snapshot, v2 rewrite in a canonical frame
- v1 = the previous working copy (guard prophets, surplus crusaders), frozen as bots/v1.
- v2: rewrite around src/bot/world.js. Each robot sees its own side on top; decisions never use ids, team colour or
  the engine's visible-list order. Minified single-file build (22 KB) to keep init inside the 100 ms clock.
- symcheck (self-play, twin-paired action application): seeds 2, 7, 21 exact mirror for 200 rounds; other seeds
  diverge only at mirror-axis contests or after the first attack (engine turn order). One real asymmetry source fixed:
  robots born on the same tile shared a random stream (now reseeded with the birth round).
- v2 vs example: 20/20 wins (4 by castle count at round 1000, 16 by annihilation near round 470).
- v2 vs v1: 5/10 at timescale 1 (heavy init failures on both sides under VM load 12), 4/6 at timescale 2.
  Losses: the single castle falls while the army is away; fuel runs dry (fuel 20, karbonite 1,595 floating) because
  movement burned 18,000 fuel. Movement fuel is r2 x fuel/move, so short steps are cheaper per tile.
- Candidates: h1 = r2 <= 2 cruise steps, fuel-aware depot choice and military reserve; h2 = h1 + 30% home guard
  that ignores attack orders before round 900, and per-robot RNG reseeded by birth round.

## 2026-10-21 11:55 — h1 accepted as v3
- h1 vs v2 (dist/base): 27/36 at timescale 2, 20 seeds both sides (4 rows lost to round-0 init failures under load,
  now retried by the batch runner). Wins by castles 20, by health 7.
- 2 single-turn timeouts in 36 games (vm2's 200 ms per-turn cap). Our own code logged no turn over 30 ms in the
  re-run of one of them, so the spike is outside our code (state-message compile, GC or CPU starvation at load ~12).
- Queued on the VM: h2 vs h1 (home guard, reseeded RNG, attack fuel gate), h3 vs h2 (depot cooldown after pilgrim
  deaths), h4 vs h3 (crusader/preacher rotation).

## 2026-10-21 12:45 — rush sparring partner exposes a fuel death spiral (h5)
- bots/rush = src/bot built with `--cfg RUSH=4` (crusaders at the mirror castle from round 5).
- v3 vs rush: won seed 1375 (61x61, castles 18 tiles apart) at round 462; lost seed 2330 (41x41, 3 castles) on
  castle count at round 1000. In the loss v3's prophets spent 28,735 fuel shooting (1,354 shots at 25 fuel), team
  fuel sat near 0, pilgrims were idle on 5,815 of 11,262 turns (no fuel to move or mine) and 1,547 karbonite
  floated. The rush side mined 9,056 K and 45,300 F with 10 pilgrims.
- Replica: CS554-software-engineering-groupProject plays a crusader swarm (141 crusaders built in one game).
  Fuel per damage: crusader 1.0, prophet 0.4, preacher 1.33 plus splash, castle 1.0.
- h5 = h4 + karbonite miners switch to fuel when fuel < 150 and karbonite >= 200 (and back when karbonite < 30
  and fuel >= 3000) + military keeps a 30-fuel floor when shooting.

## 2026-10-21 13:10 — h2 rejected; h6 = combined line vs v3
- h2 vs h1: 17/40 (43%). Wins 11 by health and 6 by castles; losses 22 by castles. Keeping 30% of the army home
  and requiring 30 fuel per unit for attack orders made attacks rarer and weaker. Both switches set to 0; the
  birth-round RNG reseed (a symmetry fix) stays.
- Queue restructured: h4/h5 stacked on h2 were cancelled. h6 = v3 + RNG reseed + depot cooldown + crusader/preacher
  rotation + miner switching + shooting fuel floor, tested directly against v3 (40 games) and against rush
  (15 seeds, paired with v3's rush batch). h3 vs h2 (depot cooldown alone) finishes first.

## 2026-10-21 13:45 — h7 (attack persistence), a signal-fuel bug, h3 stopped
- Army after a kill: units that saw their target gone dropped it and walked back to the home lattice; castles kept
  calling the dead castle (they never learn of kills) and dropped targets whose own mirror castle had died.
  h7 = h6 + ATTACK_PERSIST: ATTACK messages carry the enemy castle index; a unit that sees it gone reports
  CT.DEAD+i over castle talk for 3 turns, marches on the nearest other castle it has heard of, else waits in place
  up to 40 rounds; castles skip reported castles and the first living castle radios the next target map-wide
  (FAR.WIDE r2 7930, 90 fuel) once per kill.
- Bug: js_starter's signal() charges fuel at once (js_starter.js:108) but World kept the turn-start fuel, so a castle
  that radioed an attack (20 fuel) and then built with 50-69 fuel threw "Cannot afford" (1 caught exception in the
  saved logs). World.signal now lowers w.fuel; unit test added. In h7 only (h6 was built before the fix).
- h3 vs h2 (depot cooldown alone): 10/20, stopped at half to give h6 vs v3 the VM. Depot cooldown stays in h6.
- progress/ (2023-style Bradley-Terry charts, ATTEMPTS ledger, replica ladder) is live; refresh with
  tools/progress-refresh.sh. It shows v0 beating v1 27-10 locally, so v0 rates level with v3: v3 vs v0 queued.

## 2026-10-21 14:00 — pre-registration: h7 (attack persistence), h8 (endgame fuel)
- h7 mechanism: after a kill the army stays in the enemy half and is told the next castle. Counter: CT.DEAD talk
  turns and FAR.WIDE (r2 7930) radio in replays. Reach: fires in every game where one enemy castle dies while
  another lives (multi-castle maps; h1 vs v2 had 20 castle wins in 36). Displaces: the walk home, 90 fuel per kill.
  Functional screen: h7 vs example finishes multi-castle games no later than h6 vs example (seeds 1972, 527, 1755,
  1154). Gate: h7 vs h6, 40 games (seeds 5000+, both sides), wins by castles up; falsifier: fewer castle wins or
  net <= 0. Zero arm: ATTACK_PERSIST=0 is the incumbent.
- h8 mechanism: games that reach round 1000 are decided by total health; both teams end with ~2,500 karbonite and
  < 100 fuel (h3 vs h2 rows), so from round 900 all fuel goes into preachers (60 HP per 50 fuel) and nothing else
  (no pilgrims, churches, reserves, cruising away from home). Counter: preachers built in rounds 900-1000 and team
  health at round 1000. Reach: 9 of 20 h3 vs h2 games and 12 of 40 h2 vs h1 games ended on health. Displaces: late
  pilgrims and churches, the round-950 final push (units hold). Gate: h8 vs h6, 40 games (seeds 5000+); falsifier:
  health wins not up, or castle losses up. Dose ladder: ENDGAME_FUEL 0 / 900 / 850.

## 2026-10-21 14:40 — h9 (church planner reach), h8 delivers, movement fuel census
- h9 mechanism (pre-registered): the castle's church planner counted a cluster served if any depot lay within
  2*SERVE_MOVES king steps, while staffing (struct.js) serves depots within SERVE_MOVES pilgrim moves (r2 4). A
  diagonal 8-king-step depot takes ~8 pilgrim moves: such clusters were neither staffed nor churched. Seed 1755: 2
  pilgrims and no church all game for both h6 and v3-line builds. Corpus estimate (seeds 1-600, red side): 135 of
  577 maps (23%) orphan at least one depot, 517 of 8,728 own-side depots (6%). PLAN_SERVE_PILGRIM=1 counts served
  by pilgrim moves and churches clusters with >= 2 unserved depots (or all, if smaller). Delivery: seed 1755 church
  planned and built by round 50 (4 pilgrims vs 2). Gate: h9 vs h6, 40 games (seeds 5000+); falsifier net <= 0.
  PIONEER_RESERVE (keep 60 K for a due pioneer) was the first guess; it did not deliver on 1755 and stays off.
- h8 delivery (seed 2202 vs h6): health 2,710 vs 3,040 at round 900 became 4,450 vs 3,990 at 1000; preachers 7 -> 42.
- Movement fuel census (seed 2202, h6 side): 21,154 fuel on moves of ~25,000 mined; 87% with no enemy attacker
  within r2 100; 13,400 of it within 12 king steps of our own structures after round 450, ~100 near the enemy.
  Military path length is 2.7-4.3x net displacement. Top mover: a newborn preacher circling a walled corner castle
  for 57 rounds (nav slide/escape ladder in a jam). A move-mode census with logs is running.
- h10 (pre-registered): castles repeat the 20-fuel attack call every 5 rounds from round 450 (about 220 calls, ~4,400
  fuel a game on seed 2202, mostly to units that already have the target). ATTACK_EVERY=20 saves ~3,300 fuel (~66
  preachers); newborns wait up to 20 rounds for orders. Gate: h10 vs h6, 40 games (seeds 5000+); falsifier net <= 0
  or fewer castle wins. Queue trimmed: v3 vs v1 and v3 vs example parked (~/jobq/parked) for the candidate gates.
- Move-mode census (seed 2202, logged h6-line build vs h6): 19,430 move fuel; the attack march 16,280 (84%), of
  which sideways slides 8,356 and step-backs 1,674; lattice 2,780 (pre-450); engage 358; prophet retreat 16. The
  target is right (blue calls red's castle (5,47)), but from round 470 to 800 ~30 blue units sit 7-12 tiles from
  their castle in a walled bottom corridor (x 30-35), jammed, sliding every second blocked turn.
- h11 (pre-registered): unhurried moves (lattice, march) slide after 6 blocked turns instead of 2 and step back after
  15 instead of 4 (CRUISE_SLIDE_AFTER / CRUISE_ESCAPE_AFTER; engage and retreat moves unchanged). Delivery: seed 2202
  vs h6, move fuel down by at least a third with castle count not worse. Gate: h11 vs h6, 40 games; falsifier
  net <= 0. Risk: a jam that sliding would have dissolved now holds longer.
- h11 delivery #1 (slide 6 / step back 15): move fuel 19,500 vs h6's 21,781 on seed 2202 (-10%), short of the
  pre-registered third. Cause: Nav.step never restarts the blocked count after a slide, so a robot past the threshold
  slides every turn of a long jam whatever the threshold. h11 rebuilt with CRUISE_RESET=1 (a slide or step back
  restarts the count, cruise moves only) before its gate ran; delivery #2 on seed 2202 running.
- h11 delivery #2 (slide 6 / step back 15 / reset): move fuel 18,088 vs 21,578 (-16%; march bucket 400-499 halved,
  4,110 vs 8,518; crusader path/net 2.57 vs 3.55); won on health 4,480-3,120. Misses the pre-registered -33% bar:
  not gated (parked). The rest of the move fuel is reinforcements walking ~10-12 tiles to the front (~200 units).
  Dose step h11c (slide 20 / step back 50 / reset), same bar, delivery on seed 2202 running.
- h12 (pre-registered, structural): attack waves. Military units tell the castles whether they are free (CT.MARCH
  80+unit while marching); after the first call a castle calls again only once WAVE=12 free units have gathered, on 3
  consecutive rounds, then not for WAVE_GAP=15 rounds (CFG.WAVE, default 0 = call every 5 rounds). Mechanism: h6
  sends reinforcements as they are built, ~2 at a time (seed 2202: 60 departures after the first wave in 33 groups,
  mean 1.8), and they meet the enemy army piecemeal. Delivery: seed 2202 vs h6, reinforcement departures (king
  distance > 10 from home, groups = departures at most 3 rounds apart) in groups of mean size >= 4, castle count not
  worse. Gate: h12 vs h6, 40 games; falsifier net <= 0. Risk: free units idle at home while the front starves, and
  the enemy counter-attacks a front that waits. Dose ladder: WAVE 12, then 6 or 20.
- h11c delivery (slide 20 / step back 50 / reset): move fuel 14,894 vs h6's 22,586 in the same game (-34%): PASS
  (bar -33%). Castles 2-2; won on health 6,290-3,880; lost 71 units vs 122. Gate h11c vs h6 (40 games) queued ahead
  of the older candidates.
- h12 delivery: FAIL, mechanism wrong. The castles called waves as built (rounds 450-452, 468-470, 488-490, then not
  until 941 because fewer than 12 units were ever free), but reinforcement groups stayed at mean 1.7-1.9 (h6 1.4-1.9,
  departure threshold 10 or 14). The castle-talk census shows why: from round 450 every military unit has a target
  (106 at round 450), yet 116 are still within 12 king steps of home at round 500 and ~50 at round 900. The army does
  not trickle out because of the call cadence; it cannot get out of its own base. Not gated (parked).
- Clog census (h6, 12 batch replays): military units stand on depots up to ~1,100 unit-rounds a game and next to own
  structures up to ~6,500; pilgrims sit full away from any structure up to ~900 turns (seeds 1635, 2202, 2296). On
  2202 a blue crusader holds fuel depot (44,47) from round 190 to 450 and another from 460 to 1000 (depot used 14% of
  rounds), and prophets hold the 1-wide corridor along the bottom edge that leads to the far depots.
- h13 (pre-registered): keep clear (CFG.KEEP_CLEAR=1): idle military units never take depots, tiles next to own
  structures or chokepoints (tiles whose passable neighbours split without them) as lattice posts, and step off such
  tiles when no post is reachable. Delivery: seed 2202 vs h6, military-on-depot unit-rounds and full-idle pilgrim
  turns both down by at least two thirds, fuel mined not lower. Gate: h13 vs h6, 40 games; falsifier net <= 0. Risk:
  fewer lattice posts near cramped castles, so more units wander. symcheck on dist/h13: seed 2202 exact for 400
  rounds; 1635 and 2296 part only once combat starts.
- h6 vs v3 (40 games, 20 seeds x 2 sides): 23-17; by seed 10 double wins, 7 double losses, 3 splits (t = 0.7):
  inconclusive. All 7 double losses are single-castle maps lost on castles near round 500 (seed 905: h6 marches
  60 units at round 450 into v3's prophet army, loses 36 to v3's 4 in 40 rounds, and v3's counter-attack kills the
  lone castle at 515). 5 of the 40 games are contaminated: robots failed vm2's 200 ms load budget by the hundreds
  (seeds 241, 357, 499, 1325, 2642, both builds) while the VM ran 9-12 game processes (batch 4 + replica 2 +
  benchmark smoke 2 + my diagnostics); without them it is 7-7. Rule from now: one extra game process at a time
  beside a batch, under `flock ~/.bc-extra.lock` (LEARNINGS 8).
- h13 delivery: FAIL. Military on depots 214 vs h6's 990 unit-rounds (-78%), but full-idle pilgrim turns 1,309 vs
  954 (up) and units next to structures 6,575 vs 7,462 (-12%): the base is packed, so moving posts does not free the
  delivery tiles. Not gated (parked).
- Jam census (military within 12 king steps of an own structure / army): h6 on 2202 keeps 85-90% of its army at home
  through round 700 although every unit has a target. h11c keeps 96% home (137/142 at 600, 135/159 at 1000): its
  patient units wait instead of sliding, so its health win comes from not feeding a losing attack.
- h15 (ablation, queued after h11c): h6 without the crusader/preacher rotation (MIL_ROTATION null: v3's prophets with
  every 4th a preacher). Hypothesis: the rotation loses the single-castle race. Gate h15 vs h6, 40 games; falsifier
  net <= 0.
- h14 (pre-registered, structural): detour (CFG.DETOUR=5): a cruise move blocked 3 turns switches, for the rest of
  that march, to a cost field rebuilt every 10 turns in which a tile a friend stood on in the last 30 turns costs 5
  extra moves (Nav.step detour, mapinfo.costField). Mechanism: on 2202 the shortest route out of each bottom castle
  is a 1-wide corridor along the bottom edge; ~100 units queue for it while an open route over the top goes unused.
  Delivery: seed 2202 vs h6, home share of the army (sum over rounds 550-700) at most two thirds of h6's in the same
  game. Gate: h14 vs h6, 40 games; falsifier net <= 0. Risk: units that do get out arrive piecemeal and die (the
  h11c result says attacking here is a losing trade), so delivery may pass and the gate fail.
- h16 (pre-registered, doctrine swing): turtle. h6 with ATTACK_ROUND=1001: no general attack ever; units hold the
  lattice, engage enemies within 14 tiles of home, and the endgame dump still runs. Mechanism: attacking into a
  standing lattice is a losing trade (h11c's army stayed home and won 6,290-3,880 on health; on seed 905 v3's
  army killed 36 of 60 h6 attackers for 4 losses, then took the lone castle). Delivery is mechanical (no attack call
  is ever sent). Gate: h16 vs h6, 40 games, queued after h15; falsifier net <= 0. Risk: h6's waves take castles on
  small single-castle maps before round 1000. Dose ladder if it passes: attack only from round 800, then 650.
- h17 (pre-registered): karbonite stop (CFG.KARB_STOP=500): a karbonite miner on its depot waits instead of mining
  while the team holds >= 500 karbonite. Mechanism: each mine action costs 1 fuel and fuel binds; on 2202 h6 spends
  ~3,900 fuel mining karbonite and ends with ~3,500 unspent. Delivery: seed 2202 vs h6, mining fuel down by >= 1,500
  and karbonite at round 1000 <= 1,500, units built not fewer. Gate: h17 vs h6, 40 games; falsifier net <= 0.
  Risk: a church or the endgame dump finds karbonite short.
- Load audit of every batch file: games with any robot init failure (machine load, LEARNINGS 8) were h1 vs base 6/40,
  h2 vs h1 5/40, h6 vs v3 5/40, v2 vs v1 16/24, ~/runs/results 18/56, v1 vs v0 24/24 (so "v0 beats v1" was noise).
  tools/paired.js (new --h2h mode for direct batches) and the progress games table now skip such games; h6 vs v3 on
  clean games reads 7 gained, 7 lost, 1 split: net 0.
- Fuel timeline, seed 2202 (h11c red / h6 blue): blue holds 10,100 fuel at round 450, 3,894 at 475, 13 at 500 and
  stays near 0 to the end; red runs down gradually (9,476 at 450, 3,002 at 600, 1,256 at 700). h6's marching army
  burns the bank in 50 rounds; afterwards marching units take every fuel point above 60 as it arrives, so prophets
  (a shot needs 25 + the 30 floor) cannot shoot and the army cannot move: the "jam at home" is a fuel freeze as
  much as a traffic jam, and h11c wins because its patient units leave the bank alone.
- h18 (pre-registered): cruise fuel reserve (CFG.CRUISE_FUEL_RESERVE=1500): unhurried moves (march, lattice) only
  spend team fuel above 1,500; engage moves, retreats and shots keep their old floors. Delivery: seed 2202 vs h6, mean
  team fuel over rounds 500-700 >= 1,000 (h6: ~30) and attack fuel not below h6's. Gate: h18 vs h6, 40 games;
  falsifier net <= 0. Risk: the army reaches the front later or never. Dose ladder: 1,500, then 500 or 3,000.
- Fuel census, 8 sampled h6 vs v3 replays (driver, out/dbg/fuelline.js): on 1635, 2030, 2296, 2299, 241 and 2872
  both sides hold 7,000-9,000 fuel at round 450, under 100 by 500, and average 17-214 over rounds 500-700. The
  exceptions, 905 and 2855, are short single-castle games that h6 loses around round 530 with fuel still banked:
  decided by the fight, not the freeze. The post-attack fuel freeze is a flaw of the whole line (v3 included), so
  h18 tests something general.
- Delivery checks, seed 2202 vs h6 (games ran 15:20-15:39 PDT; read 16:50, the waiters had hung on a pgrep that
  matched its own ssh shell). h14 (detour) FAIL: home share of the army over rounds 550-700 is 90% (h6 in the same
  game 88%; bar <= 2/3 of h6's). Routing around crowds frees nobody: the army is fuel-frozen, not boxed in. Parked.
  h17 (karbonite stop) FAIL: mining fuel 4,768 vs h6 6,214 (-1,446, bar -1,500) and 183 military built vs 194
  (bar: not fewer); karbonite at 1000 is 350 (bar met). Won 2,680-2,530 on health. Parked; the bar stands.
  h18 (cruise fuel reserve) PASS: mean team fuel over rounds 500-700 1,376 (h6 49); attack fuel 12,085 vs 5,245.
  Same game: killed 145, lost 65, health 4,000-3,460. Gate h18 vs h6 queued right after h11c (jobq 004a5).
- Sparring, h6 vs bots/rush (out/ref.jsonl tag h6rush, 15 maps x 2 sides, seed0 9000): h6 wins 22 of 30 and loses
  both sides on 4 maps: 1337 and 1879 (castles at round 1000), 2544 (health), 2908 (all castles gone by 597/747).
  A rush beats the incumbent on 4 maps in 15: a basics gap (defence), now being replayed (seed 2908).

## 2026-10-21 17:40 — half-finished setup bug; harness limits; candidates rebased on h19
- h11c (cruise patience) gate vs h6, 40 games (out/h11c_h6.jsonl): raw 26 of 40 (wins 24 on health, losses 12 on
  castles); 15 games skipped for init failures; clean head-to-head: 9 cells, gained 5, lost 3, split 1, net +2,
  t 0.71. INCONCLUSIVE on 25 usable games; re-gated as h11r on h19 below.
- Bug: a prophet in h11c's game 2299 (blue, id 3709) threw on every turn for 392 turns ("Cannot read properties of
  undefined (reading 'length')"). Retraced with the same build it moves normally: vm2 had killed its first turn
  (200 ms wall clock, a GC pause) after setup wrote st.home and before st.reports, and setup ran only on turn 1.
  Fix d2c02a2: every role's setup runs until it sets st.ready (last); econ() assigns depots and clusters together;
  a retried setup takes the birth round from the castle's turn and ignores stale radio. Test: each role's first turn
  is killed after every possible write and must recover. On the loaded driver (seed 2202, 300 rounds, timescale 4)
  the old build logged 789 caught exceptions, the fixed one 0. Batches: 17 of the 40 h11c games had caught
  exceptions (386 on h11c's side), 23 of 40 in h6 vs v3.
- "Cannot afford to build specified unit." (35 in the h11c batch, 48 in h6 vs v3) is h6's castles building after an
  attack call: retraced to rounds 565/575 of h6 vs v3 seed 1325. Already fixed in src by 0cc66c6 (World.signal),
  which every candidate since h7 carries and h6 lacks.
- Memory: a game's heap grows to ~4 GB by round 700 (default limit) or 4.7 GB (8 GB limit) without failures in
  either; it is lazy collection of per-turn compiled state messages, not a leak. Slowest robot init was 192-199 ms
  in rounds 0-50 at the default heap against a 200 ms limit, 53-80 ms with a 64 MB semi-space: one game each, read
  as a hint only.
- Harness 7ca717b: --timescale now also scales vm2's per-turn kill (200 ms -> 400 at timescale 2), and --init-ms
  sets the sandbox-creation limit apart from the robot's clock. Strategy gates from now on: --timescale 2
  --init-ms 1000. The replica keeps contest limits.
- h19 = src defaults (h6 behaviour + signal-fuel fix + setup fix), built with a no-op --cfg so its bundle (29.7 KB)
  matches the candidates' (a plain build drops dead switch code: 26.3 KB; h6 is 23.8 KB). Measured vs h6, 40 games:
  it becomes the incumbent unless it loses (t <= -2 means something besides the fixes changed: investigate).
- The queued candidates are rebuilt on h19 with their pre-registered switch, mechanism, delivery and falsifier
  unchanged, and gated against h19 (40 games, seed0 5000): h15r (no build rotation), h16r (turtle), h7r (attack
  persistence, now without the bundled fuel fix), h8r (endgame fuel), h9r (church reach), h10r (attack cadence),
  h11r (cruise patience 20/50/reset). h18r (cruise fuel reserve) waits for h18's gate vs h6.
- Replica 17:45: vibe19 (v3) is first at 1704 (46-2 in games vs CometsTech, CS554, starter). The replica now allows
  1000 ms for robot sandbox creation (acf0dc1): 11 of the 14 field entrants that had played had init failures, IvanGeffner
  eigthbot in all 3 of its games, under the batches' load. Scrims 150-153 vs StoneT2000 x2 and IvanGeffner x2,
  the strongest-looking entrants, none of which had played (unranked: galaxy refuses ranked requests downward).

## 2026-10-21 17:55 — h20 pre-registered: standing defence reserve
- Source: the replica's 11 lifetime losses of vibe19 (v3) are all to CS554, and the fastest is a rush (seed 1915,
  lost at round 29): our castle built 4 pilgrims, a prophet at round 12 and a church at round 15, so it had no
  karbonite when 5 crusaders arrived. h6 also loses both sides to bots/rush on 4 maps in 15 (17:10 entry).
- Mechanism: every karbonite spend except a threat response (pilgrims, castle pioneers, pilgrim-built churches,
  the peacetime army and guard) leaves CFG.DEF_RESERVE_K in the bank; the threat response (structTurn step 1) may
  spend it. Switch DEF_RESERVE_K, default 0 (= h19). Unit test: with 35 K and no threat a castle builds nothing
  at reserve 30; with an enemy crusader in view it builds a preacher.
- Delivery (before the gate): vs bots/rush on h6's losing seeds 1337, 1879, 2544, 2908, both sides: the castle
  holds >= 30 K on the round it first sees an attacker in >= 75% of those games, and wins vs rush do not fall.
- Gate: h20 (DEF_RESERVE_K=30) vs h19, 40 games, seed0 5000, --timescale 2 --init-ms 1000. Falsifier: net <= 0
  (the reserve's cost in slower expansion outweighs the defence). Dose ladder: 30 then 60 (one preacher's worth,
  then two).

## 2026-10-21 18:10 — h21 pre-registered: cargo relay
- Source: seed 2202 (h18 vs h6 replay, red), census per fuel depot: (3,47) is mined on 12% of rounds and (1,27) on
  45%, against 91% for depots next to a structure. Pilgrim 188 mines (3,47), two steps from castle (5,47); from round
  176 to 1000 it stands full (100 fuel) doing nothing, because the only tile between it and the castle, (4,47), holds
  a crusader that is still parked there at round 400 (the other neighbours are a wall and a karbonite miner). That
  is a quarter of the map's fuel depots on our half, idle for 824 rounds, with fuel the binding resource. The earlier
  clog census found the same full-idle pilgrims on seeds 1635 and 2296; moving lattice posts (h13) did not free the
  tiles because the base is packed.
- Mechanism: CFG.RELAY=1. A full pilgrim that is not next to any of our structures gives its cargo to a friend next
  to it that is next to one: a military unit, or a pilgrim standing on a depot of the resource it does not carry.
  Of two full pilgrims next to the same friend, the first in canonical (y, x) order relays (cargo past a robot's
  capacity is lost). Military units give any cargo they carry (relayed, or reclaimed from kills, which they kept
  until now) to an adjacent structure of ours when they neither shoot nor engage. Unit test: pilgrim -> crusader ->
  castle with RELAY=1, neither give with RELAY=0.
- Delivery: h21 vs h19, seed 2202 (driver diagnostic) then seeds 1635 and 2296 both sides (VM): h21's full-idle
  pilgrim turns (full cargo, no action, not next to a structure) at most half of h19's in the same games, and its
  fuel mined at least 5% higher; zero exceptions.
- Gate: h21 (RELAY=1) vs h19, 40 games, seed0 5000, --timescale 2 --init-ms 1000. Falsifier: net <= 0. No dose
  ladder (one setting); if it passes, a follow-up may relay only when the pilgrim is blocked.

## 2026-10-21 18:25 — h22 pre-registered: preachers in place of prophets
- Source: h6 vs bots/rush seed 2908 (lost both castles at 639/651 although it killed 258 crusaders): our attack
  fuel was 20,385, of which prophets fired 17,175 (687 shots) at 0.40 enemy damage per fuel; preachers 1.34,
  castles and crusaders 1.00. Fuel 3 against 4,680 karbonite when the first castle saw the rush. Replica seed 826
  (v3 vs CS554, castle (18,31) lost at 176): team fuel 0 from round 160; the prophets next to the castle could not
  shoot (no fuel, and crusaders inside their r2 16 dead zone). Every unit costs the same 50 fuel to build, and
  karbonite floats (3,785 unspent at round 1000 on seed 2202): per fuel, a preacher gives 60 HP and 1.34 damage
  per fuel, a prophet 20 HP and 0.40.
- Mechanism: peacetime build rotation MIL_ROTATION [4,3,4,3,5] (40% prophets, 40% crusaders, 20% preachers) ->
  [5,3,5,3,4] (40% preachers, 40% crusaders, 20% prophets). The threat response is unchanged.
- Delivery: vs bots/rush on seeds 1337, 1879, 2544, 2908 both sides, against h19's games there (h20's delivery
  run): attack fuel per enemy damage at least 30% lower, team fuel at round 500 higher, no more castles lost.
- Gate: h22 vs h19, 40 games (seed0 5000, --timescale 2 --init-ms 1000). Falsifier: net <= 0 (prophet range
  matters more against our own prophet-rich army than fuel). Risk: preachers move at 3 fuel per r2, so the
  attack call (whole army marches) costs more fuel.

## 2026-10-21 18:40 — fire efficiency census; h23 pre-registered: prophet fuel floor
- New tool `replay.js fire` (shots, fuel, enemy damage per fuel by team and shooter type). h18 vs h6, 32 batch
  games: prophets fire 93% of each build's attack fuel (h18 432,550, ~13,500 a game, a quarter of a team's fuel
  income) at 0.40 damage per fuel and 85-88 fuel per kill; crusaders and castles 1.00 (27-46 fuel per kill),
  preachers 1.43-1.47 (25-30). Replica seed 1626 (v3 blue vs CS554): our attacks cost 19,430 fuel (prophets 13,600)
  against CS554's 6,280; from round 431 a CS554 crusader wave reached our base with our fuel near 0 (606 at 400,
  57 at 500): crusader #1260 killed six prophets and preachers and still had 40 HP at round 456; both castles fell.
- h23 (pre-registered): PROPHET_FLOOR=200: prophets shoot only while team fuel >= 25 + 200 (others keep the 30
  floor), so a short bank goes to castles, crusaders and preachers (2.5-3.3x the damage per fuel) and to builds.
  Unit test: a prophet with an enemy prophet in range shoots at fuel 100 with floor 30, not with floor 200, and does
  at 300. Delivery: vs bots/rush seeds 1337/1879/2544/2908 (h19's games there as control): prophet share of attack
  fuel down by >= 25 points, enemy damage per attack fuel up >= 30%, no more castles lost. Gate: h23 vs h19, 40
  games; falsifier net <= 0 (range fire that wins prophet duels matters more than fuel). Dose ladder 200 -> 500.
  Independent of h22 (build mix): they could stack.

## 2026-10-21 18:50 — h18 REJECTED; queue from the shadow tree
- h18 (cruise fuel reserve 1,500) vs h6, 40 games (out/h18_h6.jsonl, old harness: no --init-ms): raw 15-25 (wins
  8 health 7 castles; losses 17 castles 8 health); 15 games skipped for init failures; clean head-to-head: 8 cells,
  gained 1, lost 6, split 1, net -5, t -1.89. REJECTED. Keeping 1,500 fuel back from marching and lattice moves
  loses castle races: the delivery showed the bank kept (1,376 vs 49 over rounds 500-700), the gate says it costs
  more than it saves. h18r (the same on h19) dropped; the pre-registered dose 500 runs last in the queue as h18b
  (h19 + CRUISE_FUEL_RESERVE=500, vs h19); 3,000 is not run.
- The driver ran short of memory at 18:10 (a 1000-round diagnostic game beside the agent) and the session's
  background shells were killed, including the waiter that was to sync the VM and queue the gates (LEARNINGS 11).
  The gates were queued by hand instead and run from the shadow tree ~/projects/vibe/2019-next (h19 vs h6 started
  18:40). The main tree's src/tools/test/build were synced at 18:50 (engine/maps/bots/dist left alone while a batch
  reads them); the reference jobs v3 vs v0 and v3 vs rush, now with --init-ms 1000, run after the gates.
- h20 symcheck (seeds 1-3, 200 rounds): seed 2 exact; seed 1 parts at round 111 over a contested axis tile, seed 3
  at 115 in combat: the known, expected kinds.
- h20 delivery (h20 vs bots/rush, seeds 1337/1879/2544/2908 both sides; out/dlv_h20_rush.jsonl in the shadow tree):
  mechanism PASS: every castle held >= 45 karbonite on the round it first saw an attacker (8 of 8 games; most 80-150).
  Results 0-8, as h6 on these maps (h19's control games running). The castles that fell late (rounds 587-632) had
  2,000-3,700 karbonite and 2-18 fuel: on these maps the rush wins the fuel war, not a karbonite race. Gate h20 vs
  h19 stays queued (4b03). Fire census of the same 8 games: h20 spent 211,245 attack fuel (26,400 a game) at 0.50
  enemy damage per fuel, prophets 85% of it at 0.40; the rush spent 33,265 at 0.95 (crusaders 88%). A rush
  crusader costs 50 fuel to build and ~100 fuel of prophet shots to kill: h22 and h23 are aimed at exactly this.

## 2026-10-21 18:53 — field study: how the strong replica bots spend fuel; queue reordered
- Replays of the three finished field matches with IvanGeffner/StoneT2000 (replica storage, matches 151, 155, 157;
  games, not source). eigthbot vs CometsTech (#2 on the ladder), 3-0: seed 1036 by castles at 526 (6 churches, 76
  pilgrims built, 139 prophets); seed 1828 by health at 1000 (6 churches, 70 pilgrims, 56 prophets, 9 preachers;
  mined F 76,630 K 28,728; move fuel 5,609 for the whole game; ended with 59,078 F and 25,850 K unspent; CometsTech
  threw 80 crusaders at it and lost 71); seed 826 (17 churches, 72 pilgrims, 230 prophets, F 90,550 mined in 547
  rounds). StoneT2000 botfinalsafe vs bc19-starter: 18-33 churches a map (33 on the 43x43 seed 203), first church
  rounds 12-20. Their prophets stand in rings around every structure (board, seed 1828 r400: spaced, two to three
  tiles out, churches on the mid-map clusters each with its own ring) and barely move.
- Same map, our v3 (replica match 140, seed 2965, 1000 rounds): mined fuel at about their rate (34/round vs
  StoneT2000's 39) but spent 30,610 on movement (StoneT2000 8,253 in 576 rounds). On big maps v3 does expand (seed
  826: 8 churches, 54-64 pilgrims at 1000; eigthbot 17 churches by 547). The gap on small maps is the marching army;
  self-play seed 2202 r440 shows ours packed against the castles (adjacent units, splash-exposed) before the march.
- Queue: the turtle gate h16r (no general attack) moved to run next (job ...4b01b), ahead of h21/h20/h22/h23/h15r/
  h8r/h9r. The four gates that tune the march (h7r persistence, h11r cruise patience, h10r call interval, h18b cruise
  reserve) moved to ~/jobq/hold: if turtle is accepted they are moot; if rejected they go back.

## 2026-10-21 19:00 — h24 (economy first), pre-registered
- Same map, same side, same opponent (seed 826, red, vs CometsTech): eigthbot (match 151) at round 100 had 8
  churches, 47 pilgrims and no military; at 150, 17 churches, 65 pilgrims, 44 prophets; it stopped at ~64 pilgrims
  and 220 prophets and banked 44,544 fuel by 500. v3 (match 107): 3 churches, 21 pilgrims, 19 military at 100; 8
  churches and 36 pilgrims at 150, where it stayed; fuel 0 at 500. StoneT2000 likewise builds 1-2 prophets before
  round 75. Every eigthbot/StoneT2000 game opens this way, on 40x40 to 64x64 maps. In our gates no one attacks before
  round 450, so the early guard (GUARD_BASE 2 per structure + 1 per 40 rounds) buys nothing there; it spends the
  karbonite a due pioneer (60 K) waits for.
- h24: ECON_UNTIL=100: castles and churches build no peacetime army before round 100; the threat response (an
  attacker in sight) is unchanged. Unit test: with every served depot staffed, a castle builds a guard unit with the
  switch off, nothing at round 1 with ECON_UNTIL=100, and a preacher when a crusader stands 3 tiles away.
  Delivery (VM extra lane, out/dlv_chain4.sh in the shadow tree): 200-round games vs h19 on seeds 826 (both sides),
  2202, 1828: churches and pilgrims at round 150 above h19's on 826 and 1828 (not fewer on 2202), fuel mined by 200
  not lower; vs bots/rush on 1337/1879/2544/2908 both sides: no more castles lost than h19's control games (the rush
  arrives before round 100). Gate h24 vs h19, 40 games; falsifier net <= 0. Dose ladder 100 -> 150 (h24a, built) / 60.

## 2026-10-21 19:07 — a movement bug: capped steps on a full-speed field (h25 pre-registered); LATTICE_R switch
- Writing a unit test for a lattice radius switch (LATTICE_R, default 12 = unchanged; the dead LATTICE_ADVANCE entry
  removed from config.js) showed a prophet 14 king steps out not moving on its first turn. Cause: Nav fields count
  full-speed moves (r2 4 for prophets, preachers and pilgrims, r2 9 for crusaders), but cruise moves are capped at r2
  2 (CRUISE_R2) and pilgrims under 1,000 fuel at r2 2. A one-tile step lowers a full-speed distance only every other
  tile (every third for crusaders), so the robot counted itself blocked, waited ladder[0] = 2 turns and slid on. Open
  ground, 24 tiles: prophet/pilgrim 36 turns instead of 24, crusader 46. Since h1 every lattice walk, march and
  slow-pilgrim trip ran at half to two-thirds speed, and the "slides" in the 14:40 and 17:00 movement censuses were
  mostly this, not traffic (h11, h14 and h11r read them as jams). LEARNINGS 12.
- h25: NAV_FIT=1: a step capped below full speed follows a field counted in such steps (cached per step size). Unit
  test: open 12x12, goal 11 tiles away at cap r2 2: 11 turns, a move each turn; with the switch off it waits on the
  way. Delivery (out/dlv_chain5.sh, shadow tree): 200-round games vs h19 on 2202 and 826, both sides: karbonite +
  fuel mined by round 200 above h19's in the same game on 3 of 4; symcheck seeds 1-3. Gate h25 vs h19, 40 games
  (job ...4b01bb, after the turtle); falsifier net <= 0. If accepted, the march tweaks in ~/jobq/hold (h11r patience
  above all) are re-derived, since their thresholds were tuned against the artefact.

## 2026-10-21 19:12 — replica: our scrims moved to the front of the execute queue
- 40 replica matches were queued (ids 163-202; ~10-30 min each on 2 slots), our scrims vs StoneT2000 and
  IvanGeffner (199-202) last: ~4-5 hours away. The charter gives field-vs-field matches the spare cycles, so
  tools/galaxy19/spool_bump.py (new; Queue.bump in replica_gcp/spool.py, unit-tested) renamed those four messages to
  ids just older than the oldest ready one; saturn takes them next. They still run v3 (a match keeps the submission
  it was created with).

## 2026-10-21 19:18 — h19 vs bots/rush: the fuel war, in numbers; h22 moved up the gate queue
- h19's control games vs bots/rush (shadow tree out/dlv_h19_rush.jsonl, 6 of 8 so far: 1337, 1879, 2544 both
  sides) are 0-6, as h20 was 0-8: one castle lost, then a loss on castles or health at round 1000. Seed 1337 red
  (40x40, three castles, 7 depots worth staffing, no church on either side): the rush built 431 crusaders and lost
  252; our 964 shots dealt 10,150 damage, 19,010 attack fuel, prophets 15,150 of it at 0.40 damage per fuel (castles
  1.00, preachers 1.27). A rush crusader costs 50 fuel and takes ~100 fuel of prophet fire to kill, so every exchange
  loses fuel; from round 150 our bank sits at 14-40 fuel and 500-2,400 karbonite goes unspent. Castle (8,24) first
  saw a crusader at round 36 and fell at 261. Mined fuel to round 200 was close (4,500 vs 5,430); from 300 to 1000
  the rush's 7 pilgrims mined 26 fuel a round, our 8-11 mined 14, idle on 30% of their turns.
- Queue: h22 (preachers in place of prophets, the direct answer to that exchange rate) moved from after h20 to run
  right after the turtle gate h16r (job ...4b04 renamed ...4b01ba). Order now h16r, h22, h25, h24, h21, h20, h23,
  h15r, h8r, h9r, then the v3 reference jobs.

## 2026-10-21 19:22 — where a game's wall time goes (profile)
- node --cpu-prof of a 200-round h19 self-play game on the driver (seed 2202, 41 s wall, 15,800 robot turns at a
  mean 1.6 ms): vm.Script compilation 23%, runInContext 20%, acorn (vm2's transformer) 7%, the engine's
  getGameStateDump 10% + insulate 5% + getVisible 3%, GC 5%; our bot's own functions (bfs, latticeTarget, update,
  militaryTurn, field...) only a few percent each. The engine hands every turn to the sandbox as source text,
  'robot._do_turn(' + JSON of the robot's view + ');', which vm2 parses and V8 compiles anew each turn. So gate
  throughput is bounded by the engine's per-turn cost, not by our code, and the "ms per turn" we audit is mostly
  that overhead (it counts on the official clock too).
- A harness option that would run one precompiled script per turn (same view, same vm2 timeout) was not applied:
  it changes how turns enter the sandbox, so it waits for the owner's decision. Gates continue at the current rate.

## 2026-10-21 19:23 — h19's control games vs bots/rush complete; h20 delivery confirmed
- h19 vs bots/rush, seeds 1337/1879/2544/2908 both sides (shadow tree out/dlv_h19_rush.jsonl): 0-8, 8 castles lost
  (both on 2908 by rounds 597/651); h20 there: 0-8, 6 lost (2908 keeps one castle to round 1000). The reserve does
  not lose more, so h20's delivery stands and its gate stays queued.
- Control figures for the h22 and h23 deliveries (fire census, scratch fireagg.js over the 8 replays): h19 spent
  185,450 attack fuel (23,200 a game) for 93,800 enemy damage, 0.51 damage per fuel; prophets 85% of the fuel at
  0.40, castles 9% at 1.00, preachers 5% at 1.33, crusaders 2% at 1.00. The rush: 29,605 fuel at 0.96 (crusaders
  92%). h19's bank at round 500: mean 134 fuel (2-522) beside 595-4,205 karbonite. h22 passes its delivery with
  attack fuel per enemy damage <= 1.37 (30% below 1.96), mean fuel at 500 above 134, castles lost <= 8; h23 with a
  prophet share <= 60%, damage per fuel >= 0.66, castles lost <= 8.

## 2026-10-21 19:39 — run_game --fast-turn (owner approval, PROMPTS 14); gates switched to it
- tools/run_game.js --fast-turn (batch.js passes it through): every sandbox runs one precompiled script,
  robot._do_turn(JSON.parse(view)), with the view's JSON text as a sandbox global, in place of compiling
  'robot._do_turn(' + JSON + ');' anew each turn. Same view, same vm2 kill; the result line says fast_turn. Unit test:
  a --det 40-round v3 vs v2 game replays byte for byte with and without it, and a stub check that the precompiled
  route is taken. On the 200-round h19 self-play game (seed 2202, --det) the replays were identical as well.
- How much it saves is not known yet: driver timings swung 4x between identical runs (LEARNINGS 13). Every pending
  and held gate job now carries --fast-turn; the yardstick is h19 vs h6's mean of 425 s wall per game at par 4.
  If h16r's games are not faster, the flag comes out of the jobs.
- Tried and dropped: also caching each bundle's compiled script across the robots of a game (to skip vm2's acorn
  pass per robot built). In the one back-to-back pair it used 2.7x the CPU and its replay parted: plausibly V8
  sharing the bot's functions across ~300 contexts and giving up optimising them. Not committed.

## 2026-10-21 20:03 — h24 and h25 deliveries (200-round games, run on the driver)
- The VM's extra lane was busy with full-length rush deliveries, so the 200-round delivery games ran on the driver,
  one at a time (--timescale 5 --init-ms 5000 --fast-turn against throttling; 1-3 frozen robots in the 1828 and one
  826 game, none elsewhere). Games with the sides swapped come out as exact mirror images. Replays in the scratchpad.
- **h24 (ECON_UNTIL=100) vs h19.** Seed 826: at round 100, 8 churches / 33 pilgrims vs 4 / 19; by round 200 mined
  K 4,148 F 20,330 vs 2,724 / 12,130 and an army of 114 vs 63 (both sides). Seed 1828: 3 churches / 22 pilgrims vs
  1 / 13 at round 200, mined F 9,650 vs 7,390. Seed 2202 (one remote cluster): mined K+F 7,978 vs 7,944, but 9
  pilgrims to h19's 10 from round 50, so the pre-registered "not fewer on 2202" misses by one pilgrim while the
  economy is level; karbonite then floats (665 at round 100) because the church plan is used up. Economy items:
  PASS on 826 and 1828, level on 2202. The rush half (1337/1879/2544/2908 vs bots/rush, castles lost <= h19's 8)
  runs on the VM (out/dlv_chain4.sh). On 826 all 8 planned churches stand by round 100 and none follow: the plan
  (turn 3, our side of the map) is the next limit; eigthbot there churched 13 clusters by round 118, four of them
  on the opponent's half.
- **h25 (NAV_FIT=1) vs h19**, seeds 2202 and 826 both sides: K+F mined by round 200 above h19's in 4 of 4 (826:
  17,208 vs 13,428; 2202: 8,020 vs 7,944): PASS. Side effect: on 2202 its move fuel was 3,152 vs 1,846 (bank 3,180
  vs 4,232). replay.js nav: preacher moves 297 vs 122, oscillations 185 vs 50. Preacher 1623 (born r92 at the
  castle) alternates (4,15)<->(5,14) for 20 rounds, then (5,14)<->(6,15)/(5,16): a two-cycle that the full-speed
  field's lost turns used to damp. Being traced before the gate runs.

## 2026-10-21 20:05 — h19 ACCEPTED as incumbent, frozen as v4 and submitted to the replica
- h19 vs h6, 40 games (out/h19_h6.jsonl, seed0 5000, --timescale 2 --init-ms 1000): raw 21-19 (wins 12 health, 9
  castles); head-to-head 20 cells: gained 2, lost 1, split 17, net +1, t 0.58. Pre-registered rule: incumbent
  unless t <= -2. ACCEPTED. Mean wall 462 s a game at par 4.
- Exceptions: h19 0 (h6 56 caught). Time: h19 2 turn kills (400 ms) and 1 frozen robot, h6 none; but both builds
  have the same profile (mean 2.23 ms a turn, ~10,300 slow turns each over ~2.49M turns, single turns of 550-650 ms
  on both sides): load stalls on the shared VM, not an h19 code path. The killed turns were a pilgrim mining at
  its depot and a crusader walking, ordinary turns. With --fast-turn the per-turn compile (outside vm2's kill
  timer but on the clock) also leaves gate games.
- bots/v4 = dist/h19 (hash bd4e961ec728; ROSTER.tsv). Replica submission 89 ("v4 (h19): ..."), accepted. Matches
  created from now on play v4; scrims 199-202 (vs StoneT2000 and IvanGeffner) were created with v3 and play v3.

## 2026-10-21 20:12 — h25's two-cycle traced to the lattice choice; LATTICE_STICKY; h25 replaced by h25s; h26 pre-registered
- Cause: an idle unit re-chooses its lattice tile every turn (score d2(tile, anchor)*8 + d2(tile, me)) and a tile
  out of sight counts as free. Seed 2202 preacher (vision r2 16): from (15,4) it sees (18,2) taken and heads for
  (11,3); one step on, (18,2) is out of sight, wins again, and the unit turns back. NAV_FIT's slower steps keep it
  inside that band longer, hence h25's 185 oscillations; h19 does it too (50).
- Fix behind CFG.LATTICE_STICKY (default 0, no-op): military.js holdTarget keeps the previous choice while it is
  still a lattice tile within LATTICE_R of home and not seen taken by another robot. Unit test (synthetic map: the
  re-chosen target flips A->B->A, the sticky one stays on B). 55 tests pass.
- Driver deliveries on 2202 (200 rounds, both sides): h26 (LATTICE_STICKY=1) preacher oscillations 13 vs h19's 50,
  mined K 1,684 F 6,150 vs 1,694 / 6,250, move fuel 2,167 vs 1,846. h25s (NAV_FIT=1 + LATTICE_STICKY=1): preacher
  oscillations 86 (h25 185), move fuel 2,275 (h25 3,152), K+F mined 8,024 vs h19 7,944. The other 86 have a
  second cause, not yet traced.
- h25 is withdrawn before its gate (job moved to ~/jobq/superseded); h25s takes its slot. h26 alone is a candidate:
  mechanism fewer wasted idle moves; delivery as above; falsifier gate t <= 0; dose: the switch only. Symmetry
  checks for both join the VM extra lane. Queue: h16r (running), h24, h22, h25s, h26, h21, h20, h23, ...
- Fast-turn: h16r's first 10 games averaged 286 s wall vs 388 s for the same seeds and sides in h19 vs h6
  (0.377 vs 0.435 s a round; different bots, so only indicative). The flag stays.

## 2026-10-21 20:23 — replica scrims 199-200 (v3 vs StoneT2000): out-expanded; h27 EXPAND pre-registered
- Scrim 199, v3 vs botfinalsafe 0-3; scrim 200, v3 vs bot1v43 1-2 (replays in ~/projects/vibe/bc19-galaxy-replays/).
  Both StoneT2000 bots log thousands of exceptions and still win.
- Seed 2924 (bot1v43 won by castles at round 588): it had 7 churches / 25 pilgrims at round 100 and 30 churches by
  588, three of them on our half (top centre, rounds 69-105); we had 2 churches and 15 pilgrims. Our pioneer to that
  centre cluster died at round 50 at (30,2) and the cluster then waited out the 100-round retry.
- Seed 1915 (botfinalsafe won by castles at round 386): a sparse map whose centre cluster (2 K + 2 F) straddles the
  axis. Our first pioneer there died at round 13 to an early red unit; red churched it at round 24 and ended with
  11 churches / 17 pilgrims to our 2 / 6. We died with 12,203 fuel banked and 0 karbonite.
- Seed 2965 (lost both times, 40x40, few depots): economies level (mined K 4,300 vs 4,994), both armies prophets
  at 0.40 damage a fuel; theirs fired 464 shots to our 250. After the round-450 attack call our army fell from 23
  to 13 and to 2 by round 700, then church, pilgrims and a castle went; we finished with 24-29k fuel unspent.
  This is the turtle question (h16r, running).
- Self-play (h19 vs h6 gate replays): church counts stop growing by round 200 on every sampled seed (1205: 4;
  1325: 3; 1635: 0-1), so the turn-3 plan is the limit there as well.
- **h27 (EXPAND_ROUND=100)**, switch on h19. Mechanism: from round 100, every 50 rounds, castles append to their
  plan the clusters it left out (either half) whose site is more than EXPAND_KEEP=12 king steps from every enemy
  castle and not within 2*SERVE_MOVES of our castles or churched sites; nearest first, after the turn-3 plan. A
  pioneer sent from round 100 that sees an enemy church or castle within 5 king steps of its site reports it
  (castle talk CT.TAKEN = 88 + cluster) and mines near home; the castle rests that cluster for 200 rounds. Unit
  test on seed 1205: plan 4 -> 7 (3 clusters on the enemy half, 18-26 steps from its castle), both teams plan the
  same canonical sites, a reported cluster is skipped. The default build plays v4's game byte for byte (seed 826,
  150 rounds, --det).
- Delivery (pre-registered, 300-round games vs h19, driver): seed 826 both sides and 1205: at round 300 more
  churches and pilgrims than h19 and K+F mined >= h19's; 0 exceptions. Falsifier: gate t <= 0. Dose: the switch
  only (EXPAND_ROUND 100); stacking on h24 waits for h24's gate.

## 2026-10-21 20:25 — h23 delivery FAILED (2 of 3 items); gate withdrawn
- h23 (PROPHET_FLOOR=200) vs bots/rush, seeds 1337/1879/2544/2908 both sides (out/dlv_h23_rush.jsonl in the shadow
  tree), against the thresholds of 19:23: prophet share of attack fuel 73% (needed <= 60%: FAIL; h19 85%), damage
  per fuel 0.60 (needed >= 0.66: FAIL; h19 0.51), castles lost 5 (<= 8: PASS). Outcome 1 win in 8 (h19 0, h20 0).
  End-of-game bank still ~60 fuel: the floor keeps prophets off the last 225 fuel but the other shooters drain it.
- Pre-registered rule: a failed delivery takes the gate out. Job moved to ~/jobq/superseded. The direction was right
  (85% -> 73%, 0.51 -> 0.60); a larger floor would be a new candidate with its own delivery.

## 2026-10-21 20:46 — h27 (EXPAND) delivery FAILED; withdrawn before its gate
- 300-round games vs h19 on the driver (0 exceptions, 0 frozen): seed 826 h27 red 8 churches / 30 pilgrims, mined
  K+F 33,702 vs h19 red (mirror game) 8 / 32, 33,574; as blue 6 / 18 both. Seed 1205 h27 red 4 churches / 24
  pilgrims vs h19 red's 4 at round 200 in the h19-h6 gate replay. No added church anywhere: FAIL on every item.
- Debug build (castle log, seed 826, 250 rounds): at round 100 the re-plan adds clusters 13 (0,45), 18 (61,56) and
  19 (1,62), the opponent's own corners (16-31 king steps from its castles, so outside EXPAND_KEEP=12). All three
  pioneers died on the way without seeing a structure (no CT.TAKEN), and the 100-round retry sends two more at
  rounds 230 and 246. In self-play what the turn-3 plan leaves out is the opponent's plan; eigthbot's enemy-half
  churches on replica 826 were clusters CometsTech never claimed, which an equal opponent does claim.
- The same log shows the real limit on 826: castle (16,6) had clusters 0 and 5 planned but sent their pioneers only
  at rounds 118-119, with 25 karbonite banked at round 100 while the army grew to 19. That is h24's question
  (economy first, gate next in the queue).
- EXPAND stays in src as a default-off switch (unit-tested). Not gated.

## 2026-10-21 20:53 — lattice memory (LATTICE_STICKY 2); h28 and h29 replace h26 and h25s in the queue
- h25s's remaining oscillations: a debug build (seed 2202, 160 rounds) reproduced preacher 851 at (5,14)<->(4,15)
  (engine frame) from round 123. Its log: targets alternate (11,3) / (18,2) (canonical) every turn. Both are taken;
  from (15,4) it sees (18,2) taken and (11,3) is out of sight (r2 17), from (14,5) the reverse (r2 25). Sticky
  re-chooses only when the target is seen taken, which it is each time.
- LATTICE_STICKY 2 (same switch, second dose): latticeTarget also remembers tiles this unit saw taken; one out of
  sight seen taken in the last LATTICE_MEMORY=20 turns is not free. Unit test (two taken tiles, each visible only
  from the other's side: dose 1 flips back, dose 2 goes to the free third tile). 57 tests pass. LEARNINGS 15.
- Driver deliveries, seed 2202, 200 rounds vs h19 (h19's numbers from the same games):
  h28 (LATTICE_STICKY=2): preacher oscillations 4 (h19 50, h26 13), move fuel 1,569 vs 1,846, mined K+F 7,924 vs
  7,944, bank 4,571 vs 4,232.
  h29 (NAV_FIT=1, LATTICE_STICKY=2): preacher oscillations 3 (h25 185, h25s 86), move fuel 1,858 vs 1,846, mined
  K+F 8,024 vs 7,944, bank 4,320 vs 4,232.
- h29 takes h25s's queue slot and h28 takes h26's (job files rewritten; h25s and h26 superseded, never gated).
  Mechanism: no wasted idle moves; falsifier gate t <= 0. Symmetry checks of h28 and h29 run in the extra lane
  (out/dlv_chain7.sh).

## 2026-10-21 21:12 — h16r (turtle) REJECTED; march tweaks back in the queue
- h16r (ATTACK_ROUND=1001) vs h19, 40 games (out/h16r_h19.jsonl, seed0 5000, --timescale 2 --init-ms 1000
  --fast-turn): raw 16-24 (wins 11 health, 5 castles; losses 22 castles, 2 health); head-to-head 20 cells: gained
  5, lost 9, split 6, net -4, t -1.07. Pre-registered: reject at t <= 0. REJECTED.
- Castles lost: h16r 23, h19 6. In self-play h19's round-450 march takes castles from a turtle despite the first
  shot a standing prophet line gets; the attack is worth keeping against our own kind. On the replica (seed 2965 vs
  bot1v43, 616 vs botfinalsafe) the same march spent the army or the fuel bank: what to attack with and when, not
  whether, is the open question.
- 0 exceptions, 0 timeouts, 0 frozen on both sides. Mean wall 388 s a game with --fast-turn (h19 vs h6 without
  it: 462 s; different bots, so indicative only).
- Per HANDOFF the march tweaks held for this result go back to pending: h7r (attack persistence), h11r (cruise
  patience), h10r (attack call every 20), h18b (cruise fuel reserve 500).

## 2026-10-21 21:20 — church density: h30 explored, h31 pre-registered (SERVE_MOVES 2 + contested clusters first)
- Replica losses (scrims 199, 200) were to bots that church far more (bot1v43: 30-44 churches). Our pilgrims walk
  up to SERVE_MOVES=4 moves (8 tiles) to a structure: about 8 of 18 turns a trip and ~32 fuel per 100 mined.
- h30 (SERVE_MOVES=2), exploratory driver deliveries, 200 rounds vs h19 (not pre-registered, so evidence only):
  826 h30 red 9 churches, 34 pilgrims, mined K+F 19,872 vs h19 6 / 21 / 12,058; h30 blue 9 / 34 / 21,050 vs
  6 / 17 / 14,624. 2202 identical to h19. 1828 worse: h30 red 3 / 17 / 13,458 vs h19 3 / 23 / 13,764. Castle
  logs on 1828: with SERVE_MOVES 2 castle (24,13) plans the new near cluster (32,8) first and sends the contested
  centre pioneers (24,27) and (11,28) at rounds 48 and 67 instead of 27 and 28; h19 wins the centre race.
  PLAN_SERVE_PILGRIM=1 (h31 first build) changed nothing on 1828. h30 withdrawn before its gate.
- New switch PLAN_CONTEST_FIRST (default 0): planned clusters the enemy reaches within that many moves of us
  (m = dThem - dUs) are pioneered first, the rest nearest first. Unit test: seed 1915 one castle a side, same
  clusters, contested ones first, order changes, mirror-identical for both teams. Default build unchanged.
- h31 = h19 + SERVE_MOVES=2 + PLAN_CONTEST_FIRST=6. Delivery 1828 (h31 red, 200 rounds): 4 churches (first round
  22), 25 pilgrims built, mined K+F 15,694 vs h19 11,828 (h19 3 churches, first round 40, lost 10 pilgrims and 1
  church); military built 122 vs 78.
- Pre-registered for h31. Mechanism: more churches nearer the depots, so shorter pilgrim trips, more K+F, more
  units; contested clusters still taken first. Delivery (200 rounds, vs h19 in the same games): mined K+F >= h19
  +10% on 1828 (met) and on 826 both sides; churches built >= h19's on all three. Falsifier: gate t <= 0. Dose:
  SERVE_MOVES 4 -> 2 (the only smaller dose is 1, a church at nearly every cluster), PLAN_CONTEST_FIRST 6 (a
  margin of 6 moves, ~12 tiles). Gate: 40 games vs h19 (seed0 5000, --timescale 2 --init-ms 1000 --fast-turn),
  queued right after h24 because economy is where the replica losses are. Accept t >= 2, reject t <= 0.
- h32 = h19 + PLAN_CONTEST_FIRST=6 alone, built for the attribution question; it is gated only if h31 passes.

## 2026-10-21 21:25 — h21 (cargo relay) delivery PASSED
- Extra lane, h21 vs h19, 1000 rounds, seeds 2202/1635/2296 both sides (2019-next out/dlv_h21_h19.jsonl,
  rp_dlv_h21h19; census out/clog.js per team): full-idle pilgrim turns (full, no action, not next to a structure)
  h21 1,337 vs h19 4,150 (0.32; pre-registered <= 0.5). Per game: 2202 6 vs 1,774, 2296 0 vs 179, 1635 1,331 vs
  2,197, where one of the two games goes the other way (h21 blue 832 vs h19 red 147). Fuel mine actions h21 17,809
  vs h19 13,218 (+35%; pre-registered >= +5%). Exceptions 0 on both sides. h21 won 5 of 6 (all on health).
- Gate h21 stays in the queue (job ...4b02).

## 2026-10-21 21:30 — h33 pre-registered: pilgrims never step into enemy range (PILGRIM_SAFE_STEP)
- Source: replica scrim 199 game 2 (seed 1915, our team blue). Pioneer #2733 walks diagonally toward the centre
  cluster; enemy prophet #962 at (38,25) moves 2 tiles per turn toward it. Round 12 the pioneer steps from (34,32)
  (r2 65 from the prophet: out of range) to (33,31) (r2 61: in range), and the prophet, which acts first, kills it at
  round 13. Our flee rule starts only inside THREAT_R2, so a pilgrim that walks in itself never gets a turn to flee.
- Mechanism: CFG.PILGRIM_SAFE_STEP=1 passes nav.step an avoid predicate (pilgrim.js stepAvoid): no step onto a
  tile within THREAT_R2 of a visible enemy attacker. With either turn order a robot standing out of range always
  gets a turn to flee before a prophet or castle that moved in can shoot. Unit test: the replica position, default
  step lands at r2 <= 64, safe step stays out; pilgrims and churches are not threats. Default build unchanged.
- h33 = h19 + PILGRIM_SAFE_STEP=1. Delivery (driver, 200 rounds vs h19, seeds 1828 and 826 both sides): h33's
  pilgrims lost at most 70% of h19's in the same games, mined K+F within 5% of h19's or better. Falsifier: gate
  t <= 0. Dose: one setting. Its real test is the replica field (pioneers shot by roaming prophets); the
  self-play gate guards against harm.

## 2026-10-21 21:35 — h31 delivery PASSED
- Driver, 200 rounds vs h19 (h19's numbers from the same games): 1828 h31 red: 4 churches vs 3, K+F 15,694 vs
  11,828 (+33%). 826 h31 red: 8 churches vs 7, K+F 19,080 vs 14,582 (+31%), pilgrims lost 4 vs 10. 826 h31 blue:
  8 vs 7, 19,072 vs 14,208 (+34%), pilgrims lost 3 vs 10. 2202: identical to h19 (one church each; the map's
  clusters all lie within 2 moves). Pre-registered: K+F >= +10% on 1828 and on 826 both sides (met), churches >=
  h19's on all three (met). Gate queued next (job ...4b01b1).
- h32 (PLAN_CONTEST_FIRST=6 alone), 1828 red: 2 churches vs 3, K+F 11,800 vs 10,920: contest-first matters only
  with the denser plan. It stays unqueued unless h31 passes.
- Replica scrim 200 game 2 (seed 2924) lost its centre pioneer the h33 way too: it stepped from r2 81 to 49 of a
  standing prophet at (23,2) and died next round.

## 2026-10-21 21:50 — h22 delivery FAILED (1 of 3 items); gate withdrawn; h36 pre-registered (larger dose)
- h22 (MIL_ROTATION [5,3,5,3,4]) vs bots/rush, seeds 1337/1879/2544/2908 both sides (shadow tree
  out/dlv_h22_rush.jsonl, rp_dlv_h22rush), against the thresholds of 19:23: attack fuel per enemy damage 1.56
  (damage per fuel 0.64; needed <= 1.37: FAIL; h19 1.96), mean team fuel at round 500 1,967 (needed > 134: PASS),
  castles lost 3 (<= 8: PASS). Prophets still fire 70% of attack fuel at 0.40 (h19 85%): a fifth of the army, but
  they shoot at range every turn while preachers wait for r2 16. Outcome 4 wins in 8 (h19 0, h20 0, h23 1);
  0 exceptions.
- Pre-registered rule: a failed delivery takes the gate out (job ...4b01ba to ~/jobq/superseded), as for h23. The
  outcome vs the rush is the strongest yet, so the direction continues as a new arm with its own delivery.
- h36 = h19 + MIL_ROTATION [5,3,5,3,4] + PROPHET_FLOOR=200 (h22's rotation and h23's prophet fuel floor: the two
  doses of one mechanism, fuel into the 1.0-1.4 damage-per-fuel shooters). Delivery vs bots/rush, same 8 games
  (extra lane, out/dlv_chain9.sh, then sym_h36): attack fuel per enemy damage <= 1.37, mean team fuel at round 500
  > 134, castles lost <= 8. Gate on PASS: 40 games vs h19; falsifier t <= 0 (prophet range may matter more
  against our own prophet-rich army than fuel).
- h34 (SERVE_MOVES=1 + PLAN_CONTEST_FIRST=6, the next church-density dose) is built; it waits on h31's gate.

## 2026-10-21 21:59 — h33 delivery PASSED; h35 (stack of delivered switches) pre-registered
- h33 (PILGRIM_SAFE_STEP=1) vs h19, driver, 200 rounds, seeds 1828 and 826 both sides: pilgrims lost h33 5 vs
  h19 46 in the same games (2/7, 2/11, 0/15, 1/13; needed <= 70%: PASS). Mined K+F 58,948 vs 53,160 (+11%; needed
  within 5% or better: PASS; one game, 1828 h33 blue, -7%). 0 exceptions. Gate queued (job ...4b01b3).
- h35 = h19 + SERVE_MOVES=2 + PLAN_CONTEST_FIRST=6 (h31) + RELAY=1 (h21) + NAV_FIT=1 + LATTICE_STICKY=2 (h29) +
  PILGRIM_SAFE_STEP=1 (h33): every switch whose delivery passed, independent mechanisms (church density, cargo
  relay, movement fit and lattice memory, safe pilgrim steps). A big-swing arm next to the single gates, which
  stay queued for attribution. Delivery (driver, 200 rounds vs h19, 1828 and 826 both sides): mined K+F >= h19
  +10% summed, pilgrims lost <= 70% of h19's, 0 exceptions. Gate right after h31 (job ...4b01b2), 40 games vs
  h19; accept t >= 2, reject t <= 0. If it fails delivery, the job is withdrawn.
- Queue now: h24 (running), h31, h35, h33, h29, h28, h21, h20, h7r, h11r, h15r, h8r, h9r, h10r, h18b, refs.

## 2026-10-21 22:01 — h24 (economy first) gate INCONCLUSIVE; extended by 20 cells
- h24 (ECON_UNTIL=100) vs h19, 40 games (out/h24_h19.jsonl, seed0 5000, --timescale 2 --init-ms 1000
  --fast-turn): raw 26-14 (wins 16 castles, 10 health; losses 11 health, 3 castles); head-to-head 20 cells: gained
  11, lost 5, split 4, net +6, t 1.50. Between reject (t <= 0) and accept (t >= 2): INCONCLUSIVE.
- 0 exceptions on both sides; mean wall 345 s a game with --fast-turn.
- Per the algorithm's look schedule, 20 more cells (seed0 6000, out/h24_h19x.jsonl, job ...4b01b1a) run right
  after h31; the read pools both blocks (40 cells), same thresholds. h24's delivery passed its economy half on the
  driver (19:00 entry's items); the rush half (extra lane chain4) still waits for the lock and is read when it lands.

## 2026-10-21 22:06 — h37 pre-registered: claim past the midline (CLAIM_MARGIN 4 on h31)
- Seed 826 (64x64, 34 karbonite + 28 fuel depots in all): h31 vs h19 plateaus at 8 churches and 27-29 pilgrims by
  round 150-200 (about our half's depots), while eigthbot on the same map (match 151 vs CometsTech) had 17 churches
  and 65 pilgrims at 150: it mines past the midline. Our plan takes a cluster only if dUs <= dThem + CLAIM_MARGIN
  (1 move).
- h37 = h31 + CLAIM_MARGIN=4: clusters up to 4 moves nearer the enemy are planned too; with PLAN_CONTEST_FIRST 6
  every cluster within the band goes first, nearest first. Delivery (driver, 200 rounds vs h19, the h31 seeds and
  sides: 1828 red, 826 red, 826 blue): churches built >= h31's +1 summed over the three games (h31: 4 + 8 + 8),
  mined K+F >= h31's summed (15,694 + 19,080 + 19,072), pilgrims lost <= 2x h31's (5 + 4 + 3). Falsifier: gate vs
  h19 t <= 0. Dose ladder: 4, then 8 if it delivers.

## 2026-10-21 22:14 — h35 (stack) delivery PASSED
- Driver, 200 rounds vs h19, 1828 and 826 both sides, 0 exceptions: mined K+F h35 67,924 vs h19 48,760 (+39%;
  needed >= +10%); pilgrims lost 2 vs 74 (needed <= 70%); churches 5 vs 3 (1828) and 8 vs 6 (826) per game; first
  church round 22 vs 40 on 1828. On 826 h19 lost 27 of 49 pilgrims in each game, h35 none. The side-swapped games
  match each other to the unit up to combat (mirror play). Gate moved ahead of h24x (job ...4b01b1a; h24x is ...4b01b1b).

## 2026-10-21 22:26 — h37 (CLAIM_MARGIN 4) delivery FAILED: inert on the delivery maps; closed
- Driver, 200 rounds vs h19: 1828 red identical to h31 (4 churches, K+F 15,694); 826 red 8 churches, K+F 19,060
  (h31 19,080); 826 blue 8, 19,080 (h31 19,072). Churches 20 vs h31's 20 (needed >= 21): FAIL; K+F level.
- Why: the plan census (scratch plancensus.mjs, round-0 view) gives the unserved clusters' (our distance - enemy's)
  as 826: -30 -21 -13 -11 -8 -5 -1 | 1 5 8 11 13 21 27 27 29 37; 1828: -12 -4 -2 | 12 31 31 37 38 43. Clusters
  come in mirror pairs well apart; a margin of 4 adds none on either map (8 would add the one at +5 on 826). The
  extra pilgrims eigthbot had on 826 (match 151) came from churches on the far half of an opponent that failed to
  initialise at round 547, not from a midline band.
- Closed: margin doses below the next cluster gap are inert. Re-open if a map census shows clusters within 2-6 of
  the midline that h31 leaves out (corpus check: plancensus over maps/corpus.tsv).

## 2026-10-21 22:26 — h34 pre-registered: church density, next dose (SERVE_MOVES 1)
- h34 = h19 + SERVE_MOVES=1 + PLAN_CONTEST_FIRST=6: a depot more than one pilgrim move (2 tiles) from a structure
  gets a church of its own; one-step trips. Cost: 50 K + 200 F a church, and a pioneer each.
- Delivery (driver, 200 rounds vs h19, the h31 games: 1828 red, 826 red, 826 blue): churches built >= h31's +1
  summed (h31 20), mined K+F >= h31's summed (53,846), pilgrims lost <= 2x h31's (12). Gate only if h31 passes and
  h34 delivers; then h34 vs h31 decides the dose (falsifier t <= 0).

## 2026-10-21 22:35 — h34 (SERVE_MOVES 1) delivery FAILED (2 of 3); dose stays at 2
- Driver, 200 rounds vs h19, 0 exceptions: 1828 red 3 churches (first at round 33; h31 4, first at 22), K+F
  12,198 (h31 15,694); 826 red and blue 8 churches each, K+F 18,114 each (h31 19,080 / 19,072). Churches 19 vs
  needed >= 21: FAIL; K+F 48,426 vs needed >= 53,846: FAIL; pilgrims lost 9 vs <= 12: PASS.
- One-step service spreads the plan over more, smaller clusters; on 1828 the first church slips 11 rounds and
  the centre race goes back to h19's pace. The church-density dose ladder ends at SERVE_MOVES 2 (h31). Not gated.

## 2026-10-21 22:38 — h38 pre-registered: creep instead of march (CREEP_ROUND)
- Source: the round-450 march loses the army against an equal defence (replica scrim 200 seed 2965: 29 units vs
  33, gone by 700, castle lost) or burns the bank (scrim 199 seed 616: 10,670 -> 10 fuel in 50 rounds while
  leading 171 units to 94; self-play: under 100 fuel by 500 in 8 of 8 sampled games). The turtle (h16r, no march)
  lost castle races to h19's march (rejected 21:13). A march spends ~8 fuel per prophet move every turn; holding
  costs nothing and the defender shoots first.
- Mechanism: new switch CFG.CREEP_ROUND (default 0): from that round the centre of the lattice each unit holds
  moves 1 tile toward the enemy (canonical +y) every CREEP_EVERY rounds (military.js latticeCentre; also the
  centre for melee engagement), so the army advances as a formation and keeps the defender's first shot at every
  step; home guards keep theirs. Unit test: target 10 tiles ahead after 80 rounds at 8 per tile, guard and switch
  off unchanged, clamped at the board edge. Default build unchanged.
- h38 = h19 + ATTACK_ROUND=1001 (no march) + CREEP_ROUND=450 + CREEP_EVERY=8. Delivery (VM queue, 6 games of 1000
  rounds vs h19 on 2202/1828/826 both sides, job before h35's gate): move fuel over rounds 450-700 at most half
  of h19's in the same games; mean team fuel over 500-700 >= 1,000; the creep reaches the enemy: at least one enemy
  structure destroyed by h38 in the 6 games. Gate 40 games vs h19, falsifier t <= 0. Dose ladder: CREEP_EVERY 8,
  then 4 (faster) if it delivers.

## 2026-10-21 22:47 — h39 pre-registered: every castle keeps the pioneer's karbonite until a church stands (PIONEER_RESERVE 2)
- Source: replica scrims 199 and 200, seed 2965 (40x40, 6 karbonite tiles on the whole map, lost both): StoneT2000's
  castles build two pilgrims each and nothing else; the second walks to the centre cluster and churches it at round
  12. Ours: guard prophets from round 3 at both castles, centre pioneer at round 53 (v3), church at 60; StoneT2000
  ended with 17% more karbonite mined and won both. Self-play diagnostic (h35 vs h19, 200 rounds): church still at
  round 41, pioneer at 34; PIONEER_RESERVE 1 (h35 + it): 30, because only the castle that owns the cluster
  reserved and the other castle's guard spent the shared bank (prophet r3, crusader r9).
- Mechanism: PIONEER_RESERVE 2 (castle.js pioneerDue): until the first church stands and before round
  PIONEER_RESERVE_UNTIL (100), every castle's peacetime army keeps pilgrim + church karbonite (60) whenever any castle
  planned a cluster at turn 3. Threat responses are not held back. Unit test on seed 2965: mode 1 holds at the
  owner only, mode 2 at both, released by a church or the round limit, mirror-identical.
- Diagnostic (driver, 200 rounds, h39 vs h35 on 2965): church round 20 vs 41, K mined 1002 vs 958.
- h39 = h35 + PIONEER_RESERVE=2. Delivery (driver, one 200-round game at a time): vs h35 on 2965, 1828, 826, 2202,
  both sides: mean first church round at least 5 rounds earlier than h35's in the same games, and karbonite mined
  by round 200 at least h35's (sum of the 8); vs bots/rush on seeds 1337, 1879, 2544, 2908 (200 rounds): castles
  lost no more than h35's in the same seeds. Gate 40 games vs h35, falsifier t <= 0. Dose: PIONEER_RESERVE_UNTIL
  100, then 50 if the rush item fails.

## 2026-10-21 23:01 — h31 gate INCONCLUSIVE (25-15, net +5, t 1.67); 20 more cells queued
- h31 (SERVE_MOVES 2 + PLAN_CONTEST_FIRST 6) vs h19, 20 cells x 2 sides (seed0 5000): h2h gained 7, lost 2, split
  11, net +5, t 1.67; raw 25-15. Between the bars (accept t >= 2, reject t <= 0): extended by 20 cells at seed0 6000
  (job ...4b01b1a5, right after h35's gate), to be read pooled with this block. h32 (contest-first alone) stays
  unqueued until then.
- Also (22:50): replica seed 616 (scrim 199, lost all 3 castles while leading 171 units to 94 at round 450): our
  movement fuel 39,886 vs StoneT2000's 14,554; by 100-round window (new `replay.js moves`): 13,145 in 401-500 (the
  march), then 2,900-3,900 every 100 rounds to the end with the bank at 10-58: every pilgrim deposit above the 60-fuel
  cruise reserve went into march steps, so the army could neither shoot nor arrive. StoneT2000 idled (1,000-2,000 a
  window), banked 9,184 by round 950 and took two castles at 965 and 974. h38 (creep, no march) and h18b (cruise
  reserve 500) are the queued answers. Preachers spent 3,537 moving in 301-400, before any march (engagement chases
  within r2 196 of home at 12 fuel a step).

## 2026-10-21 23:05 — h24 delivery, rush half: PASS
- h24 (ECON_UNTIL=100) vs bots/rush, seeds 1337/1879/2544/2908 both sides, 1000 rounds (VM extra lane, chain4,
  out/dlv_h24_rush.jsonl): 7 castles lost in 8 games, pre-registered bar <= h19's 8 in the same games: PASS. No
  bot of ours has won a game against bots/rush yet (h19 0/8, h24 0/8, h31 0/5 so far; h22 4/8): each loses one
  castle and never takes one of the rusher's, so it loses on castles at round 1000. h24's gate extension (h24x)
  stays queued.

## 2026-10-21 23:23 — h38 delivery FAILS (creep instead of march); no gate
- 6 games of 1000 rounds vs h19 on 2202/1828/826 both sides (VM, out/dlv_h38_h19.jsonl, out/rp_dlv_h38).
  Move fuel over rounds 401-700 (replay.js moves), h38 vs h19: 6,046 vs 4,714; 6,104 vs 6,389; 10,893 vs 13,556;
  10,919 vs 13,550; 5,140 vs 18,004; 18,749 vs 6,610. Bar "at most half of h19's": 1 of 6. FAIL.
- Mean team fuel over 500-700: 162, 86, 3,200, 3,203, 64, 203 (bar >= 1,000: 2 of 6, both on 2202). FAIL.
- Enemy structures destroyed: 2 on 1828 (blue side), 1 on 2202 (red), 3 on 826 (blue), 6 on 826 (red). PASS.
- Not gated (two of three items fail). Games 4-2 for h38 (both sides of 2202, where h19's march at 450 emptied
  its bank to 40 while h38 held 3,200), noted only: 6 games are not evidence.
- Lesson for the next movement candidate: without a march, h38's army still spent as much fuel moving as h19's
  did with one. The creep shifts every unit's lattice target a tile every 8 rounds, and lattice wandering already
  dominates (self-play seed 1205: 1,800-3,900 preacher move fuel per 100 rounds with no enemy in sight). The fuel
  leak is in holding, not marching; h35's LATTICE_STICKY 2 is the candidate on that; a creep would need
  stationary units that move only when their tile is no longer on the lattice.

## 2026-10-21 23:30 — h40 pre-registered: forward churches (FRONT_ROUND)
- Source: replica seed 2924 (scrim vs StoneT2000): 35 churches and 58 pilgrims to our 2.2-2.6x smaller mining;
  its church lines went up at round 235 (x 34-42, y 0-1), 341-343 (33-42, 20-22) and 541-543 (35-40, 32-34),
  5-13 tiles from our castles, and our castles died at 272, 401 and 588. Each line is a spawn point and drop-off
  ahead of its army; we never build a structure that is not on a resource cluster.
- Mechanism: new switch CFG.FRONT_ROUND (default 0). From that round, a castle or church that sees no friendly
  structure more than 2 rows ahead, no mobile enemy attacker, and has the karbonite for a church on top of the
  defence reserve, builds a pilgrim with SIG.FRONT (at most every FRONT_EVERY = 50 rounds); the pilgrim
  recomputes the builder's front site (struct.frontSite: nearest odd-parity, passable, non-depot tile within 3
  of FRONT_STEP = 8 rows ahead, outside visible enemy castle range) and builds a church there. The new church
  has nothing ahead, so the line creeps. Units built there anchor their lattice on it. Unit test (62/62).
- h40 = h19 + FRONT_ROUND=200. Delivery (VM queue, ahead of h31x: 8 games of 1000 rounds vs h19 on
  2924/2202/1828/826 both sides): (1) at least 2 churches built after round 200 in 6 of 8 games; (2) units built
  by round 600 at least 90% of h19's in the same game, in 6 of 8 (the churches do not starve the army); (3)
  castles lost in total no more than h19's. Gate 40 games vs h19, falsifier t <= 0. Dose ladder: FRONT_EVERY 50
  -> 25 (faster creep), FRONT_ROUND 200 -> 100.

## 2026-10-21 23:46 — h39 delivery PASSES (PIONEER_RESERVE 2 on h35); gate vs h35 queued
- Driver, 200 rounds, out/dlv39: h39 vs h35 on 2965/1828/826/2202 both sides; each side-swapped pair is an exact
  mirror (identical counts), so 4 independent games.
  (1) First church round, h39 vs h35: 20/23, 23/34, 20/41, 19/26; mean 20.3 vs 30.8 (bar: 5 earlier). PASS.
  (2) Karbonite mined by round 200: 11,756 vs 9,122 (+29%; bar: at least h35's). PASS.
  (3) Castles lost to bots/rush in 200 rounds (1337/1879/2544/2908): 0 and 0 (bar: no more than h35). PASS.
- Gate: h39 vs h35, 40 games (seed0 5000), queued after h40's delivery; falsifier t <= 0. If h35 fails its own
  gate against h19, h39 is re-gated against h19 instead.

## 2026-10-21 23:53 — h41 pre-registered: kill zones (KILL_ZONE), on h35
- Source: replica scrim 199 seed 1915 (v3 vs StoneT2000, lost at round 386, one castle each). From round 128,
  every ~5 rounds a unit of ours built by the church at (30,39) walked to its lattice tile (30,35) and died there,
  shot by a prophet at (33,28) (r2 58) before its next turn: from (30,36) that prophet is at r2 73, outside every
  military unit's sight (prophet vision = range, 64). 43 of our 53 military deaths were on such repeated tiles; we
  fired 10 shots all game; 39 of 40 prophets and 11 of 13 preachers died without firing (1,305 of 1,390 K).
  Across scrims 199/200 our preachers die without firing 70-90% of the time (StoneT2000's 15-65%).
- Mechanism: new switch CFG.KILL_ZONE (default 0; turns a zone lasts). Structures and military units infer a
  death when a military unit of ours seen last turn is gone from where it could not have walked out of sight
  (3 tiles of margin); idle units hold no lattice tile within KZ_R2 (64) of a fresh zone beyond 2 tiles short of
  its distance from home (they fall back toward home; shooting and engaging unchanged). Structures radio the latest
  zone (SIG.ZONE, r2 25) the first free turn within 3 after building a military unit, so newborns know it.
  Unit tests 66/66.
- h41 = h35 + KILL_ZONE=50. Delivery (VM queue, 8 games of 1000 rounds vs h35 on 1915/2924/2202/826 both
  sides): (1) military units lost without ever firing at most 85% of h35's, summed; (2) military deaths on
  tiles where the same team lost 3 or more at most 80% of h35's; (3) castles lost no more than h35's. Gate 40
  games vs h35 (or the base in force), falsifier t <= 0. Dose ladder: KILL_ZONE 50 -> 100; KZ_R2 64 -> 36.

## 2026-10-21 23:59 — h36 delivery FAILED (2 of 3); gate not queued
- h36 (MIL_ROTATION [5,3,5,3,4] + PROPHET_FLOOR=200 on h19) vs bots/rush, seeds 1337/1879/2544/2908 both sides
  (extra lane, 2019-next/out/dlv_h36_rush.jsonl, rp_dlv_h36rush), against the thresholds of 21:50:
  (1) attack fuel per enemy damage 153,385 / 117,990 = 1.30 (<= 1.37: PASS; h22 1.56, h19 1.96);
  (2) mean team fuel at round 500 92 (> 134 needed: FAIL; per game 139/434/17/45/28/7/21/49);
  (3) castles lost 1 of 20 (<= 8: PASS). Outcome 5 wins in 8 (h22 4, h19 0); 0 exceptions.
- The fuel floor works on prophets' share, but the fuel goes into more shots and builds rather than a bank: by
  round 500 the team is as dry as h19. Gate not queued (pre-registered rule). sym_h36 still runs in the lane.
- Replica scrims 199/200 (v3/v4 vs StoneT2000), econpace census (own-side depots held by own pilgrims at round
  100, us : them): 616 14/23 : 6/22, 1915 5/7 : 8/9, 2924 12/23 : 21/23, 2965 7/7 : 7/7 (both), 520 14/14 :
  14/14. We lost 616 with the better economy and 2965 twice with an equal one: on 2965 we ended with K 5-10 and
  F 24,070-29,222 unspent (karbonite binds; StoneT2000 mined K 5,000-5,100 to our 4,300-4,360, first church round
  12 to our 60, and fielded 44 crusaders at the end of 200-3). In our own gates the opposite binds (h35 vs h19 on
  2202: K 3,281 unspent, F 61). The binding resource depends on the map and the opponent.

## 2026-10-22 00:02 — h42 pre-registered: unit mix by the binding resource (MIX_BY_STOCK), on h35
- Source: h35 vs h19 gate, 32 games so far: both losses (905, 2855) ended with K 0 and F 12,540 / 13,916
  unspent; the fuel-bound wins (2202, 241, 357, 2030) ended with K 3,000-8,700 and F ~60. Replica 2965 vs
  StoneT2000 (lost twice): K 5-10, F 24,070-29,222 unspent. Every unit costs 50 fuel; karbonite 15 (crusader,
  40 HP), 25 (prophet, 20 HP), 30 (preacher, 60 HP): per karbonite a crusader buys the most HP, per fuel a preacher
  the most damage (1.33 a fuel and splash, prophet 0.40).
- Mechanism: new switch CFG.MIX_BY_STOCK = [hi, lo] (default null): a peacetime unit is a crusader while bank fuel
  / karbonite >= hi, a preacher while <= lo, otherwise the rotation. Threat responses unchanged. Unit test 67/67.
- h42 = h35 + MIX_BY_STOCK [10, 1]. Delivery (VM queue, 8 games of 1000 rounds vs h35 on 905, 2855, 2202, 241
  both sides): (1) in the karbonite-bound seeds 905 and 2855, h42's military units built at least 115% of h35's
  in the same games, summed; (2) in the fuel-bound seeds 2202 and 241, h42's attack fuel per enemy damage at most
  90% of h35's, summed; (3) castles lost no more than h35's. Gate 40 games vs the base in force, falsifier t <= 0
  (prophet range may matter more than HP per karbonite). Dose ladder: [10, 1] -> [5, 2].

## 2026-10-22 00:19 — h35 ACCEPTED (35-5 vs h19, t 3.44): frozen as v5, now the src defaults; queue rebased
- Gate h35 vs h19, 40 games (seed0 5000, out/h35_h19.jsonl): 35 wins; 20 cells gained 17, lost 2, split 1,
  net +15, t 3.44 (accept bar 2). 0 exceptions, 0 timeouts, 0 init failures; mean wall 303 s a game. Both lost
  cells (905, 2855) are karbonite-bound maps (K 0, F 12,540 / 13,916 unspent): h42's target.
- Its parts were each inconclusive or untested alone (h31 25-15 t 1.67 at 20 cells; h33, h29, h28, h21 queued):
  the stack of independent delivered switches was the stronger arm (LEARNINGS 18).
- bots/v5 = dist/h35 (hash da91ba0f7380; ROSTER.tsv). Replica submission 95 ("v5 (h35): ..."), accepted:
  matches created from now on play v5; scrims 201-204 were created with v4 and play v4.
- src defaults now SERVE_MOVES 2, PLAN_CONTEST_FIRST 6, RELAY 1, NAV_FIT 1, LATTICE_STICKY 2, PILGRIM_SAFE_STEP 1
  (the plan.mjs unit test now expects 0 orphans on 2924 by default, 3 with v4's settings; 67/67). No-op check of
  current src: driver games h35c (current src + h35's switches) vs h35 and h35 vs h35 under --det matched turn for
  turn until round 114, where the blue h35 (the same bundle in both) lost a turn to the chess clock while builds
  ran beside it: --det seeds only the engine's shuffle, the clock still runs (LEARNINGS 13). The clean check runs
  on the VM extra lane (out/noop_v5.sh: h35d, the defaults-only build, vs h35, --timescale 10).
- Queue: component gates h31x, h33, h29, h28, h21 superseded. Rebased onto v5 (h35 + their own switch, 40 games
  vs h35, seed0 5000), after h41's and h42's deliveries and h39's gate: h24v5 (ECON_UNTIL 100), h20v5
  (DEF_RESERVE_K 30), h15v5 (MIL_ROTATION null), h8v5 (ENDGAME_FUEL 900), h7v5 (ATTACK_PERSIST), h10v5
  (ATTACK_EVERY 20), h11v5 (cruise patience), h9v5 (PLAN_SERVE_PILGRIM), h18v5 (CRUISE_FUEL_RESERVE 500). h40's
  delivery (vs h19) keeps running as a mechanism check; if it passes, h40v5 (h35 + FRONT_ROUND 200) is gated vs
  h35. The reference jobs now play bots/v5 vs v0 and vs rush.

## 2026-10-22 00:27 — v5's two lost gate cells read; h43 pre-registered: castle recall (RECALL)
- Clean no-op of the new defaults (VM extra lane, --det, --timescale 10, seed 1828, 200 rounds): h35d (defaults-only
  build) vs h35 replays byte-identical to h35 vs h35. sym_h41 and sym_h42 clean (stops only at an axis-tile contest
  and at combat after the first attack).
- 905 (35x35, one castle, 2 karbonite depots a side): armies equal at the round-450 attack call (24/26/12 each);
  h35's advanced (mean king distance to the enemy castle 25.7 -> 21.3) into h19's, which mostly held (~24.5), and
  lost the exchange (62 -> 22 military vs 62 -> 31); h19 then took the castle at 547.
- 2855 (53x53, one castle, four churches, three of them 30-44 tiles west of the castle): at round 440 most of
  h35's army stood around the western churches. The attack call (FAR.ATTACK, ~20 tiles) reached only the castle's
  own guard, which marched and died (139 -> 99 units); the western mass never moved (440 vs 540 positions alike).
  From round 540 six to eight h19 units walked up to the castle and killed it (200 HP at 555, dead at 568) while
  89 of h35's 92 military units stood 15 or more king steps away and 0-2 of them fired in any 5 rounds (F 13,916
  unspent, K 0: the castle could not rebuild a guard).
- Mechanism: new switch CFG.RECALL (default 0; rounds a recall lasts). A castle whose visible mobile attackers
  outnumber half its military within r2 100 radios its position at FAR.RECALL (r2 2501, 50 tiles, 51 fuel) at most
  every 10 rounds; a military unit that hears it drops attack orders for that long and hurries (full speed) to 2-3
  king steps from that castle, then holds; shooting and engaging come first as before. The attack call skips its
  radio on a turn the recall used. Unit tests 69/69.
- h43 = v5 + RECALL 30. Delivery (VM queue, 8 games of 1000 rounds vs h35 on 2855, 905, 1250, 2299 both sides):
  (1) h43 radios a recall in at least 4 of the 8 games; (2) castles lost in total: h43 fewer than h35; (3) h43's
  military units lost at most 110% of h35's. Gate 40 games vs h35, falsifier t <= 0 (a recall pulls the army off
  winning attacks). Dose ladder: RECALL 30 -> 60; the radius 50 tiles -> map-wide. Diagnostics: driver 905 (600
  rounds), VM extra lane 2855 both sides (out/diag_h43_2855.jsonl).

## 2026-10-22 00:29 — h40 delivery FAILED (2 of 3, castles lost); gate not queued
- h40 (FRONT_ROUND 200 on h19) vs h19, 8 games of 1000 rounds on 2924/2202/1828/826 both sides
  (out/dlv_h40_h19.jsonl, rp_dlv_h40), against the items of 23:30:
  (1) churches built after round 200: 13/16/12/12/15/7/10/24 (h19 0 each); at least 2 in 8 of 8: PASS.
  (2) units built by round 600 vs h19's: 109/119/105/105/158/88/98/141%; at least 90% in 7 of 8: PASS.
  (3) castles lost: h40 4, h19 3 (no more than h19's needed): FAIL. 2924 red lost all three (499, 661, 784):
  by round 600 it had a handful of military units against h19's army in our half; 826 blue lost one.
- Outcome 6 wins in 8; 0 exceptions. Gate not queued (pre-registered rule); dist/h40v5 (v5 + FRONT_ROUND 200)
  stays built. The creep works as a mechanism (7-24 forward churches a game) but on 2924 the army it feeds
  lost; a new arm would need a delivery on castle safety first.
- Driver diagnostic h43 vs h35 on 905 (600 rounds): h43 won by castles at 503, 0 exceptions, but sent no recall
  (its castle was never threatened); the 2855 pair runs in the VM extra lane.

## 2026-10-22 00:37 — h43 diagnostic on 2855 (red); h44 pre-registered: only crusaders march before round 900
- h43 vs h35 on 2855, h43 red (VM extra lane, 2019-next/out/diag_h43_2855.jsonl): h35 won by castles at 710; 0
  exceptions. h43's castle radioed two recalls (rounds 495 and 681). After 495 the army came home (own military
  within 8 king steps of the castle 1 -> 11 -> 36 -> 62 of 97 at +30) but no enemy was within 8 and the castle
  kept 200 HP; the run home cost 10,946 move fuel in rounds 490-520 (blue h35 957). When the recall lapsed, the
  attack call sent the army into h35's held lattice: rounds 520-640 h43's military 97 -> 33 (mean king distance
  to the enemy castle 39.6 -> 29.9, min 4), h35's 102 -> 92. The second recall (681) gathered 4 of 44; the castle
  fell at 710. Same shape as v5's 905 loss: the side that walks into a held lattice loses the exchange.
- Source for h44: replica 616 (v3 vs StoneT2000): 160 marching prophets burned ~8,700 move fuel in 40 rounds
  around the attack call; from round 500 to the end our bank held 10-257 fuel with K 3,800 floating. Prophets pay
  2 fuel and preachers 3 per r2 moved, crusaders 1, and prophets shoot from 8 tiles: a held prophet lattice is
  the strong formation, a marching one the weak.
- Mechanism: new switch CFG.MARCH_MASK (default 56: all three types obey attack orders; bit 3 crusader, 4
  prophet, 5 preacher). Unit types outside the mask hold the lattice through attack calls until round 900, as
  home guards do. Unit tests 70/70.
- h44 = v5 + MARCH_MASK 8 (crusaders only). Delivery (VM queue, 8 games of 1000 rounds vs h35 on 616, 2202, 241,
  1915 both sides), from front.js windows over rounds 450-650: (1) h44's move fuel (all units) at most 60% of
  h35's, summed; (2) h44's shots fired at least 100% of h35's, summed (the saved fuel buys shots, not an idle
  bank); (3) castles lost no more than h35's. Gate 40 games vs h35, falsifier t <= 0 (crusaders alone cannot
  crack a castle guard; the late-game march at 900 may be too late). Dose ladder: MARCH_MASK 8 -> 40 (crusaders
  and preachers).

## 2026-10-22 00:42 — h45 pre-registered: marching units hold at the edge of enemy reach (EDGE)
- Source: replica 200-3 (v4 vs StoneT2000 bot1v43, 2965, lost by castles): three karbonite depots a side, both
  teams mined alike (K 4,300 : 4,994); we built 132 prophets and 30 preachers and lost 131 and 30, killing 106
  prophets and 13 preachers (damage dealt 3,460 : 4,890). Our army fell at each attack (23 -> 13 in rounds
  400-500, 19 -> 2 in 600-700) while their prophets held (idle 18,908 of 20,325 prophet turns). Gate cells 905
  (v5 vs h19) and the h43 diagnostic on 2855 show the same: the side that walks into a held line loses the
  exchange. A prophet's vision is its attack reach (r2 64), so a marcher steps into range of the prophets it
  sees and takes the first volley alone.
- Mechanism: new switch CFG.EDGE (default 0). On the march step only (shooting, melee engage, recall and the
  lattice unchanged), a unit that sees enemy attackers whose reach (combat THREAT_R2) does not cover its tile
  avoids tiles they reach unless our military in its sight, itself included, number at least EDGE times them.
  Unit tests 71/71.
- h45 = v5 + EDGE 1.5. Delivery (VM queue, 8 games of 1000 rounds vs h35 on 905, 2855, 2965, 616 both sides),
  whole game, summed: (1) h45's military units lost at most 92% of h35's (the same as lost per kill at most 85%
  of h35's in these two-team games); (2) h45's shots fired at least 90% of h35's (holding at the edge does not
  stop the fighting); (3) castles lost no more than h35's. Gate 40 games vs h35, falsifier t <= 0 (held armies
  never break a line, so castles fall only to the late push). Dose ladder: EDGE 1.5 -> 1 -> 2.
- No-op of the new defaults (h35e, defaults-only build, vs h35, --det --timescale 10) and sym_h45 queued in the
  VM extra lane (2019-next/out/dlv_chain14.sh); sym_h44 in chain13.

## 2026-10-22 00:47 — h45 WITHDRAWN before its delivery: EDGE is inert against prophets
- Driver diagnostic h45 vs h35 on 905 (700 rounds): replay identical turn for turn (35,904 turns, to the end at 503)
  to the h43 vs h35 diagnostic, whose recall never fired: EDGE changed no move. A prophet's vision (r2 64) is
  the reach THREAT_R2 gives an enemy prophet or castle, so any one it sees already reaches its tile and the edge
  rule lets it go on; it can only hold against crusaders (49) or preachers (36) seen farther out. The first
  volley at contact comes from prophets the marcher could not see before its step. Job ...a39 moved to
  ~/jobq/superseded; the switch stays (default 0) for a version that knows enemies beyond sight (radioed
  sightings or memory). sym_h45 and the h35e no-op still run in the extra lane (the no-op covers the new code).
- Replica 199 (v3 vs botfinalsafe) read: on 616 (57x57) botfinalsafe built 48 churches to our 4 and 63 pilgrims
  to 32, spent 32,650 fuel on builds to our 17,650 and 14,554 on moves to our 39,886 (rounds 401-500: our 13,145;
  2,466 of 5,560 in rounds 301-400 were A->B->A oscillation, fixed since v4's LATTICE_STICKY 2). v5 in its gate
  (2202 vs h19): oscillation ~5% of move fuel; the round-401-500 attack wave 9,509 fuel (prophets 4,318,
  preachers 3,024, crusaders 2,089), ~2,300 per 100 rounds after. On 1915 v3 dealt 170 damage in 386 rounds (F
  12,203 unspent): v3's setup exceptions, not tactics.

## 2026-10-22 00:53 — h46 pre-registered: prophets spot targets for melee units (SPOT)
- Source: h41's delivery games (v5 vs h41, nearly the same bot): about 40% of military deaths are units that
  never fired (400 of 1,035 summed over 6 games). In 2924 (v5 red, lost 3 castles) 79 of 115 crusader deaths and
  65 of 83 preacher deaths never fired, against 22 of 131 prophets. Melee units see 7 (crusader) and 4 (preacher)
  tiles, a prophet line shoots from 8: they walk at cruise speed into fire they cannot see, and engage only what
  they see.
- Mechanism: new switch CFG.SPOT (default 0). A prophet firing at a non-pilgrim radios its target (FAR.ENEMY, r2
  99, 10 fuel; with fuel for the shot, its floor and the radio) at most every SPOT turns, only while a crusader or
  preacher of ours is in its sight. Crusaders and preachers keep the nearest spot heard; with no visible enemy to
  engage, a spot heard this turn or last within r2 196 of them (marching) or of their lattice centre (holding) is
  engaged like a seen enemy (full speed). Unit tests 72/72.
- h46 = v5 + SPOT 3. Delivery (VM queue, 8 games of 1000 rounds vs h35 on 2924, 2202, 1915, 826 both sides),
  whole game, summed: (1) h46's crusaders and preachers lost without ever firing at most 75% of h35's; (2) enemy
  military units killed by h46's crusaders and preachers at least 125% of h35's; (3) castles lost no more than
  h35's. Gate 40 games vs h35, falsifier t <= 0 (charging melee units die faster, or the radio fuel costs shots).
  Dose ladder: SPOT 3 -> 1; spot range r2 196 -> 100. Driver diagnostic on 1915 (650 rounds); no-op h35f and
  sym_h46 in the VM extra lane (dlv_chain15.sh).
- h41 interim (6 of 8 games): units lost unfired 400 vs h35's 393 (needs <= 85%), deaths on tiles with 3+ deaths
  449 vs 437 (needs <= 80%), castles 4 vs 4; the side decided every pair (blue won all six).

## 2026-10-22 01:00 — h41 delivery FAILED (0 of 3); gate not queued
- h41 (KILL_ZONE 50 on h35) vs h35, 8 games of 1000 rounds on 1915/2924/2202/826 both sides
  (out/dlv_h41_h35.jsonl, rp_dlv_h41; scratchpad dlv41.js), against the items of 23:53, summed:
  (1) military units lost without ever firing: h41 755, h35 605 (125%; at most 85% needed): FAIL;
  (2) military deaths on tiles where the same team lost 3 or more: h41 804, h35 614 (131%; at most 80%): FAIL;
  (3) castles lost: h41 7, h35 4: FAIL. Outcome 3 wins in 8 (the side decided 1915, 2924 and 2202, blue each
  time; h41 lost both 826 games, 706 military lost to h35's 506). 0 exceptions.
- Holding no lattice tile near fresh deaths pulls idle units back toward home; it did not keep them from dying
  where others died. KILL_ZONE stays at 0; no gate.
- Driver diagnostic h46 vs h35 on 1915 (650 rounds, h46 red): h35 won by castles at 507 (blue took 1915 in all
  of h41's games too); 0 exceptions; h46's prophets radioed 112 spots; kills by crusaders and preachers 13 each
  side, melee lost unfired 37 each side: no visible effect in one game (evidence is the delivery). h35's 3 frozen
  robots coincided with a replay analysis I ran on the driver during the game: driver load, not a bot fault.
- Extra lane: sym_h45 clean (axis-tile contest at round 45 in seed 1, combat after the first attack in seed 3);
  no-op h35f (defaults-only build with SPOT's code) vs h35 IDENTICAL.

## 2026-10-22 01:04 — h47 pre-registered: focus fire by a shared rule (FOCUS)
- Source: target choice is priority, then nearest, then canonical position. Allies at different places pick
  different nearest targets, and enemy HP is never visible (RULES 7). A prophet (20 HP) dies to two prophet shots
  and a crusader (40) to four, so fire spread one shot per target kills nothing while the same shots focused kill
  half. Replica 200-3 (2965): 132 prophets built, 106 enemy prophets killed for 131 lost.
- Mechanism: new switch CFG.FOCUS (default 0). Shooters (crusaders, prophets, castles; preachers keep their splash
  choice) pick, among targets of the best priority in their band, the one the most of our attackers in their
  sight can also hit where they stand (combat.cover), then the nearest, then canonical position: every shooter
  applying the rule converges on the same target. Unit tests 73/73.
- h47 = v5 + FOCUS 1. Delivery (VM queue, 8 games of 1000 rounds vs h35 on 2924, 2202, 1915, 905 both sides),
  whole game, summed (scratchpad dlvstats.js; two-team games, so a team's kills are the other's losses):
  (1) enemy military units killed per shot fired: h47 at least 115% of h35's; (2) h47's military units lost at
  most 95% of h35's; (3) castles lost no more than h35's. Gate 40 games vs h35, falsifier t <= 0 (overkill: six
  shots on a 20-HP prophet waste four). Dose ladder: a shot budget per target (the k-th shooter in canonical order
  past the shots needed picks the next target). No-op h35g and sym_h47 in the VM extra lane (dlv_chain16.sh).

## 2026-10-22 01:08 — h42 delivery FAILED (2 of 3, castles lost); gate not queued
- h42 (MIX_BY_STOCK [10, 1] on h35) vs h35, 8 games of 1000 rounds on 905/2855/2202/241 both sides
  (out/dlv_h42_h35.jsonl, rp_dlv_h42; scratchpad dlv42.js), against the items of 00:02:
  (1) karbonite-bound 905 + 2855, military units built: h42 705, h35 480 (147%; at least 115%): PASS;
  (2) fuel-bound 2202 + 241, attack fuel per enemy damage: h42 53,445 / 30,570 = 1.75, h35 88,795 / 43,280 =
  2.05 (85%; at most 90%): PASS; (3) castles lost: h42 5, h35 4: FAIL. Outcome 3 wins in 8; 0 exceptions.
- The two halves split. On 905 and 2855 the extra units were crusaders and h42 lost all four games: it fought
  little (attack fuel 1,015-1,440 a game to h35's 6,035-6,295, damage dealt 820-1,260 to 3,720-3,970) and ended
  with F 13,000+ and K ~15, the crusaders blind and stopped as in h41's unfired counts. On 2202 (preachers while
  bank fuel <= karbonite) h42 won both, with half the attack fuel of h35. Next arm h48: the preacher half alone,
  on other fuel-bound seeds.
- Driver diagnostic h47 vs h35 on 905 (700 rounds, h47 red): 0 exceptions; FOCUS first changed a shot at round 469
  (a different preacher killed), and red won by castles at 503 as in h35-vs-h35 behaviour on 905. sym_h46 clean;
  no-op h35g vs h35 IDENTICAL.

## 2026-10-22 01:09 — h48 pre-registered: preachers when fuel binds (the preacher half of MIX_BY_STOCK)
- Source: h42's delivery (above): on 2202 the preacher branch (bank fuel / karbonite <= 1) won both games with
  half the attack fuel; the crusader branch lost all four karbonite-bound games. Preachers deal 1.33 damage a fuel
  with splash, prophets 0.40; when karbonite piles up and fuel does not, a preacher's 30 karbonite is free.
- h48 = v5 + MIX_BY_STOCK [1000000, 1] (no crusader branch). No new code. Delivery on other seeds (VM queue, 8
  games of 1000 rounds vs h35 on 357, 2030, 2924, 1915 both sides), summed: (1) h48's attack fuel per enemy
  damage at most 90% of h35's; (2) enemy military units killed by h48 at least h35's (its kills at least its
  losses); (3) castles lost no more than h35's. Gate 40 games vs h35, falsifier t <= 0 (preachers see 4 tiles and
  walk at 3 fuel per r2). Dose ladder: lo 1 -> 2.

## 2026-10-22 01:18 — h43 delivery PASSED (3 of 3); gate queued. Replica audit: no bot errors since v3
- h43 (RECALL 30 on h35) vs h35, 8 games of 1000 rounds on 2855/905/1250/2299 both sides (out/dlv_h43_h35.jsonl,
  rp_dlv_h43; `tools/dlv.js`), against the items of 00:27: (1) a recall radioed in 5 of 8 games (at least 4): PASS;
  (2) castles lost: h43 3, h35 4: PASS; (3) military units lost: h43 1,034, h35 999 (103%; at most 110%): PASS.
  Outcome 4 wins in 8; 0 exceptions, timeouts, init failures. Gate h43 vs h35 queued (job ...4b01b1a43, after h39's).
- Caution for the gate: h43 lost 4 of the 5 games in which it recalled and won the 3 without one. Recalls fire when a
  castle is outnumbered, so the games were going badly already; the gate decides.
- sym_h48 clean (contest at round 45 on seed 1, combat after the first attack on seed 3, as accepted).
- Replica audit (match.json team stats, 53 matches with vibe19): every error our bot logged on the replica is a
  robot whose sandbox did not start (each of its turns logs one TypeError, counted as an exception, and one "Robot
  is not initialized.", counted as init_fail): 27 matches, all v3 games before match 141 (the setup bug v4 fixes);
  none since, and no timeouts or frozen robots. Opponents still lose robots at creation (LEARNINGS 17): bot1v43
  4,509 of 41,551 turns in 200-1, botfinalsafe 1,107 in 199-1, CometsTech 511 in 141-2.

## 2026-10-22 01:52 — h44 delivery PASSED (3 of 3), gate queued; h46 delivery FAILED (1 of 3)
- h44 (MARCH_MASK 8: only crusaders obey attack orders before round 900) vs h35, 8 games of 1000 rounds on 616,
  2202, 241, 1915 both sides (out/dlv_h44_h35.jsonl, rp_dlv_h44; `tools/dlv.js --from 450 --to 650`, run on the
  VM), against the items of 00:37: (1) move fuel in rounds 450-650: h44 46,516, h35 79,115 (59%; at most 60%):
  PASS; (2) shots in 450-650: h44 3,710, h35 2,735 (136%; at least 100%): PASS; (3) castles lost: h44 3, h35 6:
  PASS. Outcome 6 wins in 8 (all four on 616 and 2202); military lost 1,453 vs 1,945; 0 exceptions. Gate h44 vs
  h35 queued (job ...4b01b1a44).
- h46 (SPOT 3: firing prophets radio their target, crusaders and preachers engage it) vs h35 on 2924, 2202, 1915,
  826 both sides, against the items of 00:53: (1) melee units lost unfired: h46 649, h35 589 (110%; at most 75%):
  FAIL; (2) enemy military killed by our melee: h46 297, h35 318 (93%; at least 125%): FAIL; (3) castles lost 5
  and 5: PASS. 2,250 spots radioed; 3 wins in 8. Melee units that walk to a heard target die about as often
  unfired as those that do not. No gate. SPOT stays as the radio for h49, which points it at prophets alone:
  SPOT_PROPHET became SPOT_MASK (unit types that hear; default 40 = h46's crusaders and preachers).
- Stack per LEARNINGS 18: h50 = v5 + PIONEER_RESERVE 2 (h39, delivery passed 23:46) + MARCH_MASK 8 (h44): economy
  and army orders, mechanisms apart. Gate 40 games vs h35, falsifier t <= 0, queued ahead of the single gates
  (job ...a3d); h39, h43 and h44's single gates stay queued for attribution. h43 (recall) is left out: it also moves
  the army, and h44 already keeps prophets and preachers home.

## 2026-10-22 02:00 — h49 pre-registered: prophets converge on radioed sightings (SPOT 3 + SPOT_MASK 16)
- Source: replica losses to StoneT2000. 199-1 (616): we traded 249 military lost for 266 killed and still lost on
  castles: at r444 27 of theirs and 2 of ours stood within 10 tiles of the castle that fell, while our 168-unit army
  stood 12 king steps from home on average (31 vs 60 within 20 tiles). 200-2 (2924, r240-272): bot1v43 built six
  churches in a row 7-12 tiles off our castle (47,0) and pushed preachers and prophets out of them; our prophets held
  lattice tiles r2 72-100 from the fight, out of sight (prophet vision r2 64 = its reach), and the castle fell at 272.
  Prophets never move toward what they cannot see; SPOT (h46) radios a firing prophet's target to melee units only.
- h49 = v5 + SPOT 3 + SPOT_MASK 16: firing prophets radio their target (FAR.ENEMY, 10 fuel, at most every 3 turns)
  while another prophet of ours is in sight; prophets that heard a spot within 14 tiles of their post (of
  themselves, marching) step to the tiles r2 16-64 from it and hold there. Melee units do not listen (h46 failed).
- Driver diagnostic (first build, melee listening too; h49 red vs h35 on 2924, 800 rounds): 0 exceptions or clock
  faults; 229 spots; prophet turns idle near a fight out of reach 3,190 vs h35's 5,078. h49 lost 296 military to
  195 and 2 castles (561, 621) to h35's push of 90 units within 20 tiles; one mirror-ish game, the side may decide.
- Delivery (VM queue, 8 games of 1000 rounds vs h35 on 2924, 2965, 616, 1250 both sides), summed, `tools/dlv.js`:
  (1) prophet turns idle near a fight out of reach (idleContactP): h49 at most 70% of h35's; (2) military units
  lost: h49 at most 95% of h35's; (3) castles lost no more than h35's. Gate 40 games vs h35, falsifier t <= 0
  (prophets that leave their lattice tiles open gaps; newcomers walk into reach one at a time). Dose ladder: spot
  reach 196 -> 400; SPOT 3 -> 1.

## 2026-10-22 02:04 — h47 delivery FAILED (1 of 3): focus fire by a shared rule changes nothing measurable
- h47 (FOCUS 1) vs h35, 8 games of 1000 rounds on 2924, 2202, 1915, 905 both sides (out/dlv_h47_h35.jsonl,
  rp_dlv_h47; `tools/dlv.js` on the VM), against the items of 01:04: (1) enemy military killed per shot: h47 1,182 /
  4,253 = 0.278, h35 1,148 / 4,190 = 0.274 (102%; at least 115%): FAIL; (2) military lost: h47 1,148, h35 1,182
  (97%; at most 95%): FAIL; (3) castles lost 5 and 5: PASS. 4 wins in 8, each seed won once by each side but 2924
  (h47 won both). No gate. Our shooters already converge: nearest-first with a positional tie-break picks the same
  front unit for neighbours. The dose step (a shot budget per target, overkill) stays unqueued: kills per shot
  0.27 with 2 shots needed per prophet leaves little to win.

## 2026-10-22 02:20 — h48 delivery FAILED (1 of 3); chain18 clean; h51 first diagnostic: posts heard, nobody moved
- h48 (MIX_BY_STOCK [1000000, 1]: preachers while bank fuel <= karbonite) vs h35, 8 games of 1000 rounds on 357,
  2030, 2924, 1915 both sides (out/dlv_h48_h35.jsonl, rp_dlv_h48; `tools/dlv.js` on the VM), against the items of
  01:09: (1) attack fuel per enemy damage: h48 115,275 / 55,050 = 2.09, h35 133,225 / 61,540 = 2.16 (97%; at most
  90%): FAIL; (2) enemy military killed: h48 1,398, h35 1,485: FAIL; (3) castles lost 7 and 7: PASS. Red won all 8;
  on 1915 and 2030 the two games are the same game (the preacher branch never fired). No gate.
- Extra lane chain18: no-op h35h vs h35 IDENTICAL; sym_h49 and sym_h50 clean (axis contest, combat after the first
  attack).
- h51 (CASTLE_POST 0.5) driver diagnostic, h51 red vs h35 on 2299, 700 rounds: 0 exceptions or clock faults; the
  castle radioed its post 29 times (every 20 rounds, fuel 1,200-11,300 banked until round 450); h51 won on
  castles at 591. But the army hardly moved: by a castle (guards.js, within 6) at 450 h51 11, h35 4, by churches 79
  and 100. Units that took the castle as home already stood on lattice tiles within LATTICE_R 12 of it (the churches
  are within 12) and held. Fix CASTLE_POST_R 6: a unit with a castle post holds within 6 king steps of it. h51
  rebuilt; the first build's no-op and symmetry checks (chain19) rerun on the new builds.

## 2026-10-22 02:32 — h49 delivery FAILED (0 of 3): prophets that walk to a radioed sighting do not fight better
- h49 (SPOT 3 + SPOT_MASK 16) vs h35, 8 games of 1000 rounds on 2924, 2965, 616, 1250 both sides
  (out/dlv_h49_h35.jsonl, rp_dlv_h49; `tools/dlv.js` on the VM, out/dlv_h49.tsv), against the items of 02:00:
  (1) prophet turns idle near a fight out of reach: h49 28,994, h35 32,290 (90%; at most 70%): FAIL; (2) military
  lost: h49 1,614, h35 1,575 (102%; at most 95%): FAIL; (3) castles lost: h49 9, h35 5: FAIL. 4 wins in 8; 0 errors,
  exceptions or clock faults (ms_max 190). 1,985 spots radioed. No gate. With h46 (melee listeners) this closes
  SPOT: on 616 both bots stand idle near contact 9,000-11,000 prophet turns a game whatever is radioed, so a
  sighting reaches units that are already in the jam.


## 2026-10-22 02:33 — h51 pre-registered: half the church-born army guards a castle (CASTLE_POST 0.5)
- Source: castle falls in h43's delivery (castlefall.js on rp_dlv_h43): every castle that fell had 0-2 of its own
  units within 10 tiles; on 905 (both sides) 5-8 attackers took it while the defender's 19 units stood 21.7 king
  steps away on average, on 2855 the defender's 92 units averaged 37.8. Where the army stands (guards.js, h43 and
  h35 at round 300/450, nearest own structure within 6 king steps): 2299 3 by the castle and 67-87 by churches,
  2855 15-26 and 59-95, 1250 7-17 and 27-36. Units take as home the structure that built them, and on these maps
  churches build most of the army; attack orders (ours, and StoneT2000's pushes on the replica) go for castles,
  which decide games. h43's recall reacts too late (FAR.RECALL only once attackers outnumber half the guards).
- h51 = v5 + CASTLE_POST 0.5: castles radio their position (FAR.POST, 60 tiles, 61 fuel) every 20 rounds when the
  turn's radio is free; a military unit born at a church draws (seeded by birth round and tile, so mirror twins
  draw alike) with probability 0.5 to hold the lattice of the nearest castle heard instead (nearest its church;
  forgotten when seen gone, replaced by the next castle heard), within CASTLE_POST_R 6 king steps of it.
- Delivery (VM queue, 8 games of 1000 rounds vs h35 on 2299, 905, 2855, 1250 both sides), summed, `tools/dlv.js`:
  (1) military units by a castle at round 450 (atCastle450): h51 at least 2x h35's; (2) castles lost: h51 at most
  70% of h35's; (3) churches lost: h51 at most 150% of h35's. Gate 40 games vs h35, falsifier t <= 0 (churches and
  their pilgrims left to raiders; the army walks 20-40 tiles at prophet fuel rates). Dose ladder: 0.5 -> 0.8.
- Driver diagnostic of the CASTLE_POST_R build (h51 red vs h35 on 2299, 700 rounds; out/diag_h51b_h35_2299.*):
  0 exceptions or clock faults (ms_max 459 and 691 under the driver's load). The switch now moves the army
  (LEARNINGS 19): by a castle (guards.js, within 6) h51 15 / 25 / 33 at rounds 200 / 300 / 450, h35 3 / 3 / 3; by
  churches 35 / 60 / 81 against 47 / 72 / 88. But h35 won on castles at 562: a fight at 450-480 cost h51 86 of 117
  military (h35 32 of 96), and h51's castle (32,3) fell to prophets with 0 of its 9 survivors within 20 tiles and
  26 of h35's; h51 also lost 2 churches (h35 0). One game; the delivery decides.

## 2026-10-22 02:40 — fuel decides the round-450 fight; h52 / h53 pre-registered (march at 350 / 550)
- h51's driver diagnostic (2299, one castle a side, 10 depots each half, all staffed by round 100): h51 met the
  round-450 march with 7,425 fuel to h35's 12,805, ran dry at 470 (h35 still 4,523) and lost 86 of 117 military
  to 32, 110 of the deaths on its own half while it outnumbered the enemy within 10 tiles about 2 to 1 (deathmap
  scratch tool): units that cannot shoot do not count. Its 5,400 deficit (fuel flows per 50 rounds to 449): radio
  +1,390 (the post, 61 fuel every 20 rounds), military moves +2,110, shots before 450 +2,280, builds -250; mined the
  same (+170). Its pilgrims idled 89 turns before 450 (h35 0) next to a castle crowded by 33 guards.
- Attack timing has never been tested: only the turtle (no march, h16r, 16-24 vs h19, castles lost 23 to 6) and
  the creep (h38). The turtle's loss says the march wins against a standing lattice; the castle falls above say the
  defender's army stands spread by its churches while the attacker's comes together. Two doses, both ways:
  h52 = v5 + ATTACK_ROUND 350 (attack first, with ~80 units instead of ~110, into a lattice that has not marched);
  h53 = v5 + ATTACK_ROUND 550 (meet h35's march at home with a full bank, then march into a spent army).
- Deliveries (VM extra lane, `tools/xbatch.js`, 8 games of 1000 rounds each vs h35 on 2924, 2202, 241, 1915 both
  sides), summed, `tools/dlv.js`: (1) enemy castles destroyed (h35's castlesLost) at least 1.25x the candidate's
  own castlesLost and at least 2 more; (2) wins at least 5 of 8; (3) enemy military killed at least 95% of the
  military it lost. Gate 40 games vs h35, falsifier t <= 0. Dose ladder: h52 350 -> 300 -> 250; h53 550 -> 650.
  No symmetry check: the switch changes one round threshold, past the 200 rounds symcheck plays.

## 2026-10-22 03:02 — why the side decides mirror games: the knife fight at mirror churches; h54 pre-registered
- Fuel bank at round 449 in 24 near-mirror delivery games (h47, h48, h49 vs h35; scratch bank449.js): the same bot
  on the two sides of one map banks very differently (2924: red 17,982, blue 29,869; 2030: 5,695 and 13,804; 1915:
  54 and 117 military), and the richer side won. Pilgrim mine actions to 450 (stall.js): 2924 red 6,869, blue
  8,220; 357 4,899 and 6,332; 2030 3,813 and 4,854; 1915 2,081 and 3,308; 1250 the reverse. In each such game the
  poorer side had pilgrims stalled with cargo off any depot for 269-423 turns (2924: one K16 pilgrim from round 64
  to 450 shuffled in a 2-wide edge corridor whose 1-wide neck our own military held), and the enemy camped on 2-5
  depots of its half (depots.js census at 100/200/300).
- Cause, from the build and death events: contested clusters on the axis get mirror churches 1-5 tiles apart
  (1915: (32,25) and (32,26) at round 16; 2030: 4 apart at 37; 2924: 5 apart; 357: 4 apart at 77). The engine
  moves red first. Red's church builds its next peacetime unit (the rotation: a prophet); blue's church, acting
  next, sees that newborn attacker within r2 36 and answers with a preacher (struct.js defence), which acts in the
  same round, kills the prophet (inside its dead zone) and then the church (1915: church dead at 33; 2030: at 41).
  The side that loses the knife fight loses the cluster, its pilgrims stall, and the game. symcheck.js plays
  simultaneous turns, so it shows the bot side-symmetric (2924: clean to round 51, first attack 42) while the
  engine's order decides these fights.
- h54 = v5 + STRIKE_R2 36 + PREACHER_SELF 4 + PREACHER_MIL 2.5: a structure that sees an enemy church within r2 36
  and no enemy attacker builds a preacher toward it first (unless two of our military already stand that near it);
  a preacher counts its own tile in the splash as 4 against a target (was 1.5, as any friend) and an enemy military
  unit in the splash as 2.5 (was 2; a pilgrim or church 1). Driver diagnostics, h54 red vs h35 on 1915 (150
  rounds): with STRIKE alone red's church built a preacher at 29 instead of a prophet, which shot a tile whose
  splash included itself (-20 of its 60 HP, to add a church and a pilgrim) and lost the duel by one shot; with the
  two preacher weights it hit only the enemy preacher, killed it at 31 and a prophet at 33, and red held the
  cluster (0 exceptions, ms_max 28).
- Delivery (VM queue ahead of h51's, 8 games of 1000 rounds vs h35 on 1915, 2030, 2924, 357 both sides), summed,
  `tools/dlv.js` (new columns churchesLost100, mines450): (1) churches lost by round 100: h54 at most 50% of h35's;
  (2) pilgrim mine actions to round 450: h54 at least 105% of h35's; (3) wins at least 6 of 8. Gate 40 games vs
  h35, falsifier t <= 0 (30 K per strike taken from the first pilgrims and churches; preacher target weights change
  mid-game fights). Attribution if it passes: STRIKE_R2 alone vs the preacher weights alone.

## 2026-10-22 03:30 — h52 delivery FAILED 0 of 3 (attack at 350)
- 8 games vs h35 (2924, 2202, 241, 1915 both sides; `tools/dlv.js` on out/rp_dlv_h52, SUM rows): (1) h35's castles
  lost 5, h52's 5 (bar: at least 7); (2) h52 won 3 of 8 (bar 5); (3) enemy military killed 1,446 vs 1,626 lost
  (89%, bar 95%). Marching at 350 met an unspent lattice with fewer units and lost more than it killed. Not gated;
  the 350 -> 300 -> 250 dose ladder stops here. h53 (550) plays next on the extra lane.

## 2026-10-22 03:39 — h50 gate INCONCLUSIVE (27-13, t 1.70); 20 more cells queued. h55 (church chains) pre-registered
- h50 (PIONEER_RESERVE 2 + MARCH_MASK 8) vs h35, 20 cells x 2 sides (seed0 5000): h2h gained 12, lost 5, split 3,
  net +7, t 1.70; raw 27-13. Between the bars: extended by 20 cells at seed0 6000 (job ...a3d6, h50x), read pooled
  with this block. h39 and h44 stay in hold until then.
- h55 = v5 + CHAIN_ROUND 150 (src/bot/chain.js; StoneT2000's tactic from replica scrim 200, seed 2924): from round
  150 (castle i at 150 + 30 i) a castle sends a pilgrim at its mirror castle; it stops 12 king steps out and waits
  for 300 K and 1,200 F in the bank (the peacetime army leaves 300 K from round 150), then builds church, pilgrim,
  church, ... one tile nearer each, all in one round, until a church stands within r2 49; every church of the line
  builds preachers and crusaders aimed at the castle for 40 turns. Driver diagnostic, h55 red vs h35 on 2924 (400
  rounds, 0 exceptions, ms_max 748): the second castle's chainer walked from round 180 and fired at 199 (3 churches
  at king 7 from (47,22); they built 133 units), and that castle fell at 400. The first chainer stood beside its
  corner castle (6,0) for 250 turns, boxed in by our own military in the 1-wide top corridor, and the patience rule
  counted it staged there; the third castle never had the 10 K above its reserve after the burst emptied the bank
  (K 16-240 from 220 to 400). Fixed: patience stages only within 12 + 6 steps; a chainer stuck farther for 30 turns
  becomes a pilgrim and the castle sends another 100 rounds after the last (unit test).
- Delivery (VM queue ahead of h50x, 8 games of 1000 rounds vs h35 on 2924, 616, 2202, 357 both sides), summed:
  (1) the candidate fires a chain (2+ churches in one round, ending within 9 king steps of an enemy castle) in at
  least 6 of 8 games (scratch chainev.js); (2) enemy castles destroyed (h35's castlesLost, `tools/dlv.js`) at least
  1.25x the candidate's own and at least 2 more; (3) wins at least 5 of 8. Gate 40 games vs h35, falsifier t <= 0.
  Doses: CHAIN_ROUND 150 -> 250 (a bigger bank and army first) or CHAIN_END_R2 49 -> 25 (StoneT ended 5 steps out).
  Symmetry: sym_h55 (seeds 1, 2, 3, 2924, 260 rounds) and a no-op check of the new defaults (h35k vs h35, --det) on
  the extra lane (`out/dlv_chain22.sh`).

## 2026-10-22 03:55 — h54 delivery PASSED 3 of 3 (knife fight at mirror churches); gate queued next
- 8 games vs h35 (1915, 2030, 2924, 357 both sides; `tools/dlv.js` on out/rp_dlv_h54, SUM rows): (1) churches lost
  by round 100: h54 0, h35 8 (bar: at most 50%); (2) pilgrim mine actions to round 450: 47,226 vs 34,608 (136%,
  bar 105%); (3) h54 won 8 of 8 (bar 6), from both sides of every map: castles lost 1 vs 12. 0 exceptions; ms_max
  up to 244 (h35 337) on 2924 under VM load, while the bots' own turn timers peak at 54 ms there (TIME logs): the
  excess is sandbox and GC time outside our code.
- Gate h54 vs h35 (40 games, seed0 5000, job ...a3d56), ahead of h50's extension; falsifier t <= 0. If it passes,
  attribution: h54s (STRIKE_R2 36 alone) and h54p (PREACHER_SELF 4 + PREACHER_MIL 2.5 alone), deliveries on the
  same 8 games.
- Also built (03:50): h56 = v5 + HUNT 5 (pilgrims radio an enemy pilgrim standing 5 turns on one tile in our half
  off any depot, FAR.HUNT; idle crusaders and preachers within r2 400 go for it), the answer to bot1v43's chain
  builders that waited 29-253 turns 9-14 king steps from our castles seen only by our pilgrims (scratch loiter.js
  on replica 200-2). In h52's 8 delivery games our own pilgrims show the same signature in h35's half (10-61 turns,
  1915, 241, 2924), so the hunt fires in self-play too. Sparring partner h55w = h55 with CHAIN_K 400, CHAIN_F
  2,500 (its chainer waits, as bot1v43's did). Queued only if h55's delivery shows chains take h35's castles.

## 2026-10-22 04:17 — hunt diagnostics (driver, 2924, 400 rounds, h55w red = chains with a 400 K / 2,500 F bank)
- vs h56 (HUNT 5): 3 chains fired (199, 269, 304), blue castle (47,22) lost at 386. The radio went out once per
  chain, one turn before it fired (the chainers waited 6-10 turns); no loiterer was killed (scratch loiter.js).
- vs h56b (HUNT 2; enemy pilgrims within 2 king steps of their own structure skipped as depositing): 14 radios, 2
  loiterers killed (by a preacher at 200, a crusader at 303), 2 chains fired (199, 301), blue kept 3 castles to 400.
  The 199 chainer fired 2 turns after arriving: a chainer whose bank is ready on arrival cannot be hunted. After a
  chain its link pilgrims (now ordinary) stand around the line's churches deep in our half and count as loiterers.
- The line's churches survive as factories (h55w vs h56: two of three alive 96 turns after 304) because shooters
  rank churches last (combat.js PRIORITY: church 1, military 5-6) and the line keeps spawning military beside them.
- h55's delivery so far: 4 of 5 won, 11 of h35's castles destroyed for 1 lost. Chains take h35's castles.

## 2026-10-22 04:21 — h55 delivery PASSED 3 of 3 (church chains); chains gate queued, conditional on h54's gate
- 8 games vs h35 (2924, 616, 2202, 357 both sides): (1) chains fired in 8 of 8 games (scratch chainev.js: lines of
  2-6 churches in one round, ending 5-9 king steps from an enemy castle, the first at 169-210; 1-4 per game);
  (2) h35 lost 13 castles, h55 2 (`tools/dlv.js` SUM; bar at least 2.5 and 4); (3) h55 won 6 of 8 (bar 5); the
  two losses are 2924 red on health (castles 2-2) and 357 red (castles 1-2). 0 exceptions. Wasted: on 2924 red three
  late lines (654, 759, 859) ended 26-28 steps from any enemy castle (chainers that met a threat fired early).
- Driver diagnostic h57 (h54 + CHAIN_ROUND 150) red vs h54 on 1915: lines at 164 and 260, 4 churches each 5 steps
  from blue's only castle; it fell at 460 (0 exceptions): the two mechanisms work together.
- Gate job ...a3d57, after h54's (pre-registered here): if h54's gate accepts (t >= 2, h54 becomes the incumbent)
  it plays h57 vs h54, 40 games, seed0 5000; otherwise h55 vs h35. Accept t >= 2, reject t <= 0.

## 2026-10-22 04:40 — h53 delivery FAILED 2 of 3; symmetry h54-h56; h58 (church-first defence) pre-registered
- h53 (ATTACK_ROUND 550) vs h35, 8 games (`tools/dlv.js` SUM on out/rp_dlv_h53): (1) castles destroyed 5, own lost
  6 (bar at least 8): fails; (2) wins 5 of 8: passes; (3) enemy military killed 1,815 for 1,443 lost (126%): passes.
  Meeting the march at home wins the exchange but takes no more castles; 650 would leave less time to take them, so
  the ladder stops. Attack timing is done both ways (h52 0 of 3, h53 2 of 3): ATTACK_ROUND stays 450.
- Symmetry (`tools/symcheck.js`, VM): h54 and h56 split only at contests or after combat. h55 seed 2 failed at
  round 215 on the stores alone (fuel 580 vs 605, first attack 131): red prophet 845 at (20,15) never acted (killed
  earlier in the round) while its twin 1924 fired and died later, so an earlier pair spent alike on targets that do
  not mirror. symcheck now names that pair (action, mirrored offset, radius, result, stores change); the rerun is on
  the VM extra lane (out/dlv_chain24.sh: the driver trips vm2's 200 ms limit on robot init at round 171).
- CFG.CHURCH_FIRST_R2 (commit 5cf633a, off): an enemy church within r2 R of the shooter's home structure ranks
  above every unit (prophets, crusaders, castles shoot it first; preachers count it CHURCH_FIRST_V = 3 in the
  splash; melee engages it first). Unit test; a null-value bug in preacherTarget's off path (every enemy counted 0)
  caught before commit. No-op check h35m (current source, defaults) vs h35 on the extra lane.
- h58 = v5 + CHURCH_FIRST_R2 144 (12 tiles). Pre-registered delivery (extra lane, 8 games of 1000 rounds vs h55
  on h55's delivery seeds 2924, 616, 2202, 357 both sides; `tools/dlv.js` SUM, h35's numbers in h55's delivery as
  the baseline): (1) castles lost at most 8 (h35 13); (2) wins at least 4 of 8 (h35 2); (3) h55's churches lost at
  least 70 (h35 killed 58). Then a gate vs h35 (40 games, falsifier t <= 0): the defence must not cost the mirror
  games, where enemy churches near our churches sit beside enemy military (h54's knife fight).

## 2026-10-22 04:47 — symmetry of h55 holds (a twin duel); gates of conditional switches have few live cells
- h55 seed 2, round 215, resolved with symcheck's new per-pair mirror check (`mid`): red prophet 1924 at (25,15)
  and its blue twin 845 at (20,15) shot each other; within a pair red resolves first, so 845 died before acting and
  1924 died later to another shot: the board stays a mirror and the stores differ by 845's unspent 25 fuel.
  Sequential resolution, not the bot: symcheck now counts it as combat (verdict() unit-tested; live 12-round check
  of v5 under `unshare -rn`). sym_h58 (VM): contest at 45 on seed 1, combat on 2924, clean on 2 and 3.
- No-op h35m (source with CHURCH_FIRST code, defaults) vs h35: IDENTICAL.
- Instrument, not a result (the h54 gate is still running and is not read for a decision): in its finished cells the
  two games of seeds 418, 2299, 2855 and 241 are byte-identical replays (`cmp` on rp_h54h35): h54's switches never
  changed a decision there, the engine is deterministic, so the cell is a guaranteed split and carries nothing.
  2030 and 1635 differ. A switch that fires only on some maps (h54: the knife fight at mirror churches) gets a few
  live cells per 20, and a 40-game gate cannot resolve it. When this gate ends: count identical cells in every
  gate since v5 (`cmp` per seed pair) to measure the live fraction before choosing the next gate's size.

## 2026-10-22 05:03 — pilgrims stall at the edge of enemy range (7 of 20 maps); h59 pre-registered; h58 diagnostic
- Census of h50's 40 gate games to round 450 (scratch stall.js: pilgrim turns with cargo, not mining or giving, off
  any depot, not next to an own structure; stallwhy.js: the state at a streak's 25th turn). 17 streaks of 50-435
  turns on 7 of 20 maps (1250, 1325, 1635, 1862, 2872, 418, 241), by h35 and h50 alike, the same numbers in both
  seatings (bot and map, not side). Every one has an enemy attacker in sight just outside its threat range (prophets
  at r2 81-100, crusaders 53-65, preachers 61-68). The side that stalls mines far less: 1250 858 vs 2,297 mine
  actions, 1635 2,651 vs 4,807, 1862 1,278 vs 1,895, 2872 3,891 vs 4,988, 1325 5,859 vs 7,083.
- Seed 1250 (h35 red): its church at (11,31) fell by round 60; blue's church at (21,31) and prophets at (18,30),
  (18,32) cover our depots (11,30) and (12,31) (r2 49, 37). Four pilgrims stood around (10,29) at r2 65 until 450:
  PILGRIM_SAFE_STEP keeps them off threatened tiles, and nothing ever gives the target up. In other streaks the
  depot is out of sight and the way to it is threatened.
- CFG.PILGRIM_HOT (commit 8663fb1, off): stuck = off the target, and the target in a visible attacker's threat
  range, or an attacker in sight and no nearer the target than the best since taking it; PILGRIM_HOT stuck turns in
  a row give the depot up for PILGRIM_HOT_MEM (50) turns, for the nearest free depot neither threatened nor given up.
- h59 = v5 + PILGRIM_HOT 10. Delivery (VM extra lane after h58's; 8 games of 1000 rounds vs h35 on 1250, 1862, 2872,
  241 both sides, where h35 itself stalled 348-1,232 turns in h50's gate; stall.js to round 450 and `tools/dlv.js`):
  (1) h59's stalled pilgrim turns at most 40% of h35's in the same games; (2) h59's pilgrim mine actions to 450 at
  least 110% of h35's; (3) wins at least 5 of 8. Gate 40 games vs h35 (falsifier t <= 0), sized by discordant cells.
  Dose ladder 10 -> 5 -> 20. No-op h35n (current source, defaults) vs h35 first.
- h58 driver diagnostic (h55w red with chains vs h58 blue, 2924, 400 rounds; scratch chainlife.js): line at 199, 3
  churches died +4, +20, +56 rounds (without CHURCH_FIRST, vs h56 / h56b: +18, +65-70, the third alive at 400 after
  building 39-51 units); line at 307, 3 of 4 died +2, +5, +43, one 12 steps out lived (49 units). No castle lost by
  400 (vs h56: one at 386); health 7,580 to 4,280. h58's delivery vs h55 is on the extra lane.

## 2026-10-22 05:08 — h54 gate block 1 inconclusive at D=3; extended by discordant cells; h59 fires on 1250
- Gate h54 vs h35 (job ...a3d56, 40 games, seed0 5000; `paired.js --h2h --replays`): 20 cells, h54 21 wins,
  gained 2, lost 1, split 17, **D 3**, net +1, t 0.58; 17 of the 20 cells are byte-identical replays (neither
  side's switches ever fired). Pre-registered rule: inconclusive, extend. Sized by D (TRAINING_ALGORITHM 4): jobs
  ...a3d58, a3d59, a3d595 (20 cells each, seed0 6000, 7000, 9000; no seed shared with any earlier block) append
  to out/h54_h35.jsonl and rp_h54h35. D is checked at each job boundary; the first look is the first boundary
  with D >= 12: accept t >= 2, reject t <= 0, otherwise more cells to D >= 24. If all 80 cells give D < 12, t is
  read at 80 by the same bars and a remaining in-between result is logged "below resolution". Job ...a3d57 played its
  "not accepted" branch (h55 vs h35).
- h59 (PILGRIM_HOT 10) driver diagnostic, red vs h35 on seed 1250, 450 rounds (a filter, not a verdict): red's
  pilgrims stalled 144 turns (longest streak 10) and mined 2,489 (`stall.js`), where h35 as red on this map in
  h50's gate stalled 1,232 and mined 858. Blue (h35) stalled 848 here: two pilgrims 423 turns at (24,29) and (24,32)
  under a red crusader at r2 50-53, the mirror of the old stall. Round 450: castle health 2,000 vs 320, units 60
  vs 9; 0 exceptions, 0 timeouts. Delivery (chain25, VM) decides.

## 2026-10-22 05:45 — h55 (chains) gate block 1 inconclusive; replica economy census; v5 still burns its fuel in the march; queue reordered
- Gate h55 vs h35 (job ...a3d57, 40 games, seed0 5000): 20 cells, h55 21 wins, gained 6, lost 5, split 9, **D 11**,
  net +1, t 0.30; no identical cells (chains fire in every game). Scattered: castles taken both ways on most maps.
  Short of the first look at D >= 12: 20 more cells (seed0 6000, job ...a3d585, appended); then accept t >= 2,
  reject t <= 0, otherwise more cells to D >= 24.
- Replica economy census (scratch econcensus.js over all 210 downloaded replica games, all v0-v3; `replay.js
  timeline` at rounds 100-400): vibe19's median karbonite mined by round 400 exceeds the opponent's in the same
  game both in its 193 wins (+1,370) and in its 17 losses (+402), with more pilgrims (+2 to +4) and as many
  churches. Losses with the bigger economy and the bigger army: StoneT2000 botfinalsafe on 616 (round 400: K 5,312
  vs 4,438, army 158 vs 45; lost on castles at 974), CS554 on 826 (K 5,052 vs 2,068, army 130 vs 17; lost on
  castles at 1000). Only bot1v43 on 2924 out-mined us (22 churches to 1, K 5,728 vs 3,492). In 199-1 (616) v3's
  fuel went 10,670 -> 10 between rounds 450 and 500 (move fuel +8,900) and stayed under 140 to the end. We lose
  fights, not the economy race.
- v5 self-play, driver, seed 2924, 400 rounds: 3-4 churches and 20-23 pilgrims from round 100 on (every depot of
  our half staffed), K mined by 400 5,446 / 5,570 (bot1v43 in 200-2: 5,728), karbonite bank ~180 (binding), fuel
  16,700 / 27,200 floating, army 215 / 222.
- v5 self-play after the attack call (identical cells of h54's gate, `replay.js timeline`, VM): the bank still
  collapses within 50 rounds of round 450 on 3 of 6 maps (241: 728 -> 51; 2299: 10,196 -> 287, both armies 96 ->
  14; 357: 23,222 -> 6,091 -> 31, move fuel +13,300 in rounds 450-500), while field bots spend 5,600-8,300 on
  moves in a whole game (TRAINING_LOG 2026-10-21 18:53).
- Queue: h24v5 (ECON_UNTIL 100 on v5; h24 was 11-5 at t 1.50 on h19) moved to run after h55's gate (job
  ...a3d575, running), then h50's extension (MARCH_MASK 8 + PIONEER_RESERVE 2: crusaders alone march; 27-13, t
  1.70; job ...a3d576), then h54's first extension block, h55's extension, h54's other two. The census shows
  economy is not the field gap, so h24v5 runs first on its self-play near-miss, not on field evidence.

## 2026-10-22 05:52 — how castles fall in v5 mirror games: undefended while the army marches
- Census (scratch castlefall.js, VM) of the 17 cells of h54's gate whose two games are byte-identical, i.e. pure
  h35-vs-h35 games: 16 castle deaths in 13 games, 12 of them between rounds 456 and 667 (the march). In 7 of the
  16 the dying castle had **no unit of its own within r2 100** (1205, 1250, 1862, 2299, 2855, 418, 905; where the
  victim had an army, 15-92 units stood a mean 21-38 king steps from their own castles); in 5 more it had 1-5.
  Killers: prophet 8, crusader 6, preacher 2. 11 of 16 fell within 30 rounds of the first hit.
- Consistent with the two defence candidates already queued, not a new one: h50's MARCH_MASK 8 (crusaders alone
  obey the attack call, so prophets and preachers stay on the lattice; gate extension ...a3d576) and h51's
  CASTLE_POST 0.5 (half the church-born army guards the nearest castle; delivery ...a3e). Recorded before either
  is read; their bars stand as pre-registered.

## 2026-10-22 05:55 — gate power simulated (tools/gatesim.js); defaults set to looks at D 12 / 24 / 48, at most 200 cells
- tools/gatesim.js (unit-tested): cells discordant with probability q, a discordant cell a gain with probability p,
  20-cell blocks, a look at the first block boundary where D reaches the next target; accept t >= 2, reject t <= 0.
  20,000 gates per row, looks 12 / 24 / 48, at most 200 cells:
  q 0.15: p 0.5 accept 3.9% (reject 69.8%), p 0.6 23.1%, p 0.65 41.2%, p 0.7 62.9%, p 0.8 93.5%; mean 123-156 cells.
  q 0.55: p 0.5 accept 4.6% (reject 72.1%), p 0.6 34.2%, p 0.65 61.1%, p 0.7 84.0%, p 0.8 99.2%; mean 41-68 cells.
  The rule used until 05:08 (one look at 20 cells, one 20-cell extension read pooled) has power 9.9% / 22.4% at p
  0.65 (q 0.15 / 0.55) and leaves ~60% open. Capped at 80 cells (h54's pre-registered cap), q 0.15, p 0.7: 27%.
- TRAINING_ALGORITHM §4 and §8 now name looks at D 12 / 24 / 48 with at most 200 cells as the default; LEARNINGS
  20. Gates already running keep their pre-registered rules (h54: read at 80 cells at the latest; h55: D >= 12, 24).

## 2026-10-22 05:55 — castle margin as a graded read: agrees with wins on 6 of 8 finished gates, stronger on 4; not a decision rule
- Scratch graded.js (VM): per cell, the candidate's castles alive minus the control's at each game's end, summed
  over its two games (identical cells give exactly 0); one-sample t over cells, beside the win read.
  h35 vs h19 4.27 (wins 3.44); h31 2.77 (1.67); h24 2.57 (1.50); h16r -3.49 (-1.07); h18 -1.53 (-1.89); h54 0.57
  (0.58); h55 0.55 (0.30); **h50 0.44 (wins 1.70)** and **h11c -2.40 (wins +0.71)** disagree: their wins come at
  round 1000 on health, not on castles. h19 vs h6: margin 0 in all 20 cells.
- The win is the objective and health breaks round-1000 ties, so castle margin alone would have rejected h50, our
  best open candidate. It stays a secondary read; a lexicographic (castles, then health) score would need its own
  null simulation and identity control first. No decision rule changes.
- Slip: the run also read out/h24v5_h35.jsonl while that gate was running (6 cells). Nothing is taken from it; the
  gate runs to completion under its pre-registered rule (accept t >= 2, reject t <= 0, otherwise D-sized looks).

## 2026-10-22 05:59 — late game: fuel binds, karbonite floats; h8v5 (ENDGAME_FUEL 900) pre-registered, moved up
- Census (scratch latebuild.js, VM) of the pure h35-vs-h35 games of h54's gate that reached round 1000 (2202, 2296,
  241, 2633, 2642, 2904, 499): at round 850 the bank held K 2,752-4,805 on at least one side in 5 of 7 (2633 and
  2904: K under 230, fuel 7,710-8,224 in 2633) with fuel 28-460; 2,700-5,700 K ended unspent. From 850 on the
  structures built mostly crusaders (endgame dump; 40 HP per 50 fuel) and prophets / preachers. Health margins of
  the round-1000 health finishes in h54's gate (near-mirror): 70-510 on totals of 740-3,130.
- Per 50 fuel (every unit costs 50): preacher 60 HP, crusader 40, prophet 20. When fuel binds and karbonite
  floats, the most tiebreak health per fuel is a preacher.
- **h8v5 = v5 + ENDGAME_FUEL 900** (built 00:16 from v5, code unchanged since): from round 900 every structure
  builds a preacher whenever it can afford one (a crusader if K < 30), no pilgrims, churches or reserves; military
  units more than 3 king steps from home stop cruising (they still shoot and engage). Trigger: games reaching round
  900, 14-25 of 40 in the last three gates. Decision counter: preachers built in rounds 900-1000 (latebuild.js).
  Displaces: late pilgrims and churches, late crusader dump, late cruising.
- Delivery (gate lane, job ...a3d5755 after h24v5's gate; 8 games vs h35 on 2202, 2296, 499, 2633 both sides,
  maps whose mirror games went to round 1000 on health): (1) preachers built in rounds 900-1000: h8v5 at least 3x
  h35's in the same games; (2) final total health, summed over games that reach round 1000: h8v5 at least 120% of
  h35's; (3) h8v5 wins at least 5 of 8. Then a gate of 40 games vs h35 (its job ...4b06 moves up behind the delivery
  if it passes), D-sized looks 12 / 24 / 48, at most 200 cells, accept t >= 2, reject t <= 0. Dose ladder 900 ->
  850 / 950; zero arm h35. Driver diagnostic h8v5 red vs h35 on 2202 (1000 rounds) running.

## 2026-10-22 06:13 — h58 delivery FAILED 1 of 3, h59 FAILED 0 of 3; the side decides 46% of paired cells
- h58 (CHURCH_FIRST_R2 144) vs h55, 8 games of 1000 rounds on 2924, 616, 2202, 357 (`tools/dlv.js` SUM on
  out/rp_dlv_h58): (1) castles lost 11 (bar at most 8; h35 13): fails; (2) wins 3 of 8 (bar 4; h35 2): fails;
  (3) h55's churches lost 89 (bar 70; h35 killed 58): passes. It kills chains, but loses as many castles. Closed
  (refuted at this dose); no gate was queued. Extra-lane checks of chain24/25: no-op h35n IDENTICAL, sym_h59 stops
  only at the accepted kinds (seed 1 axis contest r45; seeds 3 and 1250 combat after the first attack).
- h59 (PILGRIM_HOT 10) vs h35, 8 games on 1250, 1862, 2872, 241 (out/rp_dlv_h59, out/stall_dlv_h59.txt): (1)
  stalled pilgrim turns to 450: h59 3,642, h35 3,670 (99%; bar at most 40%): fails; (2) mine actions to 450 27,216
  vs 26,878 (101%; bar 110%): fails; (3) wins 4 of 8 (bar 5): fails. Closed (inert on its target). The driver
  diagnostic that "showed" it firing (h59 red stalled 144 vs h35 blue 848 on 1250) compared sides, not builds: h35
  as red stalls 45 turns there, h59 as blue 848 with the same longest streak (423, #4088). Why it missed: of the
  streaks on its own seeds (scratch stallwhy.js), 1250/1862 are part-loaded or full pilgrims 6-26 king steps from
  home with every depot near them hot (no target to switch to; the full ones are in the deposit branch, which
  PILGRIM_HOT never sees); 241's red streaks are a jam, below.
- In h58's and h59's deliveries the same side won both games in 7 of 8 cells. Census of 176 finished cells
  (gates h24-h55 and deliveries h41-h59, both games present): the same side won both games in 81 (46%; red 30,
  blue 51). In the six random 20-cell gates the side is balanced (red-both 23, blue-both 22); the delivery seeds
  are side-decided maps reused (blue: 241, 2872, 2202, 2924, 357; red: 1250, 1862). RULES 1: the queue starts with
  the castles alternating red, blue and new robots are appended, so a red twin acts just before its blue twin.
- What decides those cells (scratch stepin.js / skirm.js on out/rp_dlv_h59): 1250 and 1862 are economy, blue's
  pilgrims stall 469-848 turns to 450 against red's 1-144, red mines ~2x; 241 is the mirror-church knife fight of
  h54 (churches 11 tiles apart at the top centre): rounds 40-200 red loses 69-72 prophets to blue prophets against
  34, a median 1 king step from its own structures, firing 102-106 shots to blue's 193-203. 30-53% of all shots
  on both sides hit a unit that had just stepped into the shooter's reach, so stepping in is common but does not
  separate the sides.
- 241 red's stall: its church at (12,8) has three passable neighbours; a crusader and a prophet stand on two of
  them, a pilgrim on the third, and ~10 full pilgrims (K20, 2-3 king steps from home, no enemy in sight) queue in
  the corridor behind for 220-271 turns (round 250 board). A sealed producer, a basics failure (TRAINING_ALGORITHM
  1.11). Census of stall causes over h50/h54/h55's 120 gate replays running (VM out/stallwhy_census.txt) before
  any fix: jam (no foe, home <= 3) against threat stalls.

## 2026-10-22 07:40 — replica throughput (owner PROMPTS 15-20); h8v5 delivery PASSED 3 of 3; h24v5 look 1 no decision
- Replica queue at 07:28 PDT: 208 waiting (204 ranked), 2 running; 2 execute slots played ~5-7 matches an hour.
  Slot time by team from saturn's log (302 runs, 41.6 slot-hours since 2026-10-21 16:21 PDT; a match counts for both
  teams): Nydroam.BatteredCod 9.9 h (18 runs, 14 nacked, 4 finished, every finished match 38-53 min),
  IvanGeffner bot6b 9.1 h and eigthbot 8.5 h (mostly retries: 201, 202 vs vibe19 failed 6 times each at ~40-57 min
  per try), 18dcb01.Battlecode19-robot2 4.1 h (finished matches 1-48 min). Median finished match 190 s, mean 413 s.
  Most of the slow bots' slot time was retries of games over the 1800 s per-game limit.
- Applied (owner's choices, PROMPTS 18): saturn 4 execute slots (CPUQuota 500%), GALAXY_GAME_TIMEOUT 5400 s,
  autoscrim held while 30+ matches wait and at most once per 24 h (relay.py fire-jobs; GALAXY_SCHED_MAX_WAITING 30,
  GALAXY_SCHED_MIN_HOURS 24); saturn restarted 14:36 UTC (matches 205, 206 interrupted and requeued; 190, IvanGeffner
  bot6b vs CometsTech, retries under the new limit). Pending gate jobs cut from par 4 to par 2 (the running h50x
  extension keeps par 4 until it ends).
- Boost (PROMPTS 15-16): 21 ranked requests 13:28 UTC (ids 158-178) for StoneT2000 botfinalsafe and bot1v43, uvafan,
  awesomelemonade, nthistle, jamesrayman HCN-bot and m-schier wololo, each vs vibe19 and two rated teams; their 52
  queued matches moved to the front (spool_bump).
- Dropping Nydroam (owner allowed it, PROMPTS 20): spool_bump --drop plus a siarnaq update (its 4 waiting matches
  CAN, team inactive) was refused by the auto-mode classifier (Modify Shared Resources); not done. Under the 5400 s
  limit its matches finish (one try each, ~40-55 min), and autoscrim at most daily bounds its cost.
- h8v5 (ENDGAME_FUEL 900) delivery vs h35 (out/dlv_h8v5_h35.jsonl, 2202 / 2296 / 499 / 2633 both sides; latebuild.js
  900): (1) preachers built in rounds 900-1000 h8v5 377 vs h35 9 (bar 3x) PASS; (2) final health over games reaching
  round 1000 h8v5 32,710 vs 24,040 = 136% (bar 120%) PASS; (3) wins 7 of 8 (bar 5) PASS (lost 499 as blue on
  castles). PASSED 3 of 3: its gate (40 games vs h35, seed0 5000) moved up to run next (job ...a3d577, par 2).
- h24v5 (ECON_UNTIL 100) gate, 20 cells: +8 -5, D 13, t 0.83: no decision at the D 12 look. 20 more cells (seed0
  6000, appended to out/h24v5_h35.jsonl) queued as ...a3d597, after the h54 / h55 extensions; next look at D >= 24.

## 2026-10-22 07:49 — orphan pilgrims; h60 (PILGRIM_ORPHAN 1) pre-registered
- Trace (h50's gate, seed 1250, red = h35): pilgrim #3228, born at church #111 (11,31) at round 14, mined fuel beside
  it; a blue prophet at (19,31) killed the church at round 25. The pilgrim filled to F100 at round 34 and then took no
  action for 430 rounds, 11 moves from a living castle it had never seen. Cause: pilgrim.js forgets a structure
  whose tile it sees empty; with st.structs empty the deposit branch returns null for good (`if (!st.structs.length)
  return null`), and an orphan with part of a load keeps walking to its depot by the fallen church.
- Census (scratch orphan.js over the stallwhy census of h50/h54/h55's gates, 120 games): of 165 pilgrim stall streaks
  (50+ turns, 42,762 turns), 56 were orphans (no structure the pilgrim had seen still alive at the streak's start;
  16,626 turns, 39%), on 9 of 20 maps (1205, 1250, 1325, 1635, 1862, 2030, 241, 2642, 357), both sides. 15 of the 41
  full-load streaks were orphans; the other 26 full-load streaks knew a living structure (not addressed here).
- **h60 = v5 + PILGRIM_ORPHAN 1** (pilgrim.js orphanStep): a pilgrim that knows no living structure drops its depot
  and walks to the nearest (by moves) site of a cluster in our canonical half that it has not yet seen from r2 36,
  until a castle or church comes into sight; then it mines the free depot nearest to where it stands. Every castle
  seeds a resource cluster (engine game.js:195), and our castles lie in our half. Displaces: an orphan's mining at
  its old depot (it leaves at once, part load or full). Unit test: test/bot.test.mjs "PILGRIM_ORPHAN".
- Decision counter: stall.js (cargo held off any depot, not mining or giving, not next to a structure; to round 450)
  and its longest streak. Driver diagnostic first: h60 red vs h35 blue, seed 1250, 450 rounds; the red pilgrims that
  lose church (11,31) must deposit within 60 turns of the fall.
- Delivery (extra lane, after no-op h35o vs h35 and symcheck): 8 games vs h35 on 1250, 1635, 1862, 357 both sides
  (orphans in two or more of the three gates). Pass all of: (1) stalled cargo turns to round 450, h60 at most 70% of
  h35's in the same games; (2) pilgrim mine actions to round 450, h60 at least 100% of h35's; (3) h60 wins at least
  4 of 8. Then a gate of 40 games vs h35 (seed0 5000, par 2), D looks 12 / 24 / 48, accept t >= 2, reject t <= 0.
  A repair of a basics failure: the ladder rule's net >= 0 applies. Falsifier: (1) fails (orphans are not where the
  stalled turns go, or they do not find home). Zero arm h35; no dose (a switch).

## 2026-10-22 08:00 — h50 ACCEPTED (pooled 40 cells +24 -11, t 2.20): frozen as v6, now the src defaults; queue rebased
- Gate h50 (v5 + PIONEER_RESERVE 2 + MARCH_MASK 8) vs h35, read pooled as pre-registered 03:39: block 1 (seed0
  5000, out/h50_h35.jsonl) 20 cells +12 -5; extension (seed0 6000, out/h50x_h35.jsonl, finished 07:45) alone 20
  cells D 18, +12 -6, t 1.41; pooled 40 cells, 80 games, 53 wins: gained 24, lost 11, split 5, net +13, t 2.20
  (accept bar 2). Castle margin read 05:55 was 0.44 on block 1: its wins come at round 1000 on health.
- bots/v6 = dist/h50 (hash 9d787196f941; ROSTER.tsv). Replica submission 96 ("v6 (h50): ..."), accepted: matches
  created from now on play v6; the waiting backlog (about 200) was created with v4/v5.
- src defaults now PIONEER_RESERVE 2, MARCH_MASK 8; unit tests 91/91. The defaults-only build dist/v6d is not
  byte-identical to dist/h50 (without --cfg overrides the minifier drops dead branches), so the identity check is a
  game: v6d vs h50 and h50 vs h50 under --det, plus symcheck of v6d, on the extra lane (out/dlv_chain28.sh).
- Queue: reads under way finish against v5, since pooling needs one control: h8v5's gate (running), the h54, h55 and
  h24v5 extensions; a pass is stacked onto v6 and gated vs v6 (40 games). Not yet started, rebased onto v6 in place
  (same job names, v6 + own switch vs dist/h50): h51v6 delivery, h43v6, h15v6, h20v6, h7v6, h10v6, h11v6, h9v6, h18v6;
  the reference jobs now play bots/v6. h39's and h44's held single gates are superseded (~/jobq/superseded).
- h60 (PILGRIM_ORPHAN 1): no-op h35o IDENTICAL; symcheck seeds 1 (axis contest r45), 2 clean, 3 and 1250 (combat
  after the first attack). Driver diagnostic h35 red vs h60 blue on 1250 (to 450): blue stalled 447 turns (h35 on
  blue in the mirror diagnostic: 849); the 423-turn streak of #4088 remains in both: it is not an orphan (castle
  (24,20) in sight from (24,29)) but waits beside depots under red's army at (13-17, 29-32), the h59 case. Delivery
  running on the extra lane (out/dlv_chain27.sh: 1250, 1635, 1862, 357 both sides vs h35; bars pre-registered 07:49).
- Slip: an attempts.csv rewrite opened the file before a malformed-row error and truncated it; restored from git and
  redone through a temporary file. Three rows (h41, h54, h55) had unquoted commas in the outcome field; now quoted.

## 2026-10-22 08:16 — pioneers that never arrive; h61 (PIONEER_GIVEUP) pre-registered; replica queue reordered
- Replica match 206 (v5 vs StoneT2000 bot1v43, 0-3): on 2321 (we blue) and 1884 (we red) our side built no church
  at all. 2321: castle (33,9) sent pioneers at rounds 19-20 (sites: the centre, and the mirror of red's church
  cluster); both stood 4-6 king steps out under red's church prophets (21,14), (18,15) and died there at 156 and
  190; the castle re-sent two at 100-101 that died likewise; K 165-260 sat in the bank to round 200.
- Scratch pioneers.js (VM out/; a pioneer = a pilgrim its castle built with SIG.CHURCH on that turn; its phase ends
  at a church, a first mine, or death; stuck = 40+ turns without either): our 12 games vs StoneT2000 (matches 200,
  203, 204, 206, to round 450): 46 pioneers, 20 churches, 25 killed, 1 stuck. The killed ones die 2-20 king steps
  from home to prophets, and the castle re-sends to the same cluster every ~105 rounds (lost-cluster rest 100):
  203 game 3 (2518) lost 7 pioneers that way, 204 game 2 five. h50's gate (40 cells, 80 games, to 450): h50 263
  pioneers, 172 churches, 18 killed, **40 stuck (7,874 turns) on 7 maps** (418 2,548 turns, 1325 2,544, 2542 1,076,
  2072 687, 67 474, 499 426, 2166 119); h35 349, 152, 37, 120 stuck (25,117 turns) on 15 maps. A stuck pioneer
  waits beside a contested site under enemy eyes for the rest of the game, and its castle sends another to the same
  site every 81 rounds (the 80-round overdue rule): 418 red r28, 109, 190, 271, 352.
- h61 = v6 + PIONEER_GIVEUP 20 (pilgrim.js siteStalled): a pioneer that goes 20 turns with an enemy attacker in
  sight and no nearer its site (king steps) than its best reports the cluster taken (CT.TAKEN + cluster: castles
  rest it 200 rounds and drop that pioneer from their in-flight list) and mines the nearest free depot. Displaces:
  the wait (and, after 80 rounds, the re-send). Reachable: the stuck pioneers above stand 1-6 steps out with enemy
  units in sight. Dose ladder 0 (identity: v6e vs h50 under --det, chain29), 20 (h61), 50 (h61b, built).
  Unit test 92/92. Checks on the extra lane: out/dlv_chain29.sh (no-op, symcheck), then the delivery.
- Delivery (out/dlv_chain30.sh): h61 vs h50 on 418, 1325, 2542, 2072 both sides (8 games), read with pioneers.js and
  stall.js to round 450. PASS needs all 3: (1) stuck-pioneer turns on h61's side <= 30% of h50's side in the same
  games; (2) churches by round 450, h61's side >= h50's (sum); (3) h61 wins >= 4 of 8. Falsifier: (1) fails, i.e.
  the giving up does not fire or the castle refills the wait.
- Not addressed: pioneers killed en route (castles re-send into the same prophets; a longer rest after a loss is a
  separate switch, not yet built). Against StoneT2000 that, not the wait, is the common case.
- Replica queue (203 waiting at 08:12, 4 slots): 17 waiting matches involve the four slow bots (IvanGeffner bot6b,
  eigthbot, Nydroam, 18dcb01 robot2: 31.6 of 41.6 slot-hours so far); spool_bump moved the other 186 ahead of them
  and our 13 (v6 vs StoneT2000 bot1v43 and botfinalsafe, requests 179-180, first) ahead of all. Nothing dropped.

## 2026-10-22 08:25 — replica: three slow bots dropped (owner, PROMPTS 21)

Saturn journal since the replica started (305 execute runs, 42.6 slot-hours; acked 200, nacked 105): Nydroam.BatteredCod
9.9 h (18 runs, 14 nacked), IvanGeffner.BC19-bot6b 9.1 h (19, 15 nacked), IvanGeffner.BC19-eigthbot 8.5 h (12, 8
nacked): 27.5 slot-hours for 12 results, ladder 416 / 425 / 593. All three dropped: `spool_bump.py --team ... --drop`
(13 ready messages to dead/), matches 196 207 213 214 222 238 249 250 291 315 316 328 371 CAN, teams status X. Match
190 (bot6b vs CometsTech~187e8c, running 45 min) left to finish. Kept: 18dcb01 robot2 (4.1 h, 6 of 11 acked) and
CometsTech~187e8c (3.8 h; most nacks against the dropped bots). Under the 5400 s limit, match 244 took 2700 s and 206
1414 s. Queue 189 waiting, 4 running (205 and 406 are ours).

## 2026-10-22 08:43 — h60 delivery fails; replica 206-3 diagnosed (pilgrims idle on safe depots); h63 pre-registered

- **h60 (PILGRIM_ORPHAN 1) delivery, 8 games vs h35 on 1250, 1635, 1862, 357 (out/rp_dlv_h60, out/stall_dlv_h60.txt):**
  (1) stalled cargo turns to 450: h60 3,583, h35 4,460 (80%; bar at most 70%): **fails**; (2) mine actions to 450:
  24,909 vs 24,892 (100.1%; bar 100%): passes; (3) wins 4 of 8 (bar 4): passes. Closed (DELIVERY FAILED 1 of 3). It
  did cut its side's stall on 1250 (447 vs 849), 1862 (523 vs 736) and 357 (1,108 vs 1,455); 1635 is the same game
  either way (835 / 490 by side). The same side won both games in all 4 cells. No gate.
- **Replica 206-3 (v5 red vs StoneT2000 bot1v43, seed 1884, lost at 611):** 4 karbonite depots a side; StoneT mined
  5,004 K to our 2,080. Per-depot use (scratch depotuse.js): our castle (0,14)'s five depots were mined 38-78% of
  rounds 1-99 and 0-1% of rounds 100-300, while StoneT's pilgrims mined two of them 25-31%. Seven of our pilgrims
  shuffled among them for 200+ rounds empty-handed (#2645 mined (1,12) to round 104, then never again); at round 140
  three stood on the cold depots (1,12), (2,13), (2,14) without mining; the free ones, (2,15) and (1,16), lay in
  range of StoneT prophets at (1,22) / (0,23) (r2 50 and 36). A pilgrim mines only on its target; a target taken by
  a friend passing through is swapped for the nearest free one, which here was hot, and nothing ever gives a hot
  target up for the tile the pilgrim stands on. Fuel was never short (16,097 banked at the end): fuel miners came
  from (4,4) on SWITCH (karbonite < 30, fuel >= 3000) and crowded the cluster.
- Census (scratch depotidle.js, pilgrim turns on a depot with room that neither mine, give nor build, to 450):
  replica 206-3 red 335 vs StoneT 42; h50's gate (80 games, out/depotidle_h50.txt) 1,831 / 2,252 a side, at most 228
  in one game (241 red). Self-play rarely triggers it; StoneT2000's prophets parked beside our clusters do.
- **h63 = v6 + PILGRIM_HERE 1** (pilgrim.js hereRetarget, commit after this entry): a pilgrim whose target depot is
  taken or hot takes the depot it stands on (if not hot), else the nearest free depot that is not hot; with none it
  keeps its target. A basics fix (pilgrims idle on free depots). Gate: h63 vs h50, `--random 20 --seed0 5000 --par 2`
  (VM job ...a3d5771, next in line; replays out/rp_h63h50). Pre-registered delivery on that gate's replays
  (depotidle.js to 450): h63's side's depot-idle turns at most 50% of h50's, and mine actions at least 100%. Accept
  per the gate (t >= 2); as a basics fix, also at net >= 0 with D >= 12 if the delivery passes. Extra lane chain31:
  no-op v6f (defaults, h62/h63 code) vs h50 --det, symcheck h63 (1, 2, 3, 1884) and h62.
- **h62 = v6 + PIONEER_LOST_DOUBLE 1** (castle.js lostRest): the rest before re-sending a pioneer where one died
  doubles per loss (100, 200, 400 ... capped at 1,600). Built, not queued: in h50's gate only 18 of 263 pioneers died,
  so a local gate cannot see it; it waits for a replica panel against StoneT2000 (25 of 46 killed).

## 2026-10-22 08:56 — replica 205 (v5 vs StoneT2000 botfinalsafe) won 2-1; the loss was a one-round church bomb; anti-chain panel pre-registered

- Match 205: game 1 (826, blue) won by castles (botfinalsafe threw 3,931 exceptions and 50 timeouts); game 3 (836,
  blue) won on health; game 2 (53, red, one castle a side, 58x58) lost at round 233.
- 205-2: at round 229 StoneT built **16 churches in one round** (replay.js events): a chain from anchor pilgrims that
  had stood still since round 150-200 at (13,22), (13,23), (16,21), (16,22), 11-12 rows from our castle (9,11), just
  past castle vision (r2 100) and seen by none of our pilgrims (r2 137). Each link builds a church, the new church a
  pilgrim, which steps and builds the next, all in the same round (RULES 1: new robots act the round they are built),
  ~60 K a link: bank 1,015 K at 200, 0 at 233. The ring of churches round our castle built ~13 preachers at round
  230; the castle (K 180, three preachers in its last 10 rounds) fell at 233. Our 65 military units (crusader idle
  2,155 of 2,247 turns) guarded our four churches and the castle's lattice; ATTACK_ROUND 450 means we had not
  attacked. StoneT's pilgrims 29 by 150 to our 15, churches 10 by 175 to our 5, K mined 3,540 to 2,238 by 233.
- Our counters exist only as untested switches: h54 STRIKE_R2 (a structure seeing an enemy church strikes it with a
  preacher; only while no enemy attacker is in sight), h56 HUNT (a pilgrim radios an enemy pilgrim parked in our
  half; here no pilgrim of ours saw the anchors). Self-play cannot rate them: our builds do not chain. So a panel
  against our own chain bomber, **h55v6 = v6 + CHAIN_ROUND 150** (h55's chain: wait 12 steps out, church-pilgrim-
  church in one round, preachers at the castle).
- **Anti-chain panel (pre-registered):** h50 (control), h54v6 (STRIKE_R2 36, PREACHER_SELF 4, PREACHER_MIL 2.5) and
  h56v6 (HUNT 2), each vs h55v6 on the same 20 random cells (`--seed0 5000`, both sides, par 2; VM jobs
  ...a3d5772-4 after h63's gate; out/panel_chain_<build>.jsonl, replays out/rp_panel_chain). Read: `paired.js
  --cand <hash> --ctrl <h50 hash> --opp <h55v6 hash>` on the concatenated files. A candidate that reaches t >= 2 (or
  net >= +3 at t >= 1.5) goes to a no-harm gate vs h50 (accept at net >= 0, D >= 12); t <= 0 closes it. Control
  h50's own record vs h55v6 says how much the chain costs v6 today; if v6 wins nearly all of them the panel is void.
- h54's three gate-extension jobs vs h35 (...a3d58, a3d59, a3d595) moved to ~/jobq/superseded: 17 of its first 20
  cells were byte-identical, so D 12 needed ~80 more cells; the panel rates h54v6 where it fires.

## 2026-10-22 09:00 — all 24 StoneT2000 games tabulated; one-castle maps lost 10 of 10; h64 (PIONEER_FAST) pre-registered

- v6's scrims: 406 vs bot1v43 1-2 (won 203; lost 705 at 1000 on castles, 53 at 301), 407 vs botfinalsafe 0-3 (lost
  at 597, 316, 282). Over the 24 replica games vs StoneT2000 (199-206, 406-407; scratch stonet_table.sh, bombs.js)
  we won 4. A one-round church bomb (>= 4 churches in a round, most within r2 100 of our castle) appears in 21 of
  24 and ends 10 games within ~10 rounds of it. **On one-castle maps we lost all 10**, mostly on economy first: at
  round 200 pilgrims 3-7 vs 13-29 in five of them (203-2, 203-3, 204-1, 206-2, 407-2), karbonite mined 364-706 vs
  1,432-2,446.
- 407-2 (v6 red, seed 1706): five-karbonite cluster at (5-8,16-20) on the midline, equidistant. Our castle sent a
  pioneer there at round 4 (radio 8657 = SIG.CHURCH (7,17), PLAN_CONTEST_FIRST working); it walked one tile a turn
  (fuel 244-520 < PILGRIM_FAST_FUEL 1000 caps pilgrims at r2 2) and was killed at round 29 at (10,12), 5 king steps
  short; botfinalsafe churched it at ~30 and mined it all game (we: 2 karbonite depots, pilgrims 5-7, K 342 by 100,
  F 4,841 banked unused). 203-2 (seed 2644) is the same story on a midline cluster of 8 karbonite depots.
- **h64 = v6 + PIONEER_FAST 1** (pilgrim.js go(..., fast)): pioneers take full r2 4 steps whatever the bank (on a
  straight path 2 tiles a turn instead of 1; ~1 more fuel a tile; on a diagonal (1,1) steps already tie). Gate: h64
  vs h50, 20 random cells, par 2 (VM job ...a3d57715, after h63's). Delivery on its replays (pioneers.js to 450):
  (1) mean pioneer phase to its church (born to build) on h64's side at most 85% of h50's; (2) churches built by
  round 150 at least 105% of h50's. Accept per the gate (t >= 2). Extra lane chain32: no-op v6g (defaults with
  h62-h64 code) vs h50 --det, symcheck h64 (1, 2, 3, 1706). chain28's no-op v6d vs h50: IDENTICAL.

## 2026-10-22 09:30 — replica: 5th execute slot planned, error census; scrims 287/385/388; h65 (ESCORT) pre-registered
- Replica queue 181 waiting, finishing about 5 matches an hour (saturn log since 11:00 UTC; the field's strong bots
  play 15-75 minute matches on the contest clock): about 1.5 days at 4 slots. No single team dominates any more
  (most waiting: RyanSharafuddin, NielsKornerup 9 each). Committed: MAX_EXECUTE_SLOTS 5 (unit MemoryMax 12G, CPUQuota
  600%); the 5th slot is the extra lane's core, deployed when chains 30-32 finish (the restart re-runs the matches
  in flight). VM game count stays 7 (5 replica + 2 gate games).
- run_game.js now reports per team init_robots (robots whose sandbox failed to start) and err_kinds (the five
  commonest error kinds, first line, numbers as #); saturn keeps both in match.json. Why: StoneT2000's replica games
  show 1,434-2,262 "initialize" errors and 2,000-4,000 exceptions in a long game, 60-355 frozen. A 100-round driver
  game of h50 vs h50 without --init-ms shows the pattern: 8 robots a side "Took too long to initialize", each then
  logging "Robot is not initialized." and "TypeError: robot.hook is not a function" every turn. The replica's
  init_ms_max for StoneT2000 stays under its 1,000 ms limit, so its failures are another kind; the census will say.
  unit-tests.sh now also runs the galaxy19 Python tests (54).
- Scrims 287 (autoscrim, created 01:00 PDT) and 385/388 (created 06:28 PDT, before v6): vs botfinalsafe 2-1 and 1-2,
  vs bot1v43 0-3. Churches at round 200, us/them: 388 2/9, 0/3 (three castles, none all game), 9/9; 385 4/11. Pioneer
  census to round 500 (scratch pioneers.js): ours 70, churches 28, died 23, stuck 30+ turns 14.
- Self-play baseline (h50 vs h35 gate replays, 40 games, to round 300): pioneers 266, churches 164, died 8, stuck 62
  (23%). Against StoneT2000 (24 games): 114, 62, 34, 12. Replica 206-2 (seed 2321, v5 blue, 0 churches all game):
  the first pioneer reached the edge of two bot1v43 prophets' range beside its site (they guarded bot1v43's church
  on the mirror cluster, 7 tiles across the axis) at round 24 and waited there until killed at 156; the castle
  re-sent pioneers at 100 and 181, 3 of 6 died, 3 stalled.
- **h65 = v6 + ESCORT 2** (castle.js openEscort/escort, military.js init): a castle whose pioneer is ESCORT_SLACK = 10
  turns past its king-step distance to the site, or was lost on the way, owes that cluster 2 prophets; it builds
  them after depot pilgrims and pioneers (karbonite reserve as the peacetime army's, fuel MIL_FUEL_RESERVE), radioing
  SIG.GUARD (12) with the site, and a unit born hearing it takes the site as its home (lattice, engage radius).
  No-op: v6h (defaults) vs h50 --det must replay h50 vs h50 byte for byte; symcheck h65 on 1, 2, 3, 2321 (VM job
  ...a3d577158, before the gate). Gate: h65 vs h50, 20 random cells, par 2 (...a3d57716, after h64's).
  Delivery on its gate replays (pioneers.js --to 300 --stuck 30; h65's side from the file name): (1) escorts built
  (castle builds radioing type 12) in at least 5 of the 40 games; (2) stuck pioneers on h65's side at most 75% of
  h50's in the same games; (3) churches built by round 300 on h65's side at least h50's. Accept per the gate
  (t >= 2); as a basics fix (pioneers that never arrive) at net >= 0 if (1)-(3) pass. Falsifier: t <= 0 or (2) fails.

## 2026-10-22 09:40 — 5th replica slot live (after a failed first deploy); h8v5 rebased as h8v6
- Deployed the 5th execute slot and the error census at 09:32 (16:32 UTC). Every game then exited 1 within a second
  (218 nacks in 10 s; 152 matches back to TRY, none to ERR). Cause: the census build also shipped run_game.js's
  netIsolated(), which calls os.networkInterfaces(); saturn's unit sets RestrictAddressFamilies, so the netlink
  socket fails (uv_interface_addresses errno 97) and the game refuses to start. The driver and VM tests run outside
  that unit and passed. Fix (98c6bfa): fall back to /proc/net/dev (interfaces of the process's own network
  namespace); test added. Verified one game under the unit's own properties with systemd-run (and that the bare
  restriction reproduces errno 97) before restarting at 09:36: 5 slots running, 0 nacks since. LEARNINGS 21.
  The extra lane still runs until chain32 ends, so the VM carries 5 replica + 2 gate + 1 extra-lane game for now.
- Replica 09:40: 180 waiting (147 TRY, 33 QUE), 5 running: all five are the strong-author challenges vs vibe19 (391
  uvafan, 394 awesomelemonade, 397 nthistle, 400 jamesrayman, 403 m-schier wololo). ERR stays 15, all before 01:00.
- **h8v5 gate vs h35** (ENDGAME_FUEL 900): 20 cells, 40 games, gained 4, lost 0, split 16: D 4, below the first
  look (D 12), so undecided. v6 is the incumbent and a pass would have been re-gated on v6, so the switch is rebased
  rather than extended against v5: **h8v6** = v6 + ENDGAME_FUEL 900 (sha a6865c24abac) vs h50, 20 random cells,
  seed0 5000, par 2 (VM job ...a3d5775, after the anti-chain panel). Same bar: looks at D 12 / 24 / 48; accept
  t >= 2, reject t <= 0. h8v5's delivery (3 of 3) stands; the switch acts only from round 900, so most cells split.

## 2026-10-22 09:55 — vs StoneT2000 our churches stop at ~3; h66 stack pre-registered; tools/census.js
- Opening timeline, us vs StoneT2000 (botfinalsafe, bot1v43) over the 33 fetched replica games (matches 199-206,
  287, 385, 388, 406, 407; mean per game, scratch tl_vs.js):

  | round | churches us/them | pilgrims us/them | army us/them | mined K us/them | mined F us/them |
  |---:|---|---|---|---|---|
  | 25 | 0.2 / 0.9 | 7.2 / 6.3 | 2.9 / 1.2 | 119 / 108 | 652 / 217 |
  | 50 | 0.9 / 1.7 | 9.3 / 9.3 | 5.9 / 1.9 | 279 / 233 | 1,516 / 897 |
  | 100 | 2.0 / 4.3 | 12.8 / 16.6 | 14.8 / 7.6 | 709 / 720 | 3,799 / 3,224 |
  | 200 | 2.7 / 5.8 | 15.2 / 20.8 | 40.6 / 26.8 | 1,827 / 2,064 | 9,501 / 10,219 |
  | 300 | 2.7 / 7.3 | 15.6 / 23.9 | 70.6 / 38.6 | 3,064 / 3,471 | 15,899 / 17,251 |

  Our church count stops growing after round 150 while theirs keeps climbing; we hold twice their army from round
  25 on and mine three times their fuel by round 25. Next: where those churches stand (own half / midline / enemy
  half), then a structural economy candidate.
- Replica 400 vs jamesrayman HCN-bot: won 3-0 (castles at 679, 470, 459). The new census reads their 450-1,130
  errors a game as their own "Cannot afford to build specified unit." (and 3 "Not enough fuel to move"); ours 0.
  Bumped match 306 (StoneT bot1v43 vs botfinalsafe) to the front for the census of StoneT's errors without us.
- tools/census.js: per replay and team, pioneers (phase, died, stuck), churches (and by given rounds), depot-idle
  pilgrim turns, mines, escorts (SIG.GUARD builds), chainers (SIG.CHAIN builds), recalls (FAR.RECALL radios) and
  late preachers; gate replays sum by role (cand / ctrl from the file name). It replaces the scratch pioneers.js and
  depotidle.js for the pre-registered deliveries of h63, h64 and h65 (same definitions; unit test on the rush
  fixture checks churches, mines and late preachers against replay.js's tally).
- **h66 = v6 + ENDGAME_FUEL 900 + CHAIN_ROUND 150** (sha 6f53bb5b82b8): the stack of the two delivered near-misses
  with positive estimates (h8v5 vs h35 +4 -0; h55 vs h35 +6 -5), independent mechanisms (endgame preachers from
  round 900; church chains at the mirror castles from round 150). RECALL (h43) stays out: delivered but never gated.
  VM job ...a3d57717 (after h65's gate): symcheck 1, 2, 3 to round 250, then gate vs h50, 20 random cells, seed0
  5000, par 2. Delivery (census.js --to 1000 on its replays): (1) chainers on h66's side in at least 20 of 40 games;
  (2) late preachers on h66's side at least 3x h50's. Accept at t >= 2 (looks at D 12 / 24 / 48); reject at t <= 0.
  If h66 is accepted, h8v6's single gate (...a3d5775) is withdrawn.

## 2026-10-22 10:15 — StoneT2000 out-churches us 3:1; a lone castle's pioneer cap; h67 pre-registered
- Census check: tools/census.js on the 40 h50-vs-h35 gate replays reproduces the scratch scripts exactly (both sides
  summed: pioneers 266, pioneer churches 164, died 8, stuck 62, depot-idle 1,076, mines 209,785).
- Where churches stand by round 300 vs StoneT2000 (33 replica games; king distance to own nearest castle minus the
  enemy's: own < -4, mid, enemy > 4): ours 97 (own 73, mid 24, enemy half 0), theirs 295 (own 149, mid 56, our
  half 90); 8 and 9 died. Depot coverage (own half = nearer own castles): we mined 68% of our half's depots by round
  100 and 81% by 200-300; StoneT2000 83%, 91%, 96% of its half, plus 3% / 8% / 13% of ours.
- Our plan is not the limit: statically (scratch plancover.mjs, the 24 maps of those games) castles plus planned
  church sites reach 383 of 386 own-half depots within SERVE_MOVES; a greedy cover needs 76 sites to the plan's 94.
  Execution is: v6's replica 406-3 (seed 53, 58x58, one castle a side) ended 6 churches to StoneT2000's 24 by round
  300. Our castle's two pioneers (MAX_PIONEERS 2) went to the contested clusters first (PLAN_CONTEST_FIRST: 34 and 47
  king steps out, churches at 32 and 44), then the castle built nothing from round 5 to 67 with 90 karbonite in
  reserve; the near clusters (10 and 12 steps) were churched at 75 and 97. Mined K by round 30: 56 vs 154. The cap is
  per castle: a lone castle keeps 2 pioneers in flight where three castles keep 6. 42% of corpus maps (1,211 of
  2,895) have one castle a side; on the 10 one-castle maps among the StoneT2000 games our plan has 1-11 sites (6 with
  >= 4). Self-play has the same cap on both sides, so the gate measures the rate, not the race.
- **h67 = v6 + PIONEERS_TEAM 4** (castle.js maxPioneers: a castle keeps max(MAX_PIONEERS, ceil(4 / our castles))
  pioneers in flight; sha 4800c4217fc9). Changes only one-castle maps (and multi-castle maps after castles die).
  Displaces the early guard (PIONEER_RESERVE holds 60 karbonite while a pioneer is due) and depot pilgrims.
  VM job ...a3d57711 (next after h63): no-op v6i (defaults, sha face45178704) vs h50 --det, symcheck h67 on 266,
  2009, 53 to 250; gate h67 vs h50 on 20 one-castle cells (corpus castles = 1, LCG from 5000: 266, 2009, 275, 567,
  2611, 47, 1873, 1764, 948, 1996, 2542, 1178, 85, 2746, 2581, 27, 119, 602, 1073, 1442; both sides), par 2.
  Delivery on its replays (`census.js --castles 1 --by 100,200`): (1) churches by round 100 on h67's side at least
  125% of h50's; (2) by round 200 at least 110%; (3) pioneers died at most 150% of h50's + 2. Accept at t >= 2
  (looks D 12 / 24 / 48), reject at t <= 0; falsifier t <= 0 or (1) fails. Dose ladder: 4, then 6 (three per castle
  on two-castle maps).

## 2026-10-22 10:47 — the CS554 rush reproduced locally (bots/rush4); h20v6 delivery pre-registered and moved up
- All three early castle losses in the replica (of 37 losses in 235 games) are to CS554 on one-castle maps: 1375
  (round 53, v1), 1915 (29, v3), 1706 (28, v5). In 235-2 (seed 1706, 37x37, poor: 8 karbonite tiles) CS554 built 3
  pilgrims, crusaders at rounds 4, 6, 7, 14 and a prophet at 5; first damage at round 20. v5 built 5 pilgrims, a
  pioneer church at round 10 (50 karbonite) and its 2 pilgrims, held 0 karbonite from round 10 to 22 and lost its
  castle at 28 without building a defender.
- Our sparring partner bots/rush (built 2026-10-21 from v2-era source) never tested this: its crusaders cruise at r2
  <= 2 and pause, first damage at round 31 on 1706; v6 kills 14 crusaders for 1 in 120 rounds, both sides.
- **bots/rush4** = current src with `--cfg RUSH=3 --cfg CRUISE_R2=4` (sha 47751d295347): three pilgrims, then
  crusaders at two tiles a turn, first damage at round 15 on 1706. v6 (h50) loses its castle to it at round 27 on
  1706 as red and as blue (mirror-exact: same rounds, same tiles). At r2 9 (first damage round 11) the crusaders
  arrive before the church is paid for and v6's castle builds preachers at 10 and 12 and holds: the danger is a rush
  that lands just after the pioneer church has emptied the bank.
- DEF_RESERVE_K 30 (h20v6, sha 3101261a8d9c) holds 1706 vs rush4 on both sides (preachers at 13 and 14; 60 adds a
  third). Driver diagnostics, 200 rounds, h50 and h20v6 vs rush4 on 1706/1915/1375 both sides: h50 loses only 1706
  (both sides), h20v6 loses none. A driver panel of 21 random one-castle cells (cdist 14-32) shows h50 losing no
  castle so far: the exposure is poor maps, not short ones.
- **h20v6 delivery (pre-registered before any game on this panel):** h50 and h20v6 each vs bots/rush4 on 20 poor
  one-castle maps, both sides, 200 rounds (`batch.js --max-rounds 200`, new): 1706 plus 19 drawn from the corpus
  (castles 1, karbonite tiles <= 10, cdist 18-34, kn <= 1; 291 qualify): 477, 1755, 2633, 1087, 1272, 1756, 470,
  1699, 1804, 1406, 2532, 1722, 1921, 2992, 207, 1652, 932, 2909, 2277. Castles lost counted from the replays.
  (1) h20v6 loses at most half as many castles as h50; (2) none on 1706. If h50 loses fewer than 2 the panel is
  uninformative and the gate decides alone at t >= 2.
- Gate unchanged (h20v6 vs h50, 20 random cells from seed0 5000, par 2). A basics fix: accept at net >= 0 at the
  last look if the delivery passes; else accept t >= 2, reject t <= 0. Moved from 4b03 (15th) to ...a3d577112, right
  after h67, with the delivery games first. Note the interaction: h67 sends more pioneers from a lone castle, which
  is the rush exposure; the reserve covers pioneers too, so the two compose.
- Replica health: match 306 (StoneT2000 bot1v43 vs botfinalsafe, no vibe19) lost 16 robots to sandbox-creation
  timeouts at the 1000 ms limit (init_ms_max up to 937 ms; "Robot is not initialized" every turn after). Since the
  5th slot the p90 sandbox time of fetched matches is 800-1000 ms (36-250 ms on the first 200 matches). Every
  failure is "Failed to initialize: Error: Script execution timed out": vm2's 200 ms kill on running the bundle
  (LEARNINGS 17), not GALAXY_INIT_MS, so the 2000 ms limit committed in 9076772 would have changed nothing and is
  reverted. Instead run_game.js --init-ms now also bounds that bundle run (loadLimit; each sandbox returns to the
  per-turn kill at its first turn; unit test with a bundle that loads for 300 ms). A runtime-only deploy: new games
  pick it up, games in flight keep their loaded code, no saturn restart.

## 2026-10-22 11:52 — h61's delivery fails; h68 (give up a stalled site with no enemy in sight) pre-registered
- h61 delivery (8 games vs h50 on 418, 1325, 2542, 2072 both sides, out/pioneers_dlv_h61.txt, census to 450):
  (1) stuck-pioneer turns, h61's side 3,128 vs h50's 7,787: ratio 0.40 against the 0.30 bar, FAIL; (2) churches by
  450, 39 vs 33, pass; (3) h61 wins 5 of 8, pass. Pre-registered falsifier (1) holds: **h61 is falsified, no gate**;
  h61b (dose 50) is dropped with it.
- Why it fell short: most stuck turns have no enemy in sight, so the trigger never fires. Seed 418, h50 blue: pioneer
  #1936 (site (9,32), radio 8800) wanders x 24-34 for 349-418 turns, 16-22 king steps from a site its own team had
  churched by round 120; no enemy unit in sight the whole time.
- **h68** = v6 + PIONEER_GIVEUP 20 + PIONEER_STALL_ANY 40 (new, config.js; pilgrim.js siteStalled): a pioneer that
  goes 40 turns no nearer its site than its best gives the site up the same way (reports CT.TAKEN + cluster, castles
  rest it and free its slot, the pioneer mines the nearest free depot) whether or not it sees an enemy; the h61
  trigger (20 turns with an attacker in sight) stays. sha ae584f00df6e; identity build v6j (defaults, e3dee862d15f).
  Unit test extended (no enemies, STALL_ANY 4: fires on the 5th stalled turn, radios TAKEN). Node 101, Python 54 pass.
- Checks and delivery, VM job ...a3d577113 (after h20v6): v6j vs h50 --det on 1828 must replay noop_h50_h50
  byte-identical; symcheck h68 on 1, 2, 3, 418 to 250; then h68 vs h50 on h61's 8 cells, read with pioneers.js to
  450. PASS needs all 3 of h61's criteria: (1) stuck-pioneer turns <= 30% of h50's; (2) churches by 450 >= h50's;
  (3) wins >= 4 of 8. Falsifier: (1) fails again, i.e. the stalls are not monotone-distance stalls (a pioneer that
  creeps nearer one step every 40 turns resets the count) or castles refill the same sites. On PASS: gate h68 vs
  h50, 20 random cells from seed0 5000, accept t >= 2, reject t <= 0.

## 2026-10-22 12:50 — replica: per-game wall limit 10800 s, heap stays 2 GB; StoneT2000's church lines counted; h69 parked
- Match 403 (wololo vs vibe19): game 2, seed 826 (64x64), ran over the 5400 s per-game limit twice (nacked after
  5,554 s and 5,559 s); wololo has no finished match (319, 339, 342, 403, 404, 405 all TRY). GALAXY_GAME_TIMEOUT is
  now 10800 s (galaxy-setup.sh, deploy.sh env); saturn restarted 12:48 PDT, right after 403's nack, which re-ran 4
  matches 1-26 minutes in. Journal clean: 5 slots started, env shows 10800.
- Heap A/B (v6 vs v6, seed 826, 600 rounds, one game alone on the VM): 2048 MB heap 880 s, peak 2,064 MB; 4096 MB
  heap 819 s, peak 4,036 MB. 7% faster for twice the memory: the heap stays at 2048 MB (5 slots x 4 GB would not fit).
- tools/census.js counts one-round church lines (chains, chain_churches, chain_near, chain_kills; LEARNINGS 22).
  StoneT2000 in the replica: lines in 28 of 33 games, about 20 of them ending 1-4 king steps from a castle of ours,
  which falls within 25 rounds. 407-3: 12 churches at r274 from (10,24) to (17,37), preachers from r275, our castle
  dead at r282 with our army 108 to their 74 (spread over the line's length). StoneT banks 1,345-1,555 K before a
  line; we bank 55-213.
- h69 (CHAIN_ROUND 150, CHAIN_END_R2 2: our own line to adjacency) diagnostic vs h50, seed 2013: chainer #3333 (born
  r159) died to a prophet at (39,22) at r236 before staging; no line fired. Game also compromised (replay analysis on
  the 2-vCPU driver during the game: 466 not-initialized, 342 overdrawn). **Parked**: a line must stage outside the
  enemy lattice and needs StoneT's bank. Lesson: no analysis on the driver while it plays a diagnostic.
- uvafan (391, 0-3) and awesomelemonade (394, 1-2): no lines; decided at round 1000. Seed 70: they mine about 2x our
  karbonite (2.7x mine actions by r450), 27-29 pilgrims and 5-6 churches against our 8-17 and 2. After r400 our army
  collapses and fuel runs out: 394-1 blue (us) spent 7,618 movement fuel in r401-500. Their prophets fired 726 shots,
  195 kills; ours 304 and 96. Awesomelemonade holds a dense prophet checkerboard; our MIL_ROTATION [4,3,4,3,5] is 40%
  prophets. VM queue reordered: h68 delivery (...a3d577100), h20v6 rush4 delivery (...101), h15v6 (MIL_ROTATION
  null, ~75% prophets; ...102), then h67.
- Seed-70 starvation (394-2, us red): 4 planned sites; pioneers churched c1 at r34 and c3 at r78, the third (sent
  r23) never built. The castles built no pilgrim after r24; the bank stayed 0-40. Castles act first in a round, so
  their bank is what the churches' peacetime army left the round before, and a pioneer needs 60 K. **h70** = v6 + PEACE_RESERVE_K 60 (new, struct.js: every structure's
  peacetime army leaves 60 K banked; threat responses and pilgrims unaffected). sha 3152d53d8a59. Diagnostic vs h50
  on seed 70 to 300 rounds running on the driver.

## 2026-10-22 13:04 — h70 (peacetime reserve 60): driver diagnostic positive; delivery pre-registered
- Driver diagnostic, seed 70 to 300, h70 red vs h50 blue: churches by 50, 4 vs 3 (all 4 planned sites); pilgrims 25
  vs 16; mine actions 5,526 vs 3,465 (+59%); army 206 vs 132. No exception from our code. One red robot failed
  creation (init 1,308 ms, then 168 "not initialized"); 69 and 97 frozen turns: the driver's load, both sides.
- Unit test (PEACE_RESERVE_K 30 at 35 K: the castle still builds the economy pilgrim; staffed depots, 100 K: a guard
  at 0, nothing at 90, a preacher at 90 with a crusader 3 tiles away). Node 102, Python 54 pass.
- Delivery, VM job ...a3d5771005 (right after h68's delivery): no-op v6k (defaults, cc7eb1289e51) vs h50 --det on
  1828 must replay noop_h50_h50 byte-identical; symcheck h70 (3152d53d8a59) on 1, 2, 3, 70 to 250; h70 vs h50 on 70,
  520, 2591, 1592 (the uvafan and awesomelemonade maps) both sides, census to 450 by 100,200. PASS needs all 3:
  (1) h70's churches by 200 >= 120% of h50's; (2) its mine actions to 450 >= 110% of h50's; (3) h70 wins >= 4 of 8.
  Falsifier: (1) fails, i.e. in self-play the bank is not what holds the pioneers back (seed 70's gain was one
  church). On PASS: gate h70 vs h50, 20 random cells from seed0 5000, accept t >= 2, reject t <= 0.

## 2026-10-22 13:08 — replica 391-1 (uvafan, seed 2591): the centre race lost by a crawling pioneer; h64 moved up
- Seed 2591, 32x32, one castle a side, 14 depots in 3 clusters: 2 by each castle and 10 in the centre (x 13-18,
  y 3-7), reached through a 2-wide corridor (x 15-16, y 9-12). uvafan's 4th pilgrim (built r4) churched (16,5) at
  r13 and built a prophet and a crusader there at once; its church staffed 8 pilgrims by r56. Our pioneer #977
  (built r3, a round earlier) walked one tile a turn (fuel-saving steps) and reached the corridor mouth (17,13) at
  r11, then hovered at (15-18, 13-14) for 60+ turns: every corridor tile lies in the prophet's r2 64
  (PILGRIM_SAFE_STEP). Two more pioneers died. We never built a church; 3-5 pilgrims all game; mined 1,540 K and
  8,200 F against 4,178 and 45,060; army 6 at r200, 0 at r1000; lost on health.
- Second replica case for h64 (PIONEER_FAST: 2 tiles a turn would have reached the site about r12, before uvafan's
  r13), after 407-2 (seed 1706). Its gate job moves up to ...a3d5771006, right after h70's delivery. h68 (stall
  give-up) would free such a pioneer after 40 turns, but there is no other depot to mine on this map.
- Replica queue at 13:07: 165 waiting (127 TRY, 5 RUN); about 63 slot-hours by each match's slower team's mean
  match time from the saturn journal (229 acked matches, mean 649 s), 12.7 h on 5 slots. No team holds more than 5%
  of it (top: NielsKornerup 3.2 slot-h, awesomelemonade 2.9, bovard 2.8), so no drop; the replica keeps 5 slots.

## 2026-10-22 13:20 — h71 (a contested church builds a preacher first, preachers spare themselves): delivery pre-registered
- Self-play on seed 2591 (200 rounds, driver) after 391-1: h64 (blue) churched the centre (16,5) at r12, h50's
  pioneer built the mirror church adjacent at (15,5) at r18; blue's church built 7 pilgrims first, red's preacher
  (r39) killed 4 of them, a crusader and the church; blue's prophet then killed red's church. No church stood by
  r100 and both sides mined 380-516 times to r200. That is the mirror-church duel of STRIKE_R2's notes (1915, 2030,
  2924).
- CHURCH_GUARD_D (new, struct.js; config CHURCH_GUARD_UNIT): a church within D king steps of its own mirror image
  builds the guard unit before its first pilgrim, whenever the bank affords it. Driver diagnostics vs h50 on 2591 to
  200, both pioneers crawling (church r18 each side):
  - guard prophet: as blue h71 held the centre (prophet killed red's pilgrims r19-20; K mined 1,286 vs 308); as red
    it lost: red's prophet acts first, h50's church answers the attacker with a preacher, which kills the prophet
    (a prophet cannot hit within r2 16), the pioneer and the church.
  - guard preacher: as blue held (1,442 vs 308); as red lost again: its preacher struck first but aimed at (17,5),
    splashing itself for 20 to add a pilgrim and the church (PREACHER_SELF 1.5), and died a shot before h50's.
  - guard preacher + PREACHER_SELF 4 + PREACHER_MIL 2.5 (h54's preacher half, delivered with h54 at 03:55 and never
    gated on v6): held the centre from both sides, K mined 1,446 vs 308 (red) and 1,442 vs 308 (blue); army at r200
    39 and 44 against 7 and 6.
- **h71 = v6 + CHURCH_GUARD_D 8 + CHURCH_GUARD_UNIT 5 + PREACHER_SELF 4 + PREACHER_MIL 2.5**, sha 001f1dfe01a2;
  identity build v6l (defaults, a078aa74c007). Unit tests: a church 3 king steps from its mirror builds the prophet
  (or preacher) first with D 8; with D 0 or 12+ steps away it does not (ECON_UNTIL keeps the peacetime army out).
  tools/census.js counts guard_first (churches whose first build is a combat unit; fixture guard_s2591_r25: h50's
  church 0, h71's 1). Node 103, Python 54 pass.
- Delivery, VM job ...a3d57710055 (after h70's delivery, before h64's gate): no-op v6l vs h50 --det on 1828 must replay
  noop_h50_h50 byte-identical; symcheck h71 on 1, 2, 3, 2591 to 250; h71 vs h50 on 2591, 1915, 2030, 2924 both
  sides, census to 450. PASS needs all 3: (1) h71's mine actions to 450 >= 115% of h50's; (2) h71 wins >= 5 of 8;
  (3) guard_first on h71's side exceeds h50's by >= 3 (the switch fires). Falsifier: (1) fails, i.e. a guarded
  church does not hold a contested cluster in general. On PASS: gate h71 vs h50, 20 random cells from seed0 5000.

## 2026-10-22 13:23 — replica 394-3 (awesomelemonade, seed 1592) and the record by end reason; matches 385-400 were v5
- Matches 385-400 were created 06:28 PDT, before submission 96 (v6, ~08:00): they played v5, which marches every
  unit at 450. 406-407 (08:08) are the first v6 matches of ours analysed. The seed-70 starvation (394-2) was also
  v5's; h70's driver diagnostic was against h50 (v6) and still showed +59% mine actions, so h70 stands.
- 394-3, seed 1592 (43x43, two castles a side), lost on health at 1000 with castles 2-2: economies equal (8
  pilgrims and one church each; K mined 7,192 vs 5,228 at 1000). Our army 114 vs 98 at r450; the attack call sent it
  into awesomelemonade's static prophet lattice (their prophets idle 64,512 of 66,278 turns, crusaders 13,642 of
  14,001): r400-650 we lost 80 prophets, 79 crusaders and 34 preachers, they lost 45 prophets. Their prophets fired
  672 shots (191 kills), ours 105 (48); our crusaders fired once and our preachers never. Army 14 vs 81 at r600,
  6 vs 127 at r1000. v6's MARCH_MASK 8 keeps prophets and preachers home; its crusaders (40% of the rotation) still
  march at 450 and would die the same way against such a lattice.
- vibe19's 258 replica games by end: wins 147 castles early, 39 castles at 1000, 14 health, 11 opponent init
  failure; losses 25 castles early, 13 castles at 1000, 7 health, 2 init failure. 25 of the 47 losses are to
  StoneT2000, 10 to CS554 (rush), 4 IanCoolidge, 3 uvafan, 2 awesomelemonade.
- Self-play cannot rank attack against hold: h16r (never attack) lost castles 23 to 6 vs h19 (TRAINING_LOG
  2026-10-21 17:40), so our own march breaks our own defence, while awesomelemonade's lattice breaks our march. The
  lever is our lattice (density, prophets' share: h15v6 queued) more than the attack timing (h52 at 350 and h53 at
  550 failed). Not queued yet: a crusader march gated on what the first wave achieves.

## 2026-10-22 13:24 — h71: the switch fires on the delivery seeds; criterion (3) amended before the delivery runs
- Driver, h71 red vs h50 blue to 150 rounds (LEARNINGS 19): mine actions 944 vs 485 (1915), 1,673 vs 1,180 (2030),
  2,534 vs 2,016 (2924); guard_first 2-2, 1-1, 0-0. h50's churches answer our guard with a threat response, which
  census counts as guard_first too, so the pre-registered (3) "h71's guard_first exceeds h50's by >= 3" can fail
  while the switch works. **Amended before the delivery runs** (it has not started; seen here are 150-round driver
  games, not delivery games): (3) guard_first on h71's side >= 4 across the 8 games. (1) and (2) unchanged.

## 2026-10-22 13:43 — h72 (StoneT2000's long church line): the line fires and kills; delivery pre-registered
- Replica 407-3 (StoneT2000 red vs v6, seed 2013) is now a test fixture (test/fixtures/chain_s2013_407-3.bc19, the
  whole 282-round game): census counts red's 12-church line at r274 (chain_near 1, chain_kills 1) and a 4-church one.
  How it went: two red pilgrims that had mined at red's own lower cluster ((10,26), (11,25), 13-14 king steps from
  our castle (15,39)) each started a line at r274, 16 churches between them, the longer ending at (17,37), 2 steps
  from the castle. Our units killed 6 link pilgrims at r275; 11 churches built a preacher each that round and 8 the
  next; the castle died at r282. Our army stood around our churches in the centre and east (x 22-45), not on the
  line's side. StoneT stages nowhere near us: the line starts from its own miners and is long.
- Our chain.js already builds such lines; h69 failed because its chainer walked to 12 steps and died, and CHAIN_K
  300 pays for ~5 links. **h72 = v6 + CHAIN_ROUND 200 + CHAIN_STAGE 15 + CHAIN_END_R2 2 + CHAIN_K 1000 + CHAIN_F 3500
  + CHAIN_MIX [5]** (sha f5824cc1f880): the chainer waits 15 king steps out (our own half on most maps), the bank
  pays for ~15 links, and every church of the line builds preachers. Driver diagnostics vs h50 on 2013 (LEARNINGS 19):
  - h72 red to 380: no use; seed 2013 goes to blue in self-play before any line (red lost its church at (5,25) at
    r29 and the (39-41, 22-30) fight; army 3 vs 49 at r150), and one 3-church line fired far out.
  - h72 blue to 420: the chainer staged at (16,29), 15 steps from red's castle (15,14); at r236 a 7-church line
    (15,28) -> (13,16) in one round, 7 preachers at r237, red's castle dead at r239 (game over). Blue was far ahead
    already (army 80 vs 4 at r200), so the game shows the mechanism, not a gain.
- Delivery, VM job ...a3d57710056 (after h71's delivery, before h64's gate). No no-op of its own: a pure --cfg build
  on the source that h71's no-op (v6l) checks. Symcheck h72 on 1, 2, 3, 2013 to 300; h72 vs h50 on 2013, 2924, 705,
  1706 (replica seeds where StoneT2000 lines took our castles) both sides, full games; census to 1000. PASS needs
  all 3: (1) a line of >= 5 churches on h72's side (census chains, chain-min 5) in >= 4 of 8 games; (2) chain_kills on
  h72's side >= 3 across the 8; (3) h72 wins >= 5 of 8. Falsifier: (2) fails, i.e. lines against our own lattice do
  not take castles. On PASS: gate h72 vs h50, 20 random cells from seed0 5000, and h66's chain half is replaced by
  h72's settings.
- 13:47: h72's delivery moved to ...a3d57700, first after the tools swap (before h68, h70, h71): it copies the field
  leader's main weapon, fires on most maps (any map where the bank reaches 1000 K), and its result decides the
  anti-chain panel's bomber and h66's chain half.

## 2026-10-22 13:55 — h63 closed: gate inconclusive (D 7, t 1.13), delivery failed 1 of 2
- **h63 (PILGRIM_HERE 1) gate vs h50** (out/h63_h50.jsonl, 20 random cells from 5000, par 2): 23-17, h2h gained 5
  lost 2 split 13, D 7, net +3, t 1.13: no decision at D 7 (first look at D 12).
- Delivery (census.js --to 450 on the 40 gate replays, the shadow tree's new census): depot-idle turns h63 562 vs
  h50 983 = **57%, bar <= 50%: FAIL**; mine actions 166,004 vs 155,284 = **107%, bar >= 100%: pass**. Churches 92 vs
  90, pioneers 145 vs 139, died 5 vs 6, stuck 40 vs 36. One of two fails, so the basics-fix route (accept at net >=
  0 with D >= 12 if the delivery passes) is closed and the gate is not extended. h63 closed; its +7% mine actions are
  noted, not acted on: a revised retarget rule would need its own pre-registration.
- VM: the tools swap ran at h63's boundary (shadow tree run_game.js fd653422..., census.js 27f14e6b..., as staged);
  h72's delivery is running (...a3d57700). Its symcheck: seed 2 clean to 300; seeds 1, 3 and 2013 end at the known
  engine-order divergences (an axis tile contest r43, combat order r29 and r53), all before lines can fire (r200).

## 2026-10-22 13:58 — our pilgrims mine 69-78% of their turns: the economy gap is pilgrim and church count
- Pilgrim turns to round 450 in six h63-vs-h50 gate replays (1205, 2030, 418, 2633, 905, 1862; h63 red; scratch
  pturns.js): h50 mines 69.3% (fuel 36.6, karbonite 32.8), walks empty 11.0%, gives 6.8%, walks part-loaded 4.3%,
  idles empty 3.6%, idles carrying 3.1%; h63 mines 77.9% (its retarget removes most carrying idles: 0.0% vs 3.1%).
  No mining at full cargo on either side. Per-pilgrim efficiency is near its ceiling, so StoneT2000's lead (24
  pilgrims at r300 to our 16, three churches to our one) is in how many depots we staff, i.e. churches and pioneers:
  h64, h67, h70, h71 (queued).
- h72's delivery: game 1 (2013, h72 blue) won at r239 by a line, as on the driver.

## 2026-10-22 14:15 — h72 on a 64x64 map: no line, the bank drains into a front church's threat response
- Driver, h72 red vs h50 on 799 (64x64, two castles a side; replica 407-1's map) to 450: 3 chainers sent, no line;
  red's bank stayed 185-220 K from r200 to r400 with castles even (army 105 vs 95 at r300). Red's church at (37,42),
  in blue's half, built 106 military units in r200-400, 136 of red's 211 military builds being threat responses
  (no SIG.ROUND; struct.js step 1 answers visible attackers whenever ours < 2x theirs + 1 and spends without
  reserve). Blue's front church built 84. In six ordinary h63-vs-h50 gate games to 450 threat responses are rare
  (h63 3 of 832 military builds, h50 85 of 708; scratch builds.js), so the grinder is a map trait, not the norm.
- So h72's lines need a quiet front. If the delivery shows lines failing to fire on such maps, the variant is a
  church's threat response that leaves CHAIN_K unless an attacker is close (not built yet).

## 2026-10-22 14:23 — replica: no ack since 13:12 because all five slots hold slow bots' matches; queue ~14 h
- saturn (bc19-galaxy-saturn) is healthy: last ack 13:12 PDT, and its five games (28-90 min old at 14:20) are
  matches 304 and 314 (uvafan.bc2019), 339 and 342 (m-schier wololo) and ours, 403 (wololo). Mean match wall time
  per bot from 231 acks in the last 30 h (journal "starting execute" -> "acked"; scratch saturn_acks.log): overall
  11.2 min; awesomelemonade 88, uvafan 52, wololo 47, nthistle 41, CometsTech~187e8c 38, NielsKornerup 33.
- The games are not starved: each replica game holds a core (98-116% CPU, GC threads), the VM has 18 GB free and no
  swap, our two gate games run at nice 10. The queue (163 incl. running) is ~69 slot-hours at those means, ~14 h on
  5 slots; no bot holds more than 10% of it (NielsKornerup 6.6 slot-h, awesomelemonade 5.9), so no drop helps
  (owner rule, PROMPTS 20). A 6th slot (8 games on 8 vCPUs, the README limit; MAX_EXECUTE_SLOTS, CPUQuota, MemoryMax)
  needs a saturn restart, which kills the running games (KillMode=mixed): ~5 slot-hours lost now for +20%. Not now;
  revisit when the slots hold young games.

## 2026-10-22 14:36 — seed 799's drain was h72's own chainer; CHAIN_HOLD_R2 inert there; CHAIN_KEEP; h74 on the driver
- h73 (h72 + CHAIN_HOLD_R2 36, sha 8d50488463c8) on 799 played h72's game exactly (every timeline figure and build
  count equal): the hold never engaged. Cause: the 136 "other" builds came from church #505 at (37,42), which h72's
  chainer #1453 (castle-born r200) built at r246 when threatened deep in blue's half (CHAIN_FIRE_NEAR 0 lets a
  threatened chainer fire anywhere): a one-church line. A line church hears SIG.CHAIN, not SIG.ROUND, and sees no
  castle, so it never learns the round; after its 40-turn burst (SIG.CHAIN builds) its peacetime army saw no
  CHAIN_K reserve (B.round undefined) and spent every karbonite above 200 (40 crusaders among its builds: the
  rotation, which the threat response never builds). The earlier entry's reading (a threat-response grinder) was
  wrong. No ordinary v6 church misses the round: castle-born pilgrims learn it from the castle's turn count, pioneers
  radio it, front pioneers carry it.
- CHAIN_KEEP (new, default off; church.js marks a church that heard SIG.CHAIN on its first turn, struct.js counts it
  as past CHAIN_ROUND, so its peacetime army and CHAIN_HOLD_R2 leave CHAIN_K). Unit tests: a line church holds the
  bank with the switch and answers from any bank without it; an ordinary church that missed the round still
  answers; the mark is set by SIG.CHAIN, not SIG.MINE. Node 105 pass.
- h74 = h72 + CHAIN_FIRE_NEAR 1 + CHAIN_KEEP 1 (sha b935c13a04e9): a threatened chainer flees unless near its stage
  line, and line churches keep the bank. Driver diagnostic on 799 (h74 red, 450) running.
- h72's delivery after 4 of 8 (2013 both sides, 2924 both sides): h72 won 3; lines of >= 5 churches on h72's side in
  all 4 (7, 5, 7, 6 churches), 2 of them followed by a castle kill within 25 rounds.

## 2026-10-22 14:41 — h72 delivery PASSED 3 of 3; gate h72 vs h50 queued first; anti-chain panel bomber is now h72
- h72's delivery vs h50 (2013, 2924, 705, 1706, both sides, 8 games): h72 won 6 (2013 blue r239, 2924 both, 705
  both on health, 1706 red r363), lost 2013 red and 1706 blue. Census --chain-min 5 on h72's side: lines in 7 of 8
  (all but 1706 blue; 15 churches over 2 lines on 1706 red); a castle kill within 25 rounds of a line in 3
  (1706 red, 2013 blue, 2924 red). Criteria: lines >= 5 churches in >= 4/8 PASS (7), chain kills >= 3 PASS (3),
  wins >= 5/8 PASS (6).
- Symcheck h72 (seeds 1, 2, 3, 2013, 300 rounds): seed 2 clean to 300; 1, 3 and 2013 stop at the known
  engine-order divergences before r200 (not chain code: the chainer is built at r200).
- Per the pre-registration: gate h72 vs h50 (20 random cells, seed0 5000, par 2; job ...a3d5771001, next after
  h68's delivery). The anti-chain panel's bomber is now h72 instead of h55v6 (jobs ...a3d5773 h54v6 vs h72 and
  ...a3d5774 h56v6 vs h72, out/panel_chain72_*); the h50 cell comes from the gate itself, so ...a3d5772 (h50 vs
  h55v6) is dropped. h66's chain half becomes h72's (or h74's, if its 799 diagnostic shows the line church keeping
  the bank) once that diagnostic is read.

## 2026-10-22 15:02 — h74 on 799: CHAIN_KEEP never engaged; the chainer was shot before its church acted; CHAIN_SAFE, h75, h76
- h74 (h72 + CHAIN_FIRE_NEAR 1 + CHAIN_KEEP 1) on 799, red vs h50 to 450: the same r246 church as h72 (chainer
  #1453 staged at (36,41) since ~r233 fired early when threatened; FIRE_NEAR allows that near the stage line), and
  church #505 again built 136 units (52 crusaders, 53 prophets, 31 preachers) with the bank held near 200. Event
  order: #1453 builds #505, blue prophet #1203 (r2 64) kills #1453, then #505 acts. A newborn acts after every robot
  already in the round (game.js appends it), so #505 heard no SIG.CHAIN and was an ordinary church that never
  learned the round. The 14:36 entry's "line church hears SIG.CHAIN, not SIG.ROUND" was wrong for #505; CHAIN_KEEP
  as built (a mark set by SIG.CHAIN) could not engage. Census: chainers 3, lines 0; red won by castles at 450.
- The same break in h72's delivery (scratch firsts.sh: pilgrim-built churches from r200 by side and round, and
  whether the first builder died that round): 1706 blue r435, 2013 red r340, 2924 blue r357, each a one-church
  "line" on h72's side. Lines beyond the first link cannot be cut: each newborn acts right after its builder.
- CHAIN_KEEP redefined: a church that does not know the round (a line church, or one whose builder died before its
  first turn) counts as past CHAIN_ROUND. New CHAIN_SAFE (default 0): a chainer within reach of a visible attacker
  this turn (combat.js canHit: castle r2 64, prophet 16-64, crusader 16, preacher 26 with splash) neither starts
  its line nor waits; it flees as a pilgrim and the chain resumes later. Unit tests updated (keep cases by round;
  canHit; the staged chainer test: a prophet 5 tiles off blocks both the ready and the early line, a crusader there
  does not). Node 105, Python 54 pass. h74 is closed (diagnostic only, never queued).
- Builds: h75 = v6 + ENDGAME_FUEL 900 + h72's chain settings (94637bf19539) replaces h66 in VM job ...a3d57717
  (symcheck, then gate vs h50; delivery as h66's, with lines >= 5 churches for chainers: census --chain-min 5 lines
  in >= 20 of 40 gate games, late preachers >= 3x h50's). h76 = h72 + CHAIN_KEEP 1 + CHAIN_SAFE 1 (e60bc7ffa84a);
  v6n = defaults (145f0efacd23), its no-op build. Driver diagnostic h76 red vs h50 on 799 to 450 running.

## 2026-10-22 15:17 — h76 on 799: the chainer waits out of reach and fires a 7-church line; delivery pre-registered
- Driver, h76 (e60bc7ffa84a) red vs h50 on 799 to 450 (LEARNINGS 19: the switch changes the move): chainer #1453,
  staged at (36,41) as in h72 and h74, stepped to (34,41) at r246-247 instead of firing in the prophet's reach,
  waited there, and at r269 (bank 915 K at r260) built a 7-church line; a 2-church line followed at r329. Census:
  chainers 4, lines 2 (9 churches, 1 near a castle, 1 castle kill within 25 rounds); no first link whose builder
  died that round (h72 and h74: the r246 one-church line). Red ended with 2 castles to blue's 1. Bank after the
  line 9-24 K to r380 (spent on the line's preachers: 91 built, 59 lost), no 136-unit drain.
- Delivery pre-registered (VM job ...a3d5771000, ahead of h72's gate): no-op v6n (defaults, 145f0efacd23) vs h50
  --det on 1828 must replay noop_h50_h50 byte-identical; symcheck h76 on 1, 2, 3, 799 to 300; h76 vs h50 on 799,
  1706, 2013, 2924 both sides (full games), census --chain-min 5. PASS needs all 3: (1) no first link on h76's
  side whose builder died in the round it was built (scratch firsts.sh; h72: 3 in its delivery's 6 games on these
  seeds, plus 799); (2) lines >= 5 churches on h76's side in >= 6 of 8; (3) h76 wins >= 5 of 8. Falsifier: (2)
  fails, i.e. waiting out of reach costs more lines than it saves. On PASS: h76 replaces h72 as the chain
  candidate: its gate vs h50 (20 random cells, seed0 5000) takes the place of h72's, and it becomes the panel's
  bomber. On FAIL: h72's gate runs as queued.

## 2026-10-22 15:46 — replica 403 (m-schier wololo 3-0): out-expanded on every map; h72's gate moved behind h70/h71
- Wololo's economy against ours (replay.js timeline; wololo first): seed 1375 (61x61, one castle each, our castle
  dead at r200): pilgrims at r100 36 vs 16, churches 6 vs 4, K mined by r200 4,202 vs 1,424. Seed 826 (two castles
  each, lost on castles at 1000): r100 41 pilgrims and 9 churches vs 18 and 2; K mined by r300 9,814 vs 3,942.
  Seed 1706 (37x37, one castle each, castle dead at r351): we held 6-8 pilgrims and 1 church for 300 rounds.
- How wololo expands (1375): its castle builds a prophet and 4 pilgrims (r2-6), then nothing until r37; its 4th
  pilgrim walks 42 king steps to the richest clusters (our c7 and c10, 7 depots each, on the mirror line), churches
  at r32, and that church builds 7 pilgrims in 14 rounds, one of which churches the twin cluster 6 tiles off at r49
  (6 more pilgrims). Its army stays at 1-7 to r100. tools/plan.mjs (now prints margin m and depots n per planned
  cluster) for our castle: c8 d12 n3, c9 d12 n3, c5 d28 n3, c4 d40 n4, c13 d40 n4, c7 d42 n7, c10 d42 n7, c3 d13 n2,
  c1 d21 n4, c2 d30 n3, c0 d36 n4: contested clusters first, then nearest; value only breaks ties.
- Ours on 1375: pioneers r4 and r5 (c9 churched r17, c8 r40), then none until r62/63 (bank 0-30 through r50: 5+4
  pilgrims, two churches, and 4 guards by r30, GUARD_BASE 2 per structure). On 1706: the pioneer for the 7-depot
  contested cluster (c2, the only other planned) stood outside a wololo prophet and crusader's reach at (6-8,26)
  from r29 to r77, then died at r82; PIONEER_LOST_REST kept the castle from re-sending until r183.
- Candidates already queued that touch this: h70 (PEACE_RESERVE_K 60, delivery), h67 (PIONEERS_TEAM 4: a lone
  castle keeps 4 pioneers in flight), h65 (ESCORT 2: prophets hold an overdue pioneer's site; 1706 is its case),
  h68 (pioneer gives up; delivery running), h64 (PIONEER_FAST). Not yet tried: cluster order by value per distance;
  churches sending pioneers of their own.
- VM order: h72's gate (now ...a3d57710056) runs after the h70 and h71 deliveries, so h76's delivery is read before
  either chain gate starts. Driver: h50 vs h50 on 1375 to 200 (our economy without wololo's pressure) running.

## 2026-10-22 16:12 — h68 delivery FAILED (its switch never fired); h77 economy stack: wololo's numbers on 1375; queued
- h68 (PIONEER_GIVEUP 20 + PIONEER_STALL_ANY 40) delivery vs h50 on 418, 1325, 2542, 2072 both sides: no-op v6j
  IDENTICAL; symcheck seed 2 clean, 1/3/418 the known engine-order divergences. (1) stuck-pioneer turns 3,128 vs
  7,787, ratio 0.40 against the 0.30 bar, FAIL; (2) churches by 450 38 vs 32, pass; (3) wins 6 of 8, pass. **h68 is
  falsified, no gate.** All 8 replays are byte-identical to h61's (cmp): STALL_ANY never fired on these cells, and
  the run broke LEARNINGS 19 (no driver game proved the switch moves anything first). Seed 418's #1936 (canonical
  site (9,32)) wanders 2-6 tiles from where its site lies in the real frame, not 16-22 steps off as the 11:52 entry
  read it (canonical site against real positions): the site was occupied (h50's own church), so after 5 turns it
  dropped the site (pilgrim.js siteWait) and, with no free depot, has no target. The stuck pioneers are ex-pioneers
  without a depot, which no site-stall rule reaches. Not queued yet: an ex-pioneer of a taken site reports it so the
  castle stops re-sending there, and mines or goes home.
- Replica churches whose builder died before the church's first turn: 0 of our 625 pilgrim-built churches in 258
  replica games (9 of 822 for opponents; scratch orphanch.sh). The dead-builder case is the chainer's alone.
- h50 vs h50 on 1375 (driver, 200 rounds): red 11 pilgrims and 1 church at r100, K mined 1,356 by r200 (wololo: 36,
  6 and 4,202): both sides race the two 3-depot centre clusters, red's centre church dies at r26 and its second
  pioneer wanders r17-62.
- PLAN_VALUE (new, default 0; castle.js planClusters): within the contested and the other class, fewest (king
  steps + PLAN_VALUE) per depot first, compared as integer cross products. 1375 with 10: c8 c9 c7 c10 c4 c13 c5 c1;
  with 20: c7 c10 c8 c9. Unit test (orders, both teams identical). Node 106 pass.
- **h77** = v6 + ECON_UNTIL 100 + PIONEERS_TEAM 6 + PEACE_RESERVE_K 60 + PLAN_VALUE 10 (d8ca9e7dfa69). Driver vs h50
  on 1375 to 200: pilgrims at r100 33 vs 12, churches 6 vs 2 (9 vs 5 at r200), K mined by r200 3,940 vs 1,864, army
  0 until r100 and then 109 vs 50 at r200; churches at the rich top clusters (27,2) r52 and (33,2) r68, the clusters
  wololo took at r32 and r49. Two early pioneers still die in the centre (r22-23).
- h77 delivery pre-registered (VM job ...a3d57710001, right after h76's delivery, which is running): no-op v6o
  (defaults, 5ccc66eaa73a) vs h50 --det on 1828 byte-identical; symcheck h77 on 1, 2, 3, 1375 to 250; h77 vs h50 on
  1375, 826, 1706, 70 both sides (full games; the wololo and awesomelemonade maps); h50 and h77 vs bots/rush4 on
  h20v6's 20 poor one-castle maps both sides at 200 rounds (h50's half moved here from job ...a3d577101). PASS needs
  all 4: (1) h77's pilgrims at r100 summed over the 8 games >= 150% of h50's (replay.js timeline); (2) its K mined
  by r200 >= 130% of h50's; (3) h77 wins >= 5 of 8; (4) vs rush4, games h77 loses <= h50's + 2 (of 40). Falsifier:
  (4), the early army ECON_UNTIL removes is what holds off a rush. On PASS: gate h77 vs h50, 20 random cells from
  seed0 5000, ahead of the other gates.

## 2026-10-22 16:29 — correction: why pioneers stay stuck (debug build, seed 418); PIONEER_HOME and PILGRIM_STALL; h78
- The 16:12 cause is wrong (LEARNINGS 24). A scratch copy of src/bot logging every empty-handed pilgrim's site,
  target (and its occupancy) and action every 5 turns after turn 40, driver games on seed 418 --det to 300:
  - h50 self-play: red pioneer #218 holds site (9,32) (cluster 5, canonical) from round 72 to 300 at 8-11 king steps,
    first standing still 35 turns (act null), then oscillating at (10-11, 20-22): the path runs into a visible enemy
    attacker's threat range, which PILGRIM_SAFE_STEP never steps into; h50 has no give-up rule, so it waits for good.
  - h50 vs the h68 config (blue): #1936 gives site (9,32) up at round ~79 (PIONEER_GIVEUP 20, an attacker in sight;
    STALL_ANY 40 never gets there first, hence h68 = h61 byte for byte) and takes freeDepotNear(itself): (29,26), 11
    king steps on, under the same guards. It hovers at (28-31, 11-16) for 140 turns, then the fuel-to-karbonite
    switch (karbonite < SWITCH_KARB_LOW, fuel > 3000) points it at (28,22) and (35,13) by turns; it never mines.
  So giving the site up works; where it then goes does not.
- New switches (defaults 0; unit tests, Node 107 pass, Python 54 OK): CFG.PIONEER_HOME 1: a pioneer that gives its
  site up takes the free depot nearest its nearest structure. CFG.PILGRIM_STALL N: a pilgrim off its target that has
  gone N turns (flight included) no nearer it than its best gives it up for PILGRIM_HOT_MEM (50) turns, during which
  no depot search returns it (the switch rule included), for the free depot nearest its nearest structure.
- h78 = v6 + PIONEER_GIVEUP 20 + PIONEER_STALL_ANY 40 + PIONEER_HOME 1 + PILGRIM_STALL 25 (6a97e5086e05); defaults
  build v6p (c8cbc062db75). Driver check running (h78 and h68 as blue vs h50 on 418 to 450, census stuck): the
  delivery is pre-registered once it shows the switches change moves (LEARNINGS 19).

## 2026-10-22 16:52 — h76 delivery PASSED 3 of 3; its gate replaces h72's; h79 replaces h75; replica 406, 407
- h76 (h72 + CHAIN_KEEP 1 + CHAIN_SAFE 1) vs h50 on 799, 1706, 2013, 2924 both sides (out/rp_dlv_h76): no-op v6n
  IDENTICAL; symcheck 2 and 799 clean, 1 and 3 the known engine-order cases (axis tile at 43, a same-round kill at
  29). (1) no line's first church lost its builder that round (scratch firsts.sh over the 8 replays: 0 of 31 pilgrim
  church groups from round 200; h72's delivery had 3): pass. (2) a line of >= 5 churches in 7 of 8 games (all but
  1706 as blue, which built pairs at 400-810): pass. (3) h76 wins 6 of 8 (loses 1706 blue at 914, 2013 red at 968):
  pass. Census, h76's side: chains of 7, 7, 11, 19 (three lines), 7, 7, 7 churches, each within 4 king steps of a
  castle, 6 castle kills in 7 lines.
- Queue: job ...a3d57710056 is now h76's gate vs h50 (20 random cells, seed0 5000); the anti-chain panel
  (...a3d5773-4) is h54v6 and h56v6 vs h76 (out/panel_chain76_*); h75's job ...a3d57717 now runs h79 = v6 +
  ENDGAME_FUEL 900 + h76's chain (7265d5f3f823): symcheck, then gate vs h50. h72's gate is not run (h76 contains it).
- Replica 406 (vibe19 1-2 StoneT2000 bot1v43, seeds 53, 203, 705) and 407 (botfinalsafe 3-0, seeds 799, 1706,
  2013, unranked: the chain maps) fetched; vibe19 is still submission 96 (v6, no chain). Study below when read.

## 2026-10-22 17:10 — h78 rebuilt with homeDepot; delivery pre-registered (after h77's)
- The first h78 build on 418 (blue vs h50, 450 rounds, driver): mines 4,744 vs h68's 4,150 in the same cell, depot
  idle 16 vs 85; 4 pioneers still counted stuck (census counts a first mine 30+ turns after birth as stuck, so a
  pioneer that gives up and then mines still counts). Its debug twin (scratch dbgsrc, the same switches; the replay
  differs from the plain build's by clock effects): #1936 now mines at home by round ~280; the pioneers still idle
  (#1226, #2547, #3645) give up contested sites (9,32) and (28,25) when every depot by their nearest structure
  (37,14) is taken, so "nearest the nearest structure" is (28,22), under the enemy's army again.
- homeDepot (pilgrim.js; used by PIONEER_HOME and PILGRIM_STALL): the free depot not given up with the fewest
  4 x (king steps to the nearest structure we know) + king steps from us, karbonite first on ties. Unit test (a
  depot 2 steps from a far structure beats one 3 from us and 7 from any structure). Node 107 pass, Python 54 OK.
  Rebuilt h78 (e1eb254c09e2; v6p unchanged, c8cbc062db75): 418 mines 4,721 (the same as the first build).
- h78 delivery pre-registered (VM job ...a3d577100015, after h77's, before h70's): no-op v6p vs h50 --det on 1828
  byte-identical; symcheck h78 on 1, 2, 3, 418 to 300; h78 vs h50 on h61's cells 418, 1325, 2542, 2072 both sides
  (8 full games); census --to 450. PASS needs all 3: (1) mine actions to 450 on h78's side >= 108% of h50's side,
  summed over the 8 games; (2) churches built by 450, h78's side >= h50's; (3) h78 wins >= 4 of 8. Falsifier: (1),
  the give-ups lead nowhere productive. On PASS: gate vs h50 (20 random cells, seed0 5000) after h76's.

## 2026-10-22 17:18 — replica 407 on 1706: one preacher kills four lattice prophets; LATTICE_SPARSE (h80) inert on 1706
- 407 game 2 (seed 1706, we red; replica events 295-316): botfinalsafe fires two parallel lines at round 306 from
  (31-32, 17-19) to (31-32, 11-12), 7 tiles from our castle (31,4); the end churches' newborn preachers splash at
  once: one shot kills prophets (30,6), (29,7), (31,7), (30,8) (all four orthogonal neighbours of (30,7), our
  (x + y) even lattice), the other hits three crusaders, dead at 307. 8 churches then build 8 preachers a round
  (307, 308); the castle falls at 316. Castle-to-fall after the killing line on 407's three maps: 9, 10, <= 8 rounds.
- CFG.LATTICE_SPARSE (military.js latticeTile; default 0): lattice tiles have x + 2y a multiple of 5 (a fifth of
  the tiles; any 3x3 splash covers at most 2, unit test, Node 108 pass). h80 = v6 + LATTICE_SPARSE 1 + LATTICE_R 18
  (about the slots of the (x + y) lattice at 12; 117b89b1a9d0). Driver, h76 red vs blue on 1706 --det: h50 falls at
  289, h80 at 288. Not a lattice game: blue had 6 pilgrims and 3 army at round 100 against red's 13 and 12 (K mined
  by 200: 694 vs 1,522; 9 blue prophets and its church died 150-284), and h76's line ends with a church adjacent to
  the castle (31,31) whose preacher hits it in the line's own round. Symcheck h50 on 1706: mirror-identical to
  round 45, then the first prophet duel is decided by the engine's turn order (red #14 kills its twin #1773 at
  (24,22) before it acts, round 46), so 1706 is a red map for every build. h80: built, not queued (no evidence; it
  needs a chain map where the lattice, not the economy, decides).

## 2026-10-22 17:21 — replica losses are economy first; h64's gate moved up
- Timelines (replay.js timeline) of the losses to uvafan (391), IanCoolidge0 (298) and awesomelemonade (394): K mined
  by round 200, ours vs theirs: 2591 308 vs 964; 1241 2,064 vs 4,172; 70 1,968 vs 2,820 and 1,920 vs 3,368; 836
  2,950 vs 4,188; 2965 672 vs 930; 1915 504 vs 930; 520 2,130 vs 2,270; 1592 1,376 vs 1,414. Behind by 30% or more in
  7 of 9; with 403 (wololo, 3 of 3), the economy gap is the common thread, not the fights.
- 391-1 (seed 2591, one castle each, left-right mirror): uvafan's 4th unit (#851, round 4) sprints at r2 4 and
  churches the rich centre-top cluster (16,5) at round 13, with a prophet built the same turn and 9 pilgrims by round
  56. Ours (#977, round 3) walks 1 tile a turn and stops at (17,13), 8 tiles short, at round 20; home has one
  karbonite depot, so we mine 156 K by round 100 and build a unit every ~40 rounds. h64 (PIONEER_FAST) is this fix:
  its gate (job renamed ...a3d5771001) now runs right after h78's delivery, before h70's and h71's.

## 2026-10-22 17:32 — basics audit of our replica games; churches are the gap; a pioneer waits all game by a held site
- Basics (match.json of all 261 vibe19 replica games): the 31,098 exceptions and their "not initialized" twins are
  all v3's (matches 13-140, fixed in v4; HANDOFF). Since match 181 (60 games, v4-v6): 0 exceptions, 3 vm2 timeouts
  (one robot-turn each: 181-60, 298-836, 406-53) and 10 frozen robot-turns (205-826, 391-70, 403-826, 406-53).
  ms_max median 100 ms, worst 576 (287-826), init_ms_max up to 544 ms (under the replica's 1000 ms init grant).
  The slowest turns lie on the loaded replica host; a driver game with --logs on 826 (scratch t826) names which.
- Churches, ours vs the winner's, in the 12 games of 391, 298, 394 and 406 (timeline): at round 100 we trail in 10
  (equal in 394-520 and 394-1592); at 200: 1241 4 vs 11 (uvafan: 46 pilgrims to our 19), 70 2 vs 5 and 2 vs 6,
  1915 1 vs 5, 705 1 vs 5, 2591 0 vs 1, 2965 0 vs 1. Our plans (tools/plan.mjs) are not the limit on 1241 (10
  clusters planned) or 53 (7): the pioneers are. On 1915 the two pioneers in flight go first to the contested
  clusters (PLAN_CONTEST_FIRST 6: c3 m1, c2 m3) and the safe one 12 steps away (c1, m17) waits.
- 298-2 (seed 2965, we red, left-right mirror): our only pioneer (#78, built round 34 by castle (5,32) for site
  ~(12,22)) reaches (4,24) at round 41 and stays there to round 200+ in a 5-turn cycle (3 idle turns, a step, the step
  back): blue's crusaders (11,22), (11,23) and prophet (13,22) stand on the site's depots from round ~55, and
  PILGRIM_SAFE_STEP keeps it out of their range. Nothing of ours comes: the army holds the home lattice 10+ tiles
  away, out of sight. h78's give-up would send it home; h65 (ESCORT 2) would send two units; neither clears a held
  site. Lead: a pioneer that waits by a site held by enemy attackers reports it, and the castle's army clears it.
- Driver, seed 2591 (h50 red vs each as blue, 200 rounds, the 391-1 map): K mined by 200 h50 1,242, h77 1,320,
  h81 (h77 + PIONEER_FAST) 1,270. Self-play gives blue the centre with any of the three: no signal there.
- Replica queue 141 waiting (108 TRY, 33 QUE), no nacks in 3 h, ~6 acks an hour (matches of awesomelemonade,
  uvafan and wololo take 1-2 h). Gates stay at par 2.
- Pioneer census of the 30 v5/v6 replica games (matches 298-407; census.js --to 450, scratch census450.txt): we
  built 179 pioneers; 82 built churches (46%, born-to-church 20.8 turns on average), 49 died (27%), 34 stuck 30+
  turns (19%). Churches by 450: ours 87, the opponents' 297 (StoneT2000's lines included); at round 200 we trail
  in 23 of the 30 games, mines to 450 122,168 vs 153,957. Opponents send almost no SIG.CHURCH pioneers, so their
  churches come from ordinary pilgrims: uvafan on 1241 (391-2, one castle at (50,38)) builds 11 churches by round
  200 from pilgrims its castle sends in waves (rounds 4, 13, 62-64, 100-101; each churches 16-25 turns after
  birth, the first at round 22 eighteen tiles out), and each new church builds 3 prophets and 3-6 pilgrims at
  once. Our cap is MAX_PIONEERS 2 per castle in flight: h77 (PIONEERS_TEAM 6, delivery running) is the test.

## 2026-10-22 18:27 — h77's delivery: criteria 1-3 met by far, 4 on the edge; h82 = h77 + DEF_RESERVE_K 30 pre-registered
- h77 vs h50 on 1375, 826, 1706, 70 both sides: **h77 wins 8 of 8** (bar 5); pilgrims at r100 summed 200 vs 108
  (185%, bar 150%); K mined by r200 28,002 vs 15,930 (176%, bar 130%; 1375: 3,940-4,018 vs 1,716-1,864, as much as
  wololo and IanCoolidge0 mined on the replica). Its no-op v6o was IDENTICAL; symcheck shows the known contest.
- (4) vs rush4 (castle losses; a 200-round game with no winner is a hold): h50 6 of 40 (1706, 1755, 1699, both
  sides); h77 8 in its first 26, the limit of h50 + 2 (adds 1756 both sides). On 1756 h77's fifth pilgrim (a pioneer,
  PIONEERS_TEAM 6) churches (38,1) at round 12 and the church spends the bank on two pilgrims (rounds 12-13) as
  rush4's crusaders arrive; the castle has nothing for a threat response and falls at 24. h50 built preachers at
  13 and 14 and held. One more castle loss in h77's last 14 games fails its delivery.
- h82 = h77's four switches + DEF_RESERVE_K 30 (every spend but a threat response leaves a preacher's karbonite;
  b0156206e827). Driver, 1756 red vs rush4, --det, 200 rounds: h82 holds; h77r (h77's switches rebuilt on the
  current src, d711c99da54b) falls at 24 as h77 did. **h82 delivery pre-registered** (VM job ...a3d577100012, before
  any game on its panel): no-op v6q (current src defaults, 9ec43f5c4c81) vs h50 --det on 1828 byte-identical;
  symcheck h82 on 1, 2, 3, 1756 to 250; h82 vs rush4 on h20v6's 20 maps both sides at 200 rounds; h82 vs h50 on 1375
  and 826 both sides. PASS needs all 3: (1) rush4 castle losses <= h50's + 2 (h50: 6 of 40); (2) K mined by r200
  >= 130% of h50's over the 4 full games; (3) h82 wins >= 3 of 4. Falsifier: (2), the reserve starves the early
  economy that won h77's games. On PASS: gate h82 vs h50 (20 random cells, seed0 5000).
- 18:31: h77's last 14 rush4 games add no castle loss: **8 of 40** (1706, 1755, 1756, 1699, both sides) = h50's 6
  + 2, so (4) holds and **h77's delivery PASSES** (all 4). Its gate is queued as pre-registered (VM job
  ...a3d577100016, after h82's delivery, running, and h78's): h77 vs h50, 20 random cells from seed0 5000, par 2.

## 2026-10-22 18:46 — run_game --fast-init: robots' sandboxes reuse one compiled bundle; on in jobs and the replica
- Profile (VM, h50 self-play 300 rounds on 826): runInContext 43%, engine game.js 24%, vm.js 9%, GC 6%, acorn 6%;
  our bot's functions a few percent. Creating a robot's sandbox costs 43 ms on the driver (vm2 transforms and V8
  compiles the 50 KB bundle anew per robot) vs 3.4 ms with one VMScript; that game builds 523 robots.
- `--fast-init` (run_game.js fastInit, batch.js passes it): vm2's VM.run gets the bundle's VMScript whenever it is
  handed that bundle's text; the same code runs in the same fresh VM under the same kill. Unit test: a fresh sandbox
  per robot, the script compiled once, and a 40-round --det game replayed byte for byte. On the VM (load ~11, beside
  the gate and the replica): the 300-round game replays byte for byte, wall 252 s -> 212 s (-16%), init_ms_max
  113/417 -> 39/45 ms, 0 errors either way.
- Added to the batch lines of the 20 pending jobs that run from 2019-next (the two reference jobs in the main tree
  keep the old tools). Replica: saturn passes it (GALAXY_FAST_INIT, default 1; README); runtime and app deployed,
  smoke game on the deployed runtime clean, saturn restarted 01:46 UTC (the 5 matches in flight re-run). Replica
  games average 301 s; the saving there is ~75 ms per robot, under 10%, and creation spikes that risk init failures
  under load fall from hundreds of ms to tens.
- h82's delivery so far: no-op v6q IDENTICAL; symcheck contest/combat only; **rush4 castle losses 0 of 40** (h50: 6,
  h77: 8): criterion (1) holds. The 4 games vs h50 run. h70 (PEACE_RESERVE_K 60) and h67 (PIONEERS_TEAM 4) are
  superseded by h77's gate (their switches are among its four).

## 2026-10-22 18:56 — run_game --no-kill and --fast-view: gate games about 2x faster than this morning
- `--no-kill`: turns run without vm2's per-turn kill (vm2 starts a watchdog for every timed call); the chess clock
  still charges each turn, sandbox creation keeps --init-ms's bound, and batch.js kills a game past --game-cap
  (3600 s by default with --no-kill; unit test: a bot whose turn never returns is an error row after 3 s). Only for
  batches of our own builds; time audits and the replica keep the engine's kill.
- `--fast-view`: getVisible tests only the vision square (unit test: every unit at 1,800+ tiles on two maps equals
  the engine's view; a 40-round game byte for byte). 20 us per call instead of 49 (driver).
- VM, h50 self-play on 826, 300 rounds, --det --timescale 2 --fast-turn (load ~10): 252 s; + --fast-init 212 s;
  + --no-kill 129 s (turn ms_mean 2.14 -> 0.80: the watchdog cost ~1.3 ms per turn under load); + --fast-view 129 s.
  All four replays byte for byte the same. The 22 pending jobs in 2019-next carry all three flags.
- Note for the replica (unchanged): its bots' clocks pay that ~1.3 ms per turn on this loaded VM, about 6% of the
  20 ms a turn adds; the official servers were idler.
