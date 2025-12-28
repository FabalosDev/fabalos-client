<script lang="ts">
  import Starfield from '$lib/components/Starfield.svelte';
  export let data;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });
</script>

<svelte:head>
  <title>Fabaverse Gateway · Secure Uplink</title>
</svelte:head>

<div class="relative min-h-screen w-full overflow-hidden bg-[#020617] font-sans text-slate-300 selection:bg-emerald-500/30 flex items-center justify-center p-6">

  <Starfield />

  <div class="pointer-events-none absolute inset-0 z-0">
     <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617]/0 to-[#020617]"></div>
  </div>

  <div class="relative z-10 w-full max-w-lg">

    <div class="absolute -inset-1 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent blur-xl opacity-30"></div>

    <div class="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

      <div class="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>

      <div class="p-8 md:p-12 text-center space-y-8">

        <div class="space-y-4">
          <div class="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <svg class="h-8 w-8 text-emerald-400 drop-shadow-[0_0_8px_currentColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div class="absolute inset-0 animate-spin-slow rounded-full border-t border-emerald-500/50"></div>
          </div>

          <div>
            <h1 class="text-2xl font-bold tracking-tight text-white drop-shadow-md">Identity Confirmed</h1>
            <p class="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-emerald-500/80">
              User: {data.user?.name || 'Unknown Pilot'}
            </p>
          </div>
        </div>

        <div class="rounded-lg border border-emerald-500/10 bg-black/30 p-5">
          <div class="grid gap-3 text-xs">
            <div class="flex items-center justify-between border-b border-emerald-500/10 pb-2">
              <span class="text-slate-500 uppercase tracking-wide">Uplink Status</span>
              <span class="flex items-center gap-2 font-bold text-emerald-400">
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                ESTABLISHED
              </span>
            </div>
            <div class="flex items-center justify-between border-b border-emerald-500/10 pb-2">
              <span class="text-slate-500 uppercase tracking-wide">Organization</span>
              <span class="font-medium text-white">{data.user?.company || '---'}</span>
            </div>
            <div class="flex items-center justify-between pt-1">
              <span class="text-slate-500 uppercase tracking-wide">Stardate</span>
              <span class="font-mono text-slate-400">{today}</span>
            </div>
          </div>
        </div>

        <a
          href={data.routing?.target || '#'}
          class="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-emerald-600/10 px-6 py-4 font-bold text-emerald-400 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-500/20 hover:border-emerald-500"
        >
          <span class="relative z-10 tracking-widest uppercase text-xs">Initialize Dashboard</span>
          <svg class="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
        </a>

        <div class="text-[10px] font-mono uppercase tracking-widest text-slate-600">
          Fabalos.OS // v2.0 // Fabaverse Secure
        </div>
      </div>
    </div>
  </div>
</div>