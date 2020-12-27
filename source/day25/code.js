import {
    getLines
} from '../modules/input.js';

const lines = getLines('day25');

const cardPublicKey = Number(lines[0]);
const doorPublicKey = Number(lines[1]);
const initialSubjectNumber = 7;
const divisor = 20201227;


function findLoopSize(key, subjectNumber) {
    let value = 1;
    let loopSize = 0;
    while (value !== key) {
        value *= subjectNumber;
        value %= divisor;
        loopSize++;
    }
    return loopSize;
}

function transformSubjectNumber(loopSize, subjectNumber) {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value *= subjectNumber;
        value %= divisor;
    }
    return value;
}

function part1() {
    const cardsLoopSize = findLoopSize(cardPublicKey, initialSubjectNumber);
    return transformSubjectNumber(cardsLoopSize, doorPublicKey);
}
console.log(part1());

// no part 2