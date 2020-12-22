import {
    getLines
} from '../modules/input.js';

const lines = getLines('day22');

const deck1 = lines.join(' ').split('  Player 2: ')[0].replace('Player 1: ', '').split(' ').map(Number);
const deck2 = lines.join(' ').split('  Player 2: ')[1].split(' ').map(Number);

function part1() {
    const d1 = [...deck1];
    const d2 = [...deck2];
    while (d1.length > 0 && d2.length > 0) {
        const c1 = d1.shift();
        const c2 = d2.shift();
        if (c1 > c2) {
            d1.push(c1);
            d1.push(c2);
        } else {
            d2.push(c2);
            d2.push(c1);
        }
    }
    const d = d1.length === 0 ? d2 : d1;
    return d.reverse().reduce((a, b, i) => a + b * (i + 1), 0);
}
console.log(part1());


function playGame(d1, d2) {
    const playedCards = new Map();
    while (d1.length > 0 && d2.length > 0) {
        const key = d1.join(',') + '-' + d2.join(',');
        if (playedCards.has(key)) {
            return [
                [1],
                []
            ];
        }
        playedCards.set(key);

        const c1 = d1.shift();
        const c2 = d2.shift();
        if (d1.length >= c1 && d2.length >= c2) {
            const d1_ = d1.slice(0, c1);
            const d2_ = d2.slice(0, c2);
            const [d1__, d2__] = playGame(d1_, d2_);
            if (d1__.length > d2__.length) {
                d1.push(c1);
                d1.push(c2);
            } else {
                d2.push(c2);
                d2.push(c1);
            }
        } else if (c1 > c2) {
            d1.push(c1);
            d1.push(c2);
        } else {
            d2.push(c2);
            d2.push(c1);
        }
    }
    return [d1, d2];
}

function part2() {
    const d1 = [...deck1];
    const d2 = [...deck2];
    const [d1_, d2_] = playGame(d1, d2);
    const d = d1_.length === 0 ? d2_ : d1_;
    return d.reverse().reduce((a, b, i) => a + b * (i + 1), 0);
}
console.log(part2());