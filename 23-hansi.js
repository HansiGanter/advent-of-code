const fs = require("fs");
const input = fs.readFileSync("./inputs/23-hansi").toString();

const grove = input.split("\n").map((line) => line.split(""));

const getNeighbors = {
  0: [
    [-1, -1],
    [0, -1],
    [1, -1],
  ],
  1: [
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
  2: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ],
  3: [
    [1, -1],
    [1, 0],
    [1, 1],
  ],
};

class Elf {
  x;
  y;
  proposedx;
  proposedy;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.proposedx = x;
    this.proposedy = y;
  }

  get x() {
    return this.x;
  }
  set x(x) {
    this.x = x;
    this.proposedx = x;
  }
  get y() {
    return this.y;
  }
  set y(y) {
    this.y = y;
    this.proposedy = y;
  }
  proposed() {
    return !(this.proposedx === this.x && this.proposedy === this.y);
  }

  acceptProposal() {
    this.x = this.proposedx;
    this.y = this.proposedy;
  }

  rejectProposal() {
    this.proposedx = this.x;
    this.proposedy = this.y;
  }

  getNeighbors(direction) {
    return getNeighbors[direction].map((dir) => [
      dir[0] + this.x,
      dir[1] + this.y,
    ]);
  }
}

const elves = [];
grove.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (cell === "#") elves.push(new Elf(x, y));
  });
});

function includesElf(positions, elf) {
  return positions.some(
    (pos) => JSON.stringify(pos) === JSON.stringify([elf.x, elf.y])
  );
}

function part1() {
  let startDir = 0;
  for (let round = 0; round < 10; round++) {
    // PROPOSE TO MOVE
    elves.forEach((elf) => {
      // first check if no elf around
      let elvesAround = false;
      elves.forEach((otherElf) => {
        if (otherElf === elf || elvesAround) {
          return;
        }
        for (let i = 0; i < 4; i++) {
          if (includesElf(elf.getNeighbors(i), otherElf)) {
            elvesAround = true;
            return;
          }
        }
      });
      if (!elvesAround) return;

      // check if we can propose to move
      let canPropose;
      loopdirections: for (let dir = startDir; dir < startDir + 4; dir++) {
        canPropose = true;
        for (const otherElf of elves) {
          if (otherElf === elf) continue;
          else if (includesElf(elf.getNeighbors(dir % 4), otherElf)) {
            canPropose = false;
            continue loopdirections;
          }
        }
        if (canPropose) {
          elf.proposedx = elf.getNeighbors(dir % 4)[1][0];
          elf.proposedy = elf.getNeighbors(dir % 4)[1][1];
          return;
        }
      }
    });

    // ACTUALLY MOVE
    proposingElves = elves.filter((elf) => elf.proposed());
    // find duplicate proposals
    const counts = new Map();
    proposingElves.forEach((elf) => {
      const key = `${elf.proposedx},${elf.proposedy}`;
      if (!counts.has(key)) {
        counts.set(key, []);
      }
      counts.get(key).push(elf);
    });
    counts.forEach((elves) => {
      if (elves.length > 1) {
        elves.forEach((elf) => elf.rejectProposal());
      } else {
        elves[0].acceptProposal();
      }
    });
    startDir += 1;
  }
  let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];
  elves.forEach((elf) => {
    minX = Math.min(minX, elf.x);
    maxX = Math.max(maxX, elf.x);
    minY = Math.min(minY, elf.y);
    maxY = Math.max(maxY, elf.y);
  });
  const area = (maxX + 1 - minX) * (maxY + 1 - minY);
  console.log(area);
  console.log(area - elves.length);
}

function part2() {
  let startDir = 0;
  let allInPlace = false;
  while (!allInPlace) {
    // PROPOSE TO MOVE
    allInPlace = true;
    elves.forEach((elf) => {
      // first check if no elf around
      let elvesAround = false;
      elves.forEach((otherElf) => {
        if (otherElf === elf || elvesAround) {
          return;
        }
        for (let i = 0; i < 4; i++) {
          if (includesElf(elf.getNeighbors(i), otherElf)) {
            elvesAround = true;
            return;
          }
        }
      });
      if (!elvesAround) return;
      allInPlace = false;

      // check if we can propose to move
      let canPropose;
      loopdirections: for (let dir = startDir; dir < startDir + 4; dir++) {
        canPropose = true;
        for (const otherElf of elves) {
          if (otherElf === elf) continue;
          else if (includesElf(elf.getNeighbors(dir % 4), otherElf)) {
            canPropose = false;
            continue loopdirections;
          }
        }
        if (canPropose) {
          elf.proposedx = elf.getNeighbors(dir % 4)[1][0];
          elf.proposedy = elf.getNeighbors(dir % 4)[1][1];
          return;
        }
      }
    });

    // ACTUALLY MOVE
    proposingElves = elves.filter((elf) => elf.proposed());
    // find duplicate proposals
    const counts = new Map();
    proposingElves.forEach((elf) => {
      const key = `${elf.proposedx},${elf.proposedy}`;
      if (!counts.has(key)) {
        counts.set(key, []);
      }
      counts.get(key).push(elf);
    });
    counts.forEach((elves) => {
      if (elves.length > 1) {
        elves.forEach((elf) => elf.rejectProposal());
      } else {
        elves[0].acceptProposal();
      }
    });
    startDir += 1;
  }
  console.log(startDir);
}

// part1();
part2();
