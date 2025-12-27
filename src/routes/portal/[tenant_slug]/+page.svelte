<script lang="ts">
  import { fade } from 'svelte/transition';
  import Footer2 from '$lib/components/Footer2.svelte';

  export let data;
  $: ({ project } = data);
  $: files = data.files || [];

  // 1. DYNAMIC THEME ENGINE
  let currentTheme = {
    primary: '#3b82f6',
    accent: '#10b981',
    background: '#050505',
    surface: '#0a0a0a',
  };

  // 2. FORCE UPDATE LOGIC
  function randomizeTheme() {
    console.log("🎨 Cycling Theme...");

    const presets = [
      { primary: '#3b82f6', accent: '#10b981', background: '#050505', surface: '#0a0a0a' },
      { primary: '#c084fc', accent: '#f472b6', background: '#13041c', surface: '#220930' },
      { primary: '#f87171', accent: '#f59e0b', background: '#1a0505', surface: '#2b0a0a' },
      { primary: '#38bdf8', accent: '#818cf8', background: '#020617', surface: '#0f172a' },
      { primary: '#4ade80', accent: '#bef264', background: '#020f06', surface: '#081c0e' },
    ];

    const random = presets[Math.floor(Math.random() * presets.length)];

    currentTheme = {
      ...currentTheme,
      primary: random.primary,
      accent: random.accent,
      background: random.background,
      surface: random.surface
    };
  }

  // 🚨 MISSING PART RESTORED: This creates the 'theme' variable used in HTML
  $: theme = {
    ...(project?.theme_settings || {}), // DB Settings
    ...currentTheme                     // Overrides (for testing)
  };

  function getStatusTheme(status: string) {
    const s = status?.toLowerCase() || '';
    if (s === 'healthy' || s === 'active') return { bg: 'bg-accent', text: 'text-accent' };
    if (s === 'maintenance') return { bg: 'bg-warning', text: 'text-warning' };
    return { bg: 'bg-error', text: 'text-error' };
  }

  $: statusStyle = getStatusTheme(project?.storage_health);
</script>

<div
  class="min-h-screen font-sans text-text-main bg-background selection:bg-primary/30"
  style="
    --primary: {theme.primary};       --accent: {theme.accent};         --background: {theme.background}; --surface: {theme.surface};       "
>
  <nav class="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md transition-colors duration-300">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <div class="flex items-center gap-4">
        <a
          href="/portal/test"
          class="group flex items-center gap-2 text-xs font-medium text-text-soft transition-colors hover:text-text-main"
        >
          <svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO HUB
        </a>
      </div>

      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full {statusStyle.bg} opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full {statusStyle.bg}"></span>
          </span>
          <span class="font-mono text-[10px] font-bold uppercase tracking-wider {statusStyle.text}">
            System {project.storage_health}
          </span>
        </div>

        <div class="h-4 w-px bg-white/10"></div>

        <form action="/auth/logout" method="POST">
          <button type="submit" class="text-xs font-medium text-text-soft transition-colors hover:text-error">
            Disconnect
          </button>
        </form>
      </div>
    </div>
  </nav>

  <header class="relative overflow-hidden border-b border-white/5 bg-surface py-16 transition-colors duration-300">
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
    <div class="mx-auto max-w-7xl px-6 relative z-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <span class="h-px w-8 bg-primary"></span>
            Secure Vault Access
          </div>
          <h1 class="font-mono text-4xl font-bold tracking-tighter text-text-main md:text-5xl">
            {project.tenant_slug}
          </h1>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-text-soft">
            Authorized environment for <span class="text-text-main font-semibold">{project.authorized_clients?.display_name || 'Client'}</span>.
          </p>
        </div>

        <div class="flex gap-4">
          <div class="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <span class="block text-[10px] uppercase text-text-soft">Last Sync</span>
            <span class="font-mono text-sm font-bold text-text-main">
              {new Date(project.last_updated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-7xl px-6 py-12">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">

      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="flex items-center gap-3 text-lg font-bold text-text-main">
            <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Delivery Vault
          </h2>
          <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            {files.length} ASSETS
          </span>
        </div>

        <div class="overflow-hidden rounded-xl border border-white/10 bg-surface transition-colors duration-300">
          {#if files.length > 0}
            <div class="divide-y divide-white/5">
              {#each files as file}
                <div class="group flex items-center justify-between p-4 transition-colors hover:bg-white/[0.02]">
                  <div class="flex items-center gap-4">
                    <div class="flex h-10 w-10 items-center justify-center rounded bg-background text-text-soft transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                      <p class="font-medium text-text-main transition-colors group-hover:text-primary">
                        {file.key.split('/').pop()}
                      </p>
                      <div class="flex items-center gap-2 text-[10px] uppercase text-text-soft">
                        <span>{file.size}</span>
                        <span class="h-0.5 w-0.5 rounded-full bg-text-soft"></span>
                        <span>{new Date(file.updated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button class="rounded-lg border border-white/5 bg-background px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-text-soft transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-text-main">
                    Download
                  </button>
                </div>
              {/each}
            </div>
          {:else}
            <div class="flex flex-col items-center justify-center py-16 text-center">
              <p class="text-sm font-medium text-text-soft">No assets in the vault.</p>
            </div>
          {/if}
        </div>
      </div>

      <div class="space-y-8">
        <div class="rounded-xl border border-white/10 bg-surface p-6 transition-colors duration-300">
          <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-text-soft">Active Protocols</h3>
          {#if project.active_modules}
            <div class="space-y-2">
              {#each project.active_modules as mod}
                <div class="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] px-3 py-2">
                  <span class="font-mono text-xs text-text-main">{mod}</span>
                  <span class="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                </div>
              {/each}
            </div>
          {:else}
            <p class="text-xs italic text-text-soft">No active protocols.</p>
          {/if}
        </div>

        <div class="rounded-xl border border-primary/20 bg-primary/5 p-6 transition-colors duration-300">
          <h3 class="mb-2 text-sm font-bold text-text-main">Need Automation Support?</h3>
          <p class="mb-4 text-xs leading-relaxed text-text-soft">
            Direct line to Fabalos Engineering.
          </p>
          <a href="mailto:support@fabalos.com" class="block w-full rounded border border-primary/20 bg-primary/10 py-2 text-center text-xs font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-white">
            Open Ticket
          </a>
        </div>
      </div>

    </div>
  </main>



<button
    type="button"
    on:click={randomizeTheme}
    class="fixed bottom-6 right-6 z-[9999] cursor-pointer flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0a] px-5 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:-translate-y-1 active:scale-95"
  >
    <div class="flex items-center justify-center h-5 w-5 rounded-full bg-white/5 text-text-soft">
      <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </div>
    <span class="font-mono text-[10px] font-bold uppercase tracking-widest text-text-soft transition-colors group-hover:text-primary">
      Cycle_Theme
    </span>
  </button>

</div>

  <Footer2 />