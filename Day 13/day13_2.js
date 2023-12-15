const fs = require("fs");
const input = fs.readFileSync("inputs/day13_input.txt", "utf8");

(function solution2(input) {
  const lines = input.split("\n");
  lines.push("");
  let result = 0;
  let currArr = [];

  lines.forEach((line) => {
    if (line.length === 0) {
      const prevMirror = findReflection();
      const originalArr = JSON.stringify(currArr);
      let escape = false;
      for (let i = 0; i < currArr.length && !escape; i++) {
        for (let j = 0; j < currArr[0].length && !escape; j++) {
          currArr[i][j] = currArr[i][j] === "#" ? "." : "#";
          const potential = findReflection(prevMirror);
          if (
            potential.vertical &&
            prevMirror.vertical !== potential.vertical
          ) {
            result += potential.vertical;
            escape = true;
          }
          if (
            potential.horizontal &&
            prevMirror.horizontal !== potential.horizontal
          ) {
            result += potential.horizontal * 100;
            escape = true;
          }
          currArr = JSON.parse(originalArr);
        }
      }
      currArr = [];
      return;
    }
    const lineArr = line.split("");
    currArr.push(lineArr);
  });

  function findReflection(prevMirror) {
    const table = JSON.parse(JSON.stringify(currArr));
    width = table[0].length;
    height = table.length;
    // find vertical ones
    const potentialVerticalMirrors = {};
    for (let i = 0; i < height; i++) {
      for (let j = 1; j < width; j++) {
        const left = table[i].slice(0, j).reverse();
        const right = table[i].slice(j);
        let k = 0;
        while (left[k] === right[k]) {
          k++;
        }
        if (k === Math.min(left.length, right.length)) {
          if (potentialVerticalMirrors[j])
            potentialVerticalMirrors[j] = potentialVerticalMirrors[j] + 1;
          else potentialVerticalMirrors[j] = 1;
        }
      }
    }
    const verticalMirrors = [];
    for (key in potentialVerticalMirrors) {
      if (potentialVerticalMirrors[key] === height)
        verticalMirrors.push(parseInt(key));
    }

    const horizontalMirrors = [];
    // find horizontal ones
    for (let i = 1; i < height; i++) {
      const top = table
        .slice(0, i)
        .reverse()
        .map((line) => line.join(""));
      const bottom = table.slice(i).map((line) => line.join(""));
      let k = 0;
      while (top[k] && bottom[k] && top[k] === bottom[k]) {
        k++;
      }
      if (k === Math.min(top.length, bottom.length)) {
        horizontalMirrors.push(i);
      }
    }
    const returnObj = {};

    verticalMirrors.forEach((col) => {
      if (!prevMirror) returnObj.vertical = col;
      else if (prevMirror.vertical !== col) returnObj.vertical = col;
    });

    horizontalMirrors.forEach((row) => {
      if (!prevMirror) returnObj.horizontal = row;
      else if (prevMirror.horizontal !== row) returnObj.horizontal = row;
    });
    return returnObj;
  }
  console.log("=====");
  console.log(result);
  return result;
})(input);
