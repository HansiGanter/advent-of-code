const pairs_of_ranges = (await Deno.readTextFile("inputs/04-felix"))
  .split("\n")
  .map(line => line
    .split(",")
    .map(range => range.split("-").map(Number))
  )

console.log(
  "Part 1:",
  pairs_of_ranges
    .filter(([[a, b],[c, d]]) => (a <= c && d <= b) || (c <= a && b <= d))
    .length
)

console.log(
  "Part 2:",
  pairs_of_ranges
    .filter(([[a, b],[c, d]]) => a <= d && c <= b)
    .length
)
