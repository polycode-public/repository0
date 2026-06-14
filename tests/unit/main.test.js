// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, fizzBuzz, fizzBuzzSingle, fizzBuzzRange } from "../../src/lib/main.js";

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

  test("returns string number for non-multiples", () => {
    expect(fizzBuzzSingle(1)).toBe("1");
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("throws TypeError for non-number input", () => {
    expect(() => fizzBuzzSingle("3")).toThrow(TypeError);
    expect(() => fizzBuzzSingle(null)).toThrow(TypeError);
  });

  test("throws TypeError for non-integer input", () => {
    expect(() => fizzBuzzSingle(3.5)).toThrow(TypeError);
  });

  test("throws RangeError for non-positive integers", () => {
    expect(() => fizzBuzzSingle(0)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-1)).toThrow(RangeError);
  });
});

describe("fizzBuzz", () => {
  test("returns correct array for n=15", () => {
    const result = fizzBuzz(15);
    expect(result).toHaveLength(15);
    expect(result[0]).toBe("1");
    expect(result[2]).toBe("Fizz");
    expect(result[4]).toBe("Buzz");
    expect(result[14]).toBe("FizzBuzz");
  });

  test("returns empty array for n=0", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("throws TypeError for non-number input", () => {
    expect(() => fizzBuzz("5")).toThrow(TypeError);
    expect(() => fizzBuzz(null)).toThrow(TypeError);
  });

  test("throws TypeError for non-integer input", () => {
    expect(() => fizzBuzz(5.5)).toThrow(TypeError);
  });

  test("throws RangeError for negative numbers", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
  });
});

describe("fizzBuzzRange", () => {
  test("returns correct array for range 1-5", () => {
    const result = fizzBuzzRange(1, 5);
    expect(result).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
  });

  test("returns correct array for range 10-15", () => {
    const result = fizzBuzzRange(10, 15);
    expect(result).toEqual(["Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]);
  });

  test("returns single-element array for start=end", () => {
    expect(fizzBuzzRange(7, 7)).toEqual(["7"]);
    expect(fizzBuzzRange(3, 3)).toEqual(["Fizz"]);
  });

  test("throws TypeError for non-number start", () => {
    expect(() => fizzBuzzRange("1", 5)).toThrow(TypeError);
    expect(() => fizzBuzzRange(null, 5)).toThrow(TypeError);
  });

  test("throws TypeError for non-number end", () => {
    expect(() => fizzBuzzRange(1, "5")).toThrow(TypeError);
    expect(() => fizzBuzzRange(1, null)).toThrow(TypeError);
  });

  test("throws TypeError for non-integer start", () => {
    expect(() => fizzBuzzRange(1.5, 5)).toThrow(TypeError);
  });

  test("throws TypeError for non-integer end", () => {
    expect(() => fizzBuzzRange(1, 5.5)).toThrow(TypeError);
  });

  test("throws RangeError for start < 1", () => {
    expect(() => fizzBuzzRange(0, 5)).toThrow(RangeError);
    expect(() => fizzBuzzRange(-1, 5)).toThrow(RangeError);
  });

  test("throws RangeError for end < 1", () => {
    expect(() => fizzBuzzRange(1, 0)).toThrow(RangeError);
    expect(() => fizzBuzzRange(1, -1)).toThrow(RangeError);
  });

  test("throws RangeError for start > end", () => {
    expect(() => fizzBuzzRange(5, 1)).toThrow(RangeError);
    expect(() => fizzBuzzRange(10, 5)).toThrow(RangeError);
  });
});
