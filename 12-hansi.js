const fs = require('fs');
const lines = fs.readFileSync("./inputs/12-hansi", { encoding: "utf-8" }) // read day??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

function getInput() {
  const res = {
    start: {},
    end: {},
    map: [],
  };
  res.map = lines.map((line, y) => [...line].map((value, x) => {
    if (value === 'S') {
      res.start = { y, x, };
      return 0;
    }
    else if (value === 'E') {
      res.end = { y, x, };
      return 25;
    }
    return value.charCodeAt(0) - 'a'.charCodeAt(0);
  }));
  return res;
}

function pointToInt(x, y) {
  return y * 1e3 + x;
}

function intToPoint(i) {
  return {
    y: Math.floor(i / 1e3),
    x: i % 1e3,
  };
}

// Part 1
function getNeighbors(x, y, map) {
  const res = [];
  if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
    res.push(pointToInt(x, y + 1));
  }
  if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
    res.push(pointToInt(x, y - 1));
  }
  if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
    res.push(pointToInt(x + 1, y));
  }
  if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
    res.push(pointToInt(x - 1, y));
  }
  return res;
}

function dijkstra(map, start, end) {
  const dist = {};
  const prev = {};
  let queue = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInt(x, y);
      dist[id] = Infinity;

      queue.push(id);
    }
  }
  dist[pointToInt(start.x, start.y)] = 0;

  while (queue.length) {
    let u = null;
    for (const current of queue) {
      if (u === null || dist[current] < dist[u]) {
        u = current;
      }
    }
    if (u === pointToInt(end.x, end.y))
      break;

    queue = queue.filter(q => q !== u);

    const point = intToPoint(u);
    const neighbors = getNeighbors(point.x, point.y, map);

    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  }
  return { dist, prev };
}

function part1() {
  const input = getInput();
  const path = dijkstra(input.map, input.start, input.end);
  const distance = path.dist[pointToInt(input.end.x, input.end.y)];
  console.log(distance);
}

// Part 2
function getNeighbors2(x, y, map) {
  const res = [];
  if (y + 1 < map.length && map[y + 1][x] >= map[y][x] - 1) {
    res.push(pointToInt(x, y + 1));
  }
  if (y - 1 >= 0 && map[y - 1][x] >= map[y][x] - 1) {
    res.push(pointToInt(x, y - 1));
  }
  if (x + 1 < map[y].length && map[y][x + 1] >= map[y][x] - 1) {
    res.push(pointToInt(x + 1, y));
  }
  if (x - 1 >= 0 && map[y][x - 1] >= map[y][x] - 1) {
    res.push(pointToInt(x - 1, y));
  }
  return res;
}

function dijkstra2(map, start) {
  const dist = {};
  const prev = {};
  let queue = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInt(x, y);
      dist[id] = Infinity;

      queue.push(id);
    }
  }
  dist[pointToInt(start.x, start.y)] = 0;

  while (queue.length) {
    let u = null;
    for (const current of queue) {
      if (u === null || dist[current] < dist[u]) {
        u = current;
      }
    }

    const point = intToPoint(u);
    if (map[point.y][point.x] === 0)
      return dist[u];

    queue = queue.filter(q => q !== u);

    const neighbors = getNeighbors2(point.x, point.y, map);

    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  }
}

function part2() {
  const input = getInput();
  const distance = dijkstra2(input.map, input.end);
  console.log(distance);
}

// part1();
part2();

