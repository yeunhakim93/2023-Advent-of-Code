const fs = require("fs");
const input = fs.readFileSync("inputs/day6_input.txt", "utf8");

(function solution(input) {
  const lines = input.split("\n");
  let result = 1;

  const races = [];
  const times = lines[0].split(" ").filter((str) => str && str !== "Time:");
  const records = lines[1]
    .split(" ")
    .filter((str) => str && str !== "Distance:");

  for (let i = 0; i < times.length; i++) {
    races.push([parseInt(times[i]), parseInt(records[i])]);
  }

  for ([time, record] of races) {
    let currWaysToBeat = 0;
    let holdingTime = 1;
    while (holdingTime < time) {
      let speed = holdingTime;
      let distance = (time - holdingTime) * speed;
      if (distance > record) currWaysToBeat++;
      holdingTime++;
    }
    result = result * currWaysToBeat;
  }
  console.log("====");
  console.log(result);
  return result;
})(input);
