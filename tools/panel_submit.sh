#!/bin/bash
# Play one replica panel block for a candidate build, then restore the ladder build (TRAINING_ALGORITHM step 7).
#   tools/panel_submit.sh DIST_DIR "message" [BOT,BOT,...]
# Submits DIST_DIR, requests the panel scrims against BOTS (default: the v7-m1 panel's six), resubmits bots/v7 and
# bumps our queue (tools/bump_ours.sh --ours). Scrims the replica refuses (its hourly limit, HTTP 429) are requested
# again every 15 minutes, with the candidate resubmitted first, until all are in. Prints the scrim lines.
set -uo pipefail
cd "$(dirname "$0")/.."
dist=$1; msg=$2
todo=${3:-m-schier.battlecode-2019-wololo,StoneT2000.BC19-botfinalsafe,StoneT2000.BC19-bot1v43,uvafan.bc2019,awesomelemonade.Battlecode2019,IanCoolidge0.battlecode20~69ce88}
C=tools/galaxy19/contest19.py
# One block at a time: a scrim plays the submission current when it was requested, so two runs must not interleave.
exec 9>"${TMPDIR:-/tmp}/panel_submit.lock"; flock 9
while [ -n "$todo" ]; do
  python3 -I $C submit "$dist" -m "$msg" | tail -1
  out=$(python3 -I $C scrim --vs "$todo" --panel progress/panels/v7-m1.json 2>&1); echo "$out"
  python3 -I $C submit bots/v7 -m "v7 ladder build" | tail -1
  tools/bump_ours.sh --ours > /dev/null
  todo=$(echo "$out" | sed -n 's/^refused: vs \([^:]*\):.*/\1/p' | paste -sd, -)
  [ -n "$todo" ] && { echo "refused, again in 15 min: $todo"; sleep 900; }
done
