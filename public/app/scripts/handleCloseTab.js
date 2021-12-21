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

const MAX_TIME = 2000;

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== "closeTab") return;

  const { tabsInfo } = await chrome.storage.sync.get("tabsInfo");

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(async (tab) => {
      const lastActivated = tabsInfo[tab.id]?.lastActivated;
      if (!lastActivated) return;

      const differenceInMillis = Date.now() - lastActivated;

      if (differenceInMillis > MAX_TIME) {
        const mem = await chrome.storage.sync.get("memory")
        if(!mem){ 
          setMemoryBeforeClosed({
            memorySaved: 0,
            memoryBeforeClosed: 0,
          })
        } else {
          setMemoryBeforeClosed(mem.memory)
        }
        chrome.tabs.remove(tab.id);
        delete tabsInfo[tab.id];
        const currentMemory = await chrome.storage.sync.get("memory")
        await setMemorySaved(currentMemory.memory);
      }
    });
  });

  // save tabsInfo back to storage
  chrome.storage.sync.set({ tabsInfo });
});

const setMemoryBeforeClosed = (memory) => {
  chrome.storage.sync.set({
    "memory": {
      ...memory,
      memoryBeforeClosed: getMemoryInUse()
    }
  })
}

const getMemoryInUse = async () => {
  try {
    const memory = await chrome.system.memory.getInfo()
    const memoryInUse = memory.capacity - memory.availableCapacity
    const memoryInUseMb = memoryInUse / (1024 * 1024)
    return memoryInUseMb;
  } catch (error) {
    console.log(error);
  }
};

const setMemorySaved = async (memory) => {
  try {
    const memoryInUse = await getMemoryInUse()
    console.log(memoryInUse);
    console.log(memory);
    chrome.storage.sync.set({
      "memory": {
        ...memory,
        memorySaved: memory.memorySaved + (memory.memoryBeforeClosed - memoryInUse),
      }
    })
  } catch (err) {
    console.log(err.message);
  }
}
