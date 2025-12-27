<script lang="ts">
  export let data;

  // Destructure the admin payload
  $: ({ allProjects, stats, storageStatus } = data);
</script>

<div class="min-h-screen bg-black text-slate-200 p-8 font-mono">
  <header class="border-b border-red-900/50 pb-6 mb-8 flex justify-between items-end">
    <div>
      <h1 class="text-2xl font-bold text-white tracking-tighter">
        <span class="text-red-500">SYSTEM_ADMIN</span> // COMMAND_CENTER
      </h1>
      <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest">
        Authorized Access Only: Frank Abalos
      </p>
    </div>

    <div class="text-right">
      <p class="text-[10px] text-slate-500 uppercase tracking-widest">Storage Uplink</p>
      <div class="flex items-center gap-2 justify-end">
        <span class="w-2 h-2 rounded-full {storageStatus.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}"></span>
        <span class="text-xs font-bold {storageStatus.connected ? 'text-white' : 'text-red-500'}">
          {storageStatus.bucketName}
        </span>
      </div>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="p-4 bg-slate-900 border border-slate-800 rounded">
      <p class="text-[10px] text-slate-500 uppercase font-bold">Total Projects</p>
      <p class="text-xl font-bold text-white">{stats.totalProjects}</p>
    </div>
    <div class="p-4 bg-slate-900 border border-slate-800 rounded">
      <p class="text-[10px] text-slate-500 uppercase font-bold">Healthy Nodes</p>
      <p class="text-xl font-bold text-green-400">{stats.healthySystems}</p>
    </div>
    <div class="p-4 bg-slate-900 border border-slate-800 rounded">
      <p class="text-[10px] text-slate-500 uppercase font-bold">Lane 4: R&D</p>
      <p class="text-xl font-bold text-blue-400">ACTIVE</p>
    </div>
    <div class="p-4 bg-slate-900 border border-slate-800 rounded">
      <p class="text-[10px] text-slate-500 uppercase font-bold">Active Modules</p>
      <p class="text-xl font-bold text-yellow-500">{stats.activeModules}</p>
    </div>
  </div>

  <section class="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mb-12">
    <h2 class="text-lg font-bold text-white mb-4 italic">Project Provisioning</h2>
    <div class="space-y-4">
      <p class="text-sm text-slate-400">
        Create new project UUIDs and link Client Emails to Tenant Slugs for Fabalos Automation.
      </p>
      <button class="bg-white text-black px-6 py-2 text-xs font-bold uppercase hover:bg-slate-300 transition-colors">
        Provision New Client
      </button>
    </div>
  </section>

  <section class="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-800 bg-slate-800/50">
      <h3 class="text-sm font-bold text-white uppercase tracking-widest">Active Infrastructure List</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-950 text-slate-500 uppercase">
          <tr>
            <th class="px-6 py-3">Tenant Slug</th>
            <th class="px-6 py-3">Authorized Entity</th>
            <th class="px-6 py-3">Email Contact</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          {#each allProjects as project}
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 font-bold text-blue-400">{project.tenant_slug}</td>
              <td class="px-6 py-4 text-slate-300">
                {project.authorized_clients?.display_name || 'ORPHAN_PROJECT'}
              </td>
              <td class="px-6 py-4 text-slate-500">
                {project.authorized_clients?.email || 'N/A'}
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 uppercase font-bold">
                  {project.storage_health}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                 <button class="text-slate-500 hover:text-white transition-colors font-bold uppercase">Manage</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>