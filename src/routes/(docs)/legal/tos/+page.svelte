<svelte:head>
  <title>Terms of Service · Fabalos Automation</title>
  <meta name="description" content="Binding Terms of Service governing engagements with Fabalos Automation." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <h1 class="text-4xl font-bold text-white tracking-tight">
      Terms of Service
    </h1>
    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-6">
      Fabalos Automation provides automation consulting, system design, workflow implementation, and technical advisory services. <strong class="text-white">By engaging our services or accessing provided systems, you agree to these binding Terms of Service</strong>, which govern all interactions, deliverables, and responsibilities.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded">DELIVERABLES</span>
      <h2 class="text-2xl font-semibold text-white">Scope of Services</h2>
    </div>

    <p class="text-slate-400 mb-4">
      Services focus on targeted automation solutions without ongoing operational management.
    </p>

    <ul class="space-y-3">
      {#each [
        "Automation and workflow design using n8n, Supabase, and integrated platforms.",
        "Integration of third-party APIs, databases, and SaaS tools per project scope.",
        "Complete documentation and asset handover (source code, credentials, runbooks) upon Phase 4 completion.",
        "Technical advisory for system architecture, optimization, and troubleshooting during active engagements."
      ] as item}
        <li class="flex items-start gap-3 text-slate-300">
          <svg class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          <span>{item}</span>
        </li>
      {/each}
    </ul>
  </div>

  <div class="bg-amber-950/20 border border-amber-900/30 p-6 rounded-lg space-y-4">
    <div class="flex items-center gap-3">
      <svg class="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      <h2 class="text-xl font-bold text-white">No Guarantees</h2>
    </div>

    <p class="text-sm text-slate-300 leading-relaxed">
      Automation systems enhance efficiency and reduce manual work but operate within defined environments and inputs.
    </p>

    <ul class="list-disc list-outside ml-5 space-y-2 text-sm text-amber-200/80">
      <li>No guarantees of revenue impact, 100% uptime, or complete error elimination—systems reflect provided data quality and configurations.</li>
      <li>Performance depends on client environment stability, third-party API reliability, and timely feedback during UAT.</li>
    </ul>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Client Responsibilities</h2>
    <p class="text-slate-400">
      Clients maintain ownership of requirements, data, and post-handover operations.
    </p>
    <div class="grid gap-3 pt-2">
      {#each [
        "Provide accurate, complete requirements and access credentials during Discovery phase.",
        "Review automation outputs, test thoroughly in staging, and report issues via official channels.",
        "Monitor production systems, maintain backups, and handle environment-specific configurations after handover."
      ] as item}
        <div class="flex items-start gap-3 p-3 bg-slate-900/40 border border-slate-800 rounded">
          <span class="text-emerald-500 font-bold">›</span>
          <span class="text-slate-300 text-sm">{item}</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded">LIMITATIONS</span>
      <h2 class="text-2xl font-semibold text-white">Liability</h2>
    </div>

    <div class="bg-slate-950 border border-slate-800 p-6 rounded-lg space-y-4">
      <p class="text-slate-300">
        Liability is limited to direct defects in delivered assets during the <strong>30-day support window</strong>.
      </p>
      <ul class="space-y-3 text-sm text-slate-400">
        <li class="flex gap-3">
          <span class="text-slate-600 uppercase font-bold text-xs pt-0.5 w-16 shrink-0">Exclusion</span>
          <span>To the maximum extent permitted by law, Fabalos Automation excludes liability for indirect, consequential, or punitive damages including lost revenue, data loss, or business interruption.</span>
        </li>
        <li class="flex gap-3">
          <span class="text-emerald-500 uppercase font-bold text-xs pt-0.5 w-16 shrink-0">Cap</span>
          <span class="text-white">Total liability is capped at fees paid for the specific engagement.</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Termination</h2>
    <p class="text-slate-400">
      Flexible termination with payment for completed work.
    </p>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-300">
      <li>Either party may terminate with <strong>30 days written notice</strong> via official channels.</li>
      <li>Work completed and deliverables provided up to termination date remain <strong>fully payable</strong>.</li>
      <li>Upon termination, client receives immediate access to all completed assets and documentation.</li>
    </ul>
  </div>

  <hr class="border-slate-800/60" />

  <div class="flex items-center justify-between bg-slate-900/40 border border-slate-800 p-6 rounded-lg">
    <div>
      <h3 class="font-bold text-white">Questions or Notices?</h3>
      <p class="text-sm text-slate-400 mt-1">All binding communication must use this address.</p>
    </div>
    <a
      href="mailto:admin@fabalos.com"
      class="px-4 py-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 rounded border border-slate-700 transition-all font-mono text-sm"
    >
      admin@fabalos.com
    </a>
  </div>

</section>