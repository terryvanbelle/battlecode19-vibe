# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 12:01 PDT.

1549 games: 903 local (VM batches between our builds, candidates, sparring partners and the starter bot), 247 of ours on the galaxy replica and 399 between field bots there (396 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 71 players; compare them only within this fit.

**Thin field.** 33 rated field bots (uvafan.bc2019, IanCoolidge0.battlecode20~69ce88, StoneT2000.BC19-bot1v43, StoneT2000.BC19-botfinalsafe, IvanGeffner.BC19-bot6b, awesomelemonade.Battlecode2019, moreda-a.BC2019-a31, abcdefguan.battlecode2019, j-mao.battlecode-2019, ldcWV.Battlecode-2019, IanCoolidge0.battlecode20~f649f3, Tom-CCS.BC19, NielsKornerup.Battlecode-2019, vishwasns99.BC_2019, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, SethKitchen.examplefuncsplayer, Nydroam.BatteredCod, OmarTahoun.battle-code, 18dcb01.Battlecode19-robot2, JasonLarson44.2019-Battle~1c7639, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~fb22c7, nthistle.battlecode-2019, jamesrayman.HCN-bot, TestSubjector.BattleCode2~e6de74, TheRobotCarlson.battlehac~323871, RyanSharafuddin.Battlecode_2019, DivyanshuSaxena.Battlecode, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (33), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1461 ± 256 | 43 of 71 | 38 | 33-5 | 61.4% | 20.8% (vs 12) |
| v1 | accepted | 1307 ± 189 | 52 of 71 | 154 | 128-26 | 50.8% | 16.4% (vs 16) |
| v2 | accepted | 1336 ± 177 | 51 of 71 | 62 | 30-32 | 52.8% | 18.5% (vs 16) |
| v3 | accepted | 1526 ± 142 | 37 of 71 | 191 | 140-51 | 65.8% | 20.6% (vs 10) |
| v4 | accepted | 1447 ± 130 | 45 of 71 | 220 | 83-137 | 60.4% | 19.6% (vs 12) |
| v5 | accepted | 1689 ± 119 | 16 of 71 | 436 | 202-234 | 76.1% | 25.0% (vs 6) |
| v6 | accepted | 1791 ± 138 | 9 of 71 | 116 | 68-48 | 81.8% | 33.4% (vs 5) |
| h11c | candidate | 1559 ± 193 | 34 of 71 | 25 | 15-10 | 68.0% | 23.6% (vs 10) |
| h16r | candidate | 1377 ± 169 | 50 of 71 | 40 | 16-24 | 55.6% | 21.7% (vs 16) |
| h18 | candidate | 1291 ± 207 | 54 of 71 | 25 | 6-19 | 49.7% | 17.3% (vs 17) |
| h2 | candidate | 1477 ± 180 | 41 of 71 | 54 | 25-29 | 62.5% | 19.4% (vs 11) |
| h24 | candidate | 1554 ± 170 | 35 of 71 | 40 | 26-14 | 67.6% | 23.1% (vs 10) |
| h24v5 | candidate | 1740 ± 160 | 14 of 71 | 40 | 23-17 | 79.1% | 30.5% (vs 6) |
| h3 | candidate | 1459 ± 235 | 44 of 71 | 19 | 9-10 | 61.2% | 20.6% (vs 12) |
| h31 | candidate | 1535 ± 169 | 36 of 71 | 40 | 25-15 | 66.4% | 21.4% (vs 10) |
| h38 | candidate | 1565 ± 312 | 33 of 71 | 6 | 4-2 | 68.3% | 24.1% (vs 10) |
| h40 | candidate | 1633 ± 297 | 26 of 71 | 8 | 6-2 | 72.7% | 26.2% (vs 8) |
| h41 | candidate | 1598 ± 269 | 29 of 71 | 8 | 3-5 | 70.5% | 27.4% (vs 10) |
| h42 | candidate | 1598 ± 269 | 30 of 71 | 8 | 3-5 | 70.5% | 27.4% (vs 10) |
| h43 | candidate | 1685 ± 263 | 17 of 71 | 8 | 4-4 | 75.9% | 24.6% (vs 6) |
| h44 | candidate | 1871 ± 294 | 5 of 71 | 8 | 6-2 | 85.7% | 34.1% (vs 3) |
| h46 | candidate | 1598 ± 269 | 31 of 71 | 8 | 3-5 | 70.5% | 27.4% (vs 10) |
| h47 | candidate | 1685 ± 263 | 18 of 71 | 8 | 4-4 | 75.9% | 24.6% (vs 6) |
| h48 | candidate | 1685 ± 263 | 19 of 71 | 8 | 4-4 | 75.9% | 24.6% (vs 6) |
| h49 | candidate | 1685 ± 263 | 20 of 71 | 8 | 4-4 | 75.9% | 24.6% (vs 6) |
| h52 | candidate | 1598 ± 269 | 32 of 71 | 8 | 3-5 | 70.5% | 27.4% (vs 10) |
| h53 | candidate | 1772 ± 269 | 12 of 71 | 8 | 5-3 | 80.8% | 34.1% (vs 6) |
| h54 | candidate | 1761 ± 155 | 13 of 71 | 48 | 29-19 | 80.2% | 32.9% (vs 6) |
| h55 | candidate | 1731 ± 152 | 15 of 71 | 56 | 32-24 | 78.6% | 29.5% (vs 6) |
| h58 | candidate | 1639 ± 285 | 25 of 71 | 8 | 3-5 | 73.1% | 26.8% (vs 8) |
| h59 | candidate | 1685 ± 263 | 21 of 71 | 8 | 4-4 | 75.9% | 24.6% (vs 6) |
| h6 | candidate | 1489 ± 137 | 40 of 71 | 158 | 94-64 | 63.3% | 20.5% (vs 11) |
| h60 | candidate | 1685 ± 263 | 22 of 71 | 8 | 4-4 | 75.9% | 24.6% (vs 6) |
| h61 | candidate | 1873 ± 278 | 4 of 71 | 8 | 5-3 | 85.7% | 34.3% (vs 3) |
| h63 | candidate | 1789 ± 198 | 10 of 71 | 22 | 11-11 | 81.7% | 33.2% (vs 5) |
| h7 | candidate | 1525 ± 1422 | 38 of 71 | 8 | 8-0 | 65.7% | 20.5% (vs 10) |
| h8v5 | candidate | 1792 ± 156 | 7 of 71 | 48 | 31-17 | 81.9% | 29.4% (vs 4) |
| rush | sparring | 1291 ± 207 | 55 of 71 | 25 | 6-19 | 49.7% | 17.3% (vs 17) |

Sources (`tools/progress/games.py`):

- local: 903 games from 46 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 646 games (11 archive games skipped, 73 matches from archives, 132 matches from scores), fetched 2026-10-22T19:05:29+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | uvafan.bc2019 | field | 2315 | 1104 | 6 | 6-0 | 0% (v5 0-3) |
| 2 | IanCoolidge0.battlecode20~69ce88 | field | 1896 | 354 | 18 | 16-2 | 0% (v5 0-3) |
| 3 | StoneT2000.BC19-bot1v43 | field | 1879 | 207 | 30 | 25-5 | 33% (v6 1-2) |
| 4 | **cand:h61** | candidate | 1873 | 278 | 8 | 5-3 |  |
| 5 | **cand:h44** | candidate | 1871 | 294 | 8 | 6-2 |  |
| 6 | StoneT2000.BC19-botfinalsafe | field | 1864 | 195 | 33 | 27-6 | 0% (v6 0-3) |
| 7 | **cand:h8v5** | candidate | 1792 | 156 | 48 | 31-17 |  |
| 8 | IvanGeffner.BC19-bot6b | field | 1792 | 477 | 9 | 7-2 |  |
| 9 | **us:v6** | accepted | 1791 | 138 | 116 | 68-48 |  |
| 10 | **cand:h63** | candidate | 1789 | 198 | 22 | 11-11 |  |
| 11 | awesomelemonade.Battlecode2019 | field | 1782 | 395 | 6 | 4-2 | 33% (v5 1-2) |
| 12 | **cand:h53** | candidate | 1772 | 269 | 8 | 5-3 |  |
| 13 | **cand:h54** | candidate | 1761 | 155 | 48 | 29-19 |  |
| 14 | **cand:h24v5** | candidate | 1740 | 160 | 40 | 23-17 |  |
| 15 | **cand:h55** | candidate | 1731 | 152 | 56 | 32-24 |  |
| 16 | **us:v5** | accepted | 1689 | 119 | 436 | 202-234 |  |
| 17 | **cand:h43** | candidate | 1685 | 263 | 8 | 4-4 |  |
| 18 | **cand:h47** | candidate | 1685 | 263 | 8 | 4-4 |  |
| 19 | **cand:h48** | candidate | 1685 | 263 | 8 | 4-4 |  |
| 20 | **cand:h49** | candidate | 1685 | 263 | 8 | 4-4 |  |
| 21 | **cand:h59** | candidate | 1685 | 263 | 8 | 4-4 |  |
| 22 | **cand:h60** | candidate | 1685 | 263 | 8 | 4-4 |  |
| 23 | moreda-a.BC2019-a31 | field | 1678 | 1334 | 3 | 3-0 |  |
| 24 | abcdefguan.battlecode2019 | field | 1651 | 548 | 3 | 1-2 |  |
| 25 | **cand:h58** | candidate | 1639 | 285 | 8 | 3-5 |  |
| 26 | **cand:h40** | candidate | 1633 | 297 | 8 | 6-2 |  |
| 27 | j-mao.battlecode-2019 | field | 1628 | 1329 | 3 | 3-0 |  |
| 28 | ldcWV.Battlecode-2019 | field | 1628 | 1329 | 3 | 3-0 |  |
| 29 | **cand:h41** | candidate | 1598 | 269 | 8 | 3-5 |  |
| 30 | **cand:h42** | candidate | 1598 | 269 | 8 | 3-5 |  |
| 31 | **cand:h46** | candidate | 1598 | 269 | 8 | 3-5 |  |
| 32 | **cand:h52** | candidate | 1598 | 269 | 8 | 3-5 |  |
| 33 | **cand:h38** | candidate | 1565 | 312 | 6 | 4-2 |  |
| 34 | **cand:h11c** | candidate | 1559 | 193 | 25 | 15-10 |  |
| 35 | **cand:h24** | candidate | 1554 | 170 | 40 | 26-14 |  |
| 36 | **cand:h31** | candidate | 1535 | 169 | 40 | 25-15 |  |
| 37 | **us:v3** | accepted | 1526 | 142 | 191 | 140-51 |  |
| 38 | **cand:h7** | candidate | 1525 | 1422 | 8 | 8-0 |  |
| 39 | IanCoolidge0.battlecode20~f649f3 | field | 1493 | 239 | 21 | 15-6 | 67% (v3 2-1) |
| 40 | **cand:h6** | candidate | 1489 | 137 | 158 | 94-64 |  |
| 41 | **cand:h2** | candidate | 1477 | 180 | 54 | 25-29 |  |
| 42 | Tom-CCS.BC19 | field | 1469 | 517 | 12 | 9-3 |  |
| 43 | **us:v0** | accepted | 1461 | 256 | 38 | 33-5 |  |
| 44 | **cand:h3** | candidate | 1459 | 235 | 19 | 9-10 |  |
| 45 | **us:v4** | accepted | 1447 | 130 | 220 | 83-137 |  |
| 46 | NielsKornerup.Battlecode-2019 | field | 1443 | 357 | 12 | 8-4 |  |
| 47 | vishwasns99.BC_2019 | field | 1434 | 1343 | 3 | 0-3 |  |
| 48 | IvanGeffner.BC19-eigthbot | field | 1424 | 336 | 9 | 6-3 |  |
| 49 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1393 | 284 | 15 | 5-10 |  |
| 50 | **cand:h16r** | candidate | 1377 | 169 | 40 | 16-24 |  |
| 51 | **us:v2** | accepted | 1336 | 177 | 62 | 30-32 |  |
| 52 | **us:v1** | accepted | 1307 | 189 | 154 | 128-26 |  |
| 53 | SethKitchen.examplefuncsplayer | field | 1299 | 645 | 12 | 8-4 |  |
| 54 | **cand:h18** | candidate | 1291 | 207 | 25 | 6-19 |  |
| 55 | **spar:rush** | sparring | 1291 | 207 | 25 | 6-19 |  |
| 56 | Nydroam.BatteredCod | field | 1247 | 449 | 6 | 3-3 |  |
| 57 | OmarTahoun.battle-code | field | 1187 | 657 | 12 | 7-5 |  |
| 58 | 18dcb01.Battlecode19-robot2 | field | 1175 | 370 | 15 | 3-12 |  |
| 59 | JasonLarson44.2019-Battle~1c7639 | field | 1107 | 329 | 12 | 5-7 | 100% (v3 3-0) |
| 60 | CS554-software-engineerin~a575dc | field | 1106 | 169 | 215 | 131-84 | 67% (v5 2-1) |
| 61 | CometsTech.battlecode2019 | field | 1090 | 170 | 174 | 89-85 | 100% (v5 3-0) |
| 62 | CometsTech.battlecode2019~187e8c | field | 1052 | 481 | 12 | 1-11 |  |
| 63 | TestSubjector.BattleCode2~fb22c7 | field | 1044 | 462 | 12 | 7-5 |  |
| 64 | nthistle.battlecode-2019 | field | 959 | 1239 | 6 | 0-6 | 100% (v5 3-0) |
| 65 | jamesrayman.HCN-bot | field | 857 | 1279 | 9 | 0-9 | 100% (v5 3-0) |
| 66 | TestSubjector.BattleCode2~e6de74 | field | 615 | 519 | 12 | 5-7 |  |
| 67 | TheRobotCarlson.battlehac~323871 | field | 357 | 1131 | 12 | 0-12 |  |
| 68 | RyanSharafuddin.Battlecode_2019 | field | 357 | 1131 | 12 | 0-12 |  |
| 69 | DivyanshuSaxena.Battlecode | field | 325 | 455 | 12 | 2-10 |  |
| 70 | bc19-starter | field | 304 | 314 | 307 | 45-262 | 100% (v3 12-0) |
| 71 | ArtemUstilov.bc19_CrazyTapok | field | -746 | 1107 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, arya-k.bc19, asunathanr.asu_bc, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-botfinalsafe | us:v6 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v6 | cand:h63 | 22 | 11-11 | 50% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
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
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
