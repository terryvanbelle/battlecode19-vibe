#!/bin/bash
# Run our own replica matches first: move the named waiting matches, or every waiting match of vibe19, to the front of
# saturn's execute queue on the batch VM (battlecode-dev), with the deployed spool_bump.py as root. The charter gives
# the field's matches against each other the spare cycles (tools/galaxy19/README.md).
#   tools/bump_ours.sh MATCH...              # MATCH: a match id as `contest19.py matches` lists it
#   tools/bump_ours.sh --ours                # every waiting match with vibe19 in it
#   tools/bump_ours.sh --dry-run ...         # list what would move, move nothing
# Ids must be digits only and the team is fixed (vibe19). Only reorders the ready messages: never drops, cancels or
# plays a match, and never touches siarnaq. Never starts a stopped VM. Owner-approved for unattended use (PROMPTS 27).
# Test hook: BUMP_OURS_ECHO=1 prints the command it would run on the VM instead of running it.
set -euo pipefail
cd "$(dirname "$0")/.."
dry=() sel=() ids=()
while [ $# -gt 0 ]; do
  case $1 in
    --dry-run) dry=(--dry-run) ;;
    --ours) sel=(--team vibe19) ;;
    *) [[ $1 =~ ^[0-9]{1,7}$ ]] || { echo "refused: bad match id '$1' (digits only)" >&2; exit 2; }
       ids+=("$1") ;;
  esac
  shift
done
if [ ${#ids[@]} -gt 0 ]; then sel+=(--match "$(IFS=,; echo "${ids[*]}")"); fi
[ ${#sel[@]} -gt 0 ] || { echo "usage: tools/bump_ours.sh [--dry-run] (--ours | MATCH...)" >&2; exit 2; }
cmd=(sudo -n python3 -I /opt/bc19-galaxy/galaxy19/spool_bump.py "${sel[@]}" "${dry[@]}")
if [ -n "${BUMP_OURS_ECHO:-}" ]; then echo "${cmd[*]}"; exit 0; fi
source tools/vm.sh
IP=${IP:-10.138.0.3}   # only checks the VM is up: never starts it (that is ensure_vm's job, run by hand)
gssh -o ConnectTimeout=8 true 2>/dev/null || { echo "VM unreachable (bump_ours.sh never starts it)" >&2; exit 1; }
gssh "${cmd[@]}"
