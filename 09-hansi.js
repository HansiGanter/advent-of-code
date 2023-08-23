const fs = require('fs');
const fileContent = fs.readFileSync('inputs/09-hansi').toString();
const lines = fileContent.split('\n')

let visited = [[0, 0]]

let H = [0, 0];
let R1 = [0, 0];
let R2 = [0, 0];
let R3 = [0, 0];
let R4 = [0, 0];
let R5 = [0, 0];
let R6 = [0, 0];
let R7 = [0, 0];
let R8 = [0, 0];
let R9 = [0, 0];

let rope = [H, R1, R2, R3, R4, R5, R6, R7, R8, R9]

lines.forEach(l => {
  let direction = l.split(' ')[0]
  let steps = l.split(' ')[1]

  for (let i = 1; i <= steps; i++) {
    switch (direction) {
      case 'R':
        H[1]++;
        for (let j = 0; j < rope.length - 1; j++) {
          checkDistanz(rope[j], rope[j + 1]);
        }
        break;
      case 'L':
        H[1]--;
        for (let j = 0; j < rope.length - 1; j++) {
          checkDistanz(rope[j], rope[j + 1]);
        }
        break;
      case 'U':
        H[0]++;
        for (let j = 0; j < rope.length - 1; j++) {
          checkDistanz(rope[j], rope[j + 1]);
        }
        break;
      case 'D':
        H[0]--;
        for (let j = 0; j < rope.length - 1; j++) {
          checkDistanz(rope[j], rope[j + 1]);
        }
        break;

      default:
        break;
    }
  }
});

function checkDistanz(K1, K2) {
  let moved = false;
  if (K1[1] - K2[1] > 1) {
    K2[1]++;
    (K1[0] > K2[0]) && K2[0]++;
    (K1[0] < K2[0]) && K2[0]--;
    moved = true;
  }
  if (K1[1] - K2[1] < -1) {
    K2[1]--;
    (K1[0] > K2[0]) && K2[0]++;
    (K1[0] < K2[0]) && K2[0]--;
    moved = true;
  }
  if (K1[0] - K2[0] > 1) {
    K2[0]++;
    (K1[1] > K2[1]) && K2[1]++;
    (K1[1] < K2[1]) && K2[1]--;
    moved = true;
  }
  if (K1[0] - K2[0] < -1) {
    K2[0]--;
    (K1[1] > K2[1]) && K2[1]++;
    (K1[1] < K2[1]) && K2[1]--;
    moved = true;
  }
  if (moved && K2 === R9 && !alreadyVisited()) {
    visited.push([R9[0], R9[1]]);
  }
}

function alreadyVisited() {
  let alreadyV = false;
  visited.forEach(v => {
    if (v.every((value, index) => value === R9[index])) {
      alreadyV = true;
    }
  });
  return alreadyV;
}

console.log(visited.length)

// if ((H[1] - T[1] > 1) || (H[1] - T[1] < -1) || (H[0] - T[0] > 1) || (H[0] - T[0] < -1)) { }