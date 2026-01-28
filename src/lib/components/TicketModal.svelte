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
    class="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
    on:click={close}
    role="presentation"
  ></div>

  <div
    transition:scale={{ start: 0.95, duration: 200 }}
    class="fixed left-1/2 top-1/2 z-[9999] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
  >
    <div class="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-xl font-mono">

      <div class="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>
      <div class="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>
      <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div class="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/[0.02]">
        <div class="flex items-center gap-3">
          <div class="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
          <h3 class="text-xs font-bold uppercase tracking-widest text-white">
            Create Support Ticket
          </h3>
        </div>
        <button on:click={close} class="group text-slate-500 hover:text-white transition-colors" aria-label="Close">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form
        method="POST"
        action="/api/support"
        use:enhance={({ cancel }) => {
          loading = true;
          return async ({ result }) => {
            loading = false;
            if (result.type === 'success') {
              show = false;
              showToast('Ticket submitted successfully', 'success');
            } else {
              showToast('Failed to submit ticket', 'error');
            }
          };
        }}
        class="p-6 space-y-5"
      >
        <input type="hidden" name="project_id" value={$page.data.project?.id} />
        <input type="hidden" name="tenant_slug" value={$page.params.tenant_slug} />
        <input type="hidden" name="context_url" value={$page.url.pathname} />

        <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
                <label for="category" class="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Category</label>
                <div class="relative">
                    <select id="category" name="category" class="w-full appearance-none rounded bg-white/5 border border-white/10 px-3 py-2 text-[11px] uppercase text-emerald-100 focus:border-emerald-500/50 focus:bg-emerald-900/10 focus:outline-none transition-all hover:border-white/20">
                        <option value="INCIDENT" class="bg-slate-900 text-red-400">Incident (Error)</option>
                        <option value="ANOMALY" class="bg-slate-900 text-yellow-400">Anomaly (Data Issue)</option>
                        <option value="REQUEST" class="bg-slate-900 text-blue-400">Service Request</option>
                        <option value="QUESTION" class="bg-slate-900 text-slate-300">Question</option>
                    </select>
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            <div class="space-y-1.5">
                <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Priority</span>
                <div class="flex h-[34px] rounded bg-white/5 border border-white/10 p-1">
                    <label class="flex-1 cursor-pointer">
                        <input type="radio" name="priority" value="normal" checked class="sr-only peer" />
                        <div class="h-full w-full flex items-center justify-center rounded text-[10px] uppercase text-slate-400 transition-all peer-checked:bg-slate-700 peer-checked:text-white">Normal</div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                        <input type="radio" name="priority" value="blocker" class="sr-only peer" />
                        <div class="h-full w-full flex items-center justify-center rounded text-[10px] uppercase text-slate-400 transition-all peer-checked:bg-red-900/50 peer-checked:text-red-400">Blocker</div>
                    </label>
                </div>
            </div>
        </div>

        <div class="space-y-1.5">
           <label for="subject" class="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Subject</label>
           <input
             id="subject"
             name="subject"
             type="text"
             placeholder="Brief summary of the issue"
             required
             class="w-full rounded bg-white/5 border border-white/10 px-4 py-2 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:bg-emerald-900/10 focus:outline-none transition-all hover:border-white/20 font-mono"
            />
        </div>

        <div class="space-y-1.5">
          <label for="message" class="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Details</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Please describe what happened..."
            required
            class="w-full rounded bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:bg-emerald-900/10 focus:outline-none transition-all hover:border-white/20 font-mono resize-none leading-relaxed"
          ></textarea>
        </div>

        <div class="pt-4 flex items-center justify-end border-t border-white/5">
            <button
              type="submit"
              disabled={loading}
              class="rounded bg-emerald-500 px-6 py-2 text-[11px] font-bold uppercase tracking-wider text-black transition-all hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
                {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  textarea::-webkit-scrollbar {
    width: 4px;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #334155;
    border-radius: 2px;
  }
</style>