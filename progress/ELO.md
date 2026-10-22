# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 13:40 PDT.

1593 games: 917 local (VM batches between our builds, candidates, sparring partners and the starter bot), 247 of ours on the galaxy replica and 429 between field bots there (426 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 78 players; compare them only within this fit.

**Thin field.** 40 rated field bots (uvafan.bc2019, IanCoolidge0.battlecode20~69ce88, StoneT2000.BC19-bot1v43, moreda-a.BC2019-a31, StoneT2000.BC19-botfinalsafe, IvanGeffner.BC19-bot6b, awesomelemonade.Battlecode2019, programjames.BC19Bot-seeding, m-schier.battlecode-2019-wololo, ldcWV.Battlecode-2019, j-mao.battlecode-2019, abcdefguan.battlecode2019, IanCoolidge0.battlecode20~f649f3, Tom-CCS.BC19, NielsKornerup.Battlecode-2019, IvanGeffner.BC19-eigthbot, vishwasns99.BC_2019, 18dcb01.Battlecode19-prea~fb5c48, SethKitchen.examplefuncsplayer, Nydroam.BatteredCod, ovkulkarni.battlecode2019~0aa607, 18dcb01.Battlecode19-robot2, OmarTahoun.battle-code, bovard.battlecode-2019-un~8822c3, CS554-software-engineerin~a575dc, JasonLarson44.2019-Battle~1c7639, CometsTech.battlecode2019, nthistle.battlecode-2019, moreda-a.BC2019-t15, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~fb22c7, jamesrayman.HCN-bot, ipercyNC.group6-battlecode, TestSubjector.BattleCode2~e6de74, ovkulkarni.battlecode2019~06c610, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, RyanSharafuddin.Battlecode_2019, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (40), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1501 ± 261 | 44 of 78 | 38 | 33-5 | 63.1% | 17.6% (vs 13) |
| v1 | accepted | 1347 ± 195 | 54 of 78 | 154 | 128-26 | 52.7% | 16.0% (vs 18) |
| v2 | accepted | 1368 ± 185 | 53 of 78 | 62 | 30-32 | 54.2% | 17.5% (vs 18) |
| v3 | accepted | 1555 ± 152 | 38 of 78 | 191 | 140-51 | 66.6% | 19.4% (vs 12) |
| v4 | accepted | 1459 ± 140 | 48 of 78 | 220 | 83-137 | 60.3% | 19.0% (vs 15) |
| v5 | accepted | 1693 ± 128 | 21 of 78 | 436 | 202-234 | 75.2% | 31.9% (vs 11) |
| v6 | accepted | 1794 ± 145 | 12 of 78 | 130 | 72-58 | 80.9% | 36.8% (vs 7) |
| h11c | candidate | 1579 ± 200 | 35 of 78 | 25 | 15-10 | 68.2% | 21.6% (vs 12) |
| h16r | candidate | 1389 ± 177 | 52 of 78 | 40 | 16-24 | 55.6% | 19.0% (vs 18) |
| h18 | candidate | 1311 ± 214 | 55 of 78 | 25 | 6-19 | 50.2% | 13.7% (vs 18) |
| h2 | candidate | 1505 ± 188 | 43 of 78 | 54 | 25-29 | 63.4% | 17.9% (vs 13) |
| h24 | candidate | 1566 ± 178 | 37 of 78 | 40 | 26-14 | 67.4% | 20.4% (vs 12) |
| h24v5 | candidate | 1744 ± 167 | 16 of 78 | 40 | 23-17 | 78.2% | 32.6% (vs 8) |
| h3 | candidate | 1487 ± 242 | 45 of 78 | 19 | 9-10 | 62.2% | 16.6% (vs 13) |
| h31 | candidate | 1547 ± 177 | 39 of 78 | 40 | 25-15 | 66.2% | 18.8% (vs 12) |
| h38 | candidate | 1577 ± 316 | 36 of 78 | 6 | 4-2 | 68.0% | 21.3% (vs 12) |
| h40 | candidate | 1645 ± 302 | 29 of 78 | 8 | 6-2 | 72.3% | 28.3% (vs 12) |
| h41 | candidate | 1602 ± 273 | 31 of 78 | 8 | 3-5 | 69.6% | 23.7% (vs 12) |
| h42 | candidate | 1602 ± 273 | 32 of 78 | 8 | 3-5 | 69.6% | 23.7% (vs 12) |
| h43 | candidate | 1689 ± 267 | 22 of 78 | 8 | 4-4 | 74.9% | 31.4% (vs 11) |
| h44 | candidate | 1875 ± 298 | 5 of 78 | 8 | 6-2 | 85.0% | 33.0% (vs 3) |
| h46 | candidate | 1602 ± 273 | 33 of 78 | 8 | 3-5 | 69.6% | 23.7% (vs 12) |
| h47 | candidate | 1689 ± 267 | 23 of 78 | 8 | 4-4 | 74.9% | 31.4% (vs 11) |
| h48 | candidate | 1689 ± 267 | 24 of 78 | 8 | 4-4 | 74.9% | 31.4% (vs 11) |
| h49 | candidate | 1689 ± 267 | 25 of 78 | 8 | 4-4 | 74.9% | 31.4% (vs 11) |
| h52 | candidate | 1602 ± 273 | 34 of 78 | 8 | 3-5 | 69.6% | 23.7% (vs 12) |
| h53 | candidate | 1776 ± 274 | 14 of 78 | 8 | 5-3 | 79.9% | 36.3% (vs 8) |
| h54 | candidate | 1765 ± 161 | 15 of 78 | 48 | 29-19 | 79.4% | 35.1% (vs 8) |
| h55 | candidate | 1735 ± 159 | 17 of 78 | 56 | 32-24 | 77.6% | 31.5% (vs 8) |
| h58 | candidate | 1643 ± 289 | 30 of 78 | 8 | 3-5 | 72.1% | 28.0% (vs 12) |
| h59 | candidate | 1689 ± 267 | 26 of 78 | 8 | 4-4 | 74.9% | 31.4% (vs 11) |
| h6 | candidate | 1509 ± 148 | 42 of 78 | 158 | 94-64 | 63.7% | 18.3% (vs 13) |
| h60 | candidate | 1689 ± 267 | 27 of 78 | 8 | 4-4 | 74.9% | 31.4% (vs 11) |
| h61 | candidate | 1875 ± 282 | 4 of 78 | 8 | 5-3 | 85.1% | 33.1% (vs 3) |
| h63 | candidate | 1851 ± 184 | 6 of 78 | 36 | 21-15 | 83.9% | 30.5% (vs 3) |
| h7 | candidate | 1531 ± 1404 | 40 of 78 | 8 | 8-0 | 65.1% | 17.4% (vs 12) |
| h8v5 | candidate | 1796 ± 163 | 11 of 78 | 48 | 31-17 | 81.0% | 37.1% (vs 7) |
| rush | sparring | 1311 ± 214 | 56 of 78 | 25 | 6-19 | 50.2% | 13.7% (vs 18) |

Sources (`tools/progress/games.py`):

- local: 917 games from 46 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 676 games (11 archive games skipped, 73 matches from archives, 142 matches from scores), fetched 2026-10-22T20:44:04+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | uvafan.bc2019 | field | 2318 | 1106 | 6 | 6-0 | 0% (v5 0-3) |
| 2 | IanCoolidge0.battlecode20~69ce88 | field | 1926 | 290 | 21 | 18-3 | 0% (v5 0-3) |
| 3 | StoneT2000.BC19-bot1v43 | field | 1881 | 209 | 33 | 28-5 | 33% (v6 1-2) |
| 4 | **cand:h61** | candidate | 1875 | 282 | 8 | 5-3 |  |
| 5 | **cand:h44** | candidate | 1875 | 298 | 8 | 6-2 |  |
| 6 | **cand:h63** | candidate | 1851 | 184 | 36 | 21-15 |  |
| 7 | moreda-a.BC2019-a31 | field | 1840 | 1016 | 6 | 5-1 |  |
| 8 | StoneT2000.BC19-botfinalsafe | field | 1829 | 184 | 39 | 30-9 | 0% (v6 0-3) |
| 9 | IvanGeffner.BC19-bot6b | field | 1817 | 450 | 9 | 7-2 |  |
| 10 | awesomelemonade.Battlecode2019 | field | 1803 | 395 | 9 | 7-2 | 33% (v5 1-2) |
| 11 | **cand:h8v5** | candidate | 1796 | 163 | 48 | 31-17 |  |
| 12 | **us:v6** | accepted | 1794 | 145 | 130 | 72-58 |  |
| 13 | programjames.BC19Bot-seeding | field | 1789 | 1210 | 3 | 3-0 |  |
| 14 | **cand:h53** | candidate | 1776 | 274 | 8 | 5-3 |  |
| 15 | **cand:h54** | candidate | 1765 | 161 | 48 | 29-19 |  |
| 16 | **cand:h24v5** | candidate | 1744 | 167 | 40 | 23-17 |  |
| 17 | **cand:h55** | candidate | 1735 | 159 | 56 | 32-24 |  |
| 18 | m-schier.battlecode-2019-wololo | field | 1726 | 1026 | 6 | 4-2 |  |
| 19 | ldcWV.Battlecode-2019 | field | 1722 | 1262 | 3 | 3-0 |  |
| 20 | j-mao.battlecode-2019 | field | 1722 | 1262 | 3 | 3-0 |  |
| 21 | **us:v5** | accepted | 1693 | 128 | 436 | 202-234 |  |
| 22 | **cand:h43** | candidate | 1689 | 267 | 8 | 4-4 |  |
| 23 | **cand:h47** | candidate | 1689 | 267 | 8 | 4-4 |  |
| 24 | **cand:h48** | candidate | 1689 | 267 | 8 | 4-4 |  |
| 25 | **cand:h49** | candidate | 1689 | 267 | 8 | 4-4 |  |
| 26 | **cand:h59** | candidate | 1689 | 267 | 8 | 4-4 |  |
| 27 | **cand:h60** | candidate | 1689 | 267 | 8 | 4-4 |  |
| 28 | abcdefguan.battlecode2019 | field | 1670 | 550 | 3 | 1-2 |  |
| 29 | **cand:h40** | candidate | 1645 | 302 | 8 | 6-2 |  |
| 30 | **cand:h58** | candidate | 1643 | 289 | 8 | 3-5 |  |
| 31 | **cand:h41** | candidate | 1602 | 273 | 8 | 3-5 |  |
| 32 | **cand:h42** | candidate | 1602 | 273 | 8 | 3-5 |  |
| 33 | **cand:h46** | candidate | 1602 | 273 | 8 | 3-5 |  |
| 34 | **cand:h52** | candidate | 1602 | 273 | 8 | 3-5 |  |
| 35 | **cand:h11c** | candidate | 1579 | 200 | 25 | 15-10 |  |
| 36 | **cand:h38** | candidate | 1577 | 316 | 6 | 4-2 |  |
| 37 | **cand:h24** | candidate | 1566 | 178 | 40 | 26-14 |  |
| 38 | **us:v3** | accepted | 1555 | 152 | 191 | 140-51 |  |
| 39 | **cand:h31** | candidate | 1547 | 177 | 40 | 25-15 |  |
| 40 | **cand:h7** | candidate | 1531 | 1404 | 8 | 8-0 |  |
| 41 | IanCoolidge0.battlecode20~f649f3 | field | 1521 | 244 | 21 | 15-6 | 67% (v3 2-1) |
| 42 | **cand:h6** | candidate | 1509 | 148 | 158 | 94-64 |  |
| 43 | **cand:h2** | candidate | 1505 | 188 | 54 | 25-29 |  |
| 44 | **us:v0** | accepted | 1501 | 261 | 38 | 33-5 |  |
| 45 | **cand:h3** | candidate | 1487 | 242 | 19 | 9-10 |  |
| 46 | Tom-CCS.BC19 | field | 1478 | 514 | 12 | 9-3 |  |
| 47 | NielsKornerup.Battlecode-2019 | field | 1474 | 356 | 12 | 8-4 |  |
| 48 | **us:v4** | accepted | 1459 | 140 | 220 | 83-137 |  |
| 49 | IvanGeffner.BC19-eigthbot | field | 1456 | 337 | 9 | 6-3 |  |
| 50 | vishwasns99.BC_2019 | field | 1435 | 1345 | 3 | 0-3 |  |
| 51 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1416 | 282 | 15 | 5-10 |  |
| 52 | **cand:h16r** | candidate | 1389 | 177 | 40 | 16-24 |  |
| 53 | **us:v2** | accepted | 1368 | 185 | 62 | 30-32 |  |
| 54 | **us:v1** | accepted | 1347 | 195 | 154 | 128-26 |  |
| 55 | **cand:h18** | candidate | 1311 | 214 | 25 | 6-19 |  |
| 56 | **spar:rush** | sparring | 1311 | 214 | 25 | 6-19 |  |
| 57 | SethKitchen.examplefuncsplayer | field | 1293 | 635 | 12 | 8-4 |  |
| 58 | Nydroam.BatteredCod | field | 1277 | 451 | 6 | 3-3 |  |
| 59 | ovkulkarni.battlecode2019~0aa607 | field | 1271 | 785 | 3 | 2-1 |  |
| 60 | 18dcb01.Battlecode19-robot2 | field | 1200 | 374 | 15 | 3-12 |  |
| 61 | OmarTahoun.battle-code | field | 1185 | 656 | 12 | 7-5 |  |
| 62 | bovard.battlecode-2019-un~8822c3 | field | 1165 | 1134 | 3 | 0-3 |  |
| 63 | CS554-software-engineerin~a575dc | field | 1151 | 175 | 215 | 131-84 | 67% (v5 2-1) |
| 64 | JasonLarson44.2019-Battle~1c7639 | field | 1142 | 326 | 15 | 5-10 | 100% (v3 3-0) |
| 65 | CometsTech.battlecode2019 | field | 1139 | 176 | 177 | 90-87 | 100% (v5 3-0) |
| 66 | nthistle.battlecode-2019 | field | 1135 | 706 | 15 | 4-11 | 100% (v5 3-0) |
| 67 | moreda-a.BC2019-t15 | field | 1104 | 1375 | 3 | 0-3 |  |
| 68 | CometsTech.battlecode2019~187e8c | field | 1082 | 481 | 12 | 1-11 |  |
| 69 | TestSubjector.BattleCode2~fb22c7 | field | 1063 | 465 | 12 | 7-5 |  |
| 70 | jamesrayman.HCN-bot | field | 1035 | 926 | 12 | 2-10 | 100% (v5 3-0) |
| 71 | ipercyNC.group6-battlecode | field | 938 | 1000 | 3 | 1-2 |  |
| 72 | TestSubjector.BattleCode2~e6de74 | field | 658 | 520 | 12 | 5-7 |  |
| 73 | ovkulkarni.battlecode2019~06c610 | field | 548 | 1287 | 3 | 0-3 |  |
| 74 | DivyanshuSaxena.Battlecode | field | 368 | 458 | 12 | 2-10 |  |
| 75 | TheRobotCarlson.battlehac~323871 | field | 367 | 1134 | 12 | 0-12 |  |
| 76 | RyanSharafuddin.Battlecode_2019 | field | 367 | 1134 | 12 | 0-12 |  |
| 77 | bc19-starter | field | 348 | 319 | 307 | 45-262 | 100% (v3 12-0) |
| 78 | ArtemUstilov.bc19_CrazyTapok | field | -703 | 1110 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, arya-k.bc19, asunathanr.asu_bc, bayoumi17m.BattleCode-2019, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, liwanlin41.examplefuncsplayer, lschaberg.bc19, m4reko.bc2019-tmores-angels, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, programjames.BC19Bot-root, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h63 | us:v6 | 36 | 21-15 | 58% | local |
| moreda-a.BC2019-a31 | m-schier.battlecode-2019-wololo | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
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
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
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
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| nthistle.battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
