import {
    getLines
} from '../modules/input.js';

const lines = getLines('day21');
const allergens = new Map();
const ingredientsCount = new Map();

lines.forEach(line => {
    const ingredientList = line.split(' (')[0].split(' ');
    ingredientList.forEach(ingredient => {
        let count = 0;
        if (ingredientsCount.has(ingredient)) {
            count = ingredientsCount.get(ingredient);
        }
        ingredientsCount.set(ingredient, ++count);
    });
    const allergenList = line.split('(contains ')[1].replace(')', '').split(', ');
    allergenList.forEach(allergen => {
        const a = allergens.get(allergen) || [];
        a.push(ingredientList);
        allergens.set(allergen, a);
    });
});

function removeValueFromLists(value) {
    for (const ingredientList of allergens.values()) {
        if (ingredientList[0].length === 1) {
            continue;
        }
        for (let i = 0; i < ingredientList.length; i++) {
            for (let j = 0; j < ingredientList[i].length; j++) {
                ingredientList[i] = ingredientList[i].filter(ingredient => ingredient !== value);
            }
        }
    }
}

function notFinished() {
    for (const ingredientList of allergens.values()) {
        if (ingredientList.length > 1) {
            return true;
        }
        if (ingredientList[0].length > 1) {
            return true;
        }
    }
    return false;
}

while (notFinished()) {
    for (const [allergenName, ingredientList] of allergens.entries()) {
        const map = new Map();
        for (let i = 0; i < ingredientList.length; i++) {
            for (let j = 0; j < ingredientList[i].length; j++) {
                const ingredient = ingredientList[i][j];
                if (ingredientList.every(l => l.includes(ingredient))) {
                    map.set(ingredient);
                }
            }
        }
        if (map.size === 1) {
            const value = map.entries().next().value[0];
            allergens.set(allergenName, [
                [value]
            ]);
            removeValueFromLists(value);
        }
    }
}

function part1() {
    const ingredients = [];
    for (const ingredientList of allergens.values()) {
        ingredients.push(ingredientList[0][0]);
    }
    let sum = 0;
    for (const [ingredient, count] of ingredientsCount.entries()) {
        if (!ingredients.includes(ingredient)) {
            sum += count;
        }
    }
    return sum;
}
console.log(part1());

function part2() {
    const t = [];
    for (const [allergen, ingredientList] of allergens.entries()) {
        t.push({
            allergen,
            ingredient: ingredientList[0][0]
        });
    }
    return t.sort((a, b) => a.allergen.localeCompare(b.allergen)).map(a => a.ingredient).join(',');
}
console.log(part2());