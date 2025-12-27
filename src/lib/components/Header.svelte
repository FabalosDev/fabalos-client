<script lang="ts">
  import { page } from '$app/stores';

  // Access user from the page store (passed down from layout)
  $: user = $page.data.session?.user;
</script>

<header class="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
  <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-mono">

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span class="text-white font-bold tracking-tighter uppercase text-sm">Fabalos // DevLab</span>
      </div>
      <div class="hidden sm:block h-4 w-[1px] bg-white/10"></div>
      <span class="text-[9px] text-white/30 hidden md:inline uppercase tracking-widest">State: Stable_v1.0.0</span>
    </div>

    <nav class="hidden md:flex items-center gap-10">
      <a href="#operations" class="text-[10px] text-white/40 hover:text-blue-400 transition-colors uppercase tracking-[0.2em]">
        <span class="text-blue-500/50 mr-1">00_</span>Operations
      </a>
      <a href="#infrastructure" class="text-[10px] text-white/40 hover:text-blue-400 transition-colors uppercase tracking-[0.2em]">
        <span class="text-blue-500/50 mr-1">01_</span>Infrastructure
      </a>
      <a href="#protocol" class="text-[10px] text-white/40 hover:text-blue-400 transition-colors uppercase tracking-[0.2em]">
        <span class="text-blue-500/50 mr-1">02_</span>Protocol
      </a>
    </nav>

    <div class="flex items-center gap-4">
      <div class="hidden lg:block px-2 py-1 bg-white/[0.03] border border-white/10 rounded text-[9px] text-white/40 uppercase font-mono">
        LOC: PH_MNL_01
      </div>

      {#if user}
        <form action="/auth/logout" method="POST">
          <button type="submit" class="group flex items-center gap-2 bg-slate-800 hover:bg-red-900/50 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-tighter transition-all border border-transparent hover:border-red-500/50">
            <span>Disconnect</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-50 group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </form>
      {:else}
        <a href="/login" class="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-2 uppercase tracking-tighter transition-all">
          <span>Access_Vault</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-50 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      {/if}
    </div>
  </div>
</header>