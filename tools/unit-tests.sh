#!/bin/bash
# Run every unit test (bot logic and tools, the replica's galaxy19 tools included). Required after every change
# (CLAUDE.md rule 7).
set -euo pipefail
cd "$(dirname "$0")/.."
NODE=${NODE:-node}
"$NODE" --test test/*.test.js test/*.test.mjs
python3 -I -m unittest discover -s test/galaxy19 -q
