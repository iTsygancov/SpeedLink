import { Message, Storage } from "./types";

document.addEventListener("keydown", async function (event) {
  const storage = (await chrome.storage.sync.get("speedlink")) as Storage;

  const useShift = storage.speedlink.settings.useShift;

  const message: Message = {
    action: "openUrl",
    url: window.location.href,
    key: event.code,
    postAction: storage.speedlink.settings.postAction
  };

  if (
    useShift &&
    event.altKey &&
    event.shiftKey &&
    !event.code.includes("Alt")
  ) {
    chrome.runtime.sendMessage(message);
  } else if (!useShift && event.altKey && !event.code.includes("Alt")) {
    chrome.runtime.sendMessage(message);
  }
});
