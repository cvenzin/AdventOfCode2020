import {
    getLines
} from '../modules/input.js';

const lines = getLines('day06');

function part1() {
    const mergedGroups = lines.map(l => l === '' ? '\n' : l).join('').split('\n');
    return mergedGroups.map(group => [...new Set(group)].length).reduce((accumulator, currentValue) => accumulator + currentValue);
}
console.log(part1());

function getCommonValuesOfGroupAnswers(answers) {
    return answers.map(a => a.split('')).reduce((p, c) => p.filter(e => c.includes(e)));
}

function part2() {
    const groups = lines.map(l => l === '' ? '\n' : l).join(' ').split(' \n ').map(l => l.split(' '));
    return groups.map(answers => getCommonValuesOfGroupAnswers(answers).length).reduce((accumulator, currentValue) => accumulator + currentValue);
}
console.log(part2());