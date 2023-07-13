const getSelectionHtml = () => {
  var html = "";
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var container = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
    }
  } else if (typeof document.selection != "undefined") {
    if (document.selection.type == "Text") {
      html = document.selection.createRange().htmlText;
    }
  }
  return html;
}

const turndownService = new TurndownService();

const createContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    chrome.storage.sync.get('actions', (data) => {
      (data.actions || []).forEach((action, index) => {
        chrome.contextMenus.create({
          id: String(index),
          title: action.name,
          contexts: ['selection'],
        });
      });
    });
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "OPEN_OBSIDIAN_URL") {
    chrome.tabs.create({ url: request.url });
    sendResponse({ status: "success" });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const actionIndex = parseInt(info.menuItemId);
  chrome.storage.sync.get('actions', (data) => {
    const action = data.actions[actionIndex];
    chrome.tabs.executeScript(
      tab.id,
      { code: '(' + getSelectionHtml.toString() + ')();' },
      (results) => {
        var markdown = turndownService.turndown(results[0]);
        var output = parsePlaceholders(action.format, markdown, tab.title, tab.url);

        // Create the URL to send to Obsidian
        var obsidianUrl = new URL('https://niondevi.github.io/clipsidian/new.htm');
        obsidianUrl.searchParams.append('vault', encodeURIComponent(action.vault));
        obsidianUrl.searchParams.append('file', encodeURIComponent(action.path));
        obsidianUrl.searchParams.append('content', encodeURIComponent(output));
        obsidianUrl.searchParams.append('append', 'true');
        obsidianUrl.searchParams.append('overwrite', 'false');
        obsidianUrl.searchParams.append('silent', 'true');

        // Log data
        console.log(`***************************************`);
        console.log(`Action: ${action.name}`);
        console.log(`Vault: ${action.vault}`);
        console.log(`Path: ${action.path}`);
        console.log(`Format: ${action.format}`);
        console.log(`---------------------------------------`);
        console.log(`Title: ${tab.title}`);
        console.log(`URL: ${tab.url}`);
        console.log(`---------------------------------------`);
        console.log(`Markdown: ${markdown}`);
        console.log(`Output: ${output}`);
        console.log(`Obsidian URL: ${obsidianUrl.toString()}`);

        // Open the URL in a new tab
        chrome.tabs.create({ url: obsidianUrl.toString() });
      }
    );
  });
});





const parsePlaceholders = (format, clip, title, url) => {
  let output = format;

  const replaceDateTime = (pattern, formatFunc) => {
    let re = new RegExp(`{${pattern}:(.*?)}`, 'g');
    let match = re.exec(output);
    while (match != null) {
      output = output.replace(match[0], formatFunc(match[1]));
      match = re.exec(output);
    }
    output = output.replace(new RegExp(`{${pattern}}`, 'g'), formatFunc());
  }

  // Replace {date}, {date:FORMAT}, {time}, {time:FORMAT}
  replaceDateTime('date', () => moment().format('YYYY-MM-DD'));
  replaceDateTime('time', () => moment().format('HH:mm:ss'));

  // Replace {clip} with the provided clip string
  output = output.replace(/{clip}/g, clip);

  // Replace {title} with the provided title string
  output = output.replace(/{title}/g, title);

  // Replace {url} with the provided url string
  output = output.replace(/{url}/g, url);

  return output;
};



chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.get(['actions', 'isFirstTime'], (result) => {
      if (!result.isFirstTime) {
        const defaultActions = [
          {
            name: "Clip selection to Obsidian",
            vault: "Vault",
            path: "Web Clippings",
            format: 
`{clip}

{title}
[[{url}]]
{date} {time}`,
          }
        ];
        chrome.storage.sync.set({actions: defaultActions, isFirstTime: true});
      }
    });
  }
  createContextMenus();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.actions) {
    createContextMenus();
  }
});
