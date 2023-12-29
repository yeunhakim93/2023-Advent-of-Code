const fs = require("fs");
const input = fs.readFileSync("inputs/day21_input.txt", "utf8");
const COUNTER = 64;

(function solution1(input) {
  let result = 0;
  let currQueue = [];

  const map = input.split("\n").map((line, row) => {
    line.split("").forEach((elem, col) => {
      if (elem === "S") currQueue.push([row, col]);
    });
    return line.split("");
  });

  let counter = COUNTER;
  const width = map[0].length;
  const height = map.length;

  while (counter > 0) {
    const nextQueue = new Set();
    while (currQueue.length) {
      const [i, j] = currQueue.pop();
      if (i + 1 < height && map[i + 1][j] !== "#") {
        nextQueue.add(JSON.stringify([i + 1, j]));
      }
      if (i > 0 && map[i - 1][j] !== "#") {
        nextQueue.add(JSON.stringify([i - 1, j]));
      }
      if (j + 1 < width && map[i][j + 1] !== "#") {
        nextQueue.add(JSON.stringify([i, j + 1]));
      }
      if (j > 0 && map[i][j - 1] !== "#") {
        nextQueue.add(JSON.stringify([i, j - 1]));
      }
    }
    counter--;
    currQueue = [...nextQueue].map((elem) => JSON.parse(elem));
  }
  console.log(currQueue);
  console.log("=====");
  console.log(currQueue.length);
  return result;
})(input);
