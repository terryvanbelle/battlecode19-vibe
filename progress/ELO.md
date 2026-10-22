# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 04:37 PDT.

1218 games: 662 local (VM batches between our builds, candidates, sparring partners and the starter bot), 199 of ours on the galaxy replica and 357 between field bots there (357 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 55 players; compare them only within this fit.

**Thin field.** 24 rated field bots (Tom-CCS.BC19, StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IvanGeffner.BC19-bot6b, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-eigthbot, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, 18dcb01.Battlecode19-robot2, SethKitchen.examplefuncsplayer, Nydroam.BatteredCod, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~fb22c7, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, TestSubjector.BattleCode2~e6de74, RyanSharafuddin.Battlecode_2019, TheRobotCarlson.battlehac~323871, bc19-starter, DivyanshuSaxena.Battlecode, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (24), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1467 ± 252 | 33 of 55 | 38 | 33-5 | 72.2% | 26.6% (vs 6) |
| v1 | accepted | 1313 ± 182 | 39 of 55 | 154 | 128-26 | 61.2% | 19.7% (vs 8) |
| v2 | accepted | 1355 ± 171 | 38 of 55 | 62 | 30-32 | 64.3% | 23.4% (vs 8) |
| v3 | accepted | 1554 ± 136 | 27 of 55 | 191 | 140-51 | 77.7% | 32.0% (vs 5) |
| v4 | accepted | 1554 ± 146 | 26 of 55 | 214 | 83-131 | 77.7% | 32.0% (vs 5) |
| v5 | accepted | 1853 ± 174 | 6 of 55 | 197 | 102-95 | 92.1% | - |
| h11c | candidate | 1628 ± 194 | 23 of 55 | 25 | 15-10 | 82.0% | 37.0% (vs 4) |
| h16r | candidate | 1484 ± 181 | 32 of 55 | 40 | 16-24 | 73.3% | 28.4% (vs 6) |
| h18 | candidate | 1360 ± 208 | 36 of 55 | 25 | 6-19 | 64.7% | 23.8% (vs 8) |
| h2 | candidate | 1504 ± 175 | 29 of 55 | 54 | 25-29 | 74.6% | 26.3% (vs 5) |
| h24 | candidate | 1661 ± 183 | 20 of 55 | 40 | 26-14 | 83.8% | 38.1% (vs 3) |
| h3 | candidate | 1486 ± 231 | 31 of 55 | 19 | 9-10 | 73.4% | 28.6% (vs 6) |
| h31 | candidate | 1642 ± 182 | 22 of 55 | 40 | 25-15 | 82.8% | 38.9% (vs 4) |
| h38 | candidate | 1669 ± 318 | 18 of 55 | 6 | 4-2 | 84.2% | 33.3% (vs 2) |
| h40 | candidate | 1738 ± 304 | 17 of 55 | 8 | 6-2 | 87.5% | 42.7% (vs 2) |
| h41 | candidate | 1758 ± 298 | 13 of 55 | 8 | 3-5 | 88.4% | 45.5% (vs 2) |
| h42 | candidate | 1758 ± 298 | 14 of 55 | 8 | 3-5 | 88.4% | 45.5% (vs 2) |
| h43 | candidate | 1846 ± 292 | 7 of 55 | 8 | 4-4 | 91.8% | - |
| h44 | candidate | 2033 ± 319 | 1 of 55 | 8 | 6-2 | 96.6% | - |
| h46 | candidate | 1758 ± 298 | 15 of 55 | 8 | 3-5 | 88.4% | 45.5% (vs 2) |
| h47 | candidate | 1846 ± 292 | 8 of 55 | 8 | 4-4 | 91.8% | - |
| h48 | candidate | 1846 ± 292 | 9 of 55 | 8 | 4-4 | 91.8% | - |
| h49 | candidate | 1846 ± 292 | 10 of 55 | 8 | 4-4 | 91.8% | - |
| h50 | candidate | 1978 ± 207 | 3 of 55 | 40 | 27-13 | 95.5% | - |
| h52 | candidate | 1758 ± 298 | 16 of 55 | 8 | 3-5 | 88.4% | 45.5% (vs 2) |
| h53 | candidate | 1934 ± 297 | 5 of 55 | 8 | 5-3 | 94.4% | - |
| h54 | candidate | 1936 ± 216 | 4 of 55 | 29 | 18-11 | 94.5% | - |
| h55 | candidate | 2033 ± 319 | 2 of 55 | 8 | 6-2 | 96.6% | - |
| h6 | candidate | 1559 ± 139 | 25 of 55 | 158 | 94-64 | 78.0% | 32.6% (vs 5) |
| h7 | candidate | 1525 ± 1421 | 28 of 55 | 8 | 8-0 | 76.0% | 28.7% (vs 5) |
| rush | sparring | 1360 ± 208 | 37 of 55 | 25 | 6-19 | 64.7% | 23.8% (vs 8) |

Sources (`tools/progress/games.py`):

- local: 662 games from 36 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 556 games (11 archive games skipped, 56 matches from archives, 119 matches from scores), fetched 2026-10-22T11:38:21+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h44** | candidate | 2033 | 319 | 8 | 6-2 |  |
| 2 | **cand:h55** | candidate | 2033 | 319 | 8 | 6-2 |  |
| 3 | **cand:h50** | candidate | 1978 | 207 | 40 | 27-13 |  |
| 4 | **cand:h54** | candidate | 1936 | 216 | 29 | 18-11 |  |
| 5 | **cand:h53** | candidate | 1934 | 297 | 8 | 5-3 |  |
| 6 | **us:v5** | accepted | 1853 | 174 | 197 | 102-95 |  |
| 7 | **cand:h43** | candidate | 1846 | 292 | 8 | 4-4 |  |
| 8 | **cand:h47** | candidate | 1846 | 292 | 8 | 4-4 |  |
| 9 | **cand:h48** | candidate | 1846 | 292 | 8 | 4-4 |  |
| 10 | **cand:h49** | candidate | 1846 | 292 | 8 | 4-4 |  |
| 11 | Tom-CCS.BC19 | field | 1804 | 1152 | 6 | 6-0 |  |
| 12 | StoneT2000.BC19-botfinalsafe | field | 1775 | 373 | 15 | 14-1 | 0% (v3 0-3) |
| 13 | **cand:h41** | candidate | 1758 | 298 | 8 | 3-5 |  |
| 14 | **cand:h42** | candidate | 1758 | 298 | 8 | 3-5 |  |
| 15 | **cand:h46** | candidate | 1758 | 298 | 8 | 3-5 |  |
| 16 | **cand:h52** | candidate | 1758 | 298 | 8 | 3-5 |  |
| 17 | **cand:h40** | candidate | 1738 | 304 | 8 | 6-2 |  |
| 18 | **cand:h38** | candidate | 1669 | 318 | 6 | 4-2 |  |
| 19 | StoneT2000.BC19-bot1v43 | field | 1664 | 414 | 9 | 8-1 | 33% (v3 1-2) |
| 20 | **cand:h24** | candidate | 1661 | 183 | 40 | 26-14 |  |
| 21 | IanCoolidge0.battlecode20~69ce88 | field | 1652 | 408 | 15 | 13-2 |  |
| 22 | **cand:h31** | candidate | 1642 | 182 | 40 | 25-15 |  |
| 23 | **cand:h11c** | candidate | 1628 | 194 | 25 | 15-10 |  |
| 24 | IvanGeffner.BC19-bot6b | field | 1568 | 501 | 6 | 4-2 |  |
| 25 | **cand:h6** | candidate | 1559 | 139 | 158 | 94-64 |  |
| 26 | **us:v4** | accepted | 1554 | 146 | 214 | 83-131 |  |
| 27 | **us:v3** | accepted | 1554 | 136 | 191 | 140-51 |  |
| 28 | **cand:h7** | candidate | 1525 | 1421 | 8 | 8-0 |  |
| 29 | **cand:h2** | candidate | 1504 | 175 | 54 | 25-29 |  |
| 30 | IanCoolidge0.battlecode20~f649f3 | field | 1490 | 243 | 18 | 12-6 | 67% (v3 2-1) |
| 31 | **cand:h3** | candidate | 1486 | 231 | 19 | 9-10 |  |
| 32 | **cand:h16r** | candidate | 1484 | 181 | 40 | 16-24 |  |
| 33 | **us:v0** | accepted | 1467 | 252 | 38 | 33-5 |  |
| 34 | IvanGeffner.BC19-eigthbot | field | 1404 | 331 | 9 | 6-3 |  |
| 35 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1394 | 295 | 12 | 5-7 |  |
| 36 | **cand:h18** | candidate | 1360 | 208 | 25 | 6-19 |  |
| 37 | **spar:rush** | sparring | 1360 | 208 | 25 | 6-19 |  |
| 38 | **us:v2** | accepted | 1355 | 171 | 62 | 30-32 |  |
| 39 | **us:v1** | accepted | 1313 | 182 | 154 | 128-26 |  |
| 40 | NielsKornerup.Battlecode-2019 | field | 1270 | 353 | 9 | 5-4 |  |
| 41 | 18dcb01.Battlecode19-robot2 | field | 1252 | 383 | 12 | 3-9 |  |
| 42 | SethKitchen.examplefuncsplayer | field | 1199 | 642 | 12 | 8-4 |  |
| 43 | Nydroam.BatteredCod | field | 1193 | 454 | 6 | 3-3 |  |
| 44 | JasonLarson44.2019-Battle~1c7639 | field | 1160 | 363 | 9 | 5-4 | 100% (v3 3-0) |
| 45 | TestSubjector.BattleCode2~fb22c7 | field | 1155 | 505 | 12 | 7-5 |  |
| 46 | CS554-software-engineerin~a575dc | field | 1100 | 163 | 212 | 130-82 | 93% (v3 28-2) |
| 47 | CometsTech.battlecode2019 | field | 1091 | 165 | 171 | 89-82 | 100% (v3 33-0) |
| 48 | OmarTahoun.battle-code | field | 1071 | 647 | 9 | 4-5 |  |
| 49 | CometsTech.battlecode2019~187e8c | field | 957 | 471 | 9 | 1-8 |  |
| 50 | TestSubjector.BattleCode2~e6de74 | field | 481 | 521 | 12 | 5-7 |  |
| 51 | RyanSharafuddin.Battlecode_2019 | field | 467 | 1145 | 6 | 0-6 |  |
| 52 | TheRobotCarlson.battlehac~323871 | field | 352 | 1163 | 12 | 0-12 |  |
| 53 | bc19-starter | field | 308 | 307 | 304 | 44-260 | 100% (v3 12-0) |
| 54 | DivyanshuSaxena.Battlecode | field | -107 | 1189 | 9 | 0-9 |  |
| 55 | ArtemUstilov.bc19_CrazyTapok | field | -743 | 1101 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h55 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h50 | us:v5 | 40 | 27-13 | 68% | local |
| cand:h54 | us:v5 | 29 | 18-11 | 62% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h43 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h47 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h48 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h49 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h52 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
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
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
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
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
