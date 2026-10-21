# Benchmark field: public Battlecode 2019 bots

The field is every public Battlecode 2019 (Crusade) bot that could be found, compiled offline to the engine's bundle
format, for the private galaxy replica. Owner rules (CLAUDE.md 3 to 6) governed every step. Competitor source was
never read: discovery used search metadata, and classification used file paths, sizes, hashes and grep counts.
Strategy write-ups and post-mortems were never opened. Nothing contacted battlecode.org. Competitor code ran only in
sandboxes without network access.

Pipeline (all in `tools/bench/`, data in `~/projects/vibe/bc19-benchmarks/`, mirrored on battlecode-dev):

| step | tool | output |
|---|---|---|
| discover | `discover.py` (GitHub repo/code search, date windows, forks, forkers, gitlab.com, `web-candidates.txt`) | `_discovery.tsv` |
| fetch + verdict | `fetch.sh` (trees API path lists; sparse checkout of *.js/*.java/*.py; `grep -l` counts of 2019-only API names) | `_fetch.tsv`, `repos/`, `lists/` |
| bots | `classify.py` (entry files, single-file bots, compiled bundles; sha256; example/official flags) | `bots.tsv` |
| dates | `dates.py` (commits API, path-scoped) | `dates.tsv` |
| field | `roster.py` (per repo: best name + newest commit; dedupe by sha256; `field-exclude.txt`) | `tools/bench/field.tsv`, `tools/bench/candidates.tsv` |
| scan | `scan.py` (risky-pattern counts per bot) | `scan.tsv` |
| compile | `compile_field.py` -> `tools/compile_bot.js` (on the VM, under `~/.bc-extra.lock`) | `compiled/<name>/bot.js`, `compile.tsv` |
| smoke | `smoke.sh` (on the VM, one game at a time under the lock; stopped, see below) | `smoke.jsonl` |
| replica health | `replica_health.py` (on the VM: per-team stats from the replica's finished matches) | `replica-health.tsv`, `replica-matches/` |
| roster | `report.py --md BENCHMARK.md` | `tools/bench/roster.tsv`, the table below |

## Discovery

7316 candidate repositories: 7170 on GitHub and 146 on gitlab.com. A repo counts once for each source that found it:

| source | candidates | with 2019 code |
|---|---|---|
| `code:` GitHub code search for 2019-only API names (`SPECS.PILGRIM`, `karbonite_map`, `castleTalk`, `BCAbstractRobot`...) | 3015 | 407 |
| `win:` every repo matching "battlecode" / "battle code", split by creation date | 2443 | 129 |
| `repo:` repository search (bc19, battlecode2019, crusade... names, descriptions, topics, READMEs) | 1895 | 131 |
| `gitlab:` gitlab.com project search | 148 | 1 |
| `forker:` other repos of users who forked battlecode/battlecode19 | 63 | 26 |
| `fork:` forks of battlecode/battlecode19 | 17 | 17 |
| `web:` URLs from a web search (repo names only) | 16 | 13 |

The stargazer listing of battlecode/battlecode19 returned 404, so there is no `star:` source. On 2026-10-21 a second
pass searched GitHub repository names (battlecode crusade, bc19 bot, battlecode 2019 javascript/python), the web, and
the battlecode org's repositories. It found no repo that was not already a candidate; `battlecode/lectureplayer` is the
2020 player.

## Funnel

| stage | count |
|---|---|
| candidates | 7316 |
| no bot entry file in the path list (`robot.js` / `MyRobot.java` / `robot.py`) and found only by a date window | 3877 |
| sources contain no 2019-only API name | 2888 |
| sources over 200 MB / gone (404) / checkout failed / empty / the official monorepo | 10 / 7 / 2 / 3 / 1 |
| **repos with 2019 code** | **528** |
| 2019 API names but no bot entry or bundle (name collisions and libraries, see false positives) | 399 |
| only official example bots, or bots at official monorepo paths | 22 |
| only bots excluded by hand (`field-exclude.txt`) | 22 + 2 |
| same bot (sha256) as an earlier repo (forks and copies) | 11 |
| **repos contributing entrants** | **72** |
| bots found in the 129 repos that hold any (dir 605, compiled bundle 187, single file 47) | 839 |
| ... not an example or official-path bot / not excluded / after the junk-name rule | 701 / 609 |
| ... distinct by sha256 | 481 |
| **entrants** (best-named pick + newest-commit pick per repo, plus compile fallbacks) | **92** (JS 56, Java 23, Python 13) |

Picks: 49 entrants are both the best-named and the newest-commit bot of their repo, 16 only the best-named, 17 only the
newest. 8 come from repos whose only bots have junk names (`example_js`, `build`; teams that developed inside the
scaffold's example folder). 2 are compile fallbacks (the repo's next-best bot, added when both picks failed to compile).

## Security scan

`scan.py` counts risky patterns in every bot (839 scanned, 312 with any hit, mostly `http` in comments and URLs and
the TypeScript `__extends` helper).
Among entrants, hits that could matter were ruled out from the matching lines alone:

- `require(` in RyanSharafuddin, yujinwunz, dmunozc: test harness files and commented-out lines.
- `import(` in cemondr: a commented-out line. `global.` in jamesrayman: an alias for a log function.
- StoneT2000 bundles: `new Function(` / `require(` inside a bundled array library (code-generated loops).
- asunathanr `pathfinding`: a vendored RequireJS (`r.js`: `eval`, `fs.`, `XMLHttpRequest`) and a debug print of the
  `process.stdout` map.
- `this.constructor` / `constructor.constructor` in the JSweet bundles of IvanGeffner and rafekruse: the TypeScript
  `__extends` helper and JSweet's interface checks (`x.constructor.__interfaces`).
- Java `reflect`, `System.exit`, `java.nio.file`: JSweet has no JVM at run time, so these compile to nothing or fail.

All entrants then ran inside the engine's vm2 sandbox in a process with no network and a read-only file system
(`tools/galaxy19/sandbox.sh`). Java and Python compiled inside `tools/compile_sandbox.sh`, which uses no network and
a chroot holding only the toolchain and a temporary directory.

## Compile

`tools/compile_bot.js` produces the bundle format of the engine's own compiler:

- JS: engine rollup.
- Java: JSweet 2.0.0-SNAPSHOT + TS 2.1.6 on JDK 8, the jars of the official service.
- Python: Transcrypt 3.7.13 on CPython 3.6.15, the official service's flags.

The engine's Java/Python paths POST source to battlecode.org; they are disabled in `compile_bot.js`. JS bots that the
engine 0.4.7 compiler refuses fall back to a lenient resolver. It finds modules in subdirectories, imports without
`.js`, and imports relative to the bot folder's parent (`mode=lenient` in `compile.tsv`): awesomelemonade,
mvpatel2000, bovard. Bundles that teams committed (`kind=bundle`) are copied as they are.

89 of 92 compile. The three failures stay in the roster as `fail`:

- TheRobotCarlson `ref-bot` imports `./nav.js.js`. This is a typo in the bot, and the official tool would fail too.
- VictorButoi `currentBot`: javac syntax error at `MyRobot.java:222`. `bot_v1` from the same repo entered instead.
- evanyeyeye `qualifiers`: syntax that rollup 1.32 cannot parse. `seeding` entered instead.

## Smoke test and health

`smoke.sh` plays each bundle twice against the starter bot `bots/example` on battlecode-dev: seed 1 as red and seed
2 as blue. The games run one at a time under `~/.bc-extra.lock` with the contest clock (100 ms + 20 ms/turn). Each
row logs the VM's 1-minute load average before and after the game.

The run was stopped on 2026-10-21 at 23:39 UTC, after 15 bots and 27 games. By then the owner had changed the plan.
Bots now enter the replica a few at a time: a cron job runs `tools/galaxy19/field.py seed --next 6` every 20
minutes, smoke-tested bots first. The replica's ladder games are the smoke test of the rest. The smoke run had held
the shared lock without a break, which kept the main session's games waiting. It also kept the VM's load near 10 on
8 vCPUs.

Every smoke game that logged its load ran at 8.3 to 10.4; the 7 earliest games logged none. Under that much
contention, large transpiled bundles miss vm2's 200 ms load budget, so a problem seen only in such a game is
marked `inconclusive`, not broken:

- No init failure, exception or timeout in any game (`ok`): CometsTech `example_js`, DivyanshuSaxena, IanCoolidge0
  `quals`, IvanGeffner `bot6b`, JasonLarson44.
- `inconclusive`:
  - init failures: IvanGeffner `eigthbot` (its blue game hit the 1200 s game time limit), NielsKornerup,
    Nischay-Pro (both games end at init), Nydroam, ArtemUstilov;
  - exceptions: IanCoolidge0 `quals2`, CometsTech dev;
  - script timeouts or clock-frozen turns: 18dcb01 (both bots), CometsTech dev, CS554.
- Entrants won 20 of the 26 finished games against the starter.

`replica_health.py` reads every finished replica match that involves an entrant and sums the per-team stats
(`init_fail`, `exceptions`, `timeouts` + clock-frozen turns) from the archive's `match.json`. Galaxy shows a match's
archive only to the two teams that played it, so the script reads each match as one of them, using the field's
replica accounts. It reads no replays. At 23:45 UTC three entrants had finished replica games:

- ArtemUstilov `bc19_CrazyTapok`: an init failure in all 90 of its games, and 0 wins. It also failed at init in both
  smoke games, so it is the one entrant that looks broken whatever the load.
- CS554 `battlecodeProject`: 128 wins in 198 games; init failures in 49 of them.
- CometsTech `battlecode2019-dev` (on the replica as team `CometsTech.battlecode2019`, same bundle digest): 85 wins
  in 159 games; init failures in 43 of them.

Replica games share the VM as well, with up to 4 at a time beside the A/B batches. Their init failures and timeouts
carry the same load caveat.

The roster's `health` column is computed in this order:

1. `ok` if the smoke games were clean.
2. Otherwise, if the entrant has replica games: `ok (replica)` or `errors (replica)`.
3. Otherwise, the smoke verdict (`inconclusive`).
4. `untested` if neither has run, and `compile fail` for the three failures.

Column meanings in the table: `init`, robots that failed initialisation (vm2 load or constructor over the budget);
`exc`, errors in the smoke errlog sample (first 200 per game) that are not refusals of illegal actions, or every
thrown exception on the replica; `timeouts`, script timeouts plus clock-frozen turns.

## Known false positives and caveats

- The 399 repos with 2019 API names but no bot hit the names of trading, Monopoly and agent code (`proposeTrade`,
  `castleTalk` and others). Others are Battlecode 2020 monorepo forks (backend plus a docs page quoting the 2019
  API), viewers (Clairvoyance, tinyview, BC19-Seeds-Catalog) and starter kits.
- Excluded by hand (`tools/bench/field-exclude.txt`):
  - our own repo;
  - a saved battlecode.org dashboard script;
  - the 2020 website's `docs.js` (by sha256, which removes 22 copies);
  - Metta-AI's 2026 RL-environment oracle and idle bots;
  - djkeyes' engine-bug probe, no-op and C++ experiments.
- Several junk-name fallbacks (SethKitchen, nhard, liwanlin41, yunaganyh `examplefuncsplayer` / `exampy`; CometsTech
  `example_js`) are probably lightly edited starters. They stay because they cost almost nothing.
- Some `not-2019` repos were deleted from disk before their bot files could be rechecked under the relaxed 2019 rule
  (`BCAbstractRobot` alone now counts). Their path lists show only non-JS/Java/Python starters (rust, C++) and
  unrelated years.
- Picks use names and dates only: a team's strongest bot may sit under a name that `roster.py` ranks lower. Both the
  name pick and the newest-commit pick are kept.
- The smoke test plays against the starter bot only. It shows that a bundle runs, not how strong it is.

## Roster

`tools/bench/roster.tsv` holds the full columns (path, last commit, load, replica totals). Bundles are in
`~/projects/vibe/bc19-benchmarks/compiled/<name>/bot.js` on the driver and on battlecode-dev; they are not in git.
This is a snapshot as of 2026-10-21 23:45 UTC: 74 entrants were still `untested` and are waiting for the trickle to
reach them. To refresh it, run `python3 -I tools/bench/replica_health.py` on the VM, copy `replica-health.tsv` to the
driver, then run `python3 -I tools/bench/report.py --md BENCHMARK.md`.

<!-- roster:begin -->
| # | name | repo @ commit | lang | kind | compile | smoke (wins/games) | smoke init/exc/timeouts | replica wins/games | replica init/exc/timeouts | health | note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 18dcb01.Battlecode19-preacherRushSomeEconomy | 18dcb01/Battlecode19 @ b43cf22 | py | dir | ok | inconclusive 2/2 | 0/1/1 | - |  | inconclusive | script timeout |
| 2 | 18dcb01.Battlecode19-robot2 | 18dcb01/Battlecode19 @ b43cf22 | py | dir | ok | inconclusive 1/1 | 0/0/4 | - |  | inconclusive |  |
| 3 | ArtemUstilov.bc19_CrazyTapok | ArtemUstilov/bc19_CrazyTapok @ 0346c25 | js | dir | ok | inconclusive 0/2 | 5/0/0 | 0/90 | 178/0/0 | errors (replica) | replica: init failures in 90/90 games |
| 4 | CS554-software-engineering-groupProject.battlecodeProject | CS554-software-engineering-groupProject/battlecodeProject @ 8f06bf5 | js | dir | ok | inconclusive 2/2 | 0/1/1 | 128/198 | 62506/67751/5821 | errors (replica) | replica: init failures in 49/198 games; script timeout |
| 5 | CometsTech.battlecode2019-dev | CometsTech/battlecode2019 @ b77bffb | js | dir | ok | inconclusive 1/1 | 0/37/12 | 85/159 | 22963/127103/15017 | errors (replica) | replica: init failures in 43/159 games; other bot errors |
| 6 | CometsTech.battlecode2019-example_js | CometsTech/battlecode2019 @ b77bffb | js | dir | ok | ok 2/2 | 0/0/0 | - |  | ok |  |
| 7 | DivyanshuSaxena.Battlecode | DivyanshuSaxena/Battlecode @ 4e0d621 | java | dir | ok | ok 1/2 | 0/0/0 | - |  | ok |  |
| 8 | IanCoolidge0.battlecode2019-quals | IanCoolidge0/battlecode2019 @ 0ca97ef | js | dir | ok | ok 2/2 | 0/0/0 | - |  | ok |  |
| 9 | IanCoolidge0.battlecode2019-quals2 | IanCoolidge0/battlecode2019 @ 0ca97ef | js | dir | ok | inconclusive 2/2 | 0/225/0 | - |  | inconclusive | ReferenceError |
| 10 | IvanGeffner.BC19-bot6b | IvanGeffner/BC19 @ 8bac1fc | js | bundle | ok | ok 2/2 | 0/0/0 | - |  | ok |  |
| 11 | IvanGeffner.BC19-eigthbot | IvanGeffner/BC19 @ 8bac1fc | java | dir | ok | inconclusive 0/2 | 6110/100/0 | - |  | inconclusive | no result: killed at the 1200 s game time limit (inferred: no stderr, exit status not reco |
| 12 | JasonLarson44.2019-Battlecode-Bot | JasonLarson44/2019-Battlecode-Bot @ 6c649ea | js | dir | ok | ok 2/2 | 0/0/0 | - |  | ok |  |
| 13 | NielsKornerup.Battlecode-2019 | NielsKornerup/Battlecode-2019 @ 319a9e0 | java | dir | ok | inconclusive 2/2 | 9112/193/0 | - |  | inconclusive | robot.hook is not a function (engine, after an init failure) |
| 14 | Nischay-Pro.BattleCode2019 | Nischay-Pro/BattleCode2019 @ 92193da | py | dir | ok | inconclusive 0/2 | 5/0/0 | - |  | inconclusive |  |
| 15 | Nydroam.BatteredCod | Nydroam/BatteredCod @ 0a7cad7 | java | dir | ok | inconclusive 1/1 | 641/100/0 | - |  | inconclusive | robot.hook is not a function (engine, after an init failure) |
| 16 | OmarTahoun.battle-code | OmarTahoun/battle-code @ 2d76b9c | py | dir | ok | - |  | - |  | untested |  |
| 17 | RyanSharafuddin.Battlecode_2019 | RyanSharafuddin/Battlecode_2019 @ c56241b | js | dir | ok | - |  | - |  | untested |  |
| 18 | SethKitchen.examplefuncsplayer | SethKitchen/examplefuncsplayer @ 5841c18 | js | dir | ok | - |  | - |  | untested |  |
| 19 | Sisyphus192.battlecode19 | Sisyphus192/battlecode19 @ 66cfa64 | js | dir | ok | - |  | - |  | untested |  |
| 20 | StoneT2000.BC19-bot1v43 | StoneT2000/BC19 @ 4ee84cb | js | bundle | ok | - |  | - |  | untested |  |
| 21 | StoneT2000.BC19-botfinalsafe | StoneT2000/BC19 @ 4ee84cb | js | bundle | ok | - |  | - |  | untested |  |
| 22 | TestSubjector.BattleCode2019-12.FightingBot_Prophet | TestSubjector/BattleCode2019 @ 8237dbf | py | dir | ok | - |  | - |  | untested |  |
| 23 | TestSubjector.BattleCode2019-13.FightingBot2 | TestSubjector/BattleCode2019 @ 8237dbf | py | dir | ok | - |  | - |  | untested |  |
| 24 | TheRobotCarlson.battlehack-notes-ref-bot | TheRobotCarlson/battlehack-notes @ b64cd8e | js | dir | fail | - |  | - |  | compile fail | compile error: Error: Could not resolve './nav.js.js' from  virtual:/home/terryvanbelle/pr |
| 25 | TheRobotCarlson.battlehack-notes-robot-kelsey | TheRobotCarlson/battlehack-notes @ b64cd8e | js | file | ok | - |  | - |  | untested |  |
| 26 | Tom-CCS.BC19 | Tom-CCS/BC19 @ 4c5af4d | py | file | ok | - |  | - |  | untested |  |
| 27 | UpperArlingtonHighSchool.BattlecodeBoatMormons-seedingRobot | UpperArlingtonHighSchool/BattlecodeBoatMormons @ 8545f62 | java | dir | ok | - |  | - |  | untested |  |
| 28 | UpperArlingtonHighSchool.BattlecodeBoatMormons-zainsExperiments | UpperArlingtonHighSchool/BattlecodeBoatMormons @ 8545f62 | java | dir | ok | - |  | - |  | untested |  |
| 29 | VictorButoi.BattleCode2019-bot_v1 | VictorButoi/BattleCode2019 @ 5df68b7 | java | dir | ok | - |  | - |  | untested |  |
| 30 | VictorButoi.BattleCode2019-currentBot | VictorButoi/BattleCode2019 @ 5df68b7 | java | dir | fail | - |  | - |  | compile fail | Java compile failed: / ERROR: ')' expected at MyRobot.java(222) / 2026-10-21 22:28:53.053  |
| 31 | VoidMercy.battlecode-2019-bot | VoidMercy/battlecode-2019 @ d111ed2 | js | dir | ok | - |  | - |  | untested |  |
| 32 | VoidMercy.battlecode-2019-worker-strat | VoidMercy/battlecode-2019 @ d111ed2 | js | dir | ok | - |  | - |  | untested |  |
| 33 | abcdefguan.battlecode2019 | abcdefguan/battlecode2019 @ 3b70ef5 | js | dir | ok | - |  | - |  | untested |  |
| 34 | arya-k.bc19 | arya-k/bc19 @ 4bdbbc0 | js | dir | ok | - |  | - |  | untested |  |
| 35 | asunathanr.asu_bc | asunathanr/asu_bc @ 0dd4a5b | js | dir | ok | - |  | - |  | untested |  |
| 36 | awesomelemonade.Battlecode2019 | awesomelemonade/Battlecode2019 @ 50985dd | js | dir | ok | - |  | - |  | untested |  |
| 37 | bayoumi17m.BattleCode-2019 | bayoumi17m/BattleCode-2019 @ 6ba2c8d | py | dir | ok | - |  | - |  | untested |  |
| 38 | bovard.battlecode-2019-unit-tests | bovard/battlecode-2019-unit-tests @ 0840e2e | js | dir | ok | - |  | - |  | untested |  |
| 39 | bqi343.cp-notebook | bqi343/cp-notebook @ 292c614 | java | dir | ok | - |  | - |  | untested |  |
| 40 | cemondr.BC19pdxgroup4 | cemondr/BC19pdxgroup4 @ 519b220 | js | dir | ok | - |  | - |  | untested |  |
| 41 | cvxluo.battlecode19 | cvxluo/battlecode19 @ bb7f88b | js | dir | ok | - |  | - |  | untested |  |
| 42 | dgh2.bc19-t1 | dgh2/bc19-t1 @ 030850b | js | dir | ok | - |  | - |  | untested |  |
| 43 | djkeyes.bc19 | djkeyes/bc19 @ db1837d | js | dir | ok | - |  | - |  | untested |  |
| 44 | dmunozc.bc19-g8-bots | dmunozc/bc19-g8 @ 7ca29c4 | js | dir | ok | - |  | - |  | untested |  |
| 45 | dmunozc.bc19-g8-davjasdiv | dmunozc/bc19-g8 @ 7ca29c4 | js | bundle | ok | - |  | - |  | untested |  |
| 46 | dndoja.battlecode19 | dndoja/battlecode19 @ 2f4baf8 | js | dir | ok | - |  | - |  | untested |  |
| 47 | evanyeyeye.battlecode2019-qualifiers | evanyeyeye/battlecode2019 @ 90a7f90 | js | dir | fail | - |  | - |  | compile fail | compile error: Error: Unexpected token / lenient fallback: Unexpected token |
| 48 | evanyeyeye.battlecode2019-seeding | evanyeyeye/battlecode2019 @ 90a7f90 | js | dir | ok | - |  | - |  | untested |  |
| 49 | haydenshively.Battle-Code-2019-compiled | haydenshively/Battle-Code-2019 @ 986aeec | js | bundle | ok | - |  | - |  | untested |  |
| 50 | haydenshively.Battle-Code-2019-javascript | haydenshively/Battle-Code-2019 @ 986aeec | js | dir | ok | - |  | - |  | untested |  |
| 51 | howard36.Battlecode2019-eco6 | howard36/Battlecode2019 @ 25599cb | js | bundle | ok | - |  | - |  | untested |  |
| 52 | howard36.Battlecode2019-sprint | howard36/Battlecode2019 @ 25599cb | js | bundle | ok | - |  | - |  | untested |  |
| 53 | ipercyNC.group6-battlecode | ipercyNC/group6-battlecode @ 311b9ab | js | dir | ok | - |  | - |  | untested |  |
| 54 | j-mao.battlecode-2019 | j-mao/battlecode-2019 @ a13a641 | java | dir | ok | - |  | - |  | untested |  |
| 55 | jackliu612.Battlecode19 | jackliu612/Battlecode19 @ 9b2e52f | js | dir | ok | - |  | - |  | untested |  |
| 56 | jamesrayman.HCN-basic-bot | jamesrayman/HCN @ a69558c | js | dir | ok | - |  | - |  | untested |  |
| 57 | jamesrayman.HCN-bot | jamesrayman/HCN @ a69558c | js | bundle | ok | - |  | - |  | untested |  |
| 58 | jbiewend.Battlecode2019 | jbiewend/Battlecode2019 @ 967fd48 | py | dir | ok | - |  | - |  | untested |  |
| 59 | jshin313.battlecodebot | jshin313/battlecodebot @ a9ba53d | java | dir | ok | - |  | - |  | untested |  |
| 60 | jyurkanin.corn_bc19 | jyurkanin/corn_bc19 @ 25efd36 | java | dir | ok | - |  | - |  | untested |  |
| 61 | ldcWV.Battlecode-2019 | ldcWV/Battlecode-2019 @ f473793 | java | dir | ok | - |  | - |  | untested |  |
| 62 | liwanlin41.examplefuncsplayer | liwanlin41/examplefuncsplayer @ 3fd15d9 | py | dir | ok | - |  | - |  | untested |  |
| 63 | lschaberg.bc19 | lschaberg/bc19 @ c2ee670 | java | dir | ok | - |  | - |  | untested |  |
| 64 | m-schier.battlecode-2019-wololo | m-schier/battlecode-2019-wololo @ ebdd279 | js | dir | ok | - |  | - |  | untested |  |
| 65 | m4reko.bc2019-tmores-angels | m4reko/bc2019-tmores-angels @ d8a2e03 | js | dir | ok | - |  | - |  | untested |  |
| 66 | moreda-a.BC2019-a31 | moreda-a/BC2019 @ a440b94 | java | dir | ok | - |  | - |  | untested |  |
| 67 | moreda-a.BC2019-t15 | moreda-a/BC2019 @ a440b94 | java | dir | ok | - |  | - |  | untested |  |
| 68 | mvpatel2000.Battlecode2019 | mvpatel2000/Battlecode2019 @ 039f954 | js | dir | ok | - |  | - |  | untested |  |
| 69 | nhard.examplefuncsplayer | nhard/examplefuncsplayer @ fe952a7 | js | dir | ok | - |  | - |  | untested |  |
| 70 | nthistle.battlecode-2019 | nthistle/battlecode-2019 @ 8833b75 | java | dir | ok | - |  | - |  | untested |  |
| 71 | ovkulkarni.battlecode2019-20190127_quals | ovkulkarni/battlecode2019 @ 31fa6ea | js | bundle | ok | - |  | - |  | untested |  |
| 72 | ovkulkarni.battlecode2019-20190129_HS | ovkulkarni/battlecode2019 @ 31fa6ea | js | bundle | ok | - |  | - |  | untested |  |
| 73 | programjames.BC19Bot-root | programjames/BC19Bot @ d6ec594 | js | dir | ok | - |  | - |  | untested |  |
| 74 | programjames.BC19Bot-seeding | programjames/BC19Bot @ d6ec594 | js | dir | ok | - |  | - |  | untested |  |
| 75 | rafekruse.Battlecode-2019-Finals_v1 | rafekruse/Battlecode-2019 @ 65ea2cf | js | bundle | ok | - |  | - |  | untested |  |
| 76 | rafekruse.Battlecode-2019-bc19 | rafekruse/Battlecode-2019 @ 65ea2cf | java | dir | ok | - |  | - |  | untested |  |
| 77 | rooneyshuman.Battlecode | rooneyshuman/Battlecode @ a9df8b7 | js | dir | ok | - |  | - |  | untested |  |
| 78 | roy-love.onshoreBattleCode2019 | roy-love/onshoreBattleCode2019 @ 775ca76 | py | dir | ok | - |  | - |  | untested |  |
| 79 | ryanhzhao.Battlecode-2019 | ryanhzhao/Battlecode-2019 @ a0b8c7c | java | dir | ok | - |  | - |  | untested |  |
| 80 | spachava753.bc19 | spachava753/bc19 @ 7074f01 | java | dir | ok | - |  | - |  | untested |  |
| 81 | sunanth123.battlecode19-mainbot | sunanth123/battlecode19 @ 7ea15d5 | js | dir | ok | - |  | - |  | untested |  |
| 82 | sunanth123.battlecode19-prorush | sunanth123/battlecode19 @ 7ea15d5 | js | dir | ok | - |  | - |  | untested |  |
| 83 | twitu.bc19-tsp | twitu/bc19-tsp @ 1712e50 | java | dir | ok | - |  | - |  | untested |  |
| 84 | unrevre.battlecode | unrevre/battlecode @ 4bf3c3b | js | dir | ok | - |  | - |  | untested |  |
| 85 | uvafan.bc2019 | uvafan/bc2019 @ f86a904 | js | dir | ok | - |  | - |  | untested |  |
| 86 | vicennial.BattleCode19 | vicennial/BattleCode19 @ 978272d | js | dir | ok | - |  | - |  | untested |  |
| 87 | vineetparikh.BigRedBattlecode2019 | vineetparikh/BigRedBattlecode2019 @ c1bd7d6 | java | dir | ok | - |  | - |  | untested |  |
| 88 | virenvshah.Battlecode2019 | virenvshah/Battlecode2019 @ 2b0f4bf | java | dir | ok | - |  | - |  | untested |  |
| 89 | vishwasns99.BC_2019 | vishwasns99/BC_2019 @ f9a33f6 | py | dir | ok | - |  | - |  | untested |  |
| 90 | waylon531.scala_starter | waylon531/scala_starter @ 97656be | js | dir | ok | - |  | - |  | untested |  |
| 91 | yujinwunz.battlecode_2019 | yujinwunz/battlecode_2019 @ e3f68b6 | js | dir | ok | - |  | - |  | untested |  |
| 92 | yunaganyh.bc19 | yunaganyh/bc19 @ ed2e3ea | py | dir | ok | - |  | - |  | untested |  |
<!-- roster:end -->
