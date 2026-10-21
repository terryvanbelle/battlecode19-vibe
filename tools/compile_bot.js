#!/usr/bin/env node
// Offline compiler for Battlecode 2019 bots in JavaScript, Java and Python. Never contacts battlecode.org.
//
//   node tools/compile_bot.js <bot dir> -o <bundle.js> [--no-cache] [--keep] [--quiet] [--strict]
//        (--strict: JS only through the engine's own compiler, no lenient fallback; see compileJSLenient)
//   node tools/compile_bot.js --check            (prints which toolchains are installed; exit 0 if all are)
//
// Language detection: robot.js -> the engine's own local rollup (Compiler.JS, as tools/run_game.js does);
// *.java (with MyRobot.java) -> JSweet 2.0.0-SNAPSHOT (2017-08-29 build) + TypeScript 2.1.6 on JDK 8, exactly the jars the
// official transpiler service ran (battlecode19/transpiler); robot.py -> Transcrypt 3.7.13 on CPython 3.6 with the
// service's flags (-n -m -b -p .none). The service's output is then post-processed exactly as the engine's
// compiler.js does after its POST, so the bundle has the same format the engine's Compiler produces: CrossVM
// (engine/node_modules/bc19/vm.js) runs it and it defines `robot` with `_do_turn`.
//
// Java and Python are transpiled inside tools/compile_sandbox.sh: new user/net/mount/pid namespaces (no network),
// chroot into a minimal root where only the toolchain (read-only) and a fresh temp dir are visible; Transcrypt runs
// through tools/transcrypt_safe.py, which closes its compile-time eval/exec/subprocess paths. Docs: docs/compile.md.
//
// Bundles are cached by a hash of the language, the toolchain id, the bot sources and the starter code
// ($BC19_COMPILE_CACHE, default ~/.cache/bc19-compile). Toolchain location: $BC19_TOOLCHAIN (default
// ~/projects/vibe/bc19-toolchain, installed by tools/install_compile_toolchain.sh).
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn, execFileSync } = require('child_process');

const ENGINE = path.join(__dirname, '..', 'engine', 'node_modules', 'bc19');
const TOOLCHAIN = process.env.BC19_TOOLCHAIN || path.join(os.homedir(), 'projects', 'vibe', 'bc19-toolchain');
const CACHE = process.env.BC19_COMPILE_CACHE || path.join(os.homedir(), '.cache', 'bc19-compile');
const SANDBOX = path.join(__dirname, 'compile_sandbox.sh');
const WRAPPER = path.join(__dirname, 'transcrypt_safe.py');
// Bump FORMAT whenever the post-processing below or the sandboxed invocation changes the output.
const FORMAT = 1;
const TOOLCHAIN_ID = 'jsweet-2.0.0-20170829.164109-239+ts-2.1.6+temurin-8u504b01|transcrypt-3.7.13+cpython-3.6.15';

const JSWEET_JARS = ['jsweet-transpiler-2.0.0-20170829.164109-239', 'java-cup-10k', 'jflex-1.3.5', 'commons-lang3-3.3.2',
  'commons-io-2.4', 'log4j-1.2.17', 'gson-2.2.4', 'jsap-2.1', 'closure-compiler-v20161201',
  'closure-compiler-externs-v20161201', 'args4j-2.33', 'guava-20.0', 'protobuf-java-3.0.2', 'jsr305-3.0.1',
  'jsinterop-annotations-1.0.0'];
const JAVA_TIMEOUT_MS = 300000, PYTHON_TIMEOUT_MS = 120000;

function toolchainStatus() {
  const has = p => fs.existsSync(path.join(TOOLCHAIN, p));
  const java = has('jdk8/bin/java') && has('jdk8/lib/tools.jar') && has('jsweet-home/.jsweet-node_modules/bin/tsc')
    && JSWEET_JARS.concat(['jsweet-core-5-20170726', 'gson-2.7']).every(j => has('jsweet/lib/' + j + '.jar'));
  const python = has('python3.6/bin/python3.6') && has('transcrypt/transcrypt/__main__.py');
  let sandbox = false;
  try { execFileSync('unshare', ['-r', '-n', '-m', 'true'], { stdio: 'ignore' }); sandbox = fs.existsSync('/usr/sbin/chroot'); } catch (e) { /* no userns */ }
  return { toolchain: TOOLCHAIN, java, python, sandbox };
}

// Read a bot directory and detect its language. Only top-level regular files are considered (as the bc19 CLI does).
function readBot(dir) {
  const names = fs.readdirSync(dir).filter(f => !f.startsWith('.') && fs.statSync(path.join(dir, f)).isFile()).sort();
  const files = ext => names.filter(f => f.endsWith(ext)).map(f => ({ filename: f, source: fs.readFileSync(path.join(dir, f), 'utf8') }));
  if (names.includes('robot.js')) return { lang: 'js', files: files('.js') };
  if (names.some(f => f.endsWith('.java'))) return { lang: 'java', files: files('.java') };
  if (names.includes('robot.py')) return { lang: 'python', files: files('.py') };
  throw new Error(dir + ': no robot.js, *.java or robot.py');
}

function starterFor(lang) {
  if (lang === 'java') return require(path.join(ENGINE, 'starter', 'java_starter'));
  if (lang === 'python') return { 'battlecode.py': require(path.join(ENGINE, 'starter', 'python_starter')) };
  return { battlecode: require(path.join(ENGINE, 'starter', 'js_starter')) };
}

function sourceHash(lang, files) {
  const h = crypto.createHash('sha256');
  const engineVersion = require(path.join(ENGINE, 'package.json')).version;
  h.update(JSON.stringify({ FORMAT, lang, engineVersion, toolchain: lang === 'js' ? 'engine-rollup' : TOOLCHAIN_ID }));
  if (lang === 'python') h.update(fs.readFileSync(WRAPPER));
  for (const f of files) h.update('\0' + f.filename + '\0' + f.source);
  const st = starterFor(lang);
  for (const k of Object.keys(st).sort()) h.update('\0starter:' + k + '\0' + st[k]);
  return h.digest('hex');
}

// Run argv inside the compile sandbox with `work` mounted at /work. Resolves {code, out}.
function runSandboxed(work, argv, timeoutMs) {
  const newRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'bc19c-root-'));
  const nodeBin = path.dirname(fs.realpathSync(process.execPath));
  const args = ['-r', '-n', '-m', '-p', '-f', '--kill-child', '--propagation', 'private',
    'sh', SANDBOX, newRoot, TOOLCHAIN, work, nodeBin, WRAPPER, ...argv];
  return new Promise((resolve) => {
    const p = spawn('unshare', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    const add = d => { if (out.length < 4e6) out += d; };
    p.stdout.on('data', add); p.stderr.on('data', add);
    let timedOut = false;
    const t = setTimeout(() => { timedOut = true; p.kill('SIGKILL'); }, timeoutMs);
    p.on('close', code => {
      clearTimeout(t);
      try { fs.rmdirSync(newRoot); } catch (e) { /* ignore */ }
      resolve({ code: timedOut ? -1 : code, out: timedOut ? out + '\ncompile timed out after ' + timeoutMs + ' ms' : out });
    });
  });
}

function mkWork() { return fs.mkdtempSync(path.join(os.tmpdir(), 'bc19c-work-')); }

// --- JavaScript: the engine's own local compiler (rollup), no network. ---
function compileJS(files) {
  const Compiler = require(path.join(ENGINE, 'compiler'));
  // The engine's Java/Python paths POST source to battlecode.org/compile (CLAUDE.md rule 5): disable them outright.
  Compiler.Java = Compiler.Python = () => { throw new Error('engine Java/Python compile (battlecode.org) is disabled'); };
  return new Promise((resolve, reject) => Compiler.JS(files, resolve, e => reject(new Error('compile error: ' + e))));
}

// --- JavaScript fallback, used only when the engine's compiler refuses the bot: the same rollup bundle (cjs, same
// starter, same `var robot = new MyRobot();` postfix), but modules may sit in subdirectories and be imported without
// the .js extension (both rejected by the engine 0.4.7 compiler's flat virtual file system; later CLI versions and
// the teams' own build scripts accepted them). Still local and offline; bot code is parsed, never run.
async function compileJSLenient(dir) {
  const rollup = require(require.resolve('rollup', { paths: [ENGINE] }));
  const mods = {};
  const walk = rel => {
    for (const f of fs.readdirSync(path.join(dir, rel)).sort()) {
      if (f.startsWith('.') || f === 'node_modules') continue;
      const r = rel ? rel + '/' + f : f, st = fs.statSync(path.join(dir, r));
      if (st.isDirectory()) walk(r);
      else if (st.isFile() && f.endsWith('.js')) mods[r] = fs.readFileSync(path.join(dir, r), 'utf8');
    }
  };
  walk('');
  if (!('robot.js' in mods)) throw new Error('No robot.js provided.');
  mods['robot.js'] += '\nvar robot = new MyRobot();';
  const P = '\0bc19:';
  const plugin = {
    name: 'bc19-lenient',
    resolveId(id, importer) {
      if (id === 'battlecode') return P + 'battlecode';
      if (!importer) return id in mods ? P + id : null;
      if (!importer.startsWith(P)) return null;
      const p = path.posix.normalize(path.posix.join(path.posix.dirname(importer.slice(P.length)), id));
      // also relative to the bot dir's parent (bots built from one level up: import './<botdir>/x')
      const top = path.basename(path.resolve(dir)) + '/';
      for (const q of p.startsWith(top) ? [p, p.slice(top.length)] : [p])
        for (const c of [q, q + '.js', q + '/index.js']) if (c in mods) return P + c;
      return null;
    },
    load(id) {
      if (!id.startsWith(P)) return null;
      const k = id.slice(P.length);
      return k === 'battlecode' ? starterFor('js').battlecode : mods[k];
    },
  };
  const bundle = await rollup.rollup({ input: { robot: 'robot.js' }, plugins: [plugin] });
  const out = await bundle.generate({ format: 'cjs' });
  return out.output[0].code;
}

// --- Java: mirrors transpiler/java.py (mvn generate-sources with the jsweet-maven-plugin config of java/pom.xml:
// bundle, sourceMap, targetVersion ES5, verbose; compile classpath jsweet-core 5-20170726 + gson 2.7), then the
// engine's compiler.js postfix. ---
async function compileJava(files, opts) {
  files = files.filter(f => f.filename.endsWith('.java'));
  if (!files.some(f => f.filename === 'MyRobot.java')) throw new Error('Could not find MyRobot.java.');
  const work = mkWork();
  try {
    const src = path.join(work, 'src');
    fs.mkdirSync(src);
    for (const f of files) {
      if (!/^[A-Za-z0-9_$]+\.java$/.test(f.filename)) throw new Error('bad Java file name ' + JSON.stringify(f.filename));
      fs.writeFileSync(path.join(src, f.filename), f.source);
    }
    const starter = starterFor('java'); // written after the bot's files, as the service did (starter files win)
    for (const k of Object.keys(starter)) fs.writeFileSync(path.join(src, k), starter[k]);
    const L = '/tc/jsweet/lib/';
    const cp = JSWEET_JARS.map(j => L + j + '.jar').concat(['/tc/jdk8/lib/tools.jar']).join(':');
    const argv = ['/tc/jdk8/bin/java', '-Xmx700m', '-Xss8m', '-Duser.home=/tc/jsweet-home', '-cp', cp,
      'org.jsweet.JSweetCommandLineLauncher', '--jdkHome', '/tc/jdk8', '-i', '/work/src', '--tsout', '/work/target/.ts',
      '-o', '/work/target', '--candiesJsOut', '/work/target/candies',
      '--classpath', L + 'jsweet-core-5-20170726.jar:' + L + 'gson-2.7.jar',
      '--bundle', '--sourceMap', '--targetVersion', 'ES5', '-v'];
    const r = await runSandboxed(work, argv, JAVA_TIMEOUT_MS);
    const bundle = path.join(work, 'target', 'bundle.js');
    if (r.code !== 0 || !fs.existsSync(bundle)) {
      const lines = r.out.split('\n');
      const errs = lines.filter(l => /\bERROR\b/.test(l) && !/DEBUG/.test(l)).map(l => l.replace(/\/work\/src\//g, ''));
      throw new Error('Java compile failed:\n' + (errs.length ? errs.join('\n') : lines.slice(-30).join('\n')));
    }
    const js = fs.readFileSync(bundle, 'utf8');
    const SPECS = require(path.join(ENGINE, 'specs'));
    // engine compiler.js Compiler.Java, verbatim postfix
    const postfix = '\nvar specs = ' + JSON.stringify(SPECS) + ';\nvar robot = new bc19.MyRobot(); robot.setSpecs(specs);';
    return js + postfix;
  } finally {
    if (!opts.keep) fs.rmSync(work, { recursive: true, force: true }); else console.error('kept ' + work);
  }
}

// --- Python: mirrors transpiler/python.py (file name filter, `python3 -m transcrypt -n -m -b -p .none robot`,
// success iff the third-to-last output line is "Ready"), then the engine's compiler.js rollup step. ---
async function compilePython(files, opts) {
  files = files.filter(f => f.filename.endsWith('.py'));
  if (!files.some(f => f.filename === 'robot.py')) throw new Error('Could not find robot.py.');
  files = files.concat([{ filename: 'battlecode.py', source: starterFor('python')['battlecode.py'] }]);
  const work = mkWork();
  try {
    for (const f of files) {
      const n = f.filename;
      if (n.length > 20 || !/^[A-Za-z0-9_.]+$/.test(n) || n.split('.').length !== 2 || !n.endsWith('.py')) continue;
      fs.writeFileSync(path.join(work, n), f.source);
    }
    const argv = ['/tc/python3.6/bin/python3.6', '-I', '/wrap/transcrypt_safe.py', '/tc/transcrypt',
      '-n', '-m', '-b', '-p', '.none', 'robot'];
    const r = await runSandboxed(work, argv, PYTHON_TIMEOUT_MS);
    const lines = r.out.split('\n');
    if (r.code !== 0 || lines[lines.length - 3] !== 'Ready') {
      const msg = lines.slice(6, -3).join('\n').replace(/\/work\//g, '');
      throw new Error('Python compile failed:\n' + (msg.trim() || r.out.slice(-3000)));
    }
    const target = path.join(work, '__target__');
    const js = {};
    for (const f of fs.readdirSync(target)) if (f.endsWith('.js')) js[f] = fs.readFileSync(path.join(target, f), 'utf8');
    // engine compiler.js Compiler.Python, verbatim
    const rollup = require(require.resolve('rollup', { paths: [ENGINE] }));   // resolved as the engine's compiler.js does
    const virtual = require(require.resolve('rollup-plugin-virtual', { paths: [ENGINE] }));
    const bundle = await rollup.rollup({ input: { robot: 'robot.js' }, plugins: [virtual(js)] });
    const out = await bundle.generate({ name: 'robot', format: 'esm' });
    const code = out.output[0].code.split('\n');
    code.splice(code.length - 4, 100);
    code.push('var robot = new MyRobot();');
    return code.join('\n');
  } finally {
    if (!opts.keep) fs.rmSync(work, { recursive: true, force: true }); else console.error('kept ' + work);
  }
}

function requireModule(name) {
  try { return require(name); } catch (e) { return require(require.resolve(name, { paths: [ENGINE] })); }
}

// Compile a bot directory. Resolves {code, lang, hash, cached, ms}.
async function compileBotDir(dir, opts = {}) {
  const t0 = Date.now();
  const { lang, files } = readBot(dir);
  const hash = sourceHash(lang, files);
  const cacheFile = path.join(CACHE, hash + '.js');
  if (!opts.noCache && fs.existsSync(cacheFile)) {
    return { code: fs.readFileSync(cacheFile, 'utf8'), lang, hash, cached: true, ms: Date.now() - t0 };
  }
  if (lang !== 'js') {
    const st = toolchainStatus();
    if (!st[lang]) throw new Error(lang + ' toolchain not installed in ' + TOOLCHAIN + ' (tools/install_compile_toolchain.sh)');
    if (!st.sandbox) throw new Error('compile sandbox unavailable (needs unprivileged user namespaces and /usr/sbin/chroot): refusing to compile untrusted source');
  }
  let code, mode = 'engine';
  if (lang === 'js') {
    try { code = await compileJS(files); } catch (e) {
      if (opts.strict) throw e;
      try { code = await compileJSLenient(dir); mode = 'lenient'; } catch (e2) {
        throw new Error(e.message + ' | lenient fallback: ' + String(e2 && e2.message || e2).replace(/\0bc19:/g, ''));
      }
      // depends on files outside the top level, which the cache key does not cover: not cached
      return { code, lang, hash, cached: false, ms: Date.now() - t0, mode };
    }
  } else code = lang === 'java' ? await compileJava(files, opts) : await compilePython(files, opts);
  fs.mkdirSync(CACHE, { recursive: true });
  const tmp = cacheFile + '.' + process.pid + '.tmp';
  fs.writeFileSync(tmp, code);
  fs.renameSync(tmp, cacheFile);
  return { code, lang, hash, cached: false, ms: Date.now() - t0, mode };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--check')) {
    const st = toolchainStatus();
    console.log(JSON.stringify(st));
    process.exit(st.java && st.python && st.sandbox ? 0 : 1);
  }
  let dir = null, out = null;
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-o' || a === '--out') out = argv[++i];
    else if (a === '--no-cache') opts.noCache = true;
    else if (a === '--keep') opts.keep = true;
    else if (a === '--quiet') opts.quiet = true;
    else if (a === '--strict') opts.strict = true;
    else if (a.startsWith('-')) throw new Error('unknown argument ' + a);
    else dir = a;
  }
  if (!dir || !out) throw new Error('usage: compile_bot.js <bot dir> -o <bundle.js> [--no-cache] [--keep] [--quiet] [--strict]');
  const r = await compileBotDir(dir, opts);
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, r.code);
  if (!opts.quiet) console.log(JSON.stringify({ dir, out, lang: r.lang, hash: r.hash.slice(0, 16), cached: r.cached, bytes: r.code.length, ms: r.ms, mode: r.mode || 'engine' }));
}

module.exports = { compileBotDir, toolchainStatus, readBot, sourceHash, TOOLCHAIN, CACHE };
void requireModule;

if (require.main === module) main().catch(e => { console.error(String(e && e.message || e)); process.exit(1); });
