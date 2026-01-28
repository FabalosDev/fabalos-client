<script lang="ts">
  import HeaderClient from '$lib/components/HeaderClient.svelte';
  import SpaceTimeline from '$lib/components/SpaceTimeline.svelte';
  import Starfield from '$lib/components/Starfield.svelte';

  export let data;

  // Reactive data mapping mula sa server load
  $: ({ project, supabase } = data); // ADDED: Supabase for download
  $: milestones = data.milestones || [];
  $: files = data.files || [];
  $: actionItems = data.actionItems || [];
  $: logs = data.logs || [];

  // --- STATS CALCULATION ---
  const finishedKeys = ['COMPLETED', 'COMPLETE', 'TAPOS NA', 'DONE', 'OK'];

  $: completedCount = milestones.filter(m =>
      finishedKeys.includes(m.status?.toUpperCase())
  ).length;

  $: progressPercent = milestones.length > 0
      ? Math.round((completedCount / milestones.length) * 100)
      : 0;

  $: activeModulesCount = project.active_modules ? project.active_modules.length : 0;

  let statusStyle = { bg: 'bg-emerald-500', text: 'text-emerald-400' };

  // --- DOWNLOAD FUNCTION (FIXED) ---
// --- DOWNLOAD FUNCTION (SECURE BLOB METHOD) ---
  async function downloadFile(filePath, fileName) {
      if (!filePath) return;
      const safeName = fileName || 'download';

      // 1. I-download ang raw data mula sa Supabase (Respetado ang RLS)
      const { data, error } = await supabase.storage
          .from('vault')
          .download(filePath);

      if (error) {
          console.error('Download Error:', error);
          alert('Access Denied: Cannot download file.');
          return;
      }

      // 2. Gumawa ng temporary URL mula sa Blob data
      const url = window.URL.createObjectURL(data);

      // 3. Force Download sa Browser
      const link = document.createElement('a');
      link.href = url;
      link.download = safeName;
      document.body.appendChild(link);
      link.click();

      // 4. Cleanup (Para hindi kumain ng memory)
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Mission Control · {project.tenant_slug}</title>
</svelte:head>

<div class="relative min-h-screen">
  <Starfield />

  <div class="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_40%)]"></div>

  <div class="relative z-10 flex flex-col h-screen overflow-y-auto custom-scrollbar">

    <HeaderClient {project} {statusStyle} />

    <main class="px-8 py-8 space-y-8 max-w-7xl mx-auto w-full pb-20">

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-5 backdrop-blur-sm">
            <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Build Progress</div>
            <div class="text-3xl font-bold text-white font-mono">{progressPercent}%</div>
            <div class="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-1000" style="inline-size: {progressPercent}%"></div>
            </div>
        </div>

        <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-5 backdrop-blur-sm group hover:border-emerald-500/30 transition-all">
            <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Active Systems</div>

            {#if project.active_modules && project.active_modules.length > 0}
                <div class="flex flex-wrap gap-1 mt-1">
                    {#each project.active_modules.slice(0, 3) as mod}
                        <span class="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase">
                            {typeof mod === 'string' ? mod.replace('_', ' ') : (mod.name || 'System')}
                        </span>
                    {/each}

                    {#if project.active_modules.length > 3}
                        <span class="text-[9px] text-slate-500 self-center">+{project.active_modules.length - 3}</span>
                    {/if}
                </div>
            {:else}
                <div class="text-3xl font-bold text-white font-mono">0</div>
                <div class="mt-1 text-[10px] text-slate-600 font-mono">Standby_Mode</div>
            {/if}
        </div>

        <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-5 backdrop-blur-sm">
             <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Vault Assets</div>
             <div class="text-3xl font-bold text-white font-mono">{files.length}</div>
             <div class="mt-1 text-[10px] text-slate-500 font-mono">Files_Secured</div>
        </div>

        <div class="rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-5 backdrop-blur-sm flex flex-col justify-center items-center text-center">
            <div class="text-lg font-bold text-white tracking-tighter">SYSTEM ONLINE</div>
            <div class="text-[10px] font-mono uppercase text-emerald-400 tracking-widest">Monitoring_Active</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-2 space-y-8">

            <div>
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-500"></span> Latest Transmissions
                    </h3>
                    <a href="/portal/{project.tenant_slug}/vault" class="text-[10px] font-mono text-emerald-400 hover:text-white transition-colors">ACCESS_VAULT >></a>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
{#each files.slice(0, 4) as file} {#if file && file.file_name}
                      <div class="group flex items-center justify-between rounded border border-white/5 bg-white/[0.02] p-3 hover:border-emerald-500/30 transition-all">
                         <div class="flex items-center gap-3 overflow-hidden">
                            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-900 text-emerald-500">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <div class="min-w-0">
                                <div class="truncate text-xs font-bold text-slate-200 group-hover:text-white">
                                    {file.file_name}
                                </div>
                                <div class="text-[9px] text-slate-500 font-mono">
                                    {(file.file_size / 1024).toFixed(0)} KB • {new Date(file.created_at).toLocaleDateString()}
                                </div>
                            </div>
                         </div>

                         <button
                            on:click={() => downloadFile(file.file_path || '', file.file_name || 'download')}
                            class="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 hover:text-white"
                            aria-label="Download {file.file_name}"
                            title="Download {file.file_name}"
                         >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                         </button>
                      </div>
                    {/if}
                  {:else}
                      <div class="col-span-full border border-dashed border-white/10 rounded-xl p-6 text-center text-[10px] text-slate-600 font-mono">
                        NO_DELIVERABLES_TRANSMITTED
                      </div>
                  {/each}
                </div>
            </div>
        </div>

        <div class="space-y-8">
            <div>
                <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> Operator Attention
                </h3>
                <div class="space-y-3">
                    {#each actionItems as item}
                        <div class="relative overflow-hidden rounded-lg border {item.status === 'pending' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-white/5 bg-white/[0.02]'} p-4 transition-all">
                            <div class="flex items-start justify-between">
                                <div>
                                    <p class="text-sm font-bold {item.status === 'pending' ? 'text-yellow-400' : 'text-slate-400 line-through'}">
                                        {item.title || item.task}
                                    </p>
                                    <p class="mt-1 text-[9px] font-mono uppercase tracking-wider text-slate-500">PRIORITY_{item.priority}</p>
                                </div>
                                {#if item.status === 'pending'}
                                    <div class="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_8px_currentColor]"></div>
                                {/if}
                            </div>
                        </div>
                    {:else}
                        <div class="text-[10px] text-slate-600 font-mono py-6 border border-dashed border-white/10 rounded-xl text-center">
                            NO_PENDING_ACTIONS_REQUIRED
                        </div>
                    {/each}
                </div>
            </div>

            <div>
                <h3 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">System Logs</h3>
                <div class="rounded-xl border border-white/5 bg-black/40 p-4 shadow-inner">
                    <div class="space-y-4">
                        {#each logs as log}
                            <div class="flex gap-3">
                                <span class="shrink-0 font-mono text-[9px] text-slate-600 pt-0.5 w-12 uppercase">
                                    {new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                <p class="text-[11px] text-slate-400 leading-snug font-mono tracking-tight">{log.message}</p>
                            </div>
                        {:else}
                            <div class="text-[10px] text-slate-600 font-mono">LOG_STREAM_EMPTY</div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

      </div>
    </main>
  </div>
</div>