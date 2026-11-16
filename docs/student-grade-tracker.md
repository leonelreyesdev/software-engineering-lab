
# Student Grade Tracker

## Overview

A TypeScript console application that calculates student
grade averages and determines pass/fail status.

Developed as part of GitHub Issue #6.

## Technologies

- TypeScript
- Node.js
- Vitest

## Concepts Practiced

- Interfaces and typed objects
- Arrays and functions
- Union types
- Conditional logic
- Array reduction
- Modular programming
- Automated unit testing

## Project Structure

- `src/grade-tracker.ts`: Student data and console output
- `src/grade-utils.ts`: Reusable calculations and types
- `src/grade-utils.test.ts`: Automated unit tests

## Run the Application

From `exercises/typescript-basics`:

```powershell
npm ci
npm run typecheck
npm run build
npm run tracker
```

## Run Automated Tests

```powershell
npm test
```

## Expected Results

| Student | Average | Status |
| --- | --- | --- |
| Leonel | 91.67 | PASS |
| Carlos | 65.00 | FAIL |
| Sofia | 90.00 | PASS |
| Maria | N/A | NO GRADES |

## Business Rules

- Passing average: 70 or higher.
- Average below 70: FAIL.
- Empty grade list: NO GRADES.
- An empty grade list returns `null`, preventing division by zero.
- Non-finite grades or averages (`NaN`, `Infinity`)
  are rejected with a `RangeError`.

## Verification

Six automated tests cover average calculations,
empty grade lists, single grades, passing thresholds,
failing grades, and missing grades.
