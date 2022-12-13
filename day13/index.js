const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs.readFileSync(inputPath, "utf-8")
    .split("\n\n") // break with empty line to get pairs
    .map(pair => pair
        .split("\n") // split pairs per line
        .filter(line => line)
        .map((line, i) => getArray(line, i)), // parse data
    )
    .filter(e => e);


const part1 = input.reduce((sum, pair, i) => {
    // for each pair count if order is right
    const isRight = compare(...pair);

    // sum indexes of ordered pairs (index of pair 1 is 1)
    return isRight ? sum + i + 1 : sum;
}, 0);


const input2 = fs.readFileSync(inputPath, "utf-8")
    .split("\n") // split into lines, not pairs
    .filter(e => e) // remove empty lines
    .map(line => getArray(line));

const dividerPackets = [[[2]], [[6]]];
input2.push(...dividerPackets); // add divider packets anywhere

const input2Sorted = input2.sort((a,b) => compare(a,b) ? -1 : 1); // sort all lines using compare
const part2 = (input2Sorted.indexOf(dividerPackets[0]) + 1) * (input2Sorted.indexOf(dividerPackets[1]) + 1); // find multiplier of key

console.log({ part1, part2 });



function compare(a,b) {
    console.log(`compare ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
    if (typeof a === "number" && typeof b === "number") {
        return a < b ?
            true :
            a > b ?
                false :
                undefined;
    } else if (typeof a === "number" && typeof b === "object") {
        return compare([a], b);
    } else if (typeof a === "object" && typeof b === "number") {
        return compare(a, [b]);
    } else {
        for (let i=0; i<a.length; i++) {
            if (b[i] === undefined) {
                console.log("Right side ran out of items");
                return false; }

            const isRight = compare(a[i], b[i]);

            if (isRight !== undefined) {
                return isRight;
            }
        }

        if (a.length < b.length) {
            console.log("Left side ran out of items");
            return true;
        }
    }
}

function getArray(array, i) {
    return JSON.parse(`{"data": ${array} }`).data;
}
