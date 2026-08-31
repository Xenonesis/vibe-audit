# Desktop Application Profile

Use for Electron, Tauri, Wails, and native desktop applications.

Prioritize:
- Electron security baseline: enforce `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true`, and `webSecurity: true` in `webPreferences`; forbid remote URL loading without strict origin whitelisting
- Safe IPC boundaries: strictly validate and sanitize all inter-process communication arguments; never expose raw `child_process.exec`, arbitrary file system write, or eval primitives to renderer processes
- Tauri security model: verify narrow permission allowlists in `tauri.conf.json` (avoid broad `fs:all` or `shell:all`), validate command arguments with Rust types, and enforce CSP
- Auto-update & binary integrity: secure update channels (HTTPS, signature verification), code signing configuration, and safe temporary file handling
- Native resource management: prevent memory leaks, clean up native child processes on exit, and avoid blocking the main UI thread with heavy synchronous I/O
