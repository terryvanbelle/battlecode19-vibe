# LEARNINGS.md — confirmed lessons (each with its measurement)

1. **The first vm2 sandbox in a process takes 50-150 ms** (driver: example bot 56 ms cold, 8-25 ms warm), against a
   100 ms initialisation limit. A castle that misses it never acts and does not count as a castle at round 1000.
   Our runner warms vm2 up before round 1. Keep the bundle small and its top level cheap. (2026-10-21)
2. **Engine cost per robot-turn is dominated by compiling the state message** (46% of a 200-round profile is
   vm Script/runInContext); our code is under 5%. A full game with ~300 robots takes ~5 min on one VM core. The
   message compile is charged to the robot's clock in the official engine too. (2026-10-21)
