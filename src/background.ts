import { getKeyName } from "./background.utils";
import { mockStorage } from "./mock";
import { Message, Storage } from "./types";

chrome.runtime.onInstalled.addListener(async () => {
  const shortcutsStorage = (await chrome.storage.sync.get(
    "speedlink"
  )) as Storage;

  if (!shortcutsStorage.speedlink) {
    await chrome.storage.sync.set({
      speedlink: mockStorage.speedlink
    });
  }
});

chrome.runtime.onMessage.addListener(async (message: Message) => {
  if (message.action === "openUrl") {
    const keyName = getKeyName(message.key);
    const storage = (await chrome.storage.sync.get("speedlink")) as Storage;

    storage.speedlink.shortcuts.forEach((command) => {
      const { shortcut, url } = command;
      if (shortcut === keyName) {
        const isActiveTab = message.postAction !== "Open in background";
        const tabOptions = { url, active: isActiveTab };

        if (message.postAction === "Close & Jump to tab") {
          chrome.tabs.update(tabOptions);
        } else {
          chrome.tabs.create(tabOptions);
        }
      }
    });
  }
});

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});
