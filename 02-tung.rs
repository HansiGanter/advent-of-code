use std::collections::HashMap;

/*      1
a   =   x   3
b   >   x   0
c   <   x   6
        2
a   <   y   6
b   =   y   3
c   >   y   0
        3
a   >   z   0
b   <   z   6
c   =   z   3

*/

fn main() {
    let part1 = HashMap::from([
        ("A X", (4,)),
        ("B X", (1,)),
        ("C X", (7,)),
        ("A Y", (8,)),
        ("B Y", (5,)),
        ("C Y", (2,)),
        ("A Z", (3,)),
        ("B Z", (9,)),
        ("C Z", (6,)),
    ]);

    let p1: Vec<i32> = std::fs::read_to_string("inputs/02-tung")
        .unwrap()
        .split("\n")
        .map(|x| part1.get(x).unwrap().0.clone())
        .collect();
    println!("part1: {:?}", p1.iter().sum::<i32>());
}
