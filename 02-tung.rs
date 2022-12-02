/*      
a   =   x   4   a   z   3
b   >   x   1   b   x   1
c   <   x   7   c   y   2
        
a   <   y   8   a   x   4
b   =   y   5   b   y   5
c   >   y   2   c   z   6
        
a   >   z   3   a   y   8
b   <   z   9   b   z   9
c   =   z   6   c   x   7

*/

fn main() {
    let (part1, part2): (Vec<i32>, Vec<i32>) = std::fs::read_to_string("inputs/02-tung")
        .unwrap()
        .split("\n")
        .map(|x| match x{
            "A X"=> (4, 3),
            "B X"=> (1, 1),
            "C X"=> (7, 2),
            "A Y"=> (8, 4),
            "B Y"=> (5, 5),
            "C Y"=> (2, 6),
            "A Z"=> (3, 8),
            "B Z"=> (9, 9),
            "C Z"=> (6, 7),
            _ => (0, 0),
        }).unzip();

    println!("part1: {}", part1.iter().sum::<i32>());
    println!("part2: {}", part2.iter().sum::<i32>());
}
