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
};

const convertRelativeLinks = async (str, baseUrl) => {
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

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.msg === 'get_selected_text') {
    const selectedText = getSelectionHtml();
    const markdown = turndownService.turndown(
      await convertRelativeLinks(selectedText, window.location.href)
    );
    chrome.runtime.sendMessage({
      msg: 'selected_text',
      text: markdown
    });
  }
});