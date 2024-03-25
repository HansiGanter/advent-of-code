const fs = require("fs");
const input = fs.readFileSync("./inputs/25-hansi").toString();

const SNAFU = {
  2: 2,
  1: 1,
  0: 0,
  "-": -1,
  "=": -2,
};

function snafuToDecimal(snafu) {
  let dec = 0;
  snafu
    .split("")
    .reverse()
    .forEach((digit, i) => {
      dec += Math.pow(5, i) * SNAFU[digit];
    });
  return dec;
}

function decToSnafu(dec) {
  const arr = dec.toString(5).split("");
  arr.unshift("0");
  let answer = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (+arr[i] < 3) answer.unshift(arr[i]);
    else {
      const next = +arr[i] - 5;
      answer.unshift(next === -2 ? "=" : next === -1 ? "-" : `${next}`);
      arr[i - 1] = `${+arr[i - 1] + 1}`;
    }
  }
  return answer.join("").replace(/^0+/, "");
}

function part1() {
  const decimals = input.split("\n").map((line) => snafuToDecimal(line));
  return decToSnafu(decimals.reduce((acc, cur) => (acc += cur)));
}

console.log(part1());
