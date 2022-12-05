fn main() {
    let lines = std::fs::read_to_string("inputs/05-tung").unwrap();
    let lines: Vec<String> = lines.split("\n\n").map(|x| x.to_string()).collect();
    let mut ship: Vec<String> = lines[0].split('\n').map(|x| x.to_string()).collect();
    ship.pop();
    let mut cargos: Vec<Vec<String>> = Vec::new();
    for _ in 0..9 {
        cargos.push(Vec::new());
    }
    for line in ship.iter().rev() {
        let chars: Vec<char> = line.chars().collect();
        for i in (1..line.len()).step_by(4) {
            if chars[i] != ' ' {
                cargos[(i - 1) / 4].push(chars[i].to_string());
            }
        }
    }
    let moves: Vec<Vec<usize>> = lines[1]
        .split('\n')
        .map(|x| {
            x.to_string()
                .split(' ')
                .filter_map(|x| {
                    let y = x.to_string().parse::<usize>();
                    match y {
                        Ok(z) => Some(z),
                        _ => None,
                    }
                })
                .collect()
        })
        .collect();
    let mut p2 = cargos.clone();
    for mv in &moves {
        for _ in 0..mv[0] {
            if let Some(a) = cargos[mv[1] - 1].pop() {
                cargos[mv[2] - 1].push(a);
            }
        }
    }
    for mv in &moves {
        let mut x: Vec<String> = p2[mv[1] - 1]
            .iter()
            .rev()
            .take(mv[0])
            .rev()
            .map(|x| x.to_string())
            .collect();
        for _ in 0..mv[0] {
            p2[mv[1] - 1].pop();
        }
        p2[mv[2] - 1].append(&mut x);
    }
    let x: Vec<String> = cargos
        .into_iter()
        .map(|x| x.into_iter().last().unwrap())
        .collect();

    let y: Vec<String> = p2
        .into_iter()
        .map(|x| x.into_iter().last().unwrap())
        .collect();

    println!("part1: {}", x.join(""));

    println!("part2: {}", y.join(""));
}
