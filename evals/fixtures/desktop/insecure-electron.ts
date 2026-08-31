// Synthetic fixture: Electron desktop window with dangerous nodeIntegration and disabled contextIsolation
import { app, BrowserWindow } from 'electron';

export function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Vulnerability: Allows renderer to execute arbitrary Node.js child_process commands
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL('https://example.com/app');
}
