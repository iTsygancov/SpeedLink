import { mockStorage, updateMockData } from "@/mock";
import { Shortcut, Storage } from "@/types";

const DEV_MODE = import.meta.env.DEV;

const sendMessageToStorage = (event: KeyboardEvent) => {
  if (DEV_MODE) {
    console.log("Sending message to storage", {
      action: "openUrl",
      url: window.location.href,
      key: event.code
    });
  } else {
    chrome.runtime.sendMessage({
      action: "openUrl",
      url: window.location.href,
      key: event.code
    });
  }
};

const getFromStorage = async (name: string): Promise<Storage> => {
  if (DEV_MODE) {
    return mockStorage as Storage;
  }

  return (await chrome.storage.sync.get(name)) as Storage;
};

const updateShorcutsStorage = (data: Shortcut[]) => {
  if (DEV_MODE) {
    updateMockData(data);
  } else {
    chrome.storage.sync.set({ speedlink: { shortcuts: data } });
  }
};

export { getFromStorage, sendMessageToStorage, updateShorcutsStorage };
