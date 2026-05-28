# INPUT_VALIDATION

Overview

Define exact input validation rules and stable error messages so unit tests can assert both error type and message text.

Specification

- Use Number.isInteger for type checks.
- For non-integer inputs throw a TypeError with message n must be an integer.
- For fizzBuzz: when n is negative throw a RangeError with message n must be non-negative.
- For fizzBuzzSingle: when n is less than 1 throw a RangeError with message n must be a positive integer.
- Validation must be deterministic and occur before any heavy computation.

Acceptance Criteria

- Non-integer inputs result in TypeError with message n must be an integer for both functions.
- Out of range numeric inputs result in RangeError with the exact messages specified above.
- Tests assert both the error Constructor (TypeError or RangeError) and the message text to avoid flaky assertions.
