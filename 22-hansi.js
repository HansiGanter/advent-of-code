const fs = require("fs");
const input = fs.readFileSync("./inputs/22-hansi").toString();
let [map, instructions] = input.split("\n\n");

// parse map
map = map.split("\n").map((row) => row.split(""));

// parse instructions
const pattern = /[RL]?\d+/g;
instructions = ("R" + instructions).match(pattern);

function getDirection(currentDirection, turn) {
  // 0: north, 1: east, 2: south, 3: west
  return turn === "R" ? (currentDirection + 1) % 4 : (currentDirection + 3) % 4;
}
const nextStep = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};

const me = { position: [0, map[0].indexOf(".")], direction: 0 };

function part1() {
  instructions.forEach((instruction) => {
    const [turn, steps] = [instruction[0], Number(instruction.slice(1))];
    me.direction = getDirection(me.direction, turn);
    for (let i = steps; i > 0; i--) {
      const [y, x] = me.position;
      let [dy, dx] = nextStep[me.direction];
      if (map[y + dy]?.[x + dx] !== "." && map[y + dy]?.[x + dx] !== "#") {
        let row;
        let col;
        switch (me.direction) {
          case 0:
            // get first valid item in column from bottom to top
            row = map.length - 1;
            while (map[row]?.[x] !== "." && map[row]?.[x] !== "#") {
              row--;
            }
            dy = row;
            break;
          case 1:
            // get first valid item in row from left to right
            col = 0;
            while (map[y]?.[col] !== "." && map[y]?.[col] !== "#") {
              col++;
            }
            dx = col - x;
            break;
          case 2:
            // get first valid item in column from top to bottom
            row = 0;
            while (map[row]?.[x] !== "." && map[row]?.[x] !== "#") {
              row++;
            }
            dy = row - y;
            break;
          case 3:
            // get first valid item in row from right to left
            col = map[y].length - 1;
            while (map[y]?.[col] !== "." && map[y]?.[col] !== "#") {
              col--;
            }
            dx = col - x;
            break;
        }
      }
      if (map[y + dy]?.[x + dx] === ".") {
        me.position = [y + dy, x + dx];
      } else if (map[y + dy]?.[x + dx] === "#") {
        break;
      }
    }
  });
}

function part2() {
  instructions.forEach((instruction) => {
    const [turn, steps] = [instruction[0], Number(instruction.slice(1))];
    me.direction = getDirection(me.direction, turn);
    for (let i = steps; i > 0; i--) {
      const [y, x] = me.position;
      let [dy, dx] = nextStep[me.direction];
      let dir = me.direction;
      if (map[y + dy]?.[x + dx] !== "." && map[y + dy]?.[x + dx] !== "#") {
        switch (me.direction) {
          case 0:
            if (x >= 0 && x <= 49) {
              dir = 1;
              dy = 50 + x;
              dx = 50;
            } else if (x >= 50 && x <= 99) {
              dir = 1;
              dy = 100 + x;
              dx = 0;
            } else if (x >= 100 && x <= 149) {
              dir = 0;
              dy = 199;
              dx = x - 100;
            }
            break;
          case 1:
            if (y >= 0 && y <= 49) {
              dir = 3;
              dy = 149 - y;
              dx = 99;
            } else if (y >= 50 && y <= 99) {
              dir = 0;
              dy = 49;
              dx = 50 + y;
            } else if (y >= 100 && y <= 149) {
              dir = 3;
              dy = 149 - y;
              dx = 149;
            } else if (y >= 150 && y <= 199) {
              dir = 0;
              dy = 149;
              dx = y - 100;
            }
            break;
          case 2:
            if (x >= 0 && x <= 49) {
              dir = 2;
              dy = 0;
              dx = 100 + x;
            } else if (x >= 50 && x <= 99) {
              dir = 3;
              dy = 100 + x;
              dx = 49;
            } else if (x >= 100 && x <= 149) {
              dir = 3;
              dy = x - 50;
              dx = 99;
            }
            break;
          case 3:
            if (y >= 0 && y <= 49) {
              dir = 1;
              dy = 149 - y;
              dx = 0;
            } else if (y >= 50 && y <= 99) {
              dir = 2;
              dy = 100;
              dx = y - 50;
            } else if (y >= 100 && y <= 149) {
              dir = 1;
              dy = 149 - y;
              dx = 50;
            } else if (y >= 150 && y <= 199) {
              dir = 2;
              dy = 0;
              dx = y - 100;
            }
            break;
          default:
            break;
        }
        dy = dy - y;
        dx = dx - x;
      }
      if (map[y + dy]?.[x + dx] === ".") {
        me.position = [y + dy, x + dx];
        me.direction = dir;
      } else if (map[y + dy]?.[x + dx] === "#") {
        break;
      }
    }
  });
}
// part1();
part2();

console.log(
  1000 * (me.position[0] + 1) +
    4 * (me.position[1] + 1) +
    ((me.direction + 3) % 4)
);
