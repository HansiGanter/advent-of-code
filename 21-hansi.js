const { ifError } = require("assert");
const fs = require("fs");
let monkeys = fs
  .readFileSync("./inputs/21-hansi")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(":").map((a) => a.trim()));

function part1() {
  let numbers = {};
  monkeys
    .filter((monkey) => !isNaN(monkey[1]))
    .forEach((line) => {
      numbers[line[0]] = line[1];
    });
  let operations = monkeys.filter((monkey) => isNaN(monkey[1]));

  while (operations.length > 0) {
    operations.forEach((operation) => {
      const firstNum = operation[1].split(" ")[0];
      const operator = operation[1].split(" ")[1];
      const secondNum = operation[1].split(" ")[2];

      if (numbers[firstNum] && numbers[secondNum]) {
        numbers[operation[0]] = eval(
          `${numbers[firstNum]} ${operator} ${numbers[secondNum]}`
        );
        operations = operations.filter((op) => op[0] !== operation[0]);
      }
    });
  }
  return numbers;
}

console.log("part1:");
console.log(part1()["root"]);

// part2

let rootnum1;
let rootnum2;
monkeys = monkeys.map((monkey) => {
  if (monkey[0] === "root") {
    rootnum1 = monkey[1].split(" ")[0];
    rootnum2 = monkey[1].split(" ")[2];
    return [monkey[0], monkey[1].replace("+", "=")];
  } else {
    return monkey;
  }
});

monkeys = monkeys.map((monkey) =>
  monkey[0] === "humn" ? [monkey[0], "XXX + XXX"] : monkey
);

let numbers = {};
monkeys
  .filter((monkey) => !isNaN(monkey[1]))
  .forEach((line) => {
    numbers[line[0]] = line[1];
  });
let operations = monkeys.filter((monkey) => isNaN(monkey[1]));

while (!(numbers[rootnum1] || numbers[rootnum2])) {
  operations.forEach((operation) => {
    const [firstNum, operator, secondNum] = operation[1].split(" ");

    if (numbers[firstNum] && numbers[secondNum]) {
      numbers[operation[0]] = +eval(
        `${numbers[firstNum]} ${operator} ${numbers[secondNum]}`
      );
      operations = operations.filter((op) => op[0] !== operation[0]);
    }
  });
}

if (numbers[rootnum2]) {
  numbers[rootnum1] = numbers[rootnum2];
  numbers["root"] = numbers[rootnum2];
} else if (numbers[rootnum1]) {
  numbers[rootnum2] = numbers[rootnum1];
  numbers["root"] = numbers[rootnum1];
}
operations = operations.filter((op) => op[0] !== "root");

while (operations.length > 1) {
  for (const operation of operations) {
    if (numbers[operation[0]]) {
      const [opnum1, , opnum2] = operation[1].split(" ");
      if (numbers[opnum1]) {
        switch (operation[1].split(" ")[1]) {
          case "+":
            numbers[opnum2] = +numbers[operation[0]] - +numbers[opnum1];
            break;
          case "-":
            numbers[opnum2] = +numbers[opnum1] - +numbers[operation[0]];
            break;
          case "*":
            numbers[opnum2] = +numbers[operation[0]] / +numbers[opnum1];
            break;
          case "/":
            numbers[opnum2] = +numbers[opnum1] / +numbers[operation[0]];
            break;
          default:
            break;
        }
      } else if (numbers[opnum2]) {
        switch (operation[1].split(" ")[1]) {
          case "+":
            numbers[opnum1] = +numbers[operation[0]] - +numbers[opnum2];
            break;
          case "-":
            numbers[opnum1] = +numbers[operation[0]] + +numbers[opnum2];
            break;
          case "*":
            numbers[opnum1] = +numbers[operation[0]] / +numbers[opnum2];
            break;
          case "/":
            numbers[opnum1] = +numbers[operation[0]] * +numbers[opnum2];
            break;
          default:
            break;
        }
      }
      operations = operations.filter((op) => op[0] !== operation[0]);
    }
  }
}

console.log("part2:");
console.log(numbers["humn"]);
