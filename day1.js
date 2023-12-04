const fs = require("fs");
const input = fs.readFileSync("inputs/day1_input.txt", "utf8");

const REPLACE = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "4",
  five: "5e",
  six: "6",
  seven: "7n",
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
    line = line.replace(keys, (matched) => REPLACE[matched]);
    line = line.replace(/[a-zA-Z ]/g, "");
    const firstLast = line[0] + line[line.length - 1];
    result += parseInt(firstLast);
  });
  console.log("solution 2", result);
  return result;
})(input);
