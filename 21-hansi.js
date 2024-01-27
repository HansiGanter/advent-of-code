const fs = require("fs");
const monkeys = fs
  .readFileSync("./inputs/21-hansi")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(":").map((a) => a.trim()));

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

console.log(numbers["root"]);
