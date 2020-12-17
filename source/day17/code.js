import {
    getLines
} from '../modules/input.js';

const lines = getLines('day17');

function process1(map, length) {
    const newMap = new Map(map);
    const offset = length % 2 !== 0 ? (length - 1) / 2 : length / 2;
    const maxLength = length - offset;
    for (let z = -offset; z < maxLength; z++) {
        for (let y = -offset; y < maxLength; y++) {
            for (let x = -offset; x < maxLength; x++) {
                let activeNeighbors = 0;
                for (let z1 = -1; z1 < 2; z1++) {
                    for (let y1 = -1; y1 < 2; y1++) {
                        for (let x1 = -1; x1 < 2; x1++) {
                            if (!(x1 === 0 && y1 === 0 && z1 === 0)) {
                                if (map.has(`${z + z1}${ y + y1}${ x + x1}`)) {
                                    activeNeighbors++;
                                }
                            }
                        }
                    }
                }
                const key = `${z}${y}${x}`;
                if (map.has(key) && !(activeNeighbors === 2 || activeNeighbors === 3)) {
                    newMap.delete(key);
                } else if (!map.has(key) && activeNeighbors === 3) {
                    newMap.set(key);
                }
            }
        }
    }
    return newMap;
}

function process2(map, length) {
    const newMap = new Map(map);
    const offset = length % 2 !== 0 ? (length - 1) / 2 : length / 2;
    const maxLength = length - offset;
    for (let w = -offset; w < maxLength; w++) {
        for (let z = -offset; z < maxLength; z++) {
            for (let y = -offset; y < maxLength; y++) {
                for (let x = -offset; x < maxLength; x++) {
                    let activeNeighbors = 0;
                    for (let w1 = -1; w1 < 2; w1++) {
                        for (let z1 = -1; z1 < 2; z1++) {
                            for (let y1 = -1; y1 < 2; y1++) {
                                for (let x1 = -1; x1 < 2; x1++) {
                                    if (!(x1 === 0 && y1 === 0 && z1 === 0 && w1 === 0)) {
                                        if (map.has(`${w + w1}${z + z1}${ y + y1}${ x + x1}`)) {
                                            activeNeighbors++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    const key = `${w}${z}${y}${x}`;
                    if (map.has(key) && !(activeNeighbors === 2 || activeNeighbors === 3)) {
                        newMap.delete(key);
                    } else if (!map.has(key) && activeNeighbors === 3) {
                        newMap.set(key);
                    }
                }
            }
        }
    }
    return newMap;
}

function part1() {
    let map = new Map();
    const offset = lines.length % 2 !== 0 ? (lines.length - 1) / 2 : lines.length / 2;
    for (let y = 0; y < lines.length; y++) {
        const cubes = lines[y].split('');
        for (let x = 0; x < cubes.length; x++) {
            if (cubes[x] === '#') {
                map.set(`0${y-offset}${x-offset}`);
            }
        }
    }

    let length = lines.length;
    for (let i = 0; i < 6; i++) {
        length += 2;
        map = process1(map, length);
    }
    return map.size;
}
console.log(part1());

function part2() {
    let map = new Map();
    const offset = lines.length % 2 !== 0 ? (lines.length - 1) / 2 : lines.length / 2;
    for (let y = 0; y < lines.length; y++) {
        const cubes = lines[y].split('');
        for (let x = 0; x < cubes.length; x++) {
            if (cubes[x] === '#') {
                map.set(`00${y-offset}${x-offset}`);
            }
        }
    }

    let length = lines.length;
    for (let i = 0; i < 6; i++) {
        length += 2;
        map = process2(map, length);
    }
    return map.size;
}
console.log(part2());