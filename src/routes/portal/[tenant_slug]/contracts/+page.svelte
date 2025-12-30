<script lang="ts">
  import Starfield from '$lib/components/Starfield.svelte';
  import { fade, scale } from 'svelte/transition'; // Animations
  import { enhance } from '$app/forms';

  export let data;

  // Variables
  let { approvals, project, user } = data;
  $: approvals = data.approvals;

  let selectedContract: any = null; // Ito ang magbubukas ng Modal
  let signing = false;

  // --- OPTIMISTIC UI HANDLER (Instant Green) ---
  const submitApprove = () => {
    signing = true;
    return async ({ result, update, formData }) => {
      if (result.type === 'success') {
        const id = formData.get('approval_id');

        // 1. Update List Manually
        approvals = approvals.map(item =>
          item.id === id
          ? { ...item, status: 'approved', approved_at: new Date().toISOString(), approved_by: user.id }
          : item
        );

        // 2. Close Modal after short delay
        setTimeout(() => {
            selectedContract = null;
            signing = false;
        }, 500);
      }
      await update();
    };
  };
</script>

<div class="relative min-h-screen bg-[#020617] text-slate-300 font-mono">
  <Starfield />

  <div class="relative z-10 p-8 md:p-12 space-y-10 max-w-5xl mx-auto">

    <header>
      <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">
        <span class="h-px w-8 bg-emerald-500"></span>
        Legal & Compliance
      </div>
      <h1 class="text-4xl font-bold text-white tracking-tighter uppercase">Approvals_Ledger</h1>
      <p class="text-xs text-slate-500 mt-1 uppercase tracking-tighter">
        Review pending items for: <span class="text-emerald-500/80">{project.tenant_slug}</span>
      </p>
    </header>

    <main class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each approvals as item}
        <button
            on:click={() => selectedContract = item}
            class="group relative text-left flex flex-col justify-between h-full p-6 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-2xl
            {item.status === 'approved'
                ? 'border-emerald-500/20 bg-emerald-900/5 hover:border-emerald-500/40'
                : 'border-white/10 bg-white/[0.02] hover:border-yellow-500/40 hover:bg-white/[0.04]'}"
        >
            <div>
                <div class="flex items-center justify-between mb-4">
                    {#if item.status === 'approved'}
                        <span class="px-2 py-1 rounded text-[9px] font-bold bg-emerald-500 text-black uppercase tracking-widest">SIGNED</span>
                    {:else}
                        <span class="px-2 py-1 rounded text-[9px] font-bold bg-yellow-500 text-black uppercase tracking-widest animate-pulse">ACTION REQUIRED</span>
                    {/if}
                    <svg class="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>

                <h3 class="text-lg font-bold text-white leading-tight mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                <p class="text-xs text-slate-400 line-clamp-2">{item.description}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-white/5 w-full flex justify-between items-center">
                 <span class="text-[9px] text-slate-600 uppercase">ID: {item.id.slice(0,8)}</span>
                 <span class="text-[10px] text-emerald-500 group-hover:underline">Review Details &rarr;</span>
            </div>
        </button>
      {:else}
        <div class="col-span-full border border-dashed border-white/10 rounded-xl p-12 text-center">
           <p class="text-xs text-slate-600 uppercase tracking-widest">No_Pending_Approvals</p>
        </div>
      {/each}
    </main>

  </div>

  {#if selectedContract}
    <div transition:fade={{ duration: 200 }} class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" on:click={() => selectedContract = null}>

        <div transition:scale={{ start: 0.95, duration: 200 }} class="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-2xl relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" on:click|stopPropagation>

            <div class="p-6 border-b border-white/10 flex justify-between items-start bg-white/[0.02]">
                <div>
                    <h2 class="text-xl font-bold text-white uppercase tracking-tight">{selectedContract.title}</h2>
                    <p class="text-[10px] text-slate-500 mt-1 font-mono uppercase">Document Ref: {selectedContract.id}</p>
                </div>
                <button on:click={() => selectedContract = null} class="text-slate-500 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div class="p-8 overflow-y-auto custom-scrollbar">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Scope & Agreement</h3>
                <div class="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-6 rounded-lg border border-white/5 font-sans">
                    {selectedContract.description}
                </div>

                {#if selectedContract.file_link}
                    <div class="mt-6">
                        <a href={selectedContract.file_link} target="_blank" class="flex items-center gap-3 p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg hover:bg-blue-500/10 transition-colors group/link">
                             <div class="bg-blue-500 text-black p-2 rounded">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                             </div>
                             <div>
                                 <div class="text-sm font-bold text-blue-400 group-hover/link:underline">View Attached Document</div>
                                 <div class="text-[10px] text-slate-500">External PDF / Resource</div>
                             </div>
                             <div class="ml-auto text-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity">&rarr;</div>
                        </a>
                    </div>
                {/if}
            </div>

            <div class="p-6 border-t border-white/10 bg-white/[0.02]">
                {#if selectedContract.status === 'approved'}
                    <div class="flex items-center justify-between p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                        <div class="flex items-center gap-3">
                             <div class="bg-emerald-500 text-black p-1.5 rounded-full">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                             </div>
                             <div>
                                 <div class="text-sm font-bold text-emerald-400 uppercase tracking-wider">Digitally Signed</div>
                                 <div class="text-[10px] text-emerald-500/60 font-mono">{new Date(selectedContract.approved_at).toLocaleString()}</div>
                             </div>
                        </div>
                    </div>
                {:else}
                    <form method="POST" action="?/approve" use:enhance={submitApprove}>
                        <input type="hidden" name="approval_id" value={selectedContract.id} />

                        <label class="flex items-start gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all cursor-pointer group/check">
                             <div class="relative flex items-center mt-1">
                                <input type="checkbox" required class="peer h-6 w-6 cursor-pointer appearance-none rounded border border-slate-500 bg-transparent checked:border-emerald-500 checked:bg-emerald-500 transition-all" />
                                <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                             </div>
                             <div class="flex-1">
                                 <p class="text-sm text-slate-300 font-bold group-hover/check:text-white transition-colors">I acknowledge and agree to the terms stated above.</p>
                                 <p class="text-[10px] text-slate-500 mt-1">By clicking confirm, you are attaching your digital signature to this record.</p>
                             </div>
                        </label>

                        <button disabled={signing} class="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-4 rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {signing ? 'Verifying Signature...' : 'Confirm & Sign Document'}
                        </button>
                    </form>
                {/if}
            </div>

        </div>
    </div>
  {/if}
</div>

