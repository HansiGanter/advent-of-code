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


function part1() {
  let visibleTrees = 0;

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
      if (visible) { visibleTrees++; continue; }

      // check right
      visible = true
      for (let x = grid[0].length - 1; x > j; x--) {
        if (grid[i][x] >= grid[i][j]) {
          visible = false;
          break;
        }
      }
      if (visible) { visibleTrees++; continue; }

      // check top
      visible = true
      for (let x = 0; x < i; x++) {
        if (grid[x][j] >= grid[i][j]) {
          visible = false;
          break;
        }
      }
      if (visible) { visibleTrees++; continue; }

      // check bottom
      visible = true
      for (let x = grid[0].length - 1; x > i; x--) {
        if (grid[x][j] >= grid[i][j]) {
          visible = false;
          break;
        }
      }
      if (visible) { visibleTrees++; continue; }
    }
  }

  visibleTrees += (4 * (grid[0].length - 1))
  console.log(visibleTrees)
}


function part2() {
  let highestScenicScore = 0;

  for (let i = 1; i < grid[0].length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {

      let left = 0;
      let right = 0;
      let up = 0;
      let down = 0;

      // check left
      for (let x = j - 1; x >= 0; x--) {
        left++;
        if (grid[i][x] >= grid[i][j]) {
          break;
        }
      }

      // check right
      for (let x = j + 1; x < grid[0].length; x++) {
        right++;
        if (grid[i][x] >= grid[i][j]) {
          break;
        }
      }

      // check up
      for (let x = i - 1; x >= 0; x--) {
        up++;
        if (grid[x][j] >= grid[i][j]) {
          break;
        }
      }

      // check down
      for (let x = i + 1; x < grid[0].length; x++) {
        down++;
        if (grid[x][j] >= grid[i][j]) {
          break;
        }
      }

      highestScenicScore = highestScenicScore > (left * right * up * down) ? highestScenicScore : (left * right * up * down)
    }
  }

  console.log(highestScenicScore)
}

// part1();
part2();