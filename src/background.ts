import { Command } from "./types";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "openUrl") {
    let keyName = message.key.substring(3).toUpperCase();
    if (message.key.startsWith("Digit")) {
      keyName = message.key.substring(5);
    }
    chrome.storage.sync.get("shortcuts", function (data) {
      data.shortcuts.forEach((command: Command) => {
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
