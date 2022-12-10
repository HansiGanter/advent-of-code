// use std::cmp;

fn main() {
    let lines = std::fs::read_to_string("inputs/04-tung").unwrap();
    let lines: Vec<Vec<Vec<i32>>> = lines
        .split('\n')
        .map(|line| line.to_string())
        .map(|line| {
            line.split(',')
                .map(|line| line.to_string())
                .collect::<Vec<String>>()
        })
        .map(|vec| {
            vec.into_iter()
                .map(|x| x.split('-').map(|x| x.parse::<i32>().unwrap()).collect())
                .collect()
        })
        .collect();
    // for line in &mut lines {
    //     line.sort_by(|a, b| (a[1] - a[0]).cmp(&(b[1] - b[0])))
    // }
    let total = lines.len();
    let overlap = lines
        .iter()
        .filter(|line| {
            (line[1][0] <= line[0][0] && line[1][1] >= line[0][1])
                || (line[1][0] >= line[0][0] && line[1][1] <= line[0][1])
        })
        .count();

    let not_overlap = lines
        .into_iter()
        .filter(|line| (line[1][0] > line[0][1] || line[1][1] < line[0][0]))
        .count();

    println!("part1: {overlap}, part2: {}", total - not_overlap);
}
