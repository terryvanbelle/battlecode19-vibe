# sum.py FIELD[,FIELD...] [--ge N] [FILE...]: means of JSON fields over games.sh output lines ("match opponent map team
# W|L rounds {json}"), over all lines, wins and losses, and per opponent; null values are left out of a field's mean.
# --ge N also counts the lines whose first field is N or more. Reads stdin when no FILE is given.
#   tools/reads/games.sh idle.mjs 300 -- 1180-... | python3 -I tools/reads/sum.py stuckM --ge 50
import json, statistics, sys


def parse(lines):
    for line in lines:
        p = line.rstrip('\n').split(' ', 6)
        if len(p) == 7 and p[6].startswith('{'):
            yield {'match': p[0], 'opp': p[1], 'map': p[2], 'team': p[3], 'wl': p[4], 'rounds': p[5], 'v': json.loads(p[6])}


def line(label, rows, fields, ge):
    out = [f'{label}: {len(rows)}']
    for f in fields:
        xs = [r['v'][f] for r in rows if r['v'].get(f) is not None]
        out.append(f'{f} mean {sum(xs) / len(xs):.2f} median {statistics.median(xs):g} (n {len(xs)})' if xs else f'{f} -')
    if ge is not None:
        out.append(f'{fields[0]} >= {ge:g}: {sum(1 for r in rows if (r["v"].get(fields[0]) or 0) >= ge)}')
    return '; '.join(out)


def main(argv):
    if not argv or argv[0].startswith('-'):
        print(__doc__ if __doc__ else 'usage: sum.py FIELD[,FIELD...] [--ge N] [FILE...]', file=sys.stderr)
        return 2
    fields, rest, ge, files = argv[0].split(','), argv[1:], None, []
    while rest:
        a = rest.pop(0)
        if a == '--ge':
            ge = float(rest.pop(0))
        else:
            files.append(a)
    rows = list(parse(l for f in files for l in open(f))) if files else list(parse(sys.stdin))
    if not rows:
        print('no rows', file=sys.stderr)
        return 1
    print(line('all', rows, fields, ge))
    for wl in 'WL':
        g = [r for r in rows if r['wl'] == wl]
        if g:
            print(line(wl, g, fields, ge))
    for o in sorted({r['opp'] for r in rows}):
        print(line('  ' + o, [r for r in rows if r['opp'] == o], fields, ge))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
