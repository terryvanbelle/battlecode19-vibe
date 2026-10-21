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
