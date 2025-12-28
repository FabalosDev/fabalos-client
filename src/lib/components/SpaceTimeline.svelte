<script lang="ts">
  export let milestones: any[] = [];

  function isNewPhase(i: number) {
      if (i === 0) return true;
      return milestones[i].phase_label !== milestones[i - 1].phase_label;
  }
</script>

<div class="relative space-y-2 pl-4">
  <div class="absolute left-[23px] top-4 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"></div>

  {#each milestones as step, i}

    {#if isNewPhase(i)}
      <div class="relative pb-4 pt-6 pl-10">
         <div class="absolute left-[19px] top-[30px] h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_currentColor] text-primary"></div>
         <h3 class="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
           Sector: {step.phase_label || 'Deep Space'}
         </h3>
      </div>
    {/if}

    <div class="group relative flex items-center gap-6 pl-10 py-2">

      <div class="absolute left-[19px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {#if step.status === 'active'}
           <div class="relative h-6 w-6 flex items-center justify-center">
             <div class="absolute h-full w-full animate-ping rounded-full bg-primary/30"></div>
             <div class="absolute h-full w-full animate-spin rounded-full border border-dashed border-primary/60"></div>
             <div class="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),1)]"></div>
           </div>
        {:else if step.status === 'completed'}
           <div class="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.8)] ring-4 ring-[#050505]"></div>
        {:else}
           <div class="h-1.5 w-1.5 rounded-full bg-white/20 ring-4 ring-[#050505]"></div>
        {/if}
      </div>

      <div class="relative w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

        <div class="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100"></div>

        <div class="relative flex justify-between items-start mb-1">
            <span class="font-mono text-[9px] font-bold uppercase tracking-widest {step.status === 'active' ? 'text-primary animate-pulse' : 'text-text-soft/50'}">
                {#if step.status === 'completed'}Docked
                {:else if step.status === 'active'}&gt;&gt; Orbiting System &lt;&lt;
                {:else}Locked{/if}
            </span>
            <span class="font-mono text-[9px] text-white/20">
                {step.due_date ? new Date(step.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'TBA'}
            </span>
        </div>

        <h4 class="relative text-sm font-bold text-text-main {step.status === 'completed' ? 'text-white/40' : ''}">
            {step.title}
        </h4>
      </div>
    </div>
  {/each}
</div>