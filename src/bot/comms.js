// Radio: 16 bits = 4-bit type + 12-bit payload (x 6 bits, y 6 bits, canonical frame; or a number < 4096).
// Coordinates in messages are canonical: every robot of a team shares one canonical frame (world.js).
export const SIG = {
  MINE: 1,    // structure -> newborn pilgrim: mine depot (x, y)
  CHURCH: 2,  // castle -> newborn pilgrim: build a church at site (x, y)
  ROUND: 3,   // builder -> newborn structure/unit: the current round
  ATTACK: 4,  // castle -> army: march on enemy structure at (x, y)
  ENEMY: 5,   // any -> nearby army: enemy attackers seen at (x, y)
  POST: 6,    // structure -> newborn military: hold lattice near (x, y) (the structure)
};
export function encXY(type, x, y) { return (type << 12) | (x << 6) | y; }
export function encNum(type, v) { return (type << 12) | (v & 4095); }
export function dec(sig) { return { type: sig >> 12, x: (sig >> 6) & 63, y: sig & 63, v: sig & 4095 }; }

// Castle talk (8 bits, free, read by our castles only). Castles: x+1 on turn 1, y+1 on turn 2 (canonical).
// Afterwards every robot reports a status byte:
export const CT = {
  CHURCH: 128,   // + cluster index (< 128): a pilgrim built a church at that cluster's site this turn
  UNIT: 64,      // + unit type: the default status byte of every robot from round 4 (castles count the army)
  DEAD: 72,      // + enemy castle index (< 4, see castle.js): a unit saw that enemy castle gone
  MARCH: 80,     // + unit type: status byte of a military unit not free for a wave: marching, or home guard (CFG.WAVE)
  TAKEN: 88,     // + cluster index (< 40): a pioneer saw an enemy structure at that cluster's site (CFG.EXPAND_ROUND)
};

// Far messages (to robots that may not see the sender, so cannot check its team): the message type is the exact
// signal radius, which every receiver sees (game.js:675-700). Unusual radii make enemy radio almost never pass.
// Payload: encXY(0, x, y) | extra bits in the top 4 bits (ATTACK: enemy castle index + 1, 0 = none).
// WIDE is an ATTACK to the whole map (max r2 2*63^2 = 7938).
export const FAR = { ATTACK: 398, ENEMY: 99, WIDE: 7930 };   // ceil(sqrt) costs: 20, 10, 90
export function decFarRobot(r) {
  if (!(r.signal >= 0)) return null;
  const type = r.signal_radius === FAR.ATTACK || r.signal_radius === FAR.WIDE ? SIG.ATTACK : r.signal_radius === FAR.ENEMY ? SIG.ENEMY : 0;
  if (!type) return null;
  return { type, x: (r.signal >> 6) & 63, y: r.signal & 63, extra: r.signal >> 12 };
}
