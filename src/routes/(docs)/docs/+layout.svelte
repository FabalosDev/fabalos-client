<script lang="ts">
  import { DOCS_NAV } from '$lib/docs/nav';
  import { page } from '$app/stores';

  $: path = $page.url.pathname;
</script>


<div class="flex gap-12">
  <aside class="hidden lg:block w-64 shrink-0 sticky top-24">
    {#each DOCS_NAV as section}
      <div class="mb-6">
        <p class="text-xs uppercase text-slate-500 mb-2">
          {section.title}
        </p>

        {#each section.items as item}
          <a
            href={item.href}
            class="block py-1.5 text-sm border-l-2 pl-4 transition
              {path === item.href
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'}"
          >
            {item.label}
          </a>
        {/each}
      </div>
    {/each}
  </aside>

  <main class="flex-1 max-w-4xl pb-32">
    <slot />
  </main>
</div>


