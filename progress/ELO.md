# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-23 09:11 PDT.

2938 games: 1683 local (VM batches between our builds, candidates, sparring partners and the starter bot), 337 of ours on the galaxy replica and 918 between field bots there (915 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 150 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, moreda-a.BC2019-a31, m-schier.battlecode-2019-wololo, j-mao.battlecode-2019, bqi343.cp-notebook, UpperArlingtonHighSchool.~682aa9, uvafan.bc2019, ldcWV.Battlecode-2019, m4reko.bc2019-tmores-angels, arya-k.bc19, rafekruse.Battlecode-2019-bc19, IanCoolidge0.battlecode20~69ce88, howard36.Battlecode2019-eco6, virenvshah.Battlecode2019, vineetparikh.BigRedBattle~fe3459, lschaberg.bc19, StoneT2000.BC19-bot1v43, cemondr.BC19pdxgroup4, unrevre.battlecode, StoneT2000.BC19-botfinalsafe, IvanGeffner.BC19-bot6b, VoidMercy.battlecode-2019~e7dc06, awesomelemonade.Battlecode2019, dmunozc.bc19-g8-davjasdiv, dmunozc.bc19-g8-bots, yujinwunz.battlecode_2019, abcdefguan.battlecode2019, NielsKornerup.Battlecode-2019, vicennial.BattleCode19, IanCoolidge0.battlecode20~f649f3, 18dcb01.Battlecode19-prea~fb5c48, IvanGeffner.BC19-eigthbot, rafekruse.Battlecode-2019~2680d4, sunanth123.battlecode19-mainbot, Nischay-Pro.BattleCode2019, Tom-CCS.BC19, jamesrayman.HCN-bot, ipercyNC.group6-battlecode, liwanlin41.examplefuncsplayer, dgh2.bc19-t1, moreda-a.BC2019-t15, programjames.BC19Bot-seeding, sunanth123.battlecode19-prorush, cvxluo.battlecode19, programjames.BC19Bot-root, haydenshively.Battle-Code~e1c2fb, evanyeyeye.battlecode2019~af562c, bayoumi17m.BattleCode-2019, jyurkanin.corn_bc19, haydenshively.Battle-Code~e37b3e, ovkulkarni.battlecode2019~0aa607, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, JasonLarson44.2019-Battle~1c7639, Nydroam.BatteredCod, VictorButoi.BattleCode201~c4576b, dndoja.battlecode19, nthistle.battlecode-2019, twitu.bc19-tsp, vishwasns99.BC_2019, spachava753.bc19, ovkulkarni.battlecode2019~06c610, jackliu612.Battlecode19, TestSubjector.BattleCode2~e6de74, 18dcb01.Battlecode19-robot2, TestSubjector.BattleCode2~fb22c7, CometsTech.battlecode2019~187e8c, waylon531.scala_starter, SethKitchen.examplefuncsplayer, OmarTahoun.battle-code, asunathanr.asu_bc, bovard.battlecode-2019-un~8822c3, rooneyshuman.Battlecode, nhard.examplefuncsplayer, DivyanshuSaxena.Battlecode, VoidMercy.battlecode-2019-bot, djkeyes.bc19, bc19-starter, roy-love.onshoreBattleCode2019, jbiewend.Battlecode2019, howard36.Battlecode2019-sprint, UpperArlingtonHighSchool.~5e7875, TheRobotCarlson.battlehac~323871, yunaganyh.bc19, jshin313.battlecodebot, jamesrayman.HCN-basic-bot, ryanhzhao.Battlecode-2019, RyanSharafuddin.Battlecode_2019, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1564 ± 258 | 71 of 150 | 38 | 33-5 | 66.1% | 16.5% (vs 28) |
| v1 | accepted | 1410 ± 190 | 91 of 150 | 154 | 128-26 | 57.2% | 13.9% (vs 34) |
| v2 | accepted | 1408 ± 185 | 92 of 150 | 62 | 30-32 | 57.1% | 13.8% (vs 34) |
| v3 | accepted | 1582 ± 154 | 67 of 150 | 191 | 140-51 | 67.1% | 17.8% (vs 28) |
| v4 | accepted | 1426 ± 143 | 90 of 150 | 220 | 83-137 | 58.2% | 14.8% (vs 34) |
| v5 | accepted | 1618 ± 122 | 57 of 150 | 439 | 202-237 | 69.0% | 18.0% (vs 26) |
| v6 | accepted | 1685 ± 124 | 52 of 150 | 322 | 130-192 | 72.4% | 20.4% (vs 24) |
| v7 | accepted | 1831 ± 136 | 27 of 150 | 546 | 288-258 | 79.1% | 25.6% (vs 18) |
| h100 | candidate | 1820 ± 144 | 28 of 150 | 200 | 97-103 | 78.7% | 24.6% (vs 18) |
| h101 | candidate | 1794 ± 173 | 36 of 150 | 40 | 18-22 | 77.6% | 24.9% (vs 20) |
| h103 | candidate | 1855 ± 169 | 24 of 150 | 43 | 23-20 | 80.2% | 24.8% (vs 16) |
| h104 | candidate | 1876 ± 160 | 18 of 150 | 55 | 28-27 | 81.1% | 25.2% (vs 15) |
| h107 | candidate | 1741 ± 175 | 41 of 150 | 40 | 15-25 | 75.1% | 21.3% (vs 21) |
| h110 | candidate | 1777 ± 174 | 38 of 150 | 40 | 17-23 | 76.8% | 24.4% (vs 21) |
| h111 | candidate | 1864 ± 173 | 23 of 150 | 40 | 22-18 | 80.6% | 25.7% (vs 16) |
| h11c | candidate | 1574 ± 205 | 68 of 150 | 25 | 15-10 | 66.7% | 17.2% (vs 28) |
| h16r | candidate | 1356 ± 180 | 98 of 150 | 40 | 16-24 | 53.9% | 15.5% (vs 39) |
| h18 | candidate | 1306 ± 219 | 101 of 150 | 25 | 6-19 | 50.8% | 14.2% (vs 41) |
| h2 | candidate | 1532 ± 190 | 76 of 150 | 54 | 25-29 | 64.3% | 16.6% (vs 30) |
| h24 | candidate | 1533 ± 181 | 75 of 150 | 40 | 26-14 | 64.4% | 16.6% (vs 30) |
| h24v5 | candidate | 1670 ± 163 | 53 of 150 | 40 | 23-17 | 71.6% | 19.3% (vs 24) |
| h3 | candidate | 1513 ± 244 | 82 of 150 | 19 | 9-10 | 63.3% | 15.4% (vs 30) |
| h31 | candidate | 1514 ± 180 | 81 of 150 | 40 | 25-15 | 63.3% | 15.4% (vs 30) |
| h38 | candidate | 1544 ± 319 | 74 of 150 | 6 | 4-2 | 65.0% | 17.4% (vs 30) |
| h40 | candidate | 1613 ± 305 | 64 of 150 | 8 | 6-2 | 68.7% | 17.5% (vs 26) |
| h41 | candidate | 1529 ± 272 | 77 of 150 | 8 | 3-5 | 64.2% | 16.4% (vs 30) |
| h42 | candidate | 1529 ± 272 | 78 of 150 | 8 | 3-5 | 64.2% | 16.4% (vs 30) |
| h43 | candidate | 1616 ± 265 | 58 of 150 | 8 | 4-4 | 68.9% | 17.7% (vs 26) |
| h44 | candidate | 1801 ± 296 | 33 of 150 | 8 | 6-2 | 77.9% | 25.5% (vs 20) |
| h46 | candidate | 1529 ± 272 | 79 of 150 | 8 | 3-5 | 64.2% | 16.4% (vs 30) |
| h47 | candidate | 1616 ± 265 | 59 of 150 | 8 | 4-4 | 68.9% | 17.7% (vs 26) |
| h48 | candidate | 1616 ± 265 | 60 of 150 | 8 | 4-4 | 68.9% | 17.7% (vs 26) |
| h49 | candidate | 1616 ± 265 | 61 of 150 | 8 | 4-4 | 68.9% | 17.7% (vs 26) |
| h52 | candidate | 1529 ± 272 | 80 of 150 | 8 | 3-5 | 64.2% | 16.4% (vs 30) |
| h53 | candidate | 1702 ± 272 | 49 of 150 | 8 | 5-3 | 73.2% | 20.6% (vs 23) |
| h54 | candidate | 1691 ± 157 | 50 of 150 | 48 | 29-19 | 72.7% | 19.7% (vs 23) |
| h55 | candidate | 1661 ± 155 | 54 of 150 | 56 | 32-24 | 71.2% | 18.6% (vs 24) |
| h58 | candidate | 1571 ± 288 | 69 of 150 | 8 | 3-5 | 66.5% | 17.0% (vs 28) |
| h59 | candidate | 1616 ± 265 | 62 of 150 | 8 | 4-4 | 68.9% | 17.7% (vs 26) |
| h6 | candidate | 1504 ± 153 | 83 of 150 | 158 | 94-64 | 62.8% | 14.8% (vs 30) |
| h60 | candidate | 1616 ± 265 | 63 of 150 | 8 | 4-4 | 68.9% | 17.7% (vs 26) |
| h61 | candidate | 1768 ± 273 | 39 of 150 | 8 | 5-3 | 76.3% | 23.6% (vs 21) |
| h63 | candidate | 1736 ± 164 | 42 of 150 | 40 | 23-17 | 74.9% | 20.9% (vs 21) |
| h64 | candidate | 1719 ± 164 | 47 of 150 | 40 | 22-18 | 74.0% | 22.0% (vs 23) |
| h68 | candidate | 1867 ± 298 | 20 of 150 | 8 | 6-2 | 80.7% | 25.9% (vs 16) |
| h7 | candidate | 1568 ± 1310 | 70 of 150 | 8 | 8-0 | 66.3% | 16.8% (vs 28) |
| h72 | candidate | 1867 ± 298 | 21 of 150 | 8 | 6-2 | 80.7% | 25.9% (vs 16) |
| h76 | candidate | 1803 ± 211 | 32 of 150 | 32 | 18-14 | 78.0% | 25.7% (vs 20) |
| h77 | candidate | 2326 ± 770 | 6 of 150 | 16 | 8-8 | 93.5% | 15.4% (vs 4) |
| h78 | candidate | 1867 ± 298 | 22 of 150 | 8 | 6-2 | 80.7% | 25.9% (vs 16) |
| h82 | candidate | 1762 ± 142 | 40 of 150 | 134 | 70-64 | 76.1% | 23.1% (vs 21) |
| h83 | candidate | 1797 ± 316 | 34 of 150 | 8 | 4-4 | 77.7% | 25.2% (vs 20) |
| h84 | candidate | 1797 ± 316 | 35 of 150 | 8 | 4-4 | 77.7% | 25.2% (vs 20) |
| h88 | candidate | 1726 ± 178 | 45 of 150 | 40 | 18-22 | 74.4% | 22.6% (vs 23) |
| h89 | candidate | 1497 ± 1510 | 84 of 150 | 8 | 0-8 | 62.4% | 14.3% (vs 30) |
| h8v5 | candidate | 1722 ± 159 | 46 of 150 | 48 | 31-17 | 74.2% | 22.2% (vs 23) |
| h90 | candidate | 1497 ± 1510 | 85 of 150 | 8 | 0-8 | 62.4% | 14.3% (vs 30) |
| h91 | candidate | 1716 ± 221 | 48 of 150 | 16 | 7-9 | 73.9% | 21.7% (vs 23) |
| h96 | candidate | 1807 ± 160 | 30 of 150 | 55 | 23-32 | 78.1% | 24.8% (vs 19) |
| rush | sparring | 1306 ± 219 | 102 of 150 | 25 | 6-19 | 50.8% | 14.2% (vs 41) |
| rush4 | sparring | 3091 ± 1308 | 2 of 150 | 30 | 30-0 | 98.9% | 22.1% (vs 1) |

Sources (`tools/progress/games.py`):

- local: 1683 games from 80 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 1255 games (11 archive games skipped, 103 matches from archives, 305 matches from scores), fetched 2026-10-23T16:12:31+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v7) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 3310 | 1265 | 12 | 12-0 |  |
| 2 | **spar:rush4** | sparring | 3091 | 1308 | 30 | 30-0 |  |
| 3 | moreda-a.BC2019-a31 | field | 2643 | 712 | 12 | 8-4 |  |
| 4 | m-schier.battlecode-2019-wololo | field | 2548 | 640 | 36 | 31-5 | 0% (v7 0-3) |
| 5 | j-mao.battlecode-2019 | field | 2511 | 1384 | 12 | 12-0 |  |
| 6 | **cand:h77** | candidate | 2326 | 770 | 16 | 8-8 |  |
| 7 | bqi343.cp-notebook | field | 2271 | 1284 | 12 | 12-0 |  |
| 8 | UpperArlingtonHighSchool.~682aa9 | field | 2203 | 1154 | 12 | 12-0 |  |
| 9 | uvafan.bc2019 | field | 2147 | 257 | 36 | 33-3 | 0% (v7 0-3) |
| 10 | ldcWV.Battlecode-2019 | field | 2009 | 697 | 12 | 11-1 |  |
| 11 | m4reko.bc2019-tmores-angels | field | 1973 | 713 | 12 | 8-4 |  |
| 12 | arya-k.bc19 | field | 1962 | 1188 | 12 | 12-0 |  |
| 13 | rafekruse.Battlecode-2019-bc19 | field | 1942 | 1139 | 12 | 12-0 |  |
| 14 | IanCoolidge0.battlecode20~69ce88 | field | 1927 | 187 | 45 | 37-8 | 33% (v7 1-2) |
| 15 | howard36.Battlecode2019-eco6 | field | 1908 | 955 | 12 | 9-3 |  |
| 16 | virenvshah.Battlecode2019 | field | 1890 | 437 | 12 | 9-3 |  |
| 17 | vineetparikh.BigRedBattle~fe3459 | field | 1881 | 433 | 12 | 8-4 |  |
| 18 | **cand:h104** | candidate | 1876 | 160 | 55 | 28-27 |  |
| 19 | lschaberg.bc19 | field | 1871 | 687 | 12 | 8-4 |  |
| 20 | **cand:h68** | candidate | 1867 | 298 | 8 | 6-2 |  |
| 21 | **cand:h72** | candidate | 1867 | 298 | 8 | 6-2 |  |
| 22 | **cand:h78** | candidate | 1867 | 298 | 8 | 6-2 |  |
| 23 | **cand:h111** | candidate | 1864 | 173 | 40 | 22-18 |  |
| 24 | **cand:h103** | candidate | 1855 | 169 | 43 | 23-20 |  |
| 25 | StoneT2000.BC19-bot1v43 | field | 1847 | 160 | 60 | 46-14 | 33% (v7 1-2) |
| 26 | cemondr.BC19pdxgroup4 | field | 1836 | 757 | 12 | 11-1 |  |
| 27 | **us:v7** | accepted | 1831 | 136 | 546 | 288-258 |  |
| 28 | **cand:h100** | candidate | 1820 | 144 | 200 | 97-103 |  |
| 29 | unrevre.battlecode | field | 1819 | 418 | 12 | 7-5 |  |
| 30 | **cand:h96** | candidate | 1807 | 160 | 55 | 23-32 |  |
| 31 | StoneT2000.BC19-botfinalsafe | field | 1804 | 153 | 63 | 45-18 | 67% (v7 2-1) |
| 32 | **cand:h76** | candidate | 1803 | 211 | 32 | 18-14 |  |
| 33 | **cand:h44** | candidate | 1801 | 296 | 8 | 6-2 |  |
| 34 | **cand:h83** | candidate | 1797 | 316 | 8 | 4-4 |  |
| 35 | **cand:h84** | candidate | 1797 | 316 | 8 | 4-4 |  |
| 36 | **cand:h101** | candidate | 1794 | 173 | 40 | 18-22 |  |
| 37 | IvanGeffner.BC19-bot6b | field | 1794 | 441 | 9 | 7-2 |  |
| 38 | **cand:h110** | candidate | 1777 | 174 | 40 | 17-23 |  |
| 39 | **cand:h61** | candidate | 1768 | 273 | 8 | 5-3 |  |
| 40 | **cand:h82** | candidate | 1762 | 142 | 134 | 70-64 |  |
| 41 | **cand:h107** | candidate | 1741 | 175 | 40 | 15-25 |  |
| 42 | **cand:h63** | candidate | 1736 | 164 | 40 | 23-17 |  |
| 43 | VoidMercy.battlecode-2019~e7dc06 | field | 1733 | 548 | 12 | 11-1 |  |
| 44 | awesomelemonade.Battlecode2019 | field | 1727 | 201 | 30 | 22-8 | 67% (v7 2-1) |
| 45 | **cand:h88** | candidate | 1726 | 178 | 40 | 18-22 |  |
| 46 | **cand:h8v5** | candidate | 1722 | 159 | 48 | 31-17 |  |
| 47 | **cand:h64** | candidate | 1719 | 164 | 40 | 22-18 |  |
| 48 | **cand:h91** | candidate | 1716 | 221 | 16 | 7-9 |  |
| 49 | **cand:h53** | candidate | 1702 | 272 | 8 | 5-3 |  |
| 50 | **cand:h54** | candidate | 1691 | 157 | 48 | 29-19 |  |
| 51 | dmunozc.bc19-g8-davjasdiv | field | 1687 | 687 | 12 | 8-4 |  |
| 52 | **us:v6** | accepted | 1685 | 124 | 322 | 130-192 |  |
| 53 | **cand:h24v5** | candidate | 1670 | 163 | 40 | 23-17 |  |
| 54 | **cand:h55** | candidate | 1661 | 155 | 56 | 32-24 |  |
| 55 | dmunozc.bc19-g8-bots | field | 1651 | 723 | 12 | 7-5 |  |
| 56 | yujinwunz.battlecode_2019 | field | 1620 | 1239 | 12 | 12-0 |  |
| 57 | **us:v5** | accepted | 1618 | 122 | 439 | 202-237 |  |
| 58 | **cand:h43** | candidate | 1616 | 265 | 8 | 4-4 |  |
| 59 | **cand:h47** | candidate | 1616 | 265 | 8 | 4-4 |  |
| 60 | **cand:h48** | candidate | 1616 | 265 | 8 | 4-4 |  |
| 61 | **cand:h49** | candidate | 1616 | 265 | 8 | 4-4 |  |
| 62 | **cand:h59** | candidate | 1616 | 265 | 8 | 4-4 |  |
| 63 | **cand:h60** | candidate | 1616 | 265 | 8 | 4-4 |  |
| 64 | **cand:h40** | candidate | 1613 | 305 | 8 | 6-2 |  |
| 65 | abcdefguan.battlecode2019 | field | 1595 | 417 | 12 | 5-7 |  |
| 66 | NielsKornerup.Battlecode-2019 | field | 1591 | 209 | 39 | 23-16 |  |
| 67 | **us:v3** | accepted | 1582 | 154 | 191 | 140-51 |  |
| 68 | **cand:h11c** | candidate | 1574 | 205 | 25 | 15-10 |  |
| 69 | **cand:h58** | candidate | 1571 | 288 | 8 | 3-5 |  |
| 70 | **cand:h7** | candidate | 1568 | 1310 | 8 | 8-0 |  |
| 71 | **us:v0** | accepted | 1564 | 258 | 38 | 33-5 |  |
| 72 | vicennial.BattleCode19 | field | 1557 | 480 | 12 | 4-8 |  |
| 73 | IanCoolidge0.battlecode20~f649f3 | field | 1550 | 209 | 33 | 24-9 | 67% (v3 2-1) |
| 74 | **cand:h38** | candidate | 1544 | 319 | 6 | 4-2 |  |
| 75 | **cand:h24** | candidate | 1533 | 181 | 40 | 26-14 |  |
| 76 | **cand:h2** | candidate | 1532 | 190 | 54 | 25-29 |  |
| 77 | **cand:h41** | candidate | 1529 | 272 | 8 | 3-5 |  |
| 78 | **cand:h42** | candidate | 1529 | 272 | 8 | 3-5 |  |
| 79 | **cand:h46** | candidate | 1529 | 272 | 8 | 3-5 |  |
| 80 | **cand:h52** | candidate | 1529 | 272 | 8 | 3-5 |  |
| 81 | **cand:h31** | candidate | 1514 | 180 | 40 | 25-15 |  |
| 82 | **cand:h3** | candidate | 1513 | 244 | 19 | 9-10 |  |
| 83 | **cand:h6** | candidate | 1504 | 153 | 158 | 94-64 |  |
| 84 | **cand:h89** | candidate | 1497 | 1510 | 8 | 0-8 |  |
| 85 | **cand:h90** | candidate | 1497 | 1510 | 8 | 0-8 |  |
| 86 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1458 | 219 | 30 | 17-13 |  |
| 87 | IvanGeffner.BC19-eigthbot | field | 1456 | 324 | 9 | 6-3 |  |
| 88 | rafekruse.Battlecode-2019~2680d4 | field | 1434 | 519 | 12 | 10-2 |  |
| 89 | sunanth123.battlecode19-mainbot | field | 1426 | 498 | 9 | 8-1 |  |
| 90 | **us:v4** | accepted | 1426 | 143 | 220 | 83-137 |  |
| 91 | **us:v1** | accepted | 1410 | 190 | 154 | 128-26 |  |
| 92 | **us:v2** | accepted | 1408 | 185 | 62 | 30-32 |  |
| 93 | Nischay-Pro.BattleCode2019 | field | 1401 | 495 | 9 | 6-3 |  |
| 94 | Tom-CCS.BC19 | field | 1399 | 446 | 21 | 15-6 |  |
| 95 | jamesrayman.HCN-bot | field | 1391 | 313 | 21 | 9-12 | 100% (v5 3-0) |
| 96 | ipercyNC.group6-battlecode | field | 1373 | 449 | 12 | 7-5 |  |
| 97 | liwanlin41.examplefuncsplayer | field | 1368 | 778 | 12 | 5-7 |  |
| 98 | **cand:h16r** | candidate | 1356 | 180 | 40 | 16-24 |  |
| 99 | dgh2.bc19-t1 | field | 1355 | 737 | 12 | 1-11 |  |
| 100 | moreda-a.BC2019-t15 | field | 1343 | 973 | 12 | 3-9 |  |
| 101 | **cand:h18** | candidate | 1306 | 219 | 25 | 6-19 |  |
| 102 | **spar:rush** | sparring | 1306 | 219 | 25 | 6-19 |  |
| 103 | programjames.BC19Bot-seeding | field | 1295 | 489 | 12 | 7-5 |  |
| 104 | sunanth123.battlecode19-prorush | field | 1285 | 346 | 12 | 5-7 |  |
| 105 | cvxluo.battlecode19 | field | 1271 | 496 | 9 | 2-7 |  |
| 106 | programjames.BC19Bot-root | field | 1268 | 517 | 12 | 6-6 |  |
| 107 | haydenshively.Battle-Code~e1c2fb | field | 1267 | 679 | 12 | 8-4 |  |
| 108 | evanyeyeye.battlecode2019~af562c | field | 1261 | 683 | 12 | 5-7 |  |
| 109 | bayoumi17m.BattleCode-2019 | field | 1256 | 689 | 12 | 6-6 |  |
| 110 | jyurkanin.corn_bc19 | field | 1252 | 777 | 12 | 7-5 |  |
| 111 | haydenshively.Battle-Code~e37b3e | field | 1240 | 670 | 12 | 3-9 |  |
| 112 | ovkulkarni.battlecode2019~0aa607 | field | 1228 | 487 | 12 | 6-6 |  |
| 113 | CS554-software-engineerin~a575dc | field | 1226 | 165 | 227 | 135-92 | 67% (v5 2-1) |
| 114 | CometsTech.battlecode2019 | field | 1203 | 167 | 183 | 91-92 | 100% (v5 3-0) |
| 115 | JasonLarson44.2019-Battle~1c7639 | field | 1190 | 280 | 21 | 8-13 | 100% (v3 3-0) |
| 116 | Nydroam.BatteredCod | field | 1186 | 446 | 6 | 3-3 |  |
| 117 | VictorButoi.BattleCode201~c4576b | field | 1179 | 888 | 12 | 3-9 |  |
| 118 | dndoja.battlecode19 | field | 1160 | 709 | 12 | 5-7 |  |
| 119 | nthistle.battlecode-2019 | field | 1133 | 447 | 21 | 7-14 | 100% (v5 3-0) |
| 120 | twitu.bc19-tsp | field | 1128 | 551 | 9 | 1-8 |  |
| 121 | vishwasns99.BC_2019 | field | 1121 | 1114 | 12 | 3-9 |  |
| 122 | spachava753.bc19 | field | 1100 | 590 | 12 | 6-6 |  |
| 123 | ovkulkarni.battlecode2019~06c610 | field | 1071 | 496 | 12 | 3-9 |  |
| 124 | jackliu612.Battlecode19 | field | 1030 | 638 | 12 | 9-3 |  |
| 125 | TestSubjector.BattleCode2~e6de74 | field | 1021 | 319 | 27 | 15-12 |  |
| 126 | 18dcb01.Battlecode19-robot2 | field | 974 | 336 | 27 | 9-18 |  |
| 127 | TestSubjector.BattleCode2~fb22c7 | field | 918 | 419 | 24 | 18-6 |  |
| 128 | CometsTech.battlecode2019~187e8c | field | 886 | 331 | 24 | 9-15 |  |
| 129 | waylon531.scala_starter | field | 820 | 543 | 12 | 4-8 |  |
| 130 | SethKitchen.examplefuncsplayer | field | 812 | 420 | 21 | 8-13 |  |
| 131 | OmarTahoun.battle-code | field | 735 | 381 | 21 | 8-13 |  |
| 132 | asunathanr.asu_bc | field | 653 | 1254 | 12 | 0-12 |  |
| 133 | bovard.battlecode-2019-un~8822c3 | field | 648 | 1244 | 12 | 0-12 |  |
| 134 | rooneyshuman.Battlecode | field | 623 | 850 | 12 | 5-7 |  |
| 135 | nhard.examplefuncsplayer | field | 590 | 1190 | 12 | 0-12 |  |
| 136 | DivyanshuSaxena.Battlecode | field | 575 | 296 | 27 | 7-20 |  |
| 137 | VoidMercy.battlecode-2019-bot | field | 569 | 1341 | 12 | 0-12 |  |
| 138 | djkeyes.bc19 | field | 559 | 1276 | 12 | 0-12 |  |
| 139 | bc19-starter | field | 523 | 230 | 322 | 50-272 | 100% (v3 12-0) |
| 140 | roy-love.onshoreBattleCode2019 | field | 515 | 864 | 12 | 4-8 |  |
| 141 | jbiewend.Battlecode2019 | field | 503 | 928 | 12 | 3-9 |  |
| 142 | howard36.Battlecode2019-sprint | field | 503 | 912 | 12 | 3-9 |  |
| 143 | UpperArlingtonHighSchool.~5e7875 | field | 423 | 876 | 12 | 3-9 |  |
| 144 | TheRobotCarlson.battlehac~323871 | field | 204 | 399 | 24 | 1-23 |  |
| 145 | yunaganyh.bc19 | field | 152 | 1174 | 12 | 0-12 |  |
| 146 | jshin313.battlecodebot | field | -84 | 1423 | 12 | 0-12 |  |
| 147 | jamesrayman.HCN-basic-bot | field | -92 | 1397 | 12 | 0-12 |  |
| 148 | ryanhzhao.Battlecode-2019 | field | -148 | 1365 | 12 | 0-12 |  |
| 149 | RyanSharafuddin.Battlecode_2019 | field | -227 | 1248 | 39 | 0-39 |  |
| 150 | ArtemUstilov.bc19_CrazyTapok | field | -529 | 1095 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| moreda-a.BC2019-a31 | m-schier.battlecode-2019-wololo | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h104 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v7 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h104 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v6 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h104 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h104 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h103 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| StoneT2000.BC19-bot1v43 | us:v7 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
| us:v7 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| us:v7 | cand:h101 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h110 | 40 | 23-17 | 57% | local |
| us:v7 | cand:h82 | 8 | 6-2 | 75% | local |
| us:v7 | cand:h107 | 40 | 25-15 | 62% | local |
| us:v7 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v7 | us:v6 | 40 | 29-11 | 72% | local |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cand:h96 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
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
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h82 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| dmunozc.bc19-g8-davjasdiv | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
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
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| us:v3 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| vicennial.BattleCode19 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 3 | 1-2 | 33% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 6 | 3-3 | 50% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 3 | 2-1 | 67% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
