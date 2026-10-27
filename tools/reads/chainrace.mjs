// chainrace.mjs TEAM REPLAY: church-chain lines of both teams (a round in which a team builds 3+ churches, from r150).
// Prints one JSON line: ours / theirs: per line {r, links, d2: the line's nearest church to the nearest living
// castle of the other team (r2), kill: rounds to the first castle of the other team destroyed within 60 rounds of the
// line, else null}; bankAt: TEAM's karbonite and fuel at the start of the enemy's first line's round (null if none);
// lost: rounds TEAM's castles died.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/chainrace.mjs TEAM REPLAY'); process.exit(2); }
const d2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
const built = [new Map(), new Map()], deaths = [[], []], bank = new Map();
let game = null;
simulate(fs.readFileSync(f), {
  onStart(g) { game = g; },
  onTurn({ round, robot, rec, born, died, error }) {
    for (const d of died) if (d.unit === 0) deaths[d.team].push(round);
    if (!bank.has(round)) bank.set(round, [game.karbonite[team], game.fuel[team]]);
    if (error || round < 150 || rec.action !== 3) return;
    for (const b of born) if (b.unit === 1) {
      const m = built[robot.team];
      const castles = game.robots.filter(q => q.unit === 0 && q.team !== robot.team);
      const near = castles.length ? Math.min(...castles.map(c => d2(c, b))) : null;
      const l = m.get(round) || { r: round, links: 0, d2: null };
      l.links++; if (near !== null && (l.d2 === null || near < l.d2)) l.d2 = near;
      m.set(round, l);
    }
  },
});
const lines = t => [...built[t].values()].filter(l => l.links >= 3).map(l => {
  const k = deaths[1 - t].find(r => r >= l.r && r <= l.r + 60);
  return { ...l, kill: k === undefined ? null : k - l.r };
});
const ours = lines(team), theirs = lines(1 - team);
console.log(JSON.stringify({ ours, theirs, bankAt: theirs.length ? bank.get(theirs[0].r) || null : null, lost: deaths[team] }));
