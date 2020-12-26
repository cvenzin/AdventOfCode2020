import {
    getLines
} from '../modules/input.js';

const lines = getLines('day24');

const list = [];
const validDirections = ['e', 'se', 'sw', 'w', 'nw', 'ne'];
lines.forEach(line => {
    const directions = [];
    for (let i = 0; i < line.length; i++) {
        const v = line[i] + line[i + 1];
        if (validDirections.includes(v)) {
            directions.push(v);
            i++;
        } else {
            directions.push(line[i]);
        }
    }
    list.push(directions);
});

function getInitalGrid() {
    const grid = new Set();
    for (const l of list) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (const direction of l) {
            switch (direction) {
                case 'e':
                    x++;
                    z--;
                    break;
                case 'se':
                    y++;
                    z--;
                    break;
                case 'sw':
                    x--;
                    y++;
                    break;
                case 'w':
                    x--;
                    z++;
                    break;
                case 'nw':
                    y--;
                    z++;
                    break;
                case 'ne':
                    x++;
                    y--;
                    break;
            }
        }
        const key = `${x},${y},${z}`;
        if (!grid.has(key)) {
            grid.add(key);
        } else {
            grid.delete(key);
        }
    }
    return grid;
}

function part1() {
    return getInitalGrid().size;
}
console.log(part1());


function getBlackNeighborsCount(x, y, z, grid) {
    let count = 0;
    if (grid.has(`${x+1},${y},${z-1}`)) {
        count++;
    }
    if (grid.has(`${x},${y+1},${z-1}`)) {
        count++;
    }
    if (grid.has(`${x-1},${y+1},${z}`)) {
        count++;
    }
    if (grid.has(`${x-1},${y},${z+1}`)) {
        count++;
    }
    if (grid.has(`${x},${y-1},${z+1}`)) {
        count++;
    }
    if (grid.has(`${x+1},${y-1},${z}`)) {
        count++;
    }
    return count;
}

function getWhiteNeighbors(x, y, z, grid) {
    const whiteNeighbors = [];
    if (!grid.has(`${x+1},${y},${z-1}`)) {
        whiteNeighbors.push([x + 1, y, z - 1]);
    }
    if (!grid.has(`${x},${y+1},${z-1}`)) {
        whiteNeighbors.push([x, y + 1, z - 1]);
    }
    if (!grid.has(`${x-1},${y+1},${z}`)) {
        whiteNeighbors.push([x - 1, y + 1, z]);
    }
    if (!grid.has(`${x-1},${y},${z+1}`)) {
        whiteNeighbors.push([x - 1, y, z + 1]);
    }
    if (!grid.has(`${x},${y-1},${z+1}`)) {
        whiteNeighbors.push([x, y - 1, z + 1]);
    }
    if (!grid.has(`${x+1},${y-1},${z}`)) {
        whiteNeighbors.push([x + 1, y - 1, z]);
    }
    return whiteNeighbors;
}

function part2() {
    let grid = getInitalGrid();
    for (let i = 0; i < 100; i++) {
        const newGrid = new Set(grid);
        for (const coord of grid.keys()) {
            const [x, y, z] = coord.split(',').map(Number);

            const blackNeighborsCount = getBlackNeighborsCount(x, y, z, grid);
            if (blackNeighborsCount === 0 || blackNeighborsCount > 2) {
                newGrid.delete(`${[x, y, z]}`);
            }

            const whiteNeighbors = getWhiteNeighbors(x, y, z, grid);
            for (let j = 0; j < whiteNeighbors.length; j++) {
                const count = getBlackNeighborsCount(...whiteNeighbors[j], grid);
                if (count === 2) {
                    newGrid.add(`${whiteNeighbors[j]}`);
                }
            }
        }
        grid = newGrid;
    }
    return grid.size;
}
console.log(part2());