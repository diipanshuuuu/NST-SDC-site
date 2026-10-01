;(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Animations & prefers-reduced-motion with GSAP
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || typeof gsap === 'undefined') {
      document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('visible'));
    } else {
      gsap.registerPlugin(ScrollTrigger);
      
      // Prevent FOUC by making all animate elements visible (GSAP will handle the alpha from 0)
      gsap.set('[data-animate]', { visibility: 'visible' });

      // Animate hero items immediately
      const heroItems = document.querySelectorAll('.hero-section [data-animate], .hero-title, .hero-subtitle, .hero-actions, .stat-item');
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1
      });

      // Animate other sections on scroll
      const sectionsToAnimate = document.querySelectorAll('section:not(.hero-section), .footer');
      sectionsToAnimate.forEach(sec => {
        const children = sec.querySelectorAll('.section-header > *, .bento-card, .initiative-card, .project-card, .community-card, .footer-col');
        if (children.length) {
          gsap.from(children, {
            autoAlpha: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%'
            }
          });
        }
      });
    }

    // 2. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
          navbar.classList.add('navbar--scrolled');
        } else {
          navbar.classList.remove('navbar--scrolled');
        }
      }, { passive: true });
    }

    // 3. Mobile Menu
    const hamburger = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-links--open');
        hamburger.classList.toggle('menu-toggle--active');
        hamburger.setAttribute('aria-expanded', isOpen);
      });

      // Close menu on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('nav-links--open');
          hamburger.classList.remove('menu-toggle--active');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // 5. Active Section Highlight
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    // 6. Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('nst_theme', newTheme);
      });
    }

  });
})();
