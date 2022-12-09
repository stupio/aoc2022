const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs.readFileSync(inputPath, "utf-8").split("\n").filter(e => e);

const part1 = new Array(2).fill(null).map(e => [0, 0]);
const part2 = new Array(10).fill(null).map(e => [0, 0]);

const result = input
    .reduce(({ part1Set, part2Set }, line) => {
        const [direction, length] = line.split(" ");

        for (let i = 0; i < Number(length); i++) {
            countPositions(part1, direction, part1Set);
            countPositions(part2, direction, part2Set);
        }

        return { part1Set, part2Set };
    }, {
        part1Set: new Set(),
        part2Set: new Set(),
    });

console.log({
    part1: result.part1Set.size,
    part2: result.part2Set.size,
});

function countPositions(knots, direction, positions) {
    moveHead(knots[0], direction);

    for (let j=1; j<knots.length; j++) {
        moveTail(knots[j-1], knots[j]);

        if (j === knots.length - 1) {
            positions.add(knots[j].join());
        }
    }
}

function moveHead(head, direction) {
    switch (direction) {
        case "U": return head[1]++;
        case "D": return head[1]--;
        case "L": return head[0]--;
        case "R": return head[0]++;
    }
}

function moveTail(head, tail) {
    // changed x
    if (head[0] > tail[0] + 1) {
        tail[0]++;
        update(1, head, tail);
    } else if (head[0] < tail[0] - 1) {
        tail[0]--;
        update(1, head, tail);
    }

    // changed y
    if (head[1] > tail[1] + 1) {
        tail[1]++;
        update(0, head, tail);
    } else if (head[1] < tail[1] - 1) {
        tail[1]--;
        update(0, head, tail);
    }
}

function update(i, head, tail) {
    if (head[i] < tail[i]) {
        tail[i]--;
    } else if (head[i] > tail[i]) {
        tail[i]++;
    }
}

