import {
    getLines
} from '../modules/input.js';

const lines = getLines('day08');

const instructions = [];
lines.forEach(line => {
    const split = line.split(' ');
    const instruction = {
        name: split[0],
        value: parseInt(split[1])
    };
    instructions.push(instruction);
});

function getAccumluatorResult(instructionsToEvaluate) {
    let accumulator = 0;
    let runInstructions = [];
    let i = 0;
    while (!runInstructions.includes(i)) {
        if (i === instructionsToEvaluate.length) {
            return [accumulator, true];
        }
        runInstructions.push(i);
        const instruction = instructionsToEvaluate[i];
        switch (instruction.name) {
            case 'acc':
                accumulator += instruction.value;
                i++;
                break;
            case 'jmp':
                i += instruction.value;
                break;
            case 'nop':
                i++;
                break;
        }
    }
    return [accumulator];
}

function part1() {
    return getAccumluatorResult(instructions)[0];
}
console.log(part1());

function part2() {
    for (let i = 0; i < instructions.length; i++) {
        const patchedInstruction = JSON.parse(JSON.stringify(instructions));
        if (patchedInstruction[i].name === 'nop') {
            patchedInstruction[i].name = 'jmp';
        } else if (patchedInstruction[i].name === 'jmp') {
            patchedInstruction[i].name = 'nop';
        } else {
            continue;
        }
        const [accumulator, terminated] = getAccumluatorResult(patchedInstruction);
        if (terminated) {
            return accumulator;
        }
    }
}
console.log(part2());