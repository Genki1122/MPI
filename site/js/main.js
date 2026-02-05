/**
 * MPI Corporate Site
 * Main JavaScript
 */

(function() {
    'use strict';

    // ===================================
    // Scroll Animation Observer
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // ===================================
    // Navigation
    // ===================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let lastScrollY = 0;

    // Scroll handler for navigation
    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Add scrolled class
        if (currentScrollY > 100) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('is-active');
        navMenu.classList.toggle('is-open');
        document.body.style.overflow = navMenu.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('is-active');
            navMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    // ===================================
    // Smooth Scroll
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Parallax Effect (subtle)
    // ===================================
    const heroSymbol = document.querySelector('.hero-symbol');

    if (heroSymbol) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 500);
            const scale = Math.max(0.8, 1 - scrollY / 2000);

            heroSymbol.style.opacity = opacity;
            heroSymbol.style.transform = `scale(${scale})`;
        });
    }

    // ===================================
    // Active Navigation Link
    // ===================================
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('is-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('is-active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // Page Load Animation
    // ===================================
    window.addEventListener('load', () => {
        document.body.classList.add('is-loaded');

        // Trigger initial fade-in for hero section
        setTimeout(() => {
            document.querySelectorAll('.section--hero .fade-in').forEach(el => {
                el.classList.add('is-visible');
            });
        }, 100);
    });

    // ===================================
    // Cursor Effect (optional enhancement)
    // ===================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    // Only add cursor on desktop
    if (window.matchMedia('(min-width: 769px)').matches && !('ontouchstart' in window)) {
        // Cursor styles (add to DOM)
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #5C00A4, #C4007B);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.15s ease;
                mix-blend-mode: difference;
            }
            .custom-cursor.is-visible {
                opacity: 1;
            }
            .custom-cursor.is-hover {
                transform: scale(4);
            }
            body { cursor: none; }
            a, button { cursor: none; }
        `;
        document.head.appendChild(style);
        document.body.appendChild(cursor);

        let cursorX = 0;
        let cursorY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.classList.add('is-visible');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-visible');
        });

        // Hover effect on interactive elements
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
        });

        // Smooth cursor animation
        function animateCursor() {
            currentX += (cursorX - currentX) * 0.15;
            currentY += (cursorY - currentY) * 0.15;
            cursor.style.left = currentX - 4 + 'px';
            cursor.style.top = currentY - 4 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

})();
