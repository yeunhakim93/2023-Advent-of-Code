const fs = require("fs");
const input = fs.readFileSync("inputs/day2_input.txt", "utf8");

// let redMax = 12;
// let greenMax = 13;
// let blueMax = 14;
// (function solution(input) {
//   const lines = input.split('\n');
//   let result = 0;

//   lines.forEach((line) => {
//     const temp = line.split(':');
//     const id = parseInt(temp[0].split(' ')[1]);
//     const sets = temp[1].split(';');
//     let isPossible = 0;
//     for (set of sets) {
//       const cubes = set.split(',');
//       let checker = true;
//       cubes.forEach((cube) => {
//         if (cube.match(/red/) && parseInt(cube) > redMax) checker = false;
//         // console.log('2');
//         if (cube.match(/green/) && parseInt(cube) > greenMax) checker = false;
//         // console.log('3');
//         if (cube.match(/blue/) && parseInt(cube) > blueMax) checker = false;
//         // console.log('4');
//       });
//       if (checker) isPossible += 1;
//     }
//     if (isPossible === sets.length) result += id;
//   });
//   console.log('====');
//   console.log(result);
//   return result;
// })(input);

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
