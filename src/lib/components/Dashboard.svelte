<script lang="ts">
  import HeaderClient from '$lib/components/HeaderClient.svelte';
  import TicketModal from '$lib/components/TicketModal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import SpaceTimeline from '$lib/components/SpaceTimeline.svelte';
  import Starfield from '$lib/components/Starfield.svelte';

  // Kukunin natin ang lahat ng kailangan sa 'data' prop mula sa +page.server.ts
  export let data;
  $: ({ project, milestones, files, form } = data);

  let showTicketModal = false;

  // Theme preservation logic
  let currentTheme = { primary: '#3b82f6', accent: '#10b981', background: '#000000', surface: '#0a0a0a' };
  $: theme = { ...(project?.theme_settings || {}), ...currentTheme };

  function randomizeTheme() {
    const presets = [
       { primary: '#3b82f6', accent: '#10b981', background: '#050505', surface: '#0a0a0a' },
       { primary: '#c084fc', accent: '#f472b6', background: '#13041c', surface: '#220930' },
       { primary: '#38bdf8', accent: '#818cf8', background: '#020617', surface: '#0f172a' },
    ];
    currentTheme = { ...currentTheme, ...presets[Math.floor(Math.random() * presets.length)] };
  }

  function getStatusTheme(status: string) {
    const s = status?.toLowerCase() || '';
    if (s === 'healthy' || s === 'active') return { bg: 'bg-accent', text: 'text-accent' };
    if (s === 'maintenance') return { bg: 'bg-warning', text: 'text-warning' };
    return { bg: 'bg-error', text: 'text-error' };
  }

  $: statusStyle = getStatusTheme(project?.storage_health);
</script>

<div class="relative z-10 min-h-screen">
  <Starfield />
  <Toast />

  <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-overlay" style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);"></div>

  <HeaderClient {project} {statusStyle} on:randomizeTheme={randomizeTheme} />

  <main class="py-8 space-y-12">
    {#if milestones && milestones.length > 0}
      <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md p-6 shadow-2xl">
        <div class="mb-6 flex items-center justify-between">
           <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500">Live Operations</h3>
           <span class="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary animate-pulse tracking-widest">STATUS: ACTIVE</span>
        </div>
        <SpaceTimeline {milestones} />
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
         <div class="flex items-center justify-between px-1">
            <h2 class="text-sm font-bold text-white uppercase tracking-wider font-mono">Secure_Vault_Access</h2>
            <span class="text-[10px] text-slate-500 font-mono tracking-tighter">NODE_STABLE</span>
         </div>
         <div class="rounded-xl border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-md overflow-hidden">
            {#each files as file}
              <div class="group flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div class="flex items-center gap-3">
                  <svg class="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{file.key?.split('/').pop() || 'Unknown_Asset'}</span>
                </div>
                <a href="/portal/{project.tenant_slug}/vault/download?file={file.key}" class="px-3 py-1 rounded border border-white/10 text-[10px] font-bold uppercase hover:bg-primary hover:text-black hover:border-primary transition-all">
                  Download
                </a>
              </div>
            {/each}
            {#if !files || files.length === 0}
              <div class="p-12 text-center">
                <p class="text-xs text-slate-600 italic uppercase tracking-widest">No assets transmitted to vault yet.</p>
              </div>
            {/if}
         </div>
      </div>

      <div class="space-y-4">
          <h2 class="text-sm font-bold text-white uppercase tracking-wider font-mono px-1">Quick_Actions</h2>

          <button on:click={() => showTicketModal = true} class="group w-full rounded-xl border border-white/10 bg-[#0a0a0a]/40 p-5 text-left transition-all hover:border-primary/50 hover:bg-primary/5 shadow-lg">
              <div class="mb-3 flex h-9 w-9 items-center justify-center rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 class="text-xs font-bold text-white uppercase tracking-widest">Create Support Ticket</h3>
              <p class="text-[10px] text-slate-500 mt-2 leading-relaxed">Direct uplink to engineering for system anomalies.</p>
          </button>

          <a href="mailto:frank.2.abalos@gmail.com" class="group block w-full rounded-xl border border-white/10 bg-[#0a0a0a]/40 p-5 text-left transition-all hover:border-accent/50 hover:bg-accent/5 shadow-lg">
              <div class="mb-3 flex h-9 w-9 items-center justify-center rounded bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-all">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 class="text-xs font-bold text-white uppercase tracking-widest">Contact Engineer</h3>
              <p class="text-[10px] text-slate-500 mt-2 leading-relaxed">Direct transmission line for non-critical queries.</p>
          </a>
      </div>
    </div>
  </main>
</div>

<TicketModal bind:show={showTicketModal} {form} />