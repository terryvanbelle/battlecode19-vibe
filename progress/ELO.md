# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-24 08:52 PDT.

5384 games: 3151 local (VM batches between our builds, candidates, sparring partners and the starter bot), 739 of ours on the galaxy replica and 1494 between field bots there (1491 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 188 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, m-schier.battlecode-2019-wololo, uvafan.bc2019, rafekruse.Battlecode-2019-bc19, yujinwunz.battlecode_2019, VoidMercy.battlecode-2019~e7dc06, j-mao.battlecode-2019, arya-k.bc19, IanCoolidge0.battlecode20~69ce88, moreda-a.BC2019-a31, StoneT2000.BC19-bot1v43, StoneT2000.BC19-botfinalsafe, awesomelemonade.Battlecode2019, bqi343.cp-notebook, virenvshah.Battlecode2019, vineetparikh.BigRedBattle~fe3459, rafekruse.Battlecode-2019~2680d4, IvanGeffner.BC19-bot6b, ldcWV.Battlecode-2019, IanCoolidge0.battlecode20~f649f3, howard36.Battlecode2019-eco6, UpperArlingtonHighSchool.~682aa9, cemondr.BC19pdxgroup4, Nischay-Pro.BattleCode2019, NielsKornerup.Battlecode-2019, unrevre.battlecode, abcdefguan.battlecode2019, lschaberg.bc19, ovkulkarni.battlecode2019~0aa607, IvanGeffner.BC19-eigthbot, m4reko.bc2019-tmores-angels, dmunozc.bc19-g8-davjasdiv, programjames.BC19Bot-seeding, Tom-CCS.BC19, sunanth123.battlecode19-mainbot, dmunozc.bc19-g8-bots, programjames.BC19Bot-root, ovkulkarni.battlecode2019~06c610, 18dcb01.Battlecode19-prea~fb5c48, nthistle.battlecode-2019, cvxluo.battlecode19, ipercyNC.group6-battlecode, sunanth123.battlecode19-prorush, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, UpperArlingtonHighSchool.~5e7875, Nydroam.BatteredCod, jamesrayman.HCN-bot, evanyeyeye.battlecode2019~af562c, moreda-a.BC2019-t15, JasonLarson44.2019-Battle~1c7639, bayoumi17m.BattleCode-2019, vicennial.BattleCode19, twitu.bc19-tsp, TestSubjector.BattleCode2~fb22c7, haydenshively.Battle-Code~e1c2fb, 18dcb01.Battlecode19-robot2, haydenshively.Battle-Code~e37b3e, TestSubjector.BattleCode2~e6de74, jackliu612.Battlecode19, dgh2.bc19-t1, spachava753.bc19, liwanlin41.examplefuncsplayer, dndoja.battlecode19, asunathanr.asu_bc, rooneyshuman.Battlecode, CometsTech.battlecode2019~187e8c, SethKitchen.examplefuncsplayer, bovard.battlecode-2019-un~8822c3, roy-love.onshoreBattleCode2019, VictorButoi.BattleCode201~c4576b, OmarTahoun.battle-code, jyurkanin.corn_bc19, DivyanshuSaxena.Battlecode, howard36.Battlecode2019-sprint, waylon531.scala_starter, vishwasns99.BC_2019, bc19-starter, VoidMercy.battlecode-2019-bot, nhard.examplefuncsplayer, ryanhzhao.Battlecode-2019, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, djkeyes.bc19, TheRobotCarlson.battlehac~323871, jamesrayman.HCN-basic-bot, yunaganyh.bc19, jshin313.battlecodebot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1588 ± 232 | 88 of 188 | 38 | 33-5 | 71.7% | 26.6% (vs 24) |
| v1 | accepted | 1436 ± 151 | 128 of 188 | 154 | 128-26 | 62.1% | 22.3% (vs 36) |
| v2 | accepted | 1423 ± 149 | 129 of 188 | 62 | 30-32 | 61.3% | 21.2% (vs 36) |
| v3 | accepted | 1592 ± 111 | 85 of 188 | 191 | 140-51 | 72.0% | 26.0% (vs 23) |
| v4 | accepted | 1373 ± 111 | 131 of 188 | 220 | 83-137 | 58.1% | 18.0% (vs 37) |
| v5 | accepted | 1528 ± 80 | 103 of 188 | 439 | 202-237 | 68.0% | 25.3% (vs 29) |
| v6 | accepted | 1560 ± 76 | 95 of 188 | 322 | 130-192 | 70.0% | 25.7% (vs 26) |
| v7 | accepted | 1705 ± 63 | 47 of 188 | 1804 | 927-877 | 78.7% | 28.9% (vs 14) |
| v8 | accepted | 1736 ± 100 | 37 of 188 | 228 | 102-126 | 80.5% | 32.4% (vs 14) |
| block | candidate | 1773 ± 166 | 18 of 188 | 20 | 12-8 | 82.4% | 32.4% (vs 11) |
| camp | candidate | 1773 ± 166 | 19 of 188 | 20 | 12-8 | 82.4% | 32.4% (vs 11) |
| h100 | candidate | 1694 ± 79 | 52 of 188 | 200 | 97-103 | 78.1% | 31.5% (vs 17) |
| h101 | candidate | 1669 ± 124 | 62 of 188 | 40 | 18-22 | 76.7% | 31.6% (vs 20) |
| h103 | candidate | 1725 ± 100 | 40 of 188 | 76 | 33-43 | 79.9% | 31.1% (vs 14) |
| h104 | candidate | 1737 ± 109 | 34 of 188 | 58 | 28-30 | 80.5% | 32.4% (vs 14) |
| h107 | candidate | 1616 ± 127 | 76 of 188 | 40 | 15-25 | 73.4% | 28.5% (vs 23) |
| h110 | candidate | 1652 ± 125 | 66 of 188 | 40 | 17-23 | 75.6% | 29.6% (vs 20) |
| h111 | candidate | 1737 ± 109 | 35 of 188 | 58 | 28-30 | 80.5% | 32.4% (vs 14) |
| h112 | candidate | 1737 ± 109 | 36 of 188 | 58 | 28-30 | 80.5% | 32.4% (vs 14) |
| h113 | candidate | 1652 ± 125 | 67 of 188 | 40 | 17-23 | 75.6% | 29.6% (vs 20) |
| h114 | candidate | 1634 ± 126 | 72 of 188 | 40 | 16-24 | 74.6% | 29.6% (vs 22) |
| h115 | candidate | 1721 ± 124 | 41 of 188 | 40 | 21-19 | 79.6% | 30.7% (vs 14) |
| h116 | candidate | 1634 ± 126 | 73 of 188 | 40 | 16-24 | 74.6% | 29.6% (vs 22) |
| h118 | candidate | 1704 ± 124 | 49 of 188 | 40 | 20-20 | 78.7% | 30.2% (vs 15) |
| h11c | candidate | 1551 ± 182 | 97 of 188 | 25 | 15-10 | 69.4% | 25.7% (vs 27) |
| h121 | candidate | 1685 ± 110 | 56 of 188 | 58 | 24-34 | 77.6% | 32.5% (vs 19) |
| h123 | candidate | 1672 ± 110 | 61 of 188 | 58 | 23-35 | 76.8% | 31.9% (vs 20) |
| h124 | candidate | 1669 ± 124 | 63 of 188 | 40 | 18-22 | 76.7% | 31.6% (vs 20) |
| h125 | candidate | 1669 ± 124 | 64 of 188 | 40 | 18-22 | 76.7% | 31.6% (vs 20) |
| h126 | candidate | 1742 ± 97 | 30 of 188 | 98 | 49-49 | 80.8% | 31.7% (vs 13) |
| h127 | candidate | 1731 ± 97 | 39 of 188 | 98 | 47-51 | 80.2% | 31.8% (vs 14) |
| h128 | candidate | 1805 ± 115 | 11 of 188 | 54 | 23-31 | 84.1% | 32.9% (vs 9) |
| h129 | candidate | 1536 ± 135 | 100 of 188 | 40 | 11-29 | 68.5% | 24.3% (vs 27) |
| h130 | candidate | 1749 ± 109 | 26 of 188 | 58 | 29-29 | 81.2% | 32.6% (vs 13) |
| h131 | candidate | 1721 ± 124 | 42 of 188 | 40 | 21-19 | 79.6% | 30.7% (vs 14) |
| h132 | candidate | 1756 ± 125 | 24 of 188 | 40 | 23-17 | 81.5% | 32.0% (vs 12) |
| h133 | candidate | 1739 ± 124 | 31 of 188 | 40 | 22-18 | 80.6% | 31.3% (vs 13) |
| h134 | candidate | 1597 ± 128 | 83 of 188 | 40 | 14-26 | 72.3% | 26.5% (vs 23) |
| h135 | candidate | 1711 ± 109 | 46 of 188 | 58 | 26-32 | 79.1% | 29.5% (vs 14) |
| h136 | candidate | 1715 ± 100 | 44 of 188 | 76 | 32-44 | 79.3% | 30.0% (vs 14) |
| h137 | candidate | 1669 ± 124 | 65 of 188 | 40 | 18-22 | 76.7% | 31.6% (vs 20) |
| h138 | candidate | 1721 ± 124 | 43 of 188 | 40 | 21-19 | 79.6% | 30.7% (vs 14) |
| h139 | candidate | 1765 ± 100 | 21 of 188 | 76 | 37-39 | 82.0% | 33.0% (vs 12) |
| h140 | candidate | 1762 ± 109 | 22 of 188 | 58 | 30-28 | 81.8% | 32.6% (vs 12) |
| h141 | candidate | 1775 ± 109 | 16 of 188 | 58 | 31-27 | 82.5% | 32.6% (vs 11) |
| h142 | candidate | 1739 ± 124 | 32 of 188 | 40 | 22-18 | 80.6% | 31.3% (vs 13) |
| h143 | candidate | 1774 ± 126 | 17 of 188 | 40 | 24-16 | 82.5% | 32.5% (vs 11) |
| h144 | candidate | 1616 ± 127 | 77 of 188 | 40 | 15-25 | 73.4% | 28.5% (vs 23) |
| h145 | candidate | 1797 ± 122 | 13 of 188 | 58 | 31-27 | 83.7% | 33.8% (vs 10) |
| h146 | candidate | 1759 ± 122 | 23 of 188 | 58 | 28-30 | 81.7% | 32.3% (vs 12) |
| h147 | candidate | 1848 ± 144 | 8 of 188 | 43 | 28-15 | 86.1% | 33.6% (vs 7) |
| h148 | candidate | 1788 ± 147 | 15 of 188 | 40 | 23-17 | 83.2% | 34.1% (vs 11) |
| h149 | candidate | 1735 ± 162 | 38 of 188 | 28 | 14-14 | 80.4% | 32.2% (vs 14) |
| h16r | candidate | 1303 ± 155 | 135 of 188 | 40 | 16-24 | 53.8% | 15.4% (vs 40) |
| h18 | candidate | 1283 ± 198 | 138 of 188 | 25 | 6-19 | 52.5% | 15.8% (vs 42) |
| h2 | candidate | 1542 ± 159 | 98 of 188 | 54 | 25-29 | 68.9% | 24.8% (vs 27) |
| h24 | candidate | 1480 ± 157 | 117 of 188 | 40 | 26-14 | 65.0% | 23.2% (vs 32) |
| h24v5 | candidate | 1580 ± 134 | 89 of 188 | 40 | 23-17 | 71.3% | 25.8% (vs 24) |
| h3 | candidate | 1523 ± 221 | 111 of 188 | 19 | 9-10 | 67.7% | 25.6% (vs 30) |
| h31 | candidate | 1462 ± 156 | 122 of 188 | 40 | 25-15 | 63.8% | 23.9% (vs 35) |
| h38 | candidate | 1493 ± 307 | 113 of 188 | 6 | 4-2 | 65.8% | 23.6% (vs 31) |
| h40 | candidate | 1562 ± 292 | 94 of 188 | 8 | 6-2 | 70.1% | 25.9% (vs 26) |
| h41 | candidate | 1441 ± 256 | 124 of 188 | 8 | 3-5 | 62.5% | 22.8% (vs 36) |
| h42 | candidate | 1441 ± 256 | 125 of 188 | 8 | 3-5 | 62.5% | 22.8% (vs 36) |
| h43 | candidate | 1528 ± 249 | 104 of 188 | 8 | 4-4 | 68.0% | 25.2% (vs 29) |
| h44 | candidate | 1713 ± 282 | 45 of 188 | 8 | 6-2 | 79.2% | 29.7% (vs 14) |
| h46 | candidate | 1441 ± 256 | 126 of 188 | 8 | 3-5 | 62.5% | 22.8% (vs 36) |
| h47 | candidate | 1528 ± 249 | 105 of 188 | 8 | 4-4 | 68.0% | 25.2% (vs 29) |
| h48 | candidate | 1528 ± 249 | 106 of 188 | 8 | 4-4 | 68.0% | 25.2% (vs 29) |
| h49 | candidate | 1528 ± 249 | 107 of 188 | 8 | 4-4 | 68.0% | 25.2% (vs 29) |
| h52 | candidate | 1441 ± 256 | 127 of 188 | 8 | 3-5 | 62.5% | 22.8% (vs 36) |
| h53 | candidate | 1614 ± 256 | 79 of 188 | 8 | 5-3 | 73.4% | 28.3% (vs 23) |
| h54 | candidate | 1601 ± 127 | 82 of 188 | 48 | 29-19 | 72.6% | 27.0% (vs 23) |
| h55 | candidate | 1572 ± 126 | 92 of 188 | 56 | 32-24 | 70.7% | 25.9% (vs 25) |
| h58 | candidate | 1483 ± 273 | 115 of 188 | 8 | 3-5 | 65.2% | 23.5% (vs 32) |
| h59 | candidate | 1528 ± 249 | 108 of 188 | 8 | 4-4 | 68.0% | 25.2% (vs 29) |
| h6 | candidate | 1481 ± 121 | 116 of 188 | 158 | 94-64 | 65.0% | 23.3% (vs 32) |
| h60 | candidate | 1528 ± 249 | 109 of 188 | 8 | 4-4 | 68.0% | 25.2% (vs 29) |
| h61 | candidate | 1645 ± 255 | 70 of 188 | 8 | 5-3 | 75.2% | 29.9% (vs 21) |
| h63 | candidate | 1612 ± 132 | 80 of 188 | 40 | 23-17 | 73.2% | 28.1% (vs 23) |
| h64 | candidate | 1594 ± 132 | 84 of 188 | 40 | 22-18 | 72.1% | 26.3% (vs 23) |
| h68 | candidate | 1744 ± 281 | 27 of 188 | 8 | 6-2 | 80.9% | 31.9% (vs 13) |
| h7 | candidate | 1541 ± 1376 | 99 of 188 | 8 | 8-0 | 68.8% | 24.7% (vs 27) |
| h72 | candidate | 1744 ± 281 | 28 of 188 | 8 | 6-2 | 80.9% | 31.9% (vs 13) |
| h76 | candidate | 1688 ± 188 | 54 of 188 | 32 | 18-14 | 77.8% | 31.8% (vs 18) |
| h77 | candidate | 1573 ± 190 | 91 of 188 | 16 | 8-8 | 70.8% | 26.1% (vs 25) |
| h78 | candidate | 1744 ± 281 | 29 of 188 | 8 | 6-2 | 80.9% | 31.9% (vs 13) |
| h82 | candidate | 1650 ± 103 | 68 of 188 | 134 | 70-64 | 75.5% | 29.4% (vs 20) |
| h83 | candidate | 1684 ± 301 | 59 of 188 | 8 | 4-4 | 77.5% | 32.3% (vs 19) |
| h84 | candidate | 1684 ± 301 | 58 of 188 | 8 | 4-4 | 77.5% | 32.3% (vs 19) |
| h88 | candidate | 1614 ± 148 | 78 of 188 | 40 | 18-22 | 73.4% | 28.4% (vs 23) |
| h89 | candidate | 822 ± 1086 | 165 of 188 | 8 | 0-8 | 28.2% | 8.6% (vs 67) |
| h8v5 | candidate | 1632 ± 129 | 74 of 188 | 48 | 31-17 | 74.4% | 29.3% (vs 22) |
| h90 | candidate | 822 ± 1086 | 166 of 188 | 8 | 0-8 | 28.2% | 8.6% (vs 67) |
| h91 | candidate | 1605 ± 198 | 81 of 188 | 16 | 7-9 | 72.8% | 27.3% (vs 23) |
| h96 | candidate | 1685 ± 110 | 57 of 188 | 58 | 24-34 | 77.6% | 32.5% (vs 19) |
| rush | sparring | 1283 ± 198 | 139 of 188 | 25 | 6-19 | 52.5% | 15.8% (vs 42) |
| rush4 | sparring | 1588 ± 139 | 87 of 188 | 50 | 30-20 | 71.8% | 26.6% (vs 24) |
| turtle | candidate | 1465 ± 198 | 121 of 188 | 20 | 4-16 | 64.0% | 24.2% (vs 35) |

Sources (`tools/progress/games.py`):

- local: 3151 games from 119 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 2233 games (11 archive games skipped, 237 matches from archives, 497 matches from scores), fetched 2026-10-24T15:53:16+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v8) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 2224 | 277 | 24 | 22-2 | 0% (v7 0-3) |
| 2 | m-schier.battlecode-2019-wololo | field | 2131 | 132 | 114 | 104-10 | 0% (v7 0-3) |
| 3 | uvafan.bc2019 | field | 1962 | 100 | 114 | 94-20 | 0% (v7 0-3) |
| 4 | rafekruse.Battlecode-2019-bc19 | field | 1953 | 261 | 24 | 20-4 |  |
| 5 | yujinwunz.battlecode_2019 | field | 1880 | 273 | 30 | 26-4 |  |
| 6 | VoidMercy.battlecode-2019~e7dc06 | field | 1876 | 238 | 24 | 21-3 |  |
| 7 | j-mao.battlecode-2019 | field | 1864 | 195 | 24 | 18-6 | 67% (v7 2-1) |
| 8 | **cand:h147** | candidate | 1848 | 144 | 43 | 28-15 |  |
| 9 | arya-k.bc19 | field | 1828 | 286 | 24 | 20-4 |  |
| 10 | IanCoolidge0.battlecode20~69ce88 | field | 1816 | 89 | 120 | 79-41 | 67% (v7 4-2) |
| 11 | **cand:h128** | candidate | 1805 | 115 | 54 | 23-31 |  |
| 12 | moreda-a.BC2019-a31 | field | 1800 | 213 | 27 | 18-9 |  |
| 13 | **cand:h145** | candidate | 1797 | 122 | 58 | 31-27 |  |
| 14 | StoneT2000.BC19-bot1v43 | field | 1797 | 85 | 135 | 88-47 | 33% (v7 2-4) |
| 15 | **cand:h148** | candidate | 1788 | 147 | 40 | 23-17 |  |
| 16 | **cand:h141** | candidate | 1775 | 109 | 58 | 31-27 |  |
| 17 | **cand:h143** | candidate | 1774 | 126 | 40 | 24-16 |  |
| 18 | **cand:block** | candidate | 1773 | 166 | 20 | 12-8 |  |
| 19 | **cand:camp** | candidate | 1773 | 166 | 20 | 12-8 |  |
| 20 | StoneT2000.BC19-botfinalsafe | field | 1766 | 82 | 138 | 89-49 | 67% (v7 2-1) |
| 21 | **cand:h139** | candidate | 1765 | 100 | 76 | 37-39 |  |
| 22 | **cand:h140** | candidate | 1762 | 109 | 58 | 30-28 |  |
| 23 | **cand:h146** | candidate | 1759 | 122 | 58 | 28-30 |  |
| 24 | **cand:h132** | candidate | 1756 | 125 | 40 | 23-17 |  |
| 25 | awesomelemonade.Battlecode2019 | field | 1755 | 87 | 114 | 68-46 | 67% (v7 2-1) |
| 26 | **cand:h130** | candidate | 1749 | 109 | 58 | 29-29 |  |
| 27 | **cand:h68** | candidate | 1744 | 281 | 8 | 6-2 |  |
| 28 | **cand:h72** | candidate | 1744 | 281 | 8 | 6-2 |  |
| 29 | **cand:h78** | candidate | 1744 | 281 | 8 | 6-2 |  |
| 30 | **cand:h126** | candidate | 1742 | 97 | 98 | 49-49 |  |
| 31 | **cand:h133** | candidate | 1739 | 124 | 40 | 22-18 |  |
| 32 | **cand:h142** | candidate | 1739 | 124 | 40 | 22-18 |  |
| 33 | bqi343.cp-notebook | field | 1737 | 241 | 24 | 16-8 |  |
| 34 | **cand:h104** | candidate | 1737 | 109 | 58 | 28-30 |  |
| 35 | **cand:h111** | candidate | 1737 | 109 | 58 | 28-30 |  |
| 36 | **cand:h112** | candidate | 1737 | 109 | 58 | 28-30 |  |
| 37 | **us:v8** | accepted | 1736 | 100 | 228 | 102-126 |  |
| 38 | **cand:h149** | candidate | 1735 | 162 | 28 | 14-14 |  |
| 39 | **cand:h127** | candidate | 1731 | 97 | 98 | 47-51 |  |
| 40 | **cand:h103** | candidate | 1725 | 100 | 76 | 33-43 |  |
| 41 | **cand:h115** | candidate | 1721 | 124 | 40 | 21-19 |  |
| 42 | **cand:h131** | candidate | 1721 | 124 | 40 | 21-19 |  |
| 43 | **cand:h138** | candidate | 1721 | 124 | 40 | 21-19 |  |
| 44 | **cand:h136** | candidate | 1715 | 100 | 76 | 32-44 |  |
| 45 | **cand:h44** | candidate | 1713 | 282 | 8 | 6-2 |  |
| 46 | **cand:h135** | candidate | 1711 | 109 | 58 | 26-32 |  |
| 47 | **us:v7** | accepted | 1705 | 63 | 1804 | 927-877 |  |
| 48 | virenvshah.Battlecode2019 | field | 1705 | 218 | 24 | 19-5 |  |
| 49 | **cand:h118** | candidate | 1704 | 124 | 40 | 20-20 |  |
| 50 | vineetparikh.BigRedBattle~fe3459 | field | 1699 | 206 | 27 | 19-8 |  |
| 51 | rafekruse.Battlecode-2019~2680d4 | field | 1698 | 212 | 24 | 19-5 |  |
| 52 | **cand:h100** | candidate | 1694 | 79 | 200 | 97-103 |  |
| 53 | IvanGeffner.BC19-bot6b | field | 1691 | 404 | 9 | 7-2 |  |
| 54 | **cand:h76** | candidate | 1688 | 188 | 32 | 18-14 |  |
| 55 | ldcWV.Battlecode-2019 | field | 1686 | 198 | 27 | 18-9 |  |
| 56 | **cand:h121** | candidate | 1685 | 110 | 58 | 24-34 |  |
| 57 | **cand:h96** | candidate | 1685 | 110 | 58 | 24-34 |  |
| 58 | **cand:h84** | candidate | 1684 | 301 | 8 | 4-4 |  |
| 59 | **cand:h83** | candidate | 1684 | 301 | 8 | 4-4 |  |
| 60 | IanCoolidge0.battlecode20~f649f3 | field | 1674 | 157 | 45 | 33-12 | 67% (v3 2-1) |
| 61 | **cand:h123** | candidate | 1672 | 110 | 58 | 23-35 |  |
| 62 | **cand:h101** | candidate | 1669 | 124 | 40 | 18-22 |  |
| 63 | **cand:h124** | candidate | 1669 | 124 | 40 | 18-22 |  |
| 64 | **cand:h125** | candidate | 1669 | 124 | 40 | 18-22 |  |
| 65 | **cand:h137** | candidate | 1669 | 124 | 40 | 18-22 |  |
| 66 | **cand:h110** | candidate | 1652 | 125 | 40 | 17-23 |  |
| 67 | **cand:h113** | candidate | 1652 | 125 | 40 | 17-23 |  |
| 68 | **cand:h82** | candidate | 1650 | 103 | 134 | 70-64 |  |
| 69 | howard36.Battlecode2019-eco6 | field | 1647 | 212 | 24 | 15-9 |  |
| 70 | **cand:h61** | candidate | 1645 | 255 | 8 | 5-3 |  |
| 71 | UpperArlingtonHighSchool.~682aa9 | field | 1641 | 229 | 30 | 17-13 |  |
| 72 | **cand:h114** | candidate | 1634 | 126 | 40 | 16-24 |  |
| 73 | **cand:h116** | candidate | 1634 | 126 | 40 | 16-24 |  |
| 74 | **cand:h8v5** | candidate | 1632 | 129 | 48 | 31-17 |  |
| 75 | cemondr.BC19pdxgroup4 | field | 1626 | 208 | 24 | 15-9 |  |
| 76 | **cand:h107** | candidate | 1616 | 127 | 40 | 15-25 |  |
| 77 | **cand:h144** | candidate | 1616 | 127 | 40 | 15-25 |  |
| 78 | **cand:h88** | candidate | 1614 | 148 | 40 | 18-22 |  |
| 79 | **cand:h53** | candidate | 1614 | 256 | 8 | 5-3 |  |
| 80 | **cand:h63** | candidate | 1612 | 132 | 40 | 23-17 |  |
| 81 | **cand:h91** | candidate | 1605 | 198 | 16 | 7-9 |  |
| 82 | **cand:h54** | candidate | 1601 | 127 | 48 | 29-19 |  |
| 83 | **cand:h134** | candidate | 1597 | 128 | 40 | 14-26 |  |
| 84 | **cand:h64** | candidate | 1594 | 132 | 40 | 22-18 |  |
| 85 | **us:v3** | accepted | 1592 | 111 | 191 | 140-51 |  |
| 86 | Nischay-Pro.BattleCode2019 | field | 1588 | 223 | 21 | 17-4 |  |
| 87 | **spar:rush4** | sparring | 1588 | 139 | 50 | 30-20 |  |
| 88 | **us:v0** | accepted | 1588 | 232 | 38 | 33-5 |  |
| 89 | **cand:h24v5** | candidate | 1580 | 134 | 40 | 23-17 |  |
| 90 | NielsKornerup.Battlecode-2019 | field | 1577 | 148 | 51 | 30-21 |  |
| 91 | **cand:h77** | candidate | 1573 | 190 | 16 | 8-8 |  |
| 92 | **cand:h55** | candidate | 1572 | 126 | 56 | 32-24 |  |
| 93 | unrevre.battlecode | field | 1567 | 206 | 24 | 13-11 |  |
| 94 | **cand:h40** | candidate | 1562 | 292 | 8 | 6-2 |  |
| 95 | **us:v6** | accepted | 1560 | 76 | 322 | 130-192 |  |
| 96 | abcdefguan.battlecode2019 | field | 1554 | 224 | 30 | 22-8 |  |
| 97 | **cand:h11c** | candidate | 1551 | 182 | 25 | 15-10 |  |
| 98 | **cand:h2** | candidate | 1542 | 159 | 54 | 25-29 |  |
| 99 | **cand:h7** | candidate | 1541 | 1376 | 8 | 8-0 |  |
| 100 | **cand:h129** | candidate | 1536 | 135 | 40 | 11-29 |  |
| 101 | lschaberg.bc19 | field | 1535 | 188 | 33 | 19-14 |  |
| 102 | ovkulkarni.battlecode2019~0aa607 | field | 1534 | 202 | 24 | 18-6 |  |
| 103 | **us:v5** | accepted | 1528 | 80 | 439 | 202-237 |  |
| 104 | **cand:h43** | candidate | 1528 | 249 | 8 | 4-4 |  |
| 105 | **cand:h47** | candidate | 1528 | 249 | 8 | 4-4 |  |
| 106 | **cand:h48** | candidate | 1528 | 249 | 8 | 4-4 |  |
| 107 | **cand:h49** | candidate | 1528 | 249 | 8 | 4-4 |  |
| 108 | **cand:h59** | candidate | 1528 | 249 | 8 | 4-4 |  |
| 109 | **cand:h60** | candidate | 1528 | 249 | 8 | 4-4 |  |
| 110 | IvanGeffner.BC19-eigthbot | field | 1526 | 316 | 9 | 6-3 |  |
| 111 | **cand:h3** | candidate | 1523 | 221 | 19 | 9-10 |  |
| 112 | m4reko.bc2019-tmores-angels | field | 1502 | 203 | 27 | 17-10 |  |
| 113 | **cand:h38** | candidate | 1493 | 307 | 6 | 4-2 |  |
| 114 | dmunozc.bc19-g8-davjasdiv | field | 1487 | 187 | 33 | 22-11 |  |
| 115 | **cand:h58** | candidate | 1483 | 273 | 8 | 3-5 |  |
| 116 | **cand:h6** | candidate | 1481 | 121 | 158 | 94-64 |  |
| 117 | **cand:h24** | candidate | 1480 | 157 | 40 | 26-14 |  |
| 118 | programjames.BC19Bot-seeding | field | 1476 | 188 | 24 | 11-13 |  |
| 119 | Tom-CCS.BC19 | field | 1469 | 191 | 33 | 17-16 |  |
| 120 | sunanth123.battlecode19-mainbot | field | 1467 | 250 | 21 | 13-8 |  |
| 121 | **cand:turtle** | candidate | 1465 | 198 | 20 | 4-16 |  |
| 122 | **cand:h31** | candidate | 1462 | 156 | 40 | 25-15 |  |
| 123 | dmunozc.bc19-g8-bots | field | 1444 | 211 | 24 | 12-12 |  |
| 124 | **cand:h41** | candidate | 1441 | 256 | 8 | 3-5 |  |
| 125 | **cand:h42** | candidate | 1441 | 256 | 8 | 3-5 |  |
| 126 | **cand:h46** | candidate | 1441 | 256 | 8 | 3-5 |  |
| 127 | **cand:h52** | candidate | 1441 | 256 | 8 | 3-5 |  |
| 128 | **us:v1** | accepted | 1436 | 151 | 154 | 128-26 |  |
| 129 | **us:v2** | accepted | 1423 | 149 | 62 | 30-32 |  |
| 130 | programjames.BC19Bot-root | field | 1377 | 218 | 24 | 15-9 |  |
| 131 | **us:v4** | accepted | 1373 | 111 | 220 | 83-137 |  |
| 132 | ovkulkarni.battlecode2019~06c610 | field | 1367 | 225 | 24 | 15-9 |  |
| 133 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1367 | 150 | 48 | 25-23 |  |
| 134 | nthistle.battlecode-2019 | field | 1350 | 175 | 36 | 19-17 | 100% (v5 3-0) |
| 135 | **cand:h16r** | candidate | 1303 | 155 | 40 | 16-24 |  |
| 136 | cvxluo.battlecode19 | field | 1290 | 202 | 30 | 19-11 |  |
| 137 | ipercyNC.group6-battlecode | field | 1288 | 200 | 24 | 11-13 |  |
| 138 | **cand:h18** | candidate | 1283 | 198 | 25 | 6-19 |  |
| 139 | **spar:rush** | sparring | 1283 | 198 | 25 | 6-19 |  |
| 140 | sunanth123.battlecode19-prorush | field | 1281 | 196 | 24 | 14-10 |  |
| 141 | CS554-software-engineerin~a575dc | field | 1278 | 105 | 248 | 147-101 | 100% (v7 3-0) |
| 142 | CometsTech.battlecode2019 | field | 1240 | 111 | 198 | 92-106 | 100% (v7 3-0) |
| 143 | UpperArlingtonHighSchool.~5e7875 | field | 1232 | 273 | 24 | 15-9 |  |
| 144 | Nydroam.BatteredCod | field | 1211 | 453 | 6 | 3-3 |  |
| 145 | jamesrayman.HCN-bot | field | 1202 | 204 | 33 | 13-20 | 100% (v5 3-0) |
| 146 | evanyeyeye.battlecode2019~af562c | field | 1182 | 201 | 24 | 12-12 |  |
| 147 | moreda-a.BC2019-t15 | field | 1169 | 235 | 27 | 12-15 |  |
| 148 | JasonLarson44.2019-Battle~1c7639 | field | 1150 | 201 | 36 | 14-22 | 100% (v3 3-0) |
| 149 | bayoumi17m.BattleCode-2019 | field | 1140 | 213 | 24 | 11-13 |  |
| 150 | vicennial.BattleCode19 | field | 1131 | 247 | 27 | 13-14 |  |
| 151 | twitu.bc19-tsp | field | 1100 | 239 | 30 | 17-13 |  |
| 152 | TestSubjector.BattleCode2~fb22c7 | field | 1097 | 264 | 36 | 18-18 |  |
| 153 | haydenshively.Battle-Code~e1c2fb | field | 1093 | 220 | 24 | 10-14 |  |
| 154 | 18dcb01.Battlecode19-robot2 | field | 1080 | 221 | 39 | 19-20 |  |
| 155 | haydenshively.Battle-Code~e37b3e | field | 1061 | 217 | 24 | 8-16 |  |
| 156 | TestSubjector.BattleCode2~e6de74 | field | 1044 | 221 | 39 | 17-22 |  |
| 157 | jackliu612.Battlecode19 | field | 1025 | 324 | 24 | 10-14 |  |
| 158 | dgh2.bc19-t1 | field | 995 | 276 | 24 | 9-15 |  |
| 159 | spachava753.bc19 | field | 960 | 228 | 24 | 9-15 |  |
| 160 | liwanlin41.examplefuncsplayer | field | 924 | 282 | 27 | 7-20 |  |
| 161 | dndoja.battlecode19 | field | 921 | 236 | 27 | 11-16 |  |
| 162 | asunathanr.asu_bc | field | 886 | 281 | 24 | 8-16 |  |
| 163 | rooneyshuman.Battlecode | field | 860 | 246 | 33 | 19-14 |  |
| 164 | CometsTech.battlecode2019~187e8c | field | 860 | 238 | 36 | 14-22 |  |
| 165 | **cand:h89** | candidate | 822 | 1086 | 8 | 0-8 |  |
| 166 | **cand:h90** | candidate | 822 | 1086 | 8 | 0-8 |  |
| 167 | SethKitchen.examplefuncsplayer | field | 725 | 340 | 36 | 8-28 |  |
| 168 | bovard.battlecode-2019-un~8822c3 | field | 671 | 388 | 24 | 9-15 |  |
| 169 | roy-love.onshoreBattleCode2019 | field | 671 | 253 | 24 | 7-17 |  |
| 170 | VictorButoi.BattleCode201~c4576b | field | 656 | 264 | 27 | 9-18 |  |
| 171 | OmarTahoun.battle-code | field | 655 | 265 | 33 | 10-23 |  |
| 172 | jyurkanin.corn_bc19 | field | 639 | 336 | 33 | 7-26 |  |
| 173 | DivyanshuSaxena.Battlecode | field | 525 | 255 | 39 | 18-21 |  |
| 174 | howard36.Battlecode2019-sprint | field | 503 | 429 | 24 | 6-18 |  |
| 175 | waylon531.scala_starter | field | 485 | 367 | 30 | 4-26 |  |
| 176 | vishwasns99.BC_2019 | field | 458 | 384 | 30 | 3-27 |  |
| 177 | bc19-starter | field | 409 | 227 | 334 | 57-277 | 100% (v3 12-0) |
| 178 | VoidMercy.battlecode-2019-bot | field | 368 | 336 | 24 | 8-16 |  |
| 179 | nhard.examplefuncsplayer | field | 334 | 350 | 24 | 9-15 |  |
| 180 | ryanhzhao.Battlecode-2019 | field | 242 | 445 | 24 | 3-21 |  |
| 181 | RyanSharafuddin.Battlecode_2019 | field | 168 | 268 | 54 | 5-49 |  |
| 182 | jbiewend.Battlecode2019 | field | 100 | 462 | 24 | 3-21 |  |
| 183 | djkeyes.bc19 | field | -14 | 419 | 24 | 3-21 |  |
| 184 | TheRobotCarlson.battlehac~323871 | field | -54 | 321 | 36 | 3-33 |  |
| 185 | jamesrayman.HCN-basic-bot | field | -110 | 351 | 24 | 3-21 |  |
| 186 | yunaganyh.bc19 | field | -118 | 352 | 24 | 4-20 |  |
| 187 | jshin313.battlecodebot | field | -245 | 386 | 24 | 2-22 |  |
| 188 | ArtemUstilov.bc19_CrazyTapok | field | -641 | 1096 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v7 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h130 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h126 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h104 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h111 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h112 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h127 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h103 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h136 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h135 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v7 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h121 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h123 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | yujinwunz.battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h147 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h147 | us:v8 | 40 | 26-14 | 65% | local |
| arya-k.bc19 | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h128 | 9 | 2-7 | 22% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h145 | 3 | 0-3 | 0% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h141 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h139 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h140 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h146 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h130 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h126 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h104 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h111 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h112 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h127 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h121 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h123 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v6 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h128 | StoneT2000.BC19-bot1v43 | 9 | 3-6 | 33% | replica |
| cand:h128 | StoneT2000.BC19-botfinalsafe | 9 | 3-6 | 33% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h145 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h145 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h121 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h148 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h141 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h141 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h141 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h143 | us:v7 | 40 | 24-16 | 60% | local |
| cand:block | us:v7 | 20 | 12-8 | 60% | local |
| cand:camp | us:v7 | 20 | 12-8 | 60% | local |
| StoneT2000.BC19-botfinalsafe | cand:h139 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h130 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h126 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h139 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h139 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h146 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h146 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| awesomelemonade.Battlecode2019 | cand:h130 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h126 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h104 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h127 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | cand:h136 | 6 | 2-4 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h135 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v7 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| bqi343.cp-notebook | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| us:v8 | cand:h149 | 28 | 14-14 | 50% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h118 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | cand:h121 | 40 | 21-19 | 52% | local |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
| us:v7 | cand:h123 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h101 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h124 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h125 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h137 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h110 | 40 | 23-17 | 57% | local |
| us:v7 | cand:h113 | 40 | 23-17 | 57% | local |
| us:v7 | cand:h82 | 8 | 6-2 | 75% | local |
| us:v7 | cand:h114 | 40 | 24-16 | 60% | local |
| us:v7 | cand:h116 | 40 | 24-16 | 60% | local |
| us:v7 | cand:h107 | 40 | 25-15 | 62% | local |
| us:v7 | cand:h144 | 40 | 25-15 | 62% | local |
| us:v7 | cand:h134 | 40 | 26-14 | 65% | local |
| us:v7 | spar:rush4 | 20 | 20-0 | 100% | local |
| us:v7 | us:v6 | 40 | 29-11 | 72% | local |
| us:v7 | cand:h129 | 40 | 29-11 | 72% | local |
| us:v7 | cand:turtle | 20 | 16-4 | 80% | local |
| us:v7 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| us:v7 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | us:v3 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
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
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-davjasdiv | 3 | 0-3 | 0% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| dmunozc.bc19-g8-davjasdiv | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| programjames.BC19Bot-root | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 3 | 0-3 | 0% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | 18dcb01.Battlecode19-robot2 | 3 | 1-2 | 33% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | TestSubjector.BattleCode2~e6de74 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~e6de74 | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 3 | 1-2 | 33% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | rooneyshuman.Battlecode | 6 | 4-2 | 67% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 9 | 5-4 | 56% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 3 | 1-2 | 33% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-basic-bot | yunaganyh.bc19 | 3 | 1-2 | 33% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
