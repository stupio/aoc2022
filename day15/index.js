const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .filter(e => e)
    .map(line => line.split(":")
        .map(part => part.match(/-?\d+/g).map(Number)))
    .map(([a,b]) => [a,b, distance(a,b)]);

// part 1

const coverage = getRowCoverage(input, 2000000);

const part1 = coverage.reduce((sum, curr) => sum + (curr[1] - curr[0]), 0);


// part 2

const part2 = new Array(4000000)
    .fill(1)
    .map((v, i) => {
        const coverage = getRowCoverage(input, i);
        if (coverage.length > 1) {
            return (coverage[0][1] + 1) * 4000000 + i;
        }
    })
    .filter(e => e);

console.log({ part1, part2 });

function distance(a,b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getRowCoverage(sensors, row) {
    const coverage = [];
    for (const sensor of sensors) { // sensor [s, b, dist]
        let sensorCoverage = getSensorRowCoverage(sensor, row);
        if (sensorCoverage) { coverage.push(sensorCoverage); }
    }

    return addCoverage(coverage);
}

function getSensorRowCoverage(sensor, row) {
    const [s, _, dist] = sensor;
    const width = dist - Math.abs(s[1] - row);

    if (width < 0) { return null; }

    return [s[0] - width, s[0] + width];
}

function addCoverage(coverage) { // coverage: [[s.x - width, s.x + width]]
    coverage.sort((a,b) => a[0] - b[0]);

    const merged = [];
    let prev = coverage[0];

    for (let i = 0; i < coverage.length; i++) {
        let curr = coverage[i];
        if (prev[1] >= curr[0] - 1) {
            prev = [prev[0], Math.max(prev[1], curr[1])];
        } else {
            merged.push(prev);
            prev = curr;
        }
    }

    merged.push(prev);
    return merged;
}
