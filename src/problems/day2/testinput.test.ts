import { describe, it, expect } from "vitest";
import { solve } from "./part1";

const isReportSafe = (report: number[]): boolean => {
  return solve(report);
};

describe("Reactor Safety Tests", () => {
  const reports = [
    [7, 6, 4, 2, 1], // Should be safe (decreasing)
    [1, 2, 7, 8, 9], // Should be unsafe (jump too large)
    [9, 7, 6, 2, 1], // Should be unsafe (drop from 6 to 2 too large)
    [1, 3, 2, 4, 5], // Should be unsafe (not consistently increasing/decreasing)
    [8, 6, 4, 4, 1], // Should be unsafe (no change between 4 and 4)
    [1, 3, 6, 7, 9], // Should be safe (increasing)
  ];

  it("should identify safe decreasing sequence", () => {
    expect(isReportSafe(reports[0])).toBe(true);
  });

  it("should identify safe increasing sequence", () => {
    expect(isReportSafe(reports[5])).toBe(true);
  });

  it("should reject sequence with too large jumps", () => {
    expect(isReportSafe(reports[1])).toBe(false);
  });

  it("should reject sequence with too large drops", () => {
    expect(isReportSafe(reports[2])).toBe(false);
  });

  it("should reject non-monotonic sequence", () => {
    expect(isReportSafe(reports[3])).toBe(false);
  });

  it("should reject sequence with no change between levels", () => {
    expect(isReportSafe(reports[4])).toBe(false);
  });

  it("should handle edge cases", () => {
    expect(isReportSafe([])).toBe(true);
    expect(isReportSafe([1])).toBe(true);
    expect(isReportSafe([1, 3])).toBe(true);
    expect(isReportSafe([3, 1])).toBe(true);
  });

  it("should reject sequences with differences exactly 0", () => {
    expect(isReportSafe([1, 1, 1])).toBe(false);
  });

  it("should reject sequences with differences greater than 3", () => {
    expect(isReportSafe([1, 5, 9])).toBe(false);
  });
});
