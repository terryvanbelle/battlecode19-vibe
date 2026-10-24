# tools/galaxy19: the private Battlecode 2019 contest site

The bc19 replica is a private copy of the official judging site, galaxy (the siarnaq backend plus its frontend), with a
local stand-in for saturn, the game runner. It runs on the VM `battlecode-dev` and plays only our engine
(`engine/`, bc19 0.4.7). It is built on the 2023 replica (`/opt/bc23-galaxy`: siarnaq at galaxy commit f343088, its
venv, the built frontend, and the shared Caddy). How the owner opens it is in `ACCESS.md` at the repository root.

## Isolation (CLAUDE.md rules 5 and 6)

- **No Google Cloud and no battlecode.org.** siarnaq runs unmodified, but `standins/google` and `replica_gcp`
  replace Pub/Sub, Cloud Tasks, Cloud Scheduler, Secret Manager, GCS and OIDC tokens with local files (spool
  directories, storage under `/srv/bc19-galaxy/storage`, HMAC tokens). Email, OAuth and Sentry are off. The tests in
  `test/galaxy19/` check that no stand-in opens a socket or names an outside host.
- **Egress.** The `bc19replica` user can reach only 127.0.0.1:8019 (nftables table `inet bc19_replica_egress`).
  The cloud metadata server is dropped. Host-wide, table `inet bc19_official_block` rejects the addresses of
  battlecode.org, api/play/releases.battlecode.org for every user, and the units carry `IPAddressDeny`.
- **Frontend.** This is a copy of the 2023 replica's same-origin build, patched for episode `bc19`, so it never
  calls api.battlecode.org. `frontend_check.py` audits each install (`/etc/bc19-galaxy/frontend-check.txt`): no
  fetch goes to another host, and battlecode.org appears only as hyperlinks.
- **Bot code.** Each compile and game command runs under `sandbox.sh`, which uses `unshare -rn` for no network and a
  read-only view of everything but the work directory. saturn's unit also has `PrivateNetwork=yes`. Submissions are
  JavaScript: a `robot.js` directory or a single bundle. Java and Python are transpiled beforehand on the driver
  with `tools/compile_bot.js` / `compile19.js`; the stock bc19 compiler (which posts to battlecode.org) is never
  used.

## Parts

| file | role |
|---|---|
| `saturn.py` | saturn stand-in: leases compile/execute messages from the spool, with 1 compile slot and 6 execute slots (`GALAXY_EXECUTE_SLOTS`; hard cap 6; 2 until 2026-10-22 07:30, 4 until 10:00 PDT, 5 until 20:57 PDT: with the session's gates at par 2, 8 games on the VM's 8 vCPUs), a wall limit per game of `GALAXY_GAME_TIMEOUT` 10800 s (1800 s until 2026-10-22 07:30 PDT: IvanGeffner's and Nydroam's games ran over it and retried 6 times; 5400 s until 12:50 PDT: wololo's 64x64 game in match 403 ran over it twice), each game's V8 heap capped at 3 GB (`GALAXY_GAME_HEAP_MB`; 2 GB until 2026-10-22 23:30 PDT, when big-map games of two full armies sat at 1.9-2.0 GB: match 227 died "Ineffective mark-compacts near heap limit" and 404 segfaulted, both in game 2, and a game near the cap spends its robots' turns in full GCs that the chess clock charges to them; the unit's MemoryMax went 14G -> 22G) and its young generation raised to a 64 MB semi-space (`GALAXY_GAME_SEMI_MB`, since 2026-10-22 20:57 PDT: about 8% less CPU per game; GC inside a turn is charged to that robot, so this only takes noise off the clock). For each match it runs one game per map, alternating sides; a game an earlier attempt of the same message finished is kept in `$GALAXY_HOME/saturn/resume/<key>` (removed when the message is acked, or after 3 days) and not replayed, so a crash or a restart costs only the games in progress (since 2026-10-22 23:30 PDT; the restarts at 18:46, 20:00 and 20:57 PDT that day had re-run 15 matches in flight from their first game). It writes a match archive (ZIP of `game-NN-seed<n>.bc19` plus `match.json` with per-team timeouts, frozen, slow turns, ms, robots whose sandbox failed to start and the five commonest error kinds). It reports to galaxy through the relay. |
| `relay.py` | relay between saturn and siarnaq, plus the Cloud Tasks / Scheduler stand-in (`fire-jobs`, run each minute by `bc19-galaxy-scheduler.timer`). Replica-only throttle: a due autoscrim is held while `GALAXY_SCHED_MAX_WAITING` (30) matches or more wait in the execute queue, or until `GALAXY_SCHED_MIN_HOURS` (24) have passed since it last fired. |
| `bootstrap.py` | episode `bc19` (autoscrim `0 */8 * * *` UTC, ranked on, 20 ranked / 40 unranked requests per hour), the 40 maps of `maps.txt`, and the `owner` superuser. |
| `maps.py`, `maps.txt` | maps are `seed-<n>`: 40 seeds stratified by size, castle count and symmetry from `maps/corpus.tsv`. |
| `rating_unstick.py` | finalizes rating chains stalled behind matches that never triggered a rating update (run through `bc19-galaxy-manage shell`; its header). Ratings, and the team rating history graphs, move only on ranked matches: the autoscrim (at most daily, held while 30+ wait) and the field's ranked challenges (`activity`); our panel and field scrims are unranked. |
| `client.py` | API client library and CLI (accounts in `~/.bc19-galaxy/accounts.json`, site in `~/.bc19-galaxy/site`). |
| `contest19.py` | our team's commands, below. |
| `field.py` | the field: registers and submits the starter bot (`bc19-starter`, `bots/example`) and every compiled external bundle, idempotently. Its `activity` mode is `bc19-galaxy-activity.service`. |
| `viewer/` | the `/viewer/` page. `build_official.js` assembles the official 2019 visualizer (battlecode19 `app/src/views/visualizer.js`, GPL-3.0) with its images and pixi.js 4.8.9, all pinned in `PINS.json`. `build_engine.js` builds `engine19.js` from the pinned engine. |
| `deploy/deploy.sh`, `deploy/galaxy-setup.sh` | deployment from the driver (idempotent; per-step). |

## Operating it

```
tools/galaxy19/deploy/deploy.sh                 # full (re)deploy; deploy.sh status | app | viewer | frontend | start | stop
tools/galaxy19/deploy/deploy.sh scheduler on    # automatic ranked rounds (autoscrim, at most daily, held while 30+ wait) + task firing
tools/galaxy19/deploy/deploy.sh activity on     # spare-cycle challenges between field teams

python3 tools/galaxy19/contest19.py register     # team vibe19 (credentials in ~/.bc19-galaxy-team, 600)
python3 tools/galaxy19/contest19.py submit [DIR] # bundle src/bot (or DIR) with tools/compile_bot.js, upload, wait
python3 tools/galaxy19/contest19.py ladder
python3 tools/galaxy19/contest19.py scrim --n 4  # ranked vs the teams just above, unranked vs those just below
python3 tools/galaxy19/contest19.py matches
python3 tools/galaxy19/contest19.py fetch --new  # match archives -> ~/projects/vibe/bc19-galaxy-replays/<id>/
python3 tools/galaxy19/contest19.py results

# our matches first (the field's matches against each other get the spare cycles): from the driver, owner-approved
# for unattended use (PROMPTS 27); it runs the next line on the VM, digit ids or vibe19 only, never --drop
tools/bump_ours.sh [--dry-run] (--ours | 616 617 ...)
# on the VM, as root
sudo python3 -I tools/galaxy19/spool_bump.py --match 199,200 [--team vibe19] [--dry-run]

# dropping a team from the ladder (a bot whose games hold the slots): its waiting matches go to dead/, are marked
# CAN (cancelled) in siarnaq, and the team becomes inactive (status X: no autoscrim, no ranking)
sudo python3 -I /opt/bc19-galaxy/galaxy19/spool_bump.py --team NAME --drop
sudo bc19-galaxy-manage shell -c 'from siarnaq.api.compete.models import Match; from siarnaq.api.teams.models import Team
Match.objects.filter(pk__in=[IDS], status="QUE").update(status="CAN")
t = Team.objects.get(name="NAME"); t.status = "X"; t.save(update_fields=["status"])'
# ...then, from the driver, finalize the rating chains the cancelled matches hold (a bulk .update() skips siarnaq's
# rating trigger: on 2026-10-24 three such matches had stalled 716 of 1,554 ratings and the history graphs for a day)
gssh 'sudo bc19-galaxy-manage shell' < tools/galaxy19/rating_unstick.py   # dry run: prefix stdin with DRY = True

# field (on the VM, where the bundles are rsynced; re-runnable)
GALAXY19_CONNECT=127.0.0.1 GALAXY19_REPO=~/projects/vibe/2019 python3 ~/bc19-galaxy-stage/tools/galaxy19/field.py seed
```

The field roster is `tools/bench/roster.tsv` (compile ok, smoke test not a crash). If that file is missing,
`$BENCH_ROOT/compile.tsv` is used, and bundles come from `$BENCH_ROOT/compiled/<name>/bot.js`.
`field.py` only zips a bundle and never reads it.

Game clock: the 2019 rules (100 ms bank plus 20 ms per turn). Load test on 2026-10-21: 60 games at 4 concurrent
games on the 8-vCPU VM, 637k robot turns, 0 timeouts, 0 frozen robots, 0.07% of turns over 20 ms, slowest turn
55 ms. The replica then ran 2 games at once, because the main session's A/B batches (`--par 4`) share the VM;
4 from 2026-10-22 07:30 PDT with the batches at `--par 2` (owner, PROMPTS 18), 5 once the extra lane paused. On 2026-10-21 the VM hung (load about 21) while the replica's 4 games ran alongside those batches and the
bench smoke runner (`PAR=6`); it was reset. Keep the VM's total game count at or below its 8 vCPUs.

One deliberate deviation: a robot gets 1000 ms of wall clock to create its sandbox (`GALAXY_INIT_MS`, passed as
`run_game.js --init-ms`) instead of the 100 ms bank. Sharing the VM with the batches (load about 10 on 8 vCPUs),
11 of the 14 field entrants that had played lost robots to init failures (2026-10-21), a machine effect that the
official servers did not impose. The same 1000 ms bounds vm2's run of the bundle during creation (run_game.js
loadLimit; the engine runs it under the 200 ms per-turn kill, which cost StoneT2000 16 robots in match 306 once 5
slots ran, 2026-10-22). The robot's clock still starts at 100 ms and gains 20 ms a turn; its turns keep the 200 ms
kill. Since 2026-10-23 01:46 UTC saturn also passes `run_game.js --fast-init` (`GALAXY_FAST_INIT`, default 1): each
bundle is compiled once per game instead of once per robot, which leaves every clock rule as it was (creation is
bounded by the 1000 ms above, not by the robot's clock) and saves the VM about 75 ms of CPU per robot under load
(a 300-round self-play game: 252 s -> 212 s, the same replay byte for byte).
Since 2026-10-23 03:00 UTC it passes `--fast-view` too (`GALAXY_FAST_VIEW`, default 1): the view queries and the
turn message (fastDump) are computed without the engine's per-call copies, and the message is written as the engine
writes it, byte for byte. The engine builds that message before the robot's clock starts (game.js enactTurn), so no
clock changes (the same game, measured with `--no-kill`, which saturn does not pass: 129 s -> 82 s).
Since 2026-10-23 03:57 UTC `--fast-view` also skips the engine's between-turn game-over scan of every robot while
each team keeps a live castle (fastOver: the engine's own answer, unit-tested; about 5% of a game's CPU). It runs
between turns, off every robot's clock.

## Deploying a change to saturn or the runtime

`deploy.sh app`, `runtime`, `env`, `units` swap files under the running services; saturn picks them up only on
`sudo systemctl restart bc19-galaxy-saturn`, which re-runs the matches in flight (their messages return to ready/)
from their first unfinished game (the finished ones wait in `$GALAXY_HOME/saturn/resume`).
Before the restart, play one short game under the unit's own restrictions (LEARNINGS 21: the operator's shell and
`unshare -rn` allow netlink, the unit does not), with a bundle compiled by the runtime's compile19.js:

```
G=$(sudo -u bc19replica mktemp -d -p /home/bc19replica/galaxy/run)   # holds bundle.js (owner bc19replica)
sudo systemd-run --quiet --wait --pipe -p User=bc19replica -p Slice=bc19-replica.slice \
  -p "RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6" -p PrivateNetwork=yes -p NoNewPrivileges=yes \
  -p ProtectSystem=strict -p ProtectHome=read-only -p ReadWritePaths=/home/bc19replica/galaxy -p PrivateTmp=yes \
  /usr/bin/env -i PATH=/usr/bin:/bin LANG=C.UTF-8 HOME=/nonexistent /bin/sh /opt/bc19-galaxy/galaxy19/sandbox.sh $G \
  /opt/bc19-galaxy/runtime/bin/node /opt/bc19-galaxy/runtime/tools/run_game.js --red $G/bundle.js --blue $G/bundle.js \
  --seed 5 --max-rounds 5 --replay $G/r.bc19 --json $G/o.json --init-ms 1000
```

After the restart, watch the first minute of `journalctl -u bc19-galaxy-saturn` for nacks; stop saturn at once if
games fail (a failed match goes to TRY and retries; nothing is lost but attempts).

## Units on battlecode-dev

`bc19-galaxy-web` (gunicorn, 127.0.0.1:8019), `bc19-galaxy-relay`, `bc19-galaxy-saturn`, `bc19-galaxy-egress`,
`postgresql@15-bc19` (port 5419, database `siarnaq19`), `bc19-galaxy-scheduler.timer`, `bc19-galaxy-activity`.
The site is served by the shared `bc23-replica-caddy.service` (drop-in `/etc/caddy/bc19-galaxy.caddy`, basic-auth
gate, CSP). Files: `/opt/bc19-galaxy` (code, runtime) and `/srv/bc19-galaxy` (frontend, viewer, static, storage).
Configuration is in `/etc/bc19-galaxy`.
