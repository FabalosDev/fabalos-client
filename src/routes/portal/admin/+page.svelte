<script lang="ts">
  export let data;
  $: ({ projects, user } = data);

  let selectedClient = 'ALL';

  // Extract unique Client IDs for the dropdown
  $: clientList = [...new Set(projects.map(p => p.client_id))];

  // Filter Logic
  $: visibleProjects = selectedClient === 'ALL'
      ? projects
      : projects.filter(p => p.client_id === selectedClient);
</script>

<div class="min-h-screen bg-[#050505] p-8 font-sans text-slate-200">

  <div class="mb-8 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-white">Mission Control</h1>
      <p class="mt-1 font-mono text-xs text-slate-500">SYSTEM_ORCHESTRATOR // {user.email}</p>
    </div>

    <div class="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-slate-900/50 p-2">
       <div class="flex items-center gap-2 px-2">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span class="text-[10px] font-bold uppercase tracking-widest text-emerald-400">God Mode</span>
       </div>

       <div class="h-4 w-[1px] bg-slate-700"></div>

       <select
         bind:value={selectedClient}
         class="cursor-pointer bg-transparent font-mono text-xs text-white outline-none transition-colors hover:text-emerald-400"
       >
         <option value="ALL">GLOBAL_OVERVIEW ({projects.length})</option>
         {#each clientList as client}
            <option value={client}>CLIENT: {client ? client.slice(0,6) : 'UNKNOWN'}...</option>
         {/each}
       </select>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each visibleProjects as project}
      <a href="/portal/{project.tenant_slug}" class="group relative block rounded-xl border border-white/5 bg-slate-900/40 p-6 transition-all hover:border-emerald-500/30 hover:bg-slate-900/60">

        <div class="relative flex items-start justify-between">
          <div>
            <h3 class="text-lg font-bold text-white transition-colors group-hover:text-emerald-400">
              {project.name}
            </h3>
            <p class="mt-1 font-mono text-xs text-slate-500">
              {project.tenant_slug}
            </p>
          </div>
          <span class="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_currentColor]"></span>
        </div>

        <div class="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
           <div class="text-center">
              <div class="text-[10px] font-bold uppercase text-slate-500">Modules</div>
              <div class="font-mono text-sm text-white">{project.active_modules?.length || 0}</div>
           </div>
           <div class="text-center">
              <div class="text-[10px] font-bold uppercase text-slate-500">Status</div>
              <div class="font-mono text-sm text-emerald-400">ACTIVE</div>
           </div>
        </div>
      </a>
    {:else}
      <div class="col-span-full rounded-xl border border-dashed border-white/10 py-20 text-center">
        <p class="font-mono text-sm text-slate-500">NO_SYSTEMS_DETECTED</p>
      </div>
    {/each}
  </div>
</div>