// imports
const fs = require("fs");
const path = require("path");

// parse input
const inputPath = path.resolve(__dirname, "./input");
const input = fs.readFileSync(inputPath, "utf-8");
const inputArray = input.split("\n").map((n) => (n ? Number(n) : null));

// reduce
const caloriesPerElf = inputArray.reduce(
    (prev, curr) => {
        if (curr) {
            prev.sum += curr;
        } else {
            prev.elves.push(prev.sum);
            prev.sum = 0;
        }

        return prev;
    },
    { sum: 0, elves: [] }
).elves;

const caloriesSortedDesc = caloriesPerElf.sort((a, b) => (a < b ? 1 : -1));

const maxCalories = caloriesSortedDesc[0];
const max3Calories = caloriesSortedDesc
    .slice(0, 3)
    .reduce((prev, curr) => prev + curr, 0);

console.log({ maxCalories, max3Calories });
