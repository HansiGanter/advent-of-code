const fs = require('fs');
const fileContent = fs.readFileSync('inputs/08-hansi').toString();
const lines = fileContent.split('\n')

let grid = [];
let i = 0;
lines.forEach(l => {
    grid.push([])
    for (let j = 0; j < l.length; j++) {
        grid[i][j] = l.split('')[j]
    }
    i++
});

let visibleTrees = 0;
let leftHighest = 0;
let rightHighest = 0;
let topHighest = 0;
let bottomHighest = 0;

for (let i = 1; i < grid[0].length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
        let visible = true;
        // check left
        for (let x = 0; x < j; x++) {
            if (grid[i][x] >= grid[i][j]) {
                visible = false;
                break;
            }
        }
        // check right
        if (visible) { visibleTrees++; continue; }
        visible = true
        for (let x = grid[0].length - 1; x > j; x--) {
            if (grid[i][x] >= grid[i][j]) {
                visible = false;
                break;
            }
        }

        // check top
        if (visible) { visibleTrees++; continue; }
        visible = true
        for (let x = 0; x < i; x++) {
            if (grid[x][j] >= grid[i][j]) {
                visible = false;
                break;
            }
        }

        // check bottom
        if (visible) { visibleTrees++; continue; }
        visible = true
        for (let x = grid[0].length - 1; x > i; x--) {
            if (grid[x][j] >= grid[i][j]) {
                visible = false;
                break;
            }
        }
    }
}

visibleTrees += (4 * (grid[0].length - 1))
console.log(visibleTrees)