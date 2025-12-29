<script lang="ts">
  import { goto } from '$app/navigation';
  import Fuse from 'fuse.js';

  export let open = false;

const items = [
  {
    title: 'Fabalos Automation Handbook',
    href: '/docs',
    category: 'Handbook',
    keywords:
      'introduction overview handbook automation guide walkthrough getting started onboarding fundamentals principles reference manual system blueprint'
  },
  {
    title: 'Architecture & Stack',
    href: '/docs/architecture',
    category: 'Handbook',
    keywords:
      'architecture system design tech stack sveltekit supabase cloudflare backend frontend infrastructure services deployment environments integration modularity scalability'
  },
  {
    title: 'Design Philosophy',
    href: '/docs/design-philosophy',
    category: 'Handbook',
    keywords:
      'design philosophy principles ui ux user experience aesthetics minimalism consistency branding visual system decision making logic framework patterns intent'
  },
  {
    title: 'Project Lifecycle',
    href: '/docs/lifecycle',
    category: 'Handbook',
    keywords:
      'project lifecycle phases stages planning build development testing deployment release maintenance iteration roadmap milestones delivery workflow'
  },
  {
    title: 'Standard Operations',
    href: '/docs/operations',
    category: 'Handbook',
    keywords:
      'operations standard procedures ops monitoring observability telemetry logging metrics alerts system health reliability debugging incident response'
  },
  {
    title: 'Protection Layer',
    href: '/legal',
    category: 'Protection',
    keywords:
      'protection security safety risk management safeguards encryption access control data protection compliance threat model boundaries'
  },
  {
    title: 'Terms of Service',
    href: '/legal/tos',
    category: 'Protection',
    keywords:
      'terms of service tos agreement contract usage rules user obligations rights limitations liability service conditions'
  },
  {
    title: 'Privacy Policy',
    href: '/legal/privacy',
    category: 'Protection',
    keywords:
      'privacy policy personal data collection cookies tracking analytics gdpr consent storage retention user data rights'
  },
  {
    title: 'Terms & Conditions',
    href: '/legal/terms',
    category: 'Protection',
    keywords:
      'terms conditions legal agreement compliance policies restrictions disclaimers obligations enforcement'
  },
  {
    title: 'Knowledge Assets',
    href: '/knowledge',
    category: 'Operations',
    keywords:
      'knowledge assets documentation resources archive records internal docs learning materials references information repository'
  },
  {
    title: 'Credential Ownership',
    href: '/knowledge/credentials',
    category: 'Operations',
    keywords:
      'credentials ownership passwords api keys secrets access management authentication authorization accounts security responsibility'
  },
  {
    title: 'Environments',
    href: '/knowledge/environments',
    category: 'Operations',
    keywords:
      'environments local development dev staging production testing sandbox configuration variables deployments isolation'
  },
  {
    title: 'Schemas & Diagrams',
    href: '/knowledge/schemas',
    category: 'Operations',
    keywords:
      'schemas diagrams database schema architecture diagrams flowcharts data models relationships system maps visual documentation'
  },
  {
    title: 'Frequently Asked Questions',
    href: '/faq',
    category: 'FAQ',
    keywords:
      'faq frequently asked questions help support troubleshooting common issues how to basics guidance answers'
  }
];


  let query = '';
  let searchInput: HTMLInputElement;

  // 🔍 Tactical Fuse Index (Single Declaration)
  const fuse = new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'keywords', weight: 0.3 },
      { name: 'category', weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  // 🧠 Reactive Results
  $: filteredItems =
    query.trim().length === 0
      ? items
      : fuse.search(query).map(result => result.item);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }

  $: if (open && searchInput) {
    setTimeout(() => searchInput.focus(), 10);
  }

  function select(href: string) {
    open = false;
    goto(href);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
<button
  type="button"
  aria-label="Close search dialog"
  class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm cursor-default"
  on:click={() => (open = false)}
></button>


  <div
    class="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="search_header"
  >
    <div class="overflow-hidden rounded-xl border border-slate-800 bg-[#0A0A0A] shadow-2xl shadow-emerald-900/20">

      <div class="border-b border-slate-800 px-4 py-3 flex items-center gap-3">
        <svg class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          id="search_header"
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
          <div class="py-8 text-center text-sm text-slate-500 font-mono">
            NO_RESULTS_FOR: "{query}"
          </div>
        {:else}
          {#each filteredItems as item}
            <button
              type="button"
              on:click={() => select(item.href)}
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 group transition-colors text-left font-mono"
            >
              <div class="h-2 w-2 rounded-full bg-slate-700 group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_currentColor]"></div>
              <div class="flex-1">
                <div class="text-sm font-medium text-slate-200 group-hover:text-white uppercase tracking-tight">
                  {item.title}
                </div>
                <div class="text-[9px] text-slate-600 uppercase tracking-widest mt-0.5">
                  Node_Type: {item.category}
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