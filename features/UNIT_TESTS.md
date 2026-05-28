# UNIT_TESTS

Overview

Provide deterministic unit tests that verify correct behaviour for normal inputs and that validation and error cases are handled exactly as specified.

Requirements

- Add tests in tests/unit/main.test.js that import the named exports and assert exact outputs and error behaviour.
- Normal case tests: fizzBuzz(15) equals the canonical 15-element mapping; fizzBuzzSingle(3) equals Fizz; fizzBuzzSingle(5) equals Buzz; fizzBuzzSingle(15) equals FizzBuzz; fizzBuzzSingle(7) equals 7; fizzBuzz(0) equals an empty array.
- Validation tests: passing a string or non-integer number throws TypeError with message n must be an integer; passing a negative number to fizzBuzz or a non-positive number to fizzBuzzSingle throws RangeError with the messages specified in INPUT_VALIDATION.
- Tests must be deterministic and assert deep equality for arrays and exact string equality for single results.

Acceptance Criteria

- A test suite exists and covers the listed acceptance criteria.
- Running the repository test script shows that these tests pass when the implementation meets the specification.
- Tests should fail if implementation deviates from the exact mapping, types of thrown errors, or messages.
