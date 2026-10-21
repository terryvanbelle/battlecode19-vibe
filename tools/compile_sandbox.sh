#!/bin/sh
# Compile sandbox for untrusted bot source (used by tools/compile_bot.js; not meant to be run by hand).
# Must run as:  unshare -r -n -m -p -f --propagation private sh compile_sandbox.sh NEWROOT TOOLCHAIN WORK NODEBIN WRAPPER cmd...
# Inside a new user + network (no interfaces: no network at all) + mount + pid namespace it builds a minimal root on a
# tmpfs and chroots into it:
#   /usr /etc (+ /bin /lib /lib64 /sbin links)  read-only system   /tc       the toolchain, read-only
#   /work                                       the bot's temp dir  /nodebin  node's directory, read-only
#   /wrap/transcrypt_safe.py                    read-only           /tmp      empty tmpfs        /proc /dev(null,zero,urandom)
# $HOME (keys, repos, other bots), /tmp and every other path of the host are absent.
set -e
NEW=$1; TC=$2; W=$3; NB=$4; WRAP=$5; shift 5
mount -t tmpfs -o size=8m,mode=755 tmpfs "$NEW"
for d in usr etc; do mkdir "$NEW/$d"; mount --rbind "/$d" "$NEW/$d"; mount -o remount,bind,ro "$NEW/$d" 2>/dev/null || true; done
for l in bin lib lib64 sbin; do
  if [ -L "/$l" ]; then ln -s "$(readlink "/$l")" "$NEW/$l"
  elif [ -d "/$l" ]; then mkdir "$NEW/$l"; mount --rbind "/$l" "$NEW/$l"; mount -o remount,bind,ro "$NEW/$l" 2>/dev/null || true; fi
done
mkdir -p "$NEW/tc" "$NEW/work" "$NEW/nodebin" "$NEW/tmp" "$NEW/dev" "$NEW/proc" "$NEW/wrap"
mount --bind "$TC" "$NEW/tc"; mount -o remount,bind,ro "$NEW/tc"
mount --bind "$NB" "$NEW/nodebin"; mount -o remount,bind,ro "$NEW/nodebin"
touch "$NEW/wrap/transcrypt_safe.py"; mount --bind "$WRAP" "$NEW/wrap/transcrypt_safe.py"; mount -o remount,bind,ro "$NEW/wrap/transcrypt_safe.py"
mount --bind "$W" "$NEW/work"
mount -t tmpfs -o size=64m tmpfs "$NEW/tmp"
for dv in null zero urandom random; do touch "$NEW/dev/$dv"; mount --bind "/dev/$dv" "$NEW/dev/$dv"; done
mount -t proc proc "$NEW/proc"
mount -o remount,ro "$NEW" 2>/dev/null || mount -o remount,bind,ro "$NEW"   # plain remount is refused on some kernels in a userns
exec /usr/sbin/chroot "$NEW" /usr/bin/env -i PATH=/nodebin:/usr/bin:/bin HOME=/work LANG=C.UTF-8 \
  /bin/sh -c 'cd /work && exec "$@"' sh "$@"
