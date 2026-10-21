# HANDOFF.md — state and how to run things

## State (2026-10-21)
- Bot `src/bot` is v2, a rewrite in a canonical frame (src/bot/world.js): every robot sees its own side on top, so
  both teams make mirror-image decisions. Frozen earlier bots: `bots/v0`, `bots/v1`. Games run the built bundle
  `dist/dev` (`node tools/build_bot.js src/bot dist/dev`), never the source directory.
- v2 beats the starter example 20/20 and is about even with v1 (first 10-game sample).
- Field discovery, the local Java/Python transpiler and the galaxy replica are being built (background agents).

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
tools/snapshot.sh v1 "note"                          # freeze an accepted build
```
