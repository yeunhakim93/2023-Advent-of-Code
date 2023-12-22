const fs = require("fs");
const input = fs.readFileSync("inputs/day18_input.txt", "utf8");

(function solution1(input) {
  let result = 0;
  const lines = input.split("\n");
  let minWidth = 0;
  let minDepth = 0;
  let width = 0;
  let depth = 0;
  let i = 0;
  let j = 0;

  const visited = new Set();
  lines.forEach((line) => {
    const [dir, steps, color] = line.split(" ");
    const stepsInt = parseInt(steps);
    switch (dir) {
      case "R":
        j += stepsInt;
        break;
      case "L":
        j -= stepsInt;
        break;
      case "D":
        i += stepsInt;
        break;
      case "U":
        i -= stepsInt;
        break;
    }
    if (i > depth) depth = i;
    if (j > width) width = j;
    if (i < minDepth) minDepth = i;
    if (j < minWidth) minWidth = j;
  });
  console.log(minWidth + width, minDepth + depth);
  const map = [];
  for (let x = 0; x <= depth - minDepth; x++) {
    map.push([]);
    map[x] = Array(width - minWidth + 1).fill(".");
  }
  console.log("map made");
  i = -minDepth;
  j = -minWidth;
  lines.forEach((line) => {
    const [dir, steps, color] = line.split(" ");
    let stepsInt = parseInt(steps);
    while (stepsInt) {
      switch (dir) {
        case "R":
          j++;
          break;
        case "L":
          j--;
          break;
        case "D":
          i++;
          break;
        case "U":
          i--;
          break;
      }
      if (!map[i]) map[i] = Array(width + 1).fill(".");
      visited.add(JSON.stringify([i, j]));
      map[i][j] = "#";

      stepsInt--;
    }
  });

  map.forEach((lineArr) => {
    // let area = 0;
    // let inside = false;
    // for (let x = 0; x < lineArr.length; x++) {
    //   if (lineArr[x] === "#") inside = !inside;
    //   while (lineArr[x] === "#") {
    //     area++;
    //     x++;
    //   }
    //   if (inside) area++;
    // }
    // result += area;
    // console.log(lineArr.join(""));
  });
  const withinBoundary = [[-minDepth + 1, -minWidth + 1]];

  // Explore point
  // Turn to '#'
  // Add to visited
  // Add neighbors to queue

  // const queue = [[-minDepth + 1, -minWidth + 1]];
  // while (queue.length) {
  //   const location = queue.shift();
  //   if (visited.has(JSON.stringify(location))){
  //   }
  // }

  while (withinBoundary.length) {
    const [currI, currJ] = withinBoundary.shift();
    if (map[currI][currJ] === "#") continue;
    map[currI][currJ] = "#";
    if (currI < map.length && map[currI + 1][currJ] === ".") {
      withinBoundary.push([currI + 1, currJ]);
    }
    if (currJ > 0 && map[currI][currJ - 1] === ".") {
      withinBoundary.push([currI, currJ - 1]);
    }
    if (currJ < map[0].length && map[currI][currJ + 1] === ".") {
      withinBoundary.push([currI, currJ + 1]);
    }
    if (currI > 0 && map[currI - 1][currJ] === ".") {
      withinBoundary.push([currI - 1, currJ]);
    }
  }

  map.forEach((lineArr) => {
    lineArr.forEach((char) => {
      if (char === "#") result++;
    });
    // console.log(lineArr.join(""));
  });
  console.log("=====");
  console.log(result);
  return result;
})(input);
