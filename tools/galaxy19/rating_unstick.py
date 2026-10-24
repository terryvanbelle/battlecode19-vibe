# Replica only: finalize siarnaq rating chains that stalled. A team's ratings are finalized in match order, each
# participation once the team's previous one is rated (MatchParticipant.try_rating_update); the update of the next
# match is requested only when a participation is rated or a match report arrives. A bulk queryset .update() (the
# drop procedure's status="CAN") bypasses both, so the cancelled match is never rated and every later match of its
# teams, and through shared opponents most of the ladder, waits for ever (2026-10-24: 716 of 1,554 participations
# unrated, the newest rated match 613 of 2026-10-23 16:00 UTC; the rating history graphs stopped there).
# Runs siarnaq's own Match.try_rating_update on every match at the head of a stalled chain until nothing changes;
# first saves (participant id, rating id) of every participation to /var/tmp/bc19-rating-snapshot.json.
# Run from the driver (the wrapper clears the environment, so a dry run is a first line on stdin):
#   source tools/vm.sh && ensure_vm
#   (echo 'DRY = True'; cat tools/galaxy19/rating_unstick.py) | gssh 'sudo bc19-galaxy-manage shell'   # count only
#   gssh 'sudo bc19-galaxy-manage shell' < tools/galaxy19/rating_unstick.py
# Heads left on QUE or RUN ranked matches are normal: they are rated when the match reports.
import json
from collections import Counter
from siarnaq.api.compete.models import Match, MatchParticipant

DRY = globals().get('DRY', False)
SNAPSHOT = '/var/tmp/bc19-rating-snapshot.json'


def heads():
    un = MatchParticipant.objects.filter(rating__isnull=True).select_related('match', 'previous_participation')
    return [p for p in un if p.previous_participation is None or p.previous_participation.rating_id is not None]


def unrated():
    return MatchParticipant.objects.filter(rating__isnull=True).count()


before = unrated()
print('unrated', before, 'of', MatchParticipant.objects.count(), '; heads',
      dict(Counter((p.match.status, p.match.is_ranked) for p in heads())))
if not DRY:
    with open(SNAPSHOT, 'w') as fh:
        json.dump(list(MatchParticipant.objects.values_list('pk', 'rating_id')), fh)
    print('snapshot', SNAPSHOT)
    for n in range(1, 401):
        n0 = unrated()
        for mid in sorted({p.match_id for p in heads()}):
            Match.objects.prefetch_related('participants__previous_participation__rating',
                                           'participants__rating').get(pk=mid).try_rating_update()
        n1 = unrated()
        print('pass', n, 'unrated', n0, '->', n1)
        if n1 == n0:
            break
    print('unrated', before, '->', unrated(), '; heads left',
          dict(Counter((p.match.status, p.match.is_ranked) for p in heads())))
