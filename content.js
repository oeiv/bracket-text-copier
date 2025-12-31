/**
 * Bracket Text Copier - Main Entry Point
 * @version 1.0.1
 */

'use strict';

const App = {
  enabled: true,
  currentHost: window.location.hostname.replace(/^www\./, ''),

  async init() {
    Logger.log('Initializing...');

    Theme.detect();
    await this.loadSettings();
    this.setupListeners();

    if (this.enabled) {
      this.start();
    }
  },

  async loadSettings() {
    const result = await Storage.get('enabledSites');
    const enabledSites = result.enabledSites || {};
    this.enabled = enabledSites[this.currentHost] !== false;
  },

  setupListeners() {
    browser.runtime.onMessage.addListener((request) => {
      if (request.action === 'toggle') {
        this.enabled = request.enabled;
        this.enabled ? this.start() : this.stop();
      }
    });
  },

  start() {
    BracketDetector.init(document.body, (e) => this.handleClick(e));
  },

  stop() {
    BracketDetector.cleanup();
  },

  async handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const text = event.target.dataset.copyText;
    const success = await Clipboard.copy(text);

    if (success) {
      Feedback.apply(event.target);
      Toast.show('Copied: ' + text, 'success');
    } else {
      Toast.show('Copy failed', 'info');
    }
  }
};

App.init();