function main()
    local file = io.open("inputs/03-felix")
    local lines = {}
    for line in file:lines() do
        table.insert(lines, line)
    end
    file:close()

    part1(lines)
    part2(lines)
end

-- PART I

function part1(lines)
    local sum_of_priorities = 0
    for _, line in pairs(lines) do
        local length = line:len()
        local compartment_one = string.sub(line, 1, length / 2)
        local compartment_two = string.sub(line, 1 + length / 2)
        local unique_items_one = unique_items(compartment_one)
        local stray_item = (function()
            for item in compartment_two:gmatch"." do
                if unique_items_one[item] then
                    return item
                end
            end
            error("the compartments don't share any item!")
        end)()
        sum_of_priorities = sum_of_priorities + priority(stray_item)
    end
    print("Part 1:", sum_of_priorities)
end

-- PART 2

function part2(lines)
    local sum_of_priorities = 0
    for i = 1, #lines, 3 do
        local rucksack1 = unique_items(lines[i])
        local rucksack2 = unique_items(lines[i + 1])
        local rucksack3 = unique_items(lines[i + 2])
        local same_item = (function()
            for item, _ in pairs(rucksack1) do
                if rucksack2[item] and rucksack3[item] then
                    return item
                end
            end
            error("rucksacks don't share any item!")
        end)()
        sum_of_priorities = sum_of_priorities + priority(same_item)
    end
    print("Part 2:", sum_of_priorities)
end

-- UTILS

function priority(item)
    local ascii_value = item:byte()
    if 97 <= ascii_value and ascii_value <= 122 then
        return ascii_value - 96
    elseif 65 <= ascii_value and ascii_value <= 90 then
        return ascii_value - 38
    else
        error("item is not a character!")
    end
end

function unique_items(items)
    local unique_items = {}
    for item in items:gmatch"." do
        unique_items[item] = true
    end
    return unique_items
end

-- MAIN

main()
