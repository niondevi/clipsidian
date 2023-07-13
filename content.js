chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "closeTab") {
    window.close();
  }
});