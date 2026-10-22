# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 01:07 PDT.

1027 games: 525 local (VM batches between our builds, candidates, sparring partners and the starter bot), 190 of ours on the galaxy replica and 312 between field bots there (312 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 43 players; compare them only within this fit.

**Thin field.** 22 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~69ce88, IanCoolidge0.battlecode20~f649f3, IvanGeffner.BC19-bot6b, IvanGeffner.BC19-eigthbot, Tom-CCS.BC19, SethKitchen.examplefuncsplayer, 18dcb01.Battlecode19-prea~fb5c48, Nydroam.BatteredCod, 18dcb01.Battlecode19-robot2, CometsTech.battlecode2019~187e8c, NielsKornerup.Battlecode-2019, JasonLarson44.2019-Battle~1c7639, TestSubjector.BattleCode2~e6de74, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, OmarTahoun.battle-code, TheRobotCarlson.battlehac~323871, DivyanshuSaxena.Battlecode, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (22), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1504 ± 263 | 25 of 43 | 38 | 33-5 | 65.6% | 31.2% (vs 8) |
| v1 | accepted | 1351 ± 199 | 32 of 43 | 154 | 128-26 | 52.9% | 23.2% (vs 11) |
| v2 | accepted | 1402 ± 191 | 30 of 43 | 62 | 30-32 | 57.1% | 25.8% (vs 10) |
| v3 | accepted | 1605 ± 165 | 16 of 43 | 182 | 132-50 | 73.3% | 29.9% (vs 4) |
| v4 | accepted | 1628 ± 185 | 14 of 43 | 214 | 83-131 | 75.0% | 32.4% (vs 4) |
| v5 | accepted | 1953 ± 232 | 3 of 43 | 60 | 46-14 | 91.2% | 18.4% (vs 1) |
| h11c | candidate | 1691 ± 218 | 11 of 43 | 25 | 15-10 | 79.2% | 23.8% (vs 2) |
| h16r | candidate | 1558 ± 213 | 19 of 43 | 40 | 16-24 | 69.8% | 31.7% (vs 6) |
| h18 | candidate | 1422 ± 230 | 28 of 43 | 25 | 6-19 | 58.9% | 27.9% (vs 10) |
| h2 | candidate | 1555 ± 197 | 20 of 43 | 54 | 25-29 | 69.5% | 31.4% (vs 6) |
| h24 | candidate | 1735 ± 215 | 9 of 43 | 40 | 26-14 | 81.8% | 27.6% (vs 2) |
| h3 | candidate | 1536 ± 247 | 21 of 43 | 19 | 9-10 | 68.1% | 29.4% (vs 6) |
| h31 | candidate | 1716 ± 214 | 10 of 43 | 40 | 25-15 | 80.7% | 25.9% (vs 2) |
| h38 | candidate | 1741 ± 336 | 7 of 43 | 6 | 4-2 | 82.2% | 6.2% (vs 1) |
| h40 | candidate | 1811 ± 323 | 6 of 43 | 8 | 6-2 | 85.8% | 9.0% (vs 1) |
| h41 | candidate | 1857 ± 334 | 4 of 43 | 8 | 3-5 | 87.8% | 11.5% (vs 1) |
| h42 | candidate | 1857 ± 334 | 5 of 43 | 8 | 3-5 | 87.8% | 11.5% (vs 1) |
| h43 | candidate | 2123 ± 437 | 2 of 43 | 4 | 3-1 | 95.1% | 37.5% (vs 1) |
| h6 | candidate | 1622 ± 172 | 15 of 43 | 158 | 94-64 | 74.5% | 31.7% (vs 4) |
| h7 | candidate | 1526 ± 1413 | 22 of 43 | 8 | 8-0 | 67.3% | 28.3% (vs 6) |
| rush | sparring | 1422 ± 230 | 29 of 43 | 25 | 6-19 | 58.9% | 27.9% (vs 10) |

Sources (`tools/progress/games.py`):

- local: 525 games from 25 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 502 games (11 archive games skipped, 53 matches from archives, 104 matches from scores), fetched 2026-10-22T08:09:12+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v5) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-botfinalsafe | field | 2212 | 1077 | 9 | 9-0 | 0% (v3 0-3) |
| 2 | **cand:h43** | candidate | 2123 | 437 | 4 | 3-1 |  |
| 3 | **us:v5** | accepted | 1953 | 232 | 60 | 46-14 |  |
| 4 | **cand:h41** | candidate | 1857 | 334 | 8 | 3-5 |  |
| 5 | **cand:h42** | candidate | 1857 | 334 | 8 | 3-5 |  |
| 6 | **cand:h40** | candidate | 1811 | 323 | 8 | 6-2 |  |
| 7 | **cand:h38** | candidate | 1741 | 336 | 6 | 4-2 |  |
| 8 | StoneT2000.BC19-bot1v43 | field | 1741 | 412 | 6 | 5-1 | 33% (v3 1-2) |
| 9 | **cand:h24** | candidate | 1735 | 215 | 40 | 26-14 |  |
| 10 | **cand:h31** | candidate | 1716 | 214 | 40 | 25-15 |  |
| 11 | **cand:h11c** | candidate | 1691 | 218 | 25 | 15-10 |  |
| 12 | IanCoolidge0.battlecode20~69ce88 | field | 1679 | 437 | 12 | 10-2 |  |
| 13 | IanCoolidge0.battlecode20~f649f3 | field | 1635 | 458 | 9 | 7-2 |  |
| 14 | **us:v4** | accepted | 1628 | 185 | 214 | 83-131 |  |
| 15 | **cand:h6** | candidate | 1622 | 172 | 158 | 94-64 |  |
| 16 | **us:v3** | accepted | 1605 | 165 | 182 | 132-50 |  |
| 17 | IvanGeffner.BC19-bot6b | field | 1594 | 538 | 6 | 4-2 |  |
| 18 | IvanGeffner.BC19-eigthbot | field | 1591 | 543 | 6 | 5-1 |  |
| 19 | **cand:h16r** | candidate | 1558 | 213 | 40 | 16-24 |  |
| 20 | **cand:h2** | candidate | 1555 | 197 | 54 | 25-29 |  |
| 21 | **cand:h3** | candidate | 1536 | 247 | 19 | 9-10 |  |
| 22 | **cand:h7** | candidate | 1526 | 1413 | 8 | 8-0 |  |
| 23 | Tom-CCS.BC19 | field | 1526 | 1421 | 3 | 3-0 |  |
| 24 | SethKitchen.examplefuncsplayer | field | 1526 | 1421 | 3 | 3-0 |  |
| 25 | **us:v0** | accepted | 1504 | 263 | 38 | 33-5 |  |
| 26 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1439 | 428 | 9 | 4-5 |  |
| 27 | Nydroam.BatteredCod | field | 1427 | 550 | 6 | 3-3 |  |
| 28 | **cand:h18** | candidate | 1422 | 230 | 25 | 6-19 |  |
| 29 | **spar:rush** | sparring | 1422 | 230 | 25 | 6-19 |  |
| 30 | **us:v2** | accepted | 1402 | 191 | 62 | 30-32 |  |
| 31 | 18dcb01.Battlecode19-robot2 | field | 1383 | 488 | 6 | 1-5 |  |
| 32 | **us:v1** | accepted | 1351 | 199 | 154 | 128-26 |  |
| 33 | CometsTech.battlecode2019~187e8c | field | 1256 | 560 | 6 | 1-5 |  |
| 34 | NielsKornerup.Battlecode-2019 | field | 1223 | 379 | 6 | 2-4 |  |
| 35 | JasonLarson44.2019-Battle~1c7639 | field | 1202 | 364 | 9 | 5-4 | 100% (v3 3-0) |
| 36 | TestSubjector.BattleCode2~e6de74 | field | 1183 | 850 | 9 | 3-6 |  |
| 37 | CS554-software-engineerin~a575dc | field | 1137 | 183 | 203 | 129-74 | 93% (v3 25-2) |
| 38 | CometsTech.battlecode2019 | field | 1120 | 184 | 165 | 86-79 | 100% (v3 30-0) |
| 39 | OmarTahoun.battle-code | field | 1101 | 881 | 6 | 3-3 |  |
| 40 | TheRobotCarlson.battlehac~323871 | field | 486 | 1308 | 9 | 0-9 |  |
| 41 | DivyanshuSaxena.Battlecode | field | 483 | 1162 | 6 | 0-6 |  |
| 42 | bc19-starter | field | 318 | 343 | 301 | 43-258 | 100% (v3 12-0) |
| 43 | ArtemUstilov.bc19_CrazyTapok | field | -733 | 1106 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, TestSubjector.BattleCode2~fb22c7, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h43 | us:v5 | 4 | 3-1 | 75% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
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
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
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
