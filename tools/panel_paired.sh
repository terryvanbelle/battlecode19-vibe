#!/bin/bash
# Score candidate panel blocks by the paired fresh-cell rule (TRAINING_ALGORITHM §4):
#   tools/panel_paired.sh [--partial] [--studied OPP:MAP,...] REF BLOCK [BLOCK...]
# e.g. tools/panel_paired.sh progress/panels/v12.ref 1915-1926. REF lists the champion's own matches (its control
# blocks and accepting blocks), one block a line. Prints each cell the candidate and the champion played differently
# (champion and candidate records, d = the difference of their mean results), then cells, D, net and t = net /
# sqrt(sum d^2), each (opponent, map, side) cell counted once. Refused (exit 3) while a candidate match is not
# finished or a candidate cell has no champion game, unless --partial: never read a running batch. The scoring lives
# in contest19.py paired.
set -euo pipefail
cd "$(dirname "$0")/.."
exec python3 -I tools/galaxy19/contest19.py paired "$@"
