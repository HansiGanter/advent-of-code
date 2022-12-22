const fs = require('fs')
const fileContent = fs.readFileSync('inputs/04-hansi').toString()

let count = 0
for (const pair of fileContent.split('\n')) {
    const s1 = pair.split(',')[0].split('-')
    const s2 = pair.split(',')[1].split('-')
    // part1(s1, s2)
    part2(s1, s2)
}

function part1(s1, s2) {
    if ((+s1[0] <= +s2[0] && +s2[1] <= +s1[1]) || (+s2[0] <= +s1[0] && +s1[1] <= +s2[1])) {
        count++
    }
}

function part2(s1, s2) {
    if ((+s1[0] <= +s2[0] && +s1[1] >= +s2[0]) || (+s1[0] <= +s2[1] && +s1[1] >= +s2[1])) {
        count++
    } else if ((+s2[0] <= +s1[0] && +s2[1] >= +s1[0]) || (+s2[0] <= +s1[1] && +s2[1] >= +s1[1])) {
        count++
    }
}

console.log(count)