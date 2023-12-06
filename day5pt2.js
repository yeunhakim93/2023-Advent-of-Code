const fs = require("fs");
const input = fs.readFileSync("inputs/day5_input.txt", "utf8");

(function solution(input) {
  const lines = input.split("\n");
  let result = 0;
  const seedsArr = lines[0].split(" ").slice(1);
  const seedRangeObj = {};
  for (let i = 0; i < seedsArr.length; i = i + 2) {
    const start = parseInt(seedsArr[i]);
    const range = parseInt(seedsArr[i + 1]);
    seedRangeObj[start] = { end: start + range - 1, diff: 0 };
  }
  console.log(seedRangeObj);
  const seedToSoilRangeobj = {};
  const soilToFertRangeobj = {};
  const fertToWaterRangeobj = {};
  const waterToLightRangeobj = {};
  const lightToTempRangeobj = {};
  const tempToHumRangeobj = {};
  const humToLocRangeobj = {};

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
        seedToSoilRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
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
        soilToFertRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
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
        fertToWaterRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
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
        waterToLightRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
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
        lightToTempRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
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
        tempToHumRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
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
        humToLocRangeobj[src] = { end: src + range - 1, diff: dest - src };
        i++;
      }
    }
    i++;
  }
  console.log({
    seedRangeObj,
    seedToSoilRangeobj,
    soilToFertRangeobj,
    fertToWaterRangeobj,
    waterToLightRangeobj,
    lightToTempRangeobj,
    tempToHumRangeobj,
    humToLocRangeobj,
  });
  let resultRangeObj = { ...seedRangeObj };

  [
    seedToSoilRangeobj,
    soilToFertRangeobj,
    fertToWaterRangeobj,
    waterToLightRangeobj,
    lightToTempRangeobj,
    tempToHumRangeobj,
    humToLocRangeobj,
  ].forEach((currRangeObj) => {
    const combinedObj = {};

    // const startAndEndArr = [
    //   ...Object.keys(combinedObj),
    //   ...Object.values(combinedObj).map((range) => range.end),
    // ];

    for (srcRange in resultRangeObj) {
      const srcStart = parseInt(srcRange);
      const srcEnd = resultRangeObj[srcRange].end;
      const srcDiff = resultRangeObj[srcRange].diff;

      for (destRange in currRangeObj) {
        const destStart = parseInt(destRange);
        const destEnd = currRangeObj[destRange].end;
        const destDiff = currRangeObj[destRange].diff;
        console.log({
          srcStart,
          srcEnd,
          srcDiff,
          destStart,
          destEnd,
          destDiff,
        });
        if (srcStart === destStart && destStart === srcStart) {
          combinedObj[destStart] = { end: destEnd, diff: destDiff + srcDiff };
        } else if (srcStart < destStart && srcEnd > destStart) {
          combinedObj[srcStart] = {
            end: parseInt(destStart) - 1,
            diff: srcDiff,
          };
          if (srcEnd > destEnd) {
            //A
            combinedObj[destStart] = {
              end: parseInt(destEnd),
              diff: srcDiff + destDiff,
            };
            combinedObj[destEnd + 1] = { end: parseInt(srcEnd), diff: srcDiff };
          } else if (srcEnd === destEnd) {
            //B
            combinedObj[destStart] = {
              end: parseInt(destEnd),
              diff: srcDiff + destDiff,
            };
          } else {
            //C
            combinedObj[destStart] = {
              end: parseInt(srcEnd),
              diff: srcDiff + destDiff,
            };
            combinedObj[srcEnd + 1] = {
              end: parseInt(destEnd),
              diff: destDiff,
            };
          }
        } else if (srcStart < destStart && destEnd > srcStart) {
          combinedObj[destStart] = {
            end: parseInt(srcStart) - 1,
            diff: destDiff,
          };
          //srcStart > destStart
          if (srcEnd < destEnd) {
            // D
            combinedObj[srcStart] = {
              end: parseInt(srcEnd),
              diff: srcDiff + destDiff,
            };
            combinedObj[srcEnd + 1] = {
              end: parseInt(destEnd),
              diff: destDiff,
            };
          } else if (srcEnd === destEnd) {
            // E
            combinedObj[srcStart] = {
              end: parseInt(srcEnd),
              diff: srcDiff + destDiff,
            };
          } else {
            // F
            combinedObj[srcStart] = {
              end: parseInt(destEnd),
              diff: srcDiff + destDiff,
            };
            combinedObj[destEnd + 1] = { end: parseInt(srcEnd), diff: srcDiff };
          }
        } else if (srcEnd < destStart || srcEnd > destStart) {
          combinedObj[srcStart] = { end: srcEnd, diff: srcDiff };
          combinedObj[destStart] = { end: destEnd, diff: destDiff };
        }
      }
      console.log("combinedObj", combinedObj);
    }

    resultRangeObj = combinedObj;
  });
  console.log("resultRangeObj", resultRangeObj);

  console.log("====");
  console.log(result);
  return result;
})(input);
