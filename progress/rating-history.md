# Rating history (replica)

The replica's Team page Rating History for vibe19: the displayed rating (siarnaq's penalized Elo) after each rated (ranked, non-tournament) match, with each submission's first completed rated match marked; below it, on its own axis, each champion's Bradley-Terry rating over its reign as the incumbent. Written by `tools/progress/rating_history.py` from data fetched 2026-10-25 21:14 PDT; regenerate, do not edit.

![rating history](rating-history.png)

64 rated matches; latest rating 1,622 (2026-10-25 09:00 PDT). Times are Pacific; the replica's chart shows UTC.

BT = the build's Bradley-Terry rating in `progress/ELO.md` (± 95%), the same for every submission of a build: a fit over every game (local, replica scrimmages and ranked matches), where the replica's Elo mean (displayed rating + 1500·0.85^n) moves at most 24 points per ranked match. The BT panel draws each champion (bots/ROSTER.tsv) from its acceptance to the next; a champion with no games of its own yet is drawn dashed at the rating of the candidate it was accepted as (its accepting blocks: biased up). Rated matches come from the daily autoscrim (about 4 a day for us), the field's spare-cycle ranked challenges (`field.py activity`: only while fewer than 2 matches wait, and only the 3 teams just below us pick us, so rare while our blocks play), `field.py boost` when used, and, from v11 on, the field challenges `tools/rate_ours.sh` asks for after a champion's control block (galaxy takes ranked requests only upward and we play at the top, so our team cannot ask): a champion can reign without one. The two agree on order but not on spread: over the 42 field teams with 20+ rated replica matches, the replica's unpenalized mean rises 0.12 points per BT point (r 0.97), so they are drawn on separate axes and a gap between them is not a gap in strength.

| Champion | Accepted | Until | Rated matches | BT ± 95% | BT games |
|---|---|---|---:|---:|---:|
| v0 | 2026-10-21 07:14 | 2026-10-21 09:00 | 0 | 1,608 ± 226 | 38 |
| v1 | 2026-10-21 09:00 | 2026-10-21 12:06 | 12 | 1,457 ± 141 | 154 |
| v2 | 2026-10-21 12:06 | 2026-10-21 12:06 | 0 | 1,441 ± 142 | 62 |
| v3 | 2026-10-21 12:06 | 2026-10-21 20:04 | 26 | 1,609 ± 101 | 191 |
| v4 | 2026-10-21 20:04 | 2026-10-22 00:08 | 0 | 1,369 ± 107 | 220 |
| v5 | 2026-10-22 00:08 | 2026-10-22 07:55 | 11 | 1,513 ± 74 | 439 |
| v6 | 2026-10-22 07:55 | 2026-10-23 00:30 | 0 | 1,538 ± 69 | 322 |
| v7 | 2026-10-23 00:30 | 2026-10-24 06:41 | 6 | 1,674 ± 49 | 1804 |
| v8 | 2026-10-24 06:41 | 2026-10-25 07:24 | 5 | 1,730 ± 66 | 356 |
| v9 | 2026-10-25 07:24 | 2026-10-25 15:27 | 4 | 1,816 ± 114 | 48 |
| v10 | 2026-10-25 15:27 | 2026-10-25 20:50 | 0 | 1,805 ± 127 | 36 |
| v11 | 2026-10-25 20:50 | now | 0 | 1,827 ± 95 | 72 (as h178: accepting blocks) |

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
