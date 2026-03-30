/* ══════════════════════════════════════════════
   VESTIGIA LABS — Landing Page Scripts
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initScrollReveal();
    initTabSwitcher();
    initParticles();
    initMobileMenu();
    initSmoothScroll();
});

/* ─── Navigation Scroll Effect ─── */
function initNavScroll() {
    const nav = document.getElementById('main-nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ─── Scroll Reveal (Intersection Observer) ─── */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.platform-card, .capability-card, .arch-card, .team-card, .section-header, ' +
        '.terminal-showcase, .cta-content, .exc-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Stagger children
        const parent = entry.target.closest('.platform-grid, .capabilities-grid, .capabilities-grid-2, .arch-grid');
                    if (parent) {
                        const siblings = Array.from(parent.querySelectorAll('.reveal'));
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.08}s`;
                    }
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    revealElements.forEach(el => observer.observe(el));
}

/* ─── Terminal Showcase Tab Switcher ─── */
function initTabSwitcher() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const panels = document.querySelectorAll('.showcase-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            panels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.getElementById(`panel-${target}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Footnote filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });
}

/* ─── Floating Particles ─── */
function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.3 + 0.05;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #D4A843;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacity};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;

        container.appendChild(particle);
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${rand(-30, 30)}px, ${rand(-30, 30)}px); }
            50% { transform: translate(${rand(-20, 20)}px, ${rand(-40, 10)}px); }
            75% { transform: translate(${rand(-30, 30)}px, ${rand(-20, 20)}px); }
        }
    `;
    document.head.appendChild(style);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ─── Mobile Menu Toggle ─── */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('mobile-open');

        if (isOpen) {
            navLinks.classList.remove('mobile-open');
            toggle.classList.remove('active');
        } else {
            navLinks.classList.add('mobile-open');
            toggle.classList.add('active');
        }
    });

    // Add mobile styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.mobile-open {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 72px;
                left: 0;
                right: 0;
                background: rgba(31, 36, 84, 0.98);
                border-bottom: 1px solid #1A2332;
                padding: 20px 24px;
                gap: 16px;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                animation: menuSlide 0.25s ease;
            }

            @keyframes menuSlide {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .nav-mobile-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            .nav-mobile-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            .nav-mobile-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ─── Smooth Scroll for Anchor Links ─── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.getElementById('nav-links');
                if (navLinks) navLinks.classList.remove('mobile-open');
                const toggle = document.getElementById('mobile-toggle');
                if (toggle) toggle.classList.remove('active');
            }
        });
    });
}
