#!/usr/bin/env python3
"""Fetch what progress/ needs from the bc19 galaxy replica, as our team through the site's public API (GET only;
tools/galaxy19/client.py), into the cache (PROGRESS_CACHE, default ~/projects/vibe/bc19-progress-cache/replica.json).

  python3 tools/progress/replica.py fetch     # rankings, every match (the Queue page's list), our scrimmages (with
                                              # our submission ids), our submissions, our rating history
  python3 tools/progress/replica.py show      # a summary of the cached bundle

The cache is replaced only after a complete fetch, so a failed fetch leaves the previous one in place.
"""
import datetime as dt
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(os.path.dirname(HERE), 'galaxy19'))
import elolib  # noqa: E402

KEEP_SUB = ('id', 'status', 'accepted', 'created', 'description')


def fetch():
    import client as cl
    c = cl.Client()
    acc = cl.load_accounts()
    s = cl.session(c, acc, elolib.OUR_TEAM)
    me = acc[elolib.OUR_TEAM]['team_id']
    ep = c.episode
    return {
        'fetched_at': dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds'),
        'site': c.site, 'episode': ep, 'team_id': me, 'team': elolib.OUR_TEAM,
        'rankings': cl.rankings(c),
        'matches': c.pages(f'/api/compete/{ep}/match/'),
        'ours': s.pages(f'/api/compete/{ep}/match/scrimmage/?team_id={me}'),
        'submissions': [{k: x.get(k) for k in KEEP_SUB} for x in s.pages(f'/api/compete/{ep}/submission/')],
        'history': s.api('GET', f'/api/compete/{ep}/match/historical_rating/'),
    }


def load(path=elolib.REPLICA_JSON):
    """The cached bundle, or None."""
    try:
        with open(path) as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return None


def save(bundle, path=elolib.REPLICA_JSON):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path + '.tmp', 'w') as fh:
        json.dump(bundle, fh)
    os.replace(path + '.tmp', path)


def main(argv):
    cmd = argv[0] if argv else 'show'
    if cmd == 'fetch':
        b = fetch()
        save(b)
    elif cmd == 'show':
        b = load()
        if b is None:
            raise SystemExit(f'no cached bundle at {elolib.REPLICA_JSON} (run: replica.py fetch)')
    else:
        raise SystemExit(__doc__)
    ok = sum(1 for m in b['matches'] if m.get('status') == 'OK!')
    print(f"replica: {len(b['rankings'])} teams, {len(b['matches'])} matches ({ok} finished), "
          f"{len(b['ours'])} of ours, {len(b['submissions'])} submissions, fetched {b['fetched_at']}")
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
