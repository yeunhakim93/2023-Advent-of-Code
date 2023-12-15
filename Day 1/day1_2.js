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

(function solution2(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    line = line.replace(keys, (matched) => REPLACE[matched]);
    line = line.replace(/[a-zA-Z ]/g, "");
    const firstLast = line[0] + line[line.length - 1];
    result += parseInt(firstLast);
  });
  console.log("=====");
  console.log(result);
  return result;
})(input);
