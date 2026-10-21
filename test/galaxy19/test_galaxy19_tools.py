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
        self.assertLessEqual(saturn.MAX_EXECUTE_SLOTS, 4)


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
