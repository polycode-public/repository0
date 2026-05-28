# EXPORTS

Overview

Ensure the module exposes both fizzBuzz and fizzBuzzSingle as named exports from src/lib/main.js so consumers can import them using standard ES module named import syntax.

Specification

- Export two named bindings: fizzBuzz and fizzBuzzSingle from src/lib/main.js.
- Tests, examples, and the web demo must import the functions using named import syntax and should not rely on default export behaviour.

Acceptance Criteria

- Importing the module with ES module named imports yields callable functions fizzBuzz and fizzBuzzSingle.
- Tests and examples import the named bindings directly and call them without runtime transforms.

Implementation Notes

- package.json already sets type to module; ensure the source file uses named exports or an export list so import { fizzBuzz, fizzBuzzSingle } works in Node and browser builds.
