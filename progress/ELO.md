# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-23 00:48 PDT.

2073 games: 1163 local (VM batches between our builds, candidates, sparring partners and the starter bot), 286 of ours on the galaxy replica and 624 between field bots there (621 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 128 players; compare them only within this fit.

**Thin field.** 76 rated field bots (mvpatel2000.Battlecode2019, moreda-a.BC2019-a31, m-schier.battlecode-2019-wololo, ldcWV.Battlecode-2019, uvafan.bc2019, m4reko.bc2019-tmores-angels, spachava753.bc19, rafekruse.Battlecode-2019-bc19, j-mao.battlecode-2019, howard36.Battlecode2019-eco6, vineetparikh.BigRedBattle~fe3459, IanCoolidge0.battlecode20~69ce88, StoneT2000.BC19-bot1v43, bqi343.cp-notebook, yujinwunz.battlecode_2019, StoneT2000.BC19-botfinalsafe, virenvshah.Battlecode2019, IvanGeffner.BC19-bot6b, awesomelemonade.Battlecode2019, VoidMercy.battlecode-2019~e7dc06, programjames.BC19Bot-seeding, abcdefguan.battlecode2019, sunanth123.battlecode19-prorush, NielsKornerup.Battlecode-2019, arya-k.bc19, cemondr.BC19pdxgroup4, IanCoolidge0.battlecode20~f649f3, haydenshively.Battle-Code~e1c2fb, Tom-CCS.BC19, liwanlin41.examplefuncsplayer, 18dcb01.Battlecode19-prea~fb5c48, IvanGeffner.BC19-eigthbot, rooneyshuman.Battlecode, jamesrayman.HCN-bot, dndoja.battlecode19, ipercyNC.group6-battlecode, evanyeyeye.battlecode2019~af562c, vishwasns99.BC_2019, unrevre.battlecode, jyurkanin.corn_bc19, rafekruse.Battlecode-2019~2680d4, nhard.examplefuncsplayer, moreda-a.BC2019-t15, roy-love.onshoreBattleCode2019, bayoumi17m.BattleCode-2019, 18dcb01.Battlecode19-robot2, CS554-software-engineerin~a575dc, ovkulkarni.battlecode2019~0aa607, CometsTech.battlecode2019, djkeyes.bc19, yunaganyh.bc19, JasonLarson44.2019-Battle~1c7639, vicennial.BattleCode19, TestSubjector.BattleCode2~fb22c7, Nydroam.BatteredCod, nthistle.battlecode-2019, jackliu612.Battlecode19, TestSubjector.BattleCode2~e6de74, VoidMercy.battlecode-2019-bot, ryanhzhao.Battlecode-2019, jamesrayman.HCN-basic-bot, SethKitchen.examplefuncsplayer, OmarTahoun.battle-code, CometsTech.battlecode2019~187e8c, asunathanr.asu_bc, bovard.battlecode-2019-un~8822c3, DivyanshuSaxena.Battlecode, jbiewend.Battlecode2019, UpperArlingtonHighSchool.~5e7875, bc19-starter, ovkulkarni.battlecode2019~06c610, howard36.Battlecode2019-sprint, RyanSharafuddin.Battlecode_2019, jshin313.battlecodebot, TheRobotCarlson.battlehac~323871, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (76), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1540 ± 266 | 61 of 128 | 38 | 33-5 | 63.1% | 18.2% (vs 26) |
| v1 | accepted | 1387 ± 200 | 82 of 128 | 154 | 128-26 | 53.1% | 15.9% (vs 33) |
| v2 | accepted | 1390 ± 193 | 81 of 128 | 62 | 30-32 | 53.3% | 16.1% (vs 33) |
| v3 | accepted | 1567 ± 163 | 54 of 128 | 191 | 140-51 | 64.7% | 16.2% (vs 23) |
| v4 | accepted | 1422 ± 151 | 78 of 128 | 220 | 83-137 | 55.5% | 16.2% (vs 31) |
| v5 | accepted | 1623 ± 132 | 43 of 128 | 439 | 202-237 | 68.1% | 17.2% (vs 21) |
| v6 | accepted | 1699 ± 138 | 39 of 128 | 282 | 112-170 | 72.4% | 23.4% (vs 21) |
| v7 | accepted | 1883 ± 175 | 15 of 128 | 48 | 35-13 | 81.5% | 26.3% (vs 12) |
| h11c | candidate | 1565 ± 210 | 55 of 128 | 25 | 15-10 | 64.6% | 16.1% (vs 23) |
| h16r | candidate | 1353 ± 186 | 86 of 128 | 40 | 16-24 | 50.8% | 16.7% (vs 36) |
| h18 | candidate | 1297 ± 224 | 94 of 128 | 25 | 6-19 | 47.2% | 18.4% (vs 43) |
| h2 | candidate | 1516 ± 198 | 68 of 128 | 54 | 25-29 | 61.6% | 17.7% (vs 27) |
| h24 | candidate | 1530 ± 187 | 67 of 128 | 40 | 26-14 | 62.4% | 18.7% (vs 27) |
| h24v5 | candidate | 1675 ± 170 | 41 of 128 | 40 | 23-17 | 71.1% | 21.3% (vs 21) |
| h3 | candidate | 1498 ± 249 | 70 of 128 | 19 | 9-10 | 60.4% | 16.4% (vs 27) |
| h31 | candidate | 1511 ± 186 | 69 of 128 | 40 | 25-15 | 61.3% | 17.3% (vs 27) |
| h38 | candidate | 1541 ± 322 | 60 of 128 | 6 | 4-2 | 63.2% | 18.3% (vs 26) |
| h40 | candidate | 1610 ± 308 | 51 of 128 | 8 | 6-2 | 67.3% | 17.7% (vs 22) |
| h41 | candidate | 1534 ± 276 | 63 of 128 | 8 | 3-5 | 62.7% | 19.0% (vs 27) |
| h42 | candidate | 1534 ± 276 | 64 of 128 | 8 | 3-5 | 62.7% | 19.0% (vs 27) |
| h43 | candidate | 1620 ± 270 | 44 of 128 | 8 | 4-4 | 67.9% | 17.0% (vs 21) |
| h44 | candidate | 1806 ± 300 | 25 of 128 | 8 | 6-2 | 77.9% | 24.7% (vs 15) |
| h46 | candidate | 1534 ± 276 | 65 of 128 | 8 | 3-5 | 62.7% | 19.0% (vs 27) |
| h47 | candidate | 1620 ± 270 | 45 of 128 | 8 | 4-4 | 67.9% | 17.0% (vs 21) |
| h48 | candidate | 1620 ± 270 | 46 of 128 | 8 | 4-4 | 67.9% | 17.0% (vs 21) |
| h49 | candidate | 1620 ± 270 | 47 of 128 | 8 | 4-4 | 67.9% | 17.0% (vs 21) |
| h52 | candidate | 1534 ± 276 | 66 of 128 | 8 | 3-5 | 62.7% | 19.0% (vs 27) |
| h53 | candidate | 1707 ± 276 | 38 of 128 | 8 | 5-3 | 72.8% | 24.1% (vs 21) |
| h54 | candidate | 1696 ± 165 | 40 of 128 | 48 | 29-19 | 72.2% | 23.1% (vs 21) |
| h55 | candidate | 1666 ± 163 | 42 of 128 | 56 | 32-24 | 70.6% | 20.5% (vs 21) |
| h58 | candidate | 1575 ± 292 | 52 of 128 | 8 | 3-5 | 65.2% | 15.2% (vs 22) |
| h59 | candidate | 1620 ± 270 | 48 of 128 | 8 | 4-4 | 67.9% | 17.0% (vs 21) |
| h6 | candidate | 1495 ± 161 | 73 of 128 | 158 | 94-64 | 60.3% | 16.3% (vs 27) |
| h60 | candidate | 1620 ± 270 | 49 of 128 | 8 | 4-4 | 67.9% | 17.0% (vs 21) |
| h61 | candidate | 1781 ± 279 | 28 of 128 | 8 | 5-3 | 76.7% | 25.7% (vs 17) |
| h63 | candidate | 1750 ± 174 | 31 of 128 | 40 | 23-17 | 75.1% | 24.2% (vs 18) |
| h68 | candidate | 1880 ± 303 | 16 of 128 | 8 | 6-2 | 81.4% | 26.0% (vs 12) |
| h7 | candidate | 1552 ± 1348 | 59 of 128 | 8 | 8-0 | 63.8% | 19.1% (vs 26) |
| h72 | candidate | 1880 ± 303 | 17 of 128 | 8 | 6-2 | 81.4% | 26.0% (vs 12) |
| h76 | candidate | 1816 ± 218 | 22 of 128 | 32 | 18-14 | 78.4% | 25.7% (vs 15) |
| h77 | candidate | 2340 ± 771 | 4 of 128 | 16 | 8-8 | 95.1% | 21.9% (vs 2) |
| h78 | candidate | 1880 ± 303 | 18 of 128 | 8 | 6-2 | 81.4% | 26.0% (vs 12) |
| h82 | candidate | 1774 ± 153 | 29 of 128 | 134 | 70-64 | 76.3% | 25.0% (vs 17) |
| h83 | candidate | 1810 ± 321 | 23 of 128 | 8 | 4-4 | 78.1% | 25.1% (vs 15) |
| h84 | candidate | 1810 ± 321 | 24 of 128 | 8 | 4-4 | 78.1% | 25.1% (vs 15) |
| h88 | candidate | 1738 ± 187 | 32 of 128 | 40 | 18-22 | 74.5% | 23.1% (vs 18) |
| h89 | candidate | 1497 ± 1510 | 71 of 128 | 8 | 0-8 | 60.4% | 16.4% (vs 27) |
| h8v5 | candidate | 1727 ± 167 | 37 of 128 | 48 | 31-17 | 73.9% | 26.0% (vs 21) |
| h90 | candidate | 1497 ± 1510 | 72 of 128 | 8 | 0-8 | 60.4% | 16.4% (vs 27) |
| h91 | candidate | 1727 ± 228 | 36 of 128 | 16 | 7-9 | 73.9% | 26.0% (vs 21) |
| rush | sparring | 1297 ± 224 | 95 of 128 | 25 | 6-19 | 47.2% | 18.4% (vs 43) |
| rush4 | sparring | 3105 ± 1307 | 1 of 128 | 30 | 30-0 | 99.6% | - |

Sources (`tools/progress/games.py`):

- local: 1163 games from 67 batch files (skipped: 202 cut before a verdict, 23 init failure, 98 load (robot init failures))
- replica: 910 games (11 archive games skipped, 86 matches from archives, 207 matches from scores), fetched 2026-10-23T07:51:18+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v7) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **spar:rush4** | sparring | 3105 | 1307 | 30 | 30-0 |  |
| 2 | mvpatel2000.Battlecode2019 | field | 2899 | 1255 | 3 | 3-0 |  |
| 3 | moreda-a.BC2019-a31 | field | 2410 | 746 | 6 | 5-1 |  |
| 4 | **cand:h77** | candidate | 2340 | 771 | 16 | 8-8 |  |
| 5 | m-schier.battlecode-2019-wololo | field | 2314 | 629 | 24 | 19-5 | 0% (v6 0-3) |
| 6 | ldcWV.Battlecode-2019 | field | 2135 | 1193 | 6 | 6-0 |  |
| 7 | uvafan.bc2019 | field | 2081 | 347 | 27 | 25-2 | 0% (v6 0-3) |
| 8 | m4reko.bc2019-tmores-angels | field | 2034 | 1486 | 6 | 6-0 |  |
| 9 | spachava753.bc19 | field | 2002 | 1436 | 3 | 3-0 |  |
| 10 | rafekruse.Battlecode-2019-bc19 | field | 2002 | 1436 | 3 | 3-0 |  |
| 11 | j-mao.battlecode-2019 | field | 1995 | 1123 | 6 | 6-0 |  |
| 12 | howard36.Battlecode2019-eco6 | field | 1961 | 1348 | 3 | 3-0 |  |
| 13 | vineetparikh.BigRedBattle~fe3459 | field | 1938 | 540 | 3 | 1-2 |  |
| 14 | IanCoolidge0.battlecode20~69ce88 | field | 1900 | 226 | 33 | 28-5 | 0% (v6 0-3) |
| 15 | **us:v7** | accepted | 1883 | 175 | 48 | 35-13 |  |
| 16 | **cand:h68** | candidate | 1880 | 303 | 8 | 6-2 |  |
| 17 | **cand:h72** | candidate | 1880 | 303 | 8 | 6-2 |  |
| 18 | **cand:h78** | candidate | 1880 | 303 | 8 | 6-2 |  |
| 19 | StoneT2000.BC19-bot1v43 | field | 1848 | 188 | 48 | 40-8 | 17% (v6 1-5) |
| 20 | bqi343.cp-notebook | field | 1821 | 1665 | 3 | 3-0 |  |
| 21 | yujinwunz.battlecode_2019 | field | 1821 | 1665 | 3 | 3-0 |  |
| 22 | **cand:h76** | candidate | 1816 | 218 | 32 | 18-14 |  |
| 23 | **cand:h83** | candidate | 1810 | 321 | 8 | 4-4 |  |
| 24 | **cand:h84** | candidate | 1810 | 321 | 8 | 4-4 |  |
| 25 | **cand:h44** | candidate | 1806 | 300 | 8 | 6-2 |  |
| 26 | StoneT2000.BC19-botfinalsafe | field | 1782 | 171 | 54 | 40-14 | 17% (v6 1-5) |
| 27 | virenvshah.Battlecode2019 | field | 1782 | 1535 | 3 | 3-0 |  |
| 28 | **cand:h61** | candidate | 1781 | 279 | 8 | 5-3 |  |
| 29 | **cand:h82** | candidate | 1774 | 153 | 134 | 70-64 |  |
| 30 | IvanGeffner.BC19-bot6b | field | 1766 | 459 | 9 | 7-2 |  |
| 31 | **cand:h63** | candidate | 1750 | 174 | 40 | 23-17 |  |
| 32 | **cand:h88** | candidate | 1738 | 187 | 40 | 18-22 |  |
| 33 | awesomelemonade.Battlecode2019 | field | 1735 | 227 | 27 | 21-6 | 67% (v6 2-1) |
| 34 | VoidMercy.battlecode-2019~e7dc06 | field | 1729 | 572 | 6 | 5-1 |  |
| 35 | programjames.BC19Bot-seeding | field | 1728 | 1186 | 3 | 3-0 |  |
| 36 | **cand:h91** | candidate | 1727 | 228 | 16 | 7-9 |  |
| 37 | **cand:h8v5** | candidate | 1727 | 167 | 48 | 31-17 |  |
| 38 | **cand:h53** | candidate | 1707 | 276 | 8 | 5-3 |  |
| 39 | **us:v6** | accepted | 1699 | 138 | 282 | 112-170 |  |
| 40 | **cand:h54** | candidate | 1696 | 165 | 48 | 29-19 |  |
| 41 | **cand:h24v5** | candidate | 1675 | 170 | 40 | 23-17 |  |
| 42 | **cand:h55** | candidate | 1666 | 163 | 56 | 32-24 |  |
| 43 | **us:v5** | accepted | 1623 | 132 | 439 | 202-237 |  |
| 44 | **cand:h43** | candidate | 1620 | 270 | 8 | 4-4 |  |
| 45 | **cand:h47** | candidate | 1620 | 270 | 8 | 4-4 |  |
| 46 | **cand:h48** | candidate | 1620 | 270 | 8 | 4-4 |  |
| 47 | **cand:h49** | candidate | 1620 | 270 | 8 | 4-4 |  |
| 48 | **cand:h59** | candidate | 1620 | 270 | 8 | 4-4 |  |
| 49 | **cand:h60** | candidate | 1620 | 270 | 8 | 4-4 |  |
| 50 | abcdefguan.battlecode2019 | field | 1616 | 435 | 9 | 5-4 |  |
| 51 | **cand:h40** | candidate | 1610 | 308 | 8 | 6-2 |  |
| 52 | **cand:h58** | candidate | 1575 | 292 | 8 | 3-5 |  |
| 53 | sunanth123.battlecode19-prorush | field | 1572 | 1315 | 3 | 3-0 |  |
| 54 | **us:v3** | accepted | 1567 | 163 | 191 | 140-51 |  |
| 55 | **cand:h11c** | candidate | 1565 | 210 | 25 | 15-10 |  |
| 56 | NielsKornerup.Battlecode-2019 | field | 1560 | 245 | 27 | 15-12 |  |
| 57 | arya-k.bc19 | field | 1557 | 1368 | 3 | 3-0 |  |
| 58 | cemondr.BC19pdxgroup4 | field | 1557 | 1368 | 3 | 3-0 |  |
| 59 | **cand:h7** | candidate | 1552 | 1348 | 8 | 8-0 |  |
| 60 | **cand:h38** | candidate | 1541 | 322 | 6 | 4-2 |  |
| 61 | **us:v0** | accepted | 1540 | 266 | 38 | 33-5 |  |
| 62 | IanCoolidge0.battlecode20~f649f3 | field | 1537 | 221 | 30 | 21-9 | 67% (v3 2-1) |
| 63 | **cand:h41** | candidate | 1534 | 276 | 8 | 3-5 |  |
| 64 | **cand:h42** | candidate | 1534 | 276 | 8 | 3-5 |  |
| 65 | **cand:h46** | candidate | 1534 | 276 | 8 | 3-5 |  |
| 66 | **cand:h52** | candidate | 1534 | 276 | 8 | 3-5 |  |
| 67 | **cand:h24** | candidate | 1530 | 187 | 40 | 26-14 |  |
| 68 | **cand:h2** | candidate | 1516 | 198 | 54 | 25-29 |  |
| 69 | **cand:h31** | candidate | 1511 | 186 | 40 | 25-15 |  |
| 70 | **cand:h3** | candidate | 1498 | 249 | 19 | 9-10 |  |
| 71 | **cand:h89** | candidate | 1497 | 1510 | 8 | 0-8 |  |
| 72 | **cand:h90** | candidate | 1497 | 1510 | 8 | 0-8 |  |
| 73 | **cand:h6** | candidate | 1495 | 161 | 158 | 94-64 |  |
| 74 | haydenshively.Battle-Code~e1c2fb | field | 1484 | 884 | 9 | 7-2 |  |
| 75 | Tom-CCS.BC19 | field | 1469 | 502 | 12 | 9-3 |  |
| 76 | liwanlin41.examplefuncsplayer | field | 1446 | 887 | 12 | 5-7 |  |
| 77 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1429 | 269 | 21 | 11-10 |  |
| 78 | **us:v4** | accepted | 1422 | 151 | 220 | 83-137 |  |
| 79 | IvanGeffner.BC19-eigthbot | field | 1418 | 336 | 9 | 6-3 |  |
| 80 | rooneyshuman.Battlecode | field | 1397 | 1048 | 12 | 5-7 |  |
| 81 | **us:v2** | accepted | 1390 | 193 | 62 | 30-32 |  |
| 82 | **us:v1** | accepted | 1387 | 200 | 154 | 128-26 |  |
| 83 | jamesrayman.HCN-bot | field | 1384 | 324 | 21 | 9-12 | 100% (v5 3-0) |
| 84 | dndoja.battlecode19 | field | 1372 | 921 | 3 | 1-2 |  |
| 85 | ipercyNC.group6-battlecode | field | 1361 | 468 | 6 | 4-2 |  |
| 86 | **cand:h16r** | candidate | 1353 | 186 | 40 | 16-24 |  |
| 87 | evanyeyeye.battlecode2019~af562c | field | 1351 | 911 | 6 | 1-5 |  |
| 88 | vishwasns99.BC_2019 | field | 1346 | 1175 | 6 | 3-3 |  |
| 89 | unrevre.battlecode | field | 1343 | 1191 | 3 | 0-3 |  |
| 90 | jyurkanin.corn_bc19 | field | 1337 | 928 | 3 | 1-2 |  |
| 91 | rafekruse.Battlecode-2019~2680d4 | field | 1329 | 747 | 3 | 2-1 |  |
| 92 | nhard.examplefuncsplayer | field | 1318 | 1416 | 3 | 0-3 |  |
| 93 | moreda-a.BC2019-t15 | field | 1300 | 1351 | 6 | 0-6 |  |
| 94 | **cand:h18** | candidate | 1297 | 224 | 25 | 6-19 |  |
| 95 | **spar:rush** | sparring | 1297 | 224 | 25 | 6-19 |  |
| 96 | roy-love.onshoreBattleCode2019 | field | 1291 | 1073 | 3 | 1-2 |  |
| 97 | bayoumi17m.BattleCode-2019 | field | 1284 | 678 | 9 | 6-3 |  |
| 98 | 18dcb01.Battlecode19-robot2 | field | 1232 | 363 | 15 | 3-12 |  |
| 99 | CS554-software-engineerin~a575dc | field | 1201 | 177 | 224 | 133-91 | 67% (v5 2-1) |
| 100 | ovkulkarni.battlecode2019~0aa607 | field | 1196 | 664 | 6 | 3-3 |  |
| 101 | CometsTech.battlecode2019 | field | 1182 | 179 | 177 | 90-87 | 100% (v5 3-0) |
| 102 | djkeyes.bc19 | field | 1179 | 1665 | 3 | 0-3 |  |
| 103 | yunaganyh.bc19 | field | 1179 | 1665 | 3 | 0-3 |  |
| 104 | JasonLarson44.2019-Battle~1c7639 | field | 1174 | 288 | 21 | 8-13 | 100% (v3 3-0) |
| 105 | vicennial.BattleCode19 | field | 1125 | 1509 | 6 | 0-6 |  |
| 106 | TestSubjector.BattleCode2~fb22c7 | field | 1084 | 473 | 15 | 10-5 |  |
| 107 | Nydroam.BatteredCod | field | 1077 | 532 | 6 | 3-3 |  |
| 108 | nthistle.battlecode-2019 | field | 1045 | 579 | 21 | 7-14 | 100% (v5 3-0) |
| 109 | jackliu612.Battlecode19 | field | 1017 | 701 | 9 | 6-3 |  |
| 110 | TestSubjector.BattleCode2~e6de74 | field | 969 | 451 | 21 | 11-10 |  |
| 111 | VoidMercy.battlecode-2019-bot | field | 941 | 1155 | 6 | 0-6 |  |
| 112 | ryanhzhao.Battlecode-2019 | field | 806 | 1483 | 3 | 0-3 |  |
| 113 | jamesrayman.HCN-basic-bot | field | 788 | 1129 | 6 | 0-6 |  |
| 114 | SethKitchen.examplefuncsplayer | field | 787 | 613 | 18 | 8-10 |  |
| 115 | OmarTahoun.battle-code | field | 706 | 690 | 15 | 7-8 |  |
| 116 | CometsTech.battlecode2019~187e8c | field | 685 | 470 | 18 | 5-13 |  |
| 117 | asunathanr.asu_bc | field | 651 | 1226 | 9 | 0-9 |  |
| 118 | bovard.battlecode-2019-un~8822c3 | field | 651 | 1226 | 9 | 0-9 |  |
| 119 | DivyanshuSaxena.Battlecode | field | 609 | 379 | 21 | 4-17 |  |
| 120 | jbiewend.Battlecode2019 | field | 542 | 1006 | 9 | 3-6 |  |
| 121 | UpperArlingtonHighSchool.~5e7875 | field | 498 | 1184 | 3 | 0-3 |  |
| 122 | bc19-starter | field | 459 | 272 | 313 | 45-268 | 100% (v3 12-0) |
| 123 | ovkulkarni.battlecode2019~06c610 | field | 459 | 1230 | 3 | 0-3 |  |
| 124 | howard36.Battlecode2019-sprint | field | 419 | 1265 | 6 | 0-6 |  |
| 125 | RyanSharafuddin.Battlecode_2019 | field | 2 | 1198 | 30 | 0-30 |  |
| 126 | jshin313.battlecodebot | field | -43 | 1481 | 3 | 0-3 |  |
| 127 | TheRobotCarlson.battlehac~323871 | field | -67 | 1151 | 15 | 0-15 |  |
| 128 | ArtemUstilov.bc19_CrazyTapok | field | -592 | 1103 | 81 | 0-81 |  |

Replica teams with no recorded game: Nischay-Pro.BattleCode2019, UpperArlingtonHighSchool.~682aa9, VictorButoi.BattleCode201~c4576b, cvxluo.battlecode19, dgh2.bc19-t1, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, haydenshively.Battle-Code~e37b3e, lschaberg.bc19, programjames.BC19Bot-root, sunanth123.battlecode19-mainbot, twitu.bc19-tsp, waylon531.scala_starter.

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | m-schier.battlecode-2019-wololo | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v6 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v7 | cand:h82 | 8 | 6-2 | 75% | local |
| us:v7 | us:v6 | 40 | 29-11 | 72% | local |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
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
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v2 | us:v1 | 14 | 7-7 | 50% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| jamesrayman.HCN-bot | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 72 | 32-40 | 44% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 3 | 2-1 | 67% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
