import {
    getLines
} from '../modules/input.js';

const lines = getLines('day16');
const rules = [];
const ruleNames = [];
const yourTicketIndex = lines.findIndex(l => l === 'your ticket:');
const nearbyTicketsIndex = lines.findIndex(l => l === 'nearby tickets:');

lines.slice(0, yourTicketIndex - 1).forEach(line => {
    const [minA, maxA, minB, maxB] = line.match(/\d+/g).map(Number);
    const map = new Map();
    for (let i = minA; i <= maxA; i++) {
        map.set(i);
    }
    for (let i = minB; i <= maxB; i++) {
        map.set(i);
    }
    ruleNames.push(line.split(':')[0]);
    rules.push(map);
});

function part1() {
    let sum = 0;
    lines.slice(nearbyTicketsIndex + 1, lines.length).forEach(ticket => {
        const values = ticket.split(',').map(Number);
        for (const value of values) {
            if (!rules.some(rule => rule.has(value))) {
                sum += value;
            }
        }
    });
    return sum;
}
console.log(part1());

function part2() {
    const validTickets = [];
    lines.slice(nearbyTicketsIndex + 1, lines.length).forEach(ticket => {
        const values = ticket.split(',').map(Number);
        let isValid = true;
        for (const value of values) {
            if (!rules.some(rule => rule.has(value))) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            validTickets.push(values);
        }
    });
    const yourTicket = lines[yourTicketIndex + 1].split(',').map(Number);
    validTickets.push(yourTicket);

    const validRulesPerRow = [];
    for (let i = 0; i < validTickets[0].length; i++) {
        validRulesPerRow.push([]);
        for (let k = 0; k < rules.length; k++) {
            let isValid = true;
            for (let j = 0; j < validTickets.length; j++) {
                if (!rules[k].has(validTickets[j][i])) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                validRulesPerRow[i].push(ruleNames[k]);
            }
        }
    }

    let checkedIndexes = new Map();
    while (validRulesPerRow.flat(1).length > validRulesPerRow.length) {
        let index;
        for (let i = 0; i < validRulesPerRow.length; i++) {
            if (validRulesPerRow[i].length === 1 && !checkedIndexes.has(i)) {
                index = i;
                checkedIndexes.set(i);
            }
        }
        const name = validRulesPerRow[index][0];
        for (let i = 0; i < validRulesPerRow.length; i++) {
            if (i !== index) {
                const index2 = validRulesPerRow[i].findIndex(r => r === name);
                if (index2 > -1) {
                    validRulesPerRow[i].splice(index2, 1);
                }
            }
        }
    }

    let result = 1;
    for (let i = 0; i < validRulesPerRow.length; i++) {
        if (validRulesPerRow[i][0].startsWith('departure')) {
            result *= yourTicket[i];
        }
    }
    return result;
}
console.log(part2());