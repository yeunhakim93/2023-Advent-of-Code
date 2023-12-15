const fs = require("fs");
const input = fs.readFileSync("inputs/day15_input.txt", "utf8");

class LinkedList {
  constructor(label, focal) {
    if (label && focal) {
      this.head = new ListNode(label, focal);
      this.tail = this.head;
      this.length = 1;
      return;
    }
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  printAll() {
    let currNode = this.head;
    let result = "";
    while (currNode) {
      result += `[${currNode.label} ${currNode.focal}] ->`;
      currNode = currNode.next;
    }
    console.log(result);
  }
  add(label, focal) {
    const newNode = new ListNode(label, focal);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.head.label === label) {
        this.head.focal = focal;
        return;
      }

      let currNode = this.head;
      while (currNode) {
        if (currNode.next?.label === label) {
          currNode.next.focal = focal;
          return;
        }
        currNode = currNode.next;
      }

      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  remove(label) {
    if (!this.head) return;
    if (this.head.label === label) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        return;
      }
      this.head = this.head.next;
      this.length--;
      return;
    }

    let currNode = this.head;
    while (currNode) {
      if (currNode.next?.label === label) {
        if (currNode.next === this.tail) {
          this.tail = currNode;
        }
        currNode.next = currNode.next.next;
        this.length--;
        return;
      }
      currNode = currNode.next;
    }
  }
  getPower() {
    let currNode = this.head;
    let power = 0;
    let pointer = 1;
    while (currNode) {
      power += pointer * currNode.focal;
      currNode = currNode.next;
      pointer++;
    }
    return power;
  }
}

class ListNode {
  constructor(label, focal) {
    this.label = label;
    this.focal = focal;
    this.next = null;
  }
}

(function solution2(input) {
  let result = 0;
  const boxes = {};
  input.split(",").forEach((step) => {
    let label = "";
    let focal = "";
    let isAdding = false;
    let boxDestination = 0;

    for (let i = 0; i < step.length; i++) {
      if (step[i] === "=" || step[i] === "-") {
        label.split("").forEach((letter) => {
          boxDestination += letter.charCodeAt(0);
          boxDestination = (boxDestination * 17) % 256;
        });
        isAdding = step[i] === "=";
        focal = step[++i];
      } else if (step[i] !== "-") {
        label += step[i];
      }
    }
    console.log({ label, isAdding, boxDestination });
    if (isAdding) {
      if (boxes[boxDestination]) {
        boxes[boxDestination].add(label, focal);
      } else {
        boxes[boxDestination] = new LinkedList(label, focal);
      }
    } else {
      if (boxes[boxDestination]) boxes[boxDestination].remove(label);
    }
  });

  for (box in boxes) {
    const boxNum = parseInt(box) + 1;
    result += boxNum * boxes[box].getPower();
  }
  console.log("=====");
  console.log(result);
  return result;
})(input);
