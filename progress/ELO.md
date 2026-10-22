# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 00:58 PDT.

1016 games: 517 local (VM batches between our builds, candidates, sparring partners and the starter bot), 190 of ours on the galaxy replica and 309 between field bots there (309 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 42 players; compare them only within this fit.

**Thin field.** 22 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IvanGeffner.BC19-eigthbot, IanCoolidge0.battlecode20~f649f3, IanCoolidge0.battlecode20~69ce88, Nydroam.BatteredCod, IvanGeffner.BC19-bot6b, Tom-CCS.BC19, SethKitchen.examplefuncsplayer, 18dcb01.Battlecode19-prea~fb5c48, 18dcb01.Battlecode19-robot2, NielsKornerup.Battlecode-2019, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~e6de74, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (22), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1540 ± 267 | 21 of 42 | 38 | 33-5 | 66.8% | 29.1% (vs 7) |
| v1 | accepted | 1387 ± 204 | 29 of 42 | 154 | 128-26 | 54.9% | 21.2% (vs 10) |
| v2 | accepted | 1439 ± 198 | 28 of 42 | 62 | 30-32 | 59.0% | 26.1% (vs 10) |
| v3 | accepted | 1644 ± 173 | 13 of 42 | 182 | 132-50 | 74.3% | 23.3% (vs 3) |
| v4 | accepted | 1672 ± 196 | 11 of 42 | 214 | 83-131 | 76.3% | 26.0% (vs 3) |
| v5 | accepted | 2006 ± 245 | 2 of 42 | 52 | 44-8 | 91.7% | 19.8% (vs 1) |
| h11c | candidate | 1732 ± 226 | 10 of 42 | 25 | 15-10 | 80.0% | 31.9% (vs 3) |
| h16r | candidate | 1601 ± 223 | 17 of 42 | 40 | 16-24 | 71.3% | 32.6% (vs 6) |
| h18 | candidate | 1463 ± 237 | 25 of 42 | 25 | 6-19 | 60.8% | 25.9% (vs 9) |
| h2 | candidate | 1593 ± 204 | 18 of 42 | 54 | 25-29 | 70.7% | 31.7% (vs 6) |
| h24 | candidate | 1779 ± 224 | 6 of 42 | 40 | 26-14 | 82.7% | 6.3% (vs 1) |
| h3 | candidate | 1574 ± 253 | 19 of 42 | 19 | 9-10 | 69.3% | 29.6% (vs 6) |
| h31 | candidate | 1760 ± 223 | 8 of 42 | 40 | 25-15 | 81.6% | 26.6% (vs 2) |
| h38 | candidate | 1784 ± 342 | 5 of 42 | 6 | 4-2 | 83.0% | 6.4% (vs 1) |
| h40 | candidate | 1854 ± 329 | 4 of 42 | 8 | 6-2 | 86.4% | 9.4% (vs 1) |
| h41 | candidate | 1909 ± 344 | 3 of 42 | 8 | 3-5 | 88.6% | 12.4% (vs 1) |
| h42 | candidate | 1272 ± 1123 | 31 of 42 | 4 | 0-4 | 46.1% | 14.8% (vs 11) |
| h6 | candidate | 1663 ± 182 | 12 of 42 | 158 | 94-64 | 75.6% | 25.1% (vs 3) |
| h7 | candidate | 1532 ± 1397 | 22 of 42 | 8 | 8-0 | 66.1% | 28.2% (vs 7) |
| rush | sparring | 1463 ± 237 | 26 of 42 | 25 | 6-19 | 60.8% | 25.9% (vs 9) |

Sources (`tools/progress/games.py`):

- local: 517 games from 24 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 499 games (11 archive games skipped, 53 matches from archives, 103 matches from scores), fetched 2026-10-22T08:01:07+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-botfinalsafe | field | 2249 | 1078 | 9 | 9-0 | 0% (v3 0-3) |
| 2 | **us:v5** | accepted | 2006 | 245 | 52 | 44-8 |  |
| 3 | **cand:h41** | candidate | 1909 | 344 | 8 | 3-5 |  |
| 4 | **cand:h40** | candidate | 1854 | 329 | 8 | 6-2 |  |
| 5 | **cand:h38** | candidate | 1784 | 342 | 6 | 4-2 |  |
| 6 | **cand:h24** | candidate | 1779 | 224 | 40 | 26-14 |  |
| 7 | StoneT2000.BC19-bot1v43 | field | 1777 | 415 | 6 | 5-1 | 33% (v3 1-2) |
| 8 | **cand:h31** | candidate | 1760 | 223 | 40 | 25-15 |  |
| 9 | IvanGeffner.BC19-eigthbot | field | 1750 | 818 | 6 | 5-1 |  |
| 10 | **cand:h11c** | candidate | 1732 | 226 | 25 | 15-10 |  |
| 11 | **us:v4** | accepted | 1672 | 196 | 214 | 83-131 |  |
| 12 | **cand:h6** | candidate | 1663 | 182 | 158 | 94-64 |  |
| 13 | **us:v3** | accepted | 1644 | 173 | 182 | 132-50 |  |
| 14 | IanCoolidge0.battlecode20~f649f3 | field | 1638 | 453 | 9 | 7-2 |  |
| 15 | IanCoolidge0.battlecode20~69ce88 | field | 1638 | 457 | 12 | 10-2 |  |
| 16 | Nydroam.BatteredCod | field | 1621 | 864 | 3 | 1-2 |  |
| 17 | **cand:h16r** | candidate | 1601 | 223 | 40 | 16-24 |  |
| 18 | **cand:h2** | candidate | 1593 | 204 | 54 | 25-29 |  |
| 19 | **cand:h3** | candidate | 1574 | 253 | 19 | 9-10 |  |
| 20 | IvanGeffner.BC19-bot6b | field | 1556 | 550 | 6 | 4-2 |  |
| 21 | **us:v0** | accepted | 1540 | 267 | 38 | 33-5 |  |
| 22 | **cand:h7** | candidate | 1532 | 1397 | 8 | 8-0 |  |
| 23 | Tom-CCS.BC19 | field | 1523 | 1431 | 3 | 3-0 |  |
| 24 | SethKitchen.examplefuncsplayer | field | 1523 | 1431 | 3 | 3-0 |  |
| 25 | **cand:h18** | candidate | 1463 | 237 | 25 | 6-19 |  |
| 26 | **spar:rush** | sparring | 1463 | 237 | 25 | 6-19 |  |
| 27 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1450 | 419 | 9 | 4-5 |  |
| 28 | **us:v2** | accepted | 1439 | 198 | 62 | 30-32 |  |
| 29 | **us:v1** | accepted | 1387 | 204 | 154 | 128-26 |  |
| 30 | 18dcb01.Battlecode19-robot2 | field | 1366 | 492 | 6 | 1-5 |  |
| 31 | **cand:h42** | candidate | 1272 | 1123 | 4 | 0-4 |  |
| 32 | NielsKornerup.Battlecode-2019 | field | 1240 | 370 | 6 | 2-4 |  |
| 33 | JasonLarson44.2019-Battle~1c7639 | field | 1238 | 366 | 9 | 5-4 | 100% (v3 3-0) |
| 34 | TestSubjector.BattleCode2~e6de74 | field | 1214 | 849 | 9 | 3-6 |  |
| 35 | CS554-software-engineerin~a575dc | field | 1173 | 189 | 203 | 129-74 | 93% (v3 25-2) |
| 36 | CometsTech.battlecode2019 | field | 1157 | 191 | 165 | 86-79 | 100% (v3 30-0) |
| 37 | OmarTahoun.battle-code | field | 1069 | 889 | 6 | 3-3 |  |
| 38 | CometsTech.battlecode2019~187e8c | field | 1029 | 1143 | 3 | 0-3 |  |
| 39 | DivyanshuSaxena.Battlecode | field | 516 | 1164 | 6 | 0-6 |  |
| 40 | TheRobotCarlson.battlehac~323871 | field | 458 | 1319 | 9 | 0-9 |  |
| 41 | bc19-starter | field | 353 | 345 | 301 | 43-258 | 100% (v3 12-0) |
| 42 | ArtemUstilov.bc19_CrazyTapok | field | -697 | 1106 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, TestSubjector.BattleCode2~fb22c7, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| us:v5 | cand:h42 | 4 | 4-0 | 100% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| us:v4 | cand:h6 | 40 | 21-19 | 52% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 27 | 25-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 30 | 30-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
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
