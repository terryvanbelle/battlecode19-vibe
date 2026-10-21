#!/bin/bash
# Freeze a bot as an opponent forever:  tools/snapshot.sh <name> "<note>" [<built dir>]
# Copies src/bot/*.js (or the built bundle <built dir>/robot.js, e.g. dist/h1) to bots/<name>/ and appends name,
# code hash, date (PDT), note to bots/ROSTER.tsv.
set -euo pipefail
cd "$(dirname "$0")/.."
name=$1; note=${2:-}; from=${3:-src/bot}
[ -e "bots/$name" ] && { echo "bots/$name exists" >&2; exit 1; }
mkdir -p "bots/$name"
cp "$from"/*.js "bots/$name/"
hash=$(node -e "console.log(require('./tools/batch.js').codeHash('bots/$name'))")
[ -f bots/ROSTER.tsv ] || printf 'name\thash\tdate_pdt\tnote\n' > bots/ROSTER.tsv
printf '%s\t%s\t%s\t%s\n' "$name" "$hash" "$(TZ=America/Los_Angeles date '+%Y-%m-%d %H:%M')" "$note" >> bots/ROSTER.tsv
echo "$name $hash"
