# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 02:32 PDT.

1088 games: 571 local (VM batches between our builds, candidates, sparring partners and the starter bot), 193 of ours on the galaxy replica and 324 between field bots there (324 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 50 players; compare them only within this fit.

**Thin field.** 23 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-eigthbot, IvanGeffner.BC19-bot6b, SethKitchen.examplefuncsplayer, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, Nydroam.BatteredCod, 18dcb01.Battlecode19-prea~fb5c48, 18dcb01.Battlecode19-robot2, CometsTech.battlecode2019~187e8c, NielsKornerup.Battlecode-2019, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~fb22c7, TestSubjector.BattleCode2~e6de74, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (23), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1475 ± 257 | 30 of 50 | 38 | 33-5 | 68.9% | 32.0% (vs 7) |
| v1 | accepted | 1321 ± 190 | 36 of 50 | 154 | 128-26 | 56.1% | 21.5% (vs 9) |
| v2 | accepted | 1367 ± 179 | 35 of 50 | 62 | 30-32 | 60.1% | 25.9% (vs 9) |
| v3 | accepted | 1568 ± 146 | 21 of 50 | 185 | 134-51 | 75.8% | 26.1% (vs 3) |
| v4 | accepted | 1577 ± 159 | 20 of 50 | 214 | 83-131 | 76.5% | 27.0% (vs 3) |
| v5 | accepted | 1886 ± 193 | 4 of 50 | 106 | 68-38 | 91.2% | 15.8% (vs 1) |
| h11c | candidate | 1647 ± 201 | 17 of 50 | 25 | 15-10 | 80.9% | 23.0% (vs 2) |
| h16r | candidate | 1507 ± 191 | 28 of 50 | 40 | 16-24 | 71.4% | 35.7% (vs 7) |
| h18 | candidate | 1379 ± 215 | 33 of 50 | 25 | 6-19 | 61.1% | 27.1% (vs 9) |
| h2 | candidate | 1518 ± 182 | 25 of 50 | 54 | 25-29 | 72.2% | 31.6% (vs 5) |
| h24 | candidate | 1684 ± 193 | 15 of 50 | 40 | 26-14 | 83.0% | 26.2% (vs 2) |
| h3 | candidate | 1500 ± 236 | 29 of 50 | 19 | 9-10 | 70.9% | 34.9% (vs 7) |
| h31 | candidate | 1665 ± 192 | 16 of 50 | 40 | 25-15 | 81.9% | 24.6% (vs 2) |
| h38 | candidate | 1691 ± 323 | 14 of 50 | 6 | 4-2 | 83.4% | 26.8% (vs 2) |
| h40 | candidate | 1761 ± 309 | 12 of 50 | 8 | 6-2 | 86.7% | 8.4% (vs 1) |
| h41 | candidate | 1790 ± 309 | 9 of 50 | 8 | 3-5 | 87.9% | 9.8% (vs 1) |
| h42 | candidate | 1790 ± 309 | 10 of 50 | 8 | 3-5 | 87.9% | 9.8% (vs 1) |
| h43 | candidate | 1879 ± 303 | 5 of 50 | 8 | 4-4 | 91.0% | 15.2% (vs 1) |
| h44 | candidate | 2066 ± 330 | 3 of 50 | 8 | 6-2 | 95.1% | 34.6% (vs 1) |
| h46 | candidate | 1790 ± 309 | 11 of 50 | 8 | 3-5 | 87.9% | 9.8% (vs 1) |
| h47 | candidate | 1879 ± 303 | 6 of 50 | 8 | 4-4 | 91.0% | 15.2% (vs 1) |
| h48 | candidate | 1879 ± 303 | 7 of 50 | 8 | 4-4 | 91.0% | 15.2% (vs 1) |
| h49 | candidate | 1879 ± 303 | 8 of 50 | 8 | 4-4 | 91.0% | 15.2% (vs 1) |
| h50 | candidate | 2399 ± 1098 | 1 of 50 | 2 | 2-0 | 98.7% | - |
| h6 | candidate | 1578 ± 149 | 19 of 50 | 158 | 94-64 | 76.5% | 27.0% (vs 3) |
| h7 | candidate | 1523 ± 1428 | 24 of 50 | 8 | 8-0 | 72.6% | 32.1% (vs 5) |
| rush | sparring | 1379 ± 215 | 34 of 50 | 25 | 6-19 | 61.1% | 27.1% (vs 9) |

Sources (`tools/progress/games.py`):

- local: 571 games from 31 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 517 games (11 archive games skipped, 54 matches from archives, 108 matches from scores), fetched 2026-10-22T09:34:40+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h50** | candidate | 2399 | 1098 | 2 | 2-0 |  |
| 2 | StoneT2000.BC19-botfinalsafe | field | 2177 | 1079 | 9 | 9-0 | 0% (v3 0-3) |
| 3 | **cand:h44** | candidate | 2066 | 330 | 8 | 6-2 |  |
| 4 | **us:v5** | accepted | 1886 | 193 | 106 | 68-38 |  |
| 5 | **cand:h43** | candidate | 1879 | 303 | 8 | 4-4 |  |
| 6 | **cand:h47** | candidate | 1879 | 303 | 8 | 4-4 |  |
| 7 | **cand:h48** | candidate | 1879 | 303 | 8 | 4-4 |  |
| 8 | **cand:h49** | candidate | 1879 | 303 | 8 | 4-4 |  |
| 9 | **cand:h41** | candidate | 1790 | 309 | 8 | 3-5 |  |
| 10 | **cand:h42** | candidate | 1790 | 309 | 8 | 3-5 |  |
| 11 | **cand:h46** | candidate | 1790 | 309 | 8 | 3-5 |  |
| 12 | **cand:h40** | candidate | 1761 | 309 | 8 | 6-2 |  |
| 13 | StoneT2000.BC19-bot1v43 | field | 1706 | 409 | 6 | 5-1 | 33% (v3 1-2) |
| 14 | **cand:h38** | candidate | 1691 | 323 | 6 | 4-2 |  |
| 15 | **cand:h24** | candidate | 1684 | 193 | 40 | 26-14 |  |
| 16 | **cand:h31** | candidate | 1665 | 192 | 40 | 25-15 |  |
| 17 | **cand:h11c** | candidate | 1647 | 201 | 25 | 15-10 |  |
| 18 | IanCoolidge0.battlecode20~69ce88 | field | 1608 | 417 | 12 | 10-2 |  |
| 19 | **cand:h6** | candidate | 1578 | 149 | 158 | 94-64 |  |
| 20 | **us:v4** | accepted | 1577 | 159 | 214 | 83-131 |  |
| 21 | **us:v3** | accepted | 1568 | 146 | 185 | 134-51 |  |
| 22 | IvanGeffner.BC19-eigthbot | field | 1561 | 538 | 6 | 5-1 |  |
| 23 | IvanGeffner.BC19-bot6b | field | 1525 | 527 | 6 | 4-2 |  |
| 24 | **cand:h7** | candidate | 1523 | 1428 | 8 | 8-0 |  |
| 25 | **cand:h2** | candidate | 1518 | 182 | 54 | 25-29 |  |
| 26 | SethKitchen.examplefuncsplayer | field | 1513 | 1464 | 3 | 3-0 |  |
| 27 | Tom-CCS.BC19 | field | 1513 | 1464 | 3 | 3-0 |  |
| 28 | **cand:h16r** | candidate | 1507 | 191 | 40 | 16-24 |  |
| 29 | **cand:h3** | candidate | 1500 | 236 | 19 | 9-10 |  |
| 30 | **us:v0** | accepted | 1475 | 257 | 38 | 33-5 |  |
| 31 | IanCoolidge0.battlecode20~f649f3 | field | 1443 | 274 | 15 | 10-5 | 67% (v3 2-1) |
| 32 | Nydroam.BatteredCod | field | 1391 | 547 | 6 | 3-3 |  |
| 33 | **cand:h18** | candidate | 1379 | 215 | 25 | 6-19 |  |
| 34 | **spar:rush** | sparring | 1379 | 215 | 25 | 6-19 |  |
| 35 | **us:v2** | accepted | 1367 | 179 | 62 | 30-32 |  |
| 36 | **us:v1** | accepted | 1321 | 190 | 154 | 128-26 |  |
| 37 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1296 | 321 | 9 | 4-5 |  |
| 38 | 18dcb01.Battlecode19-robot2 | field | 1265 | 398 | 9 | 3-6 |  |
| 39 | CometsTech.battlecode2019~187e8c | field | 1212 | 552 | 6 | 1-5 |  |
| 40 | NielsKornerup.Battlecode-2019 | field | 1183 | 375 | 6 | 2-4 |  |
| 41 | JasonLarson44.2019-Battle~1c7639 | field | 1178 | 358 | 9 | 5-4 | 100% (v3 3-0) |
| 42 | TestSubjector.BattleCode2~fb22c7 | field | 1171 | 540 | 6 | 4-2 |  |
| 43 | TestSubjector.BattleCode2~e6de74 | field | 1155 | 852 | 9 | 3-6 |  |
| 44 | CS554-software-engineerin~a575dc | field | 1104 | 173 | 209 | 130-79 | 93% (v3 25-2) |
| 45 | CometsTech.battlecode2019 | field | 1099 | 175 | 168 | 89-79 | 100% (v3 30-0) |
| 46 | OmarTahoun.battle-code | field | 1017 | 894 | 6 | 3-3 |  |
| 47 | DivyanshuSaxena.Battlecode | field | 457 | 1168 | 6 | 0-6 |  |
| 48 | TheRobotCarlson.battlehac~323871 | field | 355 | 1227 | 12 | 0-12 |  |
| 49 | bc19-starter | field | 288 | 340 | 301 | 43-258 | 100% (v3 12-0) |
| 50 | ArtemUstilov.bc19_CrazyTapok | field | -762 | 1109 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h50 | us:v5 | 2 | 2-0 | 100% | local |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h49 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| us:v3 | CS554-software-engineerin~a575dc | 27 | 25-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 30 | 30-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
