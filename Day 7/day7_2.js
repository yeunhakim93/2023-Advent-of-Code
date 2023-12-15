const fs = require("fs");
const input = fs.readFileSync("inputs/day7_input.txt", "utf8");

const strengthObj = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;
  const mapBid = {};
  const types = {
    five: [],
    four: [],
    full: [],
    three: [],
    two: [],
    one: [],
    high: [],
  };

  lines.forEach((line) => {
    const cardsObj = {};
    const [cards, rank] = line.split(" ");
    mapBid[cards] = parseInt(rank);

    cards.split("").forEach((card) => {
      if (!cardsObj[card]) cardsObj[card] = 1;
      else cardsObj[card] = cardsObj[card] + 1;
    });
    const numCards = {};
    for (value of Object.values(cardsObj)) {
      if (!numCards[value]) numCards[value] = 1;
      else numCards[value] = numCards[value] + 1;
    }
    if (numCards[5]) types.five.push(cards);
    else if (numCards[4]) {
      if (cardsObj.J) types.five.push(cards);
      else types.four.push(cards);
    } else if (numCards[3]) {
      if (cardsObj.J) {
        // 3 J, 2 x
        // 3 x, 2 J
        // act as five
        if (cardsObj.J === 3 || cardsObj.J === 2) types.five.push(cards);
        // 3 x, 1 J, 1 y
        // act as four
        else {
          types.four.push(cards);
        }
      } else {
        if (numCards[2]) types.full.push(cards);
        else types.three.push(cards);
      }
    } else if (numCards[2] === 2) {
      // two pairs
      if (cardsObj.J) {
        // j: 1, x: 2, y: 2
        //act as fullhouse
        if (cardsObj.J === 1) {
          types.full.push(cards);
        }
        // j: 2, x: 2, y: 1
        // act as 4
        else if (cardsObj.J === 2) {
          types.four.push(cards);
        }
      } else types.two.push(cards);
    } else if (numCards[2] === 1) {
      //j j x y z
      //x x j y z
      //act as three
      if (cardsObj.J === 2 || cardsObj.J === 1) types.three.push(cards);
      else types.one.push(cards);
    } else {
      // has one j: act as one pair
      if (cardsObj.J === 1) types.one.push(cards);
      else types.high.push(cards);
    }
  });
  let rank = 1;

  for (key of ["high", "one", "two", "three", "full", "four", "five"]) {
    types[key] = types[key].sort((a, b) => {
      for (let i = 0; i < 5; i++) {
        if (strengthObj[a[i]] > strengthObj[b[i]]) return 1;
        else if (strengthObj[a[i]] < strengthObj[b[i]]) return -1;
      }
    });
    types[key].forEach((cardStr) => {
      result += mapBid[cardStr] * rank;
      rank++;
    });
  }

  console.log("====");
  console.log(result);
  return result;
})(input);

//249929497 not right
//249924419 too low
