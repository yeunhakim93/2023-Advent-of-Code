const fs = require("fs");
const input = fs.readFileSync("inputs/day4_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;
  lines.forEach((line) => {
    let point = 0;
    const arr = line.split(":");
    const [winning, myCard] = arr[1].split("|");
    const winningObj = {};
    winning.split(" ").forEach((num) => {
      if (isNaN(parseInt(num))) return;
      winningObj[parseInt(num).toString()] = true;
    });
    myCard.split(" ").forEach((num) => {
      if (winningObj[parseInt(num).toString()]) {
        if (point === 0) point = 1;
        else point *= 2;
      }
    });
    result += point;
  });
  console.log("====");
  console.log(result);
  return result;
})(input);
