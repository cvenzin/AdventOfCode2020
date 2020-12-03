import fs from 'fs'

export function getLines(fileName) {
    const input = fs.readFileSync(`source/${fileName}/input.txt`, 'utf-8');
    return input.split('\n').map(line => line.trim());
}