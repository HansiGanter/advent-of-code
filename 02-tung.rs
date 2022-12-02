use std::collections::HashMap;

/*


*/

fn main() {
    let part1 = HashMap::from()

    let mut calories: Vec<i32> = std::fs::read_to_string("inputs/02-tung")
        .unwrap()
        .split("\n\n")
        .map(|x| {
            x.split('\n')
                .map(|x| x.parse::<i32>().unwrap())
                .sum::<i32>()
        })
        .collect();
    calories.sort();
    println!("part1: {}", calories.first().unwrap());
    println!("part2: {}", calories.into_iter().rev().take(3).sum::<i32>())
}
