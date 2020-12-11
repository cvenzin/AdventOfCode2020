import {
    getLines
} from '../modules/input.js';

const lines = getLines('day11');
const emptySeat = 'L';
const occupiedSeat = '#';
const floor = '.';
const grid = lines.map(l => l.split(''));
const gridHeight = grid.length;
const gridWidth = grid[0].length;

function getOccupiedNeighborSeatCount(i1, j1, currentGrid) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (j === 0 && i === 0) {
                continue;
            }
            const i2 = i1 + i;
            const j2 = j1 + j;
            if (i2 >= 0 && i2 < gridHeight && j2 >= 0 && j2 < gridWidth && currentGrid[i2][j2] === occupiedSeat) {
                sum++;
            }
        }
    }
    return sum;
}

function getVisibleNeighborSeatCount(i1, j1, currentGrid) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (j === 0 && i === 0) {
                continue;
            }
            let i2 = i1 + i;
            let j2 = j1 + j;
            while (0 <= i2 && i2 < gridHeight && 0 <= j2 && j2 < gridWidth && currentGrid[i2][j2] === floor) {
                i2 += i;
                j2 += j;
            }
            if (0 <= i2 && i2 < gridHeight && 0 <= j2 && j2 < gridWidth && currentGrid[i2][j2] === occupiedSeat) {
                sum++;
            }
        }
    }
    return sum;
}

function copyArray(array) {
    return JSON.parse(JSON.stringify(array));
}

function solve(functionRef, count) {
    let currentGrid = copyArray(grid);
    let stable = false;
    while (!stable) {
        const newGrid = copyArray(currentGrid);
        stable = true;
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                if (currentGrid[i][j] === emptySeat) {
                    if (functionRef(i, j, currentGrid) === 0) {
                        newGrid[i][j] = occupiedSeat;
                        stable = false;
                    }
                } else if (currentGrid[i][j] === occupiedSeat) {
                    if (functionRef(i, j, currentGrid) >= count) {
                        newGrid[i][j] = emptySeat;
                        stable = false;
                    }
                }
            }
        }
        currentGrid = newGrid;
    }
    return currentGrid.flat(2).filter(l => l === occupiedSeat).length;
}

function part1() {
    return solve(getOccupiedNeighborSeatCount, 4);
}
console.log(part1());

function part2() {
    return solve(getVisibleNeighborSeatCount, 5);
}
console.log(part2());