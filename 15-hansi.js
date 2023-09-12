const fs = require('fs');
const file = fs.readFileSync('./inputs/15-hansi').toString().split('\n');
const ROW = file.length === 14 ? 10 : 2000000;
const DISTRESS_RANGE = { start: 0, end: file.length === 14 ? 20 : 4000000 };

function getInput() {
  const data = file.map(line => {
    const sx = +(line.split(' ')[2].slice(0, -1).split('=')[1]);
    const sy = +(line.split(' ')[3].slice(0, -1).split('=')[1]);
    const bx = +(line.split(' ')[8].slice(0, -1).split('=')[1]);
    const by = +(line.split(' ')[9].split('=')[1]);
    return {
      sensor: { x: sx, y: sy, }, beacon: { x: bx, y: by, }, distanceToBeacon: getDistance({ x: sx, y: sy }, { x: bx, y: by })
    };
  });
  return data;
}

function getDistance(sensor, beacon) {
  return Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
}

function part1() {
  const input = getInput();
  const beaconOnRow = new Set();
  const impossibleBeacon = new Set();
  input.forEach(line => {
    const distToRow = Math.abs(line.sensor.y - ROW);
    if (line.distanceToBeacon >= distToRow) {
      if (line.beacon.y === ROW) {
        beaconOnRow.add(line.beacon.x);
      }
      for (let x = line.sensor.x - (line.distanceToBeacon - distToRow); x <= line.sensor.x + (line.distanceToBeacon - distToRow); x++) {
        impossibleBeacon.add(x);
      }
    }
  });
  console.log(impossibleBeacon.size - beaconOnRow.size);
}

function part2() {
  let input = getInput();

  for (let y = DISTRESS_RANGE.start; y < DISTRESS_RANGE.end; y++) {
    let ranges = [];
    input.forEach(line => {
      const distToRow = getDistance(line.sensor, { x: line.sensor.x, y: y });
      if (line.distanceToBeacon >= distToRow) {
        let from = line.sensor.x - (line.distanceToBeacon - distToRow);
        let to = line.sensor.x + (line.distanceToBeacon - distToRow);

        if (from > DISTRESS_RANGE.end || to <= DISTRESS_RANGE.start) {
          return;
        }

        from = Math.max(DISTRESS_RANGE.start, from);
        to = Math.min(DISTRESS_RANGE.end, to);
        ranges.push({ from: from, to: to });
      }
    }
    );
    ranges = ranges.sort((a, b) => a.from - b.from);
    let range = { from: ranges[0].from, to: ranges[0].to };
    for (let i = 0; i < ranges.length; i++) {
      if (range.to + 1 < ranges[i].from || range.from !== 0) {
        console.log("Tuning frequency: ", (range.to + 1) * DISTRESS_RANGE.end + y);
        return;
      }
      range.to = Math.max(range.to, ranges[i].to);
      range.from = Math.min(range.from, ranges[i].from);

      if (range.to >= DISTRESS_RANGE.end) {
        break;
      }
    }
  }
}

// part1();
part2();