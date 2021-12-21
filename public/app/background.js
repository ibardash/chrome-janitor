chrome.tabs.onActivated.addListener((tab) => {
  console.log("tab is active");
});

importScripts(
  "scripts/handleInstallation.js",
  "scripts/handleCloseTab.js",
  "scripts/MemoryMonitor.js"
);
