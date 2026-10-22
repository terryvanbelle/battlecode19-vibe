# HANDOFF.md — state and how to run things

## State (2026-10-22 15:46 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v6** (`bots/v6` = h50, ROSTER.tsv); frozen history v0-v6, sparring
  partner `bots/rush`. Games run built bundles (`tools/build_bot.js`), never the source directory. Every candidate
  change is a CFG switch whose default is the incumbent; candidates are built with `--cfg KEY=JSON` into `dist/hN`.
- v6 = h50 = v5 (h35) + PIONEER_RESERVE 2 (every castle keeps the pioneer's karbonite until the first church
  stands) + MARCH_MASK 8 (only crusaders obey attack orders before round 900; prophets and preachers hold the
  lattice): pooled 40 cells vs h35 +24 -11 (t 2.20), 53-27, ACCEPTED 08:00 2026-10-22; these are the src defaults
  now. Replica submission 96. Candidates are switches on v6, gated against dist/h50 (= bots/v6) with `--timescale 2
  --init-ms 1000 --fast-turn`. The defaults-only build dist/v6d is not byte-identical to h50 (a defaults build
  drops dead branches): no-op check v6d vs h50 (--det) and symcheck on the extra lane, out/dlv_chain28.sh.
  v5 = h35 = v4 + SERVE_MOVES 2, PLAN_CONTEST_FIRST 6, RELAY 1, NAV_FIT 1, LATTICE_STICKY 2, PILGRIM_SAFE_STEP 1.
- VM queue (`~/jobq`, in order; gates run from the shadow tree ~/projects/vibe/2019-next: newer tools, engine/maps/
  bots/dist linked to the main tree, outputs in the main tree's out/). **Every gate job runs at par 2 while the
  replica queue is long** (owner, PROMPTS 18; back to par 4 when fewer than 30 replica matches wait). Order at 15:46:
  **h68** delivery running (PIONEER_GIVEUP 20 +
  PIONEER_STALL_ANY 40: no-op v6j, symcheck, 8 games vs h50 on h61's cells, ...a3d577100; TRAINING_LOG 11:52); then
  **h76**'s delivery (...a3d5771000: h72 + CHAIN_SAFE 1 + CHAIN_KEEP 1, the fix for a chainer shot before its first
  church acts; vs h50 on 799, 1706, 2013, 2924 both sides; TRAINING_LOG 15:17), **h70** delivery
  (PEACE_RESERVE_K 60: no-op v6k, symcheck, 8 games vs h50 on 70, 520, 2591, 1592, ...a3d5771005; TRAINING_LOG 13:04),
  **h71** delivery (CHURCH_GUARD_D 8 preacher + PREACHER_SELF 4 + PREACHER_MIL 2.5: no-op v6l, symcheck, 8 games vs
  h50 on 2591, 1915, 2030, 2924, ...a3d57710055; TRAINING_LOG 13:20), then **h72**'s gate vs h50 (StoneT2000's long
  church line, CHAIN_ROUND 200, STAGE 15, END_R2 2, K 1000, F 3500, MIX [5]; delivery PASSED 3/3 at 14:41; 20 random
  cells, ...a3d57710056, moved behind h71 at 15:46): if h76's delivery passes, this job becomes h76's gate vs h50 and
  h76 the panel's bomber,
  **h64** (PIONEER_FAST, gate vs h50, ...a3d5771006: moved up 13:08, replica 391-1 is a second case, TRAINING_LOG 13:08),
  **h20v6** (DEF_RESERVE_K 30, the answer to CS554's rush: delivery h50 and h20v6 vs bots/rush4 on 20 poor one-castle
  maps at 200 rounds, then its gate vs h50, ...a3d577101; TRAINING_LOG 10:47), **h15v6** (MIL_ROTATION null, ~75%
  prophets: the replica's prophet-lattice duels, TRAINING_LOG 12:50; ...a3d577102), **h67** (PIONEERS_TEAM 4: a lone
  castle keeps 4 pioneers in flight; no-op v6i, symcheck, then gate vs h50 on 20 one-castle cells, ...a3d57711;
  TRAINING_LOG 10:15), **h65** (ESCORT 2, ...a3d57716, after its
  no-op/symcheck job ...a3d577158) gate vs h50; **h75** (stack: v6 + ENDGAME_FUEL 900 + h72's chain settings,
  replacing h66 at 15:02; symcheck then gate vs h50, ...a3d57717); the **anti-chain panel** (...a3d5773-4: h54v6 and h56v6 each
  vs h72, out/panel_chain72_*; the h50 cell is h72's gate, so ...a3d5772 was dropped at 14:41); **h8v6** (v6 + ENDGAME_FUEL 900 vs h50, ...a3d5775); h55's extension vs h35 (...a3d585) and h24v5's
  (...a3d597); then the jobs rebased onto v6 at 08:00 (v6 + their own switch vs dist/h50): h51v6's delivery
  (CASTLE_POST 0.5, ...a3e), h43v6 (RECALL 30, ...a43), h7v6, h10v6, h11v6, h9v6, h18v6; then the reference jobs v6
  vs v0 and v6 vs rush. Gates of passed deliveries go in after h43v6's (job names ...4b01b1a45 onward). The extra
  lane is retired; deliveries and no-op checks go into the jobq as their own jobs. Parked: h69 (CHAIN_ROUND 150 +
  CHAIN_END_R2 2; TRAINING_LOG 12:50). Closed 13:55: h63 (PILGRIM_HERE; gate D 7 t 1.13, delivery failed 1 of 2).
  Superseded at v5: h31x, h33, h29, h28, h21. Closed earlier: h34 (SERVE_MOVES 1) and h37 (CLAIM_MARGIN 4) failed
  their deliveries; h38 (creep instead of march) failed 23:23; h40 (forward churches) failed 00:29 on castles lost (4 vs 3; dist/h40v5 built, not queued); h41 (kill zones) failed 0 of 3 at 00:57; h46 (SPOT for melee) failed 1 of 3 at 01:52; h47 (FOCUS 1) failed 1 of 3 at 02:04; h48 (preachers when fuel binds) failed 1 of 3 at 02:20; h49 (SPOT for prophets) failed 0 of 3 at 02:32; h58 (CHURCH_FIRST_R2) failed 1 of 3 and h59 (PILGRIM_HOT) 0 of 3 at 06:13; h45 (EDGE 1.5) withdrawn before its delivery (inert: prophet vision equals reach); h42 (unit mix by stock) failed 2 of 3 at 01:10 (castles 5 vs 4; its preacher half is h48); h16r (turtle) REJECTED 21:13; h22, h23, h27 and h36
  (deliveries failed), h25s and h26 (replaced by h29, h28), h30 (by h31) withdrawn. Built, not queued: h32.
  Superseded job files are in ~/jobq/superseded.
- The extra lane (retired 11:52; `tools/xbatch.js`, out/dlv_chain*.sh) ran the no-op checks, symchecks and
  deliveries of h21-h62; each result is in TRAINING_LOG. A failed delivery: move that gate's job to ~/jobq/superseded.
  Symmetry checks stop only at axis-tile contests or combat after the first attack, as accepted.
  Kill chain processes by PID (LEARNINGS 14). Our VM games run at nice 10 (jobq.sh; write `nice -n 10` into new
  chain scripts) so the replica's games get whole cores (LEARNINGS 17). Parked: h11, h12
  (waves), h13 (keep clear), h14 (detour), h17 (karbonite stop).
- Main finding: after the attack call at round 450 the army burns the fuel bank in ~50 rounds (8 sampled games:
  7,000-9,000 fuel at 450, under 100 by 500), then cannot shoot or move: 85-90% of it stays within 12 king steps of
  home through round 700 (seed 2202). A fuel freeze more than a traffic jam (detour h14 freed nobody); h18's cruise
  fuel reserve kept the bank (delivery passed) but lost its gate (net -5, t -1.89: REJECTED 18:50). Two more fuel leaks (18:10-18:25):
  pilgrims boxed in full next to packed castles (h21 relay) and prophets firing 84% of attack fuel at 0.40 damage
  per fuel (h22 preachers in their place; h23 prophets keep off a short bank). `replay.js fire`: prophets fire 93%
  of attack fuel in self-play, ~13,500 a game.
- Church chains (src/bot/chain.js, CFG.CHAIN_ROUND; h55): StoneT2000's tactic seen in replica scrim 200. h55's
  driver diagnostic on 2924 fired one chain (3 churches 7 steps from a castle, 133 units, the castle fell at 400);
  its first chainer stood 250 turns beside corner castle (6,0), boxed in by our own military in the 1-wide top
  corridor. That jam is a movement lead for v5 itself (idle units on and next to a corridor by a corner castle).
  Defence: CFG.HUNT (h56b = HUNT 2) partly stops chainers that wait (driver diagnostics vs h55w, TRAINING_LOG
  04:17), not ones whose bank is ready on arrival; a line's churches then survive as factories because shooters
  rank churches last (combat.js PRIORITY). Not queued. CFG.CHURCH_FIRST_R2 (h58 = 144): enemy churches near home
  outrank units for every shooter; delivery vs h55 on the extra lane.
- Pilgrim stalls (TRAINING_LOG 05:03): on 7 of 20 maps pilgrims wait for good at the edge of an enemy attacker's
  range (PILGRIM_SAFE_STEP keeps them out, nothing gives the target up) and that side mines 17-63% less.
  CFG.PILGRIM_HOT (h59 = 10) gives the depot up; scratch stall.js / stallwhy.js measure it (copies in 2019-next/out).
  Orphans (TRAINING_LOG 07:49): 56 of 165 long stall streaks (39% of the turns) were pilgrims that knew no living
  structure (their church fell; pilgrim.js then returned null for good). CFG.PILGRIM_ORPHAN (h60 = 1) walks them to
  our half's cluster sites until a structure is in sight: no-op IDENTICAL, symcheck clean (out/dlv_chain26.sh);
  driver diagnostic on 1250 (h60's side stalled 447 turns, h35's 849 on that side); the pre-registered delivery
  (1250, 1635, 1862, 357 both sides, vs h35) failed 1 of 3 (stalls 80% of h35's, bar 70%; TRAINING_LOG 08:43):
  closed, no gate. Pilgrims that know a structure but whose depots sit under an enemy
  army (seed 1250 #4088: 423 turns beside (24,29), castle in sight) are not orphans: h59 (PILGRIM_HOT) failed there.
- Church bomb (TRAINING_LOG 08:56, replica 205-2): StoneT2000 builds a 16-link church chain in one round from
  pilgrims parked just past our castle's vision, then ~13 preachers at our castle (lone castle dead at 233). Our
  counters h54 (STRIKE) and h56 (HUNT) cannot be rated in self-play, so an anti-chain panel runs: h54v6 and h56v6
  each vs h72 (our chain bomber since its delivery passed) on 20 cells, with h72's gate vs h50 as the control cell
  (VM jobs ...a3d5773-4 and ...a3d5771001; read with paired.js --cand --ctrl --opp). h54's h2h extensions were withdrawn.
- Idle on safe depots (TRAINING_LOG 08:43, replica 206-3): a pilgrim mines only on its target; when the target is
  taken or under an enemy attacker it never takes the depot it stands on, so seven pilgrims of castle (0,14) mined
  nothing for 200+ rounds beside StoneT2000's prophets. CFG.PILGRIM_HERE (h63 = 1): gate vs h50 is next in the job
  queue (...a3d5771), delivery = `tools/census.js --to 450` on its replays (depot_idle, mines by cand / ctrl); chain31 runs its no-op
  (v6f) and symchecks. h62 (PIONEER_LOST_DOUBLE 1, the longer rest after a pioneer dies) is built and waits for a
  replica panel vs StoneT2000.
- Pioneers (TRAINING_LOG 08:16; now `tools/census.js`, which also reads h64's and h65's deliveries): in h50's gate v6 left 40 pioneers stuck
  (7,874 turns to round 450) beside contested sites on 7 maps, and castles re-send to the same site every 81 rounds;
  vs StoneT2000 our pioneers are mostly killed en route (25 of 46) and re-sent every ~105 rounds. CFG.PIONEER_GIVEUP
  (h61 = 20) gives the site up when an attacker is in sight: its delivery FAILED (stuck turns 0.40 of h50's, bar
  0.30; TRAINING_LOG 11:52) because most stalls see no enemy. h68 adds CFG.PIONEER_STALL_ANY 40 (give up after 40
  turns no nearer, whatever it sees), queued ...a3d577113. The longer rest after a pioneer is killed is h62 (above).
- tools/run_game.js re-runs itself inside `unshare -rn` when it finds a network interface, refuses to run if it
  cannot, and records `net_isolated` in its JSON (unit test; driver diagnostics before 03:20 PDT 2026-10-22 were
  started without it, our own builds only). Not yet synced to the VM trees (they start games under unshare anyway).
- Replica ladder (ACCESS.md, tools/galaxy19, `tools/galaxy19/contest19.py`): team vibe19 runs v6 since submission
  96 (2026-10-22 ~08:00 PDT); matches created before it played v5 or older (385-400, created 06:28 PDT, are v5:
  prophets still march at 450). v3 threw 31,098 exceptions in 40 of its 192 replica games (fixed in v4). Benchmark field:
  92 entrants, 89 compiled (BENCHMARK.md). Entry trickled in by VM cron (`field.py seed --next 6` every 20 minutes,
  smoke-tested first, duplicates by bundle digest skipped; log bc19-benchmarks/trickle.log) until the last uploads at
  03:20 UTC 2026-10-22; the cron line was removed at 23:10 PDT when it had found none for 2.5 hours. Replica games
  are the smoke test. Sisyphus192 is byte-identical to SethKitchen: team status X.
  Since 2026-10-22 00:45 UTC the replica gives a robot 1000 ms to create its sandbox (GALAXY_INIT_MS; README):
  before that 11 of 14 field entrants lost robots to load-driven init failures. vm2's 200 ms limit on running the
  bundle still applies (LEARNINGS 17: bot1v43 lost 35 robots at creation in scrim 200's seed 520, the game we won). vibe19 (v3) leads at 1704, 46-2 in
  games; scrims (matches 199-202) challenge StoneT2000 (botfinalsafe, bot1v43) and IvanGeffner (bot6b, eigthbot),
  which had not played (`contest19.py scrim --vs NAME,...`). 199 lost 0-3 and 200 lost 1-2 (TRAINING_LOG 20:23).
  Matches 201 and 202 ended ERR at the old 1800 s game limit (no replays). **Replica throughput (owner, PROMPTS
  15-20; TRAINING_LOG 07:40):** saturn runs 5 execute slots (5th since 16:36 UTC, TRAINING_LOG 09:40) with GALAXY_GAME_TIMEOUT 5400 s; the
  autoscrim is held while 30+ matches wait and fires at most once per 24 h (relay.py fire-jobs). Queue at 09:40 PDT:
  180 waiting. **Watch the queue every check-in** (`python3 tools/galaxy19/field.py queue`: matches NEW/QUE/TRY,
  and what runs); while it is long, clearing it comes before local work (gates at par 2). The seven boosted field
  bots (StoneT2000 x2, uvafan, awesomelemonade, nthistle, jamesrayman HCN-bot, m-schier wololo; requests 158-178)
  were bumped to the front. **Dropped 08:25 PDT (owner, PROMPTS 21):** Nydroam.BatteredCod, IvanGeffner.BC19-bot6b and
  IvanGeffner.BC19-eigthbot (team status X, 13 waiting matches CAN, spool messages to dead/): 27.5 of 42.6
  slot-hours for 12 results (37 of 49 runs nacked), ratings 416/425/593. 18dcb01 robot2 and CometsTech~187e8c
  stay (most of their nacks were against those three); drop them too if their games keep failing at 5400 s. Scrims 203 (vs botfinalsafe) and 204 (vs
  bot1v43), requested 22:04 PDT, play v4; 205/206 (v5 vs botfinalsafe, bot1v43) are queued; fetch and compare with
  199/200. Replica 200-3 (2965, lost): three karbonite depots a side, K mined alike, our 132 prophets lost 131
  walking into their held line (TRAINING_LOG, h45).
- Gate jobs from h16r on run with `--fast-turn` (run_game/batch: one precompiled turn script per sandbox, same view
  and kill; replays identical under --det; TRAINING_LOG 19:39). Its saving is judged on the VM by per-game wall time
  vs h19 vs h6 (425 s at par 4); time audits and the replica use the engine path. Never time on the driver (LEARNINGS 13).
- VM work goes through the sequential job queue `tools/jobq.sh` (add/start/status) so batches never overlap. Beside
  a batch, at most one extra game process, under `flock ~/.bc-extra.lock` (LEARNINGS 8).

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
```
