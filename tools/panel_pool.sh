#!/bin/bash
# Score replica panel blocks against the pooled per-cell record (TRAINING_ALGORITHM §4, LEARNINGS 33).
#   tools/panel_pool.sh CONTROL POOLFILE BLOCK [BLOCK...]
# CONTROL: the control block (e.g. 420-425); POOLFILE: one block per line (#-comments allowed), the neutral blocks
# whose wins per cell, with the control's, make each cell's rate. Candidate blocks listed are left out of the pool.
# Prints each cell (pool wins/n, candidate wins over its blocks) and the candidate's wins against the pooled
# expectation as z (cells whose match has not finished are skipped) = (wins - E) / sqrt(sum p(1-p)); p = (wins + 0.5) / (n + 1).
set -euo pipefail
cd "$(dirname "$0")/.."
ctrl=$1; poolf=$2; shift 2
cand=" $* "
cmp() { python3 -I tools/galaxy19/contest19.py compare "$ctrl" "$1" 2>/dev/null |
  awk -v tag="$2" 'NF>8 && $3=="ctrl" && $0 !~ /cand -/{print tag, $1, $2, ($0 ~ /cand W/) ? 1 : 0}'; }
{
  python3 -I tools/galaxy19/contest19.py compare "$ctrl" "$ctrl" 2>/dev/null |
    awk 'NF>8 && $3=="ctrl"{print "P", $1, $2, ($4=="W") ? 1 : 0}'
  grep -v '^ *#' "$poolf" | while read -r b; do if [ -n "$b" ] && [[ "$cand" != *" $b "* ]]; then cmp "$b" P; fi; done
  for b in "$@"; do cmp "$b" C; done
} | awk '$1=="P"{k=$2" "$3; n[k]++; w[k]+=$4} $1=="C"{k=$2" "$3; m[k]++; c[k]+=$4}
END{E=0; W=0; V=0; N=0
  for(k in m){p=(w[k]+0.5)/(n[k]+1); E+=m[k]*p; W+=c[k]; V+=m[k]*p*(1-p); N+=m[k]
    flag=(c[k]>0 && w[k]<=1) ? "  <- won a never-won cell" : ((c[k]<m[k] && w[k]>=n[k]-1) ? "  <- lost a sure cell" : "")
    printf "%-45s pool %2d/%-2d cand %d/%d%s\n", k, w[k], n[k], c[k], m[k], flag}
  printf "~ cand wins %d of %d, pooled expectation %.1f, z %.2f\n", W, N, E, (V>0) ? (W-E)/sqrt(V) : 0}' | sort
