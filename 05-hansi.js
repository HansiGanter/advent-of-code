const fs = require('fs')
const fileContent = fs.readFileSync('inputs/05-hansi').toString()

const ship = fileContent.split('\n\n')[0].split('\n')
ship.pop()
ship.reverse()
const commands = fileContent.split('\n\n')[1].split('\n')

let stacks = [[], [], [], [], [], [], [], [], []]
//let stacks = [[], [], []] //example
for (let i = 0; i < ship.length; i++) {
    for (let j = 1; j < ship[i].length; j += 4) {
        if (ship[i].substring(j, j + 1) !== ' ')
            stacks[Math.floor(j / 4)].push(ship[i].substring(j, j + 1))
    }
}

for (const command of commands) {
    const amount = command.split(' ')[1]
    const from = command.split(' ')[3]
    const to = command.split(' ')[5]
    // moveCratesPart1(+amount, from - 1, to - 1)
    moveCratesPart2(+amount, from - 1, to - 1)
}

function moveCratesPart1(amount, from, to) {
    for (let i = 0; i < amount; i++) {
        stacks[to].push(stacks[from][stacks[from].length - 1])
        stacks[from].pop()
    }
}

function moveCratesPart2(amount, from, to) {
    for (let i = stacks[from].length - amount; i < stacks[from].length; i++) {
        stacks[to].push(stacks[from][i])
    }
    for (let i = 0; i < amount; i++) {
        stacks[from].pop()
    }
}

for (const stack of stacks) {
    console.log(stack[stack.length - 1])
}