import {
    getLines
} from '../modules/input.js';

const lines = getLines('day18');

function evaluate(input) {
    let currentValue;
    let currentOperator;
    for (let i = 0; i < input.length; i++) {
        if (input[i].startsWith('(')) {
            let counter = 0;
            for (let j = i; j < input.length; j++) {
                if (input[j].startsWith('(')) {
                    counter += input[j].split('').filter(s => s === '(').length;
                } else if (input[j].endsWith(')')) {
                    counter -= input[j].split('').filter(s => s === ')').length;
                    if (counter === 0) {
                        const subEntry = input.slice(i, j + 1);
                        subEntry[0] = subEntry[0].replace('(', '');
                        subEntry[subEntry.length - 1] = subEntry[subEntry.length - 1].replace(')', '');
                        if (currentOperator === '+') {
                            currentValue += evaluate(subEntry);
                        } else if (currentOperator === '*') {
                            currentValue *= evaluate(subEntry);
                        } else {
                            currentValue = evaluate(subEntry);
                        }
                        i += j - i;
                        break;
                    }
                }
            }
        } else if (input[i] === '+' || input[i] === '*') {
            currentOperator = input[i];
        } else if (currentOperator === '+') {
            currentValue += Number(input[i]);
        } else if (currentOperator === '*') {
            currentValue *= Number(input[i]);
        } else {
            currentValue = Number(input[i]);
        }
    }
    return currentValue;
}

function evaluate2(input) {
    let currentValue;
    let currentOperator;
    for (let i = 0; i < input.length; i++) {
        if (input[i].startsWith('(')) {
            let counter = 0;
            for (let j = i; j < input.length; j++) {
                if (input[j].startsWith('(')) {
                    counter += input[j].split('').filter(s => s === '(').length;
                } else if (input[j].endsWith(')')) {
                    counter -= input[j].split('').filter(s => s === ')').length;
                    if (counter === 0) {
                        const subEntry = input.slice(i, j + 1);
                        subEntry[0] = subEntry[0].replace('(', '');
                        subEntry[subEntry.length - 1] = subEntry[subEntry.length - 1].replace(')', '');
                        if (currentOperator === '+') {
                            currentValue += evaluate2(subEntry);
                        } else if (currentOperator === '*') {
                            const subEntry2 = input.slice(i, input.length);
                            if (subEntry2.length >= 3) {
                                return currentValue *= evaluate2(subEntry2);
                            } else {
                                currentValue *= Number(input[i]);
                            }
                        } else {
                            currentValue = evaluate2(subEntry);
                        }
                        i += j - i;
                        break;
                    }
                }
            }
        } else if (input[i] === '+' || input[i] === '*') {
            currentOperator = input[i];
        } else if (currentOperator === '+') {
            currentValue += Number(input[i]);
        } else if (currentOperator === '*') {
            const subEntry = input.slice(i, input.length);
            if (subEntry.length >= 3) {
                currentValue *= evaluate2(subEntry);
            } else {
                currentValue *= Number(input[i]);
            }
            break;
        } else {
            currentValue = Number(input[i]);
        }
    }
    return currentValue;
}

function part1() {
    let sum = 0;
    lines.forEach(line => {
        sum += evaluate(line.split(' '));
    });
    return sum;
}
console.log(part1());

function part2() {
    let sum = 0;
    lines.forEach(line => {
        sum += evaluate2(line.split(' '));
    });
    return sum;
}
console.log(part2());