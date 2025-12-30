<script lang="ts">
  import Starfield from '$lib/components/Starfield.svelte';
</script>

<svelte:head>
  <title>Fabalos Automation · Secure Gateway</title>
</svelte:head>

<div class="relative h-screen w-full overflow-hidden bg-[#020617] font-sans text-slate-300 selection:bg-emerald-500/30 flex flex-col items-center justify-center">

  <Starfield />

  <div class="pointer-events-none absolute inset-0 z-0">
     <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,46,129,0.05)_0%,rgba(2,6,23,0)_60%)]"></div>
     <div class="absolute inset-0 opacity-[0.05] mix-blend-overlay" style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);"></div>
  </div>

  <div class="relative z-10 w-full max-w-2xl px-6 text-center">

    <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 mb-10">
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
      <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
        System Operational
      </span>
    </div>

    <h1 class="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
      Fabalos <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Client Node</span>
    </h1>

    <p class="mx-auto max-w-lg text-sm md:text-base text-slate-400 leading-relaxed mb-12 font-mono uppercase tracking-widest">
      Restricted Environment.<br/>
      Authorized Personnel Access Only.
    </p>

    <div class="flex flex-col items-center gap-6">
      <a href="/login" class="group relative flex items-center justify-center gap-3 overflow-hidden rounded-lg bg-emerald-600 px-10 py-5 font-bold text-white transition-all duration-500 hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]">

        <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>

        <span class="tracking-[0.2em] uppercase text-xs">Establish Uplink</span>

        <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
      </a>

      <span class="text-[9px] text-slate-600 font-mono uppercase">
        Encrypted Connection
      </span>
    </div>

  </div>

  <div class="absolute bottom-6 w-full text-center">
    <p class="text-[10px] text-slate-700 font-mono uppercase tracking-widest">
      &copy; {new Date().getFullYear()} Fabalos Automation. All Systems Nominal.
    </p>
  </div>

</div>