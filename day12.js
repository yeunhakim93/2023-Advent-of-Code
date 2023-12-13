const fs = require("fs");
const input = fs.readFileSync("inputs/day12_input.txt", "utf8");

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;

  lines.forEach((line) => {
    console.log(line);
    if (!line.length) return;
    const [str, numbers] = line.split(" ");
    console.log("UNICORN", str, numbers);
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
    let temp = 0;
    permute("");
    // console.log(Object.keys(permutations));
    Object.keys(permutations).forEach((permutedLine) => {
      const splitArr = permutedLine.split(".").filter((elem) => elem);
      // console.log(splitArr);
      if (splitArr.length !== numbersArr.length) return;

      for (let i = 0; i < splitArr.length; i++) {
        if (splitArr[i].length !== parseInt(numbersArr[i])) return;
      }
      temp++;
    });
    result += temp;
    console.log(line, temp);
  });

  console.log("=====");
  console.log(result);
  return result;
})(input);
