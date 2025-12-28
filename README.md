# Bracket Text Copier

Click on `[bracketed text]` to copy it instantly.

## Features

- Click `[text]` to copy without brackets
- Visual feedback on copy
- Enable/disable per site
- Dark mode support

## Install

1. Firefox → `about:debugging`
2. Click "Load Temporary Add-on"
3. Select `manifest.json`

## Structure

```
├── manifest.json
├── content.js
├── background.js
├── popup.html/js/css
├── styles.css
└── src/
    ├── utils/
    └── core/
```