<script lang="ts">
  // Onboarding page for unassigned identities
</script>

<svelte:head>
  <title>Provisioning · Fabalos Portal</title>
</svelte:head>

<div class="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center font-mono relative overflow-hidden">

  <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

  <div class="relative z-10 max-w-md space-y-8">

    <div class="mx-auto w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center relative">
      <div class="absolute inset-0 rounded-full border border-amber-500/20 animate-ping"></div>
      <svg class="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>

    <div class="space-y-2">
      <h1 class="text-4xl font-bold text-white tracking-tighter">404</h1>
      <h2 class="text-xl font-bold text-blue-500 tracking-widest uppercase italic">Signal_Lost</h2>
    </div>

    <p class="text-slate-400 text-sm leading-relaxed">
      The requested node <span class="text-red-400">/portal/onboarding</span> has been reached.
      This identity is verified but lacks an active <span class="text-white">tenant_assignment</span>.
    </p>

    <div class="bg-black/40 border border-slate-800 p-4 rounded text-xs text-slate-500 space-y-2">
      <div class="flex justify-between border-b border-white/5 pb-1">
        <span>STATUS:</span>
        <span class="text-amber-500 animate-pulse">AWAITING_PROVISIONING</span>
      </div>
      <div class="flex justify-between">
        <span>UPLINK:</span>
        <span class="text-emerald-500">ENCRYPTED_STABLE</span>
      </div>
    </div>

    <div class="pt-4">
      <a
        href="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded text-xs font-bold text-white hover:bg-slate-800 transition-all uppercase tracking-widest shadow-xl"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Return to Grid
      </a>
    </div>
  </div>
</div>