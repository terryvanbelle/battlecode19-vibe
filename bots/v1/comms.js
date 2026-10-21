// Radio: 16 bits = 4-bit type + 12-bit payload (x 6 bits, y 6 bits, or a number).
export const SIG = { MINE: 1, CHURCH: 2, ROUND: 3, RALLY: 4, ATTACK: 5 };
export function encXY(type, x, y) { return (type << 12) | (x << 6) | y; }
export function encNum(type, v) { return (type << 12) | (v & 4095); }
export function dec(sig) { return { type: sig >> 12, x: (sig >> 6) & 63, y: sig & 63, v: sig & 4095 }; }
// Castle talk (8 bits). Castles send x+1 in round 1 and y+1 in round 2. Pilgrims send CT_CHURCH + cluster index
// on the turn they build a church.
export const CT_CHURCH = 100;
