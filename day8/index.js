const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs.readFileSync(inputPath, "utf-8").split("\n").filter(e => e);
const treeLines = input.map(line => line.split("").map(tree => (Number(tree))));

const visibleTrees = new Set();
const vSize = treeLines[0].length;

// count horizontally
for(let i=0; i<treeLines.length; i++) {
    const line = treeLines[i];

    let max = 0;
    for(let j=0; j < line.length; j++) {
        if (line[j] > max || j === 0) {
            max = line[j];
            let score = countScore(i,j);
            visibleTrees.add([i,j,line[j],score].join());
        }
    }

    max = 0;
    for(let j=line.length - 1; j>=0; j--) {
        if (line[j] > max || j === line.length - 1) {
            max = line[j];
            let score = countScore(i,j);
            visibleTrees.add([i,j,line[j],score].join());
        }
    }
}

// count vertically
for(let j=0; j<vSize; j++){
    let max = 0;

    for(let i=0; i<treeLines.length; i++) {
        const line = treeLines[i];

        if (line[j] > max || i === 0) {
            max = line[j];
            let score = countScore(i,j);
            visibleTrees.add([i,j,line[j],score].join());
        }
    }

    max = 0;
    for(let i=treeLines.length - 1; i>0; i--) {
        const line = treeLines[i];

        if (line[j] > max || i === line.length - 1) {
            max = line[j];
            let score = countScore(i,j);
            visibleTrees.add([i,j,line[j],score].join());
        }
    }
}

function countScore(i, j) {
    let leftScore = 0;
    let rightScore = 0;
    let topScore = 0;
    let bottomScore = 0;

    const max = treeLines[i][j];

    treeLines[i]
        .slice(j+1)
        .every(tree => {
            rightScore++;
            return tree < max;
        });

    treeLines[i]
        .slice(0,j)
        .reverse()
        .every(tree => {
            leftScore++;
            return tree < max;
        });

    treeLines
        .slice(i+1)
        .every(line => {
            bottomScore++;
            return line[j] < max;
        });

    treeLines
        .slice(0, i)
        .reverse()
        .every(line => {
            topScore++;
            return line[j] < max;
        });

    return leftScore * rightScore * topScore * bottomScore;
}



const maxScore = Math.max(...[...visibleTrees].map(e => { return e.split(",")[3] ?? 0; }));

console.log({ trees: visibleTrees.size, maxScore });
