const fs = require("fs");
const input = fs.readFileSync("inputs/day6_input.txt", "utf8");

(function solution2(input) {
  const lines = input.split("\n");
  let result = 1;
  const time = parseInt(
    lines[0]
      .split(" ")
      .filter((str) => str && str !== "Time:")
      .join("")
  );
  const record = parseInt(
    lines[1]
      .split(" ")
      .filter((str) => str && str !== "Distance:")
      .join("")
  );

  let currWaysToBeat = 0;
  let holdingTime = 1;
  while (holdingTime < time) {
    let speed = holdingTime;
    let distance = (time - holdingTime) * speed;
    if (distance > record) currWaysToBeat++;
    holdingTime++;
  }
  result = currWaysToBeat;
  console.log("====");
  console.log(result);
  return result;
})(input);
