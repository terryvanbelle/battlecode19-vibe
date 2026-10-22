# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-21 18:31 PDT.

763 games: 291 local (VM batches between our builds, candidates, sparring partners and the starter bot), 181 of ours on the galaxy replica and 291 between field bots there (291 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 30 players; compare them only within this fit.

**Thin field.** 19 rated field bots (IvanGeffner.BC19-eigthbot, IvanGeffner.BC19-bot6b, IanCoolidge0.battlecode20~f649f3, Tom-CCS.BC19, SethKitchen.examplefuncsplayer, IanCoolidge0.battlecode20~69ce88, StoneT2000.BC19-botfinalsafe, 18dcb01.Battlecode19-prea~fb5c48, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, NielsKornerup.Battlecode-2019, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, TheRobotCarlson.battlehac~323871, DivyanshuSaxena.Battlecode, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 60 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (19), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1644 ± 309 | 12 of 30 | 38 | 33-5 | 72.4% | 38.3% (vs 6) |
| v1 | accepted | 1493 ± 259 | 19 of 30 | 154 | 128-26 | 60.3% | 27.4% (vs 8) |
| v2 | accepted | 1546 ± 262 | 16 of 30 | 62 | 30-32 | 64.6% | 26.5% (vs 6) |
| v3 | accepted | 1752 ± 251 | 5 of 30 | 173 | 128-45 | 80.2% | 35.7% (vs 2) |
| h11c | candidate | 1846 ± 298 | 2 of 30 | 25 | 15-10 | 85.9% | 44.0% (vs 1) |
| h18 | candidate | 1577 ± 306 | 13 of 30 | 25 | 6-19 | 67.1% | 30.0% (vs 6) |
| h2 | candidate | 1700 ± 272 | 6 of 30 | 54 | 25-29 | 76.6% | 29.2% (vs 2) |
| h3 | candidate | 1680 ± 309 | 8 of 30 | 19 | 9-10 | 75.1% | 33.8% (vs 3) |
| h6 | candidate | 1778 ± 267 | 4 of 30 | 118 | 75-43 | 81.9% | 39.2% (vs 2) |
| h7 | candidate | 1552 ± 1335 | 15 of 30 | 8 | 8-0 | 65.1% | 27.2% (vs 6) |
| rush | sparring | 1577 ± 306 | 14 of 30 | 25 | 6-19 | 67.1% | 30.0% (vs 6) |

Sources (`tools/progress/games.py`):

- local: 291 games from 16 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 472 games (11 archive games skipped, 50 matches from archives, 97 matches from scores), fetched 2026-10-22T01:43:01+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v3) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | IvanGeffner.BC19-eigthbot | field | 1888 | 1084 | 3 | 3-0 |  |
| 2 | **cand:h11c** | candidate | 1846 | 298 | 25 | 15-10 |  |
| 3 | IvanGeffner.BC19-bot6b | field | 1821 | 1615 | 3 | 3-0 |  |
| 4 | **cand:h6** | candidate | 1778 | 267 | 118 | 75-43 |  |
| 5 | **us:v3** | accepted | 1752 | 251 | 173 | 128-45 |  |
| 6 | **cand:h2** | candidate | 1700 | 272 | 54 | 25-29 |  |
| 7 | IanCoolidge0.battlecode20~f649f3 | field | 1697 | 461 | 9 | 7-2 |  |
| 8 | **cand:h3** | candidate | 1680 | 309 | 19 | 9-10 |  |
| 9 | Tom-CCS.BC19 | field | 1673 | 1376 | 3 | 3-0 |  |
| 10 | SethKitchen.examplefuncsplayer | field | 1673 | 1376 | 3 | 3-0 |  |
| 11 | IanCoolidge0.battlecode20~69ce88 | field | 1651 | 495 | 9 | 8-1 |  |
| 12 | **us:v0** | accepted | 1644 | 309 | 38 | 33-5 |  |
| 13 | **cand:h18** | candidate | 1577 | 306 | 25 | 6-19 |  |
| 14 | **spar:rush** | sparring | 1577 | 306 | 25 | 6-19 |  |
| 15 | **cand:h7** | candidate | 1552 | 1335 | 8 | 8-0 |  |
| 16 | **us:v2** | accepted | 1546 | 262 | 62 | 30-32 |  |
| 17 | StoneT2000.BC19-botfinalsafe | field | 1523 | 1422 | 3 | 3-0 |  |
| 18 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1520 | 424 | 9 | 4-5 |  |
| 19 | **us:v1** | accepted | 1493 | 259 | 154 | 128-26 |  |
| 20 | JasonLarson44.2019-Battle~1c7639 | field | 1417 | 451 | 6 | 5-1 |  |
| 21 | 18dcb01.Battlecode19-robot2 | field | 1399 | 511 | 6 | 1-5 |  |
| 22 | NielsKornerup.Battlecode-2019 | field | 1317 | 391 | 6 | 2-4 |  |
| 23 | CS554-software-engineerin~a575dc | field | 1279 | 245 | 203 | 129-74 | 93% (v3 25-2) |
| 24 | CometsTech.battlecode2019 | field | 1265 | 247 | 165 | 86-79 | 100% (v3 30-0) |
| 25 | OmarTahoun.battle-code | field | 1179 | 1615 | 3 | 0-3 |  |
| 26 | CometsTech.battlecode2019~187e8c | field | 1040 | 1145 | 3 | 0-3 |  |
| 27 | TheRobotCarlson.battlehac~323871 | field | 949 | 1459 | 6 | 0-6 |  |
| 28 | DivyanshuSaxena.Battlecode | field | 825 | 1142 | 3 | 0-3 |  |
| 29 | bc19-starter | field | 458 | 371 | 301 | 43-258 | 100% (v3 12-0) |
| 30 | ArtemUstilov.bc19_CrazyTapok | field | -592 | 1105 | 81 | 0-81 |  |

Replica teams with no recorded game: Nydroam.BatteredCod, RyanSharafuddin.Battlecode_2019, StoneT2000.BC19-bot1v43, TestSubjector.BattleCode2~e6de74, TestSubjector.BattleCode2~fb22c7, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 27 | 25-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 30 | 30-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 69 | 32-37 | 46% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
