// Radio: 16 bits = 4-bit type + 12-bit payload (x 6 bits, y 6 bits, canonical frame; or a number < 4096).
// Coordinates in messages are canonical: every robot of a team shares one canonical frame (world.js).
export const SIG = {
  MINE: 1,    // structure -> newborn pilgrim: mine depot (x, y)
  CHURCH: 2,  // castle -> newborn pilgrim: build a church at site (x, y)
  ROUND: 3,   // builder -> newborn structure/unit: the current round
  ATTACK: 4,  // castle -> army: march on enemy structure at (x, y)
  ENEMY: 5,   // any -> nearby army: enemy attackers seen at (x, y)
  POST: 6,    // castle -> military (far, FAR.POST): a castle of ours stands at (x, y) (CFG.CASTLE_POST)
  FRONT: 7,   // structure -> newborn pilgrim: build a church at the builder's front site (struct.js frontSite); v = round
  ZONE: 8,    // structure -> newborn military (r2 25, the turn after the build): a unit of ours died at (x, y) (CFG.KILL_ZONE)
  RECALL: 9,  // castle -> army (far, FAR.RECALL): come home to the castle at (x, y), it is under attack (CFG.RECALL)
  CHAIN: 10,  // castle -> newborn chainer, chain link -> newborn link or military: church chain at the enemy castle (x, y)
  HUNT: 11,   // pilgrim -> melee units (far, FAR.HUNT): an enemy pilgrim loiters in our half at (x, y) (CFG.HUNT)
  GUARD: 12,  // castle -> newborn military: hold the lattice around a pioneer's site (x, y) (CFG.ESCORT); sent at r2
              // GUARD_STRIKE (CFG.STRIKE_FAR): first walk to the enemy church at (x, y) until its tile is seen without it
  THREAT: 13, // structure -> newborn military (r2 25, the turn after the build): an enemy prophet stands at (x, y) (CFG.SIEGE)
  WALL: 14,   // line church -> the rest of its line (far, FAR.WALL): the line ends, it faces a wall (CFG.CHAIN_WALL)
  HOP: 15,    // castle -> a church of ours and its newborn: v = target cluster << 6 | the church's cluster (CFG.HOP_GAIN)
  STRIKE: 16, // far only (FAR.STRIKE, never encoded): pilgrim -> castles: an enemy church stands at (x, y) (CFG.STRIKE_FAR)
};
export const GUARD_STRIKE = 3;   // the r2 of a SIG.GUARD that makes the newborn a striker (buildToward sends others at 2)
export const HOARD_R2 = 3;       // the r2 of a castle's SIG.ROUND that makes the newborn crusader a held one (CFG.HOARD_ROUND)
export const MUSTER_R2 = 3;      // the r2 of a SIG.THREAT whose (x, y) is the newborn's hold tile, not the camper (CFG.MUSTER_TILE)
export function encXY(type, x, y) { return (type << 12) | (x << 6) | y; }
export function encNum(type, v) { return (type << 12) | (v & 4095); }
export function dec(sig) { return { type: sig >> 12, x: (sig >> 6) & 63, y: sig & 63, v: sig & 4095 }; }

// Castle talk (8 bits, free, read by our castles only). Castles: x+1 on turn 1, y+1 on turn 2 (canonical).
// Afterwards every robot reports a status byte:
export const CT = {
  HOP: 1,        // + cluster index (< 63): a pioneer a church built for a castle, on its first turn (CFG.HOP_GAIN; the
                 // castles' own 1-64 position bytes are read only through their turn 3)
  CHURCH: 128,   // + cluster index (< 128): a pilgrim built a church at that cluster's site this turn (CFG.HOP_GAIN: and
                 // the church itself on its first turn, so castles learn its id)
  UNIT: 64,      // + unit type: the default status byte of every robot from round 4 (castles count the army)
  DEAD: 72,      // + enemy castle index (< 4, see castle.js): a unit saw that enemy castle gone
  WAIT: 76,      // a pioneer at its free site waiting for the church's karbonite (CFG.PIONEER_HOLD)
  BLOCKED: 77,   // a pioneer that sees an enemy attacker by its site (CFG.PIONEER_CALL): its castle sends the escort now
  MARCH: 80,     // + unit type: status byte of a military unit not free for a wave: marching, or home guard (CFG.WAVE)
  TAKEN: 88,     // + cluster index (< 40): a pioneer saw an enemy structure at that cluster's site (CFG.EXPAND_ROUND)
  CHAINER: 70,   // a chainer still walking or waiting (CFG.CHAIN_ROUND, chain.js)
  CHAINGONE: 71, // a chainer saw its target castle gone
  CHAINFIRE: 78, // a chainer built its line's first church this turn (CFG.CHAIN_FAILS)
  STAGED: 79,    // a chainer staged, waiting for the bank (CFG.CHAIN_LIVE 2; otherwise it reports CHAINER)
  WALL: 86,      // a line church ended its line facing a wall (CFG.CHAIN_WALL)
};

// Far messages (to robots that may not see the sender, so cannot check its team): the message type is the exact
// signal radius, which every receiver sees (game.js:675-700). Unusual radii make enemy radio almost never pass.
// Payload: encXY(0, x, y) | extra bits in the top 4 bits (ATTACK: enemy castle index + 1, 0 = none).
// WIDE is an ATTACK to the whole map (max r2 2*63^2 = 7938); RECALL reaches 50 tiles, POST 60, HUNT 20, WALL 17,
// STRIKE 30.
export const FAR = { ATTACK: 398, ENEMY: 99, WIDE: 7930, RECALL: 2501, POST: 3601, HUNT: 403, WALL: 290, STRIKE: 902 };   // ceil(sqrt) costs: 20, 10, 90, 51, 61, 21, 18, 31
export function decFarRobot(r) {
  if (!(r.signal >= 0)) return null;
  const type = r.signal_radius === FAR.ATTACK || r.signal_radius === FAR.WIDE ? SIG.ATTACK : r.signal_radius === FAR.ENEMY ? SIG.ENEMY
    : r.signal_radius === FAR.RECALL ? SIG.RECALL : r.signal_radius === FAR.POST ? SIG.POST : r.signal_radius === FAR.HUNT ? SIG.HUNT
    : r.signal_radius === FAR.WALL ? SIG.WALL : r.signal_radius === FAR.STRIKE ? SIG.STRIKE : 0;
  if (!type) return null;
  return { type, x: (r.signal >> 6) & 63, y: r.signal & 63, extra: r.signal >> 12 };
}
