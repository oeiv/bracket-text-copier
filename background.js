/**
 * Bracket Text Copier Pro - Background Script
 * @version 2.2.0
 */

'use strict';

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    browser.storage.local.set({ enabledSites: {} });
  }
});

// Check if badge APIs are supported (not available on Firefox for Android)
const badgeSupported = typeof browser.browserAction.setBadgeText === 'function';

browser.runtime.onMessage.addListener((request, sender) => {
  if (request.action === 'updateBadge' && sender.tab?.id && badgeSupported) {
    const text = request.count > 0 ? request.count.toString() : '';
    browser.browserAction.setBadgeText({ text, tabId: sender.tab.id });
    browser.browserAction.setBadgeBackgroundColor({
      color: request.count > 0 ? '#4CAF50' : '#999',
      tabId: sender.tab.id
    });
  }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete' && badgeSupported) {
    browser.browserAction.setBadgeText({ text: '', tabId });
  }
});
