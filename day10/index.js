const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .filter(e => e);

let val = 1;
let sum = 0;

const cycles = input.reduce((c, line) => {
    c.push(val);

    if (line.startsWith("addx")) {
        c.push(val += Number(line.split(" ")[1]));
    }

    return c;
}, [1]);


for (let i=20; i<cycles.length; i+=40){
    sum += cycles[i-1] * i;
}

const crt = cycles.reduce((c, val, i) => {
    const sprite = val % 40;
    const pixel = i % 40 + 1;

    if (pixel >= sprite && pixel <= sprite+2) {
        c += "\u2588";
    } else {
        c += " ";
    }

    if(pixel === 40) {
        c += "\n";
    }

    return c;
}, "\n");

console.log({ part1: sum }, crt);
