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
   driver pair. Profiles are still useful for where time goes (the shares), not for how much. (2026-10-21) The same
   holds for no-op checks: run them with nothing else on the driver. A replay census beside one froze a castle's
   round-3 turn (an empty record), the replay parted and read as a behaviour change; alone it was IDENTICAL.
   (2026-10-23)
14. **Over gssh, `pkill -f`/`pgrep -f` patterns match the remote command line that runs them.** A command that both
   names `dlv_chain6.sh` and kills processes matching it killed its own ssh session halfway (exit 255), leaving a
   child of the chain running. Kill by PID, or send the script on stdin (`gssh 'bash -s' < script`) so the pattern
   is not on any command line. The same trap locally: a background `bash -c "while pgrep -f 'run_game.js ...'; do
   sleep 5; done; ..."` waits forever on itself (2026-10-21 21:47); wait on a PID (`while kill -0 PID`). (2026-10-21)
15. **An out-of-sight tile is unknown, not free.** Lattice choice counted tiles out of vision as free, so a preacher
   (vision r2 16) traded two taken tiles for 36-74 turns, each seen taken only from the other's side; keeping the
   choice (sticky) cannot help when it really is taken. Remembering what was seen taken for 20 turns brought preacher
   oscillations on seed 2202 from 50 (h19) / 185 (NAV_FIT) to 3-4. `CFG.LATTICE_STICKY` 2. (2026-10-21)
16. **A flee rule that starts inside the enemy's range lets a unit walk into range itself.** The unit that steps in
   is shot before its next turn, so it never gets to flee. Two replica pioneers died this way (scrim 199 seed 1915:
   r2 65 -> 61 of a prophet; scrim 200 seed 2924: 81 -> 49). Keeping every step out of visible attackers' threat
   range (`CFG.PILGRIM_SAFE_STEP`, pilgrim.js stepAvoid) cut pilgrims lost in four 200-round self-play games from
   46 to 5 and mined 11% more. Check moves, not only positions. (2026-10-21)
17. **Creating a robot has wall-clock limits, so host load decides whether a big bundle's robots run at all.** The
   engine runs the bundle in a fresh vm2 sandbox under vm2's 200 ms timeout (vm.js, TURN_MAX_TIME), then fails the
   robot if creation took longer than `chess_initial` (runtime.js; the replica raises that one to 1000 ms,
   GALAXY_INIT_MS, and from 2026-10-22 vm2's run of the bundle too: run_game.js loadLimit; match 306 had lost 16
   StoneT2000 robots to the 200 ms one at init_ms_max 937 ms, so raising GALAXY_INIT_MS alone would have changed
   nothing). A robot that fails stays on its tile and throws "Robot is not initialized." every
   turn, which run_game.js counts as init_fail: StoneT2000's bot1v43 logged 4,509 of them (and 35 timeouts) in the
   one game we took from it (scrim 200, seed 520). Across our 201 replica games, 57 had more than 50 opponent clock
   failures and we won 49 of those, on a VM running 7 engine processes on 8 vCPUs. Our 33 KB bundle loads in a few
   ms. Read replica wins over a bot with clock failures as inflated; our own VM games run at nice 10
   (`tools/jobq.sh`, the extra lane) so the replica's games get whole cores. (2026-10-21) The same holds for the
   2-vCPU driver: replay analyses run beside a diagnostic game left 466 "not initialized" and 342 overdrawn-clock
   turns in it (h69, 2026-10-22), so the game measured the host, not the bot. While the driver plays, it does
   nothing else heavy.
18. **Stack independent switches that passed their deliveries; do not wait for each single gate.** A switch whose
   effect is a few percent needs far more than 40 games to show alone (h31, church density: 25-15, t 1.67 at 20
   cells, inconclusive), and a queue of single gates takes a day. h35, the stack of every delivered switch on
   independent mechanisms (church density, cargo relay, nav fit and lattice memory, safe pilgrim steps), went 35-5
   (t 3.44) and became v5 55 minutes after its gate started. Keep the stack to switches whose deliveries
   passed and whose mechanisms do not overlap, and keep the single gates queued for attribution only if the queue
   has room. (2026-10-22)
19. **Before queueing a delivery, prove the switch changes a move.** One driver diagnostic, then diff its replay
   against a game of the base on the same seed and side (first differing turn; scratch rdiff.js): h45 (EDGE, hold
   at the edge of enemy reach) played 35,904 turns identical to the base, because a prophet's vision equals an
   enemy prophet's reach, so the edge it was to hold never existed in its own view. Withdrawn before it spent a
   queue slot; h47 (FOCUS) first diverged at round 469 and went on. A switch keyed on what a unit "sees beyond"
   needs information from outside its own vision (radio, memory). (2026-10-22)
20. **A gate's power is set by its discordant cells, not its games; simulate it (tools/gatesim.js).** On this
   deterministic engine a switch that never fires on a map plays byte-identical games there (h54's first 20 cells:
   17 identical, D 3; h55's: 0 identical, D 11), so 40 games can hold almost no evidence. Simulated (20,000 gates,
   looks at the block boundaries where D first reaches 12, 24, 48; accept t >= 2, reject t <= 0; at most 200
   cells): false accept 4-5% at no effect; power 41% / 61% (switch live on 15% / 55% of cells) when the candidate
   wins 65% of discordant cells, 63% / 84% at 70%, at a mean cost of ~150 / ~65 cells. The old rule (20 cells,
   one 20-cell extension) had 10-22% power at 65%: most real gains ended "inconclusive". Rank queued candidates by
   how often their switch fires as well as by their prior; a rarely-firing switch costs a day of gate time.
   (2026-10-22)
21. **A replica deploy ships every tool change since the last one; run one game under the unit's own sandbox before
   restarting.** Deploying saturn's 5th slot (2026-10-22 09:32 PDT) also shipped run_game.js's network check
   (os.networkInterfaces), which the saturn unit forbids (RestrictAddressFamilies: no netlink, EAFNOSUPPORT): every
   game exited 1 at once, 218 nacks in 10 s, 152 matches to TRY (retryable, so nothing was lost but attempts). The
   driver's and the operator's runs passed because neither sandbox restricts address families. Test with
   `systemd-run --wait --pipe` and the unit's properties (README: deploying), then restart, then watch the first
   minute of the journal. (2026-10-22)
22. **Find out how the strongest opponent actually takes castles before you tune anything else.** A robot built in a
   round acts in that round, so a church can build a pilgrim that builds the next church, and a whole line of up to
   16 churches appears in a single round, ending 1-2 tiles from a castle and building preachers there at once.
   StoneT2000 (the field's best, BT ~2,050) does this in 28 of its 33 replica games against us. About 20 of those
   lines end within 4 king steps of one of our castles, and we lose that castle within 25 rounds; we never chain.
   It banks for the chain (1,345-1,555 K just before, against our 55-213) and keeps a smaller army (46 against our
   94 at round 250 of 407-3). No shooter can stop a line while it is being built; only units already beside the
   castle, or the bank, can answer it. Census: scratch chains.js over replica matches 199-407. (2026-10-22)
23. **A new birth path needs every fact the old ones hand a newborn; trace the spender by id before naming a cause.**
   Our robots learn the round from their builder's radio. A newborn acts after every robot already in the round (the
   engine appends it), so an enemy can kill the builder in between: on seed 799 a chainer was shot before its first
   church acted, the church heard nothing, never knew the round, and every round-gated rule read "before round X":
   it spent the line's bank on 136 units (h72, h74; TRAINING_LOG 2026-10-22 15:02). Two readings were wrong first (a
   threat-response grinder from build counts by kind; then "a line church hears only SIG.CHAIN"); the event order of
   the one round (build, kill, newborn's turn) settled it. When a change adds a way to be born, list what a newborn
   learns on its first turn on each path, including a dead builder, and unit-test it. (2026-10-22)
24. **A replay shows where a robot stood, not what it was after: log its state before naming why it idles.** h68's
   failed delivery was read twice from positions (11:52: "16-22 steps off a site its team churched"; 16:12: "its site
   was taken, it dropped it and has no free depot") and both were wrong. One driver game with a debug build that logs
   each idle pilgrim's site, target, occupancy and action (a scratch copy of src/bot with one w.log) showed it in a
   page: #1936 gave its site up under enemy eyes, took the free depot nearest itself, 11 king steps on under the
   enemy's guards, and hovered short of it for 220 turns. A replay re-simulates actions; the decision behind them is
   only in the bot. (TRAINING_LOG 2026-10-22 16:29)
25. **Profile the harness, not only the bot: a game's wall time is mostly the engine's sandbox plumbing.** A CPU
   profile of a 300-round self-play game on the VM put our bot's functions at a few percent; vm2's timed
   runInContext took 43% and the engine's per-turn state dump 24%. Two shortcuts halved the game (252 s -> 129 s)
   with the same replay byte for byte: compile the bundle once for all robot sandboxes (vm2 recompiled 50 KB per
   robot, 43 ms each; `--fast-init`), and drop the per-turn kill in our own-build batches (vm2 starts a watchdog
   thread per timed call, ~1.3 ms a turn on a loaded host; `--no-kill`, with a per-game wall cap instead). A second
   profile then put the engine's turn message on top (a JSON round trip per robot shown, a fresh map-sized view):
   writing the same text directly took the game to 82 s (`--fast-view`). Check any such shortcut with a --det replay
   compare before trusting it, and keep the engine's path wherever time is the thing measured; work done before the
   robot's clock starts (the turn message) changes no clock, so it can go on the replica too. Inside the sandbox,
   prefer bulk built-ins to loops: rebuilding the out-of-sight view rows with a push loop cost more CPU than parsing
   them (0.19 vs 0.125 ms a turn); copying one row with slice cost 0.061, 6% of the game. The engine's own
   per-turn checks are fair game too (its game-over scan of every robot, 4%), and so is the VM's young generation:
   a 64 MB semi-space cut GC enough for 10% more. (TRAINING_LOG 2026-10-22 18:46, 18:56, 19:50, 20:15, 20:37)
26. **Size the game runner for the biggest games the field plays, and let its finished work survive its own crashes and
   restarts.** The replica capped each game's V8 heap at 2 GB, sized from our own games; the top benchmark bots fill
   big maps with 300-800 robots a side, each a vm2 sandbox, and those games sat at the cap: one died in GC ("heap out
   of memory") and one segfaulted after an hour, and every game near the cap spends robots' turns in full GCs that the
   chess clock charges to them. Each failure, and each of three deploy restarts, re-ran its match from game 1 (up to
   1.6 h lost per match). saturn now keeps every finished game until its message is acked and replays only the
   missing ones; the heap is 3 GB. Watch per-game RSS against the cap, not only the VM's free memory.
   (TRAINING_LOG 2026-10-22 23:31)
27. **Stamp every log entry and report from the clock, never from a sense of elapsed time.** Over a long night the
   agent's estimate of the hour ran ahead of the real one: TRAINING_LOG headings drifted from 8 to 47 minutes past
   their own commit times in five hours, and HANDOFF quoted a state time still to come. Read `date` (PDT for the
   owner) whenever a time is written. (TRAINING_LOG 2026-10-23 03:30)
28. **Read a candidate's switches back from its bundle before playing it; a tool must refuse arguments it does not
   know.** `build_bot.js --cfg A=1 B=2` built h118 with A only (B was a stray argument, silently dropped), and its
   first diagnostic replayed h117's games move for move. build_bot now exits on any argument it does not parse; the
   bundle's `Object.assign(CFG, {...})` line is the record of what a build is. (TRAINING_LOG 2026-10-23 10:23)
29. **Edit the ledger through its tool (`tools/progress/attempts.py set CODE field=value`), never by line edits.** A
   hand-edited row with an unquoted comma split into 11 fields; four rows (h117, h118, h120, h121) carried their
   sources into the wrong column for hours and the renderer said nothing. `attempts.py` now refuses such a file.
   (TRAINING_LOG 2026-10-23 11:37)
30. **A waiter must not match itself.** `until ! pgrep -f "unit-tests.sh"; do sleep 5; done` never ends: the waiter's
   own shell carries the pattern in its command line. Seven such waiters looped for hours unseen. Write the pattern
   so it cannot match its own text (`pgrep -f "[u]nit-tests.sh"`), or wait on the output file or a PID.
   (TRAINING_LOG 2026-10-23 12:01)
31. **Read a replica freeze before chasing it.** "Script execution timed out" is vm2's 200 ms kill on one turn and
   "clock overdrawn" freezes a robot only until its bank refills (+20 ms a turn), so each costs about one turn. In
   2019 a turn's time is mostly the engine (the turn message is compiled as a script every turn), GC and load; our
   code was ~2 ms a turn. Profile before rewriting: `node --cpu-prof` on one game with an unminified build.
   (TRAINING_LOG 2026-10-23 14:18)
32. **Self-play does not rank against the field.** Three candidates beat the incumbent locally and lost to it on the
   replica panel: h126 (gate t 1.00 -> replica net 0), h127 (t 1.26 -> net -3), h130 (prophet army, t 1.67 -> net
   -2). A switch that exploits the incumbent's own habits (camping its mirror site, outranging its crusaders) buys
   nothing against bots without those habits. Use the local gate to reject; let only the replica panel accept.
   (2026-10-23 22:09)

33. **One control block is a sample, not a baseline.** On the v7 panel (18 cells), twelve candidate blocks against
   the single control 420-425 all read net -3..+2. Pooled over the twelve, the cells the control won include three
   coin flips (IanCoolidge0 203 3/12, botfinalsafe 203 4/12, awesomelemonade 1712 5/12), so nearly every candidate
   "lost" them; the cells it lost include four the pool wins 3-4 times in 12, which nearly every candidate "gained".
   Pooled mean 5.4 wins in 18 against the control's 6: no candidate is distinguishable from v7. Six cells the pool
   never wins (wololo 2013, 836; botfinalsafe 1706; awesomelemonade 2518; uvafan 2046; bot1v43 2591 once in 12) are
   where an improvement shows. (2026-10-24 04:1x)
