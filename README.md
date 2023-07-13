# Clipsidian

Clipsidian is a Chrome extension that streamlines the process of collecting web content for [Obsidian](https://obsidian.md/), a powerful knowledge base that works on top of a local folder of plain text Markdown files. With Clipsidian, you can easily extract crucial information from web pages and store it directly into your Obsidian vault. This extension goes beyond basic web clipping by offering customization for each action, allowing you to decide where the content is stored, its format, and include additional details like date, time, page title, and URL.

## Key Features

### Customizable Actions

Clipsidian allows you to create and tailor actions that can be accessed directly from the browser's context menu (the right-click menu). 

These actions can create, append, or overwrite a note in your Obsidian vault, making it easier to transfer selected web content to your vault with just a few clicks. For example, you could create an action to clip highlighted text and automatically save it to a "Research" note. You can manage your actions from the extension options menu.

### Metadata Formatting

Control how your clipped content appears. You can decide to include metadata such as date, time, page title, and URL in your notes.

## Installation Guide

### Manual Installation (Chrome Developer Mode)

1. **Repository Cloning:** Clone this repository to your local machine using `git clone https://github.com/niondevi/clipsidian.git`. Alternatively, you can download and extract it in any directory.
2. **Extension Loading:** Open Chrome, navigate to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", and choose the `Clipsidian` folder.
3. **Action Configuration:** Visit the options page of Clipsidian in your Chrome extensions settings to set up your custom actions.

## How to Use

1. Configure your actions in the extension options.
2. Highlight the content you want in your web browser.
3. Right-click to access the context menu.
4. Select the relevant action, for instance, `Clip selection to Obsidian`.
5. For first-time users, you'll need to authorize `https://niondevi.github.io/clipsidian/new.htm` to open Obsidian. This authorization only happens once as this page will be used for subsequent clips, avoiding repeated authorization requests.

## Data Safety

Your data is secure and is only processed within your browser, even during the authorization workaround. We don't send, track, or store any of your details. If you still have any doubts, you or someone you trust could always take a look at the code, just to make sure everything's clear. As an open-source project, we believe in full transparency.

## Acknowledgements

Thanks to [moment/moment](https://github.com/moment/moment) for the date/time formatting and [mixmark-io/turndown](https://github.com/mixmark-io/turndown) for the Markdown conversion.

## Support

For any issues, feature requests, or questions, please open an issue on the GitHub repository.

## License

This project is licensed under the GPLv3 License. For more details, see the [LICENSE](LICENSE) file in the repository.