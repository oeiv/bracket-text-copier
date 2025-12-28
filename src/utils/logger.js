/**
 * Logger Utility
 * @module utils/logger
 */

'use strict';

const Logger = {
    enabled: false,
    prefix: '[BTC]',

    log(...args) {
        if (this.enabled) console.log(this.prefix, ...args);
    },

    error(...args) {
        console.error(this.prefix + ' Error:', ...args);
    },

    warn(...args) {
        if (this.enabled) console.warn(this.prefix + ' Warning:', ...args);
    },

    enable() {
        this.enabled = true;
    },

    disable() {
        this.enabled = false;
    }
};
