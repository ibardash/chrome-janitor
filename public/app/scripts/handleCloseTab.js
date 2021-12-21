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
  chrome.storage.sync.set({ tabsInfo });
});

chrome.alarms.create("closeTab", {
  delayInMinutes: 0,
  periodInMinutes: 0.3,
});

chrome.storage.sync.set({ tabsInfo: {} });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const DEFAULT_INACTIVITY_PERIOD_MINUTES = 60;

  const { periodOfInactivity: userPeriodOfInactivityMinutes } = await chrome.storage.sync.get(
    "periodOfInactivity"
  );

  const inactivityPeriodInMinutes =
    userPeriodOfInactivityMinutes ?? DEFAULT_INACTIVITY_PERIOD_MINUTES;

  const inactivityPeriodInMilliseconds = inactivityPeriodInMinutes * 60 * 1000;

  if (alarm.name !== "closeTab") return;

  const { tabsInfo } = await chrome.storage.sync.get("tabsInfo");

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      const lastActivated = tabsInfo[tab.id]?.lastActivated;
      if (!lastActivated) return;

      const differenceInMillis = Date.now() - lastActivated;

      if (differenceInMillis > inactivityPeriodInMilliseconds) {
        chrome.tabs.remove(tab.id);
        delete tabsInfo[tab.id];
      }
    });
  });

  // save tabsInfo back to storage
  chrome.storage.sync.set({ tabsInfo });
});
