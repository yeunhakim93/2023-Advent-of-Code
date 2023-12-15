const fs = require("fs");
const input = fs.readFileSync("inputs/day11_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;

  let map = lines.map((line) => line.split(""));

  const emptyRows = [];
  const emptyCols = [];
  let width = map[0].length;
  let height = map.length;

  for (let i = 0; i < height; i++) {
    let galaxyCounter = 0;
    for (let j = 0; j < width; j++) {
      if (map[i][j] === "#") {
        galaxyCounter++;
      }
    }
    if (galaxyCounter === 0) emptyRows.push(i);
  }

  for (let j = 0; j < width; j++) {
    let galaxyCounter = 0;
    for (let i = 0; i < height; i++) {
      if (map[i][j] === "#") {
        galaxyCounter++;
      }
    }
    if (galaxyCounter === 0) emptyCols.push(j);
  }
  let emptyColsCopy = emptyCols.length;

  while (emptyCols.length) {
    let currCol = emptyCols.pop();
    map.map((line) => {
      line.splice(currCol, 0, ".");
      return line;
    });
  }
  while (emptyRows.length) {
    let currRow = emptyRows.pop();
    map.splice(currRow, 0, new Array(width + emptyColsCopy).fill("."));
  }
  console.log(map.map((line) => line.join("")).join("\n"));

  const galaxyArr = [];

  // reassign width & height
  width = map[0].length;
  height = map.length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (map[i][j] === "#") {
        galaxyArr.push([i, j]);
      }
    }
  }

  for (let i = 0; i < galaxyArr.length; i++) {
    for (let j = i + 1; j < galaxyArr.length; j++) {
      result =
        result +
        Math.abs(galaxyArr[i][0] - galaxyArr[j][0]) +
        Math.abs(galaxyArr[i][1] - galaxyArr[j][1]);
    }
  }

  console.log("=====");
  console.log(result);
  return result;
})(input);
