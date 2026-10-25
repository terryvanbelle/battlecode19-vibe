# HANDOFF.md — state and how to run things

## State (2026-10-24 22:24 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v8** (`bots/v8` = h128, bots/ROSTER.tsv); frozen history v0-v8,
  sparring partners `bots/rush`, `bots/rush4`, `dist/turtle` (prophets only, never attacks), `dist/camp`. Games run
  built bundles (`tools/build_bot.js src/bot dist/hN --cfg KEY=JSON ...`, one --cfg per key), never the source
  directory. Every candidate change is a CFG switch whose default is the incumbent.
- No-op check after every bot code change: a defaults-only build replays the champion against itself on 799 to r300
  (--det --seed 799 --max-rounds 300 --timescale 100 --init-ms 5000 --fast-turn --fast-init --fast-view --no-kill; the
  default 100 ms init fails on the driver, and timescale 10 freezes robots when anything else runs) IDENTICAL to
  h128's replay, with nothing else running on the driver (LEARNINGS 13); then `tools/unit-tests.sh`.
- v8 = h128 = v7 + ESCORT_FIRST 2, ESCORT_MIRROR 1, ESCORT_UNIT 3 (two crusaders hold the enemy's mirror image of our
  first contested site), ACCEPTED 06:41 2026-10-24 on the replica panel: three blocks 23 of 54 against the pooled
  16.1, z 2.54 (escort tests pin v7's values: testPreV8). v7 = h87 = v6 + h82's economy switches + h76's church
  chain, ACCEPTED 2026-10-23 00:30 (testPreV7 pins v6's values).
- **Acceptance** (TRAINING_ALGORITHM step 6-7, §4; LEARNINGS 32, 33): a local screen vs the champion only rejects
  (20 cells, par 2; from h154 on: t <= -1.5, castles lost at sign-flip p < 0.05, or an exception the champion lacks,
  printed by `tools/paired.js --h2h` as its verdict; it replaced t <= -1 and the 1.1x castles ratio, audit 2026-10-24,
  same verdicts on h145-h151); the replica panel accepts by the pooled side-aware z: block 1 reject at z < 0.5; two
  blocks accept at z >= 2, reject at z < 1, else a third block at z >= 2.
- **VM disk** (LEARNINGS 40): every check-in reads `df -h /` on the VM and keeps 2 GB free. It filled on 2026-10-24
  18:29-19:23 PDT (saturn's runs and Postgres failed; 3 GB freed by `apt-get clean` and deleting 94 decided screens'
  out/rp_* directories; v8-era rp_h145v8-rp_h151v8 kept). Prune a screen's out/rp_* once its candidate is decided.
- **VM queue** (`~/jobq`; the runner takes pending jobs in locale `ls | sort` order; gates run from the shadow tree
  ~/projects/vibe/2019-next: rsynced tools/ and test/, bots/dist/engine/maps linked to the main tree, outputs in the
  main tree's out/). Gates at par 2 while saturn runs its 6 slots (owner, PROMPTS 18). Screen job template: see
  ~/jobq/done/...19zzzzzzzzzzzzzzzzzzzzzzz.sh (h148). Last job name ...19 + 32 z's; the next adds a z.
  Nothing runs on the VM queue. symcheck on bots/v8 to r1000 mirrors on seeds 1, 2, 3, 2321 (job ...1000symb, TRAINING_LOG
  17:33); symcheck past a few hundred rounds never runs on the driver (LEARNINGS 13).
  **Held for the replica queue (TRAINING_LOG 2026-10-24 10:08):** saturn runs 8 slots and no gate runs; five screens
  wait in ~/jobq/superseded, named to run in this order (26 z's + y..., then 28-30 z's): h160 (ECON_NOPLAN 1; 26 z's + y;
  the five no-plan maps both sides, 10 games; TRAINING_LOG 15:32), h162
  (ATTACK_ONE 1; 26 z's + yyy; 37000; both TRAINING_LOG 18:45), h155 (ESCORT_HOLD_R 2; 32000), h154 (ESCORT_HOLD_R 2 + ESCORT_EARLY 1;
  31000), h156 (INTERCEPT_R2 64 + INTERCEPT_DWELL 3; 33000); h163's screen deleted 20:54 (inert against v8,
  TRAINING_LOG 20:54). Stay in superseded/: h159 (FEED_STOP 3;
  26 z's; REJECTED 19:01 on the panel), h152 (CHAIN_LIVE 1 + WATCH 2; 29000) and h153 (WATCH 2 + SPOT_MASK 56; 30000)
  (DROPPED 11:31: WATCH rejected as h150; h153 never reads the spots).
  When fewer than 30 replica matches wait (no waiter since the 12:52 reap: the check-ins watch `field.py queue`): GALAXY_EXECUTE_SLOTS=6 in
  tools/galaxy19/deploy/galaxy-setup.sh (saturn's cap MAX_EXECUTE_SLOTS stays 8, the unit's MemoryMax 27G),
  `tools/galaxy19/deploy/deploy.sh env`, `tools/galaxy19/deploy/deploy.sh app` (saturn's exc_caught / slow_logged
  keys and the fail-closed sandbox.sh of 2026-10-24, tried on the VM under saturn's unit settings; and saturn slots
  that survive spool errors, spool.release, of 19:58: until then a full disk kills slot threads, and only
  `sudo systemctl restart bc19-galaxy-saturn` brings them back, as at 19:54),
  `sudo systemctl restart bc19-galaxy-saturn`, then `tools/move_stale.sh --back`
  the five jobs h160, h162, h155, h154, h156 (h157's and h164's screens deleted 22:20 and 22:39: they play the panel).
  Screens passed: h148 (CHAIN_LIVE 1; +3 -0, t 1.73, castles 35 vs 39), h149 (CHAIN_LIVE 2; +3 -3, t 0.00, 35 vs 34),
  h150 (WATCH 2; +8 -3, t 1.51, 24 vs 38). Rejected: h151 (CHAIN_FAILS 1; +1 -3, t -1.00, 31 vs 19).
  Read: rsync out/hN_v8.jsonl, `node tools/paired.js out/hN_v8.jsonl --h2h` (t, castles lost and the verdict).
- **Replica panels** (progress/panels/v7-m1.json: six field bots, wololo, botfinalsafe, bot1v43, uvafan,
  awesomelemonade, IanCoolidge0 ~69ce88, three maps each). Ladder build: bots/v8 (submission 171, resubmitted after each block). Play a block with
  `tools/panel_submit.sh dist/hN "message"` (submits, scrims each opponent twice, NAME@+ and NAME@-, so the block's 36
  games play every cell on both sides (in v8's blocks red wins about 13 points more often within a cell; the raw
  61% / 31% split of TRAINING_LOG 11:58 mixes in which cells drew which side: LEARNINGS 37); resubmits $LADDER =
  bots/v8, bumps; retries what the hourly limit refuses (HTTP 429, about 20 requests an hour) every 15 min; a lock
  keeps blocks apart); add the
  tools/progress/submissions.tsv row. Read: `contest19.py fetch --new --pages 6` (one page misses slow matches), then
  for v8-based candidates `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool BLOCK...`, for v7-based ones
  `tools/panel_pool.sh 420-425 progress/panels/v7-m1.pool BLOCK...`; decide on its side-aware z (it refuses a block
  with a match unfinished); a rejected block joins its pool file only when its own z lies within +-1.
  The rule's false-accept rate and power: `python3 -I tools/galaxy19/panelsim.py 726-731 progress/panels/v8-m1.pool`
  (TRAINING_LOG 12:55: 7% neutral; 45 / 70 / 85% at +1 / +1.5 / +2 wins per 18 games).
  v7-based panels (read for the idea, not acceptance): h139 (ECON_RICH 150) 706-711 + 732-737 z 1.96 against v7
  (h145 on v8: 750-755 z 0.00, REJECTED; the line closes), h141 (church strike) 738-743 REJECTED (z 0.43), h140 (early
  fast pioneer) 744-749 REJECTED (z -0.24; won awesomelemonade 2518). v8-pool blocks 1: h146 (v8 + church strike) 758-763 REJECTED (z -1.98; the strike line closes),
  h147 (early fast centre pioneer) 764-769 REJECTED (z 0.34; won 2518, 2321, 203; lost IanCoolidge0 2644: the pioneers had no money after an early rush, TRAINING_LOG 09:25), h148 (CHAIN_LIVE 1) 777-782 + 967-972 + 973-984 REJECTED 14:17 (35 of 72, side-aware z 1.02; block 1 z 2.20 was luck; the CHAIN_LIVE line closes); h149 (CHAIN_LIVE 2) 955-960 REJECTED (z 0.28), h150 (WATCH 2) 961-966 REJECTED (z -0.37) (TRAINING_LOG 11:28).
  h159 (FEED_STOP 3) 985-996 + 997-1008 REJECTED 19:01 (33 of 72, side-aware z 0.66; young share in losses 42% vs
  v8's 55%: the switch acts, no games move; TRAINING_LOG 19:01).
  h161 (FUEL_DEFER 60) 1011-1022 REJECTED 21:36 (14 of 36, side-aware z -1.17; not pooled; TRAINING_LOG 21:38).
  **In play: h162 (v8 + ATTACK_ONE 1, dist/h162 88a7474abd7a): block 1 = matches 1023-1034** (submission 176, v8
  back as 177; TRAINING_LOG 18:45, 21:38). Score with `tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool
  1023-1034` once all 12 finish: block 1 reject z < 0.5, else a second block. No studied cell. Mechanism read (not a
  decision input): `tools/census.js` attack_split on our side (bar: none).
  **Next, one block at a time:** h157 (v8 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9, dist/h157 a5eba191475e; screen
  dropped, driver diagnostics instead; studied cells wololo 2013, 2644, 836, bot1v43 2591, botfinalsafe 1706 with
  `--studied` as in TRAINING_LOG 12:51; mechanism read scratchpad econ/esc_matches.sh BLOCK: both first escorts within 2
  steps of their site 20 rounds after birth in half the studied games, v8 0 of 5; TRAINING_LOG 22:20, 22:43), `tools/panel_submit.sh dist/h157 "cand:h157"`. If h157 is
  accepted, h165 (h157 + ESCORT_EACH 2, ECONOMICS row 7, dist/h165 feb35bd6487b; rebuild on the new champion; general
  panel, no studied cell; TRAINING_LOG 22:33) follows it; if not, row 7 closes. Then
  (ECONOMICS.md, TRAINING_LOG 20:54) h163 (v8 + MUSTER 1, dist/h163 f0fbe3ea6c0e;
  studied cells uvafan 1712, awesomelemonade 1712, 2797, 2518), `tools/panel_submit.sh dist/h163 "cand:h163"` on the
  general panel against the v8-m1 pool. ECONOMICS rows 4 and 6 dropped on censuses (TRAINING_LOG 21:22); row 5
  (DEPOSIT_AT) dropped unbuilt: h161's pioneers came 8 rounds earlier, its first churches no earlier (TRAINING_LOG 22:10). Then CHAIN_WALL 28 (row 8) as h164 (dist/h164
  96cae5a62d0f), screen dropped; studied cells uvafan 2046, 1653, IanCoolidge0 1036 (`--studied` as in TRAINING_LOG
  22:39; the driver's 1653 cost is v8's own fuel starvation).
  **Waiting for the queue (< 30): h160 (v8 + ECON_NOPLAN 1, dist/h160 15b40f6fac46) on the targeted panel**
  progress/panels/noplan-m1.json (the six bots on the five pool maps where no castle plans a church; TRAINING_ALGORITHM
  §4 map-conditional switch): first a bots/v8 control block (`PANEL=progress/panels/noplan-m1.json
  tools/panel_submit.sh bots/v8 "v8 control, noplan-m1"`), then `PANEL=... tools/panel_submit.sh dist/h160 "..."`;
  panelsim on the design before h160's first block is scored (> 10% false accepts: a second control block first);
  score with `contest19.py pool CONTROL progress/panels/noplan-m1.pool BLOCK...` (TRAINING_LOG 15:32).
- **Never-won panel cells** (LEARNINGS 33): wololo 2013, 836; botfinalsafe 1706 (h139 won it once); awesomelemonade
  2518; uvafan 2046; bot1v43 2591. Studies: botfinalsafe 1706 (castles idle r33-93, the centre cluster lost); wololo
  2013 (church-beside-church preacher fights from r97). TRAINING_LOG 2026-10-24 02:52, 03:48.
- **Candidates parked**: h158 (HOP_GAIN 4: a church asked on 3 of 15 maps, TRAINING_LOG 14:14), h119 (PIONEER_CALL; no local build triggers it), h117, h109, h108, h102, h98/h99, h105,
  h106. Closed lines: SIEGE (h135-h138), the v7 stacks h142/h143, ECON_RICH (h116, h139/h145, h144).
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
- Replica operations (ACCESS.md, tools/galaxy19/README.md): saturn runs 6 execute slots (8 while the queue clears), a 10800 s wall limit per
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
node tools/replay.js summary r.bc19                  # also: rounds, unit --id, board --round, events, nav, talk, threat, fire, timeline, moves, young
node tools/basics.js --team red r.bc19               # basics battery
node tools/dlv.js [--from R --to R] [--seeds a,b] rp_dlv_hN/*.bc19   # delivery numbers per batch replay, SUM per label a/b
source tools/vm.sh && ensure_vm && vm_sync           # push code to the VM
gssh 'cd ~/projects/vibe/2019 && ~/bin/node tools/batch.js --a dist/dev --b bots/v1 --random 24 --par 6 --timescale 2 --out ~/runs/results.jsonl --replays ~/runs/replays --tag X'
node tools/summarize.js results.jsonl ; node tools/paired.js results.jsonl --cand H1 --ctrl H2
node tools/build_bot.js src/bot dist/h7 --cfg ATTACK_PERSIST=1   # a candidate: incumbent + one switch
gssh 'cd ~/projects/vibe/2019 && bash tools/jobq.sh add "node tools/batch.js ..."; bash tools/jobq.sh status'
tools/snapshot.sh v1 "note"                          # freeze an accepted build
python3 -I tools/galaxy19/field.py queue              # replica backlog (owner: a long queue makes clearing it the priority)
(echo 'DRY = True'; cat tools/galaxy19/rating_unstick.py) | gssh 'sudo bc19-galaxy-manage shell'   # stalled rating chains (heads on QUE/RUN are normal)
python3 -I tools/galaxy19/contest19.py scrim --vs A,B --panel progress/panels/X.json   # a panel block on recorded maps
python3 -I tools/galaxy19/contest19.py fetch --new    # download our finished replica matches
python3 -I tools/galaxy19/contest19.py compare 420-425 432-437   # control vs candidate block, per cell, t = net/sqrt(D)
tools/move_stale.sh JOB...   # VM jobq: pending -> superseded (--back undoes); auto-approved; never starts the VM
```
