/**
 * Toast Notification Utility
 * @module utils/toast
 */

'use strict';

const Toast = {
    className: 'bracket-text-toast',
    duration: 2000,
    _current: null,
    _hideTimer: null,
    _removeTimer: null,

    show(message, type = 'info') {
        this.hide();

        const toast = document.createElement('div');
        toast.className = `${this.className} ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        this._current = toast;

        requestAnimationFrame(() => toast.classList.add('show'));

        this._hideTimer = setTimeout(() => {
            toast.classList.remove('show');
            this._removeTimer = setTimeout(() => {
                if (toast.parentNode) toast.remove();
                if (this._current === toast) this._current = null;
            }, 300);
        }, this.duration);
    },

    hide() {
        clearTimeout(this._hideTimer);
        clearTimeout(this._removeTimer);
        if (this._current) {
            this._current.remove();
            this._current = null;
        }
    }
};
