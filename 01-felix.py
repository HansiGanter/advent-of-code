from pathlib import Path

numbers = [
    sum(map(int, x.split("\n")))
    for x in Path("inputs/01-felix").read_text().split("\n\n")
]

print("Part 1:", max(numbers))
print("Part 2:", sum(sorted(numbers, reverse=True)[:3]))
