/**
 * RULES: 
 * If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer; continue checking the next part of the input.
 * If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
 * If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].
 */

const fs = require('fs');
const file = fs.readFileSync('./inputs/13-hansi').toString();
const pairs = file.split('\n\n').map(p => p.split('\n')); // part 1
const packets = file.replaceAll('\n\n', '\n').split('\n').map(p => JSON.parse(p)); // part 2

function compare(item1, item2) {
    if (typeof item1 === 'number' && typeof item2 === 'number') {
        if (item1 === item2) { return 0; }
        else { return item1 < item2 ? 1 : -1; }
    }

    item1 = typeof item1 === 'object' ? item1 : [item1];
    item2 = typeof item2 === 'object' ? item2 : [item2];

    const length = Math.min(item1.length, item2.length);
    for (let i = 0; i < length; i++) {
        const res = compare(item1[i], item2[i]);
        if (res !== 0) {
            return res;
        }
    }
    return item1.length === item2.length ? 0 : item1.length < item2.length ? 1 : -1;
}

function part1() {
    const correctPackets = [];
    pairs.forEach((pair, index) => {
        const packet1 = JSON.parse(pair[0]);
        const packet2 = JSON.parse(pair[1]);

        compare(packet1, packet2) === 1 && correctPackets.push(index + 1);
    });

    const total = correctPackets.reduce((a, b) => a + b, 0);
    console.log(total);

}

function part2() {
    packets.push([[2]]);
    packets.push([[6]]);

    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < packets.length - 1; i++) {
            if (compare(packets[i], packets[i + 1]) === -1) {
                let helper = packets[i];
                packets[i] = packets[i + 1];
                packets[i + 1] = helper;
                swapped = true;
            }
        }
    }
    console.log((packets.findIndex(p => JSON.stringify(p) === JSON.stringify([[2]])) + 1) * (packets.findIndex(p => JSON.stringify(p) === JSON.stringify([[6]])) + 1));
}


// part1();
part2();