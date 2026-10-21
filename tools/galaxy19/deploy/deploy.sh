#!/usr/bin/env bash
# Deploy (or redeploy) the bc19 galaxy replica on battlecode-dev from the driver. Idempotent. Doc: tools/galaxy19/README.md.
#   tools/galaxy19/deploy/deploy.sh              push the stage, then galaxy-setup.sh all
#   tools/galaxy19/deploy/deploy.sh STEP [ARG]   push the stage, then one galaxy-setup.sh step (status, app, units, start,
#                                                viewer, frontend, scheduler on|off, activity on|off, ...)
# The stage on the VM (~/bc19-galaxy-stage) holds tools/galaxy19, tools/run_game.js and engine/ of this checkout; the
# viewer's pinned inputs go to ~/projects/vibe/bc19-viewer-inputs (the official battlecode19 app's visualizer.js and
# unit images from ~/projects/vibe/bc19-official, and pixi.js 4.8.9 from ~/projects/vibe/pixi-4.8.9; viewer/PINS.json).
# Afterwards the driver gets the site gate password (~/.bc19-replica-password, 600) and the site URL (~/.bc19-galaxy/site).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; REPO="$(cd "$HERE/../../.." && pwd)"
# shellcheck source=../../vm.sh
source "$REPO/tools/vm.sh"; ensure_vm
[ "$(hostname -s)" != battlecode-dev ] || { echo "deploy: run this on the driver" >&2; exit 1; }
STAGE=bc19-galaxy-stage
OFFICIAL="${BC19_OFFICIAL:-$HOME/projects/vibe/bc19-official/battlecode19}"
PIXI="${BC19_PIXI:-$HOME/projects/vibe/pixi-4.8.9}"
RS=(rsync -a --delete --exclude __pycache__ -e "ssh ${SSHO[*]}")

echo "== stage ~/$STAGE on $VM"
gssh "mkdir -p ~/$STAGE/tools ~/projects/vibe/bc19-viewer-inputs/battlecode19/app/src/views ~/projects/vibe/bc19-viewer-inputs/battlecode19/app/public/assets/img ~/projects/vibe/bc19-viewer-inputs/pixi-4.8.9"
"${RS[@]}" "$REPO/tools/galaxy19/" "$USER_NAME@$IP:$STAGE/tools/galaxy19/"
"${RS[@]}" "$REPO/tools/run_game.js" "$USER_NAME@$IP:$STAGE/tools/run_game.js"
"${RS[@]}" "$REPO/engine/" "$USER_NAME@$IP:$STAGE/engine/"
"${RS[@]}" "$OFFICIAL/app/src/views/visualizer.js" "$USER_NAME@$IP:projects/vibe/bc19-viewer-inputs/battlecode19/app/src/views/visualizer.js"
"${RS[@]}" "$OFFICIAL/app/public/assets/img/" "$USER_NAME@$IP:projects/vibe/bc19-viewer-inputs/battlecode19/app/public/assets/img/"
"${RS[@]}" "$PIXI/pixi.min.js" "$USER_NAME@$IP:projects/vibe/bc19-viewer-inputs/pixi-4.8.9/pixi.min.js"

SETUP="sudo bash ~/$STAGE/tools/galaxy19/deploy/galaxy-setup.sh"
if [ $# -gt 0 ]; then
  case "$1" in app|runtime) gssh "$SETUP $1 ~/$STAGE" ;; *) gssh "$SETUP $*" ;; esac
else
  gssh "$SETUP all ~/$STAGE"
fi

echo "== driver: gate password and site URL"
umask 077
gssh 'cat ~/.bc19-replica-password' > "$HOME/.bc19-replica-password.new" && [ -s "$HOME/.bc19-replica-password.new" ] \
  && mv -f "$HOME/.bc19-replica-password.new" "$HOME/.bc19-replica-password" || rm -f "$HOME/.bc19-replica-password.new"
chmod 600 "$HOME/.bc19-replica-password" 2>/dev/null || true
host=$(gssh 'cat /etc/bc19-galaxy/hostname 2>/dev/null' || true)
if [ -n "$host" ]; then
  mkdir -p "$HOME/.bc19-galaxy"; chmod 700 "$HOME/.bc19-galaxy"
  echo "https://galaxy19.$host" > "$HOME/.bc19-galaxy/site"
  echo "site: https://galaxy19.$host/"
fi
