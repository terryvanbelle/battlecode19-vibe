# HANDOFF.md — state and how to run things

## State (2026-10-23 12:47 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v7** (`bots/v7` = h87, ROSTER.tsv); frozen history v0-v7, sparring
  partners `bots/rush`, `bots/rush4`, `dist/turtle` (prophets only, never attacks), `dist/camp`. Games run built
  bundles (`tools/build_bot.js`), never the source directory. Every candidate change is a CFG switch whose default is
  the incumbent; candidates are built from src with their own `--cfg KEY=JSON` only into `dist/hN` and gated against
  dist/h87 (= bots/v7). No-op check after every code change: a defaults-only build replays h87 vs h87 on 799 to r300
  (--det) IDENTICAL, with nothing else running on the driver (a replay census beside it froze a castle's turn and
  the replay parted, 2026-10-23 08:4x; LEARNINGS 13).
- v7 = h87 = v6 + h82's economy switches (ECON_UNTIL 100, PIONEERS_TEAM 6, PEACE_RESERVE_K 60, PLAN_VALUE 10,
  DEF_RESERVE_K 30) + h76's church chain from round 200 (CHAIN_ROUND 200, STAGE 15, END_R2 2, K 1000, F 3500, MIX
  [5], KEEP 1, SAFE 1): gate vs h50 20 cells +14 -5, t 2.06, ACCEPTED 00:30 2026-10-23 (unit tests of older
  switches pin v6's values: testPreV7). v6 = h50 = v5 + PIONEER_RESERVE 2 + MARCH_MASK 8 (only crusaders obey attack
  orders before ATTACK_LATE 900), ACCEPTED 08:00 2026-10-22.
- **VM queue** (`~/jobq`: the runner takes pending jobs in locale `sort` order of their names; gates run from the
  shadow tree ~/projects/vibe/2019-next: rsynced tools/ and test/, bots/dist/engine/maps linked to the main tree,
  outputs in the main tree's out/). Gates at par 2 while saturn runs its 6 slots (8 vCPUs; owner, PROMPTS 18). Now:
  **h116**'s gate running (...19r, pre-registered 09:40), then **h118** (...19s, 10:38),
  with field-aimed bars (look at D 12; accept t >= 2 with the mechanism, reject t <= -1, else a replica panel). Done:
  h121 REJECTED 12:47 (t -0.28, first church 4.4 rounds earlier, bar 5), h115 REJECTED 11:58 (t 0.58, mechanism opposite: fuelEnd 3.5 times h87's in r1000 games, karbonite binds),
  h114 REJECTED 11:24 (t -1.63, churches built 312 vs 400), h113 REJECTED 10:38 (t -1.73), h112 (t 0.71 -> replica panel, waiting), h111 (t 0.82
  -> replica panel), h110 REJECTED 09:20 (t -1.73, castles lost 35 vs 24).
  The 21 stale v6-era jobs are in ~/jobq/superseded (PROMPTS 22-24; `tools/move_stale.sh` does such moves now).
  Next job name ...19t. The locale sort ignores punctuation, so ...19qa runs before ...19q and ...19r: a longer
  name jumps the queue, used on purpose only while the shorter one is already running (h121's ...19qa).
- **Replica panels** (progress/panels/v7-m1.json: h82-b1's maps against six field bots, wololo, botfinalsafe, bot1v43,
  uvafan, awesomelemonade, IanCoolidge0 ~69ce88): **v7** measurement 420-425 (submission 99, the control, 6/18);
  h96 (v7 + ATTACK_LATE 1001) block 1 426-431 **REJECTED** 08:35 (net -3); **h104** (v7 + ATTACK_ROUND 1001 +
  ATTACK_LATE 1001: no general attack; submission 102) block 1 432-437 **REJECTED** 10:47 (net 0);
  **h103** (v7 + ESCORT 2 + ESCORT_UNIT 3; submission 104) block 1 438-443 final: gained 3, lost 2, net +1, t 0.45 ->
  block 2 due; **h111** (v7 + SAFE_BUILD 2; submission 106) block 1 616-621, queued behind the autoscrim's ranked
  matches (bumped to the front at 12:41: tools/bump_ours.sh --ours; 127 waiting); **h112** (DEF_SEEN 1) block 1 not yet requested. h103's block 2 and h112's block 1
  go in once fewer than 30 wait: submit, scrim `--panel
  progress/panels/v7-m1.json`, resubmit bots/v7, add the submissions.tsv row. Reading: `contest19.py fetch --new`,
  then `contest19.py compare 420-425 <block>` by the two-block rule. v7 against v6 (414-419: 3 wins in 18) and h82
  (408-413: 5 in 18); rerun the economy, composition and stillborn censuses on v7's
  games. Sides alternate per game (420/426/438 list the opponent first, 432 vibe19). The ladder's vibe19 is submission
  107 (= bots/v7), rated first (1711 at 06:00).
- **Candidates in hand** (from v7's replica losses and the field censuses, TRAINING_LOG 07:39-10:38): **h112** = v7 +
  DEF_SEEN 1 (threat responses count only defenders that see the attacker; gate t 0.71, mechanism met narrowly ->
  replica panel when the queue is short); **h116** = v7 + ECON_RICH 100 (before ECON_UNTIL the bank past 100 K + the
  reserves builds the army: v7 banked 245-863 K at r75/r100 in 10 of 18 field games, army 0-3); **h118** = v7 +
  PIONEER_HOLD 64 + PIONEER_LEAN 3 (a pioneer waiting at its site talks CT.WAIT, castles keep the church in the bank;
  after 3 turns it builds without DEF_RESERVE_K: 603 such waiting turns in v7's 18 field games, 356 in 420-3; h117 =
  the hold alone, parked). h116, h118 are gating (above); h121 rejected 12:47; h119 (PIONEER_CALL) waits for a replica panel (no local build triggers it). Parked: h117, h109 (SAFE_BUILD 1: blocked chain
  launches, worse in 2 of 4 cells), h108 (RECALL before the fix), h102 (PIONEER_DETOUR 50: inert), h98 / h99
  (MIL_ROTATION null / [4]), h105 = dist/turtle and h106 (the prophet doctrine lost every self-play test, TRAINING_LOG
  04:22). Open: 1036 (57x57): IanCoolidge0 had 26 pilgrims at r100 and 39 at r200 to our 14 and took the shared and
  our-side bottom clusters; we built no church between r53 and the chain at r310. Field census (09:55): the field's
  pilgrims outnumber ours 1.2-4.9x at r76-100 by standing on more tiles beside more structures (StoneT2000 7-9 by r100
  to our 1-5); 1,119 pioneer turns held by enemy attackers within r2 100 (the held case: h59, h78, h88 all failed).
- Closed on 2026-10-23 (TRAINING_LOG, progress/ATTEMPTS.md): h114 REJECTED 11:24 (CHAIN_GUARD 1: t -1.63); h104 REJECTED on the replica 10:47 (no general attack: net
  0); h113 REJECTED 10:38 (CHAIN_CLEAR 2: t -1.73); h110 REJECTED
  09:20 (RECALL 30: t -1.73); h96 REJECTED on the replica 08:35; h100 REJECTED 08:14 (ESCORT_FIRST 1: D-48 look t -0.29); h107 FAILED 06:46 (DEF_FAR_UNIT 3: t -1.89, D 7,
  mechanism missed, castles lost 34 vs 26); h101 FAILED 03:50 (MELEE_BACK 2: t -0.63, mechanism 0.78 vs bar 0.75);
  h97 and h91 deliveries FAILED; h87 ACCEPTED as v7; h82 superseded; h88 REJECTED; h64 inconclusive, not extended.
- Field evidence for the next candidates: in replica losses 92% of our lost crusaders never fired, and 950 of 1,018
  unfired melee deaths were in our own half (prophets hit from r2 64, beyond a crusader's vision 49; TRAINING_LOG
  01:45, 02:20); the strong bots mass prophets and win on health while our marches feed them (417-1, uvafan on
  2046, level economy: our crusaders and preachers fired 0 shots, health 680 vs 5,470; TRAINING_LOG 06:51); ~76 of
  our units died stillborn in 24 losses (campers in reach of our build tiles, 414-1 / 414-3; 05:37); squatters and a
  round-3 prophet on contested sites stall our pioneers (419-2, 410-1).
- Replica operations (ACCESS.md, tools/galaxy19/README.md): saturn runs 6 execute slots, a 10800 s wall limit per
  game, a 3 GB heap and a 64 MB semi-space per game, keeps a match's finished games across attempts, and passes
  run_game.js --fast-init --fast-view (same game byte for byte). The autoscrim is held while 30+ matches wait and
  fires at most once per 24 h (relay.py fire-jobs). **Watch the queue every check-in** (`field.py queue`); while it
  is long, clearing it comes before local work (owner, PROMPTS 17). Dropped (owner, PROMPTS 21): Nydroam.BatteredCod,
  IvanGeffner.BC19-bot6b, IvanGeffner.BC19-eigthbot. The benchmark field: 92 entrants, 89 compiled (BENCHMARK.md).
- Game hygiene: tools/run_game.js re-runs itself inside `unshare -rn` (no network) and records `net_isolated`.
  Gate jobs run `--fast-turn --fast-init --no-kill --fast-view` (same replays under --det, about half the wall time;
  the replica keeps the kill). Never time on the driver (LEARNINGS 13); time audits run on the VM under the
  replica's flags. VM work goes through the sequential job queue `tools/jobq.sh`; beside a batch at most one extra
  game process (LEARNINGS 8). Kill stray processes by PID (LEARNINGS 14).
- Older findings (v3-v6: fuel freezes after the r450 march, church chains and bombs, pilgrim stalls and orphans,
  pioneer giving-up, idle on safe depots) are in TRAINING_LOG by date and in LEARNINGS.

## Commands
```
tools/unit-tests.sh                                   # after every change
node tools/build_bot.js src/bot dist/dev              # minified single-file bundle that games run
node tools/symcheck.js --bot dist/dev --seeds 1,2,3 --rounds 200   # side-symmetry check (VM)
node tools/run_game.js --red src/bot --blue bots/v0 --seed 2 --replay r.bc19 --logs l.jsonl   # one game
node tools/replay.js summary r.bc19                  # also: rounds, unit --id, board --round, events, nav, talk, threat, fire, timeline
node tools/basics.js --team red r.bc19               # basics battery
node tools/dlv.js [--from R --to R] [--seeds a,b] rp_dlv_hN/*.bc19   # delivery numbers per batch replay, SUM per label a/b
source tools/vm.sh && ensure_vm && vm_sync           # push code to the VM
gssh 'cd ~/projects/vibe/2019 && ~/bin/node tools/batch.js --a dist/dev --b bots/v1 --random 24 --par 6 --timescale 2 --out ~/runs/results.jsonl --replays ~/runs/replays --tag X'
node tools/summarize.js results.jsonl ; node tools/paired.js results.jsonl --cand H1 --ctrl H2
node tools/build_bot.js src/bot dist/h7 --cfg ATTACK_PERSIST=1   # a candidate: incumbent + one switch
gssh 'cd ~/projects/vibe/2019 && bash tools/jobq.sh add "node tools/batch.js ..."; bash tools/jobq.sh status'
tools/snapshot.sh v1 "note"                          # freeze an accepted build
python3 -I tools/galaxy19/field.py queue              # replica backlog (owner: a long queue makes clearing it the priority)
python3 -I tools/galaxy19/contest19.py scrim --vs A,B --panel progress/panels/X.json   # a panel block on recorded maps
python3 -I tools/galaxy19/contest19.py fetch --new    # download our finished replica matches
python3 -I tools/galaxy19/contest19.py compare 420-425 432-437   # control vs candidate block, per cell, t = net/sqrt(D)
tools/move_stale.sh JOB...   # VM jobq: pending -> superseded (--back undoes); auto-approved; never starts the VM
```
