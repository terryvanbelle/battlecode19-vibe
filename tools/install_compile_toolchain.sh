#!/usr/bin/env bash
# Install the offline Java/Python transpiler toolchain used by tools/compile_bot.js (docs/compile.md).
#
#   tools/install_compile_toolchain.sh                 install into $BC19_TOOLCHAIN (default ~/projects/vibe/bc19-toolchain)
#   tools/install_compile_toolchain.sh --verify        only check the installed files against the pinned checksums
#
# Every download is from the package's official registry/release site and is pinned by checksum; no bot source is
# ever sent anywhere. The JSweet jars are copied from the official battlecode19 repo clone (transpiler/repository, the
# exact Maven repository the official service ran with), after checking their Maven .sha1 files and our sha256 pins.
# CPython 3.6.15 is built from the python.org source tarball (needs gcc, make, libc6-dev). A machine without a C
# compiler can instead receive a copy built on an identical OS (Debian 12):  rsync -a <host>:<toolchain>/ <toolchain>/
set -euo pipefail
TC=${BC19_TOOLCHAIN:-$HOME/projects/vibe/bc19-toolchain}
OFFICIAL=${BC19_OFFICIAL_REPO:-$HOME/projects/vibe/bc19-official/battlecode19}
DL=${TMPDIR:-/tmp}/bc19-toolchain-dl

JDK_URL=https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u504-b01/OpenJDK8U-jdk_x64_linux_hotspot_8u504b01.tar.gz
JDK_SHA256=9c70e102f527ac674ac2fe9c7d47b9a04e2d19842ba5ab8e9b33f368bbadfaea
TS_URL=https://registry.npmjs.org/typescript/-/typescript-2.1.6.tgz
TS_SHA256=1e939ba091a7c38b58520f5f6390c8299a6165d6dafb4640c340995930982735
TC_URL=https://files.pythonhosted.org/packages/4e/b9/e03a9c7e3540c7755977e8e10e45812948d3bd79ae3718b281cc19f40424/Transcrypt-3.7.13.tar.gz
TC_SHA256=073d71dcc69f2c45e4d309c950f4f7b39210de4e301afd0024ea2672dbc2bfd0
PY_URL=https://www.python.org/ftp/python/3.6.15/Python-3.6.15.tar.xz
PY_SHA256=6e28d7cdd6dd513dd190e49bca3972e20fcf455090ccf2ef3f1a227614135d91
JARS_SHA256='91ddeaba0b24adce72291c618c00bbdce1c884755f6c4dba9c5c46e871c69ed6  args4j-2.33.jar
79ed9d822e0f5843df9b553aa932c9185699f24177917b1e96e821fe4e7eb6c3  closure-compiler-externs-v20161201.jar
21c9b26ac57e00944804a902958542520d04da5b5bffd0db553b83a20d0a608e  closure-compiler-v20161201.jar
cc6a41dc3eaacc9e440a6bd0d2890b20d36b4ee408fe2d67122f328bb6e01581  commons-io-2.4.jar
6b81d10754dadf184d386011486e6509c2cc0c3d33565ced4fb4402b9413d47d  commons-lang3-3.3.2.jar
c0328cd07ca9e363a5acd00c1cf4afe8cf554bd6d373834981ba05cebec687fb  gson-2.2.4.jar
2d43eb5ea9e133d2ee2405cc14f5ee08951b8361302fdd93494a3a997b508d32  gson-2.7.jar
36a666e3b71ae7f0f0dca23654b67e086e6c93d192f60ba5dfd5519db6c288c8  guava-20.0.jar
15894fad0a81611e351b5200bbc3bd21359fc6aed53af54a48998390e4b2700d  java-cup-10k.jar
7a59db2cd74441a47d62f745b684aff8e7aedbfc34e87da95ba4e1ff9782740e  jflex-1.3.5.jar
331746fa62cfbc3368260c5a2e660936ad11be612308c120a044e120361d474e  jsap-2.1.jar
e5c1e0ceef98fb65a3d382641bcc1faab97649da1b422bbfc60e21b47345c854  jsinterop-annotations-1.0.0.jar
c885ce34249682bc0236b4a7d56efcc12048e6135a5baf7a9cde8ad8cda13fcd  jsr305-3.0.1.jar
0a03927e4a5c2c0228822d76095fbe8b8f01a213ebd27e36a4d6b1847968e9f8  jsweet-core-5-20170726.jar
19abe34e2985ef647d0252ac8c3cdc2b7a5cd51e991be1ec09c2fde8632cea53  jsweet-transpiler-2.0.0-20170829.164109-239.jar
1d31696445697720527091754369082a6651bd49781b6005deb94e56753406f9  log4j-1.2.17.jar
cf029dff3bfc5c7be21b6ea77723bce698500013911ab76b2e74beb5aedaf745  protobuf-java-3.0.2.jar'

verify_jars () { (cd "$TC/jsweet/lib" && echo "$JARS_SHA256" | sha256sum -c --quiet); }
if [ "${1:-}" = --verify ]; then
  verify_jars && echo "jars OK"
  "$TC/jdk8/bin/java" -version 2>&1 | head -1
  "$TC/jsweet-home/.jsweet-node_modules/bin/tsc" --version
  "$TC/python3.6/bin/python3.6" --version
  grep -o "transpiler_version = '[^']*'" "$TC/transcrypt/transcrypt/modules/org/transcrypt/__envir__.js"
  exit 0
fi

fetch () { # url sha256 -> path
  local f="$DL/$(basename "$1")"
  [ -f "$f" ] && echo "$2  $f" | sha256sum -c --quiet 2>/dev/null || curl -sSfL -o "$f" "$1"
  echo "$2  $f" | sha256sum -c --quiet || { echo "checksum mismatch: $1" >&2; exit 1; }
  echo "$f"
}
mkdir -p "$TC" "$DL"

# 1. JDK 8 (JSweet 2.0 drives javac through tools.jar: JDK 8 only). Trimmed of src.zip, samples and man pages.
if [ ! -x "$TC/jdk8/bin/java" ]; then
  f=$(fetch "$JDK_URL" "$JDK_SHA256"); rm -rf "$TC/jdk8" "$DL/jdk"; mkdir "$DL/jdk"
  tar xzf "$f" -C "$DL/jdk" --strip-components=1 && mv "$DL/jdk" "$TC/jdk8"
  rm -rf "$TC/jdk8/src.zip" "$TC/jdk8/sample" "$TC/jdk8/man"
fi

# 2. JSweet 2.0.0-SNAPSHOT jars from the official service's Maven repository.
mkdir -p "$TC/jsweet/lib"
R="$OFFICIAL/transpiler/repository"
for j in $(echo "$JARS_SHA256" | awk '{print $2}'); do
  [ -f "$TC/jsweet/lib/$j" ] && continue
  src=$(find "$R" -name "$j" | head -1); [ -n "$src" ] || { echo "missing $j in $R" >&2; exit 1; }
  [ "$(cut -c1-40 "$src.sha1")" = "$(sha1sum "$src" | cut -c1-40)" ] || { echo "maven sha1 mismatch $j" >&2; exit 1; }
  cp "$src" "$TC/jsweet/lib/"
done
verify_jars

# 3. TypeScript 2.1.6, where JSweet looks for it (user.home/.jsweet-node_modules, tsc-version "2.1"): it never runs npm.
NM="$TC/jsweet-home/.jsweet-node_modules"
if [ ! -e "$NM/bin/tsc" ]; then
  f=$(fetch "$TS_URL" "$TS_SHA256"); mkdir -p "$NM/lib/node_modules" "$NM/bin"
  rm -rf "$NM/lib/node_modules/typescript" "$NM/lib/node_modules/package"
  tar xzf "$f" -C "$NM/lib/node_modules" && mv "$NM/lib/node_modules/package" "$NM/lib/node_modules/typescript"
  chmod +x "$NM/lib/node_modules/typescript/bin/"*
  ln -sf ../lib/node_modules/typescript/bin/tsc "$NM/bin/tsc"; printf '2.1' > "$NM/tsc-version"
fi

# 4. Transcrypt 3.7.13 (pure Python; used in place, docs/demos dropped).
if [ ! -f "$TC/transcrypt/transcrypt/__main__.py" ]; then
  f=$(fetch "$TC_URL" "$TC_SHA256"); rm -rf "$TC/transcrypt"; mkdir -p "$TC/transcrypt"
  tar xzf "$f" -C "$TC/transcrypt" --strip-components=1
  rm -rf "$TC/transcrypt/transcrypt/"{demos,docs,tutorials,development}
fi

# 5. CPython 3.6.15 (the official service ran Transcrypt on python3.6; Transcrypt 3.7 mistranslates subscripts on
#    Python >= 3.9, whose ast dropped ast.Index).
if [ ! -x "$TC/python3.6/bin/python3.6" ]; then
  command -v gcc >/dev/null || { echo "gcc needed to build CPython 3.6 (sudo apt-get install gcc make libc6-dev), or rsync a built toolchain" >&2; exit 1; }
  f=$(fetch "$PY_URL" "$PY_SHA256"); rm -rf "$DL/py"; mkdir "$DL/py"; tar xJf "$f" -C "$DL/py" --strip-components=1
  (cd "$DL/py" && ./configure --prefix="$TC/python3.6" --without-ensurepip >/dev/null && make -j"$(nproc)" >/dev/null && make install >/dev/null)
  rm -rf "$TC/python3.6/lib/python3.6/test" "$DL/py"
fi
echo "toolchain ready in $TC"
