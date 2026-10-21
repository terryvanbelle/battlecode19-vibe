#!/bin/sh
# Run a command with no network and a read-only view of every file system except one work directory.
#   sandbox.sh <workdir> <command> [args...]
# A new user namespace (the caller's uid maps to root inside, no privilege outside), network namespace (only a down
# `lo`) and mount namespace; every writable mount is remounted read-only, then <workdir> is bound back read-write.
# Used by tools/galaxy19/saturn.py for every compile and every game (CLAUDE.md rule 6).
set -eu
[ $# -ge 2 ] || { echo "usage: sandbox.sh <workdir> <command> [args...]" >&2; exit 2; }
work=$(realpath "$1"); shift
[ -d "$work" ] || { echo "sandbox.sh: no work directory $work" >&2; exit 2; }
exec unshare --user --map-root-user --net --mount --propagation private /bin/sh -c '
  set -eu
  w="$1"; shift
  mount --bind "$w" "$w"          # its own mount first: a bind made after the remounts would inherit read-only
  # every mount point that is read-write now (mountinfo field 5 = mount point, 6 = per-mount options)
  awk "\$6 ~ /(^|,)rw(,|$)/ {print \$5}" /proc/self/mountinfo | sed "s/\\\\040/ /g" | sort -u | while read -r mp; do
    [ "$mp" = "$w" ] && continue
    case "$mp" in /proc|/proc/*|/sys|/sys/*|/dev|/dev/pts|/dev/mqueue) continue ;; esac
    mount -o remount,bind,ro "$mp" 2>/dev/null || true
  done
  cd "$w"
  exec "$@"
' sandbox "$work" "$@"
