fn main() {
    let alphabet: Vec<char> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .chars()
        .collect();
    let lines = std::fs::read_to_string("inputs/03-tung").unwrap();
    let p1 = lines
        .split('\n')
        .map(|line| line.split_at(line.len() / 2))
        .map(|(str1, str2)| {
            let s1: std::collections::HashSet<char> = str1.chars().collect();
            let s2: std::collections::HashSet<char> = str2.chars().collect();
            for c in &s1 {
                if s2.contains(&c) {
                    return alphabet.iter().position(|r| r == c).unwrap() + 1;
                }
            }
            panic!("panic")
        })
        .sum::<usize>();

    let p2 = lines
        .split('\n')
        .collect::<Vec<&str>>()
        .chunks(3)
        .map(|x| {
            match x {
                [str1, str2, str3] => {
                    let s1: std::collections::HashSet<char> = str1.chars().collect();
                    let s2: std::collections::HashSet<char> = str2.chars().collect();
                    let s3: std::collections::HashSet<char> = str3.chars().collect();
                    for c in &s1 {
                        if s2.contains(&c) && s3.contains(&c) {
                            return alphabet.iter().position(|r| r == c).unwrap() + 1;
                        }
                    }
                }
                _ => return 0,
            }
            0
        })
        .sum::<usize>();

    println!("part1: {p1}, part2: {p2}");
}
