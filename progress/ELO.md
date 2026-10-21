# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-21 15:13 PDT.

562 games: 228 local (VM batches between our builds, candidates, sparring partners and the starter bot), 154 of ours on the galaxy replica and 180 between field bots there (180 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 13 players; compare them only within this fit.

**Thin field.** 4 rated field bots (CS554-software-engineerin~a575dc, CometsTech.battlecode2019, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 5 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (4), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1673 ± 245 | 5 of 13 | 38 | 33-5 | 94.6% | - |
| v1 | accepted | 1522 ± 184 | 8 of 13 | 154 | 128-26 | 88.8% | - |
| v2 | accepted | 1568 ± 186 | 6 of 13 | 62 | 30-32 | 90.9% | - |
| v3 | accepted | 1770 ± 176 | 2 of 13 | 146 | 102-44 | 96.8% | - |
| h2 | candidate | 1718 ± 199 | 3 of 13 | 54 | 25-29 | 95.7% | - |
| h3 | candidate | 1697 ± 245 | 4 of 13 | 19 | 9-10 | 95.3% | - |
| h6 | candidate | 1799 ± 199 | 1 of 13 | 55 | 38-17 | 97.2% | - |
| h7 | candidate | 1568 ± 1266 | 7 of 13 | 8 | 8-0 | 90.9% | - |
| rush | sparring | 1388 ± 369 | 9 of 13 | 12 | 1-11 | 80.8% | - |

Sources (`tools/progress/games.py`):

- local: 228 games from 13 batch files (skipped: 23 init failure, 64 load (robot init failures))
- replica: 334 games (11 archive games skipped, 41 matches from archives, 60 matches from scores), fetched 2026-10-21T22:14:26+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v3) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h6** | candidate | 1799 | 199 | 55 | 38-17 |  |
| 2 | **us:v3** | accepted | 1770 | 176 | 146 | 102-44 |  |
| 3 | **cand:h2** | candidate | 1718 | 199 | 54 | 25-29 |  |
| 4 | **cand:h3** | candidate | 1697 | 245 | 19 | 9-10 |  |
| 5 | **us:v0** | accepted | 1673 | 245 | 38 | 33-5 |  |
| 6 | **us:v2** | accepted | 1568 | 186 | 62 | 30-32 |  |
| 7 | **cand:h7** | candidate | 1568 | 1266 | 8 | 8-0 |  |
| 8 | **us:v1** | accepted | 1522 | 184 | 154 | 128-26 |  |
| 9 | **spar:rush** | sparring | 1388 | 369 | 12 | 1-11 |  |
| 10 | CS554-software-engineerin~a575dc | field | 1324 | 188 | 155 | 106-49 | 93% (v3 14-1) |
| 11 | CometsTech.battlecode2019 | field | 1283 | 190 | 111 | 54-57 | 100% (v3 18-0) |
| 12 | bc19-starter | field | 520 | 303 | 262 | 28-234 | 100% (v3 9-0) |
| 13 | ArtemUstilov.bc19_CrazyTapok | field | -453 | 1037 | 48 | 0-48 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | spar:rush | 12 | 11-1 | 92% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 15 | 14-1 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 18 | 18-0 | 100% | replica |
| us:v3 | bc19-starter | 9 | 9-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 54 | 27-27 | 50% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 60 | 59-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 12 | 12-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 18 | 18-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 9 | 9-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 27 | 27-0 | 100% | replica |
