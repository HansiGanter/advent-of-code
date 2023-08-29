const fs = require('fs');
const fileContent = fs.readFileSync('inputs/11-hansi').toString();

class Monkey {
  items;
  inspect;
  test;
  testDivider;
  monkeyIndexTrue;
  monkeyIndexFalse;
  inspectedItems = 0;
  constructor(items, inspect, test, testDivider, monkeyIndexTrue, monkeyIndexFalse) {
    this.items = items;
    this.inspect = inspect;
    this.test = test;
    this.testDivider = testDivider;
    this.monkeyIndexTrue = monkeyIndexTrue;
    this.monkeyIndexFalse = monkeyIndexFalse;
  }
  // bore(item) { return Math.floor(item / 3); } // part 1
  bore(item) { return Math.floor(item % modulo); } // part 2
}

const monkeys = [];
let modulo = 1;

function parse() {
  ms = fileContent.split("Monkey ");
  ms.shift();
  ms.forEach(m => {
    let items;
    let inspection;
    let test;
    let testDivider;
    let monkeyIndexTrue;
    let monkeyIndexFalse;

    cmd = m.split('\n');
    cmd.shift();
    cmd.forEach((line, i) => {
      w = line.trim().split(' ');
      switch (w[0]) {
        case 'Starting':
          w.shift(); w.shift();
          w = w.map(m => Number(m.replace(/,$/, '')))
          items = w;
          break;
        case 'Operation:':
          operationExpression = `${w[3]} ${w[4]} ${w[5]}`;
          inspection = eval(`(old) => ${operationExpression}`)
          break;
        case 'Test:':
          testDivider = w[3];
          modulo *= testDivider;
          monkeyIndexTrue = cmd[i + 1].trim().split(' ')[5];
          monkeyIndexFalse = cmd[i + 2].trim().split(' ')[5];
          test = (i) => { i % testDivider === 0 ? monkeys[monkeyIndexTrue].items.push(i) : monkeys[monkeyIndexFalse].items.push(i); };
          break;
        default:
          break;
      }
    })
    monkeys.push(new Monkey(items, inspection, test, monkeyIndexTrue, monkeyIndexFalse));
  });
}
parse();

for (let i = 0; i < 10000; i++) {
  monkeys.forEach(m => {
    m.items.forEach(item => {
      item = m.inspect(item);
      m.inspectedItems++;
      item = m.bore(item);
      m.test(item);
    })
    m.items = [];
  })
}

let mostActive = 0;
let secondMostActive = 0;
monkeys.forEach(m => console.log(m.inspectedItems))
monkeys.forEach((m) => { if (m.inspectedItems > mostActive) { secondMostActive = mostActive; mostActive = m.inspectedItems; } else if (m.inspectedItems > secondMostActive) { secondMostActive = m.inspectedItems; } });

console.log(mostActive);
console.log(secondMostActive);
console.log("monkey business after 10000: " + mostActive * secondMostActive)
console.log("ENDE");