import {
    getLines
} from '../modules/input.js'

const lines = getLines('day03');
const treeChar = '#';
const lineLength = lines[0].length;
const maxY = lines.length;
const map = [];

lines.forEach(line => {
    map.push(line.split(''));
});


function part1(rightSteps, downSteps) {
    let y = 0;
    let x = 0;
    let treesFound = 0;
    while (y < maxY) {
        if (map[y][x] === treeChar) {
            treesFound++;
        }
        y += downSteps;
        x = (x + rightSteps) % lineLength;
    }
    return treesFound;
}
console.log(part1(3, 1));

function part2() {
    return part1(1, 1) * part1(3, 1) * part1(5, 1) * part1(7, 1) * part1(1, 2);
}
console.log(part2());