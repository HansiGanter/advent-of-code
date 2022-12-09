fn main() {
    let content = std::fs::read_to_string("inputs/09-tung").unwrap();
    let moves = content
        .split('\n')
        .flat_map(|line| {
            let x = line.split(' ').collect::<Vec<&str>>();
            (0..x[1].parse::<i32>().unwrap())
                .map(|_| x[0])
                .collect::<Vec<&str>>()
        })
        .collect::<Vec<&str>>();

    let mut rope: Vec<(i32, i32)> = (0..9).map(|_| (0, 0)).collect();

    let mut p1 = std::collections::HashSet::<(i32, i32)>::from([(0, 0)]);
    let mut p2 = p1.clone();

    for mv in moves {
        let (x, y) = match mv {
            "U" => (0, 1),
            "D" => (0, -1),
            "L" => (-1, 0),
            "R" => (1, 0),
            _ => panic!(),
        };

        rope[0] = (rope[0].0 + x, rope[0].1 + y);
        for i in 1..9 {
            rope[i] = move_tail(rope[i], rope[i - 1]);
        }

        p1.insert(rope[1]);
        p2.insert(rope[8]);
    }
    println!("part1: {:?}", p1.len());
    println!("part2: {:?}", p2.len());
}

fn move_tail(tail: (i32, i32), head: (i32, i32)) -> (i32, i32) {
    let xdiff = head.0 - tail.0;
    let ydiff = head.1 - tail.1;
    if xdiff.abs() <= 1 && ydiff.abs() <= 1 {
        return tail;
    }
    (tail.0 + 1 * xdiff.signum(), tail.1 + 1 * ydiff.signum())
}
