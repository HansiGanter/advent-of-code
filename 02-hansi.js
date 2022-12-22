const fs = require('fs')
const fileContent = fs.readFileSync('inputs/02-hansi').toString()

// A X = Rock      Rock    = 3 + 1 = 4
// A Y = Rock      Paper   = 6 + 2 = 8
// A Z = Rock      Scissor = 0 + 3 = 3
// B X = Paper     Rock    = 0 + 1 = 1
// B Y = Paper     Paper   = 3 + 2 = 5
// B Z = Paper     Scissor = 6 + 3 = 9
// C X = Scissor   Rock    = 6 + 1 = 7
// C Y = Scissor   Paper   = 0 + 2 = 2
// C Z = Scissor   Scissor = 3 + 3 = 6
function calcPoints(round) {
    switch (round.trim()) {
        case 'A X':
            return 4
        case 'A Y':
            return 8
        case 'A Z':
            return 3
        case 'B X':
            return 1
        case 'B Y':
            return 5
        case 'B Z':
            return 9
        case 'C X':
            return 7
        case 'C Y':
            return 2
        case 'C Z':
            return 6
        default:
            return 0;
    }
}

// Task 1
let points = 0
for (const round of fileContent.split('\n')) {
    points += Number(calcPoints(round.trim()))
}
console.log('Task1: ' + points)

// Task 2
points = 0
for (const round of fileContent.split('\n')) {
    switch (round.split(' ')[1]) {
        case 'X':
            switch (round.split(' ')[0]) {
                case 'A':
                    points += calcPoints('A Z')
                    break;
                case 'B':
                    points += calcPoints('B X')
                    break;
                case 'C':
                    points += calcPoints('C Y')
                    break;
                default:
                    break;
            }
            break;
        case 'Y':
            switch (round.split(' ')[0]) {
                case 'A':
                    points += calcPoints('A X')
                    break;
                case 'B':
                    points += calcPoints('B Y')
                    break;
                case 'C':
                    points += calcPoints('C Z')
                    break;
                default:
                    break;
            }
            break;
        case 'Z':
            switch (round.split(' ')[0]) {
                case 'A':
                    points += calcPoints('A Y')
                    break;
                case 'B':
                    points += calcPoints('B Z')
                    break;
                case 'C':
                    points += calcPoints('C X')
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}
console.log('Task2: ' + points)