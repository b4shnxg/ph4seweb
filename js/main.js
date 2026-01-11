/* ================================================
   PH4SE - MAIN JAVASCRIPT
   Version 2.0 - Enhanced
   ================================================ */

(function() {
    'use strict';

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

    /* ================================================
       INIT
       ================================================ */
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initHeader();
        initMobileNav();
        initScrollAnimations();
        initActiveNav();
        initStatusTime();
        initCounters();
        initParallax();
    }

    /* ================================================
       HEADER SCROLL
       ================================================ */
    function initHeader() {
        const header = $('.header');
        if (!header) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    
                    if (scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }

                    lastScroll = scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ================================================
       MOBILE NAVIGATION
       ================================================ */
    function initMobileNav() {
        const toggle = $('.nav-toggle');
        const nav = $('.nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        $$('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ================================================
       SCROLL ANIMATIONS
       ================================================ */
    function initScrollAnimations() {
        const elements = $$('.fade-in');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    /* ================================================
       ACTIVE NAV
       ================================================ */
    function initActiveNav() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        $$('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === page || 
                (page === '' && href === 'index.html') || 
                (page === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /* ================================================
       STATUS TIME
       ================================================ */
    function initStatusTime() {
        const timeEl = $('.status-card-time');
        if (!timeEl) return;

        function update() {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            timeEl.textContent = `Updated: ${time} UTC`;
        }

        update();
        setInterval(update, 1000);
    }

    /* ================================================
       COUNTER ANIMATION
       ================================================ */
    function initCounters() {
        const stats = $$('.stat-num');
        if (!stats.length) return;

        let animated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));

        function animateCounters() {
            stats.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/^([\d.]+)(.*)$/);
                if (!match) return;

                const target = parseFloat(match[1]);
                const suffix = match[2];
                const isDecimal = text.includes('.');
                
                let current = 0;
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                const stepTime = duration / steps;

                stat.textContent = '0' + suffix;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
                }, stepTime);
            });
        }
    }

    /* ================================================
       PARALLAX EFFECT
       ================================================ */
    function initParallax() {
        const gradients = $$('.bg-gradient-1, .bg-gradient-2');
        if (!gradients.length) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    gradients.forEach((el, i) => {
                        const speed = i === 0 ? 0.3 : 0.2;
                        el.style.transform = `translateY(${scrollY * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

})();
