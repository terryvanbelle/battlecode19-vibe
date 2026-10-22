# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 03:03 PDT.

1121 games: 592 local (VM batches between our builds, candidates, sparring partners and the starter bot), 196 of ours on the galaxy replica and 333 between field bots there (333 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 51 players; compare them only within this fit.

**Thin field.** 23 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, Tom-CCS.BC19, SethKitchen.examplefuncsplayer, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, 18dcb01.Battlecode19-robot2, NielsKornerup.Battlecode-2019, TestSubjector.BattleCode2~fb22c7, Nydroam.BatteredCod, JasonLarson44.2019-Battle~1c7639, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, TestSubjector.BattleCode2~e6de74, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (23), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1482 ± 253 | 31 of 51 | 38 | 33-5 | 70.8% | 35.7% (vs 7) |
| v1 | accepted | 1328 ± 184 | 37 of 51 | 154 | 128-26 | 58.0% | 23.4% (vs 9) |
| v2 | accepted | 1371 ± 173 | 36 of 51 | 62 | 30-32 | 61.7% | 27.8% (vs 9) |
| v3 | accepted | 1570 ± 138 | 22 of 51 | 188 | 137-51 | 77.4% | 33.2% (vs 3) |
| v4 | accepted | 1578 ± 150 | 21 of 51 | 214 | 83-131 | 78.0% | 34.1% (vs 3) |
| v5 | accepted | 1884 ± 184 | 3 of 51 | 127 | 76-51 | 93.5% | - |
| h11c | candidate | 1648 ± 195 | 18 of 51 | 25 | 15-10 | 82.6% | 37.2% (vs 2) |
| h16r | candidate | 1507 ± 184 | 29 of 51 | 40 | 16-24 | 72.8% | 38.9% (vs 7) |
| h18 | candidate | 1380 ± 209 | 34 of 51 | 25 | 6-19 | 62.4% | 28.7% (vs 9) |
| h2 | candidate | 1520 ± 176 | 25 of 51 | 54 | 25-29 | 73.8% | 32.8% (vs 4) |
| h24 | candidate | 1684 ± 186 | 16 of 51 | 40 | 26-14 | 84.8% | 42.1% (vs 2) |
| h3 | candidate | 1502 ± 232 | 30 of 51 | 19 | 9-10 | 72.4% | 38.2% (vs 7) |
| h31 | candidate | 1666 ± 185 | 17 of 51 | 40 | 25-15 | 83.7% | 39.5% (vs 2) |
| h38 | candidate | 1692 ± 319 | 15 of 51 | 6 | 4-2 | 85.2% | 43.1% (vs 2) |
| h40 | candidate | 1761 ± 305 | 12 of 51 | 8 | 6-2 | 88.7% | 47.2% (vs 1) |
| h41 | candidate | 1789 ± 303 | 8 of 51 | 8 | 3-5 | 90.0% | - |
| h42 | candidate | 1789 ± 303 | 9 of 51 | 8 | 3-5 | 90.0% | - |
| h43 | candidate | 1877 ± 297 | 4 of 51 | 8 | 4-4 | 93.2% | - |
| h44 | candidate | 2064 ± 324 | 1 of 51 | 8 | 6-2 | 97.3% | - |
| h46 | candidate | 1789 ± 303 | 10 of 51 | 8 | 3-5 | 90.0% | - |
| h47 | candidate | 1877 ± 297 | 5 of 51 | 8 | 4-4 | 93.2% | - |
| h48 | candidate | 1877 ± 297 | 6 of 51 | 8 | 4-4 | 93.2% | - |
| h49 | candidate | 1877 ± 297 | 7 of 51 | 8 | 4-4 | 93.2% | - |
| h50 | candidate | 2028 ± 245 | 2 of 51 | 20 | 14-6 | 96.8% | - |
| h52 | candidate | 1748 ± 442 | 13 of 51 | 3 | 1-2 | 88.1% | 45.2% (vs 1) |
| h6 | candidate | 1579 ± 141 | 20 of 51 | 158 | 94-64 | 78.0% | 34.2% (vs 3) |
| h7 | candidate | 1524 ± 1424 | 24 of 51 | 8 | 8-0 | 74.0% | 33.2% (vs 4) |
| rush | sparring | 1380 ± 209 | 35 of 51 | 25 | 6-19 | 62.4% | 28.7% (vs 9) |

Sources (`tools/progress/games.py`):

- local: 592 games from 32 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 529 games (11 archive games skipped, 55 matches from archives, 111 matches from scores), fetched 2026-10-22T10:03:09+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h44** | candidate | 2064 | 324 | 8 | 6-2 |  |
| 2 | **cand:h50** | candidate | 2028 | 245 | 20 | 14-6 |  |
| 3 | **us:v5** | accepted | 1884 | 184 | 127 | 76-51 |  |
| 4 | **cand:h43** | candidate | 1877 | 297 | 8 | 4-4 |  |
| 5 | **cand:h47** | candidate | 1877 | 297 | 8 | 4-4 |  |
| 6 | **cand:h48** | candidate | 1877 | 297 | 8 | 4-4 |  |
| 7 | **cand:h49** | candidate | 1877 | 297 | 8 | 4-4 |  |
| 8 | **cand:h41** | candidate | 1789 | 303 | 8 | 3-5 |  |
| 9 | **cand:h42** | candidate | 1789 | 303 | 8 | 3-5 |  |
| 10 | **cand:h46** | candidate | 1789 | 303 | 8 | 3-5 |  |
| 11 | StoneT2000.BC19-botfinalsafe | field | 1781 | 379 | 12 | 11-1 | 0% (v3 0-3) |
| 12 | **cand:h40** | candidate | 1761 | 305 | 8 | 6-2 |  |
| 13 | **cand:h52** | candidate | 1748 | 442 | 3 | 1-2 |  |
| 14 | StoneT2000.BC19-bot1v43 | field | 1700 | 404 | 6 | 5-1 | 33% (v3 1-2) |
| 15 | **cand:h38** | candidate | 1692 | 319 | 6 | 4-2 |  |
| 16 | **cand:h24** | candidate | 1684 | 186 | 40 | 26-14 |  |
| 17 | **cand:h31** | candidate | 1666 | 185 | 40 | 25-15 |  |
| 18 | **cand:h11c** | candidate | 1648 | 195 | 25 | 15-10 |  |
| 19 | IanCoolidge0.battlecode20~69ce88 | field | 1609 | 417 | 12 | 10-2 |  |
| 20 | **cand:h6** | candidate | 1579 | 141 | 158 | 94-64 |  |
| 21 | **us:v4** | accepted | 1578 | 150 | 214 | 83-131 |  |
| 22 | **us:v3** | accepted | 1570 | 138 | 188 | 137-51 |  |
| 23 | IvanGeffner.BC19-bot6b | field | 1526 | 527 | 6 | 4-2 |  |
| 24 | **cand:h7** | candidate | 1524 | 1424 | 8 | 8-0 |  |
| 25 | **cand:h2** | candidate | 1520 | 176 | 54 | 25-29 |  |
| 26 | Tom-CCS.BC19 | field | 1514 | 1460 | 3 | 3-0 |  |
| 27 | SethKitchen.examplefuncsplayer | field | 1514 | 1460 | 3 | 3-0 |  |
| 28 | IanCoolidge0.battlecode20~f649f3 | field | 1512 | 245 | 18 | 12-6 | 67% (v3 2-1) |
| 29 | **cand:h16r** | candidate | 1507 | 184 | 40 | 16-24 |  |
| 30 | **cand:h3** | candidate | 1502 | 232 | 19 | 9-10 |  |
| 31 | **us:v0** | accepted | 1482 | 253 | 38 | 33-5 |  |
| 32 | IvanGeffner.BC19-eigthbot | field | 1420 | 331 | 9 | 6-3 |  |
| 33 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1412 | 296 | 12 | 5-7 |  |
| 34 | **cand:h18** | candidate | 1380 | 209 | 25 | 6-19 |  |
| 35 | **spar:rush** | sparring | 1380 | 209 | 25 | 6-19 |  |
| 36 | **us:v2** | accepted | 1371 | 173 | 62 | 30-32 |  |
| 37 | **us:v1** | accepted | 1328 | 184 | 154 | 128-26 |  |
| 38 | 18dcb01.Battlecode19-robot2 | field | 1305 | 394 | 9 | 3-6 |  |
| 39 | NielsKornerup.Battlecode-2019 | field | 1268 | 347 | 9 | 5-4 |  |
| 40 | TestSubjector.BattleCode2~fb22c7 | field | 1208 | 537 | 6 | 4-2 |  |
| 41 | Nydroam.BatteredCod | field | 1201 | 453 | 6 | 3-3 |  |
| 42 | JasonLarson44.2019-Battle~1c7639 | field | 1183 | 356 | 9 | 5-4 | 100% (v3 3-0) |
| 43 | CS554-software-engineerin~a575dc | field | 1116 | 166 | 212 | 130-82 | 93% (v3 28-2) |
| 44 | CometsTech.battlecode2019 | field | 1108 | 168 | 168 | 89-79 | 100% (v3 30-0) |
| 45 | TestSubjector.BattleCode2~e6de74 | field | 1093 | 812 | 9 | 3-6 |  |
| 46 | OmarTahoun.battle-code | field | 1022 | 892 | 6 | 3-3 |  |
| 47 | CometsTech.battlecode2019~187e8c | field | 957 | 466 | 9 | 1-8 |  |
| 48 | DivyanshuSaxena.Battlecode | field | 423 | 1185 | 6 | 0-6 |  |
| 49 | TheRobotCarlson.battlehac~323871 | field | 368 | 1238 | 12 | 0-12 |  |
| 50 | bc19-starter | field | 298 | 336 | 301 | 43-258 | 100% (v3 12-0) |
| 51 | ArtemUstilov.bc19_CrazyTapok | field | -753 | 1108 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h50 | us:v5 | 20 | 14-6 | 70% | local |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h49 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h52 | 3 | 2-1 | 67% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 30 | 30-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
