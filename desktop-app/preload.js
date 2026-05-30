// Preload script for security
// This file runs in a separate context before the web page loads

const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// specific electron features without exposing the entire API
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.versions.electron,
  isElectron: true
});

// Log that app is running in Electron
console.log('🖥️ Running in Electron Desktop App');
