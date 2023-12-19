const { readFileSync } = require("fs");
const distanceToGalaxy = (galaxy, point) => {
    return Math.abs(galaxy[0] - point[0]) + Math.abs(galaxy[1] - point[1]);
};

const sol1 = (input) => {
    let universe = input.split("\n").map(x => x.split(''));
    let rows = universe.map(x => x.join(""));
    let columns = universe[0].map((_, i) => universe.map(x => x[i]).join(""));

    const rowsWithDots = rows.map((_, i) => i).filter(x => !rows[x].includes("#"));
    const ColumnsWithDots = columns.map((_, i) => i).filter(x => !columns[x].includes("#"));

    let galaxies = [];
    for (let i = 0; i < rows.length; i++) {
        let fillRows = rowsWithDots.filter(x => x < i).length;
        for (let j = 0; j < columns.length; j++) {
            let fillCols = ColumnsWithDots.filter(x => x < j).length;
            if (universe[i][j] === "#") {
                galaxies.push([i + fillRows, j + fillCols]);
            }
        }
    }
    let minDistanceSum = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            minDistanceSum += distanceToGalaxy(galaxies[i], galaxies[j]);
        }
    }
    return minDistanceSum;
};
const sol2 = (input) => { };

const test_1 = () => {
    let input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;
    console.log(distanceToGalaxy([11, 0], [11, 5]), 5);
    let expectedExpansion = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`;
    console.log(sol1(input), 374);
};

const test_2 = () => { };

const input = readFileSync('./day_11_input.txt', { encoding: 'utf-8' });
test_1();
console.log(`Part 1: ${sol1(input)}`);
test_2();
console.log(`Part 2: ${sol2(input)} `);