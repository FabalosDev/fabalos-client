<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';

  export let tickets = [];

  // State para sa Modal
  let selectedTicket = null;

  function openTicket(ticket) {
    selectedTicket = ticket;
  }

  function closeTicket() {
    selectedTicket = null;
  }
</script>

<section class="rounded border border-red-900/30 bg-red-950/10 p-6 h-full flex flex-col">
  <div class="mb-6 flex items-center justify-between border-b border-red-900/30 pb-4">
    <h2 class="text-xs font-bold text-red-500 uppercase tracking-[0.2em]">>> Anomaly_Signal_Monitor</h2>
    <span class="animate-pulse text-[9px] font-bold text-red-400 uppercase">Live Signals: {tickets.length}</span>
  </div>

  <div class="overflow-y-auto pr-2 flex-1">
    <table class="w-full text-left text-[11px] font-mono text-slate-400">
      <thead class="uppercase text-slate-600 border-b border-red-900/20 sticky top-0 bg-[#0f0505] z-10">
        <tr>
          <th class="py-2">Tenant</th>
          <th class="py-2">Subject</th>
          <th class="py-2">Severity</th>
          <th class="py-2 text-right">Protocol</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-red-900/20">
        {#each tickets as ticket}
          <tr class="hover:bg-red-900/10 transition-colors group cursor-pointer" on:click={() => openTicket(ticket)}>
            <td class="py-3 font-bold text-white uppercase group-hover:text-red-400">{ticket.tenant_slug}</td>
            <td class="py-3 opacity-70 truncate max-w-[150px]">{ticket.subject}</td>
            <td class="py-3">
              <span class="rounded px-1.5 py-0.5 text-[9px] font-black uppercase {ticket.severity === 'HIGH' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}">
                {ticket.severity}
              </span>
            </td>
            <td class="py-3 text-right">
              <button class="text-[9px] font-bold text-blue-500 hover:text-white uppercase border border-blue-500/30 px-2 py-0.5 hover:bg-blue-600 transition-all">
                VIEW
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if selectedTicket}
    <div transition:fade class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <div transition:fly={{ y: 20 }} class="w-full max-w-lg overflow-hidden rounded-lg border border-red-900 bg-[#0a0505] shadow-2xl shadow-red-900/20">

        <div class="flex items-center justify-between border-b border-red-900/50 bg-red-950/20 px-6 py-4">
          <div>
            <span class="block text-[9px] font-bold text-red-500 uppercase tracking-widest">Signal_Source</span>
            <span class="text-lg font-black text-white uppercase">{selectedTicket.tenant_slug}</span>
          </div>
          <button on:click={closeTicket} class="text-slate-500 hover:text-white">✖</button>
        </div>

        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="block text-[9px] text-slate-500 uppercase">Subject Line</span>
              <p class="text-sm font-bold text-white">{selectedTicket.subject}</p>
            </div>
            <div class="text-right">
              <span class="block text-[9px] text-slate-500 uppercase">Severity Level</span>
              <span class="inline-block mt-1 px-2 py-0.5 text-[10px] font-black uppercase {selectedTicket.severity === 'HIGH' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}">
                {selectedTicket.severity}
              </span>
            </div>
          </div>

          <div class="bg-white/5 p-4 rounded border border-white/10">
            <span class="block text-[9px] text-slate-500 uppercase mb-2">Message Payload</span>
            <p class="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
              {selectedTicket.message || selectedTicket.description || 'NO_TEXT_DATA_PROVIDED'}
            </p>
          </div>

          <form
            method="POST"
            action="?/resolveTicket"
            use:enhance={() => {
              return async ({ update }) => {
                await update();
                closeTicket(); // Close modal on success
              };
            }}
            class="space-y-4 pt-4 border-t border-red-900/30"
          >
            <input type="hidden" name="id" value={selectedTicket.id} />

            <div class="space-y-2">
              <label for="admin_notes" class="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Technical Support Notes (Admin Only)</label>
              <textarea
                name="admin_notes"
                rows="3"
                placeholder="Log resolution details here..."
                class="w-full bg-black border border-slate-800 p-3 text-xs text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
              ></textarea>
            </div>

            <button type="submit" class="w-full bg-red-600 py-3 text-xs font-black tracking-widest text-white uppercase hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              Terminate_Signal (Resolve)
            </button>
          </form>
        </div>

      </div>
    </div>
  {/if}
</section>