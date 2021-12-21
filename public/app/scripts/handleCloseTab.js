chrome.tabs.onActivated.addListener(async (tab) => {
  const tabsInfo = await getFromStorage("tabsInfo");

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

const getFromStorage = async (key) => {
  const storedData = (await chrome.storage.sync.get(key))[key];
  const data = storedData || {};

  if (!storedData) {
    chrome.storage.sync.set({
      [key]: data,
    });
  }

  return data;
};

chrome.alarms.create("closeTab", {
  delayInMinutes: 0,
  periodInMinutes: 1 / 60, // 1 sec
});

const DEFAULT_INACTIVITY_PERIOD_MINUTES = 60;

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== "closeTab") return;

  const userPeriodOfInactivityMinutes = await getFromStorage(
    "periodOfInactivity"
  );

  const inactivityPeriodInMinutes =
    userPeriodOfInactivityMinutes ?? DEFAULT_INACTIVITY_PERIOD_MINUTES;

  const inactivityPeriodInMilliseconds = inactivityPeriodInMinutes * 60 * 1000;

  const tabsInfo = await getFromStorage("tabsInfo");
  const closedTabs = await getFromStorage("closedTabs");

  const tabs = await chrome.tabs.query({});

  tabs.forEach((tab) => {
    const lastActivated = tabsInfo[tab.id]?.lastActivated;
    if (!lastActivated) return;

    const differenceInMillis = Date.now() - lastActivated;
    if (differenceInMillis > inactivityPeriodInMilliseconds) {
      chrome.tabs.remove(tab.id);
      delete tabsInfo[tab.id];
      closedTabs[tab.id] = {
        url: tab.url,
        closedAt: Date.now(),
        title: tab.title,
      };
    }
  });

  // save tabsInfo back to storage
  chrome.storage.sync.set({ tabsInfo, closedTabs });
});
