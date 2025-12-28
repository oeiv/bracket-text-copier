/**
 * Clipboard Utility
 * @module utils/clipboard
 */

'use strict';

const Clipboard = {
    /**
     * Copy text to clipboard with fallback
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} - Success status
     */
    async copy(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            return this.fallbackCopy(text);
        }
    },

    /**
     * Fallback copy using textarea
     * @param {string} text - Text to copy
     * @returns {boolean} - Success status
     */
    fallbackCopy(text) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (err) {
            Logger.error('Fallback copy failed:', err);
            return false;
        }
    }
};
