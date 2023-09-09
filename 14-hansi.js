const { mkdirSync } = require('fs');

fs = require('fs');
const input = fs.readFileSync('./inputs/14-hansi').toString().split('\n');

function getDimensions() {
  const dimensions = {
    minx: Infinity,
    maxx: 0,
    maxy: 0,
  };
  input.forEach(l => {
    l.split('->').forEach(coordinates => {
      dimensions.minx = (Number)(coordinates.split(',')[0].trim()) < dimensions.minx ? (Number)(coordinates.split(',')[0].trim()) : dimensions.minx;
      dimensions.maxx = (Number)(coordinates.split(',')[0].trim()) > dimensions.maxx ? (Number)(coordinates.split(',')[0].trim()) : dimensions.maxx;
      dimensions.maxy = (Number)(coordinates.split(',')[1].trim()) > dimensions.maxy ? (Number)(coordinates.split(',')[1].trim()) : dimensions.maxy;
    });
  });
  dimensions.minx--; dimensions.maxx++; dimensions.maxy++;

  return dimensions;
};

function getInput(part2) {
  const dimensions = getDimensions(part2);
  // fill cave with air
  const cave = [];
  for (let y = 0; y <= dimensions.maxy; y++) {
    for (let x = dimensions.minx; x <= dimensions.maxx; x++) {
      if (!cave[y]) {
        cave[y] = [];
      }
      cave[y][x] = '.';
    }
  }

  // add rocks 
  input.forEach(l => {
    const line = l.split('->');
    for (let i = 0; i < line.length - 1; i++) {
      const x1 = (Number)(line[i].split(',')[0].trim());
      const y1 = (Number)(line[i].split(',')[1].trim());
      const x2 = (Number)(line[i + 1].split(',')[0].trim());
      const y2 = (Number)(line[i + 1].split(',')[1].trim());

      if (x1 == x2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        for (let y = start; y <= end; y++) {
          cave[y][x1] = '#';
        }
      } else if (y1 == y2) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        for (let x = start; x <= end; x++) {
          cave[y1][x] = '#';
        }
      }
    }
  });

  if (part2) {
    cave[cave.length] = [];
    for (let x = dimensions.minx; x < cave[0].length; x++) {
      cave[cave.length - 1][x] = '#';
    }
  }
  return cave;
}

function dropSand(y, x, cave) {
  if (y >= cave.length - 1) {
    return true;
  }
  if (cave[y + 1][x] !== '.') // down
  {
    if (cave[y + 1][x - 1] !== '.') // down left
    {
      if (cave[y + 1][x + 1] !== '.') // down right
      {
        cave[y][x] = 'o';
        return false;
      }
      else {
        return dropSand(y + 1, x + 1, cave);
      }
    }
    else {
      return dropSand(y + 1, x - 1, cave);
    }
  }
  else {
    return dropSand(y + 1, x, cave);
  }
}

function part1() {
  const cave = getInput(false);
  let sand_count = -1;
  let finish = false;
  while (!finish) {
    finish = dropSand(0, 500, cave);
    sand_count++;
  }
  console.log(sand_count);
}

function dropSand2(y, x, cave) {
  // check if left dimension exists
  if (cave[y][x - 1] == undefined) {
    for (let i = 0; i < cave.length - 1; i++) {
      cave[i][x - 1] = '.';
    }
    cave[cave.length - 1][x - 1] = '#';
  }
  // check if right dimension exists
  if (cave[y][x + 1] == undefined) {
    for (let i = 0; i < cave.length - 1; i++) {
      cave[i][x + 1] = '.';
    }
    cave[cave.length - 1][x + 1] = '#';
  }

  if (cave[y + 1][x] !== '.') // down
  {
    if (cave[y + 1][x - 1] !== '.') // down left
    {
      if (cave[y + 1][x + 1] !== '.') // down right
      {
        if (y === 0 && x === 500) {
          cave[y][x] = 'o';
          return true;
        }
        cave[y][x] = 'o';
        return false;
      }
      else {
        return dropSand2(y + 1, x + 1, cave);
      }
    }
    else {
      return dropSand2(y + 1, x - 1, cave);
    }
  }
  else {
    return dropSand2(y + 1, x, cave);
  }
}

function part2() {
  const cave = getInput(true);
  let sand_count = 0;
  let finish = false;
  while (!finish) {
    finish = dropSand2(0, 500, cave);
    sand_count++;
    // printCave(cave);
  }
  console.log(sand_count);
  printCave(cave);
}

// part1();
part2();

function printCave(cave) {
  let minx = 0;
  for (let x = 0; x < cave[cave.length - 1].length; x++) {
    if (cave[cave.length - 1][x] === undefined) minx++;
  }
  for (let y = 0; y < cave.length; y++) {
    for (let x = minx; x < cave[cave.length - 1].length; x++) {
      process.stdout.write(cave[y][x]);
    }
    console.log();
  }
}