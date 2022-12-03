const fs = require("fs");
const path = require("path");

module.exports = {
    getInput,
    sum,
};

function getInput(dirname) {
    const inputPath = path.resolve(dirname, "./input.txt");
    return fs.readFileSync(inputPath, "utf-8")
        .split("\n")
        .filter(e => e);
}

function sum(a,b) {
    return a+b;
}