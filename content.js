chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "OPEN_OBSIDIAN_URL") {
      let obsidianWindow = window.open(request.url, '_blank');
      setTimeout(() => {
        obsidianWindow.close();
      }, 1);
      sendResponse({status: "success"});
    }
  }
);
