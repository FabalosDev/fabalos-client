<svelte:head>
  <title>Environments · Fabalos Automation</title>
  <meta name="description" content="Environment isolation strategy: Development, Staging, and Production mapping." />
</svelte:head>

<section class="space-y-12 max-w-4xl">

  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
        <svg class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tight">
        Environments
      </h1>
    </div>

    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500/50 pl-6">
      Fabalos Automation systems deploy across <strong class="text-white">three isolated environments</strong> mapped to distinct domains, enabling safe progression from experimentation to production while maintaining clear separation of concerns.
    </p>
  </div>

  <hr class="border-slate-800/60" />

<div class="grid lg:grid-cols-3 gap-6 relative">

    <div class="hidden lg:block absolute top-1/2 left-[31%] w-8 h-px bg-slate-700 -translate-y-1/2 z-0"></div>
    <div class="hidden lg:block absolute top-1/2 right-[31%] w-8 h-px bg-slate-700 -translate-y-1/2 z-0"></div>

    <div class="relative bg-slate-900/40 border border-amber-500/30 rounded-lg p-5 hover:border-amber-500/60 transition-colors z-10 flex flex-col h-full">
      <div class="mb-4">
        <span class="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">INTERNAL</span>
        <h2 class="text-xl font-bold text-white mt-2">DevLab</h2>
        <p class="text-xs text-slate-500 mt-1">Rapid Prototyping</p>
      </div>

      <p class="text-sm text-slate-400 mb-4 flex-grow">
        Isolated internal sandboxes for workflow prototyping, breaking changes, and logic testing.
      </p>

      <div class="bg-black/20 rounded p-3 text-xs space-y-2 border border-amber-900/20">
        <div class="flex justify-between">
          <span class="text-slate-500">Access</span>
          <span class="text-slate-300">Engineers Only</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Visibility</span>
          <span class="text-amber-400">Private / Offline</span>
        </div>
      </div>
    </div>

    <div class="relative bg-slate-900/40 border border-blue-500/30 rounded-lg p-5 hover:border-blue-500/60 transition-colors z-10 flex flex-col h-full">
      <div class="mb-4">
        <span class="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">PREVIEW</span>
        <h2 class="text-xl font-bold text-white mt-2">staging.fabalos.com</h2>
        <p class="text-xs text-slate-500 mt-1">UAT / Validation</p>
      </div>

      <p class="text-sm text-slate-400 mb-4 flex-grow">
        Secured subdomain mirroring production data schemas for final client validation (UAT).
      </p>

      <div class="bg-black/20 rounded p-3 text-xs space-y-2 border border-blue-900/20">
        <div class="flex justify-between">
          <span class="text-slate-500">Access</span>
          <span class="text-slate-300">Client Admin</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Goal</span>
          <span class="text-blue-400">Sign-off</span>
        </div>
      </div>
    </div>

    <div class="relative bg-slate-900/40 border border-emerald-500/30 rounded-lg p-5 hover:border-emerald-500/60 transition-colors z-10 flex flex-col h-full">
      <div class="mb-4">
        <span class="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">PROD</span>
        <h2 class="text-xl font-bold text-white mt-2">fabalos.com</h2>
        <p class="text-xs text-slate-500 mt-1">Live Operations</p>
      </div>

      <p class="text-sm text-slate-400 mb-4 flex-grow">
        Live customer-facing environment handling real traffic and revenue. Single source of truth.
      </p>

      <div class="bg-black/20 rounded p-3 text-xs space-y-2 border border-emerald-900/20">
        <div class="flex justify-between">
          <span class="text-slate-500">Uptime</span>
          <span class="text-slate-300">99.9% SLA</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-500">Deploy</span>
          <span class="text-emerald-400">Immutable</span>
        </div>
      </div>
    </div>

  </div>

  <div class="bg-slate-950/50 border border-slate-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
    <div>
      <h3 class="font-bold text-white mb-1">Promotion Flow</h3>
      <p class="text-sm text-slate-400">Gated approvals with automated smoke tests at each step.</p>
    </div>

    <div class="flex items-center gap-2 text-sm font-mono bg-black/40 px-4 py-2 rounded border border-slate-800">
      <span class="text-amber-500">dev</span>
      <span class="text-slate-600">→</span>
      <span class="text-blue-500">staging</span>
      <span class="text-slate-600">→</span>
      <span class="text-emerald-500">prod</span>
    </div>
  </div>

</section>