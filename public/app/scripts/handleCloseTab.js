chrome.tabs.onActivated.addListener((tab) => {
  console.log("onActivated", tab);

  chrome.storage.sync.get("tabsInfo", function (tabsInfo) {
    console.log("tabsInfo", tabsInfo);
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
});

chrome.alarms.create("closeTab", {
  delayInMinutes: 0,
  periodInMinutes: 1,
});

const MAX_TIME = 10000;

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "closeTab") {
    chrome.storage.sync.get("tabsInfo", function (tabsInfo) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          const lastActivated = tabsInfo[tab.id].lastActivated;
          if (lastActivated !== null) {
            if (Date.now - lastActivated > MAX_TIME) {
              // remove the tab
              chrome.tabs.remove(tab.id);

              // remove the key for tabsInfo
              delete tabsInfo[tab.id];
            }
          }
        });
      });

      // save tabsInfo back to storage
      chrome.storage.sync.set({ tabsInfo });
    });
  }
});
