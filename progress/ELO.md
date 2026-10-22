# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 01:59 PDT.

1069 games: 555 local (VM batches between our builds, candidates, sparring partners and the starter bot), 193 of ours on the galaxy replica and 321 between field bots there (321 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 48 players; compare them only within this fit.

**Thin field.** 23 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-eigthbot, IvanGeffner.BC19-bot6b, SethKitchen.examplefuncsplayer, TestSubjector.BattleCode2~fb22c7, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, Nydroam.BatteredCod, 18dcb01.Battlecode19-prea~fb5c48, 18dcb01.Battlecode19-robot2, CometsTech.battlecode2019~187e8c, NielsKornerup.Battlecode-2019, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~e6de74, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (23), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1487 ± 259 | 29 of 48 | 38 | 33-5 | 67.7% | 34.3% (vs 8) |
| v1 | accepted | 1333 ± 193 | 35 of 48 | 154 | 128-26 | 54.7% | 22.5% (vs 10) |
| v2 | accepted | 1380 ± 182 | 34 of 48 | 62 | 30-32 | 58.8% | 27.2% (vs 10) |
| v3 | accepted | 1582 ± 151 | 19 of 48 | 185 | 134-51 | 75.0% | 26.8% (vs 3) |
| v4 | accepted | 1596 ± 166 | 17 of 48 | 214 | 83-131 | 76.0% | 28.1% (vs 3) |
| v5 | accepted | 1910 ± 204 | 3 of 48 | 90 | 61-29 | 91.3% | 16.6% (vs 1) |
| h11c | candidate | 1663 ± 206 | 15 of 48 | 25 | 15-10 | 80.4% | 23.3% (vs 2) |
| h16r | candidate | 1525 ± 197 | 23 of 48 | 40 | 16-24 | 70.8% | 31.7% (vs 5) |
| h18 | candidate | 1395 ± 219 | 32 of 48 | 25 | 6-19 | 60.0% | 28.7% (vs 10) |
| h2 | candidate | 1532 ± 186 | 21 of 48 | 54 | 25-29 | 71.3% | 27.9% (vs 4) |
| h24 | candidate | 1702 ± 199 | 13 of 48 | 40 | 26-14 | 82.7% | 26.6% (vs 2) |
| h3 | candidate | 1513 ± 239 | 28 of 48 | 19 | 9-10 | 69.8% | 37.5% (vs 8) |
| h31 | candidate | 1683 ± 198 | 14 of 48 | 40 | 25-15 | 81.7% | 25.0% (vs 2) |
| h38 | candidate | 1709 ± 326 | 12 of 48 | 6 | 4-2 | 83.1% | 27.2% (vs 2) |
| h40 | candidate | 1779 ± 313 | 10 of 48 | 8 | 6-2 | 86.6% | 8.6% (vs 1) |
| h41 | candidate | 1814 ± 316 | 7 of 48 | 8 | 3-5 | 88.1% | 10.3% (vs 1) |
| h42 | candidate | 1814 ± 316 | 8 of 48 | 8 | 3-5 | 88.1% | 10.3% (vs 1) |
| h43 | candidate | 1903 ± 310 | 4 of 48 | 8 | 4-4 | 91.1% | 16.1% (vs 1) |
| h44 | candidate | 2090 ± 336 | 2 of 48 | 8 | 6-2 | 95.3% | 36.0% (vs 1) |
| h46 | candidate | 1814 ± 316 | 9 of 48 | 8 | 3-5 | 88.1% | 10.3% (vs 1) |
| h47 | candidate | 1903 ± 310 | 5 of 48 | 8 | 4-4 | 91.1% | 16.1% (vs 1) |
| h48 | candidate | 1882 ± 505 | 6 of 48 | 2 | 1-1 | 90.5% | 14.5% (vs 1) |
| h6 | candidate | 1594 ± 156 | 18 of 48 | 158 | 94-64 | 75.9% | 27.9% (vs 3) |
| h7 | candidate | 1524 ± 1422 | 24 of 48 | 8 | 8-0 | 70.7% | 31.7% (vs 5) |
| rush | sparring | 1395 ± 219 | 33 of 48 | 25 | 6-19 | 60.0% | 28.7% (vs 10) |

Sources (`tools/progress/games.py`):

- local: 555 games from 29 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 514 games (11 archive games skipped, 54 matches from archives, 107 matches from scores), fetched 2026-10-22T09:01:39+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-botfinalsafe | field | 2190 | 1078 | 9 | 9-0 | 0% (v3 0-3) |
| 2 | **cand:h44** | candidate | 2090 | 336 | 8 | 6-2 |  |
| 3 | **us:v5** | accepted | 1910 | 204 | 90 | 61-29 |  |
| 4 | **cand:h43** | candidate | 1903 | 310 | 8 | 4-4 |  |
| 5 | **cand:h47** | candidate | 1903 | 310 | 8 | 4-4 |  |
| 6 | **cand:h48** | candidate | 1882 | 505 | 2 | 1-1 |  |
| 7 | **cand:h41** | candidate | 1814 | 316 | 8 | 3-5 |  |
| 8 | **cand:h42** | candidate | 1814 | 316 | 8 | 3-5 |  |
| 9 | **cand:h46** | candidate | 1814 | 316 | 8 | 3-5 |  |
| 10 | **cand:h40** | candidate | 1779 | 313 | 8 | 6-2 |  |
| 11 | StoneT2000.BC19-bot1v43 | field | 1719 | 410 | 6 | 5-1 | 33% (v3 1-2) |
| 12 | **cand:h38** | candidate | 1709 | 326 | 6 | 4-2 |  |
| 13 | **cand:h24** | candidate | 1702 | 199 | 40 | 26-14 |  |
| 14 | **cand:h31** | candidate | 1683 | 198 | 40 | 25-15 |  |
| 15 | **cand:h11c** | candidate | 1663 | 206 | 25 | 15-10 |  |
| 16 | IanCoolidge0.battlecode20~69ce88 | field | 1608 | 420 | 12 | 10-2 |  |
| 17 | **us:v4** | accepted | 1596 | 166 | 214 | 83-131 |  |
| 18 | **cand:h6** | candidate | 1594 | 156 | 158 | 94-64 |  |
| 19 | **us:v3** | accepted | 1582 | 151 | 185 | 134-51 |  |
| 20 | IvanGeffner.BC19-eigthbot | field | 1566 | 534 | 6 | 5-1 |  |
| 21 | **cand:h2** | candidate | 1532 | 186 | 54 | 25-29 |  |
| 22 | IvanGeffner.BC19-bot6b | field | 1528 | 527 | 6 | 4-2 |  |
| 23 | **cand:h16r** | candidate | 1525 | 197 | 40 | 16-24 |  |
| 24 | **cand:h7** | candidate | 1524 | 1422 | 8 | 8-0 |  |
| 25 | SethKitchen.examplefuncsplayer | field | 1519 | 1444 | 3 | 3-0 |  |
| 26 | TestSubjector.BattleCode2~fb22c7 | field | 1519 | 1444 | 3 | 3-0 |  |
| 27 | Tom-CCS.BC19 | field | 1519 | 1444 | 3 | 3-0 |  |
| 28 | **cand:h3** | candidate | 1513 | 239 | 19 | 9-10 |  |
| 29 | **us:v0** | accepted | 1487 | 259 | 38 | 33-5 |  |
| 30 | IanCoolidge0.battlecode20~f649f3 | field | 1447 | 282 | 15 | 10-5 | 67% (v3 2-1) |
| 31 | Nydroam.BatteredCod | field | 1395 | 544 | 6 | 3-3 |  |
| 32 | **cand:h18** | candidate | 1395 | 219 | 25 | 6-19 |  |
| 33 | **spar:rush** | sparring | 1395 | 219 | 25 | 6-19 |  |
| 34 | **us:v2** | accepted | 1380 | 182 | 62 | 30-32 |  |
| 35 | **us:v1** | accepted | 1333 | 193 | 154 | 128-26 |  |
| 36 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1302 | 324 | 9 | 4-5 |  |
| 37 | 18dcb01.Battlecode19-robot2 | field | 1249 | 427 | 6 | 1-5 |  |
| 38 | CometsTech.battlecode2019~187e8c | field | 1215 | 549 | 6 | 1-5 |  |
| 39 | NielsKornerup.Battlecode-2019 | field | 1192 | 374 | 6 | 2-4 |  |
| 40 | JasonLarson44.2019-Battle~1c7639 | field | 1190 | 360 | 9 | 5-4 | 100% (v3 3-0) |
| 41 | TestSubjector.BattleCode2~e6de74 | field | 1166 | 851 | 9 | 3-6 |  |
| 42 | CS554-software-engineerin~a575dc | field | 1116 | 176 | 209 | 130-79 | 93% (v3 25-2) |
| 43 | CometsTech.battlecode2019 | field | 1111 | 178 | 168 | 89-79 | 100% (v3 30-0) |
| 44 | OmarTahoun.battle-code | field | 1040 | 883 | 6 | 3-3 |  |
| 45 | DivyanshuSaxena.Battlecode | field | 468 | 1167 | 6 | 0-6 |  |
| 46 | TheRobotCarlson.battlehac~323871 | field | 422 | 1301 | 12 | 0-12 |  |
| 47 | bc19-starter | field | 300 | 341 | 301 | 43-258 | 100% (v3 12-0) |
| 48 | ArtemUstilov.bc19_CrazyTapok | field | -750 | 1108 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 2 | 1-1 | 50% | local |
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
| us:v4 | cand:h6 | 40 | 21-19 | 52% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
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
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
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
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
