import {
    getLines
} from '../modules/input.js'

const lines = getLines('day04');
const passports = [];

let passport = '';
lines.forEach(line => {
    if (line && !passport) {
        passport = line;
    } else if (line) {
        passport += ` ${line}`;
    } else {
        passports.push(passport);
        passport = '';
    }
});

function hasAllRequiredFields(passport) {
    if (passport.indexOf('byr:') > -1 &&
        passport.indexOf('iyr:') > -1 &&
        passport.indexOf('eyr:') > -1 &&
        passport.indexOf('hgt:') > -1 &&
        passport.indexOf('hcl:') > -1 &&
        passport.indexOf('ecl:') > -1 &&
        passport.indexOf('pid:') > -1) {
        return true;
    }
}

function part1() {
    return passports.filter(p => hasAllRequiredFields(p)).length;
}
console.log(part1());

function isPidValid(pid) {
    if (pid && pid.length === 9) {
        for (let char of pid) {
            if (!(char >= '0' && char <= '9')) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function isHclValid(hcl) {
    const regex = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', 'i');
    return hcl && hcl.match(regex);
}

function isHgtValid(hgt) {
    if (hgt) {
        const height = parseInt(hgt);
        if (hgt.endsWith('cm') && height >= 150 && height <= 193 || hgt.endsWith('in') && height >= 59 && height <= 76) {
            return true;
        }
    }
    return false;
}

function part2() {
    let validPassports = 0;
    const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    passports.forEach(passport => {
        const keyValues = passport.split(' ');
        const fields = {};
        keyValues.forEach(kv => {
            const keyAndValue = kv.split(':');
            const key = keyAndValue[0];
            const value = keyAndValue[1];
            fields[key] = value;
        });
        const byr = Number(fields['byr']);
        const iyr = Number(fields['iyr']);
        const eyr = Number(fields['eyr']);
        const hgt = fields['hgt'];
        const hcl = fields['hcl'];
        const ecl = fields['ecl'];
        const pid = fields['pid'];

        if (!hasAllRequiredFields(passport)) {
            return;
        }
        if (!(byr >= 1920 && byr <= 2002)) {
            return;
        }
        if (!(iyr >= 2010 && iyr <= 2020)) {
            return;
        }
        if (!(eyr >= 2020 && eyr <= 2030)) {
            return;
        }
        if (!isHgtValid(hgt)) {
            return;
        }
        if (!isHclValid(hcl)) {
            return;
        }
        if (!validEyeColors.find(color => color === ecl)) {
            return;
        }
        if (!isPidValid(pid)) {
            return;
        }
        validPassports++;
    });
    return validPassports;
}
console.log(part2());