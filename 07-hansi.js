const fs = require('fs');
const fileContent = fs.readFileSync('inputs/07-hansi').toString()

sumDir = []
allDir = []

class Directory {
    name;
    files;
    directories;
    parentdir;
    size;

    constructor(name, files, directories, parentdir) {
        this.name = name;
        this.files = files;
        this.directories = directories;
        this.parentdir = parentdir;
        this.size = 0
        sumDir.push(this)
        allDir.push(this)
    }

    getParent() {
        return this.parentdir;
    }

    calcSize(fileSize) {
        this.size += fileSize
        if (this.name !== '/')
            this.getParent().calcSize(fileSize)
        if (this.size > 100000) {
            if (sumDir.indexOf(this) > -1) {
                sumDir.splice(sumDir.indexOf(this), 1)
            }
        }
    }
}

class File {
    name;
    size;

    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}

root = null
fileContent.split('\n').forEach(line => {
    if (line === '$ cd /') {
        root = new Directory('/', [], [])
        currentDir = root
        console.log(`${line} -> Create root dir /`)
    }
    else {
        cmd = line.split(' ')
        switch (cmd[0]) {
            case '$':
                switch (cmd[1]) {
                    case 'cd':
                        if (cmd[2] === '..') {
                            currentDir = currentDir.getParent()
                            console.log(`${line} -> set current directory to ${currentDir.name}`)
                        }
                        else {
                            currentDir = currentDir.directories.find(dir => dir.name === cmd[2])
                            console.log(`${line} -> set current directory to ${currentDir.name}`)
                        }
                        break;
                    case 'ls':
                        console.log(`${line} -> jump to nex line`)
                        break;
                    default:
                        break;
                }
                break;
            case 'dir':
                currentDir.directories.push(new Directory(cmd[1], [], [], currentDir))
                console.log(`${line} -> add directory ${cmd[1]} to current directory ${currentDir.name}`)
                break;
            default:
                if (!isNaN(cmd[0])) {
                    f = new File(cmd[1], Number(cmd[0]))
                    currentDir.files.push(f)
                    currentDir.calcSize(Number(f.size))
                    console.log(`${line} -> add file ${cmd[1]} to current directory ${currentDir.name}`)
                }
                break;
        }
    }
});

// Task 1

sum = 0
sumDir.forEach(d => sum += d.size)
console.log('Task1: ' + sum)

// Task 2

totalSpace = 70000000
neededSpace = 30000000
freeSpace = totalSpace - root.size
missingSpace = neededSpace - freeSpace

sortedDir = allDir.sort((a, b) => a.size - b.size);
for (let i = 0; i < sortedDir.length; i++) {
    if (sortedDir[i].size > missingSpace) {
        console.log('Task2: ' + sortedDir[i].size)
        break;
    }
}