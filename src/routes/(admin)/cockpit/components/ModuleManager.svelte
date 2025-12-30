<script lang="ts">
  import { enhance } from '$app/forms';

  export let modules = []; // Listahan galing sa DB

  let editingModule: any = null;
  let showModal = false;

  function openNew() {
    editingModule = { name: '', slug: '', description: '' };
    showModal = true;
  }

  function openEdit(mod: any) {
    editingModule = { ...mod };
    showModal = true;
  }
</script>

<div class="h-full rounded-xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl flex flex-col">

  <div class="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
    <div>
      <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">System_Modules</h2>
      <p class="mt-1 text-[10px] text-slate-500">Available Capabilities</p>
    </div>
    <button on:click={openNew} class="rounded bg-slate-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-all hover:bg-emerald-600 hover:text-white">
      + New Module
    </button>
  </div>

  <div class="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
    {#each modules as mod}
      <div class="group flex items-center justify-between rounded border border-white/5 bg-black/20 p-3 transition-all hover:border-emerald-500/30 hover:bg-white/[0.02]">

        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded bg-slate-900 font-mono text-[10px] font-bold text-emerald-500 uppercase">
             {mod.slug.substring(0,2)}
          </div>

          <div>
            <h3 class="font-bold text-slate-200 text-xs uppercase">{mod.name}</h3>
            <p class="font-mono text-[9px] text-slate-500 lowercase">/{mod.slug}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 opacity-50 transition-opacity group-hover:opacity-100">
           <button on:click={() => openEdit(mod)} class="rounded p-1 text-slate-500 hover:text-white">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
           </button>
           <form method="POST" action="?/deleteModule" use:enhance>
              <input type="hidden" name="id" value={mod.id}>
              <button
                class="rounded p-1 text-slate-500 hover:text-red-500"
                on:click={(e) => !confirm('Delete this module? This might break linked projects.') && e.preventDefault()}
              >
                 <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
           </form>
        </div>
      </div>
    {:else}
      <div class="text-center py-8 border border-dashed border-white/10 rounded">
         <p class="text-[10px] text-slate-600">No modules defined.</p>
      </div>
    {/each}
  </div>
</div>

{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="w-full max-w-sm rounded-xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
          <h2 class="mb-4 text-lg font-bold text-emerald-500">{editingModule.id ? 'EDIT MODULE' : 'NEW MODULE'}</h2>

          <form method="POST" action="?/upsertModule" use:enhance on:submit={() => showModal = false} class="space-y-4">
              <input type="hidden" name="id" value={editingModule.id || ''}>

              <div>
                  <label class="mb-1 block text-[10px] uppercase text-slate-500">Name</label>
                  <input name="name" bind:value={editingModule.name} class="w-full rounded border border-white/20 bg-black p-2 text-sm text-white outline-none focus:border-emerald-500" placeholder="e.g. Content Management" required>
              </div>

              <div>
                  <label class="mb-1 block text-[10px] uppercase text-slate-500">Slug</label>
                  <input name="slug" bind:value={editingModule.slug} class="w-full rounded border border-white/20 bg-black p-2 text-sm text-white outline-none focus:border-emerald-500" placeholder="e.g. cms" required>
              </div>

              <div>
                  <label class="mb-1 block text-[10px] uppercase text-slate-500">Description</label>
                  <textarea name="description" bind:value={editingModule.description} class="w-full rounded border border-white/20 bg-black p-2 text-sm text-white outline-none focus:border-emerald-500" rows="2"></textarea>
              </div>

              <div class="flex gap-2 pt-4">
                  <button type="button" on:click={() => showModal = false} class="flex-1 py-2 text-xs text-slate-400 hover:text-white">CANCEL</button>
                  <button type="submit" class="flex-1 rounded bg-emerald-600 py-2 text-xs font-bold text-black hover:bg-emerald-500">SAVE</button>
              </div>
          </form>
      </div>
  </div>
{/if}