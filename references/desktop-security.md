# Desktop Application Security Reference

Desktop applications (Electron, Tauri, Wails) run with local operating system privileges. A vulnerability in the web frontend of a desktop app can lead directly to full local Remote Code Execution (RCE) on the user's computer if boundary controls are misconfigured.

## Core Audit Targets

### 1. Electron Security Configuration Matrix
Check:
- `nodeIntegration: true` in `webPreferences`: allows renderer code to directly call `require('child_process')` and execute OS commands. Must be `false`.
- `contextIsolation: false`: allows renderer scripts to tamper with preload prototypes and bypass API bridges. Must be `true`.
- `sandbox: false` or missing sandboxing on renderers loading external/dynamic content.
- `webSecurity: false`: disables Same-Origin Policy and allows local file reads via `file://`.
- `allowRunningInsecureContent: true`: allows HTTPS pages to load HTTP scripts.
- Navigation handling: missing `will-navigate` / `setWindowOpenHandler` listeners, allowing renderers to navigate to arbitrary malicious external URLs inside the privileged frame.

### 2. IPC (Inter-Process Communication) Security
Check:
- Over-permissive IPC listeners (`ipcMain.on`, `ipcMain.handle` in Electron, `#[tauri::command]` in Tauri):
  - Exposing raw shell execution (`child_process.exec`, `execSync`, `spawn`) with user-supplied arguments from the renderer.
  - Exposing arbitrary filesystem read/write primitives (`fs.readFile(arg)`, `fs.writeFile(arg)`) without path sandboxing (`path.resolve` inside allowed app directory).
  - Exposing `eval` or dynamic code evaluation primitives over IPC channels.

### 3. Tauri Configuration & Permissions
Check:
- `tauri.conf.json` allowlists: overly broad scopes such as `"fs": { "all": true, "scope": ["**"] }` or `"shell": { "all": true, "execute": true }`.
- Missing CSP (Content Security Policy) in Tauri windows loading dynamic remote data.

### 4. Native Resource & Process Management
Check:
- Orphan child processes: spawned native binaries or background sidecars not terminated on app exit (`app.on('before-quit')` or Tauri window destroy).
- Blocking the main thread with heavy synchronous I/O operations (`fs.readFileSync`), causing the desktop window to freeze.

## Remediation Policy
- **Confidence:** `CRITICAL` / `CONFIRMED` when `nodeIntegration: true` or `contextIsolation: false` is detected, or unrestricted shell commands are exposed over IPC.
- **Change Risk:** `HIGH` for IPC refactoring; requires careful preload contract auditing.
