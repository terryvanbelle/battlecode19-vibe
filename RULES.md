# RULES.md — Battlecode 2019 ("Crusade"), checked against the engine

Engine: npm `bc19` 0.4.7 (`engine/node_modules/bc19`, integrity-pinned in `engine/package-lock.json`). Sources cited as
`game.js:N`, `action_record.js:N`, `runtime.js:N`, `vm.js:N`, `starter/js_starter.js:N` (= the `battlecode` module bots
import), `specs.json`. The official specs page is `battlecode19/app/src/views/docs.js` (repo github.com/battlecode/battlecode19).
Where the specs and the engine disagree, the engine wins and the difference is marked **[engine]**.

## 1. Game, rounds and turn order

- Two teams, RED (0) and BLUE (1). Each starts with 1–3 Castles, 100 Karbonite and 500 Fuel (specs.json; `game.js:49-50`).
- Up to 1000 rounds (`MAX_ROUNDS`). A round is one pass through the robot queue. The queue starts with the castles
  alternating red, blue, red, blue... (`game.js:321-333`). **A robot built during a round is appended to the queue and
  acts in that same round** (`game.js:461`, `action_record.js:253`).
- At the start of every round each team gets +25 Fuel (`TRICKLE_FUEL`, `game.js:747-753`).
- Win conditions, `Game.isOver` (`game.js:537-613`), checked before every turn, in this order:
  1. a team none of whose robots initialised loses (both: coin flip, code 4; one: code 3);
  2. a team with no castles loses (code 0); both none: coin flip (code 2);
  3. at round 1000: more castles wins (code 0), then **more total health of all initialised robots**, structures
     included (code 1), then a coin flip (also recorded as code 1, a quirk at `game.js:604`).
  Only robots whose code initialised count, for castles and for health (`game.js:551-560`). The specs page mentions
  karbonite as a tiebreak; the code counts health **[engine]**.

## 2. Map

- Square, 32–64 tiles (`game.js:77`), generated from a seed by cellular automata, then mirrored (`game.js:293-307`):
  **every map is symmetric across one midline**, either horizontal (`y -> h-1-y`) or vertical (`x -> w-1-x`), 50/50.
  Castles mirror the same way. Map corpus: `maps/corpus.tsv` (3000 seeds; 2895 valid, 1419 H / 1476 V; castles per team
  1: 1211, 2: 1183, 3: 501).
- Some seeds generate no castles (seed 7, 20, 24...): such a game ends at round 0 by coin flip. Use only valid seeds.
- Passable map, karbonite map and fuel map are known to every robot **on its first turn only**
  (`game.js:728-730`; `js_starter.js` `_do_turn`) — copy them then.
- Resources sit in clusters; every castle is the seed of a cluster (`game.js:195`). Clusters nearer the midline hold
  more depots (`game.js:229-230`). Same-team castles are ≥ 16 Manhattan apart (`game.js:182`); castles are 3+ rows from
  the map edge and ≥ 8 rows from the midline in the generator's frame (`game.js:170`).
- Every passable tile is connected (`game.js:335-359`: maps with more than one region are regenerated).

## 3. Units (`specs.json`)

| | Castle | Church | Pilgrim | Crusader | Prophet | Preacher |
|---|---|---|---|---|---|---|
| Cost K / F | — | 50 / 200 | 10 / 50 | 15 / 50 | 25 / 50 | 30 / 50 |
| HP | 200 | 100 | 10 | 40 | 20 | 60 |
| Vision r² | 100 | 100 | 100 | 49 | 64 | 16 |
| Move r² (speed) | — | — | 4 | 9 | 4 | 4 |
| Fuel per r² moved | — | — | 1 | 1 | 2 | 3 |
| Attack r² | 1–64 | — | — | 1–16 | **16–64** | 1–16 |
| Damage | 10 | — | — | 10 | 10 | 20 |
| Attack fuel | 10 | — | — | 10 | 25 | 15 |
| Splash r² | 0 | — | — | 0 | 0 | **3** |
| Carry K / F | — | — | 20 / 100 | 20 / 100 | 20 / 100 | 20 / 100 |

- Movement: one move of any (dx, dy) with dx²+dy² ≤ speed to a passable, unoccupied tile; it may jump over walls
  (`game.js:913-921`). The engine does not check visibility; the starter API refuses moves and attacks to tiles the
  robot cannot see. An illegal action throws: the turn keeps its signal and castle talk but does nothing else.
  The engine never emits the TIMEOUT action (7); an over-clock robot simply does nothing that turn. Fuel cost = r² × fuel-per-move (`action_record.js:281`).
- Attack: any tile with r² inside the attack band (`game.js:923-930`), visible to the attacker (`js_starter.js`).
  **Attacking an empty tile is legal and costs fuel.** Damage hits every robot within the splash r² of the target tile,
  **friend or foe, including the attacker's own team** (`action_record.js:289-317`). Preacher splash r² 3 = the 3×3
  square around the target.
- Units at 0 HP are removed at once (`action_record.js:301-313`).
- **Reclaim**: the attacker that kills a non-structure gets floor((carried K + half its K cost) / r²) karbonite and
  floor(carried F / r²) fuel, capped by its own carry capacity (`action_record.js:304-310`). (Splash kills use the r²
  from the attacker to each victim.)
- Castles can attack (r² 1–64, 10 damage, 10 fuel). Churches cannot.

## 4. Economy

- **Mining**: a pilgrim on a depot tile mines +2 Karbonite or +10 Fuel into its own cargo (cap 20 K / 100 F), paying 1
  team Fuel (`action_record.js:213-225`). Depots never deplete.
- **Deposit**: `give` to an adjacent Castle or Church adds the cargo to the team's stores (`action_record.js:263-266`).
  Giving to any other robot transfers cargo, capped by the receiver's capacity, excess lost. **Giving to an enemy
  structure deposits into the enemy's stores.**
- **Build**: castles/churches build pilgrims and combat units on an adjacent passable empty tile; pilgrims build churches
  (`game.js:883-900`). Costs come out of the team stores at once (`action_record.js:249-254`).
- **Trade**: castles may propose karbonite/fuel barters; a trade executes when both teams' last offers match
  (`action_record.js:228-247`). Not something an opponent will usually accept.
- Every action that costs fuel needs the team's stores to cover it at that moment; a turn's signal cost is charged
  before its action (`game.js:832-844`).

## 5. Communication

- **Radio**: `signal(value, r²)`: a 16-bit value to every robot (either team) within r² of the sender, costing
  ceil(√r²) Fuel (`action_record.js:329`). Receivers see it on **their next turn** together with the sender's id and
  position (`game.js:675, 696-706`), not its team (unless visible). The signal stays attached to the sender until its
  next turn. Max r² = 2·63² (`game.js:834`).
- **Castle talk**: `castleTalk(value)`: 8 bits, free, visible to all own castles anywhere (`game.js:677-682, 710`).
  Castles see every friendly robot (id, castle_talk; no position unless visible or radioing) (`game.js:671-710`).
- A newborn's first turn sees signals sent by robots in their latest turns (including its builder's same-round signal
  if the builder acted before it, which it always has).
- A team cannot tell friend from foe for a radioing robot outside vision; messages must be authenticated if it matters.

## 6. Compute (the "bytecode" of this year)

- Each robot runs in its own vm2 sandbox (`vm.js`). Chess clock: **100 ms at creation, +20 ms every turn**
  (`runtime.js`; `game.js:759`). A turn's wall time is charged to the clock (`game.js:805`).
- **Clock < 0: the robot is frozen** — its turns produce no action until the clock is positive again
  (`game.js:806-807`). A single turn longer than **200 ms** (`TURN_MAX_TIME`) is killed by vm2 and does nothing (`vm.js:6`).
- Initialisation (compiling the bot inside the sandbox) must finish within the initial clock (100 ms) or the robot never
  acts (`runtime.js:24-38`). Keep the bundle small and the module top level cheap.
- Timing is wall clock: it depends on the machine and its load. Our runner reports per-team mean/max turn time, slow
  turns (> 20 ms), timeouts and freezes. Budget target: mean < 5 ms, max < 50 ms on the games VM.
- Memory is not enforced in 0.4.7 (the check in `vm.js:16-21` is commented out).

## 7. What a robot sees each turn (`game.js:667-736`)

- `getVisibleRobots()`: robots within vision (full info: id, team, unit, x, y, turn, signal if radioable,
  castle_talk only for own castles' viewer) plus robots outside vision whose radio reaches it (id, x, y, signal; no
  team, no unit). Castles additionally see every friendly robot (id, team, turn, castle_talk; no position unless in
  vision/radio). The list order is shuffled each turn (engine `Math.random`).
- `getVisibleRobotMap()`: ids within vision, 0 empty, −1 outside vision.
- Own health, karbonite, fuel, clock time: only on `this.me`. Enemy HP is never visible.
- Team stores `this.karbonite`, `this.fuel` are global and current at the start of the turn.

## 8. Replays

- File = 2 bytes (winner, win_condition) + 4 bytes seed + 8 bytes per robot-turn (`action_record.js:35-117`): signal,
  signal radius, castle talk, action and its parameters. No logs, no clock data. The full state is recovered by
  re-simulating from the seed (`game.js:781`, `tools/replay.js`). **Castle talk and signals are in the replay**: they are
  the telemetry channel that survives contest games.

## 9. Languages

JavaScript runs natively (bundled by rollup, `compiler.js:91-113`). Java (JSweet) and Python (Transcrypt) are transpiled by
a web service: the stock compiler posts the source to `battlecode.org/compile` (`compiler.js:10`). **We never use that
URL**; field bots in Java or Python are transpiled by our local copy of `battlecode19/transpiler`. Our bot is JavaScript.
