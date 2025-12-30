<script lang="ts">
  import { enhance } from '$app/forms';
  import { fly, fade } from 'svelte/transition';
  import Footer2 from '$lib/components/Footer2.svelte';

  export let data;
  // Sinama na natin ang storageStatus sa destructuring
  $: ({ project, approvals, storageStatus } = data);

  let showModal = false;
  let creating = false;
</script>

<div class="min-h-screen bg-[#050505] p-6 font-mono text-slate-200 md:p-12 selection:bg-emerald-500/30">

  <header class="mb-12 flex items-end justify-between border-b border-slate-900 pb-6">
    <div>
      <h1 class="text-4xl font-black tracking-tighter text-white uppercase">
        <span class="text-red-600">SYS_ADMIN</span> // COCKPIT
      </h1>
      <p class="mt-2 text-[10px] tracking-[0.3em] text-slate-500 uppercase">
        <span class="text-emerald-500">●</span> Secure_Uplink_Established
      </p>
    </div>
    <div class="text-right">
      <p class="text-[9px] uppercase tracking-widest text-slate-600">Storage_Bucket</p>
      <p class="text-xs font-bold text-blue-500 uppercase">{storageStatus?.bucketName || 'OFFLINE'}</p>
    </div>
  </header>

  <div class="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-6 gap-6">
    <div>
      <a href="/cockpit" class="text-xs text-emerald-500 hover:text-white mb-2 block transition-colors">&larr; BACK TO COCKPIT</a>
      <h1 class="text-3xl font-bold text-white uppercase tracking-tighter">
        Manage: <span class="text-emerald-500">{project.name}</span>
      </h1>
      <p class="text-xs text-slate-500 mt-1">Target Node: {project.tenant_slug}</p>
    </div>

    <div class="flex items-center gap-4">

        <div class="text-right hidden md:block border-r border-white/10 pr-4">
            <div class="text-[10px] uppercase tracking-widest text-slate-500">Assigned Client</div>
            <div class="text-white font-bold">{project.authorized_clients?.client_name || 'Unassigned'}</div>
        </div>

        <a
            href="/portal/{project.tenant_slug}/contracts"
            target="_blank"
            class="group flex items-center gap-2 px-4 py-3 rounded text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white border border-transparent hover:border-white/20 transition-all"
            title="Open Client View in New Tab"
        >
            <span>View Portal</span>
            <svg class="w-3 h-3 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>

        <button
            on:click={() => showModal = true}
            class="bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-3 px-6 rounded text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2"
        >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            Dispatch Contract
        </button>
    </div>
  </div>

  <div class="max-w-5xl mx-auto min-h-[400px]">
     <div class="flex items-center justify-between mb-6">
        <h2 class="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Active Ledger
        </h2>
        <div class="text-[10px] text-slate-600 font-mono">TOTAL RECORDS: {approvals.length}</div>
     </div>

     <div class="grid grid-cols-1 gap-4">
       {#each approvals as item}
          <div class="flex flex-col md:flex-row items-start justify-between bg-white/[0.02] border border-white/10 p-6 rounded-xl group hover:border-white/20 transition-all">
             <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                   <h3 class="font-bold text-white text-lg tracking-tight">{item.title}</h3>
                   {#if item.status === 'approved'}
                      <span class="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">SIGNED</span>
                   {:else}
                      <span class="text-[9px] bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">PENDING SIGNATURE</span>
                   {/if}
                </div>
                <p class="text-sm text-slate-400 leading-relaxed max-w-2xl">{item.description}</p>

                <div class="flex items-center gap-4 mt-4">
                    <p class="text-[9px] text-slate-600 font-mono">ID: {item.id}</p>
                    {#if item.approved_at}
                        <p class="text-[9px] text-emerald-500/80 font-mono">
                            Signed: {new Date(item.approved_at).toLocaleString()}
                        </p>
                    {/if}
                </div>
             </div>

             <form method="POST" action="?/deleteProposal" use:enhance class="mt-4 md:mt-0 ml-4">
                <input type="hidden" name="id" value={item.id} />
                <button class="text-slate-600 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg" title="Revoke Contract">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
             </form>
          </div>
       {:else}
          <div class="text-center p-20 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
             <p class="text-slate-600 text-xs font-mono uppercase tracking-widest">No contracts deployed for this unit.</p>
             <button on:click={() => showModal = true} class="text-emerald-500 text-xs mt-2 hover:underline">Create First Contract</button>
          </div>
       {/each}
     </div>
  </div>

  {#if showModal}
    <div transition:fade={{ duration: 200 }} class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" on:click={() => showModal = false}>

       <div transition:fly={{ y: 20, duration: 300 }} class="bg-[#0f0f0f] border border-white/10 rounded-xl p-8 w-full max-w-lg relative shadow-2xl border-t-emerald-500/50" on:click|stopPropagation>

          <button on:click={() => showModal = false} class="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <h2 class="text-lg font-bold text-white uppercase tracking-widest mb-1 flex items-center gap-2">
             <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></span> Dispatch Contract
          </h2>
          <p class="text-xs text-slate-500 mb-6 font-mono">Create a new agreement for {project.tenant_slug}</p>

          <form method="POST" action="?/createProposal" use:enhance={() => {
              creating = true;
              return async ({ update, result }) => {
                  await update();
                  creating = false;
                  if (result.type === 'success') {
                      showModal = false;
                  }
              };
          }} class="space-y-5">

             <div>
               <label class="text-[10px] uppercase text-slate-500 block mb-1 font-bold tracking-wider">Document Title</label>
               <input name="title" type="text" placeholder="e.g. Automation Retainer Q1" required autofocus
                  class="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700" />
             </div>

             <div>
               <label class="text-[10px] uppercase text-slate-500 block mb-1 font-bold tracking-wider">Scope / Terms</label>
               <textarea name="description" rows="5" placeholder="Define the custom deliverables here..." required
                  class="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700"></textarea>
             </div>

             <div>
               <label class="text-[10px] uppercase text-slate-500 block mb-1 font-bold tracking-wider">Reference Link (Optional)</label>
               <input name="file_link" type="text" placeholder="https://..."
                  class="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700" />
             </div>

             <div class="pt-2">
                <button disabled={creating} class="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-3.5 rounded-lg text-xs uppercase tracking-widest transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    {creating ? 'Encrypting & Dispatching...' : 'Deploy to Secure Portal'}
                </button>
             </div>
          </form>

       </div>
    </div>
  {/if}

  <div class="mt-24 border-t border-slate-900 pt-8">
    <Footer2 />
  </div>
</div>