<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Infrastructure from '$lib/components/Infrastructure.svelte'; // Replaces 'About'
  import Protocol from '$lib/components/Protocol.svelte';       // Replaces 'Stack'
  import Operations from '$lib/components/Operations.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Logical Props for punchy, professional positioning
  const labTitle = "FABALOS AUTOMATION // DEVLAB";
  const labSubtitle = "Stabilizing high-velocity operations through production-grade orchestration.";
</script>

<Header />

<main class="bg-[#0a0a0a] min-h-screen text-white">
  <Hero
    title={labTitle}
    subtitle={labSubtitle}
  />

  <Operations />

  <Infrastructure />

  <Protocol />

  <section class="py-20 border-t border-white/5 text-center">
    <h3 class="text-sm font-mono tracking-widest text-blue-500 mb-4 uppercase">Secure Access</h3>
    <a href="/login" class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded font-bold uppercase tracking-tighter">
      Enter Client Command Center
    </a>
  </section>
</main>

<Footer />