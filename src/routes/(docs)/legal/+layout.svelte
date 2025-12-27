<script lang="ts">
  import { page } from '$app/stores';

  const NAV = [
    { href: '/legal/tos', label: 'Terms of Service' },
    { href: '/legal/privacy', label: 'Privacy Policy' },
    { href: '/legal/terms', label: 'Terms & Conditions' }
  ];

  $: path = $page.url.pathname;
</script>

<div class="flex gap-12">
  <aside class="hidden lg:block w-64 shrink-0 sticky top-24">
    <nav class="space-y-4 border-l border-white/10 pl-4">
      {#each NAV as item}
        <a
          href={item.href}
          class="block py-1.5 text-sm border-l-2 -ml-[1px] pl-4 transition
            {path === item.href
              ? 'border-orange-500 text-orange-400 font-medium'
              : 'border-transparent text-slate-400 hover:text-slate-200'}"
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </aside>

  <main class="flex-1 max-w-4xl pb-32">
    <slot />
  </main>
</div>
