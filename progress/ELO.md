# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-22 21:58 PDT.

1913 games: 1057 local (VM batches between our builds, candidates, sparring partners and the starter bot), 256 of ours on the galaxy replica and 600 between field bots there (597 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 122 players; compare them only within this fit.

**Thin field.** 73 rated field bots (mvpatel2000.Battlecode2019, moreda-a.BC2019-a31, m-schier.battlecode-2019-wololo, m4reko.bc2019-tmores-angels, spachava753.bc19, rafekruse.Battlecode-2019-bc19, howard36.Battlecode2019-eco6, j-mao.battlecode-2019, ldcWV.Battlecode-2019, awesomelemonade.Battlecode2019, uvafan.bc2019, StoneT2000.BC19-bot1v43, yujinwunz.battlecode_2019, StoneT2000.BC19-botfinalsafe, IanCoolidge0.battlecode20~69ce88, abcdefguan.battlecode2019, vineetparikh.BigRedBattle~fe3459, virenvshah.Battlecode2019, programjames.BC19Bot-seeding, VoidMercy.battlecode-2019~e7dc06, IvanGeffner.BC19-bot6b, liwanlin41.examplefuncsplayer, arya-k.bc19, cemondr.BC19pdxgroup4, IanCoolidge0.battlecode20~f649f3, NielsKornerup.Battlecode-2019, jyurkanin.corn_bc19, haydenshively.Battle-Code~e1c2fb, Tom-CCS.BC19, 18dcb01.Battlecode19-prea~fb5c48, IvanGeffner.BC19-eigthbot, rooneyshuman.Battlecode, bayoumi17m.BattleCode-2019, dndoja.battlecode19, evanyeyeye.battlecode2019~af562c, jamesrayman.HCN-bot, rafekruse.Battlecode-2019~2680d4, nhard.examplefuncsplayer, roy-love.onshoreBattleCode2019, ipercyNC.group6-battlecode, moreda-a.BC2019-t15, vishwasns99.BC_2019, unrevre.battlecode, JasonLarson44.2019-Battle~1c7639, 18dcb01.Battlecode19-robot2, CS554-software-engineerin~a575dc, ovkulkarni.battlecode2019~0aa607, CometsTech.battlecode2019, yunaganyh.bc19, jbiewend.Battlecode2019, Nydroam.BatteredCod, TestSubjector.BattleCode2~fb22c7, vicennial.BattleCode19, nthistle.battlecode-2019, VoidMercy.battlecode-2019-bot, TestSubjector.BattleCode2~e6de74, SethKitchen.examplefuncsplayer, jackliu612.Battlecode19, ryanhzhao.Battlecode-2019, OmarTahoun.battle-code, asunathanr.asu_bc, bovard.battlecode-2019-un~8822c3, jamesrayman.HCN-basic-bot, CometsTech.battlecode2019~187e8c, DivyanshuSaxena.Battlecode, jshin313.battlecodebot, UpperArlingtonHighSchool.~5e7875, bc19-starter, ovkulkarni.battlecode2019~06c610, howard36.Battlecode2019-sprint, TheRobotCarlson.battlehac~323871, RyanSharafuddin.Battlecode_2019, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (73), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1538 ± 268 | 62 of 122 | 38 | 33-5 | 63.6% | 19.0% (vs 25) |
| v1 | accepted | 1385 ± 203 | 79 of 122 | 154 | 128-26 | 53.6% | 17.0% (vs 33) |
| v2 | accepted | 1392 ± 196 | 78 of 122 | 62 | 30-32 | 54.1% | 17.5% (vs 33) |
| v3 | accepted | 1571 ± 166 | 53 of 122 | 191 | 140-51 | 65.6% | 20.3% (vs 24) |
| v4 | accepted | 1439 ± 155 | 73 of 122 | 220 | 83-137 | 57.2% | 16.5% (vs 29) |
| v5 | accepted | 1649 ± 138 | 39 of 122 | 439 | 202-237 | 70.4% | 21.9% (vs 20) |
| v6 | accepted | 1742 ± 150 | 30 of 122 | 224 | 98-126 | 75.6% | 25.6% (vs 16) |
| h11c | candidate | 1576 ± 213 | 52 of 122 | 25 | 15-10 | 65.9% | 20.8% (vs 24) |
| h16r | candidate | 1369 ± 189 | 80 of 122 | 40 | 16-24 | 52.6% | 16.0% (vs 33) |
| h18 | candidate | 1308 ± 226 | 86 of 122 | 25 | 6-19 | 48.6% | 16.7% (vs 38) |
| h2 | candidate | 1521 ± 200 | 64 of 122 | 54 | 25-29 | 62.5% | 17.7% (vs 25) |
| h24 | candidate | 1546 ± 191 | 61 of 122 | 40 | 26-14 | 64.1% | 19.6% (vs 25) |
| h24v5 | candidate | 1701 ± 175 | 36 of 122 | 40 | 23-17 | 73.3% | 25.5% (vs 19) |
| h3 | candidate | 1502 ± 251 | 68 of 122 | 19 | 9-10 | 61.3% | 18.7% (vs 27) |
| h31 | candidate | 1527 ± 190 | 63 of 122 | 40 | 25-15 | 62.9% | 18.2% (vs 25) |
| h38 | candidate | 1557 ± 324 | 58 of 122 | 6 | 4-2 | 64.8% | 19.2% (vs 24) |
| h40 | candidate | 1626 ± 310 | 48 of 122 | 8 | 6-2 | 69.0% | 22.4% (vs 22) |
| h41 | candidate | 1559 ± 279 | 54 of 122 | 8 | 3-5 | 64.9% | 19.4% (vs 24) |
| h42 | candidate | 1559 ± 279 | 55 of 122 | 8 | 3-5 | 64.9% | 19.4% (vs 24) |
| h43 | candidate | 1646 ± 273 | 40 of 122 | 8 | 4-4 | 70.2% | 21.6% (vs 20) |
| h44 | candidate | 1832 ± 303 | 22 of 122 | 8 | 6-2 | 80.3% | 27.8% (vs 12) |
| h46 | candidate | 1559 ± 279 | 56 of 122 | 8 | 3-5 | 64.9% | 19.4% (vs 24) |
| h47 | candidate | 1646 ± 273 | 41 of 122 | 8 | 4-4 | 70.2% | 21.6% (vs 20) |
| h48 | candidate | 1646 ± 273 | 42 of 122 | 8 | 4-4 | 70.2% | 21.6% (vs 20) |
| h49 | candidate | 1646 ± 273 | 43 of 122 | 8 | 4-4 | 70.2% | 21.6% (vs 20) |
| h52 | candidate | 1559 ± 279 | 57 of 122 | 8 | 3-5 | 64.9% | 19.4% (vs 24) |
| h53 | candidate | 1733 ± 279 | 33 of 122 | 8 | 5-3 | 75.1% | 27.4% (vs 18) |
| h54 | candidate | 1722 ± 170 | 34 of 122 | 48 | 29-19 | 74.5% | 26.3% (vs 18) |
| h55 | candidate | 1692 ± 168 | 38 of 122 | 56 | 32-24 | 72.8% | 25.8% (vs 20) |
| h58 | candidate | 1601 ± 295 | 49 of 122 | 8 | 3-5 | 67.4% | 20.2% (vs 22) |
| h59 | candidate | 1646 ± 273 | 44 of 122 | 8 | 4-4 | 70.2% | 21.6% (vs 20) |
| h6 | candidate | 1506 ± 164 | 67 of 122 | 158 | 94-64 | 61.6% | 19.0% (vs 27) |
| h60 | candidate | 1646 ± 273 | 45 of 122 | 8 | 4-4 | 70.2% | 21.6% (vs 20) |
| h61 | candidate | 1824 ± 286 | 23 of 122 | 8 | 5-3 | 79.9% | 27.0% (vs 12) |
| h63 | candidate | 1793 ± 185 | 25 of 122 | 40 | 23-17 | 78.4% | 25.7% (vs 13) |
| h68 | candidate | 1923 ± 309 | 13 of 122 | 8 | 6-2 | 84.6% | 31.4% (vs 9) |
| h7 | candidate | 1551 ± 1350 | 60 of 122 | 8 | 8-0 | 64.4% | 20.0% (vs 25) |
| h72 | candidate | 1923 ± 309 | 14 of 122 | 8 | 6-2 | 84.6% | 31.4% (vs 9) |
| h76 | candidate | 1870 ± 230 | 18 of 122 | 30 | 16-14 | 82.2% | 29.9% (vs 11) |
| h77 | candidate | 2382 ± 773 | 3 of 122 | 16 | 8-8 | 96.6% | 10.4% (vs 1) |
| h78 | candidate | 1923 ± 309 | 15 of 122 | 8 | 6-2 | 84.6% | 31.4% (vs 9) |
| h82 | candidate | 1840 ± 173 | 21 of 122 | 58 | 35-23 | 80.7% | 28.7% (vs 12) |
| h83 | candidate | 1863 ± 329 | 19 of 122 | 8 | 4-4 | 81.8% | 29.2% (vs 11) |
| h84 | candidate | 1979 ± 367 | 9 of 122 | 6 | 4-2 | 86.9% | 29.9% (vs 6) |
| h89 | candidate | 1498 ± 1513 | 69 of 122 | 8 | 0-8 | 61.0% | 18.3% (vs 27) |
| h8v5 | candidate | 1753 ± 172 | 29 of 122 | 48 | 31-17 | 76.2% | 26.7% (vs 16) |
| h90 | candidate | 1498 ± 1513 | 70 of 122 | 8 | 0-8 | 61.0% | 18.3% (vs 27) |
| rush | sparring | 1308 ± 226 | 87 of 122 | 25 | 6-19 | 48.6% | 16.7% (vs 38) |
| rush4 | sparring | 3147 ± 1309 | 1 of 122 | 30 | 30-0 | 99.8% | - |

Sources (`tools/progress/games.py`):

- local: 1057 games from 63 batch files (skipped: 202 cut before a verdict, 23 init failure, 98 load (robot init failures))
- replica: 856 games (11 archive games skipped, 76 matches from archives, 199 matches from scores), fetched 2026-10-23T05:01:07+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v6) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **spar:rush4** | sparring | 3147 | 1309 | 30 | 30-0 |  |
| 2 | mvpatel2000.Battlecode2019 | field | 2757 | 1297 | 3 | 3-0 |  |
| 3 | **cand:h77** | candidate | 2382 | 773 | 16 | 8-8 |  |
| 4 | moreda-a.BC2019-a31 | field | 2268 | 813 | 6 | 5-1 |  |
| 5 | m-schier.battlecode-2019-wololo | field | 2172 | 711 | 18 | 13-5 | 0% (v5 0-3) |
| 6 | m4reko.bc2019-tmores-angels | field | 2018 | 1470 | 6 | 6-0 |  |
| 7 | spachava753.bc19 | field | 2002 | 1435 | 3 | 3-0 |  |
| 8 | rafekruse.Battlecode-2019-bc19 | field | 2002 | 1435 | 3 | 3-0 |  |
| 9 | **cand:h84** | candidate | 1979 | 367 | 6 | 4-2 |  |
| 10 | howard36.Battlecode2019-eco6 | field | 1957 | 1353 | 3 | 3-0 |  |
| 11 | j-mao.battlecode-2019 | field | 1955 | 1128 | 6 | 6-0 |  |
| 12 | ldcWV.Battlecode-2019 | field | 1950 | 1129 | 3 | 3-0 |  |
| 13 | **cand:h68** | candidate | 1923 | 309 | 8 | 6-2 |  |
| 14 | **cand:h72** | candidate | 1923 | 309 | 8 | 6-2 |  |
| 15 | **cand:h78** | candidate | 1923 | 309 | 8 | 6-2 |  |
| 16 | awesomelemonade.Battlecode2019 | field | 1886 | 370 | 21 | 19-2 | 33% (v5 1-2) |
| 17 | uvafan.bc2019 | field | 1876 | 369 | 21 | 19-2 | 0% (v5 0-3) |
| 18 | **cand:h76** | candidate | 1870 | 230 | 30 | 16-14 |  |
| 19 | **cand:h83** | candidate | 1863 | 329 | 8 | 4-4 |  |
| 20 | StoneT2000.BC19-bot1v43 | field | 1841 | 196 | 45 | 37-8 | 33% (v6 1-2) |
| 21 | **cand:h82** | candidate | 1840 | 173 | 58 | 35-23 |  |
| 22 | **cand:h44** | candidate | 1832 | 303 | 8 | 6-2 |  |
| 23 | **cand:h61** | candidate | 1824 | 286 | 8 | 5-3 |  |
| 24 | yujinwunz.battlecode_2019 | field | 1821 | 1664 | 3 | 3-0 |  |
| 25 | **cand:h63** | candidate | 1793 | 185 | 40 | 23-17 |  |
| 26 | StoneT2000.BC19-botfinalsafe | field | 1784 | 178 | 51 | 38-13 | 0% (v6 0-3) |
| 27 | IanCoolidge0.battlecode20~69ce88 | field | 1767 | 245 | 27 | 22-5 | 0% (v5 0-3) |
| 28 | abcdefguan.battlecode2019 | field | 1759 | 528 | 6 | 4-2 |  |
| 29 | **cand:h8v5** | candidate | 1753 | 172 | 48 | 31-17 |  |
| 30 | **us:v6** | accepted | 1742 | 150 | 224 | 98-126 |  |
| 31 | vineetparikh.BigRedBattle~fe3459 | field | 1740 | 540 | 3 | 1-2 |  |
| 32 | virenvshah.Battlecode2019 | field | 1736 | 1429 | 3 | 3-0 |  |
| 33 | **cand:h53** | candidate | 1733 | 279 | 8 | 5-3 |  |
| 34 | **cand:h54** | candidate | 1722 | 170 | 48 | 29-19 |  |
| 35 | programjames.BC19Bot-seeding | field | 1721 | 1186 | 3 | 3-0 |  |
| 36 | **cand:h24v5** | candidate | 1701 | 175 | 40 | 23-17 |  |
| 37 | VoidMercy.battlecode-2019~e7dc06 | field | 1701 | 1379 | 3 | 3-0 |  |
| 38 | **cand:h55** | candidate | 1692 | 168 | 56 | 32-24 |  |
| 39 | **us:v5** | accepted | 1649 | 138 | 439 | 202-237 |  |
| 40 | **cand:h43** | candidate | 1646 | 273 | 8 | 4-4 |  |
| 41 | **cand:h47** | candidate | 1646 | 273 | 8 | 4-4 |  |
| 42 | **cand:h48** | candidate | 1646 | 273 | 8 | 4-4 |  |
| 43 | **cand:h49** | candidate | 1646 | 273 | 8 | 4-4 |  |
| 44 | **cand:h59** | candidate | 1646 | 273 | 8 | 4-4 |  |
| 45 | **cand:h60** | candidate | 1646 | 273 | 8 | 4-4 |  |
| 46 | IvanGeffner.BC19-bot6b | field | 1644 | 453 | 9 | 7-2 |  |
| 47 | liwanlin41.examplefuncsplayer | field | 1638 | 782 | 9 | 5-4 |  |
| 48 | **cand:h40** | candidate | 1626 | 310 | 8 | 6-2 |  |
| 49 | **cand:h58** | candidate | 1601 | 295 | 8 | 3-5 |  |
| 50 | arya-k.bc19 | field | 1584 | 1341 | 3 | 3-0 |  |
| 51 | cemondr.BC19pdxgroup4 | field | 1584 | 1341 | 3 | 3-0 |  |
| 52 | **cand:h11c** | candidate | 1576 | 213 | 25 | 15-10 |  |
| 53 | **us:v3** | accepted | 1571 | 166 | 191 | 140-51 |  |
| 54 | **cand:h41** | candidate | 1559 | 279 | 8 | 3-5 |  |
| 55 | **cand:h42** | candidate | 1559 | 279 | 8 | 3-5 |  |
| 56 | **cand:h46** | candidate | 1559 | 279 | 8 | 3-5 |  |
| 57 | **cand:h52** | candidate | 1559 | 279 | 8 | 3-5 |  |
| 58 | **cand:h38** | candidate | 1557 | 324 | 6 | 4-2 |  |
| 59 | IanCoolidge0.battlecode20~f649f3 | field | 1553 | 233 | 24 | 16-8 | 67% (v3 2-1) |
| 60 | **cand:h7** | candidate | 1551 | 1350 | 8 | 8-0 |  |
| 61 | **cand:h24** | candidate | 1546 | 191 | 40 | 26-14 |  |
| 62 | **us:v0** | accepted | 1538 | 268 | 38 | 33-5 |  |
| 63 | **cand:h31** | candidate | 1527 | 190 | 40 | 25-15 |  |
| 64 | **cand:h2** | candidate | 1521 | 200 | 54 | 25-29 |  |
| 65 | NielsKornerup.Battlecode-2019 | field | 1517 | 248 | 27 | 15-12 |  |
| 66 | jyurkanin.corn_bc19 | field | 1516 | 830 | 3 | 1-2 |  |
| 67 | **cand:h6** | candidate | 1506 | 164 | 158 | 94-64 |  |
| 68 | **cand:h3** | candidate | 1502 | 251 | 19 | 9-10 |  |
| 69 | **cand:h89** | candidate | 1498 | 1513 | 8 | 0-8 |  |
| 70 | **cand:h90** | candidate | 1498 | 1513 | 8 | 0-8 |  |
| 71 | haydenshively.Battle-Code~e1c2fb | field | 1478 | 899 | 9 | 7-2 |  |
| 72 | Tom-CCS.BC19 | field | 1456 | 507 | 12 | 9-3 |  |
| 73 | **us:v4** | accepted | 1439 | 155 | 220 | 83-137 |  |
| 74 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1436 | 274 | 21 | 11-10 |  |
| 75 | IvanGeffner.BC19-eigthbot | field | 1423 | 341 | 9 | 6-3 |  |
| 76 | rooneyshuman.Battlecode | field | 1397 | 1047 | 12 | 5-7 |  |
| 77 | bayoumi17m.BattleCode-2019 | field | 1396 | 730 | 9 | 6-3 |  |
| 78 | **us:v2** | accepted | 1392 | 196 | 62 | 30-32 |  |
| 79 | **us:v1** | accepted | 1385 | 203 | 154 | 128-26 |  |
| 80 | **cand:h16r** | candidate | 1369 | 189 | 40 | 16-24 |  |
| 81 | dndoja.battlecode19 | field | 1367 | 934 | 3 | 1-2 |  |
| 82 | evanyeyeye.battlecode2019~af562c | field | 1346 | 924 | 6 | 1-5 |  |
| 83 | jamesrayman.HCN-bot | field | 1338 | 351 | 21 | 9-12 | 100% (v5 3-0) |
| 84 | rafekruse.Battlecode-2019~2680d4 | field | 1319 | 746 | 3 | 2-1 |  |
| 85 | nhard.examplefuncsplayer | field | 1310 | 1419 | 3 | 0-3 |  |
| 86 | **cand:h18** | candidate | 1308 | 226 | 25 | 6-19 |  |
| 87 | **spar:rush** | sparring | 1308 | 226 | 25 | 6-19 |  |
| 88 | roy-love.onshoreBattleCode2019 | field | 1291 | 1072 | 3 | 1-2 |  |
| 89 | ipercyNC.group6-battlecode | field | 1280 | 504 | 6 | 4-2 |  |
| 90 | moreda-a.BC2019-t15 | field | 1273 | 1308 | 6 | 0-6 |  |
| 91 | vishwasns99.BC_2019 | field | 1225 | 1103 | 6 | 3-3 |  |
| 92 | unrevre.battlecode | field | 1219 | 1139 | 3 | 0-3 |  |
| 93 | JasonLarson44.2019-Battle~1c7639 | field | 1217 | 300 | 18 | 8-10 | 100% (v3 3-0) |
| 94 | 18dcb01.Battlecode19-robot2 | field | 1201 | 360 | 15 | 3-12 |  |
| 95 | CS554-software-engineerin~a575dc | field | 1195 | 181 | 221 | 132-89 | 67% (v5 2-1) |
| 96 | ovkulkarni.battlecode2019~0aa607 | field | 1186 | 663 | 6 | 3-3 |  |
| 97 | CometsTech.battlecode2019 | field | 1179 | 183 | 177 | 90-87 | 100% (v5 3-0) |
| 98 | yunaganyh.bc19 | field | 1179 | 1664 | 3 | 0-3 |  |
| 99 | jbiewend.Battlecode2019 | field | 1155 | 1037 | 6 | 3-3 |  |
| 100 | Nydroam.BatteredCod | field | 1074 | 543 | 6 | 3-3 |  |
| 101 | TestSubjector.BattleCode2~fb22c7 | field | 1061 | 470 | 15 | 10-5 |  |
| 102 | vicennial.BattleCode19 | field | 1056 | 1379 | 6 | 0-6 |  |
| 103 | nthistle.battlecode-2019 | field | 1033 | 575 | 21 | 7-14 | 100% (v5 3-0) |
| 104 | VoidMercy.battlecode-2019-bot | field | 999 | 1321 | 6 | 0-6 |  |
| 105 | TestSubjector.BattleCode2~e6de74 | field | 964 | 455 | 21 | 11-10 |  |
| 106 | SethKitchen.examplefuncsplayer | field | 844 | 605 | 18 | 8-10 |  |
| 107 | jackliu612.Battlecode19 | field | 816 | 914 | 6 | 3-3 |  |
| 108 | ryanhzhao.Battlecode-2019 | field | 806 | 1482 | 3 | 0-3 |  |
| 109 | OmarTahoun.battle-code | field | 768 | 688 | 12 | 7-5 |  |
| 110 | asunathanr.asu_bc | field | 746 | 1251 | 9 | 0-9 |  |
| 111 | bovard.battlecode-2019-un~8822c3 | field | 746 | 1251 | 9 | 0-9 |  |
| 112 | jamesrayman.HCN-basic-bot | field | 744 | 1137 | 6 | 0-6 |  |
| 113 | CometsTech.battlecode2019~187e8c | field | 671 | 481 | 15 | 2-13 |  |
| 114 | DivyanshuSaxena.Battlecode | field | 604 | 387 | 21 | 4-17 |  |
| 115 | jshin313.battlecodebot | field | 568 | 1495 | 3 | 0-3 |  |
| 116 | UpperArlingtonHighSchool.~5e7875 | field | 475 | 1182 | 3 | 0-3 |  |
| 117 | bc19-starter | field | 455 | 276 | 313 | 45-268 | 100% (v3 12-0) |
| 118 | ovkulkarni.battlecode2019~06c610 | field | 447 | 1227 | 3 | 0-3 |  |
| 119 | howard36.Battlecode2019-sprint | field | 226 | 1405 | 6 | 0-6 |  |
| 120 | TheRobotCarlson.battlehac~323871 | field | 73 | 1213 | 12 | 0-12 |  |
| 121 | RyanSharafuddin.Battlecode_2019 | field | 44 | 1175 | 30 | 0-30 |  |
| 122 | ArtemUstilov.bc19_CrazyTapok | field | -597 | 1103 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, bqi343.cp-notebook, cvxluo.battlecode19, dgh2.bc19-t1, djkeyes.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, haydenshively.Battle-Code~e37b3e, lschaberg.bc19, programjames.BC19Bot-root, sunanth123.battlecode19-mainbot, sunanth123.battlecode19-prorush, twitu.bc19-tsp, waylon531.scala_starter.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| moreda-a.BC2019-a31 | m-schier.battlecode-2019-wololo | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h84 | cand:h76 | 6 | 4-2 | 67% | local |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h82 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
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
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| jamesrayman.HCN-bot | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
