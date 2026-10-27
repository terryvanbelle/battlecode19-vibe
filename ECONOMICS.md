# ECONOMICS.md: economic models applied to the Crusade bot

Owner request (PROMPTS 37, 2026-10-24 16:43 PDT): look into how micro- and macroeconomic models apply to the bot's
strategy, write concrete, practical suggestions, then try them, most likely first.

How this was made: my own accounting of the rules (RULES.md §3-4) and censuses of v8's 51 replica field games
(matches 726-731 and v8's ladder games; TRAINING_LOG 2026-10-24 15:13, 15:32, 16:02, 16:27, 18:45);
then five research lenses run as a read-only workflow (production and location, growth and capital, inventory and
finance, game theory and military economics, national accounts), each proposal checked by a separate verifier against
the code and the attempt ledger. Nothing here reads a 2019 post-mortem or an external bot's source.

## 1. The economy in one page

Prices (karbonite K / fuel F) and what they buy:

| unit | cost | HP | what it does | HP per K | value per K² (square law, d·h/c²) |
|---|---|---|---|---|---|
| pilgrim | 10 / 50 | 10 | mines 2 K or 10 F a turn (each mine costs 1 F), carries 20 K / 100 F | | |
| crusader | 15 / 50 | 40 | 10 dmg at r² 1-16, moves r² 9, sees r² 49 | 2.67 | 1.78 |
| prophet | 25 / 50 | 20 | 10 dmg at r² 16-64, sees r² 64 | 0.80 | 0.32 |
| preacher | 30 / 50 | 60 | 20 dmg 3x3 splash at r² ≤ 16 | 2.00 | 1.33 (+splash) |
| church | 50 / 200 | 100 | builds, takes deposits | | |
| castle shot | 0 / 10 | (200) | 10 dmg at r² 1-64 | | |

Income: every team gets 25 F a round for free; everything else is mined. A pilgrim's cycle at a depot t moves from
the structure it delivers to is 10 turns of mining + t out + 1 give + t back = 11 + 2t turns, so its karbonite income
is 20 / (11 + 2t) K a round: 1.82 adjacent (t 0), 1.54 (t 1), 1.33 (t 2), 1.18 (t 3), 0.95 (t 5), 0.74 (t 8). A fuel
miner adjacent yields about 8.2 F a round net. A karbonite pilgrim pays back its 10 K in about 6 rounds.

A church is a lumpy investment: 50 K + 200 F, plus its n miners (10 K + 50 F each) and the pioneer's walk. At the
measured ~1.6 K-equivalent per pilgrim-round (fuel at 1/5 K): 2 miners pay back in ~22 rounds, 4 in ~14, 8 in ~10.
A church 10 rounds late forgoes ~64 K-equivalent on a 4-depot cluster, about 70% of its own price.

Land is the fixed factor. On the 40 pool maps our half holds 723 depots (median 14 a map); 34% can be staffed from
the castles, 66% only from a church. Castles plan 0 churches on 5 maps, 1 on 9, 2 on 7, 3 or more on 19.

The war's terminal condition is lexicographic: at round 1000 more castles wins, then more total health.

## 2. Diagnosis: where v8 loses the economic game

From v8's 51 replica field games (22 wins, 29 losses):

1. **Productivity is at par; quantity is not.** Karbonite-equivalent per pilgrim-round in r50-100 is 1.57-1.61 for
   us and 1.47-1.54 for the field. Pilgrims at r100: ours 14 (wins) / 10 (losses), theirs 11.5 / 14. Mined K at r100:
   762 / 696 against 620 / 902. Our K income falls to 0.91, 0.86, 0.72, 0.65 of theirs at r50, 100, 150, 200 in the
   losses (about 1.0 in the wins). The gap is land claimed, not output per worker.
2. **We are late to church.** Our first church comes at a median r32.5 against theirs at r22 in the losses (we are
   first in 2 of 18); 11 of 29 losses have no church of ours by r200 (1 of 22 wins). Their churches on our half by
   r100: 22 in losses, 8 in wins.
3. **The bank idles.** Median bank at r100: ours 335 K, the field's 92; over 300 K in 28 of 51 games. Army at r100:
   4 against 10. ECON_UNTIL 100 holds the peacetime army for pioneers that, on many maps, never leave.
4. **Capital depreciates fast in the losses.** 46% of our military karbonite in losses died within 3 rounds of being
   built (12% in wins); 33 of our pilgrims died by r100 in the losses (4 in wins), 23 of them to prophets, 22 within 8
   tiles of one of our structures.
5. **The long losses are lost on health, at home.** 16 of 29 losses reached r1000: 11 at equal castles, decided on
   health (gaps of 1,700-12,500), and 5 on castles. In the 11, karbonite binds (0-11 K left) while fuel sits idle
   (9,000-30,000 F), and from r500 to r899 we lost 85% of the karbonite we spent (35,175 of 41,220 K, 98% of it within
   r2 100 of our own structures) against their 41%; 62% of those home losses died within 3 turns of birth, 98% to
   prophets, 82% to prophets standing at r2 65-144 from our nearest structure, just out of a castle's reach. In the 9
   r1000 wins we lose 44% and they lose 128% (TRAINING_LOG 2026-10-24 23:32).
6. **We over-mine fuel early.** At r50 we have mined 5.0-5.2 F per K, the field 4.3; in our losses 1,700 F to their
   1,410, with 324 K to their 354.
7. **The opening bank waits on its own fuel miners.** v8's bank holds 70-80 K from r20 to r50 (field 40) while it
   holds 733-1,577 F (field 447-998); it hires as many fuel miners by r40 as the field (4) and one fewer karbonite
   miner (4 against 5). On one-castle maps with one karbonite depot next to the castle and two fuel depots (K1F2:
   2013, 2644, 1706, 2740, 493, 1915) the bank climbs 40, 40, 60, 60, 80, 80, 80 and stalls one cargo under the
   pioneer's 90-K gate (10 + PIONEER_DEPART_K 50 + DEF_RESERVE_K 30) with 1,100-1,500 F idle. On 2740 (replica
   727-3) the castle hired 1 karbonite and 2 fuel miners plus 2 escorts by r5, and its first pioneer left at r44.
8. **Pioneers are bought for land the enemy already holds.** Of v8's 327 pioneers in 46 games, 142 went to a site
   where an enemy church or castle already stood within 3 king steps (and none of ours); 5 of those built a church,
   43 died and 88 never built, mined or died: they park 8-15 king steps short, out of the campers' reach, too far to
   see the church, and the castle forgets each after 80 turns and sends the next (729-3, seed 1712: 24 pioneers, 16
   parked). 108 pioneers ended so, 56 in the 21 wins and 52 in the 25 losses (scratchpad econ/lost.mjs).
   By r200 the losses hold 25 planned clusters of ours with an enemy church: at 12 our pioneer was still short of
   the site when theirs went up, 6 were never sent (the slots held by stalled pioneers), 6 had our church first
   (scratchpad econ/ourhalf.mjs; TRAINING_LOG 2026-10-25 05:58).

## 3. The models and what each one says

**Production and location (micro).** The pilgrim production function above makes fuel a free good in the opening:
the 500 F start plus 25 a round (worth about 2.7 adjacent fuel miners) covers r1-50 demand, about 1,200-1,400 F for
pilgrims, escorts, the pioneer's 250-F floor and a church. Karbonite is the binding input, yet v8 staffs every served
depot from turn 1, so a K1F2 castle spends 20 of its 100 opening K on fuel miners. Depots are Ricardian land: the
next pilgrim on a staffed structure has a marginal product of 0, so growth is churches. Von Thünen bid-rent reads
the hot-first plan order as an infinite premium for contested land; a finite premium (2, fuel depots at 1/4)
changes the order on 8 of 26 maps. Weber location (weight karbonite depots in the church tile) gains under 1 K a
turn on 5 maps and loses on 2591.

**Growth and capital (macro).** Solow with a fixed factor: output is min(pilgrims, claimed depots). A pilgrim
returns 8-13% of its price a round while land is free and 0 once land is saturated. Ramsey: the invest-or-arm split
is bang-bang, and its switch should be a state (land saturated, capital being destroyed), not ECON_UNTIL's round
100; the bank-level trigger ECON_RICH closed at z 0.00. Depreciation driven by enemy action separates wins from
losses better than the bank or the r100 army: a pilgrim breaks even at a death hazard of about 0.08 a round.
Precautionary saving puts the buffer at roughly 115/265/415 K for 1/2/3 castles, which fits RICH_K 200 and h91's
neutral read. Real options: the 7 chain lines that met walls of 28+ enemy units killed 0 castles and lost 8,020 K,
the 9 that met 10-25 killed 9, so a lumpy line wants an abandonment rule. Terminal value: at r1000 castles then
health decide, crusaders give 2.67 HP per K, and in long losses karbonite binds (0-11 K left) while 9,000-30,000 F
idles, so v8's crusader dump is right and a fuel dump (ENDGAME_FUEL, h115) targeted the wrong good.

**Inventory and finance.** The team bank is a two-good inventory under Leontief demand. Karbonite arrives in lumps,
a 20-K cargo per miner every 11 or more turns (Baumol-Tobin: the cargo is cash in transit), so a saving moves the
pioneer only when it crosses a cargo boundary: deferring fuel miners and an early partial deposit are
super-additive. Karbonite's shadow price is high in r1-40 (bank under the 90-K gate at r40 in 29 of 46 games with a
church plan) and near 0 in r60-100 (median 250 K at r80). Late in the game the binding good flips by game (2046,
1712, 2797 end karbonite-bound; 203, 520, 1653 fuel-bound), so any stock rule must work both ways.

**Game theory and military economics.** Lanchester's square law values a unit at d·h/c²: crusader 1.78, preacher
1.33, prophet 0.32, so at equal karbonite massed crusaders beat prophets about 5.6:1, if they arrive together. They do
not: a prophet outranges crusader vision (r² 64 against 49) and a newborn acts after every older robot, so units sent
one at a time fight a linear ambush; a lone crusader closing on 2 prophets dies without firing. In losses 46% of our
military karbonite dies within 3 rounds of its build (12% in wins). A castle shot costs 10 F and no karbonite, and a
castle alone beats up to 3 prophets. Colonel Blotto under the lexicographic tiebreak: 16 of 29 losses reached r1000
(11 at equal castles, decided on health), and on 11 of the 16 v8's castles call the general attack on 2-3 different
enemy castles, so the one kill that flips the game is tried with a half or a third of the force. Preemption: field
pioneers leave at r4 at 2 king steps a turn, ours at r12-24 at 1, and a rival church once standing is a factory on
the spot, so a race lost is best conceded. Tullock contests with square-law decisiveness waste half-commitments:
v8's 2-crusader escort passed (z 2.54) where one crusader failed.

**National accounts.** A log-mean Divisia split of the mined-karbonite gap in losses (r50-200, 840 K a game): labour
89% (church count 74%, about 551 K; pilgrims killed 9%), karbonite share 10%, output per pilgrim 0. The church gap is
count, not timing, and opens after r100: across 27 losses we build 50 churches by r100 and 5 more by r200, they build
91 and 45. Their churches on our half by r200: 50 in losses, 14 in wins, about 279 K a game of their mining on our
land. At r100 we bank 38% of what we mined (they 11%) and hold 36% in army and transit (they 54%). Surplus helps
only when aimed at the binding factor: security of contested or lost land, or denial before a rival church stands.

## 4. Suggestions, most likely first

Confidence is the verifier's, after checking each proposal against the code and the attempt ledger (a probability
that the switch passes the replica panel; our accepted rate is about 1 in 8). Every switch defaults to the champion (v8 when written, v9 from 2026-10-25 07:24, v10 from 15:26, v11 from 20:50, v12 from 2026-10-26 10:39).

| # | suggestion | model | switch | acts on | conf. | effort | status |
|---|---|---|---|---|---|---|---|
| 1 | Staff only karbonite depots in the opening while fuel is above a floor and no attacker has been seen | production (free good), inventory (cargo lumps), national accounts | FUEL_DEFER 60, FUEL_DEFER_MIN 400 | one-castle K1F2 maps | 0.10-0.20 | S | h161, rejected; section 5 |
| 2 | Every castle calls the general attack on the same enemy castle | Blotto, Lanchester | ATTACK_ONE 1 | split calls: 19 of 40 pool maps, 11 of 16 r1000 losses, 7 of 18 panel cells | 0.15 | S | h162, rejected; section 5 |
| 3 | Against campers out of reach, build out of their band and release 2A+1 together | Lanchester (concentration in time) | MUSTER 1 | 1712, 2797, 2518, 1884 feeding cells | 0.20 | M | h163 rejected at three blocks (z 1.23); its hold-only form h167 ACCEPTED as v9 (1120-1131 + 1143-1154, 38 of 72, z 2.78); section 5 |
| 4 | Shoot a lone camper with the castle instead of buying a newborn it kills | relative prices (a shot costs no K) | CASTLE_FIRE 2 | castles with 1-2 attackers in reach | 0.12 | S | dropped (section 6) |
| 5 | A karbonite miner gives a part cargo when it completes a purchase (pioneer or church gate) | Baumol-Tobin | DEPOSIT_AT 1, DEPOSIT_UNTIL 60 on FUEL_DEFER | adjacent-K maps: 2013, 493, 1706, 1241, 1915 | 0.10 | S-M | dropped (section 5) |
| 6 | A castle that loses a pilgrim before r100 builds 2 guards at once | Ramsey (state switch), depreciation | ECON_HIT 50 | early pilgrim deaths: 16 of 29 losses | 0.10 | S | dropped (section 6) |
| 7 | Escort every contested site, not only the first | Leontief complements, Tullock | ESCORT_EACH 2 on ESCORT_HOLD_R 2 | maps with 2+ contested clusters: 6 of 15 panel maps | 0.10 | S | h165, closed unplayed: its base h157 was rejected (section 5) |
| 8 | Abandon a chain line that meets a wall of 28+ units | real options | CHAIN_WALL 28 (exists) | chain lines into walls | 0.10 | S | h164, h172, h181, h187 closed as the champion moved; on v12 h198 REJECTED at panel block 1 (paired t 0.00; TRAINING_LOG 2026-10-26 19:25) |
| 9 | End ECON_UNTIL for a castle whose land is saturated | Solow fixed factor, Ramsey | ECON_SAT 10 (castles) | saturated maps | 0.08-0.10 | S | ECON_SAT not built; ECON_NOPLAN (h160, h173, h182, h188, each closed as the champion moved) is h199 on v12, queued |
| 10 | After a pioneer dies, escort a retry after 30 rounds, not 100 | real options, idle land | LOST_RETRY 30 | remote pioneer deaths: 14 of 29 losses | 0.08 | M | dropped on a census (section 6); row 13 instead |
| 11 | Plan order with a finite premium for contested land | von Thünen | PLAN_CONTEST_PREM 2, PLAN_FUEL_W 4 | 8 of 26 maps change order | 0.07 | S | not built |
| 12 | Hunt enemy pilgrims dwelling on our depots far from their structures | enclosure denial | HUNT_DEPOT 1 after h156 (INTERCEPT) | their churches on our half | 0.07 | M | not built: its base h156 (INTERCEPT) closed unplayed with v8 |
| 13 | Stop re-buying pioneers for held sites: one 40 turns no nearer its site gives it up and mines by our structures; a castle rests a site whose pioneer timed out | sunk cost, idle capital | PIONEER_STALL_ANY 40, PIONEER_HOME 1, PIONEER_TIMEOUT_REST 1 | 108 parked pioneers in 46 games | 0.08 | S | h169 closed with v8; h170 on v9 rejected on panel block 1 (z -1.71; TRAINING_LOG 2026-10-25 11:16) |
| 14 | Match idle miners to free safe home depots: a pilgrim whose depot is taken or hot takes a safe one; one 25 turns no nearer gives its depot up | search and matching (idle labour beside vacant jobs) | PILGRIM_HERE 1, PILGRIM_STALL 25 | idle miners beside safe depots: 40.4 pilgrim-rounds a game to r300, 23 of 72 games at 50+ | 0.06 | S | h174, h180, h186 closed as the champion moved; h197 on v12, queued |
| 15 | A structure under fire calls its held crusaders: hit in its last 3 turns, it radios the nearest attacker; held crusaders whose home lies near engage | Lanchester (an idle force adds nothing to the fight: bring it to the engagement) | MUSTER_RESCUE 100 | castles lost with held crusaders idle within 10 steps: 25 of v9's 54 losses, 0.29 a game | 0.12 | S | h175, ACCEPTED as v10 (two blocks 37 of 72, z 0.40; idle-held castle losses 0.042 a game against v9's 0.287; basics-fix rule; TRAINING_LOG 2026-10-25 15:26) |
| 16 | Don't feed newborns to campers: a military unit built while enemy attackers are in sight goes on a free adjacent tile they cannot kill it on before its first turn, if one exists | marginal product (a unit that dies unborn adds 0 for its full price; the price is the same on a safe tile) | DEF_SAFE 1 | newborns dead within 2 rounds on an exposed tile while a safer one was free: v9 8.50 a game on the panel (losses 11.61, wins 5.39); ladder 1373 seed 1884: 119 of 222 | 0.10 | S | h178 (h176 rebuilt on v10), ACCEPTED as v11 (two blocks 36 of 72, z 0.00; stillborn safer 2.68 a game against v10's 11.60; basics-fix rule; TRAINING_LOG 2026-10-25 20:50) |
| 17 | Open on safe land: the turn-6 pioneer goes to the first planned cluster we reach 7+ king steps before the enemy, and the contested one still leaves as before | first-mover rent (a race lost pays nothing; a site out of the rival's reach pays its rent at once), Tullock (spend on contests you can win) | PIONEER_EARLY 6, PIONEER_OPEN 7 | v9's first pioneer churched 0 of 24 times on m <= 1 sites, 12 of 12 on m >= 7, 1 of 48 in losses; fires on 9 of 15 panel maps | 0.10 | S | h177, then h183 with row 18; on v11 h184 REJECTED at three blocks (z 2.51, other cells z -0.85; TRAINING_LOG 2026-10-26 06:37) |
| 18 | Race where there is no safe land: in a team none of whose castles has a cluster 7+ king steps ahead, a castle whose plan opens with a race (m <= 1) sends its turn-3 pioneer there | patent race (winner takes all: an early entrant's expected rent beats the nothing a late one earns) | PIONEER_EARLY 6, PIONEER_OPEN 7, PIONEER_RACE 2 | v9's first pioneers to m-0 sites left at r23-44 and churched 0 of 24; the enemy churched 2518's site at r14, 2591's at r23 (both cells 0 of 6 for v10); fires on 2518 and 2591 beyond row 17's maps, where it plays as row 17 | 0.08 | S | in h183 and h184 (row 17); the race part alone (PIONEER_OPEN 99) h194, on v12 h196, queued |
| 19 | Stop re-buying pioneers for held sites, castle side only: a pioneer still out 80 turns without its church counts as one lost there, and the rest before the next doubles per loss (100, 200, 400 ... rounds); a pioneer that sees an enemy structure at its site reports it taken | sunk cost (the next pioneer to a site four before it never reached is a fresh purchase of the same failed option) | TAKEN_SEEN 1, PIONEER_TIMEOUT_REST 2, PIONEER_LOST_DOUBLE 1 | v11 sent 341 of 576 pioneers to sites the enemy held (4.74 a game), 242 of 304 repeats right after a timed-out one (a model of the switch: 2.71 a game) | 0.12 | S | h190 rejected on panel block 1 (1492-1503: 16 of 36, z -1.42; TRAINING_LOG 2026-10-26 00:42); the pilgrim side (PIONEER_TIMEOUT_HOME 80) h191, on v12 h200, queued |

Rules of the test are TRAINING_ALGORITHM.md's (§2, §4): one switch per candidate on the champion; a no-op check that the
defaults reproduce the champion byte for byte; unit tests; mechanism bars written before any game is read; a
map-conditional switch gets a targeted panel on the cells where it acts. From h198 (TRAINING_LOG 2026-10-26 18:59) the
replica panel is scored by the paired fresh-cell rule against the champion's reference blocks (`tools/panel_paired.sh`):
block 1 rejects at t <= 0, any block accepts at t >= 2 with D >= 4, block 2 rejects at t <= 1, block 3 at t <= 1.5. The
z values above and in section 5 are the side-aware pooled rule of their day (LEARNINGS 50).

## 5. Results

**FUEL_DEFER (h161).** Driver diagnostics, head to head against v8 to r150 on 16 maps (one side; 2013 checked on
both sides: an exact mirror). No exceptions.

- Floor 300 (dist/h161): the first church came earlier on 12 of 16 maps (2013 r33 against r43, 1706 29/40, 2644
  40/51, 2518 26/41, 826 20/33). Karbonite mined by r150 rose on most one-castle maps (2013 2,068 against 1,018;
  2644 1,254/412; 2321 1,720/1,290; 2591 796/432) but fell on two-castle maps (826 2,422/3,250; 836 2,116/3,168;
  1712 1,516/2,294), where two castles spend fuel twice as fast as the trickle refills it: fuel fell to 17-226 after
  the first church and karbonite piled up unspent.
- Floor 600 (dist/h161m): inert. The game starts at 500 F, so the floor is never met before the fuel miners come;
  first churches matched v8 on 15 of 16 maps.
- Floor 400 (the inventory verifier's dose: above the escorts' 350-F and the pioneer's 250-F gates), the dose sent
  to the panel as h161: one-castle maps as at 300 (first church 4-15 rounds earlier on 2013, 2644, 1706, 2518, 2321,
  493; karbonite mined by r150 ahead on 2013, 2644, 2321, 2591, behind on 1706 and 2518); two-castle maps back near
  v8's mix: 826, 799, 2797 and 203 equal, 1712 and 1036 ahead (2,106 against 1,682; 2,838 against 1,650), 836 behind
  (2,300 against 3,524, first church r37 against r31).
- One head-to-head game a map is a noisy instrument (836's first church came at r31 at floor 300 and r37 at 400);
  the replica panel decides.
- The panel rejected it at block 1 (1011-1022): 14 of 36 against the pooled 16.0, side-aware z -1.17 (TRAINING_LOG
  2026-10-24 21:38). On its 18 one-castle games the first pioneer came at r22.7 against v8's r31.1, but the first
  church at r50.2 against r50.0: earlier on 1706, 2321 and wololo 2644, later on wololo 2013 and IanCoolidge0 2644,
  and it lost wololo 2644 on both sides, a cell v8 wins (TRAINING_LOG 22:10). Karbonite sooner did not buy contested
  sites sooner. Row 5 (DEPOSIT_AT) sells the same good, a purchase a few rounds sooner, and is dropped unbuilt.

**ATTACK_ONE (h162).** Rejected on the panel at block 1 (1023-1034): 13 of 36 against the pooled 16.0, side-aware
z -1.80 (TRAINING_LOG 2026-10-24 22:56). It lost three usually-won red cells (awesomelemonade 2797, uvafan 1653,
bot1v43 2321) and won no new one: concentrating the general attack on one castle did not buy the castle kill that
breaks a tie at r1000. The calls were joined: 0 split call rounds in its 18 multi-castle games, against 283 of 468 in v8's 9 (census
attack_split, TRAINING_LOG 23:10). The switch acted as built and moved no game.

**FEED_STOP (h159, the precursor of row 3).** Rejected on the panel at two blocks (33 of 72, side-aware z 0.66;
TRAINING_LOG 2026-10-24 19:01). In our losses it cut the share of military karbonite dead within 3 rounds of birth from
55% to 42% and moved no games: the structure that stops feeding leaves the karbonite idle, and the camper stays. So
row 3's prior is lower than 0.20: what may change a game is what the karbonite buys instead.

**MUSTER (h163).** Its first form (any attacker out of the structure's reach) fired 48-112 times a game against
advancing armies and lost two of three games to the mirror on the driver (LEARNINGS 41); the built form acts only on
a prophet that has stood 3 turns beyond r2 36 (64 for a castle) with no enemy melee in sight, under v8's gate. It
never fires against v8 on 2797 (v8 advances), never against dist/camp (whose prophets march escorted), and fires
against dist/turtle's lattice, where releasing on the visible campers' count sends crusaders into the hundreds behind (1712,
army 22 at r400 against 87 held and v8's 26) or costs nothing (2797). It would fire in 79 of the 90 panel games
(48 of the 49 losses). Panel block 1 (1047-1058): 18 of 36 against the pooled 16.0, side-aware z 1.34 (studied cells
5 of 8, z 1.47; others z 0.63); block 2 (1063-1074) 17 of 36, z 0.71; the two blocks 35 of 72, side-aware z 1.45,
so a third block, 1091-1102: 16 of 36, z 0.08. Rejected at three blocks: 51 of 108, side-aware z 1.23 (studied
12 of 24, z 0.57; others z 1.09; TRAINING_LOG 2026-10-25 04:35); block 1's lead did not repeat. The 2026-10-24 20:54
entry has the pre-registration. Its hold-only form (MUSTER 2, h167: the held crusaders stay on rings 2-4 from home,
health for the round-1000 tiebreak) passed: block 1 (1120-1131) 21 of 36, side-aware z 3.28; block 2 (1143-1154) 17
of 36; together 38 of 72, z 2.78, other cells z 2.40. ACCEPTED as v9 (TRAINING_LOG 2026-10-25 07:24); it won
botfinalsafe 203 red twice (pool 0 of 11) and wololo 2013 red once (0 of 8).

**Parked pioneers (h169, row 13).** Emulating siteStalled on v8's 327 field pioneers, PIONEER_STALL_ANY 40 fires on
100 of the 108 that parked, 46 of the 79 that died and 5 of the 123 that built a church, a median 50 rounds after
birth. In self-play (seed 1712, both sides against v8) no pioneer stalls and the games are identical with the sides
swapped: the switches act only where the field holds our sites. Bars and studied cells: TRAINING_LOG 2026-10-25
04:22; h169 closed unplayed when v9 replaced its base, and the same switches on v9 are h170. Panel block 1
(1379-1390): 15 of 36 against the side-aware 18.0, z -1.71 (effect -171 Elo, 95% -368 to +25); the basics-fix
rule rejects block 1 below -1: rejected (TRAINING_LOG 2026-10-25 11:16).

**ESCORT_EACH (h165).** Built on h157 (v8's first escorts hurried to their site and held within 2 steps of it), so it
would play only if h157 were accepted. The panel rejected h157 at block 1 (1035-1046): 14 of 36, side-aware z -1.17;
both first escorts held at the site in 1 of its 10 studied games (TRAINING_LOG 2026-10-25 00:11). h165 closed
unplayed.

## 6. Dropped on the numbers

- **CASTLE_FIRE** (row 4, 0.12), dropped before a build on a census of v8's 18 panel games 726-731 (scratchpad
  fire/cf_census.js): a castle saw 1-2 attackers with the nearest in its reach on 41 turns, and it already shot on
  36 (v8 builds only while ours do not outnumber them 2A + 1, and only when it can pay); it built on 5, in 3 games
  (3 against prophets alone), and 1 of those newborns died within 3 rounds. The switch could change at most 5
  builds in 18 games, before the verifier's decoy filters. Castles are not lost to lone campers but to armies.
- **LOST_RETRY** (row 10, 0.08), dropped before a build on a census of v8's 51 field games (726-731, 770-776, 800,
  805, 853, 887; scratchpad econ/lost.mjs): of 79 pioneer deaths, 74 came where an enemy church or castle already
  stood within 3 king steps of the site, 2 where one came within the next 100 rounds, 3 where none ever came. A
  sooner retry pre-empts nothing; it would buy more of the waste row 13 removes.
- **ECON_HIT** (row 6, 0.10), built (castles only, the verifier's rule) and dropped before a panel on a census of
  the same 18 games (scratchpad fire/hit_census.js, hit2_census.js): our pilgrims died before r100 6 times, all in
  losses (5 of 10), 5 where a castle sees them go (r30, 31, 78, 90, 93) and 1 by a church (r61). Only 2 games lose a
  pilgrim early enough for 2 guards to matter before v8's army starts at r100. The lens's 33 deaths in 16 of 29
  losses came from a wider set of games; on v8's panel the early raids are rare (ESCORT_FIRST, h128, covers the
  first contested site).

- **Release CHAIN_K when the line cannot fill** (not ranked; v9's bank census, TRAINING_LOG 2026-10-25 14:00): the
  bank takes over 150 rounds to reach 1000 K in 16 of 54 losses and 1 of 54 wins, but those are botfinalsafe 1706 and
  awesomelemonade 2518 (all 12 games) and two other cells, with income 0-4 K a round from r200; releasing frees 150-700
  K in games lost in the opening race.

- **Spend the idle opening bank on crusaders at our first hot cluster** (0.05): the trigger is ECON_RICH's (h116 cut
  churches to 94%), it fires only at r80-100, after the race, and v8's escorts stop 12 tiles short.
- **Send the pioneer when the bank can pay at arrival** (0.06): re-opens the departure-gate and hold lines (h97,
  h117/h118/h124, h147) and leaves h147's failure (a rush draining the inflow) open.
- **End ECON_UNTIL for a castle with nothing left to pioneer** (0.07): the trigger fires vacuously on castles with
  empty plans, and the named cells hold banks within 0-75 K of the reserve floor; revive only as a per-castle
  ECON_NOPLAN if h160 reads above 0.
- **Cruise at full speed only in a fuel glut** (0.05): its speed premise predates NAV_FIT; the target games are lost
  on karbonite and health, not speed.
- **Fund the first chain line early** (0.04): income is about 10 K a round, not 25-35, so the fund replaces the
  r100-200 army growth that marks the wins.
- **Guard only high-rent contested churches** (0.04): the targeted church losses happen in 1-2 of 13 games.
- **Weber church site** (0.03): under 1 K a turn on 5 maps, negative on 2591.
- Also rejected inside the lenses: long-haul staffing when saturated (at most +1.4 K a turn), infill churches near
  castles (payback ~100 turns), late payback cutoffs (pilgrims pay back in 7-17 turns), a karbonite-weighted church
  plan (changes 2 of 31 first targets), a defence reserve timed to the enemy's arrival (frees only r1-8), not
  replacing fuel pilgrims in a glut (90-180 K a game).

## 7. Measurement gaps

- Fuel, closed 2026-10-25: v10's 72 h175 games (scratchpad read econ/fuel.mjs, TRAINING_LOG 2026-10-25 17:29) bank a median
  3,180 fuel at r100 and 11,100 at r500; no checkpoint from r100 to r900 found a team under 100 fuel but one; rounds
  with karbonite for a prophet but not its fuel are 2% (in wins 3.6%, losses 0.4%), the reverse 14.5%. Fuel is a free
  good: karbonite prices everything (HP per K: crusader 2.7, preacher 2.0, pilgrim 1.0, prophet 0.8). A fuel-glut switch
  can only save the 10 K of each fuel miner staffed past the glut (struct.js nextDepot staffs a free fuel depot when no
  karbonite one is free); not ranked.
- No replay yet shows enemy pioneers mining on our depots while they wait for their bank (HUNT_DEPOT's premise).
- Pioneer arrival, closed 2026-10-25: `tools/reads/pioneers.mjs` gives each pioneer's build, bank, arrival, church,
  death and the round an enemy church first stood by its site (TRAINING_LOG 2026-10-25 15:45); `tools/census.js`
  gives the first pioneer's round, the team's fuel after it and the first church's round (FUEL_DEFER's bars).
