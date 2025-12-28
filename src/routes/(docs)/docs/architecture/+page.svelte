<svelte:head>
  <title>Architecture & Stack · Fabalos Automation</title>
  <meta name="description" content="Technical architecture and technology stack behind Fabalos Automation systems." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <h1 class="text-4xl font-bold text-white tracking-tight">
      Architecture & Stack
    </h1>
    <p class="text-lg text-slate-300 leading-relaxed">
      Fabalos Automation systems are built around a <strong class="text-white font-medium">serverless-first</strong> architecture that minimizes infrastructure overhead while keeping deployment, debugging, and ownership clear across environments.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Frontend</h2>
      <span class="text-xs font-mono text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 rounded">Client Layer</span>
    </div>

    <p class="text-slate-400">
      The frontend layer is optimized for fast loads, predictable behavior, and low operational cost.
    </p>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-400">
      <li>
        <strong class="text-slate-200">SvelteKit & TypeScript</strong> enable strongly typed, component-based interfaces that compile down to highly efficient JavaScript.
      </li>
      <li>
        <strong class="text-slate-200">TailwindCSS & Static-first rendering</strong> keep UI logic simple while allowing pages to be pre-rendered and cached at the edge for speed and reliability.
      </li>
    </ul>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">SvelteKit</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">TypeScript</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">TailwindCSS</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Zod (Validation)</div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Backend & Auth</h2>
      <span class="text-xs font-mono text-blue-400 border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 rounded">Data Layer</span>
    </div>

    <p class="text-slate-400">
      The backend favors managed, database-first services that reduce custom backend code while preserving control over data and security.
    </p>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-400">
      <li>
        <strong class="text-slate-200">Supabase</strong> provides PostgreSQL storage, authentication, and policies as a single managed backend, kept isolated per environment via separate projects and credentials.
      </li>
      <li>
        <strong class="text-slate-200">Row Level Security (RLS)</strong> and environment-scoped secrets ensure that access patterns are explicit, auditable, and consistent from development through production.
      </li>
    </ul>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Supabase Auth</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">PostgreSQL</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">RLS Policies</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Edge Functions</div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Automation</h2>
      <span class="text-xs font-mono text-orange-400 border border-orange-400/20 bg-orange-400/10 px-2 py-0.5 rounded">Logic Layer</span>
    </div>

    <p class="text-slate-400">
      Automation is treated as a first-class system layer rather than an afterthought glued on top of apps.
    </p>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-400">
      <li>
        <strong class="text-slate-200">n8n</strong> runs event-driven workflows that connect APIs, webhooks, and data stores, acting as the orchestration engine for business logic that spans multiple tools.
      </li>
      <li>
        <strong class="text-slate-200">Python</strong> and similar runtimes are used for heavy or specialized processing, such as data enrichment, batch operations, or ML-style tasks that sit behind well-defined automation entry points.
      </li>
    </ul>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">n8n (Self-Hosted)</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Python Scripts</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Webhooks</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Docker</div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Infrastructure & Delivery</h2>
      <span class="text-xs font-mono text-purple-400 border border-purple-400/20 bg-purple-400/10 px-2 py-0.5 rounded">Ops Layer</span>
    </div>

    <p class="text-slate-400">
      Infrastructure choices favor managed services and configuration-as-code to keep deployments deterministic and reversible.
    </p>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-400">
      <li>
        <strong class="text-slate-200">Cloudflare</strong> handles DNS, edge hosting, and asset storage, allowing static assets and frontends to be served globally with minimal configuration.
      </li>
      <li>
        <strong class="text-slate-200">GitHub</strong> acts as the single source of truth for code and configuration, with environment-based settings and CI flows that map clearly to dev, staging, and production deployments.
      </li>
    </ul>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Cloudflare Pages</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Cloudflare R2</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">GitHub Actions</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Google Workspace</div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Observability & Operations</h2>
      <span class="text-xs font-mono text-red-400 border border-red-400/20 bg-red-400/10 px-2 py-0.5 rounded">Health Layer</span>
    </div>

    <p class="text-slate-400">
      Operational tooling is designed so issues surface early and are easy to trace back to a specific workflow, deployment, or data change.
    </p>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-400">
      <li>
        <strong class="text-slate-200">Centralized logging</strong> across frontend, backend, and automation layers makes it possible to follow a request or event through the stack end-to-end.
      </li>
      <li>
        <strong class="text-slate-200">Health checks & Dashboards</strong> prioritize signal over noise, emphasizing actionable metrics tied to real business workflows rather than raw infrastructure counters.
      </li>
    </ul>

     <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Notion (Docs)</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Workflow History</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Server Logs</div>
      <div class="bg-slate-800/50 border border-slate-700/50 px-3 py-2 rounded text-sm text-slate-300">Uptime Checks</div>
    </div>
  </div>

</section>