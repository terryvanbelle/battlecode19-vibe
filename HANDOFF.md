# HANDOFF.md — state and how to run things

## State (2026-10-24 09:4x PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v8** (`bots/v8` = h128, bots/ROSTER.tsv); frozen history v0-v8,
  sparring partners `bots/rush`, `bots/rush4`, `dist/turtle` (prophets only, never attacks), `dist/camp`. Games run
  built bundles (`tools/build_bot.js src/bot dist/hN --cfg KEY=JSON ...`, one --cfg per key), never the source
  directory. Every candidate change is a CFG switch whose default is the incumbent.
- No-op check after every bot code change: a defaults-only build replays the champion against itself on 799 to r300
  (--det --seed 799 --max-rounds 300 --timescale 10 --init-ms 5000 --fast-turn --fast-init --fast-view --no-kill; the
  default 100 ms init fails on the driver) IDENTICAL to h128's replay, with nothing else running on the driver
  (LEARNINGS 13); then `tools/unit-tests.sh`.
- v8 = h128 = v7 + ESCORT_FIRST 2, ESCORT_MIRROR 1, ESCORT_UNIT 3 (two crusaders hold the enemy's mirror image of our
  first contested site), ACCEPTED 09:3x 2026-10-24 on the replica panel: three blocks 23 of 54 against the pooled
  16.1, z 2.54 (escort tests pin v7's values: testPreV8). v7 = h87 = v6 + h82's economy switches + h76's church
  chain, ACCEPTED 2026-10-23 00:30 (testPreV7 pins v6's values).
- **Acceptance** (TRAINING_ALGORITHM step 6-7, §4; LEARNINGS 32, 33): a local screen vs the champion only rejects
  (t <= -1, or castles lost above 1.1x the champion's; 20 cells, par 2); the replica panel accepts by the pooled
  rule: block 1 reject at z < 0.5; two blocks accept at z >= 2, reject at z < 1, else a third block at z >= 2.
- **VM queue** (`~/jobq`; the runner takes pending jobs in locale `ls | sort` order; gates run from the shadow tree
  ~/projects/vibe/2019-next: rsynced tools/ and test/, bots/dist/engine/maps linked to the main tree, outputs in the
  main tree's out/). Gates at par 2 while saturn runs its 6 slots (owner, PROMPTS 18). Screen job template: see
  ~/jobq/done/...19zzzzzzzzzzzzzzzzzzzz.sh (h145). Last job name ...19 + 22 z's (h147); the next adds a z. Now:
  h145 (v8 + ECON_RICH 150) screen passed (t 1.00, castles 30 vs 34); screens vs bots/v8 for **h146** (v8 + church strike STRIKE_R2 36,
  PREACHER_SELF 4, PREACHER_MIL 2.5; 23000), **h147** (v8 + PIONEER_EARLY 6, HOLD 64, LEAN 3, FAST 1; 24000).
  Read: rsync out/hN_v8.jsonl, `node tools/paired.js out/hN_v8.jsonl --h2h`, castles from out/dlv_gate_hN.txt on the
  VM (awk on columns 18-19, a = candidate).
- **Replica panels** (progress/panels/v7-m1.json: six field bots, wololo, botfinalsafe, bot1v43, uvafan,
  awesomelemonade, IanCoolidge0 ~69ce88, three maps each). Ladder build: submission 149 = bots/v8. Play a block with
  `tools/panel_submit.sh dist/hN "message"` (submits, scrims, resubmits $LADDER = bots/v8, bumps; retries what the
  hourly limit refuses (HTTP 429, about 20 requests an hour) every 15 min; a lock keeps blocks apart); add the
  tools/progress/submissions.tsv row. Read: `contest19.py fetch --new --pages 6` (one page misses slow matches), then
  for v8-based candidates `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK...`, for v7-based ones
  `tools/panel_pool.sh 420-425 progress/panels/v7-m1.pool BLOCK...`; rejected blocks join their pool file.
  v7-based panels (read for the idea, not acceptance): h139 (ECON_RICH 150) 706-711 + 732-737 z 1.96 against v7
  (carried by **h145**: v8-pool block 1 = 750-755, beside its screen), h141 (church strike) 738-743 REJECTED (z 0.43), h140 (early fast
  pioneer) 744-749.
- **Never-won panel cells** (LEARNINGS 33): wololo 2013, 836; botfinalsafe 1706 (h139 won it once); awesomelemonade
  2518; uvafan 2046; bot1v43 2591. Studies: botfinalsafe 1706 (castles idle r33-93, the centre cluster lost); wololo
  2013 (church-beside-church preacher fights from r97). TRAINING_LOG 2026-10-24 04:1x, 06:2x.
- **Candidates parked**: h119 (PIONEER_CALL; no local build triggers it), h117, h109, h108, h102, h98/h99, h105,
  h106. Closed lines: SIEGE (h135-h138), the v7 stacks h142/h143, ECON_RICH 100/250 (h116, h144).
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
  the replica keeps the kill: vm2's 200 ms per-turn limit, TRAINING_LOG 13:30). Never time on the driver
  (LEARNINGS 13); time audits run on the VM under the replica's flags, with `run_game.js --turnlog FILE` (each turn
  over --turnlog-ms 100: robot, unit, turn, ms, clock bank). VM work goes through the sequential job queue `tools/jobq.sh`; beside a batch at most one extra
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
