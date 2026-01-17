<script lang="ts">
  import '../styles/global.css';
  import '../styles/app.css';
  import { page } from '$app/stores';

  export let data;
  $: user = $page.data.session?.user || data?.session?.user;
  $: currentPath = $page.url.pathname;
</script>

<svelte:head>
  <title>Fabalos Automation — Intelligent Systems Architecture</title>
  <link rel="icon" href="/favicon.svg" type="image/png" />
  <meta name="theme-color" content="#030303" />
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden bg-background font-sans text-gray-300 selection:bg-primary/30 transition-colors duration-700">

  <div class="relative z-10">
    <slot />
  </div>

  <div
    class="fixed inset-0 z-50 pointer-events-none opacity-[0.05]"
    style="
      /* The Pattern */
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
      background-size: 40px 40px;

      /* The Magic Color Tint
         This mixes your Theme Color (primary) into the white grid lines
      */
      background-blend-mode: overlay;
      background-color: var(--primary);
    "
  ></div>

  {#if user}
    <div
      class="fixed bottom-0 right-0 z-[60] rounded-tl-lg border-t border-l border-white/10 bg-black/90 px-4 py-1.5 font-mono text-[10px] tracking-widest text-primary/70 uppercase shadow-2xl backdrop-blur-md"
    >
      OPERATOR: <span class="text-primary font-bold">{user.email}</span>
    </div>
  {/if}

</div>