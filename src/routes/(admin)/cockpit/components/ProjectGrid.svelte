<script lang="ts">
  export let projects = [];

  // Walang filter, lahat ipapakita
  $: activeProjects = projects || [];

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
</script>

<section>
  <div class="mb-6 flex items-center justify-between border-l-2 border-green-500 px-2 pl-4">
    <h2 class="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">Live_Operations_Monitor</h2>
    <span class="text-[10px] text-green-500 uppercase animate-pulse">● {activeProjects.length} Systems Online</span>
  </div>

  {#if activeProjects.length > 0}
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each activeProjects as project}
        <div class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all hover:-translate-y-1 hover:border-green-500/50 shadow-xl">

          <div class="absolute top-0 left-0 h-full w-1 {project.storage_health === 'offline' ? 'bg-red-500' : 'bg-green-500'}"></div>

          <div class="p-6 pl-8">
            <h3 class="text-xl font-bold text-white group-hover:text-green-400 uppercase">{project.tenant_slug}</h3>
            <p class="text-[9px] tracking-widest text-slate-500 uppercase">UUID: {project.id.slice(0, 8)}...</p>

            <div class="mt-6 border-t border-slate-800 pt-4 text-[10px] space-y-2">
              <div class="flex justify-between">
                <span class="text-slate-500 uppercase">Status</span>
                <span class="text-slate-300 font-mono uppercase">{project.storage_health || 'ONLINE'}</span>
              </div>
              <div class="flex justify-between"><span class="text-slate-500 uppercase">Last Sync</span><span class="text-slate-300">{formatDate(project.created_at)}</span></div>
            </div>

            <a href="/portal/{project.tenant_slug}" class="mt-6 block w-full text-center rounded bg-slate-800 py-2 text-[10px] font-bold text-slate-400 hover:bg-green-600 hover:text-white uppercase transition-colors">
              Enter System →
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="p-8 text-center border border-dashed border-slate-800 rounded bg-slate-900/50">
      <p class="text-xs text-slate-500 uppercase tracking-widest">No Systems Detected</p>
    </div>
  {/if}
</section>