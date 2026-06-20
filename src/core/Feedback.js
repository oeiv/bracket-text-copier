/**
 * Visual Feedback Manager
 * @module core/Feedback
 */

'use strict';

const Feedback = {
    cssClass: 'bracket-text-copied',
    lastElement: null,
    _timer: null,

    apply(element) {
        this.clear();
        element.classList.add(this.cssClass);
        this.lastElement = element;
        this._timer = setTimeout(() => this.clear(), 300_000);
    },

    clear() {
        clearTimeout(this._timer);
        if (this.lastElement) {
            this.lastElement.classList.remove(this.cssClass);
            this.lastElement = null;
        }
    }
};
