<script lang="ts">
  import SpaceTimeline from "$lib/components/SpaceTimeline.svelte";
  export let data;

  // I-extract ang milestones mula sa load function
  $: ({ milestones = [] } = data);
</script>

<div class="p-6">
  <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
    Mission Trajectory
  </h3>

  <div class="relative pl-8 border-l border-white/10 ml-2">
    <SpaceTimeline {milestones} />
  </div>
</div>