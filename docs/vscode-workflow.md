# VS Code workflow and recovery

Configured on November 12, 2026 for this Windows installation. These settings are
local to this laptop unless explicitly described as user settings.

## Reopen and continue

1. Start VS Code. Its existing `window.restoreWindows` default (`all`) restores
   previously open windows and tabs. VS Code is not configured to start with Windows.
2. If the repository is not open, use **File > Open Recent**, or run:

   ```powershell
   code C:\Users\leone\dev\software-engineering-lab
   ```

3. Confirm the branch before editing:

   ```powershell
   git status --short --branch
   ```

   Continue the existing feature branch for unfinished work. The environment work
   was prepared on `chore/vscode-environment-optimization` from merge `dad3e31`.
4. Open **Terminal > New Terminal** when needed. PowerShell 7 is the workspace
   default. Restored terminal output is historical; verify the current directory
   and restart any development servers or Python processes you need.
5. Run **Tasks: Run Task** from the Command Palette and choose the task below.
   Dependencies are already installed for this exercise; do not run `npm ci` at
   every startup. Use it when restoring missing dependencies or intentionally
   synchronizing them with the lockfile.

## TypeScript commands and debugging

The npm project is `exercises/typescript-basics`, not the repository root.
From a terminal at the repository root:

```powershell
npm.cmd --prefix exercises/typescript-basics run typecheck
npm.cmd --prefix exercises/typescript-basics run build
npm.cmd --prefix exercises/typescript-basics start
```

`npm.cmd` explicitly selects the Windows command shim. It does not require
changing PowerShell execution policy. Ordinary `npm` also works with the current
`RemoteSigned` policy.

| VS Code task | Behavior |
| --- | --- |
| TypeScript: typecheck | Runs `tsc --noEmit` through the project's npm script |
| TypeScript: build | Compiles the project; default build task (`Ctrl+Shift+B`) |
| TypeScript: run | Builds first, then runs the compiled program |

Select **Debug TypeScript basics** in Run and Debug, set a breakpoint with `F9`,
and press `F5`. The launch configuration runs the build task first and uses the
existing source maps to map `dist/index.js` back to `src/index.ts`.
The verification breakpoint is on line 2. At that breakpoint, `name` should be
`Leonel` and `semester` should be `7`. Press `F5` again to continue.
Expected output: `Hello, Leonel! You are in semester 7.`

Use **Debug current Python file** only while a Python file is active. It uses the
selected workspace interpreter. Both launch configurations use the Debug Console;
programs requiring interactive input should use `integratedTerminal` instead.

## Configuration scope

| Location | Purpose |
| --- | --- |
| `%APPDATA%\Code\User\settings.json` | Existing personal preferences plus two restoration settings |
| `.vscode/settings.json` | This repository's editor, terminal, Git, and language settings |
| `.vscode/tasks.json` | Build, typecheck, and run tasks |
| `.vscode/launch.json` | TypeScript and current-file Python debugging |
| VS Code workspace storage | Extension enablement and interpreter/SDK selections |
| `.vscode/verification/` | Isolated verification probes and local evidence |

The existing `.gitignore` ignores `.vscode/`. None of those files are force-added
or committed. They persist on this laptop across branch switches and restarts,
but a fresh clone will not contain them. Keep backups when moving to a new laptop.
The documentation is the only intended version-controlled change in this task.

### Personal restoration settings

Only these two settings were added to the existing user settings:

```json
{
  "files.hotExit": "onExitAndWindowClose",
  "terminal.integrated.persistentSessionReviveProcess": "onExitAndWindowClose"
}
```

All original user preferences were preserved, including the icon theme, preview
behavior, Jupyter settings, Java configuration, and global Python default.
No custom keybindings file existed, and none was created.

Window restoration (`all`) and persistent terminal sessions (`true`) already had
suitable defaults and were left at those defaults. Hot Exit keeps unsaved editor
buffers; it is not a replacement for saving files or Git commits. Terminal revival
restores output and starts a shell. It does not preserve running programs, Python
variables, debugger sessions, or development servers through a laptop shutdown.

### Workspace editing and languages

- Auto Save uses `onFocusChange`: moving away from a modified editor saves it.
- TypeScript/JavaScript (including TSX/JSX) use the official TypeScript 7 formatter.
- JSON/JSONC use VS Code's built-in JSON formatter.
- Python uses the already-installed Microsoft Black Formatter.
- Format on Save is enabled for those language groups, not globally for every file.
- Python analysis uses Pylance's `basic` type checking mode.
- PowerShell is the workspace's default terminal profile.

Formatting controls layout. Type checking detects type errors. Neither is a
complete linting policy. No ESLint, Prettier, Ruff, or additional paid service was
introduced. Add a project linter when the project needs agreed lint rules.

### Native TypeScript language service

Installed extension: `typescriptteam.native-preview` (official TypeScript 7,
version 1.0.2 at configuration time).
The compiler dependency remains the existing local TypeScript 7.0.2 package.
No global TypeScript installation was added.

```json
{
  "js/ts.experimental.useTsgo": true,
  "js/ts.tsdk.path": "./exercises/typescript-basics/node_modules/typescript",
  "js/ts.trace.server": "off"
}
```

The SDK path points to the package directory, not a traditional `lib/tsserver.js`;
the native package does not contain that old server entry point. The extension
also ships its own 7.0.2 compiler, so a version label alone cannot prove which
package is active.

Use **TypeScript: Select TypeScript Version... > Use Workspace Version** and
select the path under `exercises/typescript-basics/node_modules/typescript`.
The native picker includes both **Use TypeScript 7** (bundled) and **Use Workspace Version** (local). Do not confuse it with the older built-in SDK picker.

VS Code may require explicit approval to execute a workspace-local SDK. If the
selection does not take effect, run **TypeScript: Restart TS Server** and inspect
the TypeScript 7 output/status. The project-local native executable should resolve
to `exercises/typescript-basics/node_modules/@typescript/typescript-win32-x64/lib/tsc.exe`.
Final SDK selection evidence is recorded in the verification section below.

### Python interpreter

This workspace selects the verified Python 3.14.7 installation:

```text
C:\Users\leone\AppData\Local\Python\pythoncore-3.14-64\python.exe
```

Existing Python installations and PATH were not modified. Outside a virtual
environment, `python` still resolves to `C:\Python314\python.exe` (3.14.0), while
`py -3.14` resolves to the newer installation. This is why interpreter selection
matters more than a version written in documentation.

For a new Python project, open that project's folder and create its environment
there, rather than using one environment for unrelated projects:

```powershell
py -3.14 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip --version
```

Then use **Python: Select Interpreter** to select that project's `.venv`.
Use `python -m pip` to keep package installation tied to the selected interpreter.
The 3.14.7 path above is a machine-specific fallback for this repository; future
project requirements may call for a different Python version. No virtual
environment was created just for this TypeScript exercise.

## Git workflow and safeguards

The workspace protects `main` with `git.branchProtection`, uses `alwaysPrompt`
for protected-branch commits, keeps `git.confirmSync` enabled, and disables Smart
Commit. Background fetch is enabled; fetch updates remote information without
merging your working branch.

The built-in Git UI displays a lock on `main` and prompts before a protected-branch
commit. This is a local VS Code safeguard, not a Git hook or GitHub branch rule.
It does not block terminal commits, every extension, or a deliberate **Commit Anyway**.

Continue to use **Issue > Branch > Commit > PR > Merge**. For a new issue, first
finish or safely preserve current changes. With a clean working tree, update
`main` with `git pull --ff-only`, then create the issue's feature branch. Review
and stage specific files, commit on that branch, and open a pull request.
No new commit, push, issue, or pull request was created by this configuration task.
Issue #3 and PR #4 remain completed at merge `dad3e31`.

## Workspace extension cleanup

The following extensions were disabled using **Disable (Workspace)**:

| Extension ID | Reason |
| --- | --- |
| `almenon.arepl` | Overlapping Python scratchpad |
| `xirider.livecode` | Overlapping Python scratchpad |
| `trabpukcip.wolf` | Overlapping Python scratchpad |
| `njqdev.vscode-python-typehint` | Type-hint assistance overlaps Pylance |
| `littlefoxteam.vscode-python-test-adapter` | Older Python testing adapter |
| `hbenl.vscode-test-explorer` | Older adapter UI layer |
| `ms-vscode.test-adapter-converter` | Companion conversion layer for the older UI |
| `angular.ng-template` | Reacted to this non-Angular workspace's native SDK path |

No extensions were uninstalled or disabled globally. Jupyter and its companions,
Docker/container tools, GitLens, and other future-project tools were preserved.
Workspace changes to already-active extensions may show **Restart Required**
until VS Code restarts its extensions or closes and reopens.

## Useful shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+P` | Open a file by name |
| `F1` or `Ctrl+Shift+P` | Command Palette |
| `Ctrl+Shift+B` | Build with the default task |
| `Ctrl+Shift+M` | Problems |
| `Ctrl+Shift+D` | Run and Debug |
| `Shift+Alt+F` | Format Document |
| `F9` | Toggle breakpoint |
| `F5` | Start debugging / continue |
| `F10` | Step over while paused |
| `Ctrl+,` | Settings |

Use the Command Palette for **Terminal: Toggle Terminal** and **View: Show Source
Control** when keyboard-layout-specific shortcuts differ. No shortcuts were remapped.

## Backup and rollback

The verified backup is local and ignored by Git:

```text
.vscode/backups/20261112-202652/
```

`manifest.json` records original paths and the SHA-256 checksum of
`user-settings.json`. The original checksum is:

```text
9438290E8D9810804612E40BA06D7F3D88761DC8694E7421456B53F933EEEC5C
```

The backup also includes the original extension inventory and a record of the
initial global/workspace disabled-extension state (both empty).

For a full rollback:

1. Preserve any settings you intentionally changed after this setup. Close VS Code
   before restoring configuration so an open settings editor cannot overwrite it.
2. Copy the backup's `user-settings.json` back to
   `%APPDATA%\Code\User\settings.json`. Compare its SHA-256 with `manifest.json`.
   For a narrower rollback, remove only the two restoration properties added above.
3. Rename the new `.vscode/settings.json`, `tasks.json`, and `launch.json` to names
   ending in `.disabled`, rather than deleting them. No workspace versions existed
   before this task. Keep the backup directory.
4. In Extensions, use **Enable (Workspace)** for each extension in the cleanup
   table. Leave global enablement unchanged. VS Code stores this state outside
   `.vscode`, so renaming the settings file alone does not restore extensions.
5. To reverse interpreter/SDK choices, select the former `C:\Python314\python.exe`
   interpreter and choose the built-in TypeScript service. The TypeScript 7
   extension can remain installed and be disabled for this workspace.
6. Reopen the folder and review settings and Git status. No Git reset, history
   rewrite, package uninstall, or Python reinstall is needed.

## Verification and remaining limits

Verification results are recorded below. No laptop shutdown or forced application termination is part of the automated checks.
To verify restoration after your next normal shutdown:

1. Leave a few saved source tabs and a PowerShell terminal open. Note its directory.
2. Close VS Code normally and reopen it. Check tabs, terminal output, and directory.
3. Restart the laptop normally, reopen VS Code, and repeat the check.
4. Restart required servers; do not assume a restored transcript means they are running.

A restored terminal process may use its saved environment. After changing PATH or
switching Python environments, create a new terminal instead of relying on an old one.

### Check results

| Check | Result |
| --- | --- |
| `npm run typecheck`, `npm run build`, `npm start` | Passed, including another run after reopening VS Code |
| TypeScript diagnostics | Deliberate string-to-number error appeared; cleared after correction in an isolated probe |
| TypeScript IntelliSense | Correct `greetStudent(name: string, semester: number): string` hover signature |
| F5 and source maps | Build task completed, breakpoint hit `src/index.ts:2`, arguments inspected, expected output after continue |
| TypeScript, JavaScript, JSON, Python formatting | Passed in ignored probes; Auto Save persisted changes on focus change |
| Python selection | Python Environments selected the verified 3.14.7 executable; Black used the same interpreter |
| Protected `main` | Lock indicator observed in built-in Git UI; no commit attempted; returned to feature branch |
| Settings and backup | JSON parsed, original preferences preserved, backup SHA-256 matched manifest |
| Extension scope | Exactly eight workspace disables; no globally disabled extensions |
| Reopening | Settings and workspace extension state survived an observed VS Code restart |
| Terminal restoration | Saved persistent terminal layout verified; end-to-end shutdown/revival not verified |
| Project preservation | `main` and feature HEAD remain at `dad3e31`; completed exercise source unchanged |
| Local native SDK | Configured, but activation still requires confirmation; last executable check used bundled 7.0.2 |

UI diagnostics, formatting, and F5 checks were performed before the computer-use
helper became unavailable. The resumed session completed command-line and saved-state
checks. The last language-service executable check still resolved to the extension's
bundled 7.0.2, so the local SDK selection must not be described as verified yet.
The workspace path is configured correctly; the version label alone is insufficient.
