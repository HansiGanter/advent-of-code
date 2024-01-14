const fs = require("fs");
const file = fs.readFileSync("./inputs/17-hansi").toString();

const rocks = [
  `####`,
  `.#.
###
.#.`,
  `..#
..#
###`,
  `#
#
#
#`,
  `##
##`,
];

class Rock {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
  }
}

let field = [[], [], [], [], []];
let totalHeight = 3;
let shape = 0;
let rock = new Rock(2, totalHeight, shape % 5);
let createNewRock = false;
let numberOfRocks = 0;
let directionIndex = -1;
let memory = [
  {
    snap: "",
    height: 0,
    numRocks: 0,
  },
];
let FINALROCKGOAL = 1000000000000;
let ADDITIONALHEIGHT = 0;

while (true) {
  directionIndex++;
  direction = file[directionIndex % file.length];

  if (createNewRock) {
    switch (rock.shape) {
      case 0:
        drawHLine(rock.x, rock.y);
        break;
      case 1:
        drawPlus(rock.x, rock.y);
        break;
      case 2:
        drawReverseL(rock.x, rock.y);
        break;
      case 3:
        drawVLine(rock.x, rock.y);
        break;
      case 4:
        drawSquare(rock.x, rock.y);
        break;

      default:
        break;
    }

    //2021
    // 1000000000000
    if (numberOfRocks === FINALROCKGOAL) {
      console.log(totalHeight + ADDITIONALHEIGHT - 3);
      break;
    }

    shape++;
    switch (rock.shape) {
      case 0:
        //HLINE
        totalHeight = rock.y + 4 > totalHeight ? rock.y + 4 : totalHeight;
        break;
      case 1:
        //PLUS
        totalHeight = rock.y + 6 > totalHeight ? rock.y + 6 : totalHeight;
        break;
      case 2:
        //REVERSEL
        totalHeight = rock.y + 6 > totalHeight ? rock.y + 6 : totalHeight;
        break;
      case 3:
        //SQUARE
        totalHeight = rock.y + 7 > totalHeight ? rock.y + 7 : totalHeight;
        break;
      case 4:
        //SQUARE
        totalHeight = rock.y + 5 > totalHeight ? rock.y + 5 : totalHeight;
        break;
      default:
        break;
    }

    const addRows = totalHeight + 5 - field.length;
    for (let i = 0; i < addRows; i++) {
      field.push([]);
    }

    rock = new Rock(2, totalHeight, shape % 5);
    numberOfRocks++;
  }

  switch (rock.shape) {
    case 0:
      //HLINE
      [rock, createNewRock] = hline(rock, direction);
      break;
    case 1:
      //PLUS
      [rock, createNewRock] = plus(rock, direction);
      break;
    case 2:
      //REVERSEL
      [rock, createNewRock] = reverseL(rock, direction);
      break;
    case 3:
      //VLINE
      [rock, createNewRock] = vline(rock, direction);
      break;
    case 4:
      //SQUARE
      [rock, createNewRock] = square(rock, direction);
      break;

    default:
      break;
  }

  if (directionIndex % (file.length * rocks.length) === 0) {
    detectLoop();
  }
}

function square(rock, direction) {
  let newRock = false;

  if (direction === "<") {
    rock.x =
      checkLeft(rock.x, rock.y) && checkLeft(rock.x, rock.y + 1)
        ? rock.x - 1
        : rock.x;
  } else if (direction === ">") {
    rock.x =
      checkRight(rock.x + 1, rock.y) && checkRight(rock.x + 1, rock.y + 1)
        ? rock.x + 1
        : rock.x;
  }

  if (checkDown(rock.x, rock.y) && checkDown(rock.x + 1, rock.y)) {
    rock.y--;
  } else newRock = true;

  return [rock, newRock];
}
function hline(rock, direction) {
  let newRock = false;

  if (direction === "<") {
    rock.x = checkLeft(rock.x, rock.y) ? rock.x - 1 : rock.x;
  } else if (direction === ">") {
    rock.x = checkRight(rock.x + 3, rock.y) ? rock.x + 1 : rock.x;
  }

  if (
    checkDown(rock.x, rock.y) &&
    checkDown(rock.x + 1, rock.y) &&
    checkDown(rock.x + 2, rock.y) &&
    checkDown(rock.x + 3, rock.y)
  ) {
    rock.y--;
  } else newRock = true;

  return [rock, newRock];
}
function plus(rock, direction) {
  let newRock = false;

  if (direction === "<") {
    rock.x =
      checkLeft(rock.x + 1, rock.y) &&
      checkLeft(rock.x, rock.y + 1) &&
      checkLeft(rock.x + 1, rock.y + 2)
        ? rock.x - 1
        : rock.x;
  } else if (direction === ">") {
    rock.x =
      checkRight(rock.x + 1, rock.y) &&
      checkRight(rock.x + 2, rock.y + 1) &&
      checkRight(rock.x + 1, rock.y + 2)
        ? rock.x + 1
        : rock.x;
  }

  if (
    checkDown(rock.x + 1, rock.y) &&
    checkDown(rock.x, rock.y + 1) &&
    checkDown(rock.x + 2, rock.y + 1)
  ) {
    rock.y--;
  } else newRock = true;

  return [rock, newRock];
}
function reverseL(rock, direction) {
  let newRock = false;

  if (direction === "<") {
    rock.x =
      checkLeft(rock.x, rock.y) &&
      checkLeft(rock.x + 2, rock.y + 1) &&
      checkLeft(rock.x + 2, rock.y + 2)
        ? rock.x - 1
        : rock.x;
  } else if (direction === ">") {
    rock.x =
      checkRight(rock.x + 2, rock.y) &&
      checkRight(rock.x + 2, rock.y + 1) &&
      checkRight(rock.x + 2, rock.y + 2)
        ? rock.x + 1
        : rock.x;
  }

  if (
    checkDown(rock.x, rock.y) &&
    checkDown(rock.x + 1, rock.y) &&
    checkDown(rock.x + 2, rock.y)
  ) {
    rock.y--;
  } else newRock = true;

  return [rock, newRock];
}
function vline(rock, direction) {
  let newRock = false;

  if (direction === "<") {
    rock.x =
      checkLeft(rock.x, rock.y) &&
      checkLeft(rock.x, rock.y + 1) &&
      checkLeft(rock.x, rock.y + 2) &&
      checkLeft(rock.x, rock.y + 3)
        ? rock.x - 1
        : rock.x;
  } else if (direction === ">") {
    rock.x =
      checkRight(rock.x, rock.y) &&
      checkRight(rock.x, rock.y + 1) &&
      checkRight(rock.x, rock.y + 2) &&
      checkRight(rock.x, rock.y + 3)
        ? rock.x + 1
        : rock.x;
  }

  if (checkDown(rock.x, rock.y)) {
    rock.y--;
  } else newRock = true;

  return [rock, newRock];
}

function drawHLine(x, y) {
  field[y][x] = 1;
  field[y][x + 1] = 1;
  field[y][x + 2] = 1;
  field[y][x + 3] = 1;
}
function drawVLine(x, y) {
  field[y][x] = 1;
  field[y + 1][x] = 1;
  field[y + 2][x] = 1;
  field[y + 3][x] = 1;
}
function drawSquare(x, y) {
  field[y][x] = 1;
  field[y][x + 1] = 1;
  field[y + 1][x] = 1;
  field[y + 1][x + 1] = 1;
}
function drawPlus(x, y) {
  field[y][x + 1] = 1;
  field[y + 1][x] = 1;
  field[y + 1][x + 1] = 1;
  field[y + 1][x + 2] = 1;
  field[y + 2][x + 1] = 1;
}
function drawReverseL(x, y) {
  field[y][x] = 1;
  field[y][x + 1] = 1;
  field[y][x + 2] = 1;
  field[y + 1][x + 2] = 1;
  field[y + 2][x + 2] = 1;
}

function checkLeft(x, y) {
  if (x <= 0) return false;
  else if (field[y][x - 1] === 1) return false;
  return true;
}
function checkRight(x, y) {
  if (x >= 6) return false;
  else if (field[y][x + 1] === 1) return false;
  return true;
}
function checkDown(x, y) {
  if (y <= 0) return false;
  else if (field[y - 1][x] === 1) return false;
  return true;
}

function detectLoop() {
  let snapshot = JSON.stringify(
    field.slice(memory[memory.length - 1].height, field.length - 1)
  );
  memory.push({
    snap: snapshot,
    height: totalHeight,
    numRocks: numberOfRocks,
  });
  if (memory[memory.length - 1].snap === memory[memory.length - 2].snap) {
    let heigthIncrease =
      memory[memory.length - 1].height - memory[memory.length - 2].height;
    let rockIncrease =
      memory[memory.length - 1].numRocks - memory[memory.length - 2].numRocks;

    let roundsToIncrease = Math.floor(
      (1000000000000 - numberOfRocks) / rockIncrease
    );

    FINALROCKGOAL -= roundsToIncrease * rockIncrease;
    ADDITIONALHEIGHT = roundsToIncrease * heigthIncrease;
  }
}
