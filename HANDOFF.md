# HANDOFF.md — state and how to run things

## State (2026-10-21)
- Bot `src/bot` (frozen as `bots/v0`): see TRAINING_LOG.md. Working copy adds v1 production behind `CFG.PROD_V1`.
- Field discovery, the local Java/Python transpiler and the galaxy replica are being built (background agents).

## Commands
```
tools/unit-tests.sh                                   # after every change
node tools/run_game.js --red src/bot --blue bots/v0 --seed 2 --replay r.bc19 --logs l.jsonl   # one game
node tools/replay.js summary r.bc19                  # also: rounds, unit --id, board --round, events, nav, talk
node tools/basics.js --team red r.bc19               # basics battery
source tools/vm.sh && ensure_vm && vm_sync           # push code to the VM
gssh 'cd ~/projects/vibe/2019 && ~/bin/node tools/batch.js --a src/bot --b bots/v0 --random 24 --par 6 --out ~/runs/results.jsonl --replays ~/runs/replays --tag X'
node tools/summarize.js results.jsonl ; node tools/paired.js results.jsonl --cand H1 --ctrl H2
tools/snapshot.sh v1 "note"                          # freeze an accepted build
```
