import {
    getLines
} from '../modules/input.js'

const lines = getLines('day05');

const rows = 128;
const columns = 8;
const frontChar = 'F';
const backChar = 'B';
const rightChar = 'R';
const leftChar = 'L';

function findPosition(code, size, lowerHalfChar, upperHalfChar) {
    const position = [0, size - 1];
    for (let char of code) {
        const range = position[1] - position[0];
        if (char === lowerHalfChar) {
            position[1] -= Math.ceil(range / 2);
        } else if (char === upperHalfChar) {
            position[0] += Math.ceil(range / 2);
        }
    }
    return position[0];
}

function getSeatId(line) {
    const row = findPosition(line.substring(0, 7), rows, frontChar, backChar);
    const column = findPosition(line.substring(7, 10), columns, leftChar, rightChar);
    return row * 8 + column;
}

function part1() {
    return Math.max(...lines.map(line => getSeatId(line)));
}
console.log(part1());

function part2() {
    const seatIds = lines.map(line => getSeatId(line)).sort((a, b) => {
        return a - b;
    });
    return seatIds.find((x, i) => seatIds[i + 1] - x > 1) + 1;
}
console.log(part2());