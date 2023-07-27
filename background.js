import {DateTime} from './lib/luxon.min.js';

var locale = 'en'


const createContextMenus = () => {
  chrome.contextMenus.removeAll(() => {
    chrome.storage.sync.get(['actions', 'luxonLocale'], (data) => {

      if (data.luxonLocale) {
        locale = data.luxonLocale.toLowerCase();
      }
      else {
        let defaultLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
        locale = defaultLocale.toLowerCase();
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

const parsePlaceholders = (format, clip, title, url) => {
  let output = format;
  clip = encodeURIComponent(clip)
  title = encodeURIComponent(title)
  url = encodeURIComponent(url)

  const replaceDateTime = (pattern, defaultFormat) => {
    let re = new RegExp(`{${pattern}:(.*?)}`, 'g');
    let match = re.exec(output);
    while (match != null) {
      output = output.replace(match[0], DateTime.now().toFormat(match[1]));
      match = re.exec(output);
    }
    output = output.replace(new RegExp(`{${pattern}}`, 'g'), defaultFormat);
  }

  // Replace {date}, {date:FORMAT}, {time}, {time:FORMAT}
  replaceDateTime('date', () => DateTime.now().toFormat('yyyy-LL-dd'));
  replaceDateTime('time', () => DateTime.now().toFormat('HH:mm:ss'));

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
  chrome.storage.sync.get('actions', async (data) => {

    const action = data.actions[actionIndex];

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [
        "lib/turndown.js",
        "contentScript.js"
      ],
    });

    const selectListener = (request) => {
      if (request.msg === 'selected_text') {

        let markdown = request.text;

        let output = parsePlaceholders(action.format, markdown, tab.title, tab.url);
        let path = parsePlaceholders(action.path, '', tab.title, tab.url);

        let authorizedUrl = 'https://niondevi.github.io/clipsidian/clip.htm';
        authorizedUrl += '?vault=' + encodeURI(action.vault);
        authorizedUrl += '&file=' + encodeURI(path);
        authorizedUrl += '&content=' + encodeURI(output);
        authorizedUrl += `&append=${!action.overwrite}&silent=${!action.openNote}`;

        console.log(authorizedUrl)

        chrome.tabs.create({
          url: authorizedUrl,
          active: false,
        });
        
        chrome.runtime.onMessage.removeListener(selectListener);
      }
    };
    chrome.runtime.onMessage.addListener(selectListener);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {msg: 'get_selected_text'});
    });

  });
});
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && (changes.actions || changes.luxonLocale)) {
    createContextMenus();
  }
});

self.addEventListener('activate', async (event) => {
  createContextMenus();
});

self.addEventListener('install', async (event) => {
  createContextMenus();

  event.waitUntil(
    chrome.tabs.create({ url: chrome.runtime.getURL("options/options.html") }, () => {})
  );
});