const fs = require("fs");
const input = fs.readFileSync("inputs/day15_input.txt", "utf8");

(function solution1(input) {
  let result = 0;
  input.split(",").forEach((step) => {
    let currVal = 0;
    for (let i = 0; i < step.length; i++) {
      let char = step[i];
      let ascii = char.charCodeAt(0);
      currVal += ascii;
      currVal = (currVal * 17) % 256;
    }
    result += currVal;
  });

  console.log("=====");
  console.log(result);
  return result;
})(input);
