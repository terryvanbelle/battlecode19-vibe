# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 08:58 PDT.

1462 games: 861 local (VM batches between our builds, candidates, sparring partners and the starter bot), 217 of ours on the galaxy replica and 384 between field bots there (384 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 63 players; compare them only within this fit.

**Thin field.** 26 rated field bots (StoneT2000.BC19-bot1v43, StoneT2000.BC19-botfinalsafe, uvafan.bc2019, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, SethKitchen.examplefuncsplayer, Nydroam.BatteredCod, vishwasns99.BC_2019, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, OmarTahoun.battle-code, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, TestSubjector.BattleCode2~fb22c7, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~e6de74, DivyanshuSaxena.Battlecode, RyanSharafuddin.Battlecode_2019, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (26), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1453 ± 256 | 39 of 63 | 38 | 33-5 | 70.3% | 24.3% (vs 7) |
| v1 | accepted | 1299 ± 188 | 47 of 63 | 154 | 128-26 | 59.7% | 20.6% (vs 10) |
| v2 | accepted | 1340 ± 177 | 44 of 63 | 62 | 30-32 | 62.6% | 24.1% (vs 10) |
| v3 | accepted | 1537 ± 143 | 31 of 63 | 191 | 140-51 | 75.4% | 22.9% (vs 5) |
| v4 | accepted | 1490 ± 137 | 35 of 63 | 220 | 83-137 | 72.6% | 23.9% (vs 6) |
| v5 | accepted | 1758 ± 141 | 12 of 63 | 392 | 180-212 | 86.2% | 30.5% (vs 3) |
| v6 | accepted | 1862 ± 156 | 5 of 63 | 88 | 55-33 | 90.1% | 37.7% (vs 2) |
| h11c | candidate | 1587 ± 194 | 28 of 63 | 25 | 15-10 | 78.2% | 21.6% (vs 4) |
| h16r | candidate | 1420 ± 174 | 40 of 63 | 40 | 16-24 | 68.1% | 21.4% (vs 7) |
| h18 | candidate | 1319 ± 208 | 45 of 63 | 25 | 6-19 | 61.1% | 22.2% (vs 10) |
| h2 | candidate | 1487 ± 180 | 36 of 63 | 54 | 25-29 | 72.4% | 23.7% (vs 6) |
| h24 | candidate | 1597 ± 176 | 27 of 63 | 40 | 26-14 | 78.7% | 22.5% (vs 4) |
| h24v5 | candidate | 1809 ± 177 | 10 of 63 | 40 | 23-17 | 88.2% | 36.8% (vs 3) |
| h3 | candidate | 1469 ± 235 | 38 of 63 | 19 | 9-10 | 71.3% | 25.8% (vs 7) |
| h31 | candidate | 1579 ± 175 | 29 of 63 | 40 | 25-15 | 77.7% | 20.9% (vs 4) |
| h38 | candidate | 1607 ± 314 | 26 of 63 | 6 | 4-2 | 79.2% | 23.4% (vs 4) |
| h40 | candidate | 1676 ± 300 | 20 of 63 | 8 | 6-2 | 82.7% | 21.7% (vs 3) |
| h41 | candidate | 1665 ± 280 | 21 of 63 | 8 | 3-5 | 82.2% | 20.7% (vs 3) |
| h42 | candidate | 1665 ± 280 | 22 of 63 | 8 | 3-5 | 82.2% | 20.7% (vs 3) |
| h43 | candidate | 1753 ± 273 | 13 of 63 | 8 | 4-4 | 86.0% | 29.9% (vs 3) |
| h44 | candidate | 1939 ± 303 | 2 of 63 | 8 | 6-2 | 92.4% | 40.8% (vs 1) |
| h46 | candidate | 1665 ± 280 | 23 of 63 | 8 | 3-5 | 82.2% | 20.7% (vs 3) |
| h47 | candidate | 1753 ± 273 | 14 of 63 | 8 | 4-4 | 86.0% | 29.9% (vs 3) |
| h48 | candidate | 1753 ± 273 | 15 of 63 | 8 | 4-4 | 86.0% | 29.9% (vs 3) |
| h49 | candidate | 1753 ± 273 | 16 of 63 | 8 | 4-4 | 86.0% | 29.9% (vs 3) |
| h52 | candidate | 1665 ± 280 | 24 of 63 | 8 | 3-5 | 82.2% | 20.7% (vs 3) |
| h53 | candidate | 1840 ± 280 | 6 of 63 | 8 | 5-3 | 89.3% | 34.9% (vs 2) |
| h54 | candidate | 1830 ± 172 | 8 of 63 | 48 | 29-19 | 89.0% | 33.7% (vs 2) |
| h55 | candidate | 1800 ± 170 | 11 of 63 | 56 | 32-24 | 87.9% | 35.6% (vs 3) |
| h58 | candidate | 1706 ± 295 | 19 of 63 | 8 | 3-5 | 84.0% | 24.8% (vs 3) |
| h59 | candidate | 1753 ± 273 | 17 of 63 | 8 | 4-4 | 86.0% | 29.9% (vs 3) |
| h6 | candidate | 1517 ± 139 | 33 of 63 | 158 | 94-64 | 74.3% | 21.2% (vs 5) |
| h60 | candidate | 1753 ± 273 | 18 of 63 | 8 | 4-4 | 86.0% | 29.9% (vs 3) |
| h61 | candidate | 1836 ± 489 | 7 of 63 | 2 | 1-1 | 89.2% | 34.3% (vs 2) |
| h7 | candidate | 1523 ± 1428 | 32 of 63 | 8 | 8-0 | 74.6% | 21.7% (vs 5) |
| h8v5 | candidate | 1908 ± 189 | 3 of 63 | 34 | 24-10 | 91.5% | 36.6% (vs 1) |
| rush | sparring | 1319 ± 208 | 46 of 63 | 25 | 6-19 | 61.1% | 22.2% (vs 10) |

Sources (`tools/progress/games.py`):

- local: 861 games from 45 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 601 games (11 archive games skipped, 62 matches from archives, 128 matches from scores), fetched 2026-10-22T16:00:05+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-bot1v43 | field | 2003 | 284 | 24 | 22-2 | 33% (v6 1-2) |
| 2 | **cand:h44** | candidate | 1939 | 303 | 8 | 6-2 |  |
| 3 | **cand:h8v5** | candidate | 1908 | 189 | 34 | 24-10 |  |
| 4 | StoneT2000.BC19-botfinalsafe | field | 1898 | 252 | 24 | 21-3 | 0% (v6 0-3) |
| 5 | **us:v6** | accepted | 1862 | 156 | 88 | 55-33 |  |
| 6 | **cand:h53** | candidate | 1840 | 280 | 8 | 5-3 |  |
| 7 | **cand:h61** | candidate | 1836 | 489 | 2 | 1-1 |  |
| 8 | **cand:h54** | candidate | 1830 | 172 | 48 | 29-19 |  |
| 9 | uvafan.bc2019 | field | 1821 | 1649 | 3 | 3-0 |  |
| 10 | **cand:h24v5** | candidate | 1809 | 177 | 40 | 23-17 |  |
| 11 | **cand:h55** | candidate | 1800 | 170 | 56 | 32-24 |  |
| 12 | **us:v5** | accepted | 1758 | 141 | 392 | 180-212 |  |
| 13 | **cand:h43** | candidate | 1753 | 273 | 8 | 4-4 |  |
| 14 | **cand:h47** | candidate | 1753 | 273 | 8 | 4-4 |  |
| 15 | **cand:h48** | candidate | 1753 | 273 | 8 | 4-4 |  |
| 16 | **cand:h49** | candidate | 1753 | 273 | 8 | 4-4 |  |
| 17 | **cand:h59** | candidate | 1753 | 273 | 8 | 4-4 |  |
| 18 | **cand:h60** | candidate | 1753 | 273 | 8 | 4-4 |  |
| 19 | **cand:h58** | candidate | 1706 | 295 | 8 | 3-5 |  |
| 20 | **cand:h40** | candidate | 1676 | 300 | 8 | 6-2 |  |
| 21 | **cand:h41** | candidate | 1665 | 280 | 8 | 3-5 |  |
| 22 | **cand:h42** | candidate | 1665 | 280 | 8 | 3-5 |  |
| 23 | **cand:h46** | candidate | 1665 | 280 | 8 | 3-5 |  |
| 24 | **cand:h52** | candidate | 1665 | 280 | 8 | 3-5 |  |
| 25 | IanCoolidge0.battlecode20~69ce88 | field | 1636 | 425 | 15 | 13-2 |  |
| 26 | **cand:h38** | candidate | 1607 | 314 | 6 | 4-2 |  |
| 27 | **cand:h24** | candidate | 1597 | 176 | 40 | 26-14 |  |
| 28 | **cand:h11c** | candidate | 1587 | 194 | 25 | 15-10 |  |
| 29 | **cand:h31** | candidate | 1579 | 175 | 40 | 25-15 |  |
| 30 | IvanGeffner.BC19-bot6b | field | 1575 | 486 | 9 | 7-2 |  |
| 31 | **us:v3** | accepted | 1537 | 143 | 191 | 140-51 |  |
| 32 | **cand:h7** | candidate | 1523 | 1428 | 8 | 8-0 |  |
| 33 | **cand:h6** | candidate | 1517 | 139 | 158 | 94-64 |  |
| 34 | Tom-CCS.BC19 | field | 1499 | 614 | 12 | 9-3 |  |
| 35 | **us:v4** | accepted | 1490 | 137 | 220 | 83-137 |  |
| 36 | **cand:h2** | candidate | 1487 | 180 | 54 | 25-29 |  |
| 37 | IanCoolidge0.battlecode20~f649f3 | field | 1481 | 243 | 21 | 15-6 | 67% (v3 2-1) |
| 38 | **cand:h3** | candidate | 1469 | 235 | 19 | 9-10 |  |
| 39 | **us:v0** | accepted | 1453 | 256 | 38 | 33-5 |  |
| 40 | **cand:h16r** | candidate | 1420 | 174 | 40 | 16-24 |  |
| 41 | IvanGeffner.BC19-eigthbot | field | 1397 | 334 | 9 | 6-3 |  |
| 42 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1391 | 295 | 15 | 5-10 |  |
| 43 | NielsKornerup.Battlecode-2019 | field | 1346 | 343 | 12 | 8-4 |  |
| 44 | **us:v2** | accepted | 1340 | 177 | 62 | 30-32 |  |
| 45 | **cand:h18** | candidate | 1319 | 208 | 25 | 6-19 |  |
| 46 | **spar:rush** | sparring | 1319 | 208 | 25 | 6-19 |  |
| 47 | **us:v1** | accepted | 1299 | 188 | 154 | 128-26 |  |
| 48 | SethKitchen.examplefuncsplayer | field | 1222 | 684 | 12 | 8-4 |  |
| 49 | Nydroam.BatteredCod | field | 1194 | 451 | 6 | 3-3 |  |
| 50 | vishwasns99.BC_2019 | field | 1179 | 1649 | 3 | 0-3 |  |
| 51 | JasonLarson44.2019-Battle~1c7639 | field | 1098 | 331 | 12 | 5-7 | 100% (v3 3-0) |
| 52 | 18dcb01.Battlecode19-robot2 | field | 1096 | 380 | 15 | 3-12 |  |
| 53 | OmarTahoun.battle-code | field | 1093 | 657 | 12 | 7-5 |  |
| 54 | CS554-software-engineerin~a575dc | field | 1087 | 170 | 212 | 130-82 | 93% (v3 28-2) |
| 55 | CometsTech.battlecode2019 | field | 1076 | 171 | 171 | 89-82 | 100% (v3 33-0) |
| 56 | TestSubjector.BattleCode2~fb22c7 | field | 988 | 482 | 12 | 7-5 |  |
| 57 | CometsTech.battlecode2019~187e8c | field | 966 | 466 | 12 | 1-11 |  |
| 58 | TestSubjector.BattleCode2~e6de74 | field | 602 | 518 | 12 | 5-7 |  |
| 59 | DivyanshuSaxena.Battlecode | field | 312 | 454 | 12 | 2-10 |  |
| 60 | RyanSharafuddin.Battlecode_2019 | field | 291 | 1141 | 12 | 0-12 |  |
| 61 | TheRobotCarlson.battlehac~323871 | field | 291 | 1141 | 12 | 0-12 |  |
| 62 | bc19-starter | field | 291 | 313 | 307 | 45-262 | 100% (v3 12-0) |
| 63 | ArtemUstilov.bc19_CrazyTapok | field | -760 | 1105 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-bot1v43 | us:v6 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h8v5 | us:v5 | 34 | 24-10 | 71% | local |
| StoneT2000.BC19-botfinalsafe | us:v6 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v6 | cand:h61 | 2 | 1-1 | 50% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
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
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
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
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
