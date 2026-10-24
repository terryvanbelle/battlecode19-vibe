# Ratings (Bradley-Terry)

Written by `tools/progress/elo.py` from `progress/games.csv` (`tools/progress-refresh.sh`): regenerate, do not edit. Latest game 2026-10-24 09:37 PDT.

5462 games: 3205 local (VM batches between our builds, candidates, sparring partners and the starter bot), 763 of ours on the galaxy replica and 1494 between field bots there (1491 replica games known only from match scores: no map, side or rounds). Rated by a batch Bradley-Terry fit on the Elo scale (`tools/progress/elolib.py`): every game counts, each pair of players at most 200 games, each build its own player, prior 0.1 virtual win and loss against 1500. Ratings are relative to the mean of all 190 players; compare them only within this fit.

**Thin field.** 89 rated field bots (mvpatel2000.Battlecode2019, m-schier.battlecode-2019-wololo, uvafan.bc2019, rafekruse.Battlecode-2019-bc19, VoidMercy.battlecode-2019~e7dc06, yujinwunz.battlecode_2019, IanCoolidge0.battlecode20~69ce88, StoneT2000.BC19-bot1v43, moreda-a.BC2019-a31, j-mao.battlecode-2019, StoneT2000.BC19-botfinalsafe, awesomelemonade.Battlecode2019, arya-k.bc19, IvanGeffner.BC19-bot6b, bqi343.cp-notebook, virenvshah.Battlecode2019, vineetparikh.BigRedBattle~fe3459, rafekruse.Battlecode-2019~2680d4, ldcWV.Battlecode-2019, IanCoolidge0.battlecode20~f649f3, howard36.Battlecode2019-eco6, cemondr.BC19pdxgroup4, UpperArlingtonHighSchool.~682aa9, Nischay-Pro.BattleCode2019, NielsKornerup.Battlecode-2019, unrevre.battlecode, abcdefguan.battlecode2019, lschaberg.bc19, ovkulkarni.battlecode2019~0aa607, IvanGeffner.BC19-eigthbot, m4reko.bc2019-tmores-angels, dmunozc.bc19-g8-davjasdiv, programjames.BC19Bot-seeding, Tom-CCS.BC19, sunanth123.battlecode19-mainbot, dmunozc.bc19-g8-bots, programjames.BC19Bot-root, 18dcb01.Battlecode19-prea~fb5c48, ovkulkarni.battlecode2019~06c610, nthistle.battlecode-2019, cvxluo.battlecode19, ipercyNC.group6-battlecode, CS554-software-engineerin~a575dc, sunanth123.battlecode19-prorush, CometsTech.battlecode2019, UpperArlingtonHighSchool.~5e7875, Nydroam.BatteredCod, jamesrayman.HCN-bot, evanyeyeye.battlecode2019~af562c, moreda-a.BC2019-t15, JasonLarson44.2019-Battle~1c7639, bayoumi17m.BattleCode-2019, vicennial.BattleCode19, twitu.bc19-tsp, TestSubjector.BattleCode2~fb22c7, haydenshively.Battle-Code~e1c2fb, 18dcb01.Battlecode19-robot2, haydenshively.Battle-Code~e37b3e, TestSubjector.BattleCode2~e6de74, jackliu612.Battlecode19, dgh2.bc19-t1, spachava753.bc19, liwanlin41.examplefuncsplayer, dndoja.battlecode19, asunathanr.asu_bc, CometsTech.battlecode2019~187e8c, rooneyshuman.Battlecode, SethKitchen.examplefuncsplayer, roy-love.onshoreBattleCode2019, bovard.battlecode-2019-un~8822c3, VictorButoi.BattleCode201~c4576b, OmarTahoun.battle-code, jyurkanin.corn_bc19, DivyanshuSaxena.Battlecode, howard36.Battlecode2019-sprint, waylon531.scala_starter, vishwasns99.BC_2019, bc19-starter, VoidMercy.battlecode-2019-bot, nhard.examplefuncsplayer, ryanhzhao.Battlecode-2019, RyanSharafuddin.Battlecode_2019, jbiewend.Battlecode2019, djkeyes.bc19, TheRobotCarlson.battlehac~323871, jamesrayman.HCN-basic-bot, yunaganyh.bc19, jshin313.battlecodebot, ArtemUstilov.bc19_CrazyTapok) out of the replica's 86 teams: the whole public field is entered (BENCHMARK.md), but the replica plays a few matches an hour, so only these have rated games against our builds and the field score below is an expected score against them alone, one of them the starter. With so few games the 95% intervals are wide, and ratings will move as the replica's games accumulate. Round-0 init failures (a bot that never started: machine load or a broken bot) are not games and are left out.

Our builds (accepted = bots/ROSTER.tsv v*, candidate = a dist/ bundle, sparring = a training partner). Field score = expected score against every rated field bot (89), one game each; vs higher = the same against only the field bots rated above, with their count.

| build | kind | rating | rank | games | record | field score | vs higher |
|---|---|---|---|---|---|---|---|
| v0 | accepted | 1584 ± 232 | 88 of 190 | 38 | 33-5 | 72.2% | 27.0% (vs 23) |
| v1 | accepted | 1432 ± 151 | 129 of 190 | 154 | 128-26 | 62.5% | 23.0% (vs 36) |
| v2 | accepted | 1421 ± 150 | 130 of 190 | 62 | 30-32 | 61.8% | 22.0% (vs 36) |
| v3 | accepted | 1590 ± 111 | 87 of 190 | 191 | 140-51 | 72.6% | 27.6% (vs 23) |
| v4 | accepted | 1375 ± 111 | 131 of 190 | 220 | 83-137 | 58.8% | 18.2% (vs 36) |
| v5 | accepted | 1532 ± 80 | 102 of 190 | 439 | 202-237 | 68.9% | 25.3% (vs 27) |
| v6 | accepted | 1565 ± 76 | 94 of 190 | 322 | 130-192 | 71.0% | 26.8% (vs 25) |
| v7 | accepted | 1712 ± 62 | 46 of 190 | 1804 | 927-877 | 79.8% | 28.9% (vs 12) |
| v8 | accepted | 1757 ± 91 | 26 of 190 | 291 | 131-160 | 82.3% | 34.0% (vs 12) |
| block | candidate | 1780 ± 166 | 18 of 190 | 20 | 12-8 | 83.5% | 33.6% (vs 10) |
| camp | candidate | 1780 ± 166 | 19 of 190 | 20 | 12-8 | 83.5% | 33.6% (vs 10) |
| h100 | candidate | 1702 ± 78 | 48 of 190 | 200 | 97-103 | 79.2% | 27.7% (vs 12) |
| h101 | candidate | 1676 ± 124 | 61 of 190 | 40 | 18-22 | 77.8% | 32.5% (vs 18) |
| h103 | candidate | 1732 ± 99 | 39 of 190 | 76 | 33-43 | 80.9% | 31.1% (vs 12) |
| h104 | candidate | 1744 ± 109 | 35 of 190 | 58 | 28-30 | 81.5% | 32.4% (vs 12) |
| h107 | candidate | 1623 ± 126 | 75 of 190 | 40 | 15-25 | 74.6% | 29.2% (vs 21) |
| h110 | candidate | 1659 ± 125 | 67 of 190 | 40 | 17-23 | 76.8% | 32.2% (vs 20) |
| h111 | candidate | 1744 ± 109 | 36 of 190 | 58 | 28-30 | 81.5% | 32.4% (vs 12) |
| h112 | candidate | 1744 ± 109 | 37 of 190 | 58 | 28-30 | 81.5% | 32.4% (vs 12) |
| h113 | candidate | 1659 ± 125 | 68 of 190 | 40 | 17-23 | 76.8% | 32.2% (vs 20) |
| h114 | candidate | 1641 ± 125 | 71 of 190 | 40 | 16-24 | 75.7% | 30.2% (vs 20) |
| h115 | candidate | 1729 ± 124 | 40 of 190 | 40 | 21-19 | 80.7% | 30.7% (vs 12) |
| h116 | candidate | 1641 ± 125 | 72 of 190 | 40 | 16-24 | 75.7% | 30.2% (vs 20) |
| h118 | candidate | 1711 ± 123 | 47 of 190 | 40 | 20-20 | 79.8% | 28.8% (vs 12) |
| h11c | candidate | 1551 ± 183 | 97 of 190 | 25 | 15-10 | 70.1% | 26.3% (vs 26) |
| h121 | candidate | 1692 ± 109 | 55 of 190 | 58 | 24-34 | 78.7% | 33.4% (vs 17) |
| h123 | candidate | 1679 ± 110 | 60 of 190 | 58 | 23-35 | 77.9% | 32.8% (vs 18) |
| h124 | candidate | 1676 ± 124 | 62 of 190 | 40 | 18-22 | 77.8% | 32.5% (vs 18) |
| h125 | candidate | 1676 ± 124 | 63 of 190 | 40 | 18-22 | 77.8% | 32.5% (vs 18) |
| h126 | candidate | 1749 ± 96 | 32 of 190 | 98 | 49-49 | 81.8% | 33.0% (vs 12) |
| h127 | candidate | 1738 ± 96 | 38 of 190 | 98 | 47-51 | 81.3% | 31.8% (vs 12) |
| h128 | candidate | 1812 ± 115 | 11 of 190 | 54 | 23-31 | 85.0% | 30.9% (vs 7) |
| h129 | candidate | 1543 ± 135 | 98 of 190 | 40 | 11-29 | 69.6% | 25.5% (vs 26) |
| h130 | candidate | 1756 ± 109 | 27 of 190 | 58 | 29-29 | 82.2% | 33.9% (vs 12) |
| h131 | candidate | 1729 ± 124 | 41 of 190 | 40 | 21-19 | 80.7% | 30.7% (vs 12) |
| h132 | candidate | 1764 ± 125 | 24 of 190 | 40 | 23-17 | 82.6% | 33.3% (vs 11) |
| h133 | candidate | 1746 ± 124 | 33 of 190 | 40 | 22-18 | 81.7% | 32.7% (vs 12) |
| h134 | candidate | 1604 ± 128 | 84 of 190 | 40 | 14-26 | 73.4% | 29.1% (vs 23) |
| h135 | candidate | 1718 ± 109 | 44 of 190 | 58 | 26-32 | 80.2% | 29.5% (vs 12) |
| h136 | candidate | 1722 ± 100 | 43 of 190 | 76 | 32-44 | 80.4% | 30.0% (vs 12) |
| h137 | candidate | 1676 ± 124 | 64 of 190 | 40 | 18-22 | 77.8% | 32.5% (vs 18) |
| h138 | candidate | 1729 ± 124 | 42 of 190 | 40 | 21-19 | 80.7% | 30.7% (vs 12) |
| h139 | candidate | 1772 ± 99 | 21 of 190 | 76 | 37-39 | 83.0% | 32.7% (vs 10) |
| h140 | candidate | 1769 ± 109 | 23 of 190 | 58 | 30-28 | 82.9% | 33.9% (vs 11) |
| h141 | candidate | 1782 ± 109 | 16 of 190 | 58 | 31-27 | 83.5% | 33.8% (vs 10) |
| h142 | candidate | 1746 ± 124 | 34 of 190 | 40 | 22-18 | 81.7% | 32.7% (vs 12) |
| h143 | candidate | 1781 ± 125 | 17 of 190 | 40 | 24-16 | 83.5% | 33.8% (vs 10) |
| h144 | candidate | 1623 ± 126 | 76 of 190 | 40 | 15-25 | 74.6% | 29.2% (vs 21) |
| h145 | candidate | 1814 ± 118 | 10 of 190 | 58 | 31-27 | 85.1% | 31.1% (vs 7) |
| h146 | candidate | 1776 ± 118 | 20 of 190 | 58 | 28-30 | 83.3% | 33.2% (vs 10) |
| h147 | candidate | 1853 ± 119 | 6 of 190 | 58 | 34-24 | 86.9% | 28.9% (vs 5) |
| h148 | candidate | 1809 ± 141 | 12 of 190 | 40 | 23-17 | 84.9% | 30.5% (vs 7) |
| h149 | candidate | 1756 ± 140 | 28 of 190 | 40 | 20-20 | 82.2% | 33.9% (vs 12) |
| h150 | candidate | 1845 ± 143 | 8 of 190 | 40 | 25-15 | 86.5% | 31.5% (vs 6) |
| h151 | candidate | 1186 ± 1111 | 147 of 190 | 2 | 0-2 | 47.1% | 14.7% (vs 48) |
| h16r | candidate | 1305 ± 155 | 136 of 190 | 40 | 16-24 | 54.4% | 16.2% (vs 40) |
| h18 | candidate | 1283 ± 198 | 138 of 190 | 25 | 6-19 | 53.0% | 15.6% (vs 41) |
| h2 | candidate | 1540 ± 159 | 101 of 190 | 54 | 25-29 | 69.4% | 26.1% (vs 27) |
| h24 | candidate | 1482 ± 157 | 116 of 190 | 40 | 26-14 | 65.7% | 23.8% (vs 31) |
| h24v5 | candidate | 1584 ± 134 | 89 of 190 | 40 | 23-17 | 72.2% | 26.9% (vs 23) |
| h3 | candidate | 1522 ± 221 | 111 of 190 | 19 | 9-10 | 68.2% | 26.0% (vs 29) |
| h31 | candidate | 1464 ± 156 | 122 of 190 | 40 | 25-15 | 64.5% | 24.4% (vs 34) |
| h38 | candidate | 1495 ± 307 | 113 of 190 | 6 | 4-2 | 66.6% | 24.2% (vs 30) |
| h40 | candidate | 1563 ± 292 | 95 of 190 | 8 | 6-2 | 70.9% | 26.7% (vs 25) |
| h41 | candidate | 1445 ± 256 | 124 of 190 | 8 | 3-5 | 63.3% | 23.4% (vs 35) |
| h42 | candidate | 1445 ± 256 | 125 of 190 | 8 | 3-5 | 63.3% | 23.4% (vs 35) |
| h43 | candidate | 1531 ± 249 | 103 of 190 | 8 | 4-4 | 68.9% | 25.2% (vs 27) |
| h44 | candidate | 1716 ± 282 | 45 of 190 | 8 | 6-2 | 80.1% | 29.3% (vs 12) |
| h46 | candidate | 1445 ± 256 | 126 of 190 | 8 | 3-5 | 63.3% | 23.4% (vs 35) |
| h47 | candidate | 1531 ± 249 | 104 of 190 | 8 | 4-4 | 68.9% | 25.2% (vs 27) |
| h48 | candidate | 1531 ± 249 | 105 of 190 | 8 | 4-4 | 68.9% | 25.2% (vs 27) |
| h49 | candidate | 1531 ± 249 | 106 of 190 | 8 | 4-4 | 68.9% | 25.2% (vs 27) |
| h52 | candidate | 1445 ± 256 | 127 of 190 | 8 | 3-5 | 63.3% | 23.4% (vs 35) |
| h53 | candidate | 1618 ± 256 | 79 of 190 | 8 | 5-3 | 74.3% | 29.6% (vs 22) |
| h54 | candidate | 1605 ± 128 | 83 of 190 | 48 | 29-19 | 73.5% | 29.2% (vs 23) |
| h55 | candidate | 1575 ± 126 | 93 of 190 | 56 | 32-24 | 71.6% | 27.9% (vs 25) |
| h58 | candidate | 1487 ± 273 | 115 of 190 | 8 | 3-5 | 66.0% | 24.2% (vs 31) |
| h59 | candidate | 1531 ± 249 | 107 of 190 | 8 | 4-4 | 68.9% | 25.2% (vs 27) |
| h6 | candidate | 1481 ± 121 | 117 of 190 | 158 | 94-64 | 65.7% | 23.7% (vs 31) |
| h60 | candidate | 1531 ± 249 | 108 of 190 | 8 | 4-4 | 68.9% | 25.2% (vs 27) |
| h61 | candidate | 1650 ± 255 | 70 of 190 | 8 | 5-3 | 76.2% | 31.2% (vs 20) |
| h63 | candidate | 1617 ± 132 | 80 of 190 | 40 | 23-17 | 74.2% | 29.5% (vs 22) |
| h64 | candidate | 1599 ± 131 | 85 of 190 | 40 | 22-18 | 73.1% | 28.6% (vs 23) |
| h68 | candidate | 1749 ± 281 | 29 of 190 | 8 | 6-2 | 81.8% | 33.0% (vs 12) |
| h7 | candidate | 1540 ± 1378 | 100 of 190 | 8 | 8-0 | 69.4% | 26.1% (vs 27) |
| h72 | candidate | 1749 ± 281 | 30 of 190 | 8 | 6-2 | 81.8% | 33.0% (vs 12) |
| h76 | candidate | 1693 ± 188 | 54 of 190 | 32 | 18-14 | 78.8% | 33.5% (vs 17) |
| h77 | candidate | 1579 ± 190 | 91 of 190 | 16 | 8-8 | 71.9% | 27.4% (vs 24) |
| h78 | candidate | 1749 ± 281 | 31 of 190 | 8 | 6-2 | 81.8% | 33.0% (vs 12) |
| h82 | candidate | 1655 ± 103 | 69 of 190 | 134 | 70-64 | 76.5% | 31.8% (vs 20) |
| h83 | candidate | 1689 ± 301 | 57 of 190 | 8 | 4-4 | 78.5% | 33.0% (vs 17) |
| h84 | candidate | 1689 ± 301 | 58 of 190 | 8 | 4-4 | 78.5% | 33.0% (vs 17) |
| h88 | candidate | 1620 ± 148 | 78 of 190 | 40 | 18-22 | 74.4% | 29.8% (vs 22) |
| h89 | candidate | 828 ± 1086 | 167 of 190 | 8 | 0-8 | 28.8% | 9.1% (vs 67) |
| h8v5 | candidate | 1636 ± 129 | 73 of 190 | 48 | 31-17 | 75.4% | 29.6% (vs 20) |
| h90 | candidate | 828 ± 1086 | 168 of 190 | 8 | 0-8 | 28.8% | 9.1% (vs 67) |
| h91 | candidate | 1610 ± 198 | 81 of 190 | 16 | 7-9 | 73.8% | 28.8% (vs 22) |
| h96 | candidate | 1692 ± 109 | 56 of 190 | 58 | 24-34 | 78.7% | 33.4% (vs 17) |
| rush | sparring | 1283 ± 198 | 139 of 190 | 25 | 6-19 | 53.0% | 15.6% (vs 41) |
| rush4 | sparring | 1594 ± 138 | 86 of 190 | 50 | 30-20 | 72.8% | 28.0% (vs 23) |
| turtle | candidate | 1472 ± 197 | 119 of 190 | 20 | 4-16 | 65.1% | 23.6% (vs 32) |

Sources (`tools/progress/games.py`):

- local: 3205 games from 121 batch files (skipped: 258 cut before a verdict, 23 init failure, 98 load (robot init failures), 150 malformed)
- replica: 2257 games (11 archive games skipped, 245 matches from archives, 497 matches from scores), fetched 2026-10-24T16:38:05+00:00

![ratings](elo.png)

![accepted builds](progress.png)

No projection of the field score over time (2023's field-score charts) yet: it needs accepted builds spread over several days and a field larger than a handful of bots.

All players. Our record = the incumbent's (v8) win rate and W-L against the bot, else the latest accepted build that met it.

| rank | player | kind | rating | ± 95% | games | W-L | our record |
|---|---|---|---|---|---|---|---|
| 1 | mvpatel2000.Battlecode2019 | field | 2231 | 279 | 24 | 22-2 | 0% (v7 0-3) |
| 2 | m-schier.battlecode-2019-wololo | field | 2148 | 132 | 117 | 107-10 | 0% (v7 0-3) |
| 3 | uvafan.bc2019 | field | 1968 | 98 | 117 | 96-21 | 0% (v7 0-3) |
| 4 | rafekruse.Battlecode-2019-bc19 | field | 1941 | 226 | 27 | 23-4 | 0% (v8 0-3) |
| 5 | VoidMercy.battlecode-2019~e7dc06 | field | 1871 | 238 | 24 | 21-3 |  |
| 6 | **cand:h147** | candidate | 1853 | 119 | 58 | 34-24 |  |
| 7 | yujinwunz.battlecode_2019 | field | 1852 | 261 | 30 | 26-4 |  |
| 8 | **cand:h150** | candidate | 1845 | 143 | 40 | 25-15 |  |
| 9 | IanCoolidge0.battlecode20~69ce88 | field | 1825 | 88 | 123 | 81-42 | 67% (v7 4-2) |
| 10 | **cand:h145** | candidate | 1814 | 118 | 58 | 31-27 |  |
| 11 | **cand:h128** | candidate | 1812 | 115 | 54 | 23-31 |  |
| 12 | **cand:h148** | candidate | 1809 | 141 | 40 | 23-17 |  |
| 13 | StoneT2000.BC19-bot1v43 | field | 1801 | 84 | 135 | 88-47 | 33% (v7 2-4) |
| 14 | moreda-a.BC2019-a31 | field | 1795 | 215 | 27 | 18-9 |  |
| 15 | j-mao.battlecode-2019 | field | 1785 | 171 | 27 | 18-9 | 100% (v8 3-0) |
| 16 | **cand:h141** | candidate | 1782 | 109 | 58 | 31-27 |  |
| 17 | **cand:h143** | candidate | 1781 | 125 | 40 | 24-16 |  |
| 18 | **cand:block** | candidate | 1780 | 166 | 20 | 12-8 |  |
| 19 | **cand:camp** | candidate | 1780 | 166 | 20 | 12-8 |  |
| 20 | **cand:h146** | candidate | 1776 | 118 | 58 | 28-30 |  |
| 21 | **cand:h139** | candidate | 1772 | 99 | 76 | 37-39 |  |
| 22 | StoneT2000.BC19-botfinalsafe | field | 1770 | 81 | 141 | 90-51 | 67% (v7 2-1) |
| 23 | **cand:h140** | candidate | 1769 | 109 | 58 | 30-28 |  |
| 24 | **cand:h132** | candidate | 1764 | 125 | 40 | 23-17 |  |
| 25 | awesomelemonade.Battlecode2019 | field | 1760 | 86 | 117 | 69-48 | 67% (v7 2-1) |
| 26 | **us:v8** | accepted | 1757 | 91 | 291 | 131-160 |  |
| 27 | **cand:h130** | candidate | 1756 | 109 | 58 | 29-29 |  |
| 28 | **cand:h149** | candidate | 1756 | 140 | 40 | 20-20 |  |
| 29 | **cand:h68** | candidate | 1749 | 281 | 8 | 6-2 |  |
| 30 | **cand:h72** | candidate | 1749 | 281 | 8 | 6-2 |  |
| 31 | **cand:h78** | candidate | 1749 | 281 | 8 | 6-2 |  |
| 32 | **cand:h126** | candidate | 1749 | 96 | 98 | 49-49 |  |
| 33 | **cand:h133** | candidate | 1746 | 124 | 40 | 22-18 |  |
| 34 | **cand:h142** | candidate | 1746 | 124 | 40 | 22-18 |  |
| 35 | **cand:h104** | candidate | 1744 | 109 | 58 | 28-30 |  |
| 36 | **cand:h111** | candidate | 1744 | 109 | 58 | 28-30 |  |
| 37 | **cand:h112** | candidate | 1744 | 109 | 58 | 28-30 |  |
| 38 | **cand:h127** | candidate | 1738 | 96 | 98 | 47-51 |  |
| 39 | **cand:h103** | candidate | 1732 | 99 | 76 | 33-43 |  |
| 40 | **cand:h115** | candidate | 1729 | 124 | 40 | 21-19 |  |
| 41 | **cand:h131** | candidate | 1729 | 124 | 40 | 21-19 |  |
| 42 | **cand:h138** | candidate | 1729 | 124 | 40 | 21-19 |  |
| 43 | **cand:h136** | candidate | 1722 | 100 | 76 | 32-44 |  |
| 44 | **cand:h135** | candidate | 1718 | 109 | 58 | 26-32 |  |
| 45 | **cand:h44** | candidate | 1716 | 282 | 8 | 6-2 |  |
| 46 | **us:v7** | accepted | 1712 | 62 | 1804 | 927-877 |  |
| 47 | **cand:h118** | candidate | 1711 | 123 | 40 | 20-20 |  |
| 48 | **cand:h100** | candidate | 1702 | 78 | 200 | 97-103 |  |
| 49 | arya-k.bc19 | field | 1701 | 221 | 27 | 20-7 | 100% (v8 3-0) |
| 50 | IvanGeffner.BC19-bot6b | field | 1699 | 405 | 9 | 7-2 |  |
| 51 | bqi343.cp-notebook | field | 1697 | 224 | 24 | 16-8 |  |
| 52 | virenvshah.Battlecode2019 | field | 1695 | 218 | 24 | 19-5 |  |
| 53 | vineetparikh.BigRedBattle~fe3459 | field | 1694 | 206 | 27 | 19-8 |  |
| 54 | **cand:h76** | candidate | 1693 | 188 | 32 | 18-14 |  |
| 55 | **cand:h121** | candidate | 1692 | 109 | 58 | 24-34 |  |
| 56 | **cand:h96** | candidate | 1692 | 109 | 58 | 24-34 |  |
| 57 | **cand:h83** | candidate | 1689 | 301 | 8 | 4-4 |  |
| 58 | **cand:h84** | candidate | 1689 | 301 | 8 | 4-4 |  |
| 59 | rafekruse.Battlecode-2019~2680d4 | field | 1689 | 212 | 24 | 19-5 |  |
| 60 | **cand:h123** | candidate | 1679 | 110 | 58 | 23-35 |  |
| 61 | **cand:h101** | candidate | 1676 | 124 | 40 | 18-22 |  |
| 62 | **cand:h124** | candidate | 1676 | 124 | 40 | 18-22 |  |
| 63 | **cand:h125** | candidate | 1676 | 124 | 40 | 18-22 |  |
| 64 | **cand:h137** | candidate | 1676 | 124 | 40 | 18-22 |  |
| 65 | ldcWV.Battlecode-2019 | field | 1676 | 198 | 27 | 18-9 |  |
| 66 | IanCoolidge0.battlecode20~f649f3 | field | 1668 | 157 | 45 | 33-12 | 67% (v3 2-1) |
| 67 | **cand:h110** | candidate | 1659 | 125 | 40 | 17-23 |  |
| 68 | **cand:h113** | candidate | 1659 | 125 | 40 | 17-23 |  |
| 69 | **cand:h82** | candidate | 1655 | 103 | 134 | 70-64 |  |
| 70 | **cand:h61** | candidate | 1650 | 255 | 8 | 5-3 |  |
| 71 | **cand:h114** | candidate | 1641 | 125 | 40 | 16-24 |  |
| 72 | **cand:h116** | candidate | 1641 | 125 | 40 | 16-24 |  |
| 73 | **cand:h8v5** | candidate | 1636 | 129 | 48 | 31-17 |  |
| 74 | howard36.Battlecode2019-eco6 | field | 1627 | 208 | 24 | 15-9 |  |
| 75 | **cand:h107** | candidate | 1623 | 126 | 40 | 15-25 |  |
| 76 | **cand:h144** | candidate | 1623 | 126 | 40 | 15-25 |  |
| 77 | cemondr.BC19pdxgroup4 | field | 1621 | 209 | 24 | 15-9 |  |
| 78 | **cand:h88** | candidate | 1620 | 148 | 40 | 18-22 |  |
| 79 | **cand:h53** | candidate | 1618 | 256 | 8 | 5-3 |  |
| 80 | **cand:h63** | candidate | 1617 | 132 | 40 | 23-17 |  |
| 81 | **cand:h91** | candidate | 1610 | 198 | 16 | 7-9 |  |
| 82 | UpperArlingtonHighSchool.~682aa9 | field | 1605 | 217 | 30 | 17-13 |  |
| 83 | **cand:h54** | candidate | 1605 | 128 | 48 | 29-19 |  |
| 84 | **cand:h134** | candidate | 1604 | 128 | 40 | 14-26 |  |
| 85 | **cand:h64** | candidate | 1599 | 131 | 40 | 22-18 |  |
| 86 | **spar:rush4** | sparring | 1594 | 138 | 50 | 30-20 |  |
| 87 | **us:v3** | accepted | 1590 | 111 | 191 | 140-51 |  |
| 88 | **us:v0** | accepted | 1584 | 232 | 38 | 33-5 |  |
| 89 | **cand:h24v5** | candidate | 1584 | 134 | 40 | 23-17 |  |
| 90 | Nischay-Pro.BattleCode2019 | field | 1582 | 224 | 21 | 17-4 |  |
| 91 | **cand:h77** | candidate | 1579 | 190 | 16 | 8-8 |  |
| 92 | NielsKornerup.Battlecode-2019 | field | 1578 | 149 | 51 | 30-21 |  |
| 93 | **cand:h55** | candidate | 1575 | 126 | 56 | 32-24 |  |
| 94 | **us:v6** | accepted | 1565 | 76 | 322 | 130-192 |  |
| 95 | **cand:h40** | candidate | 1563 | 292 | 8 | 6-2 |  |
| 96 | unrevre.battlecode | field | 1560 | 207 | 24 | 13-11 |  |
| 97 | **cand:h11c** | candidate | 1551 | 183 | 25 | 15-10 |  |
| 98 | **cand:h129** | candidate | 1543 | 135 | 40 | 11-29 |  |
| 99 | abcdefguan.battlecode2019 | field | 1543 | 223 | 30 | 22-8 |  |
| 100 | **cand:h7** | candidate | 1540 | 1378 | 8 | 8-0 |  |
| 101 | **cand:h2** | candidate | 1540 | 159 | 54 | 25-29 |  |
| 102 | **us:v5** | accepted | 1532 | 80 | 439 | 202-237 |  |
| 103 | **cand:h43** | candidate | 1531 | 249 | 8 | 4-4 |  |
| 104 | **cand:h47** | candidate | 1531 | 249 | 8 | 4-4 |  |
| 105 | **cand:h48** | candidate | 1531 | 249 | 8 | 4-4 |  |
| 106 | **cand:h49** | candidate | 1531 | 249 | 8 | 4-4 |  |
| 107 | **cand:h59** | candidate | 1531 | 249 | 8 | 4-4 |  |
| 108 | **cand:h60** | candidate | 1531 | 249 | 8 | 4-4 |  |
| 109 | lschaberg.bc19 | field | 1529 | 188 | 33 | 19-14 |  |
| 110 | ovkulkarni.battlecode2019~0aa607 | field | 1527 | 202 | 24 | 18-6 |  |
| 111 | **cand:h3** | candidate | 1522 | 221 | 19 | 9-10 |  |
| 112 | IvanGeffner.BC19-eigthbot | field | 1521 | 316 | 9 | 6-3 |  |
| 113 | **cand:h38** | candidate | 1495 | 307 | 6 | 4-2 |  |
| 114 | m4reko.bc2019-tmores-angels | field | 1494 | 203 | 27 | 17-10 |  |
| 115 | **cand:h58** | candidate | 1487 | 273 | 8 | 3-5 |  |
| 116 | **cand:h24** | candidate | 1482 | 157 | 40 | 26-14 |  |
| 117 | **cand:h6** | candidate | 1481 | 121 | 158 | 94-64 |  |
| 118 | dmunozc.bc19-g8-davjasdiv | field | 1479 | 188 | 33 | 22-11 |  |
| 119 | **cand:turtle** | candidate | 1472 | 197 | 20 | 4-16 |  |
| 120 | programjames.BC19Bot-seeding | field | 1470 | 188 | 24 | 11-13 |  |
| 121 | Tom-CCS.BC19 | field | 1465 | 192 | 33 | 17-16 |  |
| 122 | **cand:h31** | candidate | 1464 | 156 | 40 | 25-15 |  |
| 123 | sunanth123.battlecode19-mainbot | field | 1456 | 249 | 21 | 13-8 |  |
| 124 | **cand:h41** | candidate | 1445 | 256 | 8 | 3-5 |  |
| 125 | **cand:h42** | candidate | 1445 | 256 | 8 | 3-5 |  |
| 126 | **cand:h46** | candidate | 1445 | 256 | 8 | 3-5 |  |
| 127 | **cand:h52** | candidate | 1445 | 256 | 8 | 3-5 |  |
| 128 | dmunozc.bc19-g8-bots | field | 1433 | 210 | 24 | 12-12 |  |
| 129 | **us:v1** | accepted | 1432 | 151 | 154 | 128-26 |  |
| 130 | **us:v2** | accepted | 1421 | 150 | 62 | 30-32 |  |
| 131 | **us:v4** | accepted | 1375 | 111 | 220 | 83-137 |  |
| 132 | programjames.BC19Bot-root | field | 1371 | 218 | 24 | 15-9 |  |
| 133 | 18dcb01.Battlecode19-prea~fb5c48 | field | 1363 | 150 | 48 | 25-23 |  |
| 134 | ovkulkarni.battlecode2019~06c610 | field | 1361 | 225 | 24 | 15-9 |  |
| 135 | nthistle.battlecode-2019 | field | 1345 | 175 | 36 | 19-17 | 100% (v5 3-0) |
| 136 | **cand:h16r** | candidate | 1305 | 155 | 40 | 16-24 |  |
| 137 | cvxluo.battlecode19 | field | 1284 | 202 | 30 | 19-11 |  |
| 138 | **cand:h18** | candidate | 1283 | 198 | 25 | 6-19 |  |
| 139 | **spar:rush** | sparring | 1283 | 198 | 25 | 6-19 |  |
| 140 | ipercyNC.group6-battlecode | field | 1278 | 199 | 24 | 11-13 |  |
| 141 | CS554-software-engineerin~a575dc | field | 1275 | 105 | 248 | 147-101 | 100% (v7 3-0) |
| 142 | sunanth123.battlecode19-prorush | field | 1274 | 197 | 24 | 14-10 |  |
| 143 | CometsTech.battlecode2019 | field | 1236 | 111 | 198 | 92-106 | 100% (v7 3-0) |
| 144 | UpperArlingtonHighSchool.~5e7875 | field | 1225 | 272 | 24 | 15-9 |  |
| 145 | Nydroam.BatteredCod | field | 1206 | 453 | 6 | 3-3 |  |
| 146 | jamesrayman.HCN-bot | field | 1193 | 204 | 33 | 13-20 | 100% (v5 3-0) |
| 147 | **cand:h151** | candidate | 1186 | 1111 | 2 | 0-2 |  |
| 148 | evanyeyeye.battlecode2019~af562c | field | 1173 | 200 | 24 | 12-12 |  |
| 149 | moreda-a.BC2019-t15 | field | 1162 | 236 | 27 | 12-15 |  |
| 150 | JasonLarson44.2019-Battle~1c7639 | field | 1145 | 201 | 36 | 14-22 | 100% (v3 3-0) |
| 151 | bayoumi17m.BattleCode-2019 | field | 1129 | 211 | 24 | 11-13 |  |
| 152 | vicennial.BattleCode19 | field | 1124 | 247 | 27 | 13-14 |  |
| 153 | twitu.bc19-tsp | field | 1094 | 240 | 30 | 17-13 |  |
| 154 | TestSubjector.BattleCode2~fb22c7 | field | 1092 | 265 | 36 | 18-18 |  |
| 155 | haydenshively.Battle-Code~e1c2fb | field | 1086 | 220 | 24 | 10-14 |  |
| 156 | 18dcb01.Battlecode19-robot2 | field | 1074 | 222 | 39 | 19-20 |  |
| 157 | haydenshively.Battle-Code~e37b3e | field | 1054 | 217 | 24 | 8-16 |  |
| 158 | TestSubjector.BattleCode2~e6de74 | field | 1038 | 222 | 39 | 17-22 |  |
| 159 | jackliu612.Battlecode19 | field | 1017 | 323 | 24 | 10-14 |  |
| 160 | dgh2.bc19-t1 | field | 986 | 275 | 24 | 9-15 |  |
| 161 | spachava753.bc19 | field | 953 | 228 | 24 | 9-15 |  |
| 162 | liwanlin41.examplefuncsplayer | field | 916 | 282 | 27 | 7-20 |  |
| 163 | dndoja.battlecode19 | field | 913 | 236 | 27 | 11-16 |  |
| 164 | asunathanr.asu_bc | field | 876 | 280 | 24 | 8-16 |  |
| 165 | CometsTech.battlecode2019~187e8c | field | 854 | 239 | 36 | 14-22 |  |
| 166 | rooneyshuman.Battlecode | field | 853 | 246 | 33 | 19-14 |  |
| 167 | **cand:h89** | candidate | 828 | 1086 | 8 | 0-8 |  |
| 168 | **cand:h90** | candidate | 828 | 1086 | 8 | 0-8 |  |
| 169 | SethKitchen.examplefuncsplayer | field | 720 | 340 | 36 | 8-28 |  |
| 170 | roy-love.onshoreBattleCode2019 | field | 664 | 253 | 24 | 7-17 |  |
| 171 | bovard.battlecode-2019-un~8822c3 | field | 662 | 387 | 24 | 9-15 |  |
| 172 | VictorButoi.BattleCode201~c4576b | field | 650 | 263 | 27 | 9-18 |  |
| 173 | OmarTahoun.battle-code | field | 649 | 265 | 33 | 10-23 |  |
| 174 | jyurkanin.corn_bc19 | field | 632 | 336 | 33 | 7-26 |  |
| 175 | DivyanshuSaxena.Battlecode | field | 519 | 256 | 39 | 18-21 |  |
| 176 | howard36.Battlecode2019-sprint | field | 496 | 429 | 24 | 6-18 |  |
| 177 | waylon531.scala_starter | field | 478 | 367 | 30 | 4-26 |  |
| 178 | vishwasns99.BC_2019 | field | 451 | 384 | 30 | 3-27 |  |
| 179 | bc19-starter | field | 404 | 228 | 334 | 57-277 | 100% (v3 12-0) |
| 180 | VoidMercy.battlecode-2019-bot | field | 360 | 336 | 24 | 8-16 |  |
| 181 | nhard.examplefuncsplayer | field | 327 | 350 | 24 | 9-15 |  |
| 182 | ryanhzhao.Battlecode-2019 | field | 234 | 445 | 24 | 3-21 |  |
| 183 | RyanSharafuddin.Battlecode_2019 | field | 162 | 268 | 54 | 5-49 |  |
| 184 | jbiewend.Battlecode2019 | field | 92 | 462 | 24 | 3-21 |  |
| 185 | djkeyes.bc19 | field | -21 | 419 | 24 | 3-21 |  |
| 186 | TheRobotCarlson.battlehac~323871 | field | -60 | 322 | 36 | 3-33 |  |
| 187 | jamesrayman.HCN-basic-bot | field | -117 | 351 | 24 | 3-21 |  |
| 188 | yunaganyh.bc19 | field | -124 | 352 | 24 | 4-20 |  |
| 189 | jshin313.battlecodebot | field | -252 | 386 | 24 | 2-22 |  |
| 190 | ArtemUstilov.bc19_CrazyTapok | field | -646 | 1096 | 81 | 0-81 |  |

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
| m-schier.battlecode-2019-wololo | cand:h147 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h145 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h128 | 9 | 6-3 | 67% | replica |
| m-schier.battlecode-2019-wololo | moreda-a.BC2019-a31 | 3 | 1-2 | 33% | replica |
| m-schier.battlecode-2019-wololo | cand:h141 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h146 | 3 | 3-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h139 | 6 | 6-0 | 100% | replica |
| m-schier.battlecode-2019-wololo | cand:h140 | 3 | 3-0 | 100% | replica |
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
| uvafan.bc2019 | cand:h147 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h145 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h128 | 9 | 7-2 | 78% | replica |
| uvafan.bc2019 | cand:h141 | 3 | 2-1 | 67% | replica |
| uvafan.bc2019 | cand:h146 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h139 | 6 | 3-3 | 50% | replica |
| uvafan.bc2019 | cand:h140 | 3 | 3-0 | 100% | replica |
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
| uvafan.bc2019 | cand:h121 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h96 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | cand:h123 | 3 | 3-0 | 100% | replica |
| uvafan.bc2019 | ldcWV.Battlecode-2019 | 3 | 2-1 | 67% | replica |
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
| rafekruse.Battlecode-2019-bc19 | yujinwunz.battlecode_2019 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | us:v8 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | arya-k.bc19 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019-bc19 | bqi343.cp-notebook | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019-bc19 | programjames.BC19Bot-root | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019-bc19 | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| VoidMercy.battlecode-2019~e7dc06 | ldcWV.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | cemondr.BC19pdxgroup4 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | abcdefguan.battlecode2019 | 3 | 2-1 | 67% | replica |
| VoidMercy.battlecode-2019~e7dc06 | Tom-CCS.BC19 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| VoidMercy.battlecode-2019~e7dc06 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h147 | IanCoolidge0.battlecode20~69ce88 | 3 | 1-2 | 33% | replica |
| cand:h147 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| cand:h147 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h147 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h147 | us:v8 | 40 | 26-14 | 65% | local |
| yujinwunz.battlecode_2019 | bqi343.cp-notebook | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~682aa9 | 6 | 5-1 | 83% | replica |
| yujinwunz.battlecode_2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | UpperArlingtonHighSchool.~5e7875 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| yujinwunz.battlecode_2019 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
| cand:h150 | us:v8 | 40 | 25-15 | 62% | local |
| IanCoolidge0.battlecode20~69ce88 | cand:h145 | 3 | 0-3 | 0% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h128 | 9 | 2-7 | 22% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-bot1v43 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | j-mao.battlecode-2019 | 3 | 0-3 | 0% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h141 | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h146 | 3 | 1-2 | 33% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h139 | 6 | 4-2 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| IanCoolidge0.battlecode20~69ce88 | cand:h140 | 3 | 3-0 | 100% | replica |
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
| cand:h145 | StoneT2000.BC19-bot1v43 | 3 | 1-2 | 33% | replica |
| cand:h145 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
| cand:h145 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h145 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h128 | StoneT2000.BC19-bot1v43 | 9 | 3-6 | 33% | replica |
| cand:h128 | StoneT2000.BC19-botfinalsafe | 9 | 3-6 | 33% | replica |
| cand:h128 | awesomelemonade.Battlecode2019 | 9 | 5-4 | 56% | replica |
| cand:h148 | us:v8 | 40 | 23-17 | 57% | local |
| StoneT2000.BC19-bot1v43 | j-mao.battlecode-2019 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h141 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h146 | 3 | 2-1 | 67% | replica |
| StoneT2000.BC19-bot1v43 | cand:h139 | 6 | 4-2 | 67% | replica |
| StoneT2000.BC19-bot1v43 | StoneT2000.BC19-botfinalsafe | 6 | 1-5 | 17% | replica |
| StoneT2000.BC19-bot1v43 | cand:h140 | 3 | 1-2 | 33% | replica |
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
| moreda-a.BC2019-a31 | vineetparikh.BigRedBattle~fe3459 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| moreda-a.BC2019-a31 | lschaberg.bc19 | 6 | 5-1 | 83% | replica |
| moreda-a.BC2019-a31 | m4reko.bc2019-tmores-angels | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| moreda-a.BC2019-a31 | SethKitchen.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | us:v8 | 3 | 0-3 | 0% | replica |
| j-mao.battlecode-2019 | us:v7 | 3 | 1-2 | 33% | replica |
| j-mao.battlecode-2019 | howard36.Battlecode2019-eco6 | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | ipercyNC.group6-battlecode | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| j-mao.battlecode-2019 | jamesrayman.HCN-basic-bot | 3 | 3-0 | 100% | replica |
| cand:h141 | StoneT2000.BC19-botfinalsafe | 3 | 2-1 | 67% | replica |
| cand:h141 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h141 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h143 | us:v7 | 40 | 24-16 | 60% | local |
| cand:block | us:v7 | 20 | 12-8 | 60% | local |
| cand:camp | us:v7 | 20 | 12-8 | 60% | local |
| cand:h146 | StoneT2000.BC19-botfinalsafe | 3 | 1-2 | 33% | replica |
| cand:h146 | awesomelemonade.Battlecode2019 | 3 | 1-2 | 33% | replica |
| cand:h146 | us:v8 | 40 | 23-17 | 57% | local |
| cand:h139 | StoneT2000.BC19-botfinalsafe | 6 | 4-2 | 67% | replica |
| cand:h139 | awesomelemonade.Battlecode2019 | 6 | 4-2 | 67% | replica |
| cand:h139 | us:v7 | 40 | 22-18 | 55% | local |
| StoneT2000.BC19-botfinalsafe | cand:h140 | 3 | 2-1 | 67% | replica |
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
| StoneT2000.BC19-botfinalsafe | cand:h123 | 3 | 1-2 | 33% | replica |
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
| cand:h140 | awesomelemonade.Battlecode2019 | 3 | 2-1 | 67% | replica |
| cand:h140 | us:v7 | 40 | 25-15 | 62% | local |
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
| us:v8 | cand:h149 | 40 | 20-20 | 50% | local |
| us:v8 | us:v7 | 40 | 23-17 | 57% | local |
| us:v8 | arya-k.bc19 | 3 | 3-0 | 100% | replica |
| us:v8 | cand:h151 | 2 | 2-0 | 100% | local |
| cand:h130 | us:v7 | 40 | 25-15 | 62% | local |
| cand:h68 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h72 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h78 | us:v6 | 8 | 6-2 | 75% | local |
| cand:h126 | cand:h127 | 40 | 20-20 | 50% | local |
| cand:h126 | us:v7 | 40 | 23-17 | 57% | local |
| cand:h133 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h142 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h104 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h111 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h112 | us:v7 | 40 | 22-18 | 55% | local |
| cand:h127 | us:v7 | 40 | 24-16 | 60% | local |
| cand:h103 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h115 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h131 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h138 | us:v7 | 40 | 21-19 | 52% | local |
| cand:h136 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h135 | us:v7 | 40 | 20-20 | 50% | local |
| cand:h44 | us:v5 | 8 | 6-2 | 75% | local |
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
| arya-k.bc19 | bqi343.cp-notebook | 3 | 1-2 | 33% | replica |
| arya-k.bc19 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
| arya-k.bc19 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| arya-k.bc19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-bot6b | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | IanCoolidge0.battlecode20~f649f3 | 3 | 1-2 | 33% | replica |
| bqi343.cp-notebook | dmunozc.bc19-g8-bots | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | asunathanr.asu_bc | 3 | 3-0 | 100% | replica |
| bqi343.cp-notebook | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
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
| cand:h76 | cand:h83 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h84 | 8 | 4-4 | 50% | local |
| cand:h76 | cand:h82 | 8 | 4-4 | 50% | local |
| cand:h76 | us:v6 | 8 | 6-2 | 75% | local |
| rafekruse.Battlecode-2019~2680d4 | howard36.Battlecode2019-eco6 | 3 | 1-2 | 33% | replica |
| rafekruse.Battlecode-2019~2680d4 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~0aa607 | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| rafekruse.Battlecode-2019~2680d4 | sunanth123.battlecode19-mainbot | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | ovkulkarni.battlecode2019~06c610 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| rafekruse.Battlecode-2019~2680d4 | roy-love.onshoreBattleCode2019 | 3 | 3-0 | 100% | replica |
| ldcWV.Battlecode-2019 | cemondr.BC19pdxgroup4 | 3 | 2-1 | 67% | replica |
| ldcWV.Battlecode-2019 | UpperArlingtonHighSchool.~682aa9 | 3 | 2-1 | 67% | replica |
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
| cand:h8v5 | us:v5 | 48 | 31-17 | 65% | local |
| howard36.Battlecode2019-eco6 | sunanth123.battlecode19-mainbot | 3 | 2-1 | 67% | replica |
| howard36.Battlecode2019-eco6 | evanyeyeye.battlecode2019~af562c | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | haydenshively.Battle-Code~e37b3e | 3 | 3-0 | 100% | replica |
| howard36.Battlecode2019-eco6 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | dmunozc.bc19-g8-davjasdiv | 3 | 2-1 | 67% | replica |
| cemondr.BC19pdxgroup4 | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | bovard.battlecode-2019-un~8822c3 | 3 | 3-0 | 100% | replica |
| cemondr.BC19pdxgroup4 | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| cand:h53 | us:v5 | 8 | 5-3 | 62% | local |
| cand:h63 | us:v6 | 40 | 23-17 | 57% | local |
| UpperArlingtonHighSchool.~682aa9 | abcdefguan.battlecode2019 | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | CometsTech.battlecode2019 | 3 | 2-1 | 67% | replica |
| UpperArlingtonHighSchool.~682aa9 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| UpperArlingtonHighSchool.~682aa9 | yunaganyh.bc19 | 3 | 3-0 | 100% | replica |
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
| Nischay-Pro.BattleCode2019 | dmunozc.bc19-g8-davjasdiv | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | programjames.BC19Bot-seeding | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | Tom-CCS.BC19 | 3 | 1-2 | 33% | replica |
| Nischay-Pro.BattleCode2019 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Nischay-Pro.BattleCode2019 | twitu.bc19-tsp | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | haydenshively.Battle-Code~e1c2fb | 3 | 3-0 | 100% | replica |
| Nischay-Pro.BattleCode2019 | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| cand:h77 | us:v6 | 8 | 8-0 | 100% | local |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-prea~fb5c48 | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CS554-software-engineerin~a575dc | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | sunanth123.battlecode19-prorush | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | jamesrayman.HCN-bot | 3 | 2-1 | 67% | replica |
| NielsKornerup.Battlecode-2019 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | 18dcb01.Battlecode19-robot2 | 6 | 6-0 | 100% | replica |
| NielsKornerup.Battlecode-2019 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cand:h55 | us:v5 | 48 | 27-21 | 56% | local |
| cand:h55 | cand:h58 | 8 | 5-3 | 62% | local |
| us:v6 | us:v5 | 80 | 53-27 | 66% | local |
| cand:h40 | us:v4 | 8 | 6-2 | 75% | local |
| unrevre.battlecode | programjames.BC19Bot-seeding | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | dmunozc.bc19-g8-bots | 3 | 1-2 | 33% | replica |
| unrevre.battlecode | cvxluo.battlecode19 | 3 | 3-0 | 100% | replica |
| unrevre.battlecode | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| unrevre.battlecode | vicennial.BattleCode19 | 3 | 2-1 | 67% | replica |
| cand:h11c | cand:h6 | 25 | 15-10 | 60% | local |
| abcdefguan.battlecode2019 | nthistle.battlecode-2019 | 3 | 2-1 | 67% | replica |
| abcdefguan.battlecode2019 | jamesrayman.HCN-bot | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | dndoja.battlecode19 | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | rooneyshuman.Battlecode | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | waylon531.scala_starter | 3 | 3-0 | 100% | replica |
| abcdefguan.battlecode2019 | VoidMercy.battlecode-2019-bot | 3 | 3-0 | 100% | replica |
| cand:h7 | bc19-starter | 8 | 8-0 | 100% | local |
| cand:h2 | cand:h3 | 19 | 10-9 | 53% | local |
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
| IvanGeffner.BC19-eigthbot | CometsTech.battlecode2019 | 3 | 3-0 | 100% | replica |
| IvanGeffner.BC19-eigthbot | Nydroam.BatteredCod | 3 | 2-1 | 67% | replica |
| cand:h38 | us:v4 | 6 | 4-2 | 67% | local |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-davjasdiv | 3 | 0-3 | 0% | replica |
| m4reko.bc2019-tmores-angels | dmunozc.bc19-g8-bots | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | moreda-a.BC2019-t15 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | haydenshively.Battle-Code~e1c2fb | 3 | 2-1 | 67% | replica |
| m4reko.bc2019-tmores-angels | TestSubjector.BattleCode2~e6de74 | 3 | 3-0 | 100% | replica |
| m4reko.bc2019-tmores-angels | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
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
| programjames.BC19Bot-seeding | programjames.BC19Bot-root | 3 | 2-1 | 67% | replica |
| programjames.BC19Bot-seeding | ovkulkarni.battlecode2019~06c610 | 3 | 1-2 | 33% | replica |
| programjames.BC19Bot-seeding | nthistle.battlecode-2019 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-seeding | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | cvxluo.battlecode19 | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | twitu.bc19-tsp | 3 | 2-1 | 67% | replica |
| Tom-CCS.BC19 | TestSubjector.BattleCode2~fb22c7 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | RyanSharafuddin.Battlecode_2019 | 3 | 3-0 | 100% | replica |
| Tom-CCS.BC19 | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| cand:h31 | us:v4 | 40 | 25-15 | 62% | local |
| sunanth123.battlecode19-mainbot | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
| sunanth123.battlecode19-mainbot | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-mainbot | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | ipercyNC.group6-battlecode | 3 | 2-1 | 67% | replica |
| dmunozc.bc19-g8-bots | dgh2.bc19-t1 | 3 | 3-0 | 100% | replica |
| dmunozc.bc19-g8-bots | djkeyes.bc19 | 3 | 3-0 | 100% | replica |
| us:v1 | us:v2 | 14 | 7-7 | 50% | local |
| us:v1 | CS554-software-engineerin~a575dc | 14 | 7-7 | 50% | replica |
| us:v1 | CometsTech.battlecode2019 | 12 | 12-0 | 100% | replica |
| us:v1 | bc19-starter | 97 | 97-0 | 100% | local, replica |
| us:v2 | bc19-starter | 14 | 14-0 | 100% | local |
| us:v4 | cand:h16r | 40 | 24-16 | 60% | local |
| programjames.BC19Bot-root | CS554-software-engineerin~a575dc | 3 | 0-3 | 0% | replica |
| programjames.BC19Bot-root | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | spachava753.bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | jyurkanin.corn_bc19 | 3 | 3-0 | 100% | replica |
| programjames.BC19Bot-root | nhard.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | CS554-software-engineerin~a575dc | 9 | 4-5 | 44% | replica |
| 18dcb01.Battlecode19-prea~fb5c48 | sunanth123.battlecode19-prorush | 3 | 2-1 | 67% | replica |
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
| cvxluo.battlecode19 | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | haydenshively.Battle-Code~e37b3e | 3 | 1-2 | 33% | replica |
| cvxluo.battlecode19 | CometsTech.battlecode2019~187e8c | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| cvxluo.battlecode19 | jyurkanin.corn_bc19 | 6 | 6-0 | 100% | replica |
| ipercyNC.group6-battlecode | CS554-software-engineerin~a575dc | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jamesrayman.HCN-bot | 3 | 1-2 | 33% | replica |
| ipercyNC.group6-battlecode | jackliu612.Battlecode19 | 3 | 3-0 | 100% | replica |
| ipercyNC.group6-battlecode | howard36.Battlecode2019-sprint | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | CometsTech.battlecode2019 | 75 | 34-41 | 45% | replica |
| CS554-software-engineerin~a575dc | JasonLarson44.2019-Battle~1c7639 | 3 | 3-0 | 100% | replica |
| CS554-software-engineerin~a575dc | bc19-starter | 66 | 65-1 | 98% | replica |
| CS554-software-engineerin~a575dc | ArtemUstilov.bc19_CrazyTapok | 21 | 21-0 | 100% | replica |
| sunanth123.battlecode19-prorush | evanyeyeye.battlecode2019~af562c | 3 | 0-3 | 0% | replica |
| sunanth123.battlecode19-prorush | bayoumi17m.BattleCode-2019 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | vicennial.BattleCode19 | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | liwanlin41.examplefuncsplayer | 3 | 3-0 | 100% | replica |
| sunanth123.battlecode19-prorush | OmarTahoun.battle-code | 3 | 3-0 | 100% | replica |
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
| CometsTech.battlecode2019~187e8c | VictorButoi.BattleCode201~c4576b | 3 | 3-0 | 100% | replica |
| CometsTech.battlecode2019~187e8c | OmarTahoun.battle-code | 6 | 4-2 | 67% | replica |
| CometsTech.battlecode2019~187e8c | DivyanshuSaxena.Battlecode | 3 | 1-2 | 33% | replica |
| CometsTech.battlecode2019~187e8c | TheRobotCarlson.battlehac~323871 | 3 | 3-0 | 100% | replica |
| rooneyshuman.Battlecode | roy-love.onshoreBattleCode2019 | 6 | 5-1 | 83% | replica |
| rooneyshuman.Battlecode | waylon531.scala_starter | 9 | 9-0 | 100% | replica |
| rooneyshuman.Battlecode | ryanhzhao.Battlecode-2019 | 3 | 3-0 | 100% | replica |
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
