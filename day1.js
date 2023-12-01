const fs = require("fs");
const input = fs.readFileSync("inputs/day1_input.txt", "utf8");

const REPLACE = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};
let keys = new RegExp(Object.keys(REPLACE).join("|"), "gm");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    line = line.replace(/[a-zA-Z ]/g, "");
    const firstLast = line[0] + line[line.length - 1];
    const num = parseInt(firstLast);
    if (!isNaN(num)) result += parseInt(firstLast);
  });
  console.log("solution 1", result);
  return result;
})(input);

(function solution2(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    let temp = line;
    let line2 = line;

    line2 = line2.replace(/one/g, "o1e");
    line2 = line2.replace(/two/g, "t2o");
    line2 = line2.replace(/three/g, "t3e");
    line2 = line2.replace(/four/g, "f4r");
    line2 = line2.replace(/five/g, "f5e");
    line2 = line2.replace(/six/g, "s6x");
    line2 = line2.replace(/seven/g, "s7n");
    line2 = line2.replace(/eight/g, "e8t");
    line2 = line2.replace(/nine/g, "n9e");
    line2 = line2.replace(/[a-zA-Z ]/g, "");

    line = line.replace(keys, (matched) => REPLACE[matched]);
    line = line.replace(/[a-zA-Z ]/g, "");

    if (line !== line2) {
      console.log(temp, line, line2);
      temp.replace(keys, (matched) => {
        console.log(matched, REPLACE[matched]);
        return REPLACE[matched];
      });

      console.log("==========");
    }
    const firstLast = line[0] + line[line.length - 1];
    result += parseInt(firstLast);
  });
  console.log("solution 2", result);
  return result;
})(input);
