<script lang="ts">
  import Header2 from '$lib/components/Header2.svelte';
  import Footer2 from '$lib/components/Footer2.svelte';
  import SearchDialog from '$lib/components/SearchDialog.svelte'; // Import Logic

  let searchOpen = false;

  // The Keyboard Listener
  function handleKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault(); // Stop browser from focusing address bar
      searchOpen = !searchOpen; // Toggle Modal
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="min-h-screen bg-[#050505] text-slate-300 font-sans">

  <Header2 on:openSearch={() => searchOpen = true} />

  <SearchDialog bind:open={searchOpen} />

  <div class="mx-auto max-w-[1400px] px-6 py-12">
    <slot />
  </div>

  <Footer2 />
</div>