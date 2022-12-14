const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .filter(e => e)
    .map(line => line.split(" -> ").map(coord => coord.split(",")));

const gridSize = getGridSize(input);
const grid = translateGrid();

countSand(grid);



function getGridSize() {
    return input.reduce((result, line) => {
        line.forEach(([x,y]) => {
            result.minX = Math.min(result.minX, x);
            result.minY = Math.min(result.minY, y);
            result.maxX = Math.max(result.maxX, x);
            result.maxY = Math.max(result.maxY, y);
        });

        return result;
    }, { minX: Infinity, maxX: 0, minY: Infinity, maxY: 0 });
}

function translateGrid() {
    const blocked = new Set();

    for(let i=-500; i<1500; i++) {
        blocked.add([i,gridSize.maxY + 2].join());
    }

    input.map(line => line.map(([x,y]) => {
        return [Number(x), Number(y)];
    }).reduce((line, coords) => {
        if (!line) {
            line = [coords];
        } else {
            const last = line[line.length - 1];
            const dx = coords[0] - last[0];
            const dy = coords[1] - last[1];

            for (let i=1; i<=Math.abs(dx); i++) {
                line.push([last[0] + i * Math.sign(dx), last[1]]);
            }

            for (let i=1; i<=Math.abs(dy); i++) {
                line.push([last[0], last[1] + i * Math.sign(dy)]);
            }
        }

        return line;
    }, null).forEach(coords => blocked.add(coords.join())));

    return blocked;
}

function countSand(grid) {
    let n = 0;
    let h = gridSize.maxY;

    while (!grid.has("500,0")) {
        let [x, y] = [500, 0];

        while (true) { // count until break
            if (!grid.has([x, y+1].join())) { // if there is spot below
                y++;
            } else if (!grid.has([x-1,y+1].join())) { // if there is spot on the left
                x--; y++;
            } else if (!grid.has([x+1,y+1].join())) { // if there is spot on the right
                x++; y++;
            } else { // place sand grain and check if it fell out of the starting grid
                grid.add([x, y].join());

                if (y-1 === h) { // check if it fell down on the bottom
                    console.log({ part1: n });
                    h = null; // this will prevent from stopping at the bottom
                }

                n++;
                break;
            }
        }
    }

    console.log({ part2: n });
}
