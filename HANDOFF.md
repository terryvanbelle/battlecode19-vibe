# HANDOFF.md — state and how to run things

## State (2026-10-25 22:24 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v11** (`bots/v11` = h178, bots/ROSTER.tsv); frozen history v0-v11,
  sparring partners `bots/rush`, `bots/rush4`, `dist/turtle` (prophets only, never attacks), `dist/camp`. Games run
  built bundles (`tools/build_bot.js src/bot dist/hN --cfg KEY=JSON ...`, one --cfg per key), never the source
  directory. Every candidate change is a CFG switch whose default is the incumbent.
- No-op check after every bot code change: a defaults-only build replays the champion against itself on 799 to r300
  (--det --seed 799 --max-rounds 300 --timescale 100 --init-ms 5000 --fast-turn --fast-init --fast-view --no-kill; the
  default 100 ms init fails on the driver, and timescale 10 freezes robots when anything else runs) IDENTICAL to
  bots/v11's replay, with nothing else running on the driver (LEARNINGS 13); then `tools/unit-tests.sh`.
- v11 = h178 = v10 + DEF_SAFE 1 (a structure's military newborn goes on a free tile the enemy attackers in sight
  cannot kill it on before its first turn, while one exists), ACCEPTED 20:50 2026-10-25 under the basics-fix rule: two
  blocks 1427-1438 + 1441-1452, 36 of 72, side-aware z 0.00 (exactly), others z 0.11; stillborn safer 2.68 a game
  (v10 11.60, bar 2.90; build-placement tests pin v10's values: testPreV11).
- v10 = h175 = v9 + MUSTER_RESCUE 100 (a structure hit in its last 3 turns radios the nearest attacker in sight; held
  crusaders whose home lies within r2 100 engage), ACCEPTED 15:26 2026-10-25 under the basics-fix rule: two blocks
  1391-1402 + 1403-1414, 37 of 72, side-aware z 0.40, others z 0.74; idle-held castle losses 0.042 a game (v9 0.287;
  MUSTER 2 hold tests pin v9's values: testPreV10).
- v9 = h167 = v8 + MUSTER 2 (against enemy prophets camping out of a structure's reach, the peacetime army builds
  crusaders held on rings 2-4 from home, never released: health for the round-1000 tiebreak), ACCEPTED 07:24
  2026-10-25 on the replica panel: two blocks 1120-1131 + 1143-1154, 38 of 72, side-aware z 2.78, others z 2.40
  (MUSTER 1 release tests pin v8's values: testPreV9). v8 = h128 = v7 + ESCORT_FIRST 2, ESCORT_MIRROR 1, ESCORT_UNIT 3
  (testPreV8 pins v7's values); v7 = h87 (testPreV7 pins v6's).
- **Acceptance** (TRAINING_ALGORITHM step 6-7, §4; LEARNINGS 32, 33): a local screen vs the champion only rejects
  (20 cells, par 2: t <= -1.5, castles lost at sign-flip p < 0.05, or an exception the champion lacks, printed by
  `tools/paired.js --h2h` as its verdict); the replica panel accepts by the pooled side-aware z: block 1 reject at
  z < 0.5; two blocks accept at z >= 2 (other cells z >= 0), reject at z < 1, else a third block at z >= 2. The
  basics-fix rule (h170, fixed 2026-10-25 04:26): two blocks, block 1 rejects only at z < -1; accept at z >= 0
  (others z >= 0) if the mechanism reads pass, else the ordinary rule.
- **VM disk** (LEARNINGS 40): every check-in reads `df -h /` on the VM and keeps 2 GB free (2.4 GB at 18:24 on
  2026-10-25; 2.5 GB at 16:26 after deleting ~/.gradle/daemon/7.6/daemon-*.out.log: 651 logs of Aug 27-Sep 1, before this project,
  277 MB; 2.2 GB before). Prune a screen's out/rp_* once its candidate is decided; next candidates if needed: the
  journal (155 MB, `sudo journalctl --vacuum-size=50M`), /var/log (243 MB).
- **VM queue** (`~/jobq`; the runner takes pending jobs in locale `ls | sort` order; gates run from the shadow tree
  ~/projects/vibe/2019-next: rsynced tools/ and test/, bots/dist/engine/maps linked to the main tree, outputs in the
  main tree's out/). Screen job template: ~/jobq/done/...19zzzzzzzzzzzzzzzzzzzzzzz.sh (h148). Last job name ...19 +
  32 z's; the next adds a z. Nothing runs on it. v9 passed symcheck to r1000 on seeds 3, 1, 2, 2321 (job
  ...1000symv9, out/sym_v9_r1000.log, TRAINING_LOG 2026-10-25 08:24); v10 passed it too (job
  ...1000symv10, out/sym_v10_r1000.log, TRAINING_LOG 2026-10-25 21:02) and v11 (job ...1000symv11,
  out/sym_v11_r1000.log, TRAINING_LOG 2026-10-25 22:23); symcheck past a few hundred rounds never runs on the driver
  (LEARNINGS 13). **Saturn stays at 8 slots (TRAINING_LOG 2026-10-24 22:54):** candidates go straight to the replica
  panel (driver diagnostics as the pre-filter); the VM screens retired. In ~/jobq/superseded, not run: h160, h156,
  h159, h152, h153. Deploy saturn only between panel blocks (`tools/galaxy19/deploy/deploy.sh app`, then `sudo
  systemctl restart bc19-galaxy-saturn`; a restart retries every running game).
  Read a screen: rsync out/hN_v9.jsonl, `node tools/paired.js out/hN_v9.jsonl --h2h`.
- **Replica panels** (progress/panels/v7-m1.json: six field bots, wololo, botfinalsafe, bot1v43, uvafan,
  awesomelemonade, IanCoolidge0 ~69ce88, three maps each). Ladder build: bots/v11 from the v11 control block on
  (`tools/panel_submit.sh` resubmits $LADDER, default bots/v11, after each block). Play a block with
  `tools/panel_submit.sh dist/hN "message"` (submits, scrims each opponent twice, NAME@+ and NAME@-, so the block's 36
  games play every cell on both sides (red wins about 13 points more often within a cell: LEARNINGS 37); resubmits
  the ladder build, bumps; retries what the hourly limit refuses (HTTP 429) every 15 min; a lock keeps blocks apart);
  add the tools/progress/submissions.tsv rows. Read: `contest19.py fetch --new --pages 6`, then for v11-based
  candidates `tools/panel_pool.sh 1427-1438 progress/panels/v11-m1.pool BLOCK... [--studied ...]` (it refuses a
  block with a match unfinished); a rejected block joins the pool file only when its own z lies within +-1. The
  pool file holds h178's block 2 (1441-1452) and, once played, the v11 control block: v11's reference is then 108
  games (as v10's 1391-1426: TRAINING_LOG 2026-10-25 15:26, 15:51, 17:05; v11: 20:50). The rule's false-accept rate and power: `python3 -I
  tools/galaxy19/panelsim.py CONTROL POOLFILE`. Decided panels: progress/ATTEMPTS.md and TRAINING_LOG (v8 era:
  h145-h151, h157, h159, h161-h163 rejected; h167 accepted; v9 era: h170 rejected, h175 accepted; v10 era: h178
  accepted).
  **Replica queue (22:23): 4 waiting (all ranked), 8 running.** While 30+ wait: no local VM jobs, our blocks one at a time and bumped to
  the front (`tools/bump_ours.sh --ours`), the autoscrim held (TRAINING_LOG 2026-10-25 09:12).
  **In play: the v11 control block = matches 1455-1466** (submission 204, requests 712-723; ladder 205; waiter
  scratchpad wait_block.sh 1455 1466): it joins progress/panels/v11-m1.pool before any v11-based block is scored.
  After it, `tools/panel_submit.sh` runs `tools/rate_ours.sh` on every control block (PROMPTS 44: the 6 field teams
  rated just below us challenge the new ladder build, ranked; our team cannot ask, being #1); v11's ran by hand at
  21:54, requests 724-729. Refresh progress/ (`tools/progress-refresh.sh`) once the control block is in, never
  during it: rating-history and ELO.md then show v11 with games of its own.
  h178 was accepted as v11 (two blocks 1427-1438 + 1441-1452; TRAINING_LOG 2026-10-25 20:50); h175 as v10; h170
  rejected (1379-1390, z -1.71).
  **Then, one block at a time** (each keeps its predecessor's pre-registration; bars relative to the champion are
  recomputed from v11's panel games (1427-1452 and its control block) before the candidate's block is read; TRAINING_LOG
  2026-10-25 15:51; each candidate below is its v10 predecessor's switches rebuilt on v11, 20:50):
  h184 (= h183 on v11: v11 + PIONEER_EARLY 6 + PIONEER_OPEN 7 + PIONEER_RACE 2, dist/h184 a78b4d8603e8: a turn-6 pioneer to the
  first planned cluster we reach 7+ king steps before the enemy; in a team with none, a castle whose plan opens with
  a race (m <= 1: 2518, 2591) sends its turn-3 pioneer there; replaces h177, closed unplayed; ordinary rule; studied
  cells wololo 836, 2013, botfinalsafe 1706, awesomelemonade 2518, bot1v43 2591; mechanism read pioneers.mjs (the
  r<=6 pioneer churches in 2/3+ of firing-map games); TRAINING_LOG 2026-10-25 15:45, 15:51, 17:56);
  h189 (v11 + TAKEN_SEEN 1, dist/h189 bca186cf7eb6: a pioneer that sees an enemy church or castle within EXPAND_SEEN 5
  of its site reports it taken whatever EXPAND_ROUND, and its castle frees the slot; replica 1421, seed 1712;
  TRAINING_LOG 2026-10-25 20:37): driver diagnostic on 1712 and the v10 pioneer census (pioneers.mjs over 1391-1426:
  pioneers sent after the enemy held their site; scratchpad econ/pioneers_v10_{a,b,c}.txt) running; then its
  pre-registration (basics-fix rule likely);
  h185 (= h179 on v11: v11 + ESCORT_HOLD_R 2 + ESCORT_FAST_R2 9 + ESCORT_BACK 1, dist/h185 e4a146ede62f; h171's; the fix for escorts
  that never leave home on small maps, LATTICE_R 12 around their site covering it (2591); studied cells
  uvafan 1712, awesomelemonade 2518, wololo 836, 2644, bot1v43 388, botfinalsafe 2740; mechanism read
  tools/reads/escorts.mjs, mean hit6: escorts dead within 6 rounds of a prophet or castle hit under 40%, h157 69%);
  h186 (= h180 on v11: v11 + PILGRIM_HERE 1 + PILGRIM_STALL 25, dist/h186 21bd58ff32dc; h174's: idle miners take free safe home
  depots; basics-fix rule; studied cells awesomelemonade.Battlecode2019:seed-2518, uvafan.bc2019:seed-2046; mechanism
  read stuckM per game (tools/reads/idle.mjs, 300 rounds) at most 75% of v11's (v9 41.2, bar then 30.9); TRAINING_LOG
  2026-10-25 09:12, 10:12);
  h187 (= h181 on v11: v11 + CHAIN_WALL 28, dist/h187 c7fcded6f4a7; h172's; studied cells uvafan 2046, 1653, IanCoolidge0 1036);
  h188 (= h182 on v11: v11 + ECON_NOPLAN 1, dist/h188 91129886bd9f; h173's) on the targeted panel progress/panels/noplan-m1.json
  (the six bots on the five pool maps where no castle plans a church): first a bots/v11 control block
  (`PANEL=progress/panels/noplan-m1.json tools/panel_submit.sh bots/v11 "v11 control, noplan-m1"`), panelsim on the
  design (> 10% false accepts: a second control block first), then h188; score with `contest19.py pool CONTROL
  progress/panels/noplan-m1.pool BLOCK...` (TRAINING_LOG 2026-10-24 15:32).
  h167's mechanism reads are done (TRAINING_LOG 2026-10-25 09:43).
  ECONOMICS rows 4, 5, 6, 10 dropped (TRAINING_LOG 2026-10-24 21:22, 22:10; 2026-10-25 04:22); rows 9 (ECON_SAT),
  11 (PLAN_CONTEST_PREM, targeted panel), 12 (HUNT_DEPOT) unbuilt.
- **Never-won panel cells** (LEARNINGS 33): wololo 2013 (h167 won it once, red), 836; botfinalsafe 1706 (h139 won it once); awesomelemonade
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
tools/reads/games.sh idle.mjs 300 -- 1180 1181 | python3 -I tools/reads/sum.py stuckM --ge 50   # mechanism reads per replica game (also parked.mjs, escorts.mjs)
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
