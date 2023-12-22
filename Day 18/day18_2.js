const fs = require("fs");
const input = fs.readFileSync("inputs/day18_input.txt", "utf8");

(function solution2(input) {
  let result = 0;
  let area = 0;
  let perimeter = 0;

  const lines = input.split("\n");
  const position = [1, 1];

  lines.forEach((line) => {
    const [_, __, color] = line.split(" ");
    const hexNum = color.slice(2, 7);
    const direction = color[7];
    const distance = parseInt(hexNum, 16);

    let currPosition;
    switch (direction) {
      case "0":
        currPosition = [position[0] + distance, position[1]];
        break;
      case "1":
        currPosition = [position[0], position[1] - distance];
        break;
      case "2":
        currPosition = [position[0] - distance, position[1]];
        break;
      case "3":
        currPosition = [position[0], position[1] + distance];
        break;
    }
    let currArea =
      position[0] * currPosition[1] - position[1] * currPosition[0];
    perimeter += distance;
    area += currArea / 2;
    position[0] = currPosition[0];
    position[1] = currPosition[1];
  });

  let exteriorPts = (lines.length + 4) / 2;
  let interiorPts = lines.length - exteriorPts;

  result += Math.abs(area);
  result += (perimeter - exteriorPts - interiorPts) / 2;
  result += (exteriorPts * 3) / 4;
  result += interiorPts / 4;

  console.log("=====");
  console.log(result);
  return result;
})(input);
