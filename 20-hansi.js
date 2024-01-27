const fs = require("fs");
const encryptedFile = fs
  .readFileSync("./inputs/20-hansi", "utf-8")
  .split("\n")
  .map((line, index) => {
    const item = {};
    item[index] = +line * 811589153;
    return item;
  });

for (let round = 0; round < 10; round++) {
  for (let i = 0, l = encryptedFile.length; i < l; i++) {
    let index = encryptedFile.indexOf(
      encryptedFile.find((item) => {
        return i in item;
      })
    );
    const item = encryptedFile.splice(
      encryptedFile.indexOf(
        encryptedFile.find((item) => {
          return i in item;
        })
      ),
      1
    )[0];
    index += item[i];
    index %= encryptedFile.length;

    encryptedFile.splice(index, 0, item);
  }
}

const indexOfItemZero = encryptedFile.findIndex((item) =>
  Object.values(item).includes(0)
);

const values = [
  encryptedFile[(indexOfItemZero + 1000) % encryptedFile.length],
  encryptedFile[(indexOfItemZero + 2000) % encryptedFile.length],
  encryptedFile[(indexOfItemZero + 3000) % encryptedFile.length],
];

const result = values.reduce((acc, item) => {
  return acc + Object.values(item)[0];
}, 0);

console.log({ result });
