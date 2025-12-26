<p align="center">
  <img src="https://img.shields.io/badge/app-client.fabalos.com-blue" alt="App URL">
  <img src="https://img.shields.io/badge/status-live-success" alt="Status">
  <img src="https://img.shields.io/badge/auth-Supabase-green" alt="Auth">
  <img src="https://img.shields.io/badge/built_with-SvelteKit-orange" alt="Framework">
  <img src="https://img.shields.io/badge/access-restricted-red" alt="Access">
</p>

# Fabalos Client Portal (The Vault)

**The secure, auth-gated dashboard for Fabalos Automation clients.**

This repository contains the application layer for `client.fabalos.com`. It serves as the central hub for project tracking, asset delivery, and communication. Unlike the public portfolio, this is a functional web application powered by Supabase.

---

## 🔐 System Overview

- **Role:** Client Interaction & Deliverable Management.
- **Access:** Invite-only (Supabase Auth).
- **Core Function:** Provides a "Peace of Mind" interface for clients to view project status, approve milestones, and download assets.

---

## 🛠 Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | SvelteKit | Application Logic & UI |
| **Styling** | TailwindCSS v4.1 | Design System |
| **Backend** | Supabase | Auth, Database (Postgres), Realtime |
| **Storage** | Cloudflare R2 | Asset Storage (via API) |
| **Security** | RLS Policies | Row-Level Security for Data Isolation |

---

## 🧱 Key Features

1.  **Secure Authentication:** Magic Link / Email login via Supabase.
2.  **Project Timeline:** Real-time view of automation build phases.
3.  **The Vault:** Secure file transfer for SOPs, scripts, and diagrams.
4.  **Action Items:** Integrated task view for client-side requirements.

---

## ⚡ Development Setup

```bash
# 1. Clone the repository
git clone [repo-url]

# 2. Install dependencies
npm install

# 3. Setup Environment Variables (.env)
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...

# 4. Run local server
npm run dev

---

## 🔖 Versioning
v1.0.0 - Initial Beta Release (Auth + Dashboard)

---

## 📄 License
Proprietary. All rights reserved by Fabalos Automation. Unauthorized copying or distribution is strictly prohibited.