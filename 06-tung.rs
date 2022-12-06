fn main() {
    let line = std::fs::read_to_string("inputs/06-tung").unwrap();
    let chars: Vec<char> = line.chars().collect();
    let p1 = detect(4, chars.clone());
    let p2 = detect(14, chars);
    println!("part1: {p1}, part2: {p2}");
}

fn detect(n: usize, chars: Vec<char>) -> usize {
    for (i, item) in chars.windows(n).enumerate() {
        let set: std::collections::HashSet<&char> = std::collections::HashSet::from_iter(item);
        if set.len() == n {
            return i + n;
        }
    }
    panic!()
}
