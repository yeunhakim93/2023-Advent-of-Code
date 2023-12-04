const fs = require("fs");
const input = fs.readFileSync("inputs/day3_input.txt", "utf8");

const isNumberObj = {
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

const isNumber = (char) => isNumberObj[char];
const isSymbol = (char) => {
  return char !== "." && !isNumber[char] && char !== undefined;
};

(function solution(input) {
  const mat = input.split("\n").map((line) => line.split(""));
  let result = 0;
  const downLimit = mat.length;
  const rightLimit = mat[0].length;

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      const currChar = mat[i][j];
      if (currChar === "*") {
        result += helper(mat, i, j, rightLimit, downLimit);
      }
    }
  }
  console.log(result);
  return result;
})(input);

function helper(mat, i, j, rightLimit, downLimit) {
  let upLeftBound = j - 1;
  let leftBound = j - 1;
  let downLeftBound = j - 1;

  let upRightBound = j + 1;
  let rightBound = j + 1;
  let downRightBound = j + 1;

  while (i > 0 && mat[i - 1][upLeftBound] !== "." && upLeftBound > 0) {
    upLeftBound--;
  }
  while (mat[i][leftBound] !== "." && leftBound > 0) {
    leftBound--;
  }
  while (
    i < downLimit &&
    mat[i + 1][downLeftBound] !== "." &&
    downLeftBound > 0
  ) {
    downLeftBound--;
  }

  while (
    i > 0 &&
    mat[i - 1][upRightBound] !== "." &&
    upRightBound < rightLimit
  ) {
    upRightBound++;
  }

  while (mat[i][rightBound] !== "." && rightBound < rightLimit) {
    rightBound++;
    console.log(mat[i][rightBound]);
  }
  while (
    i < downLimit &&
    mat[i + 1][downRightBound] !== "." &&
    downRightBound < rightLimit
  ) {
    downRightBound++;
  }

  const upLine =
    i > 0 ? mat[i - 1].slice(upLeftBound, upRightBound) : undefined;
  const currLine = mat[i].slice(leftBound, rightBound);
  const downLine =
    i < downLimit ? mat[i + 1].slice(downLeftBound, downRightBound) : undefined;

  const upArr = [];
  const currArr = [];
  const downArr = [];
  let token = "";
  upLine?.forEach((char) => {
    if (isNumber(char)) token += char;
    if (char === "." || char === " ") {
      if (token) upArr.push(parseInt(token));
      token = "";
    }
  });
  currLine?.forEach((char) => {
    if (isNumber(char)) token += char;
    if (char === "." || char === "*" || char === " ") {
      if (token) currArr.push(parseInt(token));
      token = "";
    }
  });
  downLine?.forEach((char, index) => {
    if (isNumber(char)) token += char;
    if (char === "." || char === "*" || index === downLine.length - 1) {
      if (token) downArr.push(parseInt(token));
      token = "";
    }
  });

  const finalArr = [upArr, currArr, downArr].flat();
  console.log(finalArr);

  if (finalArr.length === 2) return finalArr[0] * finalArr[1];

  return 0;
}
//84708079 too low
