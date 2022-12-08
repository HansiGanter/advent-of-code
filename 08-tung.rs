fn main() {
    let content = std::fs::read_to_string("inputs/08-tung").unwrap();
    let content = content
        .split("\n")
        .map(|x| {
            x.chars()
                .map(|c| c.to_string().parse::<i32>().unwrap())
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<Vec<i32>>>();

    let w = content[0].len();
    let h = content.len();

    let mut total = 2 * (w + h) - 4;
    let mut highest = 0;
    for i in 1..h - 1 {
        for j in 1..w - 1 {
            let (l, right) = content[i].split_at(j + 1);
            let mut left = l.to_vec();
            left.pop();
            let column = content.iter().map(|c| c[j]).collect::<Vec<i32>>();
            let (t, bottom) = column.split_at(i + 1);
            let mut top = t.to_vec();
            top.pop();
            top.reverse();
            left.reverse();

            let t = helper(content[i][j], &top);
            let b = helper(content[i][j], &bottom);
            let l = helper(content[i][j], &left);
            let r = helper(content[i][j], &right);

            highest = (t * b * l * r).max(highest);

            if top.iter().max().unwrap() < &content[i][j]
                || bottom.iter().max().unwrap() < &content[i][j]
                || left.iter().max().unwrap() < &content[i][j]
                || right.iter().max().unwrap() < &content[i][j]
            {
                total += 1;
            }
        }
    }
    println!("part1: {total:?}");
    println!("part2: {highest:?}");
}

fn helper(height: i32, trees: &[i32]) -> i32 {
    let mut result = 0;
    for tree in trees {
        result += 1;
        if tree >= &height {
            break;
        }
    }
    return result;
}
