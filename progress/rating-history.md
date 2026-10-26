# Rating history (replica)

The replica's Team page Rating History for vibe19: the displayed rating (siarnaq's penalized Elo) after each rated (ranked, non-tournament) match, with each submission's first completed rated match marked; below it, on its own axis, the Bradley-Terry rating of the build behind each rated match. Written by `tools/progress/rating_history.py` from data fetched 2026-10-25 21:14 PDT; regenerate, do not edit.

![rating history](rating-history.png)

64 rated matches; latest rating 1,622 (2026-10-25 09:00 PDT). Times are Pacific; the replica's chart shows UTC.

BT = the build's Bradley-Terry rating in `progress/ELO.md` (± 95%), the same for every submission of a build: a fit over every game (local, replica scrimmages and ranked matches), where the replica's Elo mean (displayed rating + 1500·0.85^n) moves at most 24 points per ranked match. The BT panel draws each build from its first to its last rated match only, so a build that never played a rated match does not appear. The two agree on order but not on spread: over the 42 field teams with 20+ rated replica matches, the replica's unpenalized mean rises 0.12 points per BT point (r 0.97), so they are drawn on separate axes and a gap between them is not a gap in strength.

| Submission | Build | First rated match | Time | Rating before | Rating after | Rated matches | BT |
|---:|---|---:|---|---:|---:|---:|---:|
| #1 | v1 | 1 | 2026-10-21 09:21 PDT | 0 | 237 | 12 | 1457 ± 141 |
| #7 | v3 | 66 | 2026-10-21 12:22 PDT | 1,208 | 1,270 | 26 | 1609 ± 101 |
| #95 | v5 | 220 | 2026-10-22 01:00 PDT | 1,725 | 1,732 | 11 | 1513 ± 74 |
| #105 | v7 | 444 | 2026-10-23 09:00 PDT | 1,657 | 1,657 | 4 | 1674 ± 49 |
| #118 | v7 | 658 | 2026-10-23 23:37 PDT | 1,645 | 1,653 | 2 | 1674 ± 49 |
| #161 | v8 | 800 | 2026-10-24 09:00 PDT | 1,660 | 1,653 | 4 | 1730 ± 66 |
| #189 | v8 | 1175 | 2026-10-25 07:34 PDT | 1,635 | 1,631 | 1 | 1730 ± 66 |
| #191 | v9 | 1216 | 2026-10-25 09:00 PDT | 1,631 | 1,634 | 4 | 1816 ± 114 |
