#!/usr/bin/env bash
# Regenerate progress/ in one command (CLAUDE.md rule 9; run after every accepted build, safe to rerun any time):
#   1. pull   mirror the VM's batch result files (~/runs/*.jsonl, ~/projects/vibe/2019/out/*.jsonl) into the cache
#             (PROGRESS_CACHE, default ~/projects/vibe/bc19-progress-cache/batches/; never deleted there)
#   2. replica  rankings, every match, our submissions and rating history from the galaxy replica (GET only)
#   3. archives our finished replica matches' archives (contest19.py fetch --new: per-game winners, maps, sides)
#   4. games  progress/games.csv rebuilt from 1-3
#   5. elo, ladder, rating history, attempts: ELO.md elo.png progress.png, ladder.md/.png, rating-history.md/.png,
#      ATTEMPTS.md
# A failed step is named ("!! <step> FAILED") and the script exits 1; later steps still run on the data at hand.
# Charts need matplotlib: .venv-progress is created from tools/progress/requirements.txt (hash-locked) when missing.
# One refresh at a time (flock). Commit progress/ afterwards (explicit paths).
cd "$(dirname "$0")/.." || exit 1
exec 9> "${TMPDIR:-/tmp}/bc19-progress-refresh.lock"
flock -n 9 || { echo "!! another progress refresh is running"; exit 1; }
CACHE="${PROGRESS_CACHE:-$HOME/projects/vibe/bc19-progress-cache}"
VPY=.venv-progress/bin/python
LOG="$(mktemp)"; trap 'rm -f "$LOG"' EXIT; FAILS=()
step () {   # step <name> <timeout s> <lines of output kept> <command ...>
  local name="$1" t="$2" n="$3" rc; shift 3
  echo "== $name"
  timeout "$t" "$@" > "$LOG" 2>&1; rc=$?
  tail -"$n" "$LOG"
  if [ "$rc" -ne 0 ]; then
    echo "!! $name FAILED (exit $rc$([ "$rc" = 124 ] && echo ", timed out after ${t} s"))"; FAILS+=("$name")
  fi
}
pull () {   # rsync over the internal network, the same ssh options as tools/vm.sh's gssh
  source tools/vm.sh && ensure_vm || return 1
  local d src
  for d in runs out; do
    src='runs/*.jsonl'; [ "$d" = out ] && src="$REMOTE_REPO/out/*.jsonl"
    mkdir -p "$CACHE/batches/$d"
    rsync -a -e "ssh ${SSHO[*]}" "$USER_NAME@$IP:$src" "$CACHE/batches/$d/" || return 1
  done
  ls "$CACHE"/batches/*/*.jsonl | wc -l | xargs echo "batch files in the cache:"
}
venv () {
  [ -x "$VPY" ] && "$VPY" -c 'import matplotlib, numpy' 2>/dev/null && return 0
  python3 -m venv .venv-progress && "$VPY" -m pip install -q --require-hashes --no-deps --only-binary=:all: \
    -r tools/progress/requirements.txt
}
export -f pull; export CACHE
echo "== start $(TZ=America/Los_Angeles date '+%Y-%m-%d %H:%M %Z')"
step venv 900 3 bash -c "$(declare -f venv); VPY=$VPY; venv"
step pull 300 2 bash -c pull
step replica 300 2 python3 tools/progress/replica.py fetch
step archives 1200 2 python3 tools/galaxy19/contest19.py fetch --new --pages 100
step games 300 4 python3 tools/progress/games.py
step elo 600 4 "$VPY" tools/progress/elo.py
step ladder 300 2 "$VPY" tools/progress/ladder.py
step "rating history" 300 2 "$VPY" tools/progress/rating_history.py
step attempts 120 2 python3 tools/progress/attempts.py refresh
echo "== done $(TZ=America/Los_Angeles date '+%H:%M %Z')"
if [ "${#FAILS[@]}" -gt 0 ]; then echo "!! failed steps: ${FAILS[*]} (their progress/ files are stale)"; exit 1; fi
