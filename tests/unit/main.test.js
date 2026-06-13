// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, fizzBuzz, fizzBuzzSingle, fizzBuzzCounts } from "../../src/lib/main.js";

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
  test("returns Fizz for multiples of 3", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
    expect(fizzBuzzSingle(6)).toBe("Fizz");
    expect(fizzBuzzSingle(9)).toBe("Fizz");
  });

  test("returns Buzz for multiples of 5", () => {
    expect(fizzBuzzSingle(5)).toBe("Buzz");
    expect(fizzBuzzSingle(10)).toBe("Buzz");
  });

  test("returns FizzBuzz for multiples of 15", () => {
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
    expect(fizzBuzzSingle(30)).toBe("FizzBuzz");
  });

  test("returns string number for non-multiples", () => {
    expect(fizzBuzzSingle(1)).toBe("1");
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("throws TypeError for non-number", () => {
    expect(() => fizzBuzzSingle("5")).toThrow(TypeError);
    expect(() => fizzBuzzSingle(null)).toThrow(TypeError);
  });

  test("throws TypeError for non-integer", () => {
    expect(() => fizzBuzzSingle(3.14)).toThrow(TypeError);
  });

  test("throws RangeError for non-positive integers", () => {
    expect(() => fizzBuzzSingle(0)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-1)).toThrow(RangeError);
  });
});

describe("fizzBuzz", () => {
  test("returns empty array for n=0", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("returns correct array for n=15", () => {
    const result = fizzBuzz(15);
    expect(result).toHaveLength(15);
    expect(result[0]).toBe("1");
    expect(result[2]).toBe("Fizz");
    expect(result[4]).toBe("Buzz");
    expect(result[14]).toBe("FizzBuzz");
  });

  test("throws TypeError for non-number", () => {
    expect(() => fizzBuzz("5")).toThrow(TypeError);
  });

  test("throws TypeError for non-integer", () => {
    expect(() => fizzBuzz(3.14)).toThrow(TypeError);
  });

  test("throws RangeError for negative integers", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
  });
});

describe("fizzBuzzCounts", () => {
  test("returns zero counts for n=0", () => {
    expect(fizzBuzzCounts(0)).toEqual({ fizz: 0, buzz: 0, fizzbuzz: 0, number: 0 });
  });

  test("returns correct counts for n=15", () => {
    const result = fizzBuzzCounts(15);
    expect(result).toEqual({ fizz: 4, buzz: 2, fizzbuzz: 1, number: 8 });
  });

  test("returns correct counts for n=5", () => {
    const result = fizzBuzzCounts(5);
    expect(result).toEqual({ fizz: 1, buzz: 1, fizzbuzz: 0, number: 3 });
  });

  test("returns correct counts for n=30", () => {
    const result = fizzBuzzCounts(30);
    expect(result).toEqual({ fizz: 8, buzz: 4, fizzbuzz: 2, number: 16 });
  });

  test("throws TypeError for non-number", () => {
    expect(() => fizzBuzzCounts("5")).toThrow(TypeError);
    expect(() => fizzBuzzCounts(null)).toThrow(TypeError);
  });

  test("throws TypeError for non-integer", () => {
    expect(() => fizzBuzzCounts(3.14)).toThrow(TypeError);
  });

  test("throws RangeError for negative integers", () => {
    expect(() => fizzBuzzCounts(-1)).toThrow(RangeError);
  });
});
