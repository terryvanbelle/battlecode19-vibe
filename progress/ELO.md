# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-21 13:15 PDT.

476 games: 217 local (VM batches between our builds, candidates, sparring partners and the starter bot), 124 of ours on the galaxy replica and 135 between field bots there (135 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 10 players; compare them only within this fit.

**Thin field.** 4 rated field bots (CS554-software-engineerin~a575dc, CometsTech.battlecode2019, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 5 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (4), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1751 ± 188 | 2 of 10 | 61 | 51-10 | 95.0% | - |
| v1 | accepted | 1579 ± 152 | 5 of 10 | 195 | 148-47 | 88.6% | - |
| v2 | accepted | 1548 ± 158 | 6 of 10 | 86 | 42-44 | 87.1% | - |
| v3 | accepted | 1755 ± 170 | 1 of 10 | 88 | 62-26 | 95.2% | - |
| h2 | candidate | 1701 ± 189 | 4 of 10 | 54 | 23-31 | 93.6% | - |
| h3 | candidate | 1748 ± 249 | 3 of 10 | 14 | 8-6 | 95.0% | - |

Sources (`tools/progress/games.py`):

- local: 217 games from 9 batch files (skipped: 23 init failure)
- replica: 259 games (11 archive games skipped, 31 matches from archives, 45 matches from scores), fetched 2026-10-21T20:21:36+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v3) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **us:v3** | accepted | 1755 | 170 | 88 | 62-26 |  |
| 2 | **us:v0** | accepted | 1751 | 188 | 61 | 51-10 |  |
| 3 | **cand:h3** | candidate | 1748 | 249 | 14 | 8-6 |  |
| 4 | **cand:h2** | candidate | 1701 | 189 | 54 | 23-31 |  |
| 5 | **us:v1** | accepted | 1579 | 152 | 195 | 148-47 |  |
| 6 | **us:v2** | accepted | 1548 | 158 | 86 | 42-44 |  |
| 7 | CS554-software-engineerin~a575dc | field | 1413 | 173 | 113 | 86-27 | 100% (v3 3-0) |
| 8 | CometsTech.battlecode2019 | field | 1307 | 179 | 72 | 31-41 | 100% (v3 6-0) |
| 9 | bc19-starter | field | 614 | 280 | 233 | 25-208 | 100% (v3 3-0) |
| 10 | ArtemUstilov.bc19_CrazyTapok | field | -338 | 1004 | 36 | 0-36 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| us:v3 | cand:h2 | 40 | 23-17 | 57% | local |
| us:v3 | us:v2 | 36 | 27-9 | 75% | local |
| us:v3 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| us:v3 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| us:v3 | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 37 | 27-10 | 73% | local |
| us:v0 | bc19-starter | 24 | 24-0 | 100% | local |
| cand:h3 | cand:h2 | 14 | 8-6 | 57% | local |
| us:v1 | us:v2 | 30 | 17-13 | 57% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 102 | 102-0 | 100% | local, replica |
| us:v2 | bc19-starter | 20 | 20-0 | 100% | local |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 39 | 23-16 | 59% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 51 | 50-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 6 | 6-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 9 | 9-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 24 | 24-0 | 100% | replica |
