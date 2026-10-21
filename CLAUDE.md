# battlecode19-vibe: session rules

Read `TRAINING_ALGORITHM.md` (the loop), `RULES.md` (the game, engine-checked), `HANDOFF.md` (state) and `LEARNINGS.md`
(lessons; add to it the day a lesson is confirmed). `TRAINING_LOG.md` is append-only and grep-only.

1. **Games in volume run only on the VM `battlecode-dev`** (us-west1-b, internal IP 10.138.0.3, `tools/vm.sh`).
   The driver `claude-driver` (2 vCPU / 2 GB) hosts this session and plays at most one diagnostic game at a time.
   `battlecode-dev2` belongs to the paused 2024 project: never touch it. Prior-year files on `battlecode-dev` may be
   deleted (owner, PROMPTS 2), but name each path explicitly.
2. **Record every owner prompt verbatim in `PROMPTS.md`** (PDT), never a prompt that a `/loop` fires. Push every
   commit to `main` at once; this agent is the only writer. Stage explicit paths. Report to the owner in PDT.
3. **External bots' source is never read**, except the automated security scan before first compile
   (`tools/bench-scan.sh`: pattern counts; a minimal look at a hit only to rule out a risk). Their games and replays
   may be studied freely.
4. **Battlecode 2019 post-mortems are never read**, first- or second-hand. Prior-year repo documents are read only
   through the filtered copy `~/projects/vibe/reference/readroom-no2019/` (built by
   `~/projects/vibe/reference/battlecode-vibe-no2019/build_readroom.py`, which drops every 2019-tagged block). Web
   searches avoid post-mortem pages (`battlecode.org/assets/files/postmortem-2019-*`, blogs and videos about 2019
   strategy). The official game material (specs, engine source, starter code, the official repo) is allowed.
5. **No effect on official Battlecode infrastructure.** Never run `bc19upload` or `bc19cloud`. The stock compiler
   posts Java/Python source to `battlecode.org/compile`: those languages are transpiled only by our local copy of the
   official transpiler, with that URL rewritten; egress to battlecode.org is blocked on the replica host. The galaxy
   replica runs only on our VM with every external integration stubbed. The only contact with battlecode.org /
   npm is the read-only, checksum-pinned engine download.
6. **All bot code runs sandboxed.** The engine isolates bots with vm2, which has known escapes: every game runs in a
   process with no network and a read-only view of everything but its own work directory.
7. **Unit tests after every change** to the bot or any tool: `tools/unit-tests.sh`.
8. **Work continuously; never stop to ask for new ideas.** Never end a turn with nothing armed to wake the session.
   When stuck: re-read principles from other years, audit the basics, or take a big swing (rewrites allowed).
9. **Nothing stale stays**: charts and documents that no longer match the data are regenerated or deleted.
10. **Basics first**: economy, movement, exploration, symmetry, combat, zero time-limit overruns, zero exceptions.
11. **Play other teams only through the replica, as a contestant.** Local games are between our own builds.
