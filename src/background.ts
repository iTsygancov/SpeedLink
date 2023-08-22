import { Command } from "./types";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "openUrl") {
    const keyName = message.key.substring(3).toUpperCase();
    chrome.storage.sync.get("shortcuts", function (data) {
      data.shortcuts.forEach((command: Command) => {
        const lastKey = command.shortcut.pop();
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
