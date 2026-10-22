# HANDOFF.md — state and how to run things

## State (2026-10-22 00:42 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v5** (`bots/v5` = h35, ROSTER.tsv); frozen history v0-v5, sparring partner
  `bots/rush`. Games run built bundles (`tools/build_bot.js`), never the source directory. Every candidate change is
  a CFG switch whose default is the incumbent; candidates are built with `--cfg KEY=JSON` into `dist/hN`.
- v5 = h35 = v4 (h19) + SERVE_MOVES 2, PLAN_CONTEST_FIRST 6 (church density, contested clusters first), RELAY 1
  (cargo relay), NAV_FIT 1 + LATTICE_STICKY 2 (movement fit, lattice memory), PILGRIM_SAFE_STEP 1: 35-5 vs h19
  (t 3.44), ACCEPTED 00:08 2026-10-22; these are the src defaults now. Replica submission 95. Candidates are
  switches on v5, gated against dist/h35 (= bots/v5) with `--timescale 2 --init-ms 1000 --fast-turn`; its two
  lost cells (905, 2855) are karbonite-bound maps (K 0, F 12,500+ unspent). Clean no-op check of the new defaults
  (h35d vs h35, --det, VM extra lane): out/noop_v5.cmp in 2019-next.
- VM queue (`~/jobq`, in order; gates run from the shadow tree ~/projects/vibe/2019-next: newer tools, engine/maps/
  bots/dist linked to the main tree, outputs in the main tree's out/): h41's delivery (kill zones KILL_ZONE 50 on h35, 23:53; driver diagnostic on 1915 clean, 17 ZONE signals),
  h42's delivery (MIX_BY_STOCK [10, 1] on h35: crusaders when karbonite binds, preachers when fuel binds; 00:02), h43's delivery (castle recall RECALL 30: a castle under attack calls far
  guards home; 00:27; 2855 diagnostic: the recall brought the army inside the attack call's reach and it then died
  in h35's held line), h44's delivery (MARCH_MASK 8: only crusaders march before round 900; 00:37); h45 (EDGE 1.5) withdrawn before its delivery: inert against prophets, whose vision equals their reach; h46's delivery (SPOT 3: firing prophets radio
  their target, crusaders and preachers engage it; job ...a39),
  h39 vs h35 (PIONEER_RESERVE 2; delivery passed 23:46), then the old candidates rebased onto v5 (v5 + their own
  switch, 40 games vs h35): h24v5 (ECON_UNTIL 100), h20v5 (DEF_RESERVE_K 30), h15v5 (MIL_ROTATION null), h8v5,
  h7v5, h10v5, h11v5, h9v5, h18v5; then the reference jobs v5 vs v0 and v5 vs rush (main tree). Gates for h41-h46
  go in right after h39's (job names ...4b01b1a41 to ...a46) when their deliveries pass. Superseded at v5: h31x, h33,
  h29, h28, h21 (their switches are in v5). Closed earlier: h34 (SERVE_MOVES 1) and h37 (CLAIM_MARGIN 4) failed
  their deliveries; h38 (creep instead of march) failed 23:23; h40 (forward churches) failed 00:29 on castles lost (4 vs 3; dist/h40v5 built, not queued); h16r (turtle) REJECTED 21:13; h22, h23, h27 and h36
  (deliveries failed), h25s and h26 (replaced by h29, h28), h30 (by h31) withdrawn. Built, not queued: h32.
  Superseded job files are in ~/jobq/superseded.
- Deliveries in the extra lane (shadow tree, `tools/xbatch.js` so they do not hold the queue, LEARNINGS 11; one game
  at a time under `flock ~/.bc-extra.lock`): `out/dlv_chain2.sh` (sym_h22 last; h21 and h22 deliveries read),
  `out/dlv_chain4.sh` (h24's 200-round games vs h19, h24 vs rush; sym_h24 clean), `out/dlv_chain8.sh` (h31 vs rush;
  sym_h31 clean), `out/dlv_chain9.sh` (h36 vs rush read; sym_h36 clean), `out/dlv_chain11.sh` (sym_h41, sym_h42; clean), `out/dlv_chain12.sh` (h43 vs h35
  on 2855 both sides; read), `out/dlv_chain13.sh` (sym_h44), `out/dlv_chain14.sh` (no-op h35e vs h35: IDENTICAL; sym_h45),
  `out/dlv_chain15.sh` (no-op h35f vs h35, sym_h46). The h41/h42 deliveries (jobs ...a35, ...a36) run before h39's gate (...a4). Symmetry checks stop only at axis-tile contests or
  combat after the first attack, as accepted. A failed delivery: move that gate's job to ~/jobq/superseded.
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
- Replica ladder (ACCESS.md, tools/galaxy19, `tools/galaxy19/contest19.py`): team vibe19 runs v4 since submission
  89 (20:05 PDT); v3 threw 31,098 exceptions in 40 of its 192 replica games (the setup bug v4 fixes). Matches
  created before 89, including scrims 199-202, still play v3. Benchmark field:
  92 entrants, 89 compiled (BENCHMARK.md). Entry trickled in by VM cron (`field.py seed --next 6` every 20 minutes,
  smoke-tested first, duplicates by bundle digest skipped; log bc19-benchmarks/trickle.log) until the last uploads at
  03:20 UTC 2026-10-22; the cron line was removed at 23:10 PDT when it had found none for 2.5 hours. Replica games
  are the smoke test. Sisyphus192 is byte-identical to SethKitchen: team status X.
  Since 2026-10-22 00:45 UTC the replica gives a robot 1000 ms to create its sandbox (GALAXY_INIT_MS; README):
  before that 11 of 14 field entrants lost robots to load-driven init failures. vm2's 200 ms limit on running the
  bundle still applies (LEARNINGS 17: bot1v43 lost 35 robots at creation in scrim 200's seed 520, the game we won). vibe19 (v3) leads at 1704, 46-2 in
  games; scrims (matches 199-202) challenge StoneT2000 (botfinalsafe, bot1v43) and IvanGeffner (bot6b, eigthbot),
  which had not played (`contest19.py scrim --vs NAME,...`). 199 lost 0-3 and 200 lost 1-2 (TRAINING_LOG 20:23).
  Match 201 (vs bot6b) is in TRY: game 2 (seed 616, 57x57) passed saturn's per-game wall limit GALAXY_GAME_TIMEOUT
  1800 s (exit 124, 03:52 UTC); match 202 (vs eigthbot) did the same at 04:09 UTC and both retry, each holding a
  replica execute slot for ~30 min per attempt. Raising the limit (env file + saturn restart) was blocked by the
  auto-mode classifier (Modify Shared Resources): asked the owner 21:32 PDT, waiting.
  Match 201 ended ERR (00:40 PDT check: no replays); 202 runs. Scrims 203 (vs botfinalsafe) and 204 (vs
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
source tools/vm.sh && ensure_vm && vm_sync           # push code to the VM
gssh 'cd ~/projects/vibe/2019 && ~/bin/node tools/batch.js --a dist/dev --b bots/v1 --random 24 --par 6 --timescale 2 --out ~/runs/results.jsonl --replays ~/runs/replays --tag X'
node tools/summarize.js results.jsonl ; node tools/paired.js results.jsonl --cand H1 --ctrl H2
node tools/build_bot.js src/bot dist/h7 --cfg ATTACK_PERSIST=1   # a candidate: incumbent + one switch
gssh 'cd ~/projects/vibe/2019 && bash tools/jobq.sh add "node tools/batch.js ..."; bash tools/jobq.sh status'
tools/snapshot.sh v1 "note"                          # freeze an accepted build
```
