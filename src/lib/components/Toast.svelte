<script lang="ts">
  import { toast } from '$lib/stores/toast';
  import { fade, fly } from 'svelte/transition';
</script>

{#if $toast.show}
  <div
    in:fly={{ y: 20, duration: 300 }}
    out:fade
    class="fixed bottom-6 right-6 z-[10000] flex items-center gap-3 rounded-lg border border-white/10 bg-[#0a0a0a] px-5 py-4 shadow-2xl backdrop-blur-md"
  >
    <div class="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]
      {$toast.type === 'error' ? 'bg-error text-error' : 'bg-primary text-primary'}">
    </div>

    <span class="text-xs font-bold uppercase tracking-wide text-text-main">
      {$toast.message}
    </span>
  </div>
{/if}