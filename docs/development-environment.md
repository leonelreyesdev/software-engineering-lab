# Development Environment

This document describes the development environment used for the Software Engineering Lab.

## Operating System

* Windows 11

## Code Editor

* Visual Studio Code
* Architecture: x64
* Workspace configuration and daily workflow: [VS Code workflow and recovery](vscode-workflow.md)

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

* VS Code workspace interpreter: Python 3.14.7
* Outside a virtual environment, `python` on PATH still reports 3.14.0; `py -3.14` selects 3.14.7.
* Existing Python installations and PATH are preserved.
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
