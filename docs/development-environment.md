# Development Environment

This document describes the development environment used for the Software Engineering Lab.

## Operating System

* Windows 11

## Code Editor

* Visual Studio Code
* Architecture: x64

## Version Control

* Git: 2.49.0.windows.1
* Default branch: `main`
* GitHub authentication: SSH
* Git editor: Visual Studio Code

## Runtime & Package Managers

### Node.js

* Node.js: v24.11.1
* npm: 11.6.2

### Python

* Python: 3.14.7
* Python environments: project-specific `.venv`
* Python launcher: `py`

## Repository

* Repository: `software-engineering-lab`
* Remote: GitHub
* Default branch: `main`

## Authentication

GitHub authentication is configured using an SSH key.

The connection was verified successfully using:

```bash
ssh -T git@github.com
```

The private SSH key is stored locally and is never committed to the repository.

## Verification

The following tools have been verified and are working:

* Git
* GitHub SSH authentication
* Node.js
* npm
* Python
* Visual Studio Code
