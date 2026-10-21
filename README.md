# battlecode19-vibe

An autonomous attempt at a champion bot for Battlecode 2019 ("Crusade"), JavaScript, on the pinned engine `bc19` 0.4.7.

| File | What |
|---|---|
| `PROMPTS.md` | every owner prompt, verbatim (PDT) |
| `CLAUDE.md` | session rules |
| `RULES.md` | the game, checked against the engine source |
| `TRAINING_ALGORITHM.md` | how the bot gets stronger (year-agnostic) |
| `HANDOFF.md` | current state, how to run everything, open directions |
| `TRAINING_LOG.md` | append-only log of every attempt |
| `LEARNINGS.md` | confirmed lessons, each with its measurement |
| `ACCESS.md` | how to reach the private 2019 competition replica (galaxy) |
| `src/bot/` | the bot (one module per role; `world.js` is the side-symmetric canonical frame; `config.js` holds every behaviour switch) |
| `results/progress.svg` | win rate of each accepted build against reference opponents (`tools/progress.js`) |
| `bots/` | frozen builds (`ROSTER.tsv`) |
| `tools/` | build, runner, batch, replay reader, basics battery, symmetry check, paired read, map corpus, VM helper, `galaxy19/` replica, `bench/` field discovery |
| `test/` | unit tests: `tools/unit-tests.sh` |
| `maps/corpus.tsv` | features of map seeds 1-3000 |
| `research/prior/` | digests of earlier seasons' projects |
