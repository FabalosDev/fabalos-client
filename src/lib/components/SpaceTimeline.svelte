<script lang="ts">
  export let milestones: any[] = [];

  function isNewPhase(i: number) {
      if (i === 0) return true;
      return milestones[i].phase_label !== milestones[i - 1].phase_label;
  }
</script>

<div class="relative space-y-2 pl-4">
  <div class="absolute left-[23px] top-4 h-full w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent"></div>

  {#each milestones as step, i}

    {#if isNewPhase(i)}
      <div class="relative pb-4 pt-8 pl-10">
         <div class="absolute left-[19px] top-[38px] -translate-x-1/2 flex items-center justify-center">
            <div class="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20"></div>
            <div class="absolute h-6 w-6 rounded-full border border-emerald-500/30 animate-pulse"></div>
         </div>
         <h3 class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/80 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
           {step.phase_label || 'Deep Space'}
         </h3>
      </div>
    {/if}

    <div class="group relative flex items-center gap-6 pl-10 py-3">

      <div class="absolute left-[19px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#020617] p-1">
        {#if step.status === 'active'}
           <div class="relative h-8 w-8 flex items-center justify-center">
             <div class="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-emerald-500/60"></div>
             <div class="absolute inset-0 animate-ping rounded-full bg-emerald-500/20"></div>
             <svg class="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_currentColor]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
           </div>
        {:else if step.status === 'completed'}
           <div class="h-4 w-4 rounded-full bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)] ring-2 ring-[#020617] flex items-center justify-center">
             <svg class="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
           </div>
        {:else}
           <div class="h-3 w-3 rounded-full border-2 border-slate-700 bg-[#020617]"></div>
        {/if}
      </div>

      <div class="relative w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

        <div class="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-500/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100"></div>

        <div class="relative flex justify-between items-start mb-1">
            <span class="font-mono text-[9px] font-bold uppercase tracking-widest {step.status === 'active' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}">
                {#if step.status === 'completed'}DOCKED
                {:else if step.status === 'active'}&gt;&gt; ORBITING &lt;&lt;
                {:else}LOCKED{/if}
            </span>
            <span class="font-mono text-[9px] text-white/20">
                {step.due_date ? new Date(step.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'TBA'}
            </span>
        </div>

        <h4 class="relative text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
            {step.title}
        </h4>
      </div>
    </div>
  {/each}
</div>