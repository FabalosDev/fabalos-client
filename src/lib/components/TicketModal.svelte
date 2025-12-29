<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { enhance } from '$app/forms';
  import { showToast } from '$lib/stores/toast';
  import { page } from '$app/stores';

  export let show = false;
  let loading = false;

  function close() {
    show = false;
  }
</script>

{#if show}
  <div
    transition:fade
    class="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md"
    on:click={close}
    role="presentation"
  ></div>

  <div
    transition:scale={{ start: 0.95 }}
    class="fixed left-1/2 top-1/2 z-[10001] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
  >
    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl font-mono">
      <div class="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/[0.02]">
        <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          <span class="opacity-50">SYS//</span>OPEN_SUPPORT_TICKET
        </h3>
        <button on:click={close} class="text-slate-500 hover:text-white transition-colors" aria-label="Close">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <form
        method="POST"
        action="/api/support"
        use:enhance={({ formData, cancel }) => {
          cancel();
          loading = true;

          fetch('/api/support', {
            method: 'POST',
            body: formData
          })
          .then(async (res) => {
            const result = await res.json();
            if (result.success) {
              show = false;
              showToast('Support Ticket Transmitted', 'success');
            } else {
              showToast(result.error || 'Uplink Error', 'error');
            }
          })
          .catch(() => showToast('Network Failure', 'error'))
          .finally(() => loading = false);
        }}
        class="p-6 space-y-6"
      >
        <input type="hidden" name="project_id" value={$page.data.project?.id} />
        <input type="hidden" name="tenant_slug" value={$page.params.tenant_slug} />

        <div class="space-y-3">
          <span class="block text-[9px] font-bold uppercase tracking-widest text-slate-500 italic">>> Select_Severity</span>
          <div class="flex gap-6">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="priority" value="normal" checked class="sr-only peer" />
              <div class="h-3 w-3 rounded-full border border-slate-700 peer-checked:bg-emerald-500 peer-checked:border-emerald-500"></div>
              <span class="text-[10px] uppercase text-slate-400 peer-checked:text-white">Normal</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="priority" value="high" class="sr-only peer" />
              <div class="h-3 w-3 rounded-full border border-slate-700 peer-checked:bg-red-500 peer-checked:border-red-500"></div>
              <span class="text-[10px] uppercase text-slate-400 peer-checked:text-red-400">High_Priority</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
           <label for="subject" class="block text-[9px] font-bold uppercase tracking-widest text-slate-500 italic">>> Subject_Header</label>
           <input
             id="subject" name="subject" type="text" placeholder="ANOMALY_TYPE" required
             class="w-full bg-black border border-white/10 px-4 py-3 text-[11px] text-white focus:border-emerald-500/50 focus:outline-none transition-all placeholder:text-slate-800 uppercase"
           />
        </div>

        <div class="space-y-2">
          <label for="message" class="block text-[9px] font-bold uppercase tracking-widest text-slate-500 italic">>> Data_Log_Description</label>
          <textarea
            id="message" name="message" rows="4" placeholder="ENTER_SYSTEM_ERRORS..." required
            class="w-full bg-black border border-white/10 px-4 py-3 text-[11px] text-white focus:border-emerald-500/50 focus:outline-none transition-all placeholder:text-slate-800 uppercase resize-none"
          ></textarea>
        </div>

        <div class="pt-4 flex justify-end border-t border-white/5">
          <button
            type="submit"
            disabled={loading}
            class="px-8 py-2 border border-emerald-500/50 text-emerald-400 uppercase text-[10px] hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-30"
          >
            {loading ? 'TRANSMITTING...' : 'EXECUTE_UPLINK'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}