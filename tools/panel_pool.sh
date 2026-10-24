#!/bin/bash
# Score candidate panel blocks against the pooled v8-family history (TRAINING_ALGORITHM step 7):
#   tools/panel_pool.sh [--partial] [--k 2] CONTROL POOLFILE BLOCK [BLOCK...]
# e.g. tools/panel_pool.sh 726-731 progress/panels/v8-m1.pool 777-782 967-972. Prints each candidate cell (opponent,
# map, our side) with its pool record, then the side-blind z (cell = opponent, map; p = (w + .5) / (n + 1)) and the
# side-aware z (p per side, shrunk toward the cell's p with weight k). A block with a match not finished is refused
# (exit 3) unless --partial: never read a running batch. The scoring lives in contest19.py pool.
set -euo pipefail
cd "$(dirname "$0")/.."
exec python3 -I tools/galaxy19/contest19.py pool "$@"
