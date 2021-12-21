const WEBSITE_URL = "https://chrome-janitor.odoo.com/";

const handleInstallation = () => {
  chrome.tabs.create({
    url: WEBSITE_URL,
    active: true,
  })
}

chrome.runtime.onInstalled.addListener(handleInstallation);
