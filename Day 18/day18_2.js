const fs = require("fs");
const input = fs.readFileSync("inputs/day18_input.txt", "utf8");

(function solution1(input) {
  let result = 0;
  const lines = input.split("\n");

  const position = [0, 0];
  lines.forEach((line) => {
    const [direction, steps, _] = line.split(" ");
    const distance = parseInt(steps);
    let currPosition;
    switch (direction) {
      case "U":
        currPosition = [position[0], position[1] + distance];
        break;
      case "D":
        currPosition = [position[0], position[1] - distance];
        break;
      case "L":
        currPosition = [position[0] - distance, position[1]];
        break;
      case "R":
        currPosition = [position[0] + distance, position[1]];
        break;
    }
    let area = position[0] * currPosition[1] - position[1] * currPosition[0];
    console.log(position, currPosition, area);
    result += area;
    position[0] = currPosition[0];
    position[1] = currPosition[1];
  });

  console.log("=====");
  console.log(Math.abs(result) / 2);
  return result;
})(input);
