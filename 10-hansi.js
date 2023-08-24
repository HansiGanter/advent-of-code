const fs = require('fs');
const fileContent = fs.readFileSync('inputs/10-hansi').toString();
const lines = fileContent.split('\n')

function part1() {
  let cycles = 0;
  let X = 1;

  let c20;
  let c60;
  let c100;
  let c140;
  let c180;
  let c220;

  lines.forEach(line => {
    switch (line.split(' ')[0]) {
      case 'addx':
        cycles++;
        checkSignalStrength();
        cycles++;
        checkSignalStrength();
        X += Number(line.split(' ')[1]);
        break;
      case 'noop':
        cycles++;
        checkSignalStrength();
        break;

      default:
        break;
    }
  });

  function checkSignalStrength() {
    if (cycles === 20) {
      c20 = X;
    }
    if (cycles === 60) {
      c60 = X;
    }
    if (cycles === 100) {
      c100 = X;
    }
    if (cycles === 140) {
      c140 = X;
    }
    if (cycles === 180) {
      c180 = X;
    }
    if (cycles === 220) {
      c220 = X;
    }
  }

  console.log(c20 * 20 + c60 * 60 + c100 * 100 + c140 * 140 + c180 * 180 + c220 * 220)
}

function part2() {
  let cycles = 0;
  let X = 1;
  let CRT = '';

  lines.forEach(line => {
    switch (line.split(' ')[0]) {
      case 'addx':
        cycles++;
        drawCRT(cycles, X + 1);
        cycles++;
        drawCRT(cycles, X + 1);
        X += Number(line.split(' ')[1]);
        break;
      case 'noop':
        cycles++;
        drawCRT(cycles, X + 1);
        break;

      default:
        break;
    }
  });

  console.log(CRT)

  function drawCRT(c, sprite) {
    (c === sprite - 1 || c === sprite || c === sprite + 1) ? CRT += '#' : CRT += '.';
    if (c % 40 === 0) {
      CRT += "\n"
      X += 40
    }
  }
}

part1()
part2()