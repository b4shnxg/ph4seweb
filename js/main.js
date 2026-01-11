/* ================================================
   PH4SE - JAVASCRIPT
   ================================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initHeader();
        initMobileNav();
        initScrollAnimations();
        initActiveNav();
        initStatusTime();
        initCounters();
    });

    function initHeader() {
        var header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var nav = document.querySelector('.nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    function initScrollAnimations() {
        var elements = document.querySelectorAll('.fade-in');
        if (!elements.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        elements.forEach(function(el) { observer.observe(el); });
    }

    function initActiveNav() {
        var path = window.location.pathname;
        var page = path.split('/').pop() || 'index.html';

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    function initStatusTime() {
        var timeEl = document.querySelector('.status-card-time');
        if (!timeEl) return;

        function update() {
            var now = new Date();
            var time = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            timeEl.textContent = 'Updated: ' + time + ' UTC';
        }

        update();
        setInterval(update, 1000);
    }

    function initCounters() {
        var stats = document.querySelectorAll('.stat-num');
        if (!stats.length) return;

        var animated = false;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(function(stat) { observer.observe(stat); });

        function animateCounters() {
            stats.forEach(function(stat) {
                var text = stat.textContent;
                var match = text.match(/^([\d.]+)(.*)$/);
                if (!match) return;

                var target = parseFloat(match[1]);
                var suffix = match[2];
                var isDecimal = text.indexOf('.') !== -1;
                var current = 0;
                var steps = 50;
                var increment = target / steps;
                var stepTime = 30;

                stat.textContent = '0' + suffix;

                var timer = setInterval(function() {
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

})();
