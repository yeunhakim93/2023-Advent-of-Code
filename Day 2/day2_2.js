const fs = require("fs");
const input = fs.readFileSync("inputs/day 2/day2_input.txt", "utf8");

(function solution(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    const temp = line.split(":");
    const id = parseInt(temp[0].split(" ")[1]);
    const sets = temp[1].split(";");

    let redMin = 0;
    let blueMin = 0;
    let greenMin = 0;

    for (set of sets) {
      const cubes = set.split(",");
      cubes.forEach((cube) => {
        const count = parseInt(cube);
        if (cube.match(/red/) && count > redMin) redMin = count;
        if (cube.match(/green/) && count > greenMin) greenMin = count;
        if (cube.match(/blue/) && count > blueMin) blueMin = count;
      });
    }
    const power = redMin * greenMin * blueMin;
    result += power;
  });
  console.log("====");
  console.log(result);
  return result;
})(input);
