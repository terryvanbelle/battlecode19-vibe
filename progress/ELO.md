# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-27 16:11 PDT.

10219 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 2719 of ours on the galaxy replica and 4257 between field bots there (4254 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 220 players; compare them only within this fit.

**Thin field.** 89 rated field bots (m-schier.battlecode-2019-wololo, mvpatel2000.Battlecode2019, uvafan.bc2019, yujinwunz.battlecode_2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, StoneT2000.BC19-botfinalsafe, arya-k.bc19, moreda-a.BC2019-a31, StoneT2000.BC19-bot1v43, virenvshah.Battlecode2019, j-mao.battlecode-2019, IanCoolidge0.battlecode20~f649f3, vineetparikh.BigRedBattle~fe3459, IanCoolidge0.battlecode20~69ce88, rafekruse.Battlecode-2019~2680d4, ldcWV.Battlecode-2019, unrevre.battlecode, bqi343.cp-notebook, awesomelemonade.Battlecode2019, cemondr.BC19pdxgroup4, UpperArlingtonHighSchool.~682aa9, IvanGeffner.BC19-bot6b, IvanGeffner.BC19-eigthbot, Nischay-Pro.BattleCode2019, lschaberg.bc19, NielsKornerup.Battlecode-2019, ovkulkarni.battlecode2019~0aa607, dmunozc.bc19-g8-bots, dmunozc.bc19-g8-davjasdiv, programjames.BC19Bot-seeding, m4reko.bc2019-tmores-angels, ovkulkarni.battlecode2019~06c610, howard36.Battlecode2019-eco6, abcdefguan.battlecode2019, Tom-CCS.BC19, CS554-software-engineerin~a575dc, 18dcb01.Battlecode19-prea~fb5c48, ipercyNC.group6-battlecode, sunanth123.battlecode19-prorush, moreda-a.BC2019-t15, nthistle.battlecode-2019, twitu.bc19-tsp, programjames.BC19Bot-root, cvxluo.battlecode19, CometsTech.battlecode2019, vicennial.BattleCode19, evanyeyeye.battlecode2019~af562c, Nydroam.BatteredCod, sunanth123.battlecode19-mainbot, JasonLarson44.2019-Battle~1c7639, bayoumi17m.BattleCode-2019, spachava753.bc19, jamesrayman.HCN-bot, UpperArlingtonHighSchool.~5e7875, jackliu612.Battlecode19, TestSubjector.BattleCode2~e6de74, TestSubjector.BattleCode2~fb22c7, haydenshively.Battle-Code~e37b3e, haydenshively.Battle-Code~e1c2fb, rooneyshuman.Battlecode, dndoja.battlecode19, CometsTech.battlecode2019~187e8c, roy-love.onshoreBattleCode2019, SethKitchen.examplefuncsplayer, liwanlin41.examplefuncsplayer, 18dcb01.Battlecode19-robot2, dgh2.bc19-t1, VictorButoi.BattleCode201~c4576b, jyurkanin.corn_bc19, asunathanr.asu_bc, OmarTahoun.battle-code, nhard.examplefuncsplayer, howard36.Battlecode2019-sprint, waylon531.scala_starter, vishwasns99.BC_2019, bovard.battlecode-2019-un~8822c3, DivyanshuSaxena.Battlecode, bc19-starter, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, VoidMercy.battlecode-2019-bot, ryanhzhao.Battlecode-2019, yunaganyh.bc19, djkeyes.bc19, TheRobotCarlson.battlehac~323871, jshin313.battlecodebot, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1603 ± 223 | 91 of 220 | 38 | 33-5 | 76.5% | 33.2% (vs 20) |
| v1 | accepted | 1452 ± 135 | 145 of 220 | 154 | 128-26 | 66.7% | 25.6% (vs 30) |
| v2 | accepted | 1430 ± 137 | 150 of 220 | 62 | 30-32 | 65.2% | 25.1% (vs 32) |
| v3 | accepted | 1596 ± 95 | 94 of 220 | 191 | 140-51 | 76.1% | 32.4% (vs 20) |
| v4 | accepted | 1336 ± 105 | 162 of 220 | 220 | 83-137 | 58.9% | 19.8% (vs 36) |
| v5 | accepted | 1471 ± 72 | 141 of 220 | 439 | 202-237 | 67.9% | 26.7% (vs 29) |
| v6 | accepted | 1490 ± 66 | 132 of 220 | 322 | 130-192 | 69.2% | 27.1% (vs 27) |
| v7 | accepted | 1619 ± 43 | 84 of 220 | 1804 | 927-877 | 77.5% | 34.3% (vs 19) |
| v8 | accepted | 1677 ± 62 | 54 of 220 | 356 | 160-196 | 81.0% | 35.1% (vs 13) |
| v9 | accepted | 1757 ± 111 | 27 of 220 | 48 | 21-27 | 85.2% | 35.7% (vs 7) |
| v10 | accepted | 1747 ± 125 | 30 of 220 | 36 | 17-19 | 84.8% | 34.6% (vs 7) |
| v11 | accepted | 1745 ± 93 | 31 of 220 | 69 | 30-39 | 84.7% | 34.3% (vs 7) |
| v12 | accepted | 1834 ± 65 | 17 of 220 | 168 | 94-74 | 88.8% | 33.0% (vs 3) |
| block | candidate | 1688 ± 160 | 48 of 220 | 20 | 12-8 | 81.6% | 36.5% (vs 13) |
| camp | candidate | 1688 ± 160 | 49 of 220 | 20 | 12-8 | 81.6% | 36.5% (vs 13) |
| h100 | candidate | 1609 ± 65 | 90 of 220 | 200 | 97-103 | 76.9% | 33.9% (vs 20) |
| h101 | candidate | 1584 ± 116 | 96 of 220 | 40 | 18-22 | 75.3% | 31.0% (vs 20) |
| h103 | candidate | 1635 ± 88 | 78 of 220 | 76 | 33-43 | 78.5% | 33.6% (vs 16) |
| h104 | candidate | 1648 ± 99 | 69 of 220 | 58 | 28-30 | 79.3% | 34.1% (vs 15) |
| h107 | candidate | 1530 ± 119 | 118 of 220 | 40 | 15-25 | 71.9% | 29.6% (vs 25) |
| h110 | candidate | 1566 ± 116 | 104 of 220 | 40 | 17-23 | 74.2% | 29.9% (vs 21) |
| h111 | candidate | 1648 ± 99 | 70 of 220 | 58 | 28-30 | 79.3% | 34.1% (vs 15) |
| h112 | candidate | 1648 ± 99 | 71 of 220 | 58 | 28-30 | 79.3% | 34.1% (vs 15) |
| h113 | candidate | 1566 ± 116 | 105 of 220 | 40 | 17-23 | 74.2% | 29.9% (vs 21) |
| h114 | candidate | 1548 ± 117 | 108 of 220 | 40 | 16-24 | 73.1% | 28.9% (vs 22) |
| h115 | candidate | 1636 ± 115 | 75 of 220 | 40 | 21-19 | 78.6% | 33.6% (vs 16) |
| h116 | candidate | 1548 ± 117 | 109 of 220 | 40 | 16-24 | 73.1% | 28.9% (vs 22) |
| h118 | candidate | 1619 ± 115 | 85 of 220 | 40 | 20-20 | 77.5% | 34.3% (vs 19) |
| h11c | candidate | 1533 ± 178 | 115 of 220 | 25 | 15-10 | 72.1% | 28.1% (vs 23) |
| h121 | candidate | 1597 ± 100 | 92 of 220 | 58 | 24-34 | 76.2% | 32.5% (vs 20) |
| h123 | candidate | 1584 ± 100 | 95 of 220 | 58 | 23-35 | 75.3% | 31.0% (vs 20) |
| h124 | candidate | 1584 ± 116 | 97 of 220 | 40 | 18-22 | 75.3% | 31.0% (vs 20) |
| h125 | candidate | 1584 ± 116 | 98 of 220 | 40 | 18-22 | 75.3% | 31.0% (vs 20) |
| h126 | candidate | 1653 ± 85 | 64 of 220 | 98 | 49-49 | 79.6% | 32.3% (vs 13) |
| h127 | candidate | 1643 ± 85 | 72 of 220 | 98 | 47-51 | 79.0% | 33.4% (vs 15) |
| h128 | candidate | 1711 ± 105 | 40 of 220 | 54 | 23-31 | 82.8% | 35.4% (vs 10) |
| h129 | candidate | 1451 ± 127 | 146 of 220 | 40 | 11-29 | 66.6% | 25.6% (vs 30) |
| h130 | candidate | 1661 ± 99 | 61 of 220 | 58 | 29-29 | 80.0% | 33.2% (vs 13) |
| h131 | candidate | 1636 ± 115 | 76 of 220 | 40 | 21-19 | 78.6% | 33.6% (vs 16) |
| h132 | candidate | 1671 ± 116 | 60 of 220 | 40 | 23-17 | 80.6% | 34.4% (vs 13) |
| h133 | candidate | 1653 ± 116 | 65 of 220 | 40 | 22-18 | 79.6% | 32.2% (vs 13) |
| h134 | candidate | 1512 ± 120 | 127 of 220 | 40 | 14-26 | 70.7% | 27.6% (vs 25) |
| h135 | candidate | 1623 ± 99 | 82 of 220 | 58 | 26-32 | 77.8% | 33.9% (vs 18) |
| h136 | candidate | 1625 ± 89 | 81 of 220 | 76 | 32-44 | 77.9% | 34.2% (vs 18) |
| h137 | candidate | 1584 ± 116 | 99 of 220 | 40 | 18-22 | 75.3% | 31.0% (vs 20) |
| h138 | candidate | 1636 ± 115 | 77 of 220 | 40 | 21-19 | 78.6% | 33.6% (vs 16) |
| h139 | candidate | 1675 ± 88 | 58 of 220 | 76 | 37-39 | 80.9% | 34.9% (vs 13) |
| h140 | candidate | 1674 ± 99 | 59 of 220 | 58 | 30-28 | 80.8% | 34.7% (vs 13) |
| h141 | candidate | 1687 ± 99 | 50 of 220 | 58 | 31-27 | 81.5% | 36.3% (vs 13) |
| h142 | candidate | 1653 ± 116 | 66 of 220 | 40 | 22-18 | 79.6% | 32.2% (vs 13) |
| h143 | candidate | 1689 ± 117 | 46 of 220 | 40 | 24-16 | 81.6% | 35.4% (vs 12) |
| h144 | candidate | 1530 ± 119 | 119 of 220 | 40 | 15-25 | 71.9% | 29.6% (vs 25) |
| h145 | candidate | 1728 ± 104 | 35 of 220 | 58 | 31-27 | 83.8% | 34.4% (vs 8) |
| h146 | candidate | 1690 ± 104 | 43 of 220 | 58 | 28-30 | 81.7% | 34.3% (vs 11) |
| h147 | candidate | 1767 ± 105 | 26 of 220 | 58 | 34-24 | 85.7% | 37.0% (vs 7) |
| h148 | candidate | 1748 ± 77 | 29 of 220 | 112 | 58-54 | 84.8% | 34.6% (vs 7) |
| h149 | candidate | 1690 ± 104 | 44 of 220 | 58 | 28-30 | 81.7% | 34.3% (vs 11) |
| h150 | candidate | 1741 ± 104 | 32 of 220 | 58 | 32-26 | 84.4% | 33.8% (vs 7) |
| h151 | candidate | 1642 ± 124 | 73 of 220 | 40 | 18-22 | 78.9% | 33.3% (vs 15) |
| h157 | candidate | 1680 ± 127 | 51 of 220 | 36 | 14-22 | 81.2% | 35.5% (vs 13) |
| h159 | candidate | 1737 ± 92 | 33 of 220 | 72 | 33-39 | 84.2% | 33.3% (vs 7) |
| h161 | candidate | 1680 ± 127 | 52 of 220 | 36 | 14-22 | 81.2% | 35.5% (vs 13) |
| h162 | candidate | 1657 ± 129 | 62 of 220 | 36 | 13-23 | 79.8% | 32.7% (vs 13) |
| h163 | candidate | 1748 ± 77 | 28 of 220 | 108 | 51-57 | 84.8% | 34.7% (vs 7) |
| h167 | candidate | 1792 ± 92 | 21 of 220 | 72 | 38-34 | 86.9% | 35.3% (vs 5) |
| h16r | candidate | 1267 ± 151 | 169 of 220 | 40 | 16-24 | 54.4% | 18.9% (vs 42) |
| h170 | candidate | 1703 ± 126 | 41 of 220 | 36 | 15-21 | 82.4% | 34.4% (vs 10) |
| h175 | candidate | 1781 ± 92 | 22 of 220 | 72 | 37-35 | 86.4% | 33.9% (vs 5) |
| h178 | candidate | 1770 ± 92 | 24 of 220 | 72 | 36-36 | 85.9% | 35.3% (vs 6) |
| h18 | candidate | 1265 ± 194 | 170 of 220 | 25 | 6-19 | 54.3% | 18.8% (vs 42) |
| h184 | candidate | 1830 ± 78 | 18 of 220 | 108 | 62-46 | 88.6% | 32.4% (vs 3) |
| h185 | candidate | 1920 ± 98 | 4 of 220 | 72 | 49-23 | 92.0% | 39.9% (vs 2) |
| h190 | candidate | 1725 ± 126 | 38 of 220 | 36 | 16-20 | 83.6% | 37.2% (vs 10) |
| h192 | candidate | 1680 ± 127 | 53 of 220 | 36 | 14-22 | 81.2% | 35.5% (vs 13) |
| h193 | candidate | 1725 ± 126 | 39 of 220 | 36 | 16-20 | 83.6% | 37.2% (vs 10) |
| h195 | candidate | 1925 ± 82 | 3 of 220 | 108 | 74-34 | 92.2% | 40.5% (vs 2) |
| h198 | candidate | 1907 ± 132 | 5 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h2 | candidate | 1545 ± 148 | 110 of 220 | 54 | 25-29 | 72.9% | 28.5% (vs 22) |
| h201 | candidate | 1907 ± 132 | 6 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h202 | candidate | 1907 ± 132 | 7 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h203 | candidate | 1883 ± 130 | 13 of 220 | 36 | 23-13 | 90.7% | 39.3% (vs 3) |
| h206 | candidate | 1861 ± 91 | 15 of 220 | 78 | 46-32 | 89.9% | 36.4% (vs 3) |
| h207 | candidate | 1875 ± 76 | 14 of 220 | 120 | 72-48 | 90.4% | 38.3% (vs 3) |
| h209 | candidate | 1907 ± 132 | 8 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h211 | candidate | 1907 ± 132 | 9 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h213 | candidate | 1907 ± 132 | 10 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h214 | candidate | 1850 ± 90 | 16 of 220 | 78 | 45-33 | 89.4% | 35.0% (vs 3) |
| h218 | candidate | 1907 ± 132 | 11 of 220 | 36 | 24-12 | 91.6% | 38.0% (vs 2) |
| h24 | candidate | 1444 ± 153 | 147 of 220 | 40 | 26-14 | 66.1% | 24.9% (vs 30) |
| h24v5 | candidate | 1523 ± 130 | 124 of 220 | 40 | 23-17 | 71.4% | 28.8% (vs 25) |
| h3 | candidate | 1527 ± 213 | 121 of 220 | 19 | 9-10 | 71.6% | 29.2% (vs 25) |
| h31 | candidate | 1425 ± 152 | 152 of 220 | 40 | 25-15 | 64.9% | 24.6% (vs 32) |
| h38 | candidate | 1458 ± 306 | 143 of 220 | 6 | 4-2 | 67.1% | 25.4% (vs 29) |
| h40 | candidate | 1526 ± 290 | 122 of 220 | 8 | 6-2 | 71.6% | 29.1% (vs 25) |
| h41 | candidate | 1385 ± 254 | 155 of 220 | 8 | 3-5 | 62.2% | 22.4% (vs 34) |
| h42 | candidate | 1385 ± 254 | 156 of 220 | 8 | 3-5 | 62.2% | 22.4% (vs 34) |
| h43 | candidate | 1472 ± 247 | 135 of 220 | 8 | 4-4 | 68.0% | 26.8% (vs 29) |
| h44 | candidate | 1657 ± 280 | 63 of 220 | 8 | 6-2 | 79.8% | 32.7% (vs 13) |
| h46 | candidate | 1385 ± 254 | 157 of 220 | 8 | 3-5 | 62.2% | 22.4% (vs 34) |
| h47 | candidate | 1472 ± 247 | 136 of 220 | 8 | 4-4 | 68.0% | 26.8% (vs 29) |
| h48 | candidate | 1472 ± 247 | 137 of 220 | 8 | 4-4 | 68.0% | 26.8% (vs 29) |
| h49 | candidate | 1472 ± 247 | 138 of 220 | 8 | 4-4 | 68.0% | 26.8% (vs 29) |
| h52 | candidate | 1385 ± 254 | 158 of 220 | 8 | 3-5 | 62.2% | 22.4% (vs 34) |
| h53 | candidate | 1558 ± 254 | 107 of 220 | 8 | 5-3 | 73.7% | 29.9% (vs 22) |
| h54 | candidate | 1544 ± 123 | 112 of 220 | 48 | 29-19 | 72.8% | 29.3% (vs 23) |
| h55 | candidate | 1515 ± 121 | 125 of 220 | 56 | 32-24 | 70.9% | 27.9% (vs 25) |
| h58 | candidate | 1428 ± 271 | 151 of 220 | 8 | 3-5 | 65.1% | 24.9% (vs 32) |
| h59 | candidate | 1472 ± 247 | 139 of 220 | 8 | 4-4 | 68.0% | 26.8% (vs 29) |
| h6 | candidate | 1463 ± 114 | 142 of 220 | 158 | 94-64 | 67.4% | 25.9% (vs 29) |
| h60 | candidate | 1472 ± 247 | 140 of 220 | 8 | 4-4 | 68.0% | 26.8% (vs 29) |
| h61 | candidate | 1577 ± 252 | 100 of 220 | 8 | 5-3 | 74.9% | 30.2% (vs 20) |
| h63 | candidate | 1543 ± 127 | 113 of 220 | 40 | 23-17 | 72.7% | 29.2% (vs 23) |
| h64 | candidate | 1525 ± 126 | 123 of 220 | 40 | 22-18 | 71.5% | 29.0% (vs 25) |
| h68 | candidate | 1676 ± 279 | 55 of 220 | 8 | 6-2 | 80.9% | 35.0% (vs 13) |
| h7 | candidate | 1514 ± 1466 | 126 of 220 | 8 | 8-0 | 70.8% | 27.8% (vs 25) |
| h72 | candidate | 1676 ± 279 | 56 of 220 | 8 | 6-2 | 80.9% | 35.0% (vs 13) |
| h76 | candidate | 1617 ± 184 | 86 of 220 | 32 | 18-14 | 77.4% | 34.1% (vs 19) |
| h77 | candidate | 1500 ± 186 | 130 of 220 | 16 | 8-8 | 69.9% | 27.2% (vs 26) |
| h78 | candidate | 1676 ± 279 | 57 of 220 | 8 | 6-2 | 80.9% | 35.0% (vs 13) |
| h82 | candidate | 1574 ± 94 | 103 of 220 | 134 | 70-64 | 74.7% | 30.8% (vs 21) |
| h83 | candidate | 1615 ± 298 | 87 of 220 | 8 | 4-4 | 77.3% | 33.8% (vs 19) |
| h84 | candidate | 1615 ± 298 | 88 of 220 | 8 | 4-4 | 77.3% | 33.8% (vs 19) |
| h88 | candidate | 1539 ± 143 | 114 of 220 | 40 | 18-22 | 72.4% | 28.7% (vs 23) |
| h89 | candidate | 745 ± 1086 | 196 of 220 | 8 | 0-8 | 27.4% | 7.7% (vs 66) |
| h8v5 | candidate | 1575 ± 125 | 101 of 220 | 48 | 31-17 | 74.8% | 30.0% (vs 20) |
| h90 | candidate | 745 ± 1086 | 197 of 220 | 8 | 0-8 | 27.4% | 7.7% (vs 66) |
| h91 | candidate | 1530 ± 194 | 120 of 220 | 16 | 7-9 | 71.8% | 29.5% (vs 25) |
| h96 | candidate | 1597 ± 100 | 93 of 220 | 58 | 24-34 | 76.2% | 32.5% (vs 20) |
| rush | sparring | 1265 ± 194 | 171 of 220 | 25 | 6-19 | 54.3% | 18.8% (vs 42) |
| rush4 | sparring | 1509 ± 132 | 128 of 220 | 50 | 30-20 | 70.5% | 27.3% (vs 25) |
| turtle | candidate | 1380 ± 192 | 159 of 220 | 20 | 4-16 | 61.8% | 21.9% (vs 34) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 125 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 350 malformed)
- replica: 6976 games (11 archive games skipped, 897 matches from archives, 1418 matches from scores), fetched 2026-10-28T01:20:38+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34), v10 = h175 (72 games, 37-35), v11 = h178 (72 games, 36-36), v12 = h185 (72 games, 49-23). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the win rate and W-L against the bot of the latest accepted build with games of its own that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | m-schier.battlecode-2019-wololo | field | 1995 | 50 | 495 | 379-116 | 22% (v12 4-14) |
| 2 | mvpatel2000.Battlecode2019 | field | 1988 | 77 | 141 | 103-38 | 22% (v12 4-14) |
| 3 | **cand:h195** | candidate | 1925 | 82 | 108 | 74-34 |  |
| 4 | **cand:h185** | candidate | 1920 | 98 | 72 | 49-23 |  |
| 5 | **cand:h198** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 6 | **cand:h201** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 7 | **cand:h202** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 8 | **cand:h209** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 9 | **cand:h211** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 10 | **cand:h213** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 11 | **cand:h218** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 12 | uvafan.bc2019 | field | 1895 | 47 | 501 | 327-174 | 24% (v12 5-16) |
| 13 | **cand:h203** | candidate | 1883 | 130 | 36 | 23-13 |  |
| 14 | **cand:h207** | candidate | 1875 | 76 | 120 | 72-48 |  |
| 15 | **cand:h206** | candidate | 1861 | 91 | 78 | 46-32 |  |
| 16 | **cand:h214** | candidate | 1850 | 90 | 78 | 45-33 |  |
| 17 | **us:v12** | accepted | 1834 | 65 | 168 | 94-74 |  |
| 18 | **cand:h184** | candidate | 1830 | 78 | 108 | 62-46 |  |
| 19 | yujinwunz.battlecode_2019 | field | 1823 | 84 | 114 | 77-37 | 56% (v12 5-4) |
| 20 | rafekruse.Battlecode-2019-bc19 | field | 1813 | 86 | 99 | 65-34 | 0% (v8 0-3) |
| 21 | **cand:h167** | candidate | 1792 | 92 | 72 | 38-34 |  |
| 22 | **cand:h175** | candidate | 1781 | 92 | 72 | 37-35 |  |
| 23 | VoidMercy.battlecode-2019~e7dc06 | field | 1777 | 91 | 90 | 60-30 | 33% (v11 1-2) |
| 24 | **cand:h178** | candidate | 1770 | 92 | 72 | 36-36 |  |
| 25 | StoneT2000.BC19-botfinalsafe | field | 1768 | 44 | 513 | 277-236 | 62% (v12 13-8) |
| 26 | **cand:h147** | candidate | 1767 | 105 | 58 | 34-24 |  |
| 27 | **us:v9** | accepted | 1757 | 111 | 48 | 21-27 |  |
| 28 | **cand:h163** | candidate | 1748 | 77 | 108 | 51-57 |  |
| 29 | **cand:h148** | candidate | 1748 | 77 | 112 | 58-54 |  |
| 30 | **us:v10** | accepted | 1747 | 125 | 36 | 17-19 |  |
| 31 | **us:v11** | accepted | 1745 | 93 | 69 | 30-39 |  |
| 32 | **cand:h150** | candidate | 1741 | 104 | 58 | 32-26 |  |
| 33 | **cand:h159** | candidate | 1737 | 92 | 72 | 33-39 |  |
| 34 | arya-k.bc19 | field | 1734 | 84 | 102 | 65-37 | 83% (v12 5-1) |
| 35 | **cand:h145** | candidate | 1728 | 104 | 58 | 31-27 |  |
| 36 | moreda-a.BC2019-a31 | field | 1728 | 83 | 105 | 64-41 | 100% (v12 3-0) |
| 37 | StoneT2000.BC19-bot1v43 | field | 1725 | 44 | 510 | 249-261 | 81% (v12 17-4) |
| 38 | **cand:h190** | candidate | 1725 | 126 | 36 | 16-20 |  |
| 39 | **cand:h193** | candidate | 1725 | 126 | 36 | 16-20 |  |
| 40 | **cand:h128** | candidate | 1711 | 105 | 54 | 23-31 |  |
| 41 | **cand:h170** | candidate | 1703 | 126 | 36 | 15-21 |  |
| 42 | virenvshah.Battlecode2019 | field | 1697 | 83 | 111 | 67-44 | 67% (v12 2-1) |
| 43 | **cand:h146** | candidate | 1690 | 104 | 58 | 28-30 |  |
| 44 | **cand:h149** | candidate | 1690 | 104 | 58 | 28-30 |  |
| 45 | j-mao.battlecode-2019 | field | 1689 | 84 | 96 | 54-42 | 100% (v8 3-0) |
| 46 | **cand:h143** | candidate | 1689 | 117 | 40 | 24-16 |  |
| 47 | IanCoolidge0.battlecode20~f649f3 | field | 1689 | 80 | 123 | 71-52 | 50% (v12 3-3) |
| 48 | **cand:block** | candidate | 1688 | 160 | 20 | 12-8 |  |
| 49 | **cand:camp** | candidate | 1688 | 160 | 20 | 12-8 |  |
| 50 | **cand:h141** | candidate | 1687 | 99 | 58 | 31-27 |  |
| 51 | **cand:h157** | candidate | 1680 | 127 | 36 | 14-22 |  |
| 52 | **cand:h161** | candidate | 1680 | 127 | 36 | 14-22 |  |
| 53 | **cand:h192** | candidate | 1680 | 127 | 36 | 14-22 |  |
| 54 | **us:v8** | accepted | 1677 | 62 | 356 | 160-196 |  |
| 55 | **cand:h68** | candidate | 1676 | 279 | 8 | 6-2 |  |
| 56 | **cand:h72** | candidate | 1676 | 279 | 8 | 6-2 |  |
| 57 | **cand:h78** | candidate | 1676 | 279 | 8 | 6-2 |  |
| 58 | **cand:h139** | candidate | 1675 | 88 | 76 | 37-39 |  |
| 59 | **cand:h140** | candidate | 1674 | 99 | 58 | 30-28 |  |
| 60 | **cand:h132** | candidate | 1671 | 116 | 40 | 23-17 |  |
| 61 | **cand:h130** | candidate | 1661 | 99 | 58 | 29-29 |  |
| 62 | **cand:h162** | candidate | 1657 | 129 | 36 | 13-23 |  |
| 63 | **cand:h44** | candidate | 1657 | 280 | 8 | 6-2 |  |
| 64 | **cand:h126** | candidate | 1653 | 85 | 98 | 49-49 |  |
| 65 | **cand:h133** | candidate | 1653 | 116 | 40 | 22-18 |  |
| 66 | **cand:h142** | candidate | 1653 | 116 | 40 | 22-18 |  |
| 67 | vineetparikh.BigRedBattle~fe3459 | field | 1651 | 84 | 105 | 64-41 | 100% (v12 3-0) |
| 68 | IanCoolidge0.battlecode20~69ce88 | field | 1649 | 45 | 507 | 191-316 | 67% (v12 14-7) |
| 69 | **cand:h104** | candidate | 1648 | 99 | 58 | 28-30 |  |
| 70 | **cand:h111** | candidate | 1648 | 99 | 58 | 28-30 |  |
| 71 | **cand:h112** | candidate | 1648 | 99 | 58 | 28-30 |  |
| 72 | **cand:h127** | candidate | 1643 | 85 | 98 | 47-51 |  |
| 73 | **cand:h151** | candidate | 1642 | 124 | 40 | 18-22 |  |
| 74 | rafekruse.Battlecode-2019~2680d4 | field | 1641 | 90 | 90 | 57-33 |  |
| 75 | **cand:h115** | candidate | 1636 | 115 | 40 | 21-19 |  |
| 76 | **cand:h131** | candidate | 1636 | 115 | 40 | 21-19 |  |
| 77 | **cand:h138** | candidate | 1636 | 115 | 40 | 21-19 |  |
| 78 | **cand:h103** | candidate | 1635 | 88 | 76 | 33-43 |  |
| 79 | ldcWV.Battlecode-2019 | field | 1631 | 90 | 90 | 57-33 |  |
| 80 | unrevre.battlecode | field | 1631 | 102 | 72 | 47-25 |  |
| 81 | **cand:h136** | candidate | 1625 | 89 | 76 | 32-44 |  |
| 82 | **cand:h135** | candidate | 1623 | 99 | 58 | 26-32 |  |
| 83 | bqi343.cp-notebook | field | 1620 | 87 | 96 | 57-39 |  |
| 84 | **us:v7** | accepted | 1619 | 43 | 1804 | 927-877 |  |
| 85 | **cand:h118** | candidate | 1619 | 115 | 40 | 20-20 |  |
| 86 | **cand:h76** | candidate | 1617 | 184 | 32 | 18-14 |  |
| 87 | **cand:h83** | candidate | 1615 | 298 | 8 | 4-4 |  |
| 88 | **cand:h84** | candidate | 1615 | 298 | 8 | 4-4 |  |
| 89 | awesomelemonade.Battlecode2019 | field | 1609 | 46 | 486 | 167-319 | 89% (v12 16-2) |
| 90 | **cand:h100** | candidate | 1609 | 65 | 200 | 97-103 |  |
| 91 | **us:v0** | accepted | 1603 | 223 | 38 | 33-5 |  |
| 92 | **cand:h121** | candidate | 1597 | 100 | 58 | 24-34 |  |
| 93 | **cand:h96** | candidate | 1597 | 100 | 58 | 24-34 |  |
| 94 | **us:v3** | accepted | 1596 | 95 | 191 | 140-51 |  |
| 95 | **cand:h123** | candidate | 1584 | 100 | 58 | 23-35 |  |
| 96 | **cand:h101** | candidate | 1584 | 116 | 40 | 18-22 |  |
| 97 | **cand:h124** | candidate | 1584 | 116 | 40 | 18-22 |  |
| 98 | **cand:h125** | candidate | 1584 | 116 | 40 | 18-22 |  |
| 99 | **cand:h137** | candidate | 1584 | 116 | 40 | 18-22 |  |
| 100 | **cand:h61** | candidate | 1577 | 252 | 8 | 5-3 |  |
| 101 | **cand:h8v5** | candidate | 1575 | 125 | 48 | 31-17 |  |
| 102 | cemondr.BC19pdxgroup4 | field | 1574 | 90 | 87 | 50-37 |  |
| 103 | **cand:h82** | candidate | 1574 | 94 | 134 | 70-64 |  |
| 104 | **cand:h110** | candidate | 1566 | 116 | 40 | 17-23 |  |
| 105 | **cand:h113** | candidate | 1566 | 116 | 40 | 17-23 |  |
| 106 | UpperArlingtonHighSchool.~682aa9 | field | 1561 | 96 | 87 | 51-36 |  |
| 107 | **cand:h53** | candidate | 1558 | 254 | 8 | 5-3 |  |
| 108 | **cand:h114** | candidate | 1548 | 117 | 40 | 16-24 |  |
| 109 | **cand:h116** | candidate | 1548 | 117 | 40 | 16-24 |  |
| 110 | **cand:h2** | candidate | 1545 | 148 | 54 | 25-29 |  |
| 111 | IvanGeffner.BC19-bot6b | field | 1544 | 379 | 9 | 7-2 |  |
| 112 | **cand:h54** | candidate | 1544 | 123 | 48 | 29-19 |  |
| 113 | **cand:h63** | candidate | 1543 | 127 | 40 | 23-17 |  |
| 114 | **cand:h88** | candidate | 1539 | 143 | 40 | 18-22 |  |
| 115 | **cand:h11c** | candidate | 1533 | 178 | 25 | 15-10 |  |
| 116 | IvanGeffner.BC19-eigthbot | field | 1531 | 310 | 9 | 6-3 |  |
| 117 | Nischay-Pro.BattleCode2019 | field | 1531 | 93 | 90 | 52-38 |  |
| 118 | **cand:h107** | candidate | 1530 | 119 | 40 | 15-25 |  |
| 119 | **cand:h144** | candidate | 1530 | 119 | 40 | 15-25 |  |
| 120 | **cand:h91** | candidate | 1530 | 194 | 16 | 7-9 |  |
| 121 | **cand:h3** | candidate | 1527 | 213 | 19 | 9-10 |  |
| 122 | **cand:h40** | candidate | 1526 | 290 | 8 | 6-2 |  |
| 123 | **cand:h64** | candidate | 1525 | 126 | 40 | 22-18 |  |
| 124 | **cand:h24v5** | candidate | 1523 | 130 | 40 | 23-17 |  |
| 125 | **cand:h55** | candidate | 1515 | 121 | 56 | 32-24 |  |
| 126 | **cand:h7** | candidate | 1514 | 1466 | 8 | 8-0 |  |
| 127 | **cand:h134** | candidate | 1512 | 120 | 40 | 14-26 |  |
| 128 | **spar:rush4** | sparring | 1509 | 132 | 50 | 30-20 |  |
| 129 | lschaberg.bc19 | field | 1501 | 97 | 81 | 49-32 |  |
| 130 | **cand:h77** | candidate | 1500 | 186 | 16 | 8-8 |  |
| 131 | NielsKornerup.Battlecode-2019 | field | 1491 | 77 | 132 | 70-62 |  |
| 132 | **us:v6** | accepted | 1490 | 66 | 322 | 130-192 |  |
| 133 | ovkulkarni.battlecode2019~0aa607 | field | 1483 | 88 | 93 | 53-40 |  |
| 134 | dmunozc.bc19-g8-bots | field | 1479 | 88 | 96 | 54-42 |  |
| 135 | **cand:h43** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 136 | **cand:h47** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 137 | **cand:h48** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 138 | **cand:h49** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 139 | **cand:h59** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 140 | **cand:h60** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 141 | **us:v5** | accepted | 1471 | 72 | 439 | 202-237 |  |
| 142 | **cand:h6** | candidate | 1463 | 114 | 158 | 94-64 |  |
| 143 | **cand:h38** | candidate | 1458 | 306 | 6 | 4-2 |  |
| 144 | dmunozc.bc19-g8-davjasdiv | field | 1456 | 88 | 102 | 56-46 |  |
| 145 | **us:v1** | accepted | 1452 | 135 | 154 | 128-26 |  |
| 146 | **cand:h129** | candidate | 1451 | 127 | 40 | 11-29 |  |
| 147 | **cand:h24** | candidate | 1444 | 153 | 40 | 26-14 |  |
| 148 | programjames.BC19Bot-seeding | field | 1439 | 92 | 87 | 50-37 |  |
| 149 | m4reko.bc2019-tmores-angels | field | 1434 | 94 | 84 | 48-36 |  |
| 150 | **us:v2** | accepted | 1430 | 137 | 62 | 30-32 |  |
| 151 | **cand:h58** | candidate | 1428 | 271 | 8 | 3-5 |  |
| 152 | **cand:h31** | candidate | 1425 | 152 | 40 | 25-15 |  |
| 153 | ovkulkarni.battlecode2019~06c610 | field | 1418 | 102 | 75 | 44-31 |  |
| 154 | howard36.Battlecode2019-eco6 | field | 1410 | 92 | 93 | 49-44 |  |
| 155 | **cand:h41** | candidate | 1385 | 254 | 8 | 3-5 |  |
| 156 | **cand:h42** | candidate | 1385 | 254 | 8 | 3-5 |  |
| 157 | **cand:h46** | candidate | 1385 | 254 | 8 | 3-5 |  |
| 158 | **cand:h52** | candidate | 1385 | 254 | 8 | 3-5 |  |
| 159 | **cand:turtle** | candidate | 1380 | 192 | 20 | 4-16 |  |
| 160 | abcdefguan.battlecode2019 | field | 1379 | 97 | 90 | 49-41 |  |
| 161 | Tom-CCS.BC19 | field | 1344 | 92 | 93 | 47-46 |  |
| 162 | **us:v4** | accepted | 1336 | 105 | 220 | 83-137 |  |
| 163 | CS554-software-engineerin~a575dc | field | 1335 | 67 | 317 | 185-132 | 100% (v7 3-0) |
| 164 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1321 | 87 | 123 | 59-64 |  |
| 165 | ipercyNC.group6-battlecode | field | 1313 | 93 | 93 | 48-45 |  |
| 166 | sunanth123.battlecode19-prorush | field | 1300 | 94 | 90 | 49-41 |  |
| 167 | moreda-a.BC2019-t15 | field | 1279 | 104 | 78 | 39-39 |  |
| 168 | nthistle.battlecode-2019 | field | 1276 | 93 | 99 | 51-48 | 100% (v5 3-0) |
| 169 | **cand:h16r** | candidate | 1267 | 151 | 40 | 16-24 |  |
| 170 | **cand:h18** | candidate | 1265 | 194 | 25 | 6-19 |  |
| 171 | **spar:rush** | sparring | 1265 | 194 | 25 | 6-19 |  |
| 172 | twitu.bc19-tsp | field | 1259 | 103 | 87 | 47-40 |  |
| 173 | programjames.BC19Bot-root | field | 1257 | 97 | 84 | 43-41 |  |
| 174 | cvxluo.battlecode19 | field | 1243 | 93 | 99 | 52-47 |  |
| 175 | CometsTech.battlecode2019 | field | 1233 | 73 | 279 | 131-148 | 100% (v7 3-0) |
| 176 | vicennial.BattleCode19 | field | 1232 | 88 | 117 | 57-60 |  |
| 177 | evanyeyeye.battlecode2019~af562c | field | 1222 | 100 | 81 | 43-38 |  |
| 178 | Nydroam.BatteredCod | field | 1214 | 441 | 6 | 3-3 |  |
| 179 | sunanth123.battlecode19-mainbot | field | 1211 | 97 | 93 | 48-45 |  |
| 180 | JasonLarson44.2019-Battle~1c7639 | field | 1155 | 89 | 111 | 54-57 | 100% (v3 3-0) |
| 181 | bayoumi17m.BattleCode-2019 | field | 1145 | 102 | 84 | 41-43 |  |
| 182 | spachava753.bc19 | field | 1138 | 103 | 84 | 42-42 |  |
| 183 | jamesrayman.HCN-bot | field | 1130 | 97 | 102 | 50-52 | 100% (v5 3-0) |
| 184 | UpperArlingtonHighSchool.~5e7875 | field | 1034 | 116 | 81 | 40-41 |  |
| 185 | jackliu612.Battlecode19 | field | 956 | 119 | 84 | 42-42 |  |
| 186 | TestSubjector.BattleCode2~e6de74 | field | 938 | 106 | 111 | 53-58 |  |
| 187 | TestSubjector.BattleCode2~fb22c7 | field | 935 | 114 | 105 | 48-57 |  |
| 188 | haydenshively.Battle-Code~e37b3e | field | 933 | 107 | 90 | 40-50 |  |
| 189 | haydenshively.Battle-Code~e1c2fb | field | 927 | 102 | 90 | 39-51 |  |
| 190 | rooneyshuman.Battlecode | field | 911 | 114 | 87 | 38-49 |  |
| 191 | dndoja.battlecode19 | field | 885 | 110 | 81 | 35-46 |  |
| 192 | CometsTech.battlecode2019~187e8c | field | 862 | 110 | 87 | 39-48 |  |
| 193 | roy-love.onshoreBattleCode2019 | field | 827 | 108 | 90 | 41-49 |  |
| 194 | SethKitchen.examplefuncsplayer | field | 762 | 120 | 99 | 40-59 |  |
| 195 | liwanlin41.examplefuncsplayer | field | 751 | 110 | 129 | 55-74 |  |
| 196 | **cand:h89** | candidate | 745 | 1086 | 8 | 0-8 |  |
| 197 | **cand:h90** | candidate | 745 | 1086 | 8 | 0-8 |  |
| 198 | 18dcb01.Battlecode19-robot2 | field | 742 | 118 | 96 | 40-56 |  |
| 199 | dgh2.bc19-t1 | field | 721 | 128 | 87 | 37-50 |  |
| 200 | VictorButoi.BattleCode201~c4576b | field | 700 | 122 | 78 | 34-44 |  |
| 201 | jyurkanin.corn_bc19 | field | 658 | 127 | 87 | 33-54 |  |
| 202 | asunathanr.asu_bc | field | 655 | 110 | 105 | 44-61 |  |
| 203 | OmarTahoun.battle-code | field | 647 | 115 | 102 | 45-57 |  |
| 204 | nhard.examplefuncsplayer | field | 569 | 127 | 87 | 35-52 |  |
| 205 | howard36.Battlecode2019-sprint | field | 553 | 126 | 84 | 30-54 |  |
| 206 | waylon531.scala_starter | field | 474 | 136 | 93 | 35-58 |  |
| 207 | vishwasns99.BC_2019 | field | 444 | 140 | 78 | 28-50 |  |
| 208 | bovard.battlecode-2019-un~8822c3 | field | 419 | 139 | 90 | 35-55 |  |
| 209 | DivyanshuSaxena.Battlecode | field | 270 | 149 | 99 | 38-61 |  |
| 210 | bc19-starter | field | 189 | 145 | 394 | 86-308 | 100% (v3 12-0) |
| 211 | RyanSharafuddin.Battlecode_2019 | field | 182 | 148 | 114 | 40-74 |  |
| 212 | jbiewend.Battlecode2019 | field | 154 | 157 | 87 | 32-55 |  |
| 213 | VoidMercy.battlecode-2019-bot | field | 113 | 159 | 84 | 29-55 |  |
| 214 | ryanhzhao.Battlecode-2019 | field | -9 | 169 | 90 | 27-63 |  |
| 215 | yunaganyh.bc19 | field | -182 | 181 | 81 | 23-58 |  |
| 216 | djkeyes.bc19 | field | -182 | 175 | 84 | 24-60 |  |
| 217 | TheRobotCarlson.battlehac~323871 | field | -314 | 175 | 108 | 27-81 |  |
| 218 | jshin313.battlecodebot | field | -315 | 175 | 93 | 22-71 |  |
| 219 | jamesrayman.HCN-basic-bot | field | -377 | 187 | 78 | 14-64 |  |
| 220 | ArtemUstilov.bc19_CrazyTapok | field | -860 | 1083 | 81 | 0-81 |  |

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
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v9 | 9 | 7-2 | 78% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | us:v10 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v11 | 9 | 8-1 | 89% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h190 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h193 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h170 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | virenvshah.Battlecode2019 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h157 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h161 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h192 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v8 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h130 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h162 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h126 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h104 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h111 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h112 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h127 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h103 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h136 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h135 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v7 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h121 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
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
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 9 | 6-3 | 67% | replica |
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
| uvafan.bc2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v9 | 9 | 6-3 | 67% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | us:v10 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v11 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h190 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h193 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h170 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | virenvshah.Battlecode2019 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h149 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h157 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h161 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h192 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v8 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h162 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
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
| us:v12 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v12 | IanCoolidge0.battlecode20~f649f3 | 6 | 3-3 | 50% | replica |
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
| yujinwunz.battlecode_2019 | virenvshah.Battlecode2019 | 9 | 6-3 | 67% | replica |
| yujinwunz.battlecode_2019 | j-mao.battlecode-2019 | 6 | 4-2 | 67% | replica |
| yujinwunz.battlecode_2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 3-3 | 50% | replica |
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
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 9 | 4-5 | 44% | replica |
| rafekruse.Battlecode-2019-bc19 | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
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
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~69ce88 | 9 | 5-4 | 56% | replica |
| VoidMercy.battlecode-2019~e7dc06 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| StoneT2000.BC19-botfinalsafe | cand:h147 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v9 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | us:v10 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v11 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h190 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | virenvshah.Battlecode2019 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
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
| StoneT2000.BC19-botfinalsafe | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | UpperArlingtonHighSchool.~682aa9 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | Nischay-Pro.BattleCode2019 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 9 | 7-2 | 78% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
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
| arya-k.bc19 | virenvshah.Battlecode2019 | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~f649f3 | 6 | 4-2 | 67% | replica |
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
| cand:h145 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h145 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-a31 | us:v8 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 12 | 8-4 | 67% | replica |
| moreda-a.BC2019-a31 | IanCoolidge0.battlecode20~69ce88 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | cand:h190 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h193 | 6 | 4-2 | 67% | replica |
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
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | vineetparikh.BigRedBattle~fe3459 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 9 | 2-7 | 22% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | bqi343.cp-notebook | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h121 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | UpperArlingtonHighSchool.~682aa9 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 9 | 9-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h190 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h190 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h193 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h193 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| cand:h170 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h170 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| virenvshah.Battlecode2019 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | rafekruse.Battlecode-2019~2680d4 | 6 | 2-4 | 33% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| virenvshah.Battlecode2019 | Nischay-Pro.BattleCode2019 | 6 | 4-2 | 67% | replica |
| virenvshah.Battlecode2019 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
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
| j-mao.battlecode-2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h143 | us:v7 | 40 | 24-16 | 60% | local |
| IanCoolidge0.battlecode20~f649f3 | us:v8 | 3 | 0-3 | 0% | replica |
| IanCoolidge0.battlecode20~f649f3 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | rafekruse.Battlecode-2019~2680d4 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| cand:h162 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h162 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h126 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| vineetparikh.BigRedBattle~fe3459 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| vineetparikh.BigRedBattle~fe3459 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 6 | 3-3 | 50% | replica |
| vineetparikh.BigRedBattle~fe3459 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | ovkulkarni.battlecode2019~0aa607 | 6 | 4-2 | 67% | replica |
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
| IanCoolidge0.battlecode20~69ce88 | cand:h104 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h111 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h112 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h127 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | rafekruse.Battlecode-2019~2680d4 | 6 | 1-5 | 17% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h121 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h123 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
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
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h103 | awesomelemonade.Battlecode2019 | 6 | 1-5 | 17% | replica |
| ldcWV.Battlecode-2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| ldcWV.Battlecode-2019 | bqi343.cp-notebook | 9 | 8-1 | 89% | replica |
| ldcWV.Battlecode-2019 | cemondr.BC19pdxgroup4 | 6 | 4-2 | 67% | replica |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 3-3 | 50% | replica |
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
| unrevre.battlecode | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
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
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h136 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h135 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| bqi343.cp-notebook | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
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
| us:v7 | cand:h118 | 40 | 20-20 | 50% | local |
| us:v7 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | cand:h121 | 40 | 21-19 | 52% | local |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
| us:v7 | cand:h123 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h101 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h124 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h125 | 40 | 22-18 | 55% | local |
| us:v7 | cand:h137 | 40 | 22-18 | 55% | local |
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
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
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
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cemondr.BC19pdxgroup4 | Nischay-Pro.BattleCode2019 | 6 | 4-2 | 67% | replica |
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
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | lschaberg.bc19 | 3 | 0-3 | 0% | replica |
| Nischay-Pro.BattleCode2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| lschaberg.bc19 | NielsKornerup.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | programjames.BC19Bot-seeding | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
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
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~0aa607 | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-bots | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 9 | 6-3 | 67% | replica |
| NielsKornerup.Battlecode-2019 | programjames.BC19Bot-seeding | 6 | 5-1 | 83% | replica |
| NielsKornerup.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
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
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-davjasdiv | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-seeding | 6 | 6-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 6 | 5-1 | 83% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~0aa607 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | dmunozc.bc19-g8-davjasdiv | 9 | 4-5 | 44% | replica |
| dmunozc.bc19-g8-bots | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | evanyeyeye.battlecode2019~af562c | 6 | 5-1 | 83% | replica |
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
| us:v5 | us:v4 | 40 | 35-5 | 88% | local |
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-davjasdiv | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | moreda-a.BC2019-t15 | 6 | 4-2 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | nthistle.battlecode-2019 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-davjasdiv | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| programjames.BC19Bot-seeding | m4reko.bc2019-tmores-angels | 9 | 6-3 | 67% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 9 | 8-1 | 89% | replica |
| programjames.BC19Bot-seeding | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | howard36.Battlecode2019-eco6 | 6 | 4-2 | 67% | replica |
| m4reko.bc2019-tmores-angels | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
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
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
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
| howard36.Battlecode2019-eco6 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | ipercyNC.group6-battlecode | 9 | 6-3 | 67% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 6 | 2-4 | 33% | replica |
| abcdefguan.battlecode2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| abcdefguan.battlecode2019 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
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
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 6 | 1-5 | 17% | replica |
| Tom-CCS.BC19 | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| CS554-software-engineerin~a575dc | 18dcb01.Battlecode19-prea~fb5c48 | 9 | 5-4 | 56% | replica |
| CS554-software-engineerin~a575dc | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | nthistle.battlecode-2019 | 6 | 5-1 | 83% | replica |
| CS554-software-engineerin~a575dc | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 6 | 2-4 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | programjames.BC19Bot-root | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | vicennial.BattleCode19 | 6 | 1-5 | 17% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
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
| sunanth123.battlecode19-prorush | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 9 | 7-2 | 78% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 6 | 2-4 | 33% | replica |
| sunanth123.battlecode19-prorush | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-prorush | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
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
| twitu.bc19-tsp | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | cvxluo.battlecode19 | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-root | vicennial.BattleCode19 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-root | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-root | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | liwanlin41.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | JasonLarson44.2019-Battle~1c7639 | 12 | 8-4 | 67% | replica |
| cvxluo.battlecode19 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| CometsTech.battlecode2019 | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 6 | 3-3 | 50% | replica |
| CometsTech.battlecode2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | SethKitchen.examplefuncsplayer | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
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
| evanyeyeye.battlecode2019~af562c | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 6 | 5-1 | 83% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | spachava753.bc19 | 3 | 2-1 | 67% | replica |
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
| JasonLarson44.2019-Battle~1c7639 | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jamesrayman.HCN-bot | 6 | 3-3 | 50% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 9 | 7-2 | 78% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jamesrayman.HCN-bot | 6 | 4-2 | 67% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~fb22c7 | 6 | 6-0 | 100% | replica |
| jamesrayman.HCN-bot | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e1c2fb | 6 | 3-3 | 50% | replica |
| UpperArlingtonHighSchool.~5e7875 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 6 | 5-1 | 83% | replica |
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
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e37b3e | 6 | 3-3 | 50% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e1c2fb | 9 | 5-4 | 56% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 9 | 6-3 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | roy-love.onshoreBattleCode2019 | 3 | 1-2 | 33% | replica |
| TestSubjector.BattleCode2~e6de74 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | haydenshively.Battle-Code~e1c2fb | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
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
| haydenshively.Battle-Code~e37b3e | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | rooneyshuman.Battlecode | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 12 | 8-4 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | CometsTech.battlecode2019~187e8c | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e1c2fb | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | dndoja.battlecode19 | 9 | 3-6 | 33% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| CometsTech.battlecode2019~187e8c | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
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
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 9 | 6-3 | 67% | replica |
| SethKitchen.examplefuncsplayer | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | 18dcb01.Battlecode19-robot2 | 6 | 4-2 | 67% | replica |
| liwanlin41.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 9 | 6-3 | 67% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | asunathanr.asu_bc | 9 | 6-3 | 67% | replica |
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | howard36.Battlecode2019-sprint | 6 | 2-4 | 33% | replica |
| liwanlin41.examplefuncsplayer | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | VictorButoi.BattleCode201~c4576b | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-robot2 | jyurkanin.corn_bc19 | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 9 | 7-2 | 78% | replica |
| 18dcb01.Battlecode19-robot2 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | howard36.Battlecode2019-sprint | 9 | 7-2 | 78% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 6 | 3-3 | 50% | replica |
| dgh2.bc19-t1 | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 9 | 6-3 | 67% | replica |
| dgh2.bc19-t1 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | asunathanr.asu_bc | 6 | 2-4 | 33% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | OmarTahoun.battle-code | 6 | 2-4 | 33% | replica |
| jyurkanin.corn_bc19 | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
| asunathanr.asu_bc | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| asunathanr.asu_bc | howard36.Battlecode2019-sprint | 6 | 2-4 | 33% | replica |
| asunathanr.asu_bc | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 6 | 5-1 | 83% | replica |
| asunathanr.asu_bc | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| OmarTahoun.battle-code | howard36.Battlecode2019-sprint | 3 | 0-3 | 0% | replica |
| OmarTahoun.battle-code | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| OmarTahoun.battle-code | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | bc19-starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | howard36.Battlecode2019-sprint | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | bovard.battlecode-2019-un~8822c3 | 6 | 5-1 | 83% | replica |
| nhard.examplefuncsplayer | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-sprint | vishwasns99.BC_2019 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 9 | 9-0 | 100% | replica |
| howard36.Battlecode2019-sprint | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| waylon531.scala_starter | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| waylon531.scala_starter | bc19-starter | 6 | 4-2 | 67% | replica |
| waylon531.scala_starter | RyanSharafuddin.Battlecode_2019 | 9 | 9-0 | 100% | replica |
| waylon531.scala_starter | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | bovard.battlecode-2019-un~8822c3 | 9 | 3-6 | 33% | replica |
| vishwasns99.BC_2019 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
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
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
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
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 9 | 9-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | ryanhzhao.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 9 | 8-1 | 89% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 6 | 6-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 9 | 4-5 | 44% | replica |
| ryanhzhao.Battlecode-2019 | TheRobotCarlson.battlehac~323871 | 3 | 2-1 | 67% | replica |
| ryanhzhao.Battlecode-2019 | jshin313.battlecodebot | 9 | 8-1 | 89% | replica |
| ryanhzhao.Battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 2-1 | 67% | replica |
| yunaganyh.bc19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 12 | 8-4 | 67% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 12 | 9-3 | 75% | replica |
| djkeyes.bc19 | TheRobotCarlson.battlehac~323871 | 9 | 5-4 | 56% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 12 | 9-3 | 75% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 6 | 5-1 | 83% | replica |
| TheRobotCarlson.battlehac~323871 | jshin313.battlecodebot | 21 | 11-10 | 52% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 18 | 9-9 | 50% | replica |
| jshin313.battlecodebot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
