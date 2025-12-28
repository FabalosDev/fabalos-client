<script lang="ts">
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Helper: Checks if the current URL starts with the path to keep the tab active for sub-pages
  $: isActive = (path: string) => $page.url.pathname.startsWith(path);
</script>

<header class="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur supports-[backdrop-filter]:bg-[#050505]/60">
  <div class="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">

    <div class="flex items-center gap-6">
      <a href="/" class="flex items-center gap-2 font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
        <div class="h-5 w-5 rounded bg-gradient-to-br from-emerald-500 to-emerald-700"></div>
        <span>Fabalos<span class="text-slate-500">_Docs</span></span>
      </a>

      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <a
          href="/docs"
          class:text-white={isActive('/docs')}
          class:text-slate-400={!isActive('/docs')}
          class="hover:text-emerald-400 transition-colors"
        >
          Handbook
        </a>
        <a
          href="/legal"
          class:text-white={isActive('/legal')}
          class:text-slate-400={!isActive('/legal')}
          class="hover:text-emerald-400 transition-colors"
        >
          Legal
        </a>
        <a
          href="/knowledge"
          class:text-white={isActive('/knowledge')}
          class:text-slate-400={!isActive('/knowledge')}
          class="hover:text-emerald-400 transition-colors"
        >
          Knowledge
        </a>
        <a
          href="/faq"
          class:text-white={isActive('/faq')}
          class:text-slate-400={!isActive('/faq')}
          class="hover:text-emerald-400 transition-colors"
        >
          FAQ
        </a>
      </nav>
    </div>

    <div class="flex items-center gap-4">

      <button
        on:click={() => dispatch('openSearch')}
        class="hidden md:flex items-center gap-2 rounded border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-400 hover:border-white/20 hover:text-white transition-colors"
      >
        <span class="text-xs">⌘+K</span>
        <span>Search...</span>
      </button>

      <a
        href="https://github.com/FabalosDev"
        target="_blank"
        rel="noreferrer"
        class="text-slate-400 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </a>
    </div>

  </div>
</header>