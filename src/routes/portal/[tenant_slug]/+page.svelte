<script lang="ts">
  import HeaderClient from '$lib/components/HeaderClient.svelte';
  import SpaceTimeline from '$lib/components/SpaceTimeline.svelte';
  import Starfield from '$lib/components/Starfield.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  export let data;
  $: project = data.project;
  $: milestones = data.milestones || [];
  $: files = data.files || [];

  // STATS CALCULATION
  $: completedMilestones = milestones.filter(m => m.status === 'completed').length;
  $: progressPercent = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;
  $: activeModulesCount = project.active_modules ? project.active_modules.length : 0;

  $: actionItems = data.actionItems;
  $: logs = data.logs;

  const recentLogs = [
    { date: 'Dec 28', msg: 'System Audit completed successfully.' },
    { date: 'Dec 27', msg: 'New deliverables uploaded to Vault.' },
    { date: 'Dec 26', msg: 'Project initialized.' }
  ];

  let statusStyle = { bg: 'bg-emerald-500', text: 'text-emerald-400' };
</script>

<svelte:head>
  <title>Mission Control · {project.tenant_slug}</title>
</svelte:head>

<div class="flex min-h-screen font-sans text-slate-300 selection:bg-emerald-500/30 bg-[#020617] overflow-hidden">

  <Starfield />
  <div class="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_40%)]"></div>

  <Sidebar modules={project.active_modules || []} slug={project.tenant_slug} />

  <div class="ml-64 flex-1 flex flex-col relative z-10 h-screen overflow-y-auto custom-scrollbar">

    <HeaderClient {project} {statusStyle} />

    <main class="px-8 py-8 space-y-8 max-w-7xl mx-auto w-full pb-20">

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-5 backdrop-blur-sm">
            <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Build Progress</div>
            <div class="text-3xl font-bold text-white font-mono">{progressPercent}%</div>
            <div class="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-1000" style="width: {progressPercent}%"></div>
            </div>
        </div>
        <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-5 backdrop-blur-sm">
             <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Active Modules</div>
             <div class="text-3xl font-bold text-white font-mono">{activeModulesCount}</div>
             <div class="mt-1 text-[10px] text-emerald-400">Nodes Operational</div>
        </div>
        <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-5 backdrop-blur-sm">
             <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Vault Assets</div>
             <div class="text-3xl font-bold text-white font-mono">{files.length}</div>
             <div class="mt-1 text-[10px] text-slate-500">Files Secured</div>
        </div>
        <div class="rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-5 backdrop-blur-sm flex flex-col justify-center items-center text-center">
            <div class="text-lg font-bold text-white">SYSTEM ONLINE</div>
            <div class="text-[10px] font-mono uppercase text-emerald-400 tracking-widest">Monitoring Active</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-2 space-y-8">

            <div>
                <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Mission Trajectory
                </h3>
                <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-6">
                    <SpaceTimeline {milestones} />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-500"></span> Latest Transmissions
                    </h3>
                    <a href="/portal/{project.tenant_slug}/vault" class="text-[10px] text-emerald-400 hover:text-white transition-colors">ACCESS VAULT >></a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each files.slice(0, 4) as file}
                        <div class="group flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-emerald-500/30 hover:bg-white/[0.05]">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-800 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="truncate text-sm font-medium text-white group-hover:text-emerald-400">{file.key.split('/').pop()}</p>
                                <p class="text-[10px] text-slate-500">Encrypted Asset</p>
                            </div>
                            <div class="text-[10px] font-mono text-slate-600">DL</div>
                        </div>
                    {/each}
                    {#if files.length === 0}
                         <div class="col-span-2 py-8 text-center text-xs text-slate-600 border border-dashed border-white/10 rounded-lg">
                            No deliverables transmitted yet.
                         </div>
                    {/if}
                </div>
            </div>
        </div>

<div class="space-y-8">

            <div>
                <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> Operator Attention Required
                </h3>
                <div class="space-y-3">
                    {#if actionItems && actionItems.length > 0}
                        {#each actionItems as item}
                            <div class="relative overflow-hidden rounded-lg border {item.status === 'pending' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-white/5 bg-white/[0.02]'} p-4 transition-all">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <p class="text-sm font-bold {item.status === 'pending' ? 'text-yellow-400' : 'text-slate-400 line-through'}">
                                            {item.title || item.task}
                                        </p>
                                        <p class="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Priority: {item.priority}</p>
                                    </div>
                                    {#if item.status === 'pending'}
                                        <div class="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_8px_currentColor]"></div>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <div class="text-xs text-slate-600 font-mono py-2 border border-dashed border-white/10 rounded p-4 text-center">
                            No pending actions required.
                        </div>
                    {/if}
                </div>
            </div>

            <div>
                <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">System Logs</h3>
                <div class="rounded-xl border border-white/5 bg-black/40 p-4">
                    <div class="space-y-4">
                        {#if logs && logs.length > 0}
                            {#each logs as log}
                                <div class="flex gap-3">
                                    <span class="shrink-0 font-mono text-[10px] text-slate-500 pt-0.5 w-12">
                                        {new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                    <p class="text-xs text-slate-300 leading-snug">{log.message}</p>
                                </div>
                            {/each}
                        {:else}
                            <div class="text-[10px] text-slate-600 font-mono">System log stream empty.</div>
                        {/if}
                    </div>
                </div>
            </div>

        </div>

      </div>

    </main>
  </div>
</div>