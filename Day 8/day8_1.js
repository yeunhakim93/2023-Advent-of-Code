const fs = require("fs");
const input = fs.readFileSync("inputs/day8_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;
  const directions = lines.shift();
  const dirMap = {};

  lines.shift();
  lines.forEach((line) => {
    const temp = line.split("=").map((elem) => elem.trim());
    const node = temp[0].trim();
    const nextNodes = temp[1]
      .split(",")
      .map((elem) => elem.trim().replace(/[()]/g, ""));
    dirMap[node] = nextNodes;
  });

  let currNode = "AAA";
  for (let i = 0; i < directions.length; i++) {
    if (currNode === "ZZZ") {
      break;
    }
    currNode = dirMap[currNode][directions[i] === "R" ? 1 : 0];
    result++;
    if (i === directions.length - 1) i = -1;
  }

  console.log(dirMap);
  console.log("====");
  console.log(result);
  return result;
})(input);
