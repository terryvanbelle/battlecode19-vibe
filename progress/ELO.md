# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-25 09:23 PDT.

6868 games: 3243 local (VM batches between our builds, candidates, sparring partners and the starter bot), 1315 of ours on the galaxy replica and 2310 between field bots there (2307 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 198 players; compare them only within this fit.

**Thin field.** 89 rated field bots (m-schier.battlecode-2019-wololo, mvpatel2000.Battlecode2019, uvafan.bc2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, yujinwunz.battlecode_2019, StoneT2000.BC19-botfinalsafe, j-mao.battlecode-2019, StoneT2000.BC19-bot1v43, moreda-a.BC2019-a31, arya-k.bc19, awesomelemonade.Battlecode2019, rafekruse.Battlecode-2019~2680d4, IanCoolidge0.battlecode20~69ce88, bqi343.cp-notebook, virenvshah.Battlecode2019, cemondr.BC19pdxgroup4, vineetparikh.BigRedBattle~fe3459, ldcWV.Battlecode-2019, IanCoolidge0.battlecode20~f649f3, Nischay-Pro.BattleCode2019, IvanGeffner.BC19-bot6b, howard36.Battlecode2019-eco6, NielsKornerup.Battlecode-2019, unrevre.battlecode, UpperArlingtonHighSchool.~682aa9, abcdefguan.battlecode2019, lschaberg.bc19, IvanGeffner.BC19-eigthbot, programjames.BC19Bot-seeding, dmunozc.bc19-g8-davjasdiv, m4reko.bc2019-tmores-angels, ovkulkarni.battlecode2019~0aa607, dmunozc.bc19-g8-bots, Tom-CCS.BC19, ovkulkarni.battlecode2019~06c610, 18dcb01.Battlecode19-prea~fb5c48, ipercyNC.group6-battlecode, CS554-software-engineerin~a575dc, sunanth123.battlecode19-prorush, programjames.BC19Bot-root, sunanth123.battlecode19-mainbot, cvxluo.battlecode19, moreda-a.BC2019-t15, evanyeyeye.battlecode2019~af562c, CometsTech.battlecode2019, nthistle.battlecode-2019, jamesrayman.HCN-bot, vicennial.BattleCode19, bayoumi17m.BattleCode-2019, JasonLarson44.2019-Battle~1c7639, Nydroam.BatteredCod, twitu.bc19-tsp, spachava753.bc19, TestSubjector.BattleCode2~e6de74, UpperArlingtonHighSchool.~5e7875, haydenshively.Battle-Code~e1c2fb, 18dcb01.Battlecode19-robot2, dgh2.bc19-t1, dndoja.battlecode19, haydenshively.Battle-Code~e37b3e, rooneyshuman.Battlecode, TestSubjector.BattleCode2~fb22c7, roy-love.onshoreBattleCode2019, CometsTech.battlecode2019~187e8c, jackliu612.Battlecode19, liwanlin41.examplefuncsplayer, asunathanr.asu_bc, jyurkanin.corn_bc19, SethKitchen.examplefuncsplayer, VictorButoi.BattleCode201~c4576b, howard36.Battlecode2019-sprint, OmarTahoun.battle-code, bovard.battlecode-2019-un~8822c3, nhard.examplefuncsplayer, waylon531.scala_starter, vishwasns99.BC_2019, DivyanshuSaxena.Battlecode, VoidMercy.battlecode-2019-bot, jbiewend.Battlecode2019, bc19-starter, ryanhzhao.Battlecode-2019, RyanSharafuddin.Battlecode_2019, djkeyes.bc19, yunaganyh.bc19, TheRobotCarlson.battlehac~323871, jshin313.battlecodebot, jamesrayman.HCN-basic-bot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1601 ± 227 | 85 of 198 | 38 | 33-5 | 74.5% | 28.8% (vs 20) |
| v1 | accepted | 1450 ± 142 | 131 of 198 | 154 | 128-26 | 64.7% | 25.3% (vs 34) |
| v2 | accepted | 1434 ± 143 | 133 of 198 | 62 | 30-32 | 63.7% | 23.7% (vs 34) |
| v3 | accepted | 1602 ± 102 | 84 of 198 | 191 | 140-51 | 74.5% | 28.9% (vs 20) |
| v4 | accepted | 1369 ± 107 | 141 of 198 | 220 | 83-137 | 59.4% | 20.3% (vs 37) |
| v5 | accepted | 1516 ± 75 | 111 of 198 | 439 | 202-237 | 69.1% | 26.4% (vs 27) |
| v6 | accepted | 1543 ± 70 | 107 of 198 | 322 | 130-192 | 70.8% | 28.4% (vs 26) |
| v7 | accepted | 1681 ± 52 | 58 of 198 | 1804 | 927-877 | 79.3% | 32.5% (vs 15) |
| v8 | accepted | 1735 ± 68 | 29 of 198 | 356 | 160-196 | 82.3% | 29.7% (vs 9) |
| v9 | accepted | 1812 ± 120 | 11 of 198 | 42 | 19-23 | 86.2% | 35.3% (vs 7) |
| block | candidate | 1749 ± 162 | 23 of 198 | 20 | 12-8 | 83.0% | 31.3% (vs 9) |
| camp | candidate | 1749 ± 162 | 24 of 198 | 20 | 12-8 | 83.0% | 31.3% (vs 9) |
| h100 | candidate | 1670 ± 71 | 63 of 198 | 200 | 97-103 | 78.6% | 33.4% (vs 17) |
| h101 | candidate | 1645 ± 119 | 70 of 198 | 40 | 18-22 | 77.2% | 31.5% (vs 18) |
| h103 | candidate | 1699 ± 93 | 52 of 198 | 76 | 33-43 | 80.3% | 34.6% (vs 15) |
| h104 | candidate | 1711 ± 103 | 43 of 198 | 58 | 28-30 | 81.0% | 32.3% (vs 12) |
| h107 | candidate | 1591 ± 122 | 89 of 198 | 40 | 15-25 | 73.9% | 28.8% (vs 21) |
| h110 | candidate | 1627 ± 120 | 77 of 198 | 40 | 17-23 | 76.1% | 30.6% (vs 19) |
| h111 | candidate | 1711 ± 103 | 44 of 198 | 58 | 28-30 | 81.0% | 32.3% (vs 12) |
| h112 | candidate | 1711 ± 103 | 45 of 198 | 58 | 28-30 | 81.0% | 32.3% (vs 12) |
| h113 | candidate | 1627 ± 120 | 78 of 198 | 40 | 17-23 | 76.1% | 30.6% (vs 19) |
| h114 | candidate | 1610 ± 121 | 80 of 198 | 40 | 16-24 | 75.0% | 28.6% (vs 19) |
| h115 | candidate | 1697 ± 119 | 53 of 198 | 40 | 21-19 | 80.2% | 34.4% (vs 15) |
| h116 | candidate | 1610 ± 121 | 81 of 198 | 40 | 16-24 | 75.0% | 28.6% (vs 19) |
| h118 | candidate | 1680 ± 119 | 59 of 198 | 40 | 20-20 | 79.2% | 32.4% (vs 15) |
| h11c | candidate | 1554 ± 180 | 103 of 198 | 25 | 15-10 | 71.5% | 27.7% (vs 24) |
| h121 | candidate | 1660 ± 104 | 66 of 198 | 58 | 24-34 | 78.0% | 32.1% (vs 17) |
| h123 | candidate | 1647 ± 104 | 68 of 198 | 58 | 23-35 | 77.3% | 30.6% (vs 17) |
| h124 | candidate | 1645 ± 119 | 71 of 198 | 40 | 18-22 | 77.2% | 31.5% (vs 18) |
| h125 | candidate | 1645 ± 119 | 72 of 198 | 40 | 18-22 | 77.2% | 31.5% (vs 18) |
| h126 | candidate | 1716 ± 90 | 40 of 198 | 98 | 49-49 | 81.3% | 32.9% (vs 12) |
| h127 | candidate | 1706 ± 90 | 46 of 198 | 98 | 47-51 | 80.7% | 31.7% (vs 12) |
| h128 | candidate | 1776 ± 109 | 18 of 198 | 54 | 23-31 | 84.4% | 34.6% (vs 9) |
| h129 | candidate | 1512 ± 130 | 118 of 198 | 40 | 11-29 | 68.8% | 25.9% (vs 27) |
| h130 | candidate | 1724 ± 103 | 35 of 198 | 58 | 29-29 | 81.7% | 30.4% (vs 10) |
| h131 | candidate | 1697 ± 119 | 54 of 198 | 40 | 21-19 | 80.2% | 34.4% (vs 15) |
| h132 | candidate | 1732 ± 120 | 30 of 198 | 40 | 23-17 | 82.1% | 29.3% (vs 9) |
| h133 | candidate | 1714 ± 119 | 41 of 198 | 40 | 22-18 | 81.2% | 32.7% (vs 12) |
| h134 | candidate | 1573 ± 123 | 95 of 198 | 40 | 14-26 | 72.7% | 27.7% (vs 22) |
| h135 | candidate | 1685 ± 103 | 57 of 198 | 58 | 26-32 | 79.5% | 33.0% (vs 15) |
| h136 | candidate | 1689 ± 93 | 56 of 198 | 76 | 32-44 | 79.7% | 33.4% (vs 15) |
| h137 | candidate | 1645 ± 119 | 73 of 198 | 40 | 18-22 | 77.2% | 31.5% (vs 18) |
| h138 | candidate | 1697 ± 119 | 55 of 198 | 40 | 21-19 | 80.2% | 34.4% (vs 15) |
| h139 | candidate | 1739 ± 93 | 27 of 198 | 76 | 37-39 | 82.5% | 30.1% (vs 9) |
| h140 | candidate | 1736 ± 103 | 28 of 198 | 58 | 30-28 | 82.4% | 29.8% (vs 9) |
| h141 | candidate | 1749 ± 103 | 22 of 198 | 58 | 31-27 | 83.0% | 31.3% (vs 9) |
| h142 | candidate | 1714 ± 119 | 42 of 198 | 40 | 22-18 | 81.2% | 32.7% (vs 12) |
| h143 | candidate | 1750 ± 121 | 21 of 198 | 40 | 24-16 | 83.1% | 31.4% (vs 9) |
| h144 | candidate | 1591 ± 122 | 90 of 198 | 40 | 15-25 | 73.9% | 28.8% (vs 21) |
| h145 | candidate | 1788 ± 108 | 17 of 198 | 58 | 31-27 | 85.0% | 36.1% (vs 9) |
| h146 | candidate | 1750 ± 107 | 19 of 198 | 58 | 28-30 | 83.1% | 31.5% (vs 9) |
| h147 | candidate | 1826 ± 109 | 8 of 198 | 58 | 34-24 | 86.8% | 34.9% (vs 6) |
| h148 | candidate | 1810 ± 83 | 12 of 198 | 112 | 58-54 | 86.1% | 35.1% (vs 7) |
| h149 | candidate | 1750 ± 107 | 20 of 198 | 58 | 28-30 | 83.1% | 31.5% (vs 9) |
| h150 | candidate | 1801 ± 108 | 14 of 198 | 58 | 32-26 | 85.6% | 33.9% (vs 7) |
| h151 | candidate | 1699 ± 127 | 50 of 198 | 40 | 18-22 | 80.3% | 33.6% (vs 14) |
| h157 | candidate | 1746 ± 130 | 25 of 198 | 36 | 14-22 | 82.9% | 30.9% (vs 9) |
| h159 | candidate | 1802 ± 97 | 13 of 198 | 72 | 33-39 | 85.7% | 34.1% (vs 7) |
| h161 | candidate | 1746 ± 130 | 26 of 198 | 36 | 14-22 | 82.9% | 30.9% (vs 9) |
| h162 | candidate | 1723 ± 132 | 36 of 198 | 36 | 13-23 | 81.7% | 30.4% (vs 10) |
| h163 | candidate | 1813 ± 84 | 10 of 198 | 108 | 51-57 | 86.2% | 35.5% (vs 7) |
| h167 | candidate | 1856 ± 97 | 7 of 198 | 72 | 38-34 | 88.1% | 38.7% (vs 6) |
| h16r | candidate | 1300 ± 153 | 145 of 198 | 40 | 16-24 | 55.0% | 17.4% (vs 40) |
| h170 | candidate | 1722 ± 197 | 37 of 198 | 15 | 5-10 | 81.6% | 30.2% (vs 10) |
| h18 | candidate | 1286 ± 196 | 148 of 198 | 25 | 6-19 | 54.1% | 17.2% (vs 41) |
| h2 | candidate | 1552 ± 153 | 105 of 198 | 54 | 25-29 | 71.3% | 28.4% (vs 25) |
| h24 | candidate | 1477 ± 155 | 127 of 198 | 40 | 26-14 | 66.5% | 27.2% (vs 33) |
| h24v5 | candidate | 1569 ± 131 | 96 of 198 | 40 | 23-17 | 72.4% | 27.3% (vs 22) |
| h3 | candidate | 1533 ± 217 | 109 of 198 | 19 | 9-10 | 70.1% | 28.1% (vs 27) |
| h31 | candidate | 1458 ± 154 | 129 of 198 | 40 | 25-15 | 65.2% | 25.3% (vs 33) |
| h38 | candidate | 1490 ± 306 | 121 of 198 | 6 | 4-2 | 67.3% | 25.5% (vs 29) |
| h40 | candidate | 1558 ± 291 | 100 of 198 | 8 | 6-2 | 71.8% | 27.2% (vs 23) |
| h41 | candidate | 1430 ± 255 | 134 of 198 | 8 | 3-5 | 63.4% | 23.3% (vs 34) |
| h42 | candidate | 1430 ± 255 | 135 of 198 | 8 | 3-5 | 63.4% | 23.3% (vs 34) |
| h43 | candidate | 1516 ± 248 | 112 of 198 | 8 | 4-4 | 69.0% | 26.3% (vs 27) |
| h44 | candidate | 1701 ± 281 | 48 of 198 | 8 | 6-2 | 80.4% | 32.6% (vs 13) |
| h46 | candidate | 1430 ± 255 | 136 of 198 | 8 | 3-5 | 63.4% | 23.3% (vs 34) |
| h47 | candidate | 1516 ± 248 | 113 of 198 | 8 | 4-4 | 69.0% | 26.3% (vs 27) |
| h48 | candidate | 1516 ± 248 | 114 of 198 | 8 | 4-4 | 69.0% | 26.3% (vs 27) |
| h49 | candidate | 1516 ± 248 | 115 of 198 | 8 | 4-4 | 69.0% | 26.3% (vs 27) |
| h52 | candidate | 1430 ± 255 | 137 of 198 | 8 | 3-5 | 63.4% | 23.3% (vs 34) |
| h53 | candidate | 1603 ± 255 | 83 of 198 | 8 | 5-3 | 74.6% | 29.0% (vs 20) |
| h54 | candidate | 1590 ± 125 | 91 of 198 | 48 | 29-19 | 73.7% | 28.6% (vs 21) |
| h55 | candidate | 1560 ± 123 | 99 of 198 | 56 | 32-24 | 71.9% | 27.4% (vs 23) |
| h58 | candidate | 1472 ± 272 | 128 of 198 | 8 | 3-5 | 66.1% | 26.7% (vs 33) |
| h59 | candidate | 1516 ± 248 | 116 of 198 | 8 | 4-4 | 69.0% | 26.3% (vs 27) |
| h6 | candidate | 1484 ± 117 | 125 of 198 | 158 | 94-64 | 66.9% | 27.1% (vs 32) |
| h60 | candidate | 1516 ± 248 | 117 of 198 | 8 | 4-4 | 69.0% | 26.3% (vs 27) |
| h61 | candidate | 1629 ± 254 | 76 of 198 | 8 | 5-3 | 76.2% | 30.8% (vs 19) |
| h63 | candidate | 1595 ± 129 | 86 of 198 | 40 | 23-17 | 74.1% | 28.2% (vs 20) |
| h64 | candidate | 1578 ± 128 | 94 of 198 | 40 | 22-18 | 73.0% | 28.3% (vs 22) |
| h68 | candidate | 1728 ± 280 | 32 of 198 | 8 | 6-2 | 81.9% | 30.9% (vs 10) |
| h7 | candidate | 1518 ± 1448 | 110 of 198 | 8 | 8-0 | 69.2% | 26.6% (vs 27) |
| h72 | candidate | 1728 ± 280 | 33 of 198 | 8 | 6-2 | 81.9% | 30.9% (vs 10) |
| h76 | candidate | 1670 ± 186 | 62 of 198 | 32 | 18-14 | 78.7% | 33.4% (vs 17) |
| h77 | candidate | 1554 ± 187 | 102 of 198 | 16 | 8-8 | 71.5% | 27.8% (vs 24) |
| h78 | candidate | 1728 ± 280 | 34 of 198 | 8 | 6-2 | 81.9% | 30.9% (vs 10) |
| h82 | candidate | 1630 ± 98 | 74 of 198 | 134 | 70-64 | 76.2% | 29.8% (vs 18) |
| h83 | candidate | 1666 ± 299 | 64 of 198 | 8 | 4-4 | 78.4% | 32.9% (vs 17) |
| h84 | candidate | 1666 ± 299 | 65 of 198 | 8 | 4-4 | 78.4% | 32.9% (vs 17) |
| h88 | candidate | 1594 ± 145 | 88 of 198 | 40 | 18-22 | 74.1% | 29.1% (vs 21) |
| h89 | candidate | 801 ± 1086 | 174 of 198 | 8 | 0-8 | 28.6% | 8.5% (vs 66) |
| h8v5 | candidate | 1620 ± 127 | 79 of 198 | 48 | 31-17 | 75.7% | 29.8% (vs 19) |
| h90 | candidate | 801 ± 1086 | 175 of 198 | 8 | 0-8 | 28.6% | 8.5% (vs 66) |
| h91 | candidate | 1585 ± 195 | 93 of 198 | 16 | 7-9 | 73.5% | 29.1% (vs 22) |
| h96 | candidate | 1660 ± 104 | 67 of 198 | 58 | 24-34 | 78.0% | 32.1% (vs 17) |
| rush | sparring | 1286 ± 196 | 147 of 198 | 25 | 6-19 | 54.1% | 17.2% (vs 41) |
| rush4 | sparring | 1567 ± 134 | 97 of 198 | 50 | 30-20 | 72.3% | 27.1% (vs 22) |
| turtle | candidate | 1441 ± 195 | 132 of 198 | 20 | 4-16 | 64.1% | 24.3% (vs 34) |

Sources (`tools/progress/games.py`):

- local: 3243 games from 121 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 3625 games (11 archive games skipped, 429 matches from archives, 769 matches from scores), fetched 2026-10-25T17:15:34+00:00

Accepted builds whose code also played as a candidate: v4 = h6 (158 games, 94-64), v8 = h128 (54 games, 23-31), v9 = h167 (72 games, 38-34). Those games stay under the candidate's name: where they are the panel blocks that accepted it, they were selected for passing and overstate it (LEARNINGS 33). progress.png shows them beside the build's own games as hollow grey points.

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v9) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | m-schier.battlecode-2019-wololo | field | 2063 | 81 | 219 | 189-30 | 17% (v9 1-5) |
| 2 | mvpatel2000.Battlecode2019 | field | 2006 | 141 | 54 | 45-9 | 33% (v9 1-2) |
| 3 | uvafan.bc2019 | field | 1935 | 70 | 222 | 168-54 | 33% (v9 2-4) |
| 4 | rafekruse.Battlecode-2019-bc19 | field | 1898 | 136 | 48 | 36-12 | 0% (v8 0-3) |
| 5 | VoidMercy.battlecode-2019~e7dc06 | field | 1867 | 135 | 51 | 39-12 | 67% (v9 2-1) |
| 6 | yujinwunz.battlecode_2019 | field | 1867 | 130 | 63 | 47-16 | 0% (v8 0-3) |
| 7 | **cand:h167** | candidate | 1856 | 97 | 72 | 38-34 |  |
| 8 | **cand:h147** | candidate | 1826 | 109 | 58 | 34-24 |  |
| 9 | StoneT2000.BC19-botfinalsafe | field | 1821 | 64 | 249 | 160-89 | 17% (v9 1-5) |
| 10 | **cand:h163** | candidate | 1813 | 84 | 108 | 51-57 |  |
| 11 | **us:v9** | accepted | 1812 | 120 | 42 | 19-23 |  |
| 12 | **cand:h148** | candidate | 1810 | 83 | 112 | 58-54 |  |
| 13 | **cand:h159** | candidate | 1802 | 97 | 72 | 33-39 |  |
| 14 | **cand:h150** | candidate | 1801 | 108 | 58 | 32-26 |  |
| 15 | j-mao.battlecode-2019 | field | 1800 | 126 | 48 | 33-15 | 100% (v8 3-0) |
| 16 | StoneT2000.BC19-bot1v43 | field | 1791 | 63 | 243 | 144-99 | 50% (v9 3-3) |
| 17 | **cand:h145** | candidate | 1788 | 108 | 58 | 31-27 |  |
| 18 | **cand:h128** | candidate | 1776 | 109 | 54 | 23-31 |  |
| 19 | **cand:h146** | candidate | 1750 | 107 | 58 | 28-30 |  |
| 20 | **cand:h149** | candidate | 1750 | 107 | 58 | 28-30 |  |
| 21 | **cand:h143** | candidate | 1750 | 121 | 40 | 24-16 |  |
| 22 | **cand:h141** | candidate | 1749 | 103 | 58 | 31-27 |  |
| 23 | **cand:block** | candidate | 1749 | 162 | 20 | 12-8 |  |
| 24 | **cand:camp** | candidate | 1749 | 162 | 20 | 12-8 |  |
| 25 | **cand:h157** | candidate | 1746 | 130 | 36 | 14-22 |  |
| 26 | **cand:h161** | candidate | 1746 | 130 | 36 | 14-22 |  |
| 27 | **cand:h139** | candidate | 1739 | 93 | 76 | 37-39 |  |
| 28 | **cand:h140** | candidate | 1736 | 103 | 58 | 30-28 |  |
| 29 | **us:v8** | accepted | 1735 | 68 | 356 | 160-196 |  |
| 30 | **cand:h132** | candidate | 1732 | 120 | 40 | 23-17 |  |
| 31 | moreda-a.BC2019-a31 | field | 1730 | 125 | 54 | 36-18 | 67% (v8 2-1) |
| 32 | **cand:h68** | candidate | 1728 | 280 | 8 | 6-2 |  |
| 33 | **cand:h72** | candidate | 1728 | 280 | 8 | 6-2 |  |
| 34 | **cand:h78** | candidate | 1728 | 280 | 8 | 6-2 |  |
| 35 | **cand:h130** | candidate | 1724 | 103 | 58 | 29-29 |  |
| 36 | **cand:h162** | candidate | 1723 | 132 | 36 | 13-23 |  |
| 37 | **cand:h170** | candidate | 1722 | 197 | 15 | 5-10 |  |
| 38 | arya-k.bc19 | field | 1720 | 142 | 42 | 29-13 | 100% (v8 3-0) |
| 39 | awesomelemonade.Battlecode2019 | field | 1720 | 64 | 225 | 112-113 | 67% (v9 4-2) |
| 40 | **cand:h126** | candidate | 1716 | 90 | 98 | 49-49 |  |
| 41 | **cand:h133** | candidate | 1714 | 119 | 40 | 22-18 |  |
| 42 | **cand:h142** | candidate | 1714 | 119 | 40 | 22-18 |  |
| 43 | **cand:h104** | candidate | 1711 | 103 | 58 | 28-30 |  |
| 44 | **cand:h111** | candidate | 1711 | 103 | 58 | 28-30 |  |
| 45 | **cand:h112** | candidate | 1711 | 103 | 58 | 28-30 |  |
| 46 | **cand:h127** | candidate | 1706 | 90 | 98 | 47-51 |  |
| 47 | rafekruse.Battlecode-2019~2680d4 | field | 1704 | 152 | 36 | 26-10 |  |
| 48 | **cand:h44** | candidate | 1701 | 281 | 8 | 6-2 |  |
| 49 | IanCoolidge0.battlecode20~69ce88 | field | 1700 | 63 | 228 | 107-121 | 83% (v9 5-1) |
| 50 | **cand:h151** | candidate | 1699 | 127 | 40 | 18-22 |  |
| 51 | bqi343.cp-notebook | field | 1699 | 158 | 39 | 28-11 |  |
| 52 | **cand:h103** | candidate | 1699 | 93 | 76 | 33-43 |  |
| 53 | **cand:h115** | candidate | 1697 | 119 | 40 | 21-19 |  |
| 54 | **cand:h131** | candidate | 1697 | 119 | 40 | 21-19 |  |
| 55 | **cand:h138** | candidate | 1697 | 119 | 40 | 21-19 |  |
| 56 | **cand:h136** | candidate | 1689 | 93 | 76 | 32-44 |  |
| 57 | **cand:h135** | candidate | 1685 | 103 | 58 | 26-32 |  |
| 58 | **us:v7** | accepted | 1681 | 52 | 1804 | 927-877 |  |
| 59 | **cand:h118** | candidate | 1680 | 119 | 40 | 20-20 |  |
| 60 | virenvshah.Battlecode2019 | field | 1678 | 140 | 48 | 35-13 |  |
| 61 | cemondr.BC19pdxgroup4 | field | 1672 | 146 | 42 | 29-13 |  |
| 62 | **cand:h76** | candidate | 1670 | 186 | 32 | 18-14 |  |
| 63 | **cand:h100** | candidate | 1670 | 71 | 200 | 97-103 |  |
| 64 | **cand:h83** | candidate | 1666 | 299 | 8 | 4-4 |  |
| 65 | **cand:h84** | candidate | 1666 | 299 | 8 | 4-4 |  |
| 66 | **cand:h121** | candidate | 1660 | 104 | 58 | 24-34 |  |
| 67 | **cand:h96** | candidate | 1660 | 104 | 58 | 24-34 |  |
| 68 | **cand:h123** | candidate | 1647 | 104 | 58 | 23-35 |  |
| 69 | vineetparikh.BigRedBattle~fe3459 | field | 1646 | 143 | 45 | 31-14 |  |
| 70 | **cand:h101** | candidate | 1645 | 119 | 40 | 18-22 |  |
| 71 | **cand:h124** | candidate | 1645 | 119 | 40 | 18-22 |  |
| 72 | **cand:h125** | candidate | 1645 | 119 | 40 | 18-22 |  |
| 73 | **cand:h137** | candidate | 1645 | 119 | 40 | 18-22 |  |
| 74 | **cand:h82** | candidate | 1630 | 98 | 134 | 70-64 |  |
| 75 | ldcWV.Battlecode-2019 | field | 1630 | 146 | 42 | 28-14 |  |
| 76 | **cand:h61** | candidate | 1629 | 254 | 8 | 5-3 |  |
| 77 | **cand:h110** | candidate | 1627 | 120 | 40 | 17-23 |  |
| 78 | **cand:h113** | candidate | 1627 | 120 | 40 | 17-23 |  |
| 79 | **cand:h8v5** | candidate | 1620 | 127 | 48 | 31-17 |  |
| 80 | **cand:h114** | candidate | 1610 | 121 | 40 | 16-24 |  |
| 81 | **cand:h116** | candidate | 1610 | 121 | 40 | 16-24 |  |
| 82 | IanCoolidge0.battlecode20~f649f3 | field | 1603 | 122 | 66 | 39-27 | 100% (v8 3-0) |
| 83 | **cand:h53** | candidate | 1603 | 255 | 8 | 5-3 |  |
| 84 | **us:v3** | accepted | 1602 | 102 | 191 | 140-51 |  |
| 85 | **us:v0** | accepted | 1601 | 227 | 38 | 33-5 |  |
| 86 | **cand:h63** | candidate | 1595 | 129 | 40 | 23-17 |  |
| 87 | Nischay-Pro.BattleCode2019 | field | 1595 | 150 | 42 | 30-12 |  |
| 88 | **cand:h88** | candidate | 1594 | 145 | 40 | 18-22 |  |
| 89 | **cand:h107** | candidate | 1591 | 122 | 40 | 15-25 |  |
| 90 | **cand:h144** | candidate | 1591 | 122 | 40 | 15-25 |  |
| 91 | **cand:h54** | candidate | 1590 | 125 | 48 | 29-19 |  |
| 92 | IvanGeffner.BC19-bot6b | field | 1587 | 388 | 9 | 7-2 |  |
| 93 | **cand:h91** | candidate | 1585 | 195 | 16 | 7-9 |  |
| 94 | **cand:h64** | candidate | 1578 | 128 | 40 | 22-18 |  |
| 95 | **cand:h134** | candidate | 1573 | 123 | 40 | 14-26 |  |
| 96 | **cand:h24v5** | candidate | 1569 | 131 | 40 | 23-17 |  |
| 97 | **spar:rush4** | sparring | 1567 | 134 | 50 | 30-20 |  |
| 98 | howard36.Battlecode2019-eco6 | field | 1563 | 136 | 45 | 25-20 |  |
| 99 | **cand:h55** | candidate | 1560 | 123 | 56 | 32-24 |  |
| 100 | **cand:h40** | candidate | 1558 | 291 | 8 | 6-2 |  |
| 101 | NielsKornerup.Battlecode-2019 | field | 1556 | 115 | 69 | 40-29 |  |
| 102 | **cand:h77** | candidate | 1554 | 187 | 16 | 8-8 |  |
| 103 | **cand:h11c** | candidate | 1554 | 180 | 25 | 15-10 |  |
| 104 | unrevre.battlecode | field | 1553 | 157 | 36 | 22-14 |  |
| 105 | **cand:h2** | candidate | 1552 | 153 | 54 | 25-29 |  |
| 106 | UpperArlingtonHighSchool.~682aa9 | field | 1548 | 156 | 45 | 28-17 |  |
| 107 | **us:v6** | accepted | 1543 | 70 | 322 | 130-192 |  |
| 108 | abcdefguan.battlecode2019 | field | 1536 | 152 | 45 | 28-17 |  |
| 109 | **cand:h3** | candidate | 1533 | 217 | 19 | 9-10 |  |
| 110 | **cand:h7** | candidate | 1518 | 1448 | 8 | 8-0 |  |
| 111 | **us:v5** | accepted | 1516 | 75 | 439 | 202-237 |  |
| 112 | **cand:h43** | candidate | 1516 | 248 | 8 | 4-4 |  |
| 113 | **cand:h47** | candidate | 1516 | 248 | 8 | 4-4 |  |
| 114 | **cand:h48** | candidate | 1516 | 248 | 8 | 4-4 |  |
| 115 | **cand:h49** | candidate | 1516 | 248 | 8 | 4-4 |  |
| 116 | **cand:h59** | candidate | 1516 | 248 | 8 | 4-4 |  |
| 117 | **cand:h60** | candidate | 1516 | 248 | 8 | 4-4 |  |
| 118 | **cand:h129** | candidate | 1512 | 130 | 40 | 11-29 |  |
| 119 | lschaberg.bc19 | field | 1508 | 139 | 48 | 29-19 |  |
| 120 | IvanGeffner.BC19-eigthbot | field | 1494 | 296 | 9 | 6-3 |  |
| 121 | **cand:h38** | candidate | 1490 | 306 | 6 | 4-2 |  |
| 122 | programjames.BC19Bot-seeding | field | 1489 | 143 | 42 | 26-16 |  |
| 123 | dmunozc.bc19-g8-davjasdiv | field | 1488 | 135 | 51 | 29-22 |  |
| 124 | m4reko.bc2019-tmores-angels | field | 1488 | 137 | 48 | 30-18 |  |
| 125 | **cand:h6** | candidate | 1484 | 117 | 158 | 94-64 |  |
| 126 | ovkulkarni.battlecode2019~0aa607 | field | 1479 | 137 | 42 | 26-16 |  |
| 127 | **cand:h24** | candidate | 1477 | 155 | 40 | 26-14 |  |
| 128 | **cand:h58** | candidate | 1472 | 272 | 8 | 3-5 |  |
| 129 | **cand:h31** | candidate | 1458 | 154 | 40 | 25-15 |  |
| 130 | dmunozc.bc19-g8-bots | field | 1454 | 137 | 45 | 25-20 |  |
| 131 | **us:v1** | accepted | 1450 | 142 | 154 | 128-26 |  |
| 132 | **cand:turtle** | candidate | 1441 | 195 | 20 | 4-16 |  |
| 133 | **us:v2** | accepted | 1434 | 143 | 62 | 30-32 |  |
| 134 | **cand:h41** | candidate | 1430 | 255 | 8 | 3-5 |  |
| 135 | **cand:h42** | candidate | 1430 | 255 | 8 | 3-5 |  |
| 136 | **cand:h46** | candidate | 1430 | 255 | 8 | 3-5 |  |
| 137 | **cand:h52** | candidate | 1430 | 255 | 8 | 3-5 |  |
| 138 | Tom-CCS.BC19 | field | 1415 | 143 | 48 | 26-22 |  |
| 139 | ovkulkarni.battlecode2019~06c610 | field | 1413 | 142 | 42 | 27-15 |  |
| 140 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1389 | 112 | 81 | 39-42 |  |
| 141 | **us:v4** | accepted | 1369 | 107 | 220 | 83-137 |  |
| 142 | ipercyNC.group6-battlecode | field | 1340 | 134 | 51 | 26-25 |  |
| 143 | CS554-software-engineerin~a575dc | field | 1313 | 86 | 269 | 162-107 | 100% (v7 3-0) |
| 144 | sunanth123.battlecode19-prorush | field | 1309 | 142 | 39 | 19-20 |  |
| 145 | **cand:h16r** | candidate | 1300 | 153 | 40 | 16-24 |  |
| 146 | programjames.BC19Bot-root | field | 1296 | 133 | 51 | 29-22 |  |
| 147 | **spar:rush** | sparring | 1286 | 196 | 25 | 6-19 |  |
| 148 | **cand:h18** | candidate | 1286 | 196 | 25 | 6-19 |  |
| 149 | sunanth123.battlecode19-mainbot | field | 1272 | 147 | 48 | 23-25 |  |
| 150 | cvxluo.battlecode19 | field | 1265 | 135 | 57 | 29-28 |  |
| 151 | moreda-a.BC2019-t15 | field | 1255 | 141 | 51 | 27-24 |  |
| 152 | evanyeyeye.battlecode2019~af562c | field | 1251 | 132 | 51 | 27-24 |  |
| 153 | CometsTech.battlecode2019 | field | 1249 | 92 | 222 | 100-122 | 100% (v7 3-0) |
| 154 | nthistle.battlecode-2019 | field | 1247 | 137 | 54 | 25-29 | 100% (v5 3-0) |
| 155 | jamesrayman.HCN-bot | field | 1231 | 145 | 51 | 25-26 | 100% (v5 3-0) |
| 156 | vicennial.BattleCode19 | field | 1217 | 153 | 51 | 27-24 |  |
| 157 | bayoumi17m.BattleCode-2019 | field | 1201 | 147 | 45 | 22-23 |  |
| 158 | JasonLarson44.2019-Battle~1c7639 | field | 1196 | 135 | 54 | 25-29 | 100% (v3 3-0) |
| 159 | Nydroam.BatteredCod | field | 1195 | 429 | 6 | 3-3 |  |
| 160 | twitu.bc19-tsp | field | 1100 | 169 | 48 | 25-23 |  |
| 161 | spachava753.bc19 | field | 1080 | 152 | 42 | 22-20 |  |
| 162 | TestSubjector.BattleCode2~e6de74 | field | 1015 | 170 | 54 | 27-27 |  |
| 163 | UpperArlingtonHighSchool.~5e7875 | field | 999 | 177 | 42 | 16-26 |  |
| 164 | haydenshively.Battle-Code~e1c2fb | field | 988 | 150 | 45 | 18-27 |  |
| 165 | 18dcb01.Battlecode19-robot2 | field | 955 | 175 | 51 | 21-30 |  |
| 166 | dgh2.bc19-t1 | field | 940 | 225 | 39 | 18-21 |  |
| 167 | dndoja.battlecode19 | field | 936 | 159 | 42 | 18-24 |  |
| 168 | haydenshively.Battle-Code~e37b3e | field | 929 | 165 | 45 | 17-28 |  |
| 169 | rooneyshuman.Battlecode | field | 927 | 173 | 48 | 22-26 |  |
| 170 | TestSubjector.BattleCode2~fb22c7 | field | 911 | 179 | 60 | 21-39 |  |
| 171 | roy-love.onshoreBattleCode2019 | field | 894 | 158 | 45 | 23-22 |  |
| 172 | CometsTech.battlecode2019~187e8c | field | 863 | 165 | 51 | 23-28 |  |
| 173 | jackliu612.Battlecode19 | field | 858 | 217 | 36 | 11-25 |  |
| 174 | **cand:h89** | candidate | 801 | 1086 | 8 | 0-8 |  |
| 175 | **cand:h90** | candidate | 801 | 1086 | 8 | 0-8 |  |
| 176 | liwanlin41.examplefuncsplayer | field | 799 | 173 | 66 | 21-45 |  |
| 177 | asunathanr.asu_bc | field | 795 | 165 | 51 | 20-31 |  |
| 178 | jyurkanin.corn_bc19 | field | 693 | 230 | 48 | 18-30 |  |
| 179 | SethKitchen.examplefuncsplayer | field | 676 | 230 | 54 | 20-34 |  |
| 180 | VictorButoi.BattleCode201~c4576b | field | 659 | 185 | 42 | 15-27 |  |
| 181 | howard36.Battlecode2019-sprint | field | 624 | 197 | 42 | 16-26 |  |
| 182 | OmarTahoun.battle-code | field | 581 | 175 | 54 | 18-36 |  |
| 183 | bovard.battlecode-2019-un~8822c3 | field | 474 | 279 | 39 | 13-26 |  |
| 184 | nhard.examplefuncsplayer | field | 466 | 227 | 42 | 17-25 |  |
| 185 | waylon531.scala_starter | field | 457 | 216 | 51 | 15-36 |  |
| 186 | vishwasns99.BC_2019 | field | 343 | 268 | 42 | 12-30 |  |
| 187 | DivyanshuSaxena.Battlecode | field | 322 | 228 | 57 | 18-39 |  |
| 188 | VoidMercy.battlecode-2019-bot | field | 264 | 251 | 42 | 13-29 |  |
| 189 | jbiewend.Battlecode2019 | field | 261 | 242 | 42 | 13-29 |  |
| 190 | bc19-starter | field | 246 | 218 | 349 | 65-284 | 100% (v3 12-0) |
| 191 | ryanhzhao.Battlecode-2019 | field | 164 | 288 | 42 | 10-32 |  |
| 192 | RyanSharafuddin.Battlecode_2019 | field | 109 | 219 | 72 | 13-59 |  |
| 193 | djkeyes.bc19 | field | 40 | 256 | 39 | 9-30 |  |
| 194 | yunaganyh.bc19 | field | -233 | 276 | 45 | 8-37 |  |
| 195 | TheRobotCarlson.battlehac~323871 | field | -273 | 259 | 57 | 5-52 |  |
| 196 | jshin313.battlecodebot | field | -277 | 277 | 42 | 5-37 |  |
| 197 | jamesrayman.HCN-basic-bot | field | -334 | 289 | 39 | 4-35 |  |
| 198 | ArtemUstilov.bc19_CrazyTapok | field | -804 | 1094 | 81 | 0-81 |  |

Every pairing (W-L of the first player; where the games were played):

| player | opponent | games | W-L | win % | where |
|---|---|---|---|---|---|
| m-schier.battlecode-2019-wololo | mvpatel2000.Battlecode2019 | 3 | 0-3 | 0% | replica |
| m-schier.battlecode-2019-wololo | yujinwunz.battlecode_2019 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h167 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h163 | 18 | 15-3 | 83% | replica |
| m-schier.battlecode-2019-wololo | us:v9 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h148 | 12 | 9-3 | 75% | replica |
| m-schier.battlecode-2019-wololo | cand:h159 | 12 | 10-2 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h150 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h149 | 3 | 2-1 | 67% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h157 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h161 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | us:v8 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h130 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h162 | 6 | 5-1 | 83% | replica |
| m-schier.battlecode-2019-wololo | cand:h170 | 3 | 2-1 | 67% | replica |
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
| mvpatel2000.Battlecode2019 | uvafan.bc2019 | 3 | 2-1 | 67% | replica |
| mvpatel2000.Battlecode2019 | yujinwunz.battlecode_2019 | 3 | 2-1 | 67% | replica |
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
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h163 | 18 | 11-7 | 61% | replica |
| uvafan.bc2019 | us:v9 | 6 | 4-2 | 67% | replica |
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
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v8 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h130 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h162 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h126 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h104 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h127 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h103 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h136 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | cand:h135 | 3 | 1-2 | 33% | replica |
| uvafan.bc2019 | us:v7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h82 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | IanCoolidge0.battlecode20~f649f3 | 6 | 5-1 | 83% | replica |
| uvafan.bc2019 | NielsKornerup.Battlecode-2019 | 6 | 4-2 | 67% | replica |
| uvafan.bc2019 | unrevre.battlecode | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v6 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | us:v5 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | VoidMercy.battlecode-2019~e7dc06 | 6 | 3-3 | 50% | replica |
| rafekruse.Battlecode-2019-bc19 | yujinwunz.battlecode_2019 | 6 | 5-1 | 83% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 6 | 3-3 | 50% | replica |
| rafekruse.Battlecode-2019-bc19 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | us:v8 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
| yujinwunz.battlecode_2019 | StoneT2000.BC19-bot1v43 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | us:v8 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
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
| cand:h147 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h147 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h147 | us:v8 | 40 | 26-14 | 65% | local |
| cand:h147 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h147 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h163 | 18 | 10-8 | 56% | replica |
| StoneT2000.BC19-botfinalsafe | us:v9 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h148 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h159 | 12 | 9-3 | 75% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h150 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | StoneT2000.BC19-bot1v43 | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h145 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h128 | 9 | 6-3 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h149 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h141 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h157 | 6 | 6-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h161 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h139 | 6 | 2-4 | 33% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | us:v8 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h130 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h162 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-botfinalsafe | CS554-software-engineerin~a575dc | 6 | 5-1 | 83% | replica |
| StoneT2000.BC19-botfinalsafe | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-botfinalsafe | bc19-starter | 3 | 3-0 | 100% | replica |
| cand:h163 | StoneT2000.BC19-bot1v43 | 18 | 8-10 | 44% | replica |
| cand:h163 | awesomelemonade.Battlecode2019 | 18 | 11-7 | 61% | replica |
| cand:h163 | IanCoolidge0.battlecode20~69ce88 | 18 | 14-4 | 78% | replica |
| us:v9 | StoneT2000.BC19-bot1v43 | 6 | 3-3 | 50% | replica |
| us:v9 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| us:v9 | IanCoolidge0.battlecode20~69ce88 | 6 | 5-1 | 83% | replica |
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
| j-mao.battlecode-2019 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| StoneT2000.BC19-bot1v43 | cand:h145 | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-bot1v43 | cand:h170 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h126 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h104 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h111 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h112 | 3 | 1-2 | 33% | replica |
| StoneT2000.BC19-bot1v43 | cand:h127 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | IanCoolidge0.battlecode20~69ce88 | 6 | 2-4 | 33% | replica |
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
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h140 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
| us:v8 | moreda-a.BC2019-a31 | 3 | 2-1 | 67% | replica |
| us:v8 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| us:v8 | cand:h151 | 40 | 22-18 | 55% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| us:v8 | IanCoolidge0.battlecode20~f649f3 | 3 | 3-0 | 100% | replica |
| cand:h132 | us:v7 | 40 | 23-17 | 57% | local |
| moreda-a.BC2019-a31 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | Nischay-Pro.BattleCode2019 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 6 | 3-3 | 50% | replica |
| moreda-a.BC2019-a31 | NielsKornerup.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 9 | 7-2 | 78% | replica |
| moreda-a.BC2019-a31 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
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
| arya-k.bc19 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | rafekruse.Battlecode-2019~2680d4 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h126 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h104 | 3 | 3-0 | 100% | replica |
| awesomelemonade.Battlecode2019 | cand:h111 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h112 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | cand:h127 | 3 | 1-2 | 33% | replica |
| awesomelemonade.Battlecode2019 | IanCoolidge0.battlecode20~69ce88 | 3 | 0-3 | 0% | replica |
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
| awesomelemonade.Battlecode2019 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| awesomelemonade.Battlecode2019 | us:v5 | 3 | 2-1 | 67% | replica |
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
| rafekruse.Battlecode-2019~2680d4 | virenvshah.Battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
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
| IanCoolidge0.battlecode20~69ce88 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | us:v5 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IanCoolidge0.battlecode20~69ce88 | 18dcb01.Battlecode19-robot2 | 6 | 5-1 | 83% | replica |
| IanCoolidge0.battlecode20~69ce88 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | cemondr.BC19pdxgroup4 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 6 | 6-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
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
| virenvshah.Battlecode2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | vineetparikh.BigRedBattle~fe3459 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | Nischay-Pro.BattleCode2019 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | unrevre.battlecode | 3 | 1-2 | 33% | replica |
| virenvshah.Battlecode2019 | Tom-CCS.BC19 | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| virenvshah.Battlecode2019 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| virenvshah.Battlecode2019 | bc19-starter | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | ldcWV.Battlecode-2019 | 3 | 1-2 | 33% | replica |
| cemondr.BC19pdxgroup4 | howard36.Battlecode2019-eco6 | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
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
| vineetparikh.BigRedBattle~fe3459 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vineetparikh.BigRedBattle~fe3459 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| cand:h82 | cand:h88 | 40 | 22-18 | 55% | local |
| cand:h82 | cand:h91 | 16 | 9-7 | 56% | local |
| cand:h82 | us:v6 | 44 | 28-16 | 64% | local |
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
| cand:h61 | us:v6 | 8 | 5-3 | 62% | local |
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
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
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| us:v3 | cand:h2 | 35 | 20-15 | 57% | local |
| us:v3 | cand:h6 | 35 | 16-19 | 46% | local |
| us:v3 | us:v2 | 34 | 25-9 | 74% | local |
| us:v3 | CS554-software-engineerin~a575dc | 30 | 28-2 | 93% | replica |
| us:v3 | CometsTech.battlecode2019 | 33 | 33-0 | 100% | replica |
| us:v3 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| us:v3 | bc19-starter | 12 | 12-0 | 100% | replica |
| us:v0 | us:v1 | 17 | 12-5 | 71% | local |
| us:v0 | bc19-starter | 21 | 21-0 | 100% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| Nischay-Pro.BattleCode2019 | NielsKornerup.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| cand:h54 | us:v5 | 48 | 29-19 | 60% | local |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| cand:h64 | us:v6 | 40 | 22-18 | 55% | local |
| cand:h24v5 | us:v5 | 40 | 23-17 | 57% | local |
| spar:rush4 | cand:h77 | 8 | 8-0 | 100% | local |
| spar:rush4 | us:v6 | 6 | 6-0 | 100% | local |
| spar:rush4 | cand:h89 | 8 | 8-0 | 100% | local |
| spar:rush4 | cand:h90 | 8 | 8-0 | 100% | local |
| howard36.Battlecode2019-eco6 | m4reko.bc2019-tmores-angels | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| NielsKornerup.Battlecode-2019 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| unrevre.battlecode | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| abcdefguan.battlecode2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
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
| us:v5 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| us:v5 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| us:v5 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | dmunozc.bc19-g8-davjasdiv | 6 | 4-2 | 67% | replica |
| lschaberg.bc19 | m4reko.bc2019-tmores-angels | 3 | 1-2 | 33% | replica |
| lschaberg.bc19 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| lschaberg.bc19 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| lschaberg.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| programjames.BC19Bot-seeding | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 6 | 5-1 | 83% | replica |
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 6 | 4-2 | 67% | replica |
| programjames.BC19Bot-seeding | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-davjasdiv | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-davjasdiv | SethKitchen.examplefuncsplayer | 6 | 6-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| cand:h6 | us:v4 | 40 | 19-21 | 48% | local |
| cand:h6 | spar:rush | 25 | 19-6 | 76% | local |
| cand:h6 | cand:h18 | 25 | 19-6 | 76% | local |
| cand:h6 | bc19-starter | 8 | 8-0 | 100% | local |
| ovkulkarni.battlecode2019~0aa607 | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | CS554-software-engineerin~a575dc | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | programjames.BC19Bot-root | 3 | 1-2 | 33% | replica |
| ovkulkarni.battlecode2019~0aa607 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~0aa607 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~0aa607 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| cand:h24 | us:v4 | 40 | 26-14 | 65% | local |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| dmunozc.bc19-g8-bots | ovkulkarni.battlecode2019~06c610 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| Tom-CCS.BC19 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 6 | 4-2 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | nthistle.battlecode-2019 | 3 | 0-3 | 0% | replica |
| ovkulkarni.battlecode2019~06c610 | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ovkulkarni.battlecode2019~06c610 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| ovkulkarni.battlecode2019~06c610 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | cvxluo.battlecode19 | 3 | 1-2 | 33% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | evanyeyeye.battlecode2019~af562c | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | bc19-starter | 3 | 3-0 | 100% | replica |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| ipercyNC.group6-battlecode | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | bayoumi17m.BattleCode-2019 | 3 | 2-1 | 67% | replica |
| ipercyNC.group6-battlecode | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | programjames.BC19Bot-root | 6 | 6-0 | 100% | replica |
| CS554-software-engineerin~a575dc | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| sunanth123.battlecode19-prorush | sunanth123.battlecode19-mainbot | 3 | 1-2 | 33% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
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
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | moreda-a.BC2019-t15 | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | nthistle.battlecode-2019 | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | evanyeyeye.battlecode2019~af562c | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-t15 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | UpperArlingtonHighSchool.~5e7875 | 3 | 0-3 | 0% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-t15 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | bayoumi17m.BattleCode-2019 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | spachava753.bc19 | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| evanyeyeye.battlecode2019~af562c | dndoja.battlecode19 | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | haydenshively.Battle-Code~e37b3e | 3 | 2-1 | 67% | replica |
| evanyeyeye.battlecode2019~af562c | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| evanyeyeye.battlecode2019~af562c | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| CometsTech.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019 | bc19-starter | 30 | 30-0 | 100% | replica |
| CometsTech.battlecode2019 | ArtemUstilov.bc19_CrazyTapok | 18 | 18-0 | 100% | replica |
| nthistle.battlecode-2019 | JasonLarson44.2019-Battle~1c7639 | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | twitu.bc19-tsp | 3 | 1-2 | 33% | replica |
| nthistle.battlecode-2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| nthistle.battlecode-2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | JasonLarson44.2019-Battle~1c7639 | 6 | 3-3 | 50% | replica |
| jamesrayman.HCN-bot | spachava753.bc19 | 3 | 2-1 | 67% | replica |
| jamesrayman.HCN-bot | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | liwanlin41.examplefuncsplayer | 3 | 1-2 | 33% | replica |
| jamesrayman.HCN-bot | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| jamesrayman.HCN-bot | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| vicennial.BattleCode19 | waylon531.scala_starter | 6 | 6-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| bayoumi17m.BattleCode-2019 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bayoumi17m.BattleCode-2019 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| JasonLarson44.2019-Battle~1c7639 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| Nydroam.BatteredCod | CometsTech.battlecode2019~187e8c | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | 18dcb01.Battlecode19-robot2 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | dgh2.bc19-t1 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | TestSubjector.BattleCode2~fb22c7 | 3 | 2-1 | 67% | replica |
| twitu.bc19-tsp | vishwasns99.BC_2019 | 9 | 9-0 | 100% | replica |
| twitu.bc19-tsp | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| twitu.bc19-tsp | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | TestSubjector.BattleCode2~e6de74 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| spachava753.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 2-1 | 67% | replica |
| spachava753.bc19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | 18dcb01.Battlecode19-robot2 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | CometsTech.battlecode2019~187e8c | 6 | 4-2 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | asunathanr.asu_bc | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~e6de74 | DivyanshuSaxena.Battlecode | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~e6de74 | bc19-starter | 6 | 5-1 | 83% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e1c2fb | 3 | 1-2 | 33% | replica |
| UpperArlingtonHighSchool.~5e7875 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | TestSubjector.BattleCode2~fb22c7 | 3 | 0-3 | 0% | replica |
| UpperArlingtonHighSchool.~5e7875 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~5e7875 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | dndoja.battlecode19 | 6 | 4-2 | 67% | replica |
| haydenshively.Battle-Code~e1c2fb | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e1c2fb | roy-love.onshoreBattleCode2019 | 3 | 0-3 | 0% | replica |
| haydenshively.Battle-Code~e1c2fb | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e1c2fb | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TestSubjector.BattleCode2~fb22c7 | 6 | 4-2 | 67% | replica |
| 18dcb01.Battlecode19-robot2 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | bc19-starter | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-robot2 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| dgh2.bc19-t1 | bovard.battlecode-2019-un~8822c3 | 6 | 6-0 | 100% | replica |
| dgh2.bc19-t1 | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dgh2.bc19-t1 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| dndoja.battlecode19 | rooneyshuman.Battlecode | 6 | 4-2 | 67% | replica |
| dndoja.battlecode19 | roy-love.onshoreBattleCode2019 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | jackliu612.Battlecode19 | 3 | 2-1 | 67% | replica |
| dndoja.battlecode19 | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| dndoja.battlecode19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | roy-love.onshoreBattleCode2019 | 3 | 0-3 | 0% | replica |
| haydenshively.Battle-Code~e37b3e | CometsTech.battlecode2019~187e8c | 3 | 1-2 | 33% | replica |
| haydenshively.Battle-Code~e37b3e | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| haydenshively.Battle-Code~e37b3e | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | waylon531.scala_starter | 3 | 2-1 | 67% | replica |
| TestSubjector.BattleCode2~fb22c7 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| TestSubjector.BattleCode2~fb22c7 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | asunathanr.asu_bc | 3 | 1-2 | 33% | replica |
| roy-love.onshoreBattleCode2019 | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| roy-love.onshoreBattleCode2019 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| roy-love.onshoreBattleCode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | asunathanr.asu_bc | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jackliu612.Battlecode19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jyurkanin.corn_bc19 | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | VictorButoi.BattleCode201~c4576b | 6 | 5-1 | 83% | replica |
| liwanlin41.examplefuncsplayer | howard36.Battlecode2019-sprint | 3 | 2-1 | 67% | replica |
| liwanlin41.examplefuncsplayer | OmarTahoun.battle-code | 3 | 1-2 | 33% | replica |
| liwanlin41.examplefuncsplayer | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| liwanlin41.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VictorButoi.BattleCode201~c4576b | 3 | 2-1 | 67% | replica |
| asunathanr.asu_bc | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| asunathanr.asu_bc | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | SethKitchen.examplefuncsplayer | 3 | 2-1 | 67% | replica |
| jyurkanin.corn_bc19 | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jyurkanin.corn_bc19 | jshin313.battlecodebot | 6 | 6-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | OmarTahoun.battle-code | 6 | 5-1 | 83% | replica |
| SethKitchen.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | ryanhzhao.Battlecode-2019 | 3 | 2-1 | 67% | replica |
| SethKitchen.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| SethKitchen.examplefuncsplayer | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | OmarTahoun.battle-code | 3 | 2-1 | 67% | replica |
| VictorButoi.BattleCode201~c4576b | VoidMercy.battlecode-2019-bot | 6 | 6-0 | 100% | replica |
| VictorButoi.BattleCode201~c4576b | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jbiewend.Battlecode2019 | 6 | 6-0 | 100% | replica |
| howard36.Battlecode2019-sprint | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-sprint | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| OmarTahoun.battle-code | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | nhard.examplefuncsplayer | 3 | 0-3 | 0% | replica |
| bovard.battlecode-2019-un~8822c3 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| bovard.battlecode-2019-un~8822c3 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | DivyanshuSaxena.Battlecode | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | VoidMercy.battlecode-2019-bot | 3 | 1-2 | 33% | replica |
| nhard.examplefuncsplayer | jbiewend.Battlecode2019 | 3 | 2-1 | 67% | replica |
| nhard.examplefuncsplayer | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| nhard.examplefuncsplayer | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| waylon531.scala_starter | vishwasns99.BC_2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | bc19-starter | 3 | 2-1 | 67% | replica |
| waylon531.scala_starter | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| waylon531.scala_starter | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | RyanSharafuddin.Battlecode_2019 | 6 | 6-0 | 100% | replica |
| vishwasns99.BC_2019 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| vishwasns99.BC_2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | bc19-starter | 9 | 5-4 | 56% | replica |
| DivyanshuSaxena.Battlecode | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| DivyanshuSaxena.Battlecode | TheRobotCarlson.battlehac~323871 | 6 | 5-1 | 83% | replica |
| DivyanshuSaxena.Battlecode | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019-bot | yunaganyh.bc19 | 6 | 5-1 | 83% | replica |
| VoidMercy.battlecode-2019-bot | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| jbiewend.Battlecode2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| bc19-starter | RyanSharafuddin.Battlecode_2019 | 6 | 2-4 | 33% | replica |
| bc19-starter | TheRobotCarlson.battlehac~323871 | 9 | 8-1 | 89% | replica |
| bc19-starter | jamesrayman.HCN-basic-bot | 6 | 6-0 | 100% | replica |
| bc19-starter | ArtemUstilov.bc19_CrazyTapok | 42 | 42-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | djkeyes.bc19 | 6 | 3-3 | 50% | replica |
| ryanhzhao.Battlecode-2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| ryanhzhao.Battlecode-2019 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| RyanSharafuddin.Battlecode_2019 | TheRobotCarlson.battlehac~323871 | 9 | 9-0 | 100% | replica |
| djkeyes.bc19 | jshin313.battlecodebot | 3 | 3-0 | 100% | replica |
| djkeyes.bc19 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| yunaganyh.bc19 | jshin313.battlecodebot | 6 | 3-3 | 50% | replica |
| yunaganyh.bc19 | jamesrayman.HCN-basic-bot | 6 | 4-2 | 67% | replica |
| TheRobotCarlson.battlehac~323871 | jshin313.battlecodebot | 3 | 2-1 | 67% | replica |
| TheRobotCarlson.battlehac~323871 | jamesrayman.HCN-basic-bot | 3 | 1-2 | 33% | replica |
