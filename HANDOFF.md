# HANDOFF.md — state and how to run things

## State (2026-10-21 22:05 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v4** (`bots/v4` = h19, ROSTER.tsv); frozen history v0-v4, sparring partner
  `bots/rush`. Games run built bundles (`tools/build_bot.js`), never the source directory. Every candidate change is
  a CFG switch whose default is the incumbent; candidates are built with `--cfg KEY=JSON` into `dist/hN`.
- Dev line h6 (v3 + RNG reseed, depot cooldown, crusader/preacher rotation, miner switching, shooting fuel floor) is
  level with v3 (23-17, t 0.7; 7-7 without load-contaminated games): it loses every single-castle map on castles
  near round 500 and wins the multi-castle ones. h19 = src defaults = h6 + two bug fixes (World.signal fuel;
  setup that re-runs until complete, LEARNINGS 10): 21-19 vs h6 (t 0.58), ACCEPTED 20:04 and frozen as v4.
  Candidates are switches on h19, gated against h19 with `--timescale 2 --init-ms 1000 --fast-turn`.
- VM queue (`~/jobq`, in order; gates run from the shadow tree ~/projects/vibe/2019-next: newer tools, engine/maps/
  bots/dist linked to the main tree, outputs in the main tree's out/): h31 (church density:
  SERVE_MOVES 2 + PLAN_CONTEST_FIRST 6, TRAINING_LOG 21:20; running since 22:00), h24x (20 more cells for h24,
  economy first: INCONCLUSIVE at 20 cells, 26-14, net +6, t 1.50; read both blocks pooled), h35 (stack of every
  delivered switch: h31 + h21 + h29 + h33; 21:59), h33 (PILGRIM_SAFE_STEP; delivery passed 21:59), h29 (NAV_FIT +
  LATTICE_STICKY 2), h28 (LATTICE_STICKY 2 alone), h21, h20, h7r, h11r, h15r, h8r, h9r, h10r, h18b vs h19; then the reference jobs v4 vs v0
  and v4 vs rush (main tree). Built, not queued: h32 (contest-first alone) and h34 (SERVE_MOVES 1 dose), both wait
  on h31's gate; h37 (h31 + CLAIM_MARGIN 4: claim past the midline; TRAINING_LOG 22:06) has its driver delivery
  queued behind h35's. h16r (turtle) REJECTED 21:13 (16-24, t -1.07), which released the march tweaks from
  ~/jobq/hold. Withdrawn before their gates: h22, h23 and h27 (deliveries failed; h36 = h22 + h23 doses in the extra lane), h25s and h26 (replaced by h29, h28), h30 (by h31).
  Superseded job files are in ~/jobq/superseded.
- Deliveries in the extra lane (shadow tree, `tools/xbatch.js` so they do not hold the queue, LEARNINGS 11; one game
  at a time under `flock ~/.bc-extra.lock`): `out/dlv_chain2.sh` (sym_h22 last; h21 and h22 deliveries read),
  `out/dlv_chain4.sh` (h24's 200-round games vs h19, h24 vs rush, sym_h24), `out/dlv_chain8.sh` (h31 vs rush;
  sym_h31 clean), `out/dlv_chain9.sh` (h36 vs rush, sym_h36). Symmetry checks stop only at axis-tile contests or
  combat after the first attack, as accepted. A failed delivery: move that gate's job to ~/jobq/superseded.
  Kill chain processes by PID (LEARNINGS 14). Parked: h11, h12
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
  92 entrants, 89 compiled (BENCHMARK.md). Entry trickles in by VM cron, `field.py seed --next 6` every 20 minutes
  (smoke-tested first, duplicates by bundle digest skipped; log bc19-benchmarks/trickle.log): 15 new teams on at
  16:40 PDT 2026-10-21, the rest by ~21:00. Replica games are the smoke test; the separate smoke harness is stopped.
  Sisyphus192 is byte-identical to SethKitchen: team status X. Remove the cron line once `seed --next` finds none.
  Since 2026-10-22 00:45 UTC the replica gives a robot 1000 ms to create its sandbox (GALAXY_INIT_MS; README):
  before that 11 of 14 field entrants lost robots to load-driven init failures. vibe19 (v3) leads at 1704, 46-2 in
  games; scrims (matches 199-202) challenge StoneT2000 (botfinalsafe, bot1v43) and IvanGeffner (bot6b, eigthbot),
  which had not played (`contest19.py scrim --vs NAME,...`). 199 lost 0-3 and 200 lost 1-2 (TRAINING_LOG 20:23).
  Match 201 (vs bot6b) is in TRY: game 2 (seed 616, 57x57) passed saturn's per-game wall limit GALAXY_GAME_TIMEOUT
  1800 s (exit 124, 03:52 UTC); match 202 (vs eigthbot) did the same at 04:09 UTC and both retry, each holding a
  replica execute slot for ~30 min per attempt. Raising the limit (env file + saturn restart) was blocked by the
  auto-mode classifier (Modify Shared Resources): asked the owner 21:32 PDT, waiting.
  Scrims 203 (vs botfinalsafe) and 204 (vs bot1v43), requested 22:10 PDT, are v4's first games against the strong
  field; fetch and compare with 199/200 (v3).
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
