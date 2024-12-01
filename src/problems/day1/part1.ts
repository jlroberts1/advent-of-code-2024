// Day 1, Part 1
import input from "./input.txt?raw";

export const problemLink = "https://adventofcode.com/2020/day/1";

export function solve() {
  const [list1, list2] = input
    .split(/\s+/)
    .map(Number)
    .reduce<[number[], number[]]>(
      ([arr1, arr2], num, index) => {
        if (index % 2 === 0) {
          arr1.push(num);
        } else {
          arr2.push(num);
        }
        return [arr1, arr2];
      },
      [[], []],
    )
    .map((arr) => arr.sort((a, b) => a - b));

  return list1.reduce((acc, num, index) => acc + Math.abs(num - list2[index]), 0);
}
