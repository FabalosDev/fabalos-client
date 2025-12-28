<script lang="ts">
  const year = new Date().getFullYear();
  // "Build Version" tied to your release cycle
  const version = "SYS_V2.4.0";
</script>

<footer class="relative mt-auto border-t border-white/5 bg-[#020202] py-8 font-mono text-[10px] text-slate-500 overflow-hidden">

  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

  <div class="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent pointer-events-none"></div>

  <div class="relative mx-auto max-w-[1400px] px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">

    <div class="flex items-center gap-5 w-full md:w-auto justify-center md:justify-start">
      <div class="flex flex-col text-right md:text-left border-r md:border-r-0 border-slate-800 pr-5 md:pr-0 md:border-none">
        <span class="font-bold text-slate-200 uppercase tracking-[0.2em] hover:text-emerald-400 transition-colors cursor-default select-none">
          Fabalos<span class="text-slate-600">//</span>Systems
        </span>
        <span class="text-[9px] text-slate-600 tracking-tight">FABALOS AUTOMATION</span>
      </div>

      <div class="h-6 w-px bg-slate-800 hidden md:block"></div>

      <span class="hidden md:inline text-slate-600 font-bold">© {year}</span>
    </div>

    <nav class="flex flex-wrap justify-center gap-x-8 gap-y-3 uppercase tracking-widest font-bold w-full md:w-auto">
      <a href="/knowledge" class="group flex items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors duration-300">
        <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500 font-bold">></span>
        KNOWLEDGE_ASSETS
      </a>
      <a href="/legal" class="group flex items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors duration-300">
        <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500 font-bold">></span>
        LEGAL_TERMS
      </a>
      <a href="/docs" class="group flex items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors duration-300">
        <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500 font-bold">></span>
        SYS_MANUAL
      </a>
      <a href="/faq" class="group flex items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors duration-300">
        <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500 font-bold">></span>
        FAQ
      </a>
    </nav>

    <div class="flex flex-col md:flex-row items-center gap-2 md:gap-6 w-full md:w-auto justify-center md:justify-end">

      <span class="hidden lg:block text-slate-700 tracking-wider">BUILD: <span class="text-slate-500">{version}</span></span>

      <div class="flex items-center gap-4">
        <span class="text-slate-600 tracking-widest text-[9px]">LOC: <span class="text-slate-500">PH_MNL_01</span></span>

        <div class="flex items-center gap-2 rounded bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]">
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 duration-1000"></span>
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <span class="font-bold text-emerald-500 tracking-wider text-[9px]">ONLINE</span>
        </div>
      </div>
    </div>

  </div>
</footer>