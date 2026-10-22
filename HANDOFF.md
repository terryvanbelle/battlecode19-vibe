# HANDOFF.md — state and how to run things

## State (2026-10-21 19:07 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v3** (`bots/v3`, ROSTER.tsv); frozen history v0-v3, sparring partner
  `bots/rush`. Games run built bundles (`tools/build_bot.js`), never the source directory. Every candidate change is
  a CFG switch whose default is the incumbent; candidates are built with `--cfg KEY=JSON` into `dist/hN`.
- Dev line h6 (v3 + RNG reseed, depot cooldown, crusader/preacher rotation, miner switching, shooting fuel floor) is
  level with v3 (23-17, t 0.7; 7-7 without load-contaminated games): it loses every single-castle map on castles
  near round 500 and wins the multi-castle ones. h19 = src defaults = h6 + two bug fixes (World.signal fuel;
  setup that re-runs until complete, LEARNINGS 10), measured vs h6 next; candidates from now on are switches on h19,
  gated against h19 with `--timescale 2 --init-ms 1000` (TRAINING_LOG 17:40).
- VM queue (`~/jobq`, in order): h19 vs h6 (running since 18:40); gates run from the shadow tree ~/projects/vibe/2019-next (new tools incl. `--init-ms`; engine/maps/bots/dist link to the main tree;
  outputs in the main tree's out/): h19 vs h6, then h16r (turtle, moved up 18:53 after the field study, TRAINING_LOG),
  h25 (NAV_FIT movement fix, 19:07), h24 (economy first, 19:00), h21, h20, h22, h23, h15r, h8r, h9r vs h19; then the reference jobs v3 vs v0
  and v3 vs rush (main tree, synced 18:50 except engine/maps/bots/dist). The h6-based h15, h16, h7-h10 jobs are in ~/jobq/superseded. Deliveries in
  the extra lane (`out/dlv_chain2.sh` in the shadow tree, via `tools/xbatch.js` so they do not hold the queue,
  LEARNINGS 11): h20 and h19 vs bots/rush on h6's four rush-losing maps, h21 vs h19 on 2202/1635/2296, h22 vs
  rush, h23 vs rush (`out/dlv_chain3.sh`), h24's 200-round games vs h19 and vs rush (`out/dlv_chain4.sh`), h25's 200-round games
  vs h19 (`out/dlv_chain5.sh`), symchecks of h20-h25. A failed delivery: delete that gate's job from ~/jobq/pending. In ~/jobq/hold (back to pending if turtle is
  rejected): the march tweaks h7r, h11r, h10r, h18b. Parked: h11, h12
  (waves), h13 (keep clear), h14 (detour), h17 (karbonite stop).
- Main finding: after the attack call at round 450 the army burns the fuel bank in ~50 rounds (8 sampled games:
  7,000-9,000 fuel at 450, under 100 by 500), then cannot shoot or move: 85-90% of it stays within 12 king steps of
  home through round 700 (seed 2202). A fuel freeze more than a traffic jam (detour h14 freed nobody); h18's cruise
  fuel reserve kept the bank (delivery passed) but lost its gate (net -5, t -1.89: REJECTED 18:50). Two more fuel leaks (18:10-18:25):
  pilgrims boxed in full next to packed castles (h21 relay) and prophets firing 84% of attack fuel at 0.40 damage
  per fuel (h22 preachers in their place; h23 prophets keep off a short bank). `replay.js fire`: prophets fire 93%
  of attack fuel in self-play, ~13,500 a game.
- Replica ladder (ACCESS.md, tools/galaxy19, `tools/galaxy19/contest19.py`): team vibe19 runs v3, which threw
  31,098 exceptions in 40 of its 192 replica games (the setup bug h19 fixes): submit h19 once its gate vs h6 is not a
  loss. Benchmark field:
  92 entrants, 89 compiled (BENCHMARK.md). Entry trickles in by VM cron, `field.py seed --next 6` every 20 minutes
  (smoke-tested first, duplicates by bundle digest skipped; log bc19-benchmarks/trickle.log): 15 new teams on at
  16:40 PDT 2026-10-21, the rest by ~21:00. Replica games are the smoke test; the separate smoke harness is stopped.
  Sisyphus192 is byte-identical to SethKitchen: team status X. Remove the cron line once `seed --next` finds none.
  Since 2026-10-22 00:45 UTC the replica gives a robot 1000 ms to create its sandbox (GALAXY_INIT_MS; README):
  before that 11 of 14 field entrants lost robots to load-driven init failures. vibe19 (v3) leads at 1704, 46-2 in
  games; scrims (matches 199-202, queued behind ranked 162-181) challenge StoneT2000 (botfinalsafe, bot1v43) and IvanGeffner (bot6b, eigthbot), which had
  not played (`contest19.py scrim --vs NAME,...`).
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
