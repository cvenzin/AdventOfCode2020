import {
    getLines
} from '../modules/input.js';

const lines = getLines('day23');
const cups = lines[0].split('').map(Number);

function compute(cupList, iterations) {

    // build data structure
    const map = []; // index is cup label, value is index of next cup
    for (let i = 0; i < cupList.length; i++) {
        const cup = cupList[i];
        const nextCup = cupList[(i + 1) % cupList.length];
        map[cup] = nextCup;
    }

    // play the game
    const maxCup = cupList.length;
    let currentCup = cupList[0];
    for (let i = 0; i < iterations; i++) {

        // remove 3 cups
        const a = map[currentCup];
        const b = map[a];
        const c = map[b];
        map[currentCup] = map[c];

        // find destination cup
        let destinationCup;
        let j = currentCup;
        while (!destinationCup) {
            j--;
            if (j < 1) {
                j = maxCup;
            }
            if (a !== j && b !== j && c !== j) {
                destinationCup = map[j];
            }
        }

        // insert cups
        map[c] = destinationCup;
        map[j] = a;

        // update currentCup
        currentCup = map[currentCup];
    }
    return map;
}

function part1() {
    const map = compute([...cups], 100);
    let result = '';
    let i = map[1];
    while (result.length < cups.length - 1) {
        result += i;
        i = map[i];
    }
    return result;
}
console.log(part1());

function part2() {
    const input = [...cups];
    let i = Math.max(...input) + 1;
    while (input.length < 1000000) {
        input.push(i++);
    }
    const map = compute(input, 10000000);
    return map[1] * map[map[1]];
}
console.log(part2());