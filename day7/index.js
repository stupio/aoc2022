const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs.readFileSync(inputPath, "utf-8").split("\n");

let pwd = [];
let folders = {};

input.forEach((line) => {
    if (line.includes("$ cd")) {
        if (line.includes("..")) {
            pwd.pop();
        } else {
            pwd.push(line.split(" ")[2]);
            folders[pwd.join("/")] = 0;
        }
    }

    if (line.match(/^\d+\s/)) {
        pwd.forEach((_,i) => {
            const fullPath = pwd.slice(0,i+1).join("/");
            folders[fullPath] += Number(line.split(" ")[0]);
        });
    }
});

const requiredSpace = 30000000 - (70000000 - folders["/"]);
const part1 = Object.values(folders).reduce((a,b) => a += (b <= 100000) ? b : 0, 0);
const part2 = Math.min(...Object.values(folders).filter(e => (e >= requiredSpace)));

console.log({ part1, part2 });
