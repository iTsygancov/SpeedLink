document.addEventListener("keydown", async function (event) {
  const storage = await chrome.storage.sync.get("speedlink");
  const useShift = storage.speedlink.settings.useShift;

  if (useShift) {
    if (event.altKey && event.shiftKey && event.code) {
      chrome.runtime.sendMessage({
        action: "openUrl",
        url: window.location.href,
        key: event.code
      });
    }
  } else {
    if (event.altKey && event.code) {
      chrome.runtime.sendMessage({
        action: "openUrl",
        url: window.location.href,
        key: event.code
      });
    }
  }
});
