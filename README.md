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
| `src/bot/` | the bot (one module per role; `config.js` holds every behaviour switch) |
| `bots/` | frozen builds (`ROSTER.tsv`) |
| `tools/` | runner, batch, replay reader, basics battery, paired read, map corpus, VM helper |
| `test/` | unit tests: `tools/unit-tests.sh` |
| `maps/corpus.tsv` | features of map seeds 1-3000 |
| `research/prior/` | digests of earlier seasons' projects |
