const { readFileSync } = require("fs");

const whatIsS = (i, j, pipeMap) => {
    if (i - 1 >= 0 && (pipeMap[i - 1][j] === 'F' || pipeMap[i - 1][j] === '7' || pipeMap[i - 1][j] === '|')) {
        if (i + 1 < pipeMap.length && (pipeMap[i + 1][j] === 'L' || pipeMap[i + 1][j] === 'J' || pipeMap[i + 1][j] === '|')) {
            return '|';
        }
        if (j + 1 < pipeMap[i].length && (pipeMap[i][j + 1] === 'J' || pipeMap[i][j + 1] === '7' || pipeMap[i][j + 1] === '-')) {
            return 'L';
        }
        if (j - 1 >= 0 && (pipeMap[i][j - 1] === 'L' || pipeMap[i][j - 1] === 'F' || pipeMap[i][j - 1] === '-')) {
            return 'J';
        }
    }
    if (i + 1 < pipeMap.length && (pipeMap[i + 1][j] === 'L' || pipeMap[i + 1][j] === 'J' || pipeMap[i + 1][j] === '|')) {
        // 7 F |
        if (j - 1 >= 0 && (pipeMap[i][j - 1] === 'L' || pipeMap[i][j - 1] === 'F' || pipeMap[i][j - 1] === '-')) {
            return '7';
        }
        if (j + 1 < pipeMap[i].length && (pipeMap[i][j + 1] === 'J' || pipeMap[i][j + 1] === '7' || pipeMap[i][j + 1] === '-')) {
            return 'F';
        }
        if (i - 1 >= 0 && (pipeMap[i - 1][j] === 'F' || pipeMap[i - 1][j] === '7' || pipeMap[i - 1][j] === '|')) {
            return '|';
        }
    }
    if (j - 1 >= 0 && (pipeMap[i][j - 1] === 'L' || pipeMap[i][j - 1] === 'F' || pipeMap[i][j - 1] === '-')) {
        // 7 J -
        if (i + 1 < pipeMap.length && (pipeMap[i + 1][j] === 'L' || pipeMap[i + 1][j] === 'J' || pipeMap[i + 1][j] === '|')) {
            return '7';
        }
        if (i - 1 >= 0 && (pipeMap[i - 1][j] === 'F' || pipeMap[i - 1][j] === '7' || pipeMap[i - 1][j] === '|')) {
            return 'J';
        }
        if (j + 1 < pipeMap[i].length && (pipeMap[i][j + 1] === 'J' || pipeMap[i][j + 1] === '7' || pipeMap[i][j + 1] === '-')) {
            return '-';
        }
    }
    if (j + 1 < pipeMap[i].length && (pipeMap[i][j + 1] === 'J' || pipeMap[i][j + 1] === '7' || pipeMap[i][j + 1] === '-')) {
        // L F -
        if (i + 1 < pipeMap.length && (pipeMap[i + 1][j] === 'L' || pipeMap[i + 1][j] === 'J' || pipeMap[i + 1][j] === '|')) {
            return 'L';
        }
        if (i - 1 >= 0 && (pipeMap[i - 1][j] === 'F' || pipeMap[i - 1][j] === '7' || pipeMap[i - 1][j] === '|')) {
            return 'F';
        }
        if (j - 1 >= 0 && (pipeMap[i][j - 1] === 'L' || pipeMap[i][j - 1] === 'F' || pipeMap[i][j - 1] === '-')) {
            return '-';
        }
    }
};

const findS = (pipeMap) => {
    for (let i = 0; i < pipeMap.length; i++) {
        for (let j = 0; j < pipeMap[i].length; j++) {
            if (pipeMap[i][j] === 'S') {
                return [i, j, whatIsS(i, j, pipeMap)];
            }
        }
    }
    return [-1, -1, -1];
};

const invalidPos = (i, j, pipeMap) => {
    return i < 0 || j < 0 || i >= pipeMap.length || j >= pipeMap[i].length;

};

const sol1 = (input) => {
    const pipeMap = input.split('\n').map(line => line.split(''));
    const [startingI, startingJ, whatSIs] = findS(pipeMap);
    pipeMap[startingI][startingJ] = whatSIs;
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