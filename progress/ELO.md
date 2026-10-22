# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 05:43 PDT.

1302 games: 737 local (VM batches between our builds, candidates, sparring partners and the starter bot), 199 of ours on the galaxy replica and 366 between field bots there (366 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 58 players; compare them only within this fit.

**Thin field.** 24 rated field bots (StoneT2000.BC19-botfinalsafe, Tom-CCS.BC19, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, Nydroam.BatteredCod, SethKitchen.examplefuncsplayer, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, TestSubjector.BattleCode2~fb22c7, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~e6de74, DivyanshuSaxena.Battlecode, bc19-starter, RyanSharafuddin.Battlecode_2019, TheRobotCarlson.battlehac~323871, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (24), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1455 ± 251 | 35 of 58 | 38 | 33-5 | 73.2% | 25.0% (vs 5) |
| v1 | accepted | 1301 ± 182 | 43 of 58 | 154 | 128-26 | 62.3% | 23.6% (vs 9) |
| v2 | accepted | 1341 ± 171 | 42 of 58 | 62 | 30-32 | 65.2% | 27.5% (vs 9) |
| v3 | accepted | 1538 ± 135 | 29 of 58 | 191 | 140-51 | 78.5% | 34.5% (vs 5) |
| v4 | accepted | 1534 ± 140 | 30 of 58 | 214 | 83-131 | 78.2% | 34.0% (vs 5) |
| v5 | accepted | 1828 ± 162 | 6 of 58 | 264 | 133-131 | 92.4% | - |
| h11c | candidate | 1611 ± 191 | 26 of 58 | 25 | 15-10 | 82.7% | 39.9% (vs 4) |
| h16r | candidate | 1464 ± 176 | 34 of 58 | 40 | 16-24 | 73.7% | 25.9% (vs 5) |
| h18 | candidate | 1342 ± 205 | 41 of 58 | 25 | 6-19 | 65.3% | 27.6% (vs 9) |
| h2 | candidate | 1488 ± 174 | 32 of 58 | 54 | 25-29 | 75.3% | 28.5% (vs 5) |
| h24 | candidate | 1641 ± 178 | 23 of 58 | 40 | 26-14 | 84.3% | 41.1% (vs 3) |
| h24v5 | candidate | 1803 ± 488 | 12 of 58 | 2 | 1-1 | 91.5% | - |
| h3 | candidate | 1470 ± 231 | 33 of 58 | 19 | 9-10 | 74.2% | 26.5% (vs 5) |
| h31 | candidate | 1622 ± 177 | 24 of 58 | 40 | 25-15 | 83.3% | 38.5% (vs 3) |
| h38 | candidate | 1649 ± 315 | 22 of 58 | 6 | 4-2 | 84.8% | 42.2% (vs 3) |
| h40 | candidate | 1719 ± 301 | 19 of 58 | 8 | 6-2 | 88.1% | 44.7% (vs 1) |
| h41 | candidate | 1734 ± 291 | 15 of 58 | 8 | 3-5 | 88.8% | 46.9% (vs 1) |
| h42 | candidate | 1734 ± 291 | 16 of 58 | 8 | 3-5 | 88.8% | 46.9% (vs 1) |
| h43 | candidate | 1822 ± 285 | 7 of 58 | 8 | 4-4 | 92.2% | - |
| h44 | candidate | 2009 ± 313 | 1 of 58 | 8 | 6-2 | 96.8% | - |
| h46 | candidate | 1734 ± 291 | 17 of 58 | 8 | 3-5 | 88.8% | 46.9% (vs 1) |
| h47 | candidate | 1822 ± 285 | 8 of 58 | 8 | 4-4 | 92.2% | - |
| h48 | candidate | 1822 ± 285 | 9 of 58 | 8 | 4-4 | 92.2% | - |
| h49 | candidate | 1822 ± 285 | 10 of 58 | 8 | 4-4 | 92.2% | - |
| h50 | candidate | 1953 ± 197 | 2 of 58 | 40 | 27-13 | 95.7% | - |
| h52 | candidate | 1734 ± 291 | 18 of 58 | 8 | 3-5 | 88.8% | 46.9% (vs 1) |
| h53 | candidate | 1909 ± 291 | 3 of 58 | 8 | 5-3 | 94.7% | - |
| h54 | candidate | 1900 ± 190 | 4 of 58 | 48 | 29-19 | 94.5% | - |
| h55 | candidate | 1869 ± 188 | 5 of 58 | 56 | 32-24 | 93.7% | - |
| h58 | candidate | 1775 ± 306 | 13 of 58 | 8 | 3-5 | 90.5% | - |
| h59 | candidate | 1820 ± 315 | 11 of 58 | 6 | 3-3 | 92.1% | - |
| h6 | candidate | 1541 ± 135 | 27 of 58 | 158 | 94-64 | 78.7% | 31.0% (vs 4) |
| h7 | candidate | 1523 ± 1427 | 31 of 58 | 8 | 8-0 | 77.6% | 32.7% (vs 5) |
| rush | sparring | 1342 ± 205 | 40 of 58 | 25 | 6-19 | 65.3% | 27.6% (vs 9) |

Sources (`tools/progress/games.py`):

- local: 737 games from 40 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 565 games (11 archive games skipped, 56 matches from archives, 122 matches from scores), fetched 2026-10-22T12:45:55+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h44** | candidate | 2009 | 313 | 8 | 6-2 |  |
| 2 | **cand:h50** | candidate | 1953 | 197 | 40 | 27-13 |  |
| 3 | **cand:h53** | candidate | 1909 | 291 | 8 | 5-3 |  |
| 4 | **cand:h54** | candidate | 1900 | 190 | 48 | 29-19 |  |
| 5 | **cand:h55** | candidate | 1869 | 188 | 56 | 32-24 |  |
| 6 | **us:v5** | accepted | 1828 | 162 | 264 | 133-131 |  |
| 7 | **cand:h43** | candidate | 1822 | 285 | 8 | 4-4 |  |
| 8 | **cand:h47** | candidate | 1822 | 285 | 8 | 4-4 |  |
| 9 | **cand:h48** | candidate | 1822 | 285 | 8 | 4-4 |  |
| 10 | **cand:h49** | candidate | 1822 | 285 | 8 | 4-4 |  |
| 11 | **cand:h59** | candidate | 1820 | 315 | 6 | 3-3 |  |
| 12 | **cand:h24v5** | candidate | 1803 | 488 | 2 | 1-1 |  |
| 13 | **cand:h58** | candidate | 1775 | 306 | 8 | 3-5 |  |
| 14 | StoneT2000.BC19-botfinalsafe | field | 1755 | 373 | 15 | 14-1 | 0% (v3 0-3) |
| 15 | **cand:h41** | candidate | 1734 | 291 | 8 | 3-5 |  |
| 16 | **cand:h42** | candidate | 1734 | 291 | 8 | 3-5 |  |
| 17 | **cand:h46** | candidate | 1734 | 291 | 8 | 3-5 |  |
| 18 | **cand:h52** | candidate | 1734 | 291 | 8 | 3-5 |  |
| 19 | **cand:h40** | candidate | 1719 | 301 | 8 | 6-2 |  |
| 20 | Tom-CCS.BC19 | field | 1709 | 1168 | 6 | 6-0 |  |
| 21 | StoneT2000.BC19-bot1v43 | field | 1650 | 413 | 9 | 8-1 | 33% (v3 1-2) |
| 22 | **cand:h38** | candidate | 1649 | 315 | 6 | 4-2 |  |
| 23 | **cand:h24** | candidate | 1641 | 178 | 40 | 26-14 |  |
| 24 | **cand:h31** | candidate | 1622 | 177 | 40 | 25-15 |  |
| 25 | IanCoolidge0.battlecode20~69ce88 | field | 1620 | 420 | 15 | 13-2 |  |
| 26 | **cand:h11c** | candidate | 1611 | 191 | 25 | 15-10 |  |
| 27 | **cand:h6** | candidate | 1541 | 135 | 158 | 94-64 |  |
| 28 | IvanGeffner.BC19-bot6b | field | 1539 | 506 | 6 | 4-2 |  |
| 29 | **us:v3** | accepted | 1538 | 135 | 191 | 140-51 |  |
| 30 | **us:v4** | accepted | 1534 | 140 | 214 | 83-131 |  |
| 31 | **cand:h7** | candidate | 1523 | 1427 | 8 | 8-0 |  |
| 32 | **cand:h2** | candidate | 1488 | 174 | 54 | 25-29 |  |
| 33 | **cand:h3** | candidate | 1470 | 231 | 19 | 9-10 |  |
| 34 | **cand:h16r** | candidate | 1464 | 176 | 40 | 16-24 |  |
| 35 | **us:v0** | accepted | 1455 | 251 | 38 | 33-5 |  |
| 36 | IanCoolidge0.battlecode20~f649f3 | field | 1455 | 247 | 18 | 12-6 | 67% (v3 2-1) |
| 37 | IvanGeffner.BC19-eigthbot | field | 1389 | 330 | 9 | 6-3 |  |
| 38 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1367 | 296 | 12 | 5-7 |  |
| 39 | NielsKornerup.Battlecode-2019 | field | 1346 | 337 | 12 | 8-4 |  |
| 40 | **spar:rush** | sparring | 1342 | 205 | 25 | 6-19 |  |
| 41 | **cand:h18** | candidate | 1342 | 205 | 25 | 6-19 |  |
| 42 | **us:v2** | accepted | 1341 | 171 | 62 | 30-32 |  |
| 43 | **us:v1** | accepted | 1301 | 182 | 154 | 128-26 |  |
| 44 | Nydroam.BatteredCod | field | 1198 | 448 | 6 | 3-3 |  |
| 45 | SethKitchen.examplefuncsplayer | field | 1171 | 655 | 12 | 8-4 |  |
| 46 | JasonLarson44.2019-Battle~1c7639 | field | 1152 | 359 | 9 | 5-4 | 100% (v3 3-0) |
| 47 | 18dcb01.Battlecode19-robot2 | field | 1099 | 379 | 15 | 3-12 |  |
| 48 | CS554-software-engineerin~a575dc | field | 1090 | 162 | 212 | 130-82 | 93% (v3 28-2) |
| 49 | CometsTech.battlecode2019 | field | 1080 | 164 | 171 | 89-82 | 100% (v3 33-0) |
| 50 | OmarTahoun.battle-code | field | 1048 | 643 | 12 | 7-5 |  |
| 51 | TestSubjector.BattleCode2~fb22c7 | field | 1010 | 505 | 12 | 7-5 |  |
| 52 | CometsTech.battlecode2019~187e8c | field | 985 | 473 | 9 | 1-8 |  |
| 53 | TestSubjector.BattleCode2~e6de74 | field | 603 | 510 | 12 | 5-7 |  |
| 54 | DivyanshuSaxena.Battlecode | field | 315 | 450 | 12 | 2-10 |  |
| 55 | bc19-starter | field | 293 | 307 | 307 | 45-262 | 100% (v3 12-0) |
| 56 | RyanSharafuddin.Battlecode_2019 | field | 284 | 1149 | 9 | 0-9 |  |
| 57 | TheRobotCarlson.battlehac~323871 | field | 283 | 1148 | 12 | 0-12 |  |
| 58 | ArtemUstilov.bc19_CrazyTapok | field | -757 | 1102 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h50 | us:v5 | 40 | 27-13 | 68% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h49 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h59 | 6 | 3-3 | 50% | local |
| us:v5 | cand:h24v5 | 2 | 1-1 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h52 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h6 | us:v3 | 35 | 19-16 | 54% | local |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
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
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
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
