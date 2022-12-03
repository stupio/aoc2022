const { getInput, sum } = require('../common/helpers');

const input = getInput(__dirname);

// part one
const wrongItems = input
    .map(splitCompartments)
    .map(findWrongItem)
    .map(markPriority)
    .reduce(sum, 0);

// part two
const badges = getGroups(input)
    .map(findBadge)
    .map(markPriority)
    .reduce(sum, 0);

// results
console.log({ wrongItems, badges });


function splitCompartments(items) {
    const temp = items.split('');
    const first = temp.splice(0, temp.length / 2);
    const second = temp;

    return [first, second];
}

function findWrongItem(compartments) {
    const [first, second] = compartments.map(e => new Set(e));

    for(let item of second) {
        if (first.has(item)) {
            return item;
        }
    }
}

function markPriority(item) {
    let points = item.charCodeAt(0);

    return item > "Z" ?
        points - 96 :
        points - 38;
}

function getGroups(input) {
    const temp = [...input];
    const groups = [];

    while (temp.length) {
        groups.push(temp.splice(0,3));
    }

    return groups;
}

function findBadge(group) {
    const [first, second, third] = group.map(e => new Set(e.split('')));

    for(let item of first) {
        if (second.has(item) && third.has(item)) {
            return item;
        }
    }
}