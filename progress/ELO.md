# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 08:33 PDT.

1443 games: 851 local (VM batches between our builds, candidates, sparring partners and the starter bot), 211 of ours on the galaxy replica and 381 between field bots there (381 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 62 players; compare them only within this fit.

**Thin field.** 26 rated field bots (StoneT2000.BC19-bot1v43, uvafan.bc2019, StoneT2000.BC19-botfinalsafe, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, Tom-CCS.BC19, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, Nydroam.BatteredCod, vishwasns99.BC_2019, SethKitchen.examplefuncsplayer, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~fb22c7, TestSubjector.BattleCode2~e6de74, DivyanshuSaxena.Battlecode, bc19-starter, TheRobotCarlson.battlehac~323871, RyanSharafuddin.Battlecode_2019, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (26), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1452 ± 256 | 38 of 62 | 38 | 33-5 | 71.1% | 26.2% (vs 7) |
| v1 | accepted | 1298 ± 188 | 46 of 62 | 154 | 128-26 | 60.5% | 21.5% (vs 10) |
| v2 | accepted | 1339 ± 177 | 43 of 62 | 62 | 30-32 | 63.4% | 25.2% (vs 10) |
| v3 | accepted | 1537 ± 142 | 29 of 62 | 191 | 140-51 | 76.3% | 20.3% (vs 4) |
| v4 | accepted | 1503 ± 138 | 34 of 62 | 220 | 83-137 | 74.3% | 27.5% (vs 6) |
| v5 | accepted | 1789 ± 147 | 10 of 62 | 384 | 177-207 | 88.4% | 32.5% (vs 2) |
| v6 | accepted | 1906 ± 167 | 4 of 62 | 80 | 53-27 | 92.2% | 32.3% (vs 1) |
| h11c | candidate | 1594 ± 195 | 27 of 62 | 25 | 15-10 | 79.5% | 25.5% (vs 4) |
| h16r | candidate | 1433 ± 175 | 39 of 62 | 40 | 16-24 | 69.8% | 24.3% (vs 7) |
| h18 | candidate | 1326 ± 209 | 44 of 62 | 25 | 6-19 | 62.5% | 24.0% (vs 10) |
| h2 | candidate | 1488 ± 180 | 35 of 62 | 54 | 25-29 | 73.4% | 26.0% (vs 6) |
| h24 | candidate | 1610 ± 177 | 26 of 62 | 40 | 26-14 | 80.4% | 27.1% (vs 4) |
| h24v5 | candidate | 1840 ± 181 | 7 of 62 | 40 | 23-17 | 90.2% | 24.7% (vs 1) |
| h3 | candidate | 1470 ± 235 | 37 of 62 | 19 | 9-10 | 72.2% | 27.9% (vs 7) |
| h31 | candidate | 1591 ± 176 | 28 of 62 | 40 | 25-15 | 79.4% | 25.2% (vs 4) |
| h38 | candidate | 1619 ± 315 | 24 of 62 | 6 | 4-2 | 80.8% | 20.4% (vs 3) |
| h40 | candidate | 1688 ± 300 | 23 of 62 | 8 | 6-2 | 84.2% | 27.2% (vs 3) |
| h41 | candidate | 1696 ± 283 | 19 of 62 | 8 | 3-5 | 84.5% | 28.0% (vs 3) |
| h42 | candidate | 1696 ± 283 | 20 of 62 | 8 | 3-5 | 84.5% | 28.0% (vs 3) |
| h43 | candidate | 1783 ± 276 | 11 of 62 | 8 | 4-4 | 88.1% | 31.9% (vs 2) |
| h44 | candidate | 1970 ± 306 | 2 of 62 | 8 | 6-2 | 93.8% | 40.9% (vs 1) |
| h46 | candidate | 1696 ± 283 | 21 of 62 | 8 | 3-5 | 84.5% | 28.0% (vs 3) |
| h47 | candidate | 1783 ± 276 | 12 of 62 | 8 | 4-4 | 88.1% | 31.9% (vs 2) |
| h48 | candidate | 1783 ± 276 | 13 of 62 | 8 | 4-4 | 88.1% | 31.9% (vs 2) |
| h49 | candidate | 1783 ± 276 | 14 of 62 | 8 | 4-4 | 88.1% | 31.9% (vs 2) |
| h52 | candidate | 1696 ± 283 | 22 of 62 | 8 | 3-5 | 84.5% | 28.0% (vs 3) |
| h53 | candidate | 1871 ± 283 | 5 of 62 | 8 | 5-3 | 91.1% | 28.1% (vs 1) |
| h54 | candidate | 1861 ± 177 | 6 of 62 | 48 | 29-19 | 90.8% | 27.0% (vs 1) |
| h55 | candidate | 1831 ± 175 | 8 of 62 | 56 | 32-24 | 89.8% | 23.7% (vs 1) |
| h58 | candidate | 1737 ± 298 | 18 of 62 | 8 | 3-5 | 86.3% | 32.7% (vs 3) |
| h59 | candidate | 1783 ± 276 | 15 of 62 | 8 | 4-4 | 88.1% | 31.9% (vs 2) |
| h6 | candidate | 1524 ± 140 | 31 of 62 | 158 | 94-64 | 75.6% | 25.1% (vs 5) |
| h60 | candidate | 1783 ± 276 | 16 of 62 | 8 | 4-4 | 88.1% | 31.9% (vs 2) |
| h7 | candidate | 1523 ± 1429 | 32 of 62 | 8 | 8-0 | 75.5% | 25.0% (vs 5) |
| h8v5 | candidate | 1960 ± 208 | 3 of 62 | 26 | 19-7 | 93.6% | 39.4% (vs 1) |
| rush | sparring | 1326 ± 209 | 45 of 62 | 25 | 6-19 | 62.5% | 24.0% (vs 10) |

Sources (`tools/progress/games.py`):

- local: 851 games from 45 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 592 games (11 archive games skipped, 60 matches from archives, 127 matches from scores), fetched 2026-10-22T15:44:08+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-bot1v43 | field | 2034 | 362 | 21 | 20-1 | 0% (v5 0-3) |
| 2 | **cand:h44** | candidate | 1970 | 306 | 8 | 6-2 |  |
| 3 | **cand:h8v5** | candidate | 1960 | 208 | 26 | 19-7 |  |
| 4 | **us:v6** | accepted | 1906 | 167 | 80 | 53-27 |  |
| 5 | **cand:h53** | candidate | 1871 | 283 | 8 | 5-3 |  |
| 6 | **cand:h54** | candidate | 1861 | 177 | 48 | 29-19 |  |
| 7 | **cand:h24v5** | candidate | 1840 | 181 | 40 | 23-17 |  |
| 8 | **cand:h55** | candidate | 1831 | 175 | 56 | 32-24 |  |
| 9 | uvafan.bc2019 | field | 1821 | 1650 | 3 | 3-0 |  |
| 10 | **us:v5** | accepted | 1789 | 147 | 384 | 177-207 |  |
| 11 | **cand:h43** | candidate | 1783 | 276 | 8 | 4-4 |  |
| 12 | **cand:h47** | candidate | 1783 | 276 | 8 | 4-4 |  |
| 13 | **cand:h48** | candidate | 1783 | 276 | 8 | 4-4 |  |
| 14 | **cand:h49** | candidate | 1783 | 276 | 8 | 4-4 |  |
| 15 | **cand:h59** | candidate | 1783 | 276 | 8 | 4-4 |  |
| 16 | **cand:h60** | candidate | 1783 | 276 | 8 | 4-4 |  |
| 17 | StoneT2000.BC19-botfinalsafe | field | 1774 | 253 | 21 | 18-3 | 67% (v5 2-1) |
| 18 | **cand:h58** | candidate | 1737 | 298 | 8 | 3-5 |  |
| 19 | **cand:h41** | candidate | 1696 | 283 | 8 | 3-5 |  |
| 20 | **cand:h42** | candidate | 1696 | 283 | 8 | 3-5 |  |
| 21 | **cand:h46** | candidate | 1696 | 283 | 8 | 3-5 |  |
| 22 | **cand:h52** | candidate | 1696 | 283 | 8 | 3-5 |  |
| 23 | **cand:h40** | candidate | 1688 | 300 | 8 | 6-2 |  |
| 24 | **cand:h38** | candidate | 1619 | 315 | 6 | 4-2 |  |
| 25 | IanCoolidge0.battlecode20~69ce88 | field | 1613 | 422 | 15 | 13-2 |  |
| 26 | **cand:h24** | candidate | 1610 | 177 | 40 | 26-14 |  |
| 27 | **cand:h11c** | candidate | 1594 | 195 | 25 | 15-10 |  |
| 28 | **cand:h31** | candidate | 1591 | 176 | 40 | 25-15 |  |
| 29 | **us:v3** | accepted | 1537 | 142 | 191 | 140-51 |  |
| 30 | IvanGeffner.BC19-bot6b | field | 1533 | 508 | 6 | 4-2 |  |
| 31 | **cand:h6** | candidate | 1524 | 140 | 158 | 94-64 |  |
| 32 | **cand:h7** | candidate | 1523 | 1429 | 8 | 8-0 |  |
| 33 | Tom-CCS.BC19 | field | 1508 | 646 | 12 | 9-3 |  |
| 34 | **us:v4** | accepted | 1503 | 138 | 220 | 83-137 |  |
| 35 | **cand:h2** | candidate | 1488 | 180 | 54 | 25-29 |  |
| 36 | IanCoolidge0.battlecode20~f649f3 | field | 1475 | 241 | 21 | 15-6 | 67% (v3 2-1) |
| 37 | **cand:h3** | candidate | 1470 | 235 | 19 | 9-10 |  |
| 38 | **us:v0** | accepted | 1452 | 256 | 38 | 33-5 |  |
| 39 | **cand:h16r** | candidate | 1433 | 175 | 40 | 16-24 |  |
| 40 | IvanGeffner.BC19-eigthbot | field | 1397 | 334 | 9 | 6-3 |  |
| 41 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1376 | 288 | 15 | 5-10 |  |
| 42 | NielsKornerup.Battlecode-2019 | field | 1340 | 340 | 12 | 8-4 |  |
| 43 | **us:v2** | accepted | 1339 | 177 | 62 | 30-32 |  |
| 44 | **cand:h18** | candidate | 1326 | 209 | 25 | 6-19 |  |
| 45 | **spar:rush** | sparring | 1326 | 209 | 25 | 6-19 |  |
| 46 | **us:v1** | accepted | 1298 | 188 | 154 | 128-26 |  |
| 47 | Nydroam.BatteredCod | field | 1202 | 451 | 6 | 3-3 |  |
| 48 | vishwasns99.BC_2019 | field | 1179 | 1650 | 3 | 0-3 |  |
| 49 | SethKitchen.examplefuncsplayer | field | 1169 | 660 | 12 | 8-4 |  |
| 50 | JasonLarson44.2019-Battle~1c7639 | field | 1096 | 330 | 12 | 5-7 | 100% (v3 3-0) |
| 51 | 18dcb01.Battlecode19-robot2 | field | 1087 | 381 | 15 | 3-12 |  |
| 52 | CS554-software-engineerin~a575dc | field | 1086 | 169 | 212 | 130-82 | 93% (v3 28-2) |
| 53 | CometsTech.battlecode2019 | field | 1075 | 171 | 171 | 89-82 | 100% (v3 33-0) |
| 54 | OmarTahoun.battle-code | field | 1044 | 647 | 12 | 7-5 |  |
| 55 | CometsTech.battlecode2019~187e8c | field | 985 | 474 | 9 | 1-8 |  |
| 56 | TestSubjector.BattleCode2~fb22c7 | field | 979 | 486 | 12 | 7-5 |  |
| 57 | TestSubjector.BattleCode2~e6de74 | field | 600 | 517 | 12 | 5-7 |  |
| 58 | DivyanshuSaxena.Battlecode | field | 310 | 453 | 12 | 2-10 |  |
| 59 | bc19-starter | field | 289 | 312 | 307 | 45-262 | 100% (v3 12-0) |
| 60 | TheRobotCarlson.battlehac~323871 | field | 264 | 1142 | 12 | 0-12 |  |
| 61 | RyanSharafuddin.Battlecode_2019 | field | 264 | 1142 | 12 | 0-12 |  |
| 62 | ArtemUstilov.bc19_CrazyTapok | field | -761 | 1105 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-bot1v43 | us:v5 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h8v5 | us:v5 | 26 | 19-7 | 73% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h49 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h59 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h60 | 8 | 4-4 | 50% | local |
| us:v5 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h52 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
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
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
