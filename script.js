;(function () {
  'use strict'

  // Scroll animations
  const animatedEls = document.querySelectorAll('[data-animate]')
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          scrollObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  )
  animatedEls.forEach((el) => scrollObserver.observe(el))

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
