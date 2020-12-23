import {
    getLines
} from '../modules/input.js';

const lines = getLines('day23');
const cups = lines[0].split('').map(Number);
const maxCup = Math.max(...cups);
const minCup = Math.min(...cups);

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
}

LinkedList.prototype.insertAtBeginning = function (data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    return this.head;
}


LinkedList.prototype.getAt = function (index) {
    let counter = 0;
    let node = this.head;
    while (node) {
        if (counter === index) {
            return node;
        }
        counter++;
        node = node.next;
    }
    return null;
}


LinkedList.prototype.getArray = function () {
    if (!this.head) {
        this.head = new Node(data);
        return [];
    }

    let node = this.head;
    const data = [];
    while (node) {
        if (data.includes(node.data)) {
            break;
        }
        data.push(node.data);
        node = node.next;
    }
    return data;
}

function compute2(cupState, iterations, part2) {

    const map = {};
    const list = new LinkedList();

    // build map and linked list
    list.insertAtBeginning(cupState[0]);
    let currentNode = list.getAt(0);
    map[cupState[0]] = currentNode;
    for (let i = 1; i < cupState.length; i++) {
        currentNode.next = new Node(cupState[i]);
        map[cupState[i]] = currentNode.next;
        currentNode = currentNode.next;
    }
    currentNode.next = list.getAt(0);

    // play the game
    let currentCupNode = list.getAt(0);
    for (let i = 0; i < iterations; i++) {
        // console.log(`-- move ${i+1} --`);
        // console.log(`cups (${currentCupNode.data}): ${list.getArray()}`);

        const removedNodes = [currentCupNode.next, currentCupNode.next.next, currentCupNode.next.next.next];
        currentCupNode.next = removedNodes[2].next;

        // console.log(`pickup: ${removedNodes[0].data}, ${removedNodes[1].data}, ${removedNodes[2].data}`);

        // find destination node
        let destinationCup;
        let j = currentCupNode.data;
        const a = removedNodes[0].data;
        const b = removedNodes[1].data;
        const c = removedNodes[2].data;
        while (!destinationCup) {
            j--;
            if (j < minCup) {
                j = maxCup;
            }
            if (a !== j && b !== j && c !== j) {
                destinationCup = map[j];
            }
        }

        // console.log(`destination: ${destinationCup.data}`);

        // insert cups
        const next = destinationCup.next;
        destinationCup.next = removedNodes[0];
        removedNodes[2].next = next;

        // update currentCupNode
        currentCupNode = currentCupNode.next;
        // console.log(``);
    }

    let node = map[1].next;
    if (part2) {
        return node.data * node.next.data;
    }
    let result = '';
    while (node.data !== 1) {
        result += node.data;
        node = node.next;
    }
    return result;
}

function part1() {
    return compute2([...cups], 100);
}
console.time('part1');
console.log(part1());
console.timeEnd('part1');

function part2() {
    const input = [...cups];
    let i = maxCup + 1;
    while (input.length < 1000000) {
        input.push(i++);
    }
    return compute2(input, 10000000, true);
}
console.time('part2');
console.log(part2());
console.timeEnd('part2');