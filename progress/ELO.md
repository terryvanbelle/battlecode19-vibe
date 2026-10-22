# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 08:46 PDT.

1454 games: 853 local (VM batches between our builds, candidates, sparring partners and the starter bot), 217 of ours on the galaxy replica and 384 between field bots there (384 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 62 players; compare them only within this fit.

**Thin field.** 26 rated field bots (StoneT2000.BC19-bot1v43, StoneT2000.BC19-botfinalsafe, uvafan.bc2019, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, SethKitchen.examplefuncsplayer, Nydroam.BatteredCod, vishwasns99.BC_2019, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, OmarTahoun.battle-code, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, TestSubjector.BattleCode2~fb22c7, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~e6de74, DivyanshuSaxena.Battlecode, bc19-starter, TheRobotCarlson.battlehac~323871, RyanSharafuddin.Battlecode_2019, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (26), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1459 ± 256 | 38 of 62 | 38 | 33-5 | 70.4% | 24.4% (vs 7) |
| v1 | accepted | 1306 ± 188 | 46 of 62 | 154 | 128-26 | 59.8% | 20.6% (vs 10) |
| v2 | accepted | 1346 ± 177 | 43 of 62 | 62 | 30-32 | 62.7% | 24.2% (vs 10) |
| v3 | accepted | 1544 ± 143 | 30 of 62 | 191 | 140-51 | 75.5% | 23.1% (vs 5) |
| v4 | accepted | 1498 ± 138 | 34 of 62 | 220 | 83-137 | 72.8% | 24.2% (vs 6) |
| v5 | accepted | 1767 ± 143 | 11 of 62 | 386 | 178-208 | 86.4% | 30.9% (vs 3) |
| v6 | accepted | 1871 ± 159 | 5 of 62 | 86 | 54-32 | 90.2% | 37.9% (vs 2) |
| h11c | candidate | 1594 ± 195 | 27 of 62 | 25 | 15-10 | 78.3% | 21.8% (vs 4) |
| h16r | candidate | 1428 ± 175 | 39 of 62 | 40 | 16-24 | 68.3% | 21.6% (vs 7) |
| h18 | candidate | 1326 ± 209 | 44 of 62 | 25 | 6-19 | 61.3% | 22.4% (vs 10) |
| h2 | candidate | 1494 ± 180 | 35 of 62 | 54 | 25-29 | 72.5% | 23.8% (vs 6) |
| h24 | candidate | 1605 ± 177 | 26 of 62 | 40 | 26-14 | 78.9% | 22.8% (vs 4) |
| h24v5 | candidate | 1818 ± 179 | 9 of 62 | 40 | 23-17 | 88.3% | 37.3% (vs 3) |
| h3 | candidate | 1476 ± 235 | 37 of 62 | 19 | 9-10 | 71.4% | 26.0% (vs 7) |
| h31 | candidate | 1586 ± 176 | 28 of 62 | 40 | 25-15 | 77.9% | 21.1% (vs 4) |
| h38 | candidate | 1614 ± 315 | 25 of 62 | 6 | 4-2 | 79.4% | 23.6% (vs 4) |
| h40 | candidate | 1683 ± 300 | 19 of 62 | 8 | 6-2 | 82.8% | 22.0% (vs 3) |
| h41 | candidate | 1674 ± 281 | 20 of 62 | 8 | 3-5 | 82.3% | 21.1% (vs 3) |
| h42 | candidate | 1674 ± 281 | 21 of 62 | 8 | 3-5 | 82.3% | 21.1% (vs 3) |
| h43 | candidate | 1761 ± 275 | 12 of 62 | 8 | 4-4 | 86.2% | 30.3% (vs 3) |
| h44 | candidate | 1948 ± 304 | 2 of 62 | 8 | 6-2 | 92.5% | 40.9% (vs 1) |
| h46 | candidate | 1674 ± 281 | 22 of 62 | 8 | 3-5 | 82.3% | 21.1% (vs 3) |
| h47 | candidate | 1761 ± 275 | 13 of 62 | 8 | 4-4 | 86.2% | 30.3% (vs 3) |
| h48 | candidate | 1761 ± 275 | 14 of 62 | 8 | 4-4 | 86.2% | 30.3% (vs 3) |
| h49 | candidate | 1761 ± 275 | 15 of 62 | 8 | 4-4 | 86.2% | 30.3% (vs 3) |
| h52 | candidate | 1674 ± 281 | 23 of 62 | 8 | 3-5 | 82.3% | 21.1% (vs 3) |
| h53 | candidate | 1848 ± 281 | 6 of 62 | 8 | 5-3 | 89.4% | 34.9% (vs 2) |
| h54 | candidate | 1839 ± 174 | 7 of 62 | 48 | 29-19 | 89.1% | 33.7% (vs 2) |
| h55 | candidate | 1809 ± 172 | 10 of 62 | 56 | 32-24 | 88.0% | 36.1% (vs 3) |
| h58 | candidate | 1715 ± 296 | 18 of 62 | 8 | 3-5 | 84.2% | 25.1% (vs 3) |
| h59 | candidate | 1761 ± 275 | 16 of 62 | 8 | 4-4 | 86.2% | 30.3% (vs 3) |
| h6 | candidate | 1525 ± 140 | 31 of 62 | 158 | 94-64 | 74.4% | 21.4% (vs 5) |
| h60 | candidate | 1761 ± 275 | 17 of 62 | 8 | 4-4 | 86.2% | 30.3% (vs 3) |
| h7 | candidate | 1524 ± 1426 | 32 of 62 | 8 | 8-0 | 74.3% | 21.4% (vs 5) |
| h8v5 | candidate | 1923 ± 200 | 3 of 62 | 28 | 20-8 | 91.8% | 37.5% (vs 1) |
| rush | sparring | 1326 ± 209 | 45 of 62 | 25 | 6-19 | 61.3% | 22.4% (vs 10) |

Sources (`tools/progress/games.py`):

- local: 853 games from 45 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 601 games (11 archive games skipped, 62 matches from archives, 128 matches from scores), fetched 2026-10-22T15:50:44+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-bot1v43 | field | 2012 | 285 | 24 | 22-2 | 33% (v6 1-2) |
| 2 | **cand:h44** | candidate | 1948 | 304 | 8 | 6-2 |  |
| 3 | **cand:h8v5** | candidate | 1923 | 200 | 28 | 20-8 |  |
| 4 | StoneT2000.BC19-botfinalsafe | field | 1906 | 253 | 24 | 21-3 | 0% (v6 0-3) |
| 5 | **us:v6** | accepted | 1871 | 159 | 86 | 54-32 |  |
| 6 | **cand:h53** | candidate | 1848 | 281 | 8 | 5-3 |  |
| 7 | **cand:h54** | candidate | 1839 | 174 | 48 | 29-19 |  |
| 8 | uvafan.bc2019 | field | 1821 | 1649 | 3 | 3-0 |  |
| 9 | **cand:h24v5** | candidate | 1818 | 179 | 40 | 23-17 |  |
| 10 | **cand:h55** | candidate | 1809 | 172 | 56 | 32-24 |  |
| 11 | **us:v5** | accepted | 1767 | 143 | 386 | 178-208 |  |
| 12 | **cand:h43** | candidate | 1761 | 275 | 8 | 4-4 |  |
| 13 | **cand:h47** | candidate | 1761 | 275 | 8 | 4-4 |  |
| 14 | **cand:h48** | candidate | 1761 | 275 | 8 | 4-4 |  |
| 15 | **cand:h49** | candidate | 1761 | 275 | 8 | 4-4 |  |
| 16 | **cand:h59** | candidate | 1761 | 275 | 8 | 4-4 |  |
| 17 | **cand:h60** | candidate | 1761 | 275 | 8 | 4-4 |  |
| 18 | **cand:h58** | candidate | 1715 | 296 | 8 | 3-5 |  |
| 19 | **cand:h40** | candidate | 1683 | 300 | 8 | 6-2 |  |
| 20 | **cand:h41** | candidate | 1674 | 281 | 8 | 3-5 |  |
| 21 | **cand:h42** | candidate | 1674 | 281 | 8 | 3-5 |  |
| 22 | **cand:h46** | candidate | 1674 | 281 | 8 | 3-5 |  |
| 23 | **cand:h52** | candidate | 1674 | 281 | 8 | 3-5 |  |
| 24 | IanCoolidge0.battlecode20~69ce88 | field | 1640 | 424 | 15 | 13-2 |  |
| 25 | **cand:h38** | candidate | 1614 | 315 | 6 | 4-2 |  |
| 26 | **cand:h24** | candidate | 1605 | 177 | 40 | 26-14 |  |
| 27 | **cand:h11c** | candidate | 1594 | 195 | 25 | 15-10 |  |
| 28 | **cand:h31** | candidate | 1586 | 176 | 40 | 25-15 |  |
| 29 | IvanGeffner.BC19-bot6b | field | 1580 | 485 | 9 | 7-2 |  |
| 30 | **us:v3** | accepted | 1544 | 143 | 191 | 140-51 |  |
| 31 | **cand:h6** | candidate | 1525 | 140 | 158 | 94-64 |  |
| 32 | **cand:h7** | candidate | 1524 | 1426 | 8 | 8-0 |  |
| 33 | Tom-CCS.BC19 | field | 1505 | 616 | 12 | 9-3 |  |
| 34 | **us:v4** | accepted | 1498 | 138 | 220 | 83-137 |  |
| 35 | **cand:h2** | candidate | 1494 | 180 | 54 | 25-29 |  |
| 36 | IanCoolidge0.battlecode20~f649f3 | field | 1488 | 243 | 21 | 15-6 | 67% (v3 2-1) |
| 37 | **cand:h3** | candidate | 1476 | 235 | 19 | 9-10 |  |
| 38 | **us:v0** | accepted | 1459 | 256 | 38 | 33-5 |  |
| 39 | **cand:h16r** | candidate | 1428 | 175 | 40 | 16-24 |  |
| 40 | IvanGeffner.BC19-eigthbot | field | 1403 | 334 | 9 | 6-3 |  |
| 41 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1397 | 295 | 15 | 5-10 |  |
| 42 | NielsKornerup.Battlecode-2019 | field | 1351 | 342 | 12 | 8-4 |  |
| 43 | **us:v2** | accepted | 1346 | 177 | 62 | 30-32 |  |
| 44 | **cand:h18** | candidate | 1326 | 209 | 25 | 6-19 |  |
| 45 | **spar:rush** | sparring | 1326 | 209 | 25 | 6-19 |  |
| 46 | **us:v1** | accepted | 1306 | 188 | 154 | 128-26 |  |
| 47 | SethKitchen.examplefuncsplayer | field | 1227 | 684 | 12 | 8-4 |  |
| 48 | Nydroam.BatteredCod | field | 1199 | 450 | 6 | 3-3 |  |
| 49 | vishwasns99.BC_2019 | field | 1179 | 1649 | 3 | 0-3 |  |
| 50 | JasonLarson44.2019-Battle~1c7639 | field | 1104 | 331 | 12 | 5-7 | 100% (v3 3-0) |
| 51 | 18dcb01.Battlecode19-robot2 | field | 1102 | 379 | 15 | 3-12 |  |
| 52 | OmarTahoun.battle-code | field | 1098 | 656 | 12 | 7-5 |  |
| 53 | CS554-software-engineerin~a575dc | field | 1094 | 170 | 212 | 130-82 | 93% (v3 28-2) |
| 54 | CometsTech.battlecode2019 | field | 1083 | 171 | 171 | 89-82 | 100% (v3 33-0) |
| 55 | TestSubjector.BattleCode2~fb22c7 | field | 993 | 481 | 12 | 7-5 |  |
| 56 | CometsTech.battlecode2019~187e8c | field | 971 | 465 | 12 | 1-11 |  |
| 57 | TestSubjector.BattleCode2~e6de74 | field | 609 | 518 | 12 | 5-7 |  |
| 58 | DivyanshuSaxena.Battlecode | field | 319 | 453 | 12 | 2-10 |  |
| 59 | bc19-starter | field | 297 | 312 | 307 | 45-262 | 100% (v3 12-0) |
| 60 | TheRobotCarlson.battlehac~323871 | field | 296 | 1140 | 12 | 0-12 |  |
| 61 | RyanSharafuddin.Battlecode_2019 | field | 296 | 1140 | 12 | 0-12 |  |
| 62 | ArtemUstilov.bc19_CrazyTapok | field | -753 | 1105 | 81 | 0-81 |  |

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
| cand:h8v5 | us:v5 | 28 | 20-8 | 71% | local |
| StoneT2000.BC19-botfinalsafe | us:v6 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
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
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
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
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
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
