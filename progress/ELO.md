# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-27 18:44 PDT.

10390 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 2755 of ours on the galaxy replica and 4392 between field bots there (4389 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 221 players; compare them only within this fit.

**Thin field.** 89 rated field bots (m-schier.battlecode-2019-wololo, mvpatel2000.Battlecode2019, uvafan.bc2019, yujinwunz.battlecode_2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, StoneT2000.BC19-botfinalsafe, arya-k.bc19, moreda-a.BC2019-a31, StoneT2000.BC19-bot1v43, IanCoolidge0.battlecode20~f649f3, virenvshah.Battlecode2019, j-mao.battlecode-2019, vineetparikh.BigRedBattle~fe3459, unrevre.battlecode, IanCoolidge0.battlecode20~69ce88, ldcWV.Battlecode-2019, rafekruse.Battlecode-2019~2680d4, bqi343.cp-notebook, awesomelemonade.Battlecode2019, UpperArlingtonHighSchool.~682aa9, cemondr.BC19pdxgroup4, IvanGeffner.BC19-bot6b, IvanGeffner.BC19-eigthbot, Nischay-Pro.BattleCode2019, ovkulkarni.battlecode2019~0aa607, NielsKornerup.Battlecode-2019, lschaberg.bc19, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, m4reko.bc2019-tmores-angels, programjames.BC19Bot-seeding, ovkulkarni.battlecode2019~06c610, howard36.Battlecode2019-eco6, abcdefguan.battlecode2019, Tom-CCS.BC19, CS554-software-engineerin~a575dc, 18dcb01.Battlecode19-prea~fb5c48, ipercyNC.group6-battlecode, sunanth123.battlecode19-prorush, nthistle.battlecode-2019, programjames.BC19Bot-root, moreda-a.BC2019-t15, twitu.bc19-tsp, cvxluo.battlecode19, evanyeyeye.battlecode2019~af562c, vicennial.BattleCode19, CometsTech.battlecode2019, Nydroam.BatteredCod, sunanth123.battlecode19-mainbot, JasonLarson44.2019-Battle~1c7639, spachava753.bc19, bayoumi17m.BattleCode-2019, jamesrayman.HCN-bot, UpperArlingtonHighSchool.~5e7875, jackliu612.Battlecode19, TestSubjector.BattleCode2~fb22c7, TestSubjector.BattleCode2~e6de74, haydenshively.Battle-Code~e1c2fb, rooneyshuman.Battlecode, haydenshively.Battle-Code~e37b3e, dndoja.battlecode19, CometsTech.battlecode2019~187e8c, roy-love.onshoreBattleCode2019, SethKitchen.examplefuncsplayer, liwanlin41.examplefuncsplayer, dgh2.bc19-t1, VictorButoi.BattleCode201~c4576b, 18dcb01.Battlecode19-robot2, jyurkanin.corn_bc19, asunathanr.asu_bc, OmarTahoun.battle-code, howard36.Battlecode2019-sprint, nhard.examplefuncsplayer, waylon531.scala_starter, vishwasns99.BC_2019, bovard.battlecode-2019-un~8822c3, DivyanshuSaxena.Battlecode, bc19-starter, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, VoidMercy.battlecode-2019-bot, ryanhzhao.Battlecode-2019, djkeyes.bc19, yunaganyh.bc19, TheRobotCarlson.battlehac~323871, jshin313.battlecodebot, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1605 ± 223 | 91 of 221 | 38 | 33-5 | 76.6% | 32.7% (vs 19) |
| v1 | accepted | 1454 ± 135 | 146 of 221 | 154 | 128-26 | 66.8% | 25.8% (vs 30) |
| v2 | accepted | 1432 ± 137 | 151 of 221 | 62 | 30-32 | 65.3% | 25.1% (vs 32) |
| v3 | accepted | 1597 ± 95 | 93 of 221 | 191 | 140-51 | 76.1% | 32.6% (vs 20) |
| v4 | accepted | 1335 ± 105 | 165 of 221 | 220 | 83-137 | 58.8% | 21.2% (vs 38) |
| v5 | accepted | 1469 ± 72 | 142 of 221 | 439 | 202-237 | 67.8% | 26.5% (vs 29) |
| v6 | accepted | 1488 ± 66 | 134 of 221 | 322 | 130-192 | 69.0% | 27.7% (vs 28) |
| v7 | accepted | 1616 ± 43 | 85 of 221 | 1804 | 927-877 | 77.3% | 34.0% (vs 19) |
| v8 | accepted | 1675 ± 62 | 55 of 221 | 356 | 160-196 | 80.8% | 35.0% (vs 13) |
| v9 | accepted | 1754 ± 111 | 28 of 221 | 48 | 21-27 | 85.1% | 35.7% (vs 7) |
| v10 | accepted | 1744 ± 125 | 31 of 221 | 36 | 17-19 | 84.6% | 34.4% (vs 7) |
| v11 | accepted | 1743 ± 93 | 32 of 221 | 69 | 30-39 | 84.6% | 34.3% (vs 7) |
| v12 | accepted | 1832 ± 65 | 17 of 221 | 168 | 94-74 | 88.7% | 32.7% (vs 3) |
| block | candidate | 1685 ± 160 | 49 of 221 | 20 | 12-8 | 81.4% | 36.3% (vs 13) |
| camp | candidate | 1685 ± 160 | 50 of 221 | 20 | 12-8 | 81.4% | 36.3% (vs 13) |
| h100 | candidate | 1606 ± 64 | 90 of 221 | 200 | 97-103 | 76.7% | 32.8% (vs 19) |
| h101 | candidate | 1581 ± 116 | 96 of 221 | 40 | 18-22 | 75.1% | 30.7% (vs 20) |
| h103 | candidate | 1632 ± 88 | 80 of 221 | 76 | 33-43 | 78.3% | 34.2% (vs 17) |
| h104 | candidate | 1645 ± 99 | 71 of 221 | 58 | 28-30 | 79.1% | 34.8% (vs 16) |
| h107 | candidate | 1527 ± 118 | 120 of 221 | 40 | 15-25 | 71.6% | 29.3% (vs 25) |
| h110 | candidate | 1563 ± 116 | 106 of 221 | 40 | 17-23 | 74.0% | 30.6% (vs 22) |
| h111 | candidate | 1645 ± 99 | 72 of 221 | 58 | 28-30 | 79.1% | 34.8% (vs 16) |
| h112 | candidate | 1645 ± 99 | 73 of 221 | 58 | 28-30 | 79.1% | 34.8% (vs 16) |
| h113 | candidate | 1563 ± 116 | 107 of 221 | 40 | 17-23 | 74.0% | 30.6% (vs 22) |
| h114 | candidate | 1545 ± 117 | 110 of 221 | 40 | 16-24 | 72.8% | 28.6% (vs 22) |
| h115 | candidate | 1633 ± 115 | 76 of 221 | 40 | 21-19 | 78.3% | 33.3% (vs 16) |
| h116 | candidate | 1545 ± 117 | 111 of 221 | 40 | 16-24 | 72.8% | 28.6% (vs 22) |
| h118 | candidate | 1615 ± 115 | 86 of 221 | 40 | 20-20 | 77.3% | 34.0% (vs 19) |
| h11c | candidate | 1533 ± 178 | 117 of 221 | 25 | 15-10 | 72.0% | 29.1% (vs 24) |
| h121 | candidate | 1594 ± 100 | 95 of 221 | 58 | 24-34 | 75.9% | 32.3% (vs 20) |
| h123 | candidate | 1581 ± 100 | 100 of 221 | 58 | 23-35 | 75.1% | 30.7% (vs 20) |
| h124 | candidate | 1581 ± 116 | 97 of 221 | 40 | 18-22 | 75.1% | 30.7% (vs 20) |
| h125 | candidate | 1581 ± 116 | 98 of 221 | 40 | 18-22 | 75.1% | 30.7% (vs 20) |
| h126 | candidate | 1650 ± 85 | 67 of 221 | 98 | 49-49 | 79.4% | 34.4% (vs 15) |
| h127 | candidate | 1640 ± 85 | 74 of 221 | 98 | 47-51 | 78.8% | 34.2% (vs 16) |
| h128 | candidate | 1707 ± 105 | 41 of 221 | 54 | 23-31 | 82.7% | 35.2% (vs 10) |
| h129 | candidate | 1448 ± 127 | 147 of 221 | 40 | 11-29 | 66.4% | 25.2% (vs 30) |
| h130 | candidate | 1658 ± 99 | 62 of 221 | 58 | 29-29 | 79.8% | 33.0% (vs 13) |
| h131 | candidate | 1633 ± 115 | 77 of 221 | 40 | 21-19 | 78.3% | 33.3% (vs 16) |
| h132 | candidate | 1668 ± 116 | 61 of 221 | 40 | 23-17 | 80.4% | 34.2% (vs 13) |
| h133 | candidate | 1650 ± 116 | 68 of 221 | 40 | 22-18 | 79.4% | 34.4% (vs 15) |
| h134 | candidate | 1508 ± 120 | 128 of 221 | 40 | 14-26 | 70.4% | 27.3% (vs 25) |
| h135 | candidate | 1620 ± 99 | 84 of 221 | 58 | 26-32 | 77.5% | 34.5% (vs 19) |
| h136 | candidate | 1622 ± 88 | 82 of 221 | 76 | 32-44 | 77.7% | 33.9% (vs 18) |
| h137 | candidate | 1581 ± 116 | 99 of 221 | 40 | 18-22 | 75.1% | 30.7% (vs 20) |
| h138 | candidate | 1633 ± 115 | 78 of 221 | 40 | 21-19 | 78.3% | 33.3% (vs 16) |
| h139 | candidate | 1672 ± 88 | 59 of 221 | 76 | 37-39 | 80.7% | 34.7% (vs 13) |
| h140 | candidate | 1671 ± 99 | 60 of 221 | 58 | 30-28 | 80.6% | 34.5% (vs 13) |
| h141 | candidate | 1683 ± 99 | 51 of 221 | 58 | 31-27 | 81.3% | 36.1% (vs 13) |
| h142 | candidate | 1650 ± 116 | 69 of 221 | 40 | 22-18 | 79.4% | 34.4% (vs 15) |
| h143 | candidate | 1686 ± 117 | 48 of 221 | 40 | 24-16 | 81.4% | 36.4% (vs 13) |
| h144 | candidate | 1527 ± 118 | 121 of 221 | 40 | 15-25 | 71.6% | 29.3% (vs 25) |
| h145 | candidate | 1725 ± 104 | 37 of 221 | 58 | 31-27 | 83.6% | 35.9% (vs 9) |
| h146 | candidate | 1687 ± 103 | 45 of 221 | 58 | 28-30 | 81.5% | 35.5% (vs 12) |
| h147 | candidate | 1764 ± 105 | 27 of 221 | 58 | 34-24 | 85.6% | 36.9% (vs 7) |
| h148 | candidate | 1745 ± 77 | 30 of 221 | 112 | 58-54 | 84.6% | 34.5% (vs 7) |
| h149 | candidate | 1687 ± 103 | 46 of 221 | 58 | 28-30 | 81.5% | 35.5% (vs 12) |
| h150 | candidate | 1738 ± 104 | 33 of 221 | 58 | 32-26 | 84.3% | 33.7% (vs 7) |
| h151 | candidate | 1639 ± 124 | 75 of 221 | 40 | 18-22 | 78.7% | 34.1% (vs 16) |
| h157 | candidate | 1677 ± 127 | 52 of 221 | 36 | 14-22 | 80.9% | 35.3% (vs 13) |
| h159 | candidate | 1734 ± 92 | 34 of 221 | 72 | 33-39 | 84.0% | 33.1% (vs 7) |
| h161 | candidate | 1677 ± 127 | 53 of 221 | 36 | 14-22 | 80.9% | 35.3% (vs 13) |
| h162 | candidate | 1654 ± 129 | 64 of 221 | 36 | 13-23 | 79.6% | 32.5% (vs 13) |
| h163 | candidate | 1745 ± 77 | 29 of 221 | 108 | 51-57 | 84.6% | 34.5% (vs 7) |
| h167 | candidate | 1789 ± 92 | 21 of 221 | 72 | 38-34 | 86.8% | 35.1% (vs 5) |
| h16r | candidate | 1266 ± 151 | 171 of 221 | 40 | 16-24 | 54.3% | 19.4% (vs 43) |
| h170 | candidate | 1700 ± 126 | 42 of 221 | 36 | 15-21 | 82.2% | 34.2% (vs 10) |
| h175 | candidate | 1778 ± 92 | 22 of 221 | 72 | 37-35 | 86.3% | 33.7% (vs 5) |
| h178 | candidate | 1767 ± 92 | 24 of 221 | 72 | 36-36 | 85.7% | 35.1% (vs 6) |
| h18 | candidate | 1265 ± 194 | 172 of 221 | 25 | 6-19 | 54.2% | 19.4% (vs 43) |
| h184 | candidate | 1827 ± 78 | 18 of 221 | 108 | 62-46 | 88.5% | 32.0% (vs 3) |
| h185 | candidate | 1918 ± 98 | 4 of 221 | 72 | 49-23 | 91.9% | 39.2% (vs 2) |
| h190 | candidate | 1722 ± 126 | 38 of 221 | 36 | 16-20 | 83.4% | 35.5% (vs 9) |
| h192 | candidate | 1677 ± 127 | 54 of 221 | 36 | 14-22 | 80.9% | 35.3% (vs 13) |
| h193 | candidate | 1722 ± 126 | 39 of 221 | 36 | 16-20 | 83.4% | 35.5% (vs 9) |
| h195 | candidate | 1922 ± 82 | 3 of 221 | 108 | 74-34 | 92.1% | 39.9% (vs 2) |
| h198 | candidate | 1904 ± 132 | 5 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h2 | candidate | 1546 ± 148 | 109 of 221 | 54 | 25-29 | 72.9% | 28.7% (vs 22) |
| h201 | candidate | 1904 ± 132 | 6 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h202 | candidate | 1904 ± 132 | 7 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h203 | candidate | 1880 ± 130 | 13 of 221 | 36 | 23-13 | 90.6% | 38.8% (vs 3) |
| h206 | candidate | 1858 ± 91 | 15 of 221 | 78 | 46-32 | 89.8% | 36.0% (vs 3) |
| h207 | candidate | 1873 ± 76 | 14 of 221 | 120 | 72-48 | 90.4% | 37.9% (vs 3) |
| h209 | candidate | 1904 ± 132 | 8 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h211 | candidate | 1904 ± 132 | 9 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h212 | candidate | 1766 ± 125 | 25 of 221 | 36 | 18-18 | 85.7% | 35.0% (vs 6) |
| h213 | candidate | 1904 ± 132 | 10 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h214 | candidate | 1848 ± 90 | 16 of 221 | 78 | 45-33 | 89.4% | 34.6% (vs 3) |
| h218 | candidate | 1904 ± 132 | 11 of 221 | 36 | 24-12 | 91.5% | 37.4% (vs 2) |
| h24 | candidate | 1443 ± 153 | 150 of 221 | 40 | 26-14 | 66.0% | 26.2% (vs 32) |
| h24v5 | candidate | 1521 ± 130 | 125 of 221 | 40 | 23-17 | 71.3% | 28.6% (vs 25) |
| h3 | candidate | 1528 ± 213 | 119 of 221 | 19 | 9-10 | 71.7% | 29.3% (vs 25) |
| h31 | candidate | 1424 ± 152 | 153 of 221 | 40 | 25-15 | 64.8% | 24.4% (vs 32) |
| h38 | candidate | 1457 ± 306 | 145 of 221 | 6 | 4-2 | 67.0% | 26.1% (vs 30) |
| h40 | candidate | 1525 ± 290 | 123 of 221 | 8 | 6-2 | 71.5% | 29.0% (vs 25) |
| h41 | candidate | 1383 ± 254 | 156 of 221 | 8 | 3-5 | 62.0% | 22.1% (vs 34) |
| h42 | candidate | 1383 ± 254 | 157 of 221 | 8 | 3-5 | 62.0% | 22.1% (vs 34) |
| h43 | candidate | 1469 ± 247 | 136 of 221 | 8 | 4-4 | 67.8% | 26.5% (vs 29) |
| h44 | candidate | 1655 ± 280 | 63 of 221 | 8 | 6-2 | 79.7% | 32.6% (vs 13) |
| h46 | candidate | 1383 ± 254 | 158 of 221 | 8 | 3-5 | 62.0% | 22.1% (vs 34) |
| h47 | candidate | 1469 ± 247 | 137 of 221 | 8 | 4-4 | 67.8% | 26.5% (vs 29) |
| h48 | candidate | 1469 ± 247 | 138 of 221 | 8 | 4-4 | 67.8% | 26.5% (vs 29) |
| h49 | candidate | 1469 ± 247 | 139 of 221 | 8 | 4-4 | 67.8% | 26.5% (vs 29) |
| h52 | candidate | 1383 ± 254 | 159 of 221 | 8 | 3-5 | 62.0% | 22.1% (vs 34) |
| h53 | candidate | 1556 ± 254 | 108 of 221 | 8 | 5-3 | 73.5% | 29.8% (vs 22) |
| h54 | candidate | 1542 ± 123 | 113 of 221 | 48 | 29-19 | 72.6% | 29.2% (vs 23) |
| h55 | candidate | 1513 ± 121 | 127 of 221 | 56 | 32-24 | 70.7% | 27.7% (vs 25) |
| h58 | candidate | 1426 ± 271 | 152 of 221 | 8 | 3-5 | 64.9% | 24.5% (vs 32) |
| h59 | candidate | 1469 ± 247 | 140 of 221 | 8 | 4-4 | 67.8% | 26.5% (vs 29) |
| h6 | candidate | 1463 ± 114 | 143 of 221 | 158 | 94-64 | 67.4% | 25.9% (vs 29) |
| h60 | candidate | 1469 ± 247 | 141 of 221 | 8 | 4-4 | 67.8% | 26.5% (vs 29) |
| h61 | candidate | 1574 ± 252 | 101 of 221 | 8 | 5-3 | 74.7% | 30.0% (vs 20) |
| h63 | candidate | 1540 ± 126 | 114 of 221 | 40 | 23-17 | 72.5% | 29.0% (vs 23) |
| h64 | candidate | 1522 ± 126 | 124 of 221 | 40 | 22-18 | 71.3% | 28.8% (vs 25) |
| h68 | candidate | 1673 ± 279 | 56 of 221 | 8 | 6-2 | 80.7% | 34.8% (vs 13) |
| h7 | candidate | 1513 ± 1468 | 126 of 221 | 8 | 8-0 | 70.7% | 27.7% (vs 25) |
| h72 | candidate | 1673 ± 279 | 57 of 221 | 8 | 6-2 | 80.7% | 34.8% (vs 13) |
| h76 | candidate | 1615 ± 184 | 87 of 221 | 32 | 18-14 | 77.2% | 33.9% (vs 19) |
| h77 | candidate | 1497 ± 186 | 131 of 221 | 16 | 8-8 | 69.6% | 26.9% (vs 26) |
| h78 | candidate | 1673 ± 279 | 58 of 221 | 8 | 6-2 | 80.7% | 34.8% (vs 13) |
| h82 | candidate | 1571 ± 94 | 103 of 221 | 134 | 70-64 | 74.5% | 29.6% (vs 20) |
| h83 | candidate | 1612 ± 298 | 88 of 221 | 8 | 4-4 | 77.1% | 33.6% (vs 19) |
| h84 | candidate | 1612 ± 298 | 89 of 221 | 8 | 4-4 | 77.1% | 33.6% (vs 19) |
| h88 | candidate | 1536 ± 142 | 116 of 221 | 40 | 18-22 | 72.2% | 29.4% (vs 24) |
| h89 | candidate | 742 ± 1086 | 198 of 221 | 8 | 0-8 | 27.3% | 8.2% (vs 67) |
| h8v5 | candidate | 1573 ± 125 | 102 of 221 | 48 | 31-17 | 74.6% | 29.8% (vs 20) |
| h90 | candidate | 742 ± 1086 | 199 of 221 | 8 | 0-8 | 27.3% | 8.2% (vs 67) |
| h91 | candidate | 1527 ± 194 | 122 of 221 | 16 | 7-9 | 71.6% | 29.2% (vs 25) |
| h96 | candidate | 1594 ± 100 | 94 of 221 | 58 | 24-34 | 75.9% | 32.3% (vs 20) |
| rush | sparring | 1265 ± 194 | 173 of 221 | 25 | 6-19 | 54.2% | 19.4% (vs 43) |
| rush4 | sparring | 1506 ± 132 | 129 of 221 | 50 | 30-20 | 70.2% | 27.0% (vs 25) |
| turtle | candidate | 1377 ± 192 | 160 of 221 | 20 | 4-16 | 61.6% | 21.6% (vs 34) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 125 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 350 malformed)
- replica: 7147 games (11 archive games skipped, 909 matches from archives, 1463 matches from scores), fetched 2026-10-28T04:16:59+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34), v10 = h175 (72 games, 37-35), v11 = h178 (72 games, 36-36), v12 = h185 (72 games, 49-23). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the win rate and W-L against the bot of the latest accepted build with games of its own that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | m-schier.battlecode-2019-wololo | field | 1995 | 50 | 501 | 385-116 | 22% (v12 4-14) |
| 2 | mvpatel2000.Battlecode2019 | field | 1992 | 76 | 144 | 106-38 | 22% (v12 4-14) |
| 3 | **cand:h195** | candidate | 1922 | 82 | 108 | 74-34 |  |
| 4 | **cand:h185** | candidate | 1918 | 98 | 72 | 49-23 |  |
| 5 | **cand:h198** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 6 | **cand:h201** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 7 | **cand:h202** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 8 | **cand:h209** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 9 | **cand:h211** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 10 | **cand:h213** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 11 | **cand:h218** | candidate | 1904 | 132 | 36 | 24-12 |  |
| 12 | uvafan.bc2019 | field | 1893 | 46 | 507 | 331-176 | 24% (v12 5-16) |
| 13 | **cand:h203** | candidate | 1880 | 130 | 36 | 23-13 |  |
| 14 | **cand:h207** | candidate | 1873 | 76 | 120 | 72-48 |  |
| 15 | **cand:h206** | candidate | 1858 | 91 | 78 | 46-32 |  |
| 16 | **cand:h214** | candidate | 1848 | 90 | 78 | 45-33 |  |
| 17 | **us:v12** | accepted | 1832 | 65 | 168 | 94-74 |  |
| 18 | **cand:h184** | candidate | 1827 | 78 | 108 | 62-46 |  |
| 19 | yujinwunz.battlecode_2019 | field | 1816 | 83 | 117 | 77-40 | 56% (v12 5-4) |
| 20 | rafekruse.Battlecode-2019-bc19 | field | 1811 | 86 | 99 | 65-34 | 0% (v8 0-3) |
| 21 | **cand:h167** | candidate | 1789 | 92 | 72 | 38-34 |  |
| 22 | **cand:h175** | candidate | 1778 | 92 | 72 | 37-35 |  |
| 23 | VoidMercy.battlecode-2019~e7dc06 | field | 1777 | 89 | 93 | 62-31 | 33% (v11 1-2) |
| 24 | **cand:h178** | candidate | 1767 | 92 | 72 | 36-36 |  |
| 25 | **cand:h212** | candidate | 1766 | 125 | 36 | 18-18 |  |
| 26 | StoneT2000.BC19-botfinalsafe | field | 1765 | 44 | 519 | 280-239 | 62% (v12 13-8) |
| 27 | **cand:h147** | candidate | 1764 | 105 | 58 | 34-24 |  |
| 28 | **us:v9** | accepted | 1754 | 111 | 48 | 21-27 |  |
| 29 | **cand:h163** | candidate | 1745 | 77 | 108 | 51-57 |  |
| 30 | **cand:h148** | candidate | 1745 | 77 | 112 | 58-54 |  |
| 31 | **us:v10** | accepted | 1744 | 125 | 36 | 17-19 |  |
| 32 | **us:v11** | accepted | 1743 | 93 | 69 | 30-39 |  |
| 33 | **cand:h150** | candidate | 1738 | 104 | 58 | 32-26 |  |
| 34 | **cand:h159** | candidate | 1734 | 92 | 72 | 33-39 |  |
| 35 | arya-k.bc19 | field | 1732 | 84 | 102 | 65-37 | 83% (v12 5-1) |
| 36 | moreda-a.BC2019-a31 | field | 1728 | 83 | 105 | 64-41 | 100% (v12 3-0) |
| 37 | **cand:h145** | candidate | 1725 | 104 | 58 | 31-27 |  |
| 38 | **cand:h190** | candidate | 1722 | 126 | 36 | 16-20 |  |
| 39 | **cand:h193** | candidate | 1722 | 126 | 36 | 16-20 |  |
| 40 | StoneT2000.BC19-bot1v43 | field | 1719 | 43 | 522 | 253-269 | 81% (v12 17-4) |
| 41 | **cand:h128** | candidate | 1707 | 105 | 54 | 23-31 |  |
| 42 | **cand:h170** | candidate | 1700 | 126 | 36 | 15-21 |  |
| 43 | IanCoolidge0.battlecode20~f649f3 | field | 1697 | 79 | 126 | 74-52 | 50% (v12 3-3) |
| 44 | virenvshah.Battlecode2019 | field | 1694 | 82 | 114 | 68-46 | 67% (v12 2-1) |
| 45 | **cand:h146** | candidate | 1687 | 103 | 58 | 28-30 |  |
| 46 | **cand:h149** | candidate | 1687 | 103 | 58 | 28-30 |  |
| 47 | j-mao.battlecode-2019 | field | 1686 | 83 | 96 | 54-42 | 100% (v8 3-0) |
| 48 | **cand:h143** | candidate | 1686 | 117 | 40 | 24-16 |  |
| 49 | **cand:block** | candidate | 1685 | 160 | 20 | 12-8 |  |
| 50 | **cand:camp** | candidate | 1685 | 160 | 20 | 12-8 |  |
| 51 | **cand:h141** | candidate | 1683 | 99 | 58 | 31-27 |  |
| 52 | **cand:h157** | candidate | 1677 | 127 | 36 | 14-22 |  |
| 53 | **cand:h161** | candidate | 1677 | 127 | 36 | 14-22 |  |
| 54 | **cand:h192** | candidate | 1677 | 127 | 36 | 14-22 |  |
| 55 | **us:v8** | accepted | 1675 | 62 | 356 | 160-196 |  |
| 56 | **cand:h68** | candidate | 1673 | 279 | 8 | 6-2 |  |
| 57 | **cand:h72** | candidate | 1673 | 279 | 8 | 6-2 |  |
| 58 | **cand:h78** | candidate | 1673 | 279 | 8 | 6-2 |  |
| 59 | **cand:h139** | candidate | 1672 | 88 | 76 | 37-39 |  |
| 60 | **cand:h140** | candidate | 1671 | 99 | 58 | 30-28 |  |
| 61 | **cand:h132** | candidate | 1668 | 116 | 40 | 23-17 |  |
| 62 | **cand:h130** | candidate | 1658 | 99 | 58 | 29-29 |  |
| 63 | **cand:h44** | candidate | 1655 | 280 | 8 | 6-2 |  |
| 64 | **cand:h162** | candidate | 1654 | 129 | 36 | 13-23 |  |
| 65 | vineetparikh.BigRedBattle~fe3459 | field | 1651 | 84 | 105 | 64-41 | 100% (v12 3-0) |
| 66 | unrevre.battlecode | field | 1651 | 97 | 78 | 51-27 |  |
| 67 | **cand:h126** | candidate | 1650 | 85 | 98 | 49-49 |  |
| 68 | **cand:h133** | candidate | 1650 | 116 | 40 | 22-18 |  |
| 69 | **cand:h142** | candidate | 1650 | 116 | 40 | 22-18 |  |
| 70 | IanCoolidge0.battlecode20~69ce88 | field | 1647 | 44 | 519 | 197-322 | 67% (v12 14-7) |
| 71 | **cand:h104** | candidate | 1645 | 99 | 58 | 28-30 |  |
| 72 | **cand:h111** | candidate | 1645 | 99 | 58 | 28-30 |  |
| 73 | **cand:h112** | candidate | 1645 | 99 | 58 | 28-30 |  |
| 74 | **cand:h127** | candidate | 1640 | 85 | 98 | 47-51 |  |
| 75 | **cand:h151** | candidate | 1639 | 124 | 40 | 18-22 |  |
| 76 | **cand:h115** | candidate | 1633 | 115 | 40 | 21-19 |  |
| 77 | **cand:h131** | candidate | 1633 | 115 | 40 | 21-19 |  |
| 78 | **cand:h138** | candidate | 1633 | 115 | 40 | 21-19 |  |
| 79 | ldcWV.Battlecode-2019 | field | 1632 | 90 | 90 | 57-33 |  |
| 80 | **cand:h103** | candidate | 1632 | 88 | 76 | 33-43 |  |
| 81 | rafekruse.Battlecode-2019~2680d4 | field | 1627 | 88 | 93 | 57-36 |  |
| 82 | **cand:h136** | candidate | 1622 | 88 | 76 | 32-44 |  |
| 83 | bqi343.cp-notebook | field | 1620 | 87 | 96 | 57-39 |  |
| 84 | **cand:h135** | candidate | 1620 | 99 | 58 | 26-32 |  |
| 85 | **us:v7** | accepted | 1616 | 43 | 1804 | 927-877 |  |
| 86 | **cand:h118** | candidate | 1615 | 115 | 40 | 20-20 |  |
| 87 | **cand:h76** | candidate | 1615 | 184 | 32 | 18-14 |  |
| 88 | **cand:h83** | candidate | 1612 | 298 | 8 | 4-4 |  |
| 89 | **cand:h84** | candidate | 1612 | 298 | 8 | 4-4 |  |
| 90 | **cand:h100** | candidate | 1606 | 64 | 200 | 97-103 |  |
| 91 | **us:v0** | accepted | 1605 | 223 | 38 | 33-5 |  |
| 92 | awesomelemonade.Battlecode2019 | field | 1603 | 45 | 498 | 170-328 | 89% (v12 16-2) |
| 93 | **us:v3** | accepted | 1597 | 95 | 191 | 140-51 |  |
| 94 | **cand:h96** | candidate | 1594 | 100 | 58 | 24-34 |  |
| 95 | **cand:h121** | candidate | 1594 | 100 | 58 | 24-34 |  |
| 96 | **cand:h101** | candidate | 1581 | 116 | 40 | 18-22 |  |
| 97 | **cand:h124** | candidate | 1581 | 116 | 40 | 18-22 |  |
| 98 | **cand:h125** | candidate | 1581 | 116 | 40 | 18-22 |  |
| 99 | **cand:h137** | candidate | 1581 | 116 | 40 | 18-22 |  |
| 100 | **cand:h123** | candidate | 1581 | 100 | 58 | 23-35 |  |
| 101 | **cand:h61** | candidate | 1574 | 252 | 8 | 5-3 |  |
| 102 | **cand:h8v5** | candidate | 1573 | 125 | 48 | 31-17 |  |
| 103 | **cand:h82** | candidate | 1571 | 94 | 134 | 70-64 |  |
| 104 | UpperArlingtonHighSchool.~682aa9 | field | 1569 | 92 | 93 | 54-39 |  |
| 105 | cemondr.BC19pdxgroup4 | field | 1567 | 87 | 93 | 53-40 |  |
| 106 | **cand:h110** | candidate | 1563 | 116 | 40 | 17-23 |  |
| 107 | **cand:h113** | candidate | 1563 | 116 | 40 | 17-23 |  |
| 108 | **cand:h53** | candidate | 1556 | 254 | 8 | 5-3 |  |
| 109 | **cand:h2** | candidate | 1546 | 148 | 54 | 25-29 |  |
| 110 | **cand:h114** | candidate | 1545 | 117 | 40 | 16-24 |  |
| 111 | **cand:h116** | candidate | 1545 | 117 | 40 | 16-24 |  |
| 112 | IvanGeffner.BC19-bot6b | field | 1544 | 377 | 9 | 7-2 |  |
| 113 | **cand:h54** | candidate | 1542 | 123 | 48 | 29-19 |  |
| 114 | **cand:h63** | candidate | 1540 | 126 | 40 | 23-17 |  |
| 115 | IvanGeffner.BC19-eigthbot | field | 1537 | 311 | 9 | 6-3 |  |
| 116 | **cand:h88** | candidate | 1536 | 142 | 40 | 18-22 |  |
| 117 | **cand:h11c** | candidate | 1533 | 178 | 25 | 15-10 |  |
| 118 | Nischay-Pro.BattleCode2019 | field | 1532 | 93 | 90 | 52-38 |  |
| 119 | **cand:h3** | candidate | 1528 | 213 | 19 | 9-10 |  |
| 120 | **cand:h107** | candidate | 1527 | 118 | 40 | 15-25 |  |
| 121 | **cand:h144** | candidate | 1527 | 118 | 40 | 15-25 |  |
| 122 | **cand:h91** | candidate | 1527 | 194 | 16 | 7-9 |  |
| 123 | **cand:h40** | candidate | 1525 | 290 | 8 | 6-2 |  |
| 124 | **cand:h64** | candidate | 1522 | 126 | 40 | 22-18 |  |
| 125 | **cand:h24v5** | candidate | 1521 | 130 | 40 | 23-17 |  |
| 126 | **cand:h7** | candidate | 1513 | 1468 | 8 | 8-0 |  |
| 127 | **cand:h55** | candidate | 1513 | 121 | 56 | 32-24 |  |
| 128 | **cand:h134** | candidate | 1508 | 120 | 40 | 14-26 |  |
| 129 | **spar:rush4** | sparring | 1506 | 132 | 50 | 30-20 |  |
| 130 | ovkulkarni.battlecode2019~0aa607 | field | 1503 | 86 | 96 | 56-40 |  |
| 131 | **cand:h77** | candidate | 1497 | 186 | 16 | 8-8 |  |
| 132 | NielsKornerup.Battlecode-2019 | field | 1492 | 77 | 132 | 70-62 |  |
| 133 | lschaberg.bc19 | field | 1489 | 94 | 84 | 49-35 |  |
| 134 | **us:v6** | accepted | 1488 | 66 | 322 | 130-192 |  |
| 135 | dmunozc.bc19-g8-bots | field | 1485 | 87 | 99 | 56-43 |  |
| 136 | **cand:h43** | candidate | 1469 | 247 | 8 | 4-4 |  |
| 137 | **cand:h47** | candidate | 1469 | 247 | 8 | 4-4 |  |
| 138 | **cand:h48** | candidate | 1469 | 247 | 8 | 4-4 |  |
| 139 | **cand:h49** | candidate | 1469 | 247 | 8 | 4-4 |  |
| 140 | **cand:h59** | candidate | 1469 | 247 | 8 | 4-4 |  |
| 141 | **cand:h60** | candidate | 1469 | 247 | 8 | 4-4 |  |
| 142 | **us:v5** | accepted | 1469 | 72 | 439 | 202-237 |  |
| 143 | **cand:h6** | candidate | 1463 | 114 | 158 | 94-64 |  |
| 144 | dmunozc.bc19-g8-davjasdiv | field | 1459 | 86 | 105 | 58-47 |  |
| 145 | **cand:h38** | candidate | 1457 | 306 | 6 | 4-2 |  |
| 146 | **us:v1** | accepted | 1454 | 135 | 154 | 128-26 |  |
| 147 | **cand:h129** | candidate | 1448 | 127 | 40 | 11-29 |  |
| 148 | m4reko.bc2019-tmores-angels | field | 1445 | 93 | 87 | 51-36 |  |
| 149 | programjames.BC19Bot-seeding | field | 1445 | 91 | 87 | 50-37 |  |
| 150 | **cand:h24** | candidate | 1443 | 153 | 40 | 26-14 |  |
| 151 | **us:v2** | accepted | 1432 | 137 | 62 | 30-32 |  |
| 152 | **cand:h58** | candidate | 1426 | 271 | 8 | 3-5 |  |
| 153 | **cand:h31** | candidate | 1424 | 152 | 40 | 25-15 |  |
| 154 | ovkulkarni.battlecode2019~06c610 | field | 1415 | 100 | 78 | 45-33 |  |
| 155 | howard36.Battlecode2019-eco6 | field | 1410 | 92 | 93 | 49-44 |  |
| 156 | **cand:h41** | candidate | 1383 | 254 | 8 | 3-5 |  |
| 157 | **cand:h42** | candidate | 1383 | 254 | 8 | 3-5 |  |
| 158 | **cand:h46** | candidate | 1383 | 254 | 8 | 3-5 |  |
| 159 | **cand:h52** | candidate | 1383 | 254 | 8 | 3-5 |  |
| 160 | **cand:turtle** | candidate | 1377 | 192 | 20 | 4-16 |  |
| 161 | abcdefguan.battlecode2019 | field | 1358 | 94 | 96 | 50-46 |  |
| 162 | Tom-CCS.BC19 | field | 1346 | 90 | 96 | 48-48 |  |
| 163 | CS554-software-engineerin~a575dc | field | 1341 | 67 | 320 | 188-132 | 100% (v7 3-0) |
| 164 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1335 | 84 | 129 | 65-64 |  |
| 165 | **us:v4** | accepted | 1335 | 105 | 220 | 83-137 |  |
| 166 | ipercyNC.group6-battlecode | field | 1317 | 91 | 96 | 50-46 |  |
| 167 | sunanth123.battlecode19-prorush | field | 1296 | 93 | 93 | 51-42 |  |
| 168 | nthistle.battlecode-2019 | field | 1279 | 91 | 102 | 53-49 | 100% (v5 3-0) |
| 169 | programjames.BC19Bot-root | field | 1278 | 94 | 90 | 48-42 |  |
| 170 | moreda-a.BC2019-t15 | field | 1275 | 100 | 84 | 42-42 |  |
| 171 | **cand:h16r** | candidate | 1266 | 151 | 40 | 16-24 |  |
| 172 | **cand:h18** | candidate | 1265 | 194 | 25 | 6-19 |  |
| 173 | **spar:rush** | sparring | 1265 | 194 | 25 | 6-19 |  |
| 174 | twitu.bc19-tsp | field | 1245 | 97 | 96 | 50-46 |  |
| 175 | cvxluo.battlecode19 | field | 1243 | 93 | 99 | 52-47 |  |
| 176 | evanyeyeye.battlecode2019~af562c | field | 1232 | 97 | 87 | 47-40 |  |
| 177 | vicennial.BattleCode19 | field | 1231 | 87 | 120 | 58-62 |  |
| 178 | CometsTech.battlecode2019 | field | 1231 | 72 | 282 | 131-151 | 100% (v7 3-0) |
| 179 | Nydroam.BatteredCod | field | 1224 | 436 | 6 | 3-3 |  |
| 180 | sunanth123.battlecode19-mainbot | field | 1202 | 92 | 102 | 52-50 |  |
| 181 | JasonLarson44.2019-Battle~1c7639 | field | 1155 | 89 | 111 | 54-57 | 100% (v3 3-0) |
| 182 | spachava753.bc19 | field | 1134 | 99 | 90 | 44-46 |  |
| 183 | bayoumi17m.BattleCode-2019 | field | 1130 | 98 | 90 | 43-47 |  |
| 184 | jamesrayman.HCN-bot | field | 1127 | 97 | 102 | 50-52 | 100% (v5 3-0) |
| 185 | UpperArlingtonHighSchool.~5e7875 | field | 1030 | 109 | 90 | 42-48 |  |
| 186 | jackliu612.Battlecode19 | field | 954 | 118 | 84 | 42-42 |  |
| 187 | TestSubjector.BattleCode2~fb22c7 | field | 933 | 112 | 108 | 50-58 |  |
| 188 | TestSubjector.BattleCode2~e6de74 | field | 925 | 104 | 114 | 54-60 |  |
| 189 | haydenshively.Battle-Code~e1c2fb | field | 925 | 102 | 90 | 39-51 |  |
| 190 | rooneyshuman.Battlecode | field | 913 | 112 | 90 | 40-50 |  |
| 191 | haydenshively.Battle-Code~e37b3e | field | 911 | 106 | 93 | 40-53 |  |
| 192 | dndoja.battlecode19 | field | 881 | 108 | 84 | 36-48 |  |
| 193 | CometsTech.battlecode2019~187e8c | field | 877 | 106 | 93 | 43-50 |  |
| 194 | roy-love.onshoreBattleCode2019 | field | 838 | 106 | 93 | 43-50 |  |
| 195 | SethKitchen.examplefuncsplayer | field | 780 | 118 | 102 | 43-59 |  |
| 196 | liwanlin41.examplefuncsplayer | field | 753 | 109 | 132 | 58-74 |  |
| 197 | dgh2.bc19-t1 | field | 747 | 124 | 93 | 43-50 |  |
| 198 | **cand:h89** | candidate | 742 | 1086 | 8 | 0-8 |  |
| 199 | **cand:h90** | candidate | 742 | 1086 | 8 | 0-8 |  |
| 200 | VictorButoi.BattleCode201~c4576b | field | 723 | 118 | 84 | 40-44 |  |
| 201 | 18dcb01.Battlecode19-robot2 | field | 718 | 116 | 99 | 40-59 |  |
| 202 | jyurkanin.corn_bc19 | field | 674 | 124 | 90 | 36-54 |  |
| 203 | asunathanr.asu_bc | field | 651 | 110 | 108 | 46-62 |  |
| 204 | OmarTahoun.battle-code | field | 640 | 115 | 105 | 45-60 |  |
| 205 | howard36.Battlecode2019-sprint | field | 534 | 125 | 87 | 30-57 |  |
| 206 | nhard.examplefuncsplayer | field | 530 | 123 | 96 | 35-61 |  |
| 207 | waylon531.scala_starter | field | 477 | 134 | 96 | 37-59 |  |
| 208 | vishwasns99.BC_2019 | field | 443 | 133 | 87 | 33-54 |  |
| 209 | bovard.battlecode-2019-un~8822c3 | field | 411 | 139 | 90 | 35-55 |  |
| 210 | DivyanshuSaxena.Battlecode | field | 272 | 145 | 105 | 43-62 |  |
| 211 | bc19-starter | field | 179 | 145 | 394 | 86-308 | 100% (v3 12-0) |
| 212 | RyanSharafuddin.Battlecode_2019 | field | 162 | 145 | 120 | 41-79 |  |
| 213 | jbiewend.Battlecode2019 | field | 138 | 157 | 90 | 32-58 |  |
| 214 | VoidMercy.battlecode-2019-bot | field | 83 | 158 | 87 | 29-58 |  |
| 215 | ryanhzhao.Battlecode-2019 | field | -22 | 170 | 90 | 27-63 |  |
| 216 | djkeyes.bc19 | field | -189 | 172 | 87 | 26-61 |  |
| 217 | yunaganyh.bc19 | field | -222 | 178 | 87 | 25-62 |  |
| 218 | TheRobotCarlson.battlehac~323871 | field | -317 | 173 | 111 | 29-82 |  |
| 219 | jshin313.battlecodebot | field | -328 | 175 | 93 | 22-71 |  |
| 220 | jamesrayman.HCN-basic-bot | field | -391 | 187 | 78 | 14-64 |  |
| 221 | ArtemUstilov.bc19_CrazyTapok | field | -871 | 1083 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| m-schier.battlecode-2019-wololo | mvpatel2000.Battlecode2019 | 18 | 5-13 | 28% | replica |
| m-schier.battlecode-2019-wololo | cand:h195 | 18 | 10-8 | 56% | replica |
| m-schier.battlecode-2019-wololo | cand:h185 | 12 | 6-6 | 50% | replica |
| m-schier.battlecode-2019-wololo | cand:h198 | 6 | 3-3 | 50% | replica |
| m-schier.battlecode-2019-wololo | cand:h201 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h202 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h209 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h211 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h213 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h218 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | uvafan.bc2019 | 21 | 11-10 | 52% | replica |
| m-schier.battlecode-2019-wololo | cand:h203 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h207 | 18 | 13-5 | 72% | replica |
| m-schier.battlecode-2019-wololo | cand:h206 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h214 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | us:v12 | 18 | 14-4 | 78% | replica |
| m-schier.battlecode-2019-wololo | cand:h184 | 18 | 13-5 | 72% | replica |
| m-schier.battlecode-2019-wololo | yujinwunz.battlecode_2019 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | rafekruse.Battlecode-2019-bc19 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h167 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h175 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | VoidMercy.battlecode-2019~e7dc06 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h178 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h212 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v9 | 9 | 7-2 | 78% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | us:v10 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v11 | 9 | 8-1 | 89% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h190 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h193 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h170 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | virenvshah.Battlecode2019 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h157 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h161 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h192 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v8 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h130 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h162 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h126 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | uvafan.bc2019 | 18 | 13-5 | 72% | replica |
| mvpatel2000.Battlecode2019 | cand:h207 | 12 | 6-6 | 50% | replica |
| mvpatel2000.Battlecode2019 | cand:h206 | 6 | 2-4 | 33% | replica |
| mvpatel2000.Battlecode2019 | cand:h214 | 6 | 3-3 | 50% | replica |
| mvpatel2000.Battlecode2019 | us:v12 | 18 | 14-4 | 78% | replica |
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 12 | 9-3 | 75% | replica |
| mvpatel2000.Battlecode2019 | rafekruse.Battlecode-2019-bc19 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v9 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v11 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 6 | 6-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v8 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v7 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 6-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h195 | uvafan.bc2019 | 18 | 12-6 | 67% | replica |
| cand:h195 | StoneT2000.BC19-botfinalsafe | 18 | 9-9 | 50% | replica |
| cand:h195 | StoneT2000.BC19-bot1v43 | 18 | 15-3 | 83% | replica |
| cand:h195 | IanCoolidge0.battlecode20~69ce88 | 18 | 12-6 | 67% | replica |
| cand:h195 | awesomelemonade.Battlecode2019 | 18 | 18-0 | 100% | replica |
| cand:h185 | uvafan.bc2019 | 12 | 8-4 | 67% | replica |
| cand:h185 | StoneT2000.BC19-botfinalsafe | 12 | 5-7 | 42% | replica |
| cand:h185 | StoneT2000.BC19-bot1v43 | 12 | 10-2 | 83% | replica |
| cand:h185 | IanCoolidge0.battlecode20~69ce88 | 12 | 8-4 | 67% | replica |
| cand:h185 | awesomelemonade.Battlecode2019 | 12 | 12-0 | 100% | replica |
| cand:h198 | uvafan.bc2019 | 6 | 2-4 | 33% | replica |
| cand:h198 | StoneT2000.BC19-botfinalsafe | 6 | 3-3 | 50% | replica |
| cand:h198 | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| cand:h198 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h198 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h201 | uvafan.bc2019 | 6 | 3-3 | 50% | replica |
| cand:h201 | StoneT2000.BC19-botfinalsafe | 6 | 4-2 | 67% | replica |
| cand:h201 | StoneT2000.BC19-bot1v43 | 6 | 4-2 | 67% | replica |
| cand:h201 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h201 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h202 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| cand:h202 | StoneT2000.BC19-botfinalsafe | 6 | 3-3 | 50% | replica |
| cand:h202 | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| cand:h202 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h202 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h209 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| cand:h209 | StoneT2000.BC19-botfinalsafe | 6 | 3-3 | 50% | replica |
| cand:h209 | StoneT2000.BC19-bot1v43 | 6 | 4-2 | 67% | replica |
| cand:h209 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| cand:h209 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h211 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| cand:h211 | StoneT2000.BC19-botfinalsafe | 6 | 4-2 | 67% | replica |
| cand:h211 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| cand:h211 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h211 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h213 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| cand:h213 | StoneT2000.BC19-botfinalsafe | 6 | 4-2 | 67% | replica |
| cand:h213 | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| cand:h213 | IanCoolidge0.battlecode20~69ce88 | 6 | 3-3 | 50% | replica |
| cand:h213 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h218 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| cand:h218 | StoneT2000.BC19-botfinalsafe | 6 | 4-2 | 67% | replica |
| cand:h218 | StoneT2000.BC19-bot1v43 | 6 | 4-2 | 67% | replica |
| cand:h218 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h218 | awesomelemonade.Battlecode2019 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h203 | 6 | 2-4 | 33% | replica |
| uvafan.bc2019 | cand:h207 | 18 | 13-5 | 72% | replica |
| uvafan.bc2019 | cand:h206 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | cand:h214 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | us:v12 | 21 | 16-5 | 76% | replica |
| uvafan.bc2019 | cand:h184 | 18 | 9-9 | 50% | replica |
| uvafan.bc2019 | yujinwunz.battlecode_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h167 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | cand:h175 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | VoidMercy.battlecode-2019~e7dc06 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h178 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h212 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v9 | 9 | 6-3 | 67% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | us:v10 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v11 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h190 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h193 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h170 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | virenvshah.Battlecode2019 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h149 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h157 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h161 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h192 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v8 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h162 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h203 | StoneT2000.BC19-botfinalsafe | 6 | 2-4 | 33% | replica |
| cand:h203 | StoneT2000.BC19-bot1v43 | 6 | 4-2 | 67% | replica |
| cand:h203 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h203 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| cand:h207 | StoneT2000.BC19-botfinalsafe | 18 | 11-7 | 61% | replica |
| cand:h207 | StoneT2000.BC19-bot1v43 | 18 | 12-6 | 67% | replica |
| cand:h207 | IanCoolidge0.battlecode20~69ce88 | 18 | 15-3 | 83% | replica |
| cand:h207 | awesomelemonade.Battlecode2019 | 18 | 18-0 | 100% | replica |
| cand:h206 | StoneT2000.BC19-botfinalsafe | 12 | 8-4 | 67% | replica |
| cand:h206 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h206 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h206 | awesomelemonade.Battlecode2019 | 12 | 12-0 | 100% | replica |
| cand:h214 | StoneT2000.BC19-botfinalsafe | 12 | 5-7 | 42% | replica |
| cand:h214 | StoneT2000.BC19-bot1v43 | 12 | 8-4 | 67% | replica |
| cand:h214 | IanCoolidge0.battlecode20~69ce88 | 12 | 12-0 | 100% | replica |
| cand:h214 | awesomelemonade.Battlecode2019 | 12 | 11-1 | 92% | replica |
| us:v12 | yujinwunz.battlecode_2019 | 9 | 5-4 | 56% | replica |
| us:v12 | StoneT2000.BC19-botfinalsafe | 21 | 13-8 | 62% | replica |
| us:v12 | arya-k.bc19 | 6 | 5-1 | 83% | replica |
| us:v12 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| us:v12 | StoneT2000.BC19-bot1v43 | 21 | 17-4 | 81% | replica |
| us:v12 | IanCoolidge0.battlecode20~f649f3 | 6 | 3-3 | 50% | replica |
| us:v12 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v12 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| us:v12 | IanCoolidge0.battlecode20~69ce88 | 21 | 14-7 | 67% | replica |
| us:v12 | awesomelemonade.Battlecode2019 | 18 | 16-2 | 89% | replica |
| cand:h184 | StoneT2000.BC19-botfinalsafe | 18 | 13-5 | 72% | replica |
| cand:h184 | StoneT2000.BC19-bot1v43 | 18 | 7-11 | 39% | replica |
| cand:h184 | IanCoolidge0.battlecode20~69ce88 | 18 | 13-5 | 72% | replica |
| cand:h184 | awesomelemonade.Battlecode2019 | 18 | 15-3 | 83% | replica |
| yujinwunz.battlecode_2019 | rafekruse.Battlecode-2019-bc19 | 6 | 1-5 | 17% | replica |
| yujinwunz.battlecode_2019 | VoidMercy.battlecode-2019~e7dc06 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | StoneT2000.BC19-botfinalsafe | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | us:v11 | 6 | 3-3 | 50% | replica |
| yujinwunz.battlecode_2019 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 3-3 | 50% | replica |
| yujinwunz.battlecode_2019 | virenvshah.Battlecode2019 | 9 | 6-3 | 67% | replica |
| yujinwunz.battlecode_2019 | j-mao.battlecode-2019 | 6 | 4-2 | 67% | replica |
| yujinwunz.battlecode_2019 | us:v8 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| yujinwunz.battlecode_2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | VoidMercy.battlecode-2019~e7dc06 | 12 | 8-4 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-botfinalsafe | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 12 | 4-8 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | moreda-a.BC2019-a31 | 12 | 5-7 | 42% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| rafekruse.Battlecode-2019-bc19 | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 9 | 4-5 | 44% | replica |
| rafekruse.Battlecode-2019-bc19 | us:v8 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 6-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| cand:h167 | StoneT2000.BC19-botfinalsafe | 12 | 6-6 | 50% | replica |
| cand:h167 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h167 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h167 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| cand:h175 | StoneT2000.BC19-botfinalsafe | 12 | 7-5 | 58% | replica |
| cand:h175 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h175 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h175 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v9 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v11 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | arya-k.bc19 | 3 | 0-3 | 0% | replica |
| VoidMercy.battlecode-2019~e7dc06 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| VoidMercy.battlecode-2019~e7dc06 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~69ce88 | 9 | 5-4 | 56% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h178 | StoneT2000.BC19-botfinalsafe | 12 | 5-7 | 42% | replica |
| cand:h178 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h178 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h178 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| cand:h212 | StoneT2000.BC19-botfinalsafe | 6 | 3-3 | 50% | replica |
| cand:h212 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| cand:h212 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h212 | awesomelemonade.Battlecode2019 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h147 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v9 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | us:v10 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v11 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h190 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | virenvshah.Battlecode2019 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h141 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h157 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h161 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h192 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v8 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h139 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h130 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h126 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 9 | 1-8 | 11% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | UpperArlingtonHighSchool.~682aa9 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | Nischay-Pro.BattleCode2019 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 9 | 7-2 | 78% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h147 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h147 | us:v8 | 40 | 26-14 | 65% | local |
| cand:h147 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| cand:h147 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v9 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v9 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| us:v9 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h163 | StoneT2000.BC19-bot1v43 | 18 | 8-10 | 44% | replica |
| cand:h163 | IanCoolidge0.battlecode20~69ce88 | 18 | 14-4 | 78% | replica |
| cand:h163 | awesomelemonade.Battlecode2019 | 18 | 11-7 | 61% | replica |
| cand:h148 | StoneT2000.BC19-bot1v43 | 12 | 7-5 | 58% | replica |
| cand:h148 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h148 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h148 | awesomelemonade.Battlecode2019 | 12 | 7-5 | 58% | replica |
| us:v10 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v10 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| us:v10 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| us:v11 | arya-k.bc19 | 3 | 0-3 | 0% | replica |
| us:v11 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v11 | IanCoolidge0.battlecode20~f649f3 | 6 | 4-2 | 67% | replica |
| us:v11 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| us:v11 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h150 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h150 | us:v8 | 40 | 25-15 | 62% | local |
| cand:h150 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h150 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h159 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h159 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h159 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| arya-k.bc19 | moreda-a.BC2019-a31 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~f649f3 | 6 | 4-2 | 67% | replica |
| arya-k.bc19 | virenvshah.Battlecode2019 | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | us:v8 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 9 | 5-4 | 56% | replica |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 6 | 6-0 | 100% | replica |
| arya-k.bc19 | bqi343.cp-notebook | 6 | 4-2 | 67% | replica |
| arya-k.bc19 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-a31 | us:v8 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 12 | 8-4 | 67% | replica |
| moreda-a.BC2019-a31 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | IanCoolidge0.battlecode20~69ce88 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h145 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h145 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h190 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| cand:h190 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h190 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h193 | StoneT2000.BC19-bot1v43 | 6 | 2-4 | 33% | replica |
| cand:h193 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h193 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | virenvshah.Battlecode2019 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | j-mao.battlecode-2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h157 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | cand:h161 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h192 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | vineetparikh.BigRedBattle~fe3459 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | unrevre.battlecode | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 9 | 2-7 | 22% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | bqi343.cp-notebook | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h121 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | UpperArlingtonHighSchool.~682aa9 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 9 | 9-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| cand:h170 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h170 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | us:v8 | 3 | 0-3 | 0% | replica |
| IanCoolidge0.battlecode20~f649f3 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | rafekruse.Battlecode-2019~2680d4 | 9 | 9-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | us:v3 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | NielsKornerup.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 12 | 8-4 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | rafekruse.Battlecode-2019~2680d4 | 6 | 2-4 | 33% | replica |
| virenvshah.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| virenvshah.Battlecode2019 | Nischay-Pro.BattleCode2019 | 6 | 4-2 | 67% | replica |
| virenvshah.Battlecode2019 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h146 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h146 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h146 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h149 | us:v8 | 40 | 20-20 | 50% | local |
| cand:h149 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h149 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | us:v8 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | vineetparikh.BigRedBattle~fe3459 | 6 | 1-5 | 17% | replica |
| j-mao.battlecode-2019 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| j-mao.battlecode-2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h143 | us:v7 | 40 | 24-16 | 60% | local |
| cand:block | us:v7 | 20 | 12-8 | 60% | local |
| cand:camp | us:v7 | 20 | 12-8 | 60% | local |
| cand:h141 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| cand:h141 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h141 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h157 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h157 | awesomelemonade.Battlecode2019 | 6 | 5-1 | 83% | replica |
| cand:h161 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h161 | awesomelemonade.Battlecode2019 | 6 | 3-3 | 50% | replica |
| cand:h192 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h192 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| us:v8 | cand:h151 | 40 | 22-18 | 55% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h139 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| cand:h139 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h139 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h140 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h130 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h130 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h162 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h162 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 6 | 3-3 | 50% | replica |
| vineetparikh.BigRedBattle~fe3459 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| vineetparikh.BigRedBattle~fe3459 | ovkulkarni.battlecode2019~0aa607 | 6 | 4-2 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| unrevre.battlecode | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| unrevre.battlecode | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | Nischay-Pro.BattleCode2019 | 6 | 4-2 | 67% | replica |
| unrevre.battlecode | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h126 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| IanCoolidge0.battlecode20~69ce88 | cand:h104 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h111 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h112 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h127 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | rafekruse.Battlecode-2019~2680d4 | 6 | 1-5 | 17% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | awesomelemonade.Battlecode2019 | 9 | 9-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h121 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h123 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v6 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h104 | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h127 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| ldcWV.Battlecode-2019 | bqi343.cp-notebook | 9 | 8-1 | 89% | replica |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 3-3 | 50% | replica |
| ldcWV.Battlecode-2019 | cemondr.BC19pdxgroup4 | 6 | 4-2 | 67% | replica |
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| ldcWV.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | Tom-CCS.BC19 | 6 | 5-1 | 83% | replica |
| ldcWV.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | cvxluo.battlecode19 | 6 | 6-0 | 100% | replica |
| ldcWV.Battlecode-2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h103 | awesomelemonade.Battlecode2019 | 6 | 1-5 | 17% | replica |
| rafekruse.Battlecode-2019~2680d4 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 6 | 2-4 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h136 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| bqi343.cp-notebook | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| bqi343.cp-notebook | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| bqi343.cp-notebook | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| bqi343.cp-notebook | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h135 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| us:v7 | cand:h118 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
| us:v7 | cand:h121 | 40 | 21-19 | 52% | local |
| us:v7 | cand:h101 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h124 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h125 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h137 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h123 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h82 | 8 | 6-2 | 75% | local |
| us:v7 | cand:h110 | 40 | 23-17 | 57% | local |
| us:v7 | cand:h113 | 40 | 23-17 | 57% | local |
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
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 9 | 7-2 | 78% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| UpperArlingtonHighSchool.~682aa9 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | sunanth123.battlecode19-prorush | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | Nischay-Pro.BattleCode2019 | 6 | 4-2 | 67% | replica |
| cemondr.BC19pdxgroup4 | ovkulkarni.battlecode2019~0aa607 | 3 | 0-3 | 0% | replica |
| cemondr.BC19pdxgroup4 | lschaberg.bc19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| Nischay-Pro.BattleCode2019 | lschaberg.bc19 | 3 | 0-3 | 0% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| ovkulkarni.battlecode2019~0aa607 | NielsKornerup.Battlecode-2019 | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-davjasdiv | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-seeding | 6 | 6-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 6 | 5-1 | 83% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~0aa607 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-bots | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 9 | 6-3 | 67% | replica |
| NielsKornerup.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | programjames.BC19Bot-seeding | 6 | 5-1 | 83% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | abcdefguan.battlecode2019 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| lschaberg.bc19 | programjames.BC19Bot-seeding | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | ovkulkarni.battlecode2019~06c610 | 9 | 5-4 | 56% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| dmunozc.bc19-g8-bots | dmunozc.bc19-g8-davjasdiv | 9 | 4-5 | 44% | replica |
| dmunozc.bc19-g8-bots | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~06c610 | 6 | 4-2 | 67% | replica |
| dmunozc.bc19-g8-bots | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | evanyeyeye.battlecode2019~af562c | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h43 | us:v5 | 8 | 4-4 | 50% | local |
| cand:h47 | us:v5 | 8 | 4-4 | 50% | local |
| cand:h48 | us:v5 | 8 | 4-4 | 50% | local |
| cand:h49 | us:v5 | 8 | 4-4 | 50% | local |
| cand:h59 | us:v5 | 8 | 4-4 | 50% | local |
| cand:h60 | us:v5 | 8 | 4-4 | 50% | local |
| us:v5 | cand:h41 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h42 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h46 | 8 | 5-3 | 62% | local |
| us:v5 | cand:h52 | 8 | 5-3 | 62% | local |
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-davjasdiv | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | nthistle.battlecode-2019 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-davjasdiv | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | moreda-a.BC2019-t15 | 6 | 4-2 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| m4reko.bc2019-tmores-angels | programjames.BC19Bot-seeding | 9 | 3-6 | 33% | replica |
| m4reko.bc2019-tmores-angels | howard36.Battlecode2019-eco6 | 6 | 4-2 | 67% | replica |
| m4reko.bc2019-tmores-angels | abcdefguan.battlecode2019 | 6 | 6-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | ipercyNC.group6-battlecode | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 9 | 8-1 | 89% | replica |
| programjames.BC19Bot-seeding | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 9 | 4-5 | 44% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | moreda-a.BC2019-t15 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | ipercyNC.group6-battlecode | 12 | 7-5 | 58% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 6 | 2-4 | 33% | replica |
| abcdefguan.battlecode2019 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| abcdefguan.battlecode2019 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 6 | 4-2 | 67% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| Tom-CCS.BC19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | nthistle.battlecode-2019 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 6 | 1-5 | 17% | replica |
| Tom-CCS.BC19 | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | 18dcb01.Battlecode19-prea~fb5c48 | 9 | 5-4 | 56% | replica |
| CS554-software-engineerin~a575dc | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | nthistle.battlecode-2019 | 6 | 5-1 | 83% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | twitu.bc19-tsp | 6 | 5-1 | 83% | replica |
| CS554-software-engineerin~a575dc | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 6 | 2-4 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | programjames.BC19Bot-root | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | vicennial.BattleCode19 | 6 | 1-5 | 17% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| ipercyNC.group6-battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 9 | 8-1 | 89% | replica |
| ipercyNC.group6-battlecode | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 6 | 4-2 | 67% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 9 | 7-2 | 78% | replica |
| sunanth123.battlecode19-prorush | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 6 | 2-4 | 33% | replica |
| sunanth123.battlecode19-prorush | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-prorush | UpperArlingtonHighSchool.~5e7875 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 6 | 3-3 | 50% | replica |
| nthistle.battlecode-2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | cvxluo.battlecode19 | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-root | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-root | vicennial.BattleCode19 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-root | sunanth123.battlecode19-mainbot | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | liwanlin41.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | JasonLarson44.2019-Battle~1c7639 | 12 | 8-4 | 67% | replica |
| cvxluo.battlecode19 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 9 | 5-4 | 56% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 6 | 5-1 | 83% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | CometsTech.battlecode2019 | 3 | 1-2 | 33% | replica |
| vicennial.BattleCode19 | sunanth123.battlecode19-mainbot | 6 | 4-2 | 67% | replica |
| vicennial.BattleCode19 | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| vicennial.BattleCode19 | spachava753.bc19 | 9 | 6-3 | 67% | replica |
| vicennial.BattleCode19 | jamesrayman.HCN-bot | 6 | 6-0 | 100% | replica |
| vicennial.BattleCode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 6 | 3-3 | 50% | replica |
| CometsTech.battlecode2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | SethKitchen.examplefuncsplayer | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019 | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | spachava753.bc19 | 6 | 3-3 | 50% | replica |
| sunanth123.battlecode19-mainbot | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-mainbot | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| JasonLarson44.2019-Battle~1c7639 | jamesrayman.HCN-bot | 6 | 3-3 | 50% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bayoumi17m.BattleCode-2019 | 3 | 0-3 | 0% | replica |
| spachava753.bc19 | jamesrayman.HCN-bot | 6 | 4-2 | 67% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| bayoumi17m.BattleCode-2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 9 | 7-2 | 78% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| bayoumi17m.BattleCode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~fb22c7 | 6 | 6-0 | 100% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e1c2fb | 6 | 3-3 | 50% | replica |
| UpperArlingtonHighSchool.~5e7875 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 6 | 5-1 | 83% | replica |
| UpperArlingtonHighSchool.~5e7875 | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | dndoja.battlecode19 | 6 | 4-2 | 67% | replica |
| jackliu612.Battlecode19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | liwanlin41.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| jackliu612.Battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| jackliu612.Battlecode19 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | haydenshively.Battle-Code~e1c2fb | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | CometsTech.battlecode2019~187e8c | 6 | 5-1 | 83% | replica |
| TestSubjector.BattleCode2~fb22c7 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | 18dcb01.Battlecode19-robot2 | 6 | 2-4 | 33% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e1c2fb | 9 | 5-4 | 56% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e37b3e | 6 | 3-3 | 50% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 9 | 6-3 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | roy-love.onshoreBattleCode2019 | 6 | 2-4 | 33% | replica |
| TestSubjector.BattleCode2~e6de74 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 12 | 8-4 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | CometsTech.battlecode2019~187e8c | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e1c2fb | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | dndoja.battlecode19 | 12 | 5-7 | 42% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 9 | 3-6 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | SethKitchen.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| dndoja.battlecode19 | liwanlin41.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| dndoja.battlecode19 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019~187e8c | SethKitchen.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | asunathanr.asu_bc | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | SethKitchen.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| roy-love.onshoreBattleCode2019 | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| roy-love.onshoreBattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | bc19-starter | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | liwanlin41.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | jyurkanin.corn_bc19 | 9 | 5-4 | 56% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 12 | 9-3 | 75% | replica |
| SethKitchen.examplefuncsplayer | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 9 | 6-3 | 67% | replica |
| liwanlin41.examplefuncsplayer | 18dcb01.Battlecode19-robot2 | 6 | 4-2 | 67% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | asunathanr.asu_bc | 9 | 6-3 | 67% | replica |
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | howard36.Battlecode2019-sprint | 6 | 2-4 | 33% | replica |
| liwanlin41.examplefuncsplayer | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 9 | 9-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 6 | 3-3 | 50% | replica |
| dgh2.bc19-t1 | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 12 | 9-3 | 75% | replica |
| dgh2.bc19-t1 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | asunathanr.asu_bc | 6 | 2-4 | 33% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | nhard.examplefuncsplayer | 6 | 5-1 | 83% | replica |
| VictorButoi.BattleCode201~c4576b | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | jyurkanin.corn_bc19 | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 9 | 7-2 | 78% | replica |
| 18dcb01.Battlecode19-robot2 | howard36.Battlecode2019-sprint | 9 | 7-2 | 78% | replica |
| 18dcb01.Battlecode19-robot2 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | OmarTahoun.battle-code | 6 | 2-4 | 33% | replica |
| jyurkanin.corn_bc19 | nhard.examplefuncsplayer | 6 | 5-1 | 83% | replica |
| jyurkanin.corn_bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
| asunathanr.asu_bc | howard36.Battlecode2019-sprint | 6 | 2-4 | 33% | replica |
| asunathanr.asu_bc | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| asunathanr.asu_bc | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 9 | 7-2 | 78% | replica |
| asunathanr.asu_bc | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | howard36.Battlecode2019-sprint | 3 | 0-3 | 0% | replica |
| OmarTahoun.battle-code | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| OmarTahoun.battle-code | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| OmarTahoun.battle-code | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | bc19-starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | nhard.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| howard36.Battlecode2019-sprint | vishwasns99.BC_2019 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 9 | 9-0 | 100% | replica |
| howard36.Battlecode2019-sprint | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | bovard.battlecode-2019-un~8822c3 | 6 | 5-1 | 83% | replica |
| nhard.examplefuncsplayer | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| waylon531.scala_starter | vishwasns99.BC_2019 | 9 | 8-1 | 89% | replica |
| waylon531.scala_starter | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| waylon531.scala_starter | bc19-starter | 6 | 4-2 | 67% | replica |
| waylon531.scala_starter | RyanSharafuddin.Battlecode_2019 | 9 | 9-0 | 100% | replica |
| waylon531.scala_starter | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | bovard.battlecode-2019-un~8822c3 | 9 | 3-6 | 33% | replica |
| vishwasns99.BC_2019 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 9 | 9-0 | 100% | replica |
| vishwasns99.BC_2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | bc19-starter | 3 | 2-1 | 67% | replica |
| bovard.battlecode-2019-un~8822c3 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | ryanhzhao.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 15 | 9-6 | 60% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | ryanhzhao.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| DivyanshuSaxena.Battlecode | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 12 | 4-8 | 33% | replica |
| bc19-starter | jbiewend.Battlecode2019 | 6 | 4-2 | 67% | replica |
| bc19-starter | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| bc19-starter | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| bc19-starter | yunaganyh.bc19 | 6 | 4-2 | 67% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| RyanSharafuddin.Battlecode_2019 | VoidMercy.battlecode-2019-bot | 9 | 6-3 | 67% | replica |
| RyanSharafuddin.Battlecode_2019 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 12 | 12-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 2-1 | 67% | replica |
| jbiewend.Battlecode2019 | ryanhzhao.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 9 | 9-0 | 100% | replica |
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | ryanhzhao.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 6 | 6-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 9 | 8-1 | 89% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 9 | 4-5 | 44% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | TheRobotCarlson.battlehac~323871 | 3 | 2-1 | 67% | replica |
| ryanhzhao.Battlecode-2019 | jshin313.battlecodebot | 9 | 8-1 | 89% | replica |
| ryanhzhao.Battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 2-1 | 67% | replica |
| djkeyes.bc19 | yunaganyh.bc19 | 3 | 2-1 | 67% | replica |
| djkeyes.bc19 | TheRobotCarlson.battlehac~323871 | 9 | 5-4 | 56% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 12 | 9-3 | 75% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 6 | 5-1 | 83% | replica |
| yunaganyh.bc19 | TheRobotCarlson.battlehac~323871 | 6 | 4-2 | 67% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 12 | 8-4 | 67% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 12 | 9-3 | 75% | replica |
| TheRobotCarlson.battlehac~323871 | jshin313.battlecodebot | 21 | 11-10 | 52% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 18 | 9-9 | 50% | replica |
| jshin313.battlecodebot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
