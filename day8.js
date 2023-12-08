const fs = require("fs");
const input = fs.readFileSync("inputs/day8_input.txt", "utf8");

// (function solution1(input) {
//   const lines = input.split("\n");
//   let result = 0;
//   const directions = lines.shift();
//   const dirMap = {};

//   lines.shift();
//   lines.forEach((line) => {
//     const temp = line.split("=").map((elem) => elem.trim());
//     const node = temp[0].trim();
//     const nextNodes = temp[1]
//       .split(",")
//       .map((elem) => elem.trim().replace(/[()]/g, ""));
//     dirMap[node] = nextNodes;
//   });

//   let currNode = "AAA";
//   for (let i = 0; i < directions.length; i++) {
//     console.log(currNode, i, directions[i]);
//     if (currNode === "ZZZ") {
//       break;
//     }
//     currNode = dirMap[currNode][directions[i] === "R" ? 1 : 0];
//     result++;
//     if (i === directions.length - 1) i = -1;
//   }

//   console.log(dirMap);
//   console.log("====");
//   console.log(result);
//   return result;
// })(input);

(function solution2(input) {
  const lines = input.split("\n");
  const directions = lines.shift();
  const dirMap = {};

  let ghostArr = [];

  lines.shift();
  lines.forEach((line) => {
    const temp = line.split("=").map((elem) => elem.trim());
    const node = temp[0].trim();
    const nextNodes = temp[1]
      .split(",")
      .map((elem) => elem.trim().replace(/[()]/g, ""));
    dirMap[node] = nextNodes;
    if (node[2] === "A") ghostArr.push(node);
  });
  ghostSteps = [];
  ghostArr.forEach((ghostNode) => {
    let steps = 0;
    let currNode = ghostNode;
    for (let i = 0; i < directions.length; i++) {
      if (currNode[2] === "Z") {
        break;
      }
      steps++;
      currNode = dirMap[currNode][directions[i] === "R" ? 1 : 0];
      if (i === directions.length - 1) i = -1;
    }
    ghostSteps.push(steps);
  });

  const factorsObj = {};

  ghostSteps.forEach((step) => {
    const factors = getFactors(step);
    const currFactorsObj = {};
    factors.forEach((factor) => {
      if (!currFactorsObj[factor]) currFactorsObj[factor] = 1;
      else currFactorsObj[factor] = currFactorsObj[factor] + 1;
    });
    for (factor in currFactorsObj) {
      if (!factorsObj[factor] || factorsObj[factor] < currFactorsObj[factor])
        factorsObj[factor] = currFactorsObj[factor];
    }
  });
  result = 1;

  for (factor in factorsObj) {
    result *= factor ** factorsObj[factor];
  }

  console.log(result);
  console.log("====");
  return result;
})(input);

console.log(getFactors(21883));
function getFactors(num) {
  if (num === 1) return [];
  let div = num - 1;
  while (div > 1) {
    if (num % div === 0) {
      break;
    }
    div--;
  }
  if (div === 1) return [num];
  return [...getFactors(num / div), ...getFactors(div)];
}
//AAA - 21883
//NJA = 13019
// BHA 11911
//HTA - 16897
//LJA 19667
//XXA 18559
