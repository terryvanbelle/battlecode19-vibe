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
