const { readFileSync } = require('fs');

const getContiguousBrokenGroups = (arr) => {
    let contiguousBrokenGroups = [];
    let startBroken = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '.') {
            if (i - startBroken > 0) {
                contiguousBrokenGroups.push(i - startBroken);
            }
            startBroken = i + 1;
        }
    }
    if (startBroken < arr.length) {
        contiguousBrokenGroups.push(arr.length - startBroken);
    }
    return contiguousBrokenGroups;
};

function generateCombinations(str) {
    let index = str.indexOf('?');
    if (index === -1) {
        return [str];
    } else {
        let prefix = str.substring(0, index);
        let suffix = str.substring(index + 1);
        let combinationsWithDot = generateCombinations(prefix + '.' + suffix);
        let combinationsWithHash = generateCombinations(prefix + '#' + suffix);
        return combinationsWithDot.concat(combinationsWithHash);
    }
}

const arrangementsPerLine = (positions, config) => {
    let contiguousGroupsRequirement = config.split(',').map(x => parseInt(x));
    let arrangements = 0;
    for (combination of generateCombinations(positions)) {
        let contiguousGroupsOfCombination = getContiguousBrokenGroups(combination);
        if (contiguousGroupsOfCombination.length === contiguousGroupsRequirement.length &&
            contiguousGroupsOfCombination.every((x, i) => x === contiguousGroupsRequirement[i])) {
            arrangements++;
        }
    }
    return arrangements;
};

const sol1 = (input) => {
    let inputlines = input.split("\n");
    inputlines.pop();
    return inputlines.map(line => {
        let [positions, config] = line.split(' ');
        return arrangementsPerLine(positions, config);
    }).reduce((a, b) => a + b, 0);
};

const unfold = (position, config) => {
    let bigPosition = `${position}`;
    let bigConfig = `${config}`;
    for (let i = 0; i < 4; i++) {
        bigPosition = `${bigPosition}?${position}`;
        bigConfig = `${bigConfig},${config}`;
    }
    return [bigPosition, bigConfig];
};

const sol2 = (input) => {
    let inputlines = input.split("\n");
    inputlines.pop();
    return inputlines.map(line => {
        let [positions, config] = line.split(' ');
        [positions, config] = unfold(positions, config);
        return arrangementsPerLine(positions, config);
    }).reduce((a, b) => a + b, 0);
};

const test_1 = () => {
    const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;
    console.log(getContiguousBrokenGroups("#.#.###"), [1, 1, 3]);
    console.log(getContiguousBrokenGroups(".#...#....###."), [1, 1, 3]);
    console.log(arrangementsPerLine("???.###", "1,1,3"), 1);
    console.log(arrangementsPerLine(".??..??...?##.", "1,1,3"), 4);
    console.log(arrangementsPerLine("?#?#?#?#?#?#?#?", "1,3,1,6"), 1);
    console.log(arrangementsPerLine("????.#...#...", "4,1,1"), 1);
    console.log(arrangementsPerLine("????.######..#####.", "1,6,5"), 4);
    console.log(sol1(input), 21);
};

const test_2 = () => {
    console.log(unfold("???.###", "1,1,3"), ["???.###????.###????.###????.###????.###", "1,1,3,1,1,3,1,1,3,1,1,3,1,1,3"]);
};

const input = readFileSync('./day_12_input.txt', { encoding: 'utf-8' });
//test_1();
//console.log(`Part 1: ${sol1(input)}`);
test_2();
console.log(`Part 2: ${sol2(input)} `);