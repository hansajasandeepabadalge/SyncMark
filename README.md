<p align="center">
  <img src="icons/icon128.png" width="120" alt="SyncMark Logo" />
</p>

<p align="center">A Chrome extension for syncing bookmarks from a remote HTML file to your browser's bookmarks bar.</p>

<p align="center">
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/version-1.1-blue.svg" alt="Version" /></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/manifest-v3-green.svg" alt="Manifest V3" /></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/chrome-extension-orange.svg" alt="Chrome Extension" /></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" /></a>
</p>

## Description

SyncMark is a Chrome extension that allows you to sync bookmarks from a remote HTML file hosted on GitHub directly to your Chrome bookmarks bar. The extension automatically imports bookmarks when opened and provides manual sync and clear options.

## Features

- 🔄 **Automatic Sync**: Automatically imports bookmarks when the extension popup is opened
- 🧹 **Clear Bookmarks**: Remove all bookmarks from the bookmarks bar with one click
- 📁 **Folder Support**: Preserves folder structure from the HTML file
- 🌐 **Remote Source**: Fetches bookmarks from a GitHub-hosted HTML file
- 🎨 **Clean UI**: Simple and intuitive popup interface
- 📚 **150+ Links Curated**: Includes over 150 carefully collected and personally tested links.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The SyncMark extension should now appear in your extensions list

## Usage

### Sync Bookmarks
- Click the extension icon in your browser toolbar
- The extension will automatically sync bookmarks when opened
- Or click the "Sync" button to manually trigger the sync

### Clear Bookmarks
- Click the "Clear" button in the popup to remove all bookmarks from your bookmarks bar

## Configuration

The extension is currently configured to sync from:
```
https://raw.githubusercontent.com/hansajasandeepabadalge/SyncMark/refs/heads/main/bookmarks.html
```

To use your own bookmarks file, modify the URL in [`popup.js`](popup.js) in the [`importBookmarks`](popup.js) function.

## File Structure

```
.
├── manifest.json          # Extension manifest file
├── popup.html            # Popup interface
├── popup.js              # Main functionality
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `bookmarks`, `storage`
- **Host Permissions**: `https://raw.githubusercontent.com/*`
- **Target**: Chrome bookmarks bar (ID: "1")

## Browser Compatibility

This extension is designed for Google Chrome and other Chromium-based browsers that support Manifest V3.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is [MIT licensed](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository.
