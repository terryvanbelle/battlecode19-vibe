# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 02:40 PDT.

1102 games: 579 local (VM batches between our builds, candidates, sparring partners and the starter bot), 196 of ours on the galaxy replica and 327 between field bots there (327 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 50 players; compare them only within this fit.

**Thin field.** 23 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, SethKitchen.examplefuncsplayer, Tom-CCS.BC19, IvanGeffner.BC19-bot6b, IvanGeffner.BC19-eigthbot, IanCoolidge0.battlecode20~f649f3, 18dcb01.Battlecode19-prea~fb5c48, NielsKornerup.Battlecode-2019, 18dcb01.Battlecode19-robot2, Nydroam.BatteredCod, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~fb22c7, TestSubjector.BattleCode2~e6de74, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, DivyanshuSaxena.Battlecode, TheRobotCarlson.battlehac~323871, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (23), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1488 ± 254 | 29 of 50 | 38 | 33-5 | 71.5% | 32.8% (vs 6) |
| v1 | accepted | 1334 ± 185 | 35 of 50 | 154 | 128-26 | 59.0% | 21.8% (vs 8) |
| v2 | accepted | 1382 ± 175 | 34 of 50 | 62 | 30-32 | 63.1% | 26.5% (vs 8) |
| v3 | accepted | 1584 ± 141 | 21 of 50 | 188 | 137-51 | 78.2% | 27.6% (vs 3) |
| v4 | accepted | 1592 ± 155 | 20 of 50 | 214 | 83-131 | 78.6% | 28.3% (vs 3) |
| v5 | accepted | 1900 ± 190 | 4 of 50 | 114 | 70-44 | 91.9% | 15.7% (vs 1) |
| h11c | candidate | 1662 ± 198 | 17 of 50 | 25 | 15-10 | 82.7% | 23.0% (vs 2) |
| h16r | candidate | 1521 ± 188 | 24 of 50 | 40 | 16-24 | 73.9% | 21.9% (vs 3) |
| h18 | candidate | 1393 ± 212 | 32 of 50 | 25 | 6-19 | 64.0% | 27.7% (vs 8) |
| h2 | candidate | 1534 ± 178 | 22 of 50 | 54 | 25-29 | 74.8% | 23.0% (vs 3) |
| h24 | candidate | 1698 ± 190 | 15 of 50 | 40 | 26-14 | 84.6% | 26.1% (vs 2) |
| h3 | candidate | 1515 ± 233 | 25 of 50 | 19 | 9-10 | 73.5% | 21.4% (vs 3) |
| h31 | candidate | 1679 ± 189 | 16 of 50 | 40 | 25-15 | 83.6% | 24.5% (vs 2) |
| h38 | candidate | 1705 ± 321 | 14 of 50 | 6 | 4-2 | 84.9% | 26.7% (vs 2) |
| h40 | candidate | 1775 ± 308 | 12 of 50 | 8 | 6-2 | 87.9% | 8.3% (vs 1) |
| h41 | candidate | 1804 ± 307 | 9 of 50 | 8 | 3-5 | 89.0% | 9.7% (vs 1) |
| h42 | candidate | 1804 ± 307 | 10 of 50 | 8 | 3-5 | 89.0% | 9.7% (vs 1) |
| h43 | candidate | 1893 ± 301 | 5 of 50 | 8 | 4-4 | 91.7% | 15.2% (vs 1) |
| h44 | candidate | 2080 ± 328 | 3 of 50 | 8 | 6-2 | 95.4% | 34.5% (vs 1) |
| h46 | candidate | 1804 ± 307 | 11 of 50 | 8 | 3-5 | 89.0% | 9.7% (vs 1) |
| h47 | candidate | 1893 ± 301 | 6 of 50 | 8 | 4-4 | 91.7% | 15.2% (vs 1) |
| h48 | candidate | 1893 ± 301 | 7 of 50 | 8 | 4-4 | 91.7% | 15.2% (vs 1) |
| h49 | candidate | 1893 ± 301 | 8 of 50 | 8 | 4-4 | 91.7% | 15.2% (vs 1) |
| h50 | candidate | 2130 ± 321 | 2 of 50 | 10 | 8-2 | 96.1% | 41.3% (vs 1) |
| h6 | candidate | 1593 ± 145 | 19 of 50 | 158 | 94-64 | 78.7% | 28.4% (vs 3) |
| h7 | candidate | 1524 ± 1423 | 23 of 50 | 8 | 8-0 | 74.1% | 22.2% (vs 3) |
| rush | sparring | 1393 ± 212 | 33 of 50 | 25 | 6-19 | 64.0% | 27.7% (vs 8) |

Sources (`tools/progress/games.py`):

- local: 579 games from 32 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 523 games (11 archive games skipped, 55 matches from archives, 109 matches from scores), fetched 2026-10-22T09:41:27+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-botfinalsafe | field | 2192 | 1078 | 9 | 9-0 | 0% (v3 0-3) |
| 2 | **cand:h50** | candidate | 2130 | 321 | 10 | 8-2 |  |
| 3 | **cand:h44** | candidate | 2080 | 328 | 8 | 6-2 |  |
| 4 | **us:v5** | accepted | 1900 | 190 | 114 | 70-44 |  |
| 5 | **cand:h43** | candidate | 1893 | 301 | 8 | 4-4 |  |
| 6 | **cand:h47** | candidate | 1893 | 301 | 8 | 4-4 |  |
| 7 | **cand:h48** | candidate | 1893 | 301 | 8 | 4-4 |  |
| 8 | **cand:h49** | candidate | 1893 | 301 | 8 | 4-4 |  |
| 9 | **cand:h41** | candidate | 1804 | 307 | 8 | 3-5 |  |
| 10 | **cand:h42** | candidate | 1804 | 307 | 8 | 3-5 |  |
| 11 | **cand:h46** | candidate | 1804 | 307 | 8 | 3-5 |  |
| 12 | **cand:h40** | candidate | 1775 | 308 | 8 | 6-2 |  |
| 13 | StoneT2000.BC19-bot1v43 | field | 1721 | 407 | 6 | 5-1 | 33% (v3 1-2) |
| 14 | **cand:h38** | candidate | 1705 | 321 | 6 | 4-2 |  |
| 15 | **cand:h24** | candidate | 1698 | 190 | 40 | 26-14 |  |
| 16 | **cand:h31** | candidate | 1679 | 189 | 40 | 25-15 |  |
| 17 | **cand:h11c** | candidate | 1662 | 198 | 25 | 15-10 |  |
| 18 | IanCoolidge0.battlecode20~69ce88 | field | 1594 | 416 | 12 | 10-2 |  |
| 19 | **cand:h6** | candidate | 1593 | 145 | 158 | 94-64 |  |
| 20 | **us:v4** | accepted | 1592 | 155 | 214 | 83-131 |  |
| 21 | **us:v3** | accepted | 1584 | 141 | 188 | 137-51 |  |
| 22 | **cand:h2** | candidate | 1534 | 178 | 54 | 25-29 |  |
| 23 | **cand:h7** | candidate | 1524 | 1423 | 8 | 8-0 |  |
| 24 | **cand:h16r** | candidate | 1521 | 188 | 40 | 16-24 |  |
| 25 | **cand:h3** | candidate | 1515 | 233 | 19 | 9-10 |  |
| 26 | SethKitchen.examplefuncsplayer | field | 1513 | 1466 | 3 | 3-0 |  |
| 27 | Tom-CCS.BC19 | field | 1513 | 1466 | 3 | 3-0 |  |
| 28 | IvanGeffner.BC19-bot6b | field | 1511 | 526 | 6 | 4-2 |  |
| 29 | **us:v0** | accepted | 1488 | 254 | 38 | 33-5 |  |
| 30 | IvanGeffner.BC19-eigthbot | field | 1456 | 469 | 6 | 5-1 |  |
| 31 | IanCoolidge0.battlecode20~f649f3 | field | 1453 | 273 | 15 | 10-5 | 67% (v3 2-1) |
| 32 | **cand:h18** | candidate | 1393 | 212 | 25 | 6-19 |  |
| 33 | **spar:rush** | sparring | 1393 | 212 | 25 | 6-19 |  |
| 34 | **us:v2** | accepted | 1382 | 175 | 62 | 30-32 |  |
| 35 | **us:v1** | accepted | 1334 | 185 | 154 | 128-26 |  |
| 36 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1307 | 319 | 9 | 4-5 |  |
| 37 | NielsKornerup.Battlecode-2019 | field | 1268 | 347 | 9 | 5-4 |  |
| 38 | 18dcb01.Battlecode19-robot2 | field | 1266 | 399 | 9 | 3-6 |  |
| 39 | Nydroam.BatteredCod | field | 1224 | 509 | 6 | 3-3 |  |
| 40 | JasonLarson44.2019-Battle~1c7639 | field | 1190 | 357 | 9 | 5-4 | 100% (v3 3-0) |
| 41 | TestSubjector.BattleCode2~fb22c7 | field | 1171 | 541 | 6 | 4-2 |  |
| 42 | TestSubjector.BattleCode2~e6de74 | field | 1167 | 852 | 9 | 3-6 |  |
| 43 | CS554-software-engineerin~a575dc | field | 1117 | 167 | 212 | 130-82 | 93% (v3 28-2) |
| 44 | CometsTech.battlecode2019 | field | 1111 | 169 | 168 | 89-79 | 100% (v3 30-0) |
| 45 | OmarTahoun.battle-code | field | 1006 | 893 | 6 | 3-3 |  |
| 46 | CometsTech.battlecode2019~187e8c | field | 968 | 479 | 9 | 1-8 |  |
| 47 | DivyanshuSaxena.Battlecode | field | 469 | 1167 | 6 | 0-6 |  |
| 48 | TheRobotCarlson.battlehac~323871 | field | 348 | 1232 | 12 | 0-12 |  |
| 49 | bc19-starter | field | 301 | 337 | 301 | 43-258 | 100% (v3 12-0) |
| 50 | ArtemUstilov.bc19_CrazyTapok | field | -749 | 1108 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h50 | us:v5 | 10 | 8-2 | 80% | local |
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
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
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
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
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
