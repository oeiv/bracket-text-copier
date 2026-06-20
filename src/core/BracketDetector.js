/**
 * Bracket Detector - Core functionality
 * @module core/BracketDetector
 */

'use strict';

const BracketDetector = {
    wrapperClass: 'bracket-text-wrapper',
    observer: null,
    _pendingNodes: [],
    _rafId: null,
    onClick: null,

    init(root, onClick) {
        this.onClick = onClick;
        this.processElement(root);
        this.observe(root);
    },

    processElement(element) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                const tag = node.parentElement?.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
                    return NodeFilter.FILTER_REJECT;
                }
                if (node.parentElement?.classList.contains(this.wrapperClass)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);
        textNodes.forEach(node => this.wrapBrackets(node));
    },

    wrapBrackets(node) {
        const text = node.textContent;
        // Use a local regex to avoid stateful lastIndex bugs on the shared instance
        const regex = /\[([^\]]+)\]/g;
        if (!regex.test(text)) return;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        regex.lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
            }

            const span = document.createElement('span');
            span.className = this.wrapperClass;
            span.textContent = match[0];
            span.dataset.copyText = match[1];
            span.addEventListener('click', this.onClick);
            fragment.appendChild(span);

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        node.parentNode.replaceChild(fragment, node);
    },

    observe(root) {
        this.observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this._pendingNodes.push(node);
                    } else if (
                        node.nodeType === Node.TEXT_NODE &&
                        node.parentElement &&
                        !node.parentElement.classList.contains(this.wrapperClass)
                    ) {
                        this._pendingNodes.push(node);
                    }
                }
            }
            this._scheduleBatch();
        });

        this.observer.observe(root, { childList: true, subtree: true });
    },

    // Batch all mutations into a single rAF tick to avoid processing storms on heavy SPAs
    _scheduleBatch() {
        if (this._rafId !== null) return;
        this._rafId = requestAnimationFrame(() => {
            this._rafId = null;
            const nodes = this._pendingNodes.splice(0);
            for (const node of nodes) {
                if (!document.contains(node)) continue;
                if (node.nodeType === Node.TEXT_NODE) {
                    this.wrapBrackets(node);
                } else {
                    this.processElement(node);
                }
            }
        });
    },

    cleanup() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        this._pendingNodes = [];

        const parents = new Set();
        document.querySelectorAll(`.${this.wrapperClass}`).forEach(span => {
            const parent = span.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(span.textContent), span);
                parents.add(parent);
            }
        });
        // Merge adjacent text nodes left behind after unwrapping
        parents.forEach(p => p.normalize());
    }
};
