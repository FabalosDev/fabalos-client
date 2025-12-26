# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.1.0] - 2025-06-21 (Fabalos Launch)

**Status:** ✅ Stable & Deploy-Ready
**Description:** First public-ready release of the **Fabalos Automation Portfolio**. Modular, styled, and emotionally coded.

### ✅ Features
- 🌐 **Homepage Hero:** Added logo, call-to-actions, and responsive layout.
- 🧠 **About Section:** Added "Fabalos Automation" purpose and philosophy.
- ⚙️ **Case Study:** Implemented card layout (1 active, expandable).
- 📬 **Contact:** Added "Let’s Talk" CTA section with styled buttons.
- 📱 **Navigation:** Responsive hamburger menu + slide-in for mobile.
- 🖌️ **Tailwind CSS v4:** Architecture setup with modular styles (`layout.css`, `theme.css`, `global.css`).
- 🧪 **Utilities:** Established class setup (`bg-primary`, `text-soft`, `btn-primary`, `btn-ghost`).
- 💻 **DevOps:** VS Code + Git integration (profile scripting `fabagreet`, `fabaclean`).

### 🧰 Technical Fixes
- Resolved `border-primary` utility issues.
- Removed recursive import loop in `theme.css`.
- Fixed `chcp` encoding bug in PowerShell profile.
- Enabled UTF-8 emoji rendering in terminal.
- Cleaned and aligned Vite + Tailwind plugins.

### 🚧 Known Work-in-Progress
- [ ] Final polish for **Case Study Detail Pages**.
- [ ] Add **Favicon metadata**.
- [ ] Add **SEO Metadata** in `<svelte:head>`.
- [ ] Build Footer and 404 page.
- [ ] **Next Target:** `v1.2.0` (Second case study integration).

---

## [0.2.0] - 2025-06-18

### Removed
- `tailwind.config.js` (Removed in favor of CSS-first `@theme` directive).

### Changed
- Established Tailwind v4 CSS-first config.
- Completed global styles + layout scaffold.
- Prepared section components: Hero, About, Services.

---

## [0.1.0] - 2025-06-18

### Added
- Initial landing page structure with SvelteKit.
- Global CSS with custom Fabalos palette + fonts.
- README and project description.
- Placeholder for case study route.

---

## 📌 Release Workflow

To tag and push a new version:

```bash
# Tag the version
git tag -a v1.1.0 -m "🎉 Fabalos v1.1.0 - Public Launch"

# Push to origin
git push origin v1.1.0