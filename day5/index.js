const { getInput } = require("../common/helpers");
const input = getInput(__dirname);

let lanes = Array(Math.ceil(input[0].length / 4))
    .fill(0)
    .map(() => []);

input
    .filter(line => line.startsWith("["))
    .map(line => {
        return [...line.matchAll(/\w/g)].forEach(e => {
            return lanes[(e.index - 1) / 4].unshift(e[0]);
        });
    });


const part1 = JSON.parse(JSON.stringify(lanes));
const part2 = JSON.parse(JSON.stringify(lanes));

input.filter(line => line.startsWith("move"))
    .map(line => line.match(/\d+/g).map(Number))
    .forEach(([numberOfItems, from, to]) => {
        const crates1 = part1[from - 1].splice(-numberOfItems, numberOfItems);
        part1[to - 1].push(...crates1.reverse());

        const crates2 = part2[from - 1].splice(-numberOfItems, numberOfItems);
        part2[to - 1].push(...crates2);
    });

function topCrates(lanes) {
    return lanes.map(e => e[e.length - 1].replace(/\W/g, "")).join("");
}

console.log("CrateMover 9000:", topCrates(part1));
console.log("CrateMover 9001:", topCrates(part2));
