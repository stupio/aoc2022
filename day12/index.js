String.prototype.v = function () { return this.charCodeAt(0); };

const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./marek.txt");
const input = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .map(line => line.split(""))
    .filter(e => e);


const points = findStart(input);

// part 1
const part1 = p1(points.end, points.start);
const part2 = p1(points.end);
console.log({ part1, part2 });


function findStart(lines) {
    let start;
    let end;

    lines.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char === "S") {
                start = [y,x];
                lines[y][x] = "a";
            }

            if (char === "E") {
                end = [y,x];
                lines[y][x] = "z";
            }
        });
    });

    return { start,end };
}

function p1(start, end) {
    const visited = {};
    const queue = [start]; // [y,x]

    visited[start.join()] = 0;

    while (queue.length) {
        const addr = queue.shift();
        const neighbours = findNeighbours(input,addr);

        for (let node of neighbours) {
            if (!end && input[addr[0]][addr[1]] === "a") {
                return visited[addr];
            }

            if (!visited[node.join()]) {
                visited[node.join()] = visited[addr] + 1;
                queue.push(node);
            }
        }
    }

    return visited[end.join()];
}

function findNeighbours(matrix, node) {
    const maxx = matrix[0].length - 1;
    const maxy = matrix.length - 1;
    const [y,x] = node;

    const height = matrix[y][x].v() - 2;
    const neighbours = [];

    if (x > 0 && height < matrix[y][x-1]?.v()) {
        neighbours.push([y, x-1]);
    }

    if (x < maxx && height < matrix[y][x+1]?.v()) {
        neighbours.push([y, x+1]);
    }

    if (y > 0 && height < matrix[y-1][x]?.v()) {
        neighbours.push([y-1,x]);
    }

    if (y < maxy && height < matrix[y+1][x]?.v()) {
        neighbours.push([y+1,x]);
    }

    return neighbours;
}
