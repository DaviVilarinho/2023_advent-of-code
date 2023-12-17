const fs = require('fs');

const getDirectionsAndRules = (input) => {
    let lines = input.split('\n');
    let directions = lines.shift().split('').map(dir => dir == 'R' ? 1 : 0);
    lines.pop();
    lines.shift();
    let rules = Object.fromEntries(lines.map(line => {
        let [key, value] = line.split(' = ');
        return [key, [value.substring(1, 4), value.substring(6, 9)]];
    }));
    return [directions, rules];
}

const sol1 = (input) => {
    let [directions, rules] = getDirectionsAndRules(input);
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

const gcd = (a, b) => {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
}

const leastCommonMultiple = (numbers) => {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }
    return result;
}

const sol2 = (input) => {
    let [directions, rules] = getDirectionsAndRules(input);
    let stepList = [];
    let endsWithA = Object.keys(rules).filter(key => key.endsWith('A'));
    for (let current of endsWithA) {
        let steps = 0
        while (!current.endsWith('Z')) {
            current = rules[current][directions[steps % directions.length]];
            steps = steps + 1;
        }
        stepList.push(steps);
    }
    return leastCommonMultiple(stepList);
}

const test_2 = () => {
    const input_1 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;
    console.log(sol2(input_1), 6);
}

test_1()
console.log(`Part 1: ${sol1(fs.readFileSync('day_8_input.txt', 'utf8'))}`);
test_2()
console.log(`Part 2: ${sol2(fs.readFileSync('day_8_input.txt', 'utf8'))}`);