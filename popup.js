/**
 * Bracket Text Copier - Popup Script
 * @version 1.0.1
 */

'use strict';

let currentTab;
let currentHost;

initialize();

async function initialize() {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    currentTab = tabs[0];
    currentHost = new URL(currentTab.url).hostname.replace(/^www\./, '');

    document.getElementById('currentSite').textContent = currentHost || 'N/A';

    const result = await browser.storage.local.get('enabledSites');
    const enabledSites = result.enabledSites || {};
    document.getElementById('toggleSwitch').checked = enabledSites[currentHost] !== false;
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('toggleSwitch').addEventListener('change', async (e) => {
  const newState = e.target.checked;

  try {
    const result = await browser.storage.local.get('enabledSites');
    const enabledSites = result.enabledSites || {};

    if (newState) {
      delete enabledSites[currentHost];
    } else {
      enabledSites[currentHost] = false;
    }

    await browser.storage.local.set({ enabledSites });
    await browser.tabs.sendMessage(currentTab.id, { action: 'toggle', enabled: newState });
  } catch (error) {
    e.target.checked = !newState;
  }
});
