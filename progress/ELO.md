# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-24 06:25 PDT.

5121 games: 2963 local (VM batches between our builds, candidates, sparring partners and the starter bot), 670 of ours on the galaxy replica and 1488 between field bots there (1485 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 186 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, m-schier.battlecode-2019-wololo, rafekruse.Battlecode-2019-bc19, uvafan.bc2019, yujinwunz.battlecode_2019, VoidMercy.battlecode-2019~e7dc06, j-mao.battlecode-2019, arya-k.bc19, IanCoolidge0.battlecode20~69ce88, StoneT2000.BC19-bot1v43, moreda-a.BC2019-a31, awesomelemonade.Battlecode2019, StoneT2000.BC19-botfinalsafe, bqi343.cp-notebook, virenvshah.Battlecode2019, IvanGeffner.BC19-bot6b, rafekruse.Battlecode-2019~2680d4, vineetparikh.BigRedBattle~fe3459, ldcWV.Battlecode-2019, IanCoolidge0.battlecode20~f649f3, howard36.Battlecode2019-eco6, UpperArlingtonHighSchool.~682aa9, cemondr.BC19pdxgroup4, NielsKornerup.Battlecode-2019, Nischay-Pro.BattleCode2019, unrevre.battlecode, abcdefguan.battlecode2019, ovkulkarni.battlecode2019~0aa607, lschaberg.bc19, IvanGeffner.BC19-eigthbot, m4reko.bc2019-tmores-angels, dmunozc.bc19-g8-davjasdiv, sunanth123.battlecode19-mainbot, programjames.BC19Bot-seeding, Tom-CCS.BC19, dmunozc.bc19-g8-bots, programjames.BC19Bot-root, 18dcb01.Battlecode19-prea~fb5c48, ovkulkarni.battlecode2019~06c610, nthistle.battlecode-2019, sunanth123.battlecode19-prorush, ipercyNC.group6-battlecode, CS554-software-engineerin~a575dc, CometsTech.battlecode2019, cvxluo.battlecode19, UpperArlingtonHighSchool.~5e7875, vicennial.BattleCode19, Nydroam.BatteredCod, jamesrayman.HCN-bot, evanyeyeye.battlecode2019~af562c, moreda-a.BC2019-t15, JasonLarson44.2019-Battle~1c7639, bayoumi17m.BattleCode-2019, twitu.bc19-tsp, TestSubjector.BattleCode2~fb22c7, haydenshively.Battle-Code~e1c2fb, 18dcb01.Battlecode19-robot2, haydenshively.Battle-Code~e37b3e, TestSubjector.BattleCode2~e6de74, jackliu612.Battlecode19, dgh2.bc19-t1, spachava753.bc19, dndoja.battlecode19, liwanlin41.examplefuncsplayer, rooneyshuman.Battlecode, asunathanr.asu_bc, CometsTech.battlecode2019~187e8c, SethKitchen.examplefuncsplayer, roy-love.onshoreBattleCode2019, bovard.battlecode-2019-un~8822c3, VictorButoi.BattleCode201~c4576b, OmarTahoun.battle-code, jyurkanin.corn_bc19, DivyanshuSaxena.Battlecode, waylon531.scala_starter, howard36.Battlecode2019-sprint, vishwasns99.BC_2019, bc19-starter, VoidMercy.battlecode-2019-bot, nhard.examplefuncsplayer, ryanhzhao.Battlecode-2019, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, djkeyes.bc19, TheRobotCarlson.battlehac~323871, jamesrayman.HCN-basic-bot, yunaganyh.bc19, jshin313.battlecodebot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1589 ± 232 | 85 of 186 | 38 | 33-5 | 71.9% | 25.7% (vs 23) |
| v1 | accepted | 1437 ± 151 | 126 of 186 | 154 | 128-26 | 62.3% | 22.6% (vs 36) |
| v2 | accepted | 1425 ± 149 | 127 of 186 | 62 | 30-32 | 61.4% | 21.5% (vs 36) |
| v3 | accepted | 1594 ± 111 | 84 of 186 | 191 | 140-51 | 72.2% | 26.2% (vs 23) |
| v4 | accepted | 1376 ± 111 | 129 of 186 | 220 | 83-137 | 58.4% | 18.4% (vs 37) |
| v5 | accepted | 1533 ± 80 | 99 of 186 | 439 | 202-237 | 68.4% | 24.1% (vs 27) |
| v6 | accepted | 1568 ± 77 | 91 of 186 | 322 | 130-192 | 70.5% | 25.6% (vs 25) |
| v7 | accepted | 1722 ± 64 | 41 of 186 | 1804 | 927-877 | 79.7% | 30.8% (vs 14) |
| sub131 | accepted | 1705 ± 219 | 46 of 186 | 12 | 4-8 | 78.8% | 30.3% (vs 15) |
| sub137 | accepted | 1681 ± 243 | 62 of 186 | 12 | 3-9 | 77.4% | 32.0% (vs 19) |
| sub141 | accepted | 1693 ± 418 | 53 of 186 | 3 | 1-2 | 78.1% | 32.4% (vs 18) |
| sub145 | accepted | 1740 ± 307 | 33 of 186 | 6 | 2-4 | 80.7% | 31.6% (vs 13) |
| block | candidate | 1790 ± 167 | 16 of 186 | 20 | 12-8 | 83.3% | 34.5% (vs 11) |
| camp | candidate | 1790 ± 167 | 17 of 186 | 20 | 12-8 | 83.3% | 34.5% (vs 11) |
| h100 | candidate | 1711 ± 80 | 44 of 186 | 200 | 97-103 | 79.1% | 29.6% (vs 14) |
| h101 | candidate | 1686 ± 125 | 56 of 186 | 40 | 18-22 | 77.7% | 31.6% (vs 18) |
| h103 | candidate | 1734 ± 100 | 38 of 186 | 76 | 33-43 | 80.4% | 32.3% (vs 14) |
| h104 | candidate | 1748 ± 109 | 29 of 186 | 58 | 28-30 | 81.2% | 32.6% (vs 13) |
| h107 | candidate | 1632 ± 128 | 73 of 186 | 40 | 15-25 | 74.5% | 29.4% (vs 22) |
| h110 | candidate | 1668 ± 126 | 64 of 186 | 40 | 17-23 | 76.7% | 31.5% (vs 20) |
| h111 | candidate | 1748 ± 109 | 30 of 186 | 58 | 28-30 | 81.2% | 32.6% (vs 13) |
| h112 | candidate | 1748 ± 109 | 31 of 186 | 58 | 28-30 | 81.2% | 32.6% (vs 13) |
| h113 | candidate | 1668 ± 126 | 65 of 186 | 40 | 17-23 | 76.7% | 31.5% (vs 20) |
| h114 | candidate | 1651 ± 126 | 68 of 186 | 40 | 16-24 | 75.6% | 29.5% (vs 20) |
| h115 | candidate | 1738 ± 125 | 34 of 186 | 40 | 21-19 | 80.6% | 31.4% (vs 13) |
| h116 | candidate | 1651 ± 126 | 69 of 186 | 40 | 16-24 | 75.6% | 29.5% (vs 20) |
| h118 | candidate | 1721 ± 125 | 42 of 186 | 40 | 20-20 | 79.7% | 30.7% (vs 14) |
| h11c | candidate | 1554 ± 182 | 95 of 186 | 25 | 15-10 | 69.7% | 26.1% (vs 27) |
| h121 | candidate | 1695 ± 120 | 52 of 186 | 46 | 20-26 | 78.2% | 32.6% (vs 18) |
| h123 | candidate | 1684 ± 110 | 60 of 186 | 58 | 23-35 | 77.6% | 31.4% (vs 18) |
| h124 | candidate | 1686 ± 125 | 57 of 186 | 40 | 18-22 | 77.7% | 31.6% (vs 18) |
| h125 | candidate | 1686 ± 125 | 58 of 186 | 40 | 18-22 | 77.7% | 31.6% (vs 18) |
| h126 | candidate | 1753 ± 97 | 25 of 186 | 98 | 49-49 | 81.4% | 33.2% (vs 13) |
| h127 | candidate | 1743 ± 97 | 32 of 186 | 98 | 47-51 | 80.9% | 31.9% (vs 13) |
| h128 | candidate | 1790 ± 93 | 15 of 186 | 94 | 46-48 | 83.3% | 34.6% (vs 11) |
| h129 | candidate | 1553 ± 136 | 96 of 186 | 40 | 11-29 | 69.6% | 26.0% (vs 27) |
| h130 | candidate | 1761 ± 109 | 21 of 186 | 58 | 29-29 | 81.8% | 32.7% (vs 12) |
| h131 | candidate | 1738 ± 125 | 35 of 186 | 40 | 21-19 | 80.6% | 31.4% (vs 13) |
| h132 | candidate | 1773 ± 126 | 19 of 186 | 40 | 23-17 | 82.5% | 32.5% (vs 11) |
| h133 | candidate | 1755 ± 125 | 23 of 186 | 40 | 22-18 | 81.6% | 33.4% (vs 13) |
| h134 | candidate | 1614 ± 129 | 79 of 186 | 40 | 14-26 | 73.4% | 28.3% (vs 23) |
| h135 | candidate | 1723 ± 109 | 40 of 186 | 58 | 26-32 | 79.8% | 31.0% (vs 14) |
| h136 | candidate | 1724 ± 100 | 39 of 186 | 76 | 32-44 | 79.9% | 31.1% (vs 14) |
| h137 | candidate | 1686 ± 125 | 59 of 186 | 40 | 18-22 | 77.7% | 31.6% (vs 18) |
| h138 | candidate | 1738 ± 125 | 36 of 186 | 40 | 21-19 | 80.6% | 31.4% (vs 13) |
| h139 | candidate | 1786 ± 109 | 18 of 186 | 58 | 31-27 | 83.1% | 34.1% (vs 11) |
| h140 | candidate | 1809 ± 128 | 11 of 186 | 40 | 25-15 | 84.3% | 33.6% (vs 9) |
| h141 | candidate | 1814 ± 124 | 10 of 186 | 43 | 27-16 | 84.5% | 34.2% (vs 9) |
| h142 | candidate | 1755 ± 125 | 24 of 186 | 40 | 22-18 | 81.6% | 33.4% (vs 13) |
| h143 | candidate | 1791 ± 126 | 14 of 186 | 40 | 24-16 | 83.4% | 34.7% (vs 11) |
| h144 | candidate | 1632 ± 128 | 74 of 186 | 40 | 15-25 | 74.5% | 29.4% (vs 22) |
| h16r | candidate | 1307 ± 155 | 133 of 186 | 40 | 16-24 | 54.0% | 15.8% (vs 40) |
| h18 | candidate | 1285 ± 198 | 136 of 186 | 25 | 6-19 | 52.6% | 16.0% (vs 42) |
| h2 | candidate | 1543 ± 159 | 97 of 186 | 54 | 25-29 | 69.0% | 25.1% (vs 27) |
| h24 | candidate | 1484 ± 157 | 113 of 186 | 40 | 26-14 | 65.2% | 22.8% (vs 31) |
| h24v5 | candidate | 1585 ± 134 | 86 of 186 | 40 | 23-17 | 71.6% | 25.3% (vs 23) |
| h3 | candidate | 1525 ± 220 | 109 of 186 | 19 | 9-10 | 67.8% | 25.9% (vs 30) |
| h31 | candidate | 1465 ± 156 | 119 of 186 | 40 | 25-15 | 64.0% | 23.6% (vs 34) |
| h38 | candidate | 1497 ± 307 | 111 of 186 | 6 | 4-2 | 66.1% | 24.0% (vs 31) |
| h40 | candidate | 1565 ± 292 | 92 of 186 | 8 | 6-2 | 70.4% | 25.3% (vs 25) |
| h41 | candidate | 1446 ± 256 | 121 of 186 | 8 | 3-5 | 62.8% | 22.6% (vs 35) |
| h42 | candidate | 1446 ± 256 | 122 of 186 | 8 | 3-5 | 62.8% | 22.6% (vs 35) |
| h43 | candidate | 1532 ± 249 | 101 of 186 | 8 | 4-4 | 68.3% | 24.9% (vs 28) |
| h44 | candidate | 1718 ± 282 | 43 of 186 | 8 | 6-2 | 79.5% | 30.4% (vs 14) |
| h46 | candidate | 1446 ± 256 | 123 of 186 | 8 | 3-5 | 62.8% | 22.6% (vs 35) |
| h47 | candidate | 1532 ± 249 | 102 of 186 | 8 | 4-4 | 68.3% | 24.9% (vs 28) |
| h48 | candidate | 1532 ± 249 | 103 of 186 | 8 | 4-4 | 68.3% | 24.9% (vs 28) |
| h49 | candidate | 1532 ± 249 | 104 of 186 | 8 | 4-4 | 68.3% | 24.9% (vs 28) |
| h52 | candidate | 1446 ± 256 | 124 of 186 | 8 | 3-5 | 62.8% | 22.6% (vs 35) |
| h53 | candidate | 1619 ± 256 | 78 of 186 | 8 | 5-3 | 73.7% | 28.9% (vs 23) |
| h54 | candidate | 1606 ± 128 | 81 of 186 | 48 | 29-19 | 72.9% | 27.5% (vs 23) |
| h55 | candidate | 1577 ± 126 | 90 of 186 | 56 | 32-24 | 71.1% | 26.5% (vs 25) |
| h58 | candidate | 1488 ± 273 | 112 of 186 | 8 | 3-5 | 65.5% | 23.2% (vs 31) |
| h59 | candidate | 1532 ± 249 | 105 of 186 | 8 | 4-4 | 68.3% | 24.9% (vs 28) |
| h6 | candidate | 1484 ± 121 | 114 of 186 | 158 | 94-64 | 65.2% | 22.8% (vs 31) |
| h60 | candidate | 1532 ± 249 | 106 of 186 | 8 | 4-4 | 68.3% | 24.9% (vs 28) |
| h61 | candidate | 1652 ± 255 | 67 of 186 | 8 | 5-3 | 75.7% | 29.7% (vs 20) |
| h63 | candidate | 1619 ± 132 | 77 of 186 | 40 | 23-17 | 73.7% | 28.9% (vs 23) |
| h64 | candidate | 1602 ± 132 | 82 of 186 | 40 | 22-18 | 72.7% | 27.1% (vs 23) |
| h68 | candidate | 1751 ± 281 | 26 of 186 | 8 | 6-2 | 81.3% | 32.9% (vs 13) |
| h7 | candidate | 1541 ± 1375 | 98 of 186 | 8 | 8-0 | 68.9% | 24.8% (vs 27) |
| h72 | candidate | 1751 ± 281 | 27 of 186 | 8 | 6-2 | 81.3% | 32.9% (vs 13) |
| h76 | candidate | 1695 ± 188 | 51 of 186 | 32 | 18-14 | 78.2% | 32.6% (vs 18) |
| h77 | candidate | 1583 ± 190 | 87 of 186 | 16 | 8-8 | 71.5% | 25.2% (vs 23) |
| h78 | candidate | 1751 ± 281 | 28 of 186 | 8 | 6-2 | 81.3% | 32.9% (vs 13) |
| h82 | candidate | 1657 ± 103 | 66 of 186 | 134 | 70-64 | 76.0% | 30.2% (vs 20) |
| h83 | candidate | 1691 ± 301 | 54 of 186 | 8 | 4-4 | 78.0% | 32.1% (vs 18) |
| h84 | candidate | 1691 ± 301 | 55 of 186 | 8 | 4-4 | 78.0% | 32.1% (vs 18) |
| h88 | candidate | 1621 ± 148 | 76 of 186 | 40 | 18-22 | 73.8% | 29.1% (vs 23) |
| h89 | candidate | 835 ± 1086 | 163 of 186 | 8 | 0-8 | 28.6% | 8.9% (vs 67) |
| h8v5 | candidate | 1637 ± 129 | 72 of 186 | 48 | 31-17 | 74.8% | 29.9% (vs 22) |
| h90 | candidate | 835 ± 1086 | 164 of 186 | 8 | 0-8 | 28.6% | 8.9% (vs 67) |
| h91 | candidate | 1612 ± 198 | 80 of 186 | 16 | 7-9 | 73.3% | 28.1% (vs 23) |
| h96 | candidate | 1697 ± 110 | 49 of 186 | 58 | 24-34 | 78.3% | 31.9% (vs 17) |
| rush | sparring | 1285 ± 198 | 137 of 186 | 25 | 6-19 | 52.6% | 16.0% (vs 42) |
| rush4 | sparring | 1601 ± 139 | 83 of 186 | 50 | 30-20 | 72.6% | 27.0% (vs 23) |
| turtle | candidate | 1481 ± 198 | 116 of 186 | 20 | 4-16 | 65.1% | 23.4% (vs 32) |

Sources (`tools/progress/games.py`):

- local: 2963 games from 114 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 2158 games (11 archive games skipped, 214 matches from archives, 495 matches from scores), fetched 2026-10-24T13:36:52+00:00

Accepted builds with no recorded game: v8.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v7) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 2213 | 273 | 24 | 22-2 | 0% (v7 0-3) |
| 2 | m-schier.battlecode-2019-wololo | field | 2100 | 133 | 102 | 92-10 | 0% (v7 0-3) |
| 3 | rafekruse.Battlecode-2019-bc19 | field | 1955 | 260 | 24 | 20-4 |  |
| 4 | uvafan.bc2019 | field | 1948 | 102 | 105 | 86-19 | 0% (v7 0-3) |
| 5 | yujinwunz.battlecode_2019 | field | 1880 | 273 | 30 | 26-4 |  |
| 6 | VoidMercy.battlecode-2019~e7dc06 | field | 1875 | 239 | 24 | 21-3 |  |
| 7 | j-mao.battlecode-2019 | field | 1870 | 195 | 24 | 18-6 | 67% (v7 2-1) |
| 8 | arya-k.bc19 | field | 1828 | 286 | 24 | 20-4 |  |
| 9 | IanCoolidge0.battlecode20~69ce88 | field | 1826 | 94 | 108 | 73-35 | 67% (v7 4-2) |
| 10 | **cand:h141** | candidate | 1814 | 124 | 43 | 27-16 |  |
| 11 | **cand:h140** | candidate | 1809 | 128 | 40 | 25-15 |  |
| 12 | StoneT2000.BC19-bot1v43 | field | 1799 | 88 | 123 | 82-41 | 33% (v7 2-4) |
| 13 | moreda-a.BC2019-a31 | field | 1794 | 210 | 27 | 18-9 |  |
| 14 | **cand:h143** | candidate | 1791 | 126 | 40 | 24-16 |  |
| 15 | **cand:h128** | candidate | 1790 | 93 | 94 | 46-48 |  |
| 16 | **cand:block** | candidate | 1790 | 167 | 20 | 12-8 |  |
| 17 | **cand:camp** | candidate | 1790 | 167 | 20 | 12-8 |  |
| 18 | **cand:h139** | candidate | 1786 | 109 | 58 | 31-27 |  |
| 19 | **cand:h132** | candidate | 1773 | 126 | 40 | 23-17 |  |
| 20 | awesomelemonade.Battlecode2019 | field | 1761 | 92 | 99 | 61-38 | 67% (v7 2-1) |
| 21 | **cand:h130** | candidate | 1761 | 109 | 58 | 29-29 |  |
| 22 | StoneT2000.BC19-botfinalsafe | field | 1759 | 84 | 129 | 83-46 | 67% (v7 2-1) |
| 23 | **cand:h133** | candidate | 1755 | 125 | 40 | 22-18 |  |
| 24 | **cand:h142** | candidate | 1755 | 125 | 40 | 22-18 |  |
| 25 | **cand:h126** | candidate | 1753 | 97 | 98 | 49-49 |  |
| 26 | **cand:h68** | candidate | 1751 | 281 | 8 | 6-2 |  |
| 27 | **cand:h72** | candidate | 1751 | 281 | 8 | 6-2 |  |
| 28 | **cand:h78** | candidate | 1751 | 281 | 8 | 6-2 |  |
| 29 | **cand:h104** | candidate | 1748 | 109 | 58 | 28-30 |  |
| 30 | **cand:h111** | candidate | 1748 | 109 | 58 | 28-30 |  |
| 31 | **cand:h112** | candidate | 1748 | 109 | 58 | 28-30 |  |
| 32 | **cand:h127** | candidate | 1743 | 97 | 98 | 47-51 |  |
| 33 | **us:sub145** | accepted | 1740 | 307 | 6 | 2-4 |  |
| 34 | **cand:h115** | candidate | 1738 | 125 | 40 | 21-19 |  |
| 35 | **cand:h131** | candidate | 1738 | 125 | 40 | 21-19 |  |
| 36 | **cand:h138** | candidate | 1738 | 125 | 40 | 21-19 |  |
| 37 | bqi343.cp-notebook | field | 1737 | 241 | 24 | 16-8 |  |
| 38 | **cand:h103** | candidate | 1734 | 100 | 76 | 33-43 |  |
| 39 | **cand:h136** | candidate | 1724 | 100 | 76 | 32-44 |  |
| 40 | **cand:h135** | candidate | 1723 | 109 | 58 | 26-32 |  |
| 41 | **us:v7** | accepted | 1722 | 64 | 1804 | 927-877 |  |
| 42 | **cand:h118** | candidate | 1721 | 125 | 40 | 20-20 |  |
| 43 | **cand:h44** | candidate | 1718 | 282 | 8 | 6-2 |  |
| 44 | **cand:h100** | candidate | 1711 | 80 | 200 | 97-103 |  |
| 45 | virenvshah.Battlecode2019 | field | 1707 | 217 | 24 | 19-5 |  |
| 46 | **us:sub131** | accepted | 1705 | 219 | 12 | 4-8 |  |
| 47 | IvanGeffner.BC19-bot6b | field | 1700 | 407 | 9 | 7-2 |  |
| 48 | rafekruse.Battlecode-2019~2680d4 | field | 1698 | 212 | 24 | 19-5 |  |
| 49 | **cand:h96** | candidate | 1697 | 110 | 58 | 24-34 |  |
| 50 | vineetparikh.BigRedBattle~fe3459 | field | 1695 | 204 | 27 | 19-8 |  |
| 51 | **cand:h76** | candidate | 1695 | 188 | 32 | 18-14 |  |
| 52 | **cand:h121** | candidate | 1695 | 120 | 46 | 20-26 |  |
| 53 | **us:sub141** | accepted | 1693 | 418 | 3 | 1-2 |  |
| 54 | **cand:h83** | candidate | 1691 | 301 | 8 | 4-4 |  |
| 55 | **cand:h84** | candidate | 1691 | 301 | 8 | 4-4 |  |
| 56 | **cand:h101** | candidate | 1686 | 125 | 40 | 18-22 |  |
| 57 | **cand:h124** | candidate | 1686 | 125 | 40 | 18-22 |  |
| 58 | **cand:h125** | candidate | 1686 | 125 | 40 | 18-22 |  |
| 59 | **cand:h137** | candidate | 1686 | 125 | 40 | 18-22 |  |
| 60 | **cand:h123** | candidate | 1684 | 110 | 58 | 23-35 |  |
| 61 | ldcWV.Battlecode-2019 | field | 1683 | 198 | 27 | 18-9 |  |
| 62 | **us:sub137** | accepted | 1681 | 243 | 12 | 3-9 |  |
| 63 | IanCoolidge0.battlecode20~f649f3 | field | 1672 | 156 | 45 | 33-12 | 67% (v3 2-1) |
| 64 | **cand:h110** | candidate | 1668 | 126 | 40 | 17-23 |  |
| 65 | **cand:h113** | candidate | 1668 | 126 | 40 | 17-23 |  |
| 66 | **cand:h82** | candidate | 1657 | 103 | 134 | 70-64 |  |
| 67 | **cand:h61** | candidate | 1652 | 255 | 8 | 5-3 |  |
| 68 | **cand:h114** | candidate | 1651 | 126 | 40 | 16-24 |  |
| 69 | **cand:h116** | candidate | 1651 | 126 | 40 | 16-24 |  |
| 70 | howard36.Battlecode2019-eco6 | field | 1648 | 212 | 24 | 15-9 |  |
| 71 | UpperArlingtonHighSchool.~682aa9 | field | 1640 | 228 | 30 | 17-13 |  |
| 72 | **cand:h8v5** | candidate | 1637 | 129 | 48 | 31-17 |  |
| 73 | **cand:h107** | candidate | 1632 | 128 | 40 | 15-25 |  |
| 74 | **cand:h144** | candidate | 1632 | 128 | 40 | 15-25 |  |
| 75 | cemondr.BC19pdxgroup4 | field | 1626 | 209 | 24 | 15-9 |  |
| 76 | **cand:h88** | candidate | 1621 | 148 | 40 | 18-22 |  |
| 77 | **cand:h63** | candidate | 1619 | 132 | 40 | 23-17 |  |
| 78 | **cand:h53** | candidate | 1619 | 256 | 8 | 5-3 |  |
| 79 | **cand:h134** | candidate | 1614 | 129 | 40 | 14-26 |  |
| 80 | **cand:h91** | candidate | 1612 | 198 | 16 | 7-9 |  |
| 81 | **cand:h54** | candidate | 1606 | 128 | 48 | 29-19 |  |
| 82 | **cand:h64** | candidate | 1602 | 132 | 40 | 22-18 |  |
| 83 | **spar:rush4** | sparring | 1601 | 139 | 50 | 30-20 |  |
| 84 | **us:v3** | accepted | 1594 | 111 | 191 | 140-51 |  |
| 85 | **us:v0** | accepted | 1589 | 232 | 38 | 33-5 |  |
| 86 | **cand:h24v5** | candidate | 1585 | 134 | 40 | 23-17 |  |
| 87 | **cand:h77** | candidate | 1583 | 190 | 16 | 8-8 |  |
| 88 | NielsKornerup.Battlecode-2019 | field | 1577 | 147 | 51 | 30-21 |  |
| 89 | Nischay-Pro.BattleCode2019 | field | 1577 | 225 | 21 | 17-4 |  |
| 90 | **cand:h55** | candidate | 1577 | 126 | 56 | 32-24 |  |
| 91 | **us:v6** | accepted | 1568 | 77 | 322 | 130-192 |  |
| 92 | **cand:h40** | candidate | 1565 | 292 | 8 | 6-2 |  |
| 93 | unrevre.battlecode | field | 1564 | 204 | 24 | 13-11 |  |
| 94 | abcdefguan.battlecode2019 | field | 1555 | 224 | 30 | 22-8 |  |
| 95 | **cand:h11c** | candidate | 1554 | 182 | 25 | 15-10 |  |
| 96 | **cand:h129** | candidate | 1553 | 136 | 40 | 11-29 |  |
| 97 | **cand:h2** | candidate | 1543 | 159 | 54 | 25-29 |  |
| 98 | **cand:h7** | candidate | 1541 | 1375 | 8 | 8-0 |  |
| 99 | **us:v5** | accepted | 1533 | 80 | 439 | 202-237 |  |
| 100 | ovkulkarni.battlecode2019~0aa607 | field | 1533 | 202 | 24 | 18-6 |  |
| 101 | **cand:h43** | candidate | 1532 | 249 | 8 | 4-4 |  |
| 102 | **cand:h47** | candidate | 1532 | 249 | 8 | 4-4 |  |
| 103 | **cand:h48** | candidate | 1532 | 249 | 8 | 4-4 |  |
| 104 | **cand:h49** | candidate | 1532 | 249 | 8 | 4-4 |  |
| 105 | **cand:h59** | candidate | 1532 | 249 | 8 | 4-4 |  |
| 106 | **cand:h60** | candidate | 1532 | 249 | 8 | 4-4 |  |
| 107 | lschaberg.bc19 | field | 1532 | 187 | 33 | 19-14 |  |
| 108 | IvanGeffner.BC19-eigthbot | field | 1525 | 315 | 9 | 6-3 |  |
| 109 | **cand:h3** | candidate | 1525 | 220 | 19 | 9-10 |  |
| 110 | m4reko.bc2019-tmores-angels | field | 1498 | 203 | 27 | 17-10 |  |
| 111 | **cand:h38** | candidate | 1497 | 307 | 6 | 4-2 |  |
| 112 | **cand:h58** | candidate | 1488 | 273 | 8 | 3-5 |  |
| 113 | **cand:h24** | candidate | 1484 | 157 | 40 | 26-14 |  |
| 114 | **cand:h6** | candidate | 1484 | 121 | 158 | 94-64 |  |
| 115 | dmunozc.bc19-g8-davjasdiv | field | 1482 | 187 | 33 | 22-11 |  |
| 116 | **cand:turtle** | candidate | 1481 | 198 | 20 | 4-16 |  |
| 117 | sunanth123.battlecode19-mainbot | field | 1473 | 249 | 21 | 13-8 |  |
| 118 | programjames.BC19Bot-seeding | field | 1472 | 187 | 24 | 11-13 |  |
| 119 | **cand:h31** | candidate | 1465 | 156 | 40 | 25-15 |  |
| 120 | Tom-CCS.BC19 | field | 1459 | 195 | 33 | 17-16 |  |
| 121 | **cand:h41** | candidate | 1446 | 256 | 8 | 3-5 |  |
| 122 | **cand:h42** | candidate | 1446 | 256 | 8 | 3-5 |  |
| 123 | **cand:h46** | candidate | 1446 | 256 | 8 | 3-5 |  |
| 124 | **cand:h52** | candidate | 1446 | 256 | 8 | 3-5 |  |
| 125 | dmunozc.bc19-g8-bots | field | 1441 | 211 | 24 | 12-12 |  |
| 126 | **us:v1** | accepted | 1437 | 151 | 154 | 128-26 |  |
| 127 | **us:v2** | accepted | 1425 | 149 | 62 | 30-32 |  |
| 128 | programjames.BC19Bot-root | field | 1378 | 218 | 24 | 15-9 |  |
| 129 | **us:v4** | accepted | 1376 | 111 | 220 | 83-137 |  |
| 130 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1369 | 149 | 48 | 25-23 |  |
| 131 | ovkulkarni.battlecode2019~06c610 | field | 1362 | 225 | 24 | 15-9 |  |
| 132 | nthistle.battlecode-2019 | field | 1341 | 177 | 36 | 19-17 | 100% (v5 3-0) |
| 133 | **cand:h16r** | candidate | 1307 | 155 | 40 | 16-24 |  |
| 134 | sunanth123.battlecode19-prorush | field | 1300 | 196 | 24 | 14-10 |  |
| 135 | ipercyNC.group6-battlecode | field | 1287 | 200 | 24 | 11-13 |  |
| 136 | **cand:h18** | candidate | 1285 | 198 | 25 | 6-19 |  |
| 137 | **spar:rush** | sparring | 1285 | 198 | 25 | 6-19 |  |
| 138 | CS554-software-engineerin~a575dc | field | 1280 | 105 | 248 | 147-101 | 100% (v7 3-0) |
| 139 | CometsTech.battlecode2019 | field | 1242 | 111 | 198 | 92-106 | 100% (v7 3-0) |
| 140 | cvxluo.battlecode19 | field | 1233 | 218 | 27 | 16-11 |  |
| 141 | UpperArlingtonHighSchool.~5e7875 | field | 1227 | 273 | 24 | 15-9 |  |
| 142 | vicennial.BattleCode19 | field | 1224 | 274 | 24 | 13-11 |  |
| 143 | Nydroam.BatteredCod | field | 1208 | 453 | 6 | 3-3 |  |
| 144 | jamesrayman.HCN-bot | field | 1204 | 204 | 33 | 13-20 | 100% (v5 3-0) |
| 145 | evanyeyeye.battlecode2019~af562c | field | 1186 | 201 | 24 | 12-12 |  |
| 146 | moreda-a.BC2019-t15 | field | 1163 | 235 | 27 | 12-15 |  |
| 147 | JasonLarson44.2019-Battle~1c7639 | field | 1152 | 200 | 36 | 14-22 | 100% (v3 3-0) |
| 148 | bayoumi17m.BattleCode-2019 | field | 1147 | 213 | 24 | 11-13 |  |
| 149 | twitu.bc19-tsp | field | 1097 | 238 | 30 | 17-13 |  |
| 150 | TestSubjector.BattleCode2~fb22c7 | field | 1095 | 262 | 36 | 18-18 |  |
| 151 | haydenshively.Battle-Code~e1c2fb | field | 1093 | 220 | 24 | 10-14 |  |
| 152 | 18dcb01.Battlecode19-robot2 | field | 1078 | 221 | 39 | 19-20 |  |
| 153 | haydenshively.Battle-Code~e37b3e | field | 1051 | 216 | 24 | 8-16 |  |
| 154 | TestSubjector.BattleCode2~e6de74 | field | 1041 | 221 | 39 | 17-22 |  |
| 155 | jackliu612.Battlecode19 | field | 1026 | 324 | 24 | 10-14 |  |
| 156 | dgh2.bc19-t1 | field | 994 | 275 | 24 | 9-15 |  |
| 157 | spachava753.bc19 | field | 971 | 227 | 24 | 9-15 |  |
| 158 | dndoja.battlecode19 | field | 933 | 247 | 24 | 9-15 |  |
| 159 | liwanlin41.examplefuncsplayer | field | 928 | 283 | 27 | 7-20 |  |
| 160 | rooneyshuman.Battlecode | field | 891 | 259 | 30 | 18-12 |  |
| 161 | asunathanr.asu_bc | field | 887 | 281 | 24 | 8-16 |  |
| 162 | CometsTech.battlecode2019~187e8c | field | 855 | 235 | 36 | 14-22 |  |
| 163 | **cand:h89** | candidate | 835 | 1086 | 8 | 0-8 |  |
| 164 | **cand:h90** | candidate | 835 | 1086 | 8 | 0-8 |  |
| 165 | SethKitchen.examplefuncsplayer | field | 725 | 339 | 36 | 8-28 |  |
| 166 | roy-love.onshoreBattleCode2019 | field | 691 | 256 | 24 | 7-17 |  |
| 167 | bovard.battlecode-2019-un~8822c3 | field | 674 | 388 | 24 | 9-15 |  |
| 168 | VictorButoi.BattleCode201~c4576b | field | 659 | 261 | 27 | 9-18 |  |
| 169 | OmarTahoun.battle-code | field | 654 | 264 | 33 | 10-23 |  |
| 170 | jyurkanin.corn_bc19 | field | 636 | 332 | 33 | 7-26 |  |
| 171 | DivyanshuSaxena.Battlecode | field | 525 | 255 | 39 | 18-21 |  |
| 172 | waylon531.scala_starter | field | 517 | 375 | 30 | 4-26 |  |
| 173 | howard36.Battlecode2019-sprint | field | 502 | 427 | 24 | 6-18 |  |
| 174 | vishwasns99.BC_2019 | field | 458 | 383 | 30 | 3-27 |  |
| 175 | bc19-starter | field | 409 | 227 | 334 | 57-277 | 100% (v3 12-0) |
| 176 | VoidMercy.battlecode-2019-bot | field | 370 | 336 | 24 | 8-16 |  |
| 177 | nhard.examplefuncsplayer | field | 336 | 349 | 24 | 9-15 |  |
| 178 | ryanhzhao.Battlecode-2019 | field | 254 | 449 | 24 | 3-21 |  |
| 179 | RyanSharafuddin.Battlecode_2019 | field | 169 | 267 | 54 | 5-49 |  |
| 180 | jbiewend.Battlecode2019 | field | 100 | 460 | 24 | 3-21 |  |
| 181 | djkeyes.bc19 | field | -11 | 419 | 24 | 3-21 |  |
| 182 | TheRobotCarlson.battlehac~323871 | field | -53 | 321 | 36 | 3-33 |  |
| 183 | jamesrayman.HCN-basic-bot | field | -107 | 351 | 24 | 3-21 |  |
| 184 | yunaganyh.bc19 | field | -112 | 353 | 24 | 4-20 |  |
| 185 | jshin313.battlecodebot | field | -242 | 386 | 24 | 2-22 |  |
| 186 | ArtemUstilov.bc19_CrazyTapok | field | -641 | 1096 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | us:v7 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 3 | 3-0 | 100% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h121 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h123 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:sub137 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | yujinwunz.battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h139 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:sub145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:sub131 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:sub137 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
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
| arya-k.bc19 | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h128 | 9 | 2-7 | 22% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h139 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h130 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h126 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h104 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h111 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h112 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h127 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:sub131 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:sub141 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h123 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v6 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h141 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h141 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| StoneT2000.BC19-bot1v43 | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:sub145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:sub131 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:sub137 | 3 | 2-1 | 67% | replica |
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
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h143 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| cand:h128 | StoneT2000.BC19-botfinalsafe | 9 | 3-6 | 33% | replica |
| cand:h128 | us:v7 | 40 | 23-17 | 57% | local |
| cand:block | us:v7 | 20 | 12-8 | 60% | local |
| cand:camp | us:v7 | 20 | 12-8 | 60% | local |
| cand:h139 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h139 | StoneT2000.BC19-botfinalsafe | 3 | 3-0 | 100% | replica |
| cand:h139 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| awesomelemonade.Battlecode2019 | cand:h130 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h126 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h104 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h127 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | cand:h136 | 6 | 2-4 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h135 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v7 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:sub131 | 3 | 0-3 | 0% | replica |
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
| cand:h130 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| StoneT2000.BC19-botfinalsafe | cand:h126 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:sub137 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
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
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| bqi343.cp-notebook | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h118 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
| us:v7 | cand:h121 | 40 | 21-19 | 52% | local |
| us:v7 | cand:h101 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h124 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h125 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h137 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h123 | 40 | 20-20 | 50% | local |
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
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
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
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
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
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
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
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-davjasdiv | 3 | 0-3 | 0% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| dmunozc.bc19-g8-davjasdiv | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
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
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 3 | 0-3 | 0% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
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
| dndoja.battlecode19 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
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
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
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
