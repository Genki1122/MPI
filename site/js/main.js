/**
 * MPI Corporate Site
 * 「沈黙の余白」が情報を伝える
 */

(function () {
    'use strict';

    // ===================================
    // Scroll-triggered Fade-in Observer
    // 一節ごとに浮かび上がる
    // ===================================
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        {
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.1,
        }
    );

    document.querySelectorAll('.fade-in').forEach((el) => {
        fadeObserver.observe(el);
    });

    // ===================================
    // Navigation scroll state
    // ===================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    let ticking = false;
    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 120) {
                        nav.classList.add('is-scrolled');
                    } else if (window.scrollY < 80) {
                        nav.classList.remove('is-scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true }
    );

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-open');
            document.body.style.overflow = navMenu.classList.contains('is-open')
                ? 'hidden'
                : '';
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('is-active');
                navMenu.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ===================================
    // Hero parallax — subtle fade on scroll
    // ===================================
    const heroLogo = document.querySelector('.hero-logo-img');
    if (heroLogo) {
        let rafId = null;
        window.addEventListener(
            'scroll',
            () => {
                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        const y = window.scrollY;
                        const vh = window.innerHeight;
                        if (y < vh) {
                            const progress = y / vh;
                            heroLogo.style.opacity = Math.max(0, 1 - progress * 1.4);
                            heroLogo.style.transform =
                                'scale(' + (1 - progress * 0.04) + ') translateY(' + y * 0.12 + 'px)';
                        }
                        rafId = null;
                    });
                }
            },
            { passive: true }
        );
    }

    // ===================================
    // Page load — 静謐な登場
    // ===================================
    window.addEventListener('load', () => {
        document.body.classList.add('is-loaded');

        // Stagger hero elements
        const heroEls = document.querySelectorAll('.hero .fade-in');
        heroEls.forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), 300 + i * 250);
        });

        // Sequential word reveal: Managing → Professional → Intellect
        const heroWords = document.querySelectorAll('.hero-word');
        const wordBaseDelay = 1000; // start after logo appears
        const wordInterval = 600;  // breathing interval between words
        heroWords.forEach((word, i) => {
            setTimeout(() => word.classList.add('is-visible'), wordBaseDelay + i * wordInterval);
        });
    });

    // ===================================
    // Scroll progress — 1px gradient line
    // ===================================
    const bar = document.createElement('div');
    bar.style.cssText =
        'position:fixed;top:0;left:0;width:0%;height:1px;' +
        'background:linear-gradient(90deg,#5C00A4,#AF0066);' +
        'z-index:1001;opacity:0;transition:opacity .3s ease;pointer-events:none;';
    document.body.appendChild(bar);

    window.addEventListener(
        'scroll',
        () => {
            requestAnimationFrame(() => {
                const pct =
                    (window.scrollY /
                        (document.documentElement.scrollHeight - window.innerHeight)) *
                    100;
                bar.style.width = pct + '%';
                bar.style.opacity = window.scrollY > 200 ? '1' : '0';
            });
        },
        { passive: true }
    );
})();
