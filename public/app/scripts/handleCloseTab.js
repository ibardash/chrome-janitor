chrome.tabs.onCreated.addListener((tab) => {
  chrome.storage.sync.get("tabsInfo", function (value) {
    const updatedTabsInfo = {
      ...value,
      [tab.id]: {
        createdAt: Date.now(),
      },
    };

    chrome.storage.sync.set({ tabsInfo: updatedTabsInfo }, function () {
      chrome.storage.sync.get("tabsInfo", function (value) {
        console.log("tabsInfo", value);
      });
    });
  });

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      // const customTabInfo = chrome.storage.sync.get(key, function (value) {
      //   console.log("stored value for tab", value);
      // });
    });
  });
});
