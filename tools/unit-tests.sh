#!/bin/bash
# Run every unit test (bot logic and tools). Required after every change (CLAUDE.md rule 7).
set -euo pipefail
cd "$(dirname "$0")/.."
NODE=${NODE:-node}
exec "$NODE" --test test/
