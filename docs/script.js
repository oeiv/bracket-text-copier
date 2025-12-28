// Interactive demo for the bracket text - global function for onclick
function copyDemo(element) {
    const copyFeedback = document.getElementById('copy-feedback');
    const text = element.textContent.replace(/^\[|\]$/g, '');

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // Add visual feedback to the clicked element
        element.classList.add('copied');

        // Show global feedback
        if (copyFeedback) {
            copyFeedback.classList.add('show');
        }

        // Reset after animation
        setTimeout(() => {
            element.classList.remove('copied');
            if (copyFeedback) {
                copyFeedback.classList.remove('show');
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}

// Load release history from updates.json
async function loadReleases() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/oeiv/bracket-text-copier/main/updates.json');
        const data = await response.json();

        // Extract updates for our addon ID
        const addonId = "{b68a8d05-4d2c-473d-829d-487625123456}";
        const updates = data.addons[addonId]?.updates || [];

        // Sort by version (reverse to show newest first)
        updates.reverse();

        const container = document.getElementById('release-timeline');
        const latestVersionEl = document.getElementById('latest-version');
        const installBtn = document.getElementById('install-btn');

        if (updates.length === 0) {
            container.innerHTML = '<div class="release-item"><div class="release-content"><p>No releases available yet.</p></div></div>';
            return;
        }

        // Update latest version in stats
        if (latestVersionEl && updates[0]) {
            latestVersionEl.textContent = updates[0].version;
        }

        // Update install button link to latest release
        if (installBtn && updates[0]?.update_link) {
            installBtn.href = updates[0].update_link;
        }

        // Clear loading message
        container.innerHTML = '';

        // Create release items
        updates.forEach((update, index) => {
            const item = document.createElement('div');
            item.className = 'release-item';

            const notesHtml = update.notes && update.notes.length > 0
                ? `<ul>${update.notes.map(note => `<li>${note}</li>`).join('')}</ul>`
                : '<p>No release notes available.</p>';

            const isLatest = index === 0;
            const latestBadge = isLatest ? '<span class="latest-badge">Latest</span>' : '';

            item.innerHTML = `
                <div class="release-dot"></div>
                <div class="release-version">
                    v${update.version}
                    ${latestBadge}
                    ${update.release_date ? `<span class="release-date">${update.release_date}</span>` : ''}
                </div>
                <div class="release-content">
                    ${notesHtml}
                </div>
            `;

            container.appendChild(item);
        });

    } catch (error) {
        console.error('Failed to load releases:', error);
        const container = document.getElementById('release-timeline');
        container.innerHTML = `
            <div class="release-item">
                <div class="release-content error">
                    <p>Could not load release history. Please check back later or visit our 
                    <a href="https://github.com/oeiv/bracket-text-copier/releases">GitHub Releases</a> page.</p>
                </div>
            </div>
        `;
    }
}

// Interactive demo for the bracket text
document.addEventListener('DOMContentLoaded', () => {
    const demoBracket = document.querySelector('.demo-bracket');
    const copyFeedback = document.querySelector('.copy-feedback');

    if (demoBracket && copyFeedback) {
        demoBracket.addEventListener('click', () => {
            // Extract text without brackets
            const text = demoBracket.textContent.replace(/^\[|\]$/g, '');

            // Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                copyFeedback.classList.add('show');

                // Hide feedback after 2 seconds
                setTimeout(() => {
                    copyFeedback.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text:', err);
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card, .faq-item, .method').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add parallax effect to stars
    const stars = document.querySelector('.stars');
    if (stars) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Detect if user is on Firefox
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const installBtn = document.getElementById('install-btn');

    if (installBtn && !isFirefox) {
        // Update button text for non-Firefox browsers
        const btnText = installBtn.querySelector('span') || installBtn;
        installBtn.title = 'This extension is designed for Firefox';
    }

    // Load release history
    loadReleases();
});
