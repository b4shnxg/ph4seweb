/* ================================================
   PH4SE DISCORD BOT - MAIN JAVASCRIPT
   ================================================ */

(function() {
    'use strict';

    /* ================================================
       DOM ELEMENTS
       ================================================ */
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const fadeElements = document.querySelectorAll('.fade-in');

    /* ================================================
       HEADER SCROLL EFFECT
       ================================================ */
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* ================================================
       MOBILE NAVIGATION
       ================================================ */
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navToggle) {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    /* ================================================
       FADE IN ANIMATIONS
       ================================================ */
    function checkFadeIn() {
        fadeElements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    window.addEventListener('load', checkFadeIn);
    checkFadeIn();

    /* ================================================
       SMOOTH SCROLL
       ================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ================================================
       ACTIVE NAV LINK
       ================================================ */
    function setActiveNav() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNav();

    /* ================================================
       STATUS PAGE - LIVE TIME
       ================================================ */
    const timeElement = document.querySelector('.status-card-time');
    
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            timeElement.textContent = 'Updated: ' + now.toLocaleTimeString('en-US', options) + ' UTC';
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    /* ================================================
       STATS COUNTER ANIMATION
       ================================================ */
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;
        
        function step() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                setTimeout(step, stepTime);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        step();
    }

    const statElements = document.querySelectorAll('.stat-num');
    let statsAnimated = false;

    function checkStats() {
        if (statsAnimated) return;
        
        statElements.forEach(function(stat) {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                statsAnimated = true;
                
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d.]/g, '');
                
                stat.textContent = '0' + suffix;
                animateCounter(stat, number, suffix);
            }
        });
    }

    window.addEventListener('scroll', checkStats);
    window.addEventListener('load', checkStats);

    /* ================================================
       KEYBOARD NAVIGATION
       ================================================ */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* ================================================
       PAGE LOADED
       ================================================ */
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

})();
