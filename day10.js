const fs = require("fs");
const input = fs.readFileSync("inputs/day10_input.txt", "utf8");

// (function solution1(input) {
//   const lines = input.split("\n");
//   let result = [];

//   const map = lines.map((line) => line.split(""));
//   const height = map.length - 1;
//   const width = map[0].length - 1;

//   let x;
//   let y;

//   for (let i = 0; i < width; i++) {
//     for (let j = 0; j < height; j++) {
//       if (map[i][j] === "S") {
//         x = i;
//         y = j;
//       }
//     }
//   }

//   let a = x;
//   let b = y - 1;
//   let prevA = x;
//   let prevB = y;
//   let step = 1;

//   while (a !== x || b !== y) {
//     step++;
//     const tempA = a;
//     const tempB = b;
//     if (map[a][b] === "J") {
//       //from up -> go left
//       if (prevA + 1 === a) b--;
//       //from left -> go up
//       else a--;
//     } else if (map[a][b] === "F") {
//       //from right -> go down
//       if (prevB - 1 === b) a++;
//       //from down -> go right
//       else b++;
//     } else if (map[a][b] === "L") {
//       //from right -> go up
//       if (prevB - 1 === b) a--;
//       //from up -> go right
//       else b++;
//     } else if (map[a][b] === "7") {
//       //from left -> go down
//       if (prevB + 1 === b) a++;
//       //from down -> go left
//       else b--;
//     } else if (map[a][b] === "-") {
//       //from left -> go right
//       if (prevB + 1 === b) b++;
//       //from right -> go left
//       else b--;
//     } else if (map[a][b] === "|") {
//       //from down -> go up
//       if (prevA - 1 === a) a--;
//       //from up -> go down
//       else a++;
//     }
//     prevA = tempA;
//     prevB = tempB;
//     map[prevA][prevB] = "■";
//   }
//   result = step / 2;

//   console.log("=====");
//   console.log(result);
//   return result;
// })(input);

(function solution2(input) {
  const lines = input.split("\n");
  let result = 0;

  const map = lines.map((line) => line.split(""));
  const height = map.length;
  const width = map[0].length;

  // find the starting point
  const [x, y] = getS({ map, width, height });

  let a = x;
  // traversing to the left, counter clock wise
  let b = y - 1;
  let prevA = x;
  let prevB = y;
  let step = 1;

  const startBoundary = JSON.stringify([x, y]);
  const boundary = { [startBoundary]: true };
  const potentialOutOfBound = {};
  // traversing in counter clock wise
  const [up, down, left, right] = [true, true, true, true];
  while (a !== x || b !== y) {
    step++;
    const tempA = a;
    const tempB = b;
    if (map[a][b] === "J") {
      //from up -> go left
      if (prevA + 1 === a) {
        // * |
        // - J
        addToPotentialOutOfBound({ up, left, a, b });
        b--;
      }
      //from left -> go up
      else {
        // J *
        // * *
        addToPotentialOutOfBound({ down, right, a, b });
        addToPotentialOutOfBound({ right, a, b });
        addToPotentialOutOfBound({ down, a, b });
        a--;
      }
    } else if (map[a][b] === "F") {
      //from right -> go down
      if (prevB - 1 === b) {
        // * *
        // * F
        addToPotentialOutOfBound({ up, a, b });
        addToPotentialOutOfBound({ left, up, a, b });
        addToPotentialOutOfBound({ left, a, b });
        a++;
      }
      //from down -> go right
      else {
        // F -
        // | *
        addToPotentialOutOfBound({ right, down, a, b });
        b++;
      }
    } else if (map[a][b] === "L") {
      //from right -> go up
      if (prevB - 1 === b) {
        // | *
        // L -
        addToPotentialOutOfBound({ right, up, a, b });
        a--;
      }
      //from up -> go right
      else {
        // * L
        // * *
        addToPotentialOutOfBound({ left, a, b });
        addToPotentialOutOfBound({ left, down, a, b });
        addToPotentialOutOfBound({ down, a, b });
        b++;
      }
    } else if (map[a][b] === "7") {
      //from left -> go down
      if (prevB + 1 === b) {
        // - 7
        // * |
        addToPotentialOutOfBound({ left, down, a, b });
        a++;
      }
      //from down -> go left
      else {
        // * *
        // 7 *
        addToPotentialOutOfBound({ right, a, b });
        addToPotentialOutOfBound({ right, up, a, b });
        addToPotentialOutOfBound({ up, a, b });
        b--;
      }
    } else if (map[a][b] === "-") {
      //from left -> go right
      if (prevB + 1 === b) {
        // -
        // *
        addToPotentialOutOfBound({ down, a, b });
        b++;
      }
      //from right -> go left
      else {
        // *
        // -
        addToPotentialOutOfBound({ up, a, b });
        b--;
      }
    } else if (map[a][b] === "|") {
      //from down -> go up
      if (prevA - 1 === a) {
        // | *
        addToPotentialOutOfBound({ right, a, b });
        a--;
      }
      //from up -> go down
      else {
        // * |
        addToPotentialOutOfBound({ left, a, b });
        a++;
      }
    }
    prevA = tempA;
    prevB = tempB;
    boundary[JSON.stringify([prevA, prevB])] = true;
  }
  function addToPotentialOutOfBound({ up, down, left, right, a, b }) {
    const horizontalDiff = right ? 1 : left ? -1 : 0;
    const verticalDiff = up ? -1 : down ? 1 : 0;

    potentialOutOfBound[
      JSON.stringify([a + verticalDiff, b + horizontalDiff])
    ] = true;
  }

  const outOfBound = [
    [0, 0],
    [height - 1, width - 1],
  ];

  // for visual drawing
  Object.keys(boundary).forEach((key) => {
    let [i, j] = JSON.parse(key);
    map[i][j] = "▩";
  });
  Object.keys(potentialOutOfBound).forEach((key) => {
    if (boundary[key]) return;
    let [i, j] = JSON.parse(key);
    if (i < height && j < width && i >= 0 && j >= 0) {
      map[i][j] = "◇";
      outOfBound.push([i, j]);
    }
  });
  console.log(map.map((line) => line.join("")).join("\n"));
  console.log("====================");

  let counter = 0;
  while (outOfBound.length && counter < 30000) {
    counter++;
    const currLocation = outOfBound.pop();
    if (!boundary[JSON.stringify(currLocation)]) {
      const [i, j] = currLocation;
      // left
      if (j > 0 && map[i][j - 1] !== "▩" && map[i][j - 1] !== "◇") {
        outOfBound.push([i, j - 1]);
        map[i][j - 1] = "◇";
      }
      // right
      if (j < width - 1 && map[i][j + 1] !== "▩" && map[i][j + 1] !== "◇") {
        outOfBound.push([i, j + 1]);
        map[i][j + 1] = "◇";
      }
      // up
      if (i > 0 && map[i - 1][j] !== "▩" && map[i - 1][j] !== "◇") {
        outOfBound.push([i - 1, j]);
        map[i - 1][j] = "◇";
      }
      // down
      if (i < height - 1 && map[i + 1][j] !== "▩" && map[i + 1][j] !== "◇") {
        outOfBound.push([i + 1, j]);
        map[i + 1][j] = "◇";
      }
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (map[i][j] !== "▩" && map[i][j] !== "◇") {
        result++;
      }
    }
  }

  console.log(map.map((line) => line.join("")).join("\n"));
  console.log("=====");
  console.log(result);
  return result;
})(input);

function getS({ map, width, height }) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (map[i][j] === "S") {
        x = i;
        y = j;
        return [i, j];
      }
    }
  }
}
