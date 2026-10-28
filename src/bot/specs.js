// Game constants (copied from the engine's specs.json; test/bot.test.mjs checks they match).
export const CASTLE = 0, CHURCH = 1, PILGRIM = 2, CRUSADER = 3, PROPHET = 4, PREACHER = 5;
export const UNIT_NAMES = ['castle', 'church', 'pilgrim', 'crusader', 'prophet', 'preacher'];
// [costK, costF, hp, vision r2, speed r2, fuel per r2 moved, attack r2 min, attack r2 max, damage, attack fuel, splash r2]
export const STATS = [
  { costK: 0, costF: 0, hp: 200, vision: 100, speed: 0, fuelPerMove: 0, atkMin: 1, atkMax: 64, damage: 10, atkFuel: 10, splash: 0 },
  { costK: 50, costF: 200, hp: 100, vision: 100, speed: 0, fuelPerMove: 0, atkMin: 0, atkMax: 0, damage: 0, atkFuel: 0, splash: 0 },
  { costK: 10, costF: 50, hp: 10, vision: 100, speed: 4, fuelPerMove: 1, atkMin: 0, atkMax: 0, damage: 0, atkFuel: 0, splash: 0 },
  { costK: 15, costF: 50, hp: 40, vision: 49, speed: 9, fuelPerMove: 1, atkMin: 1, atkMax: 16, damage: 10, atkFuel: 10, splash: 0 },
  { costK: 25, costF: 50, hp: 20, vision: 64, speed: 4, fuelPerMove: 2, atkMin: 16, atkMax: 64, damage: 10, atkFuel: 25, splash: 0 },
  { costK: 30, costF: 50, hp: 60, vision: 16, speed: 4, fuelPerMove: 3, atkMin: 1, atkMax: 16, damage: 20, atkFuel: 15, splash: 3 },
];
export const KARB_CAP = 20, FUEL_CAP = 100, KARB_YIELD = 2, FUEL_YIELD = 10, MINE_FUEL = 1;
export const MAX_ROUNDS = 1000;
export const START_K = 100;   // each team's karbonite at round 1 (INITIAL_KARBONITE)
