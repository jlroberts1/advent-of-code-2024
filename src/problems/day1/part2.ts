// Day 1, Part 2
import input from "./input.txt?raw";
import { parseList } from "./util";

export const problemLink = "https://adventofcode.com/2020/day/1#part2";

export function solve() {
  const [list1, list2] = parseList(input);

  return list1.reduce((acc, num) => {
    const occurrences = list2.filter((x) => x == num).length;
    return acc + num * occurrences;
  }, 0);
}
