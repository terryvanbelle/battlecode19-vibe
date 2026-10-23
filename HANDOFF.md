# HANDOFF.md — state and how to run things

## State (2026-10-23 06:12 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v7** (`bots/v7` = h87, ROSTER.tsv); frozen history v0-v7, sparring
  partners `bots/rush`, `bots/rush4`. Games run built bundles (`tools/build_bot.js`), never the source directory. Every candidate
  change is a CFG switch whose default is the incumbent; candidates are built with `--cfg KEY=JSON` into `dist/hN`.
- v7 = h87 = v6 + h82's economy switches (ECON_UNTIL 100, PIONEERS_TEAM 6, PEACE_RESERVE_K 60, PLAN_VALUE 10,
  DEF_RESERVE_K 30) + h76's church chain from round 200 (CHAIN_ROUND 200, STAGE 15, END_R2 2, K 1000, F 3500, MIX
  [5], KEEP 1, SAFE 1): gate vs h50 20 cells +14 -5, t 2.06, 29-11, ACCEPTED 00:30 2026-10-23; these are the src
  defaults now (unit tests of other switches pin v6's values: testPreV7). Replica submission 99. Candidates are
  switches on v7 built from src with their own --cfg keys only (src defaults = v7), gated against dist/h87 (= bots/v7). The defaults-only
  build dist/v7d replays h87 IDENTICAL (--det, 799 to 300).
- v6 = h50 = v5 (h35) + PIONEER_RESERVE 2 (every castle keeps the pioneer's karbonite until the first church
  stands) + MARCH_MASK 8 (only crusaders obey attack orders before round 900; prophets and preachers hold the
  lattice): pooled 40 cells vs h35 +24 -11 (t 2.20), 53-27, ACCEPTED 08:00 2026-10-22. Replica submission 96.
  v5 = h35 = v4 + SERVE_MOVES 2, PLAN_CONTEST_FIRST 6, RELAY 1, NAV_FIT 1, LATTICE_STICKY 2, PILGRIM_SAFE_STEP 1.
- VM queue (`~/jobq`, in order; gates run from the shadow tree ~/projects/vibe/2019-next: newer tools, engine/maps/
  bots/dist linked to the main tree, outputs in the main tree's out/). **Every gate job runs at par 2 while the
  replica queue is long** (owner, PROMPTS 18; back to par 4 when fewer than 30 replica matches wait; 63 at 03:30). Order at 04:28:
  the time audit done (...19fz: overruns are machine load, no bot change; TRAINING_LOG 04:22), **h100**'s extension (...19fzz: the next 20 cells;
  after 20 cells 22-18, D 8, t 0.71, mechanism passed; at its D-12 look t 1.15, net +4: inconclusive, TRAINING_LOG
  04:38), the **h104** gate done (t 1.00, D 4, mechanism missed: to the replica panel, matches 432-437,
  submission 102; TRAINING_LOG 05:42), **h100**'s extension 2 done (...19h: cells 41-70; at 70 cells net +1, t 0.17, D 35; the D-24 look at 48 cells gave t 1.63, net +8: inconclusive; extension 3 = cells 71-100 queued as ...19k after h103, look at D 48; TRAINING_LOG 05:50). Everything after it
  is a stale v6 job; new jobs are named to sort ahead of them (after ...19k and before ...10055, e.g. ...19l; never a
  longer name such as ...19ga, which the locale sort puts before ...19g). **h103**'s gate (...19j, after h107's;
  escorts for overdue pioneers; field case 419-2, IanCoolidge0's crusader squatters on 2644; TRAINING_LOG 05:07). **v7 on the replica**: measurement block 420-425 (created 03:27,
  progress/panels/v7-m1.json = h82-b1's maps, the same 6 opponents as 408-413 / 414-419), waiting in queue order (the
  spool_bump to the front was refused by the permission check; owner told); read v7 vs v6 and h82 per cell and rerun
  the economy census on its games. **h96**'s panel block 1 (v7 + ATTACK_LATE 1001, gate inconclusive t 0.58):
  matches 426-431 (submission 100), same opponents and maps, created 04:22, control = 420-425; two-block rule
  (TRAINING_LOG 04:24). The ladder's vibe19 is submission 103 (= bots/v7 again, after h104's block 432-437 was created).
  **h107** (gate running, ...19i) = v7 + DEF_FAR_UNIT 3 (a threat response answers a prophet or castle beyond r2 36 with a crusader, not a
  prophet; wololo's siege of our lone castle on 2013, TRAINING_LOG 04:48): built, no-op IDENTICAL, on the VM; driver
  diagnostic on 2013 changes moves from r200 (same result); gate queued (...19i, after h100's extension 2;
  TRAINING_LOG 05:04).
  **h109** = v7 + SAFE_BUILD 1 (structures never build onto a tile where the enemy attackers in sight would kill the
  newborn before it acts; replica losses lost ~76 stillborn units, TRAINING_LOG 05:37): parked after its diagnostic
  (stillborn 0, but one prophet in reach of every build tile blocked the chain launch: worse in 2 of 4 cells).
  **h111** = v7 + SAFE_BUILD 2 (only attackers with no other target of ours count): no-op IDENTICAL, on the VM; driver
  diagnostic on 836 and 2013 running (scratch diag.sh). **h110** = v7 + RECALL 30
  with the fixed recall (chain-born units keep their line target; h108 parked for that bug): built, on the VM;
  diagnostic on 2013 after h109's. `contest19.py compare CTRL CAND` (e.g. 420-425 432-437) compares two downloaded replica blocks per cell (two-block rule).
  Built, not queued (all on the VM's dist/): h105 = dist/turtle (sparring bot: prophets only, no attack, no
  chain) and h106 (prophets only, no attack, chain kept): the prophet doctrine lost to h87 in every self-play test
  (TRAINING_LOG 04:22); h102 (PIONEER_DETOUR 50; inert in self-play
  and vs camp on 2321 and 2591; h103, ESCORT 2, ESCORT_UNIT 3, is now queued), aimed at our stalled pioneers (economy census 03:05, v6's games: in losses half our pioneers never
  arrive); sparring bot dist/camp = v7 + ESCORT_FIRST 1 + ESCORT_MIRROR 1 (bot1v43's round-3 prophet on our contested
  site; h87 out-expands it 5 churches to 2 on 2321); both wait for v7's replica block; h98 (MIL_ROTATION null) and h99
  ([4]), after the combat census (01:45: 92% of our lost crusaders never fired on the replica) and h98's driver loss
  on 2644. Closed: **h101** (MELEE_BACK 2) FAILED 03:50 (gate t -0.63, D 10; mechanism 0.78, bar 0.75); h97 delivery FAILED 01:25 (PIONEER_DEPART_K 0: 1 of 3 bars); h91 delivery FAILED 01:10 (RICH_K 0:
  wins 7 of 16); **h87 ACCEPTED as v7** 00:30 (gate vs h50 t 2.06); h82 superseded by it (its field-aimed panel
  block 1, replica matches 408-413 (h82, sub 97) vs 414-419 (v6, sub 98), final at 01:00: net +2 over 18 cells,
  gained 3, lost 1; progress/panels/h82-b1.json); h88 REJECTED 00:00 (net -2, t -1.41; dist/h93 = h88 + ESCORT 2
  goes with it); h89 / h90 delivery FAILED 21:55; the anti-chain delivery FAILED 22:45 for h83 (HUNT 2) and h84
  (STRIKE_R2). The stale h64 gate (v6 + PIONEER_FAST 1 vs h50) finished 02:50: 22-18, net +2, D 14, t 0.53, inconclusive, not
  extended (TRAINING_LOG 02:55). Stale v6 jobs, in queue order: **h71** delivery (CHURCH_GUARD_D 8 preacher + PREACHER_SELF 4 + PREACHER_MIL 2.5: no-op v6l, symcheck, 8 games vs
  h50 on 2591, 1915, 2030, 2924, ...a3d57710055; TRAINING_LOG 13:20), then **h76**'s gate vs h50 (StoneT2000's long
  church line: h72 = CHAIN_ROUND 200, STAGE 15, END_R2 2, K 1000, F 3500, MIX [5], delivery PASSED 14:41; h76 = h72 +
  CHAIN_KEEP 1 + CHAIN_SAFE 1, delivery PASSED 3/3 at 16:52; 20 random cells, ...a3d57710056, h72's gate not run),
  **h20v6** (DEF_RESERVE_K 30, the answer to CS554's rush: delivery h20v6 vs bots/rush4 on 20 poor one-castle
  maps at 200 rounds against h50's line from h77's job, then its gate vs h50, ...a3d577101; TRAINING_LOG 10:47), **h15v6** (MIL_ROTATION null, ~75%
  prophets: the replica's prophet-lattice duels, TRAINING_LOG 12:50; ...a3d577102), **h65** (ESCORT 2, ...a3d57716, after its
  no-op/symcheck job ...a3d577158) gate vs h50; **h79** (stack: v6 + ENDGAME_FUEL 900 + h76's chain,
  replacing h75 at 16:52; symcheck then gate vs h50, ...a3d57717); the **anti-chain panel** (...a3d5773-4: h54v6 and h56v6 each
  vs h76, out/panel_chain76_*; the h50 cell is h76's gate); **h8v6** (v6 + ENDGAME_FUEL 900 vs h50, ...a3d5775); h55's extension vs h35 (...a3d585) and h24v5's
  (...a3d597); then the jobs rebased onto v6 at 08:00 (v6 + their own switch vs dist/h50): h51v6's delivery
  (CASTLE_POST 0.5, ...a3e), h43v6 (RECALL 30, ...a43), h7v6, h10v6, h11v6, h9v6, h18v6; then the reference jobs v6
  vs v0 and v6 vs rush. Gates of passed deliveries go in after h43v6's (job names ...4b01b1a45 onward). The extra
  lane is retired; deliveries and no-op checks go into the jobq as their own jobs. Parked: h69 (CHAIN_ROUND 150 +
  CHAIN_END_R2 2; TRAINING_LOG 12:50). Closed 13:55: h63 (PILGRIM_HERE; gate D 7 t 1.13, delivery failed 1 of 2).
  Superseded at v5: h31x, h33, h29, h28, h21. Closed earlier: h34 (SERVE_MOVES 1) and h37 (CLAIM_MARGIN 4) failed
  their deliveries; h38 (creep instead of march) failed 23:23; h40 (forward churches) failed 00:29 on castles lost (4 vs 3; dist/h40v5 built, not queued); h41 (kill zones) failed 0 of 3 at 00:57; h46 (SPOT for melee) failed 1 of 3 at 01:52; h47 (FOCUS 1) failed 1 of 3 at 02:04; h48 (preachers when fuel binds) failed 1 of 3 at 02:20; h49 (SPOT for prophets) failed 0 of 3 at 02:32; h58 (CHURCH_FIRST_R2) failed 1 of 3 and h59 (PILGRIM_HOT) 0 of 3 at 06:13; h45 (EDGE 1.5) withdrawn before its delivery (inert: prophet vision equals reach); h42 (unit mix by stock) failed 2 of 3 at 01:10 (castles 5 vs 4; its preacher half is h48); h16r (turtle) REJECTED 21:13; h22, h23, h27 and h36
  (deliveries failed), h25s and h26 (replaced by h29, h28), h30 (by h31) withdrawn. Built, not queued: h32.
  Superseded 18:43 by h77 (their switches are among its four): h70's delivery and h67's gate, not run. Superseded
  19:06 by h82 (h77 + DEF_RESERVE_K 30, delivery PASSED): h77's gate, not run.
  Built on h82, waiting for its verdict: h85 (h82 + PIONEER_FAST 1; its effect is read in h90's delivery), h86 (h82 + ESCORT 2). When h82 is accepted the
  queued v6 gates (h64, h76, h20v6, h15v6, h65, h79, h8v6, ...) are stale: rebase them on h82 or supersede them.
  Superseded job files are in ~/jobq/superseded. Stale since 22:45, still in ~/jobq/pending (moving them was
  refused by this session's permission check; the owner was asked): ...a3d5773 / ...a3d5774 (h54v6 / h56v6 vs h76:
  the same strike and hunt failed on h82 at 22:45), ...a3d585 (h55's chain vs v5; the chain line is h76 / h87) and
  ...a3d597 (h24v5 vs v5; ECON_UNTIL 100 is in h82). Leave them unrun.
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
  each vs h76 (our chain bomber since its delivery passed at 16:52; h72 before) on 20 cells, with h76's gate vs h50
  as the control cell (VM jobs ...a3d5773-4 and ...a3d57710056; read with paired.js --cand --ctrl --opp). h54's h2h
  extensions were withdrawn. Replica 407 (botfinalsafe 3-0 on 799, 1706, 2013, 16:52): lines of 7-17 churches; the
  castle each line reached fell 8-10 rounds later (799: line r285, castle r294; 1706: r306, r316; 2013: r274, game
  over r282).
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
  0.30; TRAINING_LOG 11:52) because most stalls see no enemy. h68 (+ CFG.PIONEER_STALL_ANY 40) FAILED the same
  way at 16:12: its replays are byte-identical to h61's. Cause (debug build, TRAINING_LOG 16:29; LEARNINGS 24): the
  pioneer does give its site up, then takes the free depot nearest itself, under the same enemy guards, and hovers
  short of it for good. h78 = h68 + CFG.PIONEER_HOME 1 (that depot is chosen near its nearest structure) +
  CFG.PILGRIM_STALL 25 (any pilgrim 25 turns no nearer its target gives it up for 50 turns), both choosing by
  homeDepot (a free depot on ground we hold): delivery ...a3d577100015 after h77's (TRAINING_LOG 17:10).
  The longer rest after a pioneer is killed is h62 (above).
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
  15-20; TRAINING_LOG 07:40):** saturn runs 6 execute slots (5th since 16:36 UTC, 6th since 03:57 UTC 2026-10-23, TRAINING_LOG 09:40, 20:58) with GALAXY_GAME_TIMEOUT 10800 s and a 64 MB semi-space per game; the
  autoscrim is held while 30+ matches wait and fires at most once per 24 h (relay.py fire-jobs). Queue at 23:00 PDT:
  103 waiting (116 at 20:58, 180 at 09:40), all ranked field matches created 01:00 PDT: every rating is frozen behind
  them (a participation is rated only after the team's previous one). Since 23:30 PDT saturn keeps a match's finished
  games across attempts (a crash or restart costs only the games in progress) and caps each game's heap at 3 GB, not
  2 (big-map games crashed at 2 GB; TRAINING_LOG 23:31, LEARNINGS 26). saturn passes run_game.js --fast-init since 01:46 UTC and --fast-view since 03:00 UTC
  2026-10-23 (pre-clock work only, the same game byte for byte; README). **Watch the queue every check-in** (`python3 tools/galaxy19/field.py queue`: matches NEW/QUE/TRY,
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
  Jobs from 18:45 2026-10-22 (and the replica's games since 01:46 UTC, saturn GALAXY_FAST_INIT) add `--fast-init`: each
  bundle compiled once per game for every robot sandbox; same replay byte for byte, 16% less wall time (TRAINING_LOG 18:46).
  Jobs from 18:56 also add `--no-kill --fast-view` (no per-turn vm2 watchdog, batch.js caps a game at 3600 s; the view
  over the vision square): the 300-round game 252 s -> 212 s -> 129 s, same replay. The replica keeps the kill.
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
python3 -I tools/galaxy19/field.py queue              # replica backlog (owner: a long queue makes clearing it the priority)
python3 -I tools/galaxy19/contest19.py scrim --vs A,B --panel progress/panels/X.json   # a panel block on recorded maps
python3 -I tools/galaxy19/contest19.py fetch --new    # download our finished replica matches
python3 -I tools/galaxy19/contest19.py compare 420-425 432-437   # control vs candidate block, per cell, t = net/sqrt(D)
```
