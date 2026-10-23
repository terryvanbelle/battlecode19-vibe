# HANDOFF.md — state and how to run things

## State (2026-10-23 09:20 PDT)
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
  **h112**'s gate running (...19n), then **h113** (...19o), **h114** (...19p), **h115** (...19q), all pre-registered
  at 09:04 with field-aimed bars (look at D 12; accept t >= 2 with the mechanism, reject t <= -1, else a replica
  panel). Done: h111 (t 0.82 -> replica panel), h110 REJECTED 09:20 (t -1.73, castles lost 35 vs 24).
  The 21 stale v6-era jobs are in ~/jobq/superseded (PROMPTS 22-24; `tools/move_stale.sh` does such moves now).
  Next job name ...19r (never a longer name such as ...19ga: the locale sort ignores punctuation and puts it before
  ...19g).
- **Replica panels** (progress/panels/v7-m1.json: h82-b1's maps against six field bots, wololo, botfinalsafe, bot1v43,
  uvafan, awesomelemonade, IanCoolidge0 ~69ce88), matches 420-427 running or done at 07:26: **v7** measurement 420-425
  (submission 99, the control); h96 (v7 + ATTACK_LATE 1001) block 1 426-431 **REJECTED** 08:35 (net -2, best case -1);
  **h104** (v7 + ATTACK_ROUND 1001 + ATTACK_LATE 1001: no general attack; local gate t 1.00, D 4, mechanism missed)
  block 1 432-437 (submission 102); **h103** (v7 + ESCORT 2 + ESCORT_UNIT 3: crusader escorts for overdue pioneers;
  local gate 21-19, D 1 in 20 cells) block 1 438-443 (submission 104); **h111** (v7 + SAFE_BUILD 2; local gate t
  0.82, D 6, mechanism met) block 1 616-621 (submission 106; queued behind the autoscrim's 172 ranked matches, fired
  08:35-09:10: about 12-15 h). When they finish: `contest19.py fetch --new`, then `contest19.py compare 420-425 432-437`,
  `... 438-443` and `... 616-621` by the two-block rule. No new replica requests while 30+ wait. v7 against v6
  (414-419: 3 wins in 18) and h82 (408-413: 5 in 18); rerun the economy, composition and stillborn censuses on v7's
  games. Sides alternate per game (420/426/438 list the opponent first, 432 vibe19). The ladder's vibe19 is submission
  107 (= bots/v7), rated first (1711 at 06:00).
- **Candidates in hand** (all from v7's replica losses, TRAINING_LOG 07:39, 07:52, 08:15): **h112** = v7 + DEF_SEEN 1
  (threat responses count only defenders that see the attacker; 422-3: single prophets at r2 61 shot our castle to
  death unseen by 42 units behind it; driver diagnostic: as blue on 2013 it won where h87's blue loses); **h113** = v7
  + CHAIN_CLEAR 2 (no chain line while the chainer sees 2+ enemy units; census: such lines kept 4 of 44 churches);
  **h114** = v7 + CHAIN_GUARD 1 (the guard quota does not wait for CHAIN_K; the army stood still r200-400 in 5 of 9 v7
  field games); **h115** = v7 + ENDGAME_FUEL 900. All four are gating (above). Parked: h109 (SAFE_BUILD 1: blocked chain launches, worse in
  2 of 4 cells), h108 (RECALL before the fix), h102 (PIONEER_DETOUR 50: inert), h98 / h99 (MIL_ROTATION null / [4]),
  h105 = dist/turtle and h106 (the prophet doctrine lost every self-play test, TRAINING_LOG 04:22). Open: 1036
  (57x57): IanCoolidge0 had 26 pilgrims at r100 and 39 at r200 to our 14 and took the shared and our-side bottom
  clusters; we built no church between r53 and the chain at r310.
- Closed on 2026-10-23 (TRAINING_LOG, progress/ATTEMPTS.md): h100 REJECTED 08:14 (ESCORT_FIRST 1: D-48 look t -0.29); h107 FAILED 06:46 (DEF_FAR_UNIT 3: t -1.89, D 7,
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
