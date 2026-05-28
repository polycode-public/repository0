ARRAY

Table of contents
- Core concepts
- Relevant constructors and static helpers
- Prototype methods used by fizzbuzz
- Creation patterns for fixed-length results
- Performance notes
- Reference details (method signatures)
- Detailed digest
- Attribution and crawl size

Normalised extract
Core concepts
- Array is the ordered collection type for JavaScript. Arrays hold zero or more values at numeric indices starting at 0 and expose length and prototype methods.

Relevant constructors and static helpers
- new Array(length) — creates an array with the given numeric length (sparse if not filled).
- Array.from(arrayLike[, mapFn[, thisArg]]) — creates and optionally maps values to a new Array; commonly used to construct arrays of length n.

Prototype methods used by fizzbuzz
- Array.prototype.push(...items): number — appends items to the array and returns the new length. Commonly used in imperative assembly loops.
- Array.prototype.map(callbackFn[, thisArg]): Array — transforms an array into another array using callback results.

Creation patterns for fixed-length results
- Imperative: const out = []; for loop and out.push(value);
- Declarative: Array.from({ length: n }, (_, i) => fizzBuzzSingle(i + 1)) — creates an array of length n by mapping index to a value.

Performance notes
- push() amortised O(1).
- Array.from builds and maps in a single pass; avoids manual push overhead in some engines but is conceptually similar O(n).
- Avoid creating excessively large arrays; memory grows roughly with number of elements times average element string length.

Reference details (method signatures)
- Array.from(arrayLike[, mapFn[, thisArg]]): Array
  - arrayLike: object with length property
  - mapFn: optional function (value, index) => mappedValue
- Array.prototype.push(...items): number
  - returns the new length (Number)
- Array.prototype.map(callbackFn[, thisArg]): Array
  - callbackFn: (value, index, array) => mappedValue

Detailed digest
Source: MDN — Array
Retrieved: 2026-03-24
Crawl bytes: 236068
Digest (extracted technical content): Array is the built-in ordered collection type; methods like push, map and static helpers like Array.from are the primary tools for constructing and transforming arrays. For fizzbuzz, either imperative push or Array.from mapping are idiomatic.

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- Crawl bytes: 236068
- Retrieved: 2026-03-24
