# LEARNINGS.md — confirmed lessons (each with its measurement)

1. **The first vm2 sandbox in a process takes 50-150 ms** (driver: example bot 56 ms cold, 8-25 ms warm), against a
   100 ms initialisation limit. A castle that misses it never acts and does not count as a castle at round 1000.
   Our runner warms vm2 up before round 1. Keep the bundle small and its top level cheap. (2026-10-21)
2. **Engine cost per robot-turn is dominated by compiling the state message** (46% of a 200-round profile is
   vm Script/runInContext); our code is under 5%. A full game with ~300 robots takes ~5 min on one VM core. The
   message compile is charged to the robot's clock in the official engine too. (2026-10-21)
3. **Init time grows with bundle size and with machine load.** A 48 KB unminified bundle failed init 1085 times in
   14 games at 8-way VM parallelism; the 22 KB minified build (tools/build_bot.js) still reaches 380 ms init under
   load 12 on 8 vCPU. Strategy batches on a shared VM use `--timescale 2`; time robustness is measured separately at
   timescale 1 and low load. (2026-10-21)
4. **Receivers see the sender's exact signal radius** (game.js:675-700), so a far message is authenticated by an
   unusual radius (ours: 398 attack, 99 enemy sighting), with no payload bits spent. (2026-10-21)
5. **Side symmetry can be built in, not tested in.** A canonical frame fixed by team colour (red castles are always
   in the generator's first half) makes both teams' worlds identical; tools/symcheck.js plays the bot against itself
   with twin-paired action application and reports the first divergence. Remaining divergences are mirror-axis
   tile contests and combat resolution order, both decided by the engine's turn order. (2026-10-21)
6. **Mirror the API's own bookkeeping, not just its inputs.** The JS API charges a signal's fuel the moment
   `signal()` is called and checks later actions against the lowered figure; a cached copy of the turn-start fuel
   passed our affordability checks and the API threw. Wrap every API call that spends, and update the cache there.
7. **Several agents share one git index.** `git add <paths> && git commit` also commits whatever another agent has
   staged; commit with `git commit -m ... -- <paths>` so only the named paths go in.
8. **Never oversubscribe the batch VM.** vm2 gives each new robot 200 ms (wall clock) to load its code; at load
   above the core count, robots fail init by the hundreds and whole games become noise (h6 vs v3: 5 of 40 games, both
   builds). Beside a running batch (4 games) and the replica (2), run one extra game process at most, under
   `flock ~/.bc-extra.lock`; check init_fail in every batch summary before reading a result.
9. **A remote `pgrep -f PATTERN` matches the ssh shell that runs it.** `gssh 'pgrep -f "dist/h14 "'` always
   succeeds, because the remote `bash -c` command line contains the pattern, so a wait-until-gone loop never ends (three
   delivery reads hung an hour). Bracket one character (`pgrep -f "dist/h1[4] "`) or wait on an output file.
10. **A killed turn keeps whatever it wrote.** vm2 stops a turn at its wall-clock limit wherever it is (a GC pause
   on a loaded machine is enough), and the robot's objects stay half-updated. Setup guarded by `turn === 1` then
   never finishes: one prophet threw on all of its 392 remaining turns. Lazy state must be built in locals and
   committed in one assignment, and setup must re-run until a flag set last says it finished. On the loaded driver
   this took caught exceptions from 789 to 0 in 300 rounds. (2026-10-21)
11. **The driver cannot host a full game, and the extra lane can stall the queue.** A 1000-round game's heap grows
   lazily to several GB; with `--max-old-space-size=1400` beside the 400 MB agent on the 2 GB driver, the host ran
   short of memory and every background shell of the session was killed (two VM waiters with it). Full-length
   diagnostics go to the VM's extra lane; the driver re-simulates replays only. On the VM, `jobq.sh` starts a gate
   only when no `tools/batch.js` runs, so extra-lane batches go through the link `tools/xbatch.js` in the shadow
   tree ~/projects/vibe/2019-next (new tools, the main tree's engine/maps/bots/dist linked) so as not to hold the queue. (2026-10-21)
12. **A step capped below a robot's speed needs a field counted in such steps.** Nav fields counted full-speed moves
   (r2 4 or 9); cruise moves capped at r2 2 lowered that distance only every other tile (every third for crusaders),
   so the robot counted itself blocked and waited two turns before sliding on: 24 tiles took 36 turns (46 for a
   crusader). Read "slides" and "blocked" counts as jams only after ruling this out. `CFG.NAV_FIT`; unit test 'nav:
   NAV_FIT'. (2026-10-21)
13. **Never time anything on the driver.** It is an e2-small (shared core, bursts then throttles): the same 100-round
   self-play game used 12 s of CPU once and 50 s the next, and under that load robots overran their clocks so even
   `--det` replays parted. Speed comparisons run on the VM, over many games (a gate's per-game wall time), never as a
   driver pair. Profiles are still useful for where time goes (the shares), not for how much. (2026-10-21)
14. **Over gssh, `pkill -f`/`pgrep -f` patterns match the remote command line that runs them.** A command that both
   names `dlv_chain6.sh` and kills processes matching it killed its own ssh session halfway (exit 255), leaving a
   child of the chain running. Kill by PID, or send the script on stdin (`gssh 'bash -s' < script`) so the pattern
   is not on any command line. The same trap locally: a background `bash -c "while pgrep -f 'run_game.js ...'; do
   sleep 5; done; ..."` waits forever on itself (2026-10-21 21:47); wait on a PID (`while kill -0 PID`). (2026-10-21)
15. **An out-of-sight tile is unknown, not free.** Lattice choice counted tiles out of vision as free, so a preacher
   (vision r2 16) traded two taken tiles for 36-74 turns, each seen taken only from the other's side; keeping the
   choice (sticky) cannot help when it really is taken. Remembering what was seen taken for 20 turns brought preacher
   oscillations on seed 2202 from 50 (h19) / 185 (NAV_FIT) to 3-4. `CFG.LATTICE_STICKY` 2. (2026-10-21)
