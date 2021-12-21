chrome.tabs.onActivated.addListener(async (tab) => {
  const { tabsInfo } = await chrome.storage.sync.get("tabsInfo");

  // set previous active tab active state to false
  const previousActiveTab = Object.keys(tabsInfo).find(
    (key) => tabsInfo[key].isCurrent === true
  );

  if (previousActiveTab) {
    tabsInfo[previousActiveTab] = {
      isCurrent: false,
      lastActivated: Date.now(),
    };
  }

  // update info for the current active tab
  tabsInfo[tab.tabId] = {
    isCurrent: true,
    lastActivated: null,
  };

  // save the updated tab info to storage
  console.log("onActivated setting tabsInfo", tabsInfo);

  chrome.storage.sync.set({ tabsInfo });
});

chrome.alarms.create("closeTab", {
  delayInMinutes: 0,
  periodInMinutes: 0.3,
});

chrome.storage.sync.set({ tabsInfo: {} });

const MAX_TIME = 1000;

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log("alarm fired", alarm.name);

  if (alarm.name !== "closeTab") return;

  const { tabsInfo } = await chrome.storage.sync.get("tabsInfo");

  console.log("on alarm get tabsInfo", tabsInfo);

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      const lastActivated = tabsInfo[tab.id]?.lastActivated;
      if (!lastActivated) return;

      const differenceInMillis = Date.now() - lastActivated;

      if (differenceInMillis > MAX_TIME) {
        chrome.tabs.remove(tab.id);
        delete tabsInfo[tab.id];
      }
    });
  });

  console.log("onAlarm setting tabsInfo", tabsInfo);

  // save tabsInfo back to storage
  chrome.storage.sync.set({ tabsInfo });
});
