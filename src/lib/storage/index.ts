import { Command } from "@/types";

const sendMessageToStorage = (event: KeyboardEvent) => {
  chrome.runtime.sendMessage({
    action: "openUrl",
    url: window.location.href,
    key: event.code
  });
};

const getFromStorage = async <T>(name: string) => {
  return (await chrome.storage.sync.get(name)) as T;
};

const updateStorage = (data: Command[]) => {
  chrome.storage.sync.set({ shortcuts: data });
};

export { sendMessageToStorage, getFromStorage, updateStorage };
