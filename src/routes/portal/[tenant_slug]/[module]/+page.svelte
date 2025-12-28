<script lang="ts">
  import { page } from '$app/stores';

  // Kunin ang module name mula sa URL (e.g., "crm", "tagging")
  $: moduleName = $page.params.module;
  $: formattedName = moduleName.replace(/_/g, ' ').toUpperCase();
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between border-b border-white/5 pb-6">
    <div>
      <h1 class="text-2xl font-bold text-white tracking-tight">{formattedName} MODULE</h1>
      <p class="text-sm text-slate-400 font-mono mt-1">Status: ACTIVE // Node: {moduleName}_01</p>
    </div>
    <div class="px-3 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono uppercase tracking-widest">
      System Online
    </div>
  </div>

  <div class="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
    <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 mb-4">
      <svg class="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    </div>
    <h3 class="text-lg font-medium text-white">Module Interface Loaded</h3>
    <p class="text-slate-500 text-sm mt-2 max-w-md mx-auto">
      The <strong>{moduleName}</strong> protocol is currently active. Connect this view to your specific n8n workflow or database table.
    </p>
  </div>
</div>