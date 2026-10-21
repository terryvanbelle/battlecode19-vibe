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
