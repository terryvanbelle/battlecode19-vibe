#!/usr/bin/env python3
"""Tests of the bc19-specific replica logic: saturn's submission classifier, archive extraction, map names, game
sides and tallies, the replay archive; the field roster and challenge picker (field.py); contest19's scrimmage plan;
client neighbours/team names; the map picker (maps.py). Standard library only, no network, no game.
Run: python3 test/galaxy19/test_galaxy19_tools.py (also run by test/galaxy19.test.js in tools/unit-tests.sh)
"""
import io
import json
import os
import random
import sys
import tempfile
import unittest
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
GALAXY = os.path.join(REPO, 'tools', 'galaxy19')
for p in (os.path.join(GALAXY, 'standins'), GALAXY):
    if p not in sys.path:
        sys.path.insert(0, p)
TMP = tempfile.mkdtemp(prefix='galaxy19-tools-test-')
os.environ.setdefault('GALAXY_HOME', os.path.join(TMP, 'home'))
os.environ.setdefault('GALAXY_STORAGE_ROOT', os.path.join(TMP, 'storage'))
os.environ.setdefault('GALAXY_BASE_HOST', '1-2-3-4.sslip.io')

import client as cl  # noqa: E402
import contest19  # noqa: E402
import field  # noqa: E402
import maps as mp  # noqa: E402
import saturn  # noqa: E402


def zbytes(entries):
    b = io.BytesIO()
    with zipfile.ZipFile(b, 'w') as z:
        for name, data in entries.items():
            z.writestr(name, data)
    return b.getvalue()


def touch(root, rel, text='x'):
    p = os.path.join(root, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w') as fh:
        fh.write(text)
    return p


def team(i, rating, active=True, status='R'):
    return {'id': i, 'name': f't{i}', 'rating': rating, 'active': active, 'status': status}


class Classify(unittest.TestCase):
    def test_kinds(self):
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'a/robot.js'), touch(d, 'a/util.js'), touch(d, 'a/deep/robot.js')
            self.assertEqual(saturn.classify_source(d), ('js', os.path.join(d, 'a')))
        with tempfile.TemporaryDirectory() as d:
            p = touch(d, 'bot.js')
            touch(d, '.hidden.js'), touch(d, '__MACOSX/x.js'), touch(d, 'node_modules/y.js')
            self.assertEqual(saturn.classify_source(d), ('bundle', p))
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'a.js'), touch(d, 'b.js')
            kind, why = saturn.classify_source(d)
            self.assertIsNone(kind)
            self.assertIn('no robot.js', why)
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'src/Helper.java'), touch(d, 'src/bot/MyRobot.java')
            self.assertEqual(saturn.classify_source(d), ('java', os.path.join(d, 'src', 'bot')))
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'p/robot.py'), touch(d, 'p/x.py')
            self.assertEqual(saturn.classify_source(d), ('python', os.path.join(d, 'p')))
        with tempfile.TemporaryDirectory() as d:
            touch(d, 'README')
            self.assertIsNone(saturn.classify_source(d)[0])


class Extract(unittest.TestCase):
    def test_ok(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertIsNone(saturn.safe_extract(zbytes({'x/robot.js': 'a', 'y.txt': 'b'}), d))
            with open(os.path.join(d, 'x', 'robot.js')) as fh:
                self.assertEqual(fh.read(), 'a')

    def test_rejects(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertIn('malformed', saturn.safe_extract(b'not a zip', d))
            self.assertIn('illegal path', saturn.safe_extract(zbytes({'../evil': 'a'}), d))
            self.assertIn('limit', saturn.safe_extract(zbytes({'big': 'x' * 100}), d, limit=10))
            b = io.BytesIO()
            with zipfile.ZipFile(b, 'w') as z:
                info = zipfile.ZipInfo('link')
                info.external_attr = (0o120777 << 16)
                z.writestr(info, '/etc/passwd')
            self.assertIn('symbolic link', saturn.safe_extract(b.getvalue(), d))
            self.assertFalse(os.path.exists(os.path.join(os.path.dirname(d), 'evil')))


class Games(unittest.TestCase):
    def test_parse_maps(self):
        self.assertEqual(saturn.parse_maps(['seed-1', 'seed-2822']), [1, 2822])
        for bad in ([], 'seed-1', ['seed-0'], ['seed-01'], ['maptestsmall'], [3], ['seed-12345678901']):
            with self.assertRaises(ValueError):
                saturn.parse_maps(bad)

    def test_sides_and_tally(self):
        self.assertEqual([saturn.sides(i, True) for i in range(3)], [('A', 'B'), ('B', 'A'), ('A', 'B')])
        self.assertEqual([saturn.sides(i, False) for i in range(2)], [('A', 'B'), ('A', 'B')])
        self.assertEqual(saturn.tally([{'winner_label': 'A'}, {'winner_label': 'B'}, {'winner_label': 'A'}]), [2, 1])
        with self.assertRaises(RuntimeError):
            saturn.tally([{'winner_label': None}])

    def test_archive(self):
        with tempfile.TemporaryDirectory() as d:
            g = touch(d, 'g.bc19', 'replay')
            out = os.path.join(d, 'm.zip')
            saturn.write_replay_archive(out, [('game-01-seed5.bc19', g)], {'winner': 'A'})
            with zipfile.ZipFile(out) as z:
                self.assertEqual(sorted(z.namelist()), ['game-01-seed5.bc19', 'match.json'])
                self.assertTrue(all(i.compress_type == zipfile.ZIP_STORED for i in z.infolist()))
                self.assertEqual(json.loads(z.read('match.json')), {'winner': 'A'})

    def test_runtime_cmd(self):
        rt = saturn.Runtime(root='/r', sandbox=['/bin/sh', 'sb.sh'])
        self.assertEqual(rt.cmd('/w', ['node', 'x']), ['/bin/sh', 'sb.sh', '/w', 'node', 'x'])
        self.assertEqual(saturn.Runtime(root='/r', sandbox=[]).cmd('/w', ['node']), ['node'])
        self.assertTrue(saturn.Runtime(root='/r').sandbox[-1].endswith('sandbox.sh'))
        self.assertLessEqual(saturn.MAX_EXECUTE_SLOTS, 5)
        argv = rt.game_argv('/w/a.js', '/w/b.js', 7, '/w/r.bc19', '/w/o.json')
        self.assertEqual(argv[0], '/r/bin/node')
        self.assertEqual(argv[1], f'--max-old-space-size={saturn.GAME_HEAP_MB}')   # bounded memory per game
        self.assertLessEqual(saturn.GAME_HEAP_MB * saturn.MAX_EXECUTE_SLOTS, 11 * 1024)  # within the unit's MemoryMax (12G)
        self.assertEqual(argv[2:], ['/r/tools/run_game.js', '--red', '/w/a.js', '--blue', '/w/b.js', '--seed', '7',
                                    '--replay', '/w/r.bc19', '--json', '/w/o.json', '--init-ms', str(saturn.INIT_MS)])
        self.assertGreaterEqual(saturn.INIT_MS, 100)   # never stricter than the engine's own rule


class Field(unittest.TestCase):
    def test_roster(self):
        with tempfile.TemporaryDirectory() as repo, tempfile.TemporaryDirectory() as bench:
            touch(repo, 'tools/bench/roster.tsv',
                  'name\tcompile\tsmoke\ngood\tok\tok\ncrashy\tok\tcrash\nbroken\tfail\t-\nmissing\tok\tok\n'
                  + 'x' * 40 + '\tok\tok\n')
            touch(bench, 'compiled/good/bot.js'), touch(bench, 'compiled/crashy/bot.js')
            touch(bench, 'compiled/' + 'x' * 40 + '/bot.js')
            rows = {r['entrant']: r for r in field.read_field(repo, bench)}
            self.assertEqual(rows['good']['path'], os.path.join(bench, 'compiled', 'good', 'bot.js'))
            self.assertEqual(rows['crashy']['note'], 'smoke crash')
            self.assertEqual(rows['broken']['note'], 'compile fail')
            self.assertEqual(rows['missing']['note'], 'no compiled bundle')
            self.assertLessEqual(len(rows['x' * 40]['team']), 32)
            ent = field.entrants(repo=repo, bench=bench)
            self.assertEqual(ent[0]['team'], field.STARTER_TEAM)
            self.assertEqual([r['entrant'] for r in field.entrants('good', repo, bench)], ['good'])

    def test_compile_tsv_fallback(self):
        with tempfile.TemporaryDirectory() as repo, tempfile.TemporaryDirectory() as bench:
            touch(bench, 'compile.tsv', 'name\tstatus\na\tok\nb\terror\n../../etc\tok\n')
            touch(bench, 'compiled/a/bot.js')
            rows = {r['entrant']: r for r in field.read_field(repo, bench)}
            self.assertIsNotNone(rows['a']['path'])
            self.assertEqual(rows['b']['note'], 'compile error')
            self.assertIsNone(rows['../../etc']['path'])

    def test_pick_challenge(self):
        ladder = [team(1, 100), team(2, 110), team(3, 120), team(4, 130), team(5, 90, active=False), team(6, 140)]
        rnd = random.Random(1)
        for _ in range(50):
            ch, opp, ranked = field.pick_challenge(ladder, {'a': 1, 'b': 2, 'f': 6}, rnd)
            me = {'a': 1, 'b': 2, 'f': 6}[ch]
            mine = next(t for t in ladder if t['id'] == me)['rating']
            self.assertNotEqual(opp['id'], me)
            self.assertTrue(opp['active'])
            self.assertEqual(ranked, opp['rating'] >= mine)
            if ch == 'f':
                self.assertFalse(ranked)       # top team: nobody above, so unranked downward
        self.assertIsNone(field.pick_challenge(ladder, {'z': 5}, rnd))
        self.assertIsNone(field.pick_challenge(ladder, {}, rnd))

    def test_boost_opponents(self):
        ladder = [team(1, 1700), team(2, 1500), team(3, 900), team(4, 700), team(5, 0), team(6, 0),
                  team(7, 1200, active=False), team(8, 600)]
        ids = lambda xs: [t['id'] for t in xs]  # noqa: E731
        # Unrated team: anyone who has played, spread from the top; never itself, an inactive team or an unrated one.
        self.assertEqual(ids(field.boost_opponents(ladder, 5, 2)), [1, 3])
        self.assertEqual(ids(field.boost_opponents(ladder, 5, 5)), [1, 2, 3, 4, 8])
        self.assertEqual(ids(field.boost_opponents(ladder, 5, 7)), [1, 2, 3, 4, 8, 1, 2])
        # Rated team: only at or above it (galaxy's ranked rule).
        self.assertEqual(ids(field.boost_opponents(ladder, 4, 4)), [1, 2, 3, 1])
        self.assertEqual(field.boost_opponents(ladder, 1, 3), [])
        self.assertEqual(field.boost_opponents(ladder, 99, 3), [])

    def test_queue_census(self):
        m = lambda i, st, ranked=True: {'id': i, 'status': st, 'is_ranked': ranked,  # noqa: E731
                                        'participants': [{'teamname': f'a{i}'}, {'teamname': f'b{i}'}]}
        q = field.queue_census([m(1, 'OK!'), m(2, 'QUE'), m(3, 'QUE', False), m(4, 'NEW'), m(5, 'TRY'), m(6, 'RUN'),
                                m(7, 'ERR')])
        self.assertEqual(q['by_status'], {'OK!': 1, 'QUE': 2, 'NEW': 1, 'TRY': 1, 'RUN': 1, 'ERR': 1})
        self.assertEqual((q['waiting'], q['ranked']), (4, 3))
        self.assertEqual(q['live'], [(5, 'TRY', ['a5', 'b5']), (6, 'RUN', ['a6', 'b6'])])

    def test_trickle_order(self):
        with tempfile.TemporaryDirectory() as bench:
            g = lambda n, side, reason='castles', init=0: json.dumps(  # noqa: E731
                {'name': n, 'side': side, 'reason': reason, 'bot': {'init_fail': init}})
            touch(bench, 'smoke.jsonl', '\n'.join([
                g('clean', 'red'), g('clean', 'blue'), g('half', 'red'), g('half', 'blue', 'init_failure', 3),
                g('loady', 'red', 'health', 40), g('loady', 'blue', 'health', 9), 'not json',
                g('dead', 'red', 'init_failure', 3), json.dumps({'name': 'dead', 'side': 'blue', 'error': 'x'})]))
            tier = field.smoke_tier(bench)
            self.assertEqual(tier, {'clean': 0, 'half': 1, 'loady': 1, 'dead': 3})
            self.assertEqual(field.smoke_tier(os.path.join(bench, 'nowhere')), {})
        rows = [{'team': n, 'entrant': n, 'path': None if n == 'nobundle' else '/b/' + n, 'note': ''}
                for n in ('dead', 'fresh', 'half', 'nobundle', 'clean', 'up', 'loady', 'later')]
        acc = {'up': {'team_id': 7, 'digest': 'abc'}, 'half': {'team_id': 8}}   # half: registered, upload failed
        nx = lambda a, k: [r['team'] for r in field.next_entrants(a, rows, k, tier, lambda p: 'h' + p)]  # noqa: E731
        self.assertEqual(nx(acc, 4), ['clean', 'half', 'loady', 'fresh'])
        self.assertEqual(nx(acc, 99)[4:], ['later', 'dead'])
        self.assertEqual(nx(acc, 0), [])
        renamed = dict(acc, old={'team_id': 9, 'digest': 'h/b/clean'})          # clean's bundle, seeded under another name
        self.assertEqual(nx(renamed, 2), ['half', 'loady'])
        twins = [r['team'] for r in field.next_entrants(acc, rows, 3, tier, lambda p: 'same')]
        self.assertEqual(twins, ['clean'])                                  # identical bundles: the first one only

    def test_our_team_never_challenges(self):
        self.assertIn('vibe19', field.OUR_TEAMS)


class Contest(unittest.TestCase):
    def test_plan(self):
        ladder = [team(i, 100 + 10 * i) for i in range(1, 8)]
        plan = contest19.plan_scrims(ladder, 4, 4, 3)
        self.assertEqual([(t['id'], r) for t, r in plan], [(5, True), (3, False), (6, True), (2, False)])
        plan = contest19.plan_scrims(ladder, 4, 6, 3, waiting_ids={5})
        self.assertEqual([(t['id'], r) for t, r in plan], [(6, True), (3, False), (7, True), (2, False), (1, False)])
        self.assertEqual([t['id'] for t, r in contest19.plan_scrims(ladder, 7, 2, 3)], [6, 5])
        self.assertEqual(contest19.plan_scrims(ladder, 99, 3, 3), [])

    def test_named(self):
        ladder = [team(i, 100 + 10 * i) for i in range(1, 8)]
        ladder[0]['rating'] = None   # never played
        got = contest19.named(ladder, 4, [ladder[5]['name'], ladder[0]['name']])
        self.assertEqual([(t['id'], r) for t, r in got], [(6, True), (1, False)])   # ranked only upward
        with self.assertRaises(SystemExit):
            contest19.named(ladder, 4, ['no such team'])

    def test_opponent(self):
        m = {'participants': [{'team': 1, 'score': 2}, {'team': 2, 'score': 1}]}
        self.assertEqual(contest19.opponent(m, 2), ({'team': 2, 'score': 1}, {'team': 1, 'score': 2}))
        self.assertEqual(contest19.opponent({}, 1), (None, None))


class Client(unittest.TestCase):
    def test_neighbours(self):
        ladder = [team(1, 100), team(2, 100), team(3, 105), team(4, 95), team(5, None), team(6, 200, status='S')]
        above, below = cl.neighbours(ladder, 1, 3)
        self.assertEqual([t['id'] for t in above], [2, 3])
        self.assertEqual([t['id'] for t in below], [4])
        self.assertEqual(cl.neighbours(ladder, 5, 3), ([], []))

    def test_team_name(self):
        self.assertEqual(cl.team_name('abc'), 'abc')
        self.assertEqual(cl.team_name('a bé'), 'a_b_')
        long_a, long_b = cl.team_name('y' * 50), cl.team_name('y' * 49 + 'z')
        self.assertEqual(len(long_a), 32)
        self.assertNotEqual(long_a, long_b)


class Maps(unittest.TestCase):
    def test_pick_stratified_and_stable(self):
        rows = []
        for s in range(1, 200):
            rows.append({'seed': str(s), 'valid': '1' if s % 7 else '0', 'size': str(32 + s % 33),
                         'castles': str(1 + s % 3), 'sym': 'H' if s % 2 else 'V'})
        a, b = mp.pick(rows, 20), mp.pick(list(reversed(rows)), 20)
        self.assertEqual(a, b)
        self.assertEqual(len(set(a)), 20)
        self.assertTrue(all(s % 7 for s in a))
        self.assertEqual(len({(r['sym'], r['castles']) for r in rows if int(r['seed']) in a[:6]}), 6)

    def test_maps_txt(self):
        with open(os.path.join(GALAXY, 'maps.txt')) as fh:
            names = [l.split('#')[0].strip() for l in fh]
        names = [n for n in names if n]
        self.assertGreaterEqual(len(names), 10)
        saturn.parse_maps(names)


if __name__ == '__main__':
    unittest.main()
