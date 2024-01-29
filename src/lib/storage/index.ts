import { mockStorage, updateMockData, updateMockSettings } from "@/mock";
import { Settings, Shortcut, Storage } from "@/types";

const DEV_MODE = import.meta.env.DEV;

const sendMessageToStorage = async (event: KeyboardEvent) => {
  const storage = (await chrome.storage.sync.get("speedlink")) as Storage;
  const message = {
    action: "openUrl",
    url: window.location.href,
    key: event.code,
    postAction: storage.speedlink.settings.postAction
  };

  if (DEV_MODE) {
    console.log("Sending message to storage", message);
  } else {
    chrome.runtime.sendMessage(message);
  }
};

const getFromStorage = async (name: string): Promise<Storage> => {
  if (DEV_MODE) {
    return mockStorage;
  }

  return (await chrome.storage.sync.get(name)) as Storage;
};

const updateShorcutsStorage = async (data: Shortcut[]) => {
  if (DEV_MODE) {
    updateMockData(data);
  } else {
    const storage = await chrome.storage.sync.get("speedlink");
    chrome.storage.sync.set({
      speedlink: { ...storage.speedlink, shortcuts: data }
    });
  }
};

const updateSettingsStorage = async (data: Settings) => {
  if (DEV_MODE) {
    updateMockSettings(data);
  } else {
    const storage = await chrome.storage.sync.get("speedlink");
    chrome.storage.sync.set({
      speedlink: { ...storage.speedlink, settings: data }
    });
  }
};

export {
  getFromStorage,
  sendMessageToStorage,
  updateShorcutsStorage,
  updateSettingsStorage
};
