<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let project: any;
  export let statusStyle: { bg: string, text: string };

  const dispatch = createEventDispatcher();

  // Safe date formatter
  $: lastSync = project.updated_at
    ? new Date(project.updated_at).toLocaleDateString()
    : (project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A');
</script>

<nav class="sticky top-0 z-40 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md transition-all duration-300">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    <div class="flex items-center gap-4">
      <a href="/portal/" class="group flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 transition-colors hover:text-white">
        <svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        BACK TO HUB
      </a>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <div class="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 shadow-lg">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full {statusStyle.bg} opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full {statusStyle.bg} shadow-[0_0_8px_currentColor]"></span>
        </span>
        <span class="font-mono text-[10px] font-bold uppercase tracking-wider {statusStyle.text}">
          Node: {project.storage_health || 'Unkown'}
        </span>
      </div>

      <div class="h-4 w-px bg-white/10"></div>

      <form action="/auth/logout" method="POST">
        <button type="submit" class="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-red-500">
          Disconnect
        </button>
      </form>
    </div>
  </div>
</nav>

<header class="relative border-b border-white/5 bg-transparent py-20 transition-colors duration-300">

  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
     <div class="absolute inset-0 bg-emerald-500/5 mix-blend-overlay opacity-20"
          style="mask-image: url('https://grainy-gradients.vercel.app/noise.svg');">
     </div>
     <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>

  <div class="mx-auto max-w-7xl px-6 relative z-10">
    <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

      <div class="relative">
        <div class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
          <span class="h-px w-8 bg-emerald-500 shadow-[0_0_8px_currentColor]"></span>
          Secure Vault Access
        </div>

        <h1 class="font-mono text-5xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-2xl leading-tight">
          {project.tenant_slug}
        </h1>

        <p class="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 font-mono">
          Authorized environment for <span class="text-white font-semibold">{project.authorized_clients?.client_name || 'Client'}</span>.
        </p>
      </div>

      <div class="flex gap-4">
        <div class="rounded-lg border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
          <span class="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Last Sync</span>
          <span class="font-mono text-sm font-bold text-white">
            {lastSync}
          </span>
        </div>
      </div>

    </div>
  </div>
</header>