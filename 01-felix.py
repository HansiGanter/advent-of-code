from pathlib import Path

calories = [
    sum(map(int, x.split("\n")))
    for x in Path("inputs/01-felix").read_text().split("\n\n")
]

print("Part 1:", max(calories))
print("Part 2:", sum(sorted(calories, reverse=True)[:3]))
