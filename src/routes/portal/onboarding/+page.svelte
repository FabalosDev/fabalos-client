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
      <div class="absolute inset-0 rounded-full border border-emerald-500/20 animate-pulse"></div>
      <svg class="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <div class="space-y-2">
      <h1 class="text-3xl font-bold text-white tracking-tighter">SYSTEM STANDBY</h1>
      <h2 class="text-sm font-bold text-emerald-500 tracking-[0.3em] uppercase">IDENTITY VERIFIED</h2>
    </div>

    <p class="text-slate-400 text-sm leading-relaxed">
      Your account is active, but no <span class="text-white">Project Environment</span> has been assigned yet.
      <br><br>
      Please stand by for provisioning when new projects are initialized.
    </p>

    <div class="bg-black/40 border border-slate-800 p-4 rounded text-xs text-slate-500 space-y-2">
      <div class="flex justify-between border-b border-white/5 pb-1">
        <span>ACCOUNT STATUS:</span>
        <span class="text-white">VERIFIED</span>
      </div>
      <div class="flex justify-between">
        <span>PROJECT ASSIGNMENT:</span>
        <span class="text-amber-500 animate-pulse">PENDING...</span>
      </div>
    </div>

    <div class="pt-6 flex flex-col gap-3">

      <a
        href="mailto:admin@fabalos.com?subject=Provisioning Request: My Account"
        class="inline-flex justify-center items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 rounded text-xs font-bold text-black transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.4)]"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        Contact Administrator
      </a>

      <form action="/auth/logout" method="POST">
        <button type="submit" class="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-red-500">
          Sign Out
        </button>
      </form>

    </div>
  </div>
</div>