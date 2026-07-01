// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, fizzBuzz, fizzBuzzSingle } from "../../src/lib/main.js";

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Library Identity", () => {
  test("exports name, version, and description", () => {
    expect(typeof name).toBe("string");
    expect(typeof version).toBe("string");
    expect(typeof description).toBe("string");
    expect(name.length).toBeGreaterThan(0);
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("getIdentity returns correct structure", () => {
    const identity = getIdentity();
    expect(identity).toEqual({ name, version, description });
  });
});

describe("fizzBuzzSingle", () => {
  test("returns 'Fizz' for multiples of 3", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
    expect(fizzBuzzSingle(6)).toBe("Fizz");
    expect(fizzBuzzSingle(9)).toBe("Fizz");
  });

  test("returns 'Buzz' for multiples of 5", () => {
    expect(fizzBuzzSingle(5)).toBe("Buzz");
    expect(fizzBuzzSingle(10)).toBe("Buzz");
  });

  test("returns 'FizzBuzz' for multiples of 15", () => {
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
    expect(fizzBuzzSingle(30)).toBe("FizzBuzz");
  });

  test("returns the number as a string for other values", () => {
    expect(fizzBuzzSingle(1)).toBe("1");
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("throws TypeError for non-integers", () => {
    expect(() => fizzBuzzSingle(3.5)).toThrow(TypeError);
    expect(() => fizzBuzzSingle("5")).toThrow(TypeError);
  });

  test("throws RangeError for non-positive integers", () => {
    expect(() => fizzBuzzSingle(0)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-1)).toThrow(RangeError);
  });
});

describe("fizzBuzz", () => {
  test("returns an array from 1 to n with correct FizzBuzz values", () => {
    const result = fizzBuzz(15);
    expect(result).toEqual([
      "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz",
      "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"
    ]);
  });

  test("returns an empty array for n = 0", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("returns an array of length n", () => {
    expect(fizzBuzz(10).length).toBe(10);
    expect(fizzBuzz(20).length).toBe(20);
  });

  test("throws TypeError for non-integers", () => {
    expect(() => fizzBuzz(3.5)).toThrow(TypeError);
    expect(() => fizzBuzz("10")).toThrow(TypeError);
  });

  test("throws RangeError for negative numbers", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
  });
});
