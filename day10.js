const fs = require("fs");
const input = fs.readFileSync("inputs/day10_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = [];

  const map = lines.map((line) => line.split(""));
  const height = map.length - 1;
  const width = map[0].length - 1;

  let x;
  let y;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (map[i][j] === "S") {
        x = i;
        y = j;
      }
    }
  }

  let a = x;
  let b = y - 1;
  let prevA = x;
  let prevB = y;
  let step = 1;

  while (a !== x || b !== y) {
    step++;
    const tempA = a;
    const tempB = b;
    if (map[a][b] === "J") {
      //from up -> go left
      if (prevA + 1 === a) b--;
      //from left -> go up
      else a--;
    } else if (map[a][b] === "F") {
      //from right -> go down
      if (prevB - 1 === b) a++;
      //from down -> go right
      else b++;
    } else if (map[a][b] === "L") {
      //from right -> go up
      if (prevB - 1 === b) a--;
      //from up -> go right
      else b++;
    } else if (map[a][b] === "7") {
      //from left -> go down
      if (prevB + 1 === b) a++;
      //from down -> go left
      else b--;
    } else if (map[a][b] === "-") {
      //from left -> go right
      if (prevB + 1 === b) b++;
      //from right -> go left
      else b--;
    } else if (map[a][b] === "|") {
      //from down -> go up
      if (prevA - 1 === a) a--;
      //from up -> go down
      else a++;
    }
    prevA = tempA;
    prevB = tempB;
    map[prevA][prevB] = "■";
  }
  result = step / 2;

  console.log("=====");
  console.log(result);
  return result;
})(input);
