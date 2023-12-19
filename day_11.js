const { readFileSync } = require("fs");

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = {};
    }
    addNode(node) {
        this.nodes.push(node);
        this.edges[node] = [];
    }
    addEdge(node1, node2, distance) {
        this.edges[node1].push({ to: node2, distance: distance });
        this.edges[node2].push({ to: node1, distance: distance });
    }
    djikstra(start) {
        let distances = {};
        for (let node of this.nodes) {
            distances[node] = Infinity;
        }
        distances[start] = 0;

        let unvisited = new Set(this.nodes);

        while (unvisited.size > 0) {
            let closestNode = Array.from(unvisited).reduce((a, b) => distances[a] < distances[b] ? a : b);

            for (let { to, distance } of this.edges[closestNode]) {
                let newDistance = distances[closestNode] + distance;
                if (newDistance < distances[to]) {
                    distances[to] = newDistance;
                }
            }
            unvisited.delete(closestNode);
        }
        return distances;
    }
}

const toGraph = (expandedUniverse) => {
    let galaxies = [];
    for (let i = 0; i < expandedUniverse.length; i++) {
        for (let j = 0; j < expandedUniverse[i].length; j++) {
            if (expandedUniverse[i][j] === '#') {
                galaxies.push([i, j]);
            }
        }
    }
    let graph = new Graph();
    for (let i = 0; i < galaxies.length; i++) {
        graph.addNode(i);
    }
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = 0; j < galaxies.length; j++) {
            if (i === j) continue;
            graph.addEdge(i, j, distanceToGalaxy(galaxies[i], galaxies[j]));
        }
    }
    return graph;
};

const expand = (universe) => {
    let expanded = [];
    for (line of universe) {
        expanded.push([...line]);
        if (line.every(c => c === '.')) {
            expanded.push([...line]);
        }
    }
    let j = 0;
    let columnsToExpand = [];
    while (j < expanded[0].length) {
        columnJ = universe.map(line => line[j]);
        if (columnJ.every(c => c === '.')) {
            columnsToExpand.push(j);
        }
        j++;
    }
    let columnsExpanded = columnsToExpand.length;
    for (let column of columnsToExpand) {
        for (line of expanded) {
            line.splice(column + columnsExpanded, 0, '.');
        }
    }
    return expanded;
};

const distanceToGalaxy = (galaxy, point) => {
    return Math.abs(galaxy[0] - point[0]) + Math.abs(galaxy[1] - point[1]);
};

const sol1 = (input) => {
    const universe = input.split('\n').map(line => line.split(''));
    universe.pop();
    const expanded = expand(universe);
    const graph = toGraph(expanded);
    let sum = 0;
    for (let i = 0; i < graph.nodes.length; i++) {
        let distances = graph.djikstra(graph.nodes[i]);
        for (let j = i + 1; j < graph.nodes.length; j++) {
            sum += distances[graph.nodes[j]];
        }
    }
    return sum;
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
    const universe = input.split('\n').map(line => line.split(''));
    universe.pop();
    const expanded = expand(universe);
    const expectedExpansionAsMatrix = expectedExpansion.split('\n').map(line => line.split(''));
    console.log([expanded.length, expanded[0].length], [expectedExpansionAsMatrix.length, expectedExpansionAsMatrix[0].length]);
    console.log(sol1(input), 374);
};

const test_2 = () => { };

const input = readFileSync('./day_11_input.txt', { encoding: 'utf-8' });
test_1();
console.log(`Part 1: ${sol1(input)}`);
test_2();
console.log(`Part 2: ${sol2(input)} `);