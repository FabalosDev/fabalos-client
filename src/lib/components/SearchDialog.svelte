<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let open = false;

  // THE INDEX: This is the "Brain" of the search. It only knows your site.
  const items = [
    { title: 'Fabalos Automation Handbook', href: '/docs', category: 'Handbook' },
    { title: 'Architecture & Stack', href: '/docs/architecture', category: 'Handbook' },
    { title: 'Design Philosophy', href: '/docs/design-philosophy', category: 'Handbook' },
    { title: 'Project Lifecycle', href: '/docs/lifecycle', category: 'Handbook' },
    { title: 'Standard Operations', href: '/docs/operations', category: 'Handbook' },
    { title: 'Protection Layer', href: '/legal', category: 'Protection' },
    { title: 'Terms of Service', href: '/legal/tos', category: 'Protection' },
    { title: 'Privacy Policy', href: '/legal/privacy', category: 'Protection' },
    { title: 'Terms & Conditions', href: '/legal/terms', category: 'Protection' },
    { title: 'Knowledge Assets', href: '/knowledge', category: 'Operations' },
    { title: 'Credential Ownership', href: '/knowledge/credentials', category: 'Operations' },
    { title: 'Environments', href: '/knowledge/environments', category: 'Operations' },
    { title: 'Schemas & Diagrams', href: '/knowledge/schemas', category: 'Operations' },
    { title: 'Frequently Asked Questions', href: '/faq', category: 'FAQ' },
  ];

  let query = '';
  let filteredItems = items;
  let searchInput: HTMLInputElement;

  // Filter the list instantly as you type
  $: filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Close on Escape key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }

  // Focus input when opened
  $: if (open && searchInput) setTimeout(() => searchInput.focus(), 10);

  function select(href: string) {
    open = false;
    goto(href);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
    on:click={() => open = false}
  ></div>

  <div class="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 p-4">
    <div class="overflow-hidden rounded-xl border border-slate-800 bg-[#0A0A0A] shadow-2xl shadow-emerald-900/20">

      <div class="border-b border-slate-800 px-4 py-3 flex items-center gap-3">
        <svg class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          bind:this={searchInput}
          bind:value={query}
          type="text"
          placeholder="Search documentation..."
          class="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm h-6"
        />
        <span class="text-xs text-slate-600 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">ESC</span>
      </div>

      <div class="max-h-[300px] overflow-y-auto p-2">
        {#if filteredItems.length === 0}
          <div class="py-8 text-center text-sm text-slate-500">
            No results found for "{query}"
          </div>
        {:else}
          {#each filteredItems as item}
            <button
              on:click={() => select(item.href)}
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 group transition-colors text-left"
            >
              <div class="h-2 w-2 rounded-full bg-slate-700 group-hover:bg-emerald-500 transition-colors"></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-slate-200 group-hover:text-white">
                  {item.title}
                </div>
                <div class="text-[10px] text-slate-500 uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
              <svg class="h-4 w-4 text-slate-600 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          {/each}
        {/if}
      </div>

    </div>
  </div>
{/if}