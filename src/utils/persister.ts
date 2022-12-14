import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const persister = createAsyncStoragePersister({
  storage: {
    async getItem(key: string): Promise<string> {
      const res = await chrome.storage.local.get(key);
      return res[key];
    },
    async setItem(key: string, value: string): Promise<void> {
      await chrome.storage.local.set({ [key]: value });
    },
    async removeItem(key: string): Promise<void> {
      await chrome.storage.local.remove(key);
    },
  },
  key: "REACT_QUERY_OFFLINE_CACHE",
  throttleTime: 1000,
});

export default persister;
