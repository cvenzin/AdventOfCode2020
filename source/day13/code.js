import {
    getLines
} from '../modules/input.js';

const lines = getLines('day13');
const time = Number(lines[0]);
const busses = lines[1].split(',');

function part1() {
    const busTimes = [];
    busses.filter(b => b !== 'x').map(b => Number(b)).forEach(bus => {
        busTimes.push({
            difference: bus + (Math.floor(time / bus) * bus) - time,
            id: bus
        });
    });
    const busToTake = busTimes.sort((a, b) => a.difference - b.difference)[0];
    return busToTake.id * busToTake.difference;
}
console.log(part1());

function part2() {
    let time = 0;
    let increment = Number(busses[0]);
    for (let i = 1; i < busses.length; i++) {
        if (busses[i] === 'x') {
            continue;
        }
        const busTime = Number(busses[i]);
        let searching = true;
        while (searching) {
            time += increment;
            if ((time + i) % busTime === 0) {
                increment *= busTime;
                searching = false;
            }
        }
    }
    return time;
}
console.log(part2());