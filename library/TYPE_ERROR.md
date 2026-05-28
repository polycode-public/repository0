TYPE_ERROR

Table of contents
- Purpose and typical uses
- Constructor signature
- Behaviour and properties
- Usage patterns for validation
- Troubleshooting and test patterns
- Detailed digest
- Attribution and crawl size

Normalised extract
Purpose and typical uses
- TypeError represents runtime errors when an operation is applied to a value of an inappropriate type (for example, passing a string where an integer is required).

Constructor signature
- new TypeError(message?: string): TypeError
  - message: optional diagnostic string.

Behaviour and properties
- The Error subclass has name property set to "TypeError" and a message string.
- Use TypeError when the caller has supplied an argument of unexpected type (e.g., non-integer where integer required).

Usage patterns for validation
- For fizzBuzz library functions, guard inputs with Number.isInteger; on failure throw new TypeError("n must be an integer");
- Distinguish from RangeError: use TypeError when the type is wrong, RangeError when the numeric value is out of allowed range.

Troubleshooting and test patterns
- Tests should assert that invalid type inputs cause TypeError (assert.throws(() => fn("x"), TypeError)).
- Provide clear, stable error messages to make tests deterministic.

Detailed digest
Source: MDN — TypeError
Retrieved: 2026-03-24
Crawl bytes: 154128
Digest (extracted technical content): The TypeError object represents an error when an operation could not be performed because a value is not of the expected type. Construct with new TypeError(message).

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
- Crawl bytes: 154128
- Retrieved: 2026-03-24
