import {
    getLines
} from '../modules/input.js';

const lines = getLines('day14');

const binaryCache = {};

function getBinary(number) {
    if (binaryCache[number]) {
        return binaryCache[number];
    }
    const binary = (number >>> 0).toString(2).padStart(36, '0');
    binaryCache[number] = binary;
    return binary;
}

function getMaskedBinary(binary, mask) {
    const binaryArray = binary.split('');
    for (let i = 0; i < binaryArray.length; i++) {
        if (mask[i] !== 'X') {
            binaryArray[i] = mask[i];
        }
    }
    return binaryArray.join('');
}

function part1() {
    const memory = {};
    let mask;
    lines.forEach(line => {
        const [a, b] = line.split(' = ');
        if (a.startsWith('mask')) {
            mask = b;
        } else {
            const number = Number(b);
            const memoryIndex = Number(a.substring(4, a.length - 1));
            const binary = getBinary(number);
            const maskedBinary = getMaskedBinary(binary, mask);
            memory[memoryIndex] = parseInt(maskedBinary, 2);
        }
    });
    return Object.values(memory).reduce((a, b) => a + b, 0);
}
console.log(part1());

function getAddresses(binary, mask) {
    const binaryArray = binary.split('');
    for (let i = 0; i < binaryArray.length; i++) {
        if (mask[i] !== '0') {
            binaryArray[i] = mask[i];
        }
    }
    const addresses = [];
    const floatingBitsCount = binaryArray.filter(b => b === 'X').length;
    const combinations = Math.pow(2, floatingBitsCount);
    for (let i = 0; i < combinations; i++) {
        const combo = getBinary(i);
        const shortCombo = combo.substr(combo.length - floatingBitsCount).split('');
        const copy = [...binaryArray];
        for (let j = 0; j < binaryArray.length; j++) {
            if (copy[j] === 'X') {
                copy[j] = shortCombo.shift();
            }
        }
        const address = parseInt(copy.join(''), 2);
        addresses.push(address);
    }
    return addresses;
}

function part2() {
    const memory = {};
    let mask;
    lines.forEach(line => {
        const [a, b] = line.split(' = ');
        if (a.startsWith('mask')) {
            mask = b;
        } else {
            const number = Number(b);
            const memoryIndex = Number(a.substring(4, a.length - 1));
            const binaryMemoryIndex = getBinary(memoryIndex);
            const addresses = getAddresses(binaryMemoryIndex, mask);
            addresses.forEach(address => {
                memory[address] = number;
            });
        }
    });
    return Object.values(memory).reduce((a, b) => a + b, 0);
}
console.log(part2());