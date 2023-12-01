const fs = require("fs");
const input = fs.readFileSync("inputs/day1_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    line = line.replace(/[a-zA-Z ]/g, "");
    const firstLast = line[0] + line[line.length - 1];
    result += parseInt(firstLast);
  });
  console.log(result);
  return result;
})(input);

(function solution2(input) {
  const lines = input.split("\n");
  let result = 0;
  lines.forEach((line) => {
    line = line.replace(/one/g, "o1e");
    line = line.replace(/two/g, "t2o");
    line = line.replace(/three/g, "t3e");
    line = line.replace(/four/g, "f4r");
    line = line.replace(/five/g, "f5e");
    line = line.replace(/six/g, "s6x");
    line = line.replace(/seven/g, "s7n");
    line = line.replace(/eight/g, "e8t");
    line = line.replace(/nine/g, "n9e");
    line = line.replace(/[a-zA-Z ]/g, "");
    const firstLast = line[0] + line[line.length - 1];
    result += parseInt(firstLast);
  });
  console.log(result);
  return result;
})(input);
