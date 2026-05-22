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

    // Mark past events
    document.querySelectorAll('[data-event-date]').forEach(card => {
        const date = new Date(card.dataset.eventDate);
        const now = new Date();
        now.setHours(0,0,0,0);
        if (date < now) card.classList.add('is-past');
    });

    // Gallery expand/collapse
    const galleryToggle = document.getElementById('galleryToggle');
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryToggle && galleryGrid) {
        galleryToggle.addEventListener('click', () => {
            galleryGrid.classList.toggle('is-expanded');
            const isExpanded = galleryGrid.classList.contains('is-expanded');
            galleryToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
    }

    // Reveal-on-scroll for sections
    const revealEls = document.querySelectorAll(
        '.section-title, .section-lede, .prose, .method-card, .values-list li, ' +
        '.gallery-item, .pull-quote, .about-image, .contact-card, .hero-title, ' +
        '.hero-lede, .hero-meta, .eyebrow, .event-card, .shop-card'
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
