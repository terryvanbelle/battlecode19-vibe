#!/usr/bin/env python3
"""Tests of tools/progress/ (pure parts; chart rendering only when matplotlib is importable). Run by
test/progress.test.js (tools/unit-tests.sh) with the system python3: no network, no VM, no replica."""
import contextlib
import io
import json
import math
import os
import sys
import tempfile
import unittest

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'tools', 'progress'))
import attempts  # noqa: E402
import elo  # noqa: E402
import elolib  # noqa: E402
import games  # noqa: E402
import ladder  # noqa: E402
import rating_history  # noqa: E402

ROSTER = 'name\thash\tdate_pdt\tnote\nv0\thash0\t\t\nv1\thash1\t\t\nrush\thashr\t\t\n'


def g(a, b, w, run='batch-out/x', seq=1, **kw):
    return dict({'run': run, 'seq': seq, 'teamA': a, 'teamB': b, 'map': '', 'winner': w, 'rounds': '',
                 'reason': '', 'seed': '', 'a_side': '', 'time': ''}, **kw)


def quiet(f, *a, **kw):
    with contextlib.redirect_stderr(io.StringIO()):
        return f(*a, **kw)


class Base(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.dir = self.tmp.name
        self.roster = os.path.join(self.dir, 'ROSTER.tsv')
        with open(self.roster, 'w') as fh:
            fh.write(ROSTER)
        self._roster, elolib.ROSTER = elolib.ROSTER, self.roster

    def tearDown(self):
        elolib.ROSTER = self._roster
        self.tmp.cleanup()


class TestElolib(Base):
    def test_kinds(self):
        self.assertEqual([elolib.kind(p) for p in ('us:v3', 'cand:h2', 'spar:rush', 'bc19-starter', 'a.b')],
                         ['ours', 'cand', 'spar', 'field', 'field'])
        self.assertEqual(elolib.build_of('us:v3'), 'v3')
        self.assertEqual(elolib.roster_player('v12'), 'us:v12')
        self.assertEqual(elolib.roster_player('rush'), 'spar:rush')
        self.assertEqual(elolib.accepted_builds(), ['us:v0', 'us:v1'])

    def test_fit_recovers_the_odds(self):
        rows = [g('p', 'q', 'A')] * 300 + [g('p', 'q', 'B')] * 100 + [g('q', 'p', 'B')] * 0
        R, SE, n, w = elolib.fit(rows, pair_cap=0)
        self.assertAlmostEqual(R['p'] - R['q'], 400 * math.log10(3), delta=2)
        self.assertAlmostEqual(R['p'] + R['q'], 3000, delta=1e-6)   # symmetric around the anchor
        self.assertEqual((n['p'], w['p'], w['q']), (400, 300, 100))
        self.assertTrue(0 < SE['p'] < 50)

    def test_pair_cap_scales_a_heavy_pair(self):
        big = [g('p', 'q', 'A')] * 750 + [g('p', 'q', 'B')] * 250
        small = [g('p', 'q', 'A')] * 150 + [g('p', 'q', 'B')] * 50
        Rb, SEb, nb, _ = elolib.fit(big)
        Rs, SEs, _, _ = elolib.fit(small, pair_cap=0)
        self.assertAlmostEqual(Rb['p'], Rs['p'], places=6)
        self.assertAlmostEqual(SEb['p'], SEs['p'], places=6)
        self.assertEqual(nb['p'], 1000)   # raw counts stay raw

    def test_perfect_record_is_finite_and_self_play_dropped(self):
        rows = [g('p', 'q', 'A')] * 20 + [g('p', 'p', 'A')]
        R, SE, n, _ = quiet(elolib.fit, rows)
        self.assertTrue(math.isfinite(R['p']) and R['p'] > R['q'])
        self.assertEqual(n['p'], 20)

    def test_field_score_and_records(self):
        R = {'a': 1500, 'b': 1500, 'c': 1900}
        self.assertAlmostEqual(elolib.field_score(R, 'a', ['b']), 0.5)
        self.assertAlmostEqual(elolib.field_score(R, 'c', ['a', 'b']), elolib.expected(1900, 1500))
        rec = elolib.records([g('a', 'b', 'A'), g('b', 'a', 'A'), g('a', 'b', 'A')])
        self.assertEqual(rec['a', 'b'], [2, 3])
        self.assertEqual(rec['b', 'a'], [1, 3])

    def test_write_and_load(self):
        path = os.path.join(self.dir, 'games.csv')
        elolib.write([g('a', 'b', 'A'), g('a', 'b', 'X')], path)
        self.assertEqual(len(quiet(elolib.load, path)), 1)
        self.assertEqual(elolib.load(os.path.join(self.dir, 'missing.csv')), [])


def batch_row(a, b, ah, bh, w, line, **kw):
    return dict({'tag': 't', 'a': a, 'b': b, 'a_hash': ah, 'b_hash': bh, 'seed': 7, 'a_side': 'red',
                 'winner_is_a': w, 'reason': 'castles', 'rounds': 400, 't': '2026-10-21T19:00:00.000Z',
                 '_line': line}, **kw)


class TestGames(Base):
    def test_local_rows_naming_and_skips(self):
        by_hash = {'hash0': 'v0', 'hash1': 'v1', 'hashr': 'rush'}
        rows = [batch_row('src/bot', 'bots/v0', 'hash1', 'hash0', 1, 1),
                batch_row('dist/h2', 'bots/example', 'hh2', 'ex', 0, 2),
                batch_row('dist/h2', 'dist/dev', 'hh2', 'dev1', 1, 3),
                batch_row('dist/dev', 'bots/rush', 'dev2', 'hashr', 1, 4),
                batch_row('dist/h2', 'dist/h1', 'hh2', 'hash1', 1, 5, rounds=0, reason='both_init_failure'),
                batch_row('dist/h2', 'dist/h1', 'hh2', 'hash1', 1, 6, error='spawn failed'),
                batch_row('dist/h2', 'dist/h1', 'hh2', 'hash1', 1, 7, a_team={'init_fail': 0}, b_team={'init_fail': 3})]
        out, skipped = games.local_rows([('batch-out/f', rows)], by_hash)
        self.assertEqual([(r['teamA'], r['teamB'], r['winner']) for r in out],
                         [('us:v1', 'us:v0', 'A'), ('cand:h2', 'bc19-starter', 'B'),
                          ('cand:h2', 'cand:dev@dev1', 'A'), ('cand:dev@dev2', 'spar:rush', 'A')])
        self.assertEqual(dict(skipped), {'init failure': 1, 'error': 1, 'load (robot init failures)': 1})
        r = out[0]
        self.assertEqual((r['run'], r['seq'], r['map'], r['seed'], r['a_side'], r['time']),
                         ('batch-out/f', 1, 'seed-7', 7, 'red', '2026-10-21T19:00:00Z'))

    def test_read_jsonl_tolerates_a_partial_line(self):
        p = os.path.join(self.dir, 'b.jsonl')
        with open(p, 'w') as fh:
            fh.write(json.dumps({'a': 1}) + '\n\n' + json.dumps({'a': 2}) + '\n{"a": 3, "b"')
        rows, bad = games.read_jsonl(p)
        self.assertEqual(([r['_line'] for r in rows], bad), ([1, 3], 1))

    def test_submission_players(self):
        subs = [{'id': 1, 'description': 'src/bot @ f06db2e'}, {'id': 7, 'description': 'v3: rewrite'},
                {'id': 9, 'description': 'something else'}, {'id': 10, 'description': 'rush'}]
        out = games.submission_players(subs, {1: 'v1'}, {'v1', 'v3', 'rush'})
        self.assertEqual(out, {1: 'us:v1', 7: 'us:v3', 9: 'us:sub9', 10: 'spar:rush'})

    def test_replica_rows_archive_and_scores(self):
        replays = os.path.join(self.dir, 'replays')
        os.makedirs(os.path.join(replays, '5'))
        mj = {'teams': {'A': 'starter', 'B': 'vibe19'}, 'games': [
            {'game': 1, 'map': 'seed-1', 'seed': 1, 'red': 'A', 'winner_label': 'B', 'rounds': 150, 'reason': 'castles'},
            {'game': 2, 'map': 'seed-2', 'seed': 2, 'red': 'B', 'winner_label': 'B', 'rounds': 0, 'reason': 'init_failure'},
            {'game': 3, 'map': 'seed-3', 'seed': 3, 'red': 'B', 'winner_label': 'A', 'rounds': 990, 'reason': 'health'}]}
        with open(os.path.join(replays, '5', 'match.json'), 'w') as fh:
            json.dump(mj, fh)

        def match(i, p0, s0, p1, s1, status='OK!', sub=None):
            return {'id': i, 'status': status, 'created': '2026-10-21T15:00:00-04:00', 'participants': [
                {'teamname': p0, 'score': s0, 'player_index': 0, 'submission': sub if p0 == 'vibe19' else None},
                {'teamname': p1, 'score': s1, 'player_index': 1, 'submission': sub if p1 == 'vibe19' else None}]}
        bundle = {'team': 'vibe19', 'matches': [match(5, 'starter', 1, 'vibe19', 2), match(6, 'x', 2, 'y', 1),
                                                match(7, 'x', None, 'y', None, status='RUN'),
                                                match(8, 'vibe19', 3, 'y', 0)],
                  'ours': [match(5, 'starter', 1, 'vibe19', 2, sub=7), match(8, 'vibe19', 3, 'y', 0, sub=1)]}
        out, n = games.replica_rows(bundle, replays, {7: 'us:v3', 1: 'us:v1'})
        got = [(r['run'], r['seq'], r['teamA'], r['teamB'], r['winner'], r['a_side'], r['reason']) for r in out]
        self.assertEqual(got, [
            ('galaxy-5', 1, 'starter', 'us:v3', 'B', 'red', 'castles'),
            ('galaxy-5', 3, 'starter', 'us:v3', 'A', 'blue', 'health'),
            ('galaxy-6', 1, 'x', 'y', 'A', '', 'score'), ('galaxy-6', 2, 'x', 'y', 'A', '', 'score'),
            ('galaxy-6', 3, 'x', 'y', 'B', '', 'score'),
            ('galaxy-8', 1, 'us:v1', 'y', 'A', '', 'score'), ('galaxy-8', 2, 'us:v1', 'y', 'A', '', 'score'),
            ('galaxy-8', 3, 'us:v1', 'y', 'A', '', 'score')])
        self.assertEqual(out[0]['time'], '2026-10-21T19:00:00Z')
        self.assertEqual((n['matches from archives'], n['matches from scores'], n['archive games skipped']), (1, 2, 1))

    def test_build_end_to_end(self):
        cache = os.path.join(self.dir, 'cache')
        os.makedirs(os.path.join(cache, 'batches', 'out'))
        with open(os.path.join(cache, 'batches', 'out', 'v1_v0.jsonl'), 'w') as fh:
            for i in range(3):
                r = batch_row('bots/v1', 'bots/v0', 'hash1', 'hash0', i % 2, 0)
                r.pop('_line')
                fh.write(json.dumps(r) + '\n')
        bundle = {'team': 'vibe19', 'fetched_at': '2026-10-21T20:00:00+00:00',
                  'submissions': [{'id': 2, 'description': 'v1', 'accepted': True}],
                  'matches': [{'id': 9, 'status': 'OK!', 'created': '2026-10-21T21:00:00+00:00', 'participants': [
                      {'teamname': 'vibe19', 'score': 2, 'player_index': 0}, {'teamname': 'z', 'score': 1, 'player_index': 1}]}],
                  'ours': [{'id': 9, 'participants': [{'teamname': 'vibe19', 'submission': 2}]}]}
        with open(os.path.join(cache, 'replica.json'), 'w') as fh:
            json.dump(bundle, fh)
        rows, summary = games.build(cache, os.path.join(self.dir, 'none'), self.roster, os.path.join(self.dir, 'no.tsv'))
        self.assertEqual([(r['run'], r['teamA'], r['teamB'], r['winner']) for r in rows], [
            ('batch-out/v1_v0', 'us:v1', 'us:v0', 'B'), ('batch-out/v1_v0', 'us:v1', 'us:v0', 'A'),
            ('batch-out/v1_v0', 'us:v1', 'us:v0', 'B'), ('galaxy-9', 'us:v1', 'z', 'A'),
            ('galaxy-9', 'us:v1', 'z', 'A'), ('galaxy-9', 'us:v1', 'z', 'B')])
        self.assertIn('local: 3 games from 1 batch files', summary[0])


def sample_rows():
    rows = []
    for i in range(30):
        rows.append(g('us:v1', 'us:v0', 'A' if i < 20 else 'B', seq=i))
        rows.append(g('us:v1', 'starter', 'A' if i < 25 else 'B', run=f'galaxy-{i}', seq=1))
        rows.append(g('fieldx', 'starter', 'A' if i < 15 else 'B', run=f'galaxy-{100 + i}', seq=1))
    rows += [g('cand:h2', 'us:v1', 'A', seq=99), g('cand:h2', 'us:v1', 'B', seq=98)]
    return rows


class TestElo(Base):
    def test_analyse_and_render(self):
        rows = sample_rows()
        bundle = {'team': 'vibe19', 'rankings': [{'name': 'starter'}, {'name': 'vibe19'}, {'name': 'fieldx'},
                                                 {'name': 'unmet'}]}
        a = quiet(elo.analyse, rows, bundle)
        self.assertEqual(sorted(a['field']), ['fieldx', 'starter'])
        self.assertEqual(a['incumbent'], 'us:v1')
        self.assertEqual(a['played'], ['us:v0', 'us:v1'])
        self.assertEqual(a['unmet'], ['unmet'])
        self.assertEqual(a['ours'][:2], ['us:v0', 'us:v1'])
        self.assertEqual(elo.our_record(a, 'starter'), '83% (v1 25-5)')
        md = elo.render_md(rows, a, bundle, ['local: 62 games'])
        self.assertIn('| v1 | accepted |', md)
        self.assertIn('| h2 | candidate |', md)
        self.assertIn('Replica teams with no recorded game: unmet.', md)
        self.assertIn('- local: 62 games', md)
        self.assertIn('| us:v1 | starter | 30 | 25-5 | 83% | replica |', md)


class TestAttempts(Base):
    def test_set_fields(self):
        rows = []
        attempts.set_fields(rows, 'h9', ['base=v3', 'h2h=12/20 vs v3', 'h2h+=again 11/20'])
        self.assertEqual((rows[0]['base'], rows[0]['h2h']), ('v3', '12/20 vs v3; again 11/20'))
        with self.assertRaises(SystemExit):
            attempts.set_fields(rows, 'h9', ['nosuch=1'])
        with self.assertRaises(SystemExit):
            attempts.set_fields(rows, 'h9', ['=1'])

    def test_games_cell_and_missing(self):
        rows = sample_rows()
        self.assertEqual(attempts.games_cell('us:v1', rows),
                         'vs starter 25-5 (replica); vs v0 20-10; vs h2 1-1')
        att = [{'codename': 'v1', 'build': 'us:v1'}, {'codename': 'h2', 'build': ''}]
        self.assertEqual(attempts.missing(att, rows), ['us:v0'])

    def test_render_and_save_roundtrip(self):
        path, md = os.path.join(self.dir, 'a.csv'), os.path.join(self.dir, 'A.md')
        rows = []
        attempts.set_fields(rows, 'v1', ['date=2026-10-21 07:18', 'build=us:v1', 'outcome=ACCEPTED (v1)',
                                          'description=a | b'])
        attempts.set_fields(rows, 'h2', ['date=2026-10-21 10:45', 'outcome=in progress'])
        attempts.save(rows, path)
        back = attempts.load(path)
        self.assertEqual([r['codename'] for r in back], ['v1', 'h2'])
        attempts.render(back, sample_rows(), md)
        with open(md) as fh:
            text = fh.read()
        self.assertIn('Totals: 1 accepted, 1 in progress (2 rows).', text)
        self.assertIn('a \\| b', text)
        self.assertIn('vs v1 1-1', text)


class TestReplicaViews(Base):
    def test_rating_history(self):
        hist = {'team_rating': {'rating_history': [{'rating': 300, 'timestamp': '2026-10-21T13:00:00-04:00'},
                                                   {'rating': 200, 'timestamp': '2026-10-21T12:00:00-04:00'},
                                                   {'rating': None, 'timestamp': '2026-10-21T14:00:00-04:00'}]}}
        pts = rating_history.points(hist)
        self.assertEqual([r for _, r in pts], [200.0, 300.0])
        self.assertEqual(rating_history.points(None), [])

        def m(i, created, sub, status='OK!', ranked=True):
            return {'id': i, 'created': created, 'status': status, 'is_ranked': ranked, 'tournament_round': None,
                    'participants': [{'teamname': 'vibe19', 'submission': sub, 'rating': 100.0 + i, 'old_rating': 90.0}]}
        ours = [m(3, '2026-10-21T12:00:00Z', 1, status='ERR'), m(4, '2026-10-21T12:05:00Z', 1),
                m(5, '2026-10-21T12:10:00Z', 1), m(6, '2026-10-21T12:20:00Z', 2, ranked=False),
                m(7, '2026-10-21T12:30:00Z', 2)]
        f = rating_history.first_rated(ours, 'vibe19')
        self.assertEqual({s: (d['match'], d['matches']) for s, d in f.items()}, {1: (4, 3), 2: (7, 1)})

    def test_ladder(self):
        rows = sample_rows()
        rec = ladder.team_records(rows, 'vibe19')
        self.assertEqual(rec['vibe19'], [25, 5])
        self.assertEqual(rec['starter'], [5 + 15, 25 + 15])
        bundle = {'team': 'vibe19', 'fetched_at': '2026-10-21T20:00:00+00:00', 'site': 'https://x', 'episode': 'bc19',
                  'submissions': [{'id': 2, 'description': 'v1: x', 'accepted': True}],
                  'rankings': [{'name': 'vibe19', 'rating': 1200.0, 'active': True},
                               {'name': 'starter', 'rating': 900.0, 'active': True}],
                  'matches': [{'id': 1, 'status': 'OK!', 'created': '2026-10-21T20:00:00+00:00', 'is_ranked': True,
                               'maps': ['seed-1'], 'participants': [
                                   {'teamname': 'vibe19', 'score': 3, 'player_index': 0},
                                   {'teamname': 'starter', 'score': 0, 'player_index': 1}]}]}
        d = quiet(ladder.collect, bundle, rows)
        self.assertEqual(d['ladder'][0]['build'], 'us:v1')
        md = ladder.render_md(d)
        self.assertIn('| 1 | **vibe19** (v1) | 1200.0 |', md)
        self.assertIn('| 1 | Oct 21 13:00 PDT | **vibe19** | 3–0 | starter | seed-1 | ranked | OK! |', md)


class TestCharts(Base):
    def test_charts_render(self):
        try:
            import matplotlib  # noqa: F401
        except ImportError:
            self.skipTest('matplotlib not installed here (.venv-progress)')
        rows = sample_rows()
        a = quiet(elo.analyse, rows, None)
        for f, name in ((elo.render_elo_png, 'elo.png'), (elo.render_progress_png, 'progress.png')):
            p = os.path.join(self.dir, name)
            f(a, p, len(rows))
            self.assertGreater(os.path.getsize(p), 1000)


if __name__ == '__main__':
    unittest.main(verbosity=1)
