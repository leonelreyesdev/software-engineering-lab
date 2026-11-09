# TypeScript Development Environment

## Overview

This exercise establishes a basic TypeScript development
environment using Node.js and npm.

## Technologies

- Node.js
- npm
- TypeScript 7.0.2

## Project Location

`exercises/typescript-basics/`

## Installation

From the project directory, install dependencies:

```powershell
npm ci
```

## Available Commands

Check TypeScript types without generating files:

```powershell
npm run typecheck
```

Compile TypeScript into JavaScript:

```powershell
npm run build
```

Execute the compiled application:

```powershell
npm start
```

## Project Structure

- `src/index.ts`: TypeScript source code.
- `tsconfig.json`: TypeScript compiler configuration.
- `package.json`: Project metadata and npm scripts.
- `package-lock.json`: Locked dependency versions.
- `dist/`: Generated JavaScript, excluded from Git.

## Expected Output

Running `npm start` after building produces:

Hello, Leonel! You are in semester 7.

## Engineering Notes

- TypeScript is installed as a local development dependency.
- Strict type checking is enabled.
- Source code is separated from compiled output.
- Dependencies and generated build files are ignored by Git.
- npm scripts provide reproducible development commands.
