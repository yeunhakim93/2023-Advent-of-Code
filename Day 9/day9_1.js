const fs = require("fs");
const input = fs.readFileSync("inputs/day9_input.txt", "utf8");

(function solution(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    const sequence = [line.split(" ").map((num) => parseInt(num))];

    let i = 0;

    while (true) {
      sequence.push(getNextSequence(sequence[i++]));
      if (/^0*$/.test(sequence[i].join(""))) break;
    }
    for (let j = sequence.length - 1; j > 0; j--) {
      let currLen = sequence[j].length - 1;
      let prevLen = sequence[j - 1].length - 1;
      sequence[j - 1].push(sequence[j - 1][prevLen] + sequence[j][currLen]);
    }
    result += sequence[0][sequence[0].length - 1];
  });
  console.log("====");
  console.log(result);
  return result;
})(input);

function getNextSequence(sequence) {
  const result = [];
  for (let i = 1; i < sequence.length; i++) {
    result.push(sequence[i] - sequence[i - 1]);
  }
  return result;
}
