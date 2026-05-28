# WEB_DEMO

Overview

Provide a minimal interactive demo under src/web that lets a user enter an integer and renders the fizzbuzz results using the library so behaviour is visible in a browser.

Specification

- A minimal page that imports the library, accepts an integer input, validates it with the same rules as the library, and renders the output list for the given n.
- The demo must handle invalid inputs and display the error messages that correspond to TypeError and RangeError behaviours.
- The page should be simple and self-contained so it can be used in the project's web build for manual verification.

Acceptance Criteria

- The local web build loads the demo and shows correct results for n equal to 15 showing FizzBuzz as the last item.
- The demo shows an empty list for n equal to 0 and displays the specified error messages for invalid inputs.
- The demo uses the same exported functions so the web demonstration exercises the same code paths as unit tests.
