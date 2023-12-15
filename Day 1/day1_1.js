const fs = require("fs");
const input = fs.readFileSync("inputs/day1_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    line = line.replace(/[a-zA-Z ]/g, "");
    const firstLast = line[0] + line[line.length - 1];
    const num = parseInt(firstLast);
    if (!isNaN(num)) result += parseInt(firstLast);
  });
  console.log("=====");
  console.log(result);
  return result;
})(input);
