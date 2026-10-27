# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-26 22:31 PDT.

9055 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 2185 of ours on the galaxy replica and 3627 between field bots there (3624 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 213 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, m-schier.battlecode-2019-wololo, uvafan.bc2019, yujinwunz.battlecode_2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, StoneT2000.BC19-botfinalsafe, arya-k.bc19, j-mao.battlecode-2019, StoneT2000.BC19-bot1v43, virenvshah.Battlecode2019, moreda-a.BC2019-a31, rafekruse.Battlecode-2019~2680d4, IanCoolidge0.battlecode20~f649f3, IanCoolidge0.battlecode20~69ce88, vineetparikh.BigRedBattle~fe3459, bqi343.cp-notebook, awesomelemonade.Battlecode2019, unrevre.battlecode, cemondr.BC19pdxgroup4, ldcWV.Battlecode-2019, UpperArlingtonHighSchool.~682aa9, IvanGeffner.BC19-bot6b, Nischay-Pro.BattleCode2019, IvanGeffner.BC19-eigthbot, ovkulkarni.battlecode2019~0aa607, NielsKornerup.Battlecode-2019, dmunozc.bc19-g8-bots, lschaberg.bc19, dmunozc.bc19-g8-davjasdiv, howard36.Battlecode2019-eco6, m4reko.bc2019-tmores-angels, programjames.BC19Bot-seeding, Tom-CCS.BC19, abcdefguan.battlecode2019, ovkulkarni.battlecode2019~06c610, 18dcb01.Battlecode19-prea~fb5c48, CS554-software-engineerin~a575dc, ipercyNC.group6-battlecode, sunanth123.battlecode19-prorush, moreda-a.BC2019-t15, nthistle.battlecode-2019, programjames.BC19Bot-root, twitu.bc19-tsp, cvxluo.battlecode19, vicennial.BattleCode19, CometsTech.battlecode2019, sunanth123.battlecode19-mainbot, Nydroam.BatteredCod, evanyeyeye.battlecode2019~af562c, spachava753.bc19, bayoumi17m.BattleCode-2019, JasonLarson44.2019-Battle~1c7639, jamesrayman.HCN-bot, UpperArlingtonHighSchool.~5e7875, rooneyshuman.Battlecode, TestSubjector.BattleCode2~e6de74, haydenshively.Battle-Code~e1c2fb, haydenshively.Battle-Code~e37b3e, TestSubjector.BattleCode2~fb22c7, dndoja.battlecode19, jackliu612.Battlecode19, CometsTech.battlecode2019~187e8c, roy-love.onshoreBattleCode2019, SethKitchen.examplefuncsplayer, 18dcb01.Battlecode19-robot2, liwanlin41.examplefuncsplayer, dgh2.bc19-t1, jyurkanin.corn_bc19, VictorButoi.BattleCode201~c4576b, asunathanr.asu_bc, howard36.Battlecode2019-sprint, nhard.examplefuncsplayer, OmarTahoun.battle-code, waylon531.scala_starter, vishwasns99.BC_2019, bovard.battlecode-2019-un~8822c3, DivyanshuSaxena.Battlecode, bc19-starter, VoidMercy.battlecode-2019-bot, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, ryanhzhao.Battlecode-2019, djkeyes.bc19, yunaganyh.bc19, jshin313.battlecodebot, TheRobotCarlson.battlehac~323871, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1599 ± 224 | 92 of 213 | 38 | 33-5 | 75.5% | 31.3% (vs 21) |
| v1 | accepted | 1447 ± 137 | 140 of 213 | 154 | 128-26 | 65.6% | 23.8% (vs 30) |
| v2 | accepted | 1429 ± 139 | 145 of 213 | 62 | 30-32 | 64.4% | 23.7% (vs 32) |
| v3 | accepted | 1595 ± 97 | 93 of 213 | 191 | 140-51 | 75.3% | 30.9% (vs 21) |
| v4 | accepted | 1345 ± 106 | 155 of 213 | 220 | 83-137 | 58.9% | 19.4% (vs 36) |
| v5 | accepted | 1484 ± 73 | 132 of 213 | 439 | 202-237 | 68.1% | 24.7% (vs 27) |
| v6 | accepted | 1506 ± 67 | 125 of 213 | 322 | 130-192 | 69.5% | 26.9% (vs 27) |
| v7 | accepted | 1637 ± 45 | 76 of 213 | 1804 | 927-877 | 77.8% | 33.1% (vs 18) |
| v8 | accepted | 1695 ± 63 | 46 of 213 | 356 | 160-196 | 81.2% | 33.2% (vs 12) |
| v9 | accepted | 1774 ± 111 | 20 of 213 | 48 | 21-27 | 85.3% | 35.5% (vs 7) |
| v10 | accepted | 1764 ± 125 | 24 of 213 | 36 | 17-19 | 84.8% | 36.1% (vs 8) |
| v11 | accepted | 1762 ± 94 | 25 of 213 | 69 | 30-39 | 84.7% | 35.8% (vs 8) |
| v12 | accepted | 1892 ± 108 | 9 of 213 | 54 | 36-18 | 90.4% | 31.3% (vs 2) |
| block | candidate | 1706 ± 160 | 40 of 213 | 20 | 12-8 | 81.8% | 34.5% (vs 12) |
| camp | candidate | 1706 ± 160 | 41 of 213 | 20 | 12-8 | 81.8% | 34.5% (vs 12) |
| h100 | candidate | 1627 ± 66 | 81 of 213 | 200 | 97-103 | 77.2% | 31.9% (vs 18) |
| h101 | candidate | 1602 ± 116 | 88 of 213 | 40 | 18-22 | 75.7% | 31.7% (vs 21) |
| h103 | candidate | 1654 ± 89 | 71 of 213 | 76 | 33-43 | 78.8% | 33.1% (vs 16) |
| h104 | candidate | 1667 ± 99 | 61 of 213 | 58 | 28-30 | 79.5% | 32.3% (vs 14) |
| h107 | candidate | 1548 ± 119 | 107 of 213 | 40 | 15-25 | 72.3% | 27.7% (vs 23) |
| h110 | candidate | 1584 ± 117 | 97 of 213 | 40 | 17-23 | 74.6% | 29.7% (vs 21) |
| h111 | candidate | 1667 ± 99 | 62 of 213 | 58 | 28-30 | 79.5% | 32.3% (vs 14) |
| h112 | candidate | 1667 ± 99 | 63 of 213 | 58 | 28-30 | 79.5% | 32.3% (vs 14) |
| h113 | candidate | 1584 ± 117 | 98 of 213 | 40 | 17-23 | 74.6% | 29.7% (vs 21) |
| h114 | candidate | 1567 ± 118 | 100 of 213 | 40 | 16-24 | 73.4% | 27.7% (vs 21) |
| h115 | candidate | 1654 ± 116 | 68 of 213 | 40 | 21-19 | 78.8% | 33.1% (vs 16) |
| h116 | candidate | 1567 ± 118 | 101 of 213 | 40 | 16-24 | 73.4% | 27.7% (vs 21) |
| h118 | candidate | 1637 ± 116 | 77 of 213 | 40 | 20-20 | 77.8% | 33.1% (vs 18) |
| h11c | candidate | 1538 ± 179 | 113 of 213 | 25 | 15-10 | 71.6% | 27.6% (vs 24) |
| h121 | candidate | 1615 ± 100 | 85 of 213 | 58 | 24-34 | 76.5% | 33.3% (vs 21) |
| h123 | candidate | 1602 ± 101 | 87 of 213 | 58 | 23-35 | 75.7% | 31.7% (vs 21) |
| h124 | candidate | 1602 ± 116 | 89 of 213 | 40 | 18-22 | 75.7% | 31.7% (vs 21) |
| h125 | candidate | 1602 ± 116 | 90 of 213 | 40 | 18-22 | 75.7% | 31.7% (vs 21) |
| h126 | candidate | 1672 ± 86 | 57 of 213 | 98 | 49-49 | 79.8% | 32.9% (vs 14) |
| h127 | candidate | 1661 ± 86 | 64 of 213 | 98 | 47-51 | 79.2% | 31.7% (vs 14) |
| h128 | candidate | 1729 ± 105 | 33 of 213 | 54 | 23-31 | 83.0% | 34.7% (vs 10) |
| h129 | candidate | 1469 ± 128 | 134 of 213 | 40 | 11-29 | 67.1% | 24.2% (vs 28) |
| h130 | candidate | 1679 ± 99 | 55 of 213 | 58 | 29-29 | 80.3% | 33.8% (vs 14) |
| h131 | candidate | 1654 ± 116 | 69 of 213 | 40 | 21-19 | 78.8% | 33.1% (vs 16) |
| h132 | candidate | 1689 ± 117 | 53 of 213 | 40 | 23-17 | 80.8% | 33.8% (vs 13) |
| h133 | candidate | 1671 ± 116 | 58 of 213 | 40 | 22-18 | 79.8% | 32.9% (vs 14) |
| h134 | candidate | 1530 ± 121 | 116 of 213 | 40 | 14-26 | 71.1% | 26.7% (vs 24) |
| h135 | candidate | 1641 ± 100 | 75 of 213 | 58 | 26-32 | 78.0% | 33.6% (vs 18) |
| h136 | candidate | 1644 ± 89 | 73 of 213 | 76 | 32-44 | 78.2% | 32.9% (vs 17) |
| h137 | candidate | 1602 ± 116 | 91 of 213 | 40 | 18-22 | 75.7% | 31.7% (vs 21) |
| h138 | candidate | 1654 ± 116 | 70 of 213 | 40 | 21-19 | 78.8% | 33.1% (vs 16) |
| h139 | candidate | 1694 ± 89 | 47 of 213 | 76 | 37-39 | 81.1% | 33.0% (vs 12) |
| h140 | candidate | 1692 ± 99 | 48 of 213 | 58 | 30-28 | 81.0% | 32.8% (vs 12) |
| h141 | candidate | 1705 ± 100 | 42 of 213 | 58 | 31-27 | 81.7% | 34.4% (vs 12) |
| h142 | candidate | 1671 ± 116 | 59 of 213 | 40 | 22-18 | 79.8% | 32.9% (vs 14) |
| h143 | candidate | 1707 ± 118 | 39 of 213 | 40 | 24-16 | 81.8% | 34.6% (vs 12) |
| h144 | candidate | 1548 ± 119 | 108 of 213 | 40 | 15-25 | 72.3% | 27.7% (vs 23) |
| h145 | candidate | 1746 ± 104 | 30 of 213 | 58 | 31-27 | 83.9% | 36.9% (vs 10) |
| h146 | candidate | 1708 ± 104 | 37 of 213 | 58 | 28-30 | 81.9% | 34.8% (vs 12) |
| h147 | candidate | 1784 ± 105 | 19 of 213 | 58 | 34-24 | 85.8% | 36.7% (vs 7) |
| h148 | candidate | 1765 ± 78 | 23 of 213 | 112 | 58-54 | 84.9% | 36.2% (vs 8) |
| h149 | candidate | 1708 ± 104 | 38 of 213 | 58 | 28-30 | 81.9% | 34.8% (vs 12) |
| h150 | candidate | 1759 ± 104 | 26 of 213 | 58 | 32-26 | 84.5% | 35.4% (vs 8) |
| h151 | candidate | 1660 ± 125 | 66 of 213 | 40 | 18-22 | 79.1% | 32.7% (vs 15) |
| h157 | candidate | 1699 ± 127 | 43 of 213 | 36 | 14-22 | 81.4% | 33.6% (vs 12) |
| h159 | candidate | 1754 ± 92 | 28 of 213 | 72 | 33-39 | 84.3% | 36.5% (vs 9) |
| h161 | candidate | 1699 ± 127 | 44 of 213 | 36 | 14-22 | 81.4% | 33.6% (vs 12) |
| h162 | candidate | 1676 ± 129 | 56 of 213 | 36 | 13-23 | 80.1% | 33.4% (vs 14) |
| h163 | candidate | 1765 ± 78 | 22 of 213 | 108 | 51-57 | 84.9% | 36.2% (vs 8) |
| h167 | candidate | 1809 ± 92 | 14 of 213 | 72 | 38-34 | 87.0% | 35.1% (vs 5) |
| h16r | candidate | 1276 ± 152 | 161 of 213 | 40 | 16-24 | 54.3% | 18.0% (vs 41) |
| h170 | candidate | 1721 ± 126 | 36 of 213 | 36 | 15-21 | 82.6% | 36.4% (vs 12) |
| h175 | candidate | 1798 ± 92 | 16 of 213 | 72 | 37-35 | 86.5% | 36.4% (vs 6) |
| h178 | candidate | 1787 ± 92 | 18 of 213 | 72 | 36-36 | 85.9% | 37.1% (vs 7) |
| h18 | candidate | 1270 ± 194 | 162 of 213 | 25 | 6-19 | 53.9% | 17.6% (vs 41) |
| h184 | candidate | 1846 ± 79 | 12 of 213 | 108 | 62-46 | 88.6% | 36.3% (vs 4) |
| h185 | candidate | 1935 ± 98 | 5 of 213 | 72 | 49-23 | 91.9% | 36.8% (vs 2) |
| h190 | candidate | 1743 ± 125 | 31 of 213 | 36 | 16-20 | 83.7% | 36.5% (vs 10) |
| h192 | candidate | 1699 ± 127 | 45 of 213 | 36 | 14-22 | 81.4% | 33.6% (vs 12) |
| h193 | candidate | 1743 ± 125 | 32 of 213 | 36 | 16-20 | 83.7% | 36.5% (vs 10) |
| h195 | candidate | 1939 ± 83 | 4 of 213 | 108 | 74-34 | 92.1% | 37.4% (vs 2) |
| h198 | candidate | 1921 ± 132 | 6 of 213 | 36 | 24-12 | 91.5% | 35.0% (vs 2) |
| h2 | candidate | 1545 ± 150 | 111 of 213 | 54 | 25-29 | 72.1% | 28.3% (vs 24) |
| h201 | candidate | 1921 ± 132 | 7 of 213 | 36 | 24-12 | 91.5% | 35.0% (vs 2) |
| h203 | candidate | 1898 ± 130 | 8 of 213 | 36 | 23-13 | 90.6% | 32.0% (vs 2) |
| h206 | candidate | 1972 ± 138 | 3 of 213 | 36 | 26-10 | 93.1% | 41.9% (vs 2) |
| h24 | candidate | 1453 ± 154 | 139 of 213 | 40 | 26-14 | 66.0% | 24.4% (vs 30) |
| h24v5 | candidate | 1536 ± 130 | 114 of 213 | 40 | 23-17 | 71.5% | 27.4% (vs 24) |
| h3 | candidate | 1526 ± 214 | 119 of 213 | 19 | 9-10 | 70.9% | 27.3% (vs 25) |
| h31 | candidate | 1435 ± 152 | 144 of 213 | 40 | 25-15 | 64.8% | 24.3% (vs 32) |
| h38 | candidate | 1467 ± 306 | 137 of 213 | 6 | 4-2 | 66.9% | 24.8% (vs 29) |
| h40 | candidate | 1535 ± 290 | 115 of 213 | 8 | 6-2 | 71.4% | 27.3% (vs 24) |
| h41 | candidate | 1398 ± 254 | 151 of 213 | 8 | 3-5 | 62.3% | 24.0% (vs 36) |
| h42 | candidate | 1398 ± 254 | 152 of 213 | 8 | 3-5 | 62.3% | 24.0% (vs 36) |
| h43 | candidate | 1484 ± 247 | 126 of 213 | 8 | 4-4 | 68.1% | 24.7% (vs 27) |
| h44 | candidate | 1670 ± 280 | 60 of 213 | 8 | 6-2 | 79.7% | 32.6% (vs 14) |
| h46 | candidate | 1398 ± 254 | 153 of 213 | 8 | 3-5 | 62.3% | 24.0% (vs 36) |
| h47 | candidate | 1484 ± 247 | 127 of 213 | 8 | 4-4 | 68.1% | 24.7% (vs 27) |
| h48 | candidate | 1484 ± 247 | 128 of 213 | 8 | 4-4 | 68.1% | 24.7% (vs 27) |
| h49 | candidate | 1484 ± 247 | 129 of 213 | 8 | 4-4 | 68.1% | 24.7% (vs 27) |
| h52 | candidate | 1398 ± 254 | 154 of 213 | 8 | 3-5 | 62.3% | 24.0% (vs 36) |
| h53 | candidate | 1571 ± 254 | 99 of 213 | 8 | 5-3 | 73.7% | 28.2% (vs 21) |
| h54 | candidate | 1557 ± 123 | 104 of 213 | 48 | 29-19 | 72.8% | 27.7% (vs 22) |
| h55 | candidate | 1528 ± 121 | 118 of 213 | 56 | 32-24 | 70.9% | 27.4% (vs 25) |
| h58 | candidate | 1441 ± 271 | 143 of 213 | 8 | 3-5 | 65.2% | 24.9% (vs 32) |
| h59 | candidate | 1484 ± 247 | 130 of 213 | 8 | 4-4 | 68.1% | 24.7% (vs 27) |
| h6 | candidate | 1468 ± 115 | 136 of 213 | 158 | 94-64 | 67.0% | 24.9% (vs 29) |
| h60 | candidate | 1484 ± 247 | 131 of 213 | 8 | 4-4 | 68.1% | 24.7% (vs 27) |
| h61 | candidate | 1592 ± 253 | 94 of 213 | 8 | 5-3 | 75.1% | 30.6% (vs 21) |
| h63 | candidate | 1558 ± 127 | 103 of 213 | 40 | 23-17 | 72.9% | 27.8% (vs 22) |
| h64 | candidate | 1541 ± 126 | 112 of 213 | 40 | 22-18 | 71.8% | 27.8% (vs 24) |
| h68 | candidate | 1691 ± 279 | 50 of 213 | 8 | 6-2 | 80.9% | 34.0% (vs 13) |
| h7 | candidate | 1519 ± 1446 | 121 of 213 | 8 | 8-0 | 70.4% | 26.5% (vs 25) |
| h72 | candidate | 1691 ± 279 | 51 of 213 | 8 | 6-2 | 80.9% | 34.0% (vs 13) |
| h76 | candidate | 1633 ± 184 | 78 of 213 | 32 | 18-14 | 77.6% | 32.6% (vs 18) |
| h77 | candidate | 1516 ± 186 | 123 of 213 | 16 | 8-8 | 70.2% | 27.1% (vs 26) |
| h78 | candidate | 1691 ± 279 | 52 of 213 | 8 | 6-2 | 80.9% | 34.0% (vs 13) |
| h82 | candidate | 1590 ± 95 | 95 of 213 | 134 | 70-64 | 74.9% | 30.3% (vs 21) |
| h83 | candidate | 1630 ± 298 | 79 of 213 | 8 | 4-4 | 77.4% | 32.2% (vs 18) |
| h84 | candidate | 1630 ± 298 | 80 of 213 | 8 | 4-4 | 77.4% | 32.2% (vs 18) |
| h88 | candidate | 1555 ± 143 | 105 of 213 | 40 | 18-22 | 72.7% | 27.5% (vs 22) |
| h89 | candidate | 762 ± 1086 | 190 of 213 | 8 | 0-8 | 27.2% | 8.2% (vs 67) |
| h8v5 | candidate | 1588 ± 125 | 96 of 213 | 48 | 31-17 | 74.8% | 30.1% (vs 21) |
| h90 | candidate | 762 ± 1086 | 191 of 213 | 8 | 0-8 | 27.2% | 8.2% (vs 67) |
| h91 | candidate | 1546 ± 194 | 110 of 213 | 16 | 7-9 | 72.1% | 28.4% (vs 24) |
| h96 | candidate | 1615 ± 100 | 86 of 213 | 58 | 24-34 | 76.5% | 33.3% (vs 21) |
| rush | sparring | 1270 ± 194 | 163 of 213 | 25 | 6-19 | 53.9% | 17.6% (vs 41) |
| rush4 | sparring | 1526 ± 132 | 120 of 213 | 50 | 30-20 | 70.8% | 27.2% (vs 25) |
| turtle | candidate | 1398 ± 193 | 150 of 213 | 20 | 4-16 | 62.4% | 24.0% (vs 36) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 125 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 350 malformed)
- replica: 5812 games (11 archive games skipped, 719 matches from archives, 1208 matches from scores), fetched 2026-10-27T06:08:45+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34), v10 = h175 (72 games, 37-35), v11 = h178 (72 games, 36-36), v12 = h185 (72 games, 49-23). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the win rate and W-L against the bot of the latest accepted build with games of its own that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 2055 | 112 | 81 | 67-14 | 33% (v11 1-2) |
| 2 | m-schier.battlecode-2019-wololo | field | 2003 | 56 | 399 | 311-88 | 50% (v12 3-3) |
| 3 | **cand:h206** | candidate | 1972 | 138 | 36 | 26-10 |  |
| 4 | **cand:h195** | candidate | 1939 | 83 | 108 | 74-34 |  |
| 5 | **cand:h185** | candidate | 1935 | 98 | 72 | 49-23 |  |
| 6 | **cand:h198** | candidate | 1921 | 132 | 36 | 24-12 |  |
| 7 | **cand:h201** | candidate | 1921 | 132 | 36 | 24-12 |  |
| 8 | **cand:h203** | candidate | 1898 | 130 | 36 | 23-13 |  |
| 9 | **us:v12** | accepted | 1892 | 108 | 54 | 36-18 |  |
| 10 | uvafan.bc2019 | field | 1888 | 51 | 399 | 262-137 | 67% (v12 4-2) |
| 11 | yujinwunz.battlecode_2019 | field | 1849 | 98 | 90 | 64-26 | 50% (v11 3-3) |
| 12 | **cand:h184** | candidate | 1846 | 79 | 108 | 62-46 |  |
| 13 | rafekruse.Battlecode-2019-bc19 | field | 1818 | 98 | 78 | 50-28 | 0% (v8 0-3) |
| 14 | **cand:h167** | candidate | 1809 | 92 | 72 | 38-34 |  |
| 15 | VoidMercy.battlecode-2019~e7dc06 | field | 1801 | 106 | 69 | 47-22 | 33% (v11 1-2) |
| 16 | **cand:h175** | candidate | 1798 | 92 | 72 | 37-35 |  |
| 17 | StoneT2000.BC19-botfinalsafe | field | 1792 | 49 | 414 | 236-178 | 44% (v12 4-5) |
| 18 | **cand:h178** | candidate | 1787 | 92 | 72 | 36-36 |  |
| 19 | **cand:h147** | candidate | 1784 | 105 | 58 | 34-24 |  |
| 20 | **us:v9** | accepted | 1774 | 111 | 48 | 21-27 |  |
| 21 | arya-k.bc19 | field | 1772 | 100 | 78 | 55-23 | 0% (v11 0-3) |
| 22 | **cand:h163** | candidate | 1765 | 78 | 108 | 51-57 |  |
| 23 | **cand:h148** | candidate | 1765 | 78 | 112 | 58-54 |  |
| 24 | **us:v10** | accepted | 1764 | 125 | 36 | 17-19 |  |
| 25 | **us:v11** | accepted | 1762 | 94 | 69 | 30-39 |  |
| 26 | **cand:h150** | candidate | 1759 | 104 | 58 | 32-26 |  |
| 27 | j-mao.battlecode-2019 | field | 1755 | 95 | 78 | 48-30 | 100% (v8 3-0) |
| 28 | **cand:h159** | candidate | 1754 | 92 | 72 | 33-39 |  |
| 29 | StoneT2000.BC19-bot1v43 | field | 1751 | 49 | 411 | 215-196 | 78% (v12 7-2) |
| 30 | **cand:h145** | candidate | 1746 | 104 | 58 | 31-27 |  |
| 31 | **cand:h190** | candidate | 1743 | 125 | 36 | 16-20 |  |
| 32 | **cand:h193** | candidate | 1743 | 125 | 36 | 16-20 |  |
| 33 | **cand:h128** | candidate | 1729 | 105 | 54 | 23-31 |  |
| 34 | virenvshah.Battlecode2019 | field | 1725 | 97 | 84 | 59-25 |  |
| 35 | moreda-a.BC2019-a31 | field | 1725 | 94 | 84 | 51-33 | 100% (v12 3-0) |
| 36 | **cand:h170** | candidate | 1721 | 126 | 36 | 15-21 |  |
| 37 | **cand:h146** | candidate | 1708 | 104 | 58 | 28-30 |  |
| 38 | **cand:h149** | candidate | 1708 | 104 | 58 | 28-30 |  |
| 39 | **cand:h143** | candidate | 1707 | 118 | 40 | 24-16 |  |
| 40 | **cand:block** | candidate | 1706 | 160 | 20 | 12-8 |  |
| 41 | **cand:camp** | candidate | 1706 | 160 | 20 | 12-8 |  |
| 42 | **cand:h141** | candidate | 1705 | 100 | 58 | 31-27 |  |
| 43 | **cand:h157** | candidate | 1699 | 127 | 36 | 14-22 |  |
| 44 | **cand:h161** | candidate | 1699 | 127 | 36 | 14-22 |  |
| 45 | **cand:h192** | candidate | 1699 | 127 | 36 | 14-22 |  |
| 46 | **us:v8** | accepted | 1695 | 63 | 356 | 160-196 |  |
| 47 | **cand:h139** | candidate | 1694 | 89 | 76 | 37-39 |  |
| 48 | **cand:h140** | candidate | 1692 | 99 | 58 | 30-28 |  |
| 49 | rafekruse.Battlecode-2019~2680d4 | field | 1692 | 106 | 72 | 51-21 |  |
| 50 | **cand:h68** | candidate | 1691 | 279 | 8 | 6-2 |  |
| 51 | **cand:h72** | candidate | 1691 | 279 | 8 | 6-2 |  |
| 52 | **cand:h78** | candidate | 1691 | 279 | 8 | 6-2 |  |
| 53 | **cand:h132** | candidate | 1689 | 117 | 40 | 23-17 |  |
| 54 | IanCoolidge0.battlecode20~f649f3 | field | 1682 | 93 | 99 | 59-40 | 33% (v12 1-2) |
| 55 | **cand:h130** | candidate | 1679 | 99 | 58 | 29-29 |  |
| 56 | **cand:h162** | candidate | 1676 | 129 | 36 | 13-23 |  |
| 57 | **cand:h126** | candidate | 1672 | 86 | 98 | 49-49 |  |
| 58 | **cand:h133** | candidate | 1671 | 116 | 40 | 22-18 |  |
| 59 | **cand:h142** | candidate | 1671 | 116 | 40 | 22-18 |  |
| 60 | **cand:h44** | candidate | 1670 | 280 | 8 | 6-2 |  |
| 61 | **cand:h104** | candidate | 1667 | 99 | 58 | 28-30 |  |
| 62 | **cand:h111** | candidate | 1667 | 99 | 58 | 28-30 |  |
| 63 | **cand:h112** | candidate | 1667 | 99 | 58 | 28-30 |  |
| 64 | **cand:h127** | candidate | 1661 | 86 | 98 | 47-51 |  |
| 65 | IanCoolidge0.battlecode20~69ce88 | field | 1661 | 49 | 402 | 160-242 | 56% (v12 5-4) |
| 66 | **cand:h151** | candidate | 1660 | 125 | 40 | 18-22 |  |
| 67 | vineetparikh.BigRedBattle~fe3459 | field | 1654 | 95 | 87 | 55-32 | 100% (v12 3-0) |
| 68 | **cand:h115** | candidate | 1654 | 116 | 40 | 21-19 |  |
| 69 | **cand:h131** | candidate | 1654 | 116 | 40 | 21-19 |  |
| 70 | **cand:h138** | candidate | 1654 | 116 | 40 | 21-19 |  |
| 71 | **cand:h103** | candidate | 1654 | 89 | 76 | 33-43 |  |
| 72 | bqi343.cp-notebook | field | 1649 | 108 | 69 | 46-23 |  |
| 73 | **cand:h136** | candidate | 1644 | 89 | 76 | 32-44 |  |
| 74 | awesomelemonade.Battlecode2019 | field | 1643 | 50 | 390 | 151-239 | 100% (v12 6-0) |
| 75 | **cand:h135** | candidate | 1641 | 100 | 58 | 26-32 |  |
| 76 | **us:v7** | accepted | 1637 | 45 | 1804 | 927-877 |  |
| 77 | **cand:h118** | candidate | 1637 | 116 | 40 | 20-20 |  |
| 78 | **cand:h76** | candidate | 1633 | 184 | 32 | 18-14 |  |
| 79 | **cand:h83** | candidate | 1630 | 298 | 8 | 4-4 |  |
| 80 | **cand:h84** | candidate | 1630 | 298 | 8 | 4-4 |  |
| 81 | **cand:h100** | candidate | 1627 | 66 | 200 | 97-103 |  |
| 82 | unrevre.battlecode | field | 1621 | 107 | 66 | 42-24 |  |
| 83 | cemondr.BC19pdxgroup4 | field | 1617 | 99 | 75 | 44-31 |  |
| 84 | ldcWV.Battlecode-2019 | field | 1617 | 101 | 75 | 48-27 |  |
| 85 | **cand:h121** | candidate | 1615 | 100 | 58 | 24-34 |  |
| 86 | **cand:h96** | candidate | 1615 | 100 | 58 | 24-34 |  |
| 87 | **cand:h123** | candidate | 1602 | 101 | 58 | 23-35 |  |
| 88 | **cand:h101** | candidate | 1602 | 116 | 40 | 18-22 |  |
| 89 | **cand:h124** | candidate | 1602 | 116 | 40 | 18-22 |  |
| 90 | **cand:h125** | candidate | 1602 | 116 | 40 | 18-22 |  |
| 91 | **cand:h137** | candidate | 1602 | 116 | 40 | 18-22 |  |
| 92 | **us:v0** | accepted | 1599 | 224 | 38 | 33-5 |  |
| 93 | **us:v3** | accepted | 1595 | 97 | 191 | 140-51 |  |
| 94 | **cand:h61** | candidate | 1592 | 253 | 8 | 5-3 |  |
| 95 | **cand:h82** | candidate | 1590 | 95 | 134 | 70-64 |  |
| 96 | **cand:h8v5** | candidate | 1588 | 125 | 48 | 31-17 |  |
| 97 | **cand:h110** | candidate | 1584 | 117 | 40 | 17-23 |  |
| 98 | **cand:h113** | candidate | 1584 | 117 | 40 | 17-23 |  |
| 99 | **cand:h53** | candidate | 1571 | 254 | 8 | 5-3 |  |
| 100 | **cand:h114** | candidate | 1567 | 118 | 40 | 16-24 |  |
| 101 | **cand:h116** | candidate | 1567 | 118 | 40 | 16-24 |  |
| 102 | UpperArlingtonHighSchool.~682aa9 | field | 1566 | 111 | 72 | 44-28 |  |
| 103 | **cand:h63** | candidate | 1558 | 127 | 40 | 23-17 |  |
| 104 | **cand:h54** | candidate | 1557 | 123 | 48 | 29-19 |  |
| 105 | **cand:h88** | candidate | 1555 | 143 | 40 | 18-22 |  |
| 106 | IvanGeffner.BC19-bot6b | field | 1555 | 381 | 9 | 7-2 |  |
| 107 | **cand:h107** | candidate | 1548 | 119 | 40 | 15-25 |  |
| 108 | **cand:h144** | candidate | 1548 | 119 | 40 | 15-25 |  |
| 109 | Nischay-Pro.BattleCode2019 | field | 1546 | 107 | 72 | 44-28 |  |
| 110 | **cand:h91** | candidate | 1546 | 194 | 16 | 7-9 |  |
| 111 | **cand:h2** | candidate | 1545 | 150 | 54 | 25-29 |  |
| 112 | **cand:h64** | candidate | 1541 | 126 | 40 | 22-18 |  |
| 113 | **cand:h11c** | candidate | 1538 | 179 | 25 | 15-10 |  |
| 114 | **cand:h24v5** | candidate | 1536 | 130 | 40 | 23-17 |  |
| 115 | **cand:h40** | candidate | 1535 | 290 | 8 | 6-2 |  |
| 116 | **cand:h134** | candidate | 1530 | 121 | 40 | 14-26 |  |
| 117 | IvanGeffner.BC19-eigthbot | field | 1529 | 309 | 9 | 6-3 |  |
| 118 | **cand:h55** | candidate | 1528 | 121 | 56 | 32-24 |  |
| 119 | **cand:h3** | candidate | 1526 | 214 | 19 | 9-10 |  |
| 120 | **spar:rush4** | sparring | 1526 | 132 | 50 | 30-20 |  |
| 121 | **cand:h7** | candidate | 1519 | 1446 | 8 | 8-0 |  |
| 122 | ovkulkarni.battlecode2019~0aa607 | field | 1518 | 99 | 78 | 51-27 |  |
| 123 | **cand:h77** | candidate | 1516 | 186 | 16 | 8-8 |  |
| 124 | NielsKornerup.Battlecode-2019 | field | 1514 | 85 | 111 | 61-50 |  |
| 125 | **us:v6** | accepted | 1506 | 67 | 322 | 130-192 |  |
| 126 | **cand:h43** | candidate | 1484 | 247 | 8 | 4-4 |  |
| 127 | **cand:h47** | candidate | 1484 | 247 | 8 | 4-4 |  |
| 128 | **cand:h48** | candidate | 1484 | 247 | 8 | 4-4 |  |
| 129 | **cand:h49** | candidate | 1484 | 247 | 8 | 4-4 |  |
| 130 | **cand:h59** | candidate | 1484 | 247 | 8 | 4-4 |  |
| 131 | **cand:h60** | candidate | 1484 | 247 | 8 | 4-4 |  |
| 132 | **us:v5** | accepted | 1484 | 73 | 439 | 202-237 |  |
| 133 | dmunozc.bc19-g8-bots | field | 1479 | 100 | 78 | 46-32 |  |
| 134 | **cand:h129** | candidate | 1469 | 128 | 40 | 11-29 |  |
| 135 | lschaberg.bc19 | field | 1468 | 104 | 72 | 41-31 |  |
| 136 | **cand:h6** | candidate | 1468 | 115 | 158 | 94-64 |  |
| 137 | **cand:h38** | candidate | 1467 | 306 | 6 | 4-2 |  |
| 138 | dmunozc.bc19-g8-davjasdiv | field | 1453 | 92 | 96 | 50-46 |  |
| 139 | **cand:h24** | candidate | 1453 | 154 | 40 | 26-14 |  |
| 140 | **us:v1** | accepted | 1447 | 137 | 154 | 128-26 |  |
| 141 | howard36.Battlecode2019-eco6 | field | 1441 | 101 | 81 | 44-37 |  |
| 142 | m4reko.bc2019-tmores-angels | field | 1441 | 103 | 72 | 42-30 |  |
| 143 | **cand:h58** | candidate | 1441 | 271 | 8 | 3-5 |  |
| 144 | **cand:h31** | candidate | 1435 | 152 | 40 | 25-15 |  |
| 145 | **us:v2** | accepted | 1429 | 139 | 62 | 30-32 |  |
| 146 | programjames.BC19Bot-seeding | field | 1417 | 104 | 69 | 37-32 |  |
| 147 | Tom-CCS.BC19 | field | 1412 | 102 | 78 | 43-35 |  |
| 148 | abcdefguan.battlecode2019 | field | 1406 | 110 | 75 | 42-33 |  |
| 149 | ovkulkarni.battlecode2019~06c610 | field | 1404 | 108 | 69 | 41-28 |  |
| 150 | **cand:turtle** | candidate | 1398 | 193 | 20 | 4-16 |  |
| 151 | **cand:h41** | candidate | 1398 | 254 | 8 | 3-5 |  |
| 152 | **cand:h42** | candidate | 1398 | 254 | 8 | 3-5 |  |
| 153 | **cand:h46** | candidate | 1398 | 254 | 8 | 3-5 |  |
| 154 | **cand:h52** | candidate | 1398 | 254 | 8 | 3-5 |  |
| 155 | **us:v4** | accepted | 1345 | 106 | 220 | 83-137 |  |
| 156 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1335 | 95 | 108 | 51-57 |  |
| 157 | CS554-software-engineerin~a575dc | field | 1322 | 72 | 302 | 175-127 | 100% (v7 3-0) |
| 158 | ipercyNC.group6-battlecode | field | 1318 | 103 | 78 | 42-36 |  |
| 159 | sunanth123.battlecode19-prorush | field | 1298 | 108 | 72 | 39-33 |  |
| 160 | moreda-a.BC2019-t15 | field | 1295 | 110 | 72 | 36-36 |  |
| 161 | **cand:h16r** | candidate | 1276 | 152 | 40 | 16-24 |  |
| 162 | **cand:h18** | candidate | 1270 | 194 | 25 | 6-19 |  |
| 163 | **spar:rush** | sparring | 1270 | 194 | 25 | 6-19 |  |
| 164 | nthistle.battlecode-2019 | field | 1269 | 103 | 87 | 46-41 | 100% (v5 3-0) |
| 165 | programjames.BC19Bot-root | field | 1266 | 102 | 78 | 41-37 |  |
| 166 | twitu.bc19-tsp | field | 1259 | 107 | 84 | 45-39 |  |
| 167 | cvxluo.battlecode19 | field | 1248 | 101 | 84 | 41-43 |  |
| 168 | vicennial.BattleCode19 | field | 1233 | 104 | 90 | 44-46 |  |
| 169 | CometsTech.battlecode2019 | field | 1233 | 78 | 267 | 125-142 | 100% (v7 3-0) |
| 170 | sunanth123.battlecode19-mainbot | field | 1220 | 109 | 78 | 42-36 |  |
| 171 | Nydroam.BatteredCod | field | 1217 | 437 | 6 | 3-3 |  |
| 172 | evanyeyeye.battlecode2019~af562c | field | 1210 | 106 | 75 | 39-36 |  |
| 173 | spachava753.bc19 | field | 1155 | 111 | 75 | 39-36 |  |
| 174 | bayoumi17m.BattleCode-2019 | field | 1152 | 109 | 75 | 36-39 |  |
| 175 | JasonLarson44.2019-Battle~1c7639 | field | 1152 | 97 | 93 | 43-50 | 100% (v3 3-0) |
| 176 | jamesrayman.HCN-bot | field | 1130 | 110 | 81 | 33-48 | 100% (v5 3-0) |
| 177 | UpperArlingtonHighSchool.~5e7875 | field | 1013 | 122 | 75 | 36-39 |  |
| 178 | rooneyshuman.Battlecode | field | 982 | 125 | 75 | 37-38 |  |
| 179 | TestSubjector.BattleCode2~e6de74 | field | 962 | 118 | 93 | 44-49 |  |
| 180 | haydenshively.Battle-Code~e1c2fb | field | 953 | 111 | 75 | 33-42 |  |
| 181 | haydenshively.Battle-Code~e37b3e | field | 953 | 114 | 81 | 37-44 |  |
| 182 | TestSubjector.BattleCode2~fb22c7 | field | 943 | 126 | 93 | 42-51 |  |
| 183 | dndoja.battlecode19 | field | 938 | 115 | 72 | 34-38 |  |
| 184 | jackliu612.Battlecode19 | field | 893 | 151 | 63 | 27-36 |  |
| 185 | CometsTech.battlecode2019~187e8c | field | 870 | 118 | 78 | 34-44 |  |
| 186 | roy-love.onshoreBattleCode2019 | field | 848 | 117 | 78 | 33-45 |  |
| 187 | SethKitchen.examplefuncsplayer | field | 816 | 148 | 78 | 32-46 |  |
| 188 | 18dcb01.Battlecode19-robot2 | field | 805 | 127 | 81 | 34-47 |  |
| 189 | liwanlin41.examplefuncsplayer | field | 787 | 125 | 105 | 42-63 |  |
| 190 | **cand:h89** | candidate | 762 | 1086 | 8 | 0-8 |  |
| 191 | **cand:h90** | candidate | 762 | 1086 | 8 | 0-8 |  |
| 192 | dgh2.bc19-t1 | field | 745 | 139 | 78 | 31-47 |  |
| 193 | jyurkanin.corn_bc19 | field | 723 | 137 | 78 | 32-46 |  |
| 194 | VictorButoi.BattleCode201~c4576b | field | 683 | 129 | 72 | 28-44 |  |
| 195 | asunathanr.asu_bc | field | 678 | 119 | 87 | 33-54 |  |
| 196 | howard36.Battlecode2019-sprint | field | 608 | 135 | 72 | 28-44 |  |
| 197 | nhard.examplefuncsplayer | field | 599 | 131 | 81 | 32-49 |  |
| 198 | OmarTahoun.battle-code | field | 591 | 132 | 84 | 33-51 |  |
| 199 | waylon531.scala_starter | field | 531 | 154 | 75 | 27-48 |  |
| 200 | vishwasns99.BC_2019 | field | 514 | 146 | 72 | 27-45 |  |
| 201 | bovard.battlecode-2019-un~8822c3 | field | 452 | 160 | 66 | 23-43 |  |
| 202 | DivyanshuSaxena.Battlecode | field | 334 | 150 | 93 | 36-57 |  |
| 203 | bc19-starter | field | 251 | 154 | 379 | 79-300 | 100% (v3 12-0) |
| 204 | VoidMercy.battlecode-2019-bot | field | 209 | 178 | 69 | 24-45 |  |
| 205 | RyanSharafuddin.Battlecode_2019 | field | 199 | 166 | 96 | 31-65 |  |
| 206 | jbiewend.Battlecode2019 | field | 188 | 175 | 75 | 25-50 |  |
| 207 | ryanhzhao.Battlecode-2019 | field | 33 | 195 | 69 | 19-50 |  |
| 208 | djkeyes.bc19 | field | -115 | 186 | 72 | 17-55 |  |
| 209 | yunaganyh.bc19 | field | -158 | 196 | 72 | 18-54 |  |
| 210 | jshin313.battlecodebot | field | -294 | 195 | 72 | 15-57 |  |
| 211 | TheRobotCarlson.battlehac~323871 | field | -306 | 190 | 96 | 20-76 |  |
| 212 | jamesrayman.HCN-basic-bot | field | -363 | 204 | 69 | 11-58 |  |
| 213 | ArtemUstilov.bc19_CrazyTapok | field | -798 | 1084 | 81 | 0-81 |  |

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
| m-schier.battlecode-2019-wololo | cand:h206 | 6 | 4-2 | 67% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h127 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h103 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h136 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h135 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v7 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
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
| cand:h206 | uvafan.bc2019 | 6 | 3-3 | 50% | replica |
| cand:h206 | StoneT2000.BC19-botfinalsafe | 6 | 5-1 | 83% | replica |
| cand:h206 | StoneT2000.BC19-bot1v43 | 6 | 4-2 | 67% | replica |
| cand:h206 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| cand:h206 | awesomelemonade.Battlecode2019 | 6 | 6-0 | 100% | replica |
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
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | us:v10 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v11 | 12 | 9-3 | 75% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | j-mao.battlecode-2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h190 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h193 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
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
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
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
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 9 | 2-7 | 22% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 9 | 4-5 | 44% | replica |
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
| VoidMercy.battlecode-2019~e7dc06 | arya-k.bc19 | 3 | 0-3 | 0% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v11 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | us:v10 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v11 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h190 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h193 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | virenvshah.Battlecode2019 | 6 | 3-3 | 50% | replica |
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
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
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
| arya-k.bc19 | us:v11 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | moreda-a.BC2019-a31 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | us:v8 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 6 | 3-3 | 50% | replica |
| arya-k.bc19 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
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
| us:v11 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v11 | IanCoolidge0.battlecode20~f649f3 | 6 | 4-2 | 67% | replica |
| us:v11 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| us:v11 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h150 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h150 | us:v8 | 40 | 25-15 | 62% | local |
| cand:h150 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h150 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-bot1v43 | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h190 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h193 | 6 | 4-2 | 67% | replica |
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
| StoneT2000.BC19-bot1v43 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-bot1v43 | vineetparikh.BigRedBattle~fe3459 | 3 | 0-3 | 0% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
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
| moreda-a.BC2019-a31 | us:v8 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
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
| rafekruse.Battlecode-2019~2680d4 | IanCoolidge0.battlecode20~f649f3 | 3 | 0-3 | 0% | replica |
| rafekruse.Battlecode-2019~2680d4 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 6 | 2-4 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
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
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
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
| cand:h127 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h127 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| IanCoolidge0.battlecode20~69ce88 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | awesomelemonade.Battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| vineetparikh.BigRedBattle~fe3459 | unrevre.battlecode | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| bqi343.cp-notebook | ldcWV.Battlecode-2019 | 3 | 0-3 | 0% | replica |
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
| cand:h136 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
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
| unrevre.battlecode | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | ldcWV.Battlecode-2019 | 6 | 2-4 | 33% | replica |
| cemondr.BC19pdxgroup4 | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 3-3 | 50% | replica |
| ldcWV.Battlecode-2019 | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| ldcWV.Battlecode-2019 | Tom-CCS.BC19 | 6 | 5-1 | 83% | replica |
| ldcWV.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | cvxluo.battlecode19 | 6 | 6-0 | 100% | replica |
| ldcWV.Battlecode-2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
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
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
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
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
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
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| ovkulkarni.battlecode2019~0aa607 | NielsKornerup.Battlecode-2019 | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-davjasdiv | 6 | 2-4 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-seeding | 6 | 6-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 6 | 5-1 | 83% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~0aa607 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 9 | 6-3 | 67% | replica |
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
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
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
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| dmunozc.bc19-g8-davjasdiv | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
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
| howard36.Battlecode2019-eco6 | m4reko.bc2019-tmores-angels | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 6 | 3-3 | 50% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | moreda-a.BC2019-t15 | 6 | 0-6 | 0% | replica |
| howard36.Battlecode2019-eco6 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | programjames.BC19Bot-seeding | 6 | 3-3 | 50% | replica |
| m4reko.bc2019-tmores-angels | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
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
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | ipercyNC.group6-battlecode | 9 | 6-3 | 67% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 6 | 4-2 | 67% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | programjames.BC19Bot-root | 3 | 0-3 | 0% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
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
| CS554-software-engineerin~a575dc | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| ipercyNC.group6-battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 6 | 4-2 | 67% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 6 | 3-3 | 50% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 6 | 6-0 | 100% | replica |
| sunanth123.battlecode19-prorush | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | spachava753.bc19 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
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
| programjames.BC19Bot-root | cvxluo.battlecode19 | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-root | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | liwanlin41.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| twitu.bc19-tsp | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | JasonLarson44.2019-Battle~1c7639 | 6 | 5-1 | 83% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| vicennial.BattleCode19 | spachava753.bc19 | 6 | 4-2 | 67% | replica |
| vicennial.BattleCode19 | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| vicennial.BattleCode19 | jamesrayman.HCN-bot | 6 | 6-0 | 100% | replica |
| vicennial.BattleCode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 6 | 3-3 | 50% | replica |
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
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 6 | 5-1 | 83% | replica |
| evanyeyeye.battlecode2019~af562c | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bayoumi17m.BattleCode-2019 | 3 | 0-3 | 0% | replica |
| spachava753.bc19 | JasonLarson44.2019-Battle~1c7639 | 3 | 0-3 | 0% | replica |
| spachava753.bc19 | jamesrayman.HCN-bot | 6 | 4-2 | 67% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 6 | 5-1 | 83% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jamesrayman.HCN-bot | 6 | 1-5 | 17% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 6 | 5-1 | 83% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jamesrayman.HCN-bot | 6 | 3-3 | 50% | replica |
| JasonLarson44.2019-Battle~1c7639 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | rooneyshuman.Battlecode | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e1c2fb | 6 | 3-3 | 50% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
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
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e37b3e | 6 | 3-3 | 50% | replica |
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
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | TestSubjector.BattleCode2~fb22c7 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 9 | 6-3 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | CometsTech.battlecode2019~187e8c | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e1c2fb | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | TestSubjector.BattleCode2~fb22c7 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 6 | 3-3 | 50% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 6 | 2-4 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
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
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 9 | 9-0 | 100% | replica |
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
| DivyanshuSaxena.Battlecode | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 9 | 3-6 | 33% | replica |
| bc19-starter | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| bc19-starter | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| bc19-starter | yunaganyh.bc19 | 3 | 2-1 | 67% | replica |
| bc19-starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | RyanSharafuddin.Battlecode_2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 6 | 6-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 9 | 8-1 | 89% | replica |
| VoidMercy.battlecode-2019-bot | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
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
