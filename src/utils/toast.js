/**
 * Toast Notification Utility
 * @module utils/toast
 * @version 1.0.0
 */

'use strict';

const Toast = {
    className: 'bracket-text-toast',
    duration: 3000,

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'info'
     */
    show(message, type = 'info') {
        this.hide();

        const toast = document.createElement('div');
        toast.className = `${this.className} ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, this.duration);
    },

    /**
     * Hide existing toast
     */
    hide() {
        const existing = document.querySelector(`.${this.className}`);
        if (existing) existing.remove();
    }
};
