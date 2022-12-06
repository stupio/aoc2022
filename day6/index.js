const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "./input.txt");
const input = fs.readFileSync(inputPath);

console.log("packet:", findMarker(4));
console.log("message:", findMarker(14));

function findMarker(length) {
    let markers = [];
    for (const [i, byte] of input.entries()) {
        markers.push(byte);

        if (markers.length < length){ continue; }

        if (new Set(markers).size !== length) {
            markers.shift();
        } else {
            return i+1;
        }
    }
}
