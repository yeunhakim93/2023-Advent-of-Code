const fs = require("fs");
const input = fs.readFileSync("inputs/day24_input.txt", "utf8");

const LOWER_LIMIT = 200000000000000;
const UPPER_LIMIT = 400000000000000;

/**
 * y - py1 = (vy1/vx1) * (x -px1)
 * y - py2 = (vy2/vx2) * (x -px2)
 */

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;
  const hailstoneArr = [];
  lines.forEach((line) => {
    const [px, py, pz, _, vx, vy, vz] = line.split(" ").map((str) => {
      return parseInt(str.trim());
    });
    hailstoneArr.push({ px, py, pz, _, vx, vy, vz });
  });

  for (let i = 0; i < hailstoneArr.length; i++) {
    for (let j = i + 1; j < hailstoneArr.length; j++) {
      const stoneA = hailstoneArr[i];
      const stoneB = hailstoneArr[j];

      const vy1Dvx1 = stoneA.vy / stoneA.vx;
      const vy2Dvx2 = stoneB.vy / stoneB.vx;

      const x =
        (stoneA.px * vy1Dvx1 - stoneB.px * vy2Dvx2 + stoneB.py - stoneA.py) /
        (vy1Dvx1 - vy2Dvx2);
      const y = vy1Dvx1 * (x - stoneA.px) + stoneA.py;

      if (
        x > LOWER_LIMIT &&
        x < UPPER_LIMIT &&
        y > LOWER_LIMIT &&
        y < UPPER_LIMIT &&
        ((stoneA.px > x && stoneA.vx < 0) ||
          (stoneA.px < x && stoneA.vx > 0)) &&
        ((stoneA.py > y && stoneA.vy < 0) ||
          (stoneA.py < y && stoneA.vy > 0)) &&
        ((stoneB.px > x && stoneB.vx < 0) ||
          (stoneB.px < x && stoneB.vx > 0)) &&
        ((stoneB.py > y && stoneB.vy < 0) || (stoneB.py < y && stoneB.vy > 0))
      ) {
        console.log(stoneA, stoneB, x, y);
        result++;
      }
    }
  }
  console.log("=====");
  console.log(result);
  return result;
})(input);
