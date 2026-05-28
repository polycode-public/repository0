FIZZ_BUZZ

Table of contents
- Definition and rules
- Function signatures
- Implementation algorithm
- Edge cases and error handling
- Complexity and performance
- Examples
- Supplementary details
- Reference details (API signatures)
- Detailed digest
- Attribution and crawl size

Normalised extract
Definition and rules
For each integer i from 1 to n inclusive:
- if i is divisible by 3 and by 5 then output the string FizzBuzz.
- else if i is divisible by 3 then output the string Fizz.
- else if i is divisible by 5 then output the string Buzz.
- otherwise output the decimal representation of i (no padding, base-10).

Function signatures
- fizzBuzz(n): Array<string>
  - Input: n (integer, n >= 0)
  - Output: array of length n, element k is the fizzbuzz string for integer k+1
- fizzBuzzSingle(n): string
  - Input: n (integer, n >= 1)
  - Output: one of the strings: Fizz, Buzz, FizzBuzz, or the decimal representation of n

Implementation algorithm
1. Validate: require Number.isInteger(n); if false throw TypeError("n must be an integer").
2. Validate non-negative: if n < 0 throw RangeError("n must be non-negative").
3. If n === 0 return an empty array immediately.
4. Allocate output array (recommended: const out = []; or Array.from pattern in Reference details).
5. Loop i from 1 to n inclusive:
   - compute is3 = (i % 3 === 0)
   - compute is5 = (i % 5 === 0)
   - if is3 && is5 push "FizzBuzz"
   - else if is3 push "Fizz"
   - else if is5 push "Buzz"
   - else push String(i)
6. Return out.

Edge cases and error handling
- n === 0: return [] (empty array).
- n < 0: throw new RangeError with a clear message (e.g., "n must be non-negative").
- non-integer n: throw new TypeError (e.g., "n must be an integer").
- Extremely large n: algorithm is O(n) time and O(n) memory; avoid values that will exhaust memory.

Complexity and performance
- Time complexity: O(n) single pass.
- Space complexity: O(n) output array of n strings.
- Micro-optimisations: reuse temporary string variables, prefer integer modulo operations; avoid repeated allocations inside hot loops where measurable.

Examples (explicit mapping for n=15)
1 -> "1"
2 -> "2"
3 -> "Fizz"
4 -> "4"
5 -> "Buzz"
6 -> "Fizz"
7 -> "7"
8 -> "8"
9 -> "Fizz"
10 -> "Buzz"
11 -> "11"
12 -> "Fizz"
13 -> "13"
14 -> "14"
15 -> "FizzBuzz"

Supplementary details
- Use Number.isInteger for validation to avoid coercion (Number.isInteger("3") is false).
- Prefer explicit RangeError/TypeError to communicate caller mistakes to consumers.
- Two common construction patterns for fizzBuzz:
  - Imperative push loop (preferred for clarity and performance): allocate empty array and push results.
  - Mapping construction: Array.from({ length: n }, (_, i) => fizzBuzzSingle(i + 1)) — concise and functional.

Reference details (API signatures and exact behaviours)
- Exported bindings (ES module): export function fizzBuzz(n): Array<string>
- Exported bindings (ES module): export function fizzBuzzSingle(n): string
- Validation helpers:
  - Number.isInteger(value): boolean — returns true iff typeof value is "number" and value is an integer.
  - new TypeError(message?: string): TypeError — use for type validation failures.
  - new RangeError(message?: string): RangeError — use for out-of-range numeric inputs (e.g., negative n).
- Array methods used:
  - Array.prototype.push(...items): number — appends items and returns new length.
  - Array.from(arrayLike[, mapFn[, thisArg]]): Array — creates array of specified length via mapping.

Detailed digest
Source section: https://en.wikipedia.org/wiki/Fizz_buzz
Retrieved: 2026-03-24
Crawl bytes: 63473
Digest (extracted technical content): Fizz Buzz is a simple counting game where multiples of three are replaced by the word "Fizz", multiples of five by "Buzz" and multiples of both by "FizzBuzz"; used as an interview/training exercise to exercise control flow and modular arithmetic. Implementation requires only integer arithmetic and string construction for output.

Attribution
- Source: Wikipedia — https://en.wikipedia.org/wiki/Fizz_buzz
- Crawl bytes: 63473
- Retrieved: 2026-03-24
