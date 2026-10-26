# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-25 18:55 PDT.

7408 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 1498 of ours on the galaxy replica and 2667 between field bots there (2664 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 201 players; compare them only within this fit.

**Thin field.** 89 rated field bots (m-schier.battlecode-2019-wololo, mvpatel2000.Battlecode2019, uvafan.bc2019, VoidMercy.battlecode-2019~e7dc06, rafekruse.Battlecode-2019-bc19, yujinwunz.battlecode_2019, StoneT2000.BC19-botfinalsafe, j-mao.battlecode-2019, StoneT2000.BC19-bot1v43, arya-k.bc19, moreda-a.BC2019-a31, awesomelemonade.Battlecode2019, IanCoolidge0.battlecode20~69ce88, bqi343.cp-notebook, IanCoolidge0.battlecode20~f649f3, virenvshah.Battlecode2019, rafekruse.Battlecode-2019~2680d4, unrevre.battlecode, cemondr.BC19pdxgroup4, vineetparikh.BigRedBattle~fe3459, UpperArlingtonHighSchool.~682aa9, IvanGeffner.BC19-bot6b, ldcWV.Battlecode-2019, IvanGeffner.BC19-eigthbot, NielsKornerup.Battlecode-2019, Nischay-Pro.BattleCode2019, dmunozc.bc19-g8-bots, ovkulkarni.battlecode2019~0aa607, dmunozc.bc19-g8-davjasdiv, lschaberg.bc19, programjames.BC19Bot-seeding, m4reko.bc2019-tmores-angels, abcdefguan.battlecode2019, howard36.Battlecode2019-eco6, ovkulkarni.battlecode2019~06c610, Tom-CCS.BC19, 18dcb01.Battlecode19-prea~fb5c48, ipercyNC.group6-battlecode, CS554-software-engineerin~a575dc, moreda-a.BC2019-t15, sunanth123.battlecode19-prorush, programjames.BC19Bot-root, Nydroam.BatteredCod, nthistle.battlecode-2019, CometsTech.battlecode2019, cvxluo.battlecode19, vicennial.BattleCode19, evanyeyeye.battlecode2019~af562c, sunanth123.battlecode19-mainbot, twitu.bc19-tsp, bayoumi17m.BattleCode-2019, JasonLarson44.2019-Battle~1c7639, jamesrayman.HCN-bot, spachava753.bc19, TestSubjector.BattleCode2~e6de74, haydenshively.Battle-Code~e1c2fb, UpperArlingtonHighSchool.~5e7875, dndoja.battlecode19, rooneyshuman.Battlecode, CometsTech.battlecode2019~187e8c, haydenshively.Battle-Code~e37b3e, roy-love.onshoreBattleCode2019, TestSubjector.BattleCode2~fb22c7, jackliu612.Battlecode19, 18dcb01.Battlecode19-robot2, dgh2.bc19-t1, asunathanr.asu_bc, liwanlin41.examplefuncsplayer, SethKitchen.examplefuncsplayer, VictorButoi.BattleCode201~c4576b, jyurkanin.corn_bc19, OmarTahoun.battle-code, howard36.Battlecode2019-sprint, waylon531.scala_starter, nhard.examplefuncsplayer, bovard.battlecode-2019-un~8822c3, vishwasns99.BC_2019, DivyanshuSaxena.Battlecode, jbiewend.Battlecode2019, bc19-starter, VoidMercy.battlecode-2019-bot, RyanSharafuddin.Battlecode_2019, ryanhzhao.Battlecode-2019, djkeyes.bc19, yunaganyh.bc19, TheRobotCarlson.battlehac~323871, jshin313.battlecodebot, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1610 ± 226 | 82 of 201 | 38 | 33-5 | 75.8% | 29.4% (vs 18) |
| v1 | accepted | 1459 ± 141 | 131 of 201 | 154 | 128-26 | 66.0% | 26.4% (vs 32) |
| v2 | accepted | 1442 ± 142 | 134 of 201 | 62 | 30-32 | 64.8% | 25.5% (vs 33) |
| v3 | accepted | 1610 ± 101 | 83 of 201 | 191 | 140-51 | 75.8% | 29.4% (vs 18) |
| v4 | accepted | 1369 ± 107 | 144 of 201 | 220 | 83-137 | 59.9% | 21.6% (vs 37) |
| v5 | accepted | 1512 ± 74 | 113 of 201 | 439 | 202-237 | 69.5% | 26.6% (vs 26) |
| v6 | accepted | 1538 ± 69 | 109 of 201 | 322 | 130-192 | 71.2% | 27.6% (vs 24) |
| v7 | accepted | 1674 ± 50 | 59 of 201 | 1804 | 927-877 | 79.6% | 29.9% (vs 13) |
| v8 | accepted | 1731 ± 66 | 32 of 201 | 356 | 160-196 | 82.7% | 29.4% (vs 9) |
| v9 | accepted | 1815 ± 114 | 12 of 201 | 48 | 21-27 | 86.9% | 35.7% (vs 7) |
| v10 | accepted | 1805 ± 127 | 14 of 201 | 36 | 17-19 | 86.4% | 34.4% (vs 7) |
| block | candidate | 1743 ± 162 | 27 of 201 | 20 | 12-8 | 83.4% | 30.7% (vs 9) |
| camp | candidate | 1743 ± 162 | 28 of 201 | 20 | 12-8 | 83.4% | 30.7% (vs 9) |
| h100 | candidate | 1664 ± 69 | 63 of 201 | 200 | 97-103 | 79.0% | 30.2% (vs 14) |
| h101 | candidate | 1639 ± 118 | 70 of 201 | 40 | 18-22 | 77.5% | 28.7% (vs 15) |
| h103 | candidate | 1692 ± 92 | 52 of 201 | 76 | 33-43 | 80.6% | 30.3% (vs 12) |
| h104 | candidate | 1704 ± 102 | 46 of 201 | 58 | 28-30 | 81.3% | 31.7% (vs 12) |
| h107 | candidate | 1585 ± 121 | 93 of 201 | 40 | 15-25 | 74.2% | 29.9% (vs 21) |
| h110 | candidate | 1621 ± 119 | 77 of 201 | 40 | 17-23 | 76.5% | 28.2% (vs 16) |
| h111 | candidate | 1704 ± 102 | 47 of 201 | 58 | 28-30 | 81.3% | 31.7% (vs 12) |
| h112 | candidate | 1704 ± 102 | 48 of 201 | 58 | 28-30 | 81.3% | 31.7% (vs 12) |
| h113 | candidate | 1621 ± 119 | 78 of 201 | 40 | 17-23 | 76.5% | 28.2% (vs 16) |
| h114 | candidate | 1603 ± 120 | 85 of 201 | 40 | 16-24 | 75.4% | 29.8% (vs 19) |
| h115 | candidate | 1691 ± 118 | 53 of 201 | 40 | 21-19 | 80.6% | 30.2% (vs 12) |
| h116 | candidate | 1603 ± 120 | 86 of 201 | 40 | 16-24 | 75.4% | 29.8% (vs 19) |
| h118 | candidate | 1674 ± 118 | 60 of 201 | 40 | 20-20 | 79.6% | 29.8% (vs 13) |
| h11c | candidate | 1557 ± 179 | 104 of 201 | 25 | 15-10 | 72.4% | 28.6% (vs 23) |
| h121 | candidate | 1653 ± 103 | 68 of 201 | 58 | 24-34 | 78.4% | 30.3% (vs 15) |
| h123 | candidate | 1640 ± 103 | 69 of 201 | 58 | 23-35 | 77.6% | 28.9% (vs 15) |
| h124 | candidate | 1639 ± 118 | 71 of 201 | 40 | 18-22 | 77.5% | 28.7% (vs 15) |
| h125 | candidate | 1639 ± 118 | 72 of 201 | 40 | 18-22 | 77.5% | 28.7% (vs 15) |
| h126 | candidate | 1710 ± 88 | 43 of 201 | 98 | 49-49 | 81.6% | 32.3% (vs 12) |
| h127 | candidate | 1699 ± 88 | 49 of 201 | 98 | 47-51 | 81.0% | 31.1% (vs 12) |
| h128 | candidate | 1769 ± 108 | 21 of 201 | 54 | 23-31 | 84.7% | 33.9% (vs 9) |
| h129 | candidate | 1506 ± 129 | 120 of 201 | 40 | 11-29 | 69.1% | 26.0% (vs 26) |
| h130 | candidate | 1717 ± 102 | 40 of 201 | 58 | 29-29 | 82.0% | 31.6% (vs 11) |
| h131 | candidate | 1691 ± 118 | 54 of 201 | 40 | 21-19 | 80.6% | 30.2% (vs 12) |
| h132 | candidate | 1726 ± 119 | 35 of 201 | 40 | 23-17 | 82.5% | 30.9% (vs 10) |
| h133 | candidate | 1708 ± 118 | 44 of 201 | 40 | 22-18 | 81.5% | 32.2% (vs 12) |
| h134 | candidate | 1566 ± 122 | 99 of 201 | 40 | 14-26 | 73.0% | 29.6% (vs 23) |
| h135 | candidate | 1679 ± 102 | 58 of 201 | 58 | 26-32 | 79.9% | 30.4% (vs 13) |
| h136 | candidate | 1682 ± 92 | 57 of 201 | 76 | 32-44 | 80.1% | 30.7% (vs 13) |
| h137 | candidate | 1639 ± 118 | 73 of 201 | 40 | 18-22 | 77.5% | 28.7% (vs 15) |
| h138 | candidate | 1691 ± 118 | 55 of 201 | 40 | 21-19 | 80.6% | 30.2% (vs 12) |
| h139 | candidate | 1732 ± 91 | 31 of 201 | 76 | 37-39 | 82.8% | 29.5% (vs 9) |
| h140 | candidate | 1730 ± 102 | 33 of 201 | 58 | 30-28 | 82.7% | 29.3% (vs 9) |
| h141 | candidate | 1743 ± 102 | 26 of 201 | 58 | 31-27 | 83.4% | 30.8% (vs 9) |
| h142 | candidate | 1708 ± 118 | 45 of 201 | 40 | 22-18 | 81.5% | 32.2% (vs 12) |
| h143 | candidate | 1744 ± 120 | 25 of 201 | 40 | 24-16 | 83.4% | 30.9% (vs 9) |
| h144 | candidate | 1585 ± 121 | 94 of 201 | 40 | 15-25 | 74.2% | 29.9% (vs 21) |
| h145 | candidate | 1783 ± 106 | 20 of 201 | 58 | 31-27 | 85.3% | 35.6% (vs 9) |
| h146 | candidate | 1745 ± 106 | 23 of 201 | 58 | 28-30 | 83.5% | 31.0% (vs 9) |
| h147 | candidate | 1821 ± 107 | 10 of 201 | 58 | 34-24 | 87.1% | 34.1% (vs 6) |
| h148 | candidate | 1804 ± 81 | 15 of 201 | 112 | 58-54 | 86.3% | 34.3% (vs 7) |
| h149 | candidate | 1745 ± 106 | 24 of 201 | 58 | 28-30 | 83.5% | 31.0% (vs 9) |
| h150 | candidate | 1795 ± 107 | 16 of 201 | 58 | 32-26 | 85.9% | 33.2% (vs 7) |
| h151 | candidate | 1695 ± 126 | 51 of 201 | 40 | 18-22 | 80.8% | 30.6% (vs 12) |
| h157 | candidate | 1739 ± 129 | 29 of 201 | 36 | 14-22 | 83.1% | 30.3% (vs 9) |
| h159 | candidate | 1794 ± 95 | 17 of 201 | 72 | 33-39 | 85.9% | 33.2% (vs 7) |
| h161 | candidate | 1739 ± 129 | 30 of 201 | 36 | 14-22 | 83.1% | 30.3% (vs 9) |
| h162 | candidate | 1716 ± 131 | 41 of 201 | 36 | 13-23 | 81.9% | 31.5% (vs 11) |
| h163 | candidate | 1806 ± 82 | 13 of 201 | 108 | 51-57 | 86.4% | 34.5% (vs 7) |
| h167 | candidate | 1849 ± 96 | 7 of 201 | 72 | 38-34 | 88.3% | 37.6% (vs 6) |
| h16r | candidate | 1299 ± 152 | 148 of 201 | 40 | 16-24 | 55.3% | 18.3% (vs 40) |
| h170 | candidate | 1761 ± 128 | 22 of 201 | 36 | 15-21 | 84.3% | 32.9% (vs 9) |
| h175 | candidate | 1838 ± 95 | 8 of 201 | 72 | 37-35 | 87.9% | 36.2% (vs 6) |
| h178 | candidate | 1833 ± 114 | 9 of 201 | 48 | 23-25 | 87.7% | 35.6% (vs 6) |
| h18 | candidate | 1289 ± 195 | 149 of 201 | 25 | 6-19 | 54.6% | 17.5% (vs 40) |
| h2 | candidate | 1559 ± 152 | 102 of 201 | 54 | 25-29 | 72.6% | 28.8% (vs 23) |
| h24 | candidate | 1476 ± 154 | 126 of 201 | 40 | 26-14 | 67.1% | 25.8% (vs 29) |
| h24v5 | candidate | 1564 ± 131 | 100 of 201 | 40 | 23-17 | 72.9% | 29.4% (vs 23) |
| h3 | candidate | 1541 ± 216 | 107 of 201 | 19 | 9-10 | 71.4% | 26.9% (vs 23) |
| h31 | candidate | 1458 ± 153 | 132 of 201 | 40 | 25-15 | 65.9% | 26.3% (vs 32) |
| h38 | candidate | 1490 ± 306 | 121 of 201 | 6 | 4-2 | 68.0% | 24.4% (vs 26) |
| h40 | candidate | 1558 ± 291 | 103 of 201 | 8 | 6-2 | 72.5% | 28.7% (vs 23) |
| h41 | candidate | 1425 ± 255 | 136 of 201 | 8 | 3-5 | 63.7% | 23.9% (vs 33) |
| h42 | candidate | 1425 ± 255 | 137 of 201 | 8 | 3-5 | 63.7% | 23.9% (vs 33) |
| h43 | candidate | 1512 ± 248 | 114 of 201 | 8 | 4-4 | 69.5% | 26.6% (vs 26) |
| h44 | candidate | 1697 ± 281 | 50 of 201 | 8 | 6-2 | 80.9% | 30.9% (vs 12) |
| h46 | candidate | 1425 ± 255 | 138 of 201 | 8 | 3-5 | 63.7% | 23.9% (vs 33) |
| h47 | candidate | 1512 ± 248 | 115 of 201 | 8 | 4-4 | 69.5% | 26.6% (vs 26) |
| h48 | candidate | 1512 ± 248 | 116 of 201 | 8 | 4-4 | 69.5% | 26.6% (vs 26) |
| h49 | candidate | 1512 ± 248 | 117 of 201 | 8 | 4-4 | 69.5% | 26.6% (vs 26) |
| h52 | candidate | 1425 ± 255 | 139 of 201 | 8 | 3-5 | 63.7% | 23.9% (vs 33) |
| h53 | candidate | 1598 ± 255 | 87 of 201 | 8 | 5-3 | 75.1% | 29.3% (vs 19) |
| h54 | candidate | 1585 ± 124 | 92 of 201 | 48 | 29-19 | 74.2% | 29.9% (vs 21) |
| h55 | candidate | 1556 ± 122 | 105 of 201 | 56 | 32-24 | 72.4% | 28.5% (vs 23) |
| h58 | candidate | 1468 ± 272 | 129 of 201 | 8 | 3-5 | 66.6% | 26.5% (vs 31) |
| h59 | candidate | 1512 ± 248 | 118 of 201 | 8 | 4-4 | 69.5% | 26.6% (vs 26) |
| h6 | candidate | 1487 ± 116 | 123 of 201 | 158 | 94-64 | 67.8% | 25.1% (vs 27) |
| h60 | candidate | 1512 ± 248 | 119 of 201 | 8 | 4-4 | 69.5% | 26.6% (vs 26) |
| h61 | candidate | 1624 ± 253 | 76 of 201 | 8 | 5-3 | 76.6% | 28.4% (vs 16) |
| h63 | candidate | 1590 ± 128 | 90 of 201 | 40 | 23-17 | 74.5% | 30.4% (vs 21) |
| h64 | candidate | 1573 ± 128 | 98 of 201 | 40 | 22-18 | 73.4% | 30.3% (vs 23) |
| h68 | candidate | 1722 ± 279 | 37 of 201 | 8 | 6-2 | 82.3% | 32.2% (vs 11) |
| h7 | candidate | 1516 ± 1458 | 112 of 201 | 8 | 8-0 | 69.7% | 27.0% (vs 26) |
| h72 | candidate | 1722 ± 279 | 38 of 201 | 8 | 6-2 | 82.3% | 32.2% (vs 11) |
| h76 | candidate | 1665 ± 185 | 62 of 201 | 32 | 18-14 | 79.1% | 30.3% (vs 14) |
| h77 | candidate | 1549 ± 187 | 106 of 201 | 16 | 8-8 | 71.9% | 27.7% (vs 23) |
| h78 | candidate | 1722 ± 279 | 39 of 201 | 8 | 6-2 | 82.3% | 32.2% (vs 11) |
| h82 | candidate | 1624 ± 97 | 75 of 201 | 134 | 70-64 | 76.6% | 28.5% (vs 16) |
| h83 | candidate | 1661 ± 299 | 65 of 201 | 8 | 4-4 | 78.9% | 31.2% (vs 15) |
| h84 | candidate | 1661 ± 299 | 66 of 201 | 8 | 4-4 | 78.9% | 31.2% (vs 15) |
| h88 | candidate | 1589 ± 144 | 91 of 201 | 40 | 18-22 | 74.5% | 30.3% (vs 21) |
| h89 | candidate | 796 ± 1086 | 179 of 201 | 8 | 0-8 | 28.1% | 9.2% (vs 68) |
| h8v5 | candidate | 1616 ± 126 | 80 of 201 | 48 | 31-17 | 76.2% | 28.9% (vs 17) |
| h90 | candidate | 796 ± 1086 | 180 of 201 | 8 | 0-8 | 28.1% | 9.2% (vs 68) |
| h91 | candidate | 1579 ± 195 | 96 of 201 | 16 | 7-9 | 73.9% | 30.2% (vs 22) |
| h96 | candidate | 1653 ± 103 | 67 of 201 | 58 | 24-34 | 78.4% | 30.3% (vs 15) |
| rush | sparring | 1289 ± 195 | 150 of 201 | 25 | 6-19 | 54.6% | 17.5% (vs 40) |
| rush4 | sparring | 1561 ± 134 | 101 of 201 | 50 | 30-20 | 72.7% | 29.0% (vs 23) |
| turtle | candidate | 1434 ± 194 | 135 of 201 | 20 | 4-16 | 64.3% | 24.7% (vs 33) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 121 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 4165 games (11 archive games skipped, 490 matches from archives, 888 matches from scores), fetched 2026-10-26T02:25:11+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34), v10 = h175 (72 games, 37-35). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v10) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | m-schier.battlecode-2019-wololo | field | 2058 | 72 | 264 | 223-41 | 17% (v10 1-5) |
| 2 | mvpatel2000.Battlecode2019 | field | 2045 | 129 | 63 | 52-11 | 33% (v9 1-2) |
| 3 | uvafan.bc2019 | field | 1924 | 64 | 261 | 190-71 | 33% (v10 2-4) |
| 4 | VoidMercy.battlecode-2019~e7dc06 | field | 1879 | 132 | 54 | 41-13 | 67% (v9 2-1) |
| 5 | rafekruse.Battlecode-2019-bc19 | field | 1877 | 121 | 57 | 41-16 | 0% (v8 0-3) |
| 6 | yujinwunz.battlecode_2019 | field | 1867 | 118 | 72 | 52-20 | 0% (v8 0-3) |
| 7 | **cand:h167** | candidate | 1849 | 96 | 72 | 38-34 |  |
| 8 | **cand:h175** | candidate | 1838 | 95 | 72 | 37-35 |  |
| 9 | **cand:h178** | candidate | 1833 | 114 | 48 | 23-25 |  |
| 10 | **cand:h147** | candidate | 1821 | 107 | 58 | 34-24 |  |
| 11 | StoneT2000.BC19-botfinalsafe | field | 1818 | 59 | 279 | 175-104 | 33% (v10 2-4) |
| 12 | **us:v9** | accepted | 1815 | 114 | 48 | 21-27 |  |
| 13 | **cand:h163** | candidate | 1806 | 82 | 108 | 51-57 |  |
| 14 | **us:v10** | accepted | 1805 | 127 | 36 | 17-19 |  |
| 15 | **cand:h148** | candidate | 1804 | 81 | 112 | 58-54 |  |
| 16 | **cand:h150** | candidate | 1795 | 107 | 58 | 32-26 |  |
| 17 | **cand:h159** | candidate | 1794 | 95 | 72 | 33-39 |  |
| 18 | j-mao.battlecode-2019 | field | 1790 | 120 | 54 | 36-18 | 100% (v8 3-0) |
| 19 | StoneT2000.BC19-bot1v43 | field | 1788 | 59 | 282 | 164-118 | 50% (v10 3-3) |
| 20 | **cand:h145** | candidate | 1783 | 106 | 58 | 31-27 |  |
| 21 | **cand:h128** | candidate | 1769 | 108 | 54 | 23-31 |  |
| 22 | **cand:h170** | candidate | 1761 | 128 | 36 | 15-21 |  |
| 23 | **cand:h146** | candidate | 1745 | 106 | 58 | 28-30 |  |
| 24 | **cand:h149** | candidate | 1745 | 106 | 58 | 28-30 |  |
| 25 | **cand:h143** | candidate | 1744 | 120 | 40 | 24-16 |  |
| 26 | **cand:h141** | candidate | 1743 | 102 | 58 | 31-27 |  |
| 27 | **cand:block** | candidate | 1743 | 162 | 20 | 12-8 |  |
| 28 | **cand:camp** | candidate | 1743 | 162 | 20 | 12-8 |  |
| 29 | **cand:h157** | candidate | 1739 | 129 | 36 | 14-22 |  |
| 30 | **cand:h161** | candidate | 1739 | 129 | 36 | 14-22 |  |
| 31 | **cand:h139** | candidate | 1732 | 91 | 76 | 37-39 |  |
| 32 | **us:v8** | accepted | 1731 | 66 | 356 | 160-196 |  |
| 33 | **cand:h140** | candidate | 1730 | 102 | 58 | 30-28 |  |
| 34 | arya-k.bc19 | field | 1729 | 125 | 51 | 34-17 | 100% (v8 3-0) |
| 35 | **cand:h132** | candidate | 1726 | 119 | 40 | 23-17 |  |
| 36 | moreda-a.BC2019-a31 | field | 1725 | 114 | 63 | 43-20 | 67% (v8 2-1) |
| 37 | **cand:h68** | candidate | 1722 | 279 | 8 | 6-2 |  |
| 38 | **cand:h72** | candidate | 1722 | 279 | 8 | 6-2 |  |
| 39 | **cand:h78** | candidate | 1722 | 279 | 8 | 6-2 |  |
| 40 | **cand:h130** | candidate | 1717 | 102 | 58 | 29-29 |  |
| 41 | **cand:h162** | candidate | 1716 | 131 | 36 | 13-23 |  |
| 42 | awesomelemonade.Battlecode2019 | field | 1712 | 59 | 261 | 126-135 | 67% (v10 4-2) |
| 43 | **cand:h126** | candidate | 1710 | 88 | 98 | 49-49 |  |
| 44 | **cand:h133** | candidate | 1708 | 118 | 40 | 22-18 |  |
| 45 | **cand:h142** | candidate | 1708 | 118 | 40 | 22-18 |  |
| 46 | **cand:h104** | candidate | 1704 | 102 | 58 | 28-30 |  |
| 47 | **cand:h111** | candidate | 1704 | 102 | 58 | 28-30 |  |
| 48 | **cand:h112** | candidate | 1704 | 102 | 58 | 28-30 |  |
| 49 | **cand:h127** | candidate | 1699 | 88 | 98 | 47-51 |  |
| 50 | **cand:h44** | candidate | 1697 | 281 | 8 | 6-2 |  |
| 51 | **cand:h151** | candidate | 1695 | 126 | 40 | 18-22 |  |
| 52 | **cand:h103** | candidate | 1692 | 92 | 76 | 33-43 |  |
| 53 | **cand:h115** | candidate | 1691 | 118 | 40 | 21-19 |  |
| 54 | **cand:h131** | candidate | 1691 | 118 | 40 | 21-19 |  |
| 55 | **cand:h138** | candidate | 1691 | 118 | 40 | 21-19 |  |
| 56 | IanCoolidge0.battlecode20~69ce88 | field | 1687 | 58 | 267 | 120-147 | 83% (v10 5-1) |
| 57 | **cand:h136** | candidate | 1682 | 92 | 76 | 32-44 |  |
| 58 | **cand:h135** | candidate | 1679 | 102 | 58 | 26-32 |  |
| 59 | **us:v7** | accepted | 1674 | 50 | 1804 | 927-877 |  |
| 60 | **cand:h118** | candidate | 1674 | 118 | 40 | 20-20 |  |
| 61 | bqi343.cp-notebook | field | 1668 | 130 | 51 | 34-17 |  |
| 62 | **cand:h76** | candidate | 1665 | 185 | 32 | 18-14 |  |
| 63 | **cand:h100** | candidate | 1664 | 69 | 200 | 97-103 |  |
| 64 | IanCoolidge0.battlecode20~f649f3 | field | 1662 | 111 | 75 | 48-27 | 100% (v8 3-0) |
| 65 | **cand:h83** | candidate | 1661 | 299 | 8 | 4-4 |  |
| 66 | **cand:h84** | candidate | 1661 | 299 | 8 | 4-4 |  |
| 67 | **cand:h96** | candidate | 1653 | 103 | 58 | 24-34 |  |
| 68 | **cand:h121** | candidate | 1653 | 103 | 58 | 24-34 |  |
| 69 | **cand:h123** | candidate | 1640 | 103 | 58 | 23-35 |  |
| 70 | **cand:h101** | candidate | 1639 | 118 | 40 | 18-22 |  |
| 71 | **cand:h124** | candidate | 1639 | 118 | 40 | 18-22 |  |
| 72 | **cand:h125** | candidate | 1639 | 118 | 40 | 18-22 |  |
| 73 | **cand:h137** | candidate | 1639 | 118 | 40 | 18-22 |  |
| 74 | virenvshah.Battlecode2019 | field | 1632 | 127 | 54 | 36-18 |  |
| 75 | **cand:h82** | candidate | 1624 | 97 | 134 | 70-64 |  |
| 76 | **cand:h61** | candidate | 1624 | 253 | 8 | 5-3 |  |
| 77 | **cand:h110** | candidate | 1621 | 119 | 40 | 17-23 |  |
| 78 | **cand:h113** | candidate | 1621 | 119 | 40 | 17-23 |  |
| 79 | rafekruse.Battlecode-2019~2680d4 | field | 1616 | 129 | 45 | 29-16 |  |
| 80 | **cand:h8v5** | candidate | 1616 | 126 | 48 | 31-17 |  |
| 81 | unrevre.battlecode | field | 1615 | 136 | 48 | 33-15 |  |
| 82 | **us:v0** | accepted | 1610 | 226 | 38 | 33-5 |  |
| 83 | **us:v3** | accepted | 1610 | 101 | 191 | 140-51 |  |
| 84 | cemondr.BC19pdxgroup4 | field | 1606 | 132 | 48 | 31-17 |  |
| 85 | **cand:h114** | candidate | 1603 | 120 | 40 | 16-24 |  |
| 86 | **cand:h116** | candidate | 1603 | 120 | 40 | 16-24 |  |
| 87 | **cand:h53** | candidate | 1598 | 255 | 8 | 5-3 |  |
| 88 | vineetparikh.BigRedBattle~fe3459 | field | 1592 | 120 | 57 | 36-21 |  |
| 89 | UpperArlingtonHighSchool.~682aa9 | field | 1591 | 138 | 54 | 36-18 |  |
| 90 | **cand:h63** | candidate | 1590 | 128 | 40 | 23-17 |  |
| 91 | **cand:h88** | candidate | 1589 | 144 | 40 | 18-22 |  |
| 92 | **cand:h54** | candidate | 1585 | 124 | 48 | 29-19 |  |
| 93 | **cand:h107** | candidate | 1585 | 121 | 40 | 15-25 |  |
| 94 | **cand:h144** | candidate | 1585 | 121 | 40 | 15-25 |  |
| 95 | IvanGeffner.BC19-bot6b | field | 1584 | 376 | 9 | 7-2 |  |
| 96 | **cand:h91** | candidate | 1579 | 195 | 16 | 7-9 |  |
| 97 | ldcWV.Battlecode-2019 | field | 1579 | 123 | 54 | 33-21 |  |
| 98 | **cand:h64** | candidate | 1573 | 128 | 40 | 22-18 |  |
| 99 | **cand:h134** | candidate | 1566 | 122 | 40 | 14-26 |  |
| 100 | **cand:h24v5** | candidate | 1564 | 131 | 40 | 23-17 |  |
| 101 | **spar:rush4** | sparring | 1561 | 134 | 50 | 30-20 |  |
| 102 | **cand:h2** | candidate | 1559 | 152 | 54 | 25-29 |  |
| 103 | **cand:h40** | candidate | 1558 | 291 | 8 | 6-2 |  |
| 104 | **cand:h11c** | candidate | 1557 | 179 | 25 | 15-10 |  |
| 105 | **cand:h55** | candidate | 1556 | 122 | 56 | 32-24 |  |
| 106 | **cand:h77** | candidate | 1549 | 187 | 16 | 8-8 |  |
| 107 | **cand:h3** | candidate | 1541 | 216 | 19 | 9-10 |  |
| 108 | IvanGeffner.BC19-eigthbot | field | 1539 | 301 | 9 | 6-3 |  |
| 109 | **us:v6** | accepted | 1538 | 69 | 322 | 130-192 |  |
| 110 | NielsKornerup.Battlecode-2019 | field | 1536 | 108 | 75 | 43-32 |  |
| 111 | Nischay-Pro.BattleCode2019 | field | 1528 | 131 | 48 | 30-18 |  |
| 112 | **cand:h7** | candidate | 1516 | 1458 | 8 | 8-0 |  |
| 113 | **us:v5** | accepted | 1512 | 74 | 439 | 202-237 |  |
| 114 | **cand:h43** | candidate | 1512 | 248 | 8 | 4-4 |  |
| 115 | **cand:h47** | candidate | 1512 | 248 | 8 | 4-4 |  |
| 116 | **cand:h48** | candidate | 1512 | 248 | 8 | 4-4 |  |
| 117 | **cand:h49** | candidate | 1512 | 248 | 8 | 4-4 |  |
| 118 | **cand:h59** | candidate | 1512 | 248 | 8 | 4-4 |  |
| 119 | **cand:h60** | candidate | 1512 | 248 | 8 | 4-4 |  |
| 120 | **cand:h129** | candidate | 1506 | 129 | 40 | 11-29 |  |
| 121 | **cand:h38** | candidate | 1490 | 306 | 6 | 4-2 |  |
| 122 | dmunozc.bc19-g8-bots | field | 1490 | 120 | 57 | 34-23 |  |
| 123 | **cand:h6** | candidate | 1487 | 116 | 158 | 94-64 |  |
| 124 | ovkulkarni.battlecode2019~0aa607 | field | 1482 | 122 | 51 | 32-19 |  |
| 125 | dmunozc.bc19-g8-davjasdiv | field | 1480 | 119 | 60 | 35-25 |  |
| 126 | **cand:h24** | candidate | 1476 | 154 | 40 | 26-14 |  |
| 127 | lschaberg.bc19 | field | 1475 | 118 | 60 | 33-27 |  |
| 128 | programjames.BC19Bot-seeding | field | 1470 | 132 | 45 | 27-18 |  |
| 129 | **cand:h58** | candidate | 1468 | 272 | 8 | 3-5 |  |
| 130 | m4reko.bc2019-tmores-angels | field | 1464 | 115 | 60 | 36-24 |  |
| 131 | **us:v1** | accepted | 1459 | 141 | 154 | 128-26 |  |
| 132 | **cand:h31** | candidate | 1458 | 153 | 40 | 25-15 |  |
| 133 | abcdefguan.battlecode2019 | field | 1447 | 130 | 57 | 31-26 |  |
| 134 | **us:v2** | accepted | 1442 | 142 | 62 | 30-32 |  |
| 135 | **cand:turtle** | candidate | 1434 | 194 | 20 | 4-16 |  |
| 136 | **cand:h41** | candidate | 1425 | 255 | 8 | 3-5 |  |
| 137 | **cand:h42** | candidate | 1425 | 255 | 8 | 3-5 |  |
| 138 | **cand:h46** | candidate | 1425 | 255 | 8 | 3-5 |  |
| 139 | **cand:h52** | candidate | 1425 | 255 | 8 | 3-5 |  |
| 140 | howard36.Battlecode2019-eco6 | field | 1423 | 119 | 57 | 26-31 |  |
| 141 | ovkulkarni.battlecode2019~06c610 | field | 1412 | 122 | 54 | 31-23 |  |
| 142 | Tom-CCS.BC19 | field | 1403 | 131 | 54 | 31-23 |  |
| 143 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1400 | 109 | 87 | 45-42 |  |
| 144 | **us:v4** | accepted | 1369 | 107 | 220 | 83-137 |  |
| 145 | ipercyNC.group6-battlecode | field | 1354 | 124 | 57 | 31-26 |  |
| 146 | CS554-software-engineerin~a575dc | field | 1325 | 82 | 278 | 165-113 | 100% (v7 3-0) |
| 147 | moreda-a.BC2019-t15 | field | 1312 | 125 | 60 | 32-28 |  |
| 148 | **cand:h16r** | candidate | 1299 | 152 | 40 | 16-24 |  |
| 149 | **cand:h18** | candidate | 1289 | 195 | 25 | 6-19 |  |
| 150 | **spar:rush** | sparring | 1289 | 195 | 25 | 6-19 |  |
| 151 | sunanth123.battlecode19-prorush | field | 1280 | 138 | 42 | 21-21 |  |
| 152 | programjames.BC19Bot-root | field | 1265 | 122 | 60 | 30-30 |  |
| 153 | Nydroam.BatteredCod | field | 1264 | 407 | 6 | 3-3 |  |
| 154 | nthistle.battlecode-2019 | field | 1262 | 127 | 60 | 31-29 | 100% (v5 3-0) |
| 155 | CometsTech.battlecode2019 | field | 1257 | 88 | 231 | 108-123 | 100% (v7 3-0) |
| 156 | cvxluo.battlecode19 | field | 1256 | 122 | 63 | 32-31 |  |
| 157 | vicennial.BattleCode19 | field | 1243 | 129 | 63 | 35-28 |  |
| 158 | evanyeyeye.battlecode2019~af562c | field | 1239 | 127 | 54 | 27-27 |  |
| 159 | sunanth123.battlecode19-mainbot | field | 1205 | 136 | 54 | 26-28 |  |
| 160 | twitu.bc19-tsp | field | 1194 | 139 | 57 | 33-24 |  |
| 161 | bayoumi17m.BattleCode-2019 | field | 1182 | 145 | 45 | 22-23 |  |
| 162 | JasonLarson44.2019-Battle~1c7639 | field | 1152 | 122 | 63 | 27-36 | 100% (v3 3-0) |
| 163 | jamesrayman.HCN-bot | field | 1122 | 136 | 60 | 25-35 | 100% (v5 3-0) |
| 164 | spachava753.bc19 | field | 1086 | 137 | 48 | 25-23 |  |
| 165 | TestSubjector.BattleCode2~e6de74 | field | 1026 | 152 | 60 | 28-32 |  |
| 166 | haydenshively.Battle-Code~e1c2fb | field | 991 | 135 | 51 | 20-31 |  |
| 167 | UpperArlingtonHighSchool.~5e7875 | field | 984 | 164 | 48 | 20-28 |  |
| 168 | dndoja.battlecode19 | field | 975 | 141 | 48 | 21-27 |  |
| 169 | rooneyshuman.Battlecode | field | 966 | 148 | 57 | 28-29 |  |
| 170 | CometsTech.battlecode2019~187e8c | field | 962 | 143 | 57 | 29-28 |  |
| 171 | haydenshively.Battle-Code~e37b3e | field | 956 | 145 | 54 | 23-31 |  |
| 172 | roy-love.onshoreBattleCode2019 | field | 927 | 138 | 57 | 26-31 |  |
| 173 | TestSubjector.BattleCode2~fb22c7 | field | 912 | 171 | 69 | 30-39 |  |
| 174 | jackliu612.Battlecode19 | field | 903 | 183 | 48 | 23-25 |  |
| 175 | 18dcb01.Battlecode19-robot2 | field | 893 | 159 | 60 | 23-37 |  |
| 176 | dgh2.bc19-t1 | field | 883 | 190 | 48 | 19-29 |  |
| 177 | asunathanr.asu_bc | field | 813 | 159 | 51 | 20-31 |  |
| 178 | liwanlin41.examplefuncsplayer | field | 803 | 162 | 78 | 33-45 |  |
| 179 | **cand:h89** | candidate | 796 | 1086 | 8 | 0-8 |  |
| 180 | **cand:h90** | candidate | 796 | 1086 | 8 | 0-8 |  |
| 181 | SethKitchen.examplefuncsplayer | field | 745 | 191 | 63 | 25-38 |  |
| 182 | VictorButoi.BattleCode201~c4576b | field | 696 | 160 | 51 | 19-32 |  |
| 183 | jyurkanin.corn_bc19 | field | 642 | 189 | 57 | 21-36 |  |
| 184 | OmarTahoun.battle-code | field | 626 | 156 | 63 | 22-41 |  |
| 185 | howard36.Battlecode2019-sprint | field | 600 | 176 | 51 | 18-33 |  |
| 186 | waylon531.scala_starter | field | 508 | 191 | 63 | 26-37 |  |
| 187 | nhard.examplefuncsplayer | field | 465 | 197 | 51 | 19-32 |  |
| 188 | bovard.battlecode-2019-un~8822c3 | field | 408 | 227 | 48 | 16-32 |  |
| 189 | vishwasns99.BC_2019 | field | 346 | 219 | 54 | 15-39 |  |
| 190 | DivyanshuSaxena.Battlecode | field | 306 | 204 | 69 | 26-43 |  |
| 191 | jbiewend.Battlecode2019 | field | 234 | 234 | 48 | 13-35 |  |
| 192 | bc19-starter | field | 215 | 199 | 361 | 72-289 | 100% (v3 12-0) |
| 193 | VoidMercy.battlecode-2019-bot | field | 160 | 221 | 54 | 13-41 |  |
| 194 | RyanSharafuddin.Battlecode_2019 | field | 138 | 201 | 78 | 18-60 |  |
| 195 | ryanhzhao.Battlecode-2019 | field | 76 | 238 | 54 | 12-42 |  |
| 196 | djkeyes.bc19 | field | -16 | 223 | 51 | 11-40 |  |
| 197 | yunaganyh.bc19 | field | -182 | 233 | 54 | 15-39 |  |
| 198 | TheRobotCarlson.battlehac~323871 | field | -304 | 242 | 63 | 8-55 |  |
| 199 | jshin313.battlecodebot | field | -343 | 253 | 51 | 5-46 |  |
| 200 | jamesrayman.HCN-basic-bot | field | -405 | 273 | 45 | 4-41 |  |
| 201 | ArtemUstilov.bc19_CrazyTapok | field | -834 | 1091 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| m-schier.battlecode-2019-wololo | mvpatel2000.Battlecode2019 | 6 | 1-5 | 17% | replica |
| m-schier.battlecode-2019-wololo | uvafan.bc2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | VoidMercy.battlecode-2019~e7dc06 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | yujinwunz.battlecode_2019 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h167 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h175 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h178 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | us:v9 | 9 | 7-2 | 78% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v10 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h170 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h157 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h161 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v8 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h130 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h162 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h126 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h104 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h111 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h112 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h127 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h103 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h136 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h135 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v7 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h121 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h123 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v6 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v5 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | uvafan.bc2019 | 6 | 5-1 | 83% | replica |
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 6 | 4-2 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v9 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v8 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v7 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 6-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | yujinwunz.battlecode_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h167 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | cand:h175 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h178 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v9 | 9 | 6-3 | 67% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | us:v10 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h170 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h149 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h157 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h161 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | us:v8 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h162 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | rafekruse.Battlecode-2019-bc19 | 6 | 3-3 | 50% | replica |
| VoidMercy.battlecode-2019~e7dc06 | yujinwunz.battlecode_2019 | 3 | 0-3 | 0% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v9 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019~e7dc06 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | yujinwunz.battlecode_2019 | 6 | 5-1 | 83% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-botfinalsafe | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 9 | 4-5 | 44% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | us:v8 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 6 | 2-4 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | us:v8 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| yujinwunz.battlecode_2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h167 | StoneT2000.BC19-botfinalsafe | 12 | 6-6 | 50% | replica |
| cand:h167 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h167 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| cand:h167 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h175 | StoneT2000.BC19-botfinalsafe | 12 | 7-5 | 58% | replica |
| cand:h175 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h175 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| cand:h175 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h178 | StoneT2000.BC19-botfinalsafe | 6 | 3-3 | 50% | replica |
| cand:h178 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h178 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h178 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h147 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h147 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h147 | us:v8 | 40 | 26-14 | 65% | local |
| cand:h147 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h147 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v9 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | us:v10 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h141 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h157 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h161 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h139 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v8 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h130 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h126 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | virenvshah.Battlecode2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v9 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v9 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| us:v9 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h163 | StoneT2000.BC19-bot1v43 | 18 | 8-10 | 44% | replica |
| cand:h163 | awesomelemonade.Battlecode2019 | 18 | 11-7 | 61% | replica |
| cand:h163 | IanCoolidge0.battlecode20~69ce88 | 18 | 14-4 | 78% | replica |
| us:v10 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v10 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| us:v10 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h148 | StoneT2000.BC19-bot1v43 | 12 | 7-5 | 58% | replica |
| cand:h148 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h148 | awesomelemonade.Battlecode2019 | 12 | 7-5 | 58% | replica |
| cand:h148 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h150 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h150 | us:v8 | 40 | 25-15 | 62% | local |
| cand:h150 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h150 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h159 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h159 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| cand:h159 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| j-mao.battlecode-2019 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | us:v8 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h157 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | cand:h161 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h136 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v7 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h121 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h123 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h82 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | rafekruse.Battlecode-2019~2680d4 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v3 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | us:v5 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h145 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| cand:h170 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h170 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h146 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h146 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h146 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h149 | us:v8 | 40 | 20-20 | 50% | local |
| cand:h149 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h149 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| cand:h143 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h141 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h141 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| cand:h141 | us:v7 | 40 | 25-15 | 62% | local |
| cand:block | us:v7 | 20 | 12-8 | 60% | local |
| cand:camp | us:v7 | 20 | 12-8 | 60% | local |
| cand:h157 | awesomelemonade.Battlecode2019 | 6 | 5-1 | 83% | replica |
| cand:h157 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h161 | awesomelemonade.Battlecode2019 | 6 | 3-3 | 50% | replica |
| cand:h161 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h139 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h139 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
| cand:h139 | us:v7 | 40 | 22-18 | 55% | local |
| us:v8 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| us:v8 | moreda-a.BC2019-a31 | 3 | 2-1 | 67% | replica |
| us:v8 | cand:h151 | 40 | 22-18 | 55% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| us:v8 | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h140 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| arya-k.bc19 | moreda-a.BC2019-a31 | 3 | 0-3 | 0% | replica |
| arya-k.bc19 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | bqi343.cp-notebook | 6 | 4-2 | 67% | replica |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 9 | 6-3 | 67% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h130 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h130 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h162 | awesomelemonade.Battlecode2019 | 6 | 2-4 | 33% | replica |
| cand:h162 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | cand:h126 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h104 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h127 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h136 | 6 | 2-4 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h135 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v7 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h104 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h127 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h103 | IanCoolidge0.battlecode20~69ce88 | 6 | 4-2 | 67% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h96 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h121 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h123 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h82 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | vineetparikh.BigRedBattle~fe3459 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | IvanGeffner.BC19-bot6b | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v6 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | NielsKornerup.Battlecode-2019 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h118 | 40 | 20-20 | 50% | local |
| us:v7 | cand:h100 | 200 | 103-97 | 52% | local |
| us:v7 | cand:h96 | 40 | 19-21 | 48% | local |
| us:v7 | cand:h121 | 40 | 21-19 | 52% | local |
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
| bqi343.cp-notebook | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 6 | 3-3 | 50% | replica |
| bqi343.cp-notebook | Nischay-Pro.BattleCode2019 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| IanCoolidge0.battlecode20~f649f3 | rafekruse.Battlecode-2019~2680d4 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | us:v3 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | NielsKornerup.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 9 | 5-4 | 56% | replica |
| IanCoolidge0.battlecode20~f649f3 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| unrevre.battlecode | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | ldcWV.Battlecode-2019 | 6 | 2-4 | 33% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | Nischay-Pro.BattleCode2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | ovkulkarni.battlecode2019~0aa607 | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | ldcWV.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| UpperArlingtonHighSchool.~682aa9 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 6 | 6-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
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
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| ldcWV.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| NielsKornerup.Battlecode-2019 | Nischay-Pro.BattleCode2019 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
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
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | dmunozc.bc19-g8-davjasdiv | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-bots | m4reko.bc2019-tmores-angels | 6 | 3-3 | 50% | replica |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | evanyeyeye.battlecode2019~af562c | 6 | 5-1 | 83% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-davjasdiv | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 6 | 3-3 | 50% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | lschaberg.bc19 | 6 | 2-4 | 33% | replica |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | moreda-a.BC2019-t15 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | ovkulkarni.battlecode2019~06c610 | 6 | 3-3 | 50% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| abcdefguan.battlecode2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 6 | 3-3 | 50% | replica |
| howard36.Battlecode2019-eco6 | moreda-a.BC2019-t15 | 3 | 0-3 | 0% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 3 | 0-3 | 0% | replica |
| ovkulkarni.battlecode2019~06c610 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| ipercyNC.group6-battlecode | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | liwanlin41.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | SethKitchen.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | twitu.bc19-tsp | 3 | 0-3 | 0% | replica |
| cvxluo.battlecode19 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| vicennial.BattleCode19 | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| vicennial.BattleCode19 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-mainbot | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | jamesrayman.HCN-bot | 3 | 0-3 | 0% | replica |
| bayoumi17m.BattleCode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jamesrayman.HCN-bot | 6 | 3-3 | 50% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | spachava753.bc19 | 6 | 2-4 | 33% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | UpperArlingtonHighSchool.~5e7875 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 6 | 4-2 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | CometsTech.battlecode2019~187e8c | 3 | 0-3 | 0% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 3 | 0-3 | 0% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 6 | 4-2 | 67% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | rooneyshuman.Battlecode | 9 | 6-3 | 67% | replica |
| dndoja.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019~187e8c | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | asunathanr.asu_bc | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 3 | 0-3 | 0% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | 18dcb01.Battlecode19-robot2 | 6 | 2-4 | 33% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| jackliu612.Battlecode19 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | howard36.Battlecode2019-sprint | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| asunathanr.asu_bc | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | howard36.Battlecode2019-sprint | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 6 | 6-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | jyurkanin.corn_bc19 | 6 | 3-3 | 50% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
| OmarTahoun.battle-code | howard36.Battlecode2019-sprint | 3 | 0-3 | 0% | replica |
| OmarTahoun.battle-code | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | nhard.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-sprint | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | vishwasns99.BC_2019 | 6 | 6-0 | 100% | replica |
| waylon531.scala_starter | bc19-starter | 6 | 4-2 | 67% | replica |
| waylon531.scala_starter | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| vishwasns99.BC_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 9 | 5-4 | 56% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| DivyanshuSaxena.Battlecode | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 9 | 3-6 | 33% | replica |
| bc19-starter | yunaganyh.bc19 | 3 | 2-1 | 67% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 6 | 5-1 | 83% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 9 | 9-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 9 | 4-5 | 44% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 9 | 6-3 | 67% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 6 | 4-2 | 67% | replica |
| TheRobotCarlson.battlehac~323871 | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 6 | 4-2 | 67% | replica |
