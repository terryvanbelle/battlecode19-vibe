# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 09:28 PDT.

1484 games: 871 local (VM batches between our builds, candidates, sparring partners and the starter bot), 226 of ours on the galaxy replica and 387 between field bots there (387 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 65 players; compare them only within this fit.

**Thin field.** 28 rated field bots (StoneT2000.BC19-bot1v43, StoneT2000.BC19-botfinalsafe, uvafan.bc2019, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, awesomelemonade.Battlecode2019, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, abcdefguan.battlecode2019, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, SethKitchen.examplefuncsplayer, Nydroam.BatteredCod, vishwasns99.BC_2019, 18dcb01.Battlecode19-robot2, JasonLarson44.2019-Battle~1c7639, CS554-software-engineerin~a575dc, OmarTahoun.battle-code, CometsTech.battlecode2019, TestSubjector.BattleCode2~fb22c7, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~e6de74, DivyanshuSaxena.Battlecode, RyanSharafuddin.Battlecode_2019, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (28), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1450 ± 258 | 40 of 65 | 38 | 33-5 | 68.3% | 25.3% (vs 8) |
| v1 | accepted | 1296 ± 191 | 49 of 65 | 154 | 128-26 | 57.1% | 21.0% (vs 12) |
| v2 | accepted | 1336 ± 180 | 46 of 65 | 62 | 30-32 | 60.2% | 24.6% (vs 12) |
| v3 | accepted | 1534 ± 146 | 32 of 65 | 191 | 140-51 | 73.9% | 27.1% (vs 6) |
| v4 | accepted | 1489 ± 140 | 36 of 65 | 220 | 83-137 | 70.9% | 26.0% (vs 7) |
| v5 | accepted | 1759 ± 142 | 12 of 65 | 409 | 187-222 | 86.0% | 31.5% (vs 3) |
| v6 | accepted | 1862 ± 159 | 5 of 65 | 90 | 55-35 | 90.0% | 24.5% (vs 1) |
| h11c | candidate | 1585 ± 197 | 28 of 65 | 25 | 15-10 | 77.0% | 22.1% (vs 4) |
| h16r | candidate | 1419 ± 177 | 42 of 65 | 40 | 16-24 | 66.1% | 25.1% (vs 9) |
| h18 | candidate | 1317 ± 211 | 47 of 65 | 25 | 6-19 | 58.7% | 22.8% (vs 12) |
| h2 | candidate | 1484 ± 183 | 37 of 65 | 54 | 25-29 | 70.6% | 25.6% (vs 7) |
| h24 | candidate | 1596 ± 178 | 27 of 65 | 40 | 26-14 | 77.7% | 23.0% (vs 4) |
| h24v5 | candidate | 1811 ± 178 | 10 of 65 | 40 | 23-17 | 88.1% | 37.8% (vs 3) |
| h3 | candidate | 1466 ± 237 | 39 of 65 | 19 | 9-10 | 69.4% | 26.9% (vs 8) |
| h31 | candidate | 1577 ± 177 | 29 of 65 | 40 | 25-15 | 76.6% | 21.4% (vs 4) |
| h38 | candidate | 1605 ± 316 | 26 of 65 | 6 | 4-2 | 78.2% | 23.9% (vs 4) |
| h40 | candidate | 1674 ± 301 | 20 of 65 | 8 | 6-2 | 82.0% | 22.5% (vs 3) |
| h41 | candidate | 1666 ± 280 | 21 of 65 | 8 | 3-5 | 81.6% | 21.7% (vs 3) |
| h42 | candidate | 1666 ± 280 | 22 of 65 | 8 | 3-5 | 81.6% | 21.7% (vs 3) |
| h43 | candidate | 1754 ± 274 | 13 of 65 | 8 | 4-4 | 85.8% | 30.9% (vs 3) |
| h44 | candidate | 1940 ± 304 | 3 of 65 | 8 | 6-2 | 92.5% | 33.7% (vs 1) |
| h46 | candidate | 1666 ± 280 | 23 of 65 | 8 | 3-5 | 81.6% | 21.7% (vs 3) |
| h47 | candidate | 1754 ± 274 | 14 of 65 | 8 | 4-4 | 85.8% | 30.9% (vs 3) |
| h48 | candidate | 1754 ± 274 | 15 of 65 | 8 | 4-4 | 85.8% | 30.9% (vs 3) |
| h49 | candidate | 1754 ± 274 | 16 of 65 | 8 | 4-4 | 85.8% | 30.9% (vs 3) |
| h52 | candidate | 1666 ± 280 | 24 of 65 | 8 | 3-5 | 81.6% | 21.7% (vs 3) |
| h53 | candidate | 1841 ± 280 | 7 of 65 | 8 | 5-3 | 89.3% | 36.0% (vs 2) |
| h54 | candidate | 1832 ± 173 | 8 of 65 | 48 | 29-19 | 88.9% | 34.9% (vs 2) |
| h55 | candidate | 1801 ± 171 | 11 of 65 | 56 | 32-24 | 87.8% | 36.6% (vs 3) |
| h58 | candidate | 1707 ± 296 | 19 of 65 | 8 | 3-5 | 83.7% | 25.8% (vs 3) |
| h59 | candidate | 1754 ± 274 | 17 of 65 | 8 | 4-4 | 85.8% | 30.9% (vs 3) |
| h6 | candidate | 1515 ± 143 | 35 of 65 | 158 | 94-64 | 72.7% | 28.7% (vs 7) |
| h60 | candidate | 1754 ± 274 | 18 of 65 | 8 | 4-4 | 85.8% | 30.9% (vs 3) |
| h61 | candidate | 2033 ± 406 | 2 of 65 | 4 | 3-1 | 94.7% | 46.4% (vs 1) |
| h7 | candidate | 1523 ± 1430 | 34 of 65 | 8 | 8-0 | 73.2% | 29.4% (vs 7) |
| h8v5 | candidate | 1878 ± 179 | 4 of 65 | 42 | 28-14 | 90.6% | 26.3% (vs 1) |
| rush | sparring | 1317 ± 211 | 48 of 65 | 25 | 6-19 | 58.7% | 22.8% (vs 12) |

Sources (`tools/progress/games.py`):

- local: 871 games from 45 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 613 games (11 archive games skipped, 65 matches from archives, 129 matches from scores), fetched 2026-10-22T16:31:03+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-bot1v43 | field | 2058 | 281 | 27 | 25-2 | 33% (v6 1-2) |
| 2 | **cand:h61** | candidate | 2033 | 406 | 4 | 3-1 |  |
| 3 | **cand:h44** | candidate | 1940 | 304 | 8 | 6-2 |  |
| 4 | **cand:h8v5** | candidate | 1878 | 179 | 42 | 28-14 |  |
| 5 | **us:v6** | accepted | 1862 | 159 | 90 | 55-35 |  |
| 6 | StoneT2000.BC19-botfinalsafe | field | 1843 | 207 | 30 | 24-6 | 0% (v6 0-3) |
| 7 | **cand:h53** | candidate | 1841 | 280 | 8 | 5-3 |  |
| 8 | **cand:h54** | candidate | 1832 | 173 | 48 | 29-19 |  |
| 9 | uvafan.bc2019 | field | 1821 | 1650 | 3 | 3-0 |  |
| 10 | **cand:h24v5** | candidate | 1811 | 178 | 40 | 23-17 |  |
| 11 | **cand:h55** | candidate | 1801 | 171 | 56 | 32-24 |  |
| 12 | **us:v5** | accepted | 1759 | 142 | 409 | 187-222 |  |
| 13 | **cand:h43** | candidate | 1754 | 274 | 8 | 4-4 |  |
| 14 | **cand:h47** | candidate | 1754 | 274 | 8 | 4-4 |  |
| 15 | **cand:h48** | candidate | 1754 | 274 | 8 | 4-4 |  |
| 16 | **cand:h49** | candidate | 1754 | 274 | 8 | 4-4 |  |
| 17 | **cand:h59** | candidate | 1754 | 274 | 8 | 4-4 |  |
| 18 | **cand:h60** | candidate | 1754 | 274 | 8 | 4-4 |  |
| 19 | **cand:h58** | candidate | 1707 | 296 | 8 | 3-5 |  |
| 20 | **cand:h40** | candidate | 1674 | 301 | 8 | 6-2 |  |
| 21 | **cand:h41** | candidate | 1666 | 280 | 8 | 3-5 |  |
| 22 | **cand:h42** | candidate | 1666 | 280 | 8 | 3-5 |  |
| 23 | **cand:h46** | candidate | 1666 | 280 | 8 | 3-5 |  |
| 24 | **cand:h52** | candidate | 1666 | 280 | 8 | 3-5 |  |
| 25 | IanCoolidge0.battlecode20~69ce88 | field | 1632 | 425 | 15 | 13-2 |  |
| 26 | **cand:h38** | candidate | 1605 | 316 | 6 | 4-2 |  |
| 27 | **cand:h24** | candidate | 1596 | 178 | 40 | 26-14 |  |
| 28 | **cand:h11c** | candidate | 1585 | 197 | 25 | 15-10 |  |
| 29 | **cand:h31** | candidate | 1577 | 177 | 40 | 25-15 |  |
| 30 | IvanGeffner.BC19-bot6b | field | 1571 | 486 | 9 | 7-2 |  |
| 31 | awesomelemonade.Battlecode2019 | field | 1558 | 1105 | 3 | 2-1 |  |
| 32 | **us:v3** | accepted | 1534 | 146 | 191 | 140-51 |  |
| 33 | Tom-CCS.BC19 | field | 1523 | 646 | 12 | 9-3 |  |
| 34 | **cand:h7** | candidate | 1523 | 1430 | 8 | 8-0 |  |
| 35 | **cand:h6** | candidate | 1515 | 143 | 158 | 94-64 |  |
| 36 | **us:v4** | accepted | 1489 | 140 | 220 | 83-137 |  |
| 37 | **cand:h2** | candidate | 1484 | 183 | 54 | 25-29 |  |
| 38 | IanCoolidge0.battlecode20~f649f3 | field | 1477 | 244 | 21 | 15-6 | 67% (v3 2-1) |
| 39 | **cand:h3** | candidate | 1466 | 237 | 19 | 9-10 |  |
| 40 | **us:v0** | accepted | 1450 | 258 | 38 | 33-5 |  |
| 41 | abcdefguan.battlecode2019 | field | 1442 | 1105 | 3 | 1-2 |  |
| 42 | **cand:h16r** | candidate | 1419 | 177 | 40 | 16-24 |  |
| 43 | IvanGeffner.BC19-eigthbot | field | 1394 | 336 | 9 | 6-3 |  |
| 44 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1385 | 294 | 15 | 5-10 |  |
| 45 | NielsKornerup.Battlecode-2019 | field | 1343 | 345 | 12 | 8-4 |  |
| 46 | **us:v2** | accepted | 1336 | 180 | 62 | 30-32 |  |
| 47 | **cand:h18** | candidate | 1317 | 211 | 25 | 6-19 |  |
| 48 | **spar:rush** | sparring | 1317 | 211 | 25 | 6-19 |  |
| 49 | **us:v1** | accepted | 1296 | 191 | 154 | 128-26 |  |
| 50 | SethKitchen.examplefuncsplayer | field | 1207 | 668 | 12 | 8-4 |  |
| 51 | Nydroam.BatteredCod | field | 1190 | 452 | 6 | 3-3 |  |
| 52 | vishwasns99.BC_2019 | field | 1179 | 1650 | 3 | 0-3 |  |
| 53 | 18dcb01.Battlecode19-robot2 | field | 1095 | 382 | 15 | 3-12 |  |
| 54 | JasonLarson44.2019-Battle~1c7639 | field | 1094 | 332 | 12 | 5-7 | 100% (v3 3-0) |
| 55 | CS554-software-engineerin~a575dc | field | 1084 | 173 | 212 | 130-82 | 93% (v3 28-2) |
| 56 | OmarTahoun.battle-code | field | 1081 | 649 | 12 | 7-5 |  |
| 57 | CometsTech.battlecode2019 | field | 1073 | 174 | 171 | 89-82 | 100% (v3 33-0) |
| 58 | TestSubjector.BattleCode2~fb22c7 | field | 990 | 486 | 12 | 7-5 |  |
| 59 | CometsTech.battlecode2019~187e8c | field | 963 | 467 | 12 | 1-11 |  |
| 60 | TestSubjector.BattleCode2~e6de74 | field | 598 | 519 | 12 | 5-7 |  |
| 61 | DivyanshuSaxena.Battlecode | field | 309 | 455 | 12 | 2-10 |  |
| 62 | RyanSharafuddin.Battlecode_2019 | field | 287 | 1142 | 12 | 0-12 |  |
| 63 | TheRobotCarlson.battlehac~323871 | field | 287 | 1142 | 12 | 0-12 |  |
| 64 | bc19-starter | field | 287 | 315 | 307 | 45-262 | 100% (v3 12-0) |
| 65 | ArtemUstilov.bc19_CrazyTapok | field | -763 | 1106 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, arya-k.bc19, asunathanr.asu_bc, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-bot1v43 | us:v6 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 4 | 3-1 | 75% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h8v5 | us:v5 | 42 | 28-14 | 67% | local |
| us:v6 | StoneT2000.BC19-botfinalsafe | 3 | 0-3 | 0% | replica |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h49 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h59 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h60 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h52 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
