<script lang="ts">
  import { fade } from 'svelte/transition';
  import Footer2 from '$lib/components/Footer2.svelte';
  import { enhance } from '$app/forms';

  export let data;
  export let form; // 🟢 FIX: This line allows Svelte to receive the form success/failure

  // 🟢 NEW: Destructure 'milestones' from data
  $: ({ project, milestones } = data);
  $: files = data.files || [];

  // 1. DYNAMIC THEME ENGINE (Your Logic)
  let currentTheme = {
    primary: '#3b82f6',
    accent: '#10b981',
    background: '#050505',
    surface: '#0a0a0a',
  };

  let showTicketModal = false;
  let ticketLoading = false;

  // Close modal on success
  // Now this will work because 'form' is defined above
  $: if (form?.success) {
    showTicketModal = false;
    // Optional: Add a toast notification logic here
  }

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

  $: theme = {
    ...(project?.theme_settings || {}),
    ...currentTheme
  };

  function getStatusTheme(status: string) {
    const s = status?.toLowerCase() || '';
    if (s === 'healthy' || s === 'active') return { bg: 'bg-accent', text: 'text-accent' };
    if (s === 'maintenance') return { bg: 'bg-warning', text: 'text-warning' };
    return { bg: 'bg-error', text: 'text-error' };
  }

  $: statusStyle = getStatusTheme(project?.storage_health);

  // 🟢 NEW: PROTOCOL MAPPING (Defines the look of your modules)
  const protocolMap: Record<string, { label: string, icon: string, desc: string }> = {
    crm: { label: 'Client CRM', icon: 'users', desc: 'Customer Data Engine' },
    files: { label: 'Vault Access', icon: 'folder', desc: 'Secure Storage' },
    cms: { label: 'Headless CMS', icon: 'layout', desc: 'Content Management' },
    reports: { label: 'Analytics', icon: 'bar-chart', desc: 'Live Data Streams' },
    default: { label: 'Module', icon: 'box', desc: 'System Component' }
  };

  // Helper to detect if we hit a new phase
  function isNewPhase(index: number) {
    if (index === 0) return true;
    return milestones[index].phase_label !== milestones[index - 1].phase_label;
  }
</script>

<div
  class="min-h-screen font-sans text-text-main bg-background selection:bg-primary/30"
  style="
    --primary: {theme.primary};
    --accent: {theme.accent};
    --background: {theme.background};
    --surface: {theme.surface};
  "
>
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

  <header class="relative overflow-hidden border-b border-white/5 bg-surface py-16 transition-colors duration-300">
    <div class="absolute inset-0 bg-primary/20" style="mask-image: url('/grid.svg'); -webkit-mask-image: url('/grid.svg'); mask-size: 40px 40px;"></div>
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

    {#if milestones && milestones.length > 0}
      <div class="mb-16">
        <div class="mb-6 flex items-end justify-between">
          <div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-text-soft">Production Timeline</h3>
            <p class="mt-1 text-xs text-text-soft opacity-50">Live status from Fabalos Engineering.</p>
          </div>
          <div class="text-right">
            <span class="font-mono text-2xl font-bold text-primary">
              {Math.round((milestones.filter(m => m.status === 'completed').length / milestones.length) * 100)}%
            </span>
          </div>
        </div>

<div class="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl">

  <table class="w-full text-left text-sm">
    <tbody class="divide-y divide-white/5">
      {#each milestones as step, i}

        {#if isNewPhase(i)}
          <tr class="bg-white/5">
            <td colspan="3" class="px-6 py-3">
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"></div>
                <span class="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {step.phase_label || 'Unknown Sector'}
                </span>
                <div class="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
              </div>
            </td>
          </tr>
          <tr class="text-[9px] font-bold uppercase tracking-widest text-text-soft/50">
            <td class="px-6 py-2 pb-0">Mission Objective</td>
            <td class="px-6 py-2 pb-0">Status</td>
            <td class="px-6 py-2 pb-0 text-right">ETA</td>
          </tr>
        {/if}

        <tr class="group transition-colors hover:bg-white/[0.02]">
          <td class="px-6 py-4">
            <div class="flex items-center gap-4">
              <span class="font-mono text-xs text-text-soft opacity-30">
                {step.sort_order.toString().padStart(2, '0')}
              </span>
              <span class="font-bold text-text-main {step.status === 'active' ? 'text-primary' : ''}">
                {step.title}
              </span>
            </div>
          </td>

          <td class="px-6 py-4">
            {#if step.status === 'completed'}
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Docked
              </span>
            {:else if step.status === 'active'}
              <span class="inline-flex items-center gap-1.5 rounded bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Orbiting
              </span>
{:else}
  <span class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-text-soft opacity-50">
    <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    Locked
  </span>
{/if}
          </td>

          <td class="px-6 py-4 text-right font-mono text-xs text-text-soft">
            {step.due_date ? new Date(step.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '---'}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

          {#if milestones.find(m => m.status === 'active')}
            <div class="border-t border-white/5 bg-white/[0.02] px-6 py-3 text-xs">
              <span class="font-bold text-primary">CURRENT FOCUS:</span>
              <span class="text-text-soft ml-2">{milestones.find(m => m.status === 'active').title}</span>
            </div>
          {/if}
        </div>
      </div>
    {/if}

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
                  <a
                    href="download?file={file.key}"
                    class="rounded-lg border border-white/5 bg-background px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-text-soft transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-text-main"
                  >
                    Download
                  </a>
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

        <div class="rounded-xl border border-white/10 bg-surface p-6">
          <h3 class="mb-6 text-xs font-bold uppercase tracking-widest text-text-soft">System Modules</h3>

          {#if project.active_modules && project.active_modules.length > 0}
            <div class="grid grid-cols-1 gap-3">
              {#each project.active_modules as mod}
                {@const meta = protocolMap[mod] || protocolMap.default}
                <div class="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-primary/50 hover:bg-primary/5">
                  <div class="flex items-start gap-4">
                    <div class="flex h-8 w-8 items-center justify-center rounded bg-background text-text-soft group-hover:text-primary">
                      {#if meta.icon === 'users'}<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>{/if}
                      {#if meta.icon === 'folder'}<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>{/if}
                      {#if meta.icon === 'bar-chart'}<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>{/if}
                      {#if meta.icon === 'layout'}<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>{/if}
                      {#if meta.icon === 'box'}<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>{/if}
                    </div>

                    <div>
                      <h4 class="text-xs font-bold text-text-main group-hover:text-primary">{meta.label}</h4>
                      <p class="text-[10px] text-text-soft">{meta.desc}</p>
                    </div>
                  </div>

                  <div class="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
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
<button
  on:click={() => showTicketModal = true}
  class="block w-full rounded border border-primary/20 bg-primary/10 py-2 text-center text-xs font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-white"
>
  Open Ticket
</button>
        </div>
      </div>

    </div>
  </main>
</div>

{#if showTicketModal}
    <div transition:fade class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div class="w-full max-w-lg rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl">

        <div class="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h3 class="text-xs font-bold uppercase tracking-widest text-text-main">Open Support Ticket</h3>
          <button
            on:click={() => showTicketModal = false}
            class="text-text-soft hover:text-error"
            aria-label="Close modal"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form
          method="POST"
          action="?/createTicket"
          use:enhance={() => {
            ticketLoading = true;
            return async ({ update }) => {
              await update();
              ticketLoading = false;
            };
          }}
          class="p-6 space-y-4"
        >
          <div class="space-y-1">
            <span class="block text-[10px] font-bold uppercase tracking-wide text-text-soft">Priority Level</span>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="normal" checked class="text-primary focus:ring-primary bg-surface border-white/10" />
                <span class="text-xs text-text-main">Normal</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="high" class="text-error focus:ring-error bg-surface border-white/10" />
                <span class="text-xs text-text-main">High Priority</span>
              </label>
            </div>
          </div>

          <div class="space-y-1">
            <label for="subject" class="text-[10px] font-bold uppercase tracking-wide text-text-soft">Issue Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. Login issues on mobile"
              required
              class="w-full rounded border border-white/10 bg-surface px-4 py-2 text-sm text-text-main placeholder-text-soft/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div class="space-y-1">
            <label for="message" class="text-[10px] font-bold uppercase tracking-wide text-text-soft">Description</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Describe the issue in detail..."
              required
              class="w-full rounded border border-white/10 bg-surface px-4 py-2 text-sm text-text-main placeholder-text-soft/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            ></textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              on:click={() => showTicketModal = false}
              class="px-4 py-2 text-xs font-bold uppercase text-text-soft hover:text-text-main"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={ticketLoading}
              class="rounded bg-primary px-6 py-2 text-xs font-bold uppercase text-black transition-transform active:scale-95 disabled:opacity-50"
            >
              {ticketLoading ? 'Transmitting...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}

<Footer2 />