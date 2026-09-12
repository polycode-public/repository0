// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { fizzBuzz, fizzBuzzSingle } from "../../src/lib/main.js";

describe("fizzBuzzSingle", () => {
  test("returns Fizz for multiples of 3 only", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
    expect(fizzBuzzSingle(6)).toBe("Fizz");
    expect(fizzBuzzSingle(9)).toBe("Fizz");
  });

  test("returns Buzz for multiples of 5 only", () => {
    expect(fizzBuzzSingle(5)).toBe("Buzz");
    expect(fizzBuzzSingle(10)).toBe("Buzz");
  });

  test("returns FizzBuzz for multiples of both 3 and 5", () => {
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
    expect(fizzBuzzSingle(30)).toBe("FizzBuzz");
  });

  test("returns the number as a string for other values", () => {
    expect(fizzBuzzSingle(1)).toBe("1");
    expect(fizzBuzzSingle(2)).toBe("2");
    expect(fizzBuzzSingle(4)).toBe("4");
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("throws TypeError for non-integers", () => {
    expect(() => fizzBuzzSingle(1.5)).toThrow(TypeError);
    expect(() => fizzBuzzSingle("3")).toThrow(TypeError);
    expect(() => fizzBuzzSingle(null)).toThrow(TypeError);
  });

  test("throws RangeError for negative numbers", () => {
    expect(() => fizzBuzzSingle(-1)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-15)).toThrow(RangeError);
  });
});

describe("fizzBuzz", () => {
  test("returns correct 15-element array ending with FizzBuzz", () => {
    const result = fizzBuzz(15);
    expect(result).toHaveLength(15);
    expect(result[14]).toBe("FizzBuzz");
    expect(result[2]).toBe("Fizz");
    expect(result[4]).toBe("Buzz");
    expect(result[0]).toBe("1");
  });

  test("returns empty array for 0", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("returns array of correct length", () => {
    expect(fizzBuzz(1)).toHaveLength(1);
    expect(fizzBuzz(5)).toHaveLength(5);
    expect(fizzBuzz(20)).toHaveLength(20);
  });

  test("throws TypeError for non-integers", () => {
    expect(() => fizzBuzz(1.5)).toThrow(TypeError);
    expect(() => fizzBuzz("5")).toThrow(TypeError);
    expect(() => fizzBuzz(null)).toThrow(TypeError);
  });

  test("throws RangeError for negative numbers", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
    expect(() => fizzBuzz(-10)).toThrow(RangeError);
  });
});
