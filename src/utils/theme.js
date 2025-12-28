/**
 * Theme Detection Utility
 * @module utils/theme
 */

'use strict';

const Theme = {
    cssVars: {
        light: {
            '--btc-bracket-bg': '#fffacd',
            '--btc-bracket-hover-bg': '#ffeb3b'
        },
        dark: {
            '--btc-bracket-bg': '#3a3a3a',
            '--btc-bracket-hover-bg': '#4a4a4a'
        }
    },

    /**
     * Detect and apply theme
     */
    detect() {
        const isDark = this.isDarkMode();
        this.apply(isDark ? 'dark' : 'light');
    },

    /**
     * Check if dark mode is active
     * @returns {boolean}
     */
    isDarkMode() {
        return (
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
            document.documentElement.getAttribute('data-theme') === 'dark' ||
            document.body.classList.contains('dark') ||
            document.body.classList.contains('dark-mode')
        );
    },

    /**
     * Apply theme CSS variables
     * @param {string} theme - 'light' or 'dark'
     */
    apply(theme) {
        const vars = this.cssVars[theme] || this.cssVars.light;
        Object.entries(vars).forEach(([prop, value]) => {
            document.documentElement.style.setProperty(prop, value);
        });
    }
};
