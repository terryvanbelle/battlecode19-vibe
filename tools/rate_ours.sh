#!/bin/bash
# Ranked matches for our ladder build from the field (PROMPTS 44): copies tools/galaxy19 to the VM's checkout
# (~/projects/vibe/2019, which no replica service runs from) and runs field.py rate there, where the field teams'
# accounts live. Galaxy takes ranked requests only upward and we play at the top, so our team cannot ask for one.
#   tools/rate_ours.sh [N] [--dry-run]       N field teams rated closest at or below us challenge us (default 6)
# tools/panel_submit.sh runs it after a control block on the default panel.
set -euo pipefail
cd "$(dirname "$0")/.."
# shellcheck source=vm.sh
source tools/vm.sh
IP=${IP:-10.138.0.3}
n=6; if [[ "${1:-}" =~ ^[1-9][0-9]*$ ]]; then n=$1; shift; fi
rsync -a --exclude __pycache__ -e "ssh ${SSHO[*]}" tools/galaxy19/ "$USER_NAME@$IP:$REMOTE_REPO/tools/galaxy19/"
gssh "cd ~/$REMOTE_REPO && python3 -I tools/galaxy19/field.py rate --n $n $*"
