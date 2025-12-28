/**
 * Visual Feedback Manager
 * @module core/Feedback
 */

'use strict';

const Feedback = {
    lastElement: null,
    timeout: 2000,

    /**
     * Apply visual feedback - change background color
     * @param {Element} element
     */
    apply(element) {
        this.clear();

        element.style.transition = 'background-color 0.2s ease';
        element.style.backgroundColor = '#4caf50';
        element.style.color = '#fff';

        this.lastElement = element;

        setTimeout(() => {
            if (this.lastElement === element) {
                this.clear();
            }
        }, this.timeout);
    },

    /**
     * Clear visual feedback
     */
    clear() {
        if (this.lastElement) {
            this.lastElement.style.backgroundColor = '';
            this.lastElement.style.color = '';
            this.lastElement = null;
        }
    }
};
