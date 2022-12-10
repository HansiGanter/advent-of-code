const fs = require('fs')
const fileContent = fs.readFileSync('inputs/01-hansi').toString()

let sumCals = []
for (const bag of fileContent.split('\n\n')) {
    const cals = bag.split('\n').reduce((sum, a) => Number(sum) + Number(a))
    sumCals.push(Number(cals))
}
// Task 1
console.log(Math.max(...sumCals))
// Task 2
sumCals.sort((a, b) => b - a)
console.log(sumCals[0] + sumCals[1] + sumCals[2])
