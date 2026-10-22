# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 01:18 PDT.

1036 games: 531 local (VM batches between our builds, candidates, sparring partners and the starter bot), 190 of ours on the galaxy replica and 315 between field bots there (315 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 44 players; compare them only within this fit.

**Thin field.** 22 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-eigthbot, IvanGeffner.BC19-bot6b, SethKitchen.examplefuncsplayer, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, Nydroam.BatteredCod, 18dcb01.Battlecode19-prea~fb5c48, 18dcb01.Battlecode19-robot2, CometsTech.battlecode2019~187e8c, NielsKornerup.Battlecode-2019, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~e6de74, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (22), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1518 ± 259 | 25 of 44 | 38 | 33-5 | 69.6% | 34.6% (vs 7) |
| v1 | accepted | 1365 ± 193 | 31 of 44 | 154 | 128-26 | 56.9% | 23.7% (vs 9) |
| v2 | accepted | 1414 ± 186 | 29 of 44 | 62 | 30-32 | 61.1% | 25.9% (vs 8) |
| v3 | accepted | 1617 ± 158 | 16 of 44 | 182 | 132-50 | 76.8% | 27.6% (vs 3) |
| v4 | accepted | 1636 ± 178 | 13 of 44 | 214 | 83-131 | 78.0% | 18.6% (vs 2) |
| v5 | accepted | 1957 ± 223 | 3 of 44 | 66 | 49-17 | 92.0% | 17.8% (vs 1) |
| h11c | candidate | 1700 ± 213 | 12 of 44 | 25 | 15-10 | 81.9% | 23.7% (vs 2) |
| h16r | candidate | 1565 ± 207 | 19 of 44 | 40 | 16-24 | 73.1% | 28.9% (vs 4) |
| h18 | candidate | 1432 ± 225 | 27 of 44 | 25 | 6-19 | 62.6% | 27.7% (vs 8) |
| h2 | candidate | 1566 ± 192 | 18 of 44 | 54 | 25-29 | 73.2% | 29.1% (vs 4) |
| h24 | candidate | 1742 ± 209 | 10 of 44 | 40 | 26-14 | 84.1% | 27.3% (vs 2) |
| h3 | candidate | 1547 ± 243 | 21 of 44 | 19 | 9-10 | 71.8% | 31.7% (vs 5) |
| h31 | candidate | 1723 ± 208 | 11 of 44 | 40 | 25-15 | 83.2% | 25.7% (vs 2) |
| h38 | candidate | 1748 ± 332 | 9 of 44 | 6 | 4-2 | 84.4% | 27.8% (vs 2) |
| h40 | candidate | 1818 ± 319 | 7 of 44 | 8 | 6-2 | 87.6% | 8.9% (vs 1) |
| h41 | candidate | 1861 ± 328 | 5 of 44 | 8 | 3-5 | 89.2% | 11.1% (vs 1) |
| h42 | candidate | 1861 ± 328 | 6 of 44 | 8 | 3-5 | 89.2% | 11.1% (vs 1) |
| h43 | candidate | 1950 ± 323 | 4 of 44 | 8 | 4-4 | 91.8% | 17.2% (vs 1) |
| h44 | candidate | 2470 ± 1101 | 1 of 44 | 2 | 2-0 | 98.9% | - |
| h6 | candidate | 1631 ± 165 | 14 of 44 | 158 | 94-64 | 77.7% | 18.3% (vs 2) |
| h7 | candidate | 1529 ± 1407 | 22 of 44 | 8 | 8-0 | 70.4% | 29.7% (vs 5) |
| rush | sparring | 1432 ± 225 | 28 of 44 | 25 | 6-19 | 62.6% | 27.7% (vs 8) |

Sources (`tools/progress/games.py`):

- local: 531 games from 26 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 505 games (11 archive games skipped, 53 matches from archives, 105 matches from scores), fetched 2026-10-22T08:18:55+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h44** | candidate | 2470 | 1101 | 2 | 2-0 |  |
| 2 | StoneT2000.BC19-botfinalsafe | field | 2223 | 1077 | 9 | 9-0 | 0% (v3 0-3) |
| 3 | **us:v5** | accepted | 1957 | 223 | 66 | 49-17 |  |
| 4 | **cand:h43** | candidate | 1950 | 323 | 8 | 4-4 |  |
| 5 | **cand:h41** | candidate | 1861 | 328 | 8 | 3-5 |  |
| 6 | **cand:h42** | candidate | 1861 | 328 | 8 | 3-5 |  |
| 7 | **cand:h40** | candidate | 1818 | 319 | 8 | 6-2 |  |
| 8 | StoneT2000.BC19-bot1v43 | field | 1751 | 411 | 6 | 5-1 | 33% (v3 1-2) |
| 9 | **cand:h38** | candidate | 1748 | 332 | 6 | 4-2 |  |
| 10 | **cand:h24** | candidate | 1742 | 209 | 40 | 26-14 |  |
| 11 | **cand:h31** | candidate | 1723 | 208 | 40 | 25-15 |  |
| 12 | **cand:h11c** | candidate | 1700 | 213 | 25 | 15-10 |  |
| 13 | **us:v4** | accepted | 1636 | 178 | 214 | 83-131 |  |
| 14 | **cand:h6** | candidate | 1631 | 165 | 158 | 94-64 |  |
| 15 | IanCoolidge0.battlecode20~69ce88 | field | 1629 | 420 | 12 | 10-2 |  |
| 16 | **us:v3** | accepted | 1617 | 158 | 182 | 132-50 |  |
| 17 | IvanGeffner.BC19-eigthbot | field | 1584 | 528 | 6 | 5-1 |  |
| 18 | **cand:h2** | candidate | 1566 | 192 | 54 | 25-29 |  |
| 19 | **cand:h16r** | candidate | 1565 | 207 | 40 | 16-24 |  |
| 20 | IvanGeffner.BC19-bot6b | field | 1549 | 526 | 6 | 4-2 |  |
| 21 | **cand:h3** | candidate | 1547 | 243 | 19 | 9-10 |  |
| 22 | **cand:h7** | candidate | 1529 | 1407 | 8 | 8-0 |  |
| 23 | SethKitchen.examplefuncsplayer | field | 1522 | 1434 | 3 | 3-0 |  |
| 24 | Tom-CCS.BC19 | field | 1522 | 1434 | 3 | 3-0 |  |
| 25 | **us:v0** | accepted | 1518 | 259 | 38 | 33-5 |  |
| 26 | IanCoolidge0.battlecode20~f649f3 | field | 1469 | 349 | 12 | 9-3 |  |
| 27 | **cand:h18** | candidate | 1432 | 225 | 25 | 6-19 |  |
| 28 | **spar:rush** | sparring | 1432 | 225 | 25 | 6-19 |  |
| 29 | **us:v2** | accepted | 1414 | 186 | 62 | 30-32 |  |
| 30 | Nydroam.BatteredCod | field | 1412 | 540 | 6 | 3-3 |  |
| 31 | **us:v1** | accepted | 1365 | 193 | 154 | 128-26 |  |
| 32 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1328 | 350 | 9 | 4-5 |  |
| 33 | 18dcb01.Battlecode19-robot2 | field | 1269 | 450 | 6 | 1-5 |  |
| 34 | CometsTech.battlecode2019~187e8c | field | 1232 | 546 | 6 | 1-5 |  |
| 35 | NielsKornerup.Battlecode-2019 | field | 1224 | 369 | 6 | 2-4 |  |
| 36 | JasonLarson44.2019-Battle~1c7639 | field | 1216 | 360 | 9 | 5-4 | 100% (v3 3-0) |
| 37 | TestSubjector.BattleCode2~e6de74 | field | 1193 | 849 | 9 | 3-6 |  |
| 38 | CS554-software-engineerin~a575dc | field | 1153 | 176 | 206 | 130-76 | 93% (v3 25-2) |
| 39 | CometsTech.battlecode2019 | field | 1135 | 178 | 165 | 86-79 | 100% (v3 30-0) |
| 40 | OmarTahoun.battle-code | field | 1062 | 881 | 6 | 3-3 |  |
| 41 | DivyanshuSaxena.Battlecode | field | 495 | 1164 | 6 | 0-6 |  |
| 42 | TheRobotCarlson.battlehac~323871 | field | 452 | 1318 | 9 | 0-9 |  |
| 43 | bc19-starter | field | 333 | 339 | 301 | 43-258 | 100% (v3 12-0) |
| 44 | ArtemUstilov.bc19_CrazyTapok | field | -717 | 1106 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, TestSubjector.BattleCode2~fb22c7, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h44 | us:v5 | 2 | 2-0 | 100% | local |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| us:v4 | cand:h6 | 40 | 21-19 | 52% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 27 | 25-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 30 | 30-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 69 | 32-37 | 46% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
