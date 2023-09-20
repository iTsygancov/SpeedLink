import { mockStorage } from "./mock";
import { Shortcut, Storage } from "./types";

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

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "openUrl") {
    let keyName = message.key.substring(3).toUpperCase();
    if (message.key.startsWith("Digit")) {
      keyName = message.key.substring(5);
    }

    chrome.storage.sync.get("speedlink", function (data) {
      data.speedlink.shortcuts.forEach((command: Shortcut) => {
        const lastKey = command.shortcut;
        if (lastKey === keyName) {
          if (message.postAction === "Close & Jump to tab") {
            chrome.tabs.update({ url: command.url });
          } else {
            chrome.tabs.create({
              url: command.url,
              active: message.postAction !== "Open in background"
            });
          }
        }
      });
    });
  }
});

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});
