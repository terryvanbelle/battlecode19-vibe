// A bot whose first turn never returns: batch.js's game cap must end its game under --no-kill (test/tools.test.js).
import { BCAbstractRobot } from 'battlecode';

class MyRobot extends BCAbstractRobot {
  turn() { for (;;) { /* never returns */ } }
}

var robot = new MyRobot();
