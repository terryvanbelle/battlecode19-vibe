#!/usr/bin/env bash
# Fetch candidate repos and keep those holding Battlecode 2019 code, WITHOUT reading any source.
#
#   tools/bench/fetch.sh [discovery.tsv]        (env: BENCH_ROOT, JOBS; incremental: rows already in _fetch.tsv are kept)
#
# Per candidate: full path list with blob sizes from the GitHub trees API (no clone) -> lists/<dir>.txt
# (non-GitHub or truncated trees: depth-1 blob-less clone, ls-tree paths only).
# Path pre-filter: a bot entry file (robot.js / MyRobot.java / robot.py, any case) must exist, or the candidate came
# from a 2019-specific query (not just a "battlecode" date window) and has some .js/.java/.py. Size cap: sources
# (sum of blob sizes from ls-tree) over 200 MB abort. Then sparse checkout of *.js *.java *.py only (no node_modules,
# no *.min.js) into repos/<owner>__<repo>/, and count files using 2019-only API names (grep -l counts only).
# Repos with zero such files are deleted. Appends to $BENCH_ROOT/_fetch.tsv:
#   dir  full_name  host  verdict  files_2019  files_src  src_kb  commit
set -uo pipefail
BENCH_ROOT="${BENCH_ROOT:-$HOME/projects/vibe/bc19-benchmarks}"
DISC="${1:-$BENCH_ROOT/_discovery.tsv}"
OUT="$BENCH_ROOT/_fetch.tsv"
JOBS="${JOBS:-6}"
export API19='SPECS\.(PILGRIM|CRUSADER|PROPHET|PREACHER)|SPECS\[.(PILGRIM|CRUSADER|PROPHET|PREACHER)|karbonite_map|karboniteMap|castleTalk|castle_talk|proposeTrade|propose_trade'
mkdir -p "$BENCH_ROOT/repos" "$BENCH_ROOT/lists"
[ -f "$OUT" ] || printf 'dir\tfull_name\thost\tverdict\tfiles_2019\tfiles_src\tsrc_kb\tcommit\n' > "$OUT"

fetch_one () {
  local fn="$1" host="$2" sources="$3" dir name tmp
  name="$(echo "$fn" | sed 's#/#__#g')"; dir="$BENCH_ROOT/repos/$name"
  grep -q -P "^\Q$name\E\t" "$OUT" && return 0
  rec () { printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$name" "$fn" "$host" "$1" "${2:-0}" "${3:-0}" "${4:-0}" "${5:--}" >> "$OUT"; }
  if [ "$fn" = battlecode/battlecode19 ]; then rec official; return 0; fi
  rm -rf "$dir"
  local list="$BENCH_ROOT/lists/$name.txt" commit='-' trunc=true
  if [ "$host" = github ]; then
    local j k
    for k in 1 2 3 4; do
      j=$(gh api "repos/$fn/git/trees/HEAD?recursive=1" 2>/dev/null) && break
      local rem; rem=$(gh api rate_limit --jq .resources.core.remaining 2>/dev/null || echo 0)
      if [ "${rem:-0}" -lt 20 ]; then sleep $(( $(gh api rate_limit --jq .resources.core.reset 2>/dev/null || date +%s) - $(date +%s) + 5 )); else break; fi
    done
    if [ -n "$j" ]; then
      echo "$j" | jq -r '.tree[] | select(.type=="blob") | "\(.size)\t\(.path)"' > "$list"
      trunc=$(echo "$j" | jq -r .truncated)
    else
      if gh api "repos/$fn" >/dev/null 2>&1; then rec empty-repo; else rec gone; fi; return 0
    fi
  fi
  local url="https://github.com/$fn.git"; [ "$host" = gitlab ] && url="https://gitlab.com/$fn.git"
  [ "$host" = bitbucket ] && url="https://bitbucket.org/$fn.git"
  prefilter () {
    nbot=$(cut -f2 "$list" | grep -v node_modules | grep -ciE '(^|/)(robot\.js|myrobot\.java|robot\.py)$')
    nsrc=$(cut -f2 "$list" | grep -v node_modules | grep -ciE '\.(js|java|py)$')
    kb=$(grep -v node_modules "$list" | grep -iE '\.(js|java|py)$' | awk -F'\t' '$1 ~ /^[0-9]+$/ {s+=$1} END {printf "%d", s/1024}')
  }
  local nbot=0 nsrc=0 kb=0
  if [ "$trunc" = false ]; then
    prefilter
    if [ "$nbot" -eq 0 ] && { [ "$nsrc" -eq 0 ] || ! echo "$sources" | tr ';' '\n' | grep -qv '^win:'; }; then
      rec no-bot-files 0 "$nsrc" "$kb"; return 0
    fi
    if [ "$kb" -gt 204800 ]; then rec too-big 0 "$nsrc" "$kb"; return 0; fi
  fi
  if ! GIT_TERMINAL_PROMPT=0 timeout 300 git clone -q --depth 1 --filter=blob:none --no-checkout "$url" "$dir" 2>/dev/null; then
    rm -rf "$dir"; rec clone-failed; return 0
  fi
  commit=$(git -C "$dir" log -1 --format=%h_%cs 2>/dev/null || echo '?')
  if [ "$trunc" != false ]; then             # no API listing: paths only (sizes unknown; du checked after checkout)
    git -C "$dir" -c core.quotePath=false ls-tree -r --name-only HEAD 2>/dev/null | sed 's/^/?\t/' > "$list"
    prefilter
    if [ "$nbot" -eq 0 ] && { [ "$nsrc" -eq 0 ] || ! echo "$sources" | tr ';' '\n' | grep -qv '^win:'; }; then
      rm -rf "$dir"; rec no-bot-files 0 "$nsrc" "$kb" "$commit"; return 0
    fi
  fi
  if [ "$kb" -gt 204800 ]; then rm -rf "$dir"; rec too-big 0 "$nsrc" "$kb" "$commit"; return 0; fi
  git -C "$dir" sparse-checkout set --no-cone '*.js' '*.java' '*.py' '!**/node_modules/**' '!*.min.js' >/dev/null 2>&1
  if ! timeout 900 git -C "$dir" checkout -q 2>/dev/null; then rm -rf "$dir"; rec checkout-failed 0 "$nsrc" "$kb" "$commit"; return 0; fi
  if [ "$(du -sm "$dir" | cut -f1)" -gt 200 ]; then rm -rf "$dir"; rec too-big 0 "$nsrc" "$kb" "$commit"; return 0; fi
  local n19
  n19=$(grep -rlE --include='*.js' --include='*.java' --include='*.py' "$API19" "$dir" 2>/dev/null | grep -v '/.git/' | wc -l)
  [ "$n19" -eq 0 ] && n19=$(grep -rlE --include='*.js' --include='*.java' --include='*.py' 'BCAbstractRobot' "$dir" 2>/dev/null \
        | xargs -r grep -l 'karbonite' 2>/dev/null | grep -v '/.git/' | wc -l)
  if [ "$n19" -gt 0 ]; then
    rm -rf "$dir/.git"; rec bc19 "$n19" "$nsrc" "$kb" "$commit"
  else
    rm -rf "$dir"; rec not-2019 0 "$nsrc" "$kb" "$commit"
  fi
}
export -f fetch_one; export BENCH_ROOT OUT
# Order: candidates found by name/fork/web sources first, then gitlab, then date windows, then code search only.
tail -n +2 "$DISC" | awk -F'\t' '{k=3; if ($3 ~ /(^|;)(repo|fork|forker|web)[:;]?/) k=0; else if ($3 ~ /(^|;)gitlab:/) k=1;
  else if ($3 ~ /(^|;)win:/) k=2; print k"\t"$1"\t"$2"\t"$3}' | sort -t$'\t' -k1,1n -k2,2 -u | cut -f2- | \
  xargs -d '\n' -P "$JOBS" -I{} bash -c 'IFS=$'"'"'\t'"'"' read -r a b c <<< "$1"; fetch_one "$a" "$b" "$c"' _ {}
echo "fetched: $(($(wc -l < "$OUT") - 1)) candidates; bc19: $(awk -F'\t' '$4=="bc19"' "$OUT" | wc -l); disk: $(du -sh "$BENCH_ROOT" | cut -f1)"
