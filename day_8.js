const fs = require('fs');

const sol1 = (input) => {
    let lines = input.split('\n');
    let directions = lines.shift().split('').map(dir => dir == 'R' ? 1 : 0);
    lines.pop();
    lines.shift();
    let rules = Object.fromEntries(lines.map(line => {
        let [key, value] = line.split(' = ');
        return [key, [value.substring(1, 4), value.substring(6, 9)]];
    }));

    let steps = 0;
    let current = 'AAA';
    while (current != 'ZZZ') {
        current = rules[current][directions[steps % directions.length]];
        steps = steps + 1;
    }
    return steps;
}

const test_1 = () => {
    const input_1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;
    console.log(sol1(input_1), 2);
    const input_2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`
    console.log(sol1(input_2), 6);
}

const sol2 = (input) => {
    return undefined;
}

const test_2 = () => {

}

test_1()
console.log(`Part 1: ${sol1(fs.readFileSync('day_8_input.txt', 'utf8'))}`);
test_2()
console.log(`Part 2: ${sol2(fs.readFileSync('day_8_input.txt', 'utf8'))}`);