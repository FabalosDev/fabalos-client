<svelte:head>
  <title>Privacy Policy · Fabalos Automation</title>
  <meta name="description" content="Data collection, usage, and protection policies for Fabalos Automation." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
        <svg class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.578-4.18M12 17.642a8.38 8.38 0 110-16.758" /></svg>
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tight">
        Privacy Policy
      </h1>
    </div>
    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-slate-700 pl-6">
      Fabalos Automation respects client privacy and processes data <strong class="text-white">only as necessary</strong> to deliver automation services. This policy details information collection, usage, protection, and client rights under applicable data protection laws.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Information Collected</h2>
    <p class="text-slate-400">
      Data collection is minimal and purpose-bound to service delivery.
    </p>
    <ul class="space-y-3">
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-emerald-500 mt-1">●</span>
        <span><strong class="text-white">Contact details</strong> (name, email) provided during inquiries or engagements.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-emerald-500 mt-1">●</span>
        <span><strong class="text-white">Business/workflow information</strong> shared for automation audits and implementation.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <span class="text-emerald-500 mt-1">●</span>
        <span><strong class="text-white">Technical metadata</strong> (IP address, browser type, usage patterns) for system security and analytics.</span>
      </li>
    </ul>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Use of Information</h2>
    <p class="text-slate-400">All data serves specific operational or improvement purposes.</p>
    <div class="grid gap-3">
      {#each [
        "Respond to inquiries, proposals, and support requests via official channels.",
        "Evaluate automation feasibility during Discovery phase and implement scoped workflows.",
        "Improve service quality through aggregated, anonymized analytics—no individual profiling."
      ] as item}
        <div class="flex items-start gap-3 p-3 bg-slate-900/40 border border-slate-800 rounded">
          <svg class="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span class="text-slate-300 text-sm">{item}</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="bg-slate-950/50 border border-slate-800 rounded-lg p-6 space-y-4">
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      <h2 class="text-xl font-bold text-white">Data Sharing Limits</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6 text-sm">
      <div class="space-y-2">
        <h3 class="font-bold text-slate-200">Strict Confidentiality</h3>
        <p class="text-slate-400">No sale or rental of personal/business data to third parties. Disclosure occurs solely when legally required (e.g., court order) with client notification where possible.</p>
      </div>
      <div class="space-y-2">
        <h3 class="font-bold text-slate-200">Authorized Processors</h3>
        <p class="text-slate-400">Information shared only with service providers (<span class="text-emerald-400">Supabase, n8n, Cloudflare</span>) under strict data processing agreements.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Data Storage & Security</h2>
    <p class="text-slate-400">Data secured through environment-isolated, RLS-enforced systems.</p>

    <div class="grid md:grid-cols-3 gap-4">
      <div class="bg-slate-900/20 border border-slate-800 p-4 rounded hover:border-emerald-500/30 transition-colors">
        <span class="text-xs font-mono text-emerald-400 block mb-2">INFRASTRUCTURE</span>
        <p class="text-sm text-slate-300">Stored in <strong class="text-white">Supabase PostgreSQL</strong> with row-level security matching client permissions.</p>
      </div>
      <div class="bg-slate-900/20 border border-slate-800 p-4 rounded hover:border-emerald-500/30 transition-colors">
        <span class="text-xs font-mono text-emerald-400 block mb-2">ENCRYPTION</span>
        <p class="text-sm text-slate-300">Encrypted at <strong class="text-white">rest/transit</strong>; access logs retained for audit and breach detection.</p>
      </div>
      <div class="bg-slate-900/20 border border-slate-800 p-4 rounded hover:border-emerald-500/30 transition-colors">
        <span class="text-xs font-mono text-emerald-400 block mb-2">RETENTION</span>
        <p class="text-sm text-slate-300">Limited to engagement duration + <strong class="text-white">90 days</strong> post-termination unless requested otherwise.</p>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Your Rights</h2>
    <ul class="list-disc list-outside ml-5 space-y-2 text-slate-300">
      <li>Request access, correction, deletion, or export of personal data via <a href="mailto:admin@fabalos.com" class="text-emerald-400 hover:underline decoration-emerald-500/50">admin@fabalos.com</a>.</li>
      <li>Opt-out of non-essential communications at any time.</li>
      <li>Right to lodge complaints with supervisory authorities if concerns remain unresolved.</li>
    </ul>
  </div>

  <hr class="border-slate-800/60" />

  <div class="flex items-center justify-between bg-slate-900/40 border border-slate-800 p-6 rounded-lg">
    <div>
      <h3 class="font-bold text-white">Privacy Inquiries</h3>
      <p class="text-sm text-slate-400 mt-1">Response within 30 days per regulatory standards.</p>
    </div>
    <a
      href="mailto:admin@fabalos.com"
      class="px-4 py-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 rounded border border-slate-700 transition-all font-mono text-sm"
    >
      admin@fabalos.com
    </a>
  </div>

</section>