<svelte:head>
  <title>FAQ · Fabalos Automation</title>
  <meta name="description" content="Frequently Asked Questions about Fabalos Automation services, operations, and support." />
</svelte:head>

<section class="space-y-12 max-w-4xl">

  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
        <svg class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tight">
        Frequently Asked Questions
      </h1>
    </div>

    <p class="text-lg text-slate-300 leading-relaxed border-l-2 border-emerald-500/50 pl-6">
      Fabalos Automation FAQ addresses common concerns about <strong class="text-white">services, ownership, support, and system operations</strong>. Questions are organized by engagement phase to help you find answers quickly.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xs font-mono text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded">PHASE 1-4</span>
      <h2 class="text-2xl font-semibold text-white">Engagement & Delivery</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">Do you guarantee results?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          No. Automation improves efficiency and consistency, but business outcomes depend on client data quality, environment stability, and usage patterns.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">Who owns the system and data?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Clients own their input data and final system outputs (workflows, code, documentation). Reusable frameworks remain provider property.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">Do you provide ongoing support?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Only if a maintenance agreement exists. Standard delivery includes <strong class="text-emerald-400">30-day bug fix window</strong>; enhancements require new scope.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">How long does a typical project take?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Phase 1-4 lifecycle completes in 4-8 weeks depending on complexity. MVP typically delivered in Phase 2 within 2-3 weeks post-Discovery.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors md:col-span-2">
        <h3 class="text-white font-bold mb-2">What happens if scope changes mid-project?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Change requests follow formal approval with timeline/cost impact. Work pauses until signed—no verbal scope modifications.
        </p>
      </div>
    </div>
  </div>

  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">OPS & INFRA</span>
      <h2 class="text-2xl font-semibold text-white">Technical Operations</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">What environments do you use?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Three isolated environments: <code class="text-xs bg-slate-800 px-1 rounded">DevLab</code> (dev), <code class="text-xs bg-slate-800 px-1 rounded">staging.fabalos.com</code> (staging), <code class="text-xs bg-slate-800 px-1 rounded">fabalos.com</code> (prod) with gated promotion flow.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">Can I access source code?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Yes, via GitHub repo with branch protection. Full access + credentials transferred in Phase 4 handover.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">What if a workflow fails?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Systems include retry logic and 5-minute rollback. 30-day support covers critical fixes; client monitors post-handover.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">How are credentials handled?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Client-owned credentials stored in vaults only (never Git/plaintext). Access revoked on termination; 90-day rotation policy.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors md:col-span-2">
        <h3 class="text-white font-bold mb-2">What backup/recovery options exist?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Supabase PITR + R2 backups (7/30/90-day retention). n8n workflows backed up to Git. Full recovery runbooks provided in Knowledge Assets.
        </p>
      </div>
    </div>
  </div>

  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">LEGAL</span>
      <h2 class="text-2xl font-semibold text-white">Post-Handover & Legal</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">Can I modify workflows after handover?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Yes, full source access provided. Documentation includes modification patterns and testing procedures.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">What if third-party APIs change?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Client responsibility post-handover. Maintenance agreements cover API updates; runbooks include change detection alerts.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">Are systems GDPR/PHI compliant?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Supabase RLS + client-configured policies enable compliance. No data processing outside client direction.
        </p>
      </div>
      <div class="bg-slate-900/20 p-5 rounded border border-slate-800 hover:border-slate-700 transition-colors">
        <h3 class="text-white font-bold mb-2">What payment terms apply?</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          50% upfront (Phases 1-2), 50% on Phase 4 delivery. Fixed-price per SOW; change orders billed separately.
        </p>
      </div>
      <div class="bg-red-950/20 p-5 rounded border border-red-900/30 md:col-span-2 flex items-center justify-between">
        <div>
          <h3 class="text-white font-bold mb-1">How do I report security issues?</h3>
          <p class="text-sm text-slate-400">Critical issues receive 1-hour response; patches deployed within 24 hours.</p>
        </div>
        <a href="mailto:admin@fabalos.com" class="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-sm border border-red-800/50 rounded transition-colors">
          admin@fabalos.com
        </a>
      </div>
    </div>
  </div>

</section>