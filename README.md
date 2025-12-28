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
├── popup.html/js
├── styles.css
├── updates.json          # Release history (source of truth)
├── docs/                 # GitHub Pages website
└── src/
    ├── utils/
    └── core/
```

## Updating Version

Edit `updates.json` in the root to add new release information. The website fetches this file automatically.

## Website

Live at: https://oeiv.github.io/bracket-text-copier/