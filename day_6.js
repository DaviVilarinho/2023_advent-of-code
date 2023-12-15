const fs = require('fs');
const distanceTravelledBySecondHold = (seconds, maxTime) => {
    return (maxTime - seconds) * seconds;
}

const sol1 = (input) => {
    let lines = input.split('\n');
    lines.pop();

    let time_distances_matrix = lines.map(line => {
        let metric = line.split(':').slice(1);
        return metric.pop().trim().split(' ').filter(Boolean).map(Number);
    })

    let ways_to_beat = [];
    for (let race = 0; race < time_distances_matrix[0].length; race++) {
        let [time, record] = [time_distances_matrix[0][race], time_distances_matrix[1][race]];
        let possible_time_holdings = []
        for (let t = 0; t <= time; t++) {
            possible_time_holdings.push(distanceTravelledBySecondHold(t, time));
        }
        ways_to_beat.push(possible_time_holdings.filter(move => move > record).length);
    }

    return ways_to_beat.reduce((a, b) => a * b);
}

const sol2 = (input) => {
    let lines = input.split('\n');
    lines.pop();

    let time_distances_matrix = lines.map(line => {
        let metric = line.split(':').slice(1);
        return [Number(metric.pop().trim().split(' ').filter(Boolean).reduce((a, b) => a + b, ''))];
    })

    let ways_to_beat = [];
    for (let race = 0; race < time_distances_matrix[0].length; race++) {
        let [time, record] = [time_distances_matrix[0][race], time_distances_matrix[1][race]];
        let possible_time_holdings = []
        for (let t = 0; t <= time; t++) {
            possible_time_holdings.push(distanceTravelledBySecondHold(t, time));
        }
        ways_to_beat.push(possible_time_holdings.filter(move => move > record).length);
    }

    return ways_to_beat.reduce((a, b) => a * b);
}

const test = () => {
    console.log(`Don't hold ${distanceTravelledBySecondHold(0, 7)} == 0`);
    console.log(`Hold 1 ${distanceTravelledBySecondHold(1, 7)} == 6`);
    console.log(`Hold 2 ${distanceTravelledBySecondHold(2, 7)} == 10`);
    console.log(`Hold 3 ${distanceTravelledBySecondHold(3, 7)} == 12`);
    console.log(`Hold 4 ${distanceTravelledBySecondHold(4, 7)} == 12`);
    console.log(`Hold 5 ${distanceTravelledBySecondHold(5, 7)} == 10`);
    console.log(`Hold 6 ${distanceTravelledBySecondHold(6, 7)} == 6`);
    console.log(`Hold 7 ${distanceTravelledBySecondHold(7, 7)} == 0`);
    example_input = `Time:      7  15   30
Distance: 9  40  200
`;
    console.log(`Example: ${sol1(example_input)} == 288`);

    console.log(`Part 1: ${sol1(fs.readFileSync('day_6_input.txt', 'utf8'))}`);
    console.log(`Part 2: ${sol2(fs.readFileSync('day_6_input.txt', 'utf8'))}`);

}

test();