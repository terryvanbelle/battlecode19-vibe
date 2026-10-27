// idlecastle.mjs TEAM REPLAY: TEAM's castles in the opening, before TEAM's first church (or to r150 without one).
// Prints one JSON line: idle (castle turns with no build and no attack while the bank held a pilgrim and DEF_RESERVE_K,
// 40 K, and 50 F), first (the first such turn's round), church (TEAM's first church round, null before r150), theirs
// (the enemy's), pilgrims (TEAM's pilgrims built before its first church) and dead (TEAM's pilgrims dead before r150).
// PIONEER_IDLE's case (TRAINING_LOG 2026-10-26 21:14): v12's castles idled 24+ such turns in every panel game.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { simulate } = require('../replay.js');
const [team, f] = [+process.argv[2], process.argv[3]];
if (!(team === 0 || team === 1) || !f) { console.error('usage: node tools/reads/idlecastle.mjs TEAM REPLAY'); process.exit(2); }
let church = null, theirs = null, idle = 0, first = null, pilgrims = 0, dead = 0;
const STOP = {};   // thrown past r150 to end the simulation early
try {
  simulate(fs.readFileSync(f), {
    onTurn({ round, robot, rec, born, died, error, game }) {
      if (round > 150) throw STOP;
      for (const b of born) {
        if (b.unit === 1 && b.team === team && church === null) church = round;
        if (b.unit === 1 && b.team !== team && theirs === null) theirs = round;
        if (b.unit === 2 && b.team === team && church === null) pilgrims++;
      }
      for (const d of died) if (d.unit === 2 && d.team === team && round < 150) dead++;
      if (error || robot.team !== team || robot.unit !== 0 || church !== null) return;
      if (rec.action !== 2 && rec.action !== 3 && game.karbonite[team] >= 40 && game.fuel[team] >= 50) {
        idle++; if (first === null) first = round;
      }
    },
  });
} catch (e) { if (e !== STOP) throw e; }
console.log(JSON.stringify({ idle, first, church, theirs, pilgrims, dead }));
