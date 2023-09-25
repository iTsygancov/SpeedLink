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
    const smartTabs = storage.speedlink.settings.smartTabs;
    let tabFound = false;
    let urlToOpen = "";

    storage.speedlink.shortcuts.forEach((shortcuts) => {
      const { shortcut, url } = shortcuts;
      if (shortcut === keyName) {
        urlToOpen = url;
      }
    });

    if (urlToOpen.length > 0) {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id && tab.url === urlToOpen) {
            chrome.tabs.update(tab.id, { active: true });
            if (smartTabs) {
              tabFound = true;
            }
          }
        });

        if (!tabFound) {
          const isActiveTab = message.postAction !== "Open in background";
          const tabOptions = { url: urlToOpen, active: isActiveTab };

          if (message.postAction === "Close & Jump to tab") {
            chrome.tabs.update(tabOptions);
          } else {
            chrome.tabs.create(tabOptions);
          }
        }
      });
    }
  }
});

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});
