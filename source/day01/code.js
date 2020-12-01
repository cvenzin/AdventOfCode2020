import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf-8');
const numbers = input.split('\n').map(n => Number(n));

function part1() {
    for (let i1 = 0; i1 < numbers.length; i1++) {
        for (let i2 = i1; i2 < numbers.length; i2++) {
            if ((numbers[i1] + numbers[i2]) === 2020) {
                return numbers[i1] * numbers[i2];
            }
        }
    }
}
console.log(part1());

function part2() {
    for (let i1 = 0; i1 < numbers.length; i1++) {
        for (let i2 = i1; i2 < numbers.length; i2++) {
            for (let i3 = i2; i3 < numbers.length; i3++) {
                if ((numbers[i1] + numbers[i2] + numbers[i3]) === 2020) {
                    return numbers[i1] * numbers[i2] * numbers[i3];
                }
            }
        }
    }
}
console.log(part2());

// 1014624
// 80072256