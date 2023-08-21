document.addEventListener("keydown", function (event) {
  if (event.altKey && event.shiftKey && event.code) {
    chrome.runtime.sendMessage({
      action: "openUrl",
      url: window.location.href,
      key: event.code
    });
  }
});
