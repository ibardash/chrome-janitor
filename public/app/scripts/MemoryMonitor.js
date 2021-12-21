// chrome.tabs.onRemoved.addListener(async () => {
//   const memory = await chrome.storage.sync.get("memory");
//   if (!memory) {
//     chrome.storage.sync.set(initialMemoryStorage);
//   } else {
//     setMemorySaved(memory);
//   }
// });

// const initialMemoryStorage = {
//   "memory": {
//     memorySaved: 0,
//     memoryBeforeClosed: 0,
//   }
// }

// const getMemoryInUse = async () => {
//   try {
//     const memory = await chrome.system.memory.getInfo()
//     const memoryInUse = memory.capacity - memory.availableCapacity
//     const memoryInUseMb = memoryInUse / (1024 * 1024)
//     return memoryInUseMb;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const setMemoryBeforeClosed = (memory) => {
//   try {
//     chrome.storage.sync.set({
//       "memory": {
//         ...memory,
//         memoryBeforeClosed: getMemoryInUse()
//       }
//     })
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// const setMemorySaved = (memory) => {
//   try {
//     chrome.storage.sync.set({
//       "memory": {
//         ...memory,
//         memorySaved: memory.memorySaved + (memory.memoryBeforeClosed - getMemoryInUse()),
//       }
//     })
//   } catch (err) {
//     console.log(err.message);
//   }
// }
