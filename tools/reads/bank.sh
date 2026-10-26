#!/bin/bash
# bank.sh MATCH...: per game of each replica match, vibe19's karbonite bank, army and churches at rounds 50, 75, 100
# and 125 and the opponent's army and churches (replay.js timeline; a game over sooner shows its last round instead).
# One line per game: "match opponent map team W|L rounds | us R:Kk/aA/chC ... | them R:aA/chC ...". Replays as in
# games.sh (~/projects/vibe/bc19-galaxy-replays/MATCH, or $REPLAYS).
#   tools/reads/bank.sh 1651 1652        # ECON_RICH's case: the bank idle before ECON_UNTIL (TRAINING_LOG 2026-10-26 11:47)
set -euo pipefail
cd "$(dirname "$0")/../.."
R=${REPLAYS:-$HOME/projects/vibe/bc19-galaxy-replays}
[ $# -gt 0 ] || { echo "usage: bank.sh MATCH..." >&2; exit 2; }
for m in "$@"; do
  [[ $m =~ ^[0-9]+$ ]] || { echo "bad match id '$m'" >&2; exit 2; }
  [ -f "$R/$m/match.json" ] || { echo "no replays for match $m (contest19.py fetch)" >&2; exit 1; }
  python3 -I -c '
import json, sys
for g in json.load(open(sys.argv[1]))["games"]:
    us = 0 if g["red_team"] == "vibe19" else 1
    o = g["blue_team"] if us == 0 else g["red_team"]
    print(us, g["file"], "W" if g["winner_team"] == "vibe19" else "L", o, g["map"], g.get("rounds"))
' "$R/$m/match.json" | while read -r t f w o map rd; do
    out=$(nice node tools/replay.js timeline "$R/$m/$f" --at 50,75,100,125)
    us=$([ "$t" = 0 ] && echo RED || echo BLUE); them=$([ "$t" = 0 ] && echo BLUE || echo RED)
    # timeline columns: round castle church pilgrim army crusader prophet preacher mined_k mined_f karbonite ...
    a=$(echo "$out" | awk -v s="== $us" '$0 == s { f = 1; next } /^==/ { f = 0 } f && $1 ~ /^[0-9]+$/ { printf "%s:K%s/a%s/ch%s ", $1, $11, $5, $3 }')
    b=$(echo "$out" | awk -v s="== $them" '$0 == s { f = 1; next } /^==/ { f = 0 } f && $1 ~ /^[0-9]+$/ { printf "%s:a%s/ch%s ", $1, $5, $3 }')
    echo "$m $o $map $t $w $rd | us $a| them $b"
  done
done
