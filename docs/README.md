# GitHub Pages Setup Guide

This repository hosts the Bracket Text Copier extension website using GitHub Pages.

## 📁 Website Files

All website files are located in the `/docs` folder:
- `index.html` - Main landing page
- `styles.css` - Stylesheet with dark mode support
- `script.js` - Interactive features and release history loader

**Note:** Release history is loaded from `/updates.json` in the repository root via GitHub's raw URL.

## 🚀 Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" in the left sidebar
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - Save the settings

2. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Add website for GitHub Pages"
   git push origin main
   ```

3. **Automatic Deployment**:
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
     - Trigger on every push to the `main` branch
     - Deploy the contents of the `/docs` folder to GitHub Pages
     - Make your site available at: `https://oeiv.github.io/bracket-text-copier/`

## 🔄 Updating the Website

### To update content:
1. Edit files in the `/docs` folder
2. Commit and push changes to the `main` branch
3. GitHub Actions will automatically redeploy

### To update release history:
1. Edit `/updates.json` in the repository root with new version information
2. The website fetches this file via GitHub raw URL and automatically displays the latest releases

## 🌐 Accessing Your Site

Once deployed, your website will be available at:
```
https://oeiv.github.io/bracket-text-copier/
```

## 📝 Features

- ✅ Responsive design
- ✅ Dark mode support (follows system preference)
- ✅ Interactive demo
- ✅ Automatic release history from `/updates.json` (fetched from GitHub)
- ✅ SEO optimized
- ✅ Fast loading with minimal dependencies

## 🛠️ Local Development

To test the website locally:

```bash
# Navigate to the docs folder
cd docs

# Start a simple HTTP server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Open in browser
# http://localhost:8000
```

## 📦 File Structure

```
bracket-text-copier/
├── updates.json             # Release data (source of truth)
├── docs/                    # Website files (deployed to GitHub Pages)
│   ├── index.html          # Main page
│   ├── styles.css          # Styles
│   └── script.js           # JavaScript (fetches updates.json from root)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment workflow
└── [extension files]       # Browser extension source code
```

## 🎨 Customization

The website uses CSS custom properties for easy theming. Edit `docs/styles.css` to customize:
- Colors
- Fonts
- Spacing
- Dark mode colors

## 📄 License

Same as the main project (MIT License)
