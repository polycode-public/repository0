EXPORT

Table of contents
- Export kinds
- Named export syntax
- Default export and re-export
- ES module semantics relevant to repository
- Example export patterns for fizzbuzz
- Reference details (exact syntax)
- Detailed digest
- Attribution and crawl size

Normalised extract
Export kinds
- Named exports: export declarations that expose one or more bindings by name.
- Default export: export default <expression|declaration> to expose a single default binding.
- Re-export: export { name } from "module" or export * from "module".

Named export syntax (exact forms)
- export function fizzBuzz(n) { ... }  — declares and exports the function binding in one statement.
- export const foo = 42; — declare and export a constant binding.
- export { fizzBuzz, fizzBuzzSingle } — exports existing bindings by name.

Importing the named exports
- import { fizzBuzz, fizzBuzzSingle } from './lib/main.js'
  - Requires the exporting module file to use ESM syntax and file extension when running under Node with type: "module".

ES module semantics relevant to repository
- package.json with "type": "module" makes .js files be treated as ESM by Node.js; named exports are immutable live bindings.
- Exported bindings are visible to importers; changes to exported mutable bindings in the module are reflected in importers.

Example export patterns for this mission
- Preferred: export function fizzBuzz(n) { ... }
- Also acceptable: function fizzBuzz(n) { ... } export { fizzBuzz, fizzBuzzSingle }

Reference details (exact syntax examples)
- export function name([param[, ...param]]) { /* body */ }
- export { name1[, name2 as alias2][, ...] }
- export default expression
- import { name } from 'module'

Detailed digest
Source: MDN — export
Retrieved: 2026-03-24
Crawl bytes: 205605
Digest (extracted technical content): The export declaration is used to export values from a JavaScript module; exported values can be imported with import declarations. Use named exports for multiple functions (fizzBuzz, fizzBuzzSingle) and ensure Node executes as ESM by setting package.json "type": "module".

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- Crawl bytes: 205605
- Retrieved: 2026-03-24
