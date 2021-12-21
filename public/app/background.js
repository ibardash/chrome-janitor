chrome.tabs.onActivated.addListener((tab) => {});

importScripts(
  "scripts/handleInstallation.js",
  "scripts/handleCloseTab.js",
  "scripts/MemoryMonitor.js"
);
