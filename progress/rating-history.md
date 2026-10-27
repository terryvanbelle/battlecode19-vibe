# Rating history (replica)

The replica's Team page Rating History for vibe19: the displayed rating (siarnaq's penalized Elo) after each rated (ranked, non-tournament) match, with each submission's first completed rated match marked; below it, on its own axis, each champion's Bradley-Terry rating over its reign as the incumbent. Written by `tools/progress/rating_history.py` from data fetched 2026-10-27 10:59 PDT; regenerate, do not edit.

![rating history](rating-history.png)

86 rated matches; latest rating 1,619 (2026-10-27 08:19 PDT). Times are Pacific; the replica's chart shows UTC.

BT = the build's Bradley-Terry rating in `progress/ELO.md` (± 95%), the same for every submission of a build: a fit over every game (local, replica scrimmages and ranked matches), where the replica's Elo mean (displayed rating + 1500·0.85^n) moves at most 24 points per ranked match. The BT panel draws each champion (bots/ROSTER.tsv) from its acceptance to the next; a champion with no games of its own yet is drawn dashed at the rating of the candidate it was accepted as (its accepting blocks: biased up). Rated matches come from the daily autoscrim (about 4 a day for us), the field's spare-cycle ranked challenges (`field.py activity`: only while fewer than 2 matches wait, and only the 3 teams just below us pick us, so rare while our blocks play), `field.py boost` when used, and, from v11 on, the field challenges `tools/rate_ours.sh` asks for after a champion's control block (galaxy takes ranked requests only upward and we play at the top, so our team cannot ask): a champion can reign without one. The two agree on order but not on spread: over the 85 field teams with 20+ rated replica matches, the replica's unpenalized mean rises 0.13 points per BT point (r 0.97), so they are drawn on separate axes and a gap between them is not a gap in strength.

| Champion | Accepted | Until | Rated matches | BT ± 95% | BT games |
|---|---|---|---:|---:|---:|
| v0 | 2026-10-21 07:14 | 2026-10-21 09:00 | 0 | 1,604 ± 223 | 38 |
| v1 | 2026-10-21 09:00 | 2026-10-21 12:06 | 12 | 1,453 ± 136 | 154 |
| v2 | 2026-10-21 12:06 | 2026-10-21 12:06 | 0 | 1,433 ± 138 | 62 |
| v3 | 2026-10-21 12:06 | 2026-10-21 20:04 | 26 | 1,600 ± 96 | 191 |
| v4 | 2026-10-21 20:04 | 2026-10-22 00:08 | 0 | 1,342 ± 105 | 220 |
| v5 | 2026-10-22 00:08 | 2026-10-22 07:55 | 11 | 1,477 ± 72 | 439 |
| v6 | 2026-10-22 07:55 | 2026-10-23 00:30 | 0 | 1,498 ± 66 | 322 |
| v7 | 2026-10-23 00:30 | 2026-10-24 06:41 | 6 | 1,627 ± 44 | 1804 |
| v8 | 2026-10-24 06:41 | 2026-10-25 07:24 | 5 | 1,686 ± 62 | 356 |
| v9 | 2026-10-25 07:24 | 2026-10-25 15:27 | 4 | 1,766 ± 111 | 48 |
| v10 | 2026-10-25 15:27 | 2026-10-25 20:50 | 0 | 1,756 ± 126 | 36 |
| v11 | 2026-10-25 20:50 | 2026-10-26 10:39 | 11 | 1,757 ± 93 | 69 |
| v12 | 2026-10-26 10:39 | now | 11 | 1,844 ± 66 | 168 |

| Submission | Build | First rated match | Time | Rating before | Rating after | Rated matches | BT |
|---:|---|---:|---|---:|---:|---:|---:|
| #1 | v1 | 1 | 2026-10-21 09:21 PDT | 0 | 237 | 12 | 1453 ± 136 |
| #7 | v3 | 66 | 2026-10-21 12:22 PDT | 1,208 | 1,270 | 26 | 1600 ± 96 |
| #95 | v5 | 220 | 2026-10-22 01:00 PDT | 1,725 | 1,732 | 11 | 1477 ± 72 |
| #105 | v7 | 444 | 2026-10-23 09:00 PDT | 1,657 | 1,657 | 4 | 1627 ± 44 |
| #118 | v7 | 658 | 2026-10-23 23:37 PDT | 1,645 | 1,653 | 2 | 1627 ± 44 |
| #161 | v8 | 800 | 2026-10-24 09:00 PDT | 1,660 | 1,653 | 4 | 1686 ± 62 |
| #189 | v8 | 1175 | 2026-10-25 07:34 PDT | 1,635 | 1,631 | 1 | 1686 ± 62 |
| #191 | v9 | 1216 | 2026-10-25 09:00 PDT | 1,631 | 1,634 | 4 | 1766 ± 111 |
| #205 | v11 | 1467 | 2026-10-25 21:54 PDT | 1,622 | 1,618 | 7 | 1757 ± 93 |
| #223 | v11 | 1687 | 2026-10-26 09:00 PDT | 1,594 | 1,590 | 4 | 1757 ± 93 |
| #229 | v12 | 1859 | 2026-10-26 11:19 PDT | 1,579 | 1,575 | 6 | 1844 ± 66 |
| #245 | v12 | 1960 | 2026-10-26 22:38 PDT | 1,608 | 1,612 | 1 | 1844 ± 66 |
| #259 | v12 | 2039 | 2026-10-27 03:05 PDT | 1,612 | 1,625 | 1 | 1844 ± 66 |
| #263 | v12 | 2095 | 2026-10-27 06:22 PDT | 1,625 | 1,628 | 1 | 1844 ± 66 |
| #273 | v12 | 2122 | 2026-10-27 07:27 PDT | 1,628 | 1,615 | 1 | 1844 ± 66 |
| #275 | v12 | 2134 | 2026-10-27 08:19 PDT | 1,615 | 1,619 | 1 | 1844 ± 66 |
