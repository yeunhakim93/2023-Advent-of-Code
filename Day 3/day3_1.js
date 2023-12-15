const fs = require("fs");
const input = fs.readFileSync("inputs/day3_input.txt", "utf8");
const isNumber = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

const isSymbol = (char) => {
  return char !== "." && !isNumber[char] && char !== undefined;
};

(function solution(input) {
  const mat = input.split("\n").map((line) => line.split(""));
  let result = 0;

  for (let i = 0; i < mat.length; i++) {
    let part = "";
    let isValid = false;

    for (let j = 0; j < mat[0].length; j++) {
      const currChar = mat[i][j];
      // console.log(currChar);
      if (isNumber[currChar]) {
        part += currChar;
        if (i > 0 && isSymbol(mat[i - 1][j])) {
          console.log("up", mat[i - 1][j]);
          isValid = true;
        }
        if (j > 0 && isSymbol(mat[i][j - 1])) {
          console.log("left", mat[i][j - 1]);
          isValid = true;
        }
        if (i < mat.length - 1 && isSymbol(mat[i + 1][j])) {
          console.log("down", mat[i + 1][j]);
          isValid = true;
        }
        if (j < mat[0].length - 1 && isSymbol(mat[i][j + 1])) {
          console.log("right", mat[i][j + 1]);
          isValid = true;
        }

        if (i > 0 && j > 0 && isSymbol(mat[i - 1][j - 1])) {
          console.log("up left", mat[i - 1][j - 1]);
          isValid = true;
        }

        if (i > 0 && j < mat[0].length - 1 && isSymbol(mat[i - 1][j + 1])) {
          console.log("up right", mat[i - 1][j + 1]);
          isValid = true;
        }

        if (i < mat.length - 1 && j > 0 && isSymbol(mat[i + 1][j - 1])) {
          console.log("down left", mat[i + 1][j - 1]);
          isValid = true;
        }

        if (
          i < mat.length - 1 &&
          j < mat[0].length - 1 &&
          isSymbol(mat[i + 1][j + 1])
        ) {
          console.log("down right", mat[i + 1][j + 1]);
          isValid = true;
        }
      }

      if (!isNumber[currChar] || j === mat[0].length - 1) {
        // console.log("hi", part);
        if (isValid) {
          console.log("part!!!", part);
          result += parseInt(part);
          isValid = false;
        }
        part = "";
      }
      // console.log(part, currChar, isSymbol(currChar), j, mat[0].length - 1);
    }
  }
  console.log(result);
  return result;
})(input);
