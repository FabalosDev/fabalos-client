<svelte:head>
  <title>Credential Ownership · Fabalos Automation</title>
  <meta name="description" content="Protocols for ownership, storage, and revocation of system credentials." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
        <svg class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tight">
        Credential Ownership
      </h1>
    </div>

    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500/50 pl-6">
      This document defines <strong class="text-white">ownership, responsibility, and secure handling</strong> of all credentials used within Fabalos Automation systems, ensuring clear accountability and protection across project lifecycles.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Ownership Rules</h2>
    <p class="text-slate-400">Clients maintain full control and ownership of production credentials.</p>

    <div class="grid gap-3">
      <div class="flex items-start gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded">
        <span class="text-emerald-500 font-bold mt-1">01</span>
        <div class="space-y-1">
          <strong class="text-white text-sm">Client Sovereignty</strong>
          <p class="text-xs text-slate-400">Clients retain ownership of all third-party accounts (APIs, SaaS platforms, databases) integrated into workflows.</p>
        </div>
      </div>
      <div class="flex items-start gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded">
        <span class="text-emerald-500 font-bold mt-1">02</span>
        <div class="space-y-1">
          <strong class="text-white text-sm">Fabalos Scope</strong>
          <p class="text-xs text-slate-400">Fabalos manages only environment-specific service credentials (Supabase, n8n, Cloudflare) during active engagements.</p>
        </div>
      </div>
      <div class="flex items-start gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded">
        <span class="text-emerald-500 font-bold mt-1">03</span>
        <div class="space-y-1">
          <strong class="text-white text-sm">Handover Protocol</strong>
          <p class="text-xs text-slate-400">No credential transfer occurs via chat/email. Clients receive direct vault access and rotation instructions.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Storage Requirements</h2>

    <div class="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
      <div class="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <span class="text-xs font-mono text-slate-400 uppercase tracking-wider">Vault Policy</span>
        <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      </div>
      <div class="p-5 space-y-4">
        <p class="text-sm text-slate-300">
          Credentials adhere to strict <strong class="text-white">vault-only storage</strong> policies.
        </p>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2 text-slate-400">
            <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            <span>Never stored in plaintext, env variables, or Git.</span>
          </li>
          <li class="flex items-center gap-2 text-slate-400">
            <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Stored exclusively in vaults (Supabase secrets, 1Password) with audit logs.</span>
          </li>
          <li class="flex items-center gap-2 text-slate-400">
            <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>Rotation enforced: <strong>90 days</strong> or immediately upon security events.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold text-white">Access & Revocation</h2>
    <p class="text-slate-400">Access follows least-privilege with automatic cleanup on termination.</p>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="p-4 rounded border border-slate-800 bg-slate-900/20 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold text-sm mb-2">Scoped IAM</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Access is scoped to specific environments and roles via RLS and IAM policies. No blanket admin access.
        </p>
      </div>
      <div class="p-4 rounded border border-slate-800 bg-slate-900/20 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold text-sm mb-2">Termination Killswitch</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          All access revoked upon project termination or <strong>30 days post-handover</strong> unless maintenance agreement is active.
        </p>
      </div>
      <div class="p-4 rounded border border-slate-800 bg-slate-900/20 hover:border-slate-700 transition-colors md:col-span-2">
        <h3 class="text-white font-bold text-sm mb-2">Audit Trail</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Revocation audit trail maintained for 12 months with client confirmation required.
        </p>
      </div>
    </div>
  </div>

  <hr class="border-slate-800/60" />

  <div class="flex items-center justify-between bg-red-950/10 border border-red-900/20 p-6 rounded-lg">
    <div>
      <h3 class="font-bold text-white flex items-center gap-2">
        <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        Emergency Revocation
      </h3>
      <p class="text-sm text-slate-400 mt-1">Requests processed within 1 hour.</p>
    </div>
    <a
      href="mailto:admin@fabalos.com?subject=EMERGENCY%20REVOCATION"
      class="px-4 py-2 bg-slate-800 hover:bg-red-900/50 hover:text-white text-slate-200 rounded border border-slate-700 hover:border-red-500/50 transition-all font-mono text-sm"
    >
      admin@fabalos.com
    </a>
  </div>

</section>