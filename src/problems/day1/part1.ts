// Day 1, Part 1
import input from "./input.txt?raw";
import { parseList } from "./util";

export const problemLink = "https://adventofcode.com/2020/day/1";

export function solve() {
  const [list1, list2] = parseList(input).map((arr) => arr.sort((a, b) => a - b));
  return list1.reduce((acc, num, index) => acc + Math.abs(num - list2[index]), 0);
}
