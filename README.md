# NST SDC — Custom Website Redesign

> **Disclaimer:** This is **not** the official NST Student Developer Club website. This repository is an independent, custom-built version created by me to reimagine the club's website with a cleaner, developer-focused UI/UX. All club information, initiatives, and featured projects are based on public data from [github.com/nst-sdc](https://github.com/nst-sdc).

---

## About This Version

I built this custom version of the **NST Student Developer Club (NST SDC)** site from scratch using vanilla HTML, CSS, and JavaScript—without external UI libraries or heavy frameworks—to replace generic templates with a fast, architectural developer interface.

### What I Built & Improved
- **Interactive Hero Terminal (`zsh — nst-sdc`)**: A working in-browser CLI that supports commands (`help`, `repos`, `stack`, `join`, `theme`, `clear`), alongside tabs for `git log` commit history and `stack.json`.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-driven navigation modal for jumping directly to sections, repositories, or toggling the theme.
- **Filterable Repository Showcase**: Displays real student-built repositories from `@nst-sdc` with instant category filtering (*All*, *Platform & Cloud*, *DevTools & AI*, *Campus Apps*).
- **Redesigned Registration Page (`join.html`)**: Clean split-screen onboarding layout with interactive pill selectors for academic year and preferred domain, plus client-side form validation.
- **Dark & Light Theme Engine**: Persistent theme switcher (`localStorage`) with high-contrast dark and light palettes.
- **Mobile-Hardened Responsive Design**: Optimized down to `360px` screens with iOS Safari auto-zoom prevention, touch-friendly targets, and overflow-safe CSS grids.

---

## Project Structure

```text
├── index.html   # Main landing page, interactive terminal, and repository showcase
├── join.html    # Member registration and onboarding page
├── style.css    # Complete stylesheet (dark/light themes, Swiss grid, mobile rules)
├── script.js    # Terminal CLI, ⌘K command palette, repo filter, and form logic
├── logo.png     # NST SDC logo and favicon
└── README.md    # Project documentation
```

---

## Run Locally

No build step or dependencies are needed. Clone the repository and open `index.html` directly in your browser, or run a local server:

```bash
git clone https://github.com/diipanshuuuu/NST-SDC-site
cd NST-SDC-site

# Start a local server with Python
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

---

## NST Student Developer Club (Club Overview)

The **NST Student Developer Club** is a student-run developer community at [Newton School of Technology (NST)](https://www.newtonschool.co/newton-school-of-technology-nst/home) focused on learning, building, and sharing real-world software.

> *"The best way to learn is by doing, and the best way to grow is by sharing."*

### Mission
To foster a culture of **collaboration, innovation, and open-source contributions** among students, preparing them to excel in real-world engineering challenges and make an impact in the tech industry.

### Core Activities
- **Open-Source Projects**: Build, document, and contribute to impactful public repositories.
- **Workshops & Webinars**: Hands-on technical sessions led by peers and mentors.
- **Competitions & Hackathons**: Internal coding sprints and external hackathon teams.
- **Mentorship Programs**: 1-on-1 guidance from experienced student developers.
- **Knowledge Sharing**: Technical blogs, code reviews, and community tech talks.

### Key Initiatives
- **Hacktoberfest**: Annual open-source contribution drive with beginner workshops and first-PR guidance.
- **Google Summer of Code (GSoC) Preparation**: Mentorship focused on open-source contributions and proposal writing.
- **Student Projects & Coding Competitions**: Showcasing member-built projects and hosting problem-solving challenges.

### Featured Student Repositories
- **[Open-Source-Tracker-NST](https://github.com/nst-sdc/Open-Source-Tracker-NST)** — Live leaderboard tracking students' open-source PRs and issues across GitHub with automatic spam filtering and Kubernetes-scheduled rankings (`Next.js`, `Kubernetes`, `Redis`, `GitHub API`).
- **[Campus-Buddy](https://github.com/nst-sdc/Campus-Buddy)** — Centralized campus event discovery platform featuring one-click RSVP, Google Calendar sync, and volunteer management (`Full-Stack`, `Google OAuth`, `Calendar Sync`).
- **[StackMate](https://github.com/nst-sdc/StackMate)** — Multi-purpose VS Code extension embedding a React webview for quick notes, JSON validation, Stack Overflow shortcuts, and ESLint checks (`VS Code API`, `React`, `TypeScript`, `Webpack`).
- **[Screentime-recoder](https://github.com/nst-sdc/Screentime-recoder)** — Privacy-focused study tracking browser extension using AI to assess focus, compute consistency scores, and render activity heatmaps (`AI/ML`, `Browser Extension`, `Data Viz`).
- **[Personalized-Academic-Tracker](https://github.com/nst-sdc/Personalized-Academic-Tracker)** — Mobile-first progressive web app helping university students track grades, attendance minimums, and assignments (`React`, `PWA`, `Node.js`, `MongoDB`).

### Tech Stack
- **Frontend**: HTML, CSS, JavaScript, React, Vue.js, Next.js, TypeScript
- **Backend**: Node.js, Django, Flask
- **Database**: MySQL, MongoDB, Firebase, Redis
- **DevOps & Languages**: Git, Docker, Kubernetes, Python, C++, Java, AI/ML tools

---

## Official NST SDC Links
- **GitHub**: [github.com/nst-sdc](https://github.com/nst-sdc)
- **Official Website**: [nst-sdc-site-ten.vercel.app](https://nst-sdc-site-ten.vercel.app/)
- **LinkedIn**: [NST Student Developer Club](https://www.linkedin.com/company/nst-sdc/)
- **X (Twitter)**: [@NSTSDC_](https://x.com/NSTSDC_)
- **Instagram**: [@devclub.nst](https://www.instagram.com/devclub.nst/)
- **Email**: [support@nstsdc.org](mailto:support@nstsdc.org)
