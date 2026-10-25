# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-25 04:35 PDT.

6532 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 1186 of ours on the galaxy replica and 2103 between field bots there (2100 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 196 players; compare them only within this fit.

**Thin field.** 89 rated field bots (m-schier.battlecode-2019-wololo, mvpatel2000.Battlecode2019, rafekruse.Battlecode-2019-bc19, yujinwunz.battlecode_2019, uvafan.bc2019, VoidMercy.battlecode-2019~e7dc06, StoneT2000.BC19-botfinalsafe, j-mao.battlecode-2019, StoneT2000.BC19-bot1v43, moreda-a.BC2019-a31, awesomelemonade.Battlecode2019, bqi343.cp-notebook, arya-k.bc19, rafekruse.Battlecode-2019~2680d4, IanCoolidge0.battlecode20~69ce88, cemondr.BC19pdxgroup4, virenvshah.Battlecode2019, vineetparikh.BigRedBattle~fe3459, ldcWV.Battlecode-2019, IanCoolidge0.battlecode20~f649f3, Nischay-Pro.BattleCode2019, IvanGeffner.BC19-bot6b, howard36.Battlecode2019-eco6, UpperArlingtonHighSchool.~682aa9, NielsKornerup.Battlecode-2019, unrevre.battlecode, abcdefguan.battlecode2019, lschaberg.bc19, dmunozc.bc19-g8-davjasdiv, programjames.BC19Bot-seeding, m4reko.bc2019-tmores-angels, IvanGeffner.BC19-eigthbot, ovkulkarni.battlecode2019~0aa607, dmunozc.bc19-g8-bots, ovkulkarni.battlecode2019~06c610, 18dcb01.Battlecode19-prea~fb5c48, Tom-CCS.BC19, sunanth123.battlecode19-mainbot, ipercyNC.group6-battlecode, sunanth123.battlecode19-prorush, programjames.BC19Bot-root, CS554-software-engineerin~a575dc, cvxluo.battlecode19, moreda-a.BC2019-t15, nthistle.battlecode-2019, evanyeyeye.battlecode2019~af562c, jamesrayman.HCN-bot, CometsTech.battlecode2019, bayoumi17m.BattleCode-2019, vicennial.BattleCode19, JasonLarson44.2019-Battle~1c7639, Nydroam.BatteredCod, twitu.bc19-tsp, haydenshively.Battle-Code~e1c2fb, spachava753.bc19, UpperArlingtonHighSchool.~5e7875, TestSubjector.BattleCode2~e6de74, dgh2.bc19-t1, 18dcb01.Battlecode19-robot2, dndoja.battlecode19, haydenshively.Battle-Code~e37b3e, TestSubjector.BattleCode2~fb22c7, rooneyshuman.Battlecode, jackliu612.Battlecode19, liwanlin41.examplefuncsplayer, roy-love.onshoreBattleCode2019, CometsTech.battlecode2019~187e8c, asunathanr.asu_bc, jyurkanin.corn_bc19, VictorButoi.BattleCode201~c4576b, howard36.Battlecode2019-sprint, OmarTahoun.battle-code, SethKitchen.examplefuncsplayer, bovard.battlecode-2019-un~8822c3, waylon531.scala_starter, nhard.examplefuncsplayer, vishwasns99.BC_2019, DivyanshuSaxena.Battlecode, VoidMercy.battlecode-2019-bot, bc19-starter, jbiewend.Battlecode2019, ryanhzhao.Battlecode-2019, RyanSharafuddin.Battlecode_2019, djkeyes.bc19, TheRobotCarlson.battlehac~323871, yunaganyh.bc19, jshin313.battlecodebot, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1591 ± 228 | 88 of 196 | 38 | 33-5 | 73.5% | 27.6% (vs 21) |
| v1 | accepted | 1440 ± 144 | 130 of 196 | 154 | 128-26 | 63.8% | 23.7% (vs 34) |
| v2 | accepted | 1426 ± 144 | 136 of 196 | 62 | 30-32 | 62.9% | 23.1% (vs 35) |
| v3 | accepted | 1595 ± 104 | 87 of 196 | 191 | 140-51 | 73.7% | 28.0% (vs 21) |
| v4 | accepted | 1368 ± 108 | 139 of 196 | 220 | 83-137 | 59.1% | 19.7% (vs 37) |
| v5 | accepted | 1518 ± 76 | 108 of 196 | 439 | 202-237 | 68.8% | 24.9% (vs 26) |
| v6 | accepted | 1546 ± 71 | 104 of 196 | 322 | 130-192 | 70.6% | 27.7% (vs 26) |
| v7 | accepted | 1685 ± 54 | 56 of 196 | 1804 | 927-877 | 79.1% | 31.2% (vs 15) |
| v8 | accepted | 1741 ± 70 | 28 of 196 | 353 | 159-194 | 82.2% | 30.0% (vs 10) |
| block | candidate | 1753 ± 163 | 23 of 196 | 20 | 12-8 | 82.8% | 31.4% (vs 10) |
| camp | candidate | 1753 ± 163 | 24 of 196 | 20 | 12-8 | 82.8% | 31.4% (vs 10) |
| h100 | candidate | 1675 ± 72 | 60 of 196 | 200 | 97-103 | 78.5% | 32.2% (vs 17) |
| h101 | candidate | 1650 ± 120 | 67 of 196 | 40 | 18-22 | 77.0% | 29.4% (vs 17) |
| h103 | candidate | 1704 ± 94 | 49 of 196 | 76 | 33-43 | 80.1% | 33.3% (vs 15) |
| h104 | candidate | 1716 ± 104 | 42 of 196 | 58 | 28-30 | 80.8% | 32.2% (vs 13) |
| h107 | candidate | 1596 ± 123 | 85 of 196 | 40 | 15-25 | 73.8% | 28.1% (vs 21) |
| h110 | candidate | 1632 ± 121 | 74 of 196 | 40 | 17-23 | 76.0% | 29.7% (vs 19) |
| h111 | candidate | 1716 ± 104 | 43 of 196 | 58 | 28-30 | 80.8% | 32.2% (vs 13) |
| h112 | candidate | 1716 ± 104 | 44 of 196 | 58 | 28-30 | 80.8% | 32.2% (vs 13) |
| h113 | candidate | 1632 ± 121 | 75 of 196 | 40 | 17-23 | 76.0% | 29.7% (vs 19) |
| h114 | candidate | 1614 ± 122 | 78 of 196 | 40 | 16-24 | 74.9% | 27.8% (vs 19) |
| h115 | candidate | 1702 ± 120 | 51 of 196 | 40 | 21-19 | 80.0% | 33.1% (vs 15) |
| h116 | candidate | 1614 ± 122 | 79 of 196 | 40 | 16-24 | 74.9% | 27.8% (vs 19) |
| h118 | candidate | 1684 ± 120 | 57 of 196 | 40 | 20-20 | 79.0% | 31.1% (vs 15) |
| h11c | candidate | 1550 ± 180 | 103 of 196 | 25 | 15-10 | 70.9% | 28.1% (vs 26) |
| h121 | candidate | 1664 ± 105 | 64 of 196 | 58 | 24-34 | 77.9% | 31.0% (vs 17) |
| h123 | candidate | 1651 ± 105 | 66 of 196 | 58 | 23-35 | 77.1% | 29.6% (vs 17) |
| h124 | candidate | 1650 ± 120 | 68 of 196 | 40 | 18-22 | 77.0% | 29.4% (vs 17) |
| h125 | candidate | 1650 ± 120 | 69 of 196 | 40 | 18-22 | 77.0% | 29.4% (vs 17) |
| h126 | candidate | 1721 ± 91 | 37 of 196 | 98 | 49-49 | 81.1% | 29.6% (vs 11) |
| h127 | candidate | 1710 ± 91 | 45 of 196 | 98 | 47-51 | 80.5% | 31.6% (vs 13) |
| h128 | candidate | 1781 ± 110 | 17 of 196 | 54 | 23-31 | 84.2% | 32.6% (vs 9) |
| h129 | candidate | 1517 ± 131 | 117 of 196 | 40 | 11-29 | 68.8% | 26.6% (vs 28) |
| h130 | candidate | 1728 ± 104 | 35 of 196 | 58 | 29-29 | 81.5% | 30.4% (vs 11) |
| h131 | candidate | 1702 ± 120 | 52 of 196 | 40 | 21-19 | 80.0% | 33.1% (vs 15) |
| h132 | candidate | 1737 ± 121 | 30 of 196 | 40 | 23-17 | 81.9% | 29.5% (vs 10) |
| h133 | candidate | 1719 ± 120 | 39 of 196 | 40 | 22-18 | 81.0% | 31.1% (vs 12) |
| h134 | candidate | 1577 ± 124 | 93 of 196 | 40 | 14-26 | 72.6% | 27.2% (vs 22) |
| h135 | candidate | 1690 ± 104 | 55 of 196 | 58 | 26-32 | 79.4% | 31.7% (vs 15) |
| h136 | candidate | 1694 ± 95 | 54 of 196 | 76 | 32-44 | 79.6% | 32.1% (vs 15) |
| h137 | candidate | 1650 ± 120 | 70 of 196 | 40 | 18-22 | 77.0% | 29.4% (vs 17) |
| h138 | candidate | 1702 ± 120 | 53 of 196 | 40 | 21-19 | 80.0% | 33.1% (vs 15) |
| h139 | candidate | 1744 ± 94 | 27 of 196 | 76 | 37-39 | 82.3% | 30.3% (vs 10) |
| h140 | candidate | 1741 ± 104 | 29 of 196 | 58 | 30-28 | 82.2% | 30.0% (vs 10) |
| h141 | candidate | 1754 ± 104 | 22 of 196 | 58 | 31-27 | 82.8% | 31.4% (vs 10) |
| h142 | candidate | 1719 ± 120 | 40 of 196 | 40 | 22-18 | 81.0% | 31.1% (vs 12) |
| h143 | candidate | 1755 ± 122 | 21 of 196 | 40 | 24-16 | 82.9% | 31.5% (vs 10) |
| h144 | candidate | 1596 ± 123 | 86 of 196 | 40 | 15-25 | 73.8% | 28.1% (vs 21) |
| h145 | candidate | 1794 ± 109 | 15 of 196 | 58 | 31-27 | 84.8% | 32.2% (vs 8) |
| h146 | candidate | 1756 ± 109 | 19 of 196 | 58 | 28-30 | 83.0% | 31.7% (vs 10) |
| h147 | candidate | 1832 ± 110 | 8 of 196 | 58 | 34-24 | 86.6% | 31.2% (vs 6) |
| h148 | candidate | 1816 ± 84 | 11 of 196 | 112 | 58-54 | 85.9% | 32.2% (vs 7) |
| h149 | candidate | 1756 ± 109 | 20 of 196 | 58 | 28-30 | 83.0% | 31.7% (vs 10) |
| h150 | candidate | 1807 ± 109 | 13 of 196 | 58 | 32-26 | 85.4% | 31.1% (vs 7) |
| h151 | candidate | 1706 ± 128 | 48 of 196 | 40 | 18-22 | 80.2% | 33.5% (vs 15) |
| h157 | candidate | 1751 ± 131 | 25 of 196 | 36 | 14-22 | 82.7% | 31.1% (vs 10) |
| h159 | candidate | 1807 ± 98 | 12 of 196 | 72 | 33-39 | 85.5% | 31.1% (vs 7) |
| h161 | candidate | 1751 ± 131 | 26 of 196 | 36 | 14-22 | 82.7% | 31.1% (vs 10) |
| h162 | candidate | 1728 ± 133 | 36 of 196 | 36 | 13-23 | 81.5% | 30.4% (vs 11) |
| h163 | candidate | 1818 ± 85 | 9 of 196 | 108 | 51-57 | 86.0% | 29.5% (vs 6) |
| h167 | candidate | 2181 ± 415 | 1 of 196 | 3 | 2-1 | 96.8% | - |
| h16r | candidate | 1298 ± 153 | 144 of 196 | 40 | 16-24 | 54.7% | 17.7% (vs 41) |
| h18 | candidate | 1281 ± 196 | 146 of 196 | 25 | 6-19 | 53.7% | 17.2% (vs 42) |
| h2 | candidate | 1544 ± 154 | 105 of 196 | 54 | 25-29 | 70.5% | 27.6% (vs 26) |
| h24 | candidate | 1476 ± 155 | 125 of 196 | 40 | 26-14 | 66.1% | 26.4% (vs 33) |
| h24v5 | candidate | 1570 ± 132 | 96 of 196 | 40 | 23-17 | 72.2% | 27.4% (vs 23) |
| h3 | candidate | 1526 ± 217 | 106 of 196 | 19 | 9-10 | 69.3% | 25.7% (vs 26) |
| h31 | candidate | 1457 ± 154 | 128 of 196 | 40 | 25-15 | 64.9% | 25.3% (vs 34) |
| h38 | candidate | 1489 ± 306 | 121 of 196 | 6 | 4-2 | 66.9% | 26.2% (vs 31) |
| h40 | candidate | 1557 ± 291 | 99 of 196 | 8 | 6-2 | 71.3% | 26.1% (vs 23) |
| h41 | candidate | 1431 ± 255 | 132 of 196 | 8 | 3-5 | 63.2% | 23.6% (vs 35) |
| h42 | candidate | 1431 ± 255 | 133 of 196 | 8 | 3-5 | 63.2% | 23.6% (vs 35) |
| h43 | candidate | 1518 ± 248 | 110 of 196 | 8 | 4-4 | 68.8% | 25.8% (vs 27) |
| h44 | candidate | 1703 ± 281 | 50 of 196 | 8 | 6-2 | 80.1% | 33.2% (vs 15) |
| h46 | candidate | 1431 ± 255 | 134 of 196 | 8 | 3-5 | 63.2% | 23.6% (vs 35) |
| h47 | candidate | 1518 ± 248 | 111 of 196 | 8 | 4-4 | 68.8% | 25.8% (vs 27) |
| h48 | candidate | 1518 ± 248 | 112 of 196 | 8 | 4-4 | 68.8% | 25.8% (vs 27) |
| h49 | candidate | 1518 ± 248 | 113 of 196 | 8 | 4-4 | 68.8% | 25.8% (vs 27) |
| h52 | candidate | 1431 ± 255 | 135 of 196 | 8 | 3-5 | 63.2% | 23.6% (vs 35) |
| h53 | candidate | 1604 ± 255 | 80 of 196 | 8 | 5-3 | 74.3% | 26.7% (vs 19) |
| h54 | candidate | 1591 ± 125 | 90 of 196 | 48 | 29-19 | 73.5% | 28.6% (vs 22) |
| h55 | candidate | 1562 ± 123 | 97 of 196 | 56 | 32-24 | 71.6% | 26.5% (vs 23) |
| h58 | candidate | 1474 ± 272 | 126 of 196 | 8 | 3-5 | 66.0% | 26.2% (vs 33) |
| h59 | candidate | 1518 ± 248 | 114 of 196 | 8 | 4-4 | 68.8% | 25.8% (vs 27) |
| h6 | candidate | 1480 ± 117 | 124 of 196 | 158 | 94-64 | 66.3% | 26.8% (vs 33) |
| h60 | candidate | 1518 ± 248 | 115 of 196 | 8 | 4-4 | 68.8% | 25.8% (vs 27) |
| h61 | candidate | 1632 ± 254 | 76 of 196 | 8 | 5-3 | 75.9% | 29.7% (vs 19) |
| h63 | candidate | 1598 ± 129 | 82 of 196 | 40 | 23-17 | 73.9% | 27.3% (vs 20) |
| h64 | candidate | 1581 ± 129 | 92 of 196 | 40 | 22-18 | 72.8% | 27.5% (vs 22) |
| h68 | candidate | 1730 ± 280 | 32 of 196 | 8 | 6-2 | 81.6% | 30.7% (vs 11) |
| h7 | candidate | 1519 ± 1445 | 107 of 196 | 8 | 8-0 | 68.9% | 25.0% (vs 26) |
| h72 | candidate | 1730 ± 280 | 33 of 196 | 8 | 6-2 | 81.6% | 30.7% (vs 11) |
| h76 | candidate | 1673 ± 186 | 61 of 196 | 32 | 18-14 | 78.4% | 32.1% (vs 17) |
| h77 | candidate | 1558 ± 188 | 98 of 196 | 16 | 8-8 | 71.4% | 26.1% (vs 23) |
| h78 | candidate | 1730 ± 280 | 34 of 196 | 8 | 6-2 | 81.6% | 30.7% (vs 11) |
| h82 | candidate | 1633 ± 98 | 73 of 196 | 134 | 70-64 | 76.1% | 29.9% (vs 19) |
| h83 | candidate | 1670 ± 299 | 62 of 196 | 8 | 4-4 | 78.2% | 31.6% (vs 17) |
| h84 | candidate | 1670 ± 299 | 63 of 196 | 8 | 4-4 | 78.2% | 31.6% (vs 17) |
| h88 | candidate | 1598 ± 145 | 83 of 196 | 40 | 18-22 | 73.9% | 27.3% (vs 20) |
| h89 | candidate | 805 ± 1086 | 174 of 196 | 8 | 0-8 | 28.8% | 10.0% (vs 68) |
| h8v5 | candidate | 1622 ± 127 | 77 of 196 | 48 | 31-17 | 75.4% | 28.6% (vs 19) |
| h90 | candidate | 805 ± 1086 | 175 of 196 | 8 | 0-8 | 28.8% | 10.0% (vs 68) |
| h91 | candidate | 1589 ± 196 | 91 of 196 | 16 | 7-9 | 73.3% | 28.4% (vs 22) |
| h96 | candidate | 1664 ± 105 | 65 of 196 | 58 | 24-34 | 77.9% | 31.0% (vs 17) |
| rush | sparring | 1281 ± 196 | 147 of 196 | 25 | 6-19 | 53.7% | 17.2% (vs 42) |
| rush4 | sparring | 1571 ± 135 | 95 of 196 | 50 | 30-20 | 72.2% | 27.5% (vs 23) |
| turtle | candidate | 1445 ± 195 | 129 of 196 | 20 | 4-16 | 64.1% | 24.2% (vs 34) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 121 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 3289 games (11 archive games skipped, 386 matches from archives, 700 matches from scores), fetched 2026-10-25T11:52:42+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v8) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | **cand:h167** | candidate | 2181 | 415 | 3 | 2-1 |  |
| 2 | m-schier.battlecode-2019-wololo | field | 2085 | 89 | 198 | 173-25 | 0% (v8 0-3) |
| 3 | mvpatel2000.Battlecode2019 | field | 2025 | 151 | 45 | 37-8 | 33% (v8 1-2) |
| 4 | rafekruse.Battlecode-2019-bc19 | field | 1969 | 159 | 42 | 34-8 | 0% (v8 0-3) |
| 5 | yujinwunz.battlecode_2019 | field | 1944 | 154 | 54 | 44-10 | 0% (v8 0-3) |
| 6 | uvafan.bc2019 | field | 1933 | 74 | 195 | 149-46 | 0% (v8 0-3) |
| 7 | VoidMercy.battlecode-2019~e7dc06 | field | 1889 | 154 | 39 | 30-9 | 33% (v8 1-2) |
| 8 | **cand:h147** | candidate | 1832 | 110 | 58 | 34-24 |  |
| 9 | **cand:h163** | candidate | 1818 | 85 | 108 | 51-57 |  |
| 10 | StoneT2000.BC19-botfinalsafe | field | 1817 | 68 | 219 | 141-78 | 33% (v8 1-2) |
| 11 | **cand:h148** | candidate | 1816 | 84 | 112 | 58-54 |  |
| 12 | **cand:h159** | candidate | 1807 | 98 | 72 | 33-39 |  |
| 13 | **cand:h150** | candidate | 1807 | 109 | 58 | 32-26 |  |
| 14 | j-mao.battlecode-2019 | field | 1794 | 138 | 39 | 27-12 | 100% (v8 3-0) |
| 15 | **cand:h145** | candidate | 1794 | 109 | 58 | 31-27 |  |
| 16 | StoneT2000.BC19-bot1v43 | field | 1793 | 67 | 213 | 127-86 | 33% (v7 2-4) |
| 17 | **cand:h128** | candidate | 1781 | 110 | 54 | 23-31 |  |
| 18 | moreda-a.BC2019-a31 | field | 1760 | 141 | 45 | 31-14 | 67% (v8 2-1) |
| 19 | **cand:h146** | candidate | 1756 | 109 | 58 | 28-30 |  |
| 20 | **cand:h149** | candidate | 1756 | 109 | 58 | 28-30 |  |
| 21 | **cand:h143** | candidate | 1755 | 122 | 40 | 24-16 |  |
| 22 | **cand:h141** | candidate | 1754 | 104 | 58 | 31-27 |  |
| 23 | **cand:block** | candidate | 1753 | 163 | 20 | 12-8 |  |
| 24 | **cand:camp** | candidate | 1753 | 163 | 20 | 12-8 |  |
| 25 | **cand:h157** | candidate | 1751 | 131 | 36 | 14-22 |  |
| 26 | **cand:h161** | candidate | 1751 | 131 | 36 | 14-22 |  |
| 27 | **cand:h139** | candidate | 1744 | 94 | 76 | 37-39 |  |
| 28 | **us:v8** | accepted | 1741 | 70 | 353 | 159-194 |  |
| 29 | **cand:h140** | candidate | 1741 | 104 | 58 | 30-28 |  |
| 30 | **cand:h132** | candidate | 1737 | 121 | 40 | 23-17 |  |
| 31 | awesomelemonade.Battlecode2019 | field | 1733 | 68 | 198 | 102-96 | 67% (v7 2-1) |
| 32 | **cand:h68** | candidate | 1730 | 280 | 8 | 6-2 |  |
| 33 | **cand:h72** | candidate | 1730 | 280 | 8 | 6-2 |  |
| 34 | **cand:h78** | candidate | 1730 | 280 | 8 | 6-2 |  |
| 35 | **cand:h130** | candidate | 1728 | 104 | 58 | 29-29 |  |
| 36 | **cand:h162** | candidate | 1728 | 133 | 36 | 13-23 |  |
| 37 | **cand:h126** | candidate | 1721 | 91 | 98 | 49-49 |  |
| 38 | bqi343.cp-notebook | field | 1719 | 163 | 39 | 28-11 |  |
| 39 | **cand:h133** | candidate | 1719 | 120 | 40 | 22-18 |  |
| 40 | **cand:h142** | candidate | 1719 | 120 | 40 | 22-18 |  |
| 41 | arya-k.bc19 | field | 1717 | 149 | 39 | 26-13 | 100% (v8 3-0) |
| 42 | **cand:h104** | candidate | 1716 | 104 | 58 | 28-30 |  |
| 43 | **cand:h111** | candidate | 1716 | 104 | 58 | 28-30 |  |
| 44 | **cand:h112** | candidate | 1716 | 104 | 58 | 28-30 |  |
| 45 | **cand:h127** | candidate | 1710 | 91 | 98 | 47-51 |  |
| 46 | rafekruse.Battlecode-2019~2680d4 | field | 1709 | 152 | 36 | 26-10 |  |
| 47 | IanCoolidge0.battlecode20~69ce88 | field | 1706 | 67 | 201 | 99-102 | 67% (v7 4-2) |
| 48 | **cand:h151** | candidate | 1706 | 128 | 40 | 18-22 |  |
| 49 | **cand:h103** | candidate | 1704 | 94 | 76 | 33-43 |  |
| 50 | **cand:h44** | candidate | 1703 | 281 | 8 | 6-2 |  |
| 51 | **cand:h115** | candidate | 1702 | 120 | 40 | 21-19 |  |
| 52 | **cand:h131** | candidate | 1702 | 120 | 40 | 21-19 |  |
| 53 | **cand:h138** | candidate | 1702 | 120 | 40 | 21-19 |  |
| 54 | **cand:h136** | candidate | 1694 | 95 | 76 | 32-44 |  |
| 55 | **cand:h135** | candidate | 1690 | 104 | 58 | 26-32 |  |
| 56 | **us:v7** | accepted | 1685 | 54 | 1804 | 927-877 |  |
| 57 | **cand:h118** | candidate | 1684 | 120 | 40 | 20-20 |  |
| 58 | cemondr.BC19pdxgroup4 | field | 1682 | 148 | 42 | 29-13 |  |
| 59 | virenvshah.Battlecode2019 | field | 1681 | 145 | 42 | 29-13 |  |
| 60 | **cand:h100** | candidate | 1675 | 72 | 200 | 97-103 |  |
| 61 | **cand:h76** | candidate | 1673 | 186 | 32 | 18-14 |  |
| 62 | **cand:h83** | candidate | 1670 | 299 | 8 | 4-4 |  |
| 63 | **cand:h84** | candidate | 1670 | 299 | 8 | 4-4 |  |
| 64 | **cand:h121** | candidate | 1664 | 105 | 58 | 24-34 |  |
| 65 | **cand:h96** | candidate | 1664 | 105 | 58 | 24-34 |  |
| 66 | **cand:h123** | candidate | 1651 | 105 | 58 | 23-35 |  |
| 67 | **cand:h101** | candidate | 1650 | 120 | 40 | 18-22 |  |
| 68 | **cand:h124** | candidate | 1650 | 120 | 40 | 18-22 |  |
| 69 | **cand:h125** | candidate | 1650 | 120 | 40 | 18-22 |  |
| 70 | **cand:h137** | candidate | 1650 | 120 | 40 | 18-22 |  |
| 71 | vineetparikh.BigRedBattle~fe3459 | field | 1647 | 148 | 42 | 28-14 |  |
| 72 | ldcWV.Battlecode-2019 | field | 1634 | 148 | 42 | 28-14 |  |
| 73 | **cand:h82** | candidate | 1633 | 98 | 134 | 70-64 |  |
| 74 | **cand:h110** | candidate | 1632 | 121 | 40 | 17-23 |  |
| 75 | **cand:h113** | candidate | 1632 | 121 | 40 | 17-23 |  |
| 76 | **cand:h61** | candidate | 1632 | 254 | 8 | 5-3 |  |
| 77 | **cand:h8v5** | candidate | 1622 | 127 | 48 | 31-17 |  |
| 78 | **cand:h114** | candidate | 1614 | 122 | 40 | 16-24 |  |
| 79 | **cand:h116** | candidate | 1614 | 122 | 40 | 16-24 |  |
| 80 | **cand:h53** | candidate | 1604 | 255 | 8 | 5-3 |  |
| 81 | IanCoolidge0.battlecode20~f649f3 | field | 1601 | 124 | 66 | 39-27 | 100% (v8 3-0) |
| 82 | **cand:h63** | candidate | 1598 | 129 | 40 | 23-17 |  |
| 83 | **cand:h88** | candidate | 1598 | 145 | 40 | 18-22 |  |
| 84 | Nischay-Pro.BattleCode2019 | field | 1598 | 159 | 36 | 26-10 |  |
| 85 | **cand:h107** | candidate | 1596 | 123 | 40 | 15-25 |  |
| 86 | **cand:h144** | candidate | 1596 | 123 | 40 | 15-25 |  |
| 87 | **us:v3** | accepted | 1595 | 104 | 191 | 140-51 |  |
| 88 | **us:v0** | accepted | 1591 | 228 | 38 | 33-5 |  |
| 89 | IvanGeffner.BC19-bot6b | field | 1591 | 391 | 9 | 7-2 |  |
| 90 | **cand:h54** | candidate | 1591 | 125 | 48 | 29-19 |  |
| 91 | **cand:h91** | candidate | 1589 | 196 | 16 | 7-9 |  |
| 92 | **cand:h64** | candidate | 1581 | 129 | 40 | 22-18 |  |
| 93 | **cand:h134** | candidate | 1577 | 124 | 40 | 14-26 |  |
| 94 | howard36.Battlecode2019-eco6 | field | 1575 | 138 | 45 | 25-20 |  |
| 95 | **spar:rush4** | sparring | 1571 | 135 | 50 | 30-20 |  |
| 96 | **cand:h24v5** | candidate | 1570 | 132 | 40 | 23-17 |  |
| 97 | **cand:h55** | candidate | 1562 | 123 | 56 | 32-24 |  |
| 98 | **cand:h77** | candidate | 1558 | 188 | 16 | 8-8 |  |
| 99 | **cand:h40** | candidate | 1557 | 291 | 8 | 6-2 |  |
| 100 | UpperArlingtonHighSchool.~682aa9 | field | 1557 | 160 | 45 | 28-17 |  |
| 101 | NielsKornerup.Battlecode-2019 | field | 1554 | 118 | 66 | 37-29 |  |
| 102 | unrevre.battlecode | field | 1554 | 160 | 36 | 22-14 |  |
| 103 | **cand:h11c** | candidate | 1550 | 180 | 25 | 15-10 |  |
| 104 | **us:v6** | accepted | 1546 | 71 | 322 | 130-192 |  |
| 105 | **cand:h2** | candidate | 1544 | 154 | 54 | 25-29 |  |
| 106 | **cand:h3** | candidate | 1526 | 217 | 19 | 9-10 |  |
| 107 | **cand:h7** | candidate | 1519 | 1445 | 8 | 8-0 |  |
| 108 | **us:v5** | accepted | 1518 | 76 | 439 | 202-237 |  |
| 109 | abcdefguan.battlecode2019 | field | 1518 | 162 | 42 | 25-17 |  |
| 110 | **cand:h43** | candidate | 1518 | 248 | 8 | 4-4 |  |
| 111 | **cand:h47** | candidate | 1518 | 248 | 8 | 4-4 |  |
| 112 | **cand:h48** | candidate | 1518 | 248 | 8 | 4-4 |  |
| 113 | **cand:h49** | candidate | 1518 | 248 | 8 | 4-4 |  |
| 114 | **cand:h59** | candidate | 1518 | 248 | 8 | 4-4 |  |
| 115 | **cand:h60** | candidate | 1518 | 248 | 8 | 4-4 |  |
| 116 | lschaberg.bc19 | field | 1517 | 144 | 45 | 28-17 |  |
| 117 | **cand:h129** | candidate | 1517 | 131 | 40 | 11-29 |  |
| 118 | dmunozc.bc19-g8-davjasdiv | field | 1506 | 142 | 48 | 27-21 |  |
| 119 | programjames.BC19Bot-seeding | field | 1494 | 151 | 36 | 21-15 |  |
| 120 | m4reko.bc2019-tmores-angels | field | 1490 | 149 | 39 | 22-17 |  |
| 121 | **cand:h38** | candidate | 1489 | 306 | 6 | 4-2 |  |
| 122 | IvanGeffner.BC19-eigthbot | field | 1487 | 298 | 9 | 6-3 |  |
| 123 | ovkulkarni.battlecode2019~0aa607 | field | 1486 | 138 | 39 | 23-16 |  |
| 124 | **cand:h6** | candidate | 1480 | 117 | 158 | 94-64 |  |
| 125 | **cand:h24** | candidate | 1476 | 155 | 40 | 26-14 |  |
| 126 | **cand:h58** | candidate | 1474 | 272 | 8 | 3-5 |  |
| 127 | dmunozc.bc19-g8-bots | field | 1463 | 150 | 39 | 23-16 |  |
| 128 | **cand:h31** | candidate | 1457 | 154 | 40 | 25-15 |  |
| 129 | **cand:turtle** | candidate | 1445 | 195 | 20 | 4-16 |  |
| 130 | **us:v1** | accepted | 1440 | 144 | 154 | 128-26 |  |
| 131 | ovkulkarni.battlecode2019~06c610 | field | 1434 | 151 | 39 | 26-13 |  |
| 132 | **cand:h41** | candidate | 1431 | 255 | 8 | 3-5 |  |
| 133 | **cand:h42** | candidate | 1431 | 255 | 8 | 3-5 |  |
| 134 | **cand:h46** | candidate | 1431 | 255 | 8 | 3-5 |  |
| 135 | **cand:h52** | candidate | 1431 | 255 | 8 | 3-5 |  |
| 136 | **us:v2** | accepted | 1426 | 144 | 62 | 30-32 |  |
| 137 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1398 | 123 | 63 | 34-29 |  |
| 138 | Tom-CCS.BC19 | field | 1390 | 153 | 45 | 23-22 |  |
| 139 | **us:v4** | accepted | 1368 | 108 | 220 | 83-137 |  |
| 140 | sunanth123.battlecode19-mainbot | field | 1342 | 160 | 39 | 20-19 |  |
| 141 | ipercyNC.group6-battlecode | field | 1326 | 151 | 39 | 20-19 |  |
| 142 | sunanth123.battlecode19-prorush | field | 1319 | 143 | 39 | 19-20 |  |
| 143 | programjames.BC19Bot-root | field | 1312 | 148 | 39 | 22-17 |  |
| 144 | **cand:h16r** | candidate | 1298 | 153 | 40 | 16-24 |  |
| 145 | CS554-software-engineerin~a575dc | field | 1297 | 89 | 263 | 159-104 | 100% (v7 3-0) |
| 146 | **cand:h18** | candidate | 1281 | 196 | 25 | 6-19 |  |
| 147 | **spar:rush** | sparring | 1281 | 196 | 25 | 6-19 |  |
| 148 | cvxluo.battlecode19 | field | 1258 | 155 | 48 | 24-24 |  |
| 149 | moreda-a.BC2019-t15 | field | 1255 | 160 | 42 | 21-21 |  |
| 150 | nthistle.battlecode-2019 | field | 1254 | 141 | 51 | 25-26 | 100% (v5 3-0) |
| 151 | evanyeyeye.battlecode2019~af562c | field | 1249 | 153 | 36 | 17-19 |  |
| 152 | jamesrayman.HCN-bot | field | 1245 | 151 | 48 | 24-24 | 100% (v5 3-0) |
| 153 | CometsTech.battlecode2019 | field | 1242 | 95 | 216 | 100-116 | 100% (v7 3-0) |
| 154 | bayoumi17m.BattleCode-2019 | field | 1204 | 150 | 42 | 22-20 |  |
| 155 | vicennial.BattleCode19 | field | 1188 | 166 | 45 | 23-22 |  |
| 156 | JasonLarson44.2019-Battle~1c7639 | field | 1179 | 142 | 51 | 23-28 | 100% (v3 3-0) |
| 157 | Nydroam.BatteredCod | field | 1177 | 440 | 6 | 3-3 |  |
| 158 | twitu.bc19-tsp | field | 1109 | 177 | 42 | 20-22 |  |
| 159 | haydenshively.Battle-Code~e1c2fb | field | 1040 | 153 | 42 | 18-24 |  |
| 160 | spachava753.bc19 | field | 1033 | 165 | 39 | 20-19 |  |
| 161 | UpperArlingtonHighSchool.~5e7875 | field | 1030 | 186 | 39 | 16-23 |  |
| 162 | TestSubjector.BattleCode2~e6de74 | field | 994 | 180 | 51 | 26-25 |  |
| 163 | dgh2.bc19-t1 | field | 952 | 226 | 39 | 18-21 |  |
| 164 | 18dcb01.Battlecode19-robot2 | field | 949 | 177 | 51 | 21-30 |  |
| 165 | dndoja.battlecode19 | field | 948 | 168 | 39 | 17-22 |  |
| 166 | haydenshively.Battle-Code~e37b3e | field | 910 | 178 | 42 | 15-27 |  |
| 167 | TestSubjector.BattleCode2~fb22c7 | field | 901 | 192 | 54 | 20-34 |  |
| 168 | rooneyshuman.Battlecode | field | 898 | 181 | 45 | 19-26 |  |
| 169 | jackliu612.Battlecode19 | field | 865 | 218 | 36 | 11-25 |  |
| 170 | liwanlin41.examplefuncsplayer | field | 841 | 200 | 45 | 18-27 |  |
| 171 | roy-love.onshoreBattleCode2019 | field | 835 | 168 | 39 | 20-19 |  |
| 172 | CometsTech.battlecode2019~187e8c | field | 829 | 173 | 48 | 20-28 |  |
| 173 | asunathanr.asu_bc | field | 811 | 176 | 42 | 17-25 |  |
| 174 | **cand:h89** | candidate | 805 | 1086 | 8 | 0-8 |  |
| 175 | **cand:h90** | candidate | 805 | 1086 | 8 | 0-8 |  |
| 176 | jyurkanin.corn_bc19 | field | 672 | 240 | 48 | 18-30 |  |
| 177 | VictorButoi.BattleCode201~c4576b | field | 669 | 187 | 42 | 15-27 |  |
| 178 | howard36.Battlecode2019-sprint | field | 633 | 200 | 39 | 16-23 |  |
| 179 | OmarTahoun.battle-code | field | 619 | 183 | 48 | 18-30 |  |
| 180 | SethKitchen.examplefuncsplayer | field | 602 | 259 | 48 | 17-31 |  |
| 181 | bovard.battlecode-2019-un~8822c3 | field | 488 | 279 | 36 | 10-26 |  |
| 182 | waylon531.scala_starter | field | 482 | 226 | 45 | 15-30 |  |
| 183 | nhard.examplefuncsplayer | field | 479 | 229 | 42 | 17-25 |  |
| 184 | vishwasns99.BC_2019 | field | 352 | 274 | 42 | 12-30 |  |
| 185 | DivyanshuSaxena.Battlecode | field | 335 | 234 | 51 | 18-33 |  |
| 186 | VoidMercy.battlecode-2019-bot | field | 317 | 256 | 36 | 8-28 |  |
| 187 | bc19-starter | field | 254 | 221 | 346 | 65-281 | 100% (v3 12-0) |
| 188 | jbiewend.Battlecode2019 | field | 253 | 248 | 42 | 13-29 |  |
| 189 | ryanhzhao.Battlecode-2019 | field | 119 | 333 | 36 | 5-31 |  |
| 190 | RyanSharafuddin.Battlecode_2019 | field | 107 | 227 | 66 | 10-56 |  |
| 191 | djkeyes.bc19 | field | 31 | 272 | 36 | 8-28 |  |
| 192 | TheRobotCarlson.battlehac~323871 | field | -254 | 280 | 48 | 5-43 |  |
| 193 | yunaganyh.bc19 | field | -271 | 325 | 36 | 4-32 |  |
| 194 | jshin313.battlecodebot | field | -323 | 320 | 36 | 3-33 |  |
| 195 | jamesrayman.HCN-basic-bot | field | -334 | 314 | 36 | 3-33 |  |
| 196 | ArtemUstilov.bc19_CrazyTapok | field | -795 | 1095 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| cand:h167 | m-schier.battlecode-2019-wololo | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | mvpatel2000.Battlecode2019 | 3 | 0-3 | 0% | replica |
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h157 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h161 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v8 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
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
| m-schier.battlecode-2019-wololo | cand:h121 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h96 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h123 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h82 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
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
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | uvafan.bc2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-a31 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | us:v8 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | us:v7 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | IanCoolidge0.battlecode20~f649f3 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| mvpatel2000.Battlecode2019 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | yujinwunz.battlecode_2019 | 6 | 5-1 | 83% | replica |
| rafekruse.Battlecode-2019-bc19 | VoidMercy.battlecode-2019~e7dc06 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | us:v8 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | VoidMercy.battlecode-2019~e7dc06 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | us:v8 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h148 | 12 | 7-5 | 58% | replica |
| uvafan.bc2019 | cand:h159 | 12 | 8-4 | 67% | replica |
| uvafan.bc2019 | cand:h150 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h149 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h157 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | cand:h161 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | us:v8 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h162 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | us:v8 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h147 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h147 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h147 | us:v8 | 40 | 26-14 | 65% | local |
| cand:h147 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h147 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| cand:h163 | StoneT2000.BC19-botfinalsafe | 18 | 8-10 | 44% | replica |
| cand:h163 | StoneT2000.BC19-bot1v43 | 18 | 8-10 | 44% | replica |
| cand:h163 | awesomelemonade.Battlecode2019 | 18 | 11-7 | 61% | replica |
| cand:h163 | IanCoolidge0.battlecode20~69ce88 | 18 | 14-4 | 78% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h141 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h157 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h161 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h139 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v8 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h130 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h126 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h104 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h127 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h103 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h136 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h135 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v7 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h121 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h96 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h82 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | IanCoolidge0.battlecode20~f649f3 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | us:v3 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | us:v6 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | us:v5 | 9 | 4-5 | 44% | replica |
| StoneT2000.BC19-botfinalsafe | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h148 | StoneT2000.BC19-bot1v43 | 12 | 7-5 | 58% | replica |
| cand:h148 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h148 | awesomelemonade.Battlecode2019 | 12 | 7-5 | 58% | replica |
| cand:h148 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h159 | StoneT2000.BC19-bot1v43 | 12 | 6-6 | 50% | replica |
| cand:h159 | awesomelemonade.Battlecode2019 | 12 | 8-4 | 67% | replica |
| cand:h159 | IanCoolidge0.battlecode20~69ce88 | 12 | 10-2 | 83% | replica |
| cand:h150 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h150 | us:v8 | 40 | 25-15 | 62% | local |
| cand:h150 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h150 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| j-mao.battlecode-2019 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | us:v8 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | rafekruse.Battlecode-2019~2680d4 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | IanCoolidge0.battlecode20~69ce88 | 6 | 6-0 | 100% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h145 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h145 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h157 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-bot1v43 | cand:h161 | 6 | 3-3 | 50% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h130 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
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
| StoneT2000.BC19-bot1v43 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | us:v4 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | TestSubjector.BattleCode2~e6de74 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| cand:h128 | IanCoolidge0.battlecode20~69ce88 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | us:v8 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
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
| us:v8 | cand:h151 | 40 | 22-18 | 55% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| us:v8 | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h140 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| awesomelemonade.Battlecode2019 | cand:h130 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h162 | 6 | 4-2 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h126 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | arya-k.bc19 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h104 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h127 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| awesomelemonade.Battlecode2019 | cand:h136 | 6 | 2-4 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h135 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v7 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | cand:h121 | 3 | 0-3 | 0% | replica |
| awesomelemonade.Battlecode2019 | cand:h96 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h82 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | us:v6 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h130 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h162 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| bqi343.cp-notebook | arya-k.bc19 | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cand:h104 | IanCoolidge0.battlecode20~69ce88 | 3 | 2-1 | 67% | replica |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h127 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h103 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h136 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h135 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v7 | 6 | 2-4 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
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
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
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
| cemondr.BC19pdxgroup4 | virenvshah.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | ldcWV.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| vineetparikh.BigRedBattle~fe3459 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| vineetparikh.BigRedBattle~fe3459 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | ovkulkarni.battlecode2019~0aa607 | 3 | 1-2 | 33% | replica |
| vineetparikh.BigRedBattle~fe3459 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | lschaberg.bc19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| ldcWV.Battlecode-2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| IanCoolidge0.battlecode20~f649f3 | us:v3 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | NielsKornerup.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~f649f3 | IvanGeffner.BC19-eigthbot | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-prea~fb5c48 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~f649f3 | CS554-software-engineerin~a575dc | 9 | 5-4 | 56% | replica |
| IanCoolidge0.battlecode20~f649f3 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | JasonLarson44.2019-Battle~1c7639 | 6 | 6-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~f649f3 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| Nischay-Pro.BattleCode2019 | NielsKornerup.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| howard36.Battlecode2019-eco6 | m4reko.bc2019-tmores-angels | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| UpperArlingtonHighSchool.~682aa9 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
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
| us:v5 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| ovkulkarni.battlecode2019~06c610 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 3 | 0-3 | 0% | replica |
| ovkulkarni.battlecode2019~06c610 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| 18dcb01.Battlecode19-prea~fb5c48 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| sunanth123.battlecode19-mainbot | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | programjames.BC19Bot-root | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-mainbot | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | CS554-software-engineerin~a575dc | 6 | 0-6 | 0% | replica |
| programjames.BC19Bot-root | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| cvxluo.battlecode19 | nthistle.battlecode-2019 | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | JasonLarson44.2019-Battle~1c7639 | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | UpperArlingtonHighSchool.~5e7875 | 3 | 2-1 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | TestSubjector.BattleCode2~e6de74 | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 6 | 4-2 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 6 | 4-2 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | rooneyshuman.Battlecode | 6 | 4-2 | 67% | replica |
| dndoja.battlecode19 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 3 | 0-3 | 0% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| liwanlin41.examplefuncsplayer | howard36.Battlecode2019-sprint | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | SethKitchen.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-sprint | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | SethKitchen.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| OmarTahoun.battle-code | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | bc19-starter | 3 | 2-1 | 67% | replica |
| waylon531.scala_starter | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| nhard.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| vishwasns99.BC_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 9 | 5-4 | 56% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 6 | 2-4 | 33% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 3 | 1-2 | 33% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 6 | 6-0 | 100% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| TheRobotCarlson.battlehac~323871 | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 3 | 1-2 | 33% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 3 | 2-1 | 67% | replica |
