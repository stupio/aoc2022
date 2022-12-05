const { getInput } = require("../common/helpers");
const input = getInput(__dirname);

let lanes = Array(Math.ceil(input[0].length / 4))
    .fill(null)
    .map(_ => []);

while (!input[0].replace(/ /g, "").startsWith("123")) {
    const regex = /\[[A-Z]\]/g;
    const line = input.shift().matchAll(regex);

    let box = line.next();
    while (!box.done) {
        const lane = box.value.index/4;
        lanes[lane].unshift(box.value[0]);
        box = line.next();
    }
}

input.splice(0,1); // removes 12345 line

while (input.length) {
    const [numberOfItems, from, to] = input.shift().match(/\d+/g).map(Number);

    const crates = lanes[from - 1].splice(-numberOfItems, numberOfItems);
    lanes[to - 1].push(...crates);
    console.log([numberOfItems, from, to], crates, lanes[to - 1]);

    // break;
}

const result = lanes.map(e => e[e.length - 1].replace(/\W/g, "")).join("");

console.log({ result });
