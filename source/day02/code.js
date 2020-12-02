import fs from 'fs'

const input = fs.readFileSync('source/day02/input.txt', 'utf-8');

const lines = input.split('\n');
const data = [];
lines.forEach(line => {
    const line = {
        min: 0,
        max: 0,
        char: 'a',
        pwChars: []
    };
    const parts = line.split(':');
    line.pwChars = parts[1].trim().split('');
    const parts2 = parts[0].split(' ');
    line.char = parts2[1];
    const numbers = parts2[0].split('-').map(n => Number(n));
    line.min = numbers[0];
    line.max = numbers[1];
    data.push(line);
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
        if (d.pwChars[minIndex] === d.char && d.pwChars[maxIndex] !== d.char || d.pwChars[minIndex] !== d.char && d.pwChars[maxIndex] === d.char) {
            validPwCount++;
        }
    });
    return validPwCount;
}
console.log(part2());