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
5. **The long losses are lost on health, not castles.** 16 of 29 losses reached r1000 at equal castles with health
   gaps of 4,900-10,000; in them karbonite binds (0-11 K left) while fuel sits idle (9,000-30,000 F).
6. **We over-mine fuel early.** At r50 we have mined 5.0-5.2 F per K, the field 4.3; in our losses 1,700 F to their
   1,410, with 324 K to their 354.
7. **The opening bank waits on its own fuel miners.** v8's bank holds 70-80 K from r20 to r50 (field 40) while it
   holds 733-1,577 F (field 447-998); it hires as many fuel miners by r40 as the field (4) and one fewer karbonite
   miner (4 against 5). On one-castle maps with one karbonite depot next to the castle and two fuel depots (K1F2:
   2013, 2644, 1706, 2740, 493, 1915) the bank climbs 40, 40, 60, 60, 80, 80, 80 and stalls one cargo under the
   pioneer's 90-K gate (10 + PIONEER_DEPART_K 50 + DEF_RESERVE_K 30) with 1,100-1,500 F idle. On 2740 (replica
   727-3) the castle hired 1 karbonite and 2 fuel miners plus 2 escorts by r5, and its first pioneer left at r44.

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
at equal castles, all on 2-3-castle maps, and on 11 of the 16 v8's castles call the general attack on 2-3 different
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
that the switch passes the replica panel; our accepted rate is about 1 in 8). Every switch defaults to v8.

| # | suggestion | model | switch | acts on | conf. | effort | status |
|---|---|---|---|---|---|---|---|
| 1 | Staff only karbonite depots in the opening while fuel is above a floor and no attacker has been seen | production (free good), inventory (cargo lumps), national accounts | FUEL_DEFER 60, FUEL_DEFER_MIN 400 | one-castle K1F2 maps | 0.10-0.20 | S | h161, built; section 5 |
| 2 | Every castle calls the general attack on the same enemy castle | Blotto, Lanchester | ATTACK_ONE 1 | split calls: 19 of 40 pool maps, 11 of 16 r1000 losses, 7 of 18 panel cells | 0.15 | S | h162, built |
| 3 | Against campers out of reach, build out of their band and release 2A+1 together | Lanchester (concentration in time) | MUSTER 1 | 1712, 2797, 2518, 1884 feeding cells | 0.20 | M | h163, built; section 5 |
| 4 | Shoot a lone camper with the castle instead of buying a newborn it kills | relative prices (a shot costs no K) | CASTLE_FIRE 2 | castles with 1-2 attackers in reach | 0.12 | S | next |
| 5 | A karbonite miner gives a part cargo when it completes a purchase (pioneer or church gate) | Baumol-Tobin | DEPOSIT_AT 1, DEPOSIT_UNTIL 60 on FUEL_DEFER | adjacent-K maps: 2013, 493, 1706, 1241, 1915 | 0.10 | S-M | after h161 |
| 6 | A castle that loses a pilgrim before r100 builds 2 guards at once | Ramsey (state switch), depreciation | ECON_HIT 50 | early pilgrim deaths: 16 of 29 losses | 0.10 | S | queued |
| 7 | Escort every contested site, not only the first | Leontief complements, Tullock | ESCORT_EACH 2 on ESCORT_HOLD_R 2 | maps with 2+ contested clusters | 0.10 | S | after h157 |
| 8 | Abandon a chain line that meets a wall of 28+ units | real options | CHAIN_WALL 28 (exists) | chain lines into walls | 0.10 | S | screen |
| 9 | End ECON_UNTIL for a castle whose land is saturated | Solow fixed factor, Ramsey | ECON_SAT 10 (castles) | saturated maps | 0.08-0.10 | S | after h160 (ECON_NOPLAN) |
| 10 | After a pioneer dies, escort a retry after 30 rounds, not 100 | real options, idle land | LOST_RETRY 30 | remote pioneer deaths: 14 of 29 losses | 0.08 | M | after h157 |
| 11 | Plan order with a finite premium for contested land | von Thünen | PLAN_CONTEST_PREM 2, PLAN_FUEL_W 4 | 8 of 26 maps change order | 0.07 | S | targeted panel |
| 12 | Hunt enemy pilgrims dwelling on our depots far from their structures | enclosure denial | HUNT_DEPOT 1 after h156 (INTERCEPT) | their churches on our half | 0.07 | M | after h156 |

Rules of the test, unchanged from TRAINING_ALGORITHM.md: one switch per candidate on v8; a no-op check that the
defaults reproduce v8 byte for byte; unit tests; mechanism bars written before any game is read; the side-aware
replica panel (block 1 rejects at z < 0.5; two blocks accept at z >= 2, reject below 1; else a third block); a
map-conditional switch gets a targeted panel on the cells where it acts.

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
(48 of the 49 losses). Panel block after h162's; TRAINING_LOG has the pre-registration.

## 6. Dropped on the numbers

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

- bank.jsonl has no fuel column; re-run the bank census with the timeline's fuel field before any fuel-glut switch.
- No replay yet shows enemy pioneers mining on our depots while they wait for their bank (HUNT_DEPOT's premise).
- Pioneer arrival is not logged per game. `tools/census.js` now gives the first pioneer's round and the team's fuel
  after it, and the first church's round, which is what FUEL_DEFER's bars need.
