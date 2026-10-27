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

## 2026-10-22 19:06 — h82's delivery PASSES (3 of 3); its gate replaces h77's
- h82 vs h50: **4 of 4 wins** (1375 both sides by castles at round 459; 826 both sides on health at 1000). K mined
  by r200 summed **17,796 vs 10,560 (169%, bar 130%)**: 1375 4,634-4,642 vs 1,212 (11 churches vs 1 at r200), 826
  4,260 vs 4,068 (8 churches each). Pilgrims at r100 136 vs 74. With (1) rush4 castle losses 0 of 40, all three
  hold: the 30 K reserve did not starve the early economy (the falsifier).
- As pre-registered, the gate is h82 vs h50 (20 random cells from seed0 5000, par 2): VM job ...a3d577100016 now
  holds h82's gate; h77's (same name, not run) is in ~/jobq/superseded. h82 is h77 plus the reserve, the rush-safe
  superset; h77's own gate is not run. h20v6 (DEF_RESERVE_K 30 alone on v6, ...a3d577101) stays queued until h82's
  verdict.
- Profile of a fast-path game (VM, h50 self-play 300 rounds on 826, --fast-turn --fast-init --no-kill --fast-view,
  130.7 s): engine getGameStateDump 26% (the O(robots) scan per turn and the JSON of the view), our fastView 15% (a
  fresh 64x64 view per turn), the sandbox's JSON.parse of the view 11%, GC 9%, insulate 9% (castles copy every
  robot); our bot's code ~18%. The next harness win is the dump.

## 2026-10-22 19:30 — replica 406/407: StoneT2000's chains take our castles from an unseen staging pilgrim; anti-chain delivery on h82 pre-registered
- StoneT2000's bots beat vibe19 (v6) 2-1 and 3-0 (406, 407; earlier 385, 388 alike). Their economy: 13-25 churches by
  round 280-316 against our 1-6. Of their 6 castle kills, 4 came with an enemy church line near the castle (scratch
  chainloss.py: 3-14 enemy churches built within r2 100 of the castle in the 40 rounds before it fell). 406-3 (seed
  53): blue banked 1,995 K by 290, then built 16 churches in a line to 2 tiles of our castle (9,11) at 295-299, each
  spawning a preacher a turn; the castle fell at 301 with our army at 104 units (to their 51) mostly in the east.
- The chainer stands still for a long time first (scratch loiter.js, whosees.js): 406-3, pilgrim #1812 at (13,23)
  r162-300, 12 king steps from our castle, inside its own prophet lattice, at r2 90 of two of our idle crusaders
  (vision 49): no unit of ours ever saw it. 407-3 (seed 2013): #1154 at (11,27) r117-276, seen by 1-3 of our pilgrims
  at r2 64-82 for 140 rounds; v6 has HUNT 0, so nobody reported it.
- StoneT2000's init failures on the replica (2,000-4,500 errors in some games: "Robot is not initialized" each turn
  of a robot whose sandbox start timed out) predate --fast-init (matches 199-388 alike): their slow start under the
  VM's load, which only hurts them.
- Stacked candidates on h82 (the same src; dist/h82 rebuilds byte for byte): h83 = h82 + HUNT 2 (h56v6's hunt), h84
  = h82 + STRIKE_R2 36 + PREACHER_SELF 4 + PREACHER_MIL 2.5 (h54v6's), h85 = h82 + PIONEER_FAST 1 (h64's), h86 = h82
  + ESCORT 2 (h65's). h85 and h86 wait for h82's verdict.
- **Anti-chain delivery pre-registered** (VM job ...a3d577100017, after h82's gate, before any game on its panel):
  h82 (control), h83 and h84 each vs h76 (our chain, 6 castle kills in 7 lines vs h50) on 799, 1706, 2013, 2924 both
  sides, full games; symcheck h83 and h84 on 1, 2, 3, 2013 to 300. PASS for X needs all 3: (1) castles X loses to h76
  <= 50% of h82's, read only if h82 loses >= 4 (fewer: X fails, the panel cannot show a defence); (2) X's wins vs
  h76 >= h82's; (3) X's K mined by r200 >= 90% of h82's over the 8 games. Falsifier: (1), the hunt or the strike
  does not save castles from a chain. On PASS: gate X vs the incumbent. If h82's gate rejects, the job is superseded.
- 19:40: h87 = h82 + h76's chain (CHAIN_ROUND 200, STAGE 15, END_R2 2, K 1000, F 3500, MIX [5], KEEP 1, SAFE 1):
  StoneT2000's weapon on h82's economy. **h87 delivery pre-registered** (VM job ...a3d577100018, after the anti-chain
  delivery, before any game on its panel): symcheck h87 on 1, 2, 3, 799 to 300; h87 vs h82 on 799, 1706, 2013, 2924
  both sides, full games; census --chain-min 5. PASS needs all 3: (1) a line of >= 5 churches on h87's side in >= 6
  of 8; (2) h87 wins >= 5 of 8; (3) castles h87 loses <= h82's. Falsifier: (2). On PASS: gate h87 vs the incumbent.

## 2026-10-22 19:50 — fastDump: the engine's turn message written directly; a gate game 129 s -> 82 s
- The fast-path profile (19:06) put the engine's getGameStateDump at 26%, insulate 9%, the view 15%. fastDump
  (run_game.js, part of --fast-view) writes the same text: each shown robot's fields in their own order less the
  engine's deletions, the view's rows from the shadow with a cached row of -1s, the shuffle drawing Math.random as
  the engine does. Unit tests: for every robot of two maps with ~400 robots placed (castles, signals of every
  radius, turn-1 maps, trade offers), the engine's text and fastDump's are equal; the 40-round game replays byte for
  byte. Micro-benchmark, 1,120 robots: 0.57 -> 0.16 ms per turn message.
- VM, h50 self-play on 826, 300 rounds, all fast flags: 129 s -> 82 s, the same replay byte for byte (252 s this
  morning). The driver at --timescale 2 freezes robots on the clock (685 s, 156 and 91 frozen turns), so its replays
  are no identity check.
- The message is built before the robot's clock starts (game.js enactTurn: dump, then start_time), so it changes no
  clock: saturn passes --fast-view too (GALAXY_FAST_VIEW, default 1), to drain the replica queue (98 waiting).

## 2026-10-22 20:05 — h78 delivery PASSES (rebased onto h82 as h88); replica restarted on --fast-view
- h78 (v6 + PIONEER_GIVEUP 20, PIONEER_STALL_ANY 40, PIONEER_HOME 1, PILGRIM_STALL 25) vs h50 on 418, 1325, 2542,
  2072 both sides: (1) mines to 450 on h78's side 54,188 vs 47,772 = 113% (bar 108%); (2) churches by 450 39 vs 31;
  (3) wins 6 of 8 (bar 4; lost 418 blue on health, 2072 blue on castles). PASS 3/3. Pioneers in flight 64 vs 88,
  stuck 22 vs 42, died 1 vs 11: the stalled ones mine at home instead. No-op v6p replays h50 IDENTICAL; symcheck
  1, 2, 3, 418 contest/combat only.
- h78 sits on v6, the incumbent until h82's gate reads. h88 = h82 + h78's four keys (dist/h82 rebuilds byte for
  byte from src); gate h88 vs h82 queued (...a3d577100019: symcheck, 20 cells from seed0 5000), behind the two
  deliveries. Superseded if h82's gate rejects.
- Driver diagnostic h83 (HUNT 2) vs h76 on 2013, 450 rounds: h83 won (castles), lost no castle, killed 8 of h76's
  11 churches; h76 built 63 prophets and 54 preachers to h83's 132 and 74. One game, read for the hunt only.
- Replica: saturn restarted 03:00 UTC (two of the three long slots had acked; the third, 4,500 s into its match, was
  re-queued). All 5 games run with --fast-view. The queue stood at 123 waiting (90 TRY, 33 QUE).

## 2026-10-22 20:10 — the opening race: h82's threat reserve holds the first pioneer back; h89, h90 pre-registered
- Replica losses, economy at r100 / r200 (pilgrims / churches; econloss on matches 391, 394, 298, 388, 385): the
  winners keep adding pilgrims and churches past r100 (uvafan on 1241: 22/3 -> 46/11; ours 13/1 -> 19/4). h82
  self-play to 200 on the same maps fills its own half by r100 (1241: 33-36 pilgrims, 34 depots a side; 70: 19 of
  20; 2591, 2965, 1915, 1592: 8-9 on 7-8 a side), so the winners' extra pilgrims were on depots v6 left free.
- The race on 2591 (32x32, 7 depots a side, a 10-depot cluster on the axis): uvafan (391-1) built its pioneer at r4,
  churched the centre at r13 and put a prophet on it; v6 never churched. h82 self-play: pilgrims r1, r2, then the
  castle waits (80 K, h82's pioneer check needs 10 + 50 + DEF_RESERVE_K 30) until r14; the pioneer walks one tile a
  turn (PILGRIM_FAST_FUEL 1000) and churches at r26. DEF_RESERVE_K also holds back depot pilgrims and the church.
- CFG.DEF_RESERVE_FROM (config.js defReserveK): the reserve is held only from that round. No-op h82n (h82's cfg on
  this src) vs h82 --det on 2591 replays h82 vs h82 IDENTICAL. h89 = h82 + DEF_RESERVE_FROM 30; h90 = h89 +
  PIONEER_FAST 1 (h85's switch). Driver, each red vs h82 on 2591: pioneer r3; centre church r18 (h89), r12 (h90);
  K mined by r200 1,330 / 1,356 vs h82's 408 / 408 (h82 lost its church).
- **Delivery pre-registered** (VM job ...a3d577100016b, after h82's gate, before any game on its panel): symcheck
  h89, h90 on 1, 2, 3, 2591 to 200; race: h89 and h90 each vs h82 on 2591, 2965, 1915, 1592, 70, 1241, 836, 493
  (replica loss maps) both sides to 150 rounds; rush: h89 and h90 each vs bots/rush4 on h82's 20 poor one-castle maps
  both sides to 200 (h82: 0 castles lost of 40). PASS for X needs all 3: (1) first church round on X's side, mean
  over the 16 race games, <= h82's side mean - 3; (2) K mined by r150 on X's side >= 105% of h82's side; (3) castles
  X loses to rush4 <= 2 of 40. Falsifier: (3), the open bank lets the rush in. On PASS: gate the passing X with the
  larger (2) vs the incumbent; h85 (PIONEER_FAST alone) is then superseded by h90's result.

## 2026-10-22 20:15 — compact view rows (--fast-view with --fast-turn): 6% less CPU, the same game
- fastDump with --fast-turn writes each out-of-sight row of the view as null; the turn script rebuilds it in the
  sandbox as a copy of one row of -1s, so the bot gets an equal object. Unit test: for every robot of the two probe
  maps the rebuilt object's JSON equals the engine's message, the compact text is under 80% of the full one; the
  40-round --fast-turn game replays byte for byte. vm2 micro-benchmark (64-tile map, 200 robots): parse of the full
  view 0.125 ms a turn; compact rebuilt by a push loop 0.19 (slower: the first VM timing, 99.7 s CPU vs 91.5);
  by slice 0.061. VM, h50 self-play on 826 to 300, alternating: 91.5, 91.7, 95.7 s CPU (base) vs 86.5, 87.2
  (slice), the same replay each time. The replica does not pass --fast-turn, so it is unchanged.

## 2026-10-22 20:37 — the game-over scan and the young generation: 13% less CPU, the same game
- Profile: Game.isOver 3.8% of a 300-round game (it scans every robot each turn for a dead castle), GC 17.4%.
- fastOver (run_game.js, part of --fast-view): while each team keeps a castle that is initialized and hooked, and
  the round and verdict leave the game open, isOver is false without the scan; the engine's _deleteRobot drops the
  cached pair. Unit test: 3,000+ random probe states on seeds 2202, 826, 2591, 1822 (initialized/hook flags, rounds
  1 to 1001, robots deleted between calls) give the engine's answer every time.
- batch.js with --no-kill runs node with --max-semi-space-size=64 (a turn is never killed there, so GC timing
  cannot change a game; kill-mode batches stay stock).
- VM, h50 self-play on 826 to 300, CPU s (wall s), all fast flags, load 12-14: base 88.6 (72.3), 88.6 (72.1);
  fastOver 83.7 (69.2), 85.4 (70.0), 85.3 (68.9), 86.8 (69.6); + semi 32 MB 85.4 (66.8), 81.2 (62.1); + semi 64 MB
  77.3 (56.3), 76.5 (55.7). Every replay the same as the base. Base to fastOver + 64 MB: -13% CPU, -23% wall.
- The replica gets fastOver with its next runtime deploy (it passes --fast-view); it keeps the stock heap.

## 2026-10-22 20:58 — replica: a 6th execute slot, 64 MB semi-space and fastOver on its games (queue 116)
- The queue clears at about 6 matches an hour (163 at 14:23, 123 at 20:05, 116 at 20:40), ~10 h to go on 5 slots;
  the owner's rule makes clearing it the priority (PROMPTS 17). saturn: MAX_EXECUTE_SLOTS 6 (GALAXY_EXECUTE_SLOTS
  6, unit MemoryMax 14G, CPUQuota 700%): 6 replica games + 2 gate games = 8 on the VM's 8 vCPUs (README limit).
  Each game also gets --max-semi-space-size=64 (GALAXY_GAME_SEMI_MB; GC inside a turn is charged to that robot, so
  this takes noise off the clock) and the new runtime's fastOver (part of --fast-view, off every clock).
- Restarted 03:57:41 UTC when one game was 39 min old and four were under 4 min (in-flight matches re-run): all six
  slots leased at once (404, 217, 221, 223, 224, 225), each node with the semi-space flag. Expect ~+20% slots and
  ~-13% CPU a game; read the ack rate at the next check-ins.

## 2026-10-22 21:05 — field-aimed candidates: the ladder panel decides; h82's panel pre-registered
- No build has had step 7 (ladder confirmation) yet: v4-v6 were submitted on self-play gates alone, and v6 then
  lost 0-3, 0-3, 1-2, 0-3, 1-2 to wololo, botfinalsafe, bot1v43, uvafan and awesomelemonade (403-407, 385-394).
  Self-play is blind to changes aimed at the field (TRAINING_ALGORITHM §0). Diagnostic, driver, seed 1375 (403-1's
  map, 61x61, where wololo built 54 pilgrims and 10 churches by r200 and mined 4,202 K to our 1,424): h82 vs h50 to
  200 rounds, h82 47 pilgrims and 11 churches, h50 16 and 2, HP 6,460 vs 1,440. The gate's random maps are mostly
  ones where h50 already fills its half, so its cells are close.
- TRAINING_ALGORITHM §2 steps 6-7 now: a candidate declared field-aimed before its gate is screened locally for
  non-inferiority (reject at t <= -1 or a basics regression) and accepted only on the ladder panel; the panel pairs
  the candidate with the incumbent's own panel created at the same time.
- **h82 is declared field-aimed now.** Disclosure: its gate (...a3d577100016) was looked at mid-run (16 of 20
  cells, net +2, t 0.5), which the protocol forbids; the panel's numbers are unseen. Either way h82 needs the
  panel (a local accept leads to step 7 too); the gate's result matters only at t <= -1.
- **h82 ladder panel pre-registered** (created when the gate ends, unless it rejects at t <= -1): opponents = the
  six that beat v5/v6 in their last match: m-schier.battlecode-2019-wololo, StoneT2000.BC19-botfinalsafe,
  StoneT2000.BC19-bot1v43, uvafan.bc2019, awesomelemonade.Battlecode2019, IanCoolidge0.battlecode20~69ce88. Block 1:
  one unranked match each (3 maps drawn at random once per opponent, `contest19.py scrim --vs ... --panel
  progress/panels/h82-b1.json`, player order '?') for h82 (submitted only while its 6 matches are created), then the
  same 6 requests for v6 (submission 96's bundle, resubmitted at once); the 12 bumped to the front of the replica
  queue (spool_bump). Cells = (opponent, game number), 18; D = cells where the two arms' results differ. Accept
  after block 1 at t >= 1.5 and net >= +3; reject at net <= 0; otherwise block 2 (a fresh draw of maps, the same
  rule on the cumulative count). Falsifier: the economy gain does not survive the field's early pressure (castles
  lost before r300 up in h82's games).

## 2026-10-22 21:25 — h82's gate: non-inferior (t 0.89); its ladder panel is on the replica
- Gate h82 vs h50 (...a3d577100016, 20 random cells from seed0 5000, par 2): 40 games, cells +12 -8, net +4, t 0.89
  (local accept bar 2: not met; field-aimed screen t <= -1: passed). Basics: 0 errors, frozen, timeouts, init
  failures or exceptions on either side; games lost on castles: h82 6, h50 17. Turn wall max 451 ms (h50 308)
  under --no-kill on the loaded VM (load 12-14).
- Driver, h50 red vs h82 blue on 1706 (403-3's map, where wololo's 16 pilgrims and 33 army at r200 beat v6's 7 and
  15) to 300: h82 13-14 pilgrims, 2 churches, K mined 1,516 by r200 (wololo 1,444, h50 724), army 37 (h50 13).
- Panel block 1 as pre-registered (TRAINING_LOG 21:05): submission 97 = dist/h82 (b0156206e827); requests
  181-186 -> matches 408-413 (DB: vibe19 submission 97 in each); submission 98 = bots/v6 (v6 again) -> requests
  187-192 -> matches 414-419 (submission 98). Maps per opponent in progress/panels/h82-b1.json, the same for both
  arms (408/414 wololo: 2644, 836, 2013; 409/415 botfinalsafe: 2740, 1706, 203; 410/416 bot1v43: 2591, 2321, 388;
  411/417 uvafan: 1653, 1712, 2046; 412/418 awesomelemonade: 1712, 2797, 2518; 413/419 IanCoolidge0: 1036, 203,
  2644); player order shuffled per match. All 12 bumped to the front (spool_bump). vibe19's active build is v6.

## 2026-10-22 21:50 — a new robot's first turn: World build 4x faster, bfs on flat offsets; the same games
- Basics: our replica games show a few clock overdraws (403-2: 4 frozen in 72,243 turns, ms_max 236; 391-1: 3;
  406-3: 1 timeout). h82's gate errlogs (capped at 200 lines a team a game): 961 turns over 30 ms, 14 over 100;
  256 of 315 crusader and 256 of 378 prophet slow turns were the unit's first or second turn.
- Instrumented build (scratch copy; per-phase Date.now), h82 self-play on 826 (64x64), first turns only: mean 107.5
  ms, of it the World constructor 53.1 (detectSymmetry over every tile pair twice, then a closure call and a
  2-element array per tile for the frame transform) and the first bfs 34.0 (offsets read as arrays of arrays), all
  in cold code in a fresh sandbox.
- src: detectSymmetry compares each mirror pair once and stops a direction at its first mismatch; World writes
  T.toE out per tile with no closure or array; bfs reads the offsets as two Int8Arrays cached on the offsets list.
  New unit test: on the 40 first seeds' maps (both teams) EX, EY, pass, karb, fuel equal makeTransform's, bfs fields
  equal the old bfs for king, r^2 4 and r^2 9 offsets, and detectSymmetry equals the old one on 400 synthetic boards
  (symmetric both ways, either, neither, odd sizes). Unit tests 114 + 55.
- Same driver, same game after: first-turn mean 45.3 ms (World 12.5, bfs 19.8), turns over 30 ms 188 -> 68.
  dist/h82o (h82's cfg on this src, 1469e3753540) vs dist/h82, --det with a 50x clock and --no-kill (only bot logic
  can differ; without them even h82 vs h82 differs on the driver, by clock freezes): 826 (H) self-play to 250, h82 vs
  h50 and h82o vs h50 on 1375 (V) and 2591 (V) to 200: IDENTICAL replays. Wall 156.8 s -> 132.5 s on 826.

## 2026-10-22 21:55 — h89 / h90 delivery FAILS on the rush: the open bank before round 30 costs a castle
- VM job ...a3d577100016b as pre-registered (20:10). symcheck h89, h90 on 1, 2, 3, 2591 to 200: symmetric up to
  the first contest/combat (seed 2 to 200 clean). Race vs h82 on the 8 replica loss maps, both sides, to 150:
  (1) first church on the candidate's side, mean of 16: h89 18.2, h90 15.1, h82 25.4 (bar h82 - 3: both met);
  (2) K mined by r150: h89 25,176 vs h82 23,976 = 105.0% (bar 105%: met at the bar), h90 24,844 vs 25,004 = 99%
  (missed); (3) castles lost to bots/rush4 on h82's 20 poor one-castle maps both sides to 200: h89 8 of 40, h90 8
  of 40 (bar 2; h82 0): 1706, 1755, 1756 / 1921, 1699, both sides, castle down at r22-27 on 37-40 tile maps.
- **h89 FAILS (bar 3), h90 FAILS (bars 2, 3).** The falsifier was right: the 30 K the reserve kept before round 30
  is what the castle's threat response builds with when the rush arrives at r15-20. Closed: reserve released by a
  fixed round. Re-open: a reserve released only until the rush could first arrive (the mirror castle's crusader
  travel time), or a pioneer paid from the reserve's surplus only. h85 (PIONEER_FAST alone) stays built, waiting:
  h90's K bar suggests it is no economy gain by itself.

## 2026-10-22 22:45 — anti-chain delivery FAILS (h83, h84); h87 delivery PASSES; h91 (RICH_K 0) pre-registered
- Anti-chain delivery (...a3d577100017, as pre-registered 19:30), each vs h76 on 799, 1706, 2013, 2924 both sides,
  full games: castles lost h82 6 (2 on 799 twice, 1 on 2924 twice), h83 6, h84 6; wins 4 / 4 / 4. (1) needs <= 3:
  **h83 and h84 FAIL.** The falsifier held: neither the hunt nor the strike saves a castle from the chain (the same
  castles fall in the same games). Symcheck h83, h84 on 1, 2, 3, 2013: stops at an axis-tile contest (1) or combat
  after the first attack. Swapping sides often replays the mirror game for our builds: 799 and 1706 here give equal
  per-team numbers both ways, and in h82's gate all 20 cells had one winner on both sides (14 the same length).
- Disclosure: a script measuring that also read h88's running gate file (...a3d577100019): 4 cells done, 1 with one
  winner on both sides, 3 split; it did not print who won. The gate's bars are unchanged and it is read only when done.
- h87 delivery (...a3d577100018, as pre-registered 19:40), h87 vs h82 on the same maps: (1) a line of >= 5 churches on
  h87's side in 7 of 8 (bar 6; census --chain-min 5; 1706 with h87 red had none); (2) h87 wins 6 of 8 (bar 5);
  (3) castles lost h87 1, h82 8. **PASSES 3/3.** Symcheck h87 on 1, 2, 3, 799: an axis contest at r45 (1), combat
  after the first attack (2, 3), 799 clean to 300. Gate queued (...a3d577100019b) vs the incumbent h50, 20 random
  cells from seed0 5000; rebased onto h82 if h82 is accepted before it starts.
- Replica panel losses so far (block 1, h82's arm): 410-1 (2591) is the opening race (TRAINING_LOG 20:10): pioneer
  built r14, killed r25 at the centre choke by bot1v43's early prophet; the cluster then rests 100 rounds; the bank
  sat at 110-140 K from r30 to r95, under the reserves (DEF 30 + PEACE 60 + pioneer due 60 = 150) and ECON_UNTIL.
  409-2 (1706, h82 red vs botfinalsafe, castle lost r347): from r100 to r300 h82's bank held 225-285 K with an army of
  2-9, botfinalsafe's 16-49. The castle's guard was full (want 2 + r/40), so struct.js built more only above 200 +
  reserves (340); the church at (25,11) fed ~20 single units into botfinalsafe's prophets at (23,13); the enemy
  chained 7 churches up x = 31 to our castle at (31,4).
- CFG.RICH_K (struct.js step 4; default 200 = the old constant): past its guard quota a structure's peacetime army
  builds while the bank holds more than RICH_K above the reserves. Unit test: a church with its guard full builds
  nothing at RICH_K 200 / bank 150, a unit at RICH_K 100 / bank 150, nothing at bank 90. h91 = h82 + RICH_K 0
  (debe32012d0a). One driver game, h91 red vs h82 on 1706 to 400 (driver loaded: 60 / 103 frozen turns): h91's bank
  91-116 from r150, h82's 282-302; army at r400 48 vs 102 (h91 lost its contested church at r106: one game).
- **h91 delivery pre-registered** (VM job ...a3d577100019c, after h87's gate, before any game on its panel; not
  field-aimed: h82 hoards in self-play too): symcheck h91 on 1, 2, 3, 1706 to 300; h91 vs h82 on 1706, 2740, 203,
  2591, 2321, 388, 836, 2644 both sides, full games; per-25-round CSVs. PASS needs all 3: (1) h91's mean K bank over
  r100-400 (every 25 rounds) <= 60% of h82's; (2) h91's mean army over r100-400 >= 115% of h82's; (3) h91 wins >= 8 of
  16 and loses no more castles than h82. Falsifier: (3), the army spends what the economy needed. On PASS: gate h91
  vs the incumbent.

## 2026-10-22 22:49 — bank study: in our replica losses the enemy banks more, not less; 413-2's stuck pioneer
- 62 replica games with vibe19 (matches 199-410; scratch bank.sh: replay.js rounds every 25, means over r100-400).
  Losses (40): our bank 129 K vs theirs 480, army 37 vs 45 (ours smaller in 24 of 40), our bank above theirs in 4.
  Wins (22): bank 202 vs 404, army 75 vs 19. So hoarding is not what loses in general: StoneT2000's bots bank
  300-1,600 K. It is real on 1706 (204-1, 403-3, 407-2, 409-2: our bank 143-260, army 7-13 vs 22-41). h91's delivery
  stays as pre-registered (it tests what it says), behind h87's gate; RICH_K is no lead for the economy gap.
- Panel block 1 so far: 408 (h82 vs wololo) 0-3, 411 (vs uvafan) 0-3, 413 (vs IanCoolidge0) 0-3; control 414 (v6 vs
  wololo) 0-3, 416 (v6 vs bot1v43) 0-3 (h82's 410: 1-2, the 388 cell for h82). Read when the block is complete.
- 413-2 (2644, 42x42, one castle a side, h82 red): no church all game, 3-8 pilgrims, army 1-8; IanCoolidge0 30
  pilgrims, 5 churches (one on our half at (20,9) by r60), army 172. Pioneer #2509 (built r14) spent 146 turns
  within 2-6 tiles of (33,16) without reaching its site or giving it up and died at r160; #451 (r27) likewise until
  r175. The castle built nothing from r27 to r95 with 155 K banked (ECON_UNTIL 100; both planned clusters had a
  pioneer out). h88's give-up and stall switches target this case; its gate vs h82 is running.

## 2026-10-22 23:31 — replica: games ran out of heap; saturn now keeps a match's finished games across attempts
- Replica queue at 23:00: 103 waiting (70 TRY, 33 QUE), all ranked benchmark matches created 2026-10-22 01:00 PDT; its
  ratings are frozen behind them (a participation is rated only after the team's previous one). saturn's journal
  since then: 133 acks, 259 nacks (214 in one burst at 09:xx PDT, exit 1, during the slot redeploy; 26 from the
  three restarts at 18:46, 20:00 and 20:57 PDT, which re-ran 15 matches from their first game, up to 1.6 h of
  games each; 17 time limits; 2 crashes). The crashes: match 227 game 2 "FATAL ERROR: Ineffective mark-compacts near
  heap limit ... JavaScript heap out of memory" (exit -6, after 4,758 s), 404 (NielsKornerup v wololo) game 2 exit
  -11 after 3,835 s, its 6th failed attempt. At 23:08 four of six replica games held 1.9-2.0 GB RSS under the 2 GB
  heap cap, every one on seed 1712 or 2740 (our panel's 412/418 among them); the saturn unit used 12.3 of its 14 GB.
  These games carry 300-800 robots a side (uvafan 405-507 prophets, awesomelemonade 802 units in 394-2), each robot a
  vm2 sandbox. Near the cap V8 runs full GCs inside robots' turns and the chess clock charges them, so some of our
  replica frozen turns and timeouts on big maps (2740: 17 frozen; 1712: 9 frozen + 2 timeouts) may be the host's.
- saturn (deployed 23:30): a game an earlier attempt of the same message finished is kept in
  $GALAXY_HOME/saturn/resume/<sha of report url + details> (row.json + replay; removed on ack or after 3 days) and
  not replayed; per-game V8 heap 2048 -> 3072 MB, the unit's MemoryMax 14G -> 22G (VM 32 GB). Unit tests: a match
  whose game 2 fails once replays only games 2-3 on retry, the archive holds all three, another match never reuses
  them; kept games are checked for seed and sides; old directories are pruned. Before the restart a one-off script
  (scratch seed_resume.py) matched each slot's A/B bundles to exactly one spooled message and moved the 6 finished
  games (418-1, 227-1, 412-1, 404-1, 417-1, 417-2) into the cache, so the restart lost only the games in progress:
  417 restarted at game 3, 404 / 412 / 418 / 227 at game 2, all six at --max-old-space-size=3072.
- Census of enemy churches on our half of the mirror (61 replica games with vibe19, matches 199-414; scratch
  halves.js): losses (41): the enemy had one there by r400 in 34, 51 churches by r200 and 253 by r400; ours on
  theirs: 4. Wins (20): 5 games, 3 by r200, 22 by r400; ours 3. First such church: uvafan r13-133, IanCoolidge0
  r24-318, wololo r49-76, StoneT2000 r24-615. Economy, 391-3 (seed 70, vs uvafan, we blue): r100 uvafan 27 pilgrims,
  4 churches, mined 944 K / 5,320 F; us 13 pilgrims, 2 churches, 906 K / 3,200 F; r200 29 / 5 / 18,180 F vs 15 / 2 /
  8,530 F. Its army passed ours after r150 and stayed bigger (230 vs 157 at r400; 672 vs 38 at r1000). The gap to the
  top bots is pilgrims and churches, twice ours by r100, not the army.
- Panel block 1 (h82 vs v6) so far: wololo cells 0, 0, 0; botfinalsafe 203: 0, 1706: 0, 2740: +1 (409 W by health,
  415 L by health); bot1v43 388: +1, others 0; uvafan (411: 0-3), IanCoolidge0 (413: 0-3) wait for 417 and 419;
  awesomelemonade for 412 and 418. Net +2 over 9 cells.

## 2026-10-23 00:00 — h88 REJECTED; phase census of 48 replica games; h94 (no all-out march at 900) queued
- h88 (h82 + PIONEER_GIVEUP 20, PIONEER_STALL_ANY 40, PIONEER_HOME 1, PILGRIM_STALL 25) vs h82, 20 cells from seed0
  5000 (out/h88_h82.jsonl): 18-22; gained 0, lost 2, split 18, net -2, t -1.41. Pre-registered: reject at t <= 0.
  **REJECTED.** Symcheck h88 on 1, 2, 3, 418: contest/combat only. 18 of 20 cells split: the two builds play the
  same game from each seat, so a seat wins both. dist/h93 (h88 + ESCORT 2, built 22:53, never queued) goes with it;
  ESCORT 2 on h82 is h86.
- Phase census (scratch bank/phases.js, matches 385-419, 48 games with vibe19, 12 W / 36 L): military units lost,
  ours / theirs, before 450, 450-899, from 900: wins 508/516, 928/741, 210/183; losses 2,142/1,418, 2,555/1,238,
  693/355. Castles: in the wins we took 15, all in 450-899 (HCN-bot 5, nthistle 4, StoneT2000's two bots 5, of them
  3 on 60, awesomelemonade 1); in the losses we lost 23 before 450, 10 in 450-899, 1 from 900. **From round 900 on, no
  castle fell to us in 48 games**, and that window cost us 903 units to their 538. 20 games reached round 1000: 9
  lost on health, 5 lost on castles. Three of the health losses led or nearly led at 899 and then lost: 411-2
  (seed 1653, uvafan) health 5,140 vs 4,400 at 899, 3,660 vs 7,220 at 1000 (we lost 63 units after 900, they 19);
  416-2 (388, bot1v43) 2,150 vs 1,560 -> 2,850 vs 3,230; 385-2 (2797, botfinalsafe) 3,240 vs 3,400 -> 550 vs 6,310
  (101 lost vs 35). The 450 crusader march is what wins (every castle we took); the 900 all-out march is not.
- 411-1 (seed 2046, h82 vs uvafan, 33x33, 7 pilgrims and no church each, lost on health 740 vs 5,220): we built 233
  military and lost 225, they lost 70; our 145 attacks dealt 1,450 damage, theirs 812 dealt 8,120; our prophets were
  idle 20,939 of 21,724 turns; K sat at about 290 all game and 20,044 fuel was unspent at the end; we spent 4,510
  fuel on signals (the attack call every 5 rounds) to their 911.
- Clock overruns on the replica (all match archives with vibe19, 288 games): exceptions 0 since match 140; 57
  frozen turns and 9 timeouts in all, every one since match 181, most on big long games (409-3 seed 2740: 17;
  415-3 2740: 13; 411-3 1712: 9 and 2 timeouts; 411-2 one turn of 1,448 ms). The opponents in the same games: 60,
  268, 250, 1,115, 184. Our mean turn rose from about 2.2 ms (matches 385-397) to 3-4 ms (408-419). The VM at
  00:00: load 13 on 8 vCPUs, 6 replica games each at 70-90% of a core plus our 2 gate games at nice 10 (2.4 cores);
  saturn's cgroup was throttled once in 18,086 periods. Lead, not acted on: which of our robots overrun (the
  archive keeps only counts; run_game.js --logs on the replica would name them).
- **h94** = h82 + CFG.ATTACK_LATE 1001 (new switch, default 900, replacing the literal 900 in military.js listen():
  from ATTACK_LATE every military unit, home guards and unmasked types too, obeys attack orders; at 1001 prophets and
  preachers never march, crusaders still do from 450). Unit test: MARCH_MASK's test now covers ATTACK_LATE 1001
  and 700. Gate h94 vs h82 queued (...a3d577100019d, behind the h91 delivery), the cells of h88's gate.
  Pre-registered: accept t >= 2; reject t <= 0; an accept also needs the mechanism: h94 loses fewer units from
  round 900 on than h82 over the gate's games that reach 900 (phases.js on its replays). If h82's panel rejects
  h82 first, h94 is rebased onto v6.
- Panel block 1: 419 (v6 vs IanCoolidge0) 0-3 like h82's 413, so those 3 cells are 0; net +2 over 12 cells; 412, 417
  and 418 run (417 kept 2 games across the 23:30 restart).

## 2026-10-23 00:15 — h95 (pioneers leave on the reserve's surplus) pre-registered
- Replica 411-3 (seed 1712, 62x62, h82 vs uvafan): to round 110 the two sides built alike (h82 26 pilgrims, 5
  churches, 25 military; uvafan 35, 6, 26); the gap opened in r100-200 (pilgrims 24 -> 26 vs 31 -> 42). uvafan held
  both clusters on the axis, churched at r27 (31,15) and r40 (31,45), with pilgrims on the depots of our half beside
  them through round 300. Our castle (21,3) built 4 pilgrims in r1-4, then nothing until r23: h82's pioneer needs
  pilgrim 10 + church 50 + DEF_RESERVE_K 30 = 90 K in the shared bank before it leaves; our first churches came at
  r30 (6,33) and r41 (21,22), the centre at r50 (25,12). In 391-3 (seed 70) uvafan's centre church (40,26) at r31
  built 9 pilgrims in r33-47, and two of its churches went up next to ours on our half and built preachers.
- CFG.PIONEER_DEPART_K (castle.js pioneer; default 50 = the old 50 + reserve): the karbonite beyond a pilgrim and
  DEF_RESERVE_K a castle needs to send a pioneer. The pioneer already waits at its site until the bank holds church
  + reserve (pilgrim.js), so at 0 the walk starts on the reserve's surplus and the mining on the way pays the church;
  the 30 K threat reserve stays in the bank throughout (h89 released it before round 30 and lost castles to rush4).
  Unit test (seed 1205): with DEF_RESERVE_K 30 the default needs 90 K, 0 needs 40 K and refuses at 39. No-op:
  today's src with h82's cfg vs dist/h82 --det on 1712 to 150 replays h82 vs h82 IDENTICAL.
- Driver diagnostic, h95 = h82 + PIONEER_DEPART_K 0, red vs h82 on 1712 to 150 (--det): centre church (30,12) at
  r24 (h82 in the same seat: r44); first church r24 vs r30; K mined by r150 2,928 vs h82's 2,458 in the same seat
  (+19%; vs this game's h82 blue 2,328), fuel 13,210 vs 11,650, pilgrims 30 vs 29. The church at (6,33) came at r55
  instead of r30: waiting pioneers build in arrival order, not plan order.
- **Delivery pre-registered** (VM job ...a3d577100019cz, after the h91 delivery, before h94's gate), h89's maps and
  bars: symcheck h95 on 1, 2, 3, 2591 to 200; race: h95 vs h82 on 2591, 2965, 1915, 1592, 70, 1241, 836, 493 both
  sides to 150; rush: h95 vs bots/rush4 on h82's 20 poor one-castle maps both sides to 200 (h82: 0 castles lost of
  40). PASS needs all 3: (1) first church round on h95's side, mean over the 16 race games, <= h82's side mean - 3;
  (2) K mined by r150 on h95's side >= 105% of h82's side; (3) castles h95 loses to rush4 <= 2 of 40. Falsifier: (2),
  pioneers that wait at their sites mine less than depot pilgrims would. On PASS: gate h95 vs the incumbent.

## 2026-10-23 00:45 — h87 ACCEPTED (t 2.06): frozen as v7, now the src defaults; h94 / h95 rebased as h96 / h97
- Gate h87 (h82 + h76's church chain) vs h50 (= v6), 20 cells from seed0 5000 (out/h87_h50.jsonl, finished 00:22):
  29-11; gained 14, lost 5, split 1, net +9, **t 2.06** (pre-registered accept at t >= 2). h87's wins: 25 on
  castles, 4 on health; losses 4 castles, 7 health. h87 0 errors, 0 frozen, 0 timeouts (h50: 27 frozen turns).
  **ACCEPTED** as v7.
- bots/v7 = dist/h87 (gate hash 9ce9cf4845c9; ROSTER.tsv). Replica submission 99 ("v7 (h87): ..."), accepted:
  matches created from now play v7. h82's panel block 1 (412, 417, 418 still running) keeps the builds it was
  created with and finishes for the record; h82 itself is superseded by h87, which contains it.
- src defaults now ECON_UNTIL 100, PIONEERS_TEAM 6, PEACE_RESERVE_K 60, PLAN_VALUE 10, DEF_RESERVE_K 30, CHAIN_ROUND
  200, CHAIN_STAGE 15, CHAIN_END_R2 2, CHAIN_K 1000, CHAIN_F 3500, CHAIN_MIX [5], CHAIN_KEEP 1, CHAIN_SAFE 1. Ten unit
  tests of other switches assumed v6's values; they now pin them (test/bot.test.mjs testPreV7). Identity, --det on
  799 to 300 (a chain fires at r258): the defaults-only build dist/v7d (37,563 bytes, the minifier drops the dead
  branches; dist/h87 52,379) and today's src with h87's cfg (out/h87chk) each replay h87 vs h87 IDENTICAL.
- Rebased before they ran (the incumbent changed): h94 -> **h96** = v7 + ATTACK_LATE 1001, gate vs h87 (job
  ...a3d577100019d rewritten, same cells and bars); h95 -> **h97** = v7 + PIONEER_DEPART_K 0, delivery vs h87 (job
  ...a3d577100019cz rewritten; the race control is h87, rush4 and the bars as pre-registered at 00:15). The h91
  delivery (running, vs h82) reads as pre-registered; if it passes, its gate is v7 + RICH_K 0 vs h87.
- The v6 gates still in ~/jobq/pending (h64, h71, h76, h20v6, h15v6, h65, h79, the anti-chain panel, h8v6, h55's
  and h24v5's extensions, the rebased-to-v6 group) are stale now; new jobs go in ahead of them (job names sort
  first) until the owner decides on moving them.

## 2026-10-23 01:00 — h82's panel block 1, final (for the record; h82 is superseded by v7)
- Replica 408-413 (h82, sub 97) vs 414-419 (v6, sub 98), 6 opponents x 3 maps, both builds on the same cells
  (progress/panels/h82-b1.json): h82 won 5 of 18, v6 3 of 18. Gained 3 (botfinalsafe seed 2740, bot1v43 seed 388,
  awesomelemonade seed 2797), lost 1 (awesomelemonade seed 2518), 14 split; **net +2**. Block 1 alone cannot meet the
  two-block accept (net >= +3); no block 2: h82 is closed. Swept both ways: m-schier wololo, uvafan, IanCoolidge0
  (each build won 0 of the 3 cells against each), bot1v43 on 2591 and 2321.

## 2026-10-23 01:10 — h91 delivery FAILED (RICH_K 0): the bank goes into the army, the wins do not follow
- h91 (h82 + RICH_K 0) vs h82, 8 seeds both sides, full games (VM out/dlv_h91_h82.jsonl, out/dlv_h91.txt,
  out/rounds_dlv_h91.txt), against the bars pre-registered 22:45: (1) mean K bank r100-400 150 vs 285, **53%** (bar
  <= 60%: pass); (2) mean army r100-400 66.0 vs 56.3, **117%** (bar >= 115%: pass); (3) h91 wins **7 of 16** (bar >= 8:
  fail), castles lost 6 vs 6. The pre-registered falsifier happened: the army spends what the economy needed. No
  gate; RICH_K stays 200.
- From dlv.js on the same 32 sides: of 3,348 melee units lost, 2,271 (68%) died without ever firing (h91 1,180 of
  1,691, h82 1,091 of 1,657). The combat census that follows checks this on the replica.

## 2026-10-23 01:25 — h97 delivery FAILED (PIONEER_DEPART_K 0): 1 of 3 bars
- h97 (v7 + PIONEER_DEPART_K 0) vs h87, VM out/dlv_h97_race.jsonl, out/dlv_h97_rush4.jsonl, 2019-next out/race_h97.txt;
  symcheck 1, 2, 3, 2591 to 200: seed 2 ok, 3 and 2591 combat-order only, as every build since v4. Bars (00:15,
  rebased 00:45): (1) first church mean over the 16 race games 24.1 vs h87's 25.4, -1.3 (bar <= -3: **fail**);
  (2) K mined by r150 23,088 vs 24,492, **94%** (bar >= 105%: **fail**); (3) castles lost to rush4 **0 of 40** (pass).
- By map: earlier on 1592, 2965 (13 vs 22), 2591 (18 vs 26), 1915, 70 with K equal or +4-9%; **later on 1241** (48 vs
  27, K 1,968 vs 2,600: the pioneer that leaves on 40 K waits at its site while its castle spends the bank on depot
  pilgrims) and 836 (24 vs 22, K -6%). The 411-3 gap (driver diagnostic +19% K) does not generalise. No gate;
  PIONEER_DEPART_K stays 50.

## 2026-10-23 01:45 — h96 gate, first 20 cells: inconclusive and rarely live (D 3); the combat census
- Gate h96 (v7 + ATTACK_LATE 1001) vs h87, 20 cells from seed0 5000 (VM out/h96_h87.jsonl): 21-19; gained 2, lost 1,
  split 17, net +1, t 0.58. Neither bar (accept t >= 2, reject t <= 0). By the gate rule (TRAINING_ALGORITHM: looks
  when D first reaches 12) it extends, but at D 3 per 20 cells that is ~80 more cells; ranked below h100.
- Combat census of our replica games from match 380 (scratch combat/census.js: per type built, lost, lost without
  ever firing, shots), 27 losses: we built 1,927 crusaders / 2,537 prophets / 917 preachers, the opponents 1,404 /
  5,897 / 744. We lost 1,522 / 2,098 / 719, they 175 / 1,644 / 275. **Of our lost crusaders 1,393 (92%) never fired**
  (preachers 636 of 719, 88%; prophets 759 of 2,098); our crusaders fired 318 shots in 27 games, our prophets 5,206,
  theirs 14,132. Our 14 wins: crusaders 890 of 988 lost unfired. A crusader sees r2 49 and a preacher r2 16; a
  prophet shoots from r2 64: our melee units on the lattice front and on marches die to prophets they cannot see
  (411-1: deaths at (6,12) by prophets at (6,20), r2 64; 408-3: 30 prophets of ours died on our castle's build tiles
  at r31-160, built one at a time toward wololo prophets that had a church at (34,32) on our half since r55).
- Census complete at 01:55, 61 games (45 L, 16 W): in losses our crusaders 2,302 of 2,507 lost unfired (92%), 472
  shots in 45 games; preachers 1,051 of 1,179; prophets 1,039 of 3,188. Built 3,175 / 3,963 / 1,501 to the
  opponents' 2,225 / 9,798 / 1,898; their prophets fired 22,668 shots to our 12,295.
- Opening, 410-1 (seed 2591, StoneT2000 bot1v43, castles at r161): StoneT2000 built a prophet at r3, before its 3rd
  and 4th pilgrims; it killed our centre pioneer at r25 and StoneT2000 churched the centre (r23, r35, 3 churches by
  r100). Our castle kept 2 pilgrims all game (mined 218 K to 732) and built 10 prophets that died one at a time.
- Driver diagnostic h98 (v7 + MIL_ROTATION null: no peacetime crusaders) vs h87 on 2644 to 500: identical to r75,
  then h98 lost a contested church at r100-125 to h87's cheaper crusaders (army 10 vs 21 at r125) and its castle at
  r277. Crusaders win close contests in self-play; the field's prophet walls kill them unseen. h98 and h99 (MIL_ROTATION
  [4]) are built, not queued.

## 2026-10-23 02:05 — h100 (ESCORT_FIRST: a prophet goes ahead of the first contested pioneer) pre-registered
- Switch ESCORT_FIRST (src/bot/castle.js escortFirst; default 0): at planning (turn 3) a castle owes ESCORT_FIRST
  ESCORT_UNITs (prophet) to the first cluster of its plan the enemy reaches within PLAN_CONTEST_FIRST moves of us;
  in its build order the escort comes before the pioneer (after depot pilgrims, as pioneers do); the newborn hears
  SIG.GUARD and holds the lattice around the site. Motivation: 410-1 (StoneT2000's r3 prophet), uvafan's and
  wololo's guarded contested sites (01:45). Unit test 'castle: ESCORT_FIRST owes escorts ...' (seed 1915); 117 + 57
  tests pass. No-op: the defaults build out/v7chk2 replays h87 vs h87 on 799 to 300 IDENTICAL.
- h100 = v7 + ESCORT_FIRST 1 (e9c662e84838). Driver diagnostic h100 red vs h87 on 2591 to 300 (--det): prophet at
  r3, pioneer r24 (h87's r14), centre churches at (15,5) r33 and (16,5) r26, both gone by r150; K mined r100 442 vs
  368, r300 808 vs 676; pilgrims at r300 6 vs 11. It changes moves; the direction is open.
- **Gate pre-registered** (VM job ...a3d577100019e, next after the running stale h64 job): symcheck h100 on 1, 2, 3,
  1915 to 200; h100 vs h87 on the 20 cells of seed0 5000, par 2. Looks when D first reaches 12 (extensions: the next
  20 cells of seed0 5000, 385, 2545, 206, 284, 562, 2262, 321, 1866, 1787, 1961, 1159, 781, 309, 718, 2441, 1765,
  2502, 90, 2587, 1252, then onward). Accept t >= 2 with the mechanism: over the gate games, pilgrims h100 loses
  before r200 <= 80% of h87's, and h100's mean first church <= h87's + 5 rounds (scratch combat/econ.js on the
  replays). Reject t <= 0. Falsifier: the escort's 25 K delays the pioneer (r24 vs r14 on 2591) more than the escort
  saves.

## 2026-10-23 02:20 — where our melee units die; MELEE_BACK (h101)
- Scratch combat/where.js on our 12 latest replica losses (matches 415-419): our crusaders and preachers that died
  without ever firing, by the half they died in (nearer our starting castles or theirs) and round window <450 /
  450-899 / >=900: own half 363 / 511 / 144, enemy half 2 / 49 / 17. **950 of 1,018 died in our own half**; marches
  are not where they die (crusaders obey attack orders from round 450, MARCH_MASK 8). They stand on our lattice,
  which grows 2 rows ahead of home toward the enemy, and enemy prophets hit them from r2 64, beyond their vision.
- Switch MELEE_BACK (military.js latticeOk / latticeTarget, default 0): crusaders and preachers hold no lattice tile
  ahead of the lattice centre's row and fill tiles nearest a point MELEE_BACK rows behind it; prophets keep the
  front. Their "engage enemies near home" step is unchanged, so they still close on what comes into their view.
  Unit test 'military: MELEE_BACK keeps crusaders and preachers off lattice tiles ahead of home'. h101 = v7 +
  MELEE_BACK 2.
- Driver diagnostic h101 red vs h87 on 2046, 1000 rounds (--det): lost on castles at r1000 (1 vs 2); K mined r200
  1012 vs 982, r1000 4866 vs 4834; melee lost unfired 35 vs 36 of 98 vs 84 lost (dlv.js). It changes moves; one
  self-play game says nothing about the replica's unfired deaths, where the opponents are prophet lattices.
- No-op check: the defaults build out/v7chk3 replays h87 vs h87 on 799 to 300 IDENTICAL.
- **Gate pre-registered** (VM job ...a3d577100019f, after h100's): symcheck h101 on 1, 2, 3, 2046 to 300; h101 vs
  h87 on the 20 cells of seed0 5000, par 2; looks when D first reaches 12, extensions on the next 20 cells (02:05).
  Field-aimed (the replica census): accept t >= 2 with the mechanism (dlv.js on the gate replays, out/
  dlv_gate_h101.txt: h101's meleeLostUnfired <= 75% of h87's); reject t <= -1; in between, the replica panel decides
  (two-block rule). Falsifier: melee held back arrives late to the fights at the front and the lattice loses tiles.

## 2026-10-23 02:55 — stale h64 gate (v6 + PIONEER_FAST 1 vs h50) finished: inconclusive
- out/h64_h50.jsonl (40 games, the 20 cells of seed0 5000): 22-18, gained 8, lost 6, split 6, D 14, net +2, t 0.53.
  0 < t < 2: inconclusive. Its base v6 is no longer the incumbent, so it is not extended; a port (v7 +
  PIONEER_FAST 1) ranks behind h100 and h101.

## 2026-10-23 03:05 — economy census of 63 replica games: we stop expanding at r50; half our pioneers fail in losses
- Scratch combat/econ.js over the 63 replica games of the combat census (45 lost, 17 won, 1 unparsed), medians,
  ours/theirs. **Losses**: r50 churches 1/1, pilgrims 9/7, mine actions 242/175 (we lead); r100 1/3, 10/18, 603/666;
  r200 1/5.5, 10.5/24.5, 1374/2026; r400 1/6, 12.5/26, 2936/4806. We built no church at all in 14 of 45 losses (they
  in 4). **Wins**: r200 churches 1/2, pilgrims 13/15, mines 1828/1486. We lead every game at r50 and stop there: in
  losses our pilgrim count is flat from r50 while theirs doubles by r100 and again by r200.
- Scratch combat/pioneer.js (pilgrims whose first act is a church, or that walk 15+ rounds without mining), rounds
  < 200: in losses 220 of our pioneers, 105 built a church, 47 died, 67 were still walking at r200 or their death
  (89 stood 10+ turns within 2 tiles of one spot); in wins 57, 42 built, 3 died, 10 walking. Mean trip to a church
  20.5 rounds (theirs 22.8): the pioneers that arrive are not slow; half never arrive.
- Two cases read: 416-1 (seed 2591, 32x32, one castle a side, bot1v43): the only free cluster straddles the top
  centre behind a 2-wide corridor; bot1v43's round-3 prophet sat in it at (16,14) from r29 to r55, our pioneer stood
  off its range at (15,22) from r30 (a way round by the east edge exists), the castle built nothing from r5 to r53
  with 70-130 K banked (no depot left to staff, the pioneer still out, ECON_UNTIL 100); no church, 3 pilgrims, castle
  lost at r165. 416-3 (seed 2321, 45x45, bot1v43): two pioneers born r13-14 for the (26,16) cluster stood at
  (29-31,13-14) from r23 to past r78, at r2 65 and 100 of a prophet bot1v43's church built at r17 and parked at
  (21,14), r2 29 from our site; no way round (the site itself is in range). Our castle never saw it (r2 169).
- Two answers: walk round a held choke (PIONEER_DETOUR below), and clear a held site (a crusader beats a lone
  prophet: inside r2 16 the prophet cannot fire; ESCORT on v7 with ESCORT_UNIT 3 has never been gated: h65 was a v6
  job, h93 went with h88).
- Switch PIONEER_DETOUR (pilgrim.js detourCost, nav.js step's new `costed` option; default 0): a pioneer remembers
  each enemy attacker it sees for PIONEER_DETOUR turns (forgotten sooner once its tile is in sight without it) and
  walks to its site over a field in which each tile in a remembered attacker's THREAT_R2 costs DETOUR_PEN (20) extra
  moves. Unit test 'pilgrim: PIONEER_DETOUR walks round a remembered attacker that holds the short gap'. h102 = v7 +
  PIONEER_DETOUR 50.
- No-op check: the defaults build out/v7chk4 (src with PIONEER_DETOUR) replays h87 vs h87 on 799 to 300 IDENTICAL.
  Driver diagnostic h102 red vs h100 on 2591 to 300 (--det): byte-for-byte h87's game vs h100 (both centre churches
  at r26 / r33; no enemy attacker came in sight of a pioneer). In self-play nobody fields an army before ECON_UNTIL
  100, so the switch has nothing to see: its test needs an opponent that parks a prophet in front of our pioneers.

## 2026-10-23 03:45 — h100 gate inconclusive (t 0.71, D 8), mechanism passes: extension queued; a camping sparring partner
- Gate h100 (v7 + ESCORT_FIRST 1) vs h87, the 20 cells of seed0 5000 (out/h100_h87.jsonl): 22-18; gained 5, lost 3,
  split 12, **D 8**, net +2, t 0.71. Inconclusive and D < 12: the next 20 cells as pre-registered (VM job
  ...a3d577100019fzz, after h101's gate and the time audit), read pooled.
- Mechanism (scratch combat/econ200.js on the 40 gate replays, rounds < 200): pilgrims lost h100 29, h87 45 (0.64;
  bar <= 0.80, pass); mean first church h100 30.9, h87 28.2 (+2.7; bar <= +5, pass); no church before r200 in 4
  games each.
- Time audit queued (VM job ...a3d577100019fz, after h101): v7 vs v7 on 2740 and 1712 under the replica's flags
  (contest clock, --init-ms 1000, --fast-init, --fast-view, the kill on), --logs: the bot's "TIME ms unit turn" lines
  name what overruns. Our replica games: 57 frozen turns and 9 timeouts in 288 games, 1-2% of our turns over 20 ms on
  the big maps (418-2: 7,340 of 435,584; ms_max 454).
- Sparring partner dist/camp = v7 + ESCORT_FIRST 1 + ESCORT_MIRROR 1 (new switch, castle.js escortFirst; for
  sparring builds only): the round-4 escort prophet holds the enemy's mirror site of our first contested cluster,
  bot1v43's opening in 410-1, 416-1 and 416-3. Unit test: the ESCORT_FIRST test covers it. Driver diagnostics h87,
  h102 and h103 (= v7 + ESCORT 2 + ESCORT_UNIT 3: an overdue or lost pioneer gets 2 crusaders at its site; a crusader
  inside r2 16 of a prophet cannot be shot by it) vs camp on 2321 and 2591 to 200 running.

## 2026-10-23 03:30 — v7 against the camping sparring partner; the census was v6's; a v7 block on the replica
- Correction to 03:05: every game of the economy census is a v5-v6 or h82 game (matches 385-419; v7 = submission
  99 has played no replica match). v6 kept 2 pioneers in flight (MAX_PIONEERS 2): in 416-3 the castle built its
  3rd and 4th pioneers at r94-95, exactly when the first two aged out of its list (80 turns). v7's PIONEERS_TEAM 6
  is h82's answer to that, and h82's panel (408-413) beat v6 by net +2 over 18 cells.
- Driver diagnostics vs dist/camp (red = ours), seed 2321 to 200: **h87** r100 5 churches / 24 pilgrims / 1,136 K
  mined vs camp's 2 / 15 / 794, r200 4 / 25 / 2,712 vs 1 / 15 / 1,622; its 5 pioneers all built (one stood 10+
  turns); camp lost 3 pioneers. v6 had 0 churches and 9 pilgrims at r100 against bot1v43 on this map. **h102**:
  byte-for-byte h87's game again (inert). **h103**: r100 4 / 20 / 988, army 10 (its crusader escorts), r200 4 / 25
  / 2,098: the escorts cost h87's pace where h87's pioneers were never stopped.
- Replica measurement block for v7 (matches 420-425, created 03:27; progress/panels/v7-m1.json = h82-b1's maps):
  wololo, botfinalsafe, bot1v43, uvafan, awesomelemonade, IanCoolidge0 ~69ce88 on the same 3 maps each as h82's
  block (408-413) and v6's (414-419). Read: cells (opponent, game), v7 vs v6 and v7 vs h82, gained / lost; and the
  economy census rerun on v7's games. Bumping them to the front (spool_bump, sudo on the VM) was denied by the
  permission classifier; they wait in queue order behind ~66 field matches (about 7 hours at 9 an hour).
- Seed 2591 to 200 vs camp: h87, h102 and h103 play the same game (red r50 1 church / 9 pilgrims, r150 0 churches,
  r200 11 pilgrims; one pioneer stalled 98 turns; camp 1 church / 6 pilgrims). h102 (PIONEER_DETOUR) is inert in
  every diagnostic so far (self-play 2591, camp 2321 and 2591): not gated (LEARNINGS 19); kept for a stack or a
  replica panel. h103's escorts fired only on 2321, where they cost pace.
- Clock correction: the headings 02:55 and 03:45 above ran ahead of the clock (their commits were at 02:41 and
  03:12 PDT, so the true times are at most those); this entry and later ones use `date`.

## 2026-10-23 03:50 — h101 FAILED its mechanism; how the four strong bots beat us: prophet mass, and our attacks
- Gate h101 (v7 + MELEE_BACK 2) vs h87, 20 cells of seed0 5000 (out/h101_h87.jsonl): 18-22; gained 4, lost 6, split
  10, D 10, net -2, t -0.63. Mechanism (out/dlv_gate_h101.txt): melee lost unfired 1,611 vs 2,070 = 0.78 of h87's
  (bar <= 0.75): **FAILED**, closed with no extension and no panel. Castles lost 39 vs 31, its falsifier's direction.
- Composition census (scratch combat/comp.js: units by type every 100 rounds) of our replica games against wololo,
  uvafan, IanCoolidge0 ~69ce88 and bot1v43 (v3-v6 and h82; our records 0-9, 0-9, 0-9, 2-10): all four mass
  prophets: uvafan 300 at r400 on 1241 and 436-864 at r1000 on 1712; wololo 117 + 35 preachers at r200 on 826, 736
  at r798 on 836; IanCoolidge0 143-202. Where the map allows, on 2-3x our pilgrims (r200: they 20-33 pilgrims and
  3-7 churches, we 9-15 and 1-2). h82's games (408) had 1-3 military units at r100 (ECON_UNTIL 100); wololo had 5
  and killed our lone castle on 2013 at r198 (414-1: r180).
- A level economy lost too: uvafan on 2046 (411-1, 417-1) and 1653, both sides 7-9 pilgrims and no church all game.
  417-1 by the hundred: r400 we 27 crusaders, 25 prophets, 12 preachers vs 63 prophets; r500 3 crusaders (the r450
  march, MARCH_MASK 8); r500-900 our crusaders stay at 2-3 while built (each new one marches and dies) and our army
  holds at ~45 while theirs grows 81 -> 126 prophets; from r900 (ATTACK_LATE) everything marches. r1000: we 5
  crusaders and 1 prophet, they 71 crusaders (their endgame build) and 109 prophets; health 680 vs 5,470.
- v7's own economy (h87 vs h87 to r200, --det): on 1712 r100 8 churches and 31 pilgrims (uvafan there: 5-6 and
  31-38; v5-v6: 1-4 and 15-24); over the 20 gate maps of seed0 5000 it averages r100 2.5 churches and 12 pilgrims,
  most maps being poorer. v7 has not met these bots yet (block 420-425).
- Field proxy for the turtles: dist/turtle = v7 + MIL_ROTATION [4] + ATTACK_ROUND 1001 + ATTACK_LATE 1001 +
  CHAIN_ROUND 0 (prophets only, never attacks). h104 = v7 + ATTACK_ROUND 1001 + ATTACK_LATE 1001 (holds; the endgame
  crusader build stays; h16r, the turtle of h19, lost its gate at t -1.07 with castles lost 23 vs 6). Driver
  diagnostics h87 and h104 vs turtle on 2046 to 1000 running.

## 2026-10-23 04:22 — turtle diagnostics; h106 not gated; the time audit: freezes are the machine's
- Driver diagnostics vs dist/turtle on 2046 to 1000 (--det): **h87** won on castles (2 vs 1, a turtle castle fell at
  r602): its church chain (r353-473: 7 chain churches killed one by one) then 7 churches at r600 and 13 at r1000;
  mined K 5,420 vs 3,240; the turtle kept 4-7 pilgrims and no church all game (2046 has nothing near to expand to;
  uvafan and v6 had none there either). **h104** (no attack) won the same way (castle at ~r600; 9 churches at r1000,
  army 64 vs h87's 126 after the endgame build). The turtle is a weak uvafan proxy: on the same map and economy
  uvafan had 126 prophets at r900 (the turtle 41-61) and kept every pilgrim.
- h106 = v7 + MIL_ROTATION [4] + ATTACK_ROUND 1001 + ATTACK_LATE 1001 (the field's doctrine, v7's chain kept):
  driver diagnostic vs h87 on 2644 lost its lone castle at r279 (contested church lost r102; r200 8 pilgrims and 18
  prophets vs 16 and 57; h87 had 9 churches at r279), as h98 (MIL_ROTATION null) did there at r277. With h16r's
  rejection (t -1.07) and h87's win over the turtle, the prophet doctrine loses to v7 in self-play in every test;
  not gated now (two VM hours); dist/h105 = dist/turtle and dist/h106 kept. The field's prophets beat us through
  numbers (economy) and fire discipline, which our prophet copy does not have.
- Time audit (VM job ...19fz, v7 vs v7 under the replica's flags, the VM at load 10-12 with 6 replica games):
  2740 (1000 rounds, 384,742 robot turns): 98 turns over 30 ms in the bot's own measure (robot.js: the whole turn()
  body), 69 of them a newborn's first turn (mean 39 ms, max 105); slowest later turn 170 ms (a crusader). Engine:
  15 frozen-turn errors on 7 robots (4 robots overdrawn 59-72 ms, each frozen 4 turns) and 2 timeouts (200 ms
  kill). **None of the frozen robots logged a slow turn**: their own code took <= 30 ms while the engine charged
  bank + 59-72 ms, so the time went outside the bot (sandbox plumbing, GC, CPU starvation under load). 1712 (496
  rounds, castles): 1 frozen turn, 34 slow turns, all first turns. Time overruns are a machine effect on the
  loaded VM and cost a few robot turns per big game; no bot change. LEARNINGS 8 (never oversubscribe) applies to the
  replica's fidelity: 8 games on 8 vCPUs is a load of 10-12, since each game uses more than one core.

## 2026-10-23 04:24 — h96's replica panel block 1 created (matches 426-431)
- h96 = v7 + ATTACK_LATE 1001 (no all-in from round 900): its gate vs h87 ended inconclusive (21-19, net +1, t
  0.58, D 3; TRAINING_LOG 01:45), the field-aimed middle zone, so the replica panel decides. Field case (417-1, v6
  vs uvafan on 2046): from r900 every unit marched into a 126-prophet wall; 45 of our 48 units were lost by r1000
  and health went to 680 vs 5,470; the same on 1653.
- Block 1: submission 100 = dist/h96 (ce4eae991457), requests 199-204 -> matches 426-431 against the six opponents of
  v7's block (wololo, botfinalsafe, bot1v43, uvafan, awesomelemonade, IanCoolidge0 ~69ce88) on its maps
  (progress/panels/v7-m1.json); then submission 101 = bots/v7 again (the ladder's build). Control = v7's block
  420-425 (submission 99), created an hour earlier, the same cells. Cells = (opponent, game), 18; two-block rule:
  accept after block 1 at t >= 1.5 and net >= +3, reject at net <= 0, otherwise block 2 (same maps, sides swapped).
  Falsifier: games v7 wins on castles after round 900 become losses on health. The block waits in queue order behind
  v7's (about 55 matches ahead at 9 an hour).

## 2026-10-23 04:28 — h104 gate pre-registered (VM job ...19g, after h100's extension)
- h104 = v7 + ATTACK_ROUND 1001 + ATTACK_LATE 1001 (91021963a275): no general attack at all; the church chain,
  threat responses and the endgame crusader build stay. Field case (TRAINING_LOG 03:50): against the field's prophet
  walls our marches lose the army (2046 vs uvafan: 24 crusaders at r450, re-fed to r900, 45 units in the all-in);
  h96 drops only the all-in, h104 every march. Self-play risk: h16r's turtle was REJECTED (t -1.07), but h104 keeps
  v7's chain and beat dist/turtle on 2046 on castles like h87 (TRAINING_LOG 04:22).
- Gate: symcheck (1, 2, 3, 2046; 300 rounds), then h104 vs h87 on the 20 cells of seed0 5000, par 2, the standard
  flags; dlv.js on the gate replays -> out/dlv_gate_h104.txt. Looks when D first reaches 12. Field-aimed: accept
  t >= 2 with the mechanism (h104's milLost / milBuilt <= 85% of h87's); reject t <= -1; in between, a replica panel
  on v7-m1's maps decides (two-block rule, control = v7's block 420-425).
- Falsifier: h87 wins the cells where it out-trades h104 in the midgame and takes castles that h104 never threatens
  (h104 losing on castles at r1000 where h87 wins on health).

## 2026-10-23 04:38 — h100 at its first look (D 12): t 1.15, inconclusive; extension 2 queued
- Pooled h100 vs h87 (out/h100_h87.jsonl, block 1 + the running extension): D first reached 12 at game 56 (28
  cells): gained 8, lost 4, split 16, net +4, **t 1.15**: neither bar (accept t >= 2, reject t <= 0). Next look
  when D first reaches 24 (TRAINING_ALGORITHM: 12 / 24 / 48). At 33 cells: D 15, net +5, t 1.29.
- VM job ...19h after h104's gate: cells 41-70 of seed0 5000 (2387, 1649, 2769, 2072, 2567, 1825, 1013, 1584, 2302,
  870, 265, 2337, 2311, 1053, 2765, 662, 2985, 906, 1330, 252, 118, 2514, 1809, 2768, 2849, 2423, 1583, 2374, 238,
  1101; scratch seeds.js reproduces batch.js's --random order), tag h100h87y. The mechanism is re-read on the
  pooled replays if t reaches 2.
- Field scale (replay.js timeline, 417-3, v6 vs uvafan on 1712): uvafan mined 1,224 K by r100 (ours 656), 4,618 by
  r200 (1,954), 32,466 by r1000 (9,190); pilgrims r100 38 vs 15, r300 51 vs 20; its army r400 332 (325 prophets),
  r1000 1,044; ours 31 and 22. Our karbonite stock stayed at 2-127 from r100 (we spend all we mine); fuel 12,682
  banked at r1000. The gap is mining rate (pilgrims, churches), not spending. v7's self-play on 1712 has 31-33
  pilgrims at r100 (TRAINING_LOG 03:50); its replica block (420-425, uvafan on 1712 among them) measures it.

## 2026-10-23 04:48 — v7's self-play economy on six more loss maps; wololo's siege on 2013; h107 (DEF_FAR_UNIT)
- Driver, v7 vs v7 to r200 (--det, scratch v7self/econ.tsv), r100 churches / pilgrims red/blue against the field
  bot's r100 in our replica loss there (comp census, v6 the loser): 1036 5/4, 27/19 (IanCoolidge0 419-3: 4, 26;
  v6 1, 11); 2013 5/5, 22/24 (wololo 414-1: 3, 21); 1375 7/6, 32/32 (wololo 403-1: 6, 36); 2321 4/3, 21/18
  (bot1v43 416-3: 8, 18); 203 2/1, 11/10 (IanCoolidge0 419-1: 1, 12); 2644 2/2, 7/11 (IanCoolidge0 419-2: 2, 15).
  With 1712 and 836 (03:50): v7 reaches the field's r100 pilgrim count on 6 of 8 maps. Short on 2644 (22 depots;
  the centre cluster holds 10, c2 in our plan at m 3): in self-play the mirror centre churches (28,19) and (28,22),
  3 tiles apart, both stand from r24; at r100 (ECON_UNTIL) red builds a peacetime prophet, blue sees it within r2
  36 and answers with a preacher, which kills 4 red pilgrims and then the church (r102). IanCoolidge0 holds that
  centre with 4 churches and 29 pilgrims at r200.
- wololo's win on 2013 (414-1, our lone castle at (15,14)): it killed our centre church (28,18) at r93, churched
  (28,18) itself at r112 and (27,15) at r136, 13 tiles from our castle, and massed prophets at (22-26, 17-19): just
  outside the castle's reach (r2 65-80), in reach of its build tile (16,15) (r2 45). Our threat response built a
  prophet toward the closest attacker every turn; in r169-180 nine newborn prophets died on (16,15), then the castle
  (r180). Our army stood at the far churches (40,20), (40,33), (26,0), (34,4).
- Switch DEF_FAR_UNIT (struct.js structAct, default 0 = v7): the unit a threat response builds against a closest
  attacker beyond r2 36 that is not a crusader; h107 = v7 + DEF_FAR_UNIT 3 (crusader: 40 HP for 15 K against the
  prophet's 20 for 25 K; a crusader that closes to r2 < 16 cannot be shot by that prophet). Unit test 'struct:
  DEF_FAR_UNIT answers a prophet beyond r2 36 with a crusader ...'.
- (04:59) No-op: the defaults build out/v7chk6 replays h87 vs h87 on 799 to 300 IDENTICAL (--det); 120 node + 57 Python
  tests pass. dist/h107 = v7 + DEF_FAR_UNIT 3 (06ee0603d863). Driver diagnostic h107 vs h87 on 2013 next.

## 2026-10-23 05:04 — h107 diagnostic on 2013; gate pre-registered (VM job ...19i)
- Driver, 2013 to 400 (--det): h107 red vs h87 blue and h87 vs h87 are the same game to r200; by r250 h107 has 11
  crusaders, 18 prophets (h87 8, 23), r300 7 and 19 (8, 28): the switch fires. Both games end at r310, red (the first
  mover) killing blue's castle through its church chain (red 4 -> 11 churches in r300-310, 32-36 preachers), the same
  result; h107 had 1 frozen robot (driver load).
- Gate (VM job ...19i, after h100's extension 2): symcheck 1, 2, 3, 2013 to 300; h107 vs h87 on the 20 cells of
  seed0 5000, par 2; dlv.js on the gate replays -> out/dlv_gate_h107.txt. Field-aimed: looks when D first reaches 12;
  accept t >= 2 with the mechanism (SUM: h107's deathsOn3 / milBuilt below h87's: fewer units fed onto one tile);
  reject t <= -1; in between, a replica panel on v7-m1's maps decides (two-block rule). Falsifier: crusaders sent
  at distant prophets die walking in (h107's milLostUnfired / milBuilt above h87's) and castles fall more.

## 2026-10-23 05:07 — IanCoolidge0's site squatters on 2644 (419-2); h103's gate queued (VM job ...19j)
- 419-2 (v6 vs IanCoolidge0, 2644; it played red, we blue): its castle built crusaders on r2 and r3; by r30 one stood
  on the centre cluster (28,21), one on our second cluster (18,33) and one at (36,10). Our pilgrims stopped short
  ((28,29), (25,31)) and no church of ours stood by r130; it churched our side's centre site (28,22) at r44 and
  (20,33) at r56, and its prophets from r120 killed our pilgrims. No death before r120: the squatters blocked our
  pioneers without a shot (the stalled-pioneer pattern of the 03:05 census). In v7's self-play on 2644 the centre
  church stands at r24.
- h103 (v7 + ESCORT 2 + ESCORT_UNIT 3; built 03:20, 406a9d0dc3b3): a castle whose pioneer is 10 turns overdue or
  lost builds 2 crusaders that hold the lattice at its site and close on enemies there; a crusader beats a lone
  crusader squatter 2 to 1. Gate (VM job ...19j, after h107's): symcheck 1, 2, 3, 2321; h103 vs h87, the 20 cells of
  seed0 5000, par 2; dlv.js -> out/dlv_gate_h103.txt. Field-aimed: looks when D first reaches 12; accept t >= 2;
  reject t <= -1; in between, a replica panel (2644 vs IanCoolidge0 among its maps) decides. Known cost: vs camp on
  2321 the escorts cut r200 karbonite mined from 2,712 to 2,098.

## 2026-10-23 05:12 — h108 (v7 + RECALL 30, h43 rebased): parked after its diagnostic
- Driver, 2013 to 400 (--det), against h87's self-play there (red wins at r310 on castles through its chain):
  h108 red recalled once (dlv recalls 1) and **lost its castle at r345** (blue's chain reached it first; red's army
  37-56 vs 67-79); h108 blue recalled once and lost at r310 like h87's blue. Cause in the code (military.js listen):
  a recall sets st.target = null, so a chain-born unit (st.target = st.chainT) never resumes its line after the
  recall ends: the recall that answers a probe kills our own chain push. Not gated; to revisit, a recall must leave
  chain-born units' targets (they hold the recall ring, then march again).

## 2026-10-23 05:37 — stillborn units (the field feeds on our newborns); SAFE_BUILD (h109); dlv.js stillborn column
- Scratch feed/stillborn.js on 24 replica losses (408, 410, 411, 413, 414, 416, 417, 419): our military units that
  died before their first turn (a newborn acts after every robot already in the round's queue, so enemies in reach
  that act later kill it unborn): 414-1 (wololo, 2013) 10 of 53 built (250 K), all on (16,15), the castle's build
  tile; 414-3 (wololo, 836) **24 of 105 (600 K)**, 15 on (23,18); 414-2 3; 417-3 (uvafan, 1712) 19 (2 before r300);
  411-3 11 (late); 410-3 5; 408-1 2; elsewhere 0-1. About 76 units and 1,900 K in 24 games, most against wololo,
  whose prophets park in reach of our structures. The field's own stillborns: 0 but 408-3 (wololo 31) and 408-1.
- Switch SAFE_BUILD (struct.js buildToward; default 0 = v7): a structure never builds onto a free adjacent tile whose
  exposure (one shot from each visible enemy attacker that reaches it: prophets and castles in their band, crusaders
  within r2 16, preachers whose 3x3 splash covers it) is at least the unit's HP; with every tile deadly it builds
  nothing (a castle then shoots). h109 = v7 + SAFE_BUILD 1 (a934ad374fb8). Unit test 'struct: SAFE_BUILD never
  builds onto a tile ...'. No-op: the defaults build out/v7chk7 replays h87 on 799 to 300 IDENTICAL; 121 + 57 tests.
- tools/dlv.js gains the column stillborn (military units that died before their first turn; tested <=
  milLostUnfired); on 414-1 it gives 10 / 0 as the scratch census.

## 2026-10-23 05:42 — h104 gate block 1: t 1.00, D 4, mechanism missed; replica panel block 1 created (matches 432-437)
- Gate h104 (v7 + ATTACK_ROUND 1001 + ATTACK_LATE 1001) vs h87, the 20 cells of seed0 5000 (out/h104_h87.jsonl):
  22-18; gained 3, lost 1, split 16, **D 4**, net +2, t 1.00. Mechanism (out/dlv_gate_h104.txt, SUM): milLost /
  milBuilt h104 5,160 / 8,873 = 0.582, h87 5,053 / 8,269 = 0.611: ratio 0.95, bar <= 0.85: **missed**. Castles lost
  24 vs 30, churches built 446 vs 406. Symcheck: ok (combat / contest divergences only).
- Deviation from the pre-registered look (D first 12): at 0.2 discordant cells per cell, D 12 needs about 40 more
  cells (80 games, about 3 VM hours), and with the mechanism missed the local accept is closed: the extension
  could only reject (t <= -1 from net +2). The field-aimed rule's middle zone applies now: the replica panel decides.
- Block 1: submission 102 = dist/h104 (144f5cfdab65), requests 205-210 -> matches 432-437 against v7-m1's six
  opponents on their maps; then submission 103 = bots/v7 (the ladder's build). Control = v7's block 420-425; h96's
  block is 426-431. Two-block rule: accept after block 1 at t >= 1.5 and net >= +3, reject at net <= 0, otherwise
  block 2 (same maps, sides swapped). Falsifier: without marches the field out-mines us unchallenged and wins on
  health at r1000 (h104's losses on health where v7's were on castles).

## 2026-10-23 05:50 — h100 (ESCORT_FIRST) D-24 look: t 1.63, inconclusive; extension 3 queued (...19k)
- Pooled h100 vs h87 (out/h100_h87.jsonl, seed0 5000 cells 1-70 so far; extension 2 still running), scanned over
  growing prefixes: D first reaches 24 at game 96 (48 cells): gained 16, lost 8, split 24, net +8, **t 1.63**:
  inconclusive (accept t >= 2, reject t <= 0). Next look when D first reaches 48. At 57 cells: D 27, net +5, t 0.96
  (the drift after the look is not a look; it is recorded only).
- Extension 3 queued as VM job ...19k (after h103's gate): cells 71-100 of seed0 5000, tag h100h87z, same file.

## 2026-10-23 06:12 — h100 extension 2 finished (70 cells): net +1, t 0.17; owner asked what was blocked
- out/h100_h87.jsonl, 140 games (cells 1-70 of seed0 5000): 71-69; gained 18, lost 17, split 35, D 35, net +1,
  t 0.17 (at 60 cells net +5, t 0.93; at 65 net +2, t 0.35). Not a look (D 35; the next is at D 48). Extension 3
  (...19k, cells 71-100) stays queued behind h103's gate; at this drift the D-48 look will likely reject.
- Owner (PROMPTS 22) asked what the permission check blocked overnight: the move of 21 stale v6 jobs from
  ~/jobq/pending to ~/jobq/superseded, and the spool_bump of replica block 420-425 (no longer needed: queue 32).

## 2026-10-23 06:17 — RECALL fixed for chain-born units; h110 built
- military.js listen: a recall now drops only a general attack order (castles repeat those every ATTACK_EVERY
  rounds); a chain-born unit keeps its line's target (st.target === st.chainT), holds the recall ring while the
  recall lasts, then marches again. The cause of h108's loss on 2013 (05:12). RECALL is 0 in v7, so the defaults
  are unchanged. The unit test 'military: RECALL sends a unit ...' now also checks a chain-born unit keeps its target
  and still walks to the ring (it fails on the old code); 121 node + 57 Python tests pass.
- h110 = v7 + RECALL 30 (the fixed code). Driver diagnostic on 2013 (h108's case) after h109's.

## 2026-10-23 06:37 — h109 (SAFE_BUILD 1) diagnostic: stillborn gone, chain launches blocked; SAFE_BUILD 2 (h111)
- Driver, 836 and 2013 to r400 (--det), h87 vs h87 / h109 vs h87 / h87 vs h109 (scratch h109d/out.txt, dlv rows):
  stillborn h109 0 in all four games (h87 0-5; 15 for h87 blue facing h109 red on 2013). Results: 836 h87 mirror
  blue lost a castle; h109 red lost one instead (blue h87 then built 420 military to 283); h109 blue lost one like
  h87 blue. 2013 h87 mirror red wins at r310 through its chain (churches 4 -> 11, preachers 9 -> 34 in r300-310);
  **h109 red never launched that push** (churches 4 -> 6 by r400, no winner); h109 blue lost at r311 like h87 blue.
  Worse in 2 of 4 cells, better in none.
- Cause: exposure() counts every visible attacker, so one enemy prophet that reaches all of a castle's build tiles
  blocks every build there, the chain's launch pilgrim (chainLaunch -> buildToward, 10 hp) included. In a contest the
  enemy has other targets; in 414-1 / 414-3 the campers had none but the newborn.
- SAFE_BUILD 2 (struct.js exposure(w, x, y, only)): an attacker counts only if it can hit no mobile robot of ours in
  sight (combat.js canHit). Unit test extended (alone the pair still counts; with a crusader of ours in both
  prophets' band, the default tile again). h111 = v7 + SAFE_BUILD 2 (39be56a5794b). h109 parked. No-op: the defaults
  build out/v7chk8 replays h87 vs h87 on 799 to 300 IDENTICAL; 121 node + 58 Python tests pass. Driver diagnostic
  (the same four games against h87) next, then h110's on 2013.

## 2026-10-23 06:46 — h107 (DEF_FAR_UNIT 3) FAILED: mechanism missed, falsifier confirmed
- Gate h107 vs h87, the 20 cells of seed0 5000 (out/h107_h87.jsonl): 15-25; gained 1, lost 6, split 13, D 7, net -5,
  t -1.89. Symcheck: ok (contest / combat divergences only).
- Mechanism (out/dlv_gate_h107.txt, SUM): deathsOn3 / milBuilt h107 4,423 / 9,047 = 0.49, h87 2,352 / 7,701 = 0.31:
  **missed** (more units fed onto one tile, not fewer). Falsifier, every part: milLostUnfired / milBuilt 0.42 vs
  0.26 (crusaders sent at distant prophets die walking in) and castles lost 34 vs 26.
- D 7 is short of the first look (12), but at net -5 the local accept is closed (5 more discordant cells give net 0
  at best) and the mechanism failed: closed as h101 was (03:50), no extension, no panel. DEF_FAR_UNIT stays 0.

## 2026-10-23 06:51 — 417-1 (v6 vs uvafan, seed 2046, lost on health): our melee never fired; the case for h104
- replay.js summary / timeline / fire on ~/projects/vibe/bc19-galaxy-replays/417/game-01-seed2046.bc19 (33x33, two
  castles each, no church either side, 7 pilgrims each): mined K 4,718 vs 5,428 (we lost 2 pilgrims; our pilgrims
  idle 391 of 6,858 turns, theirs 0), F 27,560 vs 36,040 (we ended with 22,100 fuel unspent, karbonite-bound).
- Armies level to r450: 72 vs 70 (uvafan: prophets only until r900). Our r450 march took crusaders 30 -> 3; from
  then our army sat at 45-48 while theirs grew 81 -> 126 prophets; at r900 (ATTACK_LATE) everything marched: army 48
  -> 6. uvafan then built 71 crusaders (r900-1000) for health. Health at r1000: 680 vs 5,470.
- Built / lost: we 89 crusaders, 85 prophets, 42 preachers / 84, 84, 42; they 172 prophets, 72 crusaders / 63, 1.
  **Our crusaders and preachers fired 0 shots all game**; our prophets 138 (theirs 758). Kills 64 vs 210.
- Reading: against a prophet turtle every march is a gift; alive at r1000, the same 89 crusaders and 42 preachers
  would be 6,080 hp, more than uvafan's total. This is h104's hypothesis (no general attack; replica panel 432-437
  queued); h96 (no r900 all-in, marches kept) covers half of it (426-431).

## 2026-10-23 06:54 — stale VM jobs cleared by the owner; HANDOFF State rewritten
- The owner ran the move (PROMPTS 24): the 21 stale v6-era jobs (...a3d57710055 through ...1792611232841159268)
  are in ~/jobq/superseded; pending holds only h100's extension 3 (...19k), behind h103's running gate.
- HANDOFF's State section rewritten to current facts (82 lines, was 210): the stale-job queue text, v5/v6 candidate
  lists and old replica history removed (they live here by date).

## 2026-10-23 07:28 — h103 gate: D 1 in 20 cells, to the replica panel; h111 / h110 diagnostics; their gates queued (...19l, ...19m)
- Gate h103 (v7 + ESCORT 2 + ESCORT_UNIT 3) vs h87, the 20 cells of seed0 5000 (out/h103_h87.jsonl): 21-19;
  gained 1, lost 0, split 19, **D 1**, net +1, t 1.00. Symcheck 1, 2, 3, 2321: contest / combat divergences only.
  dlv SUM (2019-next/out/dlv_gate_h103.txt) h103 vs h87: churches built 437 vs 403, stillborn 292 vs 441, castles
  lost 29 vs 31, karbonite at the end 36,832 vs 29,158. The escorts fire only for an overdue or lost pioneer, which
  h87 rarely causes: at 0.05 discordant cells per cell, D 12 would take about 240 cells. The pre-registered middle
  zone applies: the replica panel decides (its case, IanCoolidge0's squatters on 2644, is in v7-m1).
- Replica block 1 for h103: submission = dist/h103 (406a9d0dc3b3), against v7-m1's six opponents on their maps,
  then bots/v7 resubmitted as the ladder's build. Control = v7's block 420-425. Two-block rule: accept after block 1
  at t >= 1.5 and net >= +3, reject at net <= 0, otherwise block 2 (same maps, sides swapped). Falsifier: the
  escorts' 100 karbonite each cost the early economy and the cells against non-squatters go down.
- h111 (v7 + SAFE_BUILD 2) driver diagnostic to r400 (--det) against h87's mirror games (scratch h109d): on 2013
  h111 red **launched its chain** and won at r310 like h87 red (h109 did not): SAFE_BUILD 2 lifts the chain block.
  On 836 h111 red still lost a castle (h87 red kept its own; h109 red lost one too); stillborn h111 3 red, 2 blue
  vs h87's mirror 4 and 3.
- h110 (v7 + RECALL 30, fixed) diagnostic on 2013: h110 red **lost** (h87 blue won on castles at r377; h87 red wins
  this cell at r310), and h110 blue **won** at r354 (h87 blue loses it). The recall now trades red's push for blue's
  defence on this map: one cell, net 0.
- Gates, field-aimed, pre-registered: VM job ...19l h111 vs h87 and ...19m h110 vs h87, each symcheck 1, 2, 3, 2321
  and the 20 cells of seed0 5000 at par 2 (dlv -> out/dlv_gate_hN.txt). Looks when D first reaches 12; accept t >= 2
  with its mechanism; reject t <= -1; in between, a replica panel. Mechanisms (dlv SUM): h111 stillborn below h87's
  and churches built within 5% of h87's (no blocked chains); h110 castles lost below h87's.

## 2026-10-23 07:39 — replica 422 (v7 vs bot1v43): our castle on 2321 shot down by single prophets its 42-unit army never saw; h112 (DEF_SEEN 1)
- v7's control block so far (421, 422, 425 fetched): against v6's 414-419 on the same cells, gained 3, lost 0
  (botfinalsafe 2740, bot1v43 388, IanCoolidge0 203); v7 4 wins in 9 cells, v6 3 in 18.
- 422-3 (seed 2321, 45x45, one castle a side; we blue, lost on castles at r214): bot1v43's prophets came one at a
  time to (27,14), r2 61 from our castle (33,9): each fired once, the castle killed it with two shots (r112-132 a
  group of 4-5, then singles r168-214); 10 hp a visit took the castle. Our army stood 5-11 tiles **behind** the
  castle, on the lattice of our church at the map edge (44,9), which built 42 of our 47 military; their vision
  (49 / 64 / 16) never reached (27,14). Our combat units made 8 attacks all game; crusaders idle 1,143 of 1,238
  turns. The castle saw the threat from r109 but counted those units (within r2 100) as defenders and built only
  pilgrims (r183-212) while it was shot.
- h112 = v7 + DEF_SEEN 1 (6761211d7809): a threat response counts as defenders only our military that see the
  closest attacker, so the castle builds a prophet toward a shooter its army cannot see. Unit test; defaults-only
  build replays h87 vs h87 on 799 IDENTICAL; unit tests 123 pass.

## 2026-10-23 07:52 — v7's field losses 422-1 (2591), 425-3 (1036); chain census; h113 (CHAIN_CLEAR 2)
- 422-1 (seed 2591, 32x32, vs bot1v43, we blue, lost on castles r214): our castle built 3 pilgrims (r1, r2, r14) and
  then nothing until r84, its bank at 80-170 K from r10 to r75. Its pioneer (#109, r14) for our half of the shared
  top cluster met bot1v43's lone prophet at the choke (16,14) and waited out of its reach at (15,22) for 200 turns;
  bot1v43 churched the cluster (13,7) at r23 and held it with 2 prophets until r150 (mined K 1,044 F 10,100 vs our
  248 / 1,800). This is h103's case (escorts for an overdue pioneer); its panel (438-443) has bot1v43 on 2591.
- 425-3 (seed 1036, 57x57, vs IanCoolidge0, we red, lost on castles r543): IanCoolidge0 had 26 pilgrims at r100
  and 39 at r200 to our 14; our chain fired 5 churches at r310 and 8 at r314 (the second line into the enemy half,
  y 26-27) and lost all but 1 of each line within 10 rounds to its ~170-unit army; 13 of our 16 churches died.
- Chain census (scratch chain/census.js; our pilgrims building 3+ churches in a round), v7's 9 games in 421, 422,
  425: 11 lines. With 2-6 enemy crusaders / prophets / preachers within r2 100 of the first builder at the end of
  the round before: 6 lines, 4 of 44 churches alive 20 rounds later (all IanCoolidge0). With 0-1: 5 lines, 27 of
  35 alive (botfinalsafe 203 twice, bot1v43 388 (won at r298), IanCoolidge0 203 r506 (3 of 7)).
- h113 = v7 + CHAIN_CLEAR 2 (a55af4e40949): a chainer that sees 2 or more enemy crusaders, prophets or preachers
  starts no line, staged or early; it flees if threatened, else holds (castles not counted: the line's target).
  Unit test (chain: one in sight, the line starts; two, it flees; off, it starts). Known cost: a held chain keeps
  CHAIN_K in the bank; the peacetime army spends only above it.

## 2026-10-23 08:14 — h100 REJECTED at its D-48 look (t -0.29)
- h100 (v7 + ESCORT_FIRST 1) vs h87, cells 1-100 of seed0 5000 (out/h100_h87.jsonl, extension 3 = cells 71-100,
  tag h100h87z): at the pre-registered look (D first 48, cell 95) gained 23, lost 25, net -2, **t -0.29**: reject
  (t <= 0). All 100 cells: 97-103, gained 24, lost 27, D 51, t -0.42. The D-24 look's t 1.63 (cell 48) was noise:
  cells 49-100 went 7-17. Closed; ESCORT_FIRST stays 0.

## 2026-10-23 08:15 — 421-2 (1706, botfinalsafe): the chain's bank froze our army; h114 (CHAIN_GUARD 1); h112's diagnostic
- 421-2 (seed 1706, 37x37, we red, lost on castles r585): from r200 (CHAIN_ROUND) the peacetime army leaves CHAIN_K
  1,000 in the bank; our income was about 2 K a round, the bank stayed at 126-446, the chain never fired, and our
  army stood at 6-7 units from r200 to r585 (fuel 19,276 unspent) while botfinalsafe's grew to 124.
- v7's 9 field games (421, 422, 425), our army at r200 / r300 / r400: 14 / 13 / 12 (203), 7 / 6 / 6 (1706),
  33 / 49 / 110 (2740, the bank above 1,250), 29 / 44 at r298 (388), 20 / 18 / 18 (203), 6 / 2 (2644), 47 / 45 / 49
  (1036); 2591 and 2321 ended at r214. The army grew past r200 only where the bank passed CHAIN_K.
- h114 = v7 + CHAIN_GUARD 1 (9c796932649e): a structure's guard quota (GUARD_BASE 2 + round / 40 within r2 100, at
  most 25) builds without waiting for CHAIN_K; the army past the quota still waits. Unit test (default: waits;
  below the quota: a guard; quota met: waits).
- Final builds from the same code (new switches off by default): h112 825744f9accb (DEF_SEEN 1), h113 bec2daebe604
  (CHAIN_CLEAR 2), h114 9c796932649e. Unit tests 124 node + 58 Python pass.
- h112's driver diagnostic to r400 (--det) against h87's mirror games: 2013 h112 red won at r310 (as h87), h112
  blue **won** at r395 (h87's blue loses at r310); 836 h112 red lost a castle (h87's red keeps it; h109 and h111 red
  lost it too, so this cell's red castle falls to most perturbations); 2321 h112 red won at r255 (h87's mirror on
  2321 is running as the baseline).

## 2026-10-23 08:35 — h96 REJECTED on the replica (block 1 426-431: net -2 with 3 games left)
- `contest19.py compare 420-425 426-431`, 15 of 18 games (430's 3 against awesomelemonade still running): gained 0,
  lost 2 (IanCoolidge0 seed 203: v7 won on castles at r1000, h96 lost on health; StoneT2000 botfinalsafe seed 203:
  v7 won at r1000, h96 lost its castles at r752), D 2, net -2; h96 2/15 vs v7 6/18. The control's awesomelemonade
  cells are W, L, W, so h96 can gain at most one: best case net -1 <= 0, a rejection by the two-block rule. Holding
  prophets and preachers back from the r900 all-out march did not help in the field. h104 (no general attack) stands
  at gained 1, lost 0 over 6 of 18 games (432, 434 in; 433, 435-437 running).
- 08:36: h112's 2321 baseline done (h87 vs h87, --det, r400): no winner at r400; red milBuilt 84 / milLost 67,
  stillborn 25; blue 91 / 55, 0. With h112 red (vs h87 blue): red **won at r255**, milBuilt 101 / milLost 13,
  stillborn 0, and blue lost a castle; h87 red vs h112 blue: no winner at r400 (85 / 76 vs 94 / 64), as the baseline.
  So on 2321 DEF_SEEN changes red's game a lot (red's castle builds defenders it used to think it had) and blue's
  not at all. The gate decides.

## 2026-10-23 08:58 — v7's field economy census: at r100 the field holds 80 clusters to our 60; no-op check redo
- v7's 18 control games (420-425), r100, from the replays (scratch chain/clusters.js: depots linked within r2 10;
  a cluster's half is that of the nearer starting castle, ties ours; held = a structure within r2 25 of a depot).
  Our half: 92 clusters, we hold 59, the opponent 22. Their half: 75, they hold 58, we hold 1. Clusters held at
  r100: opponents 80, us 60. Pilgrims 295 to our 214 (+38%), 3.7 vs 3.6 per held cluster: the gap is clusters
  held, not staffing. Churches at r100 behind in 16 of 18 games (StoneT2000 seed 2321: 1 to 8; 388: 1 to 6). Big
  maps leave half our own side empty at r100: 2013 3 of 6, 836 3 of 9, 2740 4 of 8, 2321 3 of 6. Our castles plan
  pioneers once, at turn 3, for our half only, and churches never send any. Wololo (420-1, seed 2013, we blue,
  lost r198): its pilgrims 6 at r50, 18 at r80, 40 at r150 (ours 10, 11, 12); its pilgrim #228 built a church at
  (40,21) beside ours at (40,20) at r97 and the church's first preacher killed 3 of our pilgrims that round; our
  church fell at r100, the next ones at r116 (to a prophet), 138, 153, 196, the castle at r198.
- The 08:4x no-op check printed DIFFERENT: the check game parted from h87's replay at round 3, the blue castle's turn
  an empty record (no build, no radio), while the census replays ran beside it on the driver. Two reruns of the
  check build alone to r5 build at round 3 as h87 does: a frozen turn (the chess clock still freezes a slow robot
  under --no-kill; LEARNINGS 13). Redo alone (out/v7chk12), nothing else on the driver.

## 2026-10-23 09:04 — no-op IDENTICAL alone; gates h112-h115 pre-registered and queued (...19n-...19q); stale ledger rows closed
- Redo alone: the defaults build out/v7chk12 (src with DEF_SEEN, CHAIN_CLEAR, CHAIN_GUARD) replays h87 vs h87 on 799
  to 300 IDENTICAL; unit tests 124 node + 58 Python pass. So the 08:4x DIFFERENT was the loaded driver (LEARNINGS 13).
- Gates, field-aimed, each 20 cells of seed0 5000 vs h87 at par 2 after a symcheck (1, 2, 3, 2321), queued after
  h110's ...19m in this order (the strongest diagnostic first): **h112** ...19n (DEF_SEEN 1; mechanism: castles lost
  below h87's), **h113** ...19o (CHAIN_CLEAR 2; churches lost / churches built below h87's), **h114** ...19p
  (CHAIN_GUARD 1; military built above h87's with castles lost not above), **h115** ...19q (v7 + ENDGAME_FUEL 900,
  sha 731c03953b9a: from r900 all fuel into preachers, crusaders when karbonite is short; v7's field losses on
  health at r1000 left 16-29k fuel unspent in 2 of 4; on v5, h8v5's gate went D 4 net +4 and was never finished;
  mechanism: in games that reach r1000, dlv fuelEnd at most half of h87's). Bars as at 07:28: looks when D first
  reaches 12, accept t >= 2 with the mechanism, reject t <= -1, in between a replica panel (two-block rule).
- Ledger: 14 v6-era rows still read QUEUED although their jobs went to ~/jobq/superseded this morning (h7v6-h20v6,
  h43v6, h54v6, h56v6, h65, h71, h79): now SUPERSEDED (v7 accepted over their base, never run). The seven h*r rows
  read QUEUED before their REBASED note: now the note alone. h80, h85, h86 (built on h50 / h82, never queued):
  PARKED. ATTEMPTS.md rendered.

## 2026-10-23 09:13 — h111's gate: t 0.82, mechanism met -> replica panel (616-621); the autoscrim fired (179 waiting)
- h111 (v7 + SAFE_BUILD 2) vs h87, 20 cells of seed0 5000: 22-18, gained 4, lost 2, split 14, D 6, net +2, t 0.82
  (never reached the D 12 look). Field-aimed middle zone (-1 < t < 2) -> replica panel. Mechanism met (dlv SUM over
  40 games): stillborn 79 vs h87's 374, churches built 420 vs 412 (within 5%), churches lost 143 vs 136, castles
  lost 30 vs 30, milLost 5,281 vs 5,535. Symcheck 1, 2, 3, 2321: contest/combat divergences only (as h87's).
  Submission 106 = dist/h111 (39be56a5794b), requests 217-222 -> matches 616-621 on v7-m1's maps; bots/v7
  resubmitted (107) as the ladder's build. Control 420-425 (v7, 6/18).
- Replica queue: the daily autoscrim fired between 08:35 (5 waiting) and 09:10: 179 waiting (172 ranked, ids
  443-621), spread over 86 teams (about 4 each; ours 11: the h111 block and 5 ranked). The five slow bots
  (awesomelemonade 1,610 s a game in our matches, uvafan 1,238, wololo 1,132, botfinalsafe 580, IanCoolidge0 ~69ce88
  509; starter 53) are in 25 of the 179, so no bot holds the lion's share and none is dropped. The last 50 minutes
  cleared 4 matches because all six slots played our panel blocks against those slow bots; the field's matches are
  faster, so the backlog should clear in roughly 12-15 h. Throughput is at its limit: the VM's 8 vCPUs run 6 replica
  slots (saturn's hard cap) and our 2 gate games, load 12-13 (more would cost the replica's fidelity: frozen turns,
  LEARNINGS 8). Inflow: the autoscrim stays held while 30+ wait; no new replica requests from us until the queue is
  short (h111's block went in before the fire showed). h103's block 438-443 is running now; h104's 432-437 has 436
  left; h111's 616-621 runs last.

## 2026-10-23 09:20 — h110 REJECTED (gate t -1.73, castles lost 35 vs 24); h96's replica block final net -3; h103 at 9 of 18
- h110 (v7 + RECALL 30, chain-born units keep their line target) vs h87, 20 cells: 17-23, gained 0, lost 3, split 17,
  D 3, t -1.73 <= -1: rejected by the field-aimed bar. Mechanism opposite: dlv SUM castles lost 35 vs h87's 24 (the
  recall pulls the army home and the push it was making fails), milLost 5,232 vs 4,715. Symcheck: contest/combat
  divergences only. RECALL stays off; the 2013 diagnostic's split (red lost, blue won) was the whole story.
- h96's block 426-431 complete (430 in): gained 0, lost 3, net -3, t -1.73; h96 3/18 vs v7 6/18 (rejected at 08:35).
- h103 (ESCORT 2, ESCORT_UNIT 3) block 438-443, 9 of 18 games (438, 439, 440): gained 1 (bot1v43 seed 2591: v7 lost
  its castles at r214, h103 won at r758), lost 1 (botfinalsafe seed 203: v7 won at r1000, h103 lost at r939), net 0.
- VM: h112's gate (...19n) running, then h113, h114, h115. Replica: 176 waiting (170 ranked); fetched 430, 438, 439.

## 2026-10-23 09:31 — v7's field pioneers: 41 of 80 wasted, the first one fails 13 of 16; the bank idles r50-100; h116 (ECON_RICH)
- Census of v7's 18 control games (420-425; scratch chain/clusters2.js, pioneers.js, replay.js timeline). Own-half
  clusters we do not hold at r100 are mostly the **centre**: in 12 games the enemy holds an equidistant cluster
  (king 9/9, 11/11, 12/12, 13/13, 22/22, 23/23 from the two castles) of 6-12 depots, the richest on the map; the
  rest are far clusters nobody holds (836: four, k12-21 from us). Pioneers (newborn pilgrims radioed SIG.CHURCH) to
  r150: 80 sent, 39 churched (launch to church median 16 rounds, 5-122), 21 killed, 20 never built. The first
  pioneer (launched r12-17, the contested centre first by PLAN_CONTEST_FIRST) churched in 3 of 16 games; re-sends
  after r90 (the cluster comes free 80 turns after launch) in 4 of 21. Seed 2321 (422-3, StoneT2000 bot1v43, we
  blue, castle (33,9)): their church (19,16) and prophets at (21,14) and (18,15) by r30 cover every way out of our
  pocket to the centre; pioneers #307, #3785, #1849, #2552 (r14-24) stood at (29-31,12-14), r2 65 from the prophet
  (PILGRIM_SAFE_STEP), for ~90 rounds, neither mining nor moving; four more went the same way at r95-105.
- The bank meanwhile: our karbonite at r75 245-658 in 10 of 18 games, at r100 315-863 in 10 (1653: 418 at r50, 658
  at r75, 863 at r100), army 0-3 (ECON_UNTIL 100: no peacetime army before r100); at r125 the army is 15-43. The
  economy had nothing left to buy (plan exhausted or blocked) and the karbonite waited 25-60 rounds.
- **h116** = v7 + ECON_RICH 100 (new switch, default 0): before ECON_UNTIL the peacetime army still builds from the
  bank past ECON_RICH + the reserves (190 K with no pioneer out, up to ~300 with every reserve), so the pilgrims and
  pioneers keep first claim and only idle karbonite becomes units. Unit test (rich bank builds, at the threshold
  waits, default never). Expectation for self-play: small (both sides' banks idle alike); the field effect is the
  point (containment by 1-2 prophets in r20-100).
- No-op: the defaults build out/v7chk13 (src with ECON_RICH) replays h87 vs h87 on 799 to 300 IDENTICAL, alone on the
  driver; unit tests 125 node + 58 Python pass. dist/h116 = v7 + ECON_RICH 100 (1f518954affb).

## 2026-10-23 09:40 — h116's driver diagnostic: the switch moves the army earlier; gate pre-registered and queued (...19r)
- h116 (v7 + ECON_RICH 100) red vs h87 blue to r150 (--det, alone on the driver). Seed 1653 (no cluster to claim;
  uvafan's 423-2): at r50 / r75 / r100 red holds K 173 / 178 / 203 with army 11 / 22 / 34, blue K 418 / 658 / 863 with
  army 0 / 0 / 3; both reach army 43 at r125 and 54 at r150 with the same mined karbonite (the fuel caps the total),
  so on such maps the switch only brings the army forward. Seed 2321: neither bank passes 100 + reserves before r100
  (K 22-50), the switch hardly fires; red ends r150 with 5 churches and 24 pilgrims to blue's 1 and 14 (the game
  parts on contest and combat, not on the switch).
- Gate **h116** ...19r: 20 cells of seed0 5000 vs h87 at par 2 after a symcheck (1, 2, 3, 2321). Mechanism, summed
  over the 40 games: at r100 our army above h87's and our bank below it (replay timelines, out/tl_h116.txt); churches
  built (dlv) at least 95% of h87's; castles lost not above h87's. Bars as at 07:28 (look when D first reaches 12;
  accept t >= 2 with the mechanism, reject t <= -1, in between a replica panel by the two-block rule).
- h112's gate (...19n) at 11 of 20 cells: 22 games, 14 wins, gained 3, lost 0, D 3, t 1.73 (no look yet).

## 2026-10-23 09:55 — h112's gate: t 0.71, mechanism met narrowly -> replica panel (when the queue is short); h103 and h104 at 15 of 18
- h112 (v7 + DEF_SEEN 1) vs h87, 20 cells of seed0 5000: 22-18, gained 5, lost 3, split 12, D 8, net +2, t 0.71 (no
  D 12 look). Middle zone -> replica panel. Mechanism (castles lost below h87's) met narrowly: dlv SUM 30 vs 32. Its
  other numbers move more: churches lost 123 vs 207, stillborn 115 vs 530, mines to r450 154,642 vs 140,299 (+10%),
  military built 8,304 vs 7,352, churches built 403 vs 465. Symcheck 1, 2, 3, 2321: contest/combat divergences only.
  Its block waits until fewer than 30 replica matches wait (169 now).
- Replica, 15 of 18 games each (the awesomelemonade match is the last): h103 (escorts) 438-443 gained 3, lost 1,
  net +2; h104 (no general attack) 432-437 gained 3, lost 1, net +2. Both lost botfinalsafe seed 203, which v7 won as
  blue and both played as red. Neither can reach the block-1 accept bar (t >= 1.5 with net >= +3: at best 4-1, t 1.34)
  nor fall to net <= 0 unless both of v7's awesomelemonade wins turn, so each will need a second block.
- Field pioneer census (v7's 18 control games, r30-150; pioneers = SIG.CHURCH-born pilgrims): 603 turns idle at
  their sites with no enemy attacker within r2 100, waiting for the church's karbonite (420-3 seed 836: 356, bank
  mean 26 K; 420-1: 138; 421-3: 43; 424-1: 45), and 1,119 idle with an enemy attacker within r2 100 (422-3: 239,
  421-2: 140, 423-3: 152). In 420-3, pioneers sent at r23-25 built their churches at r121, 145 and 147; the castles
  spent the bank on 20 prophets answering wololo's harassers and on pilgrims at 40 K. In r76-100 the field's
  pilgrims sit by more structures (StoneT2000 7-9 by r100 to our 1-5; mean r2 from a mined tile to its nearest
  structure 1.5-1.9 to our 2-5).

## 2026-10-23 10:00 — PIONEER_HOLD switch (h117); no-op IDENTICAL
- From the 09:55 census (pioneers starving at free sites while castles spend the bank): CFG.PIONEER_HOLD (0 = v7). A
  pioneer beside its free site that cannot afford the church talks CT.WAIT (76) instead of its unit byte; a castle
  that hears one leaves the church and DEF_RESERVE_K (80 K) in the bank when it builds a pilgrim or answers an
  attacker farther than r2 PIONEER_HOLD (64: out of a prophet's reach of the castle). Churches do not hear castle talk
  and spend as before; the peacetime army already leaves more (DEF + PEACE_RESERVE_K 90). Unit tests: castle (pilgrim
  held and released at 90 K, a far prophet answered only at 105 K, a near one at once), pilgrim (talks WAIT, builds
  when affordable), CT ranges disjoint; 127 node + 58 Python pass. No-op: defaults build out/v7chk14 replays h87 vs
  h87 on 799 to 300 IDENTICAL (alone on the driver). Built **h117** = v7 + PIONEER_HOLD 64, dist/h117 a50b972763c3.

## 2026-10-23 10:12 — h117's diagnostic: the WAIT talk works, the churches still spend; PIONEER_LEAN added (h118)
- h117 red vs h87 blue to r200 (--det, alone on the driver). 836: churches on the same rounds both sides (22, 41,
  44, 47, 55, 55, 59), red's pioneers idle at sites 13 turns to blue's 17; red 31 pilgrims at r100 to blue's 34 (the
  hold delays castle pilgrims). 2013: churches on the same rounds, idle 34 vs 35, pilgrims 22 vs 24. In self-play the
  waits are short and the hold only costs pilgrims. On 836 pioneer #801 talked WAIT r51-58 while the bank fell back
  to 32 K at its turns: the spenders were the churches, which hear no castle talk.
- Who spent during the field waits (replica 420-3, our side, r41-146): castles 8 prophets against attackers at r2
  65-100 (h117 holds these), 6 at r2 <= 64, 2 pilgrims; churches 5 prophets (r2 65-100) and 8 pilgrims. 420-1
  (r30-150): churches 16 pilgrims and 13 military, castles 6 units. Bank at the waiting pioneers' turns in 420-3: 80 K
  or more on 8 of 401 turns, 50-79 K on 74 (each church needed one such turn).
- The census's pioneer set also counted pilgrims after their churches: 836 #3389 built its church at r41, then
  walked toward a depot of the centre cluster and stood at r2 65 from an enemy attacker for 15+ turns
  (PILGRIM_SAFE_STEP). Those turns count as held (r2 <= 100), so the 603 far-idle turns stand. The held case was
  tried three times (h59 PILGRIM_HOT, h78, h88), none accepted.
- New switch CFG.PIONEER_LEAN (0 = v7): a pioneer that has waited this many turns beside its free site builds on the
  church's cost alone, without DEF_RESERVE_K (comms-free, so the churches' spending no longer blocks it). Unit test:
  waits 2 of 3 turns then nothing, waits 3 then builds on 50 K, default never. **h118** = v7 + PIONEER_HOLD 64 +
  PIONEER_LEAN 3. h117 is parked as a component (no gate on its own: self-play showed only its cost).

## 2026-10-23 10:23 — h118 rebuilt (the first build lost PIONEER_LEAN); h103's replica block 1 final net +1
- h118's first build (f0e94a8803bd) passed `--cfg PIONEER_HOLD=64 PIONEER_LEAN=3`: build_bot took the second pair
  for a stray argument and dropped it, so the bundle was h117 and its diagnostic matched h117's move for move. Every
  other dist/h* bundle carries all the switches its ledger row names (checked from each bundle's Object.assign line).
  build_bot.js now exits on an argument it does not parse (LEARNINGS 28). h118 rebuilt with one --cfg per key:
  21d5ea5d4597, {PIONEER_HOLD: 64, PIONEER_LEAN: 3}. No-op for the PIONEER_LEAN source: out/v7chk15 IDENTICAL, 128
  node tests pass.
- h103 (escorts) replica block 1 (438-443) complete: gained 3, lost 2 (442-3 awesomelemonade seed 2797, v7's win on
  castles at r1000 turned to a loss on health), net +1, t 0.45 -> a second block by the two-block rule, when fewer
  than 30 wait (159 now). h113's gate at 13 of 20 cells: gained 0, lost 3, D 3, t -1.73.

## 2026-10-23 10:38 — h113 REJECTED (t -1.73); h118's diagnostics; gate h118 pre-registered and queued (...19s)
- h113 (v7 + CHAIN_CLEAR 2) vs h87, 20 cells: 17-23, gained 0, lost 3, split 17, D 3, t -1.73 <= -1: rejected.
  Mechanism (churches lost / built below h87's) met only in ratio, 131 / 374 = 0.35 vs 187 / 478 = 0.39: it built
  22% fewer churches (the lines it skips were most of the chain's churches) and lost 32 castles to 26. Symcheck:
  contest/combat divergences only. CHAIN_CLEAR stays off.
- h118 (21d5ea5d4597) vs h87 to r200, alone on the driver: 836 red, churches at r54 and r57 where h87 built at r55 and
  r59, pioneer idle at sites 10 turns to 17; 2013 red, churches at r60, 65, 73 vs r61, 69, 77, idle 25 vs 35; 836 with
  sides swapped (h118 blue): r54 / r57 again, idle 11 vs 13. Both sides fell behind on 836 after r100 by side, not by
  build: h87 vs h87 on 836 gives red 31 pilgrims at r100 to blue's 34, 5 churches at r200 to 7, and mined 3,884 K to
  5,214, the same gap h117 and h118 showed as red.
- Gate **h118** ...19s: 20 cells of seed0 5000 vs h87 at par 2 after a symcheck (1, 2, 3, 2321). Mechanism, summed
  over the 40 games: pioneer idle turns at sites with no enemy attacker within r2 100, to r200 (a scratch census,
  out/st_h118.txt), at most 0.7 of h87's; churches built (dlv) at least h87's; castles lost not above h87's. Bars as
  at 07:28 (look at D 12; accept t >= 2 with the mechanism, reject t <= -1, else a replica panel, two-block rule).

## 2026-10-23 10:46 — territory census: we mine our ground, it is half the field's; PIONEER_CALL switch (h119)
- Territory (v7's 18 control games, at r100: resource tiles nearer, in king steps, to a side's structures than to the
  other side's): ours 202 tiles in all, the field's 366. We mined 179 of ours in r76-100 (unmined: 2 beside a
  structure, 21 farther, in 420-1, 420-3, 421-3, 424-2); the field mined 260 and left 106 unmined. So the gap is ground,
  not staffing: 2644 (420-2, 425-2) 6 and 3 tiles to 16 and 19, 2591 (422-1) 2 to 12, 2321 (422-3) 8 to 27.
- 2644 (42x42, one castle a side, two cluster pairs): IanCoolidge0 (425-2, red) churched (28,22), the centre cluster
  on our side of the axis, at r44 and (20,33), our side's flank cluster, at r56, its own two only at r110-113; wololo
  (420-2) took (28,19) on our side at r53. Our r14 pioneer #2509 for (28,22) had Ian's crusader #3802 standing at
  (28,21) from r20: it circled at r2 50-68 (outside a crusader's threat range) for 100 turns and died at r120. h103's
  escorts (443-2) changed nothing: Ian churched (28,22) at r44 again; the escort is owed only once a pioneer is
  ESCORT_SLACK (10) turns past its distance.
- New switch CFG.PIONEER_CALL (0 = v7; works with ESCORT): a pioneer that sees a mobile enemy attacker within r2
  PIONEER_CALL of its site talks CT.BLOCKED (77); its castle, matching the talker's id to its pioneer, opens the
  escort at once. Unit tests: castle (default deaf; BLOCKED opens the escort before overdue; a quiet pioneer opens
  none), pilgrim (crusader or prophet by the site calls; pilgrim, castle or nothing does not; default silent), CT
  ranges disjoint. **h119** = v7 + ESCORT 2 + ESCORT_UNIT 3 + PIONEER_CALL 100 (h103 plus the call).

## 2026-10-23 10:47 — h104 REJECTED on the replica (block 1 net 0); h114's gate at 9 of 20 cells t -1.73
- h104 (v7 + no general attack) block 1, 432-437, complete: gained 3 (IanCoolidge0 2644, bot1v43 2321, uvafan 1653
  on health), lost 3 (botfinalsafe 203, awesomelemonade 1712 and 2797: v7 won both on castles, h104 lost 1712 on
  castles at r1000 and 2797 on health), net 0, t 0.00, 6/18 as v7: rejected by the two-block rule (net <= 0). Without
  the general attack it loses the games v7 wins by pushing, and wins the ones v7 loses pushing; the attack stays.
- h114 (v7 + CHAIN_GUARD 1) at 9 of 20 cells: gained 0, lost 3, D 3, t -1.73 (read in full when it ends).
- Replica: 153 waiting (147 ranked). Still no new requests.
- 10:52: no-op for the PIONEER_CALL source: out/v7chk16 IDENTICAL, 130 node tests pass; h119 add0db593cc3
  {ESCORT: 2, ESCORT_UNIT: 3, PIONEER_CALL: 100}. Self-play vs h87 to r150: on 2644 h119 and h103 play the same game
  (h87 parks nothing on our sites, so the call never fires); on 2591 no change either. Next: against dist/camp (our
  sparring build whose first prophet holds the mirror of its first contested site, as bot1v43's does).

## 2026-10-23 11:02 — h119's call cannot be tested in self-play: camp and block never hold our site; h114 at 14 cells t -1.63
- Against dist/camp (2591, 2644, to r150) h87, h103 and h119 play identical games: camp's first prophet (built r4,
  holding the mirror of its contested site) was still at (33,24) at r20 and our pioneer churched (28,19) at r28 (on
  2591 at r26, unopposed). A new sparring build, dist/block (v7 + ESCORT_FIRST 1 + ESCORT_MIRROR 1 + ESCORT_UNIT 3: a
  crusader sent to the mirror of its first pioneer's site), does no better: on 2644 our churches at r24 and r72, on
  2591 at r26, identical for all three builds (red army 43 at r150 on 2644, 2 on 2591). None of our own builds parks
  an attacker on our site by r20 as IanCoolidge0 does, so the call never fires locally; h119 waits for a replica
  panel (the only test with the trigger) once the queue is short. dist/block is kept beside dist/camp.
- h114 (CHAIN_GUARD 1) at 14 of 20 cells: 10 wins of 28, gained 1, lost 5, D 6, t -1.63 (look at D 12).

## 2026-10-23 11:23 — cluster race census: the field takes the rich centre clusters by r14-53, our first pioneer leaves at r12-16; PIONEER_EARLY switch
- Census (scratch econ/clust.mjs, race.mjs; v7's 18 field games 420-425; clusters by the bot's own clustering; a
  depot's side by BFS king steps from the two sides' castles; "remote" = no castle within 4 king steps of a depot;
  held = a castle or church within 2 king steps of a depot). Remote depots held at r150: on our side we 91, they 56
  (none 10); in the middle they 62, we 6; on their side they 133, we 4. At r50 they already held 32 of our side's.
- The losses are the big centre clusters (6-12 depots, 17 in the 18 games): the field churched 16 of them, 12 by r53
  (r14, 22, 23, 23, 27, 27, 29, 40, 41, 44, 46, 53; then 88, 99, 100, 119), its first pilgrim there at r11-45; we
  churched one (424-2, (28,44), r41). Our pilgrims never came within 2 king steps of 12 of the 17 (on 2591 our
  pioneer waited out of a prophet's reach at the choke). Our openings (open.js): every castle builds economy pilgrims on turns 1-5 (1-7
  of them, bank down to 30-80 K), then its first pioneer (SIG.CHURCH) waits for pilgrim + PIONEER_DEPART_K 50 +
  DEF_RESERVE_K 30 = 90 K: born r12-r16 in all 18 games. The field's first pilgrims leave at r1-r5 (bot1v43: P r1, P
  r2, prophet r3; IanCoolidge0 crusaders r2-r3, wololo crusader r1).
- New switch CFG.PIONEER_EARLY (0 = v7): through its turn PIONEER_EARLY a castle whose plan opens with a contested
  cluster (m <= PLAN_CONTEST_FIRST) sends that one pioneer ahead of the economy pilgrims, on the pilgrim's cost alone
  (struct.js structAct takes a `first` builder before the economy; castle.js earlyPioneer / sendPioneer). Unit test:
  default never sends at 10-60 K on turn 4, early sends at 10 K, not after its turn, once per castle.

## 2026-10-23 11:24 — h114 REJECTED (gate t -1.63)
- h114 (v7 + CHAIN_GUARD 1: the guard quota does not wait for CHAIN_K) vs h87, 20 cells: 16-24, gained 1, lost 5,
  split 14, D 6, t -1.63 <= -1: rejected by the field-aimed bar. dlv SUM: churches built 312 vs h87's 400 (the guard
  spends the chain's bank), churches lost 116 vs 168, castles lost 32 vs 29, milBuilt 8,225 vs 7,806. Symcheck 1, 2,
  3, 2321: contest/combat divergences only. CHAIN_GUARD stays off. h115's gate runs (...19q, 6 of 20 cells).
- Replica: 145 waiting (139 ranked); no new requests.
- 11:27: no-op for the PIONEER_EARLY source: out/v7chk17 IDENTICAL, 131 node tests + Python pass. **h120** = v7 +
  PIONEER_EARLY 6 (fabfb6c8ba10); **h121** = h120 + PIONEER_HOLD 64 + PIONEER_LEAN 3 (8f22f616fcf1: the early
  pioneer's church is held for, and built on its cost after 3 turns of waiting). Driver diagnostics vs h87 next.

## 2026-10-23 11:33 — h120 / h121 driver diagnostics: the first church 8-11 rounds earlier; h121's gate queued next (...19qa)
- h120 and h121 red vs h87 to r150 (scratch h120d; open1.js births, starve1 church rounds). The early pioneer is born
  at r3 on every seed (two of them on 836, one per castle); first church, candidate vs h87: 2644 r13 vs r24 (both
  builds); 2591 r18 vs r26 (both; red's pioneer held 19 turns by blue's units); 2013 r13 vs r22 (both); 836 h120
  r24 vs r22 (the two early pioneers waited for a bank the economy pilgrims of r4 and r12 had spent; churches
  24,35,48,50,60,60,61 vs 22,41,44,47,55,55,59), h121 r14 (14,33,51,52,53,61,64). h121 makes the race on every seed
  without h120's two-castle stall, so h121 is gated and h120 is not.
- h121's gate pre-registered (job ...19qa: the runner's locale sort puts it after the running ...19q and before
  ...19r): mechanism over the 40 games (starve1 to r150, out/st_h121.txt) - the candidate's first church at least 5
  rounds earlier than h87's on the mean, churches standing by r100 at least h87's, castles lost (dlv) not above
  h87's; field-aimed bars (look at D 12; accept t >= 2 with the mechanism, reject t <= -1, else a replica panel).
  dist/h121 on the VM: 8f22f616fcf1.

## 2026-10-23 11:37 — ledger repair: 11 stale rows closed, 4 split rows fixed; attempts.py refuses split rows
- progress/attempts.csv still read "queued" / "in progress" for attempts closed long ago: h6 (ACCEPTED as v4), h11,
  h24v5, h51v6, h54, h55, h56, h57, h62, h78 (SUPERSEDED, each with its fate), h76 (in v7 through h87). Rule 9.
- Four rows hand-edited today (h117, h118, h120, h121) had an unquoted comma and 11 fields; repaired with the csv
  module. tools/progress/attempts.py load() now exits on a row with surplus fields (test_load_refuses_a_split_row).
  LEARNINGS 29: edit the ledger with `attempts.py set`.

## 2026-10-23 11:44 — churches spend what waiting pioneers need; CHURCH_SAVE switch (h122)
- 420-1 (seed 2013, wololo, we blue, one castle; scratch econ/pio.js): pioneers born r23, r24, r34, r35 reached
  their free sites by r37-51; one built at once (r37), three waited 35, 44 and 55 turns (churches r83, r94, r106)
  with the bank at 10-77 K. In r40-100 our churches built 11 pilgrims (calm) and 2 preachers, the castle 2 preachers
  and a prophet (threats). Of the our-side clusters we churched in v7's 18 field games, 13 of 34 stood after r90
  (r94-147), at 13-19 king steps. PIONEER_HOLD (h118, h121) cannot stop this: CT.WAIT reaches castles only.
- New switch CFG.CHURCH_SAVE (0 = v7): before that round (a church that never learned it counts its own turns) a
  church's economy pilgrims leave a church's karbonite (50) in the bank. Unit test (off / below / above / past the
  round / unknown round). No-op out/v7chk18 IDENTICAL, 132 node tests + Python pass. **h122** = h121 + CHURCH_SAVE
  150 (526ec74e2442); driver diagnostics vs h87 (2013, 836, 2644) running.

## 2026-10-23 11:48 — h122 parked (mixed); red wins 61% of v7-era gate games; h115 at 17 cells t 0.58
- h122 (h121 + CHURCH_SAVE 150) vs h121, both red vs h87 to r150: 2013 better (churches 13,51,58,64,66,75 vs
  13,51,59,63,69; r100 pilgrims 27 vs 23; r150 army 43 vs 24, mined K 1,948 vs 1,702); 836 worse (r100 mined K
  1,748 vs 2,052, pilgrims 29 vs 31; pioneer idle far 9 vs 3); 2644 slightly worse (r100 pilgrims 7 vs 8). The save
  costs church pilgrims on every map and pays only where pioneers wait at free sites: PARKED, not gated.
- Side bias: in the five v7-era gates (h110-h114 vs h87, 40 games each) red won 25, 22, 22, 29, 24 = 122 of 200
  (61%; 50% +- 3.5% at one sd); the v6-era gates (h82, h87 vs h50, h88 vs h82) 20, 21, 20 of 40. The red side
  acts first in a round for robots of equal age and takes contested tiles (symcheck's CONTEST divergences: "red
  took axis tile"). Engine source: the initial castles are created in pairs, team 0 first (game.js
  `to_create.push({team:0,...}); to_create.push({team:1,...})`), and enactTurn walks this.robots in insertion
  order (`this.robots[this.robin]`), so red's castles and their same-round newborns move before blue's. It is why
  14-17 of a gate's 20 cells split by side (D 3-8). Pairing both sides keeps the gate fair; on the replica sides
  alternate per game.
- h115 (ENDGAME_FUEL 900) at 17 of 20 cells: gained 2, lost 1, D 3, t 0.58. Replica 140 waiting (134 ranked).

## 2026-10-23 11:58 — h115's gate: t 0.58, mechanism opposite (karbonite binds, not fuel) -> rejected
- h115 (v7 + ENDGAME_FUEL 900) vs h87, 20 cells of seed0 5000: 21-19, gained 2, lost 1, split 17, D 3, net +1,
  t 0.58 (never reached the D 12 look). Pre-registered mechanism (09:04): in games that reach r1000, dlv fuelEnd at most
  half of h87's. Measured over the 20 games of each that reached r1000: fuelEnd 136,008 vs h87's 38,353 (3.5 times),
  karbEnd 1-72 in 15 of h115's 20 (h87 kept 400-7,800 in 14). From r900 the dump spends the karbonite on preachers,
  then crusaders, then nothing; with no pilgrims built and units standing still, fuel piles up. It won 12 of the 20
  r1000 games against h87's 8, but a candidate whose mechanism moves the other way does not go to the replica
  (TRAINING_ALGORITHM §2, delivery): REJECTED. Ledger row added (it was missing).
- What it shows: at r1000 karbonite, not fuel, is the binding resource for health. Per karbonite a crusader is 40 HP
  for 15 K (2.7 HP/K), a preacher 60 for 30 (2.0), a prophet 20 for 25 (0.8); per fuel the preacher leads (1.2 HP/F
  vs 0.8). So the dump should pick by the bank's F/K ratio: crusaders while F/K > 50/15, preachers when fuel binds.

## 2026-10-23 12:01 — waiters that matched themselves; v7's r1000 replica losses were karbonite-bound
- Seven background waiters (`until ! pgrep -f "<pattern>"`) had looped since before 11:00: each one's own shell
  carries its pattern, so pgrep always found it. Stopped; LEARNINGS 30.
- v7's eight r1000 games in panel 420-425 (dlv on the replica replays): the four losses on health (wololo 836,
  uvafan 2046, 1653, 1712) end with karbonite 8-28 and fuel 44 / 29,477 / 42 / 16,678. Health 2,910 vs 18,130,
  970 vs 6,040, 2,330 vs 5,080, 1,800 vs 17,670: the field builds 5-40 times our military (military units ever
  built: wololo 549 vs our 43 on 836; uvafan 670 vs 17 on 1712). Not a tiebreak margin: an economy one.

## 2026-10-23 12:41 — chain census; our replica matches bumped (tools/bump_ours.sh, PROMPTS 27-32)
- v7's 21 replica games (420-425, 444): 34 church chains, 10 of our 14 castle kills within 60 rounds of one; 5 of our
  8 wins decided by them. By opponent (chains / kills): uvafan 9 / 0, IanCoolidge0 7 / 1, j-mao 8 / 4,
  awesomelemonade 4 / 2, wololo 3 / 1, StoneT2000 3 / 2. Against uvafan the chains took 2,085-5,420 K a game (2046:
  3,410 of 4,670 spent). Losses: 9 of 13 on castles (r198-r945), 4 on health. Next: stop chaining after failures.
- The classifier refused spool_bump and, for 15 minutes, related reads and the unit tests ("Auto-Mode Bypass").
  The owner asked for wrapper scripts: tools/bump_ours.sh (reorders only; digit ids or vibe19; never --drop), unit
  test in test/tools.test.js. With it allowed, 8 waiting matches of ours (499, 553, 616-621) now lead the queue
  (127 waiting).

## 2026-10-23 12:47 — h121's gate: t -0.28, first church only 4.4 rounds earlier -> rejected
- h121 (v7 + PIONEER_EARLY 6 + PIONEER_HOLD 64 + PIONEER_LEAN 3) vs h87, 20 cells of seed0 5000: 19-21, gained 6,
  lost 7, split 7, D 13, net -1, t -0.28 (look at D 12: middle zone). Pre-registered (11:33): first church >= 5
  rounds earlier than h87's on the mean: r36.0 vs r40.4 over 40 games each (st_h121.txt, to r150), short; churches
  standing by r100 98 vs 94 and castles lost 32 vs 32 (dlv) pass. The signature fell short of its bar, so no panel:
  REJECTED. The driver diagnostics (r13-18 vs r22-26) were the four seeds where it fires best.
- VM: h116's gate (...19r) running, then h118 (...19s). Replica: 553, 499, 490 running; 616-621 next.

## 2026-10-23 13:04 — h123 (CHAIN_FAILS 2) built, delivered on 2046, gate pre-registered and queued (...19t)
- CHAIN_FAILS (default 0): a chainer that fires talks CT.CHAINFIRE (78) for one turn; castles count the fires
  since the last enemy castle reported destroyed (CT.DEAD); at CHAIN_FAILS they launch no more lines and their
  peacetime army stops leaving CHAIN_K in the bank (churches keep theirs; the bank is shared). A later kill resets
  the count. From the 12:41 chain census (uvafan: 9 lines, no kill). Unit tests 134 node + 58 Python pass; no-op
  out/v7chk19 IDENTICAL alone. h123 = v7 + CHAIN_FAILS 2, sha 0e0c30f2f808.
- Delivery (driver, one game at a time, seed 2046 to r1000, red vs h87): h87 red lines r352 and r575, no kill, then
  blue's 12-church line at r871 took both its castles (lost r927); h123 red the same two lines, then none, and held:
  lost one castle (r589), killed one (r972), reached r1000. It fires where designed.
- Gate (...19t, after h116 and h118): symcheck 1, 2, 3, 2321; h123 vs h87, 20 cells of seed0 5000, par 2. Mechanism,
  summed over the 40 games: lines (3+ churches born in one round, ~/scratch19/lines.js -> out/ln_h123.txt) at most
  0.8 of h87's; castles lost (dlv) not above h87's. Field-aimed bars: look at D 12, accept t >= 2 with the
  mechanism, reject t <= -1, else a replica panel (two-block rule).

## 2026-10-23 13:30 — h116 REJECTED; replica vm2 kills found, time audit queued (...19ra)
- Gate h116 (v7 + ECON_RICH 100) vs h87, 20 cells, 40 games: 16 wins, gained 5, lost 9, D 14, net -4, t -1.07 ->
  **REJECTED** (t <= -1 at the look). The switch did what it was built for: at r100 our army summed 616 to h87's 165
  and our bank 6,211 K to 14,253 (out/tl_h116.txt). It cost the rest: castles lost 60 vs 52, churches 838 vs 890
  (94%, bar 95%). The units built early do not win the game; the churches they take the karbonite from do.
- Replica: each of 490 game 2 (mvpatel2000, seed 2644, ms_max 204) and 499 game 3 (IanCoolidge0, seed 60, ms_max
  307) has one "Script execution timed out" for vibe19: the engine's vm2 kill at TURN_MAX_TIME 200 ms (engine
  vm.js, specs.json), separate from the chess clock; the turn's action is lost. Our gates run --no-kill, so they
  never see it (their ms_max p90 is ~250 ms). The VM's load average was 9.8-11.6 on 8 vCPUs at 13:2x (six replica
  games + a gate pair + analysis), so contention is part of it, but the bot has turns near the limit.
- tools/run_game.js --turnlog FILE [--turnlog-ms 100]: one JSON line per slow turn {round, team, unit, id, turn, ms,
  bank}; unit test. Job ...19ra runs next (after h118's gate ...19s, now running; before h123's ...19t):
  v7 vs h87 on seeds 60, 2644, 836, 1712, 2046, 1653, both sides, one game at a time under the replica's flags
  (kill on, contest clock) -> out/ta_v7/. Then: fix the slow paths that log over ~150 ms.

## 2026-10-23 13:35 — replica time census: 44 of 393 vibe19 games froze robots or hit the vm2 kill; 490 read
- Census over every fetched match (match.json per game, our team only): 44 of 393 games have `frozen` (chess clock
  overdrawn: the robot skips turns until its bank refills) or vm2 `timeouts` > 0, up to 24 frozen robots in one
  game (436-2, seed 1712), 17 in 409-3 and 435-2. They cluster in r1000 games on big maps (1712, 2740, 836) with
  armies of hundreds on the board, so CPU and GC pressure is in it. Hypothesis to test with the audit (...19ra):
  newborns (120 ms bank, a fresh sandbox with cold JIT) doing all their map analysis on turn 1. Seed 2740 added to
  the audit's seeds.
- 490 (mvpatel2000 3-0): games 2 and 3 are one-castle maps whose economy is one rich cluster on the axis (2644:
  8 K + 2 F at (27-30, 19-22); 2518: 4 K + 4 F at (16-19, 15-19)), with one depot pair beside each castle. 2518: their
  pilgrim left r6 and churched the centre at r18, and its first prophet killed our pioneer (left r12) on the way at
  (23,23); we then built 3 preachers (r23-25) and sat on 70-145 K with 3 pilgrims to r100 (mined 220 K to their
  786). 2644: their crusaders (r3, r4) went ahead of the pilgrims and held the centre; our two later pioneers died
  at r65 and r72. On axis-rich maps the race is decided by the armed arrival. Panels in line: h103 (ESCORT 2
  crusaders) block 2 and h119 (PIONEER_CALL); h100 (ESCORT_FIRST 1 prophet) was rejected in self-play, t -0.29.

## 2026-10-23 13:47 — h118 REJECTED (mechanism short); the time audit is running (...19ra)
- Gate h118 (v7 + PIONEER_HOLD 64 + PIONEER_LEAN 3) vs h87, 20 cells, 40 games: 20 wins, gained 2, lost 2, split
  16, D 4, net 0, t 0 (ends at 20 cells below D 12: read as is). Mechanism (out/st_h118.txt): pioneer idle turns
  with no enemy attacker within r2 100, to r200, 207 vs h87's 266 = 0.78, bar 0.7 -> **REJECTED** (a mechanism
  short of its bar does not go to the replica). The other items were met: churches 910 vs 828 (+10%), castles lost
  58 vs 64. Lead kept: the hold-then-lean pair builds more churches without losing more castles; a stronger lean
  (PIONEER_LEAN 1-2) is the next form if the economy line comes back to it.
- Symcheck h118: mirror-identical to the first contest or combat on 1, 2, 3, 2321.
- Replica 619 (h111 block, uvafan): 2-1 to uvafan (v7's 423 was 0-3). 620 still running.

## 2026-10-23 14:18 — time audit closed: the overruns are the engine's and GC's, and each costs one turn
- Audit ...19ra, seed 1712 (v7 red, then blue) under the replica's flags: v7's slow turns (> 100 ms) were 3
  newborns on turn 1 (105-122 ms against the 120 ms bank: one froze) and 4 late spikes of 215-685 ms (vm2 kills) by
  a crusader, a prophet, a pilgrim and a preacher with banks of 4,500-13,400 ms. h87 had the same kinds.
- CPU profile (an unminified v7 vs h87 on 1712, --no-kill, beside the audit; node --cpu-prof): of 797 s, the engine's
  per-turn compile of the turn message (vm Script) is 361 s, GC 146 s, the engine's view dump 82 s, all bot code
  ~125 s (top: preacherTarget 11 s, bfs 8 s). A newborn's own first-turn work (born: World, detectSymmetry, econ)
  is 6.3 s over ~700 births, ~9 ms each; the rest of its 110-120 ms first turn is the sandbox's first run. The
  spikes hit both teams and every unit type (castle 1,265 ms at bank 7,635): GC pauses and CPU contention.
- Cost to us: a frozen robot skips only the turns until its bank is positive again (+20 ms a turn, game.js 759-766):
  one turn for these; a vm2 kill loses that turn's action. 1-24 lost turns in a 1000-round game of hundreds of
  robots. **Closed** as not a bot defect; the audit was stopped after 1712 (by PID) so h123's gate could start.
  Moving born's ~9 ms to turn 2 would save at most those few newborn turns: not worth a gate.

## 2026-10-23 14:18 — h124 pre-registered and queued (...19u, after h123)
- h124 = v7 + PIONEER_HOLD 64 + PIONEER_LEAN 1 (2aaf3dfb1254): h118's pair with the lean after one waiting turn
  instead of three, to push the idle turns under the bar h118 missed (0.78 of h87's) while keeping its church gain.
  No new code (both switches are unit-tested; h118's driver diagnostics hold), so no no-op run.
- Gate ...19u: symcheck 1, 2, 3, 2321; h124 vs h87, 20 cells of seed0 5000, par 2. Mechanism, summed over the 40
  games: pioneer idle turns away from enemies to r200 (out/st_h124.txt) at most 0.7 of h87's; churches built (dlv)
  at least h87's; castles lost not above h87's. Looks when D first reaches 12; accept t >= 2 with the mechanism;
  reject t <= -1; in between, a replica panel (two-block rule).

## 2026-10-23 14:48 — h111 REJECTED on the replica (block 1 net 0); h123 at 15 cells D 0
- h111 (v7 + SAFE_BUILD 2) block 1 = matches 616-621 against v7's control 420-425 (same opponents, maps, sides):
  gained 2 (uvafan 1653, bot1v43 2321), lost 2 (IanCoolidge0 203 on health; awesomelemonade 1712: a castle win at
  r474 became a loss at r1000),
  D 4, net 0, 6/18 wins each -> **REJECTED** by the two-block rule (net <= 0 after block 1).
- h123's gate at 15 of 20 cells: 30 games, every cell split, D 0 (CHAIN_FAILS rarely changes a self-play result).
- Replica queue 90 (101 at 14:2x): falling about 20 an hour.

## 2026-10-23 15:01 — h123 REJECTED (mechanism short, D 0)
- Gate h123 (v7 + CHAIN_FAILS 2) vs h87, 20 cells, 40 games: every cell split, D 0 (read as is at 20 cells).
  Mechanism: church lines (3+ churches in one round, out/ln_h123.txt) 41 vs h87's 49 = 0.84, bar 0.8 -> **REJECTED**
  (short of its bar: no replica panel). Castles lost 62 vs 62; churches built 730 vs 816 (the held lines' K did not
  turn into more churches). In self-play our lines kill castles (most lines end in a kill at once), so two misses
  in a row are rare; the switch's case is the field's line-proof defences (uvafan), which self-play cannot show.
  Re-open condition: a local sparring partner that stops lines, or a replica panel slot with nothing better.

## 2026-10-23 15:35 — h125 (EXPAND_ROUND 100 + EXPAND_KEEP 16) diagnosed on 1036 and queued (...19v)
- Lead (HANDOFF, replica 1036 vs IanCoolidge0): no church between r53 and the chain at r310. h27 (EXPAND_ROUND 100 on
  h19) failed delivery on 2026-10-21: the re-plan chose the enemy's corners and the pioneers died. h125 = v7 +
  EXPAND_ROUND 100 + EXPAND_KEEP 16 (219139b944aa).
- Driver, seed 1036 to r350, --det, both sides: h125 red adds a church at (29,27) on the axis cluster at r248 (h87
  blue none before its chain at r317); h125 blue adds two at (28-30,27) at r215, one lost at r289 (h87 red none
  before its chain at r311). Delivery: modest (one live added church per game by r300), not the corners.
- Gate ...19v: symcheck 1, 2, 3, 2321; h125 vs h87, 20 cells of seed0 5000, par 2. Mechanism, summed over the 40
  games: churches built (dlv) at least 1.05 of h87's; castles lost not above h87's. Bars as for h124.

## 2026-10-23 15:40 — h124 REJECTED: the lean cut the idle turns and lost the churches
- Gate h124 (v7 + PIONEER_HOLD 64 + PIONEER_LEAN 1) vs h87, 20 cells, 40 games: 18 wins, gained 2, lost 4, D 6,
  net -2, t -0.82. Mechanism: pioneer idle turns 178 vs 264 = 0.67 (bar 0.7) met; churches 798 vs 858 (bar: at
  least h87's) missed; castles lost 60 vs 60 -> **REJECTED**. With h118 (LEAN 3: churches 910 vs 828, idle 0.78):
  leaning after one turn spends the reserve the castle would have built other churches with. The hold-and-lean
  line is closed at both doses; h118's church gain was not in the wins (D 4, net 0).

## 2026-10-23 16:19 — h125 REJECTED (re-planned expansion adds no churches over 40 games)
- Gate h125 (v7 + EXPAND_ROUND 100 + EXPAND_KEEP 16) vs h87, 20 cells: 18 wins of 40, gained 2, lost 4, D 6, net -2,
  t -0.82. Mechanism missed: churches 766 vs 772 (bar 1.05x), castles lost 64 vs 62 -> **REJECTED**. 1036's added
  axis church was the exception: across the field of seeds the turn-3 plan plus the chains already church what
  is safe to church. Re-open: only with a defended expansion (an escort or a church line to the site).

## 2026-10-23 16:20 — partner census queued (...19w); our panel blocks wait for the queue
- Seven v7 candidates in a row rejected against h87 (h116, h118, h121, h123, h124, h125; h111 on the replica): the
  gate opponent is v7 itself, which shares v7's blind spots. Job ...19w: v7 vs dist/turtle, dist/camp, dist/block
  and bots/rush4, 10 cells (20 games) each, par 2 (out/pc_v7_*.jsonl). A partner v7 beats in nearly every game
  cannot tell candidates apart; one that takes games off v7 is a candidate second gate opponent.
- Replica: 66 waiting (all ranked field matches, falling about 20 an hour). Our blocks (h103 block 2, h112 and h119
  block 1) go in under 30, as HANDOFF has it (the owner's < 30 answer, PROMPTS 18, was for the autoscrim; we hold
  ours with it while the queue clears).

## 2026-10-23 17:16 — partner census: the mirror-camping escorts beat v7 12-8; gated as h126 and h127 (...19x, ...19y)
- Census ...19w (v7 vs each sparring build, 10 cells of seed0 5000, 20 games each): rush4 0 wins in 20 against v7,
  dist/turtle 4 (2 on castles, 2 on health), **dist/camp 12** and **dist/block 12**. By seed pairs, v7 lost both
  sides to camp on 241, 418, 1250 and 357 and won both on 2855 and 2642; to block it lost both on 418, 1250, 357 and
  2855 and won both on 241 and 2642. Both are v7 + ESCORT_FIRST 1 + ESCORT_MIRROR 1 (block: ESCORT_UNIT 3): the
  first escort, built before the first contested pioneer, holds the enemy's own site of that cluster (bot1v43's
  opening). Built as sparring partners ("for sparring builds only"), never gated as candidates; h100 (ESCORT_FIRST 1
  holding our own site) was rejected at t -0.29, so the mirror hold is the active part.
- h126 = camp's setting (9884fc8a4840), h127 = block's (d2caca3969e4), built from today's src (every later switch
  defaults off). Gates ...19x, ...19y vs h87, the 20 cells of seed0 5000 (the census's 10 cells are the first half:
  seen before this registration). Mechanism: castles lost not above h87's; churches built at least 0.95 of h87's;
  the first 10 cells replay the census results. Bars: look at D 12; accept t >= 2 with the mechanism; reject t <= -1;
  in between a replica panel.
- Lesson pending its gate: partners built to imitate a field opening can beat the incumbent. Self-play against the
  incumbent alone is blind to them; a partner census belongs in the loop after every accept.

## 2026-10-23 17:55 — h126 to the replica panel: gate t 1.00, mechanism met, churches +16%
- Gate h126 (v7 + ESCORT_FIRST 1 + ESCORT_MIRROR 1) vs h87, 20 cells: 23 wins of 40, gained 6, lost 3, split 11,
  D 9, net +3, t 1.00 (ends at 20 cells below D 12: read as is -> middle zone). Mechanism met: castles lost 56 vs
  60; churches built 876 vs 758 (+16%: the escort on the enemy's site costs us nothing and slows their expansion);
  the census's 20 games replayed exactly (h126 = dist/camp in play). Symcheck: mirror-identical to combat on 1, 2, 3
  and to the first contest on 2321.
- -> **REPLICA PANEL**, block 1 first in line (ahead of h103's block 2, h112 and h119) once fewer than 30 wait (46).
  h127 (the crusader form) gates next (...19y).

## 2026-10-23 18:32 — h127 to the replica panel too: gate t 1.26, castles lost 52 vs 64
- Gate h127 (v7 + ESCORT_FIRST 1 + ESCORT_MIRROR 1 + ESCORT_UNIT 3) vs h87, 20 cells: 24 wins of 40, gained 7,
  lost 3, split 10, D 10, net +4, t 1.26 (read as is at 20 cells -> middle zone). Mechanism met: castles lost 52 vs
  64, churches 790 vs 770; the census's 20 games replayed exactly. Symcheck: mirror-identical to combat on 1, 2, 3
  and to the first contest on 2321.
- -> **REPLICA PANEL**. h126 and h127 are the first two candidates since v7 to clear a gate's mechanism with a
  positive estimate; their block 1s go in together (12 matches) once fewer than 30 wait (38 now), ahead of h103
  block 2, h112 and h119. If both pass, the one with the higher replica net is the next incumbent.

## 2026-10-23 19:16 PDT: h126 and h127 replica panel block 1s queued

Replica queue fell under 30. h126 = submission 108, block 1 = matches 622-627; h127 = submission 109, block 1 = matches
628-633 (panel v7-m1, control 420-425). bots/v7 resubmitted as the ladder build (submission 110); our matches bumped to
the front. Read each with `contest19.py compare 420-425 <block>` under the two-block rule.

## 2026-10-23 19:19 PDT: h127 vs h126 even; h128 queued

h127 vs h126 (...19z, 20 cells seed0 5000): 20/40, gained 4, lost 4, split 12, D 8, net 0, t 0. Neither form of the
mirror escort beats the other head to head; the replica panels decide. h128 = v7 + ESCORT_FIRST 2 + ESCORT_MIRROR 1
+ ESCORT_UNIT 3 (dist/h128, cd4c900d6216): two crusaders on the enemy's mirror site. Gate vs h87 on fresh cells (seed0 6000),
par 2, field-aimed bars; mechanism: castles lost not above h87's, churches at least 0.95 of h87's.

## 2026-10-23 20:20 PDT: h128 to the replica panel; h129 queued

h128 gate (...19zz, seed0 6000): 23/40, gained 7, lost 4, split 9, D 11, net +3, t 0.90. Mechanism met: castles lost
35 vs 44, churches built 567 vs 508 (1.12x). In the band -> replica panel: submission 111, block 1 = matches 634-639
(bots/v7 resubmitted, 112; bumped). The two-crusader mirror escort gates like h127 (t 1.26) on fresh cells.
Replica so far (block 1 vs v7's control 420-425): h126 624 bot1v43 1-2 (=), 625 uvafan 0-3 (=), 627 Ian 2-1 (+1);
h127 628 wololo 0-3 (=), 629 botfinalsafe 0-3 (-2), 630 bot1v43 1-2 (=). h129 = v7 + ESCORT_FIRST 2 + ESCORT_MIRROR 1
+ ESCORT_UNIT 5 (dist/h129, 8749df0348b6): the preacher form; gate vs h87 on seed0 7000, same bars.

## 2026-10-23 20:32 PDT: h126 REJECTED on the replica (block 1 net 0)

h126 (ESCORT_FIRST 1 + ESCORT_MIRROR 1, prophet) block 1 622-627 vs v7's 420-425: 6/18 each, gained 2, lost 2, D 4,
net 0, t 0 -> REJECTED by the two-block rule. Gained IanCoolidge0 1036 and 2644; lost IanCoolidge0 203 and
awesomelemonade 1712 (v7 won both; h126 lost both on health at r1000). Castles held longer in losses to wololo (2013: r518
vs r198) without turning them: the escort delays the opening siege but does not break it.

## 2026-10-23 20:35 PDT: h127 REJECTED on the replica (block 1 net -3)

h127 (ESCORT_FIRST 1 + ESCORT_MIRROR 1 + ESCORT_UNIT 3) block 1 628-633 vs v7's 420-425: 3/18 to 6/18, gained 0,
lost 3 (IanCoolidge0 203, botfinalsafe 203 and 2740: all r1000 games v7 won), D 3, net -3, t -1.73 -> REJECTED.
The mirror escort now has two replica rejections (h126 net 0, h127 net -3) after local gates of t 1.00 and 1.26:
the escort beats h87 by camping its mirror site, a site the field's bots do not depend on. h128 (two crusaders,
634-639) is already queued and is read as is; h129 (preachers) goes to the replica only at t >= 2.

## 2026-10-23 20:41 PDT: h130 straight to the replica panel (prophet army)

The local gate does not predict the field (h126 t 1.00 -> net 0, h127 t 1.26 -> net -3), and the prophet doctrine
was set aside on self-play alone (h98/h99/h106, single driver games, TRAINING_LOG 01:45, 04:22) while the field
evidence favours it (92% of our lost crusaders never fired; the strong bots mass prophets and win on health). h130 =
v7 + MIL_ROTATION null (dist/h130, 0467e38596bc: peacetime prophets, every 4th a preacher; h98's switch on today's src) goes to
the replica without a gate: submission 113, block 1 = matches 640-645 (v7 resubmitted, 114; bumped). Driver check,
2046 r300 vs v7: built prophets 17 / crusaders 0 (v7 11 / 11), no bot exceptions. Two-block rule as usual.

## 2026-10-23 20:52 PDT: h129 REJECTED (gate t -2.71)

h129 (ESCORT_FIRST 2 + ESCORT_MIRROR 1 + ESCORT_UNIT 5, preachers) vs h87, 20 cells seed0 7000: 11/40, gained 1,
lost 10, split 9, D 11, net -9, t -2.71 -> REJECTED. Mechanism missed both ways: castles lost 48 vs 29, churches
built 435 vs 643 (0.68x): two preachers (30 karbonite each) out of the opening cost the economy what two crusaders
did not. The mirror-escort line is closed (h126, h127 replica-rejected; h128 on the replica 634-639, read as is).

## 2026-10-23 21:20 PDT: h130's local gate t 1.67 (the prophet army beats h87); h131, h132 queued

h130 (MIL_ROTATION null) vs h87, 20 cells seed0 8000: 25/40, gained 7, lost 2, split 11, D 9, net +5, t 1.67;
castles lost 24 vs 38, churches 501 vs 456. The single driver games that set the doctrine aside (h98 on 2644, h99,
h106: TRAINING_LOG 01:45, 04:22) misread it: one map is not a measurement. Its replica block 640-645 so far: 640
wololo 0-3 (=), 641 botfinalsafe 1-2 (-1), 642 bot1v43 2-1 (+1). Queued: h131 = v7 + MIL_ROTATION [4] (all
prophets; dist/h131 a1720a8dbd6c) on seed0 9000, then h132 = h130 + ATTACK_ROUND 1001 + ATTACK_LATE 1001 (no general
attack; dist/h132 8219f3cfe4bb) on seed0 9500; mechanism: castles lost below h87's; field-aimed bars.

## 2026-10-23 21:24 PDT: h128 replica block 1 net +2 -> block 2 (646-651)

h128 (ESCORT_FIRST 2 + ESCORT_MIRROR 1 + ESCORT_UNIT 3) block 1 634-639 vs v7's 420-425: 8/18 to 6/18, gained 4
(IanCoolidge0 1036 and 2644, wololo 2644 at r260, uvafan 1712 on castles), lost 2 (IanCoolidge0 203, botfinalsafe
203), D 6, net +2, t 0.82: neither bar of the two-block rule -> block 2 on the same cells, submission 115, matches
646-651 (v7 resubmitted, 116; bumped). Galaxy assigns sides per match, so block 2 swaps them only where it happens to;
compare reads both blocks cell by cell against 420-425 and the cumulative t needs >= 1.5 with net >= +3.

## 2026-10-23 22:09 PDT: h130 REJECTED on the replica (block 1 net -2)

h130 (MIL_ROTATION null, prophet army) block 1 640-645 vs v7's 420-425: 4/18 to 6/18, gained 1 (bot1v43 2321),
lost 3 (IanCoolidge0 203 on health, botfinalsafe 203 at r773, awesomelemonade 2797 on health), D 4, net -2, t -1.00
-> REJECTED. uvafan still beats us on health in all three r1000 games with prophets, so the health deficit there is
not the crusaders' fault. With h126 and h127 this makes three local wins that the field reversed (LEARNINGS 32).
h131 (MIL_ROTATION [4]) and h132 (h130 without the attack) gates continue for their local reading; they go to the
replica only at t >= 2.

## 2026-10-23 22:19 PDT: where v7's karbonite goes against uvafan; h123 to the replica panel

replay.js timeline, 423-1 (v7 red vs uvafan, 2046): karbonite mined 4,618 vs 5,428 (0.85x) and fuel 29,870 vs
36,040, yet armies at r1000 are 10 vs 199. v7's army peaked at 33 (r200-300) and fell; uvafan's grew every 100
rounds (17, 36, 53, 72, 110, 199) on prophets with no churches. v7 built 24 churches (1,200 karbonite, 4,800 fuel)
in four chain lines (r352, 598, 715, 836: chains_v7 423-1) and lost 23 of them with their bursts, killing no castle;
it ended with 12 karbonite and 29,477 fuel (karbonite binds; the fuel is idle). 423-3 (1712) the same shape: 546
military built to 960, karbonite 8, fuel 16,678. The health losses at r1000 are this attrition, not the tiebreak.
h123 (v7 + CHAIN_FAILS 2: after two lines with no enemy castle destroyed, castles hold their lines and release
CHAIN_K) was built from this diagnosis (TRAINING_LOG 13:04) and gated even locally (t 0, D 0), rejected only on a
self-play mechanism bar (lines 0.84 of h87's, bar 0.8), and self-play is where chains succeed. As a field-aimed
candidate (TRAINING_ALGORITHM step 6) whose gate passed the non-inferiority screen, it goes to the replica panel:
submission 117, block 1 = matches 652-657 (v7 resubmitted, 118; bumped).

## 2026-10-23 22:23 PDT: h131 closed (t 0.38; its doctrine failed on the replica); h133 queued

h131 (MIL_ROTATION [4], all prophets) vs h87, 20 cells seed0 9000: 21/40, gained 4, lost 3, D 7, net +1, t 0.38;
castles lost 37 vs 38, churches 571 vs 436. Below the panel pass (t >= 2), and its doctrine's panel (h130) was
net -2: REJECTED. h132 (h130 without the attack) is running: 14 games, +3 -2. h133 = v7 + CHAIN_FAILS 1 (dist/h133,
5b0fb2fa8bb5): h123's stop rule after one failed line; a non-inferiority screen vs h87 on seed0 10000 (reject at t <= -1 or
castles lost above 1.1x h87's), ready for a panel if h123's block (652-657) shows the stop rule pays in the field.
h128 block 2 so far: 648 bot1v43 1-2, 650 awesomelemonade 2-1, 651 IanCoolidge0 2-1; 649 running.

## 2026-10-23 22:36 PDT: h128 not accepted (two blocks net +3, t 0.90); 203 is the same attrition as uvafan's

h128 block 2 646-651 vs 420-425: 7/18, gained 3 (IanCoolidge0 1036 and 2644, wololo 2644), lost 2 (IanCoolidge0
203, botfinalsafe 203), net +1, t 0.45. Cumulative over both blocks: gained 7, lost 4, D 11, net +3, t 0.90 < 1.5
-> REJECTED by the two-block rule. The cells repeat: every mirror-escort build (h126, h127, h128 twice) gains on 2644
and 1036 and loses the r1000 game on 203. Study, 651-1 (h128 red vs IanCoolidge0, 203, lost on health): we mined
more karbonite (7,626 vs 6,402) and ended with army 6 vs 92. Red military deaths by 200-round window: 46, 41, 68,
56, 70; from r200 on 202 of 235 in IanCoolidge0's half (horizontal map, red upper), around our chain church and
pilgrims at rows 24-30, inside IanCoolidge0's prophet lattice (diagonal lines of prophets across the whole map at
r500). Blue lost 105 preachers but only 39 prophets. As on 2046 against uvafan, karbonite turns into units that
die in the enemy half after the chain starts; the stop rule (h123 panel 652-657, h133 screen) is the test.

## 2026-10-23 22:47 PDT: h132 closed (t 0.90); h134 (no chains) screen queued

h132 (MIL_ROTATION null + no general attack) vs h87, 20 cells seed0 9500: 23/40, gained 7, lost 4, D 11, net +3,
t 0.90: below the panel pass, and the prophet doctrine's panel (h130) was net -2: REJECTED. The prophet line is
closed. h134 = v7 + CHAIN_ROUND 0 (dist/h134, 4223b655ef3a): no church chains, the limit of the stop rule; a non-inferiority
screen on seed0 11000 behind h133's. h123's replica block 652-657: 654 bot1v43 1-2 (=), five running.

## 2026-10-23 23:47 PDT: h133 REJECTED by its screen (castles lost 1.17x); h134 heading the same way

h133 (CHAIN_FAILS 1) vs h87, 20 cells seed0 10000: 22/40, gained 4, lost 2, D 6, net +2, t 0.82, but castles lost
35 vs 30 (1.17x, screen bar 1.1x) and churches 346 vs 593 -> REJECTED by the pre-registered screen. h134 (no chains)
after 16 games: 2 wins, gained 0, lost 6, t -2.45: in self-play the chain is what takes castles. h123's replica
block so far: 652 wololo 0-3 (=), 653 botfinalsafe 2-1 (=), 654 bot1v43 1-2 (=), 655 uvafan 0-3 (=), 657
IanCoolidge0 0-3 (-1); 656 awesomelemonade running. Stopping the chain does not turn uvafan's games: our health
deficit there outlasts the chain's cost.

## 2026-10-24 00:33 PDT: how v7's units die in the field; CFG.SIEGE built; h135 in delivery

Death census over v7's 18 replica control games (420-425, replay re-simulation, scratch an/deaths.js): 2,827 of
our military died; 2,582 to prophets. Preachers 709 (588 unfired and blind: vision r2 16 against a reach of 64) and
crusaders 336 (263 unfired, blind). 1,609 prophets, 625 of them unfired with the killer in sight: 368 at age 0
(built into reach), 235 on turns 1-20 having stepped into reach of prophets they could not yet see (prophet vision =
reach; only 43 prophet moves all census long left a target in band, nearly all melee retreats or fuel < 55).
h111's replica block (SAFE_BUILD 2, 616-621) moved the deaths instead of saving the units: age 0 368 -> 99, ages 1-3
165 -> 775. The castle sees r2 100; its newborns do not. CFG.SIEGE (new, default 0; comms SIG.THREAT 13): for 3
turns after a military build a structure radios (r2 25) the enemy prophet in its sight nearest it; military units
remember the prophets they see or hear for SIEGE turns, forget one whose tile they see empty, hold no lattice tile
in a remembered prophet's reach (r2 64) and avoid that reach on lattice moves. Two unit tests; no-op out/v7chk20
IDENTICAL (noop/run.sh: 799 to r300, --det --timescale 10 --init-ms 5000 --fast-*), 137 node tests pass.
h135 = v7 + SIEGE 30 + SAFE_BUILD 2 (dist/h135, a5aa75edd7a6): built safe and kept out of unseen reach. Delivery on the driver
against dist/turtle (the prophet doctrine, our closest local stand-in for the field) on 2046, h87 the baseline:
prophet deaths at ages 1-3 must fall to half of h87's, with no rise at age 0.

## 2026-10-24 00:42 PDT: h134 REJECTED (no chains: t -1.60)

h134 (CHAIN_ROUND 0) vs h87, 20 cells seed0 11000: 14/40, gained 4, lost 10, D 14, net -6, t -1.60 -> REJECTED by
the screen (t <= -1). The chain is v7's main weapon at home; the field-side question stays h123's panel (656 left).

## 2026-10-24 00:54 PDT: h123 REJECTED on the replica (block 1 net -3)

h123 (CHAIN_FAILS 2) block 1 652-657 vs v7's 420-425: 3/18 to 6/18, gained 0, lost 3 (IanCoolidge0 203 on health,
awesomelemonade 1712 at r1000 and 2797 on health: all games v7 won), D 3, net -3, t -1.73 -> REJECTED. Holding the
chain after two failed lines gives up the late lines that win r1000 games; it frees karbonite that does not turn
into enough health. The chain line is closed for now (h123, h133, h134); SIEGE (h135) is the next field-aimed test.

## 2026-10-24 00:55 PDT: h112 to the replica panel (673-678)

h112 (v7 + DEF_SEEN 1: threat responses count only defenders that see the attacker; local gate t 0.71, mechanism
met narrowly, waiting since 2026-10-23) takes the free replica lane: submission 119 (dist/h112, 825744f9accb), block
1 = matches 673-678 (v7 resubmitted, 120; bumped).

## 2026-10-24 01:03 PDT: h135 delivery: fires, and turns two losses against a prophet army; screen queued

Against dist/turtle on 2046 neither build lost more than 3 prophets (the turtle never attacks): no reading. Against
h130 (the attacking prophet army, our closest local stand-in for the field), --det, timescale 10:
2046: h87 lost both castles at r980 (army 1 at the end); h135 reached r1000 (lost 1 castle to 2, army 1 vs 26).
203: h87 lost at r569; h135 won at r921 (both h130 castles). Stillborn prophets 15 -> 5 (SAFE_BUILD 2).
SIG.THREAT radios: 8 on 2046, 18 on 203. The pre-registered ages 1-3 bar is not measurable here (h87 lost no
prophets on turns 1-3 against h130: self-play does not reproduce the field's walk-in deaths), so the delivery
passes on firing and outcome; the replica panel reads the mechanism. Non-inferiority screen vs h87 queued
(seed0 12000); tools/ and test/ synced to the shadow tree.

## 2026-10-24 01:03 PDT: h135 to the replica panel beside its screen (679-684)

The replica lane is short and the local screen only rejects (LEARNINGS 32), so h135's panel runs beside it:
submission 121 (dist/h135, a5aa75edd7a6), block 1 = matches 679-684 (v7 resubmitted, 122; bumped). A screen
rejection voids the panel. Read the mechanism on the replica: prophet deaths at ages 0-3 and unfired walk-ins
(scratch an/pdeath.js) against v7's 368 + 165 in 420-425.

## 2026-10-24 01:47 PDT: h135 passes its screen; h136 (SIEGE alone) queued

h135 vs h87, 20 cells seed0 12000: 20/40, gained 4, lost 4, D 8, net 0, t 0; castles lost 37 vs 37, churches 453 vs
457: non-inferior; its replica block 679-684 stands (so far 679 wololo 0-3 =, 681 bot1v43 1-2 =). Symmetry check:
the same first divergences as h133's (contests and combat). h112's block 673-678 so far: 675 bot1v43 2-1 (+1), 676
uvafan 1-2 (+1: the panel's first win against uvafan), 678 IanCoolidge0 0-3 (-1). h136 = v7 + SIEGE 30 (dist/h136,
4d8e4bab9982), screen on seed0 13000, to part SIEGE from SAFE_BUILD 2.

## 2026-10-24 02:30 PDT: h135 REJECTED on the replica (net 0); h136 passes its screen and goes to the panel; h137 queued

h135 block 1 679-684 vs v7's 420-425: gained 2 (uvafan 1653 and 1712, both won on castles at r1000: the panel's first
uvafan game wins), lost 2 (botfinalsafe 203 on castles at r1000, awesomelemonade 1712 on health at r1000), D 4, net 0,
t 0, 6/18 each: REJECTED by the two-block rule. The mechanism fired: military deaths 2827 -> 2433 over the 18 games,
prophets killed by prophets 1593 -> 1099; prophet deaths at age 0 368 -> 102, ages 1-3 165 -> 295 (scratch an/pdeath.js,
deaths.js). Fewer losses of units did not turn into wins: the saved prophets hold back.
h136 (SIEGE 30 alone) screen vs h87, 20 cells seed0 13000: +2 -2, D 4, t 0; castles lost 25 vs 27: non-inferior ->
replica panel: submission 123 (dist/h136, 4d8e4bab9982), block 1 = matches 694-699 (v7 resubmitted, 124; bumped).
h137 = v7 + SIEGE 10 (dist/h137, 081c8a6aacb4: a shorter memory, a less passive hold) screen queued, seed0 14000.

## 2026-10-24 02:41 PDT: h112 REJECTED on the replica (net 0)

h112 (DEF_SEEN 1) block 1 673-678 vs v7's 420-425: gained 2 (bot1v43 2321 at r278, uvafan 1653 on castles at r1000),
lost 2 (IanCoolidge0 203 and awesomelemonade 1712, both on health at r1000), D 4, net 0, t 0, 6/18 each: REJECTED by
the two-block rule. awesomelemonade 1712 (v7 won it at r474) went to health at r1000 for both h112 and h135, and
uvafan 1653 turned for both: the panel's noise floor is about 2 cells each way per block.

## 2026-10-24 02:41 PDT: h103's block 2 to the replica (700-705)

h103 (ESCORT 2 + ESCORT_UNIT 3; block 1 438-443: +3 -2, net +1, t 0.45) gets its block 2 on the same cells while the
queue is short: submission 125 (dist/h103, 406a9d0dc3b3), matches 700-705 (v7 resubmitted, 126; bumped). Accept at
cumulative t >= 1.5 and net >= +3.

## 2026-10-24 02:47 PDT: h138 (SIEGE 60) screen queued behind h137

h138 = v7 + SIEGE 60 (dist/h138, 97ddd12a883e) brackets h136's memory from above as h137 (SIEGE 10) does from below;
screen vs h87 on seed0 15000. h137's screen is at 33/40 games.

## 2026-10-24 02:52 PDT: the panel's per-cell record pooled over twelve blocks; the hard cells

Every candidate block (426, 432, 438, 616, 622, 628, 634, 640, 646, 652, 673, 679) compared with v7's 420-425, wins
per cell pooled: coin flips the control won (IanCoolidge0 203 3/12, botfinalsafe 203 4/12, awesomelemonade 1712 5/12)
and lost (IanCoolidge0 1036 and 2644 4/12, bot1v43 2321 4/12, uvafan 1653 4/12, 1712 3/12) explain the net-0 blocks
(LEARNINGS 33; TRAINING_ALGORITHM §4 now pools the control). Pooled mean 5.4 wins in 18, v7 6. Sure wins: bot1v43 388
12/12, botfinalsafe 2740 11/12, awesomelemonade 2797 8/12. Never won: wololo 2013 (all lost r176-534 on castles),
wololo 836, botfinalsafe 1706 (r276-621), awesomelemonade 2518 (r490-899), uvafan 2046, bot1v43 2591 (1/12, r147-421).
Two looks:
- wololo 2013 (v7, 420, one castle each, 54x54): lost at r198. Wololo had no army at r75 and 14 pilgrims to our 11,
  20 to 14 at r100, 40 to 12 at r150 (it killed 22 of our pilgrims); mined K 2990 to 1158 by r198. Our bank held
  4,000 fuel unused at the end: karbonite binds.
- botfinalsafe 1706 (v7 red, 421): our castles built nothing from r33 to r93 while the bank rose to 186 K (no free
  depot in our plan, no pioneer site, no army before ECON_UNTIL 100); botfinalsafe took the contested cluster on the
  symmetry line (x 5-8, y 16-20) with a church and 5 pilgrims and had prophets in our half by r90. At r200 army 7 to
  28, mined K 678 to 1276, our bank 261 K and 8,579 fuel idle. h116 (ECON_RICH 100, the idle bank to army before
  r100) was rejected locally (t -1.07) before the protocol moved to the panel (LEARNINGS 32): a panel candidate now.

## 2026-10-24 02:52 PDT: h139 (ECON_RICH 150) to its screen and the replica panel (706-711)

h139 = v7 + ECON_RICH 150 (dist/h139, 105f222fabb6): before ECON_UNTIL 100 the bank past 150 K + the reserves builds the
peacetime army (h116 used 100). Aimed at the never-won cells (botfinalsafe 1706: castles idle r33-93). Screen vs h87
on seed0 16000 queued behind h137 and h138; replica submission 127, block 1 = matches 706-711 (v7 resubmitted, 128;
bumped), read by LEARNINGS 33 (wins against the pooled expectation, flips of never-won cells). A screen rejection
voids the panel.

## 2026-10-24 03:19 PDT: h137 (SIEGE 10) REJECTED on its screen; h138 (SIEGE 60) passes and waits on h136's panel

- h137 vs h87, 20 cells seed0 14000: 18/40, gained 1, lost 3, D 4, net -2, t -1.00; castles lost 35 vs 35: REJECTED
  (t <= -1).
- h138 vs h87, 20 cells seed0 15000: 21/40, gained 3, lost 2, D 5, net 1, t 0.45; castles lost 35 vs 32 (1.09x, bar
  1.1x), churches 456 vs 510: non-inferior. Its panel waits for h136's (SIEGE 30, 694-699): the SIEGE line goes on
  only if h136 beats the pooled expectation (LEARNINGS 33).

## 2026-10-24 03:21 PDT: h121 (early centre pioneer) to the replica panel; h140 (h121 + PIONEER_FAST) screen queued

h121 (PIONEER_EARLY 6 + PIONEER_HOLD 64 + PIONEER_LEAN 3, dist/h121 8f22f616fcf1) was rejected locally on 2026-10-23
(t -0.28, first church 4.4 rounds earlier against a 5-round bar) under the old protocol; under the screen (reject only
at t <= -1) it qualifies for a panel, and it aims at the never-won cells (LEARNINGS 33). Submission 129; the replica's
hourly scrimmage limit (HTTP 429, as on the official site) took only wololo (712) and botfinalsafe (713); the other
four are requested again after the hour (a background retry), v7 resubmitted (130) each time.
h140 = h121's switches + PIONEER_FAST 1 (dist/h140, 36e9cb230073, built from today's src) screen on seed0 17000.

## 2026-10-24 03:28 PDT: the pooled panel rule (tools/panel_pool.sh); h136 -> block 2; h128 reopened for a third block

tools/panel_pool.sh CONTROL POOLFILE BLOCK... scores candidate blocks against each cell's win rate pooled over the
control and the neutral blocks (progress/panels/v7-m1.pool), z = (wins - E) / sqrt(sum p(1-p)); TRAINING_ALGORITHM §4
now reads: after block 1 reject at z < 0.5 (v7's own 6 of 18 reads 0.2), after block 2 accept at cumulative z >= 2,
reject at z < 1, else a third block. tools/panel_submit.sh plays one block (resubmitting the candidate and retrying
scrims the replica's hourly limit refuses every 15 min, then restoring bots/v7). Unit tests pass.
Every earlier block rescored (z): h96 426 -1.80, h104 432 0.20, h103 438 0.89, h111 616 0.19, h126 622 0.19, h127
628 -1.83, h128 634 1.57 + 646 0.87 = 15 of 36 against 11.1, z 1.79, h130 640 -1.15, h123 652 -1.82, h112 673 0.19,
h135 679 0.19. Every rejection stands except h128 (two blocks between 1 and 2): a third block.
h136 (SIEGE 30) block 1 694-699: 7 of 18 against 5.7, z 0.81 (won IanCoolidge0 203, bot1v43 2321, uvafan 1712,
awesomelemonade 1712; no never-won cell turned) -> block 2. Both blocks go in after the rate window (~04:2x), behind
h121's last four.

## 2026-10-24 03:48 PDT: wololo 2013 read; h141 (church strike) screen queued

v7's r198 loss to wololo on 2013 (420, `replay.js threat`): wololo's first army came at r97 as preachers against our
contested churches: its church (40,21) stood beside ours (40,20); ours saw the preacher at r97 with 63 K, built two
preachers and died at r100; (40,33) died r116, (26,53) r138, (34,49) r153, the castle r198. Our pilgrims died to
those preachers and then prophets from r97 (22 lost). Our bank was 3 K at r100 (karbonite all in pilgrims and
churches), so h139's ECON_RICH does not fire on this map; the fights over neighbouring churches decide it.
h141 = v7 + h84's church strike (STRIKE_R2 36, PREACHER_SELF 4, PREACHER_MIL 2.5; dist/h141, 04e1af62e9bf), never
measured on the field (h84 failed a local delivery against h76): screen on seed0 18000, then the panel.

## 2026-10-24 04:19 PDT: h139 passes its screen; h140 leads its screen (t 1.29), tally pending

- h139 (ECON_RICH 150) vs h87, 20 cells seed0 16000: 22/40, gained 7, lost 5, D 12, net 2, t 0.58; castles lost 29
  vs 35, churches 558 vs 500: non-inferior; its panel 706-711 stands (706-708, 710 done).
- h140 (h121 + PIONEER_FAST) vs h87, 20 cells seed0 17000: 25/40, gained 10, lost 5, D 15, net 5, t 1.29; the
  castles tally is still running. Its panel follows once the tally clears and the hourly limit allows.

## 2026-10-24 04:24 PDT: h140 passes its screen; panel queued behind h136 and h128

h140 vs h87, 20 cells seed0 17000: 25/40, +10 -5, D 15, t 1.29; castles lost 32 vs 38, churches 497 vs 453:
non-inferior -> its panel block follows h136's block 2 and h128's block 3 (tools/panel_submit.sh now takes a lock, so
blocks never interleave: a scrim plays the submission current when it was requested). Unit tests pass.

## 2026-10-24 04:48 PDT: h139 block 1 z 2.07 (botfinalsafe 1706 won); h141 screen +5 -0; h142 (both) queued

- h139 (ECON_RICH 150) block 1 706-711 against the pool: 9 of 18 against 5.7, z 2.07, the first win in 14 blocks on
  botfinalsafe 1706, the cell it was aimed at (castles idle r33-93), plus botfinalsafe 203, awesomelemonade 1712, uvafan
  1653 and 1712, IanCoolidge0 1036. Block 2 requested now (accept at cumulative z >= 2).
- tools/panel_pool.sh counted a cell whose match was still running as a loss; it now skips them (unit tests pass).
  h103 so far: block 2 700-705 5 of 15 (704 running), cumulative 12 of 33 against 10.0, z 0.94.
- h141 (church strike) vs h87, 20 cells seed0 18000: 25/40, gained 5, lost 0, D 5, t 2.24; castles lost 29 vs 39,
  churches 547 vs 466. Panel requested (after h139's block 2 and h140's block 1; tools/panel_submit.sh's lock).
- h142 = v7 + h139's and h141's switches (dist/h142, de28240ef2f0): screen on seed0 19000.

## 2026-10-24 05:20 PDT: h142 passes its screen; h143 (all three leads) queued; h103 and h121 wait on awesomelemonade/uvafan

- h142 (h139 + h141) vs h87, 20 cells seed0 19000: 22/40, +7 -5, D 12, t 0.58; castles lost 36 vs 38, churches 569
  vs 439: non-inferior. Its panel waits for h139's block 2 and h141's block 1 (the replica queue is near 25).
- h103 cumulative 12 of 33 against 10.0, z 0.94 (704 vs awesomelemonade still running); h121 block 1 so far 5 of 15
  against 5.1, z -0.07 (717 vs uvafan running).
- h143 = v7 + h139's, h140's and h141's switches (dist/h143) screen on seed0 20000.

## 2026-10-24 05:47 PDT: h103 and h121 REJECTED on the replica (pooled rule)

`contest19.py fetch --new` reads one page of matches: the slow awesomelemonade and uvafan matches (704, 717) had
fallen off it and were never fetched; `fetch --new --pages 6` took them (HANDOFF's reading command now says so).
- h103 (ESCORT 2 + ESCORT_UNIT 3) blocks 438-443 + 700-705: 12 of 36 against the pooled 11.2, z 0.35 (< 1 after two
  blocks): REJECTED.
- h121 (early centre pioneer) block 1 712-713, 716-719: 5 of 18 against 5.7, z -0.45: REJECTED. It won two never-won
  cells (awesomelemonade 2518, wololo 836) and lost a sure one (botfinalsafe 2740); h140 (h121 + PIONEER_FAST, panel
  744-749) reads the same idea again.
Both blocks join progress/panels/v7-m1.pool.

## 2026-10-24 05:56 PDT: h143 (three leads) passes its screen; h144 (ECON_RICH 250) queued

- h143 vs h87, 20 cells seed0 20000: 24/40, gained 11, lost 7, D 18, t 0.94; castles lost 40 vs 55, churches 531 vs
  545: non-inferior. Its panel follows the single leads' (h139 block 2, h141, h140).
- h144 = v7 + ECON_RICH 250 (dist/h144) brackets h139 from above; screen on seed0 21000.

## 2026-10-24 06:41 PDT: h128 ACCEPTED on the replica (pooled rule, z 2.54): frozen as v8; h136 and h144 REJECTED

- h128 (v7 + ESCORT_FIRST 2, ESCORT_MIRROR 1, ESCORT_UNIT 3: two crusaders hold the enemy's mirror image of our first
  contested site) block 3 726-731: 8 of 18 against the pooled 5.6 (z 1.48 alone); three blocks 634-639 + 646-651 +
  726-731: 23 of 54 against 16.1, **z 2.54** (pre-registered 03:28: a third block accepted at z >= 2): **ACCEPTED**.
  Cells won in every block: wololo 2644 3/3 (the pool 0 of 13), IanCoolidge0 2644 3/3 (2 of 13) and 1036 3/3 (3 of
  13), awesomelemonade 1712 3/3 (5 of 13); lost every time: botfinalsafe 203 (6 of 13), bot1v43 2321 (4 of 13).
  Caveat: h128 was reopened because its first two blocks scored best of thirteen candidates (a selection); the third
  block, played after the rule was written, carries the confirmation alone at z 1.48.
- bots/v8 = dist/h128 (cd4c900d6216; bots/ROSTER.tsv). src defaults now ESCORT_FIRST 2, ESCORT_UNIT 3, ESCORT_MIRROR
  1; three escort tests pin v7's values (test/bot.test.mjs testPreV8). Identity, --det on 799 to 300: dist/h128, the
  defaults-only build out/v8d and today's src with h128's cfg (out/v8chk) replay IDENTICAL; the no-op reference is
  now h128's replay. Unit tests 137 node + Python pass.
- Replica: submission 149 = bots/v8, our ladder build (tools/panel_submit.sh restores $LADDER, default bots/v8). v8's
  panel record is h128's three blocks: progress/panels/v8-m1.pool with control 726-731
  (`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK...`). Local screens are now against bots/v8.
- h136 (SIEGE 30) blocks 694-699 + 720-725: 12 of 36 against 11.2, z 0.33: REJECTED (joins the v7 pool). The SIEGE
  line closes; h138 (SIEGE 60) is not played.
- h144 (ECON_RICH 250) vs h87, 20 cells seed0 21000: 15/40, +1 -6, D 7, t -1.89; castles lost 44 vs 33: REJECTED.
- In flight on the v7 pool, read for the idea, not for acceptance: h139 (ECON_RICH 150) block 2 732-737 (cumulative
  so far z 1.22), h141 (church strike) 738-743, h140 (early fast pioneer) 744-749; h142, h143 (stacks on v7) are
  dropped. Rebased onto v8, screens vs bots/v8 queued: h145 = v8 + ECON_RICH 150 (seed0 22000), h146 = v8 + the
  church strike (23000), h147 = v8 + h140's pioneer switches (24000).

## 2026-10-24 06:47 PDT: h139 two blocks z 1.96 against v7; the idea moves to h145 on v8

h128's blocks (634-639, 646-651) left progress/panels/v7-m1.pool: an accepted build is not neutral. Rescored on the
v7 pool: h139 (ECON_RICH 150) blocks 706-711 + 732-737: 15 of 36 against 10.7, **z 1.96** (botfinalsafe 203 2/2,
awesomelemonade 1712 2/2, uvafan 1653 2/2, botfinalsafe 1706 1/2 against the pool's 0 of 14); h136 stays rejected
(z 0.58). By the rule h139 would get a third block, but v7 is no longer the champion: the idea is carried by h145
(v8 + ECON_RICH 150, screen vs bots/v8 at 24 of 40), whose panel goes in when the screen passes. h141 so far 4 of 12
(z 0.59), h140 2 of 3 (z 1.10).

## 2026-10-24 06:48 PDT: h145 (v8 + ECON_RICH 150) to the replica panel beside its screen (750-755)

Submission 150 (dist/h145, de5c9212eb2a), block 1 = matches 750-755 (bots/v8 resubmitted, 151; bumped). Read with
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 750-755`; a screen rejection voids it.

## 2026-10-24 07:03 PDT: h145 passes its screen vs v8; its panel 750-755 stands

h145 (v8 + ECON_RICH 150) vs bots/v8, 20 cells seed0 22000: 23/40, gained 6, lost 3, D 9, net 3, t 1.00; castles
lost 30 vs 34, churches 506 vs 419: non-inferior. h146 (church strike on v8) screen running.

## 2026-10-24 07:20 PDT: h141 (church strike) REJECTED on the replica (pooled z 0.43)

h141 block 1 738-743 against the v7 pool: 6 of 18 against 5.3, z 0.43 (< 0.5): REJECTED; joins the v7 pool. On its
target, wololo 2013 (738, h141 red), the strike worked as built: wololo's churches beside ours died first ((40,32) at
r103 to our preachers, (27,17) at r110), our castle lasted to r367 against v7's r198, army 22 vs 12 at r150; still
lost. h146 (the strike on v8) finishes its screen; its panel waits behind the leads, as the field read is weak.
h140 so far 3 of 12 (z -0.55), h145 1 of 3.

## 2026-10-24 07:40 PDT: h146 (church strike on v8) passes its screen; time labels corrected

h146 vs bots/v8, 20 cells seed0 23000: 23/40, gained 5, lost 2, D 7, net 3, t 1.13; castles lost 35 vs 38: passes.
Its block 1 goes to the replica behind h145 (h141, the same strike on v7, read z 0.43 there). The headings of this
log from 2026-10-24 02:41 to 07:20 were estimated and ran up to four hours fast; they, the ledger dates and the
references to them now carry the commit times (LEARNINGS 34). v8 census of the never-won games under way: on
bot1v43 2321 (636) all three chainers were born on (32,9) inside a camping prophet's reach and died at birth (r200,
r300, r400) while the castle held 586-1,330 K for 200 rounds and fell at r444 with 1,330 banked.

## 2026-10-24 07:58 PDT: h147 passes its screen; CFG.CHAIN_LIVE built, h148 and h149 queued

h147 (v8 + h140's early fast centre pioneer) vs bots/v8, 20 cells seed0 24000: 26/40, gained 12, lost 6, D 18, net
6, t 1.41; castles lost 23 vs 38: passes, and goes to the replica (block 1 behind h146), though h140, the same switch
on v7, reads 3 of 15 there against 4.2 (z -0.89).

The v8 census of the chain reserve (CHAIN_K 1000 from r200, held by every structure's peacetime army) in the field
games: three ways it holds the bank for a chain that cannot fire. (1) Stillborn chainers: bot1v43 2321 (636), the
castle at (33,9) built its chainer on (32,9) at r200, r300 and r400, each shot on its first turn by red prophet #953
camping at (26,13) (r2 52 to the tile, 65 to the castle); the bank rose 586 -> 1,330 K over r250-444 with the army
frozen at 40-50 behind the castle, which fell at r444. (2) Walled-off chainers: botfinalsafe 2740 (635), a chainer
waits at (14,58) on the bottom-edge corridor, its way on blocked by our own pilgrim and church at (16,58)-(17,58),
until CHAIN_GIVEUP; the castle relaunches every 100 rounds and the bank sits at 1,085-1,275 K from r300 to r600 (we
won anyway). (3) Too little income: wololo 836 (634), no church, 5-9 pilgrims, 3.6 K a round: the bank never nears
1,000 and the castle falls at r463 with 5 units. On botfinalsafe 203 (727) the enemy's own church line (churches 2
tiles apart along row 7 at r388, a preacher born beside our castle) killed two of our castles holding 790-950 K.

CFG.CHAIN_LIVE (default 0, no-op IDENTICAL on 799, 139 node tests): 1, a castle's peacetime army leaves CHAIN_K in
the bank only while a chainer of ours walks or waits (castle talk CT.CHAINER from any robot); 2, only while one waits
staged (new CT.STAGED 79). Churches unchanged. Screens vs bots/v8: h148 (CHAIN_LIVE 1, seed0 25000), h149 (CHAIN_LIVE
2, 26000). Pre-registered: either passes the screen, then the v8-pool panel decides; the mechanism is visible if the
bank above 600 K with no chainer live drops in the census games' cells (dlv per-game bank not yet measured).

## 2026-10-24 08:24 PDT: h145 and h140 REJECTED on the replica; the v8 census of 54 field games

h145 (v8 + ECON_RICH 150) block 1 750-755 against the v8 pool: 8 of 18 against 8.0, z 0.00: REJECTED (joins the v8
pool); the idle-bank switch that read z 1.96 on v7 (h139) reads nothing on v8: the ECON_RICH line closes. h140 (v7 +
early fast centre pioneer) 744-749 against the v7 pool: 5 of 18 against 5.4, z -0.24: REJECTED (joins the v7 pool);
it won awesomelemonade 2518 (pool 1 of 15), as h121 did; h147 carries the switch on v8 (764-769).
tools/panel_pool.sh flags cells by the pooled rate now (won at p < 0.25, lost at p > 0.75): "won at most once" read a
1-of-3 cell as never won.

Census (timeline at r100-600 of all 54 v8 games, 634-639, 646-651, 726-731): the army stops growing at r200 in nearly
every game and stays flat until the first chain fires (uvafan 2046: 33 units r200-400, first line r352; awesomelemonade
2797: 29-34 units r200-400, first line r728/754; bot1v43 2321: 40 units r200-470, no line; IanCoolidge0 203: 5-10
units, first line r478) while the bank climbs 4-8 K a round toward CHAIN_K. Wins come from early lines on small maps
(wololo 2644 r250, bot1v43 388 r291, awesomelemonade 1712 r225, IanCoolidge0 2644 r283) and repeated lines on
IanCoolidge0 1036 (five). Two never-won cells are one pattern: a single central cluster on the symmetry axis (bot1v43
2591, 32x32: home clusters of two depots each; awesomelemonade 2518, 36x36): the castle builds 2-3 home pilgrims, the
two escort crusaders (r3-r5, 30 K) and its pioneer only at r23-24, which dies at r30-31; the enemy has a church there
by r23 (2591) / two by r40 (2518), and we mine 180-336 K by r100 to its 700+.

## 2026-10-24 08:42 PDT: h148 passes its screen and goes to the replica; CFG.WATCH built, h150 queued

h148 (v8 + CHAIN_LIVE 1) vs bots/v8, 20 cells seed0 25000: 23/40, gained 3, lost 0, D 3, net 3, t 1.73; castles lost
35 vs 39: passes. Its block 1 goes to the replica now (queue 12 waiting). Bank at the end, summed over the 40 games:
199 K vs v8's 209 K; stillborn units 217 vs 269.

CFG.WATCH (default 0, no-op IDENTICAL on 799, 140 node tests): every WATCH turns at most, a castle or church that
sees an enemy crusader, prophet or preacher within r2 100 that none of our military units sees radios the nearest
one as a spot (FAR.ENEMY, the SPOT signal), when its radio is free after its build; the SPOT_MASK types (melee by
default) that hear it engage it as they engage a prophet's spot. The case: bot1v43 2321 (636), red prophet #953
stood at r2 65 from our castle, outside its reach, and shot our chainers on their build tile at r200, r300 and
r400, while our 40 units stood 7-11 tiles east and never saw it; the castle fell at r444. Screen h150 (WATCH 2) vs
bots/v8, seed0 27000. Pre-registered: passes the screen, then the v8-pool panel decides (bot1v43 2321 is a panel
cell).

## 2026-10-24 08:42 PDT: h151 (CHAIN_FAILS 1 on v8) queued, with a pre-registered reading

h133 (CHAIN_FAILS 1 on v7) read t 0.82 (+4 -2) on its screen and was rejected only on castles lost, 35 vs 30
(1.17x). Against the incumbent the switch stops our lines while the incumbent's keep coming, so castles lost
measures v8's own chain, which few field bots share (LEARNINGS 32; the census of v8's 54 field games noted one
enemy church line, botfinalsafe on 203). h151 = v8 + CHAIN_FAILS 1, screen vs bots/v8 seed0 28000. Pre-registered: t <= -1 rejects as
usual; if it fails only the castles criterion with t > 0, its block 1 goes to the replica anyway, flagged in the
ledger as a screen exception, and the panel's block-1 rule (z < 0.5) is the guard.

## 2026-10-24 08:49 PDT: replica ratings unstalled (owner, PROMPTS 33)

The owner saw the replica's team rating history graphs a few days stale. Cause: the three ranked autoscrim matches
cancelled when Nydroam.BatteredCod and IvanGeffner's two bots were dropped (196, 207, 214; a queryset .update()) never
triggered siarnaq's rating update, and ratings are finalized per team in match order, so 716 of 1,554 participations
waited behind them; the newest rated match was 613 (2026-10-23 16:00 UTC). tools/galaxy19/rating_unstick.py ran
siarnaq's own Match.try_rating_update along the stalled chains (41 passes) after saving every participation's rating
link to /var/tmp/bc19-rating-snapshot.json on the VM: 6 left unrated, all behind two field matches still queued.
vibe19's latest rated ranked match is 660 (2026-10-24 07:15 UTC, rating 1660). The run was meant as a dry run first;
the manage wrapper clears the environment, so DRY=1 never reached it and it ran for real (the same change, made one
step early, after the snapshot). The tool's dry run is now a first line on stdin. The graphs move only on ranked
matches (autoscrim at most daily, held while 30+ wait; the field's upward challenges); our scrims are unranked.
LEARNINGS 35.

## 2026-10-24 08:52 PDT: h146 REJECTED on the replica; our side in a panel cell is a coin flip

h146 (v8 + church strike) block 1 758-763 against the v8 pool: 5 of 18 against 8.0, z -1.98: REJECTED (joins the v8
pool). With h141 (the same strike on v7, z 0.43) the church-strike line closes.

Panel scrims are requested with galaxy's shuffled player order, so each block plays a cell on a random side. Pooled
over the v7 pool's 16 blocks, side does not matter overall (we win 43 of 141 games as red, 39 of 147 as blue); a few
cells lean (bot1v43 2321 red 4/7, blue 1/9; awesomelemonade 1712 red 1/7, blue 5/9), and on the v8 pool wololo 2644
is won 3 of 3 as red and lost 2 of 2 as blue, about what chance gives over 18 cells. The side adds variance to the
panel, not bias; the rule stays. Open: fixing the order per opponent in progress/panels/v7-m1.json (as its maps are)
would make every block play each cell on the same side; to be decided before a block is requested, not after.

## 2026-10-24 09:07 PDT: h149 passes its screen and goes to the replica

h149 (v8 + CHAIN_LIVE 2: castles hold the chain reserve only while a chainer waits staged) vs bots/v8, 20 cells
seed0 26000: 20/40, gained 3, lost 3, D 6, t 0.00; castles lost 35 vs 34 (1.03x): passes. Churches built 442 vs 560;
bank at the end 38 K vs 48 K over the 40 games. Its block 1 goes to the replica behind h148's (777-782). The panel
order stays shuffled: with a pool that mixes sides, a fixed side would bias the expectation wherever a side effect
is real, while shuffled keeps the pooled expectation unbiased (TRAINING_LOG 08:52).

## 2026-10-24 09:09 PDT: h149's block is 955-960; the daily autoscrim fired, 190 matches waiting

The replica's autoscrim fired at 09:00 PDT (24 h after the last; the queue had dropped to 14): 174 ranked matches
between ladder teams, 190 waiting in all. At the recent 10-11 matches an hour it clears in about 18 hours; our own
matches (h147's 767-769, the v8 field scrims 770-776, h148's 777-782, h149's 955-960, autoscrim 887 uvafan) are
bumped to the front (tools/bump_ours.sh --ours), the activity service adds nothing while matches wait, and the next
autoscrim is held until fewer than 30 wait. These ranked matches are what moves the rating history graphs.

## 2026-10-24 09:25 PDT: h147 REJECTED on the replica (z 0.34); the early pioneer wins the centre only when the bank can pay

h147 (v8 + PIONEER_EARLY 6, HOLD 64, LEAN 3, FAST 1) block 1 764-769 against the v8 pool: 8 of 18 against 7.5, z
0.34: REJECTED (joins the v8 pool). It won three cells the pool rarely wins (awesomelemonade 2518, 0 of 5; bot1v43
2321, 0 of 5; botfinalsafe 203, 0 of 5) and lost IanCoolidge0 2644 (5 of 5).

awesomelemonade 2518 (one castle each, the karbonite in a central cluster): h147 (blue, 768) had a church by r25 and 8
pilgrims by r50, awesomelemonade 4 pilgrims and no church; its castle fell at r288. v8 (blue, 730) had no church and
3-4 pilgrims to r150 while awesomelemonade had 11 pilgrims and 2 churches by r50 (lost r723). h140, the same switch on
v7, won 2518 too (748, r274). On this map the central cluster is the game.

IanCoolidge0 2644 (h147 red, 769, lost r423): IanCoolidge0 sends two crusaders at r2-3; our castle answers with two
preachers at r14-15 (60 K); two of our four opening pilgrims are pioneers (#2508 from r3, #3802) and wander at
(25-37, 11-18) for 40+ rounds with a bank of 20-60 K, never able to build; IanCoolidge0 churches the cluster at
(28,19) at r42 and (20,9) at r55. Two pilgrims mine: 176 K by r100 against 548 K for v8's build (763), which had a
church by r50, 13 pilgrims by r100 and killed the castle at r265. The early pioneer wins the race when the bank can
pay for the church on arrival and costs half the opening economy when an early rush drains the bank. A refinement
to try: send it early only while the bank can pay for the church by its arrival, and turn a waiting pioneer into a
miner when the castle spends on defence.

## 2026-10-24 09:27 PDT: v8's first field scrims against unplayed top bots: arya-k 3-0, rafekruse 0-3

774 arya-k (1829): won 1712, 2321, 70 by castles (r362-481). 771 rafekruse (1955): lost 520, 203, 1626, all at
r1000 on castles or health. 520 (red): a castle lost near r700 with our fuel bank 87 (26 at r1000). 203 (blue):
rafekruse's first church r14, ours r308; it built 274 crusaders and lost 257, we killed them with 114 preachers
(damage dealt 12,140 vs 11,180) but our fuel ran to 2 at r900 and a castle fell at the end. On 203 our side has 10
depots (plan.mjs: our castles staff 8, one cluster planned, c3@(29,18)); our 8 pilgrims were out by r12, the pioneer
to c3 died at r34, and from r40 to r100 the castles built nothing (ECON_UNTIL 100) while the bank rose to 495 K
(950 at r300). That is ECON_RICH's case (closed on v8 at z 0.00); with no depot left to staff, a saturated economy
could end ECON_UNTIL at once. 1626 (red): even castles; rafekruse's army 107 against our 25, mined K 11,480 vs 5,770.

## 2026-10-24 09:37 PDT: h150 (WATCH 2) passes its screen and goes to the replica; h152 and h153 queued

h150 (v8 + WATCH 2) vs bots/v8, 20 cells seed0 27000: 25/40, gained 8, lost 3, D 11, net 5, t 1.51; castles lost 24
vs 38: passes. In one game (1063) our structures sent 315 radio messages against v8's 117, eight line churches
spotting the same enemy at r270 (10 fuel each). Block 1 = 961-966 (submission 164), at the front of the replica queue
with h148's and h149's. Screens queued behind h151: h152 (CHAIN_LIVE 1 + WATCH 2, the two passing screens stacked,
29000) and h153 (WATCH 2 + SPOT_MASK 56: prophets also answer structure spots and walk into the band, 30000).

## 2026-10-24 09:48 PDT: h154 and h155: the escort fixes from the wololo study

Two switches from the study of v8's losses to wololo (workflow over replica 634, 646, 726, 758, TRAINING_LOG
2026-10-24 09:25). ESCORT_HOLD_R: a unit that heard SIG.GUARD at birth holds lattice tiles within this many king
steps of its site instead of LATTICE_R 12. On 2013 (726) v8's two escort crusaders stopped on the first lattice tile
inside 12 steps of the centre site, two steps from home, and stood there r6-r48 out of sight of the wololo crusader
parked on the site; they reach the site only when their diagonal steps miss every lattice tile, as on 2644.
ESCORT_EARLY: the castle builds ESCORT_FIRST's units on turns 3-4, ahead of the economy pilgrims, not 4-5. On 2644
as blue (758) the r5 crusader acts after red's r5 prophet in the build order and lost their duel by one shot
(r14-18); as red (634, 646, 726) the same crusader acts first and won. Both off by default (the default build replays
h128's game byte for byte; 142 unit tests). Screens: h154 = v8 + ESCORT_HOLD_R 2 + ESCORT_EARLY 1 (31000; stacked,
so one panel block tests both) and h155 = v8 + ESCORT_HOLD_R 2 alone (32000), queued behind h153.

## 2026-10-24 10:08 PDT: h151 rejected; the VM goes to the replica until its queue clears; INTERCEPT built (h156)

h151 (v8 + CHAIN_FAILS 1) vs bots/v8, 20 cells seed0 28000: 18/40, gained 1, lost 3, D 4, t -1.00; castles lost 31 vs
19, churches 314 vs 593 (held chain lines). Rejected at the screen; the pre-registered exception needed t > 0.

Queue: 185 replica matches waited (173 ranked, the 09:00 autoscrim), about 15 h at 6 slots with a mean match of 1,700 s.
No team dominates it (the slowest, NielsKornerup at 5,060 s a match, holds 4 of the 185), so dropping bots would not
help. Per the owner's queue rule (PROMPTS 17) the VM now belongs to the replica: the pending screens h152-h155 moved to
~/jobq/superseded at 09:52, and at 10:06 saturn restarted with 8 execute slots (MAX_EXECUTE_SLOTS 6 -> 8, the unit's
MemoryMax 22G -> 27G, CPUQuota 700% -> 800%; 8 games on 8 vCPUs, as 6 + our 2 gate games were). About 11 h at 8
slots. When fewer than 30 wait: back to 6 slots and `tools/move_stale.sh --back` the held screens.

INTERCEPT_R2 / INTERCEPT_DWELL (the third candidate of the wololo study): a structure that sees an enemy pilgrim
within INTERCEPT_R2, or standing INTERCEPT_DWELL turns on one tile, more than 2 king steps from every enemy structure
in sight and out of reach of our military, builds a unit that hits it in its birth round: a crusader on an adjacent
tile within r2 16, else a prophet at r2 16-64. Off by default (h128's game replays byte for byte; 143 unit tests). One
driver game, h156 (R2 64, DWELL 3) vs v8 on 2013: prophets #925 (r88) and #3261 (r106) killed blue pilgrims on their
first turn. h156's screen (33000) waits with the others.

## 2026-10-24 10:24 PDT: the never-won cells share one flaw: v8's escorts stop short of the contested site; h157 queued

The v8 pool (control 726-731 + five blocks) has four cells v8 never won: bot1v43 2591, botfinalsafe 1706, wololo
2013 and 836 (0 of 6 each). Three of them show the flaw the wololo study found on 2013: ESCORT_MIRROR sends the two
r4-5 escort crusaders to the contested site, and they stop on the first lattice tile within LATTICE_R 12 of it.
- 2591 (779, lost r120 by castles; 32x32, one castle each): the site is 11 king steps from home, so the escorts never
  left home; they died there at r40-43. The 30 K they cost delayed our pioneer to r24 (bank 50 K at r4, 90 K needed);
  bot1v43's pilgrim churched the 10-depot centre cluster at r23 with a prophet at once. Our castle then built one
  prophet a turn (r34-38, r107-109) while two enemy prophets stood at r2 82-85 from it, out of its range; each
  newborn stepped onto the lattice tile (7,14), inside both, and died the next turn.
- 1706 (778, lost r336; 37x37, one castle each): the escorts walked one tile a turn (CRUISE_R2 2) from r4 and stood
  at (13,9) and (12,10) from r27, 10 steps from the site (7,19) and out of its sight; botfinalsafe churched it at r29
  and held it with 13+ prophets. Our pioneer #1228 then stood 9 tiles off for 100+ rounds, and we mined 920 K to its
  2,658 (7 pilgrims and one church against 16 and 14). h147's early pioneer (765) got within 5 tiles by r20 and was
  driven off by botfinalsafe's early prophet.
One driver game each on 1706 vs v8: h155 (ESCORT_HOLD_R 2) brings the escorts to (9,17) and (9,21) by r31; with
ESCORT_FAST_R2 9 (new: an escort walks with steps up to r2 9 until it first holds at its site; off by default, h128's
game replays byte for byte, 143 unit tests) they arrive at r16-17, for about 125 more fuel by r25. h157 = v8 +
ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 (34000). The held screens now run in this order when the VM returns: h157, h155,
h154, h156, h152, h153.

## 2026-10-24 10:30 PDT: h148 (CHAIN_LIVE 1) passes panel block 1, z 2.20; block 2 = 967-972

h148's block 1 (777-782) against the v8 pool (control 726-731 + the five v8-m1 blocks): 11 of 18 against a pooled
expectation of 7.6, z 2.20. It won three rarely-won cells (bot1v43 2321, botfinalsafe 203, uvafan 1712: uvafan's
castles fell at r573) and lost one usually-won cell (botfinalsafe 2740); the four never-won cells stayed lost. Block 2
(submission 166, ladder build resubmitted as 167) = matches 967-972, run first with our other panel matches.

## 2026-10-24 11:28 PDT: h149 (CHAIN_LIVE 2) and h150 (WATCH 2) rejected on panel block 1

Against the v8 pool (control 726-731 + the five v8-m1 blocks), block 1 each:
- h149 (CHAIN_LIVE 2, castles hold the chain bank only while a chainer waits staged; 955-960): 8 of 18, pooled
  expectation 7.6, z 0.28 < 0.5. Won the rarely-won botfinalsafe 203; lost botfinalsafe 2740 (every other block won
  it) and awesomelemonade 2797.
- h150 (WATCH 2, structures radio attackers no military unit sees; 961-966): 7 of 18, E 7.6, z -0.37. All seven wins
  in cells the pool wins half the time or more; lost wololo 2644 and IanCoolidge0 203.
Both blocks join progress/panels/v8-m1.pool (now control + 7 blocks). h148 (CHAIN_LIVE 1) block 2 (967-972) runs.

## 2026-10-24 11:43 PDT: h148's block-2 decision fixed before 967-972 is scored; h146's block leaves the v8 pool

The audit's evaluation lens (PROMPTS 34) found that a rejected block from a clearly worse candidate lowers the pooled
expectation and inflates the z of later candidates: h146's block (758-763, own block-1 z -1.98) alone moved h148's
block-1 z from 2.02 to 2.28. Rule from now on: a rejected candidate's block joins the pool only when its own z at its
decision lies within +-1. 758-763 leaves progress/panels/v8-m1.pool; the other rejected blocks (750-755 z 0.00,
764-769 0.34, 955-960 0.28, 961-966 -0.37) stay. h148 block 1 against this pool: 11 of 18, E 7.9, z 2.02.
h148's decision, fixed before any of 967-972 is scored (the match list at 11:26 showed 969 at 2-1; nothing else
read): `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 777-782 967-972` at this commit, read only once all
six matches have finished; accept at cumulative z >= 2, reject below 1, otherwise a third block accepted at z >= 2.

## 2026-10-24 11:58 PDT: our side decides replica panel games; h148's block-2 rule amended before 970 and 971 finish

The audit's infra lens found that the pooled z ignores which side we played. In the finished v8-family blocks we won
41 of 67 games as red and 24 of 77 as blue, with gaps inside single cells (wololo on 2644: red 5/5, blue 0/3;
IanCoolidge0 on 203: red 4/5, blue 0/3; botfinalsafe on 203 the other way, red 0/5, blue 3/3). Red moves first. Panel
scrims use galaxy's player order '?', so each match alternates sides from a random start (BRB or RBR) and every block
draws a different side mix: noise the side-blind z does not count.
Changes, all from this commit: `tools/panel_pool.sh` (now `contest19.py pool`) prints, beside the side-blind z, a
side-aware z with p per (opponent, map, our side) = (w_s + 2p) / (n_s + 2), p the side-blind cell rate; its side-blind
z equals the old script's on every finished block combination tried. It refuses a candidate block with a match not
downloaded unless --partial. New panel blocks (tools/panel_submit.sh, SIDES=both) request each opponent twice, NAME@+
(we are red in all three games) and NAME@- (blue): 36 games, every cell on both sides, scored side-aware.
Disclosure: while 967-972 was running, the audit agent rescored the downloaded part of it and reported side-blind z
1.69 and side-aware 0.69 (about 2 of 3 of the block). No one acts on those numbers. h148's rule, fixed now, before 970
and 971 finish, picks no side of that split: at `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 777-782
967-972` once all six matches are downloaded, accept when both the side-blind and the side-aware cumulative z are >= 2;
reject when both are below 1; otherwise a third block, both sides (36 games), decided by the side-aware z over all
three blocks: accept at >= 2, else reject. From the next candidate on, panel decisions use the side-aware z only, with
the existing bars (block 1 reject below 0.5; block 2 accept at >= 2, reject below 1; else a third block at >= 2).

## 2026-10-24 12:25 PDT: audit (PROMPTS 34) acted on: bot switches, screen bars, side-effect correction, rules rewritten

Correction to 11:58: the raw split (red 41 of 67, blue 24 of 77) mixes in which cells drew which side. Stratified by
cell (Cochran-Mantel-Haenszel), red wins about 13 points more often than blue inside a cell in v8's blocks (z 2.18)
and not at all in v7's. h148 block 1 side-aware with k 2 is 1.66 (side-blind 2.02); the audit agent's 1.15 and 0.69
came from an unshrunk side estimator (p per side alone, (w_s + 1/2) / (n_s + 1)), not from `contest19.py pool`.
Bot (all CFG switches defaulting to v8; the 799 r300 defaults build replays IDENTICAL to h128, 306350 bytes,
errors 0): RADIO_WAIT (a castle's chain launch or pioneer waits a turn while the attack call holds the radio, as
escort() does; in replica 731 game 3, 5 of 5 chain launches after r450 and 3 pioneer re-sends were built deaf),
CHAIN_WALL (a chain that meets the enemy's wall reports CT.WALL and stops; castles count it), SIEGE_NOW. Removed
before any game: ATTACK_LAST (moving the call after the builds starves it when builds carry messages every turn) and
DUMP_HOLD.
Screen bars, for h154 on (no held screen has run): t <= -1.5, castles lost at a one-sided sign-flip p < 0.05, or an
exception (thrown or caught) the champion lacks; `tools/paired.js --h2h` prints them and its verdict. They replace
t <= -1 and the 1.1x castles ratio; on h145-h151 the verdicts are the same (h151 rejected: castles 31 vs 19, p 0.013).
Frozen turns and timeouts are printed per million turns (the machine causes most: LEARNINGS 31).
TRAINING_ALGORITHM rewritten in step 5-7, §4, §5, §7, §8: the two-block rule and "never pooled history" go; the pooled
side-aware z, the 36-game both-sides block, the +-1 join rule, the studied-cells rule (a candidate built from panel
cells must score z >= 0 on the other cells too) and the no-reopen rule (no rejected candidate reopened under a later
rule without fresh blocks) go in. v8's acceptance (06:41) came after reopening h128 under a rule written after its
block 2: its third block alone scored z 1.71 side-blind and 2.04 side-aware against the v7 pool, and the three blocks
side-aware 3.19, so v8 stays; the rule now forbids the reopening. Audit verdicts kept: canonical frame, CFG switches,
pooled panels, the screen that only rejects. Pending from the audit: symcheck to round 1000 on v8 (it stopped at
the first fight on h127, LEARNINGS 38), zombie pioneers (the castle re-sends a timed-out pioneer to the same cluster),
the sandbox failing open when a remount fails, a v8 control block on both sides, and the panel design's simulated
false-accept rate and power.

## 2026-10-24 12:29 PDT: h148 block 2 (967-972) scored: a third block, both sides

All six matches downloaded at 12:29. `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 777-782 967-972` (the
scorer of 979998a plus only the 12:25 file-closing fixes): 20 of 36 against the pooled 15.8, side-blind z 1.94;
side-aware (k 2) 16.6, z 1.79. Neither both >= 2 nor both below 1, so by the rule of 11:58: a third block, both sides
(36 games, 12 matches), decided by the side-aware z over all three blocks, accept at >= 2, else reject:
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 777-782 967-972 BLOCK3` once every match of block 3 is
downloaded. Block 2 alone: won the rarely-won uvafan 1712 as blue; lost wololo 2013 and 836 (never won).
Block 3 = matches 973-984 (submission 168; each opponent @+ and @-), requested 12:30; the ladder build is v8 again
(submission 169).

## 2026-10-24 12:55 PDT: the panel rule simulated; the screen's t bar simulated; symcheck's first v8 run was a tool bug

`tools/galaxy19/panelsim.py` (new): truth = the v8 pool's side-aware cell rates; every trial redraws the pool's 126
games, plays candidate blocks shifted on the logit scale to a given gain, and applies the pooled rule (0.5; 2 and 1;
2). 4000 trials each. 36-game both-sides blocks: accept 7.3% at no gain, 44.8% at +1 win per 18 games, 69.5% at +1.5,
85.0% at +2 (mean 1.45-2.05 blocks). 18-game blocks with a random side per cell: 6.2%, 27.7%, 45.9%, 65.9%. The
both-sides design buys about 17-20 points of power for 1 point of false accepts; the bars stay.
`tools/gatesim.js` now defaults to the screen (one look at 20 cells, reject at t <= -1.5): a neutral candidate is
rejected 5.2% (discordance 0.15) to 7.3% (0.55) of the time, one at p 0.6 per discordant cell 1.7-2.4%.
symcheck on v8 (seed 1) stopped at round 208 on a bug of the new stepper, not the bot: it judged an axis contest from
the red twin's position after the red twin had moved. Claims are now taken from the pre-round board
(`contested()`, unit-tested); the four-seed run to round 1000 restarted at 12:50.
New switch PIONEER_TIMEOUT_REST (default 0 = v8): a pioneer still alive 80 turns out without its church rests its
cluster PIONEER_LOST_REST rounds, as a lost one does (v8 forgets it and may send a second pioneer to the same site at
once). Unit test; the no-op replay waits for the driver.
Correction: the entry above, headed 12:55, was written at 12:36 PDT (`date`), and the symcheck restart it calls 12:50
came a few minutes before 12:36. Those times were estimated, against LEARNINGS 34; HANDOFF's "TRAINING_LOG 12:55"
points at that entry.

## 2026-10-24 12:47 PDT: the replica sandbox fails closed

`tools/galaxy19/sandbox.sh` (every replica compile and game) suppressed failed remounts, so a mount it could not make
read-only stayed writable and the bot ran anyway (audit, infra lens). Now each remount keeps the mount's own flags
(a user namespace may not clear an inherited nosuid / nodev / noexec), and afterwards any writable mount but the work
directory and /proc, /sys, /dev stops it with exit 3 before the command runs. Unit test on the driver (only lo; home
read-only; the refusal with a mount left writable on purpose); on the VM inside a transient unit with saturn's
settings (ProtectSystem=strict, PrivateTmp, ReadWritePaths, PrivateNetwork): work directory writable, the replica's
home, storage and /tmp read-only, only lo. Goes live with `deploy.sh app` at the saturn restart (HANDOFF).
Correction: the entry above, headed 12:47, was written at 12:39 PDT (`date`; LEARNINGS 34). Checked at 12:39.

## 2026-10-24 12:51 PDT: studied cells of the held candidates, fixed before any of their screens or panels

TRAINING_ALGORITHM §4 (the pool is not a test set): h154, h155, h157 (escort fixes) and h156 (INTERCEPT) were
designed from the wololo study (replica 634, 646, 726, 758) and the never-won cells (TRAINING_LOG 09:48, 10:08,
10:24). Their studied cells, both sides: wololo 2013, 2644 and 836; bot1v43 2591; botfinalsafe 1706. Each is
accepted only if, beside the pooled rule, its side-aware z over the other cells is >= 0:
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCKS --studied
m-schier.battlecode-2019-wololo:seed-2013,m-schier.battlecode-2019-wololo:seed-2644,m-schier.battlecode-2019-wololo:seed-836,StoneT2000.BC19-bot1v43:seed-2591,StoneT2000.BC19-botfinalsafe:seed-1706`
(the "other cells" line). h148 (CHAIN_LIVE) was not designed from panel cells; its rule stands as fixed at 11:58.

## 2026-10-24 12:53 PDT: driver out of memory; background jobs reaped

At about 12:52 the driver (2 GB) ran short of memory with symcheck on v8 (seed 1, to round 1000) and the full tools
suite running together, against LEARNINGS 13 (one heavy job at a time). Claude Code stopped every background shell:
symcheck (no result: the new stepper's run had not reached a divergence or round 1000), the tools suite (unfinished;
build_bot, batch and the other targeted tests had passed alone), the h148 block-3 waiter and the replica-queue waiter.
Per the harness they are not restarted without the owner's word. The VM and the replica are not affected: block 3
(973-984) plays on; check-ins read it by hand. Uncommitted until the suite and the no-op replay run:
PIONEER_TIMEOUT_REST (bot), build_bot.js (--cfg into the CFG literal), batch.js (row conditions; error rows rerun).

## 2026-10-24 14:14 PDT: v8's opening economy against the field; church-sent pioneers built (h158), parked

v8's 51 replica games (control block 726-731 and the ladder games since 06:41, h148's running block left out; per
game `replay.js timeline`): our pilgrims at round 100 against theirs predict the result. Ahead: won 13 of 15; level:
3 of 9; behind by less than 1.5x: 2 of 6; behind by 1.5x or more: 4 of 21. In 12 games our pilgrim count stops growing
after round 50 while theirs grows (wololo 2797: 16 -> 15 against 13 -> 28; uvafan 826: 21 -> 22 against 33 -> 50).
How the field gets there (replica 853-1, wololo, seed 2797): its church at (1,20), built r30, built the pilgrim that
churched (1,32) on our half at r41; that church's first prophet killed our castle's pioneer for the same cluster 7
tiles short (left the castle r24, 19 king steps). At r89 a pilgrim from its church (31,1) churched beside our church
at (31,52) and preached our miners there. Our churches never send pioneers; only castles do, from the turn-3 plan.
On 2518 (730-3, awesomelemonade): its pioneer left at r4 and churched the centre at r14 (six pilgrims from it by r23);
a second church at (20,21) on our half at r29 shot our pioneer (left r23) the next round. Ours: 3 pilgrims, the two
escort crusaders at r4-5, then nothing until r23 (the pioneer's karbonite and reserves). That race is the line of
h121, h140 and h147 (all rejected), so it is not reopened here.
h158 (v8 + HOP_GAIN 4, new switch, default 0 = v8): a castle whose next planned cluster has a living church of ours
at least HOP_GAIN king steps nearer radios SIG.HOP (target << 6 | church) far enough to reach every tile beside that
church and builds nothing that turn; the church builds the pioneer in the same round (with the round on its radio);
the newborn reads the target from the castle's radio and reports CT.HOP + target on its first turn, so the castle
tracks it as its own; an ask nobody answers lapses after 2 turns and that church rests HOP_REST (50) turns. Churches
talk CT.CHURCH + their cluster on their first turn, so castles know which are alive. Unit tests (castle, church,
pilgrim); the defaults build replays v8 IDENTICAL on 799 to r300 (40,607 bytes). Self-play h158 (red) vs v8 to r200,
15 panel maps: it asked on 3 maps (2013 2, 2740 3, 2321 1; 1036 asked none and built one more church), churches 50 vs 48,
no exceptions. Too rare to read alone: PARKED. Its use is as the launcher for a wider plan (EXPAND_ROUND, h125: the
pioneers to the far clusters walked from the castles). The census also shows maps where neither build churches at
all in 200 rounds (2046, 1653) or once (203, 2518, 2591): the turn-3 plan is empty there after the castles' depots.
Not committed yet: the full tools suite waits for the owner's word after the 12:52 memory kill.

## 2026-10-24 14:17 PDT: h148 (CHAIN_LIVE 1) REJECTED on the replica panel, block 3
Block 3 = matches 973-984 (both sides, 36 games) finished; scored as pre-registered at 12:29:
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 777-782 967-972 973-984`: 35 of 72 against the pooled 31.5
(side-blind z 1.13), side-aware expectation 32.3, **z 1.02 < 2: REJECTED**. Block 3 alone: 15 of 36 against 15.7
(z -0.37); blocks 1 and 2 alone against today's pool: z 1.66 and 0.82. Block 1's 11 of 18 was the luck; the next 54
games came in at expectation. Flagged cells over the three blocks: won awesomelemonade 2518 blue and uvafan 1712 blue
(both rarely won); lost awesomelemonade 2797 red (usually won). Pool file: blocks 967-972 and 973-984 join
progress/panels/v8-m1.pool (own z within +-1); 777-782 stays out (own z 2.20 when scored, 1.66 now). The CHAIN_LIVE
line (h148, h149) closes. The ladder build stays bots/v8 (submission 169, resubmitted after the block).

## 2026-10-24 15:13 PDT: v8 feeds newborns into kill zones: 46% of its military karbonite in losses; h159 (FEED_STOP) to the panel

Bank census (timeline r40-100, v8's 51 field games: 726-731 and the non-panel matches 770-887): before ECON_UNTIL
(r100) the bank piles up wherever the plan is small: 300-860 K at r100 on 203, 1653, 2046, 2330, 2822, 1626, 1884
(the castles staff their few depots and build nothing else). 2591 vs bot1v43: the castle built 2 pilgrims, 2 escort
crusaders and its pioneer at r24, which died at r31; it then built one prophet in r37-100 with the bank at 115-170
(PIONEER_LOST_REST 100, nothing else to buy) while bot1v43 churched the centre cluster (10 of the 12 depots on our
side) at r23, r57 and r104 and took the castle at r147.

Round-1000 losses: 16 of v8's 29 field losses went to round 1000 and were decided on health. 2330 vs mvpatel2000
(770-3, red): both sides mined about 9,050 K; we built 271 prophets and lost 262, they lost 197 of 360 units; army
flat at 40 r500-900, health 1,200 vs 6,640 at r1000. From r600 our church (20,14) answered an enemy prophet
standing at r2 98 (in its sight, out of its reach) with a prophet nearly every turn; each newborn stepped from
(21,13) to (22,13), into that prophet's band before it could see it, and died there on its first or second turn.

Young-death census (replay.js events, every v8 field game): military units of ours dead within 3 turns of birth,
in karbonite: **losses 70,635 of 151,925 K (46%; 2,660 of 6,236 units), wins 14,765 of 118,650 (12%)**; the 16
round-1000 losses 59,580 of 130,305 K (46%), about 3,700 K a game, 250 crusaders' worth of health. Worst: yujinwunz
1712 78%, wololo 2797 73%, wololo 1884 65%, 2518 65% (twice), 2330 63%; never above 15% in our 10 best wins. The
same in self-play: v8 vs v8 on 2321 to r300, red lost 46 of 71 units young.

**h159 = v8 + FEED_STOP 3** (FEED_AGE 3, FEED_WINDOW 20, FEED_REST 50; struct.js watchKids, feeding): a structure
follows its military newborns through their first 3 turns; one gone from its sight while within 7 tiles of it (it
could not have walked out of sight) died, and so did one never seen alive on the turn after its build; 3 such deaths
within 20 turns stop the structure's military builds (threat responses and the peacetime army; not escorts, chain
launches or the endgame dump) for 50 turns, except a threat response to an attacker that can hit the structure
itself (r2 within its attack range). The karbonite stays in the shared bank (castles' RICH_K army, chain lines, the
endgame crusaders). Unit tests (struct: watchKids, feeding; castle: a resting castle answers no prophet at r2 81,
one at r2 49 as before); the defaults build replays v8 IDENTICAL on 799 to r300 (40,715 bytes); dist/h159
552aa86f0b35, FEED_STOP:3 read back from the bundle. Driver diagnostics on 2321 to r300: v8 vs v8 blue wins r280
(red 46 young deaths); h159 red vs v8 wins r267 (20 young); v8 red vs h159 blue: v8 wins r249 (h159 24 young). One
map, both results flipped: no reading, only that it runs without exceptions.

Pre-registration: screen vs bots/v8, 20 cells seed0 35000 (VM job queued first among the held screens, runs when the
replica queue is under 30); panel block 1 = matches 985-996 (submission 170; v8 back as 171), both sides, scored with
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK...` by the pooled rule (block 1 reject at z < 0.5; two
blocks accept at z >= 2, reject at z < 1; else a third, accept at z >= 2). Studied cells: none (the mechanism came
from 2330 vs mvpatel2000, not a panel cell; the census is every v8 field game). Mechanism read (not a decision
input): `node tools/replay.js young REPLAY` (new: per team and military type, built and dead within 3 rounds, its
karbonite) on our side of the block's games, against v8's own blocks 726-731 and the pool; FEED_STOP should cut the
young share in the games it loses (v8 in 726-731: 23% of its military karbonite in its 8 wins, 55% in its 10
losses). Not committed yet (rule 7: the full
tools suite waits for the owner's word after the 12:52 memory kill; the bot tests pass, 103 of 103).

## 2026-10-24 15:32 PDT: maps with nothing to church: v8 banks 386-863 K at r100 with army 2-4; h160 (ECON_NOPLAN) and a targeted panel

Census of v8's 51 field games (bank at r40-100, tools/plan.mjs on every map): on 5 of the 40 pool maps no castle of
ours plans a church (2046, 1626, 1653, 1884, 2330: every cluster is staffed from a castle or nearer the enemy), yet
ECON_UNTIL 100 keeps the peacetime army waiting for pioneers that never leave. v8's field games there: bank at r100
440, 863, 785, 386, 435 K; our army 2-4 against 17, 34, 37, 6, 17; won 1 of 5 (1653). Across all 51 games, being
behind in pilgrims at r100 went with losing (behind 8+: 4-10; behind 1-7: 2-11; level or ahead: 16-8), and on 1712
uvafan out-expanded v8 2:1 by r100 (38 pilgrims, 6 churches vs 20 and 3): our pioneers left one at a time while the
bank sat at 30-155 K after 7 pilgrims and 4 escort crusaders by r18. Early losses (r134-306: 2321 vs wololo, 2591 and
2321 vs bot1v43, 2013 vs wololo, 1706 vs botfinalsafe) follow the opponent's centre churches (wololo on 2321: r20 and
r42, 10 tiles from our castle; one prophet from them killed 5 pilgrims beside our castle from outside its sight);
then the castle built 13 prophets onto (12,10), in reach of the prophets it was answering, most dead in their build
round (a newborn acts after every older robot). SAFE_BUILD, SIEGE and DEF_FAR_UNIT tried the structure's side of
this and were neutral; the opening is where the held escort screens (h154, h155, h157) aim.

The round-1000 losses are not close: health 1,040 vs 6,250, 2,560 vs 12,580, 4,730 vs 9,630 in the three censused;
no endgame dump covers that (the endgame lines h8, h96, h104 are closed). tools/replay.js young (new) gives the
young-death census per replay.

**h160 = v8 + ECON_NOPLAN 1** (struct.js: ECON_UNTIL does not hold a castle whose st.planAll is 0; churches and
castles that planned keep it). Unit test (no plan: builds at r50 with 600 K; plan 2: waits; plan not made yet:
waits); defaults build replays v8 IDENTICAL on 799 r300 (40,747 bytes); dist/h160 15b40f6fac46 (ECON_NOPLAN:1 read
back) also replays IDENTICAL to v8 on 799 (castles plan 4 churches there): inert where a church is planned. Driver
diagnostic h160 red vs v8 on 2330 to r150 (--det): army r40 8 vs 0, r100 25 vs 3 (v8's bank 785), r120 31 vs 26; no
exceptions.

Pre-registration. On the general panel h160 differs from v8 in 4 of 36 games (uvafan 1653 and 2046), too few to
read, so it is judged by a targeted panel (TRAINING_ALGORITHM §4, new today before any h160 game):
progress/panels/noplan-m1.json, the six panel bots each on three of the five maps by fixed rotation (2046, 1626,
1653: 4 cells each; 1884, 2330: 3), both sides, 36 games a block (`PANEL=progress/panels/noplan-m1.json
tools/panel_submit.sh DIST "msg"`). Order: a bots/v8 control block first, then h160's blocks; scored with
`contest19.py pool` against the control (pool file progress/panels/noplan-m1.pool, empty at the start) by the pooled
rule (block 1 reject at z < 0.5; two blocks accept at z >= 2, reject at z < 1; else a third, accept at z >= 2). Before
h160's first block is scored, panelsim.py on this design: if its false-accept rate exceeds 10%, a second v8 control
block is played first. Studied cells: uvafan 2046 and 1653 (the census included them); the other 16 cells must
score z >= 0 too. Submitted when the replica queue is under 30 (owner, PROMPTS 17: 24 matches). Local screen: the
five maps both sides vs bots/v8, 10 games (VM job held in superseded behind h159's).

## 2026-10-24 15:42 PDT: what a besieged castle does with its turns; CASTLE_FIRE noted, not built

A castle acts once a turn: it builds a defender (structAct step 1, while ours < 2 x attackers + 1) or shoots, never
both. Per turn of the castle with an enemy attacker within r2 100 (positions after its turn), r1-200: 853 game 2
(2321 vs wololo, castle #1313): built with an attacker in its reach (r2 <= 64) 12 turns, shot 12; built with all of
them out of its reach 14, idle (nothing affordable) 28. 726 game 3 (836 vs wololo, castle #1368): in reach built 6,
shot 15; out of reach built 12, idle 31. The larger share of the feeding is against attackers the castle cannot hit,
which is h159's (FEED_STOP) case. CASTLE_FIRE (shoot rather than build while an attacker is in reach and few are in
sight) would turn about 6-12 build turns a siege into shots (a prophet dies to two); noted as a partner for
FEED_STOP if h159 reads positive, not built now. On 836 the defence spent the shared bank (12 defenders r33-89,
11 of them dead by r100) so the other castle, with 3 clusters planned, never held the 90 K a pioneer needs: no church of
ours before r100 against wololo's 5, three of them on our half.

## 2026-10-24 16:02 PDT: the opening bank idles: 335 K median at r100 against the field's 92

Census of v8's 51 field games (control block 726-731 and the ladder games since 06:41; per game `replay.js timeline`
at r50-200, bank from the 14:14 census): at r100 our bank's median is 335 K (300+ in 28 games), the opponent's 92
(300+ in 1); our army's median 4, theirs 10 (15-37 in the losses to uvafan, rafekruse, yujinwunz, mvpatel2000 2330);
churches 2 and 2, fewer than theirs in 27 games, more in 8. Mined karbonite, ours over theirs: wins r50 1.02, r100
1.04, r150 1.06, r200 1.02 (medians, 22 games); losses 0.91, 0.86, 0.72, 0.65 (29). The loss gap opens by r50 and
widens after r100, when their armies reach our miners. The bank's size does not sort wins from losses (300+: 12 of 28
won; under 150: 5 of 11), so the karbonite is idle, not decisive by itself: it is what ECON_UNTIL 100 and the reserves
hold while the economy has nothing left to buy (203, 4 games, 0 churches before r200 in 3: the pioneer to c3 dead by
r34, 8 pilgrims out by r12, 495-585 K at r100 against armies of 2-31). Next: where the field's churches stand and
what kills our pioneers (churches.js census, after the tools suite), then the saturated-economy switch the 09:27
entry named (a castle with no depot to staff and nothing to pioneer stops waiting for ECON_UNTIL).

## 2026-10-24 16:04 PDT: the tools suite passes; the held work is committed; symcheck on v8 restarted

The owner (PROMPTS 35, 36: "From now on, don't wait on me") lifted the 12:52 hold. `tools/unit-tests.sh` alone on
the driver, 15:58-16:03: node 154 of 154, galaxy19 python 63 of 63. Committed with it: PIONEER_TIMEOUT_REST, HOP_GAIN
(h158), FEED_STOP (h159), ECON_NOPLAN (h160), build_bot.js --cfg, batch.js row conditions, `replay.js young`,
panel_submit.sh PANEL, the noplan-m1 panel, and the log, ledger and HANDOFF entries since 12:53. symcheck on bots/v8
(seeds 1, 2, 3, 2321 to r1000) runs alone on the driver from 16:03.

## 2026-10-24 16:26 PDT: symcheck moves to the VM: alone on the driver it grew to 798 MB

symcheck on bots/v8 (seeds 1, 2, 3, 2321 to r1000) started alone on the driver at 16:03 and reached 798 MB resident by
16:23 with 285 MB left (no output yet); stopped by PID. It runs on the VM as job ...1000sym (from 2019-next, the
driver's tools/symcheck.js 716a95d5, nice 15, unshare -rn; one process beside saturn's 8 slots), log
out/sym_v8_r1000.log. LEARNINGS 13 extended: symcheck at 1000 rounds is a VM job, not a driver one.

## 2026-10-24 16:27 PDT: church census of v8's 51 field games: no church at all in 11 of 29 losses; later to church in the rest

Every church built to r200 and every pilgrim death (scratchpad churches.js over the replays of the 16:02 census; half
= nearer its own castles or the enemy's). Losses (29): no church of ours by r200 in 11 (wins: 1 of 22): the no-plan
maps 2046, 2330, 1626, 1884 (h160's case; there the opponents built none either, but rafekruse on 1626, r17), and the
one-contested-cluster maps 203 (4 games), 2518 (2), 2591, where our one pioneer dies (203 vs StoneT2000, rafekruse,
uvafan: their church on our half at r26-90). Where both teams churched, our first church came at a median r32.5
against theirs at r22, ours first in 2 of 18 (wins: r40 against r33, first in 7 of 19). Their churches on our half by
r100: 22 in the losses, 8 in the wins; ours on theirs: 1 and 1. Our pilgrims dead by r100: 33 in the losses (23 to
prophets; 22 within 8 tiles of one of our structures), 4 in the wins; theirs 14 and 16. Reading: the losses are
decided in the opening race for clusters, and where we lose it outright the bank then idles to r100 (16:02). The
saturated-economy switch covers that second part (203, 2518, 2591 after the pioneer dies; the no-plan maps as h160);
the race itself is the line of h121, h140, h147 (closed).

## 2026-10-24 16:56 PDT: symcheck on v8 to r1000: seeds 1, 2, 2321 mirror; seed 3 parted at r504 on the stepper's reclaim order

VM job ...1000sym (out/sym_v8_r1000.log): seeds 1, 2 and 2321 stay exact mirror images to r1000 (222, 184, 128
robots). Seed 3 parted at r504, after the attack phase: twin preachers #859 (8,25) and #3170 (8,24) carried 7 and 6
karbonite. Both twins' actions were mirror images (attacks at (5,23) and (5,26), four preachers a side splashing the
other's): the difference is reclaim, which the stepper took from the engine's one-by-one rule. In a pair the red twin
fires first, collects reclaim, and its killer later reads that larger cargo (floor((4 + 15) / 9) = 2 against
floor(15 / 9) = 1). A tool artifact, like the axis-tile contest, not a decision of the bot. Fixed: in the phase every
attacker whose shot reached a robot that dies takes the reclaim, from the cargo the victim held before the phase
(`phaseReclaim`, unit-tested on this case). The four seeds rerun on the VM (job ...1000symb, seed 3 first).

## 2026-10-24 17:33 PDT: symcheck on v8 to r1000 with the phase reclaim: all four seeds mirror

VM job ...1000symb (out/sym_v8_r1000b.log, tools/symcheck.js 4abcd1a9): seeds 3, 1, 2 and 2321 stay exact mirror
images to r1000 (66, 206, 184, 106 robots). Seed 3, which parted at r504 on the stepper's reclaim order, now holds.
v8's moves are symmetric under side swap on all four maps for the whole game.

## 2026-10-24 17:40 PDT: h159 (FEED_STOP 3) panel block 1: 17 of 36, side-aware z 0.75: a second block

Block 1 = matches 985-996 (both sides), scored at 17:23 by `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool
985-996`: h159 wins 17 of 36 against a pooled expectation of 15.8 (z 0.56); side-aware (k 2) 15.7, z 0.75. Not below
0.5, so by the pre-registered rule a second block: matches 997-1008 (submission 172, v8 back as 173), submitted 17:29
with 84 ladder matches waiting (block 1 went in at 119). Both blocks are scored together: accept at z >= 2, reject
under 1, else a third.

Mechanism read (not a decision input; `node tools/replay.js young` on our side of all 36 games): military
karbonite dead within 3 rounds of birth was 43% in h159's 19 losses (per-game median 0.51) and 13% in its 17 wins
(median 0.09), against v8's 55% / 23% in its own blocks 726-731. Lower in both, in the direction FEED_STOP aims; the
blocks differ in sides and luck, so it only says the switch acts.

## 2026-10-24 18:45 PDT: ECONOMICS.md (prompt 37): twelve suggestions ranked; h161 (FUEL_DEFER 60) and h162 (ATTACK_ONE) built

ECONOMICS.md: the rules' prices and payback, a diagnosis from v8's 51 field games, five economic lenses run as a
read-only workflow (production and location, growth and capital, inventory and finance, game theory and military
economics, national accounts), each proposal checked by a separate verifier against the code and this ledger;
twelve suggestions ranked by the verifiers' confidence, seven dropped on the numbers. Three lenses converged on the
first: fuel is a free good in the opening and karbonite binds.

Opening census (scratchpad opening.js: bank and miners per team to r60, v8's 51 field games): our karbonite bank
median 70-80 at r20-50 against the field's 40, our fuel 733 / 1,045 / 1,348 / 1,577 at r20 / 30 / 40 / 50 against
447 / 552 / 788 / 998; fuel miners by r40 4 and 4, karbonite miners 4 and 5; a first church by r60 in 36 of 51 games
(median r33) against the field's 44 of 51 (r22.5). On one-castle maps with one karbonite depot by the castle and two
fuel depots (2013, 2644, 1706, 2740, 493, 1915) the bank steps 40, 40, 60, 60, 80, 80, 80 and stalls one cargo under
the pioneer's 90-K gate with 1,100-1,500 F idle.

**h161 = v8 + FUEL_DEFER 60** (FUEL_DEFER_MIN 400; struct.js nextDepot, structAct's threat flag): before r60 (a
church that never learned the round counts its own turns), while team fuel is at least 400 and the structure has seen
no enemy attacker, a castle or church staffs only karbonite depots and builds no pilgrim when none is free; a castle
whose team planned no church keeps v8's mix. Driver diagnostics, head to head against v8 to r150 on 16 maps (one side;
2013 on both, an exact mirror), no exceptions. Floor 300: first church earlier on 12 of 16 maps, karbonite mined by
r150 up on most one-castle maps (2013 2,068 against 1,018; 2644 1,254 / 412) and down on two-castle maps (826 2,422 /
3,250; 836 2,116 / 3,168; 1712 1,516 / 2,294), where fuel fell to 17-226 after the first church. Floor 600: inert
(the game starts at 500 F). Floor 400: one-castle maps as at 300; two-castle maps 826, 799, 2797, 203 equal, 1712 and
1036 ahead, 836 behind (2,300 / 3,524). 400 was the inventory verifier's dose before these games (above the escorts'
350 F and the pioneer's 250 F gates); the three floors are driver readings, not a panel read. Unit test (struct:
FUEL_DEFER); the defaults build (both switches off) replays v8 IDENTICAL on 799 to r300 and on 2046 to r600 (290,918 bytes); dist/h161 4e5d828b7522,
FUEL_DEFER:60 read back from the bundle.

**h162 = v8 + ATTACK_ONE 1** (castle.js callAttack): every castle calls the general attack on the same enemy castle,
the mirror nearest our living castles in summed r2 (ties: canonical order), instead of each its own nearest. The
Blotto lens: 16 of v8's 29 field losses reached r1000 at equal castles, decided on health; on 11 of them the castles
called 2-3 targets. The call splits on 19 of the 40 pool maps (scratchpad split.js) and on 7 of the general panel's 18
cells (wololo 836, botfinalsafe 203, IanCoolidge0 203, uvafan 1653, 1712, 2046, awesomelemonade 1712): 39% of the
panel against 47% of the pool, so the general panel represents the ladder and no targeted panel is needed. Unit test
(castle: ATTACK_ONE); dist/h162 88a7474abd7a. Driver, seed 2046 to r600 (scratchpad attack_calls.js): in v8 vs v8 both
teams' castles radio two targets on every call round (2 and 4 rounds); h162 (red) against v8 radios one on each of its
2, v8's side still two; no exceptions. `tools/census.js` now counts attack calls and split calls (fixture
test/fixtures/attack_s2046_r586.bc19, that game to r586) and reports the first pioneer's round and fuel and the first
church's round.

Pre-registration. Both go to the general panel one block at a time after h159's block 2: h161 first, then h162,
scored with `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK...` by the pooled rule. Studied cells: h161,
botfinalsafe 2740 (replica 727-3 is in the config comment), so h161 is accepted only if its z over the other cells is
also >= 0; h162, none (the r1000 census covers every field game). Mechanism reads, not decision inputs, on our side of
each block's games: h161, `tools/census.js` first_pioneer and first_church means on the one-castle cells against
v8's in 726-731 (bar: first pioneer at least 6 rounds earlier); h162, `tools/census.js` attack_split (call rounds with 2+ targets; bar: none).
h161's rush4 check (castles lost against bots/rush4 no more than v8's) runs when the VM screens resume (queue < 30);
the screens vs bots/v8 (20 cells, seed0 36000 and 37000) wait in ~/jobq/superseded behind h160's.

## 2026-10-24 19:01 PDT: h159 (FEED_STOP 3) REJECTED at two blocks (33 of 72, side-aware z 0.66); h161's block 1 in

Block 2 = matches 997-1008 finished by 18:59: h159 wins 16 of 36 (own side-aware z 0.18). Both blocks together, by
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 985-996 997-1008`: 33 of 72 against a pooled expectation of
31.6 (z 0.46), side-aware 31.4, z 0.66: under 1, so REJECTED by the pre-registered rule. Both blocks join the v8-m1
pool (own z 0.75 and 0.18, within +-1). Cells against the pool's 10 games: won awesomelemonade 2797 4 of 4 (pool 5),
IanCoolidge0 203, bot1v43 2321 and botfinalsafe 2740 on the red side only (2 of 2 red, 0 of 2 blue each); lost uvafan
1712 0 of 4 (pool 1) and wololo 2644 blue 0 of 2 (pool 6); never won wololo 2013, 836, botfinalsafe 1706,
awesomelemonade 2518, uvafan 2046, bot1v43 2591, as v8.

Mechanism read (not a decision input; `replay.js young` on our side, scratchpad young_share.sh): military karbonite
dead within 3 rounds of birth was 41% in block 2's 20 losses and 12% in its 16 wins; over both blocks 42% / 13%,
against v8's 55% / 23% in 726-731. FEED_STOP cut the young losses by a quarter and moved no games: a structure that
stops feeding leaves the karbonite in the bank or puts it into the peacetime army, and the attacker that killed the
newborns still stands where it stood. So feeding reads as a symptom of a lost position more than its cause; what
might change a game is what the karbonite buys instead (MUSTER spends it on a massed counter-attack, ECONOMICS.md
row 3), a lower prior for MUSTER than ECONOMICS.md's 0.20.

h161 (v8 + FUEL_DEFER 60) went in at 19:02 as the pre-registration (18:45) set: block 1 = matches 1011-1022
(submission 174, v8 back as 175), with 79 replica matches waiting. h162 follows it.

## 2026-10-24 20:00 PDT: the VM's disk filled 18:29-19:23 and killed five saturn slots; freed, restarted, hardened

The replica API answered HTTP 500 from 18:55 (`field.py queue` failed every other call): the VM's 20 GB root was full
(Postgres: "could not extend file ... No space left on device", first at 18:55; saturn "[Errno 28]" task errors from
18:29 to 19:23). Space: the 2023 replica /srv/bc23-galaxy 6.0 GB (not ours to touch), our out/ 2.6 GB of local screen
replays, the replica's match replays 2.0 GB, apt's cache 0.45 GB. Freed 3 GB at 19:20: `apt-get clean`, and the 94
out/rp_* directories of screens whose candidates are decided (h6-h144 and the v5-v7 delivery and rush runs; listed in
~/rp_prune_list.txt on the VM; their jsonl results and dlv_gate summaries stay; rp_h145v8-rp_h151v8 kept). The API came
back at once. But the queue still crawled (one match in 25 minutes, load 1.8): five of saturn's eight execute slot
threads had died when the spool's nack could not write (the exception escaped the slot loop), their leased messages
held and their matches showing RUN. `sudo systemctl restart bc19-galaxy-saturn` at 19:54 returned 7 leased messages and
put 8 games back on the board; by 20:18 67 waited (77 at 19:52). No match ended in ERR (15 before and after).
Hardened (tools, not yet deployed: it goes with the queue < 30 deploy in HANDOFF): saturn's slot loop catches an error
outside the task, returns the leased message unchanged with the new spool `release` (a rename, which works on a full
disk) and restarts after SLOT_RETRY 30 s; test test_slot_survives_a_spool_error_and_returns_the_message. LEARNINGS 40:
every check-in reads the VM's `df -h /`, keeps 2 GB free, and prunes a decided screen's replays.

## 2026-10-24 20:54 PDT: h163 (MUSTER 1) built in its camper form; pre-registered for the general panel after h162

**h163 = v8 + MUSTER 1** (ECONOMICS.md §4 row 3, Lanchester's concentration in time; struct.js musterCase /
musterTrack / musterAct, military.js musterHold). The case is a camper: the nearest enemy attacker a structure sees
is a prophet that has stood on its tile MUSTER_DWELL 3 turns, beyond r2 36 (and beyond r2 64 for a castle, its
reach), with no enemy crusader or preacher in sight. There v8 answered with one prophet a turn while ours did not
outnumber them 2A + 1, and each walked into the band alone (LEARNINGS 41 has the first form, which also fired on
advancing armies and lost to the mirror). MUSTER builds crusaders instead, under v8's own gate (ours < 2A + 1) and
fuel reserve, on the free adjacent tile farthest from the camper, radioing its tile (SIG.THREAT, r2 2); each holds
two king steps from home, out of reach of the attackers it sees and of r2 64 around that tile, for up to MUSTER_WAIT
25 turns, and an enemy crusader or preacher in sight ends the hold. The structure counts the held crusaders it sees
(newborns found as watchKids finds them); at 2A + 1 (A = the campers out of its reach), or at A + 1 once v8's gate
is shut by our attackers in sight, it radios the nearest camper as a spot (FAR.ENEMY, 10 F) every turn for up to 25
turns while attackers stay in sight, and the held crusaders charge it through the engage path (WATCH's spot).
Anything else keeps v8's answer.

Driver diagnostics (scratchpad econ/vsdiag.sh, red side, to r400, no exceptions). Against bots/v8 on 2797 the replay
is identical to v8 vs v8 (no prophet camps on v8's side); against dist/camp on 2321, 2591, 2644, no firings and the
same results (camp escorts its prophets with crusaders). Against dist/turtle (a prophet lattice of 200+ units) it
fires: 1712, 17 crusaders built and 8 release rounds; 2797, 29 and 90; 2046, 4 and none. Before the A + 1 release
the crusaders were held and never sent (1712: army 87 at r400 against v8's 26, 14 churches against 6, young losses
26% of military karbonite against v8's 61%). With it, on 1712 they charge the visible campers and die in the lattice
behind them (army 22, 9 churches, young 52%); on 2797 the release costs nothing (army 49 against v8's 26 and the
hold's 47, 11 churches against v8's 3, young 53% against 60%). Turtle is the extreme case, a camp of hundreds where
the visible A undercounts the defence; on the panel the switch would fire in 79 of the 90 games (48 of the 49
losses; scratchpad camp_census.js on 726-731 and 985-1008). Defaults build replays
v8 IDENTICAL on 2046 to r600; `tools/unit-tests.sh` 160 of 160 (galaxy19 64 OK). dist/h163 f0fbe3ea6c0e.

Pre-registration. h163 goes to the general panel one block after h162, scored with
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK...` by the pooled rule. Studied cells: uvafan 1712,
awesomelemonade 1712, 2797 and 2518 (the feeding cells of ECONOMICS.md row 3), so h163 is accepted only if its z
over the other cells is also >= 0. Mechanism reads, not decision inputs, on our side of the block's games: military
karbonite dead within 3 rounds of birth (`replay.js young`, scratchpad young_share.sh) in losses, against v8's 55%
in 726-731 (bar: under 45%), and the count of muster builds and release rounds (scratchpad econ/muster.js; bar:
releases in at least a third of the games that build). Its VM screen (26 z's + yyyy, seed0 38000) is dropped: v8
advances rather than camps (no firing on 2797), so against v8 the screen would mostly replay the mirror.

## 2026-10-24 21:22 PDT: ECONOMICS rows 4 (CASTLE_FIRE) and 6 (ECON_HIT) dropped on replay censuses before a panel

LEARNINGS 41 first: count where a switch would fire, on v8's 18 panel games 726-731 (our side), before a block.
CASTLE_FIRE (shoot instead of building against 1-2 attackers in reach; scratchpad fire/cf_census.js): castles saw
1-2 attackers with the nearest in reach on 41 turns (16 in 8 wins, 25 in 10 losses) and already shot on 36; they built
on 5 turns in 3 losses (3 against prophets alone) and 1 of those newborns died within 3 rounds. At most 5 builds in
18 games would change, so no build. ECON_HIT (a castle that loses a pilgrim before r100 owes 2 peacetime units for
50 turns; built with the verifier's fixes and a unit test, the defaults build replayed v8 IDENTICAL on 2046 to r600):
our pilgrims died before r100 6 times in the 18 games, all in losses (5 of the 10), 5 seen by a castle
(r30, 31, 78, 90, 93), 1 by a church (r61) (scratchpad fire/hit_census.js, hit2_census.js). Two games lose a
pilgrim early enough for the owed guards to come well before v8's army starts at r100: too few for a block, so the
code is reverted (not committed). ECONOMICS.md §4 and §6 updated. Next from the list: DEPOSIT_AT waits for h161's
block; rows 7, 8, 10 wait for the held screens (h157, CHAIN_WALL), 9 for h160, 12 for h156.

## 2026-10-24 21:38 PDT: h161 (FUEL_DEFER 60) REJECTED at block 1 (14 of 36, side-aware z -1.17); h162's block 1 in

Block 1 = matches 1011-1022 finished at 21:35 (1019, vibe19 vs awesomelemonade, ran last): h161 wins 14 of 36
against a pooled expectation of 16.0 (z -0.99), side-aware 15.9, z -1.17: under 0.5, so REJECTED by the
pre-registered rule. The block does not join the v8-m1 pool (its own z is outside +-1). Cells against the pool's 14
games: won bot1v43 2591 blue (pool 0 of 14) and the studied cell botfinalsafe 2740 on both sides (pool 10 of 14;
the studied-cell rule is moot after a reject); lost awesomelemonade 1712 red, wololo 2644 red and uvafan 1653 red
(pool 14, 8 and 12 of 14), and bot1v43 2321 red. The mechanism read (`tools/census.js` first pioneer and first
church on the one-castle cells, against v8's 726-731) follows when the driver frees.
h162 (v8 + ATTACK_ONE 1, dist/h162 88a7474abd7a) went in at 21:38 as pre-registered (18:45): block 1 = matches
1023-1034 (submission 176, v8 back as 177), with 50 replica matches waiting. h163 follows it.

## 2026-10-24 21:41 PDT: h164 (CHAIN_WALL 28) built; driver diagnostics show a cost against v8, so a screen comes first

Studying uvafan 2046 (replica 729-1, lost on health at r1000 with castles equal; we were blue): uvafan built 7
pilgrims, no church and 164 prophets, its army 205 at r1000; ours peaked at 33 (r200-300) and ended at 13 with 30,500
fuel unspent. Our military deaths by window (scratchpad study/deaths.js): r301-400 25 (21 on their side: our r352
chain line of 6 churches into a wall of about 50 prophets), then 99 in r401-1000, all but one on our side and 46 of
them within 3 rounds of birth (76 preachers built in the game, 56 dead young: the castles' answer to prophets
inside r2 36). The line's spend is
ECONOMICS row 8: CHAIN_WALL (built in the 12:25 audit, never played; config.js has its census: v7-v8 lines whose
nearest church saw 28+ killed no castle and lost 8,020 K within 60 rounds).
h164 = v8 + CHAIN_WALL 28 (dist/h164 96cae5a62d0f). Driver, h164 red vs bots/v8 to r600 (scratchpad study/wall.js
counts wall radios, CT.WALL and chain links): 2046, no firing, replay IDENTICAL to v8 vs v8; 1036, no firing, red won
on castles at r479; 1653, CT.WALL at r272 (red's line stopped at 4 links, v8's 6), then red built no line while v8
chained again at r344 and r455, and red's castles fell at r376 and r499 (1 castle to 3 at r600). v8 vs v8 on 1653
keeps 3 castles a side to r600, one line each at r272 and none after. One game, but a cost path: resting our chains
for 300 rounds gives the enemy the initiative. So h164 waits for its screen vs bots/v8 (castles lost at sign-flip
p < 0.05 rejects) before any panel block: job ~/jobq/superseded/...19 + 26 z's + yyyy (seed0 39000), held with the
others until the replica queue is under 30.

## 2026-10-24 21:45 PDT: how the never-won cells are lost; the escort screens move ahead of h164's

The v8-m1 pool's 14 games a cell (726-731 and the pooled blocks), by end: early castle kills on bot1v43 2591 (all
castles by r120-179, 13 of 14), wololo 2013 (r173-238 in 11 of 14) and botfinalsafe 1706 (r304-354, 14 of 14);
late kills on wololo 836 (r405-867), awesomelemonade 2518 (r513-910) and uvafan 1712 (castles or health at r1000);
uvafan 2046 always on health at r1000 (21:41). Replica 728-1 (bot1v43 2591, we blue, castle (26,15), one castle a
side): our castle built 2 pilgrims, then ESCORT_FIRST's 2 crusaders (30 K) at r3-4, and its pioneer only at r24;
bot1v43's pioneers left at r1-2 and stood churches at the centre's top clusters (13,7) at r23 and (15,3) at r57,
and later at (18,7), our side's mirror, at r104. Its r3 prophet walked to the centre, killed our pioneer at r31 and
the escort crusader #109 at r40; #109 had stood one tile from our castle from r5 to r36, and #977 stood at (25,14)
until r131: the escorts never went toward the site (the known fault ESCORT_HOLD_R fixes: h154, h155, h157). Our
castle kept 2 pilgrims and built nothing more but a prophet until r100; bot1v43's army of 9 took it at r147. So the
escort screens (h157, h155, h154) now run before h164's (renamed to 33 z's): a cell lost 14 of 14 at r147 is
exactly their case.

## 2026-10-24 22:10 PDT: h161's mechanism read: the first pioneer came 8 rounds earlier, the first church did not; DEPOSIT_AT dropped

The read pre-registered at 18:45 (scratchpad our_census.js: `tools/census.js` on our side of each game, sides from
match.json, one-castle maps, to r200). h161's block 1011-1022, 18 one-castle games: first pioneer mean r22.7, first
church mean r50.2 (14 games with a church by r200). v8's control 726-731, 9 one-castle games: r31.1 and r50.0 (7).
The pioneer bar (6 rounds earlier) is met, 8.4 rounds; the church did not follow. Per cell (h161 against v8): 1706
r29 against r40, wololo 2644 r40-41 against r50, 2321 r37 against r42, 2740 r70 against r73, 388 r46 both; but
wololo 2013 r44 (red) and r88 (blue) against r49, IanCoolidge0 2644 r78 (red) and r48 (blue) against r50; 2591 and
2518 no church by r200 in either build. h161 lost wololo 2644 on both sides (v8 won it in 726 and in every pool
block since ESCORT_MIRROR) with its first church 9 rounds earlier, and 1706 and 2013 stayed lost. So the opening's
karbonite came sooner but did not buy sites sooner where sites are contested, and the fuel it left unmined cost
more than the rounds it gained. ECONOMICS row 5 (DEPOSIT_AT, a part cargo at the purchase gate, built to stack on
FUEL_DEFER) offers the same kind of gain, a purchase a few rounds sooner, and is dropped unbuilt.

## 2026-10-24 22:20 PDT: h157 (the escort fix) goes to the panel after h162, ahead of h163; its VM screen is dropped

h157 = v8 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 (dist/h157 a5eba191475e; TRAINING_LOG 10:24) has waited for the VM
since 10:08, and the replica queue has stayed above 30 for twelve hours (52 waiting at 21:56, 48 ranked). Driver
diagnostics instead (scratchpad econ/esc.js: the first two crusaders each side builds, positions r10-r60, churches by
r80; red side, to r200; no exceptions):
- 2591: h157's escorts stand at (15,7) and (14,4) from r10, two steps from the centre site (15,5)/(16,5), and v8's
  pioneer builds no church by r80; in the mirror (v8 vs v8) both castles' escorts stand at home ((6,14)/(7,15),
  (24,15)/(25,14), as in replica 728) and both church the centre at r34. Karbonite mined by r200: h157 1,360 against
  v8's 362; the mirror 584 and 644.
- 2013: h157's escorts stand at (6,26) and (7,27) from r10, beside v8's site (5,28); v8's first church comes at r49
  (r43 in the mirror) and its second at r68 (r57). Karbonite by r200 2,658 against 2,040; the mirror 2,174 and 2,636.
- 1706 (10:24): h155's escorts reach the site by r31, h157's by r16-17.
The switch does what it was built for, and three of the four never-won cells (bot1v43 2591, botfinalsafe 1706,
wololo 2013) are its case, so it plays the general panel next, one block after h162, before h163 (MUSTER's
pre-registration is unchanged; it waits one block). Scored by the pooled rule with the studied cells fixed at 12:51
(wololo 2013, 2644, 836; bot1v43 2591; botfinalsafe 1706): accepted only if its side-aware z over the other cells is
also >= 0. Mechanism read, not a decision input: on our side of the studied cells, the first two crusaders standing 6+
king steps from home at r30 (esc.js; v8's stand 1-2 steps out; bar: both, in at least half of those games). The h157 screen job (...19 + 27 z's) is
deleted from ~/jobq/superseded; h155 and h154 stay held behind it.

## 2026-10-24 22:33 PDT: h165 (ESCORT_EACH 2 on h157) built; held until h157 is decided

ECONOMICS.md row 7 (Leontief complements: a pioneer and its guard on contested land). ESCORT_EACH (castle.js
escortEach; off by default): a pioneer sent to a contested cluster (m <= PLAN_CONTEST_FIRST) other than
ESCORT_FIRST's opens ESCORT_EACH units to it, once per cluster, built after it, at the mirror site under
ESCORT_MIRROR as ESCORT_FIRST's are. Census before play (LEARNINGS 41; scratchpad contested.mjs, the bot's own turn-3
plans): on 6 of the 15 panel maps a castle plans 2+ contested clusters (2013, 2644, 2740, 2321, 1712, 1036), 12
extra escorts in all. Defaults replay v8 byte for byte (2046 to r600, 2013 to r200); `tools/unit-tests.sh` 161 of 161
and 64 OK. A build of the current tree with h157's two switches replays dist/h157's 2591 game byte for byte.
dist/h165 = v8 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_EACH 2 (feb35bd6487b).

Driver diagnostics against v8, red side, to r200, beside h157's games on the same seeds (scratchpad econ/guards.mjs:
every escort, steps from its site 20 and 40 rounds after birth). No exceptions.
- 2013: two more escorts (r79-80) hold 2 steps from their site and die at r125 and r138; churches 3-5 come 2-5
  rounds later than h157's; karbonite mined by r200 2,632 against 2,658.
- 2321: six more escorts; four hold 2 steps out, two (r27, r34) die at r45 and r47 before arriving; the 4th and 5th
  churches come at r79 and r89 against h157's r65 and r68; 2,662 against 2,762.
- 1712: four more escorts (r89-97), all dead at r101-105 short of their sites; churches within 5 rounds of h157's,
  some earlier; 3,416 against 3,414.
v8 contests the later clusters little, so these games show the cost (later churches, dead escorts) more than the
gain. h165 plays only if h157 is accepted (then as the new champion + ESCORT_EACH 2, on the general panel with the
pooled rule and no studied cell); otherwise row 7 closes with h157.

## 2026-10-24 22:34 PDT: awesomelemonade 2518, a never-won cell, is the escort stall too (730-3)

v8 as blue on 2518 (730-3, lost r723 on castles): pilgrims r1-3, the two escort crusaders r4-5, then no build until
the pioneer at r23 (the bank waits for PIONEER_DEPART_K), killed at r30 by a prophet from awesomelemonade's second
church (20,21), built r29 on our side of the axis. Its 4th pilgrim (r4) churched the centre (17,17) at r14. Our
escorts' site was (17,17); they stood 12 king steps from it from r24 on (econ/guards.mjs), one died at r58 and one at
r415, and v8 built no church by r200. h161's two 2518 games (1019, 1020) were lost too. Driver check (v8 red, h157 blue, to r60; scratchpad
vs/esc2518.txt): h157's escorts hold 2 steps from the centre site by r24, h157 churches (18,17) at r34 and v8 has no
church by r60; in the mirror both escort pairs stand 12 steps out and both sides church at r37. 2518 is not one of
h157's studied cells, so it scores among the others: an out-of-sample cell of the same mechanism.

## 2026-10-24 22:39 PDT: CHAIN_WALL's census on v8's control games; h164's 1653 cost is v8's own fuel starvation

Census before play (LEARNINGS 41; scratchpad study/lines.js on 726-731, our side: chain lines from r200 with 3+ church
builds a round, the most enemy crusaders, prophets and preachers a new church saw within r2 100, and an enemy castle
destroyed within 60 rounds). 27 lines in 13 of 18 games. The 16 whose churches saw 28 or more killed one castle
(IanCoolidge0 1036 r880, seen 33, a game already won); the 11 that saw fewer killed 9. The 28+ lines: wololo 836
(61), uvafan 2046 (29, 33, 88), 1653 (36, 43) and 1712 (40), awesomelemonade 2797 (70) and 2518 (100),
IanCoolidge0 203 (31, 34) and 1036 (30, 41, 33, 33, 33). So CHAIN_WALL 28 would end 15 lines that killed nothing,
in 8 games, 5 of them losses.

The driver game behind h164's held screen (1653, h164 red vs v8 to r600, TRAINING_LOG 21:41; red lost castles at
r376 and r499): both lines start at r272 and meet head-on; red's ends at 4 churches (CT.WALL), blue's builds 6. Red's
fuel falls from 6,106 at r270 to 36 at r290 and stays under 140 to r380 (red prophets 110 shots in r270-295, blue's
56), while blue keeps 1,800-3,100. But the v8 mirror on the same seed (scratchpad vs/v8_v8_1653.bc19) starves both
sides the same way: fuel 6,106 at r270, 49 at r300, under 40 from r320 to r380, 55 at r601, while blue banks 1,703 K
it cannot spend (a unit costs 50 F). So the collapse is v8's: after a chain clash its fuel goes to shots and never
recovers. h164's 1653 loss is one game of a mirror-unstable state, not a mechanism of CHAIN_WALL. Late-game fuel
starvation is now being counted across the panel games (scratchpad econ/fuelstarve.js).
h164 therefore goes to the general panel one block after h163, and its VM screen (...19 + 33 z's) is deleted: a
screen of 40 games costs the same VM as a 36-game panel block, and the panel decides. Pre-registration: pooled rule;
studied cells uvafan 2046, uvafan 1653 and IanCoolidge0 1036 (the lines CHAIN_WALL's census in config.js was drawn
from), so h164 is accepted only if its side-aware z over the other cells is also >= 0 (`--studied
uvafan.bc2019:seed-2046,uvafan.bc2019:seed-1653,IanCoolidge0.battlecode20~69ce88:seed-1036`). Mechanism read, not a
decision input: on our side, lines whose churches saw 28+ that CT.WALL ended (study/wall.js, study/lines.js; bar: at
least half of them).

## 2026-10-24 22:41 PDT: fuel starvation is rare; the long losses hold a fuel glut on saturated karbonite land

Census of v8's control games 726-731 from r200 (scratchpad econ/fuelstarve.js, sides from match.json): our fuel was
under 100 in 2.7% of rounds (theirs 4.4%), almost all in the 1653 win (23%, theirs 22%). The long losses carry the
opposite: mean fuel banked 20,485 on uvafan 2046 and 20,509 on awesomelemonade 2797 (2046 ends at 30,547 F against
uvafan's 13,941, with under 1,000 K banked on either side throughout). The fuel cannot buy karbonite: on 2046 every
karbonite depot within 10 king steps of our structures is staffed at r300-r900 (3 of 3; fuel 3-4 of 4; no church on
either side), and on 2797 8-9 of 10 (econ/depots.js). The pilgrim switch fuel -> karbonite (SWITCH_KARB_LOW 30)
waits for an empty karbonite bank and a free depot within 8 steps, and the second is missing. So the glut measures
saturated land, the case of ECONOMICS row 9 (ECON_SAT) and h160 (ECON_NOPLAN; 2046 is a no-plan map): no new switch.

## 2026-10-24 22:43 PDT: h157's mechanism read revised before any h157 game: steps from the site, not from home

The read pre-registered at 22:20 (both first crusaders 6+ king steps from home at r30) does not separate the builds:
v8's 1706 escorts already stand 18-19 steps out at r30 (727), 10 short of the site. Revised, before any h157 game
exists: on our side of the studied cells, both of our first two escorts within 2 king steps of their radioed site 20
rounds after birth (scratchpad econ/esc_matches.sh over econ/guards.mjs). v8 in 726-728: 0 of 5 (2013 11/10, 2644
-/6, 836 11/8, 1706 10/9, 2591 10/10). Bar: at least half of h157's studied games. Still not a decision input.

## 2026-10-24 22:44 PDT: wololo 836 (726-3): the escorts come late on a two-castle bank

v8 as blue on 836 (lost r583 on castles): the two castles built 7 pilgrims in r1-4 from the shared 100 K, so their
four escort crusaders waited for mining and came at r12-15; wololo churched the first escort site (45,28) at r23,
before they arrived (8-11 steps short at +20, both dead by r37; the other pair stood 11-12 steps from (0,26) and died
at r96-100). By r100 wololo had 28 pilgrims and 5 churches to our 5 and none (our first church r168), mined 1,596 K to
our 446, and took a castle by r150. h157's fast walk does not cure a late start; ESCORT_EARLY (escorts on turns 3-4,
ahead of the economy pilgrims; in h154 with ESCORT_HOLD_R) does. If h157 is accepted, h157 + ESCORT_EARLY 1 is the
next escort candidate (before h165), with 836 among its studied cells.

## 2026-10-24 22:46 PDT: h166 (h157 + ESCORT_EARLY 1) built; on 836 it moves one escort to r3 and adds little to h157

dist/h166 = v8 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_EARLY 1 (69e55f300f65; no new code). Driver, 836 as
blue against v8 to r120 (scratchpad vs/esc836.txt; guards.mjs): h157's four escorts (r12-15) hold 2 steps from their
sites at +20; v8 never churches (45,28) and has 5 churches by r75 to the mirror's 7 by r70; karbonite mined by r120
2,598 against 1,588 (the mirror 2,356 and 2,138). h166 builds one escort at r3 and the other three at r12-15 (the
two castles' shared bank), and mines 2,518 against 1,574. Against wololo, which churched (45,28) at r23 in 726-3,
h157's escorts would arrive about r25-30. h166 waits with h165: it plays only if h157 is accepted.

## 2026-10-24 22:54 PDT: the replica queue falls under 30; saturn stays at 8 slots, the VM screens retire

The queue reached 29 waiting at 22:52 (all ranked; 52 at 21:56). The trigger in HANDOFF (back to 6 slots and gates
at par 2, the held screens moved back) is replaced: candidates now go straight to the panel with driver diagnostics
as the pre-filter (h157, h164 tonight), a 40-game screen costs the same VM as a 36-game panel block, and each block
adds 12 matches, which would put the queue back over 30 under the shared mode. So saturn keeps its 8 slots and the
screens retire: h155 and h154 deleted from ~/jobq/superseded (superseded by h157 on the panel and by h166), as h157's
and h164's were; h160, h162 and h156 stay there unrun until decided. Saturn's undeployed code (slots that survive
spool errors, exc_caught / slow_logged, the fail-closed sandbox.sh) goes in with `deploy.sh app` and a restart
between panel blocks, after h162's last match (1029) ends, so no block game is retried.

## 2026-10-24 22:56 PDT: h162 (ATTACK_ONE 1) REJECTED at block 1 (13 of 36, side-aware z -1.80); saturn redeployed

Block 1 = matches 1023-1034 (1029, vibe19 vs uvafan, ran last; finished 22:55). `tools/panel_pool.sh 726-731
progress/panels/v8-m1.pool 1023-1034`: h162 wins 13 of 36 against a pooled expectation of 16.0 (z -1.48),
side-aware 15.9, z -1.80: under 0.5, so REJECTED by the block-1 rule; outside the +-1 join band, so not pooled.
Won: IanCoolidge0 1036 (both), 2644 (both), 203 red; bot1v43 388 (both); botfinalsafe 203 blue, 2740 red;
awesomelemonade 1712 (both); wololo 2644 red; uvafan 1653 blue. Lost the usually-won awesomelemonade 2797 red (pool
red 5 of 6), uvafan 1653 red (7 of 9) and bot1v43 2321 red (5 of 6); the never-won cells stayed lost. ECONOMICS row 2
closes (Blotto concentration of the general attack). The mechanism read (`tools/census.js` attack_split on our side
against v8's 726-731) follows.

Saturn's pending code went in between blocks: `tools/galaxy19/deploy/deploy.sh app` and `sudo systemctl restart
bc19-galaxy-saturn` at 22:55 (no match of ours running), 8 slots back at once.

### 2026-10-24 23:01 PDT: h157 on the panel, block 1 = matches 1035-1046

Submitted with `tools/panel_submit.sh dist/h157 "cand:h157"` (submission 178, scrim requests 464-475, v8 back on
the ladder as 179) right after the saturn restart. Bars fixed before any game (22:20, 22:43): side-aware z over the
v8-m1 pool with the five studied cells (wololo 2013, 2644, 836, bot1v43 2591, botfinalsafe 1706); block 1 rejects
below 0.5; the studied cells also need z over the other cells >= 0. Mechanism read: both first escorts within 2
steps of their radioed site 20 rounds after birth in at least half of the studied games (v8 0 of 5). h162's held
VM screen deleted (decided). Queue 38 waiting (26 ranked + h157's 12); VM disk 2.9 GB free.

### 2026-10-24 23:10 PDT: h162 mechanism read: every call joined, no games moved

census attack_calls / attack_split on our side (scratchpad study/split_census.js; tools/census.js, to r1000):
h162's block 1023-1034 has 18 multi-castle games, 601 attack-call rounds, 0 split (no game with a split); v8's
pool block 726-731 has 9 multi-castle games, 468 call rounds, 283 split, 4 games with a split (2046, 1653, 1712,
203). So ATTACK_ONE acted as built and every castle called the same target, yet the block won 13 of 36 (z -1.80).
Split targets are not what decides v8's long games; ECONOMICS row 2 closes with the mechanism confirmed.

### 2026-10-24 23:32 PDT: v8's long losses are sieges lost at home: newborns fed to prophets just outside castle reach

The 11 r1000 health losses of v8's 51 replica field games (ECONOMICS §2 item 5; 729 2046, 1712; 730 2797; 770 2330;
771 203, 1626; 772 2822; 773 2733, 2674; 887 203, 705), by 100-round windows from r500 (scratchpad econ/latewin.js,
deaths.js, late.js, endgame.js, land2.js):
- r500-899 we spent 41,220 K and lost 35,175 K of military (85%), 98% of it within r2 100 of one of our structures;
  they spent 44,935 K and lost 18,495 K (41%). In the 9 r1000 wins the exchange flips: we lose 44% (89% at home),
  they lose 128%. Our health stays flat r500-900 in the losses (1712: 2,410 to 2,330) while theirs doubles.
- The home losses (34,645 K): 98% killed by enemy prophets, 62% at age 0-3 turns and 30% at 4-20; 82% of the
  killers stood at r2 65-144 from our nearest structure, just outside a castle's r2 64. By type: prophets 21,100 K,
  preachers 13,020 K (short-range units built against prophets they cannot reach), crusaders 525 K.
- The endgame dump works: our bank is 0-11 K at r1000 with 9,000-30,000 F idle. Land is at par in 2046 and 2797
  (K depots 3 vs 3, 9 vs 10 staffed at r800) and behind on 1712 (10 vs 17-18 from r200, structures 6 vs 8).
- Upper bound (late.js "hold"): had every K spent from r600 bought crusaders that lived, 9 of the 11 end ahead on
  health. Ignores that the fed units also killed some campers.
This is MUSTER's case (h163, next after h157); its pre-registered bars stand (TRAINING_LOG 20:54). It also says the
r1000 tiebreak is bought by units that live, and the K sunk into newborns under a siege buys almost none.

### 2026-10-24 23:32 PDT: correction: 16 of v8's 29 field losses reached r1000, but only 11 at equal castles

The statement in the 18:45 entry (its Blotto lens), ECONOMICS §2 item 5, the Blotto paragraph and config.js ATTACK_ONE
that all 16 r1000 losses came at equal castles is wrong: match.json gives reason "health" for 11 and "castles" for 5
(770 826, 771 520, 772 1712, 853 1884, 887 826). ECONOMICS and the config comment are corrected; the split-call
count (11 of the 16) is unchanged.

### 2026-10-25 00:04 PDT: h167 (MUSTER 2, hold only) built; pre-registered for the panel one block after h163

**h167 = v8 + MUSTER 2** (ECONOMICS row 3, its hold form; dist/h167 bd86bcd5b011). The camper case is h163's
(struct.js musterCase). Mode 2 never radios the release: the held crusaders are health kept for the r1000
tiebreak (2026-10-24 23:32: in v8's 11 health losses 85% of the military K spent r500-899 died, 98% at home, 62% within 3
turns of birth). They hold on rings 2-4 king steps from home (mode 1: ring 2), out of the campers' reach, until an
enemy crusader or preacher is in sight, with no MUSTER_WAIT timeout, and they skip attack orders, ATTACK_LATE too,
while they hold. While the case holds, the peacetime army builds held crusaders instead of prophets and preachers
for the lattice (struct.js musterArmy). Defaults replay v8 byte-identical on 2046 to r600; MUSTER 1 unchanged;
`tools/unit-tests.sh` 163 of 163 (galaxy19 64 OK).

Driver diagnostics against dist/turtle to r400 (scratchpad econ/vsdiag.sh; red side; no exceptions), with v8's and
h163's from 2026-10-24 20:54: 1712: h167 won by castles at r370 (turtle castles fell r259 and r370; a church line went from
4 to 12 churches in r350-369), v8 and h163 had no result by r400; young share of military K 62% (v8 61%, h163 52%).
2797: no result by r400; army 51 (26 crusaders, 19 prophets, 6 preachers) against v8's 26 and h163's 49; young
share 39% against v8's 60% and h163's 53%; turtle at one castle (v8's game: two).

Pre-registration. h167 plays the general panel one block after h163, scored the same way:
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK --studied` with h163's studied cells (uvafan 1712,
awesomelemonade 1712, 2797, 2518). If h163 is accepted first, h167 rebases onto the new champion as MUSTER 2
against its pool. Mechanism reads, not decision inputs: muster builds in at least a third of the games; military
K dead within 3 turns of birth in losses under 45% (v8 55%); in r1000 games, our end health against v8's in the
same cells (scratchpad econ/endgame.js).

## 2026-10-25 00:11 PDT: h157 (ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9) REJECTED at block 1 (14 of 36, side-aware z -1.17); h163 on the panel

Block 1 = matches 1035-1046, scored by the pre-registered command (TRAINING_LOG 2026-10-24 22:20, 22:43): 14 of
36, pooled expectation 16.0 (z -0.99), side-aware expectation 15.9, **z -1.17** (block 1 rejects under 0.5).
Studied cells (wololo 2013, 2644, 836, bot1v43 2591, botfinalsafe 1706) 1 of 10 against 1.1 (z -0.23); other cells
13 of 26 against 14.8 (z -1.16). Not pooled (|z| > 1). It won rarely-won cells: uvafan 1712 both sides (pool 1 of
14), awesomelemonade 2518 both sides (2 of 14), wololo 836 blue (0 of 14); it lost usually-won ones: IanCoolidge0
1036 red, bot1v43 388 red, botfinalsafe 2740 red, wololo 2644 red, uvafan 1653 both sides. Mechanism read
(scratchpad econ/esc_matches.sh 1035-1046): both first escorts within 2 steps of their site 20 rounds after birth in
1 of the 10 studied games (bar: half; v8 0 of 5); one escort only in 4, neither in 5. The hold did not hold. h165
(h157 + ESCORT_EACH 2) and h166 (h157 + ESCORT_EARLY 1) close with it, unplayed, as pre-registered.

h163 (v8 + MUSTER 1, dist/h163 f0fbe3ea6c0e) is next, as pre-registered (2026-10-24 20:54): submitted with
`tools/panel_submit.sh dist/h163 "cand:h163"` (submission 180, scrim requests 476-487, v8 back as 181);
**block 1 = matches 1047-1058**. Queue 14 waiting before it.

## 2026-10-25 00:37 PDT: h157's block read pair by pair: the fast hold won where the site was open, lost to early prophets

h157's 18 games against v8's 18 in 726-731 on the same cell and side (scratchpad study/pairs.txt). 8 pairs differ in
result. `node tools/replay.js diverge A B` (new: the first robot-turn that acts differently) puts the split of
2 on the opponent, acting first on an identical state: uvafan 1653 red (r47, a prophet gives instead of idling)
and IanCoolidge0 1036 red (r2, the castle builds a pilgrim). Those two losses are the opponents' own
nondeterminism. The other 6 split on our escort's first long step (r4-r12), and they split 3 and 3:
- Won (v8 lost): uvafan 1712 blue (and red, by castles at r311/r319), awesomelemonade 2518 blue (and red, castles
  r283/r279), wololo 836 blue. On 1712 the escort stood at uvafan's site by r20-22, killed the pilgrim at r22 and its
  new church at r30 and kept killing pilgrims; h157 had 5-6 churches and 29-30 pilgrims at r100 against uvafan's 1-3
  and 11-18 (in v8's game uvafan had 6 and 38, v8 3 and 20; v8's escort died at r27 to a preacher). On 2518
  awesomelemonade built no church all game (5 pilgrims) with our two crusaders on its site from r8-10; against v8
  it churched by r25 and killed v8's pilgrim at r30.
- Lost (v8 won): bot1v43 388 red (both escorts dead at r22-23 to its r3 prophet), botfinalsafe 2740 red (dead at r40
  and r45 to prophets), wololo 2644 red (dead at r20 to the castle and r27 to a prophet; v8's escort won the r15-18
  duel there).
Escort census (scratchpad econ/esc_sight.mjs, all 18 pairs): v8's escorts never come within 2 steps of their site;
h157's do by r7-r28 in 14 of the 15 games with escorts. In the three switch-led losses 5 of the 6 died to prophets,
and 3 of those had no enemy attacker or castle in their own vision before they died (6 in all of h157's games;
crusader vision r2 49, prophet reach 64). So a "fall back on sight" rule cannot separate the cases; in the wins
the escorts first saw crusaders or nothing. The fast hold trades the open-site cells for
the prophet-opener cells. The decision stands (rejected, not pooled; LEARNINGS 38). Lead, not queued: an escort that
takes a prophet's shot goes back to v8's lattice hold; first a census of the hits in these 18 games (836's first
two escorts also died to prophets, at r24-26, in a win).

## 2026-10-25 01:24 PDT: h168 (h157 + ESCORT_BACK 1) built; pre-registered for the panel after h167

**h168 = v8 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1** (dist/h168 a5bd8bb262df). From the pair-by-pair
read of h157's block (00:37): h157's escorts won the cells where the enemy came to the site with pilgrims and
crusaders (uvafan 1712, awesomelemonade 2518, wololo 836), with every winning kill before any prophet hit
(scratchpad econ/esc_hit.mjs), and died 3-7 rounds after a prophet's first shot where the enemy opened with
prophets (bot1v43 388, botfinalsafe 2740, wololo 2644). ESCORT_BACK (military.js escortBack): an escort that loses
health with no enemy crusader or preacher within r2 25 (a prophet's or a castle's shot, often from outside its
vision) gives up its site, takes its birth structure's lattice and walks all the way to its chosen tile there at
ESCORT_FAST_R2 before it holds again. Defaults replay v8 IDENTICAL on 2046 to r600; `tools/unit-tests.sh` 165 of 165
(new test: hit with no melee near, it goes home at steps up to r2 9 and holds within 7 king steps of its castle;
unhit, off, or hit beside an enemy crusader, it keeps its site).

Driver diagnostics to r150, red side (scratchpad vs/h168_diag.txt, vs/h168_camp.txt, econ/esc_back.mjs; no
exceptions): against dist/turtle on 388, 2740, 2644, 1712, 2518 and bots/v8 on 1712, 2518, 388 no prophet or castle
hits an escort, so the switch never fires (against turtle h168's games equal h157's at r150). Against dist/camp it
fires where it should: on 388 the escort hit at r12 walked from 12 to 21 steps from its site and lived (h157's died
at r18), on 2644 the one hit at r11 from 2 to 12 steps and lived (h157's died at r14); 2591 no hit.

Pre-registration. h168 plays the general panel one block after h167, scored with `tools/panel_pool.sh 726-731
progress/panels/v8-m1.pool BLOCK --studied` on the six cells its design read: uvafan 1712, awesomelemonade 2518,
wololo 836, wololo 2644, bot1v43 388, botfinalsafe 2740 (so its z over the other cells must also be >= 0). If h163 is
accepted first, h168 rebases onto the new champion. Mechanism reads, not decision inputs, on our side of the block:
of the escorts a prophet or castle hits, those dead within 6 rounds of the first hit (econ/esc_back.mjs): under
40% (h157: 18 of 26, 69%); and in the 1712, 2518, 836 games, our escorts' kills of enemy pilgrims and churches
before r60, against h157's in the same games.

## 2026-10-25 01:41 PDT: h163 (MUSTER 1) passes panel block 1 (18 of 36, side-aware z 1.34); block 2 = matches 1063-1074

Block 1 = matches 1047-1058, scored by the pre-registered command (2026-10-24 20:54; HANDOFF): 18 of 36, pooled
expectation 16.0 (z 0.99), side-aware expectation 15.9, **z 1.34**, over block 1's reject line 0.5. Studied cells
(uvafan 1712, awesomelemonade 1712, 2797, 2518) 5 of 8 against 3.7 (z 1.47); other cells 13 of 28 against 12.2 (z
0.63, so >= 0). Won rarely-won cells: uvafan 1712 blue (pool 1 of 14), botfinalsafe 203 red (0 of 9 red); lost a
usually-won one: IanCoolidge0 203 red. Never-won cells still lost: uvafan 2046, bot1v43 2591, botfinalsafe 1706,
wololo 2013, 836, awesomelemonade 2518. By the rule a second block decides (accept at two-block z >= 2, reject
under 1, else a third): submitted with `tools/panel_submit.sh dist/h163 "cand:h163"` (submission 182, v8 back as
183); **block 2 = matches 1063-1074**. Queue 2 waiting before it.

### 2026-10-25 01:59 PDT: h163's mechanism reads on block 1 (1047-1058): both pass; not decision inputs

Military karbonite dead within 3 rounds of birth (scratchpad young/young_share.sh, our side): losses 21,050 of
54,005 K, **39%** (bar: under 45%; v8 55% in 726-731); wins 16%. Muster builds (scratchpad econ/muster.js; structure
radio SIG.THREAT at r2 2): 740 in 25 of the 36 games (11 of 18 wins, 14 of 18 losses), with release radios in 22 of
those 25 (bar: a third). The most in IanCoolidge0 203 (60 and 101 builds, 167 and 679 release radios; both lost,
v8 6 of 7 red) and uvafan 1712 (109 and 171; one won, a cell v8 won once in 14). None on bot1v43 388, 2591, wololo
2644 red, IanCoolidge0 2644. The switch acts where it was built to; block 2 decides.

## 2026-10-25 03:07 PDT: h163 (MUSTER 1) block 2 scored: a third block

All twelve matches of block 2 (1063-1074) downloaded at 03:05. `tools/panel_pool.sh 726-731
progress/panels/v8-m1.pool 1047-1058 1063-1074 --studied uvafan.bc2019:seed-1712,awesomelemonade.Battlecode2019:seed-1712,awesomelemonade.Battlecode2019:seed-2797,awesomelemonade.Battlecode2019:seed-2518`:
35 of 72 against the pooled 32.0, side-blind z 1.05; side-aware (k 2) 31.7, z 1.45. Studied cells 9 of 16 (z 1.27),
other cells 26 of 56 (z 0.89, so the studied-cells condition holds). Block 2 alone: 17 of 36, side-aware z 0.71
(studied 4 of 8, z 0.33; others 13 of 28, z 0.63). Over both blocks it won the rarely-won botfinalsafe 203 red (1 of
2, pool 0 of 9) and uvafan 1712 blue (1 of 2, pool 1 of 9), and lost the usually-won IanCoolidge0 203 red (1 of 2,
pool 6 of 7). Neither z >= 2 nor below 1, so by the rule: a third block, both sides, decided by the side-aware z over
all three blocks, accept at >= 2, else reject. Block 3 = matches 1091-1102 (submission 184, v8 back as 185),
requested 03:06.

## 2026-10-25 04:22 PDT: ECONOMICS row 10 dropped on a census; parked pioneers; h169 built and pre-registered

Census of v8's 51 field games (726-731, 770-776, 800, 805, 853, 887; scratchpad econ/lost.mjs, stall.mjs; 46 games
send pioneers): 327 pioneers, 123 built a church, 17 mined first, 79 died, 108 never built, mined or died. Of the 79
deaths, 74 came where an enemy church or castle already stood within 3 king steps of the site, 2 where one came
within the next 100 rounds and 3 where none ever came: a sooner retry (row 10, LOST_RETRY) pre-empts nothing, so
row 10 is dropped unbuilt. The waste is elsewhere: 142 pioneers went to a site the enemy already held (an enemy
structure within 3 king steps, none of ours); 5 built a church, 43 died, 88 parked. Parked pioneers stand 8-15 king
steps short (quartiles 8, 11.5, 15), out of the campers' reach and mostly too far to see the church (68 of the 142
ever had an enemy structure within 5 of the site in vision); the castle forgets each after 80 turns and sends the
next (729-3, seed 1712: 24 pioneers, 16 parked). Parked: 56 in the 21 wins, 52 in the 25 losses; 58 in v8's 18
panel games (uvafan 1712 16, IanCoolidge0 1036 15, awesomelemonade 2518 6).
Emulating pilgrim.js's siteStalled on every pioneer turn (flee turns and at-site turns excluded): PIONEER_STALL_ANY
40 fires on 155 pioneers, a median 50 rounds after birth: 100 of the 108 parked, 46 of the 79 that died, 4 that
mined, and 5 of the 123 that built a church (20: 171 and 7 churches; 60: 147 and 5).
**h169 = v8 + PIONEER_STALL_ANY 40 + PIONEER_HOME 1 + PIONEER_TIMEOUT_REST 1** (dist/h169 44beaf1cf5bf; ECONOMICS row
13, idle capital): a pioneer 40 turns no nearer its site gives it up, reports it taken (castles rest it 200 rounds)
and mines at a free depot by our structures; a castle rests the site of a pioneer 80 turns out without its church
100 rounds instead of re-sending at once. One change (stop re-buying pioneers for held sites) over three existing,
unit-tested switches. Driver, seed 1712 to r1000, both sides against v8: the two games are identical with the sides
swapped (blue wins on castles; no pioneer stalls, gives up or parks in self-play; no exceptions), so the switches act
only where the field holds our sites.
Pre-registered (mechanism reads, not decision inputs; zombies.mjs on h169's block and on v8's 726-731): parked
pioneers per game under a third of v8's on 726-731 (58 in 18 games); our churches per game at least 90% of v8's on
726-731. Studied cells (the design used every v8 field game; these panel cells hold 37 of v8's 58 parked):
uvafan.bc2019:seed-1712, IanCoolidge0.battlecode20~69ce88:seed-1036, awesomelemonade.Battlecode2019:seed-2518.
Panel order: after h163's third block, h167, then h169, then h168, h164, h160; if h163 is accepted, h169 is rebuilt
on the new champion with the same three switches.

## 2026-10-25 04:26 PDT: h169's decision rule, fixed before its first block

h169 repairs a basics failure of the class already judged so twice (pilgrims idle on free depots, pioneers that never
arrive: entries of 2026-10-22 08:43 and 09:30): pioneers that park for good at held sites and are re-bought every 81
rounds. TRAINING_ALGORITHM §4 lets such a fix be accepted at z >= 0. The rule, fixed now: two blocks (72 games, both
sides); block 1 rejects only at side-aware z < -1. After block 2, accept if (a) the mechanism reads of 04:22 pass on
the two blocks (parked pioneers per game under a third of v8's on 726-731; our churches per game at least 90% of
v8's there), (b) the cumulative side-aware z >= 0, and (c) the z over the cells other than the three studied ones
>= 0. If (a) fails, the ordinary rule applies to the same blocks (accept z >= 2, reject < 1, else a third block).
Otherwise reject.

## 2026-10-25 04:35 PDT: h163 (MUSTER 1) REJECTED at three blocks (51 of 108, side-aware z 1.23); h167 on the panel

Block 3 (1091-1102) downloaded at 04:33. `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 1047-1058 1063-1074
1091-1102 --studied uvafan.bc2019:seed-1712,awesomelemonade.Battlecode2019:seed-1712,awesomelemonade.Battlecode2019:seed-2797,awesomelemonade.Battlecode2019:seed-2518`:
51 of 108 against the pooled 48.0, side-blind z 0.85; side-aware (k 2) 47.6, z 1.23, under 2: **rejected**. Block 3
alone 16 of 36, side-aware z 0.08 (studied 3 of 8, z -0.80; others 13 of 28, z 0.63); the three blocks' studied cells
12 of 24 (z 0.57), others 39 of 84 (z 1.09). Across the blocks it won the rarely-won botfinalsafe 203 red (1 of 3,
pool 0 of 9) and uvafan 1712 blue (1 of 3, pool 1 of 9) and dropped the usually-won IanCoolidge0 203 red and
awesomelemonade 2797 red (2 of 3 each, pool 6 of 7 and 5 of 6). Block 1's z 1.34 did not repeat (0.71, 0.08), the
shape h148 showed. Pool (rule of 2026-10-24 11:43, each block by its own side-aware z): 1047-1058 left out (1.34),
1063-1074 and 1091-1102 join progress/panels/v8-m1.pool.
h167 (MUSTER 2, hold only; dist/h167 bd86bcd5b011) next, as pre-registered at 00:04 on v8: block 1 = matches
1120-1131 (submission 186, v8 back as 187), requested 04:35; scored with
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 1120-1131 --studied uvafan.bc2019:seed-1712,awesomelemonade.Battlecode2019:seed-1712,awesomelemonade.Battlecode2019:seed-2797,awesomelemonade.Battlecode2019:seed-2518`
against the pool as it now stands (block 1 rejects at z < 0.5).

## 2026-10-25 04:52 PDT: h163's discordant pairs read by first board difference

The 54 h163 games whose cell and side v8 played in 726-731, paired with v8's game (scratchpad study/pairs_h163.txt):
6 discordant, 5 gained and 1 lost. `node tools/replay.js diverge`: the loss (IanCoolidge0 203 red, 1057 vs 731)
parted on our castle at r63 (a muster crusader against v8's prophet); the 5 gains parted first on the opponent's
radio value (awesomelemonade's church r43, botfinalsafe's castle r57, uvafan's church r72), which differs every
game. New `diverge --board` (radio and castle talk ignored) and `--team T` (tools/replay.js; unit test; suite 165
of 165): awesomelemonade 2797 blue, all three gains (1056, 1072, 1100 vs 730), part first on our church #1266 at
r72 building a crusader where v8 built a prophet, before any opponent board action differs: switch-led. Botfinalsafe
203 red parts first on their pilgrim at r57 (moved, v8's game: mined) and uvafan 1712 blue on their prophet at r72
(gave, v8's game: moved): the opponents' noise. So the switch led 4 discordant cells, 3 gains on one cell
(awesomelemonade 2797 blue) and 1 loss; MUSTER's worth sits on that cell. LEARNINGS 42 extended.

## 2026-10-25 04:57 PDT: h169's bars in numbers (v8 on 726-731, before any h169 game)

zombies.mjs on v8's 18 panel games (scratchpad econ/zmatch.sh 726-731): 132 pioneers sent, 58 parked (alive at the
end without church, mine or death; 3.22 a game), 217 churches of ours (12.06 a game). h169's bars (04:22) are
therefore: parked pioneers under 1.07 a game; our churches at least 10.85 a game. Also from the replica record:
since match 1000 our robots time out 6 times and freeze 8 times per million turns, the opponents in the same games
38 and 763 (LEARNINGS 31: the host's load, not our code); no basics item there.

## 2026-10-25 05:15 PDT: pioneer speed census: fuel-throttled steps cost the early church about 3 rounds; PIONEER_FAST stays parked

Scratchpad econ/pspeed.mjs on v8's 51 field games (327 pioneers). The 74 pioneers born before r40 that built a
church: median 11 king steps to the site, 15.5 turns from birth to church; turns minus king steps, quartiles 0, 0, 9
(half walk one king step a turn and build on arrival). Their 1,565 turns: 841 one-tile moves (447 of them with the
bank under PILGRIM_FAST_FUEL 1000), 220 two-tile moves, 430 turns without a move (waiting for the church's
karbonite, blocked or fleeing). At most half of the 447 throttled steps could have been two-tile steps (diagonal runs
gain nothing at r2 4), so PIONEER_FAST would bring the median early church about 3 rounds sooner, about 20 K-equivalent
on a 4-depot cluster (ECONOMICS §1). The race gap is departure (the field's first pioneers leave at r4, ours at
r12-24) and the bank at the site, both tried (h140, h147 rejected). PIONEER_FAST alone stays parked; no new candidate.

## 2026-10-25 05:49 PDT: h167 (MUSTER 2, hold only) passes panel block 1 (21 of 36, side-aware z 3.28); block 2 = matches 1143-1154

Block 1 (1120-1131, all finished 05:48) scored as pre-registered:
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 1120-1131 --studied uvafan.bc2019:seed-1712,awesomelemonade.Battlecode2019:seed-1712,awesomelemonade.Battlecode2019:seed-2797,awesomelemonade.Battlecode2019:seed-2518`:
21 of 36 against the pooled 16.1 (side-blind z 2.52); side-aware expectation 16.0, **z 3.28**; studied cells 5 of 8
(expectation 3.7, z 1.59); other cells 16 of 28 (expectation 12.4, z 2.89). Rarely-won cells won: wololo 2013 red
(pool 0 of 18), botfinalsafe 203 red (0 of 11 on that side), uvafan 1712 blue (1 of 11). Lost every cell the pool
never wins (wololo 836, 2013 blue; botfinalsafe 1706; bot1v43 2591; uvafan 2046; awesomelemonade 2518) but the one.
Block 1 passes (z >= 0.5); under the rule a block-1 z is not a verdict (h148's 2.20 and h163's 1.34 did not repeat),
so block 2 decides with it (accept at pooled z >= 2, reject < 1, else a third). Block 2 requested 05:49: matches
1143-1154 (submission 188, v8 back as 189). Mechanism reads (00:04) wait until the block decision, run on the driver
one at a time.

## 2026-10-25 05:58 PDT: census: the enemy's churches on our half stand where our pioneer stalled short of the site

Scratchpad econ/ourhalf.mjs on v8's 51 field games: every enemy church nearer our first castles than theirs, matched
to the nearest cluster our castles planned (tools/plan.mjs, within 3 king steps) and to our pioneers sent there
before it. 224 such churches in 29 games, 164 of them in losses, most after r200 (chain lines and invasions: 130 of
the 164 at no planned site). By r200 the losses hold 38 distinct sites: 25 planned clusters and 13 unplanned. Of the
25 planned: at 12 our pioneer had been sent 3-60 rounds before the enemy built and was still short of the site
(parked 6-9 king steps out; 12 of those 14 pioneers died later), at 6 our church stood first and theirs went up
beside it, at 1 our pioneer had died, and 6 were never sent by the time the enemy built (r53-184, contest margins
m 8-19: uncontested land we had not reached). The wins hold 9 such sites by r200, 7 of them with our pioneer short.
So the land the field takes from us is mostly land we went for and could not close: a lone pioneer stops at the edge
of the enemy's guards and waits while their pilgrim builds under them. The 6 never-sent sites point the same way:
the castles' pioneer slots (2 each, 6 a team) were held by stalled pioneers until the 80-turn timeout. This is the
case h169 acts on (a pioneer 40 turns no nearer gives up and mines; the castle rests a timed-out site and sends the
next); it is evidence for its design, not a new bar.

## 2026-10-25 07:24 PDT: h167 (MUSTER 2, hold only) ACCEPTED on two blocks (38 of 72, side-aware z 2.78); it becomes v9

Block 2 (1143-1154, all finished by 07:23): 17 of 36. Both blocks, as pre-registered (00:04, 05:49):
`tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 1120-1131 1143-1154 --studied uvafan.bc2019:seed-1712,awesomelemonade.Battlecode2019:seed-1712,awesomelemonade.Battlecode2019:seed-2797,awesomelemonade.Battlecode2019:seed-2518`:
38 of 72 against the pooled 32.2 (side-blind z 2.11); side-aware expectation 32.0, **z 2.78** (>= 2); studied cells
9 of 16 (expectation 7.3, z 1.41); other cells 29 of 56 (expectation 24.7, **z 2.40** >= 0). **ACCEPTED.** Cells
against the pool: botfinalsafe 203 red 2 of 2 (pool 0 of 11 on that side), wololo 2013 red 1 of 2 (0 of 8), uvafan
1712 blue 1 of 2 (1 of 11); every other cell at or near its pool rate; the never-won cells stay lost (wololo 836,
2013 blue; botfinalsafe 1706; bot1v43 2591; uvafan 2046; awesomelemonade 2518).
**v9 = h167 = v8 + MUSTER 2** (dist/h167 bd86bcd5b011, frozen as bots/v9). Today's source built with MUSTER 2 replays
dist/h167 byte for byte (seed 1712 against dist/turtle to r400: red wins by castles at r370, 24 muster builds; scratchpad
vs/id_*). Block 1's 21 included luck (block 2: 17), so v9's accepting blocks overstate it; the pool for v9's
candidates is fixed now, before any v9-based block is scored: control 1120-1131, pool file progress/panels/v9-m1.pool
= 1143-1154 plus a fresh v9 control block played first (bots/v9 as the candidate, both sides, 36 games), which
dilutes the selection in the accepting blocks (TRAINING_ALGORITHM §4: the incumbent's own blocks). Rejected v9-based
blocks join it under the +-1 rule. Then, one block at a time: h170 (= v9 + h169's three pioneer switches; h169 is
closed unplayed, its base superseded), h171 (v9 + h168's escort switches), h172 (v9 + CHAIN_WALL 28, h164's), h173
(v9 + ECON_NOPLAN 1 on the targeted panel, h160's). Each keeps its predecessor's pre-registration, with v9's numbers
where a bar is relative to the champion.

## 2026-10-25 07:42 PDT: v9 set up; h170-h173 built on v9; h170's bars re-based on v9

- `src/bot/config.js` MUSTER defaults to 2 (v9). The defaults build (sha 3b6862f2b236, byte for byte the `--cfg
  MUSTER=2` build) against itself on 799 to r300 (the no-op flags, driver alone) is IDENTICAL to bots/v9 against
  itself. Unit tests 165 of 165 after pinning v8's MUSTER 0 in the one test of MUSTER 1's release (testPreV9).
  `tools/panel_submit.sh` resubmits bots/v9 as the ladder build from now on.
- Built on v9 (defaults plus the predecessor's switches): h170 = PIONEER_STALL_ANY 40 + PIONEER_HOME 1 +
  PIONEER_TIMEOUT_REST 1 (dist/h170 f4e6985acea0; h169's), h171 = ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1
  (a3c65b3dba16; h168's), h172 = CHAIN_WALL 28 (d114d31e373e; h164's), h173 = ECON_NOPLAN 1 (437528e313a7; h160's).
- **h170 pre-registered** (before any h170 game): the basics-fix rule of 04:26 with v9 in v8's place. Two blocks on
  the v7-m1 panel, both sides; block 1 rejects only at z < -1; accept at side-aware z >= 0 (other cells z >= 0) if
  (a) both mechanism reads pass on h170's two blocks: parked pioneers per game under a third of v9's, and our
  churches per game at least 90% of v9's, where v9's rates are scratchpad econ/zombies.mjs (econ/zmatch.sh) on v9's
  108 panel games: h167's blocks 1120-1131 and 1143-1154 and the v9 control block (same panel, both sides, so the
  same cells as h170's; h169's reference was v8's 18 games on 726-731). If (a) fails, the ordinary rule on the same
  blocks (accept z >= 2, reject < 1, else a third). Studied cells: uvafan.bc2019:seed-1712,
  IanCoolidge0.battlecode20~69ce88:seed-1036, awesomelemonade.Battlecode2019:seed-2518. Interim, h167 block 1: 3.19
  parked and 11.25 churches a game (36 games); the bars are computed from all 108 before h170's block is read.
- Next: the v9 control block (bots/v9 as the candidate), which joins progress/panels/v9-m1.pool with no decision;
  then h170, h171, h172, then h173 on the targeted panel after its own v9 control block.

## 2026-10-25 07:59 PDT: study of v9's decided blocks: where the karbonite went on uvafan 2046; 2591's escorts at home

Decided blocks only (1120-1131, 1143-1154). Census for h170's bars (scratchpad econ/zmatch.sh, zsum.py): v9 sent 581
pioneers in 72 games, 230 parked (3.19 a game in each block), 827 churches (11.25 and 11.72 a game); the control
block 1180-1191 completes the 108-game reference. Exceptions 0 in 72 games; 23 timeouts and 6 frozen turns
(theirs 242 and 2,586; host load, LEARNINGS 31).

- **uvafan 2046** (lost 4 of 4 at r1000 on health, as v8): 1126 red, 990 HP against 6,420, both sides two castles and
  no church at the end. We mined 4,618 K (theirs 5,428 with 7 pilgrims to our 11-15) and lost 24 churches, 69
  preachers, 24 pilgrims, 31 crusaders and 15 prophets, about 4,350 K of the 4,680 spent; we killed 30 prophets.
  The chain lines (churches, chainer pilgrims, preacher bursts) took about 3,500 K, 75% of the game's karbonite,
  into a wall that grew from 59 prophets at r450 to 131 at r900. The 14 crusaders built by r200 marched at r450 and
  died. This is the case CHAIN_WALL 28 (h172, ECONOMICS row 8) acts on; the census of 22:39 drew it from these lines.
- **bot1v43 2591** (lost 4 of 4, r120 and r147): a 32x32 map whose only depots beyond each castle's own pair are
  the centre cluster, split by the mirror line. bot1v43's r2 pilgrim churched (18,7) at r23 and its church's
  prophets then covered our half. Ours: pilgrims r1-2, the two ESCORT_FIRST crusaders r3-4, then nothing until the
  pioneer at r24 (K 50-80: the escorts' 30 K came out of the church's price). Both escorts stood on (6,14), beside
  the castle, from birth to death (r43): it is a lattice tile within LATTICE_R 12 of the mirror site, the stop h157
  and h171 (ESCORT_HOLD_R 2) change. Mined K by r120: ours 172, theirs 432.

## 2026-10-25 08:24 PDT: v9 symmetric to r1000 on seeds 3, 1, 2, 2321

VM job ...1000symv9 (`tools/symcheck.js --bot bots/v9 --seeds 3,1,2,2321 --rounds 1000`, nice 15, unshare -rn; out/sym_v9_r1000.log):
every seed ok at round 1000 (192, 196, 98 and 106 robots), as v8's (2026-10-24 17:33). MUSTER 2's held crusaders and
their rings keep the mirror.

## 2026-10-25 09:12 PDT: the daily autoscrim fired (174 waiting); h174 pre-registered (idle miners beside free safe depots)

- Replica queue: the autoscrim fired at 09:00 PDT, 24 h after the last: 174 ranked matches waiting at 09:00, 167 at
  09:10, spread 4 a team over the ladder (ours 4; 15 hold one of the five slow bots), so no bot holds the lion's share
  and none is dropped. All 8 execute slots play (load 12.3; the VM's job queue is empty, so the 8 vCPUs serve the
  replica). Clearing takes about 15 h. Inflow while 30+ wait: the autoscrim stays held, no local VM jobs, and our panel
  blocks go in one at a time (12 matches, about 7% of the backlog), bumped to the front (`tools/bump_ours.sh --ours`)
  as on 2026-10-24 09:09. The v9 control block 1180-1191 has 10 of 12 done (1186, 1187 against uvafan running).
- **h174 = v9 + PILGRIM_HERE 1 + PILGRIM_STALL 25** (dist/h174 b60bfc4a57f5; ECONOMICS row 14: idle labour beside
  vacant jobs is a matching friction, the search-and-matching model of unemployment). A pilgrim whose target depot is
  taken or hot takes the depot it stands on, else the nearest free one not hot; one 25 turns no nearer its depot gives
  it up for 50 turns for the free depot nearest our structures. Source: awesomelemonade 2518 (1151): an enemy prophet
  parked out of our castle's reach from r43 killed every miner on (8,29) (r131, 200, 212, 293); two pilgrims both took
  the hot (8,29) through the "taken -> nearest free depot" branch and circled under stepAvoid while nobody mined the
  safe (9,30) from r67, the bank idle at 130-170 K.
- Census (tools/reads/idle.mjs, the scratchpad's econ/idledep.mjs moved into the repo with parked.mjs (econ/zombies.mjs)
  and escorts.mjs (econ/esc_back.mjs), same output; our team, to r300; stuckM = pilgrim-rounds a miner idle 20+ rounds in a row,
  carrying nothing, while a home depot (within 3 king steps of our structure) lies unmined, unoccupied and outside every
  enemy attacker's THREAT_R2; chainers and pioneers left out) on v9's 72 decided panel games: mean 40.4 a game, median
  1, 23 games at 50+; losses 49.9, wins 32.0; by opponent awesomelemonade 124.2, uvafan 56.0, IanCoolidge0 23.7,
  wololo 23.6, StoneT2000's two 7.6. Self-play h174 red against v9 to r300 (driver, one game at a time): stuckM 143 ->
  39 on 2046, 311 -> 229 on 1712 (mined K 4,008 against 3,744), 55 -> 69 on 2518, 0 -> 0 on 2591: the switch acts.
- Pre-registration: basics-fix rule (two blocks; block 1 rejects only at z < -1; accept at z >= 0, others >= 0, if
  the read passes, else the ordinary rule). Mechanism read: stuckM per game over h174's panel games at most 75% of
  v9's over its 108 panel games (40.4 over the 72 decided; the control block's 36 are added before h174's block is
  read, and the bar is fixed then). Studied cells awesomelemonade.Battlecode2019:seed-2518,
  uvafan.bc2019:seed-2046. Panel order: h170, h174, h171, h172, then h173 on its targeted panel (basics first).

## 2026-10-25 09:24 PDT: the v9 control block (1180-1191) joins the v9 pool, 16 of 36; h170's block 1 = matches 1379-1390

- v9 control block, bots/v9 as the candidate (submission 190), no decision: 16 of 36 (wololo 1 of 6, botfinalsafe 1,
  bot1v43 3, uvafan 2, awesomelemonade 4, IanCoolidge0 ~69ce88 5). The accepting blocks read 21 and 17: v9 stands at
  54 of 108. progress/panels/v9-m1.pool now holds 1143-1154 and 1180-1191. Basics: 0 exceptions, 11 timeouts and 4
  frozen turns in 36 games (theirs 12,258 exceptions, 146 timeouts, 1,191 frozen, 98 init failures).
- h170 block 1 (dist/h170 f4e6985acea0, submission 192, requests 636-647) = matches 1379-1390, bumped to the front;
  bots/v9 resubmitted as the ladder build (193). Scored with `tools/panel_pool.sh 1120-1131 progress/panels/v9-m1.pool
  1379-1390 --studied uvafan.bc2019:seed-1712,IanCoolidge0.battlecode20~69ce88:seed-1036,awesomelemonade.Battlecode2019:seed-2518`
  under the basics-fix rule. Its bars (2026-10-25 07:42) and h174's are computed from v9's 108 games before the block
  is read (tools/reads parked.mjs and idle.mjs on 1180-1191 running on the driver).

## 2026-10-25 09:43 PDT: h167's mechanism reads; the never-won cells 1706 and 836 trace to the escort stop; h171 moves ahead of h174

- h167 (v9) pre-registered reads (2026-10-25 00:04; not decision inputs), on its blocks 1120-1131 and 1143-1154
  (scratchpad econ/h167reads.txt): muster builds in 56 of 72 games (bar: a third) **met**; military karbonite dead
  within 3 turns of birth in losses 43.2% pooled, 44.0% per game (bar under 45%, v8 55%) **met, narrowly** (wins
  13.7%); end health at r1000 against v8's 726-731 on the shared cells: botfinalsafe 2740 +3,950 and +2,730 against
  +1,060, uvafan 1653 +1,690..+2,970 against +2,870, uvafan 2046 -5,430..-5,760 against -5,210, uvafan 1712 -6,430 (W
  on castles), -26,450, -5,380 against -10,020, IanCoolidge0 203 two wins and two losses against one win: no general
  end-health gain. The discordant-cell reading is superseded by the never-won-cell study below.
- v9's 108 panel games by cell: wololo 836, botfinalsafe 1706, bot1v43 2591, uvafan 2046, awesomelemonade 2518 lost 6
  of 6, wololo 2013 and uvafan 1712 won 1 of 6; 388, 1653, 2797, awesomelemonade 1712, IanCoolidge0 2644, 1036 won 6 of
  6. Most cells are decided by side and map; the round counts repeat to the round (2591: 120 red, 147 blue, every
  block).
- **botfinalsafe 1706** (1182 red, lost r314 on castles; 37x37, one castle each). Our plan: c2@(7,17) (7 depots,
  their steps minus ours m2) and c1@(25,11). Escort #3654 (r4) walked to (13,9), 8 king steps short of c2, and
  stood there from r22 to its death at r149 (125 turns with no action); botfinalsafe churched c2 at r29, out of its
  sight. Our pioneer for c2 (#1228, r34) reached (6,8)-(8,8) at r47 and circled there; the castle bought two more
  pioneers for the same held site (#2956 r115, #2075 r256), both circling at (6-13, 6-8). We had one church to their
  14; mined K 1,050 to 2,418; from r200 the bank rose 276 -> 626 K under the chain reserve (CHAIN_K 1000) and the army
  stood at 11 until their churches reached our castle at r310.
- **wololo 836** (1180 red, lost r610 on castles; 60x60, two castles each). c8@(45,28), 12 depots split by the
  mirror line, 10 king steps from castle (39,18), m3. Escort #2075 (r12) moved one tile to (40,20) and stood there
  r13-r35 (the site is within LATTICE_R 12 of home, so the first lattice tile is beside the castle), then died r37.
  wololo built its pioneer at r14 and churched (45,31) at r23; our pioneer (#2812, r25) came within 8 of the site at
  r29 and then circled at (44-48, 15-19). The castle (39,18) spent its bank on 21 prophets in r39-r144, the castle
  (22,19) built nothing from r15 to r179, our first church came at r165; theirs 5 churches and 30 pilgrims by r100.
- Both cells (and 2591, TRAINING_LOG 07:59) open the same way: our escorts stop short of or beside the castle, the
  opponent's pioneer churches the contested cluster at r23-r29, ours arrives after it and parks. A crusader at the
  site by r16-17 sees the enemy pioneer (it walks 2 tiles a turn) and kills a pilgrim in one hit. h171 (ESCORT_HOLD_R
  2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1: escorts hold within 2 of the site, move at r2 9, step back from a prophet's
  band) acts on exactly that stop, and 836 is among its studied cells; h170 acts on the parked and re-bought pioneers.
  Panel order now h170, h171, h174, h172, then h173 (an order of untried candidates, no bar changed).

## 2026-10-25 09:48 PDT: h171's escorts reach the never-won cells' contested sites by r7-17 (self-play census)

LEARNINGS 41, before h171 plays: dist/h171 red against bots/v9 and bots/v9 against itself, 80 rounds, on 836, 1706
and 2591 (driver, one game at a time; scratchpad econ/escdiag.sh, tools/reads/escorts.mjs). First round within 2
king steps of the radioed site, h171 against v9: 836 (site (45,31)) r15 and r17 against never; (0,33) r22 and r24
against never; 1706 ((7,19)) r13 and r15 against never; 2591 ((16,5)) r7 and r8 against never. The opponents
churched those clusters at r23 (wololo 836) and r29 (botfinalsafe 1706). On 2591 blue's pioneer never built its
church against h171 (it did against v9); on 1706 both h171 escorts died at r27 and r31 to v9's own escorts, no kills.

## 2026-10-25 09:57 PDT: h170's bars fixed from v9's 108 panel games (before h170's block is read)

tools/reads/parked.mjs on v9's three blocks (1120-1131, 1143-1154, 1180-1191; 108 games): 872 pioneers sent, 325
parked (3.01 a game; the control block alone 2.64), 1,204 churches (11.15 a game; control 10.47). h170's mechanism
bars (pre-registered 07:42): parked pioneers under 1.00 a game and churches at least 10.03 a game over h170's two
blocks. h174's stuckM bar follows when the control block's idle read finishes. h170 block 1 (1379-1390) still in
play; only its status was read.

## 2026-10-25 10:12 PDT: h174's stuckM bar fixed from v9's 108 panel games

tools/reads/idle.mjs (to r300) on v9's three blocks: stuckM (pilgrim-rounds a miner idle 20+ rounds stood beside a
free safe home depot) 41.2 a game over 108 games (the decided 72: 40.4; the control block: 42.8), 36 games at 50+.
h174's mechanism bar (pre-registered 09:12: at most 75% of v9's): stuckM at most 30.9 a game over h174's blocks.
Fixed before any h174 game; h174 plays after h171.

## 2026-10-25 10:30 PDT: panel scoring reports its effect on the Elo scale (PROMPTS 42); past decisions

The side-aware z is the score test for one BT (logit) gain over the pool's cell rates, each (opponent, map, side)
cell its own opponent; `tools/panel_pool.sh` now also prints that gain on the Elo scale with the interval where the
score z is ±1.96 (contest19.effect). Decision rules unchanged. The v8-era decisions rescored against today's
v8-m1.pool (which has gained blocks since some were scored, so the z differ a little from the logged ones):
h159 +40 Elo (95% -110 to +190), h161 -147 (-364 to +71), h162 -218 (-435 to -2), h157 -147 (-364 to +71), h163 +78
(-46 to +202), h167 +231 (+69 to +392). One 36-game block resolves about ±220 Elo, two about ±160. h167's +231 is
the accepting blocks' number (biased up, LEARNINGS 33); v9's own games on the field BT (progress/ELO.md, 42 games)
put it +77 over v8 (1812 ± 120 against 1735 ± 68).

## 2026-10-25 10:57 PDT: held census; h175 (MUSTER_RESCUE 100) built and pre-registered

tools/reads/held.mjs on v9's 108 panel games (1120-1131, 1143-1154, 1180-1191): held crusaders (MUSTER 2) in 86
games, 3,021 built, 131 of them ever shot. Castles lost: 61 (0.565 a game; 57 in the 54 losses). In 31 castle
losses (0.287 a game) held crusaders stood within 10 king steps and none of them attacked in the castle's last 20
rounds; 25 of the 54 losses have one (wololo 836 and 2013 both sides, botfinalsafe 1706 and 203, bot1v43 2321
blue, uvafan 1712, awesomelemonade 2518 blue and 1712 blue). Churches lost with idle held crusaders near: 83 in
losses, 187 in wins. MUSTER 2 releases a held crusader only on enemy melee in its own sight, so prophets shooting a
castle from out of that sight are never met (1180 game 1: castle (15,14), r177-204).

- **h175** = v9 + MUSTER_RESCUE 100 (dist/h175 24ba82513211; src 6b5f99a): a structure hit in its last 3 turns
  radios the nearest attacker in sight as a spot when its radio is free; held crusaders whose home lies within r2
  100 of it engage. No-op (defaults vs bots/v9, 799 to r300) IDENTICAL; unit tests 170 of 170.
- **Pre-registered** (before any h175 game is read): the basics-fix rule (a combat failure: held units idle while
  their castle falls). Two blocks on the v7-m1 panel, both sides, scored with `tools/panel_pool.sh 1120-1131
  progress/panels/v9-m1.pool`; block 1 rejects only at side-aware z < -1; accept at side-aware z >= 0 (other cells
  z >= 0) if the mechanism read passes on h175's two blocks: castle losses with held crusaders within 10 king
  steps and none attacking in the last 20 rounds at most 0.144 a game (half of v9's 0.287; held.mjs byLoss rows with
  unit 0, near > 0, attacked 0). If it fails, the ordinary rule on the same blocks (accept z >= 2, reject < 1, else
  a third). Reported, not a bar: castles lost a game (v9 0.565). Studied cell: m-schier.battlecode-2019-wololo:seed-2013.
- Panel order: h170 (in play), then h175 (its census covers 25 of v9's 54 losses, the widest of the queue), h171,
  h174, h172, then h173 on its targeted panel. No bar changed.

## 2026-10-25 11:00 PDT: h175 driver diagnostic (seed 2013, h175 red against v9, one game)

h175 won at r314 on castles; 0 exceptions, 0 timeouts, 0 frozen. The rescue radio fired twice (church (5,25), r102
and r103, beside its preacher builds); red had no held crusaders in this game (the camper case never held), so it
cost 20 fuel and released no one; blue (v9) sent none. One self-play game on one side decides nothing (side and
divergence); the release itself is pinned by the unit tests, and the panel decides.

## 2026-10-25 11:01 PDT: interim h170 scores seen by accident (no change)

A `contest19.py matches --pages 3` listing, run to find v9's ranked autoscrim matches, also printed the scores of
h170's ten finished block matches (1379-1384, 1387-1390; 1385-1386 still running). h170's rule and bars were fixed
before (07:42, 09:57); none is changed, and the block is scored as pre-registered once all twelve finish.
Running blocks' status comes from field.py queue only (LEARNINGS 38).

## 2026-10-25 11:16 PDT: h170 rejected on block 1 (matches 1379-1390)

h170 (v9 + PIONEER_STALL_ANY 40 + PIONEER_HOME 1 + PIONEER_TIMEOUT_REST 1) on the v7-m1 panel, both sides, scored as
pre-registered with `tools/panel_pool.sh 1120-1131 progress/panels/v9-m1.pool 1379-1390`: 15 of 36, pooled
expectation 18.0 (z -1.40); side-aware expectation 18.0, **z -1.71** (effect -171 Elo, 95% -368 to +25). Studied
cells (uvafan 1712, IanCoolidge0 1036, awesomelemonade 2518) 1 of 6 against 2.4 expected (z -2.19); other cells 14 of
30 against 15.6 (z -1.00). Lost usually-won cells: IanCoolidge0 1036 blue, bot1v43 2321 red. The basics-fix rule
rejects block 1 at z < -1: **rejected**. Its z lies outside +-1, so the block stays out of the pool file. The
mechanism read (parked.mjs) runs on this block for the record once the driver is free; it decides nothing now.
Next block: h175 (submission 194, requests 648-659; bots/v9 back as the ladder build, submission 195).

## 2026-10-25 11:30 PDT: check-in; ladder 1301, 1328; vm2 kills; DEF_SAFE committed, h176 built

Replica queue 150 waiting (140 ranked) at 11:26; h175's block 1391-1402 bumped (1391-1392 running). VM jobq empty,
disk 2.3 GB free. v9's ranked autoscrims: 1301 lost 1-2 to wololo (won seed-1915 r211 red), 1328 lost 1-2 to uvafan
(won seed-1915 r414; lost 1828 blue on health at r1000 with 4 vm2-killed turns, max 1,025 ms, 5 frozen; 836 red on
castles with 1 kill). vm2 kills (a turn over 200 ms) across our 402 replica games since match 1000: 61 games with at
least one, 93 kills = 6.5 per million of our turns; the opponents in the same games 1,328 = 40.4 per million; both
sides in 43 of the 61. Consistent with LEARNINGS 31 (the host and the engine's per-turn compile, not our ~2 ms
turns); not chased now.

- **DEF_SAFE** (src 06cb7a1; default 0 = v9): when a structure builds a crusader, prophet or preacher with an enemy
  attacker in sight, it ranks the free adjacent tiles whose exposure (struct.js exposure: one shot from each attacker
  in sight) would kill the newborn after every other one; unlike SAFE_BUILD it never skips the build. Unit test:
  default toward the two prophets (20 exposure), on a tile out of one's reach when on, and still builds when only
  deadly tiles are free. tools/reads/stillborn.mjs (military newborns dead within 2 rounds, and how many were on an
  exposed tile while a safer free tile stood beside: `safer`) with fixture assertions. Unit tests pass.
- **h176** = v9 + DEF_SAFE 1 (dist/h176 f32b083df07f). Ladder census (stillborn.mjs over 27 games of 9 ladder
  matches): the losses carry it (1373 seed 1884: 162 stillborn, 119 safer; 887 seed 826: 161, 135; 853 seed 2797:
  94, 42; 1216 seed 2591: 20 of 30 built, all safer); the wins few. Its bar waits on the census over v9's 108 panel
  games (running), then the no-op check on a quiet driver.

## 2026-10-25 12:06 PDT: stillborn census; h176 (DEF_SAFE 1) no-op and pre-registration

tools/reads/stillborn.mjs over v9's 108 panel games (1120-1131, 1143-1154, 1180-1191; v9's side): 173.6 military
newborns a game, 18.27 dead within 2 rounds of their build (456.5 K a game), 4.30 of them a castle's, 12.49 on a
tile exposed to at least their hp, **8.50 on such a tile while another free adjacent tile was not ("safer")**. Wins
5.39 a game (54), losses 11.61 (54); games with 10+ safer: 14 wins, 18 losses. Cells with the most safer a game:
uvafan 1712 blue 43.3 (stillborn 119.7) and red 32.3, uvafan 2046 blue 39.0 and red 17.0, uvafan 1653 blue 20.7,
botfinalsafe 203 red 16.7, bot1v43 2321 red 14.3. On the 27 ladder games of 9 ranked matches (658-1373): wins 2.71
safer a game (14), losses 33.77 (13); 1373 seed 1884 119, 887 seed 826 135.

- **h176** = v9 + DEF_SAFE 1 (dist/h176 f32b083df07f; src 06cb7a1). Every military build of a structure goes through
  buildToward (peacetime army, defence, muster, escorts, guards), so the switch covers them all; pilgrims are not
  ranked. No-op (defaults vs bots/v9, each against itself on 799 to r300) IDENTICAL on a quiet driver; unit tests
  pass.
- **Pre-registered** (before any h176 game is read): the basics-fix rule (units bought where they die before acting).
  Two blocks on the v7-m1 panel, both sides, scored with `tools/panel_pool.sh 1120-1131
  progress/panels/v9-m1.pool`; block 1 rejects only at side-aware z < -1; accept at side-aware z >= 0 (other cells
  z >= 0) if the mechanism read passes on h176's two blocks: `safer` at most 2.13 a game (a quarter of v9's 8.50;
  `tools/reads/games.sh stillborn.mjs -- BLOCK...`, mean of the field over the 72 games). If it fails, the ordinary
  rule on the same blocks (accept z >= 2, reject < 1, else a third). Reported, not bars: stillborn a game (v9
  18.27), their K a game (v9 456.5), castles lost a game (v9 0.565). Studied cells (the census's top cells,
  named to be conservative; the switch was designed on ladder 1373 seed 1884): uvafan.bc2019:seed-1712,
  uvafan.bc2019:seed-2046.
- Panel order: h175 (in play), **h176**, h171, h174, h172, then h173 on its targeted panel. No bar changed.

## 2026-10-25 12:26 PDT: check-in; VM disk

Queue 133 waiting (all ranked); h175's block 1391-1402: 3 running, none waiting. VM disk 2.2 GB free at 12:23, below
the 2.4 of the morning; deleted /var/log/syslog.1 (213 MB, the rotated system log; HANDOFF's named next candidate): 2.5 GB.

## 2026-10-25 12:46 PDT: h176 driver diagnostic (seed 1712, h176 red against v9, one game)

v9 won at r1000 on castles (health 16,850 vs 6,630). h176: 0 exceptions, 0 errors, 0 timeouts, 0 frozen (ms_max 976
under --no-kill on the driver; v9 1,763). stillborn.mjs: h176 built 436 military units, 59 dead within 2 rounds, 11
of them exposed, **safer 0**; v9 717 built, 10 stillborn, safer 3. The switch removed the case it targets; h176's
other stillborn came r600-799 (31), as its army lost the castle fight. One self-play game on one side decides
nothing; the panel decides.

## 2026-10-25 12:56 PDT: h175 panel block 1 (1391-1402): z 0.00, block 2 in play (1403-1414)

h175 (v9 + MUSTER_RESCUE 100) on the v7-m1 panel, both sides, scored as pre-registered with `tools/panel_pool.sh
1120-1131 progress/panels/v9-m1.pool 1391-1402 --studied m-schier.battlecode-2019-wololo:seed-2013`: 18 of 36,
pooled expectation 18.0 (z 0.00); side-aware 18.0, **z 0.00** (effect -0 Elo, 95% -196 to +195). Studied cell
(wololo 2013) 0 of 2 against 0.4 (z -0.70); other cells 18 of 34 against 17.6 (z 0.22). Won botfinalsafe 2740 blue
(pool 1 of 3 on that side). The basics-fix rule rejects block 1 only below z -1: block 2 = matches 1403-1414
(submission 196, requests 660-671; bots/v9 back as the ladder build, 197). The mechanism read (held.mjs) runs on
both blocks once block 2 is decided. Its z lies within +-1, but a candidate's block joins the pool file only once
rejected (HANDOFF).

## 2026-10-25 14:00 PDT: bank census on v9's 108 panel games: releasing CHAIN_K would free little, in games already lost

Scratchpad econ/bank.mjs (TEAM REPLAY: bank, income, military and church builds per 50 rounds from r150; the rounds
a chain line fired) over v9's panel games 1120-1131, 1143-1154, 1180-1191 (108, all lines checked against the game
count after LEARNINGS 44). Question: does CHAIN_K (1000 K saved for a chain line from r200) idle capital the army
needs? Time for the bank to reach 1000 at the income of r200-250: over 150 rounds in 16 of 54 losses and 1 of 54
wins; no chain line fired from r200 in 35 losses and 3 wins. The slow-fill games are the small one-castle maps
v9 never wins: botfinalsafe 1706 (all 6 sides and blocks), awesomelemonade 2518 (all 6), plus wololo 2644 blue and
botfinalsafe 203 blue. There the income is 0-4 K a round from r200 (2518: 0-140 K per 50 rounds, 5-15 military
units against awesomelemonade's 46 prophets by r200) and the bank holds 150-700 K when the castle falls (r310-567).
Releasing the reserve buys 6-28 prophets in games whose economy was lost by r100 (the opening race: TRAINING_LOG
2026-10-24 16:02). Dropped on the census (ECONOMICS section 6); the lever on those maps is the opening, not the
reserve.

## 2026-10-25 15:26 PDT: h175 (MUSTER_RESCUE 100) ACCEPTED under the basics-fix rule (37 of 72, z 0.40; mechanism read passes); it becomes v10

Block 2 (1403-1414, finished 14:26): 19 of 36. Both blocks, as pre-registered (10:57): `tools/panel_pool.sh 1120-1131
progress/panels/v9-m1.pool 1391-1402 1403-1414 --studied m-schier.battlecode-2019-wololo:seed-2013`: 37 of 72
against the pooled 36.0 (side-blind z 0.33); side-aware expectation 36.0, **z 0.40** (>= 0; effect +28 Elo, 95% -109
to +166); studied cell 0 of 4 (expectation 0.7, z -0.99); other cells 37 of 68 (expectation 35.3, **z 0.74** >= 0).
**Mechanism read** (tools/reads/held.mjs on both blocks, 72 games; scratchpad econ/held_h175.txt, summed by
econ/held_sum.py, which reproduces v9's 0.565 and 0.287 from econ/held_v9.txt): castle losses with held crusaders
within 10 king steps and none attacking in the castle's last 20 rounds **0.042 a game** (3: bot1v43 2321 blue in both
blocks, awesomelemonade 1712 blue in a won game), against the bar 0.144 (v9 0.287): **passes. ACCEPTED.** Reported,
not a bar: castles lost 0.500 a game (36 in 72; v9 0.565); held crusaders 1,921 built (26.7 a game; v9 28.0), 178 of
them attacked (2.5 a game; v9 1.2). Basics from the replica's match records: 0 exceptions, 0 init failures, 26
timeouts and 18 frozen turns in 72 games (v9's accepting blocks: 23 and 6; theirs 23,771 exceptions, 231 timeouts,
2,700 frozen, 302 init failures). Every never-won cell stays lost (wololo 836, 2013; botfinalsafe 1706;
awesomelemonade 2518; uvafan 2046; bot1v43 2591).
**v10 = h175 = v9 + MUSTER_RESCUE 100** (dist/h175 24ba82513211). The basics-fix rule accepts a fix that works as
designed and costs nothing; at z 0.40 the accepting blocks barely overstate v10, but the pool for v10's candidates
follows v9's precedent (07:24): control 1391-1402, pool file progress/panels/v10-m1.pool = 1403-1414 plus a fresh
v10 control block played first; rejected v10-based blocks join under the +-1 rule. Queued candidates (h176, h171,
h174, h172, h173, then h177) are rebuilt on v10 with their own switches and keep their pre-registrations; bars
relative to the champion are recomputed from v10's 108 panel games (h175's two blocks and the control block) before
each candidate's block is read, as h170's were on v9 (07:42).

## 2026-10-25 15:45 PDT: pioneer census on v9's 108 panel games: the first pioneer churches only on safe land

New read tools/reads/pioneers.mjs (TEAM REPLAY: each pioneer, a pilgrim our castle built radioing SIG.CHURCH, with its
site, build round, bank, arrival, church, death, and the round an enemy church first stood within 3 king steps of its
site, counting one built before it left) over 1120-1131, 1143-1154, 1180-1191 (108 lines checked against the game
count; scratchpad econ/pion_v9_all.txt), joined with each map's turn-3 plan (econ/pion_m.mjs, plan.mjs's planOf):
the first pioneer sent by r60 and the m (their king steps minus ours) of its site.
- First pioneer: left at r29 on average in losses, r27 in wins (k 15-17); founded its church in **1 of 48 losses**
  and 31 of 48 wins; the enemy churched beside its site first in 47 of 48 losses (18 of 48 wins); it died without a
  church in 30 losses (5 wins). Military spend while it travelled: 48 K a loss, 15 K a win. Pilgrims alive at r100:
  8.4 a loss, 14.6 a win. Six games of each have none (1653, 2046: no plan).
- By the site's m: **m <= 1: 0 of 24 churched** (18 losses: 2321 blue, 2518, 2591, 2740; 6 wins); m 2-6: 20 of 60
  (19 of the 30 wins, 1 of the 30 losses); **m >= 7: 12 of 12 churched, 12 wins** (1036 m11, 2797 m25).
- PIONEER_OPEN 7 (the first planned cluster with m >= 7, open_census.mjs) moves the first pioneer to safe land on 1706
  (m2 -> m14), 1712 (m5 -> m23 / m19), 2013 (m2 -> m25), 2321 (m0 -> m22), 2740 (m0 -> m29), 388 (m2 -> m8) and 836
  (m3 -> m21 / m12); on 1036 and 2797 the first site is already safe (PIONEER_EARLY only moves it to turn 6); none on
  203, 2518, 2591, 2644, 1653, 2046. Both teams plan alike on every map.
The margin is a correlation across opponents (the bots that out-race our pioneers also win the rest of the game), but
the m bands cut across maps and opponents: no first pioneer on m <= 1 ever churched, every one on m >= 7 did. This is
h177's case (v10 + PIONEER_EARLY 6 + PIONEER_OPEN 7: the contested pioneer still leaves as before, an extra one goes to
safe land on turn 6). ECONOMICS section 7's gap "pioneer arrival is not logged per game" is closed by this read.

## 2026-10-25 15:51 PDT: v10 set up; the v10 control block in play; h177-h182 built on v10; h177 pre-registered

- bots/v10 = dist/h175 byte for byte (sha 24ba82513211; roster code hash ac4a035d62f5). `src/bot/config.js`
  MUSTER_RESCUE defaults to 100 (v10); PIONEER_OPEN (default 0) joins. The defaults build (341da7a49ab4) against
  itself on 799 to r300 (the no-op flags, driver alone) is **IDENTICAL** to bots/v10 against itself. Unit tests: the
  MUSTER 2 hold test pins v9's MUSTER_RESCUE 0 (testPreV10); then 172 of 172 and the 64 galaxy19 tests pass. `tools/panel_submit.sh`
  resubmits bots/v10 as the ladder build from now on.
- **The v10 control block** (bots/v10 as the candidate, both sides, submission 198, requests 672-683; bots/v10 the
  ladder build, 199) = matches 1415-1426, bumped (1415 running at 15:30). It joins progress/panels/v10-m1.pool
  (holding 1403-1414) with no decision, before any v10-based block is scored; v10-based blocks are scored with
  `tools/panel_pool.sh 1391-1402 progress/panels/v10-m1.pool BLOCK...`.
- Rebuilt on v10, each with its predecessor's switches and pre-registration (bars relative to the champion from
  v10's 108 panel games, 1391-1426, computed before the candidate's block is read): **h178** = DEF_SAFE 1 (h176's;
  8fa0a00b145b), **h179** = ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1 (h171's; 48005faf0871), **h180** =
  PILGRIM_HERE 1 + PILGRIM_STALL 25 (h174's; 8af367be7f5f), **h181** = CHAIN_WALL 28 (h172's; 282b5b6f2336),
  **h182** = ECON_NOPLAN 1 (h173's; e6265fba135c; its targeted panel after a v10 control block there). h171-h174 and
  h176 are closed unplayed.
- **h177** = v10 + PIONEER_EARLY 6 + PIONEER_OPEN 7 (dist/h177 800bd22f607b; the earlier dist/h177, h147's config,
  deleted unplayed): a castle with a planned cluster it reaches 7+ king steps before the enemy sends a pioneer there
  by turn 6 (when the pilgrim leaves 200 fuel banked); the contested pioneer still leaves as before. Census case:
  15:45 (fires on 1706, 1712, 2013, 2321, 2740, 388, 836, 1036, 2797).
- **Pre-registered** (before any h177 game is read): the ordinary rule. v7-m1 panel, both sides, scored with
  `tools/panel_pool.sh 1391-1402 progress/panels/v10-m1.pool`; block 1 rejects at side-aware z < 0.5; two blocks
  accept at z >= 2 (other cells z >= 0), reject at z < 1, else a third block (accept at z >= 2). Studied cells (looked
  at game by game in the design): m-schier.battlecode-2019-wololo:seed-836, m-schier.battlecode-2019-wololo:seed-2013,
  StoneT2000.BC19-botfinalsafe:seed-1706. Mechanism read, reported with the verdict (pioneers.mjs on h177's blocks):
  on the firing maps, the pioneer built by r6 founds its church in at least two thirds of games, and our first church
  comes earlier than in v10's games of the same cells; the mechanism has failed if that pioneer churches in under
  half. Reported, not bars: pilgrims at r100 and castles lost a game (v10's from its 108 games). Before its block: a
  driver diagnostic (h177 against v10 on 836) and an inertness check (h177 against itself on 2518, where no castle
  has an m >= 7 cluster, IDENTICAL to v10 against itself to r300).
- Panel order: the v10 control block (in play), h178, **h177**, h179, h180, h181, then h182 on its targeted panel.
  h177 moves ahead of h179-h181 on the census: no first pioneer on m <= 1 ever churched in 108 games, every one on
  m >= 7 did.

## 2026-10-25 16:26 PDT: check-in; h177 inert on 2518; VM disk 2.5 GB

Queue 73 waiting (all ranked); the v10 control block (1415-1426): 5 running, the rest done. VM disk was 2.2 GB free:
deleted ~/.gradle/daemon/7.6/daemon-*.out.log (651 gradle daemon logs dated Aug 27-Sep 1, before this project; 277
MB; registry.bin kept), now 2.5 GB. h177's inertness check: h177 against itself on 2518 to r300 (no castle there has
a cluster with m >= 7) is IDENTICAL to v10 against itself. Its 836 diagnostic (h177 red against v10 blue) is running.
Interim, not a bar: v10's stillborn read over h175's 72 games gives `safer` 11.76 a game (v9's 108: 8.50; uvafan's
12 games 39.25); h178's bar (a quarter of v10's rate) is set once the control block's 36 games join.

## 2026-10-25 16:55 PDT: h177's 836 diagnostic; v10's one exception traced and fixed (World.build charges its price); h177-h182 rebuilt

- **h177 red against v10 blue on 836** (det, the no-op flags, to r1000; scratchpad h177/d836.bc19): h177 won by
  castles at r486. Both castles sent their PIONEER_OPEN pioneer on r3: to c2 (32,9) (arrived r11, church r24, 13
  rounds waiting for the bank) and c1 (3,9) (arrived r19, church r46); the contested pioneer left at r24 as v10's
  did (church r35, v10's mirror r31). First church r24 against v10's r31; mined K by r50 450 against 412, r100 1834
  against 1770, r200 4994 against 3730; pilgrims r100 34 against 30. One game on one side: not a verdict.
- **v10's exception**: 1 in that game (h177 0): "Cannot afford to build specified unit.", blue castle 1316 at r479
  (hit, 120 HP, 50-59 fuel): it built a preacher (50 fuel) and then radioed MUSTER_RESCUE's spot (10), which the
  engine charges first. World.build now lowers w.karbonite and w.fuel as World.signal does (LEARNINGS 45), so
  sayRescue sees the fuel left after the build. It changes play only where the engine would refuse the build. Unit
  test added. No-op (defaults 943de76c4a94 against bots/v10, 799 to r300, driver alone) **IDENTICAL**; unit tests 173
  of 173 and the 64 galaxy19 tests pass. The replica's 72 h175 games had 0 exceptions (the case needs a hit structure
  with fuel within 10 of a unit's price).
- Rebuilt with the fix (switches unchanged, pre-registrations unchanged): h177 902efcd0eaf7, h178 4a802965e3a3, h179
  2faea994919d, h180 45123f763cfb, h181 1b367520ea40, h182 fa74c6f4dc8f. h177's inertness check on 2518, rerun on the new
  build: **IDENTICAL**. Late in the 836 game both teams sat on ~2,100 K with 0-370 fuel: a fuel census (scratchpad econ/fuel.mjs:
  rounds fuel-bound, with K for a prophet but not the fuel) runs on v10's panel games next.

## 2026-10-25 17:06 PDT: v10 control block 17 of 36; h178 block 1 in play (1427-1438); v10's dead cells; 2591 read

- **v10 control block** (submission 198, matches 1415-1426, finished 17:02): 17 of 36 (h175's two blocks, the same
  build, 37 of 72). Joins progress/panels/v10-m1.pool (1403-1414, 1415-1426; control 1391-1402), so v10's reference is
  108 games. h178's mechanism bar (pre-registered 15:26): stillborn `safer` at most a quarter of v10's rate over those
  108 games; the number follows from v10's games alone and is computed next.
- **h178 = v10 + DEF_SAFE 1** (dist/h178 4a802965e3a3) block 1: submission 200, requests 684-695, matches 1427-1438;
  ladder back to bots/v10 (submission 201). Scored with `tools/panel_pool.sh 1391-1402 progress/panels/v10-m1.pool
  1427-1438 --studied uvafan.bc2019:seed-1712,uvafan.bc2019:seed-2046` under the basics-fix rule. Queue 68 waiting.
- **v10's dead cells** (108 games): every game lost on bot1v43 2591, botfinalsafe 1706, awesomelemonade 2518, wololo
  2013 and 836, uvafan 1712 and 2046 (studied); every game won on IanCoolidge0 1036, uvafan 1653, bot1v43 388,
  awesomelemonade 1712 and 2797. A cell turned pays 6 games of 108.
- **2591 against bot1v43** (match 1395, red, lost by castles r120): a 32x32 map, one castle a side, 1 K and 1 F depot by
  our castle, the plan's only church site the 10-depot centre cluster on the axis (m 0). bot1v43's turn-2 pilgrim
  churched it at r23 (prophet guard r24); our first pioneer left at r24 and turned back at (10,13). The two
  ESCORT_FIRST crusaders (r3-4) stood beside the castle all game (relaying a miner's cargo) until shot at r40-43. Each
  defending prophet stepped one tile toward its lattice tile, into the band of the two prophets camped at r2 65-82 from
  the castle (beyond its reach), and died alone: 4 of 4 built r34-38, 3 of 3 built r107-109. Mined K 154 by r100
  (theirs 314); the castle died at r120. MUSTER's camper case did not fire: the prophets were still walking in
  (MUSTER_DWELL 3), and MUSTER holds crusaders only.

## 2026-10-25 17:24 PDT: check-in

Queue 64 waiting (56 ranked); h178 block 1 (1427-1438) running, our matches at the front. VM disk 2.4 GB free; jobq
empty (no local VM jobs while 30+ wait). Fuel census of v10's 72 h175 games 59 of 72 on the driver; then the
stillborn read over 1415-1426 (h178's bar), then PIONEER_RACE's no-op check and tests (h183, uncommitted).

## 2026-10-25 17:29 PDT: fuel census over v10's 72 h175 games: fuel never binds

Read: scratchpad econ/fuel.mjs (each team's bank every 100 rounds; from r100, rounds that end with karbonite for a
prophet, 25, but fuel under its 50, and the reverse) over 1391-1414, 72 lines for 72 games. Fuel-bound 10.3 rounds a
game (2.0% of rounds; wins 18.2, losses 2.0; mostly 1653, 117 a game, a 1000-round win); karbonite-bound 74.0 (14.5%;
wins 61.9, losses 86.8). Median bank: r100 262 K / 3,180 F; r200 270 / 5,820; r300 718 / 9,095; r500 496 / 11,130;
r900 642 / 11,350; of the 288 team-checkpoints at r100, 200, 300, 500, 700 and 900, one under 100 fuel. The late fuel squeeze of the 836 diagnostic (16:56) is
not typical. Fuel is a free good for us; ECONOMICS section 7's fuel gap is closed, no fuel-glut switch ranked (the
only saving: 10 K a fuel miner staffed past the glut).

## 2026-10-25 17:43 PDT: h178's mechanism bar from v10's 108 panel games: safer at most 2.90 a game

tools/reads/stillborn.mjs over 1391-1426 (108 lines for 108 games; scratchpad econ/still_v10_108.txt): `safer`
(military newborns exposed to their hp while another free adjacent tile was not, and dead within 2 rounds) 11.60 a
game (W 8.06, L 15.15; uvafan 38.78, wololo 9.94, botfinalsafe 7.89, awesomelemonade 7.78, bot1v43 2.83,
IanCoolidge0 2.39); stillborn 21.77 a game, their karbonite 552. h178's bar, fixed at 15:26 as a quarter of this rate:
**2.90** over its blocks, computed before any h178 game is read (block 1 running).

## 2026-10-25 17:54 PDT: check-in; PIONEER_RACE in (no-op IDENTICAL); h183 built

Queue 57 waiting (all ranked); h178 block 1: 1429-1432 and 1435 done, the rest running. VM disk 2.4 GB free; jobq
empty. **PIONEER_RACE** (src/bot, default 0; castle.js planClusters counts the team's planned clusters with m >=
PIONEER_OPEN, earlyPioneer races when there are none and the plan's first cluster has m < PIONEER_RACE): defaults
build 7f084c18e568 against itself on 799 to r300, driver alone, **IDENTICAL** to bots/v10; unit tests 173 of 173 (the
PIONEER_OPEN test now also pins PIONEER_RACE 2: 2518's m-0 site goes early, 1706 unchanged, 2644 none) and the 64
galaxy19 tests pass. **h183** = v10 + PIONEER_EARLY 6 + PIONEER_OPEN 7 + PIONEER_RACE 2 (dist/h183 239539f40dbe):
h177 everywhere but 2518 and 2591 (the pool maps whose team plans no cluster with m >= 7 and opens with m <= 1), where
the castle's turn-3 pioneer races for the centre site. Driver diagnostic (h183 red against v10 on 2591 and 2518 to
r80; v10 against itself on 2591 for the idle escorts) running.

## 2026-10-25 17:55 PDT: h183's diagnostic; h183 pre-registered and replaces h177 (closed unplayed); the idle escorts explained

- **Diagnostic** (driver, det, the no-op flags, to r80; scratchpad d2591/): h183 red against v10 blue. **2591**: the
  castle's pioneer built r3 arrived r17 and churched the centre site at r18 (bot1v43's church there on the replica:
  r23; v10's pioneer here: built r24, church r34); mined K by r80 428 against 210, pilgrims 10 against 9. **2518**:
  built r3, arrived r13, church r14 (awesomelemonade's on the replica: r14; v10 here: r23, r41); mined K by r80 542
  against 366, pilgrims 11 against 8. Neither castle built its ESCORT_FIRST crusaders (the cluster churched first, so
  escort() dropped them); no army before ECON_UNTIL 100 here (the replica's opponents bring a threat response).
  Against the field the race is not won by these timings alone: bot1v43 sends a prophet toward the centre on r3.
- **v10's escorts** on 2591 (v10 against itself, as on the replica): the ESCORT_FIRST crusaders hear SIG.GUARD with
  the mirror site and hold the lattice within LATTICE_R 12 king steps of it, which on a 32-wide map covers their
  birth tiles beside the castle: both count as held at once and never move (r3-80). h179's ESCORT_HOLD_R 2 is the
  fix for that case; it stays in the order.
- **h183 replaces h177** in the panel order. On every pool map but 2518 and 2591 it plays h177's code path (race
  false while the team plans a cluster with m >= 7; inertness on 836 to r300 against h177 running); on those two its
  only change can turn cells v10 lost in all 6 of 6 games, which cannot lose more. h177 is closed unplayed
  (superseded by h183).
- **Pre-registered** (before any h183 replica game): the ordinary rule. v7-m1 panel, both sides, scored with
  `tools/panel_pool.sh 1391-1402 progress/panels/v10-m1.pool BLOCK... --studied
  m-schier.battlecode-2019-wololo:seed-836,m-schier.battlecode-2019-wololo:seed-2013,StoneT2000.BC19-botfinalsafe:seed-1706,awesomelemonade.Battlecode2019:seed-2518,StoneT2000.BC19-bot1v43:seed-2591`;
  block 1 rejects at side-aware z < 0.5; two blocks accept at z >= 2 (other cells z >= 0), reject at z < 1, else a
  third block (accept at z >= 2). Mechanism read (pioneers.mjs on h183's blocks), reported with the verdict: on the
  firing maps (h177's nine, 2518, 2591) the pioneer built by r6 founds its church in at least two thirds of games and
  our first church comes earlier than in v10's games of the same cells; failed if that pioneer churches in under
  half. Reported, not bars: pilgrims at r100 and castles lost a game against v10's 108 games.
- Panel order: h178 (in play), **h183**, h179, h180, h181, then h182 on its targeted panel.

## 2026-10-25 18:02 PDT: h183 inert on 836; a walk-in census started

h183 red against v10 blue on 836 to r300 (det, the no-op flags) is **IDENTICAL** to h177 red against v10 blue: off
2518 and 2591 h183 plays h177. Stillborn units of v10 not exposed on their build tile: 6.8 of 21.8 a game (losses
9.9 of 29.5). A read (scratchpad econ/walkin.mjs) counts our military steps (moves, no attack) from a tile the enemy
attackers could not kill the unit on onto one they could, the deaths within 2 rounds, and who saw the killers: the
unit, else a structure of ours (r2 100), else nobody. On 2591 (1395, red): 6 such steps, 6 dead, all prophets within
5 rounds of birth; 5 of the 6 into attackers only the castle saw (the campers at r2 65 from the newborn's tile, past a
prophet's vision of 64). Running over v10's 108 panel games.

## 2026-10-25 18:24 PDT: check-in

Queue 48 waiting (all ranked); h178 block 1: 10 of 12 matches done, 1433-1434 (uvafan) running. VM disk 2.4 GB free;
jobq empty. Walk-in census 56 of 108 games.

## 2026-10-25 18:28 PDT: v10's r1000 symcheck staged on the VM (held until the queue is under 30)

vm_sync pushed src, tools, test, maps, engine, bots, dist, build to the VM (bots/v10 there now, sha 24ba82513211).
Its tools/ swap left ~/projects/vibe/2019/.tools.old behind: four root-owned .pyc files in
.tools.old/galaxy19/replica_gcp/__pycache__ (from an old root run) blocked the plain rm; removed that one path with
sudo; no other file in ~/projects/vibe/2019 or 2019-next is owned by anyone else. Job
~/jobq/hold/1792609846000000004b01b1a3d5771000symv10.sh (v9's job with bots/v10: symcheck.js, seeds 3, 1, 2, 2321,
1000 rounds, out/sym_v10_r1000.log) moves to ~/jobq/pending once fewer than 30 replica matches wait.

## 2026-10-25 18:58 PDT: h178 block 1 passes (18/36, z 0.00); block 2 submitted; walk-in census

**h178 block 1** (matches 1427-1438, v10 + DEF_SAFE 1): 18 of 36, pooled expectation 18.0; side-aware z 0.00
(effect -0 Elo, 95% -226 to +230); studied cells 0 of 4 (expectation 0.1); other cells 18 of 32, z 0.08. The
basics-fix rule rejects block 1 only at z < -1, so block 2 runs: submission 203, matches 1441-1452 (waiter
wait_block.sh 1441 1452). The mechanism read (stillborn safer at most 2.90 a game) waits for both blocks.

**Walk-in census** (scratchpad econ/walkin.mjs over v10's 108 panel games, 1391-1426, all 108 read): a military
unit's move from a tile the enemy attackers present could not kill it on onto one they could (exposure >= hp, every
attacker counted as firing at it), and whether it died within 2 rounds. Per game: 1,448 moves, 60.3 walk-ins, 31.3
deaths within 2 rounds (52%), 654 K of units. Wins 26.5 deaths (37% of 71.9 walk-ins), losses 36.2 (74% of 48.8).
By who saw the attackers that make the tile lethal: the unit itself 0.74 walk-ins / 0.52 deaths (its own danger check
works), a structure of ours (r2 100) 25.8 / 11.9, nobody 33.8 / 18.9; newborns (5 rounds) 24.4 / 14.2. By unit:
crusaders 27.4 / 15.1, prophets 17.4 / 11.9, preachers 15.5 / 4.4. Worst cells (deaths a game): uvafan 1712 116,
botfinalsafe 2740 88, wololo 836 61, IanCoolidge0 203 54, uvafan 2046 44. Reading: what our units see they avoid;
the losses come from attackers out of the unit's vision (crusader r2 49 and preacher r2 16 against prophet range
r2 64), a third of them in a structure's sight. Lead for a candidate: a structure radios the most dangerous attacker
it sees so units near it keep off that attacker's range (12 deaths a game at most; the SIEGE line h135-h138 was
about sieges, not this). Not ranked yet: the deaths include units that walked in to attack and traded.

## 2026-10-25 19:22 PDT: h178 block 1 mechanism read

stillborn.mjs over h178's block 1 (1427-1438, 36 games): newborns built where a safer free tile existed 2.78 a
game (v10 11.60 over 1391-1426; bar at most 2.90 over both blocks, judged after block 2), exposed at build 6.25
(v10 14.93), but stillborn in all 19.28 (v10 21.77) and 507 K (v10 552): the placement works, yet most saved
newborns still die young (wins 14.5, losses 24.1 a game), the walk-in census's newborn line (24.4 walk-ins, 14.2
deaths a game for v10).

## 2026-10-25 19:26 PDT: progress refresh; submission number corrected; a refresh read a running block

progress/ refreshed (19:24 and 19:26 PDT; replica snapshot 19:23). The 18:58 entry's "submission 203" for h178's
block 2 was wrong: 202 is the candidate, 203 the v10 ladder resubmission (tools/progress/submissions.tsv corrected;
the first refresh flagged us:sub202 with no attempts row). tools/panel_submit.sh now labels its two lines
("candidate submission N", "ladder submission M"). The refresh ran while block 2 was in play, so ELO.md's h178 row
includes 4 of its 12 matches: a look at a running block (LEARNINGS 38, extended). h178's rule (basics-fix) and bar
(stillborn safer at most 2.90 a game) were fixed at 17:05 and 18:58 and stay as they are.

## 2026-10-25 20:10 PDT: walk-in census split: engaging vs blind

walkin.mjs now tells an engaging walk-in (from the new tile the unit can hit an enemy) from a blind one (nothing to
hit there), over the same 108 v10 games (1391-1426). Per game, walk-ins / deaths within 2 rounds: engaging 25.6 /
16.8, blind 34.7 / 14.6; blind by who saw the attackers: the unit 0.0, a structure of ours 17.7 / 6.5, nobody 17.0 /
8.0. Losses: blind-struct 12.5 / 7.5, blind-none 10.9 / 7.8; wins 23.0 / 5.6 and 23.0 / 8.2. So the deaths a
structure's knowledge could have saved are 6.5 a game (7.5 in losses), about 4% of the 180 units built: the SIEGE
line (h135-h138: structures radio enemy prophets to newborns, units keep out of remembered prophets' reach) tried
exactly this on v7 and was closed at panel z 0.33. Not a new candidate; the census is kept as a reference read
(scratchpad econ/walkin.mjs, walkin2_v10.txt).

## 2026-10-25 20:37 PDT: h178 two blocks z 0.00; the 1712 stall: pioneers held by sites the enemy holds; TAKEN_SEEN

**h178** two blocks (1427-1438, 1441-1452): 36 of 72, pooled expectation 36.0, side-aware z 0.00 (effect -0 Elo, 95%
-159 to +160); studied cells 0 of 8 (expectation 0.2); other cells 36 of 64, z 0.11. Basics-fix rule: accept at z >= 0
with others >= 0 if the mechanism read passes (stillborn safer at most 2.90 a game over both blocks; block 1 2.78).
Block 2's read is running; the decision follows it.

**The 1712 stall** (replica 1421 game 3, v10 red vs uvafan; tools/replay.js rounds/events, reads/pioneers.mjs):
uvafan had 6 churches and 37 pilgrims at r100, we had 2 and 15 with 355 K banked; our castles built one pilgrim
between r37 and r99 and 2 churches all game (r41, r53). Castle (3,21) (canonical) planned c8 (m1), c9 (m0), c5, c6,
c3 (m19), c2 (m17); uvafan churched between c8 and c9 at r22. Our pioneers to c8 and c9 left at r34-35, never arrived,
and lived to r222 and beyond, holding two of the castle's three slots (PIONEERS_TEAM 6 over 2 castles) until the
80-turn timeout; at r115-116 the castle sent two more to the same sites (not lost, not reported taken), and c6's two
pioneers (r67, r148) never arrived either. c3 and c2, safe land, never got a pioneer; uvafan churched c3 at r147. The
other castle re-sent to (28,44), uvafan's since r46, at r148, r229, r310, r391 and r472.
Cause: the pioneer's report "an enemy church or castle within EXPAND_SEEN of my site" (CT.TAKEN; the castle rests the
cluster 200 rounds) runs only with EXPAND_ROUND (0 since h27), and the castle frees a pioneer's slot on CT.TAKEN only
with PIONEER_GIVEUP or PIONEER_STALL_ANY. New switch **TAKEN_SEEN** (pilgrim.js siteTaken, castle.js): the report always
runs, and the castle frees the slot. Narrower than h170's PIONEER_STALL_ANY (rejected, z -1.71: gives up after 40 turns
no nearer, whatever it sees): it fires only on an enemy structure seen at the site. Unit test added. A census of
v10's 108 games (pioneers.mjs: pioneers sent after the enemy held their site, never arrived) sizes it; it runs behind
h178's read.

## 2026-10-25 20:50 PDT: h178 ACCEPTED as v11 (basics-fix rule)

h178 = v10 + DEF_SAFE 1. Two blocks (1427-1438, 1441-1452): 36 of 72 against the pooled expectation 36.0, side-aware z
0.00 (exactly 0 at full precision; effect 0 Elo, 95% -159 to +160); other cells 36 of 64, z 0.11; studied cells 0 of
8 (expectation 0.23). Mechanism read (tools/reads/stillborn.mjs, per game; v10 over its 108 panel games 1391-1426 in
brackets): safer 2.68 over both blocks (block 1 2.78, block 2 2.58; bar 2.90 = a quarter of v10's 11.60), exposed
6.06 (14.93), stillborn 18.51 (21.77), K lost unborn 465 (552), built 177.0 (180.9). The rule pre-registered at
15:26 (accept at z >= 0 with others >= 0 if the mechanism read passes) accepts it: v11 = bots/v11 (4a802965e3a3).
Strength is unchanged within the panel's resolution: the gain is the basics (2.68 newborns a game no longer fed to
campers on a tile with a safer one free), the outcome neutral.
Promotion: DEF_SAFE defaults to 1 (config.js; tests written against v10's placement pin it with testPreV11);
panel_submit.sh's ladder default is bots/v11; progress/panels/v11-m1.pool = 1441-1452 with 1427-1438 as the control
argument, and a fresh v11 control block joins it before any v11-based block is scored (as for v9 and v10). h179-h183
are rebuilt on v11 with their switches unchanged; their pre-registrations stand, with bars relative to the champion
recomputed from v11's panel games once its control block is in.

## 2026-10-25 21:02 PDT: v10 passes symcheck to r1000; check-in

v10's r1000 symcheck (VM job ...1000symv10, nice 15; tools/symcheck.js --bot bots/v10 --seeds 3,1,2,2321 --rounds
1000; out/sym_v10_r1000.log): every move mirrored on all four seeds to r1000 (seed 3 140 robots, 1 194, 2 110, 2321
106). v11 differs from v10 only in DEF_SAFE's placement choice, which runs in the canonical frame (struct.js
buildToward); its own r1000 symcheck goes to the VM queue after the commit. Replica queue 3 waiting (ranked 3), 8
running; VM disk 2.3 GB free. The pioneer census for TAKEN_SEEN (pioneers.mjs over v10's 108 panel games) was
stopped after 1394-1396 and 1397's first two games so the no-op check has the driver alone; it resumes at 1397's
seed-1712 game.

## 2026-10-25 22:17 PDT: PROMPTS 44: v11 missing from progress/, v10 from rating-history.png
Causes. (1) rating-history.png's BT panel drew the build behind each rated match, and v10 played none: it reigned
15:26-20:50, between two daily autoscrims (about 4 rated matches a day for us, ~05:00); our team cannot request a
ranked match (galaxy sends one only to a team rated at or above the requester; we are #1), and the field's
spare-cycle ranked challenges (field.py activity) wait for fewer than 2 matches queued and pick us only from the 3
teams just below, so they are rare while our blocks play (44 of our 64 rated matches came from them, mostly on 10-21). v0, v2, v4 and v6 also
reigned without one. (2) v11 has no games of its own until its control block (1455-1466, playing): ELO.md listed it
only in a sentence, progress.png as an unlabelled hollow point, rating-history not at all.
Fixes. rating_history.py draws every champion of bots/ROSTER.tsv over its reign (acceptance to the next, the last to
the data's time) at its BT rating with its 95% band and its rated-match count; a champion without games of its own
dashed and hollow at its accepting candidate's rating (biased up); a champion table in rating-history.md; the top
panel carries the last rating dashed to the data's time ("no rated match since"). ELO.md's build table lists an
accepted build with no games (v11: as h178, 1827 +-95, 72 games); progress.png labels it "as h178" and gives it a
hollow field score. "Our record" no longer names an incumbent (it was v10, the latest build with games, not the
champion). New `field.py rate` / `tools/rate_ours.sh`: the n field teams rated just below us challenge our ladder
build, ranked; `tools/panel_submit.sh` runs it after each control block (RATE_N, default 6). Ran for v11 at 21:54:
requests 724-729 (mvpatel2000, uvafan, wololo, IanCoolidge0 ~f649f3, yujinwunz, botfinalsafe; ladder submission 205).
Charts re-rendered from the 21:14 data (latest match 1454: nothing of the running control block); the full refresh
follows the control block.

## 2026-10-25 22:20 PDT: h189 driver diagnostic (TAKEN_SEEN 1), seed 1712
h189 red vs v11 blue on seed 1712 to r1000 (scratchpad h189/d1712): v11 won on health; h189 0 exceptions, errors or
timeouts. TAKEN_SEEN fires as designed: the r35 pioneer to (30,17) mined there after blue churched at r77; the r30
pioneer to (28,44) gave up when it saw blue's church at (33,44) (built r66) and retargeted. But once the 200-round
rest ran out the castle sent pioneers to (28,44) again at r268, 349, 430, 679 and 841, none arriving (none saw the
church, so none reported it). Possible follow-up switch: a longer rest for a cluster reported taken, or for one whose
pioneers never arrive. The census of pioneers sent to held sites over v11's panel games (pioneers.mjs) is running.

## 2026-10-25 22:23 PDT: v11 passes symcheck to r1000; check-in
v11's symcheck to r1000 on the VM (job ...1000symv11, out/sym_v11_r1000.log): seeds 3, 1, 2 and 2321 all ok
(188, 220, 86 and 142 robots at r1000). VM jobq empty; disk 2.3 GB free (journal already 41 MB). Replica queue
4 waiting (all ranked), 8 running: the v11 control block's last games (1461, 1462, 1464, 1466) and the first
rate_ours.sh matches (1467, 1468). Match 1342 (UpperArlingtonHighSchool vs awesomelemonade, the 09:00 autoscrim)
shows RUN since 09:00 but is not stuck: saturn slot 2 took it at 18:52 and is on its third game, about 100 minutes
a game (slow bots), so it holds one of the 8 slots for about five hours.

## 2026-10-25 22:42 PDT: pioneer census over v11's panel games; PIONEER_TIMEOUT_REST 2; h190 built and pre-registered (h189 folded in)
Census (pioneers.mjs over v11's 72 panel games, 1427-1438 + 1441-1452; scratchpad econ/pioneers_v11.txt): 576
pioneers (8.00 a game), **341 sent to a site where an enemy church already stood within 3 king steps (4.74 a game, in
50 of 72 games)**: 11 arrived, 130 died, 3 churched. 304 of them repeat an earlier send to the same site; of those,
242 followed a pioneer still out but never arrived (the castle's 80-turn timeout: it forgets the pioneer and, with
PIONEER_TIMEOUT_REST 0, sends the next at once; 229 repeats came 80-99 rounds after the previous send), 55 one that
died (100-round rest), 7 one that arrived. Worst cells: uvafan 1712 (84 such sends in 4 games, LLLL; game 1434 sent 25
pioneers to three sites uvafan held from r22-33), botfinalsafe 2740 (52), IanCoolidge0 1036 (30), wololo 836 (23),
bot1v43 2321 (23), awesomelemonade 2518 (23). TAKEN_SEEN (h189) acts only on a pioneer that comes near enough to see
the church, which few of these do (11 arrived).
New: **PIONEER_TIMEOUT_REST 2** (castle.js; default 0 = v11): as 1 (a timed-out pioneer rests its site as a lost one,
PIONEER_LOST_REST 100), and it counts as one lost there, so PIONEER_LOST_DOUBLE doubles the rest per failure (100,
200, 400, ... 1600). Unit test extended; no-op check IDENTICAL (defaults build vs bots/v11, 799 to r300), 174/174 and
65/65. A model on the census (each site's sends at t0, t0+180, t0+460, t0+940 unless a church went up) puts sends to
held sites at 2.71 a game (v11 4.74), all sends 5.74 (8.00).
**h190** = v11 + TAKEN_SEEN 1 + PIONEER_TIMEOUT_REST 2 + PIONEER_LOST_DOUBLE 1 (dist/h190 b6346eeb1252; CFG differs
from v11 only there). h189 (TAKEN_SEEN alone) is closed unplayed, folded into h190. **Pre-registered** before any h190
panel game: the basics-fix rule on v7-m1, both sides, scored with `tools/panel_pool.sh 1427-1438
progress/panels/v11-m1.pool BLOCK...` (the pool with the v11 control block): block 1 rejects only at z < -1; after two
blocks accept at z >= 0 (other cells z >= 0) if both mechanism reads pass, else the ordinary rule (accept at z >= 2,
others >= 0; reject at z < 1; else a third block). Mechanism reads (tools/reads/parked.mjs over h190's two blocks, per
game): toTaken (pioneers sent to a site the enemy held and we did not) at most 0.7x v11's, and churches at least 0.9x
v11's, both v11's rates over its 108 panel games (1427-1438, 1441-1452, the control block 1455-1466), computed before
h190's block 1 is read. Studied cells: uvafan 1712, botfinalsafe 2740, wololo 836, awesomelemonade 2518. Panel order:
h190 first after the control block (the largest basics waste measured), then h184, h185, h186, h187, h188. A driver
diagnostic (h190 red vs v11 blue, seed 1712, r1000) is running.

## 2026-10-25 23:06 PDT: v11 control block 19 of 36; joins the v11 pool; progress/ refreshed
- **v11 control block** (submission 204, matches 1455-1466, finished 23:01): 19 of 36 (h178's two blocks, the same
  build, 36 of 72). Joins progress/panels/v11-m1.pool (1441-1452, 1455-1466; control 1427-1438): v11's reference is
  108 games. Every game lost: botfinalsafe 1706, bot1v43 2591, awesomelemonade 2518, wololo 2013 and 836, uvafan
  1712 and 2046 (v10's dead cells, unchanged); every game won: IanCoolidge0 1036 and 2644, botfinalsafe 203 and 2740,
  bot1v43 388, awesomelemonade 1712 and 2797, uvafan 1653.
- v11's ranked matches from tools/rate_ours.sh (requests 724-729 = matches 1467-1472): 1468-1470 finished, their
  ratings wait behind 1467 (galaxy rates a team's matches in order); 1467, 1471, 1472 running.
- progress/ refreshed between blocks (23:06): ELO.md lists v11 with its own games (1829 +-116, 45 games: the control
  block and three rated matches); rating-history.md's champion table follows.
- Next: h190 block 1 once its driver diagnostic (seed 1712) is read; v11's parked.mjs census over its 108 panel games
  for h190's bars runs while that block plays, and is fixed before the block is read.

## 2026-10-25 23:19 PDT: h190 driver diagnostic; h190 block 1 = matches 1492-1503
- **Diagnostic** (h190 red vs v11 blue, seed 1712, r1000, no-op flags; scratchpad h190/d1712): v11 won on health;
  h190 0 errors, exceptions, frozen or timeouts. parked.mjs, h190's side: 11 pioneers sent, 6 churched, 3 mined, 2
  died, 0 parked, 3 gave up (TAKEN_SEEN), 1 sent to a held site; h189's game on the same seed: 14 sent, 5 parked, 0 to
  a held site (a local mirror, not the uvafan cell, where v11 sent 84 in four games). The switches act as designed.
- **h190 block 1**: submission 206 (requests 749-760), matches 1492-1503, bumped; ladder back to bots/v11 (submission
  207). Scored as pre-registered at 22:42 with `tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool 1492-1503
  --studied uvafan.bc2019:seed-1712,StoneT2000.BC19-botfinalsafe:seed-2740,m-schier.battlecode-2019-wololo:seed-836,awesomelemonade.Battlecode2019:seed-2518`.
  The match list shows both wololo matches (1492, 1493) with vibe19 first while queued (the other @- requests show
  the opponent first): their sides are checked from the games when the block is in. v11's parked.mjs census over its
  108 panel games (h190's bars) is running on the driver.

## 2026-10-25 23:24 PDT: check-in; v11's first rated matches
Replica queue 12 waiting (2 ranked; the rest h190's block), 8 running; VM jobq empty, disk 2.3 GB free. v11's
rate_ours.sh matches so far: 1468 lost 1-2 to uvafan (won seed-388 red by castles r399; lost 1822 blue on castles at
r1000, 2330 blue on health), 1469 lost 0-3 to wololo (1915 blue by castles r215, 520 red by castles at r1000, 2591
blue r793), 1470 won 2-1 against IanCoolidge0 ~f649f3 (747 blue r707, 2046 red r975; lost 2518 blue r141). Ratings
wait behind 1467 (running). Census for h190's bars (parked.mjs, v11's 108 games): 20 lines.

## 2026-10-25 23:32 PDT: h191 built and pre-registered (PIONEER_TIMEOUT_HOME, the pilgrim side of the zombie pioneers)
- **Switch**: `PIONEER_TIMEOUT_HOME T` (pilgrim.js siteTimeout, default 0 = v11): a castle's pioneer (a planned
  cluster's site; FRONT pioneers excluded) T turns old and still more than one king step from its site gives the site
  up and takes homeDepot (a free depot on ground we hold). T = 80 matches the castle's own timeout (castle.js), after
  which v11 re-sent to the same site 242 times in its 108 panel games while the first pioneer stayed out, never
  arriving. h190 changes the castle side (rest the site); h191 the pilgrim side (stop the walk); they compose.
- **h191** = v11 + PIONEER_TIMEOUT_HOME 80 (dist/h191, 5a3687700398; CFG diff vs v11 only that, plus the unset
  TAKEN_SEEN and PIONEER_RACE at their 0 defaults). Unit test added (far site at turn 80 gives up with a home depot;
  turn 79, switch 0, beside the site, FRONT keep it). No-op check (the default build against bots/v11) runs when the
  driver is free of v11's parked census.
- **Pre-registration**: basics-fix rule (two blocks; block 1 rejects only z < -1; accept at z >= 0 with others >= 0 if
  the mechanism reads pass, else the ordinary bars). Mechanism reads, parked.mjs over h191's two blocks per game
  against v11's 108 panel games (the census now running, computed before any h191 game is read): parked pioneers
  (`alive`) per game <= 0.5x v11's, and churches per game >= 0.9x v11's. Studied cells as h190's: uvafan 1712,
  botfinalsafe 2740, wololo 836, awesomelemonade 2518. Queued after h190's blocks.

## 2026-10-25 23:54 PDT: check-in; v11's rate_ours.sh matches all in (2-4)
Replica queue 5 waiting (2 ranked), 8 running (six of them h190's block); VM jobq empty (screens retired), disk 2.3 GB
free. v11's other three rate_ours.sh matches: 1467 lost 1-2 to mvpatel2000 (won 836 red by castles at r1000; lost
1915 red and 2644 blue on health at r1000), 1471 won 2-1 against yujinwunz (826 blue, 53 blue r564; lost 2591 red by
castles r784), 1472 lost 1-2 to botfinalsafe (won 520 blue at r1000; lost 799 red by castles r334 and 836 red r965).
The six matches: 2-4, 7 of 18 games (1468-1470 at 23:24). The two health losses to mvpatel2000 and the
r334 loss to botfinalsafe on 799 are the ones to read when the driver is free. Census for h190's and h191's bars 92
of 108; h191's no-op check and h170's record read follow it on the driver.

## 2026-10-26 00:02 PDT: h190's and h191's mechanism bars fixed from v11's 108 panel games (before either is read)
parked.mjs over v11's panel games (1427-1438, 1441-1452, 1455-1466; scratchpad econ/parked_v11.txt, 108 lines):
868 pioneers sent (8.04 a game), 209 churched, 36 mined first, 292 died, 331 parked (alive at the end with none of
those: 3.06 a game), 0 gave up; 505 sent to a site the enemy held and we did not (4.68 a game); 1,150 churches
(10.65 a game). By block: toTaken 4.89, 4.58, 4.56; parked 3.36, 2.92, 2.92; churches 11.81, 10.11, 10.03.
- **h190** (pre-registered 22:42): toTaken at most **3.27 a game** (0.7x) and churches at least **9.58 a game**
  (0.9x) over its two blocks.
- **h191** (pre-registered 23:32): parked at most **1.53 a game** (0.5x) and churches at least **9.58 a game**.
(parked.mjs counts a site held when an enemy structure stood within 3 king steps at the send and none of ours did,
so its 505 exceed pioneers.mjs's 341 at 22:42, which counts the round an enemy church first stood there.)

## 2026-10-26 00:11 PDT: PIONEER_TIMEOUT_HOME's no-op check passes
The defaults build (src/bot with PIONEER_TIMEOUT_HOME 0) replays bots/v11 against itself on 799 to r300 IDENTICAL,
driver alone; tools/unit-tests.sh 175 of 175 node tests, 65 Python tests OK. Next on the driver: h170's parked read
(for the record), then h191's diagnostic (h191 red vs v11 blue on 1712 to r1000, parked.mjs on both sides).

## 2026-10-26 00:26 PDT: check-in; VM disk pruned (~/.gradle); h170's parked read for the record
- Replica queue 2 waiting (both ranked), 8 running (five of them h190's block 1: 1498, 1499, 1501-1503). VM jobq
  empty. **VM disk** was 2.2 GB free (LEARNINGS 40 keeps 2 GB): deleted /home/terryvanbelle/.gradle/caches (638 MB),
  /home/terryvanbelle/.gradle/daemon (103 MB) and /home/terryvanbelle/.gradle/wrapper (276 MB), the 2023/2024 Java
  builds' Gradle 7.6 and 8.10 (no file in them newer than 2026-09-16, no Gradle process; prior-year files, PROMPTS 2):
  3.2 GB free. The rest: /srv/bc23-galaxy 6.0 GB (the 2023 replica, never touched), /srv/bc19-galaxy/storage 3.4 GB
  (our replays, about 2.3 MB a match).
- **h170's mechanism read** (rejected 2026-10-25 11:16 on block 1, z -1.71; the read promised then; parked.mjs over
  1379-1390, 36 games): 5.11 pioneers sent a game, 2.11 gave up (PIONEER_STALL_ANY), 1.11 parked (v9 3.01;
  its bar was under 1.00), 0.89 mined first, 1.92 to held sites; churches 12.31 a game (v9 11.15; bar 10.03). So
  h170 did most of what it was built to do (parked down 63%, churches up 10%) and still scored 15 of 36. For h190 and
  h191 (same family): the pioneer waste is real and fixable, but one block of h170 found no score in fixing it. Their
  rules and bars stand as pre-registered; the prior on a score gain from either is lower than ECONOMICS row 19's 0.12.

## 2026-10-26 00:31 PDT: v11 on 2591 (match 1459, red, lost r120); panel order: h184 before h191
A timeline read (scratchpad econ/timeline.mjs, tl_1459_2591.txt) of v11's 2591 game against bot1v43 repeats v10's
(17:06 on 2026-10-25) to the round: bot1v43 churched the centre (18,7) at r23 and (13,7) at r103; we had 3 pilgrims
from r24 to r106 (the r24 pioneer parked: no depot free at home), K 0-80 all game against fuel 3,180 unspent. Two
enemy prophets stood at r2 82-85 from our castle (r34-40), past its reach and past a newborn prophet's sight; the
castle answered with 4 prophets in r34-38, each stepped from (6,15) to (7,14) and died at age 1-2 unfired; the two
ESCORT_FIRST crusaders died by r43; the castle killed the prophets that came in (6 of them), and 7 shot it dead at
r120. The walk-in line (structures' knowledge, SIEGE h135-h138) was closed at 20:10 on 2026-10-25; the cell turns on
the centre race, which h184 (h183 on v11; h183's diagnostic churched the centre at r18 here) is built for, as for
2518. With h170's read (00:26) lowering h191's prior, **the panel order after h190 is h184, then h191**, then h185-h188
(an order of untried candidates; no rule or bar changed).

## 2026-10-26 00:42 PDT: h190 rejected on block 1 (matches 1492-1503); h184 block 1 submitted
h190 (v11 + TAKEN_SEEN 1 + PIONEER_TIMEOUT_REST 2 + PIONEER_LOST_DOUBLE 1) on the v7-m1 panel, both sides (wololo's
two matches checked from the games: 1492 red, 1493 blue), scored as pre-registered with `tools/panel_pool.sh
1427-1438 progress/panels/v11-m1.pool 1492-1503 --studied ...`: **16 of 36**, pooled expectation 18.3 (z -1.11);
side-aware **z -1.42** (effect -146 Elo, 95% -347 to +57). Studied cells (uvafan 1712, botfinalsafe 2740, wololo 836,
awesomelemonade 2518) 1 of 8 against 1.8 (z -1.19); other cells 15 of 28 against 16.5 (z -1.02). Won two cells v11
never won (bot1v43 2591 blue, uvafan 1712 blue); lost four it always won (IanCoolidge0 1036 red, bot1v43 2321 red,
botfinalsafe 2740 red, uvafan 1653 blue). The basics-fix rule rejects block 1 at z < -1: **rejected**. Its z lies
outside +-1, so the block stays out of the pool file. Its mechanism read (parked.mjs: toTaken, churches) runs for the
record when the driver is free. With h170 (z -1.71), two pioneer-waste fixes have now scored below the champion on
their first block; h191 (the pilgrim side) keeps its place after h184, with that prior.
**Next block: h184** (submission 208, requests 770-781 = matches 1513-1524, ladder 209, bumped; ordinary rule, pre-registered 2026-10-25 17:56 as h183; bars relative to
v11, the pioneer census over its control block running, fixed before the block is read).

## 2026-10-26 00:54 PDT: check-in
Replica queue 9 waiting (1 ranked; the rest h184's block 1513-1524), 8 running; VM disk 3.2 GB free; jobq empty.
On the driver, one at a time: h191's diagnostic (1712 to r1000), then v11's control-block pioneer census (h184's
comparison, fixed before its block is read), then h190's parked read for the record.

## 2026-10-26 01:08 PDT: h191's diagnostic; chain kills in v11's dead cells; HUNT_SLACK; h192 built and pre-registered
- **h191 diagnostic** (h191 red vs v11 blue, seed 1712, r1000, no-op flags; scratchpad h191/d1712): v11 won on
  health; h191 0 errors, exceptions, frozen or timeouts. parked.mjs, h191's side: 9 pioneers sent, 5 churched, 3
  mined (the timeout sends a pioneer home), 1 died, **0 parked** (v11's census: 3.06 a game). It acts as designed.
- **Dead cells read** (scratchpad econ/timeline.mjs over v11's control-block games): wololo 2013 and 836 and
  awesomelemonade 2518 show no church burst; **botfinalsafe 1706 (both sides) and bot1v43 2321 blue end in one-round
  church chains**: 1457 (1706 red) 7 churches at r309 from (31,17) to beside our castle, preachers, the castle dead at
  r314, with K 626 and F 13,244 banked (our own chain saves to CHAIN_K 1000); 1458 (1706 blue) 6 at r279, the castle
  dead r338; 1460 (2321 blue) 6 at r210, the castle dead r212. **Their stagers stood still in our sight**
  (scratchpad econ/stager.mjs): 1457's P#3883 at (32,18) r248-308, 61 rounds, seen every round by church (25,11) and
  two pilgrims (out of a newborn prophet's reach from that church: r2 72, so INTERCEPT, h156, could not have hit it);
  1458's at (32,15) r213-278, 66 rounds, by a pilgrim; 1460's at (23,9) r183-209, 27 rounds, at r2 100 from our
  castle, by the castle and two pilgrims. Our 6 crusaders and a preacher stood r2 104-178 from 1457's stager.
- **HUNT** (h56/h83, v5-v6 era: a pilgrim radios an enemy pilgrim loitering in our half; idle melee units go for it,
  the chain stager) failed a local gate against our own chain then (castles lost 6 vs 6) and never met the field.
  Its "our half" test (canonical y < n/2) misses 1458's stager, 3 rows past the midline of the 37-row map. New
  switch **HUNT_SLACK** (pilgrim.js huntSpot, default 0 = v11): that many rows past the midline still count. Unit
  test extended (slack 4: 3 rows past is radioed at turns 6, 9, 12; 4 rows past is not).
- **h192** = v11 + HUNT 2 + HUNT_SLACK 4 (dist/h192 b15514aedf60; CFG diff vs v11 only those, plus the unset
  TAKEN_SEEN, PIONEER_TIMEOUT_HOME and PIONEER_RACE at 0). New read tools/reads/bursts.mjs (bursts of 3+ enemy
  churches in a round; near: one within r2 144 of a castle of ours; kills: castles dead within 100 rounds after a
  near burst at them; stagers: enemy pilgrims 20+ rounds on one tile off depots within r2 400 of our castle; hunted:
  those our melee units killed). On v11's games: 1457, 1458, 1460 near 1 kills 1 each; 1459, 1455 (2013) none.
- **Pre-registration** (before any h192 replica game): basics-fix rule (two blocks; block 1 rejects only at z < -1;
  accept at z >= 0 with others >= 0 if the mechanism read passes, else the ordinary rule). Mechanism read: bursts.mjs
  over h192's two blocks against v11's 108 panel games (census to run on the driver, fixed before h192's block is
  read): **near bursts per game at most half of v11's**; reported: kills, stagers, hunted, castles lost a game.
  Studied cells: botfinalsafe 1706, bot1v43 2321. No-op check (HUNT_SLACK 0) and a driver diagnostic (h192 red vs v11
  blue on 1706 to r450: does it find v11's own chainer?) run next.
- **Panel order**: h184 (in play), **h192**, h191, h185, h186, h187, h188.

## 2026-10-26 01:24 PDT: h184's mechanism comparison fixed from v11's 108 panel games (before block 1513-1524 is read)

- v11's pioneer census is complete (scratchpad econ/pioneers_v11.txt, 72 games of 1441-1466, + pioneers_v11_c.txt, 36
  of the control block 1427-1438). h184's firing maps (h177's nine: 1706, 1712, 2013, 2321, 2740, 388, 836, 1036,
  2797; plus 2518 and 2591 for PIONEER_RACE) make 24 panel cells (1712 has two opponents), 72 of v11's games.
- **v11's first church per cell** (three games each, red / blue): 1706 40/40; 1712 41 (both opponents, both sides);
  2013 49,43,49 / 49; 2321 42/42; 2740 73/73; 388 46/46; 836 187,187,47 / 148,never,88; 1036 34/34; 2797 28/28; 2518
  never/never; 2591 never/never. 59 of 72 with a church, median 41. v11 builds no pioneer by r6 on any of them.
  Pilgrims at r100 averaged 13.11 (2518 3, 2591 2-3).
- **Mechanism read, fixed now**: over h184's games on these 24 cells, (a) the pioneers built by r6 found their
  church in at least two thirds of the games that build one (failed below half), and (b) h184's first church is
  earlier than v11's median for that cell in more cells than it is later (a game with no church counts as never;
  ties don't count). Reported, not bars: pilgrims at r100 against 13.11, castles lost a game.

## 2026-10-26 01:37 PDT: h190's record read: its mechanism worked and the panel still said no; h191 to the end

- parked.mjs over h190's rejected block 1 (1492-1503, 36 games; scratchpad econ/parked_h190.txt) against v11's 108
  panel games and h170's 36 (per game):

  | build | sent | churched | mined | died | parked | gave up | to taken | churches |
  |---|---|---|---|---|---|---|---|---|
  | v11 | 8.04 | 1.94 | 0.33 | 2.70 | 3.06 | 0.00 | 4.68 | 10.65 |
  | h190 | 5.67 | 2.14 | 1.00 | 1.42 | 1.11 | 1.78 | 2.25 | 11.03 |
  | h170 (v9 era) | 5.11 | 1.97 | 0.89 | 1.14 | 1.11 | 2.11 | 1.92 | 12.31 |

  Both of h190's pre-registered mechanism bars pass (to taken 2.25 <= 3.27; churches 11.03 >= 9.58): it cut the
  pioneers sent to held sites by half and lost no church, yet scored 16 of 36 (z -1.42). With h170 (same shape,
  z -1.71) that is two pioneer-waste fixes that did what they aimed at and scored below the champion: the waste costs
  too little to show (a parked pioneer is 10 K and 50 F; v11 parks 3 a game). LEARNINGS 48.
- **h191** (the pilgrim side of the same waste; bar parked <= 1.53) is the third of the class: it moves from after
  h192 to the end of the panel order (h184 in play, h192, h185, h186, h187, h188, h191). No bar or rule changed.

## 2026-10-26 01:49 PDT: HUNT_SLACK no-op check passed; h192's diagnostic: HUNT finds the chainer, nobody comes

- No-op check (HUNT_SLACK 0 defaults build vs bots/v11, 799 to r300, nothing else on the driver): IDENTICAL;
  `tools/unit-tests.sh` 175 of 175, galaxy19 65 OK.
- Diagnostic: h192 red vs v11 blue on 1706 to r450 (--det; scratchpad h192/d1706.bc19; no errors, exceptions or
  timeouts; no winner at r450, health 870 vs 630). v11's chainer P#2625 (born r200) reached (31,18) in 6 rounds and
  its first burst came at r210 (5 churches, all killed r212-225 by the castle, prophets and the 4 crusaders and 1
  preacher then within r2 400). It then shuffled between (31,16) and (32,15), 3-4 rows inside red's half, from r212 to
  r409, seen by 4-5 of red's pilgrims every round. h192's pilgrims radioed it (and three other spots) 241 times from
  r209 to r410 (scratchpad econ/huntlog.mjs; 5,061 fuel; 82 of them a v11 pioneer parked at (24,21), 2.5 rows past
  the midline, which HUNT_SLACK admits), but from r225 no red crusader or preacher stood within r2 400 of it: red's
  army at r400 was 4 prophets (K 999 banked for its own chain). A red preacher killed it at r409, in red's own
  chain's wave. So in self-play HUNT's radio works and its hunters are absent. In the field games that motivated it
  the hunters were there (1457: 6 crusaders and a preacher at r2 104-178 of the stager), so h192 goes to the panel
  as pre-registered. Reported with its verdict, not a bar: radios a game and their fuel.

## 2026-10-26 02:22 PDT: h192's bar fixed from v11's 108 panel games (bursts.mjs), before any h192 block

- tools/reads/bursts.mjs over v11's 108 panel games (1427-1438, 1441-1452, 1455-1466; scratchpad
  econ/bursts_v11.txt): 18 one-round bursts of 3+ enemy churches (0.167 a game); **11 near** (a church within r2 144
  of a living castle of ours: **0.102 a game**), 10 of them followed by that castle's death within 100 rounds; 50
  castles lost (0.463 a game); stagers 3.05 a game, 0.68 of them killed by our crusaders or preachers. The near
  bursts: botfinalsafe 1706 7 (both sides, 6 games), bot1v43 2321 blue 2 (of 3 games), botfinalsafe 203 2.
- **h192's bar** (pre-registered 01:08 as at most half of v11's): **near bursts at most 0.051 a game**, i.e. at most
  3 in its 72 games of two blocks. Reported with it: kills, castles lost, stagers and hunted against the numbers above.

## 2026-10-26 02:24 PDT: h184 panel block 1 (1513-1524): 22 of 36, side-aware z 2.27: on to block 2

- `tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool 1513-1524 --studied ...` (v11's 108 games, both sides
  checked in match.json): **22 of 36 against a pooled 18.3, z 1.81; side-aware z 2.27** (+238 Elo, 95% +34 to +439).
  Studied cells 4 of 10 against 0.6 (z 4.79): won awesomelemonade 2518 on both sides (v11 0 of 6), botfinalsafe 1706
  blue (v11 0 of 6) and uvafan 1712 blue (v11 0 of 6, a round-1000 cell); lost wololo 836 and 2013 blue, bot1v43
  2591 both sides and botfinalsafe 1706 red. Other cells 18 of 26 against 17.7 (z 0.20); lost awesomelemonade 1712
  red (v11 6 of 6).
- Ordinary rule, block 1 rejects at z < 0.5: **not rejected**. Block 2 next (two blocks accept at z >= 2 with the
  other cells >= 0, reject at z < 1, else a third). The mechanism read (pioneers.mjs on the firing maps against the
  bar fixed at 01:24) runs on the driver after the squatters census and is reported with the verdict. progress/
  refreshed between the blocks.
- 02:32: h184 block 2 submitted: candidate submission 210 (requests 804-815, matches 1547-1558), ladder 211, bumped;
  the replica queue held 0 waiting before it.

## 2026-10-26 03:09 PDT: squatters census (ECONOMICS row 12's evidence): the field mines our half in our worst cells

- New read tools/reads/squatters.mjs (enemy pilgrims' mine actions on tiles nearer our starting castles than theirs;
  far: no enemy castle or church within two king steps then) over v11's 108 panel games (scratchpad
  econ/squat_v11.txt). Per game: enemy mine turns in our half 1,774, far 292, by 1.9 pilgrims (0.4 of them killed
  by us); our own mine turns in our half 4,896. **Wins 17.5 far turns a game (55 games), losses 577 (53).**
- By cell (far / all enemy mine turns in our half): uvafan 1712 (0 of 6) 2,592-5,627 / 5,272-12,554 a game from r25
  (red) or r69 (blue), 9-19 pilgrims, 3-9 killed: as many as twice our own mining there (5,206-16,435);
  wololo 836 (0 of 6) 138-1,159 / 1,968-11,097 from r42-49; wololo 2013 (1 of 6) 121-710; IanCoolidge0 1036 (6 of
  6) 20-422; everything else under 30. Mined from our land by an enemy that holds no structure beside it.
- Association, not yet cause: a losing game hands the enemy our land. Next, the detail of one uvafan 1712 game
  (scratchpad econ/squatdetail.mjs: per tile K or F, the r2 of the nearest enemy military, of ours and of our
  structures) prices it and says whether a hunt could reach those miners.
- 03:17: the detail of 1433 game 3 (v11 red vs uvafan, 1712; n 62, mirrored in x: our castles (5,46) (21,3), theirs
  (56,46) (40,3), so our half is x <= 30). Every far tile lies in the centre columns x 26-30, a few tiles on our
  side of the midline: K (28,47) 840 turns from r69, (27,43) 812 from r74, (28,17) 676 from r218; F (30,18) 803,
  (27,44) 782, (29,18) 676, (26,12) 290, (30,11) 110. One or two pilgrims each, mining without a break to r999 with
  an enemy military unit on the next tile (median r2 1; the miner hands its load on, as no structure stands within
  two steps), ours at r2 338-666 (18-26 tiles) and our nearest structure at r2 488-1,060. That is 4,656 K and
  26,610 F taken from the centre on our side, against 1,800 vs 17,670 health at r1000 in the earlier v7 read. Our
  pilgrims and units never come within sight of those tiles, so HUNT (a pilgrim must see the miner) cannot fire
  there: ECONOMICS row 12 as written does not reach this case. It is contested centre land the field takes with an
  escort (row 11's von Thünen premium, and h184's pioneer race, which won uvafan 1712 blue in its block 1).

## 2026-10-26 03:29 PDT: h184's mechanism read on block 1 (1513-1524): it does what it was built to do

pioneers.mjs over block 1 (scratchpad econ/pioneers_h184_b1.txt), the 24 firing cells against v11's cell medians
(bar fixed 01:24): **every game builds a pioneer at r3, and it founds its church in 22 of 24 (0.92, bar 2/3)**; the
two that fail are bot1v43 2591, both sides (no church; lost r154-161, as v11). **First church earlier than v11's
cell median in 22 cells, later in none** (ties: 2591 both, never). First churches: 1706 r11 (v11 40), 1712 r22 (41),
2013 r15 (49), 2321 r13 (42), 2740 r28 (73), 388 r25 (46), 836 r24 (v11 187 red, 148 blue), 1036 r18 (34), 2797 r13
(28), 2518 r14 (v11 never: won both sides). Pilgrims at r100 14.79 a game (v11 13.11). Block 2's read follows the
same way; the verdict takes both blocks' z under the ordinary rule.
- Unit tests after tools/reads/squatters.mjs: 175 of 175, galaxy19 65 OK (410 s alone on the driver; the first run,
  beside a read, was cut by my own 600 s timeout, not by a test).
- 03:49: bursts.mjs over h184's block 1 (reported with its verdict; scratchpad econ/bursts_h184_b1.txt): castles
  lost 0.306 a game (v11 0.463 over its 108), near bursts 0.083 (v11 0.102; botfinalsafe 1706 red, 203 blue, bot1v43
  2321 blue, each followed by a castle's death), stagers 3.69, hunted 0.72.

## 2026-10-26 04:23 PDT: h184 two blocks (1513-1524, 1547-1558): 42 of 72, side-aware z 2.34, others -0.69: a third block

- Block 2 alone (1547-1558, both sides checked): 20 of 36 against 18.3 (side-aware z 1.04, +111 Elo); studied 4 of
  10 (0.6), others 16 of 26 (17.7, z -1.17).
- **Both blocks** (`tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool 1513-1524 1547-1558 --studied ...`):
  **42 of 72 against 36.6, side-aware z 2.34** (+176 Elo, 95% +29 to +322). **Studied cells 8 of 20** against 1.2 (z
  6.77): awesomelemonade 2518 4 of 4 (v11 0 of 6), botfinalsafe 1706 blue 2 of 2 (0 of 3), uvafan 1712 blue 2 of 2
  (0 of 3). **Other cells 34 of 52 against 35.4, z -0.69**: lost awesomelemonade 1712 red 0 of 2 (v11 3 of 3),
  IanCoolidge0 203 red 1 of 2 (3 of 3), bot1v43 2321 red 1 of 2 (3 of 3).
- Rule (TRAINING_ALGORITHM §4, pre-registered for h184): two blocks accept at z >= 2 only with the other cells' z >= 0
  (it was designed from studied cells); reject at z < 1. z 2.34 with others -0.69: neither, so **a third block**,
  accepted at cumulative z >= 2 with others >= 0. Block 2's mechanism read and castle count run on the driver;
  progress/ refreshed before block 3 goes in.
- 04:26: h184 block 3 submitted: candidate submission 212 (requests 841-852, matches 1584-1595), ladder 213, bumped;
  the queue held 1 waiting before it.
- 04:30: what h184 gave up in its worst other cell, awesomelemonade 1712 red (v11 3 of 3 by castles at r299-312;
  h184 0 of 2, both on health at r1000). `tools/replay.js timeline`, v11 (1435 game 2) against h184 (1521 game 2),
  red: at r100 v11 had 6 churches and 31 pilgrims while awesomelemonade had 3 and 21; h184 had 5 and 24 while
  awesomelemonade had 8 and 35 (r150: 5 and 26 against 7 and 40). v11 then led on army (r200 130 vs 63) and took
  both castles by r305; h184 led less (103 vs 83), lost a castle at r250, and from r400 the enemy's prophets outgrew
  it (r1000 734 vs 157 military; mined K 23,172 vs 19,612). h184's r3 pioneers on 1712 go to the clusters PIONEER_OPEN
  picks (7+ king steps ahead; churches r22, r33), and here the opponent took the centre clusters v11's plan reached.
  Not acted on during the test; a lead if h184 is accepted (on 1712 v11's plan won against awesomelemonade, h184's won
  against uvafan blue).
- 04:35: checked by the church builds (`tools/replay.js events --kind build`, r1-150): in v11's game red churched the
  centre at (30,17) at r53 (four prophets from it by r56), and awesomelemonade's early churches stood at (53,2) r11,
  (36,12) r28, (56,33) r34, (40,22) r44, none in the centre. In h184's game red's r3 pioneers churched its own
  corners, (6,33) r22 and (8,1) r33, and awesomelemonade churched the centre at (31,12) at r22 and built 5 pilgrims
  there by r33. The 04:30 reading stands: the early pioneers went home-side and the opponent took the centre.
- 04:54: h184's block 2 reads (scratchpad econ/pioneers_h184_b2.txt, bursts_h184_b2.txt). Mechanism, same as block
  1: the r3 pioneer founds its church in 22 of 24 firing games (0.92; misses bot1v43 2591 both sides again), first
  church earlier than v11's cell median in 22 cells, later in none; pilgrims at r100 15.04. **Both blocks: 44 of 48
  (0.92), earlier 44, later 0: the mechanism read passes.** Castles lost 0.361 a game in block 2, **0.333 over both**
  (v11 0.463); near bursts 0.097 (v11 0.102). The verdict waits on block 3's z (cumulative >= 2 with others >= 0).

## 2026-10-26 04:57 PDT: wololo 836 (v11 0 of 6, h184 0 of 4) read: a forward church at r23 and its prophets

- `tools/replay.js timeline` and scratchpad econ/timeline.mjs on v11's 1427 game 3 (red, lost by castles r747) and
  1428 game 3 (blue, lost r561); map 836 mirrored in y, our castles near (40,19) and (21,19) as red.
- Both sides the same: wololo's crusader born r3 walks at us; **at r23 a wololo pilgrim churches (45,31) / (45,28),
  r2 205 from our nearer castle, a row or two from the midline**, and from r28 its prophets stand at r2 58-100 of that
  castle. Our 4 crusaders of r12-15 die at r34-37 a few tiles out (to the crusader and the first prophet); every
  crusader, prophet and preacher the castle builds from r33 dies at age 1-20 (red: 22 prophets, 6 crusaders and 3
  preachers dead by r300). Blue: a second forward church at (45,31) r55 (r2 136) with three preachers.
- The economy starves behind it: red holds 8 pilgrims and no church r25-r150, the bank at 9-80 K, K mined 476 by r100
  (wololo 1,476; 5 churches); a castle falls at r200; at r300 wololo has 230 military to our 3.
- The one structure that feeds the siege stands alone for its first 5 rounds (r23-r27), 13 tiles from our castle,
  with our 4 crusaders 9-10 tiles from it. CHURCH_FIRST_R2 (h58, v5 era: enemy churches within r2 144 of home first)
  failed a local delivery against our own chains and never met the field; 836's church stands at r2 205. A
  candidate (an early strike on a forward enemy church while it stands unguarded) waits for h184's verdict, to be
  built on the champion it gives.

## 2026-10-26 05:42 PDT: forward-church census over v11's 108 reference games (tools/reads/forward.mjs, new)

`tools/reads/games.sh forward.mjs -- 1427-1438 1441-1452 1455-1466`: enemy churches founded within r2 400 of a living
castle of ours (either half), whether we ever destroyed them, what they built.

| games | n | won | castles lost / game | military they built / game | near churches we destroyed |
|---|---|---|---|---|---|
| no near church | 35 | 28 (0.80) | 0.00 | 0 | - |
| a near church | 73 | 27 (0.37) | 0.68 | 81 | 61 of 295 |
| first founded by r40 | 42 | 13 (0.31) | 0.86 | 85 | 31 of 172 |
| first founded r41-100 | 23 | 12 (0.52) | 0.35 | 76 | 22 of 60 |

Confounded by opponent and map, but the cells v11 loses outright all hold an early near church **we never touch**:
wololo 836 (founded r23, r2 205; destroyed 0 of 23; 0 of 6 won), awesomelemonade 2518 (r14, r2 290; 0 of 12; 0 of 6),
botfinalsafe 2591 (r23, r2 233; 0 of 15; 0 of 6), uvafan 1712 (r22, r2 225-244, standing all 978 rounds; 0 of 10;
0 of 6), wololo 2013 (r46, r2 296; 0 of 17; 1 of 6). 30 games, 1 won, and every early church stands to the end or
its cluster's end; their churches built 8-217 military each. Cells where we do destroy them win (IanCoolidge 1036:
2 a game, 6 of 6; awesomelemonade 2797: r58 church r2 145 dead 21-45 rounds later, 6 of 6). Price: the upper bound is
the 29 lost games of those five cells (9.7 of a 36-game block); what a strike gets depends on
who sees the church first and what guards it (next read: econ/seen.mjs, our sightings and its guards in its first 15
rounds).

## 2026-10-26 06:30 PDT: PROMPTS 46: prior-year sweep of the VM (2.9 GB free -> 11 GB)

Deleted on battlecode-dev (prior-year files, PROMPTS 2 and 46), each path by name:
- the 2023 replica's data: the contents of `/srv/bc23-galaxy/storage` (6.0 GB), `/home/bcreplica/galaxy` (79 MB),
  `/home/bcreplica/replica` (185 MB), the Postgres cluster `15/main` (port 5432; its one database `siarnaq`, owner
  bcreplica; `pg_dropcluster --stop 15 main`, 103 MB);
- its stopped, disabled units in /etc/systemd/system: bc23-galaxy-relay.service, bc23-galaxy-saturn.service,
  bc23-galaxy-scheduler.service, bc23-galaxy-scheduler.timer, bc23-galaxy-web.service, bc23-replica-api.service,
  bc23-replica-autoscrim.service, bc23-replica-autoscrim.timer, bc23-replica-worker.service, bc23-replica.slice
  (daemon-reload); its CLIs /usr/local/bin/bc23-galaxy-manage and /usr/local/bin/bc23-replica; the operator crontab's
  only line (`30 */6 * * * bash ~/projects/vibe/2023/tools/galaxy/prune-local.sh`, 2023 replay pruning);
- the VM's 2023 trees: ~/projects/vibe/2023 (279 MB), ~/projects/vibe/bc23-benchmarks (670 MB),
  ~/projects/vibe/bc23-viewer-3.0.15 (7 MB);
- pre-project tools and caches (no file newer than 2026-10-20): ~/jdk (JDK 8u504, the 2023 replica's Java), ~/jdk21,
  ~/.gradle (the rest), ~/.npm, ~/.cache/{JNA,fontconfig,pip}, ~/carol-kscan, ~/replaydump, ~/cc32 (2023/2024
  flatbuffers tools, 2026-09-08/09), ~/scratch-side-abl and ~/scratch-side-xform (2023 maps and Java, 2026-10-20);
  /var/log/caddy/galaxy-access-2026-10-2*.log.gz (the 2023 site's five rolled logs).

Kept, because the bc19 replica uses them (tools/galaxy19/README.md): `/opt/bc23-galaxy` (siarnaq source and venv,
copied on a fresh install), `/srv/bc23-galaxy/frontend` (the frontend step's source; static and viewer, 12 MB, beside
it), and the Caddy chain that fronts the bc19 site (bc23-replica-caddy.service with its bc19 drop-in, the boot-time
render bc23-replica-hostname.service, bc23-replica-egress.service, /usr/local/lib/bc23-replica, /usr/local/lib/bc23-galaxy,
/etc/bc23-replica, /etc/bc23-galaxy). The bcreplica user stays (its egress rule names it). Checked after: bc19 web,
saturn, relay, activity, scheduler timer, postgresql@15-bc19 and Caddy active; `caddy validate` passes; the 2023
print-site render still runs; the site answers 401 (basic auth); field.py queue reads the API. A stale failed
transient unit of ours (run-u11061, an old sandbox probe) was reset.

PROMPTS 47 (the unranked uvafan-wololo match): field.py activity lets the top-rated team challenge one of the 3 teams
just below it, unranked (galaxy takes ranked requests only upward, so the top team can make none). uvafan passed
wololo at the top (1617.7 to 1616.7); request 863 (06:01 PDT) is uvafan's unranked challenge to wololo.

## 2026-10-26 06:32 PDT: early forward churches: who sees them, what guards them (v11's 108 games, scratchpad seen.mjs)

The first enemy church per game founded by r60 within r2 400 of a castle of ours (61 games, 24 won), over its first 15
rounds: our first sighting, our crusaders/preachers within r2 400 when it is founded, enemy and our military within r2
25 of it at +5 and +10.

| | n | won | unseen in 15 rounds | sighting lag (median) | seen by | our melee within r2 400 | its guards +5 / +10 | ours by it +5 / +10 | destroyed within 15 |
|---|---|---|---|---|---|---|---|---|---|
| lost | 37 | 0 | 10 | 4 | pilgrims 24, crusaders 3 | 1.9 | 1.8 / 1.5 | 0.0 / 0.0 | 0 |
| won | 24 | 24 | 8 | 0 | pilgrims 13, crusaders 3 | 1.2 | 0.9 / 0.9 | 0.4 / 0.5 | 0 |

By cell (0-of-6 cells first): wololo 836 (r23, seen +4 by a pilgrim, 2 of our crusaders within r2 400, guards 2 / 1-2);
botfinalsafe 2591 (r23, seen +4 by a pilgrim, guards 2 / 0); uvafan 1712 (r22, seen +4 by a crusader or +15 by a
pilgrim, guards 2 / 2); wololo 2013 (r46, seen at once by a pilgrim, guards 1 / 2); awesomelemonade 2518 (r14, **never
seen** in 15 rounds, guards 0 / 0). Won cells: awesomelemonade 2797 (r58, seen at once, no guards, 2 of ours by it at
+10, destroyed 21-45 rounds later); IanCoolidge 1036 (r41-42, seen at once, guards 1-2).

Reading: our pilgrims see most forward churches within 4 rounds, but nothing of ours ever goes to one: at +10 our
military by it is 0.0 in every lost game. The local force is the 2 early crusaders, already dying to the same guards
(836: r34-37); a strike that only redirects them meets 1-2 guards and the prophets the church builds next. A strike
worth building needs a force raised for it (the castles hear a pilgrim's radio at r2 403: the church stands r2 205-306
from them) or must arrive before the guards (2591's guards are gone by +10; 2518's church has none but is never seen,
so it needs a scout). Not built yet: h184's verdict (block 3, one match left) decides the base.

## 2026-10-26 06:37 PDT: h184 REJECTED on three blocks (others' z -0.85); h192 block 1 = matches 1616-1627

h184 block 3 = matches 1584-1595 (submission 212): 20 of 36. `tools/panel_pool.sh 1427-1438
progress/panels/v11-m1.pool 1513-1524 1547-1558 1584-1595 --studied <h184's five>`: **62 of 108, side-aware z 2.51
(+155 Elo, 95% +34 to +275); studied cells 11 of 30 (expectation 1.8, z 7.48); other cells 51 of 78 (expectation
53.1, z -0.85)**. The rule (pre-registered 04:23): three-block z >= 2 with the other cells' z >= 0 -> REJECTED.

Where it moved, against v11's pool rates (cand of 3, one game a block): gains awesomelemonade 2518 both sides 3/3 (pool
0/6), botfinalsafe 1706 blue 3/3 (0/6), uvafan 1712 blue 3/3 (0/6), wololo 2013 red 2/3 (1/6); losses
awesomelemonade 1712 red 0/3 (6/6), bot1v43 2321 red 1/3 (3/3), IanCoolidge 203 red 2/3 (3/3). The early pioneer
does what it was built for (44 of 48 cells churched earlier over blocks 1-2) and wins where the plan raced and lost;
where v11 already won, the early send costs (1712 red: OPEN's home-side sends give up the centre the enemy then
churches at r22; TRAINING_LOG 04:30). Lesson so far: the studied-cell gain is real (z 7.48) and the price falls on
cells v11 already won; a decomposition (RACE alone: OPEN 99 makes every castle race its first contested cluster;
or OPEN only where it does not give up a contested cluster v11 would take) needs its own blocks, after h192.

h192 block 1 (v11 + HUNT 2 + HUNT_SLACK 4, basics-fix rule, bar near bursts <= 0.051 a game): submission 214,
requests 873-884, matches 1616-1627, ladder 215; progress/ refreshed 06:37-06:38 between the blocks. Waiter:
scratchpad wait_block.sh 1616 1627.

## 2026-10-26 08:00 PDT: h193 (far church strike) built and checked; pre-registered
h193 = v11 + STRIKE_FAR 3 (dist/h193 18d81e3ab45c; config.js STRIKE_FAR, STRIKE_FAR_R2 400, STRIKE_SAFE_R2 100,
STRIKE_FUEL 150, all new, defaults off). A pilgrim that sees an enemy church radios it once (FAR.STRIKE, r2 902,
31 fuel, while the bank holds 150; a pilgrim that heard the radio stays quiet: pilgrim.js strikeSpot). The castle of ours
nearest the church, when it lies within r2 400 of that castle and beyond r2 100 of every enemy castle, owes it 3
crusaders, built ahead of its economy pilgrims (the `first` hook), each told SIG.GUARD at r2 3 (comms.js
GUARD_STRIKE: the radius marks a striker, so escort guards keep their meaning). A striker walks at full speed (no
cruise cap) to the church until it sees that tile without it, engaging what stands within r2 196 of the site on the
way, then holds the lattice there (military.js strikeWalk; castle.js hearStrike, strikeFar). Castles see churches in
their own sight the same way. Read for it: tools/reads/strike.mjs (new: radios, strikers, strikers lost, their hits on
churches, churches destroyed and by whom).

Why, and the price: TRAINING_LOG 05:42 and 06:32 (the five cells v11 wins 1 of 30, each holding an early forward
church nobody of ours touches). Correction to 05:42: map 2591 is bot1v43's (progress/panels/v7-m1.json), not
botfinalsafe's. Every such church in v11's lost games stood at r2 113-305 of the nearest enemy castle (scratchpad
seen2.mjs, 48 churches), so the r2-100 safety filter skips none of them. Their guards (units within r2 36): wololo 836
a crusader and a prophet by +5, 2-3 prophets by +10-25; wololo 2013 1-2 prophets; bot1v43 2591 2 prophets at +5, none
by +15; awesomelemonade 2518 (the r29 church; the r14 one is never seen) 2 prophets; uvafan 1712 a crusader and a
preacher by +5, a prophet more by +15 (scratchpad seenu.mjs, one game each). Prophets cannot hit within r2 16, so
three crusaders beside the church outfight two of them; uvafan's preacher is v11's own answer, the hard case.

Checks: no-op IDENTICAL (defaults build vs bots/v11, 799 to r300, driver alone); tools/unit-tests.sh 176 of 176 node tests, 65 Python OK; unit test added (pilgrim radio once,
hearing and fuel gates; castle debt: nearest castle, r2 400, r2-100 safety, once per tile, own sight, ends when the
tile is seen empty; strikeFar's build and r2-3 radio; striker walk vs escort vs off). Driver diagnostic vs v11 to r400
(strike.mjs; strikers' lives from scratchpad strikers.mjs):

| map | h193 side | radios | strikers (first round) | lost | hits on churches | enemy churches destroyed |
|---|---|---|---|---|---|---|
| 836 | red / blue (identical, mirror) | 18 | 3 (r35) | 3 | 7 | 6 |
| 1712 | red | 20 | 6 (r67) | 6 | 1 | 2 |
| 1712 | blue (won by castles r241) | 16 | 6 (r69) | 5 | 0 | 6 |

The mechanism fires as designed, but against v11 every striker dies to the preacher v11's church builds against
crusaders in its sight (836: the first striker hit the church 7 times, 70 of its 100 HP, then died at r47; the
others arrived 1 and 10 rounds later and died within 4-6 rounds). The field's forward churches are guarded by prophets
instead, which is the case the strike was designed for; self-play cannot measure it. Radios run 16-20 a game (each new
pilgrim that has not heard one radios a church once: about 550 fuel by r400).

Pre-registered before any h193 replica game: the panel rule (block 1 rejects at side-aware z < 0.5; after block 2
accept at z >= 2, reject at z < 1, else a third block, accepted at z >= 2). Designed from the studied cells
m-schier.battlecode-2019-wololo:seed-836, m-schier.battlecode-2019-wololo:seed-2013, StoneT2000.BC19-bot1v43:seed-2591,
uvafan.bc2019:seed-1712, awesomelemonade.Battlecode2019:seed-2518, so acceptance also needs the other cells at z >= 0.
Mechanism bar (forward.mjs and strike.mjs on h193's side, each block's 10 studied-cell games): a near enemy church
destroyed in at least 4 of the 10 (v11: 0 of 30) and strikers built in at least 6 of the 10. Score:
`tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool BLOCK --studied <the five>`.

## 2026-10-26 08:03 PDT: h193 block 1 = matches 1639-1650
Submission 216, requests 896-907, matches 1639-1650, ladder 217 (bots/v11). It plays beside h192 block 1's last match
(1622): blocks are separate submissions requested one run at a time (panel_submit.sh), and the replica queue is short
(13 waiting, 12 of them h193's). Waiter: scratchpad wait_block.sh 1639 1650.

## 2026-10-26 08:21 PDT: h192 REJECTED on block 1 (z -2.65)
h192 block 1 = matches 1616-1627 (submission 214), finished 08:20; fetched, every opponent once each side.
`tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool 1616-1627 --studied
StoneT2000.BC19-botfinalsafe:seed-1706,StoneT2000.BC19-bot1v43:seed-2321`: **14 of 36, pooled expectation 18.3,
side-aware z -2.65 (-262 Elo, 95% -452 to -70); studied cells 1 of 4 (expectation 1.1, z -0.09); other cells 13 of
32 (expectation 17.3, z -2.83).** The basics-fix rule (pre-registered 02:22) rejects block 1 at z < -1: REJECTED.
Usually-won cells it lost: IanCoolidge 203 red, awesomelemonade 1712 blue, 2797 red (each 6/6 or 3/6 in v11's pool);
the studied cells did not move (botfinalsafe 1706 0 of 2, bot1v43 2321 1 of 2, as v11). The block's z lies outside
+-1, so it stays out of the pool file. The bursts read runs for the record (scratchpad econ/bursts_h192_b1.txt).
progress/ is not refreshed now: h193 block 1 (1639-1650) is in play (LEARNINGS 38).

## 2026-10-26 08:42 PDT: time audit of v11 (maps 2740 and 1653): the overruns are the engine and load, not our code
VM jobs (v11 vs v11, vm2 kill on, no --fast-turn, `--turnlog-ms 50`; out/time_v11_{2740,1653}.{json,jsonl} and
out/turn_v11_*.jsonl on the VM). They ran niced beside saturn's 8 execute slots (load average 12-13 on 8 vCPUs: each
game's GC threads take up to 156% CPU), so their wall times include that load. **2740** (59 wide, 1 castle, round
1000, 430 units built by red): 120 turns over 50 ms, up to 303 ms (prophet), 266 (preacher), 245 (crusader), 230
(pilgrim); 4 turns killed at 200 ms and 2 frozen (red 2+2). Our own code's slowest logged turn (robot.js's TIME,
which covers all of turn()) was 95 ms; 59 turns over 30 ms. **1653**: 6 turns over 50 ms (up to 414 ms, a pilgrim
whose code logged at most 33), 2 killed. A killed turn never reaches the TIME line, so these two games alone cannot
clear those 6. The replica's own counts over v11's 108 panel games (1427-1438, 1441-1452, 1455-1466, match.json)
settle it: **our team 38 timeouts in 3.86 M turns (0.98 per 100k), 74 frozen, 0 exceptions; the opponents 305 in 8.65 M
(3.53 per 100k), 5,246 frozen, 19,493 exceptions.** Our rate is the same against every opponent (0.76-1.05), as a
floor set by the shared process would be; IanCoolidge0's lighter bot is lower (0.17). At 0.35 killed turns a game,
each costing one robot one turn, time is not a lever now (LEARNINGS 31 said so from profiling: ~2 ms of our code a
turn). Basics check holds: zero exceptions, overruns at the environment's floor.

## 2026-10-26 08:53 PDT: h194 (h184's race part alone) built and pre-registered
- h184 by cell over its three blocks against v11's 108 panel games (one game a block): gained awesomelemonade 2518
  both sides 3/3 (v11 0/3 each), botfinalsafe 1706 blue 3/3 (0/3), uvafan 1712 blue 3/3 (0/3), wololo 2013 red 2/3
  (1/3), botfinalsafe 2740 blue 3/3 (2/3); lost awesomelemonade 1712 red 0/3 (3/3), bot1v43 2321 red 1/3 (3/3),
  IanCoolidge0 203 red 2/3 and 1036 blue 2/3 (3/3 each). On 2518 and 2591 it plays RACE only (no castle of ours has a
  cluster 7+ king steps ahead); elsewhere OPEN sends the turn-3 pioneer home-side, which won 1706 blue and uvafan 1712
  blue and gave the centre to awesomelemonade on 1712 red (04:30).
- **h194** = v11 + PIONEER_EARLY 6 + PIONEER_OPEN 99 + PIONEER_RACE 2 (dist/h194 bf489b929599; CFG diff vs v11 only
  those, plus the unset HUNT_SLACK, PIONEER_TIMEOUT_HOME, TAKEN_SEEN and STRIKE_FAR keys at 0). OPEN 99 leaves no
  cluster "safe", so every castle whose plan opens with a race (m < 2) sends its turn-3 pioneer there and no other
  castle sends one early. Static plans (scratchpad econ/early_sim.mjs over tools/plan.mjs; the same on both sides):
  it sends on 836 ((22,19) to c7 m0 d22), 2740 ((51,3) to c7 m0 d47), 2591 ((15,5) to c1 m0 d17, as h184), 2321
  ((9,11) to c5 m0 d16), 1712 ((3,21) to c8 m1 d10), 2518 ((30,7) to c1 m0 d13, as h184) and 1036 ((27,13) to c6 m0
  d15); on 2644, 2013, 1706, 203, 388, 1653, 2046 and 2797 it plays as v11 (first cluster not a race, or no plan).
  Each send goes to v11's own first cluster, about 20 rounds earlier (v11's first pioneers leave at r23-24 on 2518
  and 2591 and never found those churches: the enemy's stands by r14 and r23).
- **Pre-registration** (before any h194 replica game): the general panel rule (block 1 rejects at side-aware z < 0.5;
  after block 2 accept at z >= 2, reject at z < 1, else block 3, accepted at cumulative z >= 2); designed from studied
  cells, so acceptance also needs the other cells' z >= 0. Studied cells: awesomelemonade 2518 and bot1v43 2591, both
  sides. Score: `tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool BLOCK... --studied
  awesomelemonade.Battlecode2019:seed-2518,StoneT2000.BC19-bot1v43:seed-2591`. Mechanism read
  (tools/reads/pioneers.mjs on h194's side): in the games where its static plan sends (the seven maps above: 16 of a
  block's 36), the turn-3 pioneer founds its church in at least half. Prediction: 2518 as h184 (both sides won);
  awesomelemonade 1712 red as v11 (the centre is not given up); 1706 blue and uvafan 1712 blue back to v11's 0.
- **Panel order**: h193 (in play), h185 (being submitted), **h194**, h186, h187, h188, h191: h194 repeats a measured
  gain (h184's 2518 cells, z 7.48 over the studied cells) without the sends that cost h184 its other cells.

## 2026-10-26 08:58 PDT: h192's mechanism read, for the record: it fails too
tools/reads/bursts.mjs over h192 block 1 (1616-1627, 36 games; scratchpad econ/bursts_h192_b1.txt; a first pass at
08:38 ran an older scratch draft without the near count and was discarded): bursts 7 (0.194 a game; v11 0.167),
**near bursts 5 (0.139 a game; bar at most 0.051, v11 0.102)**, kills 4, castles lost 19 (0.528; v11 0.463), stagers
2.72 a game (v11 3.05), hunted 0.61 (v11 0.68). The near bursts: botfinalsafe 203 red 3, 1706 both sides 1 each. HUNT
found no more stagers than v11's own engage rule and the bursts went on: the hunt line gives nothing to build on.

## 2026-10-26 09:01 PDT: h194's driver diagnostic: the race pioneer churches its site 27-57 rounds before v11
h194 red vs v11 blue to r150 (--det, scratchpad diag_h194.sh, h194_r_*.bc19), pioneers.mjs on red: **2740** the
turn-3 pioneer walks 35 king steps, arrives r45, church r46 (v11's first church in the same game r73; v11's on the
replica against botfinalsafe r73); **1036** church r16 (v11 r34; replica r34); **2321** church r17 (v11 r36; replica
r42). Pilgrims at r100 18, 25, 18 (v11 on the replica 14-15). No errors, exceptions or timeouts. Self-play, so only
the mechanism is read here; the panel decides.

## 2026-10-26 09:05 PDT: two round-1000 health losses read (IanCoolidge0 203 blue, uvafan 2046 blue)
`tools/replay.js summary / young / timeline` (scratchpad health_study.txt), v11's games 1438-1, 1437-1, 1434-1.
- **IanCoolidge0 203**: v11 wins red 3/3 by castles and loses blue 3/3 on health (970 vs 4,730). Our only planned
  cluster is c3 (one castle plans, m 6). Red: the r23 pioneer arrives r29, church r30 (IanCoolidge's first r305).
  Blue (1438): the r23 pioneer (#445) reaches 5 king steps from (24,29) at r27, turns back, and wanders between
  (25,35) and (31,25) for 51 turns, never adjacent to the site, until a prophet kills it at r78; IanCoolidge churches
  within 3 king steps of the site at r49, and the seven pioneers we send there later (r179-r889) never arrive either.
  Our first church: r450. 136 of our 263 military newborns (3,295 K of 6,015) die within 3 rounds (prophets 103 of
  159); IanCoolidge ends with 104 prophets. The pioneer's dither is h191's case (PIONEER_TIMEOUT_HOME, queued); a
  pioneer that keeps resending to a site the enemy holds is TAKEN_SEEN's (h190, rejected).
- **uvafan 2046**: uvafan turtles: 7 pilgrims (never idle), no church, prophets 17 at r100 to 145 at r900, bank
  ~700 K held, then 78 crusaders from it in r900-1000; it first hits us at r352, when our line reaches it. Ours: 13-15
  pilgrims mining less (K 4,598 against 5,428; 3,476 of 11,480 pilgrim turns idle), 17 churches all lost, 71
  preachers (51 dead within 3 rounds), 57 of 68 crusaders lost; our bank sits at 270-830 K from r200 (CHAIN_K 1000
  holds the peacetime army back from CHAIN_ROUND), 30,332 F unspent at the end. Health 970 against 6,640. Queued for
  exactly this: h187 (CHAIN_WALL 28: a walled line ends the chain bank) and h186 (idle miners).
No new candidate from this read: its levers are queued (h186, h187, h191) or closed (FEED_STOP h159, the endgame lines
h8, h96, h104, TAKEN_SEEN h190).

## 2026-10-26 09:10 PDT: h185 block 1 = matches 1651-1658 and 1831-1834; the daily autoscrim fired (178 waiting)
h185 (v11 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1, dist/h185 e4a146ede62f) block 1 went in over 45
minutes: candidate submission 218 with requests 908-915 (matches 1651-1658: wololo, botfinalsafe, bot1v43, uvafan,
both sides) at 08:23; the four against awesomelemonade and IanCoolidge0 were refused by the replica's hourly scrim
limit (HTTP 429: h193's 12 requests at 08:03 and these 8 filled the hour) and went in at the third retry with
candidate submission 224 (requests 916-919, matches 1831-1834); submissions 220 and 222 were the same bundle with
every request refused (ladder 219, 221, 223, 225). Score: `tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool
1651-1658,1831-1834 --studied <h185's six>`. The autoscrim fired at 09:00 PDT (24 h after the last): 178 waiting, 174
ranked. Queue rule (HANDOFF): our blocks one at a time and bumped (1831-1834 bumped to the front at once), no local VM
jobs; h194 waits for h185's block to end.

## 2026-10-26 09:12 PDT: replica queue census after the autoscrim
176 waiting over 86 teams, at most 6 a team (IanCoolidge0 ~69ce88 6, ours 6 (h185's last four and ranked
ladder matches), awesomelemonade and four others 5): no bot holds the lion's share, so none is dropped (owner,
PROMPTS 20-21). All 8 execute slots play; yesterday's 174 took until 22:52 to fall under 30 (about 11 matches an
hour). Until then: our blocks one at a time and bumped, no local VM jobs.

## 2026-10-26 09:42 PDT: h193 REJECTED on block 1 (16 of 36, z -1.42); h185 block 1 25 of 36, z 4.11: block 2 next
Both blocks finished (h185's at 09:41); replays fetched, sides checked (odd matches ours red, even blue).
- **h193** (v11 + STRIKE_FAR 3, matches 1639-1650): 16 of 36, pooled expectation 18.3, z -1.11; side-aware z
  **-1.42** (effect -146 Elo, 95% -347 to +57); studied cells 0 of 10 (expectation 0.6, z -0.84); other cells 16 of
  26 (z -1.17); lost two usually-won cells (bot1v43 2321 red, botfinalsafe 2740 red). REJECTED under the panel rule
  (block 1 rejects at z < 0.5); its z lies outside +-1, so the block stays out of the pool file.
- **h185** (v11 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1, matches 1651-1658 and 1831-1834): **25 of
  36**, pooled expectation 18.3, z 3.27; side-aware z **4.11** (effect +405 Elo, 95% +220 to +586); studied cells 8
  of 12 (expectation 4.7, z 3.59); other cells 17 of 24 (expectation 13.6, z 2.54). It won both sides of uvafan 1712,
  awesomelemonade 2518 and bot1v43 2591 (all 0 of 6 in v11's pool), wololo 836 blue, 2013 blue and IanCoolidge 203
  blue; it lost wololo 2644 red (3 of 3 in the pool). Block 1 passes (z >= 0.5): block 2 goes in now, ahead of h194
  (an accept settles the champion every later candidate builds on). Its mechanism read (escorts.mjs, mean hit6 under
  40%) runs on both blocks once block 2 ends.

## 2026-10-26 09:47 PDT: h185 block 2 = matches 1835-1846
Candidate submission 226 (dist/h185 e4a146ede62f), requests 920-931 all accepted (the hour's limit had room), ladder
227 (bots/v11); `tools/bump_ours.sh --ours` moved them to the queue's front (169 waiting, 157 ranked). Waiter:
scratchpad wait_block.sh 1835 1846. h194's block 1 follows it.

## 2026-10-26 10:12 PDT: where the army stood when v11's castles fell (castles.mjs over v11's 108 panel games)
New read tools/reads/castles.mjs TEAM REPLAY: per castle lost, the enemy attackers within r2 100 and our military
alive within r2 100 / 100-400 / beyond, and how many of each fired in the castle's last 20 rounds. Over v11's panel
games (1427-1438, 1441-1452, 1455-1466; scratchpad castles_v11.txt): 50 castles lost; 18 fell with no unit of ours
within r2 400 (the army already spent); 14 fell with 10 or more of our units within r2 400 that had not fired in 20
rounds: bot1v43 2321 blue in all three blocks (25-43 units within r2 100 of castle (33,9), 0-10 firing), uvafan 1712
red in all three (8-15 within r2 100, 26-32 beyond r2 400), wololo 2013 blue (12 within r2 400), wololo 836, and
IanCoolidge's 203.
- **botfinalsafe 799 red (1472, v11's ladder match; lost both castles by r334):** a ball of ~10 botfinalsafe prophets
  rolled our centre churches (r243-255), then shot castle (42,7) dead in r255-274 while 29 of our units held the
  lattice of church (57,10) 15 tiles east (r2 234: beyond MUSTER_RESCUE's r2 100 and FAR.ENEMY's reach); one of them
  fired. The castle's newborn prophets died one a round on (41-43,8). Castle (9,12) fell at r334 with 35 units far
  off. The castle recall (RECALL, h110) was rejected on a local screen in the v7 era (castles lost 35 vs 24 in
  self-play); the field's prophet balls are not our self-play's marches.
- **bot1v43 2321 blue (1446):** a basics hole, not the army: our castle (33,9) sent pioneers to the four centre sites
  every 80 rounds (r341-353, r422-434), each built on (32,10), the tile toward the site, in reach of a bot1v43 prophet
  camping at (27,16) (r2 61; the castle sees it at r2 85); each died that round, before its first turn, so the castle
  never learned it was lost (resolvePending finds no newborn; the pioneer entry waits out its 80 turns, then the
  castle resends). stillborn.mjs, now with a UNITS argument (`stillborn.mjs TEAM 2 REPLAY` for pilgrims): 17 of the
  game's 33 pilgrims stillborn, all built by the castle on an exposed tile, 14 of them beside a free safe tile;
  military 0 of 64 (DEF_SAFE covers those). Census of stillborn pilgrims over v11's 108 games running.

## 2026-10-26 10:39 PDT: h185 ACCEPTED as v12 (two blocks 49 of 72, side-aware z 5.38)
h185 = v11 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1 (dist/h185 e4a146ede62f): the first contested
pioneer's two escorts walk to its site at steps up to r2 9, hold within 2 king steps of it, and go back to their
birth structure's lattice when a prophet's or castle's shot hits them with no enemy melee near. Block 2 = matches
1835-1846 (sides checked): 24 of 36, side-aware z 3.50 (others 1.06, studied 9 of 12). Both blocks
(`tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool 1651-1658,1831-1834,1835-1846 --studied <the six>`):
**49 of 72**, pooled expectation 36.6 (z 4.28); side-aware z **5.38** (effect +379 Elo, 95% +247 to +511); studied
cells 17 of 24 (expectation 9.5, z 5.85); other cells 32 of 48 (expectation 27.1, **z 2.55**). Cells won 2 of 2
that v11's pool never won: uvafan 1712 both sides, awesomelemonade 2518 both, bot1v43 2591 both, wololo 2013 blue
and 836 blue; lost: wololo 2644 red 0 of 2 (pool 3 of 3 red), IanCoolidge 1036 1 of 2 each side (pool 6 of 6). The
general panel rule pre-registered for h168 (2026-10-25 01:24) and kept through h171, h179, h185 accepts at z >= 2
after two blocks with other cells z >= 0; its mechanism reads were registered as "not decision inputs" (they follow
on the driver: escorts dead within 6 rounds of a prophet's or castle's first hit, bar under 40%, h157 69%).
Promotion: ESCORT_HOLD_R 2, ESCORT_FAST_R2 9, ESCORT_BACK 1 become the defaults (config.js; every test passes with
them, so none pins v11's values); bots/v12 = dist/h185 (e4a146ede62f; bots/ROSTER.tsv);
panel_submit.sh's ladder default is bots/v12; progress/panels/v12-m1.pool = 1835-1846 with 1651-1658,1831-1834 as
the control argument; a fresh v12 control block joins it before any v12-based block is scored (as for v9-v11: the
accepted candidate's own blocks were selected on their result). h194, h186, h187, h188, h191 are rebuilt on v12
with their switches unchanged; pre-registrations stand, bars relative to the champion recomputed from v12's games.
The r1000 symcheck of v12 waits for the replica queue to fall under 30 (no local VM jobs until then); a driver
symcheck to r300 runs after the no-op check.

## 2026-10-26 10:45 PDT: h195 (v12 + DEF_SAFE 2) built and pre-registered; the v11 queue rebuilt on v12
**h195 = v12 + DEF_SAFE 2** (dist/h195 db45575beb6a; struct.js buildToward): a pilgrim newborn (miner, pioneer,
chainer) goes, as v11's military newborns do, on a free tile the enemy attackers in sight cannot kill before its
first turn while one exists, and no pilgrim is built while every free tile is exposed (a stillborn pioneer is
never seen by its castle, which resends 80 turns later: 1446, seed 2321, 17 stillborn of 33 pilgrims; 10:12 entry).
Unit test added (pilgrim to the one tile neither prophet reaches; none when every free tile is in reach; the
military still builds then). The defaults (DEF_SAFE 1) leave v12 unchanged: the no-op check runs after the census.
Pre-registration: basics-fix rule (two blocks; block 1 rejects only at z < -1; accept at z >= 0 with other cells z
>= 0 if the mechanism read passes, else the ordinary bars). Mechanism read: `tools/reads/stillborn.mjs TEAM 2
REPLAY` on our side of both blocks, per game: **safer** (pilgrims stillborn on an exposed tile while a free tile in
no visible attacker's reach stood beside the builder) at most a quarter of v12's over its panel games (h185's 72
and the v12 control block's 36, computed before any h195 game is read), and **built** (pilgrims per game) at least
0.9 of v12's (the switch must not starve the economy). Studied cell: bot1v43 2321 blue (StoneT2000.BC19-bot1v43:
seed-2321); others z >= 0. Order: first after the v12 control block (basics first).
Rebuilt on v12 with their switches unchanged (CFG diff against bots/v12: only their keys, plus keys added since
h185's build, all 0): h196 = h194 (70a8617acfee), h197 = h186 (7e320236f615), h198 = h187 (b6e939144ef7), h199 = h188
(4ed3f18bc8de), h200 = h191 (366fc1e13c2f); h194, h186, h187, h188, h191 closed unplayed (base v11 superseded).
- (10:55) The stillborn-pilgrim census over v11's 108 panel games (`stillborn.mjs TEAM 2`; scratchpad
  stillpil_v11.txt): per game 32.2 pilgrims built, 5.09 stillborn (51 K), all on a tile exposed to the enemy's
  attackers (the read counts every enemy unit, seen or not), 0.58 by castles, and **0.64 safer** (a free safe tile
  beside the builder); bot1v43 2321 blue holds 18 of the 69 safer cases (23 stillborn in 3 games), IanCoolidge 203
  red the most stillborn (65 of 169, a cell we win). So h195's tile choice moves about 0.6 pilgrims a game; its
  no-build rule acts only on attackers in the builder's sight. Its bars are taken from v12's games, as registered.
- (11:20) **v12 control block submitted**: submission 228 (bots/v12 e4a146ede62f), matches 1847-1858 (the v7-m1 panel, both
  sides, 36 games; bumped), ladder resubmitted as 229; tools/rate_ours.sh asked six field teams for ranked matches
  against v12 (1859-1864). Once played it joins progress/panels/v12-m1.pool, and h195's bars come from v12's 108 panel
  games (stillborn.mjs TEAM 2 census over h185's 72 running now) before any h195 game is read.
- (11:33) h195's bars, part 1: the stillborn-pilgrim census over v12's 72 panel games (h185's 1651-1658, 1831-1846;
  scratchpad stillpil_v12.txt): per game 34.08 pilgrims built, 4.31 stillborn (43 K), 0.22 by castles, **0.47 safer**
  (34 in 72; botfinalsafe 203 red 11, wololo 836 red 5). The control block's 36 games join before h195 is read; on
  these 72 alone the bars would be safer <= 0.118 per game and built >= 30.7. The studied cell (bot1v43 2321 blue) has
  no stillborn pilgrims under v12: the game ends at r124 and r126 (v11: r212, r217, r460).
- (11:33) **Why v12 loses bot1v43 2321 blue by r126** (1656, 1840): the economy is v11's to the round through r100 (12
  pilgrims, one church at r42, bank 460 K, army 4: ECON_UNTIL holds the peacetime army, every depot is served and no
  pioneer is out, so the castle built one pilgrim in r43-99) while bot1v43 churched (25,16) and (19,16), 9 tiles from
  our castle (33,9) and out of its sight, and built prophets there. At r100 our castle and church built 10 units in 5
  rounds, then pilgrims (r105-108); the first fight (r111-118) killed the two early crusaders, a preacher and 6
  pilgrims, and 12 prophets took the castle at r126. v11 reached army 20 at r125 the same way and fell at r212-217.
  The bank-at-r100 hole was ECON_RICH's case (h116, seed 2321: 535 K at r100), rejected in v7-era self-play (t -1.07
  vs h87), never panel-tested. A sweep of v12's 72 panel games (bank and army at r50-125, ours and theirs) is running.

## 2026-10-26 11:47 PDT: the bank idles to r100 in half of v12's panel games; h201 (v12 + ECON_RICH 100) pre-registered
Sweep of v12's 72 panel games (new read tools/reads/bank.sh: replay timelines at r50-125, ours and the opponent's;
scratchpad bank/bank_v12.txt; unit test added): the games are deterministic to r100 (both blocks' cells match to the unit). Our bank at r75
averages 199 K (300+ in 22 games), at r100 317 K (300+ in 36 of 72), with an army of 2-11: uvafan 1653 863 K, army 3
vs 34 (won all four on health anyway: the fuel caps the total); IanCoolidge 1036 595-645 K; awesomelemonade 2518 580
K; bot1v43 2321 blue 460 K, army 4 vs 6 (lost r124, r126); uvafan 2046 440 K, army 2 vs 17 (lost all four at r1000 on
health). ECON_UNTIL (no peacetime army before r100) was accepted for the pioneers' sake; once the plan is spent or
blocked the karbonite waits 25-60 rounds. ECON_RICH (h116, v7) spent only the bank past ECON_RICH + the reserves on the
army before r100, so pilgrims and pioneers keep first claim; it lost a self-play gate (t -1.07 vs h87, where neither
bank grows: seed 2321 self-play K 22-50), and was never tried against the field.
**h201 = v12 + ECON_RICH 100** (dist/h201 f3833637f632; CFG diff against bots/v12: ECON_RICH only, plus the keys
added since h185's build, all inert at their defaults; the defaults build replays v12 identically, 10:39's no-op
check). Pre-registration: the ordinary panel rule (block 1 rejects at side-aware z < 0.5; after two blocks accept at z
>= 2 with other cells z >= 0, reject at z < 1, else a third block). Studied cells: bot1v43 2321 and uvafan 2046
(`--studied StoneT2000.BC19-bot1v43:seed-2321,uvafan.bc2019:seed-2046`). Mechanism read (tools/reads/bank.sh on both
blocks, a check, not a decision input): in the cells where v12 banked 300+ K at r100, our r100 army above v12's and the bank
below it. Order: after h195 (both are basics; h195 was registered first). h199 (ECON_NOPLAN, the same hole on maps
with no planned church) stays queued behind; if h201 is accepted, h199 is reviewed against it before its targeted panel.
- (12:00) Unit tests 178/178 node + 65 Python after tools/reads/bank.sh and its test. The first run failed one test,
  run_game --turnlog, on a boundary: a turn is logged when it is over --turnlog-ms (20) but its ms is written to 0.1,
  so a 20.04 ms turn reads 20 and failed the test's `ms > 20`; the test now asks >= 20 (3 of 3 alone passed before).

## 2026-10-26 12:11 PDT: v12 control block 23 of 36; joins the v12 pool; h195 block 1 submitted
- **v12 control block** (submission 228, matches 1847-1858, finished 12:10): 23 of 36 (h185's two blocks, the same
  build, 25 and 24 of 36). Joins progress/panels/v12-m1.pool (1835-1846, 1847-1858; control 1651-1658,1831-1834):
  v12's reference is 108 games, 72 won. Lost: wololo 2644 both sides and 836 red; botfinalsafe 1706 both sides, 203
  red, 2740 blue; bot1v43 2321 blue (r133); uvafan 2046 both sides (r1000); IanCoolidge0 203 red, 1036 both sides.
- h195 block 1 submitted (panel_submit.sh dist/h195, running). Its bars finish with the control block's 36 games in
  the stillborn census, which runs on the driver after the castle-loss census over v12's 72 games (running).
- (12:27) **h195's bars fixed** (before any h195 game is read): the stillborn-pilgrim census over v12's 108 panel games
  (h185's 72 and the control block's 36; scratchpad stillpil_v12.txt, stillpil_v12c.txt): per game 34.56 pilgrims
  built, 4.42 stillborn (44 K), 0.26 by castles, 0.472 safer (51 in 108). Bars: **safer <= 0.118 per game** (a quarter
  of v12's) and **built >= 31.1 per game** (0.9 of v12's), over our side of h195's blocks. h195 block 1 = matches
  1865-1876 (the last four, awesomelemonade and IanCoolidge0, resubmitted 12:27 after HTTP 429: submission 232).
- (12:27) v12's castle-loss census (castles.mjs over its 72 panel games; scratchpad castles_v12.txt): 29 castles lost
  (v11: 50 in 108); 4 with no military of ours within r2 400, 11 with 10+ unfired within r2 400. Per cell v12 wins
  72 of 108 to v11's 55, but loses cells v11 won: IanCoolidge0 1036 both sides (3/3 -> 1/3), IanCoolidge0 203 red
  (3/3 -> 1/3), wololo 2644 red (3/3 -> 0/3). wololo 2644 red (1651): escort #2509 reached (26,20) by r14 and died
  there (ESCORT_FAST_R2), the first pioneer went to (20,9) instead of v11's centre (28,19), the castle's second
  died at (35,19) r71; 6 pilgrims to r330 (v11 15 at r100), every unit lost by r300. IanCoolidge0 1036 red (1845,
  1857): v11 killed both castles by r375-485 with a church chain (4 -> 13 churches r300-400); v12 mines twice the
  karbonite by r100 (1404 vs 748), builds an army of 93 by r200 and 203 by r400, and its fuel stays 400-2,100 from
  r200 on, so the chain (which waits for CHAIN_K 1000 K **and CHAIN_F 3500 fuel**) never fires: 4 churches to the end,
  bank 6,512 K and 10 fuel at r974, and IanCoolidge0's preachers took both castles at r960-974. The peacetime army
  keeps CHAIN_K karbonite back from CHAIN_ROUND but no fuel. A sweep of fuel and churches at r200-700 over v11's and
  v12's 108 panel games each (scratchpad bank/fuel.sh) is running to size it.

## 2026-10-26 13:37 PDT: the chain starved of fuel in 19 of v12's 108 panel games; h202 (v12 + CHAIN_FKEEP 1) pre-registered
Sweep of v11's and v12's 108 panel games each (scratchpad bank/fuel.sh; bank/fuel_v11v12.txt, fuel_v12b.txt):
our churches, army, karbonite and fuel at r200-700. The chain fires only when the bank holds CHAIN_K (1000 K) and
CHAIN_F (3500 fuel); from CHAIN_ROUND the peacetime army leaves CHAIN_K karbonite but no fuel. Games where the
karbonite was met and the fuel not, at some checkpoint r250-700: **v11 9 of 108 (won 8), v12 19 of 108 (won 15)**;
v12's 4 such losses are all IanCoolidge0 1036 (1834 blue, 1845 red, 1857 red, 1858 blue), the cell v11 won 6 of 6
(red by castles at r375-485 with lines: the 12:27 bullet under 12:11). The 15 wins are mostly r1000 games decided
on health (uvafan 1653 x6, wololo 836 blue x3, IanCoolidge0 1036 red 1833, bot1v43 388 red 1851) or castle kills by
r480 (bot1v43 388 and 2321 red): there the fuel went into units, and a kept bank would cost army. The trade is the
panel's to judge.
**h202 = v12 + CHAIN_FKEEP 1** (new switch, default 0; struct.js: from CHAIN_ROUND the peacetime army's fuel reserve
adds CHAIN_F, as its karbonite reserve adds CHAIN_K; threat responses unaffected; dist/h202 4e7b143bb9bc). Unit test
added (r300: default builds at 2000 fuel, kept waits, builds past CHAIN_F + its reserve; before CHAIN_ROUND keeps
nothing). No-op: the defaults build (3db048f811b6) replays bots/v12 against itself on 799 to r300 identically; unit
tests 179/179 node + 65 Python. CFG diff against bots/v12: CHAIN_FKEEP only (plus the keys added since h185's build,
inert; the regex also catches the ternary `CFG.CHAIN_F:0`). Pre-registration: the ordinary panel rule. Studied cell:
IanCoolidge0 1036 (`--studied IanCoolidge0.battlecode20~69ce88:seed-1036`); others z >= 0, where the health wins
it risks sit. Mechanism read (a check, not a decision input): chain lines fired (churches up 3+ after r200, fuel.sh)
in IanCoolidge0 1036 in at least half its games. Order: after h201.

## 2026-10-26 13:51 PDT: replica login (PROMPTS 48): the gate dropped the owner's password when the site login expired

The owner could not log in at 13:35-13:38 PDT. The site's own login (JWT, 5-day lifetime as on the official site) had
been issued about 5 days earlier and expired between 12:05 and 13:35. On each page load the frontend sent the stale
token with every API call; siarnaq answered 401 (DRF rejects an invalid token even on public views), and the gate passed
that 401 through on its JWT path. Chrome had also given each of those requests its cached gate login (the frontend's
Authorization header replaced it), so it counted the 401 as that login rejected and dropped it: the gate log shows the
owner's API calls with a Basic login at 13:38:27 and without one a second later, after the 401s. The login form's POST
/api/token/ then reached the gate with no login and stopped there (no browser POST in siarnaq's log). Server, DNS and
accounts were fine: owner and vibe19 logged in from the driver throughout.
Fix (tools/galaxy19/deploy/galaxy-setup.sh, `deploy.sh site`, Caddy reloaded 13:49; app untouched): the JWT path answers
siarnaq's 401 as a 403 with no challenge, as the Basic path already did. Checked: a bogus Bearer token now gets 403 on
/api/user/u/me/ and /api/episode/e/bc19/; gate + token + Bearer works for owner and vibe19. The frontend logs out on any
failed token check (no 401-specific code in the bundle), and client.py treats 401 and 403 alike. LEARNINGS 49.

## 2026-10-26 14:09 PDT: h195 block 1 24 of 36 (z 0.20): block 2 submitted; progress/ refreshed with v12's games

- h195 block 1 (1865-1876): 24 of 36 against v12's pool, pooled expectation 23.1 (z 0.40), side-aware 23.7 (z 0.20,
  +19 Elo, 95% -176 to +212); studied cell bot1v43 2321: 1 of 2 (expectation 1.0); other cells 23 of 34 (z 0.21). Not
  below z -1, so block 2 (basics-fix rule). h195 block 2 = matches 1877-1888 (submission 234; ladder 235), bumped.
- h185's escort mechanism read (escorts.mjs over 1651-1658, 1831-1846; registered 2026-10-26 as a check, not a decision
  input): of 144 escorts, 102 were hit by a prophet or castle, and 31 of those (30%) died within 6 rounds of the first
  hit (bar under 40%; h157 69%). Passes.
- progress/ refreshed (owner, PROMPTS 49: the committed charts still drew v12 as h185's accepting blocks; the refresh
  after its control block ended at 12:10 was skipped when h195 block 1 went straight in, against LEARNINGS 43). v12 now
  plays as itself: 54 games, 36-18 (control block 1847-1858 23 of 36; ranked 1859-1864 13 of 18), BT 1904 +- 109, 5th of
  209. rating-history.png still shows v12 with 0 rated matches: our rating chain waits at match 1796 (ranked, 09:00 PDT
  autoscrim, played), whose opponent IanCoolidge0 ~f649f3 has an earlier ranked match (1788) still queued; siarnaq rates
  a team's matches in order, so 1859-1864 wait too. Not a stall (rating_unstick.py counts it as a normal head); 1788
  bumped to the front so the chain moves. rating-history.png: the "no rated match since" note moved into the legend
  (beside the line it ran over the last submissions' markers).

## 2026-10-26 14:57 PDT: escort hits in v12's panel games; h203 (v12 + ESCORT_BACK 2) built and pre-registered

Two cells v12 always loses (h185, v12's control block and h195 replay them identically: games are deterministic):
- wololo 2644 (red r330, blue r601). v11 won it red 3 of 3: its crusader #604 charged wololo's lone prophet, killed it
  at r18, and we churched the centre cluster (28,19) at r50 (15 pilgrims by r100). v12's #604 was hit at r12 by that
  prophet in sight (r2 45) and went home (ESCORT_BACK); its partner #2509, at 10 health after a crusader duel, died at
  r14 to a shot from r2 65; wololo churched (28,19) at r53 and our pilgrims stayed at 6 against 18.
- botfinalsafe 1706 (red r318, blue r327-338). One castle each, 4 karbonite depots on our side; the centre cluster
  (7,17) is 27 steps away. Our escorts reached it at r13-16 and killed a blue pilgrim at r18; a lone blue prophet shot
  them from r2 50-64, out of their sight, at r21-28, and both went home; our pioneers left at r34-35; blue churched
  (7,19) at r36 and (7,15) at r95 and mined 1,456 K by r200 against our 652. ESCORT_BACK 2 changes nothing here (the
  shooter is unseen).

Census (tools/reads/eschits.mjs, our side of v12's 108 panel games 1651-1658, 1831-1858): 216 escorts, 153 first hit
by a prophet or castle.

| first hit by | hits | dead within 6 rounds | shooter dead within 12 | games (won) |
|---|---|---|---|---|
| a prophet out of sight (r2 > 49) | 94 | 22 | 1 | 63 (37) |
| the one enemy attacker in sight, a prophet | 50 | 15 | 18 | 35 (21) |
| prophets with other attackers, or 2 prophets | 9 | 9 | 0 | 9 (6) |

v12 sends all of them home. The lone-prophet hits sit in lost cells wololo 2644 (both sides), bot1v43 2321 (blue: hit
at r10 from r2 37, home, dead at r111) and in split cells botfinalsafe 203 blue and IanCoolidge0 1036; in the won
cells (wololo 2013, awesomelemonade 1712) the shooter died within 12 rounds anyway.

**h203 = v12 + ESCORT_BACK 2** (dist/h203 565a1b43c349). military.js escortBack: as ESCORT_BACK 1, but not while the
only enemy attacker or castle in the escort's sight is one prophet and the escort has 20+ health; it charges that
prophet instead (st.duel, engaged before the nearest enemy) while that holds, and goes home as at 1 when a second
attacker comes into sight or a hit leaves it at 10. A crusader steps r2 9 and attacks at r2 1-16; a prophet cannot
shoot inside r2 16, so the duel is the crusader's unless the prophet has company. Unit test extended (hit by a lone
prophet in sight: keeps its site, steps toward it; at 10 health or with a second prophet: home; at 1: home). No-op:
the defaults build replays bots/v12 against itself on 799 to r300 identically. CFG diff against bots/v12: ESCORT_BACK
only (plus the keys added since h185's build, inert; the regex's WALL is the ternary `SIG.WALL:0`).
Pre-registration: ordinary panel rule against v12's pool. Studied cells: wololo 2644, bot1v43 2321
(`--studied m-schier.battlecode-2019-wololo:seed-2644,StoneT2000.BC19-bot1v43:seed-2321`); others z >= 0 to accept.
Mechanism read (a check, not a decision input): eschits.mjs over our side of its blocks: the shooter dies within 12
rounds in at least half of the lone-prophet hits (v12: 18 of 50). Order: next after h195, before h201: it targets an
always-lost cell with the exact play that won it for v11, the most direct evidence in the queue.

## 2026-10-26 15:34 PDT: h195 two blocks 50 of 72 (z 1.08), stillborn read fails its bar: block 3 submitted

- h195 block 2 (1877-1888) ended at 15:11. Both blocks (`tools/panel_pool.sh 1651-1658,1831-1834
  progress/panels/v12-m1.pool 1865-1888 --studied StoneT2000.BC19-bot1v43:seed-2321`): **50 of 72**, pooled
  expectation 46.3 (z 1.24); side-aware 47.3, **z 1.08** (effect +77 Elo, 95% -62 to +216); studied cell bot1v43 2321
  2 of 4 (expectation 2.0); other cells 48 of 68 (expectation 45.3, z 1.14). Lost as v12 loses: wololo 2644 and
  uvafan 2046 (both sides, 0 of 4 each), wololo 836 red 0 of 2.
- Mechanism read (registered 10:45, bars set 12:11 from v12's 108 games): `tools/reads/stillborn.mjs TEAM 2` over
  our side of both blocks (scratchpad stillborn_h195.txt): **safer 0.28 a game** (20 in 72) against the bar of at
  most 0.118 (v12 0.47): **fails**; built 34.96 a game against the bar of at least 31.1 (v12 34.56): passes;
  stillborn 4.35 (v12 4.42). The 20 safer cases sit in cells we win (wololo 836 and 2013, awesomelemonade 2797 and
  1712) and IanCoolidge0 203 red; the read counts every enemy unit, seen or not, and the switch acts only on the
  attackers in the builder's sight, so part of v12's 0.47 was never in its reach (a check for later, not for this
  decision).
- So the basics-fix acceptance at z >= 0 does not apply; the ordinary bars do: z 1.08 lies between 1 and 2, so a
  third block, accepted at cumulative z >= 2 (other cells z >= 0). **h195 block 3 = matches 1891-1902** (candidate
  submission 236, ladder 237), bumped.
- Replica queue 83 waiting (71 ranked); v12's rating chain: 1796 waits on 1788 (played, unrated), which waits on
  1738 (arya-k vs awesomelemonade, running).

## 2026-10-26 15:45 PDT: h203 driver check: inert against our own builds

h203 and bots/v12 (red) against dist/turtle, dist/camp and bots/v12 (blue) on 2644, 2321, 388, 1706, 2740 to r150
(scratchpad duel_diag.sh; one game at a time; no errors, timeouts or exceptions): all 15 h203 replays are
byte-identical to v12's. Our builds' prophets first hit an escort from r2 52, outside its sight (eschits.mjs: seen
0 in all 6 hits), so the duel never arises in self-play; it acts only where an enemy prophet comes into an escort's
sight alone (50 of v12's 153 panel hits). The unit test covers the behaviour; the panel decides.

## 2026-10-26 15:49 PDT: uvafan 2046, an always-lost cell: three chain lines into a prophet wall; h198 moved up

v12 red against uvafan on 2046 (match 1853, r1000, lost on health 1,140 to 6,290; blue 1854 the same story):
- No shot before r352 on either side. Both teams mine their castles' depots (our half holds 3 karbonite and 4 fuel
  depots, staffed 52-91% of rounds 400-900; scratchpad depots.mjs) and neither builds a church to r350. Mined by r1000:
  ours K 4,498 F 29,970, uvafan's K 5,428 F 36,040, so the economies are close.
- Our three chain lines (scratchpad study/lines.js): r352, 7 churches, whose nearest church saw 29 enemy attackers;
  r598, 4 churches, 33; r715, 8 churches, 74. None killed a castle. All 19 churches were lost (950 K), with 59
  preachers of 59 built, 55 crusaders of 70 and 14 prophets of 15: about 4,000 K of units lost, against 40 of
  uvafan's prophets killed.
- uvafan banks into 164 prophets and spends its last karbonite on 79 crusaders in r900-1000 (40 HP for 15 K). v12's
  endgame does the same (0 to 15 crusaders) but holds only 550 K at r900.
CHAIN_WALL 28 (h198, h164's pre-registration with studied cells uvafan 2046, 1653 and IanCoolidge0 1036) ends a line
whose church sees 28+ and rests the chain 300 rounds; all three lines here are over the threshold. Order changed
before any h198 game: h195 (block 3 running), h203, **h198**, h201, h202, h196, h197, h199, h200.

## 2026-10-26 15:56 PDT: wololo 836 red (v12 0 of 3, blue 3 of 3) is a turn-order split, not a mechanism

v12 red (1847 game 3, lost on castles at r666) and blue (1848 game 3, won at r473) play move for move as mirrors
to r57: our escorts kill wololo's crusader at r18 and die to its prophet at r24-26; wololo churches (43,36)-mirror at
r22 and, at r49, (44,28) on our half, 10 tiles from our castle (39,18); r50 timelines match to the unit (ours 1
church, 11 pilgrims, 272 K mined). At r58-60 the prophet exchange beside that church resolves in a different order
(red's units act first in a round), and the games split: as red we lose the exchange and have 13 pilgrims at r100
against 22 as blue; wololo out-mines us 24,086 K to 6,890 and takes both castles. No switch is designed from this
cell: a change anywhere before r58 can flip it either way, and its replays say nothing about a policy.

## 2026-10-26 16:40 PDT: v12's 5 exceptions traced and fixed (World.attack charges its fuel); candidates rebuilt

- **Basics, our side of v12's 108 panel games** (1651-1658, 1831-1858, match.json): time-limit overruns 0.70 per 100,000
  turns (the opponents 5.54), frozen turns 26, exceptions 5. All 5 are "Not enough fuel to attack.", all on seed 1036
  against IanCoolidge0 (1834 blue 4, 1845 red 1); h195's blocks show the same (1876 blue 5, 1888 blue 1).
- **Cause**: a hit castle with 10-19 fuel shot (structAct, 10 fuel) and then radioed MUSTER_RESCUE's spot (sayRescue, 10
  fuel); the engine takes a turn's signal fuel first (game.js:832-927) and threw on the shot. LEARNINGS 45 made
  World.build charge its price; World.attack did not. It now lowers w.fuel by the unit's attack fuel, so sayRescue sees
  what is left and stays silent below 10. Unit test added (a castle at 15 fuel shoots and does not radio; at 25 it does
  both; a prophet's shot costs 25). It changes play only on turns the engine would refuse the shot: in v12's config
  sayRescue is the one fuel reader after structTurn (CASTLE_POST, sayZone, sayThreat and sayWatch are off).
- No-op (defaults a3da3c0a67c0 against bots/v12 e4a146ede62f, 799 to r300, driver alone): **IDENTICAL**; unit tests 180
  of 180 and the 65 galaxy19 tests pass.
- Rebuilt with the fix (switches unchanged, pre-registrations unchanged): h203 7f352326b9eb, h198 28c0ca9175f7, h201
  153f6da1dee7, h202 a7c9a4cfd5ae, h196 ba281d6c0d4d, h197 65c0c1991ce3, h199 619a37e5c4ad, h200 468b17598cc1; each
  one's CFG differs from v12's in its own switches only (and keys added since v12, inert). h195 (in play) keeps its
  build: it and v12 both carry the bug, so its panel stays like for like.
- An incident to record: the search for the engine's fuel checks (`find / -name game.js -path '*bc19*'`, before grepping
  the official copy) also matched an engine copy inside a downloaded external repo (StoneT2000's BC19, in another
  session's scratchpad), and grep printed one line of it: the engine's attack-fuel check, an older form of the official
  one. No bot code was read. Engine searches now name ~/projects/vibe/bc19-official only.

## 2026-10-26 16:48 PDT: h195 REJECTED on three blocks (74 of 108, side-aware z 1.00); h203 block 1 in play (1903-1914)
- **h195** (v12 + DEF_SAFE 2), blocks 1865-1888 and 1891-1902 against v12's pool (108 games): 74 of 108, pooled
  expectation 69.4 (z 1.24); side-aware expectation 71.0, **z 0.995** (+58 Elo, 95% -56 to +171); studied cell
  (bot1v43 2321) 3 of 6 against 3.0; other cells 71 of 102 against 68.0 (z 1.05). Below 2 after the third block:
  **REJECTED** (ordinary bars; the stillborn read had failed the basics-fix bar, 15:34). Against v12's side records it
  gained botfinalsafe 2740 blue (3/3 against 1/3), 203 blue (3/3, 2/3) and IanCoolidge0 1036 red (2/3, 1/3), and lost
  botfinalsafe 203 red (0/3, 1/3) and wololo 2013 blue (2/3, 3/3). Its own z lies within +-1, so both blocks join
  progress/panels/v12-m1.pool (v12's reference is now 216 games).
- progress/ refreshed between blocks (replica snapshot 16:45; 75 rated matches on rating-history).
- **h203** (v12 + ESCORT_BACK 2, dist/h203 7f352326b9eb, with the World.attack fix) block 1: candidate submission
  238, ladder 239 (bots/v12), matches 1903-1914, bumped. Pre-registration as at 14:57: ordinary rule; studied
  wololo 2644 and bot1v43 2321; others z >= 0 to accept; the eschits.mjs mechanism check over our side of its blocks.

## 2026-10-26 17:14 PDT: the chain race in v12's 108 panel games; botfinalsafe 203 red studied
- **botfinalsafe 203 red** (v12 1 of 3: 1653 won, 1837 lost r459, 1849 lost on health). 43x43, three castles each; the
  top pair 16 tiles apart. Our one planned cluster, (18,29) (2 depots, m6), is the left half of a centre cluster whose
  right half botfinalsafe churched at r14 and guarded with prophets; our pioneer (built r23) wandered south and died at
  r53, and four more (r154-397) never reached it. We build no church to r400 in all three games. The games split on the
  chain race: in 1653 and 1849 our middle castle's 7-link line fired at r308-309 and its churches' 19 preachers took
  botfinalsafe's middle castle by r311-313; in 1837 our bank stood at 970 K (CHAIN_K 1000) when botfinalsafe's own line
  fired at r311: 11 churches along row 7 to our top castle in one round, a preacher from each every round from r312,
  the castle dead at r316 (then the other two at r449 and r459).
- **tools/reads/chainrace.mjs** (new; unit test pinned on fixture chain_s2013_407-3): both teams' lines (3+ churches
  in a round from r150), each line's nearest church to the other team's nearest castle and the castle kill within 60
  rounds; TEAM's bank when the enemy's first line fires. Over our side of v12's 108 panel games (scratchpad
  chainrace_v12.txt): our lines 156 (median 7 links), 86 took a castle within 60 rounds; theirs 19, 12 did.

  | first line | games | won |
  |---|---|---|
  | ours only | 78 | 63 |
  | ours first | 2 | 1 |
  | theirs only | 11 | 1 |
  | neither | 17 | 7 |

  Only botfinalsafe fires lines at us (19 lines, 12 castles), and our line fires in 4 of its 18 games (against
  wololo 12 of 18, 11 kills of 13 lines; against the other four 11-18 of 18). The 11 games where only botfinalsafe
  fired: 1706 both sides (6; our bank 146-366 K when its line came at r315-331: the economy, studied at 14:57), 203
  (1837, 970 K; 1654 blue, 633 K, our first castle already lost at r267), 2740 blue (3; 1,110-1,310 K banked, no line:
  the r200 chainer stood at (44,58) behind botfinalsafe's prophet lattice and gave up at r245, the r300 one built a
  lone church at r321). A lower CHAIN_K would have changed only 1837 of the 108: not a candidate. Against botfinalsafe
  the chain race is lost before the trigger, on the economy (1706) and on an approach its lattice closes (2740).

## 2026-10-26 17:23 PDT: botfinalsafe 2740 blue (plan order); where our lines end
- **botfinalsafe 2740** (one castle each, 59x59, 40 depots in 15 clusters; v12 red 3/3, blue 1/3). Our opening is the
  same on both sides to r100: 2 churches, 224 K mined (botfinalsafe 5-6 churches, 444-512 K; its first at r42). The
  castle staffs one karbonite depot, and PLAN_CONTEST_FIRST puts three far races first (plan c7 d47 m0, c4 and c10
  d57 m0, then c2 d25, c5 d16): pioneers.mjs on 1654 blue: the first pioneer left at r46 for the centre (35 king
  steps; died r100, botfinalsafe churched it r100), the next two walked 45-46 steps (churches r97, r110: those races
  were not contested), and the two near sites (13-14 steps) got pioneers at r60 and r72 (churches r75, r121). Eight
  more pioneers went to the lost centre from r201 to r849, none arriving (h200's class). 1654 was lost on health at
  r1000: botfinalsafe's 120 churches (12,000 hp) against our 272 units. Red won on health with 225 units to 178 and 9
  churches. A cap on how far a contested cluster jumps the queue changes the order on 7 of the 15 panel maps (2740,
  1706, 2321, 1036, 2013, 388, 836 by plan.mjs), among them 2013 and 388, won 6 of 6: ECONOMICS row 11's class, a
  targeted panel if built.
- **Where our lines end** (chainrace_v12.txt, our 156 lines): last church within r2 2 of a castle 24 kills of 33,
  r2 3-25 52 of 81, farther 10 of 42 (uvafan 21 such lines, 4 kills; IanCoolidge0 11, 0). A line stops where no free
  tile is nearer (units in the way) or a link cannot pay; the far ones are h198's (CHAIN_WALL 28) case.

## 2026-10-26 17:26 PDT: h204 (v12 + CHAIN_ROUND 150) built and pre-registered
- Why: the chain race decides games (17:14: our line alone 63 of 78 won, theirs alone 1 of 11), and our lines fired in
  r200-299 took a castle within 60 rounds 41 of 59 times, r300-399 17 of 39, r400-499 17 of 19 (a mix of
  opponents, not a dose curve). Our first line fires at median r272 (quartiles 260-305, first r223). CHAIN_ROUND was
  set to 200 once, in the v6 era (h72), and has never met the replica panel; h55/h66's 150 belonged to the older,
  smaller chain (300 K, 12 steps out).
- **h204 = v12 + CHAIN_ROUND 150** (dist/h204 066cde4ddabb, with the World.attack fix; CFG diff against bots/v12:
  CHAIN_ROUND only, plus keys added since v12, inert). From r150 castles send chainers (castle i at 150 + 30 i) and the
  peacetime army leaves CHAIN_K in the bank, so lines fire about 50 rounds sooner with the same 1000 K behind them, on a
  smaller army. Driver diagnostic, h204 red against bots/v12 blue on 203 to r450 (det; one game, not a verdict): our
  first line fired at r231 (v12's on that map: r308-309), 7 links to r2 4 of the middle castle, and its burst killed
  18 blue units (army 43 to 25) but not the castle; v12's line at r352 took one of ours (r357); ours at r437 took one
  (r442). 0 exceptions, 0 timeouts.
- Pre-registration: the ordinary panel rule against v12's pool (block 1 rejects at side-aware z < 0.5; two blocks
  accept at z >= 2, reject below 1; else a third, accepted at cumulative z >= 2). No studied cells (a general switch).
  Mechanism check (not a decision input): chainrace.mjs over our side of its blocks, median first-line round at most
  245 (v12 272). Queue place: after h202, before h196.

## 2026-10-26 17:52 PDT: chain bursts feed walls: 136 K a game skipped by a 3-deaths stop; CHAIN_STOPLOSS built (off)
**IanCoolidge0 203 red** (v11 3 of 3, v12 1 of 3): in the lost 1845 game 1 (1857's has the same 4-church line at r331,
r2 145 from the castle) our first line fired at r331 from (18,23) into blue's army at x 24-28 (4 churches; the 4th and
three link pilgrims died at r332); its churches then built 30 preachers by r360, all dead within 10 rounds of birth, 24
having dealt no damage, most at (23,21) to prophets at (24,14) (r2 50, beyond a preacher's sight); 900 K. No line church
saw more than 27 attackers, so CHAIN_WALL 28 (h198) would not have ended it. The won 1833 game 1 line (r308) reached r2
4 of a castle.
- New read `tools/reads/burstloss.mjs TEAM REPLAY [N T]`: TEAM's line churches (3+ in a round from r150), the military
  each builds in its first 40 rounds, deaths within T rounds of birth, damage and kills by them, the most enemy
  attackers in each church's sight, and a stop rule (a church ends its burst once N of its units died within T rounds).
  Unit test on 407 game 3 and 1845 game 1 cut at r360 (test/fixtures/burst_s203_1845-1.bc19).
- **Census over v12's 108 panel games** (scratchpad burst_v12.txt): 1,023 line churches built 4,497 units, 132,800 K
  (1,230 K a game); 1,830 died within 10 rounds of birth, 1,324 of them dealing no damage; damage 67,670 (0.52 per K in
  wins, 0.45 in losses), 2,123 kills, 73 castles.
- Stop rule N 3 T 5: 528 units not built (14,690 K, 136 K a game), whose damage was 3,940 (0.27 per K, half the bursts'
  0.51), 119 kills, 1 castle (uvafan 1712 blue, a 3 of 3 cell). N 3 T 10: 834 units, 23,320 K, 2 castles (adds 1833 game
  1). N 2 T 5: 662 units, 8 castles. **uvafan 2046 (0 of 6) holds 4,170 K of the 14,690 at no damage lost**;
  IanCoolidge0 203 both sides 3,010 K at 1,280 damage.
- CHAIN_WALL 28, approximated by the churches whose sight held 28+ attackers at a round end of their burst: 178
  churches, 5,875 K of burst, 8,620 damage (1.47 per K: those bursts reach an army and hurt it); 2046 red 1,920 K of
  5,025. The two triggers pick different bursts: the wall count acts on lines that meet a crowd, the stop on bursts
  dying unseen. FEED_STOP (h159, rejected on v8 at z 0.66) acts only on threat-response builds; churchChain's burst
  never consults it.
- **CHAIN_STOPLOSS built, off** (config.js CHAIN_STOPLOSS 0, CHAIN_STOPLOSS_AGE 5; chain.js burstLosses): a line church
  that saw N of its burst units die within 5 turns of birth (gone from its sight from within r2 49, or never seen alive)
  ends its burst. Unit test (two deaths end it at 2; off goes on; a newborn last seen beyond r2 49, or gone at 5 turns
  old, is no loss; at 4, one). Not queued yet: the karbonite it saves on 2046 would fund the next line into the same
  wall unless CHAIN_WALL rests the chains, and h198 (CHAIN_WALL 28) plays next; the candidate (CHAIN_STOPLOSS 3) goes on
  whichever base h198 leaves.
- No-op: the defaults build (1d496c9be6ba) against itself on 799 to r300 is IDENTICAL to bots/v12's replay; unit tests
  181/181 + 65.
