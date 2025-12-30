<script lang="ts">
  // Import components based on your folder structure
  import ClientManager from './components/ClientManager.svelte';
  import ProjectGrid from './components/ProjectGrid.svelte';
  import SupportPannel from './components/SupportPannel.svelte';
  import MilestoneControl from './components/MilestoneControl.svelte';
  import Footer2 from '$lib/components/Footer2.svelte';
  import ModuleManager from './components/ModuleManager.svelte'; // <--- IMPORT THIS

  export let data;
  // Destructure data streams from server
  $: ({ allProjects, allClients, tickets, milestones, storageStatus, modules } = data);
</script>

<svelte:head>
  <title>SYS_ADMIN // GOD VIEW</title>
</svelte:head>

<div class="min-h-screen bg-[#050505] p-6 font-mono text-slate-200 md:p-12 selection:bg-emerald-500/30">

  <header class="mb-12 flex items-end justify-between border-b border-slate-900 pb-6">
    <div>
      <h1 class="text-4xl font-black tracking-tighter text-white uppercase">
        <span class="text-red-600">SYS_ADMIN</span> // COCKPIT
      </h1>
      <p class="mt-2 text-[10px] tracking-[0.3em] text-slate-500 uppercase">
        <span class="text-emerald-500">●</span> Secure_Uplink_Established
      </p>
    </div>
    <div class="text-right">
      <p class="text-[9px] uppercase tracking-widest text-slate-600">Storage_Bucket</p>
      <p class="text-xs font-bold text-blue-500 uppercase">{storageStatus?.bucketName || 'OFFLINE'}</p>
    </div>
  </header>

  <div class="space-y-16">
    <div class="grid grid-cols-1 gap-8 xl:grid-cols-[2fr_1fr]">
      <div class="w-full">
        <ProjectGrid projects={allProjects} clients={allClients} {modules} />
      </div>
      <div class="w-full">
        <SupportPannel {tickets} />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ClientManager clients={allClients} users={data.systemUsers} />
      <MilestoneControl {milestones} projects={allProjects} />
    </div>
      <ModuleManager {modules} />
  </div>

  <div class="mt-24 border-t border-slate-900 pt-8">
    <Footer2 />
  </div>
</div>