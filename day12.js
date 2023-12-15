const fs = require("fs");
const input = fs.readFileSync("inputs/day12_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    const [str, numbers] = line.split(" ");
    let length = str.length;
    const numbersArr = numbers.split(",");
    const permutations = {};
    function permute(prev) {
      if (prev.length === length) permutations[prev] = true;
      switch (str[prev.length]) {
        case "?":
          permute(prev + "#");
          permute(prev + ".");
          break;
        case ".":
          permute(prev + ".");
          break;
        case "#":
          permute(prev + "#");
          break;
      }
    }
    permute("");
    let temp = 0;
    Object.keys(permutations).forEach((permutedLine) => {
      const splitArr = permutedLine.split(".").filter((elem) => elem);
      if (splitArr.length !== numbersArr.length) return;

      for (let i = 0; i < splitArr.length; i++) {
        if (splitArr[i].length !== parseInt(numbersArr[i])) return;
      }
      temp++;
    });
    result += temp;
  });

  console.log("=====");
  console.log(result);
  return result;
})(input);

// (function solution2(input) {
//   const lines = input.split("\n");
//   let result = 0;

//   lines.forEach((line) => {
//     const [str, numbers] = line.split(" ");
//     const numbersArr = numbers.split(",");

//     const unfoldedStr = [str, str, str, str, str].join("?");
//     const unfoldedNumbersArr = [numbers, numbers, numbers, numbers, numbers]
//       .join(",")
//       .split("");

//     let length = unfoldedStr.length;
//     const permutations = {};

//     function permute(prev) {
//       // console.log("prev", prev);
//       if (prev.length === length) permutations[prev] = true;
//       switch (unfoldedStr[prev.length]) {
//         case "?":
//           permute(prev + "#");
//           permute(prev + ".");
//           break;
//         case ".":
//           permute(prev + ".");
//           break;
//         case "#":
//           permute(prev + "#");
//           break;
//       }
//     }
//     permute("");
//     let temp = 0;
//     Object.keys(permutations).forEach((permutedLine) => {
//       const splitArr = permutedLine.split(".").filter((elem) => elem);
//       if (splitArr.length !== unfoldedNumbers.length) return;

//       for (let i = 0; i < splitArr.length; i++) {
//         if (splitArr[i].length !== parseInt(unfoldedNumbersArr[i])) return;
//       }
//       temp++;
//     });
//     console.table([line, temp]);
//     result += temp;
//   });

//   console.log("=====");
//   console.log(result);
//   return result;
// })(input);
