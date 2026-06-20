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
        const addonId = "{a7f3c2e8-91d4-4b6a-8e5f-3c9d7a2b1e0f}";
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

        // Clear loading message
        container.innerHTML = '';

        // Create release items
        updates.forEach((update, index) => {
            const item = document.createElement('div');
            item.className = 'release-item';

            const dot = document.createElement('div');
            dot.className = 'release-dot';

            const versionEl = document.createElement('div');
            versionEl.className = 'release-version';
            versionEl.appendChild(document.createTextNode(`v${update.version} `));

            if (index === 0) {
                const badge = document.createElement('span');
                badge.className = 'latest-badge';
                badge.textContent = 'Latest';
                versionEl.appendChild(badge);
            }

            if (update.release_date) {
                const dateEl = document.createElement('span');
                dateEl.className = 'release-date';
                dateEl.textContent = update.release_date;
                versionEl.appendChild(dateEl);
            }

            const content = document.createElement('div');
            content.className = 'release-content';

            if (update.notes && update.notes.length > 0) {
                const ul = document.createElement('ul');
                update.notes.forEach(note => {
                    const li = document.createElement('li');
                    li.textContent = note;
                    ul.appendChild(li);
                });
                content.appendChild(ul);
            } else {
                const p = document.createElement('p');
                p.textContent = 'No release notes available.';
                content.appendChild(p);
            }

            item.appendChild(dot);
            item.appendChild(versionEl);
            item.appendChild(content);
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
