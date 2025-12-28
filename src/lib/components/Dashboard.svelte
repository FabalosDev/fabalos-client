<script lang="ts">
  // Props would typically come from your +page.server.ts (Supabase)
  export let clientName = "Fabalos Engineering";
  export let projectPhase = "Phase 2: MVP Build";
  export let progress = 33;
  export let systemStatus = "OPERATIONAL"; // OPERATIONAL, DEGRADED, MAINTENANCE

  const milestones = [
    { id: '01', title: 'Discovery & Proposal', status: 'COMPLETE', date: 'Dec 13' },
    { id: '02', title: 'Downpayment & Onboarding', status: 'COMPLETE', date: 'Dec 20' },
    { id: '03', title: 'Building MVP (Internal Audit)', status: 'ACTIVE', date: 'Jan 10' },
    { id: '04', title: 'UAT - User Acceptance', status: 'LOCKED', date: 'Jan 17' },
    { id: '05', title: 'Production Handover', status: 'LOCKED', date: 'Jan 24' }
  ];

  // Helper for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETE': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'ACTIVE': return 'text-blue-400 bg-blue-400/10 border-blue-400/20 animate-pulse';
      case 'LOCKED': return 'text-slate-600 bg-slate-800/50 border-slate-700';
      default: return 'text-slate-400';
    }
  };
</script>

<div class="min-h-screen bg-[#050505] text-slate-300 font-sans p-6 md:p-12">

  <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

  <div class="relative max-w-5xl mx-auto space-y-12">

    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <div class="h-2 w-2 rounded-full bg-blue-500"></div>
          <span class="text-xs font-mono text-blue-500 tracking-widest uppercase">Secure Client Uplink</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">{clientName}</h1>
        <p class="text-slate-500 text-sm">Authorized Environment: <span class="text-slate-300">Production</span></p>
      </div>

      <div class="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-3 rounded-lg backdrop-blur-sm">
        <div class="text-right">
          <div class="text-[10px] text-slate-500 font-mono uppercase">System Integrity</div>
          <div class="text-sm font-bold text-emerald-400 tracking-wider">{systemStatus}</div>
        </div>
        <div class="relative flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
        </div>
      </div>
    </header>

    <section class="grid md:grid-cols-2 gap-6">
      <div class="bg-slate-900/40 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg class="w-24 h-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>

        <h2 class="text-sm font-bold text-white uppercase tracking-wider mb-1">Credential Vault</h2>
        <p class="text-xs text-slate-500 mb-6">Encrypted access to environment variables.</p>

        <div class="flex items-center gap-4">
          <div class="text-3xl font-mono text-blue-400 font-bold tracking-tighter">admin_core</div>
          <button class="px-3 py-1 text-xs bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition-all">
            COPY KEY
          </button>
        </div>
        <div class="mt-4 text-[10px] text-slate-600 font-mono">
          LAST SYNC: {new Date().toLocaleDateString()} // SHA-256 ENCRYPTED
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <a href="/docs" class="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-emerald-500/30 hover:bg-slate-800/40 transition-all group">
          <svg class="w-8 h-8 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <span class="text-sm font-bold text-slate-300 mt-4 group-hover:text-white">System Manual</span>
        </a>
        <a href="mailto:admin@fabalos.com" class="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-amber-500/30 hover:bg-slate-800/40 transition-all group">
          <svg class="w-8 h-8 text-slate-600 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span class="text-sm font-bold text-slate-300 mt-4 group-hover:text-white">Request Support</span>
        </a>
      </div>
    </section>

    <section class="bg-slate-900/20 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">

      <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <div>
          <h2 class="text-sm font-bold text-white uppercase tracking-wider">Mission Timeline</h2>
          <p class="text-xs text-slate-500 mt-1">Current Sector: <strong class="text-blue-400">{projectPhase}</strong></p>
        </div>
        <div class="text-2xl font-bold text-blue-500">{progress}%</div>
      </div>

      <div class="h-1 w-full bg-slate-900">
        <div class="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style="width: {progress}%"></div>
      </div>

      <div class="divide-y divide-slate-800/50">
        {#each milestones as step}
          <div class="flex items-center gap-6 p-4 hover:bg-white/5 transition-colors group">

            <span class="font-mono text-xs text-slate-600 group-hover:text-slate-400 transition-colors">{step.id}</span>

            <div class="w-24 shrink-0">
              <span class="px-2 py-1 rounded text-[10px] font-bold border tracking-wider {getStatusColor(step.status)}">
                {step.status}
              </span>
            </div>

            <div class="flex-grow">
              <span class="text-sm font-medium {step.status === 'LOCKED' ? 'text-slate-500' : 'text-white'}">
                {step.title}
              </span>
            </div>

            <div class="text-xs font-mono text-slate-500">{step.date}</div>
          </div>
        {/each}
      </div>

    </section>

  </div>
</div>