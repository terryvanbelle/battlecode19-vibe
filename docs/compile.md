# Compiling Battlecode 2019 bots offline

Every bot we run, ours or a benchmark entrant, becomes one JavaScript bundle that the engine's CrossVM loads (it
defines `robot` with `_do_turn`). Nothing is ever sent to battlecode.org: the stock engine compiles Java and Python by
POSTing the source to `battlecode.org/compile` (CLAUDE.md rule 5), so those two languages go through our local copy
of the official transpiler toolchain instead.

| Language | Path | Tool |
|---|---|---|
| JavaScript (`robot.js`) | the engine's own rollup (`Compiler.JS`), as bc19compile and the official site did | `tools/compile_bot.js`, `tools/galaxy19/compile19.js` (replica), `tools/build_bot.js` (our bot, plus minify and `--cfg`) |
| Java (`MyRobot.java`) | JSweet 2.0.0-SNAPSHOT (2017-08-29) + TypeScript 2.1.6 on JDK 8: the jars of the official transpiler service | `tools/compile_bot.js`, in the compile sandbox |
| Python (`robot.py`) | Transcrypt 3.7.13 on CPython 3.6 with the service's flags (`-n -m -b -p .none`) | `tools/compile_bot.js`, in the compile sandbox, through `tools/transcrypt_safe.py` |

The transpiled output is post-processed exactly as the engine's `compiler.js` does after its POST, so all three
produce the same bundle format.

## Untrusted source

- **Compile sandbox** (`tools/compile_sandbox.sh`): new user, network, mount and pid namespaces (no network at all),
  then a chroot into a tmpfs root where only the toolchain (read-only), node (read-only) and a fresh work dir are
  visible. `$HOME`, keys, repos and other bots are absent.
- **`tools/transcrypt_safe.py`** closes the three places where stock Transcrypt runs bot-controlled code at compile
  time: `__pragma__` expressions are AST-checked and evaluated without builtins, `xtrans` subprocesses are refused, and
  imports resolving into the bot's directory (a bot file named like a stdlib module) are refused.
- JavaScript is only parsed by rollup, never run, so it compiles outside the sandbox. Bundles run only in games, which
  have their own sandbox (`unshare -rn`, CLAUDE.md rule 6).
- External bots' source is never opened or shown: `tools/bench/compile_field.py` records only exit status, sizes and
  a trimmed error line (CLAUDE.md rule 3).

## Lenient JavaScript fallback

The engine 0.4.7 compiler has a flat virtual file system: it rejects modules in subdirectories and imports without
the `.js` extension, which later CLI versions and many teams' own build scripts accepted. When the engine compiler
refuses a bot, `compile_bot.js` retries with `compileJSLenient`: the same rollup bundle (cjs output, same starter, same
`var robot = new MyRobot();` postfix) with a resolver that also finds `x`, `x.js` and `x/index.js` in subdirectories.
It is still local and offline. `compile.tsv` records which path built each entrant (`engine`, `lenient` or `copy`);
`--strict` disables the fallback.

## Toolchain and cache

`tools/install_compile_toolchain.sh` installs the Java/Python toolchain into `$BC19_TOOLCHAIN` (default
`~/projects/vibe/bc19-toolchain`), every download pinned by checksum (`--verify` re-checks). Bundles are cached by a
hash of language, toolchain id, sources and starter code in `$BC19_COMPILE_CACHE` (default `~/.cache/bc19-compile`).
`node tools/compile_bot.js --check` lists which toolchains are present.
