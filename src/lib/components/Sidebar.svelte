<script lang="ts">
  import { page } from '$app/stores';
  export let modules: string[] = [];
  export let slug = '';

  $: isActive = (path: string) => $page.url.pathname.includes(path);

  function getLabel(mod: string) {
    return mod.replace(/_/g, ' ').toUpperCase();
  }

  // ICONS (Updated for the new terms)
  const icons = {
    dashboard: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    vault: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    docs: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    anomaly: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    transmission: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
    default: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  };

  // Module Icons Helper
  function getModuleIcon(mod: string) {
    const m = mod.toLowerCase();
    if (m.includes('crm') || m.includes('client')) return "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z";
    if (m.includes('cms') || m.includes('content')) return "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z";
    if (m.includes('tag')) return "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z";
    if (m.includes('edit') || m.includes('blog')) return "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z";
    return icons.default;
  }
</script>

<aside class="fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/5 bg-[#020617]/90 backdrop-blur-xl flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.4)]">

  <div class="flex h-16 items-center border-b border-white/5 px-6 shrink-0">
    <div class="flex items-center gap-3">
      <div class="relative flex h-8 w-8 items-center justify-center rounded bg-emerald-500/10 text-emerald-400">
        <div class="absolute inset-0 rounded border border-emerald-500/30"></div>
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
      </div>
      <span class="font-mono text-sm font-bold tracking-wider text-white">FABALOS<span class="text-emerald-500">.OS</span></span>
    </div>
  </div>

  <nav class="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar">

    <div class="px-3 mb-2 mt-2 text-[9px] font-bold uppercase tracking-widest text-slate-600">Core Systems</div>

    <a href="/portal/{slug}"
       class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5
       {$page.url.pathname === `/portal/${slug}` ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 border border-transparent'}">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.dashboard} /></svg>
      Mission Control
    </a>

    <a href="/portal/{slug}/vault"
       class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5
       {isActive('/vault') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 border border-transparent'}">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.vault} /></svg>
      Vault Access
    </a>

    {#if modules && modules.length > 0}
      <div class="mt-8 mb-2 px-3 flex items-center justify-between">
          <span class="text-[9px] font-bold uppercase tracking-widest text-slate-600">Active Nodes</span>
          <span class="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>

      <a href="/portal/{slug}/start"
         class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5
         {isActive('/start') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 border border-transparent'}">
        <svg class="h-4 w-4 transition-colors {isActive('/start') ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.default} />
        </svg>
        SYSTEM MANUAL
      </a>

      {#each modules as mod}
        <a href="/portal/{slug}/{mod}"
           class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5
           {isActive(`/${mod}`) ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 border border-transparent'}">
          <svg class="h-4 w-4 transition-colors {isActive(`/${mod}`) ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getModuleIcon(mod)} />
          </svg>
          {getLabel(mod)}
        </a>
      {/each}
    {/if}

    <div class="mt-8 mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-slate-600">System Intelligence</div>

    <a href="/portal/{slug}/docs"
       class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5
       {isActive('/docs') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 border border-transparent'}">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.docs} /></svg>
      Protocol Archives
    </a>

    <div class="mt-8 mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-slate-600">Communications</div>

    <a href="/portal/{slug}/support"
       class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5
       {isActive('/support') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 border border-transparent'}">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.anomaly} /></svg>
      Report Anomaly
    </a>

    <a href="mailto:frank.2.abalos@gmail.com"
       class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/5 text-slate-400 border border-transparent">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons.transmission} /></svg>
      Direct Transmission
    </a>

  </nav>

  <div class="shrink-0 border-t border-white/5 p-4 bg-[#020617]">
    <form action="/auth/logout" method="POST">
      <button class="group relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 overflow-hidden">

        <div class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>

        <div class="flex items-end gap-[2px] h-4">
            <div class="w-1 h-1 bg-emerald-500 group-hover:bg-red-500 transition-colors"></div>
            <div class="w-1 h-2 bg-emerald-500 group-hover:bg-red-500 transition-colors"></div>
            <div class="w-1 h-3 bg-emerald-500 group-hover:bg-red-500 transition-colors"></div>
        </div>

        <div class="flex-1 overflow-hidden z-10">
            <p class="truncate text-[10px] font-bold uppercase tracking-widest text-emerald-500 group-hover:hidden">Uplink Established</p>
            <p class="truncate text-[9px] text-slate-500 group-hover:hidden">Operator Online</p>

            <p class="hidden group-hover:block truncate text-[10px] font-bold uppercase tracking-widest text-red-500">Sever Connection</p>
            <p class="hidden group-hover:block truncate text-[9px] text-red-400/70">End Session?</p>
        </div>

        <svg class="h-4 w-4 text-slate-600 group-hover:text-red-500 transition-colors z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
      </button>
    </form>
  </div>
</aside>