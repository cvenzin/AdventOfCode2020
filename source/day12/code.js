import {
    getLines
} from '../modules/input.js';

const instructions = getLines('day12').map(l => l.split('')).map(l => [l.shift(), parseInt(l.join(''))]);
const ship = {
    direction: 0,
    position: [0, 0],
    wayPoint: [0, 0]
};
const directions = {
    0: 'N',
    90: 'E',
    180: 'S',
    270: 'W'
};

function updateShipPosition(instruction) {
    switch (instruction[0]) {
        case 'N':
            ship.position[1] += instruction[1];
            break;
        case 'S':
            ship.position[1] -= instruction[1];
            break;
        case 'E':
            ship.position[0] += instruction[1];
            break;
        case 'W':
            ship.position[0] -= instruction[1];
            break;
        case 'L':
            ship.direction = (ship.direction - instruction[1]) % 360;
            break;
        case 'R':
            ship.direction = (ship.direction + instruction[1]) % 360;
            break;
        case 'F':
            updateShipPosition([directions[ship.direction], instruction[1]]);
            break;
    }
    if (ship.direction < 0) {
        ship.direction = 360 + ship.direction;
    }
}

function part1() {
    ship.direction = 90;
    ship.position = [0, 0];
    instructions.forEach(instruction => {
        updateShipPosition(instruction);
    });
    return Math.abs(ship.position[0]) + Math.abs(ship.position[1]);
}
console.log(part1());

function getRotatedWayPoint(cx, cy, x, y, angle) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx - cx, ny - cy];
}

function updateShipAndWayPointPosition(instruction) {
    switch (instruction[0]) {
        case 'N':
            ship.wayPoint[1] += instruction[1];
            break;
        case 'S':
            ship.wayPoint[1] -= instruction[1];
            break;
        case 'E':
            ship.wayPoint[0] += instruction[1];
            break;
        case 'W':
            ship.wayPoint[0] -= instruction[1];
            break;
        case 'L':
            ship.wayPoint = getRotatedWayPoint(ship.position[0], ship.position[1], ship.position[0] + ship.wayPoint[0], ship.position[1] + ship.wayPoint[1], -instruction[1]);
            break;
        case 'R':
            ship.wayPoint = getRotatedWayPoint(ship.position[0], ship.position[1], ship.position[0] + ship.wayPoint[0], ship.position[1] + ship.wayPoint[1], instruction[1]);
            break;
        case 'F':
            ship.position[0] += ship.wayPoint[0] * instruction[1];
            ship.position[1] += ship.wayPoint[1] * instruction[1];
            break;
    }
}

function part2() {
    ship.position = [0, 0];
    ship.wayPoint = [10, 1];
    instructions.forEach(instruction => {
        updateShipAndWayPointPosition(instruction);
    });
    return Math.abs(ship.position[0]) + Math.abs(ship.position[1]);
}
console.log(part2());