# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-26 19:25 PDT.

8974 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 2149 of ours on the galaxy replica and 3582 between field bots there (3579 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 212 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, m-schier.battlecode-2019-wololo, uvafan.bc2019, yujinwunz.battlecode_2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, StoneT2000.BC19-botfinalsafe, j-mao.battlecode-2019, arya-k.bc19, StoneT2000.BC19-bot1v43, virenvshah.Battlecode2019, moreda-a.BC2019-a31, rafekruse.Battlecode-2019~2680d4, IanCoolidge0.battlecode20~f649f3, IanCoolidge0.battlecode20~69ce88, vineetparikh.BigRedBattle~fe3459, bqi343.cp-notebook, awesomelemonade.Battlecode2019, unrevre.battlecode, ldcWV.Battlecode-2019, cemondr.BC19pdxgroup4, UpperArlingtonHighSchool.~682aa9, IvanGeffner.BC19-bot6b, Nischay-Pro.BattleCode2019, IvanGeffner.BC19-eigthbot, ovkulkarni.battlecode2019~0aa607, NielsKornerup.Battlecode-2019, dmunozc.bc19-g8-bots, lschaberg.bc19, dmunozc.bc19-g8-davjasdiv, m4reko.bc2019-tmores-angels, howard36.Battlecode2019-eco6, programjames.BC19Bot-seeding, Tom-CCS.BC19, ovkulkarni.battlecode2019~06c610, abcdefguan.battlecode2019, 18dcb01.Battlecode19-prea~fb5c48, CS554-software-engineerin~a575dc, sunanth123.battlecode19-prorush, ipercyNC.group6-battlecode, moreda-a.BC2019-t15, cvxluo.battlecode19, nthistle.battlecode-2019, programjames.BC19Bot-root, twitu.bc19-tsp, vicennial.BattleCode19, CometsTech.battlecode2019, sunanth123.battlecode19-mainbot, Nydroam.BatteredCod, evanyeyeye.battlecode2019~af562c, JasonLarson44.2019-Battle~1c7639, spachava753.bc19, bayoumi17m.BattleCode-2019, jamesrayman.HCN-bot, UpperArlingtonHighSchool.~5e7875, rooneyshuman.Battlecode, TestSubjector.BattleCode2~e6de74, haydenshively.Battle-Code~e37b3e, haydenshively.Battle-Code~e1c2fb, TestSubjector.BattleCode2~fb22c7, dndoja.battlecode19, jackliu612.Battlecode19, CometsTech.battlecode2019~187e8c, roy-love.onshoreBattleCode2019, SethKitchen.examplefuncsplayer, 18dcb01.Battlecode19-robot2, liwanlin41.examplefuncsplayer, dgh2.bc19-t1, jyurkanin.corn_bc19, VictorButoi.BattleCode201~c4576b, asunathanr.asu_bc, howard36.Battlecode2019-sprint, nhard.examplefuncsplayer, OmarTahoun.battle-code, waylon531.scala_starter, vishwasns99.BC_2019, bovard.battlecode-2019-un~8822c3, DivyanshuSaxena.Battlecode, VoidMercy.battlecode-2019-bot, bc19-starter, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, ryanhzhao.Battlecode-2019, djkeyes.bc19, yunaganyh.bc19, jshin313.battlecodebot, TheRobotCarlson.battlehac~323871, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1599 ± 224 | 91 of 212 | 38 | 33-5 | 75.2% | 30.9% (vs 21) |
| v1 | accepted | 1448 ± 137 | 139 of 212 | 154 | 128-26 | 65.3% | 23.4% (vs 30) |
| v2 | accepted | 1429 ± 139 | 144 of 212 | 62 | 30-32 | 64.1% | 23.3% (vs 32) |
| v3 | accepted | 1596 ± 98 | 92 of 212 | 191 | 140-51 | 75.0% | 30.6% (vs 21) |
| v4 | accepted | 1346 ± 106 | 154 of 212 | 220 | 83-137 | 58.5% | 19.1% (vs 36) |
| v5 | accepted | 1485 ± 73 | 131 of 212 | 439 | 202-237 | 67.8% | 24.4% (vs 27) |
| v6 | accepted | 1507 ± 67 | 124 of 212 | 322 | 130-192 | 69.2% | 26.6% (vs 27) |
| v7 | accepted | 1638 ± 45 | 76 of 212 | 1804 | 927-877 | 77.6% | 33.9% (vs 19) |
| v8 | accepted | 1696 ± 63 | 45 of 212 | 356 | 160-196 | 81.0% | 33.1% (vs 12) |
| v9 | accepted | 1775 ± 111 | 19 of 212 | 48 | 21-27 | 85.2% | 35.0% (vs 7) |
| v10 | accepted | 1765 ± 125 | 22 of 212 | 36 | 17-19 | 84.7% | 33.8% (vs 7) |
| v11 | accepted | 1762 ± 94 | 23 of 212 | 69 | 30-39 | 84.5% | 33.4% (vs 7) |
| v12 | accepted | 1893 ± 108 | 8 of 212 | 54 | 36-18 | 90.3% | 31.4% (vs 2) |
| block | candidate | 1707 ± 160 | 39 of 212 | 20 | 12-8 | 81.6% | 34.4% (vs 12) |
| camp | candidate | 1707 ± 160 | 40 of 212 | 20 | 12-8 | 81.6% | 34.4% (vs 12) |
| h100 | candidate | 1628 ± 66 | 82 of 212 | 200 | 97-103 | 76.9% | 33.5% (vs 20) |
| h101 | candidate | 1603 ± 117 | 87 of 212 | 40 | 18-22 | 75.4% | 31.3% (vs 21) |
| h103 | candidate | 1655 ± 89 | 70 of 212 | 76 | 33-43 | 78.6% | 33.0% (vs 16) |
| h104 | candidate | 1667 ± 99 | 60 of 212 | 58 | 28-30 | 79.3% | 32.2% (vs 14) |
| h107 | candidate | 1549 ± 119 | 107 of 212 | 40 | 15-25 | 72.0% | 28.3% (vs 24) |
| h110 | candidate | 1585 ± 117 | 96 of 212 | 40 | 17-23 | 74.3% | 29.3% (vs 21) |
| h111 | candidate | 1667 ± 99 | 61 of 212 | 58 | 28-30 | 79.3% | 32.2% (vs 14) |
| h112 | candidate | 1667 ± 99 | 62 of 212 | 58 | 28-30 | 79.3% | 32.2% (vs 14) |
| h113 | candidate | 1585 ± 117 | 97 of 212 | 40 | 17-23 | 74.3% | 29.3% (vs 21) |
| h114 | candidate | 1567 ± 118 | 100 of 212 | 40 | 16-24 | 73.2% | 28.4% (vs 22) |
| h115 | candidate | 1655 ± 116 | 67 of 212 | 40 | 21-19 | 78.6% | 33.1% (vs 16) |
| h116 | candidate | 1567 ± 118 | 101 of 212 | 40 | 16-24 | 73.2% | 28.4% (vs 22) |
| h118 | candidate | 1638 ± 116 | 77 of 212 | 40 | 20-20 | 77.5% | 33.8% (vs 19) |
| h11c | candidate | 1539 ± 179 | 112 of 212 | 25 | 15-10 | 71.3% | 27.2% (vs 24) |
| h121 | candidate | 1616 ± 100 | 84 of 212 | 58 | 24-34 | 76.2% | 32.9% (vs 21) |
| h123 | candidate | 1603 ± 101 | 86 of 212 | 58 | 23-35 | 75.4% | 31.4% (vs 21) |
| h124 | candidate | 1603 ± 117 | 88 of 212 | 40 | 18-22 | 75.4% | 31.3% (vs 21) |
| h125 | candidate | 1603 ± 117 | 89 of 212 | 40 | 18-22 | 75.4% | 31.3% (vs 21) |
| h126 | candidate | 1673 ± 86 | 56 of 212 | 98 | 49-49 | 79.6% | 32.9% (vs 14) |
| h127 | candidate | 1662 ± 86 | 64 of 212 | 98 | 47-51 | 79.0% | 32.9% (vs 15) |
| h128 | candidate | 1729 ± 105 | 33 of 212 | 54 | 23-31 | 82.8% | 36.0% (vs 11) |
| h129 | candidate | 1470 ± 128 | 134 of 212 | 40 | 11-29 | 66.8% | 24.7% (vs 29) |
| h130 | candidate | 1680 ± 99 | 54 of 212 | 58 | 29-29 | 80.1% | 33.8% (vs 14) |
| h131 | candidate | 1655 ± 116 | 68 of 212 | 40 | 21-19 | 78.6% | 33.1% (vs 16) |
| h132 | candidate | 1690 ± 117 | 51 of 212 | 40 | 23-17 | 80.6% | 32.4% (vs 12) |
| h133 | candidate | 1672 ± 117 | 57 of 212 | 40 | 22-18 | 79.6% | 32.8% (vs 14) |
| h134 | candidate | 1531 ± 121 | 116 of 212 | 40 | 14-26 | 70.8% | 27.3% (vs 25) |
| h135 | candidate | 1642 ± 100 | 75 of 212 | 58 | 26-32 | 77.8% | 34.3% (vs 19) |
| h136 | candidate | 1645 ± 89 | 73 of 212 | 76 | 32-44 | 78.0% | 33.8% (vs 18) |
| h137 | candidate | 1603 ± 117 | 90 of 212 | 40 | 18-22 | 75.4% | 31.3% (vs 21) |
| h138 | candidate | 1655 ± 116 | 69 of 212 | 40 | 21-19 | 78.6% | 33.1% (vs 16) |
| h139 | candidate | 1695 ± 89 | 46 of 212 | 76 | 37-39 | 80.9% | 32.9% (vs 12) |
| h140 | candidate | 1693 ± 100 | 47 of 212 | 58 | 30-28 | 80.8% | 32.7% (vs 12) |
| h141 | candidate | 1706 ± 100 | 41 of 212 | 58 | 31-27 | 81.5% | 34.3% (vs 12) |
| h142 | candidate | 1672 ± 117 | 58 of 212 | 40 | 22-18 | 79.6% | 32.8% (vs 14) |
| h143 | candidate | 1708 ± 118 | 38 of 212 | 40 | 24-16 | 81.6% | 34.5% (vs 12) |
| h144 | candidate | 1549 ± 119 | 108 of 212 | 40 | 15-25 | 72.0% | 28.3% (vs 24) |
| h145 | candidate | 1747 ± 104 | 29 of 212 | 58 | 31-27 | 83.7% | 36.8% (vs 10) |
| h146 | candidate | 1709 ± 104 | 36 of 212 | 58 | 28-30 | 81.7% | 34.7% (vs 12) |
| h147 | candidate | 1785 ± 105 | 18 of 212 | 58 | 34-24 | 85.6% | 36.2% (vs 7) |
| h148 | candidate | 1766 ± 78 | 20 of 212 | 112 | 58-54 | 84.7% | 33.9% (vs 7) |
| h149 | candidate | 1709 ± 104 | 37 of 212 | 58 | 28-30 | 81.7% | 34.7% (vs 12) |
| h150 | candidate | 1759 ± 104 | 24 of 212 | 58 | 32-26 | 84.4% | 33.1% (vs 7) |
| h151 | candidate | 1660 ± 125 | 66 of 212 | 40 | 18-22 | 78.9% | 33.7% (vs 16) |
| h157 | candidate | 1699 ± 127 | 42 of 212 | 36 | 14-22 | 81.2% | 33.5% (vs 12) |
| h159 | candidate | 1755 ± 92 | 26 of 212 | 72 | 33-39 | 84.1% | 34.7% (vs 8) |
| h161 | candidate | 1699 ± 127 | 43 of 212 | 36 | 14-22 | 81.2% | 33.5% (vs 12) |
| h162 | candidate | 1677 ± 129 | 55 of 212 | 36 | 13-23 | 79.9% | 33.3% (vs 14) |
| h163 | candidate | 1766 ± 78 | 21 of 212 | 108 | 51-57 | 84.7% | 33.9% (vs 7) |
| h167 | candidate | 1809 ± 92 | 13 of 212 | 72 | 38-34 | 86.8% | 34.5% (vs 5) |
| h16r | candidate | 1277 ± 152 | 162 of 212 | 40 | 16-24 | 54.0% | 19.3% (vs 43) |
| h170 | candidate | 1722 ± 126 | 35 of 212 | 36 | 15-21 | 82.4% | 36.2% (vs 12) |
| h175 | candidate | 1798 ± 92 | 15 of 212 | 72 | 37-35 | 86.3% | 35.8% (vs 6) |
| h178 | candidate | 1787 ± 92 | 17 of 212 | 72 | 36-36 | 85.8% | 36.5% (vs 7) |
| h18 | candidate | 1271 ± 195 | 165 of 212 | 25 | 6-19 | 53.6% | 19.5% (vs 44) |
| h184 | candidate | 1846 ± 79 | 11 of 212 | 108 | 62-46 | 88.4% | 36.3% (vs 4) |
| h185 | candidate | 1935 ± 98 | 4 of 212 | 72 | 49-23 | 91.8% | 36.8% (vs 2) |
| h190 | candidate | 1743 ± 125 | 30 of 212 | 36 | 16-20 | 83.5% | 36.4% (vs 10) |
| h192 | candidate | 1699 ± 127 | 44 of 212 | 36 | 14-22 | 81.2% | 33.5% (vs 12) |
| h193 | candidate | 1743 ± 125 | 31 of 212 | 36 | 16-20 | 83.5% | 36.4% (vs 10) |
| h195 | candidate | 1939 ± 83 | 3 of 212 | 108 | 74-34 | 92.0% | 37.4% (vs 2) |
| h198 | candidate | 1922 ± 132 | 5 of 212 | 36 | 24-12 | 91.3% | 35.1% (vs 2) |
| h2 | candidate | 1546 ± 150 | 110 of 212 | 54 | 25-29 | 71.8% | 27.9% (vs 24) |
| h201 | candidate | 1922 ± 132 | 6 of 212 | 36 | 24-12 | 91.3% | 35.1% (vs 2) |
| h203 | candidate | 1898 ± 130 | 7 of 212 | 36 | 23-13 | 90.5% | 32.0% (vs 2) |
| h24 | candidate | 1454 ± 154 | 138 of 212 | 40 | 26-14 | 65.7% | 24.0% (vs 30) |
| h24v5 | candidate | 1537 ± 130 | 113 of 212 | 40 | 23-17 | 71.2% | 27.1% (vs 24) |
| h3 | candidate | 1527 ± 214 | 119 of 212 | 19 | 9-10 | 70.6% | 27.8% (vs 26) |
| h31 | candidate | 1436 ± 152 | 143 of 212 | 40 | 25-15 | 64.5% | 23.9% (vs 32) |
| h38 | candidate | 1468 ± 306 | 136 of 212 | 6 | 4-2 | 66.7% | 24.5% (vs 29) |
| h40 | candidate | 1536 ± 290 | 114 of 212 | 8 | 6-2 | 71.1% | 26.9% (vs 24) |
| h41 | candidate | 1399 ± 254 | 148 of 212 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h42 | candidate | 1399 ± 254 | 149 of 212 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h43 | candidate | 1486 ± 247 | 125 of 212 | 8 | 4-4 | 67.8% | 24.4% (vs 27) |
| h44 | candidate | 1671 ± 280 | 59 of 212 | 8 | 6-2 | 79.5% | 32.6% (vs 14) |
| h46 | candidate | 1399 ± 254 | 150 of 212 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h47 | candidate | 1486 ± 247 | 126 of 212 | 8 | 4-4 | 67.8% | 24.4% (vs 27) |
| h48 | candidate | 1486 ± 247 | 127 of 212 | 8 | 4-4 | 67.8% | 24.4% (vs 27) |
| h49 | candidate | 1486 ± 247 | 128 of 212 | 8 | 4-4 | 67.8% | 24.4% (vs 27) |
| h52 | candidate | 1399 ± 254 | 151 of 212 | 8 | 3-5 | 62.0% | 22.9% (vs 35) |
| h53 | candidate | 1572 ± 254 | 98 of 212 | 8 | 5-3 | 73.5% | 27.9% (vs 21) |
| h54 | candidate | 1558 ± 123 | 103 of 212 | 48 | 29-19 | 72.6% | 27.4% (vs 22) |
| h55 | candidate | 1529 ± 121 | 117 of 212 | 56 | 32-24 | 70.7% | 27.1% (vs 25) |
| h58 | candidate | 1442 ± 271 | 142 of 212 | 8 | 3-5 | 64.9% | 24.5% (vs 32) |
| h59 | candidate | 1486 ± 247 | 129 of 212 | 8 | 4-4 | 67.8% | 24.4% (vs 27) |
| h6 | candidate | 1469 ± 115 | 135 of 212 | 158 | 94-64 | 66.7% | 24.6% (vs 29) |
| h60 | candidate | 1486 ± 247 | 130 of 212 | 8 | 4-4 | 67.8% | 24.4% (vs 27) |
| h61 | candidate | 1593 ± 253 | 93 of 212 | 8 | 5-3 | 74.8% | 30.2% (vs 21) |
| h63 | candidate | 1559 ± 127 | 102 of 212 | 40 | 23-17 | 72.6% | 27.5% (vs 22) |
| h64 | candidate | 1542 ± 126 | 111 of 212 | 40 | 22-18 | 71.5% | 27.5% (vs 24) |
| h68 | candidate | 1692 ± 279 | 48 of 212 | 8 | 6-2 | 80.7% | 32.6% (vs 12) |
| h7 | candidate | 1519 ± 1445 | 121 of 212 | 8 | 8-0 | 70.0% | 27.0% (vs 26) |
| h72 | candidate | 1692 ± 279 | 49 of 212 | 8 | 6-2 | 80.7% | 32.6% (vs 12) |
| h76 | candidate | 1634 ± 184 | 78 of 212 | 32 | 18-14 | 77.3% | 33.4% (vs 19) |
| h77 | candidate | 1517 ± 186 | 122 of 212 | 16 | 8-8 | 69.9% | 26.7% (vs 26) |
| h78 | candidate | 1692 ± 279 | 50 of 212 | 8 | 6-2 | 80.7% | 32.6% (vs 12) |
| h82 | candidate | 1591 ± 95 | 94 of 212 | 134 | 70-64 | 74.7% | 30.0% (vs 21) |
| h83 | candidate | 1631 ± 298 | 79 of 212 | 8 | 4-4 | 77.1% | 33.0% (vs 19) |
| h84 | candidate | 1631 ± 298 | 80 of 212 | 8 | 4-4 | 77.1% | 33.0% (vs 19) |
| h88 | candidate | 1556 ± 143 | 105 of 212 | 40 | 18-22 | 72.4% | 28.1% (vs 23) |
| h89 | candidate | 763 ± 1086 | 189 of 212 | 8 | 0-8 | 26.8% | 8.0% (vs 67) |
| h8v5 | candidate | 1589 ± 125 | 95 of 212 | 48 | 31-17 | 74.5% | 29.8% (vs 21) |
| h90 | candidate | 763 ± 1086 | 190 of 212 | 8 | 0-8 | 26.8% | 8.0% (vs 67) |
| h91 | candidate | 1547 ± 194 | 109 of 212 | 16 | 7-9 | 71.8% | 28.1% (vs 24) |
| h96 | candidate | 1616 ± 100 | 85 of 212 | 58 | 24-34 | 76.2% | 32.9% (vs 21) |
| rush | sparring | 1271 ± 195 | 164 of 212 | 25 | 6-19 | 53.6% | 19.5% (vs 44) |
| rush4 | sparring | 1527 ± 132 | 120 of 212 | 50 | 30-20 | 70.5% | 27.8% (vs 26) |
| turtle | candidate | 1399 ± 193 | 152 of 212 | 20 | 4-16 | 62.0% | 22.9% (vs 35) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 125 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 350 malformed)
- replica: 5731 games (11 archive games skipped, 707 matches from archives, 1193 matches from scores), fetched 2026-10-27T04:12:51+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34), v10 = h175 (72 games, 37-35), v11 = h178 (72 games, 36-36), v12 = h185 (72 games, 49-23). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the win rate and W-L against the bot of the latest accepted build with games of its own that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 2056 | 112 | 81 | 67-14 | 33% (v11 1-2) |
| 2 | m-schier.battlecode-2019-wololo | field | 2002 | 56 | 393 | 307-86 | 50% (v12 3-3) |
| 3 | **cand:h195** | candidate | 1939 | 83 | 108 | 74-34 |  |
| 4 | **cand:h185** | candidate | 1935 | 98 | 72 | 49-23 |  |
| 5 | **cand:h198** | candidate | 1922 | 132 | 36 | 24-12 |  |
| 6 | **cand:h201** | candidate | 1922 | 132 | 36 | 24-12 |  |
| 7 | **cand:h203** | candidate | 1898 | 130 | 36 | 23-13 |  |
| 8 | **us:v12** | accepted | 1893 | 108 | 54 | 36-18 |  |
| 9 | uvafan.bc2019 | field | 1886 | 52 | 390 | 256-134 | 67% (v12 4-2) |
| 10 | yujinwunz.battlecode_2019 | field | 1853 | 98 | 90 | 64-26 | 50% (v11 3-3) |
| 11 | **cand:h184** | candidate | 1846 | 79 | 108 | 62-46 |  |
| 12 | rafekruse.Battlecode-2019-bc19 | field | 1841 | 101 | 75 | 50-25 | 0% (v8 0-3) |
| 13 | **cand:h167** | candidate | 1809 | 92 | 72 | 38-34 |  |
| 14 | VoidMercy.battlecode-2019~e7dc06 | field | 1806 | 106 | 69 | 47-22 | 33% (v11 1-2) |
| 15 | **cand:h175** | candidate | 1798 | 92 | 72 | 37-35 |  |
| 16 | StoneT2000.BC19-botfinalsafe | field | 1794 | 49 | 408 | 235-173 | 44% (v12 4-5) |
| 17 | **cand:h178** | candidate | 1787 | 92 | 72 | 36-36 |  |
| 18 | **cand:h147** | candidate | 1785 | 105 | 58 | 34-24 |  |
| 19 | **us:v9** | accepted | 1775 | 111 | 48 | 21-27 |  |
| 20 | **cand:h148** | candidate | 1766 | 78 | 112 | 58-54 |  |
| 21 | **cand:h163** | candidate | 1766 | 78 | 108 | 51-57 |  |
| 22 | **us:v10** | accepted | 1765 | 125 | 36 | 17-19 |  |
| 23 | **us:v11** | accepted | 1762 | 94 | 69 | 30-39 |  |
| 24 | **cand:h150** | candidate | 1759 | 104 | 58 | 32-26 |  |
| 25 | j-mao.battlecode-2019 | field | 1758 | 96 | 78 | 48-30 | 100% (v8 3-0) |
| 26 | **cand:h159** | candidate | 1755 | 92 | 72 | 33-39 |  |
| 27 | arya-k.bc19 | field | 1752 | 103 | 72 | 50-22 | 0% (v11 0-3) |
| 28 | StoneT2000.BC19-bot1v43 | field | 1751 | 49 | 405 | 213-192 | 78% (v12 7-2) |
| 29 | **cand:h145** | candidate | 1747 | 104 | 58 | 31-27 |  |
| 30 | **cand:h190** | candidate | 1743 | 125 | 36 | 16-20 |  |
| 31 | **cand:h193** | candidate | 1743 | 125 | 36 | 16-20 |  |
| 32 | virenvshah.Battlecode2019 | field | 1730 | 97 | 84 | 59-25 |  |
| 33 | **cand:h128** | candidate | 1729 | 105 | 54 | 23-31 |  |
| 34 | moreda-a.BC2019-a31 | field | 1726 | 98 | 78 | 48-30 | 100% (v12 3-0) |
| 35 | **cand:h170** | candidate | 1722 | 126 | 36 | 15-21 |  |
| 36 | **cand:h146** | candidate | 1709 | 104 | 58 | 28-30 |  |
| 37 | **cand:h149** | candidate | 1709 | 104 | 58 | 28-30 |  |
| 38 | **cand:h143** | candidate | 1708 | 118 | 40 | 24-16 |  |
| 39 | **cand:block** | candidate | 1707 | 160 | 20 | 12-8 |  |
| 40 | **cand:camp** | candidate | 1707 | 160 | 20 | 12-8 |  |
| 41 | **cand:h141** | candidate | 1706 | 100 | 58 | 31-27 |  |
| 42 | **cand:h157** | candidate | 1699 | 127 | 36 | 14-22 |  |
| 43 | **cand:h161** | candidate | 1699 | 127 | 36 | 14-22 |  |
| 44 | **cand:h192** | candidate | 1699 | 127 | 36 | 14-22 |  |
| 45 | **us:v8** | accepted | 1696 | 63 | 356 | 160-196 |  |
| 46 | **cand:h139** | candidate | 1695 | 89 | 76 | 37-39 |  |
| 47 | **cand:h140** | candidate | 1693 | 100 | 58 | 30-28 |  |
| 48 | **cand:h68** | candidate | 1692 | 279 | 8 | 6-2 |  |
| 49 | **cand:h72** | candidate | 1692 | 279 | 8 | 6-2 |  |
| 50 | **cand:h78** | candidate | 1692 | 279 | 8 | 6-2 |  |
| 51 | **cand:h132** | candidate | 1690 | 117 | 40 | 23-17 |  |
| 52 | rafekruse.Battlecode-2019~2680d4 | field | 1689 | 110 | 69 | 49-20 |  |
| 53 | IanCoolidge0.battlecode20~f649f3 | field | 1683 | 93 | 99 | 59-40 | 33% (v12 1-2) |
| 54 | **cand:h130** | candidate | 1680 | 99 | 58 | 29-29 |  |
| 55 | **cand:h162** | candidate | 1677 | 129 | 36 | 13-23 |  |
| 56 | **cand:h126** | candidate | 1673 | 86 | 98 | 49-49 |  |
| 57 | **cand:h133** | candidate | 1672 | 117 | 40 | 22-18 |  |
| 58 | **cand:h142** | candidate | 1672 | 117 | 40 | 22-18 |  |
| 59 | **cand:h44** | candidate | 1671 | 280 | 8 | 6-2 |  |
| 60 | **cand:h104** | candidate | 1667 | 99 | 58 | 28-30 |  |
| 61 | **cand:h111** | candidate | 1667 | 99 | 58 | 28-30 |  |
| 62 | **cand:h112** | candidate | 1667 | 99 | 58 | 28-30 |  |
| 63 | IanCoolidge0.battlecode20~69ce88 | field | 1663 | 49 | 393 | 158-235 | 56% (v12 5-4) |
| 64 | **cand:h127** | candidate | 1662 | 86 | 98 | 47-51 |  |
| 65 | vineetparikh.BigRedBattle~fe3459 | field | 1661 | 97 | 84 | 54-30 | 100% (v12 3-0) |
| 66 | **cand:h151** | candidate | 1660 | 125 | 40 | 18-22 |  |
| 67 | **cand:h115** | candidate | 1655 | 116 | 40 | 21-19 |  |
| 68 | **cand:h131** | candidate | 1655 | 116 | 40 | 21-19 |  |
| 69 | **cand:h138** | candidate | 1655 | 116 | 40 | 21-19 |  |
| 70 | **cand:h103** | candidate | 1655 | 89 | 76 | 33-43 |  |
| 71 | bqi343.cp-notebook | field | 1653 | 108 | 69 | 46-23 |  |
| 72 | awesomelemonade.Battlecode2019 | field | 1646 | 50 | 381 | 150-231 | 100% (v12 6-0) |
| 73 | **cand:h136** | candidate | 1645 | 89 | 76 | 32-44 |  |
| 74 | unrevre.battlecode | field | 1644 | 111 | 63 | 42-21 |  |
| 75 | **cand:h135** | candidate | 1642 | 100 | 58 | 26-32 |  |
| 76 | **us:v7** | accepted | 1638 | 45 | 1804 | 927-877 |  |
| 77 | **cand:h118** | candidate | 1638 | 116 | 40 | 20-20 |  |
| 78 | **cand:h76** | candidate | 1634 | 184 | 32 | 18-14 |  |
| 79 | **cand:h83** | candidate | 1631 | 298 | 8 | 4-4 |  |
| 80 | **cand:h84** | candidate | 1631 | 298 | 8 | 4-4 |  |
| 81 | ldcWV.Battlecode-2019 | field | 1628 | 104 | 72 | 47-25 |  |
| 82 | **cand:h100** | candidate | 1628 | 66 | 200 | 97-103 |  |
| 83 | cemondr.BC19pdxgroup4 | field | 1624 | 99 | 75 | 44-31 |  |
| 84 | **cand:h121** | candidate | 1616 | 100 | 58 | 24-34 |  |
| 85 | **cand:h96** | candidate | 1616 | 100 | 58 | 24-34 |  |
| 86 | **cand:h123** | candidate | 1603 | 101 | 58 | 23-35 |  |
| 87 | **cand:h101** | candidate | 1603 | 117 | 40 | 18-22 |  |
| 88 | **cand:h124** | candidate | 1603 | 117 | 40 | 18-22 |  |
| 89 | **cand:h125** | candidate | 1603 | 117 | 40 | 18-22 |  |
| 90 | **cand:h137** | candidate | 1603 | 117 | 40 | 18-22 |  |
| 91 | **us:v0** | accepted | 1599 | 224 | 38 | 33-5 |  |
| 92 | **us:v3** | accepted | 1596 | 98 | 191 | 140-51 |  |
| 93 | **cand:h61** | candidate | 1593 | 253 | 8 | 5-3 |  |
| 94 | **cand:h82** | candidate | 1591 | 95 | 134 | 70-64 |  |
| 95 | **cand:h8v5** | candidate | 1589 | 125 | 48 | 31-17 |  |
| 96 | **cand:h110** | candidate | 1585 | 117 | 40 | 17-23 |  |
| 97 | **cand:h113** | candidate | 1585 | 117 | 40 | 17-23 |  |
| 98 | **cand:h53** | candidate | 1572 | 254 | 8 | 5-3 |  |
| 99 | UpperArlingtonHighSchool.~682aa9 | field | 1570 | 111 | 72 | 44-28 |  |
| 100 | **cand:h114** | candidate | 1567 | 118 | 40 | 16-24 |  |
| 101 | **cand:h116** | candidate | 1567 | 118 | 40 | 16-24 |  |
| 102 | **cand:h63** | candidate | 1559 | 127 | 40 | 23-17 |  |
| 103 | **cand:h54** | candidate | 1558 | 123 | 48 | 29-19 |  |
| 104 | IvanGeffner.BC19-bot6b | field | 1557 | 381 | 9 | 7-2 |  |
| 105 | **cand:h88** | candidate | 1556 | 143 | 40 | 18-22 |  |
| 106 | Nischay-Pro.BattleCode2019 | field | 1554 | 107 | 72 | 44-28 |  |
| 107 | **cand:h107** | candidate | 1549 | 119 | 40 | 15-25 |  |
| 108 | **cand:h144** | candidate | 1549 | 119 | 40 | 15-25 |  |
| 109 | **cand:h91** | candidate | 1547 | 194 | 16 | 7-9 |  |
| 110 | **cand:h2** | candidate | 1546 | 150 | 54 | 25-29 |  |
| 111 | **cand:h64** | candidate | 1542 | 126 | 40 | 22-18 |  |
| 112 | **cand:h11c** | candidate | 1539 | 179 | 25 | 15-10 |  |
| 113 | **cand:h24v5** | candidate | 1537 | 130 | 40 | 23-17 |  |
| 114 | **cand:h40** | candidate | 1536 | 290 | 8 | 6-2 |  |
| 115 | IvanGeffner.BC19-eigthbot | field | 1531 | 309 | 9 | 6-3 |  |
| 116 | **cand:h134** | candidate | 1531 | 121 | 40 | 14-26 |  |
| 117 | **cand:h55** | candidate | 1529 | 121 | 56 | 32-24 |  |
| 118 | ovkulkarni.battlecode2019~0aa607 | field | 1528 | 101 | 75 | 49-26 |  |
| 119 | **cand:h3** | candidate | 1527 | 214 | 19 | 9-10 |  |
| 120 | **spar:rush4** | sparring | 1527 | 132 | 50 | 30-20 |  |
| 121 | **cand:h7** | candidate | 1519 | 1445 | 8 | 8-0 |  |
| 122 | **cand:h77** | candidate | 1517 | 186 | 16 | 8-8 |  |
| 123 | NielsKornerup.Battlecode-2019 | field | 1516 | 86 | 108 | 59-49 |  |
| 124 | **us:v6** | accepted | 1507 | 67 | 322 | 130-192 |  |
| 125 | **cand:h43** | candidate | 1486 | 247 | 8 | 4-4 |  |
| 126 | **cand:h47** | candidate | 1486 | 247 | 8 | 4-4 |  |
| 127 | **cand:h48** | candidate | 1486 | 247 | 8 | 4-4 |  |
| 128 | **cand:h49** | candidate | 1486 | 247 | 8 | 4-4 |  |
| 129 | **cand:h59** | candidate | 1486 | 247 | 8 | 4-4 |  |
| 130 | **cand:h60** | candidate | 1486 | 247 | 8 | 4-4 |  |
| 131 | **us:v5** | accepted | 1485 | 73 | 439 | 202-237 |  |
| 132 | dmunozc.bc19-g8-bots | field | 1485 | 100 | 78 | 46-32 |  |
| 133 | lschaberg.bc19 | field | 1474 | 104 | 72 | 41-31 |  |
| 134 | **cand:h129** | candidate | 1470 | 128 | 40 | 11-29 |  |
| 135 | **cand:h6** | candidate | 1469 | 115 | 158 | 94-64 |  |
| 136 | **cand:h38** | candidate | 1468 | 306 | 6 | 4-2 |  |
| 137 | dmunozc.bc19-g8-davjasdiv | field | 1463 | 94 | 93 | 49-44 |  |
| 138 | **cand:h24** | candidate | 1454 | 154 | 40 | 26-14 |  |
| 139 | **us:v1** | accepted | 1448 | 137 | 154 | 128-26 |  |
| 140 | m4reko.bc2019-tmores-angels | field | 1448 | 103 | 72 | 42-30 |  |
| 141 | howard36.Battlecode2019-eco6 | field | 1445 | 101 | 81 | 44-37 |  |
| 142 | **cand:h58** | candidate | 1442 | 271 | 8 | 3-5 |  |
| 143 | **cand:h31** | candidate | 1436 | 152 | 40 | 25-15 |  |
| 144 | **us:v2** | accepted | 1429 | 139 | 62 | 30-32 |  |
| 145 | programjames.BC19Bot-seeding | field | 1422 | 105 | 69 | 37-32 |  |
| 146 | Tom-CCS.BC19 | field | 1419 | 102 | 78 | 43-35 |  |
| 147 | ovkulkarni.battlecode2019~06c610 | field | 1408 | 109 | 66 | 38-28 |  |
| 148 | **cand:h41** | candidate | 1399 | 254 | 8 | 3-5 |  |
| 149 | **cand:h42** | candidate | 1399 | 254 | 8 | 3-5 |  |
| 150 | **cand:h46** | candidate | 1399 | 254 | 8 | 3-5 |  |
| 151 | **cand:h52** | candidate | 1399 | 254 | 8 | 3-5 |  |
| 152 | **cand:turtle** | candidate | 1399 | 193 | 20 | 4-16 |  |
| 153 | abcdefguan.battlecode2019 | field | 1395 | 113 | 72 | 39-33 |  |
| 154 | **us:v4** | accepted | 1346 | 106 | 220 | 83-137 |  |
| 155 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1342 | 94 | 108 | 51-57 |  |
| 156 | CS554-software-engineerin~a575dc | field | 1322 | 74 | 296 | 172-124 | 100% (v7 3-0) |
| 157 | sunanth123.battlecode19-prorush | field | 1306 | 108 | 72 | 39-33 |  |
| 158 | ipercyNC.group6-battlecode | field | 1305 | 106 | 75 | 39-36 |  |
| 159 | moreda-a.BC2019-t15 | field | 1303 | 110 | 72 | 36-36 |  |
| 160 | cvxluo.battlecode19 | field | 1285 | 105 | 78 | 41-37 |  |
| 161 | nthistle.battlecode-2019 | field | 1281 | 105 | 84 | 45-39 | 100% (v5 3-0) |
| 162 | **cand:h16r** | candidate | 1277 | 152 | 40 | 16-24 |  |
| 163 | programjames.BC19Bot-root | field | 1274 | 102 | 78 | 41-37 |  |
| 164 | **spar:rush** | sparring | 1271 | 195 | 25 | 6-19 |  |
| 165 | **cand:h18** | candidate | 1271 | 195 | 25 | 6-19 |  |
| 166 | twitu.bc19-tsp | field | 1267 | 107 | 84 | 45-39 |  |
| 167 | vicennial.BattleCode19 | field | 1240 | 104 | 90 | 44-46 |  |
| 168 | CometsTech.battlecode2019 | field | 1234 | 79 | 264 | 123-141 | 100% (v7 3-0) |
| 169 | sunanth123.battlecode19-mainbot | field | 1227 | 109 | 78 | 42-36 |  |
| 170 | Nydroam.BatteredCod | field | 1222 | 434 | 6 | 3-3 |  |
| 171 | evanyeyeye.battlecode2019~af562c | field | 1218 | 106 | 75 | 39-36 |  |
| 172 | JasonLarson44.2019-Battle~1c7639 | field | 1163 | 99 | 90 | 42-48 | 100% (v3 3-0) |
| 173 | spachava753.bc19 | field | 1162 | 111 | 75 | 39-36 |  |
| 174 | bayoumi17m.BattleCode-2019 | field | 1158 | 109 | 75 | 36-39 |  |
| 175 | jamesrayman.HCN-bot | field | 1135 | 110 | 81 | 33-48 | 100% (v5 3-0) |
| 176 | UpperArlingtonHighSchool.~5e7875 | field | 1022 | 122 | 75 | 36-39 |  |
| 177 | rooneyshuman.Battlecode | field | 993 | 126 | 72 | 37-35 |  |
| 178 | TestSubjector.BattleCode2~e6de74 | field | 971 | 118 | 93 | 44-49 |  |
| 179 | haydenshively.Battle-Code~e37b3e | field | 963 | 114 | 81 | 37-44 |  |
| 180 | haydenshively.Battle-Code~e1c2fb | field | 962 | 111 | 75 | 33-42 |  |
| 181 | TestSubjector.BattleCode2~fb22c7 | field | 951 | 126 | 93 | 42-51 |  |
| 182 | dndoja.battlecode19 | field | 947 | 115 | 72 | 34-38 |  |
| 183 | jackliu612.Battlecode19 | field | 899 | 150 | 63 | 27-36 |  |
| 184 | CometsTech.battlecode2019~187e8c | field | 880 | 118 | 78 | 34-44 |  |
| 185 | roy-love.onshoreBattleCode2019 | field | 857 | 117 | 78 | 33-45 |  |
| 186 | SethKitchen.examplefuncsplayer | field | 824 | 148 | 78 | 32-46 |  |
| 187 | 18dcb01.Battlecode19-robot2 | field | 813 | 127 | 81 | 34-47 |  |
| 188 | liwanlin41.examplefuncsplayer | field | 794 | 125 | 105 | 42-63 |  |
| 189 | **cand:h89** | candidate | 763 | 1086 | 8 | 0-8 |  |
| 190 | **cand:h90** | candidate | 763 | 1086 | 8 | 0-8 |  |
| 191 | dgh2.bc19-t1 | field | 754 | 139 | 78 | 31-47 |  |
| 192 | jyurkanin.corn_bc19 | field | 733 | 137 | 78 | 32-46 |  |
| 193 | VictorButoi.BattleCode201~c4576b | field | 693 | 129 | 72 | 28-44 |  |
| 194 | asunathanr.asu_bc | field | 686 | 119 | 87 | 33-54 |  |
| 195 | howard36.Battlecode2019-sprint | field | 612 | 136 | 69 | 25-44 |  |
| 196 | nhard.examplefuncsplayer | field | 609 | 131 | 81 | 32-49 |  |
| 197 | OmarTahoun.battle-code | field | 599 | 132 | 84 | 33-51 |  |
| 198 | waylon531.scala_starter | field | 539 | 154 | 75 | 27-48 |  |
| 199 | vishwasns99.BC_2019 | field | 524 | 145 | 72 | 27-45 |  |
| 200 | bovard.battlecode-2019-un~8822c3 | field | 467 | 158 | 66 | 23-43 |  |
| 201 | DivyanshuSaxena.Battlecode | field | 321 | 155 | 90 | 33-57 |  |
| 202 | VoidMercy.battlecode-2019-bot | field | 257 | 182 | 66 | 24-42 |  |
| 203 | bc19-starter | field | 254 | 155 | 379 | 79-300 | 100% (v3 12-0) |
| 204 | RyanSharafuddin.Battlecode_2019 | field | 209 | 166 | 96 | 31-65 |  |
| 205 | jbiewend.Battlecode2019 | field | 204 | 176 | 72 | 25-47 |  |
| 206 | ryanhzhao.Battlecode-2019 | field | 46 | 194 | 69 | 19-50 |  |
| 207 | djkeyes.bc19 | field | -98 | 186 | 72 | 17-55 |  |
| 208 | yunaganyh.bc19 | field | -139 | 196 | 72 | 18-54 |  |
| 209 | jshin313.battlecodebot | field | -278 | 195 | 72 | 15-57 |  |
| 210 | TheRobotCarlson.battlehac~323871 | field | -291 | 189 | 96 | 20-76 |  |
| 211 | jamesrayman.HCN-basic-bot | field | -348 | 203 | 69 | 11-58 |  |
| 212 | ArtemUstilov.bc19_CrazyTapok | field | -796 | 1084 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| mvpatel2000.Battlecode2019 | m-schier.battlecode-2019-wololo | 12 | 9-3 | 75% | replica |
| mvpatel2000.Battlecode2019 | uvafan.bc2019 | 9 | 8-1 | 89% | replica |
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 6 | 4-2 | 67% | replica |
| mvpatel2000.Battlecode2019 | rafekruse.Battlecode-2019-bc19 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v9 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v11 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 6 | 6-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | us:v8 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v7 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 6-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h195 | 18 | 10-8 | 56% | replica |
| m-schier.battlecode-2019-wololo | cand:h185 | 12 | 6-6 | 50% | replica |
| m-schier.battlecode-2019-wololo | cand:h198 | 6 | 3-3 | 50% | replica |
| m-schier.battlecode-2019-wololo | cand:h201 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h203 | 6 | 4-2 | 67% | replica |
| m-schier.battlecode-2019-wololo | us:v12 | 6 | 3-3 | 50% | replica |
| m-schier.battlecode-2019-wololo | uvafan.bc2019 | 15 | 9-6 | 60% | replica |
| m-schier.battlecode-2019-wololo | yujinwunz.battlecode_2019 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h184 | 18 | 13-5 | 72% | replica |
| m-schier.battlecode-2019-wololo | rafekruse.Battlecode-2019-bc19 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h167 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | VoidMercy.battlecode-2019~e7dc06 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h175 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h178 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v9 | 9 | 7-2 | 78% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v10 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v11 | 9 | 8-1 | 89% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h190 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h193 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h170 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h157 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h161 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h192 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v8 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h130 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h162 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h126 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h104 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h111 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h112 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h127 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h103 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h136 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h135 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v7 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h121 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h123 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
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
| cand:h203 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| cand:h203 | StoneT2000.BC19-botfinalsafe | 6 | 2-4 | 33% | replica |
| cand:h203 | StoneT2000.BC19-bot1v43 | 6 | 4-2 | 67% | replica |
| cand:h203 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h203 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| us:v12 | uvafan.bc2019 | 6 | 4-2 | 67% | replica |
| us:v12 | StoneT2000.BC19-botfinalsafe | 9 | 4-5 | 44% | replica |
| us:v12 | StoneT2000.BC19-bot1v43 | 9 | 7-2 | 78% | replica |
| us:v12 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| us:v12 | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| us:v12 | IanCoolidge0.battlecode20~69ce88 | 9 | 5-4 | 56% | replica |
| us:v12 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| us:v12 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
| uvafan.bc2019 | yujinwunz.battlecode_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h184 | 18 | 9-9 | 50% | replica |
| uvafan.bc2019 | cand:h167 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | VoidMercy.battlecode-2019~e7dc06 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h175 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h178 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v9 | 9 | 6-3 | 67% | replica |
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | us:v10 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v11 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h190 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h193 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h170 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h149 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h157 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h161 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h192 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v8 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h162 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| yujinwunz.battlecode_2019 | rafekruse.Battlecode-2019-bc19 | 6 | 1-5 | 17% | replica |
| yujinwunz.battlecode_2019 | VoidMercy.battlecode-2019~e7dc06 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | StoneT2000.BC19-botfinalsafe | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | us:v11 | 6 | 3-3 | 50% | replica |
| yujinwunz.battlecode_2019 | j-mao.battlecode-2019 | 6 | 4-2 | 67% | replica |
| yujinwunz.battlecode_2019 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | us:v8 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| yujinwunz.battlecode_2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h184 | StoneT2000.BC19-botfinalsafe | 18 | 13-5 | 72% | replica |
| cand:h184 | StoneT2000.BC19-bot1v43 | 18 | 7-11 | 39% | replica |
| cand:h184 | IanCoolidge0.battlecode20~69ce88 | 18 | 13-5 | 72% | replica |
| cand:h184 | awesomelemonade.Battlecode2019 | 18 | 15-3 | 83% | replica |
| rafekruse.Battlecode-2019-bc19 | VoidMercy.battlecode-2019~e7dc06 | 9 | 5-4 | 56% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-botfinalsafe | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 9 | 4-5 | 44% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 6 | 2-4 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
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
| VoidMercy.battlecode-2019~e7dc06 | us:v9 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v11 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | arya-k.bc19 | 3 | 0-3 | 0% | replica |
| VoidMercy.battlecode-2019~e7dc06 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h175 | StoneT2000.BC19-botfinalsafe | 12 | 7-5 | 58% | replica |
| cand:h175 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h175 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h175 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h178 | 12 | 7-5 | 58% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h147 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v9 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | us:v10 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v11 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h190 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | virenvshah.Battlecode2019 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h141 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h157 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h161 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h192 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v8 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h139 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h130 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h126 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h178 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h178 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h178 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
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
| us:v11 | arya-k.bc19 | 3 | 0-3 | 0% | replica |
| us:v11 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v11 | IanCoolidge0.battlecode20~f649f3 | 6 | 4-2 | 67% | replica |
| us:v11 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| us:v11 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h150 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h150 | us:v8 | 40 | 25-15 | 62% | local |
| cand:h150 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h150 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | virenvshah.Battlecode2019 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | us:v8 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h159 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h159 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h159 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| arya-k.bc19 | moreda-a.BC2019-a31 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | us:v8 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 6 | 3-3 | 50% | replica |
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
| StoneT2000.BC19-bot1v43 | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h190 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | virenvshah.Battlecode2019 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h157 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | cand:h161 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h192 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | vineetparikh.BigRedBattle~fe3459 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h121 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| cand:h190 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h190 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h193 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h193 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| virenvshah.Battlecode2019 | rafekruse.Battlecode-2019~2680d4 | 6 | 2-4 | 33% | replica |
| virenvshah.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
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
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| moreda-a.BC2019-a31 | us:v8 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h170 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h170 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
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
| cand:h141 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h141 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h157 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h157 | awesomelemonade.Battlecode2019 | 6 | 5-1 | 83% | replica |
| cand:h161 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h161 | awesomelemonade.Battlecode2019 | 6 | 3-3 | 50% | replica |
| cand:h192 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h192 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| us:v8 | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
| us:v8 | cand:h151 | 40 | 22-18 | 55% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h139 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| cand:h139 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h139 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h140 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| rafekruse.Battlecode-2019~2680d4 | IanCoolidge0.battlecode20~f649f3 | 3 | 0-3 | 0% | replica |
| rafekruse.Battlecode-2019~2680d4 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 6 | 2-4 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | us:v3 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | NielsKornerup.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 12 | 8-4 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| cand:h130 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h130 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h162 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h162 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h104 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h104 | awesomelemonade.Battlecode2019 | 3 | 0-3 | 0% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h111 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h112 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| IanCoolidge0.battlecode20~69ce88 | cand:h127 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | awesomelemonade.Battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h121 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h123 | 3 | 3-0 | 100% | replica |
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
| cand:h127 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| vineetparikh.BigRedBattle~fe3459 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| vineetparikh.BigRedBattle~fe3459 | ovkulkarni.battlecode2019~0aa607 | 6 | 4-2 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h103 | awesomelemonade.Battlecode2019 | 6 | 1-5 | 17% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| bqi343.cp-notebook | ldcWV.Battlecode-2019 | 3 | 0-3 | 0% | replica |
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| bqi343.cp-notebook | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h136 | 6 | 2-4 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h135 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v7 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| unrevre.battlecode | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
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
| ldcWV.Battlecode-2019 | cvxluo.battlecode19 | 6 | 6-0 | 100% | replica |
| ldcWV.Battlecode-2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
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
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| UpperArlingtonHighSchool.~682aa9 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | sunanth123.battlecode19-prorush | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | NielsKornerup.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| ovkulkarni.battlecode2019~0aa607 | NielsKornerup.Battlecode-2019 | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-davjasdiv | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-seeding | 6 | 6-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~0aa607 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 6 | 4-2 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
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
| dmunozc.bc19-g8-bots | dmunozc.bc19-g8-davjasdiv | 9 | 4-5 | 44% | replica |
| dmunozc.bc19-g8-bots | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-bots | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | evanyeyeye.battlecode2019~af562c | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| lschaberg.bc19 | programjames.BC19Bot-seeding | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | ovkulkarni.battlecode2019~06c610 | 6 | 3-3 | 50% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-davjasdiv | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | moreda-a.BC2019-t15 | 6 | 4-2 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| m4reko.bc2019-tmores-angels | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | programjames.BC19Bot-seeding | 6 | 3-3 | 50% | replica |
| m4reko.bc2019-tmores-angels | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 6 | 3-3 | 50% | replica |
| howard36.Battlecode2019-eco6 | moreda-a.BC2019-t15 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-eco6 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | ipercyNC.group6-battlecode | 9 | 6-3 | 67% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 6 | 4-2 | 67% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | programjames.BC19Bot-root | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | vicennial.BattleCode19 | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-prorush | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 6 | 4-2 | 67% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | spachava753.bc19 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | nthistle.battlecode-2019 | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | twitu.bc19-tsp | 3 | 0-3 | 0% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| cvxluo.battlecode19 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | liwanlin41.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
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
| vicennial.BattleCode19 | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| vicennial.BattleCode19 | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| vicennial.BattleCode19 | spachava753.bc19 | 6 | 4-2 | 67% | replica |
| vicennial.BattleCode19 | jamesrayman.HCN-bot | 6 | 6-0 | 100% | replica |
| vicennial.BattleCode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | SethKitchen.examplefuncsplayer | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-mainbot | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 6 | 5-1 | 83% | replica |
| evanyeyeye.battlecode2019~af562c | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| JasonLarson44.2019-Battle~1c7639 | jamesrayman.HCN-bot | 6 | 3-3 | 50% | replica |
| JasonLarson44.2019-Battle~1c7639 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bayoumi17m.BattleCode-2019 | 3 | 0-3 | 0% | replica |
| spachava753.bc19 | jamesrayman.HCN-bot | 6 | 4-2 | 67% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 6 | 5-1 | 83% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e1c2fb | 6 | 3-3 | 50% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 6 | 5-1 | 83% | replica |
| UpperArlingtonHighSchool.~5e7875 | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | dndoja.battlecode19 | 9 | 3-6 | 33% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e37b3e | 6 | 3-3 | 50% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 9 | 6-3 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | roy-love.onshoreBattleCode2019 | 3 | 1-2 | 33% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| haydenshively.Battle-Code~e37b3e | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | TestSubjector.BattleCode2~fb22c7 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | TestSubjector.BattleCode2~fb22c7 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 9 | 6-3 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | CometsTech.battlecode2019~187e8c | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e1c2fb | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | 18dcb01.Battlecode19-robot2 | 6 | 2-4 | 33% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | SethKitchen.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| dndoja.battlecode19 | liwanlin41.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| dndoja.battlecode19 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019~187e8c | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | asunathanr.asu_bc | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| roy-love.onshoreBattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | bc19-starter | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jyurkanin.corn_bc19 | 9 | 5-4 | 56% | replica |
| SethKitchen.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-robot2 | jyurkanin.corn_bc19 | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 9 | 7-2 | 78% | replica |
| 18dcb01.Battlecode19-robot2 | howard36.Battlecode2019-sprint | 6 | 5-1 | 83% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 9 | 6-3 | 67% | replica |
| liwanlin41.examplefuncsplayer | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | howard36.Battlecode2019-sprint | 6 | 2-4 | 33% | replica |
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 9 | 6-3 | 67% | replica |
| dgh2.bc19-t1 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | VictorButoi.BattleCode201~c4576b | 3 | 0-3 | 0% | replica |
| jyurkanin.corn_bc19 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | asunathanr.asu_bc | 6 | 2-4 | 33% | replica |
| VictorButoi.BattleCode201~c4576b | nhard.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | howard36.Battlecode2019-sprint | 3 | 0-3 | 0% | replica |
| asunathanr.asu_bc | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| asunathanr.asu_bc | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | nhard.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| howard36.Battlecode2019-sprint | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | vishwasns99.BC_2019 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-sprint | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | bovard.battlecode-2019-un~8822c3 | 6 | 5-1 | 83% | replica |
| nhard.examplefuncsplayer | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | bc19-starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| OmarTahoun.battle-code | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| waylon531.scala_starter | bc19-starter | 6 | 4-2 | 67% | replica |
| waylon531.scala_starter | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | bovard.battlecode-2019-un~8822c3 | 6 | 3-3 | 50% | replica |
| vishwasns99.BC_2019 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| vishwasns99.BC_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 15 | 9-6 | 60% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | RyanSharafuddin.Battlecode_2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 6 | 6-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 9 | 8-1 | 89% | replica |
| VoidMercy.battlecode-2019-bot | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 9 | 3-6 | 33% | replica |
| bc19-starter | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| bc19-starter | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| bc19-starter | yunaganyh.bc19 | 3 | 2-1 | 67% | replica |
| bc19-starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 12 | 12-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 9 | 9-0 | 100% | replica |
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 9 | 4-5 | 44% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | TheRobotCarlson.battlehac~323871 | 3 | 2-1 | 67% | replica |
| ryanhzhao.Battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 2-1 | 67% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 6 | 5-1 | 83% | replica |
| djkeyes.bc19 | TheRobotCarlson.battlehac~323871 | 6 | 4-2 | 67% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 9 | 6-3 | 67% | replica |
| yunaganyh.bc19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 9 | 7-2 | 78% | replica |
| jshin313.battlecodebot | TheRobotCarlson.battlehac~323871 | 15 | 7-8 | 47% | replica |
| jshin313.battlecodebot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 15 | 7-8 | 47% | replica |
