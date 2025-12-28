/**
 * Bracket Detector - Core functionality
 * @module core/BracketDetector
 */

'use strict';

const BracketDetector = {
    wrapperClass: 'bracket-text-wrapper',
    regex: /\[([^\]]+)\]/g,
    observer: null,

    /**
     * Initialize bracket detection on element
     * @param {Element} root - Root element to scan
     * @param {Function} onClick - Click handler for brackets
     */
    init(root, onClick) {
        this.onClick = onClick;
        this.processElement(root);
        this.observe(root);
    },

    /**
     * Process element for bracketed text
     * @param {Element} element - Element to process
     */
    processElement(element) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                if (node.parentElement?.classList.contains(this.wrapperClass)) {
                    return NodeFilter.FILTER_REJECT;
                }
                const tag = node.parentElement?.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(node => this.wrapBrackets(node));
    },

    /**
     * Wrap bracketed text in clickable spans
     * @param {Text} node - Text node to process
     */
    wrapBrackets(node) {
        const text = node.textContent;
        if (!this.regex.test(text)) return;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        this.regex.lastIndex = 0;
        while ((match = this.regex.exec(text)) !== null) {
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

    /**
     * Observe DOM for new content
     * @param {Element} root - Root element to observe
     */
    observe(root) {
        this.observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.processElement(node);
                    }
                }
            }
        });

        this.observer.observe(root, { childList: true, subtree: true });
    },

    /**
     * Cleanup - remove wrappers and disconnect observer
     */
    cleanup() {
        document.querySelectorAll(`.${this.wrapperClass}`).forEach(span => {
            const parent = span.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(span.textContent), span);
            }
        });

        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
};
