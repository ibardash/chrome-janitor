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
  periodInMinutes: 1,
});

chrome.storage.sync.set({ tabsInfo: {} });

const MAX_TIME = 5000;

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "closeTab") {
//     chrome.storage.sync.get("tabsInfo", function (tabsInfo) {
//       console.log("on alarm get tabsInfo", tabsInfo);

//       chrome.tabs.query({}, function (tabs) {
//         tabs.forEach((tab) => {
//           const lastActivated = tabsInfo[tab.id].lastActivated;
//           if (lastActivated !== null) {
//             if (Date.now - lastActivated > MAX_TIME) {
//               // remove the tab
//               chrome.tabs.remove(tab.id);

//               // remove the key for tabsInfo
//               delete tabsInfo[tab.id];
//             }
//           }
//         });
//       });

//       console.log("onAlarm setting tabsInfo", tabsInfo);

//       // save tabsInfo back to storage
//       chrome.storage.sync.set({ tabsInfo });
//     });
//   }
// });
