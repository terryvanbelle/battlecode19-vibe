#!/bin/bash
# games.sh READ [ARG...] -- MATCH...: run a read (tools/reads/READ, e.g. idle.mjs) on every game of each replica match
# with vibe19's side as TEAM (0 red, 1 blue): `node READ TEAM ARG... REPLAY`. Each output line is prefixed with
# "match opponent map team W|L rounds". Replays: ~/projects/vibe/bc19-galaxy-replays/MATCH (contest19.py fetch).
#   tools/reads/games.sh idle.mjs 300 -- 1180 1181 | python3 -I tools/reads/sum.py stuckM
set -euo pipefail
D=$(cd "$(dirname "$0")" && pwd); R=${REPLAYS:-$HOME/projects/vibe/bc19-galaxy-replays}
read=${1:?usage: games.sh READ [ARG...] -- MATCH...}; shift
args=(); while [ $# -gt 0 ] && [ "$1" != -- ]; do args+=("$1"); shift; done
[ "${1:-}" = -- ] && shift || { echo "usage: games.sh READ [ARG...] -- MATCH..." >&2; exit 2; }
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
    nice node "$D/$read" "$t" "${args[@]}" "$R/$m/$f" | sed "s|^|$m $o $map $t $w $rd |"
  done
done
