;(function () {
  'use strict'

  // Scroll animations with GSAP
  gsap.registerPlugin(ScrollTrigger)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReducedMotion) {
    // Animate hero items immediately
    const heroItems = document.querySelectorAll('.hero__content [data-animate], .hero__content > *')
    gsap.set(heroItems, { visibility: 'visible' })
    gsap.from(heroItems, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2
    })

    // Animate sections on scroll
    const sections = document.querySelectorAll('.section')
    sections.forEach(sec => {
      const children = sec.querySelectorAll('[data-animate]')
      if(children.length) {
        gsap.set(children, { visibility: 'visible' })
        gsap.from(children, {
          autoAlpha: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
          }
        })
      }
    })
  } else {
    // Fallback for reduced motion
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = 1
      el.style.transform = 'none'
    })
  }

  // Floating continuous animations for background orbs (if motion is allowed)
  if (!prefersReducedMotion && window.gsap) {
    gsap.to('.hero__orb--1', {
      y: -30, x: 20, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'
    })
    gsap.to('.hero__orb--2', {
      y: 40, x: -30, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1
    })
    gsap.to('.hero__orb--3', {
      y: -50, x: 40, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2
    })
    
    // Parallax on mousemove for orbs
    document.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50
      const y = (window.innerHeight / 2 - e.clientY) / 50
      
      gsap.to('.hero__orb', {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    })
  }

  // Card mouse spotlight
  const spotlightCards = document.querySelectorAll('[data-spotlight]')
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x')
      card.style.removeProperty('--mouse-y')
    })
  })

  // Sticky navbar
  const navbar = document.getElementById('navbar')
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled')
    } else {
      navbar.classList.remove('navbar--scrolled')
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true })
  handleNavScroll()

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger')
  const navLinks = document.getElementById('navLinks')

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('navbar__links--open')
    hamburger.classList.toggle('navbar__hamburger--active', isOpen)
    hamburger.setAttribute('aria-expanded', String(isOpen))
  })

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('navbar__links--open')
      hamburger.classList.remove('navbar__hamburger--active')
      hamburger.setAttribute('aria-expanded', 'false')
    })
  })

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href')
      if (targetId === '#') return
      const target = document.querySelector(targetId)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  // Active section nav highlight
  const sections = document.querySelectorAll('section[id]')
  const navAnchors = document.querySelectorAll('.navbar__links a')

  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          navAnchors.forEach((a) => {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === `#${id}`
            )
          })
        }
      })
    },
    { threshold: 0.3 }
  )
  sections.forEach((sec) => activeLinkObserver.observe(sec))

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle')

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    if (themeToggle) {
      themeToggle.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false')
    }
    try {
      localStorage.setItem('nst_theme', theme)
    } catch (e) {}
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
  if (themeToggle) {
    themeToggle.setAttribute('aria-checked', currentTheme === 'light' ? 'true' : 'false')
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark'
      const nextTheme = active === 'light' ? 'dark' : 'light'
      applyTheme(nextTheme)
    })
  }
})()
