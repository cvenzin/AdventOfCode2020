import {
    getLines
} from '../modules/input.js';

const lines = getLines('day19');
const inputRules = lines.slice(0, lines.findIndex(l => l === ''));
const inputMessages = lines.slice(lines.findIndex(l => l === '') + 1, lines.length);

const ruleRegexes = new Map();
const ruleDefinitions = new Map();
inputRules.forEach(rule => {
    const split = rule.split(': ');
    const ruleNumber = split[0];
    ruleDefinitions.set(ruleNumber, split[1]);
});

function computeRegexForRules(value) {
    if (ruleRegexes.has(value)) {
        return ruleRegexes.get(value);
    }
    let result;
    if (value[0] === '"') { // a or b
        result = value[1];
    } else if (/\|/.test(value)) {
        const split = value.split(' | ');
        result = `(${computeRegexForRules(split[0])}|${computeRegexForRules(split[1])})`;
    } else {
        const keys = value.split(' ');
        result = keys.map(key => computeRegexForRules(ruleDefinitions.get(key))).join('');
    }
    ruleRegexes.set(value, result);
    return result;
}

function part1() {
    computeRegexForRules(ruleDefinitions.get('0'));
    const firstRule = new RegExp(`^${ruleRegexes.get(ruleDefinitions.get('0'))}$`);
    return inputMessages.filter(message => firstRule.test(message)).length;
}
console.log(part1());

function part2() {
    ruleDefinitions.set('8', '42 | 42 8');
    ruleDefinitions.set('11', '42 31 | 42 11 31');

    computeRegexForRules(ruleDefinitions.get('42'));
    computeRegexForRules(ruleDefinitions.get('31'));

    const rule = new RegExp(`^(?<grp42>(${ruleRegexes.get(ruleDefinitions.get('42'))})+)(?<grp31>(${ruleRegexes.get(ruleDefinitions.get('31'))})+)$`);

    const regexGrp42 = new RegExp(ruleRegexes.get(ruleDefinitions.get('42')), 'g');
    const regexGrp31 = new RegExp(ruleRegexes.get(ruleDefinitions.get('31')), 'g');
    return inputMessages.filter(message => {
        const matches = rule.exec(message);
        if (matches) {
            const matches42 = matches.groups.grp42.match(regexGrp42).length;
            const matches31 = matches.groups.grp31.match(regexGrp31).length;
            return matches42 > matches31;
        }
    }).length;
}
console.log(part2());