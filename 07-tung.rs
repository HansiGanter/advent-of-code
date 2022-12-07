use std::collections::HashMap;
use std::fs::read_to_string;
use std::sync::{Arc, Mutex};

#[derive(Debug, Clone)]
struct Node {
    name: String,
    children: Vec<MyNode>,
    size: i32,
}

type MyNode = Arc<Mutex<Node>>;

fn main() {
    let mut nodes: HashMap<String, MyNode> = HashMap::new();
    let content = read_to_string("inputs/07-tung").unwrap();
    let content = content
        .split('\n')
        .map(|x| x.split(' ').collect())
        .collect::<Vec<Vec<&str>>>();

    let mut current: MyNode = Arc::new(Mutex::new(Node {
        name: "/".to_string(),
        children: vec![],
        size: 0,
    }));
    nodes.insert("/".to_string(), Arc::clone(&current));

    for line in content.iter() {
        match &line[..] {
            ["$", "cd", "/"] => {
                let node = nodes.get("/").unwrap();
                current = Arc::clone(node);
            }
            ["$", "cd", ".."] => {
                let path = current.lock().unwrap().name.clone();
                let mut path = path.split('/').collect::<Vec<&str>>();
                path.pop();
                path.pop();
                let mut path = path.join("/");
                path.push('/');
                let node = nodes.get(path.as_str()).unwrap();
                current = Arc::clone(node);
            }
            ["$", "cd", dir] => {
                let mut path = current.lock().unwrap().name.clone();
                path.push_str(dir);
                path.push('/');
                let node = nodes.get(path.as_str()).unwrap();
                current = Arc::clone(node);
            }
            ["$", "ls"] => {}
            ["dir", dir] => {
                let mut path = current.lock().unwrap().name.clone();
                path.push_str(dir);
                path.push('/');
                let node = Arc::new(Mutex::new(Node {
                    name: path.clone(),
                    children: vec![],
                    size: 0,
                }));
                current.lock().unwrap().children.push(Arc::clone(&node));
                nodes.insert(path, Arc::clone(&node));
            }
            [size, file] => {
                let mut path = current.lock().unwrap().name.clone();
                path.push_str(file);
                let node = Arc::new(Mutex::new(Node {
                    name: path.clone(),
                    children: vec![],
                    size: size.parse::<i32>().unwrap(),
                }));
                current.lock().unwrap().children.push(Arc::clone(&node));
                current.lock().unwrap().size += size.parse::<i32>().unwrap();
                nodes.insert(path, Arc::clone(&node));
            }
            _ => panic!(),
        }
    }

    let all = nodes
        .iter()
        .map(|(key, node)| {
            (
                key,
                get_size(&nodes, node),
                node.lock().unwrap().children.is_empty(),
            )
        })
        .filter_map(|(_, size, file)| match file {
            true => None,
            false => Some(size),
        })
        .collect::<Vec<i32>>();

    let p1 = all.iter().filter(|x| x <= &&100000).sum::<i32>();
    println!("part1: {:#?}", p1);

    let needed = get_size(&nodes, nodes.get("/").unwrap()) + 30000000 - 70000000;
    let mut p2 = all
        .into_iter()
        .filter(|x| x >= &needed)
        .collect::<Vec<i32>>();
    p2.sort();
    println!("part2: {:#?}", p2.first().unwrap());
}

fn get_size(nodes: &HashMap<String, MyNode>, node: &MyNode) -> i32 {
    let n = node.lock().unwrap();
    let mut current = 0;
    if n.children.is_empty() {
        current = n.size;
    }
    for child in n.children.iter() {
        current += get_size(nodes, child)
    }
    return current;
}
