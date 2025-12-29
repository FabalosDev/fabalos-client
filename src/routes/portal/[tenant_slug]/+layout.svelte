<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TicketModal from '$lib/components/TicketModal.svelte';
  import { ticketModalOpen } from '$lib/stores/ui';

  export let data;

  $: brandColor = data.brandColor || '#10b981';

  // ⚡ Critical Fix: Siguraduhin na ang source ay data.project.active_modules
  // base sa iyong dashboard snippet
  $: sidebarModules = data.project?.active_modules?.map(mod => {
    if (typeof mod === 'object' && mod !== null) return mod;

    return {
      name: mod.replace(/_/g, ' ').toUpperCase(),
      slug: mod.toLowerCase()
    };
  }) || [];
</script>

<div
  class="min-h-screen bg-[#020617] text-slate-300 font-body selection:bg-primary/30"
  style="
    --primary: {brandColor};
    --foxther-glow: {brandColor};
    --button-glow: {brandColor};
  "
>
  <Sidebar
    modules={sidebarModules}
    slug={data.project?.tenant_slug}
  />

  <main class="pl-64 min-h-screen">
    <div class="w-full h-full">
      <slot />
    </div>
  </main>
</div>

<TicketModal bind:show={$ticketModalOpen} form={data.form} />