chrome.tabs.onActivated.addListener(async (tab) => {
  const { tabsInfo } = await chrome.storage.sync.get("tabsInfo");
  const { closedTabs } = await chrome.storage.sync.get("closedTabs");

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
  chrome.storage.sync.set({ tabsInfo, closedTabs });
});

chrome.alarms.create("closeTab", {
  delayInMinutes: 0,
  periodInMinutes: 0.3,
});

chrome.storage.sync.set({ tabsInfo: {}, closedTabs: {} });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const DEFAULT_INACTIVITY_PERIOD_MINUTES = 60;

  const { periodOfInactivity: userPeriodOfInactivityMinutes } =
    await chrome.storage.sync.get("periodOfInactivity");

  const inactivityPeriodInMinutes =
    userPeriodOfInactivityMinutes ?? DEFAULT_INACTIVITY_PERIOD_MINUTES;

  const inactivityPeriodInMilliseconds = inactivityPeriodInMinutes * 60 * 1000;

  if (alarm.name !== "closeTab") return;

  const { tabsInfo } = await chrome.storage.sync.get("tabsInfo");
  const { closedTabs } = await chrome.storage.sync.get("closedTabs");

  const tabs = await chrome.tabs.query({});

  tabs.forEach((tab) => {
    const lastActivated = tabsInfo[tab.id]?.lastActivated;
    if (!lastActivated) return;

    const differenceInMillis = Date.now() - lastActivated;

    if (differenceInMillis > inactivityPeriodInMilliseconds) {
      chrome.tabs.remove(tab.id);
      delete tabsInfo[tab.id];
      closedTabs[tab.id] = { url: tab.url, closedAt: Date.now() };
    }
  });

  // save tabsInfo back to storage
  chrome.storage.sync.set({ tabsInfo, closedTabs });
});
