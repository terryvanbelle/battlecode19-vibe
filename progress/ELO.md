# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-21 22:00 PDT.

901 games: 411 local (VM batches between our builds, candidates, sparring partners and the starter bot), 190 of ours on the galaxy replica and 300 between field bots there (300 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 36 players; compare them only within this fit.

**Thin field.** 22 rated field bots (StoneT2000.BC19-botfinalsafe, StoneT2000.BC19-bot1v43, IvanGeffner.BC19-eigthbot, Tom-CCS.BC19, SethKitchen.examplefuncsplayer, IanCoolidge0.battlecode20~f649f3, Nydroam.BatteredCod, IanCoolidge0.battlecode20~69ce88, TestSubjector.BattleCode2~e6de74, IvanGeffner.BC19-bot6b, 18dcb01.Battlecode19-prea~fb5c48, 18dcb01.Battlecode19-robot2, JasonLarson44.2019-Battle~1c7639, NielsKornerup.Battlecode-2019, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, CometsTech.battlecode2019~187e8c, TheRobotCarlson.battlehac~323871, OmarTahoun.battle-code, DivyanshuSaxena.Battlecode, bc19-starter, ArtemUstilov.bc19_CrazyTapok) out of the replica's 89 teams: the field of public 2019 bots is still being compiled, so the field score below is an expected score against these few bots only, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the field grows. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (22), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1574 ± 281 | 17 of 36 | 38 | 33-5 | 65.1% | 30.3% (vs 8) |
| v1 | accepted | 1422 ± 223 | 25 of 36 | 154 | 128-26 | 53.2% | 21.5% (vs 11) |
| v2 | accepted | 1475 ± 221 | 23 of 36 | 62 | 30-32 | 57.3% | 24.3% (vs 10) |
| v3 | accepted | 1681 ± 203 | 8 of 36 | 182 | 132-50 | 73.3% | 25.4% (vs 3) |
| v4 | accepted | 1720 ± 236 | 6 of 36 | 120 | 59-61 | 76.0% | 29.2% (vs 3) |
| h11c | candidate | 1774 ± 255 | 4 of 36 | 25 | 15-10 | 79.6% | 27.0% (vs 2) |
| h16r | candidate | 1648 ± 259 | 12 of 36 | 40 | 16-24 | 70.8% | 35.0% (vs 6) |
| h18 | candidate | 1505 ± 265 | 21 of 36 | 25 | 6-19 | 59.7% | 27.3% (vs 10) |
| h2 | candidate | 1630 ± 229 | 15 of 36 | 54 | 25-29 | 69.4% | 36.9% (vs 8) |
| h24 | candidate | 1826 ± 260 | 2 of 36 | 40 | 26-14 | 82.7% | 7.2% (vs 1) |
| h3 | candidate | 1610 ± 273 | 16 of 36 | 19 | 9-10 | 67.9% | 34.6% (vs 8) |
| h6 | candidate | 1705 ± 217 | 7 of 36 | 158 | 94-64 | 75.0% | 27.8% (vs 3) |
| h7 | candidate | 1537 ± 1377 | 19 of 36 | 8 | 8-0 | 62.2% | 28.7% (vs 9) |
| rush | sparring | 1505 ± 265 | 22 of 36 | 25 | 6-19 | 59.7% | 27.3% (vs 10) |

Sources (`tools/progress/games.py`):

- local: 411 games from 19 batch files (skipped: 23 init failure, 98 load (robot init failures))
- replica: 490 games (11 archive games skipped, 53 matches from archives, 100 matches from scores), fetched 2026-10-22T05:02:08+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v4) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | StoneT2000.BC19-botfinalsafe | field | 2270 | 1082 | 6 | 6-0 | 0% (v3 0-3) |
| 2 | **cand:h24** | candidate | 1826 | 260 | 40 | 26-14 |  |
| 3 | StoneT2000.BC19-bot1v43 | field | 1784 | 438 | 3 | 2-1 | 33% (v3 1-2) |
| 4 | **cand:h11c** | candidate | 1774 | 255 | 25 | 15-10 |  |
| 5 | IvanGeffner.BC19-eigthbot | field | 1770 | 805 | 6 | 5-1 |  |
| 6 | **us:v4** | accepted | 1720 | 236 | 120 | 59-61 |  |
| 7 | **cand:h6** | candidate | 1705 | 217 | 158 | 94-64 |  |
| 8 | **us:v3** | accepted | 1681 | 203 | 182 | 132-50 |  |
| 9 | Tom-CCS.BC19 | field | 1673 | 1384 | 3 | 3-0 |  |
| 10 | SethKitchen.examplefuncsplayer | field | 1673 | 1384 | 3 | 3-0 |  |
| 11 | IanCoolidge0.battlecode20~f649f3 | field | 1653 | 451 | 9 | 7-2 |  |
| 12 | **cand:h16r** | candidate | 1648 | 259 | 40 | 16-24 |  |
| 13 | Nydroam.BatteredCod | field | 1639 | 854 | 3 | 1-2 |  |
| 14 | IanCoolidge0.battlecode20~69ce88 | field | 1631 | 456 | 12 | 10-2 |  |
| 15 | **cand:h2** | candidate | 1630 | 229 | 54 | 25-29 |  |
| 16 | **cand:h3** | candidate | 1610 | 273 | 19 | 9-10 |  |
| 17 | **us:v0** | accepted | 1574 | 281 | 38 | 33-5 |  |
| 18 | TestSubjector.BattleCode2~e6de74 | field | 1558 | 1345 | 3 | 3-0 |  |
| 19 | **cand:h7** | candidate | 1537 | 1377 | 8 | 8-0 |  |
| 20 | IvanGeffner.BC19-bot6b | field | 1532 | 564 | 6 | 4-2 |  |
| 21 | **cand:h18** | candidate | 1505 | 265 | 25 | 6-19 |  |
| 22 | **spar:rush** | sparring | 1505 | 265 | 25 | 6-19 |  |
| 23 | **us:v2** | accepted | 1475 | 221 | 62 | 30-32 |  |
| 24 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1469 | 416 | 9 | 4-5 |  |
| 25 | **us:v1** | accepted | 1422 | 223 | 154 | 128-26 |  |
| 26 | 18dcb01.Battlecode19-robot2 | field | 1369 | 491 | 6 | 1-5 |  |
| 27 | JasonLarson44.2019-Battle~1c7639 | field | 1278 | 372 | 9 | 5-4 | 100% (v3 3-0) |
| 28 | NielsKornerup.Battlecode-2019 | field | 1262 | 372 | 6 | 2-4 |  |
| 29 | CS554-software-engineerin~a575dc | field | 1206 | 207 | 203 | 129-74 | 93% (v3 25-2) |
| 30 | CometsTech.battlecode2019 | field | 1191 | 209 | 165 | 86-79 | 100% (v3 30-0) |
| 31 | CometsTech.battlecode2019~187e8c | field | 1023 | 1139 | 3 | 0-3 |  |
| 32 | TheRobotCarlson.battlehac~323871 | field | 949 | 1470 | 6 | 0-6 |  |
| 33 | OmarTahoun.battle-code | field | 933 | 1185 | 3 | 0-3 |  |
| 34 | DivyanshuSaxena.Battlecode | field | 657 | 1121 | 6 | 0-6 |  |
| 35 | bc19-starter | field | 387 | 354 | 301 | 43-258 | 100% (v3 12-0) |
| 36 | ArtemUstilov.bc19_CrazyTapok | field | -663 | 1105 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, RyanSharafuddin.Battlecode_2019, TestSubjector.BattleCode2~fb22c7, UpperArlingtonHighSchool.~5e7875, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, VoidMercy.battlecode-2019-bot, VoidMercy.battlecode-2019~e7dc06, abcdefguan.battlecode2019, arya-k.bc19, asunathanr.asu_bc, awesomelemonade.Battlecode2019, bayoumi17m.BattleCode-2019, bovard.battlecode-2019-un~8822c3, bqi343.cp-notebook, cemondr.BC19pdxgroup4, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, howard36.Battlecode2019-eco6, howard36.Battlecode2019-sprint, ipercyNC.group6-battlecode, j-mao.battlecode-2019, jackliu612.Battlecode19, jamesrayman.HCN-basic-bot, jamesrayman.HCN-bot, jbiewend.Battlecode2019, jshin313.battlecodebot, jyurkanin.corn_bc19, ldcWV.Battlecode-2019, liwanlin41.examplefuncsplayer, lschaberg.bc19, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, moreda-a.BC2019-a31, moreda-a.BC2019-t15, mvpatel2000.Battlecode2019, nhard.examplefuncsplayer, nthistle.battlecode-2019, ovkulkarni.battlecode2019~06c610, ovkulkarni.battlecode2019~0aa607, programjames.BC19Bot-root, programjames.BC19Bot-seeding, rafekruse.Battlecode-2019-bc19, rafekruse.Battlecode-2019~2680d4, rooneyshuman.Battlecode, roy-love.onshoreBattleCode2019, ryanhzhao.Battlecode-2019, spachava753.bc19, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, unrevre.battlecode, uvafan.bc2019, vicennial.BattleCode19, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, vishwasns99.BC_2019, waylon531.scala_starter, yujinwunz.battlecode_2019, yunaganyh.bc19.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
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
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 69 | 32-37 | 46% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
