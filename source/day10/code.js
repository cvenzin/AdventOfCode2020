import {
    getLines
} from '../modules/input.js';

const lines = getLines('day10');
const numbers = lines.map(l => Number(l));
const outputJoltages = [0, ...numbers, Math.max(...numbers) + 3].sort((a, b) => a - b);

function part1() {
    const differences = [0, 0, 0];
    let currentJoltage = 0;
    outputJoltages.forEach(joltage => {
        if (currentJoltage + 3 >= joltage) {
            differences[Math.abs(joltage - currentJoltage) - 1] += 1;
            currentJoltage = joltage;
        }
    });
    return differences[0] * differences[2];
}
console.log(part1());

// working but very slow...
// function part2() {
//     let sum = 0;
//     const data = [
//         [0, 0]
//     ];
//     const maxIndex = outputJoltages.length - 1;
//     const maxJoltage = outputJoltages[maxIndex];
//     while (data.length > 0) {
//         const d = data.shift();
//         const currentJoltage = d[0];
//         const i = d[1];
//         for (let j = 1; j < 4; j++) {
//             const index = i + j;
//             if (index > maxIndex) {
//                 break;
//             }
//             const nextJoltage = outputJoltages[index];
//             if (currentJoltage + 3 >= nextJoltage) {
//                 if (nextJoltage === maxJoltage) {
//                     sum++;
//                 } else {
//                     data.push([nextJoltage, index]);
//                 }
//             }
//         }
//     }
//     return sum;
// }
// console.log(part2());

// using a DP algorithm
function part2() {
    const dp = [1];
    for (let i = 1; i < outputJoltages.length; i++) {
        let ans = 0;
        for (let j = 0; j < i; j++) {
            if (outputJoltages[j] + 3 >= outputJoltages[i]) {
                ans += dp[j];
            }
        }
        dp.push(ans);
    }
    return dp[dp.length - 1];
}
console.log(part2());