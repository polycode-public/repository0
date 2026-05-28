# CORE_IMPLEMENTATION

Overview

This feature implements the core FizzBuzz behaviour: two named functions fizzBuzz and fizzBuzzSingle implemented in src/lib/main.js and exported for consumers and tests.

Specification

- fizzBuzz(n): accepts an integer n greater than or equal to 0.
- If n is not an integer throw a TypeError with message n must be an integer.
- If n is negative throw a RangeError with message n must be non-negative.
- If n equals 0 return an empty array.
- Otherwise return an array of length n where the element at index k (0-based) is the fizzbuzz string for integer k+1 using these rules: multiples of 3 map to Fizz, multiples of 5 map to Buzz, multiples of both map to FizzBuzz, otherwise the decimal string of the number.

- fizzBuzzSingle(n): accepts an integer n greater than or equal to 1.
- If n is not an integer throw a TypeError with message n must be an integer.
- If n is less than 1 throw a RangeError with message n must be a positive integer.
- Return one of the strings Fizz, Buzz, FizzBuzz, or the decimal representation of n following the same divisibility rules.

Acceptance Criteria

- fizzBuzz(15) returns an array of length 15 whose last element is FizzBuzz and whose values match the canonical mapping for numbers 1 through 15.
- fizzBuzzSingle(3) returns Fizz.
- fizzBuzzSingle(5) returns Buzz.
- fizzBuzzSingle(15) returns FizzBuzz.
- fizzBuzzSingle(7) returns 7.
- fizzBuzz(0) returns an empty array.
- Passing a non-integer to either function throws a TypeError with message n must be an integer.
- Passing a negative number to fizzBuzz or a non-positive number to fizzBuzzSingle throws the specified RangeError with the messages above.

Implementation Notes

- Use Number.isInteger for type checks and throw new TypeError and new RangeError with the exact messages above so tests can assert type and message.
- Implementation may use an imperative loop with push or Array.from mapping; prefer clarity and consistent behaviour.
- Do not mutate inputs and keep functions pure and synchronous for simple unit testing.
