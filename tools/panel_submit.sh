#!/bin/bash
# Play one replica panel block for a candidate build, then restore the ladder build ($LADDER, default bots/v12; TRAINING_ALGORITHM step 7).
#   tools/panel_submit.sh DIST_DIR "message" [BOT,BOT,...]
# Submits DIST_DIR, requests the panel scrims against BOTS (default: every opponent the PANEL file names, each twice:
# NAME@+ with us red in all three games and NAME@- blue, so a block plays every cell on both sides, 6 games an
# opponent; SIDES=mixed requests each once with galaxy's random alternating order, the 18-game blocks up to match
# 972), resubmits $LADDER and bumps our queue (tools/bump_ours.sh --ours). PANEL (default progress/panels/v7-m1.json)
# names the block's opponents and each one's maps (scrim --panel records a draw for an opponent missing from the file,
# so no other scrim uses a panel file); a targeted panel (TRAINING_ALGORITHM §4: a map-conditional switch) names
# another file. Scrims the replica refuses (its
# hourly limit, HTTP 429) are requested again every 15 minutes, with the candidate resubmitted first, until all are in.
# Prints the scrim lines and the two submissions, labelled ("candidate submission N", "ladder submission M":
# record the candidate's number, not the last line's). After a control block (DIST_DIR = $LADDER) on the default
# panel, tools/rate_ours.sh asks RATE_N (6) field teams for ranked matches against the new ladder build.
set -uo pipefail
cd "$(dirname "$0")/.."
dist=$1; msg=$2
PANEL=${PANEL:-progress/panels/v7-m1.json}
bots=$(python3 -I -c 'import json, sys; print(",".join(json.load(open(sys.argv[1]))))' "$PANEL")
todo=${3:-$bots}
[ -n "$todo" ] || { echo "no opponents in $PANEL" >&2; exit 2; }
if [ -z "${3:-}" ] && [ "${SIDES:-both}" = both ]; then todo=$(echo "$todo" | tr , '\n' | sed 's/.*/&@+,&@-/' | paste -sd, -); fi
C=tools/galaxy19/contest19.py
LADDER=${LADDER:-bots/v12}   # the champion, resubmitted as our ladder build after each block
# One block at a time: a scrim plays the submission current when it was requested, so two runs must not interleave.
exec 9>"${TMPDIR:-/tmp}/panel_submit.lock"; flock 9
while [ -n "$todo" ]; do
  python3 -I $C submit "$dist" -m "$msg" | tail -1 | sed 's/^/candidate /'
  out=$(python3 -I $C scrim --vs "$todo" --panel "$PANEL" 2>&1); echo "$out"
  python3 -I $C submit "$LADDER" -m "$(basename "$LADDER") ladder build" | tail -1 | sed 's/^/ladder /'
  tools/bump_ours.sh --ours > /dev/null
  todo=$(echo "$out" | sed -n 's/^refused: vs \([^:]*\):.*/\1/p' | paste -sd, -)
  if [ -n "$todo" ]; then echo "refused, again in 15 min: $todo"; sleep 900; fi
done
# A control block (the champion's own build, default panel) is a new ladder build's first block: the field's ranked
# challenges rate it now rather than at the daily autoscrim (tools/rate_ours.sh, RATE_N=0 skips; PROMPTS 44).
if [ "${dist%/}" = "${LADDER%/}" ] && [ "$PANEL" = progress/panels/v7-m1.json ] && [ "${RATE_N:-6}" -gt 0 ]; then
  tools/rate_ours.sh "${RATE_N:-6}" | tail -1
fi
