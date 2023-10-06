const { ifError } = require('assert');
const fs = require('fs');
const file = fs.readFileSync('./inputs/16-hansi').toString().split('\n');

const pattern = /Valve (\w+) has flow rate=(\d+); tunnels? lead[s]? to valves? ([\w, ]+)/;

const valves = {};
const tunnels = {};
file.forEach(line => {
    const [, valve, flow, targets] = line.match(pattern);
    valves[valve] = +flow;
    tunnels[valve] = targets.split(', ');
});

const dists = {};
const nonempty = [];

for (const valve in valves) {
    if (valve !== "AA" && !valves[valve]) {
        continue;
    }
    if (valve !== "AA") {
        nonempty.push(valve);
    }

    dists[valve] = { [valve]: 0, AA: 0 };
    let visited = new Set([valve]);
    const queue = [[0, valve]];

    while (queue.length > 0) {
        let [distance, position] = queue.shift();
        for (const neighbor of tunnels[position]) {
            if (visited.has(neighbor)) {
                continue;
            }
            visited.add(neighbor);
            if (valves[neighbor]) {
                dists[valve][neighbor] = distance + 1;
            }
            queue.push([distance + 1, neighbor]);
        }
    }

    delete dists[valve][valve];
    if (valve !== "AA") {
        delete dists[valve].AA;
    }
}

const indices = {};

nonempty.forEach((element, index) => indices[element] = index);
// for (let index = 0; index < nonempty.length; index++) {
//     const element = nonempty[index];
//     indices[element] = index;
// }

const cache = {};

function dfs(time, valve, bitmask) {
    if (cache[`${time}_${valve}_${bitmask}`] !== undefined) {
        return cache[`${time}_${valve}_${bitmask}`];
    }

    let maxval = 0;

    for (const neighbor in dists[valve]) {
        let bit = 1 << indices[neighbor];
        if (bitmask & bit) {
            continue;
        }
        const remtime = time - dists[valve][neighbor] - 1;
        if (remtime <= 0) {
            continue;
        }
        maxval = Math.max(maxval, dfs(remtime, neighbor, bitmask | bit) + valves[neighbor] * remtime);
    }
    cache[`${time}_${valve}_${bitmask}`] = maxval;
    return maxval;
}

function part1() {
    console.log(dfs(30, "AA", 0));
}

function part2() {
    b = (1 << nonempty.length) - 1;
    m = 0;
    for (let i = 0; i < (b + 1) / 2; i++) {
        m = Math.max(m, dfs(26, "AA", i) + dfs(26, "AA", b ^ i));
    }
    console.log(m);
}

// part1();
part2();