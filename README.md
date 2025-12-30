<p align="center">
  <img src="https://img.shields.io/badge/app-client.fabalos.com-blue" alt="App URL">
  <img src="https://img.shields.io/badge/status-live-success" alt="Status">
  <img src="https://img.shields.io/badge/auth-Supabase-green" alt="Auth">
  <img src="https://img.shields.io/badge/built_with-SvelteKit-orange" alt="Framework">
  <img src="https://img.shields.io/badge/access-restricted-red" alt="Access">
</p>

---

v2.0.0

---

# 🚀 Fabalos OS: Client Portal & Admin Cockpit

**Fabalos OS** is a high-performance, multi-tenant client portal designed for automation agencies. It features a futuristic "Mission Control" UI, secure asset management, and digital contract execution, bridging the gap between System Architects and Clients.

![Status](https://img.shields.io/badge/System-Operational-emerald?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-SvelteKit_Supabase_Tailwind-blue?style=flat-square)

## ⚡ Tech Stack

* **Framework:** SvelteKit (Node.js/SSR)
* **Language:** TypeScript
* **Styling:** TailwindCSS (Custom "Starfield" Dark Mode)
* **Backend & Auth:** Supabase (PostgreSQL)
* **Storage:** Supabase Storage (S3 Compatible)
* **State Management:** Svelte Stores & Server Loaders

---

## 🛠 System Modules

### 1. 🛑 Admin Cockpit (`/cockpit`)
The command center for the agency owner.
* **Node Management:** Create, Edit, and Decommission Project Nodes.
* **Module Orchestration:** Toggle features (Analytics, CRM, CMS) per client dynamically.
* **Contract Dispatcher:** Draft custom proposals and scope of work directly to specific clients.
* **System Health:** Visual indicators for storage status and client uplinks.

### 2. 🌍 Client Portal (`/portal/[tenant_slug]`)
A secure, branded environment for clients.
* **Dashboard:** Real-time progress bars, active modules count, and timeline visualization.
* **Secure Vault:** encrypted file exchange for deliverables and assets.
    * *Security:* Whitelisted file types (PDF, DOCX, ZIP) & 50MB Max Payload.
* **Approvals Ledger:** Digital signature system for proposals and agreements.
    * *Features:* Optimistic UI updates, timestamped audit trails.

---

## 🚀 Local Deployment

### Prerequisites
* Node.js (v18+)
* Supabase Project

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/fabalos-client.git](https://github.com/your-username/fabalos-client.git)
    cd fabalos-client
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    PUBLIC_SUPABASE_URL=your_supabase_project_url
    PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Ignition**
    ```bash
    npm run dev
    ```

---

## 🗄️ Database Schema (Supabase)

Ensure your Supabase project has the following tables initialized:

### Core Tables
* `projects`: Stores tenant slugs, names, and active module configurations.
* `authorized_clients`: Links Supabase Auth Users to Projects.
* `project_modules`: Dictionary of available system features.

### Feature Tables
* **`project_vault`**
    * Tracks file metadata (`file_name`, `file_size`, `path`).
    * Linked to Supabase Storage Bucket `vault`.
* **`project_approvals`**
    * Stores contracts/proposals.
    * Columns: `status` ('pending'/'approved'), `approved_at`, `approved_by`.

---

## 🔐 Security Protocols

* **Row Level Security (RLS):** All database queries are scoped to the authenticated user's ID. Clients cannot query data outside their assigned Project Node.
* **Storage Policies:** Only authenticated users linked to a project can upload/download files from that specific folder.
* **Input Validation:** Vault uploads are strictly validated for MIME types and file size on the client side before transmission.

---

## 🗺️ Roadmap & Active Development

* [x] **Core:** Auth & Multi-tenancy
* [x] **Vault:** Secure File Storage
* [x] **Contracts:** Digital Signatures
* [ ] **Dynamic Sidebar:** Hide disabled modules in Client View
* [ ] **Analytics:** Integration with Plausible/Google Analytics
* [ ] **Notifications:** Email triggers on Contract Sign/File Upload

---

**System Architect:** Fabalos Automation
*Operational since 2025*