;(function () {
  'use strict'

  /* 1. Scroll Reveal Observer */
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
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  )
  animatedEls.forEach((el) => scrollObserver.observe(el))

  /* 2. Radial Cursor Spotlight on Cards */
  const spotlightCards = document.querySelectorAll('[data-spotlight]')
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    })
  })

  /* 3. Mobile Navigation Drawer */
  const hamburger = document.getElementById('hamburger')
  const navLinks = document.getElementById('navLinks')

  if (hamburger && navLinks) {
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
  }

  /* 4. Interactive Hero Terminal Tabs & CLI */
  const termTabs = document.querySelectorAll('.terminal__tab')
  const termBodies = document.querySelectorAll('.terminal__body')

  termTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab')
      termTabs.forEach((t) => {
        t.classList.toggle('active', t === tab)
        t.setAttribute('aria-selected', String(t === tab))
      })
      termBodies.forEach((body) => {
        body.classList.toggle('active', body.id === `tab-${target}`)
      })
    })
  })

  const terminalForm = document.getElementById('terminalForm')
  const terminalInput = document.getElementById('terminalInput')
  const terminalOutput = document.getElementById('terminalOutput')

  const cliCommands = {
    help: () =>
      'Available commands: <span class="cmd-inline">repos</span>, <span class="cmd-inline">stack</span>, <span class="cmd-inline">join</span>, <span class="cmd-inline">theme</span>, <span class="cmd-inline">clear</span>',
    repos: () =>
      '→ Open-Source-Tracker-NST (K8s)<br/>→ Campus-Buddy (OAuth)<br/>→ StackMate (VS Code)<br/>→ Screentime-recoder (AI/ML)<br/>→ Personalized-Academic-Tracker (PWA)',
    stack: () =>
      'Frontend: React, Vue.js, HTML/CSS, JS | Backend: Node.js, Django, Flask | Infra: Git, Docker, K8s',
    join: () => {
      setTimeout(() => {
        window.location.href = 'join.html'
      }, 400)
      return 'Opening registration page (join.html)...'
    },
    theme: () => {
      toggleColorTheme()
      return `Switched theme to ${document.documentElement.getAttribute('data-theme')}.`
    },
  }

  if (terminalForm && terminalInput && terminalOutput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const raw = terminalInput.value.trim()
      const cmd = raw.toLowerCase()
      terminalInput.value = ''
      if (!raw) return

      if (cmd === 'clear') {
        terminalOutput.innerHTML = ''
        return
      }

      const cmdEcho = document.createElement('div')
      cmdEcho.className = 'cmd-line'
      cmdEcho.innerHTML = `<span class="prompt">nst-sdc@pune:~$</span> <span class="cmd"></span>`
      cmdEcho.querySelector('.cmd').textContent = raw
      terminalOutput.appendChild(cmdEcho)

      const resLine = document.createElement('div')
      resLine.className = 'cmd-res'
      if (cliCommands[cmd]) {
        resLine.innerHTML = cliCommands[cmd]()
      } else {
        resLine.classList.add('muted')
        resLine.textContent = `zsh: command not found: ${raw}. Type 'help' for available commands.`
      }
      terminalOutput.appendChild(resLine)

      const parentBody = document.getElementById('tab-cli')
      if (parentBody) parentBody.scrollTop = parentBody.scrollHeight
    })
  }

  /* 5. Repository Category Filter */
  const filterBtns = document.querySelectorAll('.filter-btn')
  const repoCards = document.querySelectorAll('.repo-card')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter')
      filterBtns.forEach((b) => b.classList.toggle('active', b === btn))

      repoCards.forEach((card) => {
        const category = card.getAttribute('data-category')
        const match = filter === 'all' || category === filter
        card.classList.toggle('hidden', !match)
        if (filter !== 'all') {
          card.classList.remove('repo-card--span')
        } else if (card === repoCards[repoCards.length - 1]) {
          card.classList.add('repo-card--span')
        }
      })
    })
  })

  /* 6. Join Page Interactive Pill Groups & Form Validation */
  const pillGroups = document.querySelectorAll('.pill-group')
  pillGroups.forEach((group) => {
    const targetId = group.getAttribute('data-target')
    const hiddenInput = document.getElementById(targetId)
    const pills = group.querySelectorAll('.choice-pill')

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('selected'))
        pill.classList.add('selected')
        if (hiddenInput) {
          hiddenInput.value = pill.getAttribute('data-value') || ''
          hiddenInput.closest('.form-group')?.classList.remove('has-error')
        }
      })
    })
  })

  const joinForm = document.getElementById('joinForm')
  const formWrapper = document.getElementById('formWrapper')
  const formSuccess = document.getElementById('formSuccess')
  const submitBtn = document.getElementById('submitBtn')

  if (joinForm) {
    joinForm.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        input.closest('.form-group')?.classList.remove('has-error')
      })
    })

    joinForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let valid = true

      const firstName = document.getElementById('firstName')
      const lastName = document.getElementById('lastName')
      const email = document.getElementById('email')
      const year = document.getElementById('year')
      const domain = document.getElementById('domain')

      ;[firstName, lastName, year, domain].forEach((field) => {
        if (field && !field.value.trim()) {
          field.closest('.form-group')?.classList.add('has-error')
          valid = false
        }
      })

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.closest('.form-group')?.classList.add('has-error')
        valid = false
      }

      if (!valid) return

      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.innerHTML = '<span>Submitting Application...</span>'
      }

      setTimeout(() => {
        if (formWrapper) formWrapper.style.display = 'none'
        if (formSuccess) formSuccess.classList.add('active')
      }, 800)
    })
  }

  /* 7. Theme Toggle */
  const themeToggle = document.getElementById('themeToggle')

  function toggleColorTheme() {
    const active = document.documentElement.getAttribute('data-theme') || 'dark'
    const nextTheme = active === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', nextTheme)
    try {
      localStorage.setItem('nst_theme', nextTheme)
    } catch (err) {}
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleColorTheme)
  }

  /* 8. Command Palette (⌘K / Ctrl+K) */
  const cmdModal = document.getElementById('cmdModal')
  const cmdTrigger = document.getElementById('cmdTrigger')
  const cmdBackdrop = document.getElementById('cmdBackdrop')
  const cmdInput = document.getElementById('cmdInput')
  const cmdItems = document.querySelectorAll('.cmd-item')
  const cmdThemeToggle = document.getElementById('cmdThemeToggle')

  function openCmdModal() {
    if (!cmdModal) return
    cmdModal.classList.add('open')
    cmdModal.setAttribute('aria-hidden', 'false')
    if (cmdInput) {
      cmdInput.value = ''
      filterCmdItems('')
      setTimeout(() => cmdInput.focus(), 50)
    }
  }

  function closeCmdModal() {
    if (!cmdModal) return
    cmdModal.classList.remove('open')
    cmdModal.setAttribute('aria-hidden', 'true')
  }

  function filterCmdItems(query) {
    const q = query.toLowerCase().trim()
    cmdItems.forEach((item) => {
      const text = (item.textContent + ' ' + (item.getAttribute('data-keywords') || '')).toLowerCase()
      item.style.display = text.includes(q) ? 'flex' : 'none'
    })
  }

  if (cmdTrigger) cmdTrigger.addEventListener('click', openCmdModal)
  if (cmdBackdrop) cmdBackdrop.addEventListener('click', closeCmdModal)

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => filterCmdItems(e.target.value))
  }

  if (cmdThemeToggle) {
    cmdThemeToggle.addEventListener('click', () => {
      toggleColorTheme()
      closeCmdModal()
    })
  }

  cmdItems.forEach((item) => {
    if (item.tagName === 'A') {
      item.addEventListener('click', closeCmdModal)
    }
  })

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      if (cmdModal && cmdModal.classList.contains('open')) {
        closeCmdModal()
      } else {
        openCmdModal()
      }
    } else if (e.key === 'Escape' && cmdModal && cmdModal.classList.contains('open')) {
      closeCmdModal()
    }
  })
})()