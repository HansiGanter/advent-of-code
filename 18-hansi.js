const part = 2;
fs = require("fs");
const input = fs
  .readFileSync("./inputs/18-hansi")
  .toString()
  .split("\n")
  .map((line) => {
    const point = line.split(",");
    return {
      x: +point[0],
      y: +point[1],
      z: +point[2],
    };
  });

let surfaceArea = 0;
const limits = input.reduce(
  (acc, point) => {
    if (point.x < acc.minX) {
      acc.minX = point.x;
    }
    if (point.x > acc.maxX) {
      acc.maxX = point.x;
    }
    if (point.y < acc.minY) {
      acc.minY = point.y;
    }
    if (point.y > acc.maxY) {
      acc.maxY = point.y;
    }
    if (point.z < acc.minZ) {
      acc.minZ = point.z;
    }
    if (point.z > acc.maxZ) {
      acc.maxZ = point.z;
    }
    return acc;
  },
  {
    minX: 1,
    maxX: 1,
    minY: 1,
    maxY: 1,
    minZ: 1,
    maxZ: 1,
  }
);

function checkLimit(point) {
  return (
    point.x <= limits.minX ||
    point.x >= limits.maxX ||
    point.y <= limits.minY ||
    point.y >= limits.maxY ||
    point.z <= limits.minZ ||
    point.z >= limits.maxZ
  );
}

function getNeighbors(point) {
  return [
    { x: point.x + 1, y: point.y, z: point.z },
    { x: point.x - 1, y: point.y, z: point.z },
    { x: point.x, y: point.y + 1, z: point.z },
    { x: point.x, y: point.y - 1, z: point.z },
    { x: point.x, y: point.y, z: point.z + 1 },
    { x: point.x, y: point.y, z: point.z - 1 },
  ];
}
function findWayOut(point, tovisit, visited) {
  while (tovisit.size > 0) {
    if (checkLimit(point)) {
      return true;
    } else {
      if (tovisit.values().next().value !== undefined) {
        tovisit.delete(tovisit.values().next().value);
      }
      visited.add(JSON.stringify(point));
      getNeighbors(point)
        .filter((neighbor) => {
          return !input.some(
            (cube) =>
              cube.x === neighbor.x &&
              cube.y === neighbor.y &&
              cube.z === neighbor.z
          );
        })
        .filter((neighbor) => {
          return !visited.has(JSON.stringify(neighbor));
        })
        .forEach((neighbor) => {
          tovisit.add(JSON.stringify(neighbor));
        });
      if (tovisit.values().next().value !== undefined) {
        point = JSON.parse(tovisit.values().next().value);
      }
    }
  }
  return false;
}
input.forEach((point) => {
  getNeighbors(point)
    .filter((neighbor) => {
      return !input.some(
        (cube) =>
          cube.x === neighbor.x &&
          cube.y === neighbor.y &&
          cube.z === neighbor.z
      );
    })
    .forEach((neighbor) => {
      let tovisit = new Set();
      tovisit.add(JSON.stringify(neighbor));
      if (part === 1) {
        surfaceArea++;
      } else if (part === 2) {
        if (
          findWayOut(
            JSON.parse(tovisit.values().next().value),
            tovisit,
            new Set()
          )
        ) {
          surfaceArea++;
        }
      }
    });
});

console.log("part", part, ":", surfaceArea);

// ideas to optimize:
// set limits to specific range on each coordinate line, not just the edges of each axis
// store visited that found way out globaly to not check them again
