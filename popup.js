/**
 * Bracket Text Copier - Popup Script
 * @version 1.0.2
 */

'use strict';

const toggleSwitch = document.getElementById('toggleSwitch');
const currentSiteEl = document.getElementById('currentSite');

let currentTab = null;
let currentHost = null;

// Disable toggle until async initialization completes to prevent race condition
toggleSwitch.disabled = true;
initialize();

async function initialize() {
    try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        currentTab = tabs[0];
        currentHost = new URL(currentTab.url).hostname.replace(/^www\./, '');

        currentSiteEl.textContent = currentHost || 'N/A';

        const result = await browser.storage.local.get('enabledSites');
        const enabledSites = result.enabledSites || {};
        toggleSwitch.checked = enabledSites[currentHost] !== false;
    } catch (_) {
        currentSiteEl.textContent = 'N/A';
    } finally {
        toggleSwitch.disabled = false;
    }
}

toggleSwitch.addEventListener('change', async (e) => {
    if (!currentTab || !currentHost) return;

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
    } catch (_) {
        e.target.checked = !newState;
    }
});
