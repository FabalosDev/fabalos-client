<script lang="ts">
  import SpaceTimeline from "$lib/components/SpaceTimeline.svelte";
  // Icons import (Optional, using SVG directly below for zero-dependency)

  export let data;

  // 1. Destructure Data
  $: ({ milestones = [], files = [], project = {} } = data);

  // Helper for download
  function downloadFile(path: string, name: string) {
     window.open(`/portal/${project.tenant_slug}/download?path=${encodeURIComponent(path)}&name=${encodeURIComponent(name)}`, '_blank');
  }
</script>

<div class="h-full w-full overflow-y-auto custom-scrollbar relative">

    <div class="p-6 lg:p-10 mx-auto max-w-[1600px]">

        <div class="mb-12 border-b border-white/5 pb-6 flex items-end justify-between">
            <div>
                <h1 class="text-3xl font-bold tracking-tight text-white">STELLAR TRAJECTORY</h1>
                <p class="mt-2 font-mono text-[10px] text-emerald-500 uppercase tracking-[0.2em] opacity-80">
                    YOUR PROJECT SPRINT VISUALIZER
                </p>
            </div>
            <div class="hidden md:block text-right">
                <div class="text-xs text-slate-500 uppercase tracking-widest font-mono">Project ID</div>
                <div class="text-sm text-slate-300 font-bold">{project.tenant_slug || 'UNKNOWN'}</div>
            </div>
        </div>

        <div class="lg:col-span-2 space-y-8">

            <div>
                <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Mission Trajectory
                </h3>
                <div class="">
                    <div class="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>
                    <SpaceTimeline {milestones} />
                </div>
            </div>
        </div>
    </div>
</div>