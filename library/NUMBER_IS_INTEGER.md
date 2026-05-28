NUMBER_IS_INTEGER

Table of contents
- Signature
- Behaviour and semantics
- Edge cases and examples
- Usage for input validation
- Reference details
- Detailed digest
- Attribution and crawl size

Normalised extract
Signature
- Number.isInteger(value): boolean

Behaviour and semantics
- Returns true only when value is of the Number type and is an integer (no coercion).
- Equivalent test in ECMAScript specification terms: typeof value === "number" && isFinite(value) && Math.floor(value) === value.
- Examples: Number.isInteger(3) === true; Number.isInteger(3.0) === true; Number.isInteger(3.5) === false; Number.isInteger("3") === false; Number.isInteger(NaN) === false; Number.isInteger(Infinity) === false.

Edge cases and examples
- NaN, Infinity, and non-number types always return false.
- Do not use Number.isInteger to accept numeric strings; that requires explicit parsing.

Usage for input validation (implementation pattern)
- Use as a first-line guard in exported functions that require integer inputs, e.g.:
  - if (!Number.isInteger(n)) throw new TypeError("n must be an integer");
- It is synchronous and cheap; use before other numeric domain checks.

Reference details
- Parameter: value (any)
- Return: boolean
- Behaviour: no coercion, returns true only for finite integer numbers.

Detailed digest
Source: MDN — Number.isInteger
Retrieved: 2026-03-24
Crawl bytes: 154168
Digest (extracted technical content): Number.isInteger is a static method that determines whether the passed value is an integer. It does not coerce types; it returns true for integer numbers and false otherwise. Use this for robust integer validation prior to numeric algorithms.

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
- Crawl bytes: 154168
- Retrieved: 2026-03-24
