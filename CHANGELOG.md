# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [v2.0.0] - 2025-12-31

### ✨ Added

- **Secure Vault Module (`/portal/[slug]/vault`)**

    - Implemented server-side data fetching for `project_vault`.

    - Added file upload logic connecting Supabase Storage to Database.

    - **Security:** Added strict file type whitelisting (PDF, DOCX, IMG, ZIP) and 50MB size limit.

    - **UI:** Drag-and-drop zone and download handling.

- **Contracts & Approvals System (`/portal/[slug]/contracts`)**

    - Created `project_approvals` database table.

    - **Client Side:** "Clickwrap" agreement interface with digital signature timestamps.

    - **Admin Side:** "Dispatcher" modal to create custom scopes/proposals per project.

    - **Optimistic UI:** Instant "Signed" status update without waiting for page reload.

- **Admin Dispatcher (`/cockpit/project/[id]`)**

    - Dedicated project management view for Admins.

    - Modal-based form to draft and deploy new contracts.

    - "View Portal" deep-link button to preview the client's perspective.


### 🐛 Fixed

- **Frontend Crash (`.split` error):** Added server-side filtering in `+page.server.ts` to strip "ghost files" (records with `null` filenames) before they reach the UI.

- **Admin Routing Error (500):** Renamed folder structure from `project\{id}` to `project\[id]` to fix SvelteKit dynamic routing.

- **Syntax Error:** Fixed invalid export statement (`export let data../$types.js`) in Admin Project page.

- **Cockpit Layout:** Fixed duplicated columns in the Admin Table; centered the "Actions" column and fixed alignment for the "Manage Contracts" button.

- **Reference Error:** Added missing `storageStatus` destructuring in Admin Dispatcher script to prevent page crashes.


### ♻️ Changed

- **Navigation:** Integrated "Manage Contracts" direct links into the main Cockpit grid.

- **UI/UX:** Standardized "Mission Control" aesthetic across Vault and Contract pages (Starfield background, monospace fonts, emerald/slate color palette).

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