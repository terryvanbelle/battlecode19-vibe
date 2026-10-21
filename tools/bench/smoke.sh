#!/usr/bin/env bash
# Smoke-test every compiled benchmark bundle against the starter bot (bots/example). Runs ON THE VM.
#
#   tools/bench/smoke.sh [names...]   -> $BENCH_ROOT/smoke.jsonl
#        env: BENCH_ROOT, NODE=~/bin/node, LOCK=~/.bc-extra.lock, GAME_TIMEOUT=2400 (s per game)
#
# Two games per bot: seed 1 with the bot as red, seed 2 with the bot as blue. Each game runs in
# tools/galaxy19/sandbox.sh (no network, read-only file systems except a fresh temp work dir; CLAUDE.md rule 6).
# VM load rule: one game at a time, each under the shared lock the main session's extra games also take
# (flock $LOCK), so smoke games never stack on top of A/B batches. Each row records the 1-minute load average
# before and after the game: init failures / timeouts seen under load > 8 are re-run before a bot is called broken.
# One JSON line per game: {name, seed, side, ...run_game result} or {name, seed, side, error, exit}. Incremental: games
# already in smoke.jsonl for the same bundle hash are skipped.
set -uo pipefail
cd "$(dirname "$0")/../.."
BENCH_ROOT="${BENCH_ROOT:-$HOME/projects/vibe/bc19-benchmarks}"
LOCK="${LOCK:-$HOME/.bc-extra.lock}"; NODE="${NODE:-$HOME/bin/node}"; [ -x "$NODE" ] || NODE=$(command -v node)
OUT="$BENCH_ROOT/smoke.jsonl"; touch "$OUT"
export BENCH_ROOT NODE OUT LOCK REPO="$PWD"
export ILLEGAL='"message":"(Can.t|Cannot|Not enough|Can only|Only |Tried to|Slow down|Invalid|Insufficient|Require a valid|Malformed|Must provide|Attempted to|Action must|Pilgrim failed|Non-pilgrim|Robot is frozen|Script execution timed out|[^"]*initiali[sz])'

one () {
  local name=$1 seed=$2 side=$3 bot="$BENCH_ROOT/compiled/$1/bot.js" w res h
  h=$(sha256sum "$bot" | cut -c1-16)
  grep -qF "\"key\":\"$name:$h:$seed:$side\"" "$OUT" && return 0
  w=$(mktemp -d)   # the sandbox keeps it read-only too; results go through stdout
  if [ "$side" = red ]; then set -- --red "$bot" --blue "$REPO/bots/example"; else set -- --red "$REPO/bots/example" --blue "$bot"; fi
  local l0 l1 rc
  {
    flock 9
    l0=$(cut -d' ' -f1 /proc/loadavg)
    timeout "${GAME_TIMEOUT:-2400}" sh "$REPO/tools/galaxy19/sandbox.sh" "$w" "$NODE" "$REPO/tools/run_game.js" "$@" --seed "$seed" --errlog /dev/stdout 2>"$w/stderr" 9>&- | cat > "$w/out"
    rc=${PIPESTATUS[0]}
    l1=$(cut -d' ' -f1 /proc/loadavg)
  } 9>"$LOCK"
  res=$(tail -1 "$w/out")
  local team=0; [ "$side" = blue ] && team=1
  # errlog sample (first 200 errors per team): refusals of illegal actions (and clock/init errors, counted by run_game)
  # vs. everything else (exceptions thrown by the bot)
  head -n -1 "$w/out" | grep '^{' | jq -c --argjson t "$team" 'select(.team==$t and .type=="error")' > "$w/bot_err" 2>/dev/null
  local illegal exc ex1
  illegal=$(grep -cE "$ILLEGAL" "$w/bot_err"); exc=$(grep -vcE "$ILLEGAL" "$w/bot_err")
  ex1=$(grep -vE "$ILLEGAL" "$w/bot_err" | jq -r .message | sort | uniq -c | sort -rn | head -2 | tr '\n' ' ' | head -c 400)
  if [ -n "$res" ] && echo "$res" | jq -e .winner >/dev/null 2>&1; then
    echo "$res" | jq -c --arg k "$name:$h:$seed:$side" --arg n "$name" --arg s "$side" --argjson ill "$illegal" --argjson exc "$exc" --arg e "$ex1" \
      --argjson l0 "$l0" --argjson l1 "$l1" \
      '{key:$k, name:$n, side:$s, bot_won:(.winner==$s), reason, rounds, seed, bot:(if $s=="red" then .teams[0] else .teams[1] end), illegal_sample:$ill, exc_sample:$exc, first_errors:$e, load:[$l0,$l1]}' >> "$OUT"
  else
    local e; e=$(tail -c 400 "$w/stderr"); [ "$rc" = 124 ] && e="game time limit (${GAME_TIMEOUT:-2400} s) $e"
    jq -cn --arg k "$name:$h:$seed:$side" --arg n "$name" --arg s "$side" --argjson seed "$seed" --arg e "$e" --argjson rc "$rc" \
      --argjson l0 "$l0" --argjson l1 "$l1" '{key:$k, name:$n, side:$s, seed:$seed, error:$e, exit:$rc, load:[$l0,$l1]}' >> "$OUT"
  fi
  rm -rf "$w"
}
export -f one
if [ $# -gt 0 ]; then names=("$@"); else mapfile -t names < <(ls "$BENCH_ROOT/compiled" | while read -r n; do [ -f "$BENCH_ROOT/compiled/$n/bot.js" ] && echo "$n"; done); fi
for n in "${names[@]}"; do printf '%s 1 red\n%s 2 blue\n' "$n" "$n"; done | while read -r n s d; do one "$n" "$s" "$d"; done
echo "smoke: $(wc -l < "$OUT") game rows in $OUT"
