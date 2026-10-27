# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-27 13:45 PDT.

10018 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 2641 of ours on the galaxy replica and 4134 between field bots there (4131 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 219 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, m-schier.battlecode-2019-wololo, uvafan.bc2019, yujinwunz.battlecode_2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, StoneT2000.BC19-botfinalsafe, arya-k.bc19, StoneT2000.BC19-bot1v43, moreda-a.BC2019-a31, j-mao.battlecode-2019, virenvshah.Battlecode2019, IanCoolidge0.battlecode20~f649f3, vineetparikh.BigRedBattle~fe3459, rafekruse.Battlecode-2019~2680d4, IanCoolidge0.battlecode20~69ce88, bqi343.cp-notebook, unrevre.battlecode, ldcWV.Battlecode-2019, awesomelemonade.Battlecode2019, cemondr.BC19pdxgroup4, UpperArlingtonHighSchool.~682aa9, Nischay-Pro.BattleCode2019, IvanGeffner.BC19-bot6b, IvanGeffner.BC19-eigthbot, NielsKornerup.Battlecode-2019, ovkulkarni.battlecode2019~0aa607, dmunozc.bc19-g8-bots, lschaberg.bc19, dmunozc.bc19-g8-davjasdiv, programjames.BC19Bot-seeding, m4reko.bc2019-tmores-angels, howard36.Battlecode2019-eco6, ovkulkarni.battlecode2019~06c610, Tom-CCS.BC19, abcdefguan.battlecode2019, CS554-software-engineerin~a575dc, ipercyNC.group6-battlecode, 18dcb01.Battlecode19-prea~fb5c48, moreda-a.BC2019-t15, sunanth123.battlecode19-prorush, nthistle.battlecode-2019, twitu.bc19-tsp, programjames.BC19Bot-root, vicennial.BattleCode19, cvxluo.battlecode19, CometsTech.battlecode2019, Nydroam.BatteredCod, sunanth123.battlecode19-mainbot, evanyeyeye.battlecode2019~af562c, JasonLarson44.2019-Battle~1c7639, bayoumi17m.BattleCode-2019, spachava753.bc19, jamesrayman.HCN-bot, UpperArlingtonHighSchool.~5e7875, jackliu612.Battlecode19, haydenshively.Battle-Code~e1c2fb, TestSubjector.BattleCode2~fb22c7, haydenshively.Battle-Code~e37b3e, TestSubjector.BattleCode2~e6de74, rooneyshuman.Battlecode, dndoja.battlecode19, CometsTech.battlecode2019~187e8c, roy-love.onshoreBattleCode2019, SethKitchen.examplefuncsplayer, liwanlin41.examplefuncsplayer, 18dcb01.Battlecode19-robot2, VictorButoi.BattleCode201~c4576b, dgh2.bc19-t1, jyurkanin.corn_bc19, OmarTahoun.battle-code, asunathanr.asu_bc, nhard.examplefuncsplayer, howard36.Battlecode2019-sprint, waylon531.scala_starter, vishwasns99.BC_2019, bovard.battlecode-2019-un~8822c3, DivyanshuSaxena.Battlecode, bc19-starter, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, VoidMercy.battlecode-2019-bot, ryanhzhao.Battlecode-2019, yunaganyh.bc19, djkeyes.bc19, jshin313.battlecodebot, TheRobotCarlson.battlehac~323871, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1602 ± 223 | 90 of 219 | 38 | 33-5 | 76.2% | 32.5% (vs 20) |
| v1 | accepted | 1451 ± 135 | 145 of 219 | 154 | 128-26 | 66.3% | 25.1% (vs 30) |
| v2 | accepted | 1430 ± 137 | 149 of 219 | 62 | 30-32 | 64.9% | 24.7% (vs 32) |
| v3 | accepted | 1596 ± 96 | 93 of 219 | 191 | 140-51 | 75.8% | 31.7% (vs 20) |
| v4 | accepted | 1337 ± 105 | 161 of 219 | 220 | 83-137 | 58.7% | 19.3% (vs 36) |
| v5 | accepted | 1472 ± 72 | 139 of 219 | 439 | 202-237 | 67.7% | 25.5% (vs 28) |
| v6 | accepted | 1491 ± 66 | 131 of 219 | 322 | 130-192 | 69.0% | 26.6% (vs 27) |
| v7 | accepted | 1620 ± 44 | 82 of 219 | 1804 | 927-877 | 77.3% | 32.8% (vs 18) |
| v8 | accepted | 1679 ± 62 | 53 of 219 | 356 | 160-196 | 80.8% | 34.5% (vs 13) |
| v9 | accepted | 1757 ± 111 | 26 of 219 | 48 | 21-27 | 85.0% | 35.8% (vs 7) |
| v10 | accepted | 1748 ± 125 | 29 of 219 | 36 | 17-19 | 84.5% | 34.6% (vs 7) |
| v11 | accepted | 1747 ± 93 | 31 of 219 | 69 | 30-39 | 84.5% | 36.5% (vs 8) |
| v12 | accepted | 1836 ± 65 | 16 of 219 | 168 | 94-74 | 88.7% | 33.1% (vs 3) |
| block | candidate | 1689 ± 160 | 47 of 219 | 20 | 12-8 | 81.4% | 35.8% (vs 13) |
| camp | candidate | 1689 ± 160 | 48 of 219 | 20 | 12-8 | 81.4% | 35.8% (vs 13) |
| h100 | candidate | 1610 ± 65 | 88 of 219 | 200 | 97-103 | 76.7% | 32.5% (vs 19) |
| h101 | candidate | 1585 ± 116 | 94 of 219 | 40 | 18-22 | 75.1% | 30.5% (vs 20) |
| h103 | candidate | 1636 ± 88 | 78 of 219 | 76 | 33-43 | 78.3% | 33.9% (vs 17) |
| h104 | candidate | 1649 ± 99 | 67 of 219 | 58 | 28-30 | 79.1% | 32.3% (vs 14) |
| h107 | candidate | 1531 ± 119 | 117 of 219 | 40 | 15-25 | 71.7% | 29.0% (vs 25) |
| h110 | candidate | 1567 ± 117 | 103 of 219 | 40 | 17-23 | 74.0% | 29.4% (vs 21) |
| h111 | candidate | 1649 ± 99 | 68 of 219 | 58 | 28-30 | 79.1% | 32.3% (vs 14) |
| h112 | candidate | 1649 ± 99 | 69 of 219 | 58 | 28-30 | 79.1% | 32.3% (vs 14) |
| h113 | candidate | 1567 ± 117 | 104 of 219 | 40 | 17-23 | 74.0% | 29.4% (vs 21) |
| h114 | candidate | 1550 ± 117 | 108 of 219 | 40 | 16-24 | 72.8% | 29.3% (vs 23) |
| h115 | candidate | 1637 ± 116 | 75 of 219 | 40 | 21-19 | 78.3% | 34.0% (vs 17) |
| h116 | candidate | 1550 ± 117 | 109 of 219 | 40 | 16-24 | 72.8% | 29.3% (vs 23) |
| h118 | candidate | 1620 ± 115 | 83 of 219 | 40 | 20-20 | 77.3% | 32.8% (vs 18) |
| h11c | candidate | 1534 ± 178 | 116 of 219 | 25 | 15-10 | 71.8% | 29.3% (vs 25) |
| h121 | candidate | 1598 ± 100 | 91 of 219 | 58 | 24-34 | 75.9% | 32.0% (vs 20) |
| h123 | candidate | 1585 ± 100 | 98 of 219 | 58 | 23-35 | 75.1% | 30.5% (vs 20) |
| h124 | candidate | 1585 ± 116 | 95 of 219 | 40 | 18-22 | 75.1% | 30.5% (vs 20) |
| h125 | candidate | 1585 ± 116 | 96 of 219 | 40 | 18-22 | 75.1% | 30.5% (vs 20) |
| h126 | candidate | 1654 ± 85 | 64 of 219 | 98 | 49-49 | 79.4% | 32.9% (vs 14) |
| h127 | candidate | 1644 ± 85 | 72 of 219 | 98 | 47-51 | 78.8% | 33.9% (vs 16) |
| h128 | candidate | 1711 ± 105 | 40 of 219 | 54 | 23-31 | 82.6% | 36.4% (vs 11) |
| h129 | candidate | 1452 ± 127 | 144 of 219 | 40 | 11-29 | 66.4% | 25.2% (vs 30) |
| h130 | candidate | 1662 ± 99 | 60 of 219 | 58 | 29-29 | 79.8% | 32.5% (vs 13) |
| h131 | candidate | 1637 ± 116 | 76 of 219 | 40 | 21-19 | 78.3% | 34.0% (vs 17) |
| h132 | candidate | 1672 ± 117 | 59 of 219 | 40 | 23-17 | 80.4% | 33.7% (vs 13) |
| h133 | candidate | 1654 ± 116 | 65 of 219 | 40 | 22-18 | 79.4% | 32.9% (vs 14) |
| h134 | candidate | 1513 ± 120 | 126 of 219 | 40 | 14-26 | 70.4% | 27.0% (vs 25) |
| h135 | candidate | 1624 ± 99 | 81 of 219 | 58 | 26-32 | 77.5% | 33.3% (vs 18) |
| h136 | candidate | 1626 ± 89 | 80 of 219 | 76 | 32-44 | 77.7% | 33.6% (vs 18) |
| h137 | candidate | 1585 ± 116 | 97 of 219 | 40 | 18-22 | 75.1% | 30.5% (vs 20) |
| h138 | candidate | 1637 ± 116 | 77 of 219 | 40 | 21-19 | 78.3% | 34.0% (vs 17) |
| h139 | candidate | 1676 ± 88 | 57 of 219 | 76 | 37-39 | 80.7% | 34.2% (vs 13) |
| h140 | candidate | 1675 ± 99 | 58 of 219 | 58 | 30-28 | 80.6% | 34.0% (vs 13) |
| h141 | candidate | 1688 ± 99 | 49 of 219 | 58 | 31-27 | 81.3% | 35.6% (vs 13) |
| h142 | candidate | 1654 ± 116 | 66 of 219 | 40 | 22-18 | 79.4% | 32.9% (vs 14) |
| h143 | candidate | 1690 ± 117 | 46 of 219 | 40 | 24-16 | 81.4% | 35.9% (vs 13) |
| h144 | candidate | 1531 ± 119 | 118 of 219 | 40 | 15-25 | 71.7% | 29.0% (vs 25) |
| h145 | candidate | 1729 ± 104 | 35 of 219 | 58 | 31-27 | 83.6% | 36.0% (vs 9) |
| h146 | candidate | 1692 ± 104 | 44 of 219 | 58 | 28-30 | 81.5% | 36.1% (vs 13) |
| h147 | candidate | 1768 ± 105 | 25 of 219 | 58 | 34-24 | 85.5% | 37.1% (vs 7) |
| h148 | candidate | 1749 ± 77 | 27 of 219 | 112 | 58-54 | 84.6% | 34.8% (vs 7) |
| h149 | candidate | 1692 ± 104 | 45 of 219 | 58 | 28-30 | 81.5% | 36.1% (vs 13) |
| h150 | candidate | 1742 ± 104 | 32 of 219 | 58 | 32-26 | 84.2% | 35.8% (vs 8) |
| h151 | candidate | 1643 ± 124 | 73 of 219 | 40 | 18-22 | 78.7% | 33.8% (vs 16) |
| h157 | candidate | 1681 ± 127 | 50 of 219 | 36 | 14-22 | 80.9% | 34.8% (vs 13) |
| h159 | candidate | 1737 ± 92 | 33 of 219 | 72 | 33-39 | 84.0% | 35.3% (vs 8) |
| h161 | candidate | 1681 ± 127 | 51 of 219 | 36 | 14-22 | 80.9% | 34.8% (vs 13) |
| h162 | candidate | 1658 ± 129 | 61 of 219 | 36 | 13-23 | 79.6% | 32.0% (vs 13) |
| h163 | candidate | 1749 ± 77 | 28 of 219 | 108 | 51-57 | 84.6% | 34.7% (vs 7) |
| h167 | candidate | 1792 ± 92 | 20 of 219 | 72 | 38-34 | 86.7% | 35.4% (vs 5) |
| h16r | candidate | 1268 ± 151 | 168 of 219 | 40 | 16-24 | 54.2% | 18.6% (vs 42) |
| h170 | candidate | 1703 ± 126 | 42 of 219 | 36 | 15-21 | 82.2% | 36.6% (vs 12) |
| h175 | candidate | 1781 ± 92 | 21 of 219 | 72 | 37-35 | 86.2% | 34.0% (vs 5) |
| h178 | candidate | 1770 ± 92 | 23 of 219 | 72 | 36-36 | 85.7% | 35.3% (vs 6) |
| h18 | candidate | 1265 ± 194 | 169 of 219 | 25 | 6-19 | 54.0% | 18.5% (vs 42) |
| h184 | candidate | 1830 ± 78 | 17 of 219 | 108 | 62-46 | 88.4% | 32.3% (vs 3) |
| h185 | candidate | 1920 ± 98 | 4 of 219 | 72 | 49-23 | 91.9% | 39.3% (vs 2) |
| h190 | candidate | 1726 ± 126 | 37 of 219 | 36 | 16-20 | 83.4% | 37.0% (vs 10) |
| h192 | candidate | 1681 ± 127 | 52 of 219 | 36 | 14-22 | 80.9% | 34.8% (vs 13) |
| h193 | candidate | 1726 ± 126 | 38 of 219 | 36 | 16-20 | 83.4% | 37.0% (vs 10) |
| h195 | candidate | 1925 ± 82 | 3 of 219 | 108 | 74-34 | 92.0% | 40.0% (vs 2) |
| h198 | candidate | 1907 ± 132 | 5 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h2 | candidate | 1545 ± 149 | 110 of 219 | 54 | 25-29 | 72.6% | 28.8% (vs 23) |
| h201 | candidate | 1907 ± 132 | 6 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h202 | candidate | 1907 ± 132 | 7 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h203 | candidate | 1883 ± 130 | 13 of 219 | 36 | 23-13 | 90.5% | 39.1% (vs 3) |
| h206 | candidate | 1861 ± 91 | 15 of 219 | 78 | 46-32 | 89.7% | 36.3% (vs 3) |
| h207 | candidate | 1876 ± 77 | 14 of 219 | 120 | 72-48 | 90.3% | 38.3% (vs 3) |
| h209 | candidate | 1907 ± 132 | 8 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h211 | candidate | 1907 ± 132 | 9 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h213 | candidate | 1907 ± 132 | 10 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h218 | candidate | 1907 ± 132 | 11 of 219 | 36 | 24-12 | 91.4% | 37.5% (vs 2) |
| h24 | candidate | 1445 ± 153 | 146 of 219 | 40 | 26-14 | 65.9% | 24.5% (vs 30) |
| h24v5 | candidate | 1524 ± 130 | 123 of 219 | 40 | 23-17 | 71.2% | 28.2% (vs 25) |
| h3 | candidate | 1527 ± 214 | 121 of 219 | 19 | 9-10 | 71.4% | 28.5% (vs 25) |
| h31 | candidate | 1426 ± 152 | 151 of 219 | 40 | 25-15 | 64.7% | 24.3% (vs 32) |
| h38 | candidate | 1459 ± 306 | 143 of 219 | 6 | 4-2 | 66.9% | 25.9% (vs 30) |
| h40 | candidate | 1527 ± 290 | 120 of 219 | 8 | 6-2 | 71.4% | 28.5% (vs 25) |
| h41 | candidate | 1386 ± 254 | 155 of 219 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h42 | candidate | 1386 ± 254 | 156 of 219 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h43 | candidate | 1472 ± 247 | 133 of 219 | 8 | 4-4 | 67.8% | 25.6% (vs 28) |
| h44 | candidate | 1658 ± 280 | 62 of 219 | 8 | 6-2 | 79.6% | 32.0% (vs 13) |
| h46 | candidate | 1386 ± 254 | 157 of 219 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h47 | candidate | 1472 ± 247 | 134 of 219 | 8 | 4-4 | 67.8% | 25.6% (vs 28) |
| h48 | candidate | 1472 ± 247 | 135 of 219 | 8 | 4-4 | 67.8% | 25.6% (vs 28) |
| h49 | candidate | 1472 ± 247 | 136 of 219 | 8 | 4-4 | 67.8% | 25.6% (vs 28) |
| h52 | candidate | 1386 ± 254 | 158 of 219 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h53 | candidate | 1559 ± 254 | 106 of 219 | 8 | 5-3 | 73.5% | 29.4% (vs 22) |
| h54 | candidate | 1545 ± 123 | 112 of 219 | 48 | 29-19 | 72.6% | 29.7% (vs 24) |
| h55 | candidate | 1516 ± 121 | 124 of 219 | 56 | 32-24 | 70.6% | 27.3% (vs 25) |
| h58 | candidate | 1429 ± 271 | 150 of 219 | 8 | 3-5 | 64.8% | 24.6% (vs 32) |
| h59 | candidate | 1472 ± 247 | 137 of 219 | 8 | 4-4 | 67.8% | 25.6% (vs 28) |
| h6 | candidate | 1463 ± 114 | 141 of 219 | 158 | 94-64 | 67.2% | 25.5% (vs 29) |
| h60 | candidate | 1472 ± 247 | 138 of 219 | 8 | 4-4 | 67.8% | 25.6% (vs 28) |
| h61 | candidate | 1578 ± 253 | 100 of 219 | 8 | 5-3 | 74.7% | 30.6% (vs 21) |
| h63 | candidate | 1543 ± 127 | 113 of 219 | 40 | 23-17 | 72.5% | 29.5% (vs 24) |
| h64 | candidate | 1526 ± 126 | 122 of 219 | 40 | 22-18 | 71.3% | 28.4% (vs 25) |
| h68 | candidate | 1677 ± 279 | 54 of 219 | 8 | 6-2 | 80.7% | 34.3% (vs 13) |
| h7 | candidate | 1515 ± 1460 | 125 of 219 | 8 | 8-0 | 70.6% | 27.2% (vs 25) |
| h72 | candidate | 1677 ± 279 | 55 of 219 | 8 | 6-2 | 80.7% | 34.3% (vs 13) |
| h76 | candidate | 1618 ± 184 | 84 of 219 | 32 | 18-14 | 77.2% | 32.6% (vs 18) |
| h77 | candidate | 1500 ± 186 | 128 of 219 | 16 | 8-8 | 69.6% | 25.7% (vs 25) |
| h78 | candidate | 1677 ± 279 | 56 of 219 | 8 | 6-2 | 80.7% | 34.3% (vs 13) |
| h82 | candidate | 1575 ± 94 | 102 of 219 | 134 | 70-64 | 74.5% | 30.2% (vs 21) |
| h83 | candidate | 1616 ± 298 | 86 of 219 | 8 | 4-4 | 77.0% | 33.2% (vs 19) |
| h84 | candidate | 1616 ± 298 | 87 of 219 | 8 | 4-4 | 77.0% | 33.2% (vs 19) |
| h88 | candidate | 1539 ± 143 | 114 of 219 | 40 | 18-22 | 72.2% | 29.1% (vs 24) |
| h89 | candidate | 746 ± 1086 | 196 of 219 | 8 | 0-8 | 27.1% | 8.2% (vs 67) |
| h8v5 | candidate | 1576 ± 125 | 101 of 219 | 48 | 31-17 | 74.5% | 30.4% (vs 21) |
| h90 | candidate | 746 ± 1086 | 197 of 219 | 8 | 0-8 | 27.1% | 8.2% (vs 67) |
| h91 | candidate | 1530 ± 194 | 119 of 219 | 16 | 7-9 | 71.6% | 28.9% (vs 25) |
| h96 | candidate | 1598 ± 100 | 92 of 219 | 58 | 24-34 | 75.9% | 32.0% (vs 20) |
| rush | sparring | 1265 ± 194 | 170 of 219 | 25 | 6-19 | 54.0% | 18.5% (vs 42) |
| rush4 | sparring | 1510 ± 132 | 127 of 219 | 50 | 30-20 | 70.2% | 26.7% (vs 25) |
| turtle | candidate | 1381 ± 192 | 160 of 219 | 20 | 4-16 | 61.6% | 23.2% (vs 36) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 125 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 350 malformed)
- replica: 6775 games (11 archive games skipped, 871 matches from archives, 1377 matches from scores), fetched 2026-10-27T21:57:27+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34), v10 = h175 (72 games, 37-35), v11 = h178 (72 games, 36-36), v12 = h185 (72 games, 49-23). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the win rate and W-L against the bot of the latest accepted build with games of its own that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 1997 | 79 | 135 | 100-35 | 22% (v12 4-14) |
| 2 | m-schier.battlecode-2019-wololo | field | 1994 | 51 | 483 | 370-113 | 22% (v12 4-14) |
| 3 | **cand:h195** | candidate | 1925 | 82 | 108 | 74-34 |  |
| 4 | **cand:h185** | candidate | 1920 | 98 | 72 | 49-23 |  |
| 5 | **cand:h198** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 6 | **cand:h201** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 7 | **cand:h202** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 8 | **cand:h209** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 9 | **cand:h211** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 10 | **cand:h213** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 11 | **cand:h218** | candidate | 1907 | 132 | 36 | 24-12 |  |
| 12 | uvafan.bc2019 | field | 1891 | 47 | 486 | 315-171 | 24% (v12 5-16) |
| 13 | **cand:h203** | candidate | 1883 | 130 | 36 | 23-13 |  |
| 14 | **cand:h207** | candidate | 1876 | 77 | 120 | 72-48 |  |
| 15 | **cand:h206** | candidate | 1861 | 91 | 78 | 46-32 |  |
| 16 | **us:v12** | accepted | 1836 | 65 | 168 | 94-74 |  |
| 17 | **cand:h184** | candidate | 1830 | 78 | 108 | 62-46 |  |
| 18 | yujinwunz.battlecode_2019 | field | 1819 | 85 | 111 | 74-37 | 56% (v12 5-4) |
| 19 | rafekruse.Battlecode-2019-bc19 | field | 1811 | 87 | 96 | 62-34 | 0% (v8 0-3) |
| 20 | **cand:h167** | candidate | 1792 | 92 | 72 | 38-34 |  |
| 21 | **cand:h175** | candidate | 1781 | 92 | 72 | 37-35 |  |
| 22 | VoidMercy.battlecode-2019~e7dc06 | field | 1780 | 91 | 90 | 60-30 | 33% (v11 1-2) |
| 23 | **cand:h178** | candidate | 1770 | 92 | 72 | 36-36 |  |
| 24 | StoneT2000.BC19-botfinalsafe | field | 1768 | 45 | 498 | 270-228 | 62% (v12 13-8) |
| 25 | **cand:h147** | candidate | 1768 | 105 | 58 | 34-24 |  |
| 26 | **us:v9** | accepted | 1757 | 111 | 48 | 21-27 |  |
| 27 | **cand:h148** | candidate | 1749 | 77 | 112 | 58-54 |  |
| 28 | **cand:h163** | candidate | 1749 | 77 | 108 | 51-57 |  |
| 29 | **us:v10** | accepted | 1748 | 125 | 36 | 17-19 |  |
| 30 | arya-k.bc19 | field | 1747 | 87 | 96 | 63-33 | 83% (v12 5-1) |
| 31 | **us:v11** | accepted | 1747 | 93 | 69 | 30-39 |  |
| 32 | **cand:h150** | candidate | 1742 | 104 | 58 | 32-26 |  |
| 33 | **cand:h159** | candidate | 1737 | 92 | 72 | 33-39 |  |
| 34 | StoneT2000.BC19-bot1v43 | field | 1730 | 45 | 495 | 245-250 | 81% (v12 17-4) |
| 35 | **cand:h145** | candidate | 1729 | 104 | 58 | 31-27 |  |
| 36 | moreda-a.BC2019-a31 | field | 1728 | 86 | 99 | 60-39 | 100% (v12 3-0) |
| 37 | **cand:h190** | candidate | 1726 | 126 | 36 | 16-20 |  |
| 38 | **cand:h193** | candidate | 1726 | 126 | 36 | 16-20 |  |
| 39 | j-mao.battlecode-2019 | field | 1716 | 87 | 90 | 53-37 | 100% (v8 3-0) |
| 40 | **cand:h128** | candidate | 1711 | 105 | 54 | 23-31 |  |
| 41 | virenvshah.Battlecode2019 | field | 1710 | 84 | 108 | 67-41 | 67% (v12 2-1) |
| 42 | **cand:h170** | candidate | 1703 | 126 | 36 | 15-21 |  |
| 43 | IanCoolidge0.battlecode20~f649f3 | field | 1702 | 83 | 117 | 70-47 | 50% (v12 3-3) |
| 44 | **cand:h146** | candidate | 1692 | 104 | 58 | 28-30 |  |
| 45 | **cand:h149** | candidate | 1692 | 104 | 58 | 28-30 |  |
| 46 | **cand:h143** | candidate | 1690 | 117 | 40 | 24-16 |  |
| 47 | **cand:block** | candidate | 1689 | 160 | 20 | 12-8 |  |
| 48 | **cand:camp** | candidate | 1689 | 160 | 20 | 12-8 |  |
| 49 | **cand:h141** | candidate | 1688 | 99 | 58 | 31-27 |  |
| 50 | **cand:h157** | candidate | 1681 | 127 | 36 | 14-22 |  |
| 51 | **cand:h161** | candidate | 1681 | 127 | 36 | 14-22 |  |
| 52 | **cand:h192** | candidate | 1681 | 127 | 36 | 14-22 |  |
| 53 | **us:v8** | accepted | 1679 | 62 | 356 | 160-196 |  |
| 54 | **cand:h68** | candidate | 1677 | 279 | 8 | 6-2 |  |
| 55 | **cand:h72** | candidate | 1677 | 279 | 8 | 6-2 |  |
| 56 | **cand:h78** | candidate | 1677 | 279 | 8 | 6-2 |  |
| 57 | **cand:h139** | candidate | 1676 | 88 | 76 | 37-39 |  |
| 58 | **cand:h140** | candidate | 1675 | 99 | 58 | 30-28 |  |
| 59 | **cand:h132** | candidate | 1672 | 117 | 40 | 23-17 |  |
| 60 | **cand:h130** | candidate | 1662 | 99 | 58 | 29-29 |  |
| 61 | **cand:h162** | candidate | 1658 | 129 | 36 | 13-23 |  |
| 62 | **cand:h44** | candidate | 1658 | 280 | 8 | 6-2 |  |
| 63 | vineetparikh.BigRedBattle~fe3459 | field | 1657 | 88 | 96 | 60-36 | 100% (v12 3-0) |
| 64 | **cand:h126** | candidate | 1654 | 85 | 98 | 49-49 |  |
| 65 | **cand:h133** | candidate | 1654 | 116 | 40 | 22-18 |  |
| 66 | **cand:h142** | candidate | 1654 | 116 | 40 | 22-18 |  |
| 67 | **cand:h104** | candidate | 1649 | 99 | 58 | 28-30 |  |
| 68 | **cand:h111** | candidate | 1649 | 99 | 58 | 28-30 |  |
| 69 | **cand:h112** | candidate | 1649 | 99 | 58 | 28-30 |  |
| 70 | rafekruse.Battlecode-2019~2680d4 | field | 1649 | 90 | 90 | 57-33 |  |
| 71 | IanCoolidge0.battlecode20~69ce88 | field | 1649 | 45 | 489 | 185-304 | 67% (v12 14-7) |
| 72 | **cand:h127** | candidate | 1644 | 85 | 98 | 47-51 |  |
| 73 | **cand:h151** | candidate | 1643 | 124 | 40 | 18-22 |  |
| 74 | bqi343.cp-notebook | field | 1640 | 89 | 93 | 57-36 |  |
| 75 | **cand:h115** | candidate | 1637 | 116 | 40 | 21-19 |  |
| 76 | **cand:h131** | candidate | 1637 | 116 | 40 | 21-19 |  |
| 77 | **cand:h138** | candidate | 1637 | 116 | 40 | 21-19 |  |
| 78 | **cand:h103** | candidate | 1636 | 88 | 76 | 33-43 |  |
| 79 | unrevre.battlecode | field | 1636 | 102 | 72 | 47-25 |  |
| 80 | **cand:h136** | candidate | 1626 | 89 | 76 | 32-44 |  |
| 81 | **cand:h135** | candidate | 1624 | 99 | 58 | 26-32 |  |
| 82 | **us:v7** | accepted | 1620 | 44 | 1804 | 927-877 |  |
| 83 | **cand:h118** | candidate | 1620 | 115 | 40 | 20-20 |  |
| 84 | **cand:h76** | candidate | 1618 | 184 | 32 | 18-14 |  |
| 85 | ldcWV.Battlecode-2019 | field | 1616 | 95 | 81 | 51-30 |  |
| 86 | **cand:h83** | candidate | 1616 | 298 | 8 | 4-4 |  |
| 87 | **cand:h84** | candidate | 1616 | 298 | 8 | 4-4 |  |
| 88 | **cand:h100** | candidate | 1610 | 65 | 200 | 97-103 |  |
| 89 | awesomelemonade.Battlecode2019 | field | 1610 | 46 | 471 | 163-308 | 89% (v12 16-2) |
| 90 | **us:v0** | accepted | 1602 | 223 | 38 | 33-5 |  |
| 91 | **cand:h121** | candidate | 1598 | 100 | 58 | 24-34 |  |
| 92 | **cand:h96** | candidate | 1598 | 100 | 58 | 24-34 |  |
| 93 | **us:v3** | accepted | 1596 | 96 | 191 | 140-51 |  |
| 94 | **cand:h101** | candidate | 1585 | 116 | 40 | 18-22 |  |
| 95 | **cand:h124** | candidate | 1585 | 116 | 40 | 18-22 |  |
| 96 | **cand:h125** | candidate | 1585 | 116 | 40 | 18-22 |  |
| 97 | **cand:h137** | candidate | 1585 | 116 | 40 | 18-22 |  |
| 98 | **cand:h123** | candidate | 1585 | 100 | 58 | 23-35 |  |
| 99 | cemondr.BC19pdxgroup4 | field | 1581 | 91 | 87 | 50-37 |  |
| 100 | **cand:h61** | candidate | 1578 | 253 | 8 | 5-3 |  |
| 101 | **cand:h8v5** | candidate | 1576 | 125 | 48 | 31-17 |  |
| 102 | **cand:h82** | candidate | 1575 | 94 | 134 | 70-64 |  |
| 103 | **cand:h110** | candidate | 1567 | 117 | 40 | 17-23 |  |
| 104 | **cand:h113** | candidate | 1567 | 117 | 40 | 17-23 |  |
| 105 | UpperArlingtonHighSchool.~682aa9 | field | 1563 | 96 | 87 | 51-36 |  |
| 106 | **cand:h53** | candidate | 1559 | 254 | 8 | 5-3 |  |
| 107 | Nischay-Pro.BattleCode2019 | field | 1555 | 97 | 84 | 50-34 |  |
| 108 | **cand:h114** | candidate | 1550 | 117 | 40 | 16-24 |  |
| 109 | **cand:h116** | candidate | 1550 | 117 | 40 | 16-24 |  |
| 110 | **cand:h2** | candidate | 1545 | 149 | 54 | 25-29 |  |
| 111 | IvanGeffner.BC19-bot6b | field | 1545 | 378 | 9 | 7-2 |  |
| 112 | **cand:h54** | candidate | 1545 | 123 | 48 | 29-19 |  |
| 113 | **cand:h63** | candidate | 1543 | 127 | 40 | 23-17 |  |
| 114 | **cand:h88** | candidate | 1539 | 143 | 40 | 18-22 |  |
| 115 | IvanGeffner.BC19-eigthbot | field | 1539 | 312 | 9 | 6-3 |  |
| 116 | **cand:h11c** | candidate | 1534 | 178 | 25 | 15-10 |  |
| 117 | **cand:h107** | candidate | 1531 | 119 | 40 | 15-25 |  |
| 118 | **cand:h144** | candidate | 1531 | 119 | 40 | 15-25 |  |
| 119 | **cand:h91** | candidate | 1530 | 194 | 16 | 7-9 |  |
| 120 | **cand:h40** | candidate | 1527 | 290 | 8 | 6-2 |  |
| 121 | **cand:h3** | candidate | 1527 | 214 | 19 | 9-10 |  |
| 122 | **cand:h64** | candidate | 1526 | 126 | 40 | 22-18 |  |
| 123 | **cand:h24v5** | candidate | 1524 | 130 | 40 | 23-17 |  |
| 124 | **cand:h55** | candidate | 1516 | 121 | 56 | 32-24 |  |
| 125 | **cand:h7** | candidate | 1515 | 1460 | 8 | 8-0 |  |
| 126 | **cand:h134** | candidate | 1513 | 120 | 40 | 14-26 |  |
| 127 | **spar:rush4** | sparring | 1510 | 132 | 50 | 30-20 |  |
| 128 | **cand:h77** | candidate | 1500 | 186 | 16 | 8-8 |  |
| 129 | NielsKornerup.Battlecode-2019 | field | 1495 | 77 | 132 | 70-62 |  |
| 130 | ovkulkarni.battlecode2019~0aa607 | field | 1494 | 90 | 90 | 52-38 |  |
| 131 | **us:v6** | accepted | 1491 | 66 | 322 | 130-192 |  |
| 132 | dmunozc.bc19-g8-bots | field | 1481 | 91 | 90 | 51-39 |  |
| 133 | **cand:h43** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 134 | **cand:h47** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 135 | **cand:h48** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 136 | **cand:h49** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 137 | **cand:h59** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 138 | **cand:h60** | candidate | 1472 | 247 | 8 | 4-4 |  |
| 139 | **us:v5** | accepted | 1472 | 72 | 439 | 202-237 |  |
| 140 | lschaberg.bc19 | field | 1471 | 101 | 75 | 43-32 |  |
| 141 | **cand:h6** | candidate | 1463 | 114 | 158 | 94-64 |  |
| 142 | dmunozc.bc19-g8-davjasdiv | field | 1460 | 88 | 102 | 56-46 |  |
| 143 | **cand:h38** | candidate | 1459 | 306 | 6 | 4-2 |  |
| 144 | **cand:h129** | candidate | 1452 | 127 | 40 | 11-29 |  |
| 145 | **us:v1** | accepted | 1451 | 135 | 154 | 128-26 |  |
| 146 | **cand:h24** | candidate | 1445 | 153 | 40 | 26-14 |  |
| 147 | programjames.BC19Bot-seeding | field | 1444 | 92 | 87 | 50-37 |  |
| 148 | m4reko.bc2019-tmores-angels | field | 1435 | 94 | 84 | 48-36 |  |
| 149 | **us:v2** | accepted | 1430 | 137 | 62 | 30-32 |  |
| 150 | **cand:h58** | candidate | 1429 | 271 | 8 | 3-5 |  |
| 151 | **cand:h31** | candidate | 1426 | 152 | 40 | 25-15 |  |
| 152 | howard36.Battlecode2019-eco6 | field | 1426 | 93 | 90 | 48-42 |  |
| 153 | ovkulkarni.battlecode2019~06c610 | field | 1417 | 102 | 75 | 44-31 |  |
| 154 | Tom-CCS.BC19 | field | 1388 | 95 | 87 | 47-40 |  |
| 155 | **cand:h41** | candidate | 1386 | 254 | 8 | 3-5 |  |
| 156 | **cand:h42** | candidate | 1386 | 254 | 8 | 3-5 |  |
| 157 | **cand:h46** | candidate | 1386 | 254 | 8 | 3-5 |  |
| 158 | **cand:h52** | candidate | 1386 | 254 | 8 | 3-5 |  |
| 159 | abcdefguan.battlecode2019 | field | 1384 | 97 | 90 | 49-41 |  |
| 160 | **cand:turtle** | candidate | 1381 | 192 | 20 | 4-16 |  |
| 161 | **us:v4** | accepted | 1337 | 105 | 220 | 83-137 |  |
| 162 | CS554-software-engineerin~a575dc | field | 1330 | 69 | 311 | 180-131 | 100% (v7 3-0) |
| 163 | ipercyNC.group6-battlecode | field | 1319 | 96 | 87 | 46-41 |  |
| 164 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1314 | 88 | 120 | 56-64 |  |
| 165 | moreda-a.BC2019-t15 | field | 1294 | 109 | 72 | 36-36 |  |
| 166 | sunanth123.battlecode19-prorush | field | 1284 | 98 | 84 | 44-40 |  |
| 167 | nthistle.battlecode-2019 | field | 1277 | 93 | 99 | 51-48 | 100% (v5 3-0) |
| 168 | **cand:h16r** | candidate | 1268 | 151 | 40 | 16-24 |  |
| 169 | **cand:h18** | candidate | 1265 | 194 | 25 | 6-19 |  |
| 170 | **spar:rush** | sparring | 1265 | 194 | 25 | 6-19 |  |
| 171 | twitu.bc19-tsp | field | 1265 | 103 | 87 | 47-40 |  |
| 172 | programjames.BC19Bot-root | field | 1261 | 98 | 84 | 43-41 |  |
| 173 | vicennial.BattleCode19 | field | 1246 | 89 | 114 | 57-57 |  |
| 174 | cvxluo.battlecode19 | field | 1241 | 95 | 93 | 46-47 |  |
| 175 | CometsTech.battlecode2019 | field | 1235 | 74 | 276 | 130-146 | 100% (v7 3-0) |
| 176 | Nydroam.BatteredCod | field | 1220 | 442 | 6 | 3-3 |  |
| 177 | sunanth123.battlecode19-mainbot | field | 1204 | 99 | 90 | 46-44 |  |
| 178 | evanyeyeye.battlecode2019~af562c | field | 1202 | 105 | 75 | 39-36 |  |
| 179 | JasonLarson44.2019-Battle~1c7639 | field | 1160 | 90 | 108 | 52-56 | 100% (v3 3-0) |
| 180 | bayoumi17m.BattleCode-2019 | field | 1154 | 104 | 81 | 41-40 |  |
| 181 | spachava753.bc19 | field | 1142 | 106 | 81 | 41-40 |  |
| 182 | jamesrayman.HCN-bot | field | 1139 | 99 | 99 | 48-51 | 100% (v5 3-0) |
| 183 | UpperArlingtonHighSchool.~5e7875 | field | 1035 | 115 | 81 | 40-41 |  |
| 184 | jackliu612.Battlecode19 | field | 943 | 122 | 81 | 39-42 |  |
| 185 | haydenshively.Battle-Code~e1c2fb | field | 936 | 104 | 87 | 38-49 |  |
| 186 | TestSubjector.BattleCode2~fb22c7 | field | 933 | 117 | 102 | 46-56 |  |
| 187 | haydenshively.Battle-Code~e37b3e | field | 929 | 111 | 84 | 38-46 |  |
| 188 | TestSubjector.BattleCode2~e6de74 | field | 926 | 109 | 105 | 47-58 |  |
| 189 | rooneyshuman.Battlecode | field | 923 | 116 | 84 | 38-46 |  |
| 190 | dndoja.battlecode19 | field | 912 | 113 | 75 | 35-40 |  |
| 191 | CometsTech.battlecode2019~187e8c | field | 866 | 110 | 87 | 39-48 |  |
| 192 | roy-love.onshoreBattleCode2019 | field | 831 | 110 | 87 | 39-48 |  |
| 193 | SethKitchen.examplefuncsplayer | field | 789 | 125 | 93 | 39-54 |  |
| 194 | liwanlin41.examplefuncsplayer | field | 761 | 109 | 129 | 55-74 |  |
| 195 | 18dcb01.Battlecode19-robot2 | field | 752 | 119 | 93 | 38-55 |  |
| 196 | **cand:h89** | candidate | 746 | 1086 | 8 | 0-8 |  |
| 197 | **cand:h90** | candidate | 746 | 1086 | 8 | 0-8 |  |
| 198 | VictorButoi.BattleCode201~c4576b | field | 709 | 122 | 78 | 34-44 |  |
| 199 | dgh2.bc19-t1 | field | 708 | 135 | 81 | 32-49 |  |
| 200 | jyurkanin.corn_bc19 | field | 671 | 127 | 87 | 33-54 |  |
| 201 | OmarTahoun.battle-code | field | 664 | 116 | 99 | 45-54 |  |
| 202 | asunathanr.asu_bc | field | 659 | 113 | 99 | 40-59 |  |
| 203 | nhard.examplefuncsplayer | field | 575 | 126 | 87 | 35-52 |  |
| 204 | howard36.Battlecode2019-sprint | field | 571 | 130 | 78 | 29-49 |  |
| 205 | waylon531.scala_starter | field | 485 | 136 | 93 | 35-58 |  |
| 206 | vishwasns99.BC_2019 | field | 456 | 140 | 78 | 28-50 |  |
| 207 | bovard.battlecode-2019-un~8822c3 | field | 439 | 140 | 87 | 35-52 |  |
| 208 | DivyanshuSaxena.Battlecode | field | 282 | 148 | 99 | 38-61 |  |
| 209 | bc19-starter | field | 207 | 145 | 391 | 85-306 | 100% (v3 12-0) |
| 210 | RyanSharafuddin.Battlecode_2019 | field | 185 | 150 | 111 | 38-73 |  |
| 211 | jbiewend.Battlecode2019 | field | 151 | 159 | 84 | 29-55 |  |
| 212 | VoidMercy.battlecode-2019-bot | field | 125 | 158 | 84 | 29-55 |  |
| 213 | ryanhzhao.Battlecode-2019 | field | 16 | 172 | 84 | 24-60 |  |
| 214 | yunaganyh.bc19 | field | -163 | 179 | 81 | 23-58 |  |
| 215 | djkeyes.bc19 | field | -164 | 174 | 84 | 24-60 |  |
| 216 | jshin313.battlecodebot | field | -290 | 175 | 90 | 22-68 |  |
| 217 | TheRobotCarlson.battlehac~323871 | field | -293 | 174 | 108 | 27-81 |  |
| 218 | jamesrayman.HCN-basic-bot | field | -358 | 186 | 78 | 14-64 |  |
| 219 | ArtemUstilov.bc19_CrazyTapok | field | -842 | 1083 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 18 | 13-5 | 72% | replica |
| mvpatel2000.Battlecode2019 | uvafan.bc2019 | 18 | 13-5 | 72% | replica |
| mvpatel2000.Battlecode2019 | cand:h207 | 12 | 6-6 | 50% | replica |
| mvpatel2000.Battlecode2019 | cand:h206 | 6 | 2-4 | 33% | replica |
| mvpatel2000.Battlecode2019 | us:v12 | 18 | 14-4 | 78% | replica |
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 9 | 6-3 | 67% | replica |
| mvpatel2000.Battlecode2019 | rafekruse.Battlecode-2019-bc19 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v9 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v11 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 6 | 6-0 | 100% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v10 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v11 | 9 | 8-1 | 89% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h190 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h193 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | virenvshah.Battlecode2019 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h170 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h104 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h111 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h112 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
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
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | us:v10 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v11 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h190 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h193 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h170 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h149 | 3 | 2-1 | 67% | replica |
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
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| us:v12 | yujinwunz.battlecode_2019 | 9 | 5-4 | 56% | replica |
| us:v12 | StoneT2000.BC19-botfinalsafe | 21 | 13-8 | 62% | replica |
| us:v12 | arya-k.bc19 | 6 | 5-1 | 83% | replica |
| us:v12 | StoneT2000.BC19-bot1v43 | 21 | 17-4 | 81% | replica |
| us:v12 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
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
| yujinwunz.battlecode_2019 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | j-mao.battlecode-2019 | 6 | 4-2 | 67% | replica |
| yujinwunz.battlecode_2019 | virenvshah.Battlecode2019 | 9 | 6-3 | 67% | replica |
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
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| rafekruse.Battlecode-2019-bc19 | moreda-a.BC2019-a31 | 12 | 5-7 | 42% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 9 | 4-5 | 44% | replica |
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
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
| VoidMercy.battlecode-2019~e7dc06 | arya-k.bc19 | 3 | 0-3 | 0% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v11 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~69ce88 | 9 | 5-4 | 56% | replica |
| VoidMercy.battlecode-2019~e7dc06 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | us:v10 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v11 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h190 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | virenvshah.Battlecode2019 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
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
| cand:h148 | StoneT2000.BC19-bot1v43 | 12 | 7-5 | 58% | replica |
| cand:h148 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h148 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h148 | awesomelemonade.Battlecode2019 | 12 | 7-5 | 58% | replica |
| cand:h163 | StoneT2000.BC19-bot1v43 | 18 | 8-10 | 44% | replica |
| cand:h163 | IanCoolidge0.battlecode20~69ce88 | 18 | 14-4 | 78% | replica |
| cand:h163 | awesomelemonade.Battlecode2019 | 18 | 11-7 | 61% | replica |
| us:v10 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v10 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| us:v10 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| arya-k.bc19 | us:v11 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | moreda-a.BC2019-a31 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | virenvshah.Battlecode2019 | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | us:v8 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 6 | 6-0 | 100% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 9 | 5-4 | 56% | replica |
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
| StoneT2000.BC19-bot1v43 | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h190 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | j-mao.battlecode-2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-bot1v43 | virenvshah.Battlecode2019 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h157 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | cand:h161 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h192 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | vineetparikh.BigRedBattle~fe3459 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | bqi343.cp-notebook | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h121 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | UpperArlingtonHighSchool.~682aa9 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 9 | 9-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h145 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-a31 | us:v8 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | IanCoolidge0.battlecode20~69ce88 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h190 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h190 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h193 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h193 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| j-mao.battlecode-2019 | virenvshah.Battlecode2019 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | us:v8 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| j-mao.battlecode-2019 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| virenvshah.Battlecode2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | rafekruse.Battlecode-2019~2680d4 | 6 | 2-4 | 33% | replica |
| virenvshah.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
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
| cand:h170 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h170 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | us:v8 | 3 | 0-3 | 0% | replica |
| IanCoolidge0.battlecode20~f649f3 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | rafekruse.Battlecode-2019~2680d4 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| cand:h146 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h146 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h146 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h149 | us:v8 | 40 | 20-20 | 50% | local |
| cand:h149 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h149 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
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
| cand:h162 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h162 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| vineetparikh.BigRedBattle~fe3459 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| vineetparikh.BigRedBattle~fe3459 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h126 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h104 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h104 | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| cand:h111 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h112 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| rafekruse.Battlecode-2019~2680d4 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 6 | 2-4 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h127 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h127 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | ldcWV.Battlecode-2019 | 6 | 1-5 | 17% | replica |
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
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h103 | awesomelemonade.Battlecode2019 | 6 | 1-5 | 17% | replica |
| unrevre.battlecode | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h136 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h135 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| us:v7 | cand:h118 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| us:v7 | cand:h121 | 40 | 21-19 | 52% | local |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
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
| ldcWV.Battlecode-2019 | cemondr.BC19pdxgroup4 | 6 | 4-2 | 67% | replica |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 3-3 | 50% | replica |
| ldcWV.Battlecode-2019 | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| ldcWV.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | Tom-CCS.BC19 | 6 | 5-1 | 83% | replica |
| ldcWV.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | cvxluo.battlecode19 | 6 | 6-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
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
| cemondr.BC19pdxgroup4 | Nischay-Pro.BattleCode2019 | 6 | 4-2 | 67% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| UpperArlingtonHighSchool.~682aa9 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 6 | 6-0 | 100% | replica |
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
| Nischay-Pro.BattleCode2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
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
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~0aa607 | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-bots | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 9 | 6-3 | 67% | replica |
| NielsKornerup.Battlecode-2019 | programjames.BC19Bot-seeding | 6 | 5-1 | 83% | replica |
| NielsKornerup.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | abcdefguan.battlecode2019 | 3 | 1-2 | 33% | replica |
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
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
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
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| dmunozc.bc19-g8-bots | dmunozc.bc19-g8-davjasdiv | 9 | 4-5 | 44% | replica |
| dmunozc.bc19-g8-bots | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
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
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | programjames.BC19Bot-seeding | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| lschaberg.bc19 | ovkulkarni.battlecode2019~06c610 | 9 | 5-4 | 56% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-davjasdiv | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | moreda-a.BC2019-t15 | 6 | 4-2 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | nthistle.battlecode-2019 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-davjasdiv | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| programjames.BC19Bot-seeding | m4reko.bc2019-tmores-angels | 9 | 6-3 | 67% | replica |
| programjames.BC19Bot-seeding | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 9 | 8-1 | 89% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | howard36.Battlecode2019-eco6 | 6 | 4-2 | 67% | replica |
| m4reko.bc2019-tmores-angels | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | ipercyNC.group6-battlecode | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| howard36.Battlecode2019-eco6 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 6 | 3-3 | 50% | replica |
| howard36.Battlecode2019-eco6 | moreda-a.BC2019-t15 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
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
| Tom-CCS.BC19 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | nthistle.battlecode-2019 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
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
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| CS554-software-engineerin~a575dc | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | 18dcb01.Battlecode19-prea~fb5c48 | 9 | 5-4 | 56% | replica |
| CS554-software-engineerin~a575dc | nthistle.battlecode-2019 | 6 | 5-1 | 83% | replica |
| CS554-software-engineerin~a575dc | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 9 | 8-1 | 89% | replica |
| ipercyNC.group6-battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 6 | 4-2 | 67% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 6 | 2-4 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | programjames.BC19Bot-root | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | vicennial.BattleCode19 | 6 | 1-5 | 17% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | spachava753.bc19 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 6 | 4-2 | 67% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 6 | 2-4 | 33% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-prorush | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
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
| twitu.bc19-tsp | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | vicennial.BattleCode19 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-root | cvxluo.battlecode19 | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-root | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | liwanlin41.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | cvxluo.battlecode19 | 3 | 0-3 | 0% | replica |
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
| cvxluo.battlecode19 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | JasonLarson44.2019-Battle~1c7639 | 12 | 8-4 | 67% | replica |
| cvxluo.battlecode19 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
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
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-mainbot | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 6 | 5-1 | 83% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jamesrayman.HCN-bot | 6 | 3-3 | 50% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 9 | 7-2 | 78% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| bayoumi17m.BattleCode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jamesrayman.HCN-bot | 6 | 4-2 | 67% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| jamesrayman.HCN-bot | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~fb22c7 | 6 | 6-0 | 100% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e1c2fb | 6 | 3-3 | 50% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 6 | 5-1 | 83% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | dndoja.battlecode19 | 3 | 1-2 | 33% | replica |
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
| haydenshively.Battle-Code~e1c2fb | TestSubjector.BattleCode2~fb22c7 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | TestSubjector.BattleCode2~e6de74 | 9 | 4-5 | 44% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 12 | 8-4 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | CometsTech.battlecode2019~187e8c | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e1c2fb | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
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
| haydenshively.Battle-Code~e37b3e | TestSubjector.BattleCode2~e6de74 | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e37b3e | rooneyshuman.Battlecode | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 9 | 6-3 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | roy-love.onshoreBattleCode2019 | 3 | 1-2 | 33% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
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
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | asunathanr.asu_bc | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| roy-love.onshoreBattleCode2019 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
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
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | asunathanr.asu_bc | 9 | 6-3 | 67% | replica |
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
| 18dcb01.Battlecode19-robot2 | howard36.Battlecode2019-sprint | 6 | 5-1 | 83% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | asunathanr.asu_bc | 6 | 2-4 | 33% | replica |
| VictorButoi.BattleCode201~c4576b | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 9 | 6-3 | 67% | replica |
| dgh2.bc19-t1 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | OmarTahoun.battle-code | 6 | 2-4 | 33% | replica |
| jyurkanin.corn_bc19 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
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
| asunathanr.asu_bc | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| asunathanr.asu_bc | howard36.Battlecode2019-sprint | 6 | 2-4 | 33% | replica |
| asunathanr.asu_bc | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 6 | 5-1 | 83% | replica |
| asunathanr.asu_bc | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
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
| vishwasns99.BC_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | bc19-starter | 3 | 2-1 | 67% | replica |
| bovard.battlecode-2019-un~8822c3 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | ryanhzhao.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 15 | 9-6 | 60% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | ryanhzhao.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| DivyanshuSaxena.Battlecode | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 9 | 3-6 | 33% | replica |
| bc19-starter | jbiewend.Battlecode2019 | 6 | 4-2 | 67% | replica |
| bc19-starter | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| bc19-starter | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| bc19-starter | yunaganyh.bc19 | 6 | 4-2 | 67% | replica |
| bc19-starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| RyanSharafuddin.Battlecode_2019 | VoidMercy.battlecode-2019-bot | 9 | 6-3 | 67% | replica |
| RyanSharafuddin.Battlecode_2019 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 12 | 12-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 2-1 | 67% | replica |
| jbiewend.Battlecode2019 | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 9 | 9-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | ryanhzhao.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 9 | 8-1 | 89% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 6 | 6-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 9 | 4-5 | 44% | replica |
| ryanhzhao.Battlecode-2019 | jshin313.battlecodebot | 6 | 5-1 | 83% | replica |
| ryanhzhao.Battlecode-2019 | TheRobotCarlson.battlehac~323871 | 3 | 2-1 | 67% | replica |
| ryanhzhao.Battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 2-1 | 67% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 12 | 8-4 | 67% | replica |
| yunaganyh.bc19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 12 | 9-3 | 75% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 12 | 9-3 | 75% | replica |
| djkeyes.bc19 | TheRobotCarlson.battlehac~323871 | 9 | 5-4 | 56% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 6 | 5-1 | 83% | replica |
| jshin313.battlecodebot | TheRobotCarlson.battlehac~323871 | 21 | 10-11 | 48% | replica |
| jshin313.battlecodebot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 18 | 9-9 | 50% | replica |
