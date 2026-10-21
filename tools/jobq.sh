#!/bin/bash
# Sequential job queue for game batches on the VM (one batch at a time keeps load predictable).
#   tools/jobq.sh add "<shell command>"   # enqueue (runs in the repo root)
#   tools/jobq.sh start                   # start the runner if it is not running (singleton, survives logout)
#   tools/jobq.sh status                  # pending / running / last done
# A job starts only when no other tools/batch.js process is running (so ad-hoc batches are respected too).
# Queue: ~/jobq/{pending,running,done}/<epoch-ns>.sh, each job's output in ~/jobq/done/<id>.log.
set -u
Q=$HOME/jobq; ROOT=$(cd "$(dirname "$0")/.." && pwd)
mkdir -p "$Q/pending" "$Q/running" "$Q/done"
case "${1:-}" in
  add)  id=$(date +%s%N); printf '%s\n' "$2" > "$Q/pending/$id.sh"; echo "queued $id";;
  start)
    setsid nohup flock -n "$Q/runner.lock" bash "$0" run > "$Q/runner.log" 2>&1 < /dev/null &
    disown; echo started;;
  run)
    export PATH=$HOME/bin:$PATH
    while true; do
      next=$(ls "$Q/pending" 2>/dev/null | sort | head -1)
      if [ -z "$next" ] || pgrep -f "tools/batch[.]js" >/dev/null; then sleep 20; continue; fi
      mv "$Q/pending/$next" "$Q/running/$next"
      id=${next%.sh}; echo "$(date -u +%FT%TZ) start $id: $(cat "$Q/running/$next")"
      (cd "$ROOT" && bash "$Q/running/$next") > "$Q/done/$id.log" 2>&1
      echo "$(date -u +%FT%TZ) end $id rc=$?"; mv "$Q/running/$next" "$Q/done/$next"
    done;;
  status)
    echo "pending:"; for f in $(ls "$Q/pending" | sort); do echo "  ${f%.sh}: $(cat "$Q/pending/$f")"; done
    echo "running:"; for f in $(ls "$Q/running"); do echo "  ${f%.sh}: $(cat "$Q/running/$f")"; done
    pgrep -f "flock -n $Q/runner.lock" >/dev/null && echo "runner: up" || echo "runner: DOWN"
    tail -3 "$Q/runner.log" 2>/dev/null; true;;
  *) echo "usage: jobq.sh add <cmd> | start | status"; exit 2;;
esac
