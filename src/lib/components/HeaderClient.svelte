<script lang="ts">
  export let data: any;
  export let form: any;

  // Safe access
  $: project = data?.project ?? null;

  // Storage health -> style (single source of truth)
  type StatusStyle = { bg: string; text: string };

  function getStatusTheme(status?: string): StatusStyle {
    const s = (status ?? '').toLowerCase();

    if (s === 'operational' || s === 'healthy' || s === 'active') {
      return { bg: 'bg-emerald-500', text: 'text-emerald-400' };
    }
    if (s === 'warning' || s === 'maintenance') {
      return { bg: 'bg-amber-500', text: 'text-amber-400' };
    }
    return { bg: 'bg-red-500', text: 'text-red-400' };
  }

  // 🔑 THIS was missing
  $: statusStyle = getStatusTheme(project?.storage_health);
</script>

<nav class="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md transition-all duration-300">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    <div class="flex items-center gap-4">
      <a href="/portal/" class="group flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 transition-colors hover:text-white">
        <svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        BACK TO HUB
      </a>
    </div>

    <div class="flex items-center gap-4 md:gap-6">

      <div class="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full {statusStyle.bg} opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full {statusStyle.bg}"></span>
        </span>
        <span class="font-mono text-[10px] font-bold uppercase tracking-wider {statusStyle.text}">
          Node: {project.storage_health}
        </span>
      </div>

      <button
        type="button"
        on:click={randomizeTheme}
        class="group flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 px-4 py-1.5 transition-all hover:border-emerald-500/50 hover:bg-slate-800"
      >
        <svg class="h-3 w-3 text-slate-400 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        <span class="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">
          Theme
        </span>
      </button>

      <div class="h-4 w-px bg-white/10"></div>

      <form action="/auth/logout" method="POST">
        <button type="submit" class="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-red-500">
          Disconnect
        </button>
      </form>

    </div>
  </div>
</nav>