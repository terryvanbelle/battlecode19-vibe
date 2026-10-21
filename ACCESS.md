# ACCESS.md: how to look at the 2019 scrimmage ladder

Our 2019 practice contest runs on a private copy of the Battlecode website on our VM `battlecode-dev`. It uses
galaxy's own frontend and backend, the same pages as play.battlecode.org, with games played by our local bc19 engine.
Nothing there touches the real Battlecode servers: they are blocked from the VM.

## Open the site

1. Go to **https://galaxy19.136-86-167-127.sslip.io/**
2. The browser first asks for the site password, a gate in front of everything. The user is **`owner`**; get the
   password in this Claude Code session with `! cat ~/.bc19-replica-password`. It is not in this repository.
3. Then log in on galaxy's own login page (Log In, top right) as user **`owner`** with the same password. `owner` is
   the site's superuser: it sees every team, match and replay, plus `/admin/` (Django admin; read there, change
   nothing).

## Watch our games (replays)

Galaxy shows Replay buttons only on a team's own pages, so watch as our team:

1. Log out of `owner` if needed, then Log In as **`vibe19`**. Get the password with `! sed -n 2p ~/.bc19-galaxy-team`.
2. Open **Scrimmaging** in the left sidebar. Its history lists our matches, newest first. Press **Replay** on a
   match to open the official Battlecode 2019 viewer on it. The page lists every game of the match (map, sides,
   winner, rounds); **Watch** plays one, and you can download the whole match or single `.bc19` files.
3. On the driver, `python3 tools/galaxy19/contest19.py fetch --new` downloads every new match of ours to
   `~/projects/vibe/bc19-galaxy-replays/<match id>/`.

## What is there (episode bc19)

- **Rankings**: every team and its rating (galaxy's penalized Elo; new teams climb over their first ranked matches).
  Our team is **vibe19**. **bc19-starter** is the official starter bot (`bots/example`). The other teams are public
  2019 bots compiled locally, named `<github owner>.<repository>`.
- **Queue**: every match, with status, score and rating change.
- Team pages, **Scrimmaging**, **Submissions** and **My Team**: as on the real site.

Every 8 hours (00:00, 08:00 and 16:00 UTC) galaxy's automatic round gives every team ranked best-of-3 matches on
random maps. In between, our team requests scrimmages (`contest19.py scrim`), and field teams challenge the teams
rated near them when the VM has spare time. At most 4 games run at once.

## If the address stops working

The host name is built from the VM's external IP, which changes if the VM is stopped and started. Re-running
`tools/galaxy19/deploy/deploy.sh` moves the site to the new name and writes it to `~/.bc19-galaxy/site`. If the
address is stale, ask me.
Operator details are in `tools/galaxy19/README.md`.
