#!/bin/sh
# Run a command with no network and a read-only view of every file system except one work directory.
#   sandbox.sh <workdir> <command> [args...]
# A new user namespace (the caller's uid maps to root inside, no privilege outside), network namespace (only a down
# `lo`) and mount namespace; every writable mount is remounted read-only, then <workdir> is bound back read-write.
# It fails closed: when a mount other than <workdir> and the kernel's /proc, /sys and /dev trees is still writable
# after the remounts, it prints the mount points and exits 3 without running the command.
# Used by tools/galaxy19/saturn.py for every compile and every game (CLAUDE.md rule 6).
set -eu
if [ "${1:-}" != --inside ]; then
  [ $# -ge 2 ] || { echo "usage: sandbox.sh <workdir> <command> [args...]" >&2; exit 2; }
  work=$(realpath "$1"); shift
  [ -d "$work" ] || { echo "sandbox.sh: no work directory $work" >&2; exit 2; }
  exec unshare --user --map-root-user --net --mount --propagation private /bin/sh "$0" --inside "$work" "$@"
fi
shift
w=$1; shift
exempt() { [ "$1" = "$w" ] && return 0; case "$1" in /proc|/proc/*|/sys|/sys/*|/dev|/dev/pts|/dev/mqueue) return 0 ;; esac; return 1; }
# The mount points whose top mount is read-write, with its options (mountinfo field 5 = mount point, 6 = per-mount
# options; a later line for one mount point is a mount on top of the earlier one).
writable() { awk '{o[$5] = $6} END {for (m in o) if (o[m] ~ /(^|,)rw(,|$)/) print m "\t" o[m]}' /proc/self/mountinfo | sed 's/\\040/ /g'; }
mount --bind "$w" "$w"   # its own mount first: a bind made after the remounts would inherit read-only
tab=$(printf '\t')
writable | while IFS="$tab" read -r mp opts; do
  exempt "$mp" && continue
  [ "$mp" = "${SANDBOX_TEST_SKIP:-}" ] && continue   # unit test of the refusal: a mount left writable on purpose
  # Keep the mount's other flags: a user namespace may not clear the nosuid / nodev / noexec it inherited.
  ro=$(echo "$opts" | sed 's/\(^\|,\)rw\(,\|$\)/\1ro\2/')
  mount -o "remount,bind,$ro" "$mp" 2>/dev/null || mount -o remount,bind,ro "$mp" 2>/dev/null || true
done
left=$(writable | cut -f1 | while read -r mp; do exempt "$mp" || echo "$mp"; done)
if [ -n "$left" ]; then
  echo "sandbox.sh: still writable after the remounts, refusing to run:" $left >&2
  exit 3
fi
cd "$w"
exec "$@"
