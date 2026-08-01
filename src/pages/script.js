import './styles.css';

/* Shai-Heun — interactions */

(function () {
    'use strict';

    // Scroll progress indicator
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.height = progress + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

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

    // Contact form — show success instead of mailto
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            formSuccess.classList.add('is-visible');
        });
    }

    // Hero carousel
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const carouselPrev = document.querySelector('.carousel-arrow--prev');
    const carouselNext = document.querySelector('.carousel-arrow--next');
    const heroCarousel = document.querySelector('.hero-carousel');

    if (carouselTrack && carouselDots) {
        const slides = Array.from(carouselTrack.children);
        const total = slides.length;
        let current = 0;
        let interval = null;

        const createDots = () => {
            carouselDots.innerHTML = '';
            slides.forEach((_, i) => {
                const btn = document.createElement('button');
                btn.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
                btn.setAttribute('role', 'tab');
                btn.setAttribute('aria-label', `שקופית ${i + 1}`);
                btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
                btn.type = 'button';
                btn.addEventListener('click', () => goTo(i));
                carouselDots.appendChild(btn);
            });
        };

        const updateSlides = () => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === current);
            });
            carouselTrack.style.transform = `translateX(${current * 100}%)`;
            const dots = carouselDots.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === current);
                dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
            });
        };

        const goTo = (index) => {
            current = (index + total) % total;
            updateSlides();
        };

        const next = () => goTo(current + 1);
        const prev = () => goTo(current - 1);

        const startAuto = () => {
            if (interval) clearInterval(interval);
            interval = setInterval(next, 5000);
        };

        const stopAuto = () => {
            if (interval) clearInterval(interval);
            interval = null;
        };

        createDots();
        updateSlides();
        startAuto();

        if (carouselPrev) carouselPrev.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
        if (carouselNext) carouselNext.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', stopAuto);
            heroCarousel.addEventListener('mouseleave', startAuto);
        }

        // Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        if (heroCarousel) {
            heroCarousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            heroCarousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    stopAuto();
                    diff > 0 ? next() : prev();
                    startAuto();
                }
            }, { passive: true });
        }
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

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.parentElement.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = img.dataset.caption || '';
                lightbox.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('is-active');
            document.body.style.overflow = '';
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
                closeLightbox();
            }
        });
    }

    // Reveal-on-scroll for sections
    const revealEls = document.querySelectorAll(
        '.section-title, .section-lede, .prose, .method-card, ' +
        '.gallery-item, .pull-quote, .about-image, .contact-card, ' +
        '.event-card, .shop-card, .location-card, .philosophy-quote, ' +
        '.philosophy-source, .philosophy-divider, .highlight-card, .benefit-card'
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
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-in'));
    }

    // Smooth scroll for same-page anchors only
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
