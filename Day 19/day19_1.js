const fs = require("fs");
const input = fs.readFileSync("inputs/day19_input.txt", "utf8");

(function solution1(input) {
  let result = 0;
  const [workflowsStr, ratingsStr] = input.split("\n\n");
  const workflows = {};
  workflowsStr.split("\n").forEach((workflowStr) => {
    const name = workflowStr.slice(0, workflowStr.indexOf("{"));
    const conditions = workflowStr
      .slice(workflowStr.indexOf("{") + 1, -1)
      .split(",")
      .map((str) => {
        if (str.includes(":")) {
          const [condition, next] = str.split(":");
          if (condition.includes("<") || condition.includes(">")) {
            return new Function(
              "x,m,a,s",
              `if (${condition}) return "${next}"`
            );
          }
        }
        return new Function("", `return "${str}"`);
      });
    workflows[name] = conditions;
  });

  ratingsStr.split("\n").map((str) => {
    const [x, m, a, s] = str.split(",").map((val) => {
      return parseInt(val.replace(/[^0-9]+/g, ""));
    });
    let accepted;
    let currWorkflow = workflows.in;
    while (accepted === undefined) {
      for (let i = 0; i < currWorkflow.length; i++) {
        const afterWorkflow = currWorkflow[i](x, m, a, s);
        if (afterWorkflow === "A") {
          accepted = true;
          break;
        } else if (afterWorkflow === "R") {
          accepted = false;
          break;
        } else if (afterWorkflow === undefined) {
          continue;
        } else {
          currWorkflow = workflows[afterWorkflow];
          break;
        }
      }
    }
    if (accepted) {
      result += x + m + a + s;
    }
  });

  console.log("=====");
  console.log(result);
  return result;
})(input);
