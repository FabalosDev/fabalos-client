<script lang="ts">
  const year = new Date().getFullYear();
  const version = "SYS_V2.4.0";
</script>

<footer class="relative mt-auto py-10 font-mono text-[10px] text-slate-500 overflow-hidden">
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

  <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-pulse"></div>

  <div class="relative mx-auto max-w-[1400px] px-8">
    <div class="flex justify-between items-start mb-8 opacity-40">
      <div class="h-2 w-2 border-t border-l border-slate-700"></div>
      <div class="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-slate-800 to-transparent self-center"></div>
      <div class="h-2 w-2 border-t border-r border-slate-700"></div>
    </div>

    <div class="flex flex-col lg:flex-row items-center justify-between gap-10">
      <div class="flex items-center gap-6">
        <div class="flex flex-col">
          <span class="font-bold text-slate-200 uppercase tracking-[0.3em] hover:text-emerald-400 transition-colors cursor-default select-none flex items-center gap-2">
            <span class="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Fabalos<span class="text-slate-600">//</span>Systems
          </span>
          <span class="text-[9px] text-slate-600 tracking-widest mt-0.5">ESTABLISHED_NODE_MNL</span>
        </div>

        <div class="h-8 w-px bg-slate-800/50 hidden md:block"></div>

        <div class="hidden md:flex flex-col uppercase">
          <span class="text-slate-700 text-[8px] font-bold tracking-widest">BUILD_PROTOCOL</span>
          <span class="text-slate-500">{version}</span>
        </div>
      </div>

      <nav class="flex flex-wrap justify-center gap-x-10 gap-y-4 uppercase tracking-[0.15em] font-bold">
        {#each [
          { label: 'Knowledge_Assets', href: '/knowledge' },
          { label: 'Legal_Terms', href: '/legal' },
          { label: 'Sys_Manual', href: '/docs' },
          { label: 'Faq', href: '/faq' }
        ] as link}
          <a href={link.href} class="group flex items-center gap-2 text-slate-500 hover:text-white transition-all duration-300">
            <span class="text-emerald-500/0 group-hover:text-emerald-500 transition-all font-mono">[</span>
            <span class="group-hover:tracking-widest transition-all">{link.label}</span>
            <span class="text-emerald-500/0 group-hover:text-emerald-500 transition-all font-mono">]</span>
          </a>
        {/each}
      </nav>

      <div class="flex items-center gap-8">
        <div class="flex flex-col text-right hidden sm:flex">
          <span class="text-slate-700 text-[8px] font-bold uppercase tracking-tighter">Copyright_Ref</span>
          <span class="text-slate-500">© {year}_UPLINK</span>
        </div>

        <div class="flex items-center gap-3 rounded-sm bg-emerald-500/[0.03] px-4 py-2 border border-emerald-500/10 shadow-[inset_0_0_15px_rgba(16,185,129,0.02)]">
          <div class="relative flex h-2 w-2">
            <div class="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-20 duration-1000"></div>
            <div class="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
          <span class="font-bold text-emerald-500 tracking-[0.2em] text-[9px] uppercase">Node_Active</span>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-end mt-8 opacity-40">
      <div class="h-2 w-2 border-b border-l border-slate-700"></div>
      <div class="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-slate-800/50 to-transparent self-center"></div>
      <div class="h-2 w-2 border-b border-r border-slate-700"></div>
    </div>
  </div>
</footer>