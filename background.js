const turndownService = new TurndownService();

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
const createContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    chrome.storage.sync.get(['actions', 'momentLocale'], (data) => {

      if (data.momentLocale) {
        moment.locale(data.momentLocale.toLowerCase());
      }
      else {
        let defaultLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
        moment.locale(defaultLocale.toLowerCase());
      }
  
      (data.actions || []).forEach((action, index) => {
        chrome.contextMenus.create({
          id: String(index),
          title: action.name,
          contexts: ['selection'],
        });
      });
    });
  });
}
const convertRelativeLinks = (str, baseUrl) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  
  let urlAttributes = ['href', 'src', 'srcset', 'data', 'action', 'cite'];
  
  urlAttributes.forEach(attribute => {
    let elements = doc.querySelectorAll(`[${attribute}]`);
    elements.forEach(el => {
      let attrValue = el.getAttribute(attribute);
      if(attrValue) {
        let parts = attrValue.split(',');
        let newParts = parts.map(part => {
          let url = part.trim().split(' ')[0];
          try {
            new URL(url);
            return part;
          } catch(e) {
            return part.replace(url, new URL(url, baseUrl).toString());
          }
        });
        el.setAttribute(attribute, newParts.join(', '));
      }
    });
  });
  
  return doc.body.innerHTML;
}
const parsePlaceholders = (format, clip, title, url) => {
  let output = format;
  clip = encodeURIComponent(clip)
  title = encodeURIComponent(title)
  url = encodeURIComponent(url)


  const replaceDateTime = (pattern, defaultFormat) => {
    let re = new RegExp(`{${pattern}:(.*?)}`, 'g');
    let match = re.exec(output);
    while (match != null) {
      output = output.replace(match[0], moment().format(match[1]));
      match = re.exec(output);
    }
    output = output.replace(new RegExp(`{${pattern}}`, 'g'), defaultFormat);
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
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const actionIndex = parseInt(info.menuItemId);
  chrome.storage.sync.get('actions', (data) => {

    const action = data.actions[actionIndex];
    chrome.tabs.executeScript(
      tab.id,
      { code: '(' + getSelectionHtml.toString() + ')();' },
      async (results) => {

        let markdown = turndownService.turndown(
          convertRelativeLinks(results[0], tab.url)
        );

        let output = parsePlaceholders(action.format, markdown, tab.title, tab.url);
        let path = parsePlaceholders(action.path, '', tab.title, tab.url);

        // Create the URL to send to Obsidian
        // let obsidianUrl = 'http://127.0.0.1:8080/new.htm'; // testing
        let obsidianUrl = 'https://niondevi.github.io/clipsidian/new.htm';
        obsidianUrl += '?vault=' + encodeURI(action.vault);
        obsidianUrl += '&file=' + encodeURI(path);
        obsidianUrl += '&content=' + encodeURI(output);
        obsidianUrl += `&append=${!action.overwrite}&silent=${!action.openNote}`;

        // Inject the iframe creation code into the current tab
        document.getElementById('clipsidian-iframe').src = obsidianUrl.toString();
        setTimeout(() => { document.getElementById('clipsidian-iframe').src = ''; }, 5000);
      }
    );
  });
});
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && (changes.actions || changes.momentLocale)) {
    createContextMenus();
  }
});


chrome.runtime.onStartup.addListener(async () => {
  createContextMenus();
});
chrome.runtime.onInstalled.addListener(async (details) => {
  createContextMenus();

  if (details.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL("options/options.html") }, () => {});
  }
});