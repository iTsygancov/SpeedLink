import { mockStorage, updateMockData } from "@/mock";
import { Command } from "@/types";

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

const getFromStorage = async <T>(name: string) => {
  if (DEV_MODE) {
    return mockStorage;
  } else {
    return (await chrome.storage.sync.get(name)) as T;
  }
};

const updateStorage = (data: Command[]) => {
  if (DEV_MODE) {
    updateMockData(data);
  } else {
    chrome.storage.sync.set({ shortcuts: data });
  }
};

export { sendMessageToStorage, getFromStorage, updateStorage };
