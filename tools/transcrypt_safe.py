# Runs Transcrypt 3.7.13 (the version the official 2019 transpiler service used) on untrusted bot source without
# executing any of it. Called by tools/compile_bot.js inside the compile sandbox (tools/compile_sandbox.sh):
#
#   python3.6 -I transcrypt_safe.py <transcrypt root> <transcrypt args...>     (cwd = the bot's work dir)
#
# Stock Transcrypt runs bot-controlled code at compile time in three places; each is closed here without changing
# the generated JavaScript for ordinary bots:
#   1. __pragma__ ('ifdef'|'ifndef', <expr>) and __pragma__ ('js'|'xtrans', fmt, <expr>...) eval() the expressions
#      with full builtins. We validate the AST first (only string/number literals, __envir__.<attr> and
#      __include__ ('<relative path without ..>') are allowed) and evaluate without builtins.
#   2. __pragma__ ('xtrans', '<command>', ...) runs an arbitrary subprocess: refused.
#   3. Transcrypt puts the source dir first on sys.path, so a bot file named like a stdlib module (ast.py, json.py...)
#      could be imported by the compiler itself: imports resolving into the work dir are refused.
# (JavaScript modules digested by utils.digestJavascript exec() '__pragma__' lines; only string-literal pragma calls
#  are allowed there.)  The -r (run with CPython) flag is never passed by compile_bot.js and is refused here.
import sys
import os
import ast
import builtins
import importlib.machinery

WORK = os.path.realpath(os.getcwd())
TDIR = sys.argv[1]
ARGS = sys.argv[2:]
if any(a in ('-r', '--run', '-ds', '--dstat', '-dt', '--dtype') for a in ARGS):
    sys.stderr.write('transcrypt_safe: refusing flags that execute or import bot code\n')
    sys.exit(2)


def _inside_work(p):
    p = os.path.realpath(p)
    return p == WORK or p.startswith(WORK + os.sep)


sys.path = [p for p in sys.path if p not in ('', '.') and not _inside_work(p)]
sys.path.insert(0, TDIR)
sys.path.append(os.path.join(TDIR, 'transcrypt', 'modules'))


class _BlockWorkImports:
    @staticmethod
    def find_spec(name, path=None, target=None):
        spec = importlib.machinery.PathFinder.find_spec(name, path)
        if spec is None:
            return None
        # origin is a file path, or a marker such as 'namespace' (Python 3.6 namespace packages) that must not be
        # resolved against the cwd; namespace packages are checked through their search locations.
        where = [spec.origin] if spec.origin and os.path.isabs(spec.origin) else []
        where += list(spec.submodule_search_locations or [])
        if any(_inside_work(p) for p in where):
            raise ImportError('transcrypt_safe: compile-time import of bot module %r refused' % name)
        return None

    @staticmethod
    def find_module(name, path=None):  # pre-3.4 protocol, unused
        return None


sys.meta_path.insert(0, _BlockWorkImports)


class UnsafePragma(Exception):
    pass


def _str(node):
    return isinstance(node, ast.Str) or (hasattr(ast, 'Constant') and isinstance(node, ast.Constant)
                                         and isinstance(node.value, str))


def _check_expr(tree):
    for node in ast.walk(tree):
        if isinstance(node, (ast.Expression, ast.Load, ast.Str, ast.Num, ast.NameConstant)):
            continue
        if isinstance(node, ast.Name) and node.id in ('__envir__', '__include__'):
            continue
        if isinstance(node, ast.Attribute) and isinstance(node.value, ast.Name) and node.value.id == '__envir__' \
                and not node.attr.startswith('_'):
            continue
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == '__include__':
            if len(node.args) != 1 or node.keywords or not _str(node.args[0]):
                raise UnsafePragma('__include__ takes one string literal')
            f = node.args[0].s
            if f.startswith('/') or '\\' in f or '..' in f.split('/'):
                raise UnsafePragma('__include__ path must be relative without ..: %r' % f)
            continue
        raise UnsafePragma('expression not allowed in __pragma__ at compile time: %s' % type(node).__name__)


def _checked_compile(source, filename, mode, *a, **k):
    if not isinstance(source, ast.AST):
        raise UnsafePragma('only AST input is compiled at transpile time')
    _check_expr(source)
    return builtins.compile(source, filename, mode, *a, **k)


def _safe_eval(code, g=None, l=None):
    return builtins.eval(code, {'__builtins__': {}}, dict(l or {}))


class _NoSubprocess:
    PIPE = -1

    @staticmethod
    def Popen(*a, **k):
        raise UnsafePragma("__pragma__ ('xtrans', ...) is disabled: it runs external commands")


def _safe_exec(line, g=None, l=None):
    tree = ast.parse(line)
    ok = (len(tree.body) == 1 and isinstance(tree.body[0], ast.Expr) and isinstance(tree.body[0].value, ast.Call)
          and isinstance(tree.body[0].value.func, ast.Name) and tree.body[0].value.func.id == '__pragma__'
          and not tree.body[0].value.keywords and all(_str(x) for x in tree.body[0].value.args))
    if not ok:
        raise UnsafePragma('only string-literal __pragma__ lines are executed in JavaScript modules')
    f = sys._getframe(1)
    return builtins.exec(compile(tree, '<pragma>', 'exec'), f.f_globals if g is None else g,
                         f.f_locals if l is None else l)


def _literal_eval(s, g=None, l=None):
    return ast.literal_eval(s)


# Import Transcrypt's compiler modules first and patch them; transcrypt/__main__ reuses the cached modules.
from org.transcrypt import utils, compiler  # noqa: E402

compiler.compile = _checked_compile
compiler.eval = _safe_eval
compiler.subprocess = _NoSubprocess
utils.exec = _safe_exec
utils.eval = _literal_eval
# transcrypt/__main__ pops 'org' from sys.modules but then reuses our cached 'org.transcrypt', whose namespace-package
# __path__ would look 'org' up again on the next submodule import (KeyError: 'org'): freeze it to a plain list.
sys.modules['org.transcrypt'].__path__ = list(sys.modules['org.transcrypt'].__path__)

import runpy  # noqa: E402

sys.argv = ['transcrypt'] + ARGS
runpy.run_module('transcrypt', run_name='__main__', alter_sys=True)
