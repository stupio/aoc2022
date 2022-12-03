const { getInput, sum } = require("../common/helpers");
const input = getInput(__dirname, false).map((n) => (n ? Number(n) : null));

// reduce
const caloriesPerElf = input.reduce(
    (previous, current) => {
        if (current) {
            previous[previous.length - 1] = previous[previous.length - 1] + current;
        } else {
            previous.push(0);
        }

        return previous;
    },
    [0],
);

const caloriesSortedDesc = caloriesPerElf.sort((a, b) => (a < b ? 1 : -1));

const maxCalories = caloriesSortedDesc[0];
const max3Calories = caloriesSortedDesc.slice(0, 3).reduce(sum, 0);

console.log({ maxCalories, max3Calories });
