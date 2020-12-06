import {
    getLines
} from '../modules/input.js'

const lines = getLines('day06');

function part1() {
    const groupAnswers = [new Set()];
    let currentGroupAnswer = groupAnswers[0];
    lines.forEach(line => {
        if (line) {
            line.split('').forEach(char => {
                currentGroupAnswer.add(char);
            });
        } else {
            currentGroupAnswer = new Set();
            groupAnswers.push(currentGroupAnswer);
        }
    });
    return groupAnswers.map(groupAnswer => groupAnswer.size).reduce((accumulator, currentValue) => accumulator + currentValue);
}
console.log(part1());

function part2() {
    const groupAnswers = [new Set()];
    let currentGroupAnswer = groupAnswers[0];
    let groupCompleted = false;
    lines.forEach(line => {
        if (line && !groupCompleted) {
            const newValues = line.split('');
            if (currentGroupAnswer.size === 0) {
                newValues.forEach(newValue => {
                    currentGroupAnswer.add(newValue);
                });
            } else {
                for (let item of currentGroupAnswer) {
                    if (!newValues.find(newValue => newValue === item)) {
                        currentGroupAnswer.delete(item);
                        if (currentGroupAnswer.size == 0) {
                            groupCompleted = true; // no need to process the other lines for this group
                        }
                    }
                }
            }
        } else if (!line) {
            groupCompleted = false;
            currentGroupAnswer = new Set();
            groupAnswers.push(currentGroupAnswer);
        }
    });
    return groupAnswers.map(groupAnswer => groupAnswer.size).reduce((accumulator, currentValue) => accumulator + currentValue);
}
console.log(part2());