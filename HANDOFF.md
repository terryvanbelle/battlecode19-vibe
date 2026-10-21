# HANDOFF.md — state and how to run things

## State (2026-10-21 15:30 PDT)
- Bot `src/bot`: the v2 canonical-frame design (src/bot/world.js): every robot sees its own side on top, so both
  teams make mirror-image decisions. Champion **v3** (`bots/v3`, ROSTER.tsv); frozen history v0-v3, sparring partner
  `bots/rush`. Games run built bundles (`tools/build_bot.js`), never the source directory. Every candidate change is
  a CFG switch whose default is the incumbent; candidates are built with `--cfg KEY=JSON` into `dist/hN`.
- Dev line h6 (v3 + RNG reseed, depot cooldown, crusader/preacher rotation, miner switching, shooting fuel floor) is
  level with v3 (23-17, t 0.7; 7-7 without load-contaminated games): it loses every single-castle map on castles
  near round 500 and wins the multi-castle ones. Candidates are switches on h6, gated against h6 (ATTEMPTS.md).
- VM queue (`~/jobq`, in order): h6 vs rush (running), h11c (cruise patience), h15 (ablation: no build rotation),
  h16 (turtle: never attack), h7, h8, h9, h10, v3 vs v0, v3 vs rush. Parked (delivery failed or superseded): h11,
  h12 (waves), h13 (keep clear), v3 vs v1, v3 vs example. h14 (detour) is in its delivery check.
- Main finding: armies jam in their own base. On seed 2202 85-90% of h6's army is within 12 king steps of home
  through round 700 although every unit has a target; the attack that does get out loses. h11c's patient army
  stays home and wins on health.
- Replica ladder (ACCESS.md, tools/galaxy19, `tools/galaxy19/contest19.py`): team vibe19 runs v3; the benchmark
  field (87 public 2019 bots found, tools/bench/field.tsv) is being compiled and smoke-tested by a helper agent.
- VM work goes through the sequential job queue `tools/jobq.sh` (add/start/status) so batches never overlap. Beside
  a batch, at most one extra game process, under `flock ~/.bc-extra.lock` (LEARNINGS 8).

## Commands
```
tools/unit-tests.sh                                   # after every change
node tools/build_bot.js src/bot dist/dev              # minified single-file bundle that games run
node tools/symcheck.js --bot dist/dev --seeds 1,2,3 --rounds 200   # side-symmetry check (VM)
node tools/run_game.js --red src/bot --blue bots/v0 --seed 2 --replay r.bc19 --logs l.jsonl   # one game
node tools/replay.js summary r.bc19                  # also: rounds, unit --id, board --round, events, nav, talk
node tools/basics.js --team red r.bc19               # basics battery
source tools/vm.sh && ensure_vm && vm_sync           # push code to the VM
gssh 'cd ~/projects/vibe/2019 && ~/bin/node tools/batch.js --a dist/dev --b bots/v1 --random 24 --par 6 --timescale 2 --out ~/runs/results.jsonl --replays ~/runs/replays --tag X'
node tools/summarize.js results.jsonl ; node tools/paired.js results.jsonl --cand H1 --ctrl H2
node tools/build_bot.js src/bot dist/h7 --cfg ATTACK_PERSIST=1   # a candidate: incumbent + one switch
gssh 'cd ~/projects/vibe/2019 && bash tools/jobq.sh add "node tools/batch.js ..."; bash tools/jobq.sh status'
tools/snapshot.sh v1 "note"                          # freeze an accepted build
```
