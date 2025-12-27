# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.1.0] - 2025-12-26 (The Vault Beta)

**Status:** ✅ Live & Secure
**Description:** Initial release of the **Fabalos Client Portal**. A secure, auth-gated dashboard for project tracking and asset delivery.

### ✅ Features
- 🔐 **Auth System:** Supabase SSR integration with Magic Link/Email login.
- 🛡️ **Admin Shield:** Server-side protection in `hooks.server.ts` restricting `/dashboard` to admin email.
- 📂 **The Vault:** Cloudflare R2 integration for secure asset downloads and file listing.
- 📊 **Project Timeline:** Real-time status indicators (Healthy/Critical) and database versioning.
- 🎨 **UI Architecture:** Tailwind CSS v4.1 with Slate/Dark mode design system.
- ⚡ **Performance:** SvelteKit logic for data streaming and state management.

### 🧰 Technical Fixes
- Implemented `redirect` logic for unauthenticated sessions.
- configured `svelte-adapter-cloudflare` for edge deployment.
- Established global typography and utility classes for the dashboard.

### 🚧 Known Work-in-Progress
- [ ] Refine RLS (Row Level Security) policies for multi-tenant isolation.
- [ ] Build 404/Unauthorized redirect pages.
- [ ] Add SEO/Favicon metadata.
- [ ] **Next Target:** `v0.1.1` (Client specific module integration).

---

## [0.0.1] - 2025-06-18

### Added
- Initial repository scaffolding (SvelteKit + TypeScript).
- Tailwind v4 configuration.
- Basic Supabase client initialization.

---

## 📌 Release Workflow

To tag and push a new version:

```bash
# Tag the version
git tag -a v1.0.0 -m "🔐 Fabalos Client Portal v1.0.0 - Beta"

# Push to origin
git push origin v1.0.0