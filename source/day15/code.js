import {
    getLines
} from '../modules/input.js';

const startingNumbers = getLines('day15')[0].split(',').map(l => Number(l));

function computeLastSpokenNumber(lastTurn) {
    const map = new Map();
    let spokenNumber;
    for (let i = 0; i < startingNumbers.length; i++) {
        map.set(startingNumbers[i], [-1, i + 1]);
        spokenNumber = startingNumbers[i];
    }
    for (let i = startingNumbers.length + 1; i <= lastTurn; i++) {
        if (map.has(spokenNumber)) {
            const turns = map.get(spokenNumber);
            if (turns[0] === -1) {
                spokenNumber = 0;
            } else {
                spokenNumber = turns[1] - turns[0];
            }
        } else {
            spokenNumber = 0;
        }
        if (map.has(spokenNumber)) {
            const arr = map.get(spokenNumber);
            arr[0] = arr[1];
            arr[1] = i;
        } else {
            map.set(spokenNumber, [-1, i]);
        }
    }
    return spokenNumber;
}

function part1() {
    return computeLastSpokenNumber(2020);
}
console.log(part1());

function part2() {
    return computeLastSpokenNumber(30000000);
}
console.log(part2());