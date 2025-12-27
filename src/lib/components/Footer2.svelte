<script lang="ts">
  const year = new Date().getFullYear();
  // "Build Version" adds a nice technical touch
  const version = "SYS_V2.4.0";
</script>

<footer class="relative mt-auto border-t border-white/5 bg-[#020202] py-8 font-mono text-[10px] text-slate-500">

  <div class="absolute inset-0 bg-white/[0.01]" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 20px 20px; opacity: 0.3;"></div>

  <div class="relative mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">

    <div class="flex items-center gap-4">
      <div class="flex flex-col">
        <span class="font-bold text-slate-300 uppercase tracking-[0.2em] hover:text-blue-500 transition-colors cursor-default">Fabalos // Systems</span>
        <span class="text-[9px] text-slate-700">ENGINEERING CORP.</span>
      </div>
      <div class="h-8 w-px bg-slate-800 hidden md:block"></div>
      <span class="hidden md:inline text-slate-700 font-bold">© {year}</span>
    </div>

    <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2 uppercase tracking-widest font-bold">
      <a href="/legal" class="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
        <span class="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500">></span>
        LEGAL_TERMS
      </a>
      <a href="/knowledge" class="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
        <span class="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500">></span>
        STD_OPS
      </a>
      <a href="/docs" class="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
        <span class="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500">></span>
        SYS_MANUAL
      </a>
      <a href="/faq" class="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
        <span class="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-blue-500">></span>
        FAQ
      </a>
    </nav>

    <div class="flex items-center gap-6">
      <span class="hidden lg:block text-slate-700">BUILD: {version}</span>

      <div class="flex items-center gap-4">
        <span class="text-slate-600">LOC: PH_MNL_01</span>

        <div class="flex items-center gap-2 rounded bg-slate-900/50 px-2 py-1 border border-slate-800/50 shadow-inner">
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <span class="font-bold text-emerald-500 tracking-wider">ONLINE</span>
        </div>
      </div>
    </div>

  </div>
</footer>