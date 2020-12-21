import {
    getLines
} from '../modules/input.js';

const lines = getLines('day20');
let tilesSolutionPart1;

function getTiles() {
    const tiles = new Map();
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0] === 'T') {
            const id = Number(lines[i].match(/\d+/g));
            const tile = [];
            for (let k = i + 1; k < i + 11; k++) {
                const row = [];
                for (let j = 0; j < 10; j++) {
                    row.push(lines[k][j]);
                }
                tile.push(row);
            }
            i += 10;
            tiles.set(id, [tile]);
        }
    }
    return tiles;
}

function rotateTile(tile) {
    const rotatedTile = [];
    const n = tile.length;
    for (let i = 0; i < n; i++) {
        rotatedTile[i] = [];
        for (let j = 0; j < n; j++) {
            rotatedTile[i][j] = tile[n - j - 1][i];
        }
    }
    return rotatedTile;
}

function getRotations(tile) {
    const rotations = [];
    const a = rotateTile(tile);
    const b = rotateTile(a);
    const c = rotateTile(b);
    rotations.push(a);
    rotations.push(b);
    rotations.push(c);
    return rotations;
}

function flipTile(tile) {
    const flippedTile = [];
    const n = tile.length;
    for (let i = 0; i < n; i++) {
        flippedTile[i] = [];
        for (let j = 0; j < n; j++) {
            flippedTile[i][j] = tile[i][n - j - 1];
        }
    }
    return flippedTile;
}

function north(tile, tiles) {
    const northBound = tile[0].toString();
    const resultTiles = [];
    for (const [id, solutions] of tiles.entries()) {
        solutions.forEach(solution => {
            if (solution[solution.length - 1].toString() === northBound.toString()) {
                resultTiles.push([id, solution]);
            }
        });
    }
    return resultTiles;
}

function east(tile, tiles) {
    const eastBound = tile.map(t => t[t.length - 1]).toString();
    const resultTiles = [];
    for (const [id, solutions] of tiles.entries()) {
        solutions.forEach(solution => {
            if (solution.map(t => t[0]).toString() === eastBound.toString()) {
                resultTiles.push([id, solution]);
            }
        });
    }
    return resultTiles;
}

function south(tile, tiles) {
    const southBound = tile[tile.length - 1].toString();
    const resultTiles = [];
    for (const [id, solutions] of tiles.entries()) {
        solutions.forEach(solution => {
            if (solution[0].toString() === southBound.toString()) {
                resultTiles.push([id, solution]);
            }
        });
    }
    return resultTiles;
}

function west(tile, tiles) {
    const westBound = tile.map(t => t[0]).toString();
    const resultTiles = [];
    for (const [id, solutions] of tiles.entries()) {
        solutions.forEach(solution => {
            if (solution.map(t => t[t.length - 1]).toString() === westBound.toString()) {
                resultTiles.push([id, solution]);
            }
        });
    }
    return resultTiles;
}

function part1() {
    const tiles = getTiles();
    for (const solutions of tiles.values()) {
        const rotations = getRotations(solutions[0]);
        const flippedTile = flipTile(solutions[0]);
        const flippedRotations = getRotations(flippedTile);
        const newSolutions = rotations.concat([flippedTile]).concat(flippedRotations);
        for (const newSolution of newSolutions) {
            solutions.push(newSolution);
        }
    }

    const firstTile = tiles.entries().next().value;
    const grid = new Map();
    grid.set(`0,0`, {
        id: firstTile[0],
        tile: firstTile[1][0]
    });
    tiles.delete(firstTile[0]);
    while (tiles.size > 0) {
        for (const gridEntry of grid.entries()) {
            const currentTile = gridEntry[1].tile;
            const x = Number(gridEntry[0].split(',')[0]);
            const y = Number(gridEntry[0].split(',')[1]);
            let resultTiles = north(currentTile, tiles);
            if (resultTiles.length === 1) {
                grid.set(`${x},${y + 1}`, {
                    id: resultTiles[0][0],
                    tile: resultTiles[0][1]
                });
                tiles.delete(resultTiles[0][0]);
            }
            resultTiles = east(currentTile, tiles);
            if (resultTiles.length === 1) {
                grid.set(`${x + 1},${y}`, {
                    id: resultTiles[0][0],
                    tile: resultTiles[0][1]
                });
                tiles.delete(resultTiles[0][0]);
            }
            resultTiles = south(currentTile, tiles);
            if (resultTiles.length === 1) {
                grid.set(`${x},${y - 1}`, {
                    id: resultTiles[0][0],
                    tile: resultTiles[0][1]
                });
                tiles.delete(resultTiles[0][0]);
            }
            resultTiles = west(currentTile, tiles);
            if (resultTiles.length === 1) {
                grid.set(`${x - 1},${y}`, {
                    id: resultTiles[0][0],
                    tile: resultTiles[0][1]
                });
                tiles.delete(resultTiles[0][0]);
            }
        }
    }

    tilesSolutionPart1 = grid;

    const objArr = [];
    for (const gridEntry of grid.entries()) {
        const x = Number(gridEntry[0].split(',')[0]);
        const y = Number(gridEntry[0].split(',')[1]);
        const obj = {
            x,
            y,
            id: gridEntry[1].id
        };
        objArr.push(obj);
    }
    const r = objArr.sort((a, b) => a.x - b.x);
    const length = Math.sqrt(grid.size);
    const r1 = r.slice(0, length);
    const r2 = r.slice(r.length - length, r.length);
    r1.sort((a, b) => a.y - b.y);
    r2.sort((a, b) => a.y - b.y);

    return r1[0].id * r2[0].id * r1[r1.length - 1].id * r2[r2.length - 1].id;
}
console.log(part1());

// function logGrid(grid) {
//     for (let i = 0; i < grid.length; i++) {
//         console.log(grid[i].join(''));
//     }
//     console.log('------------------------');
// }

const a = '                  # ';
const b = '#    ##    ##    ###';
const c = ' #  #  #  #  #  #   ';
const indexes = [];
for (let i = 0; i < a.length; i++) {
    if (a[i] === '#') {
        indexes.push([i, -1]);
    }
}
for (let i = 0; i < b.length; i++) {
    if (b[i] === '#') {
        indexes.push([i, 0]);
    }
}
for (let i = 0; i < c.length; i++) {
    if (c[i] === '#') {
        indexes.push([i, 1]);
    }
}

function findMonsters(grid) {
    let sum = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let invalid = false;
            indexes.forEach(index => {
                const x = grid[i + index[0]];
                if (!x) {
                    invalid = true;
                } else if (x[j + index[1]] !== '#' && x[j + index[1]] !== 'o') {
                    invalid = true;
                }
            });
            if (!invalid) {
                sum++;
                indexes.forEach(index => {
                    const x = grid[i + index[0]];
                    x[j + index[1]] = 'o';
                });
            }
        }
    }

    return sum;

}

function getMonsterGrid(bigGrid) {
    let count = 0;
    count += findMonsters(bigGrid);
    if (count > 0) {
        return bigGrid;
    }
    for (const rotation of getRotations(bigGrid)) {
        count += findMonsters(rotation);
        if (count > 0) {
            return rotation;
        }
    }
    const flippedGrid = flipTile(bigGrid);
    count += findMonsters(flippedGrid);
    if (count > 0) {
        return flippedGrid;
    }
    for (const rotation of getRotations(flippedGrid)) {
        count += findMonsters(rotation);
        if (count > 0) {
            return rotation;
        }
    }
    return null;
}

function part2() {
    const keys = [...tilesSolutionPart1.keys()];
    const minX = Math.min(...keys.map(s => Number(s.split(',')[0])));
    const minY = Math.min(...keys.map(s => Number(s.split(',')[1])));
    let xOffset = 0;
    let yOffset = 0;
    if (minX < 0) {
        xOffset = Math.abs(minX);
    }
    if (minY < 0) {
        yOffset = Math.abs(minY);
    }

    // cut off borders
    const grid = [];
    for (const entry of tilesSolutionPart1.entries()) {
        const withOutBorders = [];
        const x = Number(entry[0].split(',')[0]) + xOffset;
        const y = Number(entry[0].split(',')[1]) + yOffset;
        for (let i = 1; i < entry[1].tile.length - 1; i++) {
            withOutBorders[i - 1] = [];
            for (let j = 1; j < entry[1].tile.length - 1; j++) {
                withOutBorders[i - 1][j - 1] = entry[1].tile[i][j];
            }
        }
        if (!grid[y]) {
            grid[y] = [];
        }
        grid[y][x] = withOutBorders;
    }

    // make one big grid
    const bigGrid = [];
    for (let i = 0; i < grid.length; i++) {
        const lines = [];
        for (let j = 0; j < grid[i].length; j++) {
            for (let k = 0; k < grid[i][j].length; k++) {
                if (!lines[k]) {
                    lines[k] = [];
                }
                lines[k] = lines[k].concat(grid[i][j][k]);
            }
        }
        for (const line of lines.reverse()) {
            bigGrid.unshift(line);
        }
    }

    // find sea roughness
    let sum = 0;
    const monsterGrid = getMonsterGrid(bigGrid);
    for (let i = 0; i < monsterGrid.length; i++) {
        for (let j = 0; j < monsterGrid.length; j++) {
            if (monsterGrid[i][j] === '#') {
                sum++;
            }
        }
    }
    return sum;
}
console.log(part2());