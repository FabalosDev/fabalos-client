<svelte:head>
  <title>Knowledge Assets · Fabalos Automation</title>
  <meta name="description" content="Registry of repositories, credentials, runbooks, and recovery assets for Fabalos Automation systems." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
        <svg class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tight">
        Knowledge Assets
      </h1>
    </div>

    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500/50 pl-6">
      This section documents all <strong class="text-white">internal system assets, credentials, handover materials, and recovery procedures</strong> required for operational continuity, ownership transfer, and disaster recovery across Fabalos environments.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      <h2 class="text-2xl font-semibold text-white">Repositories & Source Code</h2>
    </div>
    <p class="text-slate-400">Single source of truth for all code, configurations, and workflows.</p>

    <div class="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden">
      <div class="grid divide-y divide-slate-800">
        <div class="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
          <div>
            <span class="text-emerald-400 font-mono text-xs">PRODUCTION</span>
            <div class="text-white font-bold">fabalos.com</div>
          </div>
          <span class="text-slate-500 text-xs">GitHub Main</span>
        </div>
        <div class="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
          <div>
            <span class="text-blue-400 font-mono text-xs">STAGING</span>
            <div class="text-white font-bold">staging.fabalos.com</div>
          </div>
          <span class="text-slate-500 text-xs">GitHub Staging</span>
        </div>
        <div class="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
          <div>
            <span class="text-amber-400 font-mono text-xs">INTERNAL</span>
            <div class="text-white font-bold">DevLab</div>
          </div>
          <span class="text-slate-500 text-xs">GitHub Dev</span>
        </div>
      </div>
      <div class="bg-slate-950 p-3 text-xs text-slate-400 border-t border-slate-800">
        Contains: SvelteKit frontend, n8n workflow JSON, Supabase schemas/migrations, deployment scripts.
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
      <h2 class="text-2xl font-semibold text-white">Credentials Management</h2>
    </div>
    <p class="text-slate-400">Environment-isolated access credentials with rotation and audit trails.</p>

    <div class="grid md:grid-cols-3 gap-4">
      <div class="bg-slate-900/40 border border-slate-800 p-4 rounded">
        <h3 class="text-white font-bold text-sm mb-2">Supabase</h3>
        <p class="text-xs text-slate-400 leading-relaxed">Project URLs, API keys, service roles per environment (portal access required).</p>
      </div>
      <div class="bg-slate-900/40 border border-slate-800 p-4 rounded">
        <h3 class="text-white font-bold text-sm mb-2">n8n</h3>
        <p class="text-xs text-slate-400 leading-relaxed">Instance endpoints, webhook secrets, encryption keys.</p>
      </div>
      <div class="bg-slate-900/40 border border-slate-800 p-4 rounded">
        <h3 class="text-white font-bold text-sm mb-2">Cloudflare/GitHub</h3>
        <p class="text-xs text-slate-400 leading-relaxed">Scoped tokens with minimum permissions and 90-day rotation policy.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      <h2 class="text-2xl font-semibold text-white">Deployment Runbooks</h2>
    </div>

    <ul class="space-y-3">
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-blue-500 font-bold">›</span>
        <span><strong>GitHub Actions CI/CD pipelines</strong> with environment variables and one-click rollback commands.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-blue-500 font-bold">›</span>
        <span>Health check endpoints, smoke test suites, and post-deployment verification checklists.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-blue-500 font-bold">›</span>
        <span>Environment promotion: <code class="bg-slate-800 px-1 py-0.5 rounded text-xs text-slate-300">dev</code> → <code class="bg-slate-800 px-1 py-0.5 rounded text-xs text-slate-300">staging</code> → <code class="bg-slate-800 px-1 py-0.5 rounded text-xs text-slate-300">prod</code> requires dual approval.</span>
      </li>
    </ul>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      <h2 class="text-2xl font-semibold text-white">Backup & Recovery</h2>
    </div>

    <div class="bg-slate-900/40 border border-slate-800 p-4 rounded-lg space-y-3">
      <div class="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
        <span class="text-slate-300">Supabase PITR + R2 Backups</span>
        <span class="text-emerald-400 font-mono text-xs">7/30/90-Day Retention</span>
      </div>
      <div class="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
        <span class="text-slate-300">n8n Workflows</span>
        <span class="text-emerald-400 font-mono text-xs">Weekly Git Export</span>
      </div>
      <div class="flex justify-between items-center text-sm">
        <span class="text-slate-300">Static Assets (Frontend)</span>
        <span class="text-emerald-400 font-mono text-xs">Cloudflare Pages + CDN Fallback</span>
      </div>
    </div>
  </div>

<div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      <h2 class="text-2xl font-semibold text-white">Monitoring Dashboards</h2>
    </div>
    <ul class="grid md:grid-cols-2 gap-4">
      <li class="bg-slate-950/50 p-3 rounded border border-slate-800/50">
        <strong class="text-slate-200 block mb-1">Key Metrics</strong>
        <span class="text-xs text-slate-400">Workflow execution rates, error rates, queue depths, API latencies.</span>
      </li>
      <li class="bg-slate-950/50 p-3 rounded border border-slate-800/50">
        <strong class="text-slate-200 block mb-1">Log Aggregation</strong>
        <span class="text-xs text-slate-400">n8n executions → Supabase; frontend errors → Cloudflare.</span>
      </li>
      <li class="bg-slate-950/50 p-3 rounded border border-slate-800/50 md:col-span-2">
        <strong class="text-red-400 block mb-1">Alert Escalation</strong>
        <span class="text-xs text-slate-400">
          Email Alerts → <strong class="text-red-400/80">Ticketing System</strong> (Incident Creation) with defined response SLAs.
        </span>
      </li>
    </ul>
  </div>

</section>