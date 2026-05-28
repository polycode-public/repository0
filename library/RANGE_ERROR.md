RANGE_ERROR

Table of contents
- Purpose and when to use
- Constructor signature
- Behaviour and properties
- Usage patterns in validation
- Troubleshooting
- Detailed digest
- Attribution and crawl size

Normalised extract
Purpose and when to use
- RangeError represents runtime errors when a numeric value falls outside the permissible range for an operation or API. Use RangeError to signal out-of-range numeric inputs (for example, negative lengths where only non-negative integers are valid).

Constructor signature
- new RangeError(message?: string): RangeError
  - message: optional diagnostic string provided to the error instance.

Behaviour and properties
- The resulting object is an Error subclass with name property set to "RangeError" and message set to the provided text (or empty string if omitted).
- Typical usages include: invalid array length, numeric argument outside supported interval, or domain errors for numeric functions.

Usage patterns in validation
- If input numeric domain check fails, throw new RangeError("n must be non-negative");
- Use RangeError rather than TypeError when the input type is correct but the numeric value is outside acceptable bounds.

Troubleshooting
- Stack traces will include the throw site and message; ensure messages are specific and machine-friendly to aid test assertions.
- Prefer RangeError for domain violations: tests can assert error name or instanceof RangeError.

Detailed digest
Source: MDN — RangeError
Retrieved: 2026-03-24
Crawl bytes: 155929
Digest (extracted technical content): The RangeError object indicates an error when a value is not in the set or range of allowed values. Construct with new RangeError(message). Use in API validation when numeric values are outside allowed ranges.

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError
- Crawl bytes: 155929
- Retrieved: 2026-03-24
