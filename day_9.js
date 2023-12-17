const fs = require('fs');
const findTheDeltas = (arr) => {
    const deltas = [];
    for (let i = 1; i < arr.length; i++) {
        deltas.push(arr[i] - arr[i - 1]);
    }
    return deltas;
}

const recursivelyConstructDeltas = (oasisReport) => {
    const deltas = findTheDeltas(oasisReport);
    if (deltas.length === 0) {
        return [];
    }
    if (deltas.every(d => d == 0)) {
        return [deltas];
    }
    return [deltas].concat(recursivelyConstructDeltas(deltas));
}

const sol1 = (input) => {
    const lines = input.split('\n').map(line => line.split(' ').map(x => parseInt(x)));
    let extrapolateSum = 0;
    for (let oasisReport of lines) {
        let deltas = [oasisReport].concat(recursivelyConstructDeltas(oasisReport));
        deltas[deltas.length - 1] = deltas[deltas.length - 1].concat(0);
        for (let i = deltas.length - 2; i >= 0; i--) {
            deltas[i] = deltas[i].concat(deltas[i][deltas[i].length - 1] + deltas[i + 1][deltas[i + 1].length - 1]);
        }
        extrapolateSum += deltas[0][deltas[0].length - 1];
    }
    return extrapolateSum;
}

const test_1 = () => {
    const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`
    console.log(sol1(input), 114)
}

test_1();
console.log(`Part 1: ${sol1(fs.readFileSync('day_9_input.txt', 'utf8'))}`);