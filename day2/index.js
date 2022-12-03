const { getInput, sum } = require("../common/helpers");
const input = getInput(__dirname);

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

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

const points = input
    .map(translateRound1)
    .map(countPoints)
    .reduce(sum);

const plannedPoints = input
    .map(translateRound2)
    .map(countPoints)
    .reduce(sum);

console.log({ points, plannedPoints });

// round is 'rock paper'
function countPoints(round) {
    const [elf, me] = round.split(" ");

    if (me === elf) { // draw
        return 3 + pointMap[me];
    } else if (me === winMap[elf]) { // win
        return 6 + pointMap[me];
    } else { // loose
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

function translateRound2(round) {
    const [elf, me] = round.split(" ");

    const translatedElf = elf
        .replace(/A/g, ROCK)
        .replace(/B/g, PAPER)
        .replace(/C/g, SCISSORS);

    let translatedMe;

    if (me === "Z") { // win
        translatedMe = winMap[translatedElf];
    } else if (me === "Y") { // draw
        translatedMe = translatedElf;
    } else { // loose
        translatedMe = looseMap[translatedElf];
    }

    return [translatedElf, translatedMe].join(" ");
}
