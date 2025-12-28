<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { enhance } from '$app/forms';
  import { showToast } from '$lib/stores/toast'; // Siguraduhin na nagawa mo na ang file sa step 1

  export let show = false;
  export let form: any;

  let loading = false;

  $: if (form?.success && show) {
      show = false;
      showToast('Support Ticket Transmitted', 'success');
  }

  function close() {
      show = false;
  }
</script>

{#if show}
  <div transition:fade class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div transition:scale={{ start: 0.95 }} class="w-full max-w-lg rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl">

        <div class="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h3 class="text-xs font-bold uppercase tracking-widest text-text-main">Open Support Ticket</h3>
          <button
            on:click={close}
            class="text-text-soft hover:text-error transition-colors"
            aria-label="Close modal"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form
          method="POST"
          action="?/createTicket"
          use:enhance={() => {
            loading = true;
            return async ({ update }) => {
              await update();
              loading = false;
            };
          }}
          class="p-6 space-y-5"
        >
           <div class="space-y-2">
            <span class="block text-[10px] font-bold uppercase tracking-wide text-text-soft">Priority Level</span>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="priority" value="normal" checked class="text-primary focus:ring-primary bg-surface border-white/10" />
                <span class="text-xs text-text-main group-hover:text-white transition-colors">Normal</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="priority" value="high" class="text-error focus:ring-error bg-surface border-white/10" />
                <span class="text-xs text-text-main group-hover:text-error transition-colors">High Priority</span>
              </label>
            </div>
          </div>

          <div class="space-y-1">
             <label for="subject" class="text-[10px] font-bold uppercase tracking-wide text-text-soft">Subject</label>
             <input id="subject" name="subject" type="text" placeholder="e.g. Login Error" required class="w-full rounded border border-white/10 bg-surface px-4 py-2.5 text-sm text-text-main focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder-white/20 transition-all"/>
          </div>

          <div class="space-y-1">
            <label for="message" class="text-[10px] font-bold uppercase tracking-wide text-text-soft">Description</label>
            <textarea id="message" name="message" rows="4" placeholder="Describe the issue..." required class="w-full rounded border border-white/10 bg-surface px-4 py-2.5 text-sm text-text-main focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder-white/20 transition-all"></textarea>
          </div>

          <div class="pt-2 flex items-center justify-end gap-3">
             <button type="button" on:click={close} class="px-4 py-2 text-xs font-bold uppercase text-text-soft hover:text-white transition-colors">Cancel</button>
             <button type="submit" disabled={loading} class="rounded bg-primary px-6 py-2 text-xs font-bold uppercase text-black transition-all active:scale-95 disabled:opacity-50 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)]">
               {loading ? 'Transmitting...' : 'Submit Ticket'}
             </button>
          </div>
        </form>
      </div>
    </div>
{/if}