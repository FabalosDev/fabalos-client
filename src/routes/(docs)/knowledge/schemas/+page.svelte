<svelte:head>
  <title>Schemas & Diagrams · Fabalos Automation</title>
  <meta name="description" content="Visual documentation of database schemas, webhook flows, and system architecture." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
        <svg class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9.553 4.553A1 1 0 009 3.618C9 3.618 9.553 3 15 3" /></svg>
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tight">
        Schemas & Diagrams
      </h1>
    </div>

    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500/50 pl-6">
      This section provides <strong class="text-white">visual and structural documentation</strong> of database schemas, data flows, and system architecture—delivered as living assets in Git repositories for reference and maintenance.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      <h2 class="text-2xl font-semibold text-white">Database Schemas</h2>
    </div>
    <p class="text-slate-400">Supabase PostgreSQL schemas mapped visually with relationships and RLS policies.</p>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-slate-900/40 border border-slate-800 p-4 rounded hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold text-sm mb-2">ERD Visuals</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Entity Relationship Diagrams showing tables, foreign keys, indexes, and active RLS rules per environment.
        </p>
      </div>
      <div class="bg-slate-900/40 border border-slate-800 p-4 rounded hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold text-sm mb-2">Data Dictionary</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Detailed breakdown of field types, constraints, default values, and the business purpose of each column.
        </p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      <h2 class="text-2xl font-semibold text-white">Webhook Flows</h2>
    </div>
    <p class="text-slate-400">n8n workflow diagrams documenting trigger-to-action paths across systems.</p>

    <ul class="space-y-3">
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-emerald-500 font-bold">›</span>
        <span>Visual workflow canvases exported as SVG/PNG with node labels, credentials, and error handling paths.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-emerald-500 font-bold">›</span>
        <span>Event flow documentation: <code class="text-xs bg-slate-800 px-1 rounded">trigger</code> → <code class="text-xs bg-slate-800 px-1 rounded">transform</code> → <code class="text-xs bg-slate-800 px-1 rounded">destination API</code>.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-emerald-500 font-bold">›</span>
        <span>Critical path analysis highlighting single points of failure and retry policies.</span>
      </li>
    </ul>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
      <h2 class="text-2xl font-semibold text-white">Integration Architecture</h2>
    </div>

    <div class="bg-slate-900/40 border border-slate-800 rounded-lg p-5 space-y-4">
      <div class="flex items-center justify-center gap-4 text-sm font-mono text-slate-400 bg-slate-950/50 p-3 rounded border border-slate-800">
        <span class="text-emerald-400">SvelteKit</span>
        <span class="text-slate-600">→</span>
        <span class="text-emerald-400">Supabase</span>
        <span class="text-slate-600">→</span>
        <span class="text-emerald-400">n8n</span>
        <span class="text-slate-600">→</span>
        <span class="text-slate-300">External APIs</span>
      </div>

      <ul class="space-y-2 text-sm text-slate-400">
        <li class="flex gap-2">
          <span class="text-slate-600">•</span>
          <span>Sequence diagrams for key user journeys (login, workflow execution, recovery).</span>
        </li>
        <li class="flex gap-2">
          <span class="text-slate-600">•</span>
          <span>API contract summaries with endpoints, auth methods, rate limits, and schemas.</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-slate-950/80 border border-slate-800 rounded-lg overflow-hidden">
    <div class="px-4 py-2 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
      <span class="text-xs font-mono text-slate-400">.github/workflows/docs.yml</span>
      <div class="flex gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="flex items-start gap-4">
        <div class="p-2 bg-purple-500/10 rounded border border-purple-500/20">
          <svg class="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
        <div class="space-y-1">
          <h3 class="font-bold text-white text-sm">Mermaid.js Integration</h3>
          <p class="text-xs text-slate-400">Diagrams are stored as code in <code class="text-slate-300">/docs/diagrams</code>.</p>
        </div>
      </div>

      <div class="text-xs text-slate-500 font-mono pl-11 space-y-1">
        <p>1. Update Mermaid source code</p>
        <p>2. CI Pipeline auto-generates SVGs</p>
        <p>3. PR Approval deploys to docs site</p>
      </div>
    </div>
  </div>

</section>