/* Shai-Heun — interactions */

(function () {
    'use strict';

    // Sticky header shadow on scroll
    const header = document.getElementById('siteHeader');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Mobile nav toggle
    const toggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            const open = navList.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // Close on link click (mobile)
        navList.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navList.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Reveal-on-scroll for sections
    const revealEls = document.querySelectorAll(
        '.section-title, .section-lede, .prose, .method-card, .values-list li, ' +
        '.gallery-item, .pull-quote, .founder-portrait, .contact-card, .hero-title, ' +
        '.hero-lede, .hero-meta, .eyebrow'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-in'));
    }
})();
