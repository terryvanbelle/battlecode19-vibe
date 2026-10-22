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

## 2026-10-21 19:20 — field study: how the strong replica bots spend fuel; queue reordered
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

## 2026-10-21 19:45 — h24 (economy first), pre-registered
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
