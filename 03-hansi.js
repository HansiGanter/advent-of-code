const fs = require("fs");
const { networkInterfaces } = require("os");
const fileContent = fs.readFileSync("inputs/03-hansi").toString()

const rucksacks = fileContent.split('\n')

function part1() {
    const compartments = rucksacks.map(c =>
        [c.substring(0, c.length / 2), c.substring(c.length / 2, c.length)]
    );

    let sum = 0;
    for ([c1, c2] of compartments) {
        for (char1 of c1) {
            if (c2.includes(char1)) {
                sum += getItemPriority(char1)
                break;
            }
        }
    }
    console.log(sum)
}

function part2() {
    const groups = []
    for (let i = 0; i < rucksacks.length; i += 3) {
        const chunk = rucksacks.slice(i, i + 3);
        groups.push(chunk)
    }

    let sum = 0
    for (g of groups) {
        for (char of g[0]) {
            if (g[1].includes(char)) {
                if (g[2].includes(char)) {
                    sum += getItemPriority(char)
                    break;
                }
            }
        }
    }

    console.log(sum)
}

function getItemPriority(char) {
    if (char.charCodeAt(0) >= 'a'.charCodeAt(0)) {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
}
part2()