const fs = require("fs");
const input = fs.readFileSync("inputs/day13_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  lines.push("");
  let result = 0;
  let currArr = [];

  lines.forEach((line) => {
    if (line.length === 0) {
      findReflection();
      currArr = [];
      return;
    }
    const lineArr = line.split("");
    currArr.push(lineArr);
  });
  function findReflection() {
    const table = currArr;
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
    for (let i = 1; i < height; i++) {
      const top = table
        .slice(0, i)
        .reverse()
        .map((line) => line.join(""));
      const bottom = table.slice(i).map((line) => line.join(""));

      let k = 0;
      while (top[k] === bottom[k]) {
        k++;
      }
      if (k === Math.min(top.length, bottom.length)) {
        horizontalMirrors.push(i);
      }
    }

    console.log("verticalMirrors", verticalMirrors);
    console.log("horizontalMirrors", horizontalMirrors);
    console.log("=======");
    verticalMirrors.forEach((col) => {
      result += col;
    });

    horizontalMirrors.forEach((row) => {
      result += row * 100;
    });
  }
  console.log("=====");
  console.log(result);
  return result;
})(input);
