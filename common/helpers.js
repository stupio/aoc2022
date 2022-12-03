const fs = require("fs");
const path = require("path");

module.exports = {
    getInput,
    sum,
};

function getInput(dirname, removeEmptyLines = true) {
    const inputPath = path.resolve(dirname, "./input.txt");
    const input = fs.readFileSync(inputPath, "utf-8").split("\n");

    return removeEmptyLines ? input.filter(e => e) : input;
}

function sum(a,b) {
    return a+b;
}