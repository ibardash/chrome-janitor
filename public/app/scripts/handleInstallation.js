const handleInstallation = () => {
  chrome.tabs.create({
    url: 'introduction.html',
    active: true,
  })
}

chrome.runtime.onInstalled.addListener(handleInstallation);
