const fs = require("fs");
const input = fs.readFileSync("inputs/day5_input.txt", "utf8");

(function solution(input) {
  const lines = input.split("\n");
  let result = 0;
  const seedsToSoilObj = {};
  lines[0]
    .split(" ")
    .slice(1)
    .forEach((seedNum) => (seedsToSoilObj[seedNum] = parseInt(seedNum)));

  const soilToFertObj = {};
  const fertToWaterObj = {};
  const waterToLightObj = {};
  const lightToTempObj = {};
  const tempToHumObj = {};
  const humToLocObj = {};

  let i = 1;
  while (i < lines.length) {
    if (lines[i] === "seed-to-soil map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in seedsToSoilObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              seedsToSoilObj[key] = seedsToSoilObj[key] + (dest - src);
            } else {
              seedsToSoilObj[key] = seedsToSoilObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
      for (key in seedsToSoilObj) {
        const value = seedsToSoilObj[key];
        soilToFertObj[value] = parseInt(value);
      }
    } else if (lines[i] === "soil-to-fertilizer map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in soilToFertObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              soilToFertObj[key] = soilToFertObj[key] + (dest - src);
            } else {
              soilToFertObj[key] = soilToFertObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
      for (key in soilToFertObj) {
        const value = soilToFertObj[key];
        fertToWaterObj[value] = parseInt(value);
      }
    } else if (lines[i] === "fertilizer-to-water map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in fertToWaterObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              fertToWaterObj[key] = fertToWaterObj[key] + (dest - src);
            } else {
              fertToWaterObj[key] = fertToWaterObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
      for (key in fertToWaterObj) {
        const value = fertToWaterObj[key];
        waterToLightObj[value] = parseInt(value);
      }
    } else if (lines[i] === "water-to-light map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in waterToLightObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              waterToLightObj[key] = waterToLightObj[key] + (dest - src);
            } else {
              waterToLightObj[key] = waterToLightObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
      for (key in waterToLightObj) {
        const value = waterToLightObj[key];
        lightToTempObj[value] = parseInt(value);
      }
    } else if (lines[i] === "light-to-temperature map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in lightToTempObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              lightToTempObj[key] = lightToTempObj[key] + (dest - src);
            } else {
              lightToTempObj[key] = lightToTempObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
      for (key in lightToTempObj) {
        const value = lightToTempObj[key];
        tempToHumObj[value] = parseInt(value);
      }
    } else if (lines[i] === "temperature-to-humidity map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in tempToHumObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              tempToHumObj[key] = tempToHumObj[key] + (dest - src);
            } else {
              tempToHumObj[key] = tempToHumObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
      for (key in tempToHumObj) {
        const value = tempToHumObj[key];
        humToLocObj[value] = parseInt(value);
      }
    } else if (lines[i] === "humidity-to-location map:") {
      i++;
      while (lines[i]) {
        const [destStr, srcStr, rangeStr] = lines[i].split(" ");
        const [dest, src, range] = [
          parseInt(destStr),
          parseInt(srcStr),
          parseInt(rangeStr),
        ];
        for (key in humToLocObj) {
          if (key >= src && key < src + range) {
            if (src < dest) {
              humToLocObj[key] = humToLocObj[key] + (dest - src);
            } else {
              humToLocObj[key] = humToLocObj[key] - (src - dest);
            }
          }
        }
        i++;
      }
    }
    i++;
  }
  for (seed in seedsToSoilObj) {
    const soil = seedsToSoilObj[seed] || seed;
    const fert = soilToFertObj[soil] || soil;
    const water = fertToWaterObj[fert] || fert;
    const light = waterToLightObj[water] || water;
    const temp = lightToTempObj[light] || light;
    const hum = tempToHumObj[temp] || temp;
    const loc = humToLocObj[hum] || hum;

    if (!result || loc < result) result = loc;
  }

  console.log("====");
  console.log(result);
  return result;
})(input);
