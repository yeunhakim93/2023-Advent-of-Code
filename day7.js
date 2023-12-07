const fs = require("fs");
const input = fs.readFileSync("inputs/day7_input.txt", "utf8");

const strengthObj = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};
(function solution1(input) {
  const lines = input.split("\n");
  let result = 0;
  const mapBid = {};
  const sixTypes = {
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
    const typeObj = {};
    for (value of Object.values(cardsObj)) {
      if (!typeObj[value]) typeObj[value] = 1;
      else typeObj[value] = typeObj[value] + 1;
    }

    if (typeObj[5]) sixTypes.five.push(cards);
    else if (typeObj[4]) sixTypes.four.push(cards);
    else if (typeObj[3]) {
      if (typeObj[2]) sixTypes.full.push(cards);
      else sixTypes.three.push(cards);
    } else if (typeObj[2] === 2) sixTypes.two.push(cards);
    else if (typeObj[2] === 1) sixTypes.one.push(cards);
    else sixTypes.high.push(cards);
  });
  let rank = 1;

  for (key of ["high", "one", "two", "three", "full", "four", "five"]) {
    sixTypes[key] = sixTypes[key].sort((a, b) => {
      for (let i = 0; i < 5; i++) {
        if (strengthObj[a[i]] > strengthObj[b[i]]) return 1;
        else if (strengthObj[a[i]] < strengthObj[b[i]]) return -1;
      }
    });
    console.log("====", key, "====");
    sixTypes[key].forEach((cardStr) => {
      result += mapBid[cardStr] * rank;
      console.log(cardStr, rank, mapBid[cardStr], mapBid[cardStr] * rank);
      rank++;
    });
  }

  console.log("====");
  console.log(result);
  return result;
})(input);
