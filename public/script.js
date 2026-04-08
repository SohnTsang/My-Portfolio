/* ========================================
   KAHO TSANG — PORTFOLIO
   ======================================== */

(function () {
    'use strict';

    // ── Header scroll behavior ──
    const header = document.getElementById('header');
    let lastScroll = 0;

    function onScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ── Mobile menu ──
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('open');
            menuBtn.classList.toggle('open', isOpen);
            menuBtn.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }


    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            var headerHeight = parseInt(
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height')
            ) || 72;

            var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });


    // ── Scroll reveal (IntersectionObserver) ──
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }


    // ── Active nav link tracking ──
    var navLinks = document.querySelectorAll('.header-nav-link');
    var sections = [];

    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').replace('#', '');
        var section = document.getElementById(id);
        if (section) sections.push({ id: id, el: section });
    });

    if ('IntersectionObserver' in window && sections.length) {
        var navObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    var link = document.querySelector(
                        '.header-nav-link[href="#' + entry.target.id + '"]'
                    );
                    if (link) {
                        if (entry.isIntersecting) {
                            navLinks.forEach(function (l) { l.classList.remove('active'); });
                            link.classList.add('active');
                        }
                    }
                });
            },
            { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
        );

        sections.forEach(function (s) {
            navObserver.observe(s.el);
        });
    }

})();
