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
