const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(e => e);


let commonFactor = 1;
const data = input.reduce((data, line) => {
    let monkey;
    if (line.includes("Monkey")) {
        monkey = { actions: 0 };
    } else {
        monkey = data.pop();
    }

    if (line.includes("Operation")) {
        const [operator, value] = line.split(" ").slice(-2);
        monkey.operator = operator;
        monkey.val = value;
    }

    if (line.includes("Starting")) {
        monkey.items = line.match(/\d+/g).map(Number);
    }

    if (line.includes("Test")) {
        const test = line.match(/\d+/g).map(Number)[0];
        monkey.test = test;
        commonFactor *= test;
    }

    if (line.includes("true")) {
        monkey.t = line.match(/\d+/g).map(Number)[0];
    }

    if (line.includes("false")) {
        monkey.f = line.match(/\d+/g).map(Number)[0];
    }

    data.push(monkey);
    return data;
}, []);

function calculate(division, rounds) {
    const dataCopy = JSON.parse(JSON.stringify(data));

    for (let i=0; i<rounds; i++) {
        dataCopy.forEach(monkey => {
            while (monkey.items.length) {
                const item = monkey.items.shift();
                const value = Number(monkey.val) || item;

                const worryLevel = monkey.operator === "+" ?
                    item + value :
                    item * value;

                const boredLevel = Math.floor(worryLevel / division) % commonFactor;

                if (!(boredLevel % monkey.test)) {
                    dataCopy[monkey.t].items.push(boredLevel);
                } else {
                    dataCopy[monkey.f].items.push(boredLevel);
                }

                monkey.actions++;
            }
        });
    }

    return dataCopy
        .map(monkey => monkey.actions)
        .sort((a, b) => a < b ? 1 : -1)
        .slice(0, 2)
        .reduce((a, b) => a * b);
}

const part1 = calculate(3, 20);
const part2 = calculate(1, 10000);

console.log({ part1, part2 });




