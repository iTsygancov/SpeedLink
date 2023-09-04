import { mockStorage } from "./mock";
import { Command, ShortcutsStorage } from "./types";

chrome.runtime.onInstalled.addListener(async () => {
  const shortcutsStorage: ShortcutsStorage =
    await chrome.storage.sync.get("shortcuts");

  if (!shortcutsStorage?.shortcuts) {
    await chrome.storage.sync.set({ shortcuts: mockStorage.shortcuts });
  }
});

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "openUrl") {
    let keyName = message.key.substring(3).toUpperCase();
    if (message.key.startsWith("Digit")) {
      keyName = message.key.substring(5);
    }
    chrome.storage.sync.get("shortcuts", function (data) {
      data?.shortcuts?.forEach((command: Command) => {
        const lastKey = command.shortcut;
        if (lastKey === keyName) {
          chrome.tabs.create({ url: command.url });
        }
      });
    });
  }
});

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});
