/**
 * Storage Manager
 * @module utils/storage
 */

'use strict';

const Storage = {
    /**
     * Get value from storage
     * @param {string|string[]} keys - Keys to retrieve
     * @returns {Promise<Object>}
     */
    async get(keys) {
        try {
            return await browser.storage.local.get(keys);
        } catch (err) {
            Logger.error('Storage get error:', err);
            return {};
        }
    },

    /**
     * Set value in storage
     * @param {Object} data - Data to store
     * @returns {Promise<boolean>}
     */
    async set(data) {
        try {
            await browser.storage.local.set(data);
            return true;
        } catch (err) {
            Logger.error('Storage set error:', err);
            return false;
        }
    },

    /**
     * Remove keys from storage
     * @param {string|string[]} keys - Keys to remove
     * @returns {Promise<boolean>}
     */
    async remove(keys) {
        try {
            await browser.storage.local.remove(keys);
            return true;
        } catch (err) {
            Logger.error('Storage remove error:', err);
            return false;
        }
    },

    /**
     * Listen for storage changes
     * @param {Function} callback - Callback function
     */
    onChange(callback) {
        browser.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === 'local') {
                callback(changes);
            }
        });
    }
};
