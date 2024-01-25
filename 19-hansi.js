const fs = require("fs");
const indexMap = { ore: 0, clay: 1, obsidian: 2, geode: 3 };
const blueprints = fs
  .readFileSync("./inputs/19-hansi", "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let [, plans] = line.split(": ");
    plans = plans.split(". ").map((line) => {
      const [, cost] = line.match(/^Each [^\s]+ robot costs ([^.]*)\.?$/);
      const requirements = [0, 0, 0, 0];
      cost.split(" and ").forEach((s) => {
        const [resourceCount, resourceType] = s.split(" ");
        requirements[indexMap[resourceType]] = +resourceCount;
      });
      return requirements;
    });
    return plans;
  });

function best(blueprint, timeAvailable) {
  const queue = [
    {
      resources: [0, 0, 0, 0],
      robots: [1, 0, 0, 0],
      time: timeAvailable,
    },
  ];
  let max = 0;
  const maxNeeded = [
    //completely bogus heuristic
    Math.max(...blueprint.map((cost) => cost[0])) * 1.5,
    Math.max(...blueprint.map((cost) => cost[1])) * 1.5,
    Math.max(...blueprint.map((cost) => cost[2])) * 1.5,
    Infinity,
  ];
  while (queue.length > 0) {
    const next = queue.pop();
    let { resources, robots, time } = next;
    max = Math.max(max, resources[3] + robots[3] * time);

    blueprint.forEach((requirements, robotType) => {
      let buildTime = 1;
      requirements.forEach((cost, r) => {
        const timeForResource = Math.ceil((cost - resources[r]) / robots[r]);
        if (cost > 0) buildTime = Math.max(buildTime, timeForResource + 1);
      });
      if (buildTime < time && resources[robotType] <= maxNeeded[robotType]) {
        const nextResources = [...resources];
        const nextRobots = [...robots];
        requirements.forEach((cost, r) => {
          nextResources[r] += robots[r] * buildTime - cost;
        });
        nextRobots[robotType]++;
        queue.push({
          resources: nextResources,
          robots: nextRobots,
          time: time - buildTime,
        });
      }
    });
  }
  return max;
}

const part1 = blueprints.reduce((acc, blueprint, index) => {
  return acc + best(blueprint, 24) * (index + 1);
}, 0);

const part2 = blueprints.slice(0, 3).reduce((acc, blueprint) => {
  return acc * best(blueprint, 32);
}, 1);
console.log(part1, part2);
