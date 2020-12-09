import {
    getLines
} from '../modules/input.js';

const lines = getLines('day09');

const numbers = lines.map(l => Number(l));
const preambleLength = 25;

function isValid(preamble, number) {
    for (let i = 0; i < preamble.length; i++) {
        for (let j = i; j < preamble.length; j++) {
            if (preamble[i] + preamble[j] === number) {
                return true;
            }
        }
    }
    return false;
}

function part1() {
    const numbersToCheck = numbers.slice(preambleLength, numbers.length);
    for (let i = 0; i < numbersToCheck.length; i++) {
        if (!isValid(numbers.slice(i, i + preambleLength), numbersToCheck[i])) {
            return numbersToCheck[i];
        }
    }
}
console.log(part1());

function part2() {
    const invalidNumber = part1();
    let contiguousSet = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
            contiguousSet.push(numbers[j]);
            const sum = contiguousSet.reduce((a, b) => a + b);
            if (sum > invalidNumber) {
                contiguousSet = [];
                break;
            } else if (contiguousSet.length > 1 && sum === invalidNumber) {
                const result = contiguousSet.sort((a, b) => a - b);
                return result[0] + result[result.length - 1];
            }
        }
    }
}
console.log(part2());