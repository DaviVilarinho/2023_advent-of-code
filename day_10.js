const { readFileSync } = require("fs");

const findS = (pipeMap) => {
    for (let i = 0; i < pipeMap.length; i++) {
        for (let j = 0; j < pipeMap[i].length; j++) {
            if (pipeMap[i][j] === 'S') {
                return [i, j];
            }
        }
    }
    return [-1, -1];
};

const invalidPos = (i, j, pipeMap) => {
    return i < 0 || j < 0 || i >= pipeMap.length || j >= pipeMap[i].length;

};

const sol1 = (input) => {
    const pipeMap = input.split('\n').map(line => line.split(''));
    const [startingI, startingJ] = findS(pipeMap);
    let steps = 0;
    let floodFillStillPositions = [[startingI, startingJ]];
    while (floodFillStillPositions.length > 0) {
        floodFillStillPositions = floodFillStillPositions.map(([i, j]) => {
            if (invalidPos(i, j, pipeMap)) {
                return [];
            }
            if (pipeMap[i][j] === '.' || typeof pipeMap[i][j] == 'number') {
                return [];
            }
            let newPositions = [];
            if (pipeMap[i][j] === '|') {
                newPositions = [[i - 1, j], [i + 1, j]];
            }
            if (pipeMap[i][j] === '-') {
                newPositions = [[i, j - 1], [i, j + 1]];
            }
            if (pipeMap[i][j] === 'L') {
                newPositions = [[i, j + 1], [i - 1, j]];
            }
            if (pipeMap[i][j] === 'J') {
                newPositions = [[i, j - 1], [i - 1, j]];
            }
            if (pipeMap[i][j] === '7') {
                newPositions = [[i, j - 1], [i + 1, j]];
            }
            if (pipeMap[i][j] === 'F') {
                newPositions = [[i, j + 1], [i + 1, j]];
            }
            if (pipeMap[i][j] === 'S') {
                newPositions = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]];
            }
            pipeMap[i][j] = steps;
            return newPositions;
        }).flat();
        steps += 1;
    }
    return Math.max(...pipeMap.map(line => line.filter((x) => typeof x == 'number')).flat());
};
const sol2 = (input) => { };

const test_1 = () => {
    let input = `.....
.S-7.
.|.|.
.L-J.
.....`;
    console.log(sol1(input), 4);
    console.log(sol1(`..F7.
.FJ|.
SJ.L7
|F--J
LJ...`), 8);
};

const test_2 = () => { };

const input = readFileSync('./day_10_input.txt', { encoding: 'utf-8' });
test_1();
console.log(`Part 1: ${sol1(input)}`);
test_2();
console.log(`Part 2: ${sol2(input)}`);