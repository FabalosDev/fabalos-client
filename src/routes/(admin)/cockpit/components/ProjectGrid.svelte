<script lang="ts">
  import { enhance } from '$app/forms';

  export let projects = [];
  export let clients = [];
  export let modules = [];

  let editingProject: any = null;
  let showModal = false;

  function openNew() {
    editingProject = { name: '', tenant_slug: '', client_id: '', storage_health: 'active' };
    showModal = true;
  }

  function openEdit(proj: any) {
    editingProject = { ...proj };
    showModal = true;
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center mb-6 px-2 border-l-2 border-emerald-500">
    <div>
        <h2 class="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">System_Registry</h2>
        <span class="text-[10px] text-emerald-500 uppercase animate-pulse">● {projects.length} Nodes Active</span>
    </div>
    <button on:click={openNew} class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase tracking-widest rounded transition-all">
      + New Node
    </button>
  </div>

  <div class="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
    <table class="w-full text-left text-[10px] font-mono text-slate-400">

      <thead class="bg-black text-xs uppercase tracking-widest text-slate-500">
        <tr>
          <th class="px-6 py-4 font-bold border-b border-white/10 w-24">Status</th>
          <th class="px-6 py-4 font-bold border-b border-white/10">Project Identity</th>
          <th class="px-6 py-4 font-bold border-b border-white/10">Client Uplink</th>
          <th class="px-6 py-4 font-bold border-b border-white/10">Modules</th>
          <th class="px-6 py-4 font-bold border-b border-white/10">Contracts</th>
          <th class="px-6 py-4 font-bold border-b border-white/10 text-right">Actions</th>
        </tr>
      </thead>

<tbody class="divide-y divide-white/5">
        {#each projects as project}
          <tr class="group hover:bg-white/[0.02] transition-colors">

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full {project.storage_health === 'offline' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}"></div>
                <span class="uppercase font-bold {project.storage_health === 'offline' ? 'text-red-500' : 'text-emerald-500'}">
                    {project.storage_health || 'OK'}
                </span>
              </div>
            </td>

            <td class="px-6 py-4">
               <div class="flex flex-col">
                  <span class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors uppercase">{project.name}</span>
                  <a href="/portal/{project.tenant_slug}" target="_blank" class="text-[9px] text-slate-600 hover:text-emerald-500 hover:underline">
                    /portal/{project.tenant_slug}
                  </a>
               </div>
            </td>

            <td class="px-6 py-4">
                {#if project.authorized_clients}
                    <div class="inline-flex items-center gap-2 px-2 py-1 bg-slate-900 border border-slate-800 rounded">
                        <svg class="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span class="font-bold text-slate-300 uppercase">{project.authorized_clients.display_name}</span>
                    </div>
                {:else}
                    <span class="text-slate-600 italic">-- UNASSIGNED --</span>
                {/if}
            </td>

            <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                    {#each modules as mod}
                        {@const isActive = project.active_module_ids?.includes(mod.id)}
                        <form method="POST" action="?/toggleModule" use:enhance>
                            <input type="hidden" name="project_id" value={project.id}>
                            <input type="hidden" name="module_id" value={mod.id}>
                            <input type="hidden" name="action" value={isActive ? 'remove' : 'add'}>
                            <button class="px-2 py-0.5 text-[9px] border rounded transition-all cursor-pointer {isActive ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-red-900/50 hover:text-red-400' : 'bg-transparent border-slate-800 text-slate-600 hover:border-slate-600 hover:text-slate-400'}" title={isActive ? 'Disable Module' : 'Enable Module'}>
                                {mod.name}
                            </button>
                        </form>
                    {/each}
                </div>
            </td>

            <td class="px-6 py-4">
                <a
                  href="/cockpit/project/{project.id}"
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Manage
                </a>
            </td>

            <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button on:click={() => openEdit(project)} class="text-slate-400 hover:text-white transition-colors" title="Edit Details">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>

                    <form method="POST" action="?/deleteProject" use:enhance>
                        <input type="hidden" name="id" value={project.id}>
                        <button
                            class="text-slate-400 hover:text-red-500 transition-colors pt-1"
                            on:click={(e) => !confirm('Decommission this system?') && e.preventDefault()}
                            title="Delete Node"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </form>
                </div>
            </td>

          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-xl p-6 shadow-2xl">
          <h2 class="text-lg font-bold mb-4 text-emerald-500">{editingProject.id ? 'EDIT SYSTEM' : 'NEW SYSTEM'}</h2>

          <form method="POST" action="?/upsertProject" use:enhance on:submit={() => showModal = false} class="space-y-4">
              <input type="hidden" name="id" value={editingProject.id || ''}>

              <div>
                  <label class="block text-[10px] uppercase text-slate-500 mb-1">Project Name</label>
                  <input name="name" bind:value={editingProject.name} class="w-full bg-black border border-white/20 p-2 text-sm focus:border-emerald-500 outline-none rounded text-white" required>
              </div>

              <div>
                  <label class="block text-[10px] uppercase text-slate-500 mb-1">Tenant Slug (URL)</label>
                  <input name="tenant_slug" bind:value={editingProject.tenant_slug} class="w-full bg-black border border-white/20 p-2 text-sm focus:border-emerald-500 outline-none rounded text-white" required>
              </div>

              <div>
                  <label class="block text-[10px] uppercase text-slate-500 mb-1">Assigned Client</label>
                  <select name="client_id" bind:value={editingProject.client_id} class="w-full bg-black border border-white/20 p-2 text-sm focus:border-emerald-500 outline-none rounded text-white">
                      <option value="">-- UNASSIGNED --</option>
                      {#each clients as client}
                          <option value={client.id}>{client.display_name} ({client.email})</option>
                      {/each}
                  </select>
              </div>

              <div>
                  <label class="block text-[10px] uppercase text-slate-500 mb-1">Status</label>
                  <select name="status" bind:value={editingProject.storage_health} class="w-full bg-black border border-white/20 p-2 text-sm focus:border-emerald-500 outline-none rounded text-white">
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="offline">Offline</option>
                  </select>
              </div>

              <div class="flex gap-2 pt-4">
                  <button type="button" on:click={() => showModal = false} class="flex-1 py-2 text-xs text-slate-400 hover:text-white">CANCEL</button>
                  <button type="submit" class="flex-1 py-2 bg-emerald-600 text-black font-bold text-xs rounded hover:bg-emerald-500">SAVE RECORD</button>
              </div>
          </form>
      </div>
  </div>
{/if}