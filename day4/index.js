const { getInput } = require("../common/helpers");
const input = getInput(__dirname);

const sections = input.map(e => e.split(/,|-/g).map(Number));
const pairs = sections.filter(isContained);
const overlaping= sections.filter(isOverlaping);

console.log(pairs.length, overlaping.length);

function isContained([s0, s1, s2, s3]) {
    return (s0 >= s2 && s1 <= s3) || (s0 <= s2 && s1 >= s3);
}

function isOverlaping([s0, s1, s2, s3]) {
    return s0 >= s2 && s0 <= s3 || s1 >= s2 && s1 <= s3 ||
        s2 >= s0 && s2 <= s1 || s3 >= s0 && s3 <= s1;
}

