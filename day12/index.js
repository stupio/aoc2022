String.prototype.v = function () { return this.charCodeAt(0); };

const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .map(line => line.split(""))
    .filter(e => e);


const points = findStartPart1(input);
const start = points.start;
const end = points.end;

// part 1
console.time("part1");

const part1 = calculateDistanceFrom(start, end);
console.log({ part1 });

console.timeEnd("part1");

// part2
console.time("part2");

const lowestPoints = findStartPart2(input);
const points2 = Math.min(...lowestPoints.map(startA => calculateDistanceFrom(startA, end)));

console.log({ part2: points2 });

console.timeEnd("part2");




function findStartPart1(lines) {
    let start;
    let end;

    lines.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char === "S") {
                start = [x,y].join();
                lines[y][x] = String.fromCharCode("a".v() - 1);
            }

            if (char === "E") {
                end = [x,y].join();
                lines[y][x] = String.fromCharCode("z".v() + 1);
            }
        });
    });

    return {  start,end };
}

function findStartPart2(lines) {
    let nodes = [];

    lines.forEach((line, y) => {
        line.forEach((char, x) => {
            // find only A where it has B neighbour
            const hasB = lines[y-1]?.[x] && lines[y-1]?.[x].v() === lines[y][x].v() + 1 ||
                lines[y]?.[x+1] && lines[y][x+1]?.v() === lines[y][x].v() + 1 ||
                lines[y+1]?.[x] && lines[y+1]?.[x].v() === lines[y][x].v() + 1 ||
                lines[y]?.[x-1] && lines[y][x-1]?.v() === lines[y][x].v() + 1;

            if (char === "a" && hasB) {
                nodes.push([x,y].join());
            }
        });
    });

    return nodes;
}

function findNodes(lines) {
    const nodes = {};

    lines.forEach((line, y) => line.forEach((_, x) => {
        const key = [x,y].join();
        const node = {
            key,
            nodes: [],
            visited: false,
            distance: Infinity,
        };

        if (lines[y-1]?.[x] && lines[y-1][x].v() <= lines[y][x].v() + 1) {
            node.nodes.push([x, y-1].join()); // up node
        }

        if (lines[y]?.[x+1] && lines[y][x+1].v() <= lines[y][x].v() + 1) {
            node.nodes.push([x+1, y].join()); // right node
        }

        if (lines[y+1]?.[x] && lines[y+1][x].v() <= lines[y][x].v() + 1) {
            node.nodes.push([x, y+1].join()); // down node
        }

        if (lines[y]?.[x-1] && lines[y][x-1].v() <= lines[y][x].v() + 1) {
            node.nodes.push([x-1, y].join()); // left node
        }

        nodes[key] = node;
    }));

    return nodes;
}

function calculateDistance(nodes, addr) {
    const currentNode = nodes[addr];

    const next = currentNode?.nodes
        .map(nodeAddr => nodes[nodeAddr])
        .filter(node => node)
        .map(node => {
            node.distance = Math.min(node.distance, currentNode.distance + 1);
            return node.key;
        }) ?? [];

    delete nodes[addr];

    return next;
}

function calculateDistanceFrom(start, end) {
    const nodes = findNodes(input); // map all nodes and find child nodes

    nodes[start].distance = 0; // mark starting point with 0 distance

    let next = start;
    let queue = [];

    do {
        const addToQueue = calculateDistance(nodes, next);
        queue.push(...addToQueue);
        next = queue.shift();
    } while (next && next !== end);

    return nodes[end].distance;
}
