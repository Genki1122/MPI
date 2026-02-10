/**
 * MPI Corporate Site
 * Main JavaScript - 静謐かつ動的
 */

(function() {
    'use strict';

    // ===================================
    // Easing Functions - 呼吸のような挙動
    // ===================================
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
    const easeBreath = (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // ===================================
    // Scroll Animation Observer
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: [0, 0.1, 0.2]
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
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

        // Add scrolled class with hysteresis
        if (currentScrollY > 120) {
            nav.classList.add('is-scrolled');
        } else if (currentScrollY < 80) {
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
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle && navMenu) {
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
    }

    // ===================================
    // Smooth Scroll - 滑らかな遷移
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                // Custom smooth scroll with easing
                smoothScrollTo(offsetPosition, 1200);
            }
        });
    });

    // Custom smooth scroll function
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuint(progress);

            window.scrollTo(0, startY + difference * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // ===================================
    // Hero Image Parallax
    // ===================================
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        let rafId = null;

        function updateHeroParallax() {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            if (scrollY < viewportHeight) {
                const progress = scrollY / viewportHeight;
                const opacity = Math.max(0, 1 - progress * 1.2);
                const scale = 1 - progress * 0.05;
                const translateY = scrollY * 0.15;

                heroImage.style.opacity = opacity;
                heroImage.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            }

            rafId = null;
        }

        window.addEventListener('scroll', () => {
            if (!rafId) {
                rafId = requestAnimationFrame(updateHeroParallax);
            }
        }, { passive: true });
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
        rootMargin: '-45% 0px -45% 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // Page Load Animation - 静謐な登場
    // ===================================
    window.addEventListener('load', () => {
        document.body.classList.add('is-loaded');

        // Staggered reveal for hero section
        const heroElements = document.querySelectorAll('.section--hero .fade-in');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, 200 + (index * 200));
        });
    });

    // ===================================
    // Typing Animation - 一文字ずつ現れる
    // ===================================
    const typingElements = document.querySelectorAll('.typing-text');

    typingElements.forEach(el => {
        const text = el.getAttribute('data-text');
        if (!text) return;

        // Split by | for line breaks
        const lines = text.split('|');
        let hasTyped = false;

        // Create typing observer
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasTyped) {
                    hasTyped = true;
                    el.classList.add('is-typing');
                    typeText(el, lines);
                }
            });
        }, {
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.5
        });

        typingObserver.observe(el);
    });

    function typeText(element, lines) {
        element.innerHTML = '';
        let lineIndex = 0;
        let charIndex = 0;
        const charDelay = 120; // ms between characters
        const lineDelay = 300; // extra delay after line break

        function type() {
            if (lineIndex >= lines.length) {
                element.classList.remove('is-typing');
                element.classList.add('is-typed');
                return;
            }

            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                // Add character
                const char = currentLine[charIndex];
                const span = document.createElement('span');
                span.className = 'typing-char';
                span.textContent = char;
                span.style.animationDelay = '0ms';

                // Find or create line container
                let lineContainer = element.querySelector(`.typing-line-${lineIndex}`);
                if (!lineContainer) {
                    lineContainer = document.createElement('span');
                    lineContainer.className = `typing-line typing-line-${lineIndex}`;
                    element.appendChild(lineContainer);
                }

                lineContainer.appendChild(span);
                charIndex++;

                setTimeout(type, charDelay);
            } else {
                // Move to next line
                if (lineIndex < lines.length - 1) {
                    element.appendChild(document.createElement('br'));
                }
                lineIndex++;
                charIndex = 0;
                setTimeout(type, lineDelay);
            }
        }

        // Start typing with initial delay
        setTimeout(type, 400);
    }

    // ===================================
    // Cursor Effect - 知的な追従
    // ===================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    // Only add cursor on desktop
    if (window.matchMedia('(min-width: 769px)').matches && !('ontouchstart' in window)) {
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--color-purple, #5C00A4);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                            width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                            height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                mix-blend-mode: difference;
            }
            .custom-cursor.is-visible {
                opacity: 0.8;
            }
            .custom-cursor.is-hover {
                width: 24px;
                height: 24px;
                opacity: 0.6;
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
        const smoothing = 0.12;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.classList.add('is-visible');
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-visible');
        });

        // Hover effect on interactive elements
        document.querySelectorAll('a, button, .work-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
        });

        // Smooth cursor animation with improved easing
        function animateCursor() {
            const dx = cursorX - currentX;
            const dy = cursorY - currentY;

            currentX += dx * smoothing;
            currentY += dy * smoothing;

            cursor.style.left = currentX - 3 + 'px';
            cursor.style.top = currentY - 3 + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ===================================
    // Scroll Progress Indicator (optional)
    // ===================================
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';

    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 1px;
            background: linear-gradient(90deg, var(--color-purple, #5C00A4), var(--color-magenta, #AF0066));
            z-index: 1001;
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        .scroll-progress.is-visible {
            opacity: 1;
        }
    `;
    document.head.appendChild(progressStyle);
    document.body.appendChild(scrollProgress);

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollProgress.style.width = scrollPercent + '%';

        if (scrollTop > 200) {
            scrollProgress.classList.add('is-visible');
        } else {
            scrollProgress.classList.remove('is-visible');
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateScrollProgress);
    }, { passive: true });

})();
