import {
    getLines
} from '../modules/input.js'

const lines = getLines('day02');
const data = [];
lines.forEach(line => {
    const lineData = {
        min: 0,
        max: 0,
        char: 'a',
        pwChars: []
    };
    const parts = line.split(':');
    lineData.pwChars = parts[1].trim().split('');
    const parts2 = parts[0].split(' ');
    lineData.char = parts2[1];
    const numbers = parts2[0].split('-').map(n => Number(n));
    lineData.min = numbers[0];
    lineData.max = numbers[1];
    data.push(lineData);
});

function part1() {
    let validPwCount = 0;
    data.forEach(d => {
        const occurences = d.pwChars.filter(c => c === d.char).length;
        if (occurences <= d.max && occurences >= d.min) {
            validPwCount++;
        }
    });
    return validPwCount;
}
console.log(part1());

function part2() {
    let validPwCount = 0;
    data.forEach(d => {
        const minIndex = d.min - 1;
        const maxIndex = d.max - 1;
        if (d.pwChars[minIndex] === d.char ^ d.pwChars[maxIndex] === d.char) {
            validPwCount++;
        }
    });
    return validPwCount;
}
console.log(part2());