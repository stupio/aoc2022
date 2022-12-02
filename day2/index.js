const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// imports
const fs = require("fs");
const path = require("path");

// parse input
const inputPath = path.resolve(__dirname, "./input");
const input = fs.readFileSync(inputPath, "utf-8");
const inputArray = input.split("\n").filter((e) => e);

const winMap = {
    [ROCK]: PAPER,
    [PAPER]: SCISSORS,
    [SCISSORS]: ROCK,
};

const looseMap = {
    [ROCK]: SCISSORS,
    [PAPER]: ROCK,
    [SCISSORS]: PAPER,
};

const pointMap = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
};

const translatedArray = inputArray.map(translateRound1);
const plannedRoundsArray = inputArray.map(translateRound2);

const points = translatedArray.reduce((previous, current) => {
    return previous + countPoints(current);
}, 0);

const plannedPoints = plannedRoundsArray.reduce((previous, current) => {
    return previous + countPoints(current);
}, 0);

console.log({ points, plannedPoints });

// round is 'rock paper'
function countPoints(round) {
    const [elf, me] = round.split(" ");

    if (me === elf) {
        return 3 + pointMap[me];
    } else if (me === winMap[elf]) {
        return 6 + pointMap[me];
    } else {
        return pointMap[me];
    }
}

// round is 'A X'
function translateRound1(round) {
    return round
        .replace(/A|X/g, ROCK)
        .replace(/B|Y/g, PAPER)
        .replace(/C|Z/g, SCISSORS);
}

// round is 'rock X'
function translateRound2(round) {
    const [elf, me] = round.split(" ");

    const translatedElf = elf
        .replace(/A/g, ROCK)
        .replace(/B/g, PAPER)
        .replace(/C/g, SCISSORS);

    let translatedMe;

    if (me === "Z") {
        translatedMe = winMap[translatedElf];
    } else if (me === "Y") {
        translatedMe = translatedElf;
    } else {
        translatedMe = looseMap[translatedElf];
    }

    return [translatedElf, translatedMe].join(" ");
}
