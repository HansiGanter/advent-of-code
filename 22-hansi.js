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
      //   console.log(me.position);
    } else if (map[y + dy]?.[x + dx] === "#") {
      //   console.log(me.position);
      break;
    }
  }
});
console.log(
  1000 * (me.position[0] + 1) +
    4 * (me.position[1] + 1) +
    ((me.direction + 3) % 4)
);
