const fs = require("fs");
const input = fs.readFileSync("inputs/day4_input.txt", "utf8");

(function solution2(input) {
  const lines = input.split("\n");
  let result = 0;
  let cards = new Array(lines.length + 1).fill(1);
  for (let ind = 0; ind < lines.length; ind++) {
    const line = lines[ind];
    const cardNumber = ind + 1;
    if (cards[cardNumber] === 0) {
      break;
    }
    let belowCards = 0;

    const arr = line.split(":");
    const [winning, myCard] = arr[1].split("|");

    const winningObj = {};
    winning.split(" ").forEach((num) => {
      if (isNaN(parseInt(num))) return;
      winningObj[parseInt(num).toString()] = true;
    });
    myCard.split(" ").forEach((num) => {
      if (winningObj[parseInt(num).toString()]) {
        belowCards++;
      }
    });
    for (let i = cardNumber + 1; i < belowCards + cardNumber + 1; i++) {
      cards[i] = cards[i] + cards[cardNumber];
    }
  }
  cards.forEach((num) => {
    result += num;
  });
  result--;

  console.log("====");
  console.log(result);
  return result;
})(input);
