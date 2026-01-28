<svelte:head>
  <title>Project Lifecycle · Fabalos Automation</title>
  <meta name="description" content="The four-phase lifecycle for Fabalos Automation engagements: Discovery, Build, UAT, and Deployment." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <h1 class="text-4xl font-bold text-white tracking-tight">
      Project Lifecycle
    </h1>
    <p class="text-lg text-slate-300 leading-relaxed">
      Fabalos Automation follows a lean, <strong class="text-white font-medium">four-phase lifecycle</strong> that delivers working systems quickly while maintaining clear boundaries around scope, validation, and handover.
    </p>
    <div class="bg-slate-900/50 border border-slate-800 p-4 rounded text-sm text-slate-400">
      <strong class="text-slate-200">Protocol:</strong> Each phase has defined entry/exit criteria to prevent drift and ensure predictable timelines.
    </div>
  </div>

  <hr class="border-slate-800/60" />

  <div class="relative space-y-8 pl-4 md:pl-0">

    <div class="relative pl-8 md:pl-10 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors duration-300">
      <span class="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 ring-2 ring-blue-500"></span>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h2 class="text-xl font-bold text-white">Phase 1: Discovery & Audit</h2>
          <span class="text-xs font-mono text-blue-400 uppercase tracking-wider bg-blue-400/10 px-2 py-1 rounded w-fit">Definition</span>
        </div>

        <p class="text-slate-400 italic">
          Initial assessment focuses on mapping current workflows and identifying high-impact automation opportunities without premature commitment.
        </p>

        <ul class="space-y-2 text-slate-300 list-disc ml-4">
          <li>Conduct <strong class="text-white">workflow review</strong> through screen shares, shared docs, or direct observation to document as-is processes.</li>
          <li>Identify bottlenecks using time/motion analysis and ROI estimation to qualify projects prior to proposal.</li>
          <li>Deliver <strong class="text-white">audit report</strong> with prioritized opportunities, estimated timelines, and fixed-price proposal—no further work until signed.</li>
          <li>Deploy <strong class="text-white">Secure Content Vault</strong> in the Client Portal to centralize credentials, API keys, and raw assets.</li>
        </ul>
      </div>
    </div>

    <div class="relative pl-8 md:pl-10 border-l-2 border-amber-500/30 hover:border-amber-500 transition-colors duration-300">
      <span class="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 ring-2 ring-amber-500"></span>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h2 class="text-xl font-bold text-white">Phase 2: MVP Build</h2>
          <span class="text-xs font-mono text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-1 rounded w-fit">Execution</span>
        </div>

        <p class="text-slate-400 italic">
          Build only the core automation paths validated in Phase 1, tested internally across dev/staging environments before client exposure.
        </p>

        <ul class="space-y-2 text-slate-300 list-disc ml-4">
          <li>Implement essential workflows using <strong class="text-white">n8n/Supabase/SvelteKit stack</strong> with environment isolation from day one.</li>
          <li>Run internal validation including edge cases, load tests, and 48-hour stability monitoring.</li>
          <li><strong class="text-white">Lock scope</strong>—no feature additions until UAT completion.</li>
        </ul>
      </div>
    </div>

    <div class="relative pl-8 md:pl-10 border-l-2 border-violet-500/30 hover:border-violet-500 transition-colors duration-300">
      <span class="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 ring-2 ring-violet-500"></span>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h2 class="text-xl font-bold text-white">Phase 3: UAT</h2>
          <span class="text-xs font-mono text-violet-400 uppercase tracking-wider bg-violet-400/10 px-2 py-1 rounded w-fit">Validation</span>
        </div>

        <p class="text-slate-400 italic">
          Client validates MVP in staging environment; fixes limited to critical bugs blocking core use cases.
        </p>

        <ul class="space-y-2 text-slate-300 list-disc ml-4">
          <li>Provide <strong class="text-white">staging access</strong> with test data mirroring production patterns and full documentation.</li>
          <li>Process feedback through prioritized ticket queue—enhancements deferred to Phase 5 (optional).</li>
          <li>Complete when client signs off on core functionality matching audit deliverables.</li>
        </ul>
      </div>
    </div>

    <div class="relative pl-8 md:pl-10 border-l-2 border-emerald-500/30 hover:border-emerald-500 transition-colors duration-300">
      <span class="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 ring-2 ring-emerald-500"></span>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h2 class="text-xl font-bold text-white">Phase 4: Final Deployment</h2>
          <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider bg-emerald-400/10 px-2 py-1 rounded w-fit">Handover</span>
        </div>

        <p class="text-slate-400 italic">
          Transition to production with handover of all assets, credentials, and runbooks.
        </p>

        <ul class="space-y-2 text-slate-300 list-disc ml-4">
          <li>Execute <strong class="text-white">deterministic deployment</strong> via GitHub CI to production environment with rollback ready.</li>
          <li>Transfer credentials, source code access, and monitoring setup with 30-day support window.</li>
          <li>Deliver complete documentation package matching this docs site structure.</li>
        </ul>
      </div>
    </div>

  </div>

</section>