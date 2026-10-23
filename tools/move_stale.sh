#!/bin/bash
# Move named jobs of the batch VM's queue (battlecode-dev, ~/jobq) from pending/ to superseded/, or back with --back.
#   tools/move_stale.sh JOB...           # JOB: a job name as `ls ~/jobq/pending` shows it, with or without .sh
#   tools/move_stale.sh --back JOB...    # undo: superseded/ -> pending/
# Names must be [0-9a-z] only (no paths); a name not in the source directory, or already in the destination, is
# reported and skipped. Only pending/ and superseded/ are touched, never running/ or done/: a job the runner has
# taken is not stopped. Never starts a stopped VM. Prints each move, then what pending/ holds. Owner-approved for
# unattended use (PROMPTS 25).
# Test hook: MOVE_STALE_JOBQ=DIR acts on DIR on this machine instead of the VM's ~/jobq.
set -euo pipefail
cd "$(dirname "$0")/.."
src=pending dst=superseded
if [ "${1:-}" = --back ]; then src=superseded dst=pending; shift; fi
[ $# -ge 1 ] || { echo "usage: tools/move_stale.sh [--back] JOB..." >&2; exit 2; }
names=()
for j in "$@"; do
  j=${j%.sh}
  [[ $j =~ ^[0-9a-z]+$ ]] || { echo "refused: bad job name '$j' (only [0-9a-z])" >&2; exit 2; }
  names+=("$j")
done
# Runs where the queue is: $1 the queue directory, $2 / $3 source / destination, then the names.
read -r -d '' body <<'EOF' || true
set -eu
cd "$1"; src=$2; dst=$3; shift 3
mkdir -p superseded
for j in "$@"; do
  if [ -f "$src/$j.sh" ] && [ ! -e "$dst/$j.sh" ] && mv "$src/$j.sh" "$dst/$j.sh"; then echo "moved $j: $src -> $dst"
  else echo "skipped $j: not in $src, or already in $dst"; fi
done
echo "pending now:"; ls pending | sort
EOF
if [ -n "${MOVE_STALE_JOBQ:-}" ]; then
  bash -s -- "$MOVE_STALE_JOBQ" "$src" "$dst" "${names[@]}" <<< "$body"
else
  source tools/vm.sh
  IP=${IP:-10.138.0.3}   # only checks the VM is up: never starts it (that is ensure_vm's job, run by hand)
  gssh -o ConnectTimeout=8 true 2>/dev/null || { echo "VM unreachable (move_stale.sh never starts it)" >&2; exit 1; }
  gssh bash -s -- jobq "$src" "$dst" "${names[@]}" <<< "$body"   # the remote shell starts in $HOME
fi
