chrome.tabs.onActivated.addListener((tab) => {
  console.log("tab is active");
  console.log(getCpuInfo());
});

const getCpuInfo = async () => {
  const cpuInfo = await chrome.system.cpu.getInfo();
  return cpuInfo;
};

importScripts('scripts/handleInstallation.js')
