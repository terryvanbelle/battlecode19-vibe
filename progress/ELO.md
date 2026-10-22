# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 10:14 PDT.

1505 games: 883 local (VM batches between our builds, candidates, sparring partners and the starter bot), 235 of ours on the galaxy replica and 387 between field bots there (387 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 68 players; compare them only within this fit.

**Thin field.** 30 rated field bots (StoneT2000.BC19-bot1v43, StoneT2000.BC19-botfinalsafe, uvafan.bc2019, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, awesomelemonade.Battlecode2019, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, abcdefguan.battlecode2019, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, Nydroam.BatteredCod, SethKitchen.examplefuncsplayer, vishwasns99.BC_2019, CS554-software-engineerin~a575dc, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, jamesrayman.HCN-bot, nthistle.battlecode-2019, CometsTech.battlecode2019, OmarTahoun.battle-code, TestSubjector.BattleCode2~fb22c7, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~e6de74, DivyanshuSaxena.Battlecode, bc19-starter, RyanSharafuddin.Battlecode_2019, TheRobotCarlson.battlehac~323871, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (30), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1490 ± 257 | 41 of 68 | 38 | 33-5 | 70.9% | 27.9% (vs 8) |
| v1 | accepted | 1336 ± 189 | 48 of 68 | 154 | 128-26 | 59.7% | 22.8% (vs 12) |
| v2 | accepted | 1368 ± 178 | 47 of 68 | 62 | 30-32 | 62.1% | 25.8% (vs 12) |
| v3 | accepted | 1560 ± 144 | 32 of 68 | 191 | 140-51 | 75.6% | 24.3% (vs 5) |
| v4 | accepted | 1492 ± 137 | 39 of 68 | 220 | 83-137 | 71.1% | 28.1% (vs 8) |
| v5 | accepted | 1746 ± 135 | 13 of 68 | 424 | 198-226 | 85.6% | 30.4% (vs 3) |
| v6 | accepted | 1849 ± 152 | 5 of 68 | 96 | 59-37 | 89.8% | 23.7% (vs 1) |
| h11c | candidate | 1599 ± 195 | 29 of 68 | 25 | 15-10 | 77.9% | 22.5% (vs 4) |
| h16r | candidate | 1422 ± 174 | 44 of 68 | 40 | 16-24 | 66.2% | 26.8% (vs 10) |
| h18 | candidate | 1331 ± 210 | 49 of 68 | 25 | 6-19 | 59.3% | 22.3% (vs 12) |
| h2 | candidate | 1510 ± 182 | 37 of 68 | 54 | 25-29 | 72.3% | 27.1% (vs 7) |
| h24 | candidate | 1599 ± 176 | 28 of 68 | 40 | 26-14 | 78.0% | 22.6% (vs 4) |
| h24v5 | candidate | 1797 ± 172 | 10 of 68 | 40 | 23-17 | 87.8% | 36.5% (vs 3) |
| h3 | candidate | 1492 ± 236 | 40 of 68 | 19 | 9-10 | 71.1% | 28.1% (vs 8) |
| h31 | candidate | 1581 ± 175 | 31 of 68 | 40 | 25-15 | 76.8% | 26.3% (vs 5) |
| h38 | candidate | 1609 ± 314 | 27 of 68 | 6 | 4-2 | 78.5% | 23.5% (vs 4) |
| h40 | candidate | 1678 ± 300 | 21 of 68 | 8 | 6-2 | 82.3% | 23.1% (vs 3) |
| h41 | candidate | 1653 ± 277 | 23 of 68 | 8 | 3-5 | 81.0% | 27.9% (vs 4) |
| h42 | candidate | 1653 ± 277 | 24 of 68 | 8 | 3-5 | 81.0% | 27.9% (vs 4) |
| h43 | candidate | 1741 ± 271 | 14 of 68 | 8 | 4-4 | 85.4% | 29.8% (vs 3) |
| h44 | candidate | 1927 ± 301 | 2 of 68 | 8 | 6-2 | 92.3% | 32.8% (vs 1) |
| h46 | candidate | 1653 ± 277 | 25 of 68 | 8 | 3-5 | 81.0% | 27.9% (vs 4) |
| h47 | candidate | 1741 ± 271 | 15 of 68 | 8 | 4-4 | 85.4% | 29.8% (vs 3) |
| h48 | candidate | 1741 ± 271 | 16 of 68 | 8 | 4-4 | 85.4% | 29.8% (vs 3) |
| h49 | candidate | 1741 ± 271 | 17 of 68 | 8 | 4-4 | 85.4% | 29.8% (vs 3) |
| h52 | candidate | 1653 ± 277 | 26 of 68 | 8 | 3-5 | 81.0% | 27.9% (vs 4) |
| h53 | candidate | 1828 ± 277 | 7 of 68 | 8 | 5-3 | 89.0% | 35.1% (vs 2) |
| h54 | candidate | 1818 ± 167 | 9 of 68 | 48 | 29-19 | 88.7% | 39.2% (vs 3) |
| h55 | candidate | 1788 ± 165 | 11 of 68 | 56 | 32-24 | 87.4% | 35.4% (vs 3) |
| h58 | candidate | 1695 ± 293 | 20 of 68 | 8 | 3-5 | 83.2% | 24.8% (vs 3) |
| h59 | candidate | 1741 ± 271 | 18 of 68 | 8 | 4-4 | 85.4% | 29.8% (vs 3) |
| h6 | candidate | 1529 ± 141 | 35 of 68 | 158 | 94-64 | 73.6% | 29.0% (vs 7) |
| h60 | candidate | 1741 ± 271 | 19 of 68 | 8 | 4-4 | 85.4% | 29.8% (vs 3) |
| h61 | candidate | 1908 ± 337 | 3 of 68 | 5 | 3-2 | 91.7% | 30.3% (vs 1) |
| h63 | candidate | 1769 ± 339 | 12 of 68 | 5 | 2-3 | 86.7% | 33.1% (vs 3) |
| h7 | candidate | 1528 ± 1410 | 36 of 68 | 8 | 8-0 | 73.5% | 29.0% (vs 7) |
| h8v5 | candidate | 1849 ± 169 | 4 of 68 | 48 | 31-17 | 89.8% | 23.7% (vs 1) |
| rush | sparring | 1331 ± 210 | 50 of 68 | 25 | 6-19 | 59.3% | 22.3% (vs 12) |

Sources (`tools/progress/games.py`):

- local: 883 games from 46 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 622 games (11 archive games skipped, 68 matches from archives, 129 matches from scores), fetched 2026-10-22T17:15:13+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-bot1v43 | field | 2052 | 277 | 27 | 25-2 | 33% (v6 1-2) |
| 2 | **cand:h44** | candidate | 1927 | 301 | 8 | 6-2 |  |
| 3 | **cand:h61** | candidate | 1908 | 337 | 5 | 3-2 |  |
| 4 | **cand:h8v5** | candidate | 1849 | 169 | 48 | 31-17 |  |
| 5 | **us:v6** | accepted | 1849 | 152 | 96 | 59-37 |  |
| 6 | StoneT2000.BC19-botfinalsafe | field | 1838 | 202 | 30 | 24-6 | 0% (v6 0-3) |
| 7 | **cand:h53** | candidate | 1828 | 277 | 8 | 5-3 |  |
| 8 | uvafan.bc2019 | field | 1821 | 1651 | 3 | 3-0 |  |
| 9 | **cand:h54** | candidate | 1818 | 167 | 48 | 29-19 |  |
| 10 | **cand:h24v5** | candidate | 1797 | 172 | 40 | 23-17 |  |
| 11 | **cand:h55** | candidate | 1788 | 165 | 56 | 32-24 |  |
| 12 | **cand:h63** | candidate | 1769 | 339 | 5 | 2-3 |  |
| 13 | **us:v5** | accepted | 1746 | 135 | 424 | 198-226 |  |
| 14 | **cand:h43** | candidate | 1741 | 271 | 8 | 4-4 |  |
| 15 | **cand:h47** | candidate | 1741 | 271 | 8 | 4-4 |  |
| 16 | **cand:h48** | candidate | 1741 | 271 | 8 | 4-4 |  |
| 17 | **cand:h49** | candidate | 1741 | 271 | 8 | 4-4 |  |
| 18 | **cand:h59** | candidate | 1741 | 271 | 8 | 4-4 |  |
| 19 | **cand:h60** | candidate | 1741 | 271 | 8 | 4-4 |  |
| 20 | **cand:h58** | candidate | 1695 | 293 | 8 | 3-5 |  |
| 21 | **cand:h40** | candidate | 1678 | 300 | 8 | 6-2 |  |
| 22 | IanCoolidge0.battlecode20~69ce88 | field | 1659 | 424 | 15 | 13-2 |  |
| 23 | **cand:h41** | candidate | 1653 | 277 | 8 | 3-5 |  |
| 24 | **cand:h42** | candidate | 1653 | 277 | 8 | 3-5 |  |
| 25 | **cand:h46** | candidate | 1653 | 277 | 8 | 3-5 |  |
| 26 | **cand:h52** | candidate | 1653 | 277 | 8 | 3-5 |  |
| 27 | **cand:h38** | candidate | 1609 | 314 | 6 | 4-2 |  |
| 28 | **cand:h24** | candidate | 1599 | 176 | 40 | 26-14 |  |
| 29 | **cand:h11c** | candidate | 1599 | 195 | 25 | 15-10 |  |
| 30 | IvanGeffner.BC19-bot6b | field | 1595 | 486 | 9 | 7-2 |  |
| 31 | **cand:h31** | candidate | 1581 | 175 | 40 | 25-15 |  |
| 32 | **us:v3** | accepted | 1560 | 144 | 191 | 140-51 |  |
| 33 | awesomelemonade.Battlecode2019 | field | 1558 | 1105 | 3 | 2-1 |  |
| 34 | Tom-CCS.BC19 | field | 1531 | 630 | 12 | 9-3 |  |
| 35 | **cand:h6** | candidate | 1529 | 141 | 158 | 94-64 |  |
| 36 | **cand:h7** | candidate | 1528 | 1410 | 8 | 8-0 |  |
| 37 | **cand:h2** | candidate | 1510 | 182 | 54 | 25-29 |  |
| 38 | IanCoolidge0.battlecode20~f649f3 | field | 1508 | 241 | 21 | 15-6 | 67% (v3 2-1) |
| 39 | **us:v4** | accepted | 1492 | 137 | 220 | 83-137 |  |
| 40 | **cand:h3** | candidate | 1492 | 236 | 19 | 9-10 |  |
| 41 | **us:v0** | accepted | 1490 | 257 | 38 | 33-5 |  |
| 42 | abcdefguan.battlecode2019 | field | 1442 | 1105 | 3 | 1-2 |  |
| 43 | IvanGeffner.BC19-eigthbot | field | 1427 | 332 | 9 | 6-3 |  |
| 44 | **cand:h16r** | candidate | 1422 | 174 | 40 | 16-24 |  |
| 45 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1414 | 287 | 15 | 5-10 |  |
| 46 | NielsKornerup.Battlecode-2019 | field | 1377 | 341 | 12 | 8-4 |  |
| 47 | **us:v2** | accepted | 1368 | 178 | 62 | 30-32 |  |
| 48 | **us:v1** | accepted | 1336 | 189 | 154 | 128-26 |  |
| 49 | **cand:h18** | candidate | 1331 | 210 | 25 | 6-19 |  |
| 50 | **spar:rush** | sparring | 1331 | 210 | 25 | 6-19 |  |
| 51 | Nydroam.BatteredCod | field | 1222 | 451 | 6 | 3-3 |  |
| 52 | SethKitchen.examplefuncsplayer | field | 1220 | 660 | 12 | 8-4 |  |
| 53 | vishwasns99.BC_2019 | field | 1179 | 1651 | 3 | 0-3 |  |
| 54 | CS554-software-engineerin~a575dc | field | 1134 | 169 | 215 | 131-84 | 67% (v5 2-1) |
| 55 | JasonLarson44.2019-Battle~1c7639 | field | 1133 | 328 | 12 | 5-7 | 100% (v3 3-0) |
| 56 | 18dcb01.Battlecode19-robot2 | field | 1123 | 382 | 15 | 3-12 |  |
| 57 | jamesrayman.HCN-bot | field | 1121 | 1090 | 3 | 0-3 | 100% (v5 3-0) |
| 58 | nthistle.battlecode-2019 | field | 1121 | 1090 | 3 | 0-3 | 100% (v5 3-0) |
| 59 | CometsTech.battlecode2019 | field | 1119 | 171 | 171 | 89-82 | 100% (v3 33-0) |
| 60 | OmarTahoun.battle-code | field | 1095 | 646 | 12 | 7-5 |  |
| 61 | TestSubjector.BattleCode2~fb22c7 | field | 1014 | 485 | 12 | 7-5 |  |
| 62 | CometsTech.battlecode2019~187e8c | field | 994 | 466 | 12 | 1-11 |  |
| 63 | TestSubjector.BattleCode2~e6de74 | field | 643 | 518 | 12 | 5-7 |  |
| 64 | DivyanshuSaxena.Battlecode | field | 353 | 454 | 12 | 2-10 |  |
| 65 | bc19-starter | field | 332 | 314 | 307 | 45-262 | 100% (v3 12-0) |
| 66 | RyanSharafuddin.Battlecode_2019 | field | 306 | 1142 | 12 | 0-12 |  |
| 67 | TheRobotCarlson.battlehac~323871 | field | 306 | 1142 | 12 | 0-12 |  |
| 68 | ArtemUstilov.bc19_CrazyTapok | field | -718 | 1107 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, arya-k.bc19, asunathanr.asu_bc, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

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
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h61 | us:v6 | 5 | 3-2 | 60% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| us:v6 | StoneT2000.BC19-botfinalsafe | 3 | 0-3 | 0% | replica |
| us:v6 | cand:h63 | 5 | 3-2 | 60% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
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
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
