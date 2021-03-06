import {
    getLines
} from '../modules/input.js';

const lines = getLines('day07');

const myBagName = 'shiny gold';
const allBags = [];
lines.forEach(line => {
    const bagName = line.split('bags')[0].trim();
    let bag = allBags.find(bag => bag.name === bagName);
    if (!bag) {
        bag = {
            name: bagName,
            childs: [],
            parents: []
        };
        allBags.push(bag);
    }
    const containedBagsDefinitions = line.split('contain')[1].split(',');
    containedBagsDefinitions.forEach(definition => {
        const trimmedDefinition = definition.trim();
        const count = parseInt(trimmedDefinition);
        const parts = trimmedDefinition.split(' ');
        const childBagName = `${parts[1]} ${parts[2]}`;
        let childBag = allBags.find(bag => bag.name === childBagName);
        if (!childBag) {
            childBag = {
                name: childBagName,
                childs: [],
                parents: [bag]
            };
            allBags.push(childBag);
        } else if (!childBag.parents.find(p => p.name === bagName)) {
            childBag.parents.push(bag);
        }
        for (let i = 0; i < count; i++) {
            bag.childs.push(childBag);
        }
    });
});
const myBag = allBags.find(bag => bag.name === myBagName);

function getParentBagNames(bags) {
    let bagNames = bags.map(bag => bag.name);
    bags.forEach(bag => {
        bagNames = bagNames.concat(getParentBagNames(bag.parents));
    });
    return [...new Set(bagNames)];
}

function part1() {
    const bagsDirectlyContainingMyBag = allBags.filter(bag => bag.childs.includes(myBag));
    return getParentBagNames(bagsDirectlyContainingMyBag).length;
}
console.log(part1());


function getChildBagCount(bags) {
    let count = bags.map(bag => bag.childs.length).reduce((a, b) => a + b, 0);
    bags.forEach(bag => {
        count += getChildBagCount(bag.childs);
    });
    return count;
}

function part2() {
    return getChildBagCount([myBag]);
}
console.log(part2());