# Bracket Text Copier

Click on `[bracketed text]` to copy it instantly.

## Features

- Click `[text]` to copy without brackets
- Visual feedback on copy
- Enable/disable per site
- Dark mode support

## Install

**[Download from Firefox Add-ons](https://addons.mozilla.org/addon/bracket-text-copier/)**

Or load manually:
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

## Build

To create the distribution files (`.zip` and `.xpi`), run:

```bash
# Create ZIP (explicit file list)
zip -r bracket-text-copier-1.0.0.zip manifest.json background.js content.js popup.html popup.js styles.css icons/ src/

# Create XPI (Firefox)
cp bracket-text-copier-1.0.0.zip bracket-text-copier-1.0.0.xpi
```