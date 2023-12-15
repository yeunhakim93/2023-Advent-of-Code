const fs = require("fs");
const input = fs.readFileSync("inputs/day14_input.txt", "utf8");

// (function solution1(input) {
//   const lines = input.split("\n");
//   let result = 0;
//   const map = lines.map((line) => line.split(""));

//   for (let j = 0; j < map[0].length; j++) {
//     let offset = 0;
//     let pointer = 0;
//     let currChar = map[pointer][j];
//     while (pointer < map.length) {
//       currChar = map[pointer][j];
//       if (currChar === ".") {
//       } else if (currChar === "O") {
//         result += map.length - offset;
//         offset++;
//       } else if (currChar === "#") {
//         offset = pointer + 1;
//       }
//       pointer++;
//     }
//   }

//   console.log("=====");
//   console.log(result);
//   return result;
// })(input);

(function solution2(input) {
  const lines = input.split("\n");
  const map = lines.map((line) => line.split(""));
  let result = 0;

  for (let j = 0; j < map[0].length; j++) {
    let offset = 0;
    let pointer = 0;
    let currChar = map[pointer][j];
    while (pointer < map.length) {
      currChar = map[pointer][j];
      if (currChar === ".") {
      } else if (currChar === "O") {
        result += map.length - offset;
        offset++;
      } else if (currChar === "#") {
        offset = pointer + 1;
      }
      pointer++;
    }
  }

  console.log("=====");
  console.log(result);
  return result;
})(input);
