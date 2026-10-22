#!/usr/bin/env python3
"""Tests of the bc19 galaxy replica (tools/galaxy19), ported from the 2023 replica's tests: Google Cloud stand-ins, spool queues, ID tokens, cron, the
saturn replacement (messages, report payloads, compile success/failure, path layout), the relay, and the deploy
renderers. Standard library only; no network, no Django, no game (the execute path runs a fake engine). The compile
tests use the real JDK and engine jar when present (tools/lib.sh) and skip otherwise.
Run: python3 test/galaxy19/test_galaxy19.py (also run by test/galaxy19.test.js in tools/unit-tests.sh)
"""
import base64
import datetime
import importlib
import io
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import unittest
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
GALAXY = os.path.join(REPO, 'tools', 'galaxy19')
STANDINS = os.path.join(GALAXY, 'standins')
for p in (STANDINS, GALAXY, os.path.join(REPO, 'tools')):
    if p not in sys.path:
        sys.path.insert(0, p)

TMP = tempfile.mkdtemp(prefix='galaxy-test-')
os.environ.update(GALAXY_HOME=os.path.join(TMP, 'home'), GALAXY_STORAGE_ROOT=os.path.join(TMP, 'storage'),
                  GALAXY_BASE_HOST='1-2-3-4.sslip.io', GALAXY_RELAY_SOCKET=os.path.join(TMP, 'r.sock'),
                  GALAXY_NACK_DELAY='0')

from replica_gcp import config, cron, fsutil, spool, storage, tokens  # noqa: E402

tokens.generate_key()
logging.disable(logging.CRITICAL)      # saturn/relay log expected errors (tracebacks) in these tests

import google  # noqa: E402
import google.auth  # noqa: E402
import google.auth.exceptions  # noqa: E402
import google.auth.transport.requests  # noqa: E402
import google.cloud.pubsub as pubsub  # noqa: E402
import google.cloud.scheduler as scheduler  # noqa: E402
import google.cloud.secretmanager as secretmanager  # noqa: E402
import google.cloud.storage as gcs  # noqa: E402
import google.cloud.tasks_v2 as tasks_v2  # noqa: E402
from google.auth import impersonated_credentials  # noqa: E402
from google.oauth2 import id_token  # noqa: E402

import relay  # noqa: E402
import saturn  # noqa: E402

SECURE = config.BUCKET_SECURE


def tearDownModule():
    shutil.rmtree(TMP, ignore_errors=True)


def read(path, mode='r'):
    with open(path, mode, **({} if 'b' in mode else {'errors': 'replace'})) as fh:
        return fh.read()


def zip_bytes(entries):
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w') as z:
        for name, data in entries.items():
            z.writestr(name, data)
    return buf.getvalue()


# ------------------------------------------------------------------------------------------------ stand-in packages
class StandinImports(unittest.TestCase):
    def test_every_google_module_is_a_standin(self):
        for m in (google, google.auth, id_token, gcs, pubsub, tasks_v2, scheduler, secretmanager,
                  impersonated_credentials, google.auth.transport.requests):
            self.assertTrue(os.path.abspath(m.__file__).startswith(STANDINS + os.sep), m.__name__)

    def test_fail_closed(self):
        with self.assertRaises(AttributeError):
            gcs.Batch                                           # noqa: B018
        with self.assertRaises(ImportError):
            importlib.import_module('google.cloud.bigquery')
        with self.assertRaises(ImportError):
            importlib.import_module('google.api_core.exceptions')
        with self.assertRaises(NotImplementedError):
            gcs.Client().list_buckets()
        with self.assertRaises(NotImplementedError):
            gcs.Client().bucket(SECURE).blob('a/b').rewrite(None)
        with self.assertRaises(NotImplementedError):
            secretmanager.SecretManagerServiceClient()
        with self.assertRaises(google.auth.exceptions.DefaultCredentialsError):
            google.auth.default()
        with self.assertRaises(google.auth.exceptions.TransportError):
            google.auth.transport.requests.Request()('https://example.invalid/')
        with self.assertRaises(NotImplementedError):
            id_token.fetch_id_token(None, 'x')
        with self.assertRaises(NotImplementedError):
            pubsub.SubscriberClient()

    def test_no_network_code_or_external_host(self):
        """The stand-ins and their back end never open sockets and name no Google/Battlecode host."""
        bad_import = re.compile(r'^\s*(import|from)\s+(socket|http|urllib(?!\.parse\b)|requests|ssl|smtplib|ftplib)\b',
                                re.M)
        for root in (STANDINS, os.path.join(GALAXY, 'replica_gcp')):
            for dirpath, _, files in os.walk(root):
                for f in files:
                    if f.endswith('.py'):
                        text = read(os.path.join(dirpath, f))
                        self.assertIsNone(bad_import.search(text), f)
                        self.assertIsNone(re.search(r'https?://', text), f)
        for dirpath, dirnames, files in os.walk(GALAXY):
            dirnames[:] = [d for d in dirnames if d not in ('frontend', '__pycache__')]
            for f in files:
                text = read(os.path.join(dirpath, f))
                if f.endswith('.md'):
                    continue  # documentation (README) may name the hosts it says are blocked
                if f == 'frontend_check.py':
                    continue  # the bundle auditor names the official hosts it hunts for
                if f == 'galaxy-setup.sh':
                    # The egress block resolves the official hosts by name: only that list and comments may name them.
                    text = '\n'.join(l for l in text.splitlines()
                                      if not l.startswith('OFFICIAL_HOSTS=') and not l.lstrip().startswith('#'))
                for needle in ('battlecode.org', 'googleapis', 'mailjet.com', 'challonge.com', 'mitbattlecode'):
                    self.assertFalse(needle in text, f'{os.path.join(dirpath, f)} names {needle}')
                urls = set(re.findall(r'https?://[A-Za-z0-9.-]+', text)) - {'https://github.com'}
                urls = {u for u in urls if not re.match(r'https?://(127\.0\.0\.1|localhost|galaxy(19)?\.|169\.254\.169\.254$)', u)}  # metadata: deploy reads the VM's own IP
                self.assertEqual(urls, set(), os.path.join(dirpath, f))


class Storage(unittest.TestCase):
    def test_write_read_metadata_titan(self):
        c = gcs.Client(credentials=object())
        blob = c.bucket(SECURE).blob('episode/bc23/submission/7/source.zip')
        with blob.open('wb') as f:
            f.write(b'PK')
            f.write(b'data')
        self.assertTrue(os.path.isfile(os.path.join(TMP, 'storage', SECURE, 'episode/bc23/submission/7/source.zip')))
        got = c.bucket(SECURE).get_blob('episode/bc23/submission/7/source.zip')
        self.assertIsNone(got.metadata)
        self.assertEqual(got.download_as_bytes(), b'PKdata')
        self.assertEqual(got.size, 6)
        got.metadata = {'Titan-Status': 'Unverified'}       # titan.request_scan
        got.patch()
        again = c.bucket(SECURE).get_blob('episode/bc23/submission/7/source.zip')
        self.assertEqual(again.metadata, {'Titan-Status': 'Verified'})
        self.assertIsNone(c.bucket(SECURE).get_blob('episode/bc23/submission/8/source.zip'))
        url = got.generate_signed_url(expiration=datetime.timedelta(hours=1), method='GET',
                                      credentials=impersonated_credentials.Credentials(
                                          source_credentials=None, target_principal='x@y.invalid',
                                          target_scopes='scope', lifetime=5))
        self.assertEqual(url, f'/storage/{SECURE}/episode/bc23/submission/7/source.zip')
        with self.assertRaises(NotImplementedError):
            got.generate_signed_url(method='PUT')

    def test_public_url_and_text_modes(self):
        b = gcs.Client.create_anonymous_client().bucket(config.BUCKET_PUBLIC).blob('team/3/avatar.png')
        self.assertEqual(b.public_url, f'/storage/{config.BUCKET_PUBLIC}/team/3/avatar.png')
        b.upload_from_string(b'\x89PNG')
        self.assertEqual(b.download_as_bytes(), b'\x89PNG')
        t = gcs.Client().bucket(config.BUCKET_EPHEMERAL).blob('notes/a b.txt')
        with t.open('w') as fh:
            fh.write('héllo')
        self.assertEqual(t.download_as_text(), 'héllo')
        self.assertEqual(t.public_url, f'/storage/{config.BUCKET_EPHEMERAL}/notes/a%20b.txt')
        with t.open('wb', content_type='application/pdf', predefined_acl='publicRead') as fh:
            fh.write(b'%PDF')
        meta = storage.load_meta(config.BUCKET_EPHEMERAL, 'notes/a b.txt')
        self.assertEqual((meta['contentType'], meta['acl'], meta['size']), ('application/pdf', 'publicRead', '4'))

    def test_failed_write_leaves_nothing(self):
        blob = gcs.Client().bucket(SECURE).blob('x/partial.zip')
        with self.assertRaises(RuntimeError):
            with blob.open('wb') as f:
                f.write(b'half')
                raise RuntimeError('boom')
        self.assertFalse(blob.exists())
        self.assertEqual([f for f in os.listdir(os.path.join(TMP, 'storage', SECURE, 'x'))], [])

    def test_names_that_escape_are_refused(self):
        b = gcs.Client().bucket(SECURE)
        for name in ('../x', '/abs', 'a//b', 'a/./b', 'a/../b', '.hidden', 'a/.tmp-1', 'a\\b', 'a\nb', ''):
            with self.assertRaises(ValueError, msg=repr(name)):
                b.blob(name)
        for bucket in ('..', 'UPPER', 'a', '../etc', 'a/b'):
            with self.assertRaises(ValueError, msg=repr(bucket)):
                gcs.Client().bucket(bucket)


# ------------------------------------------------------------------------------------------------ queues and tokens
class Spool(unittest.TestCase):
    def test_lease_ack_nack_delay_recover(self):
        q = spool.Queue(os.path.join(TMP, 'q1')).ensure()
        a, b = q.put({'n': 1}), q.put({'n': 2})
        self.assertLess(a, b)
        self.assertEqual(q.lease(), (a, {'n': 1}))
        q.nack(a, {'n': 1, 'again': True}, delay=30)
        self.assertEqual(q.lease(), (b, {'n': 2}))
        self.assertIsNone(q.lease())
        q.promote_due(now_ns=time.time_ns() + 31 * 10**9)
        self.assertEqual(q.lease(), (a, {'n': 1, 'again': True}))
        self.assertEqual(q.counts(), {'ready': 0, 'leased': 2, 'delayed': 0, 'dead': 0})
        q.ack(a)
        self.assertEqual(q.recover(), 1)              # b was leased by a "dead" consumer
        self.assertEqual(q.lease()[0], b)
        q.bury(b, {'n': 2})
        self.assertEqual(q.counts()['dead'], 1)

    def test_concurrent_consumers_take_each_message_once(self):
        q = spool.Queue(os.path.join(TMP, 'q2')).ensure()
        ids = {q.put({'i': i}) for i in range(60)}
        got, lock = [], threading.Lock()

        def consume():
            while True:
                item = q.lease()
                if item is None:
                    return
                with lock:
                    got.append(item[0])
                q.ack(item[0])
        ts = [threading.Thread(target=consume) for _ in range(6)]
        for t in ts:
            t.start()
        for t in ts:
            t.join()
        self.assertEqual(sorted(got), sorted(ids))

    def test_bump_moves_chosen_messages_ahead_in_order(self):
        q = spool.Queue(os.path.join(TMP, 'q3')).ensure()
        ids = [q.put({'i': i}) for i in range(5)]
        moved = q.bump(lambda o: o['i'] in (3, 1))
        self.assertEqual([m[0] for m in moved], [ids[1], ids[3]])
        order = []
        while (item := q.lease()) is not None:
            order.append(item[1]['i'])
        self.assertEqual(order, [1, 3, 0, 2, 4])
        self.assertTrue(all(spool.ID_RE.match(m[1]) for m in moved))
        self.assertEqual(q.bump(lambda o: True), [])   # nothing ready

    def test_drop_moves_chosen_ready_and_delayed_messages_to_dead(self):
        q = spool.Queue(os.path.join(TMP, 'q4')).ensure()
        ids = [q.put({'i': i}) for i in range(4)]
        late = q.put({'i': 9}, delay=3600)
        self.assertEqual(sorted(q.drop(lambda o: o['i'] in (2, 9))), sorted([ids[2], late]))
        self.assertEqual(q.counts(), {'ready': 3, 'leased': 0, 'delayed': 0, 'dead': 2})
        self.assertEqual(sorted(os.listdir(q.dead)), sorted([f'{ids[2]}.json', f'{late}.json']))
        order = []
        while (item := q.lease()) is not None:
            order.append(item[1]['i'])
        self.assertEqual(order, [0, 1, 3])

    def test_spool_bump_reads_match_and_teams(self):
        import spool_bump
        body = {'metadata': {'report-url': 'https://x/api/compete/bc19/match/199/report/', 'task-type': 'execute'},
                'details': {'a': {'team-name': 'vibe19'}, 'b': {'team-name': 'StoneT2000.BC19-bot1v43'}}}
        obj = {'attributes': {}, 'data': base64.b64encode(json.dumps(body).encode()).decode()}
        self.assertEqual(spool_bump.describe(obj), (199, ['vibe19', 'StoneT2000.BC19-bot1v43']))
        self.assertTrue(spool_bump.picker({199}, set())(obj))
        self.assertTrue(spool_bump.picker(set(), {'vibe19'})(obj))
        self.assertFalse(spool_bump.picker({5}, {'other'})(obj))
        self.assertEqual(spool_bump.describe({'data': 'not base64 json'}), (None, []))

    def test_resource_ids(self):
        self.assertEqual(spool.resource_id('projects/p/topics/replica-siarnaq-compile', 'topics'),
                         'replica-siarnaq-compile')
        for bad in ('projects/p/topics/../x', 'projects/p/queues/q', 'x', 'projects/p/topics/a/b'):
            with self.assertRaises(ValueError, msg=bad):
                spool.resource_id(bad, 'topics')


class Tokens(unittest.TestCase):
    def test_round_trip_and_rejections(self):
        t = tokens.mint('saturn-execute@bc23-replica.invalid', 'siarnaq')
        claims = id_token.verify_oauth2_token(id_token=t, request=google.auth.transport.requests.Request())
        self.assertEqual(claims['email'], 'saturn-execute@bc23-replica.invalid')
        self.assertEqual(claims['aud'], 'siarnaq')
        h, p, s = t.split('.')
        forged_payload = base64.urlsafe_b64encode(json.dumps(dict(claims, email='x@y.z')).encode()).rstrip(b'=')
        bad = [h + '.' + p + '.' + s[:-2] + ('AA' if s[-2:] != 'AA' else 'BB'),       # signature
               h + '.' + forged_payload.decode() + '.' + s,                          # payload swapped
               'eyJhbGciOiJub25lIn0.' + p + '.',                                       # alg none
               tokens.mint('a@b.c', 'siarnaq', now=time.time() - 7200),                 # expired
               'garbage', '', 'a.b.c', t + 'x']
        for b in bad:
            with self.assertRaises(ValueError, msg=b[:40]):
                id_token.verify_oauth2_token(b, None)
        with self.assertRaises(ValueError):
            tokens.verify(t, audience='other')

    def test_key_is_private(self):
        st = os.stat(tokens.key_path())
        self.assertEqual(st.st_mode & 0o777, 0o600)
        with open(tokens.key_path()) as fh:
            self.assertGreaterEqual(len(bytes.fromhex(fh.read().strip())), 32)


class Cron(unittest.TestCase):
    def test_matches(self):
        d = datetime.datetime
        self.assertTrue(cron.matches('0 */4 * * *', d(2026, 10, 7, 8, 0)))
        self.assertFalse(cron.matches('0 */4 * * *', d(2026, 10, 7, 9, 0)))
        self.assertFalse(cron.matches('0 */4 * * *', d(2026, 10, 7, 8, 1)))
        self.assertTrue(cron.matches('30 9-17/2 * jan-mar,oct mon-fri', d(2026, 10, 7, 11, 30)))   # a Wednesday
        self.assertFalse(cron.matches('30 9-17/2 * * sat,sun', d(2026, 10, 7, 11, 30)))
        self.assertTrue(cron.matches('0 0 1 * 7', d(2026, 10, 4, 0, 0)))    # Sunday (7) OR the 1st
        self.assertTrue(cron.matches('0 0 1 * 7', d(2026, 10, 1, 0, 0)))
        self.assertEqual(cron.next_fire('0 */4 * * *', d(2026, 10, 7, 8, 0)), d(2026, 10, 7, 12, 0))
        for bad in ('* * * *', '61 * * * *', '* 24 * * *', '*/0 * * * *', '5-1 * * * *', 'x * * * *'):
            with self.assertRaises(ValueError, msg=bad):
                cron.parse(bad)


# ------------------------------------------------------------------------------------------- publishers (siarnaq side)
class Publishers(unittest.TestCase):
    def test_pubsub_publish_as_siarnaq_does(self):
        client = pubsub.PublisherClient(credentials=None,
                                        publisher_options=pubsub.types.PublisherOptions(enable_message_ordering=True),
                                        client_options={'api_endpoint': 'ignored:443'})
        topic = client.topic_path(config.PROJECT, config.TOPIC_COMPILE)
        self.assertEqual(topic, f'projects/{config.PROJECT}/topics/{config.TOPIC_COMPILE}')
        payload = {'episode': {'name': 'bc23', 'language': 'java8', 'scaffold': ''},
                   'metadata': {'report-url': 'https://galaxy.x/api/compete/bc23/submission/1/report/',
                                'task-type': 'compile'},
                   'details': {'source': {'bucket': SECURE, 'name': 'a.zip'}, 'package': 'p'}}
        mid = client.publish(topic=topic, data=json.dumps(payload).encode(), ordering_key='compile-order').result()
        q = spool.topic_queue(config.TOPIC_COMPILE)
        leased = q.lease()
        self.assertEqual(leased[0], mid)
        self.assertEqual(leased[1]['ordering_key'], 'compile-order')
        self.assertEqual(saturn.parse_message(leased[1]), payload)
        q.ack(mid)
        with self.assertRaises(ValueError):
            pubsub.PublisherClient().publish(topic, b'x', ordering_key='k').result()
        with self.assertRaises(TypeError):
            client.publish(topic, 'not bytes')
        fut = client.publish('projects/p/queues/not-a-topic', b'x', ordering_key='k')
        self.assertIsInstance(fut.exception(), ValueError)

    def test_cloud_tasks_create_task_as_siarnaq_does(self):
        client = tasks_v2.CloudTasksClient()
        parent = client.queue_path(config.PROJECT, config.LOCATION, config.QUEUE_RATING)
        task = tasks_v2.Task(http_request=tasks_v2.HttpRequest(
            http_method=tasks_v2.HttpMethod.POST, url='https://galaxy.x/api/compete/bc23/match/5/rating_update/',
            oidc_token=tasks_v2.OidcToken(service_account_email=config.SERVICE_EMAIL)))
        made = client.create_task(request=dict(parent=parent, task=task))
        self.assertTrue(made.name.startswith(parent + '/tasks/'))
        q = spool.task_queue(config.QUEUE_RATING)
        tid, rec = q.lease()
        self.assertEqual(rec['http_request']['http_method'], 'POST')
        self.assertEqual(rec['http_request']['oidc_token']['service_account_email'], config.SERVICE_EMAIL)
        q.ack(tid)
        with self.assertRaises(NotImplementedError):
            tasks_v2.Task(app_engine_http_request={'x': 1})
        with self.assertRaises(TypeError):
            tasks_v2.HttpRequest(nonsense=1)

    def test_scheduler_records_jobs(self):
        parent = f'projects/{config.PROJECT}/locations/{config.LOCATION}'
        name = f'{parent}/jobs/replica-autoscrim-bc23'
        job = scheduler.Job(name=name, description='d', schedule='0 */4 * * *', time_zone='UTC',
                            http_target=scheduler.HttpTarget(
                                uri='https://galaxy.x/api/episode/e/bc23/autoscrim/', http_method=scheduler.HttpMethod.POST,
                                headers={'Content-Type': 'application/json; charset=utf-8'}, body=b'{"best_of": 3}',
                                oidc_token=scheduler.OidcToken(service_account_email=config.SERVICE_EMAIL)))
        client = scheduler.CloudSchedulerClient(credentials=None)
        client.create_job(request=dict(parent=parent, job=job))
        rec = json.loads(read(spool.job_path('replica-autoscrim-bc23')))
        self.assertEqual((rec['schedule'], rec['http_target']['http_method']), ('0 */4 * * *', 'POST'))
        job.schedule = 'not cron'
        with self.assertRaises(ValueError):
            client.update_job(request=dict(job=job))
        client.delete_job(request=dict(name=name))
        self.assertFalse(os.path.exists(spool.job_path('replica-autoscrim-bc23')))


# ------------------------------------------------------------------------------------------------ saturn replacement
class FakeReporter:
    def __init__(self, codes=None):
        self.codes, self.reports = list(codes or []), []

    def report(self, task):
        payload = saturn.build_report(task)
        self.reports.append(payload)
        code = self.codes.pop(0) if self.codes else 204
        if code == 409:
            task.finish(saturn.ABORTED)
        if not 200 <= code < 300:
            raise saturn.ReportError(f'bad status code: {code}')


def compile_payload(sub_id, package='examplefuncsplayer'):
    return {'episode': {'name': 'bc23', 'language': 'java8', 'scaffold': ''},
            'metadata': {'report-url': f'https://galaxy.x/api/compete/bc23/submission/{sub_id}/report/',
                         'task-type': 'compile'},
            'details': {'source': {'bucket': SECURE, 'name': f'episode/bc23/submission/{sub_id}/source.zip'},
                        'binary': {'bucket': SECURE, 'name': f'episode/bc23/submission/{sub_id}/binary.zip'},
                        'team-name': 'team', 'package': package}}


class TaskProtocol(unittest.TestCase):
    def run_task(self, runner, codes=None, stop=False):
        rep = FakeReporter(codes)
        ev = threading.Event()
        if stop:
            ev.set()
        ack = saturn.Task(compile_payload(1), rep, ev).run(runner)
        return ack, rep.reports

    def test_report_payloads(self):
        def runner(t):
            t.debug('hello')
            t.finish(saturn.COMPLETED, {'accepted': True})
        ack, reports = self.run_task(runner)
        self.assertTrue(ack)
        self.assertEqual(reports[0], {'invocation': {'status': 'RUN', 'logs': '', 'interrupted': False}})
        self.assertEqual(reports[1], {'accepted': True,
                                      'invocation': {'status': 'OK!', 'logs': 'hello\n', 'interrupted': False}})

    def test_409_on_start_aborts_and_acks(self):
        ran = []
        ack, reports = self.run_task(lambda t: ran.append(1), codes=[409])
        self.assertTrue(ack)
        self.assertEqual((ran, len(reports)), ([], 1))

    def test_errors_report_try_and_nack(self):
        def runner(t):
            raise RuntimeError('engine exploded')
        ack, reports = self.run_task(runner)
        self.assertFalse(ack)
        self.assertEqual(reports[-1]['invocation'], {'status': 'TRY', 'logs': '', 'interrupted': False})
        ack, reports = self.run_task(lambda t: None, codes=[500])     # first report fails: TRY, nack
        self.assertFalse(ack)
        self.assertEqual(reports[-1]['invocation']['status'], 'TRY')
        ack, _ = self.run_task(lambda t: t.finish(saturn.COMPLETED, {'scores': [1, 0]}), codes=[204, 502])
        self.assertFalse(ack)                                          # final report not delivered: redeliver

    def test_interrupted(self):
        def runner(t):
            raise saturn.Interrupted('stopped')
        ack, reports = self.run_task(runner, stop=True)
        self.assertFalse(ack)
        self.assertEqual(reports[-1]['invocation'], {'status': 'TRY', 'logs': '', 'interrupted': True})

    def test_recipe_logs_like_saturn(self):
        rep = FakeReporter()
        t = saturn.Task(compile_payload(1), rep)
        t.run(lambda task: saturn.run_recipe(task, [('Hello world', saturn.step_hello),
                                                    ('Done', lambda x: x.finish(saturn.COMPLETED, {'accepted': True}))]))
        logs = rep.reports[-1]['invocation']['logs']
        self.assertIn('>>> Starting step 1/2: Hello world\nWelcome to Saturn!\n', logs)
        self.assertIn('>>> Ending step 2/2\n\n', logs)

    def test_parse_message(self):
        good = {'data': base64.b64encode(json.dumps({'metadata': {'task-type': 'compile'}}).encode()).decode()}
        self.assertEqual(saturn.parse_message(good), {'metadata': {'task-type': 'compile'}})
        for bad in ({'data': 'not base64!'}, {'data': base64.b64encode(b'{nope').decode()}, {},
                    {'data': base64.b64encode(b'[1]').decode()},
                    {'data': base64.b64encode(b'{"metadata": 3}').decode()}):
            self.assertIsNone(saturn.parse_message(bad), bad)

    def test_unknown_task_type_is_nacked(self):
        ex = saturn.Executor(runtime=saturn.Runtime(sandbox=[]), reporter=FakeReporter())
        self.assertFalse(ex.handle({'metadata': {'task-type': 'mine-bitcoin'}}, os.path.join(TMP, 'w')))

class FakeSiarnaq:
    def __init__(self, status=204):
        self.status, self.calls = status, []

    def __call__(self, method, path, body=b'', headers=None):
        self.calls.append((method, path, body, dict(headers or {})))
        if isinstance(self.status, Exception):
            raise self.status
        return self.status, b'{}'


class Relay(unittest.TestCase):
    def test_report_forwarding(self):
        fake = FakeSiarnaq(409)
        code, ans = relay.relay_report({'url': 'https://galaxy.old-host.sslip.io/api/compete/bc23/match/12/report/',
                                        'task_type': 'execute',
                                        'payload': {'scores': [1, 2], 'invocation': {'status': 'OK!'}}}, send=fake)
        self.assertEqual((code, ans['status']), (200, 409))
        method, path, body, headers = fake.calls[0]
        self.assertEqual((method, path), ('POST', '/api/compete/bc23/match/12/report/'))
        self.assertEqual(headers['User-Agent'], 'Galaxy-Saturn')
        claims = tokens.verify(headers['Authorization'].split()[1], audience='siarnaq')
        self.assertEqual(claims['email'], config.SATURN_EXECUTE_EMAIL)
        self.assertEqual(json.loads(body), {'scores': [1, 2], 'invocation': {'status': 'OK!'}})

    def test_report_validation(self):
        fake = FakeSiarnaq()
        good = {'task_type': 'compile', 'payload': {'invocation': {}}}
        for url, kind in (('https://g/api/compete/bc23/match/1/report/', 'compile'),            # wrong kind
                          ('https://g/api/compete/bc23/submission/1/report/?x=1', 'compile'),   # query
                          ('https://g/api/compete/bc23/submission/1/../../user/u/report/', 'compile'),
                          ('https://g/api/compete/bc23/submission/1/', 'compile'),
                          ('https://g/admin/', 'compile'), ('file:///etc/passwd', 'compile'),
                          ('https://g/api/compete/bc23/submission/1/report/', 'deploy')):
            code, _ = relay.relay_report(dict(good, url=url, task_type=kind), send=fake)
            self.assertEqual(code, 400, url)
        self.assertEqual(relay.relay_report(dict(good, url='https://g/api/compete/bc23/submission/1/report/',
                                                 payload={}), send=fake)[0], 400)
        self.assertEqual(fake.calls, [])
        code, ans = relay.relay_report(dict(good, url='https://g/api/compete/bc23/submission/1/report/'),
                                       send=FakeSiarnaq(ConnectionRefusedError('down')))
        self.assertEqual(code, 502)

    def test_unix_socket_end_to_end(self):
        fake = FakeSiarnaq(204)
        orig = relay.siarnaq_request
        relay.siarnaq_request = fake
        relay_report_defaults = relay.relay_report.__defaults__
        relay.relay_report.__defaults__ = (fake,)
        server = relay.UnixServer(config.relay_socket(), relay.ReportHandler)
        th = threading.Thread(target=server.serve_forever, daemon=True)
        th.start()
        try:
            self.assertEqual(os.stat(config.relay_socket()).st_mode & 0o777, 0o600)
            task = saturn.Task(compile_payload(5), saturn.RelayReporter())
            task.status, task.details = saturn.COMPLETED, {'accepted': True}
            task.reporter.report(task)
            self.assertEqual(fake.calls[-1][1], '/api/compete/bc23/submission/5/report/')
            self.assertEqual(json.loads(fake.calls[-1][2])['invocation']['status'], 'OK!')
            fake.status = 409
            task2 = saturn.Task(compile_payload(5), saturn.RelayReporter())
            with self.assertRaises(saturn.TaskFinished):
                task2.reporter.report(task2)
            self.assertEqual(task2.status, saturn.ABORTED)
        finally:
            server.shutdown()
            server.server_close()
            relay.siarnaq_request = orig
            relay.relay_report.__defaults__ = relay_report_defaults

    def test_cloud_tasks_dispatch_and_retry(self):
        client = tasks_v2.CloudTasksClient()
        parent = client.queue_path(config.PROJECT, config.LOCATION, 'test-queue')
        client.create_task(request=dict(parent=parent, task=tasks_v2.Task(http_request=tasks_v2.HttpRequest(
            url='https://galaxy.x/api/compete/bc23/match/9/rating_update/',
            oidc_token=tasks_v2.OidcToken(service_account_email=config.SERVICE_EMAIL)))))
        fake = FakeSiarnaq(500)
        disp = relay.TaskDispatcher(threading.Event(), send=fake)
        self.assertTrue(disp.process_one('test-queue'))
        q = spool.task_queue('test-queue')
        self.assertEqual(q.counts()['delayed'], 1)
        method, path, body, headers = fake.calls[0]
        self.assertEqual((method, path, headers['User-Agent']), ('POST', '/api/compete/bc23/match/9/rating_update/',
                                                                 'Google-Cloud-Tasks'))
        self.assertEqual(headers['X-CloudTasks-QueueName'], 'test-queue')
        self.assertEqual(tokens.verify(headers['Authorization'][7:])['email'], config.SERVICE_EMAIL)
        q.promote_due(now_ns=time.time_ns() + 10**10)
        fake.status = 204
        self.assertTrue(disp.process_one('test-queue'))
        self.assertEqual(q.counts(), {'ready': 0, 'leased': 0, 'delayed': 0, 'dead': 0})
        self.assertEqual(fake.calls[1][3]['X-CloudTasks-TaskRetryCount'], '1')
        self.assertEqual(relay.task_backoff(1), 0.1)
        self.assertEqual(relay.task_backoff(100), 3600.0)

    def test_task_outside_api_is_buried_without_a_call(self):
        q = spool.task_queue('test-queue2').ensure()
        q.put({'http_request': {'url': 'https://galaxy.x/admin/', 'http_method': 'POST'}})
        fake = FakeSiarnaq()
        relay.TaskDispatcher(threading.Event(), send=fake).process_one('test-queue2')
        self.assertEqual((fake.calls, q.counts()['dead']), ([], 1))

    def test_scheduler_fires_once_per_matching_minute(self):
        parent = f'projects/{config.PROJECT}/locations/{config.LOCATION}'
        scheduler.CloudSchedulerClient().create_job(request=dict(parent=parent, job=scheduler.Job(
            name=f'{parent}/jobs/replica-autoscrim-test', schedule='0 */4 * * *', time_zone='UTC',
            http_target=scheduler.HttpTarget(uri='https://galaxy.x/api/episode/e/bc23/autoscrim/',
                                             body=b'{"best_of": 3}', headers={'Content-Type': 'application/json'},
                                             oidc_token=scheduler.OidcToken(service_account_email=config.SERVICE_EMAIL)))))
        fake = FakeSiarnaq()
        at = datetime.datetime(2026, 10, 8, 4, 0, 10, tzinfo=datetime.timezone.utc)
        self.assertEqual(relay.fire_jobs(now=at, only='replica-autoscrim-test', send=fake), [('replica-autoscrim-test', 204)])
        self.assertEqual(relay.fire_jobs(now=at, only='replica-autoscrim-test', send=fake), [])     # same minute
        self.assertEqual(relay.fire_jobs(now=at + datetime.timedelta(minutes=1), only='replica-autoscrim-test',
                                         send=fake), [])
        method, path, body, headers = fake.calls[0]
        self.assertEqual((path, body, headers['User-Agent']), ('/api/episode/e/bc23/autoscrim/', b'{"best_of": 3}',
                                                               'Google-Cloud-Scheduler'))
        self.assertEqual(tokens.verify(headers['Authorization'][7:])['email'], config.SERVICE_EMAIL)

    def test_scheduler_holds_while_queue_long_or_too_soon(self):
        parent = f'projects/{config.PROJECT}/locations/{config.LOCATION}'
        scheduler.CloudSchedulerClient().create_job(request=dict(parent=parent, job=scheduler.Job(
            name=f'{parent}/jobs/replica-autoscrim-hold', schedule='0 */8 * * *', time_zone='UTC',
            http_target=scheduler.HttpTarget(uri='https://galaxy.x/api/episode/e/bc23/autoscrim/', body=b'{}',
                                             oidc_token=scheduler.OidcToken(service_account_email=config.SERVICE_EMAIL)))))
        fake, n = FakeSiarnaq(), [30]
        job = 'replica-autoscrim-hold'
        fire = lambda at, **kw: relay.fire_jobs(now=at, only=job, send=fake, max_waiting=30, min_hours=24,
                                                waiting=lambda: n[0], **kw)
        t0 = datetime.datetime(2026, 10, 8, 0, 0, 5, tzinfo=datetime.timezone.utc)
        h = lambda k: t0 + datetime.timedelta(hours=k)
        self.assertEqual(fire(t0), [])                         # 30 waiting: held
        n[0] = 29
        self.assertEqual(fire(h(8)), [(job, 204)])             # under the cap, never fired: fires
        n[0] = 0
        self.assertEqual(fire(h(16)), [])                      # 8 h after the last fire: held
        self.assertEqual(fire(h(16), force=True), [(job, 204)])  # --force ignores both checks
        self.assertEqual(fire(h(40)), [(job, 204)])            # 24 h after the forced fire
        n[0] = 99
        self.assertEqual(relay.fire_jobs(now=h(64), only=job, send=fake, max_waiting=0, min_hours=0,
                                         waiting=lambda: n[0]), [(job, 204)])   # 0 turns both off
        self.assertEqual(len(fake.calls), 4)


# ------------------------------------------------------------------------------------------------ deploy renderers
SETUP = os.path.join(GALAXY, 'deploy', 'galaxy-setup.sh')
VM_SETUP = os.path.join(REPO, 'tools', 'replica', 'deploy', 'vm-setup.sh')
HASH = '$2a$14$' + 'abcdefghijklmnopqrstuu' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234'


def sh(*args, env=None):
    return subprocess.run(['bash', *args], capture_output=True, text=True, env=dict(os.environ, **(env or {})))




if __name__ == "__main__":
    unittest.main()
