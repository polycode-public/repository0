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

  test("returns the number as a string for non-multiples", () => {
    expect(fizzBuzzSingle(1)).toBe("1");
    expect(fizzBuzzSingle(7)).toBe("7");
    expect(fizzBuzzSingle(22)).toBe("22");
  });

  test("throws TypeError for non-integer input", () => {
    expect(() => fizzBuzzSingle(3.5)).toThrow(TypeError);
    expect(() => fizzBuzzSingle("3")).toThrow(TypeError);
    expect(() => fizzBuzzSingle(null)).toThrow(TypeError);
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
    expect(result[14]).toBe("FizzBuzz");
    expect(result[2]).toBe("Fizz");
    expect(result[4]).toBe("Buzz");
  });

  test("returns empty array for n=0", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("returns correct values in sequence", () => {
    const result = fizzBuzz(5);
    expect(result).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
  });

  test("throws TypeError for non-integer input", () => {
    expect(() => fizzBuzz(3.5)).toThrow(TypeError);
    expect(() => fizzBuzz("15")).toThrow(TypeError);
  });

  test("throws RangeError for negative numbers", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
  });
});
