#!/usr/bin/env python3
"""Run our own replica matches first: move the execute queue's ready messages for the given matches, or for every
match of the given teams, ahead of the rest (saturn takes the oldest ready message). The charter gives the field's
matches against each other the spare cycles. On the VM, as root (the spool belongs to bc19replica):

  sudo python3 -I tools/galaxy19/spool_bump.py [--match 199,200] [--team vibe19] [--dry-run]
"""
import argparse
import base64
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

from replica_gcp import spool  # noqa: E402

TOPIC = 'replica-siarnaq-execute'
MATCH_RE = re.compile(r'/match/([0-9]+)/report/$')


def describe(obj):
    """(match id or None, [team names]) of an execute message."""
    try:
        d = json.loads(base64.b64decode(obj.get('data') or ''))
    except (ValueError, TypeError):
        return None, []
    m = MATCH_RE.search(((d.get('metadata') or {}).get('report-url')) or '')
    det = d.get('details') or {}
    teams = [(det.get(k) or {}).get('team-name') for k in ('a', 'b')]
    return (int(m.group(1)) if m else None), [t for t in teams if t]


def picker(matches, teams):
    def pick(obj):
        mid, names = describe(obj)
        return mid in matches or any(t in teams for t in names)
    return pick


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--match', default='', help='comma-separated match ids')
    ap.add_argument('--team', default='', help='comma-separated team names')
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args(argv)
    matches = {int(x) for x in a.match.split(',') if x.strip()}
    teams = {x.strip() for x in a.team.split(',') if x.strip()}
    if not matches and not teams:
        ap.error('give --match and/or --team')
    q = spool.topic_queue(TOPIC)
    pick = picker(matches, teams)
    if a.dry_run:
        for f in q._names(q.ready):
            with open(os.path.join(q.ready, f)) as fh:
                obj = json.load(fh)
            if pick(obj):
                print(f[:-5], *describe(obj))
        return 0
    for old, new in q.bump(pick):
        print(f'{old} -> {new}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
